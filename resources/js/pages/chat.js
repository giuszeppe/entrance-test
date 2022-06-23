import axios from 'axios';
import Echo from 'laravel-echo';
import {getDropdownMessage, getNewMessage} from '../dir/messageTemplate'
import { scrollToBottom } from '../helpers';
import {getUsersList} from './users'

window.Pusher = require('pusher-js');

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.MIX_PUSHER_APP_KEY,
    cluster: process.env.MIX_PUSHER_APP_CLUSTER,
});


let userUUID = document.querySelector('meta[name="uuid"]').content;


window.Echo.private(`message.${userUUID}`)
    .listen('MessageSent',(e)=> {
            let selectedChat = document.getElementById('users-conversation').getAttribute('selected-chat');
            if(selectedChat == e.message.from_id){
                getChatList(null,e.message.content);
                axios.get('/api/messageRead', {params : { chatId : e.message.from_id }})
                .then((e)=>{
                    getUsersList();
                })
            } else {
                getUsersList();
            }
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
export const toggleSelected = () => {
        var userChatElement = document.getElementsByClassName("user-chat");
        document
            .querySelectorAll(".chat-user-list li a")
            .forEach(function (item) {
                item.addEventListener("click", function (event) {
                    userChatElement.forEach(function (elm) {
                        elm.classList.add("user-chat-show");
                    });

                    // chat user list link active
                    var chatUserList = document.querySelector(
                        ".chat-user-list li.active"
                    );
                    if (chatUserList) chatUserList.classList.remove("active");
                    this.parentNode.classList.add("active");
                });
            });

        document
            .querySelectorAll(".sort-contact ul li")
            .forEach(function (item2) {
                item2.addEventListener("click", function (event) {
                    userChatElement.forEach(function (elm) {
                        elm.classList.add("user-chat-show");
                    });
                });
            });
        // user-chat-remove
        document.querySelectorAll(".user-chat-remove").forEach(function (item) {
            item.addEventListener("click", function (event) {
                userChatElement.forEach(function (elm) {
                    elm.classList.remove("user-chat-show");
                });
            });
        });
    }
export const updateSelectedChat = ()=> {
    document.getElementById("channel-chat").style.display = "none";
    document.getElementById("users-chat").style.display = "block";
}
export const fetchMessages = (uuid) =>{
    axios.get('/api/chatMessages', {params:{ 'uuid' : uuid}})
        .then((response) => {
            updateChats(response.data);
        })
}
export const updateChats = (chatData) => {
    resetOldChats()
    var {lenght,messages,sender}  = chatData
    var itemList = document.getElementById("users-conversation");
    itemList.setAttribute('selected-chat',sender.uuid)
    let messageIds = itemList.childElementCount;
    let currentSelectedChat = 'users'
        let  isContinue = 0;
        messages.forEach(function (message, index) {
            messageIds++;

            let userChatUuid = sender.uuid
            /*if (isContinue > 0) {
                isContinue = isContinue - 1;
                return;
            }*/
            let  isAlighn =
                message.from_id != userChatUuid ? " right" : " left";
            let  msgHTML =
                '<li class="chat-list' +
                isAlighn +
                '" id=chat-list-' +
                messageIds +
                '>\
                <div class="conversation-list">';
            if (userChatUuid == message.from_id && sender)
                msgHTML +=
                    '<div class="chat-avatar"><img src="' +
                   'images/users/user-dummy-img.jpg' +
                    '" alt=""></div>';

            msgHTML += '<div class="user-chat-content">';
            msgHTML += getMsg(
                message.id,
                message.content,
                true
            );
            if (
                messages[index + 1] &&
                message.from_id == messages[index + 1]["from_id"]
            ) {
                isContinue = getNextMsgCounts(
                    messages,
                    index,
                    message.from_id
                );
                msgHTML += getNextMsgs(
                    messages,
                    index,
                    message.from_id,
                    isContinue
                );
            }
            msgHTML +=
                '<div class="conversation-name"><small class="text-muted time">' +
                formatTimeForMessages(message.created_at) +
                '</small> <span class="text-success check-message-icon"><i class="bx bx-check-double"></i></span></div>';
            msgHTML +=
                "</div>\
        </div>\
    </li>";

            document.getElementById(
                currentSelectedChat + "-conversation"
            ).innerHTML += msgHTML;
        });
    
    deleteMessage();
    copyMessage();
    scrollToBottom("users-chat");
    copyClipboard();
    replyMessage();
}
export const getMsg = (id,msg,has_dropDown) =>{
    var msgHTML = '<div class="ctext-wrap">';
    if (msg != null) {
        msgHTML +=
            '<div class="ctext-wrap-content" id=' +
            id +
            '>\
    <p class="mb-0 ctext-content">' +
            msg +
            "</p></div>";
    } 
    if (has_dropDown === true) {
        msgHTML += getDropdownMessage()
    ;
    }
    msgHTML += "</div>";
    return msgHTML;
}

/**
 * Chat helpers function
 */ 

function resetOldChats(){
    document.getElementById('users-conversation').innerHTML = "";
}

function replyMessage() {
    var itemList = document.getElementById("users-conversation");
    var replyMessage = itemList.querySelectorAll(".reply-message");
    var replyToggleOpen = document.querySelector(".replyCard");
    var replyToggleClose = document.querySelector("#close_toggle");

    replyMessage.forEach(function (item) {
        item.addEventListener("click", function () {
            isreplyMessage = true;
            replyToggleOpen.classList.add("show");
            replyToggleClose.addEventListener("click", function () {
                replyToggleOpen.classList.remove("show");
            });

            var replyMsg =
                item.closest(".ctext-wrap").children[0].children[0]
                    .innerText;
            document.querySelector(
                ".replyCard .replymessage-block .flex-grow-1 .mb-0"
            ).innerText = replyMsg;
            var replyuser =
                document.querySelector(".user-profile-show").innerHTML;
            var msgWwnerName = item.closest(".chat-list")
                ? item.closest(".chat-list").classList.contains("left")
                    ? replyuser
                    : "You"
                : replyuser;
            document.querySelector(
                ".replyCard .replymessage-block .flex-grow-1 .conversation-name"
            ).innerText = msgWwnerName;
        });
    });
}
function copyMessage() {
    var itemList = document.getElementById("users-conversation");
    var copyMessage = itemList.querySelectorAll(".copy-message");
    copyMessage.forEach(function (item) {
        item.addEventListener("click", function () {
            var isText = item.closest(".ctext-wrap").children[0]
                ? item.closest(".ctext-wrap").children[0].children[0]
                        .innerText
                : "";
            navigator.clipboard.writeText(isText);
        });
    });
}
function copyClipboard() {
        var copyClipboardAlert = document.querySelectorAll(".copy-message");
        copyClipboardAlert.forEach(function (item) {
            item.addEventListener("click", function () {
                document.getElementById("copyClipBoard").style.display =
                    "block";
                document.getElementById("copyClipBoardChannel").style.display =
                    "block";
                setTimeout(hideclipboard, 1000);
                function hideclipboard() {
                    document.getElementById("copyClipBoard").style.display =
                        "none";
                    document.getElementById(
                        "copyClipBoardChannel"
                    ).style.display = "none";
                }
            });
        });
    }
function deleteMessage() {
    var itemList = document.getElementById("users-conversation");
    var deleteItems = itemList.querySelectorAll(".delete-item");
    deleteItems.forEach(function (item) {
        item.addEventListener("click", function () {
            item.closest(".user-chat-content").childElementCount == 2
                ? item.closest(".chat-list").remove()
                : item.closest(".ctext-wrap").remove();
        });
    });
}

function getNextMsgCounts(chatsData, i, from_id) {
    var counts = 0;
    while (chatsData[i]) {
        if (chatsData[i + 1] && chatsData[i + 1]["from_id"] == from_id) {
            counts++;
            i++;
        } else {
            break;
        }
    }
    return counts;
}

//getNextMsgs
function getNextMsgs(chatsData, i, from_id, isContinue) {
    var msgs = 0;
    while (chatsData[i]) {
        if (chatsData[i + 1] && chatsData[i + 1]["from_id"] == from_id) {
            msgs = getMsg(
                chatsData[i + 1].id,
                chatsData[i + 1].msg,
                chatsData[i + 1].has_images,
                chatsData[i + 1].has_files,
                chatsData[i + 1].has_audios,
                chatsData[i + 1].has_videos,
                chatsData[i + 1].has_dropDown
            );
            i++;
        } else {
            break;
        }
    }
    return msgs;
} 