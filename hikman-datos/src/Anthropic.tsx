import React from "react";
import { AbsoluteFill, CalculateMetadataFunction, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { K, ESTANDAR, Rodar } from "./kit2";

type Scene = { i: number; inicio: number; fin: number; texto: string };
export type AnthropicData = { duracion: number; remotion: { inicio: number; fin: number }; escenas: Scene[] };
type Props = { d: AnthropicData | null };
export const metaAnthropic: CalculateMetadataFunction<Props> = async () => {
  const d: AnthropicData = await (await fetch(staticFile("anthropic.json"))).json();
  return { props: { d }, durationInFrames: Math.round((d.remotion.fin - d.remotion.inicio) * 30) };
};
const mono: React.CSSProperties = { fontFamily: "Mono", fontWeight: 600 };
const label: React.CSSProperties = { ...mono, fontSize: 26, letterSpacing: 2, color: K.gris, textTransform: "uppercase" };
const title: React.CSSProperties = { fontFamily: "Barlow", fontWeight: 800, fontSize: 108, lineHeight: .95, textTransform: "uppercase" };
const row: React.CSSProperties = { display: "flex", alignItems: "center", justifyContent: "space-between" };
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const Arrival: React.FC<{ delay?: number; frame: number; children: React.ReactNode }> = ({ delay = 0, frame: f, children }) => {
  const { fps } = useVideoConfig();
  const p = spring({ frame: f - delay * fps, fps, config: ESTANDAR });
  return <div style={{ opacity: interpolate(f, [delay * fps, delay * fps + 7], [0, 1], clamp), translate: `0 ${42 * (1 - p)}px` }}>{children}</div>;
};

const DataScene: React.FC<{ id: number; f: number; fps: number }> = ({ id, f, fps }) => {
  const p = interpolate(f, [8, 45], [0, 1], clamp);
  const Num = ({ value, size = 138, color = K.hueso }: { value: string; size?: number; color?: string }) => <div style={{ ...mono, fontSize: size, letterSpacing: -6, color, lineHeight: 1.15 }}><Rodar valor={value} f={f - 9} semilla="anthropic" /></div>;
  if (id === 3) return <><div style={label}>Ingresos · crecimiento trimestral</div><div style={{ ...title, marginTop: 25 }}>CRECE FUERTE.<br /><span style={{ color: K.oso }}>MÁS DESPACIO.</span></div><div style={{ marginTop: 75 }}>{[{ q: "Q2 2026", v: "+144%", w: 1, c: K.gris }, { q: "Q3 2026", v: "+47%", w: 47 / 144, c: K.toro }].map((x, i) => <div key={x.q} style={{ marginTop: 36 }}><div style={row}><span style={label}>{x.q}</span><span style={{ ...mono, fontSize: 74, color: x.c }}>{x.v}</span></div><div style={{ height: 62, background: "#24272c", marginTop: 15 }}><div style={{ width: `${x.w * p * 100}%`, height: "100%", background: x.c }} /></div><div style={{ ...label, fontSize: 22, marginTop: 16 }}>{i === 0 ? "11.555 M$ de ingresos" : "16.956 M$ de ingresos"}</div></div>)}</div></>;
  if (id === 4) return <><div style={label}>Computación e infraestructura · Q3 2026</div><div style={{ marginTop: 25 }}><Num value="9.863 M$" size={146} color={K.oso} /></div><div style={{ display: "flex", gap: 55, alignItems: "center", marginTop: 65 }}><svg width="380" height="380" viewBox="0 0 380 380"><circle cx="190" cy="190" r="157" fill="none" stroke="#282b31" strokeWidth="40" /><circle cx="190" cy="190" r="157" fill="none" stroke={K.oso} strokeWidth="40" strokeDasharray={`${p * .582 * 986.46} 986.46`} transform="rotate(-90 190 190)" /><text x="190" y="212" textAnchor="middle" fill={K.hueso} style={{ fontFamily: "Barlow", fontSize: 112, fontWeight: 800 }}>58%</text></svg><div><div style={{ ...title, fontSize: 75 }}>DE CADA<br />100 DÓLARES<br />DE INGRESOS</div><div style={{ ...label, marginTop: 30, fontSize: 24 }}>Q2: 48% → Q3: 58%</div></div></div><div style={{ ...label, marginTop: 60, fontSize: 27 }}>Antes de personal y otros gastos.</div></>;
  if (id === 5) return <><div style={label}>Resultado operativo · millones de USD</div><div style={{ ...title, marginTop: 30 }}>DEL BENEFICIO<br /><span style={{ color: K.oso }}>A LA PÉRDIDA</span></div><div style={{ marginTop: 90, height: 340, position: "relative" }}><div style={{ position: "absolute", top: 170, left: 0, right: 0, height: 2, background: K.gris }} /><div style={{ position: "absolute", left: 90, top: 170 - 155 * p, height: 155 * p, width: 230, background: K.toro }} /><div style={{ position: "absolute", left: 540, top: 172, height: 110 * p, width: 230, background: K.oso }} /><div style={{ position: "absolute", left: 72, top: -85, ...mono, fontSize: 68, color: K.toro }}>+974</div><div style={{ position: "absolute", left: 525, top: 294, ...mono, fontSize: 68, color: K.oso }}>−567</div></div><div style={{ ...row, ...label, marginTop: 45, padding: "0 120px 0 140px" }}><span>Q2 2026</span><span>Q3 2026</span></div></>;
  if (id === 6) return <><div style={label}>Compromisos plurianuales · infraestructura</div><div style={{ marginTop: 40 }}><Num value="895.400" size={155} /></div><div style={{ ...label, marginTop: 14, color: K.hueso }}>MILLONES DE DÓLARES · TOTAL AGREGADO</div><div style={{ marginTop: 62, borderTop: `3px solid ${K.gris}`, paddingTop: 25, ...row }}><span style={{ ...label, fontSize: 23 }}>2026</span><span style={{ ...label, fontSize: 23 }}>2030</span><span style={{ ...label, fontSize: 23 }}>HASTA 2045</span></div><div style={{ borderLeft: `7px solid ${K.oso}`, background: "#1d1518", padding: "35px 40px", marginTop: 62 }}><div style={{ ...mono, fontSize: 94, color: K.oso }}>69.800 M$</div><div style={{ ...title, fontSize: 63, marginTop: 20 }}>EN LOS PRÓXIMOS 12 MESES</div><div style={{ ...label, fontSize: 20, marginTop: 20 }}>Desde el 30 de septiembre de 2026</div></div></>;
  if (id === 7 || id === 8) {
    const nodes = ["DEMANDA POR DEBAJO DE LO PREVISTO", "LOS INGRESOS SE FRENAN", "LOS COMPROMISOS SIGUEN", "LOS MÁRGENES SE COMPRIMEN", "PRESIÓN PARA FINANCIARSE"];
    return <><div style={label}>El efecto dominó · escenario condicional</div><div style={{ ...title, fontSize: 94, marginTop: 25 }}>SI LA DEMANDA<br /><span style={{ color: K.oso }}>DECEPCIONA…</span></div><div style={{ marginTop: 45 }}>{nodes.map((text, i) => { const delay = id === 7 ? i * 1.8 : Math.max(0, i - 2) * 1.5; const shown = id === 8 || i < 3; const a = shown ? interpolate(f / fps, [delay, delay + .3], [0, 1], clamp) : .18; return <React.Fragment key={text}><div style={{ display: "flex", alignItems: "center", gap: 25, padding: "20px 25px", background: i >= 3 ? "#271619" : "#1b1e23", borderLeft: `5px solid ${i >= 3 ? K.oso : K.gris}`, opacity: a, translate: `${(1 - a) * 35}px 0` }}><span style={{ ...mono, fontSize: 38, color: i >= 3 ? K.oso : K.gris }}>0{i + 1}</span><span style={{ fontFamily: "Barlow", fontWeight: 800, fontSize: 40, lineHeight: 1 }}>{text}</span></div>{i < 4 && <div style={{ color: K.oso, paddingLeft: 47, height: 28, fontSize: 28 }}>↓</div>}</React.Fragment>; })}</div></>;
  }
  if (id === 9) return <><div style={label}>Fortaleza · liquidez al 30.09.2026</div><div style={{ marginTop: 35 }}><Num value="146.600" size={157} color={K.toro} /></div><div style={{ ...label, color: K.hueso, marginTop: 10 }}>MILLONES DE DÓLARES</div><div style={{ marginTop: 45 }}>{[["EFECTIVO Y EQUIVALENTES", "95.600"], ["INVERSIONES A CORTO PLAZO", "36.300"], ["CRÉDITO DISPONIBLE", "14.800"]].map(([l, v], i) => <div key={l} style={{ borderTop: `2px solid ${K.linea}`, padding: "18px 0", opacity: interpolate(f / fps, [1 + i * 1.3, 1.35 + i * 1.3], [0, 1], clamp) }}><div style={{ ...label, fontSize: 22 }}>{l}</div><div style={{ ...mono, fontSize: 52, marginTop: 8, lineHeight: 1 }}>{v} <span style={{ fontSize: 29 }}>M$</span></div></div>)}</div><div style={{ ...label, fontSize: 20, marginTop: 20 }}>Desglose redondeado · incluye crédito sin disponer</div></>;
  if (id === 10) return <><div style={label}>Enero–septiembre de 2026</div><div style={{ ...title, marginTop: 35 }}>LA OPERACIÓN<br /><span style={{ color: K.toro }}>GENERA CAJA</span></div><div style={{ marginTop: 50 }}><Num value="+6.600" color={K.toro} size={176} /></div><div style={{ ...label, color: K.hueso, marginTop: 25, fontSize: 29 }}>MILLONES DE DÓLARES</div><div style={{ ...title, marginTop: 45, fontSize: 66 }}>FLUJO DE CAJA OPERATIVO<br />POSITIVO EN NUEVE MESES</div><div style={{ ...label, marginTop: 25, fontSize: 23 }}>No equivale a flujo de caja libre.</div></>;
  return <><div style={label}>La pregunta del inversor</div><div style={{ ...title, fontSize: 110, marginTop: 55 }}>¿CUÁNTO<br /><span style={{ color: K.toro }}>MARGEN</span><br />QUEDA?</div><div style={{ marginTop: 55 }}>{["DESPUÉS DE LA COMPUTACIÓN", "DESPUÉS DE FINANCIAR", "TODA LA EXPANSIÓN"].map((text, i) => <div key={text} style={{ padding: "20px 0", borderBottom: `2px solid ${K.linea}`, fontFamily: "Barlow", fontSize: 44, fontWeight: 600, opacity: interpolate(f / fps, [1 + i * 1.5, 1.35 + i * 1.5], [0, 1], clamp) }}>{text}</div>)}</div></>;
};

const phrases: Record<number, [string, string, number]> = {
  3: ["CRECIMIENTO FUERTE.<br/>RITMO <em>MENOR.</em>", "oso", .25],
  4: ["LA COMPUTACIÓN<br/><em>PESA MÁS.</em>", "oso", .5],
  5: ["VUELVE LA<br/><em>PÉRDIDA OPERATIVA.</em>", "oso", .55],
  6: ["COMPROMISOS LARGOS.<br/><em>PAGOS CERCANOS.</em>", "oso", .7],
  7: ["INGRESOS VARIABLES.<br/><em>COMPROMISOS FIRMES.</em>", "oso", .8],
  8: ["RIESGO DE<br/><em>SOBREINVERSIÓN.</em>", "oso", .8],
  9: ["UNA RESERVA<br/><em>IMPORTANTE.</em>", "toro", -.4],
  10: ["EL NEGOCIO<br/><em>GENERA CAJA.</em>", "toro", -.55],
  11: ["CRECER TAMBIÉN<br/>EXIGE <em>FINANCIARSE.</em>", "oso", .25],
};

export const Anthropic: React.FC<Props> = ({ d }) => {
  const frame = useCurrentFrame(); const { fps } = useVideoConfig(); if (!d) return null;
  const t = frame / fps + d.remotion.inicio;
  const scene = d.escenas.filter(x => x.i >= 3 && x.i <= 11 && x.inicio <= t + .001).pop() || d.escenas[3];
  const f = frame - Math.round((scene.inicio - d.remotion.inicio) * fps);
  const [phrase, tone, target] = phrases[scene.i];
  const prev = phrases[Math.max(3, scene.i - 1)][2];
  const pos = interpolate(f, [0, .7 * fps], [prev, target], clamp);
  const chapter = scene.i <= 5 ? "01/03 · CRECIMIENTO Y COSTES" : scene.i <= 8 ? "02/03 · EL EFECTO DOMINÓ" : "03/03 · FORTALEZAS Y PREGUNTA";
  const transition = [6, 9, 11].includes(scene.i) && f < .34 * fps;
  const c = tone === "toro" ? K.toro : K.oso;
  return <AbsoluteFill style={{ background: "radial-gradient(ellipse 110% 70% at 50% 40%, #16181c 0%, #0c0d0f 70%)", color: K.hueso }}>
    <AbsoluteFill style={{ backgroundImage: "linear-gradient(rgba(242,239,233,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(242,239,233,.045) 1px,transparent 1px)", backgroundSize: "72px 72px" }} />
    <div style={{ position: "absolute", left: 56, right: 56, top: 78, ...row }}><Img src={staticFile("hikman/logo-blanco.png")} style={{ height: 70 }} /><div style={{ ...label, textAlign: "right", fontSize: 22 }}><b style={{ color: K.hueso }}>ANTHROPIC · S-1</b><br/>06.11.2026</div></div>
    <div style={{ position: "absolute", left: 56, right: 56, top: 168, height: 2, background: K.linea }} />
    <div style={{ position: "absolute", top: 205, width: "100%", ...label, textAlign: "center", fontSize: 25 }}>{chapter}</div>
    <div style={{ position: "absolute", left: 72, top: 285, ...title, fontSize: 112 }}>ANTHROPIC<span style={{ color: c }}>.</span></div>
    <div style={{ position: "absolute", left: 72, right: 72, top: 465 }}><Arrival key={scene.i} frame={f}><DataScene id={scene.i} f={f} fps={fps} /></Arrival></div>
    <div key={"phrase" + scene.i} style={{ position: "absolute", top: 1290, left: 60, right: 60, textAlign: "center", ...title, fontSize: 83, opacity: interpolate(f, [7, 15], [0, 1], clamp), translate: `0 ${interpolate(f, [7, 22], [30, 0], clamp)}px` }}><style>{`.phrase em{font-style:normal;color:${c}}`}</style><span className="phrase" dangerouslySetInnerHTML={{ __html: phrase }} /></div>
    <div style={{ position: "absolute", left: 60, right: 60, top: 1488, ...label, textAlign: "center", fontSize: 18 }}>Fuente: Anthropic · S-1/A · SEC · 02.11.2026</div>
    <div style={{ position: "absolute", top: 1540, width: "100%", height: 170 }}><div style={{ ...label, textAlign: "center", fontSize: 20, letterSpacing: 6 }}>BALANZA HIKMAN</div><Img src={staticFile("hikman/toro.png")} style={{ position: "absolute", left: 70, top: 34, height: 104 }} /><Img src={staticFile("hikman/oso.png")} style={{ position: "absolute", right: 70, top: 34, height: 104 }} /><div style={{ position: "absolute", left: 200, top: 78, width: 680, height: 14, borderRadius: 7, background: `linear-gradient(90deg,${K.toro},#3a3d43,${K.oso})` }} /><div style={{ position: "absolute", left: 534 + pos * 340, top: 48, width: 12, height: 74, borderRadius: 6, background: K.hueso, boxShadow: `0 0 0 4px ${K.carbon}` }} /><div style={{ position: "absolute", left: 200, top: 112, ...label, color: K.toro, fontSize: 20 }}>TORO</div><div style={{ position: "absolute", right: 200, top: 112, ...label, color: K.oso, fontSize: 20 }}>OSO</div></div>
    <div style={{ position: "absolute", top: 1755, width: "100%", ...label, fontSize: 17, textAlign: "center" }}>LECTURA EDITORIAL · NO ES UNA SEÑAL DE INVERSIÓN</div>
    {transition && <AbsoluteFill style={{ background: c, scale: `1 ${1 - Math.pow(Math.min(1, f / (.34 * fps)), .4)}`, transformOrigin: "50% 0%" }} />}
  </AbsoluteFill>;
};
