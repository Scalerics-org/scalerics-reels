// Capa 3D de contable-papeles (Three.js r170 local). Base técnica: reels/inmobiliaria-visitas (gen.mjs, tarjetas
// pegadas a la cámara, regla de burbujas, cámara por planos con Catmull-Rom, Sofi en videollamada) y
// reels/corralon-portland (el chat genérico: cabecera, audios, fotos). renderAt(t) es una función pura del tiempo del
// timeline (hf-seek): nada de rAF, Date.now ni azar sin semilla.
// Lugares del mismo mundo, lejos uno del otro:
//   "ESTUDIO ADRIANA" (alrededor del origen): casona del Cordón, pared navy2 con boiserie crema, damero de calcáreas,
//     la lámpara de banquero verde, la sumadora con la tira, los biblioratos y los 60 sobres de papel madera, el piolín
//     con tickets, la puerta de calle; de noche (parte 1) y de tarde (parte 2)
//   "PANADERÍA MARCELO" (x = 40): azulejo blanco con guarda verde, mostrador con vitrina, bolsas de harina
//   PARTE 1: el audio "Adri, las facturas te las mando mañana sin falta." · "Marcelo. Vence hoy." · las fotos · el
//            piolín · los sobres · "Acá está todo, Adri. Ordenadito." · la avalancha · "¿Y esta?" · "Esa es la más
//            importante." · la pausa (rótulos) · "Si querés, te mando una foto." · la foto en blanco
//   PARTE 2: el WhatsApp del estudio en la panadería · la foto de la factura · "Listo. Ordenadito." · el panel · el
//            mismo audio · "Marcelo, las mandaste el día tres." · "¿Yo? Qué ordenadito." · 60 de 60 · la lámpara se
//            apaga · Sofi
import * as THREE from "./vendor/three/three.module.js";
import { RoundedBoxGeometry } from "./vendor/three/RoundedBoxGeometry.js";
import { crearPersonaje, ELENCO, DEFECTO, PIEL, PELO, MARCA, poseEn, CARA, BRAZOS, saludo, pegarACamara, crearCelular, crearBanquito, crearBandejaBizcochos, crearPanFlauta } from "./personajes.js";
import { T, DUR, P1, P2, ENV, LEN, LIMPIO, VER as VERM } from "./tiempos3d.js";
await Promise.all([...["500", "600", "700", "800", "900"].map((w) => document.fonts.load(w + ' 60px "Lexend"')), document.fonts.load('700 60px "Caveat"')]);

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
const r2 = (n) => Math.round(n * 100) / 100;

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
scene.environment = null;

// ---------- paleta y materiales ----------
const C = { navy: 0x0b1220, navy2: 0x16243d, navy3: 0x1f3254, edge: 0x2c4268, cr: 0xefeee5, cr2: 0xd9d7c9, cr3: 0xb4b2a3, g: 0x5ce611, gd: 0x3fa60a, red: 0xc7655b, kraft: 0xc9a46b, madera: 0xd7b98a, gris: 0xc9ccd2, celeste: 0xb9cde0, toldo: 0x365f28, hoja: 0x4f7a3a };
const mat = (color, rough = 0.6, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0, ...extra });
const M = {
  navy: mat(C.navy, 0.5), navy2: mat(C.navy2, 0.7), navy3: mat(C.navy3, 0.6), edge: mat(C.edge, 0.6),
  cr: mat(C.cr, 0.6), cr2: mat(C.cr2, 0.7), cr3: mat(C.cr3, 0.6), g: mat(C.g, 0.5), gd: mat(C.gd, 0.5), red: mat(C.red, 0.55),
  kraft: mat(C.kraft, 0.85), madera: mat(C.madera, 0.75), gris: mat(C.gris, 0.35, { metalness: 0.3 }), goma: mat(0x23262c, 0.8),
  vidrio: new THREE.MeshBasicMaterial({ color: 0xcfe2f2, transparent: true, opacity: 0.1, depthWrite: false }),
  vidrioAuto: new THREE.MeshPhysicalMaterial({ color: 0x8fb4d6, roughness: 0.08, transparent: true, opacity: 0.22, depthWrite: false, side: THREE.DoubleSide }),
  toldo: mat(C.toldo, 0.8), hoja: mat(C.hoja, 0.8), asfalto: mat(0x60646c, 0.95),
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
const CAV = (s, w = 700) => `${w} ${s}px "Caveat", cursive`;
const ajustar = (x, txt, peso, px, ancho) => { let s = px; x.font = F(peso, s); while (x.measureText(txt).width > ancho && s > 10) { s -= 2; x.font = F(peso, s); } return s; };
const plano = (w, h, tex, x = 0, y = 0, z = 0, basic = false) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), basic ? new THREE.MeshBasicMaterial({ map: tex, toneMapped: false }) : new THREE.MeshStandardMaterial({ map: tex, roughness: 0.7 })); m.position.set(x, y, z); m.receiveShadow = true; return m; };
const sombras = (g) => { g.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } }); return g; };
let semilla = 7;
const az = () => ((semilla = (semilla * 16807) % 2147483647) / 2147483647);
// la geometría estática de un grupo, en una malla por material (SwiftShader: menos llamadas de dibujo)
function fusionar(grupo, excluir = []) {
  grupo.updateMatrixWorld(true);
  const inv = grupo.matrixWorld.clone().invert();
  const fuera = new Set(); for (const e of excluir) e.traverse((o) => fuera.add(o));
  const porMat = new Map(), quitar = [];
  grupo.traverse((o) => {
    if (!o.isMesh || fuera.has(o) || Array.isArray(o.material) || o.material.transparent || !o.visible) return;
    let p = o.parent, oculto = false; while (p && p !== grupo) { if (!p.visible) oculto = true; p = p.parent; } if (oculto) return;
    let g = o.geometry.index ? o.geometry.toNonIndexed() : o.geometry.clone();
    for (const k of Object.keys(g.attributes)) if (!["position", "normal", "uv"].includes(k)) g.deleteAttribute(k);
    if (!g.attributes.normal) g.computeVertexNormals();
    if (!g.attributes.uv) g.setAttribute("uv", new THREE.Float32BufferAttribute(new Float32Array(g.attributes.position.count * 2), 2));
    g.applyMatrix4(inv.clone().multiply(o.matrixWorld));
    if (!porMat.has(o.material)) porMat.set(o.material, { geos: [], sombra: o.castShadow });
    porMat.get(o.material).geos.push(g); quitar.push(o);
  });
  for (const o of quitar) o.parent.remove(o);
  for (const [m, { geos, sombra }] of porMat) {
    let n = 0; for (const g of geos) n += g.attributes.position.count;
    const pos = new Float32Array(n * 3), nor = new Float32Array(n * 3), uv = new Float32Array(n * 2);
    let i = 0; for (const g of geos) { pos.set(g.attributes.position.array, i * 3); nor.set(g.attributes.normal.array, i * 3); uv.set(g.attributes.uv.array, i * 2); i += g.attributes.position.count; }
    const geo = new THREE.BufferGeometry(); geo.setAttribute("position", new THREE.BufferAttribute(pos, 3)); geo.setAttribute("normal", new THREE.BufferAttribute(nor, 3)); geo.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
    geo.computeBoundingSphere();
    const mm = new THREE.Mesh(geo, m); mm.castShadow = sombra; mm.receiveShadow = true; grupo.add(mm);
  }
}
const bronce = mat(0xb08d57, 0.35, { metalness: 0.55 });
const rr = (x, X, Y, W, H, R) => { x.beginPath(); x.roundRect(X, Y, W, H, R); x.fill(); };

