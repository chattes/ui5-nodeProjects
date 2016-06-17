sap.ui.define(['sap/m/MessageToast',
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/json/JSONModel',
    'jquery.sap.global'], function (MessageToast, Controller,JSONModel, jQuery) {
    "use strict";
    var sServiceURL = "http://localhost:3300/auth/register";
    var that;
    var RegController = Controller.extend("imgPloadr.view.Registration", {

        onInit: function(){

            console.log("View Loaded");

        },

        handleRegister: function (oEvent) {


            var loginDetails = {
                name:this.byId("Name").getValue(),
                email:this.byId("Email").getValue(),
                password:this.byId("Password").getValue()
            };
            console.log(loginDetails);
            var oModel = new JSONModel();
            oModel.attachRequestCompleted(function(data){

                //Refresh Model after state has changed
                if(data.getParameters().success){

                    //Route to Login Page-TEST-TODO
                    var oRouter = sap.ui.core.UIComponent.getRouterFor(that);
                    oRouter.navTo("login");


                }else{
                    MessageToast.show("Errors Occured during Registration");
                }


            },this);
            that = this;
            oModel.loadData(sServiceURL,loginDetails,false,"POST",false);




        }

    });
    return RegController;

});

