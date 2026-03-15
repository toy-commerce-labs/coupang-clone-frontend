import { useState } from "react";
import { Lock, Eye, EyeOff, User } from "lucide-react";
import { cn } from "@/lib/utils";

const LOGO_COLORS = ["#F04E23", "#F7941D", "#FFC20E", "#72BF44", "#009CDE", "#004B8D", "#662D91"];

function CoupangLogo() {
  return (
    <h1 className="text-4xl font-bold tracking-tight select-none">
      {"coupang".split("").map((char, i) => (
        <span key={i} style={{ color: LOGO_COLORS[i] }}>
          {char}
        </span>
      ))}
    </h1>
  );
}

export default function AdminSignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [apiError, setApiError] = useState<string | null>(null);

  const validate = () => {
    const next: typeof errors = {};
    if (!email.trim()) next.email = "아이디를 입력해주세요.";
    if (!password) next.password = "비밀번호를 입력해주세요.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: { preventDefault(): void }) => {
    e.preventDefault();
    setApiError(null);
    if (!validate()) return;

    try {
      const res = await fetch("/api/v1/admin/members/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: email, password }),
      });
      const data = await res.json();
      if (data.data?.accessToken) {
        sessionStorage.setItem("adminAccessToken", data.data.accessToken);
        window.location.href = "/admin";
      } else {
        setApiError(data.message ?? "로그인에 실패했습니다.");
      }
    } catch {
      setApiError("서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <div className="w-full max-w-[440px] px-6">
        {/* Card */}
        <div className="bg-white border border-gray-200 shadow-sm p-10">
          {/* Header */}
          <div className="flex flex-col items-center mb-8">
            <CoupangLogo />
            <div className="mt-3 flex items-center gap-2">
              <span className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
                Admin Console
              </span>
            </div>
            <div className="mt-3 w-8 h-[2px] bg-gray-200" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* UserId */}
            <div>
              <div
                className={cn(
                  "flex items-center border",
                  errors.email ? "border-red-500" : "border-gray-300",
                  "focus-within:border-gray-500 transition-colors",
                )}
              >
                <span className="pl-3 pr-2">
                  <User className="w-4 h-4 text-gray-400" />
                </span>
                <input
                  type="text"
                  placeholder="관리자 아이디"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  className="flex-1 py-3 text-sm outline-none bg-transparent"
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <div
                className={cn(
                  "flex items-center border",
                  errors.password ? "border-red-500" : "border-gray-300",
                  "focus-within:border-gray-500 transition-colors",
                )}
              >
                <span className="pl-3 pr-2">
                  <Lock className="w-4 h-4 text-gray-400" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="비밀번호"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                  }}
                  className="flex-1 py-3 text-sm outline-none bg-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="pr-3"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 text-gray-400" />
                  ) : (
                    <Eye className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* API Error */}
            {apiError && (
              <p className="text-red-500 text-sm text-center py-1">{apiError}</p>
            )}

            {/* Login button */}
            <button
              type="submit"
              className="w-full mt-2 py-3 bg-gray-900 hover:bg-gray-700 text-white font-semibold text-sm tracking-wide transition-colors"
            >
              로그인
            </button>
          </form>

          {/* Link to customer login */}
          <div className="mt-6 text-center">
            <a
              href="/sign-in"
              className="text-xs text-gray-400 hover:text-gray-600 hover:underline transition-colors"
            >
              일반 회원 로그인 &gt;
            </a>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-gray-400">
          ©Coupang Corp. All rights reserved.
        </p>
      </div>
    </div>
  );
}
