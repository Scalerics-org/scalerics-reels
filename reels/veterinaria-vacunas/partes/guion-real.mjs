// escribe guion.txt con los tiempos reales (de assets/tiempos3d.js): node partes/guion-real.mjs
import fs from "node:fs";
const { T, P1, P2, DUR, LEN } = await import("../assets/tiempos3d.js");
const f = (x) => x.toFixed(2).replace(".", ",");
const g = `[sin narrador Orus: el chiste va en las burbujas, en la ficha de Toto que se hunde en el fichero y en la cara de Toto; voces por archivo en partes/*.txt (partes/voces.md, partes/procesar.sh) · duración ${f(DUR)} s: parte 1 0,00-${f(P1)} · cartel ${f(P1)}-${f(P2)} · parte 2 (la solución) ${f(P2)}-${f(DUR)} = ${f(DUR - P2)} s, ${Math.round(((DUR - P2) / DUR) * 1000) / 10} %]
[parte 1 · 0,00-${f(P1)} · "Veterinaria Inés", consultorio, luz fría y pareja · cuadro 0: "VETERINARIAS" grande arriba, chip "JUNIO" · Toto (mestizo caramelo, oreja derecha parada y la izquierda caída, hocico blanco, collar navy con chapita crema, curita en el lomo) sentado sobre la mesa de acero, recién vacunado · Vero lo acaricia · Inés (ambo verde oscuro, estetoscopio, sin lentes) con la ficha de cartón en la mano · adelante a la izquierda, el fichero de cartón desbordado con 12 pestañas rojas]
VERO: Doctora, ¿y cuándo le toca la próxima?
[${f(T.escribe[0])} · Inés escribe en la ficha "Próxima: JUNIO" (la vacuna del año que viene)]
INES: Yo le aviso.
[${f(T.guarda)} · tira la ficha de Toto adelante de todo en el fichero: plac · Toto mueve la cola]
[${f(T.p2)}-${f(T.p2c)} · la escalada en el fichero, sin voz · chips AGOSTO, DICIEMBRE y "JUNIO · un año después" · fichas nuevas (LUNA, COCO, NEGRO, MORA, SIMÓN, PANCHO y otras) entran adelante y la ficha de Toto (pestaña TOTO, rótulo "Ficha de Toto") se hunde · pestañas rojas: Vencidas 12 → 25 → 41 → 63 · la pestaña de Toto se pone roja en junio]
[${f(T.p2c)}-${f(T.p3)} · JUNIO · 21:40 · Inés en el mostrador, de noche, con el teléfono en la oreja y la ficha de Toto en la mano; suena el tono, ladra un perro en la sala ("¡Guau! ¡Guau!"), cuelga]
[${f(T.p3)} · JUNIO · Bruno (chaqueta navy de recepción) entra con el fichero en brazos, que ya no cierra · Inés lavándose las manos en la pileta]
BRUNO: Doctora, ¿y los avisos de las vacunas?
[${f(T.p3b)} · contraplano de Inés, de 3/4]
INES: El que quiere a su perro, se acuerda.
[se seca las manos, segura; el fichero escupe dos fichas que caen al piso]
[${f(T.p4)} · JULIO · campanita de la puerta · entra Vero con Toto, que trae un pañuelo nuevo al cuello, rojo apagado, de otra veterinaria · Vero contenta, con una bolsa de ración · ${f(T.p4b)} contraplano: Vero de frente y Toto con el pañuelo]
VERO: A Toto le escribieron de la de la vuelta. Ya está vacunado.
[${f(T.p5)}-${f(T.p6)} · pausa · el fichero lleno en el mostrador, Inés detrás, Toto sentado abajo · rótulos: "63 vacunas vencidas en el fichero" / "$ 94.500 que no volvieron" y al pañuelo "Vacunado a la vuelta"]
[${f(T.p6)} · Inés se asoma por encima del mostrador · Toto la mira desde abajo con las orejas gachas]
INES: ¿Vos también, Toto?
[${f(T.p7)}-${f(P1)} · remate del remate · Toto se para, apoya las patas en el mostrador y le da la pata · Inés, seca, se la da · stinger]
[cartel · ${f(P1)}-${f(P2)} · time card de dibujito, fondo verde de marca con manchas y burbujas, letras que rebotan: "Un recordatorio" / "automático" / "más tarde…" · nunca "Scalerics"]
NARRADOR: Un recordatorio automático más tarde.
[parte 2 · ${f(P2)}-${f(DUR)} · el mismo consultorio, un año después · el encuadre del cuadro 0, chip "JUNIO" · el fichero ya no está: en su lugar, la tablet en su atril sobre el carrito · Toto con la chapita verde]
VERO: Doctora, ¿y cuándo le toca la próxima?
[el mismo audio de la parte 1 · ${f(T.i4 - 0.05)} plano más cerca de Inés y Toto]
INES: Le vamos a escribir a él.
[${f(T.q1t)} · inserto: la ficha de Toto en la tablet (foto, "Mestizo · 6 años · Vero", Vacuna hoy ✓, Próxima junio, Desparasitación al día ✓, "Aviso por WhatsApp: activado" ✓) · Guardar → Guardado ✓ · rótulo "La ficha de cada paciente"]
[${f(T.q2)} · chip "Un año después · 5 días antes" · rótulo "Recordatorio automático" · inserto del celular de Vero: "Veterinaria Inés · Hola, Vero. A Toto le toca la vacuna. ¿Te reservo el martes a las 10:00?" con los botones "Sí, martes 10:00" y "Elegir otro día" · ${f(T.q2b)} el living de Vero, Toto echado en el sillón]
VERO: ¡Toto! ¡Te escribieron!
[${f(T.q2c)} · Toto ladea la cabeza · Vero toca "Sí, martes 10:00" · "Turno reservado ✓ · Martes 10:00"]
[${f(T.q3)} · el consultorio · Bruno al lado de Inés, los dos con su tablet]
BRUNO: Doctora, ¿y los avisos de las vacunas?
[el mismo audio de la parte 1 · ${f(T.q3c)} inserto del panel "Vacunas de junio": "Recordatorios enviados 63 ✓" · tildes en Luna mar 9:45, Coco mar 9:00, Mora mar 10:30, Simón mié 17:30, Toto mar 10:00 · "Turnos reservados" 0 → 48 · "Pendientes" 63 → 15 (el 63 gira) · "A los 15: segundo aviso mañana" · "$ 72.000 en turnos reservados"]
INES: Ya salieron solos.
[${f(T.q4)} · chip "MARTES · 10:00" · la sala de espera llena y en hora: Luna en su transportadora, Coco con su dueño, Mora en brazos · campanita a las 10:00 en punto: entra Vero con Toto (chapita verde, sin pañuelo) · Toto va derecho al consultorio · ${f(T.q4c)} contraplano de Inés de 3/4, sonriendo]
INES: ¿Vos también, Toto?
[${f(T.q4d)} · Toto se para y le da la pata, contento · Inés se la da]
[${f(T.q5)} · el panel en verde ("Turnos reservados 48 ✓", "Pendientes 15", "Llamadas a mano: 0") y al lado el celular parado con la videollamada de Sofi (de Scalerics, auriculares verdes) · texto grande: "Comentá VACUNA" (VACUNA en el recuadro verde) desde ${f(T.palabra)}]
SOFI: Comentá VACUNA y te mando cómo funciona para tu veterinaria.
[${f(T.cierre)}-${f(DUR)} · abajo: "Ficha de cada mascota con recordatorio automático" / "scalerics.com" en verde]
`;
fs.writeFileSync("guion.txt", g);
console.log("guion.txt", DUR);
