// Generador de escenas de reels/por-que-el-precio (correr desde la carpeta del reel:
// `node gen.mjs && node armar.mjs`). Estilo "resultaaquee" (forma de por-que-la-tarjeta y
// por-que-el-carrito): el protagonista es un celular gigante CORRIDO A LA IZQUIERDA y, colgada a
// su derecha, una etiqueta de precio gigante que se transforma: "?" → "$ 420" → "consultar" →
// "$ 1.450" → "$ 1.990". La pantalla del celular va cambiando: app de viaje → taxímetro → app →
// web de la pastelería sin precios → con precios → cotizador → chat → tu sitio → videollamada.
import fs from "node:fs";
import { execSync } from "node:child_process";

const pal = JSON.parse(fs.readFileSync("assets/voice/palabras.json", "utf8"));
const reel = JSON.parse(fs.readFileSync("reel.json", "utf8"));
const r2 = (n) => Math.round(n * 100) / 100;
const VOZ = r2(Number(execSync("ffprobe -v error -show_entries format=duration -of csv=p=0 assets/voice/locucion.wav").toString()));
const DUR = r2(Math.max(VOZ, pal.at(-1).end) + 3.2);
const ini = (i) => (i === 0 ? 0 : r2(pal[i].start));
const ESC = Object.fromEntries(reel.escenas.map(([id, i], k) => [id, r2((k + 1 < reel.escenas.length ? ini(reel.escenas[k + 1][1]) : DUR) - ini(i))]));
const INI = Object.fromEntries(reel.escenas.map(([id, i]) => [id, ini(i)]));

const NAVY = "#0b1220", NAVY2 = "#16243d", NAVY3 = "#1f3254", CR = "#efeee5", G = "#5ce611", GD = "#3fa60a", RED = "#c7655b", GRIS = "#9aa1ad", MAPA = "#d9d7ca";

// ---------- piezas ----------
const tick = (r = 22, fondo = G, linea = NAVY) =>
  `<svg width="${2 * r}" height="${2 * r}" viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="22" fill="${fondo}"/><path d="M12 22.5 L19 29.5 L32 15" fill="none" stroke="${linea}" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const esquinas = `<i class="k1"></i><i class="k2"></i><i class="k3"></i><i class="k4"></i>`;
const selbox = (cls, x, y, w, h, extra = "") => `<div class="selbox ${cls}" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px${extra}">${esquinas}</div>`;
const pill = (k, x, y, txt, kind = "") => `<div class="pill ${kind} n${k}" style="left:${x}px;top:${y}px">${txt}</div>`;
const lead = (k, x1, y1, x2, y2, kind = "") => `<path class="lead ${kind} l${k}" d="M${x1} ${y1} L${x2} ${y2}"/><circle class="dot ${kind} d${k}" cx="${x2}" cy="${y2}" r="12"/>`;
const avatar = (s = 140, fondo = CR, fig = NAVY3) =>
  `<svg width="${s}" height="${s}" viewBox="0 0 140 140" aria-hidden="true"><circle cx="70" cy="70" r="70" fill="${fondo}"/><circle cx="70" cy="56" r="26" fill="${fig}"/><path d="M26 122 Q30 86 70 86 Q110 86 114 122 Q94 138 70 138 Q46 138 26 122 Z" fill="${fig}"/></svg>`;
// auto genérico visto de costado (viewBox 160 x 96)
const AUTO = (w = 140, c = NAVY, vid = CR) =>
  `<svg width="${w}" height="${r2((w * 96) / 160)}" viewBox="0 0 160 96" aria-hidden="true"><path d="M10 64 Q10 46 28 44 L46 22 Q52 14 64 14 H104 Q114 14 120 22 L136 44 Q152 46 152 62 V72 H10 Z" fill="${c}"/><path d="M54 26 Q58 22 64 22 H84 V44 H40 Z M92 22 H102 Q108 22 112 28 L124 44 H92 Z" fill="${vid}"/><circle cx="44" cy="74" r="16" fill="${NAVY3}"/><circle cx="44" cy="74" r="7" fill="${CR}"/><circle cx="120" cy="74" r="16" fill="${NAVY3}"/><circle cx="120" cy="74" r="7" fill="${CR}"/></svg>`;
// torta genérica (viewBox 220 x 220): dos pisos, chorreado verde, cereza
const TORTA = (s = 210) => `
<svg width="${s}" height="${s}" viewBox="0 0 220 220" aria-hidden="true">
  <ellipse cx="110" cy="196" rx="100" ry="16" fill="${NAVY3}"/>
  <rect x="26" y="112" width="168" height="82" rx="18" fill="#ffffff"/>
  <rect x="26" y="150" width="168" height="44" rx="14" fill="${CR}"/>
  <path d="M26 128 Q26 112 44 112 H176 Q194 112 194 128 V136 Q180 150 168 136 Q154 152 140 136 Q124 152 110 136 Q96 152 80 136 Q66 152 52 136 Q38 150 26 136 Z" fill="${G}"/>
  <rect x="58" y="56" width="104" height="60" rx="16" fill="#ffffff"/>
  <path d="M58 70 Q58 56 72 56 H148 Q162 56 162 70 V76 Q152 88 142 76 Q130 88 118 76 Q106 88 94 76 Q82 88 70 76 Q62 86 58 78 Z" fill="${GD}"/>
  <path d="M110 40 Q112 26 124 20" fill="none" stroke="${NAVY}" stroke-width="6" stroke-linecap="round"/>
  <circle cx="108" cy="44" r="14" fill="${RED}"/>
</svg>`;
const DEDO = `<svg width="150" height="190" viewBox="0 0 150 190" aria-hidden="true"><path d="M52 92 V22 Q52 6 68 6 Q84 6 84 22 V78 L118 84 Q140 88 138 112 L130 160 Q126 184 102 184 H70 Q54 184 44 170 L12 124 Q4 110 16 102 Q28 96 38 106 L52 120 Z" fill="${CR}" stroke="${NAVY}" stroke-width="7" stroke-linejoin="round"/></svg>`;
const BURBUJA = (s = 54, c = NAVY) => `<svg width="${s}" height="${s}" viewBox="0 0 54 54" aria-hidden="true"><path d="M27 4 Q50 4 50 25 Q50 46 27 46 Q20 46 14 44 L4 50 L8 39 Q4 33 4 25 Q4 4 27 4 Z" fill="${c}"/></svg>`;

// ---------- el celular + la etiqueta ----------
// .tel: left 40, top 590, 720 x 1130 (canto crema 10) · .pan: global left 66, top 616, 668 x 1078
// .tag: global left 742, top 700 (cada escena la ubica con y), 310 x 200, rotada 8°
const TAG = `
      <div class="tag"><div class="tag-in">
        <svg class="tag-svg" width="370" height="220" viewBox="-60 0 370 220" aria-hidden="true">
          <path d="M-60 40 Q-10 60 40 100" fill="none" stroke="${CR}" stroke-width="7" stroke-linecap="round"/>
          <path d="M60 8 H292 Q304 8 304 20 V180 Q304 192 292 192 H60 L8 100 Z" fill="#03060c" transform="translate(10 14)"/>
          <path class="tf tf-cr" d="M60 8 H292 Q304 8 304 20 V180 Q304 192 292 192 H60 L8 100 Z" fill="${CR}" stroke="${NAVY}" stroke-width="6"/>
          <path class="tf tf-gr" d="M60 8 H292 Q304 8 304 20 V180 Q304 192 292 192 H60 L8 100 Z" fill="${GRIS}" stroke="${NAVY}" stroke-width="6" opacity="0"/>
          <path class="tf tf-g" d="M60 8 H292 Q304 8 304 20 V180 Q304 192 292 192 H60 L8 100 Z" fill="${G}" stroke="${NAVY}" stroke-width="6" opacity="0"/>
          <path d="M60 8 H292 Q304 8 304 20 V40 H44 Z" fill="rgba(255,255,255,0.35)"/>
          <circle cx="50" cy="100" r="16" fill="${NAVY}"/>
          <path d="M-60 40 Q-10 60 46 98" fill="none" stroke="${CR}" stroke-width="7" stroke-linecap="round"/>
        </svg>
        <div class="tt tt-q">?</div>
        <div class="tt tt-p">$ 420</div>
        <div class="tt tt-c">consultar</div>
        <div class="tt tt-n">$&nbsp;<b class="tt-v">1.450</b></div>
        <div class="tt-ok">${tick(32)}</div>
      </div></div>`;
