// Capa 3D de caso-pedidosya (Three.js r170 local). Base: reels/netflix-blockbuster.
// Todo se dibuja desde el tiempo del timeline (hf-seek): renderAt(t) es una función pura de t, el
// azar va con semilla. Objetos genéricos de marca (navy, verde, crema; rojo apagado solo para el
// problema): Montevideo low-poly con rambla (sin lugares reales ni marcas), el mapa de la región con
// los 15 países que se encienden, el chivito, el teléfono de disco que se da vuelta y se vuelve
// celular, la moto de reparto, las tarjetas de pedido, el año 2009 → 2014, el anillo del 70 % y el
// local del cliente. PedidosYa solo se nombra en texto (capa HTML): ni logo, ni su rojo, ni su letra.
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
let semilla = 20091;
const azar = () => ((semilla = (semilla * 16807) % 2147483647) / 2147483647);

// ---------- render ----------
const canvas = document.getElementById("tres");
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, preserveDrawingBuffer: true, powerPreference: "high-performance", logarithmicDepthBuffer: true });
renderer.setPixelRatio(1);
renderer.setSize(1080, 1920, false);
renderer.setClearColor(0x000000, 0);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.NeutralToneMapping;
renderer.toneMappingExposure = 1.0;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(30, 1080 / 1920, 0.05, 400);

function entorno() {
  const env = new THREE.Scene();
  env.background = new THREE.Color(0x070b14);
  const tira = (w, h, x, y, z, ry, c, k) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(c).multiplyScalar(k), side: THREE.DoubleSide }));
    m.position.set(x, y, z); m.rotation.y = ry; env.add(m);
  };
  tira(2.2, 9, -6, 2, 2, Math.PI / 2.4, 0xfff1dc, 2.4);
  tira(1.4, 8, 6, 1, -1, -Math.PI / 2.2, 0xbcd6ff, 1.8);
  tira(10, 1.2, 0, 7, 0, 0, 0xffffff, 1.2);
  const top = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), new THREE.MeshBasicMaterial({ color: 0x15233d, side: THREE.DoubleSide }));
  top.position.y = 9; top.rotation.x = Math.PI / 2; env.add(top);
  const pm = new THREE.PMREMGenerator(renderer);
  const rt = pm.fromScene(env, 0.035);
  pm.dispose();
  return rt.texture;
}
scene.environment = entorno();
scene.environmentIntensity = 0.55;

const key = new THREE.DirectionalLight(0xffe3c2, 2.6); key.position.set(-4, 6, 7); scene.add(key);
const rim = new THREE.DirectionalLight(0x9cc4ff, 2.3); rim.position.set(5, 3, -6); scene.add(rim);
const fill = new THREE.HemisphereLight(0x2c4270, 0x0b1220, 0.9); scene.add(fill);

// ---------- paleta ----------
const C = { navy: 0x0b1220, navy2: 0x16243d, navy3: 0x1f3254, edge: 0x2c4268, cr: 0xefeee5, cr2: 0xd9d7c9, cr3: 0xb4b2a3, g: 0x5ce611, gd: 0x3fa60a, red: 0xc7655b, white: 0xffffff, gris: 0x7d8597 };
const mat = (color, rough = 0.55, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0.0, ...extra });
const M = {
  g: mat(C.g, 0.5), gd: mat(C.gd, 0.55), cr: mat(C.cr, 0.6), cr2: mat(C.cr2, 0.62), cr3: mat(C.cr3, 0.65),
  navy: mat(C.navy, 0.5), navy2: mat(C.navy2, 0.5), navy3: mat(C.navy3, 0.52), edge: mat(C.edge, 0.5),
  red: mat(C.red, 0.58), white: mat(C.white, 0.5), gris: mat(C.gris, 0.62),
  anio: mat(C.g, 0.45, { emissive: C.g, emissiveIntensity: 0.22 }), oscuro: mat(0x131a26, 0.7),
  luz: new THREE.MeshStandardMaterial({ color: 0xfff0d0, emissive: 0xffe2a8, emissiveIntensity: 1.6, roughness: 0.4 }),
  luzG: new THREE.MeshStandardMaterial({ color: C.g, emissive: C.g, emissiveIntensity: 0.9, roughness: 0.4 }),
};
const rbox = (w, h, d, r = 0.06, seg = 3) => new RoundedBoxGeometry(w, h, d, seg, Math.min(r, w / 2 - 0.001, h / 2 - 0.001, d / 2 - 0.001));
const mesh = (g, m, x = 0, y = 0, z = 0) => { const o = new THREE.Mesh(g, m); o.position.set(x, y, z); return o; };
const grupo = (...hijos) => { const g = new THREE.Group(); hijos.forEach((h) => g.add(h)); return g; };

const sombraTex = (() => {
  const c = document.createElement("canvas"); c.width = c.height = 256;
  const x = c.getContext("2d"); const gr = x.createRadialGradient(128, 128, 0, 128, 128, 128);
  gr.addColorStop(0, "rgba(2,4,10,0.75)"); gr.addColorStop(0.5, "rgba(2,4,10,0.35)"); gr.addColorStop(1, "rgba(2,4,10,0)");
  x.fillStyle = gr; x.fillRect(0, 0, 256, 256);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
})();
const sombra = (w, d) => {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), new THREE.MeshBasicMaterial({ map: sombraTex, transparent: true, depthWrite: false, opacity: 1 }));
  m.rotation.x = -Math.PI / 2; m.renderOrder = -1; scene.add(m); return m;
};

const font = new FontLoader().parse(LEXEND);
const textoGeo = (s, size, depth) => {
  const g = new TextGeometry(s, { font, size, depth, curveSegments: 6, bevelEnabled: true, bevelThickness: depth * 0.25, bevelSize: size * 0.025, bevelSegments: 3 });
  g.computeBoundingBox(); const b = g.boundingBox;
  g.translate(-(b.max.x + b.min.x) / 2, -(b.max.y + b.min.y) / 2, -(b.max.z + b.min.z) / 2);
  return g;
};

const PISO = -1.55;
function ocultar(o, s) { o.visible = s > 0.002; if (o.visible) o.scale.setScalar(s); }
function apoyar(som, x, z, s, op = 1, y = PISO) { som.visible = s > 0.002; if (!som.visible) return; som.position.set(x, y + 0.005, z); som.scale.setScalar(Math.max(0.001, s)); som.material.opacity = op * cl(s); }
const en = (t, a, b) => t >= a && t < b;
const vida = (t, a, b, din = 0.4, dout = 0.3) => (t < a || t > b + dout ? 0 : bk(sg(t, a, a + din)) * (1 - eio(sg(t, b, b + dout))));

// ================= MONTEVIDEO LOW-POLY (genérico: rambla, edificios, faroles) =================
const costa = (x) => 1.25 + 0.3 * Math.sin(x * 0.55 + 0.4) + 0.16 * Math.sin(x * 1.4 + 1.1);
const ciudad = new THREE.Group(); scene.add(ciudad);
const TORRE = { x: 0.15, z: -0.35 }; // donde se para el celular-torre
{
  // tierra: forma que termina en la costa (z = costa(x)), vista desde arriba
  const sh = new THREE.Shape();
  sh.moveTo(-6, 7);
  for (let x = -6; x <= 6.001; x += 0.25) sh.lineTo(x, -costa(x));
  sh.lineTo(6, 7); sh.closePath();
  const g = new THREE.ExtrudeGeometry(sh, { depth: 0.3, bevelEnabled: false });
  g.rotateX(-Math.PI / 2);
  // la forma usa y = -z: tras girar, z' = -y = z de la costa
  ciudad.add(mesh(g, M.navy3, 0, PISO - 0.3, 0));
  // rambla: banda clara pegada a la costa + murito
  const pos = [], idx = [];
  let n = 0;
  for (let x = -6; x <= 6.001; x += 0.2) {
    const z = costa(x);
    pos.push(x, PISO + 0.006, z - 0.42, x, PISO + 0.006, z - 0.04); if (n) { const a = (n - 1) * 2; idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); } n++;
  }
  const rg = new THREE.BufferGeometry(); rg.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3)); rg.setIndex(idx); rg.computeVertexNormals();
  ciudad.add(new THREE.Mesh(rg, new THREE.MeshStandardMaterial({ color: C.cr3, roughness: 0.7, side: THREE.DoubleSide })));
  // línea verde de la calle (la ruta de la moto)
  const pos2 = [], idx2 = []; n = 0;
  for (let x = -6; x <= 6.001; x += 0.2) {
    const z = costa(x) - 0.62;
    pos2.push(x, PISO + 0.008, z - 0.05, x, PISO + 0.008, z + 0.05); if (n) { const a = (n - 1) * 2; idx2.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); } n++;
  }
  const lg = new THREE.BufferGeometry(); lg.setAttribute("position", new THREE.Float32BufferAttribute(pos2, 3)); lg.setIndex(idx2); lg.computeVertexNormals();
  ciudad.add(new THREE.Mesh(lg, new THREE.MeshStandardMaterial({ color: C.g, emissive: C.g, emissiveIntensity: 0.35, roughness: 0.5, side: THREE.DoubleSide })));
  // faroles
  const poste = new THREE.CylinderGeometry(0.018, 0.018, 0.34, 6), foco = new THREE.SphereGeometry(0.05, 10, 8);
  for (let x = -5.6; x <= 5.6; x += 0.7) {
    const z = costa(x) - 0.06;
    ciudad.add(mesh(poste, M.cr3, x, PISO + 0.17, z));
    ciudad.add(mesh(foco, M.luz, x, PISO + 0.36, z));
  }
  // agua
  const agua = new THREE.Mesh(new THREE.PlaneGeometry(9000, 9000), new THREE.MeshStandardMaterial({ color: 0x11223e, roughness: 0.42, metalness: 0.05 }));
  agua.rotation.x = -Math.PI / 2; agua.position.set(0, PISO - 0.12, 0); ciudad.add(agua);
  // edificios con ventanas (una textura de ventanas, con las prendidas en el emissive)
  const vent = (prendidas) => {
    const c = document.createElement("canvas"); c.width = 128; c.height = 256; const x = c.getContext("2d");
    x.fillStyle = prendidas ? "#000" : "#e6e4d8"; x.fillRect(0, 0, 128, 256);
    let s = prendidas ? 5 : 5;
    const r = () => ((s = (s * 16807) % 2147483647) / 2147483647);
    for (let j = 0; j < 8; j++) for (let i = 0; i < 4; i++) {
      const on = r() < 0.42;
      x.fillStyle = prendidas ? (on ? "#ffd9a0" : "#000") : on ? "#fff3d6" : "#26385a";
      x.fillRect(14 + i * 28, 14 + j * 30, 18, 18);
    }
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; return t;
  };
  const vt = vent(false), ve = vent(true);
  const fachadas = [1, 2, 3].map((k) => {
    const a = vt.clone(), b = ve.clone(); a.repeat.set(1, k * 0.55); b.repeat.set(1, k * 0.55); a.needsUpdate = b.needsUpdate = true;
    return new THREE.MeshStandardMaterial({ color: 0xffffff, map: a, emissive: 0xffffff, emissiveMap: b, emissiveIntensity: 0.9, roughness: 0.6 });
  });
  const techo = M.cr2, techoG = mat(C.g, 0.5);
  const caja = new THREE.BoxGeometry(1, 1, 1); caja.translate(0, 0.5, 0);
  for (let gz = -5.6; gz < 1.3; gz += 0.58) for (let gx = -5.6; gx <= 5.6; gx += 0.58) {
    const x = gx + (azar() - 0.5) * 0.12, z = gz + (azar() - 0.5) * 0.12;
    const w = 0.32 + azar() * 0.18, d = 0.32 + azar() * 0.18;
    if (z > costa(x) - 0.75 - d / 2) continue; // la rambla y la calle libres
    if (Math.hypot(x - TORRE.x, z - TORRE.z) < 0.95) continue; // lugar para el celular
    if (azar() < 0.12) continue;
    const lejos = cl((-z + 1) / 6.5);
    const h = 0.28 + Math.pow(azar(), 1.7) * (0.55 + 0.95 * lejos) + (Math.abs(x) < 2.2 ? 0.25 : 0);
    const k = h < 0.6 ? 0 : h < 1.2 ? 1 : 2;
    const ed = new THREE.Mesh(caja, [fachadas[k], fachadas[k], azar() < 0.07 ? techoG : techo, techo, fachadas[k], fachadas[k]]);
    ed.position.set(x, PISO, z); ed.scale.set(w, h, d); ciudad.add(ed);
  }
}

