/*
Template Name: Vhato - Responsive Bootstrap 5 Chat App
Author: Themesbrand
Website: https://themesbrand.com/
Contact: themesbrand@gmail.com
File: Index init js
*/
import { getDropdownContact } from '../dir/messageTemplate';
import { scrollToBottom } from '../helpers';
import {axios} from '../request';
import {  getChatList,  updateSelectedChat } from './chat';
import { contactList, getUsersList } from './users';

(function () {
    var isreplyMessage = false;
    var currentChatId = "users-chat";
    document.getElementById("copyClipBoard").style.display = "none";
    document.getElementById("copyClipBoardChannel").style.display = "none";

    

   
    
    getUsersList();


    //Contact List dynamic Details
    

    updateSelectedChat()

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

    document.getElementById("usersList").onclick = function () {
        document.getElementById("chat-input").focus();
    };

    // Scroll to Bottom
    

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
                    getChatList(chatId, chatInputValue,null,'right');
                    getUsersList()
                    const params = new URLSearchParams()
                    let uuid = document.getElementById('users-conversation').getAttribute('selected-chat')
                    params.append('uuid',uuid)
                    params.append('content',chatInputValue)
                    axios.post('/api/message', params,{
                        headers : {
                            'Accept' : 'application/json'
                        }
                    })
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
                const formData = new FormData();
                formData.append('profile',file)
                axios.post('/api/user/update', formData);
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

   


var input, filter, ul, li, a, i, j, div;


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
            user.name +
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
document.getElementById('pills-contacts-tab').addEventListener('click',() => {
    searchContacts()
})
})();
