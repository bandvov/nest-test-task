import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ImagesList() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios
      .post(process.env.REACT_APP_API_URL + "/images", {
        token: process.env.REACT_APP_TOKEN,
      })
      .then((res) => {
        setImages(res.data);
      });
  }, []);

  return (
    <>
      <h3>Список завантажених фото</h3>
      <ol>
        {images.map((imageObj: { name: string }) => {
          return (
            <li key={imageObj.name}>
              <Link to={"/images/" + imageObj.name}>{imageObj.name}</Link>
            </li>
          );
        })}
      </ol>
    </>
  );
}
