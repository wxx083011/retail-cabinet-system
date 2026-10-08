import { useState, useEffect, ReactNode } from "react";
import brandMark from "./imports/flashbuy-star-mark.png";

// ══════════════════════════════════════════════════════════════════════════════
// 闪购星 · 消费者小程序 V2
// 双档蓝体系：深蓝锚点 #2563EB 承载价格与行动，亮蓝 #56A9FF 承载品牌与氛围
// 色阶：A5DCFF / 7CC0FF / 56A9FF / 3E8BF5 / 2563EB / 1D4ED8
// 全部渐变、阴影、主题色在此单点定义，页面内不再散写十六进制
// ══════════════════════════════════════════════════════════════════════════════
const CM_THEME = {
  brand:     "#56A9FF",  brandLight: "#7CC0FF",  brandPale: "#A5DCFF",
  brandMid:  "#3E8BF5",  brandDeep:  "#2563EB",  brandInk:  "#1D4ED8",
  brandSoft: "#EAF4FF",  brandLine:  "#BFDBFE",
  mint:      "#12B76A",  mintSoft:   "#E7FAF1",  mintLine:  "#A6EBCB",
  coral:     "#E5484D",  sun:        "#F79009",  sunSoft:   "#FFF6E5",
  page:      "#F4F8FD",  title:      "#10233F",  body:      "#3A4B66",
  muted:     "#8A9BB4",  line:       "#E4EDF7",
} as const;

// 兼容旧页面里的 BRAND.xxx 引用，统一指向闪购星蓝
const BRAND = { primary: CM_THEME.brandDeep, light: CM_THEME.brandSoft, mid: CM_THEME.brandLine, dark: CM_THEME.brandInk };

const GRAD = {
  hero: "bg-[linear-gradient(135deg,#2563EB_0%,#3E8BF5_45%,#56A9FF_100%)]",
  btn:  "bg-[linear-gradient(135deg,#1D4ED8_0%,#2563EB_55%,#4E9BFF_100%)]",
  bar:  "bg-[linear-gradient(90deg,#2563EB_0%,#56A9FF_100%)]",
  glow: "bg-[radial-gradient(circle_at_72%_18%,rgba(255,255,255,0.38)_0%,rgba(255,255,255,0)_62%)]",
};
const SHADOW = {
  card: "shadow-[0_2px_12px_0_rgba(37,99,235,0.10)]",
  lift: "shadow-[0_8px_24px_-8px_rgba(37,99,235,0.32)]",
  btn:  "shadow-[0_6px_16px_-6px_rgba(37,99,235,0.38)]",
};

const P: Record<string, string> = {
  chevL:   "M15 18l-6-6 6-6",
  chevR:   "M9 18l6-6-6-6",
  chevD:   "M6 9l6 6 6-6",
  x:       "M18 6L6 18M6 6l12 12",
  check:   "M20 6L9 17l-5-5",
  plus:    "M12 5v14M5 12h14",
  search:  "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0",
  scan:    "M3 7V5a2 2 0 012-2h2M17 3h2a2 2 0 012 2v2M21 17v2a2 2 0 01-2 2h-2M7 21H5a2 2 0 01-2-2v-2",
  qr:      "M3 3h6v6H3zM15 3h6v6h-6zM3 15h6v6H3z M5 5h2v2H5zM17 5h2v2h-2zM5 17h2v2H5z M15 15h2v2h-2zM19 15h2v2h-2zM15 19h2v2h-2zM19 19h2v2h-2z",
  user:    "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8",
  pkg:     "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
  home:    "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z",
  list:    "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01",
  info:    "M12 22a10 10 0 100-20 10 10 0 000 20z M12 8v4 M12 16h.01",
  alert:   "M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z M12 9v4 M12 17h.01",
  checkC:  "M22 11.08V12a10 10 0 11-5.93-9.14 M22 4L12 14.01l-3-3",
  refresh: "M23 4v6h-6 M1 20v-6h6 M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15",
  phone:   "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 01.4 2.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z",
  upload:  "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4 M17 8l-5-5-5 5 M12 3v12",
  image:   "M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2z M8.5 10a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM21 15l-5-5L5 21",
  wallet:  "M21 12V7H5a2 2 0 010-4h14v4 M3 5v14a2 2 0 002 2h16v-5 M18 12a2 2 0 000 4h4v-4z",
  truck:   "M1 3h15v13H1z M16 8h4l3 3v5h-7V8z M5.5 21a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM18.5 21a2.5 2.5 0 100-5 2.5 2.5 0 000 5z",
  clock:   "M12 22a10 10 0 100-20 10 10 0 000 20z M12 6v6l4 2",
  star:    "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  logOut:  "M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4 M16 17l5-5-5-5 M21 12H9",
  tag:     "M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z M7 7h.01",
  filter:  "M22 3H2l8 9.46V19l4 2v-8.54L22 3",
  heart:   "M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z",
  service: "M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z",
  pin:     "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z M12 10a2 2 0 100-4 2 2 0 000 4",
  zap:     "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  eye:     "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 12a3 3 0 100-6 3 3 0 000 6",
  lock:    "M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2z M17 11V7a5 5 0 00-10 0v4",
  unlock:  "M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2z M17 11V7a5 5 0 00-9.9-1",
  arrow:   "M5 12h14M12 5l7 7-7 7",
  bell:    "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 01-3.46 0",
  wechat:  "M9.5 13.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zm5 0c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zM12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z",
};

const Ic = ({ d, size = 16, cls = "", fill = false }: { d: string; size?: number; cls?: string; fill?: boolean }) => (
  <svg width={size} height={size} viewBox="0 0 24 24"
    fill={fill ? "currentColor" : "none"} stroke={fill ? "none" : "currentColor"}
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}>
    <path d={d} />
  </svg>
);

// ─── Types ─────────────────────────────────────────────────────────────────
type BC = "teal" | "blue" | "green" | "yellow" | "red" | "gray" | "orange" | "purple";

// teal=品牌蓝 blue=亮青 green=薄荷 yellow=暖黄 red=珊瑚 orange=暖橙 purple=靛蓝 gray=中性
const TAG_CLS: Record<BC, string> = {
  teal:   "bg-[#EAF4FF] text-[#1D4ED8] border border-[#BFDBFE]",
  blue:   "bg-[#E6F8FF] text-[#0C7BB3] border border-[#BAE9FB]",
  green:  "bg-[#E7FAF1] text-[#0E8A55] border border-[#A6EBCB]",
  yellow: "bg-[#FFF6E5] text-[#B25E00] border border-[#FFE1AE]",
  red:    "bg-[#FEF3F3] text-[#D63C41] border border-[#FDC9C9]",
  gray:   "bg-[#F4F8FD] text-[#5B6B84] border border-[#E4EDF7]",
  orange: "bg-[#FFF1EA] text-[#C2510C] border border-[#FFD9C2]",
  purple: "bg-[#EEF3FF] text-[#4356C4] border border-[#D6E0FF]",
};

const statusColor = (s: string): BC => ({
  "在售": "teal", "售罄": "gray", "即将售罄": "yellow",
  "待发货": "yellow", "运输中": "blue", "已送达": "green", "待处理": "yellow",
  "已完成": "green", "待付款": "orange", "已支付": "green", "已退款": "gray",
  "退款中": "blue", "退款失败": "red", "部分退款": "purple",
  "已关闭": "gray",
}[s] ?? "gray") as BC;

// ─── Shared Shell Components ──────────────────────────────────────────────
const StatusBar = ({ dark = false }: { dark?: boolean }) => (
  <div className={`flex justify-between items-center px-6 py-2 text-xs font-semibold flex-shrink-0 ${dark ? "text-white bg-transparent" : "text-[#10233F] bg-white"}`}>
    <span>9:41</span>
    <div className="flex items-center gap-1.5">
      <svg width="14" height="10" viewBox="0 0 14 10" fill="currentColor">
        <rect x="0" y="4" width="2.5" height="6" rx="0.5" opacity={dark ? 0.6 : 0.4} />
        <rect x="3.5" y="2.5" width="2.5" height="7.5" rx="0.5" opacity={dark ? 0.8 : 0.6} />
        <rect x="7" y="0.5" width="2.5" height="9.5" rx="0.5" />
        <rect x="10.5" y="0" width="2.5" height="10" rx="0.5" />
      </svg>
      <div className="w-5 h-2.5 rounded-sm border border-current flex items-center px-0.5">
        <div className="w-3.5 h-1.5 bg-current rounded-sm" />
      </div>
    </div>
  </div>
);

