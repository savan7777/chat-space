$(document).on('turbolinks:load', function() {

$(function(){

  function buildMessage(message){

    var img = message.image.url !== null ? `<img src="${message.image.url}">` : ""

    var html = `<div class="message" data-id="${message.id}">
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${ message.user_name }
                    </div>
                    <div class="upper-message__date">
                      ${ message.created_at }
                    </div>
                  </div>
                  <div class="lower-message">
                    <p class="lower-message__content">
                      ${ message.content }
                    </p>
                    ${ img }
                  </div>
                </div>`
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(message){
      var html = buildMessage(message);
      $('.messages').append(html)
      $('form')[0].reset();
      $('.submit-btn').prop('disabled', false);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
    })

    .fail(function(){
      alert('エラー:メッセージを送信してください');
    })
  })

  $(function() {
  var reloadMessages = function() {
    var last_message_id = $('.message').last().data('id');
    
    var href = 'api/messages'
    $.ajax({
    url: href,
    type: 'GET',
    dataType: 'json',
    data: {id: last_message_id}
    })

    .done(function(messages){
      var insertHTML
      if (messages !== null) {
        messages.forEach(function(message){
          insertHTML = buildMessage(message)
          $('.messages').append(insertHTML)
        });
      }

      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    })

    .fail(function(){
      console.log('error');
    });
  };
  setInterval(reloadMessages, 5000);
  });
});

});