// ================= MAPA DE LA REGIÓN (contorno simplificado; 25 u por grado, Montevideo = 0,0) =================
const K = 25, LON0 = -56.2, LAT0 = -34.9;
const mx = (lon) => (lon - LON0) * K, mz = (lat) => -(lat - LAT0) * K;
const CONT = [[-114.8,31.8],[-112,29],[-110,27],[-109,25.5],[-106,23],[-105.5,20.5],[-103,18.5],[-100,17],[-96,15.7],[-94,16.1],[-92.2,14.5],[-91,13.9],[-88,13.2],[-87.5,12.9],[-86,11.5],[-85.7,10],[-84.7,9.6],[-83.5,8.4],[-82,8.2],[-80.5,7.3],[-79.6,8.2],[-78.4,8.1],[-77.9,7.2],[-77.3,4],[-78.7,1.6],[-80.1,0],[-80.9,-2.2],[-80.3,-3.4],[-81.3,-4.6],[-79.6,-7.6],[-76.3,-13.8],[-75.2,-15.5],[-70.4,-18.4],[-70.2,-23],[-71.4,-30],[-71.7,-33],[-73.2,-37],[-73.8,-41.5],[-74.5,-46],[-75.3,-50],[-74.4,-52.5],[-71.5,-54],[-68.6,-54.9],[-67.2,-55.6],[-65.2,-54.8],[-68.3,-52.3],[-69.1,-51.6],[-68.9,-50.3],[-65.8,-47.8],[-67.4,-46],[-65,-44.9],[-63.6,-42.5],[-65,-41],[-62.3,-38.8],[-57.6,-38.1],[-56.7,-36.5],[-57.3,-35.4],[-58.4,-34.6],[-58.5,-34.0],[-57.8,-34.4],[-56.2,-34.9],[-54.9,-34.95],[-53.4,-33.7],[-51.1,-31],[-48.6,-28.2],[-48.5,-25.9],[-46.3,-24],[-43.2,-23],[-41,-22],[-39,-17.9],[-38.5,-13],[-35,-9],[-34.8,-7.1],[-35.5,-5.1],[-38.5,-3.7],[-41.5,-2.9],[-44.3,-2.5],[-48.5,-1.2],[-50,0],[-51.2,4.3],[-53,5.6],[-57,6],[-60,8.4],[-61.6,10.3],[-64,10.6],[-68,10.5],[-70.5,12.2],[-71.5,11],[-72.2,11.9],[-74.2,11.3],[-75.6,10.4],[-76.9,8.6],[-77.8,8.7],[-79.6,9.6],[-81.4,8.8],[-82.6,9.6],[-83.7,10.9],[-83.4,14.5],[-85.3,15.9],[-88.2,15.9],[-88.4,17.4],[-87.5,21.5],[-90.4,21],[-91.5,18.5],[-94.5,18.2],[-96.5,19.8],[-97.4,22.5],[-97.5,25.8],[-99.5,27.5],[-100,29],[-104,29.5],[-106.5,31.8],[-108,31.4],[-111,31.3]];
const ISLAS = [
  [[-74.4,18.4],[-72.8,19.9],[-70,19.7],[-68.4,18.6],[-69.9,18.3],[-71.4,17.6],[-72.8,18.1]],
  [[-84.9,21.9],[-82,23.1],[-77.2,21.6],[-74.2,20.2],[-77.7,19.9],[-80.5,21.8]],
];
const URU = [[-58.4,-33.1],[-58.1,-32.0],[-57.6,-30.2],[-56.0,-30.1],[-55.0,-31.2],[-53.2,-32.5],[-53.4,-33.7],[-54.9,-34.95],[-56.2,-34.9],[-57.8,-34.4],[-58.4,-33.9]];
const PAISES = [ // capitales de los 15 países (Delivery Hero / prensa, ver fuentes.md)
  ["Uruguay", -56.2, -34.9], ["Argentina", -58.4, -34.6], ["Paraguay", -57.6, -25.3], ["Chile", -70.7, -33.4], ["Bolivia", -68.1, -16.5],
  ["Perú", -77.0, -12.0], ["Ecuador", -78.5, -0.2], ["Venezuela", -66.9, 10.5], ["Panamá", -79.5, 9.0], ["Costa Rica", -84.1, 9.9],
  ["Nicaragua", -86.3, 12.1], ["Honduras", -87.2, 14.1], ["El Salvador", -89.2, 13.7], ["Guatemala", -90.5, 14.6], ["Rep. Dominicana", -69.9, 18.5],
];
const mapa = new THREE.Group(); scene.add(mapa);
// la tierra del mapa es navy de cerca (sigue a la tierra de la ciudad) y se aclara a crema de lejos
const tierraMat = new THREE.MeshStandardMaterial({ color: C.navy3, roughness: 0.75 });
const TIERRA_CERCA = new THREE.Color(C.navy3), TIERRA_LEJOS = new THREE.Color(C.cr2);
const forma = (pts) => { const sh = new THREE.Shape(); pts.forEach(([lo, la], i) => (i ? sh.lineTo(mx(lo), -mz(la)) : sh.moveTo(mx(lo), -mz(la)))); sh.closePath(); return sh; };
const MAPA_TOP = PISO - 0.06;
{
  const prof = 10;
  const tierra = tierraMat;
  const canto = new THREE.MeshStandardMaterial({ color: C.cr3, roughness: 0.8 });
  for (const pts of [CONT, ...ISLAS]) {
    const g = new THREE.ExtrudeGeometry(forma(pts), { depth: prof, bevelEnabled: false });
    g.rotateX(-Math.PI / 2);
    const m = new THREE.Mesh(g, [tierra, canto]); m.position.y = MAPA_TOP - prof; mapa.add(m);
  }
}
const costaMapa = new THREE.Group(); mapa.add(costaMapa);
{
  const cos = new THREE.MeshStandardMaterial({ color: C.cr, emissive: C.cr, emissiveIntensity: 0.35, roughness: 0.6 });
  for (const pts of [CONT, ...ISLAS]) {
    const v = pts.map(([lo, la]) => new THREE.Vector3(mx(lo), MAPA_TOP + 0.6, mz(la)));
    const tg = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(v, true, "catmullrom", 0.1), v.length * 4, 8, 6, true);
    costaMapa.add(new THREE.Mesh(tg, cos));
  }
}
const uruMat = new THREE.MeshStandardMaterial({ color: C.g, emissive: C.g, emissiveIntensity: 0.25, roughness: 0.5 });
const uru = (() => { const g = new THREE.ExtrudeGeometry(forma(URU), { depth: 14, bevelEnabled: false }); g.rotateX(-Math.PI / 2); const m = new THREE.Mesh(g, uruMat); m.position.y = MAPA_TOP - 10; return m; })();
mapa.add(uru);
// pines y arcos desde Montevideo
const pinGeoTallo = new THREE.CylinderGeometry(4, 4, 60, 10); pinGeoTallo.translate(0, 30, 0);
const pinGeoCabeza = new THREE.SphereGeometry(19, 20, 14);
const pinGeoDisco = new THREE.CylinderGeometry(26, 26, 2, 24);
const pines = PAISES.map(([nombre, lo, la], i) => {
  const g = new THREE.Group();
  g.add(mesh(pinGeoTallo, M.g));
  g.add(mesh(pinGeoCabeza, M.luzG, 0, 64, 0));
  g.add(mesh(pinGeoDisco, M.gd, 0, 0, 0));
  g.position.set(mx(lo), MAPA_TOP + 0.5, mz(la)); mapa.add(g);
  let arco = null;
  if (i > 0) {
    const a = new THREE.Vector3(0, MAPA_TOP + 2, 0), b = new THREE.Vector3(mx(lo), MAPA_TOP + 2, mz(la));
    const L = a.distanceTo(b);
    const c = a.clone().lerp(b, 0.5); c.y += Math.max(70, L * 0.28);
    const curva = new THREE.QuadraticBezierCurve3(a, c, b);
    const tg = new THREE.TubeGeometry(curva, 60, 9, 8, false);
    arco = new THREE.Mesh(tg, M.luzG); mapa.add(arco);
    arco.userData.total = tg.index.count;
  }
  return { g, arco, d: Math.hypot(mx(lo), mz(la)) };
});

