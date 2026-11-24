// =====================================================================================================
// LAS TARJETAS DE ESTE REEL (globos, chips, rótulos)
// =====================================================================================================
const chip = (txt, px = 62, fondo = "#16243d", tinta = "#efeee5") => { const med = document.createElement("canvas").getContext("2d"); med.font = F(900, px); const W = Math.round(med.measureText(txt).width + px * 1.1); return crearTarjeta(W, Math.round(px * 1.7), (x, w, h) => { x.fillStyle = tinta; x.textAlign = "center"; x.textBaseline = "middle"; x.font = F(900, px); x.fillText(txt, w / 2, h / 2 + 3); }, { fondo }); };
const dibujarContador = (x, W, H, n) => { x.fillStyle = "#efeee5"; x.textAlign = "center"; x.textBaseline = "middle"; x.font = F(800, 44); x.fillText("Ración que no se vendió", W / 2, 46); x.fillText("en la veterinaria:", W / 2, 100); x.font = F(900, 96); x.fillText(plata(n), W / 2, 186); };
const GL = {
  dom: chip("Domingo, 21:40.", 60), dom2: chip("Domingo, 22:05.", 62), feb: chip("Febrero.", 66),
  jue: chip("Jueves, 10:00.", 62), vie: chip("Viernes, 18:40.", 62), domQ: chip("Domingo, 21:40.", 62), febQ: chip("Febrero.", 66),
  meses: ["NOVIEMBRE", "DICIEMBRE", "ENERO"].map((m) => chip(m, 104, "#c7655b", "#ffffff")),
  cont: crearTarjeta(620, 240, (x, W, H) => dibujarContador(x, W, H, 3900), { fondo: "#c7655b" }),
  v1: crearGlobo(["Uy. Se [terminó.]"], 74),
  v2: crearGlobo(["Bueno, Toto.", "Al [súper.]"], 76),
  rSup: crearRotulo([["15 kg · $ 3.900"], ["en el súper", "#ff9d92"]], 54),
  i1: crearGlobo(["¡Vero! ¿Qué está", "comiendo [Toto?]"], 70),
  v3: crearGlobo(["La que me recomendaste.", "La compro en el [súper.]"], 60),
  r1: crearRotulo([["$ 3.900 por mes", "#ff9d92", 60], ["$ 46.800 al año,", "#ff9d92", 60], ["en el súper", "#ff9d92", 52]], 52),
  r2: crearRotulo([["Clientes de bolsa", "#ff9d92"], ["que dejaron de venir: 11", "#ff9d92"]], 50),
  v4: crearGlobo(["¿Me la anotás?", "Así no me [equivoco.]"], 68),
  rRec: crearRotulo([["Aviso antes de que se termine"]], 50),
  v5: crearGlobo(["¿Cómo [sabe?]"], 84),
  rFicha: crearRotulo([["Sabe qué bolsa lleva"], ["cada uno y cada cuánto"]], 50),
  rTienda: crearRotulo([["Repetir y pagar: un toque"]], 52),
  b1: crearGlobo(["¡Ración para [Toto!]"], 76),
  i1b: crearGlobo(["¡Vero! ¿Qué está", "comiendo [Toto?]"], 70),
  v6: crearGlobo(["La que me recomendaste.", "Me llega [sola.]"], 60),
  rPanel: crearRotulo([["Panel de recompras"]], 54),
};
let contN = -1;
function ponerContador(t, cx, cy, s = 1) { const n = 3900 * (1 + T.mes.filter((m) => t >= m + 0.1).length); if (n !== contN) { contN = n; redibujar(GL.cont, (x, W, H) => dibujarContador(x, W, H, n)); } ponerGlobo(GL.cont, cx, cy, s, null, 1); }
const GUIAS = [crearGuia(), crearGuia(), crearGuia()];

// =====================================================================================================
// LUGARES
// =====================================================================================================
const VERO_K = { x: -0.3, z: -0.12 };            // la cocina: Vero de pie, de 3/4
const TOTO_K = { x: 0.5, z: 0.34 };             // Toto a la derecha del plato, mirando a -x (de perfil)
const VERO_S = { x: SUX + 0.12, z: 0.02 };       // el súper
const SENORA_S = { x: SUX - 1.45, z: -0.15 };
const INES_M = { x: VX + 0.0, z: -1.52 };        // Inés detrás del mostrador
const BRUNO_T = { x: VX - 0.62, z: -0.25 };      // Bruno acomodando la torre (P3)
const BRUNO_M = { x: VX + 0.68, z: -1.58 };      // Bruno detrás del mostrador (P4 en adelante)
const PUERTA_V = { x: VX + XR - 0.3, z: (PUERTA.z0 + PUERTA.z1) / 2 };
const VERO_V = { x: VX + 0.3, z: -0.22 };        // Vero frente al mostrador
const TOTO_T = { x: VX - 1.05, z: 0.12 };        // Toto oliendo la torre
const TOTO_Q4 = { x: VX + 0.85, z: 0.05 };       // Q4: Toto sentado al lado de Vero (pasa de largo el estante)
const VERO_P = { x: PX - 0.42, z: -0.35 };       // la puerta de Vero
const BRUNO_P = { x: PX + 0.08, z: PZ - 0.55 };

