"use client";

import { useEffect, useRef, useState } from "react";

type DemoRoute = {
  id: string;
  route: string;
  flight: string;
  airline: string;
  departure: string;
  current: number;
  reference: number;
  probability: number;
  action: string;
  risk: string;
  bestTime: string;
  history: number[];
  forecast: number[];
};

const demoRoutes: DemoRoute[] = [
  {
    id: "pek-sha",
    route: "北京 → 上海",
    flight: "CZ8803",
    airline: "南方航空",
    departure: "2026-07-28 20:00",
    current: 690,
    reference: 610,
    probability: 72,
    action: "等待观察",
    risk: "低风险",
    bestTime: "2026-07-24 18:00",
    history: [490, 490, 490, 490, 1020, 690, 690],
    forecast: [668, 642, 630, 610, 622, 648],
  },
  {
    id: "sha-can",
    route: "上海 → 广州",
    flight: "CZ3504",
    airline: "南方航空",
    departure: "2026-07-28 20:00",
    current: 510,
    reference: 472,
    probability: 64,
    action: "继续观察",
    risk: "中风险",
    bestTime: "2026-07-25 10:00",
    history: [430, 690, 420, 510, 420, 420, 510],
    forecast: [504, 492, 480, 472, 478, 496],
  },
  {
    id: "sha-szx",
    route: "上海 → 深圳",
    flight: "CZ3588",
    airline: "南方航空",
    departure: "2026-07-28 20:50",
    current: 610,
    reference: 598,
    probability: 49,
    action: "建议采购",
    risk: "中风险",
    bestTime: "当前时点",
    history: [610, 610, 720, 720, 720, 610, 610],
    forecast: [612, 608, 604, 598, 610, 625],
  },
];

const models = [
  {
    name: "LSTM_v4",
    kicker: "直接多步 · 趋势与决策",
    copy: "双向 LSTM + Attention，一次输出最多 10 个未来时点；当前不提供显式预测区间。",
    metric: "方向判断 77.58%",
  },
  {
    name: "SARIMA",
    kicker: "现场拟合 · 统计可解释",
    copy: "按单航班现场拟合，输出模型阶数、AIC 与统计 95% 区间；短序列采用稳健回退。",
    metric: "统计区间可核验",
  },
  {
    name: "CatBoost",
    kicker: "多维特征 · 非线性关系",
    copy: "融合航线、航司、时间与近期价格统计等 33 项特征，输出经验区间并进行保守校准。",
    metric: "下降判断 66.98%",
  },
];

