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

function updateNutrOptions() {
  $('.generator-options-item').each(function(i, obj) {
    obj = $(obj);
    var id = obj.attr('id');
    var input_id = id.slice(0, -7);
    if (obj.is('.active')) {
      $('#' + input_id).show();
    } else {
      $('#' + input_id).hide();
    }
  });
}

$(document).ready( function() {
     $('#add-nutr-reqs-link').click(function() {
       toggleAddNutrReqs();
     });
     $('#generator-button-next').click(function() {
       updateNutrOptions();
     });
     $('.generator-options-item').click(function() {
       toggleNutrOptions($(this));
     });
 });
