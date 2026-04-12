# 🪙 Crypto Dashboard — Beginner Project

A simple cryptocurrency dashboard built with **HTML, CSS, and JavaScript**.
Fetches live data from the free CoinGecko API (no API key needed!).

---

## 📁 Files in This Project

```
crypto-basic/
├── index.html   ← Page structure (what you see)
├── style.css    ← Visual styling (how it looks)
├── script.js    ← Logic and data (how it works)
└── README.md    ← This file
```

---

## ✅ Features

| Feature | How it works |
|---|---|
| **Live data** | `fetch()` gets 100 coins from CoinGecko API |
| **Search** | Filters coins by name or symbol as you type |
| **Filter** | Show all, gainers only, or losers only |
| **Sort** | By rank, price (high/low), or name |
| **Favorites ⭐** | Click the star to save coins; stored with `localStorage` |
| **Dark Mode 🌙** | Toggle and saved with `localStorage` |
| **Pagination** | 12 coins per page with Prev/Next buttons |
| **Loading state** | Shows "Loading..." while data arrives |
| **Error handling** | Shows error message + Retry button if fetch fails |

---

## 🚀 How to Run

**No installation needed!**

1. Download all 3 files (`index.html`, `style.css`, `script.js`) into one folder
2. Open `index.html` in your browser

> ⚠️ If images don't load, try running a simple local server:
> ```
> python -m http.server 3000
> ```
> Then open `http://localhost:3000` in your browser.

---

## 🧠 JavaScript Concepts Used

This project is great for learning these beginner concepts:

### `fetch()` — Get data from the internet
```js
fetch(API_URL)
  .then(function(response) { return response.json(); })
  .then(function(data) { /* use the data */ })
  .catch(function(error) { /* handle error */ });
```

### `.filter()` — Keep items that match a condition
```js
// Keep only coins with positive price change
var gainers = allCoins.filter(function(coin) {
  return coin.price_change_percentage_24h > 0;
});
```

### `.sort()` — Reorder an array
```js
// Sort by price, highest first
coins.sort(function(a, b) {
  return b.current_price - a.current_price;
});
```

### `.forEach()` — Do something with each item
```js
pageCoins.forEach(function(coin) {
  var card = createCard(coin);
  coinContainer.appendChild(card);
});
```

### `localStorage` — Remember data in the browser
```js
// Save
localStorage.setItem("myKey", JSON.stringify(data));

// Load
var data = JSON.parse(localStorage.getItem("myKey"));
```

### Debounce — Wait until user stops typing
```js
// Runs the function only 400ms after last keystroke
searchInput.addEventListener("input", debounce(function() {
  applyFiltersAndSort();
}, 400));
```

---

## 🌐 API Used

**CoinGecko** — Free, no sign-up, no API key required

- URL: `https://api.coingecko.com/api/v3/coins/markets`
- Returns: coin name, price, market cap, 24h change, volume, image, rank

---

## 💡 Ideas to Improve It (Try Yourself!)

- [ ] Add a "Price Alert" that logs a message when a coin drops below a certain value
- [ ] Show a coin's full details when you click the card (using a modal / popup)
- [ ] Add a "Portfolio" feature where you enter how many coins you own
- [ ] Show a small price chart using the Chart.js library
- [ ] Add infinite scrolling instead of pagination

---

## 📚 Good for Practicing

- DOM Manipulation (`getElementById`, `innerHTML`, `createElement`)
- Events (`addEventListener`, `click`, `input`, `change`)
- `fetch` + Promises (`.then`, `.catch`)
- Array methods (`filter`, `sort`, `forEach`, `includes`, `indexOf`)
- `localStorage` for saving data
- CSS Flexbox + Grid for layout
- Responsive design with `@media` queries