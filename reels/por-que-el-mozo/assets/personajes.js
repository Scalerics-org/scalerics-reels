// Personajes 3D de Scalerics: figuras de juguete low-poly con cabeza grande y caras expresivas.
// Reutilizable en cualquier reel con la base Three.js de reels/caso-pedidosya (r170 local en
// assets/vendor/three). Todo es función pura de los parámetros: nada de azar sin semilla ni relojes.
//
//   import { crearPersonaje, ELENCO, poseEn, parpadeo } from "./personajes.js";
//   const dueno = crearPersonaje(ELENCO.almacenero); scene.add(dueno.raiz);
//   dueno.poner({ x: 0, z: -2, giro: 0, cabeza: { giro: 0.3 }, cejas: { ang: -0.6 }, boca: { sonrisa: -0.5 } });
//
// Coordenadas del personaje: pies en y = 0, mira hacia +z, su izquierda es +x. Alto ~1,7 u.
// Las manos se mueven por objetivo (IK de dos huesos): manoI / manoD = [x, y, z] en el espacio del
// cuerpo (el grupo `cuerpo`, que se inclina con el torso). `cuerpo` acepta hijos (un celular, una bolsa).
//
// Pose (todo opcional; lo que falta queda en POSE_BASE):
//   x, y, z, giro                       posición y giro del personaje entero (rad, sobre y)
//   inclina, ladea, torso, aplasta      el cuerpo: adelante/atrás, costado, torsión, squash (+ aplasta, - estira)
//   respira                             0..1, amplitud de la respiración (la fase la da `t`)
//   cabeza: { giro, asiente, ladea }    yaw, pitch (+ baja la cabeza), roll
//   ojos:   { x, y, abiertos, tension, feliz, guiño }   mirada -1..1; abiertos 0..1; tension -1 enojo..+1 pena;
//           feliz 0..1 achina; guiño -1..1 cierra un solo ojo (+ el izquierdo del personaje, - el derecho)
//   paso                                 0..1, camina en el lugar (piernas y rebote; la fase es t). Mover x/z aparte.
//   cejas:  { alto, ang, asim }         alto -1..1; ang -1 enojo..+1 preocupado; asim levanta una sola (-1 der..+1 izq)
//   boca:   { sonrisa, abierta, ancho } sonrisa -1..1; abierta 0..1; ancho 0.6..1.4
//   manoI, manoD: [x, y, z]; dedoI, dedoD: 0..1 (índice que señala); codoI, codoD: [x, y, z] hacia dónde sale el codo
//   reflejo                              0..1, una pantalla reflejada en los lentes (si tiene)
//   t                                    tiempo (para respirar y parpadear solo)
import * as THREE from "./vendor/three/three.module.js";
import { RoundedBoxGeometry } from "./vendor/three/RoundedBoxGeometry.js";

const cl = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const lerp = (a, b, u) => a + (b - a) * u;
const eio = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const mat = (color, rough = 0.6, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0, ...extra });
const rbox = (w, h, d, r = 0.02, seg = 3) => new RoundedBoxGeometry(w, h, d, seg, Math.min(r, w / 2 - 0.001, h / 2 - 0.001, d / 2 - 0.001));

// ---------- paleta: marca + tonos naturales ----------
export const MARCA = { navy: 0x0b1220, navy2: 0x16243d, navy3: 0x1f3254, g: 0x5ce611, gd: 0x3fa60a, cr: 0xefeee5, cr2: 0xd9d7c9, red: 0xc7655b };
export const PIEL = { clara: 0xf2c9a8, media: 0xdba57f, trigueña: 0xc28a62, morena: 0x96613f };
export const PELO = { canoso: 0xb9b6b0, gris: 0x8d8c8c, castaño: 0x5a3b28, negro: 0x2a2220, rubio: 0xd8b56f, lila: 0xb7a9c9 };

// ---------- el elenco fijo (vuelve en otros reels) ----------
export const ELENCO = {
  // Rubén, el almacenero: 55 años, pelado con costados canosos, bigote, camisa crema arremangada y delantal navy.
  almacenero: { nombre: "Rubén", piel: PIEL.media, pelo: PELO.canoso, peinado: "pelado", bigote: PELO.gris, cejasColor: 0x5b5048,
    camisa: MARCA.cr, mangas: "cortas", delantal: MARCA.navy2, delantalBorde: MARCA.g, pantalon: 0x3a3f4a, zapatos: 0x2a2220,
    panza: 1.18, nariz: 0.068, mejillas: 0xd98a78, alto: 1.0 },
  // Graciela, la clienta: 65 años, batido de rulos lila-canoso, lentes, cárdigan verde, chismosa de feria.
  clienta: { nombre: "Graciela", piel: PIEL.clara, pelo: PELO.lila, peinado: "rulos", lentes: MARCA.navy2, cejasColor: 0x8a7f8f,
    camisa: MARCA.g, mangas: "largas", cuello: MARCA.cr, pollera: MARCA.navy3, pantalon: null, zapatos: 0x6b3f2e,
    panza: 1.06, nariz: 0.052, mejillas: 0xf09a94, labios: 0xb5555a, aros: MARCA.cr, alto: 0.97 },
  // Para reels futuros: el empleado joven y la dueña de la cafetería.
  empleado: { nombre: "Nico", piel: PIEL.trigueña, pelo: PELO.negro, peinado: "corto", cejasColor: 0x2a2220,
    camisa: MARCA.g, mangas: "cortas", pantalon: MARCA.navy2, zapatos: 0xefeee5, panza: 1.0, nariz: 0.055, mejillas: 0xc9785e, alto: 1.02 },
  duena: { nombre: "Marta", piel: PIEL.morena, pelo: PELO.negro, peinado: "rodete", cejasColor: 0x1e1a18,
    camisa: MARCA.cr, mangas: "largas", delantal: MARCA.g, delantalBorde: MARCA.navy, pantalon: MARCA.navy2, zapatos: 0x2a2220,
    panza: 1.04, nariz: 0.055, mejillas: 0xb8644e, labios: 0x8e3f3c, aros: MARCA.g, alto: 0.98 },
  // Sofi de Scalerics (personaje genérico, no es una persona real del equipo): 28 años, coleta castaña,
  // buzo navy claro con cuello crema y auriculares con micrófono verdes (atiende las videollamadas).
  sofi: { nombre: "Sofi", piel: PIEL.clara, pelo: 0x5a3a26, peinado: "coletaLado", cejasColor: 0x5a3a26, cejaFina: true,
    pestanas: 0x1a1414, ojoEscala: 1.05, cuelloFino: true, camisa: MARCA.g, mangas: "largas", cuello: null, cuelloBotones: false, franja: MARCA.navy, cuelloAlto: 0.09, labiosPegados: true,
    pantalon: MARCA.navy, zapatos: MARCA.navy2, panza: 0.97, nariz: 0.042, mejillas: 0xf2a094, labios: 0xc0505a,
    aros: MARCA.g, auriculares: MARCA.g, auricularFino: true, alto: 0.95 },
  // Gonzalo de Scalerics. Rasgos parametrizados para ajustarlos a la referencia: pelo/peinado/jopoAlto, barba/barbaLarga,
  // lentes, piel, panza (complexión), alto, camisa/franja (ropa): ~30 años, jopo castaño oscuro con volumen,
  // barba corta, chomba verde de marca con franja navy, vincha fina con micrófono a la boca (atiende las videollamadas).
  gonzalo: { nombre: "Gonzalo", piel: 0xe9b894, pelo: 0x1f1714, peinado: "texturado", texturaAlto: 1, barba: 0x2c211b, barbaLarga: 0.5, barbaOpacidad: 0.5, barbaBigote: true,
    cejasColor: 0x1c1512, cejaGruesa: true, torsoSuave: true, ojosColor: 0x3a2214, caraLarga: 1.12,
    camisa: 0x1b1c20, mangas: "largas", cuello: null, cuelloBotones: false, franja: null, cuelloAlto: 0.07, dedos: false,
    pantalon: MARCA.navy, zapatos: MARCA.navy2, panza: 0.9, nariz: 0.05, mejillas: 0xe39a86,
    auriculares: MARCA.g, auricularFino: true, alto: 1.0, lentes: null },
};

// el mozo de por-que-el-mozo (10-11, genérico, no es del elenco fijo): camisa blanca, chaleco navy, moño verde, delantal
// largo crema, repasador al hombro, pelo engominado con raya al costado, bigote fino y el lápiz atrás de la oreja
export const MOZO = { nombre: "Mozo", piel: PIEL.clara, pelo: 0x2a2220, peinado: "engominado", cejasColor: 0x2a2220, bigoteFino: 0x2a2220,
  camisa: 0xffffff, mangas: "largas", chaleco: MARCA.navy2, moño: MARCA.g, delantalLargo: MARCA.cr, repasador: true, lapizOreja: true,
  pantalon: MARCA.navy, zapatos: 0x1a1414, panza: 1.0, nariz: 0.058, mejillas: 0xe59a8a, alto: 1.02, ojoDibujo: true };

// valores neutros para lo que un personaje no define (sin bigote, sin lentes, sin delantal...)
export const DEFECTO = { nombre: "Alguien", piel: PIEL.media, pelo: PELO.castaño, peinado: "corto", cejasColor: 0x3a2f2a,
  camisa: MARCA.cr, mangas: "cortas", pantalon: 0x3a3f4a, zapatos: 0x2a2220, panza: 1.0, nariz: 0.058, mejillas: 0xe08a7a, alto: 1.0,
  bigote: null, lentes: null, delantal: null, delantalBorde: null, pollera: null, cuello: null, labios: null, aros: null, auriculares: null,
  pestanas: null, ojoDibujo: false, chaleco: null, moño: null, delantalLargo: null, repasador: false, bigoteFino: null, lapizOreja: false, barba: null, barbaBigote: false, cejaGruesa: false, ojosColor: null, caraLarga: 1, texturaAlto: 1, barbaLarga: 0.5, jopoAlto: 1, dedos: false, cuelloAlto: 0, labiosPegados: false, cuelloFino: false, cejaFina: false, ojoEscala: 1, franja: null, cuelloBotones: true, parpadeoCada: 3.1, parpadeoDur: 0.16 };

export const POSE_BASE = {
  x: 0, y: 0, z: 0, giro: 0, inclina: 0, ladea: 0, torso: 0, aplasta: 0, respira: 1, t: 0, reflejo: 0, paso: 0,
  cabeza: { giro: 0, asiente: 0, ladea: 0 },
  ojos: { x: 0, y: 0, abiertos: 1, tension: 0, feliz: 0, guiño: 0 },
  cejas: { alto: 0, ang: 0, asim: 0 },
  boca: { sonrisa: 0.15, abierta: 0, ancho: 1 },
  manoI: [0.3, 0.58, 0.06], manoD: [-0.3, 0.58, 0.06], dedoI: 0, dedoD: 0, codoI: null, codoD: null,
};

// mezcla profunda de poses (números y arreglos de números); lo que falta en `b` sale de `a`
export function mezclar(a, b, u) {
  if (typeof a === "number") return typeof b === "number" ? lerp(a, b, u) : a;
  if (Array.isArray(a)) return Array.isArray(b) ? a.map((v, i) => lerp(v, b[i], u)) : a;
  if (a && typeof a === "object") {
    const o = {};
    for (const k of new Set([...Object.keys(a), ...Object.keys(b || {})])) o[k] = k in a ? mezclar(a[k], b?.[k], u) : b[k];
    return o;
  }
  return b ?? a;
}
export const completar = (p) => mezclar(POSE_BASE, p, 1);

// Pose en el tiempo desde claves [[t, pose, dur?], ...]: cada clave es el estado al que se llega EN t,
// partiendo dur s antes (por defecto 0.3) con ease in-out; entre claves se sostiene (con vida: respira y parpadea).
export function poseEn(t, claves) {
  let p = completar(claves[0][1]);
  for (let i = 1; i < claves.length; i++) {
    const [ti, pose, dur = 0.3, curva] = claves[i];
    if (t <= ti - dur) break;
    const u = cl((t - (ti - dur)) / dur);
    p = mezclar(p, mezclar(p, pose, 1), (curva || eio)(u));
  }
  p.t = t;
  return p;
}

