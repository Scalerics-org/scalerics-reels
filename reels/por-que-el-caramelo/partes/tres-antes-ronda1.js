// Capa 3D de por-que-el-caramelo (Three.js r170 local). Base técnica: reels/por-que-se-fue (luces, entorno PMREM, el
// almacén de Rubén, personajes de reels/abren-hoy). renderAt(t) es una función pura del tiempo del timeline (hf-seek):
// nada de rAF, Date.now ni azar sin semilla.
// Un solo mundo sobre piso navy, fondo navy claro liso (#16243d, lo pone el HTML):
//   R (origen): la mesa del restaurante, los dos comensales, la moza con la canastita, el platito de la cuenta.
//   C (x ≈ -3): la bandeja con las 4 pilas de monedas (el contador sin números), los pares de caramelos, el "?".
//   B (x = 9): el almacén de Rubén (mostrador, frasco de caramelos, el mismo platito, tablet con la ficha, la fila).
//   FIN (x = 100): el caramelo verde oscuro de la tarjeta de cierre.
// Cámara: claves [t, posición, mira, fov] con Catmull-Rom monótona (C1, sin rebasar en las pausas); cortes solo donde
// hay contraplano. El caramelo es el objeto que viaja: del platito a la pila, de la pila al "?", del "?" a la mano de la
// moza, de la mano al frasco de Rubén.
import * as THREE from "./vendor/three/three.module.js";
import { RoundedBoxGeometry } from "./vendor/three/RoundedBoxGeometry.js";
import { TextGeometry } from "./vendor/three/TextGeometry.js";
import { FontLoader } from "./vendor/three/FontLoader.js";
import LEXEND from "./vendor/three/lexend800p.js";
import { crearPersonaje, ELENCO, PIEL, PELO, MARCA, poseEn, mezclar, CARA, BRAZOS, crearTermo, crearTablet } from "./personajes.js";
import { E, W, DUR } from "./tiempos3d.js";
await Promise.all(["500", "600", "700", "800", "900"].map((w) => document.fonts.load(w + ' 60px "Lexend"')));

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
// arco: de A a B con una panza hacia arriba de h
const arco = (A, B, u, h) => { const p = lerpV(A, B, u); p.y += Math.sin(Math.PI * u) * h; return p; };

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
renderer.localClippingEnabled = true;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(34, 1080 / 1920, 0.05, 400);
scene.add(camera);

function entorno() {
  const env = new THREE.Scene();
  env.background = new THREE.Color(0x5d6270);
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
scene.environmentIntensity = 0.6;

const OB = V(9, 0, 0); // el almacén de Rubén
const OF = V(100, 0, 0); // el cierre
const key = new THREE.DirectionalLight(0xfff0dc, 2.3); key.position.set(-4, 8, 7); scene.add(key);
const rim = new THREE.DirectionalLight(0xc9dcff, 1.6); rim.position.set(5, 4, -6); scene.add(rim);
const fill = new THREE.HemisphereLight(0xfffaf0, 0x3a4256, 1.0); scene.add(fill);
const sol = new THREE.DirectionalLight(0xffe6c8, 1.6);
sol.castShadow = true; sol.shadow.mapSize.set(2048, 2048);
sol.shadow.bias = -0.0008; sol.shadow.radius = 4;
scene.add(sol, sol.target);
const lampara = new THREE.PointLight(0xffd59a, 0, 6, 1.6); scene.add(lampara);
const lamparaR = new THREE.PointLight(0xffd59a, 0, 4, 1.6); lamparaR.position.set(0, 1.9, 0); scene.add(lamparaR);

// ---------- paleta ----------
const C = { navy: 0x0b1220, navy2: 0x16243d, navy3: 0x1f3254, edge: 0x2c4268, cr: 0xefeee5, cr2: 0xd9d7c9, cr3: 0xb4b2a3, g: 0x5ce611, gd: 0x3fa60a, red: 0xc7655b, white: 0xffffff, gris: 0x8e8c80, oro: 0xc9a24a };
const mat = (color, rough = 0.55, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0.0, ...extra });
const M = {
  g: mat(C.g, 0.45, { emissive: C.g, emissiveIntensity: 0.16 }), gd: mat(C.gd, 0.55), cr: mat(C.cr, 0.6), cr2: mat(C.cr2, 0.62), cr3: mat(C.cr3, 0.6),
  navy: mat(C.navy, 0.42), navy2: mat(C.navy2, 0.5), navy3: mat(C.navy3, 0.5), edge: mat(C.edge, 0.5), red: mat(C.red, 0.55, { emissive: C.red, emissiveIntensity: 0.14 }),
  white: mat(C.white, 0.42), tilde: mat(C.navy, 0.45), piso: mat(C.navy3, 0.95), madera: mat(0x2a3b5c, 0.62),
};
const MCR = () => mat(0xefeee5, 0.5, { emissive: 0xefeee5, emissiveIntensity: 0.12 });
const rbox = (w, h, d, r = 0.06, seg = 3) => new RoundedBoxGeometry(w, h, d, seg, Math.min(r, w / 2 - 0.001, h / 2 - 0.001, d / 2 - 0.001));
const mesh = (g, m, x = 0, y = 0, z = 0) => { const o = new THREE.Mesh(g, m); o.position.set(x, y, z); return o; };
function ocultar(o, s) { o.visible = s > 0.002; if (o.visible) o.scale.setScalar(s); }
const rr = (x, X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r); x.fill(); };
const F = (w, s, fam = "Lexend") => `${w} ${s}px "${fam}", sans-serif`;
function tex(w, h, dibujar) {
  const c = document.createElement("canvas"); c.width = w; c.height = h; const x = c.getContext("2d");
  dibujar(x, w, h); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t;
}
const ajustar = (x, txt, peso, px, ancho) => { let s = px; x.font = F(peso, s); while (x.measureText(txt).width > ancho && s > 10) { s -= 2; x.font = F(peso, s); } return s; };
const sombraTex = tex(256, 256, (x) => {
  const gr = x.createRadialGradient(128, 128, 0, 128, 128, 128);
  gr.addColorStop(0, "rgba(3,6,12,0.55)"); gr.addColorStop(0.55, "rgba(3,6,12,0.25)"); gr.addColorStop(1, "rgba(3,6,12,0)");
  x.fillStyle = gr; x.fillRect(0, 0, 256, 256);
});
const sombra = (w, d) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), new THREE.MeshBasicMaterial({ map: sombraTex, transparent: true, depthWrite: false })); m.rotation.x = -Math.PI / 2; m.renderOrder = -1; scene.add(m); return m; };
const sh = (o) => { o.traverse((m) => { if (m.isMesh) { m.castShadow = true; m.receiveShadow = true; } }); return o; };
const font = new FontLoader().parse(LEXEND);
const textoGeo = (s, size, depth) => {
  const g = new TextGeometry(s, { font, size, depth, curveSegments: 10, bevelEnabled: true, bevelThickness: depth * 0.25, bevelSize: size * 0.025, bevelSegments: 3 });
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
function hacerTilde(r = 0.17) {
  const g = new THREE.Group();
  const d = mesh(discoGeo, M.g); d.scale.set(r, r, r * 0.35); g.add(d);
  const tk = mesh(tickGeo, M.tilde, 0, 0, r * 0.12); tk.scale.set(r * 1.25, r * 1.25, r * 1.1); g.add(tk);
  scene.add(g); return g;
}
const NAV = "#16243d", NAV3 = "#1f3254", EDGE = "#2c4268", CRE = "#efeee5", VER = "#5ce611", NAV0 = "#0b1220", ROJ = "#c7655b";

const piso = mesh(new THREE.PlaneGeometry(60, 60), M.piso, 0, 0, 0); piso.rotation.x = -Math.PI / 2; piso.receiveShadow = true; scene.add(piso);

// ================= EL CARAMELO ENVUELTO (largo ~1,7 u en x; se escala) =================
// cuerpo ovalado de celofán verde con rayas crema en espiral, dos cuellos retorcidos y dos moños plisados en abanico
const rayasTex = (fondo, raya) => tex(512, 256, (x, w, h) => {
  x.fillStyle = fondo; x.fillRect(0, 0, w, h);
  x.strokeStyle = raya; x.lineWidth = 16; x.lineCap = "butt";
  for (let i = -6; i < 14; i++) { x.beginPath(); x.moveTo(i * 52, -4); x.lineTo(i * 52 + 150, h + 4); x.stroke(); }
});
const RAYAS = { g: rayasTex(VER, "rgba(239,238,229,0.92)"), gd: rayasTex("#2f8a06", "rgba(11,18,32,0.55)") };
const celofan = (k, lados = THREE.FrontSide) => new THREE.MeshPhysicalMaterial({ map: RAYAS[k], color: 0xffffff, roughness: 0.22, clearcoat: 1, clearcoatRoughness: 0.08, emissive: k === "g" ? 0x2c7a06 : 0x0f3a02, emissiveIntensity: 0.18, side: lados });
const MCAR = { g: [celofan("g"), celofan("g", THREE.DoubleSide)], gd: [celofan("gd"), celofan("gd", THREE.DoubleSide)] };
const cuerpoCarGeo = new THREE.SphereGeometry(1, 48, 24).rotateZ(Math.PI / 2).scale(0.5, 0.33, 0.33);
const cuelloGeo = (() => { const g = new THREE.CylinderGeometry(0.075, 0.1, 0.14, 20, 3); g.rotateZ(Math.PI / 2); return g; })();
const abanicoGeo = (() => {
  const NU = 96, NV = 12, L = 0.3, PL = 11;
  const pos = [], uv = [], idx = [];
  for (let j = 0; j <= NV; j++) {
    const s = j / NV;
    for (let i = 0; i <= NU; i++) {
      const a = (i / NU) * Math.PI * 2 + s * 0.6; // retorcido
      const pl = 1 + 0.26 * Math.sin(a * PL) * Math.pow(s, 0.8);
      const r = (0.07 + 0.25 * Math.pow(s, 1.15)) * pl;
      const borde = 1 + 0.07 * Math.sin(a * PL * 2) * s * s; // la punta queda irregular
      pos.push(s * L * borde, Math.cos(a) * r, Math.sin(a) * r * 0.5);
      uv.push(i / NU, s);
    }
  }
  for (let j = 0; j < NV; j++) for (let i = 0; i < NU; i++) {
    const a = j * (NU + 1) + i, b = a + NU + 1;
    idx.push(a, b, a + 1, b, b + 1, a + 1);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3)); g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx); g.computeVertexNormals(); return g;
})();
const CARAMELOS = [];
function hacerCaramelo(k = "g") {
  const g = new THREE.Group(); const [m, m2] = MCAR[k];
  g.add(mesh(cuerpoCarGeo, m));
  for (const s of [-1, 1]) {
    const cu = mesh(cuelloGeo, m, s * 0.54, 0, 0); cu.scale.x = s; g.add(cu);
    const ab = mesh(abanicoGeo, m2, s * 0.6, 0, 0); ab.scale.x = s; ab.rotation.x = s * 0.25; g.add(ab);
  }
  g.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } });
  g.visible = false; scene.add(g); CARAMELOS.push(g); return g;
}
const K_REAL = 0.075; // el caramelo de verdad (~13 cm con los moños)
// pone un caramelo: posición, escala, giro (rad) sobre su eje largo y de frente
function ponerCar(c, p, k, ry = 0, rz = 0, rx = 0) { c.visible = k > 0.002; if (!c.visible) return; c.position.copy(p); c.scale.setScalar(k); c.rotation.set(rx, ry, rz); }

