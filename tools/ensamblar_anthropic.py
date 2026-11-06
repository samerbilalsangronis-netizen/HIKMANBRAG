"""Ensambla el informe, mezcla su voz, música y cortes y fija la portada.

Requiere out/anthropic-2026-11-06/{brag,datos,cierre}.mp4, voz/00.wav…12.wav,
music.mp3 (Sascha Ende, Happy Beats / Business Moves Vol.12, CC BY 4.0)
y switch.ogg (efecto de interfaz incluido con Brag).
"""
import json
import subprocess
from pathlib import Path

R = Path(__file__).resolve().parent.parent
P = R / "out/anthropic-2026-11-06"
D = json.loads((R / "datos/hikman/anthropic-2026-11-06.json").read_text())
inputs = []
filters = []
spans = [("brag.mp4", 0, D["remotion"]["inicio"]), ("datos.mp4", D["remotion"]["inicio"], D["remotion"]["fin"]), ("cierre.mp4", D["remotion"]["fin"], D["duracion"])]
for i, (name, start, end) in enumerate(spans):
    inputs += ["-i", str(P / name)]
    frames = round((end - start) * 30)
    filters.append(f"[{i}:v]fps=30,tpad=stop_mode=clone:stop=2,trim=end_frame={frames},setpts=PTS-STARTPTS,format=yuv420p[v{i}]")
filters.append("[v0][v1][v2]concat=n=3:v=1:a=0[v]")
for j, (name, start) in enumerate(D["voz"]):
    inputs += ["-i", str(P / "voz" / f"{name}.wav")]
    filters.append(f"[{3+j}:a]adelay={round(start*1000)}|{round(start*1000)}[vo{j}]")
filters.append("".join(f"[vo{j}]" for j in range(len(D["voz"]))) + f"amix=inputs={len(D['voz'])}:normalize=0,apad=whole_dur={D['duracion']}[voice]")
music_index = 3 + len(D["voz"])
inputs += ["-i", str(P / "music.mp3")]
filters.append(f"[{music_index}:a]atrim=duration={D['duracion']},volume=0.035,afade=t=in:d=1,afade=t=out:st={D['duracion']-2}:d=2[bg]")
cut_times = [5.7, D["remotion"]["inicio"], D["escenas"][6]["inicio"], D["escenas"][9]["inicio"], D["escenas"][11]["inicio"], D["remotion"]["fin"]]
for j, start in enumerate(cut_times):
    inputs += ["-i", str(P / "switch.ogg")]
    filters.append(f"[{music_index+1+j}:a]volume=0.12,adelay={round(start*1000)}|{round(start*1000)}[sfx{j}]")
filters.append("[voice][bg]"+"".join(f"[sfx{j}]" for j in range(len(cut_times)))+f"amix=inputs={2+len(cut_times)}:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=9[a]")
raw = P / "mezcla.mp4"
subprocess.run(["ffmpeg", "-y", "-nostdin", "-loglevel", "error", *inputs, "-filter_complex_threads", "2", "-filter_complex", ";".join(filters), "-map", "[v]", "-map", "[a]", "-c:v", "libx264", "-crf", "18", "-preset", "fast", "-threads", "3", "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-t", str(D["duracion"]), "-movflags", "+faststart", str(raw)], check=True)
# El segundo golpe, ya asentado, es legible también como miniatura.
poster = P / "brag.jpg"
subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-ss", "8.2", "-i", str(raw), "-frames:v", "1", "-q:v", "2", "-pix_fmt", "yuvj420p", str(poster)], check=True)
final = P / "Hikman-Anthropic.mp4"
subprocess.run(["ffmpeg", "-y", "-nostdin", "-loglevel", "error", "-i", str(raw), "-i", str(poster), "-filter_complex_threads", "2", "-filter_complex", "[0:v][1:v]overlay=0:0:enable='eq(n,0)'[v]", "-map", "[v]", "-map", "0:a", "-c:v", "libx264", "-crf", "18", "-preset", "fast", "-threads", "3", "-pix_fmt", "yuv420p", "-c:a", "copy", "-movflags", "+faststart", str(final)], check=True)
print(final)
