
// ===== 10-objetos.js: la muzza, el fainá, la caja, la comanda, la birome, el gancho, el horno, la masa, el casco, la
// mochila, la moto, la impresora, el ticket, el riel =====
const PI = Math.PI;
M.kraft = mat(0xc9a774, 0.85); M.kraftO = mat(0xa98a5a, 0.85); M.gaz = mat(0x365f28, 0.85); M.acero = mat(0xb9bec4, 0.45, { metalness: 0.35 });
M.aceroO = mat(0x8f969f, 0.4, { metalness: 0.45 }); M.madera = mat(0xd9c39a, 0.8); M.masa = mat(0xefe6c8, 0.9); M.marmol = mat(0xe9e6da, 0.5);
M.luz = new THREE.MeshBasicMaterial({ color: 0xfff1d0 }); M.luzHorno = new THREE.MeshBasicMaterial({ color: 0xffd9a0 }); M.negro = mat(0x14181f, 0.7);
// ---------- la muzza uruguaya ----------
const PZ = { masa: mat(0xe2b060, 0.85), borde: mat(0xc7843a, 0.6), queso: mat(0xffd75e, 0.75), dorado: mat(0xe0a64e, 0.5), tomate: mat(0xc9512f, 0.5), aceituna: mat(0x5c7a26, 0.35), hueco: mat(0x1f2a10, 0.6), oregano: mat(0x3d5a1a, 0.8) };
function sector(r0, r1, a0, a1, h, bevel = 0.004) {
  const s = new THREE.Shape();
  if (r0 <= 0) { s.moveTo(0, 0); s.lineTo(r1 * Math.cos(a0), r1 * Math.sin(a0)); s.absarc(0, 0, r1, a0, a1, false); s.lineTo(0, 0); }
  else { s.moveTo(r0 * Math.cos(a0), r0 * Math.sin(a0)); s.lineTo(r1 * Math.cos(a0), r1 * Math.sin(a0)); s.absarc(0, 0, r1, a0, a1, false); s.lineTo(r0 * Math.cos(a1), r0 * Math.sin(a1)); s.absarc(0, 0, r0, a1, a0, true); }
  const g = new THREE.ExtrudeGeometry(s, { depth: h, bevelEnabled: bevel > 0, bevelThickness: bevel, bevelSize: bevel, bevelSegments: 2, curveSegments: 10 });
  g.rotateX(-PI / 2);
  return g;
}
const ACE_G = new THREE.SphereGeometry(0.0135, 12, 8), HUECO_G = new THREE.CircleGeometry(0.0055, 12), DISCO_G = new THREE.CylinderGeometry(1, 1, 0.003, 12);
// una porción (o un pedazo entre r0 y r1): masa + queso + borde inflado + salsa asomando + burbujas + aceituna entera + orégano
function porcion(a0, a1, r0 = 0, r1 = 0.19, conBorde = true, sem = 1) {
  const g = new THREE.Group();
  g.add(mesh(sector(r0, r1, a0, a1, 0.008), PZ.masa));
  const q = mesh(sector(Math.max(0, r0 - 0.001), r1 * 0.88, a0 + 0.01, a1 - 0.01, 0.006, 0.003), PZ.queso); q.position.y = 0.011; g.add(q);
  if (conBorde && r1 > 0.12) {
    const b = mesh(sector(r1 * 0.87, r1, a0, a1, 0.02, 0.008), PZ.borde); g.add(b);
    const sa = mesh(sector(r1 * 0.84, r1 * 0.885, a0 + 0.02, a1 - 0.02, 0.004, 0.002), PZ.tomate); sa.position.y = 0.012; g.add(sa);   // la salsa asoma entre el queso y el borde
  }
  semilla = 97 + sem * 13;
  const am = (a0 + a1) / 2, da = a1 - a0;
  for (let i = 0; i < 4; i++) {   // burbujas doradas
    const rad = lerp(Math.max(r0, 0.03), r1 * 0.78, az()), ang = am + (az() - 0.5) * da * 0.6 * Math.min(1, rad / 0.08), rr2 = 0.01 + az() * 0.009;
    const d = mesh(DISCO_G, PZ.dorado, rad * Math.cos(ang), 0.0185, -rad * Math.sin(ang)); d.scale.set(rr2, 1, rr2 * 0.8); g.add(d);
  }
  const rA = lerp(Math.max(r0, 0.04), r1 * 0.72, 0.6);
  if (rA > r0 + 0.012) {   // la aceituna verde entera, con el hueco
    const ol = mesh(ACE_G, PZ.aceituna, rA * Math.cos(am), 0.021, -rA * Math.sin(am)); ol.scale.set(1, 0.72, 1.25); g.add(ol);
    const h = new THREE.Mesh(HUECO_G, PZ.hueco); h.rotation.x = -PI / 2; h.position.set(rA * Math.cos(am), 0.031, -rA * Math.sin(am)); g.add(h);
  }
  for (let i = 0; i < 7; i++) { const rad = lerp(Math.max(r0, 0.02), r1 * 0.84, az()), ang = am + (az() - 0.5) * da * 0.75; g.add(mesh(new THREE.BoxGeometry(0.007, 0.002, 0.005), PZ.oregano, rad * Math.cos(ang), 0.019, -rad * Math.sin(ang))); }
  return sombras(g);
}
// el fainá: rectángulo naranja dorado, canto liso, la superficie tostada con manchas y pimienta
const fainaT = lienzo(256, 200, (x, w, h) => {
  x.fillStyle = "#e3a43a"; x.fillRect(0, 0, w, h); semilla = 5;
  for (let i = 0; i < 26; i++) { x.fillStyle = `rgba(181,112,31,${0.35 + az() * 0.4})`; x.beginPath(); x.ellipse(az() * w, az() * h, 8 + az() * 20, 6 + az() * 12, az() * 3, 0, 7); x.fill(); }
  x.fillStyle = "#16243d"; for (let i = 0; i < 60; i++) { x.beginPath(); x.arc(az() * w, az() * h, 1.6 + az() * 1.6, 0, 7); x.fill(); }
});
const FAINA_C = mat(0xd89530, 0.7), FAINA_T = new THREE.MeshStandardMaterial({ map: fainaT, roughness: 0.7 });
function crearFaina() { const m = mesh(rbox(0.12, 0.012, 0.1, 0.004, 2), [FAINA_C, FAINA_C, FAINA_T, FAINA_C, FAINA_C, FAINA_C]); return m; }
// la pizza entera (8 porciones) con los dos fainá a caballo; `faltan` = porciones sacadas
function crearMuzza(conFaina = true) {
  const g = new THREE.Group(); g.userData.porciones = [];
  for (let i = 0; i < 8; i++) { const p = porcion((i * PI) / 4 + 0.012, ((i + 1) * PI) / 4 - 0.012, 0, 0.19, true, i); g.add(p); g.userData.porciones.push(p); }
  g.userData.fainas = [];
  if (conFaina) for (const [x, z, r, y] of [[-0.045, 0.02, 0.35, 0.026], [0.05, -0.035, -0.4, 0.038]]) { const f = crearFaina(); f.position.set(x, y, z); f.rotation.set(0, r, y > 0.03 ? 0.06 : 0); g.add(f); g.userData.fainas.push(f); }
  return g;
}
// la porción en la mano: el borde en x = 0, la punta en x = +0,19 (la punta se dobla con `bis`)
function crearPorcionMano() {
  const g = new THREE.Group(), a = 0.37, R = 0.19, H = 0.09;
  const base = porcion(-a, a, R - H - 0.002, R, true, 3); base.position.x = R; base.rotation.y = PI; g.add(base);
  const bis = new THREE.Group(); bis.position.x = H; g.add(bis);
  const punta = porcion(-a, a, 0, R - H, false, 5); punta.position.x = R - H; punta.rotation.y = PI; bis.add(punta);
  // la mordida (Q4): un hueco en la punta = un disco del color del queso tapado por el "aire": se arma achicando la punta
  g.userData = { bis, punta, largo: R, H };
  return sombras(g);
}
// el hilo de queso: un tubo curvo que se afina (se rearma cuando cambia)
const HILO_M = mat(0xffe28a, 0.6);
function crearHilo() { const m = new THREE.Mesh(new THREE.BufferGeometry(), HILO_M); m.castShadow = false; m.userData.k = ""; return m; }
function ponerHilo(m, a, b, k) {
  m.visible = k > 0.02; if (!m.visible) return;
  const key = `${a.x.toFixed(3)}${a.y.toFixed(3)}${a.z.toFixed(3)}${b.x.toFixed(3)}${b.y.toFixed(3)}${b.z.toFixed(3)}${k.toFixed(2)}`; if (key === m.userData.k) return; m.userData.k = key;
  const mid = a.clone().lerp(b, 0.5); mid.y -= 0.03 + a.distanceTo(b) * 0.25;
  const curva = new THREE.QuadraticBezierCurve3(a, mid, b);
  m.geometry.dispose(); m.geometry = new THREE.TubeGeometry(curva, 14, 0.007 * k + 0.003, 8, false);
}
// ---------- la caja de pizza kraft (la tapa con bisagra atrás) ----------
const tapaTex = {};
function texTapa(nombre) {
  return (tapaTex[nombre] ??= lienzo(512, 512, (x, w, h) => {
    x.fillStyle = "#c9a774"; x.fillRect(0, 0, w, h); x.strokeStyle = "#a98a5a"; x.lineWidth = 10; x.strokeRect(16, 16, w - 32, h - 32);
    x.fillStyle = "#0b1220"; x.beginPath(); x.arc(w / 2, 196, 92, 0, 7); x.fill(); x.fillStyle = "#c9a774"; x.beginPath(); x.arc(w / 2, 196, 74, 0, 7); x.fill();
    x.fillStyle = "#0b1220"; for (let i = 0; i < 8; i++) { x.save(); x.translate(w / 2, 196); x.rotate((i * PI) / 4); x.fillRect(-3, -74, 6, 74); x.restore(); }
    x.textAlign = "center"; x.textBaseline = "middle"; const [a, b] = nombre.split("|");
    ajustar(x, a, 900, 76, w - 70); x.fillText(a, w / 2, 352); ajustar(x, b, 800, 46, w - 120); x.fillText(b, w / 2, 424);
  }));
}
function crearCaja(nombre = "DON TANO|PIZZAS", L = 0.44, H = 0.045) {
  const g = new THREE.Group();
  g.add(caja(L, 0.004, L, M.kraft, 0, 0.002, 0, 0.002));
  for (const [x, z, w, d] of [[0, L / 2, L, 0.006], [0, -L / 2, L, 0.006], [L / 2, 0, 0.006, L], [-L / 2, 0, 0.006, L]]) g.add(caja(w, H, d, M.kraft, x, H / 2, z, 0.002));
  const bis = new THREE.Group(); bis.position.set(0, H, -L / 2); g.add(bis);
  const tapa = new THREE.Group(); bis.add(tapa);
  const top = mesh(new THREE.BoxGeometry(L + 0.008, 0.005, L + 0.008), [M.kraft, M.kraft, new THREE.MeshStandardMaterial({ map: texTapa(nombre), roughness: 0.85 }), M.kraftO, M.kraft, M.kraft], 0, 0.003, L / 2); tapa.add(top);
  tapa.add(caja(L + 0.008, 0.03, 0.005, M.kraft, 0, -0.012, L + 0.004, 0.002));   // la pestaña de adelante
  g.userData = { bis, L, H };
  return sombras(g);
}
const abrirCaja = (c, u) => { c.userData.bis.rotation.x = -2.15 * eio(cl(u)); };
// ---------- la comanda (talonario) y la birome ----------
// k: cuánto de "1 MUZZA · 2 FAINÁ" (0..1) y de "DUBIMIOSO TERA 14??" (k2); circ: el círculo rojo en la B (0..1)
function dibujarComanda(x, W, H, k1, k2, circ = 0) {
  x.save(); x.scale(W / 600, H / 820); const w = 600, h = 820;
  x.fillStyle = "#f4f1e4"; x.fillRect(0, 0, w, h);
  x.fillStyle = "#16243d"; x.fillRect(0, 0, w, 108); x.fillStyle = "#efeee5"; x.textAlign = "left"; x.textBaseline = "middle"; ajustar(x, "COMANDA N° 0347", 800, 54, w - 60); x.fillText("COMANDA N° 0347", 30, 56);
  x.strokeStyle = "#9fb0c8"; x.lineWidth = 3; for (let y = 230; y < h - 30; y += 115) { x.beginPath(); x.moveTo(24, y); x.lineTo(w - 24, y); x.stroke(); }
  x.fillStyle = "rgba(201,81,47,0.22)"; x.beginPath(); x.ellipse(w - 70, h - 70, 46, 34, 0.5, 0, 7); x.fill(); x.beginPath(); x.ellipse(w - 112, h - 46, 18, 12, 0.2, 0, 7); x.fill();
  x.fillStyle = "#0b1220"; x.font = CAV(100); x.textBaseline = "alphabetic";
  const esc = (txt, X, Y, k) => { const n = Math.round(txt.length * cl(k)); if (n > 0) x.fillText(txt.slice(0, n), X, Y); return x.measureText(txt.slice(0, n)).width; };
  esc("1 MUZZA", 36, 215, k1 * 2); esc("2 FAINÁ", 36, 330, k1 * 2 - 1);
  const wD = esc("DUBIMIOSO", 36, 445, k2 * 1.6); esc("TERA 14??", 36, 560, k2 * 1.6 - 0.6);
  if (circ > 0) {   // la B, marcada con un círculo rojo apagado
    x.font = CAV(100); const xB = 36 + x.measureText("DU").width, wB = x.measureText("B").width;
    x.strokeStyle = "#c7655b"; x.lineWidth = 11; x.lineCap = "round"; x.beginPath(); x.ellipse(xB + wB / 2, 410, wB * 0.95, 66, -0.1, -PI / 2, -PI / 2 + 2 * PI * cl(circ)); x.stroke();
  }
  x.restore();
  return wD;
}
const comandaT = lienzo(600, 820, (x, w, h) => dibujarComanda(x, w, h, 0, 0));
let comandaK = "";
function ponerComanda(k1, k2, circ) { const key = `${Math.round(k1 * 40)}|${Math.round(k2 * 40)}|${Math.round(circ * 20)}`; if (key === comandaK) return; comandaK = key; dibujarComanda(comandaT.userData.x, 600, 820, k1, k2, circ); comandaT.needsUpdate = true; }
function crearTalonario() {
  const g = new THREE.Group();
  g.add(caja(0.135, 0.012, 0.18, M.cr2, 0, 0.006, 0, 0.003));
  const hoja = mesh(new THREE.PlaneGeometry(0.13, 0.175), new THREE.MeshStandardMaterial({ map: comandaT, roughness: 0.85 }), 0, 0.0125, 0); hoja.rotation.x = -PI / 2; g.add(hoja);
  return sombras(g);
}
function crearBirome() {
  const g = new THREE.Group();
  g.add(mesh(new THREE.CylinderGeometry(0.0055, 0.0055, 0.13, 10), M.cr, 0, 0, 0));
  g.add(mesh(new THREE.CylinderGeometry(0.0062, 0.0062, 0.035, 10), M.navy, 0, 0.055, 0));
  g.add(mesh(new THREE.ConeGeometry(0.0055, 0.016, 10).rotateX(PI), mat(0x3a3f4a, 0.5), 0, -0.073, 0));
  return sombras(g);
}
// el gancho de comandas: el pincho de acero en una base navy, con papelitos clavados y torcidos
function crearGancho() {
  const g = new THREE.Group();
  g.add(mesh(new THREE.CylinderGeometry(0.045, 0.05, 0.02, 20), M.navy3, 0, 0.01, 0));
  g.add(mesh(new THREE.CylinderGeometry(0.003, 0.0045, 0.17, 8), M.acero, 0, 0.1, 0));
  const pap = mesh(new THREE.PlaneGeometry(0.075, 0.095), new THREE.MeshStandardMaterial({ color: 0xf1eee2, roughness: 0.9, side: THREE.DoubleSide }));
  for (let i = 0; i < 9; i++) { const p = pap.clone(); p.position.y = 0.025 + i * 0.012; p.rotation.set(-PI / 2 + (i % 3 - 1) * 0.18, (i * 1.7) % 6.28, (i % 2 ? 0.12 : -0.1)); g.add(p); }
  return sombras(g);
}
// ---------- la masa ----------
// un bollo (u = 0) que se estira y cuelga como un disco blando desparejo (u = 1): deformación de vértices fija
const MASA_G0 = (() => { const g = new THREE.SphereGeometry(0.07, 24, 16); g.userData.base = g.attributes.position.array.slice(); return g; })();
function crearMasa() { const m = mesh(MASA_G0.clone(), M.masa); m.geometry.userData.base = MASA_G0.userData.base; m.userData.u = -1; return m; }
function estirarMasa(m, u) {
  u = Math.round(cl(u) * 20) / 20; if (u === m.userData.u) return; m.userData.u = u;
  const p = m.geometry.attributes.position, b = m.geometry.userData.base;
  for (let i = 0; i < p.count; i++) {
    let x = b[i * 3], y = b[i * 3 + 1], z = b[i * 3 + 2];
    // u = 1: un disco de ~0,2 de diámetro, fino (z), que cuelga (y hacia abajo) desde arriba (la mano en y = 0,07)
    const yy = lerp(y, 0.07 - (0.07 - y) * 2.4 - Math.abs(x) * 0.25, u), xx = lerp(x, x * 1.45 + Math.sin(y * 40) * 0.008 * u, u), zz = lerp(z, z * 0.22, u);
    p.setXYZ(i, xx, yy - 0.03 * u * Math.sin(x * 30) * (y < 0 ? 1 : 0), zz);
  }
  p.needsUpdate = true; m.geometry.computeVertexNormals();
}
// el disco perfecto de Lucía (gira entre las manos)
function crearDisco() { const g = new THREE.Group(); g.add(mesh(new THREE.CylinderGeometry(0.16, 0.155, 0.012, 32), M.masa, 0, 0, 0)); g.add(mesh(new THREE.TorusGeometry(0.155, 0.009, 8, 32).rotateX(PI / 2), M.masa, 0, 0.004, 0)); return sombras(g); }
// ---------- el horno pizzero de acero (dos bocas, la de arriba abierta con la muzza adentro) y la pala ----------
function crearHorno() {
  const g = new THREE.Group();
  const W = 1.3, D = 0.95;
  for (const [x, z] of [[-W / 2 + 0.06, -D / 2 + 0.06], [W / 2 - 0.06, -D / 2 + 0.06], [-W / 2 + 0.06, D / 2 - 0.06], [W / 2 - 0.06, D / 2 - 0.06]]) g.add(caja(0.06, 0.5, 0.06, M.aceroO, x, 0.25, z, 0.01));
  for (const [y0, abierta] of [[0.5, false], [0.98, true]]) {
    const h = 0.46;
    if (abierta) {
      // cámara de cocción a la vista: piso de piedra, paredes y la luz crema cálida plana (sin bloom)
      g.add(caja(W, 0.05, D, M.navy3, 0, y0 + 0.025, 0, 0.01)); g.add(caja(W, 0.05, D, M.navy3, 0, y0 + h - 0.025, 0, 0.01));
      g.add(caja(0.06, h, D, M.navy3, -W / 2 + 0.03, y0 + h / 2, 0, 0.01)); g.add(caja(0.06, h, D, M.navy3, W / 2 - 0.03, y0 + h / 2, 0, 0.01)); g.add(caja(W, h, 0.05, M.navy3, 0, y0 + h / 2, -D / 2 + 0.025, 0.01));
      const fondo = mesh(new THREE.PlaneGeometry(W - 0.12, h - 0.1), M.luzHorno, 0, y0 + h / 2, -D / 2 + 0.06); g.add(fondo);
      const piso = mesh(new THREE.PlaneGeometry(W - 0.12, D - 0.1), mat(0xd9b98a, 0.9), 0, y0 + 0.052, 0); piso.rotation.x = -PI / 2; g.add(piso);
      for (const s of [-1, 1]) { const l = mesh(new THREE.PlaneGeometry(D - 0.1, h - 0.1), M.luzHorno, s * (W / 2 - 0.062), y0 + h / 2, 0); l.rotation.y = -s * PI / 2; g.add(l); }
      // la puerta abierta (rebatida hacia abajo) con la manija crema
      const pu = new THREE.Group(); pu.position.set(0, y0 + 0.05, D / 2); pu.rotation.x = PI / 2 - 0.05; g.add(pu);
      pu.add(caja(W - 0.1, h - 0.1, 0.04, M.acero, 0, (h - 0.1) / 2, 0.02, 0.01)); pu.add(caja(0.5, 0.035, 0.05, M.cr, 0, h - 0.18, 0.07, 0.012));
    } else {
      g.add(caja(W, h, D, M.navy3, 0, y0 + h / 2, 0, 0.012));
      g.add(caja(W - 0.12, h - 0.12, 0.03, M.acero, 0, y0 + h / 2, D / 2 + 0.01, 0.01)); g.add(caja(0.5, 0.035, 0.05, M.cr, 0, y0 + h / 2 + 0.1, D / 2 + 0.05, 0.012));
    }
  }
  g.add(caja(W + 0.04, 0.08, D + 0.04, M.aceroO, 0, 1.48, 0, 0.012));
  // la campana de acero gris arriba
  const camp = new THREE.Group(); camp.position.set(0, 2.05, 0); g.add(camp);
  camp.add(mesh(new THREE.CylinderGeometry(0.42, 0.95, 0.45, 4, 1).rotateY(PI / 4).scale(1, 1, 0.75), M.acero, 0, 0, 0));
  camp.add(caja(0.42, 0.9, 0.36, M.acero, 0, 0.62, -0.08, 0.01));
  const muzza = crearMuzza(false); muzza.position.set(0, 0.98 + 0.06, 0.05); g.add(muzza); g.userData.muzza = muzza;
  return sombras(g);
}
function crearPala() { const g = new THREE.Group(); g.add(mesh(new THREE.CylinderGeometry(0.016, 0.016, 1.35, 10), M.madera, 0, 0.675 + 0.34, 0)); g.add(caja(0.34, 0.34, 0.012, M.madera, 0, 0.17, 0, 0.03)); return sombras(g); }
// ---------- el casco integral (visera que sube) y la mochila térmica ----------
function crearCasco(color = MARCA.navy3) {
  const g = new THREE.Group(); const R = 0.37;
  const cm = mat(color, 0.4), fr = mat(0xefeee5, 0.5), neg = mat(0x14181f, 0.8);
  // arco horizontal (en el plano XZ) de ancho `arco`, centrado en el ángulo `centro` (PI/2 = adelante, -PI/2 = atrás)
  const arcoH = (r, tubo, arco, centro, m, y) => { const p = new THREE.Group(); p.rotation.y = arco / 2 - centro; p.position.y = y; const t = mesh(new THREE.TorusGeometry(r, tubo, 10, 32, arco), m); t.rotation.x = PI / 2; p.add(t); g.add(p); return p; };
  // la cáscara: arriba entera; abajo atrás y a los costados (la cara queda abierta adelante)
  g.add(mesh(new THREE.SphereGeometry(R, 32, 16, 0, PI * 2, 0, PI * 0.42), cm));
  g.add(mesh(new THREE.SphereGeometry(R, 32, 12, PI / 2 + 0.85, PI * 2 - 1.7, PI * 0.42, PI * 0.38), cm));
  // la mentonera: un arco grueso adelante, por debajo de la boca
  arcoH(R * 0.86, 0.055, 1.7, PI / 2, cm, -R * 0.62);
  // el borde negro de la ventana (arriba de las cejas) y la franja reflectiva crema atrás
  arcoH(R * 0.97, 0.018, 1.7, PI / 2, neg, R * Math.cos(PI * 0.42));
  arcoH(R * 1.005, 0.02, PI * 1.3, -PI / 2, fr, 0.05);
  // la visera levantada (bisagra a los costados): un casquete gris humo, semitransparente, sin brillo fuerte
  const vis = new THREE.Group(); g.add(vis);
  vis.add(mesh(new THREE.SphereGeometry(R * 1.04, 24, 10, PI / 2 - 0.95, 1.9, PI * 0.36, PI * 0.26), new THREE.MeshStandardMaterial({ color: 0x3a4250, roughness: 0.4, transparent: true, opacity: 0.6, depthWrite: false })));
  vis.rotation.x = -1.25;   // levantada
  for (const s of [-1, 1]) g.add(mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.02, 14).rotateZ(PI / 2), neg, s * R * 1.0, 0.0, 0.02));
  g.userData = { vis, R };
  return sombras(g);
}
function crearMochila(color = MARCA.navy3, franja = MARCA.cr) {
  const g = new THREE.Group();
  g.add(mesh(rbox(0.42, 0.42, 0.36, 0.05), mat(color, 0.7), 0, 0, 0));
  g.add(caja(0.425, 0.04, 0.365, mat(franja, 0.5), 0, 0.08, 0, 0.01));
  g.add(caja(0.3, 0.03, 0.03, mat(0x14181f, 0.7), 0, 0.2, 0.19, 0.01));
  return sombras(g);
}
// ---------- la moto de reparto (110 cc, sin logo) ----------
function crearMoto(color = MARCA.navy3, baul = MARCA.cr) {
  const g = new THREE.Group(); const cm = mat(color, 0.45), go = M.goma ?? mat(0x23262c, 0.85), cr = M.acero;
  const rueda = (z) => { const r = new THREE.Group(); r.position.set(0, 0.28, z); r.add(mesh(new THREE.TorusGeometry(0.22, 0.065, 10, 28).rotateY(PI / 2), go, 0, 0, 0)); r.add(mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.05, 20).rotateZ(PI / 2), mat(0xd9d7c9, 0.5), 0, 0, 0)); g.add(r); return r; };
  rueda(-0.62); rueda(0.62);
  g.add(caja(0.2, 0.18, 0.95, cm, 0, 0.48, -0.05, 0.05));                // el cuerpo
  g.add(caja(0.26, 0.09, 0.6, mat(0x14181f, 0.8), 0, 0.68, -0.18, 0.04)); // el asiento
  const fr = mesh(rbox(0.34, 0.55, 0.12, 0.05), cm, 0, 0.75, 0.45); fr.rotation.x = -0.35; g.add(fr);   // el escudo de adelante
  g.add(mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.6, 8).rotateZ(PI / 2), cr, 0, 1.05, 0.55));       // el manubrio
  g.add(mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.05, 16).rotateX(PI / 2), M.luz, 0, 0.96, 0.62));  // el faro
  { const h = mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.55, 8), cr, 0, 0.55, 0.58); h.rotation.x = -0.35; g.add(h); }   // la horquilla
  g.add(caja(0.42, 0.36, 0.4, mat(baul, 0.6), 0, 0.92, -0.55, 0.05));                                   // el baúl
  const luzT = mesh(new THREE.BoxGeometry(0.12, 0.04, 0.02), new THREE.MeshBasicMaterial({ color: 0x7a3a34 }), 0, 0.62, -0.62); g.add(luzT);
  g.userData.luzT = luzT;
  return sombras(g);
}
// ---------- la impresora térmica, el ticket y el riel ----------
const TICKET_TXT = [["#47", 900, 66], ["1 MUZZA", 800, 46], ["2 FAINÁ", 800, 46], ["DUVIMIOSO", 700, 40], ["TERRA 1432", 700, 40], ["PAGADO ✓", 900, 48, "#3fa60a"], ["22:16", 700, 36]];
function dibujarTicket(x, W, H, lineas = TICKET_TXT) {
  x.fillStyle = "#f7f6ee"; x.fillRect(0, 0, W, H);
  x.fillStyle = "#16243d"; x.fillRect(0, 0, W, 10);
  let y = 30; x.textAlign = "left"; x.textBaseline = "top";
  for (const [l, p, s, c] of lineas) { x.fillStyle = c ?? "#0b1220"; x.font = `${p} ${s}px "Lexend", sans-serif`; if (x.measureText(l).width > W - 40) ajustar(x, l, p, s, W - 40); x.fillText(l, 22, y); y += s * 1.32; }
  x.strokeStyle = "#9fb0c8"; x.lineWidth = 3; x.setLineDash([8, 8]); x.beginPath(); x.moveTo(10, H - 12); x.lineTo(W - 10, H - 12); x.stroke(); x.setLineDash([]);
}
const ticketT = lienzo(320, 560, (x, w, h) => dibujarTicket(x, w, h));
const ticketMini = (n) => lienzo(160, 280, (x, w, h) => dibujarTicket(x, w, h, [[`#${n}`, 900, 44], ["1 MUZZA", 800, 22], ["PAGADO ✓", 900, 22, "#3fa60a"]]));
function crearImpresora() {
  const g = new THREE.Group();
  g.add(caja(0.15, 0.1, 0.18, M.navy3, 0, 0.05, 0, 0.025));
  g.add(caja(0.13, 0.03, 0.11, M.navy, 0, 0.105, -0.025, 0.012));
  g.add(caja(0.1, 0.006, 0.01, mat(0x14181f, 0.7), 0, 0.1, 0.035, 0.002));
  g.add(mesh(new THREE.SphereGeometry(0.008, 10, 8), mat(0x5ce611, 0.4), 0.05, 0.08, 0.091));
  // el ticket que sale: un plano que crece hacia arriba desde la ranura (se escala con u) con la punta curvada
  const tk = new THREE.Group(); tk.position.set(0, 0.102, 0.035); g.add(tk);
  const pl = mesh(new THREE.PlaneGeometry(0.08, 0.14), new THREE.MeshBasicMaterial({ map: ticketT, side: THREE.DoubleSide, toneMapped: false }), 0, 0.07, 0); pl.castShadow = false; tk.add(pl);
  g.userData = { tk, pl };
  return sombras(g);
}
// u: 0 (adentro) .. 1 (afuera entero, 14 cm); el plano se recorta con el UV (sale de la ranura, el texto de arriba primero)
function sacarTicket(imp, u) {
  const { tk, pl } = imp.userData; u = cl(u);
  tk.visible = u > 0.01; if (!tk.visible) return;
  pl.scale.y = u; pl.position.y = 0.07 * u; tk.rotation.x = -0.12 - 0.25 * u;
  const uv = pl.geometry.attributes.uv; uv.setY(0, 1); uv.setY(1, 1); uv.setY(2, 1 - u); uv.setY(3, 1 - u); uv.needsUpdate = true;
}
function crearRiel(n = 6) {
  const g = new THREE.Group();
  g.add(mesh(new THREE.CylinderGeometry(0.012, 0.012, 1.0, 10).rotateZ(PI / 2), M.acero, 0, 0, 0));
  for (const s of [-1, 1]) g.add(caja(0.03, 0.06, 0.04, M.aceroO, s * 0.5, 0, -0.02, 0.005));
  for (let i = 0; i < n; i++) { const t = mesh(new THREE.PlaneGeometry(0.08, 0.14), new THREE.MeshStandardMaterial({ map: ticketMini(41 + i), roughness: 0.85 }), -0.4 + i * 0.13, -0.075, 0.013); g.add(t); }
  return sombras(g);
}
