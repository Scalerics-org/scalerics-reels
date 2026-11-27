
const SECO = { ...CARA.neutra, ojos: { abiertos: 0.88, tension: 0.2, feliz: 0 }, cejas: { alto: -0.05, ang: -0.1 }, boca: { sonrisa: 0.0, abierta: 0, ancho: 0.9 } };
const BUENA = { ...CARA.sonrisa, ojos: { abiertos: 1, feliz: 0.35 }, boca: { sonrisa: 0.75, abierta: 0, ancho: 1.1 } };
const FELIZ = { ...CARA.sonrisa, ojos: { abiertos: 1, feliz: 0.45 }, boca: { sonrisa: 0.95, abierta: 0.05, ancho: 1.15 } };
const DERRETIDA = { ...CARA.sonrisa, ojos: { abiertos: 0.8, feliz: 0.7 }, cejas: { alto: 0.55, ang: 0.6, asim: 0 }, boca: { sonrisa: 1, abierta: 0.1, ancho: 1.1 } };
const CANSADO = { ...CARA.neutra, ojos: { abiertos: 0.6, tension: 0.3 }, cejas: { alto: 0.1, ang: 0.5 }, boca: { sonrisa: -0.1, abierta: 0, ancho: 0.9 } };
const GASTADO = { ...CARA.resignado, ojos: { abiertos: 0.45, tension: 0.6 } };
const MEDIA = { ...CARA.sonrisa, ojos: { abiertos: 1, feliz: 0.25 }, cejas: { alto: 0.25, ang: 0.0, asim: 0.4 }, boca: { sonrisa: 0.6, abierta: 0, ancho: 1.05 } };

// =====================================================================================================
// LUGARES
// =====================================================================================================
const BRUNO_M = { x: VX - 0.45, z: -1.62 };          // Bruno detrás del mostrador
const TOTO_M = { x: VX + 0.32, z: -1.02 };           // Toto sentado sobre el mostrador (P1)
const VERO_A = { x: VX + 1.0, z: ZF - 0.95 };        // Vero en la vereda, del otro lado de la vidriera
const SILLAS = [{ x: VX + 0.9, z: ZF + 0.42 }, { x: VX + 1.42, z: ZF + 0.42 }];   // las sillas de espera (contra la vidriera, de frente)
const SEN_S = SILLAS[1];
const SEN_Q4 = { x: VX + 0.55, z: -0.42 };           // la señora en el mostrador (Q4)
const INES_R = { x: RX + 0.22, z: -1.0 };            // Inés detrás de la camilla de Toto
const BRUNO_PU = { x: RX - 1.35, z: RZ - 0.05 };     // Bruno asomado al vano
const BRUNO_R = { x: RX - 0.82, z: -0.95 };          // Bruno ya adentro, al lado de la camilla (P3c en adelante)
const BRUNO_R3 = { x: RX + 0.95, z: -0.05 };         // Bruno filmando (Q3), en la punta de la camilla
const TOTO_R = { x: RX - 0.18, y: CAM1.alto + 0.05, z: CAM1.z + 0.02 };   // Toto echado en la camilla, mirando a +x
const COCO_R = { x: RX + CAM2.x - 0.0 + 0.0, y: CAM2.alto + 0.05, z: CAM2.z + 0.04 };
const QPUERTA = { x: VX + XL + 0.35, z: -1.05 };     // delante de la puerta del quirófano (recepción)
const PCALLE_V = { x: VX + 2.07, z: ZF - 0.3 };      // la puerta de calle (afuera)
const VERO_Q5 = { x: VX + 0.75, z: -0.25 };           // Vero adentro, frente al mostrador
const TOTO_Q5 = { x: VX + 0.2, z: 0.15 };             // Toto sentado delante de Vero
const VERO_K = { x: -0.3, z: -0.12 };                 // la cocina

