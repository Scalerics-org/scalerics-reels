import { escena, AV, tarjeta, botones, CORAZON, COACH, DUENO, TILDES } from "./lib.mjs";

// ---------- s06 ----------
escena("s06-hola", 2.09, {
  css: `
    $ .@-av { position: absolute; left: 90px; width: 100px; height: 100px; border-radius: 50%; background: #ff5a6e; border: 5px solid #fff7f4; overflow: hidden; }
    $ .@-av svg { position: absolute; left: -5px; top: -5px; width: 100px; height: 92px; }
    $ .@-b1 { left: 220px; top: 690px; font-size: 54px; }
    $ .@-b2 { left: 220px; top: 850px; font-size: 54px; }
    $ .@-escr { position: absolute; left: 220px; top: 1010px; width: 170px; height: 90px; border-radius: 45px; background: #fff7f4; }
    $ .@-escr i { position: absolute; top: 33px; width: 24px; height: 24px; border-radius: 50%; background: #1a0d2b; opacity: 0.6; }
    $ .@-visto { right: 100px; top: 1170px; font-size: 34px; }
    $ .@-reloj { left: 0; right: 0; top: 1300px; text-align: center; font-size: 30px; }
  `,
  body: `
        <div class="@-av" style="top:770px">${AV.gabriela}</div>
        <div class="burbuja ella @-b1">¿Hola?</div>
        <div class="burbuja ella @-b2">¿Seguís ahí?</div>
        <div class="@-escr"><i style="left:30px"></i><i style="left:73px"></i><i style="left:116px"></i></div>
        <div class="mono @-visto"><svg style="position:static;width:70px;height:30px;vertical-align:middle" viewBox="0 0 60 26">${TILDES(4, 6)}</svg> VISTO</div>
        <div class="mono @-reloj">ESPERANDO DESDE ENERO</div>
        <svg class="@-tela" viewBox="0 0 1080 1920" aria-hidden="true">
          <path class="la @-l" d="M1030 600 L860 600 M1030 600 L1030 780 M1030 600 L900 730 M1030 600 L960 760 M1030 600 L880 650" style="stroke-width:3" />
          <path class="la @-l" d="M960 600 Q975 640 1030 650 M900 600 Q930 690 1030 710 M870 600 Q900 730 1030 760" style="stroke-width:3" />
          <path class="la @-l" d="M50 1480 L210 1480 M50 1480 L50 1320 M50 1480 L170 1360 M50 1480 L110 1340" style="stroke-width:3" />
          <path class="la @-l" d="M110 1480 Q100 1430 50 1420 M170 1480 Q150 1380 50 1370" style="stroke-width:3" />
        </svg>`,
  js: `
      const SEGUIS = 0.3;
      dibujar(qa(".@-l"), 0, 0.9, 0.3);
      pop(q(".@-av"), 0, 0.6);
      gsap.set([q(".@-b1"), q(".@-b2")], { opacity: 0, transformOrigin: "0% 100%" });
      tl.fromTo(q(".@-b1"), { opacity: 0, scale: 0.6, y: -40 }, { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "back.out(1.8)", immediateRender: false }, 0);
      tl.fromTo(q(".@-b2"), { opacity: 0, scale: 0.6, y: -40 }, { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "back.out(1.8)", immediateRender: false }, SEGUIS);
      tl.to(q(".@-av"), { y: 160, duration: 0.3, ease: "power2.out" }, SEGUIS);
      pop(q(".@-escr"), 0.9, 0.6);
      qa(".@-escr i").forEach((d, k) => tl.to(d, { y: -12, duration: 0.14, yoyo: true, repeat: 3, ease: "sine.inOut" }, 1.0 + k * 0.08));
      tl.to(q(".@-escr"), { opacity: 0, scale: 0.6, duration: 0.2 }, 1.65);
      entra(q(".@-visto"), 1.15);
      entra(q(".@-reloj"), 1.4);
      tl.to([q(".@-b1"), q(".@-b2")], { opacity: 0.75, duration: 0.3 }, 1.6);`,
  sfx: [{ t: 0.02, sfx: "notification", vol: 0.3 }, { t: 0.32, sfx: "notification", vol: 0.3 }, { t: 0.95, sfx: "typing", vol: 0.2, max: 0.6 }, { t: 1.2, sfx: "click-soft", vol: 0.25 }],
});

