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
};

// valores neutros para lo que un personaje no define (sin bigote, sin lentes, sin delantal...)
export const DEFECTO = { nombre: "Alguien", piel: PIEL.media, pelo: PELO.castaño, peinado: "corto", cejasColor: 0x3a2f2a,
  camisa: MARCA.cr, mangas: "cortas", pantalon: 0x3a3f4a, zapatos: 0x2a2220, panza: 1.0, nariz: 0.058, mejillas: 0xe08a7a, alto: 1.0,
  bigote: null, lentes: null, delantal: null, delantalBorde: null, pollera: null, cuello: null, labios: null, aros: null };

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
export function parpadeo(t, semilla = 1, cada = 3.1) {
  const fase = (t + semilla * 1.37) % cada;
  const d = 0.16;
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
    blanco: mat(0xffffff, 0.25), pupila: mat(0x111722, 0.18), boca: mat(0x3a1b20, 0.6), lengua: mat(0xd8737a, 0.5),
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
  const perfil = [[0, -0.02], [0.2 * P, 0.0], [0.235 * P, 0.1], [0.235 * P, 0.22], [0.215, 0.36], [0.19, 0.44], [0.12, 0.5], [0, 0.515]].map(([r, y]) => new THREE.Vector2(r, y));
  const torsoGeo = new THREE.LatheGeometry(perfil, 28);
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
    const cu = mesh(new THREE.TorusGeometry(0.1, 0.03, 8, 24), mat(c.cuello, 0.6), 0, 0.5, 0.01); cu.rotation.x = Math.PI / 2 - 0.15; cuerpo.add(cu);
    for (const b of [0.36, 0.26, 0.16]) cuerpo.add(mesh(G.esferaLow, mat(c.cuello, 0.4), 0, b, 0.2 * P + 0.012 - (b - 0.16) * 0.06, 0.018));
  }
  const cuello = mesh(G.cil, M.piel, 0, 0.58, 0, 0.065, 0.1, 0.065); cuerpo.add(cuello);

  // ---- cabeza (pivote en el cuello) ----
  const R = 0.3;
  const cabeza = new THREE.Group(); cabeza.position.set(0, 0.54, 0); cuerpo.add(cabeza);
  const CC = R * 0.92; // centro del cráneo sobre el pivote
  const craneo = mesh(G.esfera, M.piel, 0, CC, 0, R, R * 0.97, R * 0.95); cabeza.add(craneo);
  // punto sobre la superficie: az (rad, + a la izquierda del personaje = +x), el (rad, + arriba)
  const sup = (az, el, k = 1) => new THREE.Vector3(R * k * Math.sin(az) * Math.cos(el), CC + R * 0.97 * k * Math.sin(el), R * 0.95 * k * Math.cos(az) * Math.cos(el));
  const mirarAfuera = (o, az, el) => { const n = sup(az, el, 2); o.lookAt(n.x, n.y, n.z); };
  const sobre = (o, az, el, k = 1) => { const p = sup(az, el, k); o.position.copy(p); mirarAfuera(o, az, el); return o; };

  // orejas, nariz, mejillas
  for (const s of [-1, 1]) { const o = mesh(G.esferaLow, M.piel, 0, 0, 0, 0.05, 0.075, 0.035); sobre(o, s * 1.5, -0.05, 0.98); cabeza.add(o); }
  const nariz = mesh(G.esfera, M.pielSombra, 0, 0, 0, c.nariz ?? 0.06, (c.nariz ?? 0.06) * 0.9, (c.nariz ?? 0.06) * 0.85); sobre(nariz, 0, -0.1, 1.0); cabeza.add(nariz);
  const mejillas = [-1, 1].map((s) => { const m = mesh(G.esferaLow, M.mejilla, 0, 0, 0, 0.065, 0.045, 0.012); sobre(m, s * 0.55, -0.24, 1.0); cabeza.add(m); return m; });

  // ojos: blanco + pupila + brillo, con párpado superior que rota (abre/cierra) y se inclina (humor)
  const ojos = [-1, 1].map((s) => {
    const g = new THREE.Group(); sobre(g, s * 0.34, 0.06, 0.9); cabeza.add(g);
    const blanco = mesh(G.esfera, M.blanco, 0, 0, 0, 0.068, 0.076, 0.05); g.add(blanco);
    const pup = new THREE.Group(); g.add(pup);
    pup.add(mesh(G.esfera, M.pupila, 0, 0, 0.034, 0.036, 0.042, 0.022));
    pup.add(mesh(G.esferaLow, M.blanco, 0.012, 0.016, 0.052, 0.011));
    const lidPivote = new THREE.Group(); g.add(lidPivote);
    const lid = mesh(G.parpado, M.piel, 0, 0, 0, 0.074, 0.082, 0.058); lidPivote.add(lid);
    const lidLow = new THREE.Group(); g.add(lidLow);
    const lidLowM = mesh(G.parpado, M.piel, 0, 0, 0, 0.073, 0.08, 0.057); lidLowM.rotation.z = Math.PI; lidLow.add(lidLowM);
    return { g, blanco, pup, lidPivote, lid, lidLow, s };
  });
  // cejas
  const cejas = [-1, 1].map((s) => {
    const piv = new THREE.Group(); sobre(piv, s * 0.34, 0.33, 1.0); cabeza.add(piv);
    const b = mesh(rbox(0.13, 0.034, 0.03, 0.014), M.cejas); piv.add(b);
    return { piv, b, s, base: piv.position.clone() };
  });
  // boca: curva de tubo (se rehace si cambia) + interior oscuro cuando se abre
  const bocaG = new THREE.Group(); sobre(bocaG, 0, -0.34, 0.985); cabeza.add(bocaG);
  const bocaLinea = new THREE.Mesh(new THREE.BufferGeometry(), c.labios ? M.labio : M.boca); bocaG.add(bocaLinea);
  const bocaAbierta = mesh(G.esfera, M.boca, 0, 0, 0.0, 0.07, 0.04, 0.02); bocaG.add(bocaAbierta);
  const lengua = mesh(G.esferaLow, M.lengua, 0, -0.012, 0.008, 0.04, 0.016, 0.014); bocaG.add(lengua);
  let bocaClave = "";
  function ponerBoca(sonrisa, abierta, ancho) {
    const w = 0.075 * ancho, k = sonrisa * 0.045;
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
    bocaAbierta.position.y = -ab * 0.028 - sonrisa * 0.008;
    lengua.position.y = bocaAbierta.position.y - ab * 0.022;
    lengua.scale.set(w * 0.5, 0.012 + ab * 0.01, 0.014);
  }

  // pelo
  if (c.peinado === "pelado") {
    const corona = mesh(new THREE.SphereGeometry(1, 32, 16, Math.PI * 0.93, Math.PI * 1.14, Math.PI * 0.34, Math.PI * 0.3), M.pelo, 0, CC, 0, R * 1.035, R * 1.0, R * 0.985);
    cabeza.add(corona);
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
  } else if (c.peinado === "rodete") {
    cabeza.add(mesh(new THREE.SphereGeometry(1, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.45), M.pelo, 0, CC + 0.005, -0.008, R * 1.04, R * 1.02, R * 1.02));
    cabeza.add(mesh(G.esfera, M.pelo, 0, CC + R * 0.95, -R * 0.45, 0.13));
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
    const puente = mesh(G.cil, lm, 0, 0, 0, 0.011, 0.07, 0.011); sobre(puente, 0, 0.08, 1.11); puente.rotation.z = Math.PI / 2; puente.position.x += 0.035; cabeza.add(puente);
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
    const dedo = new THREE.Group(); dedo.position.set(0, -0.1, 0.01); mano.add(dedo);
    dedo.add(mesh(G.cil, M.piel, 0, 0, 0, 0.024, 0.12, 0.024));
    dedo.add(mesh(G.esferaLow, M.piel, 0, -0.12, 0, 0.024));
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
    const parp = parpadeo(p.t, c.nombre.length);
    for (const o of ojos) {
      const ab = cl(p.ojos.abiertos * (1 - parp) * (1 - cl(p.ojos.guiño * o.s)));
      o.pup.position.set(p.ojos.x * 0.024, p.ojos.y * 0.026, 0);
      o.lidPivote.rotation.set(lerp(Math.PI * 0.5, -Math.PI * 0.62, ab), 0, o.s * p.ojos.tension * 0.45);
      o.lidLow.rotation.set(lerp(Math.PI * 0.62, 0.3, cl(p.ojos.feliz)), 0, 0);
      o.blanco.scale.y = 0.076 * (1 - p.ojos.feliz * 0.15);
    }
    // cejas
    for (const e of cejas) {
      e.piv.position.copy(e.base);
      const alto = p.cejas.alto + (p.cejas.asim * e.s > 0 ? Math.abs(p.cejas.asim) * 0.9 : 0);
      e.piv.position.y += alto * 0.045 - Math.max(0, -p.cejas.ang) * 0.012;
      e.b.rotation.z = e.s * -p.cejas.ang * 0.42;
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
