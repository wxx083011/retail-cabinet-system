import { useState, useRef, ReactNode } from "react";
import brandMark from "./imports/flashbuy-star-mark.png";

// ─── Icons ────────────────────────────────────────────────────────────────
const P: Record<string, string> = {
  chevL:    "M15 18l-6-6 6-6",
  chevR:    "M9 18l6-6-6-6",
  chevD:    "M6 9l6 6 6-6",
  x:        "M18 6L6 18M6 6l12 12",
  check:    "M20 6L9 17l-5-5",
  plus:     "M12 5v14M5 12h14",
  minus:    "M5 12h14",
  search:   "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0",
  camera:   "M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z M12 17a4 4 0 100-8 4 4 0 000 8",
  scan:     "M3 7V5a2 2 0 012-2h2M17 3h2a2 2 0 012 2v2M21 17v2a2 2 0 01-2 2h-2M7 21H5a2 2 0 01-2-2v-2 M8 12h8 M12 8v8",
  qr:       "M3 3h6v6H3zM15 3h6v6h-6zM3 15h6v6H3z M5 5h2v2H5zM17 5h2v2h-2zM5 17h2v2H5z M15 15h2v2h-2zM19 15h2v2h-2zM15 19h2v2h-2zM19 19h2v2h-2z",
  user:     "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8",
  truck:    "M1 3h15v13H1z M16 8h4l3 3v5h-7V8z M5.5 21a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM18.5 21a2.5 2.5 0 100-5 2.5 2.5 0 000 5z",
  pkg:      "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
  wrench:   "M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z",
  layers:   "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  alert:    "M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z M12 9v4 M12 17h.01",
  info:     "M12 22a10 10 0 100-20 10 10 0 000 20z M12 8v4 M12 16h.01",
  checkC:   "M22 11.08V12a10 10 0 11-5.93-9.14 M22 4L12 14.01l-3-3",
  xC:       "M12 22a10 10 0 100-20 10 10 0 000 20z M15 9l-6 6M9 9l6 6",
  refresh:  "M23 4v6h-6 M1 20v-6h6 M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15",
  phone:    "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 01.4 2.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z",
  pin:      "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z M12 10a2 2 0 100-4 2 2 0 000 4",
  upload:   "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4 M17 8l-5-5-5 5 M12 3v12",
  download: "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4 M7 10l5 5 5-5 M12 15V3",
  print:    "M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2 M6 14h12v8H6z",
  list:     "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01",
  home:     "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10",
  logOut:   "M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4 M16 17l5-5-5-5 M21 12H9",
  bell:     "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 01-3.46 0",
  hash:     "M4 9h16M4 15h16M10 3L8 21M16 3l-2 18",
  box:      "M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z",
  grid:     "M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z",
  image:    "M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2z M8.5 10a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM21 15l-5-5L5 21",
  edit:     "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7 M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",
  arrow:    "M5 12h14M12 5l7 7-7 7",
  wifi:     "M5 12.55a11 11 0 0114.08 0 M1.42 9a16 16 0 0121.16 0 M8.53 16.11a6 6 0 016.95 0 M12 20h.01",
  wifiOff:  "M1 1l22 22M16.72 11.06A10.94 10.94 0 0119 12.55 M5 12.55a10.94 10.94 0 015.17-2.39 M10.71 5.05A16 16 0 0122.56 9 M1.42 9a15.91 15.91 0 014.7-2.88 M8.53 16.11a6 6 0 016.95 0 M12 20h.01",
  lock:     "M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2z M17 11V7a5 5 0 00-10 0v4",
  unlock:   "M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2z M17 11V7a5 5 0 00-9.9-1",
  clock:    "M12 22a10 10 0 100-20 10 10 0 000 20z M12 6v6l4 2",
  map:      "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z M12 10a2 2 0 100-4 2 2 0 000 4",
  zap:      "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
};

const Ic = ({ d, size = 16, cls = "" }: { d: string; size?: number; cls?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}>
    <path d={d} />
  </svg>
);

// ══════════════════════════════════════════════════════════════════════════════
// DESIGN TOKENS & PRIMITIVES —— 闪购星·履约 V2 视觉体系
// 双档蓝：深蓝锚点 #2563EB 承载行动与信息权重，亮蓝 #56A9FF 承载品牌与呼吸感
// 色阶由浅至深：A5DCFF / 7CC0FF / 56A9FF / 3E8BF5 / 2563EB / 1D4ED8
// 渐变、阴影、环光全部在此单点定义，页面内不再散写十六进制
// ══════════════════════════════════════════════════════════════════════════════
export const FF_THEME = {
  brand:      "#56A9FF",  // 主题亮蓝
  brandLight: "#7CC0FF",  // 主题提亮
  brandPale:  "#A5DCFF",  // 主题最浅
  brandMid:   "#3E8BF5",  // 中间调（渐变过渡）
  brandDeep:  "#2563EB",  // 深蓝锚点（主行动 / 关键数值）
  brandInk:   "#1D4ED8",  // 强调文字
  brandSoft:  "#EAF4FF",  // 主题浅底
  brandLine:  "#BFDBFE",  // 主题浅描边
  sky:        "#38BDF8",  // 亮青（进行中）
  skySoft:    "#E6F8FF",
  skyLine:    "#BAE9FB",
  indigo:     "#6C8CFF",  // 靛蓝（次级模块）
  indigoSoft: "#EEF3FF",
  indigoLine: "#D6E0FF",
  mint:       "#12B76A",  // 完成
  mintSoft:   "#E7FAF1",
  mintLine:   "#A6EBCB",
  coral:      "#E5484D",  // 异常
  coralSoft:  "#FEF3F3",
  sun:        "#F79009",  // 待办 / 提醒
  sunSoft:    "#FFF6E5",
  sunLine:    "#FFE1AE",
  page:       "#F4F8FD",  // 页面底
  title:      "#10233F",
  body:       "#3A4B66",
  muted:      "#8A9BB4",
  line:       "#E4EDF7",
} as const;

// 复合样式：渐变与投影（Tailwind 任意值写法，避免多处重复）
const GRAD = {
  // 主视觉头图：深蓝起、亮蓝收，比单色更有重量
  hero: "bg-[linear-gradient(135deg,#2563EB_0%,#3E8BF5_45%,#56A9FF_100%)]",
  // 主按钮：同向但跨度更大，按下时回落到深蓝
  btn:  "bg-[linear-gradient(135deg,#1D4ED8_0%,#2563EB_55%,#4E9BFF_100%)]",
  // 次级亮块：轻快、用于小面积点缀
  heroLight: "bg-[linear-gradient(135deg,#56A9FF_0%,#8CC6FF_100%)]",
  // 条状：进度的 / 标题左侧装饰条
  bar:  "bg-[linear-gradient(90deg,#2563EB_0%,#56A9FF_100%)]",
  soft: "bg-[linear-gradient(180deg,#EAF4FF_0%,#F4F8FD_100%)]",
  // 头图内的高光，增加通透感
  glow: "bg-[radial-gradient(circle_at_72%_18%,rgba(255,255,255,0.38)_0%,rgba(255,255,255,0)_62%)]",
};
const SHADOW = {
  card: "shadow-[0_2px_12px_0_rgba(37,99,235,0.10)]",
  lift: "shadow-[0_8px_24px_-8px_rgba(37,99,235,0.32)]",
  bar:  "shadow-[0_-2px_12px_0_rgba(16,35,63,0.06)]",
  btn:  "shadow-[0_6px_16px_-6px_rgba(37,99,235,0.38)]",
  ring: "shadow-[0_0_0_4px_rgba(37,99,235,0.16)]",
};

type TC = "orange" | "blue" | "green" | "red" | "gray" | "amber" | "purple";

// orange=待办、blue=进行中、green=完成、red=异常、amber=亮青、purple=靛蓝
const TAG_CLS: Record<TC, string> = {
  orange: "bg-[#FFF6E5] text-[#B25E00] border border-[#FFE1AE]",
  blue:   "bg-[#EAF4FF] text-[#1D4ED8] border border-[#BFDBFE]",
  green:  "bg-[#E7FAF1] text-[#0E8A55] border border-[#A6EBCB]",
  red:    "bg-[#FEF3F3] text-[#D63C41] border border-[#FDC9C9]",
  gray:   "bg-[#F4F8FD] text-[#5B6B84] border border-[#E4EDF7]",
  amber:  "bg-[#E6F8FF] text-[#0C7BB3] border border-[#BAE9FB]",
  purple: "bg-[#EEF3FF] text-[#4356C4] border border-[#D6E0FF]",
};

const statusColor = (s: string): TC => ({
  "待入库": "orange", "已入库": "green", "差异": "red",
  "待分拣": "orange", "分拣中": "blue", "已分拣": "green",
  "待配送": "orange", "配送中": "blue", "履约完成": "green", "履约失败": "red", "已完成": "green",
  "待装机": "orange", "处理中": "blue", "已装机": "green", "已完成装机": "green",
  "异常": "red", "正常": "green",
}[s] ?? "gray") as TC;

