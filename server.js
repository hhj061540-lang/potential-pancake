const express = require("express");

const app = express();

const PORT = process.env.PORT || 5900;

const TARGET_URLS = [
  {
    id: "google",
    name: "Google",
    url: "https://google.com",
    display_url: "https://google.com"
  },
  {
    id: "github",
    name: "GitHub",
    url: "https://github.com",
    display_url: "https://github.com"
  }
];

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>WOLF TECH — l</title>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">

  <style>
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background: #000;
      color: #00ff00;
      font-family: 'JetBrains Mono', monospace;
      -webkit-font-smoothing: antialiased;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    :root {
      --primary: #00ff00;
      --primary-border: rgba(0,255,0,0.2);
      --primary-border-hover: rgba(0,255,0,0.4);
      --primary-glow: 0 0 20px rgba(0,255,0,0.3);
      --gray-500: #6b7280;
      --gray-400: #9ca3af;
      --gray-300: #d1d5db;
      --white: #ffffff;
      --card-bg: rgba(0,0,0,0.6);
    }

    .neon-bg {
      position: fixed;
      inset: 0;
      z-index: 0;
      background:
        linear-gradient(rgba(0,255,0,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,255,0,0.03) 1px, transparent 1px);
      background-size: 50px 50px;
      pointer-events: none;
    }

    nav {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 50;
      background: rgba(0,0,0,0.95);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--primary-border);
    }

    .nav-inner {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 1.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 64px;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .logo-icon {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      background: rgba(0,255,0,0.05);
      border: 1px solid var(--primary-border);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .logo-text {
      font-family: 'Orbitron', monospace;
      font-weight: 900;
      font-size: 1.2rem;
      letter-spacing: 0.15em;
    }

    .logo-wolf {
      color: var(--primary);
    }

    .logo-bot {
      color: var(--gray-300);
    }

    .logo-sub {
      font-size: 0.65rem;
      color: var(--gray-500);
      margin-top: 2px;
    }

    .page {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 6rem 1rem 3rem;
      position: relative;
      z-index: 10;
      gap: 20px;
    }

    .card {
      width: 100%;
      max-width: 520px;
      padding: 30px;
      border-radius: 20px;
      border: 1px solid var(--primary-border);
      background: var(--card-bg);
      backdrop-filter: blur(12px);
      text-align: center;
    }

    .badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 600;
      margin-bottom: 15px;
    }

    .badge.disconnected {
      background: rgba(239,68,68,0.1);
      color: #f87171;
      border: 1px solid rgba(239,68,68,0.3);
    }

    .badge.connected {
      background: rgba(16,185,129,0.1);
      color: #34d399;
      border: 1px solid rgba(16,185,129,0.3);
    }

    .power-btn {
      width: 90px;
      height: 90px;
      border-radius: 50%;
      margin: 15px auto;
      background: rgba(0,255,0,0.05);
      border: 2px solid var(--primary);
      color: var(--primary);
      font-size: 2rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s;
      box-shadow: var(--primary-glow);
    }

    .power-btn:hover {
      background: rgba(0,255,0,0.15);
      transform: scale(1.05);
    }

    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      margin: 20px 0;
      text-align: left;
    }

    .metric-box {
      background: rgba(0,0,0,0.4);
      border: 1px solid var(--primary-border);
      padding: 10px;
      border-radius: 8px;
    }

    .metric-title {
      font-size: 0.6rem;
      color: var(--gray-500);
      text-transform: uppercase;
    }

    .metric-val {
      font-size: 0.85rem;
      color: var(--white);
      font-weight: bold;
      margin-top: 4px;
      word-break: break-all;
    }

    .btn-group {
      display: flex;
      gap: 10px;
      margin-top: 15px;
    }

    .btn {
      flex: 1;
      padding: 12px;
      border-radius: 8px;
      font-family: 'Orbitron', monospace;
      font-size: 0.75rem;
      font-weight: 700;
      cursor: pointer;
      border: 1px solid var(--primary-border);
      background: rgba(0,255,0,0.1);
      color: var(--primary);
      transition: all 0.2s;
    }

    .btn:hover {
      background: rgba(0,255,0,0.2);
      box-shadow: var(--primary-glow);
    }

    .btn-danger {
      background: rgba(239,68,68,0.1);
      color: #f87171;
      border-color: rgba(239,68,68,0.3);
    }

    .btn-danger:hover {
      background: rgba(239,68,68,0.2);
    }

    .locations-card {
      width: 100%;
      max-width: 520px;
      background: var(--card-bg);
      border: 1px solid var(--primary-border);
      border-radius: 20px;
      padding: 24px;
      text-align: left;
    }

    .locations-title {
      font-family: 'Orbitron', monospace;
      font-size: 1rem;
      margin-bottom: 4px;
      color: var(--white);
    }

    .locations-sub {
      font-size: 0.75rem;
      color: var(--gray-500);
      margin-bottom: 15px;
    }

    .location-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
      max-height: 250px;
      overflow-y: auto;
      padding-right: 4px;
    }

    .loc-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 14px;
      background: rgba(0,0,0,0.4);
      border: 1px solid rgba(0,255,0,0.1);
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .loc-item:hover {
      border-color: var(--primary);
      background: rgba(0,255,0,0.05);
    }

    .loc-info {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 0.85rem;
      color: var(--white);
    }

    .loc-flag {
      font-size: 1.2rem;
    }

    .url-display {
      margin-top: 20px;
      padding: 14px;
      border: 1px solid var(--primary-border);
      border-radius: 8px;
      background: rgba(0,255,0,0.03);
      text-align: left;
    }

    .url-label {
      color: var(--gray-500);
      font-size: 0.65rem;
      text-transform: uppercase;
      margin-bottom: 6px;
    }

    #display-url {
      color: var(--primary);
      font-size: 0.8rem;
      word-break: break-all;
    }

    @media (max-width: 480px) {
      .metrics-grid {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>

<body>
  <div class="neon-bg"></div>

  <nav>
    <div class="nav-inner">
      <div class="logo">
        <div class="logo-icon">🐺</div>
        <div>
          <div class="logo-text">
            <span class="logo-wolf">WOLF</span>
            <span class="logo-bot">TECH</span>
          </div>
          <div class="logo-sub">URL CONTROL SYSTEM</div>
        </div>
      </div>
    </div>
  </nav>

  <main class="page">

    <section class="card">
      <div id="status" class="badge disconnected">
        DISCONNECTED
      </div>

      <h2>URL CONTROL</h2>

      <button class="power-btn" id="powerBtn" type="button">
        ⏻
      </button>

      <div class="metrics-grid">
        <div class="metric-box">
          <div class="metric-title">Status</div>
          <div class="metric-val" id="metric-status">OFFLINE</div>
        </div>

        <div class="metric-box">
          <div class="metric-title">Target</div>
          <div class="metric-val" id="metric-target">NONE</div>
        </div>

        <div class="metric-box">
          <div class="metric-title">API</div>
          <div class="metric-val">/api/get-url</div>
        </div>
      </div>

      <div class="btn-group">
        <button class="btn" id="fetchBtn" type="button">
          FETCH URL
        </button>

        <button class="btn btn-danger" id="clearBtn" type="button">
          CLEAR
        </button>
      </div>

      <div class="url-display">
        <div class="url-label">Display URL</div>
        <div id="display-url">WAITING...</div>
      </div>
    </section>

    <section class="locations-card">
      <div class="locations-title">TARGET URLS</div>
      <div class="locations-sub">
        Select a target to fetch its URL data.
      </div>

      <div class="location-list" id="location-list"></div>
    </section>

  </main>

  <script>
    const statusEl = document.getElementById("status");
    const metricStatus = document.getElementById("metric-status");
    const metricTarget = document.getElementById("metric-target");
    const displayUrl = document.getElementById("display-url");
    const locationList = document.getElementById("location-list");
    const powerBtn = document.getElementById("powerBtn");
    const fetchBtn = document.getElementById("fetchBtn");
    const clearBtn = document.getElementById("clearBtn");

    let selectedTarget = null;

    function setConnected(connected) {
      if (connected) {
        statusEl.textContent = "CONNECTED";
        statusEl.className = "badge connected";
        metricStatus.textContent = "ONLINE";
      } else {
        statusEl.textContent = "DISCONNECTED";
        statusEl.className = "badge disconnected";
        metricStatus.textContent = "OFFLINE";
      }
    }

    async function fetchUrl(targetId) {
      try {
        const response = await fetch("/api/get-url");

        if (!response.ok) {
          throw new Error("API request failed");
        }

        const data = await response.json();

        const target = data.urls.find(function(item) {
          return item.id === targetId;
        });

        if (!target) {
          throw new Error("Target URL not found");
        }

        selectedTarget = target;

        metricTarget.textContent = target.name.toUpperCase();
        displayUrl.textContent = target.display_url;

        setConnected(true);
      } catch (error) {
        console.error(error);

        setConnected(false);
        displayUrl.textContent = "API ERROR";
      }
    }

    function renderTargets(urls) {
      locationList.innerHTML = "";

      urls.forEach(function(target) {
        const item = document.createElement("div");

        item.className = "loc-item";

        item.innerHTML =
          '<div class="loc-info">' +
            '<span class="loc-flag">🌐</span>' +
            '<span>' + target.name + '</span>' +
          '</div>' +
          '<span>›</span>';

        item.addEventListener("click", function() {
          fetchUrl(target.id);
        });

        locationList.appendChild(item);
      });
    }

    async function loadTargets() {
      try {
        const response = await fetch("/api/get-url");

        if (!response.ok) {
          throw new Error("Failed to load targets");
        }

        const data = await response.json();

        renderTargets(data.urls);
      } catch (error) {
        console.error(error);

        locationList.innerHTML =
          '<div style="color:#f87171;padding:10px;">API ERROR</div>';
      }
    }

    powerBtn.addEventListener("click", async function() {
      if (selectedTarget) {
        await fetchUrl(selectedTarget.id);
      } else {
        await fetchUrl("google");
      }
    });

    fetchBtn.addEventListener("click", async function() {
      if (selectedTarget) {
        await fetchUrl(selectedTarget.id);
      } else {
        await fetchUrl("google");
      }
    });

    clearBtn.addEventListener("click", function() {
      selectedTarget = null;

      setConnected(false);

      metricTarget.textContent = "NONE";
      displayUrl.textContent = "WAITING...";
    });

    loadTargets();
  </script>
</body>
</html>`;

app.get("/", (req, res) => {
  res.type("html").send(htmlContent);
});

app.get("/api/get-url", (req, res) => {
  res.json({
    success: true,
    urls: TARGET_URLS
  });
});

app.listen(PORT, () => {
  console.log("WOLF TECH server running on port " + PORT);
  console.log("API: /api/get-url");
});
