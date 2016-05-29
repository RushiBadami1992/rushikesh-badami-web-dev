/**
 * Created by rushi on 5/29/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController)
        .controller("WebsiteListController",WebsiteListController)
        .controller ("NewWebsiteController",NewWebsiteController);
    function EditWebsiteController($location, $routeParams, WebsiteService) {

        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        // var website=WebsiteService.findWebsiteById(website);
        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;
        var id=$routeParams.websiteId;
        function init() {
            vm.website = WebsiteService.findWebsiteById(id);
        }
        init();
        function deleteWebsite(websiteId) {
            var result = WebsiteService.deleteWebsite(websiteId);
            if(result) {
                $location.url("/user/"+vm.userId+"/website");
            } else {
                vm.error = "Unable to delete website";
            }
        }

        function updateWebsite(websiteId,website) {
            vm.website=WebsiteService.findWebsiteById(website);
            var result=WebsiteService.updateWebsite(websiteId,website);
            if(result)
            {
                $location.url("/user/"+vm.userId+"/website");
            }
            else
            {
                vm.error="Unable to update website";
            }
        }
    }
    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.userId;

        function init() {
            vm.websites = WebsiteService.findWebsitesForUserId(vm.userId);
        }
        init();
    }
    function NewWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.createWebsite = createWebsite;

        function createWebsite(name, description) {
            var newWebsite = WebsiteService.createWebsite(vm.userId, name, description);
            if(newWebsite) {
                $location.url("/user/"+vm.userId+"/website");
            } else {
                vm.error = "Unable to create website";
            }
        }
    }
})();