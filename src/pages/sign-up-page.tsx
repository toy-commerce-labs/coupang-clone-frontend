import { useState } from "react";
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

interface Agreement {
  id: string;
  label: string;
  required: boolean;
  detailTitle?: string;
  detailContent?: string;
  children?: Agreement[];
}

const AGREEMENTS: Agreement[] = [
  { id: "age", label: "[필수] 만 14세 이상입니다", required: true },
  {
    id: "terms",
    label: "[필수] 쿠팡 이용약관 동의",
    required: true,
    detailTitle: "쿠팡 이용약관",
    detailContent: `제1조 (목적)
이 약관은 쿠팡 주식회사(이하 "회사")가 운영하는 쿠팡 서비스(이하 "서비스")의 이용과 관련하여 회사와 회원 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.

제2조 (정의)
① "서비스"란 회사가 제공하는 모든 서비스를 의미합니다.
② "회원"이란 회사와 서비스 이용계약을 체결하고, 회사가 제공하는 서비스를 이용하는 고객을 말합니다.
③ "아이디(ID)"란 회원의 식별과 서비스 이용을 위하여 회원이 설정하고 회사가 승인하는 이메일 주소를 말합니다.

제3조 (약관의 효력 및 변경)
① 이 약관은 서비스를 이용하고자 하는 모든 회원에게 적용됩니다.
② 회사는 관련 법령에 위배되지 않는 범위에서 이 약관을 개정할 수 있습니다.
③ 변경된 약관은 공지사항을 통해 공지하며, 공지 후 7일 이내에 거부 의사를 표시하지 않으면 동의한 것으로 간주합니다.

제4조 (서비스의 제공)
① 회사는 다음의 서비스를 제공합니다.
  1. 상품 검색, 주문, 결제 서비스
  2. 배송 서비스
  3. 고객 리뷰 및 평가 서비스
  4. 기타 회사가 정하는 서비스

제5조 (회원가입)
① 이용자는 회사가 정한 가입 양식에 따라 회원정보를 기입한 후 이 약관에 동의한다는 의사표시를 함으로써 회원가입을 신청합니다.
② 회사는 다음 각 호에 해당하지 않는 한 회원으로 등록합니다.
  1. 가입신청자가 만 14세 미만인 경우
  2. 등록 내용에 허위, 기재누락, 오기가 있는 경우
  3. 기타 회원으로 등록하는 것이 부적절하다고 판단되는 경우`,
  },
  {
    id: "finance",
    label: "[필수] 전자금융거래 이용약관 동의",
    required: true,
    detailTitle: "전자금융거래 이용약관",
    detailContent: `제1조 (목적)
이 약관은 쿠팡 주식회사(이하 "회사")가 제공하는 전자금융거래 서비스를 회원이 이용함에 있어 회사와 회원 간의 전자금융거래에 관한 기본적인 사항을 정함을 목적으로 합니다.

제2조 (정의)
① "전자금융거래"란 회사가 전자적 장치를 통하여 제공하는 금융상품 및 서비스를 회원이 이용하는 거래를 말합니다.
② "전자지급수단"이란 선불전자지급수단, 신용카드, 직불카드 등 전자금융거래에 사용되는 지급수단을 말합니다.

제3조 (전자지급결제대행 서비스)
① 회사는 전자상거래에서 구매자의 결제를 대행하는 서비스를 제공합니다.
② 회원은 서비스 이용 시 다양한 결제수단을 선택하여 대금을 결제할 수 있습니다.

제4조 (거래내역의 확인)
① 회사는 회원이 전자금융거래의 내용을 확인할 수 있도록 거래내역을 제공합니다.
② 회원은 거래내역에 오류가 있는 경우 회사에 정정을 요구할 수 있습니다.

제5조 (오류의 정정)
① 회원은 전자금융거래에 오류가 있음을 안 때에는 회사에 그 정정을 요구할 수 있습니다.
② 회사는 오류의 정정 요구를 받은 때에는 이를 즉시 조사하여 처리한 후 결과를 회원에게 알려드립니다.`,
  },
  {
    id: "privacy",
    label: "[필수] 개인정보 제3자 제공 동의",
    required: true,
    detailTitle: "개인정보 제3자 제공 동의",
    detailContent: `쿠팡 주식회사는 서비스 제공을 위해 아래와 같이 개인정보를 제3자에게 제공합니다.

1. 개인정보를 제공받는 자
  - 상품 판매자 (마켓플레이스 입점 업체)
  - 배송 업체 (쿠팡 로지스틱스, 대한통운 등)
  - 결제 대행사 (PG사)

2. 제공하는 개인정보 항목
  - 주문자 정보: 이름, 연락처, 이메일
  - 수령인 정보: 이름, 연락처, 배송지 주소
  - 결제 정보: 결제수단 정보

3. 제공받는 자의 이용 목적
  - 판매자: 주문 확인, 상품 배송, 고객 상담
  - 배송업체: 상품 배송
  - 결제 대행사: 결제 처리 및 결제 관련 민원 처리

4. 보유 및 이용 기간
  - 제공 목적 달성 시까지 (단, 관계 법령에 따라 보존이 필요한 경우 해당 법령에서 정한 기간)

※ 동의를 거부할 권리가 있으나, 동의 거부 시 쿠팡 서비스 이용이 제한될 수 있습니다.`,
  },
  {
    id: "marketing",
    label: "[선택] 마케팅 목적의 개인정보 수집 및 이용 동의",
    required: false,
    detailTitle: "마케팅 목적의 개인정보 수집 및 이용 동의",
    detailContent: `쿠팡 주식회사는 마케팅 및 광고에 활용하기 위해 아래와 같이 개인정보를 수집·이용합니다.

1. 수집 항목
  - 이름, 이메일 주소, 휴대폰번호, 서비스 이용 기록, 구매 내역

2. 수집 및 이용 목적
  - 신규 서비스 및 이벤트 안내
  - 맞춤형 상품 추천 및 광고 제공
  - 마케팅 및 프로모션 활용
  - 서비스 이용 통계 분석

3. 보유 및 이용 기간
  - 회원 탈퇴 시 또는 동의 철회 시까지

※ 본 동의는 선택 사항이며, 동의하지 않더라도 쿠팡 서비스를 이용하실 수 있습니다.
※ 동의 후에도 언제든지 마이페이지에서 동의를 철회하실 수 있습니다.`,
  },
  {
    id: "ads",
    label: "[선택] 광고성 정보 수신 동의",
    required: false,
    detailTitle: "광고성 정보 수신 동의",
    detailContent: `쿠팡 주식회사는 회원에게 다양한 혜택과 정보를 제공하기 위해 광고성 정보를 발송합니다.

1. 수신 채널
  - 이메일, SMS/MMS, SNS(카카오톡 등), 앱 푸시 알림

2. 발송 내용
  - 할인 쿠폰 및 프로모션 안내
  - 추천 상품 및 이벤트 정보
  - 로켓배송, 로켓와우 등 서비스 안내
  - 기타 쿠팡 서비스 관련 혜택 정보

3. 수신 동의 변경
  - 마이쿠팡 > 설정에서 언제든지 수신 동의를 변경하실 수 있습니다.
  - 수신 거부 시에도 주문/결제 등 필수 안내 사항은 발송됩니다.

※ 본 동의는 선택 사항이며, 동의하지 않더라도 쿠팡 서비스를 이용하실 수 있습니다.`,
    children: [
      { id: "ads_email", label: "[선택] 이메일 수신 동의", required: false },
      { id: "ads_sms", label: "[선택] SMS, SNS 수신 동의", required: false },
      { id: "ads_push", label: "[선택] 앱 푸시 수신 동의", required: false },
    ],
  },
];

