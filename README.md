# STRYKER: AI Financial Intelligence Platform

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![License](https://img.shields.io/badge/license-MIT-green)

> **Transform regulatory disclosures into actionable investment signals**

An enterprise-grade AI platform that analyzes SEC filings (10-K, 10-Q, 8-K), earnings transcripts, and financial news to generate structured investment intelligence.

---

## 🎯 Overview

STRYKER (**S**trategic **T**ranscription **Y**ield **K**nowledge **E**xtraction **R**esearch) is an AI-driven financial intelligence platform that:

- 📥 **Ingests** SEC EDGAR filings in real-time
- 🧠 **Processes** documents using transformer-based NLP
- 📊 **Generates** BUY/HOLD/SELL signals via ML ensemble
- 📈 **Backtests** strategies with buffer methodology
- 💼 **Optimizes** portfolio allocation

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
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
│                      FEATURE ENGINEERING                         │
├──────────────────┬──────────────────┬──────────────────────────┤
│   Fundamentals   │ Volatility Metr  │   Event Flags + Fusion   │
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
│   Buffer Methodology        │    │   Signal → Position Size    │
└─────────────────────────────┘    └─────────────────────────────┘
```

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/NaitikJoshiPro/stryker-intelligence.git
cd stryker-intelligence

# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

---

## 📁 Project Structure

```
stryker-intelligence/
├── src/
│   ├── app/
│   │   ├── globals.css      # Design system
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Main page (7 sections)
│   ├── components/          # Reusable components
│   └── lib/                 # Utilities
├── docs/
│   ├── diagrams/            # MermaidChart diagrams
│   ├── algorithms.md        # Pseudocode
│   ├── literature-review.md # Academic synthesis
│   └── references.md        # Citations
├── public/                  # Static assets
├── project_task_state.json  # Task tracking
└── README.md
```

---

## 🎨 Design System

- **Typography**: Space Grotesk (UI) + Space Mono (data)
- **Color**: Monochrome with state accents
- **Theme**: Dark/Light toggle (press `T`)
- **Motion**: Framer Motion animations

---

## 📊 Key Metrics (Demo Data)

| Metric | Value |
|--------|-------|
| Filings Processed | 847,291 |
| Signals Generated | 12,847 |
| Backtest Alpha | +18.7% |
| Sharpe Ratio | 2.14 |
| Max Drawdown | -12.3% |
| Win Rate | 68.4% |

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Animation**: Framer Motion
- **Fonts**: Space Grotesk, Space Mono
- **Deployment**: Vercel

---

## 📚 Documentation

- [Implementation Plan](docs/implementation-plan.md)
- [Algorithm Pseudocode](docs/algorithms.md)
- [Literature Review](docs/literature-review.md)
- [Academic References](docs/references.md)

---

## 🚢 Deployment

### Vercel (Recommended)

```bash
npm run build
vercel --prod
```

### Docker

```bash
docker build -t stryker-intelligence .
docker run -p 3000:3000 stryker-intelligence
```

---

## 👤 Author

**Built by [Naitik Joshi](https://naitik.online)**

---

## 📄 License

MIT License - See [LICENSE](LICENSE) for details.