// ================= EL PLATITO DE LA CUENTA (con el ticket doblado) =================
const ticketTex = (titulo) => tex(512, 640, (x, w, h) => {
  x.fillStyle = "#f7f5ec"; x.fillRect(0, 0, w, h);
  x.fillStyle = NAV0; x.textAlign = "center"; x.textBaseline = "middle";
  ajustar(x, titulo, 800, 110, w - 70); x.fillText(titulo, w / 2, 96);
  x.fillStyle = "#33415e"; for (let i = 0; i < 6; i++) { x.fillRect(46, 190 + i * 52, 210 + ((i * 53) % 120), 16); x.fillRect(w - 46 - 90, 190 + i * 52, 90, 16); }
  x.fillStyle = NAV0; x.fillRect(40, 520, w - 80, 6);
  x.textAlign = "left"; ajustar(x, "TOTAL", 800, 64, 220); x.fillText("TOTAL", 46, 580);
  x.textAlign = "right"; x.font = F(800, 64); x.fillText("$ ----", w - 46, 580);
});
const TICKET = { cuenta: ticketTex("CUENTA"), almacen: ticketTex("ALMACÉN") };
function hacerPlatito(tt) {
  const g = new THREE.Group();
  const perfil = [[0, 0], [0.09, 0.0], [0.105, 0.006], [0.13, 0.016], [0.15, 0.024], [0.152, 0.027]].map(([r, y]) => new THREE.Vector2(r, y));
  const plato = mesh(new THREE.LatheGeometry(perfil, 48), mat(0xf4f2e8, 0.3, { side: THREE.DoubleSide })); plato.scale.z = 0.72; g.add(plato);
  const borde = mesh(new THREE.TorusGeometry(0.15, 0.005, 8, 64), M.navy2, 0, 0.026, 0); borde.rotation.x = Math.PI / 2; borde.scale.y = 0.72; g.add(borde);
  // ticket doblado al medio: la mitad de abajo apoyada, la de arriba levantada desde el pliegue (z = 0)
  const TW = 0.13, TH = 0.085;
  const mt = new THREE.MeshStandardMaterial({ map: tt, roughness: 0.85 });
  const papel = mat(0xf7f5ec, 0.85);
  const abajo = mesh(new THREE.BoxGeometry(TW, 0.002, TH), papel, -0.02, 0.012, TH / 2 - 0.02); g.add(abajo);
  const bis = new THREE.Group(); bis.position.set(-0.02, 0.013, -0.02); g.add(bis);
  // la cara impresa mira hacia arriba (+y) cuando está acostada; el pliegue la levanta hacia -z
  const arriba = mesh(new THREE.BoxGeometry(TW, 0.002, TH), [papel, papel, mt, papel, papel, papel], 0, 0, -TH / 2); bis.add(arriba);
  // la textura del ticket entero se ve en la mitad levantada (CUENTA arriba, TOTAL abajo)
  g.userData.bis = bis;
  sh(g); scene.add(g); return g;
}

// ================= ZONA R: el restaurante =================
const TOP = 0.76;
const mesa = new THREE.Group(); scene.add(mesa);
{
  const mantel = mat(0xefeee5, 0.85);
  mesa.add(mesh(new THREE.CylinderGeometry(0.74, 0.86, TOP - 0.01, 56, 1, true), mantel, 0, (TOP - 0.01) / 2, 0));
  mesa.add(mesh(new THREE.CylinderGeometry(0.745, 0.745, 0.025, 56), mantel, 0, TOP - 0.012, 0));
  // la bajada del mantel con pliegues suaves (un aro ondulado)
  const pl = new THREE.CylinderGeometry(0.87, 0.87, 0.04, 96, 1, true); const pp = pl.attributes.position;
  for (let i = 0; i < pp.count; i++) { const x = pp.getX(i), z = pp.getZ(i), a = Math.atan2(z, x), k = 1 + 0.018 * Math.sin(a * 22); pp.setX(i, x * k); pp.setZ(i, z * k); }
  pl.computeVertexNormals(); mesa.add(mesh(pl, mantel, 0, 0.02, 0));
  // copas de agua y servilletas verdes
  const vidrio = new THREE.MeshPhysicalMaterial({ color: 0xdfeaf2, roughness: 0.08, transparent: true, opacity: 0.38, clearcoat: 1, depthWrite: false });
  const agua = new THREE.MeshPhysicalMaterial({ color: 0xbcd6e6, roughness: 0.1, transparent: true, opacity: 0.45, depthWrite: false });
  for (const [x, z] of [[-0.28, -0.3], [-0.42, 0.18]]) {
    const pf = [[0.0, 0], [0.035, 0.0], [0.035, 0.005], [0.006, 0.012], [0.005, 0.07], [0.03, 0.09], [0.045, 0.16], [0.042, 0.17]].map(([r, y]) => new THREE.Vector2(r, y));
    const c = mesh(new THREE.LatheGeometry(pf, 28), vidrio, x, TOP, z); c.renderOrder = 3; mesa.add(c);
    const a = mesh(new THREE.CylinderGeometry(0.04, 0.032, 0.045, 24), agua, x, TOP + 0.115, z); a.renderOrder = 2; mesa.add(a);
  }
  for (const [x, z, r] of [[-0.42, -0.36, 0.7], [-0.52, 0.02, 1.6]]) {
    const s = mesh(new THREE.CylinderGeometry(0.0001, 0.07, 0.11, 3), M.g, x, TOP + 0.03, z); s.rotation.set(Math.PI / 2, r, 0); s.scale.set(1, 1, 0.35); mesa.add(s);
  }
  // la lámpara colgante (cable, pantalla crema)
  mesa.add(mesh(new THREE.CylinderGeometry(0.006, 0.006, 1.6, 6), M.navy, 0, 2.95, 0));
  const pant = mesh(new THREE.CylinderGeometry(0.07, 0.26, 0.2, 32, 1, true), mat(0xefeee5, 0.6, { side: THREE.DoubleSide, emissive: 0xffe2a8, emissiveIntensity: 0.15 }), 0, 2.08, 0); mesa.add(pant);
  mesa.add(mesh(new THREE.SphereGeometry(0.06, 16, 10), new THREE.MeshBasicMaterial({ color: 0xffe8b8 }), 0, 1.99, 0));
  sh(mesa);
}
const sombraMesa = sombra(2.4, 2.4); sombraMesa.position.set(0, 0.004, 0);
const platito = hacerPlatito(TICKET.cuenta);
const P0 = V(0.4, TOP, 0.34);
platito.position.copy(P0); platito.rotation.y = -0.35;
// sillas navy de madera
function hacerSilla() {
  const g = new THREE.Group();
  g.add(mesh(rbox(0.44, 0.05, 0.42, 0.015), M.madera, 0, 0.43, 0));
  for (const [x, z] of [[-0.19, -0.18], [0.19, -0.18], [-0.19, 0.18], [0.19, 0.18]]) g.add(mesh(rbox(0.04, 0.43, 0.04, 0.01), M.madera, x, 0.215, z));
  for (const x of [-0.19, 0.19]) g.add(mesh(rbox(0.04, 0.5, 0.04, 0.01), M.madera, x, 0.7, -0.19));
  g.add(mesh(rbox(0.42, 0.14, 0.03, 0.01), M.madera, 0, 0.86, -0.19));
  sh(g); scene.add(g); return g;
}
// comensales sentados (genéricos; no son del elenco fijo)
const COM = [
  { cfg: { nombre: "Comensal", piel: PIEL.clara, pelo: PELO.castaño, peinado: "corto", cejasColor: 0x4a3426, camisa: C.navy3, mangas: "largas", cuello: C.cr, pantalon: C.navy, zapatos: 0x2a2220, panza: 1.04, nariz: 0.06, alto: 1.0, parpadeoCada: 1e6 }, x: -0.62, z: -0.7 },
  { cfg: { nombre: "Comensala", piel: PIEL.trigueña, pelo: PELO.negro, peinado: "mediaCola", cejasColor: 0x1e1a18, camisa: C.cr2, mangas: "largas", cuello: C.g, cuelloBotones: false, pantalon: C.navy2, zapatos: 0x2a2220, panza: 0.98, nariz: 0.05, labios: 0x9a4448, aros: C.g, alto: 0.96, parpadeoCada: 1e6 }, x: -0.98, z: 0.14 },
].map((c) => {
  const p = crearPersonaje(c.cfg); scene.add(p.raiz);
  p.raiz.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } });
  c.p = p; c.giro = Math.atan2(-c.x, -c.z);
  c.silla = hacerSilla(); c.silla.position.set(c.x - Math.sin(c.giro) * 0.06, 0, c.z - Math.cos(c.giro) * 0.06); c.silla.rotation.y = c.giro;
  return c;
});
function sentar(p) { const esc = p.raiz.children[0]; esc.children[0].rotation.x = -Math.PI / 2; esc.children[1].rotation.x = -Math.PI / 2; }
// la moza (genérica): camisa crema, delantal largo navy con bolsillo, coleta; canastita de mimbre con caramelos
const moza = crearPersonaje({ nombre: "Moza", piel: PIEL.media, pelo: 0x4a2c1c, peinado: "coleta", cejasColor: 0x3a2418, camisa: C.cr, mangas: "cortas",
  delantal: C.navy, delantalBorde: C.edge, pantalon: C.navy, zapatos: 0x1e1a18, panza: 0.98, nariz: 0.05, mejillas: 0xd98a78, labios: 0xa4484c, alto: 0.97, parpadeoCada: 1e6 });
scene.add(moza.raiz); moza.raiz.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } });
const canasta = new THREE.Group(); scene.add(canasta);
const carCanasta = [];
{
  const mimbre = tex(512, 128, (x, w, h) => {
    x.fillStyle = "#d8c9a0"; x.fillRect(0, 0, w, h);
    for (let j = 0; j < 4; j++) for (let i = 0; i < 16; i++) { x.fillStyle = (i + j) % 2 ? "#c2ae7e" : "#ebdfbd"; rr(x, i * 32 + 2, j * 32 + 3, 28, 26, 8); }
  });
  mimbre.wrapS = THREE.RepeatWrapping; mimbre.repeat.set(2, 1);
  const mm = new THREE.MeshStandardMaterial({ map: mimbre, roughness: 0.85, side: THREE.DoubleSide });
  canasta.add(mesh(new THREE.CylinderGeometry(0.12, 0.095, 0.08, 32, 1, true), mm, 0, 0.04, 0));
  canasta.add(mesh(new THREE.CylinderGeometry(0.095, 0.095, 0.01, 32), mm, 0, 0.005, 0));
  const aro = mesh(new THREE.TorusGeometry(0.12, 0.008, 8, 40), mat(0xc2ae7e, 0.8), 0, 0.08, 0); aro.rotation.x = Math.PI / 2; canasta.add(aro);
  const asa = mesh(new THREE.TorusGeometry(0.1, 0.008, 8, 30, Math.PI), mat(0xc2ae7e, 0.8), 0, 0.08, 0); canasta.add(asa);
  for (const [x, z, r] of [[-0.05, 0.02, 0.4], [0.04, -0.03, -0.6], [0.0, 0.05, 1.2], [0.05, 0.04, 2.0], [-0.03, -0.05, -1.4]]) {
    const c = hacerCaramelo("g"); scene.remove(c); c.visible = true; c.position.set(x, 0.075, z); c.scale.setScalar(0.05); c.rotation.set(0.2, r, 0.1); canasta.add(c); carCanasta.push(c);
  }
  sh(canasta);
}