const TEL = (pantallas, extra = TAG) => `
      <div class="telw"><div class="tel-sh"></div><div class="tel"><div class="pan">${pantallas}<div class="notch"></div></div></div>${extra}</div>`;
const barra = (c = NAVY) => `<div class="hora" style="color:${c}">10:15</div>`;

// pantalla de la app de viaje (s01, s03, s04)
const APP = `
        <div class="scr app">
          <svg class="mapa" width="648" height="640" viewBox="0 0 648 640" aria-hidden="true">
            <rect width="648" height="640" fill="${MAPA}"/>
            <path d="M-20 420 L680 300 M-20 180 L680 120 M180 -20 L250 680 M470 -20 L430 680 M-20 600 L680 520" stroke="#ffffff" stroke-width="34" fill="none"/>
            <rect x="290" y="330" width="120" height="90" rx="14" fill="#c9e7b2"/>
            <rect x="40" y="230" width="150" height="110" rx="14" fill="#cfccbd"/>
            <path class="ruta" d="M150 520 L232 506 L214 340 L452 300 L466 150" fill="none" stroke="${NAVY}" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/>
            <path class="ruta-v" d="M150 520 L232 506 L214 340 L452 300 L466 150" fill="none" stroke="${G}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="150" cy="520" r="24" fill="${NAVY}"/><circle cx="150" cy="520" r="10" fill="${CR}"/>
            <g transform="translate(466 150)"><path d="M0 0 Q-40 -50 -40 -78 Q-40 -116 0 -116 Q40 -116 40 -78 Q40 -50 0 0 Z" fill="${G}" stroke="${NAVY}" stroke-width="7"/><circle cx="0" cy="-78" r="14" fill="${NAVY}"/></g>
          </svg>
          <div class="auto-m">${AUTO(120)}</div>
          ${barra()}
          <div class="hoja">
            <div class="dest"><i></i>Hasta: Centro</div>
            <div class="opc"><div class="opc-ic">${AUTO(124)}</div><div class="opc-n">Auto</div><div class="opc-s">4 MIN</div><div class="precio">$ 420</div></div>
            <div class="btn"><span class="b1">Confirmar viaje</span><span class="b2">Viaje confirmado ${tick(24, NAVY, G)}</span></div>
          </div>
        </div>`;

// pantalla del taxímetro (s02)
const TAXI = `
        <div class="scr taxi">${barra(CR)}
          <div class="tx-t">TAXÍMETRO</div>
          <div class="tx-pan"><div class="tx-l">IMPORTE</div><div class="tx-num">$ <b class="tx-v">64</b></div></div>
          <div class="tx-row" style="top:590px"><span>FICHAS</span><b class="tx-f">0047</b></div>
          <div class="tx-row" style="top:700px"><span>TIEMPO</span><b class="tx-h">00:12</b></div>
          <div class="tx-oc">OCUPADO</div>
        </div>`;

// la web de la pastelería (s05-s07)
const CARD = (k, top, porc, precio) => `
          <div class="card c${k}" style="top:${top}px">
            <div class="cd-img">${TORTA(200)}</div>
            <div class="cd-n">Torta</div><div class="cd-s">${porc} porciones</div>
            <div class="cd-p"><span class="pc pc${k}">Consultar</span><span class="pv pv${k}">${precio}</span></div>
          </div>`;
const URL_ = (txt = "tunegocio.com.uy") => `<div class="url"><i></i><span>${txt}</span></div>`;
const WEB = `
        <div class="scr web">${barra()}
          ${URL_()}
          <div class="w-t">Pastelería</div><div class="w-s">TORTAS POR ENCARGO</div>
          ${CARD(1, 340, 20, "$ 1.450")}${CARD(2, 700, 30, "$ 1.990")}
        </div>`;
// el cotizador (hoja que sube sobre la web, s07-s08)
const COTIZ = `
        <div class="cz">
          <div class="cz-t">Armá tu torta</div>
          <div class="cz-l" style="top:124px">Porciones</div><div class="cz-n">20</div>
          <div class="cz-tr"></div><div class="cz-f"></div><div class="cz-k"></div>
          <div class="cz-l" style="top:270px">Relleno</div>
          <div class="chip on" style="left:36px">Dulce de leche</div><div class="chip" style="left:404px">Frutilla</div>
          <div class="cz-tot"><span>Total</span><b>$ <i class="cz-v">1.450</i></b></div>
          <div class="cz-ok">${tick(26)}</div>
          <div class="cz-btn">${BURBUJA(54)}<span>Pedir por WhatsApp</span></div>
        </div>`;

