sap.ui.define(['sap/m/MessageToast',
        'sap/ui/core/mvc/Controller',
        'sap/ui/model/json/JSONModel',
        'jquery.sap.global'],
    function(MessageToast, Controller,JSONModel, jQuery) {
        "use strict";
        //var that;
        var sServiceURL = "http://localhost:3300/auth/login";
        var LoginController = Controller.extend("imgPloadr.view.Login", {

            onInit: function(){

/*
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.getRoute("login").attachPatternMatched(this._onObjectMatched,this);
*/



            },

/*            _onObjectMatched: function(oEvent){
                //Call Backend API and check session details

                var sServiceUrl = "http://localhost:3300/auth/check";
                var oModel = new JSONModel( );
                oModel.attachRequestCompleted(function (data) {
                    if(data.getParameters().success){

                    }else{
                        MessageToast.show("Errors Occured during Registration");
                    }

                });
                oModel.loadData(sServiceUrl);

            },*/


            handleLogin: function (oEvent) {
                var loginDetails = {
                    email:this.byId("Email").getValue(),
                    password:this.byId("Password").getValue()
                };
                //More Elegant way Bind Function for Later call in Callback , instead of This and THAT!!!
                //No Need to Store the "THIS" in "THAT"
                var myRouter = sap.ui.core.UIComponent.getRouterFor.bind(this,this);
                //that = this;

                console.log(loginDetails);
                var oModel = new JSONModel();
                oModel.attachRequestCompleted(function(data){

                    //Refresh Model after state has changed
                    if(data.getParameters().success){

                        // No need for storing "THIS" in any variable as we have Bound the function call to myRouter
                        //var oRouter = sap.ui.core.UIComponent.getRouterFor(that);
                        var oRouter = myRouter();
                        // Main Content
                        oRouter.navTo("upload");


                    }else{
                        MessageToast.show("Unable to login");
                    }


                });

                oModel.loadData(sServiceURL,loginDetails,false,"POST",false);
            },

            handleNewUser: function (oEvent) {
                //Route to Login Page-TEST-TODO
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("register");


            }




        });

        return LoginController;

    });