// ================= ZONA C: la bandeja con las pilas de monedas =================
const PX = [-4.89, -4.21, -3.53, -2.85], PZ = 0.6, RM = 0.28, HM = 0.075;
// alturas proporcionales a la propina promedio del estudio (18,95 / 19,59 / 21,62 / 22,99 %): una moneda ≈ 1 punto
const NMON = [19, 20, 22, 23];
const bandeja = new THREE.Group(); scene.add(bandeja);
const ROT_PILA = ["Sin caramelo", "Uno", "Dos", "Uno + uno"];
const placas = [];
{
  bandeja.add(mesh(rbox(2.9, 0.16, 1.05, 0.05), M.navy, -3.87, 0.08, PZ));
  PX.forEach((x, i) => {
    bandeja.add(mesh(new THREE.CylinderGeometry(RM + 0.05, RM + 0.05, 0.025, 40), M.edge, x, 0.17, PZ));
    const tt = tex(512, 150, (c, w, h) => { c.fillStyle = CRE; rr(c, 0, 0, w, h, 26); c.fillStyle = NAV0; c.textAlign = "center"; c.textBaseline = "middle"; ajustar(c, ROT_PILA[i], 800, 92, w - 44); c.fillText(ROT_PILA[i], w / 2, h / 2 + 4); });
    const pm = new THREE.MeshStandardMaterial({ map: tt, roughness: 0.6, emissive: 0xffffff, emissiveMap: tt, emissiveIntensity: 0.16, transparent: true });
    const pl = mesh(new THREE.PlaneGeometry(0.54, 0.16), pm, x, 0.27, PZ + 0.56); pl.rotation.x = -0.3; bandeja.add(pl); placas.push(pl);
    bandeja.add(mesh(rbox(0.46, 0.12, 0.04, 0.01), M.navy3, x, 0.12, PZ + 0.53));
  });
  sh(bandeja);
}
const sombraBand = sombra(3.6, 1.8); sombraBand.position.set(-3.87, 0.004, PZ);
const cantoTex = tex(1024, 32, (x, w, h) => { for (let i = 0; i < 128; i++) { x.fillStyle = i % 2 ? "#b88f3c" : "#e3c477"; x.fillRect(i * 8, 0, 8, h); } });
const caraTex = tex(256, 256, (x, w, h) => { x.fillStyle = "#d8b45e"; x.fillRect(0, 0, w, h); x.strokeStyle = "#a8812f"; x.lineWidth = 12; x.beginPath(); x.arc(128, 128, 100, 0, 7); x.stroke(); x.lineWidth = 6; x.beginPath(); x.arc(128, 128, 64, 0, 7); x.stroke(); });
const monedaGeo = new THREE.CylinderGeometry(RM, RM, HM * 0.94, 48);
const matsMon = (col, metal) => [new THREE.MeshStandardMaterial({ color: col, map: cantoTex, metalness: metal, roughness: 0.34 }), new THREE.MeshStandardMaterial({ color: col, map: caraTex, metalness: metal, roughness: 0.3 }), new THREE.MeshStandardMaterial({ color: col, map: caraTex, metalness: metal, roughness: 0.3 })];
const MMON = { oro: matsMon(0xffffff, 0.72), gris: matsMon(0x9c9a92, 0.35), verde: matsMon(0x7fe04a, 0.3) };
const pilas = NMON.map((n, k) => Array.from({ length: n }, (_, i) => { const m = mesh(monedaGeo, k === 0 ? MMON.gris : MMON.oro); m.castShadow = true; m.receiveShadow = true; m.userData = { k, i }; scene.add(m); return m; }));
const pregLinea = mesh(textoGeo("?", 0.42, 0.08), MCR()); scene.add(pregLinea);
const igual = mesh(textoGeo("=", 0.42, 0.12), MCR()); scene.add(igual);
// flechita curva de "vuelta" entre los dos caramelos del 1 + 1
const flecha = new THREE.Group(); scene.add(flecha);
{
  const cur = new THREE.CatmullRomCurve3([V(0.0, 0.22, 0), V(0.3, 0.05, 0.05), V(0.3, -0.22, 0.05), V(0.06, -0.38, 0)]);
  flecha.add(mesh(new THREE.TubeGeometry(cur, 32, 0.028, 10), MCR()));
  const punta = mesh(new THREE.ConeGeometry(0.07, 0.15, 16), MCR(), 0.02, -0.41, 0); punta.rotation.z = -Math.PI / 2 - 0.5; flecha.add(punta);
}
const tildePila = hacerTilde(0.13);

// ================= EL "?" (el punto es un caramelo) =================
const KQ = 1.9 / 1.5; // medidas del glifo de Lexend 800 a tamaño 1,5 (centrado): el punto va de y -0,58 a -0,22 y el gancho arranca en -0,19
const pregGeo = textoGeo("?", 1.9, 0.46);
const corteQ = new THREE.Plane();
const pregunta = mesh(pregGeo, M.g.clone()); pregunta.material.clippingPlanes = [corteQ]; scene.add(pregunta);
const QC = V(-3.32, 3.75, 0.7); // el "?"
const PUNTO = V(-0.013 * KQ, -0.43 * KQ, 0.04); // el centro del punto, en el espacio del "?" (el punto de verdad se recorta: lo reemplaza el caramelo)
// tarjetita de regalo "Para esta mesa" atada al moño (en el espacio del caramelo)
const tarjeta = new THREE.Group();
{
  const tt = tex(512, 230, (x, w, h) => { x.fillStyle = CRE; rr(x, 0, 0, w, h, 26); x.fillStyle = NAV; x.beginPath(); x.arc(46, h / 2, 16, 0, 7); x.fill(); x.fillStyle = NAV0; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "Para esta mesa", 700, 82, w - 120); x.fillText("Para esta mesa", w / 2 + 26, h / 2 + 4); });
  const tm = new THREE.MeshStandardMaterial({ map: tt, roughness: 0.7, emissive: 0xffffff, emissiveMap: tt, emissiveIntensity: 0.14 });
  const t = mesh(new THREE.BoxGeometry(1.15, 0.52, 0.02), [M.cr, M.cr, M.cr, M.cr, tm, M.cr2], 0.62, -0.42, 0); tarjeta.add(t);
  const hilo = mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([V(0, 0, 0), V(0.05, -0.2, 0.02), V(0.1, -0.42, 0)]), 12, 0.012, 6), M.navy2); tarjeta.add(hilo);
  tarjeta.position.set(0.56, -0.02, 0.04);
}

// ================= los caramelos con nombre =================
const carPlat = hacerCaramelo(); // el del gancho: del platito a la pila "Uno"
const car3a = hacerCaramelo(), car3b = hacerCaramelo(); // "Dos" juntos
const car4a = hacerCaramelo(), car4b = hacerCaramelo(); // "Uno + uno"
const carM1 = hacerCaramelo(); // la moza deja uno en el platito
const carM2 = hacerCaramelo(); // la moza vuelve y ofrece otro
const carP = hacerCaramelo(); // el punto del "?" → la mano de la moza → el frasco de Rubén
// (la tarjetita con texto se sacó en la ronda 1: el gesto lo cuenta el rótulo)
const carR1 = hacerCaramelo(); // Rubén: el primero, al platito
const carR2 = hacerCaramelo(); // Rubén: "Y este, para vos."
const carFin = hacerCaramelo("gd");

