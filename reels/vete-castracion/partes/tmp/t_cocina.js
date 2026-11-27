// ---- LA COCINA DE VERO (x = 0): pared del fondo z = -1,8 navy claro; mesada con azulejo crema; damero; lámpara verde ----
const COC = new THREE.Group(); scene.add(COC);
const KZ = -1.8, KXL = -2.6, KXR = 2.6, KH = 2.7;
const damero = lienzo(512, 512, (x, w, h) => { for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { x.fillStyle = (i + j) % 2 ? "#b9bec4" : "#d9d7c9"; x.fillRect(i * 128, j * 128, 128, 128); } });
damero.wrapS = damero.wrapT = THREE.RepeatWrapping; damero.repeat.set(6, 4.5);
const azuCr = lienzo(512, 256, (x, w, h) => { x.fillStyle = "#efeee5"; x.fillRect(0, 0, w, h); x.fillStyle = "#1f3254"; for (let j = 0; j < 4; j++) { x.fillRect(0, j * 64, w, 4); for (let i = 0; i < 4; i++) x.fillRect(i * 128 + (j % 2 ? 64 : 0), j * 64, 4, 64); } });
azuCr.wrapS = azuCr.wrapT = THREE.RepeatWrapping;
{
  const piso = mesh(new THREE.PlaneGeometry(KXR - KXL, 4.8), new THREE.MeshStandardMaterial({ map: damero, roughness: 0.85 }), 0, 0, KZ + 2.4); piso.rotation.x = -Math.PI / 2; piso.castShadow = false; COC.add(piso);
  COC.add(mesh(new THREE.BoxGeometry(KXR - KXL, KH, 0.2), M.pared2, 0, KH / 2, KZ - 0.1));
  for (const s of [-1, 1]) { const w = mesh(new THREE.BoxGeometry(0.2, KH, 4.8), M.pared2, s * (KXR + 0.1), KH / 2, KZ + 2.4); COC.add(w); }
  const techo = mesh(new THREE.PlaneGeometry(KXR - KXL, 4.8), new THREE.MeshBasicMaterial({ color: 0x0b1220 }), 0, KH, KZ + 2.4); techo.rotation.x = Math.PI / 2; COC.add(techo);
  // la mesada contra el fondo (x de -2,4 a 0,6): frente navy3, tapa crema, azulejo crema arriba hasta 1,55
  const mx0 = -2.4, mx1 = 0.6, mw = mx1 - mx0, mc = (mx0 + mx1) / 2;
  COC.add(caja(mw, 0.86, 0.58, M.navy3, mc, 0.43, KZ + 0.3, 0.012)); COC.add(caja(mw + 0.04, 0.05, 0.62, M.cr, mc, 0.885, KZ + 0.31, 0.012));
  for (let i = 0; i < 5; i++) COC.add(caja(0.03, 0.12, 0.02, M.cr2, mx0 + 0.3 + i * 0.6, 0.7, KZ + 0.6, 0.008));
  const t = azuCr.clone(); t.needsUpdate = true; t.repeat.set(mw / 0.8, 0.62 / 0.4);
  const az1 = mesh(new THREE.PlaneGeometry(mw, 0.62), new THREE.MeshStandardMaterial({ map: t, roughness: 0.85 }), mc, 0.91 + 0.31, KZ + 0.005); az1.castShadow = false; COC.add(az1);
  // la alacena alta (navy3 con tiradores crema) y la heladera crema a la izquierda
  COC.add(caja(1.8, 0.7, 0.35, M.navy3, -1.4, 2.0, KZ + 0.18, 0.015)); for (let i = 0; i < 3; i++) COC.add(caja(0.12, 0.025, 0.02, M.cr, -2.0 + i * 0.6, 1.72, KZ + 0.36, 0.008));
  COC.add(caja(0.7, 1.85, 0.66, M.cr, -2.15 + 0.0, 0.925, KZ + 0.95, 0.04)); COC.add(caja(0.03, 0.4, 0.03, M.navy3, -1.83, 1.2, KZ + 1.3, 0.01));
  // la ventana (x 1,1 a 2,1): marco crema, vidrio (de noche navy oscuro liso; de día crema)
  COC.add(caja(1.1, 1.1, 0.06, M.cr, 1.55, 1.55, KZ + 0.03, 0.01));
  // la silla y la mesita a la derecha (siluetas simples navy3 / crema)
  const me = new THREE.Group(); me.position.set(1.7, 0, -0.6); COC.add(me); me.add(caja(0.8, 0.04, 0.6, M.cr, 0, 0.74, 0, 0.012)); for (const [a, b] of [[-0.35, -0.25], [0.35, -0.25], [-0.35, 0.25], [0.35, 0.25]]) me.add(caja(0.04, 0.72, 0.04, M.navy3, a, 0.36, b, 0.008));
  sombras(COC);
}
fusionar(COC);
const VENTANA = mesh(new THREE.PlaneGeometry(0.98, 0.98), new THREE.MeshBasicMaterial({ color: 0x0b1220 }), 1.55, 1.55, KZ + 0.065); scene.add(VENTANA);
// la lámpara colgante (pantalla verde apagado; la luz crema plana de noche)
const LAMPARA = new THREE.Group(); LAMPARA.position.set(-0.3, KH, -0.4); scene.add(LAMPARA);
{ LAMPARA.add(mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.6, 6), M.navy, 0, -0.3, 0)); const p = mesh(new THREE.CylinderGeometry(0.09, 0.26, 0.22, 28, 1, true), new THREE.MeshStandardMaterial({ color: 0x365f28, roughness: 0.7, side: THREE.DoubleSide }), 0, -0.7, 0); LAMPARA.add(p); LAMPARA.add(mesh(new THREE.SphereGeometry(0.06, 14, 10), new THREE.MeshBasicMaterial({ color: 0xfff6dc }), 0, -0.79, 0)); }
const luzLamp = new THREE.PointLight(0xffe9c2, 0, 6, 1.4); luzLamp.position.set(-0.3, KH - 0.85, -0.4); scene.add(luzLamp);
