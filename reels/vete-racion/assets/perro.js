// Perros 3D de Scalerics (veterinaria-vacunas, 17-11): el mismo lenguaje de juguete de personajes.js (formas
// redondeadas, color plano, ojos grandes con brillo). Todo es función pura de los parámetros: nada de azar ni relojes.
//
//   import { crearPerro, PERROS } from "./perro.js";
//   const toto = crearPerro(PERROS.toto); scene.add(toto.raiz);
//   toto.poner({ x: 0, z: 0, giro: 0, sentado: 1, cola: 0.8, orejas: 0.2, cabeza: { giro: 0.3 }, t });
//
// Coordenadas del perro: patas en y = 0, mira hacia +z, su izquierda es +x (como los personajes). Parado, la cruz
// queda a ~0,45 u; sentado, la cabeza llega a ~0,9 u (la cintura de un personaje).
// Pose (todo opcional):
//   x, y, z, giro                     posición y giro del perro entero
//   sentado, erguido, echado          0..1 (se mezclan en ese orden): sentado sobre las ancas; parado en dos patas;
//                                     echado (acostado con la cabeza levantada)
//   paso, pasoVel                     0..1 camina en el lugar (la fase es t); mover x/z aparte
//   cola                              0..1 cuánto (amplitud y frecuencia) bate la cola; colaAlta 0 metida..1 arriba
//   orejas                            0 gachas..1 alertas (la caída sigue caída, pero se mueve)
//   cabeza: { giro, asiente, ladea }  yaw, pitch (+ baja), roll (el ladeo de perro)
//   baja                              0..1 la cabeza baja hasta el piso (comer, empujar el plato); vete-racion
//   cejas                             -1 tristes (la punta de adentro arriba)..+1 sorprendidas
//   ojos: { x, y, abiertos }          mirada -1..1, párpado 0..1
//   pata                              0..1 levanta la pata delantera DERECHA hacia adelante (dar la pata)
//   pataA: [x, y, z]                  (opcional) dónde va la pata derecha cuando pata = 1, en el espacio del perro
//   apoyo: [x, y, z]                  (opcional) dónde apoya la pata izquierda cuando está erguido
//   jadeo                             0..1 boca abierta con la lengua afuera (contento)
//   t                                 tiempo (cola, respiración, paso)
import * as THREE from "./vendor/three/three.module.js";

const cl = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const lerp = (a, b, u) => a + (b - a) * u;
const mat = (color, rough = 0.7, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0, ...extra });

export const PERROS = {
  // Toto: mestizo mediano caramelo, hocico, pecho, medias y punta de la cola crema; oreja derecha parada, izquierda caída
  toto: { color: 0xc8894a, claro: 0xefe6d6, oscuro: 0x9a6232, orejaD: "parada", orejaI: "caida", escala: 1, collar: 0x0b1220, chapita: 0xefeee5, mancha: true },
  // Coco: perro chico blanco, las dos orejas paradas
  coco: { color: 0xf4f1e8, claro: 0xffffff, oscuro: 0xd9d2c2, orejaD: "parada", orejaI: "parada", escala: 0.62, collar: 0x5ce611, chapita: 0xefeee5, mancha: false },
  // Mora: cachorra negra (en brazos), las dos orejas caídas
  mora: { color: 0x2a2624, claro: 0x4a4440, oscuro: 0x1a1716, orejaD: "caida", orejaI: "caida", escala: 0.5, collar: 0xc7655b, chapita: 0xefeee5, mancha: false, cachorro: true },
};

const G = {
  esf: new THREE.SphereGeometry(1, 28, 20),
  esfL: new THREE.SphereGeometry(1, 16, 12),
  cil: (() => { const g = new THREE.CylinderGeometry(1, 1, 1, 14, 1); g.translate(0, 0.5, 0); return g; })(),   // de 0 a 1 en y
};
const _up = new THREE.Vector3(0, 1, 0), _d = new THREE.Vector3();
// pone un cilindro (G.cil) entre dos puntos, con radio r
function entre(m, a, b, r) {
  _d.copy(b).sub(a); const L = Math.max(1e-4, _d.length());
  m.position.copy(a); m.quaternion.setFromUnitVectors(_up, _d.normalize()); m.scale.set(r, L, r);
}
// rota (y, z) en x por el ángulo a (positivo levanta la punta delantera)
const rotX = (y, z, a) => [y * Math.cos(a) + z * Math.sin(a), z * Math.cos(a) - y * Math.sin(a)];

