# STRYKER Algorithm Pseudocode

**Built by Naitik Joshi**

---

## 1. Filing Ingestion Pipeline

```python
def ingest_filing(filing_url: str) -> Filing:
    """
    Ingest SEC filing from EDGAR and extract raw content
    """
    # Fetch document
    response = http_get(filing_url)
    
    if response.content_type == "application/pdf":
        raw_text = ocr_extract(response.content)
    else:
        raw_text = html_to_text(response.content)
    
    # Parse metadata
    metadata = extract_metadata(raw_text)
    # ticker, filing_type, filing_date, period_of_report
    
    # Store raw
    filing = Filing(
        id=generate_uuid(),
        ticker=metadata.ticker,
        type=metadata.filing_type,
        date=metadata.filing_date,
        raw_text=raw_text,
        url=filing_url
    )
    
    db.store(filing)
    return filing
```

---

## 2. Document Segmentation

```python
def segment_document(filing: Filing) -> List[Section]:
    """
    Split 10-K/10-Q into logical sections
    """
    SECTION_PATTERNS = {
        "MD&A": r"Item 7\.?\s*Management.?s Discussion",
        "Risk Factors": r"Item 1A\.?\s*Risk Factors",
        "Business": r"Item 1\.?\s*Business",
        "Financial Statements": r"Item 8\.?\s*Financial Statements",
    }
    
    sections = []
    text = filing.raw_text
    
    for section_name, pattern in SECTION_PATTERNS.items():
        match = regex_search(pattern, text, IGNORECASE)
        if match:
            start = match.end()
            # Find next section or end
            end = find_next_section(text, start, SECTION_PATTERNS)
            
            section = Section(
                filing_id=filing.id,
                type=section_name,
                content=text[start:end],
                start_offset=start,
                end_offset=end
            )
            sections.append(section)
    
    return sections
```

---

## 3. NLP Embedding Generation

```python
def generate_embeddings(sections: List[Section]) -> List[Embedding]:
    """
    Generate transformer embeddings for document sections
    """
    embeddings = []
    
    for section in sections:
        # Tokenize with sliding window
        tokens = tokenizer.encode(section.content)
        chunks = sliding_window(tokens, window_size=512, stride=256)
        
        chunk_embeddings = []
        for chunk in chunks:
            # Forward pass through transformer
            hidden_states = transformer_model(chunk)
            # Mean pooling across sequence
            embedding = mean_pool(hidden_states)
            chunk_embeddings.append(embedding)
        
        # Aggregate chunk embeddings
        section_embedding = weighted_average(
            chunk_embeddings,
            weights=attention_weights(chunk_embeddings)
        )
        
        embeddings.append(Embedding(
            section_id=section.id,
            vector=section_embedding,
            dim=768
        ))
    
    # Store in vector database
    vector_db.batch_insert(embeddings)
    return embeddings
```

---

## 4. Sentiment & Risk Tone Scoring

```python
def compute_sentiment(section: Section) -> SentimentScore:
    """
    Multi-label sentiment: positive, negative, uncertainty, litigious
    """
    # Tokenize
    tokens = porter_stem(word_tokenize(section.content.lower()))
    
    # Count dictionary matches
    lm_dict = load_loughran_mcdonald_dictionary()
    
    counts = {
        "positive": 0,
        "negative": 0, 
        "uncertainty": 0,
        "litigious": 0
    }
    
    for token in tokens:
        for category, word_list in lm_dict.items():
            if token in word_list:
                counts[category] += 1
    
    # Normalize by document length
    total_words = len(tokens)
    scores = {k: v / total_words for k, v in counts.items()}
    
    # Compute composite sentiment
    net_sentiment = scores["positive"] - scores["negative"]
    risk_tone = scores["uncertainty"] + scores["litigious"]
    
    return SentimentScore(
        section_id=section.id,
        positive=scores["positive"],
        negative=scores["negative"],
        uncertainty=scores["uncertainty"],
        litigious=scores["litigious"],
        net_sentiment=net_sentiment,
        risk_tone=risk_tone
    )
```

---

## 5. Feature Fusion Engine

```python
def fuse_features(
    filing: Filing,
    embeddings: List[Embedding],
    sentiment: SentimentScore,
    fundamentals: FundamentalData
) -> FeatureVector:
    """
    Combine NLP features with financial fundamentals
    """
    # Aggregate section embeddings
    doc_embedding = mean(e.vector for e in embeddings)
    
    # Fundamental features
    fund_features = [
        fundamentals.pe_ratio,
        fundamentals.pb_ratio,
        fundamentals.roe,
        fundamentals.debt_equity,
        fundamentals.revenue_growth,
        fundamentals.margin_change
    ]
    
    # Volatility features
    vol_features = [
        fundamentals.realized_vol_30d,
        fundamentals.implied_vol,
        fundamentals.vol_of_vol
    ]
    
    # Event flags
    event_features = [
        1.0 if is_earnings_season(filing.date) else 0.0,
        1.0 if is_option_expiry_week(filing.date) else 0.0,
        1.0 if is_year_end(filing.date) else 0.0
    ]
    
    # Concatenate all features
    feature_vector = concatenate([
        doc_embedding,                    # 768 dims
        [sentiment.net_sentiment],        # 1 dim
        [sentiment.risk_tone],            # 1 dim
        normalize(fund_features),         # 6 dims
        normalize(vol_features),          # 3 dims
        event_features                    # 3 dims
    ])
    
    return FeatureVector(
        filing_id=filing.id,
        vector=feature_vector,
        dim=782
    )
```