// =====================================================================================================
// CÁMARA: PLANOS [nombre, desde, claves | null (inserto)]; cada clave [t, px, py, pz, mx, my, mz, fov]
// =====================================================================================================
const CK = (globalThis.__CK || {});
const K0 = CK.K0 || [VX + 0.2, 1.45, 2.35, VX + 0.25, 1.22, -1.6, 56];              // el cuadro 0 (P1 = P2 = Q1)
const K1B = CK.K1B || [VX - 0.55, 1.62, -1.05, VX + 1.0, 1.35, -3.1, 50];          // por encima del hombro de Bruno: Vero en la vereda
const KR = CK.KR || [RX + 0.1, 1.55, 2.6, RX + 0.0, 1.0, -0.9, 52];                // la sala de recuperación (P3 = Q3)
const KRI = CK.KRI || [RX + 0.75, 1.5, 0.95, RX + 0.15, 1.3, -1.0, 46];            // contraplano de Inés
const KRB = CK.KRB || [RX + 0.4, 1.5, 0.95, RX - 0.85, 1.3, -1.2, 48];             // Bruno
const KR4 = CK.KR4 || [RX - 0.2, 1.55, 1.75, RX - 0.25, 1.1, -0.9, 52];            // la pausa: Inés, Bruno y Toto
const KTO = CK.KTO || [RX + 0.75, 1.32, 0.55, RX + 0.12, 1.02, -0.38, 40];         // primer plano de Toto con el teléfono
const KQ4 = CK.KQ4 || [VX - 1.0, 1.5, 1.3, VX + 0.0, 1.2, -1.2, 52];               // Bruno con la tablet y la señora (Q4)
const KQ4B = CK.KQ4B || [VX + 0.8, 1.5, 1.2, VX - 1.9, 1.25, -0.95, 50];           // la puerta del quirófano: Inés sale
const KQ5 = CK.KQ5 || [VX - 0.9, 1.5, 2.0, VX + 0.75, 1.0, -1.0, 56];              // Vero entra; Toto trota
const KK = CK.KK || [0.55, 1.45, 1.5, -0.3, 1.3, -0.3, 44];                        // la cocina: Vero con el celular
const KC = CK.KC || [VX - 0.15, 1.6, 1.4, VX - 0.2, 1.3, -1.6, 46];                // el cierre
const off = (k, d) => k.map((v, i) => v + (d[i] ?? 0));
const PLANOS = [
  ["P1", 0, [[0, ...K0], [T.p1b, ...off(K0, [0, -0.02, -0.25, 0, 0, 0, 0])]]],
  ["P1b", T.p1b, [[T.p1b, ...K1B], [T.p2a, ...off(K1B, [0.03, 0, -0.08, 0, 0, 0, -1])]]],
  ["P2a", T.p2a, [[T.p2a, ...K0], [T.p2b, ...off(K0, [0, 0, -0.08, 0, 0, 0, 0])]]],
  ["P2b", T.p2b, [[T.p2b, ...off(K0, [-0.1, 0, -0.15, 0, 0, 0, 0])], [T.p2c, ...off(K0, [-0.1, 0, -0.23, 0, 0, 0, 0])]]],
  ["P2c", T.p2c, [[T.p2c, ...off(K0, [-0.2, -0.05, -0.3, -0.1, -0.05, 0, 0])], [T.p3, ...off(K0, [-0.22, -0.05, -0.5, -0.1, -0.05, 0, -1])]]],
  ["P3", T.p3, [[T.p3, ...KR], [T.p3b, ...off(KR, [0, 0, -0.2, 0, 0, 0, 0])]]],
  ["P3b", T.p3b, [[T.p3b, ...KRI], [T.p3c, ...off(KRI, [0, 0, -0.08, 0, 0, 0, -2])]]],
  ["P3c", T.p3c, [[T.p3c, ...KRB], [T.p4, ...off(KRB, [0, 0, -0.06, 0, 0, 0, -1])]]],
  ["P4", T.p4, [[T.p4, ...KR4], [T.p4b, ...off(KR4, [0, -0.03, -0.25, 0, 0, 0, -2])]]],
  ["P4b", T.p4b, [[T.p4b, ...KTO], [T.p5, ...off(KTO, [-0.05, 0, -0.08, 0, 0, 0, -3])]]],
  ["P5", T.p5, [[T.p5, ...off(KTO, [0.15, 0.15, 0.4, 0, 0.1, 0, 4])], [T.p5i, ...off(KTO, [0.15, 0.15, 0.35, 0, 0.1, 0, 4])]]],
  ["P5i", T.p5i, null],
  ["P5b", T.p5b, [[T.p5b, ...off(KR4, [0.5, 0, 0.1, 0.6, 0, -0.1, 0])], [P1, ...off(KR4, [0.55, 0, -0.05, 0.65, 0, -0.1, -1])]]],
  // ---- parte 2 ----
  ["Q1", P2, [[P2, ...K0], [T.q1i, ...off(K0, [0, 0, -0.15, 0, 0, 0, 0])]]],
  ["Q1i", T.q1i, null],
  ["Q1b", T.q1b, [[T.q1b, ...off(K0, [0.05, 0, -0.35, 0.05, 0, 0, -2])], [T.q2, ...off(K0, [0.05, 0, -0.45, 0.05, 0, 0, -2])]]],
  ["Q2", T.q2, [[T.q2, ...KQ4], [T.q2i, ...off(KQ4, [0, 0, -0.1, 0, 0, 0, 0])]]],
  ["Q2i", T.q2i, null],
  ["Q3", T.q3, [[T.q3, ...KR], [T.q3k, ...off(KR, [0, 0, -0.25, 0, 0, 0, 0])]]],
  ["Q3k", T.q3k, [[T.q3k, ...KK], [T.q3i, ...off(KK, [0, 0, -0.05, 0, 0, 0, 0])]]],
  ["Q3i", T.q3i, null],
  ["Q3v", T.q3v, [[T.q3v, ...off(KK, [0, 0, -0.1, 0, 0, 0, -2])], [T.q4, ...off(KK, [0, 0, -0.2, 0, 0, 0, -4])]]],
  ["Q4", T.q4, [[T.q4, ...KQ4], [T.q4b, ...off(KQ4, [0, 0, -0.15, 0, 0, 0, 0])]]],
  ["Q4b", T.q4b, [[T.q4b, ...KQ4B], [T.q4c, ...off(KQ4B, [0, 0, -0.1, 0, 0, 0, -1])]]],
  ["Q4c", T.q4c, [[T.q4c, ...off(KQ4, [0.35, 0, -0.35, 0, 0.1, 0, -6])], [T.q4i, ...off(KQ4, [0.35, 0, -0.45, 0, 0.1, 0, -7])]]],
  ["Q4i", T.q4i, null],
  ["Q5i", T.q5i, null],
  ["Q5", T.q5, [[T.q5, ...KQ5], [T.c, ...off(KQ5, [0, 0, -0.25, 0, 0, 0, 0])]]],
  ["C", T.c, [[T.c, ...KC], [DUR, ...off(KC, [0, 0, -0.1, 0, 0, 0, 0])]]],
];
for (let i = PLANOS.length - 2; i >= 0; i--) { const d = PLANOS[i + 1][1] - PLANOS[i][1]; if (d < 0.3) { console.error(`plano corto: ${PLANOS[i][0]} (${d.toFixed(2)} s), se saca`); PLANOS.splice(i, 1); } }

// =====================================================================================================
// EL TELÉFONO EN LA OREJA, EL CELULAR, LA TABLET: objetos que siguen a una cabeza o a una mano
// =====================================================================================================
// el auricular contra la oreja DERECHA de un personaje (espacio de la cabeza): el parlante en la oreja, el micrófono hacia
// la boca, la pantalla para afuera
const OREJA_D = (() => { const Y = V3(0, 0.55, -0.83).normalize(), Z = V3(-1, 0, 0), X = new THREE.Vector3().crossVectors(Y, Z).normalize(); const m = new THREE.Matrix4().makeBasis(X, Y, Z); return { q: new THREE.Quaternion().setFromRotationMatrix(m), c: V3(-0.335, 0.27, 0.04).addScaledVector(Y, -0.07) }; })();
const _qh = new THREE.Quaternion();
function enOreja(obj, per, esc = 1) { per.raiz.updateMatrixWorld(true); obj.position.copy(per.cabeza.localToWorld(OREJA_D.c.clone())); per.cabeza.getWorldQuaternion(_qh); obj.quaternion.copy(_qh).multiply(OREJA_D.q); obj.scale.setScalar(esc); }
// en la mano (el auricular de pie en el puño, la pantalla hacia `mira`)
function enMano(obj, per, lado, inclina = 0.3, dy = 0.06) { const m = manoMundo(per, lado, _a); obj.position.copy(m).add(V3(0, dy, 0)); per.cuerpo.getWorldQuaternion(_qh); obj.quaternion.copy(_qh); obj.rotateX(-inclina); obj.scale.setScalar(1); }
// la base del auricular (acostado en la cuna)
function enBase(obj) { obj.position.copy(TELB.position).add(V3(0, 0.075, -0.015)); obj.quaternion.setFromEuler(new THREE.Euler(-Math.PI / 2 + 0.5, 0.35, 0, "YXZ")); obj.scale.setScalar(1); }
// la oreja de Toto (la izquierda, la caída: del lado de Inés) y la pose del auricular ahí: el parlante en la oreja, el
// micrófono hacia la boca del collar (afuera), la pantalla hacia Inés
function enOrejaToto(obj, u = 1) {
  toto.raiz.updateMatrixWorld(true);
  const f = V3(0, 0, 1).transformDirection(toto.cabeza.matrixWorld), l = V3(1, 0, 0).transformDirection(toto.cabeza.matrixWorld);
  const oreja = toto.cabeza.localToWorld(V3(0.15, -0.03, 0.02));
  const Y = f.clone().multiplyScalar(-1).add(V3(0, 0.25, 0)).normalize(), Z = l.clone(), X = new THREE.Vector3().crossVectors(Y, Z).normalize(); Z.crossVectors(X, Y).normalize();
  const q = new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().makeBasis(X, Y, Z));
  const pos = oreja.clone().addScaledVector(l, 0.035 * 0.9).addScaledVector(Y, -0.08);
  obj.position.copy(pos); obj.quaternion.copy(q); obj.scale.setScalar(1);
  return obj.localToWorld(V3(0, -0.11, 0));   // el agarre (la punta del micrófono)
}

