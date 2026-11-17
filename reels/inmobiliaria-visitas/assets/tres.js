// Capa 3D de inmobiliaria-visitas (Three.js r170 local). Base técnica: reels/dist-cliente-grande (gen.mjs, tarjetas
// pegadas a la cámara, regla de burbujas, cámara por planos con Catmull-Rom) y reels/veterinaria-vacunas (Sofi en
// videollamada). renderAt(t) es una función pura del tiempo del timeline (hf-seek): nada de rAF, Date.now ni azar sin
// semilla.
// Lugares del mismo mundo, lejos uno del otro:
//   LA OFICINA DE "SILVANA PROPIEDADES" (alrededor del origen): ladrillo pintado crema con la franja verde y el nombre,
//     el tablero de llaves (el gancho POCITOS vacío en la parte 1), el panel de fichas, el escritorio de Silvana con el
//     celular en altavoz, los escritorios de Diego (post-its, la llave MALVÍN) y Romina (la agenda tachada), la vidriera
//   POCITOS (x = 60): el balcón de Graciela con el cartel VENDE y la llave POCITOS en la cerradura de la puerta-ventana,
//     la rambla y el río abajo; detrás de la fachada, el apartamento vacío (parquet en espiga) y el pasillo
//   PARTE 1: "¿Y? ¿Hubo visitas?" · "¿Hubo visitas en lo de Graciela?" · "Un montón." / "Ninguna." · "Me dicen que
//            varias, Graciela." · el balcón: "Qué raro. La llave la tengo yo." · la pausa (rótulos) · "Mañana paso a
//            buscar el cartel." · "Ah. Era el de Malvín."
//   PARTE 2: la visita cargada en el celular de Diego · el resumen en el de Graciela · "¿Y? ¿Hubo visitas?" · la ficha ·
//            "Cuatro. Y el martes vuelve una pareja." · "Ya sé. Llamaba para chusmear." · RESERVADO · "Mañana paso a
//            buscar el cartel." · VENDIDO · Sofi
import * as THREE from "./vendor/three/three.module.js";
import { RoundedBoxGeometry } from "./vendor/three/RoundedBoxGeometry.js";
import { crearPersonaje, ELENCO, DEFECTO, PIEL, PELO, MARCA, poseEn, CARA, BRAZOS, saludo, pegarACamara, crearCelular } from "./personajes.js";
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


