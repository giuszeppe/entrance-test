<div class="position-relative">
    <div class="chat-input-section p-4 border-top">

        <form id="chatinput-form" enctype="multipart/form-data">
            <div class="row g-0 align-items-center">
                <div class="col">
                    <div class="position-relative">
                        <div class="chat-input-feedback">
                            Please Enter a Message
                        </div>
                        <input autocomplete="off" type="text"
                            class="form-control form-control-lg bg-light border-0 chat-input" autofocus
                            id="chat-input" placeholder="Type your message...">
                        <div class="chat-input-typing">
                            <span class="typing-user d-flex">Victoria Lane
                                is
                                typing
                                <span class="typing ms-2">
                                    <span class="dot"></span>
                                    <span class="dot"></span>
                                    <span class="dot"></span>
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="col-auto">
                    <div class="chat-input-links ms-2 gap-md-1">
                        <div class="links-list-item">
                            <button type="submit"
                                class="btn btn-primary btn-lg chat-send waves-effect waves-light"
                                data-bs-toggle="collapse" data-bs-target=".chat-input-collapse1.show">
                                <i class="bx bxs-send align-middle" id="submit-btn"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
    <div class="replyCard">
        <div class="card mb-0">
            <div class="card-body py-3">
                <div class="replymessage-block mb-0 d-flex align-items-start">
                    <div class="flex-grow-1">
                        <h5 class="conversation-name"></h5>
                        <p class="mb-0"></p>
                    </div>
                    <div class="flex-shrink-0">
                        <button type="button" id="close_toggle"
                            class="btn btn-sm btn-link mt-n2 me-n3 fs-18">
                            <i class="bx bx-x align-middle"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>