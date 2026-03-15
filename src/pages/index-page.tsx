import { useNavigate } from "react-router";

export default function IndexPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto bg-white p-8 border border-gray-200 rounded shadow-sm">
        <h1 className="text-2xl font-bold mb-4">쿠팡 클론</h1>
        <p className="mb-6">관리자 상품 등록/수정/삭제 화면으로 이동하려면 아래 버튼을 클릭하세요.</p>
        <button
          onClick={() => navigate("/admin/products")}
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
        >
          관리자 상품 관리
        </button>
      </div>
    </div>
  );
}
