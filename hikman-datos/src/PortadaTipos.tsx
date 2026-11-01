import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { K } from "./kit2";

// Portada del reel de tipos de interes (semana al 30.10.2026). Todo dentro de la franja 3:4 (y 240-1680)
// que muestra la cuadricula de Instagram. Cifras de docs/hikman/investigacion-tipos-2026-10-30.md
const FILAS: { banco: string; div: string; tipo: string; signo: string; tono: string }[] = [
  { banco: "FED", div: "USD", tipo: "3,75–4,00%", signo: "=", tono: "neutro" },
  { banco: "BCE", div: "EUR", tipo: "2,50%", signo: "=", tono: "neutro" },
  { banco: "BOC", div: "CAD", tipo: "2,50%", signo: "▲", tono: "toro" },
  { banco: "BOJ", div: "JPY", tipo: "1,25%", signo: "=", tono: "neutro" },
  { banco: "RBNZ", div: "NZD", tipo: "2,75%", signo: "=", tono: "oso" },
];
const c = (t: string) => (t === "toro" ? K.toro : t === "oso" ? K.oso : K.hueso);

export const PortadaTipos: React.FC = () => (
  <AbsoluteFill style={{ background: "radial-gradient(ellipse 110% 70% at 50% 40%, #16181c 0%, #0c0d0f 70%)", color: K.hueso }}>
    <AbsoluteFill style={{ backgroundImage: "linear-gradient(rgba(242,239,233,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(242,239,233,.045) 1px, transparent 1px)", backgroundSize: "72px 72px" }} />
    <Img src={staticFile("hikman/logo-blanco.png")} style={{ position: "absolute", left: 435, top: 262, width: 210 }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 430, textAlign: "center", font: "700 34px/1 Mono", letterSpacing: ".3em", color: K.gris }}>5 BANCOS CENTRALES · 1 SEMANA</div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 490, textAlign: "center", font: "800 236px/0.86 Barlow", textTransform: "uppercase", letterSpacing: "-.005em" }}>
      Tipos de<br /><span style={{ color: K.toro }}>inter</span><span style={{ color: K.oso }}>és</span>
    </div>
    <div style={{ position: "absolute", left: 90, right: 90, top: 940 }}>
      {FILAS.map((f, i) => (
        <div key={f.banco} style={{ position: "relative", height: 100, borderBottom: `2px solid ${K.linea}`, background: f.tono === "oso" ? "rgba(229,72,77,.12)" : f.tono === "toro" ? "rgba(47,191,113,.10)" : "transparent", marginTop: i === 0 ? 0 : 6 }}>
          <div style={{ position: "absolute", left: 22, top: 18, font: "800 66px/1 Barlow", color: c(f.tono) }}>{f.banco}</div>
          {f.tono !== "oso" && <div style={{ position: "absolute", left: 230, top: 36, font: "600 28px/1 Mono", letterSpacing: ".1em", color: K.gris }}>{f.div}</div>}
          <div style={{ position: "absolute", right: 120, top: 22, font: "800 58px/1 Mono", color: K.hueso }}>{f.tipo}</div>
          <div style={{ position: "absolute", right: 26, top: 18, font: "800 64px/1 Mono", color: c(f.tono), width: 70, textAlign: "center" }}>{f.signo}</div>
        </div>
      ))}
      <div style={{ position: "absolute", left: 190, top: 420, padding: "6px 20px", border: `6px solid ${K.oso}`, color: K.oso, font: "800 50px/1 Barlow", textTransform: "uppercase", rotate: "-6deg", background: "rgba(12,13,15,.85)" }}>Sorpresa</div>
    </div>
    <Img src={staticFile("hikman/toro.png")} style={{ position: "absolute", left: 80, top: 1500, height: 150 }} />
    <Img src={staticFile("hikman/oso.png")} style={{ position: "absolute", right: 80, top: 1500, height: 150 }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 1530, textAlign: "center", font: "800 76px/1 Barlow", textTransform: "uppercase" }}>
      ¿Qué <span style={{ color: K.oso }}>pasó</span>?
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1618, textAlign: "center", font: "600 24px/1 Mono", letterSpacing: ".24em", color: K.gris }}>SEMANA AL 30.10.2026</div>
  </AbsoluteFill>
);
