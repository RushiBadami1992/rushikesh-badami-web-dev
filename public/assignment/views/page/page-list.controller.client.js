/**
 * Created by rushi on 5/29/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);
        function PageListController($routeParams,PageService)
        {
            var vm=this;
            vm.websiteId=$routeParams.websiteId;
            vm.userId=$routeParams.userId;
            console.log(vm.userId);
            console.log(vm.websiteId);
            function init()
            {
                vm.pages=PageService.findPageByWebsiteId(vm.websiteId)
                console.log($routeParams.websiteId);
            }
            init();
        }
})();