// =====================================================================================================
// LA OFICINA DE "SILVANA PROPIEDADES" (alrededor del origen, piso y = 0), viernes de tarde, luz pareja
//   pared del fondo (z = -0.6): ladrillo pintado crema, franja verde a 1,6 m, "SILVANA PROPIEDADES" en letras navy,
//   el TABLERO DE LLAVES a la derecha de Silvana (+x) y el PANEL DE FICHAS a su izquierda (-x)
//   Silvana sentada en (0, 0.32) mirando a +z; su escritorio delante; el monitor a su derecha (-x), el celular en altavoz
//   parado en su soporte a su izquierda (+x)
//   Diego (x = +0.85) y Romina (x = -0.85) en sus escritorios enfrentados a Silvana (z = 4.25, mirando a -z); detrás de
//   ellos, la vidriera a la calle (z = 5.15) con las fichas de propiedades colgadas adentro, mirando a la sala
// =====================================================================================================
const OF = new THREE.Group(); scene.add(OF);
const OFI = { x0: -2.8, x1: 2.8, z0: -0.6, z1: 5.15, alto: 3.0 };
const MESA_Y = 0.76;
const SIL = { x: 0, z: 0.3 };                         // Silvana sentada
const DIE = { x: 0.64, z: 3.62 }, ROM = { x: -0.64, z: 3.62 };
const DESK_S = { x0: -0.72, x1: 0.72, z0: 0.78, z1: 1.52 };
const MON = { x: -0.72, z: 0.98, ry: 0.62, W: 0.66, H: 0.41 };
const pantM = lienzo(1280, 800, () => {});        // el monitor de Silvana
const pantS = lienzo(600, 1110, () => {});        // el celular de Silvana (altavoz)
const pantD = lienzo(600, 1110, () => {});        // el celular de Diego (la visita)
const pantG = lienzo(600, 1110, () => {});        // el celular de Graciela
let monitor, telS, tablero, ganchoPocitos, llavePocitosTab;
const paredM = mat(0xefeee5, 0.9);
// ---- ladrillo pintado crema (relieve bajo, juntas cr2, color plano) ----
const ladrilloT = lienzo(1024, 1024, (x, w, h) => {
  x.fillStyle = "#d9d7c9"; x.fillRect(0, 0, w, h);
  const bh = 64, bw = 200;
  for (let r = 0; r < h / bh; r++) for (let c = -1; c < w / bw + 1; c++) {
    const ox = (r % 2) * (bw / 2);
    x.fillStyle = (r * 7 + c * 3) % 5 === 0 ? "#ebe9df" : "#efeee5"; x.fillRect(c * bw + ox + 6, r * bh + 6, bw - 12, bh - 12);
  }
});
ladrilloT.wrapS = ladrilloT.wrapT = THREE.RepeatWrapping; ladrilloT.repeat.set(5.6 / 2.2, 3.0 / 2.2);
// ---- llaves con etiqueta kraft redonda ----
const BARRIOS = ["CENTRO", "CORDÓN", "BUCEO", "PUNTA CARRETAS", "PARQUE RODÓ", "MALVÍN", "PRADO", "CARRASCO", "POCITOS", "AGUADA", "LA BLANQUEADA", "UNIÓN", "TRES CRUCES", "PALERMO", "LA COMERCIAL", "JACINTO VERA", "LARRAÑAGA", "BRAZO ORIENTAL", "ATAHUALPA", "SAYAGO", "PEÑAROL", "COLÓN", "CASAVALLE", "MALVÍN NORTE"];
const etiquetaT = {};
function texEtiqueta(nombre) {
  if (etiquetaT[nombre]) return etiquetaT[nombre];
  return (etiquetaT[nombre] = lienzo(256, 256, (x, w, h) => {
    x.clearRect(0, 0, w, h);
    x.fillStyle = "#c9a46b"; x.beginPath(); x.arc(w / 2, h / 2, w / 2 - 4, 0, 7); x.fill();
    x.strokeStyle = "#a9864f"; x.lineWidth = 8; x.stroke();
    x.fillStyle = "#efeee5"; x.beginPath(); x.arc(w / 2, 34, 13, 0, 7); x.fill(); x.strokeStyle = "#8a6a3a"; x.lineWidth = 4; x.stroke();
    x.fillStyle = "#16243d"; x.textAlign = "center"; x.textBaseline = "middle";
    const pal = nombre.split(" ");
    if (pal.length === 1) { ajustar(x, nombre, 800, 64, 210); x.fillText(nombre, w / 2, h / 2 + 12); }
    else { const s = Math.min(ajustar(x, pal[0], 800, 54, 200), ajustar(x, pal.slice(1).join(" "), 800, 54, 200)); x.font = F(800, s); x.fillText(pal[0], w / 2, h / 2 - 8); x.fillText(pal.slice(1).join(" "), w / 2, h / 2 + 46); }
  }));
}
// una llave de bronce con argolla y etiqueta (origen en la argolla; cuelga hacia -y)
const bronce = mat(0xb08d57, 0.35, { metalness: 0.55 });
function crearLlave(nombre, R = 0.035) {
  const g = new THREE.Group();
  const arg = mesh(new THREE.TorusGeometry(R * 0.32, R * 0.06, 8, 20), M.gris); g.add(arg);
  const k = new THREE.Group(); k.position.set(0, -R * 0.3, 0); k.rotation.z = 0.25; g.add(k);
  k.add(mesh(new THREE.TorusGeometry(R * 0.28, R * 0.09, 8, 18), bronce, 0, -R * 0.25, 0));
  k.add(cajaS(R * 0.13, R * 1.3, R * 0.06, bronce, 0, -R * 1.15, 0));
  for (let i = 0; i < 3; i++) k.add(cajaS(R * 0.16, R * 0.1, R * 0.06, bronce, R * 0.12, -R * (1.25 + i * 0.22), 0));
  const et = new THREE.Mesh(new THREE.CircleGeometry(R, 28), new THREE.MeshStandardMaterial({ map: texEtiqueta(nombre), roughness: 0.85, transparent: true, side: THREE.DoubleSide }));
  et.position.set(-R * 0.15, -R * 1.25, R * 0.06); et.rotation.z = -0.1; g.add(et);
  g.userData.et = et; g.userData.k = k;
  return sombras(g);
}
{
  const OW = OFI.x1 - OFI.x0, OD = OFI.z1 - OFI.z0, OZ = (OFI.z0 + OFI.z1) / 2;
  // piso de porcelanato navy2 en placas grandes (mate)
  const pisoT = lienzo(512, 512, (x, w, h) => { x.fillStyle = "#16243d"; x.fillRect(0, 0, w, h); x.strokeStyle = "#22355a"; x.lineWidth = 5; x.strokeRect(0, 0, w, h); });
  pisoT.wrapS = pisoT.wrapT = THREE.RepeatWrapping; pisoT.repeat.set(OW / 0.9, OD / 0.9);
  const piso = mesh(new THREE.PlaneGeometry(OW, OD), new THREE.MeshStandardMaterial({ map: pisoT, roughness: 0.85 }), 0, 0, OZ); piso.rotation.x = -Math.PI / 2; piso.castShadow = false; OF.add(piso);
  OF.add(cajaS(OW, 0.1, OD, mat(0xe4e2d6, 0.95), 0, OFI.alto + 0.05, OZ));
  for (const [x, z] of [[-1.2, 1.2], [1.2, 1.2], [-1.2, 3.6], [1.2, 3.6]]) { const l = mesh(new THREE.PlaneGeometry(1.0, 0.5), new THREE.MeshBasicMaterial({ color: 0xfbfaf4 }), x, OFI.alto - 0.005, z); l.rotation.x = Math.PI / 2; l.castShadow = false; OF.add(l); }
  // pared del fondo: ladrillo crema
  const fondo = mesh(new THREE.BoxGeometry(OW, OFI.alto, 0.12), new THREE.MeshStandardMaterial({ map: ladrilloT, roughness: 0.92 }), 0, OFI.alto / 2, OFI.z0 - 0.06); fondo.castShadow = false; OF.add(fondo);
  // la franja verde de marca (25 cm a 1,6 m) y el nombre en letras navy corpóreas (dos planos: la sombra y la cara)
  OF.add(caja(OW, 0.25, 0.025, M.g, 0, 1.725, OFI.z0 + 0.012, 0.004));
  const nombreT = lienzo(2048, 200, (x, w, h) => { x.clearRect(0, 0, w, h); x.fillStyle = "#0b1220"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "SILVANA PROPIEDADES", 800, 150, w - 40); x.fillText("SILVANA PROPIEDADES", w / 2, h / 2 + 6); });
  const nombreS = nombreT.clone(); nombreS.needsUpdate = true;
  const nm = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 0.254), new THREE.MeshStandardMaterial({ map: nombreT, transparent: true, roughness: 0.5 })); nm.position.set(0, 2.2, OFI.z0 + 0.05); OF.add(nm);
  const ns = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 0.254), new THREE.MeshBasicMaterial({ map: nombreS, transparent: true, opacity: 0.22, color: 0x000000 })); ns.position.set(0.012, 2.188, OFI.z0 + 0.02); OF.add(ns);
  // paredes de los costados (crema lisa) con zócalo navy
  for (const x of [OFI.x0, OFI.x1]) { const p = mesh(new THREE.BoxGeometry(0.12, OFI.alto, OD), paredM, x, OFI.alto / 2, OZ); p.castShadow = false; OF.add(p); OF.add(caja(0.03, 0.12, OD, M.navy3, x - Math.sign(x) * 0.07, 0.06, OZ)); }
  OF.add(caja(OW, 0.12, 0.03, M.navy3, 0, 0.06, OFI.z0 + 0.02));
  // la vidriera a la calle (z1): parantes navy3, vidrio, la vereda de enfrente clara
  for (const x of [-2.75, -1.4, 0, 1.4, 2.75]) OF.add(caja(0.09, OFI.alto, 0.12, M.navy3, x, OFI.alto / 2, OFI.z1));
  OF.add(caja(OW, 0.12, 0.14, M.navy3, 0, 0.06, OFI.z1)); OF.add(caja(OW, 0.14, 0.14, M.navy3, 0, 2.55, OFI.z1));
  const calle = mesh(new THREE.PlaneGeometry(14, 6), new THREE.MeshBasicMaterial({ color: 0xe6ebec }), 0, 2.5, OFI.z1 + 3.5); calle.rotation.y = Math.PI; calle.castShadow = false; OF.add(calle);
  const enfrente = mesh(new THREE.PlaneGeometry(14, 2.3), new THREE.MeshBasicMaterial({ color: 0xcfd6da }), 0, 1.15, OFI.z1 + 3.4); enfrente.rotation.y = Math.PI; enfrente.castShadow = false; OF.add(enfrente);
  const vid = new THREE.Mesh(new THREE.PlaneGeometry(OW, 2.5), M.vidrio); vid.position.set(0, 1.27, OFI.z1 + 0.02); vid.rotation.y = Math.PI; vid.renderOrder = 3; OF.add(vid);
}
// ---- las fichas de propiedades (A4 crema con encabezado VENDE navy / ALQUILA verde oscuro, la casita y el precio) ----
function texFicha(tipo, barrio, dorm, precio, grande = false) {
  return lienzo(420, 594, (x, w, h) => {
    x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h);
    x.fillStyle = tipo === "VENDE" ? "#16243d" : "#3fa60a"; x.fillRect(0, 0, w, 120);
    x.fillStyle = "#efeee5"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, tipo, 900, 92, w - 40); x.fillText(tipo, w / 2, 64);
    // la casita en líneas navy
    x.strokeStyle = "#16243d"; x.lineWidth = 12; x.lineJoin = "round";
    x.beginPath(); x.moveTo(90, 300); x.lineTo(210, 190); x.lineTo(330, 300); x.moveTo(115, 280); x.lineTo(115, 390); x.lineTo(305, 390); x.lineTo(305, 280); x.stroke();
    x.strokeRect(185, 315, 50, 75);
    x.fillStyle = "#16243d"; ajustar(x, barrio, 900, 64, w - 30); x.fillText(barrio, w / 2, 448);
    x.font = F(700, 42); x.fillText(dorm, w / 2, 502);
    x.fillStyle = tipo === "VENDE" ? "#0b1220" : "#3fa60a"; ajustar(x, precio, 900, 54, w - 30); x.fillText(precio, w / 2, 556);
    if (grande) { x.strokeStyle = "#5ce611"; x.lineWidth = 14; x.strokeRect(7, 7, w - 14, h - 14); }
  });
}
let fichaGraciela;
{
  // el panel de la pared del fondo (izquierda de Silvana): marco navy3, cable y broches; la de Graciela grande, al frente
  const P = new THREE.Group(); P.position.set(-0.78, 0, OFI.z0 + 0.02); OF.add(P);
  P.add(caja(0.92, 0.035, 0.03, M.navy3, 0, 1.6, 0.02, 0.008));
  const fich = [["ALQUILA", "CORDÓN", "1 dorm.", "$ 24.000", -0.3, 1.33, 0.16], ["VENDE", "BUCEO", "3 dorm.", "USD 245.000", 0.3, 1.33, 0.16], ["ALQUILA", "CENTRO", "2 dorm.", "$ 28.500", -0.3, 1.02, 0.16]];
  for (const [tp, b, d, p, x, y, w] of fich) { const f = plano(w, w * 1.414, texFicha(tp, b, d, p), x, y, 0.035); P.add(f); P.add(caja(0.025, 0.02, 0.012, M.navy, x, y + w * 0.707 - 0.01, 0.045, 0.004)); }
  fichaGraciela = plano(0.26, 0.26 * 1.414, texFicha("VENDE", "POCITOS", "2 dorm.", "USD 180.000", true), 0.14, 1.19, 0.05); P.add(fichaGraciela);
  P.add(caja(0.03, 0.022, 0.012, M.navy, 0.14, 1.19 + 0.18, 0.06, 0.004));
  // las de la vidriera (miran a la sala, -z)
  const V = new THREE.Group(); V.position.set(0, 0, OFI.z1 - 0.08); V.rotation.y = Math.PI; OF.add(V);
  V.add(cajaS(5.4, 0.012, 0.012, M.navy, 0, 2.38, 0));
  const vf = [["VENDE", "PUNTA CARRETAS", "2 dorm.", "USD 310.000"], ["ALQUILA", "PARQUE RODÓ", "1 dorm.", "$ 26.000"], ["VENDE", "MALVÍN", "3 dorm.", "USD 198.000"], ["ALQUILA", "POCITOS", "2 dorm.", "$ 35.000"], ["VENDE", "CARRASCO", "4 dorm.", "USD 520.000"], ["VENDE", "PRADO", "3 dorm.", "USD 230.000"], ["ALQUILA", "CORDÓN", "2 dorm.", "$ 27.000"], ["VENDE", "BUCEO", "2 dorm.", "USD 205.000"]];
  vf.forEach(([tp, b, d, p], i) => { const x = -2.25 + (i % 4) * 0.52 + (i >= 4 ? 2.45 : 0) - (i >= 4 ? 0 : 0); const xx = i < 4 ? -2.35 + i * 0.5 : 0.85 + (i - 4) * 0.5; const f = plano(0.34, 0.48, texFicha(tp, b, d, p), xx, 2.08, 0.0); V.add(f); V.add(cajaS(0.003, 0.06, 0.003, M.navy, xx, 2.35, 0)); void x; });
}
// ---- EL TABLERO DE LLAVES (madera clara, 4 filas de 6 ganchos, etiquetas kraft); POCITOS: la etiqueta en la madera y
// el gancho vacío en la parte 1, con su llave en la parte 2 ----
{
  tablero = new THREE.Group(); tablero.position.set(0.5, 1.24, OFI.z0 + 0.02); OF.add(tablero);
  const TW = 0.64, TH = 0.56;
  tablero.add(caja(TW, TH, 0.03, mat(0xc9a774, 0.7), 0, 0, 0.015, 0.01));
  tablero.add(caja(TW + 0.04, 0.03, 0.04, mat(0xa98754, 0.7), 0, TH / 2 + 0.01, 0.02, 0.006));
  const tituloT = lienzo(512, 64, (x, w, h) => { x.clearRect(0, 0, w, h); x.fillStyle = "#16243d"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "LLAVES", 900, 54, w); x.fillText("LLAVES", w / 2, h / 2 + 3); });
  tablero.add(plano(0.3, 0.0375, tituloT, 0, TH / 2 - 0.035, 0.031));
  for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) {
    const i = r * 6 + c, nombre = BARRIOS[i], x = -TW / 2 + 0.062 + c * 0.103, y = TH / 2 - 0.11 - r * 0.124;
    const gancho = mesh(new THREE.CylinderGeometry(0.004, 0.004, 0.035, 6), bronce, x, y, 0.045); gancho.rotation.x = Math.PI / 2; tablero.add(gancho);
    if (nombre === "POCITOS") {
      ganchoPocitos = new THREE.Vector3(x, y, 0.045);
      const et = new THREE.Mesh(new THREE.CircleGeometry(0.03, 28), new THREE.MeshStandardMaterial({ map: texEtiqueta(nombre), roughness: 0.85, transparent: true })); et.position.set(x, y - 0.05, 0.032); tablero.add(et);
      llavePocitosTab = crearLlave("POCITOS", 0.026); llavePocitosTab.position.set(x, y, 0.06); tablero.add(llavePocitosTab);
      continue;
    }
    const ll = crearLlave(nombre, 0.026); ll.position.set(x, y, 0.06); ll.rotation.z = ((i * 37) % 7 - 3) * 0.02; tablero.add(ll);
  }
}
// ---- EL ESCRITORIO DE SILVANA: tapa crema, patas navy3; el monitor, el teclado, el celular en altavoz en su soporte,
// el portalápices y una planta chica ----
const MADERA_CR = mat(0xe8e2d0, 0.6);
function escritorio(x0, x1, z0, z1, frente = true) {
  const g = new THREE.Group();
  const DW = x1 - x0, DD = z1 - z0, CX = (x0 + x1) / 2, CZ = (z0 + z1) / 2;
  g.add(caja(DW, 0.045, DD, MADERA_CR, CX, MESA_Y - 0.022, CZ, 0.01));
  for (const x of [x0 + 0.04, x1 - 0.04]) g.add(caja(0.045, MESA_Y - 0.045, DD - 0.08, M.navy3, x, (MESA_Y - 0.045) / 2, CZ));
  if (frente) g.add(caja(DW - 0.1, 0.42, 0.02, M.navy3, CX, MESA_Y - 0.28, z0 + 0.05));
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
{
  OF.add(escritorio(DESK_S.x0, DESK_S.x1, DESK_S.z0, DESK_S.z1));
  monitor = new THREE.Group(); monitor.position.set(MON.x, MESA_Y, MON.z); monitor.rotation.y = MON.ry; OF.add(monitor);
  monitor.add(caja(0.08, 0.26, 0.08, M.navy, 0, 0.13, -0.05)); monitor.add(caja(0.28, 0.02, 0.2, M.navy, 0, 0.01, -0.03));
  monitor.add(caja(MON.W + 0.05, MON.H + 0.05, 0.045, M.navy, 0, 0.28 + MON.H / 2, 0, 0.018));
  const pm = new THREE.Mesh(new THREE.PlaneGeometry(MON.W, MON.H), new THREE.MeshBasicMaterial({ map: pantM, toneMapped: false })); pm.position.set(0, 0.28 + MON.H / 2, 0.024); monitor.add(pm);
  monitor.userData.centro = V3(0, 0.28 + MON.H / 2, 0.024);
  const tec = new THREE.Group(); tec.position.set(-0.12, MESA_Y, 1.12); tec.rotation.y = 0.25; OF.add(tec);
  tec.add(caja(0.42, 0.02, 0.14, M.navy3, 0, 0.01, 0, 0.008));
  for (let i = 0; i < 3; i++) for (let k = 0; k < 10; k++) tec.add(caja(0.028, 0.01, 0.028, M.cr2, -0.17 + k * 0.038, 0.024, -0.04 + i * 0.038, 0.004));
  // el celular de Silvana en altavoz, parado en un soporte (funda crema), la pantalla a la cámara
  telS = new THREE.Group(); telS.position.set(0.3, MESA_Y, 1.02); telS.rotation.y = -0.18; OF.add(telS);
  telS.add(caja(0.12, 0.012, 0.1, M.navy3, 0, 0.006, 0, 0.004)); telS.add(caja(0.1, 0.07, 0.012, M.navy3, 0, 0.04, -0.035, 0.004));
  const piv = new THREE.Group(); piv.position.set(0, 0.018, 0.0); piv.rotation.x = -0.42; telS.add(piv);
  const S = 1.35, W = 0.08 * S, H = 0.162 * S;
  piv.add(caja(W + 0.008, H + 0.008, 0.013, mat(0xe0dccb, 0.5), 0, H / 2, 0, 0.012));
  const sp = new THREE.Mesh(new THREE.PlaneGeometry(W - 0.004, H - 0.006), new THREE.MeshBasicMaterial({ map: pantS, toneMapped: false })); sp.position.set(0, H / 2, 0.0072); piv.add(sp);
  telS.userData = { piv, sp, centro: V3(0, H / 2, 0.0072), H, W };
  // portalápices y planta chica
  const pl = new THREE.Group(); pl.position.set(0.6, MESA_Y, 0.92); OF.add(pl);
  pl.add(mesh(new THREE.CylinderGeometry(0.035, 0.03, 0.1, 16), M.navy3, 0, 0.05, 0));
  for (const [dx, c] of [[-0.01, M.g], [0.012, M.cr], [0.0, M.red]]) { const l = mesh(new THREE.CylinderGeometry(0.004, 0.004, 0.15, 6), c, dx, 0.1, 0.005); l.rotation.z = dx * 8; pl.add(l); }
  const mac = new THREE.Group(); mac.position.set(-0.6, MESA_Y, 1.35); OF.add(mac);
  mac.add(mesh(new THREE.CylinderGeometry(0.05, 0.04, 0.09, 16), M.cr2, 0, 0.045, 0));
  for (let i = 0; i < 6; i++) { const h = mesh(new THREE.SphereGeometry(0.035, 10, 8), M.hoja, Math.cos(i) * 0.03, 0.11 + (i % 3) * 0.02, Math.sin(i * 1.7) * 0.03); h.scale.set(1, 1.6, 0.6); h.rotation.z = (i - 3) * 0.3; mac.add(h); }
  sombras(OF);
}
// ---- los escritorios de Diego (post-its en el panelito del frente, la llave MALVÍN, la notebook, la taza) y de Romina
// (la agenda de papel tachada, la lapicera) ----
const postT = (txt, k) => lienzo(256, 256, (x, w, h) => { x.fillStyle = "#f3e9b8"; x.fillRect(0, 0, w, h); x.fillStyle = "#e6dba6"; x.fillRect(0, 0, w, 22); x.fillStyle = "#16243d"; x.textAlign = "center"; x.textBaseline = "middle"; const l = txt.split("|"); l.forEach((s, i) => { x.font = CAV(l.length > 1 ? 78 : 86); let px = l.length > 1 ? 78 : 86; while (x.measureText(s).width > w - 20 && px > 30) { px -= 4; x.font = CAV(px); } const y = h / 2 + 12 + (i - (l.length - 1) / 2) * 76; x.fillText(s, w / 2, y); if (s.includes("¿")) { x.fillStyle = "#c7655b"; } }); void k; });
let llaveMalvin, sillaD, sillaR;
{
  for (const [P, nombre] of [[DIE, "D"], [ROM, "R"]]) {
    const z0 = P.z - 0.95, z1 = P.z - 0.3;
    OF.add(escritorio(P.x - 0.46, P.x + 0.46, z0, z1));
    const s = silla(); s.position.set(P.x, 0, P.z + 0.02); s.rotation.y = Math.PI; OF.add(s);
    if (nombre === "D") sillaD = s; else sillaR = s;
  }
  // Diego: el panelito navy del frente de su escritorio, tapado de post-its crema con letra Caveat
  const pan = new THREE.Group(); pan.position.set(DIE.x, MESA_Y, DIE.z - 0.93); OF.add(pan);
  pan.add(caja(0.72, 0.36, 0.025, M.navy3, 0.07, 0.18, 0, 0.01));
  const PS = [["Pocitos|¿6?", -0.2, 0.22, 0.08], ["llamar a la|de Malvín", 0.0, 0.24, -0.06], ["visita|¿jueves?", 0.2, 0.21, 0.05], ["Martín ¿?", 0.36, 0.24, -0.1], ["Pocitos|¿llave?", -0.12, 0.08, -0.04], ["¿?", 0.26, 0.08, 0.12]];
  for (const [tx, x, y, r] of PS) { const p = new THREE.Mesh(new THREE.PlaneGeometry(0.11, 0.11), new THREE.MeshStandardMaterial({ map: postT(tx), roughness: 0.85 })); p.position.set(x, y, -0.016); p.rotation.set(0, Math.PI, r); pan.add(p); }
  // la notebook de Diego (abierta hacia él) y la taza navy
  const nb = new THREE.Group(); nb.position.set(DIE.x + 0.22, MESA_Y, DIE.z - 0.62); nb.rotation.y = Math.PI - 0.3; OF.add(nb);
  nb.add(caja(0.32, 0.015, 0.22, M.gris, 0, 0.008, 0, 0.006)); const tapa = caja(0.32, 0.22, 0.012, M.gris, 0, 0.11, -0.115, 0.006); tapa.rotation.x = -0.25; nb.add(tapa);
  const taza = new THREE.Group(); taza.position.set(DIE.x + 0.36, MESA_Y, DIE.z - 0.45); OF.add(taza);
  taza.add(mesh(new THREE.CylinderGeometry(0.04, 0.035, 0.1, 18), M.navy3, 0, 0.05, 0)); const asa = mesh(new THREE.TorusGeometry(0.025, 0.008, 8, 14), M.navy3, 0.045, 0.055, 0); taza.add(asa);
  // LA LLAVE "MALVÍN" en el escritorio de Diego (plantada desde P3), la etiqueta de frente a la cámara
  const taza2 = new THREE.Group(); taza2.position.set(DIE.x - 0.32, MESA_Y, DIE.z - 0.78); OF.add(taza2);
  taza2.add(mesh(new THREE.CylinderGeometry(0.045, 0.04, 0.11, 18), M.navy3, 0, 0.055, 0)); taza2.add(mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.005, 18), mat(0x4a2e1c, 0.4), 0, 0.106, 0));
  llaveMalvin = crearLlave("MALVÍN", 0.07); llaveMalvin.position.set(DIE.x - 0.32, MESA_Y + 0.112, DIE.z - 0.828); llaveMalvin.rotation.set(-0.12, Math.PI + 0.5, 0.0); OF.add(llaveMalvin);
  // Romina: la agenda de papel abierta, tachada, y la lapicera
  const agT = lienzo(800, 520, (x, w, h) => {
    x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h); x.fillStyle = "#d9d7c9"; x.fillRect(w / 2 - 6, 0, 12, h);
    x.strokeStyle = "#b9cde0"; x.lineWidth = 3; for (let y = 70; y < h; y += 54) { x.beginPath(); x.moveTo(20, y); x.lineTo(w - 20, y); x.stroke(); }
    x.fillStyle = "#16243d"; x.textAlign = "left"; x.textBaseline = "alphabetic";
    const L = ["mar 10 Pocitos", "mié 18 Pocitos", "jue 12 ¿Pocitos?", "vie 17:30 ?"]; L.forEach((s, i) => { x.font = CAV(52); x.fillText(s, 34, 108 + i * 108); x.strokeStyle = "#16243d"; x.lineWidth = 7; x.beginPath(); x.moveTo(28, 92 + i * 108); x.lineTo(34 + x.measureText(s).width + 10, 90 + i * 108 + (i % 2 ? 6 : -4)); x.stroke(); });
    x.font = CAV(56); x.fillText("¡llamar a", 430, 140); x.fillText("Graciela!", 440, 200); x.strokeStyle = "#16243d"; x.lineWidth = 6; x.beginPath(); x.moveTo(430, 260); x.lineTo(560, 360); x.lineTo(540, 330); x.moveTo(560, 360); x.lineTo(525, 362); x.stroke();
  });
  const ag = plano(0.42, 0.273, agT, ROM.x + 0.05, MESA_Y + 0.006, ROM.z - 0.66); ag.rotation.set(-Math.PI / 2, 0, Math.PI); OF.add(ag);
  const lap = mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.15, 8), M.navy, ROM.x - 0.3, MESA_Y + 0.008, ROM.z - 0.6); lap.rotation.set(Math.PI / 2, 0, 0.8); OF.add(lap);
  sombras(OF);
}
OF.traverse((o) => { if (o.isMesh && (o.material === M.vidrio || o.material.transparent)) { o.castShadow = false; } });
// ---- luces de la oficina: tarde pareja, ventanal claro, sin sol directo ----
const solOf = new THREE.DirectionalLight(0xfff6ea, 1.5);
solOf.castShadow = true; solOf.shadow.mapSize.set(2048, 2048); solOf.shadow.bias = -0.0008; solOf.shadow.radius = 3;
Object.assign(solOf.shadow.camera, { left: -3.5, right: 3.5, top: 3.5, bottom: -3.5, near: 0.5, far: 20 });
solOf.position.set(1.2, 4.5, 7.5); solOf.target.position.set(0, 0.8, 1.5); scene.add(solOf, solOf.target);
const cieloOf = new THREE.HemisphereLight(0xf7f4ec, 0x4a4e5a, 2.0); scene.add(cieloOf);
const rellenoOf = new THREE.DirectionalLight(0xe8eefa, 0.7); rellenoOf.position.set(-3, 2.5, 3); rellenoOf.target.position.set(0, 1, 1); scene.add(rellenoOf, rellenoOf.target);