// ================= CHIVITO AL PAN (uruguayo: alto y cargado) =================
const chivito = new THREE.Group(); scene.add(chivito);
const capas = [];
{
  const pan = mat(0xe8cf9f, 0.62), panTop = mat(0xd9a865, 0.5), carne = mat(0x5e3d2a, 0.72), jamon = mat(0xe3a296, 0.55);
  const muzza = mat(0xf7f1de, 0.38), panceta = mat(0xb5584a, 0.6), grasa = mat(0xf0d6c8, 0.6), lechuga = mat(C.g, 0.55), tomate = mat(C.red, 0.45);
  const clara = mat(0xffffff, 0.35), yema = mat(0xf2a91c, 0.3, { emissive: 0xf2a91c, emissiveIntensity: 0.18 }), aceituna = mat(0x55702a, 0.32);
  // disco con borde irregular (y ondulado en el canto)
  const ondulado = (r, h, amp, n, sd, ola = 0.8) => {
    const g = new THREE.CylinderGeometry(r, r, h, 96, 1); const p = g.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i), z = p.getZ(i), rr2 = Math.hypot(x, z);
      if (rr2 < 0.01) continue;
      const a = Math.atan2(z, x), k = 1 + amp * Math.sin(a * n + sd) + amp * 0.6 * Math.sin(a * (n + 3) + sd * 2);
      p.setX(i, x * k); p.setZ(i, z * k); p.setY(i, p.getY(i) + Math.sin(a * n * 1.3 + sd) * h * ola);
    }
    g.computeVertexNormals(); return g;
  };
  const panAbajo = mesh(new THREE.CylinderGeometry(1.1, 1.0, 0.36, 64), pan, 0, 0, 0);
  const lech = mesh(ondulado(1.32, 0.05, 0.07, 9, 1, 1.4), lechuga);
  const tom = grupo(...[[-0.95, 0.35], [0.9, 0.5], [0.15, -0.95]].map(([x, z]) => mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.09, 32), tomate, x, 0, z)));
  const churr = mesh(ondulado(1.42, 0.1, 0.09, 5, 2, 0.6), carne);
  const jam = mesh(ondulado(1.3, 0.05, 0.05, 7, 3, 1.2), jamon);
  const muz = new THREE.Group(); muz.add(mesh(ondulado(1.2, 0.07, 0.04, 6, 4, 0.5), muzza));
  for (let i = 0; i < 9; i++) { // muzzarella derritiéndose por los costados
    const a = -0.4 + i * 0.75, largo = 0.18 + ((i * 37) % 5) * 0.05;
    const gota = grupo(mesh(new THREE.CylinderGeometry(0.075, 0.075, largo, 12), muzza, 0, -largo / 2, 0), mesh(new THREE.SphereGeometry(0.075, 12, 8), muzza, 0, -largo, 0));
    gota.position.set(Math.cos(a) * 1.19, 0.02, Math.sin(a) * 1.19); muz.add(gota);
  }
  const pan2 = new THREE.Group();
  [[0.25, 0.05], [1.3, -0.05], [2.4, 0.08]].forEach(([ang, tilt]) => {
    const tira = grupo(mesh(rbox(2.75, 0.06, 0.24, 0.025), panceta), mesh(rbox(2.7, 0.065, 0.06, 0.02), grasa, 0, 0.002, 0.04));
    tira.rotation.set(tilt, ang, 0); pan2.add(tira);
  });
  const huevo = grupo(mesh(ondulado(0.88, 0.06, 0.13, 4, 5, 0.6), clara), mesh(new THREE.SphereGeometry(0.31, 28, 14, 0, Math.PI * 2, 0, Math.PI / 2), yema, 0.05, 0.03, 0.22));
  huevo.children[1].scale.y = 0.62; huevo.position.set(0.1, 0.04, 0.98); huevo.rotation.x = 0.12;
  const top = new THREE.Mesh(new THREE.SphereGeometry(1.13, 56, 26, 0, Math.PI * 2, 0, Math.PI / 2), panTop); top.scale.y = 0.55;
  const sesamo = new THREE.SphereGeometry(0.045, 8, 6);
  for (let i = 0; i < 30; i++) { const a = azar() * Math.PI * 2, r = Math.sqrt(azar()) * 0.92; const s = mesh(sesamo, M.cr, Math.cos(a) * r, Math.sqrt(Math.max(0, 1 - (r / 1.13) ** 2)) * 1.13, Math.sin(a) * r); s.scale.set(1, 0.5, 1.8); s.rotation.y = a; top.add(s); }
  const pinche = grupo(mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.15, 8), M.cr, 0, 0.45, 0), mesh(new THREE.SphereGeometry(0.19, 20, 14), aceituna, 0, 1.05, 0), mesh(new THREE.SphereGeometry(0.065, 12, 8), tomate, 0, 1.08, 0.16));
  pinche.children[1].scale.set(1, 1.3, 1);
  // de abajo hacia arriba: [objeto, altura de apoyo]
  [[panAbajo, 0.18], [lech, 0.4], [tom, 0.47], [churr, 0.57], [jam, 0.66], [muz, 0.73], [pan2, 0.8], [huevo, 0.86], [top, 0.9], [pinche, 1.5]]
    .forEach(([o, y]) => { const g = grupo(o); chivito.add(g); capas.push({ g, y }); });
}
const chivitoSombra = sombra(3.4, 2.0);

// ================= TELÉFONO DE DISCO (el problema, rojo apagado) =================
const fijo = new THREE.Group(); scene.add(fijo);
const tubo = new THREE.Group();
{
  fijo.add(mesh(rbox(2.3, 0.55, 1.7, 0.16), M.red, 0, 0.275, 0));
  const tapa = mesh(rbox(1.9, 0.5, 1.25, 0.2), M.red, 0, 0.72, -0.08); fijo.add(tapa);
  // frente inclinado con el disco
  const frente = new THREE.Group(); frente.position.set(0, 0.56, 0.86); frente.rotation.x = -0.25; fijo.add(frente);
  frente.add(mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.08, 40).rotateX(Math.PI / 2), M.cr, 0, 0, 0.02));
  frente.add(mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.1, 30).rotateX(Math.PI / 2), M.navy3, 0, 0, 0.04));
  const ag = new THREE.CylinderGeometry(0.07, 0.07, 0.1, 16).rotateX(Math.PI / 2);
  for (let i = 0; i < 10; i++) { const a = Math.PI * 0.3 + i * 0.52; frente.add(mesh(ag, M.oscuro, Math.cos(a) * 0.34, Math.sin(a) * 0.34, 0.04)); }
  // horquilla
  fijo.add(mesh(rbox(0.25, 0.3, 0.4, 0.06), M.red, -0.8, 1.05, -0.1));
  fijo.add(mesh(rbox(0.25, 0.3, 0.4, 0.06), M.red, 0.8, 1.05, -0.1));
  // tubo
  tubo.add(mesh(rbox(2.15, 0.28, 0.42, 0.13), M.cr));
  const copa = new THREE.CylinderGeometry(0.3, 0.24, 0.32, 28);
  tubo.add(mesh(copa, M.cr, -0.85, -0.2, 0)); tubo.add(mesh(copa, M.cr, 0.85, -0.2, 0));
  tubo.position.set(0, 1.4, -0.1); fijo.add(tubo);
  // cable en espiral
  const pts = []; for (let i = 0; i <= 160; i++) { const u = i / 160; const a = u * Math.PI * 2 * 9; pts.push(new THREE.Vector3(-1.15 - u * 0.35 + Math.cos(a) * 0.06, 0.3 + Math.sin(u * Math.PI) * 0.35, 0.2 + Math.sin(a) * 0.06 - u * 0.2)); }
  void pts;
}
const fijoSombra = sombra(3.6, 2.4);

// signos de pregunta
// "?" hecho a mano (la fuente 3D del repo solo trae dígitos): un tubo curvo y un punto
const pregGeo = (() => {
  const pts = [[-0.25, 0.3], [-0.19, 0.5], [0, 0.59], [0.21, 0.5], [0.26, 0.3], [0.13, 0.13], [0.0, 0.03], [0, -0.13]].map(([x, y]) => new THREE.Vector3(x, y, 0));
  return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 48, 0.085, 12, false);
})();
const puntoGeo = new THREE.SphereGeometry(0.1, 16, 12);
const pregs = Array.from({ length: 8 }, (_, i) => { const m2 = i % 3 === 1 ? M.red : M.cr; const g = grupo(new THREE.Mesh(pregGeo, m2), mesh(puntoGeo, m2, 0, -0.36, 0)); g.children.forEach((c) => (c.position.y -= 0.1)); scene.add(g); return g; });
const preguntaGrande = grupo(new THREE.Mesh(pregGeo, M.g), mesh(puntoGeo, M.g, 0, -0.36, 0)); preguntaGrande.children.forEach((c) => (c.position.y -= 0.1)); scene.add(preguntaGrande);
const preguntaSombra = sombra(2.2, 0.9);
const PREG_POS = [[-1.2, 1.0, 0.4], [1.25, 1.25, 0.2], [-0.4, 1.7, 0.1], [0.7, 1.85, 0.5], [-1.3, 1.95, -0.2], [1.4, 0.45, 0.6], [0.15, 2.15, -0.1], [-0.95, 0.3, 0.9]];

// ================= CAJA DE COMIDA Y LA PORCIÓN QUE NO ERA =================
const cajaComida = new THREE.Group(); scene.add(cajaComida);
const tapaCaja = new THREE.Group();
{
  cajaComida.add(mesh(rbox(1.9, 0.42, 1.9, 0.05), M.cr2, 0, 0.21, 0));
  const t = mesh(rbox(1.92, 0.07, 1.92, 0.03), M.cr, 0, 0.035, 0.96); tapaCaja.add(t);
  tapaCaja.add(mesh(rbox(0.9, 0.08, 0.3, 0.03), M.gris, 0, 0.06, 0.96));
  tapaCaja.position.set(0, 0.42, -0.96); cajaComida.add(tapaCaja);
}
const porcion = new THREE.Group(); scene.add(porcion);
{
  const sh = new THREE.Shape(); sh.moveTo(0, -1.0); sh.lineTo(-0.72, 0.42); sh.quadraticCurveTo(0, 0.7, 0.72, 0.42); sh.closePath();
  const g = new THREE.ExtrudeGeometry(sh, { depth: 0.14, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.03, bevelSegments: 2, curveSegments: 16 });
  porcion.add(new THREE.Mesh(g, mat(0xf1d896, 0.5)));
  const borde = new THREE.TubeGeometry(new THREE.QuadraticBezierCurve3(new THREE.Vector3(-0.74, 0.43, 0.08), new THREE.Vector3(0, 0.74, 0.08), new THREE.Vector3(0.74, 0.43, 0.08)), 24, 0.12, 10);
  porcion.add(new THREE.Mesh(borde, mat(0xc99a5e, 0.6)));
  const pep = new THREE.CylinderGeometry(0.13, 0.13, 0.05, 20).rotateX(Math.PI / 2);
  [[-0.2, 0.2], [0.25, 0.25], [0.02, -0.25], [-0.05, 0.42]].forEach(([x, y]) => porcion.add(mesh(pep, M.red, x, y, 0.2)));
}
const cajaSombra = sombra(3.0, 2.4);

// ================= CELULAR =================
const PW = 1.56, PH = 3.16;
const pantallas = {};
function lienzo(dibujar) {
  const c = document.createElement("canvas"); c.width = 720; c.height = 1458; const x = c.getContext("2d");
  dibujar(x); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; return t;
}
const rr = (x, X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r); x.fill(); };
const celMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4, emissive: 0xffffff, emissiveIntensity: 0.75 });
const cel = (() => {
  const cuerpo = mesh(rbox(PW + 0.1, PH + 0.1, 0.16, 0.2, 4), M.navy);
  const borde = mesh(rbox(PW + 0.16, PH + 0.16, 0.12, 0.22, 4), M.edge, 0, 0, -0.02);
  const pant = mesh(new THREE.PlaneGeometry(PW - 0.06, PH - 0.06), celMat, 0, 0, 0.082);
  const cam = mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.03, 16).rotateX(Math.PI / 2), M.oscuro, 0, PH / 2 - 0.12, 0.085);
  return grupo(borde, cuerpo, pant, cam);
})();
scene.add(cel);
const celSombra = sombra(2.4, 1.0);
const chatMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4, emissive: 0xffffff, emissiveIntensity: 0.75 });
const celChat = (() => {
  const cuerpo = mesh(rbox(PW + 0.1, PH + 0.1, 0.16, 0.2, 4), M.navy);
  const borde = mesh(rbox(PW + 0.16, PH + 0.16, 0.12, 0.22, 4), M.edge, 0, 0, -0.02);
  const pant = mesh(new THREE.PlaneGeometry(PW - 0.06, PH - 0.06), chatMat, 0, 0, 0.082);
  return grupo(borde, cuerpo, pant);
})();
scene.add(celChat);
const chatSombra = sombra(2.0, 0.8);

// ================= TARJETAS DE PEDIDO =================
let tarjetaTex = null;
const tarjetaMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.45, emissive: 0xffffff, emissiveIntensity: 0.25 });
const tarjetas = Array.from({ length: 6 }, () => {
  const g = grupo(mesh(rbox(1.7, 0.66, 0.07, 0.12), M.white), mesh(new THREE.PlaneGeometry(1.6, 0.58), tarjetaMat, 0, 0, 0.037));
  scene.add(g); return g;
});

