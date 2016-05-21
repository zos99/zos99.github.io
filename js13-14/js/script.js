"use strict";
$(function() {
    var questions = [
        {
            text: "Что такое jQuery плагины?",
            answers: ["Методы jQuery", " Особые возможности jQuery", "Набор функций использующих jQuery"],
            true_ansver: [false,false,true]
        },
        {
            text: "Для чего нужны jQuery плагины?",
            answers: ["Для масштабируемости веб-приложений", "Они содержат в себе уже разработанные функции, которые программистам приходится часто разрабатывать", "Для увеличения читабельности кода"],
            true_ansver: [false,true,false]
        },
        {
            text: "Кто может разрабатывать jQuery плагины?",
            answers: ["Только создатели jQuery", "Любой разработчик, в т.ч. вы.", "Только компания Microsoft."],
            true_ansver:[false,true,false]
        },
        {
            text: "Какой файл обязательно должен включать плагин?",
            answers: ["html файл", "Javascript файл", "Файл CSS стилей"],
            true_ansver:[false,true,false]
        }
    ];
    /*******************************************************/
    var json_questions=JSON.stringify(questions);
    localStorage.setItem('local_storage_questions',json_questions);
    var store_questions=localStorage.getItem('local_storage_questions');
    store_questions=JSON.parse(store_questions);
    /*-------------------------------------------------------------*/
    var html = $('#output-info').html();
    var content = tmpl(html, {
      data: store_questions
    });
	  $('body').append(content);
/*--------------------------------------------------------------*/
    function show_answer(results) {
      var you_res = 0;
      for (var i = 0; i < results.length; ++i) {
        if(results[i]) ++you_res;
      }
    var modal_window_template=$("#modal_window").html();
    var new_modal=tmpl(modal_window_template, {
      results: results,
      you_res:you_res
    });
    $('body').append(new_modal);
    $(".overlay").css( {
      "visibility":"visible"
    });
	  $("#closeModal").on("click",function() {
      $(".overlay").detach();
    });
  }
  function check(e) {
    e.preventDefault();
    var results = [];
    for(var i = 0; i < questions.length; ++i) {
      var is_correct = false;
      var correct_counter = 0;
      for(var j = 0; j < questions[i].true_ansver.length; ++j) {
        if (questions[i].true_ansver[j] === document.getElementsByName('name'+i)[j].checked) {
          correct_counter++;
        }
        document.getElementsByName('name'+i)[j].checked = false;
      }
      if(correct_counter === questions[i].true_ansver.length)is_correct = true;
      results[i] = is_correct;
    }
    show_answer(results);
  }
  var button = document.getElementsByClassName("button");
  button[0].addEventListener("click",check);
  });
