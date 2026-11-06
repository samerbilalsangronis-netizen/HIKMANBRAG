"""Prepara los tramos Hyperframes y las voces del informe Anthropic.

Uso: python3 tools/preparar_anthropic.py /ruta/a/gsap.min.js
Después: check y render en out/anthropic-2026-11-06/{gancho,cierre}.
Los originales HTML se conservan en fuentes/anthropic-2026-11-06/.
"""
from pathlib import Path
import json
import re
import shutil
import subprocess
import sys

R = Path(__file__).resolve().parent.parent
D = json.loads((R / "datos/hikman/anthropic-2026-11-06.json").read_text())
OUT = R / "out/anthropic-2026-11-06"
GSAP = Path(sys.argv[1])
CSS = (R / "tools/hikman2-kit.css").read_text() + """
*{box-sizing:border-box;margin:0;padding:0}html,body{width:1080px;height:1920px;overflow:hidden;background:#0c0d0f;color:#f2efe9}
#root{position:absolute;inset:0;overflow:hidden}.full{position:absolute;inset:0}
.small{font:600 26px/1.3 'Mono';letter-spacing:2px;color:#8b9098;text-transform:uppercase}
.display{font:800 108px/.95 'Barlow';text-transform:uppercase}
.hero{position:absolute;left:72px;right:72px;top:460px}
.number{font:600 182px/1.15 'Mono';letter-spacing:-8px;white-space:nowrap}
.slot{position:absolute;left:72px;right:72px;height:118px;display:flex;align-items:center;border-bottom:2px solid rgba(242,239,233,.14);gap:30px}
.slot b{font:600 30px/1 'Mono';color:#8b9098}.slot span{font:800 67px/1 'Barlow';text-transform:uppercase}
"""


def scene(sid, body, js):
    scene_css = re.sub(r"html,body\{[^}]*\}", "", CSS)
    return f'''<template><style>{scene_css}\n#root{{position:absolute;inset:0;background:transparent}}</style>
<div id="root" data-composition-id="{sid}" data-width="1080" data-height="1920">{body}</div>
<script>(()=>{{const tl=gsap.timeline({{paused:true}});{js}
window.__timelines['{sid}']=tl;}})();</script></template>'''


def make(part, dur, scenes):
    source = R / f"fuentes/anthropic-2026-11-06/{part}"
    comp = OUT / part
    source.mkdir(parents=True, exist_ok=True)
    (source / "compositions").mkdir(exist_ok=True)
    hosts = ""
    for sid, start, length, body, js in scenes:
        (source / f"compositions/{sid}.html").write_text(scene(sid, body, js))
        hosts += f'<div class="clip" id="{sid}" data-composition-id="{sid}" data-composition-src="compositions/{sid}.html" data-start="{start}" data-duration="{length}" data-track-index="1" data-track-kind="graphics" data-width="1080" data-height="1920"></div>\n'
    html = f'''<!doctype html><html lang="es" data-composition-variables='[{{"id":"color-ground","type":"color","label":"Fondo","default":"#0c0d0f"}},{{"id":"color-ink","type":"color","label":"Texto","default":"#f2efe9"}}]'>
<head><meta charset="utf-8"><script src="assets/gsap.min.js"></script><style>{CSS}</style></head><body>
<div id="root" data-composition-id="main" data-start="0" data-duration="{dur}" data-width="1080" data-height="1920">
<div class="k-fondo"></div><div class="k-reticula"></div>
<div class="k-barra"><img src="assets/hikman/logo-blanco.png" alt="Hikman Capital"><div class="k-pub"><b>ANTHROPIC · S-1</b><br>06.11.2026</div></div><div class="k-linea"></div>
{hosts}
<div class="k-balanza"><div class="k-tit">BALANZA HIKMAN</div><img class="k-ico" src="assets/hikman/toro.png" style="left:70px" alt="Toro"><img class="k-ico" src="assets/hikman/oso.png" style="right:70px" alt="Oso"><div class="k-pista"></div><div id="balance-marker" class="k-marca"></div><div class="k-lado" style="left:200px;color:var(--toro)">TORO</div><div class="k-lado" style="right:200px;color:var(--oso)">OSO</div></div>
<div class="small" style="position:absolute;top:1755px;width:100%;text-align:center;font-size:17px">LECTURA EDITORIAL · CONTENIDO EDUCATIVO</div>
</div><script>window.__timelines=window.__timelines||{{}};const t=gsap.timeline({{paused:true}});t.fromTo('#balance-marker',{{x:0}},{{x:85,duration:.7,ease:'power2.inOut'}},.2);window.__timelines.main=t;</script></body></html>'''
    (source / "index.html").write_text(html)
    shutil.copytree(source, comp, dirs_exist_ok=True)
    assets = comp / "assets"
    assets.mkdir(exist_ok=True)
    shutil.copy(GSAP, assets / "gsap.min.js")
    shutil.copytree(R / "assets/hikman", assets / "hikman", dirs_exist_ok=True)
    for font in (R / "assets/fonts").glob("*.woff2"):
        shutil.copy(font, assets / font.name)
    for file in ["hyperframes.json", "package.json"]:
        shutil.copy(R / "plantilla-hyperframes" / file, comp / file)


