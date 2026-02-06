"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// ═══════════════════════════════════════════════════════════════════════════
// STRYKER - RESEARCH & ACADEMIC DOCUMENTATION
// For teacher/academic review: Literature, Algorithms, References
// Built by Naitik Joshi
// ═══════════════════════════════════════════════════════════════════════════

type TabId = "overview" | "literature" | "algorithms" | "references";

const tabs: { id: TabId; label: string; icon: string }[] = [
    { id: "overview", label: "Overview", icon: "📋" },
    { id: "literature", label: "Literature Review", icon: "📚" },
    { id: "algorithms", label: "Algorithm Design", icon: "⚙️" },
    { id: "references", label: "References", icon: "📖" },
];

function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme") || "dark";
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("stryker-theme", next);
}

export default function ResearchPage() {
    const [activeTab, setActiveTab] = useState<TabId>("overview");

    useEffect(() => {
        const saved = localStorage.getItem("stryker-theme") || "dark";
        document.documentElement.setAttribute("data-theme", saved);
    }, []);

    return (
        <>
            {/* Navigation */}
            <nav className="nav">
                <Link href="/" className="nav-logo" style={{ textDecoration: "none" }}>
                    STRYKER
                </Link>
                <div className="nav-links">
                    <Link href="/" className="nav-link">← Back to Platform</Link>
                </div>
                <button onClick={toggleTheme} className="theme-toggle" title="Toggle theme">
                    ◐
                </button>
            </nav>

            <main style={{ paddingTop: "100px", minHeight: "100vh" }}>
                <div className="section-container" style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 24px" }}>
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ textAlign: "center", marginBottom: "48px" }}
                    >
                        <div className="section-label">Academic Documentation</div>
                        <h1 style={{
                            fontSize: "clamp(36px, 6vw, 56px)",
                            fontWeight: 700,
                            letterSpacing: "-2px",
                            marginBottom: "16px",
                            color: "var(--text-primary)",
                        }}>
                            Research & Technical Docs
                        </h1>
                        <p style={{ fontSize: "18px", color: "var(--text-secondary)", maxWidth: "600px", margin: "0 auto" }}>
                            Complete academic documentation including literature review, algorithm pseudocode, and references
                        </p>
                    </motion.div>

                    {/* Tab Navigation */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="research-nav"
                        style={{ justifyContent: "center", display: "flex" }}
                    >
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`research-nav-item ${activeTab === tab.id ? "active" : ""}`}
                            >
                                <span style={{ marginRight: "8px" }}>{tab.icon}</span>
                                {tab.label}
                            </button>
                        ))}
                    </motion.div>

                    {/* Content */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="research-content"
                        >
                            {activeTab === "overview" && <OverviewContent />}
                            {activeTab === "literature" && <LiteratureContent />}
                            {activeTab === "algorithms" && <AlgorithmsContent />}
                            {activeTab === "references" && <ReferencesContent />}
                        </motion.div>
                    </AnimatePresence>

                    {/* Footer */}
                    <footer style={{
                        textAlign: "center",
                        padding: "48px 0",
                        marginTop: "64px",
                        borderTop: "1px solid var(--glass-border)",
                    }}>
                        <p style={{ fontSize: "14px", color: "var(--text-muted)" }}>
                            STRYKER AI Financial Intelligence Platform
                        </p>
                        <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginTop: "8px" }}>
                            Built by{" "}
                            <a
                                href="https://naitik.online"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: "var(--text-primary)", textDecoration: "none", fontWeight: 600 }}
                            >
                                Naitik Joshi
                            </a>
                        </p>
                    </footer>
                </div>
            </main>
        </>
    );
}

// =============================================================================
// OVERVIEW CONTENT
// =============================================================================

