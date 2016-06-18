(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService($http) {
        var api = {
            createUser: createUser,
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            findUserById: findUserById,
            updateUser: updateUser,
            deleteUser: deleteUser,
            loggedIn: loggedIn,
            login:login,
            logout:logout,
            register:register
        };
        return api;
        function loggedIn() {
            return $http.get("/api/loggedIn");
        }
        function createUser(username, password,password2) {
            if(password===password2) {
                var user = {
                    username: username,
                    password: password
                };
                return $http.post("/api/user", user);
            }
            else
            {
                return null;
            }
        }
        function register(username, password) {
            var user = {
                username: username,
                password: password
            };
            return $http.post("/api/register", user);
        }
        function logout()
        {
            return $http.post("/api/logout")
                ;
        }
        function login(username,password)
        {
            var user = {
                username: username,
                password: password
            };
            return $http.post("/api/login", user);
        }
        function deleteUser(userId) {
            var url = "/api/user/" + userId;
            return $http.delete(url);
        }

        function updateUser(id, newUser) {
            var url = "/api/user/" + id;
            return $http.put(url, newUser);
        }

        function findUserById(id) {
            var url = "/api/user/" + id;
            return $http.get(url);
        }

        function findUserByUsernameAndPassword(username, password) {
            var url = "/api/user?username="+username+"&password="+password;
            return $http.get(url);
        }
    }
})();