// ---------- CSS común ----------
const CSS = (P) => `
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 600; font-display: block; src: url("assets/fonts/IBMPlexMono-600.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    ${P} * { box-sizing: border-box; }
    ${P} .esc { position: absolute; inset: 0; }
    ${P} svg.full { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }
    ${P} .telw { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; }
    ${P} .tel-sh { position: absolute; left: 62px; top: 614px; width: 720px; height: 1130px; border-radius: 100px; background: #03060c; }
    ${P} .tel { position: absolute; left: 40px; top: 590px; width: 720px; height: 1130px; border-radius: 100px; background: ${NAVY3}; border: 10px solid ${CR}; }
    ${P} .pan { position: absolute; left: 16px; top: 16px; width: 668px; height: 1078px; border-radius: 76px; background: ${CR}; overflow: hidden; }
    ${P} .notch { position: absolute; left: 264px; top: 22px; width: 140px; height: 38px; border-radius: 19px; background: ${NAVY}; }
    ${P} .scr { position: absolute; left: 0; top: 0; width: 668px; height: 1078px; }
    ${P} .hora { position: absolute; left: 70px; top: 24px; font: 600 30px/1 "Lexend", sans-serif; }
    /* etiqueta */
    ${P} .tag { position: absolute; left: 716px; top: 700px; width: 310px; height: 200px; }
    ${P} .tag-in { position: absolute; left: 0; top: 0; width: 310px; height: 200px; transform: rotate(8deg); transform-origin: 50px 100px; }
    ${P} .tag-svg { position: absolute; left: -60px; top: 0; overflow: visible; }
    ${P} .tt { position: absolute; left: 70px; top: 0; width: 230px; height: 200px; display: flex; align-items: center; justify-content: center; font: 800 76px/1 "Lexend", sans-serif; color: ${NAVY}; letter-spacing: -0.03em; white-space: nowrap; opacity: 0; }
    ${P} .tt-q { font-size: 140px; }
    ${P} .tt-c { font-size: 40px; letter-spacing: -0.01em; color: ${NAVY}; }
    ${P} .tt-n { font-size: 60px; } ${P} .tt-n b { font-weight: 800; }
    ${P} .tt-ok { position: absolute; left: 262px; top: -28px; opacity: 0; }
    /* app */
    ${P} .app { background: ${MAPA}; }
    ${P} .mapa { position: absolute; left: 0; top: 0; }
    ${P} .auto-m { position: absolute; left: 92px; top: 420px; }
    ${P} .hoja { position: absolute; left: 0; top: 560px; width: 668px; height: 540px; border-radius: 48px 48px 0 0; background: #ffffff; border-top: 7px solid ${NAVY}; }
    ${P} .dest { position: absolute; left: 44px; top: 34px; font: 700 40px/1 "Lexend", sans-serif; color: ${NAVY}; }
    ${P} .dest i { display: inline-block; width: 26px; height: 26px; border-radius: 13px; background: ${G}; border: 6px solid ${NAVY}; margin-right: 16px; vertical-align: -2px; }
    ${P} .opc { position: absolute; left: 30px; top: 108px; width: 608px; height: 190px; border-radius: 38px; background: ${CR}; border: 7px solid ${NAVY}; }
    ${P} .opc-ic { position: absolute; left: 22px; top: 50px; }
    ${P} .opc-n { position: absolute; left: 168px; top: 40px; font: 800 50px/1 "Lexend", sans-serif; color: ${NAVY}; }
    ${P} .opc-s { position: absolute; left: 170px; top: 108px; font: 500 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.06em; color: rgba(11,18,32,0.65); }
    ${P} .precio { position: absolute; right: 30px; top: 52px; font: 800 72px/1 "Lexend", sans-serif; color: ${NAVY}; letter-spacing: -0.03em; }
    ${P} .btn { position: absolute; left: 30px; top: 330px; width: 608px; height: 116px; border-radius: 58px; background: ${G}; border: 7px solid ${NAVY}; font: 800 46px/102px "Lexend", sans-serif; color: ${NAVY}; text-align: center; }
    ${P} .btn span { position: absolute; left: 0; right: 0; top: 0; }
    ${P} .btn .b2 { opacity: 0; color: ${G}; } ${P} .btn .b2 svg { vertical-align: -6px; margin-left: 8px; }
    /* taxi */
    ${P} .taxi { background: #101a2c; }
    ${P} .tx-t { position: absolute; left: 0; right: 0; top: 120px; text-align: center; font: 500 34px/1 "IBM Plex Mono", monospace; letter-spacing: 0.24em; color: rgba(239,238,229,0.7); }
    ${P} .tx-pan { position: absolute; left: 36px; top: 190px; width: 596px; height: 340px; border-radius: 38px; background: #03060c; border: 8px solid ${NAVY3}; }
    ${P} .tx-l { position: absolute; left: 40px; top: 34px; font: 500 30px/1 "IBM Plex Mono", monospace; letter-spacing: 0.16em; color: ${RED}; }
    ${P} .tx-num { position: absolute; right: 40px; top: 110px; font: 600 160px/1 "IBM Plex Mono", monospace; color: ${RED}; letter-spacing: -0.04em; }
    ${P} .tx-num b { font-weight: 600; }
    ${P} .tx-row { position: absolute; left: 48px; width: 572px; height: 90px; display: flex; justify-content: space-between; align-items: center; border-top: 5px solid rgba(239,238,229,0.18); }
    ${P} .tx-row span { font: 500 34px/1 "IBM Plex Mono", monospace; letter-spacing: 0.14em; color: rgba(239,238,229,0.6); }
    ${P} .tx-row b { font: 600 62px/1 "IBM Plex Mono", monospace; color: ${CR}; }
    ${P} .tx-oc { position: absolute; left: 36px; top: 850px; width: 596px; height: 150px; border-radius: 38px; background: ${RED}; border: 7px solid #03060c; font: 800 64px/136px "Lexend", sans-serif; color: #fff; text-align: center; letter-spacing: 0.04em; }
    /* web */
    ${P} .web { background: ${CR}; }
    ${P} .url { position: absolute; left: 30px; top: 78px; width: 608px; height: 84px; border-radius: 42px; background: #ffffff; border: 6px solid ${NAVY}; font: 500 32px/72px "IBM Plex Mono", monospace; color: ${NAVY}; padding-left: 82px; }
    ${P} .url i { position: absolute; left: 30px; top: 20px; width: 30px; height: 32px; border-radius: 8px; background: ${G}; border: 5px solid ${NAVY}; }
    ${P} .w-t { position: absolute; left: 40px; top: 198px; font: 800 66px/1 "Lexend", sans-serif; color: ${NAVY}; letter-spacing: -0.03em; }
    ${P} .w-s { position: absolute; left: 42px; top: 276px; font: 500 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.12em; color: rgba(11,18,32,0.6); }
    ${P} .card { position: absolute; left: 30px; width: 608px; height: 330px; border-radius: 42px; background: #ffffff; border: 7px solid ${NAVY}; }
    ${P} .cd-img { position: absolute; left: 20px; top: 54px; }
    ${P} .cd-n { position: absolute; left: 260px; top: 46px; font: 800 54px/1 "Lexend", sans-serif; color: ${NAVY}; }
    ${P} .cd-s { position: absolute; left: 262px; top: 112px; font: 600 34px/1 "Lexend", sans-serif; color: rgba(11,18,32,0.7); }
    ${P} .cd-p { position: absolute; left: 250px; top: 190px; width: 330px; height: 96px; }
    ${P} .pc, ${P} .pv { position: absolute; left: 0; top: 0; height: 96px; padding: 0 28px; border-radius: 48px; font: 800 48px/84px "Lexend", sans-serif; white-space: nowrap; opacity: 0; }
    ${P} .pc { background: #e3e2d8; border: 6px solid ${GRIS}; color: #7b8290; }
    ${P} .pv { background: ${G}; border: 6px solid ${NAVY}; color: ${NAVY}; }
    /* cotizador */
    ${P} .cz { position: absolute; left: 0; top: 322px; width: 668px; height: 800px; border-radius: 48px 48px 0 0; background: #ffffff; border-top: 7px solid ${NAVY}; box-shadow: 0 -16px 0 rgba(11,18,32,0.18); }
    ${P} .cz-t { position: absolute; left: 40px; top: 40px; font: 800 58px/1 "Lexend", sans-serif; color: ${NAVY}; letter-spacing: -0.03em; }
    ${P} .cz-l { position: absolute; left: 42px; font: 700 40px/1 "Lexend", sans-serif; color: rgba(11,18,32,0.75); }
    ${P} .cz-n { position: absolute; right: 40px; top: 112px; font: 800 60px/1 "Lexend", sans-serif; color: ${NAVY}; }
    ${P} .cz-tr { position: absolute; left: 42px; top: 200px; width: 584px; height: 22px; border-radius: 11px; background: ${MAPA}; }
    ${P} .cz-f { position: absolute; left: 42px; top: 200px; width: 584px; height: 22px; border-radius: 11px; background: ${G}; border: 4px solid ${NAVY}; transform-origin: 0 50%; transform: scaleX(0.35); }
    ${P} .cz-k { position: absolute; left: 216px; top: 176px; width: 70px; height: 70px; border-radius: 35px; background: ${G}; border: 7px solid ${NAVY}; }
    ${P} .chip { position: absolute; top: 330px; height: 90px; padding: 0 30px; border-radius: 45px; font: 700 38px/76px "Lexend", sans-serif; color: rgba(11,18,32,0.55); border: 7px solid ${GRIS}; background: #ffffff; white-space: nowrap; }
    ${P} .chip.on { background: ${G}; border-color: ${NAVY}; color: ${NAVY}; }
    ${P} .cz-tot { position: absolute; left: 30px; top: 470px; width: 608px; height: 120px; border-radius: 34px; background: ${CR}; border: 7px solid ${NAVY}; display: flex; justify-content: space-between; align-items: center; padding: 0 34px; }
    ${P} .cz-tot span { font: 700 44px/1 "Lexend", sans-serif; color: ${NAVY}; }
    ${P} .cz-tot b { font: 800 70px/1 "Lexend", sans-serif; color: ${NAVY}; letter-spacing: -0.03em; }
    ${P} .cz-tot i { font-style: normal; }
    ${P} .cz-ok { position: absolute; left: 590px; top: 444px; opacity: 0; }
    ${P} .cz-btn { position: absolute; left: 30px; top: 624px; width: 608px; height: 116px; border-radius: 58px; background: ${G}; border: 7px solid ${NAVY}; font: 800 42px/102px "Lexend", sans-serif; color: ${NAVY}; text-align: center; }
    ${P} .cz-btn svg { vertical-align: -12px; margin-right: 16px; }
    /* notas */
    ${P} .pill { position: absolute; padding: 16px 34px 17px; border: 6px solid ${CR}; border-radius: 999px; background: ${NAVY}; font: 700 44px/1 "Lexend", sans-serif; color: ${CR}; white-space: nowrap; opacity: 0; box-shadow: 0 10px 0 rgba(3,6,12,0.5); }
    ${P} .pill.g { border-color: ${G}; color: ${G}; }
    ${P} .pill.lleno { background: ${G}; border-color: ${NAVY}; color: ${NAVY}; font-weight: 800; }
    ${P} .pill.rl { background: ${RED}; border-color: ${NAVY}; color: #fff; font-weight: 800; }
    ${P} .pill.cr { background: ${CR}; border-color: ${NAVY}; color: ${NAVY}; font-weight: 800; }
    ${P} .pill svg { vertical-align: -6px; margin-left: 10px; }
    ${P} .lead { fill: none; stroke: ${CR}; stroke-width: 7; stroke-linecap: round; }
    ${P} .lead.g { stroke: ${G}; } ${P} .lead.r { stroke: ${RED}; }
    ${P} .dot { fill: ${CR}; opacity: 0; } ${P} .dot.g { fill: ${G}; } ${P} .dot.r { fill: ${RED}; }
    ${P} .selbox { position: absolute; border: 7px solid ${G}; background: rgba(92,230,17,0.14); opacity: 0; }
    ${P} .selbox.r { border-color: ${RED}; background: rgba(199,101,91,0.16); }
    ${P} .selbox i { position: absolute; width: 22px; height: 22px; background: #fff; border: 5px solid ${G}; }
    ${P} .selbox.r i { border-color: ${RED}; }
    ${P} .selbox .k1 { left: -14px; top: -14px; } ${P} .selbox .k2 { right: -14px; top: -14px; } ${P} .selbox .k3 { left: -14px; bottom: -14px; } ${P} .selbox .k4 { right: -14px; bottom: -14px; }
    ${P} .dedo { position: absolute; opacity: 0; }
`;

