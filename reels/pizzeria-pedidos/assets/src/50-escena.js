
// ===== 50-escena.js: lugares, cámara (PLANOS con Catmull-Rom), poses, objetos en el tiempo, tarjetas y render =====
// lugares en coordenadas LOCALES del módulo de pizzería (enT = Don Tano, enL = Lucía, el mismo módulo girado 180°)
const MZ = LOC.MZ;
const DUENO = { x: -0.1, z: MZ - 0.62 };                  // Tano / Lucía detrás del mostrador
const COMANDA = V3(-0.34, LOC.MA + 0.001, MZ - 0.12);       // el talonario
const CEL_M = V3(0.52, LOC.MA, MZ - 0.06);                  // el celular del mostrador (contra el servilletero)
const GANCHO_P = V3(0.98, LOC.MA, MZ - 0.14);
const CAJA_MO = V3(0.18, LOC.MA + 0.002, MZ + 0.1);        // donde Facu apoya la caja
const FACU_M = { x: 1.15, z: MZ + 0.6 };                   // Facu frente al mostrador
const IMP_P = V3(-0.86, LOC.MA, MZ - 0.06);                 // la impresora de Lucía (donde Tano tiene la comanda... en espejo)
const RIEL_P = V3(0.95, 1.45, MZ - 0.3);                    // el riel de tickets (donde Tano tiene el gancho)
const TAB_P = V3(0.78, LOC.MA, MZ + 0.04);                  // la tablet de Lucía
const SABRI_L = { x: 1.15, z: MZ + 1.15 };                  // Sabri en el local de Lucía (Q3)
const MESA_M = V3(PX2 - 0.95, 0.9, PZ2 + 0.75);         // la consola al lado de la puerta de Martín (Q4)
const LIV_M = { x: LX + 0.05, z: -0.7 };                // Martín en el sillón
// la consola del hall de Martín (donde abre la caja: el mismo encuadre que el mostrador de P4)
{ const g = new THREE.Group(); g.position.set(MESA_M.x, 0, MESA_M.z); g.add(caja(0.9, 0.04, 0.45, M.cr, 0, 0.88, 0, 0.01)); g.add(caja(0.86, 0.8, 0.4, M.navy2, 0, 0.44, 0, 0.012)); scene.add(sombras(g)); }
// el cliente que espera sentado en el local de Lucía (Q1, de fondo, sin voz)
const SILLA = new THREE.Group(); { SILLA.add(caja(0.42, 0.05, 0.42, M.cr, 0, 0.46, 0, 0.01)); for (const [a, b] of [[-0.18, -0.18], [0.18, -0.18], [-0.18, 0.18], [0.18, 0.18]]) SILLA.add(caja(0.04, 0.45, 0.04, M.navy3, a, 0.225, b, 0.006)); SILLA.position.copy(enL(-1.85, 0, -1.0)); scene.add(sombras(SILLA)); }
const CLIENTE = crearPersonaje({ ...DEFECTO, nombre: "Cliente", piel: PIEL.media, pelo: PELO.negro, peinado: "corto", camisa: MARCA.navy3, mangas: "largas", pantalon: 0x3a3f4a, parpadeoCada: 999 }); scene.add(CLIENTE.raiz);
// ---- poner los objetos fijos de cada local ----
const ponerL = (o, p, ry = 0, loc = "T") => { if (loc === "T") { o.position.copy(p); o.rotation.y = ry; } else { o.position.copy(enL(p.x, p.y, p.z)); o.rotation.y = ry + PI; } };
ponerL(TALON, COMANDA, 0.12); ponerL(GANCHO, GANCHO_P, 0);
ponerL(SERV, V3(CEL_M.x + 0.02, LOC.MA, CEL_M.z - 0.08), 0);
ponerL(IMP, IMP_P, 0.25, "L"); ponerL(RIEL, RIEL_P, 0, "L"); ponerL(tabletL, TAB_P, -0.2, "L");
// las manchas de harina en el mostrador de Tano (planas)
{ const hm = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1, transparent: true, opacity: 0.8, depthWrite: false }); for (const [x, z, r] of [[-0.75, -2.7, 0.09], [-0.6, -2.55, 0.05], [0.2, -2.82, 0.07], [-0.05, -2.5, 0.04]]) { const m = mesh(new THREE.CircleGeometry(r, 16), hm, x, LOC.MA + 0.002, z); m.rotation.x = -PI / 2; m.scale.y = 0.7; m.castShadow = false; scene.add(m); } }
// el ticket #47 que cuelga del riel después de Q3, y el que va en la mano de Lucía
const TK_MANO = plano(0.08, 0.14, ticketT, 0, 0, 0); TK_MANO.material.side = THREE.DoubleSide; scene.add(TK_MANO);
const TK_RIEL = plano(0.08, 0.14, ticketT, 0, 0, 0); scene.add(TK_RIEL); { const p = enL(RIEL_P.x + 0.27, RIEL_P.y - 0.075, RIEL_P.z + 0.02); TK_RIEL.position.copy(p); TK_RIEL.rotation.y = PI; }

