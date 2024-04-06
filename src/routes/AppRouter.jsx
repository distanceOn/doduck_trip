import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { HomePage, ProfilePage, AboutPage } from "../page";
import AuthPage from "../page/Auth/AuthPage";
import { ProtectedAuth } from "./ProtAuth";
import { ProtectedContent } from "./ProtContent";
import { PlaceGallery } from "../page/PlaceGallery/PlaceGallery";
import { Place } from "../page/Place/Place";

export const AppRouter = () => (
  <Routes>
    <Route element={<MainLayout />}>
      <Route element={<ProtectedAuth />}>
        <Route path="/login" element={<AuthPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Route>
      <Route element={<ProtectedContent />}>
        <Route path="/profile" element={<ProfilePage />} />
        <Route exact path="/" element={<HomePage />} />
        <Route path="/places" element={<PlaceGallery />} />
        <Route path="/places/:id" element={<Place />} />
      </Route>
    </Route>
  </Routes>
);
