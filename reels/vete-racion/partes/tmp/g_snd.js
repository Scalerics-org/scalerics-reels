// ================= SONIDO: una pista premezclada =================
// [archivo, inicio en el reel, ganancia dB, opciones: { desde, dur, fin (fundido de salida s), fi (fundido de entrada),
//  voz: true (sin techo), loop: true, lp (pasabajos), hp (pasaaltos), vel (cambio de velocidad/tono, asetrate),
//  duck: [[a, b, k]] (baja la cama k en fundidos de 0,4 s), techo, pico }]
// Techo por efecto: cada SFX (y la música y el ambiente) queda como mucho en TECHO LUFS (sonoridad momentánea máxima del
// tramo que suena); las voces van sin techo y se miden después por tramos (voz ≥ 6 LU sobre el resto).
const TECHO = -31;
const S = [];
const s = (f, t, db, o = {}) => S.push([f, r2(Math.max(0, t)), db, o]);
const pop = (t, techo = -40) => s("sfx/pop.mp3", t, 0, { desde: 0.11, techo });
const VOZ = [];
const voz = (f, t, db = -1) => { s(`voice/${f}.wav`, t, db, { voz: true, fin: 0.04 }); VOZ.push([r2(t - 0.75), r2(t + LEN[f] + 0.95)]); };
const pasos = (a, b, n, techo = -46) => { for (let i = 0; i < n; i++) s(`sfx/paso-${i % 5}.wav`, a + ((b - a) * i) / n, 0, { techo, lp: 2500 }); };
const noti = (t, techo = -38) => { s("sfx/vibra.wav", t - 0.2, 0, { techo: techo - 2, dur: 0.4, fin: 0.1 }); s("sfx/notification.mp3", t - 0.05, 0, { techo, dur: 0.35, fin: 0.12 }); };
const tic = (t, techo = -42, k = 0) => s(["sfx/k-tick-1.wav", "sfx/k-tick-2.wav", "sfx/k-tick-4.wav"][k % 3], t, 0, { techo, hp: 900 });
const ding = (t, techo = -38) => s("sfx/cero.mp3", t, 0, { techo });
const toque = (t, techo = -36) => s("sfx/click-soft.mp3", t, 0, { techo });
const whoosh = (t, techo = -44) => s("sfx/whoosh-short.mp3", t - 0.06, 0, { techo });
const unas = (a, b, n, techo = -44) => { for (let i = 0; i < n; i++) s(["sfx/k-tick-1.wav", "sfx/k-tick-2.wav", "sfx/k-tick-4.wav"][i % 3], a + ((b - a) * i) / n, 0, { techo, hp: 2500, vel: 1.35 }); };
const lad = (f, t, techo = -36, o = {}) => s(`sfx/ladrido-${f}.wav`, t, 0, { techo, pico: -10, ...o });
const platoAcero = (t, techo = -36) => s("sfx/k-plato-000.wav", t, 0, { techo, pico: -12, hp: 400 });
const bolsaPapel = (t, d = 0.5, techo = -38) => s("sfx/bsb-papel.wav", t, 0, { techo, dur: d, fin: 0.12 });
const bolsaCae = (t, techo = -34) => s("sfx/bsb-bolsa-piso.wav", t, 0, { techo, dur: 0.6, fin: 0.15 });
const chip = (t) => { tic(t, -40, 0); whoosh(t, -46); };
// ---- parte 1 ----
// la cocina de noche: la heladera muy baja; la música (pizzicato) arranca con el plato
s("sfx/zumbido-largo.wav", 0, 0, { loop: true, dur: r2(T.p2 + 0.05), fi: 0.05, fin: 0.2, techo: -52, lp: 500 });
s("bgm/pizzicato.wav", 0, 0, { loop: true, dur: r2(P1 + 0.05), fin: 0.3, techo: -36, duck: [[T.p4c - 0.1, T.p5 + 0.1, 0.8], [T.p5t - 0.1, P1, 0.6]] });
// P1 · el plato contra la pantufla, la bolsa vacía, la croqueta, el celular, el plato otra vez, "Al súper." y el ladridito
platoAcero(0.05, -36); platoAcero(T.empuja[1] - 0.05, -38);
bolsaPapel(0.2, 0.55, -40);
s("sfx/k-tick-2.wav", T.croqueta + 0.33, 0, { techo: -40, hp: 1500, vel: 1.4 }); s("sfx/k-tick-4.wav", T.croqueta + 0.48, 0, { techo: -46, hp: 1500, vel: 1.5 });
voz("v1", T.v1, -1);
s("sfx/vibra.wav", T.cel - 0.05, 0, { techo: -42, dur: 0.3, fin: 0.1 }); whoosh(T.cel, -46);
platoAcero(T.empuja2 + 0.25, -37);
voz("v2", T.v2, -1);
lad("corgi_fs630648", T.orejas + 0.25, -37);
// P2 · el súper: el tubo, la bolsa al carro (golpe sordo + alambre) y un golpe por mes; chip con tic y whoosh
s("sfx/zumbido.wav", T.p2, 0, { dur: r2(T.p3 - T.p2), fi: 0.1, fin: 0.15, techo: -48, lp: 1200 });
whoosh(T.p2, -42);
bolsaPapel(T.agarra, 0.35, -40);
bolsaCae(T.carro, -33); s("sfx/k-metal-liviano-2.wav", T.carro + 0.02, 0, { techo: -42 });
T.mes.forEach((m, i) => { chip(m); bolsaCae(T.carroMes[i], -34 + i); s("sfx/k-metal-liviano-2.wav", T.carroMes[i] + 0.02, 0, { techo: -43 }); pop(m + 0.15, -40); });
// P3 · la veterinaria: ladrido lejano en la sala, la campanita
whoosh(T.p3, -44); tic(T.p3, -42);
lad("spaniel_fs502655", T.p3 + 0.35, -46, { lp: 2000 });
s("sfx/campanita.wav", T.campana, 0, { techo: -34 });
// P4 · pasos de Vero, uñas de Toto, el olfateo
pasos(T.entra[0] + 0.1, T.entra[1], 4, -44);
unas(T.entra[0] + 0.1, T.entra[1], 8, -44);
s("sfx/bsb-olfateo.wav", T.huele, 0, { techo: -38, dur: 1.0, fin: 0.2, hp: 300 });
voz("i1", T.i1, -1);
voz("v3", T.v3, -1);
// P4c · la pausa: nada encima (la música baja); pop chico por rótulo
T.rot.forEach((t) => pop(t, -44));
// P5 · "¿Me la anotás?", la hoja que se arranca, la lapicera, el suspiro de Toto y el stinger
voz("v4", T.v4, -1);
s("sfx/bsb-rasga.wav", T.arranca, 0, { techo: -38, dur: 0.5, fin: 0.1 });
whoosh(T.p5i, -46);
s("sfx/birome.wav", T.escribe[0], 0, { techo: -38, dur: r2(T.escribe[1] - T.escribe[0]), fin: 0.1 });
s("sfx/bsb-suspiro.wav", T.suspiro, 0, { techo: -36, dur: 1.1, fin: 0.25, lp: 3000 });
// ---- cartel ----
s("sfx/whoosh.mp3", P1 - 0.04, 0, { techo: -39 });
s("sfx/stinger.wav", P1 + 0.03, 0, { techo: -31, dur: 0.6, fin: 0.25 });
s("voice/narrador.wav", P1 + 0.05, -1, { voz: true, fin: 0.04 }); VOZ.push([r2(P1 - 0.3), r2(P1 + 0.05 + LEN.nar + 0.45)]);
s("bgm/pizzicato.wav", P1, 0, { desde: 4.0, dur: r2(P2 - P1), fi: 0.15, fin: 0.3, techo: -40, sinDuck: true });
for (const d of [0.12, 0.4, 0.75, 1.0]) pop(P1 + d + 0.02, -44);
s("sfx/whoosh.mp3", P2 - 0.2, 0, { techo: -42 });
// ---- parte 2 ----
s("bgm/pizzicato.wav", P2, 0, { loop: true, desde: 1.0, dur: r2(DUR - P2), fi: 0.9, fin: 0.8, techo: -36, duck: [[T.q3, T.q4 - 0.1, 0.45]] });
// Q1 · el aviso: notificación; "¿Cómo sabe?"; la ficha; la tienda: envío, Pagar, Pagado ✓
noti(T.ding, -36); whoosh(T.q1c, -46);
voz("v5", T.v5, -1);
whoosh(T.q1t, -44); ding(T.q1t + 0.7, -40);
whoosh(T.q1s, -44); toque(T.envio, -38); toque(T.pagar, -36); ding(T.pagado, -34);
// Q2 · el timbre, la puerta, "¡Ración para Toto!", el ladrido contento, la bolsa en el piso
s("sfx/bsb-timbre.wav", T.timbre, 0, { techo: -34, dur: 1.2, fin: 0.3 });
s("sfx/puerta-abre.wav", T.abre, 0, { techo: -40 });
voz("b1", T.b1, -1);
lad("golden_fs146343_1", T.b1 + LEN.b1 + 0.0, -35);
bolsaCae(T.apoya, -34);
// Q3 · domingo 21:40: el plato lleno (no suena el acero: las croquetas), Toto mira, come
s("sfx/zumbido-largo.wav", T.q3, 0, { loop: true, dur: r2(T.q4 - T.q3), fi: 0.1, fin: 0.2, techo: -52, lp: 500 });
s("sfx/bsb-cereal.wav", T.empujaQ, 0, { techo: -38, dur: 0.7, fin: 0.2 });
s("sfx/bsb-masticar.wav", T.come, 0, { techo: -36, dur: r2(T.q4 - T.come), fin: 0.2 });
// Q4 · campanita, pasos y uñas, el mismo "¡Vero!…", "Me llega sola."
s("sfx/campanita.wav", T.campana2, 0, { techo: -36 });
pasos(T.entra2[0] + 0.1, T.entra2[1], 3, -46); unas(T.entra2[0] + 0.1, T.entra2[1], 6, -46);
voz("i1", T.i1b, -1);
voz("v6", T.v6, -1);
// Q5 · el panel: tic por fila, el 11 que gira, la plata
whoosh(T.q5, -44);
T.filas.forEach((t, k) => tic(t, -40, k));
s("sfx/whoosh-short.mp3", T.gira - 0.05, 0, { techo: -44, vel: 1.4 }); ding(T.gira + 0.25, -36);
ding(T.plata, -36);
// C · Inés a cámara: pop en RACIÓN, la línea chica
whoosh(T.c, -46);
voz("i2", T.i2, -1);
pop(T.palabra + 0.02, -38); pop(T.palabraR, -40);
pop(T.cierre + 0.05, -44);
// la cama +4 dB y, en los tramos sin voz (el montaje de meses, el panel, el plato lleno), los SFX +6 dB (nunca por encima
// del techo)
for (const x of S) { const [f, t0, , o] = x; if (o.voz) continue; if (f.startsWith("bgm/")) { o.techo = Math.min(TECHO, (o.techo ?? TECHO) + 4); continue; }
  if (en(t0, T.carro - 0.1, T.p3) || en(t0, T.q3, T.q4 - 0.2) || en(t0, T.q5, T.c - 0.3)) o.techo = Math.min(-31, (o.techo ?? TECHO) + 6); }
// la música: duck debajo de cada voz (-6 dB) para que la voz quede ≥ 6 LU arriba
for (const x of S) if (x[0] === "bgm/pizzicato.wav" && !x[3].sinDuck) { x[3].duck = [...(x[3].duck || []), ...VOZ.filter(([a, b]) => a >= x[1] - 0.5 && b <= x[1] + x[3].dur + 0.5).map(([a, b]) => [a, b, 0.5])]; }
function en(t, a, b) { return t >= a && t < b; }

