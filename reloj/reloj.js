export default {
  async scheduled(evento, env, ctx) {
    const r = await fetch("https://reels.scalerics.com/api/tic", { method: "POST", headers: { "x-reloj": env.RELOJ_TOKEN } });
    console.log("tic:", r.status, await r.text());
  },
};
