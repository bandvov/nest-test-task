import axios from "axios";
import React, { useEffect, useState } from "react";

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
          return <li>{imageObj.name}</li>;
        })}
      </ol>
    </>
  );
}
