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

// Function to save quotes to local storage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Function to display a random quote
function showRandomQuote() {
  const filteredQuotes = getFilteredQuotes();
  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const randomQuote = filteredQuotes[randomIndex];

  displayQuote(randomQuote);

  // Save the last viewed quote to session storage
  sessionStorage.setItem("lastViewedQuote", JSON.stringify(randomQuote));
}

// Function to display a specific quote
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

// Function to add a new quote
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
    populateCategories();
    alert("New quote added!");
  } else {
    alert("Please enter both a quote and a category.");
  }
}

// Function to export quotes to a JSON file
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

// Function to import quotes from a JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    populateCategories();
    alert("Quotes imported successfully!");
  };
  fileReader.readAsText(event.target.files[0]);
}

// Function to populate the category filter dropdown
function populateCategories() {
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

// Function to filter quotes based on selected category
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

// Function to get quotes based on the selected category
function getFilteredQuotes() {
  const selectedCategory = document.getElementById("categoryFilter").value;
  return selectedCategory === "all"
    ? quotes
    : quotes.filter((quote) => quote.category === selectedCategory);
}

// Load the last viewed quote and populate categories on page load
window.onload = function () {
  populateCategories();
  const lastViewedQuote = JSON.parse(sessionStorage.getItem("lastViewedQuote"));
  if (lastViewedQuote) {
    displayQuote(lastViewedQuote);
  } else {
    filterQuotes();
  }
};

// Event listener for the "Show New Quote" button
document.getElementById("newQuote").addEventListener("click", showRandomQuote);
