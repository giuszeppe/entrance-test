
export const getNewMessage = (messageIds,content,time,position = 'left') =>{

    return `<li class="chat-list ${position}" id="chat-list-` +
                    messageIds +
                    '" >\
                <div class="conversation-list">\
                    <div class="user-chat-content">\
                        <div class="ctext-wrap">\
                            <div class="ctext-wrap-content">\
                                <p class="mb-0 ctext-content">' +
                    content +
                    '</p>\
                            </div>' +
                            getDropdownMessage(messageIds) +
                            '</div>' +
                    '<div class="conversation-name">\
                        <small class="text-muted time">' +
                    time +
                    '</small>\
                        <span class="text-success check-message-icon"><i class="bx bx-check"></i></span>\
                    </div>\
                </div>\
            </div>\
        </li>'
}
export const getDropdownMessage = (messageIds) =>{

  return '<div class="align-self-start message-box-drop d-flex">\
  <div class="dropdown">\
      <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
          <i class="ri-more-2-fill"></i>\
      </a>\
      <div class="dropdown-menu">\
          <a class="dropdown-item d-flex align-items-center justify-content-between copy-message" href="#" id="copy-message-' +
      messageIds +
      '">Copy <i class="bx bx-copy text-muted ms-2"></i></a>\
          <a class="dropdown-item d-flex align-items-center justify-content-between delete-item" href="#">Delete <i class="bx bx-trash text-muted ms-2"></i></a>\
      </div>\
  </div>\
</div>'
}
export const getDropdownContact = (profile,user) =>{
  return '<li>\
  <div class="d-flex align-items-center">\
      <div class="flex-shrink-0 me-2">\
          <div class="avatar-xs">\
          ' +
              profile +
          '\
          </div>\
      </div>\
      <div class="flex-grow-1">\
          <h5 class="fs-14 m-0" >' +
              user.name +
          '</h5>\
      </div>\
  </div>\
</li>'
}