
// =====================================================================================================
// LOS PERSONAJES
// =====================================================================================================
const ruben = crearPersonaje({ ...ELENCO.ruben, dedos: true, parpadeoCada: 999, parpadeosExtra: [r2(T.p3 - 0.5), r2(T.p5 + 0.3), r2(T.q4 + 0.4)] });
const patricia = crearPersonaje({ ...ELENCO.patricia, dedos: true, parpadeoCada: 999, parpadeosExtra: [r2(T.p2 + 0.6), r2(T.p6 + 0.5), r2(T.q4p6 + 0.6)] });
const graciela = crearPersonaje({ ...ELENCO.clienta, delantal: C.cr, delantalBorde: C.navy3, dedos: true, parpadeoCada: 999, parpadeosExtra: [r2(T.p4 + 0.4), r2(T.q2 - 1.2)] });
const nico = crearPersonaje({ ...ELENCO.empleado, dedos: true, parpadeoCada: 999 });
const cliente = crearPersonaje({ ...DEFECTO, nombre: "Cliente", piel: PIEL.clara, pelo: PELO.gris, peinado: "corto", camisa: 0x9fb3c9, mangas: "largas", pantalon: C.navy2, parpadeoCada: 999 });
// el pelo de Rubén: la herradura de bolitas canosas (de dist-pedidos-lunes / dist-cliente-grande)
{
  const corona = ruben.cabeza.children.find((o) => o.isMesh && o.geometry.type === "SphereGeometry" && Math.abs((o.geometry.parameters.phiLength || 0) - Math.PI * 1.14) < 1e-3);
  if (corona) {
    corona.visible = false;
    const pm = mat(PELO.canoso, 0.85), pm2 = mat(0xa9a6a0, 0.85);
    const R0 = 0.3, CC0 = R0 * 0.92;
    semilla = 21;
    const bola = new THREE.SphereGeometry(1, 16, 12);
    const fila = (n, a0, a1, e0, eK, s0, sK, h) => {
      for (let i = 0; i < n; i++) {
        const u = (i + 0.5) / n, w = Math.sin(Math.PI * u);
        const a2 = lerp(a0, a1, u) + (az() - 0.5) * 0.07, e2 = e0 + eK * w + (az() - 0.5) * 0.09;
        const sz = s0 + sK * w + 0.008 * az(), k = 0.975;
        const x = R0 * k * Math.sin(a2) * Math.cos(e2), y = CC0 + R0 * 0.97 * k * Math.sin(e2), z = R0 * 0.95 * k * Math.cos(a2) * Math.cos(e2);
        const m = mesh(bola, (i + n) % 4 ? pm : pm2, x, y, z); m.scale.set(sz, sz * h, sz); ruben.cabeza.add(m);
      }
    };
    fila(26, 1.5, Math.PI * 2 - 1.5, -0.1, 0.0, 0.02, 0.017, 1.3);
    fila(9, 2.4, Math.PI * 2 - 2.4, -0.25, -0.02, 0.019, 0.01, 1.15);
  }
}
// el bigote de Rubén se esconde cuando la cámara le ve la nuca (asomaba por los costados de la cabeza)
const BIGOTE_R = []; ruben.cabeza.traverse((o) => { if (o.isMesh && o.material.color && o.material.color.getHex() === PELO.gris) BIGOTE_R.push(o); });
function bigoteSegunCamara(cam = camera) {
  ruben.cabeza.updateMatrixWorld(true);
  const h = ruben.cabeza.getWorldPosition(new THREE.Vector3()), f = V3(0, 0, 1).transformDirection(ruben.cabeza.matrixWorld), c = cam.position.clone().sub(h);
  f.y = 0; c.y = 0; f.normalize(); c.normalize();
  for (const b of BIGOTE_R) b.visible = f.dot(c) > -0.2;
}
// la credencial de Patricia (tarjeta crema lisa, sin logo, con la cinta navy) colgada sobre la camisa
const credencial = new THREE.Group(); patricia.cuerpo.add(credencial);
{
  credencial.add(caja(0.075, 0.1, 0.006, M.cr, 0, 0, 0, 0.006));
  credencial.add(caja(0.05, 0.012, 0.007, M.navy3, 0, 0.032, 0.001, 0.002));
  const cinta = mesh(new THREE.TorusGeometry(0.12, 0.006, 6, 30, Math.PI * 0.8), M.navy, 0, 0.17, -0.06); cinta.rotation.set(0.35, 0, Math.PI * 1.1); credencial.add(cinta);
  credencial.position.set(0.0, 0.27, 0.3);
}
// el termo bajo el brazo de Rubén (izquierdo) y el mate en su mano izquierda; la lapicera de Patricia en su mano derecha
const termoR = crearTermo(); termoR.scale.setScalar(1.05); scene.add(termoR);
const mate = crearMate(); mate.scale.setScalar(1.1); scene.add(mate);
const lapicera = new THREE.Group(); lapicera.add(mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.14, 8), M.navy, 0, 0.0, 0)); lapicera.add(mesh(new THREE.ConeGeometry(0.006, 0.016, 8), M.cr2, 0, 0.078, 0)); scene.add(lapicera);
// los celulares: el de Rubén (navy, pantalla canvas: la planilla / la llamada) y el de Nico (el aviso)
const pantR = lienzo(600, 1215, () => {});
const pantN = lienzo(600, 1215, () => {});
function crearCel(tex, funda, W = 0.085, H = 0.172) {
  const g = new THREE.Group();
  g.add(caja(W + 0.008, H + 0.008, 0.014, mat(funda, 0.5), 0, 0, 0, 0.012));
  const p = new THREE.Mesh(new THREE.PlaneGeometry(W - 0.004, H - 0.006), new THREE.MeshBasicMaterial({ map: tex, toneMapped: false })); p.position.z = 0.0075; g.add(p);
  g.userData = { W, H };
  return sombras(g);
}
const celR = crearCel(pantR, C.navy3); scene.add(celR);
const celG = crearCel(pantG, C.g); celGsoporte.add(celG); celG.position.set(0, 0.105, 0.0); celG.rotation.x = -0.32;
const celN = crearCel(pantN, C.navy); scene.add(celN);
// el maletín de muestras de Nico (navy3, franja y manija verdes; el origen en la manija)
const maletin = (() => {
  const g = new THREE.Group();
  g.add(caja(0.42, 0.3, 0.1, M.navy3, 0, -0.2, 0, 0.03));
  g.add(caja(0.425, 0.04, 0.105, M.g, 0, -0.13, 0, 0.01));
  for (const s of [-1, 1]) g.add(caja(0.04, 0.03, 0.11, M.cr, s * 0.12, -0.08, 0, 0.008));
  g.add(mesh(new THREE.TorusGeometry(0.055, 0.014, 8, 18, Math.PI), M.g, 0, -0.05, 0));
  return sombras(g);
})();
scene.add(maletin);
// la mano suelta de los insertos: palma, pulgar estirado sobre la pantalla, la manga (navy3 = Rubén, crema = Graciela)
function crearManoInserto(piel, manga) {
  const g = new THREE.Group(), m = mat(piel, 0.55);
  const palma = mesh(new THREE.SphereGeometry(1, 18, 12), m, 0.035, -0.02, -0.03); palma.scale.set(0.045, 0.06, 0.026); g.add(palma);
  const pul = new THREE.Group(); g.add(pul); pul.position.set(0.02, -0.0, 0.0);
  const p1 = mesh(new THREE.CapsuleGeometry(0.0105, 0.05, 4, 10), m, 0, 0.035, 0); pul.add(p1);
  const yema = mesh(new THREE.SphereGeometry(1, 10, 8), mat(0xf0d2bf, 0.4), 0, 0.062, 0.006); yema.scale.set(0.007, 0.009, 0.003); pul.add(yema);
  const mg = mesh(new THREE.CylinderGeometry(0.05, 0.055, 0.22, 16), mat(manga, 0.6), 0.05, -0.12, -0.035); mg.rotation.z = 0.25; g.add(mg);
  g.traverse((o) => { if (o.isMesh) { o.castShadow = false; o.receiveShadow = false; } });
  g.userData.pulgar = pul;
  return g;
}
const manoR = crearManoInserto(ELENCO.ruben.piel, C.navy3); scene.add(manoR);
const manoG = crearManoInserto(ELENCO.clienta.piel, C.g); scene.add(manoG);
const TODOS = [ruben, patricia, graciela, nico, cliente];
for (const p of TODOS) { scene.add(p.raiz); p.raiz.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } }); }

