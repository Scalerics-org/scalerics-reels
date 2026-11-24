// =====================================================================================================
// LOS SETS: la cocina de Vero (x = 0), el pasillo del súper (x = SUX), la recepción de Veterinaria Inés (x = VX), la puerta
// de Vero (x = PX). Cada uno en su lugar del mundo; la cámara salta de uno a otro con los cortes.
// =====================================================================================================
const SUX = -40, VX = 40, PX = 80;
M.gaz = mat(0x365f28, 0.85); M.acero = mat(0xb9bec4, 0.5, { metalness: 0.3 }); M.kraft = mat(0xc9a774, 0.85); M.verde = mat(0x365f28, 0.8);
M.croq = mat(0x8a5a30, 0.8); M.pared2 = mat(0x16243d, 0.9); M.gris = mat(0xb9bec4, 0.85); M.grisO = mat(0x8f969f, 0.8);
const silueta = (x, cx, cy, s, color) => {
  // un perro sentado de perfil (silueta plana): cuerpo, cabeza con hocico, oreja, pata, cola
  x.save(); x.translate(cx, cy); x.scale(s, s); x.fillStyle = color;
  x.beginPath(); x.ellipse(0, 20, 46, 52, -0.25, 0, 7); x.fill();
  x.beginPath(); x.ellipse(22, -48, 30, 28, 0, 0, 7); x.fill();
  x.beginPath(); x.ellipse(50, -40, 22, 14, 0.15, 0, 7); x.fill();
  x.beginPath(); x.moveTo(6, -66); x.lineTo(-6, -98); x.lineTo(22, -74); x.closePath(); x.fill();
  x.fillRect(18, 30, 16, 46); x.beginPath(); x.ellipse(-30, 66, 36, 14, 0, 0, 7); x.fill();
  x.lineWidth = 12; x.strokeStyle = color; x.lineCap = "round"; x.beginPath(); x.moveTo(-40, 50); x.quadraticCurveTo(-80, 40, -78, 0); x.stroke();
  x.restore();
};
// ---- la bolsa de 15 kg (EL objeto): tipo "vete" (kraft con el sticker de Veterinaria Inés), "super" (verde, sin sticker)
// o "otra" (colores de la góndola). nombre: la etiqueta de envío. vacia: desinflada y arrugada.
const frenteBolsa = {};
function texFrente(tipo, nombre, color, kg = "15 kg") {
  const k = `${tipo}|${nombre}|${color}|${kg}`;
  if (frenteBolsa[k]) return frenteBolsa[k];
  const fondo = tipo === "vete" ? "#c9a774" : tipo === "super" ? "#365f28" : color;
  const tinta = tipo === "vete" ? "#0b1220" : "#efeee5";
  return (frenteBolsa[k] = lienzo(400, 580, (x, w, h) => {
    x.fillStyle = fondo; x.fillRect(0, 0, w, h);
    silueta(x, w / 2 - 10, 190, 1.35, tinta);
    x.fillStyle = tipo === "vete" ? "#efeee5" : tipo === "super" ? "#efeee5" : "#efeee5"; x.fillRect(0, 316, w, 150);
    x.fillStyle = "#0b1220"; x.textAlign = "center"; x.textBaseline = "middle";
    ajustar(x, "ADULTO MEDIANO", 800, 40, w - 40); x.fillText("ADULTO MEDIANO", w / 2, 346);
    ajustar(x, kg, 900, 96, w - 60); x.fillText(kg, w / 2, 420);
    if (tipo === "vete") {
      x.fillStyle = "#365f28"; x.beginPath(); x.arc(312, 82, 66, 0, 7); x.fill(); x.strokeStyle = "#efeee5"; x.lineWidth = 6; x.beginPath(); x.arc(312, 82, 58, 0, 7); x.stroke();
      x.fillStyle = "#efeee5"; ajustar(x, "VETERINARIA", 800, 22, 104); x.fillText("VETERINARIA", 312, 70); x.font = F(900, 30); x.fillText("INÉS", 312, 100);
    }
    if (nombre) {
      x.fillStyle = "#efeee5"; x.strokeStyle = "#0b1220"; x.lineWidth = 8; x.beginPath(); x.roundRect(46, 482, w - 92, 84, 14); x.fill(); x.stroke();
      x.fillStyle = "#0b1220"; ajustar(x, nombre, 900, 62, w - 130); x.fillText(nombre, w / 2, 526);
    }
  }));
}
function crearBolsa15({ tipo = "vete", nombre = null, vacia = false, color = "#16243d", kg = "15 kg", esc = 1 } = {}) {
  const g = new THREE.Group();
  const W = 0.4, H = 0.58, D = vacia ? 0.06 : 0.15;
  const lado = tipo === "vete" ? M.kraft : tipo === "super" ? M.verde : mat(new THREE.Color(color).getHex(), 0.8);
  const geo = rbox(W, H, D, 0.035, 3);
  if (vacia) {
    // arrugada: los lados hundidos y tres pliegues (función fija de la posición, sin azar)
    const p = geo.attributes.position;
    for (let i = 0; i < p.count; i++) { const x = p.getX(i), y = p.getY(i), z = p.getZ(i); const k = Math.sin(x * 23 + y * 9) * 0.012 + Math.sin(y * 17) * 0.01; p.setZ(i, z * (0.7 + 0.3 * Math.abs(Math.sin(y * 6 + x * 4))) + k * Math.sign(z)); p.setX(i, x * (1 - 0.06 * Math.cos(y * 5))); }
    geo.computeVertexNormals();
  }
  const frente = new THREE.MeshStandardMaterial({ map: texFrente(tipo, nombre, color, kg), roughness: 0.85 });
  const cuerpo = new THREE.Mesh(geo, [lado, lado, lado, lado, frente, lado]); cuerpo.position.y = H / 2; g.add(cuerpo);
  // la parte de arriba doblada y cosida (la costura en zigzag navy)
  const tapa = caja(W * 0.98, 0.06, D * 0.6 + 0.01, lado, 0, H + 0.02, 0, 0.012); g.add(tapa);
  for (let i = 0; i < 9; i++) { const z = caja(0.05, 0.012, 0.006, M.navy, -W / 2 + 0.04 + i * 0.04, H + 0.022, (D * 0.6 + 0.01) / 2 + 0.002, 0.003); z.rotation.z = i % 2 ? 0.6 : -0.6; g.add(z); }
  g.scale.setScalar(esc);
  sombras(g); g.userData = { H, W, D };
  return g;
}
// ---- el plato de acero de Toto (Lathe) y las croquetas ----
const platoGeo = new THREE.LatheGeometry([V3(0, 0, 0), V3(0.1, 0, 0), V3(0.12, 0.012, 0), V3(0.135, 0.06, 0), V3(0.15, 0.07, 0), V3(0.155, 0.064, 0), V3(0.12, 0.055, 0), V3(0.105, 0.012, 0), V3(0, 0.012, 0)], 36);
function crearPlato() {
  const g = new THREE.Group();
  g.add(mesh(platoGeo, M.acero));
  const lleno = new THREE.Group(); g.add(lleno); g.userData.lleno = lleno;
  semilla = 21;
  const croG = new THREE.SphereGeometry(0.014, 8, 6);
  for (let i = 0; i < 70; i++) {
    const r = Math.sqrt(az()) * 0.11, a = az() * 6.28, h = 0.02 + (1 - r / 0.11) * 0.045 + az() * 0.01;
    const c = mesh(croG, M.croq, Math.cos(a) * r, h, Math.sin(a) * r); c.scale.set(1.2, 0.7, 1); c.rotation.set(az() * 3, az() * 3, 0); lleno.add(c);
  }
  return g;
}
const croqSola = mesh(new THREE.SphereGeometry(0.016, 10, 8), M.croq); croqSola.scale.set(1.2, 0.7, 1); scene.add(croqSola);

