sap.ui.define([
    'jquery.sap.global',
    'sap/m/MessageToast',
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/json/JSONModel',
    'sap/ui/model/type/DateTime'


], function(jQuery, MessageToast, Controller, JSONModel, DateTime) {

    "use strict";

    var commentsController = Controller.extend("imgPloadr.view.partials.comments", {

        onInit: function() {
            // set model

            this.getView().setModel(sap.ui.getCore().getModel("image"));
            console.log(this.getView().getModel("image"));

        },

        onPress: function(oEvent) {
            MessageToast.show("Clicked on " + oEvent.getSource().getSender());
        },

        timeAgo: function(timestamp) {

           /*
           Working Section

            */
            jQuery.sap.require("my.moment.moment");//Works...Try another way
            return moment(timestamp).startOf('minute').fromNow();

            /*Experimental Section

             sap.ui.require("my/momentAPI/moment",function (momentload) {
             return moment(timestamp).startOf('minute').fromNow();
             });

             //sap.ui.require("my.moment.moment"); Doesn't Work

            */
        }
    });


    return commentsController;

});
