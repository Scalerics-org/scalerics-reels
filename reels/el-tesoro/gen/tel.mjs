import { C } from "./comun.mjs";
// el celular del sitio (s10 y s11): mismo lugar en las dos
export const telCss = `
  & .XX-tel { position: absolute; left: 300px; top: 700px; width: 480px; height: 790px; background: ${C.tinta}; border-radius: 56px; }
  & .XX-pant { position: absolute; left: 16px; top: 16px; right: 16px; bottom: 16px; background: #f8efd6; border-radius: 42px; overflow: hidden; font-family: "Lexend", sans-serif; color: ${C.tinta}; }
  & .XX-barra { position: absolute; left: 0; right: 0; top: 0; height: 120px; background: ${C.rojo}; color: ${C.perg}; padding: 36px 0 0 30px; font-weight: 800; font-size: 34px; }
  & .XX-barra small { display: block; font-weight: 500; font-size: 28px; opacity: 0.9; }
`;
