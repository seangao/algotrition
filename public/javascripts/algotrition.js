function toggleAddNutrReqs() {
  $('#add-nutr-reqs').toggle();
  if ($('#add-nutr-reqs').is(':hidden')) {
    $('#add-nutr-reqs-link').text('More options');
  } else {
    $('#add-nutr-reqs-link').text('Less options');
  }
}

$(document).ready( function() {
     $('#add-nutr-reqs-link').click(function() {
       toggleAddNutrReqs();
     });
 });
