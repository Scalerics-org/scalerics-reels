# Fuentes de caso-duolingo (verificadas el 04-11-2026)

Nota: blog.duolingo.com y research.duolingo.com no se pudieron abrir desde la nube (el proxy no
resuelve esos dominios); el contenido se verificó con WebSearch (títulos y resúmenes de las páginas)
y con fuentes independientes.

- "¿Por qué Duolingo te recuerda todos los días que practiques?" / "te avisa cada día".
  Duolingo manda recordatorios diarios para practicar ("practice reminders") por notificación push.
  - Duolingo (blog oficial), "Hi, it's Duo: the AI behind the meme":
    https://blog.duolingo.com/hi-its-duo-the-ai-behind-the-meme/
  - Paper de Duolingo en KDD 2020 (ACM), Kevin P. Yancey y Burr Settles, "A Sleeping, Recovering
    Bandit Algorithm for Optimizing Recurring Notifications" ("used to successfully optimize
    millions of daily reminders"): https://research.duolingo.com/papers/yancey.kdd20.pdf ·
    resumen independiente: https://paperswithcode.com/paper/a-sleeping-recovering-bandit-algorithm-for
- "y te muestra la racha". La racha cuenta los días seguidos con al menos una lección; Duolingo la
  presenta como herramienta para armar el hábito.
  - https://blog.duolingo.com/how-duolingo-streak-builds-habit
  - https://blog.duolingo.com/improving-the-streak
- "Y midió millones de avisos para ver cuál te hace volver" / rótulo "Lo publicó en un estudio".
  El sistema elige qué recordatorio mandar a cada persona con un algoritmo de tipo "bandit", cuya
  recompensa es que la persona complete una lección; según Duolingo, analizaron unos 200 millones de
  recordatorios de unos 34-35 días, y publicaron el paper y los datos (el guion dice solo "millones").
  - Blog de Duolingo (arriba) y página de investigación con el dataset:
    https://research.duolingo.com/
  - Independiente: Vicki Boykis, "Duo, the Push, and the Bandits" (Normcore Tech):
    https://vicki.substack.com/p/duo-the-push-and-the-bandits
  - Independiente (resumen del paper): https://sotaverified.org/papers/a-sleeping-recovering-bandit-algorithm-for
- "Porque querer no alcanza: te olvidás." / "No te obliga. Te acuerda." / "Tu cliente también: no
  falta porque no quiere. Se olvida." Es la LECCIÓN del reel (interpretación), no un dato: Duolingo
  escribe que bajar las barreras para sostener un hábito diario importa más, al principio, que cuánto
  se estudia por día (https://blog.duolingo.com/putting-in-work-the-habit-of-language-learning).
  No se presenta como estadística.
- Lo que el guion NO dice (no confirmado o sin fuente sólida): cifras de retención o de crecimiento
  de usuarios, el "23,5 horas después de tu última lección" que circula en blogs (no hay fuente de
  Duolingo), que fue "el primero", ni resultados porcentuales. Los textos de las notificaciones del
  reel ("¿Practicamos hoy?", etc.) son genéricos, inventados para el dibujo, no copiados de la app.
- Parte de la pyme (turno, cuota, seña, aviso un día antes, automático): es lo que ofrece Scalerics
  (automatizaciones de recordatorios), no un dato externo.