// =====================================================================================================
// "ESTUDIO ADRIANA" (alrededor del origen, piso y = 0): una casona reciclada del Cordón
//   pared del fondo (z = -0.7): navy2 lisa arriba y boiserie crema hasta 1,1 m; piso de calcáreas en damero crema/navy
//   a la izquierda (-x) del fondo: la ventana alta con postigos crema; la estantería de biblioratos detrás de la derecha
//   de Adriana (-x) y el estante de 60 sobres de papel madera detrás de su izquierda (+x)
//   Adriana sentada en (0; 0,42) mirando a +z; su escritorio delante; la lámpara de banquero verde a su derecha (-x), la
//   sumadora a su izquierda (+x) con la tira que cae por el frente del escritorio; el celular en un soporte (P1, P3, P7, Q3)
//   la puerta de calle en la pared de adelante (z = 4.4); el piolín con tickets a la derecha (x = 1.75), Lucas en un
//   banquito; en la parte 2, Lucas en su escritorio (derecha) y el monitor de Adriana donde estaba la pila de carpetas
// =====================================================================================================
const OF = new THREE.Group(); scene.add(OF);
const EST = { x0: -2.6, x1: 2.6, z0: -0.7, z1: 4.4, alto: 3.4 };
const MESA_Y = 0.76;
const ADR = { x: 0, z: 0.42 };
const DESK = { x0: -0.7, x1: 0.7, z0: 0.7, z1: 1.36 };
const LAMP = { x: -0.36, z: 0.8 };            // la lámpara de banquero (a la derecha de Adriana)
const SUM = { x: 0.42, z: 1.12 };              // la sumadora
const SOP = { x: -0.1, z: 1.18 };            // el soporte del celular
const MON = { x: 0.32, z: 0.84, ry: -0.55, W: 0.6, H: 0.37 };   // el monitor (parte 2)
const PUERTA = { x0: -0.95, x1: -0.05 };        // la puerta de calle (pared de adelante)
const PIOL = { x: 1.6, z0: -0.7, z1: 3.6, y: 1.32 };   // el piolín (a lo largo de z)
const LUC1 = { x: 1.12, z: 2.1 };             // Lucas en el banquito (parte 1)
const LUC2 = { x: 1.32, z: 0.05 };            // Lucas en su escritorio (parte 2), al lado del de Adriana
const pantA = lienzo(740, 1290, () => {});    // el celular de Adriana (chat con Marcelo)
const pantMar = lienzo(740, 1290, () => {});  // el celular de Marcelo (parte 2)
const pantMon = lienzo(1280, 800, () => {});  // el monitor de Adriana (parte 2)
let monitor, carpetas, telA, sumadora, tira, lampara, luzLamp, pantallaLamp, cadena, puertaG, piolin, sobres = [], lucasDesk, ventanaFuera, banquito;
// ---- el damero de calcáreas (placas grandes, colores planos) ----
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
  // la pared navy2 (arriba) y la boiserie crema (abajo, 1,1 m) con paneles en relieve y moldura
  const paredN = mat(0x16243d, 0.92), boi = mat(0xefeee5, 0.7), boi2 = mat(0xe2dfd0, 0.7);
  const fondo = mesh(new THREE.BoxGeometry(OW, EST.alto, 0.12), paredN, 0, EST.alto / 2, EST.z0 - 0.06); fondo.castShadow = false; OF.add(fondo);
  const boiserie = (x0, x1, z, rotY = 0, xx = null) => {
    const g = new THREE.Group(); g.position.set(xx ?? (x0 + x1) / 2, 0, z); g.rotation.y = rotY; OF.add(g);
    const W = x1 - x0;
    g.add(caja(W, 1.1, 0.03, boi, 0, 0.55, 0.015, 0.004));
    g.add(caja(W, 0.05, 0.06, boi, 0, 1.12, 0.03, 0.01));          // moldura de arriba
    g.add(caja(W, 0.14, 0.05, boi2, 0, 0.07, 0.025, 0.006));       // zócalo
    const n = Math.max(1, Math.round(W / 0.62)), pw = W / n;
    for (let i = 0; i < n; i++) g.add(caja(pw - 0.16, 0.66, 0.018, boi2, -W / 2 + pw * (i + 0.5), 0.58, 0.035, 0.01));
    for (let i = 0; i < n; i++) g.add(caja(pw - 0.22, 0.6, 0.012, boi, -W / 2 + pw * (i + 0.5), 0.58, 0.045, 0.008));
    return g;
  };
  boiserie(EST.x0, EST.x1, EST.z0);
  // paredes de los costados y la de adelante (navy2 con boiserie)
  for (const x of [EST.x0, EST.x1]) { const p = mesh(new THREE.BoxGeometry(0.12, EST.alto, OD), paredN, x, EST.alto / 2, OZ); p.castShadow = false; OF.add(p); boiserie(-OD / 2, OD / 2, 0, x < 0 ? Math.PI / 2 : -Math.PI / 2, 0).position.set(x - Math.sign(x) * 0.06, 0, OZ); }
  // la pared de adelante (z1) con la puerta de calle (hueco)
  const tramo = (a, b, y0, y1) => { const p = mesh(new THREE.BoxGeometry(b - a, y1 - y0, 0.14), paredN, (a + b) / 2, (y0 + y1) / 2, EST.z1); p.castShadow = false; OF.add(p); };
  tramo(EST.x0, PUERTA.x0, 0, EST.alto); tramo(PUERTA.x1, EST.x1, 0, EST.alto); tramo(PUERTA.x0, PUERTA.x1, 2.5, EST.alto);
  { const g = boiserie(EST.x0, PUERTA.x0, EST.z1 - 0.07, Math.PI); void g; const g2 = boiserie(PUERTA.x1, EST.x1, EST.z1 - 0.07, Math.PI); void g2; }
  // el marco de la puerta y la hoja de madera crema con paneles (bisagra en x0, abre hacia adentro)
  for (const x of [PUERTA.x0, PUERTA.x1]) OF.add(caja(0.08, 2.5, 0.2, M.cr2, x, 1.25, EST.z1));
  OF.add(caja(PUERTA.x1 - PUERTA.x0 + 0.16, 0.1, 0.2, M.cr2, (PUERTA.x0 + PUERTA.x1) / 2, 2.52, EST.z1));
  puertaG = new THREE.Group(); puertaG.position.set(PUERTA.x0 + 0.04, 0, EST.z1 - 0.05); OF.add(puertaG);
  const PW = PUERTA.x1 - PUERTA.x0 - 0.08;
  puertaG.add(caja(PW, 2.44, 0.05, mat(0xe8e4d4, 0.6), PW / 2, 1.22, 0, 0.01));
  for (const y of [0.6, 1.75]) puertaG.add(caja(PW - 0.2, 0.8, 0.02, mat(0xd9d5c4, 0.6), PW / 2, y, -0.03, 0.01));
  puertaG.add(mesh(new THREE.SphereGeometry(0.03, 12, 10), bronce, PW - 0.1, 1.05, -0.05));
  // afuera de la puerta: la vereda de noche (navy) / de tarde (crema)
  ventanaFuera = [];
  { const f = mesh(new THREE.PlaneGeometry(4, 3), new THREE.MeshBasicMaterial({ color: 0x0f1a2e }), -0.5, 1.4, EST.z1 + 1.2); f.rotation.y = Math.PI; f.castShadow = false; OF.add(f); ventanaFuera.push(f); }
  // la ventana alta de casona (pared del fondo, a la izquierda) con los postigos crema abiertos
  { const VX = -1.75, VW = 0.8, VY0 = 1.25, VY1 = 3.05;
    const af = mesh(new THREE.PlaneGeometry(VW, VY1 - VY0), new THREE.MeshBasicMaterial({ color: 0x0f1a2e }), VX, (VY0 + VY1) / 2, EST.z0 + 0.005); af.castShadow = false; OF.add(af); ventanaFuera.push(af);
    for (const [w, h, x, y] of [[VW + 0.12, 0.08, VX, VY0], [VW + 0.12, 0.08, VX, VY1], [0.07, VY1 - VY0, VX - VW / 2, (VY0 + VY1) / 2], [0.07, VY1 - VY0, VX + VW / 2, (VY0 + VY1) / 2], [0.05, VY1 - VY0, VX, (VY0 + VY1) / 2], [VW, 0.04, VX, VY0 + 1.1]]) OF.add(caja(w, h, 0.07, M.cr, x, y, EST.z0 + 0.04, 0.008));
    for (const s of [-1, 1]) { const p = new THREE.Group(); p.position.set(VX + s * (VW / 2 + 0.03), 0, EST.z0 + 0.05); p.rotation.y = s * -1.25; OF.add(p);
      p.add(caja(0.4, VY1 - VY0, 0.035, M.cr, s * 0.2, (VY0 + VY1) / 2, 0, 0.008));
      for (let k = 0; k < 9; k++) p.add(caja(0.34, 0.025, 0.02, M.cr2, s * 0.2, VY0 + 0.12 + k * 0.19, 0.022, 0.004)); }
    OF.add(caja(VW + 0.24, 0.05, 0.16, M.cr, VX, VY0 - 0.04, EST.z0 + 0.08, 0.01));
  }
}
// ---- la estantería metálica crema de biblioratos (detrás de la derecha de Adriana) ----
const LOMOS = ["IVA", "BPS", "SUELDOS", "CLIENTES A-F", "CLIENTES G-M", "2025", "IRAE", "CAJA", "BANCOS", "2024"];
const lomoT = {};
function texLomo(txt) {
  return (lomoT[txt] ??= lienzo(128, 512, (x, w, h) => {
    x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h); x.strokeStyle = "#16243d"; x.lineWidth = 6; x.strokeRect(3, 3, w - 6, h - 6);
    x.save(); x.translate(w / 2, h / 2); x.rotate(-Math.PI / 2); x.fillStyle = "#0b1220"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, txt, 800, 84, h - 40); x.fillText(txt, 0, 4); x.restore();
  }));
}
{
  const E = new THREE.Group(); E.position.set(-0.68, 0, EST.z0 + 0.2); OF.add(E);
  const W = 1.0, D = 0.34, ys = [0.12, 0.62, 1.12, 1.62, 2.12];
  const metal = mat(0xe6e3d6, 0.45, { metalness: 0.2 });
  for (const x of [-W / 2, W / 2]) for (const z of [-D / 2, D / 2]) E.add(caja(0.03, 2.3, 0.03, metal, x, 1.15, z, 0.004));
  for (const y of ys) E.add(caja(W, 0.025, D, metal, 0, y, 0, 0.004));
  semilla = 5;
  ys.slice(0, 4).forEach((y, r) => {
    let x = -W / 2 + 0.05;
    while (x < W / 2 - 0.1) {
      const an = 0.075, al = 0.32, verde = az() < 0.35;
      const b = new THREE.Group(); b.position.set(x + an / 2, y + 0.0125 + al / 2, 0.02); b.rotation.z = (az() - 0.5) * 0.04; E.add(b);
      b.add(caja(an, al, 0.28, verde ? mat(0x3fa60a, 0.6) : M.navy3, 0, 0, 0, 0.006));
      const l = plano(an * 0.62, al * 0.62, texLomo(LOMOS[Math.floor(az() * LOMOS.length)]), 0, 0.02, 0.141); b.add(l);
      b.add(mesh(new THREE.TorusGeometry(0.012, 0.004, 6, 12), M.gris, 0, -al * 0.36, 0.141));
      x += an + 0.006;
    }
  });
  sombras(E);
}
// ---- el estante de los 60 sobres de papel madera (detrás de la izquierda de Adriana) ----
const CLIENTES = ["MARCELO", "SUSANA", "TALLER ROLO", "ÓPTICA VERA", "KIOSCO LUZ", "FERRET. SOSA", "DR. PÉREZ", "BAR EL TANO", "MODAS ANA", "GOMERÍA 18", "LA ESQUINA", "BOTIQUÍN", "VIDRIOS RAÚL", "PELUQ. MIRTA", "FARMACIA SUR", "ROTISERÍA", "CARNICERÍA", "LIBRERÍA ZOE", "HELADOS LÚ", "ESTUDIO DÍAZ", "AUTOS RUBIO", "PANCHO SRL", "TEXTIL ORO", "LA CASONA", "PINTURAS MAX", "VERDULERÍA", "BAZAR ELSA", "TORNERÍA", "ZAPATOS LEO", "ALMACÉN NORA", "DENT. RÍOS", "SERVICE TV", "FOTOS IRIS", "MÁRMOLES", "BICIS CORDÓN", "IMPRENTA", "VIVERO SOL", "GYM NORTE", "ÓPTICA PAZ", "CERRAJERÍA", "PIZZERÍA", "MUEBLES ROS", "LAVADERO", "QUESOS JUAN", "AGRO LIMA", "TAPICERÍA", "CHAPA Y P.", "DISEÑO MIA", "VETE GUAU", "PASTAS ROSA", "TAXI 1234", "MERCERÍA", "CAFÉ PLAZA", "ELECTRO AVE", "PAPELERA", "FRUTAS ALE", "ESTÉTICA LU", "GRÁFICA 3", "CONSTRUC. M", "KARINA SRL"];
// el orden en que mandan (P3): los primeros 33 ya mandaron; del 33 al 40 se abultan de a uno; MARCELO (0) nunca
const ORDEN_SOBRES = (() => { const o = []; semilla = 21; const idx = CLIENTES.map((_, i) => i).filter((i) => i !== 0); for (let i = idx.length - 1; i > 0; i--) { const j = Math.floor(az() * (i + 1)); [idx[i], idx[j]] = [idx[j], idx[i]]; } o.push(...idx); return o; })();
let sobresG;
{
  const atlas = lienzo(2048, 1024, (x, w, h) => {
    x.fillStyle = "#c9a774"; x.fillRect(0, 0, w, h);
    for (let i = 0; i < 60; i++) { const c = i % 10, r = Math.floor(i / 10), cw = w / 10, ch = h / 6;
      x.fillStyle = "#efeee5"; x.fillRect(c * cw + 14, r * ch + 30, cw - 28, 62); x.strokeStyle = "#16243d"; x.lineWidth = 4; x.strokeRect(c * cw + 14, r * ch + 30, cw - 28, 62);
      x.fillStyle = "#0b1220"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, CLIENTES[i], 800, 34, cw - 44); x.fillText(CLIENTES[i], c * cw + cw / 2, r * ch + 62); }
  });
  sobresG = new THREE.Group(); sobresG.position.set(0.66, 0, EST.z0 + 0.18); OF.add(sobresG);
  const W = 1.02, ys = [0.3, 0.6, 0.9, 1.2, 1.5, 1.8];
  sobresG.add(caja(0.03, 2.05, 0.3, M.navy3, -W / 2 - 0.02, 1.02, 0, 0.006)); sobresG.add(caja(0.03, 2.05, 0.3, M.navy3, W / 2 + 0.02, 1.02, 0, 0.006));
  for (const y of ys) sobresG.add(caja(W + 0.06, 0.025, 0.3, M.navy3, 0, y - 0.0125, 0, 0.004));
  sobresG.add(caja(W + 0.06, 0.025, 0.3, M.navy3, 0, 2.06, 0, 0.004));
  const kraft = mat(0xc9a774, 0.85), kraftO = mat(0xb08c58, 0.85);
  for (let i = 0; i < 60; i++) {
    const c = i % 10, r = Math.floor(i / 10), sw = W / 10;
    const s = new THREE.Group(); s.position.set(-W / 2 + sw * (c + 0.5), ys[5 - r], 0.02); sobresG.add(s);
    const cuerpo = caja(sw - 0.008, 0.25, 0.03, c % 2 ? kraft : kraftO, 0, 0.125, 0, 0.004); s.add(cuerpo);
    const g = new THREE.PlaneGeometry(sw - 0.014, 0.25); const uv = g.attributes.uv;
    for (let k = 0; k < uv.count; k++) uv.setXY(k, (c + 0.04 + uv.getX(k) * 0.92) / 10, 1 - (r + 1 - uv.getY(k)) / 6);
    const fr = new THREE.Mesh(g, new THREE.MeshStandardMaterial({ map: atlas, roughness: 0.85 })); fr.position.set(0, 0.125, 0.016); s.add(fr);
    const tab = caja(0.035, 0.05, 0.01, M.red, -0.015, 0.265, 0.005, 0.004); s.add(tab);
    s.userData = { cuerpo, fr, tab };
    sobres.push(s);
  }
  sombras(sobresG);
}
// cuántos sobres llenos hay en t (parte 1: 33 → 41 en P3; parte 2 el estante no está)
function ponerSobres(n) {
  for (let i = 0; i < 60; i++) sobres[i].userData.lleno = 0;
  if (n >= 60) for (const s of sobres) s.userData.lleno = 1;
  else { for (let k = 0; k < Math.min(59, Math.floor(n)); k++) sobres[ORDEN_SOBRES[k]].userData.lleno = 1;
    const f = n - Math.floor(n); if (f > 0 && Math.floor(n) < 59) sobres[ORDEN_SOBRES[Math.floor(n)]].userData.lleno = f; }
  for (const s of sobres) { const k = s.userData.lleno, z = lerp(0.35, 1.6, bk(k)); s.userData.cuerpo.scale.z = z; s.userData.fr.position.z = 0.015 * z + 0.001; s.userData.tab.visible = k < 0.5; }
}
// ---- EL ESCRITORIO DE ADRIANA (madera oscura de casona, tapa con borde), la silla ----
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
// ---- LA LÁMPARA DE BANQUERO: base de bronce opaco, pantalla alargada de vidrio verde de marca, cadenita ----
{
  lampara = new THREE.Group(); lampara.position.set(LAMP.x, MESA_Y, LAMP.z); lampara.rotation.y = 0.25; OF.add(lampara);
  const br = mat(0x9a7a4a, 0.45, { metalness: 0.45 });
  lampara.add(mesh(new THREE.CylinderGeometry(0.08, 0.095, 0.03, 28), br, 0, 0.015, 0));
  lampara.add(mesh(new THREE.CylinderGeometry(0.012, 0.014, 0.36, 12), br, 0, 0.2, 0));
  lampara.add(mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.12, 10).rotateZ(Math.PI / 2), br, 0, 0.37, 0));
  // la pantalla: medio cilindro alargado (abierto abajo), verde de marca, con el borde de bronce
  const verdeL = new THREE.MeshStandardMaterial({ color: 0x5ce611, roughness: 0.35, emissive: 0x2a6a08, emissiveIntensity: 0.55, side: THREE.DoubleSide });
  pantallaLamp = mesh(new THREE.CylinderGeometry(0.085, 0.085, 0.34, 32, 1, true, -Math.PI / 2, Math.PI).rotateZ(Math.PI / 2), verdeL, 0, 0.4, 0.0); pantallaLamp.scale.set(1, 1, 0.82); lampara.add(pantallaLamp);
  for (const s of [-1, 1]) { const tapa = mesh(new THREE.CircleGeometry(0.085, 24, 0, Math.PI), verdeL, s * 0.17, 0.4, 0); tapa.rotation.y = s * Math.PI / 2; tapa.scale.set(0.82, 1, 1); lampara.add(tapa); }
  const borde = mesh(new THREE.TorusGeometry(0.085, 0.005, 6, 32, Math.PI), br, 0, 0.4, 0); borde.rotation.y = Math.PI / 2; borde.scale.set(1, 1, 0.82); void borde;
  // el foco cálido debajo de la pantalla (se ve desde abajo) y la luz
  const foco = mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.26, 12).rotateZ(Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0xfff1c8 }), 0, 0.37, 0); foco.castShadow = false; lampara.add(foco); lampara.userData.foco = foco;
  luzLamp = new THREE.PointLight(0xffd9a0, 2.2, 3.2, 1.6); luzLamp.position.set(0, 0.34, 0.02); lampara.add(luzLamp);
  // la cadenita (cuentitas) que cuelga del borde derecho de la pantalla, con la perilla
  cadena = new THREE.Group(); cadena.position.set(0.12, 0.33, 0.07); lampara.add(cadena);
  for (let i = 0; i < 9; i++) cadena.add(mesh(new THREE.SphereGeometry(0.0045, 8, 6), br, 0, -i * 0.011, 0));
  cadena.add(mesh(new THREE.CylinderGeometry(0.008, 0.006, 0.026, 10), br, 0, -0.105, 0));
  sombras(lampara); foco.castShadow = false; for (const o of [pantallaLamp]) o.castShadow = false;
}
// ---- LA SUMADORA (crema, teclas navy) con el rollo y la tira de papel ----
const tiraT = lienzo(128, 512, (x, w, h) => { x.fillStyle = "#fbfaf4"; x.fillRect(0, 0, w, h); x.fillStyle = "#16243d"; for (let y = 20; y < h; y += 42) { const L = 30 + ((y * 7) % 50); x.fillRect(w - 18 - L, y, L, 9); } x.fillStyle = "#c7655b"; x.fillRect(w - 64, 230, 46, 9); });
tiraT.wrapS = tiraT.wrapT = THREE.RepeatWrapping;
{
  sumadora = new THREE.Group(); sumadora.position.set(SUM.x, MESA_Y, SUM.z); sumadora.rotation.y = Math.PI - 0.15; OF.add(sumadora);
  // (mira a -z: el teclado hacia Adriana; el rollo atrás, hacia la cámara)
  const crm = mat(0xe8e4d4, 0.5);
  sumadora.add(caja(0.2, 0.06, 0.24, crm, 0, 0.03, 0, 0.02));
  const tapa = caja(0.2, 0.05, 0.12, crm, 0, 0.075, -0.05, 0.015); tapa.rotation.x = 0.0; sumadora.add(tapa);
  for (let i = 0; i < 4; i++) for (let k = 0; k < 4; k++) sumadora.add(caja(0.032, 0.014, 0.026, k === 3 && i === 3 ? M.g : M.navy3, -0.06 + k * 0.04, 0.066, 0.02 + i * 0.026, 0.005));
  sumadora.add(caja(0.15, 0.02, 0.04, M.navy, 0, 0.11, -0.08, 0.006));   // el visor
  // el rollo de papel arriba, atrás
  sumadora.add(mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.07, 20).rotateZ(Math.PI / 2), mat(0xfbfaf4, 0.8), 0, 0.14, -0.1));
  for (const s of [-1, 1]) sumadora.add(caja(0.008, 0.07, 0.05, crm, s * 0.045, 0.12, -0.1, 0.003));
  sombras(sumadora);
  // la tira: una cinta que se recalcula con su largo (función pura de t)
  const N = 90;
  const pos = new Float32Array((N + 1) * 2 * 3), uvs = new Float32Array((N + 1) * 2 * 2), idx = [];
  for (let i = 0; i < N; i++) { const a = i * 2, b = a + 1, c = a + 2, d = a + 3; idx.push(a, c, b, b, c, d); }
  const g = new THREE.BufferGeometry(); g.setAttribute("position", new THREE.BufferAttribute(pos, 3)); g.setAttribute("uv", new THREE.BufferAttribute(uvs, 2)); g.setIndex(idx);
  tira = new THREE.Mesh(g, new THREE.MeshStandardMaterial({ map: tiraT, roughness: 0.8, side: THREE.DoubleSide })); tira.castShadow = true; tira.receiveShadow = true; tira.frustumCulled = false; OF.add(tira);
  tira.userData.N = N;
}
// el camino de la tira (en coordenadas del mundo): sale del rollo, pasa por el borde del escritorio, cae y se enrula en
// el piso hacia la cámara
function caminoTira(s) {
  const X = SUM.x + 0.012, y0 = MESA_Y + 0.17, z0 = SUM.z + 0.1;
  const a = 0.09, b = Math.hypot(DESK.z1 + 0.012 - (z0 + 0.03), y0 + 0.02 - MESA_Y), caida = MESA_Y;
  if (s < a) { const u = s / a; return [X, y0 + Math.sin(u * Math.PI / 2) * 0.025, z0 + u * 0.035]; }
  if (s < a + b) { const u = (s - a) / b; return [X, lerp(y0 + 0.025, MESA_Y + 0.006, u), lerp(z0 + 0.035, DESK.z1 + 0.012, u)]; }
  if (s < a + b + caida) { const u = (s - a - b); return [X + Math.sin(u * 4) * 0.004, MESA_Y + 0.006 - u, DESK.z1 + 0.014 + u * 0.03]; }
  const u = s - a - b - caida;   // el piso: avanza hacia +z y se enrula (rulos chatos)
  return [X + Math.sin(u * 7) * 0.06, 0.004 + Math.max(0, Math.sin(u * 9)) * 0.05 * Math.min(1, u * 3), DESK.z1 + 0.04 + u * 0.38];
}
function ponerTira(L) {
  const { N } = tira.userData, p = tira.geometry.attributes.position, uv = tira.geometry.attributes.uv;
  const ancho = 0.057;
  let prev = caminoTira(0);
  for (let i = 0; i <= N; i++) {
    const s = (L * i) / N, c = caminoTira(s), n = caminoTira(Math.min(L, s + 0.005)), d = [n[0] - c[0], n[1] - c[1], n[2] - c[2]];
    // el ancho va siempre en x (la tira cae de frente a la cámara)
    void d; void prev; prev = c;
    p.setXYZ(i * 2, c[0] - ancho / 2, c[1], c[2]); p.setXYZ(i * 2 + 1, c[0] + ancho / 2, c[1], c[2]);
    uv.setXY(i * 2, 0, s / 0.23); uv.setXY(i * 2 + 1, 1, s / 0.23);
  }
  p.needsUpdate = true; uv.needsUpdate = true; tira.geometry.computeVertexNormals(); tira.geometry.computeBoundingSphere();
}
// ---- la pila de carpetas (parte 1) y el monitor (parte 2), en el mismo lugar ----
{
  carpetas = new THREE.Group(); carpetas.position.set(MON.x + 0.02, MESA_Y, MON.z); carpetas.rotation.y = 0.1; OF.add(carpetas);
  semilla = 9;
  for (let i = 0; i < 9; i++) { const c = caja(0.25, 0.022, 0.32, [M.navy3, mat(0xc9a774, 0.8), mat(0x3fa60a, 0.6), M.cr][i % 4], (az() - 0.5) * 0.03, 0.011 + i * 0.023, (az() - 0.5) * 0.03, 0.004); c.rotation.y = (az() - 0.5) * 0.25; carpetas.add(c); }
  sombras(carpetas);
  monitor = new THREE.Group(); monitor.position.set(MON.x, MESA_Y, MON.z); monitor.rotation.y = MON.ry; OF.add(monitor);
  monitor.add(caja(0.07, 0.24, 0.07, M.navy, 0, 0.12, -0.05)); monitor.add(caja(0.26, 0.02, 0.18, M.navy, 0, 0.01, -0.03));
  monitor.add(caja(MON.W + 0.04, MON.H + 0.04, 0.04, M.navy, 0, 0.26 + MON.H / 2, 0, 0.016));
  const pm = new THREE.Mesh(new THREE.PlaneGeometry(MON.W, MON.H), new THREE.MeshBasicMaterial({ map: pantMon, toneMapped: false })); pm.position.set(0, 0.26 + MON.H / 2, 0.021); monitor.add(pm);
  monitor.userData.centro = V3(0, 0.26 + MON.H / 2, 0.021);
  sombras(monitor);
}
// ---- el celular de Adriana en su soporte (navy2), la pantalla a la cámara ----
{
  telA = new THREE.Group(); telA.position.set(SOP.x, MESA_Y, SOP.z); telA.rotation.y = 0.12; OF.add(telA);
  telA.add(caja(0.12, 0.012, 0.1, M.navy3, 0, 0.006, 0, 0.004)); telA.add(caja(0.1, 0.07, 0.012, M.navy3, 0, 0.04, -0.035, 0.004));
  const piv = new THREE.Group(); piv.position.set(0, 0.018, 0.0); piv.rotation.x = -0.38; telA.add(piv);
  const S = 1.45, W = 0.08 * S, H = 0.162 * S;
  piv.add(caja(W + 0.008, H + 0.008, 0.013, mat(0x16243d, 0.5), 0, H / 2, 0, 0.012));
  const sp = new THREE.Mesh(new THREE.PlaneGeometry(W - 0.004, H - 0.006), new THREE.MeshBasicMaterial({ map: pantA, toneMapped: false })); sp.position.set(0, H / 2, 0.0072); piv.add(sp);
  telA.userData = { piv, sp, centro: V3(0, H / 2, 0.0072), H, W };
  sombras(telA);
}
// ---- el piolín con broches de ropa y tickets colgando (parte 1), y el perchero que lo sostiene ----
const ticketT = lienzo(128, 512, (x, w, h) => { x.fillStyle = "#fbfaf4"; x.fillRect(0, 0, w, h); x.fillStyle = "#16243d"; for (let y = 60; y < h - 40; y += 46) x.fillRect(16, y, (y * 13) % 3 ? 70 : 96, 9); x.fillRect(16, 26, 96, 12); });
const ticketM = new THREE.MeshStandardMaterial({ map: ticketT, roughness: 0.85, side: THREE.DoubleSide });
const ticketBlancoM = new THREE.MeshStandardMaterial({ color: 0xfbfaf4, roughness: 0.85, side: THREE.DoubleSide });
const brocheM = mat(0xc9a06a, 0.7);
function crearTicket(L = 0.24, W = 0.075, blanco = false, centro = false) {
  const g = new THREE.Group();
  const t = new THREE.Mesh(new THREE.PlaneGeometry(W, L, 1, 6), blanco ? ticketBlancoM : ticketM);
  { const p = t.geometry.attributes.position; for (let i = 0; i < p.count; i++) p.setZ(i, Math.sin((p.getY(i) / L) * Math.PI) * 0.008); t.geometry.computeVertexNormals(); }
  t.position.y = centro ? 0 : -L / 2; g.add(t); t.castShadow = true; t.receiveShadow = true;
  return g;
}
const colgados = [];
{
  piolin = new THREE.Group(); OF.add(piolin);
  const hilo = mesh(new THREE.CylinderGeometry(0.003, 0.003, PIOL.z1 - PIOL.z0, 6).rotateX(Math.PI / 2), mat(0xefeee5, 0.8), PIOL.x, PIOL.y, (PIOL.z0 + PIOL.z1) / 2); piolin.add(hilo);
  // el perchero de pie (adelante) que sostiene la punta del piolín; la otra punta, un clavo en el estante de sobres
  const per = new THREE.Group(); per.position.set(PIOL.x, 0, PIOL.z1); piolin.add(per);
  per.add(mesh(new THREE.CylinderGeometry(0.02, 0.025, 1.8, 10), MADERA, 0, 0.9, 0)); per.add(mesh(new THREE.CylinderGeometry(0.2, 0.22, 0.03, 18), MADERA, 0, 0.015, 0));
  for (let i = 0; i < 4; i++) { const k = mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.16, 6), MADERA, Math.cos(i * 1.57) * 0.06, 1.7, Math.sin(i * 1.57) * 0.06); k.rotation.set(Math.sin(i * 1.57) * 0.8, 0, -Math.cos(i * 1.57) * 0.8); per.add(k); }
  semilla = 41;
  for (let z = 0.25, i = 0; z < PIOL.z1 - 0.15; z += 0.2, i++) {
    const tk = crearTicket(0.16 + az() * 0.18, 0.07); tk.position.set(PIOL.x, PIOL.y - 0.012, z); tk.rotation.set((az() - 0.5) * 0.12, Math.PI / 2 + (az() - 0.5) * 0.4, (az() - 0.5) * 0.1); piolin.add(tk);
    const br = new THREE.Group(); br.position.set(PIOL.x, PIOL.y - 0.008, z); br.rotation.y = Math.PI / 2; piolin.add(br);
    for (const s of [-1, 1]) br.add(caja(0.012, 0.07, 0.006, brocheM, 0, -0.012, s * 0.004, 0.002));
    colgados.push({ tk, br, z });
  }
  sombras(piolin);
}
// el ticket que Lucas cuelga en P3 (viaja de su mano al piolín)
const ticketLucas = crearTicket(0.26, 0.07); OF.add(ticketLucas);
const brocheLucas = new THREE.Group(); for (const s of [-1, 1]) brocheLucas.add(caja(0.012, 0.07, 0.006, brocheM, 0, -0.012, s * 0.004, 0.002)); sombras(brocheLucas); OF.add(brocheLucas);
banquito = crearBanquito(0.46); banquito.position.set(LUC1.x, 0, LUC1.z - 0.02); OF.add(banquito);
// ---- el escritorio de Lucas (parte 2): monitor chico y la taza de café crema ----
{
  lucasDesk = new THREE.Group(); OF.add(lucasDesk);
  lucasDesk.add(escritorio(LUC2.x - 0.32, LUC2.x + 0.32, 0.42, 0.98, mat(0xd7c7a8, 0.6), M.navy3));
  const m = new THREE.Group(); m.position.set(LUC2.x + 0.05, MESA_Y, 0.55); m.rotation.y = Math.PI - 0.2; lucasDesk.add(m);
  m.add(caja(0.06, 0.2, 0.06, M.navy, 0, 0.1, -0.03)); m.add(caja(0.45, 0.3, 0.035, M.navy, 0, 0.36, 0, 0.012));
  const taza = new THREE.Group(); taza.position.set(LUC2.x - 0.2, MESA_Y, 0.8); lucasDesk.add(taza);
  taza.add(mesh(new THREE.CylinderGeometry(0.04, 0.035, 0.1, 18), M.cr, 0, 0.05, 0)); taza.add(mesh(new THREE.TorusGeometry(0.025, 0.008, 8, 14), M.cr, 0.045, 0.055, 0)); taza.add(mesh(new THREE.CylinderGeometry(0.036, 0.036, 0.004, 18), mat(0x4a2e1c, 0.4), 0, 0.096, 0));
  const sl = silla(); sl.position.set(LUC2.x, 0, LUC2.z - 0.04); lucasDesk.add(sl);
  sombras(lucasDesk);
}
// ---- la caja de zapatos de Marcelo (cartón crema con banda navy, un poco abollada) y la tapa ----
const cajaZ = new THREE.Group(), tapaZ = new THREE.Group();
{
  const carton = mat(0xe2d9c4, 0.85), banda = M.navy3;
  const W = 0.32, H = 0.12, D = 0.19;
  cajaZ.add(caja(W, 0.008, D, carton, 0, 0.004, 0, 0.002));
  for (const [w, d, x, z] of [[W, 0.008, 0, D / 2], [W, 0.008, 0, -D / 2], [0.008, D, W / 2, 0], [0.008, D, -W / 2, 0]]) cajaZ.add(caja(w, H, d, carton, x, H / 2, z, 0.002));
  cajaZ.add(caja(W + 0.002, 0.03, D + 0.002, banda, 0, H * 0.5, 0, 0.002));
  // adentro, el relleno de tickets (se ve cuando está llena)
  const relleno = caja(W - 0.02, 0.09, D - 0.02, mat(0xf4f1e6, 0.9), 0, 0.05, 0, 0.01); cajaZ.add(relleno); cajaZ.userData.relleno = relleno;
  tapaZ.add(caja(W + 0.016, 0.01, D + 0.016, carton, 0, 0.005, 0, 0.003));
  for (const [w, d, x, z] of [[W + 0.016, 0.006, 0, D / 2 + 0.008], [W + 0.016, 0.006, 0, -D / 2 - 0.008], [0.006, D + 0.016, W / 2 + 0.008, 0], [0.006, D + 0.016, -W / 2 - 0.008, 0]]) tapaZ.add(caja(w, 0.035, d, carton, x, -0.012, z, 0.002));
  tapaZ.add(caja(0.12, 0.002, 0.07, banda, 0.06, 0.011, 0.02, 0.001));
  sombras(cajaZ); sombras(tapaZ); OF.add(cajaZ); OF.add(tapaZ);
  cajaZ.userData.W = W; cajaZ.userData.H = H; cajaZ.userData.D = D;
}
// ---- LA AVALANCHA: ~40 tickets, un boleto, una servilleta y una figurita; caída determinista (semilla fija) desde la
// boca de la caja a su lugar en la pila (la pila tapa la sumadora a medias) ----
const PILA = [];
const figuritaT = lienzo(256, 340, (x, w, h) => { x.fillStyle = "#ffffff"; x.fillRect(0, 0, w, h); x.fillStyle = "#3fa60a"; x.fillRect(16, 16, w - 32, h - 32); x.fillStyle = "#efeee5"; x.beginPath(); x.arc(w / 2, h / 2 - 10, 70, 0, 7); x.fill(); x.strokeStyle = "#0b1220"; x.lineWidth = 8; x.stroke(); x.fillStyle = "#0b1220"; for (const [a, r] of [[0, 0], [1.2, 44], [2.5, 44], [3.8, 44], [5.1, 44]]) { x.beginPath(); x.arc(w / 2 + Math.cos(a) * r, h / 2 - 10 + Math.sin(a) * r, 18, 0, 7); x.fill(); } x.fillStyle = "#0b1220"; x.fillRect(16, h - 70, w - 32, 54); x.fillStyle = "#efeee5"; x.font = F(900, 36); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("N.º 147", w / 2, h - 42); });
const boletoT = lienzo(256, 160, (x, w, h) => { x.fillStyle = "#efe3b8"; x.fillRect(0, 0, w, h); x.fillStyle = "#16243d"; x.font = F(900, 40); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("BOLETO", w / 2, 48); x.font = F(800, 44); x.fillText("$ 52", w / 2, 108); x.strokeStyle = "#16243d"; x.lineWidth = 5; x.setLineDash([10, 8]); x.strokeRect(8, 8, w - 16, h - 16); });
const servT = lienzo(256, 256, (x, w, h) => { x.fillStyle = "#ffffff"; x.fillRect(0, 0, w, h); x.strokeStyle = "#d9d7c9"; x.lineWidth = 6; x.strokeRect(10, 10, w - 20, h - 20); x.fillStyle = "#16243d"; x.font = CAV(60); x.textAlign = "left"; x.textBaseline = "middle"; x.fillText("harina 2200", 22, 70); x.fillText("+ luz ??", 22, 140); x.fillText("1.380", 22, 205); });
{
  semilla = 77;
  // la superficie de la pila: escritorio, sumadora (más alta) y un montículo
  const R = 0.36, CXP = 0.28, CZP = 1.06;
  for (let i = 0; i < 44; i++) {
    let tipo = "t", g;
    if (i === 40) tipo = "boleto"; else if (i === 41) tipo = "serv"; else if (i === 42) tipo = "fig"; else if (i === 43) tipo = "bola";
    if (tipo === "t") g = crearTicket(0.14 + az() * 0.2, 0.075, false, true);
    else if (tipo === "bola") { g = new THREE.Group(); const b = mesh(new THREE.IcosahedronGeometry(0.035, 0), ticketBlancoM, 0, 0, 0); g.add(b); }
    else { g = new THREE.Group(); const [w, h, tex] = tipo === "boleto" ? [0.07, 0.044, boletoT] : tipo === "serv" ? [0.12, 0.12, servT] : [0.06, 0.08, figuritaT]; const p = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshStandardMaterial({ map: tex, roughness: 0.8, side: THREE.DoubleSide })); g.add(p); p.castShadow = true; }
    // lugar de reposo: una muestra en el disco de la pila (la figurita, el boleto y la servilleta arriba y adelante)
    let x, z, r;
    do { const a = az() * Math.PI * 2; r = Math.sqrt(az()) * R; x = CXP + Math.cos(a) * r * 1.15; z = CZP + Math.sin(a) * r * 0.62; } while (x < 0.0 || z > DESK.z1 - 0.13 || z < DESK.z0 + 0.1 || x > DESK.x1 - 0.12 || (Math.abs(x - SOP.x) < 0.12 && Math.abs(z - SOP.z) < 0.1) || (Math.abs(x - MON.x) < 0.16 && z < MON.z + 0.2));
    if (tipo === "fig") { x = 0.16; z = 1.24; } if (tipo === "boleto") { x = 0.36; z = 1.27; } if (tipo === "serv") { x = 0.05; z = 1.16; }
    const sobreSum = Math.abs(x - SUM.x) < 0.13 && Math.abs(z - SUM.z) < 0.15 ? 0.13 : 0;
    const mont = 0.11 * Math.pow(Math.max(0, 1 - r / R), 1.3);
    const y = MESA_Y + Math.max(sobreSum, mont) + 0.004 + i * 0.0011 + (["fig", "boleto", "serv"].includes(tipo) ? 0.03 : 0);
    const rot = [-Math.PI / 2 + (az() - 0.5) * 0.5, az() * Math.PI * 2, (az() - 0.5) * 0.4];
    // salida: la boca de la caja (se calcula en renderAt) con un desfasaje y un giro inicial
    const d = i * 0.008 + az() * 0.05;
    const r0 = [az() * 3, az() * 3, az() * 3];
    g.visible = false; OF.add(g);
    PILA.push({ g, tipo, fin: V3(x, y, z), rot, d, r0, dx: (az() - 0.5) * 0.12 });
  }
}
// ---- EL TICKET EN BLANCO (el remate): térmico largo, blanco, borde dentado, un fantasma gris de "TOTAL" ----
const blancoT = lienzo(160, 640, (x, w, h) => {
  x.clearRect(0, 0, w, h); x.fillStyle = "#fdfdf8";
  x.beginPath(); x.moveTo(0, 12); for (let i = 0; i <= 10; i++) x.lineTo((i / 10) * w, i % 2 ? 0 : 12); x.lineTo(w, h - 12); for (let i = 10; i >= 0; i--) x.lineTo((i / 10) * w, i % 2 ? h : h - 12); x.closePath(); x.fill();
  x.fillStyle = "rgba(150,150,150,0.13)"; x.font = F(800, 30); x.textAlign = "left"; x.fillText("TOTAL", 18, h * 0.78);
});
const ticketBlanco = new THREE.Group();
{ const p = new THREE.Mesh(new THREE.PlaneGeometry(0.08, 0.3), new THREE.MeshStandardMaterial({ map: blancoT, transparent: true, alphaTest: 0.5, roughness: 0.8, side: THREE.DoubleSide, emissive: 0xfff6e0, emissiveIntensity: 0.55 })); p.position.y = 0.11; ticketBlanco.add(p); p.castShadow = true; ticketBlanco.userData.p = p; OF.add(ticketBlanco); }
sombras(OF);
for (const o of [pantallaLamp]) o.castShadow = false;
// ---- luces del estudio: de noche (parte 1) la pileta cálida de la lámpara y una general navy baja; de tarde (parte 2)
// la luz pareja de la ventana ----
const nocheAmb = new THREE.HemisphereLight(0x9aa8c8, 0x2a2a35, 1.25); scene.add(nocheAmb);
const nocheKey = new THREE.DirectionalLight(0xffe6c4, 1.1); nocheKey.position.set(-1.2, 3.2, 3.5); nocheKey.target.position.set(0, 0.9, 0.8); nocheKey.castShadow = true; nocheKey.shadow.mapSize.set(2048, 2048); nocheKey.shadow.bias = -0.0008; nocheKey.shadow.radius = 3; Object.assign(nocheKey.shadow.camera, { left: -3, right: 3, top: 3, bottom: -3, near: 0.5, far: 14 }); scene.add(nocheKey, nocheKey.target);
const nocheRel = new THREE.DirectionalLight(0xb8c8e8, 0.5); nocheRel.position.set(3, 2.2, 2); nocheRel.target.position.set(0, 1, 0.8); scene.add(nocheRel, nocheRel.target);
const tardeSol = new THREE.DirectionalLight(0xfff0d8, 1.7); tardeSol.position.set(-2.4, 4.2, 3.8); tardeSol.target.position.set(0.2, 0.8, 0.8); tardeSol.castShadow = true; tardeSol.shadow.mapSize.set(2048, 2048); tardeSol.shadow.bias = -0.0008; tardeSol.shadow.radius = 3; Object.assign(tardeSol.shadow.camera, { left: -3, right: 3, top: 3, bottom: -3, near: 0.5, far: 14 }); scene.add(tardeSol, tardeSol.target);
const tardeCielo = new THREE.HemisphereLight(0xf7f2e6, 0x4a4e5a, 2.0); scene.add(tardeCielo);

