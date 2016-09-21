
$(function() {
	$('.carousel').carousel({backgroubdColor:'transparent'});
	search_button();
	search('default');
});

function search_button() {
	$('#submit').click(function(e) {
		e.preventDefault();
		search(encodeURIComponent($('#search_query').val()));
	});
}

function mansory_build(data) {
    $('.item').each(function(i) {
        $(this).css('backgroundImage', 'url('+_.map(data.hits, 'webformatURL')[i]+')');
        console.log('i', i);
       $('.item__text:nth-child('+i+')').html(data.hits[i].tags.split(',')[0]);
	});
}
function search(query) {
	var q = (query === "default") ? 'Hello' : query
	var API_KEY = '2612184-7d3c53808f49251d4c3b415f2';
    var URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+q;
		console.log(q);
	 $.getJSON(URL, function(data) {
		    if (parseInt(data.totalHits) > 0)
		    {
				mansory_build(data);
		    }
		    else
		        console.log('Not found results!');
	});
}
