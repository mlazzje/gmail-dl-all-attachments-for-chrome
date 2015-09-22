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
      console.log(messageView);
      // Add CustomAttachmentsToolbarButton to the given message view.
      addCustomAttachmentsToolbarButton(messageView);
    }
  };

  var addCustomAttachmentsToolbarButton = function(messageView) {
    var options = {
      tooltip: 'Download all',
      iconUrl: './img/save.png' ,
      onClick: handleAttachmentsButtonClick
    };

    messageView.addAttachmentsToolbarButton(options);
  };

  var handleAttachmentsButtonClick = function(event) {
    if(!event) {
      return;
    }

    // Iterate over attachmentCardViews array to get URL's.
    event.forEach(function(attachmentCardView, index) {
      var currentElement = attachmentCardView.getElement();
      
      if(typeof currentElement !== 'undefined') {
        var downloadUrl = currentElement.getAttribute('download_url');
        //get(stripUrl(downloadUrl));
        window.open(downloadUrl, '_self');
      }
    });
  }

  // Run.
  registerHandler();
});

/**
 * Promisify a Ajax HTTP call.
 * @param  {string} url     the url to call
 * @param  {Objet} params   options
 * @param  {Object} headers
 * @return {Promise}        a resolved promise
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
 * Parse a string containing a url
 * @param  {string} url Surrounded url
 * @return {string} the url extracted from the given string
 */
function stripUrl(url) {
  var re = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;

  // Return the full url
  return re.exec(url)[0];
}
