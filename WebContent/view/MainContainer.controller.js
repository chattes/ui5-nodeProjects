sap.ui.define(['jquery.sap.global', 'sap/ui/core/mvc/Controller', 'sap/ui/model/json/JSONModel', 'sap/ui/Device'],
	function(jQuery, Controller, JSONModel, Device) {
	"use strict";

	var DynamicSideContent = Controller.extend("imgPloadr.view.MainContainer", {
		onInit : function () {

			//set Data Model
			var sServiceUrl = "http://localhost:3300/";
			var oModel = new JSONModel();


			oModel.loadData(sServiceUrl);
			sap.ui.getCore().setModel(oModel, "image");

/*			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("home").attachPatternMatched(this._onObjectMatched,this);*/

		},
		_onObjectMatched: function(oEvent){
// Call Backend Service to Get details of the Image Clicked

/*			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("upload");*/
		},		
		onAfterRendering: function () {
/*			var sCurrentBreakpoint = this._oDSC.getCurrentBreakpoint();
			this.updateToggleButtonState(sCurrentBreakpoint);
*/

		},
		handleSliderChange: function (oEvent) {
			var iValue = oEvent.getParameter("value");
			this.updateControlWidth(iValue);
		},
		updateControlWidth: function (iValue) {
			var $DSCContainer = this.getView().byId("sideContentContainer").$();
			
			if (iValue) {
				$DSCContainer.width(iValue + "%");
			}
		},
		handleBreakpointChangeEvent: function (oEvent) {
			var sCurrentBreakpoint = oEvent.getParameter("currentBreakpoint");
			this.updateToggleButtonState(sCurrentBreakpoint);
			this.updateShowSideContentButtonVisibility(sCurrentBreakpoint);
		},
		updateToggleButtonState: function (sCurrentBreakpoint) {
/*			var oToggleButton = this.getView().byId("toggleButton");
			oToggleButton.setEnabled(sCurrentBreakpoint === "S");
*/		},
		updateShowSideContentButtonVisibility: function (sCurrentBreakpoint) {
/*			var bShowButton = !(sCurrentBreakpoint === "S" || this._oDSC.getShowSideContent());
			this._showSideContentButton.setVisible(bShowButton);
*/		},
		handleToggleClick: function (oEvent) {
			this.getView().byId("DynamicSideContent").toggle();
		},
		handleSideContentHide: function (oEvent) {
			this._oDSC.setShowSideContent(false);
			this.updateShowSideContentButtonVisibility(this._oDSC.getCurrentBreakpoint());
		},
		handleSideContentShow: function (oEvent) {
			this._oDSC.setShowSideContent(true);
			this.updateShowSideContentButtonVisibility(this._oDSC.getCurrentBreakpoint());
		},
		navButtonPress: function(oEvent){
            window.back();
        }
	});

	return DynamicSideContent;

});
