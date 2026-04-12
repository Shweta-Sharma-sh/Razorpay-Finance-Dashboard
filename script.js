




var COINS_PER_PAGE = 12;  
var API_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";




var allCoins   = [];   
var showCoins  = [];   
var favorites  = [];   
var currentPage = 1;   
var showFavsOnly = false;  




var searchInput   = document.getElementById("searchInput");
var filterSelect  = document.getElementById("filterSelect");
var sortSelect    = document.getElementById("sortSelect");
var favBtn        = document.getElementById("favBtn");
var themeBtn      = document.getElementById("themeBtn");
var retryBtn      = document.getElementById("retryBtn");
var prevBtn       = document.getElementById("prevBtn");
var nextBtn       = document.getElementById("nextBtn");
var coinContainer = document.getElementById("coinContainer");
var loadingMsg    = document.getElementById("loadingMsg");
var errorMsg      = document.getElementById("errorMsg");
var pageInfo      = document.getElementById("pageInfo");



var savedFavs = localStorage.getItem("cryptoFavorites");
if (savedFavs) {
  favorites = JSON.parse(savedFavs);  
}


var savedTheme = localStorage.getItem("cryptoTheme");
if (savedTheme === "dark") {
  document.body.classList.add("dark");
  themeBtn.textContent = "☀️ Light Mode";
}




function loadCoins() {
  
  loadingMsg.classList.remove("hidden");
  errorMsg.classList.add("hidden");
  coinContainer.innerHTML = "";  

  fetch(API_URL)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      allCoins = data;

      loadingMsg.classList.add("hidden");

      applyFiltersAndSort();
    })
    .catch(function(error) {
      console.log("Error fetching data:", error);
      loadingMsg.classList.add("hidden");
      errorMsg.classList.remove("hidden");
    });
}




function applyFiltersAndSort() {
  var coins = allCoins;

  if (showFavsOnly) {
    coins = coins.filter(function(coin) {
      return favorites.includes(coin.id);
    });
  }

  var searchText = searchInput.value.toLowerCase();
  if (searchText !== "") {
    coins = coins.filter(function(coin) {
      return coin.name.toLowerCase().includes(searchText) ||
             coin.symbol.toLowerCase().includes(searchText);
    });
  }

  var filterValue = filterSelect.value;

  if (filterValue === "gainers") {
    coins = coins.filter(function(coin) {
      return coin.price_change_percentage_24h > 0;
    });
  } else if (filterValue === "losers") {
    coins = coins.filter(function(coin) {
      return coin.price_change_percentage_24h < 0;
    });
  }

  var sortValue = sortSelect.value;

  if (sortValue === "price_high") {
    coins = coins.sort(function(a, b) {
      return b.current_price - a.current_price;
    });
  } else if (sortValue === "price_low") {
    coins = coins.sort(function(a, b) {
      return a.current_price - b.current_price;
    });
  } else if (sortValue === "name") {
    coins = coins.sort(function(a, b) {
      return a.name.localeCompare(b.name);
    });
  } else {
    coins = coins.sort(function(a, b) {
      return a.market_cap_rank - b.market_cap_rank;
    });
  }

  showCoins = coins;

  currentPage = 1;

  renderPage();
}




function renderPage() {
  var startIndex = (currentPage - 1) * COINS_PER_PAGE;
  var endIndex   = startIndex + COINS_PER_PAGE;

  var pageCoins = showCoins.slice(startIndex, endIndex);

  coinContainer.innerHTML = "";

  if (pageCoins.length === 0) {
    coinContainer.innerHTML = "<p style='padding:30px;color:#888'>No coins found. Try a different search.</p>";
    updatePagination();
    return;
  }

  pageCoins.forEach(function(coin) {
    var card = createCard(coin);
    coinContainer.appendChild(card);  
  });

  updatePagination();
}




