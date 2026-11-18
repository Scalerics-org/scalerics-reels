
// =====================================================================================================
// EL BANCO: el box de atención a empresas (viernes de tarde, luz de oficina pareja, fría-neutra)
// =====================================================================================================
const BAN = new THREE.Group(); scene.add(BAN);
const MESA_Y = 0.76;
const DESK = { x0: -0.78, x1: 0.78, z0: -0.46, z1: 0.46 };
const PAT = { x: -1.08, z: 0.02, giro: Math.PI / 2 - 0.5 };     // Patricia (del lado -x)
const RUB = { x: 1.1, z: 0.06, giro: -Math.PI / 2 + 0.5 };      // Rubén (del lado +x, la silla del cliente)
const pantSaldo = lienzo(1100, 700, () => {});                    // el monitor de Patricia
const pantTurno = lienzo(1500, 560, () => {});                    // el turnero
let monPivote, timbreBoton, turnero;
const MON = { W: 0.7, H: 0.445, y: 0.47 };
{
  const alfombra = mesh(new THREE.PlaneGeometry(18, 12), mat(0x5b6b80, 0.95), 2, 0, 0); alfombra.rotation.x = -Math.PI / 2; alfombra.castShadow = false; BAN.add(alfombra);
  const crema = mat(C.cr, 0.9), zoc = M.navy3;
  // la pared del fondo (crema, zócalo navy3) del box y de la sala de espera
  BAN.add(caja(9.2, 3.1, 0.14, crema, 2.2, 1.55, -1.77, 0.01));
  BAN.add(caja(9.2, 0.14, 0.04, zoc, 2.2, 0.07, -1.69, 0.005));
  // el techo (placas crema) y la pared de la sala de espera (x = 6,6), navy2
  const techo = mesh(new THREE.BoxGeometry(12, 0.1, 6), mat(0xe9e7dc, 0.95), 1.6, 3.15, 0.8); techo.castShadow = false; BAN.add(techo);
  for (const [x, z] of [[0.2, 0.2], [3.4, 0.2], [0.2, 2.4], [3.4, 2.4]]) { const l = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 0.6), new THREE.MeshBasicMaterial({ color: 0xf6f7f2, toneMapped: false })); l.rotation.x = Math.PI / 2; l.position.set(x, 3.09, z); BAN.add(l); }
  BAN.add(caja(0.14, 3.1, 6.0, mat(C.navy2, 0.9), 6.6, 1.55, 1.2, 0.01));
  // la mampara esmerilada a la izquierda (separa el box de al lado): marco navy, vidrio blanco translúcido, franja crema
  const esm = new THREE.MeshStandardMaterial({ color: 0xe9eef2, roughness: 0.35, transparent: true, opacity: 0.88, emissive: 0xe9eef2, emissiveIntensity: 0.18 });
  const v = mesh(new THREE.PlaneGeometry(3.0, 2.3), esm, -2.25, 1.2, -0.25); v.rotation.y = Math.PI / 2; v.castShadow = false; BAN.add(v);
  const fr = mesh(new THREE.PlaneGeometry(3.0, 0.16), mat(C.cr2, 0.6), -2.24, 1.15, -0.25); fr.rotation.y = Math.PI / 2; fr.castShadow = false; BAN.add(fr);
  for (const z of [-1.75, -0.25, 1.25]) BAN.add(caja(0.06, 2.4, 0.06, M.navy, -2.25, 1.2, z, 0.01));
  for (const y of [0.04, 2.36]) BAN.add(caja(0.06, 0.06, 3.0, M.navy, -2.25, y, -0.25, 0.01));
  // el escritorio: tapa crema claro con canto navy, panel de adelante y patas navy3
  const DW = DESK.x1 - DESK.x0, DD = DESK.z1 - DESK.z0;
  BAN.add(caja(DW, 0.045, DD, mat(0xf3f1e8, 0.55), 0, MESA_Y - 0.022, 0, 0.01));
  BAN.add(caja(DW + 0.02, 0.03, DD + 0.02, M.navy, 0, MESA_Y - 0.05, 0, 0.008));
  BAN.add(caja(DW - 0.08, 0.6, 0.03, M.navy3, 0, MESA_Y - 0.36, DESK.z1 - 0.06, 0.01));
  for (const x of [DESK.x0 + 0.04, DESK.x1 - 0.04]) BAN.add(caja(0.05, MESA_Y - 0.06, DD - 0.06, M.navy3, x, (MESA_Y - 0.06) / 2, 0, 0.01));
  // el teclado (frente a Patricia), el portalápices con lapiceras, la plantita en maceta navy, el bowl de caramelos
  const tec = new THREE.Group(); tec.position.set(-0.42, MESA_Y, 0.02); tec.rotation.y = Math.PI / 2 - 0.15; BAN.add(tec);
  tec.add(caja(0.44, 0.022, 0.15, M.navy3, 0, 0.011, 0, 0.008));
  for (let i = 0; i < 3; i++) for (let k = 0; k < 11; k++) tec.add(caja(0.03, 0.01, 0.03, M.cr2, -0.19 + k * 0.038, 0.026, -0.042 + i * 0.042, 0.004));
  const port = new THREE.Group(); port.position.set(-0.62, MESA_Y, -0.32); BAN.add(port);
  port.add(mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.11, 16), M.navy3, 0, 0.055, 0));
  for (const [dx, dz, c] of [[0.012, 0, C.navy], [-0.012, 0.01, C.g], [0, -0.014, C.cr]]) { const l = mesh(new THREE.CylinderGeometry(0.005, 0.005, 0.16, 8), mat(c, 0.5), dx, 0.13, dz); l.rotation.z = dx * 6; port.add(l); }
  const pl = new THREE.Group(); pl.position.set(0.62, MESA_Y, -0.34); BAN.add(pl);
  pl.add(mesh(new THREE.CylinderGeometry(0.055, 0.045, 0.1, 18), M.navy, 0, 0.05, 0));
  semilla = 9;
  for (let i = 0; i < 9; i++) { const a = i * 2.3; const h = mesh(new THREE.SphereGeometry(1, 8, 6), M.hoja, Math.cos(a) * 0.035, 0.13 + (i % 3) * 0.03, Math.sin(a) * 0.035); h.scale.set(0.035, 0.012, 0.02); h.rotation.set(0.3, a, 0.6); pl.add(h); }
  const bowl = new THREE.Group(); bowl.position.set(0.3, MESA_Y, 0.24); BAN.add(bowl);
  bowl.add(mesh(new THREE.SphereGeometry(0.085, 20, 10, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), mat(C.cr2, 0.3, { side: THREE.DoubleSide }), 0, 0.075, 0));
  for (let i = 0; i < 6; i++) {
    const c = new THREE.Group(); const a = i * 1.1; c.position.set(Math.cos(a) * 0.04, 0.065 + (i % 2) * 0.012, Math.sin(a) * 0.04); c.rotation.set(0.2, a, 0.3); bowl.add(c);
    const cm = mat([C.cr, 0x6a8f4f, C.red][i % 3], 0.45);
    c.add(mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.03, 10), cm).rotateZ(Math.PI / 2));
    for (const s of [-1, 1]) c.add(mesh(new THREE.ConeGeometry(0.012, 0.016, 8), cm, s * 0.022, 0, 0).rotateZ(s * Math.PI / 2));
  }
  // el timbre del turnero (botón redondo crema con aro navy), al alcance de la mano derecha de Patricia
  const tb = new THREE.Group(); tb.position.set(-0.5, MESA_Y, 0.3); BAN.add(tb);
  tb.add(mesh(new THREE.CylinderGeometry(0.05, 0.055, 0.025, 24), M.navy, 0, 0.0125, 0));
  timbreBoton = mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.018, 24), mat(C.cr, 0.4), 0, 0.034, 0); tb.add(timbreBoton);
  // el monitor en su brazo giratorio (la abrazadera atrás, el brazo, el pivote): gira hacia Rubén
  const base = new THREE.Group(); base.position.set(0, MESA_Y, -0.33); BAN.add(base);
  base.add(caja(0.12, 0.02, 0.1, M.navy, 0, 0.01, 0, 0.005));
  base.add(mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.3, 10), M.gris, 0, 0.16, 0));
  monPivote = new THREE.Group(); monPivote.position.set(0, 0.0, 0.0); base.add(monPivote);
  monPivote.add(caja(0.05, 0.04, 0.16, M.navy, 0, MON.y - 0.12, 0.07, 0.01));
  monPivote.add(caja(MON.W + 0.05, MON.H + 0.05, 0.04, M.navy, 0, MON.y, 0.15, 0.02));
  const ps = new THREE.Mesh(new THREE.PlaneGeometry(MON.W, MON.H), new THREE.MeshBasicMaterial({ map: pantSaldo, toneMapped: false })); ps.position.set(0, MON.y, 0.172); monPivote.add(ps);
  monPivote.userData.centro = V3(0, MON.y, 0.172);
  // las sillas: la de Patricia (giratoria navy) y las dos del cliente (tapizadas navy3)
  const silla = (x, z, ry, alto = 0.82) => { const g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = ry; BAN.add(g); g.add(caja(0.5, 0.08, 0.48, M.navy3, 0, 0.48, 0, 0.03)); g.add(caja(0.48, 0.5, 0.07, M.navy3, 0, 0.48 + alto / 2 - 0.1, -0.24, 0.03)); for (const sx of [-1, 1]) for (const sz of [-1, 1]) g.add(caja(0.03, 0.44, 0.03, M.navy, sx * 0.21, 0.22, sz * 0.19, 0.005)); return g; };
  silla(PAT.x - 0.04, PAT.z, PAT.giro);
  silla(RUB.x + 0.04, RUB.z, RUB.giro);
  silla(1.25, -1.1, -Math.PI / 2 + 0.3);
  // la sala de espera (+x): dos filas de sillas navy3, el dispensador de números, el cartel ATENCIÓN EMPRESAS
  for (const xr of [3.6, 4.5]) for (let i = 0; i < 5; i++) silla(xr, -1.0 + i * 0.6, -Math.PI / 2, 0.7);
  const disp = new THREE.Group(); disp.position.set(2.6, 0, -1.35); BAN.add(disp);
  disp.add(mesh(new THREE.CylinderGeometry(0.03, 0.05, 1.1, 10), M.navy3, 0, 0.55, 0));
  disp.add(caja(0.26, 0.34, 0.16, M.cr, 0, 1.25, 0, 0.04)); disp.add(caja(0.2, 0.06, 0.02, M.navy, 0, 1.3, 0.085, 0.01)); disp.add(caja(0.06, 0.03, 0.03, M.cr2, 0, 1.15, 0.09, 0.008));
  const cartT = lienzo(1400, 300, (x, w, h) => { x.fillStyle = "#16243d"; x.fillRect(0, 0, w, h); x.strokeStyle = "#efeee5"; x.lineWidth = 14; x.strokeRect(20, 20, w - 40, h - 40); x.fillStyle = "#efeee5"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "ATENCIÓN EMPRESAS", 900, 140, w - 140); x.fillText("ATENCIÓN EMPRESAS", w / 2, h / 2 + 6); });
  const cart = plano(2.8, 0.6, cartT, 6.52, 2.35, 0.6, true); cart.rotation.y = -Math.PI / 2; BAN.add(cart);
  // una planta alta en maceta navy en la sala de espera y un cuadro abstracto en la pared del fondo del box
  const pg = new THREE.Group(); pg.position.set(5.9, 0, -1.3); BAN.add(pg);
  pg.add(mesh(new THREE.CylinderGeometry(0.22, 0.18, 0.5, 18), M.navy, 0, 0.25, 0));
  for (let i = 0; i < 14; i++) { const a = i * 2.4; const h = mesh(new THREE.SphereGeometry(1, 8, 6), i % 2 ? M.hoja : mat(0x6a8f4f, 0.8), Math.cos(a) * 0.18, 0.75 + (i % 5) * 0.16, Math.sin(a) * 0.18); h.scale.set(0.2, 0.05, 0.1); h.rotation.set(0.4, a, 0.7); pg.add(h); }
  const cuadT = lienzo(600, 420, (x, w, h) => { x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h); x.fillStyle = "#16243d"; x.fillRect(40, 40, w - 80, h - 80); x.fillStyle = "#3fa60a"; x.beginPath(); x.arc(220, 220, 110, 0, 7); x.fill(); x.fillStyle = "#efeee5"; x.fillRect(320, 120, 160, 200); x.fillStyle = "#c9a46b"; x.beginPath(); x.arc(420, 300, 50, 0, 7); x.fill(); });
  BAN.add(caja(0.98, 0.7, 0.03, M.navy, -1.3, 1.85, -1.69, 0.01)); BAN.add(plano(0.9, 0.63, cuadT, -1.3, 1.85, -1.67));
  // EL TURNERO: pantalla navy colgada de dos varillas del techo, marco navy3, letras crema en canvas
  turnero = new THREE.Group(); turnero.position.set(0.95, 2.48, -1.2); turnero.rotation.y = -0.18; BAN.add(turnero);
  turnero.add(caja(1.56, 0.6, 0.1, M.navy3, 0, 0, -0.03, 0.03));
  const tp = new THREE.Mesh(new THREE.PlaneGeometry(1.48, 0.53), new THREE.MeshBasicMaterial({ map: pantTurno, toneMapped: false })); tp.position.z = 0.025; turnero.add(tp);
  for (const s of [-1, 1]) turnero.add(mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.4, 8), M.gris, s * 0.6, 0.5, -0.03));
  turnero.userData.centro = V3(0, 0, 0.025);
  // un cliente en la sala de espera (de espaldas, con el número en la mano) se agrega con los personajes
}
sombras(BAN);
BAN.traverse((o) => { if (o.isMesh && o.material.transparent) { o.castShadow = false; } });
const luzBan = new THREE.DirectionalLight(0xf6f8fb, 1.7);
luzBan.castShadow = true; luzBan.shadow.mapSize.set(2048, 2048); luzBan.shadow.bias = -0.0006; luzBan.shadow.radius = 3;
Object.assign(luzBan.shadow.camera, { left: -4, right: 4, top: 4, bottom: -4, near: 1, far: 20 });
luzBan.position.set(1.5, 6.5, 4.0); luzBan.target.position.set(0, 0.8, 0); scene.add(luzBan, luzBan.target);
const cieloBan = new THREE.HemisphereLight(0xf2f4f6, 0x6a7686, 1.75); scene.add(cieloBan);
const rellBan = new THREE.DirectionalLight(0xe8eefa, 0.6); rellBan.position.set(-3, 3, 5); rellBan.target.position.set(0, 1, 0); scene.add(rellBan, rellBan.target);

