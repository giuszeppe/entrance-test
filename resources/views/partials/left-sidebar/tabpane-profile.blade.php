<!-- Start profile content -->
<div>
    <div class="user-profile-img">
        <img src="images/4902908.jpg" class="profile-img" style="height: 160px;" alt="">
        <div class="overlay-content">
            <div>
                <div class="user-chat-nav p-2 ps-3">

                    <div class="d-flex w-100 align-items-center">
                        <div class="flex-grow-1">
                            <h5 class="text-white mb-0">My Profile</h5>
                        </div>
                        <div class="flex-shrink-0">
                            <div class="dropdown">
                                <button class="btn nav-btn text-white dropdown-toggle" type="button"
                                    data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class='bx bx-dots-vertical-rounded'></i>
                                </button>
                                <div class="dropdown-menu dropdown-menu-end">
                                    <a class="dropdown-item d-flex align-items-center justify-content-between"
                                        href="#">Info <i class="bx bx-info-circle ms-2 text-muted"></i></a>
                                    <a class="dropdown-item d-flex align-items-center justify-content-between"
                                        href="#">Setting <i class="bx bx-cog text-muted ms-2"></i></a>
                                    <div class="dropdown-divider"></div>
                                    <a class="dropdown-item d-flex align-items-center justify-content-between"
                                        href="#">Help <i class="bx bx-help-circle ms-2 text-muted"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="text-center border-bottom border-bottom-dashed pt-2 pb-4 mt-n5 position-relative">
        <div class="mb-lg-3 mb-2">
            <img src="{{auth()->user()->profile}}" class="rounded-circle avatar-lg img-thumbnail" alt="">
        </div>

        <h5 class="fs-17 mb-1 text-truncate">{{Auth::user()->name}}</h5>
        <p class="text-muted fs-14 text-truncate mb-0">STATUS</p>
    </div>
    <!-- End profile user -->

    <!-- Start user-profile-desc -->
    <div class="p-4 profile-desc" data-simplebar>
        <div class="text-muted">
            <p class="mb-3">DESCRIZIONE</p>
        </div>

        <div class="border-bottom border-bottom-dashed mb-4 pb-2">
            <div class="d-flex py-2 align-items-center">
                <div class="flex-shrink-0 me-3">
                    <i class="bx bx-user align-middle text-muted fs-19"></i>
                </div>
                <div class="flex-grow-1">
                    <p class="mb-0">{{Auth::user()->name}}</p>
                </div>
            </div>
            {{--
                // TODO RIMUOVI
            <div class="d-flex py-2 align-items-center">
                <div class="flex-shrink-0 me-3">
                    <i class="ri-phone-line align-middle text-muted fs-19"></i>
                </div>
                <div class="flex-grow-1">
                    <p class="mb-0">+(365) 1456 12584</p>
                </div>
            </div>--}}

            <div class="d-flex py-2 align-items-center">
                <div class="flex-shrink-0 me-3">
                    <i class="ri-message-2-line align-middle text-muted fs-19"></i>
                </div>
                <div class="flex-grow-1">
                    <p class="fw-medium mb-0">{{Auth::user()->email}}</p>
                </div>
            </div>

            {{--
                // TODO RIMUOVI
            <div class="d-flex py-2 align-items-center">
                <div class="flex-shrink-0 me-3">
                    <i class="ri-map-pin-2-line align-middle text-muted fs-19"></i>
                </div>
                <div class="flex-grow-1">
                    <p class="mb-0">California, USA</p>
                </div>
            </div>
            --}}
        </div>

    </div>
    <!-- end user-profile-desc -->
</div>
<!-- End profile content -->