function getAllIds(agreements: Agreement[]): string[] {
  return agreements.flatMap((a) => [a.id, ...(a.children ? getAllIds(a.children) : [])]);
}

const ALL_IDS = getAllIds(AGREEMENTS);

export default function SignUpPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    name: "",
    phone: "",
  });
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [modalAgreement, setModalAgreement] = useState<Agreement | null>(null);

  const updateForm = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const allChecked = ALL_IDS.every((id) => checked[id]);

  const toggleAll = () => {
    const next = !allChecked;
    const updated: Record<string, boolean> = {};
    ALL_IDS.forEach((id) => (updated[id] = next));
    setChecked(updated);
  };

  const toggleOne = (id: string, children?: Agreement[]) => {
    setChecked((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      if (children) {
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

    const requiredAgreements = AGREEMENTS.filter((a) => a.required);
    if (requiredAgreements.some((a) => !checked[a.id])) {
      next.agreements = "필수 약관에 모두 동의해주세요.";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    if (!validate()) return;

    try {
      const res = await fetch("/api/v1/members/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          name: form.name,
          phone: form.phone,
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
                전체 동의에는 필수 및 선택 정보에 대한 동의가 포함되어 있으며, 개별적으로 동의를 선택
                하실 수 있습니다. 선택 항목에 대한 동의를 거부하시는 경우에도 서비스 이용이
                가능합니다.
              </p>

              {/* Individual agreements */}
              <div className="border border-gray-200 rounded px-4 py-3 space-y-3">
                {AGREEMENTS.map((agreement) => (
                  <div key={agreement.id}>
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-3 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={!!checked[agreement.id]}
                          onChange={() => toggleOne(agreement.id, agreement.children)}
                          className="w-4 h-4 accent-blue-600"
                        />
                        <span className="text-sm text-gray-700">{agreement.label}</span>
                      </label>
                      {agreement.detailTitle && (
                        <button
                          type="button"
                          className="text-gray-400"
                          onClick={() => setModalAgreement(agreement)}
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                    {/* Sub-agreements */}
                    {agreement.children && (
                      <div className="ml-7 mt-2 space-y-2">
                        {agreement.children.map((child) => (
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
                            <span className="text-sm text-gray-600">{child.label}</span>
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
      {modalAgreement && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setModalAgreement(null)}
        >
          <div
            className="bg-white w-full max-w-lg mx-4 rounded-lg shadow-xl max-h-[80vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
              <h3 className="font-bold text-base text-gray-900">
                {modalAgreement.detailTitle}
              </h3>
              <button
                type="button"
                onClick={() => setModalAgreement(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="px-5 py-4 overflow-y-auto text-sm text-gray-700 leading-relaxed whitespace-pre-line">
              {modalAgreement.detailContent}
            </div>
            <div className="px-5 py-3 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setModalAgreement(null)}
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
