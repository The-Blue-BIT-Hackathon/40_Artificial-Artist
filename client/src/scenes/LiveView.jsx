import React, { useEffect, useRef } from "react";
import { ZegoExpressEngine } from "zego-express-engine-webrtc";
import { useNavigate } from "react-router-dom";


const zg = new ZegoExpressEngine(
  1177888677,
  "47caa34558a92f641f8108bd91e08b0d"
);

function refreshPage() {
    window.location.reload(false);
  }

function LiveView() {
    const navigate = useNavigate();
  const localVideoRef = useRef();
  const videoRef = useRef();

  useEffect(() => {
    async function setup() {
      const userID = "test11";
      const userName = "user1";


        
      try {
        const result = await zg.loginRoom(
            "0001",
            "04AAAAAGQO+xoAEDhrM2hhbmtwMmdvMjA1a2QAsES6XWewruCRIrURqeayVjpnyYlq5muSHOiY2KvzawnAjVnByX5B1C1x5LDqmmh+akS/GlDYRyqgaByeptfWDvSoO5sIL04aR47Rc2pGqf1l39bPbvbSVipa7nwxr2N8wYrDQg9XJ0P0pPT93jZqUYE8z3npNGQdOJUklD5rLfXmCKlq3oQx5aHP/QPzevukTDXVaToGvDYVkNAG9USAUkFWn88XQQYKujtcWc60USxN",
            { userID, userName },
            { userUpdate: true }
          );
    
        console.log("Login success", result);
        try {
            const streamID = "myStreamID";
            const stream = await zg.startPlayingStream(streamID);
            localVideoRef.current.srcObject = stream;
         
        } catch (error) {
          console.error("Join stream error", error);
        }
      } catch (error) {
        console.error("Login error", error);
      }




      

      
    }
    setup();
  }, []);

  function handleExit(e) {
    zg.logoutRoom();
    navigate("/home");
    refreshPage();
  }

  return (
    <div className="video-back">
      <h1 className="center-text">Viewing Live Streaming in Progress</h1>
      <video
        id="remote-video"
        ref={localVideoRef}
        autoPlay
        playsInline
        className="center-video"
      ></video>
      <button type="button" onClick={handleExit} className="btn">
        <strong>End Stream</strong>
        <div id="container-stars">
          <div id="stars"></div>
        </div>

        <div id="glow">
          <div class="circle"></div>
          <div class="circle"></div>
        </div>
      </button>
    </div>
  );
}

export default LiveView;
