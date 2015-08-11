var require = 
    {
        paths:
        {
            "angular": "dependencies/angular/angular.min",
            "angular-animate":"dependencies/angular-animate/angular-animate.min",
            "angular-aria":"dependencies/angular-aria/angular-aria.min",
            "angular-material":"dependencies/angular-material/angular-material.min",
            "ui-router": "dependencies/ui-router/release/angular-ui-router.min",
            "app": "app",
            "ui-bootstrap": "dependencies/angular-bootstrap/ui-bootstrap-tpls.min",
            "jquery": "dependencies/jquery/dist/jquery.min"
        },
        shim:
        {
            "app":
            {
                deps: ["ui-router", "ui-bootstrap", "angular-material"]
            },
            "ui-router":
            {
                deps: ["angular"]
            },
            "angular": 
            {
                exports: "angular",
                deps: ["jquery"]
            },
            "ui-bootstrap":
            {
                deps: ["angular"]
            },
            "angular-material":
            {
                deps: ["angular", "angular-animate", "angular-aria"]
            },
            "angular-animate":
            {
                deps: ["angular"]
            },
            "angular-aria":
            {
                deps: ["angular"]
            }
        },
        deps:
        [
        ]
    };