// =====================================================================================================
// POCITOS (x = BX): el edificio de Graciela con el balcón (piso del balcón y = 0, la fachada en z = 0 mirando a +z, el
// río hacia +z), el apartamento vacío detrás de la fachada (living con parquet en espiga, la puerta de entrada al
// pasillo), la calle abajo (y = -8,4), la rambla y el río; edificios low-poly a los costados
// =====================================================================================================
const BX = 60;
const PO = new THREE.Group(); PO.position.x = BX; scene.add(PO);
const PUERTA_B = { x0: 0.25, x1: 1.35, alto: 2.2 };            // la puerta-ventana del balcón (en la fachada)
const BAL = { x0: -1.9, x1: 1.9, z1: 1.5 };
const CALLE_Y = -8.4;
let cartelVende, franjaVendido, llaveBalcon, puertaEnt, living;
const ventanasT = (base, ven, cols, filas) => { const t = lienzo(512, 512, (x, w, h) => { x.fillStyle = base; x.fillRect(0, 0, w, h); x.fillStyle = ven; const cw = w / cols, rh = h / filas; for (let i = 0; i < cols; i++) for (let j = 0; j < filas; j++) x.fillRect(i * cw + cw * 0.18, j * rh + rh * 0.22, cw * 0.64, rh * 0.5); x.fillStyle = "rgba(0,0,0,0.06)"; for (let j = 0; j < filas; j++) x.fillRect(0, j * rh + rh * 0.86, w, rh * 0.08); }); t.wrapS = t.wrapT = THREE.RepeatWrapping; return t; };
{
  // la fachada de Graciela (crema) en 4 paños alrededor de la puerta-ventana
  const fm = new THREE.MeshStandardMaterial({ color: 0xefeee5, roughness: 0.9 });
  const pano = (x0, x1, y0, y1) => { const p = mesh(new THREE.PlaneGeometry(x1 - x0, y1 - y0), fm, (x0 + x1) / 2, (y0 + y1) / 2, 0); p.castShadow = false; PO.add(p); };
  pano(-7, PUERTA_B.x0, -0.2, 2.9); pano(PUERTA_B.x1, 7, -0.2, 2.9); pano(PUERTA_B.x0, PUERTA_B.x1, PUERTA_B.alto, 2.9);
  // los otros pisos con ventanas (arriba y abajo del balcón)
  const vt = ventanasT("#efeee5", "#3a5578", 4, 3); vt.repeat.set(3, 2);
  const arriba = mesh(new THREE.PlaneGeometry(14, 12), new THREE.MeshStandardMaterial({ map: vt, roughness: 0.9 }), 0, 2.9 + 6, 0); arriba.castShadow = false; PO.add(arriba);
  const vt2 = vt.clone(); vt2.needsUpdate = true; vt2.repeat.set(3, 1.4);
  const abajo = mesh(new THREE.PlaneGeometry(14, 8.4), new THREE.MeshStandardMaterial({ map: vt2, roughness: 0.9 }), 0, -0.2 - 4.1, 0); abajo.castShadow = false; PO.add(abajo);
  // los balcones de los otros pisos (losa y baranda), sin gente
  const losa = (y, x0, x1) => { PO.add(caja(x1 - x0, 0.16, BAL.z1, M.cr2, (x0 + x1) / 2, y - 0.08, BAL.z1 / 2, 0.01)); PO.add(caja(x1 - x0, 0.05, 0.05, M.navy3, (x0 + x1) / 2, y + 1.0, BAL.z1 - 0.03)); for (let x = x0 + 0.05; x <= x1; x += 0.32) PO.add(caja(0.03, 1.0, 0.03, M.navy3, x, y + 0.5, BAL.z1 - 0.03)); };
  for (const y of [-2.9, 2.9, 5.8, 8.7]) losa(y, BAL.x0, BAL.x1);
  // EL BALCÓN: losa crema clara, baranda de caño navy (adelante y a los costados)
  PO.add(caja(BAL.x1 - BAL.x0, 0.16, BAL.z1, mat(0xdcd8c8, 0.85), 0, -0.08, BAL.z1 / 2, 0.01));
  const cano = (x0, y0, z0, x1, y1, z1, r = 0.024) => { const a = V3(x0, y0, z0), b = V3(x1, y1, z1), L = a.distanceTo(b); const c = mesh(new THREE.CylinderGeometry(r, r, L, 10), M.navy3, (x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2); c.quaternion.setFromUnitVectors(V3(0, 1, 0), b.clone().sub(a).normalize()); PO.add(c); };
  const ZB = BAL.z1 - 0.04;
  cano(BAL.x0, 1.0, ZB, BAL.x1, 1.0, ZB, 0.03); cano(BAL.x0, 0.5, ZB, BAL.x1, 0.5, ZB, 0.018);
  for (const x of [BAL.x0 + 0.03, BAL.x1 - 0.03]) { cano(x, 1.0, 0.02, x, 1.0, ZB, 0.03); cano(x, 0.5, 0.02, x, 0.5, ZB, 0.018); }
  for (let x = BAL.x0 + 0.03; x <= BAL.x1; x += 0.38) cano(x, 0, ZB, x, 1.0, ZB, 0.018);
  for (const x of [BAL.x0 + 0.03, BAL.x1 - 0.03]) for (let z = 0.4; z < ZB; z += 0.4) cano(x, 0, z, x, 1.0, z, 0.018);
  // la puerta-ventana: marco navy3, dos hojas de vidrio; la hoja izquierda tiene la cerradura (con la llave POCITOS)
  const PW = PUERTA_B.x1 - PUERTA_B.x0, PC = (PUERTA_B.x0 + PUERTA_B.x1) / 2;
  for (const x of [PUERTA_B.x0, PC, PUERTA_B.x1]) PO.add(caja(0.07, PUERTA_B.alto, 0.09, M.navy3, x, PUERTA_B.alto / 2, 0.02));
  PO.add(caja(PW + 0.07, 0.08, 0.09, M.navy3, PC, PUERTA_B.alto, 0.02)); PO.add(caja(PW + 0.07, 0.06, 0.1, M.navy3, PC, 0.03, 0.02));
  for (const x of [(PUERTA_B.x0 + PC) / 2, (PC + PUERTA_B.x1) / 2]) { const v = new THREE.Mesh(new THREE.PlaneGeometry(PW / 2 - 0.07, PUERTA_B.alto - 0.1), new THREE.MeshBasicMaterial({ color: 0xbcd0de, transparent: true, opacity: 0.32, depthWrite: false })); v.position.set(x, PUERTA_B.alto / 2, 0.02); PO.add(v); }
  // la cerradura con la llave colgando (péndulo)
  PO.add(caja(0.05, 0.12, 0.03, M.navy, PC - 0.07, 1.02, 0.075, 0.008));
  PO.add(mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.02, 12).rotateX(Math.PI / 2), M.gris, PC - 0.07, 1.0, 0.095));
  llaveBalcon = crearLlave("POCITOS", 0.075); llaveBalcon.position.set(PC - 0.07, 1.0, 0.11); PO.add(llaveBalcon);
  // la maceta con una planta en el balcón (la que riega Graciela)
  const mac = new THREE.Group(); mac.position.set(1.55, 0, 0.42); PO.add(mac);
  mac.add(mesh(new THREE.CylinderGeometry(0.17, 0.13, 0.3, 18), mat(0xb5653d, 0.8), 0, 0.15, 0));
  for (let i = 0; i < 9; i++) { const h = mesh(new THREE.SphereGeometry(0.1, 10, 8), M.hoja, Math.cos(i * 1.3) * 0.09, 0.36 + (i % 3) * 0.07, Math.sin(i * 2.1) * 0.08); h.scale.set(1, 1.5, 0.7); h.rotation.z = (i - 4) * 0.25; mac.add(h); }
  // EL CARTEL VENDE (crema, atado con alambre a la baranda de adelante, mirando al río)
  cartelVende = new THREE.Group(); cartelVende.position.set(-0.12, 0.6, BAL.z1 + 0.01); PO.add(cartelVende);
  const vT = lienzo(800, 500, (x, w, h) => { x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h); x.strokeStyle = "#16243d"; x.lineWidth = 26; x.strokeRect(13, 13, w - 26, h - 26); x.fillStyle = "#16243d"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "VENDE", 900, 260, w - 120); x.fillText("VENDE", w / 2, h * 0.42); x.fillStyle = "#16243d"; ajustar(x, "SILVANA PROPIEDADES", 800, 56, w - 160); x.fillText("SILVANA PROPIEDADES", w / 2, h * 0.8); });
  cartelVende.add(caja(0.82, 0.52, 0.02, M.cr, 0, 0, -0.012, 0.008));
  cartelVende.add(plano(0.8, 0.5, vT, 0, 0, 0.0));
  for (const [x, y] of [[-0.36, 0.22], [0.36, 0.22], [-0.36, -0.22], [0.36, -0.22]]) cartelVende.add(mesh(new THREE.TorusGeometry(0.018, 0.004, 6, 12), M.gris, x, y, -0.01));
  // la franja VENDIDO (verde de marca, Lexend 900 navy) que cae en diagonal en Q4
  const fT = lienzo(1000, 200, (x, w, h) => { x.fillStyle = "#5ce611"; x.fillRect(0, 0, w, h); x.strokeStyle = "#0b1220"; x.lineWidth = 14; x.strokeRect(7, 7, w - 14, h - 14); x.fillStyle = "#0b1220"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "VENDIDO", 900, 150, w - 80); x.fillText("VENDIDO", w / 2, h / 2 + 6); });
  franjaVendido = plano(0.95, 0.19, fT, 0, 0, 0.012, true); franjaVendido.rotation.z = 0.32; cartelVende.add(franjaVendido);
  // la calle, la rambla y el río (abajo); el cielo es el fondo
  const suelo = (w, d, color, x, y, z) => { const p = mesh(new THREE.PlaneGeometry(w, d), mat(color, 0.95), x, y, z); p.rotation.x = -Math.PI / 2; p.castShadow = false; PO.add(p); };
  suelo(120, 4, 0xd9d7c9, 0, CALLE_Y, 2); suelo(120, 8, 0x8b9099, 0, CALLE_Y - 0.01, 8); suelo(120, 4, 0xe6e2d2, 0, CALLE_Y, 14);
  PO.add(caja(120, 0.6, 0.3, M.cr2, 0, CALLE_Y + 0.3, 16.1, 0.02));
  suelo(260, 160, 0x16243d, 0, CALLE_Y - 1.2, 96);
  for (let x = -54; x <= 54; x += 6) PO.add(caja(0.12, 0.12, 6, mat(0xefeee5, 0.9), x, CALLE_Y + 0.0, 8, 0.01));
  // los edificios de la rambla (bloques crema y cr2 con ventanas), a los dos lados, y la curva de la bahía a lo lejos
  semilla = 11;
  const edif = (x, ancho, alto, z, color) => { const vtE = ventanasT(color, "#3a5578", Math.max(2, Math.round(ancho / 2.4)), Math.max(3, Math.round(alto / 3))); const b = mesh(new THREE.BoxGeometry(ancho, alto, 10), new THREE.MeshStandardMaterial({ map: vtE, roughness: 0.9 }), x, CALLE_Y + alto / 2, z - 5); b.castShadow = false; PO.add(b); };
  for (const [x, an, al, z, c] of [[-10.5, 7, 34, -0.6, "#d9d7c9"], [-18, 8, 26, -0.2, "#efeee5"], [-26, 7, 38, -0.8, "#e4e0d0"], [-34, 8, 22, 0, "#d9d7c9"], [-42, 7, 30, -0.5, "#efeee5"], [10.5, 7, 30, -0.4, "#e4e0d0"], [18, 8, 36, -0.8, "#d9d7c9"], [26, 7, 24, 0, "#efeee5"], [34, 8, 32, -0.4, "#d9d7c9"]]) edif(x, an, al, z, c);
  for (let i = 0; i < 18; i++) { const a = -0.9 + i * 0.1, R = 70; const x = Math.sin(a) * R - 40, z = 60 - Math.cos(a) * R + 30; const al = 14 + az() * 20; const b = mesh(new THREE.BoxGeometry(6, al, 6), mat(i % 2 ? 0xe4e0d0 : 0xd2cfbf, 0.9), x, CALLE_Y + al / 2, z); b.rotation.y = a; b.castShadow = false; PO.add(b); }
}
// ---- EL APARTAMENTO VACÍO (detrás de la fachada): living con parquet en espiga miel, paredes crema, la puerta de
// entrada abierta al pasillo del edificio ----
const LIV = { x0: -2.4, x1: 2.4, z0: -4.6, alto: 2.6 };
const PUERTA_E = { x0: -1.35, x1: -0.45 };
{
  living = new THREE.Group(); PO.add(living);
  const parquetT = lienzo(512, 512, (x, w, h) => {
    x.fillStyle = "#b8874f"; x.fillRect(0, 0, w, h);
    const L = 128, A = 32;
    x.strokeStyle = "#9a6d3c"; x.lineWidth = 3;
    for (let i = -8; i < 16; i++) for (let j = -8; j < 16; j++) {
      const ox = i * A * 2 + j * A, oy = j * A - i * 0;
      x.save(); x.translate(ox, oy + i * A * 2); x.rotate(Math.PI / 4); x.fillStyle = (i + j) % 3 ? "#b8874f" : "#c0905a"; x.fillRect(0, 0, L * 0.7, A * 0.7); x.strokeRect(0, 0, L * 0.7, A * 0.7); x.restore();
      x.save(); x.translate(ox + A * 0.5, oy + i * A * 2 + A * 0.5); x.rotate(-Math.PI / 4); x.fillStyle = (i + j) % 2 ? "#b28149" : "#bd8c54"; x.fillRect(0, 0, L * 0.7, A * 0.7); x.strokeRect(0, 0, L * 0.7, A * 0.7); x.restore();
    }
  });
  parquetT.wrapS = parquetT.wrapT = THREE.RepeatWrapping; parquetT.repeat.set(4, 4);
  const LW = LIV.x1 - LIV.x0, LD = -LIV.z0;
  const p = mesh(new THREE.PlaneGeometry(LW, LD), new THREE.MeshStandardMaterial({ map: parquetT, roughness: 0.6 }), 0, 0.001, LIV.z0 / 2); p.rotation.x = -Math.PI / 2; p.castShadow = false; living.add(p);
  living.add(cajaS(LW, 0.1, LD, mat(0xf2f0e8, 0.95), 0, LIV.alto + 0.05, LIV.z0 / 2));
  const pm = mat(0xefeee5, 0.92);
  for (const x of [LIV.x0, LIV.x1]) living.add(cajaS(0.12, LIV.alto, LD, pm, x, LIV.alto / 2, LIV.z0 / 2));
  // la pared del fondo con la puerta de entrada abierta
  const tramo = (a, b, y0, y1) => living.add(cajaS(b - a, y1 - y0, 0.14, pm, (a + b) / 2, (y0 + y1) / 2, LIV.z0));
  tramo(LIV.x0, PUERTA_E.x0, 0, LIV.alto); tramo(PUERTA_E.x1, LIV.x1, 0, LIV.alto); tramo(PUERTA_E.x0, PUERTA_E.x1, 2.1, LIV.alto);
  for (const x of [PUERTA_E.x0, PUERTA_E.x1]) living.add(caja(0.06, 2.1, 0.18, M.navy3, x, 1.05, LIV.z0));
  living.add(caja(PUERTA_E.x1 - PUERTA_E.x0 + 0.1, 0.06, 0.18, M.navy3, (PUERTA_E.x0 + PUERTA_E.x1) / 2, 2.12, LIV.z0));
  puertaEnt = new THREE.Group(); puertaEnt.position.set(PUERTA_E.x0 + 0.03, 0, LIV.z0 - 0.02); living.add(puertaEnt);
  puertaEnt.add(caja(PUERTA_E.x1 - PUERTA_E.x0 - 0.06, 2.06, 0.05, mat(0x8a5a32, 0.6), (PUERTA_E.x1 - PUERTA_E.x0 - 0.06) / 2, 1.03, 0, 0.01));
  puertaEnt.add(caja(0.12, 0.03, 0.04, M.gris, PUERTA_E.x1 - PUERTA_E.x0 - 0.16, 1.0, 0.04, 0.008));
  puertaEnt.rotation.y = 1.45;
  // el pasillo del edificio (cr2, más oscuro), detrás de la puerta
  const pa = mesh(new THREE.PlaneGeometry(4, 6), mat(0xc9c3b0, 0.9), -0.9, 0.0, LIV.z0 - 3.1); pa.rotation.x = -Math.PI / 2; pa.castShadow = false; living.add(pa);
  living.add(cajaS(0.1, 2.6, 6, mat(0xd9d7c9, 0.9), -2.0, 1.3, LIV.z0 - 3.1)); living.add(cajaS(0.1, 2.6, 6, mat(0xd9d7c9, 0.9), 0.2, 1.3, LIV.z0 - 3.1));
  living.add(cajaS(2.4, 2.6, 0.1, mat(0xcfc9b6, 0.9), -0.9, 1.3, LIV.z0 - 6.0)); living.add(cajaS(2.4, 0.1, 6, mat(0xe8e6dc, 0.9), -0.9, 2.6, LIV.z0 - 3.1));
  // un zócalo navy y el marco del ventanal visto de adentro
  living.add(caja(LW, 0.1, 0.02, M.navy3, 0, 0.05, LIV.z0 + 0.08));
  sombras(living);
}
// ---- luces de Pocitos: el sol de tarde (con sombra) y el cielo; adentro del living, una luz del ventanal ----
const solPo = new THREE.DirectionalLight(0xfff1dc, 2.0);
solPo.castShadow = true; solPo.shadow.mapSize.set(2048, 2048); solPo.shadow.bias = -0.0008; solPo.shadow.radius = 2;
Object.assign(solPo.shadow.camera, { left: -4, right: 4, top: 4, bottom: -4, near: 1, far: 30 });
solPo.position.set(BX + 5, 7, 8); solPo.target.position.set(BX, 0.5, 0.5); scene.add(solPo, solPo.target);
const cieloPo = new THREE.HemisphereLight(0xeef3f6, 0x7a7466, 1.9); scene.add(cieloPo);
const luzLiv = new THREE.DirectionalLight(0xfff4e6, 1.3); luzLiv.position.set(BX + 0.8, 2.6, 3); luzLiv.target.position.set(BX - 0.6, 0.6, -3.4); luzLiv.castShadow = true; luzLiv.shadow.mapSize.set(1024, 1024); Object.assign(luzLiv.shadow.camera, { left: -3, right: 3, top: 3, bottom: -3, near: 0.5, far: 12 }); scene.add(luzLiv, luzLiv.target);