function PriceChart({ route, compact = false }: { route: DemoRoute; compact?: boolean }) {
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
      const x = (index: number, count: number) => pad + (index * (width - pad * 2)) / (count - 1);
      const y = (value: number) => height - pad - ((value - min) / (max - min)) * (height - pad * 2);

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
      const forecastPoints = [route.history[route.history.length - 1], ...route.forecast].map((value, index) => ({
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

      const minimum = Math.min(...route.forecast);
      const minimumIndex = route.forecast.indexOf(minimum) + route.history.length;
      context.fillStyle = "#5bd6a2";
      context.beginPath();
      context.arc(x(minimumIndex, allCount), y(minimum), compact ? 4 : 5, 0, Math.PI * 2);
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
      aria-label={`${route.route} ${route.flight} 价格趋势图：历史真实价格为蓝色实线，未来预测为青色虚线，绿色线为采购决策参考价，绿色圆点为最佳采购点。`}
    />
  );
}

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [routeIndex, setRouteIndex] = useState(0);
  const [modelIndex, setModelIndex] = useState(0);
  const [cooperation, setCooperation] = useState("产品演示");
  const route = demoRoutes[routeIndex];
  const selectedModel = models[modelIndex];
  const saving = route.current - route.reference;
  const savingRate = ((saving / route.current) * 100).toFixed(1);

  return (
    <main>
      <header className="site-header">
        <div className="nav-shell">
          <a className="brand" href="#top" aria-label="航价智采首页">
            <span className="brand-mark" aria-hidden="true"><span>AP</span></span>
            <span className="brand-copy"><strong>航价智采</strong><small>AIRPRICE INTELLIGENCE</small></span>
          </a>
          <nav className={mobileOpen ? "nav-links is-open" : "nav-links"} aria-label="主导航">
            <a href="#capabilities" onClick={() => setMobileOpen(false)}>产品能力</a>
            <a href="#demo" onClick={() => setMobileOpen(false)}>在线演示</a>
            <a href="#technology" onClick={() => setMobileOpen(false)}>技术可信度</a>
            <a href="#cooperation" onClick={() => setMobileOpen(false)}>合作方案</a>
          </nav>
          <div className="nav-actions">
            <button className="text-button" onClick={() => scrollToSection("demo")}>登录控制台</button>
            <button className="primary-button nav-cta" onClick={() => scrollToSection("cooperation")}>申请演示</button>
            <button
              className="menu-button"
              aria-label="打开导航菜单"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((value) => !value)}
            >
              <span /><span />
            </button>
          </div>
        </div>
      </header>

      <section id="top" className="hero-section">
        <div className="orb orb-one" /><div className="orb orb-two" />
        <div className="hero-grid page-shell">
          <div className="hero-copy">
            <div className="eyebrow"><span className="status-dot" /> AI 驱动的航旅采购决策平台</div>
            <h1>预测未来票价<br />把握更优<span>采购时机</span></h1>
            <p className="hero-lead">结合航班历史价格、时间特征和多模型预测，输出价格趋势、降价概率、采购风险与预计节省。</p>
            <div className="hero-actions">
              <button className="primary-button large" onClick={() => scrollToSection("demo")}>查看在线演示 <span aria-hidden="true">↗</span></button>
              <button className="secondary-button large" onClick={() => scrollToSection("capabilities")}>了解解决方案</button>
            </div>
            <div className="hero-proof" aria-label="产品特点">
              <span><i>01</i> 采购时机判断</span>
              <span><i>02</i> 风险保守校准</span>
              <span><i>03</i> 批量节省测算</span>
            </div>
          </div>

          <div className="hero-product-card" aria-label="产品原型演示数据">
            <div className="card-glow" />
            <div className="product-card-head">
              <div>
                <span className="prototype-label">产品原型演示数据</span>
                <h2>{demoRoutes[0].route}</h2>
                <p>{demoRoutes[0].flight} · {demoRoutes[0].departure}</p>
              </div>
              <span className="live-badge"><i /> 模型运行正常</span>
            </div>
            <div className="decision-band">
              <div><small>采购建议</small><strong>等待观察</strong><span>低风险</span></div>
              <div className="best-time"><small>预计重点采购时间</small><strong>07 月 24 日</strong><span>18:00</span></div>
            </div>
            <div className="metric-row">
              <div><small>当前价格</small><strong>¥690</strong></div>
              <div><small>决策参考价</small><strong className="green">¥610</strong></div>
              <div><small>预计节省率</small><strong>11.6%</strong></div>
              <div><small>降价概率</small><strong>72%</strong></div>
            </div>
            <div className="chart-wrap">
              <div className="chart-topline"><span>价格趋势</span><span className="chart-period">07.07 — 07.27</span></div>
              <PriceChart route={demoRoutes[0]} compact />
              <div className="chart-legend">
                <span><i className="legend-history" /> 历史价格</span>
                <span><i className="legend-forecast" /> 未来预测</span>
                <span><i className="legend-reference" /> 决策参考价</span>
              </div>
            </div>
          </div>
        </div>
        <div className="data-ribbon">
          <div className="page-shell ribbon-inner">
            <span>面向 OTA、商旅平台与票务采购团队</span>
            <div><strong>3</strong><small>种独立预测方法</small></div>
            <div><strong>10:00 / 18:00</strong><small>每日预测时点</small></div>
            <div><strong>Excel</strong><small>结果明细导出</small></div>
            <div><strong>可追溯</strong><small>数据与模型版本</small></div>
          </div>
        </div>
      </section>

      <section id="capabilities" className="light-section section-pad">
        <div className="page-shell">
          <div className="section-heading two-column-heading">
            <div><span className="section-index">01 / 核心能力</span><h2>把复杂预测，转化为<br />可执行的采购判断</h2></div>
            <p>客户无需理解模型参数。系统围绕“现在是否采购、未来是否更低、何时更合适、可以节省多少”组织结果。</p>
          </div>
          <div className="capability-grid">
            {[
              ["01", "价格趋势预测", "展示未来多个采购时点的价格变化，并区分历史价格、模型情景与决策参考价。", "趋势"],
              ["02", "采购时机判断", "输出建议等待、继续观察或建议采购，让团队快速聚焦下一步行动。", "时机"],
              ["03", "风险量化", "结合距起飞时间、预测区间和降价概率，进行低、中、高风险分级。", "风险"],
              ["04", "批量节省测算", "根据采购张数计算单票和总预计节省，为批量计划提供量化参考。", "节省"],
            ].map(([index, title, copy, tag]) => (
              <article className="capability-card" key={index}>
                <div className="capability-top"><span>{index}</span><i aria-hidden="true">↗</i></div>
                <div className={`capability-visual visual-${index}`}><b>{tag}</b><span /><span /><span /></div>
                <h3>{title}</h3><p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="process-section section-pad">
        <div className="page-shell">
          <div className="section-heading centered-heading"><span className="section-index light">02 / 决策流程</span><h2>从价格数据到采购动作</h2><p>统一数据、预测、校准与输出流程，让每个结论都有清晰依据。</p></div>
          <div className="process-flow">
            {[
              ["01", "价格数据接入", "航班元数据与历史价格序列"],
              ["02", "序列构建", "统一到 10:00 / 18:00 时点"],
              ["03", "多模型预测", "LSTM / SARIMA / CatBoost"],
              ["04", "风险校准", "生成保守的决策参考价"],
              ["05", "建议输出", "报告、Excel 或 API 返回"],
            ].map(([index, title, copy], itemIndex) => (
              <div className="flow-item" key={index}>
                <span className="flow-number">{index}</span><h3>{title}</h3><p>{copy}</p>
                {itemIndex < 4 && <i className="flow-arrow" aria-hidden="true">→</i>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="demo" className="demo-section section-pad">
        <div className="page-shell">
          <div className="section-heading two-column-heading dark-text">
            <div><span className="section-index">03 / 在线演示</span><h2>一眼看懂航班级<br />采购机会</h2></div>
            <p>以下为固定原型演示数据，用于说明产品交互与决策口径，不代表真实成交价格或收益保证。</p>
          </div>
          <div className="demo-console">
            <aside className="demo-sidebar">
              <div className="mini-brand"><span className="brand-mark small"><span>AP</span></span><strong>航价智采</strong></div>
              <div className="sidebar-group"><small>采购工作台</small><button className="active"><i /> 机会总览</button><button><i /> 单航班分析</button><button><i /> 多模型对比</button><button><i /> 报告中心</button></div>
              <div className="sidebar-status"><span><i /> 系统运行正常</span><small>数据更新至<br />2026-07-20 18:00</small></div>
            </aside>
            <div className="demo-main">
              <div className="demo-title-row"><div><span>单航班分析</span><h3>{route.route}</h3><p>{route.flight} · {route.airline} · {route.departure}</p></div><button className="export-button">导出分析报告</button></div>
              <div className="route-tabs" role="tablist" aria-label="选择演示航线">
                {demoRoutes.map((item, index) => <button key={item.id} role="tab" aria-selected={routeIndex === index} onClick={() => setRouteIndex(index)}><span>{item.route}</span><small>{item.flight}</small></button>)}
              </div>
              <div className="analysis-grid">
                <article className={`advice-card advice-${route.action}`}><span className="advice-kicker">采购结论</span><h4>{route.action}</h4><p>预计重点采购时间</p><strong>{route.bestTime}</strong><div><span>{route.risk}</span><small>原型演示</small></div></article>
                <div className="kpi-grid">
                  <article><small>当前价格</small><strong>¥{route.current}</strong><span>最新观测价</span></article>
                  <article><small>决策参考最低价</small><strong className="green">¥{route.reference}</strong><span>风险校准后</span></article>
                  <article><small>最高降价概率</small><strong>{route.probability}%</strong><span>{route.probability >= 60 ? "较高" : "需谨慎"}</span></article>
                  <article><small>100 张预计节省</small><strong>¥{(saving * 100).toLocaleString()}</strong><span>预计节省率 {savingRate}%</span></article>
                </div>
              </div>
              <div className="analysis-bottom">
                <div className="large-chart-panel"><div className="panel-heading"><div><h4>价格趋势与决策参考</h4><p>历史真实价格 · 未来预测 · 决策参考价</p></div><span>价格单位：人民币</span></div><PriceChart route={route} /><div className="chart-axis"><span>07.07</span><span>数据更新 07.20</span><span>起飞 07.28</span></div></div>
                <div className="why-panel"><span className="why-number">WHY</span><h4>为什么给出这个建议？</h4><ol><li><b>{savingRate}%</b> 的预计降价空间</li><li><b>{route.probability}%</b> 的最高降价概率</li><li><b>{route.risk}</b>，已进行保守校准</li><li>低价集中在 <b>{route.bestTime}</b></li></ol><div className="watch-price"><small>重点观察价格</small><strong>¥{Math.round(route.reference * 1.03)} 以下</strong></div></div>
              </div>
              <div className="demo-disclaimer">本结果基于历史数据和统计模型生成，仅用于采购决策辅助。航司促销、库存、市场、天气和政策变化等因素可能导致实际价格偏离预测。</div>
            </div>
          </div>
        </div>
      </section>

      <section id="technology" className="technology-section section-pad">
        <div className="page-shell">
          <div className="tech-heading"><div><span className="section-index light">04 / 技术可信度</span><h2>独立方法交叉核验，<br />用边界感建立信任</h2></div><p>三种方法可切换、可对比、可复核；当前版本不宣称自动加权融合，也不把模型原始预测直接当作采购价格。</p></div>
          <div className="model-showcase">
            <div className="model-selector" role="tablist" aria-label="预测模型">
              {models.map((model, index) => <button key={model.name} role="tab" aria-selected={modelIndex === index} onClick={() => setModelIndex(index)}><span>0{index + 1}</span><strong>{model.name}</strong><small>{model.kicker}</small></button>)}
            </div>
            <div className="model-detail">
              <div className="model-detail-top"><span>MODEL / 0{modelIndex + 1}</span><strong>{selectedModel.metric}</strong></div><h3>{selectedModel.name}</h3><p>{selectedModel.copy}</p>
              <div className="model-facts">
                {modelIndex === 0 && <><div><small>序列窗口</small><strong>12 个观测点</strong></div><div><small>未来时点</small><strong>最多 10 点</strong></div><div><small>最低价 MAE</small><strong>¥62.04</strong></div></>}
                {modelIndex === 1 && <><div><small>季节周期</small><strong>m = 2</strong></div><div><small>选择准则</small><strong>AICc / AIC</strong></div><div><small>输出</small><strong>95% 统计区间</strong></div></>}
                {modelIndex === 2 && <><div><small>特征数量</small><strong>33 项</strong></div><div><small>最佳迭代</small><strong>274</strong></div><div><small>输出</small><strong>经验区间</strong></div></>}
              </div>
              <div className="metric-note">指标来自历史切分与模型技术报告，不代表未来所有航班都能达到相同表现；CatBoost 的经验区间不等同于严格概率保证。</div>
            </div>
          </div>
          <div className="trust-grid">
            <article><span>数据从哪里来</span><h3>航班元数据 + 历史价格序列</h3><p>当前演示数据覆盖北京—上海、上海—广州、上海—深圳三条航线，并保留数据更新时间与匹配核查信息。</p></article>
            <article><span>如何控制风险</span><h3>原始预测不直接用于采购</h3><p>系统结合预测步长、模型表现与距起飞时间，生成更保守的决策参考价和风险等级。</p></article>
            <article><span>如何评价效果</span><h3>使用准确的指标名称</h3><p>区分点预测误差、涨跌方向、是否下降与采购决策准确率，避免用单一“准确率”误导决策。</p></article>
          </div>
        </div>
      </section>

      <section className="scenario-section section-pad">
        <div className="page-shell">
          <div className="section-heading centered-heading"><span className="section-index">05 / 业务场景</span><h2>让规模化采购更有依据</h2><p>从单航班判断到批量机会筛选，为不同采购团队提供一致的决策语言。</p></div>
          <div className="scenario-grid">
            {[
              ["OTA 批量采购", "高频询价与批量库存压力下，快速识别更值得等待的航班。", "机会排序 · 批量节省测算"],
              ["企业商旅平台", "在行程确定性、预算与退改政策之间，寻找更稳健的采购窗口。", "风险分级 · 采购建议"],
              ["票务代理监控", "持续观察重点航线与航班，把价格变化转化为可执行动作。", "航班跟踪 · 模型复核"],
            ].map(([title, copy, feature], index) => <article key={title}><span>0{index + 1}</span><div className={`scenario-graphic scenario-${index + 1}`} aria-hidden="true"><i /><i /><i /></div><h3>{title}</h3><p>{copy}</p><strong>{feature}</strong></article>)}
          </div>
        </div>
      </section>

      <section id="cooperation" className="cooperation-section section-pad">
        <div className="page-shell cooperation-grid">
          <div><span className="section-index light">06 / 合作方案</span><h2>让每一次采购决策<br />都有数据依据</h2><p>可从静态高保真演示起步，逐步接入现有预测服务、客户数据与企业系统。</p><div className="cooperation-options">{["产品演示", "技术交流", "商务合作"].map((item) => <button key={item} aria-pressed={cooperation === item} onClick={() => setCooperation(item)}>{item}<span>↗</span></button>)}</div></div>
          <div className="cooperation-card"><span className="selection-label">已选择 / {cooperation}</span><h3>{cooperation === "产品演示" ? "查看固定演示数据下的完整决策流程" : cooperation === "技术交流" ? "核验模型口径、数据要求与接入边界" : "讨论企业采购场景与阶段性实施方案"}</h3><ul><li><i /> 客户官网与高保真 Demo</li><li><i /> 现有 Python 预测能力服务化</li><li><i /> 报告导出与客户系统接入规划</li></ul><button className="primary-button large" onClick={() => scrollToSection("top")}>返回顶部 <span>↑</span></button><p>联系渠道接入后，可在此提交正式演示申请。</p></div>
        </div>
      </section>

      <footer>
        <div className="page-shell footer-top"><div className="footer-brand"><span className="brand-mark"><span>AP</span></span><div><strong>航价智采</strong><small>AI 驱动的机票采购时机预测与成本优化平台</small></div></div><div className="footer-links"><a href="#capabilities">产品能力</a><a href="#demo">在线演示</a><a href="#technology">技术可信度</a><a href="#cooperation">合作方案</a></div></div>
        <div className="page-shell footer-bottom"><span>© 2026 航价智采 AirPrice Intelligence</span><span>技术报告编制日期：2026-07-22</span><span>预测不构成价格保证</span></div>
      </footer>
    </main>
  );
}
