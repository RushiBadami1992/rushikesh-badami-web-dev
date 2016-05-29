/**
 * Created by rushi on 5/29/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController)
        .controller("NewPageController",NewPageController)
        .controller("PageListController",PageListController);
    function NewPageController($location,$routeParams,PageService)
    {
        var vm=this
        vm.userId=$routeParams.userId;
        vm.websiteId=$routeParams.websiteId;
        vm.createPage=createPage;
        function createPage(name,description)
        {
            var newPage={
                _id:(new Date()).getTime()+"",
                name:name
            };
            var newPage=PageService.createPage(vm.websiteId,newPage);
            if(newPage) {
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/");
            } else {
                vm.error = "Unable to create website";
            }
        }
    }
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
    function EditPageController($location,$routeParams,PageService)
    {
        var vm=this;
        vm.userId=$routeParams.userId;
        vm.websiteId=$routeParams.websiteId;
        vm.pageId=$routeParams.pageId;
        vm.deletePage=deletePage;
        vm.updatePage=updatePage;
        var id=$routeParams.pageId;

        function init()
        {

            vm.page=PageService.findPageById(id);
            console.log(vm.page);
        }
        init();
        function deletePage(pageId)
        {
            var result=PageService.deletePage(pageId);
            if(result)
            {
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
            }
            else
            {
                vm.error="Unable to Delete";
            }
        }

        function updatePage(pageId,page)
        {
            var result=PageService.updatePage(pageId,page);
            if(result)
            {
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
            }
            else
            {
                vm.error="Unable to Delete";
            }

        }
    }
})();