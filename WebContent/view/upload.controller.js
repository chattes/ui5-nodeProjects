sap.ui.define(['sap/m/MessageToast',
            'sap/ui/core/mvc/Controller',
            'jquery.sap.global','sap/ui/model/json/JSONModel'],function(MessageToast, Controller, jQuery, JSONModel){
    "use strict";
    var delay=1000;
    var that;
    var uploadController = Controller.extend("imgPloadr.view.upload",{
        onInit: function(){
            //set Data Model
            var sServiceUrl = "http://localhost:3300/";
            var oModel = new JSONModel();


            /*			$.ajax({
             url:sServiceUrl,
             contentType: "application/json",
             dataType:'jsonP'
             }).done(function(data){
             this.setModel(data);
             console.log(data);

             }).fail(function(jqXHR, textStatus,errorThrown){

             console.log(arguments);
             }).always(function(jqXHR, textStatus,errorThrown){
             console.log("Done");
             });
             */

            oModel.loadData(sServiceUrl);
            sap.ui.getCore().setModel(oModel, "image");
                        
        },
        handleUploadComplete: function(oEvent) {

            //Convert RAW response to JSON Object
            var image = JSON.parse(oEvent.getParameters().responseRaw);
            if(image){
                MessageToast.show("Image Uploaded");

                setTimeout(function() {
                    //your code to be executed after 1 second
                    var oRouter = sap.ui.core.UIComponent.getRouterFor(that);
                    oRouter.navTo("image",{
                        image_id:image.uniqueId
                    });

                }, delay);
            }

            
        },
        handleUploadPress: function(oEvent){
            var oFileUploader = this.getView().byId("fileUploader");
            //var file = oFileUploader.oFileUpload.files[0];
            oFileUploader.setSendXHR(true);
            oFileUploader.setUploadUrl("http://localhost:3300/images/");
            oFileUploader.addParameter(new sap.ui.unified.FileUploaderParameter({
                name:"title",
                value: this.getView().byId("title").getValue()
            }));

            oFileUploader.addParameter(new sap.ui.unified.FileUploaderParameter({
                name:"description",
                value:this.getView().byId("description").getValue()
            }));
            // Store Reference- Required for Call Back Event to get Router on handleUploadComplete
            that = this;

             oFileUploader.upload();

            //Using Form Data and Ajax POST---- ALTERNATIVE METHOD TO UPLOAD 
/*            var formData = new FormData();
            formData.append("file",oFileUploader.oFileUpload.files[0],"file");
            console.log(formData.get("test"));
/!*            var xhr = new XMLHttpRequest();
            xhr.open('POST',"http://localhost:3300/images/", true);
            // Set up a handler for when the request finishes.
            xhr.onload = function () {
                this.handleUploadPress();
            };
            xhr.setRequestHeader("Content-Type","multipart/form-data");
           xhr.send(formData);*!/

            jQuery.ajax({
                url: 'http://localhost:3300/images/',
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                type: 'POST',
                success: function(data){
                    alert(data);
                }
            });*/


        }

    });
    return uploadController;

});

