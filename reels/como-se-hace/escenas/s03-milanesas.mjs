export const css = ``;
export const html = ``;
export const svg = (F) => {
  const I = F.INK, x = 290, y = 610, w = 500, h = 850;
  const t = (tx, ty, s, c) => `<text class="${c}" x="${tx}" y="${ty}" font-family="Lexend" font-weight="600" font-size="38" fill="${I}">${s}</text>`;
  const [g2] = F.globo(x + 30, 1170, "¿hacen envío?", "i", { fs: 32, cls: "s03-g2" });
  const [g3] = F.globo(x + 30, 1272, "¿abren mañana?", "i", { fs: 32, cls: "s03-g3" });
  return `<g class="s03-cel">${F.celular(x, y, w, h, "s03-clip", "#e9e4d8")}
    <g clip-path="url(#s03-clip)">
      ${F.chatCabecera(x, y + 20, w, "Sofía", "en línea")}
      <g class="s03-g1"><rect x="${x + 30}" y="${y + 170}" width="410" height="200" rx="22" fill="#ffffff" stroke="${I}" stroke-width="5"/>
        ${t(x + 56, y + 228, "Hola, ¿me guardás", "s03-l1")}${t(x + 56, y + 284, "dos milanesas", "s03-l2")}${t(x + 56, y + 340, "para las nueve?", "s03-l3")}</g>
      ${g2}${g3}
      <rect x="${x}" y="${y + h - 90}" width="${w}" height="90" fill="${F.ACE}"/>
      <rect x="${x + 24}" y="${y + h - 72}" width="${w - 120}" height="54" rx="27" fill="${F.HUE}"/>
      <circle cx="${x + w - 50}" cy="${y + h - 45}" r="28" fill="${F.AMA}" stroke="${I}" stroke-width="4"/>
    </g>
    ${F.celularBorde(x, y, w, h)}</g>
    <path class="s03-v1" d="M240 760 Q220 800 240 840 M210 740 Q180 800 210 860" fill="none" stroke="${F.AMA}" stroke-width="8" stroke-linecap="round"/>
    <path class="s03-v2" d="M840 760 Q860 800 840 840 M870 740 Q900 800 870 860" fill="none" stroke="${F.AMA}" stroke-width="8" stroke-linecap="round"/>`;
};
export const js = `
const GUARDAS = 0.45, MILANESAS = 1.0, NUEVE = 1.54;
// cuadro 0: el celular ya está y entra el globo
tl.fromTo(q(".s03-cel"), { y: 40, opacity: 0.6 }, { y: 0, opacity: 1, duration: 0.3, ease: "back.out(1.6)" }, 0);
K.popSvg(q(".s03-g1"), 0.0, "330 880", 0.3, 0.6);
gsap.set(qa(".s03-l1, .s03-l2, .s03-l3"), { opacity: 0 });
tl.to(q(".s03-l1"), { opacity: 1, duration: 0.15 }, 0.05);
tl.to(q(".s03-l2"), { opacity: 1, duration: 0.15 }, MILANESAS - 0.25);
tl.to(q(".s03-l3"), { opacity: 1, duration: 0.15 }, NUEVE - 0.2);
// entran más mensajes y vibra
K.popSvg(q(".s03-g2"), 1.85, "330 1200", 0.25, 0.5);
K.popSvg(q(".s03-g3"), 2.05, "330 1300", 0.25, 0.5);
K.sacudon(q(".s03-cel"), 1.9, 0.5);
K.sacudon(q(".s03-cel"), 2.1, 0.5);
gsap.set(qa(".s03-v1, .s03-v2"), { opacity: 0 });
tl.fromTo(qa(".s03-v1, .s03-v2"), { opacity: 0 }, { opacity: 1, duration: 0.08, yoyo: true, repeat: 3, immediateRender: false }, 1.85);`;
export const sfx = [{ t: 0.02, sfx: "notification", vol: 0.3 }, { t: 1.85, sfx: "vibra", vol: 0.3, max: 0.5 }, { t: 2.05, sfx: "ping", vol: 0.25 }];
