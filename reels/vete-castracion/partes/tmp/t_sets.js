// =====================================================================================================
// LOS SETS: la cocina de Vero (x = 0, Q3), la recepción de Veterinaria Inés (x = VX) con la vidriera a la vereda, la sala
// de recuperación (x = RX). Cada uno en su lugar del mundo; la cámara salta de uno a otro con los cortes.
// =====================================================================================================
const VX = 40, RX = 80;
M.gaz = mat(0x365f28, 0.85); M.acero = mat(0xb9bec4, 0.45, { metalness: 0.35 }); M.verde = mat(0x365f28, 0.8);
M.pared2 = mat(0x16243d, 0.9); M.gris = mat(0xb9bec4, 0.85); M.grisO = mat(0x8f969f, 0.8); M.vereda = mat(0xc9ccd0, 0.95);
M.latex = mat(0xefeee5, 0.45); M.gorro = mat(0x365f28, 0.9); M.barbijo = mat(0xcfe3e8, 0.9);
const azulejoT = lienzo(512, 512, (x, w, h) => { x.fillStyle = "#365f28"; x.fillRect(0, 0, w, h); x.fillStyle = "#2c4f20"; for (let i = 0; i < 8; i++) { x.fillRect(0, i * 64, w, 4); x.fillRect(i * 64, 0, 4, h); } });
azulejoT.wrapS = azulejoT.wrapT = THREE.RepeatWrapping;
const pisoT = lienzo(512, 512, (x, w, h) => { x.fillStyle = "#d9d7c9"; x.fillRect(0, 0, w, h); x.fillStyle = "#d2d0c1"; for (let i = 0; i < 4; i++) x.fillRect(0, i * 128, w, 3); });
pisoT.wrapS = pisoT.wrapT = THREE.RepeatWrapping; pisoT.repeat.set(5, 5);
const HW = 3.0, AZ = 1.8;
function pared(g, x0, x1, y0 = 0, y1 = HW) {
  const w = x1 - x0;
  if (y0 < AZ) { const hb = Math.min(AZ, y1) - y0, t = azulejoT.clone(); t.needsUpdate = true; t.repeat.set(w / 0.6, hb / 0.6); t.offset.set(0, (y0 % 0.6) / 0.6); const b = mesh(new THREE.BoxGeometry(w, hb, 0.2), [M.gaz, M.gaz, M.gaz, M.gaz, new THREE.MeshStandardMaterial({ map: t, roughness: 0.85 }), M.gaz], (x0 + x1) / 2, y0 + hb / 2, -0.1); b.castShadow = false; g.add(b); }
  if (y1 > AZ) { const y = Math.max(AZ, y0), c = mesh(new THREE.BoxGeometry(w, y1 - y, 0.2), M.navy, (x0 + x1) / 2, (y + y1) / 2, -0.1); c.castShadow = false; g.add(c); }
}
const huella = (x, hx, hy, k = 1) => { x.beginPath(); x.ellipse(hx, hy + 30 * k, 52 * k, 42 * k, 0, 0, 7); x.fill(); for (const [dx, dy] of [[-56, -36], [-20, -66], [20, -66], [56, -36]]) { x.beginPath(); x.ellipse(hx + dx * k, hy + dy * k, 20 * k, 25 * k, 0, 0, 7); x.fill(); } };
// ---- LA RECEPCIÓN (x = VX): la pared del fondo (z = ZF) es azulejo a la izquierda y la VIDRIERA a la vereda a la derecha
// (con la puerta de calle); el mostrador adelante; la pizarra de cirugías y el cartel en la pared; la puerta QUIRÓFANO en
// la pared izquierda; las sillas de espera contra la pared derecha ----
const VET = new THREE.Group(); VET.position.x = VX; scene.add(VET);
const ZF = -2.2, XL = -2.4, XR = 2.4, VID0 = 0.3, VID1 = 1.72, PU0 = 1.78, PU1 = 2.36;
const MOS = { x: -0.25, z: -1.05, w: 1.7, d: 0.55, alto: 1.02 };
{
  const piso = mesh(new THREE.PlaneGeometry(14, 10), new THREE.MeshStandardMaterial({ map: pisoT, roughness: 0.85 }), 0, 0, 2.6); piso.rotation.x = -Math.PI / 2; piso.castShadow = false; VET.add(piso);
  // el fondo: azulejo hasta la vidriera; abajo y arriba de la vidriera, pared
  { const g = new THREE.Group(); g.position.z = ZF; VET.add(g); pared(g, XL, VID0); pared(g, VID0, XR, 0, 0.5); pared(g, VID0, XR, 2.4, HW); pared(g, VID1, PU0, 0.5, 2.4); g.add(caja(VID0 - XL, 0.1, 0.03, M.navy3, (XL + VID0) / 2, 0.05, 0.015, 0.01)); }
  { const g = new THREE.Group(); g.position.x = XL; g.rotation.y = Math.PI / 2; VET.add(g); pared(g, -7.4, -1.55); pared(g, -1.55, -0.55, 2.15, HW); pared(g, -0.55, -ZF + 0.01); }
  { const g = new THREE.Group(); g.position.x = XR; g.rotation.y = -Math.PI / 2; VET.add(g); pared(g, ZF - 0.01, 7.4); }
  const techo = mesh(new THREE.PlaneGeometry(14, 10), new THREE.MeshBasicMaterial({ color: 0x0b1220 }), 0, HW, 2.6); techo.rotation.x = Math.PI / 2; techo.castShadow = false; VET.add(techo);
  // el marco navy de la vidriera (barras de 9 cm) y el de la puerta de calle
  const mv = (w, h, x, y) => VET.add(caja(w, h, 0.1, M.navy3, x, y, ZF + 0.01, 0.01));
  mv(VID1 - VID0 + 0.1, 0.09, (VID0 + VID1) / 2, 0.5); mv(PU1 - VID0 + 0.06, 0.09, (VID0 + PU1) / 2, 2.4); mv(0.09, 1.95, VID0, 1.45); mv(0.09, 1.95, VID1, 1.45); mv(0.08, 2.4, PU0, 1.2); mv(0.08, 2.4, PU1, 1.2);
  mv(VID1 - VID0, 0.06, (VID0 + VID1) / 2, 1.0);   // el travesaño del vidrio (a la altura de la cintura de Vero)
  // el mostrador (frente navy3, tapa crema con canto verde)
  const mo = new THREE.Group(); mo.position.set(MOS.x, 0, MOS.z); VET.add(mo);
  mo.add(caja(MOS.w + 0.08, 0.05, MOS.d + 0.08, M.cr, 0, MOS.alto - 0.025, 0, 0.012));
  mo.add(caja(MOS.w, MOS.alto - 0.05, MOS.d, M.navy3, 0, (MOS.alto - 0.05) / 2, 0, 0.012));
  mo.add(caja(MOS.w - 0.1, 0.05, 0.02, M.g, 0, MOS.alto - 0.2, MOS.d / 2 + 0.005, 0.01));
  // la huellita crema en el frente del mostrador
  const hT = lienzo(256, 256, (x, w, h) => { x.fillStyle = "#1f3254"; x.fillRect(0, 0, w, h); x.fillStyle = "#efeee5"; huella(x, w / 2, h / 2 + 10, 1.3); });
  mo.add(plano(0.26, 0.26, hT, 0, 0.5, MOS.d / 2 + 0.004));
  // el cartel "VETERINARIA INÉS" arriba, sobre el azulejo
  const cartelT = lienzo(1400, 300, (x, w, h) => { x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h); x.fillStyle = "#0b1220"; x.textAlign = "left"; x.textBaseline = "middle"; ajustar(x, "VETERINARIA INÉS", 800, 150, w - 330); x.fillText("VETERINARIA INÉS", 290, h / 2 + 10); huella(x, 150, h / 2 + 10); x.fillStyle = "#5ce611"; x.fillRect(40, h - 30, w - 80, 12); });
  VET.add(caja(1.62, 0.37, 0.04, M.navy3, -1.1, 2.42, ZF + 0.02, 0.01)); VET.add(plano(1.56, 0.334, cartelT, -1.1, 2.42, ZF + 0.045));
  // la puerta QUIRÓFANO (pared izquierda): marco navy3; la hoja de vaivén aparte (QHOJA)
  for (const z of [-1.55, -0.55]) VET.add(caja(0.1, 2.15, 0.08, M.navy3, XL + 0.04, 1.075, z, 0.01));
  VET.add(caja(0.1, 0.1, 1.08, M.navy3, XL + 0.04, 2.15, -1.05, 0.01));
  // las sillas de espera (tres, navy3 con asiento crema) contra la pared derecha
  for (let i = 0; i < 3; i++) { const s = new THREE.Group(); s.position.set(XR - 0.32, 0, -1.25 + i * 0.58); s.rotation.y = -Math.PI / 2; VET.add(s); s.add(caja(0.5, 0.06, 0.48, M.cr, 0, 0.46, 0, 0.02)); s.add(caja(0.5, 0.48, 0.05, M.navy3, 0, 0.72, -0.24, 0.02)); for (const [a, b] of [[-0.22, -0.2], [0.22, -0.2], [-0.22, 0.2], [0.22, 0.2]]) s.add(caja(0.035, 0.44, 0.035, M.navy3, a, 0.22, b, 0.008)); }
  // el estante de atrás del mostrador (collares y frascos) a la izquierda de la pizarra
  const st = new THREE.Group(); st.position.set(-2.05, 0, ZF + 0.18); VET.add(st);
  for (const y of [1.2, 1.62]) st.add(caja(0.6, 0.03, 0.3, M.cr, 0, y, 0, 0.008));
  for (let i = 0; i < 2; i++) { st.add(mesh(new THREE.TorusGeometry(0.06, 0.016, 8, 20), [M.g, M.red][i], -0.14 + i * 0.28, 1.29, 0.02)); st.add(mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.16, 18), M.cr2, -0.14 + i * 0.28, 1.715, 0)); st.add(mesh(new THREE.CylinderGeometry(0.065, 0.065, 0.03, 18), i % 2 ? M.g : M.navy3, -0.14 + i * 0.28, 1.81, 0)); }
  sombras(VET);
}
fusionar(VET);
// el vinilo crema de la vidriera (una franja con huellitas, sin texto: desde adentro se leería al revés) y el de la puerta
{
  const vT = lienzo(1024, 96, (x, w, h) => { x.clearRect(0, 0, w, h); x.fillStyle = "#efeee5"; x.fillRect(0, 34, w, 16); for (let i = 0; i < 6; i++) huella(x, 90 + i * 170, 44, 0.42); });
  const v = new THREE.Mesh(new THREE.PlaneGeometry(VID1 - VID0 - 0.1, 0.1), new THREE.MeshBasicMaterial({ map: vT, transparent: true, toneMapped: false })); v.position.set(VX + (VID0 + VID1) / 2, 2.2, ZF + 0.02); scene.add(v);
}
// AFUERA: la vereda gris claro, el cordón, la calle, la casa de enfrente crema con ventanas navy y un árbol low-poly
const AFUERA = new THREE.Group(); AFUERA.position.x = VX; scene.add(AFUERA);
{
  const ve = mesh(new THREE.PlaneGeometry(9, 2.8), M.vereda, 0.5, 0.0, ZF - 1.4); ve.rotation.x = -Math.PI / 2; ve.castShadow = false; AFUERA.add(ve);
  AFUERA.add(caja(9, 0.12, 0.2, M.cr2, 0.5, 0.0, ZF - 2.85, 0.01));
  const ca = mesh(new THREE.PlaneGeometry(9, 4), M.grisO, 0.5, -0.06, ZF - 4.9); ca.rotation.x = -Math.PI / 2; ca.castShadow = false; AFUERA.add(ca);
  const fa = mesh(new THREE.PlaneGeometry(10, 4.5), new THREE.MeshBasicMaterial({ color: 0xe9dcc0 }), 0.5, 2.1, ZF - 6.6); fa.castShadow = false; AFUERA.add(fa);
  for (const x of [-1.6, 0.2, 2.0, 3.6]) { AFUERA.add(mesh(new THREE.PlaneGeometry(0.9, 1.1), new THREE.MeshBasicMaterial({ color: 0x1f3254 }), x, 2.0, ZF - 6.58)); AFUERA.add(mesh(new THREE.PlaneGeometry(0.9, 0.1), new THREE.MeshBasicMaterial({ color: 0xefeee5 }), x, 1.4, ZF - 6.57)); }
  // el árbol: tronco y copa de icosaedros verde apagado
  const ar = new THREE.Group(); ar.position.set(2.6, 0, ZF - 2.4); AFUERA.add(ar);
  ar.add(mesh(new THREE.CylinderGeometry(0.07, 0.1, 2.0, 8), mat(0x6b4a33, 0.9), 0, 1.0, 0));
  for (const [x, y, z, r] of [[0, 2.3, 0, 0.7], [-0.45, 2.0, 0.1, 0.5], [0.45, 2.05, -0.1, 0.5], [0.1, 2.75, 0.05, 0.45]]) ar.add(mesh(new THREE.IcosahedronGeometry(r, 0), mat([0x365f28, 0x2f5a22, 0x3f6b2e][Math.round(r * 10) % 3], 0.85, { flatShading: true }), x, y, z));
  sombras(AFUERA);
}
// el vidrio de la puerta de calle (hoja que abre hacia afuera) y su campanita
const PCALLE = new THREE.Group(); PCALLE.position.set(VX + PU0 + 0.04, 0, ZF + 0.01); scene.add(PCALLE);
{ PCALLE.add(caja(0.06, 2.3, 0.05, M.navy3, 0.02, 1.15, 0, 0.01)); PCALLE.add(caja(0.5, 0.06, 0.05, M.navy3, 0.27, 2.27, 0, 0.01)); PCALLE.add(caja(0.5, 0.06, 0.05, M.navy3, 0.27, 0.04, 0, 0.01)); PCALLE.add(caja(0.06, 2.3, 0.05, M.navy3, 0.52, 1.15, 0, 0.01)); PCALLE.add(caja(0.04, 0.3, 0.06, M.g, 0.45, 1.05, 0.03, 0.01)); sombras(PCALLE); }
// la hoja de vaivén del QUIRÓFANO en la recepción (pared izquierda) y en la sala de recuperación (pared del fondo)
function crearVaiven(ancho = 1.0, alto = 2.1) {
  const g = new THREE.Group();
  g.add(caja(ancho, alto, 0.06, M.navy3, ancho / 2, alto / 2, 0, 0.015));
  // el ojo de buey: aro crema con el vidrio navy oscuro
  const ojo = mesh(new THREE.TorusGeometry(0.15, 0.03, 10, 32), M.cr, ancho / 2, 1.42, 0.04); g.add(ojo);
  const vi = mesh(new THREE.CircleGeometry(0.15, 32), mat(0x0b1220, 0.2), ancho / 2, 1.42, 0.035); g.add(vi);
  const t = lienzo(640, 140, (x, w, h) => { x.clearRect(0, 0, w, h); x.fillStyle = "#efeee5"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "QUIRÓFANO", 900, 104, w - 30); x.fillText("QUIRÓFANO", w / 2, h / 2 + 4); });
  const v = new THREE.Mesh(new THREE.PlaneGeometry(ancho * 0.86, ancho * 0.86 * 140 / 640), new THREE.MeshBasicMaterial({ map: t, transparent: true })); v.position.set(ancho / 2, 1.82, 0.035); g.add(v);
  g.add(caja(0.12, 0.05, 0.05, M.cr2, ancho - 0.12, 1.0, 0.04, 0.01));
  return sombras(g);
}
const QHOJA = crearVaiven(0.98, 2.1); QHOJA.position.set(VX + XL + 0.06, 0, -0.56); QHOJA.rotation.y = Math.PI / 2; scene.add(QHOJA);

