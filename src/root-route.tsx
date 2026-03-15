import { Navigate, Route, Routes } from "react-router";
import SignInPage from "./pages/sign-in-page";
import AdminSignInPage from "./pages/admin-sign-in-page";
import SignUpPage from "./pages/sign-up-page";
import IndexPage from "./pages/index-page";
import ProductFormPage from "./pages/product-page";
import AdminProductsPage from "./pages/admin-products-page";

export default function RootRoute() {
  return (
    <Routes>
      <Route path="sign-in" element={<SignInPage />} />
      <Route path="admin/sign-in" element={<AdminSignInPage />} />
      <Route path="sign-up" element={<SignUpPage />} />
      <Route path="/" element={<IndexPage />} />

      {/* 상품 리스트 */}
      <Route path="admin/products" element={<AdminProductsPage />} />

      {/* 상품 등록 */}
      <Route path="admin/products/new" element={<ProductFormPage />} />

      {/* 상품 수정 */}
      <Route path="admin/products/:id/edit" element={<ProductFormPage />} />

      <Route path="*" element={<Navigate to={"/"} />} />
    </Routes>
  );
}