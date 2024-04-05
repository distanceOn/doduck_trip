import React from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { HomePage, MapPage, ProfilePage } from "./page/index";
import { Header } from "./components";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
