
// ---------- luces: la sala de noche, los paneles del techo (luz pareja de arriba), relleno desde la tarima ----------
scene.background.set(0x0b1220);
scene.environmentIntensity = 0.35;
const techoL = new THREE.DirectionalLight(0xfff6ea, 1.25);
techoL.castShadow = true; techoL.shadow.mapSize.set(2048, 2048); techoL.shadow.bias = -0.0012; techoL.shadow.normalBias = 0.025; techoL.shadow.radius = 4;
Object.assign(techoL.shadow.camera, { left: -5, right: 5, top: 5.5, bottom: -5.5, near: 0.5, far: 16 }); techoL.shadow.camera.updateProjectionMatrix();
scene.add(techoL, techoL.target);
const cielo = new THREE.HemisphereLight(0xf4f1ea, 0x2a3040, 1.55); scene.add(cielo);
const relleno = new THREE.DirectionalLight(0xfff8ee, 0.65); relleno.position.set(0.5, 2.6, -6); relleno.target.position.set(0, 1, 0); scene.add(relleno, relleno.target);
const rim = new THREE.DirectionalLight(0xdfe8ff, 0.4); rim.position.set(-2, 4, 6); scene.add(rim);
function ponerLuz(cx, cz) { techoL.position.set(cx + 1.2, 6.5, cz - 1.5); techoL.target.position.set(cx, 0, cz); techoL.target.updateMatrixWorld(); }

