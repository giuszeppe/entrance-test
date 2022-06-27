import { axios } from "../request";
import { fetchMessages, toggleSelected, updateSelectedChat} from "./chat";


export const getUsersList = () =>{
        axios.get('/api/messages',{
		headers : {
		}
	})
            .then((response)=>{
                let users;
                if(typeof response.data == 'string'){
                    users = JSON.parse(response.data).messages;
                } else {
                    users = response.data.messages;
                }
                document.getElementById('usersList').innerHTML = ""
                
                users.forEach(function (userData, index) {
                    let notReadCount = userData.notReadCount
                    let message = userData.message;
                    let sender = userData.sender;
                    var isUserProfile = sender.profile
                        ? '<img src="' +
                          sender.profile +
                          '" class="rounded-circle avatar-xs" alt=""><span class="user-status"></span>'
                        : '<div class="avatar-xs"><span class="avatar-title rounded-circle bg-primary text-white"><span class="username">JL</span><span class="user-status"></span></span></div>';
                    // TODO
                    var isMessageCount = notReadCount
                        ? '<div class="ms-auto"><span class="badge badge-soft-danger rounded p-1 fs-10">' +
                          notReadCount +
                          "</span></div>"
                        : "";
                    var messageCount = notReadCount
                        ? '<a href="javascript: void(0);" class="unread-msg-user">'
                        : '<a href="javascript: void(0);">';
                    // END TODO
                    //var activeClass = sender.id === 1 ? "active" : "";
                    var profile = sender.profile
                        ? '<img src="' +
                          sender.profile +
                          '" class="rounded-circle avatar-xs" alt=""><span class="user-status"></span>'
                        : '<div class="avatar-xs"><span class="avatar-title rounded-circle bg-primary text-white"><span class="username">' +
                          sender.name +
                          '</span><span class="user-status"></span></span></div>';
                    profile += `<input type="hidden" class="_user-uuid" value="${sender.uuid}" \>`
                    document.getElementById("usersList").innerHTML +=
                        '<li id="contact-id-' +
                            sender.id +
                            '" data-name="favorite">\
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
                                        sender.name +
                                        '</p>\
                                        <p class="text-truncate text-muted fs-13 mb-0">' +
                                        message.content +
                                        "</p>\
                                    </div>\
                                    " +
                                        isMessageCount +
                                        "\
                                </div>\
                            </a>\
                        </li>";
                toggleSelected();
                })
                document.querySelectorAll('#usersList li').forEach((item) =>{
                    item.addEventListener("click", function (event) {
                        let unreadMessage = item.querySelector('.d-flex .ms-auto')
                        if(unreadMessage){
                            unreadMessage.style.display = 'none'
                        }
                        item.currentSelectedChat = "users";
                        updateSelectedChat();
                        let uuid = item.querySelector('._user-uuid').value
                        document.getElementById("users-conversation").setAttribute('selected-chat',uuid)
                        var contactName = item.querySelector(".chat-username").innerHTML;
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
                            "none";
                        document.querySelector(
                            ".user-profile-status"
                        ).style.display = "none";

                        var contactImg = item
                            .querySelector(".avatar-xs")
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
                        fetchMessages(uuid);
                    })
                })
            })
            .finally(() =>{
                if(!document.getElementById("users-conversation").getAttribute('selected-chat')){
			if(document.querySelector('#usersList li'))
                    document.querySelector('#usersList li').click()
                }
                
            })
        
    }
export const contactList = () => {
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
                    "none";
                document.querySelector(
                    ".user-profile-status"
                ).style.display = "none";


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

window.addEventListener('load',() => {
    // profile user edit
    document
        .getElementById("user-profile-edit-btn")
        .addEventListener("click", function (e) {
            document
                .querySelectorAll(".edit-input .form-control")
                .forEach(function (item) {
                    var editIcon = document.getElementById("edit-icon");
                    if (item.disabled) {
                        editIcon.classList.replace("bxs-pencil", "bxs-save");
                        item.disabled = false;
                    } else {
                        let name = document.getElementById('editName').value;
                        let email = document.getElementById('editEmail').value;
                        const formData = new FormData();
                        formData.append('name',name)
                        formData.append('email',email)
                        axios.post('/api/user/update', formData);
                        editIcon.classList.replace("bxs-save", "bxs-pencil");
                        item.disabled = true;
                    }
                });
        });


})
