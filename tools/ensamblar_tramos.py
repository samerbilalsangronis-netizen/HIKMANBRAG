"""Ensambla una pieza Hikman de tres tramos (gancho Hyperframes, datos Remotion, cierre Hyperframes) con su voz.
Uso: python3 tools/ensamblar_tramos.py <datos.json> <carpeta_frases> <carpeta_tramos> <salida.mp4>
Tramos esperados: brag.mp4 (0 -> remotion.inicio), datos.mp4 (remotion.inicio -> remotion.fin), cierre.mp4 (remotion.fin -> duracion).
La voz se arma con las frases colocadas segun "voz" del JSON (tiempos globales) y se normaliza a -14 LUFS."""
import json, subprocess, sys
from pathlib import Path

S = json.loads(Path(sys.argv[1]).read_text())
FR, V, OUT = Path(sys.argv[2]), Path(sys.argv[3]), sys.argv[4]
FPS = 30
r = S["remotion"]
tramos = [("brag.mp4", 0.0, r["inicio"]), ("datos.mp4", r["inicio"], r["fin"]), ("cierre.mp4", r["fin"], S["duracion"])]
ins, filt = [], []
for k, (f, a, b) in enumerate(tramos):
    ins += ["-i", str(V / f)]
    n = round((b - a) * FPS)
    # tpad por si un tramo sale un frame corto
    filt.append(f"[{k}:v]fps={FPS},tpad=stop_mode=clone:stop=30,trim=start_frame=0:end_frame={n},setpts=PTS-STARTPTS,format=yuv420p[v{k}]")
filt.append("".join(f"[v{k}]" for k in range(len(tramos))) + f"concat=n={len(tramos)}:v=1:a=0[v]")
base = len(tramos)
for j, (nombre, t) in enumerate(S["voz"]):
    ins += ["-i", str(FR / f"{nombre}.wav")]
    ms = int(t * 1000)
    filt.append(f"[{base + j}:a]adelay={ms}|{ms}[a{j}]")
filt.append("".join(f"[a{j}]" for j in range(len(S["voz"]))) + f"amix=inputs={len(S['voz'])}:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=9,apad=whole_dur={S['duracion']}[a]")
subprocess.run(["ffmpeg", "-y", "-nostdin", "-loglevel", "error", *ins, "-filter_complex", ";".join(filt), "-map", "[v]", "-map", "[a]",
                "-c:v", "libx264", "-crf", "18", "-preset", "medium", "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-t", str(S["duracion"]),
                "-movflags", "+faststart", OUT], check=True)
print("ok", OUT)
