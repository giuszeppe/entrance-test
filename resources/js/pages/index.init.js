/*
Template Name: Vhato - Responsive Bootstrap 5 Chat App
Author: Themesbrand
Website: https://themesbrand.com/
Contact: themesbrand@gmail.com
File: Index init js
*/
import { getDropdownContact, getDropdownMessage } from '../dir/messageTemplate';
import {axios} from '../request';
import { formatTimeForMessages, getChatList } from './chat';

(function () {
    var isreplyMessage = false;
    var currentChatId = "users-chat";
    var dummyImage = "images/users/user-dummy-img.jpg";

    var currentSelectedChat = "users";
    var url = window.location.origin + "/js/dir/";
    var usersList = [];
    var userChatId = 1;
    document.getElementById("copyClipBoard").style.display = "none";
    document.getElementById("copyClipBoardChannel").style.display = "none";

    // chat user responsive hide show
    function toggleSelected() {
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

    // single to channel and channel to single chat conversation
   

    //user list by json
    var getJSON = function (jsonurl, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url + jsonurl, true);
        xhr.responseType = "json";
        xhr.onload = function () {
            var status = xhr.status;
            if (status === 200) {
                callback(null, xhr.response);
            } else {
                callback(status, xhr.response);
            }
        };
        xhr.send();
    };

    getJSON("users.json", function (err, data) {
        if (err !== null) {
            console.log("Something went wrong: " + err);
        } else {
            // set favourite users list
            var fav = data[0].favorites;
            fav.forEach(function (user, index) {
                var profile = user.profile
                    ? '<img src="' +
                      user.profile +
                      '" class="rounded-circle avatar-xs" alt=""><span class="user-status"></span>'
                    : '<div class="avatar-xs"><span class="avatar-title rounded-circle bg-primary text-white"><span class="username">' +
                      user.nickname +
                      '</span><span class="user-status"></span></span></div>';

                var isMessageCount = user.messagecount
                    ? '<div class="ms-auto"><span class="badge badge-soft-danger rounded p-1 fs-10">' +
                      user.messagecount +
                      "</span></div>"
                    : "";
                var messageCount = user.messagecount
                    ? '<a href="javascript: void(0);" class="unread-msg-user">'
                    : '<a href="javascript: void(0);">';

                var activeClass = user.id === 1 ? "active" : "";
                document.getElementById("favourite-users").innerHTML +=
                    '<li id="contact-id-' +
                    user.id +
                    '" data-name="favorite" class="' +
                    activeClass +
                    '">\
                  ' +
                    messageCount +
                    ' \
                      <div class="d-flex align-items-center">\
                          <div class="chat-user-img online align-self-center me-2 ms-0">\
                              ' +
                    profile +
                    '\
                          </div>\
                          <div class="overflow-hidden me-2">\
                              <p class="text-truncate chat-username mb-0">' +
                    user.name +
                    '</p>\
                              <p class="text-truncate text-muted fs-13 mb-0">' +
                    user.lastmessage +
                    "</p>\
                          </div>\
                          " +
                    isMessageCount +
                    "\
                      </div>\
                  </a>\
              </li>";
            });

            // set users message list
            var users = data[0].users;
            users.forEach(function (userData, index) {
                var isUserProfile = userData.profile
                    ? '<img src="' +
                      userData.profile +
                      '" class="rounded-circle avatar-xs" alt=""><span class="user-status"></span>'
                    : '<div class="avatar-xs"><span class="avatar-title rounded-circle bg-primary text-white"><span class="username">JL</span><span class="user-status"></span></span></div>';

                var isMessageCount = userData.messagecount
                    ? '<div class="ms-auto"><span class="badge badge-soft-danger rounded p-1 fs-10">' +
                      userData.messagecount +
                      "</span></div>"
                    : "";
                var messageCount = userData.messagecount
                    ? '<a href="javascript: void(0);" class="unread-msg-user">'
                    : '<a href="javascript: void(0);">';
                var activeClass = userData.id === 1 ? "active" : "";
                var profile = userData.profile
                    ? '<img src="' +
                      userData.profile +
                      '" class="rounded-circle avatar-xs" alt=""><span class="user-status"></span>'
                    : '<div class="avatar-xs"><span class="avatar-title rounded-circle bg-primary text-white"><span class="username">' +
                      userData.nickname +
                      '</span><span class="user-status"></span></span></div>';
                document.getElementById("usersList").innerHTML +=
                    '<li id="contact-id-' +
                    userData.id +
                    '" data-name="favorite" class="' +
                    activeClass +
                    '">\
        ' +
                    messageCount +
                    ' \
            <div class="d-flex align-items-center">\
                <div class="chat-user-img online align-self-center me-2 ms-0">\
                    ' +
                    profile +
                    '\
                </div>\
                <div class="overflow-hidden me-2">\
                    <p class="text-truncate chat-username mb-0">' +
                    userData.name +
                    '</p>\
                    <p class="text-truncate text-muted fs-13 mb-0">' +
                    userData.lastmessage +
                    "</p>\
                </div>\
                " +
                    isMessageCount +
                    "\
            </div>\
        </a>\
    </li>";
            });
        }
        toggleSelected();
    });

    //Contact List dynamic Details
    function contactList() {
        document
            .querySelectorAll(".sort-contact ul li")
            .forEach(function (item) {
                item.addEventListener("click", function (event) {
                    item.
                    currentSelectedChat = "users";
                    updateSelectedChat();
                    let uuid = item.querySelector('._user-uuid').value
                    var contactName = item.querySelector("li .fs-14").innerHTML;
                    document.querySelector(
                        ".text-truncate .user-profile-show"
                    ).innerHTML = contactName;
                    document.querySelector(
                        ".user-profile-desc .text-truncate"
                    ).innerHTML = contactName;
                    document.querySelector(
                        ".audiocallModal .text-truncate"
                    ).innerHTML = contactName;
                    document.querySelector(
                        ".videocallModal .text-truncate"
                    ).innerHTML = contactName;
                    document.querySelector(
                        ".user-profile-sidebar .user-name"
                    ).innerHTML = contactName;
                    document.querySelector(".chat-input-typing").style.display =
                        "block";
                    document.querySelector(
                        ".user-profile-status"
                    ).style.display = "block";
                    document.querySelector(
                        ".chat-input-typing .typing-user"
                    ).innerHTML =
                        contactName +
                        ' is Typing<span class="typing ms-2"><span class="dot"></span><span class="dot"></span><span class="dot"></span></span>';

                    var contactImg = item
                        .querySelector("li .align-items-center")
                        .querySelector(".avatar-xs .rounded-circle")
                        .getAttribute("src");
                    if (contactImg) {
                        document
                            .querySelector(".user-own-img .avatar-sm")
                            .setAttribute("src", contactImg);
                        document
                            .querySelector(".user-profile-sidebar .profile-img")
                            .setAttribute("src", contactImg);
                        document
                            .querySelector(".audiocallModal .img-thumbnail")
                            .setAttribute("src", contactImg);
                        document
                            .querySelector(".videocallModal .videocallModal-bg")
                            .setAttribute("src", contactImg);
                    } else {
                        document
                            .querySelector(".user-own-img .avatar-sm")
                            .setAttribute("src", dummyImage);
                        document
                            .querySelector(".user-profile-sidebar .profile-img")
                            .setAttribute("src", dummyImage);
                        document
                            .querySelector(".audiocallModal .img-thumbnail")
                            .setAttribute("src", dummyImage);
                        document
                            .querySelector(".videocallModal .videocallModal-bg")
                            .setAttribute("src", dummyImage);
                    }
                    var conversationImg =
                        document.getElementById("users-conversation");
                    conversationImg
                        .querySelectorAll(".left .chat-avatar")
                        .forEach(function (item3) {
                            if (contactImg) {
                                item3
                                    .querySelector("img")
                                    .setAttribute("src", contactImg);
                            } else {
                                item3
                                    .querySelector("img")
                                    .setAttribute("src", dummyImage);
                            }
                        });
                    toggleSelected()
                    fetchMessages(uuid)
                    //window.stop();
                });
            });
    }

    function updateSelectedChat() {
        if (currentSelectedChat == "users") {
            document.getElementById("channel-chat").style.display = "none";
            document.getElementById("users-chat").style.display = "block";
        } else {
            document.getElementById("channel-chat").style.display = "block";
            document.getElementById("users-chat").style.display = "none";
        }
    }
    updateSelectedChat();

    // Profile hide/show
    var userProfileSidebar = document.querySelector(".user-profile-sidebar");

    document.querySelectorAll(".user-profile-show").forEach(function (item) {
        item.addEventListener("click", function (event) {
            userProfileSidebar.classList.toggle("d-block");
        });
    });

    // chat conversation scroll
    window.addEventListener("DOMContentLoaded", function () {
        var conversationScroll = document.querySelector(
            "#chat-conversation .simplebar-content-wrapper"
        );
        conversationScroll.scrollTop = conversationScroll.scrollHeight;
    });

    // body click hide collapse
    var myCollapse = document.getElementById("chatinputmorecollapse");
    document.body.addEventListener("click", function () {
        var bsCollapse = new bootstrap.Collapse(myCollapse, {
            toggle: false,
        });
        bsCollapse.hide();
    });

    // chat conversation swiper
    if (myCollapse) {
        myCollapse.addEventListener("shown.bs.collapse", function () {
            initSwiper();
        });
    }

    function initSwiper() {
        var swiper = new Swiper(".chatinput-links", {
            slidesPerView: 3,
            spaceBetween: 30,
            breakpoints: {
                768: {
                    slidesPerView: 4,
                },
                1024: {
                    slidesPerView: 6,
                },
            },
        });
    }

    // contact modal list
    var contactModalList = document.querySelectorAll(
        ".contact-modal-list .contact-list li"
    );
    contactModalList.forEach(function (link) {
        link.addEventListener("click", function () {
            link.classList.toggle("selected");
        });
    });

    // Change conversation bg

    //Auto Focus curser to Text Box Area

    document.getElementById("favourite-users").onclick = function () {
        document.getElementById("chat-input").focus();
    };

    document.getElementById("usersList").onclick = function () {
        document.getElementById("chat-input").focus();
    };

    document.getElementById("channelList").onclick = function () {
        document.getElementById("chat-input").focus();
    };

    // Scroll to Bottom
    function scrollToBottom(id) {
        var simpleBar = document
            .getElementById(id)
            .querySelector("#chat-conversation .simplebar-content-wrapper");
        var offsetHeight = document.getElementsByClassName(
            "chat-conversation-list"
        )[0]
            ? document
                  .getElementById(id)
                  .getElementsByClassName("chat-conversation-list")[0]
                  .scrollHeight -
              window.innerHeight +
              250
            : 0;
        if (offsetHeight)
            simpleBar.scrollTo({ top: offsetHeight, behavior: "smooth" });
    }

    //add an eventListener to the from
    var chatForm = document.querySelector("#chatinput-form");
    var chatInput = document.querySelector("#chat-input");
    var itemList = document.querySelector(".chat-conversation-list");
    var chatInputFeedback = document.querySelector(".chat-input-feedback");

    function currentTime() {
        var ampm = new Date().getHours() >= 12 ? "pm" : "am";
        var hour =
            new Date().getHours() > 12
                ? new Date().getHours() % 12
                : new Date().getHours();
        var minute =
            new Date().getMinutes() < 10
                ? "0" + new Date().getMinutes()
                : new Date().getMinutes();
        if (hour < 10) {
            return "0" + hour + ":" + minute + " " + ampm;
        } else {
            return hour + ":" + minute + " " + ampm;
        }
    }
    setInterval(currentTime, 1000);

    var messageIds = 0;

    var messageboxcollapse = 1;

    //message with reply
    var getReplyChatList = function (chatReplyId, chatReplyItems) {
        var chatReplyUser =
            document.querySelector(".user-profile-show").innerHTML;
        var chatReplyMessage = document.querySelector(
            ".replyCard .replymessage-block .flex-grow-1 .mb-0"
        ).innerText;
        messageIds++;
        var chatreplyConList = document.getElementById(chatReplyId);
        var itemReplyList = chatreplyConList.querySelector(
            ".chat-conversation-list"
        );
        if (chatReplyItems != null) {
            itemReplyList.insertAdjacentHTML(
                "beforeend",
                '<li class="chat-list right" id="chat-list-' +
                    messageIds +
                    '" >\
                <div class="conversation-list">\
                    <div class="user-chat-content">\
                        <div class="ctext-wrap">\
                            <div class="ctext-wrap-content">\
                            <div class="replymessage-block mb-0 d-flex align-items-start">\
                        <div class="flex-grow-1">\
                            <h5 class="conversation-name">' +
                    chatReplyUser +
                    '</h5>\
                            <p class="mb-0">' +
                    chatReplyMessage +
                    '</p>\
                        </div>\
                        <div class="flex-shrink-0">\
                            <button type="button" class="btn btn-sm btn-link mt-n2 me-n3 fs-18">\
                            </button>\
                        </div>\
                    </div>\
                                <p class="mb-0 ctext-content mt-1">\
                                    ' +
                    chatReplyItems +
                    '\
                                </p>\
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
                    currentTime() +
                    '</small>\
                        <span class="text-success check-message-icon"><i class="bx bx-check"></i></span>\
                    </div>\
                </div>\
            </div>\
        </li>'
            );
            messageboxcollapse++;
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

        newChatList
            .querySelectorAll(".reply-message")
            .forEach(function (subitem) {
                subitem.addEventListener("click", function () {
                    var replyMessage =
                        subitem.closest(".ctext-wrap").children[0].children[0]
                            .innerText;
                    var replyuser =
                        document.querySelector(".user-profile-show").innerHTML;
                    document.querySelector(
                        ".replyCard .replymessage-block .flex-grow-1 .mb-0"
                    ).innerText = replyMessage;
                    var msgWwnerName = subitem.closest(".chat-list")
                        ? subitem
                              .closest(".chat-list")
                              .classList.contains("left")
                            ? replyuser
                            : "You"
                        : replyuser;
                    document.querySelector(
                        ".replyCard .replymessage-block .flex-grow-1 .conversation-name"
                    ).innerText = msgWwnerName;
                });
            });

        //Copy Message
        newChatList
            .querySelectorAll(".copy-message")
            .forEach(function (subitem) {
                subitem.addEventListener("click", function () {
                    newChatList.childNodes[1].children[1].firstElementChild.firstElementChild.getAttribute(
                        "id"
                    );
                    isText =
                        newChatList.childNodes[1].children[1].firstElementChild
                            .firstElementChild.innerText;
                    navigator.clipboard.writeText(isText);
                });
            });
    };

    if (chatForm) {
        //add an item to the List, including to local storage
        chatForm.addEventListener("submit", function (e) {
            e.preventDefault();

            var chatId = currentChatId;
            var chatId1 = currentChatId;
            var chatId2 = currentChatId;
            var chatId3 = currentChatId;
            var chatReplyId = currentChatId;

            var chatInputValue = chatInput.value;
            var chatInputfeedback = document.querySelector(
                ".chat-input-feedback"
            );

            if (chatInputValue.length === 0) {
                chatInputfeedback.classList.add("show");
                setTimeout(function () {
                    chatInputfeedback.classList.remove("show");
                }, 2000);
            } else {
                if (isreplyMessage == true) {
                    getReplyChatList(chatReplyId, chatInputValue);
                    isreplyMessage = false;
                } else {
                    getChatList(chatId, chatInputValue);
                    const params = new URLSearchParams()
                    let uuid = document.getElementById('userChatUuid').value
                    params.append('uuid',uuid)
                    params.append('content',chatInputValue)
                    axios.post('/api/message/', params)
                    .then((response)=>{
                        
                    })
                }
            }

            scrollToBottom(
                chatId || chatId1 || chatId2 || chatId3 || chatReplyId
            );
            chatInput.value = "";
            //reply msg remove textarea
            document.getElementById("close_toggle").click();
        });
    }

    // remove chat list
    function deleteMessage() {
        var deleteItems = itemList.querySelectorAll(".delete-item");
        deleteItems.forEach(function (item) {
            item.addEventListener("click", function () {
                item.closest(".user-chat-content").childElementCount == 2
                    ? item.closest(".chat-list").remove()
                    : item.closest(".ctext-wrap").remove();
            });
        });
    }

 
    //Copy ClipBoard Alert
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

    //Copy Messages
    function copyMessage() {
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

    //reply message
    function replyMessage() {
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

    // Profile Foreground Img
    document
        .querySelector("#profile-foreground-img-file-input")
        .addEventListener("change", function () {
            var preview = document.querySelector(".profile-foreground-img");
            var file = document.querySelector(
                ".profile-foreground-img-file-input"
            ).files[0];
            var reader = new FileReader();

            reader.addEventListener(
                "load",
                function () {
                    preview.src = reader.result;
                },
                false
            );
            if (file) {
                reader.readAsDataURL(file);
            }
        });

    // user profile img
    document
        .querySelector("#profile-img-file-input")
        .addEventListener("change", function () {
            var preview = document.querySelector(".user-profile-image");
            var file = document.querySelector(".profile-img-file-input")
                .files[0];
            var reader = new FileReader();

            reader.addEventListener(
                "load",
                function () {
                    preview.src = reader.result;
                },
                false
            );
            if (file) {
                reader.readAsDataURL(file);
            }
        });

    // profile user edit
    document
        .getElementById("user-profile-edit-btn")
        .addEventListener("click", function (e) {
            document
                .querySelectorAll(".edit-input .form-control")
                .forEach(function (item) {
                    var editIcon = document.getElementById("edit-icon");
                    if (item.disabled) {
                        // If disabled, do this
                        editIcon.classList.replace("bxs-pencil", "bxs-save");
                        item.disabled = false;
                    } else {
                        // Enter code here
                        editIcon.classList.replace("bxs-save", "bxs-pencil");
                        item.disabled = true;
                    }
                });
        });

    // favourite btn
    var favouriteBtn = document.getElementsByClassName("favourite-btn");
    for (var i = 0; i < favouriteBtn.length; i++) {
        var favouriteBtns = favouriteBtn[i];
        favouriteBtns.onclick = function () {
            favouriteBtns.classList.toggle("active");
        };
    }

    // chat emojiPicker input
    var emojiPicker = new FgEmojiPicker({
        trigger: [".emoji-btn"],
        removeOnSelection: false,
        closeButton: true,
        position: ["top", "right"],
        preFetch: true,
        dir: "js/dir/json",
        insertInto: document.querySelector(".chat-input"),
    });

    // emojiPicker position
    var emojiBtn = document.getElementById("emoji-btn");
    emojiBtn.addEventListener("click", function () {
        setTimeout(function () {
            var fgEmojiPicker =
                document.getElementsByClassName("fg-emoji-picker")[0];
            if (fgEmojiPicker) {
                var leftEmoji = window.getComputedStyle(fgEmojiPicker)
                    ? window
                          .getComputedStyle(fgEmojiPicker)
                          .getPropertyValue("left")
                    : "";
                if (leftEmoji) {
                    leftEmoji = leftEmoji.replace("px", "");
                    leftEmoji = leftEmoji - 40 + "px";
                    fgEmojiPicker.style.left = leftEmoji;
                }
            }
        }, 0);
    });

    function getJSONFile(jsonurl, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", jsonurl, true);
        xhr.responseType = "json";
        xhr.onload = function () {
            var status = xhr.status;
            if (status === 200) {
                callback(null, xhr.response);
            } else {
                callback(status, xhr.response);
            }
        };
        xhr.send();
    }

    // getNextMsgCounts
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

    // getMsg
    function getMsg(
        id,
        msg,
        has_dropDown
    ) {
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

var input, filter, ul, li, a, i, j, div;
// Search User
function searchUser() {
    input = document.getElementById("searchChatUser");
    filter = input.value.toUpperCase();
    ul = document.querySelector(".chat-room-list");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        var item = li[i];
        var txtValue = item.querySelector("p").innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

//Search Contacts

function searchContacts() {
    let input = document.getElementById("searchContact");
    let filter = input.value.toUpperCase();
    let list = document.querySelector(".sort-contact");
    let li = list.querySelectorAll(".mt-3 li");
    let div = list.querySelectorAll(".mt-3 .contact-list-title");
    // Fetching users from remote

    axios
        .get("/api/user/contacts", { params: { searchQuery: input.value } })
        .then((response) => {
            try {
                console.log(response.data);
                const contacts = JSON.parse(response.data);
                updateContacts(contacts);
            } catch (err) {
                // 👇️ This runs
                console.log('Error: ', err.message);
            }
        });

    for (j = 0; j < div.length; j++) {
        var contactTitle = div[j];
        let txtValue = contactTitle.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            div[j].style.display = "";
        } else {
            div[j].style.display = "none";
        }
    }

    for (i = 0; i < li.length; i++) {
        let contactName = li[i];
        let txtValue = contactName.querySelector("h5").innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}
document
    .getElementById("searchContact")
    .addEventListener("keyup", searchContacts);

function resetOldContacts(){
    document.getElementsByClassName(
        "sort-contact"
        )[0].innerHTML = "";

}

function updateContacts(data){
    resetOldContacts()
    data.contacts.forEach((user) =>{
        let profile = user.profile
            ? '<img src="' +
            user.profile +
            '" class="img-fluid rounded-circle" alt="">'
            : '<span class="avatar-title rounded-circle bg-primary fs-10">' +
            user.nickname +
            "</span>";
        profile += `<input type="hidden" class="_user-uuid" value="${user.uuid}" \>`
        let msgHTML = getDropdownContact(profile,user);
        let isSortContact =
            '<div class="mt-3" >\
                <div class="contact-list-title">' +
                    user.name.charAt(0).toUpperCase() +
                    '\
                </div>\
                <ul id="contact-sort-' + user.name.charAt(0) +'" class="list-unstyled contact-list" >';
        if (!document.getElementById('contact-sort-' + user.name.charAt(0))) {
            document.getElementsByClassName(
            "sort-contact"
            )[0].innerHTML += isSortContact;
        }
        document.getElementById("contact-sort-" + user.name.charAt(0)).innerHTML = 
            document.getElementById("contact-sort-" + user.name.charAt(0)).innerHTML + msgHTML +"</ul>" + "</div>";
    })
    contactList()
}

function fetchMessages(uuid){
    axios.get('/api/messages', {params:{ 'uuid' : uuid}})
        .then((response) => {
            updateChats(JSON.parse(response.data));
        })
}
function resetOldChats(){
    document.getElementById('users-conversation').innerHTML = "";
}
function updateChats(chatData){
    resetOldChats()
    console.log(chatData);
    var {lenght,messages,sender}  = chatData
    var itemList = document.getElementById("users-conversation");
    let messageIds = itemList.childElementCount;
    let currentSelectedChat = 'users'
        let  isContinue = 0;
        console.log(messages);
        messages.forEach(function (message, index) {
            messageIds++;

            let userChatUuid = sender.uuid
            /*if (isContinue > 0) {
                isContinue = isContinue - 1;
                return;
            }*/
            let  isAlighn =
                message.from_id != userChatUuid ? " right" : " left";
            console.log(isAlighn);
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

            msgHTML += '<div class="user-chat-content"> <input type="hidden" id="userChatUuid" value="' + userChatUuid + '">';
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

//Search contact on contactModalList
function searchContactOnModal() {
    input = document.getElementById("searchContactModal");
    filter = input.value.toUpperCase();
    list = document.querySelector(".contact-modal-list");
    li = list.querySelectorAll(".mt-2 li");
    div = list.querySelectorAll(".mt-2 .contact-list-title");

    for (j = 0; j < div.length; j++) {
        var contactTitle = div[j];
        txtValue = contactTitle.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            div[j].style.display = "";
        } else {
            div[j].style.display = "none";
        }
    }

    for (i = 0; i < li.length; i++) {
        contactName = li[i];
        txtValue = contactName.querySelector("h5").innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

//Location Permission
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    x.innerHTML =
        "Latitude: " +
        position.coords.latitude +
        "<br>Longitude: " +
        position.coords.longitude;
}

//Camera Permission
function cameraPermission() {
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
            .getUserMedia({ video: true })
            .then(function (s) {
                video.srcObject = s;
            })
            .catch(function (err) {
                console.log(err);
            });
    } else {
        console.log("No");
    }
}

//Audio(Mic) Permission
function audioPermission() {
    navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(function (stream) {
            window.localStream = stream;
            window.localAudio.srcObject = stream;
            window.localAudio.autoplay = true;
        });
}

//get color

document.documentElement.style.setProperty(
    "--bs-primary-rgb",
    window.localStorage.getItem("colorPrimary")
);
document.documentElement.style.setProperty(
    "--bs-secondary-rgb",
    window.localStorage.getItem("colorSecondary")
);

function themeColor(primaryColor) {
    var activeCustomcolor = localStorage.getItem("activeCustomcolor");
    if (activeCustomcolor) {
        document.getElementById(activeCustomcolor).checked = true;
    }
    document.querySelectorAll(".theme-color").forEach(function (item) {
        var colorRadioElements = document.querySelector(
            "input[name=bgcolor-radio]:checked"
        );

        if (colorRadioElements) {
            colorRadioElements = colorRadioElements.id;

            var elementsColor =
                document.getElementsByClassName(colorRadioElements);

            var color = window
                .getComputedStyle(elementsColor[0], null)
                .getPropertyValue("background-image");

            let rgbColorSecondary = color.substring(
                color.indexOf("b") + 2,
                color.indexOf(")")
            );
            let rgbColorPrimary = color.substring(
                color.lastIndexOf("(") + 1,
                color.lastIndexOf(")") - 1
            );
        }

        item.addEventListener("click", function (event) {
            if (item.id) {
                localStorage.setItem("activeCustomcolor", item.id);
            }
            // choose theme color
            var colorRadioElements = document.querySelector(
                "input[name=bgcolor-radio]:checked"
            );

            if (colorRadioElements) {
                colorRadioElements = colorRadioElements.id;

                var elementsColor =
                    document.getElementsByClassName(colorRadioElements);
                if (elementsColor) {
                    var color = window
                        .getComputedStyle(elementsColor[0], null)
                        .getPropertyValue("background-image");

                    let rgbColorSecondary = color.substring(
                        color.indexOf("b") + 2,
                        color.indexOf(")")
                    );
                    let rgbColorPrimary = color.substring(
                        color.lastIndexOf("(") + 1,
                        color.lastIndexOf(")") - 1
                    );

                    window.localStorage.setItem(
                        "colorPrimary",
                        rgbColorPrimary
                    );
                    window.localStorage.setItem(
                        "colorSecondary",
                        rgbColorSecondary
                    );

                    document.documentElement.style.setProperty(
                        "--bs-primary-rgb",
                        window.localStorage.getItem("colorPrimary")
                    );
                    document.documentElement.style.setProperty(
                        "--bs-secondary-rgb",
                        window.localStorage.getItem("colorSecondary")
                    );
                }
            }
        });
    });

    // primary color picker
    var classicPickrPrimary = document.querySelectorAll(".colorpicker-primary");
    classicPickrPrimary.forEach(function () {
        var primarycolor = localStorage.getItem("colorPrimary")
            ? "rgba(" + localStorage.getItem("colorPrimary") + ",1)"
            : "#6153CC";

        var primaryPicker = Pickr.create({
            el: ".colorpicker-primary",
            theme: "nano", // or 'monolith', or 'nano'
            default: primarycolor,
            swatches: null,
            defaultRepresentation: "RGBA",
            components: {
                // Main components
                preview: true,
                opacity: true,
                hue: true,

                // Input / output Options
                interaction: {
                    hex: false,
                    rgba: false,
                    hsva: false,
                    input: true,
                    clear: true,
                    save: true,
                },
            },
        });

        // primary colorpicker
        primaryPicker
            .on("clear", function (instance) {
                // console.log('Event: "clear"', instance);
            })
            .on("cancel", function (instance) {
                // console.log('cancel', primaryPicker.getColor().toRGBA().toString(0));
            })
            .on("change", function (color, source, instance) {
                // console.log('Event: "change"', instance, primaryPicker.getColor().toRGBA().toString(0));
                var primaryColorValue = primaryPicker
                    .getColor()
                    .toRGBA()
                    .toString(0);

                let rgbColorsPrimary = primaryColorValue.substring(
                    primaryColorValue.indexOf("(") + 1,
                    primaryColorValue.lastIndexOf(",")
                );
                localStorage.setItem("colorPrimary", rgbColorsPrimary);

                document.documentElement.style.setProperty(
                    "--bs-primary-rgb",
                    window.localStorage.getItem("colorPrimary")
                );
            });
    });

    // secondary color picker
    var classicPickrSecondary = document.querySelectorAll(
        ".colorpicker-secondary"
    );
    classicPickrSecondary.forEach(function () {
        var secondarycolor = localStorage.getItem("colorSecondary")
            ? "rgba(" + localStorage.getItem("colorSecondary") + ",1)"
            : "#b966c1";
        var secondaryPicker = Pickr.create({
            el: ".colorpicker-secondary",
            theme: "nano", // or 'monolith', or 'nano'
            default: secondarycolor,
            swatches: null,
            defaultRepresentation: "RGBA",
            components: {
                // Main components
                preview: true,
                opacity: true,
                hue: true,

                // Input / output Options
                interaction: {
                    hex: false,
                    rgba: false,
                    hsva: false,
                    input: true,
                    clear: true,
                    save: true,
                },
            },
        });
        // primary colorpicker
        secondaryPicker
            .on("clear", function (instance) {
                // console.log('Event: "clear"', instance);
            })
            .on("cancel", function (instance) {
                // console.log('cancel', secondaryPicker.getColor().toRGBA().toString(0));
            })
            .on("change", function (color, source, instance) {
                // console.log('Event: "change"', instance, secondaryPicker.getColor().toRGBA().toString(0));
                var secondaryColorValue = secondaryPicker
                    .getColor()
                    .toRGBA()
                    .toString(0);

                let rgbColorSecondary = secondaryColorValue.substring(
                    secondaryColorValue.lastIndexOf("(") + 1,
                    secondaryColorValue.lastIndexOf(",")
                );

                localStorage.setItem("colorSecondary", rgbColorSecondary);

                document.documentElement.style.setProperty(
                    "--bs-secondary-rgb",
                    window.localStorage.getItem("colorSecondary")
                );
            });
    });
}
var primaryColor = window
    .getComputedStyle(document.body, null)
    .getPropertyValue("--bs-primary-rgb");
themeColor(primaryColor);
})();