// ---- LA PIZARRA "CIRUGÍAS · JUEVES" (parte 1): blanca con marco navy, seis renglones en Caveat navy ----
const PIZ_P = V3(VX - 1.22, 1.52, ZF + 0.03);
const PIZARRA = new THREE.Group(); PIZARRA.position.copy(PIZ_P); scene.add(PIZARRA);
{
  const W = 1.05, H = 1.0;
  PIZARRA.add(caja(W + 0.08, H + 0.08, 0.04, M.navy3, 0, 0, 0, 0.012));
  const t = lienzo(840, 800, (x, w, h) => {
    x.fillStyle = "#f8f7f2"; x.fillRect(0, 0, w, h);
    x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 130); x.fillStyle = "#efeee5"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "CIRUGÍAS · JUEVES", 900, 74, w - 50); x.fillText("CIRUGÍAS · JUEVES", w / 2, 68);
    x.fillStyle = "#0b1220"; x.textAlign = "left";
    ["TOTO", "COCO", "PANCHO", "SIMÓN", "NEGRO", "MORA"].forEach((n, i) => { const y = 200 + i * 104; x.font = CAV(100); x.fillText(n, 40, y + 6); x.font = CAV(66); x.fillStyle = "#16243d"; x.fillText("castración", 420, y + 10); x.fillStyle = "#0b1220"; });
  });
  PIZARRA.add(plano(W, H, t, 0, 0, 0.022));
  sombras(PIZARRA);
}

