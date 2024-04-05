import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage, MapPage, ProfilePage } from "./page/index";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
