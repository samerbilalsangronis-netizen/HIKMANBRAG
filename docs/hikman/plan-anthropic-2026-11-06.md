# Anthropic: crecer no basta · Hikman Capital

Petición: crear el video completo sobre la infografía, manteniendo el estilo del repositorio. Se desarrolla la pieza completa con ese alcance.

Ángulo: contrastar la tracción comercial con el tamaño y el calendario de los compromisos. El dominó se presenta como escenario condicional, sin afirmar insolvencia.

## Referencias y decisiones
- Identidad: docs/prompts-maestros/hikman-capital.md; fuentes/ia-brag.src.html, ia-cierre.src.html; kit2.tsx y Resultados.tsx.
- Brag estructura el gancho y el cierre; Hyperframes los anima; Remotion dibuja los datos; ffmpeg ensambla y mezcla.
- La duración de esta pieza supera el Brag corto porque se solicitó un informe como los existentes (el de IA duró 87 s). Se prioriza voz pausada y lectura móvil.
- Voz Andre, ElevenLabs vía Higgsfield, una frase por archivo. Estimación total 4,65 créditos.
- Los logos, toro, oso y fuentes son los originales del repositorio.

LOOK: 1080×1920, 30 fps; carbón #0c0d0f, hueso #f2efe9, gris #8b9098, toro #2fbf71, oso #e5484d. Barlow Condensed 800/600 y JetBrains Mono. Retícula 72 px, cabecera y78, frase y1290, fuente y1488, balanza y1540. Transiciones vela de 0,32/0,34 s. Títulos 80–140 px, cifras 100–180 px.

BANNED: logo recreado, cifras inventadas, contador con dígitos falsos, pantallas simuladas, dictamen de inversión y veredicto final.

## Nueve respuestas Brag adaptadas al informe
1. Estudio de análisis financiero en videos para Hikman Capital.
2. El contraste de ingresos trimestrales con compromisos plurianuales; explicitar horizontes distintos.
3. Cifras de terminal y balanza Toro vs. Oso.
4. Marca, tipografías y diseño reales del estudio; datos primarios de la SEC.
5. Duración determinada por las trece frases de voz; un informe legible.
6. Polished: análisis sobrio, pausado, de riesgos y fortalezas.
7. Voz principal, cama musical tenue y efectos discretos; sin ritmo inventado.
8. Caption: Anthropic crece con fuerza. El reto es convertir esa demanda en margen suficiente para financiar una infraestructura gigantesca.
9. Gancho → datos → mecanismo del riesgo → fortalezas → pregunta, no consejo de inversión.

## Escenas
| Tiempo | Escena | Motor |
|---|---|---|
| 0.00–5.70 s | Gancho · ingresos gigantes | Hyperframes |
| 5.70–12.10 s | Gancho · compromisos gigantes | Hyperframes |
| 12.10–20.53 s | Saludo y agenda | Hyperframes |
| 20.53–28.90 s | Desaceleración · +144% → +47% | Remotion |
| 28.90–38.13 s | Computación · 9.863 M$ / 58% | Remotion |
| 38.13–44.30 s | Resultado operativo · +974 → −567 M$ | Remotion |
| 44.30–52.23 s | Plazo de compromisos · 69.800 M$ / 12 meses | Remotion |
| 52.23–59.23 s | Efecto dominó · demanda → ingresos | Remotion |
| 59.23–68.13 s | Efecto dominó · margen → financiación | Remotion |
| 68.13–77.37 s | Fortaleza · liquidez 146.600 M$ | Remotion |
| 77.37–83.43 s | Fortaleza · flujo operativo +6.600 M$ | Remotion |
| 83.43–90.67 s | Pregunta clave · margen después de financiar | Remotion |
| 90.67–94.93 s | Cierre · logo y nota educativa | Hyperframes |

## Guion
1. Dieciséis mil novecientos cincuenta y seis millones de dólares en ingresos trimestrales.
2. Ochocientos noventa y cinco mil cuatrocientos millones en compromisos de infraestructura.
3. Buenos días, inversor. Anthropic crece con fuerza, pero su apuesta exige mirar más allá de las ventas.
4. Los ingresos crecieron un cuarenta y siete por ciento trimestral. Antes, habían crecido un ciento cuarenta y cuatro por ciento.
5. La computación y la infraestructura costaron nueve mil ochocientos sesenta y tres millones: un cincuenta y ocho por ciento de los ingresos.
6. El trimestre cerró con una pérdida operativa de quinientos sesenta y siete millones de dólares.
7. De los compromisos de infraestructura, sesenta y nueve mil ochocientos millones vencen en los próximos doce meses.
8. Si la demanda decepciona, los ingresos pueden frenarse mientras los compromisos siguen llegando.
9. Eso podría comprimir los márgenes y aumentar la necesidad de financiación. Es un escenario de riesgo, no una predicción.
10. También hay fortalezas: ciento cuarenta y seis mil seiscientos millones de liquidez, incluyendo inversiones y crédito disponible.
11. Y seis mil seiscientos millones de flujo de caja operativo positivo en nueve meses.
12. La pregunta clave es cuánto margen queda después de pagar la computación y financiar la expansión.
13. Ese es el resumen de hoy. Hikman Capital.

## Validación de producción
- Hyperframes: gancho y cierre sin errores de lint, ejecución, geometría ni contraste; 62 y 46 comprobaciones de texto respectivamente.
- Remotion: revisión de fotogramas por escena y TypeScript sin errores. Se redujo el espacio de la escena de caja para evitar que una nota invadiera la frase principal.
- La transcripción local por palabra no estaba disponible (`whisper_unavailable`). Los tiempos se basan en la duración medida de cada archivo de voz, con un pequeño ajuste uniforme de velocidad; no se afirma alineación automática por palabra.
- La sincronía musical no modifica los tiempos de voz. Efectos colocados en los cortes reales.
- Coste de voz confirmado: 4,65 créditos. Saldo: 136,36 → 131,71. Una solicitud limitada por tasa no creó generación ni consumió créditos; se completó después.
- Música: Sascha Ende · Happy Beats / Business Moves Vol.12 · ende.app · CC BY 4.0. Crédito en anthropic-publicacion.txt.
- Textos editoriales originales: gancho, frases de lectura, pregunta final y conexión condicional del dominó. Las cifras proceden del S-1/A.
