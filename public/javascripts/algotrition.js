function updateNutrOption(i, obj) {
  const id = $(obj).attr('id');
  const inputId = id.slice(0, -7);
  const inputIdTag = `#${inputId}`;
  if ($(obj).is('.active')) {
    $(inputIdTag).show();
  } else {
    $(inputIdTag).hide();
  }
}

function updateNutrOptions() {
  $('.generator-options-item').each(updateNutrOption);
}

function toggleNutrOptions() {
  if ($(this).is('.active')) {
    $(this).removeClass('active');
  } else {
    $(this).addClass('active');
  }
}

function main() {
  $('.generator-options-item').click(toggleNutrOptions);
  $('#generator-button-next').click(updateNutrOptions);
}

$(document).ready(main);
