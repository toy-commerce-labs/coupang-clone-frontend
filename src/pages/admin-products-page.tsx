import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Plus, Edit, Trash2 } from "lucide-react";
import { adminFetch } from "@/lib/admin-fetch";

interface ProductItem {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  status: "SALE" | "STOP";
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const navigate = useNavigate();

  const fetchProducts = async () => {
    setLoading(true);
    setApiError(null);

    try {
      const res = await adminFetch("/api/v1/admin/products");
      const data = await res.json();
      if (res.ok) {
        setProducts(data.data ?? []);
      } else {
        setApiError(data.message ?? "상품 목록 조회 실패");
      }
    } catch {
      setApiError("서버 연결 실패");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("adminAccessToken");
    if (!token) {
      window.location.href = "/admin/sign-in";
      return;
    }
    fetchProducts();
  }, []);

  const deleteProduct = async (id: number) => {
    if (!confirm("정말로 이 상품을 삭제하시겠습니까?")) return;
    try {
      const res = await adminFetch(`/api/v1/admin/products/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok) {
        alert("상품 삭제 완료");
        fetchProducts();
      } else {
        alert(data.message ?? "삭제 실패");
      }
    } catch {
      alert("서버 연결 실패");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">상품 관리</h1>
        <button
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
          onClick={() => navigate("/admin/products/new")}
        >
          <Plus className="w-4 h-4" /> 등록
        </button>
      </div>

      {apiError && <p className="text-red-500 mb-4">{apiError}</p>}

      {loading ? (
        <p>로딩 중...</p>
      ) : products.length === 0 ? (
        <p>등록된 상품이 없습니다.</p>
      ) : (
        <div className="overflow-x-auto bg-white border border-gray-200 rounded shadow-sm">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">상품명</th>
                <th className="px-4 py-3">가격</th>
                <th className="px-4 py-3">재고</th>
                <th className="px-4 py-3">카테고리</th>
                <th className="px-4 py-3">상태</th>
                <th className="px-4 py-3">액션</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t border-gray-100">
                  <td className="px-4 py-3">{product.id}</td>
                  <td className="px-4 py-3">{product.name}</td>
                  <td className="px-4 py-3">{product.price.toLocaleString()}원</td>
                  <td className="px-4 py-3">{product.stock}</td>
                  <td className="px-4 py-3">{product.category}</td>
                  <td className="px-4 py-3">{product.status === "SALE" ? "판매중" : "판매중지"}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <button
                      className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800"
                      onClick={() => navigate(`/admin/products/${product.id}/edit`)}
                    >
                      <Edit className="w-4 h-4" /> 수정
                    </button>
                    <button
                      className="inline-flex items-center gap-1 text-red-600 hover:text-red-800"
                      onClick={() => deleteProduct(product.id)}
                    >
                      <Trash2 className="w-4 h-4" /> 삭제
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
