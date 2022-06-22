import Echo from 'laravel-echo';

window.Pusher = require('pusher-js');

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.MIX_PUSHER_APP_KEY,
    cluster: process.env.MIX_PUSHER_APP_CLUSTER,
});
var getChatList = function (chatid, message) {
        var chatConList = document.getElementById(chatid);
        var itemList = document.getElementById("users-conversation");
        let messageIds = itemList.childElementCount;
        messageIds++;
        let content = message.content
        let time = message.timestamp
        if (content != null) {
            itemList.insertAdjacentHTML(
                "beforeend",
                '<li class="chat-list left" id="chat-list-' +
                    messageIds +
                    '" >\
                <div class="conversation-list">\
                    <div class="user-chat-content">\
                        <div class="ctext-wrap">\
                            <div class="ctext-wrap-content">\
                                <p class="mb-0 ctext-content">' +
                    content +
                    '</p>\
                            </div>\
                            <div class="align-self-start message-box-drop d-flex">\
                            <div class="dropdown">\
                              <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
                                <i class="ri-emotion-happy-line"></i>\
                              </a>\
                              <div class="dropdown-menu emoji-dropdown-menu">\
                                <div class="hstack align-items-center gap-2 px-2 fs-25">\
                                  <a href="javascript:void(0);">💛</a>\
                                  <a href="javascript:void(0);">🤣</a>\
                                  <a href="javascript:void(0);">😜</a>\
                                  <a href="javascript:void(0);">😘</a>\
                                  <a href="javascript:void(0);">😍</a>\
                                  <div class="avatar-xs">\
                                  <a href="javascript:void(0);" class="avatar-title bg-soft-primary rounded-circle fs-19 text-primary">+</a>\
                                  </div>\
                                </div>\
                              </div>\
                            </div>\
                              <div class="dropdown">\
                                  <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
                                      <i class="ri-more-2-fill"></i>\
                                  </a>\
                                  <div class="dropdown-menu">\
                                      <a class="dropdown-item d-flex align-items-center justify-content-between reply-message" href="#" data-bs-toggle="collapse" data-bs-target=".replyCollapse">Reply <i class="bx bx-share ms-2 text-muted"></i></a>\
                                      <a class="dropdown-item d-flex align-items-center justify-content-between" href="#" data-bs-toggle="modal" data-bs-target=".forwardModal">Forward <i class="bx bx-share-alt ms-2 text-muted"></i></a>\
                                      <a class="dropdown-item d-flex align-items-center justify-content-between copy-message" href="#" id="copy-message-' +
                    messageIds +
                    '">Copy <i class="bx bx-copy text-muted ms-2"></i></a>\
                                      <a class="dropdown-item d-flex align-items-center justify-content-between" href="#">Bookmark <i class="bx bx-bookmarks text-muted ms-2"></i></a>\
                                      <a class="dropdown-item d-flex align-items-center justify-content-between" href="#">Mark as Unread <i class="bx bx-message-error text-muted ms-2"></i></a>\
                                      <a class="dropdown-item d-flex align-items-center justify-content-between delete-item" id="delete-item-' +
                    messageIds +
                    '" href="#">Delete <i class="bx bx-trash text-muted ms-2"></i></a>\
                              </div>\
                            </div>\
                        </div>\
                    </div>\
                    <div class="conversation-name">\
                        <small class="text-muted time">' +
                    time +
                    '</small>\
                        <span class="text-success check-message-icon"><i class="bx bx-check"></i></span>\
                    </div>\
                </div>\
            </div>\
        </li>'
            );
        }

        

        // remove chat list
        var newChatList = document.getElementById("chat-list-" + messageIds);
        newChatList
            .querySelectorAll(".delete-item")
            .forEach(function (subitem) {
                subitem.addEventListener("click", function () {
                    itemList.removeChild(newChatList);
                });
            });

        //Copy Clipboard alert
        newChatList
            .querySelectorAll(".copy-message")
            .forEach(function (subitem) {
                subitem.addEventListener("click", function () {
                    document.getElementById("copyClipBoard").style.display =
                        "block";
                    document.getElementById(
                        "copyClipBoardChannel"
                    ).style.display = "block";
                    setTimeout(hideclipboardNew, 1000);
                    function hideclipboardNew() {
                        document.getElementById("copyClipBoard").style.display =
                            "none";
                        document.getElementById(
                            "copyClipBoardChannel"
                        ).style.display = "none";
                    }
                });
            });

        //reply Message model
        newChatList
            .querySelectorAll(".reply-message")
            .forEach(function (subitem) {
                subitem.addEventListener("click", function () {
                    var replyToggleOpenNew =
                        document.querySelector(".replyCard");
                    var replyToggleCloseNew =
                        document.querySelector("#close_toggle");
                    var replyMessageNew =
                        subitem.closest(".ctext-wrap").children[0].children[0]
                            .innerText;
                    var replyUserNew =
                        document.querySelector(".user-profile-show").innerHTML;
                    isreplyMessage = true;
                    replyToggleOpenNew.classList.add("show");
                    replyToggleCloseNew.addEventListener("click", function () {
                        replyToggleOpenNew.classList.remove("show");
                    });

                    document.querySelector(
                        ".replyCard .replymessage-block .flex-grow-1 .mb-0"
                    ).innerText = replyMessageNew;
                    document.querySelector(
                        ".replyCard .replymessage-block .flex-grow-1 .conversation-name"
                    ).innerText = replyUserNew;
                });
            });

        //Copy Message
        newChatList
            .querySelectorAll(".copy-message")
            .forEach(function (subitem) {
                subitem.addEventListener("click", function () {
                    var currentValue =
                        newChatList.childNodes[1].firstElementChild
                            .firstElementChild.firstElementChild
                            .firstElementChild.innerText;
                    navigator.clipboard.writeText(currentValue);
                });
            });
    };
let userUUID = document.querySelector('meta[name="uuid"]').content;
window.Echo.private(`message.${userUUID}`)
    .listen('MessageSent',(e)=>{
        console.log(e.message.content);
        getChatList(null,e.message);
    })