// ---- avatares: la cara del personaje 3D renderizada chica en un círculo (el panel) ----
const AVATAR = {};
{
  const rt = new THREE.WebGLRenderTarget(256, 256); rt.texture.colorSpace = THREE.SRGBColorSpace;
  const esc = new THREE.Scene();
  esc.add(new THREE.HemisphereLight(0xffffff, 0x8a8a8a, 2.2)); const dl = new THREE.DirectionalLight(0xffffff, 1.6); dl.position.set(1, 2, 3); esc.add(dl);
  const cam = new THREE.PerspectiveCamera(30, 1, 0.05, 20);
  const leer = (per, fondo) => {
    esc.background = new THREE.Color(fondo);
    const padre = per.raiz.parent; esc.add(per.raiz);
    per.poner({ x: 0, y: 0, z: 0, giro: 0, ...CARA.sonrisa, ...BRAZOS.costado, t: 0 });
    per.raiz.updateMatrixWorld(true);
    const c = per.cabeza.localToWorld(V3(0, 0.25, 0));
    cam.position.set(c.x + 0.12, c.y + 0.04, c.z + 1.6); cam.lookAt(c.x, c.y - 0.03, c.z);
    if (per.ojoLejano) per.ojoLejano(cam.position);
    renderer.setRenderTarget(rt); renderer.render(esc, cam); renderer.setRenderTarget(null);
    const px = new Uint8Array(256 * 256 * 4); renderer.readRenderTargetPixels(rt, 0, 0, 256, 256, px);
    const cv = document.createElement("canvas"); cv.width = cv.height = 256; const x = cv.getContext("2d");
    const id = x.createImageData(256, 256);
    for (let y = 0; y < 256; y++) id.data.set(px.subarray((255 - y) * 1024, (256 - y) * 1024), y * 1024);
    x.putImageData(id, 0, 0);
    if (padre) padre.add(per.raiz); else esc.remove(per.raiz);
    return cv;
  };
  AVATAR.graciela = leer(graciela, 0xefeee5);
  AVATAR.hector = leer(crearPersonaje({ ...ELENCO.hector, chaleco: null, parpadeoCada: 999 }), 0xb9cde0);
  AVATAR.walter = leer(crearPersonaje({ ...ELENCO.walter, parpadeoCada: 999 }), 0xefeee5);
  AVATAR.marta = leer(crearPersonaje({ ...ELENCO.duena, parpadeoCada: 999 }), 0xb9cde0);
  AVATAR.nelly = leer(crearPersonaje({ ...DEFECTO, nombre: "Nelly", piel: PIEL.media, pelo: PELO.rubio, peinado: "rodete", camisa: C.cr, mangas: "largas", labios: 0xb5555a, aros: C.g, parpadeoCada: 999 }), 0xefeee5);
  AVATAR.beto = leer(crearPersonaje({ ...DEFECTO, nombre: "Beto", piel: PIEL.clara, pelo: PELO.castaño, peinado: "corto", bigote: PELO.castaño, camisa: C.navy3, mangas: "cortas", parpadeoCada: 999 }), 0x5ce611);
  rt.dispose();
}
function avatar(x, cv, cx, cy, r) {
  x.save(); x.beginPath(); x.arc(cx, cy, r, 0, 7); x.closePath(); x.clip(); x.drawImage(cv, cx - r, cy - r, 2 * r, 2 * r); x.restore();
  x.strokeStyle = "#0b1220"; x.lineWidth = Math.max(4, r * 0.1); x.beginPath(); x.arc(cx, cy, r, 0, 7); x.stroke();
}
function parlante() {}
const tilde = (x, cx, cy, s, color = "#0b1220", lw = null) => { x.strokeStyle = color; x.lineWidth = lw ?? s * 0.28; x.lineCap = "round"; x.lineJoin = "round"; x.beginPath(); x.moveTo(cx - s * 0.5, cy); x.lineTo(cx - s * 0.12, cy + s * 0.38); x.lineTo(cx + s * 0.55, cy - s * 0.42); x.stroke(); };
// una caja kraft dibujada (el avatar de la distribuidora en el chat)
function cajita(x, cx, cy, r) {
  x.fillStyle = "#efeee5"; x.beginPath(); x.arc(cx, cy, r, 0, 7); x.fill();
  x.fillStyle = "#c9a46b"; x.fillRect(cx - r * 0.55, cy - r * 0.35, r * 1.1, r * 0.85); x.fillStyle = "#b8935a"; x.fillRect(cx - r * 0.55, cy - r * 0.35, r * 1.1, r * 0.18);
  x.fillStyle = "#16243d"; x.fillRect(cx - r * 0.1, cy - r * 0.35, r * 0.2, r * 0.85);
  x.strokeStyle = "#0b1220"; x.lineWidth = r * 0.1; x.beginPath(); x.arc(cx, cy, r, 0, 7); x.stroke();
}

