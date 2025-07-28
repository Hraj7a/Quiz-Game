//variabls
const place = document.getElementById("place");
const timer = document.getElementById("timer");
const welcomeIntro = document.getElementById("header-welcome");
const textIntro = document.getElementById("text-intro");
const btnStart = document.getElementById("btn-start");
const questionText = document.querySelector("#question");
const optionButton = document.querySelectorAll(".option-btn");
const optionBox = document.getElementById("optionBox");
const allscore = document.getElementById("score");
const finalAnswers = document.getElementById("score-count");
const allQuestion = document.getElementById("total-questions");
const summaryBody = document.getElementById("answer-summary");
const tryAgain = document.getElementById("try-again");

let currentQuestionIndex = 0;
let score = 0;
let countdownInterval;
let timeLeft = 10;

// const questions = [
//   //question 1
//   {
//     question: "Which animal kills the most humans per year?",
//     answers: [" Sharks", "Lions", "Mosquitoes", "Snakes"],
//     correct: "Mosquitoes",
//     userInput: "N/A",
//   },
//   //question 2
//   {
//     question: "In what month do Russians celebrate the October Revolution?",
//     answers: ["October", "Mars", "November", "December"],
//     correct: "November",
//     userInput: "N/A",
//   },
//   //question 3
//   {
//     question: "On 2003, Who won the champions league?",
//     answers: ["AC Milan", "FCB Barcelona", "Real madrid", "Bayren Munich"],
//     correct: "AC Milan",
//     userInput: "N/A",
//   },
//   //question 4
//   {
//     question: `
//     <div class="ratio ratio-16x9 nontext">
//       <iframe
//         src="https://www.youtube.com/embed/9CQJZs3ABew?start=9&end=20&autoplay=1&mute=1&controls=1"
//         title="YouTube video"
//         allowfullscreen>
//       </iframe>
//     </div>

//     <div> Who is the player shown in this clip?</div>
//   `,
//     answers: ["Yamal", "Ziyech", "Messi", "Tadic"],
//     correct: "Yamal",
//     userInput: "N/A",
//   },

//   //question 5
//   {
//     question: `
//   <div class=" nontext ">
//   <img src="images/ابن-القيم-3.jpg" class="ratio ratio-16x9 ">
//   </div>

//   <div>
//   Who is the person shown in the picture?
//   </div>`,
//     answers: [
//       "Al Autanabbi",
//       "Ibn Al Qayyim",
//       "Ibn Khaldun",
//       "Abbas Ibn Firnas",
//     ],
//     correct: "Ibn Al Qayyim",
//     userInput: "N/A",
//   },
//   //question 6
//   {
//     question: `
//      <div class=" nontext ratio ratio-16x9 mb-3">
//       <iframe
//         src="https://www.youtube.com/embed/F29pyl6_2-U?start=610&end=616&autoplay=1&mute=1&controls=1"
//         title="Movie Scene Clip"
//         allowfullscreen>
//       </iframe>
//     </div>

//     <div>
//     What movie is this scene from?
//     </div>
//   `,
//     answers: [
//       "The Green Mile",
//       "Forrest Gump",
//       "The Godfather",
//       "Shawshank Redemption",
//     ],
//     correct: "Shawshank Redemption",
//     userInput: "N/A",
//   },
// ];

const questions = [
  {
    question:
      "Which of the following is considered a classic 'runway walk' style?",
    answers: ["Power strut", "Sway slide", "Catwalk", "V-step"],
    correct: "Catwalk",
    userInput: "N/A",
  },
  {
    question:
      "Which makeup product is used to set foundation and reduce shine?",
    answers: ["Primer", "Highlighter", "Setting Powder", "Concealer"],
    correct: "Setting Powder",
    userInput: "N/A",
  },
  {
    question: "What is the hardest substance in the human body?",
    answers: ["Enamel", "Dentin", "Bone", "Cartilage"],
    correct: "Enamel",
    userInput: "N/A",
  },
  {
    question: "Which body of water lies to the west of Georgia?",
    answers: ["Black Sea", "Caspian Sea", "Mediterranean Sea", "Aegean Sea"],
    correct: "Black Sea",
    userInput: "N/A",
  },
  {
    question:
      "What is the standard height requirement for most high-fashion female models?",
    answers: [
      "5'4\" and above",
      "5'6\" and above",
      "5'8\" and above",
      "6'0\" and above",
    ],
    correct: "5'8\" and above",
    userInput: "N/A",
  },
  {
    question: "Which brush is best for applying eyeshadow to the crease?",
    answers: [
      "Angled brush",
      "Flat shader brush",
      "Blending brush",
      "Fan brush",
    ],
    correct: "Blending brush",
    userInput: "N/A",
  },
  {
    question: "Which tooth is typically the first permanent tooth to erupt?",
    answers: ["First molar", "Canine", "Central incisor", "Second molar"],
    correct: "First molar",
    userInput: "N/A",
  },
  {
    question: "Which mountain range runs through northern Georgia?",
    answers: [
      "Ural Mountains",
      "Alps",
      "Caucasus Mountains",
      "Zagros Mountains",
    ],
    correct: "Caucasus Mountains",
    userInput: "N/A",
  },
  {
    question: "What does the term 'baking' refer to in makeup?",
    answers: [
      "Applying blush for long wear",
      "Using heat to set foundation",
      "Letting translucent powder sit before brushing it off",
      "Applying shimmer before base",
    ],
    correct: "Letting translucent powder sit before brushing it off",
    userInput: "N/A",
  },
  {
    question: "What is the main role of the pulp inside a tooth?",
    answers: [
      "Give color to the tooth",
      "Support chewing function",
      "Provide nutrients and nerve supply",
      "Prevent plaque buildup",
    ],
    correct: "Provide nutrients and nerve supply",
    userInput: "N/A",
  },
];

