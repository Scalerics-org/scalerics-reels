# trabajar-con-scalerics · el FIJADO del perfil (3D real), 54,6 s

"¿Cómo es trabajar con Scalerics?" contado con el universo de abren-hoy: Rubén (el almacenero) pasa por los 4 pasos
reales de scalerics.com. Explica (es el fijado), pero con el humor de la serie. NO está en la cola ni en ideas.md.

## Ganchos (3, elegido el A)
- **A (elegido)** "¿Cómo es trabajar con Scalerics? Te lo cuenta Rubén." Es literalmente la pregunta del que entra al
  perfil desde un reel compartido, y el personaje que ya conoce le contesta: curiosidad + cara conocida.
- B "Rubén contestaba 48 veces por día si estaba abierto. Así lo resolvió en 4 pasos." Mejor chiste, pero vende el
  agente de IA y no el proceso (el fijado es para todo lo que hacemos).
- C "Cuatro pasos, precio fijo y cero letra chica." Claro, pero sin personaje ni hueco de curiosidad.

## Guion (v3, 05-11 noche: Rubén dice lo que quiere con su voz, se acortó Orus; 54,6 s)
ORUS ¿Cómo es trabajar con Scalerics? Te lo cuenta Rubén. · RUBÉN Yo hacía todo a mano: los pedidos, el stock, los
mensajes… (etiquetas Pedidos / Stock / Mensajes · 48 hoy) · ORUS Webs, tiendas online, sistemas a medida, agentes de IA,
automatizaciones: lo que tu negocio precise. (cinco objetos 3D con nombre sobre tarjeta navy) · ORUS Uno: una reunión
gratis de treinta minutos, online o presencial. · RUBÉN Quiero vender online, saber qué tengo en stock… y que los
mensajes se contesten solos. (tres burbujas sincronizadas) · SOFI Sin compromiso. Vemos qué te sirve a vos. · ORUS Dos:
en cuarenta y ocho horas, la propuesta, con precio fijo. (hoja con Tienda online · Control de stock · Agente de IA;
tildes Alcance / Plazo / Precio fijo; sello) · RUBÉN ¿Fijo? ¿Fijo, fijo? · SOFI Fijo. ("Sin letra chica") · ORUS Tres:
por etapas. Ves el avance y pedís cambios en cada una. (tablet TIENDA, STOCK, AGENTE) · RUBÉN ¿Y si saluda con un "buen
día, vecino"? · SOFI Hecho. (el saludo cambia) · ORUS Cuatro: lo publicamos, te capacitamos y seguimos con vos, con
soporte incluido. (EN LÍNEA; capacitación por la notebook; tienda, stock y chat juntos) · RUBÉN Ahora el almacén anda
solo. (mate en la mano, lejos de la cara) · ORUS ¿Querés ver cómo sería en tu negocio? Agendá una videollamada gratis
en scalerics.com.

## Cartel de paso
Franja propia arriba (0-400 px, navy opaca con filete verde, 3D pegada a la cámara: el número 3D va encima); nada de la
escena la invade. Todo lo que se tiene que leer (propuesta, tablet, paneles, burbujas) entra entero entre la franja y
los subtítulos (1300 px).

## Cómo está armado
- `node gen.mjs`: tiempos3d.js (T, PLANOS, envolventes de boca de Rubén y Gonzalo), 6 escenas HTML (gancho, cabecera de
  paso con barra de progreso, rótulos, subtítulos con nombre del que habla, interfaz de videollamada, tarjeta), index y
  la mezcla. `MEDIR=1` stems; `LIMPIO=1` sin capa plana ni logo (fondo de la portada).
- `assets/tres.js`: el almacén de abren-hoy (fachada solo en los planos que miran a la calle), la oficina de Gonzalo (antes Sofi) en
  x = 20, dos render targets para la videollamada, número 3D por paso, reloj, propuesta, sello, lupa, tablet por etapas,
  celular con 6 pantallas, cámara por planos con Catmull-Rom adentro de cada uno.
- `assets/personajes.js`: módulo de abren-hoy + ELENCO.gonzalo (el de este reel, hecho sobre la referencia de Gonzalo Siuciak:
  peinado "texturado" corto y despeinado, cejas gruesas rectas, barba de varios días con bigote, ojos marrones, cara
  algo alargada, complexión delgada, remera negra con el isotipo de Scalerics en el pecho, vincha fina; variantes A/B/C en
  GONZALO_VARIANTES, elegida la A). La oficina tiene zócalo claro para que la remera negra no se funda + Sofi rediseñada (ELENCO.sofi = variante B de SOFI_VARIANTES: coleta
  baja de costado, pestañas finas pegadas al ojo, cejas finas, cuello visible (cuelloAlto), labios que se aplanan
  sobre la boca al hablar (labiosPegados), chomba verde de marca, vincha fina con micrófono a la boca del lado izquierdo),
  parpadeo configurable. Las opciones nuevas vienen apagadas por defecto: abren-hoy queda idéntico (PSNR inf).
  La oficina de Sofi tiene un filete de madera en vez de la franja verde (se fundía con la chomba). Bug
  arreglado: lo pegado a la cámara (aCamara) ahora clona los materiales; antes ponía depthTest=false en materiales
  compartidos (M.navy) y los lados navy se dibujaban encima de todo.

## Sonido
Ukulele CC0 de fondo (-15 dB, baja 4 dB mientras alguien habla; voz ≥ 6 LU sobre el resto salvo el golpe del sello, que cae en un hueco), ambiente de calle en el gancho, pop por burbuja,
vibración, whoosh + golpe grave en cada número, campanita al conectar, tictac del reloj, papel, teclas en cada tilde,
sello, tipeo de Gonzalo, ding del cambio, respuesta enviada, sorbo de mate, chime de la tarjeta.
