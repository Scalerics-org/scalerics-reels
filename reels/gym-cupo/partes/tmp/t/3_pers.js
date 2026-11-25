
// =====================================================================================================
// LOS PERSONAJES
// =====================================================================================================
const mauro = crearPersonaje({ ...ELENCO.mauro, franja: null, dedos: true, parpadeoCada: 999, parpadeosExtra: [r2(T.p3 + 0.3), r2(T.p5c + 0.6)] });
// Graciela, versión gimnasio: la misma cara, rulos lila y lentes; remera crema de manga larga, calza navy, zapatillas crema
const graciela = crearPersonaje({ ...ELENCO.clienta, camisa: MARCA.cr, cuello: MARCA.cr2, cuelloFino: true, cuelloBotones: false, pollera: null, pantalon: MARCA.navy, zapatos: MARCA.cr, aros: null, dedos: true, parpadeoCada: 999, parpadeosExtra: [r2(T.q3b + 1.5)] });
const majo = crearPersonaje({ ...ELENCO.majo, dedos: true, parpadeoCada: 999, parpadeosExtra: [] });
const sole = crearPersonaje({ ...ELENCO.sole, parpadeoCada: 999 });
// la franja verde de marca en el pecho de Mauro: una banda chata solo adelante (no el aro de personajes.js)
{ const f = mesh(new THREE.TorusGeometry(0.222, 0.011, 6, 40, Math.PI * 0.9), mat(MARCA.g, 0.5), 0, 0.33, 0); f.rotation.set(Math.PI / 2, 0, Math.PI * 0.05); f.scale.set(1, 0.875, 2.6); f.castShadow = false; mauro.cuerpo.add(f); }
// la vincha de tela verde de Graciela (un aro ancho apoyado arriba de la frente, por debajo de los rulos de arriba)
{ const v = mesh(new THREE.TorusGeometry(0.29, 0.03, 10, 40), mat(MARCA.g, 0.8), 0, 0.33, -0.015); v.rotation.x = Math.PI / 2 - 0.42; v.scale.set(1.04, 1.06, 0.62); v.castShadow = false; graciela.cabeza.add(v); }
// los alumnos de relleno (sin voz): A-H en la parte 1 (3, 5, 6, 8, 9, 10, 12, 14); I-K se suman en la parte 2 (2, 11, 13)
const ROPA = { cr: MARCA.cr, navyC: 0x2c4268, verdeA: 0x365f28, navy3: MARCA.navy3, celeste: 0xb9cde0, cr2: MARCA.cr2 };
const RELLENO = [
  { nombre: "A", piel: PIEL.media, pelo: PELO.castaño, peinado: "coleta", cejasColor: 0x4a3222, cejaFina: true, pestanas: 0x1a1414, labiosPegados: true, labios: 0xa8484f, camisa: ROPA.navyC, mangas: "cortas", pantalon: MARCA.navy, alto: 0.95 },
  { nombre: "B", piel: PIEL.morena, pelo: PELO.negro, peinado: "texturado", texturaAlto: 0.5, cejasColor: 0x1e1a18, camisa: ROPA.cr, mangas: "cortas", pantalon: MARCA.navy2, alto: 1.02 },
  { nombre: "C", piel: PIEL.clara, pelo: PELO.rubio, peinado: "mediaCola", cejasColor: 0x8a6a40, cejaFina: true, pestanas: 0x1a1414, labiosPegados: true, labios: 0xb5555a, camisa: ROPA.verdeA, mangas: "cortas", pantalon: MARCA.navy, alto: 0.96 },
  { nombre: "D", piel: PIEL.trigueña, pelo: 0x3b2a22, peinado: "corto", cejasColor: 0x2a2220, barba: 0x2a2220, barbaLarga: 0.3, barbaOpacidad: 0.4, camisa: ROPA.navy3, mangas: "cortas", pantalon: 0x3a3f4a, alto: 1.03 },
  { nombre: "E", piel: PIEL.clara, pelo: PELO.canoso, peinado: "corto", cejasColor: 0xb9b6b0, camisa: ROPA.celeste, mangas: "cortas", pantalon: MARCA.navy2, alto: 1.0 },
  { nombre: "F", piel: PIEL.morena, pelo: PELO.negro, peinado: "coletaAlta", sinFlequillo: true, cejasColor: 0x1e1a18, cejaFina: true, pestanas: 0x1a1414, labiosPegados: true, labios: 0x8e3f3c, camisa: ROPA.cr, mangas: "cortas", pantalon: MARCA.navy, alto: 0.95 },
  { nombre: "G", piel: PIEL.media, pelo: PELO.castaño, peinado: "texturado", texturaAlto: 0.8, cejasColor: 0x4a3222, camisa: ROPA.verdeA, mangas: "cortas", pantalon: MARCA.navy, alto: 1.0 },
  { nombre: "H", piel: PIEL.trigueña, pelo: 0x6b4429, peinado: "melena", cejasColor: 0x4a3222, cejaFina: true, pestanas: 0x1a1414, labiosPegados: true, labios: 0xa8484f, camisa: ROPA.navyC, mangas: "cortas", pantalon: MARCA.navy2, alto: 0.95 },
  { nombre: "I", piel: PIEL.clara, pelo: PELO.negro, peinado: "texturado", texturaAlto: 0.4, cejasColor: 0x2a2220, camisa: ROPA.navy3, mangas: "cortas", pantalon: MARCA.navy, alto: 1.0 },   // (r1) varón: con rodete se confundía con Sole
  { nombre: "J", piel: PIEL.media, pelo: PELO.gris, peinado: "pelado", cejasColor: 0x5a5550, camisa: ROPA.cr2, mangas: "cortas", pantalon: MARCA.navy2, alto: 1.02 },
  { nombre: "K", piel: PIEL.morena, pelo: PELO.negro, peinado: "rulos", cejasColor: 0x1e1a18, cejaFina: true, pestanas: 0x1a1414, labiosPegados: true, labios: 0x8e3f3c, camisa: ROPA.verdeA, mangas: "cortas", pantalon: MARCA.navy, alto: 0.96 },
].map((c) => crearPersonaje({ ...DEFECTO, cuelloFino: true, cuelloBotones: false, cuelloAlto: 0.05, zapatos: MARCA.cr, nariz: 0.05, ...c, parpadeoCada: 999 }));
const TODOS = [mauro, graciela, majo, sole, ...RELLENO];
for (const p of TODOS) { scene.add(p.raiz); p.raiz.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } }); }
// quién va en qué bici: parte 1 (los nueve que vinieron) y parte 2 (las catorce)
const EN_BICI_1 = [[graciela, 1], [RELLENO[0], 3], [RELLENO[1], 5], [RELLENO[2], 6], [RELLENO[3], 8], [RELLENO[4], 9], [RELLENO[5], 10], [RELLENO[6], 12], [RELLENO[7], 14]];
const EN_BICI_2 = [...EN_BICI_1, [sole, 4], [majo, 7], [RELLENO[8], 2], [RELLENO[9], 11], [RELLENO[10], 13]];
const VACIAS_1 = [2, 4, 7, 11, 13];

