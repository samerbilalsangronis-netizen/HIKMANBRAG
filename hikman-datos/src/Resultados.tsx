import React from "react";
import { AbsoluteFill, CalculateMetadataFunction, Img, spring, staticFile } from "remotion";
import { balanzaP, color, ESTANDAR, Frase, K, Rodar, SECO, Semana, useLocal } from "./kit2";

// Informe de resultados (estilo "Toro vs. Oso"): un tramo de Remotion con varios temas, velas internas y
// secciones de filas, barras o columnas. Todo sale de public/ia.json (copia de datos/hikman/ia-<fecha>.json).
type Fila = { sim: string; nombre: string; valor: string; flecha: string; tono: string; detalle: string; t: number; tValor: number; tDetalle: number };
type Barra = { lab: string; valor: string; num: number; tono: string; estilo: "lleno" | "raya" | "punteado"; t: number };
type Col = { tit: string; sim: string; valor: string; tono: string; t: number };
type Seccion = {
  tipo: "filas" | "barras" | "columnas"; titulo: string; t0: number; t1: number;
  filas?: Fila[]; barras?: Barra[]; max?: number; sello?: { texto: string; tono: string; t: number };
  total?: { lab: string; valor: string; tono: string; t: number }; cols?: Col[]; pie?: string;
};
export type Resultados = {
  publicacion: string; etiqueta: string; fuente: string; remotion: { inicio: number; fin: number }; totalTemas: number;
  temas: { n: number; nombre: string; inicio: number; codigo: string; sub: string }[];
  velas: { t: number; color: string }[]; balanza: [number, number][]; secciones: Seccion[]; frases: Frase[];
};
type Props = { r: Resultados | null };

export const metaResultados: CalculateMetadataFunction<Props> = async () => {
  const r: Resultados = await (await fetch(staticFile("ia.json"))).json();
  return { props: { r }, durationInFrames: Math.round((r.remotion.fin - r.remotion.inicio) * 30) };
};

const ease3 = (x: number) => 1 - Math.pow(1 - x, 3);
const easeIn3 = (x: number) => x * x * x;
const clamp = (x: number) => Math.min(1, Math.max(0, x));

const Filas: React.FC<{ filas: Fila[]; at: (t: number) => number; fps: number }> = ({ filas, at, fps }) => (
  <>
    {filas.map((f, i) => {
      const e = spring({ frame: at(f.t), fps, config: SECO });
      const fv = at(f.tValor);
      const det = spring({ frame: at(f.tDetalle), fps, config: SECO });
      return (
        <div key={i} style={{ position: "absolute", left: 70, right: 70, top: 520 + i * 225, height: 210, borderBottom: `2px solid ${K.linea}`, opacity: e, translate: `${-60 * (1 - e)}px 0` }}>
          <div style={{ position: "absolute", left: 0, top: 20, font: "700 28px/1 Mono", letterSpacing: ".1em", color: K.gris }}>{f.sim}</div>
          <div style={{ position: "absolute", right: 0, top: 18, font: "800 36px/1 Barlow", textTransform: "uppercase", textAlign: "right", maxWidth: 560 }}>{f.nombre}</div>
          <div style={{ position: "absolute", left: 0, top: 66, font: "800 104px/1 Mono", color: fv >= 0 ? color(f.tono) : K.gris, whiteSpace: "nowrap" }}>
            {fv >= 0 ? <Rodar valor={f.valor} f={fv} semilla={f.sim} /> : "—"}
            {f.flecha && fv >= f.valor.length * 1.5 && <span style={{ fontSize: 72, marginLeft: 22 }}>{f.flecha}</span>}
          </div>
          <div style={{ position: "absolute", left: 0, top: 178, font: "600 22px/1 Mono", letterSpacing: ".1em", color: color(f.tono), textTransform: "uppercase", opacity: det }}>{f.detalle}</div>
        </div>
      );
    })}
  </>
);