// =====================================================================================================
// "PANADERÍA MARCELO" (x = PX), de mañana: azulejo blanco con la guarda verde de marca a 1,4 m, el mostrador de madera
// clara con la vitrina de bizcochos, el canasto de flautas atrás, las bolsas de harina en el piso
// Marcelo detrás del mostrador en (PX + 0.3; 0.15) mirando a +z; el repartidor entra desde +x
// =====================================================================================================
const PX = 40;
const PAN = new THREE.Group(); PAN.position.x = PX; scene.add(PAN);
const MOST_Y = 0.98;
let bolsaH, facturaH;
const facturaCv = (() => {
  // la factura de la harina (A5 crema, encabezado navy, renglones gruesos): la misma en el mostrador y en la foto
  const c = document.createElement("canvas"); c.width = 700; c.height = 990; const x = c.getContext("2d");
  x.fillStyle = "#f6f3e8"; x.fillRect(0, 0, 700, 990);
  x.fillStyle = "#16243d"; x.fillRect(0, 0, 700, 170); x.fillStyle = "#efeee5"; x.textAlign = "left"; x.textBaseline = "middle";
  x.font = F(900, 78); x.fillText("FACTURA", 40, 70); x.font = F(700, 40); x.fillText("Molino del Sur", 40, 132);
  x.fillStyle = "#0b1220"; x.font = F(800, 44); x.fillText("Panadería Marcelo", 40, 240); x.fillStyle = "#3a4256"; x.font = F(700, 38); x.fillText("Día 3 · noviembre", 40, 300);
  x.fillStyle = "#16243d"; x.fillRect(40, 350, 620, 8);
  x.fillStyle = "#0b1220"; x.font = F(800, 46); x.fillText("Harina 000 · 25 kg", 40, 420); x.textAlign = "right"; x.fillText("x 4", 660, 420);
  x.textAlign = "left"; x.fillText("Flete", 40, 500); x.textAlign = "right"; x.fillText("1", 660, 500);
  x.fillStyle = "#d9d7c9"; x.fillRect(40, 560, 620, 6); x.fillRect(40, 640, 620, 6);
  x.fillStyle = "#16243d"; x.fillRect(40, 760, 620, 8);
  x.fillStyle = "#0b1220"; x.textAlign = "left"; x.font = F(900, 60); x.fillText("TOTAL", 40, 850); x.textAlign = "right"; x.fillText("$ 9.380", 660, 850);
  return c;
})();
{
  const W = 5, alto = 2.9;
  const azT = lienzo(512, 512, (x, w, h) => { x.fillStyle = "#d9d7cf"; x.fillRect(0, 0, w, h); for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { x.fillStyle = "#f7f7f2"; x.fillRect(i * 128 + 4, j * 128 + 4, 120, 120); } });
  azT.wrapS = azT.wrapT = THREE.RepeatWrapping; azT.repeat.set(W / 0.6, alto / 0.6);
  const pared = mesh(new THREE.PlaneGeometry(W, alto), new THREE.MeshStandardMaterial({ map: azT, roughness: 0.4 }), 0, alto / 2, -0.5); pared.castShadow = false; PAN.add(pared);
  PAN.add(caja(W, 0.1, 0.03, M.g, 0, 1.4, -0.48, 0.006));
  const pisoT = lienzo(256, 256, (x, w, h) => { x.fillStyle = "#cfc8b4"; x.fillRect(0, 0, w, h); x.strokeStyle = "#b9b19a"; x.lineWidth = 6; x.strokeRect(0, 0, w, h); });
  pisoT.wrapS = pisoT.wrapT = THREE.RepeatWrapping; pisoT.repeat.set(W / 0.5, 5 / 0.5);
  const piso = mesh(new THREE.PlaneGeometry(W, 5), new THREE.MeshStandardMaterial({ map: pisoT, roughness: 0.8 }), 0, 0, 2); piso.rotation.x = -Math.PI / 2; piso.castShadow = false; PAN.add(piso);
  for (const x of [-W / 2, W / 2]) { const p = mesh(new THREE.PlaneGeometry(5, alto), new THREE.MeshStandardMaterial({ map: azT, roughness: 0.4 }), x, alto / 2, 2); p.rotation.y = x < 0 ? Math.PI / 2 : -Math.PI / 2; p.castShadow = false; PAN.add(p); }
  // el mostrador: madera clara, frente navy3 con zócalo, la vitrina de vidrio a la izquierda con dos bandejas
  const mad = mat(0xd7b98a, 0.6);
  PAN.add(caja(2.2, 0.05, 0.62, mad, 0, MOST_Y - 0.025, 0.85, 0.012));
  PAN.add(caja(2.16, MOST_Y - 0.05, 0.56, M.navy3, 0, (MOST_Y - 0.05) / 2, 0.86, 0.01));
  PAN.add(caja(2.2, 0.06, 0.04, mad, 0, MOST_Y * 0.55, 1.15, 0.01));
  const VX0 = -1.05, VX1 = -0.05;
  const vid = new THREE.Mesh(new THREE.BoxGeometry(VX1 - VX0, 0.34, 0.5), new THREE.MeshPhysicalMaterial({ color: 0xdfeef2, roughness: 0.05, transparent: true, opacity: 0.16, depthWrite: false })); vid.position.set((VX0 + VX1) / 2, MOST_Y + 0.17, 0.85); vid.renderOrder = 3; PAN.add(vid);
  for (const [x, z] of [[VX0, 0.6], [VX1, 0.6], [VX0, 1.1], [VX1, 1.1]]) PAN.add(caja(0.025, 0.34, 0.025, M.gris, x, MOST_Y + 0.17, z, 0.004));
  PAN.add(caja(VX1 - VX0, 0.02, 0.52, M.gris, (VX0 + VX1) / 2, MOST_Y + 0.35, 0.85, 0.004));
  for (const x of [-0.8, -0.3]) { const b = crearBandejaBizcochos(); b.position.set(x, MOST_Y, 0.85); b.scale.setScalar(0.95); PAN.add(b); }
  // atrás: el estante con el canasto de flautas
  PAN.add(caja(1.6, 0.04, 0.35, mad, -0.4, 1.12, -0.32, 0.01));
  const can = new THREE.Group(); can.position.set(-0.4, 1.14, -0.32); PAN.add(can);
  can.add(caja(0.7, 0.18, 0.28, mat(0xb08c58, 0.8), 0, 0.09, 0, 0.03));
  for (let i = 0; i < 6; i++) { const f = crearPanFlauta(0.56); f.position.set(-0.2 + i * 0.08, 0.2 + (i % 2) * 0.03, (i % 3 - 1) * 0.06); f.rotation.set(0, 0.2, 0.9 + (i % 2) * 0.12); can.add(f); }
  // el cartelito "Panadería Marcelo" (sin marca real), crema con letras navy
  const cT = lienzo(1024, 220, (x, w, h) => { x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h); x.strokeStyle = "#16243d"; x.lineWidth = 16; x.strokeRect(8, 8, w - 16, h - 16); x.fillStyle = "#16243d"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "PANADERÍA MARCELO", 900, 120, w - 80); x.fillText("PANADERÍA MARCELO", w / 2, h / 2 + 6); });
  PAN.add(plano(1.3, 0.28, cT, 0.2, 2.5, -0.47));
  // las bolsas de harina de 25 kg (crema con banda navy, sin marca) apiladas a la derecha
  const bolsa = () => { const g = new THREE.Group(); g.add(caja(0.42, 0.13, 0.62, mat(0xeee8d6, 0.9), 0, 0.065, 0, 0.05)); g.add(caja(0.425, 0.132, 0.1, M.navy3, 0, 0.066, 0.06, 0.02)); return sombras(g); };
  for (let i = 0; i < 4; i++) { const b = bolsa(); b.position.set(1.55 + (i % 2) * 0.05, i * 0.13, -0.15); b.rotation.y = (i % 2) * 0.12; PAN.add(b); }
  bolsaH = bolsa(); PAN.add(bolsaH);
  facturaH = new THREE.Mesh(new THREE.PlaneGeometry(0.15, 0.212), new THREE.MeshStandardMaterial({ map: (() => { const t = new THREE.CanvasTexture(facturaCv); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t; })(), roughness: 0.8 })); facturaH.rotation.x = -Math.PI / 2; facturaH.receiveShadow = true; PAN.add(facturaH);
  sombras(PAN); vid.castShadow = false;
}
const solPan = new THREE.DirectionalLight(0xfff4e2, 1.8); solPan.position.set(PX + 1.5, 4, 4); solPan.target.position.set(PX, 0.9, 0.6); solPan.castShadow = true; solPan.shadow.mapSize.set(2048, 2048); solPan.shadow.bias = -0.0008; solPan.shadow.radius = 3; Object.assign(solPan.shadow.camera, { left: -3, right: 3, top: 3, bottom: -3, near: 0.5, far: 14 }); scene.add(solPan, solPan.target);
const cieloPan = new THREE.HemisphereLight(0xf8f6ef, 0x6a6458, 2.0); scene.add(cieloPan);

