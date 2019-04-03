function updateNutrOption(i, obj) {
  const id = $(obj).attr('id');
  const inputId = id.slice(0, -7);
  const inputIdTag = `#${inputId}`;
  if ($(obj).is('.active')) {
    $(inputIdTag).show();
    $(inputIdTag + ' :input').attr('disabled', false);
  } else {
    $(inputIdTag).hide();
    $(inputIdTag + ' :input').attr('disabled', true);
  }
}

function updateNutrOptions() {
  $('.generator-options-item').each(updateNutrOption);
}

function toggleDropdownButton() {
  if ($(this).is('.active')) {
    $(this).removeClass('active');
  } else {
    $(this).addClass('active');
  }
}

function clearDropdownButton(i, obj) {
  if ($(obj).is('.active')) {
    $(obj).removeClass('active');
  }
}

function selectOptimizerButton() {
  $('.generator-optimizer-item').each(clearDropdownButton);
  $(this).addClass('active');
}

function updateOptimizeId() {
  const id = $('.generator-optimizer-item.active')
    .attr('id')
    .slice('optimize-'.length);
  $('#optimize-id').val(id);
}

function addIngredient() {
  const input = $('#ingredient-input').val();
  $('#ingredient-input').val('');
  const markup = '<li class="list-group-item"><button type="button" class="close remove-ingredient" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + input +'</li>';
  $('#ingredient-list').append(markup);
  $('.remove-ingredient').click(removeIngredient);
}

function removeIngredient() {
  $(this).parent().remove();
}

function setUpEnterKey(event) {
  if (event.key == "Enter") {
    if ($("#ingredient-input:focus")) {
      $('#add-ingredient').trigger("click");
    }
  }
}

function main() {
  $('.generator-options-item').click(toggleDropdownButton);
  $('.generator-optimizer-item').click(selectOptimizerButton);
  $('#generator-nutr-button').click(updateNutrOptions);
  $('#generator-opt-button').click(updateOptimizeId);
  $('#add-ingredient').click(addIngredient);
  $('#ingredient-input').on('keyup', setUpEnterKey);
}

function renderImage() {
  windowWidth = $(window).width();
  if (windowWidth < 479) {
    $('#header_logo').attr('src', 'http://rocomenty.com/wp-content/uploads/2019/02/algo_logo_mobile.png');
  } else if (windowWidth < 767) {
    $('#header_logo').attr('src', 'http://rocomenty.com/wp-content/uploads/2019/02/algo_logo_mid.png');
  } else {
    $('#header_logo').attr('src', 'http://rocomenty.com/wp-content/uploads/2019/02/algo_logo_large.png');
  }
}

$(window).on('load', renderImage);
$(document).ready(main);
