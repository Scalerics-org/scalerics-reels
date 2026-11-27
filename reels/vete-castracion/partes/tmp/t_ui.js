// =====================================================================================================
// LA INTERFAZ: los avisos en el celular de Vero (Ingresó, Despertando, Listo), el panel "Pacientes de hoy" (tablet), la
// pantallita del inalámbrico (P5) y la tablet en la mano de Bruno (cámara)
// =====================================================================================================
const NAV = "#0b1220", NAV2 = "#16243d", NAV3 = "#1f3254", CRM = "#efeee5", CR2 = "#d9d7c9", VRD = "#5ce611", VERD = "#3fa60a", ROJ = "#c7655b";
// el avatar de la veterinaria: círculo verde con la huellita navy
const AV_VET = (() => { const c = document.createElement("canvas"); c.width = c.height = 256; const x = c.getContext("2d"); x.fillStyle = VRD; x.fillRect(0, 0, 256, 256); x.fillStyle = NAV; huella(x, 128, 128, 1.25); return c; })();
// el avatar de un paciente sin foto 3D (Pancho, Simón, Negro, Mora): la cabeza de perro plana en su color
const avPerro = (fondo, color, oreja) => { const c = document.createElement("canvas"); c.width = c.height = 256; const x = c.getContext("2d"); x.fillStyle = fondo; x.fillRect(0, 0, 256, 256); x.fillStyle = oreja; x.beginPath(); x.ellipse(70, 110, 34, 64, 0.3, 0, 7); x.fill(); x.beginPath(); x.ellipse(186, 110, 34, 64, -0.3, 0, 7); x.fill(); x.fillStyle = color; x.beginPath(); x.ellipse(128, 136, 80, 76, 0, 0, 7); x.fill(); x.fillStyle = "#efe6d6"; x.beginPath(); x.ellipse(128, 176, 46, 34, 0, 0, 7); x.fill(); x.fillStyle = NAV; x.beginPath(); x.ellipse(128, 160, 16, 11, 0, 0, 7); x.fill(); for (const s of [-1, 1]) { x.beginPath(); x.arc(128 + s * 32, 120, 9, 0, 7); x.fill(); } return c; };
AVATAR.pancho = avPerro("#cfeebc", "#2a2624", "#1a1716"); AVATAR.simon = avPerro("#d9d7c9", "#c8894a", "#9a6232"); AVATAR.negro = avPerro("#cfeebc", "#3a3532", "#1a1716"); AVATAR.mora = avPerro("#d9d7c9", "#8d8c8c", "#5d5c5c");
// la foto dentro de un recuadro redondeado con borde navy
function foto(x, cv, X, Y, W, H, R = 22) { x.save(); x.beginPath(); x.roundRect(X, Y, W, H, R); x.clip(); const k = Math.max(W / cv.width, H / cv.height); x.drawImage(cv, X + (W - cv.width * k) / 2, Y + (H - cv.height * k) / 2, cv.width * k, cv.height * k); x.restore(); x.strokeStyle = NAV; x.lineWidth = 6; x.beginPath(); x.roundRect(X, Y, W, H, R); x.stroke(); }
const okCirc = (x, cx, cy, r, fondo = VRD) => { x.fillStyle = fondo; x.beginPath(); x.arc(cx, cy, r, 0, 7); x.fill(); tilde(x, cx + 1, cy + 1, r, NAV); };
// el chat de la veterinaria en el celular de Vero. tipo: "ingreso" | "despierta" | "listo"; k: avance del video (0..1)
function dibujarAviso(x, W, H, tipo, k = 0) {
  x.fillStyle = CRM; x.fillRect(0, 0, W, H);
  cabecera(x, W, "Veterinaria Inés", "Avisos de Toto", AV_VET);
  const dia = tipo === "listo" ? "Hoy 17:00" : tipo === "despierta" ? "Hoy 15:30" : "Hoy 9:05";
  x.font = F(800, 40); const dw = x.measureText(dia).width + 60; x.fillStyle = CR2; rr(x, W / 2 - dw / 2, 222, dw, 64, 32); x.fillStyle = NAV2; x.textAlign = "center"; x.textBaseline = "middle"; x.fillText(dia, W / 2, 255);
  let y = 316;
  // la burbuja del aviso (blanca, borde navy)
  const bx = 24, bw = W - 48;
  const titulo = tipo === "ingreso" ? "Toto ingresó" : tipo === "despierta" ? "Toto está despertando" : "Toto está listo para retirar";
  x.font = F(900, 60); const lt = renglones(x, titulo, bw - 150);
  const fotoH = tipo === "listo" ? 0 : 420;
  const cuerpo = tipo === "ingreso" ? ["Lo opera la Dra. Inés.", "Te avisamos en cada paso."] : tipo === "despierta" ? ["Ya salió de la cirugía.", "Está tranquilo."] : [];
  x.font = F(700, 46); const lc = cuerpo.flatMap((l) => renglones(x, l, bw - 70));
  const ind = tipo === "listo" ? ["Collar puesto", "Reposo hoy", "Control: lunes 10:00"] : [];
  const bh = 30 + (fotoH ? fotoH + 26 : 0) + lt.length * 72 + (lc.length ? 14 + lc.length * 58 : 0) + (ind.length ? 30 + 62 + ind.length * 70 : 0) + 34;
  x.fillStyle = "#ffffff"; x.strokeStyle = NAV2; x.lineWidth = 6; x.beginPath(); x.roundRect(bx, y, bw, bh, [10, 34, 34, 34]); x.fill(); x.stroke();
  let yy = y + 28;
  if (fotoH) {
    const fx = bx + 26, fw = bw - 52;
    foto(x, tipo === "ingreso" ? FOTO.ingreso : FOTO.dormido, fx, yy, fw, fotoH);
    if (tipo === "despierta") {
      // el video: el ▶ (o la pausa) en el medio y la barra de avance abajo
      const cx = fx + fw / 2, cy = yy + fotoH / 2;
      x.fillStyle = "rgba(11,18,32,0.55)"; x.beginPath(); x.arc(cx, cy, 70, 0, 7); x.fill();
      x.fillStyle = CRM; if (k <= 0) { x.beginPath(); x.moveTo(cx - 22, cy - 34); x.lineTo(cx + 36, cy); x.lineTo(cx - 22, cy + 34); x.closePath(); x.fill(); } else { x.fillRect(cx - 26, cy - 32, 18, 64); x.fillRect(cx + 8, cy - 32, 18, 64); }
      x.fillStyle = "rgba(11,18,32,0.65)"; x.fillRect(fx + 20, yy + fotoH - 50, fw - 40, 14); x.fillStyle = VRD; x.fillRect(fx + 20, yy + fotoH - 50, (fw - 40) * k, 14);
      x.fillStyle = NAV; x.beginPath(); x.roundRect(fx + 20, yy + 20, 150, 54, 27); x.fill(); x.fillStyle = CRM; x.font = F(800, 36); x.textAlign = "center"; x.fillText("0:0" + Math.min(5, Math.floor(k * 5)), fx + 95, yy + 48);
    }
    yy += fotoH + 26;
  }
  x.textAlign = "left"; x.textBaseline = "middle";
  lt.forEach((l, i) => { x.fillStyle = NAV; x.font = F(900, 60); x.fillText(l, bx + 32, yy + 34 + i * 72); });
  okCirc(x, bx + bw - 66, yy + 34, 36);
  yy += lt.length * 72;
  if (lc.length) { yy += 14; x.fillStyle = NAV2; x.font = F(700, 46); lc.forEach((l, i) => x.fillText(l, bx + 32, yy + 28 + i * 58)); yy += lc.length * 58; }
  if (ind.length) {
    yy += 30; x.fillStyle = NAV2; x.font = F(800, 44); x.fillText("Indicaciones de la Dra. Inés:", bx + 32, yy + 30); yy += 62;
    ind.forEach((l, i) => { const cy = yy + 34 + i * 70; okCirc(x, bx + 62, cy, 26, "#cfeebc"); x.fillStyle = NAV; x.font = F(800, 50); x.fillText(l, bx + 104, cy + 2); });
  }
  // la hora del mensaje
  x.fillStyle = "#8f969f"; x.font = F(700, 34); x.textAlign = "right"; x.fillText(tipo === "listo" ? "17:00" : tipo === "despierta" ? "15:30" : "9:05", bx + bw - 24, y + bh - 24);
  // listo: arriba, el recorrido de las etapas ya hechas
  if (tipo === "listo") {
    y = y + bh + 30; x.fillStyle = "#cfeebc"; x.strokeStyle = VERD; x.lineWidth = 5; x.beginPath(); x.roundRect(bx, y, bw, 120, 30); x.fill(); x.stroke();
    x.fillStyle = NAV; x.textAlign = "center"; ajustar(x, "Ingresó ✓  En cirugía ✓  Despertando ✓", 800, 40, bw - 40); x.fillText("Ingresó ✓  En cirugía ✓  Despertando ✓", W / 2, y + 62);
  }
}
// el panel "Pacientes de hoy" (tablet). e = { toto, coco: etapa (0 Esperando, 1 Ingresó, 2 En cirugía, 3 Despertando, 4
// Listo), toque: fila tocada (-1 nada), aviso: texto del aviso enviado | "", llam: null | { gira 0..1 }, atendidas: 0/1 }
const ETAPAS = ["Esperando", "Ingresó", "En cirugía", "Despertando", "Listo"];
const ETAPA_C = [["#ffffff", "#8f969f", "#8f969f"], ["#ffffff", NAV2, NAV2], [NAV2, CRM, NAV2], ["#cfeebc", NAV, VERD], [VRD, NAV, NAV]];
const PAC = [["toto", "Toto", "Vero"], ["coco", "Coco", "Julio"], ["pancho", "Pancho", "Ana"], ["simon", "Simón", "Raúl"], ["negro", "Negro", "Laura"], ["mora", "Mora", "Pablo"]];
function dibujarPanel(x, W, H, e) {
  x.fillStyle = CRM; x.fillRect(0, 0, W, H); x.textBaseline = "middle";
  x.fillStyle = NAV2; x.fillRect(0, 0, W, 140); x.fillStyle = VRD; x.fillRect(0, 140, W, 10);
  x.fillStyle = CRM; x.textAlign = "left"; ajustar(x, "Pacientes de hoy · 6", 900, 66, W - 300); x.fillText("Pacientes de hoy · 6", 34, 74);
  x.textAlign = "right"; x.font = F(700, 44); x.fillText("Jueves", W - 34, 76);
  // la línea de etapas
  const et = ["Ingresó", "En cirugía", "Despertando", "Listo"];
  x.font = F(800, 38); let ex = 34; const ey = 200;
  et.forEach((t, i) => { const w = x.measureText(t).width + 40; const [f, tx, b] = ETAPA_C[i + 1]; x.fillStyle = f; x.strokeStyle = b; x.lineWidth = 4; x.beginPath(); x.roundRect(ex, ey - 32, w, 64, 32); x.fill(); x.stroke(); x.fillStyle = tx; x.textAlign = "center"; x.fillText(t, ex + w / 2, ey + 2); ex += w + (i < 3 ? 30 : 0); if (i < 3) { x.fillStyle = NAV3; x.beginPath(); x.moveTo(ex - 24, ey - 10); x.lineTo(ex - 10, ey); x.lineTo(ex - 24, ey + 10); x.fill(); } });
  const etapa = { toto: e.toto, coco: e.coco, pancho: e.coco >= 2 ? 2 : 1, simon: 1, negro: 0, mora: 0 };
  PAC.forEach(([k, n, d], i) => {
    const y = 262 + i * 112, h = 98, tocada = e.toque === i;
    x.fillStyle = tocada ? "#e3f5d6" : "#ffffff"; x.strokeStyle = tocada ? VERD : "#b4b2a3"; x.lineWidth = tocada ? 7 : 4; x.beginPath(); x.roundRect(24, y, W - 48, h, 22); x.fill(); x.stroke();
    avatar(x, AVATAR[k], 84, y + h / 2, 38);
    x.fillStyle = NAV; x.textAlign = "left"; x.font = F(900, 50); x.fillText(n, 140, y + h / 2 + 2); const nw = x.measureText(n).width;
    x.fillStyle = "#5a6070"; x.font = F(700, 38); x.fillText("· " + d, 140 + nw + 14, y + h / 2 + 3);
    const s = etapa[k], [f, tx, b] = ETAPA_C[s], txt = ETAPAS[s] + (s >= 1 && s !== 2 ? " ✓" : "");
    x.font = F(800, 40); const cw = x.measureText(txt).width + 46;
    x.fillStyle = f; x.strokeStyle = b; x.lineWidth = 4; x.beginPath(); x.roundRect(W - 48 - cw, y + 16, cw, h - 32, (h - 32) / 2); x.fill(); x.stroke();
    x.fillStyle = tx; x.textAlign = "center"; x.fillText(txt, W - 48 - cw / 2, y + h / 2 + 2);
    if (tocada) { x.fillStyle = "rgba(11,18,32,0.22)"; x.beginPath(); x.arc(W - 48 - cw / 2, y + h / 2, 46, 0, 7); x.fill(); }
  });
  let yb = 262 + 6 * 112 + 8;
  if (e.aviso) {
    x.fillStyle = NAV2; x.beginPath(); x.roundRect(24, yb, W - 48, 120, 30); x.fill();
    okCirc(x, 92, yb + 60, 38); x.fillStyle = CRM; x.textAlign = "left"; ajustar(x, e.aviso, 800, 52, W - 200); x.fillText(e.aviso, 150, yb + 62);
    yb += 140;
  }
  if (e.llam) {
    x.fillStyle = "#ffffff"; x.strokeStyle = NAV; x.lineWidth = 6; x.beginPath(); x.roundRect(24, yb, W - 48, 140, 26); x.fill(); x.stroke();
    x.fillStyle = NAV2; x.textAlign = "left"; ajustar(x, "Llamadas hoy", 800, 58, W * 0.55); x.fillText("Llamadas hoy", 60, yb + 72);
    const g = e.llam.gira, sx = Math.abs(Math.cos(g * Math.PI)), v = g < 0.5 ? "34" : "3", col = g < 0.5 ? ROJ : VERD;
    x.save(); x.translate(W - 140, yb + 72); x.scale(Math.max(0.05, sx), 1); x.fillStyle = col; x.textAlign = "center"; x.font = F(900, 104); x.fillText(v, 0, 4); x.restore();
    yb += 160;
  }
  if (e.atendidas) { x.fillStyle = VRD; x.strokeStyle = NAV; x.lineWidth = 6; x.beginPath(); x.roundRect(24, yb, W - 48, 120, 30); x.fill(); x.stroke(); x.fillStyle = NAV; x.textAlign = "left"; ajustar(x, "Consultas atendidas", 900, 58, W - 200); x.fillText("Consultas atendidas", 60, yb + 62); okCirc(x, W - 96, yb + 60, 38, CRM); }
}
// la tablet en la mano de Bruno: la cámara (la foto de Toto con el botón)
function dibujarCamara(x, W, H, cv, grabando) {
  x.fillStyle = NAV; x.fillRect(0, 0, W, H);
  const k = Math.max(W / cv.width, H / cv.height); x.drawImage(cv, (W - cv.width * k) / 2, (H - cv.height * k) / 2, cv.width * k, cv.height * k);
  x.strokeStyle = CRM; x.lineWidth = 6; for (const [a, b, c, d] of [[40, 40, 1, 1], [W - 40, 40, -1, 1], [40, H - 40, 1, -1], [W - 40, H - 40, -1, -1]]) { x.beginPath(); x.moveTo(a, b + d * 60); x.lineTo(a, b); x.lineTo(a + c * 60, b); x.stroke(); }
  x.fillStyle = CRM; x.beginPath(); x.arc(W - 70, H / 2, 46, 0, 7); x.fill(); x.fillStyle = grabando ? ROJ : CRM; x.strokeStyle = NAV; x.lineWidth = 6; x.beginPath(); x.arc(W - 70, H / 2, 34, 0, 7); x.fill(); x.stroke();
}
// ---- los insertos pegados a la cámara (fondo plano del set) ----
const FONDO_COC = [0x16243d, 0x1f3254, 0xd9d7c9];
const INS_AV1 = inserto(FONDO_DIA, 860, 1320, 1090, 34, { camara: true, funda: 0x16243d });
const INS_AV3 = inserto(FONDO_COC, 860, 1320, 1090, 34, { camara: true, funda: 0x16243d });
const INS_AV5 = inserto(FONDO_DIA, 860, 1320, 1090, 34, { camara: true, funda: 0x16243d });
const INS_PANEL = inserto(FONDO_VET, 1000, 1290, 1080, 18, { sinPiso: true });
// la pantallita del inalámbrico (P5): el auricular dibujado grande, sonando
const INS_TEL = { g: new THREE.Group() };
{
  crearFondoInserto(INS_TEL.g, [0x16243d, 0x365f28, 0x365f28]);
  const tex = lienzo(900, 1500, () => {}); INS_TEL.tex = tex; INS_TEL.IW = 900; INS_TEL.IH = 1500;
  const p = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 1.5), new THREE.MeshBasicMaterial({ map: tex, transparent: true, toneMapped: false })); p.position.set(0, -0.14, -0.02); INS_TEL.g.add(p);
  pegarACamara(INS_TEL.g, camera, 10); INS_TEL.g.visible = false;
}
function dibujarTelGrande(k) {
  const x = INS_TEL.tex.userData.x, W = 900, H = 1500; x.clearRect(0, 0, W, H);
  const vib = Math.sin(k * 60) * 6;
  x.save(); x.translate(W / 2 + vib, 820); x.rotate(-0.08 + Math.sin(k * 45) * 0.015);
  // los arcos del ring
  x.strokeStyle = CRM; x.lineCap = "round";
  for (let i = 0; i < 3; i++) { const a = 0.5 + 0.5 * Math.sin(k * 14 - i * 1.2); x.globalAlpha = 0.35 + 0.65 * a; x.lineWidth = 22; for (const s of [-1, 1]) { x.beginPath(); x.arc(0, -560, 230 + i * 70, s > 0 ? -0.55 : Math.PI - 0.55, (s > 0 ? -0.55 : Math.PI - 0.55) + 1.1); x.stroke(); } }
  x.globalAlpha = 1;
  // el cuerpo navy3 con borde navy, la antena, la pantallita, el teclado crema
  x.fillStyle = NAV; x.beginPath(); x.roundRect(-240 + 14, -620 + 18, 480, 1240, 120); x.fill();
  x.fillStyle = NAV3; x.strokeStyle = NAV; x.lineWidth = 14; x.beginPath(); x.roundRect(-240, -620, 480, 1240, 120); x.fill(); x.stroke();
  x.fillStyle = NAV; x.beginPath(); x.roundRect(110, -760, 56, 170, 28); x.fill();
  for (let i = 0; i < 3; i++) { x.fillStyle = NAV; x.fillRect(-80, -560 + i * 24, 160, 10); }
  x.fillStyle = "#8fbf6a"; x.strokeStyle = NAV; x.lineWidth = 12; x.beginPath(); x.roundRect(-200, -440, 400, 270, 30); x.fill(); x.stroke();
  x.fillStyle = NAV; x.textAlign = "center"; x.textBaseline = "middle"; ajustar(x, "PAPÁ", 900, 104, 360); x.fillText("PAPÁ", 0, -360); ajustar(x, "DE COCO", 900, 92, 360); x.fillText("DE COCO", 0, -250);
  for (let i = 0; i < 12; i++) { const cx = -130 + (i % 3) * 130, cy = -60 + Math.floor(i / 3) * 140; x.fillStyle = CRM; x.beginPath(); x.roundRect(cx - 50, cy - 40, 100, 80, 24); x.fill(); }
  x.fillStyle = VRD; x.beginPath(); x.roundRect(-180, 500, 160, 80, 40); x.fill(); x.fillStyle = ROJ; x.beginPath(); x.roundRect(20, 500, 160, 80, 40); x.fill();
  x.restore();
  INS_TEL.tex.needsUpdate = true;
}
const INSERTOS = [INS_AV1, INS_AV3, INS_AV5, INS_PANEL, INS_TEL];
dibujarAviso(INS_AV1.tex.userData.x, INS_AV1.IW, INS_AV1.IH, "ingreso"); INS_AV1.tex.needsUpdate = true;
dibujarAviso(INS_AV5.tex.userData.x, INS_AV5.IW, INS_AV5.IH, "listo"); INS_AV5.tex.needsUpdate = true;
let cAv3 = "", cPanel = "", cT3 = "", cTM = "", cTel = -1;
function estadoPanel(t) {
  if (t < T.q3) return { toto: t >= T.tocaCir ? 2 : 1, coco: 1, toque: t >= T.tocaCir - 0.05 && t < T.enviadoCir + 0.25 ? 0 : -1, aviso: t >= T.enviadoCir ? "Aviso a Vero enviado · con foto" : "", llam: null, atendidas: 0 };
  return { toto: 3, coco: t >= T.tocaCoco ? 3 : 2, toque: t >= T.tocaCoco - 0.05 && t < T.enviadoCoco + 0.25 ? 1 : -1, aviso: t >= T.enviadoCoco ? "Aviso a Julio enviado · con video" : "", llam: t >= T.q4i ? { gira: Math.round(sg(t, T.giraN, T.giraN + 0.3) * 10) / 10 } : null, atendidas: t >= T.atendidas ? 1 : 0 };
}
function dibujarInterfaz(t) {
  const k3 = Math.round(sg(t, T.play, T.play + 1.6) * 20) / 20;
  if (`${k3}` !== cAv3) { cAv3 = `${k3}`; dibujarAviso(INS_AV3.tex.userData.x, INS_AV3.IW, INS_AV3.IH, "despierta", t >= T.play ? Math.max(0.02, k3) : 0); INS_AV3.tex.needsUpdate = true; }
  const eP = estadoPanel(t), kP = JSON.stringify(eP);
  if (kP !== cPanel) { cPanel = kP; dibujarPanel(INS_PANEL.tex.userData.x, INS_PANEL.IW, INS_PANEL.IH, eP); INS_PANEL.tex.needsUpdate = true; }
  // la tablet del mostrador (parte 2): el panel achicado
  const kT = t >= P2 ? JSON.stringify(eP) : "";
  if (kT !== cT3) { cT3 = kT; const x = pantT.userData.x; x.save(); x.scale(1000 / 1000, 760 / 1290); dibujarPanel(x, 1000, 1290, eP); x.restore(); pantT.needsUpdate = true; }
  // la tablet en la mano de Bruno: la cámara
  const kM = t < T.q2 ? "f" : "v";
  if (kM !== cTM) { cTM = kM; dibujarCamara(pantTM.userData.x, 760, 560, kM === "f" ? FOTO.ingreso : FOTO.dormido, kM === "v"); pantTM.needsUpdate = true; }
  // la pantallita del auricular: el nombre de quien llama (y se ilumina cuando suena)
  const nom = t >= T.ring5 - 0.05 && t < P1 ? "PAPÁ DE COCO" : t < P1 ? "VERO" : "";
  const br = sonando(t) ? 1 : 0;
  if (nom + br !== nombreTel.txt) { nombreTel.txt = nom + br; dibujarPantTel(nom, br); }
  if (planoActual === "P5i") { const kk = Math.round((t - T.p5i) * 30); if (kk !== cTel) { cTel = kk; dibujarTelGrande(t - T.p5i); } }
}
// el celular de Vero en 3D: el aviso "Ingresó" (la vereda, Q1) o el del video (la cocina, Q3)
let cCel = "";
function pantallaCel(tipo) { if (tipo === cCel) return; cCel = tipo; const x = pantCel.userData.x; x.save(); x.scale(400 / 860, 820 / 1320); dibujarAviso(x, 860, 1320, tipo, 0.5); x.restore(); pantCel.needsUpdate = true; }
// ¿el teléfono de mostrador está sonando en t? (P1 desde el cuadro 0 hasta que atiende; cada chip; P5 en la mano de Inés)
function sonando(t) {
  if (t >= P1) return false;
  if (t < T.atiende) return true;
  for (const m of T.mont) if (t >= m.ini && t < m.atiende) return true;
  return t >= T.ring5 && t < T.p5b + 0.3;
}