// =====================================================================================================
// LOS PERSONAJES
// =====================================================================================================
const adriana = crearPersonaje({ ...DEFECTO, nombre: "Adriana", mejillasBajas: true, piel: PIEL.clara, pelo: 0x5a4a40, peinado: "melena", lentes: MARCA.navy3, lentesFinos: true,
  cejasColor: 0x4a3c34, cejaFina: true, pestanas: 0x1a1414, cuelloFino: true, camisa: 0xf7f7f2, mangas: "largas", cuello: 0xf7f7f2, cuelloBotones: false,
  campera: { color: MARCA.navy3, cuello: MARCA.navy3, cierre: MARCA.navy2, abierta: true }, pantalon: MARCA.navy, zapatos: MARCA.navy2, aros: MARCA.cr,
  labiosPegados: true, labios: 0xa8585a, mejillas: 0xe39282, panza: 1.0, nariz: 0.05, alto: 0.97, dedos: true, parpadeoCada: 999, parpadeosExtra: [] });
const marcelo = crearPersonaje({ ...DEFECTO, nombre: "Marcelo", mejillasBajas: true, piel: PIEL.media, pelo: 0x6f6c69, peinado: "texturado", texturaAlto: 0.3,
  barba: 0x4a4644, barbaLarga: 0.3, barbaOpacidad: 0.7, barbaBigote: true, cejasColor: 0x3a3634, cejaGruesa: true,
  camisa: MARCA.cr2, mangas: "largas", cuello: MARCA.cr, cuelloBotones: false, campera: { color: 0x2f5a1c, cuello: 0x2f5a1c, cierre: MARCA.navy3, abierta: true },
  pantalon: 0x3a3f4a, zapatos: 0x3b2a20, panza: 1.1, nariz: 0.06, mejillas: 0xd98a78, alto: 1.0, dedos: true, parpadeoCada: 999, parpadeosExtra: [] });
const lucas = crearPersonaje({ ...DEFECTO, nombre: "Lucas", mejillasBajas: true, piel: PIEL.trigueña, pelo: PELO.negro, peinado: "corto", cortoMechas: true, cejasColor: 0x1e1a18,
  lentes: MARCA.navy2, camisa: 0xb9cde0, mangas: "largas", cuello: 0xb9cde0, cuelloBotones: false, pantalon: MARCA.cr2, zapatos: MARCA.navy,
  panza: 0.95, nariz: 0.054, mejillas: 0xb8644e, alto: 1.02, dedos: true, parpadeoCada: 999, parpadeosExtra: [] });
const repartidor = crearPersonaje({ ...DEFECTO, nombre: "Repartidor", piel: PIEL.media, pelo: PELO.castaño, peinado: "corto", camisa: MARCA.navy2, mangas: "largas", cuello: MARCA.navy2,
  cuelloBotones: false, pantalon: 0x3a3f4a, zapatos: 0x2a2220, alto: 1.02, dedos: true, parpadeoCada: 999 });
const TODOS = [adriana, marcelo, lucas, repartidor];
for (const p of TODOS) { scene.add(p.raiz); p.raiz.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } }); }
// los celulares en la mano: el de Marcelo (funda verde oscuro)
const celM = crearCelular(pantMar, 0x2f5a1c, 0.08 * 1.25, 0.162 * 1.25); scene.add(celM);

// ---- Sofi en videollamada: una escena aparte que se renderiza a una textura cada cuadro (Q5) ----
const sofi = crearPersonaje({ ...ELENCO.sofi, camisa: 0x2c4268, franja: null, cuello: MARCA.cr, cuelloBotones: false, cuelloFino: true, auricularFino: true, dedos: true, parpadeoCada: 999, parpadeosExtra: [] });
for (const sx of [-1, 1]) { const c = mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.07, 24).rotateZ(Math.PI / 2), M.g, sx * 0.37, 0.24, 0.02); sofi.cabeza.add(c); const v = mesh(new THREE.TorusGeometry(0.36, 0.02, 8, 32, Math.PI), M.navy, 0, 0.27, 0.0); if (sx > 0) sofi.cabeza.add(v); }
const SOFI = { esc: new THREE.Scene(), rt: new THREE.WebGLRenderTarget(432, 768), cam: new THREE.PerspectiveCamera(28, 432 / 768, 0.05, 20) };
{
  SOFI.rt.texture.colorSpace = THREE.SRGBColorSpace;
  SOFI.esc.background = new THREE.Color(0x16243d);
  SOFI.esc.add(new THREE.HemisphereLight(0xffffff, 0x6a7080, 2.0)); const dl = new THREE.DirectionalLight(0xfff4e8, 1.7); dl.position.set(1.2, 2.2, 3); SOFI.esc.add(dl);
  SOFI.esc.add(sofi.raiz);
  const fondo = new THREE.Mesh(new THREE.PlaneGeometry(4, 4), new THREE.MeshBasicMaterial({ color: 0x1f3254 })); fondo.position.set(0, 1.4, -0.9); SOFI.esc.add(fondo);
  const logoT = await new THREE.TextureLoader().loadAsync("assets/logo-blanco.png"); logoT.colorSpace = THREE.SRGBColorSpace;
  const ar = logoT.image.width / logoT.image.height;
  const logo = new THREE.Mesh(new THREE.PlaneGeometry(0.34, 0.34 / ar), new THREE.MeshBasicMaterial({ map: logoT, transparent: true })); logo.position.set(0.24, 1.86, -0.88); SOFI.esc.add(logo);
}
const celuS = new THREE.Group(); celuS.position.set(0.02, MESA_Y, 1.08); celuS.rotation.y = 0.05; OF.add(celuS);
{
  const S = 1.9, W = 0.08 * S, H = 0.165 * S;
  const piv = new THREE.Group(); piv.position.y = 0.035; piv.rotation.x = -0.18; celuS.add(piv);
  piv.add(mesh(rbox(W + 0.008, H + 0.008, 0.014, 0.014), mat(C.navy, 0.4), 0, H / 2, 0));
  const pan = new THREE.Mesh(new THREE.PlaneGeometry(W - 0.004, H - 0.006), new THREE.MeshBasicMaterial({ map: SOFI.rt.texture, toneMapped: false })); pan.position.set(0, H / 2, 0.0076); piv.add(pan);
  celuS.add(caja(0.17, 0.02, 0.13, M.navy3, 0, 0.01, 0.0, 0.008)); celuS.add(caja(0.14, 0.08, 0.02, M.navy3, 0, 0.05, -0.06, 0.006));
  celuS.userData = { piv, centro: V3(0, H / 2, 0.0076), H };
  sombras(celuS);
}

// ---- avatares: la cara del personaje 3D renderizada chica en un círculo (los chats y el panel) ----
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
  AVATAR.marcelo = leer(marcelo, 0xefeee5); AVATAR.adriana = leer(adriana, 0xb9cde0);
  rt.dispose();
  // el avatar del estudio: un círculo navy con "EA" crema
  const e = document.createElement("canvas"); e.width = e.height = 256; const x = e.getContext("2d"); x.fillStyle = "#16243d"; x.fillRect(0, 0, 256, 256); x.fillStyle = "#5ce611"; x.font = F(900, 110); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("EA", 128, 136); AVATAR.estudio = e;
}

// ---- avatares, tildes, parlante (de inmobiliaria-visitas) ----
function avatar(x, cv, cx, cy, r) {
  x.save(); x.beginPath(); x.arc(cx, cy, r, 0, 7); x.closePath(); x.clip(); x.drawImage(cv, cx - r, cy - r, 2 * r, 2 * r); x.restore();
  x.strokeStyle = "#0b1220"; x.lineWidth = Math.max(4, r * 0.1); x.beginPath(); x.arc(cx, cy, r, 0, 7); x.stroke();
}
const tilde = (x, cx, cy, s, color = "#0b1220", lw = null) => { x.strokeStyle = color; x.lineWidth = lw ?? s * 0.28; x.lineCap = "round"; x.lineJoin = "round"; x.beginPath(); x.moveTo(cx - s * 0.5, cy); x.lineTo(cx - s * 0.12, cy + s * 0.38); x.lineTo(cx + s * 0.55, cy - s * 0.42); x.stroke(); };
// el íconito del parlante (para la cabecera de la burbuja del altavoz)
function parlante(x, cx, cy, r) {
  x.fillStyle = "#16243d"; x.beginPath(); x.arc(cx, cy, r, 0, 7); x.fill();
  x.fillStyle = "#efeee5"; x.beginPath(); x.moveTo(cx - r * 0.5, cy - r * 0.2); x.lineTo(cx - r * 0.22, cy - r * 0.2); x.lineTo(cx + r * 0.1, cy - r * 0.5); x.lineTo(cx + r * 0.1, cy + r * 0.5); x.lineTo(cx - r * 0.22, cy + r * 0.2); x.lineTo(cx - r * 0.5, cy + r * 0.2); x.closePath(); x.fill();
  x.strokeStyle = "#5ce611"; x.lineWidth = r * 0.14; x.lineCap = "round"; for (const k of [0.32, 0.55]) { x.beginPath(); x.arc(cx + r * 0.1, cy, r * k, -0.8, 0.8); x.stroke(); }
}

// ================= EL CHAT GENÉRICO (de corralon-portland) =================
const CW = 740, CH = 1290;   // el celular a pantalla (inserto)
// encabezado de un chat: avatar, nombre y subtítulo (o "escribiendo…" en verde)
function cabecera(x, W, cv, nombre, sub, subVerde = false) {
  x.fillStyle = "#16243d"; x.fillRect(0, 0, W, 176); x.fillStyle = "#5ce611"; x.fillRect(0, 176, W, 8);
  x.strokeStyle = "#efeee5"; x.lineWidth = 9; x.lineCap = "round"; x.beginPath(); x.moveTo(52, 70); x.lineTo(30, 92); x.lineTo(52, 114); x.stroke();
  avatar(x, cv, 124, 92, 54);
  x.textAlign = "left"; x.textBaseline = "middle"; x.fillStyle = "#efeee5"; ajustar(x, nombre, 800, 52, W - 230); x.fillText(nombre, 196, 70);
  x.fillStyle = subVerde ? "#5ce611" : "#b9c3d3"; x.font = F(700, 38); x.fillText(sub, 198, 126);
}
// la onda del audio (barras), el play y la duración
function burbujaAudio(x, X, Y, w, dur, avance = 0, cv = null) {
  x.fillStyle = "#ffffff"; x.strokeStyle = "#16243d"; x.lineWidth = 5; x.beginPath(); x.roundRect(X, Y, w, 132, [8, 32, 32, 32]); x.fill(); x.stroke();
  let x0 = X + 30; if (cv) { avatar(x, cv, X + 70, Y + 66, 44); x0 = X + 128; }
  x.fillStyle = "#16243d"; x.beginPath(); x.moveTo(x0, Y + 40); x.lineTo(x0 + 44, Y + 66); x.lineTo(x0, Y + 92); x.closePath(); x.fill();
  const b0 = x0 + 70, b1 = X + w - 120; semilla = 77;
  for (let bx = b0, i = 0; bx < b1; bx += 14, i++) { const hh = 12 + Math.abs(Math.sin(i * 0.9) * 26) + az() * 18; x.fillStyle = (bx - b0) / (b1 - b0) < avance ? "#3fa60a" : "#8a93a3"; rr(x, bx, Y + 66 - hh / 2, 8, hh, 4); }
  x.fillStyle = "#16243d"; x.textAlign = "right"; x.textBaseline = "middle"; x.font = F(800, 38); x.fillText(dur, X + w - 22, Y + 68);
  return 132;
}
function burbujaTexto(x, X, Y, w, lineas, { yo = false, px = 46, tilde: tl = null, etiqueta = null } = {}) {
  let h = 34 + lineas.length * px * 1.24 + (tl ? 36 : 0), y0 = Y;
  if (etiqueta) { x.fillStyle = "#3fa60a"; x.font = F(800, 36); x.textAlign = yo ? "right" : "left"; x.textBaseline = "middle"; x.fillText(etiqueta, yo ? X + w - 6 : X + 6, Y + 18); y0 = Y + 48; }
  x.fillStyle = "#ffffff"; x.strokeStyle = yo ? "#3fa60a" : "#16243d"; x.lineWidth = yo ? 7 : 5; x.beginPath(); x.roundRect(X, y0, w, h, yo ? [32, 8, 32, 32] : [8, 32, 32, 32]); x.fill(); x.stroke();
  x.fillStyle = "#0b1220"; x.font = F(800, px); x.textAlign = "left"; x.textBaseline = "middle";
  lineas.forEach((l, i) => x.fillText(l, X + 26, y0 + 17 + px * 0.62 + i * px * 1.24));
  if (tl) { const cx = X + w - 46, cy = y0 + h - 30; tilde(x, cx, cy, 30, tl === "gris" ? "#8a93a3" : "#3fa60a", 7); if (tl === "doble") tilde(x, cx + 16, cy, 30, "#3fa60a", 7); }
  return h + (y0 - Y);
}
function fotoChat(x, X, Y, w, cv) {
  const h = Math.round((w * cv.height) / cv.width);
  x.fillStyle = "#ffffff"; x.strokeStyle = "#16243d"; x.lineWidth = 5; x.beginPath(); x.roundRect(X, Y, w + 24, h + 24, [8, 30, 30, 30]); x.fill(); x.stroke();
  x.save(); x.beginPath(); x.roundRect(X + 12, Y + 12, w, h, 20); x.clip(); x.drawImage(cv, X + 12, Y + 12, w, h); x.restore();
  return h + 24;
}
function tarjetaVerde(x, X, Y, w, titulo, lineas, px = 40) {
  const h = 104 + lineas.length * px * 1.3;
  x.fillStyle = "#16243d"; x.beginPath(); x.roundRect(X, Y, w, h, 30); x.fill();
  x.fillStyle = "#5ce611"; x.beginPath(); x.arc(X + 62, Y + 58, 36, 0, 7); x.fill(); tilde(x, X + 63, Y + 60, 38, "#0b1220", 9);
  x.fillStyle = "#5ce611"; x.textAlign = "left"; x.textBaseline = "middle"; ajustar(x, titulo, 900, 52, w - 140); x.fillText(titulo, X + 116, Y + 60);
  x.fillStyle = "#efeee5"; lineas.forEach((l, i) => { ajustar(x, l, 800, px, w - 60); x.fillText(l, X + 34, Y + 120 + i * px * 1.3); });
  return h;
}
// un chat con los mensajes apilados desde abajo (el último siempre entero abajo)
function dibujarChat(x, W, H, { cv, nombre, sub, subVerde, msgs, input = "", ult = 1 }) {
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, W, H);
  const medir = document.createElement("canvas").getContext("2d");
  const alto = (m) => m.dibujar(medir, 0);
  const hs = msgs.map(alto), gap = 26;
  const piso = H - (input !== null ? 150 : 30);
  let y = piso - hs.reduce((a, b) => a + b + gap, 0) + gap + (1 - eo(ult)) * (hs[hs.length - 1] + gap);   // (r3) el último entra deslizando (scroll)
  msgs.forEach((m, i) => { m.dibujar(x, y); y += hs[i] + gap; });
  if (input !== null) {
    x.fillStyle = "#d9d7c9"; x.fillRect(0, H - 130, W, 130);
    x.fillStyle = "#ffffff"; x.strokeStyle = "#16243d"; x.lineWidth = 4; x.beginPath(); x.roundRect(24, H - 108, W - 160, 86, 43); x.fill(); x.stroke();
    x.fillStyle = input ? "#0b1220" : "#8a93a3"; x.textAlign = "left"; x.textBaseline = "middle"; x.font = F(800, 38); x.fillText(input || "Mensaje", 52, H - 64);
    x.fillStyle = "#5ce611"; x.beginPath(); x.arc(W - 70, H - 65, 44, 0, 7); x.fill(); x.fillStyle = "#0b1220"; x.beginPath(); x.moveTo(W - 88, H - 88); x.lineTo(W - 46, H - 65); x.lineTo(W - 88, H - 42); x.closePath(); x.fill();
  }
  cabecera(x, W, cv, nombre, sub, subVerde);
}
const M_ = {   // los mensajes (cada uno sabe dibujarse y devuelve su alto)
  audio: (dur, avance = 1, cv = AVATAR.marcelo) => ({ dibujar: (x, y) => burbujaAudio(x, 24, y, 560, dur, avance, cv) }),
  yo: (ls, o = {}) => ({ dibujar: (x, y) => { x.font = F(800, o.px ?? 46); const w = Math.max(...ls.map((l) => x.measureText(l).width)) + 110; return burbujaTexto(x, CW - 24 - w, y, w, ls, { yo: true, ...o }); } }),
  el: (ls, o = {}) => ({ dibujar: (x, y) => { x.font = F(800, o.px ?? 46); const w = Math.max(...ls.map((l) => x.measureText(l).width)) + 60; return burbujaTexto(x, 24, y, w, ls, o); } }),
  foto: (cv, w = 560) => ({ dibujar: (x, y) => fotoChat(x, 24, y, w, cv) }),
  verde: (titulo, ls, w = 640) => ({ dibujar: (x, y) => tarjetaVerde(x, CW - 24 - w, y, w, titulo, ls) }),

  dia: (txt) => ({ dibujar: (x, y) => { x.font = F(800, 36); const w = x.measureText(txt).width + 50; x.fillStyle = "#d9d7c9"; rr(x, (CW - w) / 2, y, w, 60, 30); x.fillStyle = "#16243d"; x.textAlign = "center"; x.textBaseline = "middle"; x.fillText(txt, CW / 2, y + 31); return 60; } }),
  escribe: () => ({ dibujar: (x, y) => { x.fillStyle = "#cfeebc"; x.strokeStyle = "#16243d"; x.lineWidth = 5; x.beginPath(); x.roundRect(CW - 24 - 190, y, 190, 92, [32, 8, 32, 32]); x.fill(); x.stroke(); x.fillStyle = "#16243d"; for (let i = 0; i < 3; i++) { x.beginPath(); x.arc(CW - 24 - 140 + i * 45, y + 46, 12, 0, 7); x.fill(); } return 92; } }),
};

