/**
 * Created by rushi on 5/28/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController",RegisterController);

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