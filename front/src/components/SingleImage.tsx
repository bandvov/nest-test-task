import React from "react";
import { useParams } from "react-router-dom";
export default function SingleImage() {
  const { name } = useParams();
  console.log(name);

  return (
    <div>
      <h2>{name}</h2>
      <img
        width={"500px"}
        src={process.env.REACT_APP_API_URL + "/images/" + name}
      />
    </div>
  );
}