function createCard(coin) {
  var isFav = favorites.includes(coin.id);

  var change = coin.price_change_percentage_24h;
  var changeText = (change >= 0 ? "▲ +" : "▼ ") + change.toFixed(2) + "%";
  var changeClass = change >= 0 ? "change-positive" : "change-negative";

  var card = document.createElement("div");
  card.className = "coin-card";

  card.innerHTML =
    '<div class="card-top">' +
      '<div class="coin-info">' +
        '<img src="' + coin.image + '" alt="' + coin.name + '" />' +
        '<div>' +
          '<div class="coin-name">' + coin.name + '</div>' +
          '<div class="coin-symbol">' + coin.symbol + '</div>' +
        '</div>' +
      '</div>' +
      '<span class="coin-rank">#' + coin.market_cap_rank + '</span>' +
      '<button class="fav-star ' + (isFav ? "faved" : "") + '" data-id="' + coin.id + '">' +
        (isFav ? "★" : "☆") +
      '</button>' +
    '</div>' +

    '<div class="coin-price">' + formatPrice(coin.current_price) + '</div>' +
    '<div class="' + changeClass + '">' + changeText + ' (24h)</div>' +

    '<div class="coin-meta">' +
      '<span>Cap: ' + formatLarge(coin.market_cap) + '</span>' +
      '<span>Vol: ' + formatLarge(coin.total_volume) + '</span>' +
    '</div>';

  var starBtn = card.querySelector(".fav-star");
  starBtn.addEventListener("click", function(event) {
    event.stopPropagation();
    toggleFavorite(coin.id, starBtn);
  });

  return card;
}




function toggleFavorite(coinId, button) {
  var index = favorites.indexOf(coinId);

  if (index === -1) {
    favorites.push(coinId);
    button.textContent = "★";
    button.classList.add("faved");
  } else {
    favorites.splice(index, 1);
    button.textContent = "☆";
    button.classList.remove("faved");
  }

  localStorage.setItem("cryptoFavorites", JSON.stringify(favorites));

  if (showFavsOnly) {
    applyFiltersAndSort();
  }
}




function updatePagination() {
  var totalPages = Math.ceil(showCoins.length / COINS_PER_PAGE);

  pageInfo.textContent = "Page " + currentPage + " of " + (totalPages || 1);

  prevBtn.disabled = currentPage <= 1;

  nextBtn.disabled = currentPage >= totalPages;
}



function formatPrice(price) {
  if (price >= 1) {
    return "$" + price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  } else {
    return "$" + price.toFixed(6);
  }
}

function formatLarge(num) {
  if (!num) return "N/A";
  if (num >= 1e12) return "$" + (num / 1e12).toFixed(2) + "T";
  if (num >= 1e9)  return "$" + (num / 1e9).toFixed(2) + "B";
  if (num >= 1e6)  return "$" + (num / 1e6).toFixed(2) + "M";
  return "$" + num.toLocaleString();
}

function debounce(fn, delay) {
  var timer;
  return function() {
    clearTimeout(timer);           
    timer = setTimeout(fn, delay); 
  };
}



searchInput.addEventListener("input", debounce(function() {
  applyFiltersAndSort();
}, 400));

filterSelect.addEventListener("change", function() {
  applyFiltersAndSort();
});

sortSelect.addEventListener("change", function() {
  applyFiltersAndSort();
});

favBtn.addEventListener("click", function() {
  showFavsOnly = !showFavsOnly;  
  if (showFavsOnly) {
    favBtn.textContent = "📋 Show All";
    favBtn.classList.add("active");
  } else {
    favBtn.textContent = "⭐ Show Favorites";
    favBtn.classList.remove("active");
  }

  applyFiltersAndSort();
});

themeBtn.addEventListener("click", function() {
  document.body.classList.toggle("dark");  

  var isDark = document.body.classList.contains("dark");

  themeBtn.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";

  localStorage.setItem("cryptoTheme", isDark ? "dark" : "light");
});

retryBtn.addEventListener("click", function() {
  loadCoins();
});

prevBtn.addEventListener("click", function() {
  if (currentPage > 1) {
    currentPage--;
    renderPage();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});

nextBtn.addEventListener("click", function() {
  var totalPages = Math.ceil(showCoins.length / COINS_PER_PAGE);
  if (currentPage < totalPages) {
    currentPage++;
    renderPage();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});




loadCoins();