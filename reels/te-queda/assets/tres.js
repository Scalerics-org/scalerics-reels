// Capa 3D de te-queda (Three.js r170 local). Base técnica: reels/anotamelo (globos pegados a la cámara en píxeles de
// pantalla, poses por claves, bocas por envolvente, PLANOS con Catmull-Rom).
// renderAt(t) es una función pura del tiempo del timeline (hf-seek): nada de rAF, Date.now ni azar sin semilla.
// Un solo set en dos pisos: el ALMACÉN DE RUBÉN A LA SIESTA (pared navy3 con azulejos crema hasta media altura, luz
// baja y cálida por la ventana de la izquierda) y, debajo, el SÓTANO en penumbra navy claro (ladrillo, un foco pelado
// con cadenita, estantes de ángulo ranurado con cajas kraft escritas con marcador). Los une una trampa en el piso
// detrás del mostrador con una escalera marinera. En los planos de "casa de muñecas" se ve todo en sección: la pared
// de adelante se saca y la tierra es un panel navy con el borde crema de maqueta.
//   PARTE 1: "¿Te queda polenta?" · "Ya me fijo." · la zambullida · la caja vacía · "No, no queda." · Walter (avalancha,
//            telaraña) · Marta (el foco se quema, la caja de sombrero) · Héctor: el casco con linterna, la expedición ·
//            "Queda uno." · la pausa · "Ah, no. Era para saber." · "¿Y yerba?" · el casco a la cabeza de Héctor.
//   PARTE 2: Rubén sentado arriba de la trampa con la tablet · "Quedan tres." · Héctor con el casco · "Doce." · "Era para
//            saber." / "Ahora sabés." · la tablet pide la yerba sola · Héctor baja él a contar: "Doce."
import * as THREE from "./vendor/three/three.module.js";
import { RoundedBoxGeometry } from "./vendor/three/RoundedBoxGeometry.js";
import {
  crearPersonaje, ELENCO, CARA, BRAZOS, poseEn, pegarACamara, crearTelarana,
  crearMate, crearTermo, crearYerba, crearGalletitas, crearPolenta, crearFideos, crearDulceDeLeche,
  crearTablet, crearBanquito, crearBolsaPapel, crearMochila, crearReloj, crearCaja,
} from "./personajes.js";
import { T, DUR, P1, P2, ENV, LEN, LIMPIO } from "./tiempos3d.js";
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
const hash = (n) => { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };

// ---------- render ----------
const canvas = document.getElementById("tres");
const renderer = new THREE.WebGLRenderer({ canvas, alpha: false, antialias: true, preserveDrawingBuffer: true, powerPreference: "high-performance" });
renderer.setPixelRatio(1);
renderer.setSize(1080, 1920, false);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.NeutralToneMapping;
renderer.toneMappingExposure = 1.0;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const scene = new THREE.Scene();
const FONDO_DIA = new THREE.Color(0xf1dcb8), FONDO_SEC = new THREE.Color(0x0b1220);
scene.background = FONDO_DIA;   // la siesta por la puerta y la ventana
const camera = new THREE.PerspectiveCamera(50, 1080 / 1920, 0.02, 80);
camera.layers.enable(1);
scene.add(camera);

function entorno() {
  const env = new THREE.Scene();
  env.background = new THREE.Color(0x4a4640);
  const tira = (w, h, x, y, z, ry, c, k) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(c).multiplyScalar(k), side: THREE.DoubleSide }));
    m.position.set(x, y, z); m.rotation.y = ry; env.add(m);
  };
  tira(4, 6, -6, 2, -1, Math.PI / 2, 0xfff0dc, 1.6);
  tira(10, 1.2, 0, 7, 0, 0, 0xfff4e6, 0.9);
  tira(1.4, 8, 4, 1, 6, 0, 0xc8d4ff, 0.5);
  const pm = new THREE.PMREMGenerator(renderer);
  const rt = pm.fromScene(env, 0.035);
  pm.dispose();
  return rt.texture;
}
scene.environment = entorno();
scene.environmentIntensity = 0.35;

// ---------- luces: la siesta entra baja y cálida por la ventana de la izquierda (con sombra larga); el cielo
// hemisférico (más bajo en el sótano), un contraluz frío y un relleno desde la cámara ----------
const sol = new THREE.DirectionalLight(0xffe2b8, 2.4);
sol.position.set(-4.8, 3.6, 0.6); sol.target.position.set(0.6, 0.0, -1.4);
sol.castShadow = true; sol.shadow.mapSize.set(2048, 2048); sol.shadow.bias = -0.0006; sol.shadow.radius = 3;
Object.assign(sol.shadow.camera, { left: -4.2, right: 4.2, top: 4.2, bottom: -4.2, near: 0.5, far: 18 });
scene.add(sol, sol.target);
const cielo = new THREE.HemisphereLight(0xf2e6d6, 0x4a4038, 1.0); scene.add(cielo);
const rim = new THREE.DirectionalLight(0xdfe8ff, 0.6); rim.position.set(2.5, 3.2, -5); scene.add(rim);
const relleno = new THREE.DirectionalLight(0xfff2e2, 0.45); scene.add(relleno, relleno.target);

// ---------- paleta y materiales ----------
const C = { navy: 0x0b1220, navy2: 0x16243d, navy3: 0x1f3254, edge: 0x2c4268, cr: 0xefeee5, cr2: 0xd9d7c9, cr3: 0xb4b2a3, g: 0x5ce611, gd: 0x3fa60a, red: 0xc7655b, madera: 0x9b6a43, maderaC: 0xc89a64, mostaza: 0xd9a441, kraft: 0xc9a46b, alu: 0xc9ced6 };
const mat = (color, rough = 0.6, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0, ...extra });
const M = {
  navy: mat(C.navy, 0.5), navy2: mat(C.navy2, 0.7), navy3: mat(C.navy3, 0.65), cr: mat(C.cr, 0.6), cr2: mat(C.cr2, 0.6),
  madera: mat(C.madera, 0.55), maderaC: mat(C.maderaC, 0.55), g: mat(C.g, 0.5), red: mat(C.red, 0.55),
  kraft: mat(C.kraft, 0.85), kraftIn: mat(0x8f6c3d, 0.9, { side: THREE.DoubleSide }), alu: mat(C.alu, 0.35, { metalness: 0.55 }),
  crBasic: new THREE.MeshBasicMaterial({ color: C.cr, toneMapped: false }),
};
const rbox = (w, h, d, r = 0.03, seg = 3) => new RoundedBoxGeometry(w, h, d, seg, Math.min(r, w / 2 - 0.001, h / 2 - 0.001, d / 2 - 0.001));
const mesh = (g, m, x = 0, y = 0, z = 0) => { const o = new THREE.Mesh(g, m); o.position.set(x, y, z); o.castShadow = true; o.receiveShadow = true; return o; };
const lienzo = (w, h, dibujo) => {
  const c = document.createElement("canvas"); c.width = w; c.height = h; const x = c.getContext("2d");
  dibujo(x, w, h);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; t.userData = { c, x }; return t;
};
const F = (w, s) => `${w} ${s}px "Lexend", sans-serif`;
const CAV = (s) => `700 ${s}px "Caveat", cursive`;
let semilla = 7;
const az = () => ((semilla = (semilla * 16807) % 2147483647) / 2147483647);

// ================= EL SET =================
// x: izquierda (-) a derecha (+) mirando desde el lado del cliente hacia Rubén (-z). Pared del fondo z = BZ; pared de
// adelante z = FZ (se saca en los planos de sección); pared izquierda x = LX con la puerta y la ventana; mostrador en
// z = -1.3; la trampa detrás del mostrador, a la derecha. El sótano: piso en y = SY, techo = la losa (y -LOSA..0).
const LX = -1.6, RX = 2.2, FZ = 1.25, BZ = -3.15, TECHO_Y = 2.8, LOSA = 0.25, SY = -2.7, AZU = 1.2;   // (ronda 1) sótano de 2,45 m: Rubén en la tijera no toca la losa
const PUERTA = { z0: -0.3, z1: 0.75, alto: 2.2 };
const VENT = { z0: -2.45, z1: -1.55, y0: 1.0, y1: 2.1 };
const MOSTRADOR = { x: 0.05, y: 0.95, z: -1.3, w: 1.9, d: 0.62 };
const MY = MOSTRADOR.y;
const TR = { x0: 1.12, x1: 1.92, z0: -2.45, z1: -1.65 };
const TRC = V3((TR.x0 + TR.x1) / 2, 0, (TR.z0 + TR.z1) / 2);
const ESC_Z = -1.98;                  // dónde está el que sube o baja la escalera (de frente a la cámara, +z)
const RI = { x: 0.4, z: -1.9 };      // Rubén atrás del mostrador
const CLI = { x: -0.32, z: -0.72 };   // el cliente frente al mostrador
const TJ = { x: -0.32, z: -2.3 };     // la escalera tijera en el sótano
const FOCO = V3(0.15, -0.8, -1.75);   // el foco pelado del sótano
const SECCION = new THREE.Group(); scene.add(SECCION);   // lo que solo se ve en sección (tierra, bordes de maqueta)
const SIN_SECCION = new THREE.Group(); scene.add(SIN_SECCION);   // lo que se saca en sección (pared de adelante, afuera)
{
  // ---- piso del almacén: damero navy3/crema2 con el hueco de la trampa (ShapeGeometry: las UV son metros) ----
  const damero = lienzo(256, 256, (x) => { for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) { x.fillStyle = (i + j) % 2 ? "#d9d7c9" : "#1f3254"; x.fillRect(i * 128, j * 128, 128, 128); } });
  damero.wrapS = damero.wrapT = THREE.RepeatWrapping; damero.repeat.set(1 / 0.6, 1 / 0.6);
  const sh = new THREE.Shape(); sh.moveTo(LX, -FZ); sh.lineTo(RX, -FZ); sh.lineTo(RX, -BZ); sh.lineTo(LX, -BZ); sh.closePath();
  const hueco = new THREE.Path(); hueco.moveTo(TR.x0, -TR.z1); hueco.lineTo(TR.x0, -TR.z0); hueco.lineTo(TR.x1, -TR.z0); hueco.lineTo(TR.x1, -TR.z1); hueco.closePath(); sh.holes.push(hueco);
  const piso = new THREE.Mesh(new THREE.ShapeGeometry(sh), new THREE.MeshStandardMaterial({ map: damero, roughness: 0.55 }));
  piso.rotation.x = -Math.PI / 2; piso.receiveShadow = true; scene.add(piso);
  // la losa (navy3) alrededor del hueco
  const losa = (x0, x1, z0, z1) => { const m = mesh(new THREE.BoxGeometry(x1 - x0, LOSA - 0.006, z1 - z0), M.navy3, (x0 + x1) / 2, -LOSA / 2 - 0.003, (z0 + z1) / 2); scene.add(m); };
  losa(LX, TR.x0, BZ, FZ); losa(TR.x1, RX, BZ, FZ); losa(TR.x0, TR.x1, BZ, TR.z0); losa(TR.x0, TR.x1, TR.z1, FZ);
  // el marco del hueco (madera oscura, que se lea el borde)
  for (const [w, d, x, z] of [[TR.x1 - TR.x0 + 0.08, 0.04, TRC.x, TR.z0 - 0.02], [TR.x1 - TR.x0 + 0.08, 0.04, TRC.x, TR.z1 + 0.02], [0.04, TR.z1 - TR.z0, TR.x0 - 0.02, TRC.z], [0.04, TR.z1 - TR.z0, TR.x1 + 0.02, TRC.z]]) scene.add(mesh(new THREE.BoxGeometry(w, 0.012, d), M.madera, x, 0.004, z));
  const techo = new THREE.Mesh(new THREE.BoxGeometry(RX - LX, 0.12, FZ - BZ), mat(0xe8e2d2, 0.95)); techo.position.set((LX + RX) / 2, TECHO_Y + 0.06, (FZ + BZ) / 2); scene.add(techo);

  // ---- paredes del almacén: navy3 arriba, azulejos crema (pastina navy) hasta AZU, un listón crema2 ----
  const azul = lienzo(256, 256, (x) => { x.fillStyle = "#1f3254"; x.fillRect(0, 0, 256, 256); x.fillStyle = "#efeee5"; for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) x.fillRect(i * 128 + 5, j * 128 + 5, 118, 118); });
  azul.wrapS = azul.wrapT = THREE.RepeatWrapping;
  const paredM = new THREE.MeshBasicMaterial({ color: C.navy3, toneMapped: true });
  const pared = (a0, a1, y0, y1, plano, fijo, dir, grupo = scene) => {
    const w = a1 - a0, c = (a0 + a1) / 2, cy = (y0 + y1) / 2, h = y1 - y0;
    const m = new THREE.Mesh(new THREE.BoxGeometry(plano === "z" ? w : 0.1, h, plano === "z" ? 0.1 : w), paredM);
    if (plano === "z") m.position.set(c, cy, fijo - dir * 0.05); else m.position.set(fijo - dir * 0.05, cy, c);
    grupo.add(m);
    if (y0 < AZU) {
      const hh = Math.min(AZU, y1) - y0, t = azul.clone(); t.needsUpdate = true; t.repeat.set(w / 0.3, hh / 0.3); t.offset.set(0, (y0 % 0.3) / 0.3);
      const z = new THREE.Mesh(new THREE.BoxGeometry(plano === "z" ? w : 0.012, hh, plano === "z" ? 0.012 : w), new THREE.MeshBasicMaterial({ map: t }));
      if (plano === "z") z.position.set(c, y0 + hh / 2, fijo + dir * 0.006); else z.position.set(fijo + dir * 0.006, y0 + hh / 2, c);
      grupo.add(z);
      if (y1 > AZU + 0.03) { const l = new THREE.Mesh(new THREE.BoxGeometry(plano === "z" ? w : 0.03, 0.04, plano === "z" ? 0.03 : w), M.cr2); if (plano === "z") l.position.set(c, AZU, fijo + dir * 0.015); else l.position.set(fijo + dir * 0.015, AZU, c); grupo.add(l); }
    }
  };
  pared(LX, RX, 0, TECHO_Y, "z", BZ, 1);
  pared(LX, RX, 0, TECHO_Y, "z", FZ, -1, SIN_SECCION);
  pared(BZ, FZ, 0, TECHO_Y, "x", RX, -1);
  pared(BZ, VENT.z0, 0, TECHO_Y, "x", LX, 1);
  pared(VENT.z1, PUERTA.z0, 0, TECHO_Y, "x", LX, 1);
  pared(PUERTA.z1, FZ, 0, TECHO_Y, "x", LX, 1);
  pared(VENT.z0, VENT.z1, 0, VENT.y0, "x", LX, 1);
  pared(VENT.z0, VENT.z1, VENT.y1, TECHO_Y, "x", LX, 1);
  pared(PUERTA.z0, PUERTA.z1, PUERTA.alto, TECHO_Y, "x", LX, 1);
  const marco = (y, z, h, d) => scene.add(mesh(rbox(0.14, h, d, 0.02), M.cr2, LX + 0.02, y, z));
  marco(PUERTA.alto + 0.05, (PUERTA.z0 + PUERTA.z1) / 2, 0.1, PUERTA.z1 - PUERTA.z0 + 0.2);
  marco(PUERTA.alto / 2, PUERTA.z0 - 0.05, PUERTA.alto + 0.1, 0.1); marco(PUERTA.alto / 2, PUERTA.z1 + 0.05, PUERTA.alto + 0.1, 0.1);
  marco(VENT.y1 + 0.04, (VENT.z0 + VENT.z1) / 2, 0.08, VENT.z1 - VENT.z0 + 0.16); marco(VENT.y0 - 0.04, (VENT.z0 + VENT.z1) / 2, 0.08, VENT.z1 - VENT.z0 + 0.22);
  marco((VENT.y0 + VENT.y1) / 2, VENT.z0 - 0.04, VENT.y1 - VENT.y0, 0.08); marco((VENT.y0 + VENT.y1) / 2, VENT.z1 + 0.04, VENT.y1 - VENT.y0, 0.08);
  marco((VENT.y0 + VENT.y1) / 2, (VENT.z0 + VENT.z1) / 2, VENT.y1 - VENT.y0, 0.04);
  // afuera (la siesta): la vereda, la calle, la casa de enfrente; colores planos y cálidos
  const afuera = new THREE.Group(); SIN_SECCION.add(afuera);
  const v = mesh(new THREE.PlaneGeometry(3, 14), new THREE.MeshBasicMaterial({ color: 0xd8cdb6 }), LX - 1.5, 0.0, -1); v.rotation.x = -Math.PI / 2; v.castShadow = false; afuera.add(v);
  const calle = mesh(new THREE.PlaneGeometry(8, 40), new THREE.MeshBasicMaterial({ color: 0x8a8278 }), LX - 7, -0.15, -1); calle.rotation.x = -Math.PI / 2; afuera.add(calle);
  afuera.add(mesh(new THREE.BoxGeometry(0.3, 6, 16), new THREE.MeshBasicMaterial({ color: 0xeac79a }), LX - 8.5, 3, -1));
  for (let i = -4; i <= 4; i++) afuera.add(mesh(rbox(0.1, 1.3, 1.0, 0.02), new THREE.MeshBasicMaterial({ color: 0x46608a }), LX - 8.3, 1.9, i * 1.8 - 1));
  const arbol = new THREE.Group(); arbol.position.set(LX - 2.6, 0, -1.8); afuera.add(arbol);
  arbol.add(mesh(new THREE.CylinderGeometry(0.1, 0.14, 2.6, 8), new THREE.MeshBasicMaterial({ color: 0x6e4a2e }), 0, 1.3, 0));
  for (const [x, y, z, r] of [[0, 3.0, 0, 0.9], [0.5, 2.7, 0.2, 0.6], [-0.5, 2.8, -0.1, 0.65]]) arbol.add(mesh(new THREE.IcosahedronGeometry(r, 0), new THREE.MeshBasicMaterial({ color: 0x7e9a4a }), x, y, z));
}

