# Kit de Hikman Capital

Descomprime esta carpeta en la raíz del repositorio nuevo, conservando las carpetas, y haz commit.

- `tools/`: kit de estilo "Toro vs. Oso" para Hyperframes (`hikman2-kit.*`) y resortes (`hf-helpers.js`).
  - `build_comp.py` arma un proyecto: `python3 tools/build_comp.py fuentes/<x>.src.html out/<carpeta>`.
  - `ensamblar_semana.py` ensambla el informe semanal y su voz.
- `hikman-datos/`: proyecto de Remotion (Divisa, Pmi, Bienvenida, Portada…). Correr `npm i` dentro antes de usarlo.
- `fuentes/hk*.src.html`: gancho, cuerpo y cierre de los informes, para usar como modelo.
- `datos/hikman/` y `docs/hikman/`: JSON de ejemplo, investigaciones con fuentes y planes.
- `assets/hikman/` (logo, toro y oso) y `assets/fonts/` (Barlow Condensed, JetBrains Mono).
- `plantilla-hyperframes/`: archivos que se copian en cada carpeta `out/<proyecto>/` antes de hacer check y render.
