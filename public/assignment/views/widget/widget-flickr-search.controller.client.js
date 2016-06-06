(function(){
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController", FlickrImageSearchController);
    
    function FlickrImageSearchController($routeParams, FlickrService, WidgetService, $location) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;
        vm.widgetId = $routeParams.widgetId;
        vm.searchPhotos = searchPhotos;
        vm.selectPhoto = selectPhoto;
        vm.searchPhotos = searchPhotos;
        vm.selectPhoto=selectPhoto;
        function searchPhotos(searchText) {
            FlickrService
                .searchPhotos(searchText)
                .then(function(response){
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;
                });
        }
        function init() {
            WidgetService
                .findWidgetById(vm.widgetId)
                .then(function(response) {
                    vm.widget = response.data;
                })
        }
        init();

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
               vm.widget.url=url;
                    WidgetService
                    .updateWidget(vm.widgetId, vm.widget)
                    .then(function (response) {
                        var result = response.data;
                    if (response) {
                        vm.error = "";
                        vm.success = "Website successfully updated";
                        $location.url("/user/"+vm.userId + "/website/"+vm.websiteId + "/page/" + vm.pageId + "/widget");
                    } else {
                        vm.success = "";
                        vm.error = "Website not updated";
                    }
                });
            

        }
    }
})();