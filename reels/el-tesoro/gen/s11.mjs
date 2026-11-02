import { escena, sfx, duraciones, C } from "./comun.mjs";
import { telCss } from "./tel.mjs";
const id = "s11-google", dur = duraciones()[id];
escena({ id, dur,
  css: telCss + `
    & .XX-busca { position: absolute; left: 24px; top: 30px; right: 24px; height: 76px; border: 4px solid ${C.tinta}; border-radius: 40px; background: #fff8e6; padding: 18px 0 0 74px; font-size: 28px; font-weight: 500; white-space: nowrap; overflow: hidden; }
    & .XX-lupa { position: absolute; left: 22px; top: 18px; width: 30px; height: 30px; border: 5px solid ${C.tinta}; border-radius: 50%; }
    & .XX-lupa::after { content: ""; position: absolute; left: 24px; top: 26px; width: 16px; height: 5px; background: ${C.tinta}; transform: rotate(45deg); }
    & .XX-res { position: absolute; left: 24px; top: 132px; right: 24px; padding: 20px 24px; border: 4px solid ${C.tinta}; border-radius: 22px; background: ${C.perg}; box-shadow: 0 0 0 8px ${C.oro}; }
    & .XX-res b { display: block; font-size: 32px; font-weight: 800; }
    & .XX-res span { display: block; margin-top: 6px; font-size: 30px; color: ${C.oro}; -webkit-text-stroke: 1.5px ${C.tinta}; letter-spacing: 0.1em; }
    & .XX-res i { display: inline-block; margin-top: 8px; font-style: normal; font-size: 28px; font-weight: 600; color: ${C.perg}; background: ${C.mar}; border-radius: 14px; padding: 4px 14px; }
    & .XX-carga { position: absolute; left: 24px; right: 24px; top: 330px; height: 14px; border-radius: 7px; background: ${C.perg2}; overflow: hidden; }
    & .XX-carga div { width: 100%; height: 100%; background: ${C.oro}; }
    & .XX-fila { position: absolute; left: 24px; right: 24px; height: 84px; display: flex; align-items: center; gap: 18px; font-size: 30px; font-weight: 600; border-bottom: 3px solid ${C.perg2}; }
    & .XX-ico { width: 56px; height: 56px; border-radius: 50%; border: 4px solid ${C.tinta}; flex: none; position: relative; }
    & .XX-boton { position: absolute; left: 24px; right: 24px; top: 610px; height: 110px; border-radius: 56px; background: ${C.oro}; border: 5px solid ${C.tinta}; box-shadow: 0 8px 0 ${C.tinta}; text-align: center; padding-top: 18px; font-size: 30px; font-weight: 800; line-height: 1.1; }
    & .XX-rapido { position: absolute; left: 70px; top: 1000px; font-size: 64px; color: ${C.oro}; -webkit-text-stroke: 7px ${C.tinta}; paint-order: stroke fill; transform: rotate(-10deg); }
  `,
  body: `
        <div class="XX-tel"><div class="XX-pant">
          <div class="XX-busca"><div class="XX-lupa"></div><span class="XX-txt">pizzería fugazzeta cerca</span></div>
          <div class="XX-res"><b>Pizzería Doña Rosa</b><span>★★★★★</span><i>Abierto</i></div>
          <div class="XX-carga"><div></div></div>
          <div class="XX-fila XX-f1" style="top:370px"><div class="XX-ico" style="background:${C.perg}"><svg viewBox="0 0 56 56" style="position:absolute;left:-4px;top:-4px;width:56px;height:56px"><path d="M28 14 V28 L38 34" fill="none" stroke="${C.tinta}" stroke-width="5" stroke-linecap="round" /></svg></div>Hoy: de 19 a 24 h</div>
          <div class="XX-fila XX-f2" style="top:470px"><div class="XX-ico" style="background:${C.rojo}"><svg viewBox="0 0 56 56" style="position:absolute;left:-4px;top:-4px;width:56px;height:56px"><path d="M28 44 C18 32 16 26 16 22 a12 12 0 0 1 24 0 c0 4 -2 10 -12 22 Z" fill="${C.perg}" stroke="${C.tinta}" stroke-width="3" /></svg></div>Cómo llegar</div>
          <div class="XX-boton">Escribinos<br />por WhatsApp</div>
        </div></div>
        <div class="XX-rapido mano">¡al toque!</div>
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <path class="XX-rayo tinta" fill="${C.oro}" d="M200 820 L120 960 H180 L140 1080 L260 910 H196 L240 820 Z" />
          <g class="XX-dedo"><circle class="XX-onda" fill="none" stroke="${C.oro}" stroke-width="8" cx="660" cy="1390" r="40" /><path class="tinta" fill="${C.piel}" d="M640 1380 C640 1360 680 1360 680 1380 L686 1530 H634 Z" /></g>
        </svg>
  `,
  js: `
const ENCUENTRAN = 0.34, GOOGLE = 0.85, ABRE = 1.59, RAPIDO = 1.78, CELULAR = 2.29, HORARIOS = 3.31, UBICACION = 3.99, BOTON = 4.83, WHATS = 5.51;
// cuadro 0: el celular ya está; se escribe la búsqueda
tl.fromTo(q(".XX-tel"), { scale: 0.96, transformOrigin: "50% 50%" }, { scale: 1, transformOrigin: "50% 50%", duration: 0.3 }, 0);
gsap.set(q(".XX-txt"), { clipPath: "inset(0 100% 0 0)" });
tl.to(q(".XX-txt"), { clipPath: "inset(0 0% 0 0)", duration: 0.7, ease: "steps(12)" }, 0.05);
// "en Google": primer resultado, Doña Rosa
gsap.set(q(".XX-res"), { opacity: 0 });
tl.fromTo(q(".XX-res"), { opacity: 0, y: 40, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "back.out(2)", immediateRender: false }, GOOGLE - 0.1);
tl.to(q(".XX-res"), { scale: 1.05, duration: 0.14, yoyo: true, repeat: 1 }, GOOGLE + 0.3);
// "abre rápido": rayo y barra de carga instantánea
pop(q(".XX-rayo"), ABRE - 0.05, 0.3);
tl.to(q(".XX-rayo"), { rotation: -8, transformOrigin: "50% 50%", duration: 0.1, yoyo: true, repeat: 5 }, ABRE + 0.3);
tl.fromTo(q(".XX-carga div"), { scaleX: 0, transformOrigin: "0% 50%" }, { scaleX: 1, transformOrigin: "0% 50%", duration: 0.35, ease: "power4.out" }, RAPIDO);
pop(q(".XX-rapido"), RAPIDO + 0.1, 0.5);
tl.to(q(".XX-tel"), { y: -12, duration: 0.1, yoyo: true, repeat: 1 }, CELULAR);
tl.to([q(".XX-rayo"), q(".XX-rapido")], { opacity: 0, duration: 0.25 }, HORARIOS - 0.3);
// "horarios", "ubicación"
[[".XX-f1", HORARIOS], [".XX-f2", UBICACION]].forEach(([s, t]) => {
  gsap.set(q(s), { opacity: 0 });
  tl.fromTo(q(s), { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 0.28, ease: "back.out(2)", immediateRender: false }, t - 0.1);
  tl.to(q(s + " .XX-ico"), { scale: 1.25, duration: 0.12, yoyo: true, repeat: 1 }, t + 0.2);
});
// "botón directo a WhatsApp": el dedo lo toca
pop(q(".XX-boton"), BOTON - 0.1, 0.5);
gsap.set(q(".XX-dedo"), { opacity: 0 });
tl.fromTo(q(".XX-dedo"), { opacity: 1, y: 300 }, { opacity: 1, y: 0, duration: 0.35, ease: "power3.out", immediateRender: false }, WHATS - 0.4);
tl.to(q(".XX-boton"), { y: 6, scale: 0.96, duration: 0.08, yoyo: true, repeat: 1 }, WHATS);
gsap.set(q(".XX-onda"), { opacity: 0 });
tl.fromTo(q(".XX-onda"), { opacity: 1, scale: 0.5, transformOrigin: "50% 50%" }, { opacity: 0, scale: 2.4, transformOrigin: "50% 50%", duration: 0.5, immediateRender: false }, WHATS);
`,
});
sfx(id, [{ t: 0.05, sfx: "typing", vol: 0.25, max: 0.7 }, { t: 0.8, sfx: "ping", vol: 0.3 }, { t: 1.55, sfx: "whoosh-short", vol: 0.3 }, { t: 3.25, sfx: "pop", vol: 0.25 }, { t: 3.95, sfx: "pop", vol: 0.25 }, { t: 4.8, sfx: "pop", vol: 0.3 }, { t: 5.5, sfx: "click", vol: 0.35 }]);
