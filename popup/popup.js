console.log('running');

chrome.runtime.onMessage.addListener((request) => {
  console.log('received', request);
  if (request === 'highlighted_text_button') {
    openPopup();
  } else {
    openDOMOutline();
  }
});

function makePopup() {
  const popup = document.implementation.createHTMLDocument('popup');
  const div = popup.createElement('div');
  div.setAttribute('id', 'end');
  popup.body.appendChild(div);
  return popup;
}

function addHighlightedText(doc, text) {
  const end = doc.getElementById('end');
  const highlightedText = window.getSelection();

  if (highlightedText.rangeCount > 0) {
    const range = highlightedText.getRangeAt(0);
    const selectedText = highlightedText.toString();

    const tempDiv = doc.createElement('div');
    tempDiv.appendChild(range.cloneContents());

    let mostRecentTag = range.commonAncestorContainer;
    while (mostRecentTag.nodeType !== Node.ELEMENT_NODE) {
      mostRecentTag = mostRecentTag.parentNode;
    }

    const actualDiv = doc.createElement(mostRecentTag.tagName.toLowerCase());
    actualDiv.innerHTML = tempDiv.innerHTML;

    doc.body.insertBefore(actualDiv, end);
  }
}

async function openPopupNoElement() {
  // Query for the active tab
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  // Send a message to the content script
  let response = null;
  while (!response || response.message === '') {
    response = await chrome.tabs.sendMessage(tab.id, 'get_highlighted_text');
    // console.log(response.message);
  }
  console.log('Received response from content script:', response.message);
  let popupWindow;
  const popup = makePopup();
  addHighlightedText(popup, response.message);
  popupWindow = window.open('', '_blank', 'width=400,height=300');
  popupWindow.document.write(popup.documentElement.outerHTML);
}

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

async function openDOMOutline() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  // Send a message to the content script
  const response = await chrome.tabs.sendMessage(tab.id, 'open_dom');
  // console.log(response.message);
  let popupWindow;
  const popup = makePopup();
  // addHighlightedText(popup, response.message);
  popupWindow = window.open('', '_blank', 'width=400,height=300');
  // popupWindow.document.write(popup.documentElement.outerHTML);
}

document
  .getElementById('highlighted_text_button')
  .addEventListener('click', openPopupNoElement);

document
  .getElementById('input_button')
  .addEventListener('click', openDOMOutline);

document
  .getElementById('multi_select_button')
  .addEventListener('click', openDOMOutline);

document
  .getElementById('single_select_button')
  .addEventListener('click', openDOMOutline);
