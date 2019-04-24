/**
 * Toggle nutritional requirement visibility.
 * @param {integer} i - index
 * @param {object} obj - selected object
 */
function updateNutrOption(i, obj) {
  const id = $(obj).attr('id');
  const inputId = id.slice(0, -7);
  const inputIdTag = `#${inputId}`;
  if ($(obj).is('.active')) {
    $(inputIdTag).show();
    $(`${inputIdTag} :input`).attr('disabled', false);
  } else {
    $(inputIdTag).hide();
    $(`${inputIdTag} :input`).attr('disabled', true);
  }
}

/** Display selected nutritional requirements. */
function updateNutrOptions() {
  $('.generator-options-item').each(updateNutrOption);
}

/** Toggle dropdown button selected. */
function toggleDropdownButton() {
  if ($(this).is('.active')) {
    $(this).removeClass('active');
  } else {
    $(this).addClass('active');
  }
}

/** Clear dropdown button if selected. */
function clearDropdownButton(i, obj) {
  if ($(obj).is('.active')) {
    $(obj).removeClass('active');
  }
}

/** Display optimize option as selected. */
function selectOptimizerButton() {
  $('.generator-optimizer-item').each(clearDropdownButton);
  $(this).addClass('active');
}

/** Update form optimize id. */
function updateOptimizeId() {
  const id = $('.generator-optimizer-item.active')
    .attr('id')
    .slice('optimize-'.length);
  $('#optimize-id').val(id);
}

/** Remove selected ingredient. */
function removeIngredient() {
  $(this).parent().remove();
}

/** Add ingredient. */
function addIngredient() {
  const input = $('#ingredient-input').val();
  if (!input) {
    alert('Error: Ingredient is empty!');
    return;
  }
  $('#ingredient-input').val('');
  const markup = `<li class="list-group-item"><input type='hidden' name='ingredients[]' value='${input}' form='add-recipe-form'/><button type="button" class="close remove-ingredient" aria-label="Close"><span aria-hidden="true">&times;</span></button>${input}</li>`;
  $('#ingredient-list').append(markup);
  $('.remove-ingredient').click(removeIngredient);
}

/** Remove all recipe input values. */
function clearRecipeInputs() {
  $('#title').val('');
  $('#ingredient-list').empty();
  $('#instruction').val('');
}

/** Check if add recipe form inputs are valid. */
function checkInputs() {
  const title = $('#title').val();
  const has_ingredients = $('ul#ingredient-list li').length >= 1;
  const instruction = $('#instruction').val();

  if (title === '' || !has_ingredients || instruction === '') {
    alert('Error: one of the inputs is empty');
    return false;
  }
}

/** Check if edit profile inputs are valid. */
function checkEditProfileInputs() {
  let valid = true;
  $('.edit-profile-input').each(function () {
    if (!$(this).val()) {
      alert('Error: inputs cannot be empty');
      valid = false;
      return false;
    }
  });
  return valid;
}

/** Check if meal plan generator inputs are valid. */
function checkGeneratorInputs() {
  let valid = true;
  $('#generator-form input').each(function () {
    $(this).removeClass('is-invalid');
    if (!$(this).val()) {
      $(this).addClass('is-invalid');
      valid = false;
    }
  });
  return valid;
}

/** Main function to load on document ready. */
function main() {
  $('.generator-options-item').click(toggleDropdownButton);
  $('.generator-optimizer-item').click(selectOptimizerButton);
  $('#generator-nutr-button').click(updateNutrOptions);
  $('#generator-opt-button').click(updateOptimizeId);
  $('#add-ingredient').click(addIngredient);
  $('#cancel-recipe-input').click(clearRecipeInputs);
  $('#add-recipe-form').submit(checkInputs);
  $('#edit-profile-form').submit(checkEditProfileInputs);
  $('#generator-form').submit(checkGeneratorInputs);
}

/** Render header image. */
function renderImage() {
  const windowWidth = $(window).width();
  $('.header_bar').css('background-image', 'url(../images/header_background.jpg)');
  if (windowWidth < 479) {
    $('#header_logo').attr('src', '../images/algo_logo_mobile.png');
  } else if (windowWidth < 767) {
    $('#header_logo').attr('src', '../images/algo_logo_mid.png');
  } else {
    $('#header_logo').attr('src', '../images/algo_logo_large.png');
  }
}

$(window).on('load', renderImage);
$(document).ready(main);
