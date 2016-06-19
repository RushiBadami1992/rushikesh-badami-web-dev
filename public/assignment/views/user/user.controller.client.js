(function(){
        angular
            .module("WebAppMaker")
            .controller("LoginController", LoginController)
            .controller("ProfileController",ProfileController)
            .controller("RegisterController",RegisterController);
        function LoginController($location, UserService) {
            var vm = this;
            vm.formSubmit=false;
            vm.login = function(username, password) {
                vm.formSubmit=true;
                if(username && password) {
                    UserService
                        .login(username, password)
                        .then(function (response) {
                            console.log(response);
                            var user = response.data;
                            if (user) {
                                vm.formSubmit=false;
                                $location.url("/user");
                            } else {
                                vm.error = "User not found";
                            }
                        });
                }
                else
                {
                    vm.error="Username or Password  cannot be empty"
                }
            }
        }
        function ProfileController($location, $routeParams, UserService,$rootScope) {
            var vm = this;
            vm.updateUser = updateUser;
            vm.unregister = unregister;
            vm.logout=logout;
            
            var id = $rootScope.currentUser._id;

            function init() {
                UserService
                    .findUserById(id)
                    .then(function(response){
                    vm.user = response.data;
                });
            }
            init();
            function logout()
            {
                UserService
                    .logout()
                    .then(function (response){
                        $location.url("/login");
                    },
                    function() {
                        $location.url("/login");
                    });
            }
            function unregister() {
            UserService
                .deleteUser(id)
                .then(
                    function(){
                        $location.url("/login");
                    },
                    function() {
                        vm.error = "Unable to remove user"
                    }
                );
        }

        function updateUser(newUser) {
            UserService
                .updateUser(id, newUser)
                .then(
                    function(response) {
                        vm.success = "Updated successfully";
                    },
                    function(error) {
                        vm.error = "Unable to update user"
                    }
                );
        }
    }

    function RegisterController($location, UserService) {
        var vm = this;

        vm.register = register;
        vm.formSubmit=false;

        function register(username, password, password2) {
            vm.formSubmit=true;
            if(username && password && password2) {
                if (password === password2) {
                    UserService
                        .register(username, password)
                        .then(function (response) {
                            var user = response.data;
                            if (user) {
                                vm.formSubmit=false;
                                $location.url("/user");

                            }
                            else {
                                vm.error = "Username already taken";
                            }

                        },
                            function (error) {
                                vm.error = "Username already taken";
                            });
                }
                else
                {
                    vm.error="Password and verify password do not match";
                }
            }
            else
            {
             vm.error="Usename,Password or Verify Password cannot be empty";
            }
        }
    }


})();