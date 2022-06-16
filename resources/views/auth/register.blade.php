@extends('auth.layouts.auth')
@section('content')
<div class="row justify-content-center my-auto">
    <div class="col-sm-8 col-lg-6 col-xl-6">
        <div class="py-md-5 py-4">
            <div class="text-center mb-5">
                <h3>Register Account</h3>
                <p class="text-muted">Get your free {{config('app.name')}} account now.</p>
            </div>
            <form class="needs-validation" novalidate method="POST" action="{{route('register')}}">
                @csrf
                <div class="mb-3">
                    <label for="useremail" class="form-label">Email</label>
                    <input type="email" class="form-control" id="useremail"
                        name='email' 
                        placeholder="Enter email" 
                        value="{{old('email')}}"
                        required>

                    <div class="invalid-feedback">
                        Please Enter Email
                    </div>
                </div>
                <div class="mb-3">
                    <label for="username" class="form-label">Username</label>
                    <input name='name' type="text" class="form-control" id="username"
                        placeholder="Enter username" 
                        value="{{old('name')}}"
                        required>
                    <div class="invalid-feedback">
                        Please Enter Username
                    </div>
                </div>

                <div class="mb-3">
                    <label for="userpassword" class="form-label">Password</label>
                    <input type="password" class="form-control" id="userpassword" name='password'
                        placeholder="Enter password" required>
                    <div class="invalid-feedback">
                        Please Enter Password
                    </div>
                </div>
                <div class="mb-3">
                    <label for="userpassword_confirmation" class="form-label">Password</label>
                    <input type="password" class="form-control" id="userpassword_confirmation" name='password_confirmation'
                        placeholder="Enter password" required>
                    <div class="invalid-feedback">
                        Please Enter Password
                    </div>
                </div>

                <div class="mb-4">
                    <p class="mb-0">By registering you agree to the {{config('app.name')}} <a href="#"
                            class="text-primary">Terms of Use</a></p>
                </div>

                <div class="mb-3">
                    <button class="btn btn-primary w-100 waves-effect waves-light"
                        type="submit">Register</button>
                </div>
            <div class="mt-5 text-center text-muted">
                <p>Already have an account ? <a href="{{route('login')}}"
                        class="fw-medium text-decoration-underline">Login</a></p>
            </div>
        </div>
    </div><!-- end col -->
</div><!-- end row -->

{{--
    // TODO Password Confirmation match
    @if($errors->any())
    {{print_r($errors)}}
    <script>
        
    </script>
    @endif
--}}
@endsection