// ---- LA COCINA DE VERO (x = 0): pared del fondo z = -1,8 navy claro; mesada con azulejo crema; damero; lámpara verde ----
const COC = new THREE.Group(); scene.add(COC);
const KZ = -1.8, KXL = -2.6, KXR = 2.6, KH = 2.7;
const damero = lienzo(512, 512, (x, w, h) => { for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { x.fillStyle = (i + j) % 2 ? "#b9bec4" : "#d9d7c9"; x.fillRect(i * 128, j * 128, 128, 128); } });
damero.wrapS = damero.wrapT = THREE.RepeatWrapping; damero.repeat.set(6, 4.5);
const azuCr = lienzo(512, 256, (x, w, h) => { x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h); x.fillStyle = "#1f3254"; for (let j = 0; j < 4; j++) { x.fillRect(0, j * 64, w, 4); for (let i = 0; i < 4; i++) x.fillRect(i * 128 + (j % 2 ? 64 : 0), j * 64, 4, 64); } });
azuCr.wrapS = azuCr.wrapT = THREE.RepeatWrapping;
{
  const piso = mesh(new THREE.PlaneGeometry(KXR - KXL, 4.8), new THREE.MeshStandardMaterial({ map: damero, roughness: 0.85 }), 0, 0, KZ + 2.4); piso.rotation.x = -Math.PI / 2; piso.castShadow = false; COC.add(piso);
  COC.add(mesh(new THREE.BoxGeometry(KXR - KXL, KH, 0.2), M.pared2, 0, KH / 2, KZ - 0.1));
  for (const s of [-1, 1]) { const w = mesh(new THREE.BoxGeometry(0.2, KH, 4.8), M.pared2, s * (KXR + 0.1), KH / 2, KZ + 2.4); COC.add(w); }
  const techo = mesh(new THREE.PlaneGeometry(KXR - KXL, 4.8), new THREE.MeshBasicMaterial({ color: 0x0b1220 }), 0, KH, KZ + 2.4); techo.rotation.x = Math.PI / 2; COC.add(techo);
  // la mesada contra el fondo (x de -2,4 a 0,6): frente navy3, tapa crema, azulejo crema arriba hasta 1,55
  const mx0 = -2.4, mx1 = 0.6, mw = mx1 - mx0, mc = (mx0 + mx1) / 2;
  COC.add(caja(mw, 0.86, 0.58, M.navy3, mc, 0.43, KZ + 0.3, 0.012)); COC.add(caja(mw + 0.04, 0.05, 0.62, M.cr, mc, 0.885, KZ + 0.31, 0.012));
  for (let i = 0; i < 5; i++) COC.add(caja(0.03, 0.12, 0.02, M.cr2, mx0 + 0.3 + i * 0.6, 0.7, KZ + 0.6, 0.008));
  const t = azuCr.clone(); t.needsUpdate = true; t.repeat.set(mw / 0.8, 0.62 / 0.4);
  const az1 = mesh(new THREE.PlaneGeometry(mw, 0.62), new THREE.MeshStandardMaterial({ map: t, roughness: 0.85 }), mc, 0.91 + 0.31, KZ + 0.005); az1.castShadow = false; COC.add(az1);
  // la alacena alta (navy3 con tiradores crema) y la heladera crema a la izquierda
  COC.add(caja(1.8, 0.7, 0.35, M.navy3, -1.4, 2.0, KZ + 0.18, 0.015)); for (let i = 0; i < 3; i++) COC.add(caja(0.12, 0.025, 0.02, M.cr, -2.0 + i * 0.6, 1.72, KZ + 0.36, 0.008));
  COC.add(caja(0.7, 1.85, 0.66, M.cr, -2.15 + 0.0, 0.925, KZ + 0.95, 0.04)); COC.add(caja(0.03, 0.4, 0.03, M.navy3, -1.83, 1.2, KZ + 1.3, 0.01));
  // la ventana (x 1,1 a 2,1): marco crema, vidrio (de noche navy oscuro liso; de día crema)
  COC.add(caja(1.1, 1.1, 0.06, M.cr, 1.55, 1.55, KZ + 0.03, 0.01));
  // la silla y la mesita a la derecha (siluetas simples navy3 / crema)
  const me = new THREE.Group(); me.position.set(1.7, 0, -0.6); COC.add(me); me.add(caja(0.8, 0.04, 0.6, M.cr, 0, 0.74, 0, 0.012)); for (const [a, b] of [[-0.35, -0.25], [0.35, -0.25], [-0.35, 0.25], [0.35, 0.25]]) me.add(caja(0.04, 0.72, 0.04, M.navy3, a, 0.36, b, 0.008));
  sombras(COC);
}
fusionar(COC);
const VENTANA = mesh(new THREE.PlaneGeometry(0.98, 0.98), new THREE.MeshBasicMaterial({ color: 0x0b1220 }), 1.55, 1.55, KZ + 0.065); scene.add(VENTANA);
// la lámpara colgante (pantalla verde apagado; la luz crema plana de noche)
const LAMPARA = new THREE.Group(); LAMPARA.position.set(-0.3, KH, -0.4); scene.add(LAMPARA);
{ LAMPARA.add(mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.6, 6), M.navy, 0, -0.3, 0)); const p = mesh(new THREE.CylinderGeometry(0.09, 0.26, 0.22, 28, 1, true), new THREE.MeshStandardMaterial({ color: 0x365f28, roughness: 0.7, side: THREE.DoubleSide }), 0, -0.7, 0); LAMPARA.add(p); LAMPARA.add(mesh(new THREE.SphereGeometry(0.06, 14, 10), new THREE.MeshBasicMaterial({ color: 0xfff6dc }), 0, -0.79, 0)); }
const luzLamp = new THREE.PointLight(0xffe9c2, 0, 6, 1.4); luzLamp.position.set(-0.3, KH - 0.85, -0.4); scene.add(luzLamp);
// la alfombrita "TOTO" y el plato
const alfT = lienzo(512, 300, (x, w, h) => { x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h); x.strokeStyle = "#1f3254"; x.lineWidth = 14; x.strokeRect(14, 14, w - 28, h - 28); x.fillStyle = "#0b1220"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "TOTO", 800, 120, w - 80); x.fillText("TOTO", w / 2, h / 2 + 6); });
const ALF = mesh(new THREE.PlaneGeometry(0.66, 0.39), new THREE.MeshStandardMaterial({ map: alfT, roughness: 0.95 }), 0, 0.004, 0); ALF.rotation.x = -Math.PI / 2; ALF.castShadow = false; scene.add(ALF);
const PLATO = crearPlato(); scene.add(PLATO);
// la taza de Vero (Q3)
const TAZA = new THREE.Group(); { TAZA.add(mesh(new THREE.CylinderGeometry(0.045, 0.04, 0.1, 18), M.cr, 0, 0.05, 0)); const as = mesh(new THREE.TorusGeometry(0.03, 0.009, 8, 16), M.cr, 0.05, 0.05, 0); TAZA.add(as); TAZA.add(mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.005, 18), mat(0x5a3a26, 0.4), 0, 0.09, 0)); scene.add(sombras(TAZA)); }