// parpadeo automático determinista: devuelve cuánto cierra (0..1) en t
export function parpadeo(t, semilla = 1, cada = 3.1, d = 0.16) {
  const fase = (t + semilla * 1.37) % cada;
  return fase < d ? Math.sin((fase / d) * Math.PI) : 0;
}

// ---------- geometrías compartidas ----------
const G = {
  esfera: new THREE.SphereGeometry(1, 28, 20),
  esferaLow: new THREE.SphereGeometry(1, 14, 10),
  parpado: new THREE.SphereGeometry(1, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2),
  cil: (() => { const g = new THREE.CylinderGeometry(1, 1, 1, 16, 1); g.translate(0, -0.5, 0); return g; })(),
};

export function crearPersonaje(cfg) {
  // ojo: lo que no viene en cfg sale de DEFECTO (neutro), nunca de otro personaje
  const c = { ...DEFECTO, ...cfg };
  const raiz = new THREE.Group();
  const escala = new THREE.Group(); escala.scale.setScalar(c.alto ?? 1); raiz.add(escala);
  const M = {
    piel: mat(c.piel, 0.55), pielSombra: mat(new THREE.Color(c.piel).multiplyScalar(0.86).getHex(), 0.6),
    pelo: mat(c.pelo, 0.75), cejas: mat(c.cejasColor ?? 0x3a2f2a, 0.7), camisa: mat(c.camisa, 0.7),
    pantalon: mat(c.pantalon ?? 0x3a3f4a, 0.7), zapatos: mat(c.zapatos, 0.45),
    blanco: mat(0xffffff, 0.25), pupila: mat(c.ojosColor ?? 0x111722, 0.18), boca: mat(0x3a1b20, 0.6), lengua: mat(0xd8737a, 0.5),
    labio: mat(c.labios ?? 0x6b3a35, 0.5),
    mejilla: new THREE.MeshStandardMaterial({ color: c.mejillas ?? 0xe08a7a, roughness: 0.8, transparent: true, opacity: 0.55, depthWrite: false }),
  };
  const mesh = (g, m, x = 0, y = 0, z = 0, sx = 1, sy = sx, sz = sx) => { const o = new THREE.Mesh(g, m); o.position.set(x, y, z); o.scale.set(sx, sy, sz); return o; };

  // ---- piernas (en la raíz: no se inclinan con el torso) ----
  const CADERA = 0.56;
  const piernas = [-1, 1].map((s) => {
    const piv = new THREE.Group(); piv.position.set(s * 0.1, CADERA, 0); escala.add(piv);
    piv.add(mesh(G.cil, c.pantalon ? M.pantalon : M.piel, 0, 0, 0, 0.068, CADERA - 0.06, 0.068));
    piv.add(mesh(rbox(0.15, 0.09, 0.25, 0.04), M.zapatos, 0, 0.045 - CADERA, 0.04));
    return { piv, s };
  });

  // ---- cuerpo (pivote en la cadera) ----
  const cuerpo = new THREE.Group(); cuerpo.position.y = CADERA; escala.add(cuerpo);
  const P = c.panza ?? 1;
  // torso de torno: más ancho abajo (panza) y redondeado arriba (hombros)
  let perfil = [[0, -0.02], [0.2 * P, 0.0], [0.235 * P, 0.1], [0.235 * P, 0.22], [0.215, 0.36], [0.19, 0.44], [0.12, 0.5], [0, 0.515]].map(([r, y]) => new THREE.Vector2(r, y));
  // torsoSuave: perfil interpolado y más segmentos (en remeras lisas oscuras se veían escalones en los hombros)
  if (c.torsoSuave) { const cu = new THREE.SplineCurve(perfil.slice(1)); perfil = [perfil[0], ...cu.getPoints(40)]; }
  const torsoGeo = new THREE.LatheGeometry(perfil, c.torsoSuave ? 64 : 28);
  const torso = mesh(torsoGeo, M.camisa); torso.scale.z = 0.86; cuerpo.add(torso);
  if (c.delantal) {
    // delantal: un panel curvo por delante, con tira al cuello y borde de color
    const dm = mat(c.delantal, 0.72);
    const del = mesh(new THREE.CylinderGeometry(0.245 * P, 0.25 * P, 0.4, 28, 1, true, -1.05, 2.1), dm, 0, 0.17, 0.0);
    del.scale.z = 0.9; del.material.side = THREE.DoubleSide; cuerpo.add(del);
    const pecho = mesh(rbox(0.22, 0.17, 0.03, 0.012), dm, 0, 0.42, 0.155); pecho.rotation.x = -0.2; cuerpo.add(pecho);
    if (c.delantalBorde) {
      const bm = mat(c.delantalBorde, 0.55);
      const borde = mesh(new THREE.TorusGeometry(0.25 * P, 0.012, 6, 40, 2.1), bm, 0, -0.025, 0); borde.rotation.set(Math.PI / 2, 0, -1.05 + Math.PI / 2 - Math.PI / 2); borde.rotation.z = Math.PI / 2 - 1.05; borde.scale.y = 0.9; cuerpo.add(borde);
      const bolsillo = mesh(rbox(0.12, 0.07, 0.02, 0.01), bm, 0, 0.1, 0.23 * P); cuerpo.add(bolsillo);
    }
  }
  if (c.pollera) {
    const pol = mesh(new THREE.CylinderGeometry(0.21, 0.29, 0.3, 28), mat(c.pollera, 0.75), 0, -0.1, 0); pol.scale.z = 0.88; cuerpo.add(pol);
  }
  if (c.cuello) {
    const cu = mesh(new THREE.TorusGeometry(c.cuelloFino ? 0.085 : 0.1, c.cuelloFino ? 0.016 : 0.03, 8, 24), mat(c.cuello, 0.6), 0, c.cuelloFino ? 0.505 : 0.5, 0.01); cu.rotation.x = Math.PI / 2 - 0.15; cuerpo.add(cu);
    if (c.cuelloBotones) for (const b of [0.36, 0.26, 0.16]) cuerpo.add(mesh(G.esferaLow, mat(c.cuello, 0.4), 0, b, 0.2 * P + 0.012 - (b - 0.16) * 0.06, 0.018));
  }
  if (c.franja) {
    // franja de marca en el pecho (buzo): un aro que sigue el torso
    const fm = mat(c.franja, 0.5);
    for (const [y, r] of [[0.3, 0.226], [0.255, 0.231]]) { const f = mesh(new THREE.TorusGeometry(r * (y < 0.28 ? Math.max(1, P * 0.98) : 1), y < 0.28 ? 0.012 : 0.022, 8, 40), fm, 0, y, 0); f.rotation.x = Math.PI / 2; f.scale.set(1, 0.86, 1); cuerpo.add(f); }
  }
  if (c.chaleco) {
    // chaleco abierto adelante (deja ver la camisa y el moño): un tubo que sigue el torso, con botones
    const vm = mat(c.chaleco, 0.6);
    const vg = new THREE.CylinderGeometry(0.212, 0.252 * P, 0.36, 36, 1, true, 0.42, Math.PI * 2 - 0.84);
    const v = mesh(vg, vm, 0, 0.3, 0); v.scale.z = 0.9; cuerpo.add(v);
    // hombros del chaleco (tapa la costura con la bola del brazo)
    const hom = mesh(new THREE.CylinderGeometry(0.12, 0.2, 0.06, 36, 1, true, 0.62, Math.PI * 2 - 1.24), vm, 0, 0.495, 0); hom.scale.z = 0.88; cuerpo.add(hom);
    for (const s of [-1, 1]) { const solapa = mesh(rbox(0.035, 0.3, 0.02, 0.008), vm, s * 0.085, 0.3, 0.205 * P); solapa.rotation.set(-0.12, 0, s * 0.22); cuerpo.add(solapa); }
    const bm = mat(c.chalecoBoton ?? MARCA.cr, 0.35);
    for (const y of [0.13, 0.2]) cuerpo.add(mesh(G.esferaLow, bm, 0.05, y, 0.228 * P, 0.014));
  }
  if (c.moño) {
    // moño (corbata de lazo) en el cuello de la camisa
    const mm = mat(c.moño, 0.45);
    const lz = new THREE.Group(); lz.position.set(0, 0.49, 0.125); lz.rotation.x = -0.25; cuerpo.add(lz);
    for (const s of [-1, 1]) { const a = mesh(new THREE.ConeGeometry(0.035, 0.065, 4), mm, s * 0.032, 0, 0); a.rotation.z = s * Math.PI / 2; a.scale.z = 0.5; lz.add(a); }
    lz.add(mesh(G.esferaLow, mm, 0, 0, 0.004, 0.016, 0.018, 0.012));
  }
  if (c.delantalLargo) {
    // delantal de mozo: desde la cintura hasta abajo de la rodilla, atado con una tira; bolsillo con la libreta cerrada
    const dm = mat(c.delantalLargo, 0.8); dm.side = THREE.DoubleSide;
    const del = mesh(new THREE.CylinderGeometry(0.248 * P, 0.29, 0.58, 30, 1, true, -1.25, 2.5), dm, 0, -0.2, 0); del.scale.z = 0.92; cuerpo.add(del);
    const tira = mesh(new THREE.TorusGeometry(0.242 * P, 0.012, 6, 40), dm, 0, 0.09, 0); tira.rotation.x = Math.PI / 2; tira.scale.y = 0.88; cuerpo.add(tira);
    const bol = mesh(rbox(0.13, 0.11, 0.022, 0.01), dm, -0.1, -0.06, 0.262); bol.rotation.y = -0.38; cuerpo.add(bol);
    // la libreta cerrada asoma del bolsillo
    const lib = mesh(rbox(0.085, 0.1, 0.022, 0.008), mat(MARCA.navy2, 0.6), -0.098, 0.0, 0.255); lib.rotation.set(0, -0.38, -0.06); cuerpo.add(lib);
    const hojas = mesh(rbox(0.077, 0.006, 0.016, 0.002), mat(0xf7f5ec, 0.8), -0.098, 0.05, 0.255); hojas.rotation.set(0, -0.38, -0.06); cuerpo.add(hojas);
    const gom = mesh(rbox(0.088, 0.008, 0.026, 0.003), mat(MARCA.g, 0.5), -0.098, 0.025, 0.256); gom.rotation.set(0, -0.38, -0.06); cuerpo.add(gom);
    cuerpo.userData.libreta = lib;
  }
  if (c.repasador) {
    // repasador blanco al hombro izquierdo (+x): cae adelante sobre el pecho y atrás
    const rm = mat(0xffffff, 0.85);
    const top = mesh(rbox(0.1, 0.025, 0.18, 0.01), rm, 0.17, 0.5, 0.0); top.rotation.z = -0.35; cuerpo.add(top);
    const fr = mesh(rbox(0.1, 0.2, 0.022, 0.01), rm, 0.17, 0.39, 0.155); fr.rotation.set(-0.25, 0, 0.12); cuerpo.add(fr);
    for (const y of [0.33, 0.35]) { const r = mesh(rbox(0.102, 0.008, 0.024, 0.003), mat(MARCA.g, 0.6), 0.17 + (0.36 - y) * 0.12, y, 0.17 - (0.36 - y) * 0.25); r.rotation.set(-0.25, 0, 0.12); cuerpo.add(r); }
    const at = mesh(rbox(0.1, 0.16, 0.022, 0.01), rm, 0.17, 0.42, -0.14); at.rotation.set(0.2, 0, 0.1); cuerpo.add(at);
  }
  const CA = c.cuelloAlto || 0;
  // cuelloAlto: la cabeza sube y se ve un cuello de verdad (sin el aro de la camisa haciendo de pedestal)
  const cuello = CA ? mesh(G.cil, M.piel, 0, 0.53 + CA * 0.5, 0, 0.056, 0.1 + CA, 0.05) : mesh(G.cil, M.piel, 0, 0.58, 0, 0.065, 0.1, 0.065); cuerpo.add(cuello);

  // ---- cabeza (pivote en el cuello) ----
  const R = 0.3;
  const cabeza = new THREE.Group(); cabeza.position.set(0, 0.54 + CA, 0); cuerpo.add(cabeza);
  if (c.caraLarga && c.caraLarga !== 1) cabeza.scale.set(1 / Math.sqrt(c.caraLarga), c.caraLarga, 1); // cara más alargada (mandíbula marcada)
  const CC = R * 0.92; // centro del cráneo sobre el pivote
  const craneo = mesh(G.esfera, M.piel, 0, CC, 0, R, R * 0.97, R * 0.95); cabeza.add(craneo);
  // punto sobre la superficie: az (rad, + a la izquierda del personaje = +x), el (rad, + arriba)
  const sup = (az, el, k = 1) => new THREE.Vector3(R * k * Math.sin(az) * Math.cos(el), CC + R * 0.97 * k * Math.sin(el), R * 0.95 * k * Math.cos(az) * Math.cos(el));
  const mirarAfuera = (o, az, el) => { const n = sup(az, el, 2); o.lookAt(n.x, n.y, n.z); };
  const sobre = (o, az, el, k = 1) => { const p = sup(az, el, k); o.position.copy(p); mirarAfuera(o, az, el); return o; };

  // orejas, nariz, mejillas
  for (const s of [-1, 1]) { const o = mesh(G.esferaLow, M.piel, 0, 0, 0, 0.05, 0.075, 0.035); sobre(o, s * 1.5, -0.05, 0.98); cabeza.add(o); }
  const nariz = mesh(G.esfera, M.pielSombra, 0, 0, 0, c.nariz ?? 0.06, (c.nariz ?? 0.06) * 0.9, (c.nariz ?? 0.06) * 0.85); sobre(nariz, 0, -0.1, 1.0); cabeza.add(nariz);
  const mejillas = [-1, 1].map((s) => { const m = mesh(G.esferaLow, M.mejilla, 0, 0, 0, 0.065, 0.045, 0.012); sobre(m, s * 0.55, c.barba ? -0.18 : -0.24, 1.0); cabeza.add(m); return m; });

  // ojos: blanco + pupila + brillo, con párpado superior que rota (abre/cierra) y se inclina (humor)
  const ojos = [-1, 1].map((s) => {
    const g = new THREE.Group(); sobre(g, s * 0.34, 0.06, 0.9); g.scale.setScalar(c.ojoEscala ?? 1); cabeza.add(g);
    const blanco = mesh(G.esfera, M.blanco, 0, 0, 0, 0.068, 0.076, 0.05); g.add(blanco);
    const pup = new THREE.Group(); g.add(pup);
    pup.add(mesh(G.esfera, M.pupila, 0, 0, 0.034, 0.036, 0.042, 0.022));
    pup.add(mesh(G.esferaLow, M.blanco, 0.012, 0.016, 0.052, 0.011));
    const lidPivote = new THREE.Group(); g.add(lidPivote);
    const lid = mesh(G.parpado, M.piel, 0, 0, 0, 0.074, 0.082, 0.058); lidPivote.add(lid);
    const lidLow = new THREE.Group(); g.add(lidLow);
    const lidLowM = mesh(G.parpado, M.piel, 0, 0, 0, 0.073, 0.08, 0.057); lidLowM.rotation.z = Math.PI; lidLow.add(lidLowM);
    if (c.pestanas) {
      // pestañas: tres trazos finos en el borde de arriba, hacia afuera (se mueven con el párpado)
      const pm = mat(c.pestanas, 0.5), abajo = new THREE.Vector3(0, -1, 0);
      for (const [a, L] of [[1.0, 0.014], [1.22, 0.018], [1.44, 0.015]]) {
        const d = new THREE.Vector3(s * Math.sin(a), Math.cos(a), 0.3).normalize();
        const m = mesh(G.cil, pm, s * Math.sin(a) * 0.066, Math.cos(a) * 0.074, 0.026, 0.005, L, 0.005);
        m.quaternion.setFromUnitVectors(abajo, d); g.add(m);
      }
      // delineado arriba
      const del = mesh(new THREE.TorusGeometry(0.073, 0.008, 6, 24, Math.PI * 0.75), pm, 0, 0.004, 0.02); del.rotation.z = Math.PI * 0.125; g.add(del);
    }
    // ojo de dibujo animado (cfg.ojoDibujo): cerrado = una línea curva oscura (sin párpado como bulto de piel)
    let arco = null;
    if (c.ojoDibujo) {
      arco = mesh(new THREE.TorusGeometry(0.052, 0.0105, 8, 20, Math.PI), mat(0x2b1d18, 0.6), 0, 0.012, 0.052);
      arco.rotation.z = Math.PI; arco.scale.set(1, 0.62, 1); arco.visible = false; g.add(arco);
    }
    return { g, blanco, pup, lidPivote, lid, lidLow, s, arco };
  });
  // cejas
  const cejas = [-1, 1].map((s) => {
    const piv = new THREE.Group(); sobre(piv, s * 0.34, 0.33, 1.0); cabeza.add(piv);
    const b = c.cejaFina ? mesh(rbox(0.115, 0.022, 0.022, 0.01), M.cejas) : c.cejaGruesa ? mesh(rbox(0.14, 0.044, 0.034, 0.016), M.cejas) : mesh(rbox(0.13, 0.034, 0.03, 0.014), M.cejas); piv.add(b);
    return { piv, b, s, base: piv.position.clone() };
  });
  // boca: curva de tubo (se rehace si cambia) + interior oscuro cuando se abre
  const bocaG = new THREE.Group(); sobre(bocaG, 0, -0.34, 0.985); cabeza.add(bocaG);
  const bocaLinea = new THREE.Mesh(new THREE.BufferGeometry(), c.labios ? M.labio : M.boca); bocaG.add(bocaLinea);
  const bocaAbierta = mesh(G.esfera, M.boca, 0, 0, 0.0, 0.07, 0.04, 0.02); bocaG.add(bocaAbierta);
  const lengua = mesh(G.esferaLow, M.lengua, 0, -0.012, 0.008, 0.04, 0.016, 0.014); bocaG.add(lengua);
  let bocaClave = "";
  function ponerBoca(sonrisa, abierta, ancho) {
    const w = 0.075 * ancho, k = sonrisa * 0.045 * (c.labiosPegados ? 1 - 0.75 * cl(abierta) : 1); // con labios: al abrir, el labio se aplana sobre la boca (no queda una sonrisa flotando)
    const clave = `${Math.round(sonrisa * 40)}|${Math.round(abierta * 30)}|${Math.round(ancho * 30)}`;
    if (clave !== bocaClave) {
      bocaClave = clave;
      const yAb = -abierta * 0.045;
      const curva = new THREE.QuadraticBezierCurve3(new THREE.Vector3(-w, k + yAb * 0.3, 0.004), new THREE.Vector3(0, -k + yAb * 0.2, 0.012), new THREE.Vector3(w, k + yAb * 0.3, 0.004));
      bocaLinea.geometry.dispose();
      bocaLinea.geometry = new THREE.TubeGeometry(curva, 16, c.labios ? 0.014 : 0.011, 6, false);
    }
    const ab = cl(abierta);
    bocaAbierta.visible = lengua.visible = ab > 0.04;
    bocaAbierta.scale.set(w * 0.85, 0.008 + ab * 0.05, 0.02);
    bocaAbierta.position.y = c.labiosPegados ? (-k - ab * 0.009) - (0.008 + ab * 0.05) * 0.8 : -ab * 0.028 - sonrisa * 0.008;
    lengua.position.y = bocaAbierta.position.y - ab * 0.022;
    lengua.scale.set(w * 0.5, 0.012 + ab * 0.01, 0.014);
  }

  // pelo
  if (c.peinado === "texturado") {
    // varón: corto con textura, un poco despeinado arriba, mechones cortos hacia adelante y costados más cortos
    const TX = c.texturaAlto ?? 1;
    const mecha = (az, el, sx, sy, sz, k = 1.0, rz = 0, rx = 0) => { const m = mesh(G.esfera, M.pelo, 0, 0, 0, sx, sy, sz); sobre(m, az, el, k); m.rotation.z += rz; m.rotation.x += rx; cabeza.add(m); return m; };
    { const cap = mesh(new THREE.SphereGeometry(1, 40, 18, 0, Math.PI * 2, 0, Math.PI * 0.4), M.pelo, 0, CC + 0.004, -0.01, R * 1.03, R * 1.03, R * 1.035); cap.rotation.x = -0.22; cabeza.add(cap); }
    // costados rebajados y patillas
    for (const sg of [-1, 1]) { mecha(sg * 1.5, 0.48, 0.1, 0.075, 0.016, 1.0, 0); mecha(sg * 1.34, 0.2, 0.024, 0.065, 0.014, 1.0, sg * 0.05); }
    // arriba: mechones cortos desordenados (semilla fija), apuntando hacia adelante
    let sd = 7; const az0 = () => ((sd = (sd * 16807) % 2147483647) / 2147483647);
    for (let i = 0; i < 26; i++) {
      const az = (az0() - 0.5) * 1.9, el = 0.78 + az0() * 0.5;
      mecha(az, el, 0.05 + az0() * 0.025, 0.028 + az0() * 0.015, 0.028 * TX + az0() * 0.02 * TX, 1.015 + 0.015 * TX, (az0() - 0.5) * 0.8, 0.5 + az0() * 0.3);
    }
    // flequillo: puntas cortas que caen hacia la frente
    for (const [az, el, rz] of [[-0.5, 0.66, 0.4], [-0.25, 0.7, 0.15], [0.02, 0.71, -0.05], [0.28, 0.7, -0.2], [0.52, 0.65, -0.4]]) mecha(az, el, 0.06, 0.04, 0.024, 1.025, rz, 0.55);
  } else if (c.peinado === "pelado") {
    // la corona es una cáscara abierta: con las dos caras (si no, de atrás o de arriba se veía como un parche plano y transparente)
    const coronaM = M.pelo.clone(); coronaM.side = THREE.DoubleSide;
    const corona = mesh(new THREE.SphereGeometry(1, 32, 16, Math.PI * 0.93, Math.PI * 1.14, Math.PI * 0.34, Math.PI * 0.3), coronaM, 0, CC, 0, R * 1.035, R * 1.0, R * 0.985);
    cabeza.add(corona);
    // mechones con volumen sobre la corona (de costado o de atrás la cáscara sola se leía como un parche plano)
    // (opcional, cfg.mechones: los reels de antes quedan iguales) en vez de la cáscara, una herradura de pelo con volumen
    // alrededor de la nuca, con las puntas redondeadas: de costado o de atrás ya no se lee como un parche plano
    if (c.mechones) {
      corona.visible = false;
      const pelo = mat(c.pelo, 0.8);
      const herr = new THREE.Group(); herr.position.set(0, CC - 0.015, -0.005); herr.rotation.y = -0.12; herr.scale.set(1, 1.75, 0.95); cabeza.add(herr);
      const arco = Math.PI + 0.24, rr = R * 0.975, tubo = 0.046;
      const anillo = mesh(new THREE.TorusGeometry(rr, tubo, 12, 48, arco), pelo); anillo.rotation.x = -Math.PI / 2; herr.add(anillo);
      for (const th of [0, arco]) { const pt = mesh(G.esfera, pelo, rr * Math.cos(th), 0, -rr * Math.sin(th), tubo); herr.add(pt); }
    }
    craneo.material = M.piel.clone(); craneo.material.roughness = 0.38; // brillo de pelado
  } else if (c.peinado === "rulos") {
    let s = 11;
    const az = () => ((s = (s * 16807) % 2147483647) / 2147483647);
    const rulo = new THREE.IcosahedronGeometry(1, 1);
    for (let i = 0; i < 52; i++) {
      const a = az() * Math.PI * 2, e = 0.1 + Math.pow(az(), 0.75) * 1.3;
      if (Math.cos(a) > 0.1 && e > 0.55) continue; // la cara libre
      const r = 0.062 + az() * 0.028;
      const p = new THREE.Vector3(Math.sin(a) * Math.sin(e), Math.cos(e), Math.cos(a) * Math.sin(e)).multiplyScalar(R * 1.02);
      const m = mesh(rulo, M.pelo, p.x, CC + p.y * 1.05 + 0.03, p.z - 0.01, r);
      cabeza.add(m);
    }
    // flequillo
    for (let i = -3; i <= 3; i++) { const m = mesh(rulo, M.pelo, 0, 0, 0, 0.058); sobre(m, i * 0.17, 0.7 + Math.abs(i) * 0.05, 1.02); cabeza.add(m); }
  } else if (c.peinado === "corto") {
    cabeza.add(mesh(new THREE.SphereGeometry(1, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.42), M.pelo, 0, CC + 0.01, -0.01, R * 1.05, R * 1.02, R * 1.02));
    const flequillo = mesh(rbox(0.36, 0.08, 0.12, 0.035), M.pelo); sobre(flequillo, 0, 0.72, 1.0); flequillo.rotation.x -= 0.4; cabeza.add(flequillo);
  } else if (c.peinado === "coleta") {
    // casquete con raya al costado, flequillo de lado y coleta alta que cae atrás
    cabeza.add(mesh(new THREE.SphereGeometry(1, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.44), M.pelo, 0, CC + 0.008, -0.012, R * 1.05, R * 1.03, R * 1.03));
    const fl = mesh(G.esfera, M.pelo, 0, 0, 0, 0.17, 0.06, 0.07); sobre(fl, 0.22, 0.66, 1.0); fl.rotation.z += 0.35; cabeza.add(fl);
    for (const s of [-1, 1]) { const m = mesh(G.esfera, M.pelo, 0, 0, 0, 0.045, 0.13, 0.05); sobre(m, s * 1.25, 0.25, 0.99); cabeza.add(m); }
    const nudo = mesh(G.esferaLow, mat(MARCA.g, 0.5), 0, CC + R * 0.62, -R * 0.78, 0.045); cabeza.add(nudo);
    const coleta = new THREE.Group(); coleta.position.set(0, CC + R * 0.62, -R * 0.84); coleta.rotation.x = 0.5; cabeza.add(coleta);
    coleta.add(mesh(G.esfera, M.pelo, 0, -0.12, -0.03, 0.075, 0.16, 0.07));
    coleta.add(mesh(G.esfera, M.pelo, 0, -0.26, -0.02, 0.055, 0.1, 0.05));
  } else if (c.peinado === "coletaAlta" || c.peinado === "coletaLado" || c.peinado === "mediaCola") {
    // base con volumen: casquete un poco más grande que el cráneo + mechas sueltas atrás y a los costados
    const mecha = (az, el, sx, sy, sz, k = 1.0, rz = 0) => { const m = mesh(G.esfera, M.pelo, 0, 0, 0, sx, sy, sz); sobre(m, az, el, k); m.rotation.z += rz; cabeza.add(m); return m; };
    { const cap = mesh(new THREE.SphereGeometry(1, 40, 18, 0, Math.PI * 2, 0, Math.PI * 0.46), M.pelo, 0, CC + 0.01, -0.02, R * 1.08, R * 1.07, R * 1.08); cap.rotation.x = -0.32; cabeza.add(cap); }
    for (const [az, el, sx, sy] of [[Math.PI, 0.05, 0.2, 0.17], [2.45, 0.08, 0.16, 0.16], [-2.45, 0.08, 0.16, 0.16], [1.95, 0.12, 0.13, 0.15], [-1.95, 0.12, 0.13, 0.15]]) mecha(az, el, sx, sy, 0.1, 0.98);
    // mechones a los costados de la cara (caen delante de la oreja hasta la mandíbula)
    for (const sg of [-1, 1]) { mecha(sg * 1.2, 0.02, 0.034, 0.16, 0.04, 1.02, sg * 0.18); mecha(sg * 1.32, -0.12, 0.03, 0.12, 0.035, 1.0, sg * 0.1); }
    const tie = mat(MARCA.g, 0.45);
    if (c.peinado !== "mediaCola") {
      // flequillo de costado: tres mechas que barren la frente
      for (const [az, el, sx, sy, rz] of [[-0.62, 0.48, 0.12, 0.05, 0.75], [-0.35, 0.58, 0.16, 0.06, 0.45], [-0.05, 0.64, 0.16, 0.06, 0.32], [0.28, 0.62, 0.14, 0.055, 0.3], [0.58, 0.52, 0.11, 0.05, 0.55], [0.85, 0.38, 0.07, 0.045, 0.9]]) mecha(az, el, sx, sy, 0.07, 1.04, rz);
    } else {
      // flequillo cortina, abierto al medio
      for (const sg of [-1, 1]) { mecha(sg * 0.28, 0.6, 0.15, 0.065, 0.08, 1.04, -sg * 0.5); mecha(sg * 0.62, 0.45, 0.1, 0.06, 0.07, 1.04, -sg * 0.8); }
    }
    if (c.peinado === "coletaAlta") {
      // coleta alta: nace arriba atrás, se ve por encima y al costado de la cabeza
      const co = new THREE.Group(); co.position.set(0, CC + R * 0.62, -R * 0.62); co.rotation.set(0.25, 0, 0.32); cabeza.add(co);
      co.add(mesh(new THREE.TorusGeometry(0.05, 0.018, 8, 18), tie, 0, 0, -0.04).rotateX(Math.PI / 2 - 0.4));
      for (const [y, z, sx, sy, sz] of [[0.03, -0.12, 0.11, 0.1, 0.12], [-0.12, -0.2, 0.09, 0.14, 0.085], [-0.28, -0.2, 0.075, 0.13, 0.07], [-0.41, -0.15, 0.05, 0.09, 0.05]]) co.add(mesh(G.esfera, M.pelo, 0, y, z, sx, sy, sz));
    } else if (c.peinado === "coletaLado") {
      // coleta baja al costado, cae por delante del hombro izquierdo: se ve de frente
      const co = new THREE.Group(); co.position.set(R * 0.82, CC - 0.13, -R * 0.35); cabeza.add(co);
      co.add(mesh(new THREE.TorusGeometry(0.045, 0.017, 8, 18), tie, 0, 0, 0).rotateZ(0.3));
      for (const [x, y, z, sx, sy, sz] of [[0.03, -0.06, 0.04, 0.075, 0.1, 0.075], [0.06, -0.19, 0.12, 0.08, 0.13, 0.075], [0.05, -0.33, 0.17, 0.065, 0.12, 0.06], [0.03, -0.44, 0.18, 0.045, 0.08, 0.045]]) co.add(mesh(G.esfera, M.pelo, x, y, z, sx, sy, sz));
    } else {
      // media cola: pelo suelto hasta los hombros + rodetito arriba atrás
      for (const [az, el, sx, sy] of [[Math.PI, -0.45, 0.22, 0.2], [2.4, -0.4, 0.17, 0.2], [-2.4, -0.4, 0.17, 0.2], [1.75, -0.35, 0.1, 0.2], [-1.75, -0.35, 0.1, 0.2]]) mecha(az, el, sx, sy, 0.11, 1.0);
      cabeza.add(mesh(G.esfera, M.pelo, 0, CC + R * 0.85, -R * 0.55, 0.085));
      cabeza.add(mesh(new THREE.TorusGeometry(0.05, 0.016, 8, 18), tie, 0, CC + R * 0.78, -R * 0.5).rotateX(-0.6));
    }
  } else if (c.peinado === "jopo") {
    const JA = c.jopoAlto ?? 1; // volumen del jopo (0.5 = corto y prolijo, 1.5 = bien alto)
    // varón: casquete corto con costados rebajados y un jopo con volumen arriba, peinado hacia atrás y a un costado
    const mecha = (az, el, sx, sy, sz, k = 1.0, rz = 0, rx = 0) => { const m = mesh(G.esfera, M.pelo, 0, 0, 0, sx, sy, sz); sobre(m, az, el, k); m.rotation.z += rz; m.rotation.x += rx; cabeza.add(m); return m; };
    { const cap = mesh(new THREE.SphereGeometry(1, 40, 18, 0, Math.PI * 2, 0, Math.PI * 0.37), M.pelo, 0, CC + 0.005, -0.012, R * 1.035, R * 1.025, R * 1.035); cap.rotation.x = -0.34; cabeza.add(cap); }
    // costados cortos (por encima de la oreja) y patillas
    for (const sg of [-1, 1]) { mecha(sg * 1.5, 0.5, 0.1, 0.07, 0.022, 1.0, 0); mecha(sg * 1.34, 0.2, 0.024, 0.06, 0.016, 1.0, sg * 0.05); }
    // el jopo: mechones que suben desde la frente y se van hacia atrás, el del medio más alto
    for (const [az, el, sx, sy, sz, rz] of [[-0.4, 0.84, 0.1, 0.06, 0.11, 0.35], [-0.13, 0.9, 0.12, 0.075, 0.12, 0.12], [0.15, 0.91, 0.12, 0.08, 0.12, -0.08], [0.42, 0.85, 0.1, 0.06, 0.11, -0.3], [0.0, 1.12, 0.16, 0.07, 0.15, 0], [-0.3, 1.08, 0.11, 0.06, 0.12, 0.2], [0.3, 1.08, 0.11, 0.06, 0.12, -0.2]]) mecha(az, el, sx, sy * JA, sz, 1.0 + 0.06 * JA, rz, -0.35);
  } else if (c.peinado === "engominado") {
    // el mozo (por-que-el-mozo, 10-11): pelo engominado pegado y brillante, raya al costado (lado derecho del personaje)
    const gm = mat(c.pelo, 0.22, { metalness: 0.05 });
    const cap = mesh(new THREE.SphereGeometry(1, 40, 18, 0, Math.PI * 2, 0, Math.PI * 0.43), gm, 0, CC + 0.006, -0.012, R * 1.04, R * 1.03, R * 1.035); cap.rotation.x = -0.28; cabeza.add(cap);
    // el lado largo (izquierda del personaje, +x) peinado hacia atrás con una onda sobre la frente
    const onda = mesh(G.esfera, gm, 0, 0, 0, 0.17, 0.06, 0.1); sobre(onda, 0.32, 0.72, 1.0); onda.rotation.z += -0.32; onda.rotation.x -= 0.25; cabeza.add(onda);
    // la raya: un surco de piel fino que va de la frente hacia atrás
    const raya = new THREE.TubeGeometry(new THREE.CatmullRomCurve3([sup(-0.36, 0.62, 1.035), sup(-0.33, 0.85, 1.035), sup(-0.28, 1.1, 1.03), sup(-0.24, 1.32, 1.02)]), 16, 0.007, 5);
    cabeza.add(new THREE.Mesh(raya, M.pielSombra));
    for (const sg of [-1, 1]) { const m = mesh(G.esfera, gm, 0, 0, 0, 0.03, 0.07, 0.016); sobre(m, sg * 1.36, 0.18, 1.0); cabeza.add(m); }
  } else if (c.peinado === "rodete") {
    cabeza.add(mesh(new THREE.SphereGeometry(1, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.45), M.pelo, 0, CC + 0.005, -0.008, R * 1.04, R * 1.02, R * 1.02));
    cabeza.add(mesh(G.esfera, M.pelo, 0, CC + R * 0.95, -R * 0.45, 0.13));
  }
  if (c.barba) {
    // barba de pocos días: sombra translúcida sobre la piel que sigue el mentón y la mandíbula (no tapa las mejillas
    // altas ni llega a la boca) + bigote oscuro y definido arriba del labio
    const BL = c.barbaLarga ?? 0.5, OP = c.barbaOpacidad ?? 0.55;
    const bm = new THREE.MeshStandardMaterial({ color: c.barba, roughness: 0.95, transparent: true, opacity: OP, depthWrite: false });
    const cascara = (az, th0, th1) => { const m = mesh(new THREE.SphereGeometry(1, 40, 10, Math.PI / 2 - az, 2 * az, Math.PI * th0, Math.PI * (th1 - th0)), bm, 0, CC, 0, R * 1.008, R * 0.978, R * 0.958); m.renderOrder = 2; cabeza.add(m); };
    // una sola cáscara con máscara alfa: el borde de arriba sigue la mejilla en curva (bajo en el centro, debajo de la
    // boca; sube hacia las patillas por la mandíbula) y se difumina; nada de borde recto tipo pasamontañas
    {
      const AZ = 1.55, TH0 = 0.56, TH1 = 0.88, W = 256, H = 160;
      const cv = document.createElement("canvas"); cv.width = W; cv.height = H; const x = cv.getContext("2d");
      x.fillStyle = "#000"; x.fillRect(0, 0, W, H); x.filter = "blur(5px)"; x.fillStyle = "#fff"; x.beginPath(); x.moveTo(0, H);
      for (let i = 0; i <= W; i++) {
        const az = Math.abs((i / W) * 2 - 1) * AZ, k = Math.min(1, Math.max(0, (az - 0.45) / (1.0 + 0.2 * BL)));
        const sm = k * k * (3 - 2 * k), th = 0.66 - (0.09 + 0.02 * BL) * sm;
        x.lineTo(i, ((th - TH0) / (TH1 - TH0)) * H);
      }
      x.lineTo(W, H); x.closePath(); x.fill();
      const am = new THREE.CanvasTexture(cv);
      const m2 = bm.clone(); m2.alphaMap = am;
      const sh = mesh(new THREE.SphereGeometry(1, 48, 16, Math.PI / 2 - AZ, 2 * AZ, Math.PI * TH0, Math.PI * (TH1 - TH0)), m2, 0, CC, 0, R * 1.008, R * 0.978, R * 0.958); sh.renderOrder = 2; cabeza.add(sh);
    }
    if (c.barbaBigote) {
      const bd = mat(c.bigoteColor ?? 0x1e1612, 0.85);
      for (const s of [-1, 1]) { const bg = mesh(G.esfera, bd, 0, 0, 0, 0.068, 0.017, 0.016); sobre(bg, s * 0.11, -0.262, 1.0); bg.rotation.z += s * 0.1; cabeza.add(bg); }
    }
  }
  if (c.bigoteFino) {
    // bigote fino de mozo antiguo: dos trazos finos y largos con las puntas apenas para arriba
    const bm = mat(c.bigoteFino, 0.5);
    for (const s of [-1, 1]) { const b = mesh(G.esfera, bm, 0, 0, 0, 0.07, 0.013, 0.014); sobre(b, s * 0.13, -0.2, 1.01); b.rotation.z += s * 0.18; cabeza.add(b); }
  }
  if (c.lapizOreja) {
    // lápiz atrás de la oreja derecha (-x), sin usar: cuerpo verde, punta de madera y grafito
    const lap = new THREE.Group(); const p = sup(-1.62, 0.16, 1.05); lap.position.copy(p); lap.rotation.set(0.25, Math.PI, -0.45); lap.scale.setScalar(0.85); cabeza.add(lap);
    lap.add(mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.2, 6).rotateX(Math.PI / 2), mat(MARCA.g, 0.5), 0, 0, -0.02));
    lap.add(mesh(new THREE.ConeGeometry(0.014, 0.04, 6).rotateX(Math.PI / 2), mat(0xe6c99a, 0.7), 0, 0, 0.1));
    lap.add(mesh(new THREE.ConeGeometry(0.005, 0.014, 6).rotateX(Math.PI / 2), mat(0x2a2a2a, 0.5), 0, 0, 0.122));
    lap.add(mesh(new THREE.CylinderGeometry(0.0145, 0.0145, 0.02, 6).rotateX(Math.PI / 2), mat(MARCA.cr, 0.5), 0, 0, -0.125));
  }
  if (c.bigote) {
    const bm = mat(c.bigote, 0.7);
    for (const s of [-1, 1]) { const b = mesh(G.esferaLow, bm, 0, 0, 0, 0.075, 0.032, 0.03); sobre(b, s * 0.17, -0.2, 0.995); b.rotation.z += s * -0.32; bocaG.parent.add(b); }
  }
  const reflejos = [];
  if (c.lentes) {
    const lm = mat(c.lentes, 0.35);
    const aro = new THREE.TorusGeometry(0.088, 0.013, 8, 28);
    for (const s of [-1, 1]) { const a = mesh(aro, lm); sobre(a, s * 0.34, 0.06, 1.13); cabeza.add(a); const pat = mesh(G.cil, lm, 0, 0, 0, 0.01, 0.26, 0.01); sobre(pat, s * 1.12, 0.08, 1.05); pat.rotation.set(Math.PI / 2, 0, 0); pat.position.z -= 0.08; cabeza.add(pat); }
    const puente = mesh(G.cil, lm, 0, 0, 0, 0.011, 0.07, 0.011); sobre(puente, 0, 0.08, 1.11); puente.rotation.z = Math.PI / 2; puente.position.x -= 0.035; cabeza.add(puente); // centrado entre los dos aros (antes cruzaba el ojo izquierdo: lo-mismo-que-la-otra-vez, 08-11)
    // reflejo de una pantalla en los vidrios (pose.reflejo 0..1): un rectángulo de luz fría con renglones
    const cv = document.createElement("canvas"); cv.width = cv.height = 128; const x = cv.getContext("2d");
    const gr = x.createRadialGradient(64, 64, 4, 64, 64, 64); gr.addColorStop(0, "rgba(190,225,255,0.55)"); gr.addColorStop(1, "rgba(190,225,255,0.12)");
    x.fillStyle = gr; x.beginPath(); x.arc(64, 64, 64, 0, 7); x.fill();
    x.fillStyle = "rgba(235,248,255,0.95)"; x.fillRect(34, 26, 60, 76);
    x.fillStyle = "rgba(60,90,140,0.9)"; for (const [yy, w] of [[38, 40], [52, 30], [66, 44], [80, 24]]) x.fillRect(42, yy, w, 7);
    x.fillStyle = "rgba(92,230,17,0.95)"; x.fillRect(42, 90, 28, 7);
    const rt = new THREE.CanvasTexture(cv); rt.colorSpace = THREE.SRGBColorSpace;
    for (const s of [-1, 1]) { const r = new THREE.Mesh(new THREE.CircleGeometry(0.082, 28), new THREE.MeshBasicMaterial({ map: rt, transparent: true, opacity: 0, depthWrite: false })); sobre(r, s * 0.34, 0.06, 1.135); r.visible = false; cabeza.add(r); reflejos.push(r); }
  }
  if (c.auriculares && c.auricularFino) {
    const am = mat(MARCA.navy, 0.35), ag = mat(c.auriculares, 0.45);
    const vincha = mesh(new THREE.TorusGeometry(R * 1.11, 0.011, 8, 40, Math.PI), am, 0, CC + 0.005, -0.01); cabeza.add(vincha);
    for (const s of [-1, 1]) { const copa = mesh(new THREE.CylinderGeometry(0.048, 0.048, 0.032, 24), ag, s * R * 1.04, CC - 0.03, -0.005); copa.rotation.z = Math.PI / 2; cabeza.add(copa); cabeza.add(mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.036, 20).rotateZ(Math.PI / 2), am, s * R * 1.06, CC - 0.03, -0.005)); }
    const vara = new THREE.TubeGeometry(new THREE.CatmullRomCurve3([new THREE.Vector3(R * 1.06, CC - 0.06, 0.01), new THREE.Vector3(R * 1.0, CC - 0.15, R * 0.55), new THREE.Vector3(R * 0.42, CC - 0.115, R * 0.98)]), 20, 0.0065, 6);
    cabeza.add(mesh(vara, am));
    cabeza.add(mesh(G.esferaLow, am, R * 0.4, CC - 0.115, R * 0.99, 0.017));
  } else if (c.auriculares) {
    // vincha de auriculares con micrófono (un arco por arriba, dos copas y la varilla al costado de la boca)
    const am = mat(MARCA.navy, 0.4), ag = mat(c.auriculares, 0.45);
    const vincha = mesh(new THREE.TorusGeometry(R * 1.1, 0.018, 8, 32, Math.PI), am, 0, CC + 0.01, 0); cabeza.add(vincha);
    for (const s of [-1, 1]) { const copa = mesh(new THREE.CylinderGeometry(0.075, 0.075, 0.05, 20), ag, s * R * 1.06, CC - 0.02, 0); copa.rotation.z = Math.PI / 2; cabeza.add(copa); }
    const vara = new THREE.TubeGeometry(new THREE.CatmullRomCurve3([new THREE.Vector3(-R * 1.08, CC - 0.04, 0.02), new THREE.Vector3(-R * 0.95, CC - 0.16, R * 0.55), new THREE.Vector3(-R * 0.42, CC - 0.28, R * 0.92)]), 16, 0.011, 6);
    cabeza.add(mesh(vara, am));
    cabeza.add(mesh(G.esferaLow, ag, -R * 0.4, CC - 0.285, R * 0.93, 0.026));
  }
  if (c.aros) for (const s of [-1, 1]) { const a = mesh(G.esferaLow, mat(c.aros, 0.3), 0, 0, 0, 0.026); sobre(a, s * 1.5, -0.3, 1.0); cabeza.add(a); }

  // ---- brazos (IK de dos huesos, en el espacio del cuerpo) ----
  const HOMBRO_Y = 0.44, HOMBRO_X = 0.215, L1 = 0.285, L2 = 0.275, RB = 0.058;
  const mangaMat = M.camisa;
  const brazos = [1, -1].map((s) => { // s = +1 izquierdo (+x), -1 derecho
    const hombro = new THREE.Vector3(s * HOMBRO_X, HOMBRO_Y, 0);
    const bola = mesh(G.esfera, mangaMat, hombro.x, hombro.y, hombro.z, RB * 1.12); cuerpo.add(bola);
    const sup1 = mesh(G.cil, mangaMat); cuerpo.add(sup1);
    const codo = mesh(G.esfera, c.mangas === "largas" ? mangaMat : M.piel, 0, 0, 0, RB * 0.92); cuerpo.add(codo);
    const ante = mesh(G.cil, c.mangas === "largas" ? mangaMat : M.piel); cuerpo.add(ante);
    const puno = c.mangas === "largas" ? mesh(new THREE.TorusGeometry(1, 0.35, 8, 20), mangaMat) : null; if (puno) cuerpo.add(puno);
    const mano = new THREE.Group(); cuerpo.add(mano);
    mano.add(mesh(G.esfera, M.piel, 0, -0.045, 0, 0.068, 0.078, 0.05));
    const pulgar = mesh(G.esferaLow, M.piel, s * -0.05, -0.03, 0.03, 0.026, 0.04, 0.026); mano.add(pulgar);
    // con dedos: el índice sale del lado del pulgar (centrado, sobre los nudillos, se leía como otro dedo)
    const dedo = new THREE.Group(); dedo.position.set(c.dedos ? s * -0.032 : 0, -0.1, 0.01); mano.add(dedo);
    dedo.add(mesh(G.cil, M.piel, 0, 0, 0, 0.024, 0.12, 0.024));
    dedo.add(mesh(G.esferaLow, M.piel, 0, -0.12, 0, 0.024));
    // dedos: nudillos de los dedos doblados en el borde de la palma (la mano deja de ser una bola)
    if (c.dedos) { mano.add(mesh(rbox(0.11, 0.06, 0.05, 0.022), M.piel, 0, -0.095, 0.012)); for (const k of [-1, 0, 1]) mano.add(mesh(G.esferaLow, M.pielSombra ?? M.piel, k * 0.028, -0.096, 0.038, 0.004, 0.024, 0.004)); }
    return { s, hombro, bola, sup1, codo, ante, puno, mano, dedo };
  });
  const _d = new THREE.Vector3(), _n = new THREE.Vector3(), _u = new THREE.Vector3(), _e = new THREE.Vector3(), _f = new THREE.Vector3(), _abajo = new THREE.Vector3(0, -1, 0), _q = new THREE.Quaternion();
  function hueso(m, a, dir, largo, radio, radio2 = radio) { m.position.copy(a); m.quaternion.setFromUnitVectors(_abajo, dir); m.scale.set(radio, largo, radio2); }
  function ponerBrazo(b, objetivo, polo, dedo) {
    const S = b.hombro;
    _d.set(objetivo[0], objetivo[1], objetivo[2]).sub(S);
    let d = _d.length(); const dir = _d.clone().normalize();
    d = cl(d, 0.08, L1 + L2 - 0.004);
    const cosA = cl((L1 * L1 + d * d - L2 * L2) / (2 * L1 * d), -1, 1), A = Math.acos(cosA);
    // el codo sale hacia el polo (por defecto: atrás, abajo y hacia afuera)
    const pol = polo ? new THREE.Vector3(...polo) : new THREE.Vector3(b.s * 0.5, -0.6, -0.8);
    _n.crossVectors(dir, pol).normalize();
    if (_n.lengthSq() < 1e-6) _n.set(1, 0, 0);
    _u.copy(dir).applyAxisAngle(_n, A);
    // elegir el lado del codo que más se acerca al polo
    const alt = dir.clone().applyAxisAngle(_n, -A);
    if (alt.dot(pol) > _u.dot(pol)) _u.copy(alt);
    _e.copy(S).addScaledVector(_u, L1);
    const T = S.clone().addScaledVector(dir, d);
    _f.copy(T).sub(_e).normalize();
    hueso(b.sup1, S, _u, L1, RB, RB);
    b.codo.position.copy(_e);
    hueso(b.ante, _e, _f, L2 * 0.98, RB * 0.85, RB * 0.85);
    if (b.puno) { b.puno.position.copy(_e).addScaledVector(_f, L2 * 0.9); b.puno.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), _f); b.puno.scale.setScalar(RB * 0.95); }
    b.mano.position.copy(T);
    b.mano.quaternion.setFromUnitVectors(_abajo, _f);
    b.dedo.visible = dedo > 0.02;
    b.dedo.scale.set(1, cl(dedo), 1);
  }

  // ---- poner una pose ----
  function poner(pose) {
    const p = completar(pose);
    raiz.position.set(p.x, p.y + Math.abs(Math.sin(p.t * 9)) * 0.03 * p.paso, p.z); raiz.rotation.y = p.giro;
    for (const pi of piernas) pi.piv.rotation.x = Math.sin(p.t * 9) * 0.5 * p.paso * pi.s;
    const resp = Math.sin(p.t * 2.1) * 0.012 * p.respira;
    cuerpo.rotation.set(p.inclina, p.torso, p.ladea);
    cuerpo.scale.set(1 + p.aplasta * 0.5, 1 - p.aplasta + resp, 1 + p.aplasta * 0.5);
    cabeza.rotation.set(p.cabeza.asiente, p.cabeza.giro, p.cabeza.ladea, "YXZ");
    cabeza.position.y = 0.54 + resp * 0.5;
    // ojos
    let parp = parpadeo(p.t, c.nombre.length, c.parpadeoCada, c.parpadeoDur);
    // parpadeos puestos a mano (momentos sin hablar en los primeros planos)
    if (c.parpadeosExtra) for (const a of c.parpadeosExtra) { const f = (p.t - a) / (c.parpadeoDur ?? 0.12); if (f >= 0 && f < 1) parp = Math.max(parp, Math.sin(f * Math.PI)); }
    for (const o of ojos) {
      const ab = cl(p.ojos.abiertos * (1 - parp) * (1 - cl(p.ojos.guiño * o.s)));
      o.pup.position.set(p.ojos.x * 0.024, p.ojos.y * 0.026, 0);
      // con el ojo más que medio cerrado el brillo (y después la pupila) asomaban por arriba del párpado
      o.pup.children[1].visible = ab > 0.6; o.pup.children[0].visible = ab > 0.3;
      o.lidPivote.rotation.set(lerp(Math.PI * 0.5, -Math.PI * 0.62, ab), 0, o.s * p.ojos.tension * 0.45);
      o.lidLow.rotation.set(lerp(Math.PI * 0.62, 0.3, cl(p.ojos.feliz)), 0, 0);
      o.blanco.scale.y = 0.076 * (1 - p.ojos.feliz * 0.15);
      if (o.arco) {
        // cerrado (parpadeo, guiño, sorbo): se esconde el ojo entero y queda el arco; abierto: el ojo de siempre
        const cerrado = ab < 0.45;
        o.arco.visible = cerrado;
        for (const m of [o.blanco, o.pup, o.lidPivote, o.lidLow]) m.visible = !cerrado;
        // abierto: el párpado nunca baja más que hasta la mitad (sin medialunas ni bordes dentados)
        if (!cerrado) o.lidPivote.rotation.x = lerp(Math.PI * 0.5, -Math.PI * 0.62, Math.max(ab, 0.62));
      }
    }
    // cejas
    for (const e of cejas) {
      e.piv.position.copy(e.base);
      const alto = p.cejas.alto + (p.cejas.asim * e.s > 0 ? Math.abs(p.cejas.asim) * 0.9 : 0);
      e.piv.position.y += alto * 0.045 - Math.max(0, -p.cejas.ang) * 0.012;
      e.b.rotation.z = e.s * -p.cejas.ang * 0.42 + (c.cejaFina ? -e.s * 0.14 : 0);
    }
    ponerBoca(p.boca.sonrisa, p.boca.abierta, p.boca.ancho);
    for (const r of reflejos) { r.visible = p.reflejo > 0.01; r.material.opacity = 0.9 * cl(p.reflejo); }
    mejillas.forEach((m) => (m.scale.y = 0.045 * (1 + Math.max(0, p.boca.sonrisa) * 0.3)));
    // brazos
    ponerBrazo(brazos[0], p.manoI, p.codoI, p.dedoI);
    ponerBrazo(brazos[1], p.manoD, p.codoD, p.dedoD);
    return p;
  }

  poner({});
  return { raiz, cuerpo, cabeza, poner, cfg: c, CADERA, brazos, mano: (lado) => brazos[lado === "I" ? 0 : 1].mano };
}

