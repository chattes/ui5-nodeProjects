sap.ui.define(['sap/m/MessageToast',
               'sap/ui/model/json/JSONModel',
               'sap/ui/core/mvc/Controller'],
	function(MessageToast, JSONModel, Controller) {
	"use strict";


	var PageController = Controller.extend("imgPloadr.view.image", {


		onInit: function(){

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("image").attachPatternMatched(this._onObjectMatched,this);
    

		},

		onPress: function (evt) {
			MessageToast.show(evt.getSource().getId() + " Pressed");
		},

		_onObjectMatched: function(oEvent){
// Call Backend Service to Get details of the Image Clicked

			var selImage = oEvent.getParameters("arguments");
			var sServiceUrl = "http://localhost:3300/images/"+selImage.arguments.image_id;
			var oModel = new JSONModel( );
			oModel.loadData(sServiceUrl);
			sap.ui.getCore().setModel(oModel, "imageDet");
			this.getView().setModel(sap.ui.getCore().getModel("imageDet"));


		},
		onLike: function(oEvent){
            console.log(this);

			var imageId = sap.ui.getCore().getModel("imageDet").getProperty("/image/fileName");
			var sServiceURL = "http://localhost:3300/images/"+imageId+"/like";
            var oModel = new JSONModel();
            oModel.attachRequestCompleted(function(data){
                // Set the New Model Once the Operation is completed
                //sap.ui.getCore().setModel(oModel,"imageDet");
            });
            oModel.loadData(sServiceURL,{},false,"POST",false);
            var refreshed = oModel.getData();
            this.getView().getModel().setProperty("/image/likes",refreshed.likes);
            var testModel = sap.ui.getCore().getModel("imageDet");

            var myView = sap.ui.getCore().byId("stats");
			var oEventBus = sap.ui.getCore().getEventBus();
			oEventBus.publish('image','onLike',sap.ui.getCore().getModel("imageDet"));

		}
	});

	return PageController;

});
