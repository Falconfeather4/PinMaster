function getHighlightedText() {
  return window.getSelection().toString();
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  text = getHighlightedText();
  console.log(text);
  if (message === 'get_highlighted_text') {
    sendResponse(text);
  }
});
