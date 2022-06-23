
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
          <a class="dropdown-item d-flex align-items-center justify-content-between reply-message" href="#" id="reply-message-' +
      messageIds +
      '" data-bs-toggle="collapse" data-bs-target=".replyCollapse">Reply <i class="bx bx-share ms-2 text-muted"></i></a>\
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
      <div class="flex-shrink-0">\
          <div class="dropdown">\
              <a href="#" class="text-muted dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
                  <i class="bx bx-dots-vertical-rounded align-middle"></i>\
              </a>\
              <div class="dropdown-menu dropdown-menu-end">\
                  <a class="dropdown-item d-flex align-items-center justify-content-between" href="#">Edit <i class="bx bx-pencil ms-2 text-muted"></i></a>\
                  <a class="dropdown-item d-flex align-items-center justify-content-between" href="#">Block <i class="bx bx-block ms-2 text-muted"></i></a>\
                  <a class="dropdown-item d-flex align-items-center justify-content-between" href="#">Remove <i class="bx bx-trash ms-2 text-muted"></i></a>\
              </div>\
          </div>\
      </div>\
  </div>\
</li>'
}