// ---- EL PASILLO DEL SÚPER (x = SUX): la góndola gris claro de cuatro estantes con bolsas de colores, el piso gris ----
const SUP = new THREE.Group(); SUP.position.x = SUX; scene.add(SUP);
const GZ = -0.95;   // el frente de la góndola
const BOLSA_GOND = V3(SUX - 0.05, 0.72, GZ - 0.18);   // la bolsa verde de 15 kg en el estante del medio (de donde la saca)
{
  const piso = mesh(new THREE.PlaneGeometry(8, 6), M.gris, 0, 0, 1.5); piso.rotation.x = -Math.PI / 2; piso.castShadow = false; SUP.add(piso);
  SUP.add(mesh(new THREE.BoxGeometry(8, 3.2, 0.2), M.pared2, 0, 1.6, GZ - 0.65));
  const gw = 4.4;
  SUP.add(caja(gw, 2.0, 0.06, M.cr2, 0, 1.0, GZ - 0.5, 0.01));
  for (const y of [0.08, 0.68, 1.26, 1.82]) { SUP.add(caja(gw, 0.04, 0.5, M.gris, 0, y, GZ - 0.25, 0.008)); SUP.add(caja(gw, 0.07, 0.02, M.navy3, 0, y + 0.0, GZ + 0.01, 0.006)); }
  SUP.add(caja(gw + 0.06, 0.12, 0.55, M.navy3, 0, 2.05, GZ - 0.25, 0.01));
  for (const x of [-gw / 2, gw / 2]) SUP.add(caja(0.06, 2.1, 0.55, M.gris, x, 1.05, GZ - 0.25, 0.01));
  // los carteles de precio en el borde de los estantes
  const precioT = (txt) => lienzo(200, 90, (x, w, h) => { x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h); x.fillStyle = "#0b1220"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, txt, 900, 56, w - 16); x.fillText(txt, w / 2, h / 2 + 3); });
  const precios = [[-1.5, 0.68, "$ 2.100"], [-0.05, 0.68, "$ 3.900"], [1.3, 0.68, "$ 4.400"], [-0.9, 1.26, "$ 980"], [0.8, 1.26, "$ 1.350"], [-1.2, 0.08, "$ 2.900"], [0.9, 0.08, "$ 3.600"]];
  for (const [x, y, t] of precios) SUP.add(plano(0.16, 0.072, precioT(t), x, y - 0.012, GZ + 0.024));
}
// las bolsas de la góndola (fijas): grandes abajo y al medio, chicas arriba; la verde de 15 kg se mueve aparte
const COL_G = ["#16243d", "#c9a774", "#b9bec4", "#1f3254", "#efeee5", "#8f969f"];
{
  let k = 0;
  for (const [y, n, esc, kg] of [[0.1, 9, 0.95, "20 kg"], [0.7, 9, 0.9, "15 kg"], [1.28, 12, 0.6, "3 kg"], [1.84, 12, 0.52, "1 kg"]]) {
    for (let i = 0; i < n; i++) {
      const x = -2.0 + (i + 0.5) * (4.0 / n);
      if (y === 0.7 && Math.abs(x - -0.05) < 0.25) continue;   // el hueco de la verde
      const c = COL_G[(k++ * 5 + i) % COL_G.length];
      const b = crearBolsa15({ tipo: "otra", color: c, kg, esc }); b.position.set(x, y + 0.02, GZ - 0.22); b.rotation.y = ((i * 7) % 5 - 2) * 0.03; SUP.add(b);
    }
  }
}
fusionar(SUP);
const BOLSA_SUP = crearBolsa15({ tipo: "super" }); scene.add(BOLSA_SUP);
// el carro de alambre navy3 (barras de 6 px o más en pantalla): canasto, manija, patas y ruedas
const CARRO = new THREE.Group(); scene.add(CARRO);
{
  const bar = (a, b, r = 0.008) => { const m = mesh(new THREE.CylinderGeometry(r, r, 1, 6).translate(0, 0.5, 0), M.navy3); entre(m, a, b, r); m.scale.x = m.scale.z = 1; CARRO.add(m); };
  const W = 0.5, L = 0.75, y0 = 0.42, y1 = 0.85;
  for (const y of [y0, (y0 + y1) / 2, y1]) { bar(V3(-W / 2, y, -L / 2), V3(W / 2, y, -L / 2)); bar(V3(-W / 2, y, L / 2), V3(W / 2, y, L / 2)); bar(V3(-W / 2, y, -L / 2), V3(-W / 2, y, L / 2)); bar(V3(W / 2, y, -L / 2), V3(W / 2, y, L / 2)); }
  for (let i = 0; i <= 6; i++) { const z = -L / 2 + (i * L) / 6; bar(V3(-W / 2, y0, z), V3(-W / 2, y1, z)); bar(V3(W / 2, y0, z), V3(W / 2, y1, z)); }
  for (let i = 0; i <= 4; i++) { const x = -W / 2 + (i * W) / 4; bar(V3(x, y0, -L / 2), V3(x, y1, -L / 2)); bar(V3(x, y0, L / 2), V3(x, y1, L / 2)); }
  CARRO.add(caja(W, 0.01, L, M.navy3, 0, y0, 0, 0.004));
  bar(V3(-W / 2, y1, L / 2), V3(-W / 2, 1.0, L / 2 + 0.12)); bar(V3(W / 2, y1, L / 2), V3(W / 2, 1.0, L / 2 + 0.12)); CARRO.add(mesh(new THREE.CylinderGeometry(0.018, 0.018, W + 0.04, 10).rotateZ(Math.PI / 2), M.verde, 0, 1.0, L / 2 + 0.12));
  for (const [x, z] of [[-W / 2, -L / 2], [W / 2, -L / 2], [-W / 2, L / 2], [W / 2, L / 2]]) { bar(V3(x, 0.07, z), V3(x, y0, z)); CARRO.add(mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.03, 14).rotateZ(Math.PI / 2), M.goma ?? M.navy, x, 0.04, z)); }
  sombras(CARRO);
}
fusionar(CARRO);
const CARRO_POS = V3(SUX + 0.75, 0, 0.0);
CARRO.position.copy(CARRO_POS); CARRO.rotation.y = -0.35;