const NavBar = ({ title, onBack, rightEl, transparent = false, white = false }: {
  title: string; onBack?: () => void; rightEl?: ReactNode; transparent?: boolean; white?: boolean;
}) => (
  <div className={`flex items-center h-11 px-4 flex-shrink-0 ${transparent ? "bg-transparent" : white ? "bg-white border-b border-[#E4EDF7]" : "bg-white border-b border-[#E4EDF7]"}`}>
    {onBack && (
      <button onClick={onBack} className={`w-9 h-9 -ml-1 flex items-center justify-center rounded-full ${transparent ? "bg-white/20" : ""}`}>
        <Ic d={P.chevL} size={20} cls={transparent ? "text-white" : "text-[#10233F]"} />
      </button>
    )}
    <span className={`flex-1 text-[17px] font-bold text-center ${onBack ? "mr-9" : ""} ${transparent ? "text-white" : "text-[#10233F]"}`}>{title}</span>
    {rightEl}
  </div>
);

const Chip = ({ label, active, onClick, color }: { label: string; active: boolean; onClick: () => void; color?: string }) => (
  <button onClick={onClick}
    className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all
      ${active ? "text-white" : "bg-[#E4EDF7] text-[#5B6B84]"}`}
    style={active ? { background: color ?? BRAND.primary } : undefined}>
    {label}
  </button>
);

const Tag = ({ label, color, dot }: { label: string; color: BC; dot?: boolean }) => (
  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold ${TAG_CLS[color]}`}>
    {dot && <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />}
    {label}
  </span>
);

const Divider = () => <div className="h-px bg-[#EEF4FB] mx-4" />;

const KV = ({ label, value, accent = false, lg = false }: { label: string; value: ReactNode; accent?: boolean; lg?: boolean }) => (
  <div className="flex items-center justify-between py-3 border-b border-[#EEF4FB] last:border-0">
    <span className="text-sm text-[#8A9BB4]">{label}</span>
    <span className={`${lg ? "text-lg font-bold" : "text-sm font-semibold"} ${accent ? "text-[#2563EB]" : "text-[#10233F]"}`}>{value}</span>
  </div>
);

const Card = ({ children, cls = "", p = true }: { children: ReactNode; cls?: string; p?: boolean }) => (
  <div className={`bg-white rounded-3xl mx-4 mb-3 overflow-hidden ${SHADOW.card} ${p ? "px-4" : ""} ${cls}`}>
    {children}
  </div>
);

const SecLabel = ({ title, action }: { title: string; action?: ReactNode }) => (
  <div className="flex items-center justify-between px-4 pt-5 pb-2.5">
    <span className="flex items-center gap-1.5 text-[13px] font-bold text-[#10233F]">
      <span className={`w-1 h-3.5 rounded-full ${GRAD.bar}`} />{title}
    </span>
    {action}
  </div>
);

const Empty = ({ icon, title, desc, action }: { icon: string; title: string; desc?: string; action?: ReactNode }) => (
  <div className="flex flex-col items-center py-14 px-8 text-center">
    <div className="w-16 h-16 rounded-3xl bg-[#EAF4FF] flex items-center justify-center mb-4">
      <Ic d={P[icon]} size={28} cls="text-[#7CC0FF]" />
    </div>
    <div className="text-base font-bold text-[#3A4B66] mb-1">{title}</div>
    {desc && <p className="text-sm text-[#8A9BB4] leading-relaxed mb-5">{desc}</p>}
    {action}
  </div>
);

// ═══ 消费端页面 ═══

// ─── Mock Data ───────────────────────────────────────────────────────────
const CB_CART = [
  { id: 1, name: "可口可乐 330ml", price: 4.5, qty: 2 },
  { id: 2, name: "乐事薯片 75g", price: 7.5, qty: 1 },
  { id: 3, name: "农夫山泉 550ml", price: 3.0, qty: 1 },
];

const CB_ORDERS = [
  {
    id: "ORD-202509-8821", device: "智柜 Pro X8 · 科技园北楼", time: "09-14 12:30", total: 19.5, status: "已支付",
    items: [
      { name: "可口可乐 330ml", price: 4.5, qty: 2 },
      { name: "乐事薯片 75g", price: 7.5, qty: 1 },
      { name: "农夫山泉 550ml", price: 3.0, qty: 1 },
    ],
    refund: null,
  },
  {
    id: "ORD-202509-7762", device: "智柜 Pro X8 · 科技园北楼", time: "09-13 15:10", total: 12.0, status: "已退款",
    items: [
      { name: "元气森林气泡水", price: 6.0, qty: 1 },
      { name: "百事可乐 500ml", price: 5.0, qty: 1 },
      { name: "农夫山泉 550ml", price: 3.0, qty: 1 },
    ],
    refund: { amount: 6.0, reason: "商品已过期", status: "已退款", time: "09-13 16:40" },
  },
  {
    id: "ORD-202509-6614", device: "智柜 Pro X8 · 科技园北楼", time: "09-12 09:05", total: 7.5, status: "退款中",
    items: [
      { name: "旺旺雪饼 180g", price: 7.5, qty: 1 },
    ],
    refund: { amount: 7.5, reason: "商品质量问题", status: "退款中", time: "09-12 09:30" },
  },
  {
    id: "ORD-202509-9103", device: "智柜 Pro X8 · 科技园北楼", time: "09-11 18:02", total: 9.5, status: "待付款",
    items: [
      { name: "卫龙辣条 100g", price: 5.5, qty: 1 },
      { name: "康师傅冰红茶 550ml", price: 4.0, qty: 1 },
    ],
    refund: null,
  },
];

const CB_SHOWCASE = [
  { name: "可口可乐", price: 4.5, emoji: "🥤" },
  { name: "乐事薯片", price: 7.5, emoji: "🍟" },
  { name: "农夫山泉", price: 3.0, emoji: "💧" },
  { name: "元气森林", price: 6.0, emoji: "🫧" },
  { name: "旺旺雪饼", price: 8.0, emoji: "🍘" },
  { name: "自热米饭", price: 25.9, emoji: "🍱" },
];

// ─── B: 订单列表共用（商品缩略图 / 状态 tab / 订单卡） ──────────────────────
/** 订单里只有商品名，缩略图按关键词匹配 */
const GOODS_THUMB: [string, string][] = [
  ["可口可乐", "🥤"], ["百事可乐", "🥤"], ["乐事薯片", "🍟"], ["农夫山泉", "💧"],
  ["元气森林", "🫧"], ["旺旺雪饼", "🍘"], ["自热米饭", "🍱"], ["卫龙辣条", "🌶️"],
  ["冰红茶", "🍵"], ["泡面", "🍜"], ["士力架", "🍫"],
];
const thumbOf = (name: string) => GOODS_THUMB.find(([k]) => name.includes(k))?.[1] ?? "🛒";

/** 订单状态筛选项：我的页与订单列表页共用 */
const ORDER_TABS = ["全部", "待付款", "已支付", "退款中", "已退款"];
const orderCount = (tab: string) => (tab === "全部" ? CB_ORDERS.length : CB_ORDERS.filter(o => o.status === tab).length);

const OrderStatusTabs = ({ active, onChange }: { active: string; onChange: (t: string) => void }) => (
  <div className="flex items-center bg-[#F4F8FD] rounded-full p-1 gap-0.5">
    {ORDER_TABS.map(t => {
      const on = active === t;
      const n = orderCount(t);
      return (
        <button key={t} onClick={() => onChange(t)}
          className={`flex-1 h-8 rounded-full px-1 flex items-center justify-center gap-0.5 text-[11px] transition-all
            ${on
              ? "bg-white font-bold text-[#2563EB] shadow-[0_2px_8px_-2px_rgba(37,99,235,0.4)]"
              : "font-medium text-[#8A9BB4] active:text-[#3A4B66]"}`}>
          {t}
          {n > 0 && <span className={`text-[9px] font-bold leading-none ${on ? "text-[#56A9FF]" : "text-[#C2D2E5]"}`}>{n}</span>}
        </button>
      );
    })}
  </div>
);

