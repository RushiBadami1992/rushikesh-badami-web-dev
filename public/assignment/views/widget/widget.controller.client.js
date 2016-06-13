/**
 * Created by rushi on 5/29/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("ChooseWidgetController", ChooseWidgetController)
        .controller("EditWidgetController", EditWidgetController);

    function WidgetListController($sce, $routeParams, WidgetService) {
        var vm = this;
        var pageId = $routeParams.pageId;
        vm.getSafeHtml = getSafeHtml;
        vm.getSafeUrl = getSafeUrl;
        vm.pageId=$routeParams.pageId;
        vm.websiteId=$routeParams.websiteId;
        vm.userId=$routeParams.userId;
        console.log("Userid"+vm.pageId);
        vm.sort = sort;
        function init() {
            WidgetService
                .findWidgetByPageId(vm.pageId)
                .then(function(response) {
                    vm.widgets = response.data;
                    console.log(vm.widgets);
                })

        }
        init();

        function getSafeHtml(widget) {
            return $sce.trustAsHtml(widget.text);
        }

        function getSafeUrl(widget) {
            var urlParts = widget.url.split("/");
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);

        }
        function sort(start, end) {
            WidgetService.reorderWidget(vm.pageId,start, end)
                .then(
                    function (response) {
                        init();
                    },
                    function (err) {
                        vm.error = err;
                    }
                );
        }

    }
    function ChooseWidgetController($routeParams,$location,WidgetService)
    {
       var vm=this;
        vm.userId=$routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId=$routeParams.pageId;
        vm.widget={};
        vm.selectWidget=selectWidget;
        var id=vm.pageId;
        var widget={};
        function selectWidget(widgetType)
        {
            var newWidget = {
                "widgetType": widgetType,
                };

            WidgetService
                .createWidget(vm.pageId, newWidget).
            then(function(response) {
                widget=response.data;
                if(widget)
                {
                    $location.url("/user/"+vm.userId + "/website/"+vm.websiteId + "/page/" + vm.pageId + "/widget/" + widget._id);
                }
                else
                {
                    vm.error="Something went wrong";
                }

            });

        }
    }
    function EditWidgetController($routeParams,$location,WidgetService) {
        var vm = this;
        vm.websiteId = $routeParams.websiteId;
        vm.userId = $routeParams.userId;
        vm.pageId = $routeParams.pageId;
        vm.widgetId = $routeParams.widgetId;

        vm.deleteWidget = deleteWidget;
        vm.updateWidget = updateWidget;
        console.log("Widget"+vm.widgetId);
        function init() {
            WidgetService
                .findWidgetById(vm.widgetId)
                .then(function (response) {
                    vm.widget = response.data;
                    console.log(vm.widget);
                });
            $(".container").sortable(
                {axis: "y"}
            );
        }

        init();
        function deleteWidget() {
            console.log("In delete");
            WidgetService
                .deleteWidget(vm.widgetId)
                .then(function (response) {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                })
        }


            function updateWidget() {
                WidgetService
                    .updateWidget(vm.widgetId, vm.widget)
                    .then(function (response) {
                        var result = response.data;
                        if (response) {
                            vm.error = "";
                            vm.success = "Widget successfully updated";
                            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                        } else {
                            vm.success = "";
                            vm.error = "Widget not updated";
                        }
                    })
            }


        function uploadImage()
        {
            console.log("Image upload called");
            $http.post("api/upload",vm.widget);
        }
    }
})();