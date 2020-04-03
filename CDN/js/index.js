(function() {
  console.log("checkSystemRequirements");
  console.log(JSON.stringify(ZoomMtg.checkSystemRequirements()));

  // it's option if you want to change the WebSDK dependency link resources. setZoomJSLib must be run at first
  // if (!china) ZoomMtg.setZoomJSLib('https://source.zoom.us/1.7.2/lib', '/av'); // CDN version default
  // else ZoomMtg.setZoomJSLib('https://jssdk.zoomus.cn/1.7.2/lib', '/av'); // china cdn option
  // ZoomMtg.setZoomJSLib('http://localhost:9999/node_modules/@zoomus/websdk/dist/lib', '/av'); // Local version default, Angular Project change to use cdn version
  ZoomMtg.preLoadWasm();

  ZoomMtg.prepareJssdk();

  var API_KEY = "gmZMQI3CTZibx4nHxUrIEg";

  /**
   * NEVER PUT YOUR ACTUAL API SECRET IN CLIENT SIDE CODE, THIS IS JUST FOR QUICK PROTOTYPING
   * The below generateSignature should be done server side as not to expose your api secret in public
   * You can find an eaxmple in here: https://marketplace.zoom.us/docs/sdk/native-sdks/web/essential/signature
   */
  var API_SECRET = "DJJ77ngof0AH1WDJAVJ73XY4J2xfrulJGfwK";

  document
    .getElementById("join_meeting")
    .addEventListener("click", function(e) {
      e.preventDefault();

      if (!this.form.checkValidity()) {
        alert("Enter Name and Meeting Number");
        return false;
      }

      var meetConfig = {
        apiKey: API_KEY,
        apiSecret: API_SECRET,
        meetingNumber: parseInt(
          document.getElementById("meeting_number").value
        ),
        userName: document.getElementById("display_name").value,
        passWord: "",
        leaveUrl: "https://zoom.us",
        role: 0
      };

      var signature = ZoomMtg.generateSignature({
        meetingNumber: meetConfig.meetingNumber,
        apiKey: meetConfig.apiKey,
        apiSecret: meetConfig.apiSecret,
        role: meetConfig.role,
        success: function(res) {
          console.log(res.result);
        }
      });

      ZoomMtg.init({
        leaveUrl: "http://www.zoom.us",
        isSupportAV: true,
        success: function() {
          ZoomMtg.join({
            meetingNumber: meetConfig.meetingNumber,
            userName: meetConfig.userName,
            signature: signature,
            apiKey: meetConfig.apiKey,
            userEmail: "email@gmail.com",
            passWord: meetConfig.passWord,
            success: function(res) {
              // $('#nav-tool').hide();
              $("#join_meeting").hide();
              $("#meeting_number").hide();
              $("#display_name").hide();
              console.log("join meeting success");
            },
            error: function(res) {
              console.log(res);
            }
          });
        },
        error: function(res) {
          console.log(res);
        }
      });
    });
})();
