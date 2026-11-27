// =====================================================================================================
// LOS PERSONAJES, TOTO Y COCO
// =====================================================================================================
const bruno = crearPersonaje({ ...ELENCO.bruno, dedos: true, parpadeoCada: 999, parpadeosExtra: [r2(T.p2a + 0.5), r2(T.q2 + 0.3), r2(T.q4 + 0.4)] });
// Vero de calle (campera navy2: la vereda y la recepción) y Vero de entrecasa (la cocina, Q3)
const vero = crearPersonaje({ ...ELENCO.vero, dedos: true, parpadeoCada: 999, parpadeosExtra: [r2(T.v12 + 1.1)] });
if (vero.campera) vero.campera.traverse((o) => { if (o.isMesh && o.geometry.type === "TorusGeometry") o.visible = false; });
const veroC = crearPersonaje({ ...ELENCO.vero, nombre: "Vero", campera: null, pantalon: MARCA.navy2, zapatos: MARCA.cr, pantuflas: { color: MARCA.cr, borde: MARCA.navy3, suela: MARCA.navy }, dedos: true, parpadeoCada: 999 });
// Inés de consultorio (ambo verde oscuro, sin gorro: el cierre) e Inés de cirugía (gorro, barbijo bajado al cuello, guantes)
const ines = crearPersonaje({ ...ELENCO.ines, dedos: true, parpadeoCada: 999, parpadeosExtra: [r2(T.c + 2.4)] });
const inesQ = crearPersonaje({ ...ELENCO.ines, nombre: "Inés", peinado: "corto", dedos: true, parpadeoCada: 999, parpadeosExtra: [r2(T.p3 + 0.6), r2(T.p4 + 0.15)] });
// la señora de Luna (sin voz)
const senora = crearPersonaje({ ...DEFECTO, nombre: "Señora", piel: PIEL.clara, pelo: PELO.canoso, peinado: "corto", cejasColor: 0xb9b6b0, camisa: MARCA.navy3, mangas: "largas", cuello: MARCA.cr, cuelloBotones: false, pantalon: 0x3a3f4a, nariz: 0.055, alto: 0.95, parpadeoCada: 999 });
const TODOS = [bruno, vero, veroC, ines, inesQ, senora];
for (const p of TODOS) { scene.add(p.raiz); p.raiz.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } }); }
// el estetoscopio navy de Inés (las dos)
for (const per of [ines, inesQ]) {
  const pts = [V3(-0.05, 0.31, 0.19), V3(-0.1, 0.44, 0.14), V3(-0.1, 0.53, 0.0), V3(0, 0.55, -0.1), V3(0.1, 0.53, 0.0), V3(0.1, 0.44, 0.14), V3(0.07, 0.36, 0.19)];
  if (per === ines) { per.cuerpo.add(mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 40, 0.011, 8), M.navy)); const c = mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.016, 20), M.metal, -0.05, 0.3, 0.2); c.rotation.x = Math.PI / 2 - 0.25; per.cuerpo.add(c); }
}
// Inés de cirugía: el gorro (casquete de tela verde apagado con el pliegue de la vincha, tapa todo el pelo), el barbijo
// bajado al cuello (tela celeste muy pálida con las tiras) y los guantes de látex crema
const GORRO = new THREE.Group();
{
  const R = 0.3, CC = R * 0.92;
  GORRO.position.set(0, CC + 0.012, -0.02); GORRO.rotation.x = -0.12; inesQ.cabeza.add(GORRO);
  const cas = mesh(new THREE.SphereGeometry(1, 36, 18, 0, Math.PI * 2, 0, Math.PI * 0.5), M.gorro, 0, 0, 0, R * 1.09, R * 1.12, R * 1.1); GORRO.add(cas);
  const vin = mesh(new THREE.TorusGeometry(1, 0.06, 10, 40), mat(0x2f5523, 0.9), 0, 0.0, 0, R * 1.09, R * 1.1, R * 1.0); vin.rotation.x = Math.PI / 2; vin.scale.set(R * 1.1, R * 1.11, R * 0.9); GORRO.add(vin);
  for (const s of [-1, 1]) { const pl = mesh(new THREE.SphereGeometry(1, 12, 8), mat(0x2f5523, 0.9), s * 0.11, R * 0.96, -0.02, 0.06, 0.02, 0.15); pl.rotation.z = s * 0.35; GORRO.add(pl); }   // los pliegues de arriba
  // el moño de atrás
  for (const s of [-1, 1]) { const m = mesh(new THREE.SphereGeometry(1, 10, 8), mat(0x2f5523, 0.9), s * 0.04, 0.02, -R * 1.08, 0.035, 0.022, 0.012); m.rotation.z = s * 0.5; GORRO.add(m); }
}
const BARBIJO = new THREE.Group();
{
  BARBIJO.position.set(0, 0.665 + 0.06, 0.012); inesQ.cuerpo.add(BARBIJO);
  const geo = new THREE.CylinderGeometry(0.105, 0.1, 0.095, 24, 1, true, -1.25, 2.5); const b = mesh(geo, new THREE.MeshStandardMaterial({ color: 0xdde8ea, roughness: 0.9, side: THREE.DoubleSide })); BARBIJO.add(b);
  for (let i = 0; i < 3; i++) BARBIJO.add(mesh(new THREE.CylinderGeometry(0.1065, 0.1015, 0.006, 24, 1, true, -1.2, 2.4), new THREE.MeshStandardMaterial({ color: 0xbfcfd3, roughness: 0.9, side: THREE.DoubleSide }), 0, -0.03 + i * 0.028, 0));
  for (const s of [-1, 1]) { const t = mesh(new THREE.TorusGeometry(0.1, 0.005, 6, 24, 1.6), mat(0xdde8ea, 0.9), 0, 0.0, 0); t.rotation.set(Math.PI / 2, 0, s > 0 ? 0.4 : Math.PI - 0.4 - 1.6 + 1.6); BARBIJO.add(t); }
}
const GUANTES = [];
function ponerGuante(per, lado, on) { const b = per.brazos[lado === "I" ? 0 : 1]; b.mano.traverse((o) => { if (o.isMesh) { if (!o.userData.piel) o.userData.piel = o.material; o.material = on ? M.latex : o.userData.piel; } }); }
ponerGuante(inesQ, "I", true); ponerGuante(inesQ, "D", true);
// el guante que se saca (Q4): un bollito crema en la mano
const GUANTE_SUELTO = new THREE.Group(); { const g = mesh(new THREE.SphereGeometry(0.05, 12, 10), M.latex, 0, -0.04, 0.02); g.scale.set(0.8, 1.3, 0.6); GUANTE_SUELTO.add(g); for (let i = 0; i < 3; i++) { const d = mesh(new THREE.CylinderGeometry(0.012, 0.01, 0.07, 8), M.latex, -0.02 + i * 0.02, -0.12, 0.02); d.rotation.z = (i - 1) * 0.2; GUANTE_SUELTO.add(d); } scene.add(sombras(GUANTE_SUELTO)); }

