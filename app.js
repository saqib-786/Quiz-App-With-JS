let mainContainer = document.querySelector('#main-container');
let quizContainer = document.querySelector('#quiz-conntainer');
let questionContainer = document.querySelector('#question-container');
let answerContainer = document.querySelector('#buttons-container');
let resultContainer = document.querySelector('#result-container');

class Quiz{
    constructor(questions){
        this.questions = Quiz.shuffleArray(questions);
        this.currentQuestionIndex = 0;
        this.score = 0;

    }
    displayQuestion(){
        answerContainer.innerHTML = ''
        const currentQuestion = this.questions[this.currentQuestionIndex];
        questionContainer.textContent = currentQuestion.question;
        const answers = Quiz.shuffleArray(currentQuestion.answers);
        answers.forEach(ans=>{
        let button = document.createElement('button');
        button.setAttribute('class','answer-btn');
        button.textContent = ans;
        button.addEventListener('click',this.checkAnswer.bind(this));
        answerContainer.appendChild(button);
        })
    }

    checkAnswer(event){
        const selectedAnswer = event.target.textContent;
        const currentQuestion = this.questions[this.currentQuestionIndex];
        if(selectedAnswer === currentQuestion.correctAnswer){
            event.target.classList.add('right');
            this.score++;
        
        }else{
            event.target.classList.add('wrong')
        }

     
        this.currentQuestionIndex++;

       
        if(this.currentQuestionIndex < this.questions.length){
            this.displayQuestion();
        }else{
            this.showResult();
        }
        

    }

    showResult(){
        quizContainer.style.display = 'none';
        resultContainer.style.display = 'block';
        resultContainer.innerHTML = `
        <h2>Quiz Result</h2>
        <p>You Scored ${this.score} out of ${this.questions.length} questions</p>
        <button id='reload-quiz'>Reload All Quiz</button>
    
        `
        document.querySelector('#reload-quiz').addEventListener('click',()=>{
            resultContainer.style.display = 'none';
            quizContainer.style.display = 'none';
            mainContainer.style.display = 'flex'
        });

        

    }
    static shuffleArray(array){
        return [...array].sort(()=> Math.random() - 0.5)
            
    }

}

function loadQuestions(question){
    const quiz = new Quiz(question);
    quiz.displayQuestion();
    mainContainer.style.display = 'none';
    quizContainer.style.display = 'block'
    
}

async function loadAllQuizes(){
    let response = await fetch('./quizzes.json');
    let quizez = await response.json();
    quizez.forEach((quiz,index)=>{
        let div = document.createElement('div');
        div.setAttribute('class','quiz-box');
        div.innerHTML = `Quiz ${index +1}`
        div.addEventListener(('click'), () =>loadQuestions(quiz));
        mainContainer.appendChild(div);

    })

}

loadAllQuizes()