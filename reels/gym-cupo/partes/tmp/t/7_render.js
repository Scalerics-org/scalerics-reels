
// =====================================================================================================
// POSES
// =====================================================================================================
const INSERTOS = ["P1b", "P3i", "P5", "Q1", "Q1c", "Q1s", "Q2", "Q2t", "Q2s", "Q4"];
const CAD = 1.35;   // pedaladas por segundo (la música a 128)
const FASE0 = (n) => 1.1 + n * 0.83;
// sentado en la bici `b`: pies en los pedales (fase), manos al manubrio (si `manos`), el cuerpo un poco adelante
function enLaBici(per, b, t, base, { fase = 1.2, inclina = 0.1, manos = true, bob = 0 } = {}) {
  const al = per.cfg.alto ?? 1, ry = BICI.asiento - per.CADERA * al + 0.005, zh = -0.035;
  const w = enBici(b, 0, ry, zh);
  const pz = (l) => { const [z, y] = pedalEn(fase, l); return [z - zh, y - ry]; };
  const p = poseEn(t, [[0, { ...base[0][1], x: w.x, y: w.y + bob, z: w.z, giro: b.rotation.y, sentado: 1, inclina }], ...base.slice(1)]);
  Object.assign(p, { x: w.x, y: w.y + bob, z: w.z, giro: b.rotation.y, sentado: 1, pies: { I: pz("I"), D: pz("D") } });
  if (manos) { const [my, mz] = BICI.manubrio; manoA(per, p, "I", enBici(b, 0.17, my + 0.03, mz - 0.01), 1, [0.9, -0.7, -0.4]); manoA(per, p, "D", enBici(b, -0.17, my + 0.03, mz - 0.01), 1, [-0.9, -0.7, -0.4]); }
  p.t = t; return p;
}
const pedaleo = (t, n, desde) => (t >= desde ? FASE0(n) + 2 * Math.PI * CAD * (t - desde) : FASE0(n));
const CONTENTO = { ...CARA.neutra, ojos: { abiertos: 0.95, y: 0.05, feliz: 0.15 }, cejas: { alto: 0.35, ang: 0.2, asim: 0 }, boca: { sonrisa: 0.45, abierta: 0, ancho: 1 } };
const ESPERA = [[0, { ...aC(0, -0.05), ...CONTENTO }]];
const pedalea = (t, n, desde, extra = {}) => { const f = pedaleo(t, n, desde), on = t >= desde; return { fase: f, inclina: on ? 0.26 : 0.1, bob: on ? Math.abs(Math.sin(f)) * 0.012 : 0, ...extra }; };
// la entrada de los nueve (P2): de la puerta caminando (cámara rápida) hasta el costado de la bici y el salto al asiento
const PUERTA_P = V3(XL + 0.35, 0, PUERTA.z);
function entrando(per, n, i, t) {
  const b = biciN(n), te = T.entra[i], ts = T.sienta[i];
  const costado = enBici(b, 0, 0, -0.72);   // detrás del asiento: sube por atrás (las piernas no cruzan el cuadro)
  if (t < ts - 0.16) {
    const u = sg(t, te, ts - 0.16), pos = PUERTA_P.clone().lerp(costado, eio(u));
    const g = dirGiro(PUERTA_P.x, PUERTA_P.z, costado.x, costado.z);
    const p = poseEn(t, [[0, { x: pos.x, z: pos.z, giro: g, ...aC(0, 0), ...CARA.sonrisa, ...BRAZOS.costado, paso: 1, pasoVel: 26 }]]);
    if (per === graciela) { p.manoI = [0.2, 0.05, 0.18]; }
    return p;
  }
  // el salto: de pie al costado → sentada
  const u = eio(sg(t, ts - 0.16, ts));
  const p = enLaBici(per, b, t, ESPERA, { fase: FASE0(n), manos: false });
  const al = per.cfg.alto ?? 1;
  Object.assign(p, { x: lerp(costado.x, p.x, u), y: lerp(0, p.y, u) + Math.sin(u * Math.PI) * 0.12, z: lerp(costado.z, p.z, u), sentado: u, giro: lerp(dirGiro(PUERTA_P.x, PUERTA_P.z, costado.x, costado.z), b.rotation.y, u) });
  if (u < 0.999) delete p.pies;
  return p;
}
// cada alumno en la parte 1 (P2-P5b) y en la parte 2 (Q3-Q3d)
function poseAlumno(per, n, i, t, pa) {
  const p2 = t >= P2;
  if (!p2 && pa === "P2" && t < T.sienta[i]) return entrando(per, n, i, t);
  const desde = p2 ? T.q3 - 2 : T.musica;
  const mira = 0.12 * Math.sin(n * 1.7);
  const base = [[0, { ...aC(mira, -0.05), ...CONTENTO }]];
  if (p2 || t >= T.musica) base.push([desde + 0.4, { ...aC(mira * 0.5, 0.05), ...CARA.sonrisa }, 0.3]);
  const p = enLaBici(per, biciN(n), t, base, pedalea(t, n, desde));
  // el que tira un perchero levanta la mano un momento
  const k = PERCH_DE.findIndex(([q]) => q === per);
  if (!p2 && k >= 0) { const tp = T.perchero[k], u = sg(t, tp - 0.2, tp) * (1 - sg(t, tp + 0.25, tp + 0.5)); if (u > 0) { const lado = PERCH_DE[k][1]; manoA(per, p, lado, enBici(biciN(n), lado === "I" ? 0.45 : -0.45, 1.45, 0.2), u, [lado === "I" ? 0.9 : -0.9, -0.3, -0.3]); } }
  return p;
}
function poseGraciela(t, pa) {
  const n = 1, p2 = t >= P2;
  if (!p2) return poseAlumno(graciela, n, 0, t, pa);
  // Q3: pedalea con la toalla en la mano izquierda; Q3b mira la bici 2 (ocupada), atrás (ocupada) y al profe; Q3d al cuello
  const gT = dirGiro(1.35, -1.8, PROFE.x, PROFE.z) - Math.PI;
  const base = [[0, { ...aC(0, 0.0), ...CARA.sonrisa, ojos: { abiertos: 1 } }],
    [T.g1 - 0.05, { ...aC(0.22, 0.0, 0.05), ...CARA.incredula, ojos: { abiertos: 0.95, x: 0.9 } }, 0.25],
    [T.g1 + LEN.g1 * 0.45, { ...aC(-0.2, -0.08, -0.05), ...CARA.incredula, ojos: { abiertos: 0.95, x: -0.9 } }, 0.3],
    [T.g1 + LEN.g1 * 0.85, { ...aC(-0.25, -0.18, 0.06), ...CARA.esperanza, cejas: { alto: 0.7, ang: 0.45 } }, 0.25],
    [T.cuello + 0.3, { ...aC(-0.1, -0.15, 0.08), ...CARA.feliz }, 0.25]];
  const p = enLaBici(graciela, biciN(n), t, base, pedalea(t, n, T.q3 - 2));
  if (t < T.cuello + 0.5) { const u = sg(t, T.q3b - 0.3, T.q3b); manoA(graciela, p, "I", enBici(biciN(n), 0.42, 1.45, 0.3), u, [0.9, -0.5, -0.3]); }
  // al cuello: las dos manos suben al cuello (T.cuello → +0.3) y bajan al manubrio
  const uc = sg(t, T.cuello - 0.2, T.cuello + 0.12) * (1 - sg(t, T.cuello + 0.3, T.cuello + 0.5));
  if (uc > 0) { const cI = cabezaW(graciela, [0.24, -0.2, 0.05]), cD = cabezaW(graciela, [-0.24, -0.2, 0.05]); manoA(graciela, p, "I", cI, uc, [0.9, -0.4, -0.3]); manoA(graciela, p, "D", cD, uc, [-0.9, -0.4, -0.3]); }
  p.t = t; bocaVoz(p, t, T.g1, ENV.g1, 0.6); return p;
}
function poseMauro(t, pa) {
  const p2 = t >= P2;
  const b = BICI_P;
  if (!p2) {
    if (pa === "P1") {
      // el celular en las dos manos a la altura del pecho; mira el grupo, sonríe; en "Hoy explota" levanta la cabeza
      const base = [[0, { ...aC(-0.15, 0.3), ...CARA.sonrisa, ojos: { abiertos: 1, y: -0.45, feliz: 0.2 }, cejas: { alto: 0.5, ang: 0.3 } }],
        [T.m1 + 0.1, { ...aC(-0.35, 0.22, -0.04), ...CARA.sonrisa, ojos: { abiertos: 1, y: -0.3, x: -0.2 } }, 0.3],
        [T.m1 + LEN.m1 * 0.6, { ...aC(-0.5, 0.05, -0.06), ...CARA.feliz, ojos: { abiertos: 1, feliz: 0.4, x: -0.4 } }, 0.3]];
      const p = enLaBici(mauro, b, t, base, { fase: 1.2, inclina: 0.04, manos: false });
      Object.assign(p, { manoI: [0.09, 0.36, 0.33], manoD: [-0.09, 0.36, 0.33], codoI: [0.6, -0.8, -0.3], codoD: [-0.6, -0.8, -0.3] });
      p.t = t; bocaVoz(p, t, T.m1, ENV.m1, 0.6); return p;
    }
    if (pa === "P2" || pa === "P3") {
      // en la tarima, las manos en el manubrio, mira la sala: la sonrisa se le va apagando
      const base = [[0, { ...aC(0, -0.05), ...CARA.sonrisa }], [T.sienta[6], { ...aC(0.05, 0.0), ...CARA.sorpresa, boca: { sonrisa: 0.2, abierta: 0.1, ancho: 0.8 } }, 0.4], [T.perchero[2], { ...aC(0.0, 0.05), ...CARA.resignado }, 0.5]];
      return enLaBici(mauro, b, t, base, { fase: 1.2, inclina: 0.06 });
    }
    if (pa === "P4") {
      // la pausa: se acerca el micrófono con la izquierda; seco: "Los «yo voy» no pedalean." mirando a la sala
      const base = [[0, { ...aC(0.12, 0.08), ...CARA.resignado, ojos: { abiertos: 0.8, tension: 0.3 } }],
        [T.m3 - 0.05, { ...aC(0.05, 0.0), ...CARA.neutra, ojos: { abiertos: 0.85, tension: 0.1 }, cejas: { alto: 0.0, ang: -0.1, asim: 0.3 }, boca: { sonrisa: -0.25, abierta: 0, ancho: 0.9 } }, 0.3],
        [T.m3 + T.FRASE2.m3, { ...aC(0.0, 0.04, -0.04), ...CARA.neutra, ojos: { abiertos: 0.8, tension: 0.15 }, cejas: { alto: 0.1, ang: -0.15, asim: 0.6 }, boca: { sonrisa: -0.3, abierta: 0, ancho: 0.9 } }, 0.2]];
      const p = enLaBici(mauro, b, t, base, { fase: 1.2, inclina: 0.04 });
      const u = sg(t, T.p4 + 0.05, T.p4 + 0.35) * (1 - sg(t, T.m3 + 0.25, T.m3 + 0.6));
      if (u > 0) manoA(mauro, p, "I", cabezaW(mauro, [0.36, 0.12, 0.12]), u, [1, -0.3, -0.2]);
      p.t = t; bocaVoz(p, t, T.m3, ENV.m3, 0.55); return p;
    }
    // P5 / P5c / P5b: las manos en el manubrio; vibra el celular, lo mira (incrédulo), lo da vuelta; arranca a pedalear
    const base = [[0, { ...aC(0, 0.3), ...CARA.neutra, ojos: { abiertos: 0.95, y: -0.5 } }],
      [T.v23 + 0.1, { ...aC(0.05, 0.3, 0.06), ...CARA.incredula, ojos: { abiertos: 0.8, y: -0.5 } }, 0.25],
      [T.vuelta + 0.4, { ...aC(0.0, 0.0), ...CARA.fastidio, cejas: { alto: -0.2, ang: -0.3 }, boca: { sonrisa: -0.2, abierta: 0, ancho: 0.9 } }, 0.3],
      [T.musica + 0.4, { ...aC(0.0, -0.02), ...CARA.sonrisa }, 0.4]];
    const p = enLaBici(mauro, b, t, base, pedalea(t, 0, T.musica));
    const u = sg(t, T.vuelta - 0.25, T.vuelta) * (1 - sg(t, T.vuelta + 0.4, T.vuelta + 0.65));
    if (u > 0) manoA(mauro, p, "I", enBici(b, 0.03, BICI.manubrio[0] + 0.26, BICI.manubrio[1] - 0.1), u, [0.9, -0.2, -0.4]);   // (r1) por arriba del manubrio: no atraviesa el poste
    return p;
  }
  // parte 2: la toalla al cuello, pedalea con la clase; Q3 "Catorce reservas. Pedalean catorce."; Q3c a Graciela; C a cámara
  const gG = dirGiro(PROFE.x, PROFE.z, 1.35, -1.8);
  const base = [[0, { ...aC(0.0, 0.0), ...CARA.sonrisa }],
    [T.m4, { ...aC(0.1, -0.02, 0.04), ...CARA.sonrisa, ojos: { abiertos: 1, feliz: 0.3 } }, 0.3],
    [T.m5 - 0.1, { ...aC(gG * 0.85, 0.05, 0.08), ...CARA.sonrisa, ojos: { abiertos: 1, feliz: 0.35, x: 0.4 } }, 0.25],
    [T.c - 0.05, { ...aC(0.0, 0.0, 0.03), ...CARA.sonrisa, ojos: { abiertos: 1, feliz: 0.25 }, cejas: { alto: 0.25, ang: 0.05 } }, 0.15]];
  const p = enLaBici(mauro, b, t, base, pedalea(t, 0, T.q3 - 2, t >= T.c ? { inclina: 0.12, bob: 0.006 * Math.abs(Math.sin(pedaleo(t, 0, T.q3 - 2))) } : {}));
  p.respira = t >= T.c ? 2.2 : 1;
  p.t = t; bocaVoz(p, t, T.m4, ENV.m4, 0.55); bocaVoz(p, t, T.m5, ENV.m5, 0.55); bocaVoz(p, t, T.m6, ENV.m6, 0.6); return p;
}
function poseMajo(t, pa) {
  if (pa === "Q1b") {
    const base = [[0, { x: SOFA.x + 0.1, y: 0.57 - majo.CADERA * (majo.cfg.alto ?? 1), z: SOFA.z + 0.05, giro: 0, sentado: 1, ...aC(-0.05, 0.35), ...CARA.esperanza, ojos: { abiertos: 1, y: -0.6 }, ...BRAZOS.celular, manoI: [0.08, 0.36, 0.32], manoD: [-0.08, 0.36, 0.32], inclina: -0.05 }],
      [T.j2 + 0.05, { ...aC(0.1, 0.12, 0.06), ...CARA.sorpresa, ojos: { abiertos: 1, y: -0.2 }, cejas: { alto: 0.9, ang: 0.2 } }, 0.2],
      [T.j2 + T.FRASE2.j2, { ...aC(-0.05, 0.3, -0.05), ...CARA.feliz, ojos: { abiertos: 0.95, y: -0.5 } }, 0.2]];
    const p = poseEn(t, base); p.t = t; bocaVoz(p, t, T.j2, ENV.j2, 0.6); return p;
  }
  return enLaBici(majo, biciN(7), t, [[0, { ...aC(0.1, 0.0), ...CARA.feliz }]], pedalea(t, 7, T.q3 - 2));
}

