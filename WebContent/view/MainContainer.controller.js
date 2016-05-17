sap.ui.define(['jquery.sap.global', 'sap/ui/core/mvc/Controller', 'sap/ui/model/json/JSONModel', 'sap/ui/Device'],
	function(jQuery, Controller, JSONModel, Device) {
	"use strict";

	var DynamicSideContent = Controller.extend("imgPloadr.view.MainContainer", {
		onInit : function () {},
		onAfterRendering: function () {
/*			var sCurrentBreakpoint = this._oDSC.getCurrentBreakpoint();
			this.updateToggleButtonState(sCurrentBreakpoint);
*/		},
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
		}
	});

	return DynamicSideContent;

});