// ================= PANTALLAS =================
const fmt = (n) => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
// ---- el celular de Rubén: la planilla de cuentas corrientes (P3) y la llamada (P4, Q4) ----
const FILAS = (() => {
  const nombres = ["Almacén Tito", "Bar Walter", "Súper Héctor", "Kiosco Beto", "Cafetería Marta", "Panadería Nelly", "Autoserv. Lola", "Pizzería Dante", "Rotisería Fede", "Bar El Puerto", "Minimercado Sol", "Carnicería Rulo"];
  const out = []; semilla = 33;
  for (let i = 0; i < 46; i++) out.push([nombres[i % nombres.length], `0${300 + i * 3}`, `${[15, 30, 30, 15, 30][i % 5]}`, `${8 + Math.floor(az() * 40)}`, `${fmt(12000 + Math.floor(az() * 60) * 1000)}`]);
  out.push(["Rotisería Graciela", "0431", "30", "94", "186.000", 1]);
  for (let i = 0; i < 4; i++) out.push([nombres[(i + 5) % nombres.length], `0${440 + i}`, "30", `${12 + i * 7}`, fmt(22000 + i * 9000)]);
  return out;
})();
const FILA_G = 46, FH = 92, Y0 = 300;
let claveR = "";
function dibujarCelR(t) {
  const enQ4 = t >= P2;
  let modo = "plan";
  if (!enQ4 && t >= T.p4) modo = t < T.r2 - 0.05 ? "llama" : "habla";
  if (enQ4) modo = "habla";
  // el desplazamiento de la planilla (función del tiempo): baja rápido y frena en Graciela
  const u = eo(sg(t, T.p3 - 0.05, T.frena));
  const filaArriba = lerp(0, FILA_G - 4, u);
  const toq = modo === "plan" && t >= T.llamar - 0.12 ? 1 : 0;
  const seg = modo === "habla" ? Math.floor(t - (enQ4 ? T.q4s : T.r2)) : 0;
  const clave = `${modo}|${Math.round(filaArriba * 20)}|${toq}|${seg}|${t >= T.frena ? 1 : 0}`; if (clave === claveR) return; claveR = clave;
  const { x } = pantR.userData, w = 600, h = 1215;
  x.textBaseline = "middle"; x.textAlign = "left";
  if (modo === "plan") {
    x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h);
    x.save(); x.beginPath(); x.rect(0, Y0, w, h - Y0 - 150); x.clip();
    const k0 = Math.floor(filaArriba), fr = filaArriba - k0;
    for (let i = -1; i < 11; i++) {
      const k = k0 + i; if (k < 0 || k >= FILAS.length) continue;
      const [n, , , dias, saldo, esG] = FILAS[k], y = Y0 + (i - fr) * FH;
      x.fillStyle = esG ? "#f6e3e0" : k % 2 ? "#e2e0d4" : "#f7f6f0"; x.fillRect(0, y, w, FH);
      if (esG && t >= T.frena) { x.strokeStyle = "#c7655b"; x.lineWidth = 8; x.strokeRect(4, y + 4, w - 8, FH - 8); }
      x.fillStyle = "#0b1220"; x.font = F(esG ? 900 : 700, 38); x.fillText(n, 18, y + FH / 2);
      x.textAlign = "right"; x.fillStyle = esG ? "#c7655b" : "#1f3254"; x.font = F(900, 38); x.fillText(dias, 420, y + FH / 2); x.fillText(saldo, w - 16, y + FH / 2); x.textAlign = "left";
    }
    x.restore();
    x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 190); x.fillStyle = "#efeee5"; ajustar(x, "Cuentas corrientes", 800, 52, w - 60); x.fillText("Cuentas corrientes", 26, 70);
    x.fillStyle = "#5ce611"; x.font = F(700, 36); x.fillText("Te deben: $ 1.012.000", 26, 140);
    x.fillStyle = "#1f3254"; x.fillRect(0, 190, w, Y0 - 190); x.fillStyle = "#efeee5"; x.font = F(800, 34); x.fillText("Cliente", 18, 245); x.textAlign = "right"; x.fillText("Días", 420, 245); x.fillText("Saldo", w - 16, 245); x.textAlign = "left";
    // abajo: el contador de filas o el botón Llamar
    x.fillStyle = "#16243d"; x.fillRect(0, h - 150, w, 150);
    if (t < T.frena) { x.fillStyle = "#efeee5"; x.font = F(800, 46); x.textAlign = "center"; x.fillText(`fila ${Math.round(filaArriba) + 1} de 312`, w / 2, h - 75); }
    else { x.fillStyle = toq ? "#3fa60a" : "#5ce611"; x.beginPath(); x.roundRect(40, h - 130, w - 80, 110, 55); x.fill(); x.fillStyle = "#0b1220"; x.font = F(900, 58); x.textAlign = "center"; x.fillText("Llamar", w / 2, h - 73); }
    x.textAlign = "left";
  } else {
    x.fillStyle = "#16243d"; x.fillRect(0, 0, w, h);
    avatar(x, AVATAR.graciela, w / 2, 400, 170);
    x.fillStyle = "#efeee5"; x.textAlign = "center"; ajustar(x, "Rotisería Graciela", 900, 66, w - 60); x.fillText("Rotisería Graciela", w / 2, 680);
    x.fillStyle = "#5ce611"; x.font = F(800, 60); x.fillText(modo === "llama" ? "Llamando…" : `0:0${Math.min(9, Math.max(0, seg))}`, w / 2, 780);
    x.fillStyle = "#c7655b"; x.beginPath(); x.arc(w / 2, 1030, 84, 0, 7); x.fill();
    x.strokeStyle = "#efeee5"; x.lineWidth = 20; x.lineCap = "round"; x.beginPath(); x.arc(w / 2, 1052, 46, Math.PI * 1.15, Math.PI * 1.85); x.stroke();
  }
  pantR.needsUpdate = true;
}
// ---- el celular de Graciela: en llamada (P4, Q4) · el recordatorio (Q1) · Pagado ✓ ----
let claveG = "";
function dibujarCelG(t) {
  let modo = "llamada";
  if (t >= P2 && t < T.q4) modo = t < T.llega ? "inicio" : t < T.pagado ? "recordatorio" : "pagado";
  const toq = modo === "recordatorio" && t >= T.pagar - 0.12 ? 1 : 0;
  const subr = modo === "recordatorio" ? cl(sg(t, T.llega + 0.35, T.llega + 0.75)) : 0;
  const clave = `${modo}|${toq}|${Math.round(subr * 10)}`; if (clave === claveG) return; claveG = clave;
  const { x } = pantG.userData, w = 600, h = 1215;
  x.textBaseline = "middle"; x.textAlign = "left";
  const cab = () => { x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 170); cajita(x, 80, 92, 52); x.fillStyle = "#efeee5"; ajustar(x, "Distribuidora Rubén", 800, 46, w - 170); x.fillText("Distribuidora Rubén", 150, 72); x.fillStyle = "#5ce611"; x.font = F(700, 32); x.fillText("en línea", 150, 124); };
  if (modo === "llamada") {
    x.fillStyle = "#16243d"; x.fillRect(0, 0, w, h); cajita(x, w / 2, 400, 170);
    x.fillStyle = "#efeee5"; x.textAlign = "center"; ajustar(x, "Distribuidora Rubén", 900, 62, w - 60); x.fillText("Distribuidora Rubén", w / 2, 680);
    x.fillStyle = "#5ce611"; x.font = F(800, 58); x.fillText("En llamada", w / 2, 780);
  } else if (modo === "inicio") {
    x.fillStyle = "#e9e6d8"; x.fillRect(0, 0, w, h); cab();
  } else if (modo === "recordatorio") {
    x.fillStyle = "#e9e6d8"; x.fillRect(0, 0, w, h); cab();
    // la burbuja recibida (crema) con el mensaje, el botón Pagar, la transferencia y el estado de cuenta
    x.fillStyle = "#ffffff"; x.beginPath(); x.roundRect(22, 200, w - 44, 960, 34); x.fill();
    const L = [["Hola, Graciela.", 46, "#0b1220", 800], ["Tu factura 0517", 46, "#0b1220", 800], ["vence hoy:", 46, "#0b1220", 800], ["$ 48.600", 84, "#0b1220", 900]];
    let y = 270; for (const [s, p, c, wg] of L) { x.fillStyle = c; x.font = F(wg, p); x.fillText(s, 52, y); y += p * 1.32; }
    y += 14; x.fillStyle = "#0b1220"; x.font = F(900, 52); x.fillText("Por favor,", 52, y);
    const anchoPF = x.measureText("Por favor").width;
    if (subr > 0) { x.strokeStyle = "#5ce611"; x.lineWidth = 12; x.lineCap = "round"; x.beginPath(); x.moveTo(50, y + 36); x.quadraticCurveTo(50 + anchoPF * 0.5 * subr, y + 46, 50 + anchoPF * subr, y + 34); x.stroke(); }
    y += 66; x.font = F(800, 46); x.fillText("podés pagarla acá:", 52, y);
    y += 100; x.fillStyle = toq ? "#3fa60a" : "#5ce611"; x.beginPath(); x.roundRect(52, y - 62, w - 104, 124, 62); x.fill(); if (toq) { x.strokeStyle = "#0b1220"; x.lineWidth = 8; x.stroke(); }
    x.fillStyle = "#0b1220"; x.font = F(900, 70); x.textAlign = "center"; x.fillText("Pagar", w / 2, y + 2); x.textAlign = "left";
    y += 120; x.fillStyle = "#1f3254"; x.font = F(700, 36); x.fillText("o por transferencia:", 52, y); y += 48; x.fillText("Cuenta 00-123456", 52, y);
    y += 74; x.fillStyle = "#3fa60a"; x.font = F(800, 40); x.fillText("▤  Ver estado de cuenta", 52, y);
  } else {
    x.fillStyle = "#e9e6d8"; x.fillRect(0, 0, w, h); cab();
    x.fillStyle = "#5ce611"; x.beginPath(); x.roundRect(22, 220, w - 44, 900, 36); x.fill();
    x.fillStyle = "#0b1220"; x.beginPath(); x.arc(w / 2, 430, 130, 0, 7); x.fill(); tilde(x, w / 2, 435, 150, "#5ce611");
    x.textAlign = "center"; x.fillStyle = "#0b1220"; x.font = F(900, 104); x.fillText("Pagado", w / 2, 680);
    x.font = F(800, 52); x.fillText("Factura 0517", w / 2, 800); x.font = F(900, 80); x.fillText("$ 48.600", w / 2, 920);
  }
  pantG.needsUpdate = true;
}
// ---- el celular de Nico (Q3): el aviso "Visitar hoy" ----
let claveN = "";
function dibujarCelN(t) {
  if (claveN) return; claveN = "1";
  const { x } = pantN.userData, w = 600, h = 1215;
  x.textBaseline = "middle"; x.textAlign = "left";
  x.fillStyle = "#0b1220"; x.fillRect(0, 0, w, h);
  x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 170); x.fillStyle = "#5ce611"; x.fillRect(0, 170, w, 8);
  x.fillStyle = "#efeee5"; ajustar(x, "Distribuidora Rubén", 800, 46, w - 60); x.fillText("Distribuidora Rubén", 30, 62); x.fillStyle = "#5ce611"; x.font = F(700, 36); x.fillText("Cobranza · Nico", 30, 124);
  x.fillStyle = "#efeee5"; x.beginPath(); x.roundRect(22, 210, w - 44, 960, 36); x.fill();
  x.fillStyle = "#5ce611"; x.beginPath(); x.roundRect(52, 250, 330, 76, 38); x.fill(); x.fillStyle = "#0b1220"; x.font = F(900, 46); x.fillText("Visitar hoy", 76, 290);
  avatar(x, AVATAR.beto, 120, 450, 74);
  x.fillStyle = "#0b1220"; x.font = F(900, 62); x.fillText("Kiosco", 220, 420); x.fillText("Beto", 220, 490);
  x.fillStyle = "#c7655b"; x.font = F(800, 46); x.fillText("vencida hace", 52, 640); x.font = F(900, 66); x.fillText("12 días", 52, 715);
  x.fillStyle = "#0b1220"; x.font = F(900, 92); x.fillText("$ 22.400", 52, 840);
  x.fillStyle = "#16243d"; x.beginPath(); x.roundRect(52, 960, w - 104, 120, 60); x.fill(); x.fillStyle = "#efeee5"; x.font = F(900, 58); x.textAlign = "center"; x.fillText("Ver ruta", w / 2, 1022);
  pantN.needsUpdate = true;
}
// ---- el panel de Rubén (Q2): Cuentas por cobrar ----
const PAGOS = [[AVATAR.graciela, "Rotisería Graciela", "$ 48.600"], [AVATAR.hector, "Súper Héctor", "$ 312.000"], [AVATAR.marta, "Cafetería Marta", "$ 205.400"], [AVATAR.nelly, "Panadería Nelly", "$ 161.000"], [AVATAR.walter, "Bar Walter", "$ 188.600"]];
const VENCIDO = [1012000, 963400, 651400, 446000, 285000, 96400];
let claveP = "";
function dibujarPanel(t) {
  const n = T.fila.filter((a) => t >= a).length, q = t >= T.quien ? 1 : 0;
  const k = n ? sg(t, T.fila[n - 1], T.fila[n - 1] + 0.25) : 0;
  const v = n ? lerp(VENCIDO[n - 1], VENCIDO[n], eo(k)) : VENCIDO[0];
  const clave = `${n}|${q}|${Math.round(v / 1000)}`; if (clave === claveP) return; claveP = clave;
  const { x } = pantP.userData, w = 1280, h = 1000;
  x.textBaseline = "middle"; x.textAlign = "left";
  x.fillStyle = "#0b1220"; x.fillRect(0, 0, w, h);
  x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 120); x.fillStyle = "#5ce611"; x.fillRect(0, 120, w, 10);
  x.fillStyle = "#efeee5"; x.font = F(800, 64); x.fillText("Cuentas por cobrar", 40, 64);
  // el contador grande
  const fin = n >= 5 && k >= 1;
  x.fillStyle = "#efeee5"; x.font = F(800, 54); x.fillText("Vencido:", 40, 200);
  x.fillStyle = fin ? "#5ce611" : "#c7655b"; x.font = F(900, 104); x.fillText(`$ ${fmt(v)}`, 290, 204);
  if (!q) {
    PAGOS.forEach(([cv, nom, m], i) => {
      const y = 280 + i * 140, ok = i < n;
      x.fillStyle = ok ? "#efeee5" : "#1f3254"; x.beginPath(); x.roundRect(30, y, w - 60, 124, 26); x.fill();
      avatar(x, cv, 98, y + 62, 46);
      x.fillStyle = ok ? "#0b1220" : "#b9cde0"; x.font = F(800, 52); x.fillText(nom, 162, y + 62);
      x.fillStyle = ok ? "#5ce611" : "#2c4268"; x.beginPath(); x.roundRect(820, y + 22, 420, 80, 40); x.fill();
      x.fillStyle = ok ? "#0b1220" : "#6d7a90"; x.font = F(900, 52); x.textAlign = "center"; x.fillText(ok ? "Pagado ✓" : m, 1030, y + 63); x.textAlign = "left";
    });
  } else {
    x.fillStyle = "#5ce611"; x.font = F(900, 66); x.fillText("Quién y desde cuándo", 40, 330);
    const L = [[AVATAR.beto, "Kiosco Beto", "12 días · $ 22.400", "Visitar hoy → Nico", "#c7655b"], [AVATAR.walter, "Bar Walter", "5 días · $ 31.000", "Recordatorio enviado ✓", "#5ce611"], [AVATAR.hector, "Súper Héctor", "3 días · $ 43.000", "Recordatorio enviado ✓", "#5ce611"]];
    L.forEach(([cv, nom, d, acc, col], i) => {
      const y = 400 + i * 196;
      x.fillStyle = "#efeee5"; x.beginPath(); x.roundRect(30, y, w - 60, 176, 26); x.fill();
      avatar(x, cv, 100, y + 88, 56);
      x.fillStyle = "#0b1220"; x.font = F(900, 54); x.fillText(nom, 180, y + 52); x.fillStyle = "#1f3254"; x.font = F(800, 46); x.fillText(d, 180, y + 122);
      x.fillStyle = i === 0 ? "#c7655b" : "#16243d"; x.beginPath(); x.roundRect(690, y + 44, 560, 88, 44); x.fill();
      x.fillStyle = i === 0 ? "#0b1220" : "#5ce611"; ajustar(x, acc, 900, 44, 520); x.textAlign = "center"; x.fillText(acc, 970, y + 90); x.textAlign = "left";
    });
  }
  pantP.needsUpdate = true;
}
