console.log('js file loaded');
function processImage() {
   // **********************************************
   // *** Update or verify the following values. ***
   // **********************************************
    console.log('button clicked');
   var subscriptionKey = document.getElementById("subscriptionKey").value;
   var endpoint = document.getElementById("endpointUrl").value;
   
   var uriBase = endpoint + "vision/v3.0/analyze";

   // Request parameters.
   var params = {
       "visualFeatures": "Categories,Description,Color",
       "details": "",
       "language": "en",
   };

   // Display the image.
   var sourceImageUrl = document.getElementById("inputImage").value;
   document.querySelector("#sourceImage").src = sourceImageUrl;
   console.log('url', uriBase + "?" + $.param(params))
   // Make the REST API call.
   $.ajax({
       url: uriBase + "?" + $.param(params),

       // Request headers.
       beforeSend: function(xhrObj){
           xhrObj.setRequestHeader("Content-Type","application/json");
           xhrObj.setRequestHeader(
               "Ocp-Apim-Subscription-Key", subscriptionKey);
       },

       type: "POST",

       // Request body.
       data: '{"url": ' + '"' + sourceImageUrl + '"}',
   })

   .done(function(data) {
       // Show formatted JSON on webpage.
       console.log('data', data);
       $("#responseTextArea").val(JSON.stringify(data, null, 2));
       console.log('image text', data.description.captions[0].text);
       console.log(typeof data.description.captions[0].text);
       let altText=data.description.captions[0].text;
       $("#imgAltText").text(altText);
       console.log('confidence', data.description.captions[0].confidence);
       console.log(typeof data.description.captions[0].confidence);
       let confidence=Number.parseFloat(data.description.captions[0].confidence).toFixed(3).toString();
       $("#confidence").text(confidence);
   })

   .fail(function(jqXHR, textStatus, errorThrown) {
       // Display error message.
       var errorString = (errorThrown === "") ? "Error. " :
           errorThrown + " (" + jqXHR.status + "): ";
       errorString += (jqXHR.responseText === "") ? "" :
           jQuery.parseJSON(jqXHR.responseText).message;
       alert(errorString);
   });
};