// ---------- expresiones listas (se mezclan con mezclar()) ----------
export const CARA = {
  neutra: { ojos: { abiertos: 1, tension: 0, feliz: 0 }, cejas: { alto: 0, ang: 0, asim: 0 }, boca: { sonrisa: 0.1, abierta: 0, ancho: 1 } },
  feliz: { ojos: { abiertos: 0.95, tension: 0, feliz: 0.55 }, cejas: { alto: 0.35, ang: 0.15, asim: 0 }, boca: { sonrisa: 1, abierta: 0.35, ancho: 1.2 } },
  sonrisa: { ojos: { abiertos: 1, feliz: 0.35 }, cejas: { alto: 0.2, ang: 0 }, boca: { sonrisa: 0.85, abierta: 0, ancho: 1.1 } },
  sorpresa: { ojos: { abiertos: 1, tension: 0, feliz: 0 }, cejas: { alto: 1, ang: 0.25, asim: 0 }, boca: { sonrisa: 0, abierta: 0.7, ancho: 0.7 } },
  fastidio: { ojos: { abiertos: 0.5, tension: -0.3, feliz: 0 }, cejas: { alto: -0.4, ang: -0.55, asim: 0 }, boca: { sonrisa: -0.55, abierta: 0, ancho: 0.85 } },
  incredula: { ojos: { abiertos: 0.55, tension: 0, feliz: 0 }, cejas: { alto: 0.1, ang: 0, asim: 0.9 }, boca: { sonrisa: -0.35, abierta: 0, ancho: 0.8 } },
  resignado: { ojos: { abiertos: 0.32, tension: 0.6, feliz: 0 }, cejas: { alto: 0.3, ang: 0.85, asim: 0 }, boca: { sonrisa: -0.75, abierta: 0, ancho: 0.95 } },
  esperanza: { ojos: { abiertos: 1, feliz: 0.2 }, cejas: { alto: 0.6, ang: 0.5 }, boca: { sonrisa: 0.45, abierta: 0, ancho: 0.95 } },
  concentrada: { ojos: { abiertos: 0.7, y: -0.9, tension: 0 }, cejas: { alto: -0.15, ang: 0.15 }, boca: { sonrisa: 0, abierta: 0, ancho: 0.7 } },
};

