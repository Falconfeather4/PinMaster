function getHighlightedText() {
  return window.getSelection().toString();
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message === 'get_highlighted_text') {
    text = getHighlightedText();
    console.log(text);
    sendResponse({ message: text });
  }
});
