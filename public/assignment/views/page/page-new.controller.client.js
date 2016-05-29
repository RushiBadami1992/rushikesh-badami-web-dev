/**
 * Created by rushi on 5/29/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController);
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

})();