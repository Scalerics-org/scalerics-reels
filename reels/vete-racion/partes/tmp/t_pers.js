// =====================================================================================================
// LOS PERSONAJES Y TOTO
// =====================================================================================================
const ines = crearPersonaje({ ...ELENCO.ines, dedos: true, parpadeoCada: 999, parpadeosExtra: [r2(T.p3 + 0.5), r2(T.p5 + 0.2), r2(T.q4b + 0.9), r2(T.c + 2.6)] });
// Vero de calle (campera navy, súper y veterinaria) y Vero de entrecasa (buzo crema, jogging navy2, pantuflas crema)
const vero = crearPersonaje({ ...ELENCO.vero, dedos: true, parpadeoCada: 999, parpadeosExtra: [r2(T.p2 + 0.4), r2(T.p5 + 0.9)] });
if (vero.campera) vero.campera.traverse((o) => { if (o.isMesh && o.geometry.type === "TorusGeometry") o.visible = false; });   // (vacunas r5) el ruedo crema
const veroC = crearPersonaje({ ...ELENCO.vero, nombre: "Vero", campera: null, pantalon: MARCA.navy2, zapatos: MARCA.cr, pantuflas: { color: MARCA.cr, borde: MARCA.navy3, suela: MARCA.navy }, dedos: true, parpadeoCada: 999, parpadeosExtra: [r2(T.cel + 0.5), r2(T.q1v + 0.6)] });
const bruno = crearPersonaje({ ...ELENCO.bruno, dedos: true, parpadeoCada: 999, parpadeosExtra: [r2(T.q2 + 0.2)] });
// la señora del súper, al fondo (sin voz)
const senora = crearPersonaje({ ...DEFECTO, nombre: "Señora", piel: PIEL.clara, pelo: PELO.canoso, peinado: "corto", cejasColor: 0xb9b6b0, camisa: MARCA.navy3, mangas: "largas", cuello: MARCA.cr, cuelloBotones: false, pantalon: 0x3a3f4a, nariz: 0.055, alto: 0.95, parpadeoCada: 999 });
const TODOS = [ines, vero, veroC, bruno, senora];
for (const p of TODOS) { scene.add(p.raiz); p.raiz.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } }); }
// Inés: el estetoscopio navy al cuello y la lapicera del bolsillo (de vacunas)
const LAP_BOLSILLO = [];
{
  const em = mat(C.navy, 0.45);
  const pts = [V3(-0.05, 0.31, 0.19), V3(-0.1, 0.44, 0.14), V3(-0.1, 0.53, 0.0), V3(0, 0.55, -0.1), V3(0.1, 0.53, 0.0), V3(0.1, 0.44, 0.14), V3(0.07, 0.36, 0.19)];
  ines.cuerpo.add(mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 40, 0.011, 8), em));
  const campana = mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.016, 20), M.metal, -0.05, 0.3, 0.2); campana.rotation.x = Math.PI / 2 - 0.25; ines.cuerpo.add(campana);
  LAP_BOLSILLO.push(mesh(new THREE.CylinderGeometry(0.009, 0.009, 0.12, 8), M.navy, 0.12, 0.33, 0.19), caja(0.012, 0.03, 0.01, M.g, 0.12, 0.395, 0.195, 0.004));
  for (const m of LAP_BOLSILLO) ines.cuerpo.add(m);
}
const toto = crearPerro({ ...PERROS.toto, escala: 0.9 }); scene.add(toto.raiz);
toto.raiz.traverse((o) => { if (o.isMesh) o.receiveShadow = false; });
// la correa de Toto (verde oscuro)
const CORREA = [0, 1].map(() => { const m = mesh(new THREE.CylinderGeometry(1, 1, 1, 8).translate(0, 0.5, 0), mat(0x2f6b1f, 0.6)); m.castShadow = false; scene.add(m); return m; });
function ponerCorrea(a, b, on) {
  for (const m of CORREA) m.visible = on; if (!on) return;
  const mid = a.clone().lerp(b, 0.5); mid.y -= Math.min(0.25, a.distanceTo(b) * 0.2);
  entre(CORREA[0], a, mid, 0.009); entre(CORREA[1], mid, b, 0.009);
}
// las bolsas que se mueven: la vacía de P1 (con sticker), la de la mesada de Q1 (con poco) y la llena de Q3, la que trae Bruno
const BOLSA_VACIA = crearBolsa15({ tipo: "vete", vacia: true }); scene.add(BOLSA_VACIA);
const BOLSA_POCA = crearBolsa15({ tipo: "vete", vacia: true }); scene.add(BOLSA_POCA);
const BOLSA_NUEVA = crearBolsa15({ tipo: "vete", nombre: "TOTO" }); scene.add(BOLSA_NUEVA);
// el celular de Vero (P1 en la mano; Q1 en la mano) y la tablet del mostrador (parte 2)
const pantCel = lienzo(400, 820, () => {});
const celuV = crearCelular(pantCel, C.navy2, 0.08, 0.162); celuV.scale.setScalar(1.25); scene.add(celuV);
const pantT = lienzo(1000, 760, () => {});
const tablet = crearTablet(pantT, 0.32, 0.24, 0.35); tablet.position.set(VX + 0.5, MOS.alto, MOS.z + 0.02); tablet.rotation.y = -0.15; scene.add(tablet);

