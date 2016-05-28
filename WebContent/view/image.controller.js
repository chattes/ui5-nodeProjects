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

		onPostComment: function (evt) {

			var reqComment = {
				email:this.byId("idEmail").getValue(),
                comment:this.byId("idComment").getValue(),
                name:this.byId("idName").getValue()
			};
            console.log(reqComment);
            var oModel = new JSONModel();
            var imageId = sap.ui.getCore().getModel("imageDet").getProperty("/image/fileName");
            var sServiceURL = "http://localhost:3300/images/"+ imageId + "/comment";

            oModel.attachRequestCompleted(function(data){

				//Refresh Model after state has changed
				if(data.getParameters().success){
					this.getView().getModel().setData(data.getSource().oData);
					MessageToast.show("Comment Posted Succesfully");
					//Refresh Global Sidebar with new values
					sap.ui.getCore().getModel("image").setProperty("/sidebar",data.getSource().oData.sidebar,data.getSource().oData,true);
					console.log(sidebar);

				}else{
					MessageToast.show("Errors Occured while posting comment");
				}


            },this);
            oModel.loadData(sServiceURL,reqComment,false,"POST",false);




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
            var modelRefreshed = sap.ui.getCore().getModel("imageDet");

// Publish Event for model changed
			var oEventBus = sap.ui.getCore().getEventBus();
			oEventBus.publish('imgPloadr.view.image','onLike',modelRefreshed);

		}
	});

	return PageController;

});
