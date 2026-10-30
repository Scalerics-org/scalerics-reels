export const ID = "s15-solos";
export const CSS = `
  $ .s15-tit { top: 600px; font-size: 80px; color: #5ce611; text-shadow: 0 0 34px rgba(92,230,17,0.4); }
  $ .s15-fila { position: absolute; left: 70px; width: 940px; height: 180px; }
  $ .s15-izq, $ .s15-der { position: absolute; top: 0; height: 180px; border-radius: 22px; border: 6px solid #f2f2f2; background: #141a28; }
  $ .s15-izq { left: 0; width: 380px; }
  $ .s15-der { left: 520px; width: 420px; }
  $ .s15-flecha { position: absolute; left: 392px; top: 50px; width: 116px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 70px; line-height: 70px; color: #5ce611; }
  $ .s15-rot { position: absolute; left: 24px; top: 16px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 26px; letter-spacing: 0.12em; color: #21a366; }
  $ .s15-big { position: absolute; left: 24px; top: 62px; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 40px; color: #f2f2f2; white-space: nowrap; }
  $ .s15-msj { position: absolute; left: 24px; top: 64px; padding: 10px 20px; border-radius: 18px; background: #f2f2f2; color: #0a0d14; font-family: "Lexend", sans-serif; font-weight: 700; font-size: 32px; white-space: nowrap; }
  $ .s15-renglon { position: absolute; left: 24px; height: 22px; border-radius: 6px; background: #21a366; }
  $ .s15-num { position: absolute; top: 56px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 80px; line-height: 1; color: #f2f2f2; }
  $ .s15-ok { position: absolute; right: 22px; top: 56px; width: 70px; height: 70px; border-radius: 50%; background: #5ce611; color: #0a0d14; text-align: center; line-height: 70px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 30px; }
`;
export const HTML = `
        <div class="txt s15-tit">Automatizaciones</div>
        <div class="s15-fila s15-f1" style="top:770px">
          <div class="s15-izq"><div class="s15-rot">WHATSAPP</div><div class="s15-msj">Quiero 2 docenas</div></div>
          <div class="s15-flecha">&gt;</div>
          <div class="s15-der"><div class="s15-rot">PLANILLA</div>
            <div class="s15-renglon s15-r" style="top:66px;width:300px"></div><div class="s15-renglon s15-r" style="top:102px;width:250px"></div><div class="s15-renglon s15-r" style="top:138px;width:330px"></div>
            <div class="s15-ok s15-ok1">OK</div></div>
        </div>
        <div class="s15-fila s15-f2" style="top:990px">
          <div class="s15-izq"><div class="s15-rot">EN EL LOCAL</div><div class="s15-big">2 alfajores</div></div>
          <div class="s15-flecha">&gt;</div>
          <div class="s15-der"><div class="s15-rot">STOCK</div><div class="s15-num s15-n12" style="left:24px">12</div><div class="s15-num s15-n10" style="left:24px">10</div><div class="s15-ok s15-ok2">OK</div></div>
        </div>
        <div class="s15-fila s15-f3" style="top:1210px">
          <div class="s15-izq"><div class="s15-rot">PEDIDO PRONTO</div><div class="s15-big">Marcás listo</div></div>
          <div class="s15-flecha">&gt;</div>
          <div class="s15-der"><div class="s15-rot">AL CLIENTE</div><div class="s15-msj" style="background:#21a366;color:#f2f2f2">Tu pedido está listo</div></div>
        </div>
`;
export const JS = `
      const AUTO = 0.3, PEDIDOS = 1.9, SOLOS = 3.0, PLANILLA = 3.4, STOCK = 4.1, SOLO = 4.9, CLIENTE = 5.6, AVISO = 6.3;
      tl.fromTo(ESC, { scale: 1.04 }, { scale: 1, duration: DUR, ease: "none", transformOrigin: "50% 55%" }, 0);
      tl.fromTo(q(".s15-tit"), { opacity: 0.4, scale: 1.3 }, { opacity: 1, scale: 1, duration: 0.25, ease: "power4.out" }, 0);
      tl.to(q(".s15-tit"), { scale: 1.08, duration: 0.15, yoyo: true, repeat: 1 }, AUTO + 0.4);
      // 1) el pedido de WhatsApp pasa solo a la planilla
      entra(q(".s15-f1 .s15-izq"), PEDIDOS - 0.2, -100, 0, 0.3);
      pop(q(".s15-f1 .s15-flecha"), SOLOS - 0.1);
      entra(q(".s15-f1 .s15-der"), SOLOS, 80, 0, 0.25);
      gsap.set(qa(".s15-r"), { scaleX: 0, transformOrigin: "0% 50%" });
      tl.to(qa(".s15-r"), { scaleX: 1, duration: 0.18, stagger: 0.12, ease: "power2.out" }, PLANILLA);
      pop(".s15-ok1", PLANILLA + 0.45, 0.25);
      // 2) el stock se actualiza solo
      entra(q(".s15-f2 .s15-izq"), STOCK - 0.4, -100, 0, 0.3);
      pop(q(".s15-f2 .s15-flecha"), STOCK - 0.1);
      entra(q(".s15-f2 .s15-der"), STOCK, 80, 0, 0.25);
      gsap.set(q(".s15-n10"), { opacity: 0 });
      tl.to(q(".s15-n12"), { y: -40, opacity: 0, duration: 0.15 }, SOLO - 0.1);
      tl.fromTo(q(".s15-n10"), { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.15, immediateRender: false }, SOLO - 0.05);
      pop(".s15-ok2", SOLO + 0.1, 0.25);
      // 3) el cliente recibe su aviso
      entra(q(".s15-f3 .s15-izq"), CLIENTE - 0.3, -100, 0, 0.3);
      pop(q(".s15-f3 .s15-flecha"), CLIENTE);
      entra(q(".s15-f3 .s15-der"), AVISO - 0.25, 80, 0, 0.25);
`;
export const SFX = [
  { t: 0.0, sfx: "sparkle", vol: 0.3 },
  { t: 1.75, sfx: "whoosh-short", vol: 0.22 },
  { t: 2.95, sfx: "pop", vol: 0.3 },
  { t: 3.85, sfx: "ping", vol: 0.3 },
  { t: 4.0, sfx: "whoosh-short", vol: 0.22 },
  { t: 5.0, sfx: "ping", vol: 0.3 },
  { t: 6.1, sfx: "notification", vol: 0.32 },
];