// ---- el turnero: E-051 · BOX 2 → E-051 → COBRANZAS · BOX 3 (rojo apagado) → (Q4) E-051 → INVERSIONES · BOX 1 (verde)
let claveTurno = "";
function dibujarTurno(t) {
  const modo = t < T.flip ? 0 : t < P2 ? 1 : t < T.flip2 ? 0 : 2;
  const flip = (t >= T.flip && t < T.flip + 0.07) || (t >= T.flip2 && t < T.flip2 + 0.07) ? 1 : 0;
  const clave = `${modo}|${flip}`; if (clave === claveTurno) return; claveTurno = clave;
  const { x } = pantTurno.userData, w = 1500, h = 560;
  x.fillStyle = "#0b1220"; x.fillRect(0, 0, w, h);
  x.textAlign = "center"; x.textBaseline = "middle";
  if (flip) { x.fillStyle = "#16243d"; for (let i = 0; i < 7; i++) x.fillRect(0, i * 80 + 20, w, 40); pantTurno.needsUpdate = true; return; }
  if (modo === 0) {
    x.fillStyle = "#efeee5"; x.font = F(900, 250); x.fillText("E-051", w / 2, 190);
    x.font = F(800, 150); x.fillText("BOX 2", w / 2, 420);
  } else {
    const area = modo === 1 ? "COBRANZAS" : "INVERSIONES", col = modo === 1 ? "#d9786d" : "#5ce611", box = modo === 1 ? "BOX 3" : "BOX 1";
    x.fillStyle = "#efeee5"; x.font = F(900, 180); x.fillText(`E-051 → ${box}`, w / 2, 150);
    x.fillStyle = col; ajustar(x, area, 900, 230, w - 80); x.fillText(area, w / 2, 395);
  }
  pantTurno.needsUpdate = true;
}
// ---- el monitor de Patricia: la cuenta de la Distribuidora Rubén (parte 1 en rojo; Q4 en verde)
let claveSaldo = "";
function dibujarSaldo(t) {
  const verde = t >= P2 ? 1 : 0, marca = t >= T.tic - 0.05 && t < P2 ? 1 : 0;
  const clave = `${verde}|${marca}`; if (clave === claveSaldo) return; claveSaldo = clave;
  const { x } = pantSaldo.userData, w = 1100, h = 700;
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h);
  x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 120); x.fillStyle = "#efeee5"; x.textAlign = "left"; x.textBaseline = "middle";
  ajustar(x, "Cuenta empresa · Distribuidora Rubén", 800, 52, w - 80); x.fillText("Cuenta empresa · Distribuidora Rubén", 40, 62);
  x.fillStyle = "#1f3254"; x.font = F(800, 58); x.fillText("Saldo", 50, 200);
  if (!verde) {
    x.fillStyle = "#c7655b"; x.font = F(900, 150); x.fillText("− $ 140.000", 40, 320);
    x.fillStyle = marca ? "#f6e3e0" : "#e2e0d4"; x.beginPath(); x.roundRect(30, 430, w - 60, 130, 24); x.fill();
    if (marca) { x.strokeStyle = "#c7655b"; x.lineWidth = 10; x.stroke(); }
    x.fillStyle = "#0b1220"; x.font = F(800, 66); x.fillText("Sueldos hoy:", 60, 497); x.textAlign = "right"; x.font = F(900, 72); x.fillText("$ 780.000", w - 60, 497);
    x.textAlign = "left"; x.fillStyle = "#6b7280"; x.font = F(700, 46); x.fillText("Descubierto autorizado: usado", 50, 625);
  } else {
    x.fillStyle = "#3fa60a"; x.font = F(900, 150); x.fillText("+ $ 320.000", 40, 320);
    x.fillStyle = "#5ce611"; x.beginPath(); x.roundRect(30, 430, w - 60, 130, 24); x.fill();
    x.fillStyle = "#0b1220"; x.font = F(800, 66); x.fillText("Sueldos $ 780.000", 60, 497); x.textAlign = "right"; x.font = F(900, 80); x.fillText("✓", w - 70, 500);
    x.textAlign = "left"; x.fillStyle = "#1f3254"; x.font = F(700, 46); x.fillText("Entró esta semana: $ 1.240.000", 50, 625);
  }
  pantSaldo.needsUpdate = true;
}