btnStart.addEventListener("click", function () {
  place.classList.remove("d-none");
  timer.classList.remove("d-none");
  btnStart.classList.add("d-none");
  welcomeIntro.classList.add("d-none");
  textIntro.classList.add("d-none");
  showQuestion();
  optionBox.classList.remove("d-none");
  optionButton.forEach((button) => {
    button.classList.remove("d-none");
  });
});

function showQuestion() {
  const current = questions[currentQuestionIndex];
  questionText.innerHTML = current.question;
  place.innerHTML = `Question ${currentQuestionIndex + 1} / ${
    questions.length
  } `;

  current.answers.forEach((option, index) => {
    if (optionButton[index]) {
      optionButton[index].textContent = option;
    }
  });
  startTimer();
}

optionButton.forEach((Button) => {
  Button.addEventListener("click", () => {
    clearInterval(countdownInterval);
    const correctAnswer = questions[currentQuestionIndex].correct;
    questions[currentQuestionIndex].userInput = Button.textContent;
    optionButton.forEach((btn) => {
      btn.classList.remove("selected");
      btn.disabled = true;
    });

    Button.classList.add("selected");

    const select = document.querySelector(".selected");

    if (select.textContent == correctAnswer) {
      score++;
      select.classList.add("bg-success", "border-success");
    } else {
      select.classList.add("bg-danger", "border-danger");

      optionButton.forEach((btn) => {
        if (btn.textContent == correctAnswer) {
          btn.classList.add("bg-success", "border-success");
        }
      });
    }

    showNextQuestion();
  });
});

function showNextQuestion() {
  currentQuestionIndex++;
  setTimeout(() => {
    if (currentQuestionIndex < questions.length) {
      place.innerHTML = `Question ${currentQuestionIndex + 1} / ${
        questions.length
      } `;

      optionButton.forEach((btn) => {
        btn.classList.remove("selected");
        btn.classList.remove(
          "bg-success",
          "bg-danger",
          "border-success",
          "border-danger"
        );
        btn.disabled = false;
      });
      showQuestion();
    } else {
      feedback();
    }
  }, 900);
}

function startTimer() {
  let timeLeft = 15;
  timer.textContent = `${timeLeft}s`;

  countdownInterval = setInterval(() => {
    timeLeft--;
    timer.textContent = `${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(countdownInterval);
      questions[currentQuestionIndex].userInput = "N/A";
      showNextQuestion();
    }
  }, 1000);
}

let numbeforeLoop = 0;
let numInLoop = 0;
let numAfterLoop = 0;

function feedback() {
  place.classList.add("d-none");
  timer.classList.add("d-none");
  questionText.classList.add("d-none");
  optionBox.classList.add("d-none");

  optionButton.forEach((button) => {
    button.classList.add("d-none");
  });

  allscore.classList.remove("d-none");

  finalAnswers.textContent = score;
  allQuestion.textContent = questions.length;

  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  summaryBody.innerHTML = "";
  numbeforeLoop++;
  console.log(`Before:${numbeforeLoop}`);

  questions.forEach((q, index) => {
    const isCorrect = q.userInput === q.correct;
    numInLoop++;
    console.log(`In:${numInLoop}`);

    const row = `
    <tr class="${isCorrect ? "table-success" : "table-danger"}">
      <td>${index + 1}</td>
      <td>${q.question}</td>
      <td>${q.userInput}</td>
      <td>${q.correct}</td>
    </tr>
  `;
    tryAgain.onclick = () => location.reload();

    summaryBody.innerHTML += row;
  });

  const pic = document.querySelectorAll(".nontext");
  pic.forEach((item) => {
    item.classList.add("d-none");
    numAfterLoop++;
    console.log(`After:  ${numAfterLoop}`);
  });
}
