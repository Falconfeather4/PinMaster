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
  const highlightedText = window.getSelection();

  if (highlightedText.rangeCount > 0) {
    const range = highlightedText.getRangeAt(0);
    const selectedText = highlightedText.toString();

    const tempDiv = doc.createElement('div');
    tempDiv.appendChild(range.cloneContents());

    let mostRecentTag = range.commonAncestorContainer;
    while(mostRecentTag.nodeType !== Node.ELEMENT_NODE) {
      mostRecentTag = mostRecentTag.parentNode;
    }

    const actualDiv = doc.createElement(mostRecentTag.tagName.toLowerCase());
    actualDiv.innerHTML = tempDiv.innerHTML;
    
    doc.body.insertBefore(actualDiv, end);
  }
}


// document.addEventListener('DOMContentLoaded', function () {
//   addHighlightedText();
//   addHighlightedText();
// });
