function toggleAddNutrReqs() {
  $('#add-nutr-reqs').toggle();
  if ($('#add-nutr-reqs').is(':hidden')) {
    $('#add-nutr-reqs-link').text('More options');
  } else {
    $('#add-nutr-reqs-link').text('Less options');
  }
}

function toggleNutrOptions(element) {
  if (element.is('.active')) {
    element.removeClass('active');
  } else {
    element.addClass('active');
  }
}

$(document).ready( function() {
     $('#add-nutr-reqs-link').click(function() {
       toggleAddNutrReqs();
     });
     $('.generator-options-item').click(function() {
       toggleNutrOptions($(this));
     });
 });