const toto = crearPerro({ ...PERROS.toto, escala: 0.9 }); scene.add(toto.raiz);
const coco = crearPerro({ ...PERROS.coco }); scene.add(coco.raiz);
for (const d of [toto, coco]) d.raiz.traverse((o) => { if (o.isMesh) o.receiveShadow = false; });
// el collar isabelino va pegado a la cabeza de cada uno: el aro chico detrás de las orejas, abierto hacia el hocico
const ISA_POS = [0, -0.035, -0.17];
for (const [d, I] of [[toto, ISA[0]], [coco, ISA[1]]]) { I.position.set(...ISA_POS); d.cabeza.add(I); }
// el hocico de cada perro (para el ronquido: se infla apenas)
const hocico = (d) => d.cabeza.children[0].children[3];
// la correa de Toto (verde oscuro)
const CORREA = [0, 1].map(() => { const m = mesh(new THREE.CylinderGeometry(1, 1, 1, 8).translate(0, 0.5, 0), mat(0x2f6b1f, 0.6)); m.castShadow = false; scene.add(m); return m; });
function ponerCorrea(a, b, on, caida = 0.25) {
  for (const m of CORREA) m.visible = on; if (!on) return;
  const mid = a.clone().lerp(b, 0.5); mid.y -= Math.min(caida, a.distanceTo(b) * 0.2);
  entre(CORREA[0], a, mid, 0.009); entre(CORREA[1], mid, b, 0.009);
}
// el celular de Vero (la vereda: en la oreja; Q1 en la mano; Q3 en la cocina)
const pantCel = lienzo(400, 820, () => {});
const celuV = crearCelular(pantCel, C.navy2, 0.08, 0.162); celuV.scale.setScalar(1.25); scene.add(celuV);

