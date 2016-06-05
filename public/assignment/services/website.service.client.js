(function(){
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService() {
        var api = {
            createWebsite: createWebsite,
            deleteWebsite: deleteWebsite,
            findAllWebsitesForUser :findAllWebsitesForUser,
            updateWebsite:updateWebsite,
            findWebsiteById:findWebsiteById

        };
        return api;


        function deleteWebsite(websiteId,$http) {
            var url = "/api/website/"+websiteId;
            console.log(url);
            return $http.delete(url);
        }

        function createWebsite(developerId, name, desc,$http) {
            var newWebsite = {
                name: name,
                description: desc,
                developerId: developerId
            };

            return $http.post("/api/user/"+developerId+"/website", newWebsite);
        }
        function findAllWebsitesForUser(userId,$http)
        {
            var url = "/api/user/"+userId+"/website";
            console.log(url);
            return $http.get(url);


        }
    }
    function updateWebsite(websiteId,website,$http)
    {
        var url = "/api/website/" + websiteId;
        return $http.put(url,website);

    }
    function findWebsiteById(websiteId,$http)
    {
        var url="/api/website/"+websiteId;
        return  $http.get(url);
    }
})();