// =====================================================================================================
// EL BOX DE INVERSIONES (x = 20): pared navy2, sillón de cuero capitoné navy3, cuadro, lámpara de pie, mesita con el café
// =====================================================================================================
const INV = new THREE.Group(); INV.position.x = 20; scene.add(INV);
let taza;
{
  const piso = mesh(new THREE.PlaneGeometry(8, 6), mat(0x5b6b80, 0.95), 0, 0, 0); piso.rotation.x = -Math.PI / 2; piso.castShadow = false; INV.add(piso);
  INV.add(caja(8, 3.1, 0.14, mat(C.navy2, 0.85), 0, 1.55, -1.3, 0.01));
  INV.add(caja(8, 0.14, 0.04, M.navy, 0, 0.07, -1.22, 0.005));
  for (const s of [-1, 1]) INV.add(caja(0.14, 3.1, 4, mat(C.navy2, 0.85), s * 2.6, 1.55, 0.5, 0.01));
  // el sillón capitoné (cuero navy3): base, almohadón, respaldo con botones, apoyabrazos
  const cuero = mat(0x24385c, 0.42), cuero2 = mat(0x1c2d4a, 0.45);
  const sil = new THREE.Group(); sil.position.set(0, 0, -0.75); INV.add(sil);
  sil.add(caja(1.9, 0.36, 0.8, cuero2, 0, 0.2, 0, 0.06));
  sil.add(caja(1.6, 0.14, 0.7, cuero, 0, 0.44, 0.04, 0.06));
  sil.add(caja(1.9, 0.62, 0.22, cuero, 0, 0.72, -0.32, 0.08));
  for (const s of [-1, 1]) sil.add(caja(0.18, 0.5, 0.8, cuero, s * 0.88, 0.48, 0, 0.08));
  for (let i = 0; i < 6; i++) for (let j = 0; j < 2; j++) sil.add(mesh(new THREE.SphereGeometry(0.016, 8, 6), M.navy, -0.65 + i * 0.26 + (j ? 0.13 : 0), 0.62 + j * 0.2, -0.205));
  // el cuadro abstracto verde apagado con manchas crema
  const cT = lienzo(700, 520, (x, w, h) => { x.fillStyle = "#365f28"; x.fillRect(0, 0, w, h); x.fillStyle = "#efeee5"; for (const [cx, cy, r] of [[200, 180, 90], [470, 330, 120], [560, 120, 50], [120, 420, 60]]) { x.beginPath(); x.arc(cx, cy, r, 0, 7); x.fill(); } x.fillStyle = "#5ce611"; x.fillRect(300, 60, 40, 380); });
  INV.add(caja(1.32, 0.98, 0.04, mat(0xb08a4a, 0.4, { metalness: 0.4 }), 0.1, 1.85, -1.21, 0.01)); INV.add(plano(1.2, 0.86, cT, 0.1, 1.85, -1.185));
  // la lámpara de pie de bronce mate (a la derecha) con su luz cálida
  const lam = new THREE.Group(); lam.position.set(1.25, 0, -0.95); INV.add(lam);
  const bronce = mat(0xb08a4a, 0.4, { metalness: 0.45 });
  lam.add(mesh(new THREE.CylinderGeometry(0.16, 0.18, 0.03, 20), bronce, 0, 0.015, 0)); lam.add(mesh(new THREE.CylinderGeometry(0.015, 0.015, 1.6, 8), bronce, 0, 0.8, 0));
  lam.add(mesh(new THREE.CylinderGeometry(0.15, 0.24, 0.3, 24, 1, true), mat(C.cr, 0.8, { side: THREE.DoubleSide, emissive: 0xffe2b0, emissiveIntensity: 0.6 }), 0, 1.66, 0));
  // la mesita con la taza de café servida y el platito con dos galletitas
  const mes = new THREE.Group(); mes.position.set(-0.05, 0, 0.35); INV.add(mes);
  mes.add(caja(0.9, 0.04, 0.5, mat(0xc89a64, 0.5), 0, 0.42, 0, 0.01)); for (const sx of [-1, 1]) for (const sz of [-1, 1]) mes.add(caja(0.035, 0.4, 0.035, M.navy, sx * 0.4, 0.2, sz * 0.2, 0.005));
  taza = new THREE.Group(); mes.add(taza);
  taza.add(mesh(new THREE.CylinderGeometry(0.075, 0.075, 0.01, 20), mat(C.cr, 0.35), 0, 0.445, 0));
  taza.add(mesh(new THREE.CylinderGeometry(0.042, 0.034, 0.07, 18), mat(C.cr, 0.35), 0, 0.485, 0));
  taza.add(mesh(new THREE.CylinderGeometry(0.038, 0.038, 0.005, 18), mat(0x4a2c1a, 0.3), 0, 0.518, 0));
  taza.add(mesh(new THREE.TorusGeometry(0.018, 0.006, 6, 12, Math.PI), mat(C.cr, 0.35), 0.045, 0.488, 0).rotateZ(-Math.PI / 2));
  for (const dx of [-0.25, -0.18]) { const g = mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.012, 16), mat(0xd9a45a, 0.7), dx, 0.448, 0.08); mes.add(g); }
  mes.add(mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.008, 18), mat(C.cr, 0.35), -0.215, 0.443, 0.08));
}
sombras(INV);
const luzInv = new THREE.PointLight(0xffd9a0, 6, 6, 1.6); luzInv.position.set(21.25, 1.62, -0.85); scene.add(luzInv);
const solInv = new THREE.DirectionalLight(0xfff0dc, 1.4); solInv.castShadow = true; solInv.shadow.mapSize.set(1024, 1024); solInv.shadow.bias = -0.0006;
Object.assign(solInv.shadow.camera, { left: -3, right: 3, top: 3, bottom: -3, near: 1, far: 20 });
solInv.position.set(22, 5, 4); solInv.target.position.set(20, 0.8, -0.5); scene.add(solInv, solInv.target);
const cieloInv = new THREE.HemisphereLight(0xf2e8dc, 0x3a4458, 1.35); scene.add(cieloInv);

