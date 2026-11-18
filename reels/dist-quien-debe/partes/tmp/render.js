
// ---------- Rubén en el banco (sentado del lado del cliente; el termo bajo el brazo izquierdo, el mate en la mano izquierda) ----------
const MANO_MATE = [0.17, 0.33, 0.36];
function poseRuben(t) {
  const parte2 = t >= P2;
  const pr = { x: RUB.x, y: -0.08, z: RUB.z, giro: RUB.giro, sentado: 1, inclina: -0.04, cabeza: { giro: 0.25, asiente: 0.04, ladea: 0.03 }, ...CARA.neutra, ojos: { x: 0.3, y: 0, abiertos: 0.95, tension: 0.05, feliz: 0.1 }, cejas: { alto: 0.1, ang: 0 }, boca: { sonrisa: 0.25, abierta: 0, ancho: 1 }, manoI: MANO_MATE, codoI: [1, -0.6, -0.25], manoD: [-0.2, 0.28, 0.32], codoD: [-1, -0.6, -0.1], dedoI: 0, dedoD: 0, t };
  if (!parte2) {
    if (t < T.p2) { Object.assign(pr, { ...CARA.sonrisa, ojos: { x: 0.3, y: 0.05, abiertos: 0.92, feliz: 0.2 }, boca: { sonrisa: 0.35, abierta: 0, ancho: 1 } }); }
    else if (t < T.p4) {
      // P2: canchero, recostado; "Tranquila." · al final saca el celular
      Object.assign(pr, { ...CARA.sonrisa, ojos: { x: 0.1, y: 0.05, abiertos: 0.95, feliz: 0.25 }, cejas: { alto: 0.25, ang: 0, asim: 0.3 }, boca: { sonrisa: 0.45, abierta: 0, ancho: 1.05 } });
      pr.inclina = -0.1; pr.cabeza = { giro: 0.1, asiente: -0.02, ladea: 0.06 };
      bocaVoz(pr, t, T.r1, ENV.r1, 0.6);
    } else if (t < T.p5) {
      // P4: la llamada, de golpe chiquito y meloso; se encoge (inclina adelante, hombros); "…Dale." resignado
      const u = sg(t, T.r2, T.r2 + LEN.r2);
      Object.assign(pr, { ...CARA.esperanza, ojos: { x: 0.0, y: -0.15, abiertos: 0.95, feliz: 0.25 }, cejas: { alto: 0.6, ang: 0.6 }, boca: { sonrisa: 0.45, abierta: 0, ancho: 0.85 } });
      pr.inclina = 0.06 + 0.08 * u; pr.cabeza = { giro: -0.1, asiente: 0.1 + 0.1 * u, ladea: 0.12 };
      if (t >= T.g1 - 0.1) { Object.assign(pr, { ...CARA.sorpresa, ojos: { abiertos: 1, x: 0, y: -0.1 }, cejas: { alto: 0.7, ang: 0.3 }, boca: { sonrisa: 0.1, abierta: 0.15, ancho: 0.8 } }); }
      if (t >= T.g1 + LEN.g1 - 0.05) { Object.assign(pr, { ...CARA.resignado, ojos: { abiertos: 0.5, tension: 0.4, x: 0, y: -0.2 }, cejas: { alto: 0.35, ang: 0.8 }, boca: { sonrisa: -0.4, abierta: 0.1, ancho: 0.9 } }); }
      bocaVoz(pr, t, T.r2, ENV.r2, 0.55); bocaVoz(pr, t, T.r3, ENV.r3, 0.5);
    } else if (t < T.p6) {
      Object.assign(pr, { ...NADA }); pr.cabeza = { giro: 0.2, asiente: 0.06, ladea: 0 };
    } else if (t < T.p7) {
      // P6: el remate: cara de nada, los ojos un poco entrecerrados; seco
      Object.assign(pr, { ...SECO, ojos: { x: 0, y: 0.0, abiertos: 0.78, tension: 0.3 }, cejas: { alto: -0.05, ang: 0.05, asim: 0.4 }, boca: { sonrisa: -0.15, abierta: 0, ancho: 0.9 } });
      pr.cabeza = { giro: 0, asiente: 0.03, ladea: 0.02 };
      bocaVoz(pr, t, T.r4, ENV.r4, 0.55);
    } else {
      // P7: mira para arriba al turnero
      Object.assign(pr, { ...NADA, ojos: { x: 0, y: 0.8, abiertos: 0.95 }, cejas: { alto: 0.3, ang: 0.2 } });
      pr.cabeza = { giro: 0.25, asiente: -0.35 * eio(sg(t, T.flip - 0.3, T.flip)), ladea: 0 };
    }
    return pr;
  }
  // parte 2 (Q4): tranquilo, contento
  Object.assign(pr, { ...CARA.sonrisa, ojos: { x: 0.2, y: 0.05, abiertos: 0.95, feliz: 0.3 }, cejas: { alto: 0.2, ang: 0 }, boca: { sonrisa: 0.55, abierta: 0, ancho: 1.05 } });
  if (t >= T.q4s && t < T.q4p5) { pr.cabeza = { giro: -0.1, asiente: 0.05, ladea: 0.05 }; bocaVoz(pr, t, T.r5, ENV.r5, 0.55); }
  if (t >= T.q4p6 && t < T.q4p7) { pr.cabeza = { giro: 0, asiente: 0.03, ladea: 0.02 }; Object.assign(pr, { ojos: { x: 0, y: 0, abiertos: 0.9, feliz: 0.35 }, boca: { sonrisa: 0.45, abierta: 0, ancho: 1 } }); bocaVoz(pr, t, T.r6, ENV.r6, 0.55); }
  if (t >= T.q4p7) { pr.cabeza = { giro: 0.25, asiente: -0.35 * eio(sg(t, T.flip2 - 0.3, T.flip2)), ladea: 0 }; pr.ojos = { x: 0, y: 0.8, abiertos: 1, feliz: 0.4 }; }
  return pr;
}
// ---------- Rubén en el box de inversiones (C): sentado en el sillón, a cámara ----------
function poseRubenC(t) {
  const pr = { x: 20.0, y: -0.06, z: -0.62, giro: 0, sentado: 1, inclina: 0.05, cabeza: { giro: 0, asiente: 0.02, ladea: 0.02 }, ...CARA.sonrisa, ojos: { abiertos: 0.97, feliz: 0.2, x: 0, y: 0.05 }, cejas: { alto: 0.18, ang: 0, asim: 0.25 }, boca: { sonrisa: 0.5, abierta: 0, ancho: 1 }, manoI: [0.26, 0.2, 0.4], codoI: [1, -0.4, -0.2], manoD: [-0.26, 0.2, 0.4], codoD: [-1, -0.4, -0.2], dedoI: 0, dedoD: 0, t };
  bocaVoz(pr, t, T.r7, ENV.r7, 0.6);
  return pr;
}
// ---------- Patricia (sentada del otro lado) ----------
function posePatricia(t) {
  const pr = { x: PAT.x, y: -0.08, z: PAT.z, giro: PAT.giro, sentado: 1, inclina: 0.02, cabeza: { giro: -0.12, asiente: 0.04, ladea: 0.02 }, ...CARA.sonrisa, ojos: { x: -0.1, y: 0, abiertos: 1, feliz: 0.15 }, cejas: { alto: 0.15, ang: 0.05 }, boca: { sonrisa: 0.35, abierta: 0, ancho: 0.95 }, manoI: [0.2, 0.33, 0.38], codoI: [1, -0.6, -0.2], manoD: [-0.2, 0.33, 0.38], codoD: [-1, -0.6, -0.2], dedoI: 0, dedoD: 0, t };
  const parte2 = t >= P2;
  if (!parte2 && t < T.p2) {
    // P1: le gira el monitor (la mano izquierda en el canto) y señala "Sueldos hoy" con la lapicera
    Object.assign(pr, { ...CARA.neutra, ojos: { x: -0.2, y: 0, abiertos: 1, feliz: 0 }, cejas: { alto: 0.25, ang: 0.15 }, boca: { sonrisa: 0.05, abierta: 0, ancho: 0.95 } });
    pr.cabeza = { giro: -0.25, asiente: 0.05, ladea: 0 };
    bocaVoz(pr, t, T.pa1, ENV.pa1, 0.6);
  }
  if (!parte2 && t >= T.p5 && t < T.p7) { Object.assign(pr, { ...CARA.neutra, ojos: { x: 0, y: 0, abiertos: 1, feliz: 0 }, cejas: { alto: 0.75, ang: 0.15 }, boca: { sonrisa: 0.05, abierta: 0, ancho: 0.95 } }); pr.cabeza = { giro: 0.05, asiente: -0.02, ladea: 0.05 }; bocaVoz(pr, t, T.pa2, ENV.pa2, 0.6); }
  if (!parte2 && t >= T.p7) { Object.assign(pr, { ...CARA.sonrisa, ojos: { x: 0.1, y: 0, abiertos: 1, feliz: 0.25 }, boca: { sonrisa: 0.55, abierta: 0, ancho: 1 } }); pr.cabeza = { giro: 0.1, asiente: 0.02, ladea: 0.04 }; bocaVoz(pr, t, T.pa3, ENV.pa3, 0.6); }
  if (parte2 && t >= T.q4p5 && t < T.q4p7) { Object.assign(pr, { ...CARA.neutra, ojos: { x: 0, y: 0, abiertos: 1, feliz: 0 }, cejas: { alto: 0.75, ang: 0.15 }, boca: { sonrisa: 0.05, abierta: 0, ancho: 0.95 } }); pr.cabeza = { giro: 0.05, asiente: -0.02, ladea: 0.05 }; bocaVoz(pr, t, T.pa2b, ENV.pa2, 0.6); if (t >= T.q4p6 + 0.6) { pr.cejas = { alto: 0.6, ang: 0.05 }; pr.boca = { sonrisa: 0.5, abierta: 0, ancho: 1 }; } }
  if (parte2 && t >= T.q4p7) { Object.assign(pr, { ...CARA.feliz, ojos: { x: 0.1, y: 0, abiertos: 1, feliz: 0.35 }, boca: { sonrisa: 0.75, abierta: 0, ancho: 1.1 } }); pr.cabeza = { giro: 0.1, asiente: 0.02, ladea: 0.04 }; bocaVoz(pr, t, T.pa4, ENV.pa4, 0.6); }
  return pr;
}
// ---------- Graciela en la rotisería (detrás del mostrador, mirando a +z) ----------
function poseGraciela(t) {
  const pr = { x: GRA.x, y: 0, z: GRA.z, giro: 0, inclina: 0.06, cabeza: { giro: 0.25, asiente: 0.15, ladea: 0.05 }, ...CARA.feliz, ojos: { x: 0.3, y: -0.3, abiertos: 1, feliz: 0.35 }, ...BRAZOS.apoyado, codoI: [1, -0.4, -0.2], codoD: [-1, -0.4, -0.2], t };
  pr.manoI = [0.3, 0.3, 0.4]; pr.manoD = [-0.3, 0.3, 0.4];
  if (t < P2) { bocaVoz(pr, t, T.g1, ENV.g1, 0.7); pr.cabeza = { giro: 0.35, asiente: 0.18, ladea: 0.06 }; }
  else if (t < T.q4) {
    // Q1: el celular vibra en el soporte (a su izquierda), lo lee, se ríe, toca Pagar
    Object.assign(pr, { ...CARA.sorpresa, ojos: { x: 0.45, y: -0.6, abiertos: 1, feliz: 0 }, cejas: { alto: 0.8, ang: 0.2 }, boca: { sonrisa: 0.3, abierta: 0, ancho: 0.9 } });
    pr.cabeza = { giro: 0.4, asiente: 0.3, ladea: 0.05 };
    if (t >= T.g2 + 0.6) { Object.assign(pr, { ...CARA.feliz, ojos: { x: 0.45, y: -0.5, abiertos: 0.8, feliz: 0.55 }, cejas: { alto: 0.45, ang: 0.3 } }); }
    bocaVoz(pr, t, T.g2, ENV.g2, 0.7);
    const k = Math.sin(Math.PI * sg(t, T.pagar - 0.3, T.pagar + 0.2));
    if (k > 0) pr.manoI = lerpV(pr.manoI, aCuerpoG(celG, V3(0, -0.02, 0.05)), k);
  } else { Object.assign(pr, { ...CARA.feliz, ojos: { x: 0.3, y: -0.3, abiertos: 1, feliz: 0.4 } }); bocaVoz(pr, t, T.g3, ENV.g3, 0.7); }
  return pr;
}
function aCuerpoG(obj, local) { obj.updateMatrixWorld(true); graciela.poner({ x: GRA.x, y: 0, z: GRA.z, giro: 0, inclina: 0.06, t: 0 }); return aCuerpo(graciela, obj.localToWorld(local.clone())); }
// ---------- Nico en el muelle (Q3): el celular en la izquierda, el maletín en la derecha; se va a la cabina ----------
const NIC = V3(60.75, 0, 1.15);
function poseNico(t) {
  const va = sg(t, T.sube - 0.05, T.portazo);
  const pr = { x: lerp(NIC.x, 59.4, eio(va)), y: 0, z: lerp(NIC.z, 0.95, va), giro: lerp(-0.25, -Math.PI / 2, eio(sg(t, T.sube - 0.1, T.sube + 0.2))), paso: va > 0 && va < 1 ? 1 : 0, inclina: 0.03, cabeza: { giro: 0, asiente: 0.25, ladea: 0 }, ...CARA.concentrada, ojos: { x: 0, y: -0.6, abiertos: 0.9 }, manoI: [0.12, 0.42, 0.38], codoI: [1, -0.6, -0.2], manoD: [-0.29, -0.06, 0.04], codoD: [-1, 0.2, -0.2], dedoI: 0, dedoD: 0, t };
  if (t >= T.n1 - 0.05) { Object.assign(pr, { ...CARA.sonrisa, ojos: { x: 0, y: -0.1, abiertos: 1, feliz: 0.25 }, cejas: { alto: 0.3, ang: 0 } }); pr.cabeza = { giro: 0.0, asiente: 0.05, ladea: 0.03 }; }
  if (t >= T.sube - 0.1) { pr.manoI = [0.29, -0.06, 0.04]; pr.codoI = [1, 0.2, -0.2]; }
  bocaVoz(pr, t, T.n1, ENV.n1, 0.75);
  return pr;
}