// ---------- el sótano: ladrillo navy claro con juntas navy2 (con emisivo bajo: penumbra navy, nunca negro) ----------
{
  const lad = lienzo(512, 512, (x) => {
    x.fillStyle = "#16243d"; x.fillRect(0, 0, 512, 512);
    for (let j = 0; j < 8; j++) for (let i = -1; i < 4; i++) { x.fillStyle = (i + j) % 3 === 0 ? "#263c62" : "#22365a"; x.fillRect(i * 128 + (j % 2) * 64 + 5, j * 64 + 5, 118, 54); }
  });
  lad.wrapS = lad.wrapT = THREE.RepeatWrapping;
  const ladM = (w, h) => { const t = lad.clone(); t.needsUpdate = true; t.repeat.set(w / 1.0, h / 0.5); return new THREE.MeshStandardMaterial({ map: t, roughness: 0.9, emissive: 0xffffff, emissiveMap: t, emissiveIntensity: 0.42 }); };
  const H = -LOSA - SY;
  const fondo = new THREE.Mesh(new THREE.PlaneGeometry(RX - LX, H), ladM(RX - LX, H)); fondo.position.set((LX + RX) / 2, SY + H / 2, BZ); fondo.receiveShadow = true; scene.add(fondo);
  const izq = new THREE.Mesh(new THREE.PlaneGeometry(FZ - BZ, H), ladM(FZ - BZ, H)); izq.rotation.y = Math.PI / 2; izq.position.set(LX, SY + H / 2, (FZ + BZ) / 2); izq.receiveShadow = true; scene.add(izq);
  const der = new THREE.Mesh(new THREE.PlaneGeometry(FZ - BZ, H), ladM(FZ - BZ, H)); der.rotation.y = -Math.PI / 2; der.position.set(RX, SY + H / 2, (FZ + BZ) / 2); der.receiveShadow = true; scene.add(der);
  const pisoS = mesh(new THREE.BoxGeometry(RX - LX, 0.12, FZ - BZ), new THREE.MeshStandardMaterial({ color: 0x24324a, roughness: 0.95, emissive: 0x16243d, emissiveIntensity: 0.55 }), (LX + RX) / 2, SY - 0.06, (FZ + BZ) / 2); pisoS.castShadow = false; scene.add(pisoS);
  // el techo del sótano (la cara de abajo de la losa): navy2 liso
  // la tierra (en sección): un panel navy con el hueco del sótano y los bordes crema de maqueta
  const tierra = new THREE.Shape(); tierra.moveTo(-12, -12); tierra.lineTo(12, -12); tierra.lineTo(12, 0); tierra.lineTo(-12, 0); tierra.closePath();
  const h2 = new THREE.Path(); h2.moveTo(LX, SY - 0.12); h2.lineTo(LX, -LOSA); h2.lineTo(RX, -LOSA); h2.lineTo(RX, SY - 0.12); h2.closePath(); tierra.holes.push(h2);
  const tm = new THREE.Mesh(new THREE.ShapeGeometry(tierra), new THREE.MeshBasicMaterial({ color: 0x121c30 })); tm.position.z = FZ + 0.02; SECCION.add(tm);
  // la cara cortada de la losa y del piso del sótano (navy3, con borde crema)
  const cara = (x0, x1, y0, y1, color) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(x1 - x0, y1 - y0), new THREE.MeshBasicMaterial({ color })); m.position.set((x0 + x1) / 2, (y0 + y1) / 2, FZ + 0.015); SECCION.add(m); };
  cara(LX - 0.12, RX + 0.12, -LOSA, 0.0, 0x1f3254); cara(LX, RX, SY - 0.12, SY, 0x24324a);
  cara(LX - 0.12, LX, -LOSA, TECHO_Y + 0.12, 0x1f3254); cara(RX, RX + 0.12, -LOSA, TECHO_Y + 0.12, 0x1f3254); cara(LX - 0.12, RX + 0.12, TECHO_Y, TECHO_Y + 0.12, 0x1f3254);
  const B = 0.045;   // el borde crema (~10-12 px en la sección)
  const borde = (x0, x1, y0, y1) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(x1 - x0, y1 - y0), M.crBasic); m.position.set((x0 + x1) / 2, (y0 + y1) / 2, FZ + 0.03); SECCION.add(m); };
  // contorno del edificio y de la losa, y el sótano
  borde(LX - 0.12 - B, RX + 0.12 + B, TECHO_Y + 0.12, TECHO_Y + 0.12 + B);
  borde(LX - 0.12 - B, LX - 0.12, -LOSA, TECHO_Y + 0.12 + B); borde(RX + 0.12, RX + 0.12 + B, -LOSA, TECHO_Y + 0.12 + B);
  borde(LX, RX, -LOSA - B, -LOSA); borde(LX - 0.12, LX, -LOSA - B, -LOSA); borde(RX, RX + 0.12, -LOSA - B, -LOSA);
  borde(LX - B, LX, SY - 0.12 - B, -LOSA); borde(RX, RX + B, SY - 0.12 - B, -LOSA); borde(LX - B, RX + B, SY - 0.12 - B, SY - 0.12);
  borde(-12, 12, 0.0, B * 0.8);   // la línea del suelo (vereda)
  borde(LX, RX, -B / 2, B / 2);   // el piso del almacén cortado
  // adentro, los bordes del almacén en la sección (paredes y techo cortados)
  borde(LX - 0.12, LX + 0.0, 0, TECHO_Y); borde(RX, RX + 0.12, 0, TECHO_Y);
}

// ---------- estanterías del almacén con mercadería de colores planos ----------
semilla = 7;
const colores = [C.cr, C.red, C.mostaza, 0xffffff, C.cr2, 0xe8cf9f, 0x8a5a3c, 0xd98a5a, C.mostaza, C.navy3];
const mc = {}; const mm = (c, r) => (mc[c + "|" + r] ??= mat(c, r));
const cuerpoFrasco = new THREE.CylinderGeometry(0.07, 0.07, 0.2, 14), tapaF = new THREE.CylinderGeometry(0.075, 0.075, 0.04, 14);
const botella = new THREE.CylinderGeometry(0.045, 0.06, 0.3, 12), picoB = new THREE.CylinderGeometry(0.02, 0.03, 0.09, 10);
function llenar(gr, x0, x1, y) {
  for (let x = x0 + 0.14; x < x1 - 0.1; x += 0.17 + az() * 0.07) {
    const k = az(), c = colores[Math.floor(az() * colores.length)];
    if (k < 0.3) { const h = 0.22 + az() * 0.16; gr.add(mesh(rbox(0.13, h, 0.16, 0.012), mm(c, 0.6), x, y + 0.025 + h / 2, 0)); }
    else if (k < 0.48) { gr.add(mesh(cuerpoFrasco, mm(c, 0.35), x, y + 0.125, 0)); gr.add(mesh(tapaF, M.cr, x, y + 0.245, 0)); }
    else if (k < 0.62) { gr.add(mesh(botella, mm(c, 0.3), x, y + 0.175, 0)); gr.add(mesh(picoB, mm(C.cr3, 0.4), x, y + 0.37, 0)); }
    else if (k < 0.74) { const yb = crearYerba(); yb.position.set(x, y + 0.025, 0); yb.scale.setScalar(0.85); gr.add(yb); x += 0.02; }
    else if (k < 0.82) { const pl = crearPolenta(); pl.position.set(x, y + 0.025, 0); gr.add(pl); }
    else if (k < 0.9) { const fi = crearFideos(); fi.position.set(x, y + 0.025, 0); gr.add(fi); }
    else { const ga = crearGalletitas(); ga.position.set(x + 0.06, y + 0.025, 0); ga.scale.setScalar(0.8); ga.rotation.y = 0.1; gr.add(ga); x += 0.12; }
  }
}
function estante(x0, x1, ys) {
  const gr = new THREE.Group();
  const XC = (x0 + x1) / 2, XW = x1 - x0;
  for (const y of ys) {
    gr.add(mesh(rbox(XW, 0.05, 0.42, 0.015), M.maderaC, XC, y, -0.07));
    gr.add(mesh(rbox(XW, 0.06, 0.03, 0.01), M.navy3, XC, y - 0.005, 0.15));
    llenar(gr, x0, x1, y);
  }
  for (const x of [x0, x1]) gr.add(mesh(rbox(0.06, ys[ys.length - 1] + 0.1, 0.44, 0.015), M.navy3, x, (ys[ys.length - 1] + 0.1) / 2, -0.07));
  return gr;
}
{
  const ef = estante(-1.45, 2.05, [0.95, 1.5, 2.05]); ef.position.z = BZ + 0.3; scene.add(ef);
  const ed = estante(-1.0, 0.9, [0.95, 1.5, 2.05]); ed.rotation.y = Math.PI / 2; ed.position.set(LX + 0.3, 0, 0.0); SIN_SECCION.add(ed);
}
// el mostrador (el de abren-hoy): navy3 con tapa de madera clara, filete verde y paneles
{
  const MX = MOSTRADOR;
  scene.add(mesh(rbox(MX.w, MX.y - 0.06, MX.d, 0.03), M.navy3, MX.x, (MX.y - 0.06) / 2, MX.z));
  scene.add(mesh(rbox(MX.w + 0.12, 0.06, MX.d + 0.1, 0.02), mat(0xc89a64, 0.55), MX.x, MX.y - 0.03, MX.z));
  scene.add(mesh(rbox(MX.w - 0.2, 0.06, 0.02, 0.01), M.g, MX.x, 0.3, MX.z + MX.d / 2 + 0.005));
  for (let i = 0; i < 3; i++) {
    const px = MX.x - MX.w / 2 + 0.33 + i * ((MX.w - 0.66) / 2);
    scene.add(mesh(rbox(0.46, 0.4, 0.02, 0.02), mat(0x2c4268, 0.6), px, 0.6, MX.z + MX.d / 2 + 0.01));
    scene.add(mesh(rbox(0.38, 0.32, 0.024, 0.02), M.navy3, px, 0.6, MX.z + MX.d / 2 + 0.014));
  }
  scene.add(mesh(rbox(MX.w, 0.035, 0.03, 0.01), M.cr2, MX.x, 0.84, MX.z + MX.d / 2 + 0.01));
}
// la puerta de vidrio y la campanita
const hoja = new THREE.Group();
const campanita = new THREE.Group();
{
  const vidrioM = new THREE.MeshPhysicalMaterial({ color: 0xfff0dc, roughness: 0.05, transparent: true, opacity: 0.12, depthWrite: false });
  hoja.position.set(LX - 0.02, 0, PUERTA.z1); scene.add(hoja);
  const W = PUERTA.z1 - PUERTA.z0;
  const hb = (z, y, d, h) => hoja.add(mesh(rbox(0.06, h, d, 0.015), M.navy3, 0, y, -z));
  hb(0.035, PUERTA.alto / 2, 0.07, PUERTA.alto - 0.02); hb(W - 0.035, PUERTA.alto / 2, 0.07, PUERTA.alto - 0.02); hb(W / 2, PUERTA.alto - 0.04, W, 0.08); hb(W / 2, 0.1, W, 0.2);
  const vp = new THREE.Mesh(new THREE.PlaneGeometry(W - 0.12, PUERTA.alto - 0.28), vidrioM); vp.position.set(0, PUERTA.alto / 2 + 0.06, -W / 2); vp.rotation.y = Math.PI / 2; vp.renderOrder = 5; hoja.add(vp);
  hoja.add(mesh(rbox(0.05, 0.3, 0.04, 0.015), mat(0xc9ccd2, 0.25, { metalness: 0.6 }), 0.06, 1.12, -(W - 0.08)));
  campanita.position.set(LX + 0.14, PUERTA.alto - 0.02, PUERTA.z1 - 0.18); scene.add(campanita);
  campanita.add(mesh(rbox(0.12, 0.02, 0.03, 0.006), M.navy3, -0.05, 0.0, 0));
  const cb = new THREE.Group(); cb.position.set(0.0, -0.01, 0); campanita.add(cb); campanita.userData.cb = cb;
  cb.add(mesh(new THREE.ConeGeometry(0.06, 0.1, 18, 1, true), mat(0xd9b04a, 0.25, { metalness: 0.7, side: THREE.DoubleSide }), 0, -0.06, 0));
  cb.add(mesh(new THREE.SphereGeometry(0.016, 10, 8), mat(0xb8902e, 0.3, { metalness: 0.7 }), 0, -0.115, 0));
}
const reloj = crearReloj(0.17); reloj.position.set(-0.95, 2.45, BZ + 0.03); scene.add(reloj);
const cajaReg = crearCaja(); cajaReg.position.set(-0.55, MY, -1.42); cajaReg.rotation.y = Math.PI - 0.25; scene.add(cajaReg);

