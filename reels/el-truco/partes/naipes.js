      // <naipes> (lo inyecta partes/inyectar.mjs: no editar a mano en las escenas)
      const NAI = { crema: "#f3ead6", madera: "#7a4a26", oscuro: "#3a2416", rojo: "#e5392b", oro: "#f2b632", pano: "#0a3a25", verde: "#5ce611" };
      const COLOR_PALO = { espada: NAI.rojo, copa: NAI.rojo, oro: NAI.oro, basto: NAI.madera };
      // dibujo del palo en una caja de 100x100 centrada en 0,0
      const palo = (p, c = COLOR_PALO[p]) => ({
        espada: `<path d="M0 -50 L9 -36 L9 20 L-9 20 L-9 -36 Z" fill="${c}" stroke="${NAI.oscuro}" stroke-width="4" stroke-linejoin="round"/><path d="M0 -36 V14" stroke="${NAI.crema}" stroke-width="3" stroke-linecap="round" opacity="0.7"/><path d="M-28 24 H28" stroke="${NAI.oscuro}" stroke-width="10" stroke-linecap="round"/><path d="M-28 24 H28" stroke="${NAI.oro}" stroke-width="5" stroke-linecap="round"/><path d="M0 28 V44" stroke="${NAI.oscuro}" stroke-width="9" stroke-linecap="round"/><circle cx="0" cy="50" r="7" fill="${NAI.oro}" stroke="${NAI.oscuro}" stroke-width="3"/>`,
        basto: `<path d="M-9 50 C-13 22 -18 -12 -16 -38 C-14 -54 14 -54 16 -38 C18 -12 13 22 9 50 Z" fill="${c}" stroke="${NAI.oscuro}" stroke-width="4" stroke-linejoin="round"/><circle cx="-10" cy="-18" r="5" fill="${NAI.oscuro}"/><circle cx="9" cy="2" r="5" fill="${NAI.oscuro}"/><circle cx="-6" cy="24" r="4" fill="${NAI.oscuro}"/>`,
        copa: `<path d="M-30 -40 H30 C30 -8 16 8 0 10 C-16 8 -30 -8 -30 -40 Z" fill="${c}" stroke="${NAI.oscuro}" stroke-width="4" stroke-linejoin="round"/><path d="M0 10 V36" stroke="${NAI.oscuro}" stroke-width="8" stroke-linecap="round"/><path d="M-22 42 H22" stroke="${NAI.oscuro}" stroke-width="9" stroke-linecap="round"/><path d="M-20 -30 H20" stroke="${NAI.oro}" stroke-width="4" stroke-linecap="round"/>`,
        oro: `<circle r="38" fill="${c}" stroke="${NAI.oscuro}" stroke-width="4"/><circle r="22" fill="none" stroke="${NAI.oscuro}" stroke-width="3"/><circle r="8" fill="${NAI.oscuro}"/>`,
      })[p];
      // carta de frente centrada en 0,0 (alto = 1.5 ancho)
      const carta = (num, p, w = 220, c = COLOR_PALO[p]) => {
        const h = w * 1.5, s = w / 200;
        return `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="${18 * s}" fill="${NAI.crema}" stroke="${NAI.oscuro}" stroke-width="5"/>` +
          `<rect x="${-w / 2 + 12 * s}" y="${-h / 2 + 12 * s}" width="${w - 24 * s}" height="${h - 24 * s}" rx="${10 * s}" fill="none" stroke="${c}" stroke-width="3" opacity="0.55"/>` +
          `<text x="${-w / 2 + 22 * s}" y="${-h / 2 + 62 * s}" font-family="Lexend" font-weight="800" font-size="${50 * s}" fill="${c}">${num}</text>` +
          `<text transform="rotate(180)" x="${-w / 2 + 22 * s}" y="${-h / 2 + 62 * s}" font-family="Lexend" font-weight="800" font-size="${50 * s}" fill="${c}">${num}</text>` +
          `<g transform="scale(${1.15 * s})">${palo(p, c)}</g>`;
      };
      // dorso de carta centrado en 0,0
      const dorso = (w = 220) => {
        const h = w * 1.5, s = w / 200;
        let r = "";
        for (let k = -4; k <= 4; k++) r += `<path d="M${k * 40 * s - h / 2} ${-h / 2} L ${k * 40 * s + h / 2} ${h / 2} M${k * 40 * s + h / 2} ${-h / 2} L ${k * 40 * s - h / 2} ${h / 2}"/>`;
        const id = "cl" + Math.round(w) + "_" + (dorso.n = (dorso.n || 0) + 1);
        return `<defs><clipPath id="${id}"><rect x="${-w / 2 + 16 * s}" y="${-h / 2 + 16 * s}" width="${w - 32 * s}" height="${h - 32 * s}" rx="${8 * s}"/></clipPath></defs>` +
          `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="${18 * s}" fill="${NAI.crema}" stroke="${NAI.oscuro}" stroke-width="5"/>` +
          `<rect x="${-w / 2 + 16 * s}" y="${-h / 2 + 16 * s}" width="${w - 32 * s}" height="${h - 32 * s}" rx="${8 * s}" fill="${NAI.rojo}"/>` +
          `<g clip-path="url(#${id})" stroke="${NAI.crema}" stroke-width="${4 * s}" opacity="0.55">${r}</g>` +
          `<circle r="${26 * s}" fill="${NAI.crema}" stroke="${NAI.oscuro}" stroke-width="3"/><circle r="${12 * s}" fill="${NAI.rojo}"/>`;
      };
      const pinta = (sel, html) => { for (const el of root.querySelectorAll(sel)) el.innerHTML = html; };
      // </naipes>