// =====================================================================================================
// CÁMARA: PLANOS [nombre, desde, claves | null (inserto)]; cada clave [t, px, py, pz, mx, my, mz, fov] en el MUNDO
// =====================================================================================================
const wT = (px, py, pz, mx, my, mz, fov) => [px, py, pz, mx, my, mz, fov];
const wL = (px, py, pz, mx, my, mz, fov) => { const a = enL(px, py, pz), b = enL(mx, my, mz); return [a.x, a.y, a.z, b.x, b.y, b.z, fov]; };
const off = (k, d) => k.map((v, i) => v + (d[i] ?? 0));
const K_P1 = globalThis.__KP1 || [0.42, 1.66, -0.75, -0.02, 1.38, -3.4, 47];         // el cuadro 0 (local): desde el lado del cliente
const K_P2B = [0.3, 1.35, -1.6, 0.18, 1.1, -3.0, 58];   // (r3) Tano y el celular llenan el cuadro
const K_P3 = [-1.4, 1.8, -3.0, 1.0, 1.25, -2.0, 56];                                  // sobre el hombro de Tano, hacia la puerta
const K_P3B = [-0.3, 1.45, -1.55, -0.08, 1.3, -3.4, 52];   // (r3) más abierto: Tano entero en cuadro                               // contraplano: Tano de frente
const K_P4 = [0.35, 1.95, -1.1, 0.1, 1.05, -3.1, 54];                                  // los dos sobre la caja
const K_P4B = [-0.55, 1.95, -3.1, 0.2, 0.82, -2.6, 48];   // (r3) desde el lado de Tano: la mano de Facu agarra la porción de lejos                                 // la caja de cerca (desde arriba)
const K_P4C = [0.55, 1.72, -0.4, 0.5, 1.18, -2.8, 68];   // (r3) la cabeza de Facu lejos del borde
const K_Q3 = [-0.48, 1.2, -2.27, -0.86, 1.0, -2.81, 40.0];                                // la impresora de cerca (local de Lucía)
const K_Q3B = [0.45, 1.52, -1.3, 0.1, 1.25, -3.25, 50.0];
const K_Q3T = [0.79, 1.3, -2.12, 0.78, 1.0, -2.73, 40];                               // la tablet (tablero)
const K_Q3S = [-0.4, 1.55, -0.4, 1.2, 1.15, -1.75, 60];
const K_Q5 = [0.79, 1.3, -2.12, 0.78, 1.0, -2.73, 40];                                  // la tablet (panel)
const K_C = [0.05, 1.5, -0.85, -0.08, 1.22, -3.4, 42];                                 // Lucía a cámara
const PLANOS = [
  ["P1", 0, [[0, ...wT(...K_P1)], [T.p1i, ...wT(...off(K_P1, [-0.12, -0.03, -0.3]))]]],
  ["P1i", T.p1i, null],
  ["P2", T.p2, null],
  ["P2b", T.p2b, [[T.p2b, ...wT(...off(K_P2B, [0.15, 0.08, 0.2]))], [T.p3, ...wT(...K_P2B)]]],
  ["P3", T.p3, [[T.p3, ...wT(...off(K_P3, [0, 0, 0, 0.4, -0.05, 1.2]))], [T.f1, ...wT(...K_P3)], [T.p3b, ...wT(...off(K_P3, [0.05, 0, 0.12, 0, 0, 0, -3]))]]],
  ["P3b", T.p3b, [[T.p3b, ...wT(...K_P3B)], [T.p3i, ...wT(...off(K_P3B, [0, 0, -0.1, 0, 0, 0, -2]))]]],
  ["P3i", T.p3i, null],
  ["P3c", T.p3c, [[T.p3c, ...wT(...off(K_P3B, [0.1, 0.15, 0.25, 0, -0.18, 0, 12]))], [T.p4, ...wT(...off(K_P3B, [0.1, 0.15, 0.15, 0, -0.18, 0, 10]))]]],
  ["P4", T.p4, [[T.p4, ...wT(...K_P4)], [T.p4b, ...wT(...off(K_P4, [-0.1, -0.03, -0.12]))]]],
  ["P4b", T.p4b, [[T.p4b, ...wT(...K_P4B)], [T.p4i, ...wT(...off(K_P4B, [0, 0.05, 0.08]))]]],
  ["P4i", T.p4i, null],
  ["P4c", T.p4c, [[T.p4c, ...wT(...K_P4C)], [P1, ...wT(...off(K_P4C, [-0.05, 0, -0.12, 0, 0, 0, -2]))]]],
  // ---- parte 2 ----
  ["Q1", P2, [[P2, ...wL(-0.78, 2.35, 4.6, -0.78, 2.55, 0, 50)], [T.q1in, ...wL(-0.78, 2.3, 3.9, -0.78, 2.5, 0, 50)]]],   // (r2) la fachada de Lucía llena el cuadro
  ["Q1b", T.q1in, [[T.q1in, 0.35, 1.95, 10.55, 0.35, 1.05, 12.1, 60], [T.q2, 0.35, 1.95, 10.63, 0.35, 1.05, 12.1, 59]]],   // (r3) sobre el mostrador: Lucía entera, la impresora, sin franja vacía
  ["Q2", T.q2, [[T.q2, LX + 1.05, 1.28, 1.55, LX - 0.05, 0.92, -0.75, 46], [T.q2i, LX + 0.95, 1.26, 1.35, LX - 0.05, 0.94, -0.75, 44]]],
  ["Q2i", T.q2i, null],
  ["Q2b", T.q2b, [[T.q2b, LX + 1.1, 1.45, 2.1, LX + 0.0, 1.02, -0.75, 46], [T.q3, LX + 1.05, 1.45, 2.0, LX + 0.0, 1.03, -0.75, 44]]],
  ["Q3", T.q3, [[T.q3, ...wL(...K_Q3)], [T.q3b, ...wL(...off(K_Q3, [0.02, 0.02, 0.06, 0, 0.03, 0, 0]))]]],
  ["Q3t", T.q3t, [[T.q3t, -0.61, 1.26, 10.95, -0.76, 0.92, 11.71, 42], [T.q3s, -0.61, 1.26, 10.99, -0.76, 0.92, 11.71, 41]]],   // (r3) el tablero entero y centrado
  ["Q3s", T.q3s, [[T.q3s, ...wL(...K_Q3S)], [T.q4, ...wL(...off(K_Q3S, [0, 0, -0.1]))]]],
  ["Q4", T.q4, [[T.q4, PX2 + 0.55, 1.55, PZ2 + 2.7, PX2 - 0.05, 1.3, PZ2 - 0.6, 48], [T.q4b, PX2 + 0.52, 1.55, PZ2 + 2.55, PX2 - 0.05, 1.3, PZ2 - 0.6, 47]]],
  ["Q4b", T.q4b, [[T.q4b, MESA_M.x + 0.05, 1.8, MESA_M.z + 2.6, MESA_M.x + 0.25, 1.05, MESA_M.z, 46], [T.q4i, MESA_M.x + 0.05, 1.8, MESA_M.z + 2.45, MESA_M.x + 0.25, 1.05, MESA_M.z, 46]]],
  ["Q4i", T.q4i, null],
  ["Q4c", T.q4c, [[T.q4c, MESA_M.x - 0.15, 1.6, MESA_M.z + 2.3, MESA_M.x + 0.45, 1.3, MESA_M.z + 0.05, 44], [T.q5, MESA_M.x - 0.15, 1.6, MESA_M.z + 2.15, MESA_M.x + 0.45, 1.31, MESA_M.z + 0.05, 41]]],
  ["Q5", T.q5, [[T.q5, -0.61, 1.26, 10.95, -0.76, 0.92, 11.71, 42], [T.q5b, -0.61, 1.26, 10.99, -0.76, 0.92, 11.71, 41]]],   // (r3) el panel entero y centrado
  ["Q5b", T.q5b, [[T.q5b, 3.0, 1.8, 0.15, 0.0, 1.95, 9.0, 52], [T.q5c, 2.95, 1.8, 0.2, 0.0, 1.95, 9.0, 50]]],   // (r3) la fachada de Lucía entera, Tano chico a la derecha
  ["Q5c", T.q5c, [[T.q5c, 0.9, 1.5, 9.55, 1.95, 1.62, 1.72, 18], [T.c, 0.9, 1.5, 9.55, 1.95, 1.66, 1.72, 16]]],   // (r3) se ve la puerta y el toldo de su local
  ["C", T.c, [[T.c, ...wL(...K_C)], [DUR, ...wL(...off(K_C, [0, 0, -0.12, 0, 0, 0, -2]))]]],
];
for (let i = PLANOS.length - 2; i >= 0; i--) { const d = PLANOS[i + 1][1] - PLANOS[i][1]; if (d < 0.3) console.error(`plano corto: ${PLANOS[i][0]} (${d.toFixed(2)} s)`); }
// Q1 · la grúa que cruza la calle: mira la fachada de Don Tano, sube hasta ver la calle desde arriba, gira 180° en el aire
// y baja hacia la vidriera de Lucía hasta el encuadre de P1 en espejo (orientaciones con slerp; nada de pantalla vacía)
const _mt = new THREE.Matrix4();
const oriQ = (pos, mira, up) => { _mt.lookAt(pos, mira, up); return new THREE.Quaternion().setFromRotationMatrix(_mt); };
const Q1K = (() => {
  const fin = wL(...off(K_P1, [0.0, 0.05, 0.45])), fin2 = wL(...off(K_P1, [-0.1, -0.02, -0.1]));
  const k = (t, p, m, up, fov) => ({ t, p: V3(...p), q: oriQ(V3(...p), V3(...m), V3(...up)), fov });
  return [
    k(P2, [0.2, 1.95, 8.2], [0.0, 2.0, 0.0], [0, 1, 0], 62),
    k(r2(P2 + 0.55), [1.0, 4.8, 4.4], [1.0, 0, 4.5], [0, 0, -1], 66),
    k(r2(P2 + 0.8), [1.1, 4.7, 4.5], [1.1, 0, 4.5], [1, 0, 0], 66),
    k(r2(P2 + 1.05), [1.2, 4.5, 4.6], [1.2, 0, 4.72], [0, 0, 1], 64),
    k(T.q1m, [0.08, 2.0, 2.2], [0.07, 1.85, 9.0], [0, 1, 0], 66),
    k(T.q1f, [0.08, 1.98, 2.5], [0.07, 1.85, 9.0], [0, 1, 0], 64),
    k(T.q1in, [0.08, 1.98, 2.55], [0.07, 1.85, 9.0], [0, 1, 0], 64),
  ];
})();
const _qq = new THREE.Quaternion();
function camQ1(t) {
  let i = 0; while (i + 1 < Q1K.length - 1 && Q1K[i + 1].t <= t) i++;
  const a = Q1K[i], b = Q1K[i + 1], u = sg(t, a.t, b.t), ue = i === 0 ? eio(u) * 0.5 + u * 0.5 : u;
  const pts = Q1K.map((k) => k.p), cr = new THREE.CatmullRomCurve3(pts);
  const g = (i + ue) / (Q1K.length - 1);
  camera.position.copy(cr.getPoint(g));
  _qq.slerpQuaternions(a.q, b.q, eio(u)); camera.quaternion.copy(_qq);
  camera.fov = lerp(a.fov, b.fov, eio(u)); camera.updateProjectionMatrix();
}
const _m = new THREE.Vector3();
let planoActual = "P1";
function catmull(CAM, t) {
  let i = 0; while (i + 1 < CAM.length - 1 && CAM[i + 1][0] <= t) i++;
  const a = CAM[i], b = CAM[i + 1] || a;
  const u = eio(sg(t, a[0], b[0])) * 0.35 + sg(t, a[0], b[0]) * 0.65;
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
// =====================================================================================================
// POSES
// =====================================================================================================
const aC = (giro = 0, asiente = 0, ladea = 0.03) => ({ cabeza: { giro, asiente, ladea }, ojos: { x: giro * 0.6, y: -asiente * 0.8, abiertos: 0.95 } });
const BUENA = { ...CARA.sonrisa, ojos: { abiertos: 1, feliz: 0.35 }, boca: { sonrisa: 0.75, abierta: 0, ancho: 1.1 } };
const VENDEDOR = { ...CARA.sonrisa, ojos: { abiertos: 1, feliz: 0.5 }, cejas: { alto: 0.55, ang: 0.0 }, boca: { sonrisa: 1, abierta: 0.1, ancho: 1.2 } };
const APURADO = { ...CARA.concentrada, ojos: { abiertos: 0.85, y: -0.6 }, cejas: { alto: 0.2, ang: 0.35 } };
const QUIETO = { ...CARA.neutra, ojos: { abiertos: 0.9, y: -0.5 }, cejas: { alto: 0.05, ang: 0.2 }, boca: { sonrisa: -0.1, abierta: 0, ancho: 0.95 } };
const MEDIA = { ...CARA.neutra, ojos: { abiertos: 0.75, feliz: 0.2 }, cejas: { alto: 0.3, ang: 0.5, asim: 0.4 }, boca: { sonrisa: 0.35, abierta: 0, ancho: 1.05 } };
const CURIOSO = { ...CARA.esperanza, ojos: { abiertos: 1, feliz: 0.1 }, cejas: { alto: 0.6, ang: 0.25, asim: 0.5 }, boca: { sonrisa: 0.3, abierta: 0, ancho: 0.95 } };
const FELIZ = { ...CARA.sonrisa, ojos: { abiertos: 1, feliz: 0.45 }, boca: { sonrisa: 0.95, abierta: 0.05, ancho: 1.15 } };
const ELOGIO = { ...CARA.sonrisa, ojos: { abiertos: 1, feliz: 0.45 }, cejas: { alto: 0.75, ang: 0.0, asim: 0.3 }, boca: { sonrisa: 1, abierta: 0.12, ancho: 1.15 } };
const bocaVoz = (p, t, t0, env, k = 0.7) => {
  if (t >= t0 && t < t0 + env.length / 30) { const i = Math.floor((t - t0) * 30), f = (t - t0) * 30 - i; const e = lerp(env[i] ?? 0, env[i + 1] ?? 0, f); p.boca.abierta = Math.max(p.boca.abierta, cl(e * 1.1 - 0.05) * k); p.boca.sonrisa = Math.min(p.boca.sonrisa, 0.5); }
  if (t >= t0 - 0.05 && t < t0 + env.length / 30 + 0.05) p.ojos.abiertos = Math.max(p.ojos.abiertos, 0.85);   // hablando, nunca con los ojos cerrados
};
const manoMundo = (per, lado, out = new THREE.Vector3()) => { per.raiz.updateMatrixWorld(true); return per.brazos[lado === "I" ? 0 : 1].mano.getWorldPosition(out); };
function aCuerpo(per, p, w) { per.poner(p); per.raiz.updateMatrixWorld(true); const v = per.cuerpo.worldToLocal(w.clone()); return [v.x, v.y, v.z]; }
const dirGiro = (x0, z0, x1, z1) => Math.atan2(x1 - x0, z1 - z0);
const toW = (per, local) => { per.raiz.updateMatrixWorld(true); return per.cuerpo.localToWorld(V3(...local)); };
function manoA(per, p, lado, w, k, codo = null) { if (k <= 0) return; const m = aCuerpo(per, p, w); const key = lado === "I" ? "manoI" : "manoD"; p[key] = p[key].map((v, i) => lerp(v, m[i], eio(cl(k)))); if (codo) p[lado === "I" ? "codoI" : "codoD"] = codo; }
const _a = new THREE.Vector3(), _b = new THREE.Vector3(), _q = new THREE.Quaternion();
const LADEA_TEL = globalThis.__LT ?? -0.38;   // la cabeza ladeada hacia el hombro izquierdo (el del celular)
// ---- Tano ----
function poseTano(t, pa) {
  if (t >= P2) {
    // (r3) Q5b: de 3/4, sigue la moto con la cabeza · Q5b: en la puerta de su pizzería, del lado de la vereda, la caja vacía bajo el brazo; mira enfrente, curioso
    const p = poseEn(t, [[0, { x: 1.95, y: 0.14, z: 1.72, giro: -0.15, ...aC(-0.05, -0.05, 0.06), ...CURIOSO, ...BRAZOS.costado, manoI: [0.3, 0.12, 0.12], codoI: [1, -0.4, -0.2] }], [T.q5b - 0.01, { giro: 0.8, ...aC(0.25, -0.05, 0.06) }, 0.01], [T.q5c - 0.05, { giro: 0.7, ...aC(0.2, -0.05, 0.06) }, 0.75], [T.q5c, { giro: -0.15, ...aC(-0.05, -0.05, 0.06) }, 0.04], [T.t6 + LEN.t6, { ...aC(0.0, -0.08, 0.1), ...CURIOSO, cejas: { alto: 0.75, ang: 0.3, asim: 0.6 } }, 0.4]]);
    p.t = t; bocaVoz(p, t, T.t6, ENV.t6, 0.6); return p;
  }
  const L = { x: DUENO.x, z: DUENO.z };
  if (t < T.p2) {
    // P1: escribe con la derecha, el bollo en la izquierda, el celular entre la oreja y el hombro izquierdo
    const p = poseEn(t, [
      [0, { ...L, giro: -0.28, ...aC(-0.12, 0.42, LADEA_TEL), ...APURADO, ...BRAZOS.costado, manoI: [0.34, 0.36, 0.3], codoI: [0.9, -0.6, -0.2] }],
      [T.t1 + W2_.t1, { ...aC(0.12, 0.2, LADEA_TEL), ...CARA.sorpresa, boca: { sonrisa: 0, abierta: 0.1, ancho: 0.8 }, cejas: { alto: 0.7, ang: 0.3 } }, 0.2],   // "¿Calle qué?"
      [T.m1 + 0.3, { ...aC(-0.1, 0.45, LADEA_TEL), ...APURADO }, 0.25],
      [T.t2 + 0.2, { ...aC(0.2, 0.3, LADEA_TEL), ...APURADO, ojos: { abiertos: 0.9, y: -0.2, x: 0.3 } }, 0.25],
    ]);
    const u = t < T.esc2[0] ? sg(t, T.esc1[0], T.esc1[1]) : sg(t, T.esc2[0], T.esc2[1]);
    const escribe = (t >= T.esc1[0] && t < T.esc1[1]) || (t >= T.esc2[0] && t < T.esc2[1]);
    const w = COMANDA.clone().add(V3(-0.03 + 0.09 * ((u * 3) % 1), 0.04, 0.05 - 0.04 * Math.floor(u * 3) / 3)); if (escribe) w.x += Math.sin(t * 38) * 0.005;
    manoA(tano, p, "D", w, 1, [-0.8, -0.6, -0.3]);
    p.t = t; bocaVoz(p, t, T.t1, ENV.t1, 0.65); bocaVoz(p, t, T.t2, ENV.t2, 0.65); return p;
  }
  if (t < T.p3) {
    // P2b: se agacha al celular del mostrador con la masa estirada colgando de la izquierda; el índice en el micrófono
    const p = poseEn(t, [
      [0, { ...L, giro: 0.35, inclina: 0.22, ...aC(0.1, 0.3, 0.05), ...VENDEDOR, ...BRAZOS.costado, manoI: [0.44, 0.66, 0.26], codoI: [1, -0.3, -0.2] }],
    ]);
    const cel = CEL_M.clone().add(V3(0, 0.045, 0.03));
    manoA(tano, p, "D", cel, 1, [-0.8, -0.5, -0.2]); p.dedoD = 1;
    p.t = t; bocaVoz(p, t, T.t3, ENV.t3, 0.75); return p;
  }
  if (t < T.p4) {
    // P3: de espaldas (vemos entrar a Facu); P3b: de frente, la cara cae; P3c: mira la caja, quieto
    const p = poseEn(t, [
      [0, { ...L, giro: 0.15, ...aC(0.25, 0.1), ...CARA.neutra, ...BRAZOS.apoyado }],
      [T.f1 + W2_.f1, { ...aC(0.3, 0.05), ...CARA.sorpresa, boca: { sonrisa: 0, abierta: 0.0, ancho: 0.75 } }, 0.2],
      [T.p3c, { giro: 0.05, ...aC(0.05, 0.42, 0.0), ...QUIETO }, 0.35],
    ]);
    p.t = t; return p;
  }
  if (t < T.p4c) {
    // P4: abre la tapa con la derecha · "Cenamos." resignado con media sonrisa
    const p = poseEn(t, [
      [0, { ...L, giro: 0.15, ...aC(0.05, 0.42, 0.0), ...QUIETO, ...BRAZOS.apoyado }],
      [T.t4, { ...aC(0.35, 0.1, 0.08), ...MEDIA }, 0.25],
      [T.p4b + 0.3, { ...aC(0.1, 0.4, 0.0), ...BUENA }, 0.3],
    ]);
    const u = eio(sg(t, T.abre[0], T.abre[1]));
    if (t < T.abre[1] + 0.3) { CAJA_T.updateMatrixWorld(true); const w = CAJA_T.userData.bis.localToWorld(V3(0, 0.0, CAJA_T.userData.L * 0.96)); manoA(tano, p, "D", w, 1 - sg(t, T.abre[0] + 0.2, T.abre[0] + 0.42), [-0.8, -0.6, -0.3]); }
    p.t = t; bocaVoz(p, t, T.t4, ENV.t4, 0.6); return p;
  }
  // P4c: la porción en la boca (izquierda), el celular en la derecha cerca de la cara grabando el audio, masticando
  const p = poseEn(t, [[0, { ...L, giro: 0.2, ...aC(0.12, 0.05, 0.05), ...VENDEDOR, ojos: { abiertos: 1, feliz: 0.55 }, ...BRAZOS.costado }]]);
  manoA(tano, p, "I", toW(tano, [0.06, 0.66, 0.36]), 1, [0.9, -0.6, -0.1]);
  manoA(tano, p, "D", toW(tano, [-0.2, 0.52, 0.36]), 1, [-0.9, -0.6, -0.1]);
  const mast = 0.12 + 0.1 * Math.abs(Math.sin(t * 9));
  p.boca.abierta = mast; p.boca.sonrisa = 0.2; p.t = t; bocaVoz(p, t, T.t5, ENV.t5, 0.35); return p;
}
const W2_ = T.W2;
// ---- Facu ----
function poseFacu(t, pa) {
  const u = sg(t, T.entra[0], T.entra[1]);
  const x0 = (LOC.PX0 + LOC.PX1) / 2, z0 = 0.35;
  const anda = u > 0.01 && u < 0.99;
  const x = lerp(x0, FACU_M.x, eio(u)), z = lerp(z0, FACU_M.z, eio(u));
  const gT = dirGiro(FACU_M.x, FACU_M.z, DUENO.x, DUENO.z);
  if (t < T.p4b) {
    const p = poseEn(t, [
      [0, { x, z, giro: anda ? dirGiro(x0, z0, FACU_M.x, FACU_M.z) : gT, paso: anda ? 1 : 0, ...aC(0.0, 0.05), ...CARA.neutra, ojos: { abiertos: 0.8 }, cejas: { alto: 0.1, ang: 0.4 }, ...BRAZOS.costado }],
      [T.f1 + 0.1, { ...aC(0.0, 0.0), ...CARA.neutra, ojos: { abiertos: 0.85 }, cejas: { alto: 0.2, ang: 0.5 } }, 0.2],
      [T.p4 + 0.5, { ...aC(-0.2, 0.3), ...CARA.sonrisa }, 0.3],
    ]);
    Object.assign(p, { x, z, giro: anda ? dirGiro(x0, z0, FACU_M.x, FACU_M.z) : gT, paso: anda ? 1 : 0 });
    // las manos a los costados de la caja (mientras la trae)
    const b = cajaFacuEn(t);
    if (b.k > 0) { CAJA_T.updateMatrixWorld(true); const L = CAJA_T.userData.L; manoA(facu, p, "I", CAJA_T.localToWorld(V3(L / 2 + 0.01, 0.0, 0.05)), b.k, [0.8, -0.6, -0.2]); manoA(facu, p, "D", CAJA_T.localToWorld(V3(-L / 2 - 0.01, 0.0, 0.05)), b.k, [-0.8, -0.6, -0.2]); }
    p.t = t; bocaVoz(p, t, T.f1, ENV.f1, 0.6); return p;
  }
  // P4b/P4c: sin el casco (en la izquierda), la porción en la derecha a mitad de camino; mira a Tano
  const p = poseEn(t, [[0, { x: 0.72, z: MZ + 0.6, giro: -0.95, ...aC(-0.25, 0.1), ...CARA.sonrisa, ...BRAZOS.costado, manoI: [0.3, 0.1, 0.18] }], [T.t5, { ...aC(-0.3, 0.0), ...CARA.incredula, ojos: { abiertos: 0.9, x: -0.9 }, cejas: { alto: 0.5, ang: 0.2, asim: 0.8 } }, 0.25]]);
  const kl = eio(sg(t, T.levanta[0], T.levanta[1]));
  CAJA_T.updateMatrixWorld(true);
  const desde = CAJA_T.localToWorld(V3(0.04, 0.03, 0.12)), hasta = toW(facu, [-0.08, 0.5, 0.38]);
  manoA(facu, p, "D", desde.clone().lerp(hasta, kl).add(V3(0, 0.03, 0)), 1, [-0.8, -0.6, -0.2]);
  p.t = t; return p;
}
// la caja de Don Tano: en las manos de Facu (entrando) → en el mostrador
let PECHO_F = null;
function cajaFacuEn(t) {
  const u = sg(t, T.entra[0], T.entra[1]), x0 = (LOC.PX0 + LOC.PX1) / 2, z0 = 0.35;
  const x = lerp(x0, FACU_M.x, eio(u)), z = lerp(z0, FACU_M.z, eio(u)), g = dirGiro(FACU_M.x, FACU_M.z, DUENO.x, DUENO.z);
  const pecho = V3(x, 1.08, z).add(V3(Math.sin(g) * 0.4, 0, Math.cos(g) * 0.4));
  const k = sg(t, T.apoyaCaja - 0.5, T.apoyaCaja);   // (r3) más lento: sin el salto de perspectiva
  const pos = pecho.clone().lerp(CAJA_MO, eio(k)); pos.y += Math.sin(k * PI) * 0.05;
  return { pos, giro: 0.05, k: 1 - sg(t, T.apoyaCaja, T.apoyaCaja + 0.25) };
}
// ---- Lucía ----
function poseLucia(t, pa) {
  const g0 = PI;   // de frente a la vidriera (mundo)
  const L = enL(DUENO.x, 0, DUENO.z);
  if (pa === "C") {
    const p = poseEn(t, [[0, { x: L.x, z: L.z, giro: g0, ...aC(0.0, 0.03), ...CARA.sonrisa, ...BRAZOS.apoyado }], [T.l1 + 1.6, { ...aC(0.06, 0.0, 0.06), ...BUENA }, 0.6]]);
    p.t = t; bocaVoz(p, t, T.l1, ENV.l1, 0.55); return p;
  }
  if (pa === "Q1" || pa === "Q1b" || pa === "Q3" || pa === "Q3t" || pa === "Q5") {
    // estira la masa con las dos manos (el disco gira entre las manos), tranquila
    const p = poseEn(t, [[0, { x: L.x, z: L.z, giro: g0 - 0.1, ...aC(0.0, 0.48), ...CARA.sonrisa, ojos: { abiertos: 0.85, y: -0.9, feliz: 0.25 }, ...BRAZOS.costado }]]);
    const c = discoEn(t);
    manoA(lucia, p, "I", c.clone().add(V3(-0.15, 0.02, 0.0)), 1, [0.8, -0.6, -0.2]);
    manoA(lucia, p, "D", c.clone().add(V3(0.15, 0.02, 0.0)), 1, [-0.8, -0.6, -0.2]);
    p.t = t; return p;
  }
  // Q3b: corta el ticket de la impresora y lo cuelga en el riel
  const p = poseEn(t, [[0, { x: L.x, z: L.z, giro: g0 + 0.5, ...aC(0.2, 0.4), ...CARA.sonrisa, ojos: { abiertos: 0.9, feliz: 0.2, y: -0.6 }, ...BRAZOS.costado }], [T.cuelga[1], { giro: g0 - 0.55, ...aC(-0.25, 0.0) }, 0.45]]);
  manoA(lucia, p, "D", ticketManoEn(t), 1, [-0.8, -0.6, -0.2]);
  p.t = t; return p;
}
const discoEn = (t) => { const c = enL(DUENO.x, 0.98, DUENO.z + 0.45); c.y += Math.sin(t * 3.2) * 0.012; return c; };
function ticketManoEn(t) {
  const a = enL(IMP_P.x, IMP_P.y + 0.22, IMP_P.z + 0.04), b = enL(RIEL_P.x + 0.27, RIEL_P.y - 0.04, RIEL_P.z + 0.04);
  const u = eio(sg(t, T.cuelga[0], T.cuelga[1])); const p = a.clone().lerp(b, u); p.y += Math.sin(u * PI) * 0.12; return p;
}
// ---- Sabri ----
function poseSabri(t, pa) {
  if (pa === "Q3s") {
    const L = enL(SABRI_L.x, 0, SABRI_L.z);
    const p = poseEn(t, [[0, { x: L.x, z: L.z, giro: PI - 0.9, ...aC(-0.2, 0.12), ...CARA.sonrisa, ojos: { abiertos: 0.95, y: -1, feliz: 0.2 }, ...BRAZOS.celular, manoI: [0.075, 0.5, 0.34], manoD: [-0.075, 0.5, 0.34] }], [T.q4 - 0.25, { giro: PI - 1.6, ...aC(0.2, 0.1) }, 0.35]]);
    p.t = t; return p;
  }
  if (pa === "Q5" || pa === "Q5b") {
    // en la moto, saliendo (sentada, las manos en el manubrio)
    const m = motoSabriEn(t);
    const p = { x: m.x, y: 0.18, z: m.z + 0.05, giro: m.giro, sentado: 1, ...aC(0.1, 0.05), ...CARA.sonrisa, ...BRAZOS.costado, manoI: [0.28, 0.42, 0.42], manoD: [-0.28, 0.42, 0.42], codoI: [0.8, -0.5, -0.2], codoD: [-0.8, -0.5, -0.2], t };
    return p;
  }
  // Q4: en la puerta de Martín con la caja en las dos manos
  const p = poseEn(t, [[0, { x: PX2 + 0.05, z: PZ2 - 0.85, giro: 0.1, ...aC(-0.1, 0.05), ...FELIZ, ...BRAZOS.costado }], [T.s1 + W2_.s1, { ...aC(-0.2, 0.15), ...BUENA }, 0.3]]);
  const k = 1;   // (r3) las manos en la caja hasta el corte (no flota)
  const c = cajaSabriEn(t);
  CAJA_L.position.copy(c); CAJA_L.rotation.set(0, 0.1, 0); CAJA_L.updateMatrixWorld(true);
  const L = CAJA_L.userData.L;
  manoA(sabri, p, "I", CAJA_L.localToWorld(V3(L / 2 + 0.01, 0, 0.04)), k, [0.8, -0.6, -0.2]); manoA(sabri, p, "D", CAJA_L.localToWorld(V3(-L / 2 - 0.01, 0, 0.04)), k, [-0.8, -0.6, -0.2]);
  p.t = t; bocaVoz(p, t, T.s1, ENV.s1, 0.6); return p;
}
const cajaSabriEn = (t) => V3(PX2 + 0.05 + Math.sin(0.1) * 0.38, 1.08, PZ2 - 0.85 + Math.cos(0.1) * 0.38);
function motoSabriEn(t) { const u = eio(sg(t, T.moto, T.moto + 1.3)); return { x: lerp(2.6, -4.5, u), z: CALLE - 1.75, giro: -PI / 2 }; }   // (r2) Q5b: sale por la vereda de Lucía, detrás de todo (Tano la mira)   // (r1) se va hacia +x antes de Q5b (no pasa por delante de Tano)
// ---- Martín ----
function poseMartin(t, pa) {
  if (pa === "Q2" || pa === "Q2i" || pa === "Q2b") {
    const p = poseEn(t, [
      [0, { x: LIV_M.x, y: -0.04, z: LIV_M.z, giro: 0.2, sentado: 1, ...aC(0.0, 0.4), ...CARA.fastidio, ojos: { abiertos: 0.92, y: -0.9 }, ...BRAZOS.celular }],
      [T.ceja, { ...aC(0.0, 0.38), ...CARA.incredula, ojos: { abiertos: 0.8, y: -0.8 }, cejas: { alto: 0.2, ang: 0.0, asim: 1 } }, 0.2],
      [T.q2b, { ...aC(0.25, 0.15, 0.08), ...ELOGIO }, 0.15],
    ]);
    p.t = t; bocaVoz(p, t, T.m2, ENV.m2, 0.7); return p;
  }
  if (pa === "Q4") {
    // de 3/4 de espaldas, abre la puerta con la derecha
    const p = poseEn(t, [[0, { x: PX2 - 0.45, z: PZ2 + 0.5, giro: PI - 0.35, ...aC(0.1, 0.05), ...CARA.sonrisa, ...BRAZOS.costado }], [T.s1, { ...aC(0.15, 0.1), ...FELIZ }, 0.3]]);
    if (t < T.abreP + 0.4) { const w = PERILLA(t); manoA(martin, p, "D", w, sg(t, T.q4 - 0.1, T.abreP - 0.05) * (1 - sg(t, T.abreP + 0.05, T.abreP + 0.35)), [-0.8, -0.6, -0.2]); }
    p.t = t; return p;
  }
  // Q4b / Q4c: frente a la consola; la porción en la derecha y el celular en la izquierda; mira el celular, mira la pizza, muerde
  const p = poseEn(t, [
    [0, { x: MESA_M.x + 0.55, z: MESA_M.z + 0.1, giro: -1.2, ...aC(-0.25, 0.35), ...CARA.sonrisa, ...BRAZOS.costado }],   // (r2) al costado derecho de la consola: el brazo no cruza la pizza
    [T.mira[0], { ...aC(0.35, 0.4), ...CARA.neutra, ojos: { abiertos: 0.95, y: -0.7, x: 0.5 } }, 0.15],       // mira el celular
    [T.mira[1] + 0.05, { ...aC(-0.12, 0.25), ...CARA.neutra, ojos: { abiertos: 1, y: -0.4, x: -0.2 }, cejas: { alto: 0.4, ang: 0, asim: 0.6 } }, 0.15],   // mira la pizza
    [T.muerde, { ...aC(0.0, 0.05), ...CARA.feliz, ojos: { abiertos: 0.95, feliz: 0.4 }, boca: { sonrisa: 0.4, abierta: 0.0, ancho: 1 } }, 0.2],
  ]);
  if (pa === "Q4b") { CAJA_L.position.copy(MESA_M).add(V3(0, 0.002, 0)); CAJA_L.rotation.set(0, 0, 0); abrirCaja(CAJA_L, 0.85 * sg(t, T.abre2[0], T.abre2[1])); CAJA_L.updateMatrixWorld(true); const w = CAJA_L.userData.bis.localToWorld(V3(CAJA_L.userData.L * 0.42, 0.0, CAJA_L.userData.L * 0.9)); manoA(martin, p, "D", w, 1 - sg(t, T.abre2[0] + 0.15, T.abre2[0] + 0.4), [-0.8, -0.6, -0.3]); }   // (r3) suelta la tapa antes (no sube a la cara)
  if (pa === "Q4b" || pa === "Q4c") {
    // (r3) el celular en la izquierda desde Q4b (lo mira); al morder baja un poco
    const kb = eio(sg(t, T.muerde - 0.35, T.muerde - 0.05));
    manoA(martin, p, "I", toW(martin, [0.24, lerp(0.5, 0.4, kb), lerp(0.34, 0.3, kb)]), pa === "Q4b" ? sg(t, T.abre2[0] + 0.25, T.q4i) : 1, [0.9, -0.6, -0.2]);
  }
  if (pa === "Q4c") {
    // (r3) la mordida de perfil: la porción sostenida desde el borde, la punta entra en la boca; la mano queda adelante y abajo
    const k = eio(sg(t, T.muerde - 0.32, T.muerde - 0.02));
    if (t > T.muerde - 0.2 && t < T.muerde + 0.5) p.boca.abierta = Math.max(p.boca.abierta, 0.55 * (1 - sg(t, T.muerde - 0.02, T.muerde + 0.1)) + 0.08 * Math.abs(Math.sin((t - T.muerde) * 12)));
    martin.poner(p); martin.raiz.updateMatrixWorld(true);
    const boca = martin.cabeza.localToWorld(V3(0, 0.15, 0.28));
    const fw = V3(0, 0, 1).applyQuaternion(martin.cabeza.getWorldQuaternion(_q)); fw.y = 0; fw.normalize();
    const reposo = toW(martin, [-0.14, 0.52, 0.42]);
    const dirB = fw.clone().multiplyScalar(-0.75).add(V3(0, 0.66, 0)).normalize();  // mordiendo: del borde (adelante y abajo) a la boca
    const borde = reposo.clone().lerp(boca.clone().addScaledVector(dirB, -0.215), k);
    const dir = new THREE.Vector3();
    // dir apunta del borde hacia la punta: en reposo la punta mira lejos del cuerpo
    if (k < 0.001) dir.copy(fw).add(V3(0, 0.35, 0)).normalize();
    else dir.copy(fw.clone().add(V3(0, 0.35, 0)).normalize().lerp(boca.clone().sub(borde).normalize(), k)).normalize();
    const aCam = camera.position.clone().sub(borde).normalize(), up0 = V3(0, 1, 0).multiplyScalar(0.5).add(aCam).normalize(); const up = up0.addScaledVector(dir, -up0.dot(dir)).normalize(), zz = new THREE.Vector3().crossVectors(dir, up);
    PORM_X.pos.copy(borde); PORM_X.q.setFromRotationMatrix(new THREE.Matrix4().makeBasis(dir, up, zz));
    manoA(martin, p, "D", borde.clone().add(V3(0, -0.035, 0)).addScaledVector(dir, -0.02), 1, [-0.9, -0.5, -0.1]);
  }
  p.t = t; return p;
}
const PORM_X = { pos: new THREE.Vector3(), q: new THREE.Quaternion() };
const PUERTA_ANG = (t) => -1.35 * eio(sg(t, T.abreP - 0.1, T.abreP + 0.45));
const PERILLA = (t) => { PHOJA.rotation.y = PUERTA_ANG(t); PHOJA.updateMatrixWorld(true); return PHOJA.localToWorld(V3(-0.86, 1.05, 0.12)); };
// =====================================================================================================
// OBJETOS EN EL TIEMPO
// =====================================================================================================
const enTano = (pa) => pa.startsWith("P");
function ponerObjetos(t, pa) {
  const p1 = !(t >= P2);
  // el celular en el hombro de Tano (P1 y P1i), pegado a la cabeza: toca oreja y hombro
  celHombro.visible = pa === "P1";
  if (celHombro.visible) { if (celHombro.parent !== tano.cabeza) tano.cabeza.add(celHombro); celHombro.position.set(0.36, 0.14, 0.12); celHombro.scale.setScalar(1.6); celHombro.rotation.set(0, PI / 2 - 0.35, 0); celHombro.rotateX(0.12); }
  // el celular del mostrador (vibra), el talonario, la birome (en la derecha de Tano en P1)
  celMostr.visible = enTano(pa);
  if (celMostr.visible) {
    const vib = (en(t, 0, 0.45) || en(t, 1.2, 1.6) || en(t, 2.6, 3.0) || en(t, T.p4i, T.p4i + 0.6)) ? Math.sin(t * 90) * 0.0025 : 0;
    if (pa === "P4c") { const m = manoMundo(tano, "D", _a); celMostr.position.copy(m).add(V3(0, 0.06, 0.02)); tano.cuerpo.getWorldQuaternion(_q); celMostr.quaternion.copy(_q); celMostr.rotateX(-0.25); celMostr.rotateY(-0.35); }
    else { celMostr.position.copy(CEL_M).add(V3(vib, 0.012, 0)); celMostr.rotation.set(-PI / 2 + 0.35, 0, 0); }
    celMostr.scale.setScalar(pa === "P2b" ? 1.5 : 1);   // (r3) en P2b el celular se lee
  }
  BIROME.visible = pa === "P1" || pa === "P2b" || pa === "P3" || pa === "P3b" || pa === "P3c";
  if (BIROME.visible) {
    if (t < T.p2) { const m = manoMundo(tano, "D", _a); BIROME.position.copy(m).add(V3(0.0, -0.04, 0.03)); BIROME.rotation.set(0.5, 0, 0.35); }
    else { BIROME.position.copy(COMANDA).add(V3(0.1, 0.006, 0.02)); BIROME.rotation.set(0, 0, PI / 2); BIROME.rotateX(0.3); }
  }
  // la masa: un bollo en la mano izquierda (P1); cuelga estirada en P2b
  MASA.visible = pa === "P1" || pa === "P2b";
  if (MASA.visible) { const m = manoMundo(tano, "I", _a); estirarMasa(MASA, pa === "P2b" ? 1 : 0); MASA.position.copy(m).add(V3(0, pa === "P2b" ? -0.09 : -0.07, 0.02)); MASA.rotation.set(0, pa === "P2b" ? 0.4 : 0, 0); }
  // la caja de Don Tano: la trae Facu (P3) → en el mostrador (P3c, P4) → abierta; la pizza adentro
  CAJA_T.visible = (pa.startsWith("P3") && pa !== "P3i") || pa === "P4" || pa === "P4b" || pa === "P4c";
  if (CAJA_T.visible) {
    { const b = cajaFacuEn(t); CAJA_T.position.copy(b.pos); CAJA_T.rotation.set(0, b.giro, 0); abrirCaja(CAJA_T, sg(t, T.abre[0], T.abre[1])); }
  }
  PIZZA_T.visible = CAJA_T.visible && pa !== "Q5b";
  VAPOR_T.visible = false; if (VAPOR_T.visible) VAPOR_T.userData.actualizar(t, 0.55 * sg(t, T.abre[0], T.abre[1] + 0.3));
  // las porciones: Facu saca la 1 (P4b); Tano tiene la 6 en la boca (P4c)
  PIZZA_T.userData.porciones.forEach((q, i) => (q.visible = !((i === 1 && t >= T.levanta[0]) || (i === 6 && t >= T.p4c))));
  PIZZA_T.userData.fainas.forEach((f) => (f.visible = true));
  POR_F.visible = (pa === "P4b" && t >= T.levanta[0]) || pa === "P4c";
  if (POR_F.visible) { const m = manoMundo(facu, "D", _a); POR_F.position.copy(m).add(V3(0, -0.06, 0.02)); facu.cuerpo.getWorldQuaternion(_q); POR_F.quaternion.copy(_q); POR_F.rotateY(PI / 2 + 0.3); POR_F.rotateZ(pa === "P4c" ? 0.35 : 0.1); POR_F.userData.bis.rotation.z = -0.35; }
  { // el hilo de queso: de la punta de la porción a la pizza, se estira y se corta
    const k = pa === "P4b" ? sg(t, T.levanta[0], T.levanta[0] + 0.15) * (1 - sg(t, T.levanta[1] - 0.15, T.levanta[1] + 0.05)) : 0;
    if (false) { POR_F.updateMatrixWorld(true); const a = POR_F.userData.bis.localToWorld(V3(0.07, 0.015, 0)); CAJA_T.updateMatrixWorld(true); const b = CAJA_T.localToWorld(V3(0.05, 0.03, 0.08)); ponerHilo(HILO_F, a, b, k); } else HILO_F.visible = false;
  }
  POR_T.visible = pa === "P4c";
  if (POR_T.visible) { const m = manoMundo(tano, "I", _a); POR_T.position.copy(m).add(V3(0.0, 0.02, 0.03)); tano.cuerpo.getWorldQuaternion(_q); POR_T.quaternion.copy(_q); POR_T.rotateY(-PI / 2); POR_T.rotateZ(0.5); POR_T.userData.bis.rotation.z = -0.5; }
  // el casco de Facu: en la cabeza (P3, P4) o en la mano (P4c)
  CASCO_F.visible = false;   // (r2) Facu sin casco (de perfil no calzaba)
  if (CASCO_F.visible) { if (pa === "Q1") cascoEnCabeza(CASCO_F, facu); else if (pa === "P4c") cascoEnMano(CASCO_F, facu, "I"); else cascoEnCabeza(CASCO_F, facu); }
  // la puerta de Don Tano (entra Facu)
  const uP = sg(t, T.entra[0] - 0.1, T.entra[0] + 0.25) * (1 - sg(t, T.entra[0] + 0.8, T.entra[0] + 1.2));
  TANO.hoja.rotation.y = -1.3 * eio(uP) * (p1 ? 1 : 0);
  // ---- Lucía ----
  DISCO.visible = pa === "Q1b" || pa === "C";
  if (DISCO.visible) { DISCO.position.copy(discoEn(t)); DISCO.rotation.set(-0.75, 0, 0); DISCO.rotateY(t * 2.4); }   // (r1) de cara a la cámara (de canto parecía un palo)
  // los tickets que salen solos (Q1) y el #47 (Q3)
  const uTk = pa === "Q1b" ? Math.max(sg(t, T.tks[0], T.tks[0] + 0.4) * (1 - sg(t, T.tks[0] + 0.45, T.tks[0] + 0.46)), sg(t, T.tks[1], T.tks[1] + 0.45)) : pa === "Q3" ? sg(t, T.imprime[0], T.imprime[1]) : 0;   // (r3) sin el ticket del cierre
  sacarTicket(IMP, uTk);
  TK_MANO.visible = false;
  if (TK_MANO.visible) { TK_MANO.position.copy(ticketManoEn(t)).add(V3(0, -0.06, 0)); TK_MANO.rotation.set(0, PI + 0.2, 0.1); }
  TK_RIEL.visible = t >= T.cuelga[1] && !p1 && pa !== "Q3";
  // Sabri: el celular en las manos (Q3s), la caja en las manos (Q4), el casco puesto
  celSab.visible = pa === "Q3s";
  if (celSab.visible) { const a = manoMundo(sabri, "I", _a), b = manoMundo(sabri, "D", _b); celSab.position.copy(a).add(b).multiplyScalar(0.5).add(V3(0, 0.08, 0)); sabri.cuerpo.getWorldQuaternion(_q); celSab.quaternion.copy(_q); celSab.rotateX(-0.7); }
  CASCO_S.visible = pa === "Q3s" || pa === "Q4" || pa === "Q5b"; if (CASCO_S.visible) cascoEnCabeza(CASCO_S, sabri);
  CAJA_L.visible = (pa === "Q4" && t >= T.abreP + 0.08) || pa === "Q4b" || pa === "Q4c";
  if (CAJA_L.visible && pa !== "Q4") { CAJA_L.position.copy(MESA_M).add(V3(0, 0.002, 0)); CAJA_L.rotation.set(0, 0.0, 0); }
  abrirCaja(CAJA_L, pa === "Q4" ? 0 : 0.85 * sg(t, T.abre2[0], T.abre2[1]));   // (r1) la tapa abre a ~105° (no se ve LUCÍA espejado)
  PIZZA_L.visible = CAJA_L.visible; VAPOR_L.visible = false; if (VAPOR_L.visible) VAPOR_L.userData.actualizar(t, 0.55 * sg(t, T.abre2[0], T.abre2[1] + 0.3));
  PIZZA_L.userData.porciones.forEach((q, i) => (q.visible = !(i === 1 && pa === "Q4c")));
  // la porción de Martín y su mordida
  POR_M.visible = pa === "Q4c";
  if (POR_M.visible) { POR_M.position.copy(PORM_X.pos); POR_M.quaternion.copy(PORM_X.q); POR_M.userData.bis.rotation.z = 0; POR_M.userData.bis.scale.x = t >= T.muerde ? 0.45 : 1; }
  HILO_M2.visible = false;
  celMart.visible = pa === "Q2" || pa === "Q2b" || pa === "Q4c" || pa === "Q4b";
  if (celMart.visible) {
    martin.cuerpo.getWorldQuaternion(_q);
    if (pa === "Q4c" || pa === "Q4b") { const m = manoMundo(martin, "I", _a); celMart.position.copy(m).add(V3(0, 0.07, 0)); celMart.quaternion.copy(_q); celMart.rotateX(-0.6); celMart.rotateY(0.5); }
    else { const a = manoMundo(martin, "I", _a), b = manoMundo(martin, "D", _b); celMart.position.copy(a).add(b).multiplyScalar(0.5).add(V3(0, 0.08, 0)); celMart.quaternion.copy(_q); celMart.rotateX(-0.75); }
  }
  // la puerta de Martín
  PHOJA.rotation.y = PUERTA_ANG(t);
  // la moto de Sabri (Q5b sale; antes, estacionada en su vereda)
  { MOTO_F.position.set(-1.9, 0.14, 1.55); MOTO_F.rotation.y = PI / 2 + 0.15; }   // (r1) lejos de la puerta de Tano
  const ms = motoSabriEn(t); MOTO_S.position.set(ms.x, 0.0, ms.z); MOTO_S.rotation.y = ms.giro; MOTO_S.userData.luzT.material.color.set(t >= T.moto ? 0xc7655b : 0x7a3a34);
  MOTO_F.visible = true;
}
// =====================================================================================================
// RENDER
// =====================================================================================================
function luces(pa, t) {
  const calle = pa === "Q1" || pa === "Q5b" || pa === "Q5c";
  cielo.intensity = calle ? 0.9 : pa.startsWith("Q2") || pa.startsWith("Q4") ? 1.6 : 1.75; relleno.intensity = calle ? 0.35 : 0.7; sol.intensity = calle ? 0.6 : 1.25;
  sol.color.set(0xfff1dc); luzFarol.intensity = calle ? 3.0 : 0;
  const c = camera.position;
  sol.position.set(c.x + 0.8, 5.2, c.z + (c.z > 4.5 && c.x < 20 ? -1.5 : 1.5)); sol.target.position.set(c.x, 0.6, c.z + (c.z > 4.5 && c.x < 20 ? 2.5 : -2.5)); sol.target.updateMatrixWorld();
}
function renderAt(tIn) {
  const t = en(tIn, P1, P2) ? (tIn < (P1 + P2) / 2 ? P1 - 0.001 : P2) : tIn;
  const pl = planoEn(t); planoActual = pl[0];
  const pa = planoActual;
  // ---- cámara ----
  if (pl[2]) ponerCam(catmull(pl[2], t), t);
  if (VER && VER.startsWith("cam:")) ponerCam(VER.slice(4).split(",").map(Number), t);
  if (window.__cam) ponerCam(window.__cam, t);
  camera.updateMatrixWorld(true);
  luces(pa, t);
  dibujarInterfaz(t, pa);
  // ---- quién está en cuadro ----
  const vis = {
    tano: (enTano(pa) && !pa.endsWith("i") && pa !== "P4b") ||   // (r3) en P4b la cámara está del lado de Tano
      pa === "Q5b" || pa === "Q5c",
    facu: ["P3", "P3b", "P3c", "P4", "P4b", "P4c"].includes(pa),
    lucia: ["Q1", "Q1b", "Q3", "Q3t", "Q3s", "Q5", "C"].includes(pa),
    sabri: ["Q3s", "Q5b"].includes(pa) || (pa === "Q4" && t >= T.abreP + 0.08),   // (r2) la puerta abre primero
    martin: ["Q2", "Q2b", "Q4", "Q4b", "Q4c"].includes(pa),
  };
  CLIENTE.raiz.visible = SILLA.visible = pa === "Q1" || pa === "Q1b";
  if (CLIENTE.raiz.visible) CLIENTE.poner({ x: SILLA.position.x, y: -0.02, z: SILLA.position.z, giro: PI + 0.9, sentado: 1, ...aC(0.3, 0.3), ...CARA.neutra, ojos: { abiertos: 0.9, y: -0.8 }, ...BRAZOS.celular, t });
  tano.raiz.visible = vis.tano; facu.raiz.visible = vis.facu; lucia.raiz.visible = vis.lucia; sabri.raiz.visible = vis.sabri; martin.raiz.visible = vis.martin;
  if (vis.tano) tano.poner(pa === "Q1" ? poseTano(T.p1i - 0.2, "P1") : poseTano(t, pa));
  if (vis.facu) facu.poner(pa === "Q1" ? { x: lerp(-2.6, 4.4, sg(t, P2 + 0.2, P2 + 1.35)) - 0.15, y: 0.18, z: 4.2, giro: PI / 2, sentado: 1, ...aC(0, 0.05), ...CARA.neutra, ...BRAZOS.costado, manoI: [0.28, 0.42, 0.42], manoD: [-0.28, 0.42, 0.42], codoI: [0.8, -0.5, -0.2], codoD: [-0.8, -0.5, -0.2], t } : poseFacu(t, pa));
  if (vis.lucia) lucia.poner(poseLucia(t, pa));
  if (vis.sabri) sabri.poner(poseSabri(t, pa));
  if (vis.martin) martin.poner(poseMartin(t, pa));
  ponerObjetos(t, pa);
  // ---- insertos ----
  const INS = { P1i: INS_COM, P3i: INS_COM, P2: INS_CHAT, P4i: INS_CHAT, Q2i: INS_MART, Q4i: INS_NOTI }[pa];
  for (const I of INSERTOS) I.g.visible = I === INS;
  if (INS) {
    ponerCam([0, 1.5, 3, 0, 1.5, 0, 50], t); camera.updateMatrixWorld(true);
    const k = sg(t, pl[1], pl[1] + 1.2), kk = halfK();
    INS.g.position.set(0, 0, -1); INS.g.scale.setScalar(kk * PXK * lerp(1.0, 1.03, eo(k)));
  }
  for (const p of TODOS) if (p.ojoLejano && p.raiz.visible) p.ojoLejano(camera.position);
  // ---- tarjetas ----
  AVISOS.length = 0;
  for (const k in GL) GL[k].visible = false;
  MAPA_S.visible = false;
  for (const g of GUIAS) g.visible = false;
  if (!LIMPIO && !en(tIn, P1, P2)) tarjetas(t, pa);
  renderer.render(scene, camera);
}
const ent = (t, ti) => (t < ti ? 0 : 0.75 + 0.25 * bk(sg(t, ti, ti + 0.18)));
// el globo que sale del celular del hombro de Tano (cola al celular)
function globoTel(g, t, ti, cx, cy) { celHombro.updateMatrixWorld(true); const [ox, oy] = enPantalla(celHombro.localToWorld(V3(0, 0, 0.0))); ponerGlobo(g, cx, cy, ent(t, ti), [ox, oy], 2); }
function chips(t, a, b, y = 200) { ponerGlobo(a, 60 + a.userData.W / 2, y, 1, null); ponerGlobo(b, 60 + a.userData.W + 36 + b.userData.W / 2, y, 1, null); }
function tarjetas(t, pa) {
  // P1: el chip debajo de "PIZZERÍAS" (HTML, y 150-350); los globos entre el chip y la cabeza, nunca sobre la cara
  if (pa === "P1") {
    chips(t, GL.vie, GL.donT, 440);
    if (t >= T.t1 && t < T.m1) { verLineas(GL.t1, t >= T.t1 + W2_.t1 ? 2 : 1); ponerGlobo(GL.t1, 380, 610, ent(t, T.t1), [bocaPx(tano)[0] - 40, bocaPx(tano)[1]], 2); }
    if (t >= T.m1 && t < T.t2 - 0.02) globoTel(GL.m1, t, T.m1, 760, 640);
    if (t >= T.t2) { verLineas(GL.t2, t >= T.t2 + W2_.t2 ? 2 : 1); const [mx, my] = bocaPx(tano); ponerGlobo(GL.t2, 270, 610, ent(t, T.t2), [mx - 40, my], 2); }
    if (t >= T.conV) globoTel(GL.conV, t, T.conV, 830, 790);
  }
  // P1i: la comanda; "¡Con V corta!" arriba y la B se escribe igual
  // (r3) P1i sin "¡Con V corta!" (quedaba fantasma debajo de PIZZERÍAS)
  if (pa === "P2" || pa === "P2b") {
    const y0 = pa === "P2" ? 0 : 0;
    if (t >= T.rotP2[0]) ponerGlobo(GL.rP2a, 270, 200, ent(t, T.rotP2[0]), null, 1);
    if (t >= T.rotP2[1]) ponerGlobo(GL.rP2b, 780, 200, ent(t, T.rotP2[1]), null, 1);
  }
  if (pa === "P2b" && t >= T.t3) hablar(GL.t3, tano, ent(t, T.t3), 1, 160);
  if (pa === "P3" || pa === "P3b") { chips(t, GL.vie2, GL.donT); }
  if (pa === "P3" && t >= T.f1) { verLineas(GL.f1, t >= T.f1 + W2_.f1 ? 2 : 1); hablar(GL.f1, facu, ent(t, T.f1), 1, 0); }
  if (pa === "P3b" && t < T.f1 + LEN.f1 + 0.05) { verGlobo(GL.f1, 99); ponerGlobo(GL.f1, 560, 320, 1, null, 1); }
  // (r3) los rótulos de la pausa siguen sobre la caja (P4) y la pizza (P4b): ≥ 2 s en pantalla
  if (pa === "P3c" || pa === "P4" || pa === "P4b") {
    const yR = pa === "P3c" ? 1520 : pa === "P4" ? 1710 : 250;
    if (t >= T.rotP3[0]) ponerGlobo(GL.rP3a, 780, yR, ent(t, T.rotP3[0]), null, 1);
    if (pa === "P3c" && t >= T.rotP3[0]) { CAJA_T.updateMatrixWorld(true); const [bx, by] = enPantalla(CAJA_T.localToWorld(V3(0, 0.05, 0.1))); ponerGuia(GUIAS[0], 780, 1520 + GL.rP3a.userData.H / 2, bx, by, eo(sg(t, T.rotP3[0], T.rotP3[0] + 0.25))); }
    if (t >= T.rotP3[1]) ponerGlobo(GL.rP3b, 260, yR, ent(t, T.rotP3[1]), null, 1);
  }
  if (pa === "P4" && t >= T.t4) hablar(GL.t4, tano, ent(t, T.t4), 1, 0);
  if (pa === "P4c" && t >= T.t5) hablar(GL.t5, tano, ent(t, T.t5), 1, -40);
  // ---- parte 2 ----
  if (pa === "Q1b") { chips(t, GL.vieL, GL.luc); if (t >= T.rotQ1) { IMP.updateMatrixWorld(true); const [ix, iy] = enPantalla(IMP.localToWorld(V3(0, 0.12, 0))); ponerGlobo(GL.rQ1, 560, 1560, ent(t, T.rotQ1), null, 1); ponerGuia(GUIAS[0], 560, 1560 - GL.rQ1.userData.H / 2, ix, iy, eo(sg(t, T.rotQ1, T.rotQ1 + 0.25))); } }
  if (pa === "Q2" || pa === "Q2b") ponerGlobo(GL.vieQ2, 60 + GL.vieQ2.userData.W / 2, 200, 1, null);
  if (pa === "Q2" && t >= T.audio - 0.05 && t < T.ceja + 0.4) { celMart.updateMatrixWorld(true); const [cx, cy] = enPantalla(celMart.localToWorld(V3(0, 0.05, 0))); ponerGlobo(GL.audio, 820, 1000, ent(t, T.audio - 0.05), [cx + 20, cy], 2); }
  if (pa === "Q2i" && t >= T.menu && t < T.sug) ponerGlobo(GL.rQ2a, 540, 220, ent(t, T.menu), null, 1);
  if (pa === "Q2i" && t >= T.sug) ponerGlobo(GL.rQ2, 540, 220, ent(t, T.sug), null, 1);
  if (pa === "Q2b" && t >= T.m2) hablar(GL.m2, martin, ent(t, T.m2), 1, 0);
  if (pa === "Q3" && t >= T.imprime[0] + 0.35) { IMP.updateMatrixWorld(true); const [ix, iy] = enPantalla(IMP.userData.tk.localToWorld(V3(0.035, 0.12, 0))); ponerGlobo(GL.rQ3, 760, 1620, ent(t, T.imprime[0] + 0.35), null, 1); ponerGuia(GUIAS[0], 760, 1620 - GL.rQ3.userData.H / 2, ix + 20, iy, eo(sg(t, T.imprime[0] + 0.35, T.imprime[0] + 0.6))); }
  if (pa === "Q3s") { celSab.updateMatrixWorld(true); const [sx, sy] = enPantalla(celSab.localToWorld(V3(0, 0, 0))); ponerGlobo(MAPA_S, 370, 1520, ent(t, T.q3s + 0.1), null, 1); ponerGuia(GUIAS[0], 370 + MAPA_S.userData.W / 2 - 10, 1300, sx, sy, eo(sg(t, T.q3s + 0.1, T.q3s + 0.35))); }
  if (pa === "Q4") { ponerGlobo(GL.vieQ4, 60 + GL.vieQ4.userData.W / 2, 200, 1, null); if (t >= T.s1) { verLineas(GL.s1, t >= T.s1 + W2_.s1 ? 2 : 1); hablar(GL.s1, sabri, ent(t, T.s1), 1, 0); } }
  if (pa === "Q5") ponerGlobo(GL.rQ5, 540, 200, ent(t, T.q5 + 0.05), null, 1);
  if (pa === "Q5c" && t >= T.t6) hablar(GL.t6, tano, ent(t, T.t6), 1, 0);
}
// la burbuja al costado de la cabeza (cuando arriba está "PIZZERÍAS"); lado -1 = a la izquierda de la cabeza
function hablarLado(g, per, s, lado = -1, dy = 0) {
  const [hx, hy] = coronillaPx(per), [bx, by] = bocaPx(per), { W: Wg, H } = g.userData;
  const cx = lado < 0 ? Math.max(Wg / 2 + 40, hx + 60 - Wg / 2) : Math.min(1040 - Wg / 2, hx - 60 + Wg / 2);
  const cy = Math.max(540 + H / 2, hy - 50 - H / 2 + dy); ponerGlobo(g, cx, cy, s, cy + H / 2 > hy ? [bx + lado * 70, by] : [hx + lado * 10, hy + 10], 2);
}
const partesL = (l) => l.split(/(\[[^\]]+\])/).filter(Boolean).flatMap((p) => (p.startsWith("[") ? [p] : p.split(/(?<= )/))).length;
const verLineas = (g, n) => verGlobo(g, n >= g.userData.lineas.length ? 99 : g.userData.lineas.slice(0, n).reduce((a, l) => a + partesL(l), 0));

window.__tresRender = renderAt;
window.addEventListener("hf-seek", (e) => renderAt(e.detail.time));
window.__tresDbg = (t) => { renderAt(t); return { plano: planoActual, avisos: AVISOS.slice() }; };
renderAt(window.__hfThreeTime || 0);
if (window.__tresListo) window.__tresListo();
