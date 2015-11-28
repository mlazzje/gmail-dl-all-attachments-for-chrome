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
      tooltip: chrome.i18n.getMessage('tooltip'),
      iconUrl: chrome.runtime.getURL('img/save.png'),
      onClick: handleAttachmentsButtonClick
    };

    messageView.addAttachmentsToolbarButton(options);
  };

  var handleAttachmentsButtonClick = function(event) {
    var downloadUrls = [];

    // Iterate over attachmentCardViews array to get URL's.
    event.attachmentCardViews.forEach(function(attachmentCardView, index) {

      var currentElement = attachmentCardView;

      if(typeof currentElement !== 'undefined') {
        // Download the attachment
        currentElement.getDownloadURL().then(downloadAttachment);
      }
    });
  }

  // Run.
  registerHandler();
});