// =====================================================================================================
// CÁMARA: PLANOS [nombre, desde, claves | null (inserto)]; cada clave [t, px, py, pz, mx, my, mz, fov]
// =====================================================================================================
const K0 = [1.2, 1.02, 2.5, -0.02, 0.66, -0.05, 50];   // el cuadro 0 de la cocina (P1 = Q1 = Q3)
const KV = [0.6, 1.25, 1.75, -0.15, 0.85, -0.1, 46];   // Q1v: Vero y Toto más cerca
const S0 = [SUX + 1.75, 1.5, 2.25, SUX + 0.15, 0.92, -0.45, 50];
const V4 = [VX + 0.55, 1.55, 3.2, VX - 0.35, 1.05, -0.65, 52];
const V4B = [VX + 1.05, 1.6, -1.78, VX + 0.25, 1.32, -0.15, 46];
const off = (k, d) => k.map((v, i) => v + (d[i] ?? 0));
const PLANOS = [
  ["P1", 0, [[0, ...K0], [T.cel, ...off(K0, [-0.08, -0.03, -0.25, 0, 0, 0, 0])]]],
  ["P1c", T.cel, null],
  ["P1b", T.celFin, [[T.celFin, ...off(K0, [-0.1, -0.04, -0.3, 0, 0, 0, 0])], [T.p2, ...off(K0, [-0.14, -0.05, -0.42, 0, 0, 0, 0])]]],
  ["P2", T.p2, [[T.p2, ...S0], [T.carro, ...off(S0, [-0.1, 0, -0.15, 0.05, 0, 0, 0])], [T.p3, ...off(S0, [-0.12, 0, -0.2, 0.05, 0, 0, 0])]]],
  ["P3", T.p3, [[T.p3, VX - 0.15, 1.7, 3.7, VX - 0.55, 1.0, -0.9, 54], [T.p4, VX - 0.2, 1.68, 3.45, VX - 0.55, 1.0, -0.9, 53]]],
  ["P4", T.p4, [[T.p4, ...V4], [T.p4b, ...off(V4, [-0.05, 0, -0.2, 0, 0, 0, -1])]]],
  ["P4b", T.p4b, [[T.p4b, ...V4B], [T.p4c, ...off(V4B, [-0.03, 0, 0.05, 0, 0, 0, -1])]]],
  ["P4c", T.p4c, [[T.p4c, VX - 0.25, 1.55, 1.05, VX - 0.35, 1.22, -1.3, 48], [T.p5, VX - 0.24, 1.55, 0.95, VX - 0.35, 1.22, -1.3, 47]]],
  ["P5", T.p5, [[T.p5, VX + 1.95, 1.52, 0.35, VX + 0.1, 1.22, -0.9, 46], [T.p5i, VX + 1.9, 1.52, 0.3, VX + 0.1, 1.22, -0.9, 45]]],
  ["P5i", T.p5i, [[T.p5i, VX - 0.08, MOS.alto + 0.46, MOS.z + 0.52, TALON_P.x, MOS.alto, TALON_P.z - 0.02, 42], [T.p5t, VX - 0.08, MOS.alto + 0.42, MOS.z + 0.46, TALON_P.x, MOS.alto, TALON_P.z - 0.02, 41]]],
  ["P5t", T.p5t, [[T.p5t, VX - 0.25, 0.62, 1.35, VX - 1.15, 0.42, -0.2, 50], [P1, VX - 0.3, 0.6, 1.25, VX - 1.15, 0.42, -0.2, 49]]],
  // ---- parte 2 ----
  ["Q1", P2, [[P2, ...K0], [T.q1c, ...off(K0, [-0.04, 0, -0.1, 0, 0, 0, 0])]]],
  ["Q1c", T.q1c, null],
  ["Q1v", T.q1v, [[T.q1v, ...KV], [T.q1t, ...off(KV, [0, 0, -0.08, 0, 0, 0, 0])]]],
  ["Q1t", T.q1t, null],
  ["Q1s", T.q1s, null],
  ["Q2", T.q2, [[T.q2, PX + 0.75, 1.42, 1.85, PX - 0.05, 1.15, -1.1, 50], [T.q3, PX + 0.7, 1.42, 1.7, PX - 0.05, 1.15, -1.1, 49]]],
  ["Q3", T.q3, [[T.q3, ...K0], [T.para, ...off(K0, [-0.1, -0.08, -0.4, 0.15, -0.08, 0.1, -2])], [T.q4, ...off(K0, [-0.25, -0.18, -0.9, 0.3, -0.16, 0.2, -4])]]],
  ["Q4", T.q4, [[T.q4, ...V4], [T.q4b, ...off(V4, [-0.05, 0, -0.2, 0, 0, 0, -1])]]],
  ["Q4b", T.q4b, [[T.q4b, ...V4B], [T.q5, ...off(V4B, [-0.03, 0, 0.05, 0, 0, 0, -1])]]],
  ["Q5", T.q5, null],
  ["C", T.c, [[T.c, VX + 0.05, 1.58, 0.8, VX + 0.05, 1.42, -1.5, 34], [DUR, VX + 0.05, 1.58, 0.65, VX + 0.05, 1.43, -1.5, 33]]],
];
for (let i = PLANOS.length - 2; i >= 0; i--) { const d = PLANOS[i + 1][1] - PLANOS[i][1]; if (d < 0.3) { console.error(`plano corto: ${PLANOS[i][0]} (${d.toFixed(2)} s), se saca`); PLANOS.splice(i, 1); } }
const _m = new THREE.Vector3();
let planoActual = "P1";
function catmull(CAM, t) {
  let i = 0; while (i + 1 < CAM.length - 1 && CAM[i + 1][0] <= t) i++;
  const a = CAM[i], b = CAM[i + 1] || a;
  const u = sg(t, a[0], b[0]);
  const p1 = a.slice(1, 8), p2 = b.slice(1, 8);
  const p0 = i > 0 ? CAM[i - 1].slice(1, 8) : p1;
  const p3 = i + 2 < CAM.length ? CAM[i + 2].slice(1, 8) : p2;
  const u2 = u * u, u3 = u2 * u;
  return p1.map((_, j) => 0.5 * (2 * p1[j] + (-p0[j] + p2[j]) * u + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * u2 + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * u3));
}
function ponerCam(v, t) {
  const mano = Math.sin(t * 0.9) * 0.003;
  camera.up.set(0, 1, 0);
  camera.position.set(v[0] + mano, v[1] + Math.sin(t * 0.67) * 0.002, v[2]);
  camera.fov = v[6]; camera.updateProjectionMatrix();
  camera.lookAt(_m.set(v[3], v[4], v[5]));
}
function planoEn(t) { let pi = 0; while (pi + 1 < PLANOS.length && PLANOS[pi + 1][1] <= t) pi++; return PLANOS[pi]; }
const aC = (giro = 0, asiente = 0, ladea = 0.03) => ({ cabeza: { giro, asiente, ladea }, ojos: { x: giro * 0.6, y: -asiente * 0.8, abiertos: 0.95 } });
const SECO = { ...CARA.neutra, ojos: { abiertos: 0.88, tension: 0.2, feliz: 0 }, cejas: { alto: -0.05, ang: -0.1 }, boca: { sonrisa: 0.0, abierta: 0, ancho: 0.9 } };
const BUENA = { ...CARA.sonrisa, ojos: { abiertos: 1, feliz: 0.35 }, boca: { sonrisa: 0.75, abierta: 0, ancho: 1.1 } };
const QUIETA = { ...CARA.sonrisa, ojos: { abiertos: 1, feliz: 0.05 }, cejas: { alto: 0.25, ang: 0.1 }, boca: { sonrisa: 0.55, abierta: 0, ancho: 1.05 } };   // la sonrisa congelada de la pausa
const FELIZ = { ...CARA.sonrisa, ojos: { abiertos: 1, feliz: 0.45 }, boca: { sonrisa: 0.95, abierta: 0.05, ancho: 1.15 } };
const bocaVoz = (p, t, t0, env, k = 0.7) => {
  if (t >= t0 && t < t0 + env.length / 30) { const i = Math.floor((t - t0) * 30), f = (t - t0) * 30 - i; const e = lerp(env[i] ?? 0, env[i + 1] ?? 0, f); p.boca.abierta = Math.max(p.boca.abierta, cl(e * 1.1 - 0.05) * k); p.boca.sonrisa = Math.min(p.boca.sonrisa, 0.35); }   // (vacunas r2 A2) hablando, la sonrisa cerrada se achica: sin doble boca
  if (t >= t0 - 0.05 && t < t0 + env.length / 30 + 0.05) p.ojos.abiertos = Math.max(p.ojos.abiertos, 0.85);   // hablando, nunca con los ojos cerrados
};
const manoMundo = (per, lado, out = new THREE.Vector3()) => { per.raiz.updateMatrixWorld(true); return per.brazos[lado === "I" ? 0 : 1].mano.getWorldPosition(out); };
function aCuerpo(per, p, w) { per.poner(p); per.raiz.updateMatrixWorld(true); const v = per.cuerpo.worldToLocal(w.clone()); return [v.x, v.y, v.z]; }
const dirGiro = (x0, z0, x1, z1) => Math.atan2(x1 - x0, z1 - z0);
const toW = (per, local) => { per.raiz.updateMatrixWorld(true); return per.cuerpo.localToWorld(V3(...local)); };
function manoA(per, p, lado, w, k, codo = null) { if (k <= 0) return; const m = aCuerpo(per, p, w); const key = lado === "I" ? "manoI" : "manoD"; p[key] = p[key].map((v, i) => lerp(v, m[i], eio(cl(k)))); if (codo) p[lado === "I" ? "codoI" : "codoD"] = codo; }
const enPerro = (d, w) => { d.raiz.updateMatrixWorld(true); const v = d.raiz.worldToLocal(w.clone()); return [v.x / d.cfg.escala, v.y / d.cfg.escala, v.z / d.cfg.escala]; };
const _a = new THREE.Vector3(), _b = new THREE.Vector3(), _q = new THREE.Quaternion();

