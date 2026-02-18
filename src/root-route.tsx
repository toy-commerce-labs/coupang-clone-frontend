import { Navigate, Route, Routes } from "react-router";
import SignInPage from "./pages/sign-in-page";
import AdminSignInPage from "./pages/admin-sign-in-page";
import SignUpPage from "./pages/sign-up-page";
import IndexPage from "./pages/index-page";

export default function RootRoute() {
  return (
    <Routes>
      <Route path="sign-in" element={<SignInPage />} />
      <Route path="admin/sign-in" element={<AdminSignInPage />} />
      <Route path="sign-up" element={<SignUpPage />} />
      <Route path="/" element={<IndexPage />} />
      <Route path="*" element={<Navigate to={"/"} />} />
    </Routes>
  );
}