// barras horizontales: la llena es el dato real, la raya el esperado y la punteada el anterior
const Barras: React.FC<{ s: Seccion; at: (t: number) => number; fps: number }> = ({ s, at, fps }) => {
  const ancho = 540;
  return (
    <>
      {s.barras!.map((b, i) => {
        const e = spring({ frame: at(b.t), fps, config: SECO });
        const crece = spring({ frame: at(b.t), fps, config: ESTANDAR, durationInFrames: 24 });
        const w = (b.num / s.max!) * ancho * crece;
        const c = b.tono === "neutro" ? K.hueso : color(b.tono);
        const y = 540 + i * 190;
        return (
          <div key={i} style={{ position: "absolute", left: 70, right: 70, top: y, height: 180, opacity: e }}>
            <div style={{ font: "700 26px/1 Mono", letterSpacing: ".12em", color: K.gris, textTransform: "uppercase" }}>{b.lab}</div>
            <div style={{ position: "absolute", left: 0, top: 48, height: 92, width: w,
              background: b.estilo === "lleno" ? c : "transparent",
              border: b.estilo === "lleno" ? "none" : `4px ${b.estilo === "raya" ? "solid" : "dashed"} ${b.estilo === "raya" ? K.hueso : K.gris}` }} />
            <div style={{ position: "absolute", left: w + 26, top: 62, font: "800 64px/1 Mono", color: b.estilo === "lleno" ? c : K.hueso, whiteSpace: "nowrap" }}>
              <Rodar valor={b.valor} f={at(b.t + 0.25)} semilla={b.lab} />
            </div>
          </div>
        );
      })}
      {s.sello && (() => {
        const e = spring({ frame: at(s.sello.t), fps, config: SECO });
        const c = s.sello.tono === "neutro" ? K.hueso : color(s.sello.tono);
        return (
          <div style={{ position: "absolute", right: 70, top: 452, padding: "10px 26px", border: `5px solid ${c}`, color: c, font: "800 54px/1 Barlow", textTransform: "uppercase", rotate: "-5deg", opacity: e, scale: `${1.6 - 0.6 * e}` }}>
            {s.sello.texto}
          </div>
        );
      })()}
      {s.total && (() => {
        const e = spring({ frame: at(s.total.t), fps, config: SECO });
        const c = color(s.total.tono);
        return (
          <div style={{ position: "absolute", left: 70, right: 70, top: 540 + s.barras!.length * 190 + 10, height: 300, borderTop: `4px solid ${c}`, opacity: e, translate: `0 ${40 * (1 - e)}px` }}>
            <div style={{ marginTop: 30, font: "700 30px/1 Mono", letterSpacing: ".14em", color: K.gris, textTransform: "uppercase" }}>= {s.total.lab}</div>
            <div style={{ marginTop: 24, font: "800 150px/1 Mono", letterSpacing: "-.03em", color: c, whiteSpace: "nowrap" }}>
              <Rodar valor={s.total.valor} f={at(s.total.t)} semilla="total" />
            </div>
          </div>
        );
      })()}
    </>
  );
};

const Columnas: React.FC<{ s: Seccion; at: (t: number) => number; fps: number }> = ({ s, at, fps }) => (
  <>
    {s.cols!.map((c, i) => {
      const e = spring({ frame: at(c.t), fps, config: ESTANDAR });
      const col = color(c.tono);
      return (
        <div key={i} style={{ position: "absolute", top: 540, left: i === 0 ? 70 : 555, width: 455, height: 560, border: `4px solid ${col}`, opacity: e, translate: `0 ${60 * (1 - e)}px`, textAlign: "center" }}>
          <div style={{ background: col, color: K.carbon, font: "800 46px/96px Barlow", textTransform: "uppercase" }}>{c.tit}</div>
          <div style={{ marginTop: 60, font: "800 110px/1 Barlow" }}>{c.sim}</div>
          <div style={{ marginTop: 50, font: "800 74px/1 Mono", color: col, letterSpacing: "-.03em" }}>
            <Rodar valor={c.valor} f={at(c.t + 0.3)} semilla={c.sim} />
          </div>
          <div style={{ marginTop: 18, font: "600 24px/1 Mono", color: K.gris, letterSpacing: ".1em" }}>M$</div>
        </div>
      );
    })}
    {s.pie && <div style={{ position: "absolute", left: 70, right: 70, top: 1130, textAlign: "center", font: "600 22px/1.3 Mono", letterSpacing: ".1em", color: K.gris, textTransform: "uppercase", opacity: clamp(at(s.cols![1].t + 0.6) / 10) }}>{s.pie}</div>}
  </>
);

