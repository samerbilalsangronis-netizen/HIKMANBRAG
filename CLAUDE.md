# Estudio de motion graphics · Hikman Capital

Videos verticales para la cuenta de Instagram de Hikman Capital (análisis económico y mercados), estilo "Toro vs. Oso". El prompt completo con el estilo, la voz y el flujo de trabajo está en `docs/prompts-maestros/hikman-capital.md`: léelo antes de cualquier pieza. El usuario no programa; explícale todo en español sencillo.

## Estructura

- `assets/hikman/` logo (blanco y navy), `toro.png` y `oso.png`; `assets/fonts/` Barlow Condensed y JetBrains Mono.
- `datos/hikman/` un JSON por pieza.
- `docs/hikman/` investigación con fuentes y planes; `docs/prompts-maestros/` prompt maestro e instalación.
- `fuentes/` HTML de Hyperframes (`hk*.src.html`) para gancho, cuerpo y cierre.
- `tools/` kit de estilo (`hikman2-kit.*`, `hf-helpers.js`), `build_comp.py` y scripts de ensamblado.
- `hikman-datos/` proyecto de Remotion para los tramos con datos (`npm i` dentro antes de usarlo).
- `plantilla-hyperframes/` se copia en cada `out/<proyecto>/` antes de check y render.
- `out/` videos y renders; no se sube.

## Reglas del estudio

- Todo frame es una función pura del tiempo. Nada de setTimeout, transiciones que corran solas ni estado entre frames.
- Ruido solo con semilla, nunca Math.random.
- Esperar a que carguen las tipografías y las imágenes antes de capturar.
- Cada corrida escribe en su propia carpeta de salida.
- Una tipografía de display y una de lectura. Un solo color de acento (aquí el par toro/oso es el sistema de la marca).
- Cada 2 a 4 segundos tiene que pasar algo nuevo en pantalla.
- Se usa lo real; nunca se inventan pantallas, cifras ni testimonios.
- Plan antes de construir; esperar el visto bueno del usuario.
- Las llaves viven en `.env`.
