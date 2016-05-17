sap.ui.define([
    'jquery.sap.global',
    'sap/m/MessageToast',
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/json/JSONModel',
    'sap/ui/model/type/DateTime',
    'imgPloadr/utils/libs/jquery.timeago'

], function(jQuery, MessageToast, Controller, JSONModel, DateTime, timeAgo) {

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


/*            var time = new timeAgo();
            console.log(timeAgo);*/

            var dateFormatted = function(isoTime){
                var dt = isoTime.split(/[: T-]/).map(parseFloat);
                return new Date(dt[0], dt[1] - 1, dt[2], dt[3] || 0, dt[4] || 0, dt[5] || 0, 0);

            }(timestamp);
            console.log(dateFormatted);

            var getTimeAgo = function(commentDate){

                var today = new Date().getTime();
                var diff = Math.abs(today - Date.parse(commentDate));
                diff = Math.abs(Math.floor(diff))/1000;
                var days = Math.floor(diff / (24 * 60 * 60));
                return days;

            }(dateFormatted);



            return getTimeAgo + " days ago";

            /*			sap.ui.require(["imgPloadr/utils/libs/jquery.timeago"],function(timeAgoUtil){
            				return timeAgoUtil.timeago(timestamp);
            			});*/



        }
    });


    return commentsController;

});