// =====================================================================================================
// LA ROTISERÍA DE GRACIELA (x = 40), de ya-lo-cargo: azulejo blanco con guarda verde, el mostrador con la vitrina, el
// spiedo con los pollos girando contra la pared del fondo, la pizarra. Graciela detrás del mostrador mirando a +z.
// =====================================================================================================
const ROT = new THREE.Group(); ROT.position.x = 40; scene.add(ROT);
const MOSTR = { x0: -1.6, x1: 1.8, y: 1.0, d: 0.7, z: -1.15 };
const GRA = { x: 40 - 0.15, z: -1.95 };
let spiedoBarras = [];
const pantG = lienzo(600, 1215, () => {});          // el celular de Graciela
let celGsoporte;
{
  const RD = 3.4;
  const azul = lienzo(512, 512, (x, w, h) => { x.fillStyle = "#f4f4ef"; x.fillRect(0, 0, w, h); x.strokeStyle = "#cfd2cc"; x.lineWidth = 6; for (let i = 0; i <= 4; i++) { x.beginPath(); x.moveTo(i * 128, 0); x.lineTo(i * 128, h); x.stroke(); x.beginPath(); x.moveTo(0, i * 128); x.lineTo(w, i * 128); x.stroke(); } });
  azul.wrapS = azul.wrapT = THREE.RepeatWrapping;
  const pared = (w, h, x, y, z, ry) => { const tx = azul.clone(); tx.needsUpdate = true; tx.repeat.set(w / 0.5, h / 0.5); const p = mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshStandardMaterial({ map: tx, roughness: 0.4 }), x, y, z); p.rotation.y = ry; p.castShadow = false; ROT.add(p); };
  pared(8, 3.1, 0, 1.55, -RD, 0); pared(RD + 3, 3.1, -3.4, 1.55, -RD / 2 + 1.5, Math.PI / 2); pared(RD + 3, 3.1, 3.4, 1.55, -RD / 2 + 1.5, -Math.PI / 2);
  ROT.add(caja(8, 0.12, 0.03, M.g, 0, 1.55, -RD + 0.02)); ROT.add(caja(0.03, 0.12, RD + 3, M.g, -3.38, 1.55, -RD / 2 + 1.5)); ROT.add(caja(0.03, 0.12, RD + 3, M.g, 3.38, 1.55, -RD / 2 + 1.5));
  const piso = lienzo(512, 512, (x) => { for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) { x.fillStyle = (i + j) % 2 ? "#d9d7c9" : "#1f3254"; x.fillRect(i * 64, j * 64, 64, 64); } });
  piso.wrapS = piso.wrapT = THREE.RepeatWrapping; piso.repeat.set(6, 5);
  const p = mesh(new THREE.PlaneGeometry(8, RD + 3), new THREE.MeshStandardMaterial({ map: piso, roughness: 0.5 }), 0, 0.005, -RD / 2 + 1.5); p.rotation.x = -Math.PI / 2; p.castShadow = false; ROT.add(p);
  ROT.add(caja(8, 0.1, RD + 3, mat(0xe8e6da, 0.95), 0, 3.12, -RD / 2 + 1.5));
  // el mostrador navy3 con tapa de madera clara y la vitrina (milanesas, tarta, papas)
  const MW = MOSTR.x1 - MOSTR.x0, MC = (MOSTR.x0 + MOSTR.x1) / 2;
  ROT.add(caja(MW, MOSTR.y - 0.06, MOSTR.d, M.navy3, MC, (MOSTR.y - 0.06) / 2, MOSTR.z, 0.03));
  ROT.add(caja(MW + 0.1, 0.06, MOSTR.d + 0.08, mat(0xc89a64, 0.55), MC, MOSTR.y - 0.03, MOSTR.z, 0.02));
  ROT.add(caja(MW - 0.2, 0.06, 0.02, M.g, MC, 0.32, MOSTR.z + MOSTR.d / 2 + 0.005, 0.01));
  const vit = new THREE.Mesh(rbox(1.5, 0.36, MOSTR.d - 0.1, 0.02, 2), M.vidrio); vit.position.set(-0.8, MOSTR.y + 0.18, MOSTR.z); vit.renderOrder = 3; ROT.add(vit);
  ROT.add(caja(1.5, 0.03, MOSTR.d - 0.08, M.gris, -0.8, MOSTR.y + 0.37, MOSTR.z));
  const milanesa = mat(0xb9803e, 0.8), tarta = mat(0xd9a441, 0.7);
  for (let i = 0; i < 2; i++) {
    const bx = -1.15 + i * 0.7;
    ROT.add(caja(0.6, 0.03, 0.42, M.gris, bx, MOSTR.y + 0.02, MOSTR.z));
    if (i === 0) for (let k = 0; k < 3; k++) { const m = mesh(new THREE.SphereGeometry(0.1, 12, 8), milanesa, bx - 0.15 + k * 0.15, MOSTR.y + 0.05, MOSTR.z + (k % 2 ? 0.08 : -0.06)); m.scale.set(1.25, 0.22, 0.9); ROT.add(m); }
    else { ROT.add(mesh(new THREE.CylinderGeometry(0.2, 0.18, 0.08, 20), tarta, bx, MOSTR.y + 0.07, MOSTR.z)); ROT.add(mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.012, 20), mat(0x8a5a2c, 0.7), bx, MOSTR.y + 0.115, MOSTR.z)); }
  }
  // la pizarra navy con tiza crema (a la derecha, en la pared del fondo)
  const piz = lienzo(900, 600, (x, w, h) => { x.fillStyle = "#16243d"; x.fillRect(0, 0, w, h); x.strokeStyle = "#c89a64"; x.lineWidth = 34; x.strokeRect(0, 0, w, h); x.fillStyle = "#efeee5"; x.textAlign = "center"; x.font = CAV(118); ["Pollo al spiedo", "Milanesa", "Tarta"].forEach((s, i) => x.fillText(s, w / 2, 170 + i * 150)); });
  ROT.add(plano(1.2, 0.8, piz, 1.6, 2.15, -RD + 0.03));
  // el spiedo contra la pared del fondo, detrás de Graciela a la izquierda: 3 barras con 3 pollos que giran, la llama
  const sp = new THREE.Group(); sp.position.set(-1.05, 0.95, -RD + 0.45); ROT.add(sp);
  const acero = mat(0xc9ccd2, 0.3, { metalness: 0.55 }), aceroOsc = mat(0x8a8e98, 0.4, { metalness: 0.5 });
  sp.add(caja(1.6, 0.9, 0.6, aceroOsc, 0, -0.45, 0));
  for (const s of [-1, 1]) sp.add(caja(0.08, 1.3, 0.62, acero, s * 0.78, 0.63, 0));
  sp.add(caja(1.64, 0.1, 0.64, acero, 0, 1.3, 0)); sp.add(caja(1.64, 0.06, 0.64, acero, 0, 0.0, 0));
  const vsp = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 1.2), M.vidrio); vsp.position.set(0, 0.64, 0.31); vsp.renderOrder = 3; sp.add(vsp);
  const brasas = lienzo(512, 384, (x, w, h) => { x.fillStyle = "#c46a3a"; x.fillRect(0, 0, w, h); x.fillStyle = "#e09a5a"; for (let i = 0; i < 9; i++) { x.beginPath(); x.moveTo(i * 60 - 10, h); x.quadraticCurveTo(i * 60 + 20, h * 0.2, i * 60 + 50, h); x.fill(); } });
  const llama = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 1.05), new THREE.MeshBasicMaterial({ map: brasas, toneMapped: false })); llama.position.set(0, 0.64, -0.26); sp.add(llama);
  const doradoM = mat(0xc98a3a, 0.45), doradoO = mat(0xa86a2a, 0.5), hiloM = mat(C.cr, 0.8);
  for (let b = 0; b < 3; b++) {
    const barra = new THREE.Group(); barra.position.set(0, 0.28 + b * 0.36, 0.02); sp.add(barra); spiedoBarras.push(barra);
    barra.add(mesh(new THREE.CylinderGeometry(0.012, 0.012, 1.5, 8), acero).rotateZ(Math.PI / 2));
    for (let k = 0; k < 3; k++) {
      const pg = new THREE.Group(); pg.position.x = -0.46 + k * 0.46; barra.add(pg);
      const cu = mesh(new THREE.SphereGeometry(0.13, 18, 14), doradoM); cu.scale.set(1.0, 0.82, 0.86); pg.add(cu);
      const pe = mesh(new THREE.SphereGeometry(0.085, 14, 10), doradoM, 0.11, 0.02, 0.0); pe.scale.set(0.8, 0.75, 0.9); pg.add(pe);
      for (const s of [-1, 1]) { const mu = mesh(new THREE.SphereGeometry(0.055, 12, 8), doradoO, -0.05, -0.06, s * 0.08); mu.scale.set(1.4, 0.9, 0.9); pg.add(mu); }
      const hilo = mesh(new THREE.TorusGeometry(0.03, 0.007, 6, 14), hiloM, -0.17, -0.08, 0); hilo.rotation.y = Math.PI / 2; pg.add(hilo);
      pg.rotation.x = k * 1.3;
    }
  }
  // el celular de Graciela en un soporte sobre el mostrador (a su derecha): lo usa en altavoz y lee el recordatorio
  celGsoporte = new THREE.Group(); celGsoporte.position.set(0.55, MOSTR.y, MOSTR.z + 0.05); celGsoporte.rotation.y = Math.PI; ROT.add(celGsoporte);
  celGsoporte.add(caja(0.1, 0.02, 0.09, M.navy, 0, 0.01, 0, 0.005));
  const brazoS = caja(0.02, 0.1, 0.02, M.navy, 0, 0.06, 0.02, 0.004); brazoS.rotation.x = -0.35; celGsoporte.add(brazoS);
  // un frasco de chimichurri y la balanza (lado de Graciela)
  ROT.add(caja(0.42, 0.18, 0.36, M.navy3, 1.35, MOSTR.y + 0.09, MOSTR.z - 0.02, 0.04));
  ROT.add(caja(0.34, 0.03, 0.3, M.gris, 1.35, MOSTR.y + 0.2, MOSTR.z - 0.02, 0.02));
  // estante con bandejas de aluminio y bolsas kraft a la derecha
  ROT.add(caja(1.4, 0.04, 0.35, M.navy3, 1.6, 1.45, -RD + 0.2, 0.01));
  for (let i = 0; i < 5; i++) ROT.add(caja(0.18, 0.28, 0.12, M.kraft, 1.1 + i * 0.25, 1.61, -RD + 0.2, 0.01));
}
sombras(ROT);
ROT.traverse((o) => { if (o.isMesh && o.material.transparent) { o.castShadow = false; o.receiveShadow = false; } });
const luzRot = new THREE.DirectionalLight(0xfff3e2, 1.6); luzRot.castShadow = true; luzRot.shadow.mapSize.set(2048, 2048); luzRot.shadow.bias = -0.0006; luzRot.shadow.radius = 3;
Object.assign(luzRot.shadow.camera, { left: -4, right: 4, top: 4, bottom: -4, near: 1, far: 20 });
luzRot.position.set(42, 6, 3); luzRot.target.position.set(40, 0.8, -1.5); scene.add(luzRot, luzRot.target);
const cieloRot = new THREE.HemisphereLight(0xf6f2ea, 0x6a6458, 1.7); scene.add(cieloRot);

