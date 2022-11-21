<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body>
<x-guest-layout>
    <x-auth-card>
        <x-slot name="logo">
            <div class="text-center">
                <x-application-logo class="w-20 h-20 fill-current text-gray-500" style="width:10rem;height: 10rem;"/>
            </div>
        </x-slot>

        <!-- Session Status -->
        <x-auth-session-status class="mb-4" style="background-color: #212529 !important;":status="session('status')" />

        <!-- Validation Errors -->
        <x-auth-validation-errors class="mb-4" :errors="$errors" />

        <div class="container mt-3 border" style="width: 45%;">
        <form method="POST" action="{{ route('login') }}">
            @csrf

            <!-- Email Address -->
            <div class="mb-3 mt-3">
            <label for="email" :value="__('Email')" >Email:</label>
            <input id="email" class="form-control" type="email" name="email" :value="old('email')" required autofocus >
            </div>

            <!-- Password -->
            <div class="mb-3 mt-3">
                <label for="password" :value="__('Password')">Password:</label>

                <input id="password" class="form-control"
                                type="password"
                                name="password"
                                required autocomplete="current-password">
            </div>

            <!-- Remember Me -->
            <div class="block mt-3 mb-3">
                <label for="remember_me" class="inline-flex items-center">
                    <input id="remember_me" type="checkbox" class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" name="remember">
                    <span class="ml-2 text-sm text-gray-600">{{ __('Remember me') }}</span>
                </label>
            </div>

            <div class="mt-3 mb-3" style="text-align: right;">
                @if (Route::has('password.request'))
                    <a class="text-sm text-gray-600 hover:text-gray-900" href="{{ route('password.request') }}">
                        {{ __('Forgot your password?') }}
                    </a>
                @endif

                <button class="btn btn-success">
                    {{ __('Log in') }}
                </button>
            </div>
        </form>
        </div>
    </x-auth-card>
</x-guest-layout>
</body>
