
// ===== 30-personajes.js: Tano, Facu, Lucía, Sabri, Martín y lo que llevan encima =====
const tano = crearPersonaje({ ...ELENCO.tano, dedos: true, parpadeoCada: 999, parpadeosExtra: [r2(T.p3c + 0.55)] });
const facu = crearPersonaje({ ...ELENCO.facu, dedos: true, parpadeoCada: 999, parpadeosExtra: [] });
const lucia = crearPersonaje({ ...ELENCO.lucia, dedos: true, parpadeoCada: 999, parpadeosExtra: [r2(T.q1 + 1.2), r2(T.q3b + 0.6)] });
const sabri = crearPersonaje({ ...ELENCO.sabri, dedos: true, parpadeoCada: 999, parpadeosExtra: [] });
const martin = crearPersonaje({ ...ELENCO.martin, dedos: true, parpadeoCada: 999, parpadeosExtra: [r2(T.q2 + 0.3)] });
const TODOS = [tano, facu, lucia, sabri, martin];
// (r3) el bolsillo navy del delantal de Tano parecía un celular: fuera
for (const m of tano.cuerpo.children) if (m.isMesh && Math.abs(m.position.y - 0.1) < 1e-4 && m.position.z > 0.15 && m.material.color.getHex() === new THREE.Color(MARCA.navy3).getHex()) { m.visible = false; m.userData.bolsillo = true; }
for (const p of TODOS) { scene.add(p.raiz); p.raiz.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } }); }
// Tano: la harina en el delantal (manchas crema planas) y el repasador verde apagado al hombro derecho
{
  const hm = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1, transparent: true, opacity: 0.85, depthWrite: false });
  for (const [x, y, s] of [[0.06, 0.12, 0.05], [-0.08, 0.2, 0.035], [0.02, 0.3, 0.03], [-0.03, 0.05, 0.04], [0.1, 0.24, 0.025]]) { const m = mesh(new THREE.CircleGeometry(s, 14), hm, x, y, 0.262); m.scale.y = 0.7; m.castShadow = false; tano.cuerpo.add(m); }
  const rep = caja(0.12, 0.012, 0.3, M.gaz, -0.2, 0.47, 0.0, 0.004); rep.rotation.z = 0.5; tano.cuerpo.add(rep);
  const rep2 = caja(0.11, 0.2, 0.012, M.gaz, -0.235, 0.37, 0.14, 0.004); rep2.rotation.z = 0.18; tano.cuerpo.add(rep2);
}
// Lucía: el pañuelo verde de marca que envuelve el rodete y la harina en los antebrazos (puntitos claros)
{
  const pm = mat(MARCA.g, 0.6);
  // (r2) el casquete del rodete bajaba hasta las cejas: se reemplaza por uno con la línea del pelo alta y raya al costado
  for (const o of lucia.cabeza.children) if (o.isMesh && o.geometry.type === "SphereGeometry" && Math.abs((o.geometry.parameters.thetaLength ?? 0) - PI * 0.45) < 0.01) { o.geometry = new THREE.SphereGeometry(1, 32, 16, 0, PI * 2, 0, PI * 0.36); o.rotation.x = -0.32; }
  const moño = mesh(new THREE.TorusGeometry(0.075, 0.026, 8, 20), pm, 0, 0.276 + 0.24, -0.2); moño.rotation.x = 1.0; lucia.cabeza.add(moño);   // el elástico verde en la base del rodete
}
// Martín: la capucha del buzo (un rollo en la nuca)
{ const ca = mesh(new THREE.TorusGeometry(0.15, 0.05, 8, 20), mat(0x2c4f20, 0.9), 0, 0.52, -0.1); ca.rotation.x = PI / 2 - 0.5; ca.scale.set(1.1, 1, 0.7); martin.cuerpo.add(ca); }
// los cascos (Facu navy3, Sabri verde apagado) y las mochilas térmicas
const CASCO_F = crearCasco(MARCA.navy3), CASCO_S = crearCasco(0x365f28); CASCO_F.visible = false;
scene.add(CASCO_F, CASCO_S);
const MOCH_F = crearMochila(MARCA.navy3, MARCA.cr), MOCH_S = crearMochila(MARCA.navy2, MARCA.cr);
facu.cuerpo.add(MOCH_F); MOCH_F.position.set(0, 0.26, -0.33); MOCH_F.scale.setScalar(0.95);
sabri.cuerpo.add(MOCH_S); MOCH_S.position.set(0, 0.26, -0.33); MOCH_S.scale.setScalar(0.9);
// el casco en la cabeza (calza: el centro del casco en el centro del cráneo) o en la mano
const CR_HEAD = V3(0, 0.276 + 0.03, -0.01);
function cascoEnCabeza(c, per) { if (c.parent !== per.cabeza) { per.cabeza.add(c); } c.position.copy(CR_HEAD); c.rotation.set(0, 0, 0); c.scale.setScalar(1); }
function cascoEnMano(c, per, lado = "I") { if (c.parent !== scene) scene.add(c); const m = manoMundo(per, lado, _a); c.position.copy(m).add(V3(0, -0.2, 0.02)); per.cuerpo.getWorldQuaternion(_q); c.quaternion.copy(_q); c.rotateX(0.4); c.scale.setScalar(0.92); }
// los celulares: el del hombro de Tano (canto navy3), el del mostrador (funda verde apagado), el de Martín y el de Sabri
const pantTano = lienzo(400, 820, () => {}), pantMart = lienzo(400, 820, () => {}), pantSab = lienzo(400, 820, () => {});
const celHombro = crearCelular(lienzo(80, 160, (x, w, h) => { x.fillStyle = "#16243d"; x.fillRect(0, 0, w, h); x.fillStyle = "#efeee5"; x.beginPath(); x.arc(w / 2, 46, 20, 0, 7); x.fill(); x.fillStyle = "#c7655b"; x.beginPath(); x.arc(w / 2, 128, 16, 0, 7); x.fill(); x.fillStyle = "#5ce611"; x.fillRect(14, 80, w - 28, 8); }), 0x8f969f, 0.078, 0.16); scene.add(celHombro);
const celMostr = crearCelular(pantTano, 0x365f28, 0.08, 0.162); scene.add(celMostr);
const celMart = crearCelular(pantMart, MARCA.navy, 0.08, 0.162); scene.add(celMart);
const celSab = crearCelular(pantSab, MARCA.navy2, 0.08, 0.162); celSab.scale.setScalar(1.35); scene.add(celSab);
// la tablet de Lucía en el atril (tablero de pedidos / panel)
const pantTab = lienzo(1000, 760, () => {});
const tabletL = crearTablet(pantTab, 0.34, 0.25, 0.35); scene.add(tabletL);
// la impresora, el riel, el talonario, la birome, el gancho, la masa, el disco de Lucía
const IMP = crearImpresora(); scene.add(IMP);
const RIEL = crearRiel(5); scene.add(RIEL);
const TALON = crearTalonario(); scene.add(TALON);
const BIROME = crearBirome(); BIROME.scale.setScalar(1.5); scene.add(BIROME);
const GANCHO = crearGancho(); scene.add(GANCHO);
const MASA = crearMasa(); scene.add(MASA);
const DISCO = crearDisco(); scene.add(DISCO);
const SERV = new THREE.Group(); { SERV.add(caja(0.12, 0.1, 0.06, M.acero, 0, 0.05, 0, 0.01)); for (let i = 0; i < 4; i++) SERV.add(mesh(new THREE.BoxGeometry(0.1, 0.08, 0.004), M.cr, 0, 0.075, -0.015 + i * 0.01)); scene.add(sombras(SERV)); }
// las cajas que viajan: la de Don Tano que vuelve (P3, P4), la de Lucía con el ticket #47 (Q3, Q4); y su pizza
const CAJA_T = crearCaja("DON TANO|PIZZAS"); scene.add(CAJA_T);
const CAJA_L = crearCaja("LUCÍA|PIZZAS"); scene.add(CAJA_L);
{ const tk = plano(0.09, 0.15, ticketT, 0, 0, 0); tk.rotation.x = -PI / 2; tk.position.set(0.12, 0.009, 0.1); CAJA_L.userData.bis.children[0].add(tk); }
const PIZZA_T = crearMuzza(true); CAJA_T.add(PIZZA_T); PIZZA_T.position.y = 0.006;
const PIZZA_L = crearMuzza(true); CAJA_L.add(PIZZA_L); PIZZA_L.position.y = 0.006;
const VAPOR_T = crearVapor(9); CAJA_T.add(VAPOR_T); VAPOR_T.position.set(0.02, 0.04, 0.02); VAPOR_T.scale.setScalar(0.7);
const VAPOR_L = crearVapor(9); CAJA_L.add(VAPOR_L); VAPOR_L.position.set(0.02, 0.04, 0.02); VAPOR_L.scale.setScalar(0.7);
// las porciones en la mano (Facu, Tano, Martín) y los hilos de queso
const POR_F = crearPorcionMano(), POR_T = crearPorcionMano(), POR_M = crearPorcionMano(); POR_M.scale.setScalar(1.25);   // (r3) la de Martín se lee en la mordida
scene.add(POR_F, POR_T, POR_M);
const HILO_F = crearHilo(), HILO_M2 = crearHilo(); scene.add(HILO_F, HILO_M2);
// las motos: la de Facu (navy3, en la vereda de Don Tano) y la de Sabri (verde apagado, en la vereda de Lucía)
const MOTO_F = crearMoto(MARCA.navy3, MARCA.cr); MOTO_F.position.set(1.0, 0.14, 1.55); MOTO_F.rotation.y = PI / 2 + 0.15; scene.add(MOTO_F);
const MOTO_S = crearMoto(0x365f28, MARCA.navy2); scene.add(MOTO_S);
