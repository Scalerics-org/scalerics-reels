// Capa 3D de vete-castracion (Three.js r170 local). Base técnica: reels/vete-racion (globos pegados a la cámara en
// píxeles de pantalla, avatares y fotos por render target, poses por claves, bocas por envolvente, PLANOS con
// Catmull-Rom, insertos a pantalla completa). renderAt(t) es una función pura del tiempo del timeline (hf-seek): nada de
// rAF, Date.now ni azar sin semilla.
// TRES lugares: la recepción de Veterinaria Inés (x = VX: mostrador, vidriera a la vereda, pizarra de cirugías, el
// inalámbrico), la sala de recuperación (x = RX: dos camillas, la lámpara de calor, la puerta del quirófano) y la cocina
// de Vero (x = 0).
//   PARTE 1: jueves 9:02, el teléfono ya suena: "¿Cómo está Toto?" / "Vero. Te estoy viendo." · 10:30, 12:00, 14:00 ·
//            15:30 la sala de recuperación: "Doctora. Vero quiere hablar con él." / "Está anestesiado." / "Dice que no
//            importa." · la pausa · el teléfono en la oreja de Toto, que ronca · "¡Ay, mi amor!" · "Ahora el de Coco."
//   PARTE 2: el mismo jueves con avisos: "Toto ingresó ✓" · "¡Ay, mirá! ¡Ya entró!" · el panel · el video del despertar ·
//            "Ahora el de Coco." (mandando el aviso) · "Bruno, ¿llamó alguien?" / "Nadie." · "¿Cómo está Toto?" /
//            "Preguntale a él." · Inés: "Comentá AVISOS…"
