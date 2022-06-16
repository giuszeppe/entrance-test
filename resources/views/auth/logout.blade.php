@extends('auth.layouts.auth')
@section('content')
<div class="row justify-content-center my-auto">
    <div class="col-sm-8 col-lg-6 col-xl-5 col-xxl-4">

        <div class="py-md-5 py-4 text-center">

            <div class="avatar-xl mx-auto">
                <div class="avatar-title bg-soft-primary text-primary h1 rounded-circle">
                    <i class="bx bxs-user"></i>
                </div>
            </div>
            <div class="mt-4 pt-2">
                <h5>You are Logged Out</h5>
                <p class="text-muted fs-15">Thank you for using <span
                        class="fw-semibold text-dark">{{config('app.name')}}</span></p>
                <div class="mt-4">
                    <a href="{{route('login')}}"
                        class="btn btn-primary w-100 waves-effect waves-light">Sign In</a>
                </div>
            </div>
        </div>
    </div><!-- end col -->
</div><!-- end row -->
@endsection