import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { HomePage, ProfilePage } from "../page";
import AuthPage from "../page/Auth/AuthPage";
import { ProtectedAuth } from "./ProtAuth";
import { ProtectedContent } from "./ProtContent";

export const AppRouter = () => (
  <Routes>
    <Route element={<MainLayout />}>
      <Route element={<ProtectedAuth />}>
        <Route path="/login" element={<AuthPage />} />
      </Route>
      <Route element={<ProtectedContent />}>
        <Route path="/profile" element={<ProfilePage />} />
        <Route exact path="/" element={<HomePage />} />
      </Route>
    </Route>
  </Routes>
);
