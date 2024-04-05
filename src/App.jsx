import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage, MapPage, ProfilePage } from "./page/index";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