// =====================================================================================================
// LOS PERSONAJES
// =====================================================================================================
const silvana = crearPersonaje({ ...DEFECTO, nombre: "Silvana", mejillasBajas: true, piel: PIEL.clara, pelo: 0xc9c2b4, peinado: "melena", cejasColor: 0x8a7f72, cejaFina: true, pestanas: 0x1a1414, cuelloFino: true,
  camisa: C.cr, mangas: "largas", cuello: C.cr, cuelloBotones: false, campera: { color: C.navy3, cuello: C.navy3, cierre: C.navy2, abierta: true },
  pantalon: C.navy, zapatos: C.navy2, aros: C.g, labiosPegados: true, labios: 0xb5555a, mejillas: 0xe8968a, panza: 1.02, nariz: 0.05, alto: 0.98, dedos: true, parpadeoCada: 999, parpadeosExtra: [] });
const diego = crearPersonaje({ ...DEFECTO, nombre: "Diego", mejillasBajas: true, piel: PIEL.clara, pelo: PELO.castaño, peinado: "jopo", jopoAlto: 0.7, barba: 0x4a3222, barbaLarga: 0.4, barbaOpacidad: 0.6, cejasColor: 0x4a3222,
  camisa: 0xf7f7f2, mangas: "largas", cuello: 0xf7f7f2, cuelloBotones: false, campera: { color: C.navy2, cuello: C.navy2, cierre: C.navy3, abierta: true },
  pantalon: 0x3a3f4a, zapatos: 0x3b2a20, panza: 0.98, nariz: 0.056, mejillas: 0xe39282, alto: 1.03, dedos: true, parpadeoCada: 999, parpadeosExtra: [] });
const romina = crearPersonaje({ ...DEFECTO, nombre: "Romina", mejillasBajas: true, piel: PIEL.trigueña, pelo: 0x3a2418, peinado: "coletaAlta", cejasColor: 0x2a1e18, cejaFina: true, pestanas: 0x1a1414, cuelloFino: true,
  camisa: C.navy3, mangas: "largas", cuello: C.cr, cuelloBotones: false, cuelloAlto: 0.06, pantalon: C.cr2, zapatos: C.navy, aros: C.cr, labiosPegados: true, labios: 0x9a4a4a, mejillas: 0xc9785e,
  panza: 0.96, nariz: 0.046, alto: 0.96, dedos: true, parpadeoCada: 999, parpadeosExtra: [] });
