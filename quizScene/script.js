var currState = -1

var EXTROVERT = 0
var INTROVERT = 1
var FEELER = 2
var THINKER = 3

var personalityTypes = ["extrovert", "introvert", "feeler", "thinker"]

function loadJSON(callback) {
   var xobj = new XMLHttpRequest();
   xobj.overrideMimeType("application/json");
   xobj.open('GET', 'shared/copy.json', true);
   xobj.onreadystatechange = function () {
         if (xobj.readyState == 4 && xobj.status == "200") {
           // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
           callback(xobj.responseText);
         }
   };
   xobj.send(null);
}

function setEnglish(){
  languageID = 0
  setLang(languageID)
}
function setKorean(){
  languageID = 1
  setLang(languageID)
}
function setChinese(){
  languageID = 2
  setLang(languageID)
}

function setLang(id){
  for(i in copyJSON.code){
    console.log(copyJSON.code[i]);
    if(copyJSON.code[id].localeCompare(copyJSON.code[i]) === 0){
      document.getElementById(copyJSON.code[i]+'-btn').style.opacity=1
    } else {
      document.getElementById(copyJSON.code[i]+'-btn').style.opacity=0.5
    }
  }
  document.getElementById('start-btnIntro').innerHTML = copyJSON.StartJourney[id]
  document.getElementById('skipLink').innerHTML = copyJSON.Skip[id]
  document.getElementById('skipLinkScene').innerHTML = copyJSON.Skip[id]
  document.getElementById('start-quiz-btn').innerHTML = copyJSON.StartExperience[id]
  document.getElementById('question').innerHTML = copyJSON.PersonalityTestTitle[id]
  document.getElementById('personality2').innerHTML = copyJSON.PersonalityTest[id]
  document.getElementById('tandc').innerHTML = copyJSON.PrivacyPolicy[id]
  document.documentElement.lang = copyJSON.code[id];

  questions = [
    new Question(copyJSON.PersonalityTestQ1[id], ["baby", "light", "city", "moon"], "baby"),
    new Question(copyJSON.PersonalityTestQ2[id], ["sea", "plant", "shell", "mozai"], "sea"),
    new Question(copyJSON.PersonalityTestQ3[id], ["color1", "color2", "color3",  "color4"], "color1")
  ];
  quiz = new Quiz(questions);
}

var copyJSON;
var languageID = 0;

loadJSON(function(response) {

 // Parse JSON string into object
   copyJSON = JSON.parse(response);
   // console.log(actual_JSON);
   var url = window.location.href;
   var selectedLanguage = url.substr(url.indexOf('#')+1, 2);
   console.log("language is "+selectedLanguage);
   if(selectedLanguage.localeCompare("cn") === 0){
     languageID = 2
   } else if (selectedLanguage.localeCompare("kr") === 0){
     languageID = 1
   } else {
     languageID = 0
   }
   setLang(languageID)

   document.getElementById('en-btn').addEventListener('click', setEnglish)
   document.getElementById('ko-btn').addEventListener('click', setKorean)
   document.getElementById('zh-btn').addEventListener('click', setChinese)

});


var images = {
    "baby"  : "quizScene/images/opt/1-dog.webp",
    "light" : "quizScene/images/opt/1-mountain.webp",
    "city" : "quizScene/images/opt/1-city.webp",
    "moon"   : "quizScene/images/opt/1-math.webp",
    "sea"   : "quizScene/images/opt/2-beach.webp",
    "plant"   : "quizScene/images/opt/2-math.webp",
    "shell"   : "quizScene/images/opt/2-light.webp",
    "mozai"   : "quizScene/images/opt/2-tech.webp",
    "color1"   : "quizScene/images/opt/color1.webp",
    "color2"   : "quizScene/images/opt/color2.webp",
    "color3"   : "quizScene/images/opt/color3.webp",
    "color4"   : "quizScene/images/opt/color4.webp"

    }
var myimages=new Array()
function preloadimages(){
  for (i=0;i<preloadimages.arguments.length;i++){
    myimages[i]=new Image()
    myimages[i].src=preloadimages.arguments[i]
  }
  console.log("loaded")
}
preloadimages("quizScene/images/opt/1-dog.webp",
"quizScene/images/opt/1-mountain.webp",
"quizScene/images/opt/1-city.webp",
"quizScene/images/opt/1-math.webp",
"quizScene/images/opt/2-beach.webp",
"quizScene/images/opt/2-math.webp",
"quizScene/images/opt/2-light.webp",
"quizScene/images/opt/2-tech.webp",
"quizScene/images/opt/color1.webp",
"quizScene/images/opt/color2.webp",
"quizScene/images/opt/color3.webp",
"quizScene/images/opt/color4.webp");


