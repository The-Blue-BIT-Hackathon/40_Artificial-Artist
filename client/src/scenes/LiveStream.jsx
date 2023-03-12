import React, { useEffect, useRef } from "react";
import { ZegoExpressEngine } from "zego-express-engine-webrtc";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";



const zg = new ZegoExpressEngine(
  1177888677,
  "47caa34558a92f641f8108bd91e08b0d"
);

function refreshPage() {
    window.location.reload(false);
  }

  function LiveStream() {
    const token = useSelector((state) => state.token);
    const userId = useSelector((state) => state.user_id);
    const navigate = useNavigate();
  const videoRef = useRef();
  useEffect(() => {
    async function setup() {
      const userID = "test10";
      const userName = "user";
    

      try {
        const result = await zg.loginRoom(
          "0001",
          "04AAAAAGQO+poAEGhxOGJjMWRkM2RlM3JleXUAsMtEbrmMkyeKhVgahnKK1DY5pAokMrXbN1m+vu2Wfs/llOY5J+nWgFI0RwquvDrUwkXV7q5Ynk9itx59Q0nNeBj+FKRVq38zXxuNRyQPQLELo8ImIPq65Qf4QziUe9XdMRkBjmdA+KKHp7x1bQ7xCDturG1UlBkaQUxwj7LDxNzEOH4qEHSxIcqbDT+CU681P+pZ7u1n/HtqClvcxdQmZ55JG6XK0Mfxd03ILpK7UjW4",
         { userID, userName },
          { userUpdate: true }
        );
        console.log("Login success", result);
        try {
          const stream = await zg.createStream({
            camera: { video: true, audio: true },
          });
          console.log("Create stream success", stream);
          videoRef.current.srcObject = stream;
          const streamID = "myStreamID"; // set a globally unique stream ID
          try {
            const result = await zg.startPublishingStream(streamID, stream);
            console.log("Publish stream success", result);
          } catch (error) {
            console.error("Publish stream error", error);
          }
        } catch (error) {
          console.error("Create stream error", error);
        }
      } catch (error) {
        console.error("Login error", error);
      }
    }
    setup();
  }, []);

  const checkLive = async () => {
    const response = await fetch(
      `https://backend-7pk9.onrender.com/users/${userId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    // navigate("/live");
    // refreshPage();
    // dispatch(setFriends({ friends: data }));
  };

  function handleExit(e) {
    zg.logoutRoom();
   checkLive();
    navigate("/home");
     refreshPage();

  }

  return (
    <div className="video-back">
      <h1 className="center-text">Live Streaming</h1>
      <video id="local-video" ref={videoRef} className='center-video' autoPlay playsInline muted></video>
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

export default LiveStream;