// ================= MOTO DE REPARTO (genérica) =================
const moto = new THREE.Group(); scene.add(moto);
const ruedas = [];
{
  const rueda = () => {
    const g = new THREE.Group();
    g.add(new THREE.Mesh(new THREE.TorusGeometry(0.26, 0.09, 12, 32), M.oscuro));
    g.add(mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.1, 20).rotateX(Math.PI / 2), M.cr3));
    for (let i = 0; i < 3; i++) { const r = mesh(rbox(0.04, 0.4, 0.04, 0.015), M.cr3); r.rotation.z = (i * Math.PI) / 3; g.add(r); }
    return g;
  };
  const r1 = rueda(), r2 = rueda(); r1.position.set(0.72, 0.35, 0); r2.position.set(-0.68, 0.35, 0); moto.add(r1, r2); ruedas.push(r1, r2);
  const chasis = mesh(rbox(1.15, 0.26, 0.42, 0.1), M.cr, -0.05, 0.62, 0); moto.add(chasis);
  const frente = mesh(rbox(0.26, 0.75, 0.46, 0.1), M.cr, 0.6, 0.85, 0); frente.rotation.z = -0.3; moto.add(frente);
  moto.add(mesh(rbox(0.6, 0.14, 0.4, 0.06), M.navy3, -0.2, 0.84, 0)); // asiento
  const manubrio = mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.8, 10).rotateX(Math.PI / 2), M.navy3, 0.72, 1.28, 0); moto.add(manubrio);
  moto.add(mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.05, 16).rotateZ(Math.PI / 2), M.luz, 0.86, 1.1, 0)); // farol
  // caja de reparto genérica: verde con franja crema
  moto.add(mesh(rbox(0.66, 0.6, 0.6, 0.07), M.g, -0.62, 1.2, 0));
  moto.add(mesh(rbox(0.67, 0.1, 0.61, 0.03), M.cr, -0.62, 1.22, 0));
  // repartidor
  moto.add(mesh(rbox(0.3, 0.5, 0.36, 0.13), M.navy3, -0.05, 1.12, 0)); // torso
  const casco = mesh(new THREE.SphereGeometry(0.2, 24, 16), M.white, 0.02, 1.55, 0); moto.add(casco);
  moto.add(mesh(rbox(0.12, 0.1, 0.3, 0.04), M.navy, 0.18, 1.55, 0)); // visera
  const brazo = mesh(rbox(0.5, 0.11, 0.11, 0.05), M.navy3, 0.32, 1.22, 0.14); brazo.rotation.z = -0.25; moto.add(brazo);
  const brazo2 = brazo.clone(); brazo2.position.z = -0.14; moto.add(brazo2);
}
const motoSombra = sombra(2.4, 1.0);

// ================= AÑO 2009 → 2014 (contador de casilleros) =================
const DIG = Array.from({ length: 10 }, (_, d) => {
  const g = new TextGeometry(String(d), { font, size: 1, depth: 0.3, curveSegments: 6, bevelEnabled: true, bevelThickness: 0.07, bevelSize: 0.028, bevelSegments: 3 });
  g.computeBoundingBox(); const b = g.boundingBox; g.translate(-(b.max.x + b.min.x) / 2, -(b.max.y + b.min.y) / 2, -0.15); return g;
});
const anio = new THREE.Group(); scene.add(anio);
const PASO = 0.74;
const casillas = [0, 1, 2, 3].map((i) => {
  const g = new THREE.Group(); g.position.x = (i - 1.5) * PASO; anio.add(g);
  return DIG.map((geo) => { const m = new THREE.Mesh(geo, M.anio); m.visible = false; g.add(m); return m; });
});
const ANIOS = [[-1, 2009], ...[2010, 2011, 2012, 2013, 2014].map((a, k) => [W[44] + 0.05 + k * 0.17, a])];
const dig = (y, i) => Number(String(y)[i]);
function ponerAnio(t, x, y, z, s, ry) {
  anio.visible = s > 0.002; if (!anio.visible) return;
  anio.position.set(x, y, z); anio.scale.setScalar(s); anio.rotation.y = ry;
  let k = 0; while (k + 1 < ANIOS.length && ANIOS[k + 1][0] <= t) k++;
  for (let i = 0; i < 4; i++) {
    const cur = dig(ANIOS[k][1], i);
    let kc = k; while (kc > 0 && dig(ANIOS[kc - 1][1], i) === dig(ANIOS[kc][1], i)) kc--;
    const ms = casillas[i]; ms.forEach((m) => (m.visible = false));
    const p = kc > 0 ? eio(sg(t, ANIOS[kc][0], ANIOS[kc][0] + 0.16)) : 1;
    const nuevo = ms[cur]; nuevo.visible = true; nuevo.rotation.x = (1 - p) * (Math.PI / 2); nuevo.position.y = (1 - p) * 0.35;
    if (p < 1) { const viejo = ms[dig(ANIOS[kc - 1][1], i)]; viejo.visible = true; viejo.rotation.x = -p * (Math.PI / 2); viejo.position.y = -p * 0.35; }
  }
}

// ================= ANILLO 70 % =================
const anillo = new THREE.Group(); scene.add(anillo);
const R_AN = 1.18;
anillo.add(new THREE.Mesh(new THREE.TorusGeometry(R_AN, 0.17, 20, 120), M.navy3));
const arcoGeo = {};
const arcoM = new THREE.Mesh(new THREE.BufferGeometry(), M.g); anillo.add(arcoM);
// el número del centro: dos casilleros de dígitos + un "%" armado con dos aros y una barra
const pct = new THREE.Group(); anillo.add(pct); pct.scale.setScalar(0.62);
const pctD = [0, 1].map((i) => { const m = new THREE.Mesh(DIG[0], M.cr); m.position.x = -0.72 + i * 0.78; pct.add(m); return m; });
{
  const aro = new THREE.TorusGeometry(0.15, 0.065, 12, 24);
  pct.add(mesh(aro, M.g, 0.72, 0.28, 0)); pct.add(mesh(aro, M.g, 1.16, -0.28, 0));
  const barra = mesh(rbox(0.12, 1.05, 0.14, 0.05), M.g, 0.94, 0, 0); barra.rotation.z = -0.5; pct.add(barra);
}
function ponerArco(p) {
  const k = Math.round(p * 100);
  if (!arcoGeo[k]) { const g = new THREE.TorusGeometry(R_AN, 0.2, 20, Math.max(4, k * 2), Math.max(0.001, (k / 100) * Math.PI * 2)); g.rotateZ(Math.PI / 2); g.rotateY(Math.PI); g.translate(0, 0, 0.02); arcoGeo[k] = g; }
  arcoM.geometry = arcoGeo[k]; arcoM.visible = k > 0;
  const q = Math.min(70, Math.round(k)); pctD[0].geometry = DIG[Math.floor(q / 10)]; pctD[1].geometry = DIG[q % 10]; pctD[0].visible = q >= 10;
}
const anilloSombra = sombra(3.2, 1.2);

// ================= EL LOCAL DEL CLIENTE =================
const vidrioMat = new THREE.MeshStandardMaterial({ color: 0x0c1526, emissive: 0xffe2a8, emissiveIntensity: 0.0, roughness: 0.35 });
const toldoA = mat(C.gris, 0.6), toldoB = mat(C.cr3, 0.6);
const cartelMat = new THREE.MeshStandardMaterial({ color: C.navy3, emissive: C.g, emissiveIntensity: 0, roughness: 0.5 });
const local = (() => {
  const g = new THREE.Group();
  g.add(mesh(rbox(3.4, 3.0, 1.0, 0.06), M.cr2, 0, 1.5, -0.5));
  g.add(mesh(rbox(3.55, 0.55, 1.1, 0.06), M.navy3, 0, 3.0, -0.45)); // cornisa
  g.add(mesh(rbox(2.2, 0.36, 0.1, 0.05), cartelMat, 0, 3.0, 0.12)); // cartel
  for (let i = 0; i < 9; i++) { const r = mesh(rbox(0.38, 0.1, 0.75, 0.03), i % 2 ? toldoB : toldoA, (i - 4) * 0.375, 2.48, 0.25); r.rotation.x = 0.42; g.add(r); }
  g.add(mesh(new THREE.PlaneGeometry(1.75, 1.6), vidrioMat, -0.55, 1.2, 0.012)); // vidriera
  g.add(mesh(rbox(0.8, 1.95, 0.08, 0.04), M.navy3, 1.05, 0.98, 0.02)); // puerta
  g.add(mesh(new THREE.SphereGeometry(0.05, 10, 8), M.cr, 0.78, 1.0, 0.08));
  g.add(mesh(rbox(1.9, 0.12, 0.2, 0.04), M.cr3, -0.55, 0.35, 0.06));
  // macetas
  [-1.55, 1.6].forEach((x) => { g.add(mesh(new THREE.CylinderGeometry(0.17, 0.13, 0.3, 16), M.navy3, x, 0.15, 0.35)); g.add(mesh(new THREE.SphereGeometry(0.24, 14, 10), M.gd, x, 0.45, 0.35)); });
  return g;
})();
scene.add(local);
const localSombra = sombra(4.4, 1.8);