// =====================================================================================================
// OBJETOS EN EL TIEMPO
// =====================================================================================================
const _a = new THREE.Vector3(), _b = new THREE.Vector3(), _q = new THREE.Quaternion();
function enMano(obj, per, lado, rx = 0, ry = 0, rz = 0, dy = 0, dz = 0) { const m = manoMundo(per, lado, _a); per.cuerpo.getWorldQuaternion(_q); obj.position.copy(m); obj.quaternion.copy(_q); obj.rotateX(rx); obj.rotateY(ry); obj.rotateZ(rz); obj.translateY(dy); obj.translateZ(dz); }
function enBiciObj(obj, n, x, y, z, rx = 0, ry = 0, rz = 0) { const b = biciN(n); b.updateMatrixWorld(true); obj.position.copy(b.localToWorld(V3(x, y, z))); obj.quaternion.copy(b.quaternion); obj.rotateY(ry); obj.rotateX(rx); obj.rotateZ(rz); }
function ponerObjetos(t, pa) {
  const p2 = t >= P2, sala = !INSERTOS.includes(pa) && pa !== "Q1b";
  // los percheros: vuelan del vecino a la bici vacía y quedan; en la parte 2 no están
  PERCHEROS.forEach((o, i) => {
    o.visible = !p2 && sala && t >= T.perchero[i] - (i === 0 ? 99 : 0.02) && (pa !== "P2" || t >= T.sienta[0] || i !== 0);
    if (!o.visible) return;
    const [n, x, y, z, rx, ry, rz] = PERCH_FIN[i];
    enBiciObj(o, n, x, y, z, rx, ry, rz);
    const tp = T.perchero[i], u = sg(t, tp, tp + 0.27);
    if (u < 1) {
      const [q, lado] = PERCH_DE[i];
      if (i === 0 && t < tp) { enMano(o, graciela, "I", 0, 0, 0, -0.02, 0.03); o.scale.setScalar(0.85); return; }   // la toalla en la mano de Graciela
      const ini = manoMundo(q, lado, _b).clone(), fin = o.position.clone();
      o.position.copy(ini.lerp(fin, eio(u))); o.position.y += Math.sin(u * Math.PI) * 0.35; o.rotateX((1 - u) * 2.5);
    }
    const pop = sg(t, tp + 0.27, tp + 0.45); o.scale.setScalar([1, 1.7, 2.1, 0.75, 1.15][i] * (1 + 0.18 * Math.sin(pop * Math.PI)));   // (r1) objetos grandes: se leen de lejos
  });
  // el celular de Mauro: en las manos (P1), en el soporte (P5-P5b); lo da vuelta boca abajo en T.vuelta
  CEL_M.visible = (!p2 && (pa === "P1" || pa === "P5" || pa === "P5c" || pa === "P5b" || pa === "P4" || pa === "P2" || pa === "P3"));
  if (CEL_M.visible) {
    if (pa === "P1") { const a = manoMundo(mauro, "I", _a), b = manoMundo(mauro, "D", _b); mauro.cuerpo.getWorldQuaternion(_q); CEL_M.position.copy(a).add(b).multiplyScalar(0.5).add(V3(0, 0.1, 0)); CEL_M.quaternion.copy(_q); CEL_M.rotateY(Math.PI); CEL_M.rotateX(0.75); CEL_M.translateZ(0.03); }
    else {
      const [my, mz] = BICI.manubrio; BICI_P.updateMatrixWorld(true);
      CEL_M.position.copy(BICI_P.localToWorld(V3(0, my + 0.1, mz - 0.03))); CEL_M.quaternion.copy(BICI_P.quaternion); CEL_M.rotateY(Math.PI); CEL_M.rotateX(-0.45);
      const vib = t > T.vibra && t < T.vibra + 0.4 ? Math.sin(t * 95) * 0.006 : 0; CEL_M.position.x += vib;
      const u = eio(sg(t, T.vuelta, T.vuelta + 0.3)); if (u > 0) { CEL_M.rotateY(Math.PI * u); CEL_M.translateY(0.02 * Math.sin(u * Math.PI)); }
    }
  }
  // Graciela: la toalla en la mano en Q3/Q3b y al cuello desde Q3d
  const tc = T.cuello + 0.1;
  TOALLA_G_MANO.visible = p2 && (pa === "Q3" || pa === "Q3b" || pa === "Q3c" || (pa === "Q3d" && t < tc));
  if (TOALLA_G_MANO.visible) enMano(TOALLA_G_MANO, graciela, "I", 0, 0, 0, -0.02, 0.02);
  TOALLA_G_CUELLO.visible = p2 && t >= tc && (pa === "Q3d" || pa === "Q4" || pa === "C");
  TOALLA_M_CUELLO.visible = p2;
  CEL_J.visible = pa === "Q1b";
  if (CEL_J.visible) { const a = manoMundo(majo, "I", _a), b = manoMundo(majo, "D", _b); majo.cuerpo.getWorldQuaternion(_q); CEL_J.position.copy(a).add(b).multiplyScalar(0.5).add(V3(0, 0.1, 0)); CEL_J.quaternion.copy(_q); CEL_J.rotateY(Math.PI); CEL_J.rotateX(0.6); CEL_J.translateZ(0.03); }
  // la puerta: se abre con la entrada y se cierra con el último
  puertaAbre(!p2 && pa === "P2" ? eio(sg(t, T.puerta, T.puerta + 0.25)) * (1 - eio(sg(t, T.cierra - 0.1, T.cierra + 0.2))) : 0);
  // el ventilador gira siempre; el reloj
  ASPAS.rotation.z = -t * 14;
  if (!p2) { if (t < T.p2) ponerReloj(18, 20); else if (t < T.cierra) ponerReloj(18, Math.min(59, 52 + Math.floor(sg(t, T.p2, T.cierra - 0.1) * 8))); else ponerReloj(19, t >= T.p5 ? 4 : t >= T.p3i ? 1 : 0); if (pa === "P2" && t >= T.cierra - 0.1) ponerReloj(19, 0); }
  else ponerReloj(19, 0);
  // las bicis: giran solo las ocupadas que pedalean
  BICIS.forEach((b, i) => { const n = i + 1, ocup = p2 || EN_BICI_1.some(([, m]) => m === n); ponerBici(b, ocup ? pedaleo(t, n, p2 ? T.q3 - 2 : T.musica) : FASE0(n)); });
  ponerBici(BICI_P, pedaleo(t, 0, p2 ? T.q3 - 2 : T.musica));
}