// ---------- s07 ----------
escena("s07-rodrigo", 4.57, {
  css: `
    $ .@-badge { position: absolute; left: 300px; top: 1285px; padding: 12px 22px; border-radius: 40px; background: #ff5a6e; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 36px; color: #fff7f4; white-space: nowrap; }
    $ .@-c1, $ .@-c2 { position: absolute; top: 1270px; width: 80px; height: 80px; }
    $ .@-nunca { left: 0; right: 0; top: 1400px; text-align: center; font-size: 34px; }
    $ .@-quer { left: 0; right: 0; top: 1300px; text-align: center; font-size: 36px; color: #ff5a6e; }
  `,
  body: `
        ${tarjeta("@-rod", 310, 610, "v", AV.rodrigo, "Rodrigo", "CLIENTE FIEL")}
        <div class="@-badge">COMPRÓ 2 VECES</div>
        <svg class="@-c1" viewBox="-170 -150 340 340" style="left:690px" aria-hidden="true"><path class="cf" d="${CORAZON}" /></svg>
        <svg class="@-c2" viewBox="-170 -150 340 340" style="left:780px" aria-hidden="true"><path class="cf" d="${CORAZON}" /></svg>
        <div class="mono @-nunca">ÚLTIMO MENSAJE TUYO · NUNCA</div>
        <svg class="@-roto" viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(540 900)">
            <path class="cf" d="${CORAZON}" style="filter: drop-shadow(0 0 24px rgba(255,90,110,0.6))" />
            <path class="ln" d="M-30 -60 L-10 -10 L-40 40 L0 100" style="stroke:#1a0d2b;stroke-width:8" />
            <g transform="rotate(-30)"><rect class="wf" x="-120" y="-24" width="240" height="48" rx="10" /><path class="kn" d="M-30 -10 v20 M0 -10 v20 M30 -10 v20" style="stroke-width:4" /></g>
            <g transform="rotate(35)"><rect class="wf" x="-110" y="-22" width="220" height="44" rx="10" /></g>
          </g>
        </svg>
        <div class="mono @-quer">TE QUERÍA EN SERIO</div>`,
  js: `
      const DOS = 1.09, VECES = 1.27, NUNCA = 1.63, ESE = 2.54, SERIO = 3.36;
      gsap.set(q(".@-rod"), { opacity: 0 });
      tl.fromTo(q(".@-rod"), { opacity: 0, x: 500, rotation: 20 }, { opacity: 1, x: 0, rotation: 0, duration: 0.4, ease: "back.out(1.4)", immediateRender: false }, 0);
      pop(q(".@-badge"), 0.85, 0.6);
      pop(q(".@-c1"), DOS, 0.3);
      pop(q(".@-c2"), VECES, 0.3);
      late(q(".@-c1"), VECES + 0.3, 2, 1.2);
      late(q(".@-c2"), VECES + 0.3, 2, 1.2);
      entra(q(".@-nunca"), NUNCA);
      tl.to(q(".@-nunca"), { opacity: 0.4, duration: 0.1, yoyo: true, repeat: 3, ease: "steps(1)" }, NUNCA + 0.4);
      // "Ese te quería...": la tarjeta se inclina, triste, y se va sola a la izquierda
      tl.to(q(".@-rod"), { rotation: -6, y: 20, duration: 0.5, ease: "sine.inOut" }, ESE);
      tl.to([q(".@-badge"), q(".@-c1"), q(".@-c2"), q(".@-nunca")], { opacity: 0, duration: 0.25 }, SERIO - 0.4);
      swipe(q(".@-rod"), SERIO - 0.35, -1, 0.5);
      gsap.set(q(".@-roto"), { opacity: 0 });
      tl.fromTo(q(".@-roto"), { opacity: 0, scale: 0.4, svgOrigin: "540 950" }, { opacity: 1, scale: 1, svgOrigin: "540 950", duration: 0.35, ease: "back.out(1.8)", immediateRender: false }, SERIO + 0.05);
      late(q(".@-roto"), SERIO + 0.45, 2, 1.06, "540 950");
      entra(q(".@-quer"), SERIO + 0.2);`,
  sfx: [{ t: 0.02, sfx: "whoosh", vol: 0.25 }, { t: 1.07, sfx: "pop", vol: 0.3 }, { t: 1.25, sfx: "pop", vol: 0.3 }, { t: 1.63, sfx: "glitch-1", vol: 0.2 }, { t: 3.0, sfx: "whoosh-short", vol: 0.3 }, { t: 3.4, sfx: "impact-bass-1", vol: 0.35 }],
});