const graciela = crearPersonaje({ ...ELENCO.clienta, dedos: true, parpadeoCada: 999, parpadeosExtra: [] });
const ella = crearPersonaje({ ...DEFECTO, nombre: "Ana", piel: PIEL.clara, pelo: PELO.rubio, peinado: "coleta", camisa: C.cr, mangas: "largas", campera: { color: C.cr, cuello: C.cr2, cierre: C.cr3, abierta: false }, pantalon: C.navy2, zapatos: C.cr, alto: 0.96, parpadeoCada: 999 });
const el = crearPersonaje({ ...DEFECTO, nombre: "Martín", piel: PIEL.media, pelo: PELO.negro, peinado: "corto", camisa: C.navy3, mangas: "largas", pantalon: 0x3a3f4a, zapatos: 0x2a2220, alto: 1.03, parpadeoCada: 999 });
// la cartera crema de Graciela (al hombro izquierdo, colgando a la altura de la cadera)
{
  const g = new THREE.Group(); g.position.set(0.31, 0.02, -0.02); graciela.cuerpo.add(g);
  g.add(caja(0.08, 0.2, 0.26, mat(0xe6dfc8, 0.6), 0, 0, 0, 0.03)); g.add(caja(0.085, 0.05, 0.27, mat(0xcfc6aa, 0.6), 0, 0.07, 0, 0.012));
  g.add(caja(0.09, 0.02, 0.03, M.gris, 0, 0.04, 0.0, 0.006));
  const L = 0.5, tira = mesh(new THREE.CylinderGeometry(0.008, 0.008, L, 6), mat(0xcfc6aa, 0.6), -0.05, 0.1 + L / 2 - 0.02, 0.0); tira.rotation.z = 0.28; g.add(tira);
  sombras(g);
}
const TODOS = [silvana, diego, romina, graciela, ella, el];
for (const p of TODOS) { scene.add(p.raiz); p.raiz.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } }); }
// los celulares en la mano: el de Diego (funda navy2) y el de Graciela (funda verde oscuro); se ponen entre las manos y
// siempre con la pantalla hacia la cámara
const celD = crearCelular(pantD, C.navy2, 0.08 * 1.2, 0.162 * 1.2); scene.add(celD);
const celG = crearCelular(pantG, C.gd, 0.08 * 1.25, 0.162 * 1.25); scene.add(celG);

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
const celuS = new THREE.Group(); celuS.position.set(0.24, MESA_Y, 1.3); celuS.rotation.y = -0.25; OF.add(celuS);
{
  const S = 1.9, W = 0.08 * S, H = 0.165 * S;
  const piv = new THREE.Group(); piv.position.y = 0.035; piv.rotation.x = -0.18; celuS.add(piv);
  piv.add(mesh(rbox(W + 0.008, H + 0.008, 0.014, 0.014), mat(C.navy, 0.4), 0, H / 2, 0));
  const pan = new THREE.Mesh(new THREE.PlaneGeometry(W - 0.004, H - 0.006), new THREE.MeshBasicMaterial({ map: SOFI.rt.texture, toneMapped: false })); pan.position.set(0, H / 2, 0.0076); piv.add(pan);
  celuS.add(caja(0.17, 0.02, 0.13, M.g, 0, 0.01, 0.0, 0.008)); celuS.add(caja(0.14, 0.08, 0.02, M.g, 0, 0.05, -0.06, 0.006));
  celuS.userData = { piv, centro: V3(0, H / 2, 0.0076), H };
  sombras(celuS);
}

// ---- avatares: la cara del personaje 3D renderizada chica en un círculo (los celulares y la ficha) ----
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
  AVATAR.graciela = leer(graciela, 0xb9cde0); AVATAR.silvana = leer(silvana, 0xefeee5); AVATAR.diego = leer(diego, 0xb9cde0); AVATAR.romina = leer(romina, 0xefeee5);
  rt.dispose();
}
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

