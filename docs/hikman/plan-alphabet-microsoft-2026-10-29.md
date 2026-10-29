# Hikman Capital · Alphabet vs. Microsoft: quién paga la IA (plan, pendiente de visto bueno)

Estilo "Toro vs. Oso" (1080×1920, 30 fps), voz Andre (Higgsfield). Duración ≈ 75 s.
Investigación: `docs/hikman/investigacion-alphabet-microsoft-2026-10-29.md`.

## Ángulo
"La misma apuesta por la IA, dos cajas distintas." Alphabet gasta más de lo que ingresa en caja y cae; Microsoft se la paga sola y sube. El mercado empieza a cobrar por la financiación, y eso llega al FX.

## Guion de voz (una frase por archivo, ≈ 165 palabras)
1. Gancho: "Menos diez por ciento. Más cuatro por ciento. Misma apuesta por la inteligencia artificial."
2. "Buenos días, inversor. Los resultados de ayer tras el cierre trajeron una nueva fuente de volatilidad."
3. "Alphabet cayó cerca de un diez por ciento después del cierre."
4. "Sus ingresos, ciento veintisiete mil seiscientos millones de dólares, estuvieron en línea con lo esperado."
5. "Pero el beneficio decepcionó: dos coma doce dólares por acción, frente a tres coma cero dos esperados."
6. "Y el mercado se fijó en la inversión: cincuenta y un mil millones en un trimestre, más del doble que hace un año."
7. "Resultado: una salida de caja de unos nueve mil millones de dólares."
8. "Microsoft, en cambio, generó dieciocho mil seiscientos millones de flujo de caja libre."
9. "Y sus acciones subieron alrededor de un cuatro por ciento."
10. "¿Por qué importa para el mercado de divisas?"
11. "La inversión en inteligencia artificial sostiene buena parte del crecimiento de Estados Unidos."
12. "Pero exige mucha financiación."
13. "Y el mercado empieza a separar a quien la paga con su propia caja de quien necesita endeudarse más caro."
14. "Una corrección tecnológica fuerte podría aumentar la demanda de liquidez y de activos defensivos."
15. Cierre: "Ese es el resumen de hoy."

## Escenas
| # | Tiempo aprox. | Escena | Herramienta |
|---|---|---|---|
| 1 | 0–5 s | Gancho: golpes de cifras gigantes, una por frase: **−10,4%** en rojo (GOOGL) y **+4%** en verde (MSFT), con un destello en cada corte | Hyperframes |
| 2 | 5–11 s | Saludo y agenda en terminal: `01 ALPHABET · 02 MICROSOFT · 03 ¿POR QUÉ IMPORTA PARA FX?` | Hyperframes |
| 3 | 11–17 s | **TEMA 1/3 · ALPHABET**, ficha `GOOGL`. Marcador: −10,42% tras el cierre (322,22 → 288,35) | Remotion |
| 4 | 17–23 s | Ingresos: 127.577 M$ real vs. 127.220 M$ esperado. Dos barras casi iguales, sello "EN LÍNEA" | Remotion |
| 5 | 23–29 s | BPA: 2,12 $ real vs. 3,02 $ esperado vs. 2,87 $ anterior. Barra esperada como raya, la real queda corta | Remotion |
| 6 | 29–35 s | Capex: 23.953 M$ (3T 2025) → 51.355 M$ (3T 2026), la barra se duplica | Remotion |
| 7 | 35–41 s | La caja: barra de flujo operativo 42.290 M$ contra capex 51.355 M$. El hueco se pinta en rojo: **−9.065 M$**. La Balanza va a oso | Remotion |
| 8 | 41–42 s | Vela verde | Remotion |
| 9 | 42–50 s | **TEMA 2/3 · MICROSOFT**, ficha `MSFT`. Flujo operativo 58.000 − inversión 39.367 = **+18.633 M$**; luego reacción ≈ +4%. La Balanza va a toro | Remotion |
| 10 | 50–51 s | Vela roja | Remotion |
| 11 | 51–68 s | **TEMA 3/3 · ¿POR QUÉ IMPORTA PARA FX?**, ficha `FX`. Dos columnas: "SE PAGA CON SU CAJA" (MSFT +18,6) / "NECESITA FINANCIARSE" (GOOGL −9,1). Rótulo: bonos de las 5 grandes tecnológicas ≈ 220.000 M$ en 2026 (hasta el 10 de agosto). Final: "CORRECCIÓN → LIQUIDEZ Y DEFENSIVOS". La Balanza va a oso | Remotion |
| 12 | 68–75 s | Cierre: "Ese es el resumen de hoy", logo, "CONTENIDO EDUCATIVO · NO ES ASESORÍA FINANCIERA" | Hyperframes |

- **Frase de la voz** en y 1290 en cada escena; palabras clave en `<em>`: "DECEPCIONÓ" y "SALIDA DE CAJA" en rojo, "FLUJO LIBRE" en verde, "LIQUIDEZ" en rojo.
- **Balanza Hikman:** aquí mide el apetito por riesgo de cada tema: Alphabet hacia oso (+0,7), Microsoft hacia toro (−0,6) y FX hacia oso (+0,5).
- **Fuente** en Mono 18 px: "Fuente: Alphabet y Microsoft (8-K, 28 oct 2026) · CNBC · Reuters".

## Pendiente de confirmar
- **Microsoft:** ¿"alrededor de un 4%" (CNBC) o el ~3% de tu texto? Las fuentes van del 2,7% al 5% según la hora.
- **Cifra de bonos (220.000 M$):** ¿la incluimos en el tema 3? Es un dato extra mío para "exige mucha financiación".
- **Tarjeta "Próxima publicación":** ¿la añadimos al cierre?

## Decisiones del usuario (29.10)
- Microsoft: "alrededor de un 4%". Sin el dato de los bonos. Cierre con "Próxima publicación: los tipos de interés".

## Entregado
- `out/ia-2026-10-29/hikman-ia-2026-10-29.mp4`, 87 s, −14,6 LUFS. Gancho y cierre en Hyperframes (`fuentes/ia-*.src.html`), datos en Remotion (`Resultados`), ensamblado con `tools/ensamblar_tramos.py`.
- Textos de pantalla míos (no son datos): "Dos cajas distintas", "Motor del crecimiento de EE. UU.", "Dinero que busca refugio", "Activos de menor riesgo", "Caja propia vs. deuda cara".
- Dato extra en pantalla: Alphabet + Microsoft ≈ 90.700 M$ de inversión en un trimestre (51.355 + 39.367, de los 8-K).