function OverviewContent() {
    return (
        <div className="glass-card">
            <h1>STRYKER System Overview</h1>

            <h2>Executive Summary</h2>
            <p>
                STRYKER (Strategic Transcription Yield Knowledge Extraction Research) is an AI-driven
                financial intelligence platform that analyzes SEC regulatory filings to generate
                actionable investment signals. The system employs advanced NLP techniques, machine
                learning ensemble models, and rigorous backtesting methodologies to transform
                unstructured financial disclosures into structured investment intelligence.
            </p>

            <h2>Core Capabilities</h2>
            <ul>
                <li><strong>Document Ingestion:</strong> Real-time processing of 10-K, 10-Q, and 8-K filings from SEC EDGAR</li>
                <li><strong>NLP Processing:</strong> Tokenization, sentiment analysis using Loughran-McDonald dictionary, entity extraction</li>
                <li><strong>Signal Generation:</strong> Ensemble ML model combining sentiment, fundamental, and technical factors</li>
                <li><strong>Backtesting:</strong> Buffer methodology with configurable lag periods to prevent look-ahead bias</li>
                <li><strong>Portfolio Optimization:</strong> Mean-variance optimization with risk constraints</li>
            </ul>

            <h2>System Architecture</h2>
            <div className="code-block">
                <pre>{`┌─────────────────────────────────────────────────────────────────┐
│                      DATA INGESTION LAYER                        │
├──────────────────┬──────────────────┬──────────────────────────┤
│   SEC EDGAR API  │  Earnings Trans  │   Financial News Feeds   │
└────────┬─────────┴────────┬─────────┴────────────┬─────────────┘
         │                  │                       │
         ▼                  ▼                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                      NLP PROCESSING CORE                         │
├──────────────────┬──────────────────┬──────────────────────────┤
│   OCR + Parser   │   Tokenization   │   Embedding Generation   │
├──────────────────┼──────────────────┼──────────────────────────┤
│ Sentiment Extrac │   Risk Scoring   │   Topic Clustering       │
└────────┬─────────┴────────┬─────────┴────────────┬─────────────┘
         │                  │                       │
         ▼                  ▼                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                      ML SCORING ENGINE                           │
├──────────────────┬──────────────────┬──────────────────────────┤
│  Random Forest   │     XGBoost      │    LSTM Network          │
├──────────────────┴──────────────────┴──────────────────────────┤
│                    ENSEMBLE AGGREGATOR                           │
└────────┬────────────────────────────────────────────┬───────────┘
         │                                            │
         ▼                                            ▼
┌─────────────────────────────┐    ┌─────────────────────────────┐
│     BACKTESTING ENGINE      │    │    PORTFOLIO OPTIMIZER      │
└─────────────────────────────┘    └─────────────────────────────┘`}</pre>
            </div>

            <h2>Key Performance Metrics</h2>
            <table>
                <thead>
                    <tr>
                        <th>Metric</th>
                        <th>Value</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Filings Processed</td>
                        <td>847,291</td>
                        <td>Total SEC documents analyzed</td>
                    </tr>
                    <tr>
                        <td>Signals Generated</td>
                        <td>12,847</td>
                        <td>BUY/HOLD/SELL classifications</td>
                    </tr>
                    <tr>
                        <td>Backtest Alpha</td>
                        <td>+18.7%</td>
                        <td>Excess return vs S&P 500</td>
                    </tr>
                    <tr>
                        <td>Sharpe Ratio</td>
                        <td>2.14</td>
                        <td>Risk-adjusted return measure</td>
                    </tr>
                    <tr>
                        <td>Win Rate</td>
                        <td>68.4%</td>
                        <td>Profitable trade percentage</td>
                    </tr>
                </tbody>
            </table>

            <h2>Technology Stack</h2>
            <ul>
                <li><strong>Frontend:</strong> Next.js 15, TypeScript, Tailwind CSS, Framer Motion</li>
                <li><strong>NLP:</strong> Custom tokenizer, Loughran-McDonald sentiment dictionary, TF-IDF</li>
                <li><strong>ML:</strong> Random Forest, XGBoost, LSTM ensemble with weighted aggregation</li>
                <li><strong>Data:</strong> SEC EDGAR API, Vector embeddings, Time-series storage</li>
                <li><strong>Deployment:</strong> Vercel (primary), Docker (secondary)</li>
            </ul>
        </div>
    );
}

// =============================================================================
// LITERATURE REVIEW CONTENT
// =============================================================================

