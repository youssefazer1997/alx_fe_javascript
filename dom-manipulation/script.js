// // Array to store quotes
// let quotes = [
//   {
//     text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
//     category: "Inspirational",
//   },
//   {
//     text: "The way to get started is to quit talking and begin doing.",
//     category: "Motivational",
//   },
//   {
//     text: "Your time is limited, so don't waste it living someone else's life.",
//     category: "Life",
//   },
// ];

// // Function to display a random quote
// function showRandomQuote() {
//   const quoteDisplay = document.getElementById("quoteDisplay");
//   const randomIndex = Math.floor(Math.random() * quotes.length);
//   const randomQuote = quotes[randomIndex];
//   quoteDisplay.innerHTML = `${randomQuote.text} - ${randomQuote.category}`;
// }

// // Function to add a new quote
// function addQuote() {
//   const newQuoteText = document.getElementById("newQuoteText").value;
//   const newQuoteCategory = document.getElementById("newQuoteCategory").value;

//   if (newQuoteText && newQuoteCategory) {
//     quotes.push({ text: newQuoteText, category: newQuoteCategory });
//     document.getElementById("newQuoteText").value = "";
//     document.getElementById("newQuoteCategory").value = "";
//     alert("New quote added!");
//   } else {
//     alert("Please enter both a quote and a category.");
//   }
// }

// // Event listener for the "Show New Quote" button
// document.getElementById("newQuote").addEventListener("click", showRandomQuote);

// Array to store quotes
let quotes = [
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

// Function to display a random quote
function showRandomQuote() {
  const quoteDisplay = document.getElementById("quoteDisplay");
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  quoteDisplay.innerHTML = `${randomQuote.text} - ${randomQuote.category}`;
}

// Function to add a new quote
function addQuote() {
  const newQuoteText = document.getElementById("newQuoteText").value;
  const newQuoteCategory = document.getElementById("newQuoteCategory").value;

  if (newQuoteText && newQuoteCategory) {
    quotes.push({ text: newQuoteText, category: newQuoteCategory });
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
    alert("New quote added!");
  } else {
    alert("Please enter both a quote and a category.");
  }
}

// Function to create and display the form for adding new quotes
function createAddQuoteForm() {
  const formContainer = document.createElement("div");

  const quoteInput = document.createElement("input");
  quoteInput.id = "newQuoteText";
  quoteInput.type = "text";
  quoteInput.placeholder = "Enter a new quote";
  formContainer.appendChild(quoteInput);

  const categoryInput = document.createElement("input");
  categoryInput.id = "newQuoteCategory";
  categoryInput.type = "text";
  categoryInput.placeholder = "Enter quote category";
  formContainer.appendChild(categoryInput);

  const addButton = document.createElement("button");
  addButton.textContent = "Add Quote";
  addButton.onclick = addQuote;
  formContainer.appendChild(addButton);

  document.body.appendChild(formContainer);
}

// Event listener for the "Show New Quote" button
document.getElementById("newQuote").addEventListener("click", showRandomQuote);

// Initial setup
createAddQuoteForm();