entrance = lambda id, at=0: f"tl.fromTo('{id}',{{opacity:0,y:55}},{{opacity:1,y:0,duration:.55,ease:'power4.out'}},{at});"
intro_end = D["remotion"]["inicio"]
scenes = []
for i, (value, color, text, note) in enumerate([
    ("16.956", "#2fbf71", "INGRESOS<br>TRIMESTRALES", "Q3 2026 · MILLONES DE DÓLARES"),
    ("895.400", "#e5484d", "COMPROMISOS<br>DE INFRAESTRUCTURA", "MILLONES DE DÓLARES · PLURIANUALES"),
]):
    x = D["escenas"][i]; sid = f"golpe{i+1}"
    body = f'''<div class="small" style="position:absolute;left:72px;top:290px">0{i+1} / ANTHROPIC · S-1</div>
<div class="hero" id="{sid}-hero"><div class="small">{note}</div><div id="{sid}-num" class="number" style="color:{color};margin-top:35px">{value}</div><div class="display" style="font-size:106px;margin-top:55px">{text}</div><div class="small" style="margin-top:45px">{'Ventas de un trimestre' if i == 0 else 'Pagos a lo largo de varios años'}</div></div>
<div class="k-frase" id="{sid}-phrase">{'CRECER' if i == 0 else 'CRECER'}<br><em style="color:{color}">{'CON FUERZA.' if i == 0 else 'TIENE UN COSTE.'}</em></div>
<div class="small" style="position:absolute;top:1488px;width:100%;text-align:center;font-size:18px">Fuente: Anthropic · S-1/A · SEC · 02.11.2026</div>'''
    js = entrance(f"#{sid}-hero", .05) + entrance(f"#{sid}-phrase", 1.6)
    js += f"tl.fromTo('#{sid}-num',{{scale:1.12}},{{scale:1,duration:.5,ease:'power4.out',transformOrigin:'0% 50%'}},.05);"
    scenes.append((sid, x["inicio"], round(x["fin"] - x["inicio"], 3), body, js))
x = D["escenas"][2]
body = '''<div class="display" id="saludo-title" style="position:absolute;left:72px;right:72px;top:420px;font-size:112px">BUENOS DÍAS,<br><span style="color:#2fbf71">INVERSOR.</span></div>
<div class="small" id="saludo-sub" style="position:absolute;left:72px;top:690px">ANTHROPIC · LA APUESTA POR LA IA</div>
<div id="agenda1" class="slot" style="top:780px"><b>01</b><span>CRECIMIENTO Y COSTES</span></div>
<div id="agenda2" class="slot" style="top:910px"><b>02</b><span>EL EFECTO DOMINÓ</span></div>
<div id="agenda3" class="slot" style="top:1040px"><b>03</b><span>FORTALEZAS Y RIESGOS</span></div>
<div id="saludo-phrase" class="k-frase">MIRAR MÁS ALLÁ<br>DE LAS <em style="color:#e5484d">VENTAS.</em></div>
<div id="vela" style="position:absolute;inset:0;background:#e5484d" data-layout-ignore></div>'''
js = entrance("#saludo-title", .1) + entrance("#saludo-sub", 1.5) + entrance("#agenda1", 2.4) + entrance("#agenda2", 3.6) + entrance("#agenda3", 4.8) + entrance("#saludo-phrase", 5.7)
js += f"tl.fromTo('#vela',{{scaleY:0,transformOrigin:'50% 100%'}},{{scaleY:1,duration:.32,ease:'power3.in'}},{x['fin']-x['inicio']-.32});"
scenes.append(("saludo", x["inicio"], round(x["fin"]-x["inicio"], 3), body, js))
make("gancho", intro_end, scenes)
end_duration = round(D["duracion"]-D["remotion"]["fin"], 3)
body = '''<div class="display" id="c-title" style="position:absolute;left:72px;right:72px;top:420px;text-align:center;font-size:104px">ESE ES EL RESUMEN<br>DE HOY.</div>
<img id="c-logo" src="assets/hikman/logo-blanco.png" alt="Hikman Capital" style="position:absolute;left:250px;top:740px;width:580px">
<div class="display" id="c-read" style="position:absolute;left:70px;right:70px;top:1200px;text-align:center;font-size:80px">CRECER TAMBIÉN<br>EXIGE <span style="color:#e5484d">FINANCIARSE.</span></div>
<div class="small" id="c-note" style="position:absolute;left:50px;right:50px;top:1445px;text-align:center;font-size:22px">CONTENIDO EDUCATIVO<br>NO ES ASESORÍA FINANCIERA</div>'''
make("cierre", end_duration, [("despedida", 0, end_duration, body, entrance("#c-title", 0)+entrance("#c-logo", .45)+entrance("#c-read", .9)+entrance("#c-note", 1.25))])
for x in D["escenas"]:
    # Ajuste pequeño y uniforme para conservar el tono pausado del canal.
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", str(OUT / f"voz/{x['i']:02}.mp3"), "-af", "atempo=0.93457944", "-ar", "48000", str(OUT / f"voz/{x['i']:02}.wav")], check=True)
print("Listo:", OUT)