// ---- EL TELÉFONO INALÁMBRICO DE MOSTRADOR (EL objeto del dolor): base crema con luz, auricular navy3 con teclado crema,
// antena corta y pantallita verde apagado con el nombre de quien llama ----
const TEL_BASE_P = V3(VX + MOS.x - 0.62, MOS.alto, MOS.z + 0.02);
const TELB = new THREE.Group(); TELB.position.copy(TEL_BASE_P); TELB.rotation.y = 0.35; scene.add(TELB);
const luzBaseM = mat(0x8f969f, 0.4, { emissive: 0xfff3c8, emissiveIntensity: 0 });
{
  TELB.add(caja(0.17, 0.045, 0.2, M.cr, 0, 0.0225, 0, 0.02));
  const cuna = caja(0.11, 0.05, 0.08, M.cr2, 0, 0.06, -0.035, 0.018); cuna.rotation.x = -0.5; TELB.add(cuna);
  TELB.add(caja(0.035, 0.012, 0.035, luzBaseM, 0.05, 0.048, 0.065, 0.006));
  sombras(TELB);
}
const nombreTel = { txt: "", k: -1 };
const pantTelT = lienzo(240, 160, () => {});
function dibujarPantTel(txt, brillo) {
  const x = pantTelT.userData.x, w = 240, h = 160;
  x.fillStyle = brillo ? "#8fbf6a" : "#5d7f45"; x.fillRect(0, 0, w, h);
  if (txt) { x.fillStyle = "#0b1220"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, txt, 900, 64, w - 20); x.fillText(txt, w / 2, h / 2 + 3); }
  pantTelT.needsUpdate = true;
}
function crearAuricular() {
  const g = new THREE.Group();   // origen en el centro; el parlante arriba (+y), el micrófono abajo; mira a +z
  g.add(caja(0.058, 0.19, 0.03, M.navy3, 0, 0, 0, 0.013));
  g.add(mesh(new THREE.CylinderGeometry(0.008, 0.009, 0.05, 10), M.navy, 0.018, 0.115, -0.004));
  g.add(mesh(new THREE.SphereGeometry(0.009, 10, 8), M.navy, 0.018, 0.142, -0.004));
  const p = new THREE.Mesh(new THREE.PlaneGeometry(0.044, 0.03), new THREE.MeshBasicMaterial({ map: pantTelT, toneMapped: false })); p.position.set(0, 0.048, 0.0155); g.add(p);
  for (let i = 0; i < 9; i++) g.add(caja(0.012, 0.008, 0.004, M.cr, -0.015 + (i % 3) * 0.015, 0.012 - Math.floor(i / 3) * 0.016, 0.0155, 0.002));
  for (let i = 0; i < 3; i++) g.add(caja(0.022, 0.003, 0.003, M.navy, 0, 0.082 - i * 0.006, 0.0155, 0.001));
  return sombras(g);
}
const TEL = crearAuricular(); scene.add(TEL);
// los tres arcos de "ring" (planos crema con borde navy, pegados al auricular, de cara a la cámara)
const RING = new THREE.Group(); scene.add(RING);
for (let i = 0; i < 3; i++) for (const s of [-1, 1]) {
  const a = new THREE.Mesh(new THREE.RingGeometry(0.06 + i * 0.035, 0.072 + i * 0.035, 24, 1, s > 0 ? -0.6 : Math.PI - 0.6, 1.2), new THREE.MeshBasicMaterial({ color: C.cr, side: THREE.DoubleSide, transparent: true, depthWrite: false }));
  a.userData.i = i; RING.add(a);
}

