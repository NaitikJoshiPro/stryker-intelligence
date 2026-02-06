"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

// ═══════════════════════════════════════════════════════════════════════════
// STRYKER INTELLIGENCE - MAIN PAGE
// AI-Driven Financial Intelligence & Regulatory Signal Extraction Platform
// Built by Naitik Joshi
// ═══════════════════════════════════════════════════════════════════════════

// Theme toggle function
function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme") || "dark";
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("stryker-theme", next);
}

// Counter animation hook
function useCounter(target: number, duration: number = 2000, inView: boolean) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;

    const start = performance.now();
    const animate = (currentTime: number) => {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) * (1 - progress);
      setCount(target * eased);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [target, duration, inView]);

  return count;
}

// Format number with commas
function formatNumber(num: number): string {
  return Math.floor(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

// ═══════════════════════════════════════════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════════════════════════════════════════

function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`nav ${scrolled ? "border-b-border-hover" : ""}`}>
      <a href="#" className="text-3xl font-light tracking-[-2px] text-accent no-underline">
        Σ
      </a>
      <div className="flex gap-6">
        {["Overview", "Architecture", "NLP Pipeline", "Signals", "Backtesting", "Governance"].map(
          (item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(" ", "-")}`}
              className="text-xs uppercase tracking-wider text-text-secondary hover:text-text-primary transition-colors no-underline"
            >
              {item}
            </a>
          )
        )}
      </div>
      <button
        onClick={toggleTheme}
        className="w-8 h-8 border border-border rounded-md bg-transparent text-text-secondary text-base cursor-pointer transition-all hover:border-border-hover hover:text-text-primary"
        title="Toggle theme (T)"
      >
        ◐
      </button>
    </nav>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// KPI CARD
// ═══════════════════════════════════════════════════════════════════════════

function KPICard({
  value,
  label,
  sub,
  prefix = "",
  suffix = "",
  inView,
}: {
  value: number;
  label: string;
  sub: string;
  prefix?: string;
  suffix?: string;
  inView: boolean;
}) {
  const count = useCounter(value, 2000, inView);

  return (
    <motion.div className="kpi-card" variants={fadeInUp}>
      <div className="kpi-value">
        {prefix}
        {formatNumber(count)}
        {suffix}
      </div>
      <div className="text-xs font-medium text-text-secondary uppercase tracking-wider">
        {label}
      </div>
      <div className="text-[10px] text-text-muted mt-1">{sub}</div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// HERO SECTION
// ═══════════════════════════════════════════════════════════════════════════

function HeroSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="overview" className="section text-center pt-20" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-16"
      >
        <div className="text-[10px] font-mono text-text-muted tracking-[3px] mb-6">
          STRATEGIC · TRANSCRIPTION · YIELD · KNOWLEDGE · EXTRACTION · RESEARCH
        </div>
        <h1 className="text-[120px] font-light text-accent tracking-[-8px] mb-4 leading-none">
          STRYKER
        </h1>
        <p className="text-2xl font-normal text-text-primary mb-2">
          AI Financial Intelligence Platform
        </p>
        <p className="text-sm text-text-secondary">
          Transform regulatory disclosures into actionable investment signals
        </p>
      </motion.div>

      <motion.div
        className="kpi-grid"
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <KPICard
          value={847291}
          label="Filings Processed"
          sub="10-K, 10-Q, 8-K documents"
          inView={inView}
        />
        <KPICard
          value={12847}
          label="Signals Generated"
          sub="BUY/HOLD/SELL classifications"
          inView={inView}
        />
        <KPICard
          value={18.7}
          label="Backtest Alpha"
          sub="Risk-adjusted excess return"
          suffix="%"
          inView={inView}
        />
        <KPICard
          value={99.7}
          label="System Uptime"
          sub="Production reliability"
          suffix="%"
          inView={inView}
        />
      </motion.div>

      <div className="text-text-muted text-xs">
        <span>Scroll to explore</span>
        <div className="mt-2 animate-bounce-slow">↓</div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// ARCHITECTURE SECTION
// ═══════════════════════════════════════════════════════════════════════════

const modules = [
  { id: "di", name: "Data Ingestion", icon: "📥", status: "ACTIVE", desc: "SEC EDGAR, earnings transcripts, financial news feeds" },
  { id: "nlp", name: "NLP Core", icon: "🧠", status: "ACTIVE", desc: "Transformer embeddings, sentiment analysis, risk tone modeling" },
  { id: "fe", name: "Feature Engine", icon: "⚙️", status: "ACTIVE", desc: "Fundamentals, volatility metrics, event flags, feature fusion" },
  { id: "ml", name: "ML Scoring", icon: "📊", status: "ACTIVE", desc: "Random Forest, XGBoost, LSTM ensemble aggregator" },
  { id: "bt", name: "Backtesting", icon: "📈", status: "ACTIVE", desc: "Buffer methodology, portfolio simulation, Sharpe optimization" },
  { id: "pm", name: "Portfolio Mgmt", icon: "💼", status: "PLANNED", desc: "Signal generation, position sizing, risk constraints" },
];

function ArchitectureSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="architecture" className="section" ref={ref}>
      <div className="section-header">
        <span className="text-[11px] font-mono text-text-muted tracking-[2px] block mb-2">01</span>
        <h2 className="text-4xl font-normal text-text-primary mb-3 tracking-tight">
          System Architecture
        </h2>
        <p className="text-sm text-text-secondary max-w-[600px] mx-auto">
          Six modules. Unified intelligence pipeline. Enterprise-grade processing.
        </p>
      </div>

      <motion.div
        className="grid grid-cols-3 gap-5 max-w-[1200px] mx-auto mb-12"
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {modules.map((mod) => (
          <motion.div
            key={mod.id}
            variants={fadeInUp}
            className={`card text-center relative ${mod.status === "ACTIVE" ? "card-active" : "opacity-50"
              }`}
          >
            <div
              className={`absolute top-3 right-3 text-[8px] font-mono px-2 py-0.5 rounded ${mod.status === "ACTIVE"
                  ? "bg-[var(--state-success-dim)] text-[var(--state-success)]"
                  : "bg-bg-elevated text-text-muted"
                }`}
            >
              {mod.status}
            </div>
            <div className="text-3xl mb-3">{mod.icon}</div>
            <div className="text-base font-medium text-text-primary mb-1">{mod.name}</div>
            <div className="text-[10px] font-mono text-text-muted tracking-wider mb-3">
              {mod.id.toUpperCase()}
            </div>
            <div className="text-[11px] text-text-secondary leading-relaxed">{mod.desc}</div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.5 }}
        className="card max-w-[1200px] mx-auto"
      >
        <div className="text-[10px] font-mono text-text-muted tracking-wider mb-4">
          DATA FLOW
        </div>
        <div className="pipeline">
          {["SEC EDGAR", "OCR Parser", "Tokenizer", "Embedder", "Vector DB", "ML Engine", "Signal Gen"].map(
            (node, i) => (
              <div key={node} className="flex items-center gap-3">
                <div className="pipeline-node">{node}</div>
                {i < 6 && <span className="pipeline-arrow">→</span>}
              </div>
            )
          )}
        </div>
      </motion.div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// NLP PIPELINE SECTION
// ═══════════════════════════════════════════════════════════════════════════

const tokens = ["10-K", "revenue", "growth", "risk", "guidance", "outlook", "margin", "debt"];
const sentimentData = { positive: 42, neutral: 38, negative: 20 };

function NLPPipelineSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="nlp-pipeline" className="section" ref={ref}>
      <div className="section-header">
        <span className="text-[11px] font-mono text-text-muted tracking-[2px] block mb-2">02</span>
        <h2 className="text-4xl font-normal text-text-primary mb-3 tracking-tight">
          NLP Processing Pipeline
        </h2>
        <p className="text-sm text-text-secondary max-w-[600px] mx-auto">
          Document ingestion. Tokenization. Embedding generation. Sentiment extraction.
        </p>
      </div>

      <motion.div
        className="grid grid-cols-3 gap-6 max-w-[1200px] mx-auto"
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* Stage 1: Document Ingestion */}
        <motion.div variants={fadeInUp} className="card">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-8 rounded-full bg-bg-elevated border border-border flex items-center justify-center text-sm font-mono text-text-muted">
              1
            </span>
            <span className="text-sm font-medium text-text-primary">Document Ingestion</span>
          </div>
          <div className="bg-bg-elevated rounded-lg p-4 font-mono text-xs">
            <span className="text-text-muted">// PDF → OCR → Raw Text</span>
            <br />
            <span className="text-[var(--state-info)]">extractViaOCR</span>(file) →{" "}
            <span className="text-[var(--state-success)]">&quot;Forward-looking statements...&quot;</span>
          </div>
        </motion.div>

        {/* Stage 2: Tokenization */}
        <motion.div variants={fadeInUp} className="card">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-8 rounded-full bg-bg-elevated border border-border flex items-center justify-center text-sm font-mono text-text-muted">
              2
            </span>
            <span className="text-sm font-medium text-text-primary">Tokenization</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {tokens.map((token) => (
              <span
                key={token}
                className="px-3 py-1 bg-bg-elevated border border-border rounded text-xs font-mono text-text-secondary"
              >
                {token}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Stage 3: Sentiment Analysis */}
        <motion.div variants={fadeInUp} className="card">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-8 rounded-full bg-bg-elevated border border-border flex items-center justify-center text-sm font-mono text-text-muted">
              3
            </span>
            <span className="text-sm font-medium text-text-primary">Sentiment Scoring</span>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-xs text-text-muted w-16">Positive</span>
              <div className="flex-1 h-2 bg-bg-elevated rounded overflow-hidden">
                <div
                  className="h-full bg-[var(--state-success)] transition-all duration-1000"
                  style={{ width: inView ? `${sentimentData.positive}%` : "0%" }}
                />
              </div>
              <span className="text-xs font-mono text-text-secondary w-10">
                {sentimentData.positive}%
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-text-muted w-16">Neutral</span>
              <div className="flex-1 h-2 bg-bg-elevated rounded overflow-hidden">
                <div
                  className="h-full bg-[var(--state-warning)] transition-all duration-1000 delay-200"
                  style={{ width: inView ? `${sentimentData.neutral}%` : "0%" }}
                />
              </div>
              <span className="text-xs font-mono text-text-secondary w-10">
                {sentimentData.neutral}%
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-text-muted w-16">Negative</span>
              <div className="flex-1 h-2 bg-bg-elevated rounded overflow-hidden">
                <div
                  className="h-full bg-[var(--state-error)] transition-all duration-1000 delay-400"
                  style={{ width: inView ? `${sentimentData.negative}%` : "0%" }}
                />
              </div>
              <span className="text-xs font-mono text-text-secondary w-10">
                {sentimentData.negative}%
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SIGNAL ENGINE SECTION
// ═══════════════════════════════════════════════════════════════════════════

const signalResults = [
  { signal: "BUY", confidence: 94.2, color: "var(--signal-buy)" },
  { signal: "HOLD", confidence: 4.8, color: "var(--signal-hold)" },
  { signal: "SELL", confidence: 1.0, color: "var(--signal-sell)" },
];

function SignalEngineSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="signals" className="section" ref={ref}>
      <div className="section-header">
        <span className="text-[11px] font-mono text-text-muted tracking-[2px] block mb-2">03</span>
        <h2 className="text-4xl font-normal text-text-primary mb-3 tracking-tight">
          Signal Engine
        </h2>
        <p className="text-sm text-text-secondary max-w-[600px] mx-auto">
          ML ensemble scoring. Feature fusion. Investment signal classification.
        </p>
      </div>

      <motion.div
        className="grid grid-cols-2 gap-6 max-w-[1000px] mx-auto"
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* ML Pipeline */}
        <motion.div variants={fadeInUp} className="card">
          <div className="text-[10px] font-mono text-text-muted tracking-wider mb-4">
            ML ENSEMBLE PIPELINE
          </div>
          <div className="space-y-4">
            {["Random Forest", "XGBoost", "LSTM Network"].map((model, i) => (
              <div key={model} className="flex items-center gap-4">
                <div className="w-8 h-8 rounded bg-bg-elevated border border-border flex items-center justify-center text-xs font-mono text-text-muted">
                  M{i + 1}
                </div>
                <div className="flex-1">
                  <div className="text-sm text-text-primary">{model}</div>
                  <div className="text-[10px] text-text-muted">Weight: {[0.35, 0.35, 0.30][i]}</div>
                </div>
                <div className="text-xs font-mono text-[var(--state-success)]">READY</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Classification Results */}
        <motion.div variants={fadeInUp} className="card">
          <div className="text-[10px] font-mono text-text-muted tracking-wider mb-4">
            CLASSIFICATION RESULTS
          </div>
          <div className="space-y-3">
            {signalResults.map((result) => (
              <div
                key={result.signal}
                className="p-4 rounded-lg border"
                style={{
                  background: `${result.color}15`,
                  borderColor: result.color,
                }}
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium" style={{ color: result.color }}>
                    {result.signal}
                  </span>
                  <span className="text-lg font-mono font-semibold" style={{ color: result.color }}>
                    {result.confidence}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// BACKTESTING SECTION
// ═══════════════════════════════════════════════════════════════════════════

const backtestMetrics = [
  { label: "Sharpe Ratio", value: "2.14", sub: "Risk-adjusted return" },
  { label: "Max Drawdown", value: "-12.3%", sub: "Worst peak-to-trough" },
  { label: "Win Rate", value: "68.4%", sub: "Profitable trades" },
  { label: "Annualized Alpha", value: "+18.7%", sub: "Excess vs benchmark" },
];

function BacktestingSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="backtesting" className="section" ref={ref}>
      <div className="section-header">
        <span className="text-[11px] font-mono text-text-muted tracking-[2px] block mb-2">04</span>
        <h2 className="text-4xl font-normal text-text-primary mb-3 tracking-tight">
          Backtesting Engine
        </h2>
        <p className="text-sm text-text-secondary max-w-[600px] mx-auto">
          Buffer methodology. Portfolio simulation. Risk-adjusted performance metrics.
        </p>
      </div>

      <motion.div
        className="grid grid-cols-4 gap-6 max-w-[1200px] mx-auto mb-8"
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {backtestMetrics.map((metric) => (
          <motion.div key={metric.label} variants={fadeInUp} className="card text-center">
            <div className="text-3xl font-mono font-semibold text-text-primary mb-2">
              {metric.value}
            </div>
            <div className="text-xs font-medium text-text-secondary uppercase tracking-wider">
              {metric.label}
            </div>
            <div className="text-[10px] text-text-muted mt-1">{metric.sub}</div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.5 }}
        className="card max-w-[1200px] mx-auto"
      >
        <div className="text-[10px] font-mono text-text-muted tracking-wider mb-4">
          BACKTEST CONFIGURATION
        </div>
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Start Date", value: "2020-01-01" },
            { label: "End Date", value: "2025-12-31" },
            { label: "Initial Capital", value: "$1,000,000" },
            { label: "Buffer Period", value: "5 trading days" },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <div className="text-xs text-text-muted mb-1">{item.label}</div>
              <div className="text-sm font-mono text-text-primary">{item.value}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// GOVERNANCE SECTION
// ═══════════════════════════════════════════════════════════════════════════

const raciData = [
  { report: "Signal Report", r: "Analyst", a: "Quant Lead", c: "Risk Mgr", i: "CIO" },
  { report: "Daily Metrics", r: "Ops Team", a: "Ops Lead", c: "Compliance", i: "PM" },
  { report: "Backtest Results", r: "Quant Team", a: "Quant Lead", c: "Risk Mgr", i: "CIO" },
];

function GovernanceSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="governance" className="section" ref={ref}>
      <div className="section-header">
        <span className="text-[11px] font-mono text-text-muted tracking-[2px] block mb-2">05</span>
        <h2 className="text-4xl font-normal text-text-primary mb-3 tracking-tight">
          Governance & RACI
        </h2>
        <p className="text-sm text-text-secondary max-w-[600px] mx-auto">
          Responsibility matrices. Approval chains. Accountability trails.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        className="max-w-[1000px] mx-auto"
      >
        <div className="card overflow-hidden p-0">
          <table className="data-table">
            <thead>
              <tr>
                <th>Report</th>
                <th className="text-[var(--state-info)]">R</th>
                <th className="text-[var(--state-error)]">A</th>
                <th className="text-[var(--state-warning)]">C</th>
                <th className="text-[var(--state-success)]">I</th>
              </tr>
            </thead>
            <tbody>
              {raciData.map((row) => (
                <tr key={row.report}>
                  <td className="font-medium text-text-primary">{row.report}</td>
                  <td>{row.r}</td>
                  <td>{row.a}</td>
                  <td>{row.c}</td>
                  <td>{row.i}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.3 }}
          className="card mt-6"
        >
          <div className="text-[10px] font-mono text-text-muted tracking-wider mb-4">
            APPROVAL WORKFLOW
          </div>
          <div className="flex items-center justify-between">
            {["Created", "Reviewed", "Pending", "Notified"].map((stage, i) => (
              <div key={stage} className="flex items-center">
                <div className="text-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 border text-sm ${i < 2
                        ? "bg-[var(--state-success-dim)] border-[var(--state-success)] text-[var(--state-success)]"
                        : i === 2
                          ? "bg-[var(--state-warning-dim)] border-[var(--state-warning)] text-[var(--state-warning)]"
                          : "bg-bg-elevated border-border text-text-muted"
                      }`}
                  >
                    {i < 2 ? "✓" : i === 2 ? "◉" : "○"}
                  </div>
                  <div className="text-xs font-medium text-text-primary">{stage}</div>
                </div>
                {i < 3 && (
                  <div
                    className={`w-16 h-0.5 mx-2 ${i < 2 ? "bg-[var(--state-success)]" : "bg-border"
                      }`}
                  />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// DATA ALTAR SECTION
// ═══════════════════════════════════════════════════════════════════════════

const sampleFilings = [
  { id: "10K-AAPL-2025", ticker: "AAPL", type: "10-K", date: "02/01/26", signal: "BUY", score: 94.2 },
  { id: "10Q-MSFT-2025", ticker: "MSFT", type: "10-Q", date: "01/28/26", signal: "BUY", score: 87.3 },
  { id: "8K-GOOGL-2025", ticker: "GOOGL", type: "8-K", date: "01/25/26", signal: "HOLD", score: 52.1 },
  { id: "10K-NVDA-2025", ticker: "NVDA", type: "10-K", date: "01/22/26", signal: "BUY", score: 91.8 },
  { id: "10Q-AMZN-2025", ticker: "AMZN", type: "10-Q", date: "01/20/26", signal: "SELL", score: 23.4 },
  { id: "8K-META-2025", ticker: "META", type: "8-K", date: "01/18/26", signal: "HOLD", score: 48.9 },
];

function DataAltarSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const getSignalStyle = (signal: string) => {
    switch (signal) {
      case "BUY":
        return "status-success";
      case "SELL":
        return "status-error";
      default:
        return "status-warning";
    }
  };

  return (
    <section id="data-altar" className="section" ref={ref}>
      <div className="section-header">
        <span className="text-[11px] font-mono text-text-muted tracking-[2px] block mb-2">06</span>
        <h2 className="text-4xl font-normal text-text-primary mb-3 tracking-tight">
          The Data Altar
        </h2>
        <p className="text-sm text-text-secondary max-w-[600px] mx-auto">
          Unified filing view. Signal history. Investment intelligence archive.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        className="max-w-[1200px] mx-auto"
      >
        <div className="card overflow-hidden p-0">
          <div className="bg-bg-elevated p-4 border-b border-border">
            <div className="flex gap-2">
              {["ALL_FILINGS", "10-K", "10-Q", "8-K", "TRANSCRIPTS"].map((tab, i) => (
                <span
                  key={tab}
                  className={`text-[10px] font-mono px-3 py-1 rounded cursor-pointer ${i === 0
                      ? "bg-bg-card border border-border text-text-primary"
                      : "text-text-muted hover:text-text-secondary"
                    }`}
                >
                  {tab}
                </span>
              ))}
            </div>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Filing ID</th>
                <th>Ticker</th>
                <th>Type</th>
                <th>Date</th>
                <th>Signal</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {sampleFilings.map((filing) => (
                <tr key={filing.id}>
                  <td className="font-mono">{filing.id}</td>
                  <td className="font-medium text-text-primary">{filing.ticker}</td>
                  <td>{filing.type}</td>
                  <td className="font-mono">{filing.date}</td>
                  <td>
                    <span className={`status-badge ${getSignalStyle(filing.signal)}`}>
                      {filing.signal}
                    </span>
                  </td>
                  <td className="font-mono">{filing.score.toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center gap-8 mt-6">
          <div className="text-center">
            <span className="text-2xl font-mono font-semibold text-text-primary">847,291</span>
            <span className="block text-xs text-text-muted mt-1">Total Filings</span>
          </div>
          <div className="text-center">
            <span className="text-2xl font-mono font-semibold text-text-primary">6</span>
            <span className="block text-xs text-text-muted mt-1">Filing Types</span>
          </div>
          <div className="text-center">
            <span className="text-2xl font-mono font-semibold text-text-primary">12,847</span>
            <span className="block text-xs text-text-muted mt-1">Active Signals</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// FOOTER
// ═══════════════════════════════════════════════════════════════════════════

function Footer() {
  return (
    <footer className="py-8 px-8 border-t border-border">
      <div className="max-w-[1200px] mx-auto flex justify-between items-center text-xs text-text-muted">
        <div className="flex items-center gap-4">
          <span className="text-lg font-light tracking-[-2px] text-accent">Σ</span>
          <span>STRYKER v1.0.0</span>
        </div>
        <div>AI Financial Intelligence Platform</div>
        <div>
          Built by{" "}
          <a
            href="https://naitik.online"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-primary hover:underline"
          >
            Naitik Joshi
          </a>
        </div>
      </div>
    </footer>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════════════════

export default function Home() {
  useEffect(() => {
    // Load saved theme
    const saved = localStorage.getItem("stryker-theme") || "dark";
    document.documentElement.setAttribute("data-theme", saved);

    // Keyboard shortcut for theme toggle
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "t" && !e.ctrlKey && !e.metaKey) {
        const active = document.activeElement;
        const isInput = active?.tagName === "INPUT" || active?.tagName === "TEXTAREA";
        if (!isInput) toggleTheme();
      }
    };
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <ArchitectureSection />
        <NLPPipelineSection />
        <SignalEngineSection />
        <BacktestingSection />
        <GovernanceSection />
        <DataAltarSection />
      </main>
      <Footer />
    </>
  );
}
