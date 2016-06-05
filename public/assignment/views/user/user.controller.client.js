(function(){
        angular
            .module("WebAppMaker")
            .controller("LoginController", LoginController)
            .controller("ProfileController",ProfileController)
            .controller("RegisterController",RegisterController);
        function LoginController($location, UserService) {
            var vm = this;

            vm.login = function(username, password) {
                UserService
                    .findUserByUsernameAndPassword(username, password)
                    .then(function(response){
                        console.log(response);
                        var user = response.data;
                        if(user._id) {
                            $location.url("/user/" + user._id);
                        } else {
                            vm.error = "User not found";
                        }
                    });
            }
        }
        function ProfileController($location, $routeParams, UserService) {
            var vm = this;
            vm.updateUser = updateUser;
            vm.unregister = unregister;

            var id = $routeParams.id;

            function init() {
                UserService
                    .findUserById(id)
                    .then(function(response){
                    vm.user = response.data;
                });
            }
            init();

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

        function register(username, password, password2) {
            UserService
                .createUser(username, password)
                .then(function(response){
                    var user = response.data;
                    if(user) {
                        $location.url("/user/"+user._id);
                    }
                });
        }
    }


})();