// ---------- JS común ----------
const HELP = `
      const q = (s) => root.querySelector(s);
      const qa = (s) => Array.from(root.querySelectorAll(s));
      const tl = gsap.timeline({ paused: true });
      if (qa(".pill").length) gsap.set(qa(".pill"), { xPercent: -50, yPercent: -50 });
      const pop = (s, t, d, desde) => tl.fromTo(typeof s === "string" ? qa(s) : s, { opacity: 0, scale: desde ?? 0.75, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: d ?? 0.34, ease: "back.out(1.8)" }, t);
      const fuera = (s, t, d) => tl.to(typeof s === "string" ? qa(s) : s, { opacity: 0, scale: 0.92, duration: d ?? 0.22, ease: "power2.in" }, t);
      const dibujar = (s, t, dur) => qa(s).forEach((el) => {
        const L = el.getTotalLength();
        gsap.set(el, { strokeDasharray: L, strokeDashoffset: L, opacity: 0 });
        tl.set(el, { opacity: 1 }, t);
        tl.to(el, { strokeDashoffset: 0, duration: dur ?? 0.36, ease: "power2.inOut" }, t);
      });
      const nota = (k, t) => { if (q(".l" + k)) { dibujar(".l" + k, t, 0.3); pop(".d" + k, t, 0.2); } pop(".n" + k, t + (q(".l" + k) ? 0.18 : 0)); };
      const caja = (s, t) => tl.fromTo(q(s), { opacity: 0, scaleX: 1.08, scaleY: 1.3, transformOrigin: "50% 50%" }, { opacity: 1, scaleX: 1, scaleY: 1, duration: 0.26, ease: "power3.out" }, t);
      const TEL = q(".telw");
      const TAG = q(".tag");
      const vibrar = (t, n) => tl.fromTo(TEL, { x: 0 }, { x: 10, duration: 0.05, ease: "none", yoyo: true, repeat: n ?? 5, immediateRender: false }, t);
      const latido = (s, t, k) => tl.fromTo(typeof s === "string" ? qa(s) : s, { scale: 1 }, { scale: k ?? 1.08, transformOrigin: "50% 50%", duration: 0.16, yoyo: true, repeat: 1, ease: "sine.inOut", immediateRender: false }, t);
      const contar = (s, a, b, t, d, fmt) => { const el = q(s); const o = { v: a }; el.textContent = fmt(a); tl.to(o, { v: b, duration: d, ease: "power1.inOut", onUpdate: () => { el.textContent = fmt(Math.round(o.v)); } }, t); };
      const miles = (n) => String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, ".");
      // la etiqueta: estado inicial (fondo y texto), cambio con giro y balanceo
      const FONDOS = { cr: ".tf-cr", gr: ".tf-gr", g: ".tf-g" };
      const tagEstado = (fondo, texto) => {
        for (const [k, s] of Object.entries(FONDOS)) gsap.set(q(s), { opacity: k === fondo ? 1 : 0 });
        gsap.set(qa(".tt"), { opacity: 0 });
        if (texto) gsap.set(q(texto), { opacity: 1 });
      };
      const tagCambio = (fondo, texto, t) => {
        const tin = q(".tag-in");
        tl.to(tin, { scaleX: 0.06, duration: 0.13, ease: "power2.in", transformOrigin: "155px 100px" }, t);
        for (const [k, s] of Object.entries(FONDOS)) tl.set(q(s), { opacity: k === fondo ? 1 : 0 }, t + 0.13);
        tl.set(qa(".tt"), { opacity: 0 }, t + 0.13);
        if (texto) tl.set(q(texto), { opacity: 1 }, t + 0.13);
        tl.to(tin, { scaleX: 1, duration: 0.2, ease: "back.out(2)" }, t + 0.13);
        balanceo(t + 0.15);
      };
      const balanceo = (t, k) => tl.fromTo(q(".tag-in"), { rotation: 8 }, { keyframes: [{ rotation: 8 + (k ?? 9), duration: 0.18 }, { rotation: 8 - (k ?? 9) * 0.6, duration: 0.22 }, { rotation: 8, duration: 0.24 }], ease: "sine.inOut", immediateRender: false }, t);
      const salida = (t) => tl.to(q(".esc"), { opacity: 0, filter: "blur(8px)", scale: 1.04, duration: DUR - t, ease: "power2.in" }, t);
`;

function escena(id, build) {
  const dur = ESC[id];
  const T = (i) => r2(pal[i].start - INI[id]); // segundo de la palabra i, relativo a la escena
  const { css = "", html, js, sfx } = build(T);
  const P = `[data-composition-id="${id}"]`;
  const out = `<template>
  <script src="assets/vendor/gsap.min.js"></script>
  <style>${CSS(P)}${css.replaceAll("P ", P + " ")}
  </style>
  <div id="root" data-composition-id="${id}" data-width="1080" data-height="1920" data-duration="${dur}">
    <div id="${id}-esc" class="esc clip" data-start="0" data-duration="${dur}" data-track-index="0">
${html}
    </div>
  </div>
  <script>
    (function () {
      const ID = "${id}";
      const DUR = ${dur};
      const root = document.querySelector('[data-composition-id="' + ID + '"]');
${HELP}
${js}
      window.__timelines = window.__timelines || {};
      window.__timelines[ID] = tl;
    })();
  </script>
</template>
`;
  fs.writeFileSync(`compositions/${id}.html`, out);
  fs.writeFileSync(`compositions/${id}.sfx.json`, JSON.stringify(sfx.map((s) => ({ ...s, t: r2(Math.max(0, s.t)) }))));
}