// =====================================================================================================
// EL MUELLE DE LA DISTRIBUIDORA (x = 60): pared navy claro, portón navy3, la camioneta de reparto crema con franja verde
// =====================================================================================================
const MUE = new THREE.Group(); MUE.position.x = 60; scene.add(MUE);
let camioneta, puertaCam;
{
  const piso = mesh(new THREE.PlaneGeometry(16, 12), mat(0xb7b3a6, 0.9), 0, 0, 0); piso.rotation.x = -Math.PI / 2; piso.castShadow = false; MUE.add(piso);
  for (let x = -6; x <= 6; x += 3) { const l = mesh(new THREE.PlaneGeometry(0.1, 5), mat(0xe9e4cf, 0.8), x, 0.004, 0.5); l.rotation.x = -Math.PI / 2; l.castShadow = false; MUE.add(l); }
  const paredM = mat(0x34507a, 0.92);
  MUE.add(caja(16, 5, 0.3, paredM, 0, 2.5, -3.2, 0.01));
  // el portón navy3 a medio subir (lamas) y el depósito adentro (estanterías con cajas kraft)
  MUE.add(caja(4.2, 3.6, 0.1, mat(0x2a3b58, 0.8), -2.6, 1.8, -3.5, 0.01));
  for (let i = 0; i < 10; i++) MUE.add(caja(4.0, 0.12, 0.06, M.navy3, -2.6, 2.6 + i * 0.13, -3.0, 0.01));
  for (const s of [-1, 1]) MUE.add(caja(0.2, 3.9, 0.35, M.navy3, -2.6 + s * 2.1, 1.95, -3.0, 0.01));
  for (let k = 0; k < 3; k++) for (let i = 0; i < 6; i++) MUE.add(caja(0.5, 0.36, 0.4, mat(i % 2 ? C.kraft : 0xbf9a62, 0.85), -4.1 + i * 0.6, 0.2 + k * 0.38, -3.35, 0.01));
  // el cartel de la distribuidora en la pared (crema sobre navy)
  const cT = lienzo(1400, 260, (x, w, h) => { x.fillStyle = "#0b1220"; x.fillRect(0, 0, w, h); x.strokeStyle = "#5ce611"; x.lineWidth = 12; x.strokeRect(14, 14, w - 28, h - 28); x.fillStyle = "#efeee5"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "DISTRIBUIDORA RUBÉN", 900, 130, w - 120); x.fillText("DISTRIBUIDORA RUBÉN", w / 2, h / 2 + 6); });
  MUE.add(plano(3.4, 0.63, cT, 2.4, 3.5, -3.03, true));
  // la camioneta de reparto (furgón chico): caja crema con franja verde, cabina navy3, la puerta del conductor se cierra
  camioneta = new THREE.Group(); camioneta.position.set(1.7, 0, -0.6); camioneta.rotation.y = -Math.PI / 2; MUE.add(camioneta);
  const cue = mat(C.cr, 0.5), cab = M.navy3;
  camioneta.add(caja(1.9, 1.75, 3.0, cue, 0, 1.35, -0.6, 0.08));
  for (const s of [-1, 1]) camioneta.add(caja(0.02, 0.26, 2.9, M.g, s * 0.96, 1.4, -0.6, 0.01));
  camioneta.add(caja(1.9, 1.45, 1.3, cab, 0, 1.15, 1.55, 0.14));
  camioneta.add(caja(1.7, 0.6, 0.05, mat(0x2c4268, 0.15, { metalness: 0.3 }), 0, 1.55, 2.2, 0.02));
  for (const s of [-1, 1]) for (const z of [-1.5, 1.45]) camioneta.add(mesh(new THREE.CylinderGeometry(0.38, 0.38, 0.3, 22), M.goma, s * 0.82, 0.38, z).rotateZ(Math.PI / 2));
  camioneta.add(caja(1.95, 0.16, 0.15, M.navy, 0, 0.5, 2.22, 0.04));
  // la ventanilla del conductor y la puerta (a +x local, el lado que ve la cámara)
  puertaCam = new THREE.Group(); puertaCam.position.set(0.96, 0, 2.15); camioneta.add(puertaCam);
  puertaCam.add(caja(0.05, 1.0, 1.1, cab, 0.0, 1.0, -0.55, 0.03));
  puertaCam.add(caja(0.02, 0.4, 0.85, mat(0x2c4268, 0.15, { metalness: 0.3 }), 0.02, 1.62, -0.55, 0.02));
  puertaCam.add(caja(0.03, 0.04, 0.16, M.cr, 0.04, 1.2, -0.95, 0.01));
}
sombras(MUE);
const luzMue = new THREE.DirectionalLight(0xfffaf0, 1.9); luzMue.castShadow = true; luzMue.shadow.mapSize.set(2048, 2048); luzMue.shadow.bias = -0.0006;
Object.assign(luzMue.shadow.camera, { left: -5, right: 5, top: 5, bottom: -5, near: 1, far: 25 });
luzMue.position.set(63, 8, 4); luzMue.target.position.set(60, 0.8, -0.5); scene.add(luzMue, luzMue.target);
const cieloMue = new THREE.HemisphereLight(0xeaf0f6, 0x6a6458, 1.8); scene.add(cieloMue);