const OrderCard = ({ o, onDetail }: { o: (typeof CB_ORDERS)[number]; onDetail: (id: string) => void }) => {
  const qty = o.items.reduce((s, i) => s + i.qty, 0);
  return (
    <div className={`bg-white rounded-3xl px-4 py-4 ${SHADOW.card}`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] text-[#8A9BB4] font-mono">{o.id}</span>
        <Tag label={o.status} color={statusColor(o.status)} dot />
      </div>
      {/* 商品图片列表 */}
      <div className="flex items-center gap-2 mb-3">
        {o.items.slice(0, 3).map(it => (
          <div key={it.name} className="relative w-12 h-12 rounded-2xl bg-[#EAF4FF] flex items-center justify-center flex-shrink-0">
            <span style={{ fontSize: 22, lineHeight: 1 }}>{thumbOf(it.name)}</span>
            {it.qty > 1 && (
              <span className="absolute -right-1 -top-1 min-w-[16px] h-4 px-1 rounded-full bg-[#2563EB] text-white text-[9px] font-bold flex items-center justify-center">×{it.qty}</span>
            )}
          </div>
        ))}
        {o.items.length > 3 && (
          <div className="w-12 h-12 rounded-2xl bg-[#F4F8FD] border border-dashed border-[#DCE6F2] flex items-center justify-center text-[11px] font-bold text-[#8A9BB4] flex-shrink-0">
            +{o.items.length - 3}
          </div>
        )}
        <div className="flex-1 min-w-0 pl-1">
          <div className="text-[13px] font-semibold text-[#10233F] truncate">
            {o.items[0].name}{o.items.length > 1 ? ` 等 ${o.items.length} 种` : ""}
          </div>
          <div className="text-[11px] text-[#8A9BB4] mt-1">共 {qty} 件 · {o.time}</div>
        </div>
      </div>
      {o.refund && (
        <div className="mb-3 px-3 py-1.5 bg-[#EAF4FF] rounded-xl text-[11px] text-[#2563EB] flex items-center gap-1.5">
          <Ic d={P.refresh} size={11} />
          {o.refund.status === "已退款" ? `已退 ¥${o.refund.amount}` : `退款申请中 ¥${o.refund.amount}`}
        </div>
      )}
      <div className="flex items-center justify-between pt-3 border-t border-[#EEF4FB]">
        <span className="text-xs text-[#8A9BB4]">实付 <span className="text-[16px] font-bold text-[#1D4ED8] ml-0.5">¥{o.total.toFixed(1)}</span></span>
        {/* 小号详情按钮 */}
        <button onClick={() => onDetail(o.id)}
          className="h-8 px-3.5 rounded-full border-2 border-[#BFDBFE] bg-white text-xs font-bold text-[#2563EB] flex items-center gap-1 active:scale-95 transition-transform">
          订单详情
          <Ic d={P.chevR} size={12} />
        </button>
      </div>
    </div>
  );
};

// ─── B: Tab Bar helper ───────────────────────────────────────────────────
const TabBarCB = ({ active, onHome, onMine, onScan }: { active: "home" | "mine"; onHome: () => void; onMine: () => void; onScan: () => void }) => {
  const tab = (key: "home" | "mine", label: string, d: string, fn: () => void) => {
    const on = active === key;
    return (
      <button key={key} onClick={fn} className="flex-1 flex flex-col items-center justify-center gap-1.5 pb-1 relative">
        <div className={`px-4 py-1.5 rounded-2xl flex items-center justify-center transition-all ${on ? "bg-[#EAF4FF]" : ""}`}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={on ? "#2563EB" : "#8A9BB4"} strokeWidth={on ? "2.25" : "1.75"} strokeLinecap="round" strokeLinejoin="round">
            <path d={d} />
          </svg>
        </div>
        <span className={`text-[10px] font-semibold ${on ? "text-[#2563EB]" : "text-[#8A9BB4]"}`}>{label}</span>
      </button>
    );
  };

  return (
    <div className="relative flex-shrink-0">
      <div className="relative flex bg-white h-[68px] border-t border-[#EEF4FB] shadow-[0_-2px_14px_0_rgba(16,35,63,0.07)]">
        {/* 凹槽：与页面底色同色的圆形挖空压住顶边，让扫码按钮“嵌”进导航栏而不是飘在上面 */}
        <span className="absolute left-1/2 -translate-x-1/2 -top-[36px] w-[88px] h-[88px] rounded-full bg-[#F4F8FD] border border-[#E4EDF7] shadow-[inset_0_3px_8px_0_rgba(37,99,235,0.10)]" />

        {tab("home", "首页", P.home, onHome)}
        <span className="flex-1" />
        {tab("mine", "我的", P.user, onMine)}

        {/* 中央扫码按钮 */}
        <button onClick={onScan}
          className={`absolute left-1/2 -translate-x-1/2 -top-[26px] z-10 w-[68px] h-[68px] rounded-full ${GRAD.btn} border-[5px] border-white flex items-center justify-center shadow-[0_10px_22px_-8px_rgba(37,99,235,0.6)] active:scale-95 transition-transform`}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
            <path d={P.scan} />
          </svg>
        </button>
        <span className="absolute left-1/2 -translate-x-1/2 bottom-[5px] z-10 text-[10px] font-bold text-[#2563EB] leading-none">扫码开门</span>
      </div>
    </div>
  );
};

// ─── B: Home ─────────────────────────────────────────────────────────────
const CB_Home = ({ onScan, onMine }: { onScan: () => void; onMine: () => void }) => (
  <div className="h-full flex flex-col">
    {/* Hero：闪购星渐变头 + 白底品牌砖 + 扫码入口 */}
    <div className={`${GRAD.hero} relative overflow-hidden flex-shrink-0 px-5 pt-4 pb-16`}>
      <div className={`absolute inset-0 ${GRAD.glow}`} />
      <div className="absolute -right-8 -top-10 w-36 h-36 rounded-full bg-white/10" />
      <div className="absolute right-20 top-16 w-12 h-12 rounded-full bg-white/10" />
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <BrandMark size={38} />
          <div>
            <div className="text-white text-xl font-bold leading-tight">闪购星·零食柜</div>
            <div className="text-white/80 text-xs mt-0.5">扫码开门 · 随取随付</div>
          </div>
        </div>
        <span className="text-[10px] font-bold text-white px-2 py-1 rounded-full bg-white/20">24h 自提</span>
      </div>
    </div>

    <div className="flex-1 overflow-y-auto -mt-10 rounded-t-[28px] bg-[#F4F8FD] pt-6 pb-12 relative">
      {/* 促销位：亮蓝渐变 + 白字，轮播指示 */}
      <div className="mx-4 mb-4 rounded-3xl overflow-hidden relative"
        style={{ height: 132, background: "linear-gradient(120deg,#2563EB 0%,#56A9FF 60%,#8CC6FF 100%)" }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(255,255,255,0.35)_0%,rgba(255,255,255,0)_60%)]" />
        <div className="absolute -right-6 -bottom-8 w-28 h-28 rounded-full bg-white/10" />
        <div className="relative h-full flex flex-col justify-center px-5">
          <span className="self-start text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/25 text-white mb-2">新人专享</span>
          <div className="text-white text-[19px] font-bold leading-tight">首单 9 折</div>
          <div className="text-white/85 text-xs mt-1">扫码开门即自动抵扣，无需领券</div>
          <div className="flex gap-1.5 mt-3">
            <div className="w-4 h-1.5 rounded-full bg-white" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/45" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/45" />
          </div>
        </div>
      </div>

      {/* 三步引导 */}
      <div className={`mx-4 mb-4 bg-white rounded-3xl px-4 py-4 flex items-center ${SHADOW.card}`}>
        {[['1', '扫码开门', P.qr], ['2', '自由取货', P.pkg], ['3', '关门扣款', P.wallet]].map(([n, t, d], i) => (
          <div key={t} className="flex-1 flex items-center">
            <div className="flex-1 flex flex-col items-center gap-1.5">
              <div className="w-10 h-10 rounded-2xl bg-[#EAF4FF] flex items-center justify-center">
                <Ic d={d} size={19} cls="text-[#2563EB]" />
              </div>
              <span className="text-[11px] font-semibold text-[#10233F]">{t}</span>
              <span className="text-[10px] text-[#8A9BB4] leading-none">步骤 {n}</span>
            </div>
            {i < 2 && <Ic d={P.chevR} size={14} cls="text-[#C2D2E5] flex-shrink-0 -mt-6" />}
          </div>
        ))}
      </div>

      {/* 扫码入口已收到底部 tab 中间的悬浮按钮，这里只留一句说明 */}
      <div className="px-4 flex items-center justify-center gap-1.5 text-[11px] text-[#8A9BB4]">
        <Ic d={P.info} size={13} cls="text-[#7CC0FF]" />
        底部中间「扫码开门」即可开柜，首次需完成信用免密授权
      </div>
    </div>

    <TabBarCB active="home" onHome={() => {}} onMine={onMine} onScan={onScan} />
  </div>
);