// =====================================================================================================
// RENDER
// =====================================================================================================
function renderAt(tIn) {
  const t = en(tIn, P1, P2) ? (tIn < (P1 + P2) / 2 ? P1 - 0.001 : P2) : tIn;
  const p2 = t >= P2;
  const pl = planoEn(t); planoActual = pl[0];
  const pa = planoActual;
  const living = pa === "Q1b";
  ponerLuz(living ? 40 : 0, living ? 0 : -1.4);
  dibujarInterfaz(t, pa);
  // quién se ve
  const enSala = !INSERTOS.includes(pa) && !living;
  for (const p of TODOS) p.raiz.visible = false;
  if (enSala) {
    if (!["Q3b", "Q3d", "P2", "P3", "P5b", "Q3"].includes(pa)) { mauro.raiz.visible = true; mauro.poner(poseMauro(t, pa)); }   // en Q3b/Q3d la cámara está al lado de él; en los gran planos quedaba cortado en el borde   // en Q3b/Q3d la cámara está en la tarima, al lado de Mauro
    const lista = p2 ? EN_BICI_2 : EN_BICI_1;
    lista.forEach(([per, n], i) => {
      if (!p2 && (t < T.p2 || (pa === "P2" && t < T.entra[i]))) return;   // 18:20: la sala vacía
      per.raiz.visible = true;
      if (per === graciela) per.poner(poseGraciela(t, pa));
      else if (per === majo) per.poner(poseMajo(t, pa));
      else per.poner(p2 ? enLaBici(per, biciN(n), t, [[0, { ...aC(0.1 * Math.sin(n), 0.0), ...CARA.sonrisa }]], pedalea(t, n, T.q3 - 2)) : poseAlumno(per, n, i, t, pa));
    });
  }
  if (living) { majo.raiz.visible = true; majo.poner(poseMajo(t, pa)); }
  // ---- cámara ----
  if (pl[2]) ponerCam(catmull(pl[2], t), t);
  if (VER && VER.startsWith("cam:")) ponerCam(VER.slice(4).split(",").map(Number), t);
  if (window.__cam) ponerCam(window.__cam, t);
  camera.updateMatrixWorld(true);
  ponerObjetos(t, pa);
  const ancho = ["P2", "P3", "P5b", "Q3"].includes(pa); BICI_P.visible = !ancho; if (ancho) CEL_M.visible = false;   // en los gran planos la bici del profe quedaba cortada abajo
  // ---- insertos ----
  const I = { P1b: INS.P1b, P3i: INS.P3i, P5: INS.P5, Q1: INS.Q1, Q1c: INS.Q1, Q1s: INS.Q1s, Q2: INS.Q2, Q2t: INS.Q2t, Q2s: INS.Q2s, Q4: INS.Q4 }[pa];
  for (const k in INS) INS[k].g.visible = INS[k] === I;
  if (I) {
    ponerCam([0, 1.5, 3, 0, 1.5, 0, 50], t); camera.updateMatrixWorld(true);
    const k = sg(t, pl[1], pl[1] + 1.4), kk = halfK();
    I.g.position.set(0, 0, -1); I.g.scale.setScalar(kk * PXK * lerp(1.0, 1.03, eo(k)));
    if (pa === "P5" && t > T.vibra && t < T.vibra + 0.4) I.g.position.x += Math.sin(t * 90) * 0.004 * kk * PXK;   // vibra
  }
  for (const p of TODOS) if (p.raiz.visible) p.ojoLejano(camera.position);
  // ---- portada (VER=portada): la sala con los nueve y las cinco bicis de perchero, todo en la mitad de arriba ----
  if (VER === "portada") { ponerCam([0.75, 2.6, -5.1, -0.1, 0.25, 0.4, 66], t); camera.updateMatrixWorld(true); ponerObjetos(t, pa); CEL_M.visible = false; BICI_P.visible = false; for (const p of TODOS) if (p.raiz.visible) p.ojoLejano(camera.position); }
  // ---- tarjetas ----
  AVISOS.length = 0;
  for (const k in GL) GL[k].visible = false; for (const g of GUIAS) g.visible = false;
  for (const k in CONTADORES) CONTADORES[k].visible = false;
  for (const g of GUIAS) g.visible = false; LUPA.visible = false;
  if (!LIMPIO && !en(tIn, P1, P2)) tarjetas(t, pa);
  renderer.render(scene, camera);
}
function tarjetas(t, pa) {
  const ent = (ti) => (t < ti ? 0 : 0.75 + 0.25 * bk(sg(t, ti, ti + 0.18)));
  const yv = 14 + T.yv.filter((m) => t >= m).length;
  const vin = T.sienta.filter((m) => t >= m).length;
  if (pa === "P1") {
    ponerGlobo(GL.c1820, 250, 395, 1, null);
    const ult = T.yv.filter((m) => t >= m).at(-1);
    ponerContador([["YO VOY", yv, "#5ce611"], ["BICIS", 14, "#efeee5"]], 830, 340, 1, ult !== undefined ? 1 - sg(t, ult, ult + 0.15) : 0);
    CEL_M.updateMatrixWorld(true); const [px, py] = objPx(CEL_M);
    ponerLupa(t, 800, 1330, 1, [px, py]);
    if (t >= T.m1) { const g = t >= T.m1 + T.FRASE2.m1 ? GL.m1 : GL.m1a; const [hx, hy] = coronillaPx(mauro); ponerGlobo(g, 320, 660, ent(T.m1), [hx - 20, hy + 20], 2); }
  }
  if (pa === "P1b") {
    if (t >= T.j1 && t < T.llenaM + 0.3) ponerGlobo(GL.j1, 540, 195, ent(T.j1), null, 2);   // (r1) arriba del celular: no tapa mensajes
    if (t >= T.rotLlena) ponerGlobo(GL.rLlena, 540, 250, ent(T.rotLlena), null, 2);
  }
  if (pa === "P2" || pa === "P3") {
    ponerGlobo(pa === "P2" && t < T.cierra ? GL.c1855 : GL.c1900, 250, 150, 1, null);
    const tres = t >= T.sienta[0] - 0.05;
    const filas = [["YO VOY", yv, "#5ce611"], ["BICIS", 14, "#efeee5"]]; if (tres) filas.push(["VINIERON", vin, ROJO_CLARO]);
    const ult = T.sienta.filter((m) => t >= m).at(-1);
    ponerContador(filas, 830, 90, 1, ult !== undefined && pa === "P2" ? 1 - sg(t, ult, ult + 0.15) : 0);
    if (pa === "P3") {
      if (t >= T.rotPerch) { const [tx, ty] = objPx(TOALLA_2, V3(0, -0.15, 0.05)); ponerGlobo(GL.rPerch, 760, 760, ent(T.rotPerch), null, 1); ponerGuia(GUIAS[0], 760, 760 + GL.rPerch.userData.H / 2, tx, ty, eo(sg(t, T.rotPerch, T.rotPerch + 0.2))); }
      if (t >= T.rot5) ponerGlobo(GL.r5, 540, 1720, ent(T.rot5), null, 2);
    }
  }
  if (pa === "P3i") { ponerGlobo(GL.c1900, 250, 150, 1, null); ponerGlobo(GL.rCosto, 540, 560, ent(T.rotCosto), null, 2); }
  if (pa === "P4" && t >= T.m3) hablar(t >= T.m3 + T.FRASE2.m3 ? GL.m3 : GL.m3a, mauro, ent(T.m3), 1, 0, 200);
  if (pa === "P5" || pa === "P5c" || pa === "P5b") {
    ponerGlobo(GL.c1904, 200, 150, 1, null);
    const v = t >= T.v23 ? 23 : 22, pop = t >= T.v23 ? 1 - sg(t, T.v23, T.v23 + 0.25) : 0;
    ponerContador([["YO VOY", v, v === 23 ? ROJO_CLARO : "#5ce611"], ["BICIS", 14, "#efeee5"], ["VINIERON", 9, ROJO_CLARO]], 830, 90, 1, pop);
  }
  if (pa === "Q1" || pa === "Q1b" || pa === "Q1c") ponerGlobo(GL.c2130, 250, 130, 1, null);
  if (pa === "Q1b" && t >= T.j2) hablar(t >= T.j2 + T.FRASE2.j2 ? GL.j2 : GL.j2a, majo, ent(T.j2), 1, 0, 260);
  if (pa === "Q1c") ponerGlobo(GL.rCupo, 600, 1800, ent(T.reserva7 + 0.1), null, 2);
  if (pa === "Q1s") { ponerGlobo(GL.c2130, 250, 130, 1, null); ponerGlobo(GL.rEspera, 600, 1800, ent(T.q1s + 0.1), null, 2); }
  if (pa === "Q2" || pa === "Q2t" || pa === "Q2s") ponerGlobo(GL.c1500, 250, 130, 1, null);
  if (pa === "Q2") ponerGlobo(GL.rRecuerda, 540, 1800, ent(T.recuerda + 0.15), null, 2);
  if (pa === "Q2t" || pa === "Q2s") ponerGlobo(GL.rLibera, 540, 1780, ent(T.q2t + 0.15), null, 2);
  if (pa === "Q2s" && t >= T.otraVez) ponerGlobo(GL.otraVez, 540, 260, ent(T.otraVez), null, 3);
  if (pa === "Q3" || pa === "Q3b" || pa === "Q3c" || pa === "Q3d") {
    ponerGlobo(GL.c1900, 250, 150, 1, null);
    if (pa === "Q3") ponerContador([["RESERVAS", 14, "#5ce611"], ["VINIERON", 14, "#5ce611"]], 830, 90, 1, 0);
    if (pa === "Q3" && t >= T.m4) ponerGlobo(t >= T.m4 + T.FRASE2.m4 ? GL.m4 : GL.m4a, 540, 1600, ent(T.m4), null, 1);   // por los parlantes: abajo, sin cola
    // (r1) el callback de la plata: Majo en la 7 y Sole en la 4, las dos que en la parte 1 se fueron
    if (pa === "Q3" && t >= T.m4 + 0.2) for (const [g, per, gi, dx] of [[GL.rMajo, majo, 0, 0], [GL.rSole, sole, 1, 60]]) { const [hx, hy] = coronillaPx(per); const ly = Math.max(470, hy - 190); ponerGlobo(g, cl(hx + dx, 160, 920), ly, ent(T.m4 + 0.2 + gi * 0.15), null, 2); ponerGuia(GUIAS[gi], cl(hx + dx, 160, 920), ly + g.userData.H / 2, hx, hy - 10, eo(sg(t, T.m4 + 0.25, T.m4 + 0.5))); }
    if (pa === "Q3b" && t >= T.g1) hablar(GL.g1, graciela, ent(T.g1), 1, 0, 300);
    if (pa === "Q3c" && t >= T.m5) hablar(GL.m5, mauro, ent(T.m5), 1, 0, 300);
  }
  if (pa === "Q4") { ponerGlobo(GL.cNov, 250, 130, 1, null); ponerGlobo(GL.rPanel, 600, 1790, ent(T.q4 + 0.1), null, 2); }
}
window.__tresRender = renderAt;
window.addEventListener("hf-seek", (e) => renderAt(e.detail.time));
window.__tresDbg = (t) => { renderAt(t); return { plano: planoActual, avisos: AVISOS.slice() }; };
renderAt(window.__hfThreeTime || 0);
if (window.__tresListo) window.__tresListo();
