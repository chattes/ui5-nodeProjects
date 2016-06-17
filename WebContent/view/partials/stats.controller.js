sap.ui.define(['sap/m/MessageToast','sap/ui/core/mvc/Controller',"sap/ui/model/json/JSONModel"],
	function(MessageToast, Controller, JSONModel) {
	"use strict";
 
	var StatsController = Controller.extend("imgPloadr.view.partials.stats", {
		
		onInit: function(){


			//var imgModel = this.getView().getModel("image");
			this.getView().setModel(sap.ui.getCore().getModel("image"),"image");
// Register Events for Communication Between Two View Controllers
			var oEventBus = sap.ui.getCore().getEventBus();
			oEventBus.subscribe("imgPloadr.view.image","onLike",this.onModelChanged,this);

		},
		onModelChanged:function (sChannel,sEvent,oData) {
			console.log(oData);
			this.getView().setModel(oData,"imageDet");
		}


	});
 
	return StatsController;
 
});