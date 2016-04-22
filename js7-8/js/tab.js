$(function() {
  var $firstName = $('#first-name');
  var $lastName = $('#last-name');
  var $address = $('#address');

  var $buttonShow = $('#button-show-help');

  $(function () {
    $('dl.menu-tab').on('click', 'dt', function () {
      $(this).addClass('tab-visited').siblings().removeClass('tab-visited');
    }).children('dd').each(function () {
      $(this).wrapInner('<div class="tab-content"></div>');
    });
  });

  //*********************

  $firstName.mouseover(function() {
    $('#tooltips_firstname').stop().fadeTo('slow', 1);
  })
  .mouseleave(function() {
    $('#tooltips_firstname').stop().fadeTo('slow', 0);
  });

    $lastName.mouseover(function() {
    $('#tooltips_lastname').stop().fadeTo('slow', 1);
  })
  .mouseleave(function() {
    $('#tooltips_lastname').stop().fadeTo('slow', 0);
  });

  $address.mouseover(function() {
    $('#tooltips_address').stop().fadeTo('slow', 1);
  })
  .mouseleave(function() {
    $('#tooltips_address').stop().fadeTo('slow', 0);
  });

  $buttonShow.on('click', function() {
    $('#tooltips_firstname').fadeTo('slow', 1);
    $('#tooltips_lastname').fadeTo('slow', 1);
    $('#tooltips_address').fadeTo('slow', 1);
  });

  $buttonShow.mouseleave(function() {
    $('#tooltips_firstname').fadeOut(2000);
    $('#tooltips_lastname').fadeOut(2000);
    $('#tooltips_address').fadeOut(2000);
  });

});
