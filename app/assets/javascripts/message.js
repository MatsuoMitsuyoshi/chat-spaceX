$(function() {
  function buildHTML(message) {
    var image = (message.image) ? `<img src = ${message.image}>` : "";
    var html = `<div class='message' data-message-id="${message.id}">
                  <div class='upper-message'>
                    <div class='upper-message__user-name'>
                      ${message.name}
                    </div>
                    <div class='upper-message__date'>
                      ${message.date}
                    </div>
                  </div>
                  <div class='lower-message'>
                    <p class='lower-message__content'>
                      ${message.content}
                    </p>
                      ${image}
                  </div>
                </div>
               </div>`
    return html;
  }

  //メッセージ送信 非同期通信化
  $('.chat-message-form').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData($(this).get(0));
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      var html = buildHTML(data);
      $('.messages').append(html).animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      $('#message_content').val('');
      $('#message_image').val('');
    })
    .fail(function() {
      alert('error');
    })
     return false;
  })

  //自動更新機能
  setInterval(function(){
   if (location.href.match(/\/groups\/\d+\/messages/)){
     var message_id = $('.message').last().data('message-id')
     $.ajax({
       type: 'GET',
       url: location.href,
       data: {id: message_id},
       dataType: 'json'
     })
     .done(function(messages){
       messages.forEach(function(message){
         if (message.id > message_id) {
           var html = buildHTML(message);
           $('.messages').append(html);
         }
       })
     })
     .fail(function(message){
       alert("自動更新に失敗しました");
     })
   }
 }, 5000);
});


