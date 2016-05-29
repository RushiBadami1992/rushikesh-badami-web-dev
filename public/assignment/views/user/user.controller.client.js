(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("ProfileController", ProfileController)
        .controller("RegisterController",RegisterController);
    
    function LoginController($location, UserService) {
        var vm = this;

        vm.login = function(username, password) {
            var user = UserService.findUserByUsernameAndPassword(username, password);
            if(user) {
                $location.url("/profile/" + user._id);
            } else {
                vm.error = "User not found";
            }
        }
    }

    function ProfileController($location,$routeParams, UserService) {
        var vm = this;
        vm.updateUser = updateUser;

        var id = $routeParams.id;

        function init() {
            vm.user = UserService.findUserById(id);
        }
        init();

        function updateUser(newUser) {
            if(UserService.updateUser(id, newUser))
            {
                $location.url("/profile/"+id);
            }
            else
            {
                vm.error="Update failed";
            }
        }
    }
    function RegisterController($location,UserService)
    {
        var vm=this;
        vm.register=function(username,password,rpassword)
        {
            var user=UserService.createUser(username,password,rpassword);
            if(user)
            {
                $location.url("/profile/"+user._id);
            }
            else
            {
                vm.error="Registration failed due to incorrect passwords";
            }
        }
    }
})();