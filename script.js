// Game variables
const range = document.getElementById("inputRange"); // Input range element
let secretNumber = Math.floor(Math.random() * range.valueAsNumber) + 1; // Generate initial random number
let score = 20; // Initial player score
let highScore = 0; // Track high score

// Retrieve high score from sessionStorage or initialize it
if (sessionStorage.getItem("highScore") != null) {
  highScore = sessionStorage.getItem("highScore");
  document.querySelector(".highscore").textContent = highScore;
} else {
  sessionStorage.setItem("highScore", 0);
}

// Function to show wrong answer feedback
function wrongAnswer() {
  let body = document.querySelector("body");
  body.classList.add("wrong-answer");
  setTimeout(() => {
    body.classList.remove("wrong-answer");
  }, 100); // Flash effect for wrong answer
}

// Function to handle game logic
function checkGuess() {
  const guess = Number(document.querySelector(".guess").value); // Get the player's guess
  let message = document.querySelector(".message"); // Feedback message element
  message.classList.remove("new-range"); // Reset range highlight

  if (!guess) {
    // Case: No number entered
    message.textContent = "😒 Enter a number!";
  } else if (guess === secretNumber) {
    // Case: Correct guess
    message.textContent = "🎉 Correct Answer!";
    document.querySelector(".number").textContent = secretNumber; // Reveal the secret number
    document.querySelector(".number").style.width = "30rem"; // Enlarged number box
    document.querySelector("body").style.backgroundColor = "#60b347"; // Green success background

    if (score > highScore) {
      // Update high score if the current score is higher
      highScore = score;
      document.querySelector(".highscore").textContent = highScore;
      sessionStorage.setItem("highScore", highScore); // Save to sessionStorage
    }
  } else if (guess !== secretNumber) {
    // Case: Incorrect guess (Too high or too low)
    if (score > 1) {
      message.textContent =
        guess > secretNumber
          ? guess - secretNumber <= 2
            ? "😬 So Close! Just a bit lower."
            : "📈 Too High!"
          : secretNumber - guess <= 2
          ? "😬 So Close! Just a bit higher."
          : "📉 Too Low!";
      score--; // Deduct score
      document.querySelector(".score").textContent = score; // Update score display
      wrongAnswer(); // Trigger wrong-answer effect
    } else {
      // Player loses the game
      message.textContent = "💥 Game Over!";
      document.querySelector(".score").textContent = "0";
      document.querySelector(".number").textContent = secretNumber; // Reveal the number
      document.querySelector("body").style.backgroundColor = "darkred"; // Red failure background
    }
  }
}

// Reset the game
document.querySelector(".again").addEventListener("click", function () {
  score = 20; // Reset score
  secretNumber = Math.floor(Math.random() * range.valueAsNumber) + 1; // Generate a new secret number
  document.querySelector(".guess").value = ""; // Clear input field
  document.querySelector(".number").textContent = "?"; // Reset number display
  document.querySelector(".number").style.width = "15rem"; // Reset width
  document.querySelector(".score").textContent = score; // Reset score display
  document.querySelector(".message").textContent = "Start guessing..."; // Reset message
  document.querySelector("body").style.backgroundColor = "#222"; // Reset background
});

// Update the range dynamically
range.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevent default form submission behavior
    const newRange = event.target.value; // Get new range value
    let message = document.querySelector(".message");

    if (newRange < 20) {
      // Validate range
      message.textContent = "Range must be at least 20!";
    } else {
      // Update range and regenerate secret number
      document.getElementById("inputRange").value = newRange;
      secretNumber = Math.floor(Math.random() * newRange) + 1;
      message.textContent = "Range updated! Start guessing!";
    }
  }
});

// Allow Enter key to submit guess
document.getElementById("inputGuess").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    checkGuess(); // Trigger checkGuess on Enter
  }
});
