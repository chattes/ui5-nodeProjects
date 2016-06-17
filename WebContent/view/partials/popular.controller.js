sap.ui.define([
		'jquery.sap.global',
		'sap/m/MessageToast',
		'sap/ui/core/mvc/Controller',
		'sap/ui/model/json/JSONModel',
		'sap/ui/model/type/DateTime'

	], function(jQuery, MessageToast, Controller, JSONModel, DateTime) {
	
	"use strict";
 
	var popularController = Controller.extend("imgPloadr.view.partials.popular", {
 
		onInit: function () {
			// set model

			this.getView().setModel(sap.ui.getCore().getModel("image"));
			console.log(this.getView().getModel("image"));
		},
 
		onIconPress: function (oEvent) {
			
			var image = oEvent.getSource().getBindingContext().getObject();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("image",{
				image_id:image.fileName.split(".")[0]
			});

		}
	});
 
 
	return popularController;
 
});