// =====================================================================================================
// LA OFICINA DE RUBÉN (x = 80): el monitor grande con el panel de cuentas por cobrar; detrás, la ventana, el mate
// =====================================================================================================
const OFI = new THREE.Group(); OFI.position.x = 80; scene.add(OFI);
const pantP = lienzo(1280, 1000, () => {});
const PANEL = { W: 1.05, H: 0.82 };
let panelMon;
{
  const pisoT = lienzo(512, 512, (x, w, h) => { x.fillStyle = "#b08a5e"; x.fillRect(0, 0, w, h); x.strokeStyle = "#977350"; x.lineWidth = 6; for (let i = 0; i <= 8; i++) { x.beginPath(); x.moveTo(0, i * 64); x.lineTo(w, i * 64); x.stroke(); } });
  pisoT.wrapS = pisoT.wrapT = THREE.RepeatWrapping; pisoT.repeat.set(3, 2);
  const p = mesh(new THREE.PlaneGeometry(6, 5), new THREE.MeshStandardMaterial({ map: pisoT, roughness: 0.7 }), 0, 0, 0); p.rotation.x = -Math.PI / 2; p.castShadow = false; OFI.add(p);
  OFI.add(caja(6, 3, 0.12, mat(C.cr, 0.9), 0, 1.5, -1.4, 0.01));
  // la ventana con la persiana (el depósito y el cielo de afuera)
  const cielo = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 1.2), new THREE.MeshBasicMaterial({ color: 0xe7eef3, toneMapped: false })); cielo.position.set(-1.3, 1.7, -1.33); OFI.add(cielo);
  for (let i = 0; i < 12; i++) OFI.add(caja(1.8, 0.04, 0.02, M.cr, -1.3, 2.25 - i * 0.1, -1.3, 0.005));
  OFI.add(caja(1.9, 0.08, 0.08, M.navy3, -1.3, 2.33, -1.3, 0.01)); OFI.add(caja(1.9, 0.06, 0.12, M.navy3, -1.3, 1.08, -1.28, 0.01));
  // el escritorio de madera, el monitor grande, el mate humeando en su termo
  OFI.add(caja(1.8, 0.05, 0.9, mat(0xc89a64, 0.55), 0, MESA_Y - 0.025, -0.4, 0.012));
  for (const x of [-0.85, 0.85]) OFI.add(caja(0.06, 0.72, 0.8, M.navy3, x, 0.36, -0.4, 0.01));
  panelMon = new THREE.Group(); panelMon.position.set(0.0, MESA_Y, -0.55); OFI.add(panelMon);
  panelMon.add(caja(0.12, 0.3, 0.1, M.navy, 0, 0.15, -0.05)); panelMon.add(caja(0.4, 0.03, 0.28, M.navy, 0, 0.015, -0.03));
  panelMon.add(caja(PANEL.W + 0.07, PANEL.H + 0.07, 0.06, M.navy, 0, 0.3 + PANEL.H / 2, 0, 0.025));
  const pm = new THREE.Mesh(new THREE.PlaneGeometry(PANEL.W, PANEL.H), new THREE.MeshBasicMaterial({ map: pantP, toneMapped: false })); pm.position.set(0, 0.3 + PANEL.H / 2, 0.032); panelMon.add(pm);
  panelMon.userData.centro = V3(0, 0.3 + PANEL.H / 2, 0.032);
  const mt = crearMate(); mt.scale.setScalar(1.1); mt.position.set(0.68, MESA_Y, -0.2); OFI.add(mt);
  const tm = crearTermo(); tm.scale.setScalar(1.1); tm.position.set(0.82, MESA_Y, -0.45); OFI.add(tm);
}
sombras(OFI);
const luzOfi = new THREE.DirectionalLight(0xffeedb, 1.7); luzOfi.castShadow = true; luzOfi.shadow.mapSize.set(1024, 1024); luzOfi.shadow.bias = -0.0006;
Object.assign(luzOfi.shadow.camera, { left: -3, right: 3, top: 3, bottom: -3, near: 1, far: 20 });
luzOfi.position.set(78, 5, 4); luzOfi.target.position.set(80, 0.8, -0.5); scene.add(luzOfi, luzOfi.target);
const cieloOfi = new THREE.HemisphereLight(0xf4efe4, 0x6a5a48, 1.6); scene.add(cieloOfi);
// el chip 3D "Pagado ✓" que viaja del celular de Graciela al panel (placa redondeada verde con el texto navy)
const chipT = lienzo(640, 200, (x, w, h) => { x.fillStyle = "#5ce611"; x.fillRect(0, 0, w, h); x.fillStyle = "#0b1220"; x.textAlign = "center"; x.textBaseline = "middle"; x.font = F(900, 118); x.fillText("Pagado ✓", w / 2, h / 2 + 6); });
const chip3d = new THREE.Mesh(rbox(0.32, 0.1, 0.03, 0.03, 3), [M.gd, M.gd, M.gd, M.gd, new THREE.MeshBasicMaterial({ map: chipT, toneMapped: false }), M.gd]); scene.add(chip3d);

const LUCES = { ban: [luzBan, cieloBan, rellBan], inv: [luzInv, solInv, cieloInv], rot: [luzRot, cieloRot], mue: [luzMue, cieloMue], ofi: [luzOfi, cieloOfi] };
const INTENS = new Map(); for (const k in LUCES) for (const l of LUCES[k]) INTENS.set(l, l.intensity);
function ponerLuces(lugares, k = 1) { for (const key in LUCES) for (const l of LUCES[key]) { l.visible = lugares.includes(key); l.intensity = INTENS.get(l) * k; } }
const FONDO = { ban: 0xe9e7dc, inv: 0x16243d, rot: 0xf4f4ef, mue: 0xd9e6ef, ofi: 0xe7eef3 };