// ---- FOTOS para los avisos: cuadros renderizados del mismo 3D (Toto en el mostrador; Toto dormido con el collar) ----
function fotoRT(W, H, armar, camPos, mira, fondo, fov = 30) {
  const rt = new THREE.WebGLRenderTarget(W, H); rt.texture.colorSpace = THREE.SRGBColorSpace;
  const esc = new THREE.Scene(); esc.background = new THREE.Color(fondo);
  esc.add(new THREE.HemisphereLight(0xffffff, 0x8a8a80, 2.0)); const dl = new THREE.DirectionalLight(0xffffff, 1.7); dl.position.set(1, 3, 3); esc.add(dl);
  esc.environment = scene.environment;
  const cam = new THREE.PerspectiveCamera(fov, W / H, 0.05, 20); cam.position.set(...camPos); cam.lookAt(...mira);
  const deshacer = armar(esc);
  renderer.setRenderTarget(rt); renderer.render(esc, cam); renderer.setRenderTarget(null);
  const px = new Uint8Array(W * H * 4); renderer.readRenderTargetPixels(rt, 0, 0, W, H, px);
  const cv = document.createElement("canvas"); cv.width = W; cv.height = H; const x = cv.getContext("2d");
  const id = x.createImageData(W, H);
  for (let y = 0; y < H; y++) id.data.set(px.subarray((H - 1 - y) * W * 4, (H - y) * W * 4), y * W * 4);
  x.putImageData(id, 0, 0);
  deshacer(); rt.dispose();
  return cv;
}
// mover un objeto a la escena de la foto y devolverlo después
const prestar = (esc, o, pos, rotY = 0) => { const padre = o.parent, p0 = o.position.clone(), r0 = o.rotation.clone(), v0 = o.visible; esc.add(o); o.position.copy(pos); o.rotation.set(0, rotY, 0); o.visible = true; o.updateMatrixWorld(true); return () => { o.position.copy(p0); o.rotation.copy(r0); o.visible = v0; if (padre) padre.add(o); }; };
const FOTO = {};
{
  // 1) Toto sentado en el mostrador de la recepción (la tapa crema y el frente navy), con la correa
  FOTO.ingreso = fotoRT(640, 480, (esc) => {
    ISA[0].visible = false; toto.poner({ sentado: 1, orejas: 0.85, cola: 0.4, cejas: 0.4, jadeo: 0.6, cabeza: { giro: 0.15, asiente: -0.05, ladea: 0.12 }, t: 0.4 });
    const tapa = mesh(rbox(1.6, 0.05, 0.6, 0.012), M.cr, 0, -0.03, 0); esc.add(tapa); const fr = mesh(rbox(1.6, 0.6, 0.55, 0.012), M.navy3, 0, -0.35, 0); esc.add(fr);
    const pz = mesh(new THREE.PlaneGeometry(3, 2), M.gaz, 0, 0.6, -0.6); esc.add(pz);
    const d = prestar(esc, toto.raiz, V3(0, 0, 0), 0.25); return () => { d(); esc.remove(tapa, fr, pz); };
  }, [0.25, 0.62, 1.55], [0, 0.42, 0], 0x365f28, 34);
  // 2) Toto dormido con el collar sobre la manta (el cuadro del video "Despertando" y de "En cirugía")
  FOTO.dormido = fotoRT(640, 480, (esc) => {
    ISA[0].visible = true; toto.poner({ echado: 1, orejas: 0.15, cola: 0.0, colaAlta: 0.3, cejas: 0, ojos: { abiertos: 0.45 }, cabeza: { giro: 0.35, asiente: 0.15, ladea: 0.25 }, t: 0.4 });
    const manta = mesh(rbox(1.6, 0.05, 1.0, 0.02), M.cr, 0, -0.025, 0); esc.add(manta); const pl = mesh(rbox(1.6, 0.03, 0.14, 0.012), M.verde, 0, 0.01, -0.45); esc.add(pl);
    const d = prestar(esc, toto.raiz, V3(0, 0, 0), 0.9); return () => { d(); esc.remove(manta, pl); };
  }, [0.55, 0.85, 1.35], [0.1, 0.22, 0], 0x16243d, 36);
  ISA[0].visible = true;
}
// el avatar redondo de cada paciente (para el panel): la cabeza del perro / la gata
const AVATAR = {};
{
  const cabeza = (d, fondo, conIsa = false) => fotoRT(256, 256, (esc) => { ISA[d === toto ? 0 : 1].visible = conIsa; d.poner({ sentado: 1, orejas: 0.85, cola: 0, t: 0.3 }); const dz = prestar(esc, d.raiz, V3(0, 0, 0)); return dz; }, [0.08, 0.95 * d.cfg.escala + 0.02, 1.1 * d.cfg.escala], [0, 0.9 * d.cfg.escala, 0], fondo, 30);
  AVATAR.toto = cabeza(toto, 0xcfeebc); AVATAR.coco = cabeza(coco, 0xd9d7c9);
  for (const I of ISA) I.visible = true;
}
