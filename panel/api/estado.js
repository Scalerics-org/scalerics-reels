// La última corrida del workflow de publicación, para que el panel muestre en qué va.
import { REPO, exigirSesion, gh } from "./_lib.js";

export default async function handler(req, res) {
  if (!exigirSesion(req, res)) return;
  try {
    const j = await (await gh(`/repos/${REPO}/actions/workflows/publicar.yml/runs?per_page=1&event=workflow_dispatch`)).json();
    const r = j.workflow_runs?.[0];
    res.json(r ? { estado: r.status, resultado: r.conclusion, creado: r.created_at } : {});
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
