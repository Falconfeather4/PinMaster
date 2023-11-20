function openPopup() {
  let popupWindow;
  popupWindow = window.open('', '_blank', 'width=400,height=300');
  var $elem = $(popupWindow.document.body);
  var $selected = $(element);
  $elem.append($selected.clone());
  let inputs = popupWindow.document.querySelectorAll('input');
  addCheckFunctionality(inputs);
}

function addTextFunctionality(inputs) {
  inputs.forEach((input) => {
    input.addEventListener('input', (e) => handleTextChange(e, input));
  });
}

function handleTextChange(e, input) {
  let element = document.getElementById(input.id);
  value = e.target.value;
  element.setAttribute('value', value);
}

function addCheckFunctionality(inputs) {
  inputs.forEach((input) => {
    input.addEventListener('click', (e) => handleCheckChange(e, input));
  });
}

function handleCheckChange(e, input) {
  let element = document.getElementById(input.id);
  element.checked = true;
}