// ---------- posturas de brazos listas (espacio del cuerpo) ----------
export const BRAZOS = {
  costado: { manoI: [0.29, -0.08, 0.04], manoD: [-0.29, -0.08, 0.04], dedoI: 0, dedoD: 0 }, // casi estirados (con los brazos largos, más arriba quedaban en jarra)
  apoyado: { manoI: [0.3, 0.32, 0.36], manoD: [-0.3, 0.32, 0.36], dedoI: 0, dedoD: 0 }, // manos sobre un mostrador
  celular: { manoI: [0.075, 0.33, 0.3], manoD: [-0.075, 0.33, 0.3], codoI: [0.6, -0.8, -0.3], codoD: [-0.6, -0.8, -0.3], dedoI: 0, dedoD: 0 },
  jarras: { manoI: [0.3, 0.2, -0.02], manoD: [-0.3, 0.2, -0.02], codoI: [1, 0, -0.3], codoD: [-1, 0, -0.3] },
};
// saludo con la mano izquierda (lado +x): ida y vuelta según t
export const saludo = (t, lado = "I", fuerza = 1) => {
  const s = lado === "I" ? 1 : -1, w = Math.sin(t * 15) * 0.1 * fuerza;
  return { [`mano${lado}`]: [s * (0.42 + w * 0.6), 0.88 + Math.abs(w) * 0.25, 0.1 - w * 0.5], [`codo${lado}`]: [s * 1, -0.6, -0.2], [`dedo${lado}`]: 0 };
};
// facepalm con la mano derecha: palma contra la frente/ojos (espacio del cuerpo, cabeza derecha)
export const FACEPALM = { manoD: [-0.01, 0.72, 0.43], codoD: [-0.8, -0.5, 0.1], dedoD: 0, inclina: 0.18, cabeza: { asiente: 0.45 } };