// ---- avatares: la cara renderizada chica en un círculo (chat, ficha) ----
const AVATAR = {};
{
  const rt = new THREE.WebGLRenderTarget(256, 256); rt.texture.colorSpace = THREE.SRGBColorSpace;
  const esc = new THREE.Scene();
  esc.add(new THREE.HemisphereLight(0xffffff, 0x8a8a8a, 2.2)); const dl = new THREE.DirectionalLight(0xffffff, 1.6); dl.position.set(1, 2, 3); esc.add(dl);
  const cam = new THREE.PerspectiveCamera(30, 1, 0.05, 20);
  const leer = (raiz, cabeza, fondo, dist = 1.6, alto = 0.25, poner = null) => {
    esc.background = new THREE.Color(fondo);
    const padre = raiz.parent; esc.add(raiz); const pos = raiz.position.clone(), rot = raiz.rotation.clone(); raiz.position.set(0, 0, 0); raiz.rotation.set(0, 0, 0);
    if (poner) poner(); raiz.updateMatrixWorld(true);
    const c = cabeza.localToWorld(V3(0, alto, 0));
    cam.position.set(c.x + 0.12 * dist / 1.6, c.y + 0.04, c.z + dist); cam.lookAt(c.x, c.y - 0.03, c.z);
    renderer.setRenderTarget(rt); renderer.render(esc, cam); renderer.setRenderTarget(null);
    const px = new Uint8Array(256 * 256 * 4); renderer.readRenderTargetPixels(rt, 0, 0, 256, 256, px);
    const cv = document.createElement("canvas"); cv.width = cv.height = 256; const x = cv.getContext("2d");
    const id = x.createImageData(256, 256);
    for (let y = 0; y < 256; y++) id.data.set(px.subarray((255 - y) * 1024, (256 - y) * 1024), y * 1024);
    x.putImageData(id, 0, 0);
    raiz.position.copy(pos); raiz.rotation.copy(rot); if (padre) padre.add(raiz); else esc.remove(raiz);
    return cv;
  };
  const per = (cfg, fondo) => { const p = crearPersonaje({ ...cfg, parpadeoCada: 999 }); return leer(p.raiz, p.cabeza, fondo, 1.6, 0.25, () => p.poner({ ...CARA.sonrisa, ...BRAZOS.costado, t: 0 })); };
  AVATAR.ines = per(ELENCO.ines, 0x5ce611);
  AVATAR.vero = per(ELENCO.vero, 0xd9d7c9);
  const pt = crearPerro({ ...PERROS.toto }); AVATAR.toto = leer(pt.raiz, pt.cabeza, 0xcfeebc, 1.05, 0.0, () => pt.poner({ sentado: 1, orejas: 0.8, cola: 0, t: 0.3 }));
  rt.dispose();
}

