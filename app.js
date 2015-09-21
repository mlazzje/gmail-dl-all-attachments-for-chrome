InboxSDK.load('1.0', 'sdk_mlazzje-dlgmail_43a7d41655').then(function(sdk){

  var register_handler, message_view_handler, add_custom_attachment_card;

  // the SDK has been loaded, now do something with it!
  /*sdk.Compose.registerComposeViewHandler(function(composeView){

    // a compose view has come into existence, do something with it!
    composeView.addButton({
      title: "My Nifty Button!",
      iconUrl: 'https://www.google.fr/imgres?imgurl=http%3A%2F%2Ffiles.softicons.com%2Fdownload%2Fgame-icons%2Fsuper-mario-icons-by-sandro-pereira%2Fico%2FMushroom%252520-%2525201UP.ico&imgrefurl=http%3A%2F%2Fwww.softicons.com%2Fgame-icons%2Fsuper-mario-icons-by-sandro-pereira&h=256&w=256&tbnid=CqD3Tq2CC7Ra2M%3A&docid=Adso2vBTvjVmZM&ei=BlQAVoWnI4b6atGAt6AN&tbm=isch&client=ubuntu&iact=rc&uact=3&dur=515&page=1&start=0&ndsp=38&ved=0CDkQrQMwAWoVChMIhcKFkeiIyAIVBr0aCh1RwA3U',
      onClick: function(event) {
        event.composeView.insertTextIntoBodyAtCursor('Hello World!');
      },
    });

  });*/
  register_handler = function() {
    sdk.Conversations.registerMessageViewHandler(message_view_handler);
  };

  message_view_handler = function(message_view) {
      console.log('lol');
      add_custom_attachment_card(message_view);

  };

  add_custom_attachment_card = function(message_view) {
    var params;
    params = {
      title: "Download all",
      fileIconImageUrl: chrome.runtime.getURL('img/save.png'),
      foldColor: "#ffffff",
      description: "Download all without archive it!"
    };
  message_view.addAttachmentCardViewNoPreview(params);
};

  register_handler();

});
