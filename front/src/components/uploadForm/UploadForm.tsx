import React, { useState } from "react";
import axios from "axios";
import "./UploadForm.styles.css";

export default function UploadForm() {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage("");
    setError(false);
    setImageUrl(e.target.value);
  };
  const submitHandler = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    setImageUrl("");
    setMessage("");
    setError(false);
    axios
      .post("http://localhost:3001/image", {
        imageUrl,
        token: process.env.REACT_APP_TOKEN,
      })
      .then((res) => {
        setMessage(res.data);
        return res;
      })
      .catch((e) => {
        setMessage(e.message);
        setError(true);
      });
  };
  return (
    <form className="form" onSubmit={submitHandler}>
      <h3>Відправити фото</h3>
      <input onChange={changeHandler} value={imageUrl} />
      <div className="error-wrapper">
        {<span className={error ? "error" : ""}>{message}</span>}
      </div>
      <button type="submit">Завантажити</button>
    </form>
  );
}
