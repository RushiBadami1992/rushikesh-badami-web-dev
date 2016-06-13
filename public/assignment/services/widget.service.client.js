(function() {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);
    function WidgetService($http) {
        var api = {
            createWidget: createWidget,
            findWidgetByPageId: findWidgetByPageId,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget,
            reorderWidget:reorderWidget
        };
        return api;


        function createWidget(pageID, newWidget) {
            var url = "/api/page/" + pageID + "/widget";
            return $http.post(url, newWidget);
        }

        function findWidgetByPageId(pageId) {
            console.log("Page Client js");
            console.log(pageId);
            var url = "/api/page/" + pageId + "/widget";
            return $http.get(url);
        }

        function findWidgetById(widgetID) {
            var url = "/api/widget/" + widgetID;
            return $http.get(url);
        }

        function updateWidget(widgetID, newWidget) {
            var url = "/api/widget/" + widgetID;
            return $http.put(url, newWidget);
        }

        function deleteWidget(widgetID) {
            var url = "/api/widget/" + widgetID;
            return $http.delete(url);
        }
        function reorderWidget(start, end,pageId) {
            var url = "/api/page/" + pageId + "/widget?start=" + start + "&end=" + end;
            return $http.put(url);
        }
        
    }
})();