// =====================================================================================================
// LA SALA DE SPINNING
// =====================================================================================================
const C2 = { pared: 0x0b1220, lado: 0x16243d, piso: 0x3a3f4a, gris: 0xb9bec4, verdeApagado: 0x365f28 };
const SET = new THREE.Group(); scene.add(SET);
const XL = -3.4, XR = 3.4, ZF = -5.2, ZB = 3.2, HW = 3.2;     // paredes: izquierda (-x), derecha (+x), adelante (la tarima), fondo
const TAR = { x0: -1.4, x1: 1.4, z0: ZF, z1: -3.55, h: 0.2 };   // la tarima del profe
const PUERTA = { x: XL, z: 2.2, w: 0.95, h: 2.1 };              // la puerta de vidrio (pared -x)
// las 14 bicis: fila 1 (4, la más cerca de la tarima), fila 2 (5), fila 3 (5). Miran a la tarima (-z).
const FILAS_Z = [-1.8, -0.2, 1.4];
const BICIS_XZ = [
  ...[1.35, 0.45, -0.45, -1.35].map((x) => [x, FILAS_Z[0]]),
  ...[1.8, 0.9, 0, -0.9, -1.8].map((x) => [x, FILAS_Z[1]]),
  ...[1.8, 0.9, 0, -0.9, -1.8].map((x) => [x, FILAS_Z[2]]),
];
const PROFE = { x: 0, z: -4.35 };                               // la bici del profe en la tarima (mira a +z)
M.grafito = mat(C2.piso, 0.9); M.goma = mat(0x23262c, 0.85); M.gris = mat(C2.gris, 0.35, { metalness: 0.4 }); M.verdeA = mat(C2.verdeApagado, 0.7);
M.tira = new THREE.MeshBasicMaterial({ color: 0x5ce611 }); M.panel = new THREE.MeshBasicMaterial({ color: 0xf3f1e6 });
{
  // el piso de goma grafito con las juntas navy (baldosas de 1 m)
  const pisoT = lienzo(512, 512, (x, w, h) => { x.fillStyle = "#3a3f4a"; x.fillRect(0, 0, w, h); x.fillStyle = "#1f2533"; x.fillRect(0, 0, w, 10); x.fillRect(0, 0, 10, h); });
  pisoT.wrapS = pisoT.wrapT = THREE.RepeatWrapping; pisoT.repeat.set(XR - XL, ZB - ZF);
  const piso = mesh(new THREE.PlaneGeometry(XR - XL, ZB - ZF), new THREE.MeshStandardMaterial({ map: pisoT, roughness: 0.92 }), (XL + XR) / 2, 0, (ZF + ZB) / 2); piso.rotation.x = -Math.PI / 2; piso.castShadow = false; SET.add(piso);
  // paredes: adelante y fondo navy oscuro, los costados navy2
  const pared = (w, x, z, ry, m) => { const p = mesh(new THREE.PlaneGeometry(w, HW), m, x, HW / 2, z); p.rotation.y = ry; p.castShadow = false; SET.add(p); return p; };
  pared(XR - XL, 0, ZF, 0, mat(C2.pared, 0.85)); pared(XR - XL, 0, ZB, Math.PI, mat(C2.pared, 0.85));
  pared(ZB - ZF, XL, (ZF + ZB) / 2, Math.PI / 2, mat(C2.lado, 0.85)); pared(ZB - ZF, XR, (ZF + ZB) / 2, -Math.PI / 2, mat(C2.lado, 0.85));
  // el techo navy3 con dos paneles de luz crema planos
  const te = mesh(new THREE.PlaneGeometry(XR - XL, ZB - ZF), new THREE.MeshBasicMaterial({ color: 0x1f3254 }), 0, HW, (ZF + ZB) / 2); te.rotation.x = Math.PI / 2; te.castShadow = false; SET.add(te);
  for (const z of [-2.6, 0.6]) { const p = mesh(new THREE.PlaneGeometry(2.4, 1.0), M.panel, 0, HW - 0.01, z); p.rotation.x = Math.PI / 2; p.castShadow = false; SET.add(p); }
  // la franja diagonal crema (60 cm) en la pared de adelante y en la del fondo: cruza de abajo a la izquierda hacia arriba a
  // la derecha; se recorta con las paredes de los costados
  const franja = (z, s) => { const f = mesh(new THREE.PlaneGeometry(9, 0.6), mat(0xefeee5, 0.85), 0, 1.35, z); f.rotation.set(0, s > 0 ? 0 : Math.PI, s * 0.42); f.castShadow = false; f.receiveShadow = true; SET.add(f); };
  franja(ZF + 0.006, 1); franja(ZB - 0.006, -1);
  // la tira de luz verde plana arriba de las cuatro paredes (un prisma emisivo de 6 cm)
  for (const [w, x, z, ry] of [[XR - XL, 0, ZF + 0.04, 0], [XR - XL, 0, ZB - 0.04, 0], [ZB - ZF, XL + 0.04, (ZF + ZB) / 2, Math.PI / 2], [ZB - ZF, XR - 0.04, (ZF + ZB) / 2, Math.PI / 2]]) { const b = mesh(new THREE.BoxGeometry(w, 0.06, 0.06), M.tira, x, HW - 0.16, z); b.rotation.y = ry; b.castShadow = false; SET.add(b); }
  // el zócalo navy3
  for (const [w, x, z, ry] of [[XR - XL, 0, ZF + 0.02, 0], [XR - XL, 0, ZB - 0.02, 0], [ZB - ZF, XL + 0.02, (ZF + ZB) / 2, Math.PI / 2], [ZB - ZF, XR - 0.02, (ZF + ZB) / 2, Math.PI / 2]]) { const b = caja(w, 0.1, 0.03, M.navy3, x, 0.05, z, 0.01); b.rotation.y = ry; SET.add(b); }
  // la tarima del profe (crema, borde navy)
  SET.add(caja(TAR.x1 - TAR.x0, TAR.h, TAR.z1 - TAR.z0, M.cr, (TAR.x0 + TAR.x1) / 2, TAR.h / 2, (TAR.z0 + TAR.z1) / 2, 0.02));
  SET.add(caja(TAR.x1 - TAR.x0 + 0.02, 0.05, 0.05, M.navy, (TAR.x0 + TAR.x1) / 2, TAR.h - 0.02, TAR.z1 + 0.005, 0.01));
  // el cartel ESTUDIO MAURO en la pared de adelante (Lexend 900 crema sobre una franja navy2 con borde verde)
  // (r1) en dos renglones y más angosto: en los primeros planos se leía "STUDIO" cortado
  const cartelT = lienzo(900, 560, (x, w, h) => { x.fillStyle = "#16243d"; x.fillRect(0, 0, w, h); x.fillStyle = "#5ce611"; x.fillRect(0, h - 26, w, 26); x.fillStyle = "#efeee5"; x.font = F(900, 210); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("ESTUDIO", w / 2, 150); x.fillText("MAURO", w / 2, 370); });
  // (r2) sin cartel: en los primeros planos quedaba cortado ("ESTUDIC") o tapado por la cabeza
  // un estante con el parlante (pared de adelante, a la derecha del cartel)
  SET.add(caja(0.7, 0.04, 0.3, M.navy3, 2.45, 1.55, ZF + 0.15, 0.01));
}
fusionar(SET);
// el parlante (caja navy con dos conos y la perilla verde que gira en P5)
const PARLANTE = new THREE.Group(); PARLANTE.position.set(2.45, 1.57, ZF + 0.16); scene.add(PARLANTE);
{ PARLANTE.add(caja(0.34, 0.5, 0.26, mat(0x111827, 0.6), 0, 0.25, 0, 0.03));
  for (const [y, r] of [[0.33, 0.085], [0.14, 0.06]]) { const c = mesh(new THREE.CylinderGeometry(r, r * 0.8, 0.03, 24).rotateX(Math.PI / 2), M.navy3, 0, y, 0.135); PARLANTE.add(c); PARLANTE.add(mesh(new THREE.CylinderGeometry(r * 0.3, r * 0.3, 0.035, 16).rotateX(Math.PI / 2), M.gris, 0, y, 0.14)); }
  sombras(PARLANTE); }
