# inmobiliaria-disponible · fuentes

Reel de la línea "ANTES QUE TODO" (rubro + dolor + solución), comedia de situación con personajes inventados (Silvana,
Diego, Agustina, don Alberto; Silvana y Diego vienen de `inmobiliaria-visitas`). **No afirma estadísticas, porcentajes,
años ni resultados.** Lo único "de afuera" que se nombra son las garantías de alquiler que acepta el propietario del caso
(ANDA, CGN, Porto Seguro, depósito), verificadas abajo con dos fuentes cada una. Búsquedas hechas con WebSearch el 25-11.

## Garantías que se nombran (en el chat del agente, Q1, y en la burbuja de Agustina, P2)
Se nombran solo como texto, como opciones que acepta ESTE propietario; sin logos, sin colores, sin opinar de ninguna y sin
precios ni condiciones.
- **ANDA** ofrece un servicio de garantía de alquiler en Uruguay.
  - Reglamentación del servicio, de la propia ANDA: https://anda.com.uy/wp-content/uploads/2021/03/REGLAMENTACION-DEL-SERVICIO-DE-GARANTIA-DE-ALQUILER.pdf
  - Montevideo Portal, "¿Qué ofrecen las principales aseguradoras del mercado? ¿Cuál elegir?": https://www.montevideo.com.uy/Especiales/-Que-ofrecen-las-principales-aseguradoras-del-mercado--Cual-elegir--uc860937
- **CGN** (Contaduría General de la Nación, Servicio de Garantía de Alquileres): garantía del Estado para alquiler de
  vivienda.
  - Trámite oficial, gub.uy: https://www.gub.uy/tramites/alquiler-contaduria-general-nacion
  - MEF, información para inquilinos del SGA: https://www.gub.uy/ministerio-economia-finanzas/politicas-y-gestion/inquilinos