// ---- LA RECEPCIÓN DE VETERINARIA INÉS (x = VX): azulejo verde apagado y navy arriba, el mostrador, el cartel, la vidriera
// y la puerta a la derecha; la torre de bolsas (parte 1) / el estante "ENVÍOS DE HOY" (parte 2) a la izquierda ----
const VET = new THREE.Group(); VET.position.x = VX; scene.add(VET);
const ZF = -2.2, HW = 3.0, XL = -3.0, XR = 2.6, AZ = 1.8;
const MOS = { x: 0, z: -1.05, w: 1.7, d: 0.55, alto: 1.02 };
const PUERTA = { z0: 0.15, z1: 1.15 };
const azulejoT = lienzo(512, 512, (x, w, h) => { x.fillStyle = "#365f28"; x.fillRect(0, 0, w, h); x.fillStyle = "#2c4f20"; for (let i = 0; i < 8; i++) { x.fillRect(0, i * 64, w, 4); x.fillRect(i * 64, 0, 4, h); } });
azulejoT.wrapS = azulejoT.wrapT = THREE.RepeatWrapping;
const pisoT = lienzo(512, 512, (x, w, h) => { x.fillStyle = "#d9d7c9"; x.fillRect(0, 0, w, h); x.fillStyle = "#d2d0c1"; for (let i = 0; i < 4; i++) x.fillRect(0, i * 128, w, 3); });
pisoT.wrapS = pisoT.wrapT = THREE.RepeatWrapping; pisoT.repeat.set(5, 5);
function pared(g, x0, x1, y0 = 0, y1 = HW) {
  const w = x1 - x0;
  if (y0 < AZ) { const hb = Math.min(AZ, y1) - y0, t = azulejoT.clone(); t.needsUpdate = true; t.repeat.set(w / 0.6, hb / 0.6); t.offset.set(0, (y0 % 0.6) / 0.6); const b = mesh(new THREE.BoxGeometry(w, hb, 0.2), [M.gaz, M.gaz, M.gaz, M.gaz, new THREE.MeshStandardMaterial({ map: t, roughness: 0.85 }), M.gaz], (x0 + x1) / 2, y0 + hb / 2, -0.1); b.castShadow = false; g.add(b); }
  if (y1 > AZ) { const y = Math.max(AZ, y0), c = mesh(new THREE.BoxGeometry(w, y1 - y, 0.2), M.navy, (x0 + x1) / 2, (y + y1) / 2, -0.1); c.castShadow = false; g.add(c); }
}
{
  const piso = mesh(new THREE.PlaneGeometry(14, 10), new THREE.MeshStandardMaterial({ map: pisoT, roughness: 0.85 }), 0, 0, 2.6); piso.rotation.x = -Math.PI / 2; piso.castShadow = false; VET.add(piso);
  { const g = new THREE.Group(); g.position.z = ZF; VET.add(g); pared(g, XL, XR); g.add(caja(XR - XL, 0.1, 0.03, M.navy3, (XL + XR) / 2, 0.05, 0.015, 0.01)); }
  { const g = new THREE.Group(); g.position.x = XL; g.rotation.y = Math.PI / 2; VET.add(g); pared(g, -7.4, -ZF + 0.01); }
  { const g = new THREE.Group(); g.position.x = XR; g.rotation.y = -Math.PI / 2; VET.add(g);
    pared(g, ZF - 0.01, -1.95, 0, HW); pared(g, -1.95, -0.25, 0, 0.85); pared(g, -1.95, -0.25, 2.2, HW); pared(g, -0.25, PUERTA.z0, 0, HW); pared(g, PUERTA.z0, PUERTA.z1, 2.25, HW); pared(g, PUERTA.z1, 7.4, 0, HW); }
  const techo = mesh(new THREE.PlaneGeometry(14, 10), new THREE.MeshBasicMaterial({ color: 0x0b1220 }), 0, HW, 2.6); techo.rotation.x = Math.PI / 2; techo.castShadow = false; VET.add(techo);
  // el mostrador (frente navy3, tapa crema con canto verde)
  const mo = new THREE.Group(); mo.position.set(MOS.x, 0, MOS.z); VET.add(mo);
  mo.add(caja(MOS.w + 0.08, 0.05, MOS.d + 0.08, M.cr, 0, MOS.alto - 0.025, 0, 0.012));
  mo.add(caja(MOS.w, MOS.alto - 0.05, MOS.d, M.navy3, 0, (MOS.alto - 0.05) / 2, 0, 0.012));
  mo.add(caja(MOS.w - 0.1, 0.05, 0.02, M.g, 0, MOS.alto - 0.2, MOS.d / 2 + 0.005, 0.01));
  // el estante de atrás: collares, premios en frascos y juguetes genéricos (sin texto)
  const st = new THREE.Group(); st.position.set(0, 0, ZF + 0.18); VET.add(st);
  for (const y of [1.2, 1.62]) st.add(caja(1.7, 0.03, 0.3, M.cr, 0, y, 0, 0.008));
  for (let i = 0; i < 6; i++) { const c = mesh(new THREE.TorusGeometry(0.06, 0.016, 8, 20), [M.g, M.red, M.navy3, M.gaz, M.kraft, M.cr2][i], -0.65 + i * 0.26, 1.29, 0.02); st.add(c); }
  for (let i = 0; i < 5; i++) { st.add(mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.16, 18), M.cr2, -0.6 + i * 0.3, 1.715, 0)); st.add(mesh(new THREE.CylinderGeometry(0.065, 0.065, 0.03, 18), i % 2 ? M.g : M.navy3, -0.6 + i * 0.3, 1.81, 0)); }
  // el cartel "VETERINARIA INÉS" arriba del mostrador
  const cartelT = lienzo(1400, 300, (x, w, h) => { x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h); x.fillStyle = "#0b1220"; x.textAlign = "left"; x.textBaseline = "middle"; ajustar(x, "VETERINARIA INÉS", 800, 150, w - 330); x.fillText("VETERINARIA INÉS", 290, h / 2 + 10);
    const hx = 150, hy = h / 2 + 10; x.beginPath(); x.ellipse(hx, hy + 30, 52, 42, 0, 0, 7); x.fill(); for (const [dx, dy] of [[-56, -36], [-20, -66], [20, -66], [56, -36]]) { x.beginPath(); x.ellipse(hx + dx, hy + dy, 20, 25, 0, 0, 7); x.fill(); } x.fillStyle = "#5ce611"; x.fillRect(40, h - 30, w - 80, 12); });
  VET.add(caja(1.62, 0.37, 0.04, M.navy3, 0, 2.2, ZF + 0.02, 0.01)); VET.add(plano(1.56, 0.334, cartelT, 0, 2.2, ZF + 0.045));
  // la balanza de piso y una planta en la esquina
  { const b = new THREE.Group(); b.position.set(1.55, 0, ZF + 0.5); VET.add(b); b.add(caja(0.6, 0.06, 0.45, M.acero, 0, 0.03, 0, 0.015)); b.add(caja(0.56, 0.008, 0.41, mat(0x3a3f4a, 0.9), 0, 0.064, 0, 0.003)); }
  // la puerta (marco navy) y el marco de la vidriera, en la pared derecha
  for (const z of [PUERTA.z0, PUERTA.z1]) VET.add(caja(0.12, 2.25, 0.08, M.navy3, XR - 0.04, 1.125, z, 0.01));
  VET.add(caja(0.12, 0.1, PUERTA.z1 - PUERTA.z0 + 0.08, M.navy3, XR - 0.04, 2.25, (PUERTA.z0 + PUERTA.z1) / 2, 0.01));
  for (const y of [0.85, 2.2]) VET.add(caja(0.12, 0.08, 1.78, M.navy3, XR - 0.04, y, -1.1, 0.01));
  for (const z of [-1.95, -0.25]) VET.add(caja(0.12, 1.43, 0.08, M.navy3, XR - 0.04, 1.525, z, 0.01));
  // el banco de espera contra la pared izquierda
  const bn = new THREE.Group(); bn.position.set(XL + 0.3, 0, -0.2); VET.add(bn); bn.add(caja(0.42, 0.06, 1.4, M.cr, 0, 0.45, 0, 0.02)); for (const z of [-0.6, 0.6]) bn.add(caja(0.36, 0.42, 0.05, M.navy3, 0, 0.21, z, 0.01));
  sombras(VET);
}
fusionar(VET);
const VID = mesh(new THREE.PlaneGeometry(1.7, 1.35), new THREE.MeshBasicMaterial({ color: 0xe3e9ec }), VX + XR + 0.02, 1.525, -1.1); VID.rotation.y = -Math.PI / 2; VID.castShadow = false; scene.add(VID);
const AFUERA = mesh(new THREE.PlaneGeometry(1.2, 2.3), VID.material, VX + XR + 0.4, 1.15, (PUERTA.z0 + PUERTA.z1) / 2); AFUERA.rotation.y = -Math.PI / 2; AFUERA.castShadow = false; scene.add(AFUERA);
const HOJA = new THREE.Group(); HOJA.position.set(VX + XR - 0.02, 0, PUERTA.z0 + 0.04); scene.add(HOJA);
{ HOJA.add(caja(0.05, 2.18, 0.94, M.navy3, 0, 1.09, 0.47, 0.01)); HOJA.add(caja(0.055, 1.9, 0.78, mat(0xb9cde0, 0.15, { transparent: true, opacity: 0.55 }), 0, 1.15, 0.47, 0.005)); HOJA.add(caja(0.08, 0.04, 0.18, M.g, -0.05, 1.05, 0.82, 0.01)); }
// la torre de bolsas (parte 1): 3 de ancho × 3 de fondo × 2 de alto + 2 arriba = 20, sobre un pallet bajo crema
const TORRE_P = V3(VX - 1.45, 0, -0.55);
const TORRE = new THREE.Group(); TORRE.position.copy(TORRE_P); scene.add(TORRE);
{
  TORRE.add(caja(1.3, 0.12, 0.52, M.cr2, 0, 0.06, 0, 0.01));
  let n = 0;
  for (let h = 0; h < 2; h++) for (let f = 0; f < 3; f++) for (let i = 0; i < 3; i++) { const b = crearBolsa15({ tipo: "vete" }); b.position.set(-0.42 + i * 0.42, 0.12 + h * 0.66, 0.17 - f * 0.17); b.rotation.y = ((n * 3) % 5 - 2) * 0.015; TORRE.add(b); n++; }
  for (let i = 0; i < 2; i++) { const b = crearBolsa15({ tipo: "vete" }); b.position.set(-0.21 + i * 0.42, 1.44, 0.0); b.rotation.y = (i ? 1 : -1) * 0.04; TORRE.add(b); }
  // el cartel de cartón colgado adelante: "RACIÓN 15 kg · $ 3.900" en Caveat navy
  const ct = lienzo(520, 260, (x, w, h) => { x.fillStyle = "#d8bf8e"; x.fillRect(0, 0, w, h); x.strokeStyle = "#a68a5a"; x.lineWidth = 8; x.strokeRect(6, 6, w - 12, h - 12); x.fillStyle = "#0b1220"; x.textAlign = "center"; x.textBaseline = "middle"; x.font = CAV(96); x.fillText("RACIÓN 15 kg", w / 2, 88); x.font = CAV(110); x.fillText("$ 3.900", w / 2, 190); });
  const cc = plano(0.5, 0.25, ct, 0, 0.94, 0.27); TORRE.add(cc);
  sombras(TORRE);
}
fusionar(TORRE);
// el estante "ENVÍOS DE HOY" (parte 2), en el lugar de la torre: navy, dos niveles, cinco bolsas con nombre
const ENVIOS = new THREE.Group(); ENVIOS.position.copy(TORRE_P); scene.add(ENVIOS);
{
  ENVIOS.add(caja(1.3, 0.04, 0.5, M.navy3, 0, 0.1, 0, 0.01)); ENVIOS.add(caja(1.3, 0.04, 0.5, M.navy3, 0, 0.82, 0, 0.01));
  for (const x of [-0.64, 0.64]) ENVIOS.add(caja(0.04, 1.62, 0.5, M.navy3, x, 0.81, 0, 0.01));
  ENVIOS.add(caja(1.3, 0.04, 0.5, M.navy3, 0, 1.6, 0, 0.01));
  const nom = ["LUNA", "TOTO", "COCO", "MORA", "SIMÓN"];
  nom.forEach((n, i) => { const b = crearBolsa15({ tipo: "vete", nombre: n, esc: 0.98 }); b.position.set(i < 3 ? -0.42 + i * 0.42 : -0.21 + (i - 3) * 0.42, i < 3 ? 0.12 : 0.84, 0.02); ENVIOS.add(b); });
  const et = lienzo(700, 130, (x, w, h) => { x.fillStyle = "#5ce611"; x.fillRect(0, 0, w, h); x.fillStyle = "#0b1220"; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "ENVÍOS DE HOY", 900, 86, w - 40); x.fillText("ENVÍOS DE HOY", w / 2, h / 2 + 4); });
  ENVIOS.add(caja(1.24, 0.24, 0.03, M.navy, 0, 1.74, 0.23, 0.01)); ENVIOS.add(plano(1.18, 0.2, et, 0, 1.74, 0.247));
  sombras(ENVIOS);
}
// el talonario de recetas de Inés (en el mostrador) y la lapicera
const TALON_P = V3(VX - 0.1, MOS.alto + 0.006, MOS.z + 0.05);
function dibujarReceta(x, W, H, k) {
  x.fillStyle = "#f7f5ec"; x.fillRect(0, 0, W, H);
  x.fillStyle = "#16243d"; x.fillRect(0, 0, W, 120); x.fillStyle = "#efeee5"; x.textAlign = "left"; x.textBaseline = "middle"; ajustar(x, "VETERINARIA INÉS", 900, 60, W - 150); x.fillText("VETERINARIA INÉS", 120, 62);
  const hx = 62, hy = 66; x.beginPath(); x.ellipse(hx, hy + 12, 22, 18, 0, 0, 7); x.fill(); for (const [dx, dy] of [[-24, -14], [-8, -28], [8, -28], [24, -14]]) { x.beginPath(); x.ellipse(hx + dx, hy + dy, 8, 10, 0, 0, 7); x.fill(); }
  x.fillStyle = "#5ce611"; x.fillRect(0, 120, W, 10);
  x.fillStyle = "#16243d"; x.font = F(700, 36); x.fillText("Receta", 34, 178);
  x.strokeStyle = "#cfd8e3"; x.lineWidth = 3; for (let y = 300; y < H - 20; y += 110) { x.beginPath(); x.moveTo(30, y); x.lineTo(W - 30, y); x.stroke(); }
  if (k > 0) {
    x.save(); const L1 = "Ración adulto", L2 = "mediano", L3 = "bolsa 15 kg";
    const total = 3, u = k * total;
    x.fillStyle = "#0b1220"; x.font = CAV(104); x.textBaseline = "alphabetic";
    [[L1, 285], [L2, 395], [L3, 505]].forEach(([l, y], i) => { const v = cl(u - i); if (v <= 0) return; x.save(); x.beginPath(); x.rect(0, y - 110, 30 + (W - 30) * v, 140); x.clip(); x.fillText(l, 40, y); x.restore(); });
    x.restore();
  }
}
const recetaT = lienzo(600, 600, (x, w, h) => dibujarReceta(x, w, h, 0));
const TALON = new THREE.Group(); TALON.position.copy(TALON_P); scene.add(TALON);
{ TALON.add(caja(0.17, 0.014, 0.17, M.cr2, 0, 0.007, 0, 0.004)); const hoja = mesh(new THREE.PlaneGeometry(0.165, 0.165), new THREE.MeshStandardMaterial({ map: recetaT, roughness: 0.85 }), 0, 0.0145, 0); hoja.rotation.x = -Math.PI / 2; TALON.add(hoja); TALON.userData.hoja = hoja; sombras(TALON); }
let recetaK = -1;
function ponerReceta(k) { k = Math.round(k * 24) / 24; if (k === recetaK) return; recetaK = k; dibujarReceta(recetaT.userData.x, 600, 600, k); recetaT.needsUpdate = true; }
const LAPICERA = new THREE.Group(); { const c = mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.14, 10), M.navy, 0, 0, 0); LAPICERA.add(c); LAPICERA.add(mesh(new THREE.ConeGeometry(0.006, 0.02, 10), M.cr3, 0, -0.08, 0)); LAPICERA.add(caja(0.004, 0.04, 0.008, M.g, 0.006, 0.04, 0, 0.002)); scene.add(sombras(LAPICERA)); }