// ================= PANTALLAS DEL CELULAR =================
async function dibujarPantallas() {
  await document.fonts.load('700 60px "Lexend"');
  await document.fonts.load('500 40px "IBM Plex Mono"');
  const logo = await new Promise((ok) => { const i = new Image(); i.onload = () => ok(i); i.onerror = () => ok(null); i.src = "assets/logo-blanco.png"; });
  const F = (w, s) => `${w} ${s}px "Lexend", sans-serif`;
  const barra = (x, hora, c = "#efeee5") => { x.fillStyle = c; x.font = F(600, 34); x.textAlign = "left"; x.fillText(hora, 48, 66); x.fillRect(600, 44, 64, 26); };
  const chivi = (x, cx, cy, s) => { // chivito al pan visto de costado: alto, con huevo, panceta y aceituna
    const R = (X, Y, w, h, r, c) => { x.fillStyle = c; rr(x, cx + X * s, cy + Y * s, w * s, h * s, r * s); };
    R(-165, 95, 330, 62, 26, "#e8cf9f");                                   // pan de abajo
    R(-205, 78, 410, 24, 12, "#5ce611");                                   // lechuga
    R(-200, 60, 120, 22, 11, "#c7655b"); R(85, 60, 120, 22, 11, "#c7655b");  // tomate
    R(-222, 34, 444, 28, 14, "#5e3d2a");                                   // churrasco
    R(-200, 16, 400, 20, 10, "#e3a296");                                   // jamón
    R(-190, -4, 380, 22, 11, "#f7f1de");                                   // muzzarella
    for (const gx of [-170, -95, 40, 150]) R(gx, 8, 18, 34, 9, "#f7f1de");  // que se derrite
    R(-215, -22, 430, 18, 9, "#b5584a");                                   // panceta
    x.fillStyle = "#ffffff"; x.beginPath(); x.ellipse(cx + 25 * s, cy - 36 * s, 175 * s, 24 * s, 0, 0, Math.PI * 2); x.fill(); // clara
    x.fillStyle = "#f2a91c"; x.beginPath(); x.ellipse(cx + 70 * s, cy - 44 * s, 48 * s, 30 * s, 0, 0, Math.PI * 2); x.fill(); // yema
    x.fillStyle = "#d9a865"; x.beginPath(); x.ellipse(cx, cy - 48 * s, 170 * s, 100 * s, 0, Math.PI, 0); x.fill();       // pan de arriba
    x.strokeStyle = "#efeee5"; x.lineWidth = 9 * s; x.lineCap = "round"; x.beginPath(); x.moveTo(cx, cy - 140 * s); x.lineTo(cx, cy - 215 * s); x.stroke(); // palillo
    x.fillStyle = "#55702a"; x.beginPath(); x.ellipse(cx, cy - 228 * s, 24 * s, 30 * s, 0, 0, Math.PI * 2); x.fill();     // aceituna
    x.fillStyle = "#c7655b"; x.beginPath(); x.arc(cx + 6 * s, cy - 228 * s, 9 * s, 0, Math.PI * 2); x.fill();
  };
  const tick = (x, cx, cy, r, fondo = "#5ce611", trazo = "#0b1220") => { x.fillStyle = fondo; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill(); x.strokeStyle = trazo; x.lineWidth = r * 0.28; x.lineCap = "round"; x.lineJoin = "round"; x.beginPath(); x.moveTo(cx - r * 0.45, cy + r * 0.02); x.lineTo(cx - r * 0.1, cy + r * 0.38); x.lineTo(cx + r * 0.5, cy - r * 0.36); x.stroke(); };
  // 1) la app de pedir comida (genérica)
  pantallas.app = lienzo((x) => {
    x.fillStyle = "#0f1a2e"; x.fillRect(0, 0, 720, 1458); barra(x, "21:30");
    x.fillStyle = "#efeee5"; x.font = F(800, 62); x.fillText("¿Qué pedís hoy?", 48, 190);
    x.fillStyle = "#efeee5"; rr(x, 48, 236, 624, 104, 52); x.fillStyle = "#7d8597"; x.font = F(500, 38); x.fillText("Buscar comida", 120, 302);
    const card = (X, Y, c, s) => { x.fillStyle = "#1f3254"; rr(x, X, Y, 300, 400, 34); x.fillStyle = c; rr(x, X + 24, Y + 24, 252, 220, 24); x.save(); x.beginPath(); x.roundRect(X + 24, Y + 24, 252, 220, 24); x.clip(); if (s) chivi(x, X + 150, Y + 168, 0.52); x.restore(); x.fillStyle = "#efeee5"; rr(x, X + 24, Y + 272, 190, 30, 12); x.fillStyle = "#5ce611"; rr(x, X + 24, Y + 324, 130, 40, 14); };
    card(48, 390, "#16243d", 1); card(372, 390, "#5ce611", 0); card(48, 820, "#efeee5", 0); card(372, 820, "#16243d", 1);
    x.fillStyle = "#5ce611"; rr(x, 48, 1260, 624, 140, 40); x.fillStyle = "#0b1220"; x.font = F(800, 58); x.textAlign = "center"; x.fillText("Pedir", 360, 1350); x.textAlign = "left";
  });
  // 2) el pedido: el chivito
  const pedido = (x, enviado) => {
    x.fillStyle = "#efeee5"; x.fillRect(0, 0, 720, 1458); barra(x, "21:31", "#0b1220");
    x.fillStyle = "#16243d"; rr(x, 48, 120, 624, 560, 44); chivi(x, 360, 470, 1.25);
    x.fillStyle = "#0b1220"; x.font = F(800, 66); x.fillText("Chivito al pan", 48, 790);
    x.fillStyle = "#59627a"; x.font = F(500, 40); x.fillText("con papas fritas", 48, 850);
    x.fillStyle = "#ffffff"; rr(x, 48, 910, 624, 130, 34); x.fillStyle = "#0b1220"; x.font = F(700, 52); x.textAlign = "center"; x.fillText("−      1      +", 360, 995); x.textAlign = "left";
    if (!enviado) { x.fillStyle = "#5ce611"; rr(x, 48, 1200, 624, 170, 46); x.fillStyle = "#0b1220"; x.font = F(800, 70); x.textAlign = "center"; x.fillText("Pedir", 360, 1310); x.textAlign = "left"; }
    else { x.fillStyle = "#0b1220"; rr(x, 48, 1200, 624, 170, 46); tick(x, 150, 1285, 46); x.fillStyle = "#5ce611"; x.font = F(800, 56); x.fillText("Pedido enviado", 216, 1306); }
  };
  pantallas.pedido = lienzo((x) => pedido(x, false));
  pantallas.enviado = lienzo((x) => pedido(x, true));
  // 3) ¿tu negocio está ahí?
  pantallas.vacio = lienzo((x) => {
    x.fillStyle = "#0f1a2e"; x.fillRect(0, 0, 720, 1458); barra(x, "21:40");
    x.fillStyle = "#efeee5"; rr(x, 48, 130, 624, 120, 60);
    x.strokeStyle = "#0b1220"; x.lineWidth = 9; x.beginPath(); x.arc(122, 184, 24, 0, Math.PI * 2); x.stroke(); x.beginPath(); x.moveTo(140, 202); x.lineTo(158, 220); x.stroke();
    x.fillStyle = "#0b1220"; x.font = F(600, 42); x.fillText("tu negocio", 186, 204);
    x.fillStyle = "#1f3254"; rr(x, 48, 330, 624, 520, 40);
    x.strokeStyle = "#7d8597"; x.lineWidth = 14; x.lineCap = "round";
    x.beginPath(); x.arc(360, 560, 110, 0, Math.PI * 2); x.stroke();
    x.beginPath(); x.moveTo(300, 500); x.lineTo(420, 620); x.moveTo(420, 500); x.lineTo(300, 620); x.stroke();
    x.fillStyle = "#efeee5"; x.font = F(800, 62); x.textAlign = "center"; x.fillText("Sin resultados", 360, 970);
    x.fillStyle = "#8ea0bf"; x.font = F(500, 38); x.fillText("Probá con otra búsqueda", 360, 1040); x.textAlign = "left";
    x.fillStyle = "#1f3254"; rr(x, 48, 1130, 624, 110, 30); rr(x, 48, 1270, 624, 110, 30);
  });
  // 4) tu tienda online
  pantallas.tienda = lienzo((x) => {
    x.fillStyle = "#efeee5"; x.fillRect(0, 0, 720, 1458); barra(x, "21:42", "#0b1220");
    x.fillStyle = "#0b1220"; x.font = F(800, 64); x.fillText("Tu tienda", 48, 186);
    x.fillStyle = "#5ce611"; rr(x, 48, 214, 250, 56, 28); x.fillStyle = "#0b1220"; x.font = F(700, 30); x.fillText("Abierta ahora", 70, 252);
    const prod = (X, Y, c) => { x.fillStyle = "#ffffff"; rr(x, X, Y, 300, 380, 34); x.fillStyle = c; rr(x, X + 22, Y + 22, 256, 200, 24); x.fillStyle = "#0b1220"; rr(x, X + 22, Y + 250, 180, 30, 12); x.fillStyle = "#5ce611"; rr(x, X + 22, Y + 300, 120, 44, 14); };
    prod(48, 310, "#16243d"); prod(372, 310, "#5ce611"); prod(48, 720, "#5ce611"); prod(372, 720, "#16243d");
    x.fillStyle = "#0b1220"; rr(x, 48, 1150, 624, 120, 34); tick(x, 120, 1210, 34); x.fillStyle = "#efeee5"; x.font = F(700, 42); x.fillText("Pedido nuevo", 180, 1225);
    x.fillStyle = "#5ce611"; rr(x, 48, 1296, 624, 120, 40); x.fillStyle = "#0b1220"; x.font = F(800, 56); x.textAlign = "center"; x.fillText("Comprar", 360, 1376); x.textAlign = "left";
  });
  // 5) la videollamada
  pantallas.llamada = lienzo((x) => {
    x.fillStyle = "#0b1220"; x.fillRect(0, 0, 720, 1458); barra(x, "10:00");
    x.fillStyle = "#16243d"; rr(x, 36, 110, 648, 760, 40);
    if (logo) { const w = 420, h = (logo.height / logo.width) * w; x.drawImage(logo, 360 - w / 2, 490 - h / 2, w, h); }
    x.fillStyle = "#1f3254"; rr(x, 36, 900, 648, 360, 40);
    x.fillStyle = "#efeee5"; x.beginPath(); x.arc(360, 1040, 70, 0, Math.PI * 2); x.fill(); rr(x, 250, 1120, 220, 110, 55);
    x.fillStyle = "#5ce611"; x.beginPath(); x.arc(360, 1360, 62, 0, Math.PI * 2); x.fill();
    x.fillStyle = "#0b1220"; rr(x, 330, 1338, 60, 44, 10);
  });
  // 6) el chat lleno de mensajes desordenados (genérico: navy y crema, ningún verde de app)
  const chat = (n) => lienzo((x) => {
    x.fillStyle = "#e9e7dc"; x.fillRect(0, 0, 720, 1458);
    x.fillStyle = "#1f3254"; x.fillRect(0, 0, 720, 190); barra(x, "21:34");
    x.fillStyle = "#7d8597"; x.beginPath(); x.arc(84, 140, 34, 0, Math.PI * 2); x.fill();
    x.fillStyle = "#efeee5"; x.font = F(700, 40); x.fillText("Cliente", 136, 154);
    const MSG = [["¿tenés chivito?", 0], ["sí, ¿cuántos?", 1], ["¿cuánto sale?", 0], ["¿hacen envío?", 0], ["no, era sin huevo", 0], ["¿hola?", 0], ["¿me confirmás?", 0]];
    let Y = 225;
    MSG.slice(0, n).forEach(([txt, mio]) => {
      x.font = F(600, 50); const w = x.measureText(txt).width + 64;
      const X = mio ? 720 - 30 - w : 30;
      x.fillStyle = mio ? "#c9d3e6" : "#ffffff"; rr(x, X, Y, w, 108, 32);
      x.fillStyle = "#0b1220"; x.fillText(txt, X + 32, Y + 72);
      Y += 136;
    });
    if (n >= 5) { x.fillStyle = "#c7655b"; x.beginPath(); x.arc(640, 140, 34, 0, Math.PI * 2); x.fill(); x.fillStyle = "#ffffff"; x.font = F(800, 36); x.textAlign = "center"; x.fillText(String(n), 640, 153); x.textAlign = "left"; }
    x.fillStyle = "#ffffff"; rr(x, 36, 1330, 648, 96, 48); x.fillStyle = "#9aa1ae"; x.font = F(500, 34); x.fillText("Escribí un mensaje", 80, 1390);
  });
  pantallas.chat1 = chat(3); pantallas.chat2 = chat(5); pantallas.chat3 = chat(7);
  // 7) la tienda del local con el chivito: elige / paga
  const tiendaChivi = (paso) => lienzo((x) => {
    x.fillStyle = "#efeee5"; x.fillRect(0, 0, 720, 1458); barra(x, "21:40", "#0b1220");
    x.fillStyle = "#0b1220"; x.font = F(800, 62); x.fillText("Tu tienda", 48, 182);
    x.fillStyle = "#5ce611"; rr(x, 48, 210, 250, 56, 28); x.fillStyle = "#0b1220"; x.font = F(700, 30); x.fillText("Abierta ahora", 70, 248);
    // el chivito, el producto que se elige
    x.fillStyle = "#ffffff"; rr(x, 48, 300, 624, 620, 40);
    if (paso >= 1) { x.strokeStyle = "#5ce611"; x.lineWidth = 12; x.beginPath(); x.roundRect(54, 306, 612, 608, 36); x.stroke(); }
    x.fillStyle = "#16243d"; rr(x, 84, 336, 552, 400, 30); chivi(x, 360, 560, 1.05);
    x.fillStyle = "#0b1220"; x.font = F(800, 52); x.fillText("Chivito al pan", 84, 806);
    x.fillStyle = "#59627a"; x.font = F(500, 34); x.fillText("con papas fritas", 84, 860);
    if (paso >= 1) tick(x, 600, 800, 40);
    // abajo: el paso
    if (paso === 0) { x.fillStyle = "#5ce611"; rr(x, 48, 1180, 624, 150, 44); x.fillStyle = "#0b1220"; x.font = F(800, 60); x.textAlign = "center"; x.fillText("Elegir", 360, 1278); x.textAlign = "left"; }
    if (paso === 1) { x.fillStyle = "#0b1220"; rr(x, 48, 1180, 624, 150, 44); x.fillStyle = "#5ce611"; x.font = F(800, 60); x.textAlign = "center"; x.fillText("Pagar", 360, 1278); x.textAlign = "left"; }
    if (paso === 2) { x.fillStyle = "#0b1220"; rr(x, 48, 1180, 624, 150, 44); tick(x, 140, 1255, 44); x.fillStyle = "#5ce611"; x.font = F(800, 54); x.fillText("Pagado", 210, 1275); }
    x.fillStyle = "#ffffff"; rr(x, 48, 960, 300, 180, 30); rr(x, 372, 960, 300, 180, 30);
    x.fillStyle = "#5ce611"; rr(x, 72, 984, 100, 100, 20); x.fillStyle = "#16243d"; rr(x, 396, 984, 100, 100, 20);
  });
  pantallas.tiendaChivi = tiendaChivi(0); pantallas.elegido = tiendaChivi(1); pantallas.pagado = tiendaChivi(2);
  // tarjeta de pedido
  {
    const c = document.createElement("canvas"); c.width = 640; c.height = 232; const x = c.getContext("2d");
    x.fillStyle = "#ffffff"; x.fillRect(0, 0, 640, 232);
    tick(x, 100, 116, 62);
    x.fillStyle = "#0b1220"; x.font = F(800, 58); x.fillText("Pedido nuevo", 190, 104);
    x.fillStyle = "#59627a"; x.font = F(500, 40); x.fillText("Chivito al pan", 190, 166);
    tarjetaTex = new THREE.CanvasTexture(c); tarjetaTex.colorSpace = THREE.SRGBColorSpace; tarjetaTex.anisotropy = 4;
    tarjetaMat.map = tarjetaTex; tarjetaMat.emissiveMap = tarjetaTex; tarjetaMat.needsUpdate = true;
  }
  celMat.map = pantallas.app; celMat.emissiveMap = pantallas.app; celMat.needsUpdate = true;
}