const Tag = ({ label, color, dot }: { label: string; color: TC; dot?: boolean }) => (
  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold ${TAG_CLS[color]}`}>
    {dot && <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />}
    {label}
  </span>
);

// Nav bar：浅色为默认，dark 走主题渐变（不再用深色块）
const NavBar = ({ title, onBack, rightEl, dark = false }: {
  title: string; onBack?: () => void; rightEl?: ReactNode; dark?: boolean;
}) => (
  <div className={`flex items-center h-12 px-4 flex-shrink-0 ${dark ? `${GRAD.hero} text-white` : "bg-white text-[#10233F] border-b border-[#E4EDF7]"}`}>
    {onBack && (
      <button onClick={onBack} className="w-10 h-10 -ml-2 flex items-center justify-center">
        <Ic d={P.chevL} size={22} />
      </button>
    )}
    <span className={`flex-1 text-[17px] font-bold ${onBack ? "mr-10" : ""} text-center`}>{title}</span>
    {rightEl}
  </div>
);

// Status bar
const StatusBar = () => (
  <div className="flex justify-between items-center px-6 py-2 text-xs font-semibold text-[#10233F] bg-white flex-shrink-0">
    <span>9:41</span>
    <div className="flex items-center gap-1.5">
      <svg width="14" height="10" viewBox="0 0 14 10" fill="currentColor">
        <rect x="0" y="4" width="2.5" height="6" rx="0.5" opacity="0.4" />
        <rect x="3.5" y="2.5" width="2.5" height="7.5" rx="0.5" opacity="0.6" />
        <rect x="7" y="0.5" width="2.5" height="9.5" rx="0.5" />
        <rect x="10.5" y="0" width="2.5" height="10" rx="0.5" />
      </svg>
      <svg width="15" height="10" viewBox="0 0 15 10" fill="currentColor">
        <path d="M7.5 2.5a5.5 5.5 0 015.2 3.7l1.7-1.3A8 8 0 007.5 0a8 8 0 00-6.9 4.9l1.7 1.3A5.5 5.5 0 017.5 2.5z" opacity="0.4" />
        <path d="M7.5 5.5a2.5 2.5 0 012.1 1.2l1.7-1.3a5 5 0 00-7.6 0l1.7 1.3A2.5 2.5 0 017.5 5.5z" />
        <circle cx="7.5" cy="8.5" r="1.5" />
      </svg>
      <div className="flex items-center gap-0.5">
        <div className="w-5 h-2.5 rounded-sm border border-current flex items-center px-0.5">
          <div className="w-3.5 h-1.5 bg-current rounded-sm" />
        </div>
      </div>
    </div>
  </div>
);

// Bottom tab bar
const TabBar = ({ active, onChange }: { active: string; onChange: (t: string) => void }) => {
  const tabs = [
    { key: "workbench", label: "工作台", icon: P.grid },
    { key: "mine", label: "我的", icon: P.user },
  ];
  return (
    <div className={`flex bg-white h-[58px] flex-shrink-0 border-t border-[#E4EDF7] ${SHADOW.bar}`}>
      {tabs.map(t => {
        const isActive = active === t.key;
        return (
          <button key={t.key} onClick={() => onChange(t.key)}
            className="flex-1 flex flex-col items-center justify-center gap-1 transition-colors">
            <div className={`px-4 py-1 rounded-full flex items-center justify-center transition-all
              ${isActive ? "bg-[#EAF4FF] text-[#2563EB]" : "text-[#8A9BB4]"}`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth={isActive ? "2.25" : "1.75"} strokeLinecap="round" strokeLinejoin="round">
                <path d={t.icon} />
              </svg>
            </div>
            <span className={`text-[10px] font-semibold ${isActive ? "text-[#2563EB]" : "text-[#8A9BB4]"}`}>{t.label}</span>
            <span className={`w-1 h-1 rounded-full transition-all ${isActive ? `${GRAD.bar} opacity-100` : "opacity-0"}`} />
          </button>
        );
      })}
    </div>
  );
};

// Big action button
const BigBtn = ({ label, icon, onClick, variant = "primary", disabled = false, loading = false }: {
  label: string; icon?: string; onClick?: () => void;
  variant?: "primary" | "secondary" | "danger" | "ghost"; disabled?: boolean; loading?: boolean;
}) => {
  const cls = {
    primary:   `${GRAD.btn} text-white active:bg-[#1D4ED8] ${SHADOW.btn}`,
    secondary: "bg-white text-[#2563EB] border border-[#BFDBFE] active:bg-[#EAF4FF]",
    danger:    "bg-[#E5484D] text-white active:bg-[#C13438]",
    ghost:     "bg-[#EEF4FB] text-[#5B6B84] active:bg-[#E4EDF7]",
  };
  return (
    <button onClick={onClick} disabled={disabled || loading}
      className={`w-full h-14 rounded-2xl flex items-center justify-center gap-3 text-[16px] font-bold transition-all active:scale-[0.98] ${cls[variant]} ${disabled || loading ? "opacity-50 shadow-none" : ""}`}>
      {loading ? (
        <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeOpacity="0.3" />
          <path d="M21 12a9 9 0 00-9-9" />
        </svg>
      ) : icon ? <Ic d={P[icon]} size={20} /> : null}
      {label}
    </button>
  );
};

// Scan zone
const ScanZone = ({ label, sublabel, onClick, success }: { label: string; sublabel?: string; onClick?: () => void; success?: string }) => (
  <button onClick={onClick}
    className={`w-full rounded-3xl border-2 border-dashed flex flex-col items-center justify-center py-8 gap-3 transition-all active:scale-98
      ${success ? "border-[#12B76A] bg-[#E7FAF1]" : "border-[#7CC0FF] bg-[linear-gradient(180deg,#EAF4FF_0%,#F7FBFF_100%)]"}`}>
    {success ? (
      <>
        <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-[0_2px_10px_0_rgba(18,183,106,0.20)]">
          <Ic d={P.checkC} size={28} cls="text-[#12B76A]" />
        </div>
        <div className="text-base font-bold text-[#0E8A55]">{success}</div>
      </>
    ) : (
      <>
        <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-[0_2px_10px_0_rgba(37,99,235,0.26)]">
          <Ic d={P.scan} size={28} cls="text-[#2563EB]" />
        </div>
        <div className="text-base font-bold text-[#1D4ED8]">{label}</div>
        {sublabel && <div className="text-xs text-[#8A9BB4]">{sublabel}</div>}
      </>
    )}
  </button>
);

// Photo zone
const PhotoZone = ({ count = 0, max = 6 }: { count?: number; max?: number }) => {
  const slots = Array.from({ length: max });
  const filledColors = ["#EAF4FF", "#E7FAF1", "#E6F8FF", "#EEF3FF", "#FFF6E5", "#FEF3F3"];
  return (
    <div className="grid grid-cols-3 gap-2">
      {slots.map((_, i) => (
        <div key={i}
          className={`aspect-square rounded-xl flex items-center justify-center overflow-hidden
            ${i < count ? "border-2 border-[#12B76A]" : "border-2 border-dashed border-[#C2D2E5]"}`}
          style={{ background: i < count ? filledColors[i % filledColors.length] : "#F8FAFC" }}>
          {i < count ? (
            <div className="flex flex-col items-center gap-1">
              <Ic d={P.image} size={22} cls="text-[#5B6B84]" />
              <span className="text-[10px] text-[#8A9BB4]">已拍摄</span>
            </div>
          ) : i === count ? (
            <div className="flex flex-col items-center gap-1">
              <Ic d={P.camera} size={22} cls="text-[#C2D2E5]" />
              <span className="text-[10px] text-[#8A9BB4]">拍照</span>
            </div>
          ) : (
            <Ic d={P.plus} size={16} cls="text-[#C2D2E5]" />
          )}
        </div>
      ))}
    </div>
  );
};

// Qty stepper
const QtyStepper = ({ value, onChange }: { value: number; onChange: (v: number) => void }) => (
  <div className="flex items-center gap-3">
    <button onClick={() => onChange(Math.max(0, value - 1))}
      className="w-10 h-10 rounded-full bg-[#EEF4FB] flex items-center justify-center active:bg-[#E4EDF7]">
      <Ic d={P.minus} size={18} cls="text-[#5B6B84]" />
    </button>
    <span className="text-xl font-bold text-[#10233F] w-10 text-center">{value}</span>
    <button onClick={() => onChange(value + 1)}
      className={`w-10 h-10 rounded-full ${GRAD.btn} flex items-center justify-center active:bg-[#1D4ED8]`}>
      <Ic d={P.plus} size={18} cls="text-white" />
    </button>
  </div>
);

// Error banner
const ErrorBanner = ({ title, desc, onRetry }: { title: string; desc: string; onRetry?: () => void }) => (
  <div className="mx-4 mb-3 bg-[#FEF3F3] border border-[#FDC9C9] rounded-2xl p-4">
    <div className="flex items-start gap-3">
      <div className="w-9 h-9 rounded-xl bg-[#E5484D] flex items-center justify-center flex-shrink-0">
        <Ic d={P.alert} size={18} cls="text-white" />
      </div>
      <div className="flex-1">
        <div className="text-sm font-bold text-[#E5484D] mb-0.5">{title}</div>
        <div className="text-xs text-[#9B2C2C] leading-relaxed">{desc}</div>
      </div>
    </div>
    {onRetry && (
      <button onClick={onRetry} className="mt-3 w-full h-10 bg-[#E5484D] text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2">
        <Ic d={P.refresh} size={14} />重试
      </button>
    )}
  </div>
);

// Step progress
const Steps = ({ steps, current }: { steps: string[]; current: number }) => (
  <div className="flex items-center px-4">
    {steps.map((s, i) => (
      <div key={i} className="flex items-center flex-1 last:flex-none">
        <div className="flex flex-col items-center gap-1">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all
            ${i < current ? `${GRAD.btn} border-transparent text-white` : i === current ? `bg-white border-[#2563EB] text-[#2563EB] ${SHADOW.ring}` : "bg-white border-[#E4EDF7] text-[#8A9BB4]"}`}>
            {i < current ? <Ic d={P.check} size={14} /> : i + 1}
          </div>
          <span className={`text-[10px] font-semibold whitespace-nowrap ${i <= current ? "text-[#2563EB]" : "text-[#8A9BB4]"}`}>{s}</span>
        </div>
        {i < steps.length - 1 && (
          <div className={`flex-1 h-[3px] mx-1 mb-4 rounded-full ${i < current ? GRAD.bar : "bg-[#E4EDF7]"}`} />
        )}
      </div>
    ))}
  </div>
);

// Card wrapper
const Card = ({ children, cls = "" }: { children: ReactNode; cls?: string }) => (
  <div className={`bg-white rounded-3xl mx-4 mb-3 overflow-hidden ${SHADOW.card} ${cls}`}>
    {children}
  </div>
);

// KV row
const KV = ({ label, value, accent = false }: { label: string; value: ReactNode; accent?: boolean }) => (
  <div className="flex items-center justify-between py-3 border-b border-[#F4F8FD] last:border-0">
    <span className="text-sm text-[#8A9BB4]">{label}</span>
    <span className={`text-sm font-semibold ${accent ? "text-[#2563EB]" : "text-[#10233F]"}`}>{value}</span>
  </div>
);

// Section header
const Sec = ({ title, action }: { title: string; action?: ReactNode }) => (
  <div className="flex items-center justify-between px-4 pt-4 pb-2">
    <span className="flex items-center gap-1.5 text-xs font-bold text-[#5B6B84] uppercase tracking-wide">
      <span className={`w-1 h-3 rounded-full ${GRAD.bar}`} />{title}
    </span>
    {action}
  </div>
);

// Empty state
const Empty = ({ icon, title, desc }: { icon: string; title: string; desc?: string }) => (
  <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
    <div className="w-16 h-16 rounded-3xl bg-[#EAF4FF] flex items-center justify-center mb-4">
      <Ic d={P[icon]} size={28} cls="text-[#7CC0FF]" />
    </div>
    <div className="text-base font-bold text-[#3A4B66] mb-1">{title}</div>
    {desc && <p className="text-sm text-[#8A9BB4] leading-relaxed">{desc}</p>}
  </div>
);

// ══════════════════════════════════════════════════════════════════════════════
// MOCK DATA
// ══════════════════════════════════════════════════════════════════════════════
const INBOUND_ORDERS = [
  { id: "IB-2509-041", po: "PO-2509-088", type: "采购入库", supplier: "深圳饮料总厂", items: 8, qty: 480, shelf: "A区-03", status: "待入库", created: "2026-09-14 08:00", diff: null },
  { id: "IB-2509-042", po: "PO-2509-089", type: "采购入库", supplier: "零食联合供应链", items: 12, qty: 720, shelf: "B区-07", status: "待入库", created: "2026-09-14 08:30", diff: null },
  { id: "IB-2509-040", po: "PO-2509-086", type: "采购入库", supplier: "百事可乐华南", items: 5, qty: 300, shelf: "A区-05", status: "入库中", created: "2026-09-14 09:15", diff: null },
  { id: "IB-2509-038", po: "PO-2509-082", type: "下架退回", supplier: "深圳饮料总厂", items: 6, qty: 360, shelf: "A区-01", status: "已入库", created: "2026-09-13 14:00", diff: null, diffNo: null, actualQty: 360, diffQty: 0 },
  { id: "IB-2509-035", po: "PO-2509-079", type: "采购入库", supplier: "百事可乐华南", items: 4, qty: 240, shelf: "C区-02", status: "已入库", created: "2026-09-13 10:00", diff: { expected: 240, actual: 228, skus: ["百事可乐 500ml"] }, diffNo: "DIFF-2509-003", actualQty: 228, diffQty: 12 },
];

const IB_ITEMS = [
  { sku: "可口可乐 330ml", barcode: "6901234567890", expected: 96, actual: 0, unit: "罐" },
  { sku: "百事可乐 500ml", barcode: "6901234567891", expected: 72, actual: 0, unit: "瓶" },
  { sku: "农夫山泉 550ml", barcode: "6901234567892", expected: 120, actual: 0, unit: "瓶" },
  { sku: "乐事薯片 75g", barcode: "6901234567893", expected: 60, actual: 0, unit: "袋" },
  { sku: "元气森林气泡水", barcode: "6901234567894", expected: 84, actual: 0, unit: "瓶" },
  { sku: "旺旺雪饼 180g", barcode: "6901234567895", expected: 48, actual: 0, unit: "袋" },
];

// ── 分拣管理数据 ──────────────────────────────────────────────────────────────
type PkOrder = {
  id: string; outboundNo: string; replenishNo: string;
  siteName: string; siteCode: string; siteAddr: string;
  ffBatch: string; orderType: string; demandQty: number; actualQty: number;
  picker: string; createdAt: string; completedAt: string; status: string;
  deliveryNo: string; batchNo: string;
};
const PICK_ORDERS: PkOrder[] = [
  { id:"PK-20260916-001", outboundNo:"OB-20260916-001", replenishNo:"REP-20260916-003",
    siteName:"静安寺商圈A座大堂", siteCode:"SITE-SH-011", siteAddr:"上海市静安区南京西路1601号A座1F",
    ffBatch:"BC-20260916-001", orderType:"补货出库", demandQty:96, actualQty:0,
    picker:"分拣-小张", createdAt:"09-16 08:00", completedAt:"—", status:"待分拣",
    deliveryNo:"DS-20260916-001", batchNo:"BN-20260916-001" },
  { id:"PK-20260916-002", outboundNo:"OB-20260916-002", replenishNo:"REP-20260916-004",
    siteName:"虹桥天地B1餐饮区", siteCode:"SITE-SH-002", siteAddr:"上海市闵行区申长路688号虹桥天地B1层",
    ffBatch:"BC-20260916-002", orderType:"补货出库", demandQty:120, actualQty:72,
    picker:"分拣-小李", createdAt:"09-16 08:30", completedAt:"—", status:"分拣中",
    deliveryNo:"DS-20260916-002", batchNo:"BN-20260916-002" },
  { id:"PK-20260915-008", outboundNo:"OB-20260915-008", replenishNo:"REP-20260915-011",
    siteName:"徐汇滨江C栋办公区", siteCode:"SITE-SH-007", siteAddr:"上海市徐汇区龙腾大道2879号C座",
    ffBatch:"BC-20260915-005", orderType:"补货出库", demandQty:48, actualQty:48,
    picker:"分拣-小王", createdAt:"09-15 14:00", completedAt:"09-15 15:30", status:"已分拣",
    deliveryNo:"DS-20260915-008", batchNo:"BN-20260915-005" },
  { id:"PK-20260915-006", outboundNo:"OB-20260915-006", replenishNo:"REP-20260915-009",
    siteName:"陆家嘴金融中心1号楼", siteCode:"SITE-SH-003", siteAddr:"上海市浦东新区陆家嘴环路1200号1号楼",
    ffBatch:"BC-20260915-004", orderType:"补货出库", demandQty:80, actualQty:80,
    picker:"分拣-小张", createdAt:"09-15 10:00", completedAt:"09-15 11:45", status:"已分拣",
    deliveryNo:"DS-20260915-006", batchNo:"BN-20260915-004" },
];

type PkSku = { skuId: string; img: string; name: string; spec: string; demandQty: number; actualQty: number; checked: boolean };
const INITIAL_SKUS: PkSku[] = [
  { skuId:"S001", img:"💧", name:"矿泉水", spec:"农夫山泉 550ml", demandQty:36, actualQty:36, checked:false },
  { skuId:"S002", img:"🍵", name:"绿茶饮料", spec:"康师傅 500ml", demandQty:24, actualQty:24, checked:false },
  { skuId:"S003", img:"🥤", name:"可口可乐", spec:"330ml 罐装", demandQty:24, actualQty:24, checked:false },
  { skuId:"S004", img:"🥔", name:"乐事薯片", spec:"原味 75g", demandQty:18, actualQty:18, checked:false },
  { skuId:"S005", img:"🫧", name:"元气森林", spec:"苏打水 480ml", demandQty:18, actualQty:18, checked:false },
];

// legacy references kept for PrintView
const PICK_BATCHES = PICK_ORDERS.map(o => ({
  id: o.id, dispatch: o.deliveryNo, locations: 4, items: o.demandQty,
  status: o.status, created: o.createdAt, deadline: o.createdAt,
}));
const PICK_ITEMS = [
  { loc: "A区-03", sku: "可口可乐 330ml", qty: 24, picked: false, barcode: "6901234567890" },
  { loc: "A区-03", sku: "农夫山泉 550ml", qty: 36, picked: false, barcode: "6901234567892" },
  { loc: "B区-07", sku: "乐事薯片 75g", qty: 12, picked: true, barcode: "6901234567893" },
  { loc: "B区-07", sku: "元气森林气泡水", qty: 24, picked: true, barcode: "6901234567894" },
  { loc: "C区-02", sku: "百事可乐 500ml", qty: 18, picked: false, barcode: "6901234567891" },
  { loc: "C区-02", sku: "旺旺雪饼 180g", qty: 12, picked: false, barcode: "6901234567895" },
];

const DELIVERIES = [
  {
    id: "DO-20250910-001",
    pointName: "深圳南山科技园 A3 栋大堂",
    pointCode: "DW-SZ-001",
    address: "深圳市南山区科技园区高新南九道 A3 栋 1F 大堂",
    currentBatch: 1, totalBatch: 5, status: "配送中",
    batch: "DC-2509-B01", batchSeq: 1,
    stops: 6, done: 2, driver: "张伟", area: "南山区", dist: "12.5km", created: "09-14 10:00", failReason: "",
  },
  {
    id: "DO-20250910-006",
    pointName: "深圳福田华强北商业广场",
    pointCode: "DW-SZ-006",
    address: "深圳市福田区华强北路 1019 号华强北商业广场 B1",
    currentBatch: 1, totalBatch: 5, status: "配送中",
    batch: "DC-2509-B01", batchSeq: 1,
    stops: 4, done: 1, driver: "张伟", area: "福田区", dist: "8.2km", created: "09-14 10:00", failReason: "",
  },
  {
    id: "DO-20250910-007",
    pointName: "上海浦东陆家嘴金融广场",
    pointCode: "DW-SH-007",
    address: "上海市浦东新区银城中路 68 号陆家嘴金融广场 G 层",
    currentBatch: 2, totalBatch: 5, status: "配送中",
    batch: "DC-2509-B02", batchSeq: 2,
    stops: 5, done: 2, driver: "李强", area: "浦东新区", dist: "9.4km", created: "09-14 09:30", failReason: "",
  },
  {
    id: "DO-20250910-008",
    pointName: "上海静安寺商圈汇丰银行大厦",
    pointCode: "DW-SH-008",
    address: "上海市静安区南京西路 1601 号汇丰银行大厦 1F",
    currentBatch: 2, totalBatch: 5, status: "配送中",
    batch: "DC-2509-B02", batchSeq: 2,
    stops: 3, done: 1, driver: "李强", area: "静安区", dist: "6.1km", created: "09-14 09:30", failReason: "",
  },
  {
    id: "DO-20250910-009",
    pointName: "北京朝阳国贸大厦 A 座",
    pointCode: "DW-BJ-009",
    address: "北京市朝阳区建国门外大街 1 号国贸大厦 A 座 1F",
    currentBatch: 3, totalBatch: 5, status: "配送中",
    batch: "DC-2509-B03", batchSeq: 3,
    stops: 6, done: 4, driver: "王磊", area: "朝阳区", dist: "18.5km", created: "09-14 08:00", failReason: "",
  },
  {
    id: "DO-20250910-010",
    pointName: "北京海淀中关村软件园",
    pointCode: "DW-BJ-010",
    address: "北京市海淀区上地十街 10 号软件园二期 D 座",
    currentBatch: 3, totalBatch: 5, status: "配送中",
    batch: "DC-2509-B03", batchSeq: 3,
    stops: 4, done: 2, driver: "王磊", area: "海淀区", dist: "22.0km", created: "09-14 08:00", failReason: "",
  },
  {
    id: "DO-20250910-011",
    pointName: "广州天河正佳广场 B2",
    pointCode: "DW-GZ-011",
    address: "广州市天河区天河路 228 号正佳广场 B2 中庭",
    currentBatch: 4, totalBatch: 5, status: "配送中",
    batch: "DC-2509-B04", batchSeq: 4,
    stops: 5, done: 3, driver: "陈强", area: "天河区", dist: "14.7km", created: "09-14 07:30", failReason: "",
  },
  {
    id: "DO-20250910-012",
    pointName: "成都春熙路太古里东区",
    pointCode: "DW-CD-012",
    address: "成都市锦江区中纱帽街 8 号远洋太古里东区 1F",
    currentBatch: 5, totalBatch: 5, status: "配送中",
    batch: "DC-2509-B05", batchSeq: 5,
    stops: 3, done: 2, driver: "刘洋", area: "锦江区", dist: "11.3km", created: "09-14 07:00", failReason: "",
  },
  {
    id: "DO-20250910-002",
    pointName: "上海虹桥天地购物中心 B1 餐饮区",
    pointCode: "DW-SH-002",
    address: "上海市闵行区申长路 688 号虹桥天地 B1 层中心广场",
    currentBatch: 1,
    totalBatch: 4,
    status: "待配送",
    batch: "DC-2509-019",
    stops: 4,
    done: 0,
    driver: "李强",
    area: "闵行区",
    dist: "8.7km",
    created: "09-14 09:00",
    failReason: "",
  },
  {
    id: "DO-20250910-003",
    pointName: "北京国贸中心 3 期 B3 停车场",
    pointCode: "DW-BJ-003",
    address: "北京市朝阳区建国门外大街 1 号国贸 3 期 B3 停车场 A 区",
    currentBatch: 5,
    totalBatch: 5,
    status: "履约完成",
    batch: "DC-2509-015",
    stops: 8,
    done: 8,
    driver: "张伟",
    area: "朝阳区",
    dist: "24.1km",
    created: "09-13 14:00",
    failReason: "",
  },
  {
    id: "DO-20250910-004",
    pointName: "成都天府软件园 D 区 2 栋",
    pointCode: "DW-CD-004",
    address: "成都市高新区天府大道中段 1388 号天府软件园 D2 栋大堂",
    currentBatch: 2,
    totalBatch: 4,
    status: "履约失败",
    batch: "DC-2509-012",
    stops: 5,
    done: 2,
    driver: "王磊",
    area: "高新区",
    dist: "21.3km",
    created: "09-12 10:00",
    failReason: "门锁故障与网络离线，无法完成现场电子开门",
  },
  {
    id: "DO-20250910-005",
    pointName: "广州天河城购物中心 2F 中庭",
    pointCode: "DW-GZ-006",
    address: "广州市天河区天河路 208 号天河城购物中心 2F 中庭南侧",
    currentBatch: 1,
    totalBatch: 3,
    status: "待配送",
    batch: "DC-2509-020",
    stops: 6,
    done: 0,
    driver: "陈强",
    area: "天河区",
    dist: "15.2km",
    created: "09-14 11:30",
    failReason: "",
  }
];

const DV_STOPS = [
  { seq: 1, name: "蜂巢·科技园北楼1F", addr: "南山区科技园北区", items: 48, status: "已完成", time: "09:45" },
  { seq: 2, name: "天利中央广场B3", addr: "南山区天利中央广场", items: 32, status: "已完成", time: "10:20" },
  { seq: 3, name: "皇庭广场1F-A5", addr: "福田区华强北皇庭", items: 56, status: "配送中", time: null },
  { seq: 4, name: "万象城B2-C08", addr: "罗湖区万象城", items: 40, status: "待配送", time: null },
  { seq: 5, name: "光明新城购物中心3F", addr: "光明区光明新城", items: 24, status: "待配送", time: null },
  { seq: 6, name: "龙华壹方城2F", addr: "龙华区壹方城", items: 36, status: "待配送", time: null },
];

const INSTALL_ORDERS = [
  { id: "WO-2509-015", siteCode: "SITE-SZ-088", loc: "蜂巢·科技园北楼1F", addr: "广东省深圳市南山区科技园北区北楼1F", lat: "22.5401", lng: "113.9523", model: "智柜 Pro X8", cabinetCode: "CB-2026-0088", qty: 1, tech: "陈刚", status: "待装机", demandDate: "2026-09-14 17:00", contact: "张主任", phone: "138-8888-0001", note: "门禁需联系物业，物业联系人：李主任，进场前提前30分钟通知", installLocation: "大堂右侧自动门旁，距墙50cm，需固定底座" },
  { id: "WO-2509-016", siteCode: "SITE-SZ-089", loc: "天利中央广场B3-12",   addr: "广东省深圳市南山区天利中央广场B3-12",    lat: "22.5312", lng: "113.9388", model: "智柜 Max X12", cabinetCode: "CB-2026-0089", qty: 2, tech: "陈刚", status: "处理中",  demandDate: "2026-09-14 17:00", contact: "陈主任", phone: "139-7777-0002", note: "B3层货梯限重800kg，设备需拆分搬运，现场已确认电源位置", installLocation: "B3层中央通道北侧，紧邻电梯厅，已预留220V电源" },
  { id: "WO-2509-012", siteCode: "SITE-SZ-045", loc: "皇庭广场1F-A5",        addr: "广东省深圳市福田区华强北皇庭广场1F-A5", lat: "22.5454", lng: "114.0878", model: "智柜 Pro X8", cabinetCode: "CB-2026-0045", qty: 1, tech: "陈刚", status: "已装机",  demandDate: "2026-09-13 16:00", contact: "李经理", phone: "136-6666-0003", note: "装机已完成，设备运行正常，客户已签字验收", installLocation: "1F-A5铺位门口左侧，已安装固定支架" },
];

// ══════════════════════════════════════════════════════════════════════════════
// SCREEN: LOGIN
// ══════════════════════════════════════════════════════════════════════════════
// 品牌标识（闪购星官方图形标，白底砖块承载），登录页 / 我的页 / 页面导航共用
const BrandMark = ({ size = 44, cls = "" }: { size?: number; cls?: string }) => (
  <div className={`rounded-2xl bg-white flex items-center justify-center flex-shrink-0 ${cls}`} style={{ width: size, height: size }}>
    <img src={brandMark} alt="闪购星"
      style={{ width: size * 0.7, height: size * 0.7, objectFit: "contain" }} />
  </div>
);

const LoginScreen = ({ onLogin }: { onLogin: (role: string) => void }) => (
  <div className="h-full flex flex-col bg-[#F4F8FD]">
    {/* 品牌渐变头 */}
    <div className={`${GRAD.hero} px-6 pt-12 pb-16 flex-shrink-0 relative overflow-hidden`}>
      <div className={`absolute inset-0 ${GRAD.glow}`} />
      <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/15" />
      <div className="absolute right-12 bottom-4 w-14 h-14 rounded-full bg-white/10" />
      <div className="relative flex items-center gap-3 mb-6">
        <BrandMark size={44} />
        <div>
          <div className="text-lg font-bold text-white tracking-wide">闪购星 · 履约执行</div>
          <div className="text-[11px] text-white/75 tracking-wider">FLASHBUY STAR</div>
        </div>
      </div>
      <div className="relative text-[26px] font-bold text-white mb-3 leading-tight">欢迎回来，师傅</div>
      {/* 流程引导：让一线员工一眼知道登录后要做什么 */}
      <div className="relative flex items-center gap-1.5 flex-wrap">
        {["入库", "分拣", "配送", "装机"].map((s, i) => (
          <span key={s} className="flex items-center gap-1.5">
            <span className="px-2.5 py-1 rounded-full bg-white/20 text-white text-[11px] font-semibold">{s}</span>
            {i < 3 && <Ic d={P.chevR} size={11} cls="text-white/60" />}
          </span>
        ))}
      </div>
    </div>

    <div className="flex-1 -mt-8 rounded-t-[28px] bg-[#F4F8FD] px-4 pt-6 flex flex-col relative">
      {/* Credentials */}
      <div className={`bg-white rounded-3xl px-4 mb-5 ${SHADOW.card}`}>
        <div className="py-3.5 border-b border-[#F4F8FD] flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#EAF4FF] flex items-center justify-center flex-shrink-0">
            <Ic d={P.phone} size={16} cls="text-[#2563EB]" />
          </div>
          <div className="flex-1">
            <label className="text-[10px] text-[#8A9BB4] block">手机号</label>
            <input defaultValue="138-8888-3301" type="tel" className="w-full text-[15px] font-semibold text-[#10233F] outline-none" />
          </div>
        </div>
        <div className="py-3.5 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#EAF4FF] flex items-center justify-center flex-shrink-0">
            <Ic d={P.lock} size={16} cls="text-[#2563EB]" />
          </div>
          <div className="flex-1">
            <label className="text-[10px] text-[#8A9BB4] block">密码</label>
            <input defaultValue="••••••••" type="password" className="w-full text-[15px] font-semibold text-[#10233F] outline-none" />
          </div>
        </div>
      </div>

      <BigBtn label="登录工作台" icon="arrow" onClick={() => onLogin("driver")} />

      <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-[#8A9BB4]">
        <Ic d={P.checkC} size={12} cls="text-[#12B76A]" />企业内部账号 · 操作全程留痕
      </div>
    </div>
  </div>
);

// ══════════════════════════════════════════════════════════════════════════════
// SCREEN: WORKBENCH HOME
// ══════════════════════════════════════════════════════════════════════════════
const WorkbenchHome = ({ onNavigate, tab, onTabChange }: {
  onNavigate: (p: string) => void; tab: string; onTabChange: (t: string) => void;
}) => {
  const ROLE_MODULES = [
    { key: "inbound-list", label: "仓储入库", icon: P.download, color: "#2563EB", bg: "#EAF4FF", count: 2, unit: "待入库", urgent: true },
    { key: "pick-list", label: "分拣管理", icon: P.layers, color: "#4356C4", bg: "#EEF3FF", count: 2, unit: "待分拣", urgent: true },
    { key: "delivery-list", label: "配送任务", icon: P.truck, color: "#0C7BB3", bg: "#E6F8FF", count: 1, unit: "待配送", urgent: false },
    { key: "install-list", label: "装机工单", icon: P.wrench, color: "#0E8A55", bg: "#E7FAF1", count: 2, unit: "待处理", urgent: true },
  ];
  
  return (
    <div className="h-full flex flex-col">
      {/* 品牌渐变头 */}
      <div className={`${GRAD.hero} px-5 pt-2 pb-10 flex-shrink-0 relative overflow-hidden`}>
        <div className={`absolute inset-0 ${GRAD.glow}`} />
        <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-white/10" />
        <div className="absolute right-16 top-14 w-10 h-10 rounded-full bg-white/10" />
        <div className="relative flex items-center justify-between mb-4">
          <div>
            <div className="text-white text-lg font-bold">早上好，张师傅</div>
            <div className="text-white/80 text-xs mt-0.5">09月14日 周日 · 今日有 <span className="text-white font-bold">7</span> 项任务</div>
          </div>
          <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center relative">
            <Ic d={P.bell} size={18} cls="text-white" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FFF6E5] rounded-full" />
          </button>
        </div>
        {/* Summary strip：首格白底突出总量，其余半透做层次 */}
        <div className="relative grid grid-cols-4 gap-2">
          {[['7', '总任务'], ['4', '进行中'], ['3', '待处理'], ['0', '异常']].map(([v, l], i) => (
            <div key={l} className={`rounded-2xl py-3 text-center ${i === 0 ? "bg-white shadow-[0_4px_14px_-4px_rgba(16,35,63,0.28)]" : "bg-white/20"}`}>
              <div className={`text-xl font-bold leading-none ${i === 0 ? "text-[#2563EB]" : "text-white"}`}>{v}</div>
              <div className={`text-[10px] mt-1.5 ${i === 0 ? "text-[#8A9BB4]" : "text-white/85"}`}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-[#F4F8FD] pb-20 pt-5">
        {/* 任务模块：2×2 大卡片，待办数量一眼可见 */}
        <div className={`mx-4 bg-white rounded-3xl px-4 pt-6 pb-4 mb-3 ${SHADOW.card}`}>
          <div className="flex items-center justify-between pb-4">
            <span className="flex items-center gap-1.5 text-[15px] font-bold text-[#10233F]">
              <span className={`w-1 h-3.5 rounded-full ${GRAD.bar}`} />我的任务
            </span>
            <span className="text-[11px] text-[#8A9BB4]">按履约流程排序</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {ROLE_MODULES.map(m => (
              <button key={m.key} onClick={() => onNavigate(m.key)}
                className="text-left rounded-2xl px-3.5 py-4 border border-[#E4EDF7] active:scale-[0.97] transition-all relative overflow-hidden"
                style={{ background: `linear-gradient(180deg, ${m.bg} 0%, #FFFFFF 72%)` }}>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center flex-shrink-0"
                    style={{ boxShadow: `0 2px 8px -2px ${m.color}55` }}>
                    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke={m.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d={m.icon} />
                    </svg>
                  </div>
                  {m.urgent && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#FFF6E5] text-[#B25E00] border border-[#FFE1AE]">待办</span>
                  )}
                </div>
                <div className="text-[15px] font-bold text-[#10233F] leading-none">{m.label}</div>
                <div className="mt-1.5 text-[11px] font-semibold" style={{ color: m.color }}>{m.count} {m.unit}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <TabBar active={tab} onChange={onTabChange} />
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// SCREEN: INBOUND LIST
// ══════════════════════════════════════════════════════════════════════════════
const InboundList = ({ onDetail, onDoneDetail, onBack, tab, onTabChange }: {
  onDetail: (id: string) => void; onDoneDetail: (id: string) => void; onBack: () => void; tab: string; onTabChange: (t: string) => void;
}) => {
  const [filter, setFilter] = useState("全部");
  const FILTERS = ["全部", "待入库", "入库中", "已入库", "差异"];
  const filtered = INBOUND_ORDERS.filter(o => filter === "全部" || o.status === filter);

  return (
    <div className="h-full flex flex-col">
      <div className="bg-white flex-shrink-0">
        <NavBar title="仓储入库" onBack={onBack} rightEl={
          <button className="w-10 h-10 flex items-center justify-center">
            <Ic d={P.scan} size={20} cls="text-[#2563EB]" />
          </button>
        } />
        <div className="flex gap-2 px-4 py-3 overflow-x-auto">
          {FILTERS.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all
                ${filter === f ? "bg-[#2563EB] text-white" : "bg-[#EEF4FB] text-[#5B6B84]"}`}>
              {f}
              {f === "待入库" && <span className="ml-1 bg-white/30 rounded-full px-1.5">2</span>}
              {f === "入库中" && <span className="ml-1 bg-white/30 rounded-full px-1.5">1</span>}
              {f === "差异" && <span className="ml-1 bg-white/30 rounded-full px-1.5">1</span>}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-[#F4F8FD] pt-1 pb-4">
        {filtered.length === 0 ? <Empty icon="box" title="暂无入库单" /> : (
          filtered.map(o => (
            <div key={o.id} className="bg-white mx-4 mb-3 rounded-2xl overflow-hidden shadow-[0_2px_12px_0_rgba(37,99,235,0.10)]">
              <div className={`h-1 w-full ${o.status === "待入库" ? "bg-[#2563EB]" : o.status === "已入库" ? "bg-[#12B76A]" : "bg-[#E5484D]"}`} />
              <div className="px-4 pt-3 pb-4 space-y-2">
                {/* 入库单号 + 状态 */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-bold text-[#10233F]">{o.id}</span>
                  <Tag label={o.status} color={statusColor(o.status)} dot />
                </div>
                {o.status === "已入库" ? (
                  <>
                    {([
                      ["关联差异单号", (o as any).diffNo ?? "/"],
                      ["入库类型", o.type],
                      ["总需求件数", o.qty + " 件"],
                      ["入库商品总数", ((o as any).actualQty ?? o.qty) + " 件"],
                      ["差异数量", ((o as any).diffQty ?? 0) + " 件"],
                      ["创建时间", o.created],
                    ] as [string, string][]).map(([label, value]) => (
                      <div key={label} className="flex items-center justify-between text-xs">
                        <span className="text-[#8A9BB4]">{label}</span>
                        <span className={`font-medium ${label === "差异数量" && (o as any).diffQty > 0 ? "text-[#E5484D]" : "text-[#3A4B66]"}`}>{value}</span>
                      </div>
                    ))}
                    <div className="flex gap-2 pt-1">
                      <button onClick={() => onDoneDetail(o.id)}
                        className="flex-1 py-2 rounded-xl text-xs font-semibold bg-[#E7FAF1] text-[#12B76A] active:bg-[#D2F7E5] transition-colors">
                        详情
                      </button>
                      {(o as any).diffNo && (
                        <button className="flex-1 py-2 rounded-xl text-xs font-semibold bg-[#FEF3F3] text-[#E5484D] active:bg-[#FFE4E4] transition-colors">
                          差异单详情
                        </button>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    {([
                      ["关联采购单号", o.po],
                      ["入库类型", o.type],
                      ["总需求件数", o.qty + " 件"],
                      ["创建时间", o.created],
                    ] as [string, string][]).map(([label, value]) => (
                      <div key={label} className="flex items-center justify-between text-xs">
                        <span className="text-[#8A9BB4]">{label}</span>
                        <span className="text-[#3A4B66] font-medium">{value}</span>
                      </div>
                    ))}
                    <div className="pt-1">
                      <button onClick={() => onDetail(o.id)}
                        className={`w-full py-2 rounded-xl text-xs font-semibold transition-colors ${o.status === "入库中" ? "bg-[#2563EB] text-white active:bg-[#1D4ED8]" : "bg-[#EAF4FF] text-[#2563EB] active:bg-[#DBEAFE]"}`}>
                        {o.status === "入库中" ? "继续入库" : "操作入库"}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <TabBar active={tab} onChange={onTabChange} />
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// SCREEN: INBOUND DETAIL (scan + qty + submit)
// ══════════════════════════════════════════════════════════════════════════════
const InboundDetail = ({ orderId, onBack, onSuccess, onError }: {
  orderId: string; onBack: () => void; onSuccess: () => void; onError: (type: string) => void;
}) => {
  const order = INBOUND_ORDERS.find(o => o.id === orderId) ?? INBOUND_ORDERS[0];
  // scannedItems: barcode → actual qty entered
  const [scannedItems, setScannedItems] = useState<{ sku: string; barcode: string; unit: string; expected: number; actual: number }[]>([]);
  // view: "scan" | "modal" | "list"
  const [view, setView] = useState<"scan" | "modal" | "list">("scan");
  const [modalItem, setModalItem] = useState<{ sku: string; barcode: string; unit: string; expected: number } | null>(null);
  const [modalQty, setModalQty] = useState(0);

  const handleScan = (item: typeof IB_ITEMS[0]) => {
    setModalItem(item);
    setModalQty(item.expected);
    setView("modal");
  };

  const handleConfirm = (andContinue: boolean) => {
    if (!modalItem) return;
    setScannedItems(prev => {
      const existing = prev.find(i => i.barcode === modalItem.barcode);
      if (existing) return prev.map(i => i.barcode === modalItem.barcode ? { ...i, actual: modalQty } : i);
      return [...prev, { ...modalItem, actual: modalQty }];
    });
    if (andContinue) {
      setView("scan");
    } else {
      setView("list");
    }
    setModalItem(null);
  };

  // Simulate scan: cycles through IB_ITEMS not yet scanned
  const doScan = () => {
    const notYet = IB_ITEMS.filter(i => !scannedItems.find(s => s.barcode === i.barcode));
    const target = notYet.length > 0 ? notYet[0] : IB_ITEMS[Math.floor(Math.random() * IB_ITEMS.length)];
    handleScan(target);
  };

  return (
    <div className="h-full flex flex-col bg-[#F4F8FD]">
      <div className="bg-white flex-shrink-0">
        <NavBar title="入库操作" onBack={onBack} />
        <div className="px-4 pb-3 flex items-center gap-2 border-t border-[#EEF4FB] pt-2">
          <div className="w-2 h-2 rounded-full bg-[#12B76A] flex-shrink-0"></div>
          <span className="text-[11px] text-[#5B6B84]">当前仓库</span>
          <span className="text-sm font-bold text-[#10233F]">浦东配送仓</span>
        </div>
      </div>

      {/* ── SCAN VIEW ── */}
      {view === "scan" && (
        <div className="flex-1 flex flex-col">
          {/* Order badge */}
          <div className="bg-white px-4 py-3 border-b border-[#EEF4FB] flex items-center justify-between">
            <div>
              <div className="text-xs text-[#8A9BB4] font-mono">{order.id}</div>
              <div className="text-sm font-bold text-[#10233F]">{order.supplier}</div>
            </div>
            <Tag label={order.status} color={statusColor(order.status)} dot />
          </div>
          <div className="flex-1 flex flex-col items-center justify-center px-6 gap-6">
            {/* Fake scan frame */}
            <div className="relative w-64 h-64 flex items-center justify-center">
              {/* Corner marks */}
              {[["top-0 left-0","border-t-4 border-l-4"],["top-0 right-0","border-t-4 border-r-4"],["bottom-0 left-0","border-b-4 border-l-4"],["bottom-0 right-0","border-b-4 border-r-4"]].map(([pos, b]) => (
                <div key={pos} className={`absolute w-8 h-8 ${pos} ${b} border-[#7CC0FF] rounded-sm`} />
              ))}
              {/* Scan line animation */}
              <div className="w-full h-0.5 bg-[#2563EB]/60 absolute animate-bounce" style={{ top: "50%" }} />
              <div className="text-center">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#56A9FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-2 opacity-40">
                  <path d="M3 5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" />
                  <rect x="7" y="7" width="10" height="10" rx="1" />
                </svg>
                <div className="text-xs text-[#8A9BB4]">将商品 69 码对准扫描框</div>
              </div>
            </div>
            <button onClick={doScan}
              className="w-full py-4 bg-[#2563EB] text-white rounded-2xl text-base font-bold active:bg-[#1D4ED8] transition-colors flex items-center justify-center gap-2">
              <Ic d={P.scan} size={20} />
              点击模拟扫码
            </button>
            <button onClick={() => setView("list")} className="text-sm text-[#5B6B84] font-medium">
              查看已扫列表（{scannedItems.length} 件）
            </button>
          </div>
        </div>
      )}

      {/* ── MODAL VIEW ── */}
      {view === "modal" && modalItem && (
        <div className="flex-1 flex flex-col">
          <div className="flex-1 flex items-end">
            <div className="w-full bg-white rounded-t-3xl shadow-xl px-5 pt-6 pb-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <div className="text-base font-bold text-[#10233F]">商品详情</div>
                <button onClick={() => setView("scan")} className="w-8 h-8 rounded-full bg-[#EEF4FB] flex items-center justify-center text-[#5B6B84]">✕</button>
              </div>
              {/* Product image */}
              <div className="w-full h-36 rounded-2xl bg-[#F8FAFC] border border-[#E4EDF7] flex items-center justify-center mb-4 overflow-hidden">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#C2D2E5" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>
                </svg>
              </div>
              {/* Product info */}
              <div className="mb-5">
                <div className="text-base font-bold text-[#10233F] mb-0.5">{modalItem.sku}</div>
                <div className="font-mono text-xs text-[#8A9BB4] mb-3">{modalItem.barcode}</div>
                <div className="flex items-center justify-between py-2.5 border-t border-[#EEF4FB]">
                  <span className="text-sm text-[#5B6B84]">需入库数量</span>
                  <span className="text-sm font-bold text-[#10233F]">{modalItem.expected} {modalItem.unit}</span>
                </div>
              </div>
              {/* Qty input */}
              <div className="mb-6">
                <div className="text-xs font-semibold text-[#3A4B66] mb-2">实收数量</div>
                <div className="flex items-center gap-3">
                  <button onClick={() => setModalQty(q => Math.max(0, q - 1))}
                    className="w-11 h-11 rounded-full bg-[#EEF4FB] text-[#3A4B66] text-xl font-bold flex items-center justify-center active:bg-[#E4EDF7]">−</button>
                  <input type="number" value={modalQty} onChange={e => setModalQty(Math.max(0, Number(e.target.value)))}
                    className="flex-1 h-11 text-center text-xl font-bold text-[#10233F] border border-[#E4EDF7] rounded-xl outline-none focus:border-[#2563EB]" />
                  <button onClick={() => setModalQty(q => q + 1)}
                    className="w-11 h-11 rounded-full bg-[#2563EB] text-white text-xl font-bold flex items-center justify-center active:bg-[#1D4ED8]">+</button>
                </div>
                {modalQty !== modalItem.expected && (
                  <div className="mt-2 text-xs text-[#E5484D] text-center">与预期差 {modalQty - modalItem.expected} {modalItem.unit}</div>
                )}
              </div>
              {/* Actions */}
              <div className="flex gap-3">
                <button onClick={() => handleConfirm(false)}
                  className="flex-1 py-3.5 rounded-2xl border-2 border-[#7CC0FF] text-[#2563EB] text-sm font-bold active:bg-[#EAF4FF] transition-colors">
                  确定，返回列表
                </button>
                <button onClick={() => handleConfirm(true)}
                  className="flex-1 py-3.5 rounded-2xl bg-[#2563EB] text-white text-sm font-bold active:bg-[#1D4ED8] transition-colors">
                  确定，并继续
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── LIST VIEW ── */}
      {view === "list" && (
        <>
        <div className="flex-1 overflow-y-auto pb-4 pt-2">
          <div className="flex items-center justify-between px-4 py-2">
            <div className="text-sm font-semibold text-[#3A4B66]">已扫商品（{scannedItems.length} 种）</div>
            <button onClick={() => setView("scan")}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2563EB] text-white rounded-full text-xs font-semibold active:bg-[#1D4ED8] transition-colors">
              <Ic d={P.scan} size={13} />
              扫码
            </button>
          </div>

          {scannedItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-[#8A9BB4]">
              <Ic d={P.box} size={40} cls="mb-3 opacity-30" />
              <div className="text-sm">暂无已扫商品</div>
              <button onClick={() => setView("scan")} className="mt-4 px-5 py-2 bg-[#2563EB] text-white rounded-full text-sm font-semibold">开始扫码</button>
            </div>
          ) : (
            scannedItems.map(it => (
              <Card key={it.barcode}>
                <div className={`px-4 py-3 ${it.actual !== it.expected ? "bg-[#FEF3F3]" : ""}`}>
                  <div className="flex items-start gap-3">
                    {/* Product image */}
                    <div className="w-14 h-14 rounded-xl bg-[#F8FAFC] border border-[#E4EDF7] flex items-center justify-center flex-shrink-0 overflow-hidden">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C2D2E5" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <div className="min-w-0 flex-1 mr-2">
                          <div className="text-[14px] font-bold text-[#10233F] truncate">{it.sku}</div>
                          <div className="text-[10px] text-[#8A9BB4] font-mono">{it.barcode}</div>
                        </div>
                        {it.actual !== it.expected
                          ? <Tag label="差异" color="red" dot />
                          : <Tag label="已对" color="green" dot />}
                      </div>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-xs text-[#5B6B84]">预计 <span className="font-bold text-[#10233F]">{it.expected}</span> {it.unit}</span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs text-[#5B6B84]">实收</span>
                          <div className="flex items-center gap-1">
                            <button onClick={() => setScannedItems(prev => prev.map(x => x.barcode === it.barcode ? { ...x, actual: Math.max(0, x.actual - 1) } : x))}
                              className="w-6 h-6 rounded-full bg-[#EEF4FB] text-[#3A4B66] text-sm font-bold flex items-center justify-center active:bg-[#E4EDF7]">−</button>
                            <input type="number" value={it.actual}
                              onChange={e => setScannedItems(prev => prev.map(x => x.barcode === it.barcode ? { ...x, actual: Math.max(0, Number(e.target.value)) } : x))}
                              className={`w-12 h-6 text-center text-sm font-bold border rounded-lg outline-none focus:border-[#2563EB] ${it.actual !== it.expected ? "text-[#E5484D] border-[#FDC9C9]" : "text-[#12B76A] border-[#E4EDF7]"}`} />
                            <button onClick={() => setScannedItems(prev => prev.map(x => x.barcode === it.barcode ? { ...x, actual: x.actual + 1 } : x))}
                              className="w-6 h-6 rounded-full bg-[#2563EB] text-white text-sm font-bold flex items-center justify-center active:bg-[#1D4ED8]">+</button>
                          </div>
                          <span className="text-xs text-[#5B6B84]">{it.unit}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Fixed bottom bar */}
        <div className="flex-shrink-0 bg-white border-t border-[#EEF4FB] px-4 pt-3 pb-4">
          {/* Stats grid: 3 columns */}
          <div className="grid grid-cols-3 mb-3">
            {/* 需求 */}
            <div className="flex flex-col items-center gap-0.5">
              <div className="text-[10px] text-[#8A9BB4]">需求品类数</div>
              <div className="text-sm font-bold text-[#10233F]">{IB_ITEMS.length}</div>
              <div className="text-[10px] text-[#8A9BB4]">需求件数</div>
              <div className="text-sm font-bold text-[#10233F]">{IB_ITEMS.reduce((s, i) => s + i.expected, 0)}</div>
            </div>
            {/* 入库 */}
            <div className="flex flex-col items-center gap-0.5 border-x border-[#EEF4FB]">
              <div className="text-[10px] text-[#8A9BB4]">入库品类数</div>
              <div className="text-sm font-bold text-[#12B76A]">{scannedItems.length}</div>
              <div className="text-[10px] text-[#8A9BB4]">入库件数</div>
              <div className="text-sm font-bold text-[#12B76A]">{scannedItems.reduce((s, i) => s + i.actual, 0)}</div>
            </div>
            {/* 差异 */}
            <div className="flex flex-col items-center gap-0.5">
              <div className="text-[10px] text-[#8A9BB4]">差异品类数</div>
              <div className={`text-sm font-bold ${scannedItems.filter(i => i.actual !== i.expected).length > 0 ? "text-[#E5484D]" : "text-[#10233F]"}`}>{scannedItems.filter(i => i.actual !== i.expected).length}</div>
              <div className="text-[10px] text-[#8A9BB4]">差异件数</div>
              <div className={`text-sm font-bold ${scannedItems.filter(i => i.actual !== i.expected).reduce((s, i) => s + Math.abs(i.actual - i.expected), 0) > 0 ? "text-[#E5484D]" : "text-[#10233F]"}`}>{scannedItems.filter(i => i.actual !== i.expected).reduce((s, i) => s + Math.abs(i.actual - i.expected), 0)}</div>
            </div>
          </div>
          {/* Full-width confirm button */}
          <BigBtn label="确认提交入库" icon="check" onClick={onSuccess} disabled={scannedItems.length === 0} />
        </div>
        </>
      )}
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// SCREEN: INBOUND DONE DETAIL (read-only view for completed inbound orders)
// ══════════════════════════════════════════════════════════════════════════════
const InboundDoneDetail = ({ orderId, onBack }: { orderId: string; onBack: () => void }) => {
  const order = INBOUND_ORDERS.find(o => o.id === orderId) ?? INBOUND_ORDERS[0];
  const doneItems = IB_ITEMS.map((it, idx) => ({
    ...it,
    actual: idx === 0 ? it.expected : idx === 1 ? it.expected - 2 : it.expected + 1,
  }));
  const totalExpected = doneItems.reduce((s, i) => s + i.expected, 0);
  const totalActual = doneItems.reduce((s, i) => s + i.actual, 0);
  const diffItems = doneItems.filter(i => i.actual !== i.expected);

  return (
    <div className="h-full flex flex-col bg-[#F4F8FD]">
      <div className="bg-white flex-shrink-0">
        <NavBar title="入库详情" onBack={onBack} />
        <div className="px-4 pb-3 flex items-center gap-2 border-t border-[#EEF4FB] pt-2">
          <div className="w-2 h-2 rounded-full bg-[#12B76A] flex-shrink-0"></div>
          <span className="text-[11px] text-[#5B6B84]">当前仓库</span>
          <span className="text-sm font-bold text-[#10233F]">浦东配送仓</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-4">
        {/* Order info card */}
        <Card>
          <div className="px-4 py-3">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-base font-bold text-[#10233F]">{order.id}</div>
                <div className="text-xs text-[#8A9BB4] mt-0.5">关联采购单 {order.po}</div>
              </div>
              <Tag label="已入库" color="green" dot />
            </div>
            {([
              ["入库类型", order.type],
              ["关联差异单号", (order as any).diffNo ?? "/"],
              ["总需求件数", order.qty + " 件"],
              ["入库商品总数", ((order as any).actualQty ?? order.qty) + " 件"],
              ["差异数量", ((order as any).diffQty ?? 0) + " 件"],
              ["创建时间", order.created],
            ] as [string, string][]).map(([label, value]) => (
              <div key={label} className="flex items-center justify-between text-xs py-1.5 border-t border-[#F8FAFC]">
                <span className="text-[#8A9BB4]">{label}</span>
                <span className={`font-medium ${label === "差异数量" && (order as any).diffQty > 0 ? "text-[#E5484D]" : "text-[#3A4B66]"}`}>{value}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Stats summary */}
        <div className="grid grid-cols-3 bg-white mx-4 mt-3 rounded-2xl shadow-sm border border-[#EEF4FB] overflow-hidden">
          {[
            { label: "需求品类/件数", v1: doneItems.length, v2: totalExpected, color: "#10233F" },
            { label: "入库品类/件数", v1: doneItems.length, v2: totalActual, color: "#12B76A" },
            { label: "差异品类/件数", v1: diffItems.length, v2: Math.abs(totalActual - totalExpected), color: diffItems.length > 0 ? "#E5484D" : "#10233F" },
          ].map((s, i) => (
            <div key={s.label} className={`flex flex-col items-center py-3 gap-0.5 ${i > 0 ? "border-l border-[#EEF4FB]" : ""}`}>
              <div className="text-[10px] text-[#8A9BB4]">{s.label}</div>
              <div className="text-sm font-bold" style={{ color: s.color }}>{s.v1} / {s.v2}</div>
            </div>
          ))}
        </div>

        {/* Items list */}
        <div className="px-4 mt-3 mb-1 text-xs font-semibold text-[#5B6B84]">入库商品明细（{doneItems.length} 种）</div>
        {doneItems.map(it => (
          <Card key={it.barcode}>
            <div className={`px-4 py-3 ${it.actual !== it.expected ? "bg-[#FEF3F3]" : ""}`}>
              <div className="flex items-start gap-3">
                <div className="w-14 h-14 rounded-xl bg-[#F8FAFC] border border-[#E4EDF7] flex items-center justify-center flex-shrink-0">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C2D2E5" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <div className="min-w-0 flex-1 mr-2">
                      <div className="text-[14px] font-bold text-[#10233F] truncate">{it.sku}</div>
                      <div className="text-[10px] text-[#8A9BB4] font-mono">{it.barcode}</div>
                    </div>
                    {it.actual !== it.expected ? <Tag label="差异" color="red" dot /> : <Tag label="已对" color="green" dot />}
                  </div>
                  <div className="flex items-center gap-4 text-xs mt-1">
                    <span className="text-[#5B6B84]">预计 <span className="font-bold text-[#10233F]">{it.expected}</span> {it.unit}</span>
                    <span className="text-[#5B6B84]">实收 <span className={`font-bold ${it.actual !== it.expected ? "text-[#E5484D]" : "text-[#12B76A]"}`}>{it.actual}</span> {it.unit}</span>
                    {it.actual !== it.expected && (
                      <span className="text-[#E5484D] text-[10px]">差 {it.actual - it.expected > 0 ? "+" : ""}{it.actual - it.expected}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// SCREEN: PICKING LIST
// ══════════════════════════════════════════════════════════════════════════════
const PickingList = ({ onDetail, onBack, tab, onTabChange }: {
  onDetail: (id: string) => void; onBack: () => void; tab: string; onTabChange: (t: string) => void;
}) => {
  const [activeTab, setActiveTab] = useState<"待分拣"|"分拣中"|"已分拣">("待分拣");
  const pending    = PICK_ORDERS.filter(o => o.status === "待分拣");
  const inProgress = PICK_ORDERS.filter(o => o.status === "分拣中");
  const done       = PICK_ORDERS.filter(o => o.status === "已分拣");
  const rows       = activeTab === "待分拣" ? pending : activeTab === "分拣中" ? inProgress : done;

  const pkColor = (s: string) => s === "已分拣" ? "green" : s === "分拣中" ? "blue" : "orange";

  return (
    <div className="h-full flex flex-col">
      <div className="bg-white flex-shrink-0">
        <NavBar title="分拣管理" onBack={onBack} />
        {/* Tabs */}
        <div className="flex border-b border-[#EEF4FB]">
          {(["待分拣","分拣中","已分拣"] as const).map(t => (
            <button key={t} onClick={() => setActiveTab(t)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-sm font-semibold border-b-2 transition-all
                ${activeTab===t ? "border-[#6C8CFF] text-[#6C8CFF]" : "border-transparent text-[#8A9BB4]"}`}>
              {t}
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold
                ${activeTab===t ? "bg-[#EEF3FF] text-[#6C8CFF]" : "bg-[#EEF4FB] text-[#8A9BB4]"}`}>
                {t==="待分拣" ? pending.length : t==="分拣中" ? inProgress.length : done.length}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-[#F4F8FD] pt-2 pb-4">
        {rows.map(o => {
          const isActive = o.status === "分拣中";
          const isDone   = o.status === "已分拣";
          const pct = o.demandQty > 0 ? Math.round(o.actualQty / o.demandQty * 100) : 0;
          return (
            <div key={o.id}
              className="bg-white mx-4 mb-3 rounded-2xl overflow-hidden shadow-[0_2px_12px_0_rgba(37,99,235,0.10)]">
              <div className={`h-1 ${isDone ? "bg-[#12B76A]" : isActive ? "bg-[#6C8CFF]" : "bg-[#2563EB]"}`} />
              <div className="px-4 pt-3 pb-4">
                {/* Header: 分拣单号 + 状态 */}
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="text-base font-bold text-[#10233F] leading-tight">{o.id}</div>
                    <div className="text-xs text-[#8A9BB4] mt-0.5 font-mono">{o.siteName}</div>
                  </div>
                  <Tag label={o.status} color={pkColor(o.status)} dot />
                </div>
                {/* Fields */}
                {([
                  ["关联补货单号", o.replenishNo],
                  ["点位编码", o.siteCode],
                  ["点位名称", o.siteName],
                  ["批次号", o.ffBatch],
                  ["创建时间", o.createdAt],
                ] as [string, string][]).map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between text-xs py-1.5 border-t border-[#F8FAFC]">
                    <span className="text-[#8A9BB4]">{label}</span>
                    <span className="font-medium text-[#3A4B66] truncate max-w-[55%] text-right font-mono">{value}</span>
                  </div>
                ))}
                {/* 需求数量 / 分拣数量 */}
                <div className="flex items-center justify-between text-xs py-1.5 border-t border-[#F8FAFC]">
                  <span className="text-[#8A9BB4]">需求数量 / 分拣数量</span>
                  <span className="font-medium font-mono">
                    <span className="text-[#3A4B66]">{o.demandQty}</span>
                    <span className="text-[#C2D2E5] mx-1">/</span>
                    <span className={o.actualQty >= o.demandQty ? "text-[#12B76A] font-bold" : o.actualQty > 0 ? "text-[#C05A0A] font-bold" : "text-[#8A9BB4]"}>{o.actualQty}</span>
                    <span className="text-[#8A9BB4] ml-0.5">件</span>
                  </span>
                </div>
                {/* Action */}
                <div className="mt-3">
                  {activeTab === "待分拣" ? (
                    <button onClick={() => onDetail(o.id)}
                      className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-[#2563EB] transition-all active:scale-95">
                      取单分拣
                    </button>
                  ) : activeTab === "分拣中" ? (
                    <button onClick={() => onDetail(o.id)}
                      className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-[#6C8CFF] transition-all active:scale-95">
                      继续分拣
                    </button>
                  ) : (
                    <button onClick={() => onDetail(o.id)}
                      className="w-full py-2.5 rounded-xl text-xs font-bold bg-[#EEF4FB] text-[#5B6B84] active:scale-95">
                      查看详情
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        {rows.length === 0 && (
          <div className="flex flex-col items-center justify-center pt-20 text-[#8A9BB4]">
            <div className="text-4xl mb-3">📦</div>
            <div className="text-sm">暂无{activeTab}单据</div>
          </div>
        )}
      </div>

      <TabBar active={tab} onChange={onTabChange} />
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// SCREEN: PICKING DETAIL (interactive picking → confirm → done)
// ══════════════════════════════════════════════════════════════════════════════
const PickingDetail = ({ batchId, onBack, onPrint }: {
  batchId: string; onBack: () => void; onPrint: () => void;
}) => {
  const order = PICK_ORDERS.find(o => o.id === batchId) ?? PICK_ORDERS[0];
  const [stage, setStage] = useState<"picking"|"confirm"|"done">(order.status === "已分拣" ? "done" : "picking");
  const [skus, setSkus] = useState<PkSku[]>(INITIAL_SKUS.map(s => ({ ...s })));
  const [highlighted, setHighlighted] = useState<Set<string>>(new Set());
  const [errMsg, setErrMsg] = useState("");
  const firstUncheckedRef = useRef<HTMLDivElement | null>(null);

  const totalDemand = skus.reduce((a, s) => a + s.demandQty, 0);
  const totalActual = skus.reduce((a, s) => a + s.actualQty, 0);
  const checkedCount = skus.filter(s => s.checked).length;

  const adjQty = (skuId: string, delta: number) =>
    setSkus(prev => prev.map(s => s.skuId === skuId ? { ...s, actualQty: Math.max(0, s.actualQty + delta) } : s));

  const toggleCheck = (skuId: string) => {
    setSkus(prev => prev.map(s => s.skuId === skuId ? { ...s, checked: !s.checked } : s));
    setHighlighted(prev => { const n = new Set(prev); n.delete(skuId); return n; });
  };

  const handleSubmit = () => {
    const unchecked = skus.filter(s => !s.checked).map(s => s.skuId);
    if (unchecked.length > 0) {
      setHighlighted(new Set(unchecked));
      setErrMsg(`还有 ${unchecked.length} 种商品未勾选确认`);
      firstUncheckedRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setErrMsg("");
    setHighlighted(new Set());
    setStage("confirm");
  };

  // ── done stage ──
  if (stage === "done") {
    return (
      <div className="h-full flex flex-col bg-[#F4F8FD]">
        <NavBar title="分拣完成" onBack={onBack} />
        <div className="flex-1 overflow-y-auto p-4">
          <div className="bg-[#E7FAF1] border border-[#A6EBCB] rounded-2xl px-4 py-3 mb-4 flex items-center gap-3">
            <div className="w-8 h-8 bg-[#12B76A] rounded-full flex items-center justify-center flex-shrink-0">
              <Ic d={P.check} size={16} cls="text-white"/>
            </div>
            <div>
              <div className="text-sm font-bold text-[#0E8A55]">分拣单已提交</div>
              <div className="text-xs text-[#4ADE80]">配送单已生成，可点击打印面单</div>
            </div>
          </div>
          {/* Summary */}
          <div className="bg-white rounded-2xl p-4 mb-3">
            <div className="text-xs font-semibold text-[#8A9BB4] uppercase mb-3">分拣单信息</div>
            {[
              ["分拣单号", order.id],
              ["配送单号（班次）", order.deliveryNo],
              ["补货单号", order.replenishNo],
              ["批次号", order.batchNo],
              ["点位名称", order.siteName],
              ["需求件数", `${totalDemand} 件`],
              ["实际分拣件数", `${totalActual} 件`],
              ["分拣人员", order.picker],
            ].map(([l,v]) => (
              <div key={l} className="flex items-start justify-between py-2 border-b border-[#F8FAFC] last:border-0 gap-2">
                <span className="text-xs text-[#8A9BB4] flex-shrink-0">{l}</span>
                <span className="text-xs font-semibold text-[#10233F] text-right">{v}</span>
              </div>
            ))}
          </div>
          {/* SKU table readonly */}
          <div className="bg-white rounded-2xl overflow-hidden">
            <div className="px-4 py-3 border-b border-[#EEF4FB] text-xs font-semibold text-[#10233F]">商品明细（只读）</div>
            {skus.map(s => (
              <div key={s.skuId} className="px-4 py-3 flex items-center gap-3 border-b border-[#F8FAFC] last:border-0">
                <div className="w-9 h-9 rounded-xl bg-[#F8FAFC] flex items-center justify-center text-xl flex-shrink-0">{s.img}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-[#10233F] truncate">{s.name}</div>
                  <div className="text-[10px] text-[#8A9BB4]">{s.spec}</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className={`text-sm font-bold ${s.actualQty >= s.demandQty ? "text-[#12B76A]" : "text-[#C05A0A]"}`}>{s.actualQty}</div>
                  <div className="text-[10px] text-[#8A9BB4]">/ {s.demandQty} 件</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white border-t border-[#EEF4FB] px-4 py-3 flex-shrink-0">
          <BigBtn label="打印面单" variant="primary" onClick={() => window.print()} />
        </div>
      </div>
    );
  }

  // ── confirm stage (read-only) ──
  if (stage === "confirm") {
    return (
      <div className="h-full flex flex-col bg-[#F4F8FD]">
        <NavBar title="分拣确认" onBack={() => setStage("picking")} />
        <div className="flex-1 overflow-y-auto p-4">
          <div className="bg-[#FFFAEB] border border-[#FEDF89] rounded-2xl px-4 py-3 mb-4 flex items-center gap-2">
            <Ic d={P.alert} size={15} cls="text-[#C05A0A] flex-shrink-0"/>
            <span className="text-xs text-[#8A5200]">请核对信息，确认无误后提交</span>
          </div>
          {/* Info */}
          <div className="bg-white rounded-2xl p-4 mb-3">
            <div className="text-xs font-semibold text-[#8A9BB4] uppercase mb-3">分拣单信息</div>
            {[
              ["分拣单号", order.id],
              ["配送单号（班次）", order.deliveryNo],
              ["补货单号", order.replenishNo],
              ["批次号", order.batchNo],
              ["点位名称", order.siteName],
              ["总需求件数", `${totalDemand} 件`],
              ["实际分拣件数", `${totalActual} 件`],
              ["差异件数", `${Math.abs(totalActual - totalDemand)} 件`],
              ["分拣人员", order.picker],
            ].map(([l,v]) => (
              <div key={l} className="flex items-start justify-between py-2 border-b border-[#F8FAFC] last:border-0 gap-2">
                <span className="text-xs text-[#8A9BB4] flex-shrink-0">{l}</span>
                <span className="text-xs font-semibold text-[#10233F] text-right">{v}</span>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-2xl overflow-hidden">
            <div className="px-4 py-3 border-b border-[#EEF4FB] text-xs font-semibold text-[#10233F]">商品明细（只读）</div>
            {skus.map(s => {
              const hasDiff = s.actualQty !== s.demandQty;
              return (
                <div key={s.skuId} className={`px-4 py-3 flex items-center gap-3 border-b border-[#F8FAFC] last:border-0 ${hasDiff ? "bg-[#FEF3F3]" : ""}`}>
                  <div className="w-9 h-9 rounded-xl bg-[#F8FAFC] flex items-center justify-center text-xl flex-shrink-0">{s.img}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-[#10233F] truncate">{s.name}</div>
                    <div className="text-[10px] text-[#8A9BB4]">{s.spec}</div>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <span className="text-xs text-[#8A9BB4]">{s.demandQty}</span>
                    <span className="text-[10px] text-[#C2D2E5]">→</span>
                    <span className={`text-sm font-bold ${hasDiff ? "text-[#E5484D]" : "text-[#12B76A]"}`}>{s.actualQty}</span>
                    {hasDiff && (
                      <span className="text-[10px] font-semibold text-[#E5484D] bg-[#FFE4E4] px-1.5 py-0.5 rounded-full">
                        {s.actualQty - s.demandQty > 0 ? "+" : ""}{s.actualQty - s.demandQty}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="bg-white border-t border-[#EEF4FB] px-4 py-3 flex gap-3 flex-shrink-0">
          <button onClick={() => setStage("picking")}
            className="h-14 px-5 bg-[#EEF4FB] text-[#5B6B84] rounded-2xl font-semibold text-sm">
            返回修改
          </button>
          <BigBtn label="确认提交" variant="primary" onClick={() => setStage("done")} />
        </div>
      </div>
    );
  }

  // ── picking stage (interactive) ──
  let firstUnset = true;
  return (
    <div className="h-full flex flex-col bg-[#F4F8FD]">
      <div className="bg-white flex-shrink-0">
        <NavBar title="分拣中" onBack={onBack} />
        {/* Top info bar */}
        {/* Error */}
        {errMsg && (
          <div className="mx-4 mb-2 px-3 py-2 bg-[#FEF3F3] border border-[#FDC9C9] rounded-xl flex items-center gap-2">
            <Ic d={P.alert} size={13} cls="text-[#EF4444] flex-shrink-0"/>
            <span className="text-xs text-[#E5484D]">{errMsg}</span>
          </div>
        )}
        {/* Progress */}
        <div className="px-4 pb-3">
          <div className="flex justify-between text-[11px] text-[#5B6B84] mb-1">
            <span>已勾选 <span className="font-bold text-[#10233F]">{checkedCount}</span> / {skus.length} 种</span>
            <span>实际 <span className="font-bold text-[#6C8CFF]">{totalActual}</span> / {totalDemand} 件</span>
          </div>
          <div className="h-2 bg-[#EEF4FB] rounded-full overflow-hidden">
            <div className="h-full bg-[#6C8CFF] rounded-full transition-all" style={{ width:`${skus.length>0 ? checkedCount/skus.length*100 : 0}%` }} />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24 pt-1 px-4 space-y-2">
        {skus.map(s => {
          const isHl = highlighted.has(s.skuId);
          const isFirst = isHl && firstUnset;
          if (isHl && firstUnset) firstUnset = false;
          return (
            <div key={s.skuId}
              ref={isFirst ? firstUncheckedRef : undefined}
              className={`rounded-2xl p-4 flex flex-col gap-3 transition-all
                ${s.checked ? "bg-white opacity-70" : isHl ? "bg-[#FEF3F3]" : "bg-white shadow-[0_2px_8px_0_rgba(37,99,235,0.10)]"}`}>
              {/* Top row: image + info + check */}
              <div className="flex items-start gap-3">
                {/* Image */}
                <div className="w-12 h-12 rounded-xl bg-[#F8FAFC] border border-[#E4EDF7] flex items-center justify-center text-2xl flex-shrink-0">{s.img}</div>
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-semibold leading-tight ${s.checked ? "text-[#8A9BB4] line-through" : "text-[#10233F]"}`}>{s.name}</div>
                  <div className="text-[11px] text-[#8A9BB4] mt-0.5">{s.spec}</div>
                  {isHl && !s.checked && <div className="text-[10px] text-[#EF4444] mt-1">⚠ 请勾选确认</div>}
                </div>
                {/* Check box (right side) */}
                <button onClick={() => toggleCheck(s.skuId)}
                  className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all mt-0.5
                    ${s.checked ? "bg-[#12B76A] border-[#12B76A]" : isHl ? "border-[#EF4444]" : "border-[#C2D2E5]"}`}>
                  {s.checked && <Ic d={P.check} size={14} cls="text-white"/>}
                </button>
              </div>
              {/* Bottom row: demand + stepper + zero */}
              <div className="flex items-center gap-3 border-t border-[#F8FAFC] pt-3">
                {/* Demand qty */}
                <div className="text-center flex-shrink-0">
                  <div className="text-2xl font-extrabold text-[#10233F] leading-none">{s.demandQty}</div>
                  <div className="text-[9px] text-[#8A9BB4] mt-0.5">需求件数</div>
                </div>
                <div className="text-[#E4EDF7] text-lg flex-shrink-0">→</div>
                {/* Stepper */}
                <div className="flex items-center gap-2 flex-1">
                  <button onClick={() => adjQty(s.skuId, -1)} disabled={s.actualQty === 0}
                    className="w-8 h-8 rounded-full border border-[#E4EDF7] flex items-center justify-center text-lg font-bold text-[#5B6B84] active:bg-[#EEF4FB] disabled:opacity-30">
                    −
                  </button>
                  <div className="flex-1 text-center">
                    <div className={`text-2xl font-extrabold leading-none ${s.actualQty >= s.demandQty ? "text-[#12B76A]" : s.actualQty > 0 ? "text-[#C05A0A]" : "text-[#8A9BB4]"}`}>
                      {s.actualQty}
                    </div>
                    <div className="text-[9px] text-[#8A9BB4] mt-0.5">实际件数</div>
                  </div>
                  <button onClick={() => adjQty(s.skuId, 1)}
                    className="w-8 h-8 rounded-full border border-[#E4EDF7] flex items-center justify-center text-lg font-bold text-[#5B6B84] active:bg-[#EEF4FB]">
                    +
                  </button>
                </div>
                <button onClick={() => setSkus(prev => prev.map(x => x.skuId === s.skuId ? { ...x, actualQty: 0 } : x))}
                  className="text-[10px] text-[#C2D2E5] hover:text-[#EF4444] border border-[#E4EDF7] rounded-lg px-2 py-1.5 transition-colors flex-shrink-0">
                  归0
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white border-t border-[#EEF4FB] px-4 py-3 flex-shrink-0">
        <BigBtn label="分拣完成" variant="primary" onClick={handleSubmit} />
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// SCREEN: PRINT VIEW
// ══════════════════════════════════════════════════════════════════════════════
const PrintView = ({ batchId, onBack }: { batchId: string; onBack: () => void }) => {
  const batch = PICK_BATCHES.find(b => b.id === batchId) ?? PICK_BATCHES[0];
  return (
    <div className="h-full flex flex-col bg-[#F4F8FD]">
      <NavBar title="打印分拣单" onBack={onBack} rightEl={
        <button className="w-10 h-10 flex items-center justify-center">
          <Ic d={P.print} size={20} cls="text-[#6C8CFF]" />
        </button>
      } />
      <div className="flex-1 overflow-y-auto p-4">
        {/* Paper slip */}
        <div className="bg-white rounded-2xl shadow-[0_2px_12px_0_rgba(37,99,235,0.14)] overflow-hidden">
          {/* Header */}
          <div className="bg-[#EAF4FF] border-b border-[#BFDBFE] px-5 py-4">
            <div className="text-[#2563EB] text-base font-bold mb-0.5">分拣单 · {batch.id}</div>
            <div className="text-[#8A9BB4] text-xs">批次：{batch.dispatch} · 打印时间：09-14 10:02</div>
          </div>
          {/* Info row */}
          <div className="grid grid-cols-3 border-b border-[#EEF4FB] divide-x divide-[#EEF4FB]">
            {[["点位", batch.locations + "个"], ["SKU", batch.items + "种"], ["截止", batch.deadline.split(" ")[1]]].map(([l, v]) => (
              <div key={l} className="py-3 text-center">
                <div className="text-[15px] font-bold text-[#10233F]">{v}</div>
                <div className="text-[10px] text-[#8A9BB4]">{l}</div>
              </div>
            ))}
          </div>
          {/* Items table */}
          <div className="px-5 py-3">
            <div className="grid grid-cols-12 text-[10px] font-semibold text-[#8A9BB4] uppercase border-b border-[#EEF4FB] pb-2 mb-2">
              <span className="col-span-1">#</span>
              <span className="col-span-2">库位</span>
              <span className="col-span-5">商品</span>
              <span className="col-span-2 text-right">数量</span>
              <span className="col-span-2 text-right">√</span>
            </div>
            {PICK_ITEMS.map((it, i) => (
              <div key={i} className="grid grid-cols-12 text-xs py-2.5 border-b border-[#F8FAFC] last:border-0">
                <span className="col-span-1 text-[#8A9BB4]">{i + 1}</span>
                <span className="col-span-2 font-mono text-[#6C8CFF] text-[11px]">{it.loc}</span>
                <span className="col-span-5 font-medium text-[#10233F]">{it.sku}</span>
                <span className="col-span-2 text-right font-bold text-[#10233F]">{it.qty}</span>
                <div className="col-span-2 flex justify-end">
                  <div className="w-5 h-5 border-2 border-[#E4EDF7] rounded" />
                </div>
              </div>
            ))}
          </div>
          {/* Footer */}
          <div className="px-5 py-4 bg-[#F8FAFC] flex items-center justify-between">
            <div className="text-xs text-[#8A9BB4]">分拣员签名 ___________</div>
            <div className="w-12 h-12 bg-[#EEF4FB] rounded flex items-center justify-center">
              <Ic d={P.qr} size={28} cls="text-[#10233F]" />
            </div>
          </div>
        </div>

        <div className="mt-3">
          <BigBtn label="发送至打印机" icon="print" variant="secondary" />
        </div>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// SCREEN: DELIVERY LIST
// ══════════════════════════════════════════════════════════════════════════════
const DeliveryList = ({ onDetail, onBack, tab, onTabChange }: {
  onDetail: (id: string) => void; onBack: () => void; tab: string; onTabChange: (t: string) => void;
}) => {
  const [filter, setFilter] = useState("全部");
  const [searchKey, setSearchKey] = useState("");
  const [navMapTask, setNavMapTask] = useState<typeof DELIVERIES[0] | null>(null);
  // delivery step state: 0=已送达, 1=补货开门, 2=拍摄陈列前照片, 3=完成批次上架, 4=done(履约完成/失败)
  const [deliveryStep, setDeliveryStep] = useState<Record<string, number>>({});
  const [deliveryStatusOverride, setDeliveryStatusOverride] = useState<Record<string, string>>({});
  const getStep = (id: string) => deliveryStep[id] ?? 0;
  const advanceStep = (id: string) => setDeliveryStep(prev => ({ ...prev, [id]: Math.min((prev[id] ?? 0) + 1, 4) }));
  const getStatus = (d: typeof DELIVERIES[0]) => deliveryStatusOverride[d.id] ?? d.status;

  const FILTERS = ["全部", "待配送", "配送中", "履约完成", "履约失败"];

  const filtered = DELIVERIES.filter(d => {
    const matchesFilter = filter === "全部" || d.status === filter;
    const matchesSearch =
      !searchKey ||
      d.id.toLowerCase().includes(searchKey.toLowerCase()) ||
      d.pointName.toLowerCase().includes(searchKey.toLowerCase()) ||
      d.pointCode.toLowerCase().includes(searchKey.toLowerCase()) ||
      d.address.toLowerCase().includes(searchKey.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="h-full flex flex-col relative bg-[#F4F8FD]">
      {/* Mini-Program Top Nav & Filter */}
      <div className="bg-white flex-shrink-0 shadow-xs border-b border-[#E4EDF7]">
        <NavBar title="配送任务" onBack={onBack} />
        
        {/* Search Input */}
        <div className="px-4 py-2">
          <div className="relative">
            <Ic d={P.search} size={14} cls="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A9BB4]" />
            <input
              type="text"
              value={searchKey}
              onChange={e => setSearchKey(e.target.value)}
              placeholder="搜索单号 / 点位名称 / 点位编码 / 地址"
              className="w-full h-9 bg-[#F8FAFC] border border-[#E4EDF7] rounded-xl text-xs text-[#10233F] placeholder-[#8A9BB4] pl-8 pr-3 focus:outline-none focus:border-[#2563EB]"
            />
          </div>
        </div>

        {/* Status Filter Chips */}
        <div className="flex gap-2 px-4 pb-3 overflow-x-auto no-scrollbar">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                filter === f
                  ? "bg-[#2563EB] text-white shadow-xs"
                  : "bg-[#EEF4FB] text-[#5B6B84] hover:bg-[#E4EDF7]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Mini-Program Card Flow */}
      <div className="flex-1 overflow-y-auto pt-3 pb-20 px-4">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center text-[#8A9BB4] shadow-xs">
            <Ic d={P.inbox} size={32} cls="mx-auto mb-2 text-[#C2D2E5]" />
            <p className="text-xs">暂无符合条件的配送任务</p>
          </div>
        ) : filter === "配送中" ? (() => {
          // Group by batch
          const groups: Record<string, typeof filtered> = {};
          filtered.forEach(d => { (groups[d.batch] = groups[d.batch] || []).push(d); });
          return Object.entries(groups).map(([batchNo, items]) => (
            <div key={batchNo} className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] font-bold text-[#2563EB] bg-[#DCEBFF] border border-[#BFDBFE] px-2.5 py-1 rounded-full font-mono">
                  第 {(items[0] as any).batchSeq ?? "?"} 批次
                </span>
                <span className="text-[10px] text-[#8A9BB4]">{items.length} 个点位</span>
              </div>
              <div className="space-y-3">
                {items.map(d => {
                  const status = getStatus(d);
                  const progressPct = Math.round((d.currentBatch / d.totalBatch) * 100);
                  const statusBg =
                    status === "待配送" ? "bg-[#2563EB]" :
                    status === "配送中" ? "bg-[#2563EB]" :
                    status === "履约完成" ? "bg-[#12B76A]" : "bg-[#E5484D]";

            return (
              <div
                key={d.id}
                className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_12px_0_rgba(37,99,235,0.10)] border border-[#E4EDF7] flex flex-col justify-between"
              >
                {/* Status Bar Accent */}
                <div className={`h-1.5 ${statusBg}`} />

                <div className="p-4 space-y-3">
                  {/* Top Row: Delivery ID, Point Code & Status Tag */}
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-xs font-bold text-[#2563EB] bg-[#DCEBFF] px-2 py-0.5 rounded border border-[#BFDBFE]">
                          {d.id}
                        </span>
                        <span className="font-mono text-[11px] text-[#5B6B84] bg-[#F8FAFC] px-1.5 py-0.5 rounded border border-[#E4EDF7]">
                          {d.pointCode}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-[#10233F] mt-1.5 leading-snug">
                        {d.pointName}
                      </h3>
                    </div>
                    <Tag label={status} color={statusColor(status)} dot />
                  </div>

                  {/* Address Row with Interactive Click to Nav */}
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setNavMapTask(d);
                    }}
                    className="p-2.5 rounded-xl bg-[#F8FAFC] active:bg-[#DCEBFF] border border-[#E4EDF7] active:border-[#BFDBFE] cursor-pointer transition-all flex items-start gap-2"
                  >
                    <Ic d={P.pin} size={15} cls="text-[#2563EB] flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-[#3A4B66] leading-relaxed line-clamp-2">
                        {d.address}
                      </p>
                      <div className="flex items-center justify-between mt-1 text-[11px] text-[#2563EB] font-bold">
                        <span>【点击调用地图导航】</span>
                        <span>地图 ↗</span>
                      </div>
                    </div>
                  </div>

                  {/* Batch Progress Bar & Text - hidden for 待配送 */}
                  {status !== "待配送" && (
                    <div className="bg-[#F8FAFC] p-2.5 rounded-xl border border-[#EEF4FB]">
                      <div className="flex justify-between items-center text-xs mb-1.5">
                        <span className="text-[#5B6B84] font-medium">批次进度</span>
                        <span className="font-bold text-[#10233F]">
                          当前批次 <strong className="text-[#2563EB]">{d.currentBatch}</strong> / 总批次 {d.totalBatch}
                        </span>
                      </div>
                      <div className="relative w-full h-2.5 bg-[#E4EDF7] rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${
                            status === "履约完成"
                              ? "bg-[#12B76A]"
                              : status === "履约失败"
                              ? "bg-[#E5484D]"
                              : "bg-[#2563EB]"
                          }`}
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Failure Reason if 履约失败 */}
                  {status === "履约失败" && d.failReason && (
                    <div className="p-2.5 bg-[#FEF3F3] border border-[#FDC9C9] rounded-xl text-xs text-[#E5484D] flex items-start gap-1.5">
                      <Ic d={P.alert} size={14} cls="flex-shrink-0 mt-0.5" />
                      <span>失败原因：{d.failReason}</span>
                    </div>
                  )}
                </div>

                {/* Footer Action Bar */}
                <div className="px-4 py-2.5 bg-[#F8FAFC] border-t border-[#E4EDF7] flex items-center justify-between gap-2">
                  <span className="text-xs text-[#8A9BB4] flex-shrink-0">
                    司机: <strong className="text-[#3A4B66]">{d.driver}</strong>
                  </span>
                  {status === "配送中" && (
                    <button onClick={() => onDetail(d.id)}
                      className="px-4 py-1.5 bg-[#2563EB] active:bg-[#1E63B8] text-white rounded-xl text-xs font-bold transition-colors">
                      开始补货
                    </button>
                  )}
                </div>
              </div>
            );
          })}
              </div>
            </div>
          ));
        })() : (
          <div className="space-y-3">
            {filtered.map(d => {
              const status = getStatus(d);
              const progressPct = Math.round((d.currentBatch / d.totalBatch) * 100);
              const statusBg =
                status === "待配送" ? "bg-[#2563EB]" :
                status === "配送中" ? "bg-[#2563EB]" :
                status === "履约完成" ? "bg-[#12B76A]" : "bg-[#E5484D]";
              return (
                <div
                  key={d.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_12px_0_rgba(37,99,235,0.10)] border border-[#E4EDF7] flex flex-col justify-between"
                >
                  <div className={`h-1.5 ${statusBg}`} />
                  <div className="p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-xs font-bold text-[#2563EB] bg-[#DCEBFF] px-2 py-0.5 rounded border border-[#BFDBFE]">{d.id}</span>
                          <span className="font-mono text-[11px] text-[#5B6B84] bg-[#F8FAFC] px-1.5 py-0.5 rounded border border-[#E4EDF7]">{d.pointCode}</span>
                        </div>
                        <h3 className="text-base font-bold text-[#10233F] mt-1.5 leading-snug">{d.pointName}</h3>
                      </div>
                      <Tag label={status} color={statusColor(status)} dot />
                    </div>
                    <div onClick={(e) => { e.stopPropagation(); setNavMapTask(d); }}
                      className="p-2.5 rounded-xl bg-[#F8FAFC] active:bg-[#DCEBFF] border border-[#E4EDF7] cursor-pointer transition-all flex items-start gap-2">
                      <Ic d={P.pin} size={15} cls="text-[#2563EB] flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-[#3A4B66] leading-relaxed line-clamp-2">{d.address}</p>
                        <div className="flex items-center justify-between mt-1 text-[11px] text-[#2563EB] font-bold">
                          <span>【点击调用地图导航】</span><span>地图 ↗</span>
                        </div>
                      </div>
                    </div>
                    {status !== "待配送" && (
                      <div className="bg-[#F8FAFC] p-2.5 rounded-xl border border-[#EEF4FB]">
                        <div className="flex justify-between items-center text-xs mb-1.5">
                          <span className="text-[#5B6B84] font-medium">批次进度</span>
                          <span className="font-bold text-[#10233F]">当前批次 <strong className="text-[#2563EB]">{d.currentBatch}</strong> / 总批次 {d.totalBatch}</span>
                        </div>
                        <div className="relative w-full h-2.5 bg-[#E4EDF7] rounded-full overflow-hidden">
                          <div className={`h-full rounded-full transition-all duration-300 ${status === "履约完成" ? "bg-[#12B76A]" : status === "履约失败" ? "bg-[#E5484D]" : "bg-[#2563EB]"}`} style={{ width: `${progressPct}%` }} />
                        </div>
                      </div>
                    )}
                    {status === "履约失败" && d.failReason && (
                      <div className="p-2.5 bg-[#FEF3F3] border border-[#FDC9C9] rounded-xl text-xs text-[#E5484D] flex items-start gap-1.5">
                        <Ic d={P.alert} size={14} cls="flex-shrink-0 mt-0.5" /><span>失败原因：{d.failReason}</span>
                      </div>
                    )}
                  </div>
                  <div className="px-4 py-2.5 bg-[#F8FAFC] border-t border-[#E4EDF7] flex items-center justify-between gap-2">
                    <span className="text-xs text-[#8A9BB4] flex-shrink-0">司机: <strong className="text-[#3A4B66]">{d.driver}</strong></span>
                    {(status === "履约完成" || status === "履约失败") && (
                      <button onClick={() => onDetail(d.id)} className="px-4 py-1.5 bg-[#EEF4FB] text-[#4A5C78] rounded-xl text-xs font-bold transition-colors active:bg-[#E4EDF7]">查看详情</button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Map Navigation Action Sheet / Modal in Mini-Program */}
      {navMapTask && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end justify-center">
          <div className="bg-white w-full rounded-t-3xl p-5 space-y-4 max-w-md animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#E4EDF7]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#DCEBFF] text-[#2563EB] flex items-center justify-center font-bold text-xs">
                  📍
                </div>
                <h3 className="text-base font-bold text-[#10233F]">地图导航</h3>
              </div>
              <button
                onClick={() => setNavMapTask(null)}
                className="w-8 h-8 rounded-full bg-[#EEF4FB] text-[#5B6B84] flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-[#10233F]">{navMapTask.pointName}</span>
                <span className="font-mono text-xs text-[#2563EB] bg-[#DCEBFF] px-2 py-0.5 rounded border border-[#BFDBFE]">
                  {navMapTask.pointCode}
                </span>
              </div>
              <p className="text-xs text-[#5B6B84] leading-relaxed">{navMapTask.address}</p>
              <div className="text-xs text-[#2563EB] font-medium pt-1">
                距离当前位置约 {navMapTask.dist} · 预计 20 分钟到达
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2.5 pt-2">
              <button
                onClick={() => {
                  alert(`已调用 高德地图 导航至：${navMapTask.address}`);
                  setNavMapTask(null);
                }}
                className="py-3 bg-[#F8FAFC] hover:bg-[#DCEBFF] border border-[#E4EDF7] rounded-2xl text-xs font-bold text-[#10233F] flex flex-col items-center gap-1 active:scale-95 transition-transform"
              >
                <span className="text-base">🗺️</span>
                高德地图
              </button>

              <button
                onClick={() => {
                  alert(`已调用 百度地图 导航至：${navMapTask.address}`);
                  setNavMapTask(null);
                }}
                className="py-3 bg-[#F8FAFC] hover:bg-[#DCEBFF] border border-[#E4EDF7] rounded-2xl text-xs font-bold text-[#10233F] flex flex-col items-center gap-1 active:scale-95 transition-transform"
              >
                <span className="text-base">📍</span>
                百度地图
              </button>

              <button
                onClick={() => {
                  alert(`已调用 腾讯地图 导航至：${navMapTask.address}`);
                  setNavMapTask(null);
                }}
                className="py-3 bg-[#F8FAFC] hover:bg-[#DCEBFF] border border-[#E4EDF7] rounded-2xl text-xs font-bold text-[#10233F] flex flex-col items-center gap-1 active:scale-95 transition-transform"
              >
                <span className="text-base">🧭</span>
                腾讯地图
              </button>
            </div>

            <button
              onClick={() => setNavMapTask(null)}
              className="w-full py-3 bg-[#EEF4FB] text-[#5B6B84] rounded-2xl text-xs font-bold"
            >
              取消
            </button>
          </div>
        </div>
      )}

      <TabBar active={tab} onChange={onTabChange} />
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// 页面 1【任务详情页】
// ══════════════════════════════════════════════════════════════════════════════
const DeliveryTaskDetailPage = ({
  delivId,
  onBack,
  onException,
  onScanOpen
}: {
  delivId: string;
  onBack: () => void;
  onException: () => void;
  onScanOpen: () => void;
}) => {
  const d = DELIVERIES.find(x => x.id === delivId) ?? DELIVERIES[0];
  const [showContacts, setShowContacts] = useState(false);

  const CONTACTS = [
    { name: "张主任", role: "点位现场物管", phone: "138-8888-0001" },
    { name: "王大志", role: "线路责任司机", phone: "138-8888-0002" },
    { name: "李客服", role: "运维紧急热线", phone: "400-888-9999" },
  ];

  return (
    <div className="h-full flex flex-col bg-[#F4F8FD] relative">
      <NavBar title="任务详情" onBack={onBack} />

      <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-24">
        {/* Point Card */}
        <div className="bg-white rounded-2xl p-4 shadow-[0_2px_12px_0_rgba(37,99,235,0.10)] border border-[#E4EDF7] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-xs font-bold text-[#2563EB] bg-[#DCEBFF] px-2.5 py-0.5 rounded border border-[#BFDBFE]">
                {d.id}
              </span>
              <span className="font-mono text-[11px] text-[#6C8CFF] bg-[#EEF3FF] px-2 py-0.5 rounded border border-[#D6E0FF]">
                批次 {d.currentBatch}/{d.totalBatch}
              </span>
            </div>
            <Tag label={d.status} color={statusColor(d.status)} dot />
          </div>

          <div>
            <h2 className="text-base font-bold text-[#10233F]">{d.pointName}</h2>
            <div className="flex items-start gap-1 text-xs text-[#5B6B84] mt-1">
              <Ic d={P.pin} size={14} cls="text-[#2563EB] flex-shrink-0 mt-0.5" />
              <span>{d.address}</span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-2 bg-[#F8FAFC] p-3 rounded-xl border border-[#E4EDF7] text-center">
            <div>
              <div className="text-[10px] text-[#8A9BB4]">在售件数</div>
              <div className="text-base font-bold text-[#10233F] mt-0.5">142 件</div>
            </div>
            <div>
              <div className="text-[10px] text-[#8A9BB4]">补货件数</div>
              <div className="text-base font-bold text-[#2563EB] mt-0.5">174 件</div>
            </div>
            <div>
              <div className="text-[10px] text-[#8A9BB4]">补货完成时间</div>
              <div className="text-xs font-bold text-[#10233F] mt-1">14:30</div>
            </div>
          </div>

          {/* Clickable Phone Number */}
          <div
            onClick={() => setShowContacts(true)}
            className="p-3 bg-[#DCEBFF] hover:bg-[#DBEAFE] border border-[#BFDBFE] rounded-xl flex items-center justify-between cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="text-base">📞</span>
              <div>
                <div className="text-xs font-bold text-[#10233F]">联系责任人: 张主任 (138-8888-0001)</div>
                <div className="text-[10px] text-[#2563EB]">点击弹出通讯人列表弹窗 ↗</div>
              </div>
            </div>
            <span className="text-xs font-bold text-[#2563EB] bg-white px-2.5 py-1 rounded-lg border border-[#BFDBFE]">
              拨打
            </span>
          </div>
        </div>

        {/* Goods List Summary */}
        <div className="bg-white rounded-2xl p-4 shadow-[0_2px_12px_0_rgba(37,99,235,0.10)] border border-[#E4EDF7]">
          <h3 className="text-xs font-bold text-[#5B6B84] uppercase mb-3">预存量补货明细</h3>
          <div className="space-y-2.5">
            {[
              { name: "可口可乐 330ml", count: 48, unit: "罐", layer: "层 1" },
              { name: "农夫山泉 550ml", count: 72, unit: "瓶", layer: "层 2" },
              { name: "乐事薯片原味 75g", count: 30, unit: "包", layer: "层 3" },
              { name: "元气森林苏打水 480ml", count: 24, unit: "瓶", layer: "层 4" },
            ].map((sku, i) => (
              <div key={i} className="flex items-center justify-between text-xs py-1.5 border-b border-[#EEF4FB] last:border-0">
                <div>
                  <span className="font-bold text-[#10233F]">{sku.name}</span>
                  <span className="text-[10px] text-[#8A9BB4] ml-2">({sku.layer})</span>
                </div>
                <span className="font-bold text-[#2563EB]">{sku.count} {sku.unit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Action Bar: Two Parallel Buttons */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#E4EDF7] px-4 py-3 flex gap-3 z-20">
        <button
          onClick={onException}
          className="flex-1 py-3 bg-[#FEF3F3] hover:bg-[#FFE4E4] text-[#E5484D] border border-[#FDC9C9] rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-xs"
        >
          <Ic d={P.alert} size={15} />
          配送异常
        </button>

        <button
          onClick={onScanOpen}
          className="flex-1 py-3 bg-[#2563EB] hover:bg-[#1E63B8] text-white rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-md"
        >
          <Ic d={P.qr} size={15} />
          扫码开门
        </button>
      </div>

      {/* Contacts Modal (底部通讯人弹窗) */}
      {showContacts && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end justify-center">
          <div className="bg-white w-full rounded-t-3xl p-5 space-y-4 max-w-md animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#E4EDF7]">
              <div className="flex items-center gap-2">
                <span className="text-base">📞</span>
                <h3 className="text-base font-bold text-[#10233F]">点位通讯录列表</h3>
              </div>
              <button
                onClick={() => setShowContacts(false)}
                className="w-8 h-8 rounded-full bg-[#EEF4FB] text-[#5B6B84] flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2.5">
              {CONTACTS.map((c, i) => (
                <div
                  key={i}
                  className="p-3 bg-[#F8FAFC] border border-[#E4EDF7] rounded-2xl flex items-center justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[#10233F]">{c.name}</span>
                      <span className="text-[10px] text-[#2563EB] bg-[#DCEBFF] px-2 py-0.5 rounded border border-[#BFDBFE]">
                        {c.role}
                      </span>
                    </div>
                    <div className="text-xs text-[#5B6B84] font-mono mt-1">{c.phone}</div>
                  </div>

                  <button
                    onClick={() => {
                      alert(`正在拨打电话给: ${c.name} (${c.phone})`);
                      setShowContacts(false);
                    }}
                    className="px-4 py-2 bg-[#2563EB] active:bg-[#1E63B8] text-white rounded-xl text-xs font-bold shadow-xs"
                  >
                    拨打
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowContacts(false)}
              className="w-full py-3 bg-[#EEF4FB] text-[#5B6B84] rounded-2xl text-xs font-bold"
            >
              关闭
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// 页面 2【配送异常页】
// ══════════════════════════════════════════════════════════════════════════════
const DeliveryExceptionPage = ({
  delivId,
  onBack,
  onSubmit
}: {
  delivId: string;
  onBack: () => void;
  onSubmit: () => void;
}) => {
  const d = DELIVERIES.find(x => x.id === delivId) ?? DELIVERIES[0];
  const [reason, setReason] = useState("门锁故障无法解锁");
  const [remark, setReasonRemark] = useState("");
  const [hasPhoto, setHasPhoto] = useState(false);

  const REASONS = [
    "门锁故障无法解锁",
    "柜机网络离线",
    "现场物管拒绝进入",
    "设备硬件损坏",
    "商品缺货溢扣",
    "其他履约阻碍"
  ];

  const handleSubmit = () => {
    alert(`配送异常已提交！原因: ${reason}`);
    d.status = "履约失败";
    d.failReason = reason + (remark ? ` (${remark})` : "");
    onSubmit();
  };

  return (
    <div className="h-full flex flex-col bg-[#F4F8FD] relative">
      <NavBar title="配送异常" onBack={onBack} />

      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
        {/* Basic Info Readonly Card */}
        <div className="bg-white rounded-2xl p-4 shadow-[0_2px_12px_0_rgba(37,99,235,0.10)] border border-[#E4EDF7] space-y-2">
          <div className="text-xs text-[#8A9BB4] font-mono">{d.id} · {d.pointCode}</div>
          <h3 className="text-base font-bold text-[#10233F]">{d.pointName}</h3>
          <p className="text-xs text-[#5B6B84]">{d.address}</p>
          <div className="text-xs text-[#2563EB] pt-1 border-t border-[#EEF4FB]">
            配送时间: 2025-09-10 14:30
          </div>
        </div>

        {/* Exception Form */}
        <div className="bg-white rounded-2xl p-4 shadow-[0_2px_12px_0_rgba(37,99,235,0.10)] border border-[#E4EDF7] space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#10233F] mb-1.5">
              失败原因选择 <span className="text-[#E5484D]">*</span>
            </label>
            <select
              value={reason}
              onChange={e => setReason(e.target.value)}
              className="w-full h-10 border border-[#E4EDF7] rounded-xl text-xs text-[#10233F] bg-white px-3 focus:outline-none focus:border-[#2563EB]"
            >
              {REASONS.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#10233F] mb-1.5">失败备注</label>
            <textarea
              value={remark}
              onChange={e => setReasonRemark(e.target.value)}
              rows={3}
              placeholder="请详细描述现场异常情况 (如：门锁响应超时、无物管接应等)"
              className="w-full p-3 border border-[#E4EDF7] rounded-xl text-xs text-[#10233F] placeholder-[#8A9BB4] focus:outline-none focus:border-[#2563EB]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#10233F] mb-1.5">现场图片上传</label>
            <div
              onClick={() => setHasPhoto(!hasPhoto)}
              className="border-2 border-dashed border-[#C2D2E5] hover:border-[#2563EB] rounded-2xl p-4 flex flex-col items-center justify-center text-center cursor-pointer bg-[#F8FAFC] transition-colors"
            >
              {hasPhoto ? (
                <div className="relative w-full h-28 bg-[#DCEBFF] rounded-xl flex items-center justify-center text-xs font-bold text-[#2563EB]">
                  ✓ 已选择 1 张现场故障拍摄图 (点击可重选)
                </div>
              ) : (
                <>
                  <span className="text-2xl mb-1">📷</span>
                  <span className="text-xs font-bold text-[#3A4B66]">点击上传现场故障证据照片</span>
                  <span className="text-[10px] text-[#8A9BB4] mt-0.5">建议拍摄锁体界面或现场障碍物</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Submit Button */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#E4EDF7] px-4 py-3 z-20">
        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-[#E5484D] active:bg-[#C13438] text-white rounded-2xl text-xs font-bold shadow-md transition-colors"
        >
          提交异常报告
        </button>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// 页面 3【扫码开门页】
// ══════════════════════════════════════════════════════════════════════════════
const DeliveryScanOpenPage = ({
  delivId,
  onBack,
  onNext
}: {
  delivId: string;
  onBack: () => void;
  onNext: () => void;
}) => {
  const d = DELIVERIES.find(x => x.id === delivId) ?? DELIVERIES[0];
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);

  return (
    <div className="h-full flex flex-col bg-[#F4F8FD] relative">
      <NavBar title="扫码开门" onBack={onBack} />

      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
        {/* Top Cabinet Diagram + Point Name */}
        <div className="bg-white rounded-2xl p-4 shadow-[0_2px_12px_0_rgba(37,99,235,0.10)] border border-[#E4EDF7] text-center space-y-3">
          <div className="w-full h-36 bg-[#1B3A63] rounded-xl flex flex-col items-center justify-center p-3 text-white border border-[#3A4B66] relative overflow-hidden">
            <svg className="w-16 h-20 text-[#38BDF8] mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="4" y="2" width="16" height="20" rx="2" />
              <line x1="4" y1="8" x2="20" y2="8" />
              <line x1="4" y1="13" x2="20" y2="13" />
              <line x1="4" y1="18" x2="20" y2="18" />
              <circle cx="16" cy="10.5" r="1" fill="currentColor" />
            </svg>
            <div className="text-xs font-bold text-white">智柜 Pro X8 (设备示意图)</div>
            <span className="text-[10px] text-[#38BDF8] bg-[#38BDF8]/20 px-2 py-0.5 rounded-full mt-1">
              状态：待解锁开启
            </span>
          </div>

          <div>
            <h3 className="text-base font-bold text-[#10233F]">{d.pointName}</h3>
            <p className="text-xs text-[#5B6B84] mt-0.5">{d.address}</p>
          </div>
        </div>

        {/* Upload Image Section (Restricted to 1 Photo) */}
        <div className="bg-white rounded-2xl p-4 shadow-[0_2px_12px_0_rgba(37,99,235,0.10)] border border-[#E4EDF7] space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-[#10233F]">
              解锁前拍摄拍照验证 <span className="text-[#E5484D]">*</span>
            </label>
            <span className="text-[10px] font-bold text-[#2563EB] bg-[#DCEBFF] px-2 py-0.5 rounded border border-[#BFDBFE]">
              限制 1 张图片
            </span>
          </div>

          <div
            onClick={() => {
              if (uploadedPhoto) {
                setUploadedPhoto(null);
              } else {
                setUploadedPhoto("cabinet-scan-1.jpg");
              }
            }}
            className="border-2 border-dashed border-[#C2D2E5] hover:border-[#2563EB] rounded-2xl p-5 flex flex-col items-center justify-center text-center cursor-pointer bg-[#F8FAFC] transition-colors min-h-[120px]"
          >
            {uploadedPhoto ? (
              <div className="relative w-full py-4 bg-[#E7FAF1] border border-[#A6EBCB] rounded-xl flex items-center justify-center gap-2 text-xs font-bold text-[#12B76A]">
                <span>✓ 已拍摄上传开门前验柜图 (已达上限 1/1 张)</span>
              </div>
            ) : (
              <>
                <span className="text-3xl mb-1">📸</span>
                <span className="text-xs font-bold text-[#3A4B66]">点击拍摄 1 张柜门照片</span>
                <span className="text-[10px] text-[#8A9BB4] mt-1">只允许拍照，限 1 张</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Upload & Proceed Button */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#E4EDF7] px-4 py-3 z-20">
        <button
          onClick={() => {
            if (!uploadedPhoto) {
              setUploadedPhoto("cabinet-scan-1.jpg");
            }
            onNext();
          }}
          className="w-full py-3 bg-[#2563EB] active:bg-[#1E63B8] text-white rounded-2xl text-xs font-bold shadow-md transition-colors"
        >
          提交
        </button>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// 页面 4【商品上架页】
// ══════════════════════════════════════════════════════════════════════════════
const DeliveryRestockGoodsPage = ({
  delivId,
  onBack,
  onNext
}: {
  delivId: string;
  onBack: () => void;
  onNext: () => void;
}) => {
  const d = DELIVERIES.find(x => x.id === delivId) ?? DELIVERIES[0];
  const [activeLayer, setActiveLayer] = useState(1);
  const [isReadOnly, setIsReadOnly] = useState(false);

  // Shelf layered items state
  const [layerGoods, setLayerGoods] = useState<Record<number, { name: string; count: number; img: string }[]>>({
    1: [
      { name: "可口可乐 330ml 听装", count: 24, img: "🥤" },
      { name: "百事可乐 330ml 听装", count: 18, img: "🥤" },
    ],
    2: [
      { name: "农夫山泉 550ml 瓶装", count: 36, unit: "瓶", img: "💧" } as any,
      { name: "元气森林 480ml", count: 20, img: "🍾" },
    ],
    3: [
      { name: "乐事薯片原味 75g", count: 15, img: "🥔" },
      { name: "好丽友派 6枚", count: 12, img: "🍪" },
    ],
    4: [
      { name: "统一冰红茶 500ml", count: 24, img: "CD" },
      { name: "光明酸奶 200g", count: 16, img: "🥛" },
    ],
    5: [
      { name: "自热米饭 红烧牛肉 405g", count: 10, img: "🍱" },
    ],
    6: [
      { name: "旺旺雪饼 180g", count: 14, img: "🍘" },
    ]
  });

  const updateCount = (layer: number, idx: number, delta: number) => {
    if (isReadOnly) return;
    setLayerGoods(prev => {
      const copy = { ...prev };
      const items = [...copy[layer]];
      const nextCount = Math.max(0, items[idx].count + delta);
      items[idx] = { ...items[idx], count: nextCount };
      copy[layer] = items;
      return copy;
    });
  };

  const handleCloseAndSubmit = () => {
    setIsReadOnly(true);
    setTimeout(() => {
      onNext();
    }, 800);
  };

  return (
    <div className="h-full flex flex-col bg-[#F4F8FD] relative">
      <NavBar title="商品上架" onBack={onBack} />

      {/* Read-Only Status Banner if Submitted */}
      {isReadOnly && (
        <div className="bg-[#12B76A] text-white text-xs font-bold px-4 py-2 text-center animate-pulse">
          🔒 柜门已关锁，页面数据已锁定只读，正在进入图片提交...
        </div>
      )}

      {/* Top 1-6 Layer Tabs */}
      <div className="bg-white px-4 py-2 border-b border-[#E4EDF7] flex gap-1.5 overflow-x-auto no-scrollbar flex-shrink-0">
        {[1, 2, 3, 4, 5, 6].map(layerNum => (
          <button
            key={layerNum}
            onClick={() => setActiveLayer(layerNum)}
            className={`flex-1 min-w-[54px] py-2 rounded-xl text-xs font-bold transition-all ${
              activeLayer === layerNum
                ? "bg-[#2563EB] text-white shadow-xs"
                : "bg-[#F8FAFC] text-[#5B6B84] hover:bg-[#E4EDF7]"
            }`}
          >
            层 {layerNum}
          </button>
        ))}
      </div>

      {/* Layer Goods List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-24">
        <div className="flex justify-between items-center text-xs font-bold text-[#5B6B84] px-1">
          <span>当前显示：第 {activeLayer} 层架板商品</span>
          <span>{isReadOnly ? "只读状态 (不可编辑)" : "可编辑数量"}</span>
        </div>

        {layerGoods[activeLayer]?.map((goods, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-4 shadow-[0_2px_12px_0_rgba(37,99,235,0.10)] border border-[#E4EDF7] flex items-center gap-3"
          >
            {/* Goods Photo Icon */}
            <div className="w-12 h-12 rounded-xl bg-[#F8FAFC] border border-[#E4EDF7] flex items-center justify-center text-2xl flex-shrink-0">
              {goods.img}
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-[#10233F] truncate">{goods.name}</h4>
              <div className="text-[10px] text-[#8A9BB4] mt-0.5">层架槽位：{activeLayer}-0{idx + 1}</div>
              <div className="flex items-center gap-3 mt-1.5">
                <div className="flex items-center gap-1">
                  <span className="text-[10px] text-[#8A9BB4]">预存量</span>
                  <span className="text-[11px] font-semibold text-[#3A4B66]">{goods.count + 8}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[10px] text-[#8A9BB4]">实际库存</span>
                  <span className="text-[11px] font-semibold text-[#2563EB]">{goods.count}</span>
                </div>
              </div>
            </div>

            {/* Editable Quantity Counter Box */}
            <div className="flex items-center gap-2 bg-[#F8FAFC] border border-[#E4EDF7] rounded-xl p-1">
              <button
                disabled={isReadOnly}
                onClick={() => updateCount(activeLayer, idx, -1)}
                className={`w-7 h-7 rounded-lg font-bold text-xs flex items-center justify-center ${
                  isReadOnly ? "bg-[#E4EDF7] text-[#8A9BB4]" : "bg-white text-[#10233F] shadow-xs active:bg-[#E4EDF7]"
                }`}
              >
                -
              </button>

              <input
                type="number"
                disabled={isReadOnly}
                value={goods.count}
                onChange={e => {
                  if (isReadOnly) return;
                  const v = parseInt(e.target.value) || 0;
                  setLayerGoods(prev => {
                    const copy = { ...prev };
                    const items = [...copy[activeLayer]];
                    items[idx] = { ...items[idx], count: Math.max(0, v) };
                    copy[activeLayer] = items;
                    return copy;
                  });
                }}
                className={`w-10 text-center font-bold text-xs bg-transparent focus:outline-none ${
                  isReadOnly ? "text-[#8A9BB4]" : "text-[#2563EB]"
                }`}
              />

              <button
                disabled={isReadOnly}
                onClick={() => updateCount(activeLayer, idx, 1)}
                className={`w-7 h-7 rounded-lg font-bold text-xs flex items-center justify-center ${
                  isReadOnly ? "bg-[#E4EDF7] text-[#8A9BB4]" : "bg-[#2563EB] text-white shadow-xs active:bg-[#1E63B8]"
                }`}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Lock Door & Submit Button */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#E4EDF7] px-4 py-3 z-20">
        <button
          disabled={isReadOnly}
          onClick={handleCloseAndSubmit}
          className={`w-full py-3 rounded-2xl text-xs font-bold shadow-md transition-colors ${
            isReadOnly
              ? "bg-[#12B76A] text-white cursor-not-allowed opacity-90"
              : "bg-[#2563EB] active:bg-[#1E63B8] text-white"
          }`}
        >
          {isReadOnly ? "✓ 柜门已锁闭 (跳转中...)" : "关门并提交 →"}
        </button>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// 页面 5【补货图片提交页】
// ══════════════════════════════════════════════════════════════════════════════
const DeliveryPhotoSubmitPage = ({
  delivId,
  onBack,
  onSubmit
}: {
  delivId: string;
  onBack: () => void;
  onSubmit: () => void;
}) => {
  const [photos, setPhotos] = useState<string[]>(["display-1.jpg"]);
  const [notes, setNotes] = useState("");

  return (
    <div className="h-full flex flex-col bg-[#F4F8FD] relative">
      <NavBar title="补货图片提交" onBack={onBack} />

      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
        {/* Upload Notice Banner */}
        <div className="p-3.5 bg-[#DCEBFF] border border-[#BFDBFE] rounded-2xl flex items-start gap-2.5 text-xs text-[#1D4ED8]">
          <span className="text-base">📢</span>
          <p className="leading-relaxed font-medium">
            <strong>上传须知：</strong>请拍摄清晰的大门全景图与柜内层板理货照片，保证标签与字样清晰可见。
          </p>
        </div>

        {/* Display Photo Upload Area */}
        <div className="bg-white rounded-2xl p-4 shadow-[0_2px_12px_0_rgba(37,99,235,0.10)] border border-[#E4EDF7] space-y-3">
          <label className="block text-xs font-bold text-[#10233F]">
            商品陈列整体全景图上传 <span className="text-[#E5484D]">*</span>
          </label>

          <div className="grid grid-cols-2 gap-2.5">
            {photos.map((_, i) => (
              <div
                key={i}
                className="relative h-28 bg-[#E7FAF1] border border-[#A6EBCB] rounded-2xl flex flex-col items-center justify-center text-xs font-bold text-[#12B76A] p-2 text-center"
              >
                <span>✓ 陈列拍照图 {i + 1}</span>
                <button
                  onClick={() => setPhotos(photos.filter((_, idx) => idx !== i))}
                  className="absolute top-2 right-2 w-5 h-5 bg-[#E5484D] text-white rounded-full text-[10px] flex items-center justify-center font-bold"
                >
                  ✕
                </button>
              </div>
            ))}

            <div
              onClick={() => setPhotos([...photos, `display-${photos.length + 1}.jpg`])}
              className="h-28 border-2 border-dashed border-[#C2D2E5] hover:border-[#2563EB] rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer bg-[#F8FAFC] transition-colors"
            >
              <span className="text-2xl mb-0.5">📸</span>
              <span className="text-xs font-bold text-[#3A4B66]">添加拍摄图</span>
            </div>
          </div>
        </div>

        {/* Remarks Input */}
        <div className="bg-white rounded-2xl p-4 shadow-[0_2px_12px_0_rgba(37,99,235,0.10)] border border-[#E4EDF7] space-y-2">
          <label className="block text-xs font-bold text-[#10233F]">补货履约备注</label>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            rows={3}
            placeholder="请输入补充备注 (如：破损损耗说明、层架调整等)"
            className="w-full p-3 border border-[#E4EDF7] rounded-xl text-xs text-[#10233F] placeholder-[#8A9BB4] focus:outline-none focus:border-[#2563EB]"
          />
        </div>
      </div>

      {/* Bottom Final Submit Button */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#E4EDF7] px-4 py-3 z-20">
        <button
          onClick={onSubmit}
          className="w-full py-3 bg-[#12B76A] active:bg-[#0E8A55] text-white rounded-2xl text-xs font-bold shadow-md transition-colors"
        >
          最终提交履约完结 ✓
        </button>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// SCREEN: DELIVERY ACTION (4-step flow)
// ══════════════════════════════════════════════════════════════════════════════
const DeliveryAction = ({ stopIdx, onBack, onComplete, onFail }: {
  stopIdx: number; onBack: () => void; onComplete: () => void; onFail: (type: string) => void;
}) => {
  const stop = DV_STOPS[stopIdx] ?? DV_STOPS[2];
  const [step, setStep] = useState(0);
  const [photoCount, setPhotoCount] = useState(0);
  const [scanOk, setScanOk] = useState(false);
  const [doorOk, setDoorOk] = useState(false);
  const [qty, setQty] = useState(stop.items);

  const STEPS = ["到达确认", "现场拍照", "扫码开门", "完成确认"];

  return (
    <div className="h-full flex flex-col bg-[#F4F8FD]">
      <div className="bg-white flex-shrink-0">
        <NavBar title={stop.name} onBack={onBack} />
        <div className="px-4 pb-4">
          <Steps steps={STEPS} current={step} />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24 pt-3">
        {/* Step 0: Arrive */}
        {step === 0 && (
          <div className="px-4">
            <div className="bg-white rounded-2xl p-5 mb-4 shadow-[0_2px_12px_0_rgba(37,99,235,0.10)]">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 bg-[#DCEBFF] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Ic d={P.pin} size={20} cls="text-[#2563EB]" />
                </div>
                <div>
                  <div className="text-base font-bold text-[#10233F]">{stop.name}</div>
                  <div className="text-sm text-[#8A9BB4]">{stop.addr}</div>
                </div>
              </div>
              <KV label="本站商品" value={`${stop.items}件`} accent />
              <KV label="点位类型" value="写字楼大堂" />
              <KV label="联系人" value="张主任 138-8888-0001" />

              {/* Map stub */}
              <div className="mt-4 rounded-2xl overflow-hidden bg-[#F4F8FD] h-28 flex items-center justify-center relative">
                <div className="absolute inset-0 opacity-20">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="absolute border-[#8A9BB4]" style={{
                      left: `${10 + i * 20}%`, top: 0, bottom: 0, borderLeftWidth: 1, borderStyle: "solid"
                    }} />
                  ))}
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="absolute border-[#8A9BB4]" style={{
                      top: `${10 + i * 25}%`, left: 0, right: 0, borderTopWidth: 1, borderStyle: "solid"
                    }} />
                  ))}
                </div>
                <div className="w-8 h-8 bg-[#2563EB] rounded-full flex items-center justify-center z-10 shadow-lg">
                  <Ic d={P.pin} size={16} cls="text-white" />
                </div>
                <div className="absolute bottom-2 right-2 text-[10px] text-[#8A9BB4] bg-white/80 px-2 py-1 rounded">
                  正在导航...
                </div>
              </div>
            </div>
            <BigBtn label="已到达点位" icon="check" onClick={() => setStep(1)} />
            <div className="mt-2">
              <button onClick={() => onFail("location")} className="w-full py-3 text-sm text-[#E5484D] text-center font-semibold">
                点位异常，无法到达
              </button>
            </div>
          </div>
        )}

        {/* Step 1: Photo */}
        {step === 1 && (
          <div className="px-4">
            <div className="bg-white rounded-2xl p-4 mb-4 shadow-[0_2px_12px_0_rgba(37,99,235,0.10)]">
              <div className="text-sm font-bold text-[#10233F] mb-1">现场拍照记录</div>
              <div className="text-xs text-[#8A9BB4] mb-4">请拍摄点位现场照片（至少 1 张）</div>
              <PhotoZone count={photoCount} max={4} />
              <button onClick={() => setPhotoCount(c => Math.min(4, c + 1))}
                className="mt-3 w-full h-12 bg-[#EAF4FF] border-2 border-dashed border-[#7CC0FF] rounded-2xl flex items-center justify-center gap-2 text-[#1D4ED8] font-semibold text-sm">
                <Ic d={P.camera} size={18} />拍摄照片
              </button>
            </div>
            <BigBtn label={photoCount > 0 ? `已拍 ${photoCount} 张，继续` : "至少拍 1 张照片"} onClick={() => { if (photoCount > 0) setStep(2); }} variant={photoCount > 0 ? "primary" : "ghost"} />
          </div>
        )}

        {/* Step 2: Scan door */}
        {step === 2 && (
          <div className="px-4">
            <div className="bg-white rounded-2xl p-4 mb-4 shadow-[0_2px_12px_0_rgba(37,99,235,0.10)]">
              <div className="text-sm font-bold text-[#10233F] mb-1">扫码开启柜门</div>
              <div className="text-xs text-[#8A9BB4] mb-4">扫描设备门锁二维码解锁</div>
              <ScanZone label="扫描柜门二维码" sublabel="对准柜门内侧二维码"
                success={doorOk ? "DEV-2025-0042 · 已解锁" : undefined}
                onClick={() => setDoorOk(true)} />
              {doorOk && (
                <div className="mt-3 bg-[#E7FAF1] border border-[#A6EBCB] rounded-xl px-4 py-3 flex items-center gap-3">
                  <Ic d={P.unlock} size={18} cls="text-[#12B76A]" />
                  <div>
                    <div className="text-sm font-bold text-[#12B76A]">柜门已解锁</div>
                    <div className="text-xs text-[#8A9BB4]">设备：智柜 Pro X8 · 编号 DEV-2025-0042</div>
                  </div>
                </div>
              )}
            </div>
            {!doorOk && (
              <div className="space-y-2">
                <button onClick={() => onFail("door")}
                  className="w-full py-3 text-sm text-[#E5484D] text-center font-semibold">
                  门锁故障，无法开门
                </button>
                <button onClick={() => onFail("offline")}
                  className="w-full py-3 text-sm text-[#8A9BB4] text-center">
                  设备离线
                </button>
              </div>
            )}
            {doorOk && <BigBtn label="已开门，开始补货" onClick={() => setStep(3)} />}
          </div>
        )}

        {/* Step 3: Confirm */}
        {step === 3 && (
          <div className="px-4">
            <div className="bg-white rounded-2xl p-4 mb-3 shadow-[0_2px_12px_0_rgba(37,99,235,0.10)]">
              <div className="text-sm font-bold text-[#10233F] mb-3">确认补货数量</div>
              <div className="flex items-center justify-between py-3 border-b border-[#F8FAFC]">
                <div>
                  <div className="text-sm font-semibold text-[#10233F]">本站应补货</div>
                  <div className="text-xs text-[#8A9BB4]">预计 {stop.items} 件</div>
                </div>
                <QtyStepper value={qty} onChange={setQty} />
              </div>
              <div className="pt-3">
                <div className="text-xs text-[#8A9BB4] mb-2">补货完成后拍摄柜内照片</div>
                <PhotoZone count={1} max={2} />
                <button className="mt-2 w-full h-11 bg-[#EAF4FF] border-2 border-dashed border-[#7CC0FF] rounded-xl flex items-center justify-center gap-2 text-[#1D4ED8] font-semibold text-sm">
                  <Ic d={P.camera} size={16} />补货后拍照
                </button>
              </div>
            </div>
            <div className="bg-white rounded-2xl px-4 py-3 mb-3 shadow-[0_2px_12px_0_rgba(37,99,235,0.10)]">
              <KV label="点位" value={stop.name} />
              <KV label="实际补货" value={`${qty} 件`} accent />
            </div>
            <BigBtn label="确认完成，关门离开" icon="checkC" onClick={onComplete} />
            <div className="mt-2">
              <button onClick={() => onFail("mismatch")} className="w-full py-3 text-sm text-[#E5484D] text-center font-semibold">
                点位不匹配，标记异常
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// SCREEN: ERROR STATE
// ══════════════════════════════════════════════════════════════════════════════
const ErrorScreen = ({ type, onRetry, onBack, onReport }: {
  type: string; onRetry: () => void; onBack: () => void; onReport: () => void;
}) => {
  const ERRORS: Record<string, { icon: string; title: string; desc: string; hint: string; canRetry: boolean }> = {
    qr: {
      icon: P.qr,
      title: "二维码识别失败",
      desc: "无法识别条码，请确认条码未损坏，并保持稳定距离（10-20cm）",
      hint: "可尝试：清洁屏幕、调整光线、手动输入单号",
      canRetry: true,
    },
    location: {
      icon: P.pin,
      title: "点位无法到达",
      desc: "当前点位已标记异常，该配送站将被跳过，请继续下一站",
      hint: "异常将自动上报给调度员，等待安排补配",
      canRetry: false,
    },
    mismatch: {
      icon: P.alert,
      title: "点位不匹配",
      desc: "当前点位信息与系统记录不符，可能是地址有误或已迁移",
      hint: "请联系调度员确认点位状态，或拍照上报现场情况",
      canRetry: true,
    },
    offline: {
      icon: P.wifiOff,
      title: "设备离线",
      desc: "设备无法响应，可能是断电或网络故障",
      hint: "请检查设备电源和网络，或联系运维介入",
      canRetry: true,
    },
    door: {
      icon: P.lock,
      title: "门锁故障",
      desc: "无法通过扫码解锁柜门，可能是硬件故障",
      hint: "已自动上报运维，请等待处理或联系运维电话",
      canRetry: true,
    },
  };

  const err = ERRORS[type] ?? ERRORS.qr;

  return (
    <div className="h-full flex flex-col bg-[#F4F8FD]">
      <NavBar title="操作异常" onBack={onBack} />
      <div className="flex-1 flex flex-col justify-center pb-12 px-4">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-20 h-20 bg-[#FEF3F3] rounded-3xl flex items-center justify-center mb-5">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#E5484D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d={err.icon} />
            </svg>
          </div>
          <div className="text-xl font-bold text-[#10233F] mb-2">{err.title}</div>
          <p className="text-sm text-[#5B6B84] leading-relaxed mb-4">{err.desc}</p>
          <div className="bg-[#FFFAEB] border border-[#FEDF89] rounded-2xl px-4 py-3 w-full text-left">
            <div className="text-xs font-semibold text-[#8A5200] mb-1 flex items-center gap-1.5">
              <Ic d={P.info} size={13} />建议操作
            </div>
            <div className="text-xs text-[#6B4423] leading-relaxed">{err.hint}</div>
          </div>
        </div>

        <div className="space-y-3">
          {err.canRetry && <BigBtn label="重新扫码 / 重试" icon="refresh" onClick={onRetry} />}
          <button onClick={onReport}
            className="w-full h-14 bg-[#FEF3F3] text-[#E5484D] rounded-2xl font-bold text-[15px] flex items-center justify-center gap-2 border border-[#FDC9C9]">
            <Ic d={P.upload} size={18} />上报异常
          </button>
          <button onClick={onBack} className="w-full py-4 text-sm text-[#8A9BB4] text-center">
            跳过此站，继续下一站
          </button>
        </div>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// SCREEN: SUCCESS FEEDBACK
// ══════════════════════════════════════════════════════════════════════════════
const SuccessScreen = ({ type, onDone, onNext }: {
  type: string; onDone: () => void; onNext?: () => void;
}) => {
  const MSGS: Record<string, { title: string; desc: string; next?: string }> = {
    inbound: { title: "入库成功", desc: "入库单已确认，库存已同步更新", next: "查看入库详情" },
    picking: { title: "分拣完成", desc: "本批次分拣任务已全部完成，可通知配送员取货", next: "打印分拣单" },
    delivery_stop: { title: "站点完成", desc: "本站补货已确认，继续前往下一站", next: "查看详情" },
    delivery_all: { title: "批次配送完成！", desc: "本批次 6 个点位全部履约完成，已自动生成配送报告", next: undefined },
    install: { title: "装机完成", desc: "设备安装已确认，工单已关闭", next: undefined },
  };

  const m = MSGS[type] ?? MSGS.inbound;

  return (
    <div className="h-full flex flex-col items-center justify-center bg-white px-6">
      {/* Animated ring */}
      <div className="relative mb-6">
        <div className="w-24 h-24 rounded-full bg-[#E7FAF1] flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-[#D2F7E5] flex items-center justify-center">
            <Ic d={P.checkC} size={36} cls="text-[#12B76A]" />
          </div>
        </div>
        {type === "delivery_all" && (
          <div className="absolute -top-1 -right-1 w-8 h-8 bg-[#2563EB] rounded-full flex items-center justify-center">
            <span className="text-white text-lg">🎉</span>
          </div>
        )}
      </div>

      <div className="text-2xl font-bold text-[#10233F] mb-2 text-center">{m.title}</div>
      <p className="text-sm text-[#8A9BB4] text-center leading-relaxed mb-10">{m.desc}</p>

      <div className="w-full space-y-3">
        {m.next && onNext && (
          <BigBtn label={m.next} icon="arrow" onClick={onNext} />
        )}
        <BigBtn label="返回任务列表" variant={m.next ? "ghost" : "primary"} onClick={onDone} />
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// SCREEN: INSTALL WO DETAIL
// ══════════════════════════════════════════════════════════════════════════════
const InstallWODetail = ({ orderId, onBack, onAccept, onProcess, onSuccess }: {
  orderId: string; onBack: () => void; onAccept: () => void; onProcess: () => void; onSuccess: () => void;
}) => {
  const order = INSTALL_ORDERS.find(o => o.id === orderId) ?? INSTALL_ORDERS[0];
  const [cancelModal, setCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [cancelled, setCancelled] = useState(false);

  const statusColor = (s: string) => {
    if (s === "待装机") return "orange";
    if (s === "处理中") return "blue";
    if (s === "已装机") return "green";
    return "gray";
  };

  const displayStatus = cancelled ? "已取消" : order.status;

  return (
    <div className="h-full flex flex-col bg-[#F4F8FD] relative">
      <div className="bg-white flex-shrink-0">
        <NavBar title="装机工单详情" onBack={onBack} />
      </div>

      <div className="flex-1 overflow-y-auto pb-32">
        {/* 状态条 */}
        <div className={`h-1.5 ${displayStatus === "待装机" ? "bg-[#2563EB]" : displayStatus === "处理中" ? "bg-[#2563EB]" : displayStatus === "已装机" ? "bg-[#12B76A]" : "bg-[#8A9BB4]"}`} />

        {/* 工单基础信息 */}
        <div className="bg-white mx-4 mt-3 rounded-2xl overflow-hidden shadow-[0_2px_12px_0_rgba(37,99,235,0.10)]">
          <div className="px-4 pt-4 pb-3 border-b border-[#EEF4FB] flex items-center justify-between">
            <span className="text-xs font-semibold text-[#5B6B84]">工单信息</span>
            <Tag label={displayStatus} color={statusColor(displayStatus) as "orange"|"blue"|"green"|"gray"} dot />
          </div>
          <div className="px-4 py-3 space-y-3">
            {/* 装机单号 */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#8A9BB4]">装机单号</span>
              <span className="font-mono text-xs font-semibold text-[#10233F]">{order.id}</span>
            </div>
            {/* 站点编码（高亮） */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#8A9BB4]">站点编码</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded bg-[#DCEBFF] text-[#2563EB] font-mono text-xs font-semibold">{order.siteCode}</span>
            </div>
            {/* 站点名称 */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#8A9BB4]">站点名称</span>
              <span className="text-sm font-bold text-[#10233F]">{order.loc}</span>
            </div>
            {/* 详细地址 */}
            <div className="flex items-start justify-between gap-4">
              <span className="text-xs text-[#8A9BB4] flex-shrink-0">详细地址</span>
              <span className="text-xs text-[#3A4B66] text-right">{order.addr}</span>
            </div>
            {/* 经纬导航 */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#8A9BB4]">导航</span>
              <a
                href={`https://uri.amap.com/marker?position=${order.lng},${order.lat}&name=${encodeURIComponent(order.loc)}`}
                target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs text-[#2563EB]"
              >
                <Ic d={P.pin} size={11} />{order.lat},{order.lng} · 前往导航
              </a>
            </div>
          </div>
        </div>

        {/* 装机信息 */}
        <div className="bg-white mx-4 mt-3 rounded-2xl overflow-hidden shadow-[0_2px_12px_0_rgba(37,99,235,0.10)]">
          <div className="px-4 pt-4 pb-3 border-b border-[#EEF4FB]">
            <span className="text-xs font-semibold text-[#5B6B84]">装机信息</span>
          </div>
          <div className="px-4 py-3 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#8A9BB4]">需求装机时间</span>
              <span className="text-xs font-semibold text-[#2563EB]">{order.demandDate}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#8A9BB4]">安装数量</span>
              <span className="text-sm font-semibold text-[#10233F]">{order.qty} 台</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#8A9BB4]">机型</span>
              <span className="text-xs text-[#3A4B66]">{order.model}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#8A9BB4]">资产编码</span>
              <span className="font-mono text-xs text-[#5B6B84]">{order.cabinetCode || "—"}</span>
            </div>
            <div className="flex items-start justify-between gap-4">
              <span className="text-xs text-[#8A9BB4] flex-shrink-0">设备安装位置</span>
              <span className="text-xs text-[#3A4B66] text-right">{order.installLocation}</span>
            </div>
          </div>
        </div>

        {/* 站点联系人 */}
        <div className="bg-white mx-4 mt-3 rounded-2xl overflow-hidden shadow-[0_2px_12px_0_rgba(37,99,235,0.10)]">
          <div className="px-4 pt-4 pb-3 border-b border-[#EEF4FB]">
            <span className="text-xs font-semibold text-[#5B6B84]">站点联系人</span>
          </div>
          <div className="px-4 py-3 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#8A9BB4]">联系人</span>
              <span className="text-sm font-semibold text-[#10233F]">{order.contact}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#8A9BB4]">手机号</span>
              <a href={`tel:${order.phone}`} className="text-sm text-[#2563EB]">{order.phone}</a>
            </div>
          </div>
        </div>

        {/* 站点信息备注 */}
        <div className="bg-white mx-4 mt-3 mb-3 rounded-2xl overflow-hidden shadow-[0_2px_12px_0_rgba(37,99,235,0.10)]">
          <div className="px-4 pt-4 pb-3 border-b border-[#EEF4FB]">
            <span className="text-xs font-semibold text-[#5B6B84]">站点信息备注</span>
          </div>
          <div className="px-4 py-3">
            <p className="text-xs text-[#3A4B66] leading-relaxed">{order.note}</p>
          </div>
        </div>
      </div>

      {/* 操作按钮 */}
      {!cancelled && (
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#E4EDF7] px-4 pt-2.5 pb-4">
          {order.status === "待装机" && (
            <div className="flex gap-2">
              <button onClick={() => setCancelModal(true)}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-[#EEF4FB] text-[#5B6B84] active:bg-[#E4EDF7]">
                取消工单
              </button>
              <button onClick={onAccept}
                className="flex-2 flex-grow-[2] py-2.5 rounded-xl text-sm font-semibold bg-[#2563EB] text-white active:bg-[#1D4ED8] flex items-center justify-center gap-1.5">
                接单，出发前往
              </button>
            </div>
          )}
          {order.status === "处理中" && (
            <div className="flex gap-2">
              <button onClick={() => setCancelModal(true)}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-[#EEF4FB] text-[#5B6B84] active:bg-[#E4EDF7]">
                取消工单
              </button>
              <button onClick={onProcess}
                className="flex-2 flex-grow-[2] py-2.5 rounded-xl text-sm font-semibold bg-[#2563EB] text-white active:bg-[#1E63B8] flex items-center justify-center gap-1.5">
                去处理
              </button>
            </div>
          )}
          {order.status === "已装机" && (
            <button onClick={onBack}
              className="w-full py-2.5 rounded-xl text-sm font-semibold bg-[#EEF4FB] text-[#3A4B66] active:bg-[#E4EDF7]">
              返回列表
            </button>
          )}
        </div>
      )}
      {cancelled && (
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#E4EDF7] px-4 pt-2.5 pb-4">
          <button onClick={onBack}
            className="w-full py-2.5 rounded-xl text-sm font-semibold bg-[#2563EB] text-white active:bg-[#1E63B8]">
            返回列表
          </button>
        </div>
      )}

      {/* 取消工单弹窗 */}
      {cancelModal && (
        <div className="absolute inset-0 z-50 flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/40" onClick={() => setCancelModal(false)} />
          <div className="relative w-full bg-white flex flex-col" style={{ height: "52%" }}>
            <div className="w-10 h-1 bg-[#E4EDF7] rounded-full mx-auto mt-3 mb-4 flex-shrink-0" />
            <div className="px-4 flex-shrink-0">
              <div className="text-base font-bold text-[#10233F] mb-0.5">取消工单</div>
              <div className="text-xs text-[#8A9BB4] mb-3">请填写取消原因，取消后不可恢复</div>
            </div>
            <div className="px-4 flex-1 min-h-0">
              <textarea
                value={cancelReason}
                onChange={e => setCancelReason(e.target.value)}
                placeholder="请输入取消原因（必填）"
                className="w-full h-full border border-[#E4EDF7] rounded-xl px-3 py-2.5 text-sm text-[#10233F] placeholder-[#C2D2E5] focus:outline-none focus:border-[#2563EB] resize-none"
              />
            </div>
            <div className="flex border-t border-[#EEF4FB] mt-3 flex-shrink-0">
              <button onClick={() => setCancelModal(false)}
                className="flex-1 py-4 text-sm font-semibold text-[#5B6B84] bg-[#F8FAFC] active:bg-[#EEF4FB]">
                返回
              </button>
              <button
                disabled={!cancelReason.trim()}
                onClick={() => { setCancelModal(false); setCancelled(true); }}
                className={`flex-1 py-4 text-sm font-semibold transition-colors ${cancelReason.trim() ? "bg-[#E5484D] text-white" : "bg-[#F8FAFC] text-[#C2D2E5] cursor-not-allowed"}`}>
                确认取消
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// SCREEN: INSTALL LIST
// ══════════════════════════════════════════════════════════════════════════════
const InstallList = ({ onDetail, onBack, tab, onTabChange }: {
  onDetail: (id: string) => void; onBack: () => void; tab: string; onTabChange: (t: string) => void;
}) => {
  const [filter, setFilter] = useState("全部");
  const FILTERS = ["全部", "待装机", "处理中", "已装机"];
  const filtered = INSTALL_ORDERS.filter(o => filter === "全部" || o.status === filter);

  return (
    <div className="h-full flex flex-col">
      <div className="bg-white flex-shrink-0">
        <NavBar title="装机工单" onBack={onBack} />
        <div className="flex gap-2 px-4 py-3 overflow-x-auto">
          {FILTERS.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all
                ${filter === f ? "bg-[#12B76A] text-white" : "bg-[#EEF4FB] text-[#5B6B84]"}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-[#F4F8FD] pt-1 pb-4">
        {filtered.map(o => (
          <div key={o.id}
            className="bg-white mx-4 mb-3 rounded-2xl overflow-hidden shadow-[0_2px_12px_0_rgba(37,99,235,0.10)]">
            <div className={`h-1.5 ${o.status === "待装机" ? "bg-[#2563EB]" : o.status === "处理中" ? "bg-[#2563EB]" : "bg-[#12B76A]"}`} />
            <div className="px-4 pt-3 pb-3">
              {/* 单号 + 状态 */}
              <div className="flex justify-between items-center mb-2">
                <span className="text-[11px] text-[#8A9BB4] font-mono">{o.id}</span>
                <Tag label={o.status} color={statusColor(o.status)} dot />
              </div>
              {/* 站点编码（高亮） */}
              <div className="inline-flex items-center px-2 py-0.5 rounded bg-[#DCEBFF] text-[#2563EB] font-mono text-[11px] font-semibold mb-1.5">{o.siteCode}</div>
              {/* 站点名称 */}
              <div className="text-[15px] font-bold text-[#10233F] mb-1.5">{o.loc}</div>
              {/* 详细地址 */}
              <div className="flex items-start gap-1 text-xs text-[#8A9BB4] mb-1.5">
                <Ic d={P.pin} size={11} cls="flex-shrink-0 mt-0.5" /><span>{o.addr}</span>
              </div>
              {/* 经纬导航 */}
              <a
                href={`https://uri.amap.com/marker?position=${o.lng},${o.lat}&name=${encodeURIComponent(o.loc)}`}
                target="_blank" rel="noreferrer"
                onClick={e => e.stopPropagation()}
                className="inline-flex items-center gap-1 text-[11px] text-[#2563EB] mb-2.5"
              >
                <Ic d={P.pin} size={11} />{o.lat},{o.lng} · 导航
              </a>
              {/* 需求装机时间 + 机型 + 资产编码 */}
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-[#5B6B84] mb-3">
                <span className="flex items-center gap-1 text-[#2563EB] font-semibold"><Ic d={P.clock} size={11} />需求 {o.demandDate}</span>
                <span className="flex items-center gap-1"><Ic d={P.box} size={11} />{o.model} × {o.qty}</span>
                <span className="font-mono text-[#8A9BB4]">{o.cabinetCode || "—"}</span>
              </div>
              {/* 操作按钮 */}
              <div className="flex gap-2 pt-2.5 border-t border-[#EEF4FB]">
                {o.status === "待装机" && (
                  <button onClick={() => onDetail(o.id)}
                    className="flex-1 py-2 rounded-xl text-sm font-semibold bg-[#2563EB] text-white active:bg-[#1D4ED8] transition-colors">
                    接单
                  </button>
                )}
                {o.status === "处理中" && (
                  <button onClick={() => onDetail(o.id)}
                    className="flex-1 py-2 rounded-xl text-sm font-semibold bg-[#2563EB] text-white active:bg-[#1E63B8] transition-colors">
                    去处理
                  </button>
                )}
                {o.status === "已装机" && (
                  <button onClick={() => onDetail(o.id)}
                    className="flex-1 py-2 rounded-xl text-sm font-semibold bg-[#EEF4FB] text-[#3A4B66] active:bg-[#E4EDF7] transition-colors">
                    详情
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <TabBar active={tab} onChange={onTabChange} />
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// SCREEN: INSTALL SUBMIT
// ══════════════════════════════════════════════════════════════════════════════
const InstallSubmit = ({ orderId, onBack, onSuccess }: {
  orderId: string; onBack: () => void; onSuccess: () => void;
}) => {
  const order = INSTALL_ORDERS.find(o => o.id === orderId) ?? INSTALL_ORDERS[0];
  const [step, setStep] = useState(1);
  const [deviceScanned, setDeviceScanned] = useState(false);
  const [deviceSN, setDeviceSN] = useState("");
  const [photoCount, setPhotoCount] = useState(0);
  const [note, setNote] = useState("");

  const STEPS = ["接单确认", "扫描设备码", "现场拍照", "提交完成"];

  return (
    <div className="h-full flex flex-col bg-[#F4F8FD]">
      <div className="bg-white flex-shrink-0">
        <NavBar title="装机操作" onBack={onBack} />
        <div className="px-4 pb-4">
          <Steps steps={STEPS} current={step} />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24 pt-3">
        {/* Step 0: Accept */}
        {step === 0 && (
          <div className="px-4">
            <Card>
              <div className="px-4 py-3">
                <div className="flex justify-between mb-3">
                  <div>
                    <div className="text-xs text-[#8A9BB4] font-mono">{order.id}</div>
                    <div className="text-[15px] font-bold text-[#10233F] mt-0.5">{order.loc}</div>
                  </div>
                  <Tag label={order.status} color={statusColor(order.status)} dot />
                </div>
                <KV label="地址" value={order.addr} />
                <KV label="设备型号" value={order.model} />
                <KV label="安装数量" value={`${order.qty} 台`} accent />
                <KV label="截止时间" value={order.demandDate} />
                <KV label="现场联系" value={order.contact} />
              </div>
            </Card>
            <div className="bg-[#E7FAF1] border border-[#A6EBCB] rounded-2xl p-4 mb-4 flex items-start gap-3">
              <Ic d={P.info} size={16} cls="text-[#12B76A] flex-shrink-0 mt-0.5" />
              <div className="text-xs text-[#0B6E44] leading-relaxed">
                接单后系统将更新工单状态为「处理中」，请尽快前往点位完成装机。如有问题请在接单前联系调度。
              </div>
            </div>
            <BigBtn label="接单，出发前往" icon="arrow" onClick={() => setStep(1)} />
          </div>
        )}

        {/* Step 1: Scan device SN */}
        {step === 1 && (
          <div className="px-4">
            <div className="bg-white rounded-2xl p-4 mb-4 shadow-[0_2px_12px_0_rgba(37,99,235,0.10)]">
              <div className="text-sm font-bold text-[#10233F] mb-1">扫描设备资产编码</div>
              <div className="text-xs text-[#8A9BB4] mb-4">扫描设备背面资产标签上的二维码/条码</div>
              <ScanZone label="扫描设备资产码" sublabel="对准设备背面标签"
                success={deviceScanned ? `${deviceSN || "DEV-2025-0058"} 已录入` : undefined}
                onClick={() => { setDeviceScanned(true); setDeviceSN("DEV-2025-0058"); }} />
            </div>

            {/* Manual input */}
            <div className="bg-white rounded-2xl px-4 mb-4 shadow-[0_2px_12px_0_rgba(37,99,235,0.10)]">
              <div className="py-3">
                <label className="text-xs text-[#8A9BB4] mb-1.5 block">手动输入资产编码</label>
                <div className="flex gap-2">
                  <input value={deviceSN} onChange={e => setDeviceSN(e.target.value)}
                    placeholder="DEV-XXXX-XXXX"
                    className="flex-1 text-[15px] text-[#10233F] outline-none font-mono placeholder-[#C2D2E5]" />
                  {deviceSN && <button onClick={() => setDeviceScanned(true)} className="text-xs text-[#2563EB] font-semibold px-2">确认</button>}
                </div>
              </div>
            </div>

            {deviceScanned && (
              <>
                {/* Second device if qty > 1 */}
                {order.qty > 1 && (
                  <div className="bg-[#FFFAEB] border border-[#FEDF89] rounded-2xl px-4 py-3 mb-3 text-xs text-[#8A5200] flex items-center gap-2">
                    <Ic d={P.info} size={14} />本工单需安装 {order.qty} 台，请继续扫描第2台设备码
                  </div>
                )}
                <BigBtn label="设备码已录入，下一步" onClick={() => setStep(2)} />
              </>
            )}
          </div>
        )}

        {/* Step 2: Photo */}
        {step === 2 && (
          <div className="px-4">
            <div className="bg-white rounded-2xl p-4 mb-3 shadow-[0_2px_12px_0_rgba(37,99,235,0.10)]">
              <div className="text-sm font-bold text-[#10233F] mb-0.5">现场安装照片</div>
              <div className="text-xs text-[#8A9BB4] mb-4">需拍摄：整体环境、设备正面、电源连接（最少3张）</div>
              <PhotoZone count={photoCount} max={6} />
              <button onClick={() => setPhotoCount(c => Math.min(6, c + 1))}
                className="mt-3 w-full h-12 bg-[#EAF4FF] border-2 border-dashed border-[#7CC0FF] rounded-2xl flex items-center justify-center gap-2 text-[#1D4ED8] font-semibold text-sm">
                <Ic d={P.camera} size={18} />拍摄照片
              </button>
            </div>
            <div className="bg-white rounded-2xl px-4 mb-4 shadow-[0_2px_12px_0_rgba(37,99,235,0.10)]">
              <div className="py-3">
                <label className="text-xs text-[#8A9BB4] mb-1.5 block">安装备注（选填）</label>
                <textarea value={note} onChange={e => setNote(e.target.value)} rows={3}
                  placeholder="如：电源位置特殊、需用延长线、现场有障碍物等..."
                  className="w-full text-sm text-[#10233F] placeholder-[#C2D2E5] outline-none resize-none" />
              </div>
            </div>
            {photoCount < 3 && (
              <div className="mb-3 mx-0">
                <ErrorBanner title="照片不足" desc={`还需拍摄 ${3 - photoCount} 张，当前仅有 ${photoCount} 张`} />
              </div>
            )}
            <BigBtn label={photoCount >= 3 ? "照片完成，预览提交" : `还需 ${3 - photoCount} 张`}
              onClick={() => { if (photoCount >= 3) setStep(3); }}
              variant={photoCount >= 3 ? "primary" : "ghost"} />
          </div>
        )}

        {/* Step 3: Review & submit */}
        {step === 3 && (
          <div className="px-4">
            <Sec title="提交确认" />
            <Card>
              <div className="px-4">
                <KV label="工单编号" value={order.id} />
                <KV label="装机点位" value={order.loc} />
                <KV label="装机地址" value={order.addr} />
                <KV label="设备型号" value={order.model} />
                <KV label="资产编码" value={deviceSN || "DEV-2025-0058"} accent />
                <KV label="装机数量" value={`${order.qty} 台`} />
                <KV label="装机位置" value={order.installLocation} />
                <div className="py-3 border-b border-[#F8FAFC]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-[#8A9BB4]">现场照片</span>
                    <span className="text-sm font-semibold text-[#2563EB]">{photoCount} 张</span>
                  </div>
                  <div className="flex gap-2">
                    {[0, 1].map(i => (
                      <div key={i} className="w-20 h-20 rounded-xl bg-[#EEF4FB] border border-[#E4EDF7] flex flex-col items-center justify-center gap-1 overflow-hidden">
                        <Ic d={P.image} size={22} cls="text-[#C2D2E5]" />
                        <span className="text-[10px] text-[#C2D2E5]">照片 {i + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {note && <KV label="安装备注" value={note} />}
              </div>
            </Card>
            <div className="bg-[#E7FAF1] border border-[#A6EBCB] rounded-2xl px-4 py-3 mb-4 flex items-start gap-2 text-xs text-[#0B6E44]">
              <Ic d={P.checkC} size={14} cls="flex-shrink-0 mt-0.5" />
              信息核对无误，提交后工单状态将变更为「已装机」
            </div>
            <BigBtn label="确认提交完成" icon="check" onClick={onSuccess} />
          </div>
        )}
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// SCREEN: MY PAGE
// ══════════════════════════════════════════════════════════════════════════════
const MinePage = ({ tab, onTabChange, onLogout }: {
  tab: string; onTabChange: (t: string) => void; onLogout: () => void;
}) => (
  <div className="h-full flex flex-col">
    <div className={`${GRAD.hero} px-5 pt-3 pb-10 flex-shrink-0 relative overflow-hidden`}>
      <div className={`absolute inset-0 ${GRAD.glow}`} />
      <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/10" />
      <div className="relative flex items-center justify-between">
        <div className="text-white text-lg font-bold">我的</div>
        <BrandMark size={26} />
      </div>
      <div className="relative flex items-center gap-4 mt-5">
        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-[0_2px_10px_0_rgba(16,35,63,0.12)]">
          <span className="text-[#2563EB] text-xl font-bold">张</span>
        </div>
        <div>
          <div className="text-white text-lg font-bold">张伟</div>
          <div className="text-white/80 text-sm mt-0.5">配送员 · 南山区组</div>
          <div className="flex items-center gap-1 mt-1 text-xs text-white/75">
            <Ic d={P.phone} size={11} />138-8888-3301
          </div>
        </div>
      </div>
    </div>

    <div className="flex-1 overflow-y-auto bg-[#F4F8FD] pb-20 pt-5">
      {/* Today's summary */}
      <div className={`bg-white rounded-3xl mx-4 mb-3 px-4 ${SHADOW.card} overflow-hidden`}>
        <div className="flex items-center gap-1.5 pt-5 pb-3">
          <span className={`w-1 h-3 rounded-full ${GRAD.bar}`} />
          <span className="text-xs font-bold text-[#5B6B84] uppercase tracking-wide">今日完成</span>
        </div>
        <div className="grid grid-cols-3 divide-x divide-[#F4F8FD] border-t border-[#F4F8FD]">
          {[['6', '配送站'], ['48', '补货件'], ['0', '异常']].map(([v, l]) => (
            <div key={l} className="py-4 text-center">
              <div className="text-2xl font-bold text-[#10233F] leading-none">{v}</div>
              <div className="text-[10px] text-[#8A9BB4] mt-1.5">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div className="bg-white rounded-3xl mx-4 mb-3 overflow-hidden shadow-[0_2px_12px_0_rgba(37,99,235,0.10)]">
        {[
          { icon: "bell", label: "消息通知", sub: "已开启" },
          { icon: "phone", label: "联系调度", sub: "400-888-0000" },
          { icon: "info", label: "关于应用", sub: "v2.1.0" },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-4 border-b border-[#F8FAFC] last:border-0">
            <div className="w-9 h-9 rounded-xl bg-[#EAF4FF] flex items-center justify-center flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#56A9FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d={P[item.icon]} />
              </svg>
            </div>
            <span className="flex-1 text-[15px] font-medium text-[#10233F]">{item.label}</span>
            <span className="text-sm text-[#8A9BB4]">{item.sub}</span>
            <Ic d={P.chevR} size={14} cls="text-[#C2D2E5]" />
          </div>
        ))}
      </div>

      <div className="px-4">
        <button onClick={onLogout}
          className="w-full h-14 bg-white rounded-2xl text-[15px] font-bold text-[#E5484D] flex items-center justify-center gap-2 shadow-[0_2px_12px_0_rgba(37,99,235,0.10)]">
          <Ic d={P.logOut} size={18} />退出登录
        </button>
      </div>
    </div>

    <TabBar active={tab} onChange={onTabChange} />
  </div>
);

// ══════════════════════════════════════════════════════════════════════════════
// APP ORCHESTRATOR
// ══════════════════════════════════════════════════════════════════════════════
type FMPage =
  | "login"
  | "workbench"
  | "inbound-list" | "inbound-detail" | "inbound-done-detail"
  | "pick-list" | "pick-detail" | "pick-print"
  | "delivery-list" | "delivery-detail" | "delivery-exception" | "delivery-scan-open" | "delivery-restock-goods" | "delivery-photo-submit" | "delivery-action"
  | "install-list" | "install-wo-detail" | "install-detail"
  | "error-qr" | "error-location" | "error-mismatch" | "error-offline" | "error-door"
  | "success-inbound" | "success-picking" | "success-stop" | "success-all" | "success-install"
  | "mine";

interface FMPageConfig { section: string; label: string; page: FMPage; }

const FM_NAV: FMPageConfig[] = [
  { section: "通用", label: "登录 / 角色选择", page: "login" },
  { section: "通用", label: "工作台首页", page: "workbench" },
  { section: "仓储入库", label: "入库单列表", page: "inbound-list" },
  { section: "仓储入库", label: "入库操作（扫码→确认→库位）", page: "inbound-detail" },
  { section: "分拣", label: "分拣批次列表", page: "pick-list" },
  { section: "分拣", label: "分拣详情（按库位拣取）", page: "pick-detail" },
  { section: "分拣", label: "打印分拣单视图", page: "pick-print" },
  { section: "配送", label: "配送任务列表", page: "delivery-list" },
  { section: "配送", label: "配送批次详情", page: "delivery-detail" },
  { section: "配送", label: "配送动作（到达→拍照→扫码→完成）", page: "delivery-action" },
  { section: "装机", label: "装机工单列表", page: "install-list" },
  { section: "装机", label: "装机提交（扫码→拍照→提交）", page: "install-detail" },
  { section: "异常反馈", label: "二维码识别失败", page: "error-qr" },
  { section: "异常反馈", label: "点位不匹配", page: "error-mismatch" },
  { section: "异常反馈", label: "设备离线", page: "error-offline" },
  { section: "异常反馈", label: "门锁故障", page: "error-door" },
  { section: "完成反馈", label: "入库成功", page: "success-inbound" },
  { section: "完成反馈", label: "站点完成，继续下一站", page: "success-stop" },
  { section: "完成反馈", label: "批次全部履约完成", page: "success-all" },
  { section: "完成反馈", label: "装机完成", page: "success-install" },
  { section: "我的", label: "账号信息 / 退出", page: "mine" },
];

export const FulfillmentMiniAppV2 = () => {
  const [page, setPage] = useState<FMPage>("login");
  const [tab, setTab] = useState("workbench");
  const [selectedInbound, setSelectedInbound] = useState("IB-2509-041");
  const [selectedBatch, setSelectedBatch] = useState("PK-2509-021");
  const [selectedDelivery, setSelectedDelivery] = useState("DV-2509-032");
  const [selectedInstall, setSelectedInstall] = useState("WO-2509-015");
  const [selectedStop, setSelectedStop] = useState(2);

  const nav = (p: FMPage) => setPage(p);

  const tabToPage: Record<string, FMPage> = {
    workbench: "workbench", tasks: "delivery-list", mine: "mine",
  };

  const handleTabChange = (t: string) => {
    setTab(t);
    nav(tabToPage[t] ?? "workbench");
  };

  const handleWorkbenchNav = (key: string) => nav(key as FMPage);

  const renderPage = () => {
    switch (page) {
      case "login":
        return <LoginScreen onLogin={() => nav("workbench")} />;
      case "workbench":
        return <WorkbenchHome tab={tab} onTabChange={handleTabChange} onNavigate={handleWorkbenchNav} />;
      case "inbound-list":
        return <InboundList tab={tab} onTabChange={handleTabChange} onBack={() => nav("workbench")}
          onDetail={id => { setSelectedInbound(id); nav("inbound-detail"); }}
          onDoneDetail={id => { setSelectedInbound(id); nav("inbound-done-detail"); }} />;
      case "inbound-detail":
        return <InboundDetail orderId={selectedInbound} onBack={() => nav("inbound-list")}
          onSuccess={() => nav("success-inbound")} onError={t => nav(`error-${t}` as FMPage)} />;
      case "inbound-done-detail":
        return <InboundDoneDetail orderId={selectedInbound} onBack={() => nav("inbound-list")} />;
      case "pick-list":
        return <PickingList tab={tab} onTabChange={handleTabChange} onBack={() => nav("workbench")}
          onDetail={id => { setSelectedBatch(id); nav("pick-detail"); }} />;
      case "pick-detail":
        return <PickingDetail batchId={selectedBatch} onBack={() => nav("pick-list")}
          onPrint={() => nav("pick-print")} />;
      case "pick-print":
        return <PrintView batchId={selectedBatch} onBack={() => nav("pick-detail")} />;
      case "delivery-list":
        return <DeliveryList tab={tab} onTabChange={handleTabChange} onBack={() => nav("workbench")}
          onDetail={id => { setSelectedDelivery(id); nav("delivery-detail"); }} />;
      case "delivery-detail":
        return <DeliveryTaskDetailPage delivId={selectedDelivery} onBack={() => nav("delivery-list")}
          onException={() => nav("delivery-exception")} onScanOpen={() => nav("delivery-scan-open")} />;
      case "delivery-exception":
        return <DeliveryExceptionPage delivId={selectedDelivery} onBack={() => nav("delivery-detail")}
          onSubmit={() => nav("delivery-list")} />;
      case "delivery-scan-open":
        return <DeliveryScanOpenPage delivId={selectedDelivery} onBack={() => nav("delivery-detail")}
          onNext={() => nav("delivery-restock-goods")} />;
      case "delivery-restock-goods":
        return <DeliveryRestockGoodsPage delivId={selectedDelivery} onBack={() => nav("delivery-scan-open")}
          onNext={() => nav("delivery-photo-submit")} />;
      case "delivery-photo-submit":
        return <DeliveryPhotoSubmitPage delivId={selectedDelivery} onBack={() => nav("delivery-restock-goods")}
          onSubmit={() => nav("success-stop")} />;
      case "delivery-action":
        return <DeliveryAction stopIdx={selectedStop} onBack={() => nav("delivery-detail")}
          onComplete={() => nav("success-stop")} onFail={t => nav(`error-${t}` as FMPage)} />;
      case "install-list":
        return <InstallList tab={tab} onTabChange={handleTabChange} onBack={() => nav("workbench")}
          onDetail={id => { setSelectedInstall(id); nav("install-wo-detail"); }} />;
      case "install-wo-detail":
        return <InstallWODetail orderId={selectedInstall} onBack={() => nav("install-list")}
          onAccept={() => nav("install-detail")}
          onProcess={() => nav("install-detail")}
          onSuccess={() => nav("success-install")} />;
      case "install-detail":
        return <InstallSubmit orderId={selectedInstall} onBack={() => nav("install-wo-detail")}
          onSuccess={() => nav("success-install")} />;
      case "error-qr":
        return <ErrorScreen type="qr" onBack={() => nav(page.includes("delivery") ? "delivery-action" : "inbound-detail")}
          onRetry={() => nav("delivery-action")} onReport={() => nav("delivery-list")} />;
      case "error-mismatch":
        return <ErrorScreen type="mismatch" onBack={() => nav("delivery-action")}
          onRetry={() => nav("delivery-action")} onReport={() => nav("delivery-list")} />;
      case "error-offline":
        return <ErrorScreen type="offline" onBack={() => nav("delivery-action")}
          onRetry={() => nav("delivery-action")} onReport={() => nav("delivery-list")} />;
      case "error-door":
        return <ErrorScreen type="door" onBack={() => nav("delivery-action")}
          onRetry={() => nav("delivery-action")} onReport={() => nav("delivery-list")} />;
      case "success-inbound":
        return <SuccessScreen type="inbound" onDone={() => nav("inbound-list")} onNext={() => nav("inbound-list")} />;
      case "success-stop":
        return <SuccessScreen type="delivery_stop" onDone={() => nav("delivery-list")}
          onNext={() => { setSelectedStop(s => Math.min(s + 1, DV_STOPS.length - 1)); nav("delivery-action"); }} />;
      case "success-all":
        return <SuccessScreen type="delivery_all" onDone={() => nav("delivery-list")} />;
      case "success-install":
        return <SuccessScreen type="install" onDone={() => nav("install-list")} />;
      case "mine":
        return <MinePage tab={tab} onTabChange={handleTabChange} onLogout={() => nav("login")} />;
      default:
        return null;
    }
  };

  const sections = [...new Set(FM_NAV.map(p => p.section))];

  return (
    <div className="flex gap-6 items-start">
      {/* Phone frame */}
      <div className="flex-shrink-0 relative">
        <div className="w-[393px] rounded-[52px] bg-[#1C1C1E] p-[10px] shadow-2xl">
          <div className="bg-black h-10 rounded-t-[44px] flex items-center justify-center">
            <div className="w-24 h-7 bg-black rounded-full border border-[#2A2A2E]" />
          </div>
          <div className="bg-white relative overflow-hidden" style={{ height: "720px" }}>
            <StatusBar />
            <div className="absolute inset-0 top-[28px] flex flex-col overflow-hidden">
              {renderPage()}
            </div>
          </div>
          <div className="bg-black h-8 rounded-b-[44px] flex items-center justify-center">
            <div className="w-28 h-1 bg-white/20 rounded-full" />
          </div>
        </div>
        {/* Frame buttons */}
        <div className="absolute -left-[13px] top-[96px] w-[13px] h-8 bg-[#2A2A2E] rounded-l-full" />
        <div className="absolute -left-[13px] top-[144px] w-[13px] h-12 bg-[#2A2A2E] rounded-l-full" />
        <div className="absolute -left-[13px] top-[208px] w-[13px] h-12 bg-[#2A2A2E] rounded-l-full" />
        <div className="absolute -right-[13px] top-[128px] w-[13px] h-16 bg-[#2A2A2E] rounded-r-full" />
      </div>

      {/* Page navigator */}
      <div className="w-48 flex-shrink-0 pt-2 sticky top-0 max-h-screen overflow-y-auto pb-8">
        <div className="flex items-center gap-2 mb-3">
          <BrandMark size={24} />
          <div className="text-[11px] font-bold text-[#10233F] leading-tight">
            履约小程序 V2
            <div className="text-[10px] text-[#8A9BB4] font-normal">闪购星蓝主题</div>
          </div>
        </div>
        {/* 色板预览 */}
        <div className="flex gap-1 mb-4">
          {["#1D4ED8", "#2563EB", "#56A9FF", "#7CC0FF", "#A5DCFF", "#EAF4FF"].map(c => (
            <span key={c} className="flex-1 h-4 rounded" style={{ background: c }} title={c} />
          ))}
        </div>
        <div className="text-[10px] font-bold text-[#8A9BB4] uppercase tracking-wider mb-3">页面导航</div>
        <div className="space-y-4">
          {sections.map(sec => (
            <div key={sec}>
              <div className="text-[10px] font-bold text-[#C2D2E5] uppercase tracking-wider mb-1.5 px-1">{sec}</div>
              <div className="space-y-0.5">
                {FM_NAV.filter(p => p.section === sec).map(p => (
                  <button key={p.page} onClick={() => setPage(p.page)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-[11px] transition-all leading-snug
                      ${page === p.page
                        ? "bg-[#EAF4FF] text-[#1D4ED8] font-bold border border-[#BFDBFE]"
                        : "text-[#5B6B84] hover:bg-[#F8FAFC] hover:text-[#3A4B66]"}`}>
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5 p-3 bg-[#F8FAFC] rounded-xl">
          <div className="text-[10px] text-[#8A9BB4] leading-relaxed">
            点击右侧导航可直接预览任意页面，也可在手机内按正常流程操作。
          </div>
        </div>
      </div>
    </div>
  );
};