// el reloj digital de la pared del fondo (caja navy, dígitos verdes de 7 segmentos)
const relojT = lienzo(640, 240, () => {});
function dibujarReloj(x, W, H, hh, mm) {
  x.fillStyle = "#0b1220"; x.fillRect(0, 0, W, H);
  const seg = { 0: "abcdef", 1: "bc", 2: "abged", 3: "abgcd", 4: "fgbc", 5: "afgcd", 6: "afgedc", 7: "abc", 8: "abcdefg", 9: "abcdfg" };
  const dig = (d, ox) => {
    const w = 110, h = 190, t = 22, y0 = 25;
    const S2 = { a: [ox + t, y0, w - 2 * t, t], b: [ox + w - t, y0 + t, t, h / 2 - t * 1.5], c: [ox + w - t, y0 + h / 2 + t / 2, t, h / 2 - t * 1.5], d: [ox + t, y0 + h - t, w - 2 * t, t], e: [ox, y0 + h / 2 + t / 2, t, h / 2 - t * 1.5], f: [ox, y0 + t, t, h / 2 - t * 1.5], g: [ox + t, y0 + h / 2 - t / 2, w - 2 * t, t] };
    for (const k of "abcdefg") { x.fillStyle = seg[d].includes(k) ? "#5ce611" : "#16243d"; const [a, b, c, e] = S2[k]; x.fillRect(a, b, c, e); }
  };
  const s = String(hh).padStart(2, "0") + String(mm).padStart(2, "0");
  dig(+s[0], 40); dig(+s[1], 170); dig(+s[2], 350); dig(+s[3], 480);
  x.fillStyle = "#5ce611"; x.fillRect(306, 80, 24, 24); x.fillRect(306, 150, 24, 24);
}
const RELOJ = new THREE.Group(); RELOJ.position.set(0.15, 2.3, ZB - 0.05); RELOJ.rotation.y = Math.PI; scene.add(RELOJ);
{ RELOJ.add(caja(1.25, 0.52, 0.08, M.navy3, 0, 0, -0.03, 0.02)); RELOJ.add(plano(1.12, 0.42, relojT, 0, 0, 0.012, true)); }
let cReloj = "";
function ponerReloj(hh, mm) { const k = `${hh}:${mm}`; if (k === cReloj) return; cReloj = k; dibujarReloj(relojT.userData.x, 640, 240, hh, mm); relojT.needsUpdate = true; }
// la puerta de vidrio esmerilado crema con la manija verde (gira hacia adentro sobre la bisagra del lado del fondo)
const PUERTA_G = new THREE.Group(); PUERTA_G.position.set(PUERTA.x + 0.03, 0, PUERTA.z + PUERTA.w / 2); scene.add(PUERTA_G);
{ const hoja = new THREE.Group(); hoja.name = "hoja"; PUERTA_G.add(hoja);
  hoja.add(caja(0.05, PUERTA.h, PUERTA.w, M.navy3, 0, PUERTA.h / 2, -PUERTA.w / 2, 0.01));
  hoja.add(caja(0.056, PUERTA.h - 0.16, PUERTA.w - 0.16, mat(0xe9e6da, 0.35), 0, PUERTA.h / 2, -PUERTA.w / 2, 0.01));
  hoja.add(caja(0.12, 0.05, 0.3, M.g, 0.06, 1.05, -PUERTA.w + 0.2, 0.015));
  const marco = caja(0.08, PUERTA.h + 0.1, PUERTA.w + 0.16, M.navy, -0.02, (PUERTA.h + 0.1) / 2, -PUERTA.w / 2, 0.01); marco.scale.x = 0.5; PUERTA_G.add(marco);
  sombras(PUERTA_G); }