// ================= CÁMARA =================
// claves [t, azimut°, elevación°, distancia, mirarX, mirarY, mirarZ, modo]; modo "e" = tramo con ease
// propio (grúa o zambullida, distancia en escala logarítmica y el punto de mira anclado al zoom);
// el resto es una curva Catmull-Rom continua: la cámara nunca se frena del todo ni corta.
const MAPC = [-470, PISO, -1060];
const CAM = [
  [0, -24, 19, 14.2, 0.1, 1.6, 0],
  [W[4], -14, 21, 13.2, 0.1, 1.4, 0],
  [W[8] - 0.05, -6, 25, 12.4, 0.1, 1.35, 0, "e"],
  [W[12] + 0.15, 0, 76, 7900, ...MAPC, "e"],
  [S["s02-chivito"] - 0.02, 3, 78, 7600, ...MAPC, "e"],
  [S["s02-chivito"] + 0.42, 14, 9, 10.8, 0, -0.35, 0],
  [S["s03-telefono"], 6, 9, 11.6, 0, -0.2, 0],
  [S["s03-telefono"] + 1.0, -6, 10, 12.0, 0, 0.0, 0],
  [S["s04-otra"], -12, 12, 12.6, 0, -0.05, 0],
  [S["s05-vuelta"], -10, 9, 11.2, 0, -0.15, 0],
  [W[31], 0, 4, 10.8, 0, -0.05, 0],
  [W[35], 5, 3, 10.2, 0, -0.05, 0],
  [S["s06-nacio"] - 0.05, 3, 3, 9.4, 0, 0.0, 0],
  [S["s06-nacio"] + 0.8, -26, 30, 15.5, 0, -0.15, 0],
  [W[42] - 0.2, -34, 30, 14.6, 0, -0.15, 0],
  [W[42] + 0.45, -26, 13, 12.6, 0, 0.1, 0],
  [S["s07-alemana"] + 1.0, -20, 11, 12.4, 0, 0.1, 0],
  [S["s08-leccion"], -12, 8, 11.6, 0, -0.1, 0],
  [S["s09-whatsapp"], -4, 7, 11.4, 0, -0.35, 0],
  [S["s10-mismo"], 4, 8, 11.0, 0, -0.35, 0],
  [S["s11-tienda"], 10, 9, 11.8, 0.0, -0.4, 0],
  [S["s12-elige"], 5, 8, 11.6, 0.0, -0.4, 0],
  [S["s13-llamada"], 2, 8, 11.8, 0, -0.45, 0],
  [DUR, 0, 6, 11.0, 0, -0.55, 0],
];
const _mira = new THREE.Vector3();
let camEl = 0;
const val = (k) => [k[1], k[2], Math.log(k[3]), k[4], k[5], k[6]];
function ponerCamara(t) {
  let i = 0; while (i + 1 < CAM.length - 1 && CAM[i + 1][0] <= t) i++;
  const a = CAM[i], b = CAM[i + 1];
  const u = sg(t, a[0], b[0]);
  let v;
  if (a[7] === "e") {
    const x = eio(u), va = val(a), vb = val(b);
    v = va.map((q, j) => lerp(q, vb[j], x));
    // el punto de mira sigue al zoom (proporcional a la distancia real), así el objeto no se escapa
    const dA = a[3], dB = b[3], d = Math.exp(v[2]);
    let w = Math.abs(dB - dA) > 1 ? cl((d - dA) / (dB - dA)) : x;
    if (dB > dA) w = w * w; // subiendo: el punto de mira se queda en Montevideo hasta tarde
    for (let j = 3; j < 6; j++) v[j] = lerp(va[j], vb[j], w);
  } else {
    const p1 = val(a), p2 = val(b);
    const p0 = i > 0 && CAM[i - 1][7] !== "e" ? val(CAM[i - 1]) : p1;
    const p3 = i + 2 < CAM.length && b[7] !== "e" ? val(CAM[i + 2]) : p2;
    const u2 = u * u, u3 = u2 * u;
    v = p1.map((_, j) => 0.5 * (2 * p1[j] + (-p0[j] + p2[j]) * u + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * u2 + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * u3));
  }
  const [az, el, ld, tx, ty, tz] = v;
  camEl = el;
  const d = Math.exp(ld);
  _mira.set(tx, ty, tz);
  camera.position.set(tx + d * Math.cos(el * D2R) * Math.sin(az * D2R), ty + d * Math.sin(el * D2R), tz + d * Math.cos(el * D2R) * Math.cos(az * D2R));
  const k = Math.min(1, 12 / d);
  camera.position.x += Math.sin(t * 0.7) * 0.05 * k; camera.position.y += Math.sin(t * 0.53) * 0.03 * k;
  camera.near = Math.max(0.05, d * 0.004); camera.far = Math.max(400, d * 4);
  camera.updateProjectionMatrix();
  camera.lookAt(_mira);
  return d;
}

// ================= ESCENA EN EL TIEMPO =================
const _v = new THREE.Vector3();
function tarjeta(i, s, x, y, z, rx = 0, ry = 0, rz = 0) { const o = tarjetas[i]; ocultar(o, s); if (o.visible) { o.position.set(x, y, z); o.rotation.set(rx, ry, rz); } }
// trayectoria de una tarjeta: de A a B en arco
function vuelo(t, a, dur, A, B, alto) { const u = eio(sg(t, a, a + dur)); return [lerp(A[0], B[0], u), lerp(A[1], B[1], u) + Math.sin(Math.PI * u) * alto, lerp(A[2], B[2], u), u]; }

