"use strict";

// --- Annahmen (transparent, im Popup dokumentiert) ---
const SPEZ_ERTRAG = 950;   // kWh pro kWp und Jahr (Durchschnitt Deutschland)
const EV_OHNE = 0.30;      // Eigenverbrauchsquote ohne Speicher
const EV_MIT  = 0.90;      // Eigenverbrauchsquote mit Speicher (Venus E)

const $ = (id) => document.getElementById(id);
const euro = (n) => Math.round(n).toLocaleString("de-DE");

function readNumber(id, fallback) {
  const v = parseFloat($(id).value.replace(",", "."));
  return Number.isFinite(v) && v > 0 ? v : fallback;
}

function berechnen() {
  const usage    = readNumber("usage", 3500);   // kWh/Jahr
  const priceCt  = readNumber("price", 35);      // ct/kWh
  const wp        = readNumber("wp", 800);       // Wp
  const cost      = readNumber("cost", 957);     // EUR

  const priceEur = priceCt / 100;
  const kWp       = wp / 1000;
  const pvGen     = kWp * SPEZ_ERTRAG;           // kWh/Jahr erzeugt

  // Eigenverbrauch (durch Verbrauch begrenzt)
  const selfOhne = Math.min(pvGen * EV_OHNE, usage);
  const selfMit  = Math.min(pvGen * EV_MIT,  usage);

  const saveOhne = selfOhne * priceEur;
  const saveMit  = selfMit  * priceEur;
  const zusatz    = Math.max(saveMit - saveOhne, 0); // Mehrwert des Speichers

  // Headline: Gesamtersparnis pro Jahr mit dem System
  $("saveYear").textContent = euro(saveMit);

  // Balken
  const maxVal = Math.max(saveMit, 1);
  $("barNo").style.width  = (saveOhne / maxVal * 100) + "%";
  $("barYes").style.width = "100%";
  $("numNo").textContent  = euro(saveOhne) + " €";
  $("numYes").textContent = euro(saveMit) + " €";

  // Amortisation des Speichers (gegen den Mehrwert des Speichers)
  if (zusatz > 0) {
    const jahre = cost / zusatz;
    $("payback").textContent = jahre.toLocaleString("de-DE", { maximumFractionDigits: 1 }) + " Jahre";
  } else {
    $("payback").textContent = "–";
  }

  // Batterie-Grafik füllen (0..1 nach Eigenverbrauchsanteil mit Speicher)
  const pct = Math.max(0, Math.min(1, pvGen > 0 ? selfMit / pvGen : 0));
  const baseline = 147, minH = 6, maxH = 47;
  const h = minH + pct * (maxH - minH);
  const battFill = document.querySelector(".batt-fill");
  if (battFill) {
    battFill.setAttribute("height", h.toFixed(1));
    battFill.setAttribute("y", (baseline - h).toFixed(1));
  }
}

// Fallback, falls das Shop-Logo (Remote) nicht lädt: Text-Marke zeigen
function setupLogoFallback() {
  const img = document.querySelector(".brand-logo");
  if (!img) return;
  img.addEventListener("error", () => {
    const mark = document.createElement("span");
    mark.className = "brand-mark as-fallback";
    mark.textContent = "1A";
    img.replaceWith(mark);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupLogoFallback();
  ["usage", "price", "wp", "cost"].forEach((id) => {
    $(id).addEventListener("input", berechnen);
  });
  berechnen();
});