// posiciones de la etiqueta (y sobre top 700)
const TAG_APP = 560; // al lado de la tarjeta del viaje (global ~1260)
const TAG_TAXI = 0; // al lado del importe del taxímetro
const TAG_WEB = 400; // al lado del precio de la primera torta (global ~1100)
const TAG_TOT = 650; // al lado del total del cotizador (global ~1350)

// ================= s01 · gancho =================
escena("s01-gancho", (T) => ({
  css: `
    P .tit { position: absolute; left: 0; right: 0; top: 92px; text-align: center; font: 800 100px/1.0 "Lexend", sans-serif; color: #fff; letter-spacing: -0.04em; }
    P .tit .v { color: ${G}; }`,
  html: `${TEL(APP)}
      <div class="tit"><div>¿Por qué Uber</div><div>te dice <span class="v">cuánto</span></div><div><span class="v">vas a pagar</span></div><div>antes de pedir</div><div>el auto?</div></div>`,
  js: `
      tagEstado("g", ".tt-p");
      gsap.set(TAG, { y: ${TAG_APP} });
      // el celular arranca al 74 % debajo del título y al final entra a tamaño completo
      gsap.set(TEL, { scale: 0.8, y: 60, transformOrigin: "400px 590px" });
      tl.fromTo(q(".tit"), { scale: 1.05, transformOrigin: "50% 0%" }, { scale: 1, duration: 0.6, ease: "power3.out" }, 0);
      tl.fromTo(TEL, { rotation: -3 }, { rotation: 0, duration: 0.8, ease: "back.out(1.6)" }, 0);
      tl.fromTo(q(".auto-m"), { x: -20 }, { x: 40, duration: 2.6, ease: "sine.inOut" }, 0);
      // "cuánto": la etiqueta se balancea y late
      balanceo(${T(5)}, 12);
      latido(".tag", ${T(5)}, 1.08);
      latido(".precio", ${T(8)}, 1.12);
      // "pedir": late el botón
      latido(".btn", ${T(11)}, 1.06);
      // sale el título y push-in
      tl.to(q(".tit"), { opacity: 0, y: -80, duration: 0.3, ease: "power2.in" }, ${r2(ESC["s01-gancho"] - 0.5)});
      tl.to(TEL, { scale: 1, y: 0, duration: 0.45, ease: "power3.inOut" }, ${r2(ESC["s01-gancho"] - 0.45)});`,
  sfx: [{ t: 0.05, sfx: "whoosh-short", vol: 0.2 }, { t: T(5), sfx: "pop", vol: 0.26 }, { t: T(11), sfx: "click-soft", vol: 0.26 }],
}));

// ================= s02 · el taxímetro =================
escena("s02-taximetro", (T) => ({
  html: `${TEL(APP + TAXI)}
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">${lead(1, 850, 1170, 660, 1060, "r")}</svg>
      ${pill(1, 880, 1220, "¿Cuánto va?", "rl")}`,
  js: `
      tagEstado("g", ".tt-p");
      gsap.set(TAG, { y: ${TAG_APP} });
      // "En el taxi": la pantalla del taxímetro entra desde la izquierda
      tl.fromTo(q(".taxi"), { xPercent: -100 }, { xPercent: 0, duration: 0.32, ease: "power3.out" }, 0);
      tl.set(q(".app"), { opacity: 0 }, 0.34);
      tl.to(TAG, { y: ${TAG_TAXI}, duration: 0.45, ease: "power3.inOut" }, 0.05);
      // "taxímetro": la etiqueta pierde el precio
      tagCambio("cr", ".tt-q", ${T(18) - 0.05});
      // "corría": el importe, las fichas y el tiempo corren
      contar(".tx-v", 64, 318, ${T(19) - 0.4}, ${r2(ESC["s02-taximetro"] - T(19) + 0.3)}, (n) => n);
      contar(".tx-f", 47, 163, ${T(19) - 0.4}, ${r2(ESC["s02-taximetro"] - T(19) + 0.3)}, (n) => String(n).padStart(4, "0"));
      contar(".tx-h", 12, 58, ${T(19) - 0.4}, ${r2(ESC["s02-taximetro"] - T(19) + 0.3)}, (n) => "00:" + String(n).padStart(2, "0"));
      // "mirabas el número": push-in al importe y la nota
      tl.to(TEL, { scale: 1.06, transformOrigin: "400px 900px", duration: 1.1, ease: "power2.inOut" }, ${T(22) - 0.3});
      nota(1, ${T(24) - 0.2});
      latido(".tx-num", ${T(24)}, 1.06);
      balanceo(${T(24)}, 7);`,
  sfx: [{ t: 0, sfx: "whoosh-short", vol: 0.18 }, { t: T(18) - 0.05, sfx: "click", vol: 0.24 }, { t: T(19) - 0.3, sfx: "typing", vol: 0.2, max: 1.6 }, { t: T(24) - 0.1, sfx: "glitch-1", vol: 0.14, max: 0.4 }],
}));

// ================= s03 · el precio antes =================
escena("s03-precio", (T) => ({
  html: `${TEL(APP)}
      ${selbox("sb", 470, 1320, 290, 120)}
      ${pill(1, 560, 1000, `Antes de confirmar ${tick(22)}`, "lleno")}`,
  js: `
      tagEstado("cr", ".tt-q");
      gsap.set(TAG, { y: ${TAG_TAXI} });
      tl.fromTo(q(".app"), { xPercent: 100 }, { xPercent: 0, duration: 0.32, ease: "power3.out" }, 0);
      tl.to(TAG, { y: ${TAG_APP}, duration: 0.5, ease: "power3.inOut" }, 0.1);
      // "precio": recuadro sobre el precio · "antes": la etiqueta se da vuelta y queda verde
      caja(".sb", ${T(29) - 0.05});
      latido(".precio", ${T(29)}, 1.1);
      tagCambio("g", ".tt-p", ${T(30)});
      nota(1, ${T(30) + 0.15});
      // "Sin sorpresas": tilde en la etiqueta
      pop(".tt-ok", ${T(31)}, 0.36, 0.3);
      balanceo(${T(32)}, 6);
      tl.fromTo(TEL, { scale: 1 }, { scale: 1.05, transformOrigin: "400px 1400px", duration: ${ESC["s03-precio"]}, ease: "sine.inOut" }, 0);
      fuera(".sb", ${r2(ESC["s03-precio"] - 0.25)}, 0.2);`,
  sfx: [{ t: 0, sfx: "whoosh-short", vol: 0.18 }, { t: T(29), sfx: "click-soft", vol: 0.26 }, { t: T(30), sfx: "pop", vol: 0.26 }, { t: T(31), sfx: "chime", vol: 0.26 }],
}));

