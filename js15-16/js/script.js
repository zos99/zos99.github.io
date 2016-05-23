$(function() {
    $('.search-form').on('submit', function() {
        var enteredQuery = $('#entered-query').val();
				$.ajax({
            url: "https://www.googleapis.com/customsearch/v1?q="+enteredQuery+"&key=AIzaSyDQq5I1_jJG2eKE78NEUM8GCBRwgXRW0F4&cx=000283222127530457480:fcqttmqm5o0&callback=?",
             dataType: 'jsonp',
             method : 'GET',
            success: function(data, textStatus) {
                console.log(textStatus, data);
                var ul = document.createElement('ul');
                 if (data.items.length == 0) {
                    var li = document.createElement('li');
                    li.classList.add('output-items');
                    li.innerHTML =  '<p>There are no items matching.</p>';
                    ul.appendChild(li);
                 }
                $.each(data.items, function(i, val) {
                    var li = document.createElement('li');
                    li.classList.add('output-items');
                    li.innerHTML = '№'+ (i+1) + ': ' +'<a href="'+val.link+'" target="_blank">'+val.title+ '</br>'+"</a>"+val.snippet;
                    ul.appendChild(li);
                });
                $('#out-results').html(ul);
            },
            error: function(data, textStatus) {
                console.log('Error: ', data);
            }
        });
        return false;
    });
});
function Human() {
	this.name = 'Alex';
	this.age = 20;
	this.sex = 'male';
	this.height = 180;
	this.weight = 80;
};

Worker.prototype = new Human();
Student.prototype = new Human();

function Worker() {
	this.job = 'chief accountant';
	this.salary = 1000;
	this.work = function() {
		console.log('Wake up!');
	};
};

function Student() {
	this.university = 'DNTU';
	this.grants = 500;
	this.hobby = function() {
		console.log('Whatch TV');
	};
};
var worker1 = new Worker();
var worker2 = new Worker();
var worker3 = new Worker();

var student1 = new Student();
var student2 = new Student();
var student3 = new Student();

console.log(worker1, worker2, worker3);
console.log(student1, student2, student3);

console.log(worker1.name, worker1.age);
console.log(worker2.height, worker2.weight);
console.log(worker3.sex, worker3.name);

console.log(student1.name, student1.university);
console.log(student2.age, student2.age);
console.log(student3.grants, student3.sex);
$(function() {
  worker2.work();
  student3.hobby();
})