---

## 6. ML Prediction Pipeline

```python
def ensemble_predict(features: FeatureVector) -> Signal:
    """
    Ensemble of RF, XGBoost, LSTM for signal prediction
    """
    # Model weights (from cross-validation)
    WEIGHTS = {"rf": 0.35, "xgb": 0.35, "lstm": 0.30}
    
    # Random Forest
    rf_proba = rf_model.predict_proba(features.vector)
    # XGBoost
    xgb_proba = xgb_model.predict_proba(features.vector)
    # LSTM (needs sequence format)
    lstm_input = reshape_for_lstm(features.vector)
    lstm_proba = lstm_model.predict(lstm_input)
    
    # Weighted ensemble
    ensemble_proba = (
        WEIGHTS["rf"] * rf_proba +
        WEIGHTS["xgb"] * xgb_proba +
        WEIGHTS["lstm"] * lstm_proba
    )
    
    # Classes: [SELL, HOLD, BUY]
    predicted_class = argmax(ensemble_proba)
    confidence = max(ensemble_proba)
    
    signal_map = {0: "SELL", 1: "HOLD", 2: "BUY"}
    
    return Signal(
        filing_id=features.filing_id,
        signal=signal_map[predicted_class],
        confidence=confidence,
        probabilities={
            "sell": ensemble_proba[0],
            "hold": ensemble_proba[1],
            "buy": ensemble_proba[2]
        }
    )
```

---

## 7. Backtest Buffer Simulator

```python
def backtest_with_buffer(
    signals: List[Signal],
    prices: DataFrame,
    config: BacktestConfig
) -> BacktestResult:
    """
    Backtest signals with buffer period to avoid look-ahead bias
    """
    portfolio = Portfolio(cash=config.initial_capital)
    trades = []
    
    for signal in sorted(signals, key=lambda s: s.timestamp):
        # BUFFER: Wait N trading days before acting on signal
        execution_date = add_trading_days(
            signal.timestamp, 
            config.buffer_days
        )
        
        if execution_date > config.end_date:
            continue
        
        ticker = signal.filing.ticker
        price = prices.loc[execution_date, ticker]
        
        # Position sizing (equal weight)
        position_size = portfolio.equity * config.position_weight
        
        if signal.signal == "BUY" and portfolio.cash >= position_size:
            shares = floor(position_size / price)
            cost = shares * price * (1 + config.slippage)
            
            portfolio.buy(ticker, shares, cost)
            trades.append(Trade(
                ticker=ticker,
                side="BUY",
                shares=shares,
                price=price,
                date=execution_date
            ))
            
        elif signal.signal == "SELL" and ticker in portfolio.positions:
            shares = portfolio.positions[ticker]
            proceeds = shares * price * (1 - config.slippage)
            
            portfolio.sell(ticker, shares, proceeds)
            trades.append(Trade(
                ticker=ticker,
                side="SELL",
                shares=shares,
                price=price,
                date=execution_date
            ))
    
    # Calculate metrics
    equity_curve = compute_equity_curve(portfolio, prices)
    
    return BacktestResult(
        sharpe=sharpe_ratio(equity_curve),
        max_drawdown=max_drawdown(equity_curve),
        win_rate=win_rate(trades),
        alpha=alpha_vs_benchmark(equity_curve, prices["SPY"]),
        trades=trades,
        equity_curve=equity_curve
    )
```

---

## 8. Portfolio Allocation Optimizer

```python
def optimize_portfolio(
    signals: List[Signal],
    risk_budget: float,
    constraints: Constraints
) -> PortfolioAllocation:
    """
    Mean-variance optimization with risk constraints
    """
    # Filter high-confidence BUY signals
    buys = [s for s in signals if s.signal == "BUY" and s.confidence > 0.7]
    
    tickers = [s.filing.ticker for s in buys]
    n = len(tickers)
    
    if n == 0:
        return PortfolioAllocation(positions={}, cash=1.0)
    
    # Expected returns from signal confidence
    expected_returns = array([s.confidence for s in buys])
    
    # Covariance from historical returns
    returns = get_historical_returns(tickers, lookback=252)
    cov_matrix = returns.cov() * 252  # Annualize
    
    # Objective: maximize Sharpe ratio
    def neg_sharpe(weights):
        port_return = weights @ expected_returns
        port_vol = sqrt(weights @ cov_matrix @ weights)
        return -(port_return - 0.02) / port_vol  # Risk-free = 2%
    
    # Constraints
    cons = [
        {"type": "eq", "fun": lambda w: sum(w) - 1},  # Fully invested
        {"type": "ineq", "fun": lambda w: risk_budget - w @ cov_matrix @ w}
    ]
    
    # Bounds
    bounds = [(constraints.min_weight, constraints.max_weight)] * n
    
    # Optimize
    result = minimize(
        neg_sharpe,
        x0=[1/n] * n,  # Equal weight start
        method="SLSQP",
        bounds=bounds,
        constraints=cons
    )
    
    weights = result.x
    
    return PortfolioAllocation(
        positions={ticker: w for ticker, w in zip(tickers, weights) if w > 0.01},
        expected_return=weights @ expected_returns,
        expected_vol=sqrt(weights @ cov_matrix @ weights),
        sharpe=(weights @ expected_returns - 0.02) / sqrt(weights @ cov_matrix @ weights)
    )
```
