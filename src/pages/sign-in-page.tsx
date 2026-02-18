import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, X } from "lucide-react";
import { cn } from "@/lib/utils";

type LoginTab = "email" | "phone" | "qr";

const TABS = [
  { key: "email" as const, label: "이메일 로그인" },
  { key: "phone" as const, label: "휴대폰번호 로그인", badge: "N" },
  { key: "qr" as const, label: "QR코드 로그인" },
];

const LOGO_COLORS = ["#F04E23", "#F7941D", "#FFC20E", "#72BF44", "#009CDE", "#004B8D", "#662D91"];

function CoupangLogo() {
  return (
    <h1 className="text-5xl font-bold tracking-tight select-none">
      {"coupang".split("").map((char, i) => (
        <span key={i} style={{ color: LOGO_COLORS[i] }}>
          {char}
        </span>
      ))}
    </h1>
  );
}

export default function SignInPage() {
  const [activeTab, setActiveTab] = useState<LoginTab>("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [autoLogin, setAutoLogin] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [apiError, setApiError] = useState<string | null>(null);

  const validate = () => {
    const next: typeof errors = {};
    if (!email.trim()) next.email = "아이디(이메일)를 입력해주세요.";
    if (!password) next.password = "비밀번호를 입력해주세요.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: { preventDefault(): void }) => {
    e.preventDefault();
    setApiError(null);
    if (!validate()) return;

    try {
      const res = await fetch("/api/v1/members/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.data?.accessToken) {
        if (autoLogin) localStorage.setItem("accessToken", data.data.accessToken);
        else sessionStorage.setItem("accessToken", data.data.accessToken);
        window.location.href = "/";
      } else {
        setApiError(data.message ?? "로그인에 실패했습니다.");
      }
    } catch {
      setApiError("서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      <div className="w-full max-w-[500px] px-6 flex flex-col items-center pt-16">
        {/* Logo */}
        <CoupangLogo />

        {/* Tabs */}
        <div className="w-full flex border-b border-gray-200 mt-10">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "flex-1 py-3 text-sm font-medium transition-colors",
                activeTab === tab.key
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700",
              )}
            >
              {tab.label}
              {tab.badge && (
                <span className="ml-1 bg-red-500 text-white text-[10px] font-bold rounded px-[5px] py-[1px] align-middle">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Email Login Form */}
        {activeTab === "email" && (
          <form onSubmit={handleSubmit} className="w-full mt-5 space-y-2">
            {/* UserId */}
            <div>
              <div
                className={cn(
                  "flex items-center border",
                  errors.email ? "border-red-500" : "border-gray-300",
                )}
              >
                <span className="pl-3 pr-2">
                  <Mail className="w-5 h-5 text-gray-400" />
                </span>
                <input
                  type="text"
                  placeholder="아이디(이메일)"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  className="flex-1 py-[14px] text-sm outline-none bg-transparent"
                />
                {email && (
                  <button type="button" onClick={() => setEmail("")} className="pr-3">
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                )}
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <div
                className={cn(
                  "flex items-center border",
                  errors.password ? "border-red-500" : "border-gray-300",
                )}
              >
                <span className="pl-3 pr-2">
                  <Lock className="w-5 h-5 text-gray-400" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="비밀번호"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                  }}
                  className="flex-1 py-[14px] text-sm outline-none bg-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="pr-3"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400" />
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

            {/* Auto login & find */}
            <div className="flex items-center justify-between pt-1 pb-2">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={autoLogin}
                  onChange={(e) => setAutoLogin(e.target.checked)}
                  className="w-4 h-4 accent-blue-600"
                />
                <span className="text-sm text-gray-600">자동 로그인</span>
              </label>
              <a href="#" className="text-sm text-blue-600 hover:underline">
                아이디 · 비밀번호 찾기 &gt;
              </a>
            </div>

            {/* Login button */}
            <button
              type="submit"
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[15px] transition-colors"
            >
              로그인
            </button>

            {/* Register button */}
            <button
              type="button"
              onClick={() => (window.location.href = "/sign-up")}
              className="w-full py-4 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold text-[15px] transition-colors"
            >
              회원가입
            </button>
          </form>
        )}

        {activeTab === "phone" && (
          <div className="w-full mt-10 text-center text-gray-400 text-sm py-16">
            휴대폰번호 로그인은 준비 중입니다.
          </div>
        )}

        {activeTab === "qr" && (
          <div className="w-full mt-10 text-center text-gray-400 text-sm py-16">
            QR코드 로그인은 준비 중입니다.
          </div>
        )}
      </div>

      {/* Footer */}
      <p className="mt-auto py-8 text-xs text-gray-400">©Coupang Corp. All rights reserved.</p>
    </div>
  );
}