export function crearPerro(cfg) {
  const c = { ...PERROS.toto, ...cfg };
  const raiz = new THREE.Group();
  const esc = new THREE.Group(); esc.scale.setScalar(c.escala); raiz.add(esc);
  const M = {
    pelo: mat(c.color, 0.78), claro: mat(c.claro, 0.8), oscuro: mat(c.oscuro, 0.78),
    nariz: mat(0x141010, 0.22), ojo: mat(0x2a160c, 0.15), brillo: new THREE.MeshBasicMaterial({ color: 0xffffff }),
    boca: mat(0x3a1b20, 0.6), lengua: mat(0xe0737e, 0.45), collar: mat(c.collar, 0.5), chapita: mat(c.chapita, 0.35, { metalness: 0.15 }),
    panuelo: mat(0xc7655b, 0.75), oreja: mat(0xd99a86, 0.75), curita: mat(0xefeee5, 0.8),
  };
  const mesh = (g, m, x = 0, y = 0, z = 0, sx = 1, sy = sx, sz = sx) => { const o = new THREE.Mesh(g, m); o.position.set(x, y, z); o.scale.set(sx, sy, sz); o.castShadow = true; return o; };
  const K = c.cachorro ? { cab: 1.18, cuerpo: 0.85 } : { cab: 1, cuerpo: 1 };

  // ---- el torso (pivote en la cadera) ----
  const torso = new THREE.Group(); esc.add(torso);
  const tc = K.cuerpo;
  torso.add(mesh(G.esf, M.pelo, 0, 0.03, 0.21, 0.165 * tc, 0.155 * tc, 0.3 * tc));          // el cuerpo
  torso.add(mesh(G.esf, M.claro, 0, -0.01, 0.37 * tc, 0.12 * tc, 0.13 * tc, 0.09 * tc));    // el pecho crema
  torso.add(mesh(G.esf, M.claro, 0, -0.07, 0.2, 0.11 * tc, 0.07 * tc, 0.22 * tc));          // la panza crema
  if (c.mancha) torso.add(mesh(G.esf, M.oscuro, 0.06, 0.13, 0.12, 0.09, 0.05, 0.12));       // una mancha más oscura en el lomo
  // la curita en el lomo (recién vacunado): un rectángulo crema con las dos puntas
  const curita = new THREE.Group(); curita.position.set(-0.05, 0.175 * tc, 0.24); curita.rotation.set(-0.08, 0, 0.32); torso.add(curita);
  curita.add(mesh(new THREE.BoxGeometry(0.12, 0.012, 0.045), M.curita)); curita.add(mesh(new THREE.BoxGeometry(0.035, 0.016, 0.04), mat(0xd9cdb8, 0.8)));
  // la cola: 5 tramos encadenados desde la base (arriba y atrás de la cadera), la punta crema
  const colaBase = new THREE.Group(); colaBase.position.set(0, 0.11, -0.06); torso.add(colaBase);
  const cola = []; let padre = colaBase;
  for (let i = 0; i < 5; i++) {
    const g = new THREE.Group(); g.position.set(0, i === 0 ? 0 : 0.055, 0); padre.add(g);
    const r = 0.032 - i * 0.003;
    g.add(mesh(new THREE.CapsuleGeometry(1, 1.3, 4, 12), i >= 4 ? M.claro : M.pelo, 0, 0.03, 0, r, 0.032, r));
    cola.push(g); padre = g;
  }

  // ---- las patas: delanteras (hombro → pata, un cilindro y la pata crema); traseras (muslo + caña + pata) ----
  const patasD = [-1, 1].map((s) => {
    const caña = mesh(G.cil, M.pelo); esc.add(caña);
    const media = mesh(G.cil, M.claro); esc.add(media);
    const pie = mesh(G.esf, M.claro, 0, 0, 0, 0.05, 0.035, 0.068); esc.add(pie);
    const deditos = [-1, 0, 1].map((k) => { const d = mesh(G.esfL, M.claro, 0, 0, 0, 0.02, 0.02, 0.022); esc.add(d); return [d, k]; });
    return { s, caña, media, pie, deditos };
  });
  const patasT = [-1, 1].map((s) => {
    const muslo = mesh(G.esf, M.pelo); esc.add(muslo);
    const caña = mesh(G.cil, M.pelo); esc.add(caña);
    const pie = mesh(G.esf, M.claro, 0, 0, 0, 0.05, 0.035, 0.075); esc.add(pie);
    return { s, muslo, caña, pie };
  });
  // el cuello
  const cuello = mesh(G.cil, M.pelo); esc.add(cuello);
  const cuelloCr = mesh(G.cil, M.claro); esc.add(cuelloCr);

  // ---- la cabeza (centro del cráneo en el origen del grupo; mira a +z) ----
  const cabeza = new THREE.Group(); esc.add(cabeza);
  const hk = new THREE.Group(); hk.scale.setScalar(K.cab); cabeza.add(hk);
  hk.add(mesh(G.esf, M.pelo, 0, 0, 0, 0.16, 0.148, 0.152));                       // el cráneo
  hk.add(mesh(G.esf, M.pelo, 0, -0.035, 0.03, 0.15, 0.12, 0.14));                 // los cachetes (la cara más ancha abajo)
  { const fr = mesh(G.esf, M.claro, 0, 0.075, 0.118, 0.024, 0.07, 0.03); fr.rotation.x = -0.6; hk.add(fr); }   // la franja crema de la frente
  // el hocico: arriba caramelo (el puente), abajo crema, la nariz negra brillante en la punta
  const hoc = new THREE.Group(); hoc.position.set(0, -0.04, 0.115); hk.add(hoc);
  hoc.add(mesh(G.esf, M.claro, 0, -0.005, 0.03, 0.092, 0.07, 0.092));
  hoc.add(mesh(G.esf, M.claro, 0, 0.028, 0.055, 0.055, 0.045, 0.07));
  const nariz = mesh(G.esf, M.nariz, 0, 0.035, 0.122, 0.036, 0.026, 0.024); hoc.add(nariz);
  hoc.add(mesh(G.esfL, M.brillo, -0.012, 0.05, 0.138, 0.008, 0.005, 0.004));
  // la boca: la línea del medio y las dos curvas (una "w" chiquita)
  const bocaM = new THREE.MeshStandardMaterial({ color: 0x2a1414, roughness: 0.6 });
  const lineaB = mesh(new THREE.CylinderGeometry(0.0045, 0.0045, 0.035, 6), bocaM, 0, 0.003, 0.118); hoc.add(lineaB);
  for (const s of [-1, 1]) { const a = mesh(new THREE.TorusGeometry(0.022, 0.0045, 6, 14, Math.PI * 0.75), bocaM, s * 0.021, -0.016, 0.106); a.rotation.set(-0.35, 0, s > 0 ? Math.PI * 1.08 : Math.PI * 1.17); hoc.add(a); }
  // la mandíbula (se abre con el jadeo) y la lengua rosa
  const mandi = new THREE.Group(); mandi.position.set(0, -0.03, 0.02); hoc.add(mandi);
  mandi.add(mesh(G.esf, M.claro, 0, -0.012, 0.035, 0.07, 0.03, 0.07));
  const bocaIn = mesh(G.esf, M.boca, 0, 0.012, 0.05, 0.05, 0.016, 0.05); hoc.add(bocaIn);
  const lengua = mesh(G.esf, M.lengua, 0, -0.005, 0.085, 0.032, 0.012, 0.055); mandi.add(lengua);
  // los ojos: marrón oscuro, grandes, con brillo; los párpados achican la escala en y
  const ojos = [-1, 1].map((s) => {
    const g = new THREE.Group(); g.position.set(s * 0.064, 0.03, 0.122); hk.add(g);
    const o = mesh(G.esf, M.ojo, 0, 0, 0, 0.036, 0.038, 0.032); g.add(o);
    const b1 = mesh(G.esfL, M.brillo, -0.011, 0.014, 0.027, 0.011, 0.011, 0.006); g.add(b1);
    const b2 = mesh(G.esfL, M.brillo, 0.012, -0.012, 0.028, 0.005, 0.005, 0.003); g.add(b2);
    return { g, s };
  });
  // las cejas de perro: manchitas crema arriba de los ojos (suben, bajan y se inclinan)
  const cejas = [-1, 1].map((s) => { const piv = new THREE.Group(); piv.position.set(s * 0.06, 0.088, 0.128); hk.add(piv); piv.add(mesh(G.esf, M.claro, 0, 0, 0, 0.026, 0.013, 0.012)); return { piv, s }; });
  // las orejas: "parada" (triángulo redondeado con el interior rosado) o "caida" (gota aplanada que cuelga)
  const orejas = [["D", -1, c.orejaD], ["I", 1, c.orejaI]].map(([lado, s, tipo]) => {
    const piv = new THREE.Group(); hk.add(piv);
    if (tipo === "parada") {
      piv.position.set(s * 0.085, 0.095, -0.005);
      // (r1) con volumen: un cono redondeado de base ancha, hundido en el cráneo, aplanado adelante-atrás, con el interior
      // rosado de frente y la punta más oscura (de costado ya no se lee como una tabla)
      const lat = new THREE.LatheGeometry([[0, -0.03], [0.058, -0.03], [0.06, 0.02], [0.05, 0.08], [0.03, 0.13], [0.012, 0.165], [0, 0.172]].map(([r, y]) => new THREE.Vector2(r, y)), 20);
      const o = mesh(lat, M.pelo, 0, 0, 0, 1, 1, 0.72); piv.add(o);   // (r3) más volumen: de atrás ya no es un disco plano
      const lomo = mesh(G.esfL, M.oscuro, 0, 0.06, -0.022, 0.034, 0.07, 0.02); piv.add(lomo);
      const inn = mesh(new THREE.LatheGeometry([[0, -0.01], [0.04, -0.01], [0.038, 0.05], [0.022, 0.11], [0, 0.135]].map(([r, y]) => new THREE.Vector2(r, y)), 16), M.oreja, 0, 0.0, 0.018, 1, 1, 0.3); piv.add(inn);
      if (c.oscuro && lado === "D") { const punta = mesh(G.esfL, M.oscuro, 0, 0.152, 0, 0.016, 0.022, 0.011); piv.add(punta); }
    } else {
      piv.position.set(s * 0.13, 0.085, 0.0);
      const o = mesh(G.esf, M.oscuro, s * 0.012, -0.085, 0.01, 0.034, 0.098, 0.058); piv.add(o);
      o.rotation.z = s * 0.08;
    }
    return { piv, s, tipo };
  });
  // el collar (torus en el cuello) con la chapita; el pañuelo triangular (P4-P7)
  const collar = new THREE.Group(); esc.add(collar);
  const aro = mesh(new THREE.TorusGeometry(0.098, 0.017, 8, 28), M.collar); aro.rotation.x = Math.PI / 2; collar.add(aro);
  const argolla = mesh(new THREE.TorusGeometry(0.011, 0.003, 6, 12), mat(0xb4b2a3, 0.3, { metalness: 0.5 }), 0, -0.012, 0.112); collar.add(argolla);
  const chapita = mesh(new THREE.CylinderGeometry(0.024, 0.024, 0.006, 20), M.chapita, 0, -0.04, 0.115); chapita.rotation.x = Math.PI / 2 - 0.15; collar.add(chapita);
  const panuelo = new THREE.Group(); collar.add(panuelo);
  { const s = new THREE.Shape(); s.moveTo(-0.11, 0); s.lineTo(0.11, 0); s.quadraticCurveTo(0.08, -0.12, 0, -0.14); s.quadraticCurveTo(-0.08, -0.12, -0.11, 0);   // (r3) punta redonda: ya no parece una flecha
    const g = new THREE.ExtrudeGeometry(s, { depth: 0.012, bevelEnabled: true, bevelSize: 0.006, bevelThickness: 0.006, bevelSegments: 1 });
    const p = mesh(g, M.panuelo, 0, -0.01, 0.108, 1.45, 1.5, 1); p.rotation.x = -0.4; panuelo.add(p);   // (r3) más grande
    const nudo = mesh(G.esfL, M.panuelo, 0, -0.005, -0.1, 0.03, 0.025, 0.02); panuelo.add(nudo); }
  panuelo.visible = false;

  // ---- poner ----
  const V = (x, y, z) => new THREE.Vector3(x, y, z);
  const _a = new THREE.Vector3(), _b = new THREE.Vector3(), _c = new THREE.Vector3();
  const BASE = { x: 0, y: 0, z: 0, giro: 0, sentado: 0, erguido: 0, echado: 0, paso: 0, pasoVel: 10, cola: 0.4, colaAlta: 0.6, orejas: 0.6, cejas: 0, pata: 0, jadeo: 0, t: 0,
    cabeza: { giro: 0, asiente: 0, ladea: 0 }, ojos: { x: 0, y: 0, abiertos: 1 } };
  const estado = { hombro: V(0, 0, 0), cabeza: V(0, 0, 0), pataD: V(0, 0, 0) };
  function poner(pIn = {}) {
    const p = { ...BASE, ...pIn, cabeza: { ...BASE.cabeza, ...(pIn.cabeza || {}) }, ojos: { ...BASE.ojos, ...(pIn.ojos || {}) } };
    const t = p.t;
    raiz.position.set(p.x, p.y, p.z); raiz.rotation.set(0, p.giro, 0);
    // la inclinación del torso y la altura de la cadera según el modo
    let a = 0.82 * p.sentado, hy = lerp(0.36, 0.17, p.sentado), hz = -0.22;
    a = lerp(a, 1.28, p.erguido); hy = lerp(hy, 0.42, p.erguido); hz = lerp(hz, -0.12, p.erguido);
    a = lerp(a, 0.04, p.echado); hy = lerp(hy, 0.15, p.echado);
    const resp = Math.sin(t * (2.2 + p.jadeo * 6)) * (0.004 + p.jadeo * 0.006);
    hy += resp * 0.5;
    torso.position.set(0, hy, hz); torso.rotation.set(-a, 0, 0);
    const P = (y, z) => { const [ry, rz] = rotX(y, z, a); return V(0, hy + ry, hz + rz); };
    const hombro = P(0.0, 0.4 * tc), nucaB = P(0.1, 0.44 * tc);
    estado.hombro.copy(hombro);
    // la cabeza: arriba y adelante del cuello, derecha (no hereda la inclinación del torso)
    const cc = V(0, nucaB.y + 0.19 + resp, nucaB.z + 0.06 + 0.04 * p.sentado);
    // (vete-racion r1) baja: 0..1 la cabeza baja al piso (comer del plato, empujarlo con el hocico); el cuello la sigue
    const bj = p.baja || 0; cc.y -= 0.3 * bj; cc.z += 0.1 * bj;
    cabeza.position.copy(cc);
    cabeza.rotation.set(p.cabeza.asiente, p.cabeza.giro, p.cabeza.ladea, "YXZ");
    // el cuello: de la nuca del torso a la base de la cabeza (un cilindro grueso, el frente crema)
    const baseCab = cc.clone().add(V(0, -0.1, -0.02));
    entre(cuello, P(0.04, 0.36 * tc), baseCab, 0.088 * tc);
    entre(cuelloCr, P(-0.02, 0.41 * tc), baseCab.clone().add(V(0, -0.01, 0.045)), 0.062 * tc);
    // el collar: en el medio del cuello, perpendicular a él
    _a.copy(P(0.04, 0.36 * tc)).lerp(baseCab, 0.55); collar.position.copy(_a);
    _b.copy(baseCab).sub(P(0.04, 0.36 * tc)).normalize(); collar.quaternion.setFromUnitVectors(_up, _b);
    // la cola: bate de lado a lado; la altura según colaAlta (compensa la inclinación del torso)
    const amp = 0.12 + 0.55 * p.cola, fr = 5 + 13 * p.cola;
    const bate = Math.sin(t * fr) * amp;
    cola.forEach((g, i) => {
      if (i === 0) { g.rotation.set(-lerp(2.6, 1.15, p.colaAlta) + a * 0.9 - p.echado * 0.9, 0, 0); g.rotation.z = bate; }
      else { g.rotation.set(lerp(-0.05, 0.22, p.colaAlta) * (i < 3 ? 1 : 0.6), 0, bate * 0.35); }
    });
    // las patas de adelante
    const fase = t * p.pasoVel;
    for (const L of patasD) {
      const s = L.s;
      const h = V(s * 0.085, hombro.y - 0.03, hombro.z);
      let pie = V(s * 0.09, 0.035, hombro.z + 0.03);
      if (p.erguido > 0) {
        const colg = V(s * 0.1, hombro.y - 0.2, hombro.z + 0.12);
        const ap = s > 0 && p.apoyo ? V(...p.apoyo) : colg;
        pie.lerp(ap, p.erguido);
      }
      if (p.echado > 0) pie.lerp(V(s * 0.09, 0.035, hombro.z + 0.26), p.echado);
      if (p.paso > 0) { const w = Math.sin(fase + (s > 0 ? 0 : Math.PI)); pie.z += w * 0.07 * p.paso; pie.y += Math.max(0, w) * 0.05 * p.paso; }
      if (s < 0 && p.pata > 0) {
        // dar la pata: la pata derecha sube hacia adelante (o a pataA)
        const arriba = p.pataA ? V(...p.pataA) : V(s * 0.06, hombro.y - 0.03, hombro.z + 0.3);
        const u = p.pata, mid = pie.clone().lerp(arriba, u); mid.y += Math.sin(u * Math.PI) * 0.06;
        pie = mid;
      }
      if (s < 0) estado.pataD.copy(pie);
      // la caña (caramelo) hasta la mitad de abajo, la media crema y la pata
      const dir = _c.copy(pie).sub(h); const Lt = dir.length(); dir.normalize();
      const corte = h.clone().addScaledVector(dir, Lt * 0.74);   // (r2) media crema más corta: no quedan columnas blancas
      entre(L.caña, h, corte.clone().addScaledVector(dir, 0.02), 0.045 * tc);
      entre(L.media, corte, pie, 0.04 * tc);
      L.pie.position.copy(pie);
      // la pata mira hacia donde apunta la caña (en el piso, plana; levantada, de frente)
      const lev = cl((pie.y - 0.06) / 0.2);
      L.pie.rotation.set(-lev * 1.2, 0, 0);
      L.deditos.forEach(([d, k]) => { d.position.set(pie.x + k * 0.025, pie.y + 0.005 + lev * 0.04, pie.z + 0.055 - lev * 0.03); });
    }
    // las patas de atrás: el muslo grande al costado de la cadera; la caña hasta la pata
    const cad = P(0.0, 0.0);
    for (const L of patasT) {
      const s = L.s;
      // parado: muslo arriba, pata abajo; sentado/echado: el muslo acostado al costado (el anca) y la pata adelante
      const ach = Math.max(p.sentado * (1 - p.erguido), p.echado);
      const mc = V(s * 0.12, lerp(cad.y - 0.05, 0.1, ach), lerp(cad.z + 0.0, cad.z + 0.08, ach));
      L.muslo.position.copy(mc); L.muslo.scale.set(0.075 * tc, lerp(0.13, 0.095, ach) * tc, lerp(0.1, 0.14, ach) * tc);
      L.muslo.rotation.set(lerp(0.25, -0.2, ach), 0, 0);
      let pie = V(s * 0.1, 0.035, lerp(cad.z - 0.04, cad.z + 0.2, ach));
      if (p.paso > 0) { const w = Math.sin(fase + (s > 0 ? Math.PI : 0)); pie.z += w * 0.07 * p.paso; pie.y += Math.max(0, w) * 0.05 * p.paso; }
      const rod = V(s * 0.11, lerp(mc.y - 0.1, 0.06, ach), lerp(mc.z - 0.04, mc.z + 0.06, ach));
      entre(L.caña, rod, pie, 0.04 * tc);
      L.pie.position.copy(pie);
    }
    // la cara
    const or = p.orejas;
    for (const O of orejas) {
      if (O.tipo === "parada") O.piv.rotation.set(lerp(-1.25, -0.05, or), 0, O.s * lerp(1.0, 0.32, or));   // gachas: para atrás y abiertas
      else O.piv.rotation.set(lerp(-0.25, 0.15, or) + Math.sin(t * 3.1) * 0.03 * p.cola, 0, O.s * lerp(-0.05, 0.42, or));
    }
    for (const C of cejas) { C.piv.position.y = 0.088 + p.cejas * 0.012 + Math.max(0, -p.cejas) * 0.004; C.piv.rotation.z = C.s * -p.cejas * -0.45 + (p.cejas < 0 ? C.s * 0.35 * -p.cejas : 0); }
    for (const O of ojos) {
      O.g.scale.set(1, Math.max(0.12, p.ojos.abiertos), 1);
      O.g.children[0].position.set(p.ojos.x * 0.004, p.ojos.y * 0.004, 0);
    }
    mandi.rotation.x = p.jadeo * 0.42; lengua.visible = p.jadeo > 0.05; lengua.scale.set(0.032, 0.012, 0.055 + p.jadeo * 0.03); lengua.position.set(0, -0.012 - p.jadeo * 0.02, 0.085 + p.jadeo * 0.02);
    bocaIn.visible = p.jadeo > 0.05;
    return p;
  }
  poner({});
  return {
    raiz, cabeza, torso, collar, panuelo, curita, poner, estado, cfg: c, chapitaM: chapita,
    chapita: (color) => chapita.material.color.set(color),
    // el punto de la nariz en el mundo (para la cola de las burbujas y para apuntar)
    nariz: (out = new THREE.Vector3()) => { raiz.updateMatrixWorld(true); return nariz.getWorldPosition(out); },
    pataD: (out = new THREE.Vector3()) => { raiz.updateMatrixWorld(true); return patasD[0].pie.getWorldPosition(out); },
  };
}