// ================= ZONA B: el almacén de Rubén =================
const almacen = new THREE.Group(); almacen.position.copy(OB); scene.add(almacen);
const MOSTRADOR = { y: 0.88, z: -1.12 };
{
  const damero = tex(512, 512, (x) => { for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) { x.fillStyle = (i + j) % 2 ? "#efeee5" : "#2c4268"; x.fillRect(i * 64, j * 64, 64, 64); } });
  damero.wrapS = damero.wrapT = THREE.RepeatWrapping; damero.repeat.set(4, 3);
  const p = mesh(new THREE.PlaneGeometry(9, 7), new THREE.MeshStandardMaterial({ map: damero, roughness: 0.45 }), 0.2, 0.004, 0.1); p.rotation.x = -Math.PI / 2; p.receiveShadow = true; almacen.add(p);
  const pared = mat(0xe7dcc4, 0.85);
  almacen.add(mesh(new THREE.BoxGeometry(9, 3.4, 0.1), pared, 0.2, 1.7, -3.3));
  almacen.add(mesh(rbox(9, 0.2, 0.12, 0.02), M.navy3, 0.2, 0.1, -3.22));
  let s = 7;
  const az = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  const colores = [C.g, C.cr, C.red, 0xd9a441, 0xffffff, C.navy3, 0x7a9c3a, 0xe8cf9f];
  const estante = mat(0x7a5233, 0.6);
  const frasco = new THREE.CylinderGeometry(0.07, 0.07, 0.2, 14), tapa = new THREE.CylinderGeometry(0.075, 0.075, 0.04, 14);
  const botella = new THREE.CylinderGeometry(0.045, 0.06, 0.3, 12), pico = new THREE.CylinderGeometry(0.02, 0.03, 0.09, 10);
  for (const y of [0.7, 1.25, 1.8, 2.35]) {
    almacen.add(mesh(rbox(5.6, 0.05, 0.42, 0.015), estante, 0.0, y, -3.05));
    for (let x = -2.7; x < 2.7; x += 0.17 + az() * 0.08) {
      const k = az(), c = colores[Math.floor(az() * colores.length)];
      if (k < 0.45) { const h = 0.22 + az() * 0.18; almacen.add(mesh(rbox(0.13, h, 0.16, 0.012), mat(c, 0.6), x, y + 0.025 + h / 2, -3.0)); }
      else if (k < 0.75) { almacen.add(mesh(frasco, mat(c, 0.35), x, y + 0.125, -3.0)); almacen.add(mesh(tapa, M.cr, x, y + 0.245, -3.0)); }
      else { almacen.add(mesh(botella, mat(c, 0.3), x, y + 0.175, -3.0)); almacen.add(mesh(pico, mat(C.cr3, 0.4), x, y + 0.37, -3.0)); }
    }
  }
  const letTex = tex(1024, 220, (x) => { x.fillStyle = "#16243d"; x.fillRect(0, 0, 1024, 220); x.strokeStyle = "#5ce611"; x.lineWidth = 12; x.strokeRect(16, 16, 992, 188); x.fillStyle = "#efeee5"; x.font = F(900, 120); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("ALMACÉN", 512, 116); });
  almacen.add(mesh(rbox(1.6, 0.34, 0.05, 0.03), [M.navy2, M.navy2, M.navy2, M.navy2, new THREE.MeshStandardMaterial({ map: letTex, roughness: 0.6, emissive: 0xffffff, emissiveMap: letTex, emissiveIntensity: 0.15 }), M.navy2], 0.0, 3.0, -3.22));
  // mostrador: cuerpo navy con frente crema, tapa de madera
  almacen.add(mesh(rbox(3.0, 0.84, 0.62, 0.03), M.navy3, 0.0, 0.42, MOSTRADOR.z));
  almacen.add(mesh(rbox(2.8, 0.6, 0.02, 0.01), M.cr, 0.0, 0.44, MOSTRADOR.z + 0.315));
  almacen.add(mesh(rbox(3.12, 0.06, 0.72, 0.02), mat(0x9b6a43, 0.55), 0.0, MOSTRADOR.y - 0.02, MOSTRADOR.z));
  const termo = crearTermo(); termo.position.set(0.95, MOSTRADOR.y + 0.01, MOSTRADOR.z - 0.1); almacen.add(termo);
  // caja registradora genérica
  const caja = new THREE.Group(); caja.position.set(1.3, MOSTRADOR.y + 0.01, MOSTRADOR.z - 0.08); caja.rotation.y = -0.35; almacen.add(caja);
  caja.add(mesh(rbox(0.36, 0.12, 0.32, 0.02), M.navy2, 0, 0.06, 0));
  const tecl = mesh(rbox(0.3, 0.1, 0.2, 0.02), M.edge, 0, 0.15, 0.03); tecl.rotation.x = -0.35; caja.add(tecl);
  for (let i = 0; i < 3; i++) for (let j = 0; j < 4; j++) { const b = mesh(rbox(0.045, 0.02, 0.035, 0.008), i === 2 && j === 3 ? M.g : M.cr, -0.09 + j * 0.06, 0.2 - i * 0.02, -0.02 + i * 0.05); b.rotation.x = -0.35; caja.add(b); }
  const visor = mesh(rbox(0.16, 0.08, 0.03, 0.01), M.navy, 0, 0.28, -0.1); caja.add(visor);
  caja.add(mesh(rbox(0.03, 0.08, 0.03, 0.01), M.navy, 0, 0.22, -0.1));
  sh(almacen);
}
// el frasco de vidrio con tapa navy, lleno de caramelos verdes
const FRASCO = V(OB.x - 0.3, MOSTRADOR.y, MOSTRADOR.z + 0.06);
const frasco = new THREE.Group(); frasco.position.copy(FRASCO); scene.add(frasco);
{
  const vidrio = new THREE.MeshPhysicalMaterial({ color: 0xe6f0f5, roughness: 0.06, transparent: true, opacity: 0.26, clearcoat: 1, clearcoatRoughness: 0.05, depthWrite: false, side: THREE.DoubleSide });
  const pf = [[0, 0.002], [0.12, 0.002], [0.13, 0.02], [0.13, 0.25], [0.11, 0.29], [0.095, 0.3], [0.095, 0.32]].map(([r, y]) => new THREE.Vector2(r, y));
  const v = mesh(new THREE.LatheGeometry(pf, 40), vidrio); v.renderOrder = 5; frasco.add(v);
  frasco.add(mesh(new THREE.CylinderGeometry(0.105, 0.105, 0.045, 32), M.navy2, 0, 0.34, 0));
  frasco.add(mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.02, 24), M.g, 0, 0.37, 0));
  let s = 3; const az = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  for (let i = 0; i < 22; i++) {
    const c = hacerCaramelo(); scene.remove(c); c.visible = true;
    const a = i * 2.4 + az(), r = 0.03 + az() * 0.06;
    c.position.set(Math.cos(a) * r, 0.035 + Math.floor(i / 6) * 0.05 + az() * 0.015, Math.sin(a) * r);
    c.scale.setScalar(0.042); c.rotation.set(az() * 3, az() * 3, az() * 3); frasco.add(c);
  }
  // reflejo vertical del vidrio (que se lea como frasco)
  const brillo = mesh(new THREE.PlaneGeometry(0.025, 0.2), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.55, depthWrite: false }), -0.06, 0.15, 0.115); brillo.renderOrder = 6; frasco.add(brillo);
}
const platitoB = hacerPlatito(TICKET.almacen);
const PB = V(OB.x + 0.36, MOSTRADOR.y, MOSTRADOR.z + 0.12);
platitoB.position.copy(PB); platitoB.rotation.y = 0.25; platitoB.userData.bis.rotation.x = 0.55;
// la tablet del mostrador (CRM): lista → ficha de Graciela → aviso; en el cierre, la lista con los gestos
const TBW = 1024, TBH = 720;
const avatar = (x, cx, cy, r, gra) => {
  x.save(); x.beginPath(); x.arc(cx, cy, r, 0, 7); x.clip();
  x.fillStyle = gra ? "#dfe8f5" : "#2c4268"; x.fillRect(cx - r, cy - r, 2 * r, 2 * r);
  if (gra) {
    x.fillStyle = "#f2c9a8"; x.beginPath(); x.ellipse(cx, cy + r * 0.12, r * 0.46, r * 0.52, 0, 0, 7); x.fill();
    x.fillStyle = "#b7a9c9"; for (let i = 0; i < 9; i++) { const a = Math.PI * (1.05 + (i / 8) * 0.9); x.beginPath(); x.arc(cx + Math.cos(a) * r * 0.48, cy - r * 0.08 + Math.sin(a) * r * 0.5, r * 0.2, 0, 7); x.fill(); }
    x.strokeStyle = "#16243d"; x.lineWidth = r * 0.07; for (const s of [-1, 1]) { x.beginPath(); x.arc(cx + s * r * 0.2, cy + r * 0.1, r * 0.14, 0, 7); x.stroke(); }
    x.fillStyle = "#5ce611"; x.fillRect(cx - r, cy + r * 0.62, 2 * r, r);
  } else { x.fillStyle = "#efeee5"; x.beginPath(); x.arc(cx, cy - r * 0.15, r * 0.36, 0, 7); x.fill(); x.beginPath(); x.ellipse(cx, cy + r * 0.85, r * 0.65, r * 0.5, 0, 0, 7); x.fill(); }
  x.restore();
};
const cabezal = (x, txt) => {
  x.fillStyle = "#f7f6f0"; x.fillRect(0, 0, TBW, TBH);
  x.fillStyle = NAV; x.fillRect(0, 0, TBW, 118);
  x.fillStyle = CRE; x.font = F(800, 66); x.textAlign = "left"; x.textBaseline = "middle"; x.fillText(txt, 44, 62);
};
const filaLista = (x, y, nombre, gra, tilde) => {
  x.fillStyle = gra ? "#e3f7d6" : "#eceae0"; rr(x, 30, y, TBW - 60, 150, 26);
  avatar(x, 112, y + 75, 52, gra);
  x.fillStyle = NAV0; x.textAlign = "left"; x.textBaseline = "middle"; ajustar(x, nombre, 700, 60, tilde ? 640 : 780); x.fillText(nombre, 190, y + 77);
};
const TAB = {
  lista: tex(TBW, TBH, (x) => { cabezal(x, "Clientes"); filaLista(x, 150, "Graciela", true); filaLista(x, 330, "Héctor", false); filaLista(x, 510, "Alicia", false); }),
  ficha: tex(TBW, TBH, (x) => {
    cabezal(x, "Clientes  ›  Ficha");
    // (la franja de 128 a 318 queda libre: ahí cae el aviso)
    x.strokeStyle = "#d9d7c9"; x.lineWidth = 4; x.setLineDash([14, 12]); x.strokeRect(34, 132, TBW - 68, 182); x.setLineDash([]);
    avatar(x, 112, 396, 66, true);
    x.fillStyle = NAV0; x.textAlign = "left"; x.textBaseline = "middle"; x.font = F(800, 76); x.fillText("Graciela", 200, 396);
    const fila2 = (y, a, b) => { x.fillStyle = "#eceae0"; rr(x, 30, y, TBW - 60, 100, 22); x.fillStyle = "#33415e"; x.font = F(600, 50); x.fillText(a, 60, y + 52); x.fillStyle = NAV0; x.font = F(800, 50); x.fillText(b, 60 + x.measureText(a).width + 18, y + 52); };
    x.font = F(600, 50); fila2(484, "Clienta desde:", "hace 1 año"); fila2(600, "Lleva siempre:", "yerba y bizcochos");
  }),
  gestos: tex(TBW, TBH, (x) => { cabezal(x, "Clientes"); filaLista(x, 150, "Graciela · 1 año", true, true); filaLista(x, 330, "Héctor · lo de siempre", false, true); filaLista(x, 510, "Alicia · volvió", false, true); }),
};
const tablet = crearTablet(TAB.lista, 0.62, 0.44, 0.28); scene.add(tablet);
const TB0 = V(OB.x - 0.82, MOSTRADOR.y, MOSTRADOR.z + 0.02);
tablet.position.copy(TB0); tablet.rotation.y = 0.12;
const tabPant = tablet.userData.pantalla, tabPiv = tablet.userData.pivote;
// el aviso verde que cae sobre la ficha
const avisoTex = tex(1000, 185, (x, w, h) => {
  x.fillStyle = VER; rr(x, 0, 0, w, h, 36);
  x.fillStyle = NAV0; x.beginPath(); const cx = 92, cy = h / 2; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + (i * Math.PI) / 5, r = i % 2 ? 26 : 58; x.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r); } x.closePath(); x.fill();
  x.textAlign = "left"; x.textBaseline = "middle"; x.font = F(800, 78); x.fillText("Hoy cumple 1 año", 178, 64);
  x.font = F(700, 58); x.fillText("como clienta", 178, 136);
});
const aviso = mesh(new THREE.PlaneGeometry(0.55, 0.102), new THREE.MeshBasicMaterial({ map: avisoTex, transparent: true, toneMapped: false })); tabPiv.add(aviso);
const tildesTab = [0, 1, 2].map(() => { const t = hacerTilde(0.034); t.visible = false; return t; });

// ---------- Rubén, Graciela y la fila ----------
const ruben = crearPersonaje({ ...ELENCO.almacenero, parpadeoCada: 1e6, dedos: false }); scene.add(ruben.raiz);
const graciela = crearPersonaje({ ...ELENCO.clienta, parpadeoCada: 1e6 }); scene.add(graciela.raiz);
// lentes de Graciela: de perfil o de espaldas se esconde el aro del lado de atrás (si no, flota un aro negro junto a la oreja)
const lentesG = [], labioG = [];
graciela.cabeza.traverse((o) => {
  if (!o.isMesh) return;
  if (o.geometry.type === "TorusGeometry" && Math.abs(o.geometry.parameters.radius - 0.088) < 1e-6) lentesG.push(o);
  if (Math.abs(o.scale.y - 0.26) < 1e-6 && Math.abs(o.scale.x - 0.01) < 1e-6) o.visible = false; // patillas
});
const FILA = [
  { nombre: "Cliente", piel: PIEL.clara, pelo: PELO.gris, peinado: "corto", camisa: C.cr2, mangas: "largas", pantalon: C.navy2, panza: 1.1, alto: 1.02 },
  { nombre: "Clienta", piel: PIEL.trigueña, pelo: PELO.negro, peinado: "rodete", camisa: C.cr, mangas: "largas", pollera: C.navy3, pantalon: null, panza: 1.0, alto: 0.95 },
  { nombre: "Cliente", piel: PIEL.media, pelo: PELO.castaño, peinado: "jopo", jopoAlto: 0.6, camisa: 0xc9c6b8, mangas: "cortas", pantalon: C.navy, panza: 1.0, alto: 1.03 },
  { nombre: "Clienta", piel: PIEL.clara, pelo: PELO.rubio, peinado: "coleta", camisa: C.cr2, mangas: "largas", pantalon: C.navy2, panza: 0.96, alto: 0.94 },
].map((cfg) => { const p = crearPersonaje({ cejasColor: 0x3a2f2a, zapatos: 0x2a2220, parpadeoCada: 1e6, ...cfg }); scene.add(p.raiz); return p; });
for (const p of [ruben, graciela, ...FILA]) p.raiz.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } });
const POSFILA = [[0.82, -0.22], [1.4, -0.08], [1.98, 0.06], [2.56, 0.2]]; // relativas al almacén: en fila a la derecha de Graciela
const G0 = { x: OB.x + 0.22, z: -0.36, giro: Math.PI + 0.1 };
const R0 = { x: OB.x + 0.08, z: -1.58, giro: -0.04 };
const pregRojaGeo = textoGeo("?", 0.24, 0.07);
const pregRojas = [0, 1, 2, 3, 4].map(() => { const m = mesh(pregRojaGeo, M.red); scene.add(m); return m; });
const tildeFin = hacerTilde(0.09);

