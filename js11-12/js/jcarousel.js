$(function() {
    var leftUIEl = $('.carousel-arrow-left');
    var rightUIEl = $('.carousel-arrow-right');
    var elementsList = $('.carousel-list');

    var pixelsOffset = 125;
    var currentLeftValue = 0;
    var elementsCount = elementsList.find('li').length;
    var minimumOffset = - ((elementsCount - 5) * pixelsOffset);
    var maximumOffset = 0;

    leftUIEl.click(function() {
        if (currentLeftValue != maximumOffset) {
            currentLeftValue += 125;
            elementsList.animate({ left : currentLeftValue + "px"}, 500);
        }
    });

    rightUIEl.click(function() {
        if (currentLeftValue != minimumOffset) {
            currentLeftValue -= 125;
            elementsList.animate({ left : currentLeftValue + "px"}, 500);
        }
    });

    // Template

    var html = $('#output-info').html();
	  var info = [
    		{
        		header: 'Зеленюк Оксана Сергеевна',
        		img: 'img/foto.jpg',
        		content: 'Системный администратор'
      	},

    		{
    		    content: 'Хочу учить Front-end, потому что:<br><br> - Это интересно <br> - Я творческая личность <br> - Ищу достойную работу'
    		},

    		{
        		content: 'Мой контактный телефон <br> +380997922715 <br><br> Мой профиль в Facebook <br> <a href="http://www.facebook.com/OksanaZelenuk" target="_blank">www.facebook.com</a>'
    		},

    		{
    		    content: 'Мой фидбек:<br> Если нужно, могу настроить Вам сервер'
    		}
    	];

  	var content = tmpl(html, {
  		data: info
  	});

  	$('body').append(content);

    $('.line:last-child').remove();
});
