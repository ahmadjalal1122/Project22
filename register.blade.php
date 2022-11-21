<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js"></script>
</head>
<div>
<x-guest-layout>
    <x-auth-card>
        <x-slot name="logo">
            <div class="text-center">
                <x-application-logo class="w-20 h-20 fill-current text-gray-500" style="width:10rem;height: 10rem;" />
            </div>
        </x-slot>

        <!-- Validation Errors -->
        <x-auth-validation-errors class="mb-4" :errors="$errors" />

        <div class="container mt-3 border" style="width: 45%;">
        <form method="POST" action="{{ route('register') }}">
            @csrf

            <!-- Name -->
            <div class="mb-3 mt-3">
                <label for="name" :value="__('Name')">Name:</label>
                <input id="name" class="form-control" type="text" name="name" :value="old('name')" required autofocus/>
            </div>

            <!-- Email Address -->
            <div class="mb-3 mt-3">
                <label for="email" :value="__('Email')" >Email:</label>
                <input id="email" class="form-control" type="email" name="email" :value="old('email')" required>
            </div>

            <!-- Password -->
            <div class="mb-3 mt-3">
                <label for="password" :value="__('Password')"> Password:</label>

                <input id="password" class="form-control"
                                type="password"
                                name="password"
                                required autocomplete="new-password" >
            </div>

            <!-- Confirm Password -->
            <div class="mb-3 mt-3">
                <label for="password_confirmation" :value="__('Confirm Password')" >Confirm Password</label>

                <x-input id="password_confirmation" class="form-control"
                                type="password"
                                name="password_confirmation" required />
            </div>

            <div style="text-align: right;">
                <a class="underline text-sm text-gray-600 hover:text-gray-900" href="{{ route('login') }}">
                    {{ __('Already registered?') }}
                </a>

                <x-button class="btn btn-primary">
                    {{ __('Register') }}
                </x-button>
            </div>
        </form>
        </div>
    </x-auth-card>
</x-guest-layout>
</div>