// ================= OBJETOS NUEVOS =================
// caja kraft escrita con marcador navy (Caveat). Origen en la base, el texto en la cara +z. abierta: sin tapa, con
// las dos solapas abiertas (la de POLENTA, que está vacía)
const cajaGeo = {};
function crearCajaKraft(texto, { W = 0.36, H = 0.26, D = 0.3, abierta = false, px = 96 } = {}) {
  const g = new THREE.Group();
  const tx = lienzo(512, Math.round((512 * H) / W), (x, w, h) => {
    x.fillStyle = "#c9a46b"; x.fillRect(0, 0, w, h);
    x.fillStyle = "#b8925a"; x.fillRect(0, h * 0.08, w, 10); x.fillRect(0, h * 0.9, w, 8);
    x.fillStyle = "#16243d"; x.textAlign = "center"; x.textBaseline = "middle";
    let s = px; x.font = CAV(s); while (x.measureText(texto).width > w * 0.9 && s > 30) { s -= 4; x.font = CAV(s); }
    x.save(); x.translate(w / 2, h / 2 + 4); x.rotate(-0.04); x.fillText(texto, 0, 0); x.restore();
  });
  const fm = new THREE.MeshStandardMaterial({ map: tx, roughness: 0.85 });
  if (!abierta) {
    const k = `${W}|${H}|${D}`;
    const b = new THREE.Mesh((cajaGeo[k] ??= rbox(W, H, D, 0.008, 2)), [M.kraft, M.kraft, M.kraft, M.kraft, fm, M.kraft]); b.position.y = H / 2; b.castShadow = true; b.receiveShadow = true; g.add(b);
    const cinta = new THREE.Mesh(new THREE.BoxGeometry(W * 0.2, 0.004, D + 0.004), mat(0xb8925a, 0.6)); cinta.position.y = H + 0.001; g.add(cinta);
  } else {
    const e = 0.008;
    const p = (w, h, d, x, y, z, m = M.kraft) => { const o = mesh(new THREE.BoxGeometry(w, h, d), m, x, y, z); g.add(o); return o; };
    p(W, e, D, 0, e / 2, 0, M.kraftIn);
    p(W, H, e, 0, H / 2, D / 2 - e / 2, [M.kraft, M.kraft, M.kraft, M.kraft, fm, M.kraftIn]);
    p(W, H, e, 0, H / 2, -D / 2 + e / 2, [M.kraft, M.kraft, M.kraft, M.kraft, M.kraftIn, M.kraft]);
    p(e, H, D, W / 2 - e / 2, H / 2, 0, M.kraftIn); p(e, H, D, -W / 2 + e / 2, H / 2, 0, M.kraftIn);
    for (const s of [-1, 1]) { const f = new THREE.Group(); f.position.set(0, H, s * D / 2); g.add(f); const sol = mesh(new THREE.BoxGeometry(W * 0.96, e, D * 0.45), M.kraft, 0, 0, s * D * 0.22); f.add(sol); f.rotation.x = s * 1.1; }
  }
  g.userData.tam = [W, H, D];
  return g;
}
// frasco de dulce de leche casero: vidrio con el dulce marrón caramelo OPACO, tapa crema a cuadritos navy, etiqueta lisa
function crearFrasco(k = 1) {
  const g = new THREE.Group();
  const R = 0.058 * k, H = 0.13 * k;
  const cuerpo = mesh(new THREE.CylinderGeometry(R, R * 0.97, H, 32), mat(0x8a5a2b, 0.32), 0, H / 2, 0); g.add(cuerpo);
  const brillo = new THREE.Mesh(new THREE.PlaneGeometry(R * 0.25, H * 0.7), new THREE.MeshBasicMaterial({ color: 0xf6ead2, transparent: true, opacity: 0.55, depthWrite: false })); brillo.position.set(R * 0.55, H * 0.5, R * 0.84); brillo.rotation.y = 0.55; g.add(brillo);
  const et = lienzo(1024, 256, (x, w, h) => {
    x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h);
    x.fillStyle = "#0b1220"; x.textAlign = "center"; x.textBaseline = "middle"; x.font = F(800, 50); x.fillText("DULCE DE LECHE", w / 2, h / 2 + 4);
    x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 12); x.fillRect(0, h - 12, w, 12);
  });
  const etiq = new THREE.Mesh(new THREE.CylinderGeometry(R * 1.008, R * 1.006, H * 0.46, 40, 1, true, -Math.PI, Math.PI * 2), new THREE.MeshStandardMaterial({ map: et, roughness: 0.6 }));
  etiq.position.y = H * 0.48; g.add(etiq);
  const cuadri = lienzo(256, 64, (x, w, h) => { for (let i = 0; i < 16; i++) for (let j = 0; j < 4; j++) { x.fillStyle = (i + j) % 2 ? "#efeee5" : "#1f3254"; x.fillRect(i * 16, j * 16, 16, 16); } });
  const tapa = mesh(new THREE.CylinderGeometry(R * 1.08, R * 1.08, 0.035 * k, 32), [new THREE.MeshStandardMaterial({ map: cuadri, roughness: 0.6 }), mat(C.cr, 0.6), mat(C.cr, 0.6)], 0, H + 0.016 * k, 0); g.add(tapa);
  // el paño a cuadritos sobre la tapa (de casero)
  const pano = mesh(new THREE.CylinderGeometry(R * 1.25, R * 1.12, 0.01, 8), new THREE.MeshStandardMaterial({ map: cuadri, roughness: 0.8 }), 0, H + 0.038 * k, 0); g.add(pano);
  g.userData.alto = H + 0.045 * k;
  return g;
}
// el casco de obra blanco con una linterna cilíndrica atada al costado con cinta verde de marca (dos vueltas). En el
// espacio de la cabeza: centro del cráneo en y = 0.276. La linterna mira a +z.
function crearCasco() {
  const g = new THREE.Group();
  const blanco = mat(0xf7f6f0, 0.32);
  const cup = new THREE.Mesh(new THREE.SphereGeometry(0.33, 36, 18, 0, Math.PI * 2, 0, Math.PI * 0.5), blanco); cup.scale.set(1.0, 0.92, 1.02); cup.castShadow = true; g.add(cup);
  const cresta = mesh(rbox(0.07, 0.05, 0.6, 0.02), blanco, 0, 0.28, 0); cresta.scale.set(1, 1, 1); g.add(cresta);
  const ala = mesh(new THREE.CylinderGeometry(0.37, 0.37, 0.022, 40), blanco, 0, 0.0, 0.02); ala.scale.set(1.0, 1, 1.12); g.add(ala);
  const visera = mesh(rbox(0.36, 0.022, 0.14, 0.01), blanco, 0, 0.0, 0.38); visera.rotation.x = 0.12; g.add(visera);
  const lint = new THREE.Group(); lint.position.set(0.3, 0.13, 0.04); g.add(lint);
  lint.add(mesh(new THREE.CylinderGeometry(0.038, 0.038, 0.2, 18).rotateX(Math.PI / 2), mat(C.navy3, 0.35, { metalness: 0.3 })));
  lint.add(mesh(new THREE.CylinderGeometry(0.05, 0.04, 0.05, 18).rotateX(Math.PI / 2), mat(0x8d9096, 0.3, { metalness: 0.6 }), 0, 0, 0.12));
  const lente = new THREE.Mesh(new THREE.CircleGeometry(0.044, 24), new THREE.MeshBasicMaterial({ color: 0xfff2cf })); lente.position.z = 0.146; lint.add(lente);
  for (const z of [-0.05, 0.03]) { const c = mesh(new THREE.TorusGeometry(0.045, 0.012, 8, 24), M.g, 0, 0, z); lint.add(c); }
  // la cinta también da la vuelta por el casco (dos bandas verdes que lo abrazan)
  for (const z of [-0.05, 0.03]) { const c = mesh(new THREE.TorusGeometry(0.333, 0.012, 6, 48, Math.PI * 0.5), M.g, 0, 0.0, z); c.scale.set(1.0, 0.92, 1); g.add(c); }
  g.userData.lint = lint; g.userData.lente = lente;
  return g;
}
// la linterna de mano (P5): la misma, sola
function crearLinternaMano() {
  const g = new THREE.Group();
  g.add(mesh(new THREE.CylinderGeometry(0.032, 0.032, 0.2, 18).rotateX(Math.PI / 2), mat(C.navy3, 0.35, { metalness: 0.3 })));
  g.add(mesh(new THREE.CylinderGeometry(0.045, 0.035, 0.05, 18).rotateX(Math.PI / 2), mat(0x8d9096, 0.3, { metalness: 0.6 }), 0, 0, 0.12));
  const lente = new THREE.Mesh(new THREE.CircleGeometry(0.04, 24), new THREE.MeshBasicMaterial({ color: 0xfff2cf })); lente.position.z = 0.146; g.add(lente);
  return g;
}
// el haz: un cono crema translúcido con el borde marcado (un aro más opaco al final) y su SpotLight
function crearHaz(largo = 2.2, ang = 0.28) {
  const g = new THREE.Group();
  const r = Math.tan(ang) * largo;
  const geo = new THREE.ConeGeometry(r, largo, 40, 1, true); geo.translate(0, -largo / 2, 0); geo.rotateX(-Math.PI / 2);   // el vértice en el origen, abre hacia +z
  const cono = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: 0xfff0c8, transparent: true, opacity: 0.16, depthWrite: false, side: THREE.DoubleSide }));
  cono.renderOrder = 8; g.add(cono);
  const luz = new THREE.SpotLight(0xffe8bf, 0, 7, ang * 1.05, 0.25, 1.2); luz.castShadow = false; g.add(luz); g.add(luz.target); luz.target.position.set(0, 0, 2);
  g.userData = { cono, luz, largo };
  return g;
}
// el foco pelado: cable, portalámparas de baquelita navy, la lamparita (prendida = emisiva) y la cadenita con su bolita
const foco = new THREE.Group(); foco.position.copy(FOCO); scene.add(foco);
const focoBulbo = new THREE.Mesh(new THREE.SphereGeometry(0.06, 20, 14), new THREE.MeshBasicMaterial({ color: 0x6b6a62 }));
{
  const cable = mesh(new THREE.CylinderGeometry(0.008, 0.008, -LOSA - FOCO.y - 0.06, 6), M.navy, 0, (-LOSA - FOCO.y) / 2 + 0.03, 0); foco.add(cable);
  foco.add(mesh(new THREE.CylinderGeometry(0.03, 0.035, 0.07, 16), M.navy, 0, 0.03, 0));
  focoBulbo.position.y = -0.05; focoBulbo.scale.set(1, 1.15, 1); foco.add(focoBulbo);
  const cad = new THREE.Group(); cad.position.set(0.035, 0.0, 0); foco.add(cad); foco.userData.cad = cad;
  for (let i = 0; i < 12; i++) cad.add(mesh(new THREE.TorusGeometry(0.009, 0.0028, 4, 8), mat(0xb9bcc2, 0.3, { metalness: 0.7 }), 0, -0.02 - i * 0.034, 0)).rotation.y = (i % 2) * Math.PI / 2;
  cad.add(mesh(new THREE.SphereGeometry(0.018, 10, 8), mat(0x9a7a4a, 0.4), 0, -0.44, 0));
}
const focoLuz = new THREE.SpotLight(0xffd9a0, 0, 6, 1.0, 0.45, 1.1); focoLuz.position.copy(FOCO).add(V3(0, -0.06, 0)); focoLuz.target.position.copy(FOCO).add(V3(-0.3, -2, -0.2)); scene.add(focoLuz, focoLuz.target);
const focoFill = new THREE.PointLight(0xffd9a0, 0, 5, 1.2); focoFill.position.copy(FOCO).add(V3(0, -0.1, 0.4)); scene.add(focoFill);
// el cono de luz del foco (crema, borde marcado)
const conoFoco = (() => { const geo = new THREE.ConeGeometry(1.15, 1.5, 40, 1, true); geo.translate(0, -0.75, 0); const m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: 0xffeccb, transparent: true, opacity: 0.1, depthWrite: false, side: THREE.DoubleSide })); m.position.copy(FOCO).add(V3(0, -0.08, 0)); m.renderOrder = 7; scene.add(m); return m; })();

// ---------- la trampa: tapa de tablas con bisagras navy y argolla de hierro; la escalera marinera ----------
const tapaPiv = new THREE.Group(); tapaPiv.position.set(TR.x1, 0, TRC.z); scene.add(tapaPiv);
const ARGOLLA = V3(-(TR.x1 - TR.x0) + 0.14, 0.02, 0);   // en el espacio de la tapa
{
  const W = TR.x1 - TR.x0, D = TR.z1 - TR.z0;
  const tabla = lienzo(512, 512, (x, w, h) => { x.fillStyle = "#c89a64"; x.fillRect(0, 0, w, h); x.fillStyle = "#8f6638"; for (let i = 1; i < 5; i++) x.fillRect(i * (w / 5) - 4, 0, 8, h); x.fillStyle = "#b58650"; for (let i = 0; i < 5; i++) { x.fillRect(i * (w / 5) + 24, 120 + i * 37, 40, 6); x.fillRect(i * (w / 5) + 50, 340 - i * 21, 30, 5); } });
  const tm = new THREE.MeshStandardMaterial({ map: tabla, roughness: 0.6 });
  const t = mesh(new THREE.BoxGeometry(W - 0.01, 0.045, D - 0.01), [M.madera, M.madera, tm, M.madera, M.madera, M.madera], -W / 2, -0.0225 + 0.006, 0); tapaPiv.add(t);
  for (const s of [-1, 1]) { tapaPiv.add(mesh(rbox(0.08, 0.016, 0.12, 0.005), M.navy, -0.04, 0.012, s * D * 0.32)); tapaPiv.add(mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.12, 8).rotateX(Math.PI / 2), M.navy, 0.0, 0.012, s * D * 0.32)); }
  // travesaños de abajo (se ven cuando está abierta)
  for (const s of [-1, 1]) tapaPiv.add(mesh(new THREE.BoxGeometry(W * 0.86, 0.04, 0.07), M.madera, -W / 2, -0.04, s * D * 0.3));
  const arg = new THREE.Group(); arg.position.copy(ARGOLLA); tapaPiv.add(arg); tapaPiv.userData.arg = arg;
  arg.add(mesh(rbox(0.06, 0.012, 0.05, 0.004), M.navy, 0, 0, 0));
  const aro = mesh(new THREE.TorusGeometry(0.05, 0.011, 8, 24), mat(0x2a2f38, 0.35, { metalness: 0.6 }), 0.05, 0.004, 0); aro.rotation.x = Math.PI / 2; arg.add(aro); arg.userData.aro = aro;
}
{
  // la escalera marinera: dos largueros de madera y peldaños, del borde de adelante del hueco al piso del sótano
  const top = V3(0, 0.02, TR.z1 - 0.04), bot = V3(0, SY, TR.z1 + 0.16);
  const dir = bot.clone().sub(top), L = dir.length(); dir.normalize();
  const q = new THREE.Quaternion().setFromUnitVectors(V3(0, -1, 0), dir);
  for (const x of [TRC.x - 0.24, TRC.x + 0.24]) { const r = mesh(rbox(0.06, L + 0.12, 0.05, 0.01), M.maderaC, x, (top.y + bot.y) / 2, (top.z + bot.z) / 2); r.quaternion.copy(q); scene.add(r); }
  for (let i = 1; i < 9; i++) { const u = i / 9; const p = top.clone().lerp(bot, u); scene.add(mesh(rbox(0.48, 0.045, 0.06, 0.01), M.maderaC, TRC.x, p.y, p.z)); }
}
// ---------- el sótano: estantes de ángulo ranurado gris claro con cajas kraft ----------
const NIV = [0.32, 0.82, 1.32, 1.8].map((h) => SY + h);   // las bandejas
const EST = { x0: -1.45, x1: 1.0, z: BZ + 0.28, d: 0.42 };
{
  const gris = mat(0xc8ccd2, 0.45, { metalness: 0.4 });
  const ran = lienzo(64, 512, (x, w, h) => { x.fillStyle = "#c8ccd2"; x.fillRect(0, 0, w, h); x.fillStyle = "#6e7480"; for (let i = 0; i < 16; i++) x.fillRect(22, 14 + i * 32, 20, 12); });
  ran.wrapT = THREE.RepeatWrapping; ran.repeat.set(1, 4);
  const angM = new THREE.MeshStandardMaterial({ map: ran, roughness: 0.45, metalness: 0.4 });
  for (const x of [EST.x0, (EST.x0 + EST.x1) / 2, EST.x1]) for (const z of [EST.z - EST.d / 2, EST.z + EST.d / 2]) {
    const h = NIV[3] - SY + 0.08;
    const p = mesh(new THREE.BoxGeometry(0.05, h, 0.05), [angM, angM, gris, gris, angM, angM], x, SY + h / 2, z); scene.add(p);
  }
  for (const y of NIV) scene.add(mesh(new THREE.BoxGeometry(EST.x1 - EST.x0 + 0.06, 0.025, EST.d + 0.04), gris, (EST.x0 + EST.x1) / 2, y, EST.z));
}
// las cajas del sótano: [texto, x, nivel, rol]. Los roles: polenta (la que se sacude), avalancha (P4), azucar (cae en la
// cabeza), crash (P6), dulce (la última del fondo), cae2 (la que se le cae a Héctor en Q5)
const CAJAS = [];
function cajaEn(texto, x, niv, rol = "", op = {}) {
  const c = crearCajaKraft(texto, op); c.position.set(x, NIV[niv] + 0.0125, EST.z + 0.02); c.rotation.y = (hash(x * 7 + niv) - 0.5) * 0.12; scene.add(c);
  const o = { c, texto, x, niv, rol, base: c.position.clone(), rotBase: c.rotation.y };
  CAJAS.push(o); return o;
}
{
  // fila de abajo
  cajaEn("YERBA", -1.22, 0); cajaEn("ARROZ", -0.82, 0); cajaEn("FIDEOS", -0.42, 0); cajaEn("YERBA", 0.38, 0); cajaEn("HARINA", 0.78, 0);
  // segunda
  cajaEn("FIDEOS", -1.22, 1); cajaEn("ARROZ", -0.4, 1); cajaEn("POLENTA", 0.72, 1, "polenta", { abierta: true });
  // tercera
  cajaEn("FIDEOS", -1.22, 2, "crash"); cajaEn("ARROZ", -0.84, 2, "crash"); cajaEn("YERBA", -0.44, 2, "crash"); cajaEn("HARINA", 0.0, 2, "aval"); cajaEn("AZÚCAR", 0.4, 2);
  // arriba: la última del fondo, la avalancha y el azúcar que cae
  cajaEn("FIDEOS", -1.24, 3); cajaEn("DULCE DE LECHE", -0.84, 3, "dulce", { px: 70 }); cajaEn("FIDEOS", -0.46, 3, "aval"); cajaEn("ARROZ", -0.08, 3, "aval"); cajaEn("AZÚCAR", 0.32, 3, "azucar"); cajaEn("YERBA", 0.72, 3);
}
// parte 2: los frascos de dulce de leche ordenados en el segundo estante (12) y la caja que se le cae a Héctor
const FRASCOS2 = [];
for (let i = 0; i < 6; i++) for (let j = 0; j < 2; j++) { const f = crearFrasco(0.95); f.position.set(-1.38 + i * 0.13, NIV[1] + 0.0125, EST.z - 0.08 + j * 0.13); scene.add(f); FRASCOS2.push(f); }
const caeH = crearCajaKraft("ARROZ"); scene.add(caeH);
// ---------- utilería que se mueve ----------
const frasco = crearFrasco(1.25); scene.add(frasco);
const cajaPolenta = CAJAS.find((c) => c.rol === "polenta");
const cajaAzucar = CAJAS.find((c) => c.rol === "azucar");
const cajaDulce = CAJAS.find((c) => c.rol === "dulce");
const casco = crearCasco(); scene.add(casco);
const hazCasco = crearHaz(2.4, 0.27); casco.userData.lint.add(hazCasco); hazCasco.position.z = 0.15;
const lintMano = crearLinternaMano(); scene.add(lintMano);
const hazMano = crearHaz(2.2, 0.25); lintMano.add(hazMano); hazMano.position.z = 0.15;
const mateR = crearMate(); mateR.scale.setScalar(1.25); scene.add(mateR);
const termo = crearTermo(); termo.scale.setScalar(1.3); termo.position.set(-0.18, MY, -1.58); termo.rotation.y = 0.6; scene.add(termo);
const MATE_C = V3(0.55, MY, -1.5);
const bolsa = crearBolsaPapel(); bolsa.scale.setScalar(0.85); scene.add(bolsa);
const yerbaB = crearYerba(); yerbaB.scale.setScalar(0.8); yerbaB.position.set(-0.03, 0.2, 0.0); yerbaB.rotation.z = 0.15; bolsa.add(yerbaB);
const mochila = crearMochila(); scene.add(mochila);
const banco = crearBanquito(0.55); scene.add(banco);
// la escalera tijera de aluminio (peldaños con estrías): se tambalea en P6 (gira alrededor de una pata)
const tijera = new THREE.Group(); tijera.position.set(TJ.x, SY, TJ.z); scene.add(tijera);
{
  const H = 0.95, ab = 0.32;
  const pata = (x, z0, z1) => { const p0 = V3(x, 0, z0), p1 = V3(x, H, z1); const d = p1.clone().sub(p0); const m = mesh(rbox(0.045, d.length(), 0.03, 0.008), M.alu, x, H / 2, (z0 + z1) / 2); m.quaternion.setFromUnitVectors(V3(0, 1, 0), d.normalize()); tijera.add(m); };
  for (const x of [-0.22, 0.22]) { pata(x, ab, 0.02); pata(x, -ab, -0.02); }
  const estr = lienzo(256, 64, (x, w, h) => { x.fillStyle = "#c9ced6"; x.fillRect(0, 0, w, h); x.fillStyle = "#8d939c"; for (let i = 0; i < 12; i++) x.fillRect(8 + i * 20, 8, 8, h - 16); });
  const em = new THREE.MeshStandardMaterial({ map: estr, roughness: 0.4, metalness: 0.5 });
  for (let i = 1; i <= 3; i++) { const u = i / 4; tijera.add(mesh(new THREE.BoxGeometry(0.44, 0.025, 0.1), [M.alu, M.alu, em, M.alu, M.alu, M.alu], 0, H * u, ab * (1 - u) + 0.0)); }
  tijera.add(mesh(rbox(0.48, 0.04, 0.16, 0.01), M.alu, 0, H, 0));
}
// las partículas de polvo (con semilla): un enjambre que flota y cae en el haz (P7-P8) y nubes de polvo (palmea, crash)
const NP = 130;
const polvoG = new THREE.SphereGeometry(1, 6, 4);
const polvoM = new THREE.MeshStandardMaterial({ color: 0xe8e2cc, roughness: 1, emissive: 0xefeee5, emissiveIntensity: 0.25, transparent: true, opacity: 0.7, depthWrite: false });
const polvo = new THREE.InstancedMesh(polvoG, polvoM, NP); polvo.castShadow = false; polvo.frustumCulled = false; scene.add(polvo);
const _pm = new THREE.Matrix4(), _pq = new THREE.Quaternion(), _ps = new THREE.Vector3(), _pp = new THREE.Vector3();

