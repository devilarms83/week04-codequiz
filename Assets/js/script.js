// Initialize Document Variables
var topEl = document.getElementById('top')
var highscoreEl = document.getElementById('highscore')
var timetextEl = document.getElementById('timetext')
var timerEl = document.getElementById('timer')
var mainEl = document.getElementById('mainmenu')
var endEl = document.getElementById('end')
var startBtn = document.getElementById('start')
var quizEl = document.getElementById('quiz')
var questionEl = document.getElementById('questions')
var answersEl = document.getElementById('answers')
var correctEl = document.getElementById('correct')
var incorrectEl = document.getElementById('incorrect')
var backBtn = document.getElementById('back')
var clearscoreBtn = document.getElementById('clearscore')
var submitBtn = document.getElementById('submit')
var scoreEl = document.getElementById('score')
var finalscoreEl = document.getElementById('finalscore')
var ul = document.getElementById('scorelist')

// Initialize Quiz Variables
var score = 0
var scores = []
var randomizeQs
var qIndex = 0
var timeLeft = 60

// Create Score List
function renderScores(){
  ul.innerHTML = "";

  for (var i = 0; i < scores.length; i++) {
    var scor = scores[i];

    var li = document.createElement("li");
    li.innerHTML = (i+1) + ". " + scor.initials + " - " + scor.score
    
    ul.appendChild(li);
    
  }
}

// Retrieve Score List from Local Storage
function initScores() {
  if(localStorage.getItem("storedScores") === null) {
    localStorage.storedScores = "[]"
  }

  var storedScores = JSON.parse(localStorage.getItem("storedScores"))
  
  if (storedScores !== null) {
    scores = storedScores
  }

  renderScores()
}

// Quiz Array, contains questions, selections and answers
var quizAr = [
  {
    question: "The default link color for hyperlinks is ____",
    selections: ["1. green", "2. blue", "3. purple", "4. red"],
    answer: "2. blue"
  },
  {
    question: "Commonly used data types DO Not Include:",
    selections: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    answer: "3. alerts"
  },
  {
    question: "The condition in an if / else statement is enclosed with ____",
    selections: ["1. quotes", "2. curly brackets", "3. parenthesis", "4. square brackets"],
    answer: "3. parenthesis"
  },
  {
    question: "String values must be enclosed within ____ when being assigned to variables.",
    selections: ["1. quotes", "2. curly brackets", "3. commas", "4. parenthesis"],
    answer: "1. quotes"
  },
  {
    question: "Arrays in JavaScript can be used to store ____.",
    selections: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
    answer: "4. all of the above"
  },
  {
    question: "A very useful tool used during development and debugging for printing content to the debugger is ____.",
    selections: ["1. JavaScript", "2. terminal/bash", "3. for loops", "4. console.log"],
    answer: "4. console.log"
  },
  {
    question: "Inside which HTML element do we put the JavaScript?",
    selections: ["1. <script>", "2. <scripting>", "3. <js>", "4. <javascript>"],
    answer: "1. <script>"
  },
  {
    question: "What does CSS stand for?",
    selections: ["1. Creative Style Sheets", "2. Colorful Style Sheets", "3. Computer Style Sheets", "4. Cascading Style Sheets"],
    answer: "4. Cascading Style Sheets"
  },
  {
    question: "Which HTML attribute specifies an alternate text for an image, if the image cannot be displayed?",
    selections: ["1. alt", "2. longdesc", "3. src", "4. title"],
    answer: "1. alt"
  },
  {
    question: "Which CSS property controls the text size?",
    selections: ["1. text-size", "2. font-size", "3. text-style", "4. font-style"],
    answer: "2. font-size"
  },
]

// Randomizes quiz questions array via https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  var currentIndex = array.length, randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
  }

  return array
}

// Initializes Starter View
function startPage() {
  // Updates section views
  highscoreEl.hidden = false
  timetextEl.hidden = false  
  mainEl.hidden = false
  endEl.hidden = true
  correctEl.hidden = true
  incorrectEl.hidden = true
  quizEl.hidden = true
  scoreEl.hidden = true
  // Resets variables
  score = 0
  timerEl.textContent = 0
  qIndex = 0
  timeLeft = 99
}

// Starts Quiz
function quizStart() {
  // Updates section views
  mainEl.hidden = true
  quizEl.hidden = false
  highscoreEl.hidden = true
  // Calls shuffle function that randomizes quiz array
  shuffle(quizAr)
  // Calls timer and displayQ functions
  timer()
  displayQ() 
  
}

