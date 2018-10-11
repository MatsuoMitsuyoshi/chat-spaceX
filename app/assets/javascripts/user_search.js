$(document).on('turbolinks:load', function() {

  var search_list = $(".user-search-result");
//インクリメンタルサーチ 対象ユーザーリスト表示
  function appendUser(user) {
    var html = `<div class='chat-group-user clearfix' id='chat-group-user-${user.id}'>
                  <p class='chat-group-user__name'>${user.name}</p>
                    <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                </div>`
    search_list.append(html);
  };

//インクリメンタルサーチ 対象ユーザーなし
  function appendNoUser(user) {
    var html = ``
    search_list.append(html);
  };

//チャットメンバー リスト追加
  function buildHTML(id, name) {
    var html = `<div class="chat-group-user clearfix" id=chat-group-user-${id}>
                  <input type="hidden" name="group[user_ids][]" value="${id}">
                  <p class="chat-group-user__name">${name}</p>
                  <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove" data-user-id="${id}">削除</a>
                </div>`
    return html
  }

//インクリメンタルサーチ 入力ごとにイベント発火
  $(".chat-member-search-field").on("keyup", function() {
    var input = $(".chat-member-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: {keyword: input},
      dataType: 'json'
    })
    //対象ユーザーありの時
    .done(function(users) {
      $(".user-search-result").empty();
      if (users.length !== 0 && input.length !== 0) {
        users.forEach(function(user) {
          appendUser(user);
        });
    //対象ユーザー無しの時
      } else {
        appendNoUser("一致するユーザーはいません")
      }
    })
    //サーチ失敗時
    .fail(function() {
      alert('ユーザー検索に失敗しました')
    })
  });

  //メンバー追加クリック時
  $(".user-search-result").on('click','.user-search-add', function() {
    var id = $(this).data('user-id');
    var name = $(this).data('user-name');
    var insertHTML = buildHTML(id, name);
    $('.chat-group-users').append(insertHTML);
    $(this).parent('.chat-group-user').remove();
  });

  //メンバー削除クリック時
  $(".chat-group-users").on('click', '.user-search-remove', function() {
    var id = $(this).data('user-id');
    $(`#chat-group-user-${id}`).remove();
  });
});