function renderAt(t) {
  scene.environmentRotation.y = t * 0.12;
  const dist = ponerCamara(t);
  tarjetas.forEach((o) => (o.visible = false));

  // ---- Montevideo: gancho (con el celular-torre) y "así nació" ----
  {
    let s = 0;
    if (t < S["s02-chivito"] + 0.3) s = 1 - eio(sg(t, S["s02-chivito"] + 0.05, S["s02-chivito"] + 0.3));
    if (en(t, S["s06-nacio"] - 0.2, W[42] + 0.1)) s = eo(sg(t, S["s06-nacio"] - 0.2, S["s06-nacio"] + 0.5)) * (1 - eio(sg(t, W[42] - 0.45, W[42] - 0.15)));
    ciudad.visible = s > 0.002;
    if (ciudad.visible) { ciudad.scale.set(1, Math.max(0.001, s), 1); ciudad.position.y = (1 - s) * PISO * 0.0; }
  }
  // ---- mapa: aparece con la grúa y se encienden los 15 países ----
  {
    mapa.visible = t < S["s02-chivito"] + 0.35 && (t < S["s02-chivito"] - 0.1 || dist > 700);
    tierraMat.color.copy(TIERRA_CERCA).lerp(TIERRA_LEJOS, cl((Math.log(dist) - Math.log(120)) / (Math.log(2500) - Math.log(120))));
    uru.visible = dist > 300;
    costaMapa.visible = dist > 900;
    uruMat.emissiveIntensity = 0.25 + 0.5 * Math.sin(Math.PI * sg(t, W[9], W[9] + 0.5));
    const orden = pines.map((p, i) => [p.d, i]).sort((a, b) => a[0] - b[0]);
    const t0 = W[9] - 0.05, t1 = W[12] + 0.35;
    orden.forEach(([, i], k) => {
      const p = pines[i]; const ti = lerp(t0, t1, k / (orden.length - 1));
      const sc = bk(sg(t, ti, ti + 0.3)) * (dist > 300 ? 1 : 0);
      p.g.visible = sc > 0.002; if (p.g.visible) p.g.scale.setScalar(sc * (0.8 + dist / 9000));
      if (p.arco) { const u = eo(sg(t, ti - 0.25, ti + 0.05)); p.arco.visible = u > 0.01 && dist > 300; p.arco.geometry.setDrawRange(0, Math.floor((p.arco.userData.total * u) / 6) * 6); }
    });
  }

  // ---- celular: torre en el gancho, se da vuelta desde el fijo, lección, tienda, cierre ----
  {
    let s = 0, x = TORRE.x, y = 0, z = TORRE.z, rx = 0, ry = 0, rz = 0, tex = pantallas.app, sombraOn = false;
    if (t < S["s02-chivito"] + 0.3) {
      // torre del gancho: parada en la ciudad
      const c0 = CAM[2][0], c1 = CAM[3][0];
      const zf = Math.max(1, dist / 13.5);
      const mete = eio(sg(t, lerp(c0, c1, 0.6), lerp(c0, c1, 0.86)));
      s = 0.86 * zf * (1 - mete);
      rx = -Math.max(0, camEl - 22) * D2R * 0.9;
      const h = (PH / 2 + 0.05) * s;
      y = PISO + h * Math.cos(rx); z = TORRE.z + h * Math.sin(rx); ry = -0.25 * (1 - cl((zf - 1) / 3)) + Math.sin(t * 0.8) * 0.08;
      s *= 1 + 0.05 * Math.sin(Math.PI * sg(t, W[6], W[6] + 0.3));
    } else if (en(t, S["s05-vuelta"], W[46] + 0.2)) {
      // el teléfono viejo da la vuelta y del otro lado sale el celular
      const giro = eio(sg(t, W[29], W[30] + 0.35));
      s = giro > 0.5 ? 0.92 : 0; ry = Math.PI * 2 * giro - Math.PI * 2 + Math.sin(t * 0.7) * 0.1;
      y = lerp(-0.55, -0.32, giro);
      x = 0; z = 0;
      tex = t >= W[34] + 0.12 ? pantallas.enviado : pantallas.pedido;
      // "pida": el dedo invisible aprieta, la pantalla se hunde un toque
      s *= 1 - 0.04 * Math.sin(Math.PI * sg(t, W[34], W[34] + 0.22));
      // "así nació": el celular se achica y vuelve a ser la torre de la ciudad
      const vuelve = eio(sg(t, S["s06-nacio"] - 0.1, S["s06-nacio"] + 0.7));
      x = lerp(0, TORRE.x, vuelve); z = lerp(0, TORRE.z, vuelve); y = lerp(y, PISO + PH / 2 * 0.9 + 0.05, vuelve); s = lerp(s, 0.9, vuelve); ry = lerp(ry, -0.4, vuelve);
      tex = vuelve > 0.5 ? pantallas.app : tex;
      const baja = eio(sg(t, W[42] - 0.15, W[42] + 0.3));
      x = lerp(x, 0, baja); z = lerp(z, 0.3, baja); y = lerp(y, -1.2, baja); s = lerp(s, 0.56, baja); ry = lerp(ry, Math.sin(t * 0.7) * 0.15, baja);
      s *= 1 - eio(sg(t, W[46] - 0.2, W[46] + 0.15));
      sombraOn = vuelve < 0.3 || baja > 0.5;
    } else if (t >= S["s11-tienda"] - 0.05) {
      // la tienda del local: entra girando a la izquierda
      const entra = bk(sg(t, S["s11-tienda"] - 0.05, S["s11-tienda"] + 0.3));
      s = lerp(0.4, 0.84, entra); x = -0.78; z = 0.3; y = -0.5;
      ry = 0.3 + lerp(1.4, 0, eio(sg(t, S["s11-tienda"] - 0.05, S["s11-tienda"] + 0.45))) + Math.sin(t * 0.7) * 0.06;
      tex = t >= W[88] ? pantallas.pagado : t >= W[87] ? pantallas.elegido : pantallas.tiendaChivi;
      // el dedo invisible: elige y paga
      s *= 1 - 0.035 * Math.sin(Math.PI * sg(t, W[87], W[87] + 0.2)) - 0.035 * Math.sin(Math.PI * sg(t, W[88], W[88] + 0.2));
      // cierre: al centro, la videollamada
      const cta = eio(sg(t, S["s13-llamada"], S["s13-llamada"] + 0.45));
      const ryN = ((ry % (Math.PI * 2)) + Math.PI * 3) % (Math.PI * 2) - Math.PI;
      x = lerp(x, 0, cta); s = lerp(s, 0.78, cta); y = lerp(y, -1.0, cta); ry = lerp(ryN, Math.sin(t * 0.7) * 0.1, cta);
      if (t >= S["s13-llamada"] + 0.15) tex = pantallas.llamada;
      sombraOn = true;
    }
    ocultar(cel, s); cel.position.set(x, y, z); cel.rotation.set(rx, ry, rz);
    if (tex && celMat.map !== tex) { celMat.map = tex; celMat.emissiveMap = tex; celMat.needsUpdate = true; }
    apoyar(celSombra, x, z, sombraOn ? s : 0, 0.6, y - 1.62 * s);
  }

  // ---- chivito: se arma capa por capa ----
  {
    const on = en(t, S["s02-chivito"] - 0.02, S["s03-telefono"] + 0.3);
    const sale = eio(sg(t, S["s03-telefono"] - 0.25, S["s03-telefono"] + 0.05));
    chivito.visible = on;
    if (on) {
      const base = -1.45;
      const zf = Math.max(1, dist / 10.8);
      const aterriza = S["s02-chivito"] + 0.42;
      capas.forEach((c, i) => {
        // al aterrizar, las capas se aplastan y rebotan una detrás de otra
        const ti = aterriza + i * 0.025;
        const rebote = Math.sin(Math.PI * sg(t, ti, ti + 0.22)) * 0.06 * (i + 1) * 0.35;
        c.g.visible = true;
        c.g.position.set(0, c.y + rebote, 0);
      });
      // "chivito": golpe
      const late = 1 + 0.07 * Math.sin(Math.PI * sg(t, W[17], W[17] + 0.28));
      chivito.scale.setScalar(0.88 * late * (1 - sale) * zf);
      const scl = 0.88 * late * (1 - sale) * zf;
      // de lejos se acerca a la cámara (mitad de camino), así queda por delante de los arcos del mapa
      const f = 0.5 * cl((zf - 1) / 2);
      if (zf > 1.001) { chivito.position.copy(_mira).lerp(camera.position, f); chivito.position.y -= 1.2 * scl * (1 - f); chivito.scale.setScalar(scl * (1 - f)); }
      else chivito.position.set(lerp(0, 1.4, sale), base + lerp(0, 2.2, sale), 0);
      chivito.rotation.set(0.16, 0.12 + Math.sin(t * 0.9) * 0.22, 0);
      apoyar(chivitoSombra, chivito.position.x, 0, zf > 1.2 ? 0 : (1 - sale) * 1.15, 0.8, base - 0.02);
    } else chivitoSombra.visible = false;
  }

  // ---- el fijo: suena, preguntas, y se da vuelta ----
  {
    let s = 0, y = -1.15, x = 0, z = 0, rx = 0, ry = -0.25 + Math.sin(t * 0.6) * 0.12, rz = 0;
    if (en(t, S["s03-telefono"], W[30] + 0.4)) {
      s = t < S["s03-telefono"] + 0.06 ? 0 : lerp(0.65, 1.22, bk(sg(t, S["s03-telefono"] + 0.06, S["s03-telefono"] + 0.36)));
      // suena: tiembla
      const ring = en(t, S["s03-telefono"] + 0.2, W[19] - 0.05) ? 1 : 0;
      rz = ring * Math.sin(t * 70) * 0.05; y += ring * Math.abs(Math.sin(t * 35)) * 0.05;
      // con la caja: se corre a la izquierda
      const izq = eio(sg(t, S["s04-otra"], S["s04-otra"] + 0.4)) * (1 - eio(sg(t, S["s05-vuelta"], S["s05-vuelta"] + 0.35)));
      x = lerp(0, -0.72, izq); s *= lerp(1, 0.62, izq); y = lerp(y, -0.55, izq); z = lerp(0, -0.9, izq);
      // lo dieron vuelta
      const giro = eio(sg(t, W[29], W[30] + 0.35));
      ry += Math.PI * 2 * giro; y = lerp(y, -0.55, giro); s *= 1 - 0.25 * Math.sin(Math.PI * giro);
      if (giro >= 0.5) s = 0;
    }
    if (en(t, W[54] - 0.12, W[68] + 0.3)) {
      // "pedir por teléfono se presta a errores": vuelve el teléfono, y esta vez se le cae el tubo
      s = t < W[54] - 0.04 ? 0 : lerp(0.6, 1.05, bk(sg(t, W[54] - 0.04, W[54] + 0.28)));
      y = -1.2; ry = -0.15 + Math.sin(t * 0.6) * 0.1;
      const ring = en(t, W[54], W[57]) ? 1 : 0;
      rz = ring * Math.sin(t * 70) * 0.05; y += ring * Math.abs(Math.sin(t * 35)) * 0.05;
      // el golpe del tubo contra la mesa: el cuerpo salta
      const golpe = Math.sin(Math.PI * sg(t, W[60] + 0.12, W[60] + 0.32));
      y += golpe * 0.08; rz += golpe * -0.06;
      // "pedidos así": se inclina, cansado
      rz += -0.08 * eio(sg(t, W[66], W[66] + 0.4));
      // "o por WhatsApp": se va
      s *= 1 - eio(sg(t, W[68] - 0.15, W[68] + 0.2));
    }
    ocultar(fijo, s); fijo.position.set(x, y, z); fijo.rotation.set(rx, ry, rz);
    // el tubo se levanta en "te hacían" y en "teléfono"
    const lev = Math.max(eio(sg(t, W[19] - 0.05, W[19] + 0.3)) * (1 - eio(sg(t, S["s04-otra"] + 0.2, S["s04-otra"] + 0.5))), 0.55 * eio(sg(t, W[56] - 0.05, W[56] + 0.3)) * (1 - eio(sg(t, W[68] - 0.2, W[68] + 0.2))));
    tubo.position.set(lerp(0, 0.55, lev), 1.4 + lev * 0.75, -0.1 + lev * 0.3); tubo.rotation.set(lev * 0.3, 0, lev * 0.55);
    if (en(t, W[54] - 0.12, W[68] + 0.3)) {
      // segunda vez: el tubo se levanta en "teléfono" y en "errores" se cae y rebota al costado
      const sube = eio(sg(t, W[56] - 0.05, W[56] + 0.25));
      const cae = sg(t, W[60] - 0.05, W[60] + 0.3), rebote = Math.abs(Math.sin(Math.PI * 2 * sg(t, W[60] + 0.25, W[60] + 0.65))) * (1 - sg(t, W[60] + 0.25, W[60] + 0.65));
      const c = cae * cae;
      tubo.position.set(lerp(lerp(0, 0.3, sube), 0.1, c), lerp(1.4 + 0.45 * sube, 0.17, c) + rebote * 0.25, lerp(-0.1, 1.2, c));
      tubo.rotation.set(lerp(0.2 * sube, 0, c), lerp(0, -0.3, c), lerp(0.35 * sube, 0.12, c) + rebote * -0.12);
    }
    apoyar(fijoSombra, x, z, s, 0.8, -1.16);
  }

  // ---- "¿La lección?": el signo grande ----
  {
    const sp = en(t, S["s08-leccion"] - 0.05, W[54] + 0.2) ? 2.7 * bk(sg(t, S["s08-leccion"] - 0.05, S["s08-leccion"] + 0.3)) * (1 - eio(sg(t, W[54] - 0.25, W[54] - 0.02))) : 0;
    ocultar(preguntaGrande, sp); preguntaGrande.position.set(0, -0.2, 0.3); preguntaGrande.rotation.set(0, Math.sin(t * 1.4) * 0.5, 0);
    apoyar(preguntaSombra, 0, 0.3, sp / 2.7, 0.7, -1.75);
  }

  // ---- mil preguntas ----
  pregs.forEach((m, i) => {
    const ti = W[20] + i * 0.11, t2 = W[57] + i * 0.09;
    let s = en(t, ti, S["s05-vuelta"]) ? 0.95 * bk(sg(t, ti, ti + 0.3)) * (1 - eio(sg(t, S["s04-otra"] + 0.25, S["s04-otra"] + 0.55))) : 0;
    const segunda = en(t, t2, W[68] + 0.4);
    if (segunda && false) s = 0.7 * bk(sg(t, t2, t2 + 0.3)) * (1 - eio(sg(t, W[68] - 0.15, W[68] + 0.2)));
    ocultar(m, s);
    if (m.visible) { const [px, py, pz] = PREG_POS[i]; m.position.set(px * (segunda ? 0.92 : 1), py - (segunda ? 1.55 : 1.0) + Math.sin(t * 2 + i) * 0.06, pz); m.rotation.set(0, Math.sin(t * 1.3 + i) * 0.5, Math.sin(t + i) * 0.15); }
  });

  // ---- te llegaba otra cosa: la caja se abre y sale una porción ----
  {
    const on = en(t, S["s04-otra"], S["s05-vuelta"] + 0.4);
    const sale = eio(sg(t, S["s05-vuelta"], S["s05-vuelta"] + 0.25));
    const cae = sg(t, S["s04-otra"], S["s04-otra"] + 0.35);
    const s = on ? 1.0 * (1 - sale) : 0;
    const y = -1.3 + (1 - bk(cae)) * 3 - sale * 1.2;
    ocultar(cajaComida, sale > 0.98 ? 0 : s * 0.78); cajaComida.position.set(0.5, y, 0.7); cajaComida.rotation.set(0, -0.45 + Math.sin(t) * 0.05, 0);
    const abre = eio(sg(t, W[26] - 0.15, W[26] + 0.2));
    tapaCaja.rotation.x = -abre * 1.9;
    const ps = on && sale < 0.98 ? 0.82 * bk(sg(t, W[26] - 0.05, W[26] + 0.3)) * (1 - sale) : 0;
    ocultar(porcion, ps);
    porcion.position.set(0.5, y + 0.45 + bk(sg(t, W[26] - 0.05, W[26] + 0.3)) * 0.75, 0.75); porcion.rotation.set(-0.35, Math.sin(t * 1.4) * 0.5 - 0.4, 0.1);
    apoyar(cajaSombra, 0.5, 0.7, s * cae * 0.8, 0.8, -1.31);
    if (en(t, S["s10-mismo"] - 0.05, S["s11-tienda"] + 0.25)) {
      const cae2 = sg(t, S["s10-mismo"] - 0.05, S["s10-mismo"] + 0.3);
      const sale2 = eio(sg(t, S["s11-tienda"] - 0.12, S["s11-tienda"] + 0.15));
      const s2 = 0.62 * (1 - sale2), y2 = -1.45 + (1 - bk(cae2)) * 2.6;
      ocultar(cajaComida, s2 * 0.95); cajaComida.position.set(-0.7, y2, 1.2); cajaComida.rotation.set(0, 0.25 + Math.sin(t) * 0.05, 0);
      tapaCaja.rotation.x = -eio(sg(t, W[77] - 0.1, W[77] + 0.2)) * 1.9;
      const ps2 = 0.66 * bk(sg(t, W[78] - 0.1, W[78] + 0.25)) * (1 - sale2);
      ocultar(porcion, ps2); porcion.position.set(-0.7, y2 + 0.4 + bk(sg(t, W[78] - 0.1, W[78] + 0.25)) * 0.55, 1.05); porcion.rotation.set(-0.3, Math.sin(t * 1.4) * 0.5 - 0.3, 0.1);
      apoyar(cajaSombra, -0.7, 1.2, s2 * cae2 * 0.7, 0.8, -1.46);
    }
  }

  // ---- el chat genérico: pedidos por mensajes desordenados ----
  {
    let s = 0;
    if (en(t, W[68] - 0.15, S["s11-tienda"] + 0.2)) s = 0.9 * bk(sg(t, W[68] - 0.15, W[68] + 0.2)) * (1 - eio(sg(t, S["s11-tienda"] - 0.12, S["s11-tienda"] + 0.15)));
    const tex = t >= W[74] ? pantallas.chat3 : t >= W[71] ? pantallas.chat2 : pantallas.chat1;
    if (tex && chatMat.map !== tex) { chatMat.map = tex; chatMat.emissiveMap = tex; chatMat.needsUpdate = true; }
    ocultar(celChat, s); celChat.position.set(lerp(0.0, 0.42, eio(sg(t, S["s10-mismo"] - 0.1, S["s10-mismo"] + 0.3))), -0.3, -0.25); celChat.rotation.set(0, -0.18 + Math.sin(t * 0.8) * 0.06, Math.sin(t * 9) * 0.012 * cl(sg(t, W[74], W[74] + 0.2)));
    apoyar(chatSombra, celChat.position.x, -0.25, s, 0.6, -0.3 - 1.62 * s);
  }

  // ---- tarjetas: "que el cliente pida" (sale del celular) ----
  if (en(t, W[34], S["s06-nacio"] + 0.3)) {
    const [x, y, z, u] = vuelo(t, W[34] + 0.1, 0.7, [0, -0.6, 0.2], [0.42, 0.75, 1.4], 0.2);
    tarjeta(0, 0.7 * bk(sg(t, W[34] + 0.1, W[34] + 0.45)) * (1 - eio(sg(t, S["s06-nacio"], S["s06-nacio"] + 0.3))), x, y, z, 0, -0.2 + u * 0.3, 0.12 * u);
  }
  // ---- tarjetas sobre la ciudad: "así nació" ----
  if (en(t, S["s06-nacio"] + 0.3, W[42] + 0.1)) {
    const SITIOS = [[-2.4, -0.3, -2.4], [2.2, -0.1, -2.9], [-1.0, 0.2, -4.2], [3.1, -0.6, -1.0]];
    SITIOS.forEach(([x, y, z], i) => {
      const ti = S["s06-nacio"] + 0.45 + i * 0.32;
      const s = 0.95 * bk(sg(t, ti, ti + 0.3)) * (1 - eio(sg(t, W[42] - 0.45, W[42] - 0.1)));
      tarjeta(1 + i, s, x, y + Math.sin(t * 2 + i) * 0.06, z, -0.15, -0.45, 0);
    });
  }

  // ---- moto: recorre la rambla (así nació) y sale del local (tienda) ----
  {
    let s = 0, x = 0, y = PISO, z = 0, ry = 0, giro = 0;
    if (en(t, S["s06-nacio"] - 0.1, W[42] + 0.1)) {
      const u = sg(t, S["s06-nacio"] - 0.1, W[42] + 0.3);
      x = lerp(-5.2, 5.2, u); z = costa(x) - 0.62; const dz = (costa(x + 0.05) - costa(x - 0.05)) / 0.1;
      ry = -Math.atan2(dz, 1); s = 0.5 * ciudad.scale.y; y = PISO + 0.02;
      giro = -u * 60;
    }
    ocultar(moto, s); moto.position.set(x, y, z); moto.rotation.set(0, ry, 0);
    ruedas.forEach((r) => (r.rotation.z = giro));
    apoyar(motoSombra, x, z, s > 0.5 ? s : 0, 0.7, y);
  }

  // ---- el año: 2009 aparece y rueda a 2014 ----
  {
    let s = 0, y = 1.7, x = 0;
    if (en(t, W[42] - 0.1, S["s08-leccion"] + 0.25)) {
      s = 0.78 * bk(sg(t, W[42] - 0.1, W[42] + 0.25)) * (1 - eio(sg(t, S["s08-leccion"] - 0.15, S["s08-leccion"] + 0.05)));
      y = 1.32;
      s *= 1.05 * (1 + 0.08 * Math.sin(Math.PI * sg(t, ANIOS.at(-1)[0], ANIOS.at(-1)[0] + 0.3)));
    }
    ponerAnio(t, x, y, 0.2, s, Math.sin(t * 0.6) * 0.14);
    M.anio.color.set(C.g);
  }

  // ---- anillo: compró el control (70 %) ----
  {
    const on = en(t, W[46] - 0.1, S["s08-leccion"] + 0.3);
    const s = on ? 0.95 * bk(sg(t, W[46] - 0.1, W[46] + 0.3)) * (1 - eio(sg(t, S["s08-leccion"] - 0.15, S["s08-leccion"] + 0.1))) : 0;
    ocultar(anillo, s * 0.7); anillo.position.set(0, -1.15, 0.3); anillo.rotation.set(-0.12, Math.sin(t * 0.7) * 0.25, 0);
    ponerArco(0.7 * eio(sg(t, W[46] + 0.25, W[51] + 0.2)));
    apoyar(anilloSombra, 0, 0.3, s * 0.7, 0.7, -2.2);
  }

  // ---- el local del cliente: apagado (¿está ahí?) y prendido (tu tienda) ----
  {
    const on = en(t, S["s11-tienda"] - 0.05, DUR + 1);
    const s = on ? 0.48 * bk(sg(t, S["s11-tienda"] - 0.05, S["s11-tienda"] + 0.35)) : 0;
    const cta = eio(sg(t, S["s13-llamada"], S["s13-llamada"] + 0.5));
    const x = lerp(0.72, 1.6, cta), z = lerp(-0.5, -2.5, cta);
    { const f = 1 - eio(sg(t, S["s13-llamada"] - 0.25, S["s13-llamada"] - 0.02)); ocultar(local, f < 0.25 ? 0 : s * f); } local.position.set(x, PISO, z); local.rotation.set(0, -0.32 + Math.sin(t * 0.5) * 0.05, 0);
    const luz = eio(sg(t, W[94] - 0.1, W[94] + 0.25)); // "claro": le llega el pedido y se prende
    local.scale.multiplyScalar(1 + 0.05 * Math.sin(Math.PI * sg(t, W[94] - 0.1, W[94] + 0.2)));
    const tenue = 0.32;
    vidrioMat.emissiveIntensity = lerp(0.45, 1.35, luz);
    cartelMat.emissiveIntensity = lerp(0.25, 1.0, luz);
    toldoA.color.set(C.gris).lerp(new THREE.Color(C.g), lerp(tenue, 1, luz));
    toldoB.color.set(C.cr3).lerp(new THREE.Color(C.cr), lerp(tenue, 1, luz));
    apoyar(localSombra, x, z + 0.2, s, 0.85);
  }
  // ---- "y te llega el pedido claro": la tarjeta vuela del celular al local ----
  if (en(t, W[89], S["s13-llamada"])) {
    const [x, y, z, u] = vuelo(t, W[89] + 0.05, W[94] - W[89] - 0.05, [-0.78, -0.15, 0.5], [0.72, -0.62, 0.15], 0.9);
    tarjeta(3, u < 1 ? 0.62 * bk(sg(t, W[89] + 0.05, W[89] + 0.3)) * (1 - eio(sg(u, 0.85, 1))) : 0, x, y, z, 0, -0.3 + u * 0.2, 0.15 - u * 0.3);
  }

  renderer.render(scene, camera);
}

window.__tresRender = renderAt;
window.addEventListener("hf-seek", (e) => renderAt(e.detail.time));
dibujarPantallas().then(() => {
  renderAt(window.__hfThreeTime || 0);
  if (window.__tresListo) window.__tresListo();
});