// ================= LOS PERSONAJES =================
const ruben = crearPersonaje({ ...ELENCO.almacenero, dedos: true, mechones: true, parpadeoCada: 999, parpadeosExtra: [2.0, 6.0, 11.8, 17.6, 24.2, 27.9, 31.4] });
const graciela = crearPersonaje({ ...ELENCO.clienta, dedos: true, parpadeoCada: 999, parpadeosExtra: [1.9, 24.9] });
const hector = crearPersonaje({ ...ELENCO.hector, dedos: true, parpadeoCada: 999, parpadeosExtra: [11.6, 19.0, 26.5, 31.0] });
const walter = crearPersonaje({ ...ELENCO.walter, dedos: true, parpadeoCada: 999, parpadeosExtra: [] });
const marta = crearPersonaje({ ...ELENCO.duena, dedos: true, parpadeoCada: 999, parpadeosExtra: [] });
const TODOS = [ruben, graciela, hector, walter, marta];
for (const p of TODOS) { scene.add(p.raiz); p.raiz.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } }); }
// los lentes un poco más adentro de la cara (de el-audio / anotamelo)
function lentesAdentro(per, color) {
  const CC = 0.3 * 0.92;
  per.cabeza.traverse((l) => {
    if (!l.isMesh || l.parent !== per.cabeza) return;
    const esL = (l.material.color && l.material.color.getHex() === color && (l.geometry.type === "TorusGeometry" || l.geometry.type === "CylinderGeometry")) || (l.material.isMeshBasicMaterial && l.geometry.type === "CircleGeometry");
    if (!esL) return;
    l.position.y -= CC; l.position.multiplyScalar(1.04 / 1.13); l.position.y += CC;
    if (Math.abs(l.scale.y - 0.26) < 1e-6) l.visible = false;
    if (Math.abs(l.scale.y - 0.07) < 1e-6 && Math.abs(l.scale.x - 0.011) < 1e-6) l.position.x = -0.035;
  });
}
lentesAdentro(graciela, 0x16243d); lentesAdentro(hector, 0x1f3254);
const arosDe = (per, color) => per.cabeza.children.filter((l) => l.isMesh && l.geometry.type === "TorusGeometry" && l.material.color && l.material.color.getHex() === color && l.parent === per.cabeza);
const LENTES = [[graciela, arosDe(graciela, 0x16243d)], [hector, arosDe(hector, 0x1f3254)]];
const _lc = new THREE.Vector3(), _lf = new THREE.Vector3(), _le = new THREE.Vector3(), _lw = new THREE.Vector3();
function lenteLejano(per, aros) {
  per.cabeza.updateMatrixWorld(true);
  per.cabeza.getWorldPosition(_lc); _lf.set(0, 0, 1).transformDirection(per.cabeza.matrixWorld); _le.copy(camera.position).sub(_lc);
  _lf.y = 0; _le.y = 0; _lf.normalize(); _le.normalize();
  const ang = Math.acos(cl(_lf.dot(_le), -1, 1));
  let lejos = null, dmax = -1;
  for (const a of aros) { a.visible = true; a.getWorldPosition(_lw); const d = _lw.distanceTo(camera.position); if (d > dmax) { dmax = d; lejos = a; } }
  if (ang > 0.62 && lejos) lejos.visible = false;
  per.cabeza.children.forEach((l) => { if (l.isMesh && l.geometry.type === "CylinderGeometry" && Math.abs(l.scale.y - 0.07) < 1e-6) l.visible = ang <= 0.62; });
}
const HERR = ruben.cabeza.children.find((o) => o.isGroup && Math.abs(o.scale.y - 1.3) < 1e-6);
const _hc = new THREE.Vector3(), _hf2 = new THREE.Vector3(), _he = new THREE.Vector3();
function herraduraSegunCamara() {
  if (!HERR) return;
  ruben.cabeza.updateMatrixWorld(true); ruben.cabeza.getWorldPosition(_hc);
  _hf2.set(0, 0, 1).transformDirection(ruben.cabeza.matrixWorld); _he.copy(camera.position).sub(_hc); _hf2.y = 0; _he.y = 0; _hf2.normalize(); _he.normalize();
  HERR.visible = Math.acos(cl(_hf2.dot(_he), -1, 1)) < 1.9;
}
// ---- el estado de Rubén: polvo (manchas crema2 opacas en los hombros y la pelada), la telaraña de la oreja derecha
// (-x) al hombro, la caja de sombrero (AZÚCAR), el casco. Todo pegado al cuerpo.
const manchasPolvo = new THREE.Group(); ruben.cuerpo.add(manchasPolvo);
const polvoMat = mat(0xd9d4c2, 0.95);
{
  semilla = 41;
  for (const s of [-1, 1]) for (let i = 0; i < 9; i++) { const m = new THREE.Mesh(polvoG, polvoMat); const a = az() * 0.9, b = az(); m.position.set(s * (0.13 + b * 0.09), 0.44 + a * 0.05, -0.04 + az() * 0.12); m.scale.set(0.022 + az() * 0.018, 0.006, 0.02 + az() * 0.015); m.rotation.z = s * 0.4; manchasPolvo.add(m); }
}
const manchasPelada = new THREE.Group(); ruben.cabeza.add(manchasPelada);
{
  semilla = 77;
  for (let i = 0; i < 5; i++) { const a = (az() - 0.5) * 0.9, e = 0.95 + az() * 0.4; const m = new THREE.Mesh(polvoG, polvoMat); m.position.set(Math.sin(a) * Math.cos(e) * 0.3, 0.276 + Math.sin(e) * 0.292, Math.cos(a) * Math.cos(e) * 0.285); m.lookAt(V3(0, 0.276, 0).add(m.position.clone().sub(V3(0, 0.276, 0)).multiplyScalar(2))); m.scale.set(0.03 + az() * 0.02, 0.025, 0.006); manchasPelada.add(m); }
}
const telarana = crearTelarana(0.2, 0.0045, 9);
const telaGr = new THREE.Group(); telaGr.add(telarana); ruben.cabeza.add(telaGr);
telaGr.position.set(0.29, 0.25, 0.02); telaGr.rotation.set(0, Math.PI / 2, Math.PI * 1.05);   // de la oreja derecha hacia el hombro
const telaH = crearTelarana(0.16, 0.0042, 13); const telaHG = new THREE.Group(); telaHG.add(telaH); scene.add(telaHG);   // la de Héctor (Q5), en el casco
const cajaSombrero = crearCajaKraft("AZÚCAR", { W: 0.6, H: 0.3, D: 0.56 }); ruben.cabeza.add(cajaSombrero);
cajaSombrero.position.set(0.02, 0.74, 0.0); cajaSombrero.rotation.set(Math.PI + 0.05, 0.25, 0.2);   // boca abajo sobre la cabeza
const CASCO_CAB = { p: V3(0, 0.39, 0.01), r: V3(-0.06, 0, 0) };   // el casco calzado (espacio de la cabeza)

// ================= GLOBOS (pegados a la cámara, en píxeles de pantalla; de anotamelo) =================
const PXK = 1000;
function crearGlobo(lineas, px = 74, { cola = true, fondo = "#efeee5", tinta = "#0b1220", borde = C.navy } = {}) {
  const med = document.createElement("canvas").getContext("2d");
  med.font = F(800, px * 2);
  const anchoT = Math.max(...lineas.map((l) => med.measureText(l).width)) / 2;
  const W = Math.round(anchoT + px * 1.3), H = Math.round(lineas.length * px * 1.2 + px * 0.9);
  const tex = lienzo(W * 2, H * 2, (x, w, h) => {
    x.fillStyle = fondo; x.fillRect(0, 0, w, h);
    x.fillStyle = tinta; x.font = F(800, px * 2); x.textAlign = "center"; x.textBaseline = "middle";
    lineas.forEach((l, i) => x.fillText(l, w / 2, h / 2 + (i - (lineas.length - 1) / 2) * px * 2 * 1.2 + px * 0.08));
  });
  const g = new THREE.Group();
  const bordeM = new THREE.MeshBasicMaterial({ color: borde });
  const cuerpoM = new THREE.MeshBasicMaterial({ color: new THREE.Color(fondo) });
  const sombraM = new THREE.MeshBasicMaterial({ color: 0x050a14 });
  const w = W / PXK, h = H / PXK, R = Math.min(h / 2, 40 / PXK), B = 8 / PXK;
  const sombra = new THREE.Mesh(rbox(w + 2 * B, h + 2 * B, 0.02, R + B, 4), sombraM); sombra.position.set(12 / PXK, -14 / PXK, -0.016); g.add(sombra);
  const bord = new THREE.Mesh(rbox(w + 2 * B, h + 2 * B, 0.02, R + B, 4), bordeM); bord.position.z = -0.012; g.add(bord);
  const caja2 = new THREE.Mesh(rbox(w, h, 0.03, R, 4), [cuerpoM, cuerpoM, cuerpoM, cuerpoM, new THREE.MeshBasicMaterial({ map: tex }), cuerpoM]); g.add(caja2);
  const colaG = new THREE.Group(); g.add(colaG); colaG.visible = cola;
  const tri = (ancho, largo) => { const s = new THREE.Shape(); s.moveTo(-ancho / 2, 0); s.lineTo(ancho / 2, 0); s.lineTo(0, -largo); s.closePath(); return new THREE.ShapeGeometry(s); };
  const cs = new THREE.Mesh(tri(80 / PXK, 104 / PXK), sombraM); cs.position.set(12 / PXK, -8 / PXK, -0.017); colaG.add(cs);
  const cb = new THREE.Mesh(tri(80 / PXK, 104 / PXK), bordeM); cb.position.z = -0.013; cb.position.y = 6 / PXK; colaG.add(cb);
  const cc = new THREE.Mesh(tri(54 / PXK, 78 / PXK), cuerpoM); cc.position.z = 0.016; cc.position.y = 4 / PXK; colaG.add(cc);
  sombra.userData.orden = 0; cs.userData.orden = 0; bord.userData.orden = 1; cb.userData.orden = 2; cc.userData.orden = 3; caja2.userData.orden = 4;
  g.userData = { W, H, cola: colaG };
  return pegarACamara(g, camera, 40);
}
const halfK = () => (2 * Math.tan((camera.fov * D2R) / 2)) / 1920;
let TOPE = 130;   // el borde de arriba mínimo de los globos (más abajo cuando está el chip)
function ponerGlobo(g, cx, cy, s, objetivo, orden = 0, giro = 0) {
  g.visible = s > 0.6;
  if (!g.visible) return;
  const k = halfK();
  const { W, H, cola } = g.userData;
  cx = W + 200 > 1080 ? 540 : cl(cx, W / 2 + 90, 990 - W / 2);
  cy = cl(cy, H / 2 + TOPE, 1700 - H / 2);
  g.position.set((cx - 540) * k, (960 - cy) * k, -1);
  g.scale.setScalar(k * PXK * s);
  g.rotation.z = giro;
  g.traverse((o) => { if (o.isMesh) o.renderOrder = 40 + orden * 6 + (o.userData.orden || 0); });
  const ox = objetivo ? objetivo[0] : cx, oy = objetivo ? objetivo[1] : cy + 400;
  const lado = cl((ox - cx) / (W / 2), -0.62, 0.62);
  if (oy >= cy) {
    cola.position.set((lado * W) / 2 / PXK, -H / 2 / PXK + 4 / PXK, 0);
    cola.rotation.z = cl(Math.atan2(ox - (cx + (lado * W) / 2), oy - (cy + H / 2)), -0.9, 0.9);
  } else {
    cola.position.set((lado * W) / 2 / PXK, H / 2 / PXK - 4 / PXK, 0);
    cola.rotation.z = Math.PI - cl(Math.atan2(ox - (cx + (lado * W) / 2), (cy - H / 2) - oy), -0.9, 0.9);
  }
}
const _v = new THREE.Vector3();
function enPantalla(v) { _v.copy(v).project(camera); return [(_v.x + 1) * 540, (1 - _v.y) * 960]; }
const bocaPx = (per) => { per.raiz.updateMatrixWorld(true); return enPantalla(per.cabeza.localToWorld(new THREE.Vector3(0, 0.181, 0.3))); };
const GL = {
  r1: crearGlobo(["Ya me fijo."], 84),
  r2: crearGlobo(["No, no queda."], 84),
  w1: crearGlobo(["¿Y fideos?"], 80),
  no2: crearGlobo(["No."], 96),
  m1: crearGlobo(["¿Azúcar", "te queda?"], 78),
  no3: crearGlobo(["No."], 96),
  h1: crearGlobo(["¿Te queda", "dulce de leche?"], 80),
  r3: crearGlobo(["Queda uno."], 92),
  h2a: crearGlobo(["Ah, no."], 88),
  h2b: crearGlobo(["Era para saber."], 84),
  h3: crearGlobo(["¿Y yerba?"], 88),
  g1b: crearGlobo(["¿Te queda polenta?"], 78),
  r4: crearGlobo(["Quedan tres."], 84),
  h4: crearGlobo(["¿Y dulce", "de leche?"], 80),
  r5: crearGlobo(["Doce."], 96),
  h5: crearGlobo(["Era para saber."], 84),
  r6: crearGlobo(["Ahora sabés."], 88),
};

