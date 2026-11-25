
// ===== 40-interfaz.js: las pantallas (chat de Don Tano, el celular de Martín con el menú de Lucía, el tablero, el mapa de
// Sabri, la notificación, el panel), los insertos pegados a la cámara y las tarjetas (globos, chips, rótulos) =====
const fila = (x, W, y, a, b, { ok = false, color = "#0b1220", h = 104, fondo = "#ffffff" } = {}) => {
  x.fillStyle = fondo; x.strokeStyle = "#16243d"; x.lineWidth = 5; x.beginPath(); x.roundRect(30, y, W - 60, h, 22); x.fill(); x.stroke();
  x.fillStyle = "#16243d"; x.textAlign = "left"; x.textBaseline = "middle"; ajustar(x, a, 700, 46, W * 0.55); x.fillText(a, 60, y + h / 2 + 2);
  x.fillStyle = color; x.textAlign = "right"; ajustar(x, b, 900, 50, W * 0.38); x.fillText(b, W - (ok ? 124 : 60), y + h / 2 + 2);
  if (ok) { x.fillStyle = "#5ce611"; x.beginPath(); x.arc(W - 80, y + h / 2, 28, 0, 7); x.fill(); tilde(x, W - 79, y + h / 2 + 1, 28, "#0b1220"); }
};
const cabecera = (x, W, titulo, sub = null, inicial = null, colorIni = "#5ce611") => {
  x.fillStyle = "#16243d"; x.fillRect(0, 0, W, 170); x.fillStyle = "#5ce611"; x.fillRect(0, 170, W, 10);
  let tx = 40; if (inicial) { x.fillStyle = colorIni; x.beginPath(); x.arc(92, 85, 54, 0, 7); x.fill(); x.fillStyle = "#0b1220"; x.textAlign = "center"; x.textBaseline = "middle"; x.font = F(900, 56); x.fillText(inicial, 92, 88); tx = 168; }
  x.fillStyle = "#efeee5"; x.textAlign = "left"; x.textBaseline = "middle"; ajustar(x, titulo, 800, 54, W - tx - 30); x.fillText(titulo, tx, sub ? 64 : 88);
  if (sub) { x.font = F(700, 38); x.fillStyle = "#cfeebc"; x.fillText(sub, tx + 2, 124); }
};
const onda = (x, X, Y, w, h, k, color, fondo = "#b4b2a3") => { const n = 22; for (let i = 0; i < n; i++) { const a = 0.3 + 0.7 * Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.6)); x.fillStyle = i / n < k ? color : fondo; x.fillRect(X + (i * w) / n, Y - (a * h) / 2, (w / n) * 0.6, a * h); } };
// ---- el celular del mostrador de Tano: los mensajes que se apilan (n), el contador (cont), el micrófono (mic: 0/1) y el
// de Martín arriba (mi: 0/1) ----
const MSGS = [["C", "Caro", "¿Hacen envíos?"], ["J", "Juan P.", "¿Cuánto demora?"], ["V", "Vale", "Hola??"], ["S", "Seba", "¿Están abiertos?"], ["R", "Rocío", "¿Me pasás el menú?"]];
const COLS_AV = ["#b9bec4", "#cfeebc", "#d9d7c9", "#b9cde0", "#e9c9a8", "#c7655b"];
function dibujarChatTano(x, W, H, { n = 0, cont = 9, mic = 0, mi = 0, seg = "0:01" } = {}) {
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, W, H);
  x.fillStyle = "#16243d"; x.fillRect(0, 0, W, 170); x.fillStyle = "#5ce611"; x.fillRect(0, 170, W, 10);
  x.fillStyle = "#efeee5"; x.textAlign = "left"; x.textBaseline = "middle"; x.font = F(800, 58); x.fillText("Mensajes", 40, 88);
  // el contador rojo apagado
  x.font = F(900, 58); const cw = Math.max(110, x.measureText(String(cont)).width + 60); x.fillStyle = "#c7655b"; x.beginPath(); x.roundRect(W - 40 - cw, 44, cw, 88, 44); x.fill(); x.fillStyle = "#ffffff"; x.textAlign = "center"; x.fillText(String(cont), W - 40 - cw / 2, 90);
  // las filas: la más nueva arriba
  const filas = [];
  if (mi) filas.push(["M", "Martín", "¿Y mi pizza?", true]);
  for (let i = n - 1; i >= 0; i--) filas.push([...MSGS[i], false]);
  filas.slice(0, 6).forEach(([ini, nom, txt, rojo], k) => {
    const y = 206 + k * 152, h = 136;
    x.fillStyle = rojo ? "#f6e1dd" : "#ffffff"; x.strokeStyle = rojo ? "#c7655b" : "#b4b2a3"; x.lineWidth = 5; x.beginPath(); x.roundRect(20, y, W - 40, h, 26); x.fill(); x.stroke();
    x.fillStyle = COLS_AV[(ini.charCodeAt(0) + k) % COLS_AV.length]; if (rojo) x.fillStyle = "#c7655b"; x.beginPath(); x.arc(86, y + h / 2, 46, 0, 7); x.fill();
    x.fillStyle = rojo ? "#ffffff" : "#0b1220"; x.textAlign = "center"; x.font = F(900, 46); x.fillText(ini, 86, y + h / 2 + 3);
    x.textAlign = "left"; x.fillStyle = "#16243d"; x.font = F(700, 38); x.fillText(nom, 152, y + 40);
    x.fillStyle = rojo ? "#c7655b" : "#0b1220"; ajustar(x, txt, 800, 50, W - 260); x.fillText(txt, 152, y + 94);
    x.fillStyle = "#c7655b"; x.beginPath(); x.arc(W - 64, y + h / 2, 18, 0, 7); x.fill();
  });
  // abajo: el audio que graba (el micrófono apretado)
  const yb = H - 170;
  x.fillStyle = "#16243d"; x.fillRect(0, yb, W, 170);
  if (mic) {
    x.fillStyle = "#c7655b"; x.beginPath(); x.arc(64, yb + 85, 16, 0, 7); x.fill();
    x.fillStyle = "#efeee5"; x.textAlign = "left"; x.font = F(800, 50); x.fillText(seg, 96, yb + 88);
    onda(x, 230, yb + 85, W - 440, 70, 1, "#efeee5");
    x.fillStyle = "#5ce611"; x.beginPath(); x.arc(W - 96, yb + 85, 66, 0, 7); x.fill();
  } else { x.fillStyle = "#efeee5"; x.beginPath(); x.roundRect(30, yb + 40, W - 220, 90, 45); x.fill(); x.fillStyle = "#8f969f"; x.textAlign = "left"; x.font = F(700, 42); x.fillText("Mensaje", 70, yb + 88); x.fillStyle = "#5ce611"; x.beginPath(); x.arc(W - 96, yb + 85, 58, 0, 7); x.fill(); }
  // el micrófono (cápsula navy)
  x.fillStyle = "#0b1220"; x.beginPath(); x.roundRect(W - 112, yb + 52, 32, 50, 16); x.fill(); x.fillRect(W - 98, yb + 104, 4, 16); x.fillRect(W - 112, yb + 118, 32, 5);
}
// ---- el celular de Martín (Q2): e = { pant: "chat" | "menu" | "dir" | "pago", audio (0..1), cant: [muzza, fainá],
// tipeo (0..1), sug (0/1), pin (0..1), pago (0 | 1 toca | 2 pagado) } ----
const PLATOS = [["Muzza", "$ 520", "muzza"], ["Fugazzeta", "$ 580", "fuga"], ["Jamón y morrón", "$ 610", "jym"], ["Fainá", "$ 110", "faina"]];
function fotoPlato(x, cx, cy, r, tipo) {
  if (tipo === "faina") { x.fillStyle = "#e3a43a"; x.beginPath(); x.roundRect(cx - r, cy - r * 0.75, r * 2, r * 1.5, 10); x.fill(); x.fillStyle = "#b5701f"; for (const [a, b] of [[-0.4, -0.2], [0.3, 0.3], [0.1, -0.4], [-0.3, 0.35]]) { x.beginPath(); x.arc(cx + a * r, cy + b * r, r * 0.16, 0, 7); x.fill(); } return; }
  x.fillStyle = "#c7843a"; x.beginPath(); x.arc(cx, cy, r, 0, 7); x.fill(); x.fillStyle = "#ffd75e"; x.beginPath(); x.arc(cx, cy, r * 0.84, 0, 7); x.fill();
  const pts = [[0.4, 0.1], [-0.35, 0.3], [0.05, -0.45], [-0.2, -0.15], [0.3, -0.35], [-0.45, -0.2]];
  if (tipo === "muzza") { x.fillStyle = "#5c7a26"; for (const [a, b] of pts) { x.beginPath(); x.ellipse(cx + a * r, cy + b * r, r * 0.11, r * 0.08, 0.3, 0, 7); x.fill(); } }
  if (tipo === "fuga") { x.strokeStyle = "#f4f0e0"; x.lineWidth = r * 0.07; for (const [a, b] of pts) { x.beginPath(); x.arc(cx + a * r, cy + b * r, r * 0.13, 0.3, 2.8); x.stroke(); } }
  if (tipo === "jym") { for (const [a, b] of pts) { x.fillStyle = "#e9a3a0"; x.fillRect(cx + a * r - r * 0.12, cy + b * r - r * 0.06, r * 0.24, r * 0.12); } x.fillStyle = "#c9512f"; for (const [a, b] of pts.slice(0, 3)) x.fillRect(cx + b * r, cy + a * r, r * 0.08, r * 0.25); }
}
function dibujarMapa(x, X, Y, w, h, { pin = 1, ruta = 0, etiqueta = null } = {}) {
  x.save(); x.beginPath(); x.roundRect(X, Y, w, h, 24); x.clip();
  x.fillStyle = "#b9cde0"; x.fillRect(X, Y, w, h);   // las calles (navy claro)
  x.fillStyle = "#efeee5"; const bw = w / 4.2, bh = h / 3.4;
  for (let i = -1; i < 5; i++) for (let j = -1; j < 4; j++) x.fillRect(X + i * bw + (j % 2 ? bw * 0.35 : 0) + 14, Y + j * bh + 14, bw - 28, bh - 28);
  x.fillStyle = "#cfeebc"; x.fillRect(X + bw * 2 + 14, Y + bh * 2 + 14, bw - 28, bh - 28);   // una plaza
  const px = X + w * 0.62, py = Y + h * 0.42;
  if (ruta > 0) { x.strokeStyle = "#16243d"; x.lineWidth = 14; x.lineCap = "round"; x.lineJoin = "round"; x.setLineDash([]); x.beginPath(); const R = [[X + w * 0.1, Y + h * 0.92], [X + w * 0.1, Y + h * 0.66], [X + w * 0.45, Y + h * 0.66], [X + w * 0.45, py + 40], [px, py + 40]]; x.moveTo(...R[0]); for (let i = 1; i < R.length; i++) x.lineTo(...R[i]); x.stroke(); x.fillStyle = "#16243d"; x.beginPath(); x.arc(X + w * 0.1, Y + h * 0.92, 20, 0, 7); x.fill(); }
  x.restore();
  if (pin > 0) {
    const yy = py - (1 - eo(cl(pin))) * 160, s = 1;
    x.fillStyle = "rgba(11,18,32,0.25)"; x.beginPath(); x.ellipse(px, py + 44, 26 * cl(pin), 9 * cl(pin), 0, 0, 7); x.fill();
    x.fillStyle = "#5ce611"; x.strokeStyle = "#0b1220"; x.lineWidth = 7; x.beginPath(); x.arc(px, yy - 34 * s, 34 * s, Math.PI * 0.82, Math.PI * 2.18); x.lineTo(px, yy + 40 * s); x.closePath(); x.fill(); x.stroke();
    x.fillStyle = "#0b1220"; x.beginPath(); x.arc(px, yy - 34 * s, 12 * s, 0, 7); x.fill();
  }
  if (etiqueta) { x.font = F(800, 40); const tw = x.measureText(etiqueta).width + 44; x.fillStyle = "#0b1220"; x.beginPath(); x.roundRect(X + w / 2 - tw / 2, Y + h - 80, tw, 64, 32); x.fill(); x.fillStyle = "#efeee5"; x.textAlign = "center"; x.textBaseline = "middle"; x.fillText(etiqueta, X + w / 2, Y + h - 47); }
}
function dibujarMartin(x, W, H, e) {
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, W, H); x.textBaseline = "middle";
  if (e.pant === "chat") {
    cabecera(x, W, "Pizzería Don Tano", "en línea", "T", "#b9bec4");
    const burb = (y, txt, hora, mio = true, h = 0) => { x.font = F(800, 48); const ls = renglones(x, txt, W - 220); const bh = h || 60 + ls.length * 62; const bx = mio ? 110 : 30, bw = W - 140; x.fillStyle = mio ? "#cfeebc" : "#ffffff"; x.strokeStyle = "#16243d"; x.lineWidth = 5; x.beginPath(); x.roundRect(bx, y, bw, bh, 28); x.fill(); x.stroke(); x.fillStyle = "#0b1220"; x.textAlign = "left"; ls.forEach((l, i) => x.fillText(l, bx + 30, y + 52 + i * 62)); x.fillStyle = "#16243d"; x.font = F(700, 32); x.textAlign = "right"; x.fillText(hora, bx + bw - 24, y + bh - 28); return y + bh + 26; };
    let y = 220;
    y = burb(y, "Una muzza y dos fainá a Duvimioso Terra 1432", "21:02");
    y = burb(y, "¿Y mi pizza?", "22:05");
    // el audio que llega de Don Tano
    x.fillStyle = "#ffffff"; x.strokeStyle = "#16243d"; x.lineWidth = 5; x.beginPath(); x.roundRect(30, y, W - 140, 150, 28); x.fill(); x.stroke();
    x.fillStyle = "#16243d"; x.beginPath(); x.arc(110, y + 75, 46, 0, 7); x.fill(); x.fillStyle = "#efeee5";
    if (e.audio > 0 && e.audio < 1) { x.fillRect(94, y + 52, 12, 46); x.fillRect(114, y + 52, 12, 46); } else { x.beginPath(); x.moveTo(96, y + 50); x.lineTo(132, y + 75); x.lineTo(96, y + 100); x.closePath(); x.fill(); }
    onda(x, 180, y + 70, W - 420, 64, e.audio, "#16243d"); x.fillStyle = "#16243d"; x.font = F(800, 40); x.textAlign = "left"; x.fillText("0:01", 180, y + 128); x.textAlign = "right"; x.font = F(700, 32); x.fillText("22:15", W - 134, y + 128);
    return;
  }
  cabecera(x, W, "Lucía Pizzas · Pedí acá", "Abierto · Envío 30-40 min", "L");
  if (e.pant === "menu") {
    PLATOS.forEach(([n, p, tipo], i) => {
      const y = 205 + i * 196, h = 178, c = tipo === "muzza" ? e.cant[0] : tipo === "faina" ? e.cant[1] : 0;
      x.fillStyle = c ? "#ecf8e2" : "#ffffff"; x.strokeStyle = c ? "#3fa60a" : "#b4b2a3"; x.lineWidth = 6; x.beginPath(); x.roundRect(24, y, W - 48, h, 28); x.fill(); x.stroke();
      fotoPlato(x, 112, y + h / 2, 64, tipo);
      x.fillStyle = "#0b1220"; x.textAlign = "left"; ajustar(x, n, 800, 52, W - 420); x.fillText(n, 200, y + 62); x.fillStyle = "#16243d"; x.font = F(900, 50); x.fillText(p, 200, y + 128);
      // el botón +, y la cantidad
      x.fillStyle = "#5ce611"; x.strokeStyle = "#0b1220"; x.lineWidth = 6; x.beginPath(); x.arc(W - 96, y + h / 2, 52, 0, 7); x.fill(); x.stroke(); x.fillStyle = "#0b1220"; x.fillRect(W - 120, y + h / 2 - 7, 48, 14); x.fillRect(W - 103, y + h / 2 - 24, 14, 48);
      if (c) { x.fillStyle = "#0b1220"; x.beginPath(); x.arc(W - 200, y + h / 2, 40, 0, 7); x.fill(); x.fillStyle = "#efeee5"; x.textAlign = "center"; x.font = F(900, 50); x.fillText(String(c), W - 200, y + h / 2 + 3); }
    });
    const n = e.cant[0] + e.cant[1];
    if (n) { const tot = e.cant[0] * 520 + e.cant[1] * 110; const y = H - 170; x.fillStyle = "#16243d"; x.beginPath(); x.roundRect(24, y, W - 48, 146, 36); x.fill(); x.fillStyle = "#efeee5"; x.textAlign = "left"; const tx = `${e.cant[0]} Muzza · ${e.cant[1]} Fainá`; ajustar(x, tx, 800, 50, W - 330); x.fillText(tx, 60, y + 74); x.fillStyle = "#5ce611"; x.textAlign = "right"; x.font = F(900, 58); x.fillText(plata(tot), W - 60, y + 76); }
    return;
  }
  if (e.pant === "dir") {
    x.fillStyle = "#0b1220"; x.textAlign = "left"; x.font = F(800, 50); x.fillText("Dirección", 40, 246);
    x.fillStyle = "#ffffff"; x.strokeStyle = "#16243d"; x.lineWidth = 6; x.beginPath(); x.roundRect(30, 290, W - 60, 116, 26); x.fill(); x.stroke();
    const txt = "Duvi".slice(0, Math.round(4 * cl(e.tipeo))); x.fillStyle = "#0b1220"; x.font = F(800, 56); x.fillText(txt, 66, 350); if (!e.sug) { const w = x.measureText(txt).width; x.fillRect(70 + w, 318, 5, 62); }
    if (e.sug) { x.fillStyle = "#ecf8e2"; x.strokeStyle = "#3fa60a"; x.lineWidth = 6; x.beginPath(); x.roundRect(30, 428, W - 60, 116, 26); x.fill(); x.stroke(); x.fillStyle = "#0b1220"; ajustar(x, "Duvimioso Terra 1432", 900, 54, W - 210); x.fillText("Duvimioso Terra 1432", 66, 488); x.fillStyle = "#5ce611"; x.beginPath(); x.arc(W - 92, 486, 34, 0, 7); x.fill(); tilde(x, W - 91, 487, 34, "#0b1220"); }
    dibujarMapa(x, 30, 570, W - 60, H - 600, { pin: e.pin });
    return;
  }
  // pago
  x.fillStyle = "#ffffff"; x.strokeStyle = "#16243d"; x.lineWidth = 6; x.beginPath(); x.roundRect(30, 210, W - 60, 300, 30); x.fill(); x.stroke();
  x.textAlign = "left"; x.fillStyle = "#0b1220"; x.font = F(800, 50); x.fillText("1 Muzza", 66, 270); x.fillText("2 Fainá", 66, 340); x.textAlign = "right"; x.fillText("$ 520", W - 66, 270); x.fillText("$ 220", W - 66, 340);
  x.textAlign = "left"; x.fillStyle = "#16243d"; x.font = F(700, 42); ajustar(x, "Envío · Duvimioso Terra 1432", 700, 42, W - 130); x.fillText("Envío · Duvimioso Terra 1432", 66, 430);
  x.fillStyle = "#0b1220"; x.font = F(800, 56); x.textAlign = "left"; x.fillText("Total", 40, 600); x.textAlign = "right"; x.font = F(900, 74); x.fillText("$ 740", W - 40, 600);
  if (e.pago < 2) { x.fillStyle = e.pago === 1 ? "#3fa60a" : "#5ce611"; x.strokeStyle = "#0b1220"; x.lineWidth = 8; x.beginPath(); x.roundRect(30, 680, W - 60, 170, 85); x.fill(); x.stroke(); x.fillStyle = "#0b1220"; x.textAlign = "center"; x.font = F(900, 84); x.fillText("Pagar", W / 2, 768); if (e.pago === 1) { x.fillStyle = "rgba(11,18,32,0.25)"; x.beginPath(); x.arc(W / 2 + 170, 765, 50, 0, 7); x.fill(); } }
  else { x.fillStyle = "#16243d"; x.beginPath(); x.roundRect(30, 660, W - 60, 330, 40); x.fill(); x.fillStyle = "#5ce611"; x.beginPath(); x.arc(122, 760, 60, 0, 7); x.fill(); tilde(x, 124, 762, 62, "#0b1220"); x.fillStyle = "#efeee5"; x.textAlign = "left"; x.font = F(900, 76); x.fillText("Pagado", 210, 740); x.fillStyle = "#5ce611"; ajustar(x, "Pedido #47", 800, 54, W - 260); x.fillText("Pedido #47", 210, 812); x.fillStyle = "#efeee5"; ajustar(x, "Llega 22:55", 800, 60, W - 120); x.fillText("Llega 22:55", 66, 920); }
}
// ---- la notificación en el celular de Martín (Q4) ----
function dibujarNoti(x, W, H) {
  x.fillStyle = "#16243d"; x.fillRect(0, 0, W, H);
  x.fillStyle = "#efeee5"; x.textAlign = "center"; x.textBaseline = "middle"; x.font = F(800, 150); x.fillText("22:54", W / 2, 230); x.font = F(700, 44); x.fillText("viernes", W / 2, 340);
  const y = 430; x.fillStyle = "#efeee5"; x.beginPath(); x.roundRect(26, y, W - 52, 330, 40); x.fill();
  x.fillStyle = "#b9bec4"; x.beginPath(); x.arc(100, y + 84, 46, 0, 7); x.fill(); x.fillStyle = "#0b1220"; x.font = F(900, 50); x.fillText("T", 100, y + 88);
  x.textAlign = "left"; x.fillStyle = "#16243d"; ajustar(x, "Pizzería Don Tano", 800, 46, W - 240); x.fillText("Pizzería Don Tano", 166, y + 70); x.font = F(700, 34); x.fillText("ahora", 166, y + 118);
  x.fillStyle = "#c7655b"; x.font = F(900, 60); x.fillText("Disculpá,", 56, y + 206); x.fillText("¿calle qué?", 56, y + 280);
  // la caja de pizza abierta, abajo (la foto de fondo de pantalla: la muzza)
  fotoPlato(x, W / 2, H - 230, 150, "muzza");
}
// ---- el tablero de pedidos de Lucía (Q3): f = 0 (En horno), 1 (Listo), 2 (En camino) para el #47 ----
function dibujarTablero(x, W, H, f) {
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, W, H); x.textBaseline = "middle";
  x.fillStyle = "#16243d"; x.fillRect(0, 0, W, 120); x.fillStyle = "#5ce611"; x.fillRect(0, 120, W, 8);
  x.fillStyle = "#efeee5"; x.textAlign = "left"; ajustar(x, "Pedidos · viernes", 800, 60, W - 60); x.fillText("Pedidos · viernes", 34, 62);
  const cols = ["En horno", "Listo", "En camino"], cw = (W - 40) / 3;
  const fijos = [[0, "#46"], [1, "#45"], [2, "#44"]];
  cols.forEach((c, i) => { const X = 20 + i * cw; x.fillStyle = i === 2 ? "#cfeebc" : "#d9d7c9"; x.beginPath(); x.roundRect(X + 8, 146, cw - 16, H - 166, 22); x.fill(); x.fillStyle = "#0b1220"; x.textAlign = "center"; ajustar(x, c, 900, 50, cw - 40); x.fillText(c, X + cw / 2, 196); });
  const tarjeta = (i, k, num, nom, dir, ok, glow) => { const X = 20 + i * cw + 20, Y = 236 + k * 250, w = cw - 40, h = 230; x.fillStyle = glow ? "#16243d" : "#ffffff"; x.strokeStyle = glow ? "#5ce611" : "#16243d"; x.lineWidth = glow ? 9 : 5; x.beginPath(); x.roundRect(X, Y, w, h, 20); x.fill(); x.stroke(); x.textAlign = "left"; x.fillStyle = glow ? "#5ce611" : "#0b1220"; x.font = F(900, 62); x.fillText(num, X + 22, Y + 52); x.fillStyle = glow ? "#efeee5" : "#16243d"; ajustar(x, nom, 800, 40, w - 40); x.fillText(nom, X + 22, Y + 112); if (dir) { ajustar(x, dir, 700, 30, w - 40); x.fillText(dir, X + 22, Y + 156); } if (ok) { x.fillStyle = "#5ce611"; ajustar(x, "Pagado ✓", 900, 36, w - 40); x.fillText("Pagado ✓", X + 22, Y + 200); } };
  fijos.forEach(([i, n]) => tarjeta(i, 1, n, ["Pablo", "Inés", "Rodri"][i], null, true, false));
  tarjeta(f, 0, "#47", "Martín", "Duvimioso Terra 1432", true, true);
}
// ---- el panel del viernes (Q5): e = { filas 0..3, gira 0..1, f47 0/1 } ----
function dibujarPanel(x, W, H, e) {
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, W, H); x.textBaseline = "middle";
  x.fillStyle = "#16243d"; x.fillRect(0, 0, W, 116); x.fillStyle = "#5ce611"; x.fillRect(0, 116, W, 8);
  x.fillStyle = "#efeee5"; x.textAlign = "left"; ajustar(x, "Viernes · Lucía Pizzas", 800, 58, W - 60); x.fillText("Viernes · Lucía Pizzas", 30, 60);
  x.fillStyle = "#16243d"; x.beginPath(); x.roundRect(24, 140, W * 0.38, 190, 26); x.fill(); x.fillStyle = "#5ce611"; x.textAlign = "center"; x.font = F(900, 110); x.fillText("64", 24 + W * 0.19, 222); x.fillStyle = "#efeee5"; x.font = F(800, 40); x.fillText("pedidos", 24 + W * 0.19, 298);
  const filas = [["Pagados online", "64"], ["Dirección con mapa", "64"]];
  filas.forEach(([a, b], i) => { const X = W * 0.38 + 44, Y = 140 + i * 100, w = W - X - 24; const ok = i < e.filas; x.fillStyle = ok ? "#ecf8e2" : "#ffffff"; x.strokeStyle = ok ? "#3fa60a" : "#b4b2a3"; x.lineWidth = 5; x.beginPath(); x.roundRect(X, Y, w, 88, 20); x.fill(); x.stroke(); x.fillStyle = "#0b1220"; x.textAlign = "left"; ajustar(x, a, 800, 40, w - 200); x.fillText(a, X + 22, Y + 46); if (ok) { x.textAlign = "right"; x.font = F(900, 50); x.fillText(b, X + w - 80, Y + 46); x.fillStyle = "#5ce611"; x.beginPath(); x.arc(X + w - 40, Y + 44, 24, 0, 7); x.fill(); tilde(x, X + w - 39, Y + 45, 24, "#0b1220"); } });
  // los dos que giran a 0: el 3 y el 26 (rojo apagado, "Don Tano, enfrente") → 0 verde
  [["Pizzas que volvieron", "3"], ["Sin contestar", "26"]].forEach(([a, v0], i) => {
    const Y = 356 + i * 132, X = 24, w = W - 48;
    x.fillStyle = "#ffffff"; x.strokeStyle = "#0b1220"; x.lineWidth = 5; x.beginPath(); x.roundRect(X, Y, w, 116, 22); x.fill(); x.stroke();
    x.fillStyle = "#16243d"; x.textAlign = "left"; ajustar(x, a, 800, 48, w * 0.6); x.fillText(a, X + 26, Y + 58);
    if (e.filas > 2 && e.gira < 0.5) { x.fillStyle = "#c7655b"; x.font = F(700, 28); x.textAlign = "right"; x.fillText("Don Tano, enfrente", X + w - 190, Y + 62); }
    const g = e.filas > 2 ? e.gira : 0, sx = Math.abs(Math.cos(g * Math.PI)), val = g < 0.5 ? v0 : "0", col = g < 0.5 ? "#c7655b" : "#3fa60a";
    if (e.filas > 2) { x.save(); x.translate(X + w - 90, Y + 60); x.scale(Math.max(0.05, sx), 1); x.fillStyle = col; x.textAlign = "center"; x.font = F(900, 86); x.fillText(val, 0, 2); x.restore(); }
  });
  if (e.f47) { const Y = 640; x.fillStyle = "#16243d"; x.beginPath(); x.roundRect(24, Y, W - 48, 100, 24); x.fill(); x.fillStyle = "#efeee5"; x.textAlign = "left"; const t = "#47 · Martín · cliente nuevo ✓ · entregado 22:54"; ajustar(x, t, 800, 40, W - 100); x.fillText(t, 50, Y + 52); }
}
// ---- los insertos pegados a la cámara (de vete-racion): fondo plano + celular grande ----
function crearFondoInserto(g, [c1, c2, c3]) {
  const bg = new THREE.Mesh(new THREE.PlaneGeometry(1400 / PXK, 2400 / PXK), new THREE.MeshBasicMaterial({ color: c1 })); bg.position.z = -0.06; g.add(bg);
  const pc = new THREE.Mesh(new THREE.PlaneGeometry(1400 / PXK, 1300 / PXK), new THREE.MeshBasicMaterial({ color: c2 })); pc.position.set(0, -560 / PXK, -0.058); g.add(pc);
  const pi = new THREE.Mesh(new THREE.PlaneGeometry(1400 / PXK, 420 / PXK), new THREE.MeshBasicMaterial({ color: c3 })); pi.position.set(0, -1000 / PXK, -0.057); g.add(pi);
}
function crearCelInserto(IW, IH, cx, cy, marcoR = 30, opc = {}) {
  const tex = lienzo(IW, IH, () => {});
  const g = new THREE.Group();
  const sombra = new THREE.Mesh(rbox((IW + 2 * marcoR) / PXK, (IH + 2 * marcoR) / PXK, 0.01, 80 / PXK, 3), new THREE.MeshBasicMaterial({ color: 0x050a14 })); sombra.position.set((cx - 540 + 18) / PXK, (960 - cy - 22) / PXK, -0.04); g.add(sombra);
  const marco = new THREE.Mesh(rbox((IW + 2 * marcoR) / PXK, (IH + 2 * marcoR) / PXK, 0.01, (opc.radio ?? 80) / PXK, 3), new THREE.MeshBasicMaterial({ color: opc.funda ?? 0x0b1220 })); marco.position.set((cx - 540) / PXK, (960 - cy) / PXK, -0.03); g.add(marco);
  const pan = new THREE.Mesh(new THREE.PlaneGeometry(IW / PXK, IH / PXK), new THREE.MeshBasicMaterial({ map: tex, toneMapped: false })); pan.position.set((cx - 540) / PXK, (960 - cy) / PXK, -0.02); g.add(pan);
  if (opc.camara) { const cam = new THREE.Mesh(new THREE.CircleGeometry(Math.max(8, marcoR * 0.35) / PXK, 20), new THREE.MeshBasicMaterial({ color: 0x050a14 })); cam.position.set((cx - 540) / PXK, (960 - cy + IH / 2 + marcoR * 0.5) / PXK, -0.019); g.add(cam); }
  return { g, tex, IW, IH };
}
const FONDO_TANO = [0x365f28, 0xe9e6da, 0x0b1220], FONDO_LIV = [0xe9e5d6, 0x365f28, 0xb98d5e], FONDO_LUC = [0x16243d, 0xe9e6da, 0x0b1220];
function inserto(fondo, IW, IH, cy, marco, opc = {}) { const I = { g: new THREE.Group() }; crearFondoInserto(I.g, opc.sinPiso ? [fondo[0], fondo[1], fondo[1]] : fondo); const c = crearCelInserto(IW, IH, 540, cy, marco, opc); if (opc.esc) { c.g.scale.setScalar(opc.esc); c.g.position.set(0, -((960 - cy) / PXK) * (opc.esc - 1), 0); } if (opc.rot) c.g.rotation.z = opc.rot; I.g.add(c.g);
  I.tex = c.tex; I.IW = IW; I.IH = IH; pegarACamara(I.g, camera, 10); I.g.visible = false; return I; }
