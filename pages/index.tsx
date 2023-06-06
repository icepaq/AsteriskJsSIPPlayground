import JsSIP from "jssip";
import { useRef, useState } from "react";

export default function Home() {
  const phoneRef = useRef<JsSIP.UA | null>(null);

  const handleClick = () => {
    console.log("clicked");
    const socket = new JsSIP.WebSocketInterface("EMPTY");
    const configuration = {
      sockets: [socket],
      uri: "EMPTY",
      password: "EMPTY",
    };

    phoneRef.current = new JsSIP.UA(configuration);

    phoneRef.current.start();

    phoneRef.current.on("connected", function (e) {
      console.log("connected");
      console.log(e);
    });

    phoneRef.current.on("disconnected", function (e) {
      console.log("disconnected");
      console.log(e);
    });

    phoneRef.current.on("registrationFailed", function (e) {
      console.log("registrationFailed");
      console.log(e);
    });

    phoneRef.current.on("newRTCSession", function (e: any) {
      console.log("newRTCSession");
      console.log(e);
    });

    phoneRef.current.on("registered", function (e) {
      console.log("registered");
      console.log(e);
    });

    phoneRef.current.on("newRTCSession", function (e: any) {
      console.log("newRTCSession");
      console.log(e);
    });

    phoneRef.current.on("sipEvent", function (e) {
      console.log("sipEvent");
      console.log(e);
    });
  };

  const call = async () => {
    if (!phoneRef.current) return;

    const eventHandlers = {
      progress: function (e: any) {
        console.log("call is in progress");
      },
      failed: function (e: any) {
        console.log("call failed with cause: " + e.data);
      },
      ended: function (e: any) {
        console.log("call ended with cause: " + e.data);
      },
      confirmed: function (e: any) {
        console.log("call confirmed");
      },
    };

    const session = phoneRef.current.call("EMPTY", {
      eventHandlers: eventHandlers,
      mediaConstraints: {
        audio: true,
        video: false,
      },
    });

    const audioElement = document.getElementById(
      "audioElement"
    ) as HTMLAudioElement;

    session.connection.addEventListener("addstream", function (e: any) {
      audioElement.srcObject = e.stream;
    });

    await new Promise((resolve) => setTimeout(resolve, 10000));

    session.terminate();
  };

  return (
    <>
      <h1 onClick={handleClick}>hi</h1>
      <h1 onClick={call}>Call</h1>
      <audio id="audioElement" autoPlay></audio>
    </>
  );
}
