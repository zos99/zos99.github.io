var questions = [
    {
        text: "Вопрос №1",
        answers: ["Вариант ответа №1", "Вариант ответа №2", "Вариант ответа №3"],
    },
    {
        text: "Вопрос №2",
        answers: ["Вариант ответа №1", "Вариант ответа №2", "Вариант ответа №3"],
    },
    {
        text: "Вопрос №3",
        answers: ["Вариант ответа №1", "Вариант ответа №2", "Вариант ответа №3"],
    }
]; 
var testForm = {
    testBody: document.body,
    testContainer: document.createElement('div'),
    testForm: document.createElement('form'),
    testHead: document.createElement('header'),
    testName: document.createElement('h1'),
    testWrapperBtn: document.createElement('div'),
    testBtn: document.createElement('button'),
    
    createTest: function() {
        this.testContainer.classList.add('container');
        
        this.testForm.classList.add('test-form');
        this.testForm.setAttribute('id', 'test-form');
        this.testForm.setAttribute('method', 'GET');
        
        
        this.testName.classList.add('page-header', 'test-name');
        this.testName.innerHTML = 'Тест по программированию';
    
        this.testWrapperBtn.classList.add('wrapper-btn'); 
        
        this.testBtn.classList.add('btn', 'btn-large', 'btn-primary', 'test-btn');
        this.testBtn.setAttribute('form', 'test-form');
        this.testBtn.setAttribute('type', 'submit');
        this.testBtn.innerHTML = 'Проверить мои результаты';
        
        this.testBody.appendChild(this.testContainer);
        this.testContainer.appendChild(this.testForm);
        this.testForm.appendChild(this.testHead);
        this.testHead.appendChild(this.testName);
        this.testForm.appendChild(this.testWrapperBtn);
        this.testWrapperBtn.appendChild(this.testBtn);
        
    },
    createTestQuestion: function(textQuestion, answersArray, questionNumber) {
        var questionBody = document.createElement('figure');
        var questionHead = document.createElement('header');
        var questionName = document.createElement('h2');
        var questionAnswerCheckbox;
        var questionAnswerLabel;
        
        questionBody.classList.add('container');
        questionName.classList.add('question-title');
        questionName.innerHTML = (questionNumber+1) + '. ' + textQuestion;
        questionBody.appendChild(questionHead);
        questionHead.appendChild(questionName);
        
        
        for (var i = 0; i < answersArray.length; i++) {
            var labelText = document.createTextNode(answersArray[i]);
            
            questionAnswerLabel =  document.createElement('label');
            questionAnswerCheckbox =  document.createElement('input');
            
            questionAnswerCheckbox.classList.add('checkbox');
            questionAnswerLabel.classList.add('checkbox');
            
            questionAnswerCheckbox.setAttribute('type', 'checkbox');
            questionAnswerCheckbox.setAttribute('id', ('q-'+questionNumber+'A'+(i+1)) );
            questionAnswerCheckbox.setAttribute('name', ('q'+questionNumber+'A'+(i+1)) );
            
            questionBody.appendChild(questionAnswerLabel);
            
            questionAnswerLabel.appendChild(questionAnswerCheckbox);
            questionAnswerLabel.appendChild(labelText);
        }
        this.testForm.insertBefore(questionBody, this.testWrapperBtn);
    }
};

testForm.createTest();
for (var i = 0; i < questions.length; i++) {
    testForm.createTestQuestion(questions[i].text, questions[i].answers, i);
}