// ================= TIEMPOS CLAVE =================
const T = {
  saltito: W[5] - 0.05, cuenta: W[8] - 0.05,
  grua: S["s02-estudio"] - 0.02,
  vuela1: S["s03-uno-dos"] - 0.02, llega1: S["s03-uno-dos"] + 0.5, // el caramelo del platito → pila "Uno"
  dos: W[21] - 0.1, // los dos caramelos → pila "Dos"
  vaMoza: S["s04-uno-mas-uno"] - 0.02, dar: W[27] - 0.05, amaga: W[29] - 0.02, vuelve: W[32] - 0.02, otro: W[35] - 0.05,
  latigo: W[35] + 0.05, // dolly rápido a la pila 4
  mismos: W[37] - 0.05, junta: S["s06-por-que"] - 0.3, preg: S["s06-por-que"] + 0.02,
  parecio: W[42] - 0.02, personal: W[47] - 0.05,
  vuelaB: S["s07-quien"] + 0.02, frasco: S["s07-quien"] + 0.85, todos: W[56] - 0.05,
  ficha: W[59] + 0.05, avisa: W[63] - 0.05, gra: W[64] - 0.02,
  // s09: da uno; en la pausa mira el aviso de la ficha; "y vuelve con otro": el segundo sale de la tablet
  daR: W[70] - 0.05, mira: W[73] + 0.3, vuelveR: W[74] - 0.05, habla: W[78], vos: W[82], callaR: W[82] + 0.5,
  contra: W[82] + 0.5, grua2: S["s10-gesto"], tildes: W[89] - 0.2, fin: S["s11-llamada"],
};

// ================= CÁMARA =================
// PLANOS: [desde, [[t, px, py, pz, mx, my, mz, fov], ...]]; dentro de un plano, Catmull-Rom monótona; entre planos, corte.
const ob = (x, y, z) => [OB.x + x, y, z];
const k = (t, p, m, fov = 34) => [t, ...p, ...m, fov];
const PLANOS = [
  [0, [
    k(0, [0.6, 1.62, 1.06], [0.4, 0.79, 0.32]),
    k(T.grua - 0.05, [0.58, 1.5, 0.94], [0.4, 0.79, 0.32]),
    k(T.grua + 0.55, [0.6, 2.7, 4.6], [0.1, 0.95, 0.2]),
    k(S["s03-uno-dos"] - 0.1, [0.4, 3.15, 7.0], [0.0, 1.0, 0.05]),
    // travelling a la izquierda siguiendo al caramelo que vuela a la pila
    k(T.llega1 + 0.05, [-3.8, 2.8, 9.1], [-3.87, 1.62, PZ]),
    k(S["s04-uno-mas-uno"] - 0.05, [-3.98, 2.7, 8.9], [-3.87, 1.62, PZ]),
    // de vuelta a la mesa: la moza en plano medio
    k(S["s04-uno-mas-uno"] + 0.42, [2.75, 1.8, 4.5], [0.92, 1.0, 0.25]),
    k(T.amaga, [2.8, 1.8, 4.45], [0.98, 1.0, 0.2]),
    k(T.vuelve, [2.8, 1.8, 4.4], [1.0, 1.0, 0.12]),
    k(T.latigo, [2.75, 1.8, 4.45], [0.95, 1.0, 0.22]),
    // dolly rápido a la pila del 1 + 1
    k(T.latigo + 0.38, [-3.2, 2.35, 7.3], [-3.3, 1.72, PZ]),
    k(S["s05-mismos"] + 0.25, [-3.1, 3.3, 9.0], [-3.2, 2.65, PZ]),
    k(S["s06-por-que"] - 0.2, [-3.2, 3.45, 8.6], [-3.22, 2.8, PZ]),
    k(T.preg + 0.25, [-3.2, 4.05, 5.75], [-3.32, 3.85, PZ]),
    k(T.parecio, [-2.8, 4.05, 5.55], [-3.32, 3.85, PZ]),
    // el punto del "?" vuela a la mano de la moza
    k(T.parecio + 0.75, [-0.35, 1.42, 2.75], [0.84, 1.2, 0.4]),
    k(T.vuelaB, [-0.25, 1.42, 2.62], [0.85, 1.2, 0.4]),
    // (en el vuelo al frasco manda el seguimiento del caramelo; ver ponerCamara)
    k(T.frasco + 0.5, ob(-2.6, 3.6, 4.2), ob(0.4, 0.95, -0.8)),
    k(S["s08-ficha"] - 0.05, ob(-2.5, 3.55, 4.1), ob(0.4, 0.95, -0.8)),
    // push-in a la tablet
    k(S["s08-ficha"] + 0.65, ob(-0.82, 1.72, 1.35), ob(-0.82, 1.16, -0.98)),
    k(T.daR - 0.3, ob(-0.82, 1.7, 1.22), ob(-0.82, 1.16, -0.98)),
    // Rubén y Graciela en el mostrador (tres cuartos)
    k(T.daR + 0.25, ob(-2.25, 2.15, 3.55), ob(-0.42, 1.1, -0.95)),
    k(T.vuelveR + 0.4, ob(-2.15, 2.1, 3.4), ob(-0.4, 1.1, -0.95)),
    k(T.habla - 0.05, ob(-1.3, 1.7, 1.75), ob(0.1, 1.25, -1.2)),
    // primer plano de Rubén (por encima del hombro de Graciela)
    k(T.habla + 0.35, ob(-1.1, 1.6, 1.0), ob(0.0, 1.24, -1.5)),
    k(T.contra, ob(-1.05, 1.6, 0.9), ob(0.0, 1.25, -1.5)),
  ]],
  // contraplano: Graciela, por encima del hombro de Rubén
  [T.contra, [
    k(T.contra, ob(0.85, 1.58, -2.55), ob(0.2, 1.3, -0.36)),
    k(T.grua2, ob(0.8, 1.56, -2.45), ob(0.2, 1.32, -0.36)),
  ]],
  // grúa arriba y atrás: Graciela se va feliz; baja a la tablet con los gestos
  [T.grua2, [
    k(T.grua2, ob(0.1, 2.9, 4.4), ob(-0.4, 0.95, -0.1)),
    k(T.grua2 + 0.85, ob(0.0, 3.4, 4.8), ob(-0.6, 0.9, 0.2)),
    k(T.grua2 + 1.55, ob(-0.82, 2.15, 1.15), ob(-0.82, 1.06, -0.98)),
    k(T.fin, ob(-0.82, 2.1, 1.08), ob(-0.82, 1.06, -0.98)),
  ]],
  [T.fin, [
    k(T.fin, [OF.x, 1.15, 4.4], [OF.x, 0.86, 0]),
    k(DUR, [OF.x, 1.15, 4.2], [OF.x, 0.86, 0]),
  ]],
];
const _mira = new THREE.Vector3();
let plano = 0;
function ponerCamara(t) {
  let pi = 0; while (pi + 1 < PLANOS.length && PLANOS[pi + 1][0] <= t) pi++;
  plano = pi;
  const K = PLANOS[pi][1];
  let i = 0; while (i + 1 < K.length - 1 && K[i + 1][0] <= t) i++;
  const a = K[i], b = K[Math.min(i + 1, K.length - 1)];
  const h = b[0] - a[0];
  const u = h > 0 ? cl((t - a[0]) / h) : 0;
  // tangente Catmull-Rom en el tiempo (pendiente entre vecinos), puesta en 0 si cambia el sentido (no rebasa las pausas)
  const tang = (j, c) => {
    if (j <= 0 || j >= K.length - 1) return 0;
    const p = K[j - 1], q = K[j], r = K[j + 1];
    const d1 = (q[c] - p[c]) / Math.max(1e-4, q[0] - p[0]), d2 = (r[c] - q[c]) / Math.max(1e-4, r[0] - q[0]);
    if (d1 * d2 <= 0) return 0;
    const m = (r[c] - p[c]) / Math.max(1e-4, r[0] - p[0]);
    return Math.sign(m) * Math.min(Math.abs(m), 3 * Math.abs(d1), 3 * Math.abs(d2));
  };
  const s2 = u * u, s3 = s2 * u;
  const v = [];
  for (let c = 1; c <= 7; c++) {
    if (h <= 0) { v.push(a[c]); continue; }
    v.push((2 * s3 - 3 * s2 + 1) * a[c] + (s3 - 2 * s2 + u) * h * tang(i, c) + (-2 * s3 + 3 * s2) * b[c] + (s3 - s2) * h * tang(i + 1, c));
  }
  // s07: la cámara sigue al caramelo que vuela de la palma de la moza al frasco
  const w = pi === 0 ? eio(sg(t, T.vuelaB, T.vuelaB + 0.22)) * (1 - eio(sg(t, T.frasco + 0.05, T.frasco + 0.5))) : 0;
  if (w > 0) {
    const c = vueloB(Math.min(t, T.frasco + 0.2)), u = sg(t, T.vuelaB, T.frasco);
    const off = lerpV(V(-0.9, 0.2, 1.5), V(-0.55, 0.45, 1.0), u);
    const pos = c.clone().add(off), mira = c.clone().add(V(0.12 * (1 - u), -0.05 * u, 0));
    for (let j = 0; j < 3; j++) { v[j] = lerp(v[j], pos.getComponent(j), w); v[j + 3] = lerp(v[j + 3], mira.getComponent(j), w); }
  }
  const wq = pi === 0 ? Math.sin(Math.PI * sg(t, T.parecio, T.parecio + 0.8)) * 0.85 : 0;
  if (wq > 0) { const c = vueloQ(t); for (let j = 0; j < 3; j++) v[j + 3] = lerp(v[j + 3], c.getComponent(j), wq); }
  camera.position.set(v[0], v[1], v[2]);
  // un respiro de cámara en mano, muy leve
  camera.position.x += Math.sin(t * 0.7) * 0.006; camera.position.y += Math.sin(t * 0.53) * 0.005;
  _mira.set(v[3], v[4], v[5]);
  camera.fov = v[6];
  const d = camera.position.distanceTo(_mira);
  camera.near = Math.max(0.03, d * 0.02); camera.far = 200;
  camera.updateProjectionMatrix();
  camera.lookAt(_mira);
}

const MOZA_K = [
  [0, { x: 0.98, z: 0.3, giro: -1.25, ...BRAZOS.costado, manoI: [0.3, 0.05, 0.12], ...CARA.sonrisa, cabeza: { giro: 0.25, asiente: 0.05, ladea: 0.04 }, ojos: { x: 0.4, y: -0.1, abiertos: 1 } }],
  // dar uno: se inclina sobre el platito
  [T.dar + 0.2, { inclina: 0.2, cabeza: { giro: 0.0, asiente: 0.25, ladea: 0 }, ojos: { x: 0, y: -0.6, abiertos: 1 } }, 0.35],
  [T.amaga - 0.05, { inclina: 0, cabeza: { giro: 0.15, asiente: 0.05, ladea: 0 }, ojos: { x: 0.2, y: -0.1, abiertos: 1 } }, 0.3],
  // amaga a irse: gira y da un paso
  [T.amaga + 0.38, { giro: -2.75, x: 0.98 + 0.12, z: 0.3 - 0.3, cabeza: { giro: 0.0, asiente: 0.02, ladea: 0 } }, 0.38],
  // se frena: mira por encima del hombro (la pausa)
  [T.amaga + 0.85, { cabeza: { giro: 1.0, asiente: 0.0, ladea: 0.08 }, ...CARA.esperanza, ojos: { x: 0.7, y: 0, abiertos: 1 } }, 0.3],
  // vuelve
  [T.vuelve + 0.32, { giro: -1.2, x: 0.98, z: 0.3, cabeza: { giro: 0.2, asiente: 0.05, ladea: 0.03 }, ...CARA.feliz, ojos: { x: 0.3, y: -0.1, abiertos: 1, feliz: 0.4 } }, 0.32],
  [T.latigo + 0.5, { cabeza: { giro: 0.1, asiente: 0.05, ladea: 0 } }, 0.3],
  // s06: de frente a cámara, la palma arriba
  [T.parecio + 0.4, { giro: -0.42, ...CARA.feliz, manoD: [-0.1, 0.5, 0.42], codoD: [-0.8, -0.7, -0.1], cabeza: { giro: 0.0, asiente: 0.1, ladea: 0.06 }, ojos: { x: 0, y: -0.2, abiertos: 1, feliz: 0.45 } }, 0.35],
];

