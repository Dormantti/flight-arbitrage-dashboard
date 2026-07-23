"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { flightCatalog, routeInstanceCounts, type FlightRecord } from "./flightCatalog";

type Lang = "zh" | "en";
type ActionKey = "wait" | "observe" | "buy";
type RiskKey = "low" | "medium" | "high";

type DemoRoute = FlightRecord & {
  reference: number;
  probability: number;
  actionKey: ActionKey;
  riskKey: RiskKey;
  bestTime: string;
  forecast: number[];
};

const routeOrder = ["pek-sha", "sha-can", "sha-szx"] as const;

const models = [
  {
    name: "LSTM_v4",
    kicker: { zh: "直接多步 · 趋势与决策", en: "Direct multi-step · Trend & decision" },
    copy: {
      zh: "双向 LSTM + Attention，一次输出最多 10 个未来时点；当前不提供显式预测区间。",
      en: "Bidirectional LSTM with attention outputs up to 10 future checkpoints in one pass; no explicit prediction interval is currently provided.",
    },
    metric: { zh: "方向判断 77.58%", en: "Direction accuracy 77.58%" },
  },
  {
    name: "SARIMA",
    kicker: { zh: "现场拟合 · 统计可解释", en: "Per-flight fitting · Statistical clarity" },
    copy: {
      zh: "按单航班现场拟合，输出模型阶数、AIC 与统计 95% 区间；短序列采用稳健回退。",
      en: "Fits each flight independently and reports model orders, AIC and a statistical 95% interval, with robust fallback for short series.",
    },
    metric: { zh: "统计区间可核验", en: "Auditable intervals" },
  },
  {
    name: "CatBoost",
    kicker: { zh: "多维特征 · 非线性关系", en: "Multi-feature · Nonlinear patterns" },
    copy: {
      zh: "融合航线、航司、时间与近期价格统计等 33 项特征，输出经验区间并进行保守校准。",
      en: "Combines 33 route, airline, time and recent-price features, then produces empirically calibrated ranges.",
    },
    metric: { zh: "下降判断 66.98%", en: "Drop detection 66.98%" },
  },
];

function hashText(value: string) {
  return [...value].reduce((hash, char) => (hash * 31 + char.charCodeAt(0)) >>> 0, 7);
}

function roundPrice(value: number) {
  return Math.max(100, Math.round(value / 10) * 10);
}

function buildDemoRoute(record: FlightRecord): DemoRoute {
  const seed = hashText(`${record.routeKey}-${record.flight}`);
  const current = record.current || record.history.at(-1) || 600;
  const history = record.history.length >= 3 ? record.history : [current, current, current];
  const risingCase = seed % 5 === 0;
  const dropDepth = risingCase ? 0.01 : 0.035 + (seed % 5) / 100;
  const endBias = risingCase ? 0.05 : ((seed % 7) - 3) / 200;
  const forecast = Array.from({ length: 6 }, (_, index) => {
    const progress = (index + 1) / 6;
    const valley = Math.sin(progress * Math.PI) * dropDepth;
    const noise = (((seed >> (index % 8)) % 7) - 3) / 300;
    return roundPrice(current * (1 - valley + endBias * progress + noise));
  });
  const reference = Math.min(...forecast);
  const savingRate = Math.max(0, (current - reference) / current);
  const probability = Math.max(34, Math.min(86, Math.round(42 + savingRate * 310 + (seed % 13))));
  const riskKey: RiskKey = seed % 9 === 0 ? "high" : seed % 3 === 0 ? "medium" : "low";
  const actionKey: ActionKey =
    savingRate >= 0.05 && probability >= 60 && riskKey !== "high"
      ? "wait"
      : savingRate >= 0.02 && riskKey !== "high"
        ? "observe"
        : "buy";
  const departureDate = new Date(`${record.departure.slice(0, 10)}T12:00:00`);
  departureDate.setDate(departureDate.getDate() - (actionKey === "wait" ? 3 : 1));
  const bestTime =
    actionKey === "buy"
      ? "NOW"
      : `${departureDate.toISOString().slice(0, 10)} ${actionKey === "wait" ? "18:00" : "10:00"}`;

  return { ...record, current, history, forecast, reference, probability, riskKey, actionKey, bestTime };
}

