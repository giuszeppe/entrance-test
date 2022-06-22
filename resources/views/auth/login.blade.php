@extends('auth.layouts.auth')
@section('content')
<div class="row justify-content-center">
    <div class="col-sm-8 col-lg-6 col-xl-6">

        <div class="py-md-5 py-4">

            <div class="text-center mb-5">
                <h3>Welcome Back !</h3>
                <p class="text-muted">Sign in to continue to {{config('app.name')}}</p>
            </div>
            <form id="login-form" action="{{route('login')}}" method="POST">
                @csrf
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input name="email" type="text" class="form-control" id="email"
                        placeholder="Enter email">
                </div>

                <div class="mb-3">
                    <div class="float-end">
                        <a href="auth-recoverpw" class="text-muted">Forgot password?</a>
                    </div>
                    <label for="userpassword" class="form-label">Password</label>
                    <div class="position-relative auth-pass-inputgroup mb-3">
                        <input type="password" class="form-control pe-5"
                            name="password" placeholder="Enter Password" id="password-input">
                        <button
                            class="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
                            type="button" id="password-addon"><i
                                class="ri-eye-fill align-middle"></i></button>
                    </div>
                </div>

                {{--
                <div class="form-check form-check-info fs-16">
                    <input class="form-check-input" type="checkbox" id="remember-check">
                    <label class="form-check-label fs-14" for="remember-check">
                        Remember me
                    </label>
                </div>
                --}}

                <div class="text-center mt-4">
                    <button class="btn btn-primary w-100" type="submit">Log In</button>
                </div>
            </form><!-- end form -->

            <div class="mt-5 text-center text-muted">
                <p>Don't have an account ? <a href="{{route('register')}}"
                        class="fw-medium text-decoration-underline"> Register</a></p>
            </div>
        </div>
    </div><!-- end col -->
</div><!-- end row -->
<script src="js/pages/login.js"> </script>

@if($errors->any())
{{dump($errors)}}
@endif
@endsection
