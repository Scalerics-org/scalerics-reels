# Notas del constructor · por-que-el-recordatorio (11-11)

## Qué se hizo
- Voz: Orus, toma 1 de `partes/guion-voz.txt` (sin «», "Scálerics punto com"); `partes/armar-voz.sh` agrega pausas
  (0,2 s antes de "¿Por qué?", 0,3 s antes de "Y Graciela pasa.", acorta "Y … Graciela", 0,3 s al final).
  Duración 33,11 s (voz 32,99 s). El "oyó:" del STT coincide con el guion salvo "Scálerics punto com" ("escaleras
  punto com", lo de siempre con Orus) y "avisas solo" (STT; se oye "avisa solo"). Tiempos corregidos a mano con
  silencedetect en `partes/ajustar-tiempos.mjs` (¿Por qué? del gancho y de la bisagra, «me olvidé», Un estudio,
  Y Graciela pasa, el cierre).
- `assets/tres.js`: una sola escena Three.js, `renderAt(t)` puro, cámara por planos con Hermite monótona; 5 zonas
  (almacén A, consultorio D, crema liso P, vereda G, cierre F). La burbuja del recordatorio (misma geometría) es el
  hilo de todo el reel.
- `gen.mjs`: capa HTML (gancho, rótulos con línea guía, créditos, tarjeta de cierre) + SFX por escena;
  `assets/firma.json` (tramos sin logo: primer plano del celular de Graciela y s11).
- `armar.mjs` (base por-que-la-toalla): fondo crema, subtítulos navy con borde blanco sin cartel, recuadro verde con
  borde navy, "olvido" en rojo apagado, Caveat declarada (tickets escritos a mano), cama 0,24.
- Mezcla: `python3 partes/medir.py`. I -16,3 LUFS antes del loudnorm, pico -2,9 dBFS. Quedan tramos de 0,5 s con
  menos de 6 dB, todos en colas de palabra o pausas (12,0 cola de "turnos" contra la cama; 14,0 pausa después de
  "préstamos:"; 19,0 cola de "intereses." contra el whoosh; 22,5 pausa después de "encargo."; 26,0 la campanita
  justo antes de "Y"; 27,5 cola de "pasa." y el whoosh de s11). Que el revisor de sonido lo confirme con el render.
- `check --json`: ok, 0 errores (warnings: canvas al borde, un "color undefined" de Three que viene del módulo de
  personajes, `#fondo` anidado; iguales a los de toalla).
- Snapshots cada 0,5 s: 4 pasadas completas (66 cuadros) + parciales. Corregido entre pasadas: gancho que se salía
  del ancho y pisaba el celular; burbuja de la zambullida detrás del celular; mano de Rubén (parecía una pelota: se
  sacó); encuadres del consultorio (ahora se ve el sillón vacío del fondo con "Faltó" y el rótulo lo señala); "?"
  de la bisagra más alto (el paciente asomaba abajo); nube de Rubén más grande; crédito de s04 que se salía del ancho;
  tarjeta de cuotas cortada (cámara centrada) y en un atril (antes flotaba sobre media pantalla vacía); tildes que
  tapaban los números; burbujitas de las cuotas que quedaban de espaldas al plegarse la tarjeta; "-25 %" separado;
  grúa del almacén más alta; bolsas más grandes y apareciendo en "Rubén" (en "encargo" laten); ojos de Rubén que
  parecían cerrados al mirar abajo; push-in al celular de Graciela relativo al celular (antes iba a la cara);
  contraplano de Rubén; plano de s10 (Graciela tapaba a Rubén); logo en píldora blanca (sobre el frente navy del
  mostrador desaparecía); sombra del cierre; celular de Rubén visible de canto en s04.

## Planos (segundos globales)
0,00 A1 gancho: celular de Rubén con la burbuja del dentista · 2,9 la burbuja se despega · 3,47 D: corte, la burbuja
vuela al sillón y travelling atrás (fila de 6 sillones) · 6,4 push-in a la lámpara → "?" (6,67) · 7,71 A4: corte con
el "?" que se vuelve la nube de Rubén · 9,7 «me olvidé»: el papelito cae · 10,56 P: el papelito se da vuelta, tarjeta
de cuotas en el atril, monedas · 12,56 push-in, crédito 2011 · 14,5 celular de la financiera y las burbujitas a las
cuotas 1-5 · 16,0 la tarjeta se va, aparece la balanza (16,7 se nivela, 17,8 "-25 %") · 19,1 push-in a la balanza ·
19,57 A8: corte a la balanza de Rubén, grúa al almacén, bolsas (20,3), pulso en "encargo" (22,0) · 22,98 push-in al
ticket de Graciela · 23,45 tilde y sale la burbuja · 24,1 G: corte, la burbuja entra al celular de Graciela, vibra
(24,4), lo muestra · 24,9 push-in al celular · 25,62 AR: Rubén con el mate · 26,20 A10: Graciela entra, se lleva la
bolsa, tickets en verde · 27,77 A11: el celular de Rubén con las dos burbujas · 30,10 F: cierre verde (3,0 s).

## Dudoso / pendiente
- s10 (26,2-27,8): Rubén queda casi todo detrás de las bolsas de Marta/Nico (se ve la cabeza y el guiño); la entrega de
  la bolsa se lee, pero la mano de Rubén casi no se ve. Graciela entra cortada por el borde izquierdo en el primer
  cuarto de segundo (entra a cuadro).
- s08: el tercio de abajo es el frente navy del mostrador (con el rótulo encima); funciona, pero es una franja lisa.
- s01: el celular "sube" sin mano (se sacó la mano de prop porque se veía como una pelota de piel).
- Transiciones de 0,2-0,3 s con cosas cortadas al borde a propósito (el "?" saliendo de la lámpara a 6,7-6,9; el "?"
  sobre la cara de Rubén a 7,7-8,0 mientras viaja a la nube; push-in al ticket con el ojo de Rubén al borde a 23,2).
  Mirarlas cuadro por cuadro en el render.
- s09 primer plano del celular de Graciela: el subtítulo queda sobre sus anteojos (arriba del celular), legible.
- La burbuja de la balanza y las de las cuotas tienen texto chico (es la forma lo que importa, no se lee).
- Portada: `portada.json` con fondo limpio `portada-src/fondo-limpio-18.6.png` (la balanza nivelada). `fondo`/`velo`
  quedaron navy como en toalla (bandas oscuras de la herramienta); `herramientas/portada.mjs` de este repo no lee
  `fondo_limpio` (toma el cuadro del mp4): hay que pasarle el fondo limpio como hizo toalla.
- Mezcla: ver arriba (tramos < 6 dB en pausas). Sin ambiente de almacén (no hay archivo con origen registrado).
- No se renderizó el mp4 ni se hizo commit.
