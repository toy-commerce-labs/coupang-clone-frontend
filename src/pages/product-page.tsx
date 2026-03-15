import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Package, Save } from "lucide-react";
import { adminFetch } from "@/lib/admin-fetch";

interface ProductForm {
  name: string;
  price: number;
  stock: number;
  category: string;
  description: string;
  imageUrl: string;
  status: "SALE" | "STOP";
}

export default function ProductFormPage() {
  const params = useParams<{ id?: string }>();
  const productId = params.id ? Number(params.id) : undefined;
  const isEdit = !!productId;
  const navigate = useNavigate();

  const [product, setProduct] = useState<ProductForm>({
    name: "",
    price: 0,
    stock: 0,
    category: "",
    description: "",
    imageUrl: "",
    status: "SALE",
  });

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // 상품 조회 (수정일 때)
  useEffect(() => {
    const token = sessionStorage.getItem("adminAccessToken");
    if (!token) {
      window.location.href = "/admin/sign-in";
      return;
    }
    if (!isEdit) return;

    const fetchProduct = async () => {
      try {
        const res = await adminFetch(`/api/v1/admin/products/${productId}`);
        const data = await res.json();
        setProduct(data.data);
      } catch {
        setApiError("상품 정보를 불러오지 못했습니다.");
      }
    };

    fetchProduct();
  }, [productId, isEdit]);

  const change = (key: keyof ProductForm, value: any) => {
    setProduct((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setApiError(null);

    try {
      const res = await adminFetch(
        isEdit
          ? `/api/v1/admin/products/${productId}`
          : `/api/v1/admin/products`,
        {
          method: isEdit ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert(isEdit ? "상품 수정 완료" : "상품 등록 완료");
        navigate("/admin/products");
      } else {
        setApiError(data.message ?? "요청 실패");
      }
    } catch {
      setApiError("서버 연결 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-12">
      <div className="w-full max-w-[700px] bg-white border border-gray-200 shadow-sm p-8">

        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <Package className="w-5 h-5 text-gray-700" />
          <h1 className="text-lg font-semibold">
            {isEdit ? "상품 수정" : "상품 등록"}
          </h1>
        </div>

        <form onSubmit={submit} className="space-y-4">

          {/* 상품명 */}
          <div>
            <label className="text-sm text-gray-600">상품명</label>
            <input
              type="text"
              value={product.name}
              onChange={(e) => change("name", e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 mt-1 text-sm"
              required
            />
          </div>

          {/* 가격 */}
          <div>
            <label className="text-sm text-gray-600">가격</label>
            <input
              type="number"
              value={product.price}
              onChange={(e) => change("price", Number(e.target.value))}
              className="w-full border border-gray-300 px-3 py-2 mt-1 text-sm"
              required
            />
          </div>

          {/* 재고 */}
          <div>
            <label className="text-sm text-gray-600">재고</label>
            <input
              type="number"
              value={product.stock}
              onChange={(e) => change("stock", Number(e.target.value))}
              className="w-full border border-gray-300 px-3 py-2 mt-1 text-sm"
            />
          </div>

          {/* 카테고리 */}
          <div>
            <label className="text-sm text-gray-600">카테고리</label>
            <input
              type="text"
              value={product.category}
              onChange={(e) => change("category", e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 mt-1 text-sm"
            />
          </div>

          {/* 이미지 */}
          <div>
            <label className="text-sm text-gray-600">이미지 URL</label>
            <input
              type="text"
              value={product.imageUrl}
              onChange={(e) => change("imageUrl", e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 mt-1 text-sm"
            />
          </div>

          {/* 설명 */}
          <div>
            <label className="text-sm text-gray-600">상품 설명</label>
            <textarea
              value={product.description}
              onChange={(e) => change("description", e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 mt-1 text-sm"
              rows={4}
            />
          </div>

          {/* 판매 상태 */}
          <div>
            <label className="text-sm text-gray-600">판매 상태</label>
            <select
              value={product.status}
              onChange={(e) => change("status", e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 mt-1 text-sm"
            >
              <option value="SALE">판매중</option>
              <option value="STOP">판매중지</option>
            </select>
          </div>

          {/* 에러 */}
          {apiError && (
            <p className="text-red-500 text-sm">{apiError}</p>
          )}

          {/* 버튼 */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-3 text-sm font-semibold hover:bg-gray-700"
          >
            <Save className="w-4 h-4" />
            {isEdit ? "상품 수정" : "상품 등록"}
          </button>

        </form>
      </div>
    </div>
  );
}