// ================= PANTALLAS =================
const cabCel = (x, w, t1, t2) => { x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 150); x.fillStyle = "#5ce611"; x.fillRect(0, 150, w, 8); x.fillStyle = "#efeee5"; x.textAlign = "left"; x.textBaseline = "middle"; ajustar(x, t1, 800, 50, w - 60); x.fillText(t1, 30, 56); x.fillStyle = "#5ce611"; ajustar(x, t2, 700, 38, w - 60); x.fillText(t2, 30, 112); };
function pantLlamada(x, w, h, cv, nombre, sub, seg, fin = false) {
  x.fillStyle = "#16243d"; x.fillRect(0, 0, w, h); x.textAlign = "center"; x.textBaseline = "middle";
  avatar(x, cv, w / 2, 330, 150);
  x.fillStyle = "#efeee5"; ajustar(x, nombre, 900, 66, w - 50); x.fillText(nombre, w / 2, 570);
  x.fillStyle = fin ? "#c7655b" : "#5ce611"; ajustar(x, sub, 800, 52, w - 50); x.fillText(sub, w / 2, 655);
  if (!fin) {
    // el altavoz prendido (verde) y el botón rojo de colgar
    x.fillStyle = "#5ce611"; x.beginPath(); x.arc(w / 2 - 120, 860, 70, 0, 7); x.fill(); parlante(x, w / 2 - 120, 860, 52);
    x.fillStyle = "#efeee5"; x.font = F(700, 36); x.fillText("altavoz", w / 2 - 120, 968);
    x.fillStyle = "#c7655b"; x.beginPath(); x.arc(w / 2 + 120, 860, 70, 0, 7); x.fill();
    x.strokeStyle = "#efeee5"; x.lineWidth = 18; x.lineCap = "round"; x.beginPath(); x.arc(w / 2 + 120, 880, 36, Math.PI * 1.15, Math.PI * 1.85); x.stroke();
    x.fillStyle = "#efeee5"; x.font = F(800, 46); x.fillText(`0:${String(Math.min(59, seg)).padStart(2, "0")}`, w / 2, 735);
  } else {
    x.fillStyle = "#c7655b"; x.beginPath(); x.roundRect(60, 780, w - 120, 150, 40); x.fill();
    x.fillStyle = "#efeee5"; ajustar(x, "Llamada finalizada", 900, 52, w - 160); x.fillText("Llamada finalizada", w / 2, 856);
  }
}
// ---- el monitor de Silvana: la planilla (parte 1) · la ficha de la propiedad (Q3) · tres semanas después (Q4, Q5) ----
let claveM = "";
function dibujarMonitor(t) {
  const modo = t < P2 ? "planilla" : t < T.q4 ? "ficha" : "despues";
  const nt = modo === "ficha" ? T.tildes.filter((a) => t >= a).length : 4;
  const res = modo === "despues" && t >= T.reserva ? 1 : 0, com = modo === "despues" ? cl((t - T.comision) / 0.3) : 0;
  const comK = Math.round(com * 6);
  const clave = `${modo}|${nt}|${res}|${comK}`; if (clave === claveM) return; claveM = clave;
  const { x } = pantM.userData, w = 1280, h = 800;
  x.textBaseline = "middle"; x.textAlign = "left";
  if (modo === "planilla") {
    // la planilla genérica de propiedades (sin ícono de ningún programa): la fila de Pocitos con "?" en las visitas
    x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h);
    x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 130); x.fillStyle = "#efeee5"; ajustar(x, "Propiedades en venta", 800, 74, w - 80); x.fillText("Propiedades en venta", 40, 68);
    const cols = [20, 560, 900, w - 20];
    x.fillStyle = "#1f3254"; x.fillRect(cols[0], 146, cols[3] - cols[0], 90);
    x.fillStyle = "#efeee5"; x.font = F(800, 56); ["Propiedad", "Precio", "Visitas"].forEach((c, i) => x.fillText(c, cols[i] + 22, 192));
    const filas = [["Buceo · 3 dorm.", "245.000", "2"], ["Pocitos · 2 dorm.", "180.000", "?"], ["Prado · 3 dorm.", "230.000", "1"]];
    let y = 236;
    filas.forEach(([n, p, v], i) => {
      const big = v === "?", hh = big ? 230 : 140;
      x.fillStyle = big ? "#f7f6f0" : i % 2 ? "#e2e0d4" : "#f7f6f0"; x.fillRect(cols[0], y, cols[3] - cols[0], hh);
      if (big) { x.strokeStyle = "#c7655b"; x.lineWidth = 10; x.strokeRect(cols[0] + 5, y + 5, cols[3] - cols[0] - 10, hh - 10); }
      x.fillStyle = "#0b1220"; x.font = F(big ? 900 : 700, big ? 66 : 54); x.fillText(n, cols[0] + 24, y + hh / 2);
      x.font = F(big ? 900 : 700, big ? 62 : 52); x.fillText(p, cols[1] + 24, y + hh / 2);
      x.fillStyle = big ? "#c7655b" : "#0b1220"; x.font = F(900, big ? 120 : 56); x.textAlign = "center"; x.fillText(v, (cols[2] + cols[3]) / 2, y + hh / 2 + 4); x.textAlign = "left";
      y += hh;
    });
    x.strokeStyle = "#1f3254"; x.lineWidth = 4; for (const c of cols) { x.beginPath(); x.moveTo(c, 146); x.lineTo(c, y); x.stroke(); }
  } else {
    // la ficha de la propiedad: encabezado navy, las visitas con su tilde, la llave, el resumen
    x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h);
    x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 150); x.fillStyle = "#5ce611"; x.fillRect(0, 150, w, 10);
    x.fillStyle = "#efeee5"; ajustar(x, "Pocitos · 2 dorm. · USD 180.000", 900, 64, w - 220); x.fillText("Pocitos · 2 dorm. · USD 180.000", 30, 54);
    x.fillStyle = "#5ce611"; ajustar(x, "Propietaria: Graciela", 800, 48, w - 220); x.fillText("Propietaria: Graciela", 30, 116);
    avatar(x, AVATAR.graciela, w - 90, 76, 58);
    if (modo === "ficha") {
      const filas = [[AVATAR.romina, "Mar 10:00", "Sergio y Lu", "alto"], [AVATAR.diego, "Mié 18:00", "Jorge", "bajo"], [AVATAR.romina, "Jue 12:00", "Paula", "medio"], [AVATAR.diego, "Vie 17:30", "Martín y Ana", "alto"]];
      filas.forEach(([cv, d, q, i2], k) => {
        const y = 180 + k * 112, ok = k < nt;
        x.fillStyle = ok ? "#ffffff" : "#e2e0d4"; x.beginPath(); x.roundRect(20, y, w - 40, 100, 20); x.fill();
        if (!ok) { x.globalAlpha = 0.35; }
        avatar(x, cv, 72, y + 50, 38);
        x.fillStyle = "#0b1220"; x.font = F(800, 52); x.fillText(d, 128, y + 52);
        x.font = F(800, 52); x.fillText(q, 420, y + 52);
        const cI = i2 === "alto" ? "#5ce611" : i2 === "medio" ? "#b9cde0" : "#d9d7c9";
        x.fillStyle = cI; x.beginPath(); x.roundRect(880, y + 18, 220, 64, 32); x.fill(); x.fillStyle = "#0b1220"; x.font = F(900, 46); x.textAlign = "center"; x.fillText(i2, 990, y + 51); x.textAlign = "left";
        x.globalAlpha = 1;
        if (ok) { x.fillStyle = "#16243d"; x.beginPath(); x.arc(1180, y + 50, 38, 0, 7); x.fill(); tilde(x, 1180, y + 52, 44, "#5ce611"); }
      });
      x.fillStyle = nt >= 4 ? "#5ce611" : "#16243d"; x.beginPath(); x.roundRect(20, 636, w - 40, 140, 30); x.fill();
      x.fillStyle = nt >= 4 ? "#0b1220" : "#efeee5"; x.textAlign = "center"; ajustar(x, "Visitas: 4 ✓ · Llave en el tablero ✓", 900, 64, w - 100); x.fillText("Visitas: 4 ✓ · Llave en el tablero ✓", w / 2, 706); x.textAlign = "left";
    } else {
      // tres semanas después: las cifras grandes, RESERVADO y la comisión que gira de rojo a verde
      const caja2 = (cx, cy, cw, ch, fondo, l1, l2, c1, c2, s2) => { x.fillStyle = fondo; x.beginPath(); x.roundRect(cx, cy, cw, ch, 30); x.fill(); x.textAlign = "center"; x.fillStyle = c1; x.font = F(800, 48); x.fillText(l1, cx + cw / 2, cy + 58); x.fillStyle = c2; x.font = F(900, s2); x.fillText(l2, cx + cw / 2, cy + ch - 78); x.textAlign = "left"; };
      caja2(20, 182, 610, 230, "#16243d", "Visitas", "11", "#efeee5", "#5ce611", 130);
      caja2(650, 182, 610, 230, "#16243d", "Segundas visitas", "3", "#efeee5", "#5ce611", 130);
      x.fillStyle = res ? "#5ce611" : "#d9d7c9"; x.beginPath(); x.roundRect(20, 432, w - 40, 160, 30); x.fill();
      x.fillStyle = "#0b1220"; x.textAlign = "center"; x.font = F(900, 104); x.fillText(res ? "RESERVADO ✓" : "En venta", w / 2, 516);
      // la comisión: rojo apagado → verde (gira sobre su eje horizontal)
      const k = comK / 6, esc = Math.abs(Math.cos(Math.PI * k)), verde = k >= 0.5;
      x.save(); x.translate(w / 2, 700); x.scale(1, Math.max(0.04, esc));
      x.fillStyle = verde ? "#5ce611" : "#c7655b"; x.beginPath(); x.roundRect(-(w - 40) / 2, -86, w - 40, 172, 30); x.fill();
      x.fillStyle = "#0b1220"; x.font = F(900, 92); x.fillText("USD 5.400 de comisión", 0, 6);
      x.restore(); x.textAlign = "left";
    }
  }
  pantM.needsUpdate = true;
}
// ---- el celular de Silvana en el soporte: en llamada con Graciela (altavoz) · "Llamada finalizada" ----
let claveS = "";
function dibujarTelS(t) {
  const fin = t >= T.cuelga && t < P2;
  const t0 = t < P2 ? 0 : T.g1b - 0.2, seg = Math.max(0, Math.floor(t - t0)) + (t < P2 ? 41 : 2);
  const clave = `${fin}|${seg}`; if (clave === claveS) return; claveS = clave;
  const { x } = pantS.userData;
  pantLlamada(x, 600, 1110, AVATAR.graciela, "Graciela · Pocitos", fin ? "" : "En llamada", seg, fin);
  pantS.needsUpdate = true;
}
// ---- el celular de Diego (Q1): la visita que se carga por renglones → Guardar → "Visita cargada ✓" ----
let claveD = "";
function dibujarCelD(t) {
  const nf = T.filasD.filter((a) => t >= a).length, ok = t >= T.guarda ? 1 : 0, toca = t >= T.guarda - 0.25 && !ok ? 1 : 0;
  const clave = `${nf}|${ok}|${toca}`; if (clave === claveD) return; claveD = clave;
  const { x } = pantD.userData, w = 600, h = 1110;
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h);
  cabCel(x, w, "Visitas · Pocitos, 2 dorm.", "Silvana Propiedades");
  const R = [
    () => { x.fillStyle = "#1f3254"; x.font = F(700, 40); x.fillText("Vie 17:30", 36, 210); x.fillStyle = "#0b1220"; ajustar(x, "Martín y Ana", 900, 58, w - 72); x.fillText("Martín y Ana", 36, 268); },
    () => { x.fillStyle = "#0b1220"; x.font = F(800, 44); x.fillText("Interés:", 36, 360); x.fillStyle = "#5ce611"; x.beginPath(); x.roundRect(230, 322, 200, 76, 38); x.fill(); x.fillStyle = "#0b1220"; x.font = F(900, 48); x.fillText("ALTO", 268, 362); },
    () => { x.fillStyle = "#1f3254"; x.font = F(700, 40); x.fillText("Dijeron:", 36, 450); x.fillStyle = "#0b1220"; ajustar(x, "«Muy luminoso»", 800, 46, w - 72); x.fillText("«Muy luminoso»", 36, 504); ajustar(x, "«¿Tiene cochera?»", 800, 46, w - 72); x.fillText("«¿Tiene cochera?»", 36, 558); },
    () => { x.fillStyle = "#1f3254"; x.font = F(700, 40); x.fillText("Segunda visita:", 36, 646); x.fillStyle = "#0b1220"; x.font = F(900, 50); x.fillText("martes 11:00", 36, 700); },
    () => { x.fillStyle = "#1f3254"; x.font = F(700, 40); x.fillText("Llave:", 36, 788); x.fillStyle = "#0b1220"; ajustar(x, "Diego → oficina 18:05 ✓", 800, 44, w - 72); x.fillText("Diego → oficina 18:05 ✓", 36, 842); },
  ];
  x.textAlign = "left"; x.textBaseline = "middle";
  for (let i = 0; i < nf; i++) { R[i](); x.fillStyle = "#d9d7c9"; x.fillRect(36, [300, 410, 600, 740, 885][i], w - 72, 4); }
  x.fillStyle = "#5ce611"; x.beginPath(); x.roundRect(40, 940, w - 80, 130, 65); x.fill();
  if (toca) { x.strokeStyle = "#0b1220"; x.lineWidth = 10; x.stroke(); }
  x.fillStyle = "#0b1220"; x.font = F(900, 64); x.textAlign = "center"; x.fillText("Guardar", w / 2, 1006);
  if (ok) {
    x.fillStyle = "rgba(11,18,32,0.55)"; x.fillRect(0, 158, w, h - 158);
    x.fillStyle = "#5ce611"; x.beginPath(); x.roundRect(40, 380, w - 80, 380, 40); x.fill();
    x.fillStyle = "#0b1220"; x.beginPath(); x.arc(w / 2, 500, 80, 0, 7); x.fill(); tilde(x, w / 2, 505, 92, "#5ce611");
    ajustar(x, "Visita cargada", 900, 66, w - 120); x.fillText("Visita cargada", w / 2, 660);
  }
  pantD.needsUpdate = true;
}
// ---- el celular de Graciela: en llamada con la inmobiliaria (P5, Q4b) · Q2: el resumen de la semana → Llamar ----
let claveG = "";
function dibujarCelG(t) {
  const modo = t < P2 ? "llamada" : t < T.vibra ? "inicio" : t < T.llamaG + 0.15 ? "resumen" : "llamada";
  const nf = modo === "resumen" ? T.filasG.filter((a) => t >= a).length : 0, toca = modo === "resumen" && t >= T.llamaG - 0.2 ? 1 : 0;
  const seg = modo === "llamada" ? (t < P2 ? 40 + Math.floor(t - T.p5) : Math.floor(t - T.llamaG)) : 0;
  const clave = `${modo}|${nf}|${toca}|${seg}`; if (clave === claveG) return; claveG = clave;
  const { x } = pantG.userData, w = 600, h = 1110;
  if (modo === "llamada") { pantLlamada(x, w, h, AVATAR.silvana, "Silvana Propiedades", "En llamada", Math.max(0, seg)); pantG.needsUpdate = true; return; }
  x.fillStyle = "#16243d"; x.fillRect(0, 0, w, h); x.textAlign = "center"; x.textBaseline = "middle";
  x.fillStyle = "#efeee5"; x.font = F(800, 120); x.fillText("18:00", w / 2, 190); x.font = F(700, 42); x.fillText("viernes", w / 2, 280);
  if (modo === "resumen") {
    x.fillStyle = "#efeee5"; x.beginPath(); x.roundRect(22, 330, w - 44, 760, 36); x.fill();
    x.textAlign = "left"; x.fillStyle = "#16243d"; x.beginPath(); x.roundRect(22, 330, w - 44, 120, [36, 36, 0, 0]); x.fill();
    x.fillStyle = "#efeee5"; ajustar(x, "Silvana Propiedades", 800, 46, w - 100); x.fillText("Silvana Propiedades", 50, 372); x.fillStyle = "#5ce611"; x.font = F(700, 34); x.fillText("Resumen de la semana", 50, 420);
    x.fillStyle = "#1f3254"; ajustar(x, "Tu apartamento de Pocitos:", 700, 40, w - 100); x.fillText("Tu apartamento de Pocitos:", 50, 492);
    const L = [["Visitas: 4", true, 62], ["Interés alto: 2", false, 52], ["«Muy luminoso» · «¿Tiene cochera?»", false, 38], ["Segunda visita: martes 11:00", true, 44]];
    for (let i = 0; i < nf; i++) {
      const [s, ok, px] = L[i], y = 570 + i * 92 + (i === 3 ? 6 : 0);
      x.fillStyle = "#0b1220"; ajustar(x, s, 900, px, ok ? w - 170 : w - 100); x.fillText(s, 50, y);
      if (ok) { x.fillStyle = "#5ce611"; x.beginPath(); x.arc(w - 82, y, 34, 0, 7); x.fill(); tilde(x, w - 82, y + 2, 38, "#0b1220"); }
    }
    x.fillStyle = "#5ce611"; x.beginPath(); x.roundRect(60, 960, w - 120, 106, 53); x.fill();
    if (toca) { x.strokeStyle = "#0b1220"; x.lineWidth = 10; x.stroke(); }
    x.fillStyle = "#0b1220"; x.font = F(900, 56); x.textAlign = "center"; x.fillText("Llamar", w / 2, 1015);
  }
  pantG.needsUpdate = true;
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

const CEL = { icono: "parlante", nombre: "Graciela · altavoz" };
const GL = {
  g1: crearGlobo(["¿Y? ¿Hubo [visitas?]"], 78, { cab: CEL }),
  s1: crearGlobo(["¿Hubo visitas en", "lo de [Graciela?]"], 74),
  d1: crearGlobo(["Un [montón.]"], 82),
  ro1: crearGlobo(["{Ninguna.}"], 82),
  s2: crearGlobo(["Me dicen que", "[varias,] Graciela."], 76),
  g2a: crearGlobo(["Qué raro."], 90),
  g2: crearGlobo(["La llave", "[la tengo yo.]"], 92),
  g3: crearGlobo(["Mañana paso a", "buscar [el cartel.]"], 80, { cab: CEL, minW: 700 }),
  d2: crearGlobo(["Ah. Era el", "de [Malvín.]"], 88),
  g1b: crearGlobo(["¿Y? ¿Hubo [visitas?]"], 78, { cab: CEL }),
  s3: crearGlobo(["[Cuatro.] Y el martes", "vuelve una pareja."], 70),
  g4: crearGlobo(["Ya sé. Llamaba", "para [chusmear.]"], 80, { cab: CEL, minW: 700 }),
  g5: crearGlobo(["Mañana paso a", "buscar [el cartel.]"], 80),
};
const ROT = [
  crearRotulo([["Apartamento de Graciela", null, 44], ["USD 180.000", null, 60]], 44),
  crearRotulo([["USD 5.400 de comisión", "#c7655b", 54]], 54),
  crearRotulo([["Visitas anotadas: 0", "#c7655b", 54]], 54),
];
const ROT_Q = [
  crearRotulo([["Cada visita, cargada", null, 50], ["en el momento", "#5ce611", 56]], 50),
  crearRotulo([["Resumen automático", null, 48], ["a la propietaria · cada viernes", "#5ce611", 46]], 46),
  crearRotulo([["La ficha de", null, 50], ["cada propiedad", "#5ce611", 58]], 50),
];
const GUIAS = [crearGuia(), crearGuia(), crearGuia()];

// ================= CÁMARA =================
// PLANOS: [nombre, desde, claves | null]; cada clave [t, px, py, pz, mx, my, mz, fov]. Entre planos, corte; dentro de un
// plano, Catmull-Rom continua. Los null se arman en renderAt.
const CAM_P1 = (k) => [lerp(0.22, 0.21, k), lerp(1.44, 1.43, k), lerp(2.5, 2.35, k), 0.17, 1.2, 0.1, 54];
const CAM_ATRAS = [0.5, 1.68, -0.42, -0.02, 0.92, 3.6, 43];
const BK = () => { llaveBalcon.updateMatrixWorld(true); return llaveBalcon.userData.et.getWorldPosition(new THREE.Vector3()); };
const PLANOS = [
  ["P1", 0, [[0, ...CAM_P1(0)], [T.p2, ...CAM_P1(1)]]],
  // P2: la cámara gira con Silvana (por su izquierda) hasta quedar detrás de su hombro
  ["P2", T.p2, [[T.p2, ...CAM_P1(1)], [r2(T.p2 + 0.55), 1.2, 1.45, 1.2, 0.0, 1.1, 0.3, 50], [r2(T.p3 - 0.35), 0.95, 1.62, -0.2, 0.0, 1.05, 1.5, 47], [T.p3, ...CAM_ATRAS]]],
  ["P3", T.p3, [[T.p3, ...CAM_ATRAS], [T.p4, CAM_ATRAS[0] - 0.02, CAM_ATRAS[1], CAM_ATRAS[2] + 0.12, ...CAM_ATRAS.slice(3, 6), 49]]],
  // P4: primer plano de Silvana de frente; destapa el celular
  ["P4", T.p4, [[T.p4, 0.2, 1.22, 1.95, 0.08, 1.06, 0.3, 42], [T.p5, 0.19, 1.21, 1.82, 0.08, 1.06, 0.3, 41]]],
  // P5: la grúa desde la rambla hasta el balcón (Graciela), y el push-in a la llave POCITOS en "La llave"
  ["P5", T.p5, null],
  // P6: la pausa: la oficina quieta, abierta (Silvana, el panel de fichas y el tablero de llaves)
  ["P6", T.p6, [[T.p6, -0.16, 1.42, 2.45, -0.16, 1.16, -0.6, 62], [T.p7, -0.16, 1.42, 2.4, -0.16, 1.16, -0.6, 62]]],
  ["P7", T.p7, null],   // el celular de Silvana de cerca
  // P8: Diego en su escritorio desde el pasillo; la llave MALVÍN en primer término
  ["P8", T.p8, [[T.p8, -0.32, 1.38, 1.6, 0.42, 1.0, 3.3, 46], [T.p8b, -0.29, 1.37, 1.7, 0.42, 0.99, 3.3, 45]]],
  ["P8b", T.p8b, [[T.p8b, 0.2, 1.24, 2.05, 0.06, 1.06, 0.3, 40], [P1, 0.19, 1.24, 1.95, 0.06, 1.06, 0.3, 39]]],
  // ---- parte 2 ----
  ["Q1", P2, null],     // el living de Pocitos: Diego y la pareja; push-in al celular de Diego
  ["Q2", T.q2, null],   // el balcón: el resumen en el celular de Graciela
  ["Q3", T.q3, [[T.q3, ...CAM_P1(0)], [T.mon, ...CAM_P1(0.4)]]],   // el encuadre del cuadro 0
  ["Q3m", T.mon, null], // push-in a la ficha del monitor
  ["Q3c", T.q3c, [[T.q3c, ...CAM_P1(0.3)], [T.q4, ...CAM_P1(0.7)]]],
  ["Q4", T.q4, null],   // la ficha tres semanas después
  ["Q4b", T.q4b, [[T.q4b, BX + 0.72, 1.36, 3.95, BX - 0.24, 0.98, 0.8, 48], [T.q5, BX + 0.7, 1.35, 3.8, BX - 0.24, 0.98, 0.8, 47]]],
  ["Q5", T.q5, null],   // el cierre: la ficha en verde y Sofi en el celular parado
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
// ---------- Silvana en su escritorio (sentada, mirando a +z) ----------
function poseSilvana(t) {
  const p2 = t >= P2;
  const pr = { x: SIL.x, y: -0.08, z: SIL.z, giro: 0, sentado: 1, inclina: 0.02, ...aC(0.12, 0.08), ...NADA, manoI: [0.2, 0.32, 0.36], codoI: [1, -0.6, -0.2], manoD: [-0.2, 0.32, 0.36], codoD: [-1, -0.6, -0.2], dedoI: 0, dedoD: 0, t };
  if (!p2) {
    // P1: segura, mirando el celular (a su izquierda, +x)
    Object.assign(pr, { ...CARA.neutra, ojos: { abiertos: 1, x: 0.3, y: -0.35, feliz: 0.05 }, cejas: { alto: 0.15, ang: 0.05 }, boca: { sonrisa: 0.15, abierta: 0, ancho: 1 } });
    pr.cabeza = { giro: 0.3, asiente: 0.12, ladea: 0.04 };
    if (t >= T.tapa - 0.25) {
      // P2-P3: tapa el celular con la palma (la mano izquierda arriba del celular, apoyada) y mira a los corredores
      const u = eio(sg(t, T.tapa - 0.25, T.tapa + 0.1)), un = 1 - eio(sg(t, T.destapa - 0.05, T.destapa + 0.3));
      pr.inclina = 0.02 + 0.1 * u * un;
      pr.tapa = u * un;
      const mira = eio(sg(t, T.tapa, T.tapa + 0.35));
      pr.cabeza = { giro: lerp(0.3, 0.0, mira), asiente: lerp(0.12, -0.05, mira), ladea: 0.02 }; pr.ojos = { abiertos: 1, x: 0, y: lerp(-0.35, 0.1, mira), feliz: 0 };
      if (t >= T.d1) {
        // la contradicción: mira a Diego (+x) y a Romina (-x), cara de nada
        const a = eio(sg(t, T.miraD - 0.1, T.miraD + 0.15)), b = eio(sg(t, T.miraR - 0.1, T.miraR + 0.15));
        const g = lerp(lerp(0, 0.28, a), -0.28, b);
        pr.cabeza = { giro: g, asiente: -0.05, ladea: 0 }; pr.ojos = { abiertos: 0.92, x: g * 0.9, y: 0.1, feliz: 0 };
        Object.assign(pr, { cejas: { alto: 0.2, ang: 0.0, asim: 0.7 }, boca: { sonrisa: -0.25, abierta: 0, ancho: 0.85 } });
      }
      if (t >= T.p4) {
        // P4: destapa y sonríe segura (forzada) al celular
        pr.cabeza = { giro: 0.22, asiente: 0.1, ladea: 0.05 }; pr.ojos = { abiertos: 0.95, x: 0.25, y: -0.3, feliz: 0.3 };
        Object.assign(pr, { cejas: { alto: 0.3, ang: 0.15 }, boca: { sonrisa: 0.7, abierta: 0, ancho: 1.1 } });
      }
    }
    bocaVoz(pr, t, T.s1, ENV.s1, 0.6); bocaVoz(pr, t, T.s2, ENV.s2, 0.6);
    if (t >= T.p6) {
      // la pausa: quieta, cara de nada, mirando el celular; P8b: cierra los ojos
      Object.assign(pr, { ...NADA, ojos: { abiertos: 0.85, x: 0.25, y: -0.3, tension: 0.1 }, boca: { sonrisa: -0.1, abierta: 0, ancho: 0.95 } });
      pr.cabeza = { giro: 0.22, asiente: 0.1, ladea: 0.02 };
      if (t >= T.p8b) { const c = eio(sg(t, T.p8b + 0.1, T.p8b + 0.3)); pr.ojos = { abiertos: lerp(0.85, 0.02, c), x: 0, y: -0.2 }; pr.cejas = { alto: 0.25, ang: 0.5 }; pr.boca = { sonrisa: -0.35, abierta: 0, ancho: 0.9 }; pr.cabeza = { giro: 0.05, asiente: 0.04, ladea: 0.0 }; pr.cierraHablando = true; }
    }
    return pr;
  }
  // parte 2: tranquila; "¿Y? ¿Hubo visitas?": va a tapar el celular, no pregunta, mira el monitor (a su derecha, -x)
  Object.assign(pr, { ...CARA.sonrisa, ojos: { abiertos: 1, x: 0.3, y: -0.35, feliz: 0.2 }, cejas: { alto: 0.2, ang: 0 }, boca: { sonrisa: 0.45, abierta: 0, ancho: 1.05 } });
  pr.cabeza = { giro: 0.3, asiente: 0.12, ladea: 0.04 };
  if (t >= T.q3) {
    const va = eio(sg(t, T.g1b + 0.6, T.g1b + 0.95)) * (1 - eio(sg(t, T.mon - 0.3, T.mon)));
    pr.tapa = 0.45 * va;
    const m = eio(sg(t, T.mon - 0.3, T.mon + 0.05));
    pr.cabeza = { giro: lerp(0.3, -0.42, m), asiente: 0.1, ladea: 0.02 }; pr.ojos = { abiertos: 1, x: lerp(0.3, -0.55, m), y: -0.2, feliz: 0.25 };
    if (t >= T.q3c) { pr.cabeza = { giro: 0.25, asiente: 0.08, ladea: 0.05 }; pr.ojos = { abiertos: 1, x: 0.3, y: -0.3, feliz: 0.45 }; pr.boca = { sonrisa: 0.75, abierta: 0, ancho: 1.1 }; }
  }
  bocaVoz(pr, t, T.s3, ENV.s3, 0.6);
  return pr;
}
// ---------- Diego y Romina en sus escritorios (sentados, mirando a -z) ----------
function poseCorredor(per, t) {
  const D = per === diego, P = D ? DIE : ROM;
  const pr = { x: P.x, y: -0.08, z: P.z, giro: Math.PI, sentado: 1, inclina: 0.06, ...aC(D ? 0.12 : -0.1, 0.25), ...NADA, manoI: [0.2, 0.32, 0.38], codoI: [1, -0.6, -0.2], manoD: [-0.2, 0.32, 0.38], codoD: [-1, -0.6, -0.2], dedoI: 0, dedoD: 0, t };
  pr.ojos = { abiertos: 0.85, x: 0, y: -0.6, tension: 0.05 };
  if (D) {
    // Diego: canchero, reclinado; "Un montón." mirando a Silvana; P8: baja la vista a la llave MALVÍN
    const lev = eio(sg(t, T.s1 + 0.6, T.s1 + 0.9));
    pr.inclina = lerp(0.06, -0.06, lev); pr.cabeza = { giro: lerp(0.12, 0.05, lev), asiente: lerp(0.25, -0.02, lev), ladea: 0.06 }; pr.ojos = { abiertos: 1, x: 0, y: lerp(-0.6, 0.05, lev), feliz: 0.2 };
    Object.assign(pr, { cejas: { alto: 0.25, ang: -0.05, asim: -0.4 }, boca: { sonrisa: lerp(0.1, 0.5, lev), abierta: 0, ancho: 1.05 } });
    if (lev > 0) { pr.manoD = [-0.3, 0.55, 0.05]; pr.codoD = [-1, 0.2, -0.4]; }   // la mano detrás de la nuca (canchero)
    if (t >= T.p8) {
      const b = eio(sg(t, T.mira, T.mira + 0.3));
      Object.assign(pr, { ...NADA, cejas: { alto: lerp(0.1, 0.45, b), ang: 0.3 }, boca: { sonrisa: -0.2, abierta: 0, ancho: 0.85 } });
      pr.inclina = lerp(-0.02, 0.12, b); pr.cabeza = { giro: lerp(0.05, 0.4, b), asiente: lerp(0.0, 0.42, b), ladea: 0.02 }; pr.ojos = { abiertos: 0.95, x: lerp(0, 0.5, b), y: lerp(0, -0.85, b), tension: 0.15 };
      pr.manoD = [-0.2, 0.32, 0.38]; pr.codoD = [-1, -0.6, -0.2];
    }
    bocaVoz(pr, t, T.d1, ENV.d1, 0.65); bocaVoz(pr, t, T.d2, ENV.d2, 0.55);
  } else {
    // Romina: seca, sin levantar la vista de la agenda; la lapicera en la mano
    pr.cabeza = { giro: -0.08, asiente: 0.3, ladea: -0.03 }; pr.ojos = { abiertos: 0.75, x: 0, y: -0.85, tension: 0 };
    Object.assign(pr, { cejas: { alto: -0.05, ang: -0.1 }, boca: { sonrisa: -0.05, abierta: 0, ancho: 0.9 } });
    if (t >= T.ro1 + 0.5 && t < P2) { const u = eio(sg(t, T.ro1 + 0.5, T.ro1 + 0.75)); pr.cabeza.asiente = lerp(0.3, 0.1, u); pr.ojos.y = lerp(-0.85, -0.2, u); }
    bocaVoz(pr, t, T.ro1, ENV.ro1, 0.6);
  }
  return pr;
}
// ---------- Graciela en el balcón (parada, el celular en altavoz a la altura del pecho) ----------
const G_BAL = { x: BX - 0.3, z: 0.8 };
function poseGraciela(t) {
  const pr = { x: G_BAL.x, y: 0, z: G_BAL.z, giro: 0.75, inclina: 0.02, ...aC(0.0, 0.05), ...CARA.neutra, ojos: { abiertos: 1, x: 0, y: -0.25 }, ...BRAZOS.celular, t };
  if (t < P2) {
    // P5: "Qué raro." pensativa; "La llave la tengo yo." seca y filosa (sin gritar)
    Object.assign(pr, { ojos: { abiertos: 0.85, x: 0.2, y: -0.3, tension: 0.1 }, cejas: { alto: 0.3, ang: 0.35, asim: 0.5 }, boca: { sonrisa: -0.2, abierta: 0, ancho: 0.85 } });
    pr.cabeza = { giro: 0.1, asiente: 0.1, ladea: 0.08 };
    if (t >= T.llave - 0.2) { Object.assign(pr, { ojos: { abiertos: 0.9, x: 0, y: -0.35, tension: 0.2 }, cejas: { alto: -0.1, ang: -0.2, asim: 0.2 }, boca: { sonrisa: -0.25, abierta: 0, ancho: 0.85 } }); }
    bocaVoz(pr, t, T.g2, ENV.g2, 0.6);
    return pr;
  }
  if (t < T.q3) {
    // Q2: le llega el resumen; sonríe; toca "Llamar" igual
    Object.assign(pr, { ...CARA.sonrisa, ojos: { abiertos: 1, x: 0, y: -0.4, feliz: 0.3 }, boca: { sonrisa: 0.6, abierta: 0, ancho: 1.05 } });
    pr.cabeza = { giro: 0.0, asiente: 0.22, ladea: 0.06 };
    return pr;
  }
  // Q4b: contentísima, en altavoz
  Object.assign(pr, { ...CARA.feliz, ojos: { abiertos: 1, x: 0.1, y: -0.1, feliz: 0.4 }, cejas: { alto: 0.4, ang: 0.15 }, boca: { sonrisa: 0.8, abierta: 0, ancho: 1.1 } });
  pr.cabeza = { giro: 0.15, asiente: 0.0, ladea: 0.08 };
  bocaVoz(pr, t, T.g5, ENV.g5, 0.6);
  return pr;
}
// ---------- Diego en el living de Pocitos (Q1, parado con el celular) y la pareja que se va por el pasillo ----------
const D_LIV = { x: BX + 0.42, z: -2.2 };
function poseDiegoLiv(t) {
  const pr = { x: D_LIV.x, y: 0, z: D_LIV.z, giro: 0.15, inclina: 0.03, ...aC(0, 0.3), ...CARA.sonrisa, ojos: { abiertos: 1, x: 0, y: -0.7, feliz: 0.2 }, ...BRAZOS.celular, t };
  if (t < T.q1i) { pr.cabeza = { giro: -0.5, asiente: 0.0, ladea: 0.03 }; pr.ojos = { abiertos: 1, x: -0.5, y: 0, feliz: 0.3 }; }
  return pr;
}
function posePareja(per, t) {
  const E = per === ella, u = sg(t, P2 - 0.2, T.q2);
  const pr = { x: BX + (E ? -1.55 : -1.15), y: 0, z: LIV.z0 - 0.7 - u * 1.6 - (E ? 0 : 0.3), giro: Math.PI + (E ? 0.15 : -0.1), paso: 1, inclina: 0.02, ...aC(0, 0), ...CARA.sonrisa, ...BRAZOS.costado, t };
  if (E) { const s = 1 - sg(t, P2 + 0.9, P2 + 1.2); if (s > 0) { Object.assign(pr, saludo(t, "D", s)); pr.cabeza = { giro: 2.4, asiente: 0, ladea: 0 }; } }
  return pr;
}
// ---------- Sofi (en su escena) ----------
function poseSofi(t) {
  const p = poseEn(t, [[0, { x: 0, z: 0, giro: 0, ...aC(0, 0.05), ...CARA.sonrisa, ...BRAZOS.costado }], [T.so + 1.2, { ...aC(0.08, 0.02), manoD: [-0.2, 0.4, 0.32], codoD: [-0.8, -0.6, 0] }, 0.4]]);
  p.t = t; bocaVoz(p, t, T.so, ENV.so, 0.6); return p;
}

// ================= RENDER =================
function ponerLuces(lugar) {
  const of = lugar === "of", po = lugar === "po" || lugar === "liv";
  for (const l of [solOf, cieloOf, rellenoOf]) l.visible = of;
  solPo.visible = cieloPo.visible = po; luzLiv.visible = lugar === "liv";
  cieloPo.intensity = lugar === "liv" ? 1.5 : 1.9;
}
// el celular en la mano de un personaje parado: entre las dos manos, mirando a la cámara (o a `mira`)
function celEnManos(cel, per, mira, alto = 0.07, adelante = 0.07) {
  per.raiz.updateMatrixWorld(true);
  const a = per.brazos[0].mano.getWorldPosition(new THREE.Vector3()), b = per.brazos[1].mano.getWorldPosition(new THREE.Vector3());
  cel.position.copy(a.add(b).multiplyScalar(0.5)).add(V3(0, alto, 0));
  cel.position.add(mira.clone().sub(cel.position).setY(0).normalize().multiplyScalar(adelante));
  cel.lookAt(mira);
}
let sofiRender = 0;
function renderAt(tIn) {
  AVISOS.length = 0;
  const t = en(tIn, P1, P2) ? (tIn < (P1 + P2) / 2 ? P1 - 0.001 : P2) : tIn;
  const parte2 = t >= P2;
  const pl = planoEn(t); planoActual = pl[0];
  let pa = planoActual;
  if (VERM === "portada") pa = "portada";
  const lugar = ["P5", "Q2", "Q4b"].includes(pa) ? "po" : pa === "Q1" ? "liv" : "of";
  ponerLuces(lugar);
  scene.background = new THREE.Color(lugar === "po" ? 0xdde7ec : lugar === "liv" ? 0xdde7ec : 0x16243d);
  OF.visible = lugar === "of";
  PO.visible = lugar === "po" || lugar === "liv";
  living.visible = lugar === "liv" || pa === "P5";
  // ---- pantallas y objetos ----
  dibujarMonitor(t); dibujarTelS(t);
  if (pa === "Q1") dibujarCelD(t);
  if (lugar === "po") dibujarCelG(t);
  llavePocitosTab.visible = parte2;                                  // el gancho POCITOS: vacío en la parte 1
  celuS.visible = pa === "Q5"; telS.visible = pa !== "Q5";
  franjaVendido.visible = t >= T.vendido;
  if (franjaVendido.visible) { const u = sg(t, T.vendido, T.vendido + 0.22); franjaVendido.position.set(lerp(-0.5, 0, eo(u)), lerp(0.55, 0, eo(u)), 0.012); franjaVendido.rotation.z = lerp(0.9, 0.32, eo(u)); franjaVendido.scale.setScalar(lerp(1.5, 1, eo(u)) * (1 + 0.06 * Math.sin(Math.PI * sg(t, T.vendido + 0.2, T.vendido + 0.4)))); }
  // la llave del balcón: péndulo chico (función del tiempo)
  llaveBalcon.rotation.z = Math.sin(t * 2.6) * 0.07 * (t >= T.llave ? 1 : 0.6);
  // ---- personajes ----
  for (const p of TODOS) p.raiz.visible = false;
  celD.visible = celG.visible = false;
  if (lugar === "of") {
    silvana.raiz.visible = pa !== "Q5"; sillaS.visible = pa !== "Q5"; const ps = poseSilvana(t);
    // la palma sobre el celular (tapa): la mano izquierda va arriba del celular
    if (ps.tapa > 0) { telS.updateMatrixWorld(true); const w = telS.userData.piv.localToWorld(V3(0, telS.userData.H * 0.78, 0.06)); ps.manoI = lerpV(ps.manoI, aCuerpo(silvana, w), ps.tapa); ps.codoI = [1, -0.2, -0.4]; ps.dedoI = 0; }
    silvana.poner(ps);
    sillaS.rotation.y = silvana.raiz.rotation.y;
    for (const p of [diego, romina]) { p.raiz.visible = true; p.poner(poseCorredor(p, t)); }
  }
  if (lugar === "po" && (pa !== "P5" || true)) {
    graciela.raiz.visible = true; const pg = poseGraciela(t); graciela.poner(pg);
  }
  if (lugar === "liv") {
    diego.raiz.visible = true; diego.poner(poseDiegoLiv(t));
    for (const p of [ella, el]) { p.raiz.visible = true; p.poner(posePareja(p, t)); }
  }
  // ---- cámara ----
  if (pl[2] && pa !== "portada") ponerCam(catmull(pl[2], t), t);
  if (pa === "P5") {
    // la grúa desde la rambla (el río abajo) hasta el balcón; en "La llave", push-in a la llave POCITOS
    const k = BK();
    const A = [BX - 3.2, 2.6, 15.5, BX - 0.2, 0.2, 0.5, 52], B = [BX + 0.78, 1.42, 3.95, BX - 0.22, 0.92, 0.7, 47], Cc = [BX + 0.74, 1.4, 3.75, BX - 0.2, 0.92, 0.7, 46];
    const Dk = [k.x + 0.22, k.y + 0.06, k.z + 0.62, k.x - 0.02, k.y + 0.0, k.z, 40];
    const u = eio(sg(t, T.p5, T.g2 + 0.15)), w = eio(sg(t, T.llave - 0.3, T.llave + 0.35));
    const v = u < 1 ? lerpV(A, B, u) : lerpV(B, Cc, sg(t, T.g2 + 0.15, T.llave - 0.3));
    ponerCam(lerpV(v, Dk, w), t);
  }
  if (pa === "P7") {
    const { v, up } = vistaPantalla(telS.userData.piv, telS.userData.centro, V3(0, 0, 1), telS.userData.H, 0.5, 40, -0.004);
    const u = eio(sg(t, T.p7, T.p8)); const v2 = v.slice(); v2[0] += 0.0; v2[1] += 0.02 * (1 - u);
    ponerVista(v2, v2, 0, up, up);
  }
  if (pa === "Q1") {
    celEnManos(celD, diego, camera.position, 0.2, 0.1); celD.visible = true;
    const A = [BX + 1.1, 1.5, -0.35, BX - 0.75, 1.15, -4.6, 50];
    ponerCam(A, t, true); camera.updateMatrixWorld(true);
    celEnManos(celD, diego, camera.position, 0.2, 0.1);
    const { v, up } = vistaPantalla(celD, V3(0, 0, 0.007), V3(0, 0, 1), 0.162 * 1.2, 0.62, 40);
    const u = eio(sg(t, T.q1i, T.q1i + 0.6));
    ponerVista(A, v, u, V3(0, 1, 0), up);
  }
  if (pa === "Q2") {
    const A = [BX + 1.75, 1.45, 2.75, G_BAL.x - 0.05, 1.15, G_BAL.z, 46];
    ponerCam(A, t, true); camera.updateMatrixWorld(true);
    celEnManos(celG, graciela, camera.position, 0.2, 0.1); celG.visible = true;
    const { v, up } = vistaPantalla(celG, V3(0, 0, 0.007), V3(0, 0, 1), 0.162 * 1.25, 0.62, 40);
    const u = eio(sg(t, T.q2i, T.q2i + 0.6)) * (1 - eio(sg(t, T.llamaG + 0.1, T.q3)));
    ponerVista(A, v, u, V3(0, 1, 0), up);
  } else if (lugar === "po") { camera.updateMatrixWorld(true); celEnManos(celG, graciela, camera.position, 0.2, 0.1); celG.visible = true; }
  if (pa === "Q3m" || pa === "Q4") {
    const { v } = vistaPantalla(monitor, monitor.userData.centro, V3(0, 0, 1), MON.H, 0.5, 44);
    const FOV = 44, d = (MON.W * 1.04) / (2 * Math.tan((FOV * D2R) / 2) * (1080 / 1920));
    monitor.updateMatrixWorld(true);
    const c = monitor.localToWorld(monitor.userData.centro.clone()), n = V3(0, 0, 1).transformDirection(monitor.matrixWorld);
    const p = c.clone().add(n.multiplyScalar(d * (pa === "Q4" ? lerp(1.05, 1.0, eio(sg(t, T.q4, T.q4b))) : 1)));
    const ins = [p.x, p.y, p.z, c.x, c.y, c.z, FOV];
    if (pa === "Q3m") ponerVista(CAM_P1(0.4), ins, eio(sg(t, T.mon, T.mon + 0.55))); else ponerCam(ins, t, true);
    void v;
  }
  if (pa === "Q5") {
    celuS.updateMatrixWorld(true);
    const cs = celuS.userData.piv.localToWorld(celuS.userData.centro.clone());
    const u = eio(sg(t, T.q5, DUR));
    ponerCam([cs.x + lerp(0.08, 0.06, u), cs.y + 0.15, cs.z + lerp(0.92, 0.8, u), cs.x + 0.02, cs.y + 0.03, cs.z, 44], t);
    // Sofi: su escena a la textura del celular parado
    sofi.poner(poseSofi(t)); sofi.raiz.updateMatrixWorld(true);
    const c = sofi.cabeza.localToWorld(V3(0, 0.2, 0));
    SOFI.cam.position.set(c.x + 0.05, c.y + 0.02, c.z + 2.75); SOFI.cam.lookAt(c.x, c.y - 0.28, c.z);
    renderer.setRenderTarget(SOFI.rt); renderer.render(SOFI.esc, SOFI.cam); renderer.setRenderTarget(null);
  }
  if (pa === "portada") {
    // la portada: Silvana de frente con cara de "¿y ahora?", el celular en altavoz cerca, el tablero con el gancho vacío
    silvana.raiz.visible = true;
    silvana.poner({ ...poseSilvana(T.p6 + 0.2), ...CARA.incredula, ojos: { abiertos: 0.95, x: 0.0, y: 0.05, tension: 0.2 }, cejas: { alto: 0.35, ang: 0.45, asim: 0.5 }, boca: { sonrisa: -0.3, abierta: 0.05, ancho: 0.85 }, cabeza: { giro: 0.05, asiente: 0.0, ladea: 0.05 }, t: 1 });
    ponerCam([0.18, 1.18, 2.2, 0.12, 1.12, 0.35, 46], t, true);
  }
  if (window.__cam) ponerCam(window.__cam, t, true);
  if (VERM && VERM.startsWith("cam:")) ponerCam(VERM.slice(4).split(",").map(Number), t, true);
  camera.updateMatrixWorld(true);
  for (const p of TODOS) if (p.ojoLejano && p.raiz.visible) p.ojoLejano(camera.position);

  // ---- globos de diálogo y rótulos ----
  for (const k in GL) GL[k].visible = false;
  for (const r of [...ROT, ...ROT_Q]) r.visible = false;
  for (const g of GUIAS) g.visible = false;
  if (!LIMPIO && !en(tIn, P1, P2) && pa !== "portada") tarjetas(t, pa);
  renderer.render(scene, camera);
}
function tarjetas(t, pa) {
  const ent = (ti) => (t < ti ? 0 : 0.75 + 0.25 * bk(sg(t, ti, ti + 0.18)));
  const tel = () => objPx(telS.userData.piv, V3(0, telS.userData.H * 0.9, 0.01));
  if (pa === "P1" || pa === "Q3") {
    const [tx, ty] = tel();
    const g = pa === "P1" ? GL.g1 : GL.g1b, t0 = pa === "P1" ? T.g1 : T.g1b;
    if (t >= t0 - 0.05) ponerGlobo(g, 370, 590, ent(t0 - 0.05), [tx, ty], 1);
  }
  if (pa === "P2" && t >= T.s1 - 0.04) ponerGlobo(GL.s1, 560, 560, ent(T.s1 - 0.04), bocaPx(silvana), 1);
  if (pa === "P3") {
    if (t >= T.d1 - 0.04) { const [hx, hy] = coronillaPx(diego); ponerGlobo(GL.d1, 330, Math.min(290, hy - 260), ent(T.d1 - 0.04), [hx, hy + 6], 1); }
    if (t >= T.ro1 - 0.04) { const [hx, hy] = coronillaPx(romina); ponerGlobo(GL.ro1, 770, Math.min(470, hy - 120), ent(T.ro1 - 0.04), [hx, hy + 6], 2); }
  }
  if (pa === "P4" && t >= T.s2 - 0.04) ponerGlobo(GL.s2, 560, 400, ent(T.s2 - 0.04), bocaPx(silvana), 1);
  if (pa === "P5" && t >= T.g2 - 0.04) {
    if (t < T.llave - 0.05) hablar(GL.g2a, graciela, ent(T.g2 - 0.04), 1, 0, 280);
    else ponerGlobo(GL.g2, 560, 330, ent(T.llave - 0.05), null, 1);
  }
  if (pa === "P6") {
    const fPx = objPx(fichaGraciela, V3(0.13, 0.05, 0.01)), hPx = objPx(tablero, ganchoPocitos.clone().add(V3(0, -0.06, 0)));
    const pos = [[300, 420], [300, 590], [770, 760]];
    ROT.forEach((r, i) => { if (t >= T.rot[i]) ponerGlobo(r, pos[i][0], pos[i][1], ent(T.rot[i]), null, 3 + i); });
    if (t >= T.rot[0]) ponerGuia(GUIAS[0], 200, 640, fPx[0], fPx[1], sg(t, T.rot[0], T.rot[0] + 0.25));
    if (t >= T.rot[2]) ponerGuia(GUIAS[2], 770, 815, hPx[0], hPx[1], sg(t, T.rot[2], T.rot[2] + 0.25));
  }
  if (pa === "P7" && t >= T.g3 - 0.04) ponerGlobo(GL.g3, 540, 330, ent(T.g3 - 0.04), null, 1);
  if (pa === "P8" && t >= T.d2 - 0.04) { const [hx, hy] = coronillaPx(diego); ponerGlobo(GL.d2, 330, 340, ent(T.d2 - 0.04), [hx - 30, hy + 10], 1); }
  if (pa === "Q1" && t >= T.q1i + 0.3) ponerGlobo(ROT_Q[0], 540, 250, ent(T.q1i + 0.3), null, 2);
  if (pa === "Q2" && t >= T.q2i + 0.4) ponerGlobo(ROT_Q[1], 540, 290, ent(T.q2i + 0.4), null, 2);
  if (pa === "Q3m") { ponerGlobo(ROT_Q[2], 540, 300, ent(T.mon + 0.3), null, 2); if (t >= T.s3 - 0.04) ponerGlobo(GL.s3, 540, 1500, ent(T.s3 - 0.04), null, 1); }
  if (pa === "Q3c" && t >= T.g4 - 0.04) { const [tx, ty] = tel(); ponerGlobo(GL.g4, 560, 600, ent(T.g4 - 0.04), [tx, ty], 1); }
  if (pa === "Q4b" && t >= T.g5 - 0.04) { const [hx, hy] = coronillaPx(graciela); ponerGlobo(GL.g5, 560, 330, ent(T.g5 - 0.04), [hx, hy + 6], 1); }
}

window.__tresRender = renderAt;
window.addEventListener("hf-seek", (e) => renderAt(e.detail.time));
window.__tresDbg = (t) => { renderAt(t); return { plano: planoActual, avisos: AVISOS.slice(), cam: camera.position.toArray().map((v) => +v.toFixed(2)) }; };
renderAt(window.__hfThreeTime || 0);
if (window.__tresListo) window.__tresListo();