- **Porto Seguro** ofrece en Uruguay una póliza de garantía de alquiler.
  - Montevideo Portal, "¿Cuáles son las opciones y requisitos de las principales aseguradoras del mercado?": https://www.montevideo.com.uy/Especiales/-Cuales-son-las-opciones-y-requisitos-de-las-principales-aseguradoras-del-mercado--uc930729
  - Montevideo Portal (nota anterior, la misma comparación): https://www.montevideo.com.uy/Especiales/-Que-ofrecen-las-principales-aseguradoras-del-mercado--Cual-elegir--uc860937
  - (Además, nota de prensa sobre otra garantía de Porto Seguro en Uruguay: https://americaretail-malls.com/paises/uruguay/porto-seguro-introduce-en-uruguay-la-primera-garantia-de-arrendamientos-rurales-del-pais/)
- **Depósito** como garantía (en vez de garante o seguro): la ley de arrendamientos lo prevé.
  - Decreto-ley 14.219, IMPO: https://impo.com.uy/bases/decretos-ley/14219-1974/38
  - Montevideo Portal (menciona el depósito como alternativa): https://www.montevideo.com.uy/Especiales/-Cuales-son-las-opciones-y-requisitos-de-las-principales-aseguradoras-del-mercado--uc930729

**Lo que se buscó y NO se dice:** el "depósito en el BHU". Las leyes de 1968 y 1974 dicen que los depósitos se hacían en
el Banco Hipotecario (https://impo.com.uy/bases/leyes/13659-1968/37), pero no encontré una fuente actual que confirme
cómo funciona hoy. Por eso la ficha dice solo "depósito", sin "BHU". Tampoco se dicen costos de ninguna garantía (el 3 %
mensual de la CGN y de ANDA aparece en las fuentes, pero el reel no lo necesita).

## Números del caso (no son estadísticas ni promesas de resultado)
- **Punta Carretas · 1 dormitorio · $ 30.000 + gastos comunes $ 5.000.** Precio inventado, calibrado con avisos reales de
  alquiler de 1 dormitorio en Punta Carretas (2026) que piden entre ~$ 28.000 y $ 32.000 con gastos comunes de ~$ 4.500 a
  $ 5.000 (ej. https://www.infocasas.com.uy/alquiler/apartamentos/montevideo/punta-carretas/1-dormitorio/baratos y
  https://www.infocasas.com.uy/alquiler-apartamento-1-dormitorio-en-punta-carretas-se-aceptan-mascotas/194273820). El reel
  no presenta el precio como promedio de nada: es el de este apartamento.
- **"Comisión de este alquiler: $ 30.000"**: la de ESTE alquiler en Silvana Propiedades (un mes del alquiler del caso).
  Calibración: avisos de inmobiliarias uruguayas publican honorarios de "un mes de alquiler más IVA" (ej. listados en
  InfoCasas: https://www.infocasas.com.uy/inmobiliarias/amaranto-prop/131752/alquiler/apartamentos). No hay norma que fije
  la comisión ni quién la paga: el guion NO dice porcentaje, "más IVA", "un mes" ni quién la paga; solo el monto del caso.
- 12 consultas a las 15:00 y 38 a las 23:10; Agustina a las 15:02 (garantía ANDA, se muda el 1°); contestada el miércoles
  9:10; alquiló "ayer 16:30" en otra inmobiliaria (no se nombra ni se muestra). Parte 2: 38 contestadas al instante, 5 con
  mascota (se les ofrecen 2 propiedades que aceptan), 9 sin garantía (requisitos), 6 visitas, 2 listos para visitar y
  firmar, RESERVADO el miércoles 12:00, firman el viernes. Todo ficción del caso.
- Parque Batlle y Punta Carretas son barrios de Montevideo (nombres de lugar, no marcas).

## Lo que se dice del producto
Que el agente de IA contesta al instante y a cualquier hora las consultas de WhatsApp y portales con los datos de cada
propiedad, filtra (garantía, fecha de mudanza, mascotas), agenda la visita en la agenda del corredor y le pasa a la dueña
los interesados listos: es lo que hace un agente de IA de Scalerics (CLAUDE.md, "Agentes de IA"), armado a medida. No se
promete ningún resultado en números fuera del caso. Ningún portal inmobiliario se nombra ni se dibuja; "WhatsApp" solo en
`descripcion.txt` como canal.

## Sin marcas
"Silvana Propiedades" es inventada. Chat genérico (burbujas crema/navy, íconos genéricos de canal), celulares y monitor
sin logo. Las garantías, solo texto (ver arriba).

## Voces
Gemini TTS con `herramientas/voz.mjs`: Silvana = **Erinome** y Diego = **Achird** (los de `inmobiliaria-visitas`),
Agustina = **Laomedeia** (usada en un solo reel del repo), don Alberto = **Charon**, narrador del cartel = Rasalgethi
(audio reusado de `reels/abren-hoy-completo/assets/voice/narrador.wav`). En la parte 2 se reusan IDÉNTICOS: 01-diego (Q1)
y 07-alberto (Q4). Textos en `partes/<id>.txt`, tonos en `partes/lineas.tsv`.

## Música y efectos (para el constructor)
Los de siempre del repo, con su crédito en `reels/inmobiliaria-visitas/fuentes.md`, `reels/resto-reservas/fuentes.md`,
`reels/taller-presupuestos/fuentes.md` y `reels/ya-lo-cargo/fuentes.md` (vibra, notification, key-press, tic-real, ding,
pop, whoosh, stinger, llaves, puerta-abre, paso-*, zumbido-largo, k-dos-tonos). Probablemente falten: **eco/ambiente de
apartamento vacío**, **taza de café apoyada en el escritorio**, **pasos en palier**. Primero buscarlos en `assets/sfx` de
otros reels; si no están, uno real con licencia CC0 (BigSoundBank o Freesound CC0) y se anota acá autor, sitio y
licencia. Nada sintetizado con ffmpeg.
