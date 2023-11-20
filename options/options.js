// Function to log a message when a button is clicked

let buttons = document.querySelectorAll('.custom-button');

buttons.forEach((button) => {
  button.addEventListener('click', (e) => handleButtonClick(e));
})

function handleButtonClick(e) {
  const buttonId = e.target.id;

  switch(buttonId) {
    case 'highlightedButton':
      // code block
      break;
    case 'inputButton':
      // code block
      break;
    case 'singleSelectButton':
      // code block
      break;
    case 'multiSelectButton':
      // code block
      break;
    default:
      // code block
  }
  // console.log(`Button with ID "${buttonId}" clicked!`);
}
