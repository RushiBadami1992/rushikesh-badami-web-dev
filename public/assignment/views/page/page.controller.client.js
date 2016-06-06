/**
 * Created by rushi on 6/4/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController",NewPageController)
        .controller("EditPageController",EditPageController);
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
    function  NewPageController($location,$routeParams,PageService,$http) {
        var vm=this
        vm.userId=$routeParams.userId;
        vm.websiteId=$routeParams.websiteId;
        vm.createPage=createPage;
        function createPage(name,description)
        {
            PageService
                .createPage(name,description,vm.websiteId)
                .then(function (response) {
                    var newPage = sresponse.data;
                    if (newPage) {
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                    }
                });
        }
    }
    function EditPageController($location,$routeParams,PageService)
    {
        var vm=this;
        vm.userId=$routeParams.userId;
        vm.websiteId=$routeParams.websiteId;
        vm.pageId=$routeParams.pageId;
        vm.deletePage=deletePage;
        vm.updatePage=updatePage;
        var id=$routeParams.pageId;

        function init() {
            PageService
                .findPageById(id)
                .then(function (response) {
                    vm.page=response.data;
                });
        }
        init();
        function deletePage(pageId) {

            PageService
                .deletePage(pageId)
                .then(
                    function(response){
                        //console.log("Delete Working");
                        vm.success="Updated Website successfully"
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                    },
                    function(error) {
                        vm.error = "Unable to remove website"
                    }
                );

        }

        function updatePage(pageId,page)
        {
            PageService
                .updatePage(id,page)
                .then(
                    function(response) {
                        vm.success = "Updated website successfully";
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                    },
                    function(error) {
                        vm.error = "Unable to update website";
                    }
                );


        }
    }
})();