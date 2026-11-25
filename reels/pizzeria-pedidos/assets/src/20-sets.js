
// ===== 20-sets.js: las dos pizzerías enfrentadas (el mismo módulo, en espejo), la calle, el living y la puerta de Martín =====
// Mundo: Pizzería Don Tano con la vidriera en z = 0 y el local hacia -z; la calle de z = 0 a z = CALLE; Lucía Pizzas es el
// mismo módulo girado 180° con la vidriera en z = CALLE (su local hacia +z). Coordenadas LOCALES del módulo: x a lo ancho,
// el mostrador en z = MZ (de frente a +z, la vidriera), el horno contra el fondo (z = FZ).
const CALLE = 9.0;
const LOC = { XL: -2.6, XR: 2.6, FZ: -5.5, H: 3.0, MZ: -2.75, MW: 2.8, MD: 0.62, MA: 0.8, VX0: -2.2, VX1: 0.7, VY0: 0.75, VY1: 2.45, PX0: 1.15, PX1: 2.05, PH: 2.3 };
const subteT = (junta) => lienzo(512, 256, (x, w, h) => { x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h); x.fillStyle = junta; for (let j = 0; j < 4; j++) { x.fillRect(0, j * 64, w, 5); for (let i = 0; i < 5; i++) x.fillRect(i * 128 + (j % 2 ? 64 : 0), j * 64, 5, 64); } });
const ladrilloT = (base, junta) => lienzo(512, 256, (x, w, h) => { x.fillStyle = junta; x.fillRect(0, 0, w, h); x.fillStyle = base; for (let j = 0; j < 8; j++) for (let i = -1; i < 5; i++) x.fillRect(i * 128 + (j % 2 ? 64 : 0) + 4, j * 32 + 4, 120, 24); });
const pisoLocT = lienzo(512, 512, (x, w, h) => { for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { x.fillStyle = (i + j) % 2 ? "#b9bec4" : "#d9d7c9"; x.fillRect(i * 128, j * 128, 128, 128); } });
pisoLocT.wrapS = pisoLocT.wrapT = THREE.RepeatWrapping; pisoLocT.repeat.set(5.2 / 0.6, 5.5 / 0.6);
const conRep = (t, rx, ry) => { const c = t.clone(); c.wrapS = c.wrapT = THREE.RepeatWrapping; c.repeat.set(rx, ry); c.needsUpdate = true; return c; };
// texto plano en un lienzo (toldos, pizarra, vinilo)
function cartelT(w, h, fondo, dib) { return lienzo(w, h, (x) => { x.fillStyle = fondo; x.fillRect(0, 0, w, h); x.textAlign = "center"; x.textBaseline = "middle"; dib(x, w, h); }); }
function crearLocal(tipo) {
  const L = LOC, g = new THREE.Group(), esT = tipo === "tano";
  const arriba = esT ? mat(0x365f28, 0.9) : mat(0x16243d, 0.9);
  const sub = subteT("#1f3254");
  // piso, techo, paredes (azulejo subte crema hasta 1,6 y arriba el color del local)
  const piso = mesh(new THREE.PlaneGeometry(L.XR - L.XL, -L.FZ), new THREE.MeshStandardMaterial({ map: pisoLocT, roughness: 0.85 }), 0, 0, L.FZ / 2); piso.rotation.x = -PI / 2; piso.castShadow = false; g.add(piso);
  const techo = mesh(new THREE.PlaneGeometry(L.XR - L.XL, -L.FZ), new THREE.MeshBasicMaterial({ color: 0x0b1220 }), 0, L.H, L.FZ / 2); techo.rotation.x = PI / 2; techo.castShadow = false; g.add(techo);
  const pared = (w, x, z, ry) => {
    const az1 = mesh(new THREE.PlaneGeometry(w, 1.6), new THREE.MeshStandardMaterial({ map: conRep(sub, w / 0.6, 1.6 / 0.3), roughness: 0.6 }), x, 0.8, z); az1.rotation.y = ry; az1.castShadow = false; g.add(az1);
    const ar = mesh(new THREE.PlaneGeometry(w, L.H - 1.6), arriba, x, 1.6 + (L.H - 1.6) / 2, z); ar.rotation.y = ry; ar.castShadow = false; g.add(ar);
    const gu = mesh(new THREE.PlaneGeometry(w, 0.05), M.navy3, x, 1.6, z); gu.rotation.y = ry; gu.position.add(V3(Math.sin(ry) * 0.004, 0, Math.cos(ry) * 0.004)); g.add(gu);
  };
  pared(L.XR - L.XL, 0, L.FZ, 0); pared(-L.FZ, L.XL, L.FZ / 2, PI / 2); pared(-L.FZ, L.XR, L.FZ / 2, -PI / 2);
  // el tubo de luz del techo (crema plano)
  for (const z of [-1.4, -3.6]) g.add(mesh(new THREE.BoxGeometry(1.4, 0.04, 0.1), M.luz, 0, L.H - 0.03, z));
  // el mostrador: tapa de mármol crema, frente navy (Don Tano) o navy con la franja verde de marca (Lucía)
  const mo = new THREE.Group(); mo.position.set(0, 0, L.MZ); g.add(mo);
  mo.add(caja(L.MW + 0.08, 0.05, L.MD + 0.08, M.marmol, 0, L.MA - 0.025, 0, 0.012));
  mo.add(caja(L.MW, L.MA - 0.05, L.MD, M.navy, 0, (L.MA - 0.05) / 2, 0, 0.012));
  if (!esT) mo.add(caja(L.MW - 0.02, 0.14, 0.02, M.g, 0, L.MA - 0.22, L.MD / 2 + 0.005, 0.01));
  else for (const x of [-0.9, 0, 0.9]) mo.add(caja(0.86, 0.6, 0.015, M.navy3, x, 0.42, L.MD / 2 + 0.004, 0.01));
  // la mesada del fondo a la derecha (x 0,4 a 2,5): cajas, pizarra arriba
  g.add(caja(2.1, 0.9, 0.6, M.navy3, 1.45, 0.45, L.FZ + 0.32, 0.012)); g.add(caja(2.14, 0.04, 0.64, M.marmol, 1.45, 0.92, L.FZ + 0.32, 0.01));
  // el horno contra el fondo a la izquierda y la pala apoyada
  const horno = crearHorno(); horno.position.set(-1.15, 0, L.FZ + 0.52); g.add(horno);
  const pala = crearPala(); pala.position.set(-2.3, 0, L.FZ + 0.28); pala.rotation.set(0.12, 0.4, -0.1); g.add(pala);
  // la pila de cajas kraft en la mesada (Don Tano: torcidas; Lucía: armadas con el ticket pegado, en un estante)
  for (let i = 0; i < 7; i++) { const c = caja(0.42, 0.045, 0.42, M.kraft, 2.0 + (esT ? (i % 3 - 1) * 0.03 : 0), 0.965 + i * 0.047, L.FZ + 0.3, 0.004); c.rotation.y = esT ? ((i * 5) % 7 - 3) * 0.06 : 0; g.add(c); }
  if (!esT) { g.add(caja(1.2, 0.03, 0.4, M.navy3, 1.2, 1.95, L.FZ + 0.2, 0.008)); for (let i = 0; i < 3; i++) { const c = caja(0.36, 0.08, 0.36, M.kraft, 0.8 + i * 0.4, 2.005, L.FZ + 0.2, 0.004); g.add(c); g.add(plano(0.09, 0.07, ticketMini(44 + i), 0.8 + i * 0.4, 2.005, L.FZ + 0.385)); } }
  // la pizarra de precios (navy con tiza crema)
  const piz = cartelT(900, 560, "#0b1220", (x, w, h) => {
    x.strokeStyle = "#8f969f"; x.lineWidth = 22; x.strokeRect(11, 11, w - 22, h - 22); x.fillStyle = "#efeee5";
    const filas = [["MUZZA", "$ 520"], ["FUGAZZETA", "$ 580"], ["JAMÓN Y MORRÓN", "$ 610"], ["FAINÁ", "$ 110"]];
    x.font = CAV(92); x.fillText(esT ? "PIZZAS" : "MENÚ", w / 2, 92);
    filas.forEach(([a, b], i) => { x.textAlign = "left"; x.font = CAV(66); x.fillText(a, 60, 200 + i * 92); x.textAlign = "right"; x.fillText(b, w - 60, 200 + i * 92); x.textAlign = "center"; });
  });
  g.add(caja(1.12, 0.72, 0.03, M.navy3, 1.2, 2.25, L.FZ + 0.02, 0.01)); g.add(plano(1.06, 0.66, piz, 1.2, 2.25, L.FZ + 0.04));
  // la fachada (pared con la vidriera y la puerta), del lado de la calle
  const lad = conRep(esT ? ladrilloT("#1f3254", "#0b1220") : ladrilloT("#d9d7c9", "#b4b2a3"), 1, 1);
  const fach = esT ? mat(0x1f3254, 0.85) : mat(0xd9d7c9, 0.85);
  const muro = (x0, x1, y0, y1) => { const w = x1 - x0, h = y1 - y0; const t = lad.clone(); t.needsUpdate = true; t.repeat.set(w / 1.2, h / 0.6); const m = mesh(new THREE.BoxGeometry(w, h, 0.22), [fach, fach, fach, fach, new THREE.MeshStandardMaterial({ map: t, roughness: 0.85 }), esT ? mat(0x365f28, 0.9) : mat(0x16243d, 0.9)], (x0 + x1) / 2, (y0 + y1) / 2, -0.11); m.castShadow = false; g.add(m); };
  muro(L.XL - 1.4, L.VX0, 0, 4.4); muro(L.VX0, L.VX1, 0, L.VY0); muro(L.VX0, L.VX1, L.VY1, 4.4); muro(L.VX1, L.PX0, 0, 4.4); muro(L.PX0, L.PX1, L.PH, 4.4); muro(L.PX1, L.XR + 1.4, 0, 4.4);
  // marcos navy de la vidriera y de la puerta
  for (const [x, y, w, h] of [[(L.VX0 + L.VX1) / 2, L.VY0, L.VX1 - L.VX0 + 0.1, 0.08], [(L.VX0 + L.VX1) / 2, L.VY1, L.VX1 - L.VX0 + 0.1, 0.08], [L.VX0, (L.VY0 + L.VY1) / 2, 0.08, L.VY1 - L.VY0], [L.VX1, (L.VY0 + L.VY1) / 2, 0.08, L.VY1 - L.VY0], [L.PX0, L.PH / 2, 0.08, L.PH], [L.PX1, L.PH / 2, 0.08, L.PH], [(L.PX0 + L.PX1) / 2, L.PH, L.PX1 - L.PX0 + 0.08, 0.08]]) g.add(caja(w, h, 0.26, esT ? M.navy : M.navy3, x, y, -0.11, 0.01));
  // el toldo (navy con "DON TANO · PIZZAS" crema / crema con "LUCÍA · PIZZAS" navy) y el faldón con el texto
  const tf = esT ? "#16243d" : "#efeee5", tt = esT ? "#efeee5" : "#16243d";
  const toldoM = mat(new THREE.Color(tf).getHex(), 0.8);
  const to = mesh(new THREE.BoxGeometry(L.VX1 - L.VX0 + 2.0, 0.04, 1.35), toldoM, (L.VX0 + L.PX1) / 2, 2.98, 0.62); to.rotation.x = 0.36; g.add(to);
  const fal = cartelT(2000, 220, tf, (x, w, h) => { x.fillStyle = tt; ajustar(x, esT ? "DON TANO · PIZZAS" : "LUCÍA · PIZZAS", 900, 150, w - 160); x.fillText(esT ? "DON TANO · PIZZAS" : "LUCÍA · PIZZAS", w / 2, h / 2 + 8); x.fillStyle = esT ? "#5ce611" : "#365f28"; x.fillRect(0, h - 18, w, 18); });
  const fw = L.PX1 - L.VX0 + 0.4;
  g.add(caja(fw, 0.36, 0.03, toldoM, (L.VX0 + L.PX1) / 2, 2.6, 1.27, 0.01)); g.add(plano(fw - 0.04, 0.34, fal, (L.VX0 + L.PX1) / 2, 2.6, 1.29));
  sombras(g);
  // lo que no se fusiona (transparente o que se mueve)
  const vidrio = mesh(new THREE.PlaneGeometry(L.VX1 - L.VX0, L.VY1 - L.VY0), new THREE.MeshStandardMaterial({ color: 0xb9cde0, roughness: 0.1, transparent: true, opacity: 0.14, depthWrite: false }), (L.VX0 + L.VX1) / 2, (L.VY0 + L.VY1) / 2, -0.05); vidrio.castShadow = false; vidrio.receiveShadow = false;
  const hoja = new THREE.Group(); hoja.position.set(L.PX0 + 0.04, 0, -0.08);
  hoja.add(caja(L.PX1 - L.PX0 - 0.08, L.PH - 0.04, 0.05, esT ? M.navy : M.navy3, (L.PX1 - L.PX0 - 0.08) / 2, (L.PH - 0.04) / 2, 0, 0.01));
  hoja.add(mesh(new THREE.PlaneGeometry(L.PX1 - L.PX0 - 0.3, 1.3), vidrio.material, (L.PX1 - L.PX0 - 0.08) / 2, 1.3, 0.03));
  hoja.add(caja(0.04, 0.3, 0.06, M.acero, L.PX1 - L.PX0 - 0.2, 1.05, 0.05, 0.01));
  return { g, horno, vidrio, hoja };
}
const TANO = crearLocal("tano"); scene.add(TANO.g); fusionar(TANO.g); TANO.g.add(TANO.vidrio, TANO.hoja);
const LUCI = crearLocal("lucia"); LUCI.g.rotation.y = PI; LUCI.g.position.z = CALLE; scene.add(LUCI.g); fusionar(LUCI.g); LUCI.g.add(LUCI.vidrio, LUCI.hoja);
// de local a mundo (para cada pizzería)
const enT = (x, y, z) => V3(x, y, z);
const enL = (x, y, z) => V3(-x, y, CALLE - z);
// el vinilo "Pedí online" con el QR (cuadritos ilegibles a propósito) en la vidriera de Lucía, mirando a la calle
const vinT = lienzo(600, 600, (x, w, h) => {
  x.clearRect(0, 0, w, h); x.fillStyle = "#efeee5"; x.beginPath(); x.roundRect(10, 10, w - 20, h - 20, 40); x.fill();
  x.fillStyle = "#0b1220"; x.textAlign = "center"; x.textBaseline = "middle"; x.font = F(900, 88); x.fillText("Pedí online", w / 2, 92);
  semilla = 3; const q = 300, q0 = (w - q) / 2, n = 15, c = q / n;
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) { const esq = (i < 4 && j < 4) || (i > 10 && j < 4) || (i < 4 && j > 10); if (esq ? (i % 3 === 0 || j % 3 === 0 || (i % 3 === 1 && j % 3 === 1)) && !((i === 1 || i === 2 || i === 12 || i === 13) && (j === 1 || j === 2 || j === 12 || j === 13) && !(i % 3 === 1 && j % 3 === 1)) : az() > 0.5) x.fillRect(q0 + i * c, 170 + j * c, c, c); }
  x.fillStyle = "#3fa60a"; x.font = F(800, 50); x.fillText("y pagás ahí", w / 2, 530);
});
const VINILO = plano(0.95, 0.95, vinT, 0, 0, 0, true); VINILO.material.transparent = true; VINILO.position.copy(enL(-1.3, 1.55, 0.02)); VINILO.rotation.y = PI; scene.add(VINILO);   // mira a -z del mundo (hacia Don Tano)
// ---------- la calle de noche: veredas crema, adoquines navy, el farol, vecinos a los costados ----------
const CAL = new THREE.Group(); scene.add(CAL);
{
  const adoq = lienzo(512, 512, (x, w, h) => { x.fillStyle = "#16243d"; x.fillRect(0, 0, w, h); x.fillStyle = "#0b1220"; for (let j = 0; j < 8; j++) { x.fillRect(0, j * 64, w, 5); for (let i = 0; i < 5; i++) x.fillRect(i * 128 + (j % 2 ? 64 : 0), j * 64, 5, 64); } });
  adoq.wrapS = adoq.wrapT = THREE.RepeatWrapping; adoq.repeat.set(30 / 2.4, 5 / 2.4);
  const calle = mesh(new THREE.PlaneGeometry(30, CALLE - 4), new THREE.MeshStandardMaterial({ map: adoq, roughness: 0.9 }), 0, 0, CALLE / 2); calle.rotation.x = -PI / 2; calle.castShadow = false; CAL.add(calle);
  for (const z of [1, CALLE - 1]) { CAL.add(caja(30, 0.14, 2, mat(0xd9d7c9, 0.85), 0, 0.07, z, 0.01)); CAL.add(caja(30, 0.15, 0.1, mat(0xb4b2a3, 0.8), 0, 0.075, z < 4 ? 2 : CALLE - 2, 0.01)); }
  // la senda peatonal (rayas crema) entre las dos pizzerías: se lee "cruzar la calle" desde arriba
  for (let i = 0; i < 6; i++) { const r = mesh(new THREE.PlaneGeometry(1.8, 0.42), mat(0xd9d7c9, 0.85), 1.4, 0.006, 2.55 + i * 0.8); r.rotation.x = -PI / 2; r.castShadow = false; CAL.add(r); }
  // vecinos: fachadas lisas navy a los costados (los dos lados), con ventanas crema apagadas
  for (const [zf, sz] of [[0, 1], [CALLE, -1]]) for (const x of [-7.5, 7.5]) { CAL.add(caja(10.4 - 5.2 + 0.4, 5, 0.4, mat(x < 0 ? 0x16243d : 0x1f3254, 0.9), x, 2.5, zf - sz * 0.2, 0.01)); for (const dx of [-1.2, 1.2]) CAL.add(caja(1.0, 1.2, 0.05, mat(0x2c4268, 0.6), x + dx, 1.9, zf + sz * 0.01, 0.01)); }
  // el farol (en la vereda de Lucía, entre los dos locales)
  const fa = new THREE.Group(); fa.position.set(3.4, 0.14, CALLE - 1.6); CAL.add(fa);
  fa.add(mesh(new THREE.CylinderGeometry(0.05, 0.07, 3.6, 10), M.navy3, 0, 1.8, 0)); fa.add(mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.8, 8).rotateZ(PI / 2), M.navy3, -0.35, 3.55, 0));
  fa.add(mesh(new THREE.ConeGeometry(0.2, 0.22, 16, 1, true), mat(0x1f3254, 0.6, { side: THREE.DoubleSide }), -0.7, 3.42, 0)); fa.add(mesh(new THREE.SphereGeometry(0.1, 12, 8), M.luz, -0.7, 3.32, 0));
  sombras(CAL);
}
fusionar(CAL);
const luzFarol = new THREE.PointLight(0xffe6bf, 0, 9, 1.5); luzFarol.position.set(2.7, 3.2, CALLE - 1.6); scene.add(luzFarol);
// ---------- el living de Martín (x = LX): pared crema, el sillón verde apagado, la lámpara de pie ----------
const LX = 40;
const LIV = new THREE.Group(); LIV.position.x = LX; scene.add(LIV);
{
  const piso = mesh(new THREE.PlaneGeometry(8, 6), mat(0xb98d5e, 0.85), 0, 0, 0); piso.rotation.x = -PI / 2; piso.castShadow = false; LIV.add(piso);
  LIV.add(mesh(new THREE.BoxGeometry(8, 3, 0.2), mat(0xe9e5d6, 0.9), 0, 1.5, -1.6));
  LIV.add(mesh(new THREE.BoxGeometry(0.2, 3, 6), mat(0xd9d4c2, 0.9), -2.6, 1.5, 1.0));
  const alf = mesh(new THREE.PlaneGeometry(2.4, 1.6), mat(0x1f3254, 0.95), 0.1, 0.004, 0.2); alf.rotation.x = -PI / 2; alf.castShadow = false; LIV.add(alf);
  // el sillón (dos cuerpos) verde apagado
  const so = new THREE.Group(); so.position.set(0, 0, -0.95); LIV.add(so); const sm = mat(0x365f28, 0.9), sm2 = mat(0x2c4f20, 0.9);
  so.add(caja(2.0, 0.38, 0.85, sm2, 0, 0.19, 0, 0.06)); so.add(caja(0.92, 0.16, 0.7, sm, -0.47, 0.46, 0.06, 0.06)); so.add(caja(0.92, 0.16, 0.7, sm, 0.47, 0.46, 0.06, 0.06));
  so.add(caja(2.0, 0.62, 0.22, sm, 0, 0.66, -0.34, 0.08)); for (const s of [-1, 1]) so.add(caja(0.2, 0.5, 0.85, sm, s * 1.05, 0.5, 0, 0.08));
  so.add(caja(0.36, 0.3, 0.12, mat(0xefeee5, 0.95), 0.75, 0.66, -0.15, 0.05));
  // la lámpara de pie (luz crema plana) y un cuadro
  const la = new THREE.Group(); la.position.set(1.6, 0, -1.0); LIV.add(la); la.add(mesh(new THREE.CylinderGeometry(0.14, 0.16, 0.03, 16), M.navy3, 0, 0.015, 0)); la.add(mesh(new THREE.CylinderGeometry(0.015, 0.015, 1.5, 8), M.navy3, 0, 0.75, 0)); la.add(mesh(new THREE.CylinderGeometry(0.16, 0.24, 0.3, 20, 1, true), mat(0xefeee5, 0.8, { side: THREE.DoubleSide }), 0, 1.6, 0));
  LIV.add(caja(0.9, 0.6, 0.03, M.navy3, -0.6, 1.75, -1.49, 0.01)); LIV.add(caja(0.8, 0.5, 0.01, mat(0x5ce611, 0.8), -0.6, 1.75, -1.47, 0.006)); LIV.add(caja(0.8, 0.2, 0.012, mat(0x16243d, 0.8), -0.6, 1.6, -1.465, 0.004));
  // la mesa ratona
  LIV.add(caja(0.9, 0.05, 0.5, M.cr, 0.0, 0.4, 0.35, 0.012)); for (const [a, b] of [[-0.4, 0.15], [0.4, 0.15], [-0.4, 0.55], [0.4, 0.55]]) LIV.add(caja(0.04, 0.38, 0.04, M.navy3, a, 0.19, b, 0.006));
  sombras(LIV);
}
fusionar(LIV);
// ---------- la puerta de Martín (x = PX2): el palier de afuera crema, la puerta navy2 que abre hacia adentro ----------
const PX2 = 60, PZ2 = -1.0;
const PUE = new THREE.Group(); PUE.position.x = PX2; scene.add(PUE);
{
  const piso = mesh(new THREE.PlaneGeometry(6, 5), mat(0xb98d5e, 0.85), 0, 0, 1.4); piso.rotation.x = -PI / 2; piso.castShadow = false; PUE.add(piso);
  const pm = mat(0xe9e5d6, 0.9);
  PUE.add(mesh(new THREE.BoxGeometry(2.2, 2.8, 0.14), pm, -1.6, 1.4, PZ2)); PUE.add(mesh(new THREE.BoxGeometry(2.2, 2.8, 0.14), pm, 1.6, 1.4, PZ2)); PUE.add(mesh(new THREE.BoxGeometry(1.0, 0.6, 0.14), pm, 0, 2.5, PZ2));
  for (const x of [-0.53, 0.53]) PUE.add(caja(0.08, 2.24, 0.18, M.cr, x, 1.12, PZ2, 0.01)); PUE.add(caja(1.14, 0.08, 0.18, M.cr, 0, 2.24, PZ2, 0.01));
  // afuera: el palier (pared crema con la luz crema, piso)
  const af = mesh(new THREE.PlaneGeometry(6, 3), new THREE.MeshBasicMaterial({ color: 0xd9cdaa }), 0, 1.5, PZ2 - 2.0); af.castShadow = false; PUE.add(af);
  const ve = mesh(new THREE.PlaneGeometry(6, 2.0), mat(0xb4b2a3, 0.9), 0, 0.001, PZ2 - 1.0); ve.rotation.x = -PI / 2; ve.castShadow = false; PUE.add(ve);
  PUE.add(mesh(new THREE.SphereGeometry(0.1, 12, 8), M.luz, 0, 2.6, PZ2 - 1.9));
  // el perchero con la campera y un cuadro
  PUE.add(caja(0.5, 0.6, 0.03, M.navy3, -1.3, 1.6, PZ2 + 0.09, 0.01)); PUE.add(caja(0.4, 0.5, 0.01, mat(0xc9a774, 0.8), -1.3, 1.6, PZ2 + 0.11, 0.006));
  sombras(PUE);
}
fusionar(PUE);
const PHOJA = new THREE.Group(); PHOJA.position.set(PX2 + 0.49, 0, PZ2 + 0.05); scene.add(PHOJA);
{ PHOJA.add(caja(0.96, 2.16, 0.05, M.navy2, -0.48, 1.08, 0, 0.01)); PHOJA.add(caja(0.8, 0.04, 0.06, M.cr, -0.48, 1.6, 0.0, 0.01)); PHOJA.add(mesh(new THREE.SphereGeometry(0.03, 12, 10), M.acero, -0.86, 1.05, 0.05)); sombras(PHOJA); }
