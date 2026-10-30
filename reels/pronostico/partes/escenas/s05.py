ID = "s05-walter"; DUR = 3.74
CSS = """
    $ .s05-para { left: 110px; top: 590px; background: #ffd23f; color: #061428; font-size: 76px; box-shadow: 10px 10px 0 #5ec8ff; transform: rotate(-6deg); }
    $ .s05-badge { position: absolute; left: 812px; top: 1000px; min-width: 96px; padding: 6px 12px 4px; border-radius: 30px; background: #ff8a1f; border: 5px solid #f4f6fb; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 34px; color: #061428; }
"""
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <defs><clipPath id="s05-clip"><rect x="0" y="520" width="1080" height="900" /></clipPath></defs>
          <g opacity="0.5"><path d="M40 760 H1040 M40 920 H1040" stroke="#14457a" stroke-width="10" /><rect x="90" y="700" width="50" height="60" fill="#14457a" /><rect x="880" y="860" width="50" height="60" fill="#14457a" /><rect x="200" y="860" width="50" height="60" fill="#14457a" /></g>
          <g class="s05-walter"><g transform="translate(330 740) scale(1.15)">""" + WALTER("s05") + """</g></g>
          <rect class="m" x="80" y="1170" width="920" height="180" rx="10" />
          <path class="l" d="M80 1220 H1000" stroke-width="5" opacity="0.6" />
          <g class="s05-cel"><g transform="translate(760 1170) rotate(-8)">
            <rect x="-60" y="-190" width="120" height="200" rx="18" fill="#0b2547" stroke="#f4f6fb" stroke-width="6" />
            <path d="M-40 -150 H40 M-40 -120 H30 M-40 -90 H40 M-40 -60 H20" stroke="#5ec8ff" stroke-width="8" stroke-linecap="round" />
          </g></g>
          <g class="s05-ondas" fill="none" stroke="#ffd23f" stroke-width="6" stroke-linecap="round"><path d="M660 1030 C640 1060 640 1100 660 1130 M880 1030 C900 1060 900 1100 880 1130" /></g>
          <g clip-path="url(#s05-clip)">""" + lluvia("s05-lluvia", 55, -300, 1300, 420, 1000, 55, globos=0.55, vel=(900, 1200), esc=(1.1, 1.7), ang=14) + """</g>
          <g class="s05-reb s05-reb1"><g transform="translate(470 860)">""" + GLOBO + """</g></g>
          <g class="s05-reb s05-reb2"><g transform="translate(560 870) scale(1.3)">""" + GLOBO + """</g></g>
        </svg>
        <div class="s05-badge">12</div>
        <div class="cartela s05-para">¡CUANDO PARA!</div>
"""
JS = """
      const MOSTRADOR = 0.57, CONTESTO = 1.90, PARA = 2.57;
      lluvia(".s05-lluvia", 0, DUR);
      habla(".s05-boca", 0.0, 3.2, "180 300");
      tl.to(q(".s05-bigote"), { y: -5, duration: 0.11, yoyo: true, repeat: 27, ease: "sine.inOut" }, 0);
      tl.fromTo(q(".s05-gotas"), { y: 0, opacity: 1 }, { y: 40, opacity: 0, duration: 0.45, repeat: 7, ease: "power1.in" }, 0);
      // globitos que le rebotan en la cabeza
      [[".s05-reb1", 0.05, -160], [".s05-reb2", 1.2, 180]].forEach(([s, t, dx]) => {
        tl.fromTo(q(s), { y: -360, x: 0, rotation: 0, opacity: 1 }, { y: 0, duration: 0.3, ease: "power2.in", immediateRender: true }, t);
        tl.to(q(s), { x: dx, y: -140, rotation: dx / 4, duration: 0.3, ease: "power2.out" }, t + 0.3);
        tl.to(q(s), { y: 300, opacity: 0, duration: 0.35, ease: "power2.in" }, t + 0.6);
      });
      // manotea y golpea el mostrador
      gsap.set(q(".s05-brazo-d"), { rotation: -40, svgOrigin: "290 430" });
      tl.to(q(".s05-brazo-d"), { rotation: 60, svgOrigin: "290 430", duration: 0.14, ease: "power4.in" }, MOSTRADOR - 0.14);
      tl.to(q(".s05-brazo-d"), { rotation: -30, svgOrigin: "290 430", duration: 0.3, ease: "power2.out" }, MOSTRADOR + 0.2);
      tl.fromTo(q(".s05-brazo-i"), { rotation: 20, svgOrigin: "70 430" }, { rotation: -30, svgOrigin: "70 430", duration: 0.25, yoyo: true, repeat: 9, ease: "sine.inOut" }, 0);
      sacudon(MOSTRADOR, 1.3);
      // el celular vibra y el contador sube
      tl.fromTo(q(".s05-cel"), { x: -4 }, { x: 4, duration: 0.04, yoyo: true, repeat: 70, ease: "none" }, 0.3);
      tl.fromTo(q(".s05-ondas"), { opacity: 0.2 }, { opacity: 1, duration: 0.12, yoyo: true, repeat: 23, ease: "steps(1)" }, 0.3);
      const badge = q(".s05-badge"), c = { v: 12 };
      tl.fromTo(c, { v: 12 }, { v: 99, duration: 2.2, ease: "power1.in", onUpdate: () => { badge.textContent = c.v >= 98.5 ? "99+" : String(Math.round(c.v)); } }, 0.3);
      tl.fromTo(badge, { scale: 1 }, { scale: 1.25, duration: 0.15, yoyo: true, repeat: 3, ease: "sine.inOut", immediateRender: false }, 2.5);
      // ¡cuando para!
      golpe(".s05-para", CONTESTO + 0.3, 2.2);
      tl.to(q(".s05-para"), { rotation: -2, duration: 0.15, yoyo: true, repeat: 5, ease: "sine.inOut" }, PARA);
"""
SFX = [{"t": 0.57, "sfx": "impact-bass-1", "vol": 0.4, "max": 0.6}, {"t": 0.35, "sfx": "notification", "vol": 0.25}, {"t": 0.9, "sfx": "notification", "vol": 0.22}, {"t": 1.4, "sfx": "notification", "vol": 0.22}, {"t": 2.2, "sfx": "pop", "vol": 0.3}, {"t": 2.6, "sfx": "notification", "vol": 0.22}]
