/**
 * Created by rushi on 6/4/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);
function PageService ($http){
    var api = {
        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage
    };
    return api;

    function deletePage(pageId) {
        var url = "/api/page/" + pageId;
        return $http.delete(url);
    }

    function updatePage(pageId, page) {
        var url = "/api/page/" + pageId;
        return $http.put(url, page);

    }

    function createPage(name, description, websiteId) {
        var newPage = {
            name: name,
            title: description,
            
        };
        return $http.post("/api/website/" + websiteId + "/page", newPage);
    }

    function findPageById(pageId) {
        var url = "/api/page/" + pageId;
        return $http.get(url);

    }

    function findAllPagesForWebsite(websiteId) {
        var url = "/api/website/" + websiteId + "/page";
        return $http.get(url);

    }
}
})();