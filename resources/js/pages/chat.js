import Echo from 'laravel-echo';
import { message } from 'laravel-mix/src/Log';
import {getNewMessage} from '../dir/messageTemplate'

window.Pusher = require('pusher-js');

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.MIX_PUSHER_APP_KEY,
    cluster: process.env.MIX_PUSHER_APP_CLUSTER,
});

export const formatTimeForMessages = (time) => {
    if(time === null ){
        time = new Date()
    } else if(!(time instanceof Date)){
        time = new Date(time)
    }
    var date = time.getDate();
    var month = time.getMonth(); 
    var year = time.getFullYear();
    var hours = time.getHours(); 
    var minutes = time.getMinutes();
    return `${date}-${month}-${year} ${hours}:${minutes}`
}


export const getChatList = function (chatid, content,time = new Date(),position) {
        time = formatTimeForMessages(time)
        var itemList = document.getElementById("users-conversation");
        let messageIds = itemList.childElementCount;
        messageIds++;
        if (content != null) {
            itemList.insertAdjacentHTML(
                "beforeend",
                getNewMessage(messageIds,content,time,position)
            );
        }
        console.log(messageIds);
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
        messageIds++;
    };
let userUUID = document.querySelector('meta[name="uuid"]').content;

window.Echo.private(`message.${userUUID}`)
    .listen('MessageSent',(e)=>{
        getChatList(null,e.message.content);
    })
