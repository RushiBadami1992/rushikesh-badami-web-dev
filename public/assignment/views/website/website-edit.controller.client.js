(function(){
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

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
})();