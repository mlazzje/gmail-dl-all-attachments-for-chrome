/**
 * Run multiple files download
 * @param  {Array} urls  Array of urls (pointing to files)
 * @param  {Integer} duration time between each HTTP call
 */
function processMultipleFilesDownload(urls, duration) { // Not used anymore
  for(var i = 0; i < urls.length; i++) {
    setTimeout(
      (function(url) {
        downloadAttachment(urls[i]);
    })(urls[i]), duration);
  }
}


/**
 * Run attachment download
 * @param  {string} url    Url to download the attachment
 */
function downloadAttachment(url) {

  var stripped = stripUrl(url);

  if(stripped) {

    var a = document.createElement('a');
    a.href = stripped;

    var dispatchMouseEvent = function(type) {
      var event = new MouseEvent(type, {
        bubbles: true,
        cancelable: true,
        view : window,
        detail: 0,
        screenX: 0,
        screenY: 0,
        clientX: 0,
        clientY: 0,
        ctrlKey: true,
        shiftKey: false,
        altKey : false,
        metaKey: false,
        button: 0,
        relatedTarget: null
      });

      dispatchEvent(a, event, type);
    }

    // Trigger
    dispatchMouseEvent('click');
    dispatchMouseEvent('mousedown');
    dispatchMouseEvent('mouseenter');
  }
}

/**
 * Parse a string containing a url
 * @param  {string} Url Surrounded url
 * @return {string} The url extracted from the given string
 */
function stripUrl(url) {
  var re = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;

  // Return the full url
  return re.exec(url)[0];
}

function dispatchEvent (element, event, type) {
  if (element.dispatchEvent) {
    element.dispatchEvent(event);
  } else if (element.fireEvent) {
    element.fireEvent('on' + event.eventType, event);
  }
}
