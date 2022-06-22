<meta charset="utf-8" />
<title>{{ config('app.name', 'Laravel') }}</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta content="MwChat - Chat Application developed in Laravel with Pusher" name="description" />
<meta name="keywords" content="Chat application"/>
<meta content="social" name="author" />
<meta name="uuid" content="{{Auth::user()->uuid ?? null}}">
<meta name="csrf" content="{{csrf_token()}}">
<!-- App favicon -->
<link rel="shortcut icon" href="images/favicon.ico" id="tabIcon">