// ---------- pegar algo a la cámara (burbujas, números, carteles) ----------
// Siempre arriba de todo y en la capa 1 (las cámaras de un render target, que ven solo la capa 0, no lo ven).
// OJO: clona los materiales. Antes se ponía depthTest = false directo sobre materiales compartidos (p. ej. el navy
// de la escena) y TODO lo que usaba ese material se dibujaba encima de lo demás (trabajar-con-scalerics, 05-11).
// Uso: pegarACamara(grupo, camera, 30); y acordate de camera.layers.enable(1).
export function pegarACamara(g, camera, orden = 30) {
  g.traverse((o) => {
    o.layers.set(1);
    if (o.isMesh) {
      o.material = Array.isArray(o.material) ? o.material.map((m) => m.clone()) : o.material.clone();
      (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => { m.depthTest = false; m.transparent = true; });
      o.renderOrder = orden + (o.userData.orden || 0);
      o.castShadow = false;
    }
  });
  camera.add(g);
  return g;
}

// ---------- utilería reutilizable ----------
// Mate (calabaza de cuero marrón, virola de metal, yerba y bombilla). Origen en la base; mide ~0.17 de alto.
export function crearMate() {
  const g = new THREE.Group();
  const perfil = [[0, 0], [0.045, 0.004], [0.075, 0.03], [0.085, 0.07], [0.078, 0.11], [0.062, 0.135], [0.058, 0.14]].map(([r, y]) => new THREE.Vector2(r, y));
  g.add(new THREE.Mesh(new THREE.LatheGeometry(perfil, 24), mat(0x6b3f22, 0.55)));
  const virola = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.008, 8, 28), mat(0xc9ccd2, 0.25, { metalness: 0.6 })); virola.rotation.x = Math.PI / 2; virola.position.y = 0.14; g.add(virola);
  const yerba = new THREE.Mesh(new THREE.CylinderGeometry(0.056, 0.056, 0.01, 20), mat(0x6f8a2c, 0.9)); yerba.position.y = 0.136; g.add(yerba);
  const bombilla = new THREE.Group(); bombilla.position.set(0.012, 0.12, 0); bombilla.rotation.z = -0.32; g.add(bombilla);
  const metal = mat(0xd5d8de, 0.2, { metalness: 0.7 });
  const tubo = new THREE.Mesh(new THREE.CylinderGeometry(0.0065, 0.0065, 0.2, 8), metal); tubo.position.y = 0.09; bombilla.add(tubo);
  const pico = new THREE.Mesh(new THREE.CylinderGeometry(0.009, 0.0065, 0.03, 8), metal); pico.position.y = 0.2; pico.rotation.z = 0.5; bombilla.add(pico);
  g.userData.punta = new THREE.Vector3(-0.045, 0.31, 0); // dónde va la boca al tomar (aprox., en el espacio del mate)
  g.traverse((o) => { if (o.isMesh) o.castShadow = true; });
  return g;
}
// Termo genérico (cuerpo crema, tapa y pico navy). Origen en la base; ~0.36 de alto.
export function crearTermo(cuerpo = MARCA.cr, detalle = MARCA.navy2) {
  const g = new THREE.Group();
  const c = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.3, 24), mat(cuerpo, 0.4)); c.position.y = 0.15; g.add(c);
  const banda = new THREE.Mesh(new THREE.CylinderGeometry(0.057, 0.057, 0.03, 24), mat(MARCA.g, 0.45)); banda.position.y = 0.2; g.add(banda);
  const hombro = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.055, 0.03, 24), mat(detalle, 0.45)); hombro.position.y = 0.315; g.add(hombro);
  const pico = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.03, 0.05, 16), mat(detalle, 0.45)); pico.position.y = 0.355; g.add(pico);
  const asa = new THREE.Mesh(new THREE.TorusGeometry(0.045, 0.011, 8, 16, Math.PI), mat(detalle, 0.45)); asa.position.set(-0.07, 0.17, 0); asa.rotation.z = Math.PI / 2; g.add(asa);
  g.traverse((o) => { if (o.isMesh) o.castShadow = true; });
  return g;
}