const INS_COM = inserto(FONDO_TANO, 760, 1040, 1010, 14, { funda: 0xd9d7c9, radio: 20, rot: 0.04 });   // la comanda (P1, P3)
const INS_CHAT = inserto(FONDO_TANO, 860, 1420, 1130, 34, { camara: true, funda: 0x365f28, esc: 0.86 });           // el celular del mostrador (P2, P4)
const INS_MART = inserto(FONDO_LIV, 860, 1420, 1110, 34, { camara: true, funda: 0x0b1220, esc: 0.88 });            // el celular de Martín (Q2)
const INS_NOTI = inserto(FONDO_LIV, 820, 1360, 1010, 34, { camara: true, funda: 0x0b1220 });            // la notificación (Q4)
const INSERTOS = [INS_COM, INS_CHAT, INS_MART, INS_NOTI];
dibujarNoti(INS_NOTI.tex.userData.x, INS_NOTI.IW, INS_NOTI.IH); INS_NOTI.tex.needsUpdate = true;
// la birome dibujada en el inserto de la comanda (la punta en (px, py))
function biromeDib(x, px, py) { x.save(); x.translate(px, py); x.rotate(-0.55); x.fillStyle = "#efeee5"; x.fillRect(-13, -230, 26, 220); x.fillStyle = "#0b1220"; x.fillRect(-14, -240, 28, 46); x.fillStyle = "#3a3f4a"; x.beginPath(); x.moveTo(-13, -10); x.lineTo(13, -10); x.lineTo(0, 16); x.closePath(); x.fill(); x.restore(); }
let cCom = "", cChat = "", cMart = "", cTab = "";
function dibujarInterfaz(t, pa) {
  // la comanda (3D y el inserto)
  const k1 = sg(t, T.esc1[0], T.esc1[1]), k2 = sg(t, T.esc2[0], T.esc2[1]), circ = sg(t, T.circ[0], T.circ[1]);
  ponerComanda(k1, k2, circ);
  if (pa === "P1i" || pa === "P3i") {
    const key = `${Math.round(k2 * 40)}|${Math.round(circ * 20)}`;
    if (key !== cCom) { cCom = key; const x = INS_COM.tex.userData.x, W = INS_COM.IW, H = INS_COM.IH; x.setTransform(1, 0, 0, 1, 0, 0); const wD = dibujarComanda(x, W, H, 1, k2, circ);
      if (pa === "P1i" && k2 > 0 && k2 < 1) { const u = cl(k2 * 1.6), v = cl(k2 * 1.6 - 0.6), sx = W / 600, sy = H / 820; const px = u < 1 ? (36 + 330 * u) * sx : (36 + 360 * cl(v)) * sx, py = (u < 1 ? 430 : 545) * sy; biromeDib(x, px, py); }
      INS_COM.tex.needsUpdate = true; }
  }
  // el chat de Tano
  const n = T.msgs.filter((m) => t >= m).length, cont = t >= T.cont[2] ? 26 : t >= T.cont[1] ? 17 : 9, mic = (t >= T.mic && t < T.p3) || t >= T.mic2 ? 1 : 0, mi = t >= T.mPizza ? 1 : 0;
  const kC = `${n}|${cont}|${mic}|${mi}`;
  if (kC !== cChat) { cChat = kC; dibujarChatTano(INS_CHAT.tex.userData.x, INS_CHAT.IW, INS_CHAT.IH, { n: t >= T.p3 ? 5 : n, cont: mi ? 27 : cont, mic, mi }); INS_CHAT.tex.needsUpdate = true;
    const xx = pantTano.userData.x; xx.save(); xx.scale(400 / 860, 820 / 1420); dibujarChatTano(xx, 860, 1420, { n: t >= T.p3 ? 5 : n, cont: mi ? 27 : cont, mic, mi }); xx.restore(); pantTano.needsUpdate = true; }
  // el celular de Martín
  const pant = t < T.menu ? "chat" : t < T.dir ? "menu" : t < T.pago ? "dir" : "pago";
  const eM = { pant, audio: Math.round(sg(t, T.audio, T.audio + LEN.t5) * 12) / 12, cant: [t >= T.mas[0] ? 1 : 0, (t >= T.mas[1] ? 1 : 0) + (t >= T.mas[2] ? 1 : 0)], tipeo: Math.round(sg(t, T.tipea[0], T.tipea[1]) * 4) / 4, sug: t >= T.sug ? 1 : 0, pin: Math.round(sg(t, T.pin, T.pin + 0.25) * 8) / 8, pago: t >= T.pagado ? 2 : t >= T.pagar ? 1 : 0 };
  const kM = JSON.stringify(eM);
  if (kM !== cMart) { cMart = kM; dibujarMartin(INS_MART.tex.userData.x, INS_MART.IW, INS_MART.IH, eM); INS_MART.tex.needsUpdate = true;
    const xx = pantMart.userData.x; xx.save(); xx.scale(400 / 860, 820 / 1420); if (t >= T.q4) dibujarNoti(xx, 860, 1420); else dibujarMartin(xx, 860, 1420, eM); xx.restore(); pantMart.needsUpdate = true; }
  // la tablet de Lucía: el tablero (Q1-Q3) o el panel (Q5 en adelante)
  const kT = t >= T.q5 ? `P|${T.filas.filter((f) => t >= f).length}|${Math.round(sg(t, T.gira, T.gira + 0.3) * 10)}|${t >= T.fila47 ? 1 : 0}` : `T|${T.cols.filter((c) => t >= c).length}`;
  if (kT !== cTab) { cTab = kT; const x = pantTab.userData.x;
    if (t >= T.q5) dibujarPanel(x, 1000, 760, { filas: T.filas.filter((f) => t >= f).length, gira: Math.round(sg(t, T.gira, T.gira + 0.3) * 10) / 10, f47: t >= T.fila47 ? 1 : 0 });
    else dibujarTablero(x, 1000, 760, Math.max(0, T.cols.filter((c) => t >= c).length - 1)); pantTab.needsUpdate = true; }
}
// el mapa de Sabri (pantalla de su celular)
{ const x = pantSab.userData.x; x.fillStyle = "#efeee5"; x.fillRect(0, 0, 400, 820); x.save(); x.scale(400 / 860, 820 / 1420); cabecera(x, 860, "Pedido #47", "Duvimioso Terra 1432"); dibujarMapa(x, 30, 210, 800, 1180, { pin: 1, ruta: 1, etiqueta: "8 min" }); x.restore(); pantSab.needsUpdate = true; }
// =====================================================================================================
// LAS TARJETAS DE ESTE REEL (globos, chips, rótulos)
// =====================================================================================================
const chip = (txt, px = 62, fondo = "#16243d", tinta = "#efeee5") => { const med = document.createElement("canvas").getContext("2d"); med.font = F(900, px); const W = Math.round(med.measureText(txt).width + px * 1.1); return crearTarjeta(W, Math.round(px * 1.7), (x, w, h) => { x.fillStyle = tinta; x.textAlign = "center"; x.textBaseline = "middle"; x.font = F(900, px); x.fillText(txt, w / 2, h / 2 + 3); }, { fondo }); };
// el globo que sale del teléfono: mismo globo, con el borde punteado adentro
function crearGloboTel(lineas, px) { const g = crearGlobo(lineas, px); const { W, H } = g.userData; const viejo = g.userData.dibujo; g.userData.punteado = true; redibujar(g, (x, w, h) => { viejo(x, w, h); x.strokeStyle = "#16243d"; x.lineWidth = 6; x.setLineDash([16, 12]); x.beginPath(); x.roundRect(10, 10, w - 20, h - 20, 26); x.stroke(); x.setLineDash([]); }); return g; }
// la mapa de Sabri como tarjeta chica pegada a la cámara
const MAPA_S = crearTarjeta(520, 720, (x, W, H) => { x.save(); x.scale(W / 860, H / 1190); cabecera(x, 860, "Pedido #47", "Duvimioso Terra 1432"); dibujarMapa(x, 30, 210, 800, 960, { pin: 1, ruta: 1, etiqueta: "8 min" }); x.restore(); });
const GL = {
  vie: chip("Viernes, 21:00.", 60), vie2: chip("Viernes, 22:10.", 60), vieL: chip("Viernes, 21:00.", 60), vieQ2: chip("Viernes, 22:15.", 60), vieQ4: chip("Viernes, 22:54.", 60),
  donT: chip("DON TANO", 46, "#efeee5", "#16243d"), luc: chip("LUCÍA", 46, "#5ce611", "#0b1220"),
  t1: crearGlobo(["Una muzza y dos fainá…", "¿Calle [qué?]"], 60),
  m1: crearGloboTel(["¡Duvimioso Terra!"], 64),
  t2: crearGlobo(["Ajá.", "¿Con [be] larga?"], 66),
  conV: crearGloboTel(["¡Con [V] corta!"], 62),
  t3: crearGlobo(["¡Ya [sale!]"], 84),
  rP2a: crearRotulo([["Mensajes sin", "#ff9d92"], ["contestar: 26", "#ff9d92", 62]], 54),
  rP2b: crearRotulo([["Cada uno, un pedido", "#ff9d92"], ["que se fue a otro lado", "#ff9d92"]], 46),
  f1: crearGlobo(["Tano.", "[Dubimioso] no existe."], 62),
  rP3a: crearRotulo([["Pizzas que", "#ff9d92"], ["volvieron hoy: 3", "#ff9d92", 60]], 52),
  rP3b: crearRotulo([["$ 2.220", "#ff9d92", 84]], 84),
  t4: crearGlobo(["[Cenamos.]"], 86),
  t5: crearGlobo(["¡Ya [sale!]"], 84),
  rQ1: crearRotulo([["Los pedidos entran"], ["solos, en orden"]], 52),
  rQ2: crearRotulo([["La dirección la pone él,"], ["con el mapa"]], 48),
  m2: crearGlobo(["¿Ya [está?]"], 86),
  rQ3: crearRotulo([["Pedido pago,"], ["dirección exacta"]], 54),
  s1: crearGlobo(["¿Martín?", "Una muzza y dos [fainá.]"], 62),
  rQ5: crearRotulo([["Panel del viernes"]], 54),
  t6: crearGlobo(["¿Y esa cómo [hace?]"], 70),
};
const GUIAS = [crearGuia(), crearGuia(), crearGuia()];
