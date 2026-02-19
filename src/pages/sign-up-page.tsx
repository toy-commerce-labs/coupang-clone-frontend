import { useEffect, useState } from "react";
import { Mail, Lock, User, Smartphone, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

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

interface TermsResponse {
  id: number;
  type: string;
  title: string;
  content: string;
  version: string;
  required: boolean;
  displayOrder: number;
  parentId: number | null;
  children: TermsResponse[];
}

function getAllIds(terms: TermsResponse[]): number[] {
  return terms.flatMap((t) => [t.id, ...getAllIds(t.children)]);
}

export default function SignUpPage() {
  const [terms, setTerms] = useState<TermsResponse[]>([]);
  const [termsLoading, setTermsLoading] = useState(true);
  const [form, setForm] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    name: "",
    phone: "",
  });
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [modalTerm, setModalTerm] = useState<TermsResponse | null>(null);

  useEffect(() => {
    fetch("/api/v1/terms")
      .then((res) => res.json())
      .then((res) => {
        setTerms(res.data ?? []);
      })
      .catch(() => {
        setApiError("약관 정보를 불러올 수 없습니다.");
      })
      .finally(() => setTermsLoading(false));
  }, []);

  const allIds = getAllIds(terms);
  const allChecked = allIds.length > 0 && allIds.every((id) => checked[id]);

  const updateForm = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const toggleAll = () => {
    const next = !allChecked;
    const updated: Record<number, boolean> = {};
    allIds.forEach((id) => (updated[id] = next));
    setChecked(updated);
  };

  const toggleOne = (id: number, children?: TermsResponse[]) => {
    setChecked((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      if (children && children.length > 0) {
        children.forEach((c) => (next[c.id] = !prev[id]));
      }
      return next;
    });
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (!form.email.trim()) next.email = "아이디(이메일)를 입력해주세요.";
    if (!form.password) next.password = "비밀번호를 입력해주세요.";
    if (!form.passwordConfirm) next.passwordConfirm = "비밀번호를 다시 입력해주세요.";
    else if (form.password !== form.passwordConfirm)
      next.passwordConfirm = "비밀번호가 일치하지 않습니다.";
    if (!form.name.trim()) next.name = "이름을 입력해주세요.";
    if (!form.phone.trim()) next.phone = "휴대폰번호를 입력해주세요.";

    const requiredTerms = terms.filter((t) => t.required);
    if (requiredTerms.some((t) => !checked[t.id])) {
      next.agreements = "필수 약관에 모두 동의해주세요.";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    if (!validate()) return;

    const agreements = allIds.map((id) => ({
      termsId: id,
      agreed: !!checked[id],
    }));

    try {
      const res = await fetch("/api/v1/members/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          name: form.name,
          phone: form.phone,
          agreements,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        window.location.href = "/sign-in";
      } else {
        setApiError(data.message ?? "회원가입에 실패했습니다.");
      }
    } catch {
      setApiError("서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  const inputFields = [
    { key: "email" as const, placeholder: "아이디(이메일)", icon: Mail, type: "text" },
    { key: "password" as const, placeholder: "비밀번호", icon: Lock, type: "password" },
    { key: "passwordConfirm" as const, placeholder: "비밀번호 확인", icon: Lock, type: "password" },
    { key: "name" as const, placeholder: "이름", icon: User, type: "text" },
    { key: "phone" as const, placeholder: "휴대폰번호", icon: Smartphone, type: "tel" },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      <div className="w-full max-w-[500px] px-6 flex flex-col items-center pt-16">
        <CoupangLogo />

        <div className="w-full mt-10">
          <h2 className="text-lg font-bold text-gray-900 mb-4">회원정보를 입력해주세요</h2>

          <form onSubmit={handleSubmit} className="space-y-2">
            {/* Input Fields */}
            {inputFields.map(({ key, placeholder, icon: Icon, type }) => (
              <div key={key}>
                <div
                  className={cn(
                    "flex items-center border",
                    errors[key] ? "border-red-500" : "border-gray-300",
                  )}
                >
                  <span className="pl-3 pr-2">
                    <Icon className="w-5 h-5 text-gray-400" />
                  </span>
                  <input
                    type={type}
                    placeholder={placeholder}
                    value={form[key]}
                    onChange={(e) => updateForm(key, e.target.value)}
                    className="flex-1 py-[14px] text-sm outline-none bg-transparent"
                  />
                </div>
                {errors[key] && <p className="text-red-500 text-xs mt-1">{errors[key]}</p>}
              </div>
            ))}

            {/* Agreements */}
            <div className="pt-6">
              {termsLoading ? (
                <p className="text-sm text-gray-400 text-center py-4">약관 정보를 불러오는 중...</p>
              ) : (
                <>
                  {/* All agree */}
                  <label className="flex items-center gap-3 cursor-pointer select-none pb-2">
                    <input
                      type="checkbox"
                      checked={allChecked}
                      onChange={toggleAll}
                      className="w-5 h-5 accent-blue-600"
                    />
                    <span className="font-bold text-[15px] text-gray-900">
                      모두 확인하였으며 동의합니다.
                    </span>
                  </label>
                  <p className="text-xs text-gray-500 ml-8 mb-4">
                    전체 동의에는 필수 및 선택 정보에 대한 동의가 포함되어 있으며, 개별적으로 동의를
                    선택 하실 수 있습니다. 선택 항목에 대한 동의를 거부하시는 경우에도 서비스 이용이
                    가능합니다.
                  </p>

                  {/* Individual agreements */}
                  <div className="border border-gray-200 rounded px-4 py-3 space-y-3">
                    {terms.map((term) => (
                      <div key={term.id}>
                        <div className="flex items-center justify-between">
                          <label className="flex items-center gap-3 cursor-pointer select-none">
                            <input
                              type="checkbox"
                              checked={!!checked[term.id]}
                              onChange={() => toggleOne(term.id, term.children)}
                              className="w-4 h-4 accent-blue-600"
                            />
                            <span className="text-sm text-gray-700">{term.title}</span>
                          </label>
                          {term.content && (
                            <button
                              type="button"
                              className="text-gray-400"
                              onClick={() => setModalTerm(term)}
                            >
                              <ChevronRight className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                        {/* Sub-agreements */}
                        {term.children.length > 0 && (
                          <div className="ml-7 mt-2 space-y-2">
                            {term.children.map((child) => (
                              <label
                                key={child.id}
                                className="flex items-center gap-3 cursor-pointer select-none"
                              >
                                <input
                                  type="checkbox"
                                  checked={!!checked[child.id]}
                                  onChange={() => toggleOne(child.id)}
                                  className="w-4 h-4 accent-blue-600"
                                />
                                <span className="text-sm text-gray-600">{child.title}</span>
                              </label>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  {errors.agreements && (
                    <p className="text-red-500 text-xs mt-1">{errors.agreements}</p>
                  )}
                </>
              )}
            </div>

            {/* Privacy notice link */}
            <p className="text-sm text-gray-400 pt-2 pb-2 underline cursor-pointer">
              개인정보 수집 및 이용 안내를 확인해주세요.
            </p>

            {/* API Error */}
            {apiError && (
              <p className="text-red-500 text-sm text-center py-1">{apiError}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[15px] rounded transition-colors"
            >
              동의하고 가입하기
            </button>
          </form>
        </div>
      </div>

      <p className="mt-auto py-8 text-xs text-gray-400">©Coupang Corp. All rights reserved.</p>

      {/* Agreement Detail Modal */}
      {modalTerm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setModalTerm(null)}
        >
          <div
            className="bg-white w-full max-w-lg mx-4 rounded-lg shadow-xl max-h-[80vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
              <h3 className="font-bold text-base text-gray-900">{modalTerm.title}</h3>
              <button
                type="button"
                onClick={() => setModalTerm(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="px-5 py-4 overflow-y-auto text-sm text-gray-700 leading-relaxed whitespace-pre-line">
              {modalTerm.content}
            </div>
            <div className="px-5 py-3 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setModalTerm(null)}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded transition-colors"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
