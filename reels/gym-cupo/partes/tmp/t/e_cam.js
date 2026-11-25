const _m = new THREE.Vector3();
let planoActual = "P1";
function catmull(CAM, t) {
  let i = 0; while (i + 1 < CAM.length - 1 && CAM[i + 1][0] <= t) i++;
  const a = CAM[i], b = CAM[i + 1] || a;
  const u = sg(t, a[0], b[0]);
  const p1 = a.slice(1, 8), p2 = b.slice(1, 8);
  const p0 = i > 0 ? CAM[i - 1].slice(1, 8) : p1;
  const p3 = i + 2 < CAM.length ? CAM[i + 2].slice(1, 8) : p2;
  const u2 = u * u, u3 = u2 * u;
  return p1.map((_, j) => 0.5 * (2 * p1[j] + (-p0[j] + p2[j]) * u + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * u2 + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * u3));
}
function ponerCam(v, t) {
  const mano = Math.sin(t * 0.9) * 0.003;
  camera.up.set(0, 1, 0);
  camera.position.set(v[0] + mano, v[1] + Math.sin(t * 0.67) * 0.002, v[2]);
  camera.fov = v[6]; camera.updateProjectionMatrix();
  camera.lookAt(_m.set(v[3], v[4], v[5]));
}
function planoEn(t) { let pi = 0; while (pi + 1 < PLANOS.length && PLANOS[pi + 1][1] <= t) pi++; return PLANOS[pi]; }
const aC = (giro = 0, asiente = 0, ladea = 0.03) => ({ cabeza: { giro, asiente, ladea }, ojos: { x: giro * 0.6, y: -asiente * 0.8, abiertos: 0.95 } });
const SEGURO = { ...CARA.neutra, ojos: { abiertos: 0.95, feliz: 0.1 }, cejas: { alto: 0.25, ang: 0.1, asim: 0 }, boca: { sonrisa: 0.25, abierta: 0, ancho: 1.0 } };
const BUENA = { ...CARA.sonrisa, ojos: { abiertos: 1, feliz: 0.35 }, boca: { sonrisa: 0.75, abierta: 0, ancho: 1.1 } };
const FELIZ = { ...CARA.sonrisa, ojos: { abiertos: 1, feliz: 0.45 }, boca: { sonrisa: 0.95, abierta: 0.05, ancho: 1.15 } };
const INCRE = { ...CARA.incredula, ojos: { abiertos: 0.85, tension: 0 }, cejas: { alto: 0.15, ang: 0.1, asim: 0.7 } };
const RESPIRA = { ...CARA.neutra, ojos: { abiertos: 0.04, feliz: 0 }, cejas: { alto: 0.35, ang: 0.35, asim: 0 }, boca: { sonrisa: 0.05, abierta: 0, ancho: 0.85 } };
const bocaVoz = (p, t, t0, env, k = 0.7) => {
  if (t >= t0 && t < t0 + env.length / 30) { const i = Math.floor((t - t0) * 30), f = (t - t0) * 30 - i; const e = lerp(env[i] ?? 0, env[i + 1] ?? 0, f); p.boca.abierta = Math.max(p.boca.abierta, cl(e * 1.1 - 0.05) * k); }
  { const h = sg(t, t0 - 0.12, t0) * (1 - sg(t, t0 + env.length / 30, t0 + env.length / 30 + 0.15)); if (h > 0) p.boca.sonrisa = lerp(p.boca.sonrisa, Math.min(p.boca.sonrisa, 0.08), h); }   // (r2) hablando, el arco de la sonrisa se apaga: no queda una segunda boca
  if (t >= t0 - 0.05 && t < t0 + env.length / 30 + 0.05 && !p.cierraHablando) p.ojos.abiertos = Math.max(p.ojos.abiertos, 0.85);   // hablando, nunca con los ojos cerrados
};
const manoMundo = (per, lado, out = new THREE.Vector3()) => { per.raiz.updateMatrixWorld(true); return per.brazos[lado === "I" ? 0 : 1].mano.getWorldPosition(out); };
// (r3) el centro del puño (la mano cuelga 0,05 a lo largo del antebrazo): ahí va el asa
const punoMundo = (per, lado) => { per.raiz.updateMatrixWorld(true); const m = per.brazos[lado === "I" ? 0 : 1].mano; return m.localToWorld(new THREE.Vector3(0, -0.05, 0.005)); };
function aCuerpo(per, p, w) { per.poner(p); per.raiz.updateMatrixWorld(true); const v = per.cuerpo.worldToLocal(w.clone()); return [v.x, v.y, v.z]; }
const dirGiro = (x0, z0, x1, z1) => Math.atan2(x1 - x0, z1 - z0);
const toW = (per, local) => { per.raiz.updateMatrixWorld(true); return per.cuerpo.localToWorld(V3(...local)); };
function manoA(per, p, lado, w, k, codo = null) { if (k <= 0) return; const m = aCuerpo(per, p, w); const key = lado === "I" ? "manoI" : "manoD"; p[key] = p[key].map((v, i) => lerp(v, m[i], eio(cl(k)))); if (codo) p[lado === "I" ? "codoI" : "codoD"] = codo; }
const cabezaW = (per, local = [0, 0.25, 0]) => { per.raiz.updateMatrixWorld(true); return per.cabeza.localToWorld(V3(...local)); };
