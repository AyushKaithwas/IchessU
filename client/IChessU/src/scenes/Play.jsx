import React, { useEffect, useRef } from "react";
import TextField from "@mui/material/TextField";
import FlexCenteredRow from "../muiStyled/FlexCenteredRow";
import { Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Play = () => {
  const [code, setCode] = useState("");
  const ws = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Play component mounted");

    ws.current = new WebSocket("ws://localhost:3000");

    ws.current.onopen = () => {
      console.log("WebSocket opened");
    };
    ws.current.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.type === "join" && data.success) {
        navigate("/game");
      } else if (data.type === "join" && !data.success) {
        alert("Invalid code");
      }
    };
  }, [navigate]);

  const joinRoom = (code) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(
        JSON.stringify({
          type: "join",
          code: code,
        })
      );
    }
  };

  const handleJoin = () => {
    joinRoom(code);
  };

  return (
    <>
      <FlexCenteredRow gap={"2rem"}>
        <TextField
          id="outlined-basic"
          label="Code"
          variant="outlined"
          onChange={(e) => setCode(e.target.value)}
        />
        <Button variant="contained" onClick={handleJoin}>
          Join
        </Button>
      </FlexCenteredRow>
    </>
  );
};

export default Play;