// ---------- la tablet "Stock" (parte 2): en un atril sobre el mostrador, del lado de Rubén ----------
const TW = 900, TH = 640;
const tabT = lienzo(TW, TH, () => {});
const tablet = crearTablet(tabT, 0.44, 0.31, 0.75); scene.add(tablet);
const TAB_P = V3(0.82, MY, -1.48);
let claveT = "";
function dibujarTablet(t) {
  const fila = t >= T.fila && t < T.q2 ? 1 : 0;
  const av = t >= T.vibra ? (t >= T.pedido ? 2 : 1) : 0;
  const ka = av ? Math.round(sg(t, av === 1 ? T.vibra : T.pedido, (av === 1 ? T.vibra : T.pedido) + 0.12) * 4) / 4 : 0;
  const clave = `${fila}|${av}|${ka}`; if (clave === claveT) return; claveT = clave;
  const { x } = tabT.userData, W = TW, H = TH;
  x.fillStyle = "#0b1220"; x.fillRect(0, 0, W, H);
  x.fillStyle = "#efeee5"; x.textAlign = "left"; x.textBaseline = "middle"; x.font = F(800, 66); x.fillText("Stock", 36, 60);
  x.fillStyle = "#5ce611"; x.fillRect(0, 108, W, 10);
  const filas = [["Polenta", "3"], ["Dulce de leche", "12"], ["Fideos", "24"], ["Azúcar", "9"], ["Yerba", "2"]];
  filas.forEach(([n, m], i) => {
    const y = 128 + i * 102, hf = 92, roja = n === "Yerba", verde = i === 0 && fila;
    x.fillStyle = verde ? "#5ce611" : roja ? "#c7655b" : i % 2 ? "#16243d" : "#1f3254"; x.beginPath(); x.roundRect(18, y, W - 36, hf, 18); x.fill();
    x.fillStyle = verde || roja ? "#0b1220" : "#efeee5"; x.font = F(800, 60); x.textAlign = "left"; x.fillText(n, 44, y + hf / 2 + 2);
    x.textAlign = "right"; x.font = F(900, 64); x.fillText(m, W - 44, y + hf / 2 + 2);
  });
  if (av) {
    // (ronda 1) el aviso: una tarjeta DENTRO de la pantalla que tapa toda la lista (también la fila roja). Rojo apagado
    // "Yerba · quedan 2" (~0,85 s) → verde "Pedido armado ✓". Entra deslizando desde arriba pero siempre recortada a la pantalla.
    const verde = av === 2;
    x.save(); x.beginPath(); x.rect(0, 118, W, H - 118); x.clip();
    if (verde) { x.fillStyle = "#c7655b"; x.fillRect(0, 118, W, H - 118); }   // la roja queda abajo mientras baja la verde
    x.translate(0, (1 - ka) * -(H - 118));
    x.fillStyle = verde ? "#5ce611" : "#c7655b"; x.fillRect(0, 118, W, H - 118);
    x.fillStyle = "#0b1220"; x.textAlign = "center"; x.textBaseline = "middle";
    if (!verde) { x.font = F(900, 92); x.fillText("Yerba", W / 2, 270); x.font = F(900, 110); x.fillText("quedan 2", W / 2, 400); x.font = F(700, 50); x.fillText("Avisando…", W / 2, 540); }
    else { x.font = F(900, 96); x.fillText("Pedido", W / 2, 280); x.fillText("armado ✓", W / 2, 400); }
    x.restore();
  }
  tabT.needsUpdate = true;
}
dibujarTablet(0);

// ================= CÁMARA =================
// PLANOS: [nombre, desde, claves]; cada clave [t, px, py, pz, mx, my, mz, fov]. Entre planos, corte seco; dentro de un
// plano, Catmull-Rom continua. Los de la parte 2 repiten el encuadre de su par de la parte 1 (P1→Q1, P4→Q5, P9→Q3).
const AP1 = (k = 0) => [0.42 + k * 0.25, 2.35 - k * 0.15, 1.15 - k * 0.35, 0.78 + k * 0.15, 0.85, -2.0, 62 - k * 6];
const SEC = (yc, dist, fov = 38, x = 0.45) => [x, yc, FZ + dist, x, yc, -1, fov];
const BAJO = (k = 0) => [1.45, 0.62 + k * 0.04, 0.3 - k * 0.15, 1.52, 0.38 + k * 0.03, -2.05, 48];
const CERCA6 = (k = 0) => [0.9 - k * 0.04, 1.35, 0.25 - k * 0.15, 1.52, 0.78, -2.02, 46];
const HECTOR = (k = 0) => [1.05, 1.42, -1.6 + k * 0.05, -0.32, 1.32, -0.72, 50 - k * 2];
const DOS = (k = 0) => [-0.85 + k * 0.05, 1.95, 1.15 - k * 0.05, 1.15, 0.85, -2.2, 52];
const PUE = (k = 0) => [1.6 - k * 0.75, 1.55 - k * 0.05, 0.95 - k * 0.3, -1.0, 1.15 + k * 0.2, -0.05 + k * 0.25, 50 - k * 8];
const DOS2 = (k = 0) => [-0.25 + k * 0.05, 1.5, 0.95, 0.75, 0.95, -1.3, 52];
const RUBEN2 = (k = 0) => [0.2 + k * 0.06, 1.5, -0.45 - k * 0.12, 1.52, 1.12, -2.05, 46];
const TAB = (k = 0) => [TAB_P.x + 0.42 - k * 0.04, MY + 0.55 - k * 0.04, TAB_P.z + 0.72 - k * 0.08, TAB_P.x, MY + 0.15, TAB_P.z, 42];
const PLANOS = [
  ["P1", 0, [[0, ...AP1(0)], [T.va[0], ...AP1(0.2)], [T.p2, ...AP1(0.5)]]],
  // la zambullida: arriba del hueco, baja con Rubén, atraviesa el hueco y entra al sótano; push-in a la caja
  ["P2", T.p2, [[T.p2, 1.05, 2.05, -0.55, 1.52, -0.2, -2.05, 52], [T.p2 + 0.3, 1.3, 1.5, -1.1, 1.52, -1.0, -2.1, 54], [T.baja1[1], 1.45, 0.75, -1.65, 1.52, -2.0, -2.05, 56]]],
  // corte (whoosh) al sótano: plano general desde adelante, el foco se prende, la caja de polenta
  ["P2b", T.baja1[1], [[T.baja1[1], 1.95, -0.85, 0.0, 1.0, -1.75, -2.0, 58], [T.cadena, 1.92, -0.9, -0.08, 0.5, -1.5, -2.1, 57], [T.luz + 0.12, 1.85, -0.95, -0.15, 0.45, -1.55, -2.2, 56], [T.sacude[0], 1.75, -0.95, -0.25, 0.75, -1.55, -2.4, 48], [T.p3, 1.7, -1.0, -0.4, 0.75, -1.55, -2.4, 45]]],
  ["P3", T.p3, [[T.p3, ...BAJO(0)], [T.p4, ...BAJO(1)]]],
  // la sección de casa de muñecas (dolly atrás)
  // (ronda 1) P4 y P5 en un solo plano de sección (Walter se va, Marta llega a otro lugar del mostrador)
  ["P4", T.p4, [[T.p4, 0.9, 0.35, FZ + 2.4, 0.9, 0.2, -1, 40], [T.p4 + 0.55, ...SEC(-0.4, 7.7)], [T.no2, ...SEC(-0.42, 7.7)], [T.p6a, ...SEC(-0.6, 7.3)]]],
  // P6a: Héctor en el mostrador pregunta (contraplano desde atrás de la trampa)
  ["P6a", T.p6a, [[T.p6a, 1.15, 1.45, -1.7, -0.32, 1.25, -0.72, 50], [T.p6, 1.12, 1.45, -1.65, -0.32, 1.28, -0.72, 48]]],
  ["P6", T.p6, [[T.p6, ...CERCA6(0)], [T.p6b, ...CERCA6(1)]]],
  ["P6b", T.p6b, [[T.p6b, ...SEC(0.2, 7.6)], [T.p6b + 0.45, ...SEC(-0.75, 7.0)], [T.p7, ...SEC(-0.8, 6.9)]]],
  // la grúa: sube con Rubén por la trampa, contraluz del frasco
  ["P7", T.p7, [[T.p7, 1.4, 0.35, 0.55, 1.52, 0.45, -2.0, 50], [T.trofeo[0], 1.38, 0.8, 0.35, 1.52, 0.9, -2.0, 48], [T.p8, 1.36, 1.0, 0.15, 1.52, 1.05, -2.0, 46]]],
  ["P8", T.p8, [[T.p8, 1.05, 1.62, -0.15, 1.5, 1.08, -1.98, 46], [T.p9, 1.08, 1.58, -0.3, 1.5, 1.08, -1.98, 44]]],
  ["P9", T.p9, [[T.p9, ...HECTOR(0)], [T.p10, ...HECTOR(1)]]],
  ["P10", T.p10, [[T.p10, 1.6, 1.55, 0.95, -0.45, 1.15, -0.62, 50], [T.vaPuerta[1], ...PUE(0)], [T.cruza[1], ...PUE(0.3)], [T.clic2, ...PUE(1)], [P1, ...PUE(1.15)]]],
  // ---- parte 2 ----
  ["Q1", P2, [[P2, ...AP1(0)], [T.mira, ...AP1(0.3)], [T.q2, ...AP1(0.6)]]],
  ["Q2", T.q2, [[T.q2, ...DOS(0)], [T.q3, ...DOS(0.8)]]],
  ["Q3", T.q3, [[T.q3, 1.1, 1.5, -1.65, -0.32, 1.35, -0.72, 48], [T.q3b, 1.08, 1.5, -1.6, -0.32, 1.35, -0.72, 46]]],
  ["Q3b", T.q3b, [[T.q3b, ...RUBEN2(0)], [T.q4, ...RUBEN2(1)]]],
  ["Q4", T.q4, [[T.q4, ...TAB(0)], [T.q6, ...TAB(1)]]],
  ["Q6", T.q6, [[T.q6, 0.62, 1.55, 0.25, 1.12, 1.18, -2.0, 60], [DUR, 0.64, 1.53, 0.05, 1.12, 1.18, -2.0, 57]]],
];
const _m = new THREE.Vector3();
let planoActual = "P1";
function catmull(CAM, t) {
  let i = 0; while (i + 1 < CAM.length - 1 && CAM[i + 1][0] <= t) i++;
  const a = CAM[i], b = CAM[i + 1];
  const u = sg(t, a[0], b[0]);
  const p1 = a.slice(1, 8), p2 = b.slice(1, 8);
  const p0 = i > 0 ? CAM[i - 1].slice(1, 8) : p1;
  const p3 = i + 2 < CAM.length ? CAM[i + 2].slice(1, 8) : p2;
  const u2 = u * u, u3 = u2 * u;
  return p1.map((_, j) => 0.5 * (2 * p1[j] + (-p0[j] + p2[j]) * u + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * u2 + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * u3));
}
function ponerCamara(t) {
  let pi = 0; while (pi + 1 < PLANOS.length && PLANOS[pi + 1][1] <= t) pi++;
  planoActual = PLANOS[pi][0];
  const v = catmull(PLANOS[pi][2], t);
  const mano = Math.sin(t * 0.9) * 0.003;
  camera.up.set(0, 1, 0);
  camera.position.set(v[0] + mano, v[1] + Math.sin(t * 0.67) * 0.002, v[2]);
  camera.fov = v[6];
  camera.updateProjectionMatrix();
  _m.set(v[3], v[4], v[5]);
  camera.lookAt(_m);
}
const SECCIONES = ["P4", "P6b"];

// ================= POSES =================
const aC = (giro = 0, asiente = 0, ladea = 0.03) => ({ cabeza: { giro, asiente, ladea }, ojos: { x: giro * 0.6, y: 0.05 } });
const APOYA = { manoI: [0.26, 0.43, 0.4], manoD: [-0.26, 0.43, 0.4], codoI: null, codoD: null, dedoI: 0, dedoD: 0 };
const ESCALA = { manoI: [0.3, 0.5, 0.32], manoD: [-0.3, 0.5, 0.32], codoI: [1, -0.6, -0.4], codoD: [-1, -0.6, -0.4], dedoI: 0, dedoD: 0 };   // manos en los largueros
const BORDE = { manoI: [0.3, 0.2, 0.34], manoD: [-0.3, 0.2, 0.34], codoI: [1, -0.4, -0.3], codoD: [-1, -0.4, -0.3], dedoI: 0, dedoD: 0 };     // manos en el piso, asomado
const NADA = { ...CARA.neutra, ojos: { abiertos: 0.75, tension: 0.2, feliz: 0 }, cejas: { alto: 0.05, ang: 0.15 }, boca: { sonrisa: -0.2, abierta: 0, ancho: 0.95 } };
const BUENA = { ...CARA.sonrisa, ojos: { abiertos: 1, feliz: 0.3 }, boca: { sonrisa: 0.6, abierta: 0, ancho: 1.05 } };
const _w = new THREE.Vector3();
function manoA(per, pose, lado, mundo) {
  per.poner(pose); per.raiz.updateMatrixWorld(true);
  const l = per.cuerpo.worldToLocal(_w.copy(mundo));
  const k = per.cfg.alto || 1;
  pose[`mano${lado}`] = [l.x / k, l.y / k, l.z / k];
  return pose;
}
const manoMundo = (per, lado, out = new THREE.Vector3()) => { per.raiz.updateMatrixWorld(true); return per.brazos[lado === "I" ? 0 : 1].mano.getWorldPosition(out); };
const dedosMano = (per, lado, out = new THREE.Vector3()) => { per.raiz.updateMatrixWorld(true); return per.brazos[lado === "I" ? 0 : 1].mano.localToWorld(out.set(0, -0.1, 0.02)); };
function manoConDedos(per, pose, lado, mundo) {
  const p1 = manoA(per, { ...pose }, lado, mundo); per.poner(p1);
  const tip = dedosMano(per, lado, new THREE.Vector3());
  return manoA(per, { ...pose }, lado, mundo.clone().add(mundo.clone().sub(tip)));
}
const bocaVoz = (p, t, t0, env, k = 0.7) => {
  if (t >= t0 && t < t0 + env.length / 30) { const i = Math.floor((t - t0) * 30), f = (t - t0) * 30 - i; const e = lerp(env[i] ?? 0, env[i + 1] ?? 0, f); p.boca.abierta = Math.max(p.boca.abierta, cl(e * 1.1 - 0.05) * k); }
};
const mezclaManos = (pose, p1, k, lados = ["I", "D"]) => { for (const l of lados) { pose[`mano${l}`] = pose[`mano${l}`].map((v, i) => lerp(v, p1[`mano${l}`][i], k)); if (k > 0.5) { pose[`codo${l}`] = p1[`codo${l}`]; pose[`dedo${l}`] = p1[`dedo${l}`] ?? 0; } } };
const mirarA = (x0, z0, x, z) => Math.atan2(x - x0, z - z0);

