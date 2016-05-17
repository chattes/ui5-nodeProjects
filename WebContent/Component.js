sap.ui.define(['sap/ui/core/UIComponent',
        "sap/ui/model/json/JSONModel",
        "sap/ui/model/resource/ResourceModel"
    ],
    function(UIComponent, JSONModel, ResourceModel) {
        "use strict";



        var Component = UIComponent.extend("imgPloadr.Component", {



            metadata: {
                rootView: "imgPloadr.view.MainContainer",
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

                routing: {
                    config: {
                        routerClass: "sap.m.routing.Router",
                        viewType: "XML",
                        viewPath: "imgPloadr.view",
                        controlId: "app",
                        controlAggregation: "pages",
                    },
                    routes: [{
                        pattern: "",
                        name: "upload",
                        target: "upload"
                    }, {
                        pattern: "image/{image_id}",
                        name: "image",
                        target: "image"
                    }],

                    targets: {
                        upload: {
                            viewName: "upload"
                        },
                        image: {
                            viewName: "image"
                        }
                    }



                }
            },



            init: function() {
                //set Data Model
                var sServiceUrl = "http://localhost:3300/";
                var oModel = new JSONModel();
                

                /*			$.ajax({
                				url:sServiceUrl,
                				contentType: "application/json",
                				dataType:'jsonP'
                			}).done(function(data){
                				this.setModel(data);
                				console.log(data);

                			}).fail(function(jqXHR, textStatus,errorThrown){

                				console.log(arguments);
                			}).always(function(jqXHR, textStatus,errorThrown){
                				console.log("Done");
                			});
                */

                oModel.loadData(sServiceUrl);
                sap.ui.getCore().setModel(oModel, "image");
                //console.log(this.getModel("image"));
                //Call Init Function of Parent -- Super Class Call
                UIComponent.prototype.init.apply(this, arguments);

                // create the views based on the url/hash
                this.getRouter().initialize();

            }
        });

        return Component;

    });