// ================= s04 · decidís =================
escena("s04-decidis", (T) => ({
  css: `
    P .glob { position: absolute; left: 150px; top: 760px; width: 560px; height: 170px; border-radius: 50px 50px 50px 12px; background: #ffffff; border: 7px solid ${GRIS}; font: 800 66px/156px "Lexend", sans-serif; color: #7b8290; text-align: center; opacity: 0; box-shadow: 0 12px 0 rgba(3,6,12,0.4); }
    P .glob svg { position: absolute; left: 30px; top: 70px; }
    P .tacha { stroke: ${RED}; stroke-width: 12; stroke-linecap: round; fill: none; }`,
  html: `${TEL(APP)}
      <div class="glob">¿Cuánto sale?</div>
      <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true"><path class="tacha" d="M180 850 L690 836"/></svg>
      <div class="dedo" style="left:430px;top:1560px">${DEDO}</div>`,
  js: `
      tagEstado("g", ".tt-p");
      gsap.set(q(".tt-ok"), { opacity: 1 });
      gsap.set(TAG, { y: ${TAG_APP} });
      tl.fromTo(TEL, { scale: 1.05 }, { scale: 1, transformOrigin: "400px 1400px", duration: 0.5, ease: "power2.out" }, 0);
      // "sabés cuánto sale": la duda aparece
      pop(".glob", ${T(35) - 0.15}, 0.36, 0.6);
      // "no preguntás": se tacha y se va
      dibujar(".tacha", ${T(37)}, 0.3);
      tl.to(qa(".glob, .tacha"), { opacity: 0, y: -60, scale: 0.9, duration: 0.3, ease: "power2.in" }, ${T(38) + 0.3});
      // "decidís": el dedo toca el botón, el viaje se confirma y el auto arranca
      tl.fromTo(q(".dedo"), { opacity: 0, y: 140 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }, ${T(39) - 0.45});
      tl.to(q(".dedo"), { scale: 0.9, transformOrigin: "50% 0%", duration: 0.1, yoyo: true, repeat: 1 }, ${T(39) - 0.12});
      latido(".btn", ${T(39) - 0.1}, 0.94);
      tl.to(q(".btn"), { backgroundColor: "${NAVY}", duration: 0.15 }, ${T(39)});
      tl.set(q(".b1"), { opacity: 0 }, ${T(39)});
      tl.set(q(".b2"), { opacity: 1 }, ${T(39)});
      tl.to(q(".dedo"), { opacity: 0, y: 120, duration: 0.25, ease: "power2.in" }, ${T(39) + 0.4});
      tl.to(q(".auto-m"), { x: 120, y: -20, duration: 0.9, ease: "power2.inOut" }, ${T(39) + 0.1});
      balanceo(${T(39) + 0.1}, 8);`,
  sfx: [{ t: T(35) - 0.15, sfx: "pop", vol: 0.24 }, { t: T(37), sfx: "glitch-1", vol: 0.14, max: 0.35 }, { t: T(39) - 0.1, sfx: "click", vol: 0.3 }, { t: T(39) + 0.05, sfx: "chime", vol: 0.24 }],
}));

// ================= s05 · la misma pregunta, en tu negocio =================
escena("s05-pregunta", (T) => ({
  css: `
    P .preg { position: absolute; left: 470px; top: 462px; height: 150px; padding: 0 44px 0 24px; border-radius: 75px; background: ${CR}; border: 7px solid ${NAVY}; display: flex; align-items: center; gap: 22px; font: 800 62px/1 "Lexend", sans-serif; color: ${NAVY}; white-space: nowrap; opacity: 0; box-shadow: 0 12px 0 rgba(3,6,12,0.5); }`,
  html: `${TEL(APP + WEB)}
      <div class="preg">${avatar(104, NAVY3, CR)}<span>¿Cuánto sale?</span></div>`,
  js: `
      tagEstado("g", ".tt-p");
      gsap.set(q(".tt-ok"), { opacity: 1 });
      gsap.set(TAG, { y: ${TAG_APP} });
      gsap.set(qa(".pc"), { opacity: 0 });
      // "En tu negocio": la app se achica y la web sube (transformación de pantalla)
      tl.fromTo(q(".web"), { yPercent: 100 }, { yPercent: 0, duration: 0.42, ease: "power3.out" }, 0.02);
      tl.set(q(".app"), { opacity: 0 }, 0.46);
      tl.to(q(".tt-ok"), { opacity: 0, scale: 0.5, duration: 0.15 }, 0.05);
      tl.fromTo(qa(".card"), { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.36, stagger: 0.12, ease: "back.out(1.5)" }, 0.3);
      tl.fromTo(qa(".cd-img"), { rotation: -8, scale: 0.85, transformOrigin: "50% 80%" }, { rotation: 0, scale: 1, duration: 0.5, stagger: 0.12, ease: "back.out(2)" }, 0.35);
      tl.to(TAG, { y: ${TAG_WEB}, duration: 0.5, ease: "power3.inOut" }, 0.2);
      // "la pregunta": la etiqueta queda en blanco · "la misma": late
      tagCambio("cr", ".tt-q", ${T(44) - 0.1});
      balanceo(${T(47)}, 10);
      // "¿cuánto sale?": la pregunta del cliente
      tl.fromTo(q(".preg"), { opacity: 0, scale: 0.6, xPercent: -50, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, xPercent: -50, duration: 0.36, ease: "back.out(1.8)" }, ${T(48) - 0.1});
      latido(".preg", ${T(49)}, 1.06);
      tl.to(TEL, { scale: 1.04, transformOrigin: "400px 1000px", duration: 1.6, ease: "sine.inOut" }, 1.6);`,
  sfx: [{ t: 0.02, sfx: "whoosh", vol: 0.2, max: 0.6 }, { t: T(44) - 0.1, sfx: "click", vol: 0.22 }, { t: T(48) - 0.1, sfx: "pop", vol: 0.28 }],
}));

// ================= s06 · consultar =================
escena("s06-consultar", (T) => ({
  html: `${TEL(WEB)}
      ${selbox("r sb", 330, 1124, 400, 130)}
      ${selbox("r sb2", 330, 1484, 400, 130)}`,
  js: `
      tagEstado("cr", ".tt-q");
      gsap.set(TAG, { y: ${TAG_WEB} });
      gsap.set(TEL, { scale: 1.04, transformOrigin: "400px 1000px" });
      // "contestan:": aparecen los "Consultar" grises
      tl.fromTo(q(".pc1"), { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.26, ease: "power3.out" }, ${T(53) - 0.05});
      tl.fromTo(q(".pc2"), { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.26, ease: "power3.out" }, ${T(53) + 0.2});
      // "consultar": recuadros rojos y la etiqueta gris
      caja(".sb", ${T(54) - 0.1});
      caja(".sb2", ${T(54) + 0.05});
      tagCambio("gr", ".tt-c", ${T(54) - 0.05});
      tl.to(TEL, { scale: 1.06, transformOrigin: "400px 1150px", duration: 1.4, ease: "power2.inOut" }, ${T(54) - 0.3});
      tl.to(qa(".sb, .sb2"), { opacity: 0, duration: 0.18 }, ${r2(ESC["s06-consultar"] - 0.25)});`,
  sfx: [{ t: T(53) - 0.05, sfx: "key-press", vol: 0.24 }, { t: T(54) - 0.1, sfx: "glitch-1", vol: 0.16, max: 0.4 }],
}));

