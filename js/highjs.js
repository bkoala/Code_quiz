//Script to display the scores from variables locally stored
var tScore = document.getElementById("#sc_t");
var scoreList = document.querySelector("#score-list");

// The following function renders items in a todo list as <li> elements
function renderTodos() {
// Clear todoList element and update todoCountSpan
console.log("stared HTL");
scoreList.innerHTML = "";
// todoCountSpan.textContent = todos.length;
// Render a new li for each todo
for (var i = 0; i < todos.length; i++) {
  var todo = todos[i];
  var liT = document.createElement("p");
  liT.textContent = todo.userInitials + "   :    " +todo.userscore;
  liT.setAttribute("css", "font-size:15px");

  //var button = document.createElement("button");
 // button.textContent = "Complete ✔️";

//  li.appendChild(button);
  scoreList.appendChild(liT);
}
}

// This function is being called below and will run when the page loads.
function init() {
// Get stored todos from localStorage
var storedScores = JSON.parse(localStorage.getItem("highScores"));
// If todos were retrieved from localStorage, update the todos array to it
if (storedScores !== null) {
  todos = storedScores;
}
// This is a helper function that will render todos to the DOM
renderTodos();
}