// =====================================================================================================
// POSES
// =====================================================================================================
// la bolsa vacía en las manos de Vero (P1): dada vuelta sobre el plato hasta que cae la croqueta; después cuelga de la izquierda
const BOLSA_ARRIBA = () => V3(PLATO.position.x - 0.02, 1.02, PLATO.position.z - 0.02);
function poseVeroC(t) {
  const p2 = t >= P2;
  const g0 = dirGiro(VERO_K.x, VERO_K.z, 1.2, 2.5) - 0.45;   // de 3/4 a cámara, mirando al plato
  if (!p2) {
    const p = poseEn(t, [
      [0, { x: VERO_K.x, z: VERO_K.z, giro: g0, ...aC(-0.25, 0.45), ...CARA.sorpresa, boca: { sonrisa: 0.1, abierta: 0.15, ancho: 0.8 }, ...BRAZOS.costado }],
      [T.v1 + 0.5, { ...aC(-0.2, 0.42), ...CARA.esperanza, cejas: { alto: 0.55, ang: 0.6 }, boca: { sonrisa: 0.2, abierta: 0, ancho: 0.9 } }, 0.3],
      [T.cel - 0.25, { ...aC(0.05, 0.35), ...CARA.neutra, ...BRAZOS.costado, manoD: [-0.08, 0.36, 0.3], codoD: [-0.7, -0.7, -0.2] }, 0.3],
      [T.celFin, { ...aC(-0.35, 0.4), ...BUENA, cejas: { alto: 0.4, ang: 0.2 } }, 0.25],
    ]);
    // las dos manos en la base de la bolsa dada vuelta (hasta T.croqueta + 0.4); sacude un poco
    const kB = 1 - sg(t, T.croqueta + 0.45, T.croqueta + 0.8);
    if (kB > 0) { const c = BOLSA_ARRIBA(); c.x += Math.sin(t * 22) * 0.012 * (1 - sg(t, T.croqueta, T.croqueta + 0.3)); manoA(veroC, p, "I", c.clone().add(V3(0.16, 0.02, 0.0)), kB, [0.8, -0.6, -0.2]); manoA(veroC, p, "D", c.clone().add(V3(-0.16, 0.02, 0.0)), kB, [-0.8, -0.6, -0.2]); }
    p.t = t; bocaVoz(p, t, T.v1, ENV.v1, 0.6); bocaVoz(p, t, T.v2, ENV.v2, 0.6); return p;
  }
  if (t < T.q2) {
    // Q1: de pie al lado de la mesada, con el celular en las dos manos; "¿Cómo sabe?" mira a Toto
    const p = poseEn(t, [
      [0, { x: VERO_K.x - 0.1, z: VERO_K.z - 0.05, giro: g0 + 0.15, ...aC(0.0, 0.42), ...CARA.neutra, ...BRAZOS.celular }],
      [T.ding + 0.1, { ...aC(0.05, 0.45), ...CARA.sorpresa, boca: { sonrisa: 0.3, abierta: 0.1, ancho: 0.8 } }, 0.2],
      [T.v5 - 0.1, { ...aC(-0.45, 0.35), ...BUENA, cejas: { alto: 0.7, ang: 0.4 } }, 0.25],
    ]);
    p.t = t; bocaVoz(p, t, T.v5, ENV.v5, 0.65); return p;
  }
  if (t < T.q3) {
    // Q2: abre la puerta (de 3/4 de espaldas), contenta
    const p = poseEn(t, [
      [0, { x: VERO_P.x, z: VERO_P.z, giro: dirGiro(VERO_P.x, VERO_P.z, PX + 0.1, PZ - 0.4) + 0.25, ...aC(0.2, 0.0), ...BUENA, ...BRAZOS.costado }],
      [T.b1 + 0.2, { ...aC(0.3, -0.05), ...FELIZ }, 0.3],
    ]);
    if (t < T.abre + 0.5) { const w = V3(PX - 0.3, 1.05, PZ + 0.25); manoA(veroC, p, "D", w, sg(t, T.q2, T.abre) * (1 - sg(t, T.abre + 0.3, T.abre + 0.5)), [-0.8, -0.6, -0.2]); }
    p.t = t; return p;
  }
  // Q3: al fondo, tranquila, con la taza (sentada a la mesita)
  const p = poseEn(t, [[0, { x: 1.55, y: -0.05, z: -0.2, sentado: 1, giro: -0.5, ...aC(-0.3, 0.2), ...CARA.sonrisa, ...BRAZOS.costado, manoD: [-0.12, 0.3, 0.32], codoD: [-0.7, -0.7, -0.2], manoI: [0.2, 0.08, 0.3] }]]);
  p.t = t; return p;
}
// el súper: saca la bolsa verde y la tira al carro (y otra vez cada mes)
const BOLSA_CARRO = () => CARRO_POS.clone().add(V3(0.0, 0.43, 0.0));
const tirones = () => [[T.agarra, T.carro], ...T.carroMes.map((c) => [r2(c - 0.38), c])];
function bolsaSuperEn(t) {
  // [posición, giro, 0..1 cuánto la sostiene Vero]
  const TT = tirones();
  let i = -1; for (let k = 0; k < TT.length; k++) if (t >= TT[k][0]) i = k;
  if (i < 0) return [BOLSA_GOND.clone(), 0, 0];
  const [a, b] = TT[i], u = sg(t, a, b);
  if (u >= 1) return [BOLSA_CARRO(), -0.35, 0];
  const p0 = BOLSA_GOND.clone().add(V3(0, 0, 0.2 * sg(u, 0, 0.3))), p1 = BOLSA_CARRO();
  const pos = p0.clone().lerp(p1, eio(sg(u, 0.25, 1))); pos.y += Math.sin(sg(u, 0.25, 1) * Math.PI) * 0.35;
  return [pos, lerp(0, -0.35, sg(u, 0.3, 1)), u < 0.95 ? 1 : 0];
}
function poseVeroS(t) {
  const gG = dirGiro(VERO_S.x, VERO_S.z, BOLSA_GOND.x - 0.1, BOLSA_GOND.z), gC = dirGiro(VERO_S.x, VERO_S.z, CARRO_POS.x, CARRO_POS.z);
  const [bp, , k] = bolsaSuperEn(t);
  const TT = tirones(); let i = -1; for (let q = 0; q < TT.length; q++) if (t >= TT[q][0] - 0.25) i = q;
  const u = i < 0 ? 0 : sg(t, TT[i][0], TT[i][1]);
  const giro = lerp(gG, gC, eio(sg(u, 0.3, 0.9)));
  const p = { x: VERO_S.x, z: VERO_S.z, giro, ...aC(lerp(0.1, -0.15, u), 0.15), ...CARA.neutra, ojos: { abiertos: 0.9, feliz: 0.1 }, ...BRAZOS.costado, t };
  if (k > 0 || (u > 0 && u < 1)) { manoA(vero, p, "I", bp.clone().add(V3(0.17, 0.28, 0.0)), 1, [0.8, -0.6, -0.2]); manoA(vero, p, "D", bp.clone().add(V3(-0.17, 0.28, 0.0)), 1, [-0.8, -0.6, -0.2]); }
  return p;
}
function poseVeroV(t) {
  const p2 = t >= P2;
  const t0 = p2 ? T.entra2[0] : T.entra[0], t1 = p2 ? T.entra2[1] : T.entra[1];
  const u = sg(t, t0, t1);
  const gI = dirGiro(VERO_V.x, VERO_V.z, INES_M.x, INES_M.z);
  const p = poseEn(t, p2 ? [
    [0, { giro: -Math.PI / 2 - 0.3, ...aC(0.1, 0.05), ...BUENA, ...BRAZOS.costado, manoI: [0.27, 0.08, 0.2], codoI: [0.8, -0.6, -0.2] }],
    [t1 - 0.2, { giro: gI, ...aC(0.0, 0.0), ...BUENA }, 0.3],
    [T.v6 + 0.3, { ...aC(0.05, -0.02), ...FELIZ, cejas: { alto: 0.5, ang: 0.2 } }, 0.3],
  ] : [
    [0, { giro: -Math.PI / 2 - 0.3, ...aC(0.1, 0.05), ...BUENA, ...BRAZOS.costado, manoI: [0.27, 0.08, 0.2], codoI: [0.8, -0.6, -0.2] }],
    [t1 - 0.2, { giro: gI, ...aC(0.0, 0.0), ...BUENA }, 0.3],
    [T.v3, { ...aC(0.05, -0.02), ...FELIZ, cejas: { alto: 0.5, ang: 0.2 } }, 0.3],
    [T.v4, { ...aC(0.1, 0.05), ...CARA.esperanza }, 0.3],
    [T.arranca + 0.2, { ...aC(0.0, 0.25), ...BUENA, ojos: { abiertos: 1, y: -0.6 } }, 0.3],
  ]);
  Object.assign(p, { x: lerp(PUERTA_V.x - 0.4, VERO_V.x, eio(u)), z: lerp(PUERTA_V.z - 0.1, VERO_V.z, eio(u)), paso: u > 0.02 && u < 0.98 ? 1 : 0 });
  p.t = t; bocaVoz(p, t, T.v3, ENV.v3, 0.6); bocaVoz(p, t, T.v4, ENV.v4, 0.6); bocaVoz(p, t, T.v6, ENV.v6, 0.6); return p;
}
function poseInes(t) {
  const p2 = t >= P2;
  if (t >= T.c) {
    // C · a cámara, de colega
    const p = poseEn(t, [[0, { x: INES_M.x, z: INES_M.z + 0.1, giro: 0, ...aC(0.0, 0.02), ...CARA.sonrisa, ...BRAZOS.apoyado }], [T.i2 + 1.4, { ...aC(0.06, 0.0, 0.06), ...BUENA }, 0.6]]);
    p.t = t; bocaVoz(p, t, T.i2, ENV.i2, 0.55); return p;
  }
  if (!p2) {
    const gV = dirGiro(INES_M.x, INES_M.z, VERO_V.x, VERO_V.z);
    const p = poseEn(t, [
      [0, { x: INES_M.x, z: INES_M.z, giro: 0, ...aC(-0.35, 0.35), ...CARA.concentrada, ...BRAZOS.apoyado }],
      [T.campana, { ...aC(0.35, 0.05), ...CARA.sonrisa }, 0.3],
      [T.i1, { giro: gV * 0.6, ...aC(0.3, 0.0), ...FELIZ, cejas: { alto: 0.5, ang: 0.2 } }, 0.25],
      [T.v3 + 0.6, { ...aC(0.12, 0.0), ...BUENA }, 0.3],
      [T.v3 + 1.75, { ...aC(0.08, 0.0), ...QUIETA }, 0.15],   // "La compro en el súper": la sonrisa queda quieta
      [T.p5 + 0.1, { ...aC(0.1, 0.05), ...QUIETA }, 0.3],
      [T.arranca - 0.1, { giro: 0, ...aC(-0.05, 0.42), ...SECO, ojos: { abiertos: 0.75, y: -0.9 } }, 0.25],   // escribe, profesional, sin mirar a nadie
    ]);
    if (t >= T.arranca - 0.15 && t < T.p5t + 0.3) {
      // la derecha escribe en el talonario (la lapicera en la mano); la izquierda lo sujeta
      const k = sg(t, T.arranca - 0.15, T.arranca + 0.15) * (1 - sg(t, T.p5t, T.p5t + 0.3));
      const u = sg(t, T.escribe[0], T.escribe[1]);
      const w = TALON_P.clone().add(V3(-0.05 + 0.1 * ((u * 3) % 1), 0.05, 0.03 - 0.05 * Math.floor(u * 3) / 3));
      w.x += Math.sin(t * 40) * 0.006 * (u > 0 && u < 1 ? 1 : 0);
      manoA(ines, p, "D", w, k, [-0.8, -0.6, -0.3]);
      manoA(ines, p, "I", TALON_P.clone().add(V3(0.1, 0.04, -0.04)), k, [0.8, -0.6, -0.3]);
    }
    p.t = t; bocaVoz(p, t, T.i1, ENV.i1, 0.55); return p;
  }
  // parte 2 (Q4, Q4b): detrás del mostrador; el mismo "¡Vero!…"; sonríe con "Me llega sola."
  const gV = dirGiro(INES_M.x, INES_M.z, VERO_V.x, VERO_V.z);
  const p = poseEn(t, [
    [0, { x: INES_M.x, z: INES_M.z, giro: 0, ...aC(0.35, 0.05), ...CARA.sonrisa, ...BRAZOS.apoyado }],
    [T.i1b, { giro: gV * 0.6, ...aC(0.3, 0.0), ...FELIZ, cejas: { alto: 0.5, ang: 0.2 } }, 0.25],
    [T.v6 + 1.5, { ...aC(0.1, 0.0), ...FELIZ }, 0.3],
  ]);
  p.t = t; bocaVoz(p, t, T.i1b, ENV.i1, 0.55); return p;
}
function poseBruno(t) {
  if (t < T.p4) {
    // P3: acomoda la bolsa de arriba de la torre
    const p = poseEn(t, [[0, { x: BRUNO_T.x, z: BRUNO_T.z, giro: -Math.PI / 2 - 0.5, ...aC(0.0, 0.25), ...CARA.neutra, ...BRAZOS.costado }], [T.campana, { ...aC(0.7, 0.0), ...CARA.esperanza }, 0.3]]);
    const top = TORRE_P.clone().add(V3(0.2, 1.5, 0.1));
    manoA(bruno, p, "I", top.clone().add(V3(0.0, 0.1, 0.12)), 1 - sg(t, T.campana - 0.1, T.campana + 0.2), [0.8, -0.6, -0.2]); manoA(bruno, p, "D", top.clone().add(V3(0.0, 0.1, -0.12)), 1 - sg(t, T.campana - 0.1, T.campana + 0.2), [-0.8, -0.6, -0.2]);
    p.t = t; return p;
  }
  if (t < P2) { const p = poseEn(t, [[0, { x: BRUNO_M.x, z: BRUNO_M.z, giro: -0.35, ...aC(0.4, 0.05), ...CARA.sonrisa, ...BRAZOS.apoyado }], [T.p4c, { ...aC(0.35, 0.1), ...CARA.incredula, ojos: { abiertos: 0.8 } }, 0.3]]); p.t = t; return p; }
  if (t < T.q3) {
    // Q2: en la puerta de Vero con la bolsa de 15 kg al hombro derecho (las dos manos la sujetan)
    const p = poseEn(t, [[0, { x: BRUNO_P.x, z: BRUNO_P.z, giro: 0.2, ...aC(-0.2, 0.0), ...FELIZ, ...BRAZOS.costado }], [T.b1 + LEN.b1, { ...aC(-0.1, 0.25), ...BUENA }, 0.3]]);
    const b = bolsaBrunoEn(t);
    if (b.enHombro) { manoA(bruno, p, "D", b.mano1, 1, [-0.9, -0.3, -0.2]); manoA(bruno, p, "I", b.mano2, 1, [0.8, -0.6, -0.2]); }
    p.t = t; bocaVoz(p, t, T.b1, ENV.b1, 0.65); return p;
  }
  // Q4 en adelante: detrás del mostrador, armando envíos
  const p = poseEn(t, [[0, { x: BRUNO_M.x, z: BRUNO_M.z, giro: -0.35, ...aC(0.4, 0.05), ...CARA.sonrisa, ...BRAZOS.apoyado }]]);
  p.t = t; return p;
}
// la bolsa TOTO de Bruno: al hombro hasta T.apoya; después en el piso adentro
function bolsaBrunoEn(t) {
  bruno.raiz.updateMatrixWorld(true);
  if (t < T.apoya) {
    const c = toW(bruno, [-0.24, 0.66, 0.02]);
    return { enHombro: true, pos: c, mano1: c.clone().add(V3(0, 0.04, 0.2)), mano2: c.clone().add(V3(0.12, -0.05, 0.12)) };
  }
  return { enHombro: false, pos: V3(PX - 0.05, 0, PZ + 0.45) };
}
// Toto
function poseToto(t) {
  const p2 = t >= P2, pa = planoActual;
  const B = { orejas: 0.65, cola: 0.35, colaAlta: 0.6, cejas: 0 };
  if (pa.startsWith("P1") || pa === "Q1" || pa === "Q1v" || pa === "Q3") {
    // la cocina: P1 empuja el plato vacío (de perfil, mirando a -x); Q1 echado al lado; Q3 empuja el lleno, para, mira, come
    if (pa === "Q1" || pa === "Q1v") {
      const c = poseEn(t, [[0, { cab: [0.2, -0.1, 0.0], orejas: 0.5, cola: 0.2, cejas: 0.2 }], [T.v5 + 0.1, { cab: [-0.55, -0.25, 0.4], orejas: 1, cola: 0.7, cejas: 0.8 }, 0.25]]);
      return { ...B, x: TOTO_K.x + 0.1, y: 0, z: TOTO_K.z + 0.1, giro: -Math.PI / 2 + 0.5, echado: 1, cola: c.cola, orejas: c.orejas, cejas: c.cejas, cabeza: { giro: c.cab[0], asiente: c.cab[1], ladea: c.cab[2] }, t };
    }
    const q = pa === "Q3";
    const e1 = q ? [T.empujaQ - 0.25, T.empujaQ + 0.2] : T.empuja, e2 = q ? null : [T.empuja2, r2(T.empuja2 + 0.45)];
    const avance = 0.07 * eio(sg(t, e1[0], e1[1])) + (e2 ? 0.07 * eio(sg(t, e2[0], e2[1])) : 0) + (q ? 0.03 : 0);
    const P = { ...B, x: TOTO_K.x - avance, y: 0, z: TOTO_K.z, giro: -Math.PI / 2 + 0.12, sentado: 0, paso: (en(t, e1[0], e1[1]) || (e2 && en(t, e2[0], e2[1]))) ? 0.5 : 0, pasoVel: 10, t };
    if (!q) {
      const c = poseEn(t, [
        [0, { cab: [0, 0.55, 0], orejas: 0.35, cola: 0.15, cejas: -0.7 }],
        [T.croqueta + 0.35, { cab: [0.0, 0.62, 0.0], orejas: 0.5, cola: 0.3, cejas: -0.3 }, 0.2],
        [T.croqueta + 0.9, { cab: [0.25, -0.05, 0.1], orejas: 0.3, cola: 0.1, cejas: -0.9 }, 0.3],   // mira a Vero: ¿eso es todo?
        [T.empuja2 - 0.1, { cab: [0, 0.55, 0], orejas: 0.3, cola: 0.1, cejas: -0.8 }, 0.2],
        [T.orejas, { cab: [0.3, -0.15, 0.12], orejas: 1, cola: 1, cejas: 0.8 }, 0.2],
      ]);
      Object.assign(P, { orejas: c.orejas, cola: c.cola, cejas: c.cejas, cabeza: { giro: c.cab[0], asiente: c.cab[1], ladea: c.cab[2] }, jadeo: sg(t, T.orejas, T.orejas + 0.3) * 0.7 });
    } else {
      const c = poseEn(t, [
        [0, { cab: [0, 0.55, 0], orejas: 0.4, cola: 0.2, cejas: -0.2 }],
        [T.para, { cab: [0, 0.4, 0.0], orejas: 1, cola: 0.1, cejas: 1 }, 0.2],
        [T.mira[0], { cab: [0.95, -0.05, 0.35], orejas: 1, cola: 0.2, cejas: 1 }, 0.2],   // mira a cámara, la cabeza ladeada
        [T.mira[1], { cab: [0, 0.6, 0], orejas: 0.8, cola: 0.9, cejas: 0.3 }, 0.25],
      ]);
      const come = t > T.come ? Math.sin((t - T.come) * 14) * 0.06 : 0;
      Object.assign(P, { orejas: c.orejas, cola: c.cola, cejas: c.cejas, cabeza: { giro: c.cab[0], asiente: c.cab[1] + come, ladea: c.cab[2] }, jadeo: t > T.come ? 0.25 + Math.max(0, Math.sin((t - T.come) * 14)) * 0.3 : 0 });
    }
    return P;
  }
  if (pa === "Q2") {
    // contento, parado en dos patas mirando a Bruno (sin tocar la bolsa)
    const er = sg(t, T.b1 - 0.1, T.b1 + 0.2) * (1 - sg(t, T.apoya - 0.2, T.apoya));
    const P = { ...B, x: PX + 0.12, y: 0, z: PZ + 0.6, giro: Math.PI - 0.15, sentado: 1 - er, erguido: er * 0.7, cola: 1, orejas: 1, cejas: 0.7, jadeo: 1, cabeza: { giro: 0, asiente: -0.35, ladea: 0.1 }, t };
    return P;
  }
  // la veterinaria
  if (!p2) {
    const u = sg(t, T.entra[0] + 0.1, T.entra[1] - 0.05);
    const x0 = PUERTA_V.x - 0.5, z0 = PUERTA_V.z - 0.2;
    if (t < T.p5t) {
      const anda = u > 0.01 && u < 0.99;
      const x = lerp(x0, TOTO_T.x, eio(u)), z = lerp(z0, TOTO_T.z, eio(u));
      const gT = dirGiro(TOTO_T.x, TOTO_T.z, TOTO_T.x - 0.25, TORRE_P.z + 0.3);
      const huele = t > T.huele ? Math.sin((t - T.huele) * 11) * 0.08 : 0;
      const c = poseEn(t, [[0, { cab: [0, 0.0, 0], orejas: 0.9, cola: 0.8, cejas: 0.4 }], [T.huele, { cab: [0.0, 0.3, 0.05], orejas: 0.8, cola: 0.9, cejas: 0.5 }, 0.25], [T.p4c + 0.2, { cab: [0.0, 0.35, 0.05], orejas: 0.6, cola: 0.5, cejas: 0.3 }, 0.3]]);
      return { ...B, x, y: 0, z, giro: anda ? dirGiro(x0, z0, TOTO_T.x, TOTO_T.z) : gT, sentado: 0, paso: anda ? 1 : 0, pasoVel: 14, orejas: c.orejas, cola: c.cola, cejas: c.cejas, cabeza: { giro: c.cab[0], asiente: c.cab[1] + huele, ladea: c.cab[2] }, t };
    }
    // P5t: echado contra la base de la torre, con un suspiro (la respiración marcada)
    const s = t > T.suspiro ? Math.sin(sg(t, T.suspiro, T.suspiro + 0.9) * Math.PI) : 0;
    return { ...B, x: TORRE_P.x + 0.45, y: 0, z: TORRE_P.z + 0.55, giro: Math.PI / 2 - 0.2, echado: 1, orejas: 0.15, cola: 0.05, colaAlta: 0.3, cejas: -1, ojos: { abiertos: 0.75 - 0.4 * s }, cabeza: { giro: -0.3, asiente: 0.25 + 0.1 * s, ladea: 0.1 }, t };
  }
  // Q4: entra con Vero, pasa de largo el estante, se sienta al lado de ella moviendo la cola
  const u = sg(t, T.entra2[0] + 0.1, T.entra2[1]);
  const x0 = PUERTA_V.x - 0.5, z0 = PUERTA_V.z - 0.2;
  const anda = u > 0.01 && u < 0.99;
  const x = lerp(x0, TOTO_Q4.x, eio(u)), z = lerp(z0, TOTO_Q4.z, eio(u));
  return { ...B, x, y: 0, z, giro: anda ? dirGiro(x0, z0, TOTO_Q4.x, TOTO_Q4.z) : -2.6, sentado: sg(t, T.entra2[1] - 0.1, T.entra2[1] + 0.2), paso: anda ? 1 : 0, pasoVel: 14, cola: 1, orejas: 0.9, cejas: 0.6, jadeo: 0.8, cabeza: { giro: -0.3, asiente: -0.2, ladea: 0.1 }, t };
}

