import React from "react";
import ServerDown from "../components/ServerDown";

function err500() {
  return (
    <div>
      <ServerDown />
    </div>
  );
}

export default err500;