// ─── B: Products (door-open flow) ────────────────────────────────────────
const CB_Products = ({ onSettle, onBack }: { onSettle: () => void; onBack: () => void }) => {
  const [doorState, setDoorState] = useState<"idle" | "opening" | "open" | "closing">("idle");
  const [showModal, setShowModal] = useState(false);

  const PRODUCTS = [
    { name: "可口可乐", price: 4.5, emoji: "🥤", spec: "330ml" },
    { name: "乐事薯片", price: 7.5, emoji: "🍟", spec: "75g" },
    { name: "农夫山泉", price: 3.0, emoji: "💧", spec: "550ml" },
    { name: "元气森林", price: 6.0, emoji: "🫧", spec: "480ml" },
    { name: "旺旺雪饼", price: 8.0, emoji: "🍘", spec: "180g" },
    { name: "自热米饭", price: 25.9, emoji: "🍱", spec: "自热" },
    { name: "卫龙辣条", price: 5.5, emoji: "🌶️", spec: "100g" },
    { name: "康师傅冰红茶", price: 4.0, emoji: "🍵", spec: "550ml" },
  ];

  const handleAuth = () => {
    setShowModal(false);
    setDoorState("opening");
    setTimeout(() => setDoorState("open"), 1500);
  };

  // 模拟后端自动感应：开门停留 6s 后感应到关门 → 生成账单 → 自动跳转结算页
  useEffect(() => {
    if (doorState !== "open") return;
    const t = setTimeout(() => setDoorState("closing"), 6000);
    return () => clearTimeout(t);
  }, [doorState]);

  useEffect(() => {
    if (doorState !== "closing") return;
    const t = setTimeout(onSettle, 1800);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doorState]);

  return (
    <div className="h-full flex flex-col bg-[#F4F8FD] relative">
      {(doorState === "open" || doorState === "closing") && (
        <div className={`border-b px-4 py-2.5 flex items-center gap-2 flex-shrink-0 ${doorState === "open" ? "bg-[#E7FAF1] border-[#A6EBCB]" : "bg-[#EAF4FF] border-[#BFDBFE]"}`}>
          <div className={`w-2 h-2 rounded-full animate-pulse ${doorState === "open" ? "bg-[#12B76A]" : "bg-[#2563EB]"}`} />
          <span className={`text-sm font-semibold ${doorState === "open" ? "text-[#0E8A55]" : "text-[#1D4ED8]"}`}>
            {doorState === "open" ? "柜门已开启 · 取好商品关门后自动结算" : "已感应到柜门关闭 · 正在生成账单"}
          </span>
        </div>
      )}
      <NavBar title="商品" onBack={onBack} white />

      {/* Cabinet info banner */}
      <div className="mx-4 mt-2 mb-3 rounded-3xl overflow-hidden flex-shrink-0 relative"
        style={{ background: "linear-gradient(135deg,#1D4ED8 0%,#2563EB 55%,#56A9FF 100%)" }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_88%_20%,rgba(255,255,255,0.32)_0%,rgba(255,255,255,0)_60%)]" />
        <div className="relative px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <BrandMark size={30} />
            <div>
              <div className="text-white font-bold text-[15px] leading-tight">智柜 Pro X8</div>
              <div className="text-white/80 text-xs mt-0.5">科技园北楼1F · 50m</div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20">
            <span className="w-2 h-2 rounded-full bg-[#6EE7B7]" />
            <span className="text-white/90 text-[11px] font-semibold">营业中</span>
          </div>
        </div>
      </div>

      {/* Product grid */}
      <div className="flex-1 overflow-y-auto pb-24">
        <div className="grid grid-cols-2 gap-3 px-4">
          {PRODUCTS.map(p => (
            <div key={p.name} className={`bg-white rounded-3xl p-3 ${SHADOW.card}`}>
              <div className="rounded-2xl bg-[#EAF4FF] flex items-center justify-center mb-2.5" style={{ height: 84 }}>
                <span style={{ fontSize: 40, lineHeight: 1 }}>{p.emoji}</span>
              </div>
              <div className="text-[13px] font-bold text-[#10233F] text-center leading-tight">{p.name}</div>
              <div className="text-[10px] text-[#8A9BB4] text-center mt-0.5 mb-1.5">{p.spec}</div>
              <div className="text-center text-[17px] font-bold text-[#1D4ED8]">¥{p.price}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom button area */}
      <div className="bg-white border-t border-[#E4EDF7] px-4 py-3 flex-shrink-0">
        {doorState === "idle" && (
          <button onClick={() => setShowModal(true)}
            className="w-full h-14 rounded-2xl font-bold text-[16px] text-white flex items-center justify-center gap-2 active:scale-[0.98] transition-transform shadow-[0_6px_16px_-6px_rgba(37,99,235,0.38)]"
            style={{ background: "linear-gradient(135deg,#1D4ED8 0%,#2563EB 55%,#4E9BFF 100%)" }}>
            打开柜门购物
          </button>
        )}
        {doorState === "opening" && (
          <button disabled
            className="w-full h-14 rounded-2xl font-bold text-[16px] text-white flex items-center justify-center gap-2 opacity-80 shadow-[0_6px_16px_-6px_rgba(37,99,235,0.38)]"
            style={{ background: "linear-gradient(135deg,#1D4ED8 0%,#2563EB 55%,#4E9BFF 100%)" }}>
            <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeOpacity="0.3" /><path d="M21 12a9 9 0 00-9-9" />
            </svg>
            正在开门...
          </button>
        )}
        {doorState === "open" && (
          <button disabled
            className="w-full h-14 rounded-2xl font-bold text-[16px] flex items-center justify-center gap-2 bg-[#EEF4FB] text-[#8A9BB4] cursor-not-allowed">
            <span className="w-2 h-2 rounded-full animate-pulse bg-[#12B76A]" />
            门已开，请购物
          </button>
        )}
        {doorState === "closing" && (
          <button disabled
            className="w-full h-14 rounded-2xl font-bold text-[16px] flex items-center justify-center gap-2 bg-[#EEF4FB] text-[#8A9BB4] cursor-not-allowed">
            <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.5">
              <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeOpacity="0.3" /><path d="M21 12a9 9 0 00-9-9" />
            </svg>
            门已关，正在生成账单...
          </button>
        )}
      </div>

      {/* Auth modal overlay */}
      {showModal && (
        <div className="absolute inset-0 bg-black/40 flex items-end z-50">
          <div className="w-full bg-white rounded-t-[28px] px-5 pb-8 pt-5">
            <div className="w-10 h-1 rounded-full bg-[#E4EDF7] mx-auto mb-4" />
            <div className="text-[17px] font-bold text-[#10233F] mb-1">选择支付方式授权</div>
            <div className="text-sm text-[#5B6B84] mb-5">使用信用授权免密开门取货</div>
            <div className="space-y-3">
              <button onClick={handleAuth}
                className="w-full py-3.5 rounded-2xl font-semibold text-[15px] text-white flex items-center justify-center gap-2"
                style={{ background: "#07C160" }}>
                <span className="text-lg">💬</span>微信支付分
              </button>
              <button onClick={handleAuth}
                className="w-full py-3.5 rounded-2xl font-semibold text-[15px] text-white flex items-center justify-center gap-2"
                style={{ background: "#1677FF" }}>
                <span className="text-lg">🔵</span>支付宝信用
              </button>
            </div>
            <button onClick={() => setShowModal(false)} className="w-full mt-4 text-sm text-[#8A9BB4] text-center py-2">取消</button>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── B: Billing ──────────────────────────────────────────────────────────
const CB_Billing = ({ onHome }: { onHome: () => void }) => (
  <div className="h-full flex flex-col bg-white">
    <div className="flex justify-end px-4 pt-3 flex-shrink-0">
      <button onClick={onHome} className="w-9 h-9 flex items-center justify-center rounded-full bg-[#F4F8FD]">
        <Ic d={P.x} size={18} cls="text-[#5B6B84]" />
      </button>
    </div>
    <div className="flex-1 flex flex-col items-center justify-center px-8">
      {/* 成功图标：浅蓝光环 + 渐变实心圆 */}
      <div className="w-24 h-24 rounded-full bg-[#EAF4FF] flex items-center justify-center mb-5">
        <div className={`w-16 h-16 rounded-full ${GRAD.hero} flex items-center justify-center ${SHADOW.lift}`}>
          <Ic d={P.check} size={30} cls="text-white" />
        </div>
      </div>
      <div className="text-2xl font-bold text-[#10233F] mb-2 text-center">关门成功，请放心离开</div>
      <div className="text-sm text-[#8A9BB4] text-center mb-8 leading-relaxed">账单正在计算，预计 10 秒内推送</div>
      <div className="w-full bg-[#EAF4FF] rounded-full h-2 mb-5 overflow-hidden">
        <div className="h-full rounded-full animate-pulse" style={{ background: "linear-gradient(135deg,#1D4ED8 0%,#2563EB 55%,#4E9BFF 100%)", width: "60%" }} />
      </div>
      <div className="flex items-center gap-2 text-[11px] text-[#8A9BB4]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#12B76A]" />
        无需操作，扣款完成后会自动发通知
      </div>
    </div>
    <div className="px-4 pb-8 flex-shrink-0">
      <button onClick={onHome}
        className="w-full h-14 rounded-2xl font-bold text-[16px] text-white flex items-center justify-center active:scale-[0.98] transition-transform shadow-[0_6px_16px_-6px_rgba(37,99,235,0.38)]"
        style={{ background: "linear-gradient(135deg,#1D4ED8 0%,#2563EB 55%,#4E9BFF 100%)" }}>
        返回首页
      </button>
    </div>
  </div>
);

// ─── B: Mine ─────────────────────────────────────────────────────────────
const CB_Mine = ({ onOrders, onService, onTab, onScan }: { onOrders: (status: string) => void; onService: () => void; onTab: (t: string) => void; onScan: () => void }) => {
  const [tab, setTab] = useState("全部");
  return (
  <div className="h-full flex flex-col bg-[#F4F8FD]">
    {/* Profile hero */}
    <div className={`${GRAD.hero} relative overflow-hidden px-5 pt-4 pb-16 flex-shrink-0`}>
      <div className={`absolute inset-0 ${GRAD.glow}`} />
      <div className="absolute -right-8 -top-10 w-32 h-32 rounded-full bg-white/10" />
      <div className="relative flex items-center justify-between mb-5">
        <span className="text-white/85 text-[13px] font-semibold">我的</span>
        <BrandMark size={24} />
      </div>
      <div className="relative flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-[0_4px_14px_-4px_rgba(16,35,63,0.35)]">
          <span className="text-[#2563EB] text-xl font-bold">张</span>
        </div>
        <div>
          <div className="text-white text-lg font-bold">张**</div>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-white/80 text-xs">138****3301</span>
            <span className="text-[10px] font-bold text-[#1D4ED8] bg-white px-1.5 py-0.5 rounded-full">信用免密</span>
          </div>
        </div>
      </div>
    </div>

    <div className="flex-1 overflow-y-auto -mt-10 rounded-t-[28px] bg-[#F4F8FD] pt-6 pb-12 relative">
      {/* 消费概况 */}
      <div className={`mx-4 mb-3 bg-white rounded-3xl py-4 grid grid-cols-3 divide-x divide-[#EEF4FB] ${SHADOW.card}`}>
        {[['6', '本月订单'], ['¥128.4', '本月消费'], ['¥12.6', '已优惠']].map(([v, l]) => (
          <div key={l} className="text-center">
            <div className="text-lg font-bold text-[#1D4ED8] leading-none">{v}</div>
            <div className="text-[10px] text-[#8A9BB4] mt-1.5">{l}</div>
          </div>
        ))}
      </div>

      {/* 我的订单：状态 tab，选完直接进订单列表页对应筛选 */}
      <SecLabel title="我的订单" action={
        <button onClick={() => onOrders("全部")} className="flex items-center gap-0.5 text-xs font-medium text-[#8A9BB4] active:text-[#2563EB]">
          全部订单<Ic d={P.chevR} size={12} />
        </button>
      } />
      <div className={`mx-4 mb-3 bg-white rounded-3xl px-3 py-3 ${SHADOW.card}`}>
        <OrderStatusTabs active={tab} onChange={s => { setTab(s); onOrders(s); }} />
      </div>

      <Card p={false}>
        <button onClick={onService} className="w-full flex items-center gap-3 px-4 py-4">
          <div className="w-10 h-10 rounded-2xl bg-[#EAF4FF] flex items-center justify-center flex-shrink-0">
            <Ic d={P.service} size={18} cls="text-[#2563EB]" />
          </div>
          <span className="flex-1 text-[15px] text-[#10233F] text-left font-semibold">联系客服</span>
          <span className="text-[11px] text-[#8A9BB4] mr-1">9:00-18:00</span>
          <Ic d={P.chevR} size={14} cls="text-[#C2D2E5]" />
        </button>
      </Card>
    </div>

    <TabBarCB active="mine" onHome={() => onTab("home")} onMine={() => {}} onScan={onScan} />
  </div>
  );
};

// ─── B: Order Detail ─────────────────────────────────────────────────────
const CB_OrderDetail = ({ orderId, onBack, onRefund }: { orderId: string; onBack: () => void; onRefund: () => void }) => {
  const order = CB_ORDERS.find(o => o.id === orderId) ?? CB_ORDERS[0];
  return (
    <div className="h-full flex flex-col bg-[#F4F8FD]">
      <NavBar title="订单详情" onBack={onBack} white />
      <div className="flex-1 overflow-y-auto pb-24">
        {/* Status */}
        <div className="mx-4 mt-2 mb-3 rounded-3xl overflow-hidden shadow-[0_2px_12px_0_rgba(37,99,235,0.10)]">
          <div className="px-4 py-4 relative overflow-hidden" style={{ background: "linear-gradient(135deg,#1D4ED8 0%,#2563EB 55%,#56A9FF 100%)" }}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_88%_20%,rgba(255,255,255,0.3)_0%,rgba(255,255,255,0)_60%)]" />
            <div className="relative flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                {order.status === "已支付" ? <Ic d={P.checkC} size={22} cls="text-white" /> : <Ic d={P.refresh} size={22} cls="text-white" />}
              </div>
              <div>
                <div className="text-white font-bold text-[17px]">{order.status}</div>
                <div className="text-white/85 text-xs mt-0.5">{order.device}</div>
              </div>
            </div>
          </div>
          <div className="bg-white px-4">
            <KV label="订单编号" value={order.id} />
            <KV label="购买时间" value={order.time} />
            <KV label="支付金额" value={`¥${order.total.toFixed(1)}`} accent lg />
          </div>
        </div>

        <SecLabel title="商品明细" />
        <Card>
          {order.items.map(item => (
            <div key={item.name} className="flex items-center justify-between py-3 border-b border-[#EEF4FB] last:border-0">
              <div>
                <div className="text-[15px] font-medium text-[#10233F]">{item.name}</div>
                <div className="text-xs text-[#8A9BB4]">× {item.qty} 件</div>
              </div>
              <div className="text-right">
                <div className="text-[15px] font-bold text-[#10233F]">¥{(item.price * item.qty).toFixed(1)}</div>
                <div className="text-xs text-[#8A9BB4]">单价 ¥{item.price}</div>
              </div>
            </div>
          ))}
          <div className="flex justify-between py-3">
            <span className="text-sm text-[#5B6B84]">合计</span>
            <span className="text-xl font-bold" style={{ color: BRAND.primary }}>¥{order.total.toFixed(1)}</span>
          </div>
        </Card>

        {order.refund && (
          <>
            <SecLabel title="退款信息" />
            <Card>
              <KV label="退款金额" value={`¥${order.refund.amount}`} accent />
              <KV label="退款原因" value={order.refund.reason} />
              <KV label="退款状态" value={<Tag label={order.refund.status} color={statusColor(order.refund.status)} dot />} />
              <KV label="申请时间" value={order.refund.time} />
            </Card>
          </>
        )}
      </div>

      {order.status === "已支付" && !order.refund && (
        <div className="bg-white border-t border-[#E4EDF7] px-4 py-3 flex-shrink-0">
          <button onClick={onRefund}
            className="w-full h-12 bg-[#F4F8FD] border border-[#DCE6F2] rounded-2xl text-[15px] font-semibold text-[#5B6B84] flex items-center justify-center gap-2">
            <Ic d={P.refresh} size={16} />申请退款
          </button>
        </div>
      )}
    </div>
  );
};

// ─── B: Orders List ──────────────────────────────────────────────────────
const CB_Orders = ({ onDetail, onBack, initialStatus = "全部" }: { onDetail: (id: string) => void; onBack: () => void; initialStatus?: string }) => {
  const [tab, setTab] = useState(initialStatus);
  const list = tab === "全部" ? CB_ORDERS : CB_ORDERS.filter(o => o.status === tab);
  return (
    <div className="h-full flex flex-col bg-[#F4F8FD]">
      <NavBar title="我的订单" onBack={onBack} white />
      {/* 订单状态 tab */}
      <div className="bg-white border-b border-[#EEF4FB] px-4 py-2.5 flex-shrink-0">
        <OrderStatusTabs active={tab} onChange={setTab} />
      </div>
      <div className="flex-1 overflow-y-auto pb-5 pt-3">
        {list.length === 0 ? (
          <Empty icon="list" title="暂无该状态订单" desc="换个状态看看" />
        ) : (
          list.map(o => (
            <div key={o.id} className="mx-4 mb-3">
              <OrderCard o={o} onDetail={onDetail} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// ─── B: Refund Request ───────────────────────────────────────────────────
const CB_RefundRequest = ({ orderId, onBack, onSubmit }: { orderId: string; onBack: () => void; onSubmit: () => void }) => {
  const order = CB_ORDERS[0];
  const [selected, setSelected] = useState<number[]>([]);
  const [reason, setReason] = useState("");
  const [desc, setDesc] = useState("");
  const [photos, setPhotos] = useState(0);
  const REASONS = ["商品已过期", "商品质量问题", "商品与描述不符", "未取到商品", "重复扣款", "其他"];

  const total = order.items.filter((_, i) => selected.includes(i)).reduce((s, it) => s + it.price * it.qty, 0);

  return (
    <div className="h-full flex flex-col bg-[#F4F8FD]">
      <NavBar title="申请退款" onBack={onBack} white />
      <div className="flex-1 overflow-y-auto pb-28">
        {/* Select items */}
        <SecLabel title="选择退款商品" action={
          <button onClick={() => setSelected(order.items.map((_, i) => i))}
            className="text-xs font-semibold" style={{ color: BRAND.primary }}>全选</button>
        } />
        <Card p={false}>
          {order.items.map((item, i) => (
            <button key={i} onClick={() => setSelected(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i])}
              className="w-full flex items-center gap-3 px-4 py-4 border-b border-[#EEF4FB] last:border-0 text-left">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all
                ${selected.includes(i) ? "border-[#2563EB] bg-[#2563EB]" : "border-[#DCE6F2]"}`}>
                {selected.includes(i) && <Ic d={P.check} size={12} cls="text-white" />}
              </div>
              <div className="flex-1">
                <div className="text-[15px] font-medium text-[#10233F]">{item.name}</div>
                <div className="text-xs text-[#8A9BB4]">× {item.qty} 件</div>
              </div>
              <div className="text-[15px] font-bold text-[#10233F]">¥{(item.price * item.qty).toFixed(1)}</div>
            </button>
          ))}
        </Card>

        {/* Refund amount summary */}
        {selected.length > 0 && (
          <div className="mx-4 mb-3 px-4 py-3 rounded-2xl flex justify-between items-center"
            style={{ background: BRAND.light, border: `1px solid ${BRAND.mid}` }}>
            <span className="text-sm font-semibold" style={{ color: BRAND.dark }}>退款金额</span>
            <span className="text-xl font-bold" style={{ color: BRAND.primary }}>¥{total.toFixed(1)}</span>
          </div>
        )}

        {/* Reason */}
        <SecLabel title="退款原因" />
        <div className="px-4 mb-3">
          <div className="grid grid-cols-2 gap-2">
            {REASONS.map(r => (
              <button key={r} onClick={() => setReason(r)}
                className={`py-3 rounded-xl text-sm font-medium border-2 transition-all
                  ${reason === r ? "border-[#2563EB] text-[#2563EB] bg-[#EAF4FF]" : "border-[#E4EDF7] text-[#5B6B84] bg-white"}`}>
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <SecLabel title="问题描述" />
        <Card>
          <textarea value={desc} onChange={e => setDesc(e.target.value)} rows={4}
            placeholder="请描述具体问题，以便我们更好地处理（选填）"
            className="w-full text-sm text-[#10233F] placeholder-[#C2D2E5] outline-none resize-none py-2" />
          <div className="text-right text-xs text-[#C2D2E5] pb-2">{desc.length}/200</div>
        </Card>

        {/* Upload */}
        <SecLabel title="上传凭证" action={<span className="text-xs text-[#8A9BB4]">选填，最多4张</span>} />
        <Card>
          <div className="py-2">
            <div className="grid grid-cols-4 gap-2 mb-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <button key={i} onClick={() => setPhotos(p => Math.min(4, p + 1))}
                  className={`aspect-square rounded-xl flex flex-col items-center justify-center border-2 border-dashed transition-all
                    ${i < photos ? "border-[#2563EB] bg-[#EAF4FF]" : "border-[#DCE6F2] bg-[#EEF4FB]"}`}>
                  {i < photos ? (
                    <Ic d={P.image} size={18} cls="text-[#2563EB]" />
                  ) : i === photos ? (
                    <Ic d={P.plus} size={18} cls="text-[#C2D2E5]" />
                  ) : (
                    <div className="w-4 h-4 rounded border border-[#DCE6F2]" />
                  )}
                </button>
              ))}
            </div>
            <div className="text-xs text-[#8A9BB4]">支持拍摄商品、小票、包装等凭证</div>
          </div>
        </Card>
      </div>

      <div className="bg-white border-t border-[#E4EDF7] px-4 py-3 flex-shrink-0">
        <button onClick={onSubmit} disabled={selected.length === 0 || !reason}
          className="w-full h-14 rounded-2xl font-bold text-[16px] text-white transition-all flex items-center justify-center gap-2 active:scale-[0.98] shadow-[0_6px_16px_-6px_rgba(37,99,235,0.38)]"
          style={{ background: "linear-gradient(135deg,#1D4ED8 0%,#2563EB 55%,#4E9BFF 100%)", opacity: selected.length === 0 || !reason ? 0.5 : 1 }}>
          提交退款申请{selected.length > 0 && reason ? ` ¥${total.toFixed(1)}` : ""}
        </button>
        {(selected.length === 0 || !reason) && (
          <p className="text-center text-xs text-[#C2D2E5] mt-1.5">请选择退款商品和原因</p>
        )}
      </div>
    </div>
  );
};

// ─── B: Refund Progress ──────────────────────────────────────────────────
const CB_RefundProgress = ({ state, onBack }: { state: "pending" | "processing" | "done"; onBack: () => void }) => {
  const STATES = {
    pending: {
      color: "#B25E00", bg: "#FFF6E5", icon: P.clock, label: "退款申请已提交",
      desc: "您的退款申请已成功提交，正在等待审核",
      steps: [
        { label: "申请提交", done: true, time: "09-14 12:45", desc: "退款申请已提交，等待审核" },
        { label: "审核中", done: false, time: null, desc: "预计30分钟内完成审核" },
        { label: "退款到账", done: false, time: null, desc: "审核通过后原路退回" },
      ],
    },
    processing: {
      color: "#1D4ED8", bg: "#EAF4FF", icon: P.refresh, label: "退款审核中",
      desc: "审核人员正在处理您的退款申请，请耐心等待",
      steps: [
        { label: "申请提交", done: true, time: "09-12 09:30", desc: "退款申请已提交" },
        { label: "审核中", done: true, time: "09-12 09:45", desc: "客服正在核实退款信息" },
        { label: "退款到账", done: false, time: null, desc: "预计1-3个工作日退款到账" },
      ],
    },
    done: {
      color: "#0E8A55", bg: "#E7FAF1", icon: P.checkC, label: "退款成功",
      desc: "¥6.00 已退回至您的微信钱包",
      steps: [
        { label: "申请提交", done: true, time: "09-13 15:20", desc: "退款申请已提交" },
        { label: "审核通过", done: true, time: "09-13 15:35", desc: "审核完成，退款处理中" },
        { label: "退款到账", done: true, time: "09-13 16:40", desc: "¥6.00 已退回微信钱包" },
      ],
    },
  };

  const s = STATES[state];

  return (
    <div className="h-full flex flex-col bg-[#F4F8FD]">
      <NavBar title="退款进度" onBack={onBack} white />

      <div className="flex-1 overflow-y-auto pb-5">
        {/* Status hero */}
        <div className="mx-4 mt-2 mb-3 rounded-3xl overflow-hidden shadow-[0_2px_12px_0_rgba(37,99,235,0.10)]">
          <div className="px-5 py-5 flex items-center gap-4" style={{ background: s.bg }}>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: s.color + "20" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={s.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d={s.icon} />
              </svg>
            </div>
            <div>
              <div className="text-lg font-bold" style={{ color: s.color }}>{s.label}</div>
              <div className="text-sm text-[#5B6B84] mt-0.5 leading-relaxed">{s.desc}</div>
            </div>
          </div>
          <div className="bg-white px-4">
            <KV label="退款单号" value="REF-202509-441" />
            <KV label="退款金额" value={state === "done" ? "¥6.00" : "¥7.50"} accent />
            <KV label="退款原因" value={state === "done" ? "商品已过期" : "商品质量问题"} />
            <KV label="退款方式" value="微信钱包（原路退回）" />
          </div>
        </div>

        {/* Timeline */}
        <SecLabel title="处理进度" />
        <div className="mx-4 bg-white rounded-3xl px-5 py-5 shadow-[0_2px_12px_0_rgba(37,99,235,0.10)]">
          {s.steps.map((step, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 flex-shrink-0
                  ${step.done ? "border-[#2563EB] bg-[#2563EB]" : "border-[#DCE6F2] bg-white"}`}>
                  {step.done ? <Ic d={P.check} size={14} cls="text-white" /> : <span className="text-xs text-[#C2D2E5]">{i + 1}</span>}
                </div>
                {i < s.steps.length - 1 && (
                  <div className={`w-0.5 flex-1 my-1 ${step.done ? "bg-[#2563EB]" : "bg-[#E4EDF7]"}`} style={{ minHeight: 28 }} />
                )}
              </div>
              <div className="flex-1 pb-4">
                <div className="flex items-center justify-between mb-0.5">
                  <span className={`text-[15px] font-bold ${step.done ? "text-[#10233F]" : "text-[#8A9BB4]"}`}>{step.label}</span>
                  {step.time && <span className="text-xs text-[#8A9BB4]">{step.time}</span>}
                </div>
                <p className={`text-xs leading-relaxed ${step.done ? "text-[#5B6B84]" : "text-[#C2D2E5]"}`}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {state !== "done" && (
          <div className="mx-4 mt-2 bg-[#FFF6E5] border border-[#FFE1AE] rounded-2xl px-4 py-3 flex items-start gap-2 text-xs text-[#6B4423]">
            <Ic d={P.info} size={13} cls="flex-shrink-0 mt-0.5 text-[#F79009]" />
            退款一般在 1-3 个工作日内到账。如有疑问请联系客服。
          </div>
        )}
      </div>
    </div>
  );
};

// ─── B: No Orders ────────────────────────────────────────────────────────
const CB_NoOrders = ({ onBack }: { onBack: () => void }) => (
  <div className="h-full flex flex-col bg-[#F4F8FD]">
    <NavBar title="我的订单" onBack={onBack} white />
    <div className="flex-1 flex items-center justify-center">
      <Empty icon="list" title="暂无订单记录" desc="扫码开门取货后，订单将自动生成并显示在这里" action={
        <button className="px-8 h-11 rounded-2xl text-white text-sm font-semibold" style={{ background: "linear-gradient(135deg,#1D4ED8 0%,#2563EB 55%,#4E9BFF 100%)" }}>
          去扫码购物
        </button>
      } />
    </div>
  </div>
);

// ─── B: Customer Service ─────────────────────────────────────────────────
const CB_Service = ({ onBack }: { onBack: () => void }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const FAQS = [
    { q: "如何申请退款？", a: "在订单详情页点击「申请退款」，选择商品和原因后提交即可，1-3个工作日内退款到账。" },
    { q: "扣款异常怎么办？", a: "请截图扣款记录联系在线客服，我们将在1个工作日内核实并处理。" },
    { q: "商品质量有问题怎么处理？", a: "请拍照保留凭证，通过在线客服或电话联系我们，我们将优先为您处理退款。" },
    { q: "如何联系我们？", a: "您可以通过在线客服（响应 < 1分钟）或客服电话 400-888-9999（工作日9:00-18:00）联系我们。" },
  ];

  return (
    <div className="h-full flex flex-col bg-[#F4F8FD]">
      <NavBar title="联系客服" onBack={onBack} white />
      <div className="flex-1 overflow-y-auto pb-5">
        {/* Hero */}
        <div className="mx-4 mt-3 mb-3 rounded-2xl overflow-hidden">
          <div className="px-5 py-6 text-center" style={{ background: "linear-gradient(135deg,#1D4ED8 0%,#2563EB 55%,#56A9FF 100%)" }}>
            <div className="text-5xl mb-3">🎧</div>
            <div className="text-white text-lg font-bold">我们很乐意帮助你</div>
          </div>
        </div>

        {/* Online service */}
        <Card>
          <div className="py-3 flex items-start gap-3">
            <div className="text-2xl flex-shrink-0">💬</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[15px] font-semibold text-[#10233F]">在线客服</span>
                <Tag label="在线" color="green" dot />
              </div>
              <div className="text-xs text-[#8A9BB4] mb-3">平均响应 {"<"} 1分钟</div>
              <button className="px-4 h-9 rounded-xl text-sm font-semibold text-white" style={{ background: "linear-gradient(135deg,#1D4ED8 0%,#2563EB 55%,#4E9BFF 100%)" }}>
                立即咨询
              </button>
            </div>
          </div>
        </Card>

        {/* Phone */}
        <Card>
          <div className="py-3 flex items-start gap-3">
            <div className="text-2xl flex-shrink-0">📞</div>
            <div className="flex-1">
              <div className="text-[15px] font-semibold text-[#10233F] mb-0.5">客服电话</div>
              <div className="text-xl font-bold text-[#10233F] mb-0.5">400-888-9999</div>
              <div className="text-xs text-[#8A9BB4] mb-3">工作日 9:00-18:00</div>
              <button className="px-4 h-9 rounded-xl text-sm font-semibold border-2" style={{ color: BRAND.primary, borderColor: BRAND.mid }}>
                拨打电话
              </button>
            </div>
          </div>
        </Card>

        {/* FAQ expandable */}
        <SecLabel title="常见问题" />
        <Card p={false}>
          {FAQS.map((faq, i) => (
            <div key={i} className="border-b border-[#EEF4FB] last:border-0">
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center gap-3 px-4 py-4 text-left">
                <div className="w-6 h-6 rounded-full bg-[#EAF4FF] flex items-center justify-center flex-shrink-0">
                  <span className="text-[11px] font-bold text-[#2563EB]">Q</span>
                </div>
                <span className="flex-1 text-sm font-medium text-[#3A4B66]">{faq.q}</span>
                <Ic d={openFaq === i ? P.chevD : P.chevR} size={14} cls="text-[#C2D2E5] flex-shrink-0" />
              </button>
              {openFaq === i && (
                <div className="px-4 pb-4">
                  <div className="ml-9 text-xs text-[#5B6B84] leading-relaxed bg-[#F4F8FD] rounded-xl p-3">{faq.a}</div>
                </div>
              )}
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
};

// ─── Consumer App Orchestrator ────────────────────────────────────────────
type CBPage =
  | "home" | "products" | "billing"
  | "mine" | "orders" | "order-detail"
  | "refund-request" | "refund-pending" | "refund-processing" | "refund-done"
  | "service";

const CB_NAV: { section: string; label: string; page: CBPage }[] = [
  { section: "首页流程", label: "首页（扫码入口）", page: "home" },
  { section: "首页流程", label: "商品页（开门流程）", page: "products" },
  { section: "首页流程", label: "结算中", page: "billing" },
  { section: "我的", label: "我的", page: "mine" },
  { section: "我的", label: "我的订单", page: "orders" },
  { section: "我的", label: "订单详情", page: "order-detail" },
  { section: "我的", label: "申请退款", page: "refund-request" },
  { section: "我的", label: "退款进度·审核中", page: "refund-pending" },
  { section: "我的", label: "退款进度·处理中", page: "refund-processing" },
  { section: "我的", label: "退款进度·已完成", page: "refund-done" },
  { section: "我的", label: "联系客服", page: "service" },
];
// ══════════════════════════════════════════════════════════════════════════════
// 品牌标识（闪购星官方图形标，白底砖块承载）
// ══════════════════════════════════════════════════════════════════════════════
const BrandMark = ({ size = 32, cls = "" }: { size?: number; cls?: string }) => (
  <div className={`rounded-xl bg-white flex items-center justify-center flex-shrink-0 ${cls}`} style={{ width: size, height: size }}>
    <img src={brandMark} alt="闪购星" style={{ width: size * 0.7, height: size * 0.7, objectFit: "contain" }} />
  </div>
);

// ══════════════════════════════════════════════════════════════════════════════
// EXPORT：手机壳 + 右侧页面导航
// ══════════════════════════════════════════════════════════════════════════════
export const ConsumerMiniAppV2 = () => {
  const [cbPage, setCbPage] = useState<CBPage>("home");
  const [cbKey, setCbKey] = useState(0);
  const [orderId, setOrderId] = useState("ORD-202509-8821");
  const [ordersStatus, setOrdersStatus] = useState("全部");
  const navToCB = (p: CBPage) => { setCbPage(p); setCbKey(k => k + 1); };
  const sections_cb = [...new Set(CB_NAV.map(p => p.section))];

  const ConsumerAppControlled = () => {
    switch (cbPage) {
      case "products": return <CB_Products onSettle={() => setCbPage("billing")} onBack={() => setCbPage("home")} />;
      case "billing": return <CB_Billing onHome={() => setCbPage("home")} />;
      case "mine":
        return <CB_Mine onOrders={s => { setOrdersStatus(s); setCbPage("orders"); }} onService={() => setCbPage("service")} onTab={t => { if (t === "home") setCbPage("home"); }} onScan={() => setCbPage("products")} />;
      case "orders": return <CB_Orders initialStatus={ordersStatus} onDetail={id => { setOrderId(id); setCbPage("order-detail"); }} onBack={() => setCbPage("mine")} />;
      case "order-detail": return <CB_OrderDetail orderId={orderId} onBack={() => setCbPage("orders")} onRefund={() => setCbPage("refund-request")} />;
      case "refund-request": return <CB_RefundRequest orderId={orderId} onBack={() => setCbPage("order-detail")} onSubmit={() => setCbPage("refund-pending")} />;
      case "refund-pending": return <CB_RefundProgress state="pending" onBack={() => setCbPage("mine")} />;
      case "refund-processing": return <CB_RefundProgress state="processing" onBack={() => setCbPage("mine")} />;
      case "refund-done": return <CB_RefundProgress state="done" onBack={() => setCbPage("mine")} />;
      case "service": return <CB_Service onBack={() => setCbPage("mine")} />;
      default: return <CB_Home onScan={() => setCbPage("products")} onMine={() => setCbPage("mine")} />;
    }
  };

  return (
    <div className="flex gap-6 items-start">
      <div className="flex-shrink-0 relative">
        <div className="w-[375px] rounded-[52px] bg-[#1C1C1E] p-[10px] shadow-2xl">
          <div className="bg-black h-10 rounded-t-[44px] flex items-center justify-center">
            <div className="w-24 h-7 bg-black rounded-full border border-[#2A2A2E]" />
          </div>
          <div className="bg-white relative overflow-hidden" style={{ height: 700 }}>
            <StatusBar />
            <div className="absolute inset-0 top-[28px] flex flex-col overflow-hidden">
              <ConsumerAppControlled key={cbKey} />
            </div>
          </div>
          <div className="bg-black h-8 rounded-b-[44px] flex items-center justify-center">
            <div className="w-28 h-1 bg-white/20 rounded-full" />
          </div>
        </div>
        <div className="absolute -left-[13px] top-[96px] w-[13px] h-8 bg-[#2A2A2E] rounded-l-full" />
        <div className="absolute -left-[13px] top-[144px] w-[13px] h-12 bg-[#2A2A2E] rounded-l-full" />
        <div className="absolute -left-[13px] top-[208px] w-[13px] h-12 bg-[#2A2A2E] rounded-l-full" />
        <div className="absolute -right-[13px] top-[128px] w-[13px] h-16 bg-[#2A2A2E] rounded-r-full" />
        <div className="mt-4 text-center">
          <span className={`px-4 py-1.5 rounded-full text-xs font-bold text-white ${GRAD.hero}`}>消费者小程序 V2</span>
        </div>
      </div>

      <div className="w-56 flex-shrink-0 pt-2 sticky top-0 max-h-screen overflow-y-auto pb-8">
        <div className="flex items-center gap-2 mb-3">
          <BrandMark size={24} />
          <div className="text-[11px] font-bold text-[#10233F] leading-tight">
            消费者小程序 V2
            <div className="text-[10px] text-[#8A9BB4] font-normal">闪购星蓝主题</div>
          </div>
        </div>
        <div className="flex gap-1 mb-4">
          {["#1D4ED8", "#2563EB", "#56A9FF", "#7CC0FF", "#A5DCFF", "#EAF4FF"].map(c => (
            <span key={c} className="flex-1 h-4 rounded" style={{ background: c }} title={c} />
          ))}
        </div>
        {sections_cb.map(sec => (
          <div key={sec} className="mb-4">
            <div className="text-[10px] font-bold text-[#C2D2E5] uppercase tracking-wider mb-1.5 px-1">{sec}</div>
            {CB_NAV.filter(p => p.section === sec).map(p => (
              <button key={p.page} onClick={() => navToCB(p.page)}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-[11px] leading-snug transition-all mb-0.5
                  ${cbPage === p.page ? "font-bold border" : "text-[#5B6B84] hover:bg-[#F4F8FD] hover:text-[#3A4B66]"}`}
                style={cbPage === p.page ? { background: "#EAF4FF", color: "#1D4ED8", borderColor: "#BFDBFE" } : undefined}>
                {p.label}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
