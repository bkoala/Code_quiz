var submitButton = document.getElementById('start-btn');
var saveButton = document.getElementById('save-btn');
var cardItems =document.getElementById('last-initials');
var questionContainerElement = document.getElementById('question-container');
var totalScore=0;
var timerEl = document.getElementById('countdown');
var thescore = document.getElementById('score');
let shuffleQuestions, curQuestionIndex;
var timeLeft =5;
const highScores=[];
var questionElement =document.getElementById('question');
var theLine=document.getElementById('hrline');
var answerElement=document.getElementById('ifanswer');
var answerButtonElement=document.getElementById('answers-buttons');
var initialInput = document.querySelector("#lname");
var signUpButton = document.querySelector("#save");


saveButton.classList.add('hide');
submitButton.addEventListener("click",startQuizz)

//Start Quizz
function startQuizz(){
 submitButton.classList.add('hide');
 saveButton.classList.add('hide');
 shuffleQuestions=myQuestions.sort(()=>Math.random()- .5);
 curQuestionIndex=0;
 questionContainerElement.classList.remove('hide');
 shownextQuestion(); 
}
//Show next Questions
function shownextQuestion(){ 
 resetState();
 showQuestion(shuffleQuestions[curQuestionIndex]);
}

//Show the current question
function showQuestion(question){
questionElement.innerText=question.question;
question.answers.forEach(answer => {
    var button = document.createElement("button");  
    button.setAttribute("style","font-size:14px");
    button.textContent=answer.text;
     if (answer.correct){
       button.dataset.correct=answer.correct;
     }
     
    answerButtonElement.appendChild(button);  
    button.addEventListener('click',selectAnswer);   
});
submitButton.classList.add('hide');
saveButton.classList.add('hide');
}

//Reset state
function resetState(){
 
  while( answerButtonElement.firstChild){
    answerButtonElement.removeChild(answerButtonElement.firstChild);
  }
}

//Select Answer based on the user click and register correct one

function selectAnswer(e){
 var selected=e.target;
 //Put a divider line
  theLine.classList.remove('hide');
 //Show the answer on screen
 answerElement.classList.remove("hide");
 //Increase the total score for a correct answer
 if(selected.dataset.correct){ 
     totalScore ++;
     answerElement.innerText="Correct!";
   }
 else{ 
    //Decrease time left by one second when the user misses a question
    var timeOne=1;
    countdown(timeOne);
    timeLeft--;   
    answerElement.innerText="Wrong!";
    if (timeLeft <= 0){
        //End the Game
          curQuestionIndex=shuffleQuestions.length+1;
          //Store the score
          localStorage.setItem("totalScore",JSON.stringify(totalScore));
    }
    timerEl.textContent = timeLeft;
}
   
  Array.from(answerButtonElement.children).forEach(button=> {
     setStatusClass(button,button.dataset.correct)
  })
 // Decide if one need to show next question
  if(shuffleQuestions.length > (curQuestionIndex +1)){
  curQuestionIndex++;
  shownextQuestion();
}
  else{
    //End the Game No More questions or time elapse
    thescore.textContent=totalScore;
    localStorage.setItem("totalScore",JSON.stringify(totalScore));
    questionContainerElement.classList.add('hide');
    cardItems.classList.remove('hide')
    
  }
}

//Set the store value based on element status
function setStatusClass(element,correct){
  clearStatusClass(element);
  if(correct){
    element.classList.add('correct');
  }
  else{
    element.classList.add('wrong');
  }
}
//clear Element status
function clearStatusClass(element){
  element.classList.remove('correct');
  element.classList.remove('wrong');
}

//Save the user informations
signUpButton.addEventListener("click", function(event) {
  event.preventDefault();
  //PUT Name in empty user name
  if(!initialInput.value.trim()){userInitials="Ananymous";}
  else{   userInitials=initialInput.value.trim();}
  // create user object from submission
  var user = {   
    userInitials:userInitials,
    userscore: totalScore
  }
  highScores.push(user);
  localStorage.setItem("highScores", JSON.stringify(highScores));
  //Reset the timer for a New game
  timeLeft = 5;
  submitButton.textContent="Play Again";
  submitButton.classList.remove('hide');
  cardItems.classList.add('hide')

});
//Declare the questions; store in a variable
var myQuestions = [
	{
		question: "Inside which HTML element do we put the JavaScript?",
		answers: [
		{text:  '1. <scripting>', correct:false},
		{text: ' 2. <script>',correct:true},
		 {text: '3. <js>',correct:false}
    
    ]
	},
  {
		question: "Where is the correct place to insert a JavaScript?",
		answers: [
		{text:  '1. Both the <head> section and the <body> sections ', correct:true},
		{text: ' 2. The <body> section only',correct:false},
		 {text: '3. The <head> section only ',correct:false},
     {text: '4. The <footer> section only',correct:false}
    ]
	} ,
  {
		question: "The external JavaScript file must contain the <script> tag.",
		answers: [
		{text:  '1. True', correct:true},
		{text: ' 2. False',correct:false}
    ]
	},
  {
		question: "How can you get the type of arguments passed to a function?",
		answers: [
		{text:  '1. Using typeof operator', correct:true},
		{text: ' 2. Using getType function',correct:false},
    {text:  '3. None of the above', correct:false}
    ]
	},
  {
		question: "How do you write 'Hello' in an alert box?",
		answers: [
		{text:  '1. alertBox("Hello") ', correct:false},
		{text: ' 2. msgBox("Hello")',correct:false},
		 {text: '3. alert("Hello") ',correct:true},
     {text: '4. msg("Hell")',correct:false}
    ]
	},
  {
		question: "How do you create a function in JavaScript?",
		answers: [
		{text:  '1. function=myFunction()', correct:false},
		{text: ' 2. function myFunction()',correct:true},
		 {text: '3. function:myFunction() ',correct:false},
     {text: '4. myFunction()',correct:false}
    ]
	},
  {
		question: "How to write an IF statement in JavaScript?",
		answers: [
		{text:  '1. if i=12', correct:false},
		{text: ' 2. if(i==12)',correct:true},
		 {text: '3. if i==12 then ',correct:false},
     {text: '4. if i=5 then ',correct:false}
    ]
	},
  {
		question: "How to write an IF statement for executing some code if 'i' is NOT equal to 5?",
		answers: [
		{text:  '1. if (i != 5)', correct:true},
		{text: ' 2. if i =! 5 then ',correct:false},
		 {text: '3. if (i <> 5) ',correct:false},
     {text: '4. if (i <5) ',correct:false}
    ]
	},
  {
		question: "How does a WHILE loop start?",
		answers: [
		{text:  '1. While (i<=5, i++)', correct:false},
		{text: ' 2. While (i <=5) ',correct:true},
		 {text: '3. While(i=1 to 5) ',correct:false}
    ]
	},
  {
		question: "How does a FOR loop start?",
		answers: [
		{text:  '1. for (i<=5, i++)', correct:false},
		{text: ' 2. for (i =1 to 5) ',correct:false},
		 {text: '3. for (i=1 to 5) ',correct:false},
     {text: '3. for (i=1; i<5; i++) ',correct:true}
    ]
	} 
];
//Function count down

function countdown(timeL) {
  // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
  var timeInterval = setInterval(function () {
    // As long as the `timeLeft` is greater than 1
    if (timeL > 0) {
      timeL--;
      return ;
    } else{
      // Use `clearInterval()` to stop the timer
       clearInterval(timeInterval);
    }
  }, 1000);
}