// La gata Luna asomada (solo la cabeza): gris, orejas triangulares, ojos verde-amarillos con pupila vertical.
export function crearCaraGato(color = 0x8d8c8c) {
  const g = new THREE.Group();
  const pm = mat(color, 0.8), cr = mat(0xd9d7c9, 0.8);
  const m = (geo, mt, x, y, z, sx, sy = sx, sz = sx) => { const o = new THREE.Mesh(geo, mt); o.position.set(x, y, z); o.scale.set(sx, sy, sz); o.castShadow = true; g.add(o); return o; };
  m(G.esf, pm, 0, 0, 0, 0.11, 0.095, 0.1);
  m(G.esf, cr, 0, -0.035, 0.07, 0.05, 0.035, 0.04);
  m(G.esfL, mat(0xd98a8a, 0.4), 0, -0.012, 0.105, 0.012, 0.009, 0.008);
  for (const s of [-1, 1]) {
    const o = m(new THREE.ConeGeometry(0.045, 0.08, 4), pm, s * 0.06, 0.09, -0.005, 1, 1, 0.55); o.rotation.set(0, Math.PI / 4, s * -0.3);
    const ojo = m(G.esf, mat(0xc9d64a, 0.2), s * 0.042, 0.015, 0.082, 0.024, 0.022, 0.016);
    m(G.esf, mat(0x111111, 0.2), s * 0.042, 0.015, 0.094, 0.006, 0.018, 0.006);
    m(G.esfL, new THREE.MeshBasicMaterial({ color: 0xffffff }), s * 0.042 - 0.007, 0.024, 0.097, 0.004);
  }
  return g;
}
