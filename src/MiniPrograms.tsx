import { useState, ReactNode } from "react";

// ─── Shared Brand & Primitives ────────────────────────────────────────────
const BRAND    = { primary: "#0D9488", light: "#F0FDFA", mid: "#99F6E4", dark: "#0F766E" };
const CA_BRAND = { primary: "#56A9FF", light: "#EFF6FF", mid: "#BFDBFE", dark: "#1D4ED8" };

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

const TAG_CLS: Record<BC, string> = {
  teal:   "bg-[#F0FDFA] text-[#0F766E] border border-[#99F6E4]",
  blue:   "bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE]",
  green:  "bg-[#F0FDF4] text-[#15803D] border border-[#BBF7D0]",
  yellow: "bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A]",
  red:    "bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA]",
  gray:   "bg-[#F8FAFC] text-[#64748B] border border-[#E2E8F0]",
  orange: "bg-[#FFF7ED] text-[#C2410C] border border-[#FED7AA]",
  purple: "bg-[#F5F3FF] text-[#6D28D9] border border-[#DDD6FE]",
};

const statusColor = (s: string): BC => ({
  "在售": "teal", "售罄": "gray", "即将售罄": "yellow",
  "待发货": "yellow", "运输中": "blue", "已送达": "green", "待处理": "yellow",
  "已完成": "green", "待付款": "orange", "已支付": "green", "已退款": "teal",
  "退款中": "blue", "退款失败": "red", "部分退款": "purple",
  "已关闭": "gray",
}[s] ?? "gray") as BC;

// ─── Shared Shell Components ──────────────────────────────────────────────
const StatusBar = ({ dark = false }: { dark?: boolean }) => (
  <div className={`flex justify-between items-center px-6 py-2 text-xs font-semibold flex-shrink-0 ${dark ? "text-white bg-transparent" : "text-[#0F172A] bg-white"}`}>
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
  <div className={`flex items-center h-11 px-4 flex-shrink-0 ${transparent ? "bg-transparent" : white ? "bg-white border-b border-[#F1F5F9]" : "bg-white border-b border-[#F1F5F9]"}`}>
    {onBack && (
      <button onClick={onBack} className={`w-9 h-9 -ml-1 flex items-center justify-center rounded-full ${transparent ? "bg-white/20" : ""}`}>
        <Ic d={P.chevL} size={20} cls={transparent ? "text-white" : "text-[#0F172A]"} />
      </button>
    )}
    <span className={`flex-1 text-[17px] font-bold text-center ${onBack ? "mr-9" : ""} ${transparent ? "text-white" : "text-[#0F172A]"}`}>{title}</span>
    {rightEl}
  </div>
);

const Chip = ({ label, active, onClick, color }: { label: string; active: boolean; onClick: () => void; color?: string }) => (
  <button onClick={onClick}
    className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all
      ${active ? "text-white" : "bg-[#F1F5F9] text-[#64748B]"}`}
    style={active ? { background: color ?? BRAND.primary } : undefined}>
    {label}
  </button>
);

const Tag = ({ label, color, dot }: { label: string; color: BC; dot?: boolean }) => (
  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${TAG_CLS[color]}`}>
    {dot && <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />}
    {label}
  </span>
);

const Divider = () => <div className="h-px bg-[#F8FAFC] mx-4" />;

const KV = ({ label, value, accent = false, lg = false }: { label: string; value: ReactNode; accent?: boolean; lg?: boolean }) => (
  <div className="flex items-center justify-between py-3 border-b border-[#F8FAFC] last:border-0">
    <span className="text-sm text-[#94A3B8]">{label}</span>
    <span className={`${lg ? "text-base font-bold" : "text-sm font-medium"} ${accent ? "text-[#0D9488]" : "text-[#0F172A]"}`}>{value}</span>
  </div>
);

const Card = ({ children, cls = "", p = true }: { children: ReactNode; cls?: string; p?: boolean }) => (
  <div className={`bg-white rounded-2xl mx-4 mb-3 overflow-hidden shadow-[0_1px_6px_0_rgba(15,23,42,0.06)] ${p ? "px-4" : ""} ${cls}`}>
    {children}
  </div>
);

const SecLabel = ({ title, action }: { title: string; action?: ReactNode }) => (
  <div className="flex items-center justify-between px-4 pt-4 pb-2">
    <span className="text-xs font-bold text-[#94A3B8] uppercase tracking-wide">{title}</span>
    {action}
  </div>
);

const Empty = ({ icon, title, desc, action }: { icon: string; title: string; desc?: string; action?: ReactNode }) => (
  <div className="flex flex-col items-center py-14 px-8 text-center">
    <div className="w-16 h-16 rounded-3xl bg-[#F0FDFA] flex items-center justify-center mb-4">
      <Ic d={P[icon]} size={28} cls="text-[#99F6E4]" />
    </div>
    <div className="text-base font-bold text-[#334155] mb-1">{title}</div>
    {desc && <p className="text-sm text-[#94A3B8] leading-relaxed mb-5">{desc}</p>}
    {action}
  </div>
);

// ══════════════════════════════════════════════════════════════════════════════
// ■ CUSTOMER APP (A)
// ══════════════════════════════════════════════════════════════════════════════

// ─── Mock Data ───────────────────────────────────────────────────────────
const CA_PRODUCTS = [
  { id: 1, name: "可口可乐 330ml", cat: "饮料", price: 4.5, stock: 48, status: "在售", sold: 312 },
  { id: 2, name: "百事可乐 500ml", cat: "饮料", price: 5.0, stock: 36, status: "在售", sold: 245 },
  { id: 3, name: "农夫山泉 550ml", cat: "饮料", price: 3.0, stock: 60, status: "在售", sold: 420 },
  { id: 4, name: "元气森林气泡水", cat: "饮料", price: 6.0, stock: 24, status: "在售", sold: 188 },
  { id: 5, name: "乐事薯片 75g", cat: "零食", price: 7.5, stock: 32, status: "在售", sold: 156 },
  { id: 6, name: "旺旺雪饼 180g", cat: "零食", price: 8.0, stock: 4, status: "即将售罄", sold: 98 },
  { id: 7, name: "自热米饭红烧牛肉", cat: "正餐", price: 25.9, stock: 0, status: "售罄", sold: 67 },
  { id: 8, name: "卫龙辣条 100g", cat: "零食", price: 5.5, stock: 20, status: "在售", sold: 134 },
  { id: 9, name: "康师傅冰红茶 550ml", cat: "饮料", price: 4.0, stock: 42, status: "在售", sold: 201 },
  { id: 10, name: "达利园法式面包", cat: "烘焙", price: 6.5, stock: 12, status: "在售", sold: 89 },
];

const CA_DELIVERIES = [
  {
    id: "FF-2509-031", type: "补货配送", status: "已送达", driver: "张伟", items: 480, created: "09-14 08:00",
    goods: [
      { name: "可口可乐 330ml", qty: 120 },
      { name: "农夫山泉 550ml", qty: 180 },
      { name: "乐事薯片 75g", qty: 96 },
      { name: "元气森林气泡水", qty: 84 },
    ],
    timeline: [
      { label: "已取货", time: "09-14 09:15", done: true, desc: "仓库已出库，分拣打包完成" },
      { label: "运输中", time: "09-14 10:30", done: true, desc: "配送员张伟已取货，正在前往点位" },
      { label: "已送达", time: "09-14 12:05", done: true, desc: "补货完成，480件商品已上架" },
    ],
  },
  {
    id: "FF-2509-028", type: "补货配送", status: "运输中", driver: "李强", items: 240, created: "09-14 13:00",
    goods: [
      { name: "百事可乐 500ml", qty: 96 },
      { name: "康师傅冰红茶 550ml", qty: 144 },
    ],
    timeline: [
      { label: "已取货", time: "09-14 14:20", done: true, desc: "仓库出库完成" },
      { label: "运输中", time: "09-14 15:00", done: true, desc: "配送员李强已出发，预计 16:30 送达" },
      { label: "已送达", time: undefined, done: false, desc: "预计 16:30 送达" },
    ],
  },
  {
    id: "FF-2509-025", type: "补货配送", status: "已取货", driver: "王磊", items: 360, created: "09-14 16:00",
    goods: [
      { name: "旺旺雪饼 180g", qty: 120 },
      { name: "达利园法式面包", qty: 96 },
      { name: "卫龙辣条 100g", qty: 144 },
    ],
    timeline: [
      { label: "已取货", time: "09-14 16:45", done: true, desc: "仓库出库完成，配送员王磊已取货" },
      { label: "运输中", time: undefined, done: false, desc: "配送员正在前往点位" },
      { label: "已送达", time: undefined, done: false, desc: "—" },
    ],
  },
];

