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