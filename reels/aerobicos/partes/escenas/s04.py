from base import *
p = "s04"
css = """
    [data-composition-id="%ID%"] .s04-due { left: 20px; top: 700px; }
    [data-composition-id="%ID%"] .s04-ins { left: 680px; top: 760px; }
    [data-composition-id="%ID%"] .s04-bur { position: absolute; left: 110px; width: 600px; padding: 20px 26px 16px; background: #fff3e8; border: 5px solid #160a2a; border-radius: 30px 30px 30px 6px;
      box-shadow: 7px 7px 0 #1de9d6; font-family: "Lexend", sans-serif; font-weight: 700; font-size: 44px; color: #160a2a; }
    [data-composition-id="%ID%"] .s04-bur i { font-style: normal; display: block; text-align: right; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 24px; color: #5b2a86; }
    [data-composition-id="%ID%"] .s04-n { top: 600px; left: auto; right: 60px; font-size: 240px; }
    [data-composition-id="%ID%"] .s04-pain { top: 600px; font-size: 150px; }
    [data-composition-id="%ID%"] .s04-gain { top: 760px; font-size: 150px; }
"""
burs = "".join(f'<div class="s04-bur s04-b{i}" style="top:{top}px">Tu pedido está listo<i>{hora}</i></div>'
               for i, (top, hora) in enumerate([(600, "22:47"), (745, "22:48"), (600, "22:49"), (745, "22:50"), (600, "22:51"), (745, "22:52")]))
body = f"""
        {burs}
        <div class="fig s04-due">{duenio('s04d', tel=True)}</div>
        <div class="fig s04-ins">{instructora('s04i')}</div>
        <div class="big a s04-n s04-n1">1!</div>
        <div class="big a s04-n s04-n2">2!</div>
        <div class="big r s04-pain">No pain,</div>
        <div class="big a s04-gain">no gain!</div>
"""
js = """
      const LISTO1 = 0.8, UNO = 2.09, TU2 = 2.87, LISTO2 = 3.7, DOS = 4.97, PAIN = 6.0, GAIN = 6.95;
      gsap.set(q(".s04-due"), { scale: 0.84, transformOrigin: "50% 98%" });
      gsap.set(q(".s04-ins"), { scale: 0.68, transformOrigin: "50% 98%" });
      // el dueño: levanta el celular como una pesa en cada "listo"
      const curl = (t) => {
        tl.to(q(".s04d-bd"), { rotation: -125, svgOrigin: "250 286", duration: 0.28, ease: "power2.out" }, t - 0.2);
        tl.to(q(".s04d-bd"), { rotation: 0, svgOrigin: "250 286", duration: 0.35, ease: "power2.in" }, t + 0.45);
        tl.to(q(".s04d-cuerpo"), { y: 10, duration: 0.15, yoyo: true, repeat: 1 }, t - 0.2);
      };
      gsap.set(q(".s04d-bd"), { rotation: -60, svgOrigin: "250 286" });
      tl.to(q(".s04d-bd"), { rotation: 0, svgOrigin: "250 286", duration: 0.25 }, 0);
      [LISTO1, LISTO2, 5.3, 5.85, 6.4, 6.95].forEach(curl);
      tl.to(q(".s04d-gotas"), { y: 12, duration: 0.3, yoyo: true, repeat: 23, ease: "sine.in" }, 0);
      tl.to(q(".s04d-boca"), { scaleY: 1.6, transformOrigin: "50% 50%", duration: BEAT / 2, yoyo: true, repeat: 15, ease: "sine.inOut" }, 0);
      // la instructora: aplaude y marca el tiempo
      const brazos = (t, arriba) => {
        tl.to(q(".s04i-bi"), { rotation: arriba ? 150 : 60, svgOrigin: "158 272", duration: 0.2, ease: "power2.out" }, t);
        tl.to(q(".s04i-bd"), { rotation: arriba ? -150 : -60, svgOrigin: "242 272", duration: 0.2, ease: "power2.out" }, t);
      };
      for (let k = 0; k * BEAT < DUR - 0.3; k++) brazos(k * BEAT, k % 2 === 1);
      rebote(q(".s04-ins"), 0, DUR - 0.3, { y: -36 });
      // burbujas: una por repetición; en "no pain" se multiplican
      const burs = qa(".s04-bur");
      gsap.set(burs, { opacity: 0 });
      tl.fromTo(burs[0], { opacity: 0, scale: 0.4, x: -80 }, { opacity: 1, scale: 1, x: 0, duration: 0.3, ease: "back.out(2)", immediateRender: false }, LISTO1 - 0.1);
      tl.fromTo(burs[1], { opacity: 0, scale: 0.4, x: -80 }, { opacity: 1, scale: 1, x: 0, duration: 0.3, ease: "back.out(2)", immediateRender: false }, LISTO2 - 0.1);
      tl.to([burs[0], burs[1]], { y: -60, opacity: 0, duration: 0.25, ease: "power2.in" }, 5.6);
      // números de la instructora
      golpe(q(".s04-n1"), UNO, 6, 3); fuera(q(".s04-n1"), TU2 - 0.2);
      golpe(q(".s04-n2"), DOS, -6, 3); fuera(q(".s04-n2"), PAIN - 0.3);
      sacudon(UNO, 1.2); sacudon(DOS, 1.2);
      // no pain, no gain
      golpe(q(".s04-pain"), PAIN, -5, 3); sacudon(PAIN, 1.6);
      golpe(q(".s04-gain"), GAIN, 4, 3); sacudon(GAIN, 2);
      [2, 3, 4, 5].forEach((i, k) => {
        tl.fromTo(burs[i], { opacity: 0, scale: 0.5 }, { opacity: 0.4, scale: 0.85, duration: 0.2, ease: "back.out(2)", immediateRender: false }, 6.2 + k * 0.22);
        tl.to(burs[i], { y: 520, opacity: 0, duration: 0.6, ease: "power2.in" }, 6.45 + k * 0.22);
      });
"""
sfx = [{"t": 0.75, "sfx": "notification", "vol": 0.35}, {"t": 2.05, "sfx": "impact-bass-2", "vol": 0.4, "max": 0.5},
       {"t": 3.65, "sfx": "notification", "vol": 0.35}, {"t": 4.93, "sfx": "impact-bass-2", "vol": 0.4, "max": 0.5},
       {"t": 5.95, "sfx": "impact-bass-1", "vol": 0.4, "max": 0.5}, {"t": 6.3, "sfx": "notification", "vol": 0.22}, {"t": 6.9, "sfx": "impact-bass-1", "vol": 0.45, "max": 0.6}]
escena("s04-repes", p, 7.90, css, body, js, sfx)
