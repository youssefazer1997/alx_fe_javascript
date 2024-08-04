const apiUrl = "https://jsonplaceholder.typicode.com/posts";
const apiKey = "YOUR_API_KEY";

// Initialize quotes from local storage or use default quotes
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  {
    text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    category: "Inspirational",
  },
  {
    text: "The way to get started is to quit talking and begin doing.",
    category: "Motivational",
  },
  {
    text: "Your time is limited, so don't waste it living someone else's life.",
    category: "Life",
  },
];

function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
  syncQuotes();
}

function showRandomQuote() {
  const filteredQuotes = getFilteredQuotes();
  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const randomQuote = filteredQuotes[randomIndex];

  displayQuote(randomQuote);

  sessionStorage.setItem("lastViewedQuote", JSON.stringify(randomQuote));
}

function displayQuote(quote) {
  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = "";
  const newDiv = document.createElement("div");
  const newContent = document.createTextNode(
    `${quote.text} - ${quote.category}`
  );
  newDiv.appendChild(newContent);
  quoteDisplay.appendChild(newDiv);
}

function createAddQuoteForm() {
  const newQuoteText = document.getElementById("newQuoteText").value;
  const newQuoteCategory = document.getElementById("newQuoteCategory").value;

  if (newQuoteText && newQuoteCategory) {
    quotes.push({
      text: newQuoteText,
      category: newQuoteCategory,
    });
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";

    saveQuotes();
    populateCategoryFilter();
    alert("New quote added!");
  } else {
    alert("Please enter both a quote and a category.");
  }
}

function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const dataBlob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(dataBlob);
  const downloadLink = document.createElement("a");

  downloadLink.href = url;
  downloadLink.download = "quotes.json";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    populateCategoryFilter();
    alert("Quotes imported successfully!");
  };
  fileReader.readAsText(event.target.files[0]);
}

function populateCategoryFilter() {
  const categoryFilter = document.getElementById("categoryFilter");
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';

  const categories = [...new Set(quotes.map((quote) => quote.category))];
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.text = category;
    categoryFilter.appendChild(option);
  });

  const lastSelectedCategory = localStorage.getItem("selectedCategory");
  if (lastSelectedCategory) {
    categoryFilter.value = lastSelectedCategory;
  }
}

function filterQuotes() {
  const selectedCategory = document.getElementById("categoryFilter").value;
  localStorage.setItem("selectedCategory", selectedCategory);

  const filteredQuotes = getFilteredQuotes();
  if (filteredQuotes.length > 0) {
    displayQuote(filteredQuotes[0]);
  } else {
    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.innerHTML = "No quotes available for this category.";
  }
}

function getFilteredQuotes() {
  const selectedCategory = document.getElementById("categoryFilter").value;
  return selectedCategory === "all"
    ? quotes
    : quotes.filter((quote) => quote.category === selectedCategory);
}

window.onload = function () {
  populateCategoryFilter();
  const lastViewedQuote = JSON.parse(sessionStorage.getItem("lastViewedQuote"));
  if (lastViewedQuote) {
    displayQuote(lastViewedQuote);
  } else {
    filterQuotes();
  }
  syncQuotes();
  setInterval(syncQuotes, 30000); // Periodic syncing every 30 seconds
};

document.getElementById("newQuote").addEventListener("click", showRandomQuote);

async function syncQuotes() {
  try {
    const response = await fetch(apiUrl, {
      headers: {
        "X-Master-Key": apiKey,
      },
    });
    const data = await response.json();
    const serverQuotes = data.record || [];

    // Conflict resolution: server's data takes precedence
    quotes = serverQuotes;
    saveQuotes();
    populateCategoryFilter();
    notifyUser("Quotes synchronized with the server.");
  } catch (error) {
    console.error("Error syncing with server:", error);
    notifyUser("Error syncing with server.");
  }
}

async function fetchQuotesFromServer() {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": apiKey,
      },
      body: JSON.stringify({ record: quotes }),
    });
    if (response.ok) {
      notifyUser("Local quotes updated on the server.");
    } else {
      notifyUser("Failed to update quotes on the server.");
    }
  } catch (error) {
    console.error("Error updating server quotes:", error);
    notifyUser("Error updating quotes on the server.");
  }
}

function notifyUser(message) {
  const notification = document.getElementById("notification");
  notification.innerText = message;
  setTimeout(() => {
    notification.innerText = "";
  }, 3000);
}