function PriceChart({ route, lang, compact = false }: { route: DemoRoute; lang: Lang; compact?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const scale = window.devicePixelRatio || 1;
      canvas.width = Math.max(1, rect.width * scale);
      canvas.height = Math.max(1, rect.height * scale);
      context.setTransform(scale, 0, 0, scale, 0, 0);

      const width = rect.width;
      const height = rect.height;
      const pad = compact ? 14 : 24;
      const values = [...route.history, ...route.forecast, route.reference];
      const min = Math.min(...values) - 45;
      const max = Math.max(...values) + 45;
      const x = (index: number, count: number) => pad + (index * (width - pad * 2)) / Math.max(1, count - 1);
      const y = (value: number) => height - pad - ((value - min) / Math.max(1, max - min)) * (height - pad * 2);

      context.clearRect(0, 0, width, height);
      context.strokeStyle = "rgba(148, 163, 184, 0.14)";
      context.lineWidth = 1;
      for (let line = 0; line < 4; line += 1) {
        const lineY = pad + (line * (height - pad * 2)) / 3;
        context.beginPath();
        context.moveTo(pad, lineY);
        context.lineTo(width - pad, lineY);
        context.stroke();
      }

      const allCount = route.history.length + route.forecast.length;
      const historyPoints = route.history.map((value, index) => ({ x: x(index, allCount), y: y(value) }));
      const forecastPoints = [route.history.at(-1) ?? route.current, ...route.forecast].map((value, index) => ({
        x: x(route.history.length - 1 + index, allCount),
        y: y(value),
      }));

      context.lineCap = "round";
      context.lineJoin = "round";
      context.strokeStyle = "#4f8cff";
      context.lineWidth = compact ? 2 : 2.5;
      context.setLineDash([]);
      context.beginPath();
      historyPoints.forEach((point, index) => (index ? context.lineTo(point.x, point.y) : context.moveTo(point.x, point.y)));
      context.stroke();

      context.strokeStyle = "#58cfe8";
      context.setLineDash([6, 7]);
      context.beginPath();
      forecastPoints.forEach((point, index) => (index ? context.lineTo(point.x, point.y) : context.moveTo(point.x, point.y)));
      context.stroke();
      context.setLineDash([]);

      const referenceY = y(route.reference);
      context.strokeStyle = "rgba(91, 214, 162, 0.72)";
      context.lineWidth = 1.5;
      context.beginPath();
      context.moveTo(pad, referenceY);
      context.lineTo(width - pad, referenceY);
      context.stroke();

      const minimumIndex = route.forecast.indexOf(route.reference) + route.history.length;
      context.fillStyle = "#5bd6a2";
      context.beginPath();
      context.arc(x(minimumIndex, allCount), y(route.reference), compact ? 4 : 5, 0, Math.PI * 2);
      context.fill();
      context.strokeStyle = "rgba(91, 214, 162, 0.3)";
      context.lineWidth = 8;
      context.stroke();
    };

    draw();
    const resizeObserver = new ResizeObserver(draw);
    resizeObserver.observe(canvas);
    return () => resizeObserver.disconnect();
  }, [route, compact]);

  return (
    <canvas
      ref={canvasRef}
      className={compact ? "price-chart compact" : "price-chart"}
      role="img"
      aria-label={
        lang === "zh"
          ? `${route.flight} 价格趋势图：蓝色为历史价格，青色虚线为未来预期，绿色为决策参考价。`
          : `${route.flight} price trend: blue is observed history, cyan dashed is the future outlook, and green is the decision reference.`
      }
    />
  );
}

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  const [lang, setLang] = useState<Lang>("zh");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [routeKey, setRouteKey] = useState<(typeof routeOrder)[number]>("pek-sha");
  const [flightId, setFlightId] = useState("pek-sha-cz8803");
  const [modelIndex, setModelIndex] = useState(0);
  const [cooperation, setCooperation] = useState<"demo" | "technical" | "business">("demo");
  const copy = (zh: string, en: string) => (lang === "zh" ? zh : en);

  const flightsForRoute = useMemo(() => flightCatalog.filter((item) => item.routeKey === routeKey), [routeKey]);
  const selectedRecord = flightCatalog.find((item) => item.id === flightId) ?? flightsForRoute[0] ?? flightCatalog[0];
  const route = useMemo(() => buildDemoRoute(selectedRecord), [selectedRecord]);
  const selectedModel = models[modelIndex];
  const saving = Math.max(0, route.current - route.reference);
  const savingRate = ((saving / route.current) * 100).toFixed(1);
  const routeName = lang === "zh" ? route.routeZh : route.routeEn;
  const airlineName = lang === "zh" ? route.airlineZh : route.airlineEn;
  const action = {
    wait: copy("等待观察", "Wait & monitor"),
    observe: copy("继续观察", "Keep monitoring"),
    buy: copy("建议采购", "Purchase now"),
  }[route.actionKey];
  const risk = {
    low: copy("低风险", "Low risk"),
    medium: copy("中风险", "Medium risk"),
    high: copy("高风险", "High risk"),
  }[route.riskKey];
  const bestTime = route.bestTime === "NOW" ? copy("当前时点", "Now") : route.bestTime;

  const changeRoute = (nextRoute: (typeof routeOrder)[number]) => {
    setRouteKey(nextRoute);
    const first = flightCatalog.find((item) => item.routeKey === nextRoute);
    if (first) setFlightId(first.id);
  };

  const capabilityCards = [
    ["01", copy("价格趋势预测", "Fare trend forecasting"), copy("展示未来多个采购时点的价格变化，区分历史价格、模型预期与决策参考价。", "Show expected price changes across future purchase checkpoints, separating observed history, model outlook and decision reference."), copy("趋势", "TREND")],
    ["02", copy("全航班查询", "All-flight lookup"), copy("从 data.xlsx 读取三条航线的全部航班实例，并按航线、航班号快速切换未来预期。", "Read every flight instance across three routes in data.xlsx and switch future outlooks by route and flight number."), copy("航班", "FLIGHT")],
    ["03", copy("采购时机判断", "Purchase timing"), copy("输出等待、继续观察或建议采购，让团队快速聚焦下一步行动。", "Recommend waiting, monitoring or purchasing so teams can focus on the next action."), copy("时机", "TIMING")],
    ["04", copy("批量节省测算", "Portfolio savings"), copy("按采购张数测算单票和总预计节省，为批量采购计划提供量化参考。", "Estimate per-ticket and total savings for portfolio purchasing plans."), copy("节省", "SAVING")],
  ];

  const processItems = [
    ["01", copy("价格数据接入", "Ingest fare data"), copy("航班元数据与历史价格序列", "Flight metadata and fare histories")],
    ["02", copy("全航班索引", "Index all flights"), copy("航线、日期与航班号统一检索", "Unified route, date and flight lookup")],
    ["03", copy("多模型预测", "Run multiple models"), "LSTM / SARIMA / CatBoost"],
    ["04", copy("风险校准", "Calibrate risk"), copy("生成保守的决策参考价", "Produce conservative decision references")],
    ["05", copy("建议输出", "Deliver decisions"), copy("报告、Excel 或 API 返回", "Reports, Excel or API responses")],
  ];

  const cooperationLabels = {
    demo: copy("产品演示", "Product demo"),
    technical: copy("技术交流", "Technical review"),
    business: copy("商务合作", "Business partnership"),
  };

  return (
    <main lang={lang === "zh" ? "zh-CN" : "en"}>
      <header className="site-header">
        <div className="nav-shell">
          <a className="brand" href="#top" aria-label={copy("航价智采首页", "AirPrice Intelligence home")}>
            <span className="brand-mark" aria-hidden="true"><span>AP</span></span>
            <span className="brand-copy"><strong>{copy("航价智采", "AirPrice")}</strong><small>AIRPRICE INTELLIGENCE</small></span>
          </a>
          <nav className={mobileOpen ? "nav-links is-open" : "nav-links"} aria-label={copy("主导航", "Main navigation")}>
            <a href="#capabilities" onClick={() => setMobileOpen(false)}>{copy("产品能力", "Capabilities")}</a>
            <a href="#demo" onClick={() => setMobileOpen(false)}>{copy("在线演示", "Live demo")}</a>
            <a href="#technology" onClick={() => setMobileOpen(false)}>{copy("技术可信度", "Technology")}</a>
            <a href="#cooperation" onClick={() => setMobileOpen(false)}>{copy("合作方案", "Partnership")}</a>
          </nav>
          <div className="nav-actions">
            <div className="language-switch" role="group" aria-label={copy("语言切换", "Language switch")}>
              <button aria-pressed={lang === "zh"} onClick={() => setLang("zh")}>中文</button>
              <button aria-pressed={lang === "en"} onClick={() => setLang("en")}>EN</button>
            </div>
            <button className="primary-button nav-cta" onClick={() => scrollToSection("demo")}>{copy("切换航班", "Switch flight")}</button>
            <button className="menu-button" aria-label={copy("打开导航菜单", "Open navigation")} aria-expanded={mobileOpen} onClick={() => setMobileOpen((value) => !value)}><span /><span /></button>
          </div>
        </div>
      </header>

      <section id="top" className="hero-section">
        <div className="orb orb-one" /><div className="orb orb-two" />
        <div className="hero-grid page-shell">
          <div className="hero-copy">
            <div className="eyebrow"><span className="status-dot" /> {copy("AI 驱动的航旅采购决策平台", "AI-powered air procurement intelligence")}</div>
            <h1>{copy("预测未来票价", "Forecast future fares")}<br />{copy("把握更优", "Capture a better ")}<span>{copy("采购时机", "buying window")}</span></h1>
            <p className="hero-lead">{copy("面向 data.xlsx 中全部航班，结合历史价格、时间特征和多模型预测，输出价格趋势、降价概率、采购风险与预计节省。", "Query every flight in data.xlsx and combine fare history, time features and multiple models to produce price trends, drop probability, purchase risk and expected savings.")}</p>
            <div className="hero-actions">
              <button className="primary-button large" onClick={() => scrollToSection("demo")}>{copy("查询航班未来预期", "Explore flight outlooks")} <span aria-hidden="true">↗</span></button>
              <button className="secondary-button large" onClick={() => scrollToSection("capabilities")}>{copy("了解解决方案", "View solution")}</button>
            </div>
            <div className="hero-proof" aria-label={copy("产品特点", "Product strengths")}>
              <span><i>01</i> {copy("99 个航班号", "99 flight numbers")}</span>
              <span><i>02</i> {copy("三模型复核", "3-model review")}</span>
              <span><i>03</i> {copy("批量节省测算", "Portfolio savings")}</span>
            </div>
          </div>

          <div className="hero-product-card" aria-label={copy("产品原型演示数据", "Prototype demonstration data")}>
            <div className="card-glow" />
            <div className="product-card-head">
              <div><span className="prototype-label">{copy("全航班未来预期 · 原型演示", "ALL-FLIGHT OUTLOOK · PROTOTYPE")}</span><h2>{routeName}</h2><p>{route.flight} · {route.departure}</p></div>
              <span className="live-badge"><i /> {copy("模型运行正常", "Models online")}</span>
            </div>
            <div className="decision-band">
              <div><small>{copy("采购建议", "Recommendation")}</small><strong>{action}</strong><span>{risk}</span></div>
              <div className="best-time"><small>{copy("预计重点采购时间", "Priority purchase time")}</small><strong>{bestTime.split(" ")[0]}</strong><span>{bestTime.split(" ")[1] ?? ""}</span></div>
            </div>
            <div className="metric-row">
              <div><small>{copy("当前价格", "Current fare")}</small><strong>¥{route.current}</strong></div>
              <div><small>{copy("决策参考价", "Decision reference")}</small><strong className="green">¥{route.reference}</strong></div>
              <div><small>{copy("预计节省率", "Expected saving")}</small><strong>{savingRate}%</strong></div>
              <div><small>{copy("降价概率", "Drop probability")}</small><strong>{route.probability}%</strong></div>
            </div>
            <div className="chart-wrap">
              <div className="chart-topline"><span>{copy("价格趋势", "Fare trend")}</span><span className="chart-period">{copy("历史 → 未来", "HISTORY → OUTLOOK")}</span></div>
              <PriceChart route={route} lang={lang} compact />
              <div className="chart-legend"><span><i className="legend-history" /> {copy("历史价格", "Observed")}</span><span><i className="legend-forecast" /> {copy("未来预期", "Outlook")}</span><span><i className="legend-reference" /> {copy("参考价", "Reference")}</span></div>
            </div>
          </div>
        </div>
        <div className="data-ribbon">
          <div className="page-shell ribbon-inner">
            <span>{copy("面向 OTA、商旅平台与票务采购团队", "Built for OTAs, TMCs and ticket procurement teams")}</span>
            <div><strong>1,066</strong><small>{copy("航班实例", "flight instances")}</small></div>
            <div><strong>99</strong><small>{copy("唯一航班号", "unique flight numbers")}</small></div>
            <div><strong>3</strong><small>{copy("重点航线", "covered routes")}</small></div>
            <div><strong>10:00 / 18:00</strong><small>{copy("每日预测时点", "daily checkpoints")}</small></div>
          </div>
        </div>
      </section>

      <section id="capabilities" className="light-section section-pad">
        <div className="page-shell">
          <div className="section-heading two-column-heading">
            <div><span className="section-index">01 / {copy("核心能力", "CAPABILITIES")}</span><h2>{copy("把复杂预测，转化为", "Turn complex forecasts into")}<br />{copy("可执行的采购判断", "actionable purchase decisions")}</h2></div>
            <p>{copy("客户无需理解模型参数。系统围绕“查哪个航班、现在是否采购、未来是否更低、可以节省多少”组织结果。", "Users do not need to understand model parameters. Results answer which flight to inspect, whether to buy now, whether a lower fare is expected and how much could be saved.")}</p>
          </div>
          <div className="capability-grid">
            {capabilityCards.map(([index, title, description, tag]) => <article className="capability-card" key={index}><div className="capability-top"><span>{index}</span><i aria-hidden="true">↗</i></div><div className={`capability-visual visual-${index}`}><b>{tag}</b><span /><span /><span /></div><h3>{title}</h3><p>{description}</p></article>)}
          </div>
        </div>
      </section>

      <section className="process-section section-pad">
        <div className="page-shell">
          <div className="section-heading centered-heading"><span className="section-index light">02 / {copy("决策流程", "DECISION FLOW")}</span><h2>{copy("从全航班数据到采购动作", "From all-flight data to purchase action")}</h2><p>{copy("统一索引、预测、校准与输出流程，让每个航班的结论都有清晰依据。", "A unified indexing, forecasting, calibration and delivery flow keeps every flight-level conclusion traceable.")}</p></div>
          <div className="process-flow">{processItems.map(([index, title, description], itemIndex) => <div className="flow-item" key={index}><span className="flow-number">{index}</span><h3>{title}</h3><p>{description}</p>{itemIndex < 4 && <i className="flow-arrow" aria-hidden="true">→</i>}</div>)}</div>
        </div>
      </section>

      <section id="demo" className="demo-section section-pad">
        <div className="page-shell">
          <div className="section-heading two-column-heading dark-text">
            <div><span className="section-index">03 / {copy("全航班查询演示", "ALL-FLIGHT DEMO")}</span><h2>{copy("切换航线与航班号", "Switch route and flight")}<br />{copy("查看未来预期", "to explore its outlook")}</h2></div>
            <p>{copy("航班清单与历史观测来自 data.xlsx；未来曲线为网站交互原型，正式结果由现有 Python 预测程序生成。", "The flight list and observations come from data.xlsx. Future curves on this website are interaction prototypes; production outputs are generated by the existing Python prediction system.")}</p>
          </div>
          <div className="demo-console">
            <aside className="demo-sidebar">
              <div className="mini-brand"><span className="brand-mark small"><span>AP</span></span><strong>{copy("航价智采", "AirPrice")}</strong></div>
              <div className="sidebar-group"><small>{copy("采购工作台", "PROCUREMENT DESK")}</small><button className="active"><i /> {copy("单航班分析", "Flight analysis")}</button><button><i /> {copy("多模型对比", "Model comparison")}</button><button><i /> {copy("批量机会", "Portfolio opportunities")}</button><button><i /> {copy("报告中心", "Report center")}</button></div>
              <div className="sidebar-status"><span><i /> {copy("系统运行正常", "System operational")}</span><small>{copy("数据更新至", "Data updated")}<br />2026-07-20 18:00</small></div>
            </aside>
            <div className="demo-main">
              <div className="demo-title-row"><div><span>{copy("单航班未来预期", "SINGLE-FLIGHT OUTLOOK")}</span><h3>{routeName}</h3><p>{route.flight} · {airlineName} · {route.departure} — {route.arrival}</p></div><span className="coverage-badge">{copy("覆盖 99 个航班号", "99 flights available")}</span></div>
              <div className="flight-switcher">
                <div className="route-tabs" role="tablist" aria-label={copy("选择航线", "Choose route")}>
                  {routeOrder.map((key) => {
                    const sample = flightCatalog.find((item) => item.routeKey === key)!;
                    const uniqueCount = flightCatalog.filter((item) => item.routeKey === key).length;
                    return <button key={key} role="tab" aria-selected={routeKey === key} onClick={() => changeRoute(key)}><span>{lang === "zh" ? sample.routeZh : sample.routeEn}</span><small>{routeInstanceCounts[key]} {copy("条实例", "instances")} · {uniqueCount} {copy("个航班号", "flights")}</small></button>;
                  })}
                </div>
                <label className="flight-select-label">
                  <span>{copy("切换航班号", "Switch flight number")}</span>
                  <select value={route.id} onChange={(event) => setFlightId(event.target.value)} aria-label={copy("选择航班号", "Select flight number")}>
                    {flightsForRoute.map((item) => <option value={item.id} key={item.id}>{item.flight} · {lang === "zh" ? item.airlineZh : item.airlineEn} · {item.departure.slice(11)}</option>)}
                  </select>
                </label>
              </div>
              <div className="analysis-grid">
                <article className={`advice-card advice-${route.actionKey}`}><span className="advice-kicker">{copy("采购结论", "PURCHASE DECISION")}</span><h4>{action}</h4><p>{copy("预计重点采购时间", "Priority purchase time")}</p><strong>{bestTime}</strong><div><span>{risk}</span><small>{copy("原型演示", "Prototype")}</small></div></article>
                <div className="kpi-grid">
                  <article><small>{copy("当前价格", "Current fare")}</small><strong>¥{route.current}</strong><span>{copy("最新有效观测价", "Latest valid observation")}</span></article>
                  <article><small>{copy("决策参考最低价", "Decision reference")}</small><strong className="green">¥{route.reference}</strong><span>{copy("原型风险校准后", "Prototype calibration")}</span></article>
                  <article><small>{copy("最高降价概率", "Drop probability")}</small><strong>{route.probability}%</strong><span>{route.probability >= 60 ? copy("较高", "Higher") : copy("需谨慎", "Cautious")}</span></article>
                  <article><small>{copy("100 张预计节省", "Saving on 100 tickets")}</small><strong>¥{(saving * 100).toLocaleString()}</strong><span>{copy("预计节省率", "Expected saving")} {savingRate}%</span></article>
                </div>
              </div>
              <div className="analysis-bottom">
                <div className="large-chart-panel"><div className="panel-heading"><div><h4>{copy("价格趋势与决策参考", "Fare trend and decision reference")}</h4><p>{copy("历史真实价格 · 未来预期 · 决策参考价", "Observed history · Future outlook · Decision reference")}</p></div><span>{copy("价格单位：人民币", "Currency: CNY")}</span></div><PriceChart route={route} lang={lang} /><div className="chart-axis"><span>{copy("历史观测", "Observed")}</span><span>{copy("数据更新 07.20", "Updated 07.20")}</span><span>{copy("未来预期", "Outlook")}</span></div></div>
                <div className="why-panel"><span className="why-number">WHY</span><h4>{copy("为什么给出这个建议？", "Why this recommendation?")}</h4><ol><li><b>{savingRate}%</b> {copy("的预计降价空间", "estimated downside")}</li><li><b>{route.probability}%</b> {copy("的最高降价概率", "drop probability")}</li><li><b>{risk}</b>，{copy("已进行保守校准", "conservatively calibrated")}</li><li>{copy("重点时间", "Priority time")} <b>{bestTime}</b></li></ol><div className="watch-price"><small>{copy("重点观察价格", "Watch price")}</small><strong>¥{Math.round(route.reference * 1.03)} {copy("以下", "or below")}</strong></div></div>
              </div>
              <div className="demo-disclaimer">{copy("航班清单和历史观测来自 data.xlsx。网站中的未来预期为客户展示原型，仅用于说明切换与决策流程；生产环境由 LSTM、SARIMA 和 CatBoost 程序实时计算，不构成价格保证。", "Flight lists and observations come from data.xlsx. Future outlooks on this website are customer-demo prototypes that illustrate flight switching and decision flow. Production results are computed by the LSTM, SARIMA and CatBoost programs and do not guarantee future fares.")}</div>
            </div>
          </div>
        </div>
      </section>

      <section id="technology" className="technology-section section-pad">
        <div className="page-shell">
          <div className="tech-heading"><div><span className="section-index light">04 / {copy("技术可信度", "TECHNOLOGY")}</span><h2>{copy("独立方法交叉核验，", "Independent methods,")}<br />{copy("用边界感建立信任", "clear boundaries")}</h2></div><p>{copy("三种方法可切换、可对比、可复核；当前版本不宣称自动加权融合，也不把模型原始预测直接当作采购价格。", "Three methods can be switched, compared and audited. The current version does not claim automatic weighted fusion or treat raw forecasts as purchase prices.")}</p></div>
          <div className="model-showcase">
            <div className="model-selector" role="tablist" aria-label={copy("预测模型", "Forecasting models")}>{models.map((model, index) => <button key={model.name} role="tab" aria-selected={modelIndex === index} onClick={() => setModelIndex(index)}><span>0{index + 1}</span><strong>{model.name}</strong><small>{model.kicker[lang]}</small></button>)}</div>
            <div className="model-detail">
              <div className="model-detail-top"><span>MODEL / 0{modelIndex + 1}</span><strong>{selectedModel.metric[lang]}</strong></div><h3>{selectedModel.name}</h3><p>{selectedModel.copy[lang]}</p>
              <div className="model-facts">
                {modelIndex === 0 && <><div><small>{copy("序列窗口", "Input window")}</small><strong>12 {copy("个观测点", "observations")}</strong></div><div><small>{copy("未来时点", "Future steps")}</small><strong>{copy("最多 10 点", "Up to 10")}</strong></div><div><small>{copy("最低价 MAE", "Minimum-fare MAE")}</small><strong>¥62.04</strong></div></>}
                {modelIndex === 1 && <><div><small>{copy("季节周期", "Seasonal period")}</small><strong>m = 2</strong></div><div><small>{copy("选择准则", "Selection")}</small><strong>AICc / AIC</strong></div><div><small>{copy("输出", "Output")}</small><strong>95% {copy("统计区间", "interval")}</strong></div></>}
                {modelIndex === 2 && <><div><small>{copy("特征数量", "Features")}</small><strong>33</strong></div><div><small>{copy("最佳迭代", "Best iteration")}</small><strong>274</strong></div><div><small>{copy("输出", "Output")}</small><strong>{copy("经验区间", "Empirical range")}</strong></div></>}
              </div>
              <div className="metric-note">{copy("指标来自历史切分与模型技术报告，不代表未来所有航班都能达到相同表现；CatBoost 的经验区间不等同于严格概率保证。", "Metrics come from historical splits and the model report. They do not imply identical performance on every future flight; CatBoost empirical ranges are not strict probability guarantees.")}</div>
            </div>
          </div>
          <div className="trust-grid">
            <article><span>{copy("数据从哪里来", "DATA SOURCE")}</span><h3>{copy("航班元数据 + 历史价格序列", "Flight metadata + fare histories")}</h3><p>{copy("data.xlsx 包含三条航线、1,066 条航班实例和 99 个唯一航班号，并保留数据更新时间与匹配核查。", "data.xlsx contains 1,066 flight instances and 99 unique flight numbers across three routes, with update timestamps and matching checks.")}</p></article>
            <article><span>{copy("如何控制风险", "RISK CONTROL")}</span><h3>{copy("原始预测不直接用于采购", "Raw forecasts are not purchase prices")}</h3><p>{copy("系统结合预测步长、模型表现与距起飞时间，生成更保守的决策参考价和风险等级。", "Forecast horizon, model performance and time to departure inform conservative decision references and risk levels.")}</p></article>
            <article><span>{copy("如何评价效果", "EVALUATION")}</span><h3>{copy("使用准确的指标名称", "Use precise metric names")}</h3><p>{copy("区分点预测误差、涨跌方向、是否下降与采购决策准确率，避免用单一“准确率”误导决策。", "Separate point error, direction, drop detection and procurement decision accuracy instead of relying on one vague accuracy figure.")}</p></article>
          </div>
        </div>
      </section>

      <section className="scenario-section section-pad">
        <div className="page-shell">
          <div className="section-heading centered-heading"><span className="section-index">05 / {copy("业务场景", "USE CASES")}</span><h2>{copy("让规模化采购更有依据", "Make procurement at scale more informed")}</h2><p>{copy("从单航班判断到批量机会筛选，为不同采购团队提供一致的决策语言。", "Move from single-flight decisions to portfolio opportunity screening with a consistent decision language.")}</p></div>
          <div className="scenario-grid">
            {[
              [copy("OTA 批量采购", "OTA portfolio buying"), copy("高频询价与批量库存压力下，快速识别更值得等待的航班。", "Identify flights worth waiting for under high-frequency pricing and inventory pressure."), copy("机会排序 · 批量节省测算", "Opportunity ranking · Portfolio savings")],
              [copy("企业商旅平台", "Corporate travel platforms"), copy("在行程确定性、预算与退改政策之间，寻找更稳健的采购窗口。", "Balance trip certainty, budget and ticket policies to find more robust purchase windows."), copy("风险分级 · 采购建议", "Risk tiers · Purchase advice")],
              [copy("票务代理监控", "Ticket agency monitoring"), copy("持续观察重点航线与航班，把价格变化转化为可执行动作。", "Monitor priority routes and flights, translating fare changes into action."), copy("航班跟踪 · 模型复核", "Flight tracking · Model review")],
            ].map(([title, description, feature], index) => <article key={title}><span>0{index + 1}</span><div className={`scenario-graphic scenario-${index + 1}`} aria-hidden="true"><i /><i /><i /></div><h3>{title}</h3><p>{description}</p><strong>{feature}</strong></article>)}
          </div>
        </div>
      </section>

      <section id="cooperation" className="cooperation-section section-pad">
        <div className="page-shell cooperation-grid">
          <div><span className="section-index light">06 / {copy("合作方案", "PARTNERSHIP")}</span><h2>{copy("让每一次采购决策", "Give every purchase decision")}<br />{copy("都有数据依据", "a data-backed rationale")}</h2><p>{copy("可从全航班高保真演示起步，逐步接入现有预测服务、客户数据与企业系统。", "Start with the all-flight high-fidelity demo, then connect the existing prediction services, customer data and enterprise systems.")}</p><div className="cooperation-options">{(["demo", "technical", "business"] as const).map((item) => <button key={item} aria-pressed={cooperation === item} onClick={() => setCooperation(item)}>{cooperationLabels[item]}<span>↗</span></button>)}</div></div>
          <div className="cooperation-card"><span className="selection-label">{copy("已选择", "SELECTED")} / {cooperationLabels[cooperation]}</span><h3>{cooperation === "demo" ? copy("查看全航班切换下的完整决策流程", "Review the complete all-flight decision flow") : cooperation === "technical" ? copy("核验模型口径、数据要求与接入边界", "Validate model definitions, data requirements and integration boundaries") : copy("讨论企业采购场景与阶段性实施方案", "Discuss enterprise use cases and phased implementation")}</h3><ul><li><i /> {copy("客户官网与高保真 Demo", "Customer website and high-fidelity demo")}</li><li><i /> {copy("现有 Python 预测能力服务化", "Productionize the existing Python models")}</li><li><i /> {copy("报告导出与客户系统接入规划", "Plan reporting and system integration")}</li></ul><button className="primary-button large" onClick={() => scrollToSection("top")}>{copy("返回顶部", "Back to top")} <span>↑</span></button><p>{copy("联系渠道接入后，可在此提交正式演示申请。", "A formal demo request can be submitted here after a contact channel is connected.")}</p></div>
        </div>
      </section>

      <footer>
        <div className="page-shell footer-top"><div className="footer-brand"><span className="brand-mark"><span>AP</span></span><div><strong>{copy("航价智采", "AirPrice Intelligence")}</strong><small>{copy("AI 驱动的机票采购时机预测与成本优化平台", "AI-powered airfare timing and procurement optimization")}</small></div></div><div className="footer-links"><a href="#capabilities">{copy("产品能力", "Capabilities")}</a><a href="#demo">{copy("在线演示", "Live demo")}</a><a href="#technology">{copy("技术可信度", "Technology")}</a><a href="#cooperation">{copy("合作方案", "Partnership")}</a></div></div>
        <div className="page-shell footer-bottom"><span>© 2026 {copy("航价智采", "AirPrice Intelligence")}</span><span>{copy("数据更新：2026-07-20", "Data updated: 2026-07-20")}</span><span>{copy("预测不构成价格保证", "Forecasts do not guarantee fares")}</span></div>
      </footer>
    </main>
  );
}
