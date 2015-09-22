Promise.all([
  InboxSDK.load('1.0', 'sdk_mlazzje-dlgmail_43a7d41655')
])
.then(function(results){
  var sdk = results[0];

  var registerHandler = function() {
    sdk.Conversations.registerMessageViewHandler(messageViewHandler);
  };

  var messageViewHandler = function(messageView) {
    if(messageView.isLoaded()) { 
      // Add CustomAttachmentsToolbarButton to the given message view.
      addCustomAttachmentsToolbarButton(messageView);
    }
  };

  var addCustomAttachmentsToolbarButton = function(messageView) {
    var options = {
      tooltip: 'Download all',
      iconUrl: 'https://cdn1.iconfinder.com/data/icons/anchor/128/download.png',
      onClick: handleAttachmentsButtonClick
    };

    messageView.addAttachmentsToolbarButton(options);
  };

  var handleAttachmentsButtonClick = function(event) {
    var downloadUrls = [];

    // Iterate over attachmentCardViews array to get URL's.
    event.forEach(function(attachmentCardView, index) {
      var currentElement = attachmentCardView.getElement();

      if(typeof currentElement !== 'undefined') {
        var downloadUrl = currentElement.getAttribute('download_url');

        if(downloadUrl) {
          var striped = stripUrl(downloadUrl);
          
          if(striped) {
            downloadUrls.push(downloadUrl);
          }
        }
      }
    });

    // Download
    processMultipleFilesDownload(downloadUrls, 1000);
  }

  // Run.
  registerHandler();
});

/**
 * Promisify a Ajax HTTP call.
 * @param  {string} url     The url to call
 * @param  {Objet} params   Options
 * @param  {Object} headers
 * @return {Promise}        A resolved promise
 */
function get(url, params, headers) {
  return Promise.resolve(
    $.ajax({
      url: url,
      type: 'GET',
      crossDomain: true,
      dataType: 'jsonp',
      data: params,
      headers: headers
    })
  );
}

/**
 * Run multiple files download
 * @param  {Array} urls     Array of urls (pointing to files)
 * @param  {Integer} duration time between each HTTP call
 */
function processMultipleFilesDownload(urls, duration) {
  setTimeout(function() {
    for(var i = 0; i < urls.length; i++) {
      window.open(urls[i]);
    }
  }, duration);
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