// ---------- s08 ----------
const SIG = (cls, x, y, s) => `<div class="@-sig ${cls}" style="left:${x}px;top:${y}px;font-size:${s}px">?</div>`;
escena("s08-quien-era", 3.69, {
  css: `
    $ .@-sig { position: absolute; font-family: "Lexend", sans-serif; font-weight: 900; line-height: 1; color: #ff5a6e; text-shadow: 0 0 20px rgba(255, 90, 110, 0.5); }
    $ .@-ct .nom { font-size: 52px; }
  `,
  body: `
        ${tarjeta("@-ct", 450, 610, "l", AV.quien, "¿Quién era?", "AGENDADO ASÍ<br />HACE MESES")}
        ${SIG("@-s1", 410, 600, 120)}${SIG("@-s2", 900, 560, 90)}${SIG("@-s3", 930, 1180, 140)}
        <svg class="@-coach" viewBox="0 0 1080 1920" aria-hidden="true"><g transform="translate(-20 0)">${COACH}</g></svg>`,
  js: `
      const QUIEN = 0.79, NO = 1.25, SABES = 1.97, HABLASTE = 2.52;
      gsap.set(q(".@-ct"), { opacity: 0 });
      tl.fromTo(q(".@-ct"), { opacity: 0, y: 80, rotation: 4 }, { opacity: 1, y: 0, rotation: 0, duration: 0.35, ease: "back.out(1.5)", immediateRender: false }, 0);
      tl.fromTo(q(".@-ct .nom"), { scale: 1.3, transformOrigin: "0% 50%" }, { scale: 1, duration: 0.3, ease: "back.out(2)", immediateRender: false }, QUIEN);
      golpe(QUIEN + 0.05, 8);
      // la coach entra, incrédula
      dibujar(qa(".@-l"), NO - 0.25, 0.45, 0.5);
      gsap.set(q(".@-coach"), { opacity: 0 });
      tl.fromTo(q(".@-coach"), { opacity: 0, x: -300 }, { opacity: 1, x: 0, duration: 0.35, ease: "power3.out", immediateRender: false }, NO - 0.25);
      tl.to(q(".@-ceja"), { y: -16, duration: 0.2, ease: "back.out(2)" }, SABES);
      tl.to(q(".@-coach"), { rotation: 4, svgOrigin: "230 1500", duration: 0.25, yoyo: true, repeat: 1, ease: "sine.inOut" }, SABES);
      // signos de pregunta que rebotan
      [q(".@-s1"), q(".@-s2"), q(".@-s3")].forEach((s, i) => {
        pop(s, 0.85 + i * 0.5, 0.2);
        tl.to(s, { y: -24, rotation: i % 2 ? 12 : -12, duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut" }, 1.2 + i * 0.5);
      });
      tl.to(q(".@-ct"), { rotation: 3, duration: 0.12, yoyo: true, repeat: 3 }, HABLASTE);`,
  sfx: [{ t: 0.02, sfx: "whoosh", vol: 0.25 }, { t: 0.8, sfx: "glitch-1", vol: 0.3 }, { t: 1.05, sfx: "pop", vol: 0.25 }, { t: 1.55, sfx: "pop", vol: 0.25 }, { t: 2.05, sfx: "pop", vol: 0.25 }],
});

