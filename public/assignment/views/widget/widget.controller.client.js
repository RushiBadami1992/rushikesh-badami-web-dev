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
        console.log("Userid"+vm.userId);
        function init() {
            vm.widgets = WidgetService.findWidgetsForPageId(pageId);
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
        function selectWidget(widgetType)
        {

            var newWidget=WidgetService.createWidget(id,widgetType);
            $location.url("/user/"+vm.userId + "/website/"+vm.websiteId + "/page/" + vm.pageId + "/widget/" + newWidget._id);
        }
    }
    function EditWidgetController($routeParams,$location,WidgetService)
    {
        var vm=this;
        vm.websiteId=$routeParams.websiteId;
        vm.userId=$routeParams.userId;
        vm.pageId=$routeParams.pageId;
        vm.widgetId=$routeParams.widgetId;

        vm.deleteWidget=deleteWidget;
        vm.updateWidget=updateWidget;
        console.log(vm.widgetId);
        function init()
        {
            vm.widget=WidgetService.findWidgetById(vm.widgetId);

        }
        init();
        function deleteWidget()
        {
            var result=WidgetService.deleteWidget(vm.widgetId);
            console.log(result);
            if(result)
            {
                $location.url("/user/"+vm.userId + "/website/"+vm.websiteId + "/page/" + vm.pageId + "/widget");

            }
            else
            {
                vm.error="Unable to Delete Widget" ;
            }
        }
        function updateWidget()
        {
            var result=WidgetService.updateWidget(vm.widgetId,vm.widget);
            if(result)
            {
                $location.url("/user/"+vm.userId + "/website/"+vm.websiteId + "/page/" + vm.pageId + "/widget/");
            }
            else
            {
                vm.error="Unable to Update Widget"
            }
        }
    }
})();