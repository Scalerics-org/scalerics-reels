// ================= LOS BEATS (segundos del video final) =================
// Voces (assets/voice, ver partes/voces.md y partes/procesar.sh): v1 Vero "Uy. Se terminó." · v2 "Bueno, Toto. Al súper."
// · i1 Inés "¡Vero! ¿Qué está comiendo Toto?" (se reusa en Q4) · v3 "La que me recomendaste. La compro en el súper." · v4
// "¿Me la anotás? Así no me equivoco." · nar "Una tienda online más tarde." · v5 "¿Cómo sabe?" · b1 Bruno "¡Ración para
// Toto!" · v6 "La que me recomendaste. Me llega sola." · i2 Inés "Comentá RACIÓN y te mando cómo funciona para tu veterinaria."
const VOCES = ["v1", "v2", "i1", "v3", "v4", "v5", "b1", "v6", "i2"];
const LEN = Object.fromEntries([...VOCES, "nar"].map((v) => [v, durWav(`assets/voice/${v === "nar" ? "narrador" : v}.wav`)]));
const T = {};
// ---- parte 1 ----
// P1 · cuadro 0, domingo 21:40, la cocina: Toto ya empuja el plato vacío; Vero da vuelta la bolsa: cae UNA croqueta ·
// "Uy. Se terminó." · inserto del celular "Cerrado" · Toto empuja otra vez · "Bueno, Toto. Al súper."
T.empuja = [0.0, 0.55]; T.v1 = 0.3; T.croqueta = 0.75;
T.cel = r2(T.v1 + LEN.v1 + 0.2); T.celFin = r2(T.cel + 1.05);
T.empuja2 = r2(T.celFin + 0.05); T.v2 = r2(T.celFin + 0.12); T.orejas = r2(T.v2 + LEN.v2 - 0.35);
// P2 · el súper, domingo 22:05: la bolsa verde al carro · NOVIEMBRE, DICIEMBRE, ENERO (un chip grande por mes, la misma
// bolsa al carro, el contador rojo que sube)
T.p2 = r2(T.v2 + LEN.v2 + 0.2); T.agarra = r2(T.p2 + 0.2); T.carro = r2(T.p2 + 0.75);
const MES = 0.7;
T.mes = [0, 1, 2].map((i) => r2(T.carro + 0.55 + i * MES));
T.carroMes = T.mes.map((m) => r2(m + 0.3));
// P3 · febrero en la veterinaria: la torre de bolsas sin vender, Inés con el talonario, Bruno · campanita
T.p3 = r2(T.mes[2] + MES + 0.05); T.campana = r2(T.p3 + 1.05);
// P4 · entran Vero y Toto; Toto tira derecho a la torre y la huele · "¡Vero! ¿Qué está comiendo Toto?"
T.p4 = r2(T.campana + 0.2); T.entra = [T.campana, r2(T.campana + 1.2)]; T.huele = r2(T.entra[1] - 0.1);
T.i1 = r2(T.p4 + 0.55);
// P4b · contraplano: Vero de frente, "La que me recomendaste. La compro en el súper."
T.p4b = r2(T.i1 + LEN.i1 + 0.12); T.v3 = r2(T.p4b + 0.12);
// P4c · la pausa: Inés con la sonrisa quieta; los rótulos del costo (no se recorta: ≥ 1,1 s)
T.p4c = r2(T.v3 + LEN.v3 + 0.08); T.rot = [r2(T.p4c + 0.1), r2(T.p4c + 0.3)];
// P5 · remate del remate: "¿Me la anotás? Así no me equivoco." · Inés escribe en el recetario (inserto) · Toto se echa
T.p5 = r2(T.p4c + 1.25); T.v4 = r2(T.p5 + 0.1);
T.arranca = r2(T.v4 + LEN.v4 + 0.1); T.p5i = r2(T.arranca + 0.25); T.escribe = [r2(T.p5i + 0.15), r2(T.p5i + 1.1)];
T.p5t = r2(T.escribe[1] + 0.15); T.suspiro = r2(T.p5t + 0.25);
const P1 = r2(T.p5t + 1.0);    // termina la parte 1 (arranca el cartel)
const P2 = r2(P1 + Math.max(2.45, LEN.nar + 0.1));
// ---- parte 2 ----
// Q1 · jueves 10:00, la misma cocina de día: el aviso llega solo (inserto del chat) · "¿Cómo sabe?" · la ficha de recompra
// en la tablet de Inés (inserto) · la tienda con el pedido armado: Pagar → Pagado ✓
T.q1 = P2; T.ding = r2(P2 + 0.35); T.q1c = r2(P2 + 0.5);
T.v5 = r2(T.q1c + 1.05); T.q1t = r2(T.v5 + LEN.v5 + 0.15);
T.q1s = r2(T.q1t + 1.75); T.envio = r2(T.q1s + 0.45); T.pagar = r2(T.q1s + 1.0); T.pagado = r2(T.pagar + 0.2);
// Q2 · viernes 18:40: timbre, Vero abre, Bruno con la bolsa TOTO · "¡Ración para Toto!"
T.q2 = r2(T.pagado + 1.0); T.timbre = r2(T.q2 + 0.05); T.abre = r2(T.q2 + 0.3); T.b1 = r2(T.q2 + 0.65); T.apoya = r2(T.b1 + LEN.b1 + 0.25);
// Q3 · domingo 21:40 (el remate de la parte 2, sin voz): Toto va a empujar el plato y está lleno; mira a cámara y come
T.q3 = r2(T.apoya + 0.45); T.empujaQ = r2(T.q3 + 0.35); T.para = r2(T.q3 + 0.8); T.mira = [r2(T.q3 + 1.25), r2(T.q3 + 1.75)]; T.come = r2(T.q3 + 1.95);
// Q4 · febrero: el mismo "¡Vero! ¿Qué está comiendo Toto?" (mismo audio) · "La que me recomendaste. Me llega sola."
T.q4 = r2(T.q3 + 2.85); T.campana2 = r2(T.q4 + 0.0); T.entra2 = [T.q4, r2(T.q4 + 1.0)]; T.i1b = r2(T.q4 + 0.5);
T.q4b = r2(T.i1b + LEN.i1 + 0.12); T.v6 = r2(T.q4b + 0.12);
// Q5 · el panel de recompras (inserto): filas con tilde, 11 → 2, $ 74.100
T.q5 = r2(T.v6 + LEN.v6 + 0.3); T.filas = [0.25, 0.45, 0.65, 0.85].map((d) => r2(T.q5 + d)); T.gira = r2(T.q5 + 1.15); T.plata = r2(T.q5 + 1.75);
// C · Inés a cámara: "Comentá RACIÓN…"
T.c = r2(T.q5 + 2.75); T.i2 = r2(T.c + 0.15); T.palabra = r2(T.i2);
const DUR = Math.ceil((Math.ceil((T.i2 + LEN.i2 + 0.3) * 30) / 30) * 1e4) / 1e4;
T.cierre = r2(DUR - 1.0);

