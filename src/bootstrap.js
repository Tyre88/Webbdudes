require(
    [
        "angular",
        "app",
        "./routing.js",
		"./controllers/home.js"
    ],
    function(angular)
    {
        return angular.bootstrap(document, ["fooding"]);
    });