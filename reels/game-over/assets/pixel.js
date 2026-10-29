// Sprites de pixel art del reel "game-over": cada sprite es un mapa de letras (una por pixel) que se
// convierte en un <svg> de rectángulos. Uso en una escena: <div class="px" data-sprite="jugadora"
// data-px="14"></div> y, en el script, PX.llenar(root) antes de armar el timeline.
window.PX = window.PX || (function () {
  const COL = { K: "#07051a", W: "#f4f1e6", C: "#38e8ff", M: "#ff3d8b", Y: "#ffd23f", V: "#120a2e", G: "#5ce611", D: "#2a1a63" };
  const MAPAS = {
    jugadora: [
      "....YYYYY.....",
      "...YYYYYYY....",
      "..YYWWWWWYY...",
      "..YWWKWWKWY.YY",
      "..YWWKWWKWYYY.",
      "..YWWWWWWWY.Y.",
      "...YWWMMWWY...",
      "....WWWWW.....",
      "..MMMMMMMMM...",
      ".MMMMMYMMMMM..",
      ".WMMMMYMMMMW..",
      ".WMMMMYMMMMW..",
      "..MMMMYMMMM...",
      "..CCCCCCCCC...",
      "..CCCC.CCCC...",
      "..CCC...CCC...",
      "..CCC...CCC...",
      "..WWW...WWW...",
      ".WWWW...WWWW..",
    ],
    jugadoraB: [
      "....YYYYY.....",
      "...YYYYYYY....",
      "..YYWWWWWYY...",
      "..YWWKWWKWY.YY",
      "..YWWKWWKWYYY.",
      "..YWWWWWWWY.Y.",
      "...YWWMMWWY...",
      "....WWWWW.....",
      "..MMMMMMMMM...",
      ".MMMMMYMMMMM..",
      ".WMMMMYMMMMW..",
      ".WMMMMYMMMMW..",
      "..MMMMYMMMM...",
      "..CCCCCCCCC...",
      "..CCCC.CCCC...",
      ".CCC.....CCC..",
      "CCC.......CCC.",
      "WWW.......WWW.",
      "WWW.......WWW.",
    ],
    // enojada: cejas para abajo, boca recta
    jugadoraE: [
      "....YYYYY.....",
      "...YYYYYYY....",
      "..YYWWWWWYY...",
      "..YWKWWWKWY.YY",
      "..YWWKWKWWYYY.",
      "..YWWWWWWWY.Y.",
      "...YWKKKKWY...",
      "....WWWWW.....",
      "..MMMMMMMMM...",
      ".MMMMMYMMMMM..",
      ".WMMMMYMMMMW..",
      ".WMMMMYMMMMW..",
      "..MMMMYMMMM...",
      "..CCCCCCCCC...",
      "..CCCC.CCCC...",
      "..CCC...CCC...",
      "..CCC...CCC...",
      "..WWW...WWW...",
      ".WWWW...WWWW..",
    ],
    corazon: [".MM.MM.", "MMWMMMM", "MWMMMMM", "MMMMMMM", ".MMMMM.", "..MMM..", "...M..."],
    corazonV: [".WW.WW.", "W..W..W", "W.....W", "W.....W", ".W...W.", "..W.W..", "...W..."],
    corazonG: [".GG.GG.", "GGWGGGG", "GWGGGGG", "GGGGGGG", ".GGGGG.", "..GGG..", "...G..."],
    moneda: ["..YYYY..", ".YYWYYY.", "YYWYYYYY", "YYWYYYKY", "YYWYYYKY", "YYYYYYKY", ".YYYYYY.", "..YYYY.."],
    campera: [
      "....WWW.WWW....",
      "..WWDDWWWDDWW..",
      ".WDDDDDYDDDDDW.",
      "WDDDDDDYDDDDDDW",
      "WDDKDDDYDDDKDDW",
      "WDDKDDDYDDDKDDW",
      "WDDKDDDYDDDKDDW",
      "WDDKDDDYDDDKDDW",
      "WDDKYYDYDYYKDDW",
      "WWWKDDDYDDDKWWW",
      "...WDDDYDDDW...",
      "...WDDDYDDDW...",
      "...WWWWWWWWW...",
    ],
    tilde: ["......W", ".....WW", "W...WW.", "WW.WW..", ".WWW...", "..W...."],
    tildeK: ["......K", ".....KK", "K...KK.", "KK.KK..", ".KKK...", "..K...."],
    tildeC: ["......C", ".....CC", "C...CC.", "CC.CC..", ".CCC...", "..C...."],
    tildeG: ["......G", ".....GG", "G...GG.", "GG.GG..", ".GGG...", "..G...."],
    calavera: ["..WWWWW..", ".WWWWWWW.", "WWWWWWWWW", "WKKWWWKKW", "WKKWWWKKW", "WWWWKWWWW", ".WWWWWWW.", "..W.W.W..", "..WWWWW.."],
    flecha: ["...W...", "..WWW..", ".WWWWW.", "WWWWWWW", "..WWW..", "..WWW..", "..WWW.."],
    estrella: ["...Y...", "...Y...", "YYYYYYY", ".YYYYY.", "..YYY..", ".YY.YY.", "Y.....Y"],
  };
  function svg(nombre, px) {
    const m = MAPAS[nombre];
    if (!m) return "";
    const w = Math.max(...m.map((f) => f.length)), h = m.length;
    let r = "";
    m.forEach((fila, y) => {
      let x = 0;
      while (x < fila.length) {
        const c = fila[x];
        if (c === ".") { x++; continue; }
        let n = 1;
        while (fila[x + n] === c) n++;
        r += `<rect x="${x}" y="${y}" width="${n}" height="1" fill="${COL[c]}"/>`;
        x += n;
      }
    });
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w * px}" height="${h * px}" shape-rendering="crispEdges" style="display:block">${r}</svg>`;
  }
  function llenar(root) {
    root.querySelectorAll("[data-sprite]").forEach((el) => {
      el.innerHTML = svg(el.dataset.sprite, Number(el.dataset.px || 10));
    });
  }
  return { COL, MAPAS, svg, llenar };
})();