// =====================================================================================================
// LAS TARJETAS DE ESTE REEL (globos, globos de teléfono, chips, rótulos)
// =====================================================================================================
// el globo de TELÉFONO: borde punteado y el iconito del auricular adelante (se entiende sin sonido que sale del teléfono)
function crearGloboTel(lineas, px = 76) {
  const med = document.createElement("canvas").getContext("2d"); med.font = F(800, px);
  const limpio = (l) => l.replace(/[[\]]/g, "");
  const ic = px * 1.15;
  const anchoT = Math.max(...lineas.map((l) => med.measureText(limpio(l)).width + (l.includes("[") ? px * 0.5 : 0)));
  const Wg = Math.round(anchoT + px * 1.3 + ic), H = Math.round(lineas.length * px * 1.22 + px * 0.85);
  const g = crearTarjeta(Wg, H, (x, w, h) => {
    x.strokeStyle = NAV3; x.lineWidth = 6; x.setLineDash([16, 12]); x.beginPath(); x.roundRect(12, 12, w - 24, h - 24, Math.min(30, (h - 24) / 2)); x.stroke(); x.setLineDash([]);
    // el auricular: navy con la pantallita verde
    const ix = px * 0.45, iy = h / 2 - ic * 0.62;
    x.save(); x.translate(ix + ic * 0.32, h / 2); x.rotate(-0.35); x.fillStyle = NAV3; x.beginPath(); x.roundRect(-ic * 0.22, -ic * 0.62, ic * 0.44, ic * 1.24, ic * 0.14); x.fill(); x.fillStyle = "#8fbf6a"; x.fillRect(-ic * 0.14, -ic * 0.42, ic * 0.28, ic * 0.2); x.fillStyle = CRM; for (let i = 0; i < 6; i++) x.fillRect(-ic * 0.12 + (i % 2) * ic * 0.14, -ic * 0.1 + Math.floor(i / 2) * ic * 0.16, ic * 0.1, ic * 0.09); x.restore();
    lineas.forEach((l, i) => textoSel(x, l, ic + (w - ic) / 2 - px * 0.1, h / 2 + (i - (lineas.length - 1) / 2) * px * 1.22, px));
  });
  g.userData.lineas = lineas; g.userData.px = px;
  return g;
}
const dibujarContador = (x, W, H, n) => { x.fillStyle = "#ffffff"; x.textAlign = "center"; x.textBaseline = "middle"; x.font = F(800, 54); x.fillText("Llamadas hoy", W / 2, 54); x.font = F(900, 120); x.fillText(String(n), W / 2, 156); };
const GL = {
  jue: chip("Jueves, 9:02. Cirugías.", 58), h1030: chip("10:30.", 84), h1200: chip("12:00.", 84), h1400: chip("14:00.", 84), h1530: chip("15:30.", 84),
  jue2: chip("Jueves, 9:02.", 62), h1100: chip("11:00.", 84), h1530b: chip("15:30.", 84), h1700: chip("17:00.", 84),
  cont: crearTarjeta(440, 220, (x, W, H) => dibujarContador(x, W, H, 2), { fondo: "#c7655b" }),
  v1: crearGloboTel(["¿Cómo está [Toto?]"], 70),
  b2: crearGlobo(["Vero.", "Te estoy [viendo.]"], 72),
  b3: crearGlobo(["Está [dormido.]"], 76), b4: crearGlobo(["Sigue [dormido.]"], 76), b5: crearGlobo(["Sí. Dormido.", "[Todavía.]"], 76),
  b6: crearGlobo(["Doctora. Vero quiere", "hablar con [él.]"], 64),
  i7: crearGlobo(["Está [anestesiado.]"], 70),
  b8: crearGlobo(["Dice que no [importa.]"], 70),
  r1: crearRotulo([["34 llamadas", "#ff9d92", 64], ["2 horas de teléfono", "#ff9d92", 54]], 54),
  r2: crearRotulo([["3 consultas que se fueron", "#ff9d92", 52], ["$ 4.500", "#ff9d92", 72]], 52),
  v9: crearGloboTel(["¡Ay, mi [amor!]"], 76),
  b10: crearGlobo(["Ahora el de [Coco.]"], 72),
  v12: crearGlobo(["¡Ay, mirá!", "¡Ya [entró!]"], 72),
  rAv1: crearRotulo([["Un aviso con foto"], ["en cada etapa"]], 54),
  rPanel: crearRotulo([["Un toque y le llega al dueño"]], 50),
  v9b: crearGloboTel(["¡Ay, mi [amor!]"], 76),
  rAv3: crearRotulo([["Despertando: con video"]], 52),
  b10b: crearGlobo(["Ahora el de [Coco.]"], 72),
  i13: crearGlobo(["Bruno, ¿llamó", "[alguien?]"], 70),
  b14: crearGlobo(["[Nadie.]"], 84),
  rLlam: crearRotulo([["Las llamadas de hoy"]], 52),
  rAv5: crearRotulo([["Listo, con las indicaciones"]], 50),
  v1b: crearGlobo(["¿Cómo está [Toto?]"], 74),
  b15: crearGlobo(["Preguntale a [él.]"], 74),
};
let contN = -1;
function ponerContador(n, cx, cy, s = 1) { if (n !== contN) { contN = n; redibujar(GL.cont, (x, W, H) => dibujarContador(x, W, H, n)); } ponerGlobo(GL.cont, cx, cy, s, null, 1); }
const GUIAS = [crearGuia(), crearGuia(), crearGuia()];