// variantes de Sofi que se probaron (05-11): A coleta alta, B coleta baja al costado (la elegida: la coleta se ve de frente), C media cola
// variantes de Gonzalo que se probaron contra la referencia (GONZALOTEST=1 node gen.mjs)
export const GONZALO_VARIANTES = {
  A: ELENCO.gonzalo,
  B: { ...ELENCO.gonzalo, barbaOpacidad: 0.7, barbaLarga: 0.8 },
  C: { ...ELENCO.gonzalo, barbaOpacidad: 0.35, barbaLarga: 0.3 },
};
export const SOFI_VARIANTES = {
  A: { ...ELENCO.sofi, peinado: "coletaAlta", camisa: MARCA.navy3, cuello: MARCA.g, franja: MARCA.g, pelo: 0x6b4429 },
  B: ELENCO.sofi,
  C: { ...ELENCO.sofi, peinado: "mediaCola", camisa: MARCA.cr, cuello: MARCA.g, franja: MARCA.g, pelo: 0x2e2220 },
};

// ---------- lo-mismo-que-la-otra-vez (08-11): poses nuevas ----------
// pensar: la mano derecha al mentón con el índice apoyado debajo (sin entrar en la cara)
BRAZOS.piensa = { manoD: [-0.03, 0.53, 0.33], codoD: [-0.5, -1, 0.1], dedoD: 0 }; // el puño bajo el mentón (con dedos: true se ven los nudillos)
// ofrecer: las dos manos adelante, a la altura del pecho, sosteniendo algo de `ancho` (el objeto va entre las manos:
// en la escena se pone en el punto medio de las dos manos, en espacio mundo)
BRAZOS.ofrece = (ancho = 0.3, alto = 0.4, adelante = 0.44) => ({ manoI: [ancho / 2 + 0.03, alto, adelante], manoD: [-ancho / 2 - 0.03, alto, adelante], codoI: [0.8, -0.8, -0.2], codoD: [-0.8, -0.8, -0.2], dedoI: 0, dedoD: 0 });
// el índice izquierdo arriba ("¡ya sé!"): con dedos: false se usa el dedo de señalar del módulo
export const INDICE = { manoI: [0.42, 0.72, 0.3], codoI: [1, -0.5, -0.1], dedoI: 1 };
// la frente contra algo que está adelante (la pila): se inclina fuerte, baja la cabeza, manos en el mostrador
export const FRENTE = { inclina: 0.3, cabeza: { giro: 0, asiente: 0.3, ladea: 0.06 }, manoI: [0.34, 0.16, 0.34], manoD: [-0.34, 0.16, 0.34], codoI: [1, -0.4, -0.4], codoD: [-1, -0.4, -0.4], dedoI: 0, dedoD: 0 };
// niega con la cabeza: cuánto sumar a cabeza.giro en t (2 ciclos de ±amp entre t0 y t1, con entrada y salida suaves)
export const niega = (t, t0, t1, amp = 0.35, ciclos = 2) => {
  if (t <= t0 || t >= t1) return 0;
  const u = (t - t0) / (t1 - t0);
  return Math.sin(u * Math.PI * 2 * ciclos) * amp * Math.sin(u * Math.PI);
};

