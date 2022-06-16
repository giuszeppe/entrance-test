<!doctype html>
<html lang="en">

<head>

    @include("partials/title-meta", ["title" => "Register"])

    @include("partials/head-css")

</head>

@include("partials/body")

<div class="auth-bg">
    <div class="container p-0">
        <div class="row justify-content-center g-0">
            <div class="col-xl-9 col-lg-8">
                <div class="authentication-page-content shadow-lg">
                    <div class="d-flex flex-column h-100 px-4 pt-4">
                        @yield('content')

                        <div class="row">
                            <div class="col-xl-12">
                                <div class="text-center text-muted p-4">
                                    <p class="mb-0">&copy;
                                        <script>document.write(new Date().getFullYear())</script> {{config('app.name')}}. Crafted with <i
                                            class="mdi mdi-heart text-danger"></i> by MwSpace
                                    </p>
                                </div>
                            </div><!-- end col -->
                        </div><!-- end row -->

                    </div>
                </div>
            </div>
            <!-- end col -->
        </div>
        <!-- end row -->
    </div>
    <!-- end container-fluid -->
</div>
<!-- end auth bg -->

@include("partials/vendor-scripts")
<!-- validation init -->
<script src="js/pages/validation.init.js"></script>

<!-- theme-style init -->
<script src="js/pages/theme-style.init.js"></script>

<script src="js/app.js"></script>

</body>

</html>