// =====================================================================================================
// POSES
// =====================================================================================================
const aC = (giro = 0, asiente = 0, ladea = 0.03) => ({ cabeza: { giro, asiente, ladea }, ojos: { x: giro * 0.6, y: -asiente * 0.8, abiertos: 0.95 } });
// pone el objeto en la oreja derecha (con la cabeza ya puesta en t) y lleva la mano derecha a agarrarlo
function alOido(per, p, obj, esc = 1) { per.poner(p); enOreja(obj, per, esc); obj.updateMatrixWorld(true); manoA(per, p, "D", obj.localToWorld(V3(0.0, -0.035 / esc, 0.0)), 1, [-0.9, -0.45, -0.2]); }
function chipActual(t) { for (let i = 0; i < 3; i++) if (t >= T.mont[i].ini && t < T.mont[i].fin) return i; return -1; }
// Bruno · P1 (atiende, la correa, se da vuelta a la vidriera), P2 (cada vez más hundido), P3-P5 (el inalámbrico en la mano),
// Q1 (la tablet), Q2/Q4 (el panel), Q3 (filma), Q5 (señala)
function poseBruno(t) {
  const pa = planoActual;
  if (t < T.p2a) {
    const g = sg(t, T.gira, T.gira + 0.35) * (1 - sg(t, T.b2 + LEN.b2 + 0.1, T.b2 + LEN.b2 + 0.5));
    const p = poseEn(t, [
      [0, { x: BRUNO_M.x, z: BRUNO_M.z, giro: 0.15, ...aC(0.35, 0.12), ...CARA.neutra, ...BRAZOS.apoyado }],
      [T.v1 + 0.2, { ...aC(0.15, 0.05), ...BUENA }, 0.25],
    ]);
    p.giro += 0.55 * g; p.cabeza.giro += 1.05 * g; p.cabeza.asiente -= 0.05 * g; if (g > 0.5) Object.assign(p, { ...MEDIA, ojos: { ...MEDIA.ojos, x: 0.8 } });
    // la izquierda sostiene la correa (abajo, del lado de Toto)
    p.manoI = [0.3, 0.28, 0.32]; p.codoI = [0.8, -0.6, -0.2];
    if (t >= T.atiende) alOido(bruno, p, TEL); else { enBase(TEL); manoA(bruno, p, "D", TELB.position.clone().add(V3(0.0, 0.12, 0.05)), sg(t, -0.2, T.atiende), [-0.9, -0.5, -0.2]); }
    p.t = t; bocaVoz(p, t, T.b2, ENV.b2, 0.6); return p;
  }
  if (t < P1 && pa.startsWith("P2")) {
    const i = chipActual(t), m = T.mont[Math.max(0, i)];
    const base = [
      { giro: 0.1, ...aC(0.1, 0.12), ...CANSADO, ...BRAZOS.apoyado, inclina: 0.05 },
      { giro: 0.1, ...aC(0.0, 0.22, 0.12), ...GASTADO, ...BRAZOS.apoyado, inclina: 0.3, manoI: [0.12, 0.33, 0.4], codoI: [0.6, -0.8, 0.2] },
      { giro: 0.0, ...aC(0.0, 0.62, 0.0), ...GASTADO, ojos: { abiertos: 0.2, tension: 0.6 }, ...BRAZOS.apoyado, inclina: 0.62, manoI: [0.2, 0.15, 0.45], codoI: [0.8, -0.6, 0.1] },
    ][Math.max(0, i)];
    const p = poseEn(t, [[0, { x: BRUNO_M.x, z: BRUNO_M.z, ...base }]]);
    if (t >= m.atiende) alOido(bruno, p, TEL); else { enBase(TEL); manoA(bruno, p, "D", TELB.position.clone().add(V3(0.0, 0.12, 0.05)), 1, [-0.9, -0.5, -0.2]); }
    p.t = t; bocaVoz(p, t, T.b3, ENV.b3, 0.55); bocaVoz(p, t, T.b4, ENV.b4, 0.5); bocaVoz(p, t, T.b5, ENV.b5, 0.45); return p;
  }
  if (t < P1) {
    // la sala de recuperación: asomado en el vano (P3) y después adentro, al lado de la camilla
    const adentro = t >= T.p3c - 0.05;
    const gI = dirGiro(BRUNO_R.x, BRUNO_R.z, INES_R.x, INES_R.z);
    const p = adentro ? poseEn(t, [
      [0, { x: BRUNO_R.x, z: BRUNO_R.z, giro: gI * 0.7, ...aC(0.2, 0.05), ...SECO, ...BRAZOS.costado, manoD: [-0.2, 0.33, 0.32], codoD: [-0.8, -0.6, -0.2] }],
      [T.p4 + 0.4, { ...aC(0.25, 0.0), ...CARA.neutra }, 0.3],
      [T.ronca + 0.2, { ...aC(0.45, 0.3), ...MEDIA }, 0.3],
      [T.ring5 + 0.15, { ...aC(0.55, 0.35), ...CARA.neutra, cejas: { alto: 0.35, ang: 0.3 } }, 0.2],
      [T.b10 + 0.1, { ...aC(0.35, 0.1), ...GASTADO, ojos: { abiertos: 0.6, tension: 0.4 } }, 0.25],
    ]) : poseEn(t, [[0, { x: BRUNO_PU.x, z: BRUNO_PU.z, giro: 0.75, inclina: 0.12, ladea: -0.1, ...aC(0.1, 0.1, 0.15), ...CARA.esperanza, cejas: { alto: 0.45, ang: 0.7 }, ...BRAZOS.costado, manoD: [-0.16, 0.38, 0.3], codoD: [-0.8, -0.6, -0.2] }]]);
    p.t = t; bocaVoz(p, t, T.b6, ENV.b6, 0.55); bocaVoz(p, t, T.b8, ENV.b8, 0.55); bocaVoz(p, t, T.b10, ENV.b10, 0.55); return p;
  }
  // ---- parte 2 ----
  if (pa.startsWith("Q1")) {
    // la tablet en las dos manos, apuntando a Toto (foto) y después la baja; el pulgar arriba para Vero
    const p = poseEn(t, [
      [0, { x: BRUNO_M.x, z: BRUNO_M.z, giro: 0.3, ...aC(0.35, 0.15), ...BUENA, ...BRAZOS.ofrece(0.27, 0.46, 0.42) }],
      [T.envia + 0.25, { ...aC(0.2, 0.2), ...BRAZOS.ofrece(0.27, 0.34, 0.36) }, 0.3],
      [T.v12 + 0.1, { giro: 0.45, ...aC(0.9, 0.0), ...FELIZ }, 0.35],
      [T.pulgar, { ...BRAZOS.ofrece(0.27, 0.34, 0.36), manoI: [0.33, 0.62, 0.3], codoI: [0.9, -0.4, -0.2] }, 0.25],
    ]);
    p.t = t; return p;
  }
  if (pa.startsWith("Q2") || pa.startsWith("Q4") || pa === "Q5i") {
    const p = poseEn(t, [[0, { x: BRUNO_M.x + 0.55, z: BRUNO_M.z, giro: -0.15, ...aC(-0.1, 0.3), ...BUENA, ...BRAZOS.apoyado }],
      [T.q4 + 0.05, { ...aC(0.25, 0.25), ...CARA.neutra }, 0.2],
      [T.b10b + LEN.b10, { ...aC(0.35, 0.1), ...BUENA }, 0.3],
      [T.i13 + 0.4, { giro: -0.6, ...aC(-0.6, 0.0), ...CARA.neutra }, 0.3],
      [T.b14, { ...aC(-0.65, 0.0), ...MEDIA }, 0.2]]);
    // el dedo en la tablet cuando toca
    const toc = [T.tocaCir, T.tocaCoco].find((x) => t >= x - 0.3 && t < x + 0.25);
    if (toc !== undefined) { tablet.updateMatrixWorld(true); manoA(bruno, p, "D", tablet.localToWorld(V3(0.05, 0.12, 0.04)), Math.sin(sg(t, toc - 0.3, toc + 0.25) * Math.PI), [-0.8, -0.6, -0.2]); p.dedoD = 1; }
    p.t = t; bocaVoz(p, t, T.b10b, ENV.b10, 0.55); bocaVoz(p, t, T.b14, ENV.b14, 0.6); return p;
  }
  if (pa === "Q3") {
    const g = dirGiro(BRUNO_R3.x, BRUNO_R3.z, TOTO_R.x + 0.3, TOTO_R.z);
    const p = poseEn(t, [[0, { x: BRUNO_R3.x, z: BRUNO_R3.z, giro: g, ...aC(0.0, 0.3), ...MEDIA, ...BRAZOS.ofrece(0.27, 0.42, 0.42) }]]);
    p.t = t; return p;
  }
  // Q5: detrás del mostrador; señala la puerta del quirófano con "Preguntale a él."
  const p = poseEn(t, [
    [0, { x: BRUNO_M.x + 0.4, z: BRUNO_M.z, giro: 0.2, ...aC(0.45, 0.05), ...BUENA, ...BRAZOS.apoyado }],
    [T.b15, { giro: 0.0, ...aC(-0.5, 0.0), ...MEDIA, manoD: [-0.55, 0.5, 0.2], codoD: [-1, -0.3, -0.1], dedoD: 1 }, 0.3],
    [T.ladra, { giro: 0.3, ...aC(0.3, 0.2), ...FELIZ, ...BRAZOS.apoyado }, 0.4],
  ]);
  p.t = t; bocaVoz(p, t, T.b15, ENV.b15, 0.6); return p;
}
// Inés de cirugía
function poseInesQ(t) {
  const pa = planoActual;
  if (t < P1) {
    const gB = dirGiro(INES_R.x, INES_R.z, BRUNO_PU.x, BRUNO_PU.z), gB2 = dirGiro(INES_R.x, INES_R.z, BRUNO_R.x, BRUNO_R.z);
    const p = poseEn(t, [
      [0, { x: INES_R.x, z: INES_R.z, giro: -0.15, inclina: 0.28, ...aC(-0.1, 0.55), ...CARA.concentrada, manoI: [0.2, 0.42, 0.42], manoD: [-0.2, 0.42, 0.42], codoI: [0.8, -0.6, -0.2], codoD: [-0.8, -0.6, -0.2] }],
      [T.b6 + 0.5, { inclina: 0.12, ...aC(gB * 0.45, 0.1), ...CARA.neutra }, 0.35],
      [T.i7, { ...aC(gB * 0.35, 0.05), ...SECO }, 0.2],
      [T.p3c, { ...aC(gB2 * 0.6, 0.05), ...SECO }, 0.3],
      [T.b8 + LEN.b8, { ...aC(gB2 * 0.6, 0.05), ...SECO, ojos: { abiertos: 0.85, tension: 0.1 }, cejas: { alto: 0.1, ang: -0.05 } }, 0.15],
      [T.toma, { inclina: 0.3, ...aC(0.25, 0.45), ...SECO }, 0.4],
      [T.ring5 + 0.1, { ...aC(0.05, 0.35), ...SECO, cejas: { alto: 0.3, ang: 0.1 } }, 0.2],
      [T.miraCoco + 0.15, { ...aC(0.75, 0.2), ...SECO, cejas: { alto: 0.55, ang: 0.0 } }, 0.3],
    ]);
    // el teléfono: lo toma de la mano de Bruno y se lo lleva a la oreja de Toto (el auricular ya está puesto: ponerTelFinal)
    if (t >= T.toma - 0.35) { TEL.updateMatrixWorld(true); manoA(inesQ, p, "D", TEL.localToWorld(V3(0, -0.11, 0)), sg(t, T.toma - 0.35, T.toma - 0.05), [-0.9, -0.5, -0.1]); }
    p.t = t; bocaVoz(p, t, T.i7, ENV.i7, 0.55); return p;
  }
  if (pa.startsWith("Q2")) {
    // cruza la recepción hacia la puerta del quirófano, los guantes en alto
    const u = sg(t, T.q2 - 0.1, T.q2i - 0.05);
    const x0 = VX + 0.6, z0 = 0.2;
    const p = poseEn(t, [[0, { ...aC(0.3, 0.0), ...CARA.neutra, manoI: [0.22, 0.6, 0.3], manoD: [-0.22, 0.6, 0.3], codoI: [0.8, -0.6, 0.1], codoD: [-0.8, -0.6, 0.1] }]]);
    Object.assign(p, { x: lerp(x0, QPUERTA.x + 0.2, u), z: lerp(z0, QPUERTA.z, u), giro: dirGiro(x0, z0, QPUERTA.x, QPUERTA.z), paso: u > 0 && u < 1 ? 1 : 0 });
    p.t = t; return p;
  }
  // Q4b: sale del quirófano sacándose el guante izquierdo
  const u = sg(t, T.q4b - 0.1, T.q4b + 0.6);
  const p = poseEn(t, [
    [0, { ...aC(0.35, 0.1), ...CARA.neutra, manoI: [0.12, 0.42, 0.38], manoD: [-0.08, 0.42, 0.4], codoI: [0.8, -0.6, 0.0], codoD: [-0.8, -0.6, 0.0] }],
    [T.guante + 0.1, { manoI: [0.24, 0.3, 0.3], manoD: [-0.18, 0.3, 0.34] }, 0.3],
    [T.i13, { ...aC(0.5, 0.0), ...CARA.neutra, cejas: { alto: 0.35, ang: 0.15 } }, 0.3],
    [T.b14 + 0.3, { ...aC(0.5, 0.0), ...CARA.sonrisa, cejas: { alto: 0.5, ang: 0.05 } }, 0.3],
  ]);
  Object.assign(p, { x: lerp(VX + XL + 0.1, QPUERTA.x + 0.25, eio(u)), z: QPUERTA.z + 0.1, giro: lerp(Math.PI / 2, 0.9, eio(u)), paso: u > 0.02 && u < 0.98 ? 1 : 0 });
  p.t = t; bocaVoz(p, t, T.i13, ENV.i13, 0.55); return p;
}
// Inés de consultorio (el cierre)
function poseInes(t) {
  const p = poseEn(t, [[0, { x: VX - 0.25, z: BRUNO_M.z + 0.08, giro: 0, ...aC(0.0, 0.03), ...CARA.sonrisa, ...BRAZOS.apoyado }], [T.i16 + 1.4, { ...aC(0.06, 0.0, 0.06), ...BUENA }, 0.6]]);
  p.t = t; bocaVoz(p, t, T.i16, ENV.i16, 0.55); return p;
}
// Vero de calle: la vereda (P1, Q1) y la recepción (Q5)
function poseVero(t) {
  const pa = planoActual;
  if (t < P1) {
    const s = t >= T.saluda ? saludo(t, "I", sg(t, T.saluda, T.saluda + 0.2)) : { manoI: [0.29, -0.08, 0.04], codoI: [0.8, -0.6, -0.2] };
    const p = poseEn(t, [[0, { x: VERO_A.x, z: VERO_A.z, giro: 0.15, ...aC(0.1, 0.0), ...CARA.esperanza, ...BRAZOS.costado }],
      [T.b2 + 0.6, { ...aC(0.0, 0.0), ...CARA.sorpresa, boca: { sonrisa: 0.4, abierta: 0.2, ancho: 0.9 } }, 0.2],
      [T.saluda, { ...aC(0.05, 0.0, 0.1), ...FELIZ }, 0.2]]);
    Object.assign(p, s);
    p.t = t; alOido(vero, p, celuV, 1.25); return p;   // el celular en la oreja derecha
  }
  if (pa.startsWith("Q1")) {
    const p = poseEn(t, [[0, { x: VERO_A.x - 0.1, z: VERO_A.z, giro: 0.05, ...aC(0.0, 0.4), ...CARA.neutra, ...BRAZOS.celular }],
      [T.vibra1 + 0.1, { ...aC(0.0, 0.45), ...CARA.sorpresa }, 0.15],
      [T.v12, { ...aC(0.0, 0.1), ...FELIZ, manoI: [0.14, 0.62, 0.36], manoD: [0.02, 0.62, 0.36] }, 0.3]]);
    p.t = t; bocaVoz(p, t, T.v12, ENV.v12, 0.6); return p;
  }
  // Q5: entra por la puerta de calle y llega al mostrador
  const u = sg(t, T.entraV[0], T.entraV[1]);
  const p = poseEn(t, [[0, { ...aC(-0.2, 0.0), ...BUENA, ...BRAZOS.costado }], [T.v1b + LEN.v1, { ...aC(-0.6, 0.05), ...CARA.esperanza }, 0.3], [T.trota[0] + 0.3, { ...aC(-1.0, 0.25), ...FELIZ }, 0.3], [T.ladra, { ...aC(-0.4, 0.5), ...DERRETIDA }, 0.3]]);
  Object.assign(p, { x: lerp(PCALLE_V.x, VERO_Q5.x, eio(u)), z: lerp(PCALLE_V.z, VERO_Q5.z, eio(u)), giro: u < 1 ? dirGiro(PCALLE_V.x, PCALLE_V.z, VERO_Q5.x, VERO_Q5.z) : lerp(-2.4, -2.0, sg(t, T.trota[0], T.trota[1])), paso: u > 0.02 && u < 0.98 ? 1 : 0 });
  p.t = t; bocaVoz(p, t, T.v1b, ENV.v1, 0.6); return p;
}
// Vero de entrecasa (la cocina, Q3): el celular en altavoz cerca de la cara
function poseVeroC(t) {
  const p = poseEn(t, [[0, { x: VERO_K.x, z: VERO_K.z, giro: 0.35, ...aC(0.0, 0.35), ...CARA.neutra, manoI: [0.07, 0.4, 0.33], manoD: [-0.07, 0.4, 0.33], codoI: [0.6, -0.8, -0.3], codoD: [-0.6, -0.8, -0.3] }],
    [T.vibra3 + 0.15, { ...aC(0.0, 0.4), ...CARA.sorpresa }, 0.15],
    [T.q3v, { ...aC(0.05, 0.2, 0.12), ...DERRETIDA, manoI: [0.07, 0.5, 0.36], manoD: [-0.07, 0.5, 0.36] }, 0.25]]);
  p.t = t; bocaVoz(p, t, T.v9b, ENV.v9, 0.5); return p;
}
// la señora de Luna: sentada esperando (P2a, P2b); a las 14:00 se levanta y se va; Q4 en el mostrador
function poseSenora(t) {
  if (t < P1) {
    const u = sg(t, T.seVa, T.seVa + 1.1);
    if (u <= 0) return { x: SEN_S.x, y: 0, z: SEN_S.z, sentado: 1, giro: 0, ...aC(-0.25, 0.1), ...CARA.neutra, ...BRAZOS.costado, manoD: [-0.2, 0.25, 0.25], manoI: [0.2, 0.25, 0.25], t };
    const sube = sg(u, 0, 0.3);
    return { x: lerp(SEN_S.x, VX + 2.4, sg(u, 0.25, 1)), y: 0, z: lerp(SEN_S.z, ZF + 0.25, sg(u, 0.25, 1)), sentado: 1 - sube, giro: lerp(0, Math.PI / 2 + 0.3, sg(u, 0.1, 0.4)), paso: u > 0.3 ? 1 : 0, ...aC(0.2, 0.0), ...CARA.fastidio, ...BRAZOS.costado, manoD: [-0.3, -0.02, 0.06], t };
  }
  return { x: SEN_Q4.x, z: SEN_Q4.z, giro: Math.PI - 0.35, ...aC(0.2, 0.05), ...CARA.sonrisa, ...BRAZOS.apoyado, t };
}
// Toto
function poseToto(t) {
  const pa = planoActual;
  if (t < P1 && (pa === "P1" || pa === "P1b")) {
    const c = poseEn(t, [[0, { cab: [-0.35, -0.05, 0.1], cola: 0.3, orejas: 0.8, cejas: 0.3 }], [T.v1 + 0.3, { cab: [-0.6, -0.15, 0.2], cola: 0.5, orejas: 0.9, cejas: 0.6 }, 0.3], [T.gira + 0.3, { cab: [0.6, -0.05, 0.1], cola: 0.6, orejas: 1, cejas: 0.4 }, 0.3], [T.saluda, { cab: [0.7, -0.1, 0.15], cola: 1, orejas: 1, cejas: 0.6 }, 0.25]]);
    return { x: TOTO_M.x, y: MOS.alto, z: TOTO_M.z, giro: -0.3, sentado: 1, orejas: c.orejas, cola: c.cola, cejas: c.cejas, jadeo: 0.4, cabeza: { giro: c.cab[0], asiente: c.cab[1], ladea: c.cab[2] }, t };
  }
  if (t < P1 || pa === "Q3") {
    // echado en la camilla, dormido: ojos como dos líneas, la cabeza apoyada; Q3 se despierta (la cabeza sube, ojos a media asta)
    const desp = pa === "Q3" ? eio(sg(t, T.despierta, T.despierta + 0.6)) : 0;
    const env = t >= T.ronca && t < T.ronca + ENV.ronq.length / 30 && t < P1 ? ENV.ronq[Math.floor((t - T.ronca) * 30)] ?? 0 : 0;
    const or = 0.12 + env * 0.3 * (0.5 + 0.5 * Math.sin(t * 45));
    return { x: TOTO_R.x, y: TOTO_R.y, z: TOTO_R.z, giro: Math.PI / 2, echado: 1, orejas: lerp(or, 0.55, desp), cola: 0.0, colaAlta: 0.3, cejas: lerp(0, 0.5, desp), ojos: { abiertos: lerp(0.12, 0.5, desp) }, cabeza: { giro: lerp(-0.45, -0.75, desp), asiente: lerp(0.32, -0.05, desp), ladea: lerp(0.3, 0.1, desp) }, t, _ronca: env };
  }
  if (pa === "Q5") {
    // entra trotando desde la puerta del quirófano, con el collar; se sienta delante de Vero y le ladra contento
    const u = sg(t, T.trota[0], T.trota[1]), anda = u > 0.01 && u < 0.99;
    const x0 = QPUERTA.x - 0.2, z0 = QPUERTA.z;
    const lad = t >= T.ladra && t < T.ladra + 0.5 ? Math.sin(sg(t, T.ladra, T.ladra + 0.5) * Math.PI * 2) : 0;
    return { x: lerp(x0, TOTO_Q5.x, eio(u)), y: 0, z: lerp(z0, TOTO_Q5.z, eio(u)), giro: anda ? dirGiro(x0, z0, TOTO_Q5.x, TOTO_Q5.z) : dirGiro(TOTO_Q5.x, TOTO_Q5.z, VERO_Q5.x, VERO_Q5.z), sentado: sg(t, T.trota[1] - 0.1, T.trota[1] + 0.2), paso: anda ? 1 : 0, pasoVel: 16, cola: 1, orejas: 0.9, cejas: 0.6, jadeo: 0.6 + 0.4 * Math.abs(lad), cabeza: { giro: 0.2, asiente: -0.3 - 0.1 * lad, ladea: 0.1 }, t };
  }
  // C: con las patas en el mostrador, el collar puesto
  return { x: VX + 0.45, y: 0, z: MOS.z + MOS.d / 2 + 0.32, giro: Math.PI, erguido: 1, apoyo: [0.1, MOS.alto / 0.9 - 0.02, 0.34], cola: 0.8, orejas: 0.9, cejas: 0.5, jadeo: 0.7, cabeza: { giro: -0.35, asiente: -0.15, ladea: 0.12 }, t };
}
function poseCoco(t) {
  const env = t >= T.roncaCoco && t < T.roncaCoco + ENV.ronq.length / 30 ? ENV.ronq[Math.floor((t - T.roncaCoco) * 30)] ?? 0 : 0;
  return { x: COCO_R.x, y: COCO_R.y, z: COCO_R.z, giro: -0.25, echado: 1, orejas: 0.25 + env * 0.3 * Math.sin(t * 45), cola: 0, colaAlta: 0.3, ojos: { abiertos: 0.12 }, cabeza: { giro: 0.2, asiente: 0.3, ladea: -0.3 }, t, _ronca: env };
}