// =====================================================================================================
// OBJETOS EN EL TIEMPO
// =====================================================================================================
function ponerObjetos(t) {
  const p2 = t >= P2, pa = planoActual;
  const cocina = pa.startsWith("P1") || pa === "Q1" || pa === "Q1v" || pa === "Q3";
  // el plato: pegado a la nariz de Toto (el hocico toca el borde, no lo atraviesa); lleno en la parte 2
  PLATO.visible = cocina; ALF.visible = cocina;
  if (cocina) {
    const n = toto.nariz(_a);
    const q = pa === "Q1" || pa === "Q1v";
    PLATO.position.set(q ? 0.1 : n.x - 0.17, 0, q ? TOTO_K.z + 0.02 : n.z + 0.01);
    PLATO.userData.lleno.visible = p2;
    ALF.position.set(0.05, 0.004, TOTO_K.z);
  }
  // la croqueta única: cae de la boca de la bolsa y rebota en el plato
  croqSola.visible = pa === "P1" && t >= T.croqueta && t < T.cel;
  if (croqSola.visible) {
    const u = sg(t, T.croqueta, T.croqueta + 0.33), boca = BOLSA_ARRIBA().add(V3(0, -0.62, 0));
    const piso = PLATO.position.clone().add(V3(0.02, 0.025, 0.01));
    croqSola.position.lerpVectors(boca, piso, u); croqSola.position.y = lerp(boca.y, piso.y, u * u);
    if (t > T.croqueta + 0.33) { const v = t - T.croqueta - 0.33; croqSola.position.y = piso.y + Math.abs(Math.sin(v * 18)) * 0.03 * Math.exp(-v * 9); }
  }
  // la bolsa vacía (P1): dada vuelta entre las manos y después colgando de la izquierda
  BOLSA_VACIA.visible = pa === "P1" || pa === "P1b";
  if (BOLSA_VACIA.visible) {
    const kB = 1 - sg(t, T.croqueta + 0.45, T.croqueta + 0.8);
    if (kB > 0.02) { const c = BOLSA_ARRIBA(); c.x += Math.sin(t * 22) * 0.012 * (1 - sg(t, T.croqueta, T.croqueta + 0.3)); BOLSA_VACIA.position.copy(c); BOLSA_VACIA.rotation.set(Math.PI, 0.4, 0); }
    else { const m = manoMundo(veroC, "I", _a); veroC.cuerpo.getWorldQuaternion(_q); BOLSA_VACIA.position.copy(m).add(V3(0, -0.62, 0)); BOLSA_VACIA.rotation.set(0, new THREE.Euler().setFromQuaternion(_q, "YXZ").y, 0.05); }
  }
  // la bolsa con poco en la mesada (Q1) y la nueva llena en la mesada (Q3)
  BOLSA_POCA.visible = pa === "Q1" || pa === "Q1v"; BOLSA_POCA.position.set(-0.75, 0.91, KZ + 0.32); BOLSA_POCA.rotation.set(0, 0.25, 0); BOLSA_POCA.scale.set(1, 0.75, 1);
  // la bolsa de Bruno (Q2) → en el piso adentro (Q2) → llena en la mesada (Q3)
  BOLSA_NUEVA.visible = pa === "Q2" || pa === "Q3";
  if (pa === "Q2") { const b = bolsaBrunoEn(t); if (b.enHombro) { bruno.cuerpo.getWorldQuaternion(_q); BOLSA_NUEVA.position.copy(b.pos).add(V3(0, -0.2, 0)); BOLSA_NUEVA.quaternion.copy(_q); BOLSA_NUEVA.rotateZ(Math.PI / 2 - 0.15); BOLSA_NUEVA.translateX(-0.29); } else { BOLSA_NUEVA.position.copy(b.pos); BOLSA_NUEVA.rotation.set(0, -0.2, 0); } }
  if (pa === "Q3") { BOLSA_NUEVA.position.set(-0.75, 0.91, KZ + 0.32); BOLSA_NUEVA.rotation.set(0, 0.25, 0); }
  // la taza de Vero (Q3)
  TAZA.visible = pa === "Q3"; if (TAZA.visible) { const m = manoMundo(veroC, "D", _a); TAZA.position.copy(m).add(V3(0, -0.04, 0.02)); }
  // el celular de Vero (P1 desde que lo saca; Q1 en las dos manos)
  celuV.visible = (pa === "P1" && t >= T.cel - 0.3) || pa === "P1b" || pa === "Q1" || pa === "Q1v";
  if (celuV.visible) {
    veroC.cuerpo.getWorldQuaternion(_q);
    if (pa.startsWith("P1")) { const m = manoMundo(veroC, "D", _a); celuV.position.copy(m).add(V3(0, 0.07, 0)); celuV.quaternion.copy(_q); celuV.rotateX(-0.5); celuV.translateZ(0.03); }
    else { const a = manoMundo(veroC, "I", _a), b = manoMundo(veroC, "D", _b); celuV.position.copy(a).add(b).multiplyScalar(0.5).add(V3(0, 0.08, 0)); celuV.quaternion.copy(_q); celuV.rotateX(-0.7); }
  }
  // el súper: la bolsa verde (de la góndola al carro)
  BOLSA_SUP.visible = pa === "P2"; if (BOLSA_SUP.visible) { const [bp, g] = bolsaSuperEn(t); BOLSA_SUP.position.copy(bp); BOLSA_SUP.rotation.set(0, g, 0); }
  // la veterinaria: la torre (parte 1) o el estante ENVÍOS (parte 2); la tablet solo en la parte 2; el talonario
  TORRE.visible = !p2; ENVIOS.visible = p2; tablet.visible = p2;
  TALON.visible = !p2; ponerReceta(sg(t, T.escribe[0], T.escribe[1]));
  // la hoja arrancada: en P5i se ve la hoja de arriba; la lapicera en la mano de Inés mientras escribe
  LAPICERA.visible = !p2 && t >= T.arranca - 0.15 && t < T.p5t + 0.3;
  for (const m of LAP_BOLSILLO) m.visible = !LAPICERA.visible;
  if (LAPICERA.visible) { const m = manoMundo(ines, "D", _a); LAPICERA.position.copy(m).add(V3(0.0, -0.02, 0.02)); LAPICERA.rotation.set(0.5, 0, -0.35); }
  // la puerta de la veterinaria
  const uP = Math.max(sg(t, T.entra[0] - 0.1, T.entra[0] + 0.3) * (1 - sg(t, T.entra[0] + 0.9, T.entra[0] + 1.3)), sg(t, T.entra2[0] - 0.1, T.entra2[0] + 0.3) * (1 - sg(t, T.entra2[0] + 0.9, T.entra2[0] + 1.3)));
  HOJA.rotation.y = 1.25 * eio(uP);
  // la puerta de Vero (abre hacia adentro)
  PHOJA.rotation.y = -1.45 * eio(sg(t, T.abre - 0.05, T.abre + 0.35));
  // la correa: de la mano izquierda de Vero al collar de Toto (veterinaria)
  const conCorrea = (pa === "P3" || pa === "P4" || pa === "P4b" || pa === "P4c" || pa === "P5" || pa === "Q4" || pa === "Q4b") && t >= (p2 ? T.entra2[0] : T.entra[0]);
  if (conCorrea && toto.raiz.visible && vero.raiz.visible) { toto.collar.updateMatrixWorld(true); const mv = manoMundo(vero, "I", _a).clone().add(V3(0, -0.05, 0)); const ml = toto.collar.worldToLocal(mv.clone()); ml.y = 0; ml.z = Math.min(ml.z, -0.02); ml.setLength(0.1); ml.y = 0.02; ponerCorrea(mv, toto.collar.localToWorld(ml), true); } else ponerCorrea(null, null, false);
}

