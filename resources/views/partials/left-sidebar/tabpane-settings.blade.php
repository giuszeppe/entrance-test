<!-- Start Settings content -->
<div>
    <div class="user-profile-img">
        <img src="images/small/img-4.jpg" class="profile-img profile-foreground-img" style="height: 160px;"
            alt="">
        <div class="overlay-content">
            <div>
                <div class="user-chat-nav p-3">

                    <div class="d-flex w-100 align-items-center">
                        <div class="flex-grow-1">
                            <h5 class="text-white mb-0">Settings</h5>
                        </div>
                        <div class="flex-shrink-0" style="display:none">
                            <div class="avatar-xs p-0 rounded-circle profile-photo-edit" data-bs-toggle="tooltip"
                                data-bs-trigger="hover" data-bs-placement="bottom" title="Change Background">
                                <input id="profile-foreground-img-file-input" type="file"
                                    class="profile-foreground-img-file-input">
                                <label for="profile-foreground-img-file-input" class="profile-photo-edit avatar-xs">
                                    <span class="avatar-title rounded-circle bg-light text-body">
                                        <i class="bx bxs-pencil"></i>
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="text-center p-3 p-lg-4 border-bottom pt-2 pt-lg-2 mt-n5 position-relative">
        <div class="mb-3 profile-user">
            <img src="{{Auth::user()->profile}}"
                class="rounded-circle avatar-lg img-thumbnail user-profile-image" alt="user-profile-image">
            <div class="avatar-xs p-0 rounded-circle profile-photo-edit">
                <input id="profile-img-file-input" name="profile_pic" type="file" class="profile-img-file-input">
                <label for="profile-img-file-input" class="profile-photo-edit avatar-xs">
                    <span class="avatar-title rounded-circle bg-light text-body">
                        <i class="bx bxs-camera"></i>
                    </span>
                </label>
            </div>
        </div>

        <h5 class="fs-16 mb-1 text-truncate"></h5>



    </div>
    <!-- End profile user -->

    <!-- Start User profile description -->
    <div class="user-setting" data-simplebar>
        <div id="settingprofile" class="accordion accordion-flush">
            <div class="accordion-item">
                <div class="accordion-header" id="headerpersonalinfo">
                    <a class="accordion-button fs-14 fw-medium" data-bs-toggle="collapse" href="#personalinfo"
                        aria-expanded="true" aria-controls="personalinfo">
                        <div class="d-flex align-items-center">
                            <div class="flex-shrink-0 me-3 avatar-xs">
                                <div class="avatar-title bg-soft-info text-info rounded">
                                    <i class="bx bxs-user"></i>
                                </div>
                            </div>
                            Personal Info
                        </div>
                    </a>
                </div>
                <div id="personalinfo" class="accordion-collapse collapse show" aria-labelledby="headerpersonalinfo"
                    data-bs-parent="#settingprofile">
                    <div class="accordion-body edit-input">
                        <div class="float-end">
                            <a href="#" class="badge bg-light text-muted" id="user-profile-edit-btn"> <i
                                    class="bx bxs-pencil align-middle" id="edit-icon"></i>
                            </a>
                        </div>

                        <div>
                            <label for="editName" class="form-label text-muted fs-13">Name</label>
                            <input type="text" class="form-control" id="editName" value="{{Auth::user()->name}}"
                                placeholder="Enter name" disabled>
                        </div>

                        <div>
                            <label for="editEmail" class="form-label text-muted fs-13">Email</label>
                            <input type="email" class="form-control" id="editEmail"
                                value="{{auth()->user()->email}}" placeholder="Enter email" disabled>
                        </div>
                    </div>
                </div>
            </div>
            <!-- end personal info card -->


            <div class="accordion-item">
                <div class="accordion-header" id="headerhelp">
                    <button class="accordion-button fs-14 fw-medium collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapsehelp" aria-expanded="false" aria-controls="collapsehelp">
                        <div class="d-flex align-items-center">
                            <div class="flex-shrink-0 me-3 avatar-xs">
                                <div class="avatar-title bg-soft-info text-info rounded">
                                    <i class="bx bxs-help-circle"></i>
                                </div>
                            </div>
                            Help
                        </div>
                    </button>
                </div>
                <div id="collapsehelp" class="accordion-collapse collapse" aria-labelledby="headerhelp"
                    data-bs-parent="#settingprofile">
                    <div class="accordion-body">
                        <ul class="list-unstyled vstack gap-4 mb-0">
                            <li>
                                <h5 class="fs-13 mb-0"><a href="#" class="text-body d-block">FAQs</a></h5>
                            </li>
                            <li>
                                <h5 class="fs-13 mb-0"><a href="#" class="text-body d-block">Contact</a></h5>
                            </li>
                            <li>
                                <h5 class="fs-13 mb-0"><a href="#" class="text-body d-block">Terms & Privacy policy</a>
                                </h5>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!-- end profile-setting-accordion -->
    </div>
    <!-- End User profile description -->
</div>
<!-- Start Settings content -->