// =====================================================================================================
// LA INTERFAZ: el celular "Cerrado" (P1), el chat de recompra, la ficha de recompra, la tienda (Q1) y el panel (Q5)
// =====================================================================================================
const fila = (x, W, y, a, b, { ok = false, color = "#0b1220", h = 104, fondo = "#ffffff" } = {}) => {
  x.fillStyle = fondo; x.strokeStyle = "#16243d"; x.lineWidth = 5; x.beginPath(); x.roundRect(30, y, W - 60, h, 22); x.fill(); x.stroke();
  x.fillStyle = "#16243d"; x.textAlign = "left"; x.textBaseline = "middle"; ajustar(x, a, 700, 46, W * 0.55); x.fillText(a, 60, y + h / 2 + 2);
  x.fillStyle = color; x.textAlign = "right"; ajustar(x, b, 900, 50, W * 0.38); x.fillText(b, W - (ok ? 124 : 60), y + h / 2 + 2);
  if (ok) { x.fillStyle = "#5ce611"; x.beginPath(); x.arc(W - 80, y + h / 2, 28, 0, 7); x.fill(); tilde(x, W - 79, y + h / 2 + 1, 28, "#0b1220"); }
};
const cabecera = (x, W, titulo, sub = null, av = null) => {
  x.fillStyle = "#16243d"; x.fillRect(0, 0, W, 180); x.fillStyle = "#5ce611"; x.fillRect(0, 180, W, 10);
  let tx = 40; if (av) { avatar(x, av, 96, 90, 58); tx = 176; }
  x.fillStyle = "#efeee5"; x.textAlign = "left"; x.textBaseline = "middle"; ajustar(x, titulo, 800, 56, W - tx - 30); x.fillText(titulo, tx, sub ? 70 : 92);
  if (sub) { x.font = F(700, 38); x.fillText(sub, tx + 2, 130); }
};
// P1 · la tarjeta del lugar: "Veterinaria Inés · Cerrado · Abre el lunes 9:00"
function dibujarCerrado(x, W, H) {
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, W, H);
  x.fillStyle = "#16243d"; x.fillRect(0, 0, W, 120); x.fillStyle = "#efeee5"; x.textAlign = "left"; x.textBaseline = "middle"; x.font = F(700, 40); x.fillText("21:40", 40, 62);
  // la foto plana del local: la vidriera navy con el cartel crema
  x.fillStyle = "#365f28"; x.fillRect(30, 160, W - 60, 380); x.fillStyle = "#0b1220"; x.fillRect(30, 160, W - 60, 120); x.fillStyle = "#efeee5"; ajustar(x, "VETERINARIA INÉS", 800, 56, W - 140); x.textAlign = "center"; x.fillText("VETERINARIA INÉS", W / 2, 222);
  x.fillStyle = "#16243d"; x.fillRect(110, 320, 300, 220); x.fillStyle = "#0b1220"; x.fillRect(470, 320, W - 560, 220);
  x.fillStyle = "#0b1220"; x.textAlign = "left"; ajustar(x, "Veterinaria Inés", 900, 70, W - 80); x.fillText("Veterinaria Inés", 40, 612);
  x.fillStyle = "#c7655b"; x.beginPath(); x.roundRect(40, 676, 330, 104, 52); x.fill(); x.fillStyle = "#ffffff"; x.textAlign = "center"; x.font = F(900, 62); x.fillText("Cerrado", 205, 730);
  x.fillStyle = "#16243d"; x.textAlign = "left"; ajustar(x, "Abre el lunes 9:00", 800, 62, W - 80); x.fillText("Abre el lunes 9:00", 40, 856);
  x.strokeStyle = "#b4b2a3"; x.lineWidth = 4; x.beginPath(); x.moveTo(40, 930); x.lineTo(W - 40, 930); x.stroke();
  x.fillStyle = "#16243d"; ajustar(x, "Ración · consultas · vacunas", 700, 44, W - 80); x.fillText("Ración · consultas · vacunas", 40, 1000);
}
// Q1 · el chat de recompra: f = 1 (llegó), 2 (toca Repetir)
function dibujarChat(x, W, H, f) {
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, W, H);
  cabecera(x, W, "Veterinaria Inés", "en línea", AVATAR.ines);
  x.fillStyle = "#d9d7c9"; x.font = F(800, 38); const dw = x.measureText("Jueves 10:00").width + 60; rr(x, W / 2 - dw / 2, 222, dw, 62, 31); x.fillStyle = "#16243d"; x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("Jueves 10:00", W / 2, 254);
  const msg = "Hola, Vero. A Toto le quedan unos 4 días de ración. ¿Te la mandamos?";
  x.font = F(800, 58); const ls = renglones(x, msg, W - 130);
  const by = 316, bh = 50 + 180 + 24 + ls.length * 74;
  x.fillStyle = "#ffffff"; x.strokeStyle = "#16243d"; x.lineWidth = 6; x.beginPath(); x.roundRect(24, by, W - 48, bh, [10, 34, 34, 34]); x.fill(); x.stroke();
  x.fillStyle = "#cfeebc"; x.strokeStyle = "#3fa60a"; x.lineWidth = 5; x.beginPath(); x.roundRect(48, by + 26, W - 96, 180, 26); x.fill(); x.stroke();
  avatar(x, AVATAR.toto, 136, by + 116, 66);
  x.fillStyle = "#0b1220"; x.textAlign = "left"; x.font = F(900, 60); x.fillText("Toto", 230, by + 84); x.fillStyle = "#16243d"; ajustar(x, "Ración 15 kg · ~4 días", 800, 44, W - 300); x.fillText("Ración 15 kg · ~4 días", 232, by + 150);
  x.fillStyle = "#0b1220"; x.font = F(800, 58); ls.forEach((l, i) => x.fillText(l, 56, by + 26 + 180 + 24 + 40 + i * 74));
  const yb = by + bh + 36;
  x.fillStyle = f === 2 ? "#3fa60a" : "#5ce611"; x.strokeStyle = "#0b1220"; x.lineWidth = 7; x.beginPath(); x.roundRect(30, yb, W - 60, 150, 75); x.fill(); x.stroke();
  x.fillStyle = "#0b1220"; x.textAlign = "center"; ajustar(x, "Repetir pedido · $ 3.900", 900, 62, W - 120); x.fillText("Repetir pedido · $ 3.900", W / 2, yb + 77);
  x.fillStyle = "#efeee5"; x.beginPath(); x.roundRect(30, yb + 176, W - 60, 136, 68); x.fill(); x.stroke();
  x.fillStyle = "#0b1220"; ajustar(x, "La paso a buscar", 800, 58, W - 120); x.fillText("La paso a buscar", W / 2, yb + 246);
  if (f === 2) { x.fillStyle = "rgba(11,18,32,0.25)"; x.beginPath(); x.arc(W - 120, yb + 75, 48, 0, 7); x.fill(); }
}
// Q1 · la ficha de recompra de Toto en la tablet de Inés
function dibujarFichaRec(x, W, H) {
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, W, H);
  x.fillStyle = "#16243d"; x.fillRect(0, 0, W, 130); x.fillStyle = "#5ce611"; x.fillRect(0, 130, W, 10);
  x.fillStyle = "#efeee5"; x.textAlign = "left"; x.textBaseline = "middle"; ajustar(x, "Recompras · Toto (Vero)", 800, 60, W - 60); x.fillText("Recompras · Toto (Vero)", 34, 68);
  avatar(x, AVATAR.toto, 140, 270, 100);
  x.fillStyle = "#0b1220"; x.font = F(900, 78); x.fillText("Toto", 280, 232); x.fillStyle = "#16243d"; ajustar(x, "Ración adulto mediano · 15 kg", 700, 42, W - 300); x.fillText("Ración adulto mediano · 15 kg", 282, 308);
  fila(x, W, 400, "Compra cada", "30 días"); fila(x, W, 520, "Última compra", "hace 26 días"); fila(x, W, 640, "Le quedan", "~4 días", { color: "#c7655b" });
  x.fillStyle = "#cfeebc"; x.strokeStyle = "#3fa60a"; x.lineWidth = 6; x.beginPath(); x.roundRect(30, 776, W - 60, 130, 26); x.fill(); x.stroke();
  x.fillStyle = "#0b1220"; x.textAlign = "left"; ajustar(x, "Aviso enviado · jueves 10:00", 800, 50, W - 200); x.fillText("Aviso enviado · jueves 10:00", 60, 842); x.fillStyle = "#3fa60a"; x.beginPath(); x.arc(W - 80, 840, 32, 0, 7); x.fill(); tilde(x, W - 79, 841, 32, "#0b1220");
  x.fillStyle = "#16243d"; x.beginPath(); x.roundRect(30, 940, W - 60, 150, 30); x.fill(); x.fillStyle = "#efeee5"; x.textAlign = "center"; ajustar(x, "Próximo aviso: en 30 días", 800, 54, W - 100); x.fillText("Próximo aviso: en 30 días", W / 2, 1016);
}
// Q1 · la tienda con el pedido armado: e = 0 (envío marcado), 1 (toca Pagar), 2 (Pagado ✓)
function dibujarTienda(x, W, H, e) {
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, W, H);
  cabecera(x, W, "Tienda · Veterinaria Inés", "Tu pedido");
  // la bolsa (dibujo plano) y el renglón
  x.fillStyle = "#ffffff"; x.strokeStyle = "#16243d"; x.lineWidth = 6; x.beginPath(); x.roundRect(30, 222, W - 60, 250, 30); x.fill(); x.stroke();
  x.fillStyle = "#c9a774"; x.beginPath(); x.roundRect(60, 248, 150, 200, 16); x.fill(); silueta(x, 135, 320, 0.55, "#0b1220"); x.fillStyle = "#efeee5"; x.fillRect(60, 380, 150, 40); x.fillStyle = "#0b1220"; x.font = F(900, 30); x.textAlign = "center"; x.fillText("15 kg", 135, 401);
  x.textAlign = "left"; x.fillStyle = "#0b1220"; ajustar(x, "Ración adulto mediano", 800, 46, W - 300); x.fillText("Ración adulto mediano", 240, 300); x.fillStyle = "#16243d"; x.font = F(700, 44); x.fillText("15 kg · × 1", 240, 362); x.fillStyle = "#0b1220"; x.font = F(900, 54); x.fillText("$ 3.900", 240, 428);
  const op = (y, txt, on) => { x.fillStyle = on ? "#cfeebc" : "#ffffff"; x.strokeStyle = on ? "#3fa60a" : "#b4b2a3"; x.lineWidth = 6; x.beginPath(); x.roundRect(30, y, W - 60, 118, 26); x.fill(); x.stroke(); x.strokeStyle = "#0b1220"; x.lineWidth = 6; x.beginPath(); x.arc(84, y + 59, 24, 0, 7); x.stroke(); if (on) { x.fillStyle = "#0b1220"; x.beginPath(); x.arc(84, y + 59, 13, 0, 7); x.fill(); } x.fillStyle = "#0b1220"; x.textAlign = "left"; ajustar(x, txt, 800, 48, W - 170); x.fillText(txt, 130, y + 61); };
  op(500, "Envío · viernes 18 a 20 h", true); op(636, "Retiro en la veterinaria", false);
  x.fillStyle = "#0b1220"; x.textAlign = "left"; x.font = F(800, 54); x.fillText("Total", 40, 818); x.textAlign = "right"; x.font = F(900, 66); x.fillText("$ 3.900", W - 40, 818);
  if (e < 2) { x.fillStyle = e === 1 ? "#3fa60a" : "#5ce611"; x.strokeStyle = "#0b1220"; x.lineWidth = 8; x.beginPath(); x.roundRect(30, 880, W - 60, 160, 80); x.fill(); x.stroke(); x.fillStyle = "#0b1220"; x.textAlign = "center"; x.font = F(900, 80); x.fillText("Pagar", W / 2, 962); if (e === 1) { x.fillStyle = "rgba(11,18,32,0.25)"; x.beginPath(); x.arc(W / 2 + 160, 960, 48, 0, 7); x.fill(); } }
  else { x.fillStyle = "#16243d"; x.beginPath(); x.roundRect(30, 880, W - 60, 230, 40); x.fill(); x.fillStyle = "#5ce611"; x.beginPath(); x.arc(118, 995, 58, 0, 7); x.fill(); tilde(x, 120, 997, 60, "#0b1220"); x.fillStyle = "#efeee5"; x.textAlign = "left"; ajustar(x, "Pagado", 900, 70, W - 260); x.fillText("Pagado", 200, 955); x.fillStyle = "#5ce611"; ajustar(x, "Llega el viernes", 800, 54, W - 240); x.fillText("Llega el viernes", 200, 1035); }
}
// Q5 · el panel de recompras: e = { filas (0..4), gira (0..1), plata (0/1) }
const FILAS = [["Toto · Vero", "Enviado"], ["Luna · Marta", "Retiro"], ["Coco · Julio", "Enviado"], ["Mora · Ana", "Enviado"]];
function dibujarPanel(x, W, H, e) {
  x.fillStyle = "#efeee5"; x.fillRect(0, 0, W, H); x.textBaseline = "middle";
  x.fillStyle = "#16243d"; x.fillRect(0, 0, W, 130); x.fillStyle = "#5ce611"; x.fillRect(0, 130, W, 10);
  x.fillStyle = "#efeee5"; x.textAlign = "left"; ajustar(x, "Recompras de ración · febrero", 800, 58, W - 60); x.fillText("Recompras de ración · febrero", 34, 68);
  const caja2 = (X, Y, w, h, tit, val, fondo, tinta) => { x.fillStyle = fondo; x.strokeStyle = "#0b1220"; x.lineWidth = 6; x.beginPath(); x.roundRect(X, Y, w, h, 26); x.fill(); x.stroke(); x.fillStyle = tinta; x.textAlign = "center"; ajustar(x, tit, 800, 42, w - 30); x.fillText(tit, X + w / 2, Y + 44); x.font = F(900, 86); x.fillText(val, X + w / 2, Y + 122); };
  const w2 = (W - 80) / 2;
  caja2(30, 164, w2, 176, "Avisos enviados", "23 ✓", "#16243d", "#efeee5");
  caja2(50 + w2, 164, w2, 176, "Repitieron", "19 ✓", "#5ce611", "#0b1220");
  x.fillStyle = "#16243d"; x.textAlign = "center"; ajustar(x, "Envío 14 · Retiro 5", 700, 40, W - 80); x.fillText("Envío 14 · Retiro 5", W / 2 + w2 / 2 + 10, 372);
  FILAS.forEach(([n, h], i) => {
    const y = 404 + i * 86, ok = i < e.filas;
    x.fillStyle = ok ? "#cfeebc" : "#ffffff"; x.strokeStyle = ok ? "#3fa60a" : "#b4b2a3"; x.lineWidth = 5; x.beginPath(); x.roundRect(30, y, W - 60, 74, 18); x.fill(); x.stroke();
    x.fillStyle = "#0b1220"; x.textAlign = "left"; x.font = F(800, 46); x.fillText(n, 66, y + 39);
    if (ok) { x.fillStyle = "#16243d"; x.textAlign = "right"; x.font = F(800, 44); x.fillText(h, W - 120, y + 39); x.fillStyle = "#3fa60a"; x.beginPath(); x.arc(W - 76, y + 37, 24, 0, 7); x.fill(); tilde(x, W - 75, y + 38, 24, "#0b1220"); }
  });
  // "Dejaron de comprar 11 → 2": el 11 rojo gira de canto y queda el 2 verde
  const yD = 762;
  x.fillStyle = "#ffffff"; x.strokeStyle = "#0b1220"; x.lineWidth = 6; x.beginPath(); x.roundRect(30, yD, W - 60, 150, 26); x.fill(); x.stroke();
  x.fillStyle = "#16243d"; x.textAlign = "left"; ajustar(x, "Dejaron de comprar", 800, 52, W * 0.55); x.fillText("Dejaron de comprar", 60, yD + 76);
  { const g = e.gira, sx = Math.abs(Math.cos(g * Math.PI)), v = g < 0.5 ? "11" : "2", col = g < 0.5 ? "#c7655b" : "#3fa60a"; x.save(); x.translate(W - 150, yD + 76); x.scale(Math.max(0.05, sx), 1); x.fillStyle = col; x.textAlign = "center"; x.font = F(900, 100); x.fillText(v, 0, 4); x.restore(); }
  if (e.plata) { x.fillStyle = "#16243d"; x.beginPath(); x.roundRect(30, 936, W - 60, 140, 30); x.fill(); x.fillStyle = "#5ce611"; x.textAlign = "center"; ajustar(x, "$ 74.100 en ración este mes", 900, 64, W - 100); x.fillText("$ 74.100 en ración este mes", W / 2, 1008); }
}
// ---- los insertos pegados a la cámara (fondo plano del set) ----
function crearFondoInserto(g, [c1, c2, c3]) {
  const bg = new THREE.Mesh(new THREE.PlaneGeometry(1400 / PXK, 2400 / PXK), new THREE.MeshBasicMaterial({ color: c1 })); bg.position.z = -0.06; g.add(bg);
  const pc = new THREE.Mesh(new THREE.PlaneGeometry(1400 / PXK, 1300 / PXK), new THREE.MeshBasicMaterial({ color: c2 })); pc.position.set(0, -560 / PXK, -0.058); g.add(pc);
  const pi = new THREE.Mesh(new THREE.PlaneGeometry(1400 / PXK, 420 / PXK), new THREE.MeshBasicMaterial({ color: c3 })); pi.position.set(0, -1000 / PXK, -0.057); g.add(pi);
}
function crearCelInserto(IW, IH, cx, cy, marcoR = 30, opc = {}) {
  const tex = lienzo(IW, IH, () => {});
  const g = new THREE.Group();
  const sombra = new THREE.Mesh(rbox((IW + 2 * marcoR) / PXK, (IH + 2 * marcoR) / PXK, 0.01, 80 / PXK, 3), new THREE.MeshBasicMaterial({ color: 0x050a14 })); sombra.position.set((cx - 540 + 18) / PXK, (960 - cy - 22) / PXK, -0.04); g.add(sombra);
  const marco = new THREE.Mesh(rbox((IW + 2 * marcoR) / PXK, (IH + 2 * marcoR) / PXK, 0.01, 80 / PXK, 3), new THREE.MeshBasicMaterial({ color: opc.funda ?? 0x0b1220 })); marco.position.set((cx - 540) / PXK, (960 - cy) / PXK, -0.03); g.add(marco);
  const pan = new THREE.Mesh(new THREE.PlaneGeometry(IW / PXK, IH / PXK), new THREE.MeshBasicMaterial({ map: tex, toneMapped: false })); pan.position.set((cx - 540) / PXK, (960 - cy) / PXK, -0.02); g.add(pan);
  if (opc.camara) { const cam = new THREE.Mesh(new THREE.CircleGeometry(Math.max(8, marcoR * 0.35) / PXK, 20), new THREE.MeshBasicMaterial({ color: 0x050a14 })); cam.position.set((cx - 540) / PXK, (960 - cy + IH / 2 + marcoR * 0.5) / PXK, -0.019); g.add(cam); }
  return { g, tex, IW, IH };
}
const FONDO_NOCHE = [0x16243d, 0x1f3254, 0xb9bec4], FONDO_DIA = [0xd9d7c9, 0x16243d, 0xb9bec4], FONDO_VET = [0x0b1220, 0x365f28, 0xd9d7c9];
function inserto(fondo, IW, IH, cy, marco, opc = {}) { const I = { g: new THREE.Group() }; crearFondoInserto(I.g, fondo); const c = crearCelInserto(IW, IH, 540, cy, marco, opc); I.g.add(c.g); I.tex = c.tex; I.IW = IW; I.IH = IH; pegarACamara(I.g, camera, 10); I.g.visible = false; return I; }
const INS_CERR = inserto(FONDO_NOCHE, 760, 1100, 1060, 32, { camara: true, funda: 0x16243d });
const INS_CHAT = inserto(FONDO_DIA, 860, 1400, 1060, 34, { camara: true, funda: 0x16243d });
const INS_FICHA = inserto(FONDO_VET, 1000, 1120, 1080, 18);
const INS_TIENDA = inserto(FONDO_DIA, 860, 1180, 1060, 34, { camara: true, funda: 0x16243d });
const INS_PANEL = inserto(FONDO_VET, 1000, 1120, 1080, 18);
const INSERTOS = [INS_CERR, INS_CHAT, INS_FICHA, INS_TIENDA, INS_PANEL];
dibujarCerrado(INS_CERR.tex.userData.x, INS_CERR.IW, INS_CERR.IH); INS_CERR.tex.needsUpdate = true;
dibujarFichaRec(INS_FICHA.tex.userData.x, INS_FICHA.IW, INS_FICHA.IH); INS_FICHA.tex.needsUpdate = true;
let cChat = "", cTienda = "", cPanel = "", cT3 = "";
function dibujarInterfaz(t) {
  const fC = t >= T.q1s - 0.05 ? 2 : 1;
  if (`${fC}` !== cChat) { cChat = `${fC}`; dibujarChat(INS_CHAT.tex.userData.x, INS_CHAT.IW, INS_CHAT.IH, fC); INS_CHAT.tex.needsUpdate = true; }
  const eT = t >= T.pagado ? 2 : t >= T.pagar ? 1 : 0;
  if (`${eT}` !== cTienda) { cTienda = `${eT}`; dibujarTienda(INS_TIENDA.tex.userData.x, INS_TIENDA.IW, INS_TIENDA.IH, eT); INS_TIENDA.tex.needsUpdate = true; }
  const eP = { filas: T.filas.filter((x) => t >= x).length, gira: Math.round(sg(t, T.gira, T.gira + 0.3) * 10) / 10, plata: t >= T.plata ? 1 : 0 }, kP = JSON.stringify(eP);
  if (kP !== cPanel) { cPanel = kP; dibujarPanel(INS_PANEL.tex.userData.x, INS_PANEL.IW, INS_PANEL.IH, eP); INS_PANEL.tex.needsUpdate = true; }
  // la tablet 3D del mostrador (parte 2): el panel ya resuelto
  const k3 = t >= P2 ? "P" : "";
  if (k3 !== cT3) { cT3 = k3; dibujarPanel(pantT.userData.x, 1000, 760, { filas: 4, gira: 1, plata: 0 }); pantT.needsUpdate = true; }
  // el celular de Vero en 3D: la tarjeta "Cerrado" (parte 1) o el chat (parte 2)
}
{ const x = pantCel.userData.x; x.save(); x.scale(400 / 760, 820 / 1100); dibujarCerrado(x, 760, 1100); x.restore(); pantCel.needsUpdate = true; }