// la palma de la moza en s06 (de ahí sale el caramelo al frasco de Rubén)
moza.poner(poseEn(T.parecio + 1.2, MOZA_K)); moza.raiz.updateMatrixWorld(true);
const PALMA = moza.mano("D").getWorldPosition(new THREE.Vector3()).add(V(0.0, 0.045, 0.02));
const DENTRO = FRASCO.clone().add(V(0.0, 0.2, 0.0));
// del punto del "?" a la palma de la moza (s06)
const QSTART = QC.clone().add(PUNTO);
function vueloQ(t) { return arco(QSTART, PALMA, eio(sg(t, T.parecio + 0.05, T.parecio + 0.72)), 0.35); }
function vueloB(t) {
  const uB = eio(sg(t, T.vuelaB, T.frasco));
  let p = arco(PALMA, DENTRO.clone().add(V(0, 0.18, 0)), uB, 1.0); p.z += Math.sin(Math.PI * uB) * 0.7;
  const cae = sg(t, T.frasco, T.frasco + 0.18);
  if (cae > 0) p = lerpV(DENTRO.clone().add(V(0, 0.18, 0)), DENTRO, cae * cae);
  return p;
}
// ================= ZONA R + C en el tiempo =================
const altoPila = (kk) => 0.18 + NMON[kk] * HM;
const K_PILA = 0.2; // caramelo arriba de una pila
// cuándo empieza a llover cada pila
const LLUEVE = () => [S["s03-uno-dos"] - 0.4, T.llega1 + 0.02, T.dos + 0.42, T.latigo + 0.16];
const DT_MON = [0.0, 0.028, 0.026, 0.024];
function monedas(t) {
  const ll = LLUEVE();
  pilas.forEach((pila, kk) => pila.forEach((m, i) => {
    const t0 = ll[kk] + i * DT_MON[kk];
    const vis = t > t0 && t < T.parecio + 0.6;
    m.visible = vis; if (!vis) return;
    const yF = 0.18 + HM * (i + 0.5);
    const u = sg(t, t0, t0 + 0.12);
    const y0 = altoPila(kk) + 0.42;
    const y = kk === 0 ? yF : lerp(y0, yF, u * u) + rebote(t, t0 + 0.16, 18, 40, 0.025);
    m.position.set(PX[kk] + Math.sin(i * 2.3 + kk) * 0.008, y, PZ + Math.cos(i * 1.7 + kk) * 0.007);
    m.rotation.set(kk === 0 ? 0 : (1 - u) * 0.5, i * 0.7, 0);
    m.scale.setScalar(kk === 0 ? popIn(t, t0 + i * 0.012, 0.2) : 1);
    m.material = kk === 0 ? MMON.gris : kk === 3 && t > T.latigo + 0.16 + 15 * DT_MON[3] + 0.1 ? MMON.verde : MMON.oro;
  }));
}
function zonaRC(t) {
  const enR = plano === 0 && t < T.vuelaB + 0.9;
  mesa.visible = sombraMesa.visible = platito.visible = enR;
  for (const c of COM) c.p.raiz.visible = c.silla.visible = enR;
  moza.raiz.visible = canasta.visible = enR;
  const enC = plano === 0 && t > S["s02-estudio"] && t < T.parecio + 0.7;
  bandeja.visible = sombraBand.visible = enC;
  if (!enR) { pilas.flat().forEach((m) => (m.visible = false)); [carPlat, car3a, car3b, car4a, car4b, carM1, carM2, carP].forEach((c) => (c.visible = false)); tarjeta.visible = false; pregLinea.visible = igual.visible = flecha.visible = pregunta.visible = tildePila.visible = false; return; }
  // ---- el platito: en "cuenta" el ticket se abre un poco ----
  platito.userData.bis.rotation.x = 0.42 + 0.35 * eio(sg(t, T.cuenta, T.cuenta + 0.35)) + 0.05 * rebote(t, T.cuenta + 0.35, 9, 26, 1);
  // ---- el caramelo del gancho: salta en "caramelo"; en s03 vuela a la pila "Uno" ----
  {
    const base = P0.clone().add(V(0.035, 0.035, 0.045));
    const salto = pulso(t, T.saltito, 0.32);
    const giro = 0.35 * eo(sg(t, T.saltito, T.saltito + 0.32));
    const dest = V(PX[1], altoPila(1) + 0.15, PZ);
    const top = V(PX[1], altoPila(1) + 0.75, PZ);
    let p = base.clone(); p.y += salto * 0.06; let kk = K_REAL, ry = -0.75 + giro, rz = 0.0, rx = 0;
    if (t > T.vuela1) {
      const u = eio(sg(t, T.vuela1, T.llega1));
      p = arco(base, top, u, 0.9); kk = lerp(K_REAL, K_PILA, eo(u)); ry = lerp(ry, 0.2, u); rz = Math.sin(Math.PI * u) * 1.2; rx = u * 0.6;
      // flota arriba mientras llueven las monedas y después se apoya
      const ll = LLUEVE()[1] + NMON[1] * DT_MON[1];
      const baja = eio(sg(t, ll, ll + 0.25));
      if (u >= 1) { p = lerpV(top, dest, baja); p.y += Math.sin(t * 3) * 0.02 * (1 - baja); rx = 0.6 * (1 - baja); }
    }
    ponerCar(carPlat, p, kk, ry, rz, rx);
    carPlat.visible = t < T.mismos + 0.1;
  }
  // ---- los dos caramelos de la pila "Dos" (vienen de la canastita, fuera de cuadro a la derecha) ----
  {
    const ll = LLUEVE()[2] + NMON[2] * DT_MON[2];
    [[car3a, -0.11, 0], [car3b, 0.11, 0.06]].forEach(([c, dz, dt]) => {
      const t0 = T.dos + dt;
      const desde = V(PX[2] + 2.2, 2.6, PZ + 0.4), top = V(PX[2], altoPila(2) + 0.7 + dz * 0.5, PZ + dz * 0.4), dest = V(PX[2], altoPila(2) + 0.1 + (dz > 0 ? 0.13 : 0), PZ + dz * 0.25);
      const u = eio(sg(t, t0, t0 + 0.4));
      let p = arco(desde, top, u, 0.4); const baja = eio(sg(t, ll, ll + 0.25));
      if (u >= 1) p = lerpV(top, dest, baja);
      // s05: suben y se agrandan (izquierda: los dos juntos)
      const sube = eio(sg(t, S["s05-mismos"] - 0.05, S["s05-mismos"] + 0.4));
      const par = V(-4.0, 2.5 + (dz > 0 ? 0.135 : -0.135), PZ + 0.1);
      p = lerpV(p, par, sube);
      // s06: se juntan en el centro y se funden en el "?"
      const jn = eio(sg(t, T.junta, T.preg + 0.08));
      p = lerpV(p, QC.clone().add(V(0, -0.5, 0)), jn);
      const kk = lerp(K_PILA, 0.27, sube) * (1 - jn * 0.8);
      ponerCar(c, p, t > t0 ? kk * popIn(t, t0, 0.2) : 0, 0.15 + (dz > 0 ? -0.05 : 0.05), Math.sin(Math.PI * u) * 0.8 + jn * 2.0, 0.1);
      if (jn >= 0.999) c.visible = false;
    });
  }
  // ---- el 1 + 1: uno, y después otro (en el dolly a la pila 4) ----
  {
    const ll = LLUEVE()[3] + NMON[3] * DT_MON[3];
    [[car4a, 0, -0.1], [car4b, 0.2, 0.12]].forEach(([c, dt, dz], j) => {
      const t0 = T.otro + dt;
      const desde = V(PX[3] + 1.6, 2.4, PZ + 0.5), top = V(PX[3], altoPila(3) + 0.5 + j * 0.22, PZ), dest = V(PX[3], altoPila(3) + 0.1 + j * 0.22, PZ + dz * 0.3);
      const u = eio(sg(t, t0, t0 + 0.35));
      let p = arco(desde, top, u, 0.4); const baja = eio(sg(t, ll, ll + 0.22));
      if (u >= 1) p = lerpV(top, dest, baja);
      const sube = eio(sg(t, S["s05-mismos"] - 0.05, S["s05-mismos"] + 0.4));
      const par = V(-2.64, j ? 2.2 : 2.82, PZ + 0.1);
      p = lerpV(p, par, sube);
      const jn = eio(sg(t, T.junta, T.preg + 0.08));
      p = lerpV(p, QC.clone().add(V(0, -0.5, 0)), jn);
      const kk = lerp(K_PILA, 0.27, sube) * (1 - jn * 0.8);
      ponerCar(c, p, t > t0 ? kk * popIn(t, t0, 0.2) : 0, -0.1, Math.sin(Math.PI * u) * 0.8 - jn * 2.0, 0.1);
      if (jn >= 0.999) c.visible = false;
    });
  }
  monedas(t);
  // ---- la base vacía del 1 + 1 con un "?" de línea; el "=" y la flecha; el tilde de "la que más" ----
  {
    const v = enC && t > S["s03-uno-dos"] + 0.2 && t < T.otro;
    ocultar(pregLinea, v ? popIn(t, S["s03-uno-dos"] + 0.2, 0.3) * (1 - sg(t, T.otro - 0.12, T.otro)) : 0);
    if (pregLinea.visible) { pregLinea.position.set(PX[3], 0.62 + Math.sin(t * 2.4) * 0.03, PZ); pregLinea.rotation.set(0, Math.sin(t * 1.3) * 0.3, 0); }
    const vi = t > T.mismos && t < T.junta + 0.1;
    ocultar(igual, vi ? popIn(t, T.mismos, 0.3) * (1 - sg(t, T.junta - 0.1, T.junta + 0.1)) : 0);
    if (igual.visible) { igual.position.set(-3.32, 2.51, PZ + 0.1); igual.rotation.set(0, Math.sin(t * 1.6) * 0.15, 0); }
    ocultar(flecha, vi ? popIn(t, T.mismos + 0.15, 0.3) * (1 - sg(t, T.junta - 0.1, T.junta + 0.1)) : 0);
    if (flecha.visible) flecha.position.set(-2.36, 2.52, PZ + 0.1);
    const tv = T.latigo + 0.16 + 15 * DT_MON[3] + 0.12;
    ocultar(tildePila, t > tv && t < S["s05-mismos"] + 0.05 ? popIn(t, tv, 0.3) * (1 - sg(t, S["s05-mismos"] - 0.1, S["s05-mismos"] + 0.05)) : 0);
    if (tildePila.visible) { tildePila.position.set(PX[3] + 0.42, altoPila(3) + 0.5, PZ + 0.1); tildePila.quaternion.copy(camera.quaternion); }
  }
  // ---- el "?": UN objeto; su punto es un caramelo; en "Pareció" se desarma y el punto vuela a la mano de la moza ----
  const Q = QC.clone();
  {
    const v = t > T.preg - 0.05 && t < T.parecio + 0.4;
    const k0 = popIn(t, T.preg - 0.05, 0.32) * (1 + 0.06 * pulso(t, W[41], 0.3));
    const fuera = eio(sg(t, T.parecio, T.parecio + 0.3));
    ocultar(pregunta, v ? k0 * (1 - fuera) : 0);
    pregunta.position.copy(Q); pregunta.rotation.set(0, Math.sin(t * 1.5) * 0.16 + fuera * 2.5, fuera * 0.6); pregunta.updateMatrixWorld(true);
    corteQ.setFromNormalAndCoplanarPoint(V(0, 1, 0), V(0, -0.205 * KQ, 0)).applyMatrix4(pregunta.matrixWorld);
  }
  // ---- la moza ----
  zonaMoza(t, Q);
  // ---- comensales ----
  COM.forEach((c, j) => {
    const mira = j === 1 && t > T.vuelve ? 0.45 : 0.2;
    const feliz = j === 1 ? sg(t, T.otro - 0.1, T.otro + 0.2) : 0;
    const pose = mezclar({ x: c.x, y: -0.11, z: c.z, giro: c.giro, ...CARA.sonrisa, manoI: [0.2, 0.3, 0.42], manoD: [-0.2, 0.3, 0.42], codoI: [0.8, -0.6, -0.2], codoD: [-0.8, -0.6, -0.2], cabeza: { giro: mira * (j ? -1 : 1) + Math.sin(t * 0.9 + j) * 0.05, asiente: 0.1, ladea: 0 }, ojos: { x: j ? -0.4 : 0.5, y: -0.1, abiertos: 1 } }, CARA.feliz, feliz * 0.8);
    pose.t = t; c.p.poner(pose); sentar(c.p);
  });
}
function zonaMoza(t, Q) {
  const X0 = 0.98, Z0 = 0.3;
  const ofrece = sg(t, T.vuelve + 0.32, T.otro);
  let pose = poseEn(t, MOZA_K);
  if (t > T.amaga && t < T.amaga + 0.4) pose.paso = Math.sin(Math.PI * sg(t, T.amaga, T.amaga + 0.4));
  if (t > T.vuelve && t < T.vuelve + 0.32) pose.paso = Math.sin(Math.PI * sg(t, T.vuelve, T.vuelve + 0.32));
  moza.poner(pose); moza.raiz.updateMatrixWorld(true);
  // la mano derecha va al platito (dar uno) y después ofrece otro a la comensala
  const alPlat = pulso(t, T.dar - 0.1, 0.75);
  const ofr = ofrece * (1 - sg(t, T.latigo + 0.2, T.latigo + 0.5));
  if (alPlat > 0 || ofr > 0) {
    const pPl = moza.cuerpo.worldToLocal(P0.clone().add(V(0.0, 0.1, 0.0)));
    const pOf = [-0.16, 0.42, 0.45];
    const md = mezclar(mezclar(pose.manoD, [pPl.x, pPl.y, pPl.z], alPlat), pOf, ofr);
    pose = { ...pose, manoD: md, codoD: [-0.8, -0.5, -0.3] };
    moza.poner(pose); moza.raiz.updateMatrixWorld(true);
  }
  // la canastita en la mano izquierda
  const mI = moza.mano("I").getWorldPosition(new THREE.Vector3());
  canasta.position.copy(mI).add(V(0, -0.16, 0)); canasta.rotation.set(0, pose.giro, 0);
  const mD = moza.mano("D").getWorldPosition(new THREE.Vector3());
  // dar uno: el caramelo va de la canastita al platito
  {
    const t0 = T.dar - 0.1;
    const u = sg(t, t0, t0 + 0.38);
    let p = mD.clone().add(V(0, -0.05, 0));
    if (t > t0 + 0.38) p = P0.clone().add(V(-0.06, 0.03, -0.02));
    ponerCar(carM1, p, t > t0 - 0.05 && t < T.vuelaB ? K_REAL * popIn(t, t0 - 0.05, 0.2) : 0, 0.9 + u * 0.3, 0, 0.2);
  }
  // vuelve con otro: en la mano mientras ofrece; después queda en la mesa, frente a la comensala
  {
    const t0 = T.vuelve + 0.25;
    let p = mD.clone().add(V(0, -0.01, 0.02));
    const deja = sg(t, T.latigo + 0.2, T.latigo + 0.5);
    if (deja > 0) p = lerpV(p, V(-0.5, TOP + 0.03, 0.18), eio(deja));
    ponerCar(carM2, p, t > t0 && t < T.vuelaB ? K_REAL * popIn(t, t0, 0.2) : 0, 0.4, 0.3, 0.1);
  }
  // el punto del "?" (s06) → la palma de la moza → (s07) el frasco de Rubén
  {
    const enQ = pregunta.localToWorld(PUNTO.clone());
    const palma = mD.clone().add(V(0.0, 0.045, 0.02));
    const u = eio(sg(t, T.parecio + 0.05, T.parecio + 0.72));
    let p = u > 0 ? vueloQ(t) : enQ;
    let kk = lerp(0.42, 0.15, u), ry = lerp(0.0, -0.42 + 0.0, u), rz = Math.sin(Math.PI * u) * 1.4, rx = 0.15;
    if (t >= T.parecio + 0.72) { p = palma; ry = -0.42 + Math.sin(t * 1.5) * 0.06; rz = 0; }
    // s07: sale volando al frasco
    const uB = eio(sg(t, T.vuelaB, T.frasco));
    if (uB > 0) { p = vueloB(t); kk = lerp(0.15, 0.042, eio(sg(t, T.frasco - 0.3, T.frasco))); rz = uB * 4.0; rx = uB * 2.0; }
    const v = t > T.preg - 0.05 && t < T.frasco + 0.25;
    ponerCar(carP, p, v ? kk * (u > 0 ? 1 : popIn(t, T.preg - 0.05, 0.32)) : 0, ry, rz, rx);
    // la tarjetita "Para esta mesa" en "personal": aparece y gira hacia cámara
    const vt = t > T.personal && t < T.vuelaB;
    tarjeta.visible = false; void vt;
    if (false) { const a = eo(sg(t, T.personal, T.personal + 0.35)); tarjeta.scale.setScalar(lerp(0.3, 1, bk(sg(t, T.personal, T.personal + 0.3)))); tarjeta.rotation.set(0, (1 - a) * -1.6, 0.06 * Math.sin(t * 3)); }
  }
}

