const choices = document.querySelectorAll(".choice");
const resultText = document.getElementById("result-text");
const userScoreEl = document.getElementById("user-score");
const computerScoreEl = document.getElementById("computer-score");

let userScore = 0;
let computerScore = 0;

choices.forEach(choice => {
  choice.addEventListener("click", () => {
    const userChoice = choice.id;
    const computerChoice = getComputerChoice();
    const result = getWinner(userChoice, computerChoice);
    updateUI(result, userChoice, computerChoice);
  });
});

function getComputerChoice() {
  const options = ["rock", "paper", "scissors"];
  return options[Math.floor(Math.random() * 3)];
}

function getWinner(user, computer) {
  if (user === computer) return "draw";
  if (
    (user === "rock" && computer === "scissors") ||
    (user === "paper" && computer === "rock") ||
    (user === "scissors" && computer === "paper")
  ) {
    return "win";
  } else {
    return "lose";
  }
}

function updateUI(result, userChoice, computerChoice) {
  if (result === "win") {
    userScore++;
    resultText.textContent = `You win! ${userChoice} beats ${computerChoice}`;
    resultText.className = "win";
  } else if (result === "lose") {
    computerScore++;
    resultText.textContent = `You lose! ${computerChoice} beats ${userChoice}`;
    resultText.className = "lose";
  } else {
    resultText.textContent = `It's a draw! You both chose ${userChoice}`;
    resultText.className = "draw";
  }

  userScoreEl.textContent = userScore;
  computerScoreEl.textContent = computerScore;
}
