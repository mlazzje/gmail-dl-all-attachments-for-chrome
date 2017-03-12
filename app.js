Promise.all([
  InboxSDK.load('1.0', 'sdk_mlazzje-dlgmail_43a7d41655')
])
.then(function(results){
  var service = analytics.getService('better_download_all_attachments_app');
  var tracker = service.getTracker('UA-67984409-1');
  var sdk = results[0];
  
  var registerHandlers = function() {
    sdk.Conversations.registerMessageViewHandler(messageViewHandler);
    sdk.Conversations.registerThreadViewHandler(threadViewHandler);

    var properties = {
      title: chrome.i18n.getMessage('tooltip'),
      iconUrl: chrome.runtime.getURL('img/save_toolbar.png'),
      section: "OTHER",
      onClick: handleToolbarButtonClick
    }

    sdk.Toolbars.registerToolbarButtonForThreadView(properties);
  };

  var threadViewHandler = function(threadRowView) {
    // Send to Analytics that the threadView has been loaded
    tracker.sendAppView('ThreadView');
  }

  var handleToolbarButtonClick = function(event) {

    var messages = event.threadView.getMessageViewsAll();
    var numberFiles = 0;

    for(var i = 0; i < messages.length ; i++) {
      var fileAttachmentsCardView = messages[i].getFileAttachmentCardViews();
      fileAttachmentsCardView.forEach(handleAttachmentsDownload);
      numberFiles += fileAttachmentsCardView.length;
    }

    console.log(numberFiles);
    // Send to Analytics that the Button has been clicked
    tracker.sendEvent('Button', 'DownloadAllAttachments', 'Conversation', numberFiles);
  }

  var messageViewHandler = function(messageView) {
    if(messageView.isLoaded()) {
      // Add CustomAttachmentsToolbarButton to the given message view.
      addCustomAttachmentsToolbarButton(messageView);
      // Send to Analytics that the Message View has been loaded
      tracker.sendAppView('MessageView');
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
    var fileAttachmentsCardView = event.attachmentCardViews;

    console.log(fileAttachmentsCardView.length);

    // Send to Analytics that the Button has been clicked
    tracker.sendEvent('Button', 'DownloadAllAttachments', 'Message', fileAttachmentsCardView.length);
    // Iterate over attachmentCardViews array to get URL's.
    fileAttachmentsCardView.forEach(handleAttachmentsDownload);
  }

  var handleAttachmentsDownload = function(attachmentCardView, index) {
    if(typeof attachmentCardView !== 'undefined') {
        // Download the attachment
        attachmentCardView.getDownloadURL().then(downloadAttachment);
      }
  }

  // Run.
  registerHandlers();
});