var option1Counter = 0
var option2Counter = 0
var option3Counter = 0
var option4Counter = 0

const startButton = document.getElementById('start-quiz-btn');
startButton.addEventListener('click', startGame);

document.getElementById('firstVideo').addEventListener("ended",function(){
  setTimeout(function(){
    startGame()
  
  }, 5000)
},false);
document.getElementById('skipLink').addEventListener('click', function(e) {
  setTimeout(function(){
    startGame()
  
  }, 5000)
});




function startGame() {
  console.log(document.getElementById('controls_id').style.display === "flex")
  document.getElementById('archid').style.display = 'none';
  document.getElementById('middleText2').style.display = 'none';
  document.getElementById('controls_id').style.display = 'none';
  document.getElementById('quiz_id').style.display = 'flex';
  document.getElementById('process_id').style.display = 'flex';
  // document.getElementById('btnCSS2').style.display = 'none';

  document.getElementById('IntroDiv').style.background ="rgb(254, 245, 240)";
  populate();
}
var buttonID = document.getElementById("buttons_id");
function animationButton(getId,className){
  getId.addEventListener("click", function(e){
    e.preventDefault;
    getId.classList.remove(className);
    void getId.offsetWidth;
    getId.classList.add(className);
  }, false);
}
animationButton(buttonID,"buttons")



function populate() {
  if (quiz.isEnded()) {
    showScores();
  } else {

  var element = document.getElementById("question");
  element.innerHTML = quiz.getQuestionIndex().text;

  var choices = quiz.getQuestionIndex().choices;
  shuffle(choices);
  // animationButton(buttonID,"buttons")
  for (var i = 0; i < choices.length; i++) {
    var element = document.getElementById("choice" + i);
    element.innerHTML = images[choices[i]]? '<img id="choiceImage"src="'+images[choices[i]]+'"/>':choices[i];
    guess("btn" + i, choices[i]);

  }

  showProgress();
  }
};

function guess(id, guess) {
  var button = document.getElementById(id);
  button.onclick = function() {
    quiz.guess(guess);
    populate();
  }
};

function showProgress() {
  var currentQuestionNumber = quiz.questionIndex + 1;
  var element_process = document.getElementById("process_id");
  console.log(currentQuestionNumber);

  if(currentQuestionNumber == 1){
    var process_html1 = "<label for='i1' class='dots' style='background-color: rgb(0, 0, 0);'id='dot1'></label>"
    process_html1 += "<label for='i1' class='dots' id='dot2'></label>"
    process_html1 += "<label for='i1' class='dots' id='dot3'></label>"
    element_process.innerHTML = process_html1;
  }else if(currentQuestionNumber == 2){
    var process_html2 = "<label for='i1' class='dots' style='background-color: transparent;'id='dot1'></label>"
    process_html2 += "<label for='i1' class='dots' style='background-color: rgb(0, 0, 0);' id='dot2'></label>"
    process_html2 += "<label for='i1' class='dots' id='dot3'></label>"
    element_process.innerHTML = process_html2;
  }else{
    var process_html3 = "<label for='i1' class='dots' id='dot1'></label>"
    process_html3 += "<label for='i1' class='dots' style='background-color: transparent;' id='dot2'></label>"
    process_html3 += "<label for='i1' class='dots' style='background-color: rgb(0, 0, 0);' id='dot3'></label>"
    element_process.innerHTML = process_html3;
  }

};
var personiltyType;
function showScores() {
  var buttonColor;
  var imageurl;
  var spaText;
  var infoText;
  var finalOption = Math.max(option1Counter,option2Counter,option3Counter,option4Counter);
  console.log(finalOption)
  var optionChoice;
  if(option1Counter ==finalOption){
    optionChoice = 1
    personiltyType = copyJSON.ExtrovertHeadline[languageID]
    imageurl ="quizScene/images/opt/arch2.webp";
    spaText=copyJSON.Extrovert[languageID]
    currState = EXTROVERT
    infoText=copyJSON.ExtrovertExplanation[languageID]
  }else if(option2Counter ==finalOption){
    optionChoice = 2
    personiltyType = copyJSON.IntrovertHeadline[languageID]
    imageurl ="quizScene/images/opt/arch4.webp";
    spaText=copyJSON.Introvert[languageID]
    currState = INTROVERT
    infoText=copyJSON.IntrovertExplanation[languageID]
  }
  else if(option3Counter ==finalOption){
    optionChoice = 3
    personiltyType = copyJSON.ThinkerHeadline[languageID]
    imageurl ="quizScene/images/opt/arch3.webp";
    spaText=copyJSON.Thinker[languageID]
    currState = THINKER
    infoText=copyJSON.ThinkerExplanation[languageID]
  }else if(option4Counter ==finalOption){
    optionChoice = 4
    personiltyType = copyJSON.FeelerHeadline[languageID]
    imageurl ="quizScene/images/opt/arch5.webp";
    spaText=copyJSON.Feeler[languageID]
    currState = FEELER
    infoText=copyJSON.FeelerExplanation[languageID]

  }
  console.log("last option = " + finalOption)
  // document.getElementById('fist-page').style.display = 'grid';
  document.getElementById('archid').style.display = 'flex';
  document.getElementById('infoText').style.display = 'flex';
  document.getElementById('middleText').style.display = 'flex';
  document.getElementById('controls_id').style.display = 'flex';
  document.getElementById('quiz_id').style.display = 'none';

  document.getElementById('process_id').style.display = 'none';


  var personiltyTypeHtml = "<h3 id='question' >"+personiltyType+"</h3>";
  var  gameOverHTML = '';
  document.getElementById("middleText2").style.top = "45%";
  gameOverHTML += "<h1 id='score'> Option: " + optionChoice + "</h1>";
  var spaText = "<h1 >"+spaText+"</h1>";
  var element = document.getElementById("personality");
  element.innerHTML = spaText;
  var element2 = document.getElementById("question")
  element2.innerHTML = personiltyTypeHtml;


  var buttonText =" <button id='start-btn' class='bn3639 bn39'  >"+copyJSON.GoToSpa[languageID]+"</button>";
  var element3 = document.getElementById("controls_id")
  element3.innerHTML = buttonText;

  var resultImg = "<img src="+ imageurl +">";
  var element4 = document.getElementById("archid");
  element4.innerHTML = resultImg;
  var infoTextHtml = "<h2 id='infoText'>"+ infoText+"</h2>";
  var element5 = document.getElementById("infoText")
  element5.innerHTML = infoTextHtml;

  document.getElementById('start-btn').addEventListener('click', function(e) {
    console.log("navigating to " + copyJSON.code[languageID]+'-'+personalityTypes[currState]);
    window.location.href="sceneFolder/index.html#"+copyJSON.code[languageID]+'-'+personalityTypes[currState];
  });
};

