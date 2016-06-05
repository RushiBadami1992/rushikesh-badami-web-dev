/**
 * Created by rushi on 6/4/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams,PageService,$http)
    {
        var vm=this;
        vm.websiteId=$routeParams.websiteId;
        vm.userId=$routeParams.userId;
        console.log(vm.userId);
        console.log(vm.websiteId);
        function init() {
            PageService
                .findAllPagesForWebsite(vm.websiteId)
                .then(
                    function (response) {
                        vm.pages = response.data;
                    },
                    function (err) {
                        vm.error = err;
                    }
                );
        }

        init();


    }
})();