// ================= RENDER =================
const camA = new THREE.PerspectiveCamera(40, 1080 / 960, 0.02, 160), camB = new THREE.PerspectiveCamera(40, 1080 / 960, 0.02, 160);
scene.add(camA, camB);
function ponerCamX(cam, v) { cam.position.set(v[0], v[1], v[2]); cam.up.set(0, 1, 0); cam.fov = v[6]; cam.updateProjectionMatrix(); cam.lookAt(v[3], v[4], v[5]); cam.updateMatrixWorld(true); }
// el monitor gira hacia Rubén al arrancar (función del tiempo)
function ryMonitor(t) { return t < P2 ? lerp(-0.2, 0.36, eo(sg(t, 0, 0.55))) : 0.36; }
// el celular sostenido delante de la cara (en altavoz), a un costado, con la pantalla hacia la cámara
function celEnMano(cel, per, lado, cam, local) {
  per.raiz.updateMatrixWorld(true);
  const p = per.cabeza.localToWorld(local.clone());
  cel.position.copy(p); cel.lookAt(cam.position); cel.rotateZ(lado * 0.12);
  return p;
}
function renderAt(tIn) {
  AVISOS.length = 0; PROY = null;
  const t = en(tIn, P1, P2) ? (tIn < (P1 + P2) / 2 ? P1 - 0.001 : P2) : tIn;
  const parte2 = t >= P2;
  const pl = planoEn(t); planoActual = pl[0];
  const pa = planoActual;
  const split = pa === "P4" || pa === "Q4s";
  const lugar = ["Q1", "Q1i", "Q1g", "Q1p"].includes(pa) ? "rot" : pa === "Q2" ? "ofi" : ["Q3", "Q3i"].includes(pa) ? "mue" : pa === "C" ? "inv" : "ban";
  ponerLuces(split ? ["ban", "rot"] : [lugar], split ? 0.62 : 1);
  scene.background = new THREE.Color(FONDO[lugar]);
  BAN.visible = lugar === "ban"; ROT.visible = lugar === "rot" || split; INV.visible = lugar === "inv"; MUE.visible = lugar === "mue"; OFI.visible = lugar === "ofi";
  // ---- objetos ----
  monPivote.rotation.y = ryMonitor(t);
  dibujarSaldo(t); dibujarTurno(t);
  dibujarCelR(t); dibujarCelG(t); if (lugar === "mue") dibujarCelN(t); if (lugar === "ofi") dibujarPanel(t);
  for (const [i, b] of spiedoBarras.entries()) b.rotation.x = t * 1.6 + i * 0.9;
  timbreBoton.position.y = 0.034 - 0.006 * (Math.sin(Math.PI * sg(t, T.timbre - 0.05, T.timbre + 0.12)) + Math.sin(Math.PI * sg(t, T.timbre2 - 0.05, T.timbre2 + 0.12)));
  // la vibración del celular de Graciela (Q1)
  celG.position.x = en(t, T.vibra - 0.15, T.vibra + 0.25) ? Math.sin(t * 160) * 0.004 : 0;
  // el café se corre cuando Rubén apoya el termo (C)
  taza.position.x = 0.07 * eo(sg(t, T.c + 0.08, T.c + 0.22));
  // la camioneta: se sacude con el portazo (Q3)
  camioneta.position.y = en(t, T.portazo, T.portazo + 0.2) ? Math.sin((t - T.portazo) * 60) * 0.008 * (1 - sg(t, T.portazo, T.portazo + 0.2)) : 0;
  // ---- personajes ----
  for (const p of TODOS) p.raiz.visible = false;
  termoR.visible = mate.visible = lapicera.visible = celR.visible = celN.visible = maletin.visible = manoR.visible = manoG.visible = chip3d.visible = false;
  celG.visible = true;
  if (BAN.visible || split) {
    ruben.raiz.visible = patricia.raiz.visible = true;
    const pr = poseRuben(t); ruben.poner(pr);
    const pp = posePatricia(t); patricia.poner(pp);
    // Patricia: la mano izquierda en el canto del monitor mientras lo gira (P1) y la lapicera que señala "Sueldos hoy"
    BAN.updateMatrixWorld(true);
    if (!parte2 && t < T.p2) {
      const gira = 1 - sg(t, 0.5, 0.9), se = Math.sin(Math.PI * sg(t, T.tic - 0.45, T.tic + 0.55));
      const canto = monPivote.localToWorld(V3(-MON.W / 2 - 0.02, MON.y - 0.05, 0.15)), sueldos = monPivote.localToWorld(V3(-0.05, MON.y - 0.04, 0.32));
      if (gira > 0) { pp.manoI = lerpV(pp.manoI, aCuerpo(patricia, canto), gira); }
      if (se > 0) { pp.manoI = lerpV(pp.manoI, aCuerpo(patricia, sueldos), se); }
      patricia.poner(pp);
    }
    // P7 / Q4: Patricia aprieta el timbre con el índice derecho (toca el botón, no lo atraviesa)
    for (const tb of [T.timbre, T.timbre2]) {
      const k = Math.sin(Math.PI * sg(t, tb - 0.45, tb + 0.35));
      if (k > 0) { timbreBoton.parent.updateMatrixWorld(true); const top = timbreBoton.parent.localToWorld(V3(0.0, 0.06 - 0.012 * k, -0.01)); pp.manoD = lerpV(pp.manoD, aCuerpo(patricia, top), k); pp.dedoD = 1; patricia.poner(pp); }
    }
    patricia.raiz.updateMatrixWorld(true);
    lapicera.visible = true; patricia.brazos[0].mano.getWorldPosition(_w);
    lapicera.position.copy(_w); lapicera.quaternion.copy(patricia.brazos[0].mano.getWorldQuaternion(new THREE.Quaternion())); lapicera.rotateX(Math.PI / 2);
    // Rubén: el termo bajo el brazo izquierdo, el mate en la mano izquierda (sorbo al final de "un millón"; el sorbo
    // vacío antes del remate)
    ruben.raiz.updateMatrixWorld(true);
    termoR.visible = true; termoR.position.copy(ruben.cuerpo.localToWorld(V3(0.36, 0.06, 0.04))); termoR.rotation.set(0, ruben.raiz.rotation.y, -0.18); termoR.rotateX(0.12);
    mate.visible = true;
    const m = ruben.brazos[0].mano.getWorldPosition(_w).clone();
    let so = 0;
    if (!parte2) so = Math.max(Math.sin(Math.PI * sg(t, T.r1 + LEN.r1 - 0.15, T.r1 + LEN.r1 + 0.6)), Math.sin(Math.PI * sg(t, T.sorbo - 0.1, T.r4 - 0.02)), pa === "P7t" ? 1 : 0);
    mate.rotation.set(0, ruben.raiz.rotation.y + Math.PI / 2, 0.35 * so); mate.position.copy(m).add(V3(0, -0.07, 0));
    if (so > 0) {
      const boca = ruben.cabeza.localToWorld(V3(0.0, 0.1, 0.33));
      mate.updateMatrixWorld(true);
      const punta = V3(0.075, 0.305, 0).multiplyScalar(1.1).applyEuler(mate.rotation);
      mate.position.lerp(boca.sub(punta), so);
    }
    // el celular de Rubén: en la mano derecha delante de la cara (altavoz) en la llamada
    if ((pa === "P4" || pa === "Q4s")) { celR.visible = true; }
  }
  if (lugar === "ban") {
    cliente.raiz.visible = true; cliente.poner({ x: 4.5, y: -0.08, z: 0.2, giro: Math.PI / 2 + 0.2, sentado: 1, ...CARA.neutra, manoI: [0.15, 0.3, 0.3], manoD: [-0.15, 0.3, 0.3], t });
  }
  if (ROT.visible) {
    graciela.raiz.visible = !(pa === "Q1i" || pa === "Q1p"); graciela.poner(poseGraciela(t));
  }
  if (lugar === "mue") { nico.raiz.visible = pa === "Q3"; nico.poner(poseNico(t)); nico.raiz.updateMatrixWorld(true); maletin.visible = pa === "Q3"; nico.brazos[1].mano.getWorldPosition(_w); maletin.position.copy(_w).add(V3(0, -0.01, 0)); maletin.rotation.set(0, nico.raiz.rotation.y, 0); }
  if (lugar === "inv") {
    ruben.raiz.visible = true; ruben.poner(poseRubenC(t)); ruben.raiz.updateMatrixWorld(true);
    termoR.visible = true; termoR.position.set(19.82, 0.44, 0.35); termoR.rotation.set(0, 0.5, 0);
    mate.visible = true; mate.position.set(19.66, 0.44, 0.42); mate.rotation.set(0, -0.4, 0);
  }
  // ---- cámara ----
  if (pl[2]) { ponerCam(catmull(pl[2], t), t); camera.updateMatrixWorld(true); }
  if (pa === "P3") {
    // el inserto de la planilla: el celular de Rubén de frente, la mano con el pulgar que baja
    celR.visible = manoR.visible = true; ruben.raiz.visible = false;
    celR.position.set(0.55, 1.05, 0.55); celR.rotation.set(-0.15, -0.35, 0.04);
    camPantalla(celR, V3(0, 0.004, 0.0075), V3(0, 0, 1), 0.172, 0.82, 36, t, 0.02 * (1 - eo(sg(t, T.p3, T.p3 + 0.9))));
    celR.updateMatrixWorld(true);
    const baja = t < T.frena ? Math.abs(Math.sin((t - T.p3) * 9)) : 0;
    const toca = Math.sin(Math.PI * sg(t, T.llamar - 0.22, T.llamar + 0.12));
    manoR.position.copy(celR.localToWorld(V3(0.035, -0.105, -0.012))); manoR.quaternion.copy(celR.quaternion);
    manoR.userData.pulgar.rotation.set(0, 0, 0.55 - 0.35 * baja - 0.25 * toca); manoR.userData.pulgar.position.set(0.02, -0.0, 0.026 - 0.004 * toca);
  }
  if (split) {
    // arriba: Rubén en el banco con el celular en altavoz y Patricia mirándolo · abajo: la rotisería
    const kA = sg(t, pl[1], pl[1] + 2.5);
    ponerCamX(camA, [lerp(-0.15, -0.05, kA), 1.42, lerp(1.9, 1.75, kA), 0.55, 1.13, -0.05, 42]);
    ponerCamX(camB, [GRA.x + lerp(0.55, 0.5, kA), 1.58, lerp(1.1, 0.95, kA), GRA.x + 0.2, 1.22, GRA.z, 42]);
    celR.visible = true; celEnMano(celR, ruben, -1, camA, V3(-0.36, 0.08, 0.36));
    const pr = poseRuben(t); pr.manoD = aCuerpo(ruben, celR.position.clone().add(V3(0, -0.075, 0))); pr.codoD = [-1, -0.6, -0.1]; ruben.poner(pr);
    camera.position.set(0, 0, 0); camera.fov = 50; camera.aspect = 1080 / 1920; camera.updateProjectionMatrix();
  }
  if (pa === "P7i" || pa === "Q4i") {
    // el dedo de Patricia en el timbre (inserto corto)
    timbreBoton.parent.updateMatrixWorld(true);
    const c = timbreBoton.parent.localToWorld(V3(0, 0.04, 0));
    ponerCam([c.x + 0.42, c.y + 0.32, c.z + 0.5, c.x - 0.06, c.y + 0.02, c.z, 40], t, true);
  }
  if (pa === "P7t" || pa === "Q4t") {
    // tilt al turnero: sube de la mesa al turnero y se acerca (lo llena de ancho)
    turnero.updateMatrixWorld(true);
    const c = turnero.localToWorld(turnero.userData.centro.clone());
    const u = eio(sg(t, pl[1], pl[1] + 0.4));
    const desde = V3(0.2, 1.1, 0.0), mira = desde.clone().lerp(c, u);
    const pos = V3(lerp(0.3, 0.72, u), lerp(1.45, 1.75, u), lerp(1.9, 1.15, u));
    ponerCam([pos.x, pos.y, pos.z, mira.x, mira.y, mira.z, lerp(48, 54, u)], t, true);
  }
  if (pa === "Q1") {
    const u = eio(sg(t, P2, T.q1i));
    ponerCam([lerp(40.6, 40.55, u), lerp(1.62, 1.6, u), lerp(1.35, 1.0, u), 40.15, 1.2, -1.5, 46], t);
  }
  if (pa === "Q1i" || pa === "Q1p") {
    celGsoporte.updateMatrixWorld(true);
    const ex = pa === "Q1i" ? 0.03 * (1 - eo(sg(t, T.q1i, T.q1i + 0.5))) : 0;
    camPantalla(celG, V3(0, 0.0, 0.0075), V3(0, 0, 1), 0.172, 0.78, 36, t, ex);
    if (pa === "Q1p") {
      manoG.visible = true; celG.updateMatrixWorld(true);
      const toca = Math.sin(Math.PI * sg(t, T.pagar - 0.2, T.pagar + 0.12)) * (t < T.pagado + 0.05 ? 1 : 0);
      manoG.position.copy(celG.localToWorld(V3(0.06, -0.055 + 0.015 * toca, -0.012 + 0.0 * toca))); manoG.quaternion.copy(celG.getWorldQuaternion(new THREE.Quaternion()));
      manoG.userData.pulgar.rotation.set(0, 0, 0.9 - 0.25 * toca); manoG.userData.pulgar.position.set(0.02, 0, 0.026 - 0.005 * toca);
      manoG.visible = t < T.pagado + 0.15;
    }
  }
  if (pa === "Q1g") {
    const u = sg(t, pl[1], T.pagar - 0.3);
    ponerCam([GRA.x + lerp(0.62, 0.55, u), 1.6, lerp(0.85, 0.7, u), GRA.x + 0.15, 1.28, GRA.z, 40], t);
  }
  if (pa === "Q2") {
    // el panel: push-in hasta el inserto; el chip "Pagado ✓" entra volando desde arriba a la izquierda a la fila de Graciela
    panelMon.updateMatrixWorld(true);
    const u = eio(sg(t, T.q2, T.q2 + 0.7));
    const c = panelMon.localToWorld(panelMon.userData.centro.clone());
    const FOV = 42, dIns = (PANEL.W * 1.04) / (2 * Math.tan((FOV * D2R) / 2) * (1080 / 1920));
    ponerCam([lerp(c.x - 0.35, c.x, u), lerp(c.y + 0.12, c.y - 0.04, u), c.z + lerp(dIns + 0.9, dIns, u), c.x, c.y - 0.04 * u, c.z, FOV], t, true);
    const v = sg(t, T.q2 - 0.05, T.fila[0]);
    if (v < 1) {
      chip3d.visible = true; camera.updateMatrixWorld(true);
      const dest = panelMon.localToWorld(V3(((1030 / 1280) - 0.5) * PANEL.W, 0.3 + PANEL.H / 2 + (0.5 - 342 / 1000) * PANEL.H, 0.06));
      const ori = camera.localToWorld(V3(-0.35, 0.3, -0.6));
      chip3d.position.copy(ori.clone().lerp(dest, eio(v))); chip3d.position.y += Math.sin(Math.PI * v) * 0.08;
      chip3d.quaternion.copy(panelMon.getWorldQuaternion(new THREE.Quaternion())); chip3d.rotateZ((1 - eo(v)) * 0.9); chip3d.scale.setScalar(lerp(1.5, 0.95, eo(v)));
    }
  }
  if (pa === "Q3i") {
    // el aviso en el celular de Nico (sin Nico: el celular sostenido, de frente)
    celN.visible = true; celN.position.set(60.55, 1.25, 1.25); celN.rotation.set(-0.1, 0.15, 0.03);
    camPantalla(celN, V3(0, 0.0, 0.0075), V3(0, 0, 1), 0.172, 0.8, 36, t, 0.02 * (1 - eo(sg(t, T.q3, T.q3 + 0.5))));
  }
  if (pa === "Q3") {
    const u = sg(t, pl[1], T.q4);
    ponerCam([lerp(60.35, 60.25, u), 1.55, lerp(3.6, 3.45, u), lerp(60.45, 60.25, u), 1.2, 0.2, 44], t);
    nico.raiz.updateMatrixWorld(true);
    if (t < T.sube) { celN.visible = true; celEnMano(celN, nico, 1, camera, V3(0.22, -0.12, 0.42)); const pn = poseNico(t); pn.manoI = aCuerpo(nico, celN.position.clone().add(V3(0, -0.075, 0))); nico.poner(pn); }
  }
  if (window.__cam) ponerCam(window.__cam, t, true);
  if (VERM && VERM.startsWith("cam:")) ponerCam(VERM.slice(4).split(",").map(Number), t, true);
  camera.updateMatrixWorld(true);
  const camOjo = split ? camA : camera;
  for (const p of TODOS) if (p.ojoLejano && p.raiz.visible) p.ojoLejano((p === graciela && split ? camB : camOjo).position);
  bigoteSegunCamara(camOjo);

  // ---- globos de diálogo y rótulos ----
  for (const k in GL) GL[k].visible = false;
  for (const k in ROT_) ROT_[k].visible = false;
  for (const g of GUIAS) g.visible = false;
  if (!LIMPIO && !en(tIn, P1, P2)) {
    const ent = (ti) => (t < ti ? 0 : 0.75 + 0.25 * bk(sg(t, ti, ti + 0.18)));
    const di = (k, per, ti, fin, orden = 1, dx = 0, minY = 250, maxY = 1860, sobre = 110) => { if (t >= ti - 0.04 && t < fin) hablar(GL[k], per, ent(ti - 0.04), orden, dx, minY, maxY, sobre); };
    if (pa === "P1") di("pa1", patricia, T.pa1, T.p2, 1, 60, 430);
    if (pa === "P2") di("r1", ruben, T.r1, T.p3, 1, 0, 260);
    if (pa === "P3") {
      if (t >= T.rotA) ponerGlobo(ROT_.deben, 540, 260, ent(T.rotA), null, 2);
      if (t >= T.rotB) { const r = ROT_.va94; ponerGlobo(r, 760, 1560, ent(T.rotB), null, 3); }
    }
    if (split) {
      PROY = [camA, 0];
      di("r2", ruben, T.r2, T.g1 + 0.3, 1, -120, 40, 900, 60);
      di("r3", ruben, T.r3, T.p5, 1, -60, 40, 900, 60);
      di("r5", ruben, T.r5, T.q4p5, 1, -60, 40, 900, 60);
      PROY = [camB, 1];
      di("g1", graciela, T.g1, T.r3 - 0.05, 2, -140, 990, 1880, 50);
      di("g3", graciela, T.g3, T.r5 - 0.05, 2, -140, 990, 1880, 50);
      PROY = null;
    }
    if (pa === "P5") di("pa2", patricia, T.pa2, T.p6, 1, 0, 280);
    if (pa === "P6") di("r4", ruben, T.r4, T.p7, 1, 0, 260);
    if (pa === "P7" || pa === "P7i") di("pa3", patricia, T.pa3, P1, 1, 0, 280);
    if (pa === "P7i" && t >= T.pa3 - 0.04) ponerGlobo(GL.pa3, 540, 420, 1, null, 1);
    if (pa === "Q1i" && t >= T.llega + 0.15) ponerGlobo(ROT_.recordatorio, 540, 250, ent(T.llega + 0.15), null, 2);
    if (pa === "Q1g") di("g2", graciela, T.g2, T.pagar, 1, 0, 260);
    if (pa === "Q2" && t >= T.fila[0] + 0.1) ponerGlobo(ROT_.solo, 540, 1700, ent(T.fila[0] + 0.1), null, 2);
    if (pa === "Q3i") ponerGlobo(ROT_.visitar, 540, 250, ent(T.q3 + 0.1), null, 2);
    if (pa === "Q3") di("n1", nico, T.n1, T.q4, 1, 0, 260);
    if (pa === "Q4p5") di("pa2b", patricia, T.pa2b, T.q4p6, 1, 0, 280);
    if (pa === "Q4p6") di("r6", ruben, T.r6, T.q4p7, 1, 0, 260);
    if (pa === "Q4p7" || pa === "Q4i") di("pa4", patricia, T.pa4, T.c, 1, 0, 280);
    if (pa === "Q4i" && t >= T.pa4 - 0.04) ponerGlobo(GL.pa4, 540, 420, 1, null, 1);
  }
  if (split) {
    renderer.setScissorTest(true);
    renderer.setViewport(0, 960, 1080, 960); renderer.setScissor(0, 960, 1080, 960); renderer.render(scene, camA);
    for (const p of TODOS) if (p.ojoLejano && p.raiz.visible) p.ojoLejano(camB.position);
    bigoteSegunCamara(camB);
    renderer.setViewport(0, 0, 1080, 960); renderer.setScissor(0, 0, 1080, 960); renderer.render(scene, camB);
    renderer.setScissorTest(false); renderer.setViewport(0, 0, 1080, 1920);
    // las burbujas (capa 1, pegadas a la cámara principal) en una pasada más, sin borrar
    const bg = scene.background; scene.background = null; renderer.autoClear = false; camera.layers.set(1);
    renderer.clearDepth(); renderer.render(scene, camera);
    camera.layers.enableAll(); renderer.autoClear = true; scene.background = bg;
  } else renderer.render(scene, camera);
}

window.__tresRender = renderAt;
window.addEventListener("hf-seek", (e) => renderAt(e.detail.time));
window.__tresDbg = (t) => { renderAt(t); return { plano: planoActual, avisos: AVISOS.slice(), cam: camera.position.toArray().map((v) => +v.toFixed(2)) }; };
renderAt(window.__hfThreeTime || 0);
if (window.__tresListo) window.__tresListo();
