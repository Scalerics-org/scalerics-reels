// s12-pasa: la comanda del pedido TOMADO; el celular vuela a Beto ("te la pasa"); Beto a cámara, pulgar
// arriba ("hacé la tuya"); y "Lo armamos en Scalerics" con el logo.
import { escena, duracion, beto, celular, mano, camara, COL } from "./comun.mjs";
const id = "s12-pasa", dur = duracion(id);
const svg = `
  <g class="s12-esc1">
    ${camara(190, 1250, 0.55, "s12-cam")}
    ${beto({ id: "s12-beto", x: 720, y: 1560, s: 1.0, cara: "sonrisa" })}
    <g class="s12-pul">${mano(900, 1230, 1.3, -90)}<path d="M890 1185 L890 1130" stroke="${COL.ink}" stroke-width="30" stroke-linecap="round" /><path d="M890 1185 L890 1130" stroke="${COL.piel}" stroke-width="18" stroke-linecap="round" /></g>
    <g class="s12-celv">${celular({ cls: "s12-cel", x: 330, y: 840, s: 0.6, rot: -10 })}</g>
  </g>
`;
const html = `
  <div class="s12-com"><b>PEDIDO</b><span>2 muzzarellas</span><span>envío a domicilio</span><div class="s12-ok">TOMADO</div></div>
  <div class="tag s12-para">PARA VOS, BETO</div>
  <img class="s12-logo" src="assets/logo-blanco.png" alt="Scalerics" />
  <div class="tag s12-ag">AGENTES DE IA</div>`;
const css = `
  P .s12-com { position: absolute; left: 560px; top: 610px; width: 460px; padding: 24px 28px 70px; background: ${COL.blanco}; border: 6px solid ${COL.ink}; box-shadow: 10px 10px 0 rgba(0,0,0,0.5); transform: rotate(3deg); font-family: "Lexend", sans-serif; color: ${COL.ink}; }
  P .s12-com b { display: block; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 30px; letter-spacing: 0.2em; border-bottom: 4px dashed ${COL.ink}; padding-bottom: 10px; margin-bottom: 12px; }
  P .s12-com span { display: block; font-family: "Caveat", cursive; font-weight: 700; font-size: 50px; line-height: 1.0; }
  P .s12-ok { position: absolute; right: -20px; bottom: -30px; padding: 6px 18px 2px; border: 7px solid ${COL.verde}; border-radius: 10px; font-weight: 900; font-size: 46px; color: ${COL.verde}; background: ${COL.ink}; transform: rotate(-10deg); }
  P .s12-para { left: 120px; top: 1040px; font-size: 30px; background: ${COL.verde}; }
  P .s12-logo { position: absolute; left: 190px; top: 880px; width: 700px; height: auto; }
  P .s12-ag { left: 330px; top: 1090px; font-size: 36px; background: ${COL.verde}; }
`;
const js = `
      const TOMA = 0, PED = 0.2, Y = 0.82, CHA = 1.33, TE = 2.11, PASA = 2.55, VOS = 3.25, TUYA = 3.94, LO = 4.72, SCA = 5.29;
      // comanda
      tl.fromTo(q(".s12-com"), { y: -500, rotation: -10, opacity: 1 }, { y: 0, rotation: 3, opacity: 1, duration: 0.35, ease: "back.out(1.4)" }, 0);
      golpe(".s12-ok", PED + 0.3, { desde: 2.6 });
      // Beto y el celular que vuela
      entra(".s12-beto", Y, { x: 500 }, 0.35);
      gsap.set(q(".s12-celv"), { opacity: 0 });
      tl.fromTo(q(".s12-celv"), { opacity: 1, x: 0, y: 0, rotation: 0, svgOrigin: "330 840" }, { opacity: 1, x: 300, y: 380, rotation: 380, svgOrigin: "330 840", duration: 0.6, ease: "power2.inOut", immediateRender: false }, TE - 0.3);
      pop(".s12-para", PASA - 0.1, { desde: 0.5 });
      habla(".s12-beto-boca", TE + 0.4, 0.5, 0.1, 0.5);
      // hacé la tuya: a cámara
      sale(".s12-com", VOS - 0.1, 0.2);
      sale(".s12-para", VOS - 0.1, 0.2);
      sale(".s12-celv", VOS - 0.1, 0.2);
      entra(".s12-cam", VOS - 0.1, { x: -500 }, 0.3);
      pop(".s12-pul", TUYA - 0.15, { desde: 0.3, o: "900 1230" });
      tl.fromTo(q(".s12-cam-tally"), { opacity: 1 }, { opacity: 0.15, duration: 0.25, yoyo: true, repeat: 3, ease: "steps(1)", immediateRender: false }, VOS);
      // Scalerics
      tl.to(q(".s12-esc1"), { opacity: 0, filter: "blur(8px)", duration: 0.25 }, LO - 0.15);
      gsap.set(q(".s12-logo"), { opacity: 0 });
      tl.fromTo(q(".s12-logo"), { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.8)", immediateRender: false }, SCA - 0.15);
      pop(".s12-ag", SCA + 0.25, { desde: 0.6 });
`;
escena({ id, dur, css, svg, html, js, sfx: [
  { t: 0.05, sfx: "whoosh-short", vol: 0.25 },
  { t: 0.45, sfx: "impact-bass-1", vol: 0.3, max: 0.5 },
  { t: 1.85, sfx: "whoosh", vol: 0.25 },
  { t: 2.45, sfx: "pop", vol: 0.3 },
  { t: 3.8, sfx: "sparkle", vol: 0.25 },
  { t: 5.15, sfx: "chime", vol: 0.35 },
] });