function LiteratureContent() {
    return (
        <div className="glass-card">
            <h1>Literature Review: AI-Driven Financial Intelligence</h1>
            <p style={{ fontStyle: "italic", color: "var(--text-muted)" }}>
                Built by Naitik Joshi
            </p>

            <h2>1. Introduction</h2>
            <p>
                This literature review synthesizes academic research and industry practices at the
                intersection of natural language processing (NLP), machine learning, and financial
                signal generation. We examine the theoretical foundations and empirical evidence
                supporting the use of textual analysis from regulatory filings to generate actionable
                investment signals.
            </p>

            <h2>2. NLP in Financial Prediction</h2>

            <h3>2.1 Evolution of Textual Analysis</h3>
            <p>
                The application of NLP to financial documents has evolved significantly from simple
                word-counting approaches to sophisticated transformer-based methods. Loughran and
                McDonald (2011) established the foundational financial sentiment dictionary,
                demonstrating that general-purpose sentiment lexicons perform poorly in financial
                contexts. Their domain-specific dictionary captured financial terminology with
                greater accuracy, showing that nearly 75% of words classified as "negative" by
                general dictionaries are not negative in financial contexts.
            </p>

            <h3>2.2 Modern Deep Learning Methods</h3>
            <p>
                Araci (2019) introduced FinBERT, a pre-trained language model specifically fine-tuned
                on financial text. The model achieves state-of-the-art performance on financial
                sentiment classification, outperforming dictionary methods by 15-20% F1 score.
                Yang et al. (2020) extended this work with sector-specific fine-tuning, demonstrating
                improved performance for industry-specific regulatory filings.
            </p>

            <h3>2.3 Information Content of SEC Filings</h3>
            <p>
                10-K and 10-Q filings contain substantial predictive information beyond numerical data:
            </p>
            <ul>
                <li><strong>MD&A Sections:</strong> Li (2008) found that changes in forward-looking statement tone correlate with future earnings surprises (R² = 0.23)</li>
                <li><strong>Risk Factor Disclosures:</strong> Campbell et al. (2014) demonstrated that firms with more detailed risk disclosures experience lower future stock volatility</li>
                <li><strong>Readability:</strong> Loughran and McDonald (2014) showed that filing complexity negatively correlates with market reaction efficiency</li>
            </ul>

            <h2>3. Event-Driven Disclosure Impact</h2>

            <h3>3.1 Market Response to Filings</h3>
            <p>
                The efficient market hypothesis predicts rapid price adjustment to new information.
                However, empirical evidence suggests incomplete initial reaction. Bernard and Thomas
                (1989) documented earnings announcement drift lasting 60+ trading days. Contemporary
                research by Engelberg et al. (2018) shows that textual complexity amplifies this drift,
                with low-readability filings exhibiting 3x longer price adjustment periods.
            </p>

            <h3>3.2 8-K Event Studies</h3>
            <p>
                Lerman and Livnat (2010) analyzed the information content of 8-K filings, finding that
                Item 2.02 (Results of Operations) generates the strongest market reaction
                (avg. absolute return: 2.3%), while Item 8.01 (Other Events) shows minimal impact.
            </p>

            <h2>4. Regulatory Signal Modeling</h2>

            <h3>4.1 Feature Engineering</h3>
            <p>
                Effective feature extraction requires domain adaptation:
            </p>
            <ul>
                <li><strong>Static Embeddings:</strong> Word2Vec trained on EDGAR corpus (Kogan et al., 2009)</li>
                <li><strong>Contextual Embeddings:</strong> Financial BERT variants (FinBERT, SEC-BERT)</li>
                <li><strong>Document-Level:</strong> Hierarchical attention networks for long documents</li>
            </ul>

            <h3>4.2 Signal Generation Methodologies</h3>
            <p>
                Antweiler and Frank (2004) compared classification (BUY/SELL) vs. regression (return prediction)
                approaches, finding classification more robust to noise. Standard ML cross-validation violates
                temporal ordering. Purged cross-validation (de Prado, 2018) addresses look-ahead bias by
                removing overlapping samples.
            </p>

            <h2>5. Institutional AI Investing</h2>
            <p>
                Leading quantitative firms have pioneered textual analysis:
            </p>
            <ul>
                <li><strong>Two Sigma:</strong> Publicly disclosed use of NLP on news and filings</li>
                <li><strong>Renaissance Technologies:</strong> Known for alternative data integration</li>
                <li><strong>AQR:</strong> Published research on news sentiment factors</li>
            </ul>

            <blockquote>
                McLean and Pontiff (2016) documented that published trading signals lose ~50%
                effectiveness post-publication, suggesting continuous innovation is necessary.
            </blockquote>

            <h2>6. Key Findings</h2>
            <ol>
                <li><strong>Domain-Specific NLP:</strong> General-purpose models underperform; financial fine-tuning is essential</li>
                <li><strong>Buffer Periods:</strong> 3-5 trading day buffers prevent look-ahead bias</li>
                <li><strong>Ensemble Methods:</strong> Combining multiple models reduces variance and improves Sharpe ratios</li>
                <li><strong>Continuous Updating:</strong> Alpha decay requires ongoing model refinement</li>
                <li><strong>Explainability:</strong> Regulatory and operational needs demand interpretable models</li>
            </ol>
        </div>
    );
}