// =====================================================================================================
// UTILERÍA
// =====================================================================================================
// la toalla crema con una franja verde fina: colgada del manubrio (sobre la barra transversal, en el espacio de la bici)
function crearToallaColgada() {
  // una toalla de tela grande doblada sobre la barra: el lomo redondo arriba y dos paños con pliegues que caen
  const g = new THREE.Group(), m = mat(0xffffff, 0.95), mg = mat(MARCA.g, 0.8);
  g.add(mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.46, 18).rotateZ(Math.PI / 2), m, 0, 0.012, 0));
  for (const [z, L, rx] of [[0.04, 0.42, -0.1], [-0.04, 0.34, 0.12]]) {
    const pa = new THREE.Group(); pa.position.set(0, 0.01, z); pa.rotation.x = rx; g.add(pa);
    pa.add(caja(0.44, L, 0.03, m, 0, -L / 2, 0, 0.012)); for (let i = 0; i < 4; i++) { const p = mesh(new THREE.CylinderGeometry(0.022, 0.03, L * 0.92, 10), m, -0.15 + i * 0.1, -L * 0.48, 0.012); p.scale.z = 0.6; pa.add(p); }
    for (const y of [-L + 0.05, -L + 0.1]) pa.add(caja(0.46, 0.022, 0.035, mg, 0, y, 0, 0.005));
  }
  return sombras(g);
}
// la toalla al cuello (en el espacio del cuerpo): media vuelta por atrás y las dos puntas que caen sobre el pecho
function crearToallaCuello(k = 1, blanca = false) {
  // un rollo con volumen que rodea el cuello por atrás y dos puntas redondeadas que caen sobre el pecho, con franja verde
  const g = new THREE.Group(), m = mat(blanca ? 0xffffff : 0xf3f1e8, 0.95), mg = mat(MARCA.g, 0.8);
  const ar = mesh(new THREE.TorusGeometry(0.135, 0.045, 12, 28, Math.PI * 1.3), m, 0, 0.5, -0.01); ar.rotation.set(Math.PI / 2 - 0.12, 0, Math.PI * 0.35 - Math.PI * 1.3 / 2 + Math.PI / 2 + Math.PI); ar.scale.set(1, 0.95, 0.7); g.add(ar);
  for (const s of [-1, 1]) {
    const pu = new THREE.Group(); pu.position.set(s * 0.1, 0.47, 0.15); pu.rotation.set(-0.35, 0, s * 0.1); g.add(pu);
    const c = mesh(new THREE.CapsuleGeometry(0.042, 0.13, 6, 12), m, 0, -0.09, 0); c.scale.set(1.05, 1, 0.6); pu.add(c);
    const f = mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.025, 14), mg, 0, -0.15, 0); f.scale.set(1.05, 1, 0.62); pu.add(f);
  }
  g.scale.setScalar(k);
  return sombras(g);
}
// la toalla doblada en la mano (cuelga de la mano)
function crearToallaMano() {
  const g = new THREE.Group(), m = mat(0xf3f1e8, 0.95), mg = mat(MARCA.g, 0.8);
  const mb = mat(0xffffff, 0.9); g.add(caja(0.15, 0.34, 0.03, mb, 0, -0.15, 0, 0.012)); for (const y of [-0.06, -0.27]) g.add(caja(0.152, 0.035, 0.034, mg, 0, y, 0, 0.004));
  return sombras(g);
}
const TOALLA_2 = crearToallaColgada(); scene.add(TOALLA_2);          // la de Graciela en la bici 2 (parte 1)
const TOALLA_G_MANO = crearToallaMano(); scene.add(TOALLA_G_MANO);    // Graciela en Q3
const TOALLA_G_CUELLO = crearToallaCuello(1.12, true); graciela.cuerpo.add(TOALLA_G_CUELLO);
const TOALLA_M_CUELLO = crearToallaCuello(1.0); mauro.cuerpo.add(TOALLA_M_CUELLO);
// la botella de agua verde apagado (bici 4), el celular (bici 7), la campera navy2 (bici 11), la mochila (bici 13)
const BOTELLA = new THREE.Group(); { BOTELLA.add(mesh(new THREE.CylinderGeometry(0.038, 0.038, 0.21, 18), mat(0x4f8a35, 0.45), 0, 0.105, 0)); BOTELLA.add(mesh(new THREE.CylinderGeometry(0.024, 0.032, 0.04, 14), M.cr, 0, 0.23, 0)); scene.add(sombras(BOTELLA)); }
const celPerT = lienzo(200, 400, (x, w, h) => { x.fillStyle = "#16243d"; x.fillRect(0, 0, w, h); x.fillStyle = "#efeee5"; x.font = F(800, 60); x.textAlign = "center"; x.fillText("19:00", w / 2, 120); });
const CEL_7 = crearCelular(celPerT, MARCA.cr2, 0.08, 0.162); CEL_7.scale.setScalar(1.25); scene.add(CEL_7);
const CAMPERA = crearCamperaColgada({ color: MARCA.navy2, cuello: MARCA.cr, cierre: MARCA.g }); CAMPERA.scale.setScalar(0.62); scene.add(CAMPERA);
const MOCHILA = crearMochila(0x365f28, MARCA.cr); scene.add(MOCHILA);
const PERCHEROS = [TOALLA_2, BOTELLA, CEL_7, CAMPERA, MOCHILA];
// dónde termina cada perchero, en el espacio de su bici: [bici, x, y, z, rx, ry, rz]
const PERCH_FIN = [[2, 0, BICI.manubrio[0], BICI.manubrio[1], 0, 0, 0], [4, 0, BICI.asiento + 0.01, 0.02, 0, 0, 0], [7, 0, BICI.manubrio[0] + 0.02, BICI.manubrio[1] - 0.02, -1.25, 0, 0], [11, -0.1, BICI.manubrio[0], BICI.manubrio[1], 0, Math.PI / 2, 0], [13, 0, BICI.asiento + 0.2, -0.02, -0.12, 0, 0]];
// de quién sale cada perchero (el vecino que lo tira): [personaje, lado de la mano]
const PERCH_DE = [[graciela, "I"], [RELLENO[0], "I"], [RELLENO[2], "D"], [RELLENO[5], "D"], [RELLENO[6], "I"]];
// el celular de Mauro (funda navy2): en la mano (P1) y en el soporte del manubrio (P5); pantalla 420 x 860
const celMT = lienzo(420, 860, () => {});
const CEL_M = crearCelular(celMT, MARCA.navy2, 0.08, 0.162); CEL_M.scale.setScalar(1.2); scene.add(CEL_M);
// el celular de Majo (funda verde apagado) en el living (Q1b)
const celJT = lienzo(420, 860, () => {});
const CEL_J = crearCelular(celJT, 0x365f28, 0.08, 0.162); CEL_J.scale.setScalar(1.2); scene.add(CEL_J);

