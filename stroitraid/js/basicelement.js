jQuery(document).ready(function(){
    var $ = jQuery.noConflict();
    $('.parallax-section').parallax({
      'elements': [
        {
          'selector': 'div.parallax-block',
          'properties': {
            'x': {
              'background-position-x': {
                'initial': 50,
                'multiplier': 0.03,
                'unit': '%',

              }
            }
          }
        },
        {
     'selector': 'div.parallax-block__outer',
     'properties': {
       'x': {
         'background-position-x': {
           'initial': 50,
           'multiplier': 0.01,
           'unit': '%'
         }
       }
     }
   }
      ]
    });
});
