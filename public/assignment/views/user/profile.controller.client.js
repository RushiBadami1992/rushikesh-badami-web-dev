(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

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

})();