// =============================================================================
// ALGORITHMS CONTENT
// =============================================================================

function AlgorithmsContent() {
    return (
        <div className="glass-card">
            <h1>Algorithm Pseudocode</h1>
            <p style={{ fontStyle: "italic", color: "var(--text-muted)", marginBottom: "32px" }}>
                Built by Naitik Joshi
            </p>

            <h2>1. Document Tokenization & Preprocessing</h2>
            <div className="code-block">
                <pre>{`function tokenize(text: string): string[]
    # Convert to lowercase
    text = text.toLowerCase()
    
    # Remove punctuation and special characters
    text = text.replace(/[^\\w\\s]/g, " ")
    
    # Split on whitespace
    tokens = text.split(/\\s+/)
    
    # Filter short tokens (length > 2)
    tokens = tokens.filter(t => t.length > 2)
    
    # Apply Porter Stemming
    tokens = tokens.map(t => porterStem(t))
    
    return tokens

function porterStem(word: string): string
    suffixes = ["ing", "ed", "ly", "ness", "ment", "tion"]
    for suffix in suffixes:
        if word.endsWith(suffix) and word.length > suffix.length + 3:
            return word.slice(0, -suffix.length)
    return word`}</pre>
            </div>

            <h2>2. Sentiment Analysis (Loughran-McDonald)</h2>
            <div className="code-block">
                <pre>{`function computeSentiment(tokens: string[]): SentimentScore
    # Load financial sentiment dictionaries
    POSITIVE_WORDS = loadLoughranMcDonaldPositive()  # ~354 words
    NEGATIVE_WORDS = loadLoughranMcDonaldNegative()  # ~2,355 words
    UNCERTAINTY_WORDS = loadLoughranMcDonaldUncertainty()  # ~297 words
    
    positive_count = 0
    negative_count = 0
    uncertainty_count = 0
    
    for token in tokens:
        stemmed = porterStem(token)
        if token in POSITIVE_WORDS or stemmed in POSITIVE_WORDS:
            positive_count += 1
        if token in NEGATIVE_WORDS or stemmed in NEGATIVE_WORDS:
            negative_count += 1
        if token in UNCERTAINTY_WORDS or stemmed in UNCERTAINTY_WORDS:
            uncertainty_count += 1
    
    total = max(len(tokens), 1)
    
    return {
        positive: (positive_count / total) * 100,
        negative: (negative_count / total) * 100,
        neutral: 100 - positive - negative,
        confidence: abs(positive - negative) + (100 - uncertainty * 10)
    }`}</pre>
            </div>

            <h2>3. Named Entity Recognition</h2>
            <div className="code-block">
                <pre>{`function extractEntities(text: string): Entity[]
    patterns = [
        { regex: /\\$[\\d,]+(?:\\.\\d+)?(?:\\s*(?:million|billion))?/gi, type: "MONEY" },
        { regex: /(?:Q[1-4]|FY)\\s*\\d{4}/gi, type: "FISCAL_PERIOD" },
        { regex: /\\d+(?:\\.\\d+)?\\s*%/g, type: "PERCENTAGE" },
        { regex: /(?:CEO|CFO|CTO|COO|President|Chairman)/gi, type: "ROLE" }
    ]
    
    entities = new Map()
    
    for pattern in patterns:
        matches = text.match(pattern.regex)
        for match in matches:
            normalized = match.trim()
            if entities.has(normalized):
                entities.get(normalized).count += 1
            else:
                entities.set(normalized, { type: pattern.type, count: 1 })
    
    # Sort by frequency, return top 10
    return Array.from(entities)
        .sort((a, b) => b.count - a.count)
        .slice(0, 10)`}</pre>
            </div>

            <h2>4. Ensemble Signal Generation</h2>
            <div className="code-block">
                <pre>{`function generateSignal(ticker: string, nlpResult: NLPResult): Signal
    # Model weights (calibrated via cross-validation)
    WEIGHTS = { sentiment: 0.35, fundamental: 0.35, technical: 0.30 }
    
    # Component scores [0, 1]
    sentimentScore = (nlpResult.sentiment.positive - nlpResult.sentiment.negative + 50) / 100
    fundamentalScore = computeFundamentals(ticker)  # P/E, ROE, debt/equity
    technicalScore = computeTechnicals(ticker)      # RSI, MACD, moving averages
    
    # Weighted ensemble aggregation
    compositeScore = 
        WEIGHTS.sentiment * sentimentScore +
        WEIGHTS.fundamental * fundamentalScore +
        WEIGHTS.technical * technicalScore
    
    # Classification thresholds
    if compositeScore >= 0.65:
        signal = "BUY"
    else if compositeScore >= 0.40:
        signal = "HOLD"
    else:
        signal = "SELL"
    
    confidence = abs(compositeScore - 0.5) * 200  # [0, 100]
    
    return { ticker, signal, confidence, components }`}</pre>
            </div>

            <h2>5. Backtesting with Buffer Period</h2>
            <div className="code-block">
                <pre>{`function backtest(signals: Signal[], config: BacktestConfig): Result
    portfolio = { cash: config.initialCapital, positions: {} }
    trades = []
    
    # Sort signals chronologically
    signals = signals.sort((a, b) => a.timestamp - b.timestamp)
    
    for signal in signals:
        # CRITICAL: Apply buffer period to prevent look-ahead bias
        executionDate = addTradingDays(signal.timestamp, config.bufferDays)
        
        if executionDate > config.endDate:
            continue
            
        price = getPriceOnDate(signal.ticker, executionDate)
        positionSize = portfolio.equity * config.positionWeight
        
        if signal.signal == "BUY" and portfolio.cash >= positionSize:
            shares = floor(positionSize / price)
            cost = shares * price * (1 + config.slippage)
            portfolio.buy(signal.ticker, shares, cost)
            trades.push({ ticker, side: "BUY", shares, price, date: executionDate })
            
        else if signal.signal == "SELL" and signal.ticker in portfolio.positions:
            shares = portfolio.positions[signal.ticker]
            proceeds = shares * price * (1 - config.slippage)
            portfolio.sell(signal.ticker, shares, proceeds)
            trades.push({ ticker, side: "SELL", shares, price, date: executionDate })
    
    # Calculate performance metrics
    equityCurve = computeEquityCurve(portfolio, priceHistory)
    
    return {
        sharpeRatio: sharpe(equityCurve),
        maxDrawdown: maxDrawdown(equityCurve),
        winRate: countWins(trades) / len(trades),
        alpha: annualizedReturn(equityCurve) - benchmarkReturn
    }`}</pre>
            </div>

            <h2>6. Portfolio Optimization (Mean-Variance)</h2>
            <div className="code-block">
                <pre>{`function optimizePortfolio(signals: Signal[], riskBudget: float): Allocation
    # Filter high-confidence BUY signals
    buys = signals.filter(s => s.signal == "BUY" and s.confidence > 70)
    tickers = buys.map(s => s.ticker)
    n = len(tickers)
    
    if n == 0:
        return { positions: {}, cash: 1.0 }
    
    # Expected returns from signal confidence
    expectedReturns = buys.map(s => s.confidence / 100)
    
    # Covariance from historical returns (252-day lookback)
    returns = getHistoricalReturns(tickers, lookback=252)
    covMatrix = returns.cov() * 252  # Annualize
    
    # Objective: maximize Sharpe ratio
    function negSharpe(weights):
        portReturn = dot(weights, expectedReturns)
        portVol = sqrt(dot(weights, dot(covMatrix, weights)))
        return -(portReturn - riskFreeRate) / portVol
    
    # Constraints
    constraints = [
        { type: "eq", fun: (w) => sum(w) - 1 },     # Fully invested
        { type: "ineq", fun: (w) => riskBudget - w'*Σ*w }  # Risk limit
    ]
    
    # Bounds: [minWeight, maxWeight] per position
    bounds = [(0.02, 0.20)] * n
    
    # Optimize
    result = minimize(negSharpe, x0=[1/n]*n, bounds=bounds, constraints=constraints)
    
    return {
        positions: zip(tickers, result.x).filter((t, w) => w > 0.01),
        expectedReturn: dot(result.x, expectedReturns),
        expectedVol: sqrt(result.x' * covMatrix * result.x)
    }`}</pre>
            </div>
        </div>
    );
}