// ---------- s09 ----------
escena("s09-anotados", 4.94, {
  css: `
    $ .@-postit { position: absolute; left: 120px; top: 600px; width: 300px; height: 280px; background: #ff5a6e; padding: 30px 28px; font-family: "Lexend", sans-serif; font-weight: 600; font-size: 36px; line-height: 1.15; color: #1a0d2b; box-shadow: 0 14px 30px rgba(18, 8, 32, 0.5); }
    $ .@-cel2 { position: absolute; left: 540px; top: 610px; width: 170px; height: 320px; }
    $ .@-nube { position: absolute; left: 0; top: 0; }
    $ .@-lbl { font-size: 28px; }
  `,
  body: `
        <div class="@-postit">llamar a la de los lentes ??? <br />(¿martes?)</div>
        <svg class="@-cel2" viewBox="0 0 170 320" aria-hidden="true">
          <rect class="nf" x="10" y="10" width="150" height="300" rx="22" />
          <rect class="ln" x="34" y="44" width="102" height="110" rx="8" />
          <rect class="la" x="58" y="80" width="46" height="26" rx="4" /><path class="la" d="M104 88 v10" /><path class="cl" d="M62 86 l14 14" style="stroke-width:5" />
          <path class="ln" d="M40 190 h20 M75 190 h20 M110 190 h20 M40 225 h20 M75 225 h20 M110 225 h20 M40 260 h20 M75 260 h20 M110 260 h20" />
        </svg>
        <svg class="@-nube" viewBox="0 0 1080 1920" aria-hidden="true"><g transform="translate(0 90)">
          <circle class="ln @-bol" cx="430" cy="1010" r="12" /><circle class="ln @-bol" cx="480" cy="980" r="18" />
          <path class="nf @-nb" d="M560 1000 Q540 940 600 920 Q620 870 690 885 Q740 850 800 885 Q870 870 890 925 Q960 940 940 1010 Q970 1070 900 1095 Q880 1150 800 1130 Q740 1170 680 1130 Q600 1150 590 1090 Q520 1070 560 1000 Z" />
          <g class="@-caras">
            <g class="@-cara"><g transform="translate(640 990)"><circle class="ln" r="30" /><circle class="cf" cx="-10" cy="-4" r="4" /><circle class="cf" cx="10" cy="-4" r="4" /></g></g>
            <g class="@-cara"><g transform="translate(730 960)"><circle class="ln" r="30" /><circle class="cf" cx="-10" cy="-4" r="4" /><circle class="cf" cx="10" cy="-4" r="4" /></g></g>
            <g class="@-cara"><g transform="translate(820 990)"><circle class="ln" r="30" /><circle class="cf" cx="-10" cy="-4" r="4" /><circle class="cf" cx="10" cy="-4" r="4" /></g></g>
            <g class="@-cara"><g transform="translate(690 1060)"><circle class="ln" r="30" /><circle class="cf" cx="-10" cy="-4" r="4" /><circle class="cf" cx="10" cy="-4" r="4" /></g></g>
            <g class="@-cara"><g transform="translate(780 1065)"><circle class="ln" r="30" /><circle class="cf" cx="-10" cy="-4" r="4" /><circle class="cf" cx="10" cy="-4" r="4" /></g></g>
          </g></g>
        </svg>
        <svg class="@-dueno" viewBox="0 0 1080 1920" aria-hidden="true"><g transform="translate(280 1100)">${DUENO}
          <path class="la @-gota" d="M100 -70 Q112 -50 100 -40 Q88 -50 100 -70 Z" /><path class="la @-gota" d="M-104 -40 Q-92 -20 -104 -10 Q-116 -20 -104 -40 Z" /></g></svg>
        <div class="mono @-lbl" style="left:150px;top:905px">1 · POST-IT</div>
        <div class="mono @-lbl" style="left:730px;top:800px">2 · OTRO CEL</div>
        <div class="mono @-lbl" style="left:640px;top:1290px">3 · LA CABEZA</div>`,
  js: `
      const POSTIT = 1.51, CEL = 2.54, CABEZA = 3.86;
      dibujar(qa(".@-l"), 0, 0.5, 0.4);
      tl.fromTo(q(".@-dueno"), { y: 120 }, { y: 0, duration: 0.35, ease: "back.out(1.4)" }, 0);
      tl.to(q(".@-cejas"), { y: -8, duration: 0.15 }, 0.2);
      tl.to(q(".@-dueno"), { rotation: -3, svgOrigin: "280 1520", duration: 0.25, yoyo: true, repeat: 1 }, 0.3);
      gsap.set(q(".@-postit"), { opacity: 0 });
      tl.fromTo(q(".@-postit"), { opacity: 0, scale: 1.6, rotation: -20 }, { opacity: 1, scale: 1, rotation: 6, duration: 0.25, ease: "power3.out", immediateRender: false }, POSTIT - 0.15);
      gsap.set(q(".@-cel2"), { opacity: 0 });
      tl.fromTo(q(".@-cel2"), { opacity: 0, y: -200, rotation: 30 }, { opacity: 1, y: 0, rotation: -8, duration: 0.35, ease: "bounce.out", immediateRender: false }, CEL - 0.2);
      tl.to(q(".@-cel2"), { x: 6, duration: 0.05, yoyo: true, repeat: 5 }, CEL + 0.25);
      const lbl = qa(".@-lbl");
      entra(lbl[0], POSTIT + 0.1); entra(lbl[1], CEL + 0.1); entra(lbl[2], CABEZA + 0.1);
      // la nube con las caras que se borran
      oculto([...qa(".@-bol"), q(".@-nb"), ...qa(".@-cara")]);
      qa(".@-bol").forEach((b, i) => tl.to(b, { opacity: 1, duration: 0.1 }, CABEZA - 0.5 + i * 0.1));
      pop(q(".@-nb"), CABEZA - 0.3, 0.5);
      qa(".@-cara").forEach((g, i) => { tl.to(g, { opacity: 1, duration: 0.1 }, CABEZA - 0.15 + i * 0.05); tl.to(g, { opacity: 0, y: -20, duration: 0.25 }, CABEZA + 0.35 + i * 0.12); });
      tl.to(q(".@-nb"), { opacity: 0.5, duration: 0.3 }, CABEZA + 0.9);
      tl.to(q(".@-boca"), { scaleX: 0.5, svgOrigin: "280 1172", duration: 0.2 }, CABEZA);
      oculto(qa(".@-gota"));
      qa(".@-gota").forEach((g, i) => { tl.to(g, { opacity: 1, duration: 0.1 }, 2.0 + i * 0.9); tl.to(g, { y: 40, opacity: 0, duration: 0.6, ease: "power1.in" }, 2.1 + i * 0.9); });`,
  sfx: [{ t: 0.02, sfx: "whoosh", vol: 0.25 }, { t: 1.4, sfx: "pop", vol: 0.35 }, { t: 2.4, sfx: "pop", vol: 0.35 }, { t: 2.8, sfx: "glitch-1", vol: 0.2 }, { t: 3.6, sfx: "sparkle", vol: 0.25 }, { t: 4.2, sfx: "glitch-1", vol: 0.25 }],
});

