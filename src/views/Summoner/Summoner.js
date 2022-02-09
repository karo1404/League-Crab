import Text from "../../components/Text";
import React from "react";
import { useParams } from "react-router-dom";

function Summoner() {
  const params = useParams();

  return (
    <h1 className="text-center" style={{ color: "black" }}>
      {params.name} page
    </h1>
  );
}

export default Summoner;
