import Text from "../../components/Text";
import React from "react";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <h1 className="text-center" style={{ color: "black" }}>
      <Text textId="pageNotFound" /> :(
      <div>
        <button
          onClick={() => {
            navigate(`/`, {
              replace: true,
            });
          }}
        >
          Home
        </button>
      </div>
    </h1>
  );
}

export default PageNotFound;
