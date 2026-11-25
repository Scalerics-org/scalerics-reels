function crearFondoInserto(g, cocina = false) {
  const bg = new THREE.Mesh(new THREE.PlaneGeometry(1400 / PXK, 2400 / PXK), new THREE.MeshBasicMaterial({ color: cocina ? 0xe6e1cf : 0x1f3254 })); bg.position.z = -0.06; g.add(bg);
  const pc = new THREE.Mesh(new THREE.PlaneGeometry(1400 / PXK, 1100 / PXK), new THREE.MeshBasicMaterial({ color: cocina ? 0x1f3254 : 0xd8c3a0 })); pc.position.set(0, -700 / PXK, -0.058); g.add(pc);
  if (!cocina) for (let i = 0; i < 7; i++) { const l = new THREE.Mesh(new THREE.PlaneGeometry(36 / PXK, 900 / PXK), new THREE.MeshBasicMaterial({ color: 0xefeee5 })); l.position.set((-600 + i * 200) / PXK, 750 / PXK, -0.059); g.add(l); }
  else { const m = new THREE.Mesh(new THREE.PlaneGeometry(1400 / PXK, 60 / PXK), new THREE.MeshBasicMaterial({ color: 0xefeee5 })); m.position.set(0, -150 / PXK, -0.057); g.add(m); }
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
