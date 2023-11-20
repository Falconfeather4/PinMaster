chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message === 'open_dom') {
    document.body.addEventListener('click', (e) => {
      const element = e.target;
      console.log(element);
    });
  }
});