// Timer that counts down from 60
function timer() {
  timetextEl.hidden = false
  timerEl.hidden = false
  topEl.style.justifyContent = "center"

  // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    var timeInterval = setInterval(function () {
      // As long as the `timeLeft` is greater than 1
      if (timeLeft > 10) {
        // Set the `textContent` of `timerEl` to show the remaining seconds
        timerEl.textContent = timeLeft
        // Decrement `timeLeft` by 1
        timeLeft--
      } else if (timeLeft <= 10 && timeLeft > 0) {
        // change font color to red and font size to xx-large
        timerEl.style.color = "red"      
        timerEl.textContent = timeLeft
        timeLeft--
      } else {
        // Once `timeLeft` gets to 0, set `timerEl` to an empty string
        timerEl.textContent = ''
        // Use `clearInterval()` to stop the timer
        clearInterval(timeInterval)
        topEl.style.justifyContent = "space-between"
        // Call the `quizEnd()` function
        quizEnd()
        
      }
    }, 1000)
}

// Function that creates quiz entries
function displayQ() {  
  // Creates quiz question
  questionEl.innerText = quizAr[qIndex].question
  // Creates option buttons
  for (var i = 0; i < quizAr[qIndex].selections.length; i++) {
      var optionsBtn = document.createElement('button')
      optionsBtn.innerText = quizAr[qIndex].selections[i]
      optionsBtn.classList.add('btn')
      optionsBtn.classList.add('selectbtn')
      // Tells browser to check for selected answers
      optionsBtn.addEventListener("click", checkAnswer)
      answersEl.appendChild(optionsBtn)
      }
  };

// Function that checks selected answer
function checkAnswer(event) {
  var entrySelected = event.target
    // Checks if answer selected is correct, adds 10pts
    // Subtracts time if answer is incorrect
    if (quizAr[qIndex].answer === entrySelected.innerText) {
      correctEl.hidden = false
      incorrectEl.hidden = true
      score = score + 10
    } else {
      correctEl.hidden = true
      incorrectEl.hidden = false
      timeLeft = timeLeft - 10
    }
  // Removes previous answer buttons to clear screen
  while(answersEl.firstChild){
    answersEl.removeChild(answersEl.firstChild)
  }
  // Moves array index to next question
  qIndex++
  // Checks if there's time left or loads next question
  if (qIndex > (quizAr.length-1)) {
    timeLeft = 0
  } else {
    displayQ()
  }
}

// End screen
function quizEnd() {
  // Updates section views
  endEl.hidden = false
  highscoreEl.hidden = true
  timetextEl.hidden = true 
  correctEl.hidden = true
  incorrectEl.hidden = true
  finalscoreEl.textContent = score
  quizEl.hidden = true
  // Removes previous answer buttons to clear screen
  while(answersEl.firstChild){
    answersEl.removeChild(answersEl.firstChild)
  }
}

// Stores high score to local storage
function storeHighscore() {
  // Stringify and set key in localStorage to scores array
  localStorage.setItem("storedScores", JSON.stringify(scores));
}

// Collects initials, pairs with score and adds to scores array
function submitScore(event) {
  event.preventDefault()

  // Checks if initials are empty and throws alert
  if (initials.value === "") {
    alert('Initials are empty!')
    return
  }

  // Creates array entry of initials and score
  var scoreEntry = {
    initials: initials.value,
    score: score
  }

  // Stores array entry to scores and sorts via score 
  scores.push(scoreEntry)
  scores.sort((a, b) => {return b.score-a.score})
  
  // Stringify and set key in localStorage to scores array
  storeHighscore()

  // Update section views
  endEl.hidden = true
  scoreEl.hidden = false

  // Calls Render Score function
  renderScores()
}

// Changes view to high scores list
function displayScores() {
  scoreEl.hidden = false
  mainEl.hidden = true
  highscoreEl.hidden = true
  timetextEl.hidden = true
  timerEl.hidden = true

}

// Clears local storage of stored high scores
function clearScores(event) {
  event.preventDefault()

  ul.innerHTML = "";
  localStorage.setItem("storedScores", "");
}

// Loads function that checks stored high scores
initScores()

// Event Listeners for buttons
startBtn.addEventListener("click", quizStart)
submitBtn.addEventListener("click", submitScore)
backBtn.addEventListener("click", startPage)
clearscoreBtn.addEventListener("click", clearScores)
highscoreEl.addEventListener("click", displayScores)