#!/bin/bash
# genera un parlamento: ./gen.sh 03k   (g Gustavo, k coordinadora, m Mirta, r Rosa, o narrador, x coro)
b=$1; v=${b:2:1}
case $v in
  g) VOZ=Charon; TONO="Sos Gustavo, dueño de un comercio de unos 50 años, en una reunión de un grupo de apoyo anónimo, confesando con vergüenza, voz cansada y un poco quebrada, como un adicto que admite su problema frente al grupo. Tragicómico, sincero, pausado.";;
  k) VOZ=Kore; TONO="Sos la coordinadora de un grupo de apoyo anónimo en un salón parroquial: voz cálida, paciente, comprensiva, de maestra buena, con un dejo de ironía tierna. Nunca te alterás.";;
  m) VOZ=Leda; TONO="Sos Mirta, dueña de una tienda de ropa, en un grupo de apoyo anónimo: confesás algo vergonzoso con naturalidad total, sin darte cuenta de lo absurdo que es. Graciosa, segura, un poco cheta.";;
  r) VOZ=Aoede; TONO="Sos Rosa, dueña de una peluquería, la veterana del grupo de apoyo que ya se recuperó: tranquila, orgullosa, serena, con una sonrisa, como quien cuenta su secreto.";;
  o) VOZ=Orus; TONO="Sos el locutor de la marca que cierra el reel: cálido, seguro, cercano, con una sonrisa, como quien cuenta la solución.";;
esac
node ../../../herramientas/voz.mjs $b.txt raw/$b.wav --voz $VOZ --tono "$TONO"