export const ResultadosComp: React.FC<Props> = ({ r }) => {
  const inicio = r ? r.remotion.inicio : 0;
  const { fps, at, tGlobal } = useLocal(inicio);
  if (!r) return null;
  const tema = r.temas.filter((m) => tGlobal >= m.inicio).pop() ?? r.temas[0];
  const p = balanzaP(r as unknown as Semana, tGlobal);
  const cab = spring({ frame: at(tema.inicio + 0.25), fps, config: ESTANDAR });
  const actual = r.frases.filter((f) => tGlobal >= f.t).pop();
  const siguiente = r.frases.find((f) => f.t > tGlobal);
  const sec = r.secciones.filter((x) => tGlobal >= x.t0).pop() ?? r.secciones[0];
  const sIn = spring({ frame: at(sec.t0 + 0.05), fps, config: ESTANDAR });
  const sOut = clamp((tGlobal - (sec.t1 - 0.25)) / 0.25);
  // vela activa: cubre la pantalla de abajo arriba en 0,32 s antes de v.t y la descubre en 0,34 s despues
  const vela = r.velas.find((v) => tGlobal >= v.t - 0.42 && tGlobal < v.t + 0.42);
  const cVela = (c: string) => (c === "toro" ? K.toro : K.oso);
  const fuente = clamp(at(sec.t0 + 0.4) / 8);
  const alto = sec.tipo === "filas" ? 70 + sec.filas!.length * 225 : sec.tipo === "barras" ? 70 + sec.barras!.length * 190 + (sec.total ? 300 : 0) : 700;
  const off = Math.max(0, (1250 - 440 - alto) / 2 - 20);
  return (
    <AbsoluteFill style={{ background: "radial-gradient(ellipse 110% 70% at 50% 40%, #16181c 0%, #0c0d0f 70%)", color: K.hueso }}>
      <AbsoluteFill style={{ backgroundImage: "linear-gradient(rgba(242,239,233,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(242,239,233,.045) 1px, transparent 1px)", backgroundSize: "72px 72px" }} />
      <div style={{ position: "absolute", left: 56, right: 56, top: 78, height: 72, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Img src={staticFile("hikman/logo-blanco.png")} style={{ height: 70 }} />
        <div style={{ textAlign: "right", font: "600 22px/1.3 Mono", letterSpacing: ".14em", color: K.gris, textTransform: "uppercase" }}>
          <b style={{ color: K.hueso, fontWeight: 700 }}>{r.publicacion}</b><br />{r.etiqueta}
        </div>
      </div>
      <div style={{ position: "absolute", left: 56, right: 56, top: 168, height: 2, background: K.linea }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 196, textAlign: "center", font: "600 26px/1 Mono", letterSpacing: ".16em", color: K.gris, textTransform: "uppercase" }}>
        Tema <b style={{ color: K.hueso }}>{tema.n}/{r.totalTemas}</b> · {tema.nombre}
      </div>
      {/* ficha del tema */}
      <div key={tema.codigo} style={{ position: "absolute", left: 70, top: 262, opacity: cab, translate: `${-60 * (1 - cab)}px 0` }}>
        <div style={{ font: "800 140px/0.9 Barlow", letterSpacing: ".01em" }}>{tema.codigo}</div>
        <div style={{ font: "600 24px/1 Mono", letterSpacing: ".14em", color: K.gris, textTransform: "uppercase", marginTop: 12 }}>{tema.sub}</div>
      </div>
      {/* seccion actual */}
      <div key={sec.t0} style={{ position: "absolute", inset: 0, opacity: sIn * (1 - sOut), translate: `0 ${off + 30 * (1 - sIn) - 40 * sOut}px` }}>
        <div style={{ position: "absolute", left: 70, top: 470, font: "700 26px/1 Mono", letterSpacing: ".14em", color: K.hueso, textTransform: "uppercase" }}>
          <span style={{ color: K.gris }}>▸ </span>{sec.titulo}
        </div>
        {sec.tipo === "filas" && <Filas filas={sec.filas!} at={at} fps={fps} />}
        {sec.tipo === "barras" && <Barras s={sec} at={at} fps={fps} />}
        {sec.tipo === "columnas" && <Columnas s={sec} at={at} fps={fps} />}
      </div>
      {/* frase de la voz */}
      {actual && (() => {
        const si = spring({ frame: at(actual.t), fps, config: ESTANDAR });
        const fuera = siguiente ? clamp((tGlobal - (siguiente.t - 0.16)) / 0.16) : 0;
        return (
          <div key={actual.t} style={{ position: "absolute", left: 60, right: 60, top: 1290, textAlign: "center", font: "800 84px/0.98 Barlow", textTransform: "uppercase", opacity: si * (1 - fuera), translate: `0 ${50 * (1 - si) - 40 * fuera}px` }}>
            <span className={`fr-${actual.tono}`} dangerouslySetInnerHTML={{ __html: actual.html }} />
          </div>
        );
      })()}
      <style>{`.fr-oso em{font-style:normal;color:${K.oso}}.fr-toro em{font-style:normal;color:${K.toro}}.fr-neutro em{font-style:normal}`}</style>
      <div style={{ position: "absolute", left: 60, right: 60, top: 1488, textAlign: "center", font: "500 18px/1 Mono", letterSpacing: ".08em", color: K.gris, opacity: 0.5 + 0.5 * fuente }}>{r.fuente}</div>
      {/* Balanza Hikman */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 1540, height: 170 }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, textAlign: "center", font: "600 20px/1 Mono", letterSpacing: ".3em", color: K.gris }}>BALANZA HIKMAN</div>
        <Img src={staticFile("hikman/toro.png")} style={{ position: "absolute", top: 34, height: 104, left: 70 }} />
        <Img src={staticFile("hikman/oso.png")} style={{ position: "absolute", top: 34, height: 104, right: 70 }} />
        <div style={{ position: "absolute", left: 200, width: 680, top: 78, height: 14, borderRadius: 7, background: `linear-gradient(90deg, ${K.toro} 0%, #3a3d43 50%, ${K.oso} 100%)` }} />
        <div style={{ position: "absolute", left: 534 + p * 340, top: 48, width: 12, height: 74, borderRadius: 6, background: K.hueso, boxShadow: "0 0 0 4px #0c0d0f" }} />
        <div style={{ position: "absolute", top: 112, left: 200, font: "600 20px/1 Mono", letterSpacing: ".2em", color: K.toro }}>TORO</div>
        <div style={{ position: "absolute", top: 112, right: 200, font: "600 20px/1 Mono", letterSpacing: ".2em", color: K.oso }}>OSO</div>
      </div>
      {/* vela de cambio de tema */}
      {vela && (() => {
        const c = cVela(vela.color);
        const antes = tGlobal < vela.t;
        const cuerpo = antes ? easeIn3(clamp((tGlobal - (vela.t - 0.32)) / 0.32)) : 1 - ease3(clamp((tGlobal - vela.t) / 0.34));
        const mecha = antes ? easeIn3(clamp((tGlobal - (vela.t - 0.4)) / 0.2)) : 1 - ease3(clamp((tGlobal - vela.t) / 0.42));
        const origen = antes ? "50% 100%" : "50% 0%";
        return (
          <AbsoluteFill>
            <div style={{ position: "absolute", left: 536, width: 8, top: -200, bottom: -200, background: c, scale: `1 ${mecha}`, transformOrigin: origen }} />
            <div style={{ position: "absolute", inset: 0, background: c, scale: `1 ${cuerpo}`, transformOrigin: origen }} />
          </AbsoluteFill>
        );
      })()}
    </AbsoluteFill>
  );
};
