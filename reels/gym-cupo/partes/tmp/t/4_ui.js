
// =====================================================================================================
// INTERFAZ RECREADA (canvas): el grupo de WhatsApp genérico, la app de reservas con el mapa de las 14 bicis, el recordatorio,
// el aviso a la lista de espera, la tablet de la recepción y el panel de noviembre
// =====================================================================================================
const NV = "#0b1220", NV2 = "#16243d", NV3 = "#1f3254", CRm = "#efeee5", VD = "#5ce611", VDO = "#3fa60a", ROJO = "#c7655b", GRIS = "#b9bec4";
const tilde = (x, cx, cy, s, color = NV, lw = null) => { x.strokeStyle = color; x.lineWidth = lw ?? s * 0.28; x.lineCap = "round"; x.lineJoin = "round"; x.beginPath(); x.moveTo(cx - s * 0.5, cy); x.lineTo(cx - s * 0.12, cy + s * 0.38); x.lineTo(cx + s * 0.55, cy - s * 0.42); x.stroke(); };
const bola = (x, cx, cy, r, fondo, letra, tinta = CRm) => { x.fillStyle = fondo; x.beginPath(); x.arc(cx, cy, r, 0, 7); x.fill(); x.strokeStyle = NV; x.lineWidth = Math.max(3, r * 0.1); x.stroke(); x.fillStyle = tinta; x.font = F(900, r * 1.05); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText(letra, cx, cy + r * 0.06); };
function renglones(x, txt, ancho) { const ws = txt.split(" "), out = []; let l = ""; for (const w of ws) { const p = l ? l + " " + w : w; if (x.measureText(p).width > ancho && l) { out.push(l); l = w; } else l = p; } if (l) out.push(l); return out; }
const COLOR_DE = { Caro: "#c7655b", Seba: "#1f3254", Lu: "#3fa60a", Mabel: "#8a4a8a", Nati: "#2c6a8a", Rodri: "#a0642a", Pato: "#1f3254", Vicky: "#3fa60a", Ana: "#8a4a8a", Fede: "#2c6a8a", Majo: "#8a4a2a", Sole: "#3b2a22", Mauro: "#1f3254" };
// el pulgar plano (sticker genérico, navy sobre crema)
function pulgar(x, cx, cy, s) {
  x.save(); x.translate(cx, cy); x.scale(s, s); x.fillStyle = NV3; x.strokeStyle = NV; x.lineWidth = 6;
  x.beginPath(); x.roundRect(-60, -10, 34, 80, 10); x.fill(); x.stroke();
  x.beginPath(); x.moveTo(-20, -6); x.lineTo(0, -60); x.quadraticCurveTo(14, -78, 26, -60); x.lineTo(16, -18); x.lineTo(56, -18); x.quadraticCurveTo(72, -16, 68, 4); x.lineTo(56, 60); x.quadraticCurveTo(52, 72, 38, 72); x.lineTo(-20, 72); x.closePath(); x.fill(); x.stroke();
  x.restore();
}
// una burbuja del chat: { de, txt, pulgar, audio, mio, rojo (palabra en rojo), ver (cuántas letras) }; devuelve el alto
function burbujaChat(x, W, y, m, k, dibujar = true) {
  const pad = 26 * k, px = (m.px ?? 50) * k, ancho = W * 0.8;
  x.font = F(800, px);
  const txt = m.txt ?? "";
  const ls = m.txt ? renglones(x, txt, ancho - 2 * pad) : [];
  const cab = m.mio ? 0 : 44 * k;
  let h = cab + (m.pulgar ? 170 * k : m.audio ? 120 * k : ls.length * px * 1.2) + pad * 1.5;
  let w = m.pulgar ? 230 * k : m.audio ? ancho : Math.max(...ls.map((l) => x.measureText(l).width), m.mio ? 0 : 180 * k) + 2 * pad;
  if (!dibujar) return h;
  const bx = m.mio ? W - 24 * k - w : 24 * k;
  x.fillStyle = m.mio ? "#cfeebc" : "#ffffff"; x.strokeStyle = NV2; x.lineWidth = 5 * k; x.beginPath(); x.roundRect(bx, y, w, h, m.mio ? [30 * k, 8 * k, 30 * k, 30 * k] : [8 * k, 30 * k, 30 * k, 30 * k]); x.fill(); x.stroke();
  x.textBaseline = "middle"; x.textAlign = "left";
  if (!m.mio) { x.fillStyle = COLOR_DE[m.de] ?? NV3; x.font = F(800, 36 * k); x.fillText(m.de, bx + pad, y + 32 * k); }
  if (m.pulgar) pulgar(x, bx + w / 2, y + cab + 90 * k, 1.05 * k);
  else if (m.audio) {
    const cy = y + cab + 60 * k;
    if (m.avatar) bola(x, bx + pad + 40 * k, cy, 40 * k, m.avatar, m.de[0]);
    const x0 = bx + pad + (m.avatar ? 96 * k : 0);
    x.fillStyle = NV2; x.beginPath(); x.moveTo(x0 + 6 * k, cy - 24 * k); x.lineTo(x0 + 40 * k, cy); x.lineTo(x0 + 6 * k, cy + 24 * k); x.closePath(); x.fill();
    const n = 22, xa = x0 + 60 * k, wa = w - (xa - bx) - pad - 70 * k;
    for (let i = 0; i < n; i++) { const hh = (10 + 30 * Math.abs(Math.sin(i * 1.7 + 0.4))) * k; x.fillStyle = i / n < (m.prog ?? 0) ? VDO : GRIS; x.fillRect(xa + (i * wa) / n, cy - hh / 2, (wa / n) * 0.55, hh); }
    x.fillStyle = NV3; x.font = F(700, 34 * k); x.textAlign = "right"; x.fillText(m.audio, bx + w - pad, cy);
  } else {
    let resto = m.ver ?? Infinity;
    ls.forEach((l, i) => {
      const yy = y + cab + pad * 0.7 + px * 0.62 + i * px * 1.2; let xx = bx + pad;
      for (const w2 of l.split(/(?<= )/)) { if (resto <= 0) break; const vis = w2.slice(0, Math.max(0, resto)); resto -= w2.length; x.font = F(800, px); x.fillStyle = m.rojo && w2.startsWith(m.rojo) ? "#b04a40" : NV; x.fillText(vis, xx, yy); xx += x.measureText(w2).width; }
    });
  }
  if (m.mio && m.leido) { x.textAlign = "right"; x.fillStyle = VDO; x.font = F(900, 34 * k); x.fillText("✓✓", bx + w - 14 * k, y + h - 22 * k); }
  return h;
}
function cabeceraGrupo(x, W, k, sub = "38 participantes") {
  x.fillStyle = NV2; x.fillRect(0, 0, W, 150 * k); x.fillStyle = VD; x.fillRect(0, 150 * k, W, 10 * k);
  bola(x, 70 * k, 76 * k, 46 * k, VDO, "S", NV);
  x.fillStyle = CRm; x.textAlign = "left"; x.textBaseline = "middle"; x.font = F(900, 44 * k); x.fillText("SPINNING MARTES 19", 132 * k, 58 * k);
  x.font = F(600, 32 * k); x.fillStyle = "#c9d2e0"; x.fillText(sub, 134 * k, 108 * k);
}
// el chat: lista de mensajes de arriba abajo; si no entran, sube (el último queda abajo)
function dibujarChat(x, W, H, msgs, k, sub, kc = k) {
  x.fillStyle = "#e9e6da"; x.fillRect(0, 0, W, H);
  let tot = 0; const hs = msgs.map((m) => burbujaChat(x, W, 0, m, k, false)); for (const h of hs) tot += h + 18 * k;
  let y = H - 24 * k - tot;   // el último abajo (como en un chat de verdad)
  msgs.forEach((m, i) => { if (y + hs[i] > 140 * kc) burbujaChat(x, W, y, m, k); y += hs[i] + 18 * k; });
  cabeceraGrupo(x, W, kc, sub);
}
// P1 · el aluvión de "yo voy" en el celular de Mauro
const MSG_YV = [{ de: "Caro", txt: "Yo voy" }, { de: "Seba", txt: "yo voooy" }, { de: "Lu", txt: "Anotame a mí y a mi prima" }, { de: "Mabel", txt: "Yo voy" }, { de: "Nati", txt: "voy pero llego 19:10" }, { de: "Rodri", txt: "Yo voy" }, { de: "Pato", txt: "Voy!!" }, { de: "Vicky", txt: "yo voy profe" }];
const MSG_PREV = [{ de: "Ana", txt: "Yo voy" }, { de: "Caro", txt: "profe hoy vamos!!" }, { de: "Fede", txt: "voy" }, { de: "Lu", txt: "Yo voy" }];
function msgsP1(t) {
  const n = T.yv.filter((m) => t >= m).length;
  const l = [...MSG_PREV, ...MSG_YV.slice(0, n)];
  if (t >= T.sticker) l.push({ de: "Ana", pulgar: true });
  if (t >= T.audio47) l.push({ de: "Fede", audio: "0:47", avatar: "#2c6a8a", prog: 0 });
  return l;
}
// P1b · el audio de Majo, "Llena, Majo. Perdoná.", Sole, "Llena, Sole." · P3i · el mensaje de Majo a las 19:01
function msgsP1b(t) {
  const l = [...MSG_YV.slice(0, 4), { de: "Mabel", txt: "Yo voy", px: 58 }, { de: "Rodri", txt: "Yo voy", px: 58 }, { de: "Vicky", txt: "yo voy profe", px: 58 }];
  l.push({ de: "Majo", audio: "0:02", avatar: "#8a4a2a", prog: cl((t - T.j1) / LEN.j1), px: 58 });
  if (t >= T.llenaM) { const txt = "Llena, Majo. Perdoná."; l.push({ mio: true, txt, px: 62, rojo: "Llena", ver: Math.round(txt.length * cl((t - T.llenaM) / 0.55)), leido: t > T.llenaM + 0.6 }); }
  if (t >= T.sole) l.push({ de: "Sole", txt: "¿Me guardás una?", px: 62 });
  if (t >= T.llenaS - 0.3) { const txt = "Llena, Sole."; l.push({ mio: true, txt, px: 62, rojo: "Llena", ver: Math.round(txt.length * cl((t - T.llenaS + 0.3) / 0.3)), leido: t > T.llenaS + 0.2 }); }
  return l;
}
function msgsP3i() { return [{ de: "Sole", txt: "¿Me guardás una?", px: 58 }, { mio: true, txt: "Llena, Sole.", rojo: "Llena", leido: true, px: 58 }, { de: "Majo", txt: "Tranqui, Mauro. Me anoté en otro lado: ahí reservás la bici.", px: 64 }]; }
// P5 · la pantalla de bloqueo con la notificación de Rodri (19:04)
function dibujarBloqueo(x, W, H, k, noti) {
  x.fillStyle = NV2; x.fillRect(0, 0, W, H);
  x.fillStyle = "#2c4268"; for (let i = 0; i < 6; i++) { x.beginPath(); x.arc(W * (0.15 + i * 0.16), H * 0.92, 60 * k + i * 6 * k, 0, 7); x.fill(); }
  x.fillStyle = CRm; x.textAlign = "center"; x.textBaseline = "middle"; x.font = F(800, 170 * k); x.fillText("19:04", W / 2, 210 * k);
  x.font = F(600, 46 * k); x.fillText("martes", W / 2, 320 * k);
  if (noti) {
    const y = 420 * k; x.fillStyle = "#ffffff"; x.strokeStyle = NV; x.lineWidth = 7 * k; x.beginPath(); x.roundRect(22 * k, y, W - 44 * k, 520 * k, 40 * k); x.fill(); x.stroke();
    bola(x, 90 * k, y + 76 * k, 46 * k, VDO, "S", NV); x.fillStyle = NV3; x.textAlign = "left"; x.font = F(800, 42 * k); x.fillText("SPINNING MARTES 19", 152 * k, y + 76 * k);
    x.fillStyle = NV; x.font = F(900, 84 * k); x.fillText("Rodri:", 56 * k, y + 200 * k); x.font = F(800, 80 * k); x.fillText("¿Ya empezó?", 56 * k, y + 310 * k); x.fillStyle = "#b04a40"; x.font = F(900, 84 * k); x.fillText("Yo voy.", 56 * k, y + 420 * k);
  }
}
// ---- la app de reservas: cabecera, el mapa de la sala (tarima arriba, 4 · 5 · 5) ----
function cabeceraApp(x, W, k, titulo = "Reservá tu bici") {
  x.fillStyle = NV2; x.fillRect(0, 0, W, 170 * k); x.fillStyle = VD; x.fillRect(0, 170 * k, W, 10 * k);
  bola(x, 80 * k, 86 * k, 52 * k, VD, "EM", NV);
  x.fillStyle = CRm; x.textAlign = "left"; x.textBaseline = "middle"; x.font = F(900, 54 * k); x.fillText("Estudio Mauro", 152 * k, 64 * k);
  x.font = F(700, 42 * k); x.fillStyle = VD; x.fillText(titulo, 154 * k, 124 * k);
}
// estado de cada bici: "ocu" (gris con ✓), "libre" (verde), "mia" (navy con la inicial), "toca" (verde apretado)
function dibujarMapa(x, X, Y, W, k, est, inicial = "M") {
  const H = 700 * k;
  x.fillStyle = "#f7f6ef"; x.strokeStyle = NV2; x.lineWidth = 5 * k; x.beginPath(); x.roundRect(X, Y, W, H, 30 * k); x.fill(); x.stroke();
  // la tarima con la bici del profe
  x.fillStyle = CRm; x.strokeStyle = NV; x.lineWidth = 5 * k; x.beginPath(); x.roundRect(X + W / 2 - 170 * k, Y + 24 * k, 340 * k, 104 * k, 16 * k); x.fill(); x.stroke();
  x.fillStyle = NV; x.font = F(900, 40 * k); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("PROFE", X + W / 2, Y + 77 * k);
  const S = 112 * k, filas = [[1, 2, 3, 4], [5, 6, 7, 8, 9], [10, 11, 12, 13, 14]];
  filas.forEach((f, r) => {
    const gap = (W - 5 * S) / 6, y = Y + 170 * k + r * (S + 52 * k);
    f.forEach((n, i) => {
      const xx = X + (W - (f.length * S + (f.length - 1) * gap)) / 2 + i * (S + gap);
      const e = est[n] ?? "ocu", s2 = e === "toca" ? 0.9 : 1;
      x.save(); x.translate(xx + S / 2, y + S / 2); x.scale(s2, s2);
      x.fillStyle = e === "ocu" ? GRIS : e === "mia" ? NV2 : VD; x.strokeStyle = NV; x.lineWidth = 6 * k; x.beginPath(); x.roundRect(-S / 2, -S / 2, S, S, 22 * k); x.fill(); x.stroke();
      x.fillStyle = e === "mia" ? CRm : NV; x.font = F(900, 58 * k); x.textAlign = "center"; x.textBaseline = "middle"; x.fillText(e === "mia" ? inicial : String(n), 0, e === "ocu" ? -10 * k : 3 * k);
      if (e === "ocu") { x.font = F(800, 26 * k); x.fillStyle = "#4b5263"; x.fillText(`✓ ${n}`, 0, 34 * k); }
      if (e === "mia") { x.font = F(800, 26 * k); x.fillStyle = VD; x.fillText(String(n), 0, 38 * k); }
      x.restore();
    });
  });
  return H;
}
// Q1 · celular de Majo: f.tocado (0 nada, 1 apretó la 7, 2 reservada), f.ocup (0, 1 la 4, 2 la 13 = llena)
function dibujarReserva(x, W, H, k, f) {
  x.fillStyle = "#e9e6da"; x.fillRect(0, 0, W, H); cabeceraApp(x, W, k);
  x.fillStyle = NV; x.textAlign = "left"; x.textBaseline = "middle"; x.font = F(800, 50 * k); x.fillText("Spinning", 40 * k, 236 * k);
  x.fillStyle = NV3; x.font = F(700, 44 * k); x.fillText("martes 19:00", 42 * k, 298 * k);
  const quedan = 3 - (f.tocado >= 2 ? 1 : 0) - f.ocup;
  const llena = quedan <= 0;
  x.fillStyle = llena ? NV : VD; x.strokeStyle = NV; x.lineWidth = 6 * k; const tx = llena ? "Llena · 14/14" : `Quedan ${quedan}`; x.font = F(900, 52 * k); const tw = x.measureText(tx).width + 60 * k;
  x.beginPath(); x.roundRect(W - 36 * k - tw, 214 * k, tw, 98 * k, 49 * k); x.fill(); x.stroke(); x.fillStyle = llena ? CRm : NV; x.textAlign = "center"; x.fillText(tx, W - 36 * k - tw / 2, 265 * k);
  const est = {}; for (let n = 1; n <= 14; n++) est[n] = "ocu";
  est[4] = f.ocup >= 1 ? "ocu" : "libre"; est[13] = f.ocup >= 2 ? "ocu" : "libre"; est[7] = f.tocado >= 2 ? "mia" : f.tocado === 1 ? "toca" : "libre";
  const hm = dibujarMapa(x, 28 * k, 350 * k, W - 56 * k, k, est);
  const yb = 350 * k + hm + 30 * k;
  if (f.tocado < 2) {
    x.fillStyle = f.tocado === 1 ? VDO : VD; x.strokeStyle = NV; x.lineWidth = 8 * k; x.beginPath(); x.roundRect(36 * k, yb, W - 72 * k, 140 * k, 70 * k); x.fill(); x.stroke();
    x.fillStyle = NV; x.font = F(900, 62 * k); x.textAlign = "center"; x.fillText(f.tocado === 1 ? "Reservar bici 7" : "Elegí tu bici", W / 2, yb + 72 * k);
  } else {
    x.fillStyle = NV2; x.beginPath(); x.roundRect(30 * k, yb, W - 60 * k, 150 * k, 34 * k); x.fill();
    x.fillStyle = VD; x.beginPath(); x.arc(100 * k, yb + 75 * k, 46 * k, 0, 7); x.fill(); tilde(x, 102 * k, yb + 77 * k, 48 * k, NV);
    x.fillStyle = CRm; x.textAlign = "left"; x.font = F(900, 58 * k); x.fillText("Bici 7 reservada", 170 * k, yb + 52 * k); x.fillStyle = VD; x.font = F(700, 42 * k); x.fillText("martes 19:00", 172 * k, yb + 110 * k);
  }
}
// Q1s · celular de Sole: "Clase llena · 14/14" → "Anotarme en la lista de espera" → "Sos la 1ª de la lista de espera ✓"
function dibujarEspera(x, W, H, k, f) {
  x.fillStyle = "#e9e6da"; x.fillRect(0, 0, W, H); cabeceraApp(x, W, k);
  x.fillStyle = NV; x.textAlign = "left"; x.textBaseline = "middle"; x.font = F(800, 50 * k); x.fillText("Spinning · martes 19:00", 40 * k, 240 * k);
  x.fillStyle = NV2; x.beginPath(); x.roundRect(30 * k, 300 * k, W - 60 * k, 170 * k, 34 * k); x.fill();
  x.fillStyle = CRm; x.font = F(900, 74 * k); x.textAlign = "center"; x.fillText("Clase llena", W / 2, 360 * k); x.fillStyle = VD; x.font = F(800, 50 * k); x.fillText("14 de 14 bicis", W / 2, 428 * k);
  const est = {}; for (let n = 1; n <= 14; n++) est[n] = "ocu";
  x.save(); x.translate(W * 0.1, 500 * k); x.scale(0.8, 0.8); dibujarMapa(x, 0, 0, W, k, est); x.restore();
  const yb = 500 * k + 700 * k * 0.8 + 30 * k;
  if (f < 2) {
    x.fillStyle = f === 1 ? VDO : VD; x.strokeStyle = NV; x.lineWidth = 8 * k; x.beginPath(); x.roundRect(36 * k, yb, W - 72 * k, 170 * k, 50 * k); x.fill(); x.stroke();
    x.fillStyle = NV; x.font = F(900, 56 * k); x.textAlign = "center"; x.fillText("Anotarme en la", W / 2, yb + 56 * k); x.fillText("lista de espera", W / 2, yb + 118 * k);
  } else {
    x.fillStyle = NV2; x.beginPath(); x.roundRect(30 * k, yb, W - 60 * k, 180 * k, 34 * k); x.fill();
    x.fillStyle = VD; x.beginPath(); x.arc(100 * k, yb + 90 * k, 46 * k, 0, 7); x.fill(); tilde(x, 102 * k, yb + 92 * k, 48 * k, NV);
    x.fillStyle = CRm; x.textAlign = "left"; x.font = F(900, 58 * k); x.fillText("Sos la 1ª de", 170 * k, yb + 60 * k); x.fillText("la lista de espera", 170 * k, yb + 124 * k);
  }
}
// un mensaje de "Estudio Mauro" (recordatorio, aviso) con botones; f: 0 llegó, 1 apretó el botón b, 2 confirmado
function dibujarMensajeApp(x, W, H, k, { hola, lineas, botones, apretado, f, okTxt, okSub }) {
  x.fillStyle = "#e9e6da"; x.fillRect(0, 0, W, H); cabeceraApp(x, W, k, "mensajes");
  const by = 220 * k;
  x.fillStyle = "#ffffff"; x.strokeStyle = NV2; x.lineWidth = 6 * k; x.beginPath(); x.roundRect(24 * k, by, W - 48 * k, 120 * k + lineas.length * 84 * k, [10 * k, 34 * k, 34 * k, 34 * k]); x.fill(); x.stroke();
  x.fillStyle = NV3; x.textAlign = "left"; x.textBaseline = "middle"; x.font = F(700, 44 * k); x.fillText(hola, 60 * k, by + 60 * k);
  lineas.forEach(([l, peso, px], i) => { x.fillStyle = NV; x.font = F(peso ?? 800, (px ?? 66) * k); x.fillText(l, 60 * k, by + 150 * k + i * 84 * k); });
  let y = by + 150 * k + lineas.length * 84 * k + 10 * k;
  if (f < 2) {
    botones.forEach((b, i) => {
      const ap = f === 1 && i === apretado;
      x.fillStyle = ap ? VDO : i === apretado ? VD : "#ffffff"; x.strokeStyle = NV; x.lineWidth = 8 * k; x.beginPath(); x.roundRect(36 * k, y, W - 72 * k, 150 * k, 75 * k); x.fill(); x.stroke();
      x.fillStyle = NV; x.font = F(900, 64 * k); x.textAlign = "center"; x.fillText(b, W / 2, y + 78 * k);
      y += 180 * k;
    });
  } else {
    x.fillStyle = NV2; x.beginPath(); x.roundRect(30 * k, y, W - 60 * k, 190 * k, 34 * k); x.fill();
    x.fillStyle = VD; x.beginPath(); x.arc(104 * k, y + 95 * k, 50 * k, 0, 7); x.fill(); tilde(x, 106 * k, y + 97 * k, 52 * k, NV);
    x.fillStyle = CRm; x.textAlign = "left"; x.font = F(900, 64 * k); x.fillText(okTxt, 180 * k, y + 66 * k); x.fillStyle = VD; x.font = F(700, 46 * k); x.fillText(okSub, 182 * k, y + 132 * k);
  }
}
// Q2t · la tablet de la recepción: el mapa de hoy con la 4 que se libera y el aviso a la lista de espera
function dibujarTablet(x, W, H, k, f) {
  x.fillStyle = "#e9e6da"; x.fillRect(0, 0, W, H); cabeceraApp(x, W, k, "Spinning martes 19:00 · hoy");
  const est = {}; for (let n = 1; n <= 14; n++) est[n] = "ocu"; if (f >= 1) est[4] = "libre"; if (f >= 2) est[4] = "mia";
  dibujarMapa(x, 28 * k, 210 * k, W - 56 * k, k, est, "S");
  const y = 950 * k;
  x.fillStyle = f >= 2 ? NV2 : f >= 1 ? VD : "#ffffff"; x.strokeStyle = NV; x.lineWidth = 7 * k; x.beginPath(); x.roundRect(30 * k, y, W - 60 * k, 290 * k, 34 * k); x.fill(); x.stroke();
  x.textAlign = "left"; x.textBaseline = "middle";
  if (f === 0) { x.fillStyle = NV; x.font = F(800, 58 * k); x.fillText("Reservadas 14 de 14", 70 * k, y + 80 * k); x.fillStyle = NV3; x.font = F(700, 46 * k); x.fillText("Lista de espera: 1 · Sole", 70 * k, y + 170 * k); }
  else if (f === 1) { x.fillStyle = NV; x.font = F(900, 66 * k); x.fillText("Bici 4 libre", 70 * k, y + 80 * k); x.font = F(800, 48 * k); x.fillText("avisando a la lista", 70 * k, y + 160 * k); x.fillText("de espera: Sole", 70 * k, y + 220 * k); }
  else { x.fillStyle = CRm; x.font = F(900, 66 * k); x.fillText("Bici 4 · Sole", 70 * k, y + 80 * k); x.fillStyle = VD; x.font = F(800, 50 * k); x.fillText("reservada otra vez ✓", 70 * k, y + 170 * k); }
}
// Q4 · el panel de noviembre (tablet): e = { filas: 0..4, gira: 0..1 }
function dibujarPanelMes(x, W, H, k, e) {
  x.fillStyle = "#e9e6da"; x.fillRect(0, 0, W, H);
  x.fillStyle = NV2; x.fillRect(0, 0, W, 190 * k); x.fillStyle = VD; x.fillRect(0, 190 * k, W, 12 * k);
  x.fillStyle = CRm; x.textAlign = "left"; x.textBaseline = "middle"; x.font = F(900, 62 * k); x.fillText("Spinning martes 19:00", 40 * k, 70 * k); x.fillStyle = VD; x.font = F(800, 50 * k); x.fillText("noviembre", 42 * k, 140 * k);
  const fila = (i, y, h, dibujo) => { const ok = e.filas > i; x.fillStyle = ok ? "#ffffff" : "#f4f2e8"; x.strokeStyle = ok ? NV : GRIS; x.lineWidth = 7 * k; x.beginPath(); x.roundRect(30 * k, y, W - 60 * k, h, 30 * k); x.fill(); x.stroke(); if (ok) dibujo(y); };
  const ok = (y, h) => { x.fillStyle = VDO; x.beginPath(); x.arc(W - 100 * k, y + h / 2, 40 * k, 0, 7); x.fill(); tilde(x, W - 98 * k, y + h / 2 + 2 * k, 42 * k, NV); };
  fila(0, 240 * k, 200 * k, (y) => { x.fillStyle = NV; x.textAlign = "left"; x.font = F(800, 54 * k); x.fillText("Reservaron 14", 70 * k, y + 64 * k); x.fillText("vinieron 14", 70 * k, y + 136 * k); ok(y, 200 * k); });
  fila(1, 470 * k, 300 * k, (y) => {
    x.fillStyle = NV; x.textAlign = "left"; x.font = F(800, 52 * k); x.fillText("Bicis vacías en el mes", 70 * k, y + 64 * k);
    const g = e.gira, cx = W / 2, cy = y + 190 * k;
    x.save(); x.translate(cx, cy); x.scale(1, Math.abs(Math.cos(g * Math.PI)) || 0.02);
    x.font = F(900, 150 * k); x.textAlign = "center"; x.fillStyle = g < 0.5 ? ROJO : VDO; x.fillText(g < 0.5 ? "20" : "1", 0, 6 * k); x.restore();
    if (g >= 1) { x.fillStyle = GRIS; x.font = F(800, 70 * k); x.textAlign = "right"; x.fillText("20 →", cx - 70 * k, cy + 6 * k); ok(y, 300 * k); }
  });
  fila(2, 800 * k, 200 * k, (y) => { x.fillStyle = NV; x.textAlign = "left"; x.font = F(800, 50 * k); x.fillText("Lugares que llenó la", 70 * k, y + 62 * k); x.fillText("lista de espera: 6", 70 * k, y + 136 * k); ok(y, 200 * k); });
  fila(3, 1030 * k, 200 * k, (y) => { x.fillStyle = NV; x.textAlign = "left"; x.font = F(800, 50 * k); x.fillText("Alumnas nuevas", 70 * k, y + 62 * k); x.fillText("desde la lista: 3", 70 * k, y + 136 * k); ok(y, 200 * k); });
}