const puertaAbre = (u) => { PUERTA_G.getObjectByName("hoja").rotation.y = -1.35 * u; };
// el ventilador de pie (navy con aspas crema; giran con el tiempo)
const VENT = new THREE.Group(); VENT.position.set(2.85, 0, -2.9); VENT.rotation.y = -2.3; scene.add(VENT);
const ASPAS = new THREE.Group();
{ VENT.add(mesh(new THREE.CylinderGeometry(0.2, 0.24, 0.05, 24), M.navy, 0, 0.025, 0)); VENT.add(mesh(new THREE.CylinderGeometry(0.025, 0.025, 1.25, 10), M.navy3, 0, 0.65, 0));
  const cab = new THREE.Group(); cab.position.set(0, 1.35, 0); VENT.add(cab);
  cab.add(mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.16, 16).rotateX(Math.PI / 2), M.navy, 0, 0, -0.1));
  for (const z of [0.0, 0.08]) cab.add(mesh(new THREE.TorusGeometry(0.3, 0.012, 6, 36), M.navy3, 0, 0, z));
  for (let i = 0; i < 4; i++) { const r = mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.6, 5), M.navy3, 0, 0, 0.04); r.rotation.z = (i * Math.PI) / 4; cab.add(r); }
  ASPAS.position.z = 0.04; cab.add(ASPAS);
  for (let i = 0; i < 3; i++) { const a = mesh(new THREE.SphereGeometry(1, 16, 8), M.cr, 0, 0, 0); a.scale.set(0.09, 0.22, 0.02); a.position.set(Math.sin((i * 2 * Math.PI) / 3) * 0.15, Math.cos((i * 2 * Math.PI) / 3) * 0.15, 0); a.rotation.z = -(i * 2 * Math.PI) / 3; ASPAS.add(a); }
  ASPAS.add(mesh(new THREE.SphereGeometry(0.05, 14, 10), M.g, 0, 0, 0.01));
  sombras(VENT); }