// ================= ZONA B en el tiempo =================
const _v = new THREE.Vector3();
function zonaB(t) {
  const enB = (plano === 0 && t > T.vuelaB - 0.05) || plano === 1 || plano === 2;
  almacen.visible = frasco.visible = platitoB.visible = tablet.visible = enB;
  ruben.raiz.visible = graciela.raiz.visible = enB;
  FILA.forEach((p) => (p.raiz.visible = enB));
  if (!enB) { pregRojas.forEach((m) => (m.visible = false)); tildeFin.visible = carR1.visible = carR2.visible = aviso.visible = false; tildesTab.forEach((x) => (x.visible = false)); return; }
  // ---- la tablet: lista → ficha → aviso; se levanta hacia la cámara en s08; en s10 la lista con los gestos ----
  {
    const sube = eio(sg(t, S["s08-ficha"] - 0.05, S["s08-ficha"] + 0.45)) * (1 - eio(sg(t, T.daR - 0.4, T.daR)));
    tablet.position.copy(TB0).add(V(0, 0.16 * sube, 0.05 * sube));
    tabPiv.rotation.x = -lerp(0.28, 0.08, sube);
    const enGesto = plano === 2;
    const pant = enGesto ? TAB.gestos : t > T.ficha ? TAB.ficha : TAB.lista;
    if (tabPant.material.map !== pant) { tabPant.material.map = pant; tabPant.material.emissiveMap = pant; tabPant.material.needsUpdate = true; }
    // vibra en "avisa"
    const vib = t > T.avisa && t < T.avisa + 0.45 ? Math.sin((t - T.avisa) * 90) * 0.012 * (1 - sg(t, T.avisa, T.avisa + 0.45)) : 0;
    tablet.rotation.z = vib; tablet.position.x += vib * 0.4;
    const va = plano < 2 && t > T.avisa;
    aviso.visible = va;
    if (va) {
      const u = eio(sg(t, T.avisa, T.avisa + 0.3));
      aviso.position.set(0, lerp(0.42, 0.2937, u), 0.012); aviso.scale.setScalar(popIn(t, T.avisa, 0.3) * (1 + 0.06 * pulso(t, T.gra, 0.3) + 0.12 * pulso(t, T.mira, 0.3) + 0.1 * pulso(t, T.vuelveR, 0.25)));
    }
    // los tildes de los gestos (s10)
    tildesTab.forEach((tk, i) => {
      const t0 = T.tildes + i * 0.3;
      tk.visible = enGesto && t > t0;
      if (!tk.visible) return;
      tabPiv.updateMatrixWorld(true);
      tk.position.copy(tabPiv.localToWorld(V(0.62 * 0.92 * (0.5 - 0.09), 0.44 * 0.06 + 0.44 * 0.88 * (1 - (225 + i * 180) / 720), 0.02)));
      tk.quaternion.copy(tabPiv.getWorldQuaternion(new THREE.Quaternion()));
      tk.scale.setScalar(popIn(t, t0, 0.25));
    });
  }
  // ---- la fila: cada uno con su "?" rojo en "todos"; se apagan cuando se abre la ficha ----
  const enFila = [graciela, ...FILA];
  FILA.forEach((p, i) => {
    const [x, z] = POSFILA[i];
    p.poner({ x: OB.x + x, z, giro: Math.atan2(R0.x - OB.x - x, R0.z - z), ...BRAZOS.costado, ...CARA.neutra, t, cabeza: { giro: Math.sin(t * 0.8 + i * 1.7) * 0.12, asiente: 0.05, ladea: Math.sin(t * 0.6 + i) * 0.04 }, ojos: { x: 0, y: 0, abiertos: 1 } });
  });
  pregRojas.forEach((m, i) => {
    const t0 = T.todos + i * 0.07;
    const v = plano === 0 && t > t0 && t < T.ficha + 0.45;
    ocultar(m, v ? popIn(t, t0, 0.25) * (1 - eio(sg(t, T.ficha + 0.15, T.ficha + 0.45))) : 0);
    if (m.visible) { enFila[i].raiz.updateMatrixWorld(true); enFila[i].cabeza.getWorldPosition(_v); m.position.copy(_v).add(V(0, 0.92 + Math.sin(t * 3 + i) * 0.02, 0)); m.quaternion.copy(camera.quaternion); }
  });
  // ---- Rubén ----
  const habla = t > T.habla && t < T.callaR;
  const mano = (u) => [];
  let pr = poseEn(t, [
    [0, { ...R0, ...BRAZOS.apoyado, ...CARA.neutra, cabeza: { giro: 0.0, asiente: 0.05, ladea: 0.04 }, ojos: { x: 0, y: -0.1, abiertos: 0.9 }, cejas: { alto: 0.1, ang: 0.6 } }],
    // "no se acuerda de todos": se rasca la cabeza, cejas preocupadas
    [T.todos - 0.2, { ...CARA.incredula, cejas: { alto: 0.4, ang: 0.8, asim: 0 }, ojos: { x: -0.4, y: 0, abiertos: 0.85 }, cabeza: { giro: -0.2, asiente: 0.02, ladea: 0.12 }, manoD: [-0.34, 0.98, -0.16], codoD: [-1, 0.2, -0.3] }, 0.3],
    [S["s08-ficha"] + 0.3, { ...BRAZOS.apoyado, ...CARA.sonrisa, cabeza: { giro: 0.45, asiente: 0.18, ladea: 0 }, ojos: { x: 0.6, y: -0.3, abiertos: 1 }, cejas: { alto: 0.3, ang: 0.1 } }, 0.35],
    [T.gra, { ...CARA.feliz, cejas: { alto: 0.6, ang: 0.2 } }, 0.3],
    [T.daR, { ...CARA.sonrisa, cabeza: { giro: 0.0, asiente: 0.12, ladea: 0 }, ojos: { x: 0, y: -0.2, abiertos: 1 } }, 0.25],
    // amaga a irse: se da vuelta hacia la estantería
    // mira el aviso de la tablet (a su derecha): "1 año"
    [T.mira + 0.3, { cabeza: { giro: -1.1, asiente: 0.25, ladea: -0.05 }, ojos: { x: -0.9, y: -0.5, abiertos: 1 }, ...CARA.sorpresa, boca: { sonrisa: 0.5, abierta: 0.15, ancho: 0.9 } }, 0.3],
    // vuelve
    [T.vuelveR + 0.4, { ...CARA.sonrisa, cabeza: { giro: 0.0, asiente: 0.1, ladea: 0.05 }, ojos: { x: 0, y: -0.15, abiertos: 1, feliz: 0.3 } }, 0.32],
    [T.habla, { ...CARA.feliz, boca: { sonrisa: 0.9, abierta: 0, ancho: 1.1 }, cabeza: { giro: -0.06, asiente: 0.06, ladea: 0.1 }, ojos: { x: 0, y: -0.1, abiertos: 1, feliz: 0.35 } }, 0.25],
    [T.grua2 + 0.2, { ...CARA.feliz, ...BRAZOS.apoyado, cabeza: { giro: -0.3, asiente: 0.05, ladea: 0.1 } }, 0.3],
  ]);
  if (habla) pr.boca = { ...pr.boca, abierta: 0.12 + 0.42 * Math.abs(Math.sin((t - T.habla) * 13)) * (0.6 + 0.4 * Math.sin((t - T.habla) * 5.3)) };
  // guiño en "vos"
  if (t > T.vos && t < T.vos + 0.45) pr.ojos = { ...pr.ojos, guiño: Math.sin(Math.PI * sg(t, T.vos, T.vos + 0.45)) };
  ruben.poner(pr); ruben.raiz.updateMatrixWorld(true);
  // la mano derecha: al frasco, al platito (el primero); al frasco y a la palma (el segundo)
  const FR = FRASCO.clone().add(V(0.02, 0.3, 0.2)), PLW = PB.clone().add(V(-0.04, 0.09, 0.0));
  const tramo = (a, b) => sg(t, a, b);
  const g1 = tramo(T.daR - 0.05, T.daR + 0.3), g2 = tramo(T.daR + 0.38, T.daR + 0.7), g3 = tramo(T.daR + 0.75, T.daR + 1.0);
  const h1 = tramo(T.vuelveR, T.vuelveR + 0.3), h2 = tramo(T.vuelveR + 0.65, T.habla + 0.15);
  const atrapa = ruben.cuerpo.localToWorld(V(-0.24, 0.48, 0.4));
  let objW = null;
  const local = (w) => { const p = ruben.cuerpo.worldToLocal(w.clone()); return [p.x, p.y, p.z]; };
  const palmaR = ruben.cuerpo.localToWorld(V(0.03, 0.56, 0.46));
  const descanso = ruben.cuerpo.localToWorld(V(-0.3, 0.32, 0.36));
  if (t > T.daR - 0.05 && t < T.daR + 1.0) objW = g1 < 1 ? lerpV(descanso, FR, eio(g1)) : g2 < 1 ? lerpV(FR, PLW, eio(g2)) : lerpV(PLW, descanso, eio(g3));
  if (t > T.vuelveR) objW = h2 <= 0 ? lerpV(descanso, atrapa, eio(h1)) : lerpV(atrapa, palmaR, eio(h2));
  if (t > T.grua2 - 0.6) objW = lerpV(palmaR, descanso, eio(sg(t, T.grua2 - 0.6, T.grua2 - 0.2)));
  if (objW) { pr = { ...pr, manoD: local(objW), codoD: [-0.9, -0.5, -0.3] }; ruben.poner(pr); ruben.raiz.updateMatrixWorld(true); }
  const mR = ruben.mano("D").getWorldPosition(new THREE.Vector3());
  // el primer caramelo: del frasco a la mano y al platito
  {
    const enMano = t > T.daR + 0.3 && t < T.daR + 0.68;
    const p = enMano ? mR.clone().add(V(0, -0.04, 0.02)) : PB.clone().add(V(0.05, 0.035, 0.03));
    ponerCar(carR1, p, t > T.daR + 0.3 && plano < 2 ? K_REAL : 0, 0.5, 0, 0.15);
  }
  // el segundo: "Y este, para vos." en la palma
  {
    // sale del aviso de la ficha ("1 año") y vuela a la mano de Rubén
    const t0 = T.vuelveR, t1 = T.vuelveR + 0.5;
    tabPiv.updateMatrixWorld(true);
    const desde = tabPiv.localToWorld(aviso.position.clone().add(V(0, 0, 0.03)));
    const enMano = mR.clone().add(V(0, 0.03, 0.02));
    const u = eio(sg(t, t0, t1));
    const p = u < 1 ? arco(desde, enMano, u, 0.22) : enMano;
    const k = K_REAL * 1.15 * (u < 1 ? lerp(1.6, 1, u) : 1) * popIn(t, t0, 0.22);
    ponerCar(carR2, p, t > t0 && t < T.contra + 0.2 ? k : 0, -0.3 + Math.sin(t * 2) * 0.05 + (1 - u) * 2.0, (1 - u) * 1.2, 0.0);
  }
  // ---- Graciela ----
  {
    const sale = plano === 2;
    let pg = poseEn(t, [
      [0, { ...G0, ...BRAZOS.costado, ...CARA.neutra, cabeza: { giro: 0.0, asiente: -0.08, ladea: 0.0 }, ojos: { x: 0, y: 0.2, abiertos: 1 } }],
      [T.gra, { ...CARA.esperanza, cabeza: { giro: 0.0, asiente: -0.12, ladea: 0.06 } }, 0.3],
      [T.habla + 0.2, { ...CARA.sorpresa, boca: { sonrisa: 0.4, abierta: 0.3, ancho: 0.8 } }, 0.3],
      // contraplano: la mano al pecho, ojos felices
      [T.contra + 0.12, { ...CARA.feliz, ojos: { x: 0, y: 0.15, abiertos: 1, feliz: 0.8 }, manoI: [0.08, 0.42, 0.24], codoI: [0.8, -0.6, 0.0], cabeza: { giro: 0.0, asiente: -0.1, ladea: -0.12 } }, 0.25],
    ]);
    if (sale) {
      // se va contenta hacia la puerta (hacia cámara, a la izquierda) con sus dos caramelos
      const u = sg(t, T.grua2 + 0.15, T.grua2 + 1.3);
      pg = { ...pg, ...CARA.feliz, x: lerp(G0.x, OB.x - 2.0, u), z: lerp(G0.z, 1.05, u), giro: lerp(G0.giro, Math.PI * 2 - 0.95, eio(sg(t, T.grua2, T.grua2 + 0.35))), paso: u > 0 && u < 1 ? 1 : 0,
        manoI: [0.16, 0.36, 0.3], manoD: [-0.16, 0.36, 0.3], codoI: [0.8, -0.8, -0.2], codoD: [-0.8, -0.8, -0.2], cabeza: { giro: 0.1, asiente: 0.0, ladea: 0.08 } };
    }
    pg.t = t;
    graciela.poner(pg); graciela.raiz.updateMatrixWorld(true);
    if (sale) {
      const a = graciela.mano("I").getWorldPosition(new THREE.Vector3()), b = graciela.mano("D").getWorldPosition(new THREE.Vector3());
      ponerCar(carR1, a.add(V(0, 0.02, 0)), K_REAL, pg.giro, 0.2, 0); ponerCar(carR2, b.add(V(0, 0.02, 0)), K_REAL, pg.giro, -0.2, 0);
    }
  }
  if (lentesG.length === 2) {
    const hp = graciela.cabeza.getWorldPosition(new THREE.Vector3());
    const fw = graciela.cabeza.getWorldDirection(new THREE.Vector3());
    const cosA = fw.dot(camera.position.clone().sub(hp).normalize());
    const a = lentesG[0].getWorldPosition(new THREE.Vector3()).distanceTo(camera.position), b = lentesG[1].getWorldPosition(new THREE.Vector3()).distanceTo(camera.position);
    const perfil = cosA < 0.5, atras = cosA < -0.2;
    lentesG[0].visible = !atras && !(perfil && a > b); lentesG[1].visible = !atras && !(perfil && b > a);
  }
  // tilde verde arriba de los dos, en el contraplano
  {
    const v = plano === 1 && t > T.contra + 0.25;
    ocultar(tildeFin, v ? popIn(t, T.contra + 0.25, 0.3) : 0);
    if (tildeFin.visible) { graciela.cabeza.getWorldPosition(_v); const der = V(1, 0, 0).applyQuaternion(camera.quaternion), arr = V(0, 1, 0).applyQuaternion(camera.quaternion); tildeFin.position.copy(_v).addScaledVector(arr, 0.76).addScaledVector(der, -0.05); tildeFin.quaternion.copy(camera.quaternion); }
  }
}