// ---- LA TRANSPORTADORA DE LUNA (de veterinaria-vacunas) y LA SEÑORA ----
const TRANS = new THREE.Group();
{
  TRANS.add(caja(0.34, 0.3, 0.48, M.cr, 0, 0.15, 0, 0.05)); TRANS.add(caja(0.36, 0.035, 0.08, M.navy3, 0, 0.31, 0, 0.015));
  const cara = crearCaraGato(); cara.position.set(0, 0.15, 0.17); cara.scale.setScalar(0.95); TRANS.add(cara);
  for (let i = 0; i < 5; i++) TRANS.add(caja(0.016, 0.24, 0.016, M.navy, -0.12 + i * 0.06, 0.15, 0.25, 0.004));
  for (const y of [0.06, 0.24]) TRANS.add(caja(0.28, 0.016, 0.016, M.navy, 0, y, 0.25, 0.004));
  sombras(TRANS); scene.add(TRANS);
}

// ---- LA SALA DE RECUPERACIÓN (x = RX): pared navy arriba y azulejo verde apagado abajo; dos camillas de acero con
// mantas; la lámpara de calor; la puerta del QUIRÓFANO al fondo a la derecha y la puerta abierta a la recepción a la
// izquierda (por donde se asoma Bruno). Sin instrumental. ----
const REC = new THREE.Group(); REC.position.x = RX; scene.add(REC);
const RZ = -2.0, RXL = -2.4, RXR = 2.4, PREC0 = -1.85, PREC1 = -0.85;   // el vano a la recepción en la pared del fondo
const CAM1 = { x: -0.05, z: -0.35, w: 1.15, d: 0.62, alto: 0.84 }, CAM2 = { x: 1.45, z: -1.05, w: 0.95, d: 0.56, alto: 0.84 };
{
  const piso = mesh(new THREE.PlaneGeometry(10, 8), new THREE.MeshStandardMaterial({ map: pisoT, roughness: 0.85 }), 0, 0, 2.0); piso.rotation.x = -Math.PI / 2; piso.castShadow = false; REC.add(piso);
  { const g = new THREE.Group(); g.position.z = RZ; REC.add(g); pared(g, RXL, PREC0); pared(g, PREC0, PREC1, 2.15, HW); pared(g, PREC1, RXR); }
  for (const s of [-1, 1]) { const g = new THREE.Group(); g.position.x = s * RXR; g.rotation.y = -s * Math.PI / 2; REC.add(g); pared(g, s > 0 ? RZ - 0.01 : -6, s > 0 ? 6 : -RZ + 0.01); }
  const techo = mesh(new THREE.PlaneGeometry(10, 8), new THREE.MeshBasicMaterial({ color: 0x0b1220 }), 0, HW, 2.0); techo.rotation.x = Math.PI / 2; techo.castShadow = false; REC.add(techo);
  // el vano a la recepción: marco navy3; detrás, un pedazo del pasillo (pared crema)
  for (const x of [PREC0, PREC1]) REC.add(caja(0.09, 2.15, 0.14, M.navy3, x, 1.075, RZ + 0.02, 0.01)); REC.add(caja(PREC1 - PREC0 + 0.09, 0.09, 0.14, M.navy3, (PREC0 + PREC1) / 2, 2.15, RZ + 0.02, 0.01));
  REC.add(mesh(new THREE.BoxGeometry(2.0, 2.4, 0.1), M.cr2, (PREC0 + PREC1) / 2, 1.2, RZ - 1.3)); const pp = mesh(new THREE.PlaneGeometry(1.4, 1.4), new THREE.MeshStandardMaterial({ map: pisoT, roughness: 0.85 }), (PREC0 + PREC1) / 2, 0.001, RZ - 0.6); pp.rotation.x = -Math.PI / 2; REC.add(pp);
  for (const s of [-1, 1]) REC.add(mesh(new THREE.BoxGeometry(0.1, 2.4, 1.3), M.cr2, (s < 0 ? PREC0 : PREC1) + s * 0.05, 1.2, RZ - 0.65));
  // el marco de la puerta del quirófano (al fondo a la derecha)
  for (const x of [0.62, 1.66]) REC.add(caja(0.09, 2.2, 0.12, M.navy3, x, 1.1, RZ + 0.03, 0.01)); REC.add(caja(1.13, 0.09, 0.12, M.navy3, 1.14, 2.2, RZ + 0.03, 0.01));
  // las camillas: tapa de acero gris claro con canto, pata central y base; la manta encima (con pliegue y volumen)
  const camilla = (c, manta, borde) => {
    const g = new THREE.Group(); g.position.set(c.x, 0, c.z); REC.add(g);
    g.add(caja(c.w, 0.05, c.d, M.acero, 0, c.alto - 0.025, 0, 0.012));
    g.add(caja(c.w + 0.02, 0.03, 0.03, M.acero, 0, c.alto - 0.01, c.d / 2, 0.01)); g.add(caja(c.w + 0.02, 0.03, 0.03, M.acero, 0, c.alto - 0.01, -c.d / 2, 0.01));
    g.add(mesh(new THREE.CylinderGeometry(0.07, 0.07, c.alto - 0.12, 16), M.acero, 0, (c.alto - 0.12) / 2 + 0.07, 0));
    g.add(caja(c.w * 0.6, 0.07, c.d * 0.7, M.grisO, 0, 0.035, 0, 0.02));
    const m = caja(c.w * 0.86, 0.05, c.d * 0.92, manta, 0, c.alto + 0.024, 0.0, 0.022); g.add(m);
    const pl = caja(c.w * 0.86, 0.03, 0.14, borde, 0, c.alto + 0.06, -c.d * 0.36, 0.014); g.add(pl);   // el pliegue doblado atrás
    g.add(caja(0.03, 0.035, c.d * 0.92, borde, -c.w * 0.43, c.alto + 0.026, 0, 0.01)); g.add(caja(0.03, 0.035, c.d * 0.92, borde, c.w * 0.43, c.alto + 0.026, 0, 0.01));
  };
  camilla(CAM1, M.cr, M.verde); camilla(CAM2, M.verde, M.cr);
  // un banquito navy3 y el perchero con dos ambos colgados (contra la pared izquierda)
  REC.add(caja(0.4, 0.05, 0.4, M.navy3, -1.95, 0.5, -0.9, 0.02)); REC.add(mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.48, 10), M.navy3, -1.95, 0.25, -0.9));
  sombras(REC);
}
fusionar(REC);
const QHOJA2 = crearVaiven(0.98, 2.1); QHOJA2.position.set(RX + 0.65, 0, RZ + 0.04); scene.add(QHOJA2);
// la lámpara de calor colgante sobre la camilla de Toto: pantalla navy, luz crema plana
const LAMPC = new THREE.Group(); LAMPC.position.set(RX + CAM1.x + 0.15, HW, CAM1.z - 0.05); scene.add(LAMPC);
{ LAMPC.add(mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.85, 6), M.navy, 0, -0.42, 0)); LAMPC.add(mesh(new THREE.CylinderGeometry(0.07, 0.24, 0.2, 28, 1, true), new THREE.MeshStandardMaterial({ color: 0x1f3254, roughness: 0.6, side: THREE.DoubleSide }), 0, -0.93, 0)); LAMPC.add(mesh(new THREE.CircleGeometry(0.2, 28).rotateX(Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0xfff1d2, side: THREE.DoubleSide }), 0, -1.02, 0)); }
const luzCalor = new THREE.PointLight(0xffe2b8, 0, 3.5, 1.6); luzCalor.position.set(RX + CAM1.x + 0.15, HW - 1.15, CAM1.z - 0.05); scene.add(luzCalor);

