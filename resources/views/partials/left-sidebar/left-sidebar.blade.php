<div class="chat-leftsidebar">
    <div class="tab-content">
        <!-- Start Profile tab-pane -->
        <div class="tab-pane" id="pills-user" role="tabpanel" aria-labelledby="pills-user-tab">
            @include("partials/left-sidebar/tabpane-profile")
        </div>
        <!-- End Profile tab-pane -->

        <!-- Start chats tab-pane -->
        <div class="tab-pane show active" id="pills-chat" role="tabpanel" aria-labelledby="pills-chat-tab">
            @include("partials/left-sidebar/tabpane-chats")
        </div>
        <!-- End chats tab-pane -->

        <!-- Start contacts tab-pane -->
        <div class="tab-pane" id="pills-contacts" role="tabpanel" aria-labelledby="pills-contacts-tab">
            @include("partials/left-sidebar/tabpane-contacts")
        </div>
        <!-- End contacts tab-pane -->

        <!-- Start calls tab-pane -->
        <div class="tab-pane" id="pills-calls" role="tabpanel" aria-labelledby="pills-calls-tab">
            @include("partials/left-sidebar/tabpane-calls")
        </div>
        <!-- End calls tab-pane -->

        <!-- Start bookmark tab-pane -->
        <div class="tab-pane" id="pills-bookmark" role="tabpanel" aria-labelledby="pills-bookmark-tab">
            @include("partials/left-sidebar/tabpane-bookmark")
        </div>
        <!-- End bookmark tab-pane -->

        <!-- Start settings tab-pane -->
        <div class="tab-pane" id="pills-setting" role="tabpanel" aria-labelledby="pills-setting-tab">
            @include("partials/left-sidebar/tabpane-settings")
        </div>
        <!-- End settings tab-pane -->
    </div>
    <!-- end tab content -->
</div>