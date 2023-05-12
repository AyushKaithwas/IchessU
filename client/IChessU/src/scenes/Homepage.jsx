import React from "react";
import Button from "@mui/material/Button";
import FlexCenteredRow from "../muiStyled/FlexCenteredRow";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <>
      <FlexCenteredRow gap={"5rem"} width={"500px"}>
        <Button variant="contained" sx={{ width: "50%" }}>
          <Link to="/play" style={{ color: "inherit", textDecoration: "none" }}>
            Play
          </Link>
        </Button>

        <Button variant="contained" sx={{ width: "50%" }}>
          <Link to="/code" style={{ color: "inherit", textDecoration: "none" }}>
            Generate Code
          </Link>
        </Button>
      </FlexCenteredRow>
    </>
  );
};

export default Homepage;
