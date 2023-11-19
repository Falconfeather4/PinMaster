function makePopup() {
  const popup = document.implementation.createHTMLDocument('popup');
  const div = popup.createElement('div');
  div.setAttribute('id', 'end');
  popup.body.appendChild(div);
  return popup;
}

function openPopup() {
  const popup = makePopup();
  addHighlightedText(popup);
  const popupWindow = window.open('', '_blank', 'width=400,height=300');
  popupWindow.document.write(popup.documentElement.outerHTML);
  popupWindow.document.close();
}

function addHighlightedText(doc) {
  const end = doc.getElementById('end');
  const highlightedText = window.getSelection().toString();
  const newDiv = doc.createElement('div');
  const newContent = doc.createTextNode(highlightedText);
  newDiv.appendChild(newContent);
  doc.body.insertBefore(newDiv, end);
}


// document.addEventListener('DOMContentLoaded', function () {
//   addHighlightedText();
//   addHighlightedText();
// });

function copyText() {
  var selection = window.getSelection();
  var selectedText = selection.toString();
  
  if (selectedText) {
    var range = selection.getRangeAt(0);
    var clonedContent = range.cloneContents();

    // Convert selected content to HTML string
    var tempDiv = document.createElement('div');
    tempDiv.appendChild(clonedContent);
    var selectedHTML = tempDiv.innerHTML;

    // Open a new window with destination.html and pass selected content as a query parameter
    var destinationWindow = window.open('popup.html?content=' + encodeURIComponent(selectedHTML), '_blank');
    if (destinationWindow) {
      destinationWindow.focus();
    } else {
      alert('Please allow pop-ups to copy the text.');
    }
  }
}

// Extract content from query parameter in destination.html
function pasteContent() {
  const urlParams = new URLSearchParams(window.location.search);
  const contentToPaste = urlParams.get('content');

  // Paste content into destination div
  if (contentToPaste) {
    var destinationDiv = document.querySelector('.destination');
    destinationDiv.innerHTML = decodeURIComponent(contentToPaste);
  }
}