// =====================================================================================================
// LA BICI DE SPINNING: cuadro navy3 en "lambda" (tubo grueso en diagonal + base en T con pies redondeados crema), volante
// gris adelante con protector navy, bielas y pedales (giran), asiento crema, manubrio en "cuernos" negro-navy con la perilla
// verde, portabotella y la plaquita crema con el número. Origen en el piso bajo el asiento; mira a +z.
// =====================================================================================================
const BICI = { asiento: 0.8, eje: [0.44, 0.22], biela: 0.12, manubrio: [0.99, 0.5], volante: [0.36, 0.66, 0.21] };
const tubo = (a, b, r, m) => { const g = new THREE.CylinderGeometry(r, r, 1, 14); const o = new THREE.Mesh(g, m); entre(o, V3(...a), V3(...b), 1); o.scale.set(1, a.length && V3(...a).distanceTo(V3(...b)), 1); o.castShadow = true; o.receiveShadow = true; return o; };
const _cA = new THREE.Vector3(), _cB = new THREE.Vector3(), _ejeY = new THREE.Vector3(0, 1, 0);
function entre(m, a, b) { const d = _cB.copy(b).sub(a); m.position.copy(a).add(b).multiplyScalar(0.5); m.quaternion.setFromUnitVectors(_ejeY, d.normalize()); }
const NUM_T = {};
function crearBici(num, profe = false) {
  const g = new THREE.Group(), fijo = new THREE.Group(); g.add(fijo);
  const mc = M.navy3, mn = mat(0x151b27, 0.45);
  const J = [0, 0.46, -0.04];
  // la base en T: dos pies transversales con tapas crema
  for (const z of [-0.44, 0.74]) { fijo.add(mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.56, 14).rotateZ(Math.PI / 2), mc, 0, 0.05, z)); for (const s of [-1, 1]) fijo.add(mesh(new THREE.SphereGeometry(0.038, 14, 10), M.cr2, s * 0.28, 0.045, z)); }
  fijo.add(tubo([0, 0.06, -0.42], J, 0.03, mc));
  fijo.add(tubo(J, [0, 0.07, 0.72], 0.05, mc));                                         // el tubo grueso (lambda)
  fijo.add(tubo([0, 0.26, 0.47], [0, 0.93, 0.5], 0.032, mc));                           // poste del manubrio
  fijo.add(tubo([0, 0.43, -0.03], [0, 0.76, -0.03], 0.024, mc));                        // poste del asiento
  fijo.add(caja(0.17, 0.06, 0.27, M.cr, 0, BICI.asiento - 0.02, 0.0, 0.03));           // el asiento crema
  fijo.add(caja(0.1, 0.04, 0.12, M.cr, 0, BICI.asiento - 0.025, 0.12, 0.02));          // la punta del asiento
  // el manubrio en cuernos: barra transversal, dos cuernos hacia adelante y arriba, puños
  const [my, mz] = BICI.manubrio;
  fijo.add(tubo([-0.22, my, mz], [0.22, my, mz], 0.017, mn));
  for (const s of [-1, 1]) { fijo.add(tubo([s * 0.22, my, mz], [s * 0.16, my + 0.07, mz + 0.2], 0.017, mn)); fijo.add(mesh(new THREE.SphereGeometry(0.02, 10, 8), mn, s * 0.16, my + 0.07, mz + 0.2)); }
  fijo.add(tubo([0, 0.93, 0.5], [0, my, mz], 0.025, mc));
  // la perilla de resistencia verde en el tubo, el portabotella navy
  fijo.add(mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.05, 16), M.g, 0, 0.64, 0.33).rotateX(-0.5));
  fijo.add(caja(0.06, 0.12, 0.05, M.navy, 0, 0.52, 0.36, 0.01));
  // el volante de inercia gris y su protector navy (medio disco arriba, a los dos lados)
  const [vy, vz, vr] = BICI.volante;
  const volante = new THREE.Group(); volante.position.set(0, vy, vz); g.add(volante);
  volante.add(mesh(new THREE.CylinderGeometry(vr, vr, 0.05, 32).rotateZ(Math.PI / 2), M.gris));
  volante.add(caja(0.056, 0.05, vr * 1.6, M.navy3, 0, 0, 0, 0.01));                     // un rayo (se ve girar)
  for (const s of [-1, 1]) { const pr = mesh(new THREE.CylinderGeometry(vr + 0.025, vr + 0.025, 0.012, 32, 1, false, 0, Math.PI).rotateZ(Math.PI / 2), M.navy3, s * 0.04, vy, vz); pr.rotation.x = Math.PI / 2; fijo.add(pr); }
  // bielas y pedales (giran alrededor del eje)
  const [ey, ez] = BICI.eje;
  fijo.add(mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.1, 18).rotateZ(Math.PI / 2), mc, 0, ey, ez));
  fijo.add(tubo([0, ey, ez], [0, vy, vz], 0.012, mn));                                  // la correa
  const bielas = new THREE.Group(); bielas.position.set(0, ey, ez); g.add(bielas);
  const pedales = [];
  for (const s of [-1, 1]) {
    const b = new THREE.Group(); bielas.add(b); b.rotation.x = s > 0 ? 0 : Math.PI;
    b.add(caja(0.02, BICI.biela + 0.03, 0.03, mn, s * 0.075, -BICI.biela / 2, 0, 0.008));
    const p = new THREE.Group(); p.position.set(s * 0.12, -BICI.biela, 0); b.add(p);
    p.add(caja(0.09, 0.02, 0.06, mn, s * 0.02, 0, 0, 0.006)); pedales.push(p);
  }
  // la plaquita con el número (al frente del poste del manubrio)
  if (!profe) {
    const tx = NUM_T[num] ??= lienzo(220, 170, (x, w, h) => { x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h); x.fillStyle = "#0b1220"; x.font = F(900, 150); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText(String(num), w / 2, h / 2 + 8); });
    const pl = new THREE.Group(); pl.position.set(0, 0.8, 0.56); pl.rotation.x = -0.08; fijo.add(pl);
    pl.add(caja(0.2, 0.16, 0.02, M.navy, 0, 0, -0.008, 0.01));
    pl.add(plano(0.185, 0.143, tx, 0, 0, 0.004, true));
    const at = plano(0.185, 0.143, tx, 0, 0, -0.02, true); at.rotation.y = Math.PI; pl.add(at);   // el número también del lado del que pedalea
  } else {
    // el soporte del celular en el centro del manubrio (mira al profe)
    fijo.add(caja(0.12, 0.02, 0.05, mn, 0, my + 0.02, mz - 0.03, 0.006));
    fijo.add(caja(0.02, 0.14, 0.02, mn, -0.05, my + 0.08, mz - 0.03, 0.005)); fijo.add(caja(0.02, 0.14, 0.02, mn, 0.05, my + 0.08, mz - 0.03, 0.005));
  }
  sombras(g);
  fusionar(fijo);
  g.userData = { volante, bielas, pedales, num };
  return g;
}
// gira volante y bielas; fase en radianes
function ponerBici(b, fase) { b.userData.bielas.rotation.x = fase; b.userData.volante.rotation.x = fase * 2.6; }
// dónde está el pedal (lado I = +x del ciclista) en el espacio de la bici: [z, y]
function pedalEn(fase, lado) { const a = fase + (lado === "I" ? 0 : Math.PI); return [BICI.eje[1] - Math.sin(a) * BICI.biela, BICI.eje[0] - Math.cos(a) * BICI.biela]; }
const BICIS = BICIS_XZ.map(([x, z], i) => { const b = crearBici(i + 1); b.position.set(x, 0, z); b.rotation.y = Math.PI; scene.add(b); return b; });
const BICI_P = crearBici(0, true); BICI_P.position.set(PROFE.x, TAR.h, PROFE.z); scene.add(BICI_P);
const biciN = (n) => BICIS[n - 1];
// un punto en el espacio de una bici, al mundo
const enBici = (b, x, y, z) => { b.updateMatrixWorld(true); return b.localToWorld(V3(x, y, z)); };