// ---------- Rubén: dónde está (piso, escalera, sótano, tijera) ----------
const ESC = { x: TRC.x, z: ESC_Z };
const ASOMA = -0.72;   // la altura de los pies cuando asoma por la trampa (hombros arriba del piso)
const ENTIJ = { x: TJ.x, z: TJ.z + 0.08 };   // parado en la tijera (de espaldas a la cámara, hacia el estante)
const PIE_TJ = { x: TJ.x + 0.05, z: TJ.z + 0.5 };
const SHELF_P = { x: 0.72, z: -2.38 };      // frente a la caja de polenta
const AZU_P = { x: 0.32, z: -2.36 };        // abajo de la caja de azúcar
// tramos: [t0, t1, desde, hasta, paso]
const RK = [];
const k = (t, pose, dur = 0.3, curva) => RK.push([t, pose, dur, curva]);
const lin = (u) => u;
// parte 1
k(0, { x: RI.x, y: 0, z: RI.z, giro: -0.25, inclina: 0.04, paso: 0, ...APOYA, ...aC(-0.25, 0.04), ...CARA.neutra, ojos: { x: -0.3, y: 0, abiertos: 0.95 }, boca: { sonrisa: 0.25 } });
k(T.r1 - 0.05, { ...aC(-0.3, 0.02), ...BUENA }, 0.2);
k(T.va[0] + 0.12, { giro: 1.55, paso: 1, ...aC(0.0, 0.05), ...CARA.neutra }, 0.12);
k(T.va[1], { x: 0.98, z: -1.98 }, T.va[1] - T.va[0] - 0.12, lin);
k(T.abre[0] + 0.05, { paso: 0, giro: 1.45, inclina: 0.42, ...aC(0, 0.35) }, 0.1);
k(T.abre[1], { inclina: 0.12, ...aC(0.1, 0.1) }, 0.2);
// P2: a la escalera y abajo
k(T.p2 - 0.001, { x: ESC.x, z: ESC.z, y: -0.05, giro: 0, inclina: 0.05, paso: 1, ...aC(0, -0.05), ...CARA.neutra, ojos: { x: 0, y: -0.3, abiertos: 0.9 } }, 0.001);
k(T.baja1[1], { y: SY }, T.baja1[1] - T.p2, lin);
k(T.cadena - 0.06, { x: 0.55, z: -1.8, giro: -1.3, paso: 0, ...aC(-0.1, -0.3), ojos: { x: 0, y: 0.5, abiertos: 0.95 } }, T.cadena - 0.06 - T.baja1[1]);
k(T.agarra[0] + 0.15, { x: SHELF_P.x, z: SHELF_P.z, giro: Math.PI, paso: 1 }, 0.15, lin);
k(T.agarra[1], { paso: 0, inclina: 0.1 }, 0.1);
k(T.sacude[0], { giro: 0.4, inclina: 0.04, ...aC(0, 0.15), ...CARA.neutra, ojos: { x: 0, y: -0.5, abiertos: 0.9 }, cejas: { alto: 0.3, ang: 0.4 } }, 0.12);
k(T.sacude[1], { ...NADA, ojos: { x: 0, y: -0.6, abiertos: 0.75 } }, 0.2);
// P3: asoma por la trampa con polvo
k(T.p3 - 0.001, { x: ESC.x, z: ESC.z, y: -1.5, giro: 0, paso: 1, inclina: 0.05, ...aC(0, 0), ...NADA, ojos: { x: 0, y: 0.1, abiertos: 0.78 } }, 0.001);
k(T.sube1[1], { y: ASOMA, paso: 0 }, T.sube1[1] - T.p3, lin);
k(T.palmea[0], { ...aC(-0.35, 0.15) }, 0.15);
k(T.palmea[1] + 0.2, { ...aC(0, 0.0) }, 0.25);
// P4: baja, tijera, avalancha, sube con la telaraña
k(T.baja2[0], { paso: 1 }, 0.05);
k(T.baja2[1], { y: SY }, T.baja2[1] - T.baja2[0], lin);
k(T.tij2[1], { x: PIE_TJ.x, z: PIE_TJ.z, giro: Math.PI }, T.tij2[1] - T.tij2[0], lin);
k(T.tij2[2], { x: ENTIJ.x, z: ENTIJ.z, y: SY + 0.48 }, T.tij2[2] - T.tij2[1], lin);
k(T.aval + 0.06, { paso: 0, ...aC(0, -0.4), ojos: { y: 0.6, abiertos: 1 } }, 0.06);
k(T.aval + 0.3, { inclina: -0.1, ...CARA.sorpresa }, 0.15);
k(T.bajaT2[1], { x: PIE_TJ.x, z: PIE_TJ.z, y: SY, paso: 1, inclina: 0.05, ...aC(0, 0), ...NADA }, T.bajaT2[1] - T.bajaT2[0], lin);
k(T.sube2[1], { x: ESC.x, z: ESC.z, giro: 0 }, T.sube2[1] - T.sube2[0], lin);
k(T.sube2[2], { y: ASOMA, paso: 0 }, T.sube2[2] - T.sube2[1], lin);
// P5: baja, el foco, la linterna, la caja en la cabeza, sube
k(T.baja3[0], { paso: 1 }, 0.05);
k(T.baja3[1], { y: SY }, T.baja3[1] - T.baja3[0], lin);
k(T.quema + 0.05, { paso: 0, giro: -0.4, ...aC(0, -0.45), ...CARA.sorpresa, ojos: { y: 0.6, abiertos: 1 } }, 0.08);
k(T.camina3[1], { x: AZU_P.x, z: AZU_P.z, giro: Math.PI, paso: 1, ...aC(0, 0.0), ...NADA }, T.camina3[1] - T.camina3[0], lin);
k(T.cae - 0.02, { paso: 0 }, 0.05);
k(T.cae + 0.12, { inclina: 0.18, aplasta: 0.08 }, 0.08);
k(T.sube3[0], { inclina: 0.06, aplasta: 0 }, 0.1);
k(T.sube3[1], { x: ESC.x, z: ESC.z, giro: 0, paso: 1 }, T.sube3[1] - T.sube3[0], lin);
k(T.sube3[2], { y: ASOMA, paso: 0, ...NADA }, T.sube3[2] - T.sube3[1], lin);
// P6: la caja de sombrero, el casco, la expedición
k(T.h1 + 0.4, { ...aC(-0.45, 0.05), ojos: { x: -0.6, y: 0.05, abiertos: 0.75 } }, 0.25);
k(T.casco[0], { ...aC(-0.2, 0.15), ojos: { x: -0.3, y: -0.2, abiertos: 0.8 } }, 0.2);
k(T.clic + 0.05, { ...aC(-0.4, 0.0), ojos: { x: -0.6, y: 0.05, abiertos: 0.85 }, cejas: { alto: -0.1, ang: -0.2 }, boca: { sonrisa: -0.1 } }, 0.15);
k(T.baja4[0], { paso: 1, ...aC(0, 0) }, 0.05);
k(T.baja4[1], { y: SY }, T.baja4[1] - T.baja4[0], lin);
k(T.tij4[1], { x: PIE_TJ.x, z: PIE_TJ.z, giro: Math.PI }, T.tij4[1] - T.tij4[0], lin);
k(T.tij4[2], { x: ENTIJ.x - 0.05, z: ENTIJ.z, y: SY + 0.71, inclina: 0.18 }, T.tij4[2] - T.tij4[1], lin);
k(T.tambalea[0] + 0.1, { paso: 0, ladea: 0.25, giro: Math.PI + 0.3, ...aC(0.2, -0.3) }, 0.1);
k(T.ultima, { ladea: 0.35 }, 0.25);
k(T.crash + 0.05, { ladea: 0.05, ...CARA.sorpresa }, 0.12);
k(T.bajaT4[1], { x: PIE_TJ.x, z: PIE_TJ.z, y: SY, paso: 1, ladea: 0, giro: Math.PI, ...aC(0, 0), ...NADA }, T.bajaT4[1] - T.bajaT4[0], lin);
k(T.sube4[1], { x: ESC.x, z: ESC.z, giro: 0 }, T.sube4[1] - T.sube4[0], lin);
k(T.sube4[2], { y: -1.5 }, T.sube4[2] - T.sube4[1], lin);
// P7: asoma destruido y levanta el frasco
k(T.p7 - 0.001, { x: ESC.x, z: ESC.z, y: -1.1, giro: 0, paso: 1, ladea: 0, inclina: 0.04, ...aC(0, 0.0), ...NADA }, 0.001);
k(T.asoma[1], { y: -0.58, paso: 0 }, T.asoma[1] - T.asoma[0], lin);
k(T.trofeo[1], { inclina: -0.06, ...aC(0.05, -0.12), ...CARA.feliz, ojos: { x: 0, y: 0.2, abiertos: 0.85, feliz: 0.4 }, boca: { sonrisa: 0.7, abierta: 0.15, ancho: 1.1 } }, 0.2);
// P8: la pausa (quieto, la sonrisa se le va)
k(T.p8 + 0.5, { ...aC(-0.35, 0.02), ojos: { x: -0.5, y: 0, abiertos: 0.85 }, boca: { sonrisa: 0.35, abierta: 0, ancho: 1 } }, 0.4);
// P9: Héctor habla; Rubén queda con cara de nada
k(T.h2 + 1.0, { ...NADA, ...aC(-0.4, 0.02) }, 0.3);
// P10: sale de la trampa (fuera de cuadro), cruza, le calza el casco a Héctor
k(T.p10 - 0.001, { x: 1.38, y: 0, z: -0.82, giro: -1.9, paso: 0, inclina: 0.04, ...APOYA, ...aC(0, 0), ...NADA }, 0.001);
k(T.cruza[0] + 0.05, { paso: 1 }, 0.05);
k(T.cruza[1], { x: -0.55, z: -0.6, giro: -0.6 }, T.cruza[1] - T.cruza[0], lin);
k(T.cruza[1] + 0.08, { paso: 0 }, 0.08);
// parte 2: sentado en el banquito arriba de la trampa cerrada, con el mate
const SENT = { x: TRC.x, z: -2.0 };
k(P2 - 0.001, { x: SENT.x, y: 0.0, z: SENT.z, giro: -0.55, sentado: 1, inclina: 0.1, ladea: 0, paso: 0, aplasta: 0, ...aC(0.1, 0.1), ...BUENA, ojos: { x: 0.2, y: 0, abiertos: 1, feliz: 0.25 } }, 0.001);
k(T.mira, { ...aC(-0.25, 0.4), ojos: { x: -0.3, y: -0.7, abiertos: 0.95, feliz: 0 } }, 0.2);
k(T.q2, { ...aC(-0.55, 0.05), ojos: { x: -0.6, y: 0, abiertos: 1, feliz: 0.3 } }, 0.2);
k(T.r5 - 0.05, { ...aC(-0.25, 0.4), ojos: { x: -0.3, y: -0.7, abiertos: 0.95, feliz: 0.2 } }, 0.2);
k(T.q3b, { ...aC(-0.45, 0.05), ...BUENA, ojos: { x: -0.5, y: 0, abiertos: 1, feliz: 0.35 } }, 0.2);
// Q5: se levanta con el banquito y se corre; Q6: se sienta al costado y levanta el mate
k(T.q6, { giro: -0.4, ...aC(-0.1, 0.0), ...BUENA, ojos: { x: 0, y: 0.05, abiertos: 1, feliz: 0.4 } }, 0.25);
RK.sort((a, b) => a[0] - b[0]);

// ---------- Héctor, Walter, Marta, Graciela ----------
const G1 = { x: 0.06, z: -0.42 };
const hacia = (x, z) => mirarA(x, z, ESC.x, ESC.z);
const CLIP = (extra = {}) => ({ x: CLI.x, z: CLI.z, y: 0, giro: hacia(CLI.x, CLI.z), inclina: 0.04, paso: 0, ...APOYA, ...aC(0, 0.04), ...CARA.sonrisa, ...extra });
const PUERTA_IN = V3(LX + 0.45, 0, 0.2);
const CLI2 = { x: 0.12, z: -0.78 };
function entraSale(t, tIn, tOut, desde = PUERTA_IN, dest = CLI) {
  // entra rápido desde la puerta y sale hacia ella (time-lapse)
  const a = eo(sg(t, tIn[0], tIn[1])), b = tOut ? eio(sg(t, tOut[0], tOut[1])) : 0;
  const x = lerp(lerp(desde.x, dest.x, a), desde.x, b), z = lerp(lerp(desde.z, dest.z, a), desde.z, b);
  const andando = (a > 0 && a < 1) || (b > 0 && b < 1);
  const giro = b > 0 ? mirarA(dest.x, dest.z, desde.x, desde.z) : a < 1 ? mirarA(desde.x, desde.z, dest.x, dest.z) : hacia(dest.x, dest.z);
  return { x, z, paso: andando ? 1 : 0, giro, vis: t >= tIn[0] && (!tOut || t < tOut[1]) };
}

// ================= ESCENA EN EL TIEMPO =================
const _a = new THREE.Vector3(), _b = new THREE.Vector3(), _q = new THREE.Quaternion();
function cabezaMundo(per, local) { per.cabeza.updateMatrixWorld(true); return per.cabeza.localToWorld(local.clone()); }
function ponerCascoEn(per) { per.cabeza.updateMatrixWorld(true); casco.position.copy(per.cabeza.localToWorld(CASCO_CAB.p.clone())); per.cabeza.getWorldQuaternion(casco.quaternion); casco.quaternion.multiply(_q.setFromEuler(new THREE.Euler(CASCO_CAB.r.x, 0, 0))); }

