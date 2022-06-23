<div id="users-chat" class="position-relative">
    <div class="py-3 user-chat-topbar">
        <div class="row align-items-center">
            <div class="col-sm-4 col-8">
                <div class="d-flex align-items-center">
                    <div class="flex-shrink-0 d-block d-lg-none me-3">
                        <a href="javascript: void(0);" class="btn-primary user-chat-remove fs-18 p-1"><i
                                class="bx bx-chevron-left align-middle"></i></a>
                    </div>
                    <div class="flex-grow-1 overflow-hidden">
                        <div class="d-flex align-items-center">
                            <div class="flex-shrink-0 chat-user-img online user-own-img align-self-center me-3 ms-0">
                                <img src="images/users/avatar-2.jpg" class="rounded-circle avatar-sm" alt="">
                                <span class="user-status"></span>
                            </div>
                            <div class="flex-grow-1 overflow-hidden">
                                <h6 class="text-truncate mb-0 fs-18"><a href="#"
                                        class="user-profile-show text-reset">Victoria Lane</a></h6>
                                <p class="text-truncate text-muted mb-0"><small>Online</small></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-8 col-4">
                <ul class="list-inline user-chat-nav text-end mb-0">
                    <li class="list-inline-item">
                        <div class="dropdown">
                            <button class="btn nav-btn dropdown-toggle" type="button" data-bs-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false">
                                <i class='bx bx-dots-vertical-rounded'></i>
                            </button>
                            <div class="dropdown-menu dropdown-menu-end">
                                <a class="dropdown-item d-flex justify-content-between align-items-center d-lg-none user-profile-show"
                                    href="#">View Profile <i class="bx bx-user text-muted"></i></a>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

    </div>
    <!-- end chat user head -->

    <!-- start chat conversation -->

    <div class="chat-conversation p-3 p-lg-4 " id="chat-conversation" data-simplebar>
        <ul class="list-unstyled chat-conversation-list" id="users-conversation">
        </ul>
    </div>

    <div class="alert alert-warning alert-dismissible copyclipboard-alert px-4 fade show" id="copyClipBoard"
        role="alert">
        Message copied
    </div>
    <!-- end chat conversation end -->
</div>