// ================= LAS FOTOS QUE MANDA MARCELO (lienzos) =================
// el pulgar de Marcelo (piel media, uña clara) entrando desde una esquina
function pulgar(x, cx, cy, ang, s = 1) {
  x.save(); x.translate(cx, cy); x.rotate(ang); x.scale(s, s);
  x.fillStyle = "#c98f68"; x.beginPath(); x.roundRect(-95, -40, 300, 190, 95); x.fill();
  x.fillStyle = "#dba57f"; x.beginPath(); x.roundRect(-90, -50, 290, 180, 90); x.fill();
  x.fillStyle = "#f0cdb4"; x.beginPath(); x.roundRect(-70, -32, 92, 120, 40); x.fill();
  x.strokeStyle = "#b07a58"; x.lineWidth = 6; x.beginPath(); x.moveTo(60, 20); x.quadraticCurveTo(80, 40, 60, 70); x.stroke();
  x.restore();
}
const FOTO = {};
{
  const mk = (w, h, f) => { const c = document.createElement("canvas"); c.width = w; c.height = h; f(c.getContext("2d"), w, h); return c; };
  // 19:40 · la factura con el pulgar enorme tapando el total (sobre la madera del mostrador)
  FOTO.pulgar = mk(600, 760, (x, w, h) => {
    x.fillStyle = "#b89468"; x.fillRect(0, 0, w, h);
    x.save(); x.translate(w / 2, h / 2); x.rotate(-0.06); x.drawImage(facturaCv, -230, -330, 460, 650); x.restore();
    pulgar(x, 330, 560, -0.5, 1.6);
  });
  // 20:30 · la factura doblada en cuatro (se ve un cuarto, con los pliegues)
  FOTO.doblada = mk(600, 560, (x, w, h) => {
    x.fillStyle = "#b89468"; x.fillRect(0, 0, w, h);
    x.save(); x.translate(w / 2, h / 2 + 10); x.rotate(0.12);
    x.fillStyle = "#e9e4d4"; x.fillRect(-170, -150, 340, 300);
    x.save(); x.beginPath(); x.rect(-170, -150, 340, 300); x.clip(); x.globalAlpha = 0.9; x.drawImage(facturaCv, -170, -150, 680, 960); x.restore();
    x.strokeStyle = "#a9a28c"; x.lineWidth = 8; x.beginPath(); x.moveTo(0, -150); x.lineTo(0, 150); x.moveTo(-170, 0); x.lineTo(170, 0); x.stroke();
    x.fillStyle = "rgba(0,0,0,0.14)"; x.fillRect(0, 0, 170, 150);
    x.restore();
  });
  // 22:16 · el ticket EN BLANCO sobre la mesa de la panadería, con el pulgar de Marcelo en la esquina
  FOTO.blanco = mk(600, 760, (x, w, h) => {
    x.fillStyle = "#b89468"; x.fillRect(0, 0, w, h);
    x.save(); x.translate(w / 2 - 20, h / 2); x.rotate(0.08); x.drawImage(blancoT.userData.c, -105, -330, 210, 660); x.restore();
    pulgar(x, 480, 640, -0.9, 1.4);
  });
}
const FOTO_OK = (() => { const c = document.createElement("canvas"); c.width = 600; c.height = 760; const x = c.getContext("2d"); x.fillStyle = "#b89468"; x.fillRect(0, 0, 600, 760); x.save(); x.translate(300, 380); x.rotate(-0.03); x.drawImage(facturaCv, -250, -350, 500, 707); x.restore(); return c; })();

// ================= PANTALLAS =================
// el botón verde de un chat ("Subir fotos")
const M2 = {
  audioYo: (dur, avance = 1) => ({ dibujar: (x, y) => burbujaAudio(x, CW - 24 - 520, y, 520, dur, avance, null) }),
  boton: (txt) => ({ dibujar: (x, y) => { x.fillStyle = "#5ce611"; x.strokeStyle = "#0b1220"; x.lineWidth = 6; x.beginPath(); x.roundRect(24, y, 560, 120, 60); x.fill(); x.stroke(); x.fillStyle = "#0b1220"; x.textAlign = "center"; x.textBaseline = "middle"; x.font = F(900, 56); x.fillText(txt, 24 + 280, y + 62); return 120; } }),
  grabando: () => ({ dibujar: () => 0 }),
};
// ---- el celular de Adriana: el chat "Marcelo · panadería" ----
let claveA = "";
function dibujarPantA(t) {
  const p2 = t >= P2;
  const prog = (t0, L) => cl((t - t0) / L);
  let msgs, input = "", fase;
  if (!p2) {
    const base = [M_.dia("Hoy"), M_.yo(["Marcelo, ¿me mandás", "las facturas?"], { tilde: "doble", px: 44 }), M_.audio("0:04", prog(T.m1, LEN.m1), AVATAR.marcelo)];
    msgs = base.slice();
    fase = t < T.m1 ? "a0" : t < T.p2 ? `a${Math.round(prog(T.m1, LEN.m1) * 12)}` : "rec";
    if (t >= T.p2 && t < T.envia) input = `● 0:0${Math.min(9, Math.floor(t - T.a1 + 1))}  grabando…`;
    if (t >= T.envia) { msgs.push(M2.audioYo("0:02")); fase = "env"; }
    if (t >= T.foto1) { msgs.push(M_.dia("19:40"), M_.foto(FOTO.pulgar, 470)); fase = "f1"; }
    if (t >= T.foto2) { msgs.push(M_.dia("20:30"), M_.foto(FOTO.doblada, 470)); fase = "f2"; }
    if (t >= T.sirve) { msgs.push(M_.el(["¿esto sirve?"], { px: 48 })); fase = "f3"; }
    if (t >= T.vib) { msgs.push(M_.dia("22:16"), M_.foto(FOTO.blanco, 470)); fase = "f4"; }
    if (t >= T.vib) msgs = msgs.slice(-3);
  } else {
    msgs = [M_.dia("Último día"), M_.audio("0:04", prog(T.m1b, LEN.m1), AVATAR.marcelo)];
    fase = `b${Math.round(prog(T.m1b, LEN.m1) * 12)}`;
    if (t >= T.a3 - 0.15 && t < T.a3 + LEN.a3) { input = `● 0:0${Math.min(9, Math.floor(t - T.a3 + 1))}  grabando…`; fase += "r" + Math.floor(t - T.a3 + 1); }
    if (t >= T.a3 + LEN.a3) { msgs.push(M2.audioYo("0:02")); fase += "e"; }
    if (t >= T.m6 - 0.05) { msgs.push(M_.audio("0:02", prog(T.m6, LEN.m6), AVATAR.marcelo)); fase += `m${Math.round(prog(T.m6, LEN.m6) * 12)}`; }
  }
  const clave = `${fase}|${input}`; if (clave === claveA) return; claveA = clave;
  const { x } = pantA.userData;
  dibujarChat(x, CW, CH, { cv: AVATAR.marcelo, nombre: "Marcelo · panadería", sub: "en línea", subVerde: false, msgs, input });
  if (input) { x.fillStyle = "#c7655b"; x.beginPath(); x.arc(64, CH - 64, 14, 0, 7); x.fill(); }
  pantA.needsUpdate = true;
}
// ---- el celular de Marcelo (Q1): el WhatsApp del estudio con el link · la cámara sobre la factura · "Subido ✓" ----
let claveMar = "";
function dibujarPantMar(t) {
  const modo = t < T.cam ? "chat" : t < T.click ? "camara" : "subido";
  const toca = modo === "chat" && t >= T.q1d3 + 0.65 ? 1 : 0;
  const ok = modo === "subido" ? Math.round(cl((t - T.click) / 0.2) * 4) : 0;
  const clave = `${modo}|${toca}|${ok}`; if (clave === claveMar) return; claveMar = clave;
  const { x } = pantMar.userData;
  if (modo === "chat") {
    const msgs = [M_.dia("Día 1 · 9:00"), M_.el(["Hola, Marcelo. Subí acá", "las facturas y tickets", "de noviembre.", "Una foto alcanza."], { px: 50 }), M2.boton("Subir fotos")];
    dibujarChat(x, CW, CH, { cv: AVATAR.estudio, nombre: "Estudio Adriana", sub: "WhatsApp · automático", subVerde: true, msgs, input: null });
    if (toca) { x.strokeStyle = "#0b1220"; x.lineWidth = 12; x.beginPath(); x.roundRect(20, CH - 30 - 124, 568, 128, 64); x.stroke(); }
  } else {
    // el visor de la cámara: la factura llenando el cuadro, esquinas crema, el botón
    x.fillStyle = "#0b1220"; x.fillRect(0, 0, CW, CH);
    x.drawImage(FOTO_OK, 30, 120, CW - 60, (CW - 60) * 760 / 600);
    x.strokeStyle = "#efeee5"; x.lineWidth = 12; x.lineCap = "round";
    for (const [cx, cy, sx, sy] of [[70, 170, 1, 1], [CW - 70, 170, -1, 1], [70, 1000, 1, -1], [CW - 70, 1000, -1, -1]]) { x.beginPath(); x.moveTo(cx, cy + sy * 80); x.lineTo(cx, cy); x.lineTo(cx + sx * 80, cy); x.stroke(); }
    x.fillStyle = "#efeee5"; x.beginPath(); x.arc(CW / 2, 1160, 70, 0, 7); x.fill(); x.strokeStyle = "#0b1220"; x.lineWidth = 10; x.beginPath(); x.arc(CW / 2, 1160, 54, 0, 7); x.stroke();
    x.fillStyle = "#efeee5"; x.textAlign = "center"; x.textBaseline = "middle"; x.font = F(800, 46); x.fillText("Estudio Adriana · noviembre", CW / 2, 64);
    if (modo === "subido") {
      x.fillStyle = "rgba(11,18,32,0.6)"; x.fillRect(0, 0, CW, CH);
      const k = ok / 4, s = 0.8 + 0.2 * k;
      x.save(); x.translate(CW / 2, 600); x.scale(s, s);
      x.fillStyle = "#5ce611"; x.strokeStyle = "#0b1220"; x.lineWidth = 10; x.beginPath(); x.roundRect(-320, -270, 640, 540, 50); x.fill(); x.stroke();
      x.fillStyle = "#0b1220"; x.beginPath(); x.arc(0, -140, 80, 0, 7); x.fill(); tilde(x, 0, -136, 92, "#5ce611");
      x.fillStyle = "#0b1220"; x.font = F(900, 84); x.fillText("Subido", 0, 0);
      x.font = F(800, 46); x.fillText("Factura · harina · día 3", 0, 92);
      x.font = F(700, 42); x.fillText("Noviembre: 9 comprobantes", 0, 174);
      x.restore();
    }
  }
  pantMar.needsUpdate = true;
}
// ---- el monitor de Adriana (parte 2): el panel "Comprobantes · Noviembre" · la carpeta de Marcelo · 60 de 60 ----
let claveMon = "";
const FILAS = [["MARCELO", 9, 14], ["SUSANA", 22, 22], ["TALLER ROLO", 0, 0], ["ÓPTICA VERA", 15, 15], ["KIOSCO LUZ", 6, 8]];
function dibujarMon(t) {
  const ultimo = t >= T.q4;
  const carpeta = !ultimo && t >= T.clickM && t < T.q3;
  const n = ultimo ? 60 : t < T.cnt1 ? 0 : t < T.cnt2 ? Math.round(lerp(0, 38, eo(cl((t - T.cnt1) / 0.6)))) : Math.round(lerp(38, 52, eo(cl((t - T.cnt2) / 0.6))));
  const rec = ultimo || t >= T.dia5 ? 1 : 0, dia5 = t >= T.dia5;
  const clave = `${ultimo}|${carpeta}|${n}|${rec}`; if (clave === claveMon) return; claveMon = clave;
  const { x } = pantMon.userData, w = 1280, h = 800;
  x.textBaseline = "middle"; x.textAlign = "left";
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h);
  x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 130); x.fillStyle = "#5ce611"; x.fillRect(0, 130, w, 10);
  if (carpeta) {
    x.fillStyle = "#efeee5"; ajustar(x, "Marcelo · Noviembre · 14 ✓", 900, 70, w - 80); x.fillText("Marcelo · Noviembre · 14 ✓", 40, 68);
    // las miniaturas en fila, ordenadas por fecha (la primera, la factura de la harina, grande y legible)
    x.save(); x.fillStyle = "#ffffff"; x.strokeStyle = "#16243d"; x.lineWidth = 8; x.beginPath(); x.roundRect(30, 170, 430, 600, 24); x.fill(); x.stroke();
    x.drawImage(FOTO_OK, 45, 185, 400, 506); x.fillStyle = "#16243d"; x.font = F(800, 46); x.textAlign = "center"; x.fillText("Día 3 · harina", 245, 730); x.restore();
    const dias = ["Día 3", "Día 3", "Día 4", "Día 6", "Día 7", "Día 9"];
    dias.forEach((d, i) => { const cx = 490 + (i % 3) * 260, cy = 170 + Math.floor(i / 3) * 300; x.fillStyle = "#ffffff"; x.strokeStyle = "#16243d"; x.lineWidth = 6; x.beginPath(); x.roundRect(cx, cy, 240, 280, 18); x.fill(); x.stroke();
      x.fillStyle = "#e9e4d4"; x.fillRect(cx + 20, cy + 18, 200, 170); x.fillStyle = "#16243d"; x.fillRect(cx + 20, cy + 18, 200, 34); for (let k = 0; k < 4; k++) x.fillRect(cx + 34, cy + 72 + k * 28, 120 + (k % 2) * 40, 10);
      x.fillStyle = "#0b1220"; x.font = F(800, 46); x.textAlign = "center"; x.fillText(d, cx + 120, cy + 236); x.textAlign = "left"; });
  } else {
    x.fillStyle = "#efeee5"; ajustar(x, "Comprobantes · Noviembre", 900, 70, w - 80); x.fillText("Comprobantes · Noviembre", 40, 68);
    // el contador grande (verde)
    const verde = n > 0;
    x.fillStyle = "#16243d"; x.beginPath(); x.roundRect(24, 162, w - 48, 200, 30); x.fill();
    x.fillStyle = "#efeee5"; x.font = F(800, 64); x.fillText("Mandaron", 64, 262);
    x.fillStyle = verde ? "#5ce611" : "#efeee5"; x.font = F(900, 150); x.textAlign = "right"; x.fillText(`${n}`, 760, 266);
    x.fillStyle = "#efeee5"; x.font = F(800, 72); x.textAlign = "left"; x.fillText(ultimo ? "de 60 ✓" : "de 60", 790, 266);
    if (ultimo) {
      x.fillStyle = "#5ce611"; x.beginPath(); x.roundRect(24, 390, w - 48, 170, 30); x.fill();
      x.fillStyle = "#0b1220"; x.textAlign = "center"; ajustar(x, "Noches hasta las 2: 0", 900, 92, w - 120); x.fillText("Noches hasta las 2: 0", w / 2, 478); x.textAlign = "left";
      x.fillStyle = "#16243d"; x.beginPath(); x.roundRect(24, 590, w - 48, 180, 30); x.fill();
      x.fillStyle = "#5ce611"; x.textAlign = "center"; ajustar(x, "Todos los clientes ✓", 900, 80, w - 120); x.fillText("Todos los clientes ✓", w / 2, 682); x.textAlign = "left";
    } else {
      // la lista de clientes con su chip
      const filas = dia5 ? FILAS.slice(0, 3) : FILAS.slice(0, 4);
      filas.forEach(([nom, a, b], i) => {
        const y = 386 + i * 98, c = t >= T.dia5 ? b : a, falta = c === 0;
        x.fillStyle = i % 2 ? "#e4e1d4" : "#f7f6f0"; x.fillRect(24, y, w - 48, 92);
        x.fillStyle = "#0b1220"; x.font = F(800, 56); x.fillText(nom, 56, y + 48);
        x.fillStyle = falta ? "#c7655b" : "#5ce611"; x.beginPath(); x.roundRect(w - 360, y + 12, 310, 70, 35); x.fill();
        x.fillStyle = "#0b1220"; x.font = F(900, 50); x.textAlign = "center"; x.fillText(falta ? "0 · falta" : `${c} ✓`, w - 205, y + 49); x.textAlign = "left";
      });
      if (rec) { const y = 386 + 3 * 98 + 8; x.fillStyle = "#5ce611"; x.beginPath(); x.roundRect(24, y, w - 48, 100, 26); x.fill(); x.fillStyle = "#0b1220"; ajustar(x, "Recordatorio automático enviado a 22 ✓", 900, 56, w - 100); x.textAlign = "center"; x.fillText("Recordatorio automático enviado a 22 ✓", w / 2, y + 52); x.textAlign = "left"; }
    }
  }
  pantMon.needsUpdate = true;
}