// ================= s07 · precios a la vista y cotizador =================
escena("s07-precios", (T) => ({
  html: `${TEL(WEB + COTIZ)}
      ${selbox("sb", 330, 1124, 400, 130)}`,
  js: `
      tagEstado("gr", ".tt-c");
      gsap.set(TAG, { y: ${TAG_WEB} });
      gsap.set(qa(".pc"), { opacity: 1 });
      gsap.set(TEL, { scale: 1.06, transformOrigin: "400px 1150px" });
      // "precios": los grises se dan vuelta y quedan los precios verdes
      tl.to(TEL, { scale: 1, duration: 0.5, ease: "power2.inOut" }, 0);
      for (const [k, t] of [[1, ${T(57) - 0.05}], [2, ${T(57) + 0.2}]]) {
        tl.to(q(".pc" + k), { opacity: 0, rotationX: 90, duration: 0.12, ease: "power2.in" }, t);
        tl.fromTo(q(".pv" + k), { opacity: 0, rotationX: -90 }, { opacity: 1, rotationX: 0, duration: 0.24, ease: "back.out(2)" }, t + 0.12);
      }
      caja(".sb", ${T(57) + 0.1});
      q(".tt-v").textContent = "1.450";
      tagCambio("g", ".tt-n", ${T(60) - 0.1});
      // "cotizador": sube la hoja "Armá tu torta"
      tl.to(q(".sb"), { opacity: 0, duration: 0.15 }, ${T(62) - 0.1});
      gsap.set(q(".cz"), { opacity: 0 });
      tl.set(q(".cz"), { opacity: 1 }, ${T(62)});
      tl.fromTo(q(".cz"), { yPercent: 105 }, { yPercent: 0, duration: 0.42, ease: "power3.out" }, ${T(62)});
      tl.set(qa(".card"), { opacity: 0 }, ${T(62) + 0.44});
      tl.to(TAG, { y: ${TAG_TOT}, duration: 0.5, ease: "power3.inOut" }, ${T(62) + 0.1});
      // "calcula": slider de 20 a 30 porciones y el total se recalcula
      const dc = ${r2(ESC["s07-precios"] - T(67) + 0.1)};
      tl.to(q(".cz-k"), { x: 196, duration: dc, ease: "power2.inOut" }, ${T(67) - 0.3});
      tl.to(q(".cz-f"), { scaleX: 0.69, duration: dc, ease: "power2.inOut" }, ${T(67) - 0.3});
      contar(".cz-n", 20, 30, ${T(67) - 0.3}, dc, (n) => n);
      contar(".cz-v", 1450, 1990, ${T(67) - 0.3}, dc, (n) => miles(Math.round(n / 10) * 10));
      contar(".tt-v", 1450, 1990, ${T(67) - 0.3}, dc, (n) => miles(Math.round(n / 10) * 10));
      balanceo(${T(67)}, 7);`,
  sfx: [{ t: T(57) - 0.05, sfx: "pop", vol: 0.24 }, { t: T(57) + 0.2, sfx: "pop", vol: 0.24 }, { t: T(60) - 0.1, sfx: "click-soft", vol: 0.24 }, { t: T(62), sfx: "whoosh-short", vol: 0.22 }, { t: T(67) - 0.3, sfx: "typing", vol: 0.18, max: 0.9 }],
}));

// ================= s08 · decide solo y te escribe =================
const CHAT = `
        <div class="scr chat">
          <div class="ch-h">${barra(CR)}<div class="ch-av">${avatar(96, G, NAVY)}</div><div class="ch-n">Pastelería</div><div class="ch-s">EN LÍNEA</div></div>
          <div class="ch-b">Hola, quiero la torta de 30 porciones con dulce de leche para el sábado.<div class="ch-t">10:16 ✓✓</div></div>
        </div>`;
escena("s08-escribe", (T) => ({
  css: `
    P .chat { background: ${CR}; opacity: 0; }
    P .ch-h { position: absolute; left: 0; top: 0; width: 668px; height: 230px; background: ${NAVY2}; }
    P .ch-av { position: absolute; left: 40px; top: 100px; }
    P .ch-n { position: absolute; left: 160px; top: 112px; font: 800 46px/1 "Lexend", sans-serif; color: ${CR}; }
    P .ch-s { position: absolute; left: 162px; top: 168px; font: 500 28px/1 "IBM Plex Mono", monospace; letter-spacing: 0.1em; color: ${G}; }
    P .ch-b { position: absolute; left: 90px; top: 300px; width: 540px; padding: 34px 36px 70px; border-radius: 44px 44px 12px 44px; background: ${G}; border: 7px solid ${NAVY}; font: 700 46px/1.25 "Lexend", sans-serif; color: ${NAVY}; opacity: 0; }
    P .ch-t { position: absolute; right: 30px; bottom: 20px; font: 500 28px/1 "IBM Plex Mono", monospace; color: rgba(11,18,32,0.7); }`,
  html: `${TEL(WEB + COTIZ + CHAT)}
      <div class="dedo" style="left:420px;top:1640px">${DEDO}</div>
      ${pill(1, 430, 1400, `Para comprar ${tick(22)}`, "lleno")}`,
  js: `
      tagEstado("g", ".tt-n");
      q(".tt-v").textContent = "1.990";
      gsap.set(TAG, { y: ${TAG_TOT} });
      gsap.set(qa(".card"), { opacity: 0 });
      gsap.set(q(".cz-k"), { x: 196 }); gsap.set(q(".cz-f"), { scaleX: 0.69 });
      q(".cz-n").textContent = "30"; q(".cz-v").textContent = "1.990";
      // "decide solo": tilde en el total
      pop(".cz-ok", ${T(70) - 0.1}, 0.34, 0.3);
      pop(".tt-ok", ${T(71) - 0.1}, 0.34, 0.3);
      latido(".cz-tot", ${T(70)}, 1.04);
      balanceo(${T(71)}, 6);
      // "escribe": el dedo toca "Pedir por WhatsApp" y se abre el chat
      tl.fromTo(q(".dedo"), { opacity: 0, y: 140 }, { opacity: 1, y: 0, duration: 0.26, ease: "power3.out" }, ${T(73) - 0.4});
      tl.to(q(".dedo"), { scale: 0.9, transformOrigin: "50% 0%", duration: 0.08, yoyo: true, repeat: 1 }, ${T(73) - 0.1});
      latido(".cz-btn", ${T(73) - 0.08}, 0.94);
      tl.to(q(".dedo"), { opacity: 0, y: 120, duration: 0.2, ease: "power2.in" }, ${T(74)});
      tl.to(q(".chat"), { opacity: 1, duration: 0.15 }, ${T(74) - 0.05});
      tl.set(qa(".web, .cz"), { opacity: 0 }, ${T(74) + 0.11});
      tl.fromTo(q(".ch-b"), { opacity: 0, y: 60, scale: 0.9, transformOrigin: "100% 100%" }, { opacity: 1, y: 0, scale: 1, duration: 0.34, ease: "back.out(1.7)" }, ${T(74) + 0.05});
      // "comprar"
      nota(1, ${T(76) - 0.1});
      tl.fromTo(TEL, { scale: 1 }, { scale: 1.04, transformOrigin: "400px 900px", duration: 1, ease: "sine.inOut" }, ${T(74)});`,
  sfx: [{ t: T(70) - 0.1, sfx: "pop", vol: 0.24 }, { t: T(73) - 0.1, sfx: "click", vol: 0.28 }, { t: T(74) + 0.05, sfx: "notification", vol: 0.3 }, { t: T(76) - 0.1, sfx: "pop", vol: 0.24 }],
}));

// ================= s09 · tu sitio =================
const SITIO = `
        <div class="scr sitio">${barra()}
          <div class="url si-u"><i></i><span class="si-ut">tunegocio.com.uy</span></div>
          <div class="si-h"><span>Tu negocio</span></div>
          <div class="si-c sc1"><div class="si-img">${TORTA(170)}</div><div class="si-p">$ 1.450</div></div>
          <div class="si-c sc2"><div class="si-img">${TORTA(170)}</div><div class="si-p">$ 1.990</div></div>
          <div class="si-btn">${BURBUJA(50)}<span>Escribinos</span></div>
        </div>`;
