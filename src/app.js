define(
    [
        "angular",
        "ui-router",
        "ui-bootstrap"
    ],
    function(angular)
    {
		try
		{
			return angular.module("fooding");
		}
		catch(err)
		{
			return angular.module('fooding', ['ng', 'ui.router', 'ui.bootstrap', 'ngMaterial'])
				.controller('index', ["$scope", "$state", function($scope, $state)
				{
					$state.go("home");
				}])
				.config([
					"$compileProvider",
					"$httpProvider",
					function($compileProvider, $httpProvider)
					{
						$compileProvider.debugInfoEnabled(false);
						$httpProvider.useApplyAsync(true);
					}
				]);
		}
    });