// =====================================================================================================
// RENDER
// =====================================================================================================
function luces(pa, t) {
  const cocina = pa.startsWith("P1") || pa === "Q1" || pa === "Q1v" || pa === "Q3";
  const nocheK = pa.startsWith("P1") || pa === "Q3";
  cielo.intensity = nocheK ? 1.25 : 1.85; relleno.intensity = nocheK ? 0.5 : 0.75; sol.intensity = nocheK ? 0.8 : 1.35;
  sol.color.set(nocheK ? 0xffe6c4 : 0xf6f8ff);
  luzLamp.intensity = nocheK ? 2.2 : 0;
  VENTANA.material.color.set(nocheK ? 0x0b1220 : 0xefe6cc);
  const cx = cocina ? 0 : pa === "P2" ? SUX : pa === "Q2" ? PX : VX;
  if (cocina) { sol.position.set(-0.3, 2.6, -0.2); sol.target.position.set(0.1, 0, 0.3); } else { sol.position.set(cx + 1.2, 6.5, 1.7); sol.target.position.set(cx, 0.5, -0.5); }
  sol.target.updateMatrixWorld();
}
function renderAt(tIn) {
  const t = en(tIn, P1, P2) ? (tIn < (P1 + P2) / 2 ? P1 - 0.001 : P2) : tIn;
  const p2 = t >= P2;
  const pl = planoEn(t); planoActual = pl[0];
  const pa = planoActual;
  luces(pa, t);
  dibujarInterfaz(t);
  const cocina = pa.startsWith("P1") || pa === "Q1" || pa === "Q1v" || pa === "Q3";
  const vet = ["P3", "P4", "P4b", "P4c", "P5", "P5i", "P5t", "Q4", "Q4b", "C"].includes(pa);
  const vis = {
    veroC: cocina || pa === "Q2", vero: pa === "P2" || (vet && pa !== "P3" && pa !== "C" && pa !== "P5t" && pa !== "P5i"),
    ines: vet && pa !== "P5t", bruno: pa === "P3" || pa === "P4" || pa === "P4c" || pa === "Q2" || pa === "Q4" || pa === "C",
    toto: cocina || pa === "Q2" || (vet && pa !== "C" && pa !== "P5i" && (p2 || pa !== "P3")), senora: pa === "P2",
  };
  veroC.raiz.visible = vis.veroC; vero.raiz.visible = vis.vero; ines.raiz.visible = vis.ines; bruno.raiz.visible = vis.bruno; toto.raiz.visible = vis.toto; senora.raiz.visible = vis.senora;
  if (vis.toto) { toto.poner(poseToto(t)); toto.panuelo.visible = false; toto.curita.visible = false; toto.chapita(p2 ? 0x5ce611 : 0xefeee5); toto.chapitaM.visible = true; }
  if (vis.veroC) veroC.poner(poseVeroC(t));
  if (vis.vero) vero.poner(pa === "P2" ? poseVeroS(t) : poseVeroV(t));
  if (vis.ines) ines.poner(poseInes(t));
  if (vis.bruno) bruno.poner(poseBruno(t));
  if (vis.senora) senora.poner({ x: SENORA_S.x, z: SENORA_S.z, giro: Math.PI - 0.3, ...aC(-0.2, 0.25), ...CARA.neutra, ...BRAZOS.costado, manoD: [-0.2, 0.3, 0.35], t });
  // ---- cámara ----
  if (pl[2]) ponerCam(catmull(pl[2], t), t);
  if (VER && VER.startsWith("cam:")) ponerCam(VER.slice(4).split(",").map(Number), t);
  if (window.__cam) ponerCam(window.__cam, t);
  camera.updateMatrixWorld(true);
  ponerObjetos(t);
  // ---- insertos ----
  const INS = { P1c: INS_CERR, Q1c: INS_CHAT, Q1t: INS_FICHA, Q1s: INS_TIENDA, Q5: INS_PANEL }[pa];
  for (const I of INSERTOS) I.g.visible = I === INS;
  if (INS) {
    ponerCam([0, 1.5, 3, 0, 1.5, 0, 50], t); camera.updateMatrixWorld(true);
    const k = sg(t, pl[1], pl[1] + 1.2), kk = halfK();
    INS.g.position.set(0, 0, -1); INS.g.scale.setScalar(kk * PXK * lerp(1.0, 1.03, eo(k)));
  }
  for (const p of TODOS) if (p.ojoLejano && p.raiz.visible) p.ojoLejano(camera.position);
  // ---- portada (VER=portada): el cuadro 0 limpio ----
  // ---- tarjetas ----
  AVISOS.length = 0;
  for (const k in GL) { if (Array.isArray(GL[k])) GL[k].forEach((g) => (g.visible = false)); else GL[k].visible = false; }
  for (const g of GUIAS) g.visible = false;
  if (!LIMPIO && !en(tIn, P1, P2)) tarjetas(t);
  renderer.render(scene, camera);
}
function tarjetas(t) {
  const ent = (ti) => (t < ti ? 0 : 0.75 + 0.25 * bk(sg(t, ti, ti + 0.18)));
  const pa = planoActual;
  // P1: el chip del día debajo de "VETERINARIAS" (HTML, y 150-370)
  if (pa === "P1" || pa === "P1b") {
    ponerGlobo(GL.dom, 300, 470, 1, null);
    if (t >= T.v1 && t < T.cel) hablar(GL.v1, veroC, ent(T.v1), 2, 40);
    if (t >= T.v2) { verGlobo(GL.v2, t >= T.v2 + 0.55 ? 99 : 2); hablar(GL.v2, veroC, ent(T.v2), 2, 40); }
  }
  if (pa === "P2") {
    const m = T.mes.filter((x) => t >= x).length;
    if (m === 0) ponerGlobo(GL.dom2, 300, 200, 1, null);
    else ponerGlobo(GL.meses[m - 1], 540, 250, ent(T.mes[m - 1]), null, 1);
    if (t >= T.carro + 0.05 && m === 0) { const [bx, by] = objPx(BOLSA_SUP, V3(0, 0.5, 0)); ponerGlobo(GL.rSup, 300, 1500, ent(T.carro + 0.05), null, 1); ponerGuia(GUIAS[0], 300, 1500 - GL.rSup.userData.H / 2, bx, by, eo(sg(t, T.carro + 0.05, T.carro + 0.3))); }
    if (m > 0) ponerContador(t, 540, 1560, 1);
  }
  if (pa === "P3") ponerGlobo(GL.feb, 220, 200, 1, null);
  if (pa === "P4" || pa === "P4b") {
    if (pa === "P4" && t >= T.i1) hablar(GL.i1, ines, ent(T.i1), 1, 0);
    if (pa === "P4b" && t >= T.v3) { verGlobo(GL.v3, t >= T.v3 + 1.72 ? 99 : 3); hablar(GL.v3, vero, ent(T.v3), 1, 0); }
  }
  if (pa === "P4c") {
    ponerGlobo(GL.r1, 760, 330, ent(T.rot[0]), null, 1);
    const [tx, ty] = objPx(TORRE, V3(0, 1.0, 0.3));
    const y2 = 1520; ponerGlobo(GL.r2, 600, y2, ent(T.rot[1]), null, 1); if (t >= T.rot[1]) ponerGuia(GUIAS[0], 600 - GL.r2.userData.W / 2 + 40, y2 - GL.r2.userData.H / 2, tx, ty, eo(sg(t, T.rot[1], T.rot[1] + 0.25)));
  }
  if (pa === "P5" && t >= T.v4) hablar(GL.v4, vero, ent(T.v4), 1, 0);
  if (pa === "Q1") ponerGlobo(GL.jue, 300, 200, 1, null);
  if (pa === "Q1c") ponerGlobo(GL.rRec, 540, 190, 1, null, 1);
  if (pa === "Q1v" && t >= T.v5) hablar(GL.v5, veroC, ent(T.v5), 1, 0);
  if (pa === "Q1t") ponerGlobo(GL.rFicha, 540, 200, 1, null, 1);
  if (pa === "Q1s") ponerGlobo(GL.rTienda, 540, 190, 1, null, 1);
  if (pa === "Q2") { ponerGlobo(GL.vie, 300, 200, 1, null); if (t >= T.b1) hablar(GL.b1, bruno, ent(T.b1), 1, 0); }
  if (pa === "Q3") ponerGlobo(GL.domQ, 300, 200, 1, null);
  if (pa === "Q4" || pa === "Q4b") {
    if (pa === "Q4") ponerGlobo(GL.febQ, 220, 200, 1, null);
    if (pa === "Q4" && t >= T.i1b) hablar(GL.i1b, ines, ent(T.i1b), 1, 0);
    if (pa === "Q4b" && t >= T.v6) { verGlobo(GL.v6, t >= T.v6 + 1.6 ? 99 : 3); hablar(GL.v6, vero, ent(T.v6), 1, 0); }
  }
  if (pa === "Q5") ponerGlobo(GL.rPanel, 540, 200, 1, null, 1);
}

window.__tresRender = renderAt;
window.addEventListener("hf-seek", (e) => renderAt(e.detail.time));
window.__tresDbg = (t) => { renderAt(t); return { plano: planoActual, avisos: AVISOS.slice() }; };
renderAt(window.__hfThreeTime || 0);
if (window.__tresListo) window.__tresListo();
