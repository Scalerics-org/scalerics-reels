# Voces · por-que-el-99

Gemini TTS (`herramientas/voz.mjs`), una toma por archivo, recortar silencios con `silenceremove` y pegar con
`partes/armar-voz.mjs` (copiar el de `reels/por-que-sacar-numero/partes/`). `partes/guion-voz.txt` = todo en orden,
sin acotaciones, para `tiempos.mjs` (el `guion.txt` de la carpeta tiene acotaciones entre corchetes: que el
constructor arme el guion limpio para la voz y los tiempos desde `guion-voz.txt`).

| archivo | quién | voz | texto | tono |
|---|---|---|---|---|
| `orus1.txt` | Narrador | **Orus** | frases 1-8 (gancho → "A veces gana el redondo.") | Narrador de los explicadores, uruguayo, curioso, con ritmo, sin vender. La pregunta del gancho, pregunta de verdad. "Porque el primer número pesa más." asentado, como quien revela un truco. "¿Lo del cajero y el vuelto?" con media sonrisa cómplice (todos la escuchamos) y "No está probado." seco, sin burla. "Lo que sí se midió:" con un mini peso en "sí". En "treinta y cuatro y a treinta y nueve" separar bien los dos números. **Pausa de 0,4 s antes de "y vendió más"** (es el giro: "Más caro… y vendió más."). "El nueve suena a oferta." cómplice, bajito. "A veces gana el redondo." con un leve giro de cabeza, liviano. |
| `ruben.txt` | Rubén | **Algenib** | ¿Y mi noventa y nueve vendió más? | Dueño de distribuidora, grave, cansado, uruguayo, picante seco: se da cuenta en voz alta de que cambió el precio hace un mes y nunca se fijó. Sin drama, con un "¿y?" de quien sospecha que nadie le va a saber contestar. ~1,8 s. |
| `orus2.txt` | Narrador | **Orus** | "Un reporte automático…" → cierre | Igual que orus1. "le dice qué precio vende más" claro y contento, como respuesta a Rubén. "¿Medimos los tuyos?" de colega, sin urgencia. "scalerics.com" se escribe "Scálerics punto com" en el .txt para que lo pronuncie bien. |

Pausas (las mete armar-voz): +0,3 s después del gancho; +0,25 s después de "cien"; +0,3 s después de "No está probado."
(cambia de tema); 0,4 s antes de "y vendió más" si la toma no la trae; 0,45 s antes de Rubén y 0,4 s después.
Si "noventa y nueve" sale como "99" leído raro o "Scálerics" mal, regenerar SOLO esa frase y pegarla.
