# Balkon-Sparrechner ☀️🔋

**Balcony solar savings calculator** — a free Chrome extension and embeddable
web widget that estimates how much a balcony power plant battery (e.g.
Marstek Venus E) saves per year, based on German market conditions.

Built and maintained by [1ASOL](https://1asol.de), a German photovoltaics
retailer specializing in balcony power plant batteries, inverters and solar
modules.

## 🔗 Links

- **Live demo:** [1asol-alt.github.io/balkon-sparrechner](https://1asol-alt.github.io/balkon-sparrechner/)
- **Chrome Web Store:** _coming soon (in review)_
- **Shop:** [1asol.de](https://1asol.de) · [Battery storage collection](https://1asol.de/collections/marstek-batteriespeicher)
- **PV guide (German):** [1asol.de/blogs/pv-ratgeber](https://1asol.de/blogs/pv-ratgeber)

## 🧮 How it works

The math is deliberately simple and transparent:

```
PV yield        = panel watts / 1000 × 950 kWh/kWp   (German average)
self-use w/o    = min(yield × 30 %, consumption)
self-use with   = min(yield × 90 %, consumption)      (battery)
savings         = self-used kWh × electricity price
payback (years) = battery price / (savings_with − savings_without)
```

All inputs are adjustable. Results are estimates; real numbers depend on
location, panel orientation and consumption profile.

## 📦 What's in this repo

```
├── index.html        ← standalone web version (live demo above)
└── extension/        ← Chrome extension (Manifest V3)
    ├── manifest.json
    ├── popup.html / popup.css / popup.js
    └── icons/
```

## 🚀 Run the extension locally

1. Open `chrome://extensions` and enable **Developer mode**
2. Click **Load unpacked** and select the `extension/` folder
3. Pin the icon and click it

No permissions required. No data collected — everything runs locally.

## 📄 License

MIT — see [LICENSE](LICENSE).
