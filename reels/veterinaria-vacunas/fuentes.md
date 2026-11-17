# veterinaria-vacunas · fuentes

Reel de la línea "ANTES QUE TODO" (rubro + dolor + solución), comedia de situación con personajes inventados (Inés,
Vero, Bruno, Toto; Sofi del elenco). **No afirma datos externos, estadísticas, años ni empresas reales.** Los números son
del caso que se cuenta, no estadísticas:
- 63 fichas con la vacuna vencida en el fichero de "Veterinaria Inés" (contador 12 → 31 → 63 de abril a junio).
- $ 94.500 que no volvieron = 63 × $ 1.500 (precio inventado de la vacuna en "Veterinaria Inés", verosímil para
  Montevideo; no se presenta como promedio de nada).
- Parte 2: 63 recordatorios enviados, 48 turnos reservados (48 × $ 1.500 = $ 72.000), 15 vencidas con "segundo aviso:
  mañana". Recordatorio "5 días antes", turno "martes 10:00", Toto "mestizo, 6 años": parte de la ficción del caso.

## Lo que se verificó y por qué el guion NO lo dice
Se buscó (WebSearch, 17-11) si en Uruguay la vacuna antirrábica de perros es obligatoria y anual, y cada cuánto se
revacuna con la polivalente:
- El MSP **promueve** la vacunación antirrábica desde el tercer mes de vida y su **revacunación anual** (comunicación
  por el Día Mundial contra la Rabia): https://www.gub.uy/ministerio-salud-publica/comunicacion/noticias/28-setiembre-dia-mundial-contra-rabia
  y recomienda "mantener actualizado el esquema vacunal en gatos y perros, el cual debe incluir la vacuna antirrábica":
  https://www.gub.uy/tramites/seguimiento-persona-mordida-prevencion-rabia
  Es una recomendación; no se encontró una norma que la haga obligatoria.
- Las guías de vacunación de la WSAVA (2024) no fijan un refuerzo anual único para todas las vacunas: distinguen
  esenciales y no esenciales, y para algunas esenciales en adultos plantean intervalos más largos:
  https://wsava.org/wp-content/uploads/2024/05/2024-Guidelines-for-the-Vaccination-of-Dogs-and-Cats.pdf ·
  https://wsava.org/global-guidelines/vaccination-guidelines/

**Decisión:** el guion no dice "anual", "obligatoria" ni nombra una vacuna específica. Dice "la próxima", "la vacuna" y
"le toca la vacuna", y la fecha de la próxima ("marzo") es la que la doctora anota en la ficha de ESTE perro. Lo mismo
la desparasitación: solo un ✓ en la ficha, sin intervalo.

Sin marcas: "Veterinaria Inés" es inventado; la otra veterinaria nunca se nombra ni se muestra ("la de la vuelta", un
pañuelo liso); vacuna genérica sin laboratorio; ración en bolsa kraft lisa; chat genérico (la palabra "WhatsApp" solo en
texto, sin su verde ni su logo).

## Voces
Gemini TTS con `herramientas/voz.mjs`: Inés = Sulafat, Vero = Callirrhoe, Bruno = Sadachbia, Sofi = Achernar, narrador
del cartel = Rasalgethi (toma nueva: "Un recordatorio automático más tarde."). Tomas en `partes/tomas/`, recortes en
`partes/rec/`.

## Música y efectos
Los de siempre del repo (con su crédito en `reels/taller-presupuestos/fuentes.md`, `reels/estetica-turnos/fuentes.md` y
`reels/ya-lo-cargo/fuentes.md`). Sonidos que probablemente haya que sumar (el constructor los busca primero en
`assets/sfx` de otros reels; si no están, uno real con licencia CC0 y anota acá autor, sitio y licencia): **ladrido
corto de perro mediano** (dos o tres: lejano, ladridito contento), **gemidito de perro**, **uñas de perro en piso
vinílico**, **maullido corto**, **campanita de puerta de comercio** (ver parrilla-no-vuelve), **canilla**, **teléfono
inalámbrico que se cuelga**, **ficha de cartón que entra en una caja**. Nada sintetizado con ffmpeg.
