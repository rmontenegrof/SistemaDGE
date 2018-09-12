<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>{{ config('app.name', 'Laravel') }}</title>
        <!--<link rel="stylesheet" href="http://localhost/sistema_dge/public{{ elixir('css/public.css') }}">-->
        <link rel="stylesheet" href="{{ elixir('css/public.css') }}">


        <!-- #GOOGLE FONT -->
        <link href="http://fonts.googleapis.com/css?family=Lato:300,400,400italic,600,700|Raleway:300,400,500,600,700|Crete+Round:400italic" rel="stylesheet" type="text/css" />
        <link rel="shortcut icon" href="{{ asset('img/favicon.ico') }}">
        <link rel="stylesheet" href="build/css/styles.css">
        <link rel="stylesheet" href="build/css/usach.css">
        <script>
            window.Laravel = <?php echo json_encode([
                'csrfToken' => csrf_token(),
                // 'assetsImage' => asset(''),
            ]); ?>
        </script>
    </head>
    <body ng-app='app' ng-strict-di class='ng-cloak' style="height:100vh;">
        <ui-view></ui-view>
        <!--<script src="http://localhost/sistema_dge/public{{ elixir('js/public.js') }}"></script>-->
        <script src="{{ elixir('js/public.js') }}"></script>



        <script>
            angular.module('app').run(['toastr', function(toastr) {
                var wasPasswordReset = '{{ session("status")  }}';
                if (wasPasswordReset) {
                    toastr.success(wasPasswordReset, 'Cambio exitoso de contraseña');
                }
            }]);
        </script>
    </body>
</html>
