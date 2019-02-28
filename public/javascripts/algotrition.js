function toggleAddNutrReqs() {
  console.log('click');
  if ($('#add-nutr-reqs').css('display') == 'block') {
    $('#add-nutr-reqs').css('display', 'none');
  } else {
    $('#add-nutr-reqs').css('display', 'block');
  }
}

$(document).ready( function() {
     $('#add-nutr-reqs-link').click(function() {
       $('#add-nutr-reqs').toggle();
       if ($('#add-nutr-reqs').is(':hidden')) {
         $('#add-nutr-reqs-link').text('More options');
       } else {
         $('#add-nutr-reqs-link').text('Less options');
       }
     });
 });