// ---------- utilería del almacén (genérica, sin marcas; rótulos en Lexend). Origen en la base, medidas reales en m ----------
const etiquetaTex = (w, h, dibujo) => {
  const cv = document.createElement("canvas"); cv.width = w; cv.height = h; const x = cv.getContext("2d");
  dibujo(x, w, h);
  const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t;
};
const LX = (peso, px) => `${peso} ${px}px "Lexend", sans-serif`;
const ajustar = (x, txt, peso, px, ancho) => { let s = px; x.font = LX(peso, s); while (x.measureText(txt).width > ancho && s > 10) { s -= 2; x.font = LX(peso, s); } return s; };
const sombra = (g) => { g.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } }); return g; };
const caras = (lado, frente, atras = lado) => [lado, lado, lado, lado, frente, atras]; // RoundedBox: [+x, -x, +y, -y, +z, -z]

// Paquete de yerba de 1 kg: ladrillo de papel vertical con el fuelle de arriba doblado hacia adelante.
export function crearYerba() {
  const g = new THREE.Group();
  const W = 0.16, H = 0.26, D = 0.09;
  const papel = mat(0xefeee5, 0.92);
  const frente = etiquetaTex(512, 832, (x, w, h) => {
    x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h);
    x.fillStyle = "#c7655b"; x.fillRect(0, 0, w, 150); x.fillRect(0, h - 90, w, 90);
    // hoja de yerba
    x.save(); x.translate(w / 2, 400); x.rotate(-0.5); x.fillStyle = "#4f7a2a"; x.beginPath(); x.ellipse(0, 0, 70, 150, 0, 0, Math.PI * 2); x.fill();
    x.strokeStyle = "#efeee5"; x.lineWidth = 9; x.beginPath(); x.moveTo(0, -140); x.lineTo(0, 150); x.stroke();
    for (const k of [-90, -40, 10, 60]) { x.beginPath(); x.moveTo(0, k); x.lineTo(48, k - 40); x.moveTo(0, k); x.lineTo(-48, k - 40); x.stroke(); }
    x.restore();
    x.fillStyle = "#0b1220"; x.textAlign = "center"; x.textBaseline = "middle";
    ajustar(x, "YERBA", 900, 150, w - 50); x.fillText("YERBA", w / 2, 620);
    ajustar(x, "MATE", 900, 120, w - 80); x.fillText("MATE", w / 2, 730);
    x.fillStyle = "#efeee5"; x.font = LX(800, 70); x.fillText("1 kg", w / 2, 80);
  });
  const fm = new THREE.MeshStandardMaterial({ map: frente, roughness: 0.9 });
  const cuerpo = new THREE.Mesh(rbox(W, H, D, 0.008, 2), caras(papel, fm, fm)); cuerpo.position.y = H / 2; g.add(cuerpo);
  // fuelle: la parte de arriba aplastada y doblada hacia adelante
  const pliegue = new THREE.Mesh(rbox(W * 0.98, 0.07, 0.02, 0.006, 2), [papel, papel, papel, papel, new THREE.MeshStandardMaterial({ color: 0xc7655b, roughness: 0.9 }), papel]);
  pliegue.position.set(0, H + 0.006, D * 0.18); pliegue.rotation.x = 1.25; g.add(pliegue);
  const borde = new THREE.Mesh(rbox(W * 0.98, 0.012, D * 0.7, 0.004, 1), papel); borde.position.set(0, H + 0.004, -D * 0.12); g.add(borde);
  g.userData.tam = [W, H + 0.03, D];
  return sombra(g);
}

// Galletitas de agua: paquete tubular de celofán crema, acostado (eje x), las galletitas se marcan en anillos,
// los extremos plisados y retorcidos, banda roja con el nombre.
export function crearGalletitas() {
  const g = new THREE.Group();
  const L = 0.3, R = 0.055;
  const celo = new THREE.MeshPhysicalMaterial({ color: 0xe9e3cf, roughness: 0.32, clearcoat: 0.8, clearcoatRoughness: 0.25, metalness: 0 });
  // perfil con un anillo por galletita
  const pts = [];
  const N = 22, L0 = L * 0.86;
  pts.push(new THREE.Vector2(0.0001, -L0 / 2));
  for (let i = 0; i <= N * 4; i++) { const u = i / (N * 4); pts.push(new THREE.Vector2(R * (0.965 + 0.035 * Math.cos(u * N * Math.PI * 2)), -L0 / 2 + u * L0)); }
  pts.push(new THREE.Vector2(0.0001, L0 / 2));
  const tubo = new THREE.Mesh(new THREE.LatheGeometry(pts, 32), celo); tubo.rotation.z = Math.PI / 2; g.add(tubo);
  // banda roja con el nombre (cilindro abierto un poco más grande, solo al frente)
  // el texto corre a lo largo del tubo (eje v de la textura del cilindro)
  const banda = etiquetaTex(512, 1024, (x, w, h) => {
    x.fillStyle = "#c7655b"; x.fillRect(0, 0, w, h);
    x.save(); x.translate(w / 2, h / 2); x.rotate(Math.PI / 2);
    x.fillStyle = "#efeee5"; x.textAlign = "center"; x.textBaseline = "middle";
    ajustar(x, "GALLETITAS", 900, 150, h * 0.86); x.fillText("GALLETITAS", 0, -60);
    ajustar(x, "DE AGUA", 800, 100, h * 0.6); x.fillText("DE AGUA", 0, 80);
    x.restore();
  });
  const bm = new THREE.MeshStandardMaterial({ map: banda, roughness: 0.45 });
  const b = new THREE.Mesh(new THREE.CylinderGeometry(R * 1.02, R * 1.02, L0 * 0.52, 32, 1, true, -1.25, 2.5), bm);
  b.rotation.set(0, 0, Math.PI / 2); b.rotation.y = 0; g.add(b);
  // la banda mira a +z: CylinderGeometry arranca en +z con thetaStart 0 → con el giro en z queda hacia +z
  // extremos plisados y retorcidos
  for (const s of [-1, 1]) {
    const c = new THREE.Mesh(new THREE.ConeGeometry(R * 0.95, 0.05, 10, 1, true), celo); c.rotation.z = -s * Math.PI / 2; c.position.x = s * (L0 / 2 + 0.022); g.add(c);
    const nudo = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.012, 0.03, 8), celo); nudo.rotation.z = Math.PI / 2; nudo.position.x = s * (L0 / 2 + 0.055); g.add(nudo);
  }
  g.position.y = 0; g.children.forEach((o) => (o.position.y += R));
  g.userData.tam = [L, 2 * R, 2 * R];
  return sombra(g);
}

// Dulce de leche: pote de plástico blanco levemente cónico, tapa navy, etiqueta mostaza.
export function crearDulceDeLeche() {
  const g = new THREE.Group();
  const H = 0.1, R0 = 0.05, R1 = 0.058;
  const blanco = mat(0xf6f5ef, 0.35);
  const pote = new THREE.Mesh(new THREE.CylinderGeometry(R1, R0, H, 32), blanco); pote.position.y = H / 2; g.add(pote);
  const tex = etiquetaTex(1024, 256, (x, w, h) => {
    x.fillStyle = "#d9a441"; x.fillRect(0, 0, w, h);
    x.fillStyle = "#0b1220"; x.textAlign = "center"; x.textBaseline = "middle";
    ajustar(x, "DULCE DE LECHE", 900, 110, w * 0.48); x.fillText("DULCE DE LECHE", w / 2, h / 2 + 4);
  });
  const et = new THREE.Mesh(new THREE.CylinderGeometry(R1 * 0.995 + 0.002, R0 * 1.0 + 0.002 + (R1 - R0) * 0.15, H * 0.62, 32, 1, true), new THREE.MeshStandardMaterial({ map: tex, roughness: 0.5 }));
  et.position.y = H * 0.48; et.rotation.y = -Math.PI / 2; g.add(et);
  const tapa = new THREE.Mesh(new THREE.CylinderGeometry(R1 + 0.005, R1 + 0.005, 0.018, 32), mat(0x16243d, 0.4)); tapa.position.y = H + 0.008; g.add(tapa);
  const aro = new THREE.Mesh(new THREE.TorusGeometry(R1 + 0.005, 0.004, 6, 32), mat(0x0b1220, 0.4)); aro.rotation.x = Math.PI / 2; aro.position.y = H + 0.002; g.add(aro);
  g.userData.tam = [2 * R1, H + 0.02, 2 * R1];
  return sombra(g);
}