escena("s09-sitio", (T) => ({
  css: `
    P .sitio { background: ${CR}; }
    P .si-h { position: absolute; left: 30px; top: 196px; width: 608px; height: 230px; border-radius: 42px; background: ${NAVY2}; }
    P .si-h span { position: absolute; left: 40px; top: 78px; font: 800 72px/1 "Lexend", sans-serif; color: ${G}; letter-spacing: -0.03em; }
    P .si-c { position: absolute; top: 460px; width: 292px; height: 380px; border-radius: 40px; background: #ffffff; border: 7px solid ${NAVY}; }
    P .sc1 { left: 30px; } P .sc2 { left: 346px; }
    P .si-img { position: absolute; left: 54px; top: 30px; }
    P .si-p { position: absolute; left: 24px; top: 236px; width: 230px; height: 96px; border-radius: 48px; background: ${G}; border: 6px solid ${NAVY}; font: 800 46px/84px "Lexend", sans-serif; color: ${NAVY}; text-align: center; }
    P .si-btn { position: absolute; left: 30px; top: 880px; width: 608px; height: 116px; border-radius: 58px; background: ${G}; border: 7px solid ${NAVY}; font: 800 46px/102px "Lexend", sans-serif; color: ${NAVY}; text-align: center; }
    P .si-btn svg { vertical-align: -12px; margin-right: 16px; }`,
  html: `${TEL(CHAT_VACIO() + SITIO)}
      ${pill(1, 890, 1130, `Tu sitio ${tick(22)}`, "lleno")}`,
  js: `
      tagEstado("g", ".tt-n");
      q(".tt-v").textContent = "1.990";
      gsap.set(q(".tt-ok"), { opacity: 1 });
      gsap.set(TAG, { y: ${TAG_TOT} });
      // la etiqueta se va: el precio ahora vive en la web
      tl.to(TAG, { x: 340, rotation: 12, opacity: 0, duration: 0.4, ease: "power2.in" }, 0.05);
      // la pantalla se arma sola, pieza por pieza
      tl.fromTo(q(".sitio"), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0);
      pop(".si-u", 0.15, 0.3, 0.85);
      pop(".si-h", ${T(78) - 0.1}, 0.34, 0.8);
      pop(".sc1", ${T(80) - 0.15}, 0.34, 0.7);
      pop(".sc2", ${T(80) + 0.05}, 0.34, 0.7);
      pop(".si-btn", ${T(81) - 0.05}, 0.34, 0.8);
      // "tu sitio?"
      nota(1, ${T(82) - 0.05});
      latido(".si-p", ${T(82) + 0.1}, 1.08);
      tl.fromTo(TEL, { scale: 1.04, x: 0 }, { scale: 1, x: 40, transformOrigin: "400px 900px", duration: ${ESC["s09-sitio"]}, ease: "sine.inOut" }, 0);`,
  sfx: [{ t: 0.05, sfx: "whoosh-short", vol: 0.18 }, { t: T(78) - 0.1, sfx: "pop", vol: 0.22 }, { t: T(80) - 0.15, sfx: "pop", vol: 0.22 }, { t: T(81) - 0.05, sfx: "pop", vol: 0.22 }, { t: T(82) - 0.05, sfx: "sparkle", vol: 0.24, max: 0.8 }],
}));
function CHAT_VACIO() { return `<div class="scr" style="background:${CR}"></div>`; }

// ================= s10 · cta =================
escena("s10-cta", (T) => ({
  css: `
    P .sitio { background: ${CR}; }
    P .vc { background: ${NAVY}; }
    P .vc-a { position: absolute; left: 30px; top: 100px; width: 608px; height: 520px; border-radius: 44px; background: ${NAVY3}; overflow: hidden; }
    P .vc-a svg { position: absolute; left: 194px; top: 110px; }
    P .lbl { position: absolute; left: 24px; bottom: 24px; padding: 10px 18px; border-radius: 14px; background: rgba(11,18,32,0.8); font: 500 30px/1 "IBM Plex Mono", monospace; letter-spacing: 0.1em; color: ${CR}; }
    P .vc-b { position: absolute; left: 30px; top: 650px; width: 608px; height: 250px; border-radius: 44px; background: ${G}; }
    P .vc-b .nm { position: absolute; left: 0; right: 0; top: 70px; text-align: center; font: 800 64px/1 "Lexend", sans-serif; color: ${NAVY}; letter-spacing: -0.02em; }
    P .vc-btn { position: absolute; left: 274px; top: 930px; width: 120px; height: 120px; border-radius: 60px; background: ${G}; border: 6px solid ${CR}; }
    P .vc-btn svg { position: absolute; left: 22px; top: 30px; }
    P .t1 { position: absolute; left: 0; right: 0; top: 96px; text-align: center; font: 800 116px/1 "Lexend", sans-serif; letter-spacing: -0.035em; color: #fff; opacity: 0; }
    P .t2w { position: absolute; left: 0; right: 0; top: 232px; text-align: center; opacity: 0; }
    P .t2 { position: relative; display: inline-block; padding: 4px 30px 14px; font: 800 116px/1 "Lexend", sans-serif; letter-spacing: -0.035em; color: #fff; }
    P .t2 .selbox { left: 0; top: 0; right: 0; bottom: 0; }
    P .t3 { position: absolute; left: 0; right: 0; top: 1300px; text-align: center; font: 800 112px/1 "Lexend", sans-serif; letter-spacing: -0.035em; color: ${G}; opacity: 0; }
    P .t3s { position: absolute; left: 0; right: 0; top: 1450px; text-align: center; font: 500 32px/1 "IBM Plex Mono", monospace; letter-spacing: 0.2em; color: rgba(239,238,229,0.7); opacity: 0; }`,
  html: `${TEL(SITIO.replace('class="scr sitio"', 'class="scr sitio"') + `
        <div class="scr vc">
          <div class="vc-a">${avatar(220)}<div class="lbl">TU NEGOCIO</div></div>
          <div class="vc-b"><div class="nm">Scalerics</div><div class="lbl">EQUIPO</div></div>
          <div class="vc-btn"><svg width="68" height="52" viewBox="0 0 68 52"><rect x="0" y="4" width="46" height="44" rx="10" fill="${NAVY}"/><path d="M48 18 L68 6 V46 L48 34 Z" fill="${NAVY}"/></svg></div>
        </div>`, "")}
      <div class="t1">Videollamada</div>
      <div class="t2w"><span class="t2">${selbox("sb", 0, 0, 0, 0, ";width:auto;height:auto")}<em style="position:relative;font-style:normal">gratis</em></span></div>
      <div class="t3">scalerics.com</div>
      <div class="t3s">AGENDALA AHÍ</div>`,
  js: `
      gsap.set(TEL, { x: 40 });
      // "Agendá una videollamada": la pantalla pasa a la videollamada y el celular se achica al centro
      tl.fromTo(q(".vc"), { opacity: 0 }, { opacity: 1, duration: 0.15 }, 0.02);
      tl.set(q(".sitio"), { opacity: 0 }, 0.18);
      tl.fromTo(qa(".vc-a, .vc-b, .vc-btn"), { opacity: 0, scale: 0.8, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.7)", stagger: 0.1 }, 0.1);
      tl.to(TEL, { scale: 0.68, x: 150, y: -150, transformOrigin: "400px 590px", duration: 0.6, ease: "power3.inOut" }, 0.1);
      tl.fromTo(q(".t1"), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, ${T(85) - 0.2});
      tl.fromTo(q(".t2w"), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, ${T(86) - 0.1});
      caja(".sb", ${T(86) + 0.1});
      tl.fromTo(q(".t3"), { opacity: 0, scale: 0.8, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.7)" }, ${T(88)});
      tl.fromTo(q(".t3s"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" }, ${T(88) + 0.4});
      tl.fromTo(q(".vc-btn"), { scale: 1 }, { scale: 1.14, transformOrigin: "50% 50%", duration: 0.45, ease: "sine.inOut", yoyo: true, repeat: 5, immediateRender: false }, ${T(88) + 0.5});
      tl.to(TEL, { y: -164, duration: 1.6, ease: "sine.inOut", yoyo: true, repeat: 1 }, ${T(88) + 0.3});`,
  sfx: [{ t: 0.05, sfx: "whoosh", vol: 0.22, max: 0.7 }, { t: 0.15, sfx: "pop", vol: 0.22 }, { t: T(85) - 0.2, sfx: "whoosh-short", vol: 0.2 }, { t: T(86) + 0.1, sfx: "click-soft", vol: 0.28 }, { t: T(88), sfx: "chime", vol: 0.3 }],
}));

console.log("escenas escritas:", Object.keys(ESC).join(", "), "· total", DUR);
