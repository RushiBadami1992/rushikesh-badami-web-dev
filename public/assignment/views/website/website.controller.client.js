/**
 * Created by rushi on 5/29/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController)
        .controller("WebsiteListController",WebsiteListController)
        .controller ("NewWebsiteController",NewWebsiteController);

    function EditWebsiteController($location, $routeParams, WebsiteService,$http) {

        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        // var website=WebsiteService.findWebsiteById(website);
        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;
        var id=$routeParams.websiteId;
        function init() {
            WebsiteService
                .findWebsiteById(id,$http)
                .then(function (response) {
                    vm.website=response.data;
                });
        }
        init();
        function deleteWebsite(websiteId) {

            WebsiteService
                .deleteWebsite(id,$http)
                .then(
                    function(response){
                        console.log("Delete Working");
                        vm.success="Updated Website successfully"
                        $location.url("/user/" +vm.userId+"/website");
                    },
                    function(error) {
                        vm.error = "Unable to remove website"
                    }
                );

        }

        function updateWebsite(website) {
            WebsiteService
                .updateWebsite(id,website,$http)
                .then(
                    function(response) {
                        vm.success = "Updated website successfully";
                        $location.url("/user/" +vm.userId+"/website");
                    },
                    function(error) {
                        vm.error = "Unable to update website";
                    }
                );


        }
    }
    function WebsiteListController($routeParams, WebsiteService,$http) {
        var vm = this;
        vm.userId = $routeParams.userId;
        var id=$routeParams.userId
        function init() {
            WebsiteService
                .findAllWebsitesForUser(id,$http)
                .then(function(response){
                    vm.websites = response.data;
                });
        }
        init();
    }
    function NewWebsiteController($location, $routeParams, WebsiteService,$http) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.createWebsite = createWebsite;

        function createWebsite(name,description) {
            WebsiteService
                .createWebsite(vm.userId,name, description,$http)
                .then(function (response) {
                    var website = response.data;
                    console.log("In this function");
                    if (website) {
                        $location.url("/user/" +website.developerId+"/website");
                    }
                });
        }
    }
    
    
    
})();