// Fideos: paquete largo de spaghetti de plástico transparente, los fideos mostaza adentro, etiqueta crema/navy.
export function crearFideos() {
  const g = new THREE.Group();
  const W = 0.08, H = 0.3, D = 0.035;
  const fideosTex = etiquetaTex(128, 512, (x, w, h) => {
    x.fillStyle = "#d9a441"; x.fillRect(0, 0, w, h);
    for (let i = 0; i < 26; i++) { const xx = 3 + i * 4.8; x.fillStyle = i % 2 ? "#e8bb5c" : "#c08b2e"; x.fillRect(xx, 0, 2.2, h); }
  });
  const haz = new THREE.Mesh(rbox(W * 0.9, H * 0.94, D * 0.75, 0.01, 2), new THREE.MeshStandardMaterial({ map: fideosTex, roughness: 0.45 })); haz.position.y = H / 2; g.add(haz);
  const plast = new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.12, transparent: true, opacity: 0.28, clearcoat: 1, depthWrite: false });
  const bolsa = new THREE.Mesh(rbox(W, H, D, 0.012, 2), plast); bolsa.position.y = H / 2; bolsa.renderOrder = 2; g.add(bolsa);
  const tex = etiquetaTex(256, 640, (x, w, h) => {
    x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h);
    x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 120); x.fillRect(0, h - 70, w, 70);
    x.save(); x.translate(w / 2, h / 2 + 30); x.rotate(-Math.PI / 2); x.fillStyle = "#16243d"; x.textAlign = "center"; x.textBaseline = "middle";
    ajustar(x, "SPAGHETTI", 900, 150, h * 0.62); x.fillText("SPAGHETTI", 0, 0); x.restore();
    x.fillStyle = "#efeee5"; x.textAlign = "center"; x.font = LX(800, 54); x.fillText("500 g", w / 2, 80);
  });
  const et = new THREE.Mesh(new THREE.PlaneGeometry(W * 0.92, H * 0.55), new THREE.MeshStandardMaterial({ map: tex, roughness: 0.6 }));
  et.position.set(0, H * 0.52, D / 2 + 0.002); g.add(et);
  const cierre = new THREE.Mesh(rbox(W * 1.02, 0.014, D * 0.5, 0.004, 1), mat(0xdedcd2, 0.4)); cierre.position.y = H - 0.005; g.add(cierre);
  g.userData.tam = [W, H, D];
  return sombra(g);
}

// Maple de huevos: maple de cartón gris crema de 12 (3 x 4) con sus cúpulas y 12 huevos crema marrón claro.
export function crearMaple() {
  const g = new THREE.Group();
  const carton = mat(0xbdb6a3, 0.95), huevo = mat(0xe7cfa8, 0.55);
  const P = 0.058, NX = 4, NZ = 3;
  const W = NX * P + 0.02, D = NZ * P + 0.02;
  const base = new THREE.Mesh(rbox(W, 0.03, D, 0.008, 2), carton); base.position.y = 0.015; g.add(base);
  const copa = new THREE.SphereGeometry(0.028, 14, 8, 0, Math.PI * 2, Math.PI * 0.45, Math.PI * 0.55);
  const ovo = new THREE.SphereGeometry(1, 18, 14);
  for (let i = 0; i < NX; i++) for (let k = 0; k < NZ; k++) {
    const x = (i - (NX - 1) / 2) * P, z = (k - (NZ - 1) / 2) * P;
    const c = new THREE.Mesh(copa, carton); c.position.set(x, 0.05, z); c.scale.set(1, 1.2, 1); g.add(c);
    const h = new THREE.Mesh(ovo, huevo); h.scale.set(0.022, 0.03, 0.022); h.position.set(x, 0.058, z); g.add(h);
  }
  // los conitos del medio (separadores) de cartón
  for (let i = 0; i < NX - 1; i++) for (let k = 0; k < NZ - 1; k++) { const s = new THREE.Mesh(new THREE.ConeGeometry(0.012, 0.05, 8), carton); s.position.set((i - (NX - 2) / 2) * P, 0.05, (k - (NZ - 2) / 2) * P); g.add(s); }
  g.userData.tam = [W, 0.09, D];
  return sombra(g);
}

// Jabón en pan verde, translúcido y brillante, con un envoltorio de papel crema a medio abrir.
export function crearJabonPan() {
  const g = new THREE.Group();
  const W = 0.1, H = 0.05, D = 0.06;
  const jab = new THREE.MeshPhysicalMaterial({ color: 0x5ce611, roughness: 0.18, clearcoat: 1, clearcoatRoughness: 0.1, emissive: 0x2c7a06, emissiveIntensity: 0.25, transparent: true, opacity: 0.93 });
  const b = new THREE.Mesh(rbox(W, H, D, 0.012, 3), jab); b.position.y = H / 2; g.add(b);
  // envoltorio: cubre la mitad izquierda, con la solapa levantada
  const pap = mat(0xefeee5, 0.85);
  const env = new THREE.Mesh(rbox(W * 0.52, H * 1.06, D * 1.06, 0.006, 2), pap); env.position.set(-W * 0.26, H / 2, 0); g.add(env);
  const tex = etiquetaTex(256, 128, (x, w, h) => { x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h); x.fillStyle = "#3fa60a"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "JABÓN", 900, 70, w * 0.85); x.fillText("JABÓN", w / 2, h / 2); });
  const et = new THREE.Mesh(new THREE.PlaneGeometry(W * 0.48, H * 0.7), new THREE.MeshStandardMaterial({ map: tex, roughness: 0.8 })); et.position.set(-W * 0.26, H / 2, D * 0.535); g.add(et);
  g.userData.tam = [W, H, D];
  return sombra(g);
}

// Lavandina: botella blanca de 2 L con manija, tapa roja apagada y etiqueta.
export function crearLavandina() {
  const g = new THREE.Group();
  const blanco = mat(0xf7f7f2, 0.32);
  const perfil = [[0, 0], [0.055, 0.002], [0.062, 0.02], [0.062, 0.2], [0.055, 0.24], [0.03, 0.27], [0.02, 0.285], [0, 0.285]].map(([r, y]) => new THREE.Vector2(r, y));
  const cuerpo = new THREE.Mesh(new THREE.LatheGeometry(perfil, 28), blanco); cuerpo.scale.z = 0.72; g.add(cuerpo);
  const manija = new THREE.Mesh(new THREE.TorusGeometry(0.038, 0.012, 8, 18, Math.PI * 1.1), blanco); manija.position.set(-0.046, 0.215, 0); manija.rotation.z = Math.PI * 0.35; g.add(manija);
  const tapa = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.024, 0.03, 18), mat(0xc7655b, 0.45)); tapa.position.y = 0.298; g.add(tapa);
  const tex = etiquetaTex(512, 384, (x, w, h) => {
    x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h); x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 70); x.fillRect(0, h - 50, w, 50);
    x.fillStyle = "#16243d"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "LAVANDINA", 900, 110, w * 0.88); x.fillText("LAVANDINA", w / 2, h / 2 - 10);
    x.font = LX(800, 70); x.fillText("2 L", w / 2, h / 2 + 90);
  });
  const et = new THREE.Mesh(new THREE.CylinderGeometry(0.0635, 0.0635, 0.12, 28, 1, true, -0.9, 1.8), new THREE.MeshStandardMaterial({ map: tex, roughness: 0.5 }));
  et.scale.z = 0.72; et.position.y = 0.11; g.add(et);
  g.userData.tam = [0.124, 0.31, 0.09];
  return sombra(g);
}

// Esponja: bloque mostaza con la cara de fibra verde oscura arriba.
export function crearEsponja() {
  const g = new THREE.Group();
  const W = 0.1, H = 0.035, D = 0.068;
  const am = mat(0xd9a441, 0.95), fib = mat(0x2f5a22, 1);
  const a = new THREE.Mesh(rbox(W, H, D, 0.008, 2), am); a.position.y = H / 2; g.add(a);
  const f = new THREE.Mesh(rbox(W, 0.012, D, 0.004, 1), fib); f.position.y = H + 0.006; g.add(f);
  g.userData.tam = [W, H + 0.012, D];
  return sombra(g);
}

// Bolsa de papel madera abierta arriba, con la boca doblada hacia afuera (las cosas asoman).
export function crearBolsaPapel() {
  const g = new THREE.Group();
  const W = 0.24, H = 0.28, D = 0.15, e = 0.006;
  const kraft = mat(0xc49a63, 0.95), kraftIn = mat(0x9c7442, 0.95, { side: THREE.DoubleSide });
  const pared = (w, h, d, x, y, z) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), kraft); m.position.set(x, y, z); g.add(m); return m; };
  pared(W, e, D, 0, e / 2, 0);
  pared(W, H, e, 0, H / 2, D / 2); pared(W, H, e, 0, H / 2, -D / 2);
  pared(e, H, D, W / 2, H / 2, 0); pared(e, H, D, -W / 2, H / 2, 0);
  const inside = new THREE.Mesh(new THREE.PlaneGeometry(W - 0.01, H - 0.02), kraftIn); inside.position.set(0, H / 2, -D / 2 + 0.005); g.add(inside);
  // la boca doblada: un marco un poco más ancho
  for (const [w, d, x, z] of [[W + 0.012, 0.012, 0, D / 2 + 0.004], [W + 0.012, 0.012, 0, -D / 2 - 0.004], [0.012, D + 0.02, W / 2 + 0.004, 0], [0.012, D + 0.02, -W / 2 - 0.004, 0]]) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, 0.04, d), kraft); m.position.set(x, H - 0.02, z); g.add(m);
  }
  // pliegues verticales del frente (líneas más oscuras)
  for (const s of [-1, 1]) { const l = new THREE.Mesh(new THREE.BoxGeometry(0.004, H * 0.9, 0.002), mat(0xa27a46, 0.95)); l.position.set(s * W * 0.32, H * 0.47, D / 2 + 0.004); g.add(l); }
  g.userData.tam = [W, H, D];
  return sombra(g);
}

// Tablet en un atril: marco navy oscuro con bordes redondeados y la pantalla con la textura que se le pase
// (un CanvasTexture que la escena redibuja). La pantalla mira a +z y el atril la inclina hacia atrás.
export function crearTablet(textura, W = 0.26, H = 0.18, incl = 0.42) {
  const g = new THREE.Group();
  const marco = mat(0x0b1220, 0.35);
  const pivote = new THREE.Group(); pivote.position.set(0, 0.03, 0); pivote.rotation.x = -incl; g.add(pivote);
  const cuerpo = new THREE.Mesh(rbox(W, H, 0.012, 0.014, 3), marco); cuerpo.position.y = H / 2; pivote.add(cuerpo);
  const pant = new THREE.Mesh(new THREE.PlaneGeometry(W * 0.92, H * 0.88), new THREE.MeshStandardMaterial({ map: textura, emissive: 0xffffff, emissiveMap: textura, emissiveIntensity: 0.55, roughness: 0.25 }));
  pant.position.set(0, H / 2, 0.0065); pivote.add(pant);
  const atril = mat(0x2c4268, 0.5);
  const pata = new THREE.Mesh(rbox(W * 0.5, 0.012, 0.16, 0.005, 1), atril); pata.position.set(0, 0.006, -0.02); g.add(pata);
  // el apoyo de atrás sostiene la tablet a la inclinación pedida (incl en rad desde la vertical)
  const ha = Math.max(0.03, H * 0.55 * Math.cos(incl)), apoyo = new THREE.Mesh(rbox(W * 0.4, ha, 0.012, 0.005, 1), atril); apoyo.position.set(0, ha / 2, -H * 0.55 * Math.sin(incl) + 0.01); apoyo.rotation.x = -0.15; g.add(apoyo);
  const tope = new THREE.Mesh(rbox(W * 0.9, 0.02, 0.025, 0.006, 1), atril); tope.position.set(0, 0.012, 0.02); g.add(tope);
  g.userData.pantalla = pant; g.userData.pivote = pivote; g.userData.tam = [W, H];
  return sombra(g);
}
