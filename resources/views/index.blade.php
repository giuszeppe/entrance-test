<!doctype html>
<html lang="en">

<head>

    @include("partials/title-meta", ["title" => "Chat"])

    <!-- glightbox css -->
    <link rel="stylesheet" href="libs/glightbox/css/glightbox.min.css">

    <!-- One of the following themes -->
    <link rel="stylesheet" href="libs/@simonwep/pickr/themes/nano.min.css" /> <!-- 'classic' theme -->

    <!-- swiper css -->
    <link rel="stylesheet" href="libs/swiper/swiper-bundle.min.css">

    @include("partials/head-css")

</head>

<body>

<div class="layout-wrapper d-lg-flex">

    <!-- Start left sidebar-menu -->
    @include("partials/sidebar-menu")
    <!-- end left sidebar-menu -->

    <!-- start chat-leftsidebar -->
    @include('partials/left-sidebar/left-sidebar')
    <!-- end chat-leftsidebar -->

    <!-- Start User chat -->
    <div class="user-chat w-100 overflow-hidden">

        <div class="chat-content d-lg-flex">
            <!-- start chat conversation section -->
            <div class="w-100 overflow-hidden position-relative">
                <!-- conversation user -->
                @include("partials/conversation-user")

                <!-- conversation group -->
                @include("partials/conversation-group")

                <!-- chat input sction -->
                @include("partials/chat/chat-input")
            </div>
            <!-- end chat conversation section -->

            <!-- start User profile detail sidebar -->
            @include("partials/user-profile-details")
            <!-- end User profile detail sidebar -->
        </div>
        <!-- end user chat content -->
    </div>
    <!-- End User chat -->

    <!-- Start Add contact Modal -->
    @include('modals/contacts/addContact-modal')
    <!-- End Add contact Modal -->

    <!-- audiocall Modal -->
    @include('modals/audiocall-modal')

    <!-- videocall Modal -->
    @include('modals/videocall-modal')
    
    <!-- groupvideocall Modal -->
    @include('modals/groups/groupVideocall-modal')

    <!-- Start add group Modal -->
    @include('modals/groups/addGroup-modal')
    
    <!-- Start Add pinned tab Modal -->
    @include('modals/addPinnedTab-modal')

    <!-- forward Modal -->
    @include('modals/forward-modal')

    <!-- contactModal -->
    @include('modals/contacts/contact-modal')

</div>
<!-- end  layout wrapper -->

@include("partials/switcher")


@include("partials/vendor-scripts")

<!-- Modern colorpicker bundle -->
<script src="libs/@simonwep/pickr/pickr.min.js"></script>

<!-- glightbox js -->
<script src="libs/glightbox/js/glightbox.min.js"></script>

<!-- Swiper JS -->
<script src="libs/swiper/swiper-bundle.min.js"></script>

<!-- fg-emoji-picker JS -->
<script src="libs/fg-emoji-picker/fgEmojiPicker.js"></script>

<!-- page init -->
<script src="js/pages/index.init.js"></script>
<script src="js/pages/chat.js"></script>

<script src="js/app.js"></script>
</body>

</html>