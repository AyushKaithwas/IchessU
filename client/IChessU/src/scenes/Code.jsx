import { Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Code = () => {
  const ws = useRef(null);
  const navigate = useNavigate();

  const randomCode = () => {
    const min = 1000;
    const max = 9999;
    const randomWholeNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomWholeNumber;
  };

  const code = randomCode();

  useEffect(() => {
    console.log("Code component mounted");

    ws.current = new WebSocket("ws://localhost:3000");

    ws.current.onopen = () => {
      console.log("WebSocket opened");
      ws.current.send(
        JSON.stringify({
          type: "create",
          code: code,
        })
      );
    };
    ws.current.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.type === "joined" && data.success) {
        navigate("/game");
      } else if (data.type === "create" && !data.success) {
        alert("Failed to create room");
      }
    };
  }, [navigate, code]);

  return (
    <>
      <Typography variant="h3" component="div" color="black" gutterBottom>
        {code}
      </Typography>
    </>
  );
};

export default Code;