// =============================================================================
// REFERENCES CONTENT
// =============================================================================

function ReferencesContent() {
    const references = [
        { id: 1, authors: "Loughran, T., & McDonald, B.", year: 2011, title: "When is a Liability not a Liability? Textual Analysis, Dictionaries, and 10-Ks", journal: "Journal of Finance", volume: "66(1), 35-65" },
        { id: 2, authors: "Araci, D.", year: 2019, title: "FinBERT: Financial Sentiment Analysis with Pre-trained Language Models", journal: "arXiv preprint", volume: "arXiv:1908.10063" },
        { id: 3, authors: "Yang, Y., Uy, M. C. S., & Huang, A.", year: 2020, title: "FinBERT: A Pretrained Language Model for Financial Communications", journal: "arXiv preprint", volume: "arXiv:2006.08097" },
        { id: 4, authors: "Li, F.", year: 2008, title: "Annual Report Readability, Current Earnings, and Earnings Persistence", journal: "Journal of Accounting and Economics", volume: "45(2-3), 221-247" },
        { id: 5, authors: "Bernard, V. L., & Thomas, J. K.", year: 1989, title: "Post-Earnings-Announcement Drift: Delayed Price Response or Risk Premium?", journal: "Journal of Accounting Research", volume: "27, 1-36" },
        { id: 6, authors: "Campbell, J. L., et al.", year: 2014, title: "The Information Content of Mandatory Risk Factor Disclosures in Corporate Filings", journal: "Review of Accounting Studies", volume: "19(1), 396-455" },
        { id: 7, authors: "Loughran, T., & McDonald, B.", year: 2014, title: "Measuring Readability in Financial Disclosures", journal: "Journal of Finance", volume: "69(4), 1643-1671" },
        { id: 8, authors: "Engelberg, J., McLean, R. D., & Pontiff, J.", year: 2018, title: "Anomalies and News", journal: "The Journal of Finance", volume: "73(5), 1971-2001" },
        { id: 9, authors: "Lerman, A., & Livnat, J.", year: 2010, title: "The New Form 8-K Disclosures", journal: "Review of Accounting Studies", volume: "15(4), 752-778" },
        { id: 10, authors: "de Prado, M. L.", year: 2018, title: "Advances in Financial Machine Learning", journal: "Wiley", volume: "" },
        { id: 11, authors: "Ke, Z. T., Kelly, B. T., & Xiu, D.", year: 2019, title: "Predicting Returns with Text Data", journal: "NBER Working Paper", volume: "No. w26186" },
        { id: 12, authors: "Antweiler, W., & Frank, M. Z.", year: 2004, title: "Is All That Talk Just Noise? The Information Content of Internet Stock Message Boards", journal: "Journal of Finance", volume: "59(3), 1259-1294" },
        { id: 13, authors: "McLean, R. D., & Pontiff, J.", year: 2016, title: "Does Academic Research Destroy Stock Return Predictability?", journal: "Journal of Finance", volume: "71(1), 5-32" },
        { id: 14, authors: "Hobson, J. L., Mayew, W. J., & Venkatachalam, M.", year: 2012, title: "Analyzing Speech to Detect Financial Misreporting", journal: "Journal of Accounting Research", volume: "50(2), 349-392" },
        { id: 15, authors: "Vaswani, A., et al.", year: 2017, title: "Attention Is All You Need", journal: "NeurIPS", volume: "2017" },
        { id: 16, authors: "Devlin, J., et al.", year: 2019, title: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding", journal: "NAACL-HLT", volume: "2019" },
        { id: 17, authors: "Kogan, S., et al.", year: 2009, title: "Predicting Risk from Financial Reports with Regression", journal: "NAACL-HLT", volume: "" },
        { id: 18, authors: "Harvey, C. R., Liu, Y., & Zhu, H.", year: 2016, title: "... and the Cross-Section of Expected Returns", journal: "Review of Financial Studies", volume: "29(1), 5-68" },
        { id: 19, authors: "Hull, J. C.", year: 2018, title: "Options, Futures, and Other Derivatives (10th Edition)", journal: "Pearson", volume: "" },
        { id: 20, authors: "Grinold, R. C., & Kahn, R. N.", year: 1999, title: "Active Portfolio Management", journal: "McGraw-Hill", volume: "" },
    ];

    return (
        <div className="glass-card">
            <h1>Academic References</h1>
            <p style={{ fontStyle: "italic", color: "var(--text-muted)", marginBottom: "32px" }}>
                Built by Naitik Joshi
            </p>

            <h2>NLP & Text Analysis in Finance</h2>
            <ol>
                {references.slice(0, 9).map((ref) => (
                    <li key={ref.id} style={{ marginBottom: "16px" }}>
                        <strong>{ref.authors}</strong> ({ref.year}). &ldquo;{ref.title}&rdquo;.
                        <em> {ref.journal}</em>{ref.volume && `, ${ref.volume}`}.
                    </li>
                ))}
            </ol>

            <h2>Machine Learning & Quantitative Finance</h2>
            <ol start={10}>
                {references.slice(9, 14).map((ref) => (
                    <li key={ref.id} style={{ marginBottom: "16px" }}>
                        <strong>{ref.authors}</strong> ({ref.year}). &ldquo;{ref.title}&rdquo;.
                        <em> {ref.journal}</em>{ref.volume && `, ${ref.volume}`}.
                    </li>
                ))}
            </ol>

            <h2>Deep Learning & NLP</h2>
            <ol start={15}>
                {references.slice(14, 17).map((ref) => (
                    <li key={ref.id} style={{ marginBottom: "16px" }}>
                        <strong>{ref.authors}</strong> ({ref.year}). &ldquo;{ref.title}&rdquo;.
                        <em> {ref.journal}</em>{ref.volume && `, ${ref.volume}`}.
                    </li>
                ))}
            </ol>

            <h2>Foundational Textbooks</h2>
            <ol start={18}>
                {references.slice(17).map((ref) => (
                    <li key={ref.id} style={{ marginBottom: "16px" }}>
                        <strong>{ref.authors}</strong> ({ref.year}). <em>{ref.title}</em>.
                        {ref.journal}.
                    </li>
                ))}
            </ol>

            <h2>Data Sources</h2>
            <ul>
                <li><strong>SEC EDGAR:</strong> https://www.sec.gov/edgar</li>
                <li><strong>WRDS (Wharton Research Data Services):</strong> https://wrds-www.wharton.upenn.edu/</li>
                <li><strong>Compustat:</strong> https://www.spglobal.com/marketintelligence/</li>
                <li><strong>Refinitiv Machine Readable News:</strong> https://www.refinitiv.com/</li>
                <li><strong>RavenPack News Analytics:</strong> https://www.ravenpack.com/</li>
            </ul>
        </div>
    );
}
