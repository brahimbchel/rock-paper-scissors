const userScoreSpan = document.getElementById("user-score");
const computerScoreSpan = document.getElementById("computer-score");
const resultText = document.getElementById("result-text");
const timer = document.getElementById("timer");

const rockBtnUser = document.getElementById("rock_user");
const paperBtnUser = document.getElementById("paper_user");
const scissorsBtnUser = document.getElementById("scissors_user");

const rockBtnBot = document.getElementById("rock_bot");
const paperBtnBot = document.getElementById("paper_bot");
const scissorsBtnBot = document.getElementById("scissors_bot");

let userScore = 0;
let computerScore = 0;

const userButtons = [rockBtnUser, paperBtnUser, scissorsBtnUser];
const botButtons = [rockBtnBot, paperBtnBot, scissorsBtnBot];

// Get a random choice for the computer
function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

// Update active styling for user choices
function setActiveUserChoice(choice) {
  userButtons.forEach((btn) => {
    btn.classList.remove("ring-4", "ring-blue-300");
    btn.classList.add("bg-blue-500");
  });

  if (choice === "rock") {
    rockBtnUser.classList.add("ring-4", "ring-blue-300");
  } else if (choice === "paper") {
    paperBtnUser.classList.add("ring-4", "ring-blue-300");
  } else if (choice === "scissors") {
    scissorsBtnUser.classList.add("ring-4", "ring-blue-300");
  }
}

// Update active styling for bot choices
function setActiveBotChoice(choice) {
  botButtons.forEach((btn) => {
    btn.classList.add("opacity-50", "cursor-not-allowed");
    btn.classList.remove("ring-4", "ring-red-300");
  });

  if (choice === "rock") {
    rockBtnBot.classList.remove("opacity-50", "cursor-not-allowed");
    rockBtnBot.classList.add("ring-4", "ring-red-300");
  } else if (choice === "paper") {
    paperBtnBot.classList.remove("opacity-50", "cursor-not-allowed");
    paperBtnBot.classList.add("ring-4", "ring-red-300");
  } else if (choice === "scissors") {
    scissorsBtnBot.classList.remove("opacity-50", "cursor-not-allowed");
    scissorsBtnBot.classList.add("ring-4", "ring-red-300");
  }
}

function playRound(userChoice) {
  const computerChoice = getComputerChoice();
  let outcome = "";
  let outcomeRes = "";

  if (userChoice === computerChoice) {
    outcome = `It's a tie! You both chose ${userChoice}.`;
    outcomeRes = "tie";
  } else if (
    (userChoice === "rock" && computerChoice === "scissors") ||
    (userChoice === "paper" && computerChoice === "rock") ||
    (userChoice === "scissors" && computerChoice === "paper")
  ) {
    userScore++;
    userScoreSpan.innerText = userScore;
    outcome = `You win! ${userChoice} beats ${computerChoice}.`;
    outcomeRes = "win";
  } else {
    computerScore++;
    computerScoreSpan.innerText = computerScore;
    outcome = `You lose! ${computerChoice} beats ${userChoice}.`;
    outcomeRes = "lose";
  }

  return { outcome, outcomeRes, computerChoice };
}

// Main game function – updates result and bot choice styling
function game(userChoice) {
  const { outcome, outcomeRes, computerChoice } = playRound(userChoice);
  resultText.innerText = outcome;

  if (outcomeRes === "win") {
    resultText.classList.add("text-blue-600");
    resultText.classList.remove("text-red-600", "text-gray-600");
  } else if (outcomeRes === "lose") {
    resultText.classList.add("text-red-600");
    resultText.classList.remove("text-blue-600", "text-gray-600");
  } else if (outcomeRes === "tie") {
    resultText.classList.add("text-gray-600");
    resultText.classList.remove("text-blue-600", "text-red-600");
  }

  setActiveBotChoice(computerChoice);
}

rockBtnUser.addEventListener("click", () => {
  setActiveUserChoice("rock");
  game("rock");
});

paperBtnUser.addEventListener("click", () => {
  setActiveUserChoice("paper");
  game("paper");
});

scissorsBtnUser.addEventListener("click", () => {
  setActiveUserChoice("scissors");
  game("scissors");
});