// =====================================================================================================
// RENDER
// =====================================================================================================
function luces(pa) {
  const cocina = pa.startsWith("Q3k") || pa === "Q3v";
  const rec = /^P3|^P4|^P5[b]?$|^Q3$/.test(pa);
  cielo.intensity = 1.85; relleno.intensity = 0.75; sol.intensity = rec ? 1.1 : 1.35; sol.color.set(0xf6f8ff);
  luzLamp.intensity = 0; LAMPARA.visible = !cocina ? false : true;
  luzCalor.intensity = rec ? 1.6 : 0;
  VENTANA.material.color.set(0xefe6cc);
  const cx = cocina ? 0 : rec ? RX : VX;
  if (cocina) { sol.position.set(-0.3, 2.6, -0.2); sol.target.position.set(0.1, 0, 0.3); } else { sol.position.set(cx + 1.2, 6.5, 1.7); sol.target.position.set(cx, 0.5, -0.5); }
  sol.target.updateMatrixWorld();
}
function renderAt(tIn) {
  const t = en(tIn, P1, P2) ? (tIn < (P1 + P2) / 2 ? P1 - 0.001 : P2) : tIn;
  const p2 = t >= P2;
  const pl = planoEn(t); planoActual = pl[0];
  const pa = planoActual;
  luces(pa);
  dibujarInterfaz(t);
  const recep = /^P1|^P2|^Q1|^Q2|^Q4|^Q5|^C/.test(pa) && !/i$/.test(pa);
  const sala = /^P3|^P4|^P5$|^P5b|^Q3$/.test(pa);
  const cocina = pa === "Q3k" || pa === "Q3v";
  const vis = {
    bruno: (recep && pa !== "P1b" && pa !== "C") || (sala && pa !== "P3b" && pa !== "P4b"),
    vero: (t < P1 && (pa === "P1" || pa === "P1b")) || pa === "Q1" || pa === "Q1b" || pa === "Q5",
    veroC: cocina, inesQ: (sala && pa !== "P3c" && pa !== "Q3") || pa === "Q2" || pa === "Q4b" || pa === "Q4c", ines: pa === "C",
    senora: (pa === "P2a" || pa === "P2b" || pa === "P2c") || pa === "Q4" || pa === "Q4c",
    toto: pa === "P1" || pa === "P1b" || sala || pa === "Q1" || pa === "Q1b" || (pa === "Q5" && t >= T.trota[0] - 0.05) || pa === "C",
    coco: sala,
  };
  if (pa === "P1b") vis.bruno = true;
  bruno.raiz.visible = vis.bruno; vero.raiz.visible = vis.vero; veroC.raiz.visible = vis.veroC; inesQ.raiz.visible = vis.inesQ; ines.raiz.visible = vis.ines; senora.raiz.visible = vis.senora; toto.raiz.visible = vis.toto; coco.raiz.visible = vis.coco;
  // el set de la parte 1 / 2: la pizarra solo en la parte 1; la tablet del mostrador solo en la parte 2
  PIZARRA.visible = !p2; tablet.visible = p2;
  ISA[0].visible = !(pa === "P1" || pa === "P1b" || pa.startsWith("Q1")); ISA[1].visible = true;
  TEL.visible = true; RING.visible = false; celuV.visible = false; tabletM.visible = false; TRANS.visible = false; GUANTE_SUELTO.visible = false;
  ponerGuante(inesQ, "I", !(pa.startsWith("Q4") && t >= T.guante));
  // ---- cámara ----
  if (pl[2]) ponerCam(catmull(pl[2], t), t);
  if (VER && VER.startsWith("cam:")) ponerCam(VER.slice(4).split(",").map(Number), t);
  if (window.__cam) ponerCam(window.__cam, t);
  camera.updateMatrixWorld(true);
  // ---- poses ----
  if (vis.toto) { toto.poner(poseToto(t)); toto.panuelo.visible = false; toto.curita.visible = false; const P = poseToto(t); const r = P._ronca ?? 0; hocico(toto).scale.setScalar(1 + 0.14 * r); const resp = P.echado ? 1 + 0.045 * Math.sin(t * 2.6) : 1; toto.torso.scale.set(1 + (resp - 1) * 0.6, resp, 1); }
  if (vis.coco) { const P = poseCoco(t); coco.poner(P); hocico(coco).scale.setScalar(1 + 0.14 * (P._ronca ?? 0)); const resp = 1 + 0.04 * Math.sin(t * 3.1 + 1); coco.torso.scale.set(1 + (resp - 1) * 0.6, resp, 1); }
  if (vis.bruno || (sala && t < P1)) bruno.poner(poseBruno(t));
  if (vis.toto) toto.raiz.updateMatrixWorld(true);
  ponerTelFinal(t);
  if (vis.vero) { vero.poner(poseVero(t)); ponerCeluVero(t); }
  if (vis.veroC) { veroC.poner(poseVeroC(t)); veroC.cuerpo.getWorldQuaternion(_q); const a = manoMundo(veroC, "I", _a), b = manoMundo(veroC, "D", _b); celuV.visible = true; celuV.position.copy(a).add(b).multiplyScalar(0.5).add(V3(0, 0.09, 0)); celuV.quaternion.copy(_q); celuV.rotateX(-0.35); pantallaCel("despierta"); }
  if (vis.inesQ) inesQ.poner(poseInesQ(t));
  if (vis.ines) ines.poner(poseInes(t));
  if (vis.senora) { senora.poner(poseSenora(t)); TRANS.visible = true; if (t < P1) { if (t < T.seVa + 0.3) { TRANS.position.set(SILLAS[0].x, 0.49, SILLAS[0].z); TRANS.rotation.set(0, 0.1, 0); } else { const m = manoMundo(senora, "D", _a); TRANS.position.copy(m).add(V3(0, -0.36, 0)); TRANS.rotation.set(0, senora.raiz.rotation.y, 0); } } else { TRANS.position.set(SEN_Q4.x - 0.2, MOS.alto, MOS.z + 0.05); TRANS.rotation.set(0, Math.PI / 2, 0); } }
  // la tablet en la mano de Bruno (Q1 la foto; Q3 el video)
  if (vis.bruno && (pa === "Q1" || pa === "Q3")) { tabletM.visible = true; const a = manoMundo(bruno, "I", _a), b = manoMundo(bruno, "D", _b); tabletM.position.copy(a).add(b).multiplyScalar(0.5).add(V3(0, 0.1, 0)); bruno.cuerpo.getWorldQuaternion(_q); tabletM.quaternion.copy(_q); tabletM.rotateY(Math.PI); tabletM.rotateX(-0.15); }
  // la correa de Toto (P1): de la mano izquierda de Bruno al collar
  if (vis.toto && vis.bruno && (pa === "P1" || pa === "P1b" || pa === "Q1" || pa === "Q1b")) { toto.collar.updateMatrixWorld(true); const mv = manoMundo(bruno, "I", _a).clone().add(V3(0, -0.06, 0)); ponerCorrea(mv, toto.collar.localToWorld(V3(0, 0.02, -0.1)), true, 0.12); } else ponerCorrea(null, null, false);
  // los arcos del ring alrededor del auricular cuando suena
  if (sonando(t) && TEL.visible) { RING.visible = true; RING.position.copy(TEL.position); RING.quaternion.copy(camera.quaternion); const k = halfK(); RING.children.forEach((a) => { const i = a.userData.i, f = 0.5 + 0.5 * Math.sin(t * 14 - i * 1.2); a.material.opacity = 0.35 + 0.65 * f; }); }
  const lb = sonando(t) && t < P1 ? 0.5 + 0.5 * Math.sin(t * 20) : 0; luzBaseM.emissiveIntensity = lb * 1.2;
  // la puerta de vaivén de la recepción (Q2 entra Inés, Q4b sale, Q5 sale Toto) y la de la calle (la señora, Vero)
  const uQ = Math.max(sg(t, T.q2i - 0.35, T.q2i - 0.1) * (1 - sg(t, T.q2i, T.q2i + 0.2)), sg(t, T.abreQ - 0.15, T.abreQ + 0.1) * (1 - sg(t, T.abreQ + 0.55, T.abreQ + 0.9)), sg(t, T.trota[0] - 0.2, T.trota[0]) * (1 - sg(t, T.trota[0] + 0.35, T.trota[0] + 0.6)));
  QHOJA.rotation.y = Math.PI / 2 - 1.2 * eio(uQ);
  const uC = Math.max(sg(t, T.campana - 0.3, T.campana) * (1 - sg(t, T.campana + 0.4, T.campana + 0.8)), sg(t, T.entraV[0] - 0.25, T.entraV[0] + 0.05) * (1 - sg(t, T.entraV[0] + 0.5, T.entraV[0] + 0.9)));
  PCALLE.rotation.y = 1.2 * eio(uC);
  // el guante que se sacó, en la mano derecha (Q4b)
  if (vis.inesQ && pa.startsWith("Q4") && t >= T.guante) { GUANTE_SUELTO.visible = true; const m = manoMundo(inesQ, "D", _a); GUANTE_SUELTO.position.copy(m).add(V3(0, -0.06, 0.03)); }
  // ---- insertos ----
  const INS = { P5i: INS_TEL, Q1i: INS_AV1, Q2i: INS_PANEL, Q3i: INS_AV3, Q4i: INS_PANEL, Q5i: INS_AV5 }[pa];
  for (const I of INSERTOS) I.g.visible = I === INS;
  if (INS) {
    ponerCam([0, 1.5, 3, 0, 1.5, 0, 50], t); camera.updateMatrixWorld(true);
    const k = sg(t, pl[1], pl[1] + 1.2), kk = halfK();
    INS.g.position.set(0, 0, -1); INS.g.scale.setScalar(kk * PXK * lerp(1.0, 1.03, eo(k)));
  }
  for (const p of TODOS) if (p.ojoLejano && p.raiz.visible) p.ojoLejano(camera.position);
  // ---- tarjetas ----
  AVISOS.length = 0;
  for (const k in GL) { if (Array.isArray(GL[k])) GL[k].forEach((g) => (g.visible = false)); else GL[k].visible = false; }
  for (const g of GUIAS) g.visible = false;
  if (!LIMPIO && !en(tIn, P1, P2)) tarjetas(t);
  renderer.render(scene, camera);
}
// el auricular en la sala (P3-P5): en la mano de Bruno; desde T.toma viaja a la oreja de Toto (Bruno ya puesto en t)
function ponerTelFinal(t) {
  const pa = planoActual;
  if (t >= P1) { enBase(TEL); return; }
  if (!/^P3|^P4|^P5/.test(pa)) return;
  if (t < T.toma) { enMano(TEL, bruno, "D", 0.25, 0.08); return; }
  const u = eio(sg(t, T.toma, T.oreja));
  enOrejaToto(TEL); const q1 = TEL.quaternion.clone(), p1 = TEL.position.clone();
  if (u < 1) { enMano(TEL, bruno, "D", 0.25, 0.08); const q0 = TEL.quaternion.clone(), p0 = TEL.position.clone(); TEL.position.lerpVectors(p0, p1, u); TEL.position.y += Math.sin(u * Math.PI) * 0.12; TEL.quaternion.slerpQuaternions(q0, q1, u); }
  if (t >= T.ring5) { TEL.position.x += Math.sin(t * 70) * 0.006; TEL.position.y += 0.05 * sg(t, T.ring5, T.ring5 + 0.2); }
}
// el celular de Vero (afuera): en la oreja derecha (P1) o en las manos (Q1)
function ponerCeluVero(t) {
  const pa = planoActual;
  celuV.visible = true;
  if (t < P1) { enOreja(celuV, vero, 1.25); pantallaCel("ingreso"); return; }
  vero.cuerpo.getWorldQuaternion(_q); const a = manoMundo(vero, "I", _a), b = manoMundo(vero, "D", _b);
  celuV.position.copy(a).add(b).multiplyScalar(0.5).add(V3(0, 0.09, 0)); celuV.quaternion.copy(_q);
  if (t >= T.v12) { celuV.rotateY(Math.PI); celuV.rotateX(0.1); } else celuV.rotateX(-0.6);
  pantallaCel("ingreso");
}
function tarjetas(t) {
  const ent = (ti) => (t < ti ? 0 : 0.75 + 0.25 * bk(sg(t, ti, ti + 0.18)));
  const pa = planoActual;
  const telPx = () => objPx(TEL, V3(0, 0.05, 0));
  if (pa === "P1") {
    ponerGlobo(GL.jue, 330, 470, 1, null);
    if (t >= T.v1 && t < T.v1 + LEN.v1 + 0.35) { const [x, y] = telPx(); ponerGlobo(GL.v1, 700, 640, ent(T.v1), [x, y], 2); }
    if (t >= T.b2) { verGlobo(GL.b2, t >= T.b2 + 0.75 ? 99 : 1); hablar(GL.b2, bruno, ent(T.b2), 1, 60); }
  }
  if (pa === "P1b") ponerGlobo(GL.jue, 330, 200, 1, null);
  if (pa.startsWith("P2")) {
    const i = chipActual(t), m = T.mont[i];
    ponerGlobo([GL.h1030, GL.h1200, GL.h1400][i], 220, 220, ent(m.ini), null, 1);
    const g = [GL.b3, GL.b4, GL.b5][i]; if (t >= m.voz) { if (i === 2) verGlobo(g, t >= m.voz + 1.25 ? 99 : 2); hablar(g, bruno, ent(m.voz), 1, 40); }
    const [tx, ty] = objPx(TELB, V3(0, 0.04, 0));
    ponerContador([2, 13, 27][i], 780, 1500, ent(m.ini + 0.1)); ponerGuia(GUIAS[0], 780 - 120, 1500 - 110, tx, ty, eo(sg(t, m.ini + 0.1, m.ini + 0.35)));
  }
  if (pa === "P3") { ponerGlobo(GL.h1530, 220, 220, 1, null, 1); if (t >= T.b6) { verGlobo(GL.b6, t >= T.b6 + 0.7 ? 99 : 1); hablar(GL.b6, bruno, ent(T.b6), 1, 120); } }
  if (pa === "P3b" && t >= T.i7) hablar(GL.i7, inesQ, ent(T.i7), 1, 0);
  if (pa === "P3c" && t >= T.b8) hablar(GL.b8, bruno, ent(T.b8), 1, 0);
  if (pa === "P4") { ponerGlobo(GL.r1, 330, 1450, ent(T.rot[0]), null, 1); ponerGlobo(GL.r2, 690, 1690, ent(T.rot[1]), null, 1); }
  if (pa === "P4b" && t >= T.v9) { const [x, y] = telPx(); ponerGlobo(GL.v9, 560, 560, ent(T.v9), [x, y], 2); }
  if (pa === "P5b" && t >= T.b10) hablar(GL.b10, bruno, ent(T.b10), 1, 0);
  if (pa === "Q1") ponerGlobo(GL.jue2, 280, 220, 1, null);
  if (pa === "Q1i") ponerGlobo(GL.rAv1, 540, 220, 1, null, 1);
  if (pa === "Q1b" && t >= T.v12) hablar(GL.v12, vero, ent(T.v12), 1, 0);
  if (pa === "Q2") ponerGlobo(GL.h1100, 220, 220, 1, null, 1);
  if (pa === "Q2i") ponerGlobo(GL.rPanel, 540, 230, 1, null, 1);
  if (pa === "Q3") ponerGlobo(GL.h1530b, 220, 220, 1, null, 1);
  if (pa === "Q3i") ponerGlobo(GL.rAv3, 540, 220, 1, null, 1);
  if (pa === "Q3v" && t >= T.v9b) { const [x, y] = objPx(celuV, V3(0, 0.05, 0)); ponerGlobo(GL.v9b, 560, 560, ent(T.v9b), [x, y], 2); }
  if (pa === "Q4" && t >= T.b10b) hablar(GL.b10b, bruno, ent(T.b10b), 1, 0);
  if (pa === "Q4b" && t >= T.i13) hablar(GL.i13, inesQ, ent(T.i13), 1, 0);
  if (pa === "Q4c" && t >= T.b14) hablar(GL.b14, bruno, ent(T.b14), 1, 0);
  if (pa === "Q4i") ponerGlobo(GL.rLlam, 540, 230, 1, null, 1);
  if (pa === "Q5i") { ponerGlobo(GL.h1700, 220, 220, 1, null, 1); ponerGlobo(GL.rAv5, 640, 330, 1, null, 2); }
  if (pa === "Q5") { if (t >= T.v1b && t < T.b15 + 0.1) hablar(GL.v1b, vero, ent(T.v1b), 1, 0); if (t >= T.b15) hablar(GL.b15, bruno, ent(T.b15), 1, 0); }
}

window.__tresRender = renderAt;
window.addEventListener("hf-seek", (e) => renderAt(e.detail.time));
window.__tresDbg = (t) => { renderAt(t); return { plano: planoActual, avisos: AVISOS.slice() }; };
renderAt(window.__hfThreeTime || 0);
if (window.__tresListo) window.__tresListo();
