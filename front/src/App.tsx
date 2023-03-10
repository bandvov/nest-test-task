import React, { ReactElement } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ImagesList from "./components/imagesList/ImagesList";
import SingleImage from "./components/SingleImage";
import UploadForm from "./components/uploadForm/UploadForm";

const routes: { path: string; element: ReactElement }[] = [
  {
    path: "/",
    element: <UploadForm />,
  },
  { path: "/images", element: <ImagesList /> },
  { path: "/images/:name", element: <SingleImage /> },
];
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/test" />
          {routes.map((route) => {
            return <Route {...route} />;
          })}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