// ─── A: Shared Tab Bar ───────────────────────────────────────────────────
const CA_TabBar = ({ active, onTab }: { active: "home" | "delivery" | "mine"; onTab: (t: "home" | "delivery" | "mine") => void }) => (
  <div className="flex border-t border-[#F1F5F9] bg-white h-[52px] flex-shrink-0">
    {(["home", "delivery", "mine"] as const).map((k) => {
      const label = k === "home" ? "首页" : k === "delivery" ? "履约" : "我的";
      const icon = k === "home" ? P.home : k === "delivery" ? P.truck : P.user;
      const isActive = active === k;
      return (
        <button key={k} onClick={() => onTab(k)}
          className={`flex-1 flex flex-col items-center justify-center gap-0.5 ${isActive ? "text-[#56A9FF]" : "text-[#94A3B8]"}`}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth={isActive ? "2.25" : "1.75"} strokeLinecap="round" strokeLinejoin="round">
            <path d={icon} />
          </svg>
          <span className={`text-[10px] font-semibold ${isActive ? "text-[#56A9FF]" : ""}`}>{label}</span>
        </button>
      );
    })}
  </div>
);

// ─── A: Home ─────────────────────────────────────────────────────────────
const CA_Home = ({ onDelivery, onTab }: { onDelivery: () => void; onTab: (t: string) => void }) => {
  const [cat, setCat] = useState("全部");
  const [q, setQ] = useState("");
  const CATS = ["全部", "饮料", "零食", "正餐", "烘焙"];
  const filtered = CA_PRODUCTS.filter(p =>
    (cat === "全部" || p.cat === cat) && (!q || p.name.includes(q))
  );

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-white flex-shrink-0">
        <NavBar title="在售商品" rightEl={
          <button onClick={onDelivery} className="w-9 h-9 flex items-center justify-center mr-1 relative">
            <Ic d={P.truck} size={18} cls="text-[#56A9FF]" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#56A9FF] rounded-full" />
          </button>
        } />
        {/* Location strip */}
        <div className="px-4 pb-2 flex items-center gap-2 text-xs text-[#64748B]">
          <Ic d={P.pin} size={12} cls="text-[#56A9FF]" />
          <span>蜂巢·科技园北楼1F</span>
          <span className="text-[#CBD5E1]">·</span>
          <span className="text-[#56A9FF] font-semibold">共 {CA_PRODUCTS.length} 种商品在售</span>
        </div>
        {/* Search */}
        <div className="px-4 pb-3">
          <div className="flex items-center bg-[#EFF6FF] rounded-xl px-3 h-10 gap-2 border border-[#BFDBFE]">
            <Ic d={P.search} size={15} cls="text-[#56A9FF]" />
            <input value={q} onChange={e => setQ(e.target.value)}
              placeholder="搜索商品名称" className="flex-1 text-sm bg-transparent outline-none placeholder-[#BFDBFE] text-[#0F172A]" />
          </div>
        </div>
        {/* Category chips */}
        <div className="flex gap-2 px-4 pb-3 overflow-x-auto">
          {CATS.map(c => <Chip key={c} label={c} active={cat === c} onClick={() => setCat(c)} color="#56A9FF" />)}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-[#F0F4FF]">

        {filtered.length === 0 ? <Empty icon="search" title="没有找到相关商品" /> : (
          <div className="pb-4">
            {filtered.map(p => (
              <div key={p.id} className="bg-white mx-4 mb-2 rounded-2xl px-4 py-3.5 flex items-center gap-3 shadow-[0_1px_4px_0_rgba(15,23,42,0.05)]">
                {/* Product color block */}
                <div className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center"
                  style={{ background: p.status === "售罄" ? "#F1F5F9" : "#EFF6FF" }}>
                  <Ic d={P.pkg} size={22} cls={p.status === "售罄" ? "text-[#CBD5E1]" : "text-[#56A9FF]"} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`text-[15px] font-semibold mb-0.5 ${p.status === "售罄" ? "text-[#94A3B8]" : "text-[#0F172A]"}`}>{p.name}</div>
                  <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
                    <Tag label={p.cat} color="gray" />
                    <span>本月售 {p.sold} 件</span>
                  </div>
                </div>
                <div className="flex-shrink-0 text-right">
                  <div className="text-base font-bold text-[#0F172A]">¥{p.price.toFixed(1)}</div>
                  <Tag label={p.status} color={statusColor(p.status)} dot />
                  <div className="text-[10px] text-[#94A3B8] mt-1">库存 {p.stock}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <CA_TabBar active="home" onTab={t => t === "delivery" ? onDelivery() : onTab(t)} />
    </div>
  );
};

// ─── A: Fulfillment Tracking ──────────────────────────────────────────────
const DELIVERY_TABS = ["全部", "已取货", "运输中", "已送达"] as const;

const CA_FulfillmentDetail = ({ d, onBack }: { d: typeof CA_DELIVERIES[0]; onBack: () => void }) => {
  const activeIdx = d.timeline.findIndex(x => !x.done);
  return (
    <div className="h-full flex flex-col bg-[#F0F4FF]">
      <div className="bg-white flex-shrink-0">
        <NavBar title="配送详情" onBack={onBack} />
      </div>
      <div className="flex-1 overflow-y-auto pb-6">
        {/* 基础信息 */}
        <Card cls="mt-3">
          <div className="py-1">
            <KV label="配送单号" value={<span className="font-mono text-xs font-semibold text-[#0F172A]">{d.id}</span>} />
            <KV label="配送类型" value={d.type} />
            <KV label="配送人" value={d.driver} />
            <KV label="配送状态" value={<Tag label={d.status} color={statusColor(d.status)} dot />} />
            <KV label="商品数量" value={`${d.items} 件`} />
          </div>
        </Card>

        {/* 商品明细 */}
        <SecLabel title="商品明细" />
        <div className="mx-4 bg-white rounded-2xl overflow-hidden shadow-[0_1px_6px_0_rgba(15,23,42,0.06)]">
          {d.goods.map((g, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-3 border-b border-[#F8FAFC] last:border-0">
              <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] flex items-center justify-center flex-shrink-0">
                <Ic d={P.pkg} size={18} cls="text-[#56A9FF]" />
              </div>
              <div className="flex-1 text-[13px] font-medium text-[#0F172A]">{g.name}</div>
              <div className="text-sm font-semibold text-[#56A9FF]">{g.qty} 件</div>
            </div>
          ))}
        </div>

        {/* 配送时间线 */}
        <SecLabel title="配送时间线" />
        <div className="mx-4 bg-white rounded-2xl px-5 py-4 shadow-[0_1px_6px_0_rgba(15,23,42,0.06)]">
          {d.timeline.map((step, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 flex-shrink-0 z-10
                  ${step.done ? "border-[#56A9FF] bg-[#56A9FF]" : i === activeIdx ? "border-[#56A9FF] bg-white" : "border-[#E2E8F0] bg-white"}`}>
                  {step.done
                    ? <Ic d={P.check} size={16} cls="text-white" />
                    : <span className={`text-sm font-bold ${i === activeIdx ? "text-[#56A9FF]" : "text-[#CBD5E1]"}`}>{i + 1}</span>}
                </div>
                {i < d.timeline.length - 1 && (
                  <div className={`w-0.5 flex-1 my-1 ${step.done ? "bg-[#56A9FF]" : "bg-[#F1F5F9]"}`} style={{ minHeight: 32 }} />
                )}
              </div>
              <div className="flex-1 pb-5">
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[15px] font-bold ${step.done ? "text-[#0F172A]" : "text-[#94A3B8]"}`}>{step.label}</span>
                  {step.time && <span className="text-xs text-[#94A3B8]">{step.time}</span>}
                </div>
                <p className={`text-xs leading-relaxed ${step.done ? "text-[#64748B]" : "text-[#CBD5E1]"}`}>{step.desc}</p>
                {!step.done && i === activeIdx && (
                  <div className="mt-1.5 flex items-center gap-1 text-xs text-[#56A9FF] font-semibold">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#56A9FF] animate-pulse" />
                    处理中...
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CA_Fulfillment = ({ onBack, onTab }: { onBack: () => void; onTab: (t: "home" | "delivery" | "mine") => void }) => {
  const [tab, setTab] = useState<typeof DELIVERY_TABS[number]>("全部");
  const [detail, setDetail] = useState<typeof CA_DELIVERIES[0] | null>(null);

  if (detail) return <CA_FulfillmentDetail d={detail} onBack={() => setDetail(null)} />;

  const filtered = tab === "全部" ? CA_DELIVERIES : CA_DELIVERIES.filter(d => d.status === tab);

  return (
    <div className="h-full flex flex-col bg-[#F0F4FF]">
      <div className="bg-white flex-shrink-0">
        <NavBar title="履约进度" onBack={onBack} />
        {/* Tabs */}
        <div className="flex border-b border-[#F1F5F9]">
          {DELIVERY_TABS.map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`flex-1 py-2.5 text-xs font-semibold transition-all relative ${tab === t ? "text-[#56A9FF]" : "text-[#94A3B8]"}`}>
              {t}
              {tab === t && <div className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-[#56A9FF] rounded-full" />}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pt-3 pb-5">
        {filtered.length === 0 && (
          <div className="flex items-center justify-center h-40 text-sm text-[#94A3B8]">暂无配送单</div>
        )}
        {filtered.map(d => (
          <div key={d.id} onClick={() => setDetail(d)}
            className="bg-white mx-4 mb-3 rounded-2xl px-4 py-3.5 shadow-[0_1px_6px_0_rgba(15,23,42,0.06)] active:bg-[#F8FAFC] cursor-pointer">
            {/* 单号 + 状态 */}
            <div className="flex items-center justify-between mb-2.5">
              <span className="font-mono text-[13px] font-semibold text-[#0F172A]">{d.id}</span>
              <Tag label={d.status} color={statusColor(d.status)} dot />
            </div>
            {/* 字段行 */}
            <div className="space-y-1.5 text-xs text-[#64748B]">
              <div className="flex justify-between">
                <span>配送类型</span><span className="text-[#334155] font-medium">{d.type}</span>
              </div>
              <div className="flex justify-between">
                <span>配送人</span><span className="text-[#334155] font-medium">{d.driver}</span>
              </div>
              <div className="flex justify-between">
                <span>商品数量</span><span className="text-[#56A9FF] font-semibold">{d.items} 件</span>
              </div>
            </div>
            {/* 进入详情提示 */}
            <div className="flex justify-end mt-2.5 pt-2.5 border-t border-[#F8FAFC]">
              <span className="text-xs text-[#56A9FF] flex items-center gap-0.5 font-medium">
                查看详情 <Ic d={P.chevR} size={12} cls="text-[#56A9FF]" />
              </span>
            </div>
          </div>
        ))}
      </div>
      <CA_TabBar active="delivery" onTab={onTab} />
    </div>
  );
};

// ─── A: Mine – Account Info Detail ───────────────────────────────────────
const CA_AccountInfo = ({ onBack }: { onBack: () => void }) => (
  <div className="h-full flex flex-col bg-[#F0F4FF]">
    <div className="bg-white flex-shrink-0">
      <NavBar title="账号信息" onBack={onBack} />
    </div>
    <div className="flex-1 overflow-y-auto pb-6">
      {/* Avatar */}
      <div className="flex flex-col items-center py-8">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mb-3 shadow-lg"
          style={{ background: CA_BRAND.primary }}>
          <span className="text-white text-3xl font-bold">蜂</span>
        </div>
        <div className="text-lg font-bold text-[#0F172A]">蜂巢智能科技</div>
        <div className="mt-1"><Tag label="战略合作" color="blue" /></div>
      </div>

      <Card>
        <KV label="联系人" value="张主任" />
        <KV label="手机号" value="138-8888-0001" />
        <KV label="邮箱" value="zhang@fengchao.com" />
        <KV label="注册时间" value="2023-01-15" />
        <KV label="账号类型" value="客户账号" />
      </Card>
    </div>
  </div>
);

// ─── A: Mine ─────────────────────────────────────────────────────────────
const CA_SITES = [
  { id: "SITE-SZ-088", name: "蜂巢·科技园北楼1F",  type: "写字楼大堂", device: "DEV-2025-0042", items: CA_PRODUCTS.length, contract: "至 2026-12-31" },
  { id: "SITE-SZ-045", name: "皇庭广场1F-A5",        type: "购物中心",   device: "DEV-2025-0045", items: 8,                  contract: "至 2026-06-30" },
  { id: "SITE-SZ-031", name: "万象城地下广场B2-C08", type: "购物中心",   device: "DEV-2025-0031", items: 12,                 contract: "至 2027-01-15" },
];

const CA_SiteList = ({ onBack }: { onBack: () => void }) => (
  <div className="h-full flex flex-col bg-[#F0F4FF]">
    <div className="bg-white flex-shrink-0">
      <NavBar title="点位列表" onBack={onBack} />
    </div>
    <div className="flex-1 overflow-y-auto pt-3 pb-6">
      {CA_SITES.map(s => (
        <div key={s.id} className="bg-white mx-4 mb-3 rounded-2xl px-4 py-4 shadow-[0_1px_6px_0_rgba(15,23,42,0.06)]">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-[#EFF6FF] flex items-center justify-center flex-shrink-0">
              <Ic d={P.pin} size={16} cls="text-[#56A9FF]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[15px] font-bold text-[#0F172A] leading-snug">{s.name}</div>
              <div className="text-xs text-[#94A3B8] mt-0.5">{s.type}</div>
            </div>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#EFF6FF] text-[#56A9FF]">{s.id}</span>
          </div>
          <div className="space-y-1.5 text-xs text-[#64748B] border-t border-[#F8FAFC] pt-3">
            <div className="flex justify-between"><span>设备编号</span><span className="font-mono text-[#334155]">{s.device}</span></div>
            <div className="flex justify-between"><span>在售商品</span><span className="text-[#56A9FF] font-semibold">{s.items} 种</span></div>
            <div className="flex justify-between"><span>合同有效期</span><span className="text-[#334155]">{s.contract}</span></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const CA_Mine = ({ onBack, onTab }: { onBack: () => void; onTab: (t: "home" | "delivery" | "mine") => void }) => {
  const [showAccount, setShowAccount] = useState(false);
  const [showSites,   setShowSites]   = useState(false);
  if (showAccount) return <CA_AccountInfo onBack={() => setShowAccount(false)} />;
  if (showSites)   return <CA_SiteList   onBack={() => setShowSites(false)} />;

  return (
    <div className="h-full flex flex-col bg-[#F0F4FF]">
      <div className="bg-white flex-shrink-0">
        <NavBar title="我的" onBack={onBack} />
      </div>
      <div className="flex-1 overflow-y-auto pb-6">
        {/* Profile header — clickable */}
        <div onClick={() => setShowAccount(true)}
          className="bg-white mx-4 mt-3 mb-3 rounded-2xl px-4 py-5 flex items-center gap-4 shadow-[0_1px_6px_0_rgba(15,23,42,0.06)] active:bg-[#F8FAFC] cursor-pointer">
          <div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: CA_BRAND.primary }}>
            <span className="text-white text-xl font-bold">蜂</span>
          </div>
          <div className="flex-1">
            <div className="text-lg font-bold text-[#0F172A]">蜂巢智能科技</div>
            <div className="text-sm text-[#94A3B8] mt-0.5">客户账号</div>
            <div className="flex items-center gap-1 mt-1">
              <Tag label="战略合作" color="blue" />
            </div>
          </div>
          <Ic d={P.chevR} size={16} cls="text-[#CBD5E1]" />
        </div>

        <SecLabel title="功能" />
        <Card p={false}>
          {[
            { icon: "pin",   label: "点位列表", onClick: () => setShowSites(true) },
            { icon: "phone", label: "联系我们",  onClick: undefined },
          ].map((item, i) => (
            <div key={i} onClick={item.onClick}
              className="flex items-center gap-3 px-4 py-4 border-b border-[#F8FAFC] last:border-0 cursor-pointer active:bg-[#F8FAFC]">
              <div className="w-8 h-8 rounded-xl bg-[#EFF6FF] flex items-center justify-center flex-shrink-0">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#56A9FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={P[item.icon]} />
                </svg>
              </div>
              <span className="flex-1 text-[15px] text-[#0F172A]">{item.label}</span>
              <Ic d={P.chevR} size={14} cls="text-[#CBD5E1]" />
            </div>
          ))}
        </Card>

        <div className="px-4 mt-1">
          <button className="w-full h-12 bg-white rounded-2xl text-[15px] font-semibold text-[#DC2626] flex items-center justify-center gap-2 shadow-[0_1px_6px_0_rgba(15,23,42,0.06)]">
            <Ic d={P.logOut} size={16} />退出登录
          </button>
        </div>
      </div>
      <CA_TabBar active="mine" onTab={onTab} />
    </div>
  );
};

// ─── Customer App Orchestrator ────────────────────────────────────────────
type CAPage = "home" | "fulfillment" | "mine" | "home-empty";

const CustomerApp = () => {
  const [page, setPage] = useState<CAPage>("home");
  const [showEmpty, setShowEmpty] = useState(false);

  const renderPage = () => {
    switch (page) {
      case "home-empty":
        return (
          <div className="h-full flex flex-col bg-[#F0F4FF]">
            <div className="bg-white flex-shrink-0">
              <NavBar title="在售商品" />
              <div className="px-4 pb-3 flex items-center gap-2 text-xs text-[#94A3B8]">
                <Ic d={P.pin} size={12} cls="text-[#56A9FF]" />光明新城购物中心3F
              </div>
            </div>
            <div className="flex-1 bg-[#F0F4FF] flex items-center justify-center">
              <Empty icon="pkg" title="暂无在售商品" desc="当前点位商品正在补货中，稍后再来看看" />
            </div>
          </div>
        );
      case "home":
        return <CA_Home onDelivery={() => setPage("fulfillment")} onTab={(t) => { if (t === "mine") setPage("mine"); }} />;
      case "fulfillment":
        return <CA_Fulfillment onBack={() => setPage("home")} onTab={t => setPage(t === "delivery" ? "fulfillment" : t)} />;
      case "mine":
        return <CA_Mine onBack={() => setPage("home")} onTab={t => setPage(t === "delivery" ? "fulfillment" : t)} />;
      default: return null;
    }
  };

  return renderPage();
};

// ══════════════════════════════════════════════════════════════════════════════
// ■ CONSUMER APP (B) — CB v2
// ══════════════════════════════════════════════════════════════════════════════

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
];

const CB_SHOWCASE = [
  { name: "可口可乐", price: 4.5, emoji: "🥤" },
  { name: "乐事薯片", price: 7.5, emoji: "🍟" },
  { name: "农夫山泉", price: 3.0, emoji: "💧" },
  { name: "元气森林", price: 6.0, emoji: "🫧" },
  { name: "旺旺雪饼", price: 8.0, emoji: "🍘" },
  { name: "自热米饭", price: 25.9, emoji: "🍱" },
];

// ─── B: Tab Bar helper ───────────────────────────────────────────────────
const TabBarCB = ({ active, onHome, onMine }: { active: "home" | "mine"; onHome: () => void; onMine: () => void }) => (
  <div className="flex border-t border-[#F1F5F9] bg-white h-[52px] flex-shrink-0">
    <button onClick={onHome}
      className={`flex-1 flex flex-col items-center justify-center gap-0.5 ${active === "home" ? "text-[#0D9488]" : "text-[#94A3B8]"}`}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth={active === "home" ? "2.25" : "1.75"} strokeLinecap="round" strokeLinejoin="round">
        <path d={P.home} />
      </svg>
      <span className={`text-[10px] font-semibold ${active === "home" ? "text-[#0D9488]" : "text-[#94A3B8]"}`}>首页</span>
    </button>
    <button onClick={onMine}
      className={`flex-1 flex flex-col items-center justify-center gap-0.5 ${active === "mine" ? "text-[#0D9488]" : "text-[#94A3B8]"}`}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth={active === "mine" ? "2.25" : "1.75"} strokeLinecap="round" strokeLinejoin="round">
        <path d={P.user} />
      </svg>
      <span className={`text-[10px] font-semibold ${active === "mine" ? "text-[#0D9488]" : "text-[#94A3B8]"}`}>我的</span>
    </button>
  </div>
);

// ─── B: Home ─────────────────────────────────────────────────────────────
const CB_Home = ({ onScan, onMine }: { onScan: () => void; onMine: () => void }) => (
  <div className="h-full flex flex-col">
    {/* Hero gradient */}
    <div style={{ background: `linear-gradient(160deg, ${BRAND.dark} 0%, ${BRAND.primary} 100%)`, height: 220 }}
      className="flex-shrink-0 px-5 pt-3 flex flex-col justify-between">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-white text-xl font-bold">零食柜</div>
          <div className="text-white/60 text-xs mt-0.5">随取随付</div>
        </div>
        <button onClick={onScan}
          className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={BRAND.primary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d={P.scan} />
          </svg>
        </button>
      </div>
      <div />
    </div>

    <div className="flex-1 overflow-y-auto -mt-6 rounded-t-3xl bg-[#F8FAF9]">
      {/* Ad banner */}
      <div className="mx-4 mt-4 mb-3 rounded-2xl overflow-hidden"
        style={{ height: 160, background: "linear-gradient(135deg, #F0FDFA, #CCFBF1)" }}>
        <div className="h-full flex flex-col items-center justify-center">
          <div className="text-5xl mb-2">🎉</div>
          <div className="text-base font-bold text-[#0F766E]">新用户首单9折</div>
          <div className="text-xs text-[#0D9488] mt-0.5">扫码开门即享优惠</div>
          <div className="flex gap-1.5 mt-3">
            <div className="w-4 h-1.5 rounded-full bg-[#0D9488]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#99F6E4]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#99F6E4]" />
          </div>
        </div>
      </div>

      {/* Nearby cabinets */}
      <SecLabel title="附近零食柜" />
      <div className="flex gap-3 px-4 mb-4">
        {[{ name: "科技园北楼1F", dist: "50m" }, { name: "创业大厦B座1F", dist: "120m" }].map(c => (
          <div key={c.name} className="flex-1 bg-white rounded-2xl p-3.5 shadow-[0_1px_4px_0_rgba(15,23,42,0.05)]">
            <div className="text-2xl mb-2 text-center">🏪</div>
            <div className="text-xs font-semibold text-[#0F172A] text-center mb-1.5">{c.name}</div>
            <div className="flex items-center justify-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
              <span className="text-[10px] text-[#64748B]">营业中 · {c.dist}</span>
            </div>
          </div>
        ))}
      </div>

      {/* CTA button */}
      <div className="px-4 pb-5">
        <button onClick={onScan}
          className="w-full h-14 rounded-2xl font-bold text-[16px] text-white flex items-center justify-center gap-2"
          style={{ background: BRAND.primary }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d={P.scan} />
          </svg>
          扫码开门取货
        </button>
      </div>
    </div>

    <TabBarCB active="home" onHome={() => {}} onMine={onMine} />
  </div>
);

// ─── B: Products (door-open flow) ────────────────────────────────────────
const CB_Products = ({ onOpenDoor, onBack }: { onOpenDoor: () => void; onBack: () => void }) => {
  const [doorState, setDoorState] = useState<"idle" | "opening" | "open">("idle");
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

  return (
    <div className="h-full flex flex-col bg-[#F8FAF9] relative">
      {doorState === "open" && (
        <div className="bg-[#F0FDFA] border-b border-[#99F6E4] px-4 py-2.5 flex items-center gap-2 flex-shrink-0">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#22C55E" }} />
          <span className="text-sm font-semibold text-[#15803D]">柜门已开启！取货后请关门</span>
        </div>
      )}
      <NavBar title="商品" onBack={onBack} white />

      {/* Cabinet info banner */}
      <div className="mx-4 mt-2 mb-3 rounded-2xl overflow-hidden flex-shrink-0"
        style={{ background: `linear-gradient(135deg, ${BRAND.dark}, ${BRAND.primary})` }}>
        <div className="px-4 py-3 flex items-center justify-between">
          <div>
            <div className="text-white font-bold text-[15px]">智柜 Pro X8</div>
            <div className="text-white/70 text-xs mt-0.5">科技园北楼1F · 50m</div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#4ADE80]" />
            <span className="text-white/80 text-xs">营业中</span>
          </div>
        </div>
      </div>

      {/* Product grid */}
      <div className="flex-1 overflow-y-auto pb-24">
        <div className="grid grid-cols-2 gap-3 px-4">
          {PRODUCTS.map(p => (
            <div key={p.name} className="bg-white rounded-2xl p-3.5 shadow-[0_1px_6px_0_rgba(15,23,42,0.06)]">
              <div className="text-center mb-2" style={{ fontSize: 48, lineHeight: 1 }}>{p.emoji}</div>
              <div className="text-[13px] font-semibold text-[#0F172A] text-center mb-0.5">{p.name}</div>
              <div className="text-[10px] text-[#94A3B8] text-center mb-1.5">{p.spec}</div>
              <div className="text-center text-base font-bold" style={{ color: BRAND.primary }}>¥{p.price}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom button area */}
      <div className="bg-white border-t border-[#F1F5F9] px-4 py-3 flex-shrink-0">
        {doorState === "idle" && (
          <button onClick={() => setShowModal(true)}
            className="w-full h-14 rounded-2xl font-bold text-[16px] text-white flex items-center justify-center gap-2"
            style={{ background: BRAND.primary }}>
            打开柜门购物
          </button>
        )}
        {doorState === "opening" && (
          <button disabled
            className="w-full h-14 rounded-2xl font-bold text-[16px] text-white flex items-center justify-center gap-2 opacity-80"
            style={{ background: BRAND.primary }}>
            <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeOpacity="0.3" /><path d="M21 12a9 9 0 00-9-9" />
            </svg>
            正在开门...
          </button>
        )}
        {doorState === "open" && (
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2 text-sm font-semibold" style={{ color: BRAND.primary }}>
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: BRAND.primary }} />
              开门中，请选择商品
            </div>
            <button onClick={onOpenDoor}
              className="w-full h-12 rounded-2xl font-bold text-[15px] text-white flex items-center justify-center gap-2"
              style={{ background: BRAND.dark }}>
              <Ic d={P.lock} size={18} cls="text-white" />关门结算
            </button>
          </div>
        )}
      </div>

      {/* Auth modal overlay */}
      {showModal && (
        <div className="absolute inset-0 bg-black/40 flex items-end z-50">
          <div className="w-full bg-white rounded-t-3xl px-5 pb-8 pt-5">
            <div className="text-[17px] font-bold text-[#0F172A] mb-1">选择支付方式授权</div>
            <div className="text-sm text-[#64748B] mb-5">使用信用授权免密开门取货</div>
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
            <button onClick={() => setShowModal(false)} className="w-full mt-4 text-sm text-[#94A3B8] text-center py-2">取消</button>
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
      <button onClick={onHome} className="w-9 h-9 flex items-center justify-center rounded-full bg-[#F8FAF9]">
        <Ic d={P.x} size={18} cls="text-[#64748B]" />
      </button>
    </div>
    <div className="flex-1 flex flex-col items-center justify-center px-8">
      <div className="text-6xl mb-6">🚪</div>
      <div className="text-2xl font-bold text-[#0F172A] mb-2 text-center">关门成功，请放心离开</div>
      <div className="text-sm text-[#94A3B8] text-center mb-8 leading-relaxed">账单正在计算，稍后将为你推送</div>
      <div className="w-full bg-[#F0FDFA] rounded-full h-2 mb-10 overflow-hidden">
        <div className="h-full rounded-full animate-pulse" style={{ background: BRAND.primary, width: "60%" }} />
      </div>
    </div>
    <div className="px-4 pb-8 flex-shrink-0">
      <button onClick={onHome}
        className="w-full h-14 rounded-2xl font-bold text-[16px] text-white flex items-center justify-center"
        style={{ background: BRAND.primary }}>
        返回首页
      </button>
    </div>
  </div>
);

// ─── B: Mine ─────────────────────────────────────────────────────────────
const CB_Mine = ({ onOrders, onService, onTab }: { onOrders: () => void; onService: () => void; onTab: (t: string) => void }) => (
  <div className="h-full flex flex-col bg-[#F8FAF9]">
    {/* Profile hero */}
    <div style={{ background: `linear-gradient(160deg, ${BRAND.dark}, ${BRAND.primary})` }} className="px-5 pt-3 pb-10 flex-shrink-0">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
          <span className="text-white text-2xl">😊</span>
        </div>
        <div>
          <div className="text-white text-lg font-bold">张**</div>
          <div className="text-white/60 text-sm">138****3301</div>
        </div>
      </div>
    </div>

    <div className="flex-1 overflow-y-auto -mt-6 rounded-t-3xl bg-[#F8FAF9] pb-4">
      <Card cls="mt-4" p={false}>
        <button onClick={onOrders} className="w-full flex items-center gap-3 px-4 py-4 border-b border-[#F8FAFC]">
          <div className="w-9 h-9 rounded-xl bg-[#F0FDFA] flex items-center justify-center flex-shrink-0">
            <Ic d={P.list} size={17} cls="text-[#0D9488]" />
          </div>
          <span className="flex-1 text-[15px] text-[#0F172A] text-left font-medium">我的订单</span>
          <span className="px-2 py-0.5 bg-[#F0FDFA] text-[#0D9488] text-xs font-bold rounded-full mr-1">3</span>
          <Ic d={P.chevR} size={14} cls="text-[#CBD5E1]" />
        </button>
        <button onClick={onService} className="w-full flex items-center gap-3 px-4 py-4">
          <div className="w-9 h-9 rounded-xl bg-[#F0FDFA] flex items-center justify-center flex-shrink-0">
            <Ic d={P.service} size={17} cls="text-[#0D9488]" />
          </div>
          <span className="flex-1 text-[15px] text-[#0F172A] text-left font-medium">联系客服</span>
          <Ic d={P.chevR} size={14} cls="text-[#CBD5E1]" />
        </button>
      </Card>
    </div>

    <TabBarCB active="mine" onHome={() => onTab("home")} onMine={() => {}} />
  </div>
);

// ─── B: Order Detail ─────────────────────────────────────────────────────
const CB_OrderDetail = ({ orderId, onBack, onRefund }: { orderId: string; onBack: () => void; onRefund: () => void }) => {
  const order = CB_ORDERS.find(o => o.id === orderId) ?? CB_ORDERS[0];
  return (
    <div className="h-full flex flex-col bg-[#F8FAF9]">
      <NavBar title="订单详情" onBack={onBack} white />
      <div className="flex-1 overflow-y-auto pb-24">
        {/* Status */}
        <div className="mx-4 mt-2 mb-3 rounded-2xl overflow-hidden shadow-[0_1px_6px_0_rgba(15,23,42,0.06)]">
          <div className="px-4 py-4" style={{ background: `linear-gradient(135deg, ${BRAND.dark}, ${BRAND.primary})` }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                {order.status === "已支付" ? <Ic d={P.checkC} size={22} cls="text-white" /> : <Ic d={P.refresh} size={22} cls="text-white" />}
              </div>
              <div>
                <div className="text-white font-bold text-[17px]">{order.status}</div>
                <div className="text-white/60 text-xs mt-0.5">{order.device}</div>
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
            <div key={item.name} className="flex items-center justify-between py-3 border-b border-[#F8FAFC] last:border-0">
              <div>
                <div className="text-[15px] font-medium text-[#0F172A]">{item.name}</div>
                <div className="text-xs text-[#94A3B8]">× {item.qty} 件</div>
              </div>
              <div className="text-right">
                <div className="text-[15px] font-bold text-[#0F172A]">¥{(item.price * item.qty).toFixed(1)}</div>
                <div className="text-xs text-[#94A3B8]">单价 ¥{item.price}</div>
              </div>
            </div>
          ))}
          <div className="flex justify-between py-3">
            <span className="text-sm text-[#64748B]">合计</span>
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
        <div className="bg-white border-t border-[#F1F5F9] px-4 py-3 flex-shrink-0">
          <button onClick={onRefund}
            className="w-full h-12 bg-[#F8FAF9] border border-[#E2E8F0] rounded-2xl text-[15px] font-semibold text-[#64748B] flex items-center justify-center gap-2">
            <Ic d={P.refresh} size={16} />申请退款
          </button>
        </div>
      )}
    </div>
  );
};

// ─── B: Orders List ──────────────────────────────────────────────────────
const CB_Orders = ({ onDetail, onBack }: { onDetail: (id: string) => void; onBack: () => void }) => (
  <div className="h-full flex flex-col bg-[#F8FAF9]">
    <NavBar title="我的订单" onBack={onBack} white />
    <div className="flex-1 overflow-y-auto pb-5 pt-2">
      {CB_ORDERS.map(o => (
        <div key={o.id} onClick={() => onDetail(o.id)}
          className="bg-white mx-4 mb-3 rounded-2xl px-4 py-4 shadow-[0_1px_6px_0_rgba(15,23,42,0.06)] cursor-pointer">
          <div className="flex justify-between items-center mb-2">
            <div className="text-xs text-[#94A3B8] font-mono">{o.id}</div>
            <Tag label={o.status} color={statusColor(o.status)} dot />
          </div>
          <div className="text-xs text-[#64748B] mb-2">{o.device} · {o.time}</div>
          <div className="text-sm text-[#64748B] mb-2">{o.items.map(i => i.name).join(" · ")}</div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-[#94A3B8]">共 {o.items.reduce((s, i) => s + i.qty, 0)} 件</span>
            <span className="text-base font-bold text-[#0F172A]">¥{o.total.toFixed(1)}</span>
          </div>
          {o.refund && (
            <div className="mt-2 px-3 py-1.5 bg-[#F0FDFA] rounded-xl text-xs text-[#0D9488] flex items-center gap-1.5">
              <Ic d={P.refresh} size={11} />
              {o.refund.status === "已退款" ? `已退 ¥${o.refund.amount}` : `退款申请中 ¥${o.refund.amount}`}
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);

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
    <div className="h-full flex flex-col bg-[#F8FAF9]">
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
              className="w-full flex items-center gap-3 px-4 py-4 border-b border-[#F8FAFC] last:border-0 text-left">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all
                ${selected.includes(i) ? "border-[#0D9488] bg-[#0D9488]" : "border-[#E2E8F0]"}`}>
                {selected.includes(i) && <Ic d={P.check} size={12} cls="text-white" />}
              </div>
              <div className="flex-1">
                <div className="text-[15px] font-medium text-[#0F172A]">{item.name}</div>
                <div className="text-xs text-[#94A3B8]">× {item.qty} 件</div>
              </div>
              <div className="text-[15px] font-bold text-[#0F172A]">¥{(item.price * item.qty).toFixed(1)}</div>
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
                  ${reason === r ? "border-[#0D9488] text-[#0D9488] bg-[#F0FDFA]" : "border-[#F1F5F9] text-[#64748B] bg-white"}`}>
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
            className="w-full text-sm text-[#0F172A] placeholder-[#CBD5E1] outline-none resize-none py-2" />
          <div className="text-right text-xs text-[#CBD5E1] pb-2">{desc.length}/200</div>
        </Card>

        {/* Upload */}
        <SecLabel title="上传凭证" action={<span className="text-xs text-[#94A3B8]">选填，最多4张</span>} />
        <Card>
          <div className="py-2">
            <div className="grid grid-cols-4 gap-2 mb-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <button key={i} onClick={() => setPhotos(p => Math.min(4, p + 1))}
                  className={`aspect-square rounded-xl flex flex-col items-center justify-center border-2 border-dashed transition-all
                    ${i < photos ? "border-[#0D9488] bg-[#F0FDFA]" : "border-[#E2E8F0] bg-[#F8FAFC]"}`}>
                  {i < photos ? (
                    <Ic d={P.image} size={18} cls="text-[#0D9488]" />
                  ) : i === photos ? (
                    <Ic d={P.plus} size={18} cls="text-[#CBD5E1]" />
                  ) : (
                    <div className="w-4 h-4 rounded border border-[#E2E8F0]" />
                  )}
                </button>
              ))}
            </div>
            <div className="text-xs text-[#94A3B8]">支持拍摄商品、小票、包装等凭证</div>
          </div>
        </Card>
      </div>

      <div className="bg-white border-t border-[#F1F5F9] px-4 py-3 flex-shrink-0">
        <button onClick={onSubmit} disabled={selected.length === 0 || !reason}
          className="w-full h-14 rounded-2xl font-bold text-[16px] text-white transition-all flex items-center justify-center gap-2"
          style={{ background: BRAND.primary, opacity: selected.length === 0 || !reason ? 0.5 : 1 }}>
          提交退款申请{selected.length > 0 && reason ? ` ¥${total.toFixed(1)}` : ""}
        </button>
        {(selected.length === 0 || !reason) && (
          <p className="text-center text-xs text-[#CBD5E1] mt-1.5">请选择退款商品和原因</p>
        )}
      </div>
    </div>
  );
};

// ─── B: Refund Progress ──────────────────────────────────────────────────
const CB_RefundProgress = ({ state, onBack }: { state: "pending" | "processing" | "done"; onBack: () => void }) => {
  const STATES = {
    pending: {
      color: "#B45309", bg: "#FFFBEB", icon: P.clock, label: "退款申请已提交",
      desc: "您的退款申请已成功提交，正在等待审核",
      steps: [
        { label: "申请提交", done: true, time: "09-14 12:45", desc: "退款申请已提交，等待审核" },
        { label: "审核中", done: false, time: null, desc: "预计30分钟内完成审核" },
        { label: "退款到账", done: false, time: null, desc: "审核通过后原路退回" },
      ],
    },
    processing: {
      color: "#1D4ED8", bg: "#EFF6FF", icon: P.refresh, label: "退款审核中",
      desc: "审核人员正在处理您的退款申请，请耐心等待",
      steps: [
        { label: "申请提交", done: true, time: "09-12 09:30", desc: "退款申请已提交" },
        { label: "审核中", done: true, time: "09-12 09:45", desc: "客服正在核实退款信息" },
        { label: "退款到账", done: false, time: null, desc: "预计1-3个工作日退款到账" },
      ],
    },
    done: {
      color: "#0D9488", bg: "#F0FDFA", icon: P.checkC, label: "退款成功",
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
    <div className="h-full flex flex-col bg-[#F8FAF9]">
      <NavBar title="退款进度" onBack={onBack} white />

      <div className="flex-1 overflow-y-auto pb-5">
        {/* Status hero */}
        <div className="mx-4 mt-2 mb-3 rounded-2xl overflow-hidden shadow-[0_1px_6px_0_rgba(15,23,42,0.06)]">
          <div className="px-5 py-5 flex items-center gap-4" style={{ background: s.bg }}>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: s.color + "20" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={s.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d={s.icon} />
              </svg>
            </div>
            <div>
              <div className="text-lg font-bold" style={{ color: s.color }}>{s.label}</div>
              <div className="text-sm text-[#64748B] mt-0.5 leading-relaxed">{s.desc}</div>
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
        <div className="mx-4 bg-white rounded-2xl px-5 py-4 shadow-[0_1px_6px_0_rgba(15,23,42,0.06)]">
          {s.steps.map((step, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 flex-shrink-0
                  ${step.done ? "border-[#0D9488] bg-[#0D9488]" : "border-[#E2E8F0] bg-white"}`}>
                  {step.done ? <Ic d={P.check} size={14} cls="text-white" /> : <span className="text-xs text-[#CBD5E1]">{i + 1}</span>}
                </div>
                {i < s.steps.length - 1 && (
                  <div className={`w-0.5 flex-1 my-1 ${step.done ? "bg-[#0D9488]" : "bg-[#F1F5F9]"}`} style={{ minHeight: 28 }} />
                )}
              </div>
              <div className="flex-1 pb-4">
                <div className="flex items-center justify-between mb-0.5">
                  <span className={`text-[15px] font-bold ${step.done ? "text-[#0F172A]" : "text-[#94A3B8]"}`}>{step.label}</span>
                  {step.time && <span className="text-xs text-[#94A3B8]">{step.time}</span>}
                </div>
                <p className={`text-xs leading-relaxed ${step.done ? "text-[#64748B]" : "text-[#CBD5E1]"}`}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {state !== "done" && (
          <div className="mx-4 mt-2 bg-[#FFFBEB] border border-[#FDE68A] rounded-2xl px-4 py-3 flex items-start gap-2 text-xs text-[#92400E]">
            <Ic d={P.info} size={13} cls="flex-shrink-0 mt-0.5 text-[#F59E0B]" />
            退款一般在 1-3 个工作日内到账。如有疑问请联系客服。
          </div>
        )}
      </div>
    </div>
  );
};

// ─── B: No Orders ────────────────────────────────────────────────────────
const CB_NoOrders = ({ onBack }: { onBack: () => void }) => (
  <div className="h-full flex flex-col bg-[#F8FAF9]">
    <NavBar title="我的订单" onBack={onBack} white />
    <div className="flex-1 flex items-center justify-center">
      <Empty icon="list" title="暂无订单记录" desc="扫码开门取货后，订单将自动生成并显示在这里" action={
        <button className="px-8 h-11 rounded-2xl text-white text-sm font-semibold" style={{ background: BRAND.primary }}>
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
    <div className="h-full flex flex-col bg-[#F8FAF9]">
      <NavBar title="联系客服" onBack={onBack} white />
      <div className="flex-1 overflow-y-auto pb-5">
        {/* Hero */}
        <div className="mx-4 mt-3 mb-3 rounded-2xl overflow-hidden">
          <div className="px-5 py-6 text-center" style={{ background: `linear-gradient(135deg, ${BRAND.dark}, ${BRAND.primary})` }}>
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
                <span className="text-[15px] font-semibold text-[#0F172A]">在线客服</span>
                <Tag label="在线" color="green" dot />
              </div>
              <div className="text-xs text-[#94A3B8] mb-3">平均响应 {"<"} 1分钟</div>
              <button className="px-4 h-9 rounded-xl text-sm font-semibold text-white" style={{ background: BRAND.primary }}>
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
              <div className="text-[15px] font-semibold text-[#0F172A] mb-0.5">客服电话</div>
              <div className="text-xl font-bold text-[#0F172A] mb-0.5">400-888-9999</div>
              <div className="text-xs text-[#94A3B8] mb-3">工作日 9:00-18:00</div>
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
            <div key={i} className="border-b border-[#F8FAFC] last:border-0">
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center gap-3 px-4 py-4 text-left">
                <div className="w-6 h-6 rounded-full bg-[#F0FDFA] flex items-center justify-center flex-shrink-0">
                  <span className="text-[11px] font-bold text-[#0D9488]">Q</span>
                </div>
                <span className="flex-1 text-sm font-medium text-[#334155]">{faq.q}</span>
                <Ic d={openFaq === i ? P.chevD : P.chevR} size={14} cls="text-[#CBD5E1] flex-shrink-0" />
              </button>
              {openFaq === i && (
                <div className="px-4 pb-4">
                  <div className="ml-9 text-xs text-[#64748B] leading-relaxed bg-[#F8FAF9] rounded-xl p-3">{faq.a}</div>
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

const ConsumerApp = () => {
  const [page, setPage] = useState<CBPage>("home");
  const [orderId, setOrderId] = useState("ORD-202509-8821");

  const nav = (p: CBPage) => setPage(p);

  const renderPage = () => {
    switch (page) {
      case "home":
        return <CB_Home onScan={() => nav("products")} onMine={() => nav("mine")} />;
      case "products":
        return <CB_Products onOpenDoor={() => nav("billing")} onBack={() => nav("home")} />;
      case "billing":
        return <CB_Billing onHome={() => nav("home")} />;
      case "mine":
        return <CB_Mine onOrders={() => nav("orders")} onService={() => nav("service")} onTab={t => { if (t === "home") nav("home"); }} />;
      case "orders":
        return <CB_Orders onDetail={id => { setOrderId(id); nav("order-detail"); }} onBack={() => nav("mine")} />;
      case "order-detail":
        return <CB_OrderDetail orderId={orderId} onBack={() => nav("orders")} onRefund={() => nav("refund-request")} />;
      case "refund-request":
        return <CB_RefundRequest orderId={orderId} onBack={() => nav("order-detail")} onSubmit={() => nav("refund-pending")} />;
      case "refund-pending":
        return <CB_RefundProgress state="pending" onBack={() => nav("mine")} />;
      case "refund-processing":
        return <CB_RefundProgress state="processing" onBack={() => nav("mine")} />;
      case "refund-done":
        return <CB_RefundProgress state="done" onBack={() => nav("mine")} />;
      case "service":
        return <CB_Service onBack={() => nav("mine")} />;
      default: return null;
    }
  };
  return renderPage();
};

// ══════════════════════════════════════════════════════════════════════════════
// PAGE NAV CONFIGS
// ══════════════════════════════════════════════════════════════════════════════
const CA_NAV: { section: string; label: string; page: CAPage }[] = [
  { section: "主流程", label: "首页（商品列表）", page: "home" },
  { section: "主流程", label: "首页（无商品空态）", page: "home-empty" },
  { section: "主流程", label: "履约进度追踪", page: "fulfillment" },
  { section: "主流程", label: "我的账号", page: "mine" },
];

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
// PHONE SHELL
// ══════════════════════════════════════════════════════════════════════════════
function PhoneFrame({ children, darkStatus = false }: { children: ReactNode; darkStatus?: boolean }) {
  return (
    <div className="flex-shrink-0 relative">
      <div className="w-[375px] rounded-[52px] bg-[#1C1C1E] p-[10px] shadow-2xl">
        <div className="bg-black h-10 rounded-t-[44px] flex items-center justify-center">
          <div className="w-24 h-7 bg-black rounded-full border border-[#2A2A2E]" />
        </div>
        <div className="bg-white overflow-hidden" style={{ height: 700 }}>
          <StatusBar dark={darkStatus} />
          <div className="absolute" style={{ top: 10 + 40 + 28, left: 10, right: 10, bottom: 10 + 32, overflow: "hidden" }}>
            {children}
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
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// MAIN EXPORT
// ══════════════════════════════════════════════════════════════════════════════
// ─── Standalone exports for split sidebar entries ────────────────────────────
export const ClientMiniApp = () => {
  const [caPage, setCaPage] = useState<CAPage>("home");
  const [caKey, setCaKey] = useState(0);
  const navToCA = (p: CAPage) => { setCaPage(p); setCaKey(k => k + 1); };
  const sections_ca = [...new Set(CA_NAV.map(p => p.section))];

  const CustomerAppControlled = () => {
    switch (caPage) {
      case "home-empty":
        return (
          <div className="h-full flex flex-col bg-[#F0F4FF]">
            <div className="bg-white flex-shrink-0">
              <NavBar title="在售商品" white />
              <div className="px-4 pb-3 flex items-center gap-2 text-xs text-[#94A3B8]">
                <Ic d={P.pin} size={12} cls="text-[#56A9FF]" />光明新城购物中心3F
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center bg-[#F0F4FF]">
              <Empty icon="pkg" title="暂无在售商品" desc="当前点位商品正在补货中，稍后再来看看" />
            </div>
          </div>
        );
      case "fulfillment": return <CA_Fulfillment onBack={() => setCaPage("home")} onTab={t => setCaPage(t === "delivery" ? "fulfillment" : t)} />;
      case "mine": return <CA_Mine onBack={() => setCaPage("home")} onTab={t => setCaPage(t === "delivery" ? "fulfillment" : t)} />;
      default: return <CA_Home onDelivery={() => setCaPage("fulfillment")} onTab={t => { if (t === "mine") setCaPage("mine"); }} />;
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
              <CustomerAppControlled key={caKey} />
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
          <span className="px-4 py-1.5 rounded-full text-xs font-bold text-white" style={{ background: CA_BRAND.primary }}>客户小程序</span>
        </div>
      </div>
      <div className="w-52 flex-shrink-0 pt-2 sticky top-0 max-h-screen overflow-y-auto pb-8">
        <div className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider mb-3">页面导航</div>
        {sections_ca.map(sec => (
          <div key={sec} className="mb-4">
            <div className="text-[10px] font-bold text-[#CBD5E1] uppercase tracking-wider mb-1.5 px-1">{sec}</div>
            {CA_NAV.filter(p => p.section === sec).map(p => (
              <button key={p.page} onClick={() => navToCA(p.page)}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-[11px] leading-snug transition-all mb-0.5
                  ${caPage === p.page ? "font-bold border" : "text-[#64748B] hover:bg-[#F8FAF9] hover:text-[#334155]"}`}
                style={caPage === p.page ? { background: CA_BRAND.light, color: CA_BRAND.dark, borderColor: CA_BRAND.mid } : undefined}>
                {p.label}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export const ConsumerMiniApp = () => {
  const [cbPage, setCbPage] = useState<CBPage>("home");
  const [cbKey, setCbKey] = useState(0);
  const navToCB = (p: CBPage) => { setCbPage(p); setCbKey(k => k + 1); };
  const sections_cb = [...new Set(CB_NAV.map(p => p.section))];

  const ConsumerAppControlled = () => {
    switch (cbPage) {
      case "products": return <CB_Products onOpenDoor={() => setCbPage("billing")} onBack={() => setCbPage("home")} />;
      case "billing": return <CB_Billing onHome={() => setCbPage("home")} />;
      case "mine": return <CB_Mine onOrders={() => setCbPage("orders")} onService={() => setCbPage("service")} onTab={t => { if (t === "home") setCbPage("home"); }} />;
      case "orders": return <CB_Orders onDetail={() => setCbPage("order-detail")} onBack={() => setCbPage("mine")} />;
      case "order-detail": return <CB_OrderDetail orderId="ORD-202509-8821" onBack={() => setCbPage("orders")} onRefund={() => setCbPage("refund-request")} />;
      case "refund-request": return <CB_RefundRequest orderId="ORD-202509-8821" onBack={() => setCbPage("order-detail")} onSubmit={() => setCbPage("refund-pending")} />;
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
          <span className="px-4 py-1.5 rounded-full text-xs font-bold text-white" style={{ background: BRAND.primary }}>消费者小程序</span>
        </div>
      </div>
      <div className="w-52 flex-shrink-0 pt-2 sticky top-0 max-h-screen overflow-y-auto pb-8">
        <div className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider mb-3">页面导航</div>
        {sections_cb.map(sec => (
          <div key={sec} className="mb-4">
            <div className="text-[10px] font-bold text-[#CBD5E1] uppercase tracking-wider mb-1.5 px-1">{sec}</div>
            {CB_NAV.filter(p => p.section === sec).map(p => (
              <button key={p.page} onClick={() => navToCB(p.page)}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-[11px] leading-snug transition-all mb-0.5
                  ${cbPage === p.page ? "font-bold border" : "text-[#64748B] hover:bg-[#F8FAF9] hover:text-[#334155]"}`}
                style={cbPage === p.page ? { background: BRAND.light, color: BRAND.dark, borderColor: BRAND.mid } : undefined}>
                {p.label}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export const MiniProgramsApp = () => {
  const [active, setActive] = useState<"customer" | "consumer">("customer");

  // Customer app state
  const [caPage, setCaPage] = useState<CAPage>("home");
  const [caKey, setCaKey] = useState(0);

  // Consumer app state
  const [cbPage, setCbPage] = useState<CBPage>("home");
  const [cbKey, setCbKey] = useState(0);

  const navToCA = (p: CAPage) => { setCaPage(p); setCaKey(k => k + 1); setActive("customer"); };
  const navToCB = (p: CBPage) => { setCbPage(p); setCbKey(k => k + 1); setActive("consumer"); };

  // Controlled customer app
  const CustomerAppControlled = () => {
    switch (caPage) {
      case "home-empty":
        return (
          <div className="h-full flex flex-col bg-[#F0F4FF]">
            <div className="bg-white flex-shrink-0">
              <NavBar title="在售商品" white />
              <div className="px-4 pb-3 flex items-center gap-2 text-xs text-[#94A3B8]">
                <Ic d={P.pin} size={12} cls="text-[#56A9FF]" />光明新城购物中心3F
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center bg-[#F0F4FF]">
              <Empty icon="pkg" title="暂无在售商品" desc="当前点位商品正在补货中，稍后再来看看" />
            </div>
          </div>
        );
      case "fulfillment":
        return <CA_Fulfillment onBack={() => setCaPage("home")} onTab={t => setCaPage(t === "delivery" ? "fulfillment" : t)} />;
      case "mine":
        return <CA_Mine onBack={() => setCaPage("home")} onTab={t => setCaPage(t === "delivery" ? "fulfillment" : t)} />;
      default:
        return <CA_Home onDelivery={() => setCaPage("fulfillment")} onTab={t => { if (t === "mine") setCaPage("mine"); }} />;
    }
  };

  // Controlled consumer app
  const ConsumerAppControlled = () => {
    switch (cbPage) {
      case "products": return <CB_Products onOpenDoor={() => setCbPage("billing")} onBack={() => setCbPage("home")} />;
      case "billing": return <CB_Billing onHome={() => setCbPage("home")} />;
      case "mine": return <CB_Mine onOrders={() => setCbPage("orders")} onService={() => setCbPage("service")} onTab={t => { if (t === "home") setCbPage("home"); }} />;
      case "orders": return <CB_Orders onDetail={() => setCbPage("order-detail")} onBack={() => setCbPage("mine")} />;
      case "order-detail": return <CB_OrderDetail orderId="ORD-202509-8821" onBack={() => setCbPage("orders")} onRefund={() => setCbPage("refund-request")} />;
      case "refund-request": return <CB_RefundRequest orderId="ORD-202509-8821" onBack={() => setCbPage("order-detail")} onSubmit={() => setCbPage("refund-pending")} />;
      case "refund-pending": return <CB_RefundProgress state="pending" onBack={() => setCbPage("mine")} />;
      case "refund-processing": return <CB_RefundProgress state="processing" onBack={() => setCbPage("mine")} />;
      case "refund-done": return <CB_RefundProgress state="done" onBack={() => setCbPage("mine")} />;
      case "service": return <CB_Service onBack={() => setCbPage("mine")} />;
      default: return <CB_Home onScan={() => setCbPage("products")} onMine={() => setCbPage("mine")} />;
    }
  };

  const sections_ca = [...new Set(CA_NAV.map(p => p.section))];
  const sections_cb = [...new Set(CB_NAV.map(p => p.section))];

  return (
    <div>
      {/* App switcher */}
      <div className="flex gap-3 mb-6">
        {([["customer", "A · 客户小程序"], ["consumer", "B · 消费者小程序"]] as const).map(([k, l]) => (
          <button key={k} onClick={() => setActive(k)}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all border-2
              ${active === k ? "text-white border-transparent" : "bg-white text-[#64748B] border-[#F1F5F9]"}`}
            style={active === k ? { background: BRAND.primary } : undefined}>
            {l}
          </button>
        ))}
        <div className="ml-2 flex items-center text-xs text-[#94A3B8]">
          <span className="w-2 h-2 rounded-full mr-1.5" style={{ background: BRAND.primary }} />
          同一品牌体系 · 独立体验逻辑
        </div>
      </div>

      <div className="flex gap-6 items-start">
        {/* Phone */}
        <div className="flex-shrink-0 relative">
          <div className="w-[375px] rounded-[52px] bg-[#1C1C1E] p-[10px] shadow-2xl">
            <div className="bg-black h-10 rounded-t-[44px] flex items-center justify-center">
              <div className="w-24 h-7 bg-black rounded-full border border-[#2A2A2E]" />
            </div>
            <div className="bg-white relative overflow-hidden" style={{ height: 700 }}>
              <StatusBar dark={false} />
              <div className="absolute inset-0 top-[28px] flex flex-col overflow-hidden">
                {active === "customer"
                  ? <CustomerAppControlled key={caKey} />
                  : <ConsumerAppControlled key={cbKey} />}
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
          {/* Label */}
          <div className="mt-4 text-center">
            <span className="px-4 py-1.5 rounded-full text-xs font-bold text-white" style={{ background: BRAND.primary }}>
              {active === "customer" ? "A · 客户小程序" : "B · 消费者小程序"}
            </span>
          </div>
        </div>

        {/* Navigator */}
        <div className="w-52 flex-shrink-0 pt-2 sticky top-0 max-h-screen overflow-y-auto pb-8">
          {active === "customer" ? (
            <>
              <div className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider mb-3">客户端页面</div>
              {sections_ca.map(sec => (
                <div key={sec} className="mb-4">
                  <div className="text-[10px] font-bold text-[#CBD5E1] uppercase tracking-wider mb-1.5 px-1">{sec}</div>
                  {CA_NAV.filter(p => p.section === sec).map(p => (
                    <button key={p.page} onClick={() => navToCA(p.page)}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-[11px] leading-snug transition-all mb-0.5
                        ${caPage === p.page
                          ? "font-bold border"
                          : "text-[#64748B] hover:bg-[#F8FAF9] hover:text-[#334155]"}`}
                      style={caPage === p.page ? { background: CA_BRAND.light, color: CA_BRAND.dark, borderColor: CA_BRAND.mid } : undefined}>
                      {p.label}
                    </button>
                  ))}
                </div>
              ))}
            </>
          ) : (
            <>
              <div className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider mb-3">消费者端页面</div>
              {sections_cb.map(sec => (
                <div key={sec} className="mb-4">
                  <div className="text-[10px] font-bold text-[#CBD5E1] uppercase tracking-wider mb-1.5 px-1">{sec}</div>
                  {CB_NAV.filter(p => p.section === sec).map(p => (
                    <button key={p.page} onClick={() => navToCB(p.page)}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-[11px] leading-snug transition-all mb-0.5
                        ${cbPage === p.page
                          ? "font-bold border"
                          : "text-[#64748B] hover:bg-[#F8FAF9] hover:text-[#334155]"}`}
                      style={cbPage === p.page ? { background: BRAND.light, color: BRAND.dark, borderColor: BRAND.mid } : undefined}>
                      {p.label}
                    </button>
                  ))}
                </div>
              ))}
            </>
          )}
          <div className="mt-3 p-3 bg-[#F8FAFC] rounded-xl">
            <div className="text-[10px] text-[#94A3B8] leading-relaxed">切换上方 A/B 按钮预览两套小程序，或点击任意页面直接跳转。</div>
          </div>
        </div>
      </div>
    </div>
  );
};