// =====================================================================================================
// INSERTOS PEGADOS A LA CÁMARA (el lugar de fondo en planos de color)
// =====================================================================================================
function crearFondoInserto(g, tipo) {
  const P = (w, h, c, x, y, z, rz = 0) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w / PXK, h / PXK), new THREE.MeshBasicMaterial({ color: c })); m.position.set(x / PXK, y / PXK, z); m.rotation.z = rz; g.add(m); return m; };
  if (tipo === "sala") { P(1400, 2400, 0x0b1220, 0, 0, -0.06); P(2600, 230, 0xefeee5, 0, 200, -0.059, 0.42); P(1400, 900, 0x3a3f4a, 0, -900, -0.058); P(1400, 26, 0x5ce611, 0, 1000, -0.057); }
  else if (tipo === "living") { P(1400, 2400, 0xe6e1cf, 0, 0, -0.06); P(1400, 900, 0x16243d, 0, -820, -0.059); P(1400, 60, 0x1f3254, 0, -360, -0.058); P(500, 360, 0x365f28, -480, -470, -0.0575, 0.2); }
  else if (tipo === "oficina") { P(1400, 2400, 0xd9d7c9, 0, 0, -0.06); P(1400, 900, 0xb98d5e, 0, -820, -0.059); P(1400, 40, 0x8f6a44, 0, -370, -0.058); P(300, 420, 0x16243d, 470, 520, -0.0585); }
  else if (tipo === "recepcion") {
    P(1400, 2400, 0x0b1220, 0, 0, -0.06); P(2600, 230, 0xefeee5, 0, 350, -0.059, 0.42); P(1400, 26, 0x5ce611, 0, 1000, -0.057);
    P(1400, 820, 0xefeee5, 0, -860, -0.0585); P(1400, 560, 0x1f3254, 0, -1000, -0.058); P(1400, 30, 0x5ce611, 0, -720, -0.0578);
    for (const [x, c] of [[-470, 0xefeee5], [-410, 0x5ce611], [-350, 0x16243d], [400, 0x5ce611], [460, 0xefeee5]]) { P(52, 170, c, x, -360, -0.0575); P(30, 30, 0x0b1220, x, -265, -0.0574); }
  }
}
function crearCelInserto(IW, IH, cx, cy, marcoR = 30, opc = {}) {
  const tex = lienzo(IW, IH, () => {});
  const g = new THREE.Group();
  const sombra = new THREE.Mesh(rbox((IW + 2 * marcoR) / PXK, (IH + 2 * marcoR) / PXK, 0.01, 80 / PXK, 3), new THREE.MeshBasicMaterial({ color: 0x050a14 })); sombra.position.set((cx - 540 + 18) / PXK, (960 - cy - 22) / PXK, -0.04); g.add(sombra);
  const marco = new THREE.Mesh(rbox((IW + 2 * marcoR) / PXK, (IH + 2 * marcoR) / PXK, 0.01, 80 / PXK, 3), new THREE.MeshBasicMaterial({ color: opc.funda ?? 0x0b1220 })); marco.position.set((cx - 540) / PXK, (960 - cy) / PXK, -0.03); g.add(marco);
  const pan = new THREE.Mesh(new THREE.PlaneGeometry(IW / PXK, IH / PXK), new THREE.MeshBasicMaterial({ map: tex, toneMapped: false })); pan.position.set((cx - 540) / PXK, (960 - cy) / PXK, -0.02); g.add(pan);
  if (opc.camara) { const cam = new THREE.Mesh(new THREE.CircleGeometry(Math.max(8, marcoR * 0.35) / PXK, 20), new THREE.MeshBasicMaterial({ color: 0x050a14 })); cam.position.set((cx - 540) / PXK, (960 - cy + IH / 2 + marcoR * 0.5) / PXK, -0.019); g.add(cam); }
  return { g, tex, IW, IH, k: IW / 860 };
}
const inserto = (tipo, IW, IH, cx, cy, marcoR, opc) => { const I = { g: new THREE.Group() }; crearFondoInserto(I.g, tipo); I.cel = crearCelInserto(IW, IH, cx, cy, marcoR, opc); I.g.add(I.cel.g); pegarACamara(I.g, camera, 10); I.g.visible = false; return I; };
const INS = {
  P1b: inserto("sala", 860, 1400, 540, 1040, 34, { camara: true, funda: 0x16243d }),     // el chat: audio de Majo y "Llena"
  P3i: inserto("sala", 860, 1300, 540, 1060, 34, { camara: true, funda: 0x16243d }),     // 19:01: el mensaje de Majo
  P5: inserto("sala", 860, 1300, 540, 1060, 34, { camara: true, funda: 0x16243d }),      // 19:04: la notificación de Rodri
  Q1: inserto("living", 860, 1420, 540, 1050, 34, { camara: true, funda: 0x365f28 }),    // el mapa en el celular de Majo
  Q1s: inserto("living", 860, 1420, 540, 1050, 34, { camara: true, funda: 0x2c4268 }),   // el celular de Sole: lista de espera
  Q2: inserto("oficina", 860, 1300, 540, 1060, 34, { camara: true, funda: 0x8a4a8a }),   // el recordatorio a Lucía
  Q2t: inserto("recepcion", 930, 1260, 540, 960, 20, {}),                                // la tablet de la recepción
  Q2s: inserto("living", 860, 1300, 540, 1060, 34, { camara: true, funda: 0x2c4268 }),   // el aviso a Sole
  Q4: inserto("recepcion", 940, 1300, 540, 960, 20, {}),                                 // el panel de noviembre
};
INS.Q1c = INS.Q1;
const cacheIns = {};
function pintar(clave, I, dibujo) { if (cacheIns[I.cel.tex.uuid] === clave) return; cacheIns[I.cel.tex.uuid] = clave; const x = I.cel.tex.userData.x; x.setTransform(1, 0, 0, 1, 0, 0); dibujo(x, I.cel.IW, I.cel.IH, I.cel.k); I.cel.tex.needsUpdate = true; }
let cCelM = "", cCelJ = "";
function dibujarInterfaz(t, pa) {
  // el celular de Mauro (en la mano en P1, en el soporte en P5)
  const q = (v) => Math.round(v * 8) / 8;
  if (pa === "P1") { const l = msgsP1(t), k = `p1-${l.length}`; if (k !== cCelM) { cCelM = k; dibujarChat(celMT.userData.x, 420, 860, l, 0.62, "38 participantes"); celMT.needsUpdate = true; } }
  else if (pa === "P5c") { const k = "p5"; if (k !== cCelM) { cCelM = k; dibujarBloqueo(celMT.userData.x, 420, 860, 0.5, true); celMT.needsUpdate = true; } }
  if (pa === "P5") { const n = t >= T.rodri - 0.05; pintar(`b${n}`, INS.P5, (x, W, H, k) => dibujarBloqueo(x, W, H, k * 1.02, n)); }
  if (pa === "P1b") { const l = msgsP1b(t); pintar(JSON.stringify(l.map((m) => [m.ver, q(m.prog ?? 0), m.leido])), INS.P1b, (x, W, H, k) => dibujarChat(x, W, H, l, k * 1.05, "Majo, Sole, Rodri y 35 más")); }
  if (pa === "P3i") pintar("p3i", INS.P3i, (x, W, H, k) => dibujarChat(x, W, H, msgsP3i(), k * 1.08, "19:01"));
  if (pa === "Q1" || pa === "Q1c") { const f = { tocado: t >= T.reserva7 ? 2 : t >= T.toca7 ? 1 : 0, ocup: t >= T.ocupa[1] ? 2 : t >= T.ocupa[0] ? 1 : 0 }; pintar(JSON.stringify(f), INS.Q1, (x, W, H, k) => dibujarReserva(x, W, H, k, f)); }
  if (pa === "Q1s") { const f = t >= T.espera ? 2 : t >= T.tocaEspera ? 1 : 0; pintar(`e${f}`, INS.Q1s, (x, W, H, k) => dibujarEspera(x, W, H, k, f)); }
  if (pa === "Q2") { const f = t >= T.libera + 0.18 ? 2 : t >= T.libera ? 1 : 0; pintar(`r${f}`, INS.Q2, (x, W, H, k) => dibujarMensajeApp(x, W, H, k, { hola: "Hola, Lucía.", lineas: [["Hoy spinning 19:00"], ["Tu bici: 4", 900, 80], ["¿Venís?"]], botones: ["Voy ✓", "Liberar mi bici"], apretado: 1, f, okTxt: "Bici 4 liberada", okSub: "Gracias por avisar" })); }
  if (pa === "Q2t") { const f = t >= T.libre4 ? 1 : 0; pintar(`t${f}`, INS.Q2t, (x, W, H, k) => dibujarTablet(x, W, H, k * 0.93, f)); }
  if (pa === "Q2s") { const f = t >= T.reserva4 ? 2 : t >= T.quiero ? 1 : 0; pintar(`s${f}`, INS.Q2s, (x, W, H, k) => dibujarMensajeApp(x, W, H, k, { hola: "Hola, Sole.", lineas: [["Se liberó la bici 4"], ["hoy 19:00", 700, 56], ["¿La querés?", 900, 74]], botones: ["La quiero"], apretado: 0, f, okTxt: "Bici 4 reservada", okSub: "martes 19:00" })); }
  if (pa === "Q4") { const e = { filas: T.filas.filter((f) => t >= f).length, gira: q(eio(sg(t, T.gira[0], T.gira[1]))) }; pintar(JSON.stringify(e), INS.Q4, (x, W, H, k) => dibujarPanelMes(x, W, H, k * 0.95, e)); }
  // el celular de Majo en el sofá: el mapa con "Quedan 3"
  if (pa === "Q1b" && cCelJ !== "q") { cCelJ = "q"; const x = celJT.userData.x; x.save(); x.scale(420 / 860, 860 / 1420); dibujarReserva(x, 860, 1420, 1, { tocado: 0, ocup: 0 }); x.restore(); celJT.needsUpdate = true; }
}
