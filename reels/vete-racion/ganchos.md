# vete-racion · tres arranques

Tema (reservado por la corrida del 24-11 09:10 UTC): **VETERINARIAS** · la ración que el cliente fiel compraba todos los
meses en la veterinaria y que un domingo a la noche, con la veterinaria cerrada, pasa a comprar en el súper (y ahí se
queda). Producto: **tienda online + automatización** (la veterinaria vende la ración online con envío o retiro; el
sistema sabe qué bolsa lleva cada mascota y cada cuánto, y unos días antes de que se termine le escribe al dueño con
"Repetir pedido" y pago; panel de recompras para Inés). No es agente de IA. Cartel: **"Una tienda online más tarde…"**.
Cierre: Inés a cámara, **"Comentá RACIÓN y te mando cómo funciona para tu veterinaria."**

Elenco de `veterinaria-vacunas`: **Inés** (dueña, Sulafat, sin lentes desde la r2 de vacunas), **Vero** (dueña de Toto,
Callirrhoe), **Bruno** (recepción, Schedar), **Toto** (`assets/perro.js`, no habla). Ningún personaje nuevo.

Lo que NO se repite:
- `veterinaria-vacunas` (17-11, mismo elenco): ni "¿Vos también, Toto?", ni la pata, ni el pañuelo de otra veterinaria,
  ni "le escribieron de la de la vuelta", ni el fichero. Acá Vero no se va a otra veterinaria: sigue yendo a Inés a
  control; lo que se va es la ración, al súper. Toto tampoco "traiciona": es el que se da cuenta de todo (el plato).
- `dist-cliente-grande` (17-11): abría con "Rubén, ¿y Héctor?" / "Compraba.". Por eso acá NO va "¿Y Vero? Antes venía
  todos los meses." (sería el mismo arranque): Inés pregunta lo que pregunta cualquier veterinaria en un control,
  "¿Qué está comiendo Toto?", y la respuesta es el golpe.
- `tienda-tenes-stock` ("Ya lo sabe la tienda.") y `la-lista`: ni stock ni lista de precios; el chiste del final de la
  parte 2 es de Toto, sin frase.

## A · "Domingo, 21:40": el plato vacío, el súper, y "La que me recomendaste. La compro en el súper." (LA ELEGIDA)
- **Cuadro 0:** "VETERINARIAS" gigante y el chip "Domingo, 21:40." en la cocina de Vero: Toto ya empujando con el hocico
  el plato de acero vacío contra la pantufla de Vero (clonc), Vero dando vuelta la bolsa de 15 kg de la veterinaria: cae
  UNA croqueta. **"Uy. Se terminó."** · el celular: "Veterinaria Inés · Cerrado · Abre el lunes 9:00" · **"Bueno, Toto.
  Al súper."**
- **El súper y los meses, sin voz:** la góndola de bolsas genéricas, la de 15 kg al carro (rótulo "15 kg · $ 3.900").
  Chips NOVIEMBRE, DICIEMBRE, ENERO: el mismo carro, la misma bolsa, sin pensarlo. Contador rojo apagado: "Ración que no
  se vendió en la veterinaria: $ 3.900 → $ 15.600".
- **Febrero, en la veterinaria:** la torre de bolsas de 15 kg sin tocar al lado del mostrador. Campanita: Vero con Toto,
  a control. Toto va derecho a la torre y la huele moviendo la cola. Inés, contenta de verlos: **"¡Vero! ¿Qué está
  comiendo Toto?"** · Vero, agradecida: **"La que me recomendaste. La compro en el súper."** Pausa (rótulos: "$ 3.900 por
  mes · $ 46.800 al año, en el súper"; "Clientes de bolsa que dejaron de venir: 11").
- **Remate del remate:** Vero: **"¿Me la anotás? Así no me equivoco."** E Inés, sin una palabra, arranca una hoja de su
  recetario con el membrete "VETERINARIA INÉS" y le escribe la lista del súper. Toto se echa contra la torre con un
  suspiro. Stinger.

## B · En frío en la veterinaria: la torre de bolsas y "¿Qué está comiendo Toto?"
- Cuadro 0: Inés al lado de la torre, Vero entra y contesta.
- El remate funciona, pero el dueño de veterinaria no ve el porqué (el domingo cerrado): parece que Vero eligió el súper
  por precio, y eso deja mal parada a la veterinaria o a Vero. Sin el plato vacío del domingo no hay "esto es mío" ni
  hay dolor que la tienda online resuelva. Queda como el medio de A.

## C · Toto va solo al súper
- Domingo 21:40 Toto empuja el plato, nadie le hace caso, agarra la correa con la boca y se va a la góndola del súper.
- Es gracioso, pero es un chiste de perro, no de dueña de veterinaria: el costo para Inés no se ve, la parte 2 no tiene
  callback limpio y lo absurdo le quita el "es exactamente así". Se usa solo la mitad: Toto como el "aviso" que nadie
  escucha (el plato), y en la parte 2 el plato que ya está lleno.

## ¿Por qué A?
1. **"Esto es mío" antes de los 2 s:** "VETERINARIAS" escrito y el domingo a la noche que toda veterinaria conoce desde
   el otro lado: la bolsa de SU veterinaria (el sticker de Inés), vacía, y el perro con el plato.
2. **El dolor con su plata, del caso:** la bolsa de 15 kg a $ 3.900 por mes, $ 46.800 al año que se compran en otro lado,
   11 clientes de bolsa que dejaron de venir; y la torre de bolsas sin vender en el local.
3. **Nadie queda mal parado:** Vero no se fue: sigue yendo a control y hace caso a la recomendación de Inés (es un
   elogio); simplemente se le terminó un domingo con la veterinaria cerrada. Inés recomienda bien. El que pierde es el
   circuito: la veterinaria recomienda y vende el súper.
4. **Remate seco que todo veterinario vivió:** "La que me recomendaste. La compro en el súper." dicho con cariño. Y el
   remate del remate en silencio: la doctora escribiendo, con su propio membrete, la lista del súper.
5. **La parte 2 es el mismo mes con callbacks exactos:** el jueves, cuatro días antes de que se termine, a Vero le llega
   "A Toto le quedan unos 4 días de ración. ¿Te la mandamos?" ("¿Cómo sabe?"), repite el pedido y paga en un toque;
   el viernes llega la bolsa; el **domingo a las 21:40 Toto va a empujar el plato y está lleno**; en febrero, el mismo
   "¡Vero! ¿Qué está comiendo Toto?" (mismo audio) recibe "La que me recomendaste. Me llega sola."

**¿Una dueña de veterinaria se lo mandaría a otra?** Sí: todas recomiendan una ración y ven cómo se compra en el súper o
en la estación de servicio, y todas tienen la pila de bolsas al lado del mostrador. **¿El remate pega?** Pega porque es
un elogio que duele ("la que me recomendaste") y porque el remate del remate se ve: la receta de la veterinaria
convertida en lista del súper.
