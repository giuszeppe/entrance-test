<!doctype html>
<html lang="en">

    <head>
        
        @include("partials/title-meta", {"title": "Starter Page"})

        @include("partials/head-css")

    </head>

    @include("partials/body")

        <div class="layout-wrapper d-lg-flex">

            <!-- Start left sidebar-menu -->
            @include("partials/sidebar-menu")
            <!-- end left sidebar-menu -->
            
        </div>
        <!-- end  layout wrapper -->

        @include("partials/vendor-scripts")

        <!-- theme-style init -->
        <script src="js/pages/theme-style.init.js"></script>
        <script src="js/app.js"></script>

    </body>
</html>
