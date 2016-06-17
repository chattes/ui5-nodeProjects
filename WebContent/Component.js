sap.ui.define(['sap/ui/core/UIComponent',
        "sap/ui/model/json/JSONModel",
        "sap/ui/model/resource/ResourceModel"
    ],
    function(UIComponent, JSONModel, ResourceModel) {
        "use strict";



        var Component = UIComponent.extend("imgPloadr.Component", {



            metadata: {
                rootView: "imgPloadr.view.LoginScreenContainer",
                dependencies: {
                    libs: [
                        "sap.ui.layout",
                        "sap.m"
                    ]
                },
                includes: ["style.css"],
                config: {
                    sample: {
                        stretch: true,
                        files: [
                            "MainContainer.view.xml",
                            "MainContainer.controller.js",
                            "style.css"
                        ]
                    },

                    serviceConfig: {
                        name: "imgModel",
                        serviceUrl: "http://localhost:3300/"
                    }
                },

/*
                routing: {
                    config: {
                        routerClass: "sap.m.routing.Router",
                        viewType: "XML",
                        viewPath: "imgPloadr.view",
                        controlId: "app",
                        controlAggregation: "pages"
                                            },
                    routes: [
                        {
                            pattern: "",
                            name: "login",
                            /!*!//target: "login"*!/
                            view: "Login"
                        },
                        {
                            pattern: "register",
                            name: "register",
                            //target: "register"
                            view: "Registration"
                        },
                        {
                        pattern: "home",
                        name: "home",
                        //target: "home",
                        view: "MainContainer",
                        subroutes:[


                            {                            
                                pattern: "home",
                                name: "sidebar",
                                //target: "sideContent",
                                view: "SideContainer",
                                targetControl: "splitHomePage",
                                targetAggregation:"masterPages",
                                //preservePageInSplitContainer: "true",
                                subroutes: [{
                                    pattern: "image/{image_id}",
                                    name: "image",
                                    //target: "image",
                                    view: "image",
                                    targetAggregation:"detailPages",
                                    targetControl: "splitHomePage"
                                }]

                        }


                        ]
                        }
                       ],

                    targets: {
                        home: {
                            viewName: "MainContainer"
                        },
                        image: {
                            viewName: "image"
                        },
                        register: {
                            viewName: "Registration"
                        },
                        login: {
                            viewName: "Login"
                        },
                        upload: {
                            viewName: "upload"
                        },
                        sideContent: {
                            viewName: "SideContainer"
                        }


                    }



                }
*/
                routing:{
                    config:{
                        viewType: "XML",
                        viewPath: "imgPloadr.view",
                        targetAggregation: "pages",
                        clearTarget: true
                    },
                    routes:
                        [
                            {
                                pattern:"",
                                name:"login",
                                view:"Login",
                                viewPath:"imgPloadr.view",
                                targetControl: "app"
                            },
                            {
                                pattern: "register",
                                name: "register",
                                view: "Registration",
                                viewPath:"imgPloadr.view",
                                targetControl: "app"

                            },
                            {
                                pattern: "home",
                                name: "home",
                                view: "MainContainer",
                                viewPath:"imgPloadr.view",
                                targetControl:"app",
                                subroutes:[
                                    {
                                        pattern: "sidebar",
                                        name: "sidebar",
                                        view: "SideContainer",
                                        viewPath:"imgPloadr.view",
                                        targetControl: "splitHomePage",
                                        targetAggregation:"masterPages",
                                        preservePageInSplitContainer: "true",
                                        subroutes:[
                                            {
                                                pattern: "image/{image_id}",
                                                name: "image",
                                                view: "image",
                                                targetAggregation:"detailPages",
                                                viewPath:"imgPloadr.view"
                                            },
                                            {
                                                pattern: "upload",
                                                name: "upload",
                                                view: "upload",
                                                targetAggregation:"detailPages",
                                                viewPath:"imgPloadr.view"
                                            }
                                        ]

                                    }

                                ]


                            }



                            ]

                }
            },



            init: function() {
                //console.log(this.getModel("image"));
                //Call Init Function of Parent -- Super Class Call
                UIComponent.prototype.init.apply(this, arguments);

                // create the views based on the url/hash
                this.getRouter().initialize();

            }
        });

        return Component;

    });
