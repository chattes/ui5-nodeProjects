sap.ui.define(['sap/m/MessageToast', 'sap/ui/core/mvc/Controller'],
    function(MessageToast, Controller) {
        "use strict";

        var ControllerController = Controller.extend("imgPloadr.view.upload", {
            handleUploadComplete: function(oEvent) {
                var sResponse = oEvent.getParameter("response");
                if (sResponse) {
                    var sMsg = "";
                    var m = /^\[(\d\d\d)\]:(.*)$/.exec(sResponse);
                    if (m[1] == "200") {
                        sMsg = "Return Code: " + m[1] + "\n" + m[2], "SUCCESS", "Upload Success";
                        oEvent.getSource().setValue("");
                    } else {
                        sMsg = "Return Code: " + m[1] + "\n" + m[2], "ERROR", "Upload Error";
                    }

                    MessageToast.show(sMsg);

                }
            },

            handleUploadPress: function(oEvent) {
                /*			var oFileUploader = this.getView().byId("fileUploader");
                			oFileUploader.upload();
                */
                var oItem = oEvent.getSource();
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("test");

            }
        });

        return ControllerController;

    });