// ================= TARJETAS PEGADAS A LA CÁMARA: globos, rótulos, guías (de veterinaria-vacunas) =================
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
  const limpio = (s) => s.replace(/[[\]]/g, "");
  x.font = F(800, px); x.textBaseline = "middle"; x.textAlign = "left";
  const partes = l.split(/(\[[^\]]+\])/).filter(Boolean);
  const anchos = partes.map((p) => x.measureText(limpio(p)).width + (p.startsWith("[") ? px * 0.5 : 0));
  let xx = cx - anchos.reduce((a, b) => a + b, 0) / 2;
  partes.forEach((p, k) => {
    if (p.startsWith("[")) { x.fillStyle = "#5ce611"; x.strokeStyle = "#0b1220"; x.lineWidth = px * 0.1; x.beginPath(); x.roundRect(xx + px * 0.05, y - px * 0.62, anchos[k] - px * 0.1, px * 1.24, px * 0.12); x.fill(); x.stroke(); x.fillStyle = tinta; x.fillText(limpio(p), xx + px * 0.25, y + px * 0.04); }
    else if (p.startsWith("{")) { x.fillStyle = "#c7655b"; x.fillText(p.slice(1, -1), xx, y + px * 0.04); }
    else { x.fillStyle = tinta; x.fillText(p, xx, y + px * 0.04); }
    xx += anchos[k];
  });
}
// globo de diálogo (texto grande); cab = { cv, nombre } (avatar) o { icono: "parlante", nombre }; minW = ancho mínimo
function crearGlobo(lineas, px = 80, { cab = null, minW = 0 } = {}) {
  const med = document.createElement("canvas").getContext("2d");
  const limpio = (l) => l.replace(/[[\]]/g, "");
  const cabH = cab ? Math.round(px * 1.15) : 0, cabF = Math.max(Math.round(px * 0.6), 40);
  med.font = F(700, cabF); const anchoCab = cab ? med.measureText(cab.nombre).width + cabF * 2.4 : 0; med.font = F(800, px);
  const anchoT = Math.max(anchoCab, ...lineas.map((l) => med.measureText(limpio(l)).width + (l.includes("[") ? px * 0.5 : 0)));
  const Wg = Math.max(minW, Math.round(anchoT + px * 1.2)), H = Math.round(lineas.length * px * 1.22 + px * 0.75 + cabH);
  return crearTarjeta(Wg, H, (x, w, h) => {
    if (cab) {
      const r = cabF * 0.78, cy = px * 0.25 + r, cx = px * 0.35 + r;
      if (cab.icono) parlante(x, cx, cy, r); else avatar(x, cab.cv, cx, cy, r);
      x.fillStyle = "#1f3254"; x.font = F(700, cabF); x.textAlign = "left"; x.textBaseline = "middle"; x.fillText(cab.nombre, cx + r + px * 0.25, cy + 2);
    }
    lineas.forEach((l, i) => textoSel(x, l, w / 2, cabH + (h - cabH) / 2 + (i - (lineas.length - 1) / 2) * px * 1.22, px));
  });
}
// el rótulo: caja navy, texto crema (o rojo apagado), borde crema
function crearRotulo(lineas, px = 50) {
  const med = document.createElement("canvas").getContext("2d");
  const ancho = Math.max(...lineas.map(([l, , p]) => { med.font = F(800, p ?? px); return med.measureText(l).width; }));
  const H = Math.round(lineas.reduce((a, [, , p]) => a + (p ?? px) * 1.25, 0) + px * 0.6), Wg = Math.round(ancho + px * 1.0);
  return crearTarjeta(Wg, H, (x, w, h) => {
    let y = px * 0.3; x.textAlign = "center"; x.textBaseline = "middle";
    for (const [l, color, p] of lineas) { const q = p ?? px; x.font = F(800, q); x.fillStyle = color ?? "#efeee5"; x.fillText(l, w / 2, y + q * 0.62); y += q * 1.25; }
  }, { fondo: "#16243d", borde: C.cr });
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
// REGLA DE BURBUJAS (de veterinaria-vacunas): la burbuja va arriba del que habla, con su borde de abajo ~100 px sobre la
// coronilla y la cola terminando en el pelo, nunca en la cara. Si no entra (o el que habla queda cortado), se anota en
// AVISOS (prev.mjs lo imprime).
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

// el audio de Marcelo que sale del celular: cabecera (avatar + "Marcelo · audio"), la onda con el play y el 0:04, y
// debajo lo que dice (grande)
function crearAudio(lineas, dur, px = 60) {
  const med = document.createElement("canvas").getContext("2d"); med.font = F(800, px);
  const anchoT = Math.max(560, ...lineas.map((l) => med.measureText(l.replace(/[[\]]/g, "")).width + (l.includes("[") ? px * 0.5 : 0)));
  const Wg = Math.round(anchoT + px * 1.2), cabH = 76, ondaH = 92, H = Math.round(cabH + ondaH + lineas.length * px * 1.22 + px * 0.7);
  return crearTarjeta(Wg, H, (x, w, h) => {
    avatar(x, AVATAR.marcelo, 52, 46, 32);
    x.fillStyle = "#1f3254"; x.font = F(700, 40); x.textAlign = "left"; x.textBaseline = "middle"; x.fillText("Marcelo · audio de WhatsApp", 98, 48);
    // la onda
    const y0 = cabH + 6; x.fillStyle = "#16243d"; x.beginPath(); x.moveTo(34, y0 + 18); x.lineTo(70, y0 + 42); x.lineTo(34, y0 + 66); x.closePath(); x.fill();
    semilla = 77; for (let bx = 96, i = 0; bx < w - 130; bx += 16, i++) { const hh = 12 + Math.abs(Math.sin(i * 0.9) * 24) + az() * 16; x.fillStyle = "#16243d"; rr(x, bx, y0 + 42 - hh / 2, 9, hh, 4); }
    x.fillStyle = "#16243d"; x.textAlign = "right"; x.font = F(800, 40); x.fillText(dur, w - 26, y0 + 44);
    x.fillStyle = "#d9d7c9"; x.fillRect(24, cabH + ondaH - 4, w - 48, 4);
    lineas.forEach((l, i) => textoSel(x, l, w / 2, cabH + ondaH + px * 0.5 + i * px * 1.22 + px * 0.36, px));
  });
}
const GL = {
  m1: crearAudio(["Adri, las facturas te las", "mando [mañana sin falta.]"], "0:04", 58),
  a1: crearGlobo(["Marcelo. [Vence hoy.]"], 80),
  m2: crearGlobo(["Acá está todo, Adri.", "[Ordenadito.]"], 78),
  a2: crearGlobo(["¿Y [esta?]"], 100),
  m3: crearGlobo(["Esa es la", "[más importante.]"], 86),
  m4: crearGlobo(["Si querés, te", "mando [una foto.]"], 80),
  m5: crearGlobo(["Listo. [Ordenadito.]"], 80),
  m1b: crearAudio(["Adri, las facturas te las", "mando [mañana sin falta.]"], "0:04", 58),
  a3: crearGlobo(["Marcelo, las mandaste", "[el día tres.]"], 70),
  m6: crearAudio(["¿Yo? Qué [ordenadito.]"], "0:02", 62),
};
const ROT = [
  crearRotulo([["Ticket térmico · se borró", "#c7655b", 50]], 50),
  crearRotulo([["Un mes en una", null, 48], ["caja de zapatos", null, 48]], 48),
  crearRotulo([["Mandaron 41 de 60", "#c7655b", 54]], 54),
  crearRotulo([["Cuarta noche", "#c7655b", 50], ["hasta las 2", "#c7655b", 50]], 50),
];
const CNT = {}; for (let n = 33; n <= 41; n++) CNT[n] = crearRotulo([["Mandaron", null, 50], [`${n} de 60`, "#c7655b", 92]], 50);
const ROT_Q = [
  crearRotulo([["El día 1", null, 50], ["le llega solo", "#5ce611", 58]], 50),
  crearRotulo([["Todo ordenado por", null, 50], ["cliente y por mes", "#5ce611", 58]], 50),
];
const GUIAS = [crearGuia(), crearGuia(), crearGuia(), crearGuia()];

// ================= CÁMARA =================
// PLANOS: [nombre, desde, claves | null]; cada clave [t, px, py, pz, mx, my, mz, fov]. Entre planos, corte; dentro de un
// plano, Catmull-Rom continua. Los null se arman en renderAt.
const CAM_P1 = (k) => [lerp(-0.03, -0.04, k), lerp(1.3, 1.28, k), lerp(2.42, 2.27, k), -0.04, 1.0, 0.45, 54];
const CAM_ATRAS = (k) => [lerp(0.5, 0.46, k), 1.95, lerp(-0.45, -0.38, k), lerp(-0.15, 0.05, k), 0.95, 3.0, lerp(52, 49, k)];
const PLANOS = [
  ["P1", 0, [[0, ...CAM_P1(0)], [T.p2, ...CAM_P1(1)]]],
  ["P2", T.p2, [[T.p2, 0.12, 1.3, 2.55, 0.0, 1.08, 0.45, 42], [T.p3, 0.11, 1.29, 2.42, 0.0, 1.08, 0.45, 41]]],
  ["P3", T.p3, null],   // el celular en el soporte, de cerca (las fotos)
  ["P3b", T.p3b, [[T.p3b, 0.55, 1.5, 4.15, 1.3, 0.85, 1.85, 56], [T.p3c, 0.65, 1.5, 4.1, 1.32, 0.85, 1.85, 55]]],   // Lucas y el piolín, la tira en el piso
  ["P3c", T.p3c, [[T.p3c, 0.86, 1.3, 1.0, 0.7, 1.08, -0.55, 46], [T.p4, 0.84, 1.28, 0.82, 0.7, 1.08, -0.55, 46]]],   // los sobres
  ["P4", T.p4, [[T.p4, ...CAM_ATRAS(0)], [T.vuelca - 0.15, ...CAM_ATRAS(0.8)], [T.vuelca + 0.35, 0.42, 1.92, -0.3, 0.15, 0.95, 2.2, 50], [T.p5, 0.41, 1.92, -0.26, 0.15, 0.93, 2.1, 50]]],   // desde atrás de Adriana: la puerta, Marcelo, la caja
  ["P5", T.p5, null],   // Adriana levanta el ticket contra la lámpara, push-in al ticket
  ["P5c", T.p5c, [[T.p5c, 0.5, 1.58, -0.3, 0.24, 1.45, 2.0, 38], [T.p6, 0.48, 1.58, -0.22, 0.24, 1.47, 2.0, 36]]],   // contraplano de Marcelo
  ["P6", T.p6, [[T.p6, -1.25, 2.0, 3.45, 0.35, 0.9, 0.85, 54], [T.p7, -1.2, 1.98, 3.38, 0.35, 0.9, 0.85, 54]]],   // la pausa
  ["P7", T.p7, [[T.p7, 0.5, 1.8, -0.4, -0.5, 1.25, 3.9, 36], [T.vib, 0.48, 1.8, -0.3, -0.5, 1.25, 3.9, 34]]],   // Marcelo en la puerta
  ["P7i", T.vib, null],   // la foto en blanco en el celular
  ["P7c", T.p7c, [[T.p7c, 0.1, 1.28, 2.35, 0.0, 1.15, 0.45, 34], [P1, 0.1, 1.28, 2.25, 0.0, 1.15, 0.45, 33]]],   // Adriana cierra los ojos
  // ---- parte 2 ----
  ["Q1", P2, [[P2, PX + 0.2, 1.48, 2.5, PX + 0.25, 1.25, 0.3, 44], [T.q1i, PX + 0.2, 1.47, 2.4, PX + 0.25, 1.25, 0.3, 44]]],
  ["Q1i", T.q1i, null],   // el WhatsApp del estudio en el celular de Marcelo
  ["Q1b", T.q1d3, [[T.q1d3, PX - 0.3, 1.65, 3.8, PX + 0.5, 1.05, 0.9, 50], [T.cam, PX - 0.28, 1.63, 3.65, PX + 0.5, 1.05, 0.9, 50]]],
  ["Q1c", T.cam, null],   // la cámara del celular sobre la factura → Subido
  ["Q1w", T.q1w, [[T.q1w, PX + 0.15, 1.42, 2.3, PX + 0.3, 1.3, 0.2, 42], [T.q2, PX + 0.15, 1.42, 2.15, PX + 0.3, 1.31, 0.2, 41]]],
  ["Q2", T.q2, [[T.q2, 0.5, 1.6, 3.4, 0.5, 0.98, 0.5, 56], [T.q2i, 0.48, 1.56, 3.2, 0.48, 0.98, 0.5, 56]]],
  ["Q2m", T.q2i, null],   // push-in al panel
  ["Q3", T.q3, [[T.q3, ...CAM_P1(0)], [T.q4, ...CAM_P1(1)]]],
  ["Q4", T.q4, null],    // el panel en 60 de 60
  ["Q4b", T.q4b, [[T.q4b, -0.1, 1.35, 2.4, -0.2, 1.1, 0.6, 42], [T.q5, -0.1, 1.35, 2.3, -0.2, 1.1, 0.6, 41]]],
  ["Q5", T.q5, null],    // Sofi en el celular parado
];
for (let i = PLANOS.length - 2; i >= 0; i--) { const d = PLANOS[i + 1][1] - PLANOS[i][1]; if (d < 0.3) { console.error(`plano corto: ${PLANOS[i][0]} (${d.toFixed(2)} s)`); } }

const _m = new THREE.Vector3();
let planoActual = "P1";
function catmull(CAM, t) {
  let i = 0; while (i + 1 < CAM.length - 1 && CAM[i + 1][0] <= t) i++;
  const a = CAM[i], b = CAM[i + 1] || a;
  if (b === a || b[0] <= a[0]) return a.slice(1, 8);   // después de la última clave (el último cuadro) quieta, sin NaN
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
// la cámara de frente a una pantalla (plano local del objeto) que llena `llena` del alto del cuadro: [px..mz, fov]
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
const NADA = { ...CARA.neutra, ojos: { abiertos: 0.9, tension: 0.12, feliz: 0 }, cejas: { alto: 0.05, ang: 0.1 }, boca: { sonrisa: -0.1, abierta: 0, ancho: 0.95 } };
const BUENA = { ...CARA.sonrisa, ojos: { abiertos: 1, feliz: 0.25 }, boca: { sonrisa: 0.55, abierta: 0, ancho: 1.05 } };
const bocaVoz = (p, t, t0, env, k = 0.7) => {
  if (!p.boca) p.boca = { sonrisa: 0.1, abierta: 0, ancho: 1 }; if (!p.ojos) p.ojos = { abiertos: 1 };
  if (env && t >= t0 && t < t0 + env.length / 30) { const i = Math.floor((t - t0) * 30), f = (t - t0) * 30 - i; const e = lerp(env[i] ?? 0, env[i + 1] ?? 0, f); p.boca.abierta = Math.max(p.boca.abierta ?? 0, cl(e * 1.1 - 0.05) * k); }
  { const h = sg(t, t0 - 0.12, t0) * (1 - sg(t, t0 + env.length / 30, t0 + env.length / 30 + 0.15)); if (h > 0) p.boca.sonrisa = lerp(p.boca.sonrisa ?? 0, Math.min(p.boca.sonrisa ?? 0, 0.08), h); }   // hablando, el arco de la sonrisa se apaga (sin boca doble)
  if (t >= t0 - 0.05 && t < t0 + env.length / 30 + 0.05) p.ojos.abiertos = Math.max(p.ojos.abiertos ?? 1, 0.85);   // hablando, nunca con los ojos cerrados
};
const _w = new THREE.Vector3();
function aCuerpo(per, w) { per.raiz.updateMatrixWorld(true); const v = per.cuerpo.worldToLocal(w.clone()); return [v.x, v.y, v.z]; }
const aC = (giro = 0, asiente = 0, ladea = 0.03) => ({ cabeza: { giro, asiente, ladea }, ojos: { x: giro * 0.6, y: 0.05 } });

// ================= POSES =================
const manoW = (per, lado) => { per.raiz.updateMatrixWorld(true); return per.brazos[lado === "I" ? 0 : 1].mano.getWorldPosition(new THREE.Vector3()); };
const cabezaW = (per, y = 0.2) => { per.raiz.updateMatrixWorld(true); return per.cabeza.localToWorld(V3(0, y, 0.05)); };
// donde Adriana sostiene el ticket en blanco (delante de la pantalla de la lámpara, visto desde P5)
const TICKET_ALTO = V3(-0.32, 1.05, 0.98);
const PICK = V3(0.12, MESA_Y + 0.12, 1.08);   // de dónde lo saca (arriba de la pila)
// ---------- Adriana en su escritorio (sentada, mirando a +z) ----------
function poseAdriana(t) {
  const p2 = t >= P2;
  const pr = { x: ADR.x, y: -0.08, z: ADR.z, giro: 0, sentado: 1, inclina: 0.04, ...aC(-0.12, 0.2), ...NADA, manoI: [0.2, 0.3, 0.38], codoI: [1, -0.6, -0.2], manoD: [-0.2, 0.3, 0.38], codoD: [-1, -0.6, -0.2], dedoI: 0, dedoD: 0, t };
  if (!p2) {
    // P1: mira el celular del soporte (a su derecha, abajo), cansada, sin tocarlo
    Object.assign(pr, { ojos: { abiertos: 0.85, x: -0.25, y: -0.55, tension: 0.15 }, cejas: { alto: 0.05, ang: 0.25 }, boca: { sonrisa: -0.15, abierta: 0, ancho: 0.9 } });
    pr.cabeza = { giro: -0.18, asiente: 0.28, ladea: 0.03 };
    if (t >= T.p2 - 0.1 && t < T.p3) {
      // P2: levanta el celular a la altura del pecho y graba (fastidio controlado)
      Object.assign(pr, BRAZOS.celular); pr.inclina = 0.06;
      Object.assign(pr, { ...CARA.fastidio, ojos: { abiertos: 0.75, x: 0, y: -0.6, tension: -0.2 }, cejas: { alto: -0.25, ang: -0.35 }, boca: { sonrisa: -0.3, abierta: 0, ancho: 0.9 } });
      pr.cabeza = { giro: 0, asiente: 0.3, ladea: 0.02 };
      bocaVoz(pr, t, T.a1, ENV.a1, 0.55);
    }
    if (t >= T.p3 && t < T.p4) { Object.assign(pr, { ...CARA.concentrada }); pr.cabeza = { giro: 0.1, asiente: 0.32, ladea: 0 }; }
    if (t >= T.p4) {
      // P4: mira a Marcelo (adelante, a su izquierda), quieta
      Object.assign(pr, { ojos: { abiertos: 0.9, x: 0.15, y: 0.15, tension: 0.15 }, cejas: { alto: 0.15, ang: 0.15 }, boca: { sonrisa: -0.1, abierta: 0, ancho: 0.9 } });
      pr.cabeza = { giro: 0.22, asiente: -0.05, ladea: 0 };
    }
    if (t >= T.vuelca) { Object.assign(pr, { ...CARA.sorpresa, ojos: { abiertos: 1, x: 0.1, y: -0.4 }, boca: { sonrisa: -0.1, abierta: 0.15, ancho: 0.8 } }); pr.cabeza = { giro: 0.12, asiente: 0.22, ladea: 0 }; }
    if (t >= T.p5) {
      // P5: saca un ticket de la pila y lo levanta contra la lámpara: incrédula
      Object.assign(pr, { ...CARA.incredula, ojos: { abiertos: 0.8, x: -0.45, y: 0.1, tension: 0.1 }, cejas: { alto: 0.25, ang: 0.1, asim: 0.8 } });
      pr.cabeza = { giro: lerp(0.0, -0.42, eio(sg(t, T.saca + 0.15, T.saca + 0.45))), asiente: lerp(0.25, -0.05, eio(sg(t, T.saca + 0.15, T.saca + 0.45))), ladea: 0.05 };
      pr.inclina = lerp(0.04, 0.2, eio(sg(t, T.saca, T.saca + 0.3)));
      bocaVoz(pr, t, T.a2, ENV.a2, 0.5);
    }
    if (t >= T.p5c) { pr.cabeza = { giro: 0.18, asiente: -0.08, ladea: 0.03 }; pr.ojos = { abiertos: 0.8, x: 0.2, y: 0.25, tension: 0.15 }; }
    if (t >= T.p7) { pr.cabeza = { giro: 0.3, asiente: -0.12, ladea: 0 }; pr.ojos = { abiertos: 0.85, x: 0.3, y: 0.3, tension: 0.1 }; Object.assign(pr, { cejas: { alto: 0.2, ang: 0.35 }, boca: { sonrisa: -0.25, abierta: 0, ancho: 0.85 } }); }
    if (t >= T.vib) { pr.cabeza = { giro: -0.15, asiente: 0.25, ladea: 0 }; pr.ojos = { abiertos: 0.85, x: -0.2, y: -0.5 }; }
    if (t >= T.p7c) { const c = eio(sg(t, T.p7c + 0.12, T.p7c + 0.32)); pr.ojos = { abiertos: lerp(0.85, 0.02, c), x: 0, y: -0.2 }; pr.cejas = { alto: 0.25, ang: 0.5 }; pr.boca = { sonrisa: -0.35, abierta: 0, ancho: 0.9 }; pr.cabeza = { giro: -0.05, asiente: 0.1, ladea: 0.04 }; }
    return pr;
  }
  // parte 2: tranquila, sonríe, mira el monitor (a su izquierda, +x)
  Object.assign(pr, { ...CARA.sonrisa, ojos: { abiertos: 1, x: 0.45, y: -0.15, feliz: 0.2 }, cejas: { alto: 0.2, ang: 0 }, boca: { sonrisa: 0.5, abierta: 0, ancho: 1.05 } });
  pr.cabeza = { giro: 0.42, asiente: 0.06, ladea: 0.03 };
  if (t >= T.q3 && t < T.q4) {
    // Q3: escucha el audio sonriendo; graba sin levantar el celular (el dedo en la pantalla), mirando el monitor
    if (t >= T.a3 - 0.3 && t < T.a3 + LEN.a3 + 0.1) { pr.cabeza = { giro: 0.3, asiente: 0.1, ladea: 0.04 }; pr.ojos = { abiertos: 1, x: 0.35, y: -0.1, feliz: 0.3 }; }
    bocaVoz(pr, t, T.a3, ENV.a3, 0.55);
    if (t >= T.m6) { Object.assign(pr, { ...CARA.sonrisa, ojos: { abiertos: 1, x: -0.1, y: -0.35, feliz: 0.45 }, boca: { sonrisa: 0.8, abierta: 0, ancho: 1.1 } }); pr.cabeza = { giro: -0.1, asiente: 0.18, ladea: 0.06 }; }
  }
  if (t >= T.q4b) { pr.cabeza = { giro: -0.35, asiente: -0.05, ladea: 0.03 }; pr.ojos = { abiertos: 1, x: -0.4, y: 0.1, feliz: 0.3 }; pr.inclina = 0.1; }
  return pr;
}
// ---------- Marcelo en el estudio (parte 1): entra con la caja, la vuelca, se queda orgulloso, se va desde la puerta ----------
const M_PUERTA = { x: -0.5, z: 4.05 }, M_MESA = { x: 0.26, z: 1.98 };
function poseMarcelo(t) {
  const pr = { x: M_MESA.x, y: 0, z: M_MESA.z, giro: Math.PI, inclina: 0.02, ...aC(0, 0.05), ...CARA.sonrisa, ojos: { abiertos: 1, x: 0, y: -0.1, feliz: 0.35 }, ...BRAZOS.costado, t };
  // la caminata desde la puerta
  const a = T.abre + 0.12, b = T.abre + 1.05, u = eio(sg(t, a, b));
  if (t < b) { pr.x = lerp(M_PUERTA.x, M_MESA.x, u); pr.z = lerp(M_PUERTA.z, M_MESA.z, u); pr.paso = t > a ? 1 : 0; pr.giro = Math.PI + Math.atan2(M_PUERTA.x - M_MESA.x, M_PUERTA.z - M_MESA.z) * (1 - sg(t, b - 0.25, b)); }
  // la caja bajo el brazo (izquierdo) hasta que habla; después adelante, con las dos manos
  if (t < T.m2 + 0.4) { pr.manoI = [0.27, 0.12, 0.14]; pr.codoI = [1, -0.4, -0.5]; }
  else Object.assign(pr, BRAZOS.ofrece(0.34, 0.26, 0.4));
  bocaVoz(pr, t, T.m2, ENV.m2, 0.6);
  if (t >= T.vuelca - 0.2) { Object.assign(pr, { ...CARA.feliz, ojos: { abiertos: 0.95, x: 0, y: -0.5, feliz: 0.4 } }); pr.inclina = 0.1 * (1 - sg(t, T.vuelca + 0.6, T.vuelca + 0.9)); }
  if (t >= T.p5) { Object.assign(pr, { ...CARA.sonrisa, ojos: { abiertos: 1, x: -0.15, y: -0.2, feliz: 0.35 }, cejas: { alto: 0.35, ang: 0.15 } }); pr.cabeza = { giro: -0.1, asiente: 0.0, ladea: 0.05 }; Object.assign(pr, BRAZOS.ofrece(0.34, 0.1, 0.32)); }
  if (t >= T.m3 - 0.1) { pr.cabeza = { giro: 0.0, asiente: -0.05, ladea: 0.06 }; pr.ojos = { abiertos: 1, x: 0, y: 0, feliz: 0.3 }; Object.assign(pr, { cejas: { alto: 0.4, ang: 0.0 } }); bocaVoz(pr, t, T.m3, ENV.m3, 0.6); }
  if (t >= T.p7) {
    // P7: en la puerta, de vuelta hacia Adriana, el celular a la altura del pecho; después se va
    pr.x = M_PUERTA.x; pr.z = M_PUERTA.z - 0.05; pr.giro = Math.PI; Object.assign(pr, BRAZOS.celular);
    Object.assign(pr, { ...CARA.sonrisa, ojos: { abiertos: 1, x: 0, y: 0, feliz: 0.4 }, cejas: { alto: 0.45, ang: 0.2 } }); pr.cabeza = { giro: 0, asiente: 0, ladea: 0.06 };
    bocaVoz(pr, t, T.m4, ENV.m4, 0.6);
    if (t >= T.sale) { const g = eio(sg(t, T.sale, T.sale + 0.25)); pr.giro = Math.PI - g * Math.PI; pr.z = lerp(M_PUERTA.z - 0.05, M_PUERTA.z + 0.9, sg(t, T.sale + 0.1, T.cierra)); pr.paso = 1; }
  }
  return pr;
}
// ---------- Marcelo en la panadería (parte 2), detrás del mostrador ----------
const M_PAN = { x: PX + 0.3, z: 0.12 };
function poseMarceloPan(t) {
  const pr = { x: M_PAN.x, y: 0, z: M_PAN.z, giro: 0, inclina: 0.03, ...aC(0, 0.35), ...CARA.sonrisa, ojos: { abiertos: 1, x: 0, y: -0.7, feliz: 0.25 }, ...BRAZOS.celular, t };
  pr.manoI = [0.08, 0.4, 0.32]; pr.manoD = [-0.08, 0.4, 0.32];
  if (t >= T.q1d3 && t < T.cam) { const m = eio(sg(t, T.q1d3, T.q1d3 + 0.3)) * (1 - eio(sg(t, T.bolsa + 0.4, T.bolsa + 0.6))); pr.cabeza = { giro: lerp(0, 0.5, m), asiente: lerp(0.35, 0.05, m), ladea: 0.03 }; pr.ojos = { abiertos: 1, x: 0.45 * m, y: lerp(-0.7, 0, m), feliz: 0.3 }; if (t >= T.bolsa + 0.5) { pr.inclina = 0.12; pr.cabeza = { giro: -0.05, asiente: 0.5, ladea: 0 }; pr.ojos = { abiertos: 0.9, x: 0, y: -0.85 }; } }
  if (t >= T.q1w) { Object.assign(pr, { ...CARA.feliz, ojos: { abiertos: 0.95, x: 0, y: 0.05, feliz: 0.45 }, boca: { sonrisa: 0.8, abierta: 0, ancho: 1.1 } }); pr.cabeza = { giro: 0.05, asiente: 0.0, ladea: 0.07 }; bocaVoz(pr, t, T.m5, ENV.m5, 0.6); }
  return pr;
}
// ---------- el repartidor (Q1b): entra con la bolsa, la deja en el mostrador, se va ----------
function poseRepartidor(t) {
  const a = T.q1d3 - 0.35, b = T.q1d3 + 0.2, s0 = T.bolsa + 0.35;
  const u = eio(sg(t, a, b)), v = eio(sg(t, s0, s0 + 0.6));
  const pr = { x: PX + lerp(2.0, 0.98, u) + v * 1.2, y: 0, z: lerp(1.5, 1.38, u), giro: v > 0 ? lerp(-Math.PI / 2 - 0.3, Math.PI / 2, v) : lerp(-Math.PI / 2, -Math.PI + 0.35, sg(t, b - 0.2, b)), paso: (t > a && t < b) || v > 0.02 ? 1 : 0, inclina: 0.05, ...aC(0, 0.1), ...CARA.sonrisa, ...BRAZOS.ofrece(0.44, 0.22, 0.34), t };
  if (t >= T.bolsa + 0.25) Object.assign(pr, BRAZOS.costado);
  return pr;
}
// ---------- Lucas: en el banquito (parte 1) colgando tickets; en su escritorio (parte 2) ----------
const LUC1P = LUC1;
function poseLucas(t) {
  if (t < P2) {
    const pr = { x: LUC1P.x, y: -0.12, z: LUC1P.z, giro: 0.15, sentado: 1, inclina: 0.1, ...aC(0.5, 0.15), ...CARA.concentrada, manoI: [0.22, 0.3, 0.3], manoD: [-0.2, 0.28, 0.32], codoI: [1, -0.6, -0.2], codoD: [-1, -0.6, -0.2], dedoI: 0, dedoD: 0, t };
    pr.ojos = { abiertos: 0.85, x: 0.4, y: 0.1 };
    if (t >= T.p4) { pr.cabeza = { giro: -0.35, asiente: -0.05, ladea: 0 }; pr.ojos = { abiertos: 1, x: -0.4, y: 0.1 }; Object.assign(pr, { cejas: { alto: 0.4, ang: 0.3 }, boca: { sonrisa: -0.05, abierta: 0, ancho: 0.85 } }); }
    if (t >= T.vuelca) { Object.assign(pr, { ...CARA.sorpresa, ojos: { abiertos: 1, x: -0.4, y: 0.15 }, boca: { sonrisa: 0, abierta: 0.3, ancho: 0.7 } }); }
    return pr;
  }
  const pr = { x: LUC2.x, y: -0.08, z: LUC2.z, giro: 0, sentado: 1, inclina: 0.05, ...aC(-0.25, 0.25), ...CARA.sonrisa, ojos: { abiertos: 0.9, x: -0.3, y: -0.4, feliz: 0.2 }, manoI: [0.2, 0.3, 0.38], manoD: [-0.2, 0.3, 0.38], codoI: [1, -0.6, -0.2], codoD: [-1, -0.6, -0.2], dedoI: 0, dedoD: 0, t };
  return pr;
}
// ---------- Sofi (en su escena) ----------
function poseSofi(t) {
  const p = poseEn(t, [[0, { x: 0, z: 0, giro: 0, ...aC(0, 0.05), ...CARA.sonrisa, ...BRAZOS.costado }], [T.so + 1.2, { ...aC(0.08, 0.02) }, 0.4]]);
  p.t = t; bocaVoz(p, t, T.so, ENV.so, 0.6); return p;
}

// ================= RENDER =================
function ponerLuces(lugar, parte2, lampOn) {
  const of = lugar === "of";
  for (const l of [nocheAmb, nocheKey, nocheRel]) l.visible = of && !parte2;
  for (const l of [tardeSol, tardeCielo]) l.visible = of && parte2;
  solPan.visible = cieloPan.visible = lugar === "pan";
  luzLamp.visible = of && lampOn; luzLamp.intensity = parte2 ? 1.2 : 2.2;
  pantallaLamp.material.emissiveIntensity = lampOn ? 0.55 : 0.0; lampara.userData.foco.visible = lampOn;
  for (const f of ventanaFuera) f.material.color.setHex(parte2 ? 0xe9dcbf : 0x0f1a2e);
}
// el celular en la mano de un personaje: entre las dos manos, mirando a `mira`
function celEnManos(cel, per, mira, alto = 0.07, adelante = 0.07) {
  per.raiz.updateMatrixWorld(true);
  const a = per.brazos[0].mano.getWorldPosition(new THREE.Vector3()), b = per.brazos[1].mano.getWorldPosition(new THREE.Vector3());
  cel.position.copy(a.add(b).multiplyScalar(0.5)).add(V3(0, alto, 0));
  cel.position.add(mira.clone().sub(cel.position).setY(0).normalize().multiplyScalar(adelante));
  cel.lookAt(mira);
}
const celA = crearCelular(pantA, C.navy2, 0.08 * 1.25, 0.162 * 1.25); scene.add(celA);
// la boca de la caja de zapatos (en el mundo): desde donde salen los tickets
const _q = new THREE.Quaternion();
function ponerCaja(t) {
  // la caja: bajo el brazo izquierdo de Marcelo → adelante, en las manos → se vuelca hacia el escritorio → vacía
  marcelo.raiz.updateMatrixWorld(true);
  const bajo = t < T.m2 + 0.4;
  const vuelco = eio(sg(t, T.vuelca, T.vuelca + 0.28)) * (1 - eio(sg(t, T.vuelca + 0.75, T.vuelca + 1.0)));
  const baja = t >= T.p5 ? 1 : 0;
  let local;
  if (bajo) local = V3(0.3, 0.17, 0.06);
  else local = V3(0, lerp(0.22, 0.06, baja) + vuelco * 0.06, lerp(0.4, 0.32, baja) + vuelco * 0.1);
  cajaZ.position.copy(marcelo.cuerpo.localToWorld(local));
  cajaZ.quaternion.copy(marcelo.cuerpo.getWorldQuaternion(_q));
  if (bajo) cajaZ.rotateZ(0.1);
  cajaZ.rotateX(vuelco * 2.1);
  cajaZ.translateY(bajo ? -0.06 : -0.02);
  // la tapa: arriba de la caja hasta que la abre; después, apoyada en el escritorio
  const sacaTapa = sg(t, T.vuelca - 0.45, T.vuelca - 0.15);
  if (sacaTapa <= 0) { tapaZ.position.copy(cajaZ.localToWorld(V3(0, cajaZ.userData.H + 0.004, 0))); tapaZ.quaternion.copy(cajaZ.quaternion); }
  else { const a = cajaZ.localToWorld(V3(0, cajaZ.userData.H + 0.004, 0)), b = V3(0.62, MESA_Y + 0.004, 1.28); tapaZ.position.copy(a.lerp(b, eio(sacaTapa))).add(V3(0, Math.sin(Math.PI * sacaTapa) * 0.08, 0)); tapaZ.quaternion.slerpQuaternions(cajaZ.quaternion, new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0.3, 0)), eio(sacaTapa)); }
  cajaZ.userData.relleno.visible = t < T.vuelca + 0.3;
  return cajaZ.localToWorld(V3(0, cajaZ.userData.H, 0));
}
function ponerPila(t, boca) {
  const p2 = t >= P2;
  for (const p of PILA) {
    const ts = T.vuelca + 0.14 + p.d, u = sg(t, ts, ts + 0.42);
    p.g.visible = !p2 && t >= ts;
    if (!p.g.visible) continue;
    const e = u * u;   // cae con gravedad
    p.g.position.set(lerp(boca.x + p.dx, p.fin.x, eo(u)), lerp(boca.y, p.fin.y, e) + Math.sin(Math.PI * u) * 0.06, lerp(boca.z, p.fin.z, eo(u)));
    p.g.rotation.set(lerp(p.r0[0], p.rot[0], eo(u)), lerp(p.r0[1], p.rot[1], eo(u)), lerp(p.r0[2], p.rot[2], eo(u)));
  }
}
// la boca de la caja en el momento del vuelco (fija: de ahí salen los tickets)
marcelo.poner(poseMarcelo(T.vuelca + 0.3)); const BOCA = ponerCaja(T.vuelca + 0.3).clone();
function renderAt(tIn) {
  AVISOS.length = 0;
  const t = en(tIn, P1, P2) ? (tIn < (P1 + P2) / 2 ? P1 - 0.001 : P2) : tIn;
  const parte2 = t >= P2;
  const pl = planoEn(t); planoActual = pl[0];
  let pa = planoActual;
  if (VERM === "portada") pa = "portada";
  const lugar = ["Q1", "Q1i", "Q1b", "Q1c", "Q1w"].includes(pa) ? "pan" : "of";
  const lampOn = !(parte2 && t >= T.cadena);
  ponerLuces(lugar, parte2, lampOn);
  scene.background = new THREE.Color(lugar === "pan" ? 0xf2efe6 : 0x16243d);
  OF.visible = lugar === "of";
  PAN.visible = lugar === "pan" && pa !== "Q1i" && pa !== "Q1c";   // los insertos del celular de Marcelo: sobre el azulejo liso (el mostrador tapaba la pantalla)
  if (pa === "Q1i" || pa === "Q1c") scene.background = new THREE.Color(0xe9e7de);
  // ---- objetos del estudio ----
  dibujarPantA(t);
  if (lugar === "pan" || (pa === "P7" && t < P2)) dibujarPantMar(t);
  if (parte2 && t >= T.q2 - 0.1) dibujarMon(t);
  ponerSobres(parte2 ? 60 : lerp(33, 41, sg(t, T.sob0, T.sob1)));
  for (const s of sobres) s.userData.tab.visible = !parte2 && s.userData.lleno < 0.5;
  ponerTira(parte2 ? 0.16 : lerp(0.52, 1.45, eio(sg(t, T.p3b - 0.3, T.p3b + 0.5))));
  piolin.visible = ticketLucas.visible = brocheLucas.visible = banquito.visible = !parte2;
  lucasDesk.visible = parte2;
  carpetas.visible = !parte2; monitor.visible = parte2;
  celuS.visible = pa === "Q5"; telA.visible = pa !== "Q5";
  cajaZ.visible = tapaZ.visible = !parte2 && t >= T.p4 && t < T.cierra;
  // la puerta: se abre cuando entra Marcelo y se cierra cuando se va
  const abierta = parte2 ? 0 : Math.min(eio(sg(t, T.abre, T.abre + 0.3)), 1 - eio(sg(t, T.cierra - 0.25, T.cierra))) + (t >= T.sale - 0.3 && t < T.cierra ? eio(sg(t, T.sale - 0.3, T.sale)) * (1 - eio(sg(t, T.cierra - 0.25, T.cierra))) : 0);
  puertaG.rotation.y = -1.45 * cl(t < T.p7 ? eio(sg(t, T.abre, T.abre + 0.3)) * (1 - eio(sg(t, T.abre + 1.2, T.abre + 1.6))) : abierta);
  // la cadenita de la lámpara: el tirón en Q4b
  cadena.position.y = 0.33 - 0.02 * Math.sin(Math.PI * sg(t, T.cadena - 0.1, T.cadena + 0.15)) * (parte2 ? 1 : 0);
  // ---- personajes ----
  for (const p of TODOS) p.raiz.visible = false;
  celM.visible = celA.visible = false;
  telA.userData.piv.visible = true;
  let boca = null;
  if (lugar === "of") {
    adriana.raiz.visible = pa !== "Q5" && pa !== "P3c";
    sillaA.visible = pa !== "Q5";
    const pr = poseAdriana(t);
    // P5: la mano derecha va a la pila y levanta el ticket contra la lámpara
    if (!parte2 && t >= T.saca) {
      const u1 = eio(sg(t, T.saca, T.saca + 0.18)), u2 = eio(sg(t, T.saca + 0.22, T.saca + 0.55));
      const w = PICK.clone().lerp(TICKET_ALTO, u2);
      const rest = pr.manoD.slice();
      pr.manoD = lerpV(rest, aCuerpo(adriana, w), u1); pr.codoD = [-1, -0.3, -0.3]; pr.dedoD = 0;
    }
    // Q3: el dedo en el celular del soporte mientras graba
    if (parte2 && t >= T.a3 - 0.35 && t < T.a3 + LEN.a3 + 0.1) { telA.updateMatrixWorld(true); const w = telA.userData.piv.localToWorld(V3(0, telA.userData.H * 0.12, 0.03)); const u = eio(sg(t, T.a3 - 0.35, T.a3 - 0.1)) * (1 - eio(sg(t, T.a3 + LEN.a3 - 0.15, T.a3 + LEN.a3 + 0.1))); pr.manoD = lerpV(pr.manoD, aCuerpo(adriana, w), u); pr.codoD = [-1, -0.4, -0.3]; pr.dedoD = u; }
    // Q4b: tira de la cadenita
    if (parte2 && t >= T.q4b) { lampara.updateMatrixWorld(true); const w = cadena.localToWorld(V3(0, -0.105, 0)); const u = eio(sg(t, T.q4b + 0.05, T.cadena - 0.05)); const v = V3(0, -0.03 * Math.sin(Math.PI * sg(t, T.cadena - 0.1, T.cadena + 0.15)), 0); pr.manoD = lerpV(pr.manoD, aCuerpo(adriana, w.add(v).add(V3(0, -0.05, 0))), u); pr.codoD = [-1, -0.2, -0.3]; pr.dedoD = 0; }
    adriana.poner(pr);
    sillaA.rotation.y = adriana.raiz.rotation.y;
    // P2: el celular en las manos (el del soporte queda vacío)
    if (!parte2 && t >= T.p2 && t < T.p3) { telA.userData.piv.visible = false; celA.visible = true; celEnManos(celA, adriana, V3(0.12, 1.2, 1.9), 0.08, 0.05); }
    // el ticket en blanco: en la pila hasta que lo saca, después en la mano
    ticketBlanco.visible = !parte2 && t >= T.vuelca + 0.5;
    if (ticketBlanco.visible) {
      if (t < T.saca + 0.18) { ticketBlanco.position.copy(PICK).add(V3(0, -0.105, 0.02)); ticketBlanco.rotation.set(-Math.PI / 2 + 0.05, 0, 0.4); ticketBlanco.position.y = PICK.y - 0.02; }
      else { const h = manoW(adriana, "D"); ticketBlanco.position.copy(h).add(V3(0.0, 0.0, 0.035)); ticketBlanco.lookAt(camera.position.x, ticketBlanco.position.y, camera.position.z); ticketBlanco.rotateZ(0.12); }
    }
    if (!parte2) {
      lucas.raiz.visible = true; const pl2 = poseLucas(t);
      // P3b: Lucas cuelga un ticket más en el piolín (la mano izquierda)
      const zT = LUC1P.z + 0.12, alto = V3(PIOL.x - 0.03, PIOL.y + 0.02, zT);
      const u1 = eio(sg(t, T.cuelga - 0.45, T.cuelga - 0.1)), u2 = 1 - eio(sg(t, T.cuelga + 0.15, T.cuelga + 0.45));
      if (u1 * u2 > 0) { pl2.manoI = lerpV(pl2.manoI, aCuerpo(lucas, alto), u1 * u2); pl2.codoI = [1, -0.2, -0.4]; pl2.cabeza = { giro: 0.65, asiente: -0.2, ladea: 0 }; pl2.ojos = { abiertos: 1, x: 0.5, y: 0.4 }; }
      lucas.poner(pl2);
      // el ticket de Lucas: en la mano hasta que lo cuelga, después en el piolín
      if (t < T.cuelga) { const h = manoW(lucas, "I"); ticketLucas.position.copy(h).add(V3(0, 0.05, 0)); ticketLucas.rotation.set(0, Math.PI / 2, 0.1); }
      else { ticketLucas.position.set(PIOL.x, PIOL.y - 0.012, zT); ticketLucas.rotation.set(0, Math.PI / 2, Math.sin((t - T.cuelga) * 9) * 0.12 * Math.exp(-(t - T.cuelga) * 3)); }
      brocheLucas.visible = t >= T.cuelga; brocheLucas.position.set(PIOL.x, PIOL.y - 0.008, zT); brocheLucas.rotation.y = Math.PI / 2;
    } else { lucas.raiz.visible = pa !== "Q5"; lucas.poner(poseLucas(t)); }
    if (!parte2 && t >= T.p4 && t < T.cierra) {
      marcelo.raiz.visible = true; marcelo.poner(poseMarcelo(t));
      boca = ponerCaja(t);
      if (t >= T.p7) { celM.visible = true; marcelo.raiz.updateMatrixWorld(true); celEnManos(celM, marcelo, V3(0, 1.2, 0.5), 0.06, 0.08); }
    }
  }
  ponerPila(t, BOCA);
  void boca;
  if (lugar === "pan") {
    marcelo.raiz.visible = pa !== "Q1c" && pa !== "Q1i"; const pm = poseMarceloPan(t); marcelo.poner(pm);
    marcelo.raiz.updateMatrixWorld(true);
    celM.visible = true;
    if (t >= T.bolsa + 0.5 && t < T.q1w) { const h = cabezaW(marcelo, 0.1); celEnManos(celM, marcelo, h, 0.04, 0.12); celM.lookAt(h); }
    else celEnManos(celM, marcelo, V3(PX + 0.32, 1.45, 3), 0.06, 0.06);
    // el repartidor y la bolsa de harina
    repartidor.raiz.visible = pa === "Q1b" || pa === "Q1";
    repartidor.poner(poseRepartidor(t)); repartidor.raiz.updateMatrixWorld(true);
    const enMano = t < T.bolsa + 0.25;
    bolsaH.visible = t >= T.q1d3 - 0.4;
    if (enMano) { const a = repartidor.brazos[0].mano.getWorldPosition(new THREE.Vector3()), b = repartidor.brazos[1].mano.getWorldPosition(new THREE.Vector3()); bolsaH.position.copy(a.add(b).multiplyScalar(0.5)).add(V3(0, 0.02, 0)); bolsaH.position.x -= PX; bolsaH.rotation.set(0, repartidor.raiz.rotation.y + Math.PI / 2, 0); }
    else { const u = eio(sg(t, T.bolsa + 0.25, T.bolsa + 0.4)); bolsaH.position.lerp(V3(0.68, MOST_Y, 0.82), u); bolsaH.rotation.set(0, Math.PI / 2 + 0.1, 0); }
    if (t >= T.bolsa + 0.4) bolsaH.position.set(0.68, MOST_Y, 0.82);
    facturaH.visible = t >= T.bolsa + 0.3; facturaH.position.set(0.22, MOST_Y + 0.002, 0.92); facturaH.rotation.set(-Math.PI / 2, 0, 0.12);
  }
  scene.updateMatrixWorld(true);
  // ---- cámara ----
  if (pl[2] && pa !== "portada") ponerCam(catmull(pl[2], t), t);
  if (pa === "P3" || pa === "P7i") {
    const { v, up } = vistaPantalla(telA.userData.piv, telA.userData.centro, V3(0, 0, 1), telA.userData.H, 0.74, 40, -0.004);
    const k = pa === "P3" ? sg(t, T.p3, T.p3b) : sg(t, T.vib, T.p7c); const v2 = v.slice(); v2[0] += (v[0] - v[3]) * 0.06 * (1 - k); v2[1] += (v[1] - v[4]) * 0.06 * (1 - k); v2[2] += (v[2] - v[5]) * 0.06 * (1 - k);
    ponerVista(v2, v2, 0, up, up);
    if (pa === "P7i") { const s = Math.sin(t * 90) * 0.0015 * (1 - sg(t, T.vib, T.vib + 0.4)); camera.position.x += s; }
  }
  if (pa === "P5") {
    const A = [-0.1, 1.28, 2.15, -0.15, 1.08, 0.55, 42];
    ticketBlanco.updateMatrixWorld(true);
    const c = ticketBlanco.localToWorld(V3(0, 0.11, 0));
    const B = [-0.2, 1.2, 1.92, c.x, c.y, c.z, 31];
    ponerCam(lerpV(A, B, eio(sg(t, T.a2 - 0.25, T.a2 + 0.25))), t);
  }
  if (pa === "Q1i" || pa === "Q1c") {
    const { v, up } = vistaPantalla(celM, V3(0, 0, 0.007), V3(0, 0, 1), 0.162 * 1.25, pa === "Q1i" ? 0.66 : 0.72, 40, pa === "Q1i" ? 0.012 : -0.004);
    const t0 = pa === "Q1i" ? T.q1i : T.cam, t1 = pa === "Q1i" ? T.q1d3 : T.q1w, k = sg(t, t0, t1);
    const v2 = v.slice(); v2[0] += (v[0] - v[3]) * 0.06 * (1 - k); v2[1] += (v[1] - v[4]) * 0.06 * (1 - k); v2[2] += (v[2] - v[5]) * 0.06 * (1 - k);
    ponerVista(v2, v2, 0, up, up);
  }
  if (pa === "Q2m" || pa === "Q4") {
    const FOV = 44, d = (MON.W * 1.04) / (2 * Math.tan((FOV * D2R) / 2) * (1080 / 1920));
    monitor.updateMatrixWorld(true);
    const c = monitor.localToWorld(monitor.userData.centro.clone()), n = V3(0, 0, 1).transformDirection(monitor.matrixWorld);
    const p = c.clone().add(n.multiplyScalar(d * (pa === "Q4" ? lerp(1.05, 1.0, eio(sg(t, T.q4, T.q4b))) : 1)));
    const ins = [p.x, p.y, p.z, c.x, c.y, c.z, FOV];
    if (pa === "Q2m") ponerVista(catmull(PLANOS.find((x) => x[0] === "Q2")[2], T.q2i), ins, eio(sg(t, T.q2i, T.q2i + 0.4))); else ponerCam(ins, t, true);
  }
  if (pa === "Q5") {
    celuS.updateMatrixWorld(true);
    const cs = celuS.userData.piv.localToWorld(celuS.userData.centro.clone());
    const u = eio(sg(t, T.q5, DUR));
    ponerCam([cs.x + 0.02, cs.y + 0.02, cs.z + lerp(0.74, 0.7, u), cs.x + 0.01, cs.y - 0.12, cs.z, 44], t);
  }
  if (t >= T.q5 - 0.6) {
    // Sofi: su escena a la textura del celular parado (desde antes del plano: el primer cuadro ya la tiene)
    sofi.poner(poseSofi(t)); sofi.raiz.updateMatrixWorld(true);
    const c = sofi.cabeza.localToWorld(V3(0, 0.2, 0));
    SOFI.cam.position.set(c.x + 0.05, c.y + 0.02, c.z + 2.75); SOFI.cam.lookAt(c.x, c.y - 0.28, c.z);
    renderer.setRenderTarget(SOFI.rt); renderer.render(SOFI.esc, SOFI.cam); renderer.setRenderTarget(null);
  }
  if (pa === "portada") {
    // la portada: Adriana de frente con el ticket en blanco en alto contra la lámpara, la montaña de tickets delante,
    // Marcelo de 3/4 a un costado
    ponerCam([0.05, 1.3, 2.75, -0.05, 1.12, 0.6, 46], t, true);
  }
  if (window.__cam) ponerCam(window.__cam, t, true);
  if (VERM && VERM.startsWith("cam:")) ponerCam(VERM.slice(4).split(",").map(Number), t, true);
  camera.updateMatrixWorld(true);
  for (const p of TODOS) if (p.ojoLejano && p.raiz.visible) p.ojoLejano(camera.position);

  // ---- globos de diálogo y rótulos ----
  for (const k in GL) GL[k].visible = false;
  for (const r of [...ROT, ...ROT_Q, ...Object.values(CNT)]) r.visible = false;
  for (const g of GUIAS) g.visible = false;
  if (!LIMPIO && !en(tIn, P1, P2) && pa !== "portada") tarjetas(t, pa);
  renderer.render(scene, camera);
}
function tarjetas(t, pa) {
  const ent = (ti) => (t < ti ? 0 : 0.75 + 0.25 * bk(sg(t, ti, ti + 0.18)));
  const tel = () => objPx(telA.userData.piv, V3(0, telA.userData.H * 0.9, 0.01));
  if (pa === "P1" && t >= T.m1 - 0.08) { const [tx, ty] = tel(); ponerGlobo(GL.m1, 560, 1570, ent(T.m1 - 0.08), [tx, ty + 30], 1); }
  if (pa === "Q3" && t >= T.m1b - 0.08) { const [tx, ty] = tel(); ponerGlobo(GL.m1b, 560, 1570, t < T.a3 - 0.1 ? ent(T.m1b - 0.08) : 0, [tx, ty + 30], 1); }
  if (pa === "P2" && t >= T.a1 - 0.04) hablar(GL.a1, adriana, ent(T.a1 - 0.04), 1, 0, 300);
  if (pa === "P3b" || pa === "P3c") { const n = Math.round(lerp(33, 41, sg(t, T.sob0, T.sob1))); ponerGlobo(CNT[n], 300, 300, pa === "P3b" ? 0 : ent(T.p3c), null, 3); }
  if (pa === "P4" && t >= T.m2 - 0.04) { const [hx, hy] = coronillaPx(marcelo); ponerGlobo(GL.m2, 560, Math.min(420, hy - 170), ent(T.m2 - 0.04), [hx, hy + 6], 1); }
  if (pa === "P5" && t >= T.a2 - 0.04) ponerGlobo(GL.a2, 700, 330, ent(T.a2 - 0.04), null, 1);
  if (pa === "P5c" && t >= T.m3 - 0.04) hablar(GL.m3, marcelo, ent(T.m3 - 0.04), 1, 0, 280);
  if (pa === "P6") {
    const objs = [objPx(ticketBlanco, V3(0, 0.2, 0)), objPx(cajaZ, V3(0, 0.12, 0)), objPx(sobresG, V3(0, 1.2, 0.05)), cabezaW(adriana, 0.25)];
    const pos = [[300, 250], [770, 1500], [770, 250], [300, 1500]];
    objs[3] = enPantalla(objs[3]);
    ROT.forEach((r, i) => { if (t < T.rot[i]) return; ponerGlobo(r, pos[i][0], pos[i][1], ent(T.rot[i]), null, 3 + i); const { H } = r.userData; const y0 = pos[i][1] + (pos[i][1] < 900 ? H / 2 : -H / 2); ponerGuia(GUIAS[i], pos[i][0], y0, objs[i][0], objs[i][1], sg(t, T.rot[i], T.rot[i] + 0.22)); });
  }
  if (pa === "P7" && t >= T.m4 - 0.04 && t < T.sale + 0.15) hablar(GL.m4, marcelo, ent(T.m4 - 0.04), 1, 0, 280);
  if (pa === "Q1i" && t >= T.q1i + 0.25) ponerGlobo(ROT_Q[0], 540, 1790, ent(T.q1i + 0.25), null, 2);
  if (pa === "Q1w" && t >= T.m5 - 0.04) hablar(GL.m5, marcelo, ent(T.m5 - 0.04), 1, 0, 280);
  if (pa === "Q2m" && t >= T.clickM + 0.15) ponerGlobo(ROT_Q[1], 540, 1560, ent(T.clickM + 0.15), null, 2);
  if (pa === "Q3" && t >= T.a3 - 0.04 && t < T.m6 - 0.1) hablar(GL.a3, adriana, ent(T.a3 - 0.04), 1, 0, 300);
  if (pa === "Q3" && t >= T.m6 - 0.08) { const [tx, ty] = tel(); ponerGlobo(GL.m6, 560, 1590, ent(T.m6 - 0.08), [tx, ty + 30], 1); }
}

window.__tresRender = renderAt;
window.addEventListener("hf-seek", (e) => renderAt(e.detail.time));
window.__tresDbg = (t) => { renderAt(t); return { plano: planoActual, avisos: AVISOS.slice(), cam: camera.position.toArray().map((v) => +v.toFixed(2)) }; };
renderAt(window.__hfThreeTime || 0);
if (window.__tresListo) window.__tresListo();
