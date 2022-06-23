<div class="side-menu flex-lg-column">
    <!-- LOGO -->
    <div class="navbar-brand-box">
        <a href="index" class="logo logo-dark">
            <span class="logo-sm">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30">
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path
                        d="M7.291 20.824L2 22l1.176-5.291A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10a9.956 9.956 0 0 1-4.709-1.176zm.29-2.113l.653.35A7.955 7.955 0 0 0 12 20a8 8 0 1 0-8-8c0 1.334.325 2.618.94 3.766l.349.653-.655 2.947 2.947-.655zM7 12h2a3 3 0 0 0 6 0h2a5 5 0 0 1-10 0z" />
                </svg>
            </span>
        </a>

        <a href="index" class="logo logo-light">
            <span class="logo-sm">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30">
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path
                        d="M7.291 20.824L2 22l1.176-5.291A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10a9.956 9.956 0 0 1-4.709-1.176zm.29-2.113l.653.35A7.955 7.955 0 0 0 12 20a8 8 0 1 0-8-8c0 1.334.325 2.618.94 3.766l.349.653-.655 2.947 2.947-.655zM7 12h2a3 3 0 0 0 6 0h2a5 5 0 0 1-10 0z" />
                </svg>
            </span>
        </a>
    </div>
    <!-- end navbar-brand-box -->

    <!-- Start side-menu nav -->
    <div class="flex-lg-column my-0 sidemenu-navigation">
        <ul class="nav nav-pills side-menu-nav" role="tablist">
            <li class="nav-item d-none d-lg-block">
                <a class="nav-link" id="pills-user-tab" data-bs-toggle="pill" href="#pills-user" role="tab">
                    <i class="ri-user-3-line"></i>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link active" id="pills-chat-tab" data-bs-toggle="pill" href="#pills-chat" role="tab">
                    <i class="ri-discuss-line"></i>
                    <span class="badge bg-danger fs-11 rounded-pill sidenav-item-badge">9</span>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="pills-contacts-tab" data-bs-toggle="pill" href="#pills-contacts" role="tab">
                    <i class="ri-contacts-book-line"></i>
                </a>
            </li>
            <li class="nav-item d-none d-lg-block">
                <a class="nav-link" id="pills-setting-tab" data-bs-toggle="pill" href="#pills-setting" role="tab">
                    <i class="ri-settings-4-line"></i>
                </a>
            </li>
            <li class="nav-item dropdown profile-user-dropdown">
                <a class="nav-link dropdown-toggle bg-light" href="#" role="button" data-bs-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">
                    <img src="{{auth()->user()->profile}}" alt="" class="profile-user rounded-circle">
                </a>
                <div class="dropdown-menu">
                    <a class="dropdown-item d-flex align-items-center justify-content-between" id="pills-user-tab"
                        data-bs-toggle="pill" href="#pills-user" role="tab">Profile <i
                            class="bx bx-user-circle text-muted ms-1"></i></a>
                    <a class="dropdown-item d-flex align-items-center justify-content-between" id="pills-setting-tab"
                        data-bs-toggle="pill" href="#pills-setting" role="tab">Setting <i
                            class="bx bx-cog text-muted ms-1"></i></a>
                    <div class="dropdown-divider"></div>
                    <form id="loggout-form" action="{{route('logout')}}" method="POST">
                        @csrf
                        <button type='submit' class="dropdown-item d-flex align-items-center justify-content-between"">Log out <i class="bx bx-log-out-circle text-muted ms-1"></i></button>
                    </form>
                </div>
            </li>
        </ul>
    </div>
    <!-- end side-menu nav -->
</div>