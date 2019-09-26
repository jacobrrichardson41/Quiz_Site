/* 
 This is an IIFE - Immediately Invoked Function Expression.
 IIFEs run as soon as they are defined. IIFEs are commonly used to keep variables/functions outside of the global scope and they tend to work better if you're running multiple scripts. 
*/

//This variable exists in the global scope, which means it's less secure and can be accessed by anything
var global;

(function() {
    //Because this variable is inside of an IIFE, it is not in the global scope 
    var variable = 10;

    //Make references to our elements that we're going to interact with 
    var quizContainer =
    document.getElementById("quiz");
    var resultsContainer =
    document.getElementById("results");
    var submitButton = 
    document.getElementById("submit");
    var resetButton =
    document.getElementById("reset");

    var myQuestions = [];

    //What does a quiz question consist of?
    //Question Text, Answer Choices, Correct Answer 
    var question1 = {
        question: "What color is the sky?",
        answers: {
            a: "Blue",
            b: "Brown",
            c: "Green"
        },
        correctAnswer:"a"
    
    }

    console.log(question1.question);//Get the question text
    console.log(question1.answers.b); //Get answer b 
    
    var question2= {
        question: "What is the capital city of Peru",
        answers: {
            a: "Lima",
            b: "Cusco",
            c: "No idea"
        },
        correctAnswer: "a"
    }

    var question3 = {
        question: "Where is Waldo really?",
        answers: {
            a: "Antarctica",
            b: "Explore the Pacific Ocean",
            c: "Sitting in a tree",
            d: "Minding his own business, so stop askin"
        }, 
        correctAnswer: "a"
    }

    //Add the question objects to our array of questions
    myQuestions.push(question1, question2, question3);

    //Function to build a quiz that goes through our question objects and generates HTML for each Question
    function buildQuiz() {
        //We need to go through each of our question objecrs and use them to build out the HTML to show a question 

        for (var i = 0; i < myQuestions.length; i++) {
            //Create a display for the question text 
            var questionDiv = document.createElement("div");
            //Get the question text from the question we are looking at with this iteration of the loop 
            questionDiv.innerText = myQuestions[i].question;
            
            //Display the answer choices (and take user input to select an answer)
            quizContainer.appendChild(questionDiv);

            //Create a div to hold the question answers
            var answersDiv = document.createElement("div");
            answersDiv.classList.add("answers");
            //For each property in the current question's answers object
            /* A for-in loop is used to go through the properties of an onject */
            for (letter in (myQuestions[i].answers)) {
                //Create the label for the radio button input
                var label = document.createElement ("label");

                //Create a radio button for each answer for this question 
                var input = document.createElement("input");

                //Configure the input element
                input.type = "radio";
                input.name = "question" + i;
                input.value = letter;

                //Add element to label
                label.appendChild(input);

                //Create some text from the current letter we're looking at and the corresponding answer for that letter 
                var labelText = document.createTextNode(`${letter} : ${myQuestions[i].answers[letter]}`);

                //Add the text to the label 
                label.appendChild(labelText);

                //Add the label to the answers div
                answersDiv.appendChild(label);

                }

            //Once all the answers are added, add the answerDiv to the QuestionDiv
            questionDiv.appendChild(answersDiv);

            //Add the questionDiv to the quizContainer
            quizContainer.appendChild(questionDiv);
        }
    }



         buildQuiz();

     


        //Function to show the results of the quiz
   function showResults() {
    //Get all the answer containers from our quiz
    var answerContainers = quizContainer.querySelectorAll(".answers"); //This will basically give us back an array containing everything in the quizContainer with the class "answers"

    //Variable to keep track of how many they get right
    var numCorrect = 0;



    for (var i = 0; i < answerContainers.length; i++) {
        //Get the current answer container we're looking at for the loop
        var answerContainer = answerContainers[i];
        //String to find which input is checked for the current question
        var selector = `input[name=question${i}]:checked`;
        //Try to find the selected answer in the container and print out the value
        var userAnswer = (answerContainer.querySelector(selector) || {}).value; //If it can't find a selected input for a question, querySelector will give back null. If it does, use an empty object instead, since {}.value gives back undefined instead of null
        if (userAnswer === myQuestions[i].correctAnswer) {
            //They got it right!
            //Add 1 to numCorrect
            numCorrect++;
            //Change the text color of the elements in the answer container to green
            answerContainer.style.color = "green";
        } else {
            //They got it wrong!
            //Change the text color of the elements in the answer contain to red
            answerContainer.style.color = "red";

        }
    }

    resultsContainer.innerText ="You got " + numCorrect + "out of " + myQuestions.length;
}
//Call the showResults function when the submit button is clicked
submitButton.addEventListener("click", showResults);
//Function to reset the quiz
function resetQuiz() {
    //Clear out what's in the results container 
    resultsContainer.innerText = "";
    //Clear out the quiz container
    quizContainer.innerHTML = "";
    //Rebuild the quiz
    buildQuiz();


}
//Call the resetQuiz button when the reset button is clicked 
resetButton.addEventListener("click", resetQuiz);
})();
 
 