// ---------- s10 ----------
const DESORG = "DESORGANIZADO".split("").map((c, i) => `<span class="@-le" data-i="${i}">${c}</span>`).join("");
escena("s10-feo", 6.47, {
  css: `
    $ .@-no { top: 600px; font-size: 118px; }
    $ .@-feo { position: relative; display: inline-block; }
    $ .@-tacha { position: absolute; left: -10px; right: -10px; top: 50%; height: 16px; margin-top: -8px; background: #ff5a6e; border-radius: 8px; transform-origin: 0% 50%; }
    $ .@-des { top: 755px; font-size: 104px; color: #ff5a6e; text-shadow: 0 0 30px rgba(255, 90, 110, 0.4); }
    $ .@-le { display: inline-block; }
    $ .@-medidor { position: absolute; left: 420px; width: 580px; height: 110px; border: 6px solid #fff7f4; border-radius: 30px; overflow: hidden; background: #120820; }
    $ .@-medidor i { position: absolute; left: 0; top: 0; bottom: 0; width: 100%; transform-origin: 0% 50%; }
    $ .@-m1 i { background: #ff5a6e; }
    $ .@-m2 i { background: #b9a8d6; }
    $ .@-mt { font-size: 32px; color: #fff7f4; }
    $ .@-pct { position: absolute; left: 0; right: 0; top: 18px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 60px; line-height: 1; color: #fff7f4; }
    $ .@-cor { position: absolute; width: 60px; height: 60px; }
  `,
  body: `
        <div class="gigante @-no">NO SOS <span class="@-feo">FEO<span class="@-tacha"></span></span></div>
        <div class="gigante @-des" data-layout-allow-overlap>${DESORG}</div>
        <div class="mono @-mt @-t1" style="left:420px;top:640px">INTERESADOS</div>
        <div class="@-medidor @-m1" style="top:690px"><i></i></div>
        <div class="mono @-mt @-t2" style="left:420px;top:900px">MEMORIA</div>
        <div class="@-medidor @-m2" style="top:950px"><i></i><div class="@-pct">1%</div></div>
        ${[0, 1, 2, 3, 4].map((k) => `<svg class="@-cor @-cr${k}" viewBox="-170 -150 340 340" style="left:${880 + (k % 2) * 60}px;top:${640 - k * 10}px" aria-hidden="true"><path class="cf" d="${CORAZON}" /></svg>`).join("")}
        <svg class="@-coach" viewBox="0 0 1080 1920" aria-hidden="true"><g transform="translate(0 0)">${COACH}</g></svg>`,
  js: `
      const FEO = 1.38, DES = 2.22, TE = 3.74, INTER = 4.16, MEM = 5.37;
      dibujar(qa(".@-l"), 0, 0.6, 0.5);
      tl.fromTo(q(".@-coach"), { x: -60 }, { x: 0, duration: 0.4, ease: "power3.out" }, 0);
      // la coach ladea la cabeza con ternura
      tl.to(q(".@-coach"), { rotation: -4, svgOrigin: "230 1500", duration: 0.5, yoyo: true, repeat: 1, ease: "sine.inOut" }, 0.1);
      entra(q(".@-no"), 0.9);
      gsap.set(q(".@-tacha"), { scaleX: 0 });
      tl.to(q(".@-tacha"), { scaleX: 1, duration: 0.2, ease: "power2.out" }, FEO + 0.05);
      golpe(FEO + 0.1, 8);
      // DESORGANIZADO entra y se desacomoda
      gsap.set(q(".@-des"), { opacity: 0 });
      tl.fromTo(q(".@-des"), { opacity: 0, scale: 1.5 }, { opacity: 1, scale: 1, duration: 0.2, ease: "power4.in", immediateRender: false }, DES - 0.12);
      golpe(DES + 0.1, 14);
      const R = [-14, 9, -6, 16, -10, 5, -18, 12, -4, 15, -9, 7, -13];
      const Y = [10, -16, 6, -8, 18, -12, 4, -18, 12, -6, 16, -10, 8];
      qa(".@-le").forEach((l, i) => tl.to(l, { rotation: R[i], y: Y[i], duration: 0.3, ease: "back.out(3)" }, DES + 0.35 + i * 0.03));
      tl.to(q(".@-boca"), { scaleY: 1.3, svgOrigin: "234 1150", duration: 0.2, yoyo: true, repeat: 1 }, DES);
      // fuera los textos; entran los dos medidores
      tl.to([q(".@-no"), q(".@-des")], { opacity: 0, y: -60, duration: 0.25, ease: "power2.in" }, TE - 0.3);
      [q(".@-t1"), q(".@-m1")].forEach((e) => entra(e, TE - 0.05, { x: 120, y: 0 }));
      [q(".@-t2"), q(".@-m2")].forEach((e) => entra(e, INTER + 0.3, { x: 120, y: 0 }));
      gsap.set(q(".@-m1 i"), { scaleX: 0.1 });
      tl.to(q(".@-m1 i"), { scaleX: 1, duration: 0.5, ease: "power2.out" }, INTER - 0.1);
      tl.to(q(".@-m1"), { scale: 1.05, duration: 0.1, yoyo: true, repeat: 3 }, INTER + 0.4);
      // corazoncitos que desbordan el medidor
      qa(".@-cor").forEach((c, k) => { gsap.set(c, { opacity: 0 }); tl.fromTo(c, { opacity: 0, y: 60, scale: 0.4 }, { opacity: 1, y: -60 - k * 18, x: (k % 2 ? 30 : -30), scale: 1, duration: 0.6, ease: "power2.out", immediateRender: false }, INTER + 0.35 + k * 0.08); tl.to(c, { opacity: 0, duration: 0.4 }, INTER + 1.4 + k * 0.05); });
      gsap.set(q(".@-m2 i"), { scaleX: 1 });
      gsap.set(q(".@-pct"), { opacity: 0 });
      tl.to(q(".@-m2 i"), { scaleX: 0.02, duration: 0.6, ease: "power2.in" }, MEM - 0.5);
      tl.to(q(".@-pct"), { opacity: 1, duration: 0.1 }, MEM);
      tl.to(q(".@-m2"), { opacity: 0.4, duration: 0.12, yoyo: true, repeat: 5, ease: "steps(1)" }, MEM + 0.1);`,
  sfx: [{ t: 0.9, sfx: "whoosh-short", vol: 0.25 }, { t: 1.4, sfx: "glitch-1", vol: 0.3 }, { t: 2.12, sfx: "impact-bass-1", vol: 0.4 }, { t: 2.6, sfx: "glitch-2", vol: 0.25 }, { t: 4.05, sfx: "whoosh-cinematic", vol: 0.25 }, { t: 4.5, sfx: "sparkle", vol: 0.3 }, { t: 5.3, sfx: "glitch-1", vol: 0.25 }],
});