// =====================================================================================================
// EL LIVING DE MAJO (Q1, set chico aparte en x = 40): pared crema lisa, sofá navy2 con almohadón verde apagado, lámpara
// de pie con pantalla crema, la mochila de gimnasio en el piso, luz de noche crema plana
// =====================================================================================================
const LIV = new THREE.Group(); LIV.position.set(40, 0, 0); scene.add(LIV);
const SOFA = { x: 40, z: -0.5, alto: 0.44 };
{
  const p = mesh(new THREE.PlaneGeometry(8, 6), mat(0x9a8a70, 0.9), 0, 0, 0.5); p.rotation.x = -Math.PI / 2; p.castShadow = false; LIV.add(p);
  LIV.add(mesh(new THREE.BoxGeometry(8, 3.2, 0.2), mat(0xe6e1cf, 0.92), 0, 1.6, -1.25));
  LIV.add(caja(8, 0.1, 0.03, mat(0xd9d2bb, 0.9), 0, 0.05, -1.14, 0.01));
  const so = new THREE.Group(); so.position.set(0, 0, -0.62); LIV.add(so); const ms = mat(0x16243d, 0.85), ms2 = mat(0x1f3254, 0.85);
  so.add(caja(2.0, 0.4, 0.85, ms, 0, 0.2, 0, 0.06)); so.add(caja(2.0, 0.55, 0.22, ms, 0, 0.62, -0.32, 0.08));
  for (const s of [-1, 1]) so.add(caja(0.2, 0.62, 0.85, ms, s * 1.0, 0.31, 0, 0.08));
  for (const s of [-1, 1]) so.add(caja(0.86, 0.13, 0.62, ms2, s * 0.44, 0.44, 0.06, 0.05));
  const al = caja(0.42, 0.38, 0.12, mat(0x365f28, 0.9), -0.62, 0.66, -0.16, 0.06); al.rotation.set(-0.2, 0.25, 0.1); so.add(al);
  // la lámpara de pie (base navy, pantalla crema)
  const la = new THREE.Group(); la.position.set(1.35, 0, -0.85); LIV.add(la);
  la.add(mesh(new THREE.CylinderGeometry(0.16, 0.18, 0.04, 20), M.navy, 0, 0.02, 0)); la.add(mesh(new THREE.CylinderGeometry(0.016, 0.016, 1.45, 8), M.navy, 0, 0.75, 0));
  la.add(mesh(new THREE.CylinderGeometry(0.17, 0.24, 0.3, 24, 1, true), mat(0xf3eedb, 0.9, { side: THREE.DoubleSide, emissive: 0xf3eedb, emissiveIntensity: 0.35 }), 0, 1.55, 0));
  // la mochila de gimnasio en el piso
  const mo = crearMochila(MARCA.navy3, MARCA.g); mo.position.set(-1.25, 0.19, -0.1); mo.rotation.set(0.1, 0.6, 0.05); LIV.add(mo);
  // un cuadro chico en la pared (marco navy, lámina verde y crema)
  LIV.add(caja(0.7, 0.5, 0.03, M.navy, -0.35, 1.75, -1.13, 0.01)); LIV.add(caja(0.6, 0.4, 0.035, mat(0x5ce611, 0.8), -0.35, 1.75, -1.13, 0.01)); LIV.add(caja(0.3, 0.4, 0.04, M.cr, -0.2, 1.75, -1.13, 0.005));
  sombras(LIV);
}
fusionar(LIV);