// ================= EL CIERRE =================
function zonaFin(t) {
  const v = plano === 3;
  ocultar(carFin, v ? popIn(t, T.fin + 0.05, 0.4) * 0.66 : 0);
  if (carFin.visible) { carFin.position.set(OF.x, 0.55 + Math.sin(t * 2.2) * 0.03, 0); carFin.rotation.set(0.3, 0.35 * Math.sin((t - T.fin) * 1.6), 0.2 + Math.sin(t * 1.4) * 0.08); }
}

// ================= ESCENA EN EL TIEMPO =================
function renderAt(t) {
  scene.environmentRotation.y = t * 0.08;
  ponerCamara(t);
  const enB = _mira.x > 5 && _mira.x < 50, fin = plano === 3;
  piso.visible = !fin && !(enB && plano !== 0);
  sol.position.copy(_mira).add(V(-3.5, 7, 6)); sol.target.position.copy(_mira);
  const r = enB ? 3.4 : 4.5;
  Object.assign(sol.shadow.camera, { left: -r, right: r, top: r, bottom: -r, near: 0.5, far: 30 }); sol.shadow.camera.updateProjectionMatrix();
  sol.intensity = enB ? 2.1 : 1.5;
  lampara.position.copy(OB).add(V(0.2, 2.45, -1.2)); lampara.intensity = enB ? 6 : 0;
  lamparaR.intensity = !enB && !fin ? 1.2 : 0;
  key.intensity = enB ? 0.9 : fin ? 2.0 : 2.1;
  fill.intensity = enB ? 0.95 : 1.0;
  zonaRC(t);
  zonaB(t);
  zonaFin(t);
  renderer.render(scene, camera);
}

window.__tresRender = renderAt;
window.addEventListener("hf-seek", (e) => renderAt(e.detail.time));
renderAt(window.__hfThreeTime || 0);
if (window.__tresListo) window.__tresListo();