// ---- EL COLLAR ISABELINO (Toto y Coco): un cono truncado crema con el borde navy grueso, cerrado con una tira; va
// alrededor del cuello (pegado a la CABEZA), abierto hacia adelante: la boca queda adentro, adelante ----
function crearIsabelino() {
  const g = new THREE.Group();   // eje +z (hacia donde mira la cabeza); centro del aro chico en el origen
  const L = 0.3, r0 = 0.15, r1 = 0.33;
  const geo = new THREE.LatheGeometry([new THREE.Vector2(r0, 0), new THREE.Vector2(r1, L)], 40, 0, Math.PI * 2);
  geo.rotateX(Math.PI / 2);
  const cono = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: 0xece9dc, roughness: 0.35, side: THREE.DoubleSide, transparent: true, opacity: 0.88 }));
  cono.castShadow = true; g.add(cono);
  const borde = mesh(new THREE.TorusGeometry(r1, 0.016, 10, 48), M.navy3, 0, 0, L); g.add(borde);
  const bordeC = mesh(new THREE.TorusGeometry(r0, 0.014, 10, 36), M.navy3, 0, 0, 0); g.add(bordeC);
  // la tira de cierre (navy) a lo largo, abajo, con los agujeritos
  const tira = new THREE.Mesh(rbox(0.05, 0.012, L * 1.02, 0.005, 1), M.navy3); tira.position.set(0, -(r0 + r1) / 2 - 0.004, L / 2); tira.rotation.x = Math.atan2(r1 - r0, L); g.add(tira);
  g.userData = { r0, r1, L };
  return g;
}
const ISA = [crearIsabelino(), crearIsabelino()];
// ---- LA TABLET EN SU ATRIL (parte 2) ----
const pantT = lienzo(1000, 760, () => {});
const tablet = crearTablet(pantT, 0.32, 0.24, 0.35); tablet.position.set(VX + MOS.x + 0.42, MOS.alto, MOS.z + 0.02); tablet.rotation.y = -0.25; scene.add(tablet);
const pantTM = lienzo(760, 560, () => {});   // la tablet en la mano de Bruno (Q1, Q3)
const tabletM = new THREE.Group(); { tabletM.add(caja(0.27, 0.2, 0.012, M.navy, 0, 0, 0, 0.012)); const p = new THREE.Mesh(new THREE.PlaneGeometry(0.25, 0.18), new THREE.MeshBasicMaterial({ map: pantTM, toneMapped: false })); p.position.z = 0.0065; tabletM.add(p); const p2 = mesh(new THREE.CircleGeometry(0.006, 12), M.cr2, 0.1, 0.075, -0.0065); p2.rotation.y = Math.PI; tabletM.add(p2); scene.add(sombras(tabletM)); }
