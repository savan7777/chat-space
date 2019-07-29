  $(document).on('turbolinks:load', function(){
     function buildHTML(message){
        var imagehtml = message.image == null ? "" : `<img src="${message.image}" class="lower-message__image">`;
        var html = `<div class="message" data-message-id=${message.id}>
                      <div class="upper-message">
                        <div class="upper-message-name">
                        ${message.user_name}
                        </div>
                        <div class="mupper-message-date">
                        ${message.created_at}
                        </div>
                      </div>
                      <div class="lower-message">
                        <p class="upper-message-text">
                        ${message.content}
                        </p>
                        ${imagehtml}
                      </div>
                    </div> `
        return html;
      }

    $('#new_message').on('submit', function(e) {
      e.preventDefault();
      var formData = new FormData(this);
      var href = window.location.href;

      $.ajax({
        url: href,
        type: "POST",
        data: formData,
        dataType: 'json',
        contentType: false,
        processData: false,
      })
      .done(function(message){
        var html = buildHTML(message);
      $('.messages').append(html);
      $('.submit-btn').prop('disabled', false);
      $(".messages").animate({scrollTop: $(".messages")[0].scrollHeight},'fast');
      $("#new_message").get(0).reset();
    })
      .fail(function() {
        alert('メッセージを入力してください');
      })
    });

    $(function(){
      setInterval(reloadMessages, 5000);
      });
    function reloadMessages() {
      if (window.location.href.match(/\/groups\/\d+\/messages/)) {
      var last_message_id = $('.message:last').data("message-id");
      $.ajax({
        url: 'api/messages',
        type: 'get',
        dataType: 'json',
        data: {last_id: last_message_id}
      })

      .done(function(messages) {
      var inserthtml = '';
        messages.forEach(function(message){
          inserthtml =  buildHTML(message);
          $('.messages').append(inserthtml);
      })
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      })
      .fail(function() {
        alert('error');
      })
    } else {
      clearInterval(reloadMessages);
    }
  };
});