document.getElementById('skipLinkScene').addEventListener('click', function(e) {
  console.log("navigating to " + copyJSON.code[languageID]+'-'+personalityTypes[2]);
  window.location.href="sceneFolder/index.html#"+copyJSON.code[languageID]+'-'+personalityTypes[2];
});

var questions = [
  new Question("CHOOSE AN IMAGE THAT <br> REPRESENTS YOU BEST", ["baby", "light", "city", "moon"], "baby"),
  new Question("CHOOSE AN IMAGE THAT <br> MAKES YOU FEEL MORE RELAXED", ["sea", "plant", "shell", "mozai"], "sea"),
  new Question("CHOOSE A COLOR THAT  <br> YOU LIKE THE MOST", ["color1", "color2", "color3",  "color4"], "color1")
];

function Question(text, choices, answer) {

  this.text = text;
  this.choices = choices;
  this.answer = answer;

}

function shuffle(o) {
  for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
};

Question.prototype.isCorrectAnswer = function(choice) {
  console.log(choice);
  if(choice === "baby"){
    option1Counter +=2
    console.log(option1Counter)
  }else if(choice == "light"){
    option2Counter +=2
  }
  else if(choice == "city"){
    option3Counter +=2
  }else if(choice == "moon"){
    option4Counter +=2
  }
  if(choice === "sea"){
    option1Counter +=2
    console.log(option1Counter)
  }else if(choice == "plant"){
    option2Counter +=3
  }
  else if(choice == "shell"){
    option3Counter +=2
  }else if(choice == "mozai"){
    option4Counter +=1
  }
  if(choice === "color1"){
    option1Counter +=3
    console.log(option1Counter)
  }else if(choice == "color2"){
    option2Counter +=2
  }
  else if(choice == "color3"){
    option3Counter +=3
  }else if(choice == "color4"){
    option4Counter +=4
  }
  return this.answer === choice;

}


function Quiz(questions) {
  this.score = 0;
  this.questions = questions;
  this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function() {
  return this.questions[this.questionIndex];
}

Quiz.prototype.guess = function(answer) {
  if (this.getQuestionIndex().isCorrectAnswer(answer)) {
    this.score++;
  }
  this.questionIndex++;
}

Quiz.prototype.isEnded = function() {
  return this.questionIndex === this.questions.length;
}


var quiz = new Quiz(questions);