// ---- LA PUERTA DE VERO (x = PX): pared navy2 con la puerta navy2 (marco crema), afuera la tarde crema ----
const PUE = new THREE.Group(); PUE.position.x = PX; scene.add(PUE);
const PZ = -1.0, PDX = 0.0;
{
  const piso = mesh(new THREE.PlaneGeometry(6, 5), new THREE.MeshStandardMaterial({ map: damero, roughness: 0.85 }), 0, 0, 1.4); piso.rotation.x = -Math.PI / 2; piso.castShadow = false; PUE.add(piso);
  PUE.add(mesh(new THREE.BoxGeometry(2.2, 2.8, 0.14), M.pared2, -1.6, 1.4, PZ)); PUE.add(mesh(new THREE.BoxGeometry(2.2, 2.8, 0.14), M.pared2, 1.6, 1.4, PZ)); PUE.add(mesh(new THREE.BoxGeometry(1.0, 0.6, 0.14), M.pared2, 0, 2.5, PZ));
  for (const x of [-0.53, 0.53]) PUE.add(caja(0.08, 2.24, 0.18, M.cr, x, 1.12, PZ, 0.01)); PUE.add(caja(1.14, 0.08, 0.18, M.cr, 0, 2.24, PZ, 0.01));
  // afuera: la vereda crema y la tarde (planos lisos)
  const af = mesh(new THREE.PlaneGeometry(6, 3), new THREE.MeshBasicMaterial({ color: 0xe9dcc0 }), 0, 1.5, PZ - 2.2); af.castShadow = false; PUE.add(af);
  const ve = mesh(new THREE.PlaneGeometry(6, 2.2), M.cr2, 0, 0.001, PZ - 1.1); ve.rotation.x = -Math.PI / 2; ve.castShadow = false; PUE.add(ve);
  const fe = mesh(new THREE.PlaneGeometry(0.9, 0.5), M.cr, 0, 0.003, PZ + 0.4); fe.rotation.x = -Math.PI / 2; PUE.add(fe);
  // un cuadro con una huellita y el perchero
  PUE.add(caja(0.5, 0.6, 0.03, M.cr, -1.3, 1.6, PZ + 0.09, 0.01)); PUE.add(caja(0.4, 0.5, 0.01, M.gaz, -1.3, 1.6, PZ + 0.11, 0.006));
  sombras(PUE);
}
fusionar(PUE);
const PHOJA = new THREE.Group(); PHOJA.position.set(PX + 0.49, 0, PZ + 0.05); scene.add(PHOJA);
{ PHOJA.add(caja(0.96, 2.16, 0.05, M.navy3, -0.48, 1.08, 0, 0.01)); PHOJA.add(caja(0.86, 0.04, 0.06, M.cr, -0.48, 1.6, 0.0, 0.01)); PHOJA.add(mesh(new THREE.SphereGeometry(0.03, 12, 10), M.g, -0.86, 1.05, 0.05)); sombras(PHOJA); }