function renderAt(tIn) {
  const t = en(tIn, P1, P2) ? (tIn < (P1 + P2) / 2 ? P1 - 0.001 : P2) : tIn;
  const parte2 = t >= P2;
  ponerCamara(t);
  const plano = planoActual;
  const seccion = SECCIONES.includes(plano);
  SECCION.visible = seccion; SIN_SECCION.visible = !seccion;
  scene.background = seccion ? FONDO_SEC : FONDO_DIA;

  // ---------- luz del sótano: el foco (prendido de T.luz a T.quema en la parte 1; siempre en la parte 2) ----------
  const prendido = parte2 || (t >= T.luz && t < T.quema);
  const parpadeo = !parte2 && en(t, T.quema - 0.12, T.quema) ? (Math.floor(t * 40) % 2 ? 0.2 : 1) : 1;
  focoLuz.intensity = prendido ? 9 * parpadeo : 0; focoFill.intensity = prendido ? 1.6 * parpadeo : 0;
  focoBulbo.material.color.setHex(prendido ? 0xfff1c6 : 0x6b6a62);
  conoFoco.visible = prendido && parpadeo > 0.5;
  // el foco se balancea un poco (la cadenita) y se mueve cuando tiran
  const tir = en(t, T.cadena - 0.1, T.cadena + 0.6) ? Math.sin((t - T.cadena) * 14) * 0.12 * Math.exp(-(t - T.cadena) * 4) : 0;
  foco.rotation.z = tir; conoFoco.rotation.z = tir * 0.5;
  // el hemisférico más bajo en los planos del sótano (penumbra)
  const abajo = ["P2b"].includes(plano);
  cielo.intensity = abajo ? 0.55 : 1.0; sol.intensity = abajo ? 1.2 : 2.4;
  relleno.position.copy(camera.position).add(V3(0.4, 0.8, 0)); relleno.target.position.copy(camera.position).add(camera.getWorldDirection(_a).multiplyScalar(3));

  // ---------- la tapa de la trampa ----------
  let abierta = 0;
  if (!parte2) abierta = eio(sg(t, T.abre[0] + 0.05, T.abre[1]));
  else abierta = 0;   // (ronda 1) en la parte 2 la trampa queda cerrada
  tapaPiv.rotation.z = -abierta * (Math.PI / 2 + 0.06);
  tapaPiv.userData.arg.userData.aro.rotation.x = Math.PI / 2 - abierta * 1.4;

  // ================= RUBÉN =================
  const pr = poseEn(t, RK);
  // el mate (P1 en la mano derecha hasta que lo deja; parte 2 en la izquierda)
  let mateEnMano = null;
  if (!parte2 && t < T.va[0] + 0.05) { pr.manoD = [-0.16, 0.5, 0.42]; pr.codoD = [-1, -0.6, -0.2]; mateEnMano = "D"; }
  if (!parte2 && en(t, T.va[0] - 0.15, T.va[0] + 0.05)) { ruben.poner(pr); const p1 = manoConDedos(ruben, { ...pr }, "D", MATE_C.clone().add(V3(0, 0.1, 0))); mezclaManos(pr, p1, eio(sg(t, T.va[0] - 0.15, T.va[0])), ["D"]); }
  if (parte2) { pr.manoI = [0.2, 0.42, 0.36]; pr.codoI = [1, -0.6, -0.2]; mateEnMano = "I"; }
  // la argolla (P1)
  if (!parte2 && en(t, T.abre[0] - 0.1, T.abre[1] + 0.1)) {
    ruben.poner(pr); tapaPiv.updateMatrixWorld(true);
    const ar = tapaPiv.localToWorld(ARGOLLA.clone().add(V3(0.05, 0.03, 0)));
    const p1 = manoConDedos(ruben, { ...pr }, "D", ar);
    const kk = eio(sg(t, T.abre[0] - 0.1, T.abre[0] + 0.05)) * (1 - eio(sg(t, T.abre[1] - 0.1, T.abre[1] + 0.1)));
    mezclaManos(pr, p1, kk, ["D"]);
  }
  // en la escalera: las manos en los largueros; asomado: las manos en el piso
  const enEsc = Math.abs(pr.x - ESC.x) < 0.02 && Math.abs(pr.z - ESC.z) < 0.02 && pr.y < -0.02 && pr.y > SY + 0.02;
  const asomado = enEsc && pr.y > ASOMA - 0.05 && !pr.paso;
  if (enEsc && !asomado) Object.assign(pr, ESCALA);
  if (asomado) Object.assign(pr, BORDE);
  // en la tijera: subiendo, manos en la tijera; arriba, los brazos al estante
  const enTij = Math.abs(pr.x - ENTIJ.x) < 0.12 && pr.y > SY + 0.05 && !parte2;
  if (enTij) Object.assign(pr, { manoI: [0.25, 0.85, 0.32], manoD: [-0.25, 0.85, 0.32], codoI: [1, -0.5, -0.3], codoD: [-1, -0.5, -0.3] });
  // la cadenita (P2): la mano derecha arriba, tira
  if (!parte2 && en(t, T.cadena - 0.2, T.cadena + 0.2)) {
    ruben.poner(pr); foco.updateMatrixWorld(true);
    const bola = foco.localToWorld(V3(0.035, -0.44 - (en(t, T.cadena - 0.02, T.cadena + 0.08) ? 0.05 : 0), 0));
    const p1 = manoConDedos(ruben, { ...pr, codoD: [-1, -0.4, -0.3] }, "D", bola);
    mezclaManos(pr, p1, eio(sg(t, T.cadena - 0.2, T.cadena - 0.08)) * (1 - eio(sg(t, T.cadena + 0.08, T.cadena + 0.2))), ["D"]);
  }
  // la caja de polenta (P2): la agarra y la sacude frente al pecho
  const conPolenta = !parte2 && en(t, T.agarra[1] - 0.05, T.p3);
  if (conPolenta) {
    const sac = en(t, T.sacude[0] + 0.05, T.sacude[1]) ? Math.sin((t - T.sacude[0]) * 38) : 0;
    const kk = eio(sg(t, T.agarra[1] - 0.05, T.sacude[0]));
    const alto = lerp(0.6, 0.36, kk) + sac * 0.04, adel = lerp(0.42, 0.4, kk);
    Object.assign(pr, { manoI: [0.2, alto, adel], manoD: [-0.2, alto, adel], codoI: [1, -0.6, -0.2], codoD: [-1, -0.6, -0.2] });
  }
  // palmea el polvo del hombro (P3)
  if (!parte2 && en(t, T.palmea[0], T.palmea[1] + 0.12)) {
    const kk = eio(sg(t, T.palmea[0], T.palmea[0] + 0.1)) * (1 - eio(sg(t, T.palmea[1], T.palmea[1] + 0.12)));
    const golpe = Math.abs(Math.sin((t - T.palmea[0]) * 18)) * 0.04;
    mezclaManos(pr, { manoI: [-0.14, 0.5 + golpe, 0.16], codoI: [1, -0.2, 0.2], dedoI: 0 }, kk, ["I"]);
  }
  // la linterna de mano (P5): en la derecha, apuntando adelante
  const conLinterna = !parte2 && en(t, T.linterna - 0.08, T.p6);
  if (conLinterna && !enEsc && !asomado) { pr.manoD = [-0.2, 0.5, 0.42]; pr.codoD = [-1, -0.6, -0.2]; }
  // P6: se saca la caja (dos manos a la caja), agarra el casco del mostrador y se lo calza
  const enP6 = !parte2 && en(t, T.h1 + 0.2, T.baja4[0]);
  if (enP6) {
    ruben.poner(pr);
    const top = cabezaMundo(ruben, V3(0, 0.62, 0.0));
    if (en(t, T.sacaCaja[0] - 0.15, T.sacaCaja[1] + 0.15)) {
      const kk = eio(sg(t, T.sacaCaja[0] - 0.15, T.sacaCaja[0])) * (1 - eio(sg(t, T.sacaCaja[1], T.sacaCaja[1] + 0.15)));
      const lev = eio(sg(t, T.sacaCaja[0], T.sacaCaja[1]));
      const izq = top.clone().add(V3(0.36, -0.08 + lev * 0.15, 0.05)), der = top.clone().add(V3(-0.36 - lev * 0.4, -0.08 + lev * 0.1, 0.05 + lev * 0.1));
      const p1 = manoConDedos(ruben, { ...pr, codoI: [1, 0, -0.3] }, "I", izq); const p2 = manoConDedos(ruben, { ...pr, codoD: [-1, 0, -0.3] }, "D", der);
      mezclaManos(pr, { ...p1, manoD: p2.manoD, codoD: p2.codoD }, kk);
    }
    if (en(t, T.casco[0] - 0.12, T.casco[2] + 0.12)) {
      const kk = eio(sg(t, T.casco[0] - 0.12, T.casco[0])) * (1 - eio(sg(t, T.casco[2], T.casco[2] + 0.12)));
      const hb = cascoMundoP6(t);
      const p1 = manoConDedos(ruben, { ...pr, codoI: [1, -0.2, -0.3] }, "I", hb.clone().add(V3(0.26, 0.0, 0.0)));
      const p2 = manoConDedos(ruben, { ...pr, codoD: [-1, -0.2, -0.3] }, "D", hb.clone().add(V3(-0.26, 0.0, 0.0)));
      const lados = t < T.casco[1] ? ["I"] : ["I", "D"];
      mezclaManos(pr, { ...p1, manoD: p2.manoD, codoD: p2.codoD, dedoD: 0 }, kk, lados);
    }
    if (en(t, T.clic - 0.12, T.clic + 0.2)) {
      const kk = eio(sg(t, T.clic - 0.12, T.clic - 0.02)) * (1 - eio(sg(t, T.clic + 0.08, T.clic + 0.2)));
      mezclaManos(pr, { manoI: [0.3, 1.0, 0.12], codoI: [1, 0, -0.2], dedoI: 1 }, kk, ["I"]);
    }
  }
  // P6b: arriba de la tijera, el brazo izquierdo estirado hacia la última caja
  if (!parte2 && en(t, T.tambalea[0], T.crash + 0.1) && enTij) { pr.manoI = [0.62, 0.95, 0.32]; pr.codoI = [1, 0, -0.2]; }
  // el frasco: lo lleva en la derecha desde que lo saca; P7 lo levanta como trofeo
  const conFrasco = !parte2 && t >= T.ultima + 0.05 && t < T.p10;
  if (conFrasco && !enEsc) {
    const kk = plano === "P7" || t >= T.p8 ? eio(sg(t, T.trofeo[0], T.trofeo[1])) : 0;
    pr.manoD = [lerp(-0.24, -0.36, kk), lerp(0.42, 1.15, kk), lerp(0.36, 0.34, kk)]; pr.codoD = [-1, -0.2, -0.3];
  }
  if (conFrasco && enEsc && !asomado) { pr.manoD = [-0.24, 0.55, 0.35]; }
  if (conFrasco && asomado) { const kk = eio(sg(t, T.trofeo[0], T.trofeo[1])); pr.manoD = [lerp(-0.3, -0.36, kk), lerp(0.2, 1.15, kk), lerp(0.34, 0.34, kk)]; pr.codoD = [-1, -0.2, -0.3]; }
  // P10: se saca el casco y se lo calza a Héctor
  const swap = !parte2 && t >= T.sacaCasco[0] - 0.05 && t < P1;
  // parte 2: el banquito (Q5 lo levanta), la mano derecha toca la tablet al mirar
  if (parte2 && en(t, T.mira - 0.1, T.r4 + 0.5)) {
    ruben.poner(pr); tablet.updateMatrixWorld(true);
    const tp = tablet.userData.pivote.localToWorld(V3(-0.05, 0.31 * 0.82, 0.04));
    const p1 = manoConDedos(ruben, { ...pr, codoD: [-1, -0.5, -0.2] }, "D", tp);
    mezclaManos(pr, { ...p1, dedoD: 1 }, eio(sg(t, T.mira - 0.1, T.mira + 0.1)) * (1 - eio(sg(t, T.r4 + 0.3, T.r4 + 0.5))), ["D"]);
  }
  if (t >= T.q6) { const kq = eio(sg(t, T.q6 + 0.25, T.q6 + 0.6)); pr.manoD = [lerp(-0.2, -0.38, kq), lerp(0.42, 0.66, kq), 0.38]; pr.codoD = [-1, -0.6, -0.2]; pr.manoI = [0.26, 0.3, 0.38]; pr.codoI = [1, -0.6, -0.2]; mateEnMano = "D"; }
  bocaVoz(pr, t, T.r1, ENV.r1, 0.55); bocaVoz(pr, t, T.r2, ENV.r2, 0.55); bocaVoz(pr, t, T.r3, ENV.r3, 0.6);
  bocaVoz(pr, t, T.r4, ENV.r4, 0.55); bocaVoz(pr, t, T.r5, ENV.r5, 0.55); bocaVoz(pr, t, T.r6, ENV.r6, 0.55);
  // tambalea: toda la figura se mece con la escalera
  ruben.poner(pr);
  const mece = !parte2 && en(t, T.tambalea[0], T.crash + 0.15) ? Math.sin((t - T.tambalea[0]) * 16) * 0.06 * (1 - sg(t, T.crash, T.crash + 0.15)) : 0;
  tijera.rotation.z = mece; tijera.position.x = TJ.x;
  if (enTij && mece) { ruben.raiz.rotation.z = mece; ruben.raiz.position.x += Math.sin(mece) * (pr.y - SY); }
  else ruben.raiz.rotation.z = 0;

  // ---- el estado de Rubén ----
  const dañado = (a) => !parte2 && t >= a;
  manchasPolvo.visible = dañado(T.p3);
  manchasPelada.visible = dañado(T.p6b);
  // la telaraña: desde la avalancha hasta que se descuelga en la pausa (cae como una cortina)
  telaGr.visible = dañado(T.aval + 0.25) && t < T.descuelga[1] + 0.3;
  if (telaGr.visible) {
    telarana.userData.crecer(Math.min(1, sg(t, T.aval + 0.25, T.aval + 0.4) + 0.01));
    const u = eio(sg(t, T.descuelga[0], T.descuelga[1]));
    telaGr.position.set(0.29, 0.25 - u * 0.55, 0.02 + u * 0.05); telaGr.rotation.set(u * 0.4, Math.PI / 2, Math.PI * 1.05 - u * 0.4);
    telaGr.scale.setScalar(1 - u * 0.15);
    // cuando cae, queda colgando del hombro (no desaparece en el aire: se oculta recién al salir de cuadro)
  }
  // la caja de sombrero: desde que le cae (P5) hasta que se la saca (P6)
  const sombrero = !parte2 && en(t, T.cae, T.sacaCaja[1]);
  cajaSombrero.visible = sombrero && t < T.sacaCaja[0];
  // ================= LOS CLIENTES =================
  const pg = poseEn(t, [[0, { x: G1.x, z: G1.z, y: 0, giro: Math.PI - 0.3, inclina: 0.05, ...BRAZOS.costado, ...aC(0.15, 0.04), ...CARA.sonrisa, ojos: { x: 0.3, abiertos: 1, feliz: 0.3 } }], [T.r1 + 0.6, { ...aC(0.55, 0.02), ojos: { x: 0.5, y: 0, abiertos: 1 } }, 0.4]]);
  graciela.poner(pg);
  { const p1 = manoA(graciela, { ...pg, codoD: [-0.6, -0.6, 0.4] }, "D", V3(G1.x - 0.02, MY + 0.3, -0.9)); pg.manoD = p1.manoD; pg.codoD = p1.codoD; }
  bocaVoz(pg, t, T.g1, ENV.g1, 0.6); bocaVoz(pg, t, T.g1b, ENV.g1, 0.6);
  graciela.poner(pg);

  // Walter (P4) y Marta (P5): time-lapse desde la puerta al mostrador
  const W = entraSale(t, T.entraW, T.saleW), Ma = entraSale(t, T.entraM, T.saleM, PUERTA_IN, CLI2);
  const pw = CLIP({ ...W, ...CARA.sonrisa, ...aC(0.1, -0.05) }); pw.giro = W.giro;
  if (en(t, T.no2, T.p5 + 0.6)) Object.assign(pw, { ...CARA.sorpresa, cejas: { alto: 0.6, ang: 0.4 } });
  bocaVoz(pw, t, T.w1, ENV.w1, 0.55); walter.poner(pw);
  const pm = CLIP({ ...Ma, ...CARA.sonrisa, ...aC(0.1, -0.05) }); pm.giro = Ma.giro; pm.x = Ma.x; pm.z = Ma.z;
  if (en(t, T.no3, T.p6a)) Object.assign(pm, { ...CARA.sorpresa });
  bocaVoz(pm, t, T.m1, ENV.m1, 0.6); marta.poner(pm);

  // Héctor
  let ph = CLIP({ ...CARA.sonrisa, ...aC(0.1, 0.0) });
  let hv = false;
  if (!parte2 && t >= T.entraH[0] && t < P1) {
    hv = true;
    const E = entraSale(t, T.entraH, null); Object.assign(ph, { x: E.x, z: E.z, paso: E.paso, giro: E.giro });
    // P6b: espera, silba mirando el techo; P7-P9 encantado; P10 a la puerta y se da vuelta
    if (en(t, T.p6b, T.p7)) { const kg = eio(sg(t, T.p6b + 0.1, T.p6b + 0.38)); Object.assign(ph, { giro: lerp(hacia(CLI.x, CLI.z), 0.5, kg), ...aC(0.1, -0.45 * kg), ojos: { x: 0.2, y: 0.8 * kg, abiertos: 1 }, boca: { sonrisa: 0.3, abierta: 0, ancho: 0.9 }, ...BRAZOS.costado }); }
    if (t >= T.p7) Object.assign(ph, { ...CARA.sonrisa, ...aC(0.0, 0.04), ojos: { x: 0, y: 0, abiertos: 1, feliz: 0.35 } });
    if (t >= T.h2 - 0.05) Object.assign(ph, { ...CARA.feliz, ojos: { x: 0, y: 0, abiertos: 1, feliz: 0.45 } });
    // se toca la boina
    if (en(t, T.boina - 0.15, T.p10)) { const kk = eio(sg(t, T.boina - 0.15, T.boina + 0.05)) * (1 - eio(sg(t, T.boina + 0.3, T.boina + 0.45))); ph.manoD = [lerp(-0.26, -0.24, kk), lerp(0.43, 1.02, kk), lerp(0.4, 0.2, kk)]; ph.codoD = [-1, -0.2, -0.2]; }
    if (t >= T.p10) {
      const u = eio(sg(t, T.vaPuerta[0], T.vaPuerta[1]));
      const D = V3(-1.0, 0, 0.25);
      Object.assign(ph, { x: lerp(CLI.x, D.x, u), z: lerp(CLI.z, D.z, u), paso: u > 0 && u < 1 ? 1 : 0, ...BRAZOS.costado });
      const vuelta = eio(sg(t, T.vaPuerta[1], T.h3));
      ph.giro = lerp(mirarA(CLI.x, CLI.z, D.x, D.z), Math.PI / 2 + 0.15, vuelta);
      Object.assign(ph, { ...CARA.sonrisa, ...aC(0.0, 0.0), ojos: { x: 0, y: 0, abiertos: 1, feliz: 0.3 } });
      if (t >= T.calza[0]) Object.assign(ph, { ...aC(0, -0.05), ojos: { x: 0, y: 0.3, abiertos: 0.95 } });
      if (t >= T.clic2) { const b2 = Math.sin(Math.PI * sg(t, T.parpadea[0], T.parpadea[1])); Object.assign(ph, { ...CARA.sorpresa, ojos: { x: 0, y: 0.1, abiertos: 1 - 0.9 * Math.min(1, b2 * 1.5) }, boca: { sonrisa: 0.1, abierta: 0.1, ancho: 0.8 } }); }
    }
  }
  if (parte2 && t >= T.entraH2[0]) {
    hv = true;
    const u = eo(sg(t, T.entraH2[0], T.entraH2[1]));
    Object.assign(ph, { x: lerp(PUERTA_IN.x, CLI.x, u), z: lerp(PUERTA_IN.z, CLI.z, u), paso: u < 1 ? 1 : 0, giro: u < 1 ? mirarA(PUERTA_IN.x, PUERTA_IN.z, CLI.x, CLI.z) : hacia(CLI.x, CLI.z), ...CARA.feliz, ...aC(0, 0.0), ojos: { x: 0, y: 0, abiertos: 1, feliz: 0.4 } });
    if (t >= T.r5 + 0.3) Object.assign(ph, { ...CARA.esperanza, cejas: { alto: 0.5, ang: 0.6 }, boca: { sonrisa: 0.1, abierta: 0, ancho: 0.85 } });
    if (t >= T.q4) Object.assign(ph, { ...CARA.incredula });
  }
  bocaVoz(ph, t, T.h1, ENV.h1, 0.6); bocaVoz(ph, t, T.h2, ENV.h2a, 0.6); bocaVoz(ph, t, T.h2b, ENV.h2b, 0.6); bocaVoz(ph, t, T.h3, ENV.h3, 0.6);
  bocaVoz(ph, t, T.h4, ENV.h4, 0.6); bocaVoz(ph, t, T.h5, ENV.h5, 0.6);
  hector.poner(ph);
  // el casco: del mostrador a la cabeza (P6); torcido al volver (P7); a la cabeza de Héctor (P10); de Héctor en la parte 2
  casco.visible = false;
  // la linterna del casco prende en el clic
  const hazOn = (!parte2 && t >= T.clic) || parte2;
  hazCasco.userData.luz.intensity = hazOn ? (parte2 ? 4 : 12) : 0; hazCasco.userData.cono.visible = hazOn; hazCasco.userData.cono.material.opacity = parte2 ? 0.07 : 0.16; hazCasco.userData.cono.scale.setScalar(parte2 ? 0.55 : 1); casco.userData.lente.material.color.setHex(hazOn ? 0xfff6dc : 0x9a9a92);
  if (!parte2 && t >= T.casco[0] && t < T.calza[1]) {
    casco.visible = true;
    if (t < T.casco[2]) { casco.position.copy(cascoMundoP6(t)); casco.quaternion.setFromEuler(new THREE.Euler(0, -0.3 + 0.3 * sg(t, T.casco[0], T.casco[2]), 0)); }
    else if (t < T.sacaCasco[0] + 0.1) { ponerCascoEn(ruben); if (t >= T.sube4[2]) casco.quaternion.multiply(_q.setFromAxisAngle(V3(0, 0, 1), 0.16)).multiply(_q.setFromAxisAngle(V3(1, 0, 0), -0.12)); }
    else {
      // P10: de la cabeza de Rubén (en sus manos) a la de Héctor
      const u = eio(sg(t, T.sacaCasco[0] + 0.1, T.calza[1]));
      ponerCascoEn(ruben); const a = casco.position.clone(); const qa = casco.quaternion.clone();
      ponerCascoEn(hector); const b = casco.position.clone(); const qb = casco.quaternion.clone();
      casco.position.copy(a.lerp(b, u)).add(V3(0, Math.sin(u * Math.PI) * 0.18, 0)); casco.quaternion.copy(qa.slerp(qb, u));
    }
  }
  if ((!parte2 && t >= T.calza[1]) || parte2) { casco.visible = true; ponerCascoEn(hector); }
  // las manos de Rubén siguen al casco en P10
  if (swap && t < T.calza[1] + 0.15) {
    const kk = eio(sg(t, T.sacaCasco[0] - 0.05, T.sacaCasco[0] + 0.1)) * (1 - eio(sg(t, T.calza[1], T.calza[1] + 0.15)));
    const c = casco.position.clone();
    const p1 = manoConDedos(ruben, { ...pr, codoI: [1, -0.2, -0.3] }, "I", c.clone().add(V3(0.33, 0.06, 0).applyQuaternion(casco.quaternion)));
    const p2 = manoConDedos(ruben, { ...pr, codoD: [-1, -0.2, -0.3] }, "D", c.clone().add(V3(-0.33, 0.06, 0).applyQuaternion(casco.quaternion)));
    mezclaManos(pr, { ...p1, manoD: p2.manoD, codoD: p2.codoD }, kk);
    ruben.poner(pr);
  }
  // el haz del casco: en P10 se prende recién en el clic (la cara de Héctor)
  if (!parte2 && enEsc && !asomado) { hazCasco.userData.cono.visible = false; hazCasco.userData.luz.intensity = 0; }
  if (!parte2 && t >= T.sacaCasco[0] && t < T.clic2) { hazCasco.userData.luz.intensity = 0; hazCasco.userData.cono.visible = false; casco.userData.lente.material.color.setHex(0x9a9a92); }

  if (hector.boina) { const fuera = t >= T.calza[0] + 0.08 || parte2; hector.boina.visible = !fuera; }

  // ---- visibilidad por plano ----
  ruben.raiz.visible = !["P9", "Q2", "Q3", "Q4"].includes(plano) || (plano === "Q2" && true);
  if (["Q3", "Q4", "P9", "P6a"].includes(plano)) ruben.raiz.visible = false;
  if (plano === "P10") ruben.raiz.visible = t >= T.cruza[0];
  graciela.raiz.visible = (plano === "P1" || plano === "Q1") && (parte2 ? t < T.q2 : true);
  walter.raiz.visible = W.vis && plano === "P4";
  marta.raiz.visible = Ma.vis && plano === "P4";
  hector.raiz.visible = hv && !["P2", "P2b", "P3", "Q1", "Q3b", "Q4", "Q6"].includes(plano);
  if (plano === "P7") hector.raiz.visible = false;
  // en el sótano y en los primeros planos de Rubén, sin los clientes que taparían la cámara
  if (plano === "P6") { walter.raiz.visible = marta.raiz.visible = false; hector.raiz.visible = false; }
  if (plano === "P4") hector.raiz.visible = false;   // Héctor entra con el corte a P6a
  for (const p of TODOS) p.ojoLejano(camera.position);
  for (const [per, aros] of LENTES) lenteLejano(per, aros);
  herraduraSegunCamara();

  // ================= UTILERÍA =================
  // el mate
  mateR.visible = true;
  if (mateEnMano) { const p = manoMundo(ruben, mateEnMano, _a); mateR.position.copy(p).add(V3(0, -0.13, 0.02)); mateR.rotation.set(0, ruben.raiz.rotation.y - Math.PI / 2, 0); }
  else { mateR.position.copy(MATE_C); mateR.rotation.set(0, -1.0, 0); }
  termo.visible = !["P6a", "P9", "Q3"].includes(plano); if (["P6a", "P9", "Q3"].includes(plano) && !mateEnMano) mateR.visible = false;
  // la bolsa de Graciela
  bolsa.visible = graciela.raiz.visible; bolsa.position.set(G1.x - 0.02, MY, -1.0); bolsa.rotation.y = -0.4;
  // la mochila de Walter
  mochila.visible = walter.raiz.visible;
  if (mochila.visible) { walter.cuerpo.updateMatrixWorld(true); mochila.position.copy(walter.cuerpo.localToWorld(V3(0, 0.25, -0.3))); mochila.rotation.set(0, walter.raiz.rotation.y + Math.PI, 0); }
  // la campanita y la puerta
  {
    const abre = (a, b) => eio(sg(t, a - 0.1, a + 0.15)) * (1 - eio(sg(t, b, b + 0.3)));
    const kk = Math.max(abre(T.entraW[0], T.entraW[1]), abre(T.entraM[0], T.entraM[1]), abre(T.entraH[0], T.entraH[1]), parte2 ? abre(T.entraH2[0], T.entraH2[1]) : 0);
    hoja.rotation.y = 1.3 * kk;
    let tc = -9; for (const a of [0, T.entraW[0], T.entraM[0], T.entraH[0], P2, T.entraH2[0]]) if (t >= a) tc = a;
    campanita.userData.cb.rotation.z = Math.sin((t - tc) * 30) * 0.5 * Math.exp(-(t - tc) * 4);
  }
  reloj.userData.poner(14, 25 + Math.floor(t / 60), Math.floor(t) % 60);   // la siesta
  // la tablet (parte 2) y el banquito
  tablet.visible = parte2; tablet.position.copy(TAB_P); tablet.rotation.y = 0.55;
  if (tablet.visible) dibujarTablet(t);
  banco.visible = parte2;
  if (parte2) {
    banco.position.set(SENT.x, 0, SENT.z - 0.02);
  }
  // la caja de polenta: en el estante, en las manos (P2), y vuelve (time-lapse)
  for (const o of CAJAS) { o.c.position.copy(o.base); o.c.rotation.set(0, o.rotBase, 0); o.c.visible = true; }
  if (conPolenta) {
    const p = manoMundo(ruben, "I", _a).add(manoMundo(ruben, "D", _b)).multiplyScalar(0.5);
    const sac = en(t, T.sacude[0] + 0.05, T.sacude[1]) ? Math.sin((t - T.sacude[0]) * 38) : 0;
    cajaPolenta.c.position.copy(p).add(V3(0, -0.13, 0.04)); cajaPolenta.c.rotation.set(0.5 + sac * 0.12, ruben.raiz.rotation.y, sac * 0.08);
  }
  if (!parte2 && t >= T.p3) cajaPolenta.c.visible = true;
  // la avalancha (P4): cuatro cajas de arriba caen alrededor de la tijera y quedan en el piso (hasta la parte 2)
  const cae = (o, t0, i, destino) => {
    const u = sg(t, t0, t0 + 0.32);
    if (u <= 0) return;
    const p0 = o.base, p1 = destino;
    o.c.position.set(lerp(p0.x, p1.x, u), lerp(p0.y, p1.y, u * u), lerp(p0.z, p1.z, u) + Math.sin(u * Math.PI) * 0.15);
    if (u >= 1) { const b = Math.sin(sg(t, t0 + 0.32, t0 + 0.45) * Math.PI) * 0.05; o.c.position.y += b; }
    o.c.rotation.set(u * (1.2 + i * 0.4), o.rotBase + u * (i % 2 ? 1 : -1) * 0.9, u * (i % 2 ? -0.6 : 0.5));
  };
  if (!parte2) {
    CAJAS.filter((o) => o.rol === "aval").forEach((o, i) => cae(o, T.aval + i * 0.08, i, V3(TJ.x - 0.6 + i * 0.42, SY + 0.12, TJ.z + 0.55 + (i % 2) * 0.25)));
    CAJAS.filter((o) => o.rol === "crash").forEach((o, i) => cae(o, T.crash + i * 0.08, i + 1, V3(TJ.x - 0.9 + i * 0.36, SY + 0.12 + (i === 1 ? 0.24 : 0), TJ.z + 0.75 - (i % 2) * 0.2)));
    // el azúcar: cae justo en la cabeza (P5) y queda de sombrero (la de la cabeza es otra malla pegada a la cabeza)
    if (t >= T.cae - 0.2) {
      const u = sg(t, T.cae - 0.2, T.cae);
      ruben.cabeza.updateMatrixWorld(true);
      const dest = cabezaMundo(ruben, V3(0, 0.6, 0));
      cajaAzucar.c.position.copy(cajaAzucar.base.clone().lerp(dest, u)); cajaAzucar.c.position.y = lerp(cajaAzucar.base.y, dest.y, u * u);
      cajaAzucar.c.rotation.set(u * Math.PI, 0, u * 0.3);
      cajaAzucar.c.visible = t < T.cae;
    }
    // la última caja del fondo (DULCE DE LECHE): la tira al sacar el frasco
    if (t >= T.ultima) cae(cajaDulce, T.ultima, 2, V3(TJ.x - 0.25, SY + 0.12, TJ.z + 0.95));
  }
  cajaSombrero.visible = sombrero && t < T.sacaCaja[0] + 0.02;
  // la caja de sombrero que se saca (P6): de la cabeza al piso al costado de la trampa
  if (!parte2 && en(t, T.sacaCaja[0], T.p7)) {
    const u = eio(sg(t, T.sacaCaja[0], T.sacaCaja[1]));
    ruben.cabeza.updateMatrixWorld(true);
    const de = cabezaMundo(ruben, V3(0, 0.6, 0)), a = V3(1.9, 0.0, -1.35);
    cajaAzucar.c.visible = true; cajaAzucar.c.position.copy(de.lerp(a, u)).add(V3(0, Math.sin(u * Math.PI) * 0.2 - (1 - u) * 0.3 * 0, 0)); cajaAzucar.c.rotation.set(Math.PI * (1 - u), 0.3, 0.2 * (1 - u));
  }
  // la caja que se le cae a Héctor (Q5)
  caeH.visible = false;
  if (caeH.visible) { const u = sg(t, T.caeH - 0.25, T.caeH); caeH.position.set(-0.3, lerp(NIV[3] + 0.0125, SY, u * u), lerp(EST.z, EST.z + 0.45, u)); caeH.rotation.set(u * 1.6, 0.3, u * 0.5); }
  // parte 2: el sótano ordenado (las cajas en su lugar; la polenta cerrada con 3 paquetes adentro: no se ve)
  FRASCOS2.forEach((f) => (f.visible = parte2));
  if (parte2) CAJAS.filter((o) => o.niv === 1 && o.x < 0).forEach((o) => (o.c.visible = false));   // ahí van los frascos
  // el frasco de dulce de leche (de la mano derecha de Rubén)
  frasco.visible = conFrasco;
  if (frasco.visible) { const p = manoMundo(ruben, "D", _a); frasco.position.copy(p).add(V3(0, -0.04, 0.05)); frasco.rotation.set(0, Math.atan2(camera.position.x - frasco.position.x, camera.position.z - frasco.position.z), 0); }
  // la linterna de mano (P5)
  lintMano.visible = conLinterna;
  const hm = conLinterna && t >= T.linterna && !enEsc && !asomado; hazMano.userData.luz.intensity = hm ? 10 : 0; hazMano.userData.cono.visible = hm;
  if (lintMano.visible) {
    const p = manoMundo(ruben, "D", _a); lintMano.position.copy(p).add(V3(0, -0.04, 0.03));
    lintMano.rotation.set(enEsc ? -1.2 : 0.35, ruben.raiz.rotation.y, 0);
  }
  // la telaraña de Héctor (Q5, en el casco)
  telaHG.visible = false;
  if (telaHG.visible) { ponerCascoEn(hector); telaHG.position.copy(casco.position).add(V3(0.28, 0.12, 0.05)); telaHG.quaternion.copy(casco.quaternion); telaHG.rotateY(Math.PI / 2); telaH.userData.crecer(1); }

  // ---------- el polvo: P2 en el cono del foco, P3 la palmada, P4/P6 el crash, P7-P8 cae en el haz del casco ----------
  {
    let n = 0;
    const pon = (x, y, z, r) => { if (n >= NP) return; _pp.set(x, y, z); _ps.setScalar(r); _pm.compose(_pp, _pq, _ps); polvo.setMatrixAt(n++, _pm); };
    if (prendido && (plano === "P2b" || seccion) && !parte2) for (let i = 0; i < 30; i++) { const h = hash(i + 3), h2 = hash(i + 50), h3 = hash(i + 90); const yy = FOCO.y - 0.2 - ((h2 * 1.6 + (t - T.luz) * 0.06 * (0.5 + h)) % 1.5); pon(FOCO.x - 0.6 + h * 1.0, yy, FOCO.z - 0.4 + h3 * 0.8, 0.007 + h * 0.006); }
    if (!parte2 && en(t, T.palmea[0], T.palmea[1] + 0.8)) { const c = manoMundo(ruben, "I", _a).clone(); for (let i = 0; i < 18; i++) { const u = sg(t, T.palmea[0] + (i % 3) * 0.1, T.palmea[1] + 0.8); if (u <= 0) continue; const a = hash(i + 7) * 6.28; pon(c.x + Math.cos(a) * u * 0.25, c.y + 0.05 + u * 0.15 - u * u * 0.2, c.z + Math.sin(a) * u * 0.2, 0.012 * (1 - u * 0.6)); } }
    const nube = (t0, cx, cz) => { if (!en(t, t0, t0 + 1.2)) return; for (let i = 0; i < 20; i++) { const u = sg(t, t0, t0 + 1.2); const a = hash(i + t0) * 6.28, r = 0.2 + hash(i + 11) * 0.5; pon(cx + Math.cos(a) * r * eo(u), SY + 0.1 + hash(i + 31) * 0.5 * eo(u), cz + Math.sin(a) * r * 0.5 * eo(u), 0.03 * (1 - u)); } };
    if (!parte2) { nube(T.aval + 0.3, TJ.x, TJ.z + 0.5); nube(T.crash + 0.3, TJ.x - 0.4, TJ.z + 0.6); }
    // el polvo que cae en el haz del casco (P7-P8): partículas opacas que flotan y bajan despacio delante de Rubén
    if (!parte2 && en(t, T.p7, T.p9)) { const c = cabezaMundo(ruben, V3(0, 0.85, 0.65)); for (let i = 0; i < 46; i++) { const h = hash(i + 101), h2 = hash(i + 202); const yy = c.y + 0.55 - ((h2 + (t - T.p7) * (0.12 + h * 0.08)) % 1.0) * 0.65; pon(c.x - 0.4 + h * 0.8, yy, c.z + (h2 - 0.5) * 0.6 + 0.2, 0.0035 + h * 0.0035); } }
    for (let i = n; i < NP; i++) { _ps.setScalar(0); _pm.compose(_pp.set(0, -50, 0), _pq, _ps); polvo.setMatrixAt(i, _pm); }
    polvo.instanceMatrix.needsUpdate = true; polvo.count = NP;
  }

  // ================= GLOBOS =================
  {
    TOPE = 130;
    const chipVis = (!parte2 && t >= T.chip1) || (parte2 && t >= T.chip0 && t < T.cierre);
    if (chipVis) TOPE = 220;
    const ent = (ti) => (t < ti ? 0 : 0.7 + 0.3 * bk(sg(t, ti, ti + 0.2)));
    const sale = (tf) => 1 - eio(sg(t, tf - 0.12, tf));
    for (const g in GL) GL[g].visible = false;
    const rb = () => bocaPx(ruben), hb = () => bocaPx(hector), gb = () => bocaPx(graciela), wb = () => bocaPx(walter), mb = () => bocaPx(marta);
    const arriba = (g, quien, t0, t1, dx = 0, dy = -420, orden = 0) => { if (!en(t, t0, t1)) return; const [bx, by] = quien(); ponerGlobo(g, bx + dx, by + dy, ent(t0) * sale(t1), [bx, by - 30], orden); };
    if (plano === "P1") arriba(GL.r1, rb, T.r1, T.p2, 120, -400);
    if (plano === "P3") arriba(GL.r2, rb, T.r2, T.p4, 0, -520);
    if (plano === "P4") { arriba(GL.w1, wb, T.w1, T.no2 - 0.05, -60, -330); arriba(GL.no2, rb, T.no2, T.no2 + 0.42, 160, -250, 1); arriba(GL.m1, mb, Math.max(T.m1, T.no2 + 0.42), T.no3, -120, -360); arriba(GL.no3, rb, T.no3, T.p6a, 160, -250, 1); }
    if (plano === "P6a" && t >= T.h1) { const [bx, by] = hb(); ponerGlobo(GL.h1, bx + 80, by - 560, ent(T.h1), [bx, by - 30]); }
    if (plano === "P6" && t >= T.h1) ponerGlobo(GL.h1, 380, 420, t < T.h1 + LEN.h1 + 0.1 ? 1 : sale(T.p6b), [-200, 700]);
    if (plano === "P7") arriba(GL.r3, rb, T.r3, T.p8, -150, -560);
    if (plano === "P9") { arriba(GL.h2a, hb, T.h2, T.h2b - 0.02, 120, -600); arriba(GL.h2b, hb, T.h2b, T.p10, 60, -600); }
    if (plano === "P10") arriba(GL.h3, hb, T.h3, T.cruza[1] + 0.2, 160, -420);
    if (plano === "Q1") { arriba(GL.g1b, gb, T.g1b, T.r4 - 0.05, 260, -460); arriba(GL.r4, rb, T.r4, T.q2, -60, -420); }
    if (plano === "Q2") { arriba(GL.h4, hb, T.h4, T.r5, 140, -420); arriba(GL.r5, rb, T.r5, T.q3, 0, -330); }
    if (plano === "Q3") arriba(GL.h5, hb, T.h5, T.q3b, 60, -640);
    if (plano === "Q3b") arriba(GL.r6, rb, T.r6, T.q4, -40, -640);
    }
  if (en(tIn, P1, P2) || LIMPIO) for (const g in GL) GL[g].visible = false;
  renderer.render(scene, camera);
}
// el casco en P6: del estante de abajo del mostrador (al costado de la trampa) a las manos y a la cabeza
function cascoMundoP6(t) {
  const desde = V3(0.98, 0.55, -1.72);
  ruben.cabeza.updateMatrixWorld(true);
  const sobre = ruben.cabeza.localToWorld(CASCO_CAB.p.clone().add(V3(0, 0.22, 0.05)));
  const cab = ruben.cabeza.localToWorld(CASCO_CAB.p.clone());
  // (ronda 1) primero sube por el costado (nunca por delante de la cara), después pasa por arriba y baja a la cabeza
  const alto = V3(desde.x + 0.05, sobre.y + 0.05, desde.z - 0.2);
  const u1 = eio(sg(t, T.casco[0], T.casco[1])), u2 = eio(sg(t, T.casco[1], T.casco[2]));
  if (t < T.casco[1]) return u1 < 0.55 ? desde.clone().lerp(alto, u1 / 0.55) : alto.clone().lerp(sobre, (u1 - 0.55) / 0.45);
  return sobre.clone().lerp(cab, u2);
}

window.__tresRender = renderAt;
window.addEventListener("hf-seek", (e) => renderAt(e.detail.time));
renderAt(window.__hfThreeTime || 0);
if (window.__tresListo) window.__tresListo();
