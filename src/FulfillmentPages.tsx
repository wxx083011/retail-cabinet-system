// v6 – EngineerList/Form + WorkOrderList rebuild + WorkOrderAssign
import { useState, ReactNode } from "react";

// ─── Icon paths ───────────────────────────────────────────────────────────────
const P: Record<string, string> = {
  search:   "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0",
  plus:     "M12 5v14M5 12h14",
  download: "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4 M7 10l5 5 5-5 M12 15V3",
  upload:   "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4 M17 8l-5-5-5 5 M12 3v12",
  edit:     "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7 M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",
  trash:    "M3 6h18 M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6 M10 6V4h4v2",
  chevR:    "M9 18l6-6-6-6",
  chevL:    "M15 18l-6-6 6-6",
  chevD:    "M6 9l6 6 6-6",
  x:        "M18 6L6 18M6 6l12 12",
  check:    "M20 6L9 17l-5-5",
  alert:    "M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z M12 9v4 M12 17h.01",
  info:     "M12 22a10 10 0 100-20 10 10 0 000 20z M12 8v4 M12 16h.01",
  truck:    "M1 3h15v13H1z M16 8h4l3 3v5h-7V8z M5.5 21a2.5 2.5 0 100-5 2.5 2.5 0 000 5z M18.5 21a2.5 2.5 0 100-5 2.5 2.5 0 000 5z",
  layers:   "M12 2L2 7l10 5 10-5-10-5z M2 17l10 5 10-5 M2 12l10 5 10-5",
  pkg:      "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
  map:      "M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4z M8 2v16M16 6v16",
  target:   "M12 22a10 10 0 100-20 10 10 0 000 20z M12 16a4 4 0 100-8 4 4 0 000 8z M12 12h.01",
  users:    "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M9 11a4 4 0 100-8 4 4 0 000 8 M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75",
  car:      "M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v5a2 2 0 01-2 2h-2 M7 21a2 2 0 100-4 2 2 0 000 4z M15 21a2 2 0 100-4 2 2 0 000 4z",
  wrench:   "M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z",
  inbox:    "M22 12h-6l-2 3h-4l-2-3H2 M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z",
  circle:   "M12 22a10 10 0 100-20 10 10 0 000 20z",
  phone:    "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 01.4 2.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z",
  pin:      "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z M12 10a2 2 0 100-4 2 2 0 000 4",
  zoomin:   "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z M10 7v6M7 10h6",
  zoomout:  "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z M7 10h6",
  refresh:  "M23 4v6h-6 M1 20v-6h6 M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15",
  clipboard:"M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2 M9 2h6a1 1 0 011 1v2a1 1 0 01-1 1H9a1 1 0 01-1-1V3a1 1 0 011-1z",
  send:     "M22 2L11 13 M22 2l-7 20-4-9-9-4 20-7z",
  eye:      "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 12a3 3 0 100-6 3 3 0 000 6",
  ban:      "M12 22a10 10 0 100-20 10 10 0 000 20z M4.93 4.93l14.14 14.14",
  bar:      "M18 20V10M12 20V4M6 20v-6",
  moreH:    "M12 12h.01M19 12h.01M5 12h.01",
  arrow:    "M5 12h14M12 5l7 7-7 7",
  filter:   "M22 3H2l8 9.46V19l4 2v-8.54L22 3",
  cal:      "M19 4H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z M16 2v4M8 2v4M3 10h18",
  crosshair:"M12 22a10 10 0 100-20 10 10 0 000 20z M12 8v8M8 12h8",
  lasso:    "M3 3h18v18H3z M8 8h8v8H8z",
  nav:      "M3 12h18M3 6h18M3 18h18",
};

const Ic = ({ d, size = 16, className = "" }: { d: string; size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d={d} />
  </svg>
);

// ══════════════════════════════════════════════════════════════════════════════
// SHARED PRIMITIVES
// ══════════════════════════════════════════════════════════════════════════════
type BC = "blue" | "green" | "yellow" | "red" | "gray" | "purple" | "cyan" | "orange" | "dark";
type BV = "primary" | "secondary" | "ghost" | "danger" | "dark";
type SZ = "sm" | "md" | "lg";

const BADGE: Record<BC, string> = {
  blue:   "bg-[#EFF6FF] text-[#2563EB] border-[#BFDBFE]",
  green:  "bg-[#F0FDF4] text-[#16A34A] border-[#BBF7D0]",
  yellow: "bg-[#FFFBEB] text-[#D97706] border-[#FDE68A]",
  red:    "bg-[#FEF2F2] text-[#DC2626] border-[#FECACA]",
  gray:   "bg-[#F8FAFC] text-[#64748B] border-[#E2E8F0]",
  purple: "bg-[#F5F3FF] text-[#7C3AED] border-[#DDD6FE]",
  cyan:   "bg-[#ECFEFF] text-[#0891B2] border-[#A5F3FC]",
  orange: "bg-[#FFF7ED] text-[#EA580C] border-[#FED7AA]",
  dark:   "bg-[#1E293B] text-[#94A3B8] border-[#334155]",
};

const Badge = ({ label, color, dot }: { label: string; color: BC; dot?: boolean }) => (
  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${BADGE[color]}`}>
    {dot && <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />}
    {label}
  </span>
);

const Btn = ({ children, variant = "primary", size = "md", icon, onClick, disabled = false, className = "", full = false }: {
  children?: ReactNode; variant?: BV; size?: SZ; icon?: string;
  onClick?: () => void; disabled?: boolean; className?: string; full?: boolean;
}) => {
  const base = "inline-flex items-center gap-1.5 font-medium transition-all duration-150 cursor-pointer select-none border rounded-md";
  const sz: Record<SZ, string> = { sm: "px-3 py-1.5 text-xs", md: "px-4 py-2 text-sm", lg: "px-5 py-2.5 text-sm" };
  const v: Record<BV, string> = {
    primary:   "bg-[#2563EB] text-white border-[#2563EB] hover:bg-[#1D4ED8] shadow-sm",
    secondary: "bg-white text-[#334155] border-[#E2E8F0] hover:bg-[#F8FAFC] hover:border-[#CBD5E1]",
    ghost:     "bg-transparent text-[#64748B] border-transparent hover:bg-[#F1F5F9] hover:text-[#334155]",
    danger:    "bg-[#DC2626] text-white border-[#DC2626] hover:bg-[#B91C1C]",
    dark:      "bg-[#1E293B] text-[#E2E8F0] border-[#334155] hover:bg-[#334155]",
  };
  return (
    <button onClick={onClick} disabled={disabled}
      className={`${base} ${sz[size]} ${v[variant]} ${disabled ? "opacity-40 pointer-events-none" : ""} ${full ? "w-full justify-center" : ""} ${className}`}>
      {icon && <Ic d={P[icon]} size={14} />}
      {children}
    </button>
  );
};

const Inp = ({ placeholder, value, onChange, icon, type = "text", className = "", disabled = false }: {
  placeholder?: string; value?: string; onChange?: (v: string) => void;
  icon?: string; type?: string; className?: string; disabled?: boolean;
}) => (
  <div className={`relative ${className}`}>
    {icon && <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none"><Ic d={P[icon]} size={14} /></span>}
    <input type={type} value={value} onChange={e => onChange?.(e.target.value)} placeholder={placeholder} disabled={disabled}
      className={`w-full h-9 border border-[#E2E8F0] rounded-md text-sm placeholder-[#94A3B8] bg-white
        focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#DBEAFE] transition-all
        ${icon ? "pl-8 pr-3" : "px-3"} ${disabled ? "bg-[#F8FAFC] text-[#94A3B8]" : "text-[#0F172A]"}`} />
  </div>
);

const Sel = ({ options, className = "", value, onChange }: {
  options: { label: string; value: string }[]; className?: string; value?: string; onChange?: (v: string) => void;
}) => (
  <div className={`relative ${className}`}>
    <select value={value} onChange={e => onChange?.(e.target.value)}
      className="w-full h-9 border border-[#E2E8F0] rounded-md text-sm text-[#334155] bg-white px-3 pr-8 appearance-none focus:outline-none focus:border-[#2563EB] cursor-pointer">
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
    <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none"><Ic d={P.chevD} size={14} /></span>
  </div>
);

const Card = ({ children, className = "", noPad = false }: { children: ReactNode; className?: string; noPad?: boolean }) => (
  <div className={`bg-white border border-[#E2E8F0] rounded-lg shadow-sm ${noPad ? "" : "p-5"} ${className}`}>{children}</div>
);

const Modal = ({ open, onClose, title, width = 520, children, footer }: {
  open: boolean; onClose: () => void; title: string; width?: number; children: ReactNode; footer?: ReactNode;
}) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl border border-[#E2E8F0] flex flex-col max-h-[85vh]" style={{ width }}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2E8F0]">
          <h2 className="text-base font-semibold text-[#0F172A]">{title}</h2>
          <button onClick={onClose} className="text-[#94A3B8] hover:text-[#334155] transition-colors"><Ic d={P.x} size={18} /></button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4">{children}</div>
        {footer && <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-[#E2E8F0] bg-[#F8FAFC] rounded-b-xl">{footer}</div>}
      </div>
    </div>
  );
};

const Drawer = ({ open, onClose, title, children, footer }: {
  open: boolean; onClose: () => void; title: string; children: ReactNode; footer?: ReactNode;
}) => (
  <>
    {open && <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm" onClick={onClose} />}
    <div className={`fixed top-0 right-0 h-full z-50 bg-white border-l border-[#E2E8F0] shadow-xl flex flex-col transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`} style={{ width: 640 }}>
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2E8F0]">
        <h2 className="text-base font-semibold text-[#0F172A]">{title}</h2>
        <button onClick={onClose} className="text-[#94A3B8] hover:text-[#334155]"><Ic d={P.x} size={18} /></button>
      </div>
      <div className="flex-1 overflow-y-auto px-6 py-4">{children}</div>
      {footer && <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-[#E2E8F0] bg-[#F8FAFC]">{footer}</div>}
    </div>
  </>
);

const SectionTitle = ({ title, action }: { title: string; action?: ReactNode }) => (
  <div className="flex items-center justify-between mb-4">
    <h3 className="text-sm font-semibold text-[#0F172A]">{title}</h3>
    {action}
  </div>
);

const InfoGrid = ({ items, cols = 3 }: { items: { label: string; value: ReactNode }[]; cols?: number }) => (
  <div className={`grid gap-x-8 gap-y-4`} style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
    {items.map((item, i) => (
      <div key={i}>
        <div className="text-xs text-[#94A3B8] mb-0.5">{item.label}</div>
        <div className="text-sm text-[#0F172A] font-medium">{item.value || <span className="text-[#CBD5E1]">—</span>}</div>
      </div>
    ))}
  </div>
);

const PH = ({ title, crumbs, actions, dark = false }: { title: string; crumbs?: string[]; actions?: ReactNode; dark?: boolean }) => (
  <div className={`mb-5 ${dark ? "text-white" : ""}`}>
    {crumbs && (
      <div className={`flex items-center gap-1 text-xs mb-1.5 ${dark ? "text-[#64748B]" : "text-[#94A3B8]"}`}>
        {crumbs.map((b, i) => (
          <span key={i} className="flex items-center gap-1">
            {i > 0 && <Ic d={P.chevR} size={11} />}
            <span className={i === crumbs.length - 1 ? (dark ? "text-[#94A3B8]" : "text-[#64748B]") : "hover:text-[#2563EB] cursor-pointer"}>{b}</span>
          </span>
        ))}
      </div>
    )}
    <div className="flex items-center justify-between">
      <h1 className={`text-xl font-bold ${dark ? "text-white" : "text-[#0F172A]"}`}>{title}</h1>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  </div>
);

const Stat = ({ label, value, sub, color = "#2563EB", icon, inverted = false }: {
  label: string; value: string | number; sub?: string; color?: string; icon?: string; inverted?: boolean;
}) => (
  <div className={`flex items-start gap-3 rounded-lg p-4 ${inverted ? "bg-[#1E293B] border border-[#334155]" : "bg-white border border-[#E2E8F0] shadow-sm"}`}>
    {icon && (
      <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: inverted ? color + "22" : color + "18", color }}>
        <Ic d={P[icon]} size={17} />
      </div>
    )}
    <div>
      <div className={`text-xs mb-0.5 ${inverted ? "text-[#64748B]" : "text-[#64748B]"}`}>{label}</div>
      <div className={`text-2xl font-bold leading-tight ${inverted ? "text-white" : "text-[#0F172A]"}`}>{value}</div>
      {sub && <div className={`text-xs mt-0.5 ${inverted ? "text-[#64748B]" : "text-[#94A3B8]"}`}>{sub}</div>}
    </div>
  </div>
);

const FB = ({ children }: { children: ReactNode }) => (
  <Card className="mb-4"><div className="flex flex-wrap gap-3 items-end">{children}</div></Card>
);
const FL = ({ label, children, width }: { label: string; children: ReactNode; width?: string }) => (
  <div className="flex flex-col gap-1" style={{ minWidth: width || "120px" }}>
    <label className="text-xs font-medium text-[#64748B]">{label}</label>
    {children}
  </div>
);

const Pager = ({ total, page = 1, pageSize = 20 }: { total: number; page?: number; pageSize?: number }) => {
  const tp = Math.ceil(total / pageSize);
  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-[#E2E8F0]">
      <span className="text-xs text-[#64748B]">共 <strong className="text-[#334155]">{total}</strong> 条</span>
      <div className="flex items-center gap-1">
        <button className="px-2.5 py-1.5 text-xs border border-[#E2E8F0] rounded hover:bg-[#F8FAFC] text-[#64748B]">上一页</button>
        {Array.from({ length: Math.min(tp, 5) }, (_, i) => i + 1).map(p => (
          <button key={p} className={`w-8 h-7 text-xs border rounded ${p === page ? "bg-[#2563EB] text-white border-[#2563EB]" : "border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFC]"}`}>{p}</button>
        ))}
        <button className="px-2.5 py-1.5 text-xs border border-[#E2E8F0] rounded hover:bg-[#F8FAFC] text-[#64748B]">下一页</button>
      </div>
    </div>
  );
};

const Empty = ({ icon, title, desc, action }: { icon: string; title: string; desc?: string; action?: ReactNode }) => (
  <div className="flex flex-col items-center justify-center py-14 text-center">
    <div className="w-14 h-14 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center mb-3">
      <Ic d={P[icon]} size={24} className="text-[#CBD5E1]" />
    </div>
    <div className="text-sm font-medium text-[#334155] mb-1">{title}</div>
    {desc && <p className="text-xs text-[#94A3B8] mb-3 max-w-xs">{desc}</p>}
    {action}
  </div>
);

// Status badge shorthand
const statusColor = (s: string): BC => {
  const m: Record<string, BC> = {
    "待入库": "blue", "入库中": "cyan", "入库完成": "green", "收货异常": "red",
    "待出库": "blue", "出库中": "cyan", "已出库": "green",
    "待排车": "blue", "已排车": "cyan", "待分拣": "orange", "分拣中": "yellow",
    "待配送": "orange", "配送中": "cyan", "已签收": "green", "履约完成": "green", "履约失败": "red", "异常": "red",
    "已完成": "green", "已取消": "gray",
    "待分配": "blue", "已分配": "cyan", "安装中": "orange", "已完成验收": "green",
    "在职": "green", "暂停": "yellow", "休假": "gray",
    "空闲": "green", "维护中": "yellow", "已报废": "red",
  };
  return m[s] ?? "gray";
};

// ══════════════════════════════════════════════════════════════════════════════
// DATA
// ══════════════════════════════════════════════════════════════════════════════

const INBOUND_ORDERS = [
  { id: "WH-IN-20250910-001", poId: "PO-20250910-001", supplier: "可口可乐（中国）", wh: "华南中心仓（深圳）", skus: 6, qty: 1440, status: "入库完成", received: 1420, diff: -20, created: "09-10 09:30", completed: "09-10 16:00", operator: "仓管-张三" },
  { id: "WH-IN-20250909-005", poId: "PO-20250909-005", supplier: "农夫山泉股份", wh: "华南中心仓（深圳）", skus: 3, qty: 2400, status: "入库完成", received: 2400, diff: 0, created: "09-09 14:00", completed: "09-09 18:30", operator: "仓管-李四" },
  { id: "WH-IN-20250910-003", poId: "PO-20250910-003", supplier: "百事食品（中国）", wh: "华东中心仓（上海）", skus: 4, qty: 800, status: "入库中", received: 480, diff: 0, created: "09-10 10:00", completed: "—", operator: "仓管-王五" },
  { id: "WH-IN-20250910-004", poId: "PO-20250910-004", supplier: "元气森林（北京）", wh: "华南中心仓（深圳）", skus: 2, qty: 600, status: "待入库", received: 0, diff: 0, created: "09-10 13:00", completed: "—", operator: "—" },
  { id: "WH-IN-20250908-009", poId: "PO-20250908-009", supplier: "重庆自嗨锅食品", wh: "华北中心仓（北京）", skus: 2, qty: 360, status: "收货异常", received: 200, diff: -160, created: "09-08 08:30", completed: "—", operator: "仓管-赵六" },
];

const OUTBOUND_ORDERS = [
  { id: "WH-OUT-20250910-012", batchNo: "BC-20250910-003", wh: "华南中心仓（深圳）", dest: "深圳区域配送点", driver: "王师傅", vehicle: "粤B 88888", skus: 8, qty: 360, status: "已出库", created: "09-10 07:30", completed: "09-10 08:45" },
  { id: "WH-OUT-20250910-013", batchNo: "BC-20250910-004", wh: "华南中心仓（深圳）", dest: "深圳区域配送点", driver: "张师傅", vehicle: "粤B 77777", skus: 6, qty: 240, status: "出库中", created: "09-10 08:00", completed: "—" },
  { id: "WH-OUT-20250910-014", batchNo: "BC-20250910-005", wh: "华南中心仓（深圳）", dest: "广州区域配送点", driver: "—", vehicle: "—", skus: 5, qty: 180, status: "待出库", created: "09-10 08:30", completed: "—" },
  { id: "WH-OUT-20250909-011", batchNo: "BC-20250909-008", wh: "华东中心仓（上海）", dest: "上海区域配送点", driver: "刘师傅", vehicle: "沪A 66666", skus: 10, qty: 480, status: "已出库", created: "09-09 06:00", completed: "09-09 07:30" },
];

const DELIVERY_ORDERS = [
  {
    id: "DO-20250910-001",
    pointName: "深圳南山科技园 A3 栋大堂",
    pointCode: "DW-SZ-001",
    address: "深圳市南山区科技园区高新南九道 A3 栋 1F 大堂",
    lat: "22.5401",
    lng: "113.9523",
    currentBatch: 2,
    totalBatch: 5,
    status: "配送中",
    batchNo: "BC-20250910-003",
    route: "深圳南山线",
    driver: "王大志",
    vehicle: "粤B 88888",
    phone: "138-8888-0001",
    stops: 12,
    done: 8,
    qty: 174,
    eta: "09-10 18:00",
    createdTime: "2025-09-10 08:30",
    started: "09-10 09:00",
    skus: [
      { name: "可口可乐 330ml", qty: 48, unit: "罐" },
      { name: "农夫山泉 550ml", qty: 72, unit: "瓶" },
      { name: "乐事薯片原味 75g", qty: 30, unit: "包" },
      { name: "元气森林苏打水 480ml", qty: 24, unit: "瓶" },
    ],
    failReason: "",
  },
  {
    id: "DO-20250910-002",
    pointName: "上海虹桥天地购物中心 B1 餐饮区",
    pointCode: "DW-SH-002",
    address: "上海市闵行区申长路 688 号虹桥天地 B1 层中心广场",
    lat: "31.1945",
    lng: "121.3182",
    currentBatch: 1,
    totalBatch: 4,
    status: "待配送",
    batchNo: "BC-20250910-004",
    route: "上海闵行线",
    driver: "张建国",
    vehicle: "沪A 66666",
    phone: "139-7777-0002",
    stops: 9,
    done: 0,
    qty: 125,
    eta: "09-10 17:30",
    started: "—",
    skus: [
      { name: "统一冰红茶 500ml", qty: 60, unit: "瓶" },
      { name: "好丽友派 6枚", qty: 25, unit: "盒" },
      { name: "自热米饭 405g", qty: 40, unit: "盒" },
    ],
    failReason: "",
  },
  {
    id: "DO-20250910-003",
    pointName: "北京国贸中心 3 期 B3 停车场",
    pointCode: "DW-BJ-003",
    address: "北京市朝阳区建国门外大街 1 号国贸 3 期 B3 停车场 A 区",
    lat: "39.9087",
    lng: "116.4598",
    currentBatch: 5,
    totalBatch: 5,
    status: "履约完成",
    batchNo: "BC-20250910-001",
    route: "北京朝阳线",
    driver: "李师傅",
    vehicle: "京A 88990",
    phone: "186-6666-0003",
    stops: 7,
    done: 7,
    qty: 256,
    eta: "已完成",
    started: "09-10 07:00",
    skus: [
      { name: "农夫山泉 550ml", qty: 120, unit: "瓶" },
      { name: "可口可乐 330ml", qty: 96, unit: "罐" },
      { name: "光明莫斯利安 200g", qty: 40, unit: "盒" },
    ],
    failReason: "",
  },
  {
    id: "DO-20250910-004",
    pointName: "成都天府软件园 D 区 2 栋",
    pointCode: "DW-CD-004",
    address: "成都市高新区天府大道中段 1388 号天府软件园 D2 栋大堂",
    lat: "30.5432",
    lng: "104.0678",
    currentBatch: 2,
    totalBatch: 4,
    status: "履约失败",
    batchNo: "BC-20250910-006",
    route: "成都高新线",
    driver: "王配送",
    vehicle: "川A 5521B",
    phone: "155-5555-0004",
    stops: 8,
    done: 2,
    qty: 98,
    eta: "异常终止",
    started: "09-10 09:15",
    skus: [
      { name: "自热米饭 405g", qty: 30, unit: "盒" },
      { name: "乐事薯片原味 75g", qty: 68, unit: "包" },
    ],
    failReason: "智能柜柜门电子锁网络离线，现场物管因写字楼会议拒绝临时停电检修，需重排工单。",
  },
  {
    id: "DO-20250910-005",
    pointName: "杭州阿里巴巴西溪园区 5 号楼",
    pointCode: "DW-HZ-005",
    address: "杭州市余杭区文一西路 969 号西溪园区 5 号楼 2F 休息区",
    lat: "30.2789",
    lng: "120.0234",
    currentBatch: 3,
    totalBatch: 6,
    status: "配送中",
    batchNo: "BC-20250910-002",
    route: "杭州余杭线",
    driver: "周师傅",
    vehicle: "浙A 33412",
    phone: "187-4444-0005",
    stops: 11,
    done: 5,
    qty: 180,
    eta: "09-10 16:30",
    started: "09-10 08:00",
    skus: [
      { name: "元气森林苏打水 480ml", qty: 90, unit: "瓶" },
      { name: "好丽友派 6枚", qty: 40, unit: "盒" },
      { name: "可口可乐 330ml", qty: 50, unit: "罐" },
    ],
    failReason: "",
  },
  {
    id: "DO-20250910-006",
    pointName: "广州天河城购物中心 2F 中庭",
    pointCode: "DW-GZ-006",
    address: "广州市天河区天河路 208 号天河城购物中心 2F 中庭南侧",
    lat: "23.1345",
    lng: "113.3211",
    currentBatch: 1,
    totalBatch: 3,
    status: "待配送",
    batchNo: "BC-20250910-008",
    route: "广州天河线",
    driver: "赵阳",
    vehicle: "粤A 99881",
    phone: "135-3333-0006",
    stops: 6,
    done: 0,
    qty: 110,
    eta: "09-10 17:00",
    started: "—",
    skus: [
      { name: "统一冰红茶 500ml", qty: 50, unit: "瓶" },
      { name: "可口可乐 330ml", qty: 60, unit: "罐" },
    ],
    failReason: "",
  },
];

const PICKING_ORDERS = [
  { id: "PK-20250910-003", batchNo: "BC-20250910-003", wh: "华南中心仓（深圳）", picker: "分拣员-小张", skus: 8, totalQty: 360, pickedQty: 360, status: "已完成", started: "09-10 06:30", completed: "09-10 08:00" },
  { id: "PK-20250910-004", batchNo: "BC-20250910-004", wh: "华南中心仓（深圳）", picker: "分拣员-小李", skus: 6, totalQty: 240, pickedQty: 180, status: "分拣中", started: "09-10 07:30", completed: "—" },
  { id: "PK-20250910-005", batchNo: "BC-20250910-005", wh: "华南中心仓（深圳）", picker: "—", skus: 5, totalQty: 180, pickedQty: 0, status: "待分拣", started: "—", completed: "—" },
  { id: "PK-20250909-008", batchNo: "BC-20250909-008", wh: "华东中心仓（上海）", picker: "分拣员-小王", skus: 10, totalQty: 480, pickedQty: 480, status: "已完成", started: "09-09 05:30", completed: "09-09 07:00" },
];

const STAFF_LIST = [
  { id: "ST001", name: "王大志", phone: "138-8888-0001", area: "深圳南山/福田", vehicle: "粤B 88888", vehicleType: "厢式货车", today: 12, status: "在职", cert: "C1", onBoard: "2023-03-01" },
  { id: "ST002", name: "张建国", phone: "139-7777-0002", area: "深圳福田/罗湖", vehicle: "粤B 77777", vehicleType: "厢式货车", today: 9, status: "在职", cert: "C1", onBoard: "2022-08-15" },
  { id: "ST003", name: "陈师傅", phone: "136-6666-0003", area: "深圳龙华/宝安", vehicle: "粤B 55555", vehicleType: "厢式货车", today: 11, status: "在职", cert: "C1", onBoard: "2021-01-10" },
  { id: "ST004", name: "刘广远", phone: "135-5555-0004", area: "上海徐汇/静安", vehicle: "沪A 66666", vehicleType: "厢式货车", today: 15, status: "在职", cert: "C1", onBoard: "2023-06-01" },
  { id: "ST005", name: "周师傅", phone: "137-4444-0005", area: "深圳龙岗", vehicle: "粤B 44444", vehicleType: "面包车", today: 0, status: "休假", cert: "C1", onBoard: "2022-12-01" },
  { id: "ST006", name: "吴配送", phone: "133-3333-0006", area: "广州天河", vehicle: "粤A 33333", vehicleType: "面包车", today: 0, status: "暂停", cert: "C2", onBoard: "2024-01-15" },
];

const VEHICLE_LIST = [
  { id: "VH001", plate: "粤B 88888", type: "厢式货车4.2m", cap: "1500kg/35m³", driver: "王大志", area: "深圳", insure: "2026-06-30", annual: "2026-01-15", status: "配送中", mileage: "58,320km" },
  { id: "VH002", plate: "粤B 77777", type: "厢式货车4.2m", cap: "1500kg/35m³", driver: "张建国", area: "深圳", insure: "2026-08-31", annual: "2026-03-20", status: "配送中", mileage: "43,100km" },
  { id: "VH003", plate: "粤B 55555", type: "厢式货车4.2m", cap: "1500kg/35m³", driver: "陈师傅", area: "深圳", insure: "2025-12-31", annual: "2025-10-05", status: "配送中", mileage: "72,400km" },
  { id: "VH004", plate: "粤B 44444", type: "面包车", cap: "800kg/8m³", driver: "周师傅", area: "深圳", insure: "2026-04-30", annual: "2025-11-12", status: "空闲", mileage: "31,200km" },
  { id: "VH005", plate: "沪A 66666", type: "厢式货车4.2m", cap: "1500kg/35m³", driver: "刘广远", area: "上海", insure: "2026-10-31", annual: "2026-02-28", status: "配送中", mileage: "28,900km" },
  { id: "VH006", plate: "粤A 11111", type: "厢式货车6.8m", cap: "3000kg/55m³", driver: "—", area: "深圳", insure: "2025-11-30", annual: "2025-09-01", status: "维护中", mileage: "102,600km" },
];

type DispatchOrder = {
  id: string; warehouse: string; siteName: string; siteCode: string;
  province: string; city: string; district: string; detailAddr: string;
  batch: string; goodsTotal: number; orderDate: string; pushTime: string;
  expectDelivery: string; status: "待排车" | "已排车"; urgency: "普通" | "加急";
  deliveryNo?: string; deliveryWarehouse?: string; driver?: string;
  plate?: string; assignTime?: string;
  // legacy for MapView/workbench compatibility
  customer: string; location: string; devices: number; skus: number;
  qty: number; weight: string; dist: string; cluster: string;
  urgencyLabel?: string; created: string;
};

const DISPATCH_ORDERS: DispatchOrder[] = [
  // 待排车 (6 rows)
  { id: "BH-20260916-001", warehouse: "浦东仓", siteName: "陆家嘴金融中心大堂", siteCode: "SITE-SH-001", province: "上海", city: "上海", district: "浦东新区", detailAddr: "上海市浦东新区世纪大道88号国金中心1F大堂", batch: "BATCH-20260916-A", goodsTotal: 144, orderDate: "2026-09-16", pushTime: "2026-09-16 08:00", expectDelivery: "2026-09-16 14:00", status: "待排车", urgency: "普通", customer: "陆家嘴金融中心", location: "浦东新区世纪大道", devices: 3, skus: 6, qty: 144, weight: "86kg", dist: "8.2km", cluster: "浦东-陆家嘴", created: "2026-09-16 07:00" },
  { id: "BH-20260916-002", warehouse: "浦东仓", siteName: "张江高科园区D座", siteCode: "SITE-SH-002", province: "上海", city: "上海", district: "浦东新区", detailAddr: "上海市浦东新区张衡路618号张江高科技园区D座1F", batch: "BATCH-20260916-A", goodsTotal: 96, orderDate: "2026-09-16", pushTime: "2026-09-16 08:00", expectDelivery: "2026-09-16 13:30", status: "待排车", urgency: "加急", customer: "张江高科D座", location: "浦东新区张衡路", devices: 2, skus: 4, qty: 96, weight: "52kg", dist: "14.1km", cluster: "浦东-张江", created: "2026-09-16 07:15" },
  { id: "BH-20260916-003", warehouse: "闵行仓", siteName: "虹桥天地购物中心B1", siteCode: "SITE-SH-003", province: "上海", city: "上海", district: "闵行区", detailAddr: "上海市闵行区申长路688号虹桥天地B1层中心广场", batch: "BATCH-20260916-B", goodsTotal: 192, orderDate: "2026-09-16", pushTime: "2026-09-16 09:00", expectDelivery: "2026-09-16 15:00", status: "待排车", urgency: "普通", customer: "虹桥天地B1", location: "闵行区申长路", devices: 4, skus: 8, qty: 192, weight: "108kg", dist: "6.5km", cluster: "闵行-虹桥", created: "2026-09-16 07:20" },
  { id: "BH-20260916-004", warehouse: "闵行仓", siteName: "七宝万科广场3F", siteCode: "SITE-SH-004", province: "上海", city: "上海", district: "闵行区", detailAddr: "上海市闵行区漕宝路3366号七宝万科广场3F休闲区", batch: "BATCH-20260916-B", goodsTotal: 80, orderDate: "2026-09-16", pushTime: "2026-09-16 09:00", expectDelivery: "2026-09-16 15:30", status: "待排车", urgency: "普通", customer: "七宝万科广场", location: "闵行区漕宝路", devices: 2, skus: 5, qty: 80, weight: "48kg", dist: "4.2km", cluster: "闵行-七宝", created: "2026-09-16 07:30" },
  { id: "BH-20260916-005", warehouse: "浦东仓", siteName: "世博园区创新中心A栋", siteCode: "SITE-SH-005", province: "上海", city: "上海", district: "浦东新区", detailAddr: "上海市浦东新区世博大道1号世博园区创新中心A栋大堂", batch: "BATCH-20260916-C", goodsTotal: 240, orderDate: "2026-09-16", pushTime: "2026-09-16 10:00", expectDelivery: "2026-09-16 17:00", status: "待排车", urgency: "普通", customer: "世博创新中心A", location: "浦东新区世博大道", devices: 5, skus: 10, qty: 240, weight: "138kg", dist: "10.8km", cluster: "浦东-世博", created: "2026-09-16 07:45" },
  { id: "BH-20260916-006", warehouse: "浦东仓", siteName: "金桥国际商业广场B2", siteCode: "SITE-SH-006", province: "上海", city: "上海", district: "浦东新区", detailAddr: "上海市浦东新区金桥路金桥国际商业广场B2层超市入口", batch: "BATCH-20260916-C", goodsTotal: 72, orderDate: "2026-09-16", pushTime: "2026-09-16 10:00", expectDelivery: "2026-09-16 16:00", status: "待排车", urgency: "加急", customer: "金桥国际商业广场", location: "浦东新区金桥路", devices: 2, skus: 4, qty: 72, weight: "38kg", dist: "12.3km", cluster: "浦东-金桥", created: "2026-09-16 08:00" },
  // 已排车 (4 rows)
  { id: "BH-20260915-007", warehouse: "浦东仓", siteName: "浦东嘉里城购物中心1F", siteCode: "SITE-SH-007", province: "上海", city: "上海", district: "浦东新区", detailAddr: "上海市浦东新区花木路1号嘉里城购物中心1F主入口", batch: "BATCH-20260915-A", goodsTotal: 120, orderDate: "2026-09-15", pushTime: "2026-09-15 08:00", expectDelivery: "2026-09-15 14:00", status: "已排车", urgency: "普通", deliveryNo: "DEL-20260915-001", deliveryWarehouse: "浦东仓", driver: "王师傅", plate: "沪A·88888", assignTime: "2026-09-15 09:00", customer: "嘉里城购物中心", location: "浦东新区花木路", devices: 3, skus: 6, qty: 120, weight: "68kg", dist: "9.1km", cluster: "浦东-嘉里城", created: "2026-09-15 07:00" },
  { id: "BH-20260915-008", warehouse: "浦东仓", siteName: "上海科技馆旁写字楼", siteCode: "SITE-SH-008", province: "上海", city: "上海", district: "浦东新区", detailAddr: "上海市浦东新区世纪大道2000号科技馆旁嘉华国际2F办公区", batch: "BATCH-20260915-A", goodsTotal: 96, orderDate: "2026-09-15", pushTime: "2026-09-15 08:00", expectDelivery: "2026-09-15 15:00", status: "已排车", urgency: "普通", deliveryNo: "DEL-20260915-001", deliveryWarehouse: "浦东仓", driver: "王师傅", plate: "沪A·88888", assignTime: "2026-09-15 09:00", customer: "嘉华国际写字楼", location: "浦东新区世纪大道", devices: 2, skus: 4, qty: 96, weight: "52kg", dist: "8.8km", cluster: "浦东-科技馆", created: "2026-09-15 07:30" },
  { id: "BH-20260915-009", warehouse: "闵行仓", siteName: "莘庄地铁上盖商业中心", siteCode: "SITE-SH-009", province: "上海", city: "上海", district: "闵行区", detailAddr: "上海市闵行区莘朱路258号莘庄地铁站上盖商业中心B1层", batch: "BATCH-20260915-B", goodsTotal: 160, orderDate: "2026-09-15", pushTime: "2026-09-15 09:00", expectDelivery: "2026-09-15 16:00", status: "已排车", urgency: "普通", deliveryNo: "DEL-20260915-002", deliveryWarehouse: "闵行仓", driver: "张师傅", plate: "沪B·77777", assignTime: "2026-09-15 09:30", customer: "莘庄商业中心", location: "闵行区莘朱路", devices: 4, skus: 7, qty: 160, weight: "92kg", dist: "3.8km", cluster: "闵行-莘庄", created: "2026-09-15 08:00" },
  { id: "BH-20260915-010", warehouse: "闵行仓", siteName: "上海交大闵行校区食堂区", siteCode: "SITE-SH-010", province: "上海", city: "上海", district: "闵行区", detailAddr: "上海市闵行区东川路800号上海交通大学闵行校区西区食堂旁", batch: "BATCH-20260915-B", goodsTotal: 200, orderDate: "2026-09-15", pushTime: "2026-09-15 09:00", expectDelivery: "2026-09-15 17:00", status: "已排车", urgency: "加急", deliveryNo: "DEL-20260915-002", deliveryWarehouse: "闵行仓", driver: "张师傅", plate: "沪B·77777", assignTime: "2026-09-15 09:30", customer: "交大食堂区", location: "闵行区东川路", devices: 5, skus: 9, qty: 200, weight: "116kg", dist: "5.2km", cluster: "闵行-交大", created: "2026-09-15 08:30" },
];

type DispatchTrip = {
  id: string; date: string; freeSlots: number; scheduledCount: number;
  pendingOrders: number; pendingQty: number; scheduledOrders: number; scheduledQty: number;
  driver: string; plate: string; area: string; status: string;
  // legacy fields
  stops: number; qty: number; weight: string; depart: string;
};
const DISPATCH_TRIPS: DispatchTrip[] = [
  { id: "BC-20260916-001", date: "2026-09-16", freeSlots: 2, scheduledCount: 3, pendingOrders: 6, pendingQty: 824, scheduledOrders: 4, scheduledQty: 576, driver: "王师傅", plate: "沪A·88888", area: "浦东线", status: "分拣中", stops: 7, qty: 576, weight: "336kg", depart: "2026-09-16 09:30" },
  { id: "BC-20260916-002", date: "2026-09-16", freeSlots: 1, scheduledCount: 2, pendingOrders: 4, pendingQty: 432, scheduledOrders: 3, scheduledQty: 360, driver: "张师傅", plate: "沪B·77777", area: "闵行线", status: "分拣中", stops: 5, qty: 360, weight: "208kg", depart: "2026-09-16 10:00" },
  { id: "BC-20260915-001", date: "2026-09-15", freeSlots: 0, scheduledCount: 5, pendingOrders: 0, pendingQty: 0, scheduledOrders: 5, scheduledQty: 820, driver: "陈师傅", plate: "沪C·66666", area: "浦东-嘉里城线", status: "配送中", stops: 5, qty: 820, weight: "480kg", depart: "2026-09-15 09:00" },
  { id: "BC-20260915-002", date: "2026-09-15", freeSlots: 0, scheduledCount: 4, pendingOrders: 0, pendingQty: 0, scheduledOrders: 4, scheduledQty: 616, driver: "刘师傅", plate: "沪D·55555", area: "闵行-莘庄线", status: "配送中", stops: 4, qty: 616, weight: "360kg", depart: "2026-09-15 10:00" },
];
// keep legacy alias so existing references still compile
const TRIPS = DISPATCH_TRIPS;

// Delivery point for map
const MAP_PTS = [
  // 南山/科技园 cluster
  { id: "P01", x: 145, y: 185, name: "科技园北", status: "待排车", urgency: "普通" },
  { id: "P02", x: 162, y: 210, name: "天利中央", status: "待排车", urgency: "加急" },
  { id: "P03", x: 128, y: 220, name: "南山商业", status: "已排车", urgency: "普通" },
  { id: "P04", x: 155, y: 248, name: "海岸城", status: "已排车", urgency: "普通" },
  // 福田 cluster
  { id: "P05", x: 295, y: 178, name: "深房广场", status: "待排车", urgency: "普通" },
  { id: "P06", x: 315, y: 196, name: "中心区A", status: "待排车", urgency: "普通" },
  { id: "P07", x: 278, y: 210, name: "华强北", status: "待排车", urgency: "普通" },
  { id: "P08", x: 332, y: 218, name: "皇庭广场", status: "待排车", urgency: "加急" },
  { id: "P09", x: 305, y: 235, name: "福田保税", status: "已排车", urgency: "普通" },
  // 罗湖 cluster
  { id: "P10", x: 448, y: 192, name: "万象城", status: "待排车", urgency: "普通" },
  { id: "P11", x: 465, y: 215, name: "解放路", status: "待排车", urgency: "加急" },
  { id: "P12", x: 440, y: 230, name: "国贸商圈", status: "配送中", urgency: "普通" },
  { id: "P13", x: 475, y: 240, name: "东门步行街", status: "配送中", urgency: "普通" },
  // 龙华 cluster
  { id: "P14", x: 248, y: 108, name: "民治大道", status: "已排车", urgency: "普通" },
  { id: "P15", x: 268, y: 125, name: "东方广场", status: "已排车", urgency: "普通" },
  { id: "P16", x: 232, y: 130, name: "龙华广场", status: "已完成", urgency: "普通" },
  // 宝安 cluster
  { id: "P17", x: 105, y: 148, name: "宝安中心", status: "配送中", urgency: "普通" },
  { id: "P18", x: 88, y: 165, name: "西乡大道", status: "已完成", urgency: "普通" },
  { id: "P19", x: 112, y: 172, name: "航城广场", status: "已完成", urgency: "普通" },
  // 光明
  { id: "P20", x: 188, y: 88, name: "光明新城", status: "待排车", urgency: "普通" },
  { id: "P21", x: 165, y: 98, name: "光明凤凰城", status: "已完成", urgency: "普通" },
  // Scatter
  { id: "P22", x: 362, y: 155, name: "龙岗中心城", status: "已完成", urgency: "普通" },
  { id: "P23", x: 395, y: 170, name: "坂田国际", status: "配送中", urgency: "普通" },
  { id: "P24", x: 218, y: 268, name: "前海湾", status: "已完成", urgency: "普通" },
  { id: "P25", x: 352, y: 268, name: "盐田港", status: "已完成", urgency: "普通" },
];

// 师傅点位分布（静态演示数据，坐标与 MAP_PTS 同一 580×340 画布）
type TripStop = { x: number; y: number; name: string; status: "已配送" | "配送中" | "待配送" };
const TRIP_STOPS: Record<string, TripStop[]> = {
  "BC-20260916-001": [ // 王师傅 4 点
    { x: 145, y: 185, name: "科技园北", status: "已配送" },
    { x: 295, y: 178, name: "深房广场", status: "已配送" },
    { x: 332, y: 218, name: "皇庭广场", status: "配送中" },
    { x: 448, y: 192, name: "万象城", status: "待配送" },
  ],
  "BC-20260916-002": [ // 张师傅 3 点
    { x: 128, y: 220, name: "南山商业", status: "已配送" },
    { x: 278, y: 210, name: "华强北", status: "配送中" },
    { x: 465, y: 215, name: "解放路", status: "待配送" },
  ],
  "BC-20260915-001": [ // 陈师傅 5 点
    { x: 155, y: 248, name: "海岸城", status: "已配送" },
    { x: 248, y: 108, name: "民治大道", status: "已配送" },
    { x: 268, y: 125, name: "东方广场", status: "配送中" },
    { x: 305, y: 235, name: "福田保税", status: "待配送" },
    { x: 440, y: 230, name: "国贸商圈", status: "待配送" },
  ],
  "BC-20260915-002": [ // 刘师傅 4 点
    { x: 105, y: 148, name: "宝安中心", status: "已配送" },
    { x: 188, y: 88, name: "光明新城", status: "配送中" },
    { x: 315, y: 196, name: "中心区A", status: "待配送" },
    { x: 475, y: 240, name: "东门步行街", status: "待配送" },
  ],
};
const TRIP_STOP_COLOR: Record<TripStop["status"], string> = { "已配送": "#16A34A", "配送中": "#2563EB", "待配送": "#F97316" };

const WORKORDERS = [
  { id: "WO-20250910-001", type: "新机装机", customer: "蜂巢智能科技（深圳总部）", location: "南山区科技园北区北楼1F", device: "智柜 Pro X8 × 2台", assignee: "师傅-李国强", phone: "138-1234-5678", status: "安装中", priority: "高", created: "09-10 08:00", appt: "09-10 14:00", eta: "09-10 17:00" },
  { id: "WO-20250910-002", type: "新机装机", customer: "格林购物（天利中央广场）", location: "南山区天利中央广场B3-12", device: "智柜 Max X12 × 1台", assignee: "师傅-张卫东", phone: "139-5678-1234", status: "已分配", priority: "普通", created: "09-10 08:30", appt: "09-10 16:00", eta: "09-10 18:00" },
  { id: "WO-20250910-003", type: "设备移机", customer: "新零售运营（皇庭广场）", location: "福田区华强北皇庭广场1F-A5", device: "智柜 Pro X8 × 1台", assignee: "—", phone: "—", status: "待分配", priority: "高", created: "09-10 09:00", appt: "09-10 15:00", eta: "—" },
  { id: "WO-20250909-008", type: "设备撤机", customer: "都市生活（万象城）", location: "罗湖区万象城地下B2-C08", device: "智柜 Pro X8 × 1台", assignee: "师傅-陈伟强", phone: "136-9876-5432", status: "已完成验收", priority: "普通", created: "09-09 14:00", appt: "09-09 16:00", eta: "—" },
  { id: "WO-20250909-007", type: "维修保养", customer: "壹品生活（万象食家）", location: "罗湖区解放路万象食家2F", device: "智柜 Max X12 × 1台（制冷异常）", assignee: "师傅-李国强", phone: "138-1234-5678", status: "已完成验收", priority: "高", created: "09-09 10:00", appt: "09-09 11:30", eta: "—" },
  { id: "WO-20250910-004", type: "新机装机", customer: "壹品生活（光明新城）", location: "光明区光明新城购物广场3F", device: "智柜 Pro X8 × 1台", assignee: "—", phone: "—", status: "待分配", priority: "普通", created: "09-10 10:00", appt: "09-11 10:00", eta: "—" },
];

const TECH_STAFF = [
  { id: "TS01", name: "李国强", phone: "138-1234-5678", area: "深圳南山/福田", orders: 2, status: "忙碌", cert: "弱电工程师证" },
  { id: "TS02", name: "张卫东", phone: "139-5678-1234", area: "深圳南山/宝安", orders: 1, status: "有空", cert: "弱电工程师证" },
  { id: "TS03", name: "陈伟强", phone: "136-9876-5432", area: "深圳罗湖/龙岗", orders: 0, status: "有空", cert: "弱电工程师证" },
  { id: "TS04", name: "黄建明", phone: "135-1111-2222", area: "深圳龙华/光明", orders: 1, status: "有空", cert: "弱电工程师证" },
  { id: "TS05", name: "刘国栋", phone: "133-3333-4444", area: "广州/全区", orders: 3, status: "忙碌", cert: "弱电工程师证" },
];

// ── Engineer data ─────────────────────────────────────────────────────────────
type EngStatus = "在工" | "休假" | "离职";
const ENG_STATUS_COLOR: Record<EngStatus, "green" | "yellow" | "gray"> = {
  "在工": "green", "休假": "yellow", "离职": "gray",
};
const ENGINEER_ROWS = [
  { id: "EG001", name: "李国强", phone: "138-1234-5678", wh: "华南中心仓（深圳）", type: "装机", status: "在工" as EngStatus, joinDate: "2023-03-15", remark: "" },
  { id: "EG002", name: "张卫东", phone: "139-5678-1234", wh: "华南中心仓（深圳）", type: "装机", status: "在工" as EngStatus, joinDate: "2022-11-01", remark: "" },
  { id: "EG003", name: "陈伟强", phone: "136-9876-5432", wh: "华南中心仓（深圳）", type: "装机", status: "在工" as EngStatus, joinDate: "2023-07-20", remark: "" },
  { id: "EG004", name: "黄建明", phone: "135-1111-2222", wh: "华东中心仓（上海）", type: "装机", status: "休假" as EngStatus, joinDate: "2024-01-10", remark: "年假至月底" },
  { id: "EG005", name: "刘国栋", phone: "133-3333-4444", wh: "华东中心仓（上海）", type: "装机", status: "在工" as EngStatus, joinDate: "2021-06-01", remark: "" },
  { id: "EG006", name: "王小明", phone: "137-8888-9999", wh: "西南中心仓（成都）", type: "装机", status: "离职" as EngStatus, joinDate: "2022-04-01", remark: "2024-08离职" },
];

// ── WorkOrder data (v6 spec) ───────────────────────────────────────────────────
const WO_ROWS = [
  { id: "WO-20260916-001", siteCode: "SITE-SZ-088", site: "南山区科技园北区北楼", addr: "广东省深圳市南山区科技园北区北楼1F", lat: "22.5401", lng: "113.9523", cabinetModel: "智柜 Pro X8", cabinetCode: "CB-2026-0088", engineer: "李国强", status: "待分配", created: "2026-09-16 08:00", demandDate: "2026-09-17 14:00", finishDate: "" },
  { id: "WO-20260916-002", siteCode: "SITE-SZ-089", site: "天利中央广场",          addr: "广东省深圳市南山区天利中央广场B3-12",    lat: "22.5312", lng: "113.9388", cabinetModel: "智柜 Max X12", cabinetCode: "CB-2026-0089", engineer: "张卫东", status: "待处理", created: "2026-09-16 09:00", demandDate: "2026-09-17 16:00", finishDate: "" },
  { id: "WO-20260915-008", siteCode: "SITE-SZ-045", site: "华强北皇庭广场",        addr: "广东省深圳市福田区华强北皇庭广场1F-A5", lat: "22.5454", lng: "114.0878", cabinetModel: "智柜 Pro X8", cabinetCode: "CB-2026-0045", engineer: "陈伟强", status: "处理中", created: "2026-09-15 14:00", demandDate: "2026-09-16 10:00", finishDate: "" },
  { id: "WO-20260914-006", siteCode: "SITE-SZ-031", site: "万象城地下广场",        addr: "广东省深圳市罗湖区万象城地下B2-C08",    lat: "22.5482", lng: "114.1219", cabinetModel: "智柜 Max X12", cabinetCode: "CB-2026-0031", engineer: "刘国栋", status: "已完成", created: "2026-09-14 10:00", demandDate: "2026-09-15 09:00", finishDate: "2026-09-15 17:30" },
  { id: "WO-20260913-003", siteCode: "SITE-SZ-102", site: "光明新城购物广场",      addr: "广东省深圳市光明区光明新城购物广场3F",  lat: "22.7781", lng: "113.9288", cabinetModel: "智柜 Pro X8", cabinetCode: "", engineer: "", status: "待分配", created: "2026-09-13 11:00", demandDate: "2026-09-18 10:00", finishDate: "" },
  { id: "WO-20260912-001", siteCode: "SITE-SZ-022", site: "万象食家",              addr: "广东省深圳市罗湖区解放路万象食家2F",    lat: "22.5531", lng: "114.1178", cabinetModel: "智柜 Max X12", cabinetCode: "CB-2026-0022", engineer: "李国强", status: "已取消", created: "2026-09-12 08:30", demandDate: "2026-09-13 14:00", finishDate: "" },
];
const WO_STATUS_COLOR: Record<string, BC> = {
  "待分配": "orange", "待处理": "blue", "处理中": "cyan", "已完成": "green", "已取消": "gray",
};
const CABINET_MODELS = ["智柜 Pro X8", "智柜 Max X12", "智柜 Mini S6", "智柜 Ultra X20"];

// ══════════════════════════════════════════════════════════════════════════════
// PAGE 1 – INBOUND LIST 入库单列表
// ══════════════════════════════════════════════════════════════════════════════

const statusColors2 = (s: string): BC => {
  const m: Record<string,BC> = {
    "待分车":"blue","分车中":"cyan","待分拣":"orange","分拣中":"yellow",
    "待配送":"orange","配送中":"cyan","履约完成":"green","履约失败":"red",
    "未入库":"blue","部分入库":"yellow","入库完成":"green",
  };
  return m[s] ?? "gray";
};

const WH_OPTIONS = [
  {label:"全部仓库",value:""},
  {label:"华南中心仓（深圳）",value:"sz"},
  {label:"华东中心仓（上海）",value:"sh"},
  {label:"华北中心仓（北京）",value:"bj"},
  {label:"西南中心仓（成都）",value:"cd"},
];

const FF_STATUS_OPTIONS = [
  {label:"全部状态",value:""},
  {label:"待分车",value:"待分车"},{label:"分车中",value:"分车中"},
  {label:"待分拣",value:"待分拣"},{label:"分拣中",value:"分拣中"},
  {label:"待配送",value:"待配送"},{label:"配送中",value:"配送中"},
  {label:"履约完成",value:"履约完成"},{label:"履约失败",value:"履约失败"},
];

type IbListRow = {
  id:string; type:"采购入库"|"下架退回"; demandQty:number; actualQty:number;
  diffQty:number; lossQty:number;
  status:"待入库"|"部分入库"|"入库完成"; createdAt:string; creator:string; operator:string; completedAt:string;
};
const IB_LIST_ROWS: IbListRow[] = [
  {id:"IB-20250910-001",type:"采购入库",demandQty:1440,actualQty:1440,diffQty:0,lossQty:0,status:"入库完成",createdAt:"2025-09-10 09:30",creator:"采购-张三",operator:"仓管-李四",completedAt:"2025-09-10 16:00"},
  {id:"IB-20250910-002",type:"采购入库",demandQty:800,actualQty:480,diffQty:320,lossQty:5,status:"部分入库",createdAt:"2025-09-10 10:00",creator:"采购-王五",operator:"仓管-赵六",completedAt:"—"},
  {id:"IB-20250910-003",type:"下架退回",demandQty:120,actualQty:0,diffQty:0,lossQty:0,status:"待入库",createdAt:"2025-09-10 11:30",creator:"运营-小陈",operator:"—",completedAt:"—"},
  {id:"IB-20250909-008",type:"采购入库",demandQty:2400,actualQty:2400,diffQty:0,lossQty:0,status:"入库完成",createdAt:"2025-09-09 14:00",creator:"采购-张三",operator:"仓管-李四",completedAt:"2025-09-09 18:30"},
  {id:"IB-20250909-007",type:"下架退回",demandQty:60,actualQty:48,diffQty:8,lossQty:2,status:"入库完成",createdAt:"2025-09-09 10:00",creator:"运营-小陈",operator:"仓管-赵六",completedAt:"2025-09-09 12:00"},
  {id:"IB-20250908-005",type:"采购入库",demandQty:360,actualQty:200,diffQty:160,lossQty:12,status:"部分入库",createdAt:"2025-09-08 08:30",creator:"采购-王五",operator:"仓管-赵六",completedAt:"—"},
];

export const InboundList = ({ onDetail }: { onDetail: () => void }) => (
  <div>
    <PH title="入库单列表" crumbs={["首页","履约后台","单据管理","入库单列表"]}
      actions={<Btn variant="secondary" icon="download" size="sm">导出</Btn>} />
    <FB>
      <FL label="单号"><Inp placeholder="入库单号模糊搜索" icon="search" className="w-48" /></FL>
      <FL label="入库类型">
        <Sel className="w-36" options={[{label:"全部类型",value:""},{label:"采购入库",value:"采购入库"},{label:"下架退回",value:"下架退回"}]} />
      </FL>
      <FL label="仓库"><Sel className="w-44" options={WH_OPTIONS} /></FL>
      <FL label="状态"><Sel className="w-36" options={[{label:"全部状态",value:""},{label:"待入库",value:"待入库"},{label:"部分入库",value:"部分入库"},{label:"入库完成",value:"入库完成"}]} /></FL>
      <FL label="创建时间">
        <div className="flex items-center gap-1">
          <input type="date" className="h-9 border border-[#E2E8F0] rounded-md text-sm px-3 text-[#334155] focus:outline-none focus:border-[#2563EB]" />
          <span className="text-[#94A3B8] text-xs">至</span>
          <input type="date" className="h-9 border border-[#E2E8F0] rounded-md text-sm px-3 text-[#334155] focus:outline-none focus:border-[#2563EB]" />
        </div>
      </FL>
      <div className="flex items-end gap-2 ml-auto">
        <Btn variant="secondary">重置</Btn>
        <Btn variant="primary" icon="search">搜索</Btn>
      </div>
    </FB>
    <Card noPad>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse" style={{minWidth:"1300px"}}>
          <thead>
            <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
              {[
                {label:"入库单号",w:"160px"},{label:"入库类型",w:"100px"},
                {label:"需求入库商品总数",w:"130px",a:"right"},{label:"实际入库商品总数",w:"130px",a:"right"},
                {label:"入库总差异数",w:"110px",a:"right"},{label:"报损总数",w:"90px",a:"right"},
                {label:"状态",w:"100px"},{label:"创建时间",w:"140px"},
                {label:"创建人",w:"90px"},{label:"入库操作人",w:"100px"},{label:"入库完成时间",w:"140px"},{label:"操作",w:"110px"},
              ].map(h => (
                <th key={h.label} style={{minWidth:h.w}}
                  className={`px-4 py-3 text-[11px] font-semibold text-[#64748B] uppercase tracking-wide whitespace-nowrap text-${(h as any).a||"left"}`}>
                  {h.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {IB_LIST_ROWS.map((r,i) => (
              <tr key={r.id} className={`border-b border-[#F1F5F9] hover:bg-[#F8FAFC] transition-colors ${i%2===1?"bg-[#FAFBFC]":""}`}>
                <td className="px-4 py-3.5 whitespace-nowrap">
                  <span className="font-mono text-xs font-medium text-[#2563EB] hover:underline cursor-pointer" onClick={onDetail}>{r.id}</span>
                </td>
                <td className="px-4 py-3.5 whitespace-nowrap">
                  <Badge label={r.type} color={r.type==="采购入库"?"blue":"purple"} />
                </td>
                <td className="px-4 py-3.5 text-right whitespace-nowrap font-medium text-[#334155]">{r.demandQty.toLocaleString()}</td>
                <td className="px-4 py-3.5 text-right whitespace-nowrap">
                  <span className={`font-medium ${r.actualQty < r.demandQty && r.actualQty > 0 ? "text-[#D97706]" : r.actualQty === r.demandQty && r.actualQty > 0 ? "text-[#16A34A]" : r.actualQty === 0 ? "text-[#94A3B8]" : "text-[#334155]"}`}>
                    {r.actualQty.toLocaleString()}
                  </span>
                </td>
                <td className="px-4 py-3.5 text-right whitespace-nowrap">
                  <span className={`font-medium ${r.diffQty > 0 ? "text-[#DC2626]" : "text-[#94A3B8]"}`}>{r.diffQty > 0 ? `+${r.diffQty}` : r.diffQty}</span>
                </td>
                <td className="px-4 py-3.5 text-right whitespace-nowrap">
                  <span className={`font-medium ${r.lossQty > 0 ? "text-[#D97706]" : "text-[#94A3B8]"}`}>{r.lossQty}</span>
                </td>
                <td className="px-4 py-3.5 whitespace-nowrap">
                  <Badge label={r.status} color={r.status==="入库完成"?"green":r.status==="部分入库"?"orange":"gray"} dot />
                </td>
                <td className="px-4 py-3.5 whitespace-nowrap text-xs text-[#64748B]">{r.createdAt}</td>
                <td className="px-4 py-3.5 whitespace-nowrap text-sm text-[#64748B]">{r.creator}</td>
                <td className="px-4 py-3.5 whitespace-nowrap text-sm text-[#64748B]">{r.operator}</td>
                <td className="px-4 py-3.5 whitespace-nowrap text-xs text-[#94A3B8]">{r.completedAt}</td>
                <td className="px-4 py-3.5 whitespace-nowrap">
                  <Btn variant="ghost" size="sm" onClick={onDetail}>查看入库详情</Btn>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pager total={32} />
    </Card>
  </div>
);

// ── InboundDetail ────────────────────────────────────────────────────────────
const IB_DETAIL_ITEMS = [
  {skuId:"SKU001",name:"矿泉水 550ml",batch:"BATCH-20250910-A",barcode:"6901234560011",demandQty:480,actualQty:480,loss:0},
  {skuId:"SKU002",name:"绿茶饮料 500ml",batch:"BATCH-20250910-A",barcode:"6901234560022",demandQty:360,actualQty:350,loss:5},
  {skuId:"SKU003",name:"薯片原味 75g",batch:"BATCH-20250910-B",barcode:"6901234560033",demandQty:240,actualQty:230,loss:3},
  {skuId:"SKU004",name:"即食燕麦 420g",batch:"BATCH-20250910-B",barcode:"6901234560044",demandQty:180,actualQty:180,loss:0},
  {skuId:"SKU005",name:"黑芝麻糊 320g",batch:"BATCH-20250910-C",barcode:"6901234560055",demandQty:180,actualQty:200,loss:0},
];

export const InboundDetail = ({ onBack }: { onBack: () => void }) => {
  const totalDemand = IB_DETAIL_ITEMS.reduce((s,r)=>s+r.demandQty,0);
  const totalActual = IB_DETAIL_ITEMS.reduce((s,r)=>s+r.actualQty,0);
  const totalLoss = IB_DETAIL_ITEMS.reduce((s,r)=>s+r.loss,0);
  const totalDiff = totalDemand - totalActual;

  return (
    <div>
      <div className="mb-5">
        <div className="flex items-center gap-1 text-xs text-[#94A3B8] mb-1.5">
          {["首页","履约后台","单据管理","入库单列表","入库单详情"].map((b,i,arr)=>(
            <span key={i} className="flex items-center gap-1">
              {i>0&&<Ic d={P.chevR} size={11}/>}
              <span className={i===arr.length-1?"text-[#64748B]":"hover:text-[#2563EB] cursor-pointer"}>{b}</span>
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="flex items-center gap-1.5 text-[#64748B] hover:text-[#334155] text-sm">
              <Ic d={P.chevL} size={16}/>返回
            </button>
            <div className="h-5 w-px bg-[#E2E8F0]"/>
            <h1 className="text-xl font-bold text-[#0F172A]">入库单详情</h1>
            <Badge label="履约完成" color="green" dot />
          </div>
        </div>
      </div>

      <Card className="mb-4">
        <div className="flex items-center gap-2 pb-4 mb-5 border-b border-[#F1F5F9]">
          <div className="w-1 h-4 rounded-full bg-[#2563EB]"/>
          <h2 className="text-sm font-semibold text-[#0F172A]">基本信息</h2>
        </div>
        <InfoGrid cols={3} items={[
          {label:"入库单号",value:<span className="font-mono text-xs font-bold text-[#2563EB]">IB-20250910-001</span>},
          {label:"入库类型",value:<Badge label="采购入库" color="blue"/>},
          {label:"入库仓库",value:"华南中心仓（深圳）"},
          {label:"入库单状态",value:<Badge label="履约完成" color="green" dot/>},
          {label:"入库操作人",value:"仓管-李四"},
          {label:"入库完成时间",value:"2025-09-10 16:00"},
          {label:"商品种类数",value:`${IB_DETAIL_ITEMS.length} 种`},
          {label:"需求入库总数",value:`${totalDemand.toLocaleString()} 件`},
          {label:"实际入库总数",value:<span className={totalActual===totalDemand?"text-[#16A34A] font-bold":"text-[#D97706] font-bold"}>{totalActual.toLocaleString()} 件</span>},
          {label:"入库总差异",value:<span className={totalDiff===0?"text-[#16A34A]":"text-[#DC2626] font-semibold"}>{totalDiff===0?"无差异":totalDiff>0?`少收 ${totalDiff} 件`:`多收 ${Math.abs(totalDiff)} 件`}</span>},
          {label:"报损总数",value:totalLoss>0?<span className="text-[#DC2626] font-semibold">{totalLoss} 件</span>:"0 件"},
          {label:"备注",value:"2025-09-10 采购入库批次，可口可乐品类"},
        ]} />
      </Card>

      <Card noPad>
        <div className="px-5 py-4 border-b border-[#E2E8F0] flex items-center gap-2">
          <div className="w-1 h-4 rounded-full bg-[#2563EB]"/>
          <h2 className="text-sm font-semibold text-[#0F172A]">入库商品明细</h2>
          <span className="text-xs text-[#94A3B8] ml-1">共 {IB_DETAIL_ITEMS.length} 个商品</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse" style={{minWidth:"900px"}}>
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                {["商品ID","商品名称","入库批次","69码","需求入库件数","实际入库件数","入库差异","报损数"].map(h => (
                  <th key={h} className="px-4 py-3 text-[11px] font-semibold text-[#64748B] uppercase tracking-wide whitespace-nowrap text-left">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {IB_DETAIL_ITEMS.map((r,i)=>{
                const diff = r.demandQty - r.actualQty;
                return (
                  <tr key={r.skuId}
                    className={`border-b border-[#F1F5F9] transition-colors ${diff!==0?"bg-[#FFFBEB]":i%2===1?"bg-[#FAFBFC] hover:bg-[#F8FAFC]":"hover:bg-[#F8FAFC]"}`}>
                    <td className="px-4 py-3.5"><span className="font-mono text-xs text-[#64748B]">{r.skuId}</span></td>
                    <td className="px-4 py-3.5 font-medium text-[#0F172A]">{r.name}</td>
                    <td className="px-4 py-3.5"><span className="font-mono text-xs text-[#94A3B8]">{r.batch}</span></td>
                    <td className="px-4 py-3.5"><span className="font-mono text-xs text-[#94A3B8]">{r.barcode}</span></td>
                    <td className="px-4 py-3.5 font-medium text-[#334155]">{r.demandQty}</td>
                    <td className="px-4 py-3.5">
                      <span className={`font-medium ${r.actualQty < r.demandQty?"text-[#D97706]":r.actualQty > r.demandQty?"text-[#7C3AED]":"text-[#16A34A]"}`}>{r.actualQty}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      {diff===0
                        ? <span className="text-xs text-[#16A34A] flex items-center gap-1"><Ic d={P.check} size={12}/>无差异</span>
                        : <span className={`text-xs font-semibold flex items-center gap-1 ${diff>0?"text-[#DC2626]":"text-[#7C3AED]"}`}>
                            <Ic d={P.alert} size={12}/>{diff>0?`少 ${diff} 件`:`多 ${Math.abs(diff)} 件`}
                          </span>}
                    </td>
                    <td className="px-4 py-3.5">
                      {r.loss>0?<span className="text-[#DC2626] font-semibold">{r.loss}</span>:<span className="text-[#94A3B8]">0</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="bg-[#F8FAFC] border-t-2 border-[#E2E8F0]">
                <td colSpan={4} className="px-4 py-3 text-xs font-semibold text-[#64748B]">合计</td>
                <td className="px-4 py-3 text-sm font-bold text-[#334155]">{totalDemand}</td>
                <td className="px-4 py-3 text-sm font-bold text-[#334155]">{totalActual}</td>
                <td className="px-4 py-3 text-sm font-bold text-[#DC2626]">{totalDiff===0?"—":totalDiff>0?`少 ${totalDiff}`:` 多 ${Math.abs(totalDiff)}`}</td>
                <td className="px-4 py-3 text-sm font-bold text-[#DC2626]">{totalLoss||"—"}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </Card>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// PAGE 2 – OUTBOUND LIST 出库单列表
// ══════════════════════════════════════════════════════════════════════════════
type ObRow = {
  id:string; replenishNo:string; type:"补货出库"; siteCode:string; siteName:string; siteGrade:string;
  cabinetCode:string; customer:string; batch:string; createMode:string; skus:number;
  status:string; createdAt:string; picker:string; pickDoneAt:string; driver:string; completedAt:string;
};
const OB_ROWS: ObRow[] = [
  {id:"OB-20250910-001",replenishNo:"REP-20250910-003",type:"补货出库",siteCode:"SITE-SZ-001",siteName:"南山科技园A3栋",siteGrade:"A",cabinetCode:"CAB-SZ-0023",customer:"蜂巢智能科技",batch:"BC-20250910-003",createMode:"系统自动",skus:6,status:"履约完成",createdAt:"2025-09-10 07:30",picker:"分拣-小张",pickDoneAt:"2025-09-10 08:00",driver:"王大志",completedAt:"2025-09-10 10:30"},
  {id:"OB-20250910-002",replenishNo:"REP-20250910-004",type:"补货出库",siteCode:"SITE-SH-002",siteName:"虹桥天地B1餐饮区",siteGrade:"A",cabinetCode:"CAB-SH-0011",customer:"格林购物",batch:"BC-20250910-004",createMode:"系统自动",skus:4,status:"分拣中",createdAt:"2025-09-10 08:00",picker:"分拣-小李",pickDoneAt:"—",driver:"—",completedAt:"—"},
  {id:"OB-20250910-003",replenishNo:"REP-20250910-005",type:"补货出库",siteCode:"SITE-SZ-003",siteName:"天河城2F中庭",siteGrade:"B",cabinetCode:"CAB-GZ-0005",customer:"新零售运营",batch:"BC-20250910-005",createMode:"手动创建",skus:3,status:"待分拣",createdAt:"2025-09-10 08:30",picker:"—",pickDoneAt:"—",driver:"—",completedAt:"—"},
  {id:"OB-20250910-004",replenishNo:"REP-20250910-006",type:"补货出库",siteCode:"SITE-BJ-004",siteName:"国贸中心3期B3",siteGrade:"S",cabinetCode:"CAB-BJ-0009",customer:"都市生活",batch:"BC-20250910-006",createMode:"系统自动",skus:5,status:"待分车",createdAt:"2025-09-10 09:00",picker:"—",pickDoneAt:"—",driver:"—",completedAt:"—"},
  {id:"OB-20250909-011",replenishNo:"REP-20250909-008",type:"补货出库",siteCode:"SITE-CD-005",siteName:"天府软件园D2栋",siteGrade:"B",cabinetCode:"CAB-CD-0003",customer:"壹品生活",batch:"BC-20250909-008",createMode:"系统自动",skus:8,status:"履约失败",createdAt:"2025-09-09 06:00",picker:"分拣-小王",pickDoneAt:"2025-09-09 07:00",driver:"王配送",completedAt:"—"},
];

export const OutboundList = ({ onDetail }: { onDetail: () => void }) => {
  const [selected, setSelected] = useState<string[]>([]);
  const toggleAll = () => setSelected(s => s.length === OB_ROWS.length ? [] : OB_ROWS.map(r=>r.id));
  const toggle = (id:string) => setSelected(s => s.includes(id) ? s.filter(x=>x!==id) : [...s,id]);
  const [sortModal, setSortModal] = useState<{ ids: string[] } | null>(null);
  const [sortDone, setSortDone] = useState(false);

  const confirmSort = () => { setSortDone(true); setTimeout(() => { setSortModal(null); setSortDone(false); }, 1400); };

  return (
    <div>
      {/* 推送分拣确认弹窗 */}
      {sortModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => !sortDone && setSortModal(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-[420px] p-6 flex flex-col items-center">
            {sortDone ? (
              <>
                <div className="w-14 h-14 rounded-full bg-[#DCFCE7] flex items-center justify-center mb-3">
                  <svg viewBox="0 0 24 24" className="w-7 h-7 text-[#16A34A]" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                </div>
                <div className="text-base font-semibold text-[#0F172A] mb-1">推送成功</div>
                <p className="text-sm text-[#64748B]">已推送 {sortModal.ids.length} 张出库单至分拣队列</p>
              </>
            ) : (
              <>
                <div className="w-14 h-14 rounded-full bg-[#FEF3C7] flex items-center justify-center mb-4">
                  <svg viewBox="0 0 24 24" className="w-7 h-7 text-[#D97706]" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                </div>
                <div className="text-base font-semibold text-[#0F172A] mb-1">确认推送分拣？</div>
                <p className="text-sm text-[#64748B] text-center mb-1">
                  即将推送 <span className="font-semibold text-[#0F172A]">{sortModal.ids.length}</span> 张出库单至分拣队列
                </p>
                <p className="text-xs text-[#94A3B8] mb-6">推送后分拣员将收到分拣任务，不可撤回</p>
                <div className="flex gap-3 w-full">
                  <button onClick={() => setSortModal(null)}
                    className="flex-1 h-10 rounded-xl border border-[#E2E8F0] text-sm font-medium text-[#64748B] hover:bg-[#F8FAFC] transition-colors">
                    取消
                  </button>
                  <button onClick={confirmSort}
                    className="flex-1 h-10 rounded-xl bg-[#2563EB] text-white text-sm font-semibold hover:bg-[#1D4ED8] transition-colors shadow-sm">
                    确认推送
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <PH title="出库单列表" crumbs={["首页","履约后台","单据管理","出库单列表"]}
        actions={<>
          <Btn variant="secondary" icon="download" size="sm">导出</Btn>
          <Btn variant="primary" size="sm" onClick={() => setSortModal({ ids: selected.length > 0 ? selected : OB_ROWS.map(r=>r.id) })}>
            批量推送分拣{selected.length>0?`（${selected.length}）`:""}
          </Btn>
        </>} />

      <div className="flex items-start gap-3 px-4 py-3 mb-4 rounded-xl border border-[#BFDBFE] bg-[#EFF6FF] text-sm text-[#1E40AF]">
        <Ic d={P.info} size={15} className="flex-shrink-0 mt-0.5"/>
        <span><strong>业务说明：</strong>推送分拣与排车分配配送师傅可以并行，也可以互为先后，无绝对先后顺序。两者均完成后方可开始配送。</span>
      </div>

      <FB>
        <FL label="单号"><Inp placeholder="出库单号模糊搜索" icon="search" className="w-48" /></FL>
        <FL label="出库类型"><Sel className="w-36" options={[{label:"全部类型",value:""},{label:"补货出库",value:"补货出库"}]} /></FL>
        <FL label="仓库"><Sel className="w-44" options={WH_OPTIONS} /></FL>
        <FL label="状态"><Sel className="w-36" options={FF_STATUS_OPTIONS} /></FL>
        <FL label="出单时间">
          <div className="flex items-center gap-1">
            <input type="date" className="h-9 border border-[#E2E8F0] rounded-md text-sm px-3 text-[#334155] focus:outline-none focus:border-[#2563EB]"/>
            <span className="text-[#94A3B8] text-xs">至</span>
            <input type="date" className="h-9 border border-[#E2E8F0] rounded-md text-sm px-3 text-[#334155] focus:outline-none focus:border-[#2563EB]"/>
          </div>
        </FL>
        <FL label="推送履约时间">
          <div className="flex items-center gap-1">
            <input type="date" className="h-9 border border-[#E2E8F0] rounded-md text-sm px-3 text-[#334155] focus:outline-none focus:border-[#2563EB]"/>
            <span className="text-[#94A3B8] text-xs">至</span>
            <input type="date" className="h-9 border border-[#E2E8F0] rounded-md text-sm px-3 text-[#334155] focus:outline-none focus:border-[#2563EB]"/>
          </div>
        </FL>
        <div className="flex items-end gap-2 ml-auto">
          <Btn variant="secondary">重置</Btn>
          <Btn variant="primary" icon="search">搜索</Btn>
        </div>
      </FB>

      <Card noPad>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse" style={{minWidth:"1600px"}}>
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                <th className="px-4 py-3 w-10">
                  <input type="checkbox" checked={selected.length===OB_ROWS.length} onChange={toggleAll} className="accent-[#2563EB]"/>
                </th>
                {[
                  {label:"出库单号",w:"150px"},{label:"关联补货单号",w:"150px"},{label:"出库类型",w:"90px"},
                  {label:"点位编码",w:"120px"},{label:"点位名称",w:"150px"},{label:"点位等级",w:"72px"},
                  {label:"柜体资产编码",w:"120px"},{label:"点位客户",w:"110px"},{label:"履约批次",w:"140px"},
                  {label:"创建方式",w:"90px"},{label:"商品总数",w:"80px",a:"right"},{label:"状态",w:"100px"},
                  {label:"单据创建时间",w:"140px"},{label:"分拣人员",w:"100px"},{label:"分拣完成时间",w:"130px"},
                  {label:"配送人员",w:"90px"},{label:"履约完成时间",w:"130px"},{label:"操作",w:"130px"},
                ].map(h=>(
                  <th key={h.label} style={{minWidth:h.w}}
                    className={`px-4 py-3 text-[11px] font-semibold text-[#64748B] uppercase tracking-wide whitespace-nowrap text-${(h as any).a||"left"}`}>
                    {h.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {OB_ROWS.map((r,i)=>(
                <tr key={r.id} className={`border-b border-[#F1F5F9] hover:bg-[#F8FAFC] transition-colors ${selected.includes(r.id)?"bg-[#EFF6FF]":i%2===1?"bg-[#FAFBFC]":""}`}>
                  <td className="px-4 py-3.5">
                    <input type="checkbox" checked={selected.includes(r.id)} onChange={()=>toggle(r.id)} className="accent-[#2563EB]"/>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span className="font-mono text-xs font-medium text-[#2563EB] hover:underline cursor-pointer" onClick={onDetail}>{r.id}</span>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span className="font-mono text-xs text-[#7C3AED] hover:underline cursor-pointer">{r.replenishNo}</span>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap"><Badge label={r.type} color="blue"/></td>
                  <td className="px-4 py-3.5 whitespace-nowrap"><span className="font-mono text-xs text-[#64748B]">{r.siteCode}</span></td>
                  <td className="px-4 py-3.5 whitespace-nowrap font-medium text-[#0F172A]">{r.siteName}</td>
                  <td className="px-4 py-3.5 whitespace-nowrap text-center">
                    <Badge label={r.siteGrade} color={r.siteGrade==="S"?"purple":r.siteGrade==="A"?"blue":"gray"}/>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap"><span className="font-mono text-xs text-[#94A3B8]">{r.cabinetCode}</span></td>
                  <td className="px-4 py-3.5 whitespace-nowrap text-sm text-[#64748B]">{r.customer}</td>
                  <td className="px-4 py-3.5 whitespace-nowrap"><span className="font-mono text-xs bg-[#F5F3FF] text-[#7C3AED] border border-[#DDD6FE] px-2 py-0.5 rounded-full">{r.batch}</span></td>
                  <td className="px-4 py-3.5 whitespace-nowrap text-xs text-[#64748B]">{r.createMode}</td>
                  <td className="px-4 py-3.5 text-right whitespace-nowrap font-medium text-[#334155]">{r.skus} 种</td>
                  <td className="px-4 py-3.5 whitespace-nowrap"><Badge label={r.status} color={statusColors2(r.status)} dot/></td>
                  <td className="px-4 py-3.5 whitespace-nowrap text-xs text-[#64748B]">{r.createdAt}</td>
                  <td className="px-4 py-3.5 whitespace-nowrap text-sm text-[#64748B]">{r.picker}</td>
                  <td className="px-4 py-3.5 whitespace-nowrap text-xs text-[#94A3B8]">{r.pickDoneAt}</td>
                  <td className="px-4 py-3.5 whitespace-nowrap text-sm text-[#64748B]">{r.driver}</td>
                  <td className="px-4 py-3.5 whitespace-nowrap text-xs text-[#94A3B8]">{r.completedAt}</td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <Btn variant="ghost" size="sm" onClick={onDetail}>详情</Btn>
                      <Btn variant="ghost" size="sm" className="!text-[#2563EB] hover:!bg-[#EFF6FF]" onClick={() => setSortModal({ ids: [r.id] })}>推送分拣</Btn>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pager total={48} />
      </Card>
    </div>
  );
};

// ── OutboundDetail ───────────────────────────────────────────────────────────
const OB_DETAIL_ITEMS = [
  {skuId:"SKU001",name:"矿泉水 550ml",barcode:"6901234560011",demandQty:240,actualQty:240},
  {skuId:"SKU002",name:"绿茶饮料 500ml",barcode:"6901234560022",demandQty:120,actualQty:115},
  {skuId:"SKU003",name:"薯片原味 75g",barcode:"6901234560033",demandQty:96,actualQty:96},
  {skuId:"SKU004",name:"即食燕麦 420g",barcode:"6901234560044",demandQty:60,actualQty:58},
  {skuId:"SKU005",name:"黑芝麻糊 320g",barcode:"6901234560055",demandQty:48,actualQty:48},
  {skuId:"SKU006",name:"元气森林苏打水 480ml",barcode:"6901234560066",demandQty:60,actualQty:60},
];

export const OutboundDetail = ({ onBack }: { onBack: () => void }) => {
  const totalDemand = OB_DETAIL_ITEMS.reduce((s,r)=>s+r.demandQty,0);
  const totalActual = OB_DETAIL_ITEMS.reduce((s,r)=>s+r.actualQty,0);
  const totalDiff = totalDemand - totalActual;

  return (
    <div>
      <div className="mb-5">
        <div className="flex items-center gap-1 text-xs text-[#94A3B8] mb-1.5">
          {["首页","履约后台","单据管理","出库单列表","出库单详情"].map((b,i,arr)=>(
            <span key={i} className="flex items-center gap-1">
              {i>0&&<Ic d={P.chevR} size={11}/>}
              <span className={i===arr.length-1?"text-[#64748B]":"hover:text-[#2563EB] cursor-pointer"}>{b}</span>
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="flex items-center gap-1.5 text-[#64748B] hover:text-[#334155] text-sm">
            <Ic d={P.chevL} size={16}/>返回
          </button>
          <div className="h-5 w-px bg-[#E2E8F0]"/>
          <h1 className="text-xl font-bold text-[#0F172A]">出库单详情</h1>
          <Badge label="履约完成" color="green" dot />
        </div>
      </div>

      <Card className="mb-4">
        <div className="flex items-center gap-2 pb-4 mb-5 border-b border-[#F1F5F9]">
          <div className="w-1 h-4 rounded-full bg-[#2563EB]"/>
          <h2 className="text-sm font-semibold text-[#0F172A]">基本信息</h2>
        </div>
        <InfoGrid cols={3} items={[
          {label:"出库单号",value:<span className="font-mono text-xs font-bold text-[#2563EB]">OB-20250910-001</span>},
          {label:"关联补货单号",value:<span className="font-mono text-xs text-[#7C3AED] hover:underline cursor-pointer">REP-20250910-003</span>},
          {label:"关联分拣单号",value:<span className="font-mono text-xs text-[#0891B2] hover:underline cursor-pointer">PK-20250910-003</span>},
          {label:"关联配送单号",value:<span className="font-mono text-xs text-[#16A34A] hover:underline cursor-pointer">DL-20250910-001</span>},
          {label:"出库类型",value:<Badge label="补货出库" color="blue"/>},
          {label:"出库仓库",value:"华南中心仓（深圳）"},
          {label:"出库单状态",value:<Badge label="履约完成" color="green" dot/>},
          {label:"运营员",value:"运营-小陈"},
          {label:"运营发起时间",value:"2025-09-10 07:30"},
          {label:"分拣操作人",value:"分拣-小张"},
          {label:"分拣完成时间",value:"2025-09-10 08:00"},
          {label:"配送人员",value:"王大志"},
          {label:"配送开始时间",value:"2025-09-10 09:00"},
          {label:"履约完成时间",value:"2025-09-10 10:30"},
          {label:"出库商品种类",value:`${OB_DETAIL_ITEMS.length} 种`},
          {label:"出库商品件总数",value:`${totalDemand} 件`},
          {label:"出库差异总数",value:totalDiff===0?<span className="text-[#16A34A]">无差异</span>:<span className="text-[#DC2626] font-semibold">差 {totalDiff} 件</span>},
          {label:"是否打印配送单据",value:<Badge label="已打印" color="green"/>},
          {label:"备注",value:"2025-09-10 早班补货出库"},
        ]} />
      </Card>

      <Card noPad>
        <div className="px-5 py-4 border-b border-[#E2E8F0] flex items-center gap-2">
          <div className="w-1 h-4 rounded-full bg-[#2563EB]"/>
          <h2 className="text-sm font-semibold text-[#0F172A]">出库商品明细</h2>
          <span className="text-xs text-[#94A3B8] ml-1">共 {OB_DETAIL_ITEMS.length} 个商品</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                {["商品ID","商品名称","69码","需求出库件数","实际出库件数"].map(h=>(
                  <th key={h} className="px-4 py-3 text-[11px] font-semibold text-[#64748B] uppercase tracking-wide whitespace-nowrap text-left">{h}</th>
                ))}
                <th className="px-4 py-3 text-[11px] font-semibold text-[#64748B] uppercase tracking-wide whitespace-nowrap text-left">
                  <span>出库差异</span>
                  <span className="ml-2 text-[10px] font-normal normal-case tracking-normal text-[#94A3B8] bg-[#F1F5F9] px-2 py-0.5 rounded-full">本期不开发分拣出库差异流程，仅做标记</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {OB_DETAIL_ITEMS.map((r,i)=>{
                const diff = r.demandQty - r.actualQty;
                return (
                  <tr key={r.skuId} className={`border-b border-[#F1F5F9] ${diff!==0?"bg-[#FFFBEB]":i%2===1?"bg-[#FAFBFC]":""}`}>
                    <td className="px-4 py-3.5"><span className="font-mono text-xs text-[#64748B]">{r.skuId}</span></td>
                    <td className="px-4 py-3.5 font-medium text-[#0F172A]">{r.name}</td>
                    <td className="px-4 py-3.5"><span className="font-mono text-xs text-[#94A3B8]">{r.barcode}</span></td>
                    <td className="px-4 py-3.5 font-medium text-[#334155]">{r.demandQty}</td>
                    <td className="px-4 py-3.5">
                      <span className={`font-medium ${r.actualQty<r.demandQty?"text-[#D97706]":"text-[#16A34A]"}`}>{r.actualQty}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      {diff===0
                        ? <span className="text-xs text-[#16A34A] flex items-center gap-1"><Ic d={P.check} size={12}/>无差异</span>
                        : <span className="text-xs font-semibold text-[#DC2626] flex items-center gap-1"><Ic d={P.alert} size={12}/>少 {diff} 件</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="bg-[#F8FAFC] border-t-2 border-[#E2E8F0]">
                <td colSpan={3} className="px-4 py-3 text-xs font-semibold text-[#64748B]">合计</td>
                <td className="px-4 py-3 font-bold text-[#334155]">{totalDemand}</td>
                <td className="px-4 py-3 font-bold text-[#334155]">{totalActual}</td>
                <td className="px-4 py-3 font-bold text-[#DC2626]">{totalDiff===0?"无差异":`差 ${totalDiff} 件`}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </Card>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// PAGE 3 – DELIVERY LIST 配送单列表
// ══════════════════════════════════════════════════════════════════════════════
type DlRow = {
  id:string; replenishNo:string; replenishCount:number; demandQty:number;
  driver:string; vehicle:string; status:string;
  progressDone:number; progressTotal:number;
  createdAt:string; startedAt:string; completedAt:string;
};
const DL_ROWS: DlRow[] = [
  {id:"DL-20250910-001",replenishNo:"REP-20250910-003",replenishCount:5,demandQty:360,driver:"王大志",vehicle:"粤B 88888",status:"履约完成",progressDone:5,progressTotal:5,createdAt:"2025-09-10 08:30",startedAt:"2025-09-10 09:00",completedAt:"2025-09-10 14:30"},
  {id:"DL-20250910-002",replenishNo:"REP-20250910-004",replenishCount:4,demandQty:240,driver:"张建国",vehicle:"粤B 77777",status:"配送中",progressDone:2,progressTotal:4,createdAt:"2025-09-10 08:00",startedAt:"2025-09-10 09:30",completedAt:"—"},
  {id:"DL-20250910-003",replenishNo:"REP-20250910-005",replenishCount:6,demandQty:180,driver:"陈师傅",vehicle:"粤B 55555",status:"待配送",progressDone:0,progressTotal:6,createdAt:"2025-09-10 09:00",startedAt:"—",completedAt:"—"},
  {id:"DL-20250909-008",replenishNo:"REP-20250909-008",replenishCount:3,demandQty:480,driver:"刘广远",vehicle:"沪A 66666",status:"履约完成",progressDone:3,progressTotal:3,createdAt:"2025-09-09 06:00",startedAt:"2025-09-09 07:00",completedAt:"2025-09-09 12:00"},
  {id:"DL-20250910-004",replenishNo:"REP-20250910-006",replenishCount:2,demandQty:98,driver:"王配送",vehicle:"川A 5521B",status:"履约失败",progressDone:1,progressTotal:2,createdAt:"2025-09-10 09:15",startedAt:"2025-09-10 09:15",completedAt:"—"},
];

export const DeliveryList = ({ onDetail }: { onDetail: () => void }) => {
  const [reassignOpen, setReassignOpen] = useState(false);
  const [reassignDriver, setReassignDriver] = useState("王大志");
  const [reassignVehicle, setReassignVehicle] = useState("粤B 88888");

  return (
    <div>
      <PH title="配送单列表" crumbs={["首页","履约后台","单据管理","配送单列表"]}
        actions={<Btn variant="secondary" icon="download" size="sm">导出</Btn>} />

      <FB>
        <FL label="配送单号"><Inp placeholder="配送单号模糊搜索" icon="search" className="w-44" /></FL>
        <FL label="配送人员">
          <Sel className="w-36" options={[{label:"全部人员",value:""},{label:"王大志",value:"wdz"},{label:"张建国",value:"zjg"},{label:"陈师傅",value:"csf"},{label:"刘广远",value:"lgy"}]} />
        </FL>
        <FL label="车辆">
          <Sel className="w-36" options={[{label:"全部车辆",value:""},{label:"粤B 88888",value:"v1"},{label:"粤B 77777",value:"v2"},{label:"粤B 55555",value:"v3"},{label:"沪A 66666",value:"v4"}]} />
        </FL>
        <FL label="状态">
          <Sel className="w-36" options={[{label:"全部状态",value:""},{label:"待配送",value:"待配送"},{label:"配送中",value:"配送中"},{label:"履约完成",value:"履约完成"},{label:"履约失败",value:"履约失败"}]} />
        </FL>
        <FL label="创建时间">
          <div className="flex items-center gap-1">
            <input type="date" className="h-9 border border-[#E2E8F0] rounded-md text-sm px-3 text-[#334155] focus:outline-none focus:border-[#2563EB]"/>
            <span className="text-[#94A3B8] text-xs">至</span>
            <input type="date" className="h-9 border border-[#E2E8F0] rounded-md text-sm px-3 text-[#334155] focus:outline-none focus:border-[#2563EB]"/>
          </div>
        </FL>
        <FL label="开始配送时间">
          <div className="flex items-center gap-1">
            <input type="date" className="h-9 border border-[#E2E8F0] rounded-md text-sm px-3 text-[#334155] focus:outline-none focus:border-[#2563EB]"/>
            <span className="text-[#94A3B8] text-xs">至</span>
            <input type="date" className="h-9 border border-[#E2E8F0] rounded-md text-sm px-3 text-[#334155] focus:outline-none focus:border-[#2563EB]"/>
          </div>
        </FL>
        <FL label="履约完成时间">
          <div className="flex items-center gap-1">
            <input type="date" className="h-9 border border-[#E2E8F0] rounded-md text-sm px-3 text-[#334155] focus:outline-none focus:border-[#2563EB]"/>
            <span className="text-[#94A3B8] text-xs">至</span>
            <input type="date" className="h-9 border border-[#E2E8F0] rounded-md text-sm px-3 text-[#334155] focus:outline-none focus:border-[#2563EB]"/>
          </div>
        </FL>
        <div className="flex items-end gap-2 ml-auto">
          <Btn variant="secondary">重置</Btn>
          <Btn variant="primary" icon="search">搜索</Btn>
        </div>
      </FB>

      <Card noPad>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse" style={{minWidth:"1200px"}}>
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                {[
                  {label:"配送单号",w:"150px"},{label:"关联补货单号",w:"150px"},{label:"关联补货单数",w:"100px",a:"right"},
                  {label:"需配送件数",w:"100px",a:"right"},{label:"配送人员",w:"100px"},{label:"配送进度",w:"140px"},{label:"车辆",w:"110px"},
                  {label:"状态",w:"100px"},{label:"创建时间",w:"140px"},{label:"开始配送时间",w:"140px"},
                  {label:"履约完成时间",w:"140px"},{label:"操作",w:"120px"},
                ].map(h=>(
                  <th key={h.label} style={{minWidth:h.w}}
                    className={`px-4 py-3 text-[11px] font-semibold text-[#64748B] uppercase tracking-wide whitespace-nowrap text-${(h as any).a||"left"}`}>
                    {h.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DL_ROWS.map((r,i)=>(
                <tr key={r.id} className={`border-b border-[#F1F5F9] hover:bg-[#F8FAFC] transition-colors ${i%2===1?"bg-[#FAFBFC]":""} ${r.status==="履约失败"?"bg-[#FEF2F2]":""}`}>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span className="font-mono text-xs font-medium text-[#2563EB] hover:underline cursor-pointer" onClick={onDetail}>{r.id}</span>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span className="font-mono text-xs text-[#7C3AED]">{r.replenishNo}</span>
                  </td>
                  <td className="px-4 py-3.5 text-right font-medium text-[#334155]">{r.replenishCount} 单</td>
                  <td className="px-4 py-3.5 text-right font-medium text-[#334155]">{r.demandQty} 件</td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded-full bg-[#EFF6FF] flex items-center justify-center flex-shrink-0">
                        <Ic d={P.users} size={12} className="text-[#2563EB]"/>
                      </div>
                      <span className="text-sm text-[#334155]">{r.driver}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden flex-shrink-0">
                        <div className="h-full rounded-full"
                          style={{ width: `${Math.round(r.progressDone / r.progressTotal * 100)}%`,
                            background: r.status === "履约失败" ? "#DC2626" : r.status === "履约完成" ? "#16A34A" : "#2563EB" }} />
                      </div>
                      <span className="text-xs text-[#64748B] font-medium">{r.progressDone}/{r.progressTotal} 点位</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span className="font-mono text-xs bg-[#F8FAFC] border border-[#E2E8F0] px-2 py-0.5 rounded text-[#334155]">{r.vehicle}</span>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap"><Badge label={r.status} color={statusColors2(r.status)} dot/></td>
                  <td className="px-4 py-3.5 whitespace-nowrap text-xs text-[#64748B]">{r.createdAt}</td>
                  <td className="px-4 py-3.5 whitespace-nowrap text-xs text-[#64748B]">{r.startedAt}</td>
                  <td className="px-4 py-3.5 whitespace-nowrap text-xs text-[#94A3B8]">{r.completedAt}</td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <Btn variant="ghost" size="sm" onClick={onDetail}>详情</Btn>
                      <Btn variant="ghost" size="sm" className="!text-[#D97706] hover:!bg-[#FFFBEB]" onClick={()=>setReassignOpen(true)}>重新分配</Btn>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pager total={24} />
      </Card>

      <Modal open={reassignOpen} onClose={()=>setReassignOpen(false)} title="重新分配配送资源"
        footer={<>
          <Btn variant="secondary" onClick={()=>setReassignOpen(false)}>取消</Btn>
          <Btn variant="primary" onClick={()=>setReassignOpen(false)}>确认重新分配</Btn>
        </>}>
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-3 rounded-lg border border-[#FDE68A] bg-[#FFFBEB] text-sm text-[#92400E]">
            <Ic d={P.alert} size={14} className="text-[#D97706] mt-0.5 flex-shrink-0"/>
            重新分配适用于调班、车辆故障等紧急场景。操作将立即通知原配送人员，并向新配送人员发送任务推送。
          </div>
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-4 py-3 text-xs text-[#64748B] space-y-1">
            <div className="flex justify-between"><span className="text-[#94A3B8]">当前配送单</span><span className="font-mono font-semibold">DL-20250910-001</span></div>
            <div className="flex justify-between"><span className="text-[#94A3B8]">当前配送人员</span><span>王大志</span></div>
            <div className="flex justify-between"><span className="text-[#94A3B8]">当前车辆</span><span className="font-mono">粤B 88888</span></div>
          </div>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-[#64748B] mb-1.5"><span className="text-[#DC2626] mr-0.5">*</span>重新选择配送人员</label>
              <Sel className="w-full" value={reassignDriver} onChange={setReassignDriver}
                options={[{label:"王大志 · 空闲",value:"王大志"},{label:"张建国 · 空闲",value:"张建国"},{label:"陈师傅 · 配送中",value:"陈师傅"},{label:"刘广远 · 空闲",value:"刘广远"}]} />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#64748B] mb-1.5"><span className="text-[#DC2626] mr-0.5">*</span>重新选择车辆</label>
              <Sel className="w-full" value={reassignVehicle} onChange={setReassignVehicle}
                options={[{label:"粤B 88888 · 厢式4.2m",value:"粤B 88888"},{label:"粤B 77777 · 厢式4.2m",value:"粤B 77777"},{label:"粤B 44444 · 面包车",value:"粤B 44444"},{label:"沪A 66666 · 厢式4.2m",value:"沪A 66666"}]} />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

// ── DeliveryDetail ───────────────────────────────────────────────────────────
const DL_REPLENISH_LIST = [
  {no:"REP-20250910-001",site:"南山科技园A3栋",addr:"南山区科技园南区A3栋1F大堂",batch:"BC-20250910-003",qty:72,ffBatch:"FF-2025091001",status:"履约完成"},
  {no:"REP-20250910-002",site:"天利中央广场B3",addr:"南山区天利中央广场B3-12",batch:"BC-20250910-003",qty:60,ffBatch:"FF-2025091002",status:"履约完成"},
  {no:"REP-20250910-003",site:"海岸城购物中心",addr:"南山区后海大道2068号",batch:"BC-20250910-003",qty:80,ffBatch:"FF-2025091003",status:"配送中"},
  {no:"REP-20250910-004",site:"深圳湾万象城",addr:"南山区深湾一路2号",batch:"BC-20250910-003",qty:90,ffBatch:"FF-2025091004",status:"待配送"},
  {no:"REP-20250910-005",site:"宝安中心A区",addr:"宝安区宝城中心路7号",batch:"BC-20250910-003",qty:58,ffBatch:"FF-2025091005",status:"待配送"},
];
const DL_SKU_LIST = [
  {skuId:"SKU001",name:"矿泉水 550ml",barcode:"6901234560011",qty:120,replenishNo:"REP-20250910-001"},
  {skuId:"SKU002",name:"绿茶饮料 500ml",barcode:"6901234560022",qty:96,replenishNo:"REP-20250910-002"},
  {skuId:"SKU003",name:"薯片原味 75g",barcode:"6901234560033",qty:72,replenishNo:"REP-20250910-003"},
  {skuId:"SKU004",name:"即食燕麦 420g",barcode:"6901234560044",qty:48,replenishNo:"REP-20250910-001"},
  {skuId:"SKU005",name:"元气森林苏打水 480ml",barcode:"6901234560055",qty:24,replenishNo:"REP-20250910-004"},
];

export const DeliveryDetail = ({ onBack }: { onBack: () => void }) => {
  const [skuModal, setSkuModal] = useState<typeof DL_REPLENISH_LIST[0] | null>(null);
  const modalSkus = skuModal ? DL_SKU_LIST.filter(s => s.replenishNo === skuModal.no) : [];

  return (
    <div>
      {/* 配送商品详情弹窗 */}
      {skuModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSkuModal(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2E8F0] flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-1 h-4 rounded-full bg-[#16A34A]" />
                <span className="text-base font-semibold text-[#0F172A]">配送商品详情</span>
                <span className="font-mono text-xs text-[#7C3AED] bg-[#F5F3FF] border border-[#DDD6FE] px-2 py-0.5 rounded-full">{skuModal.no}</span>
                <span className="text-sm text-[#64748B]">· {skuModal.site}</span>
              </div>
              <button onClick={() => setSkuModal(null)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F1F5F9] text-[#94A3B8] hover:text-[#334155] transition-colors">
                <Ic d={P.x} size={16} />
              </button>
            </div>
            <div className="overflow-y-auto flex-1">
              {modalSkus.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-[#94A3B8]">
                  <Ic d={P.inbox} size={32} className="mb-2 opacity-40" />
                  <span className="text-sm">暂无商品数据</span>
                </div>
              ) : (
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                      {["商品ID","商品名称","69码","数量","所属补货单"].map(h => (
                        <th key={h} className="px-5 py-3 text-[11px] font-semibold text-[#64748B] uppercase tracking-wide whitespace-nowrap text-left">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {modalSkus.map((r, i) => (
                      <tr key={r.skuId} className={`border-b border-[#F1F5F9] hover:bg-[#F8FAFC] ${i % 2 === 1 ? "bg-[#FAFBFC]" : ""}`}>
                        <td className="px-5 py-3.5"><span className="font-mono text-xs text-[#64748B]">{r.skuId}</span></td>
                        <td className="px-5 py-3.5 font-medium text-[#0F172A]">{r.name}</td>
                        <td className="px-5 py-3.5"><span className="font-mono text-xs text-[#94A3B8]">{r.barcode}</span></td>
                        <td className="px-5 py-3.5 font-medium text-[#334155]">{r.qty} 件</td>
                        <td className="px-5 py-3.5"><span className="font-mono text-xs text-[#7C3AED]">{r.replenishNo}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            <div className="px-6 py-3 border-t border-[#E2E8F0] flex justify-end flex-shrink-0">
              <Btn variant="secondary" size="sm" onClick={() => setSkuModal(null)}>关闭</Btn>
            </div>
          </div>
        </div>
      )}

      <div className="mb-5">
        <div className="flex items-center gap-1 text-xs text-[#94A3B8] mb-1.5">
          {["首页","履约后台","单据管理","配送单列表","配送单详情"].map((b,i,arr)=>(
            <span key={i} className="flex items-center gap-1">
              {i>0&&<Ic d={P.chevR} size={11}/>}
              <span className={i===arr.length-1?"text-[#64748B]":"hover:text-[#2563EB] cursor-pointer"}>{b}</span>
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="flex items-center gap-1.5 text-[#64748B] hover:text-[#334155] text-sm">
            <Ic d={P.chevL} size={16}/>返回
          </button>
          <div className="h-5 w-px bg-[#E2E8F0]"/>
          <h1 className="text-xl font-bold text-[#0F172A]">配送单详情</h1>
          <Badge label="配送中" color="cyan" dot/>
        </div>
      </div>

      <Card className="mb-4">
        <div className="flex items-center gap-2 pb-4 mb-5 border-b border-[#F1F5F9]">
          <div className="w-1 h-4 rounded-full bg-[#2563EB]"/>
          <h2 className="text-sm font-semibold text-[#0F172A]">基本信息</h2>
        </div>
        <InfoGrid cols={3} items={[
          {label:"配送单号",value:<span className="font-mono text-xs font-bold text-[#2563EB]">DL-20250910-001</span>},
          {label:"关联补货单号",value:<span className="font-mono text-xs text-[#7C3AED]">REP-20250910-003</span>},
          {label:"关联出库单号",value:<span className="font-mono text-xs text-[#0891B2]">OB-20250910-001</span>},
          {label:"关联补货单数",value:`${DL_REPLENISH_LIST.length} 单`},
          {label:"需配送商品件数",value:`${DL_SKU_LIST.reduce((s,r)=>s+r.qty,0)} 件`},
          {label:"配送人员",value:<div className="flex items-center gap-1.5"><div className="w-5 h-5 rounded-full bg-[#EFF6FF] flex items-center justify-center"><Ic d={P.users} size={11} className="text-[#2563EB]"/></div><span>王大志</span></div>},
          {label:"车辆",value:<span className="font-mono text-xs bg-[#F8FAFC] border border-[#E2E8F0] px-2 py-0.5 rounded">粤B 88888</span>},
          {label:"状态",value:<Badge label="配送中" color="cyan" dot/>},
          {label:"创建时间",value:"2025-09-10 08:30"},
          {label:"预计配送时间",value:"2025-09-10 18:00"},
          {label:"开始配送时间",value:"2025-09-10 09:00"},
          {label:"履约完成时间",value:"—"},
          {label:"备注",value:"早班深圳南山线配送"},
        ]} />
      </Card>

      <Card noPad>
        <div className="px-5 py-4 border-b border-[#E2E8F0] flex items-center gap-2">
          <div className="w-1 h-4 rounded-full bg-[#7C3AED]"/>
          <h2 className="text-sm font-semibold text-[#0F172A]">关联补货单列表</h2>
          <span className="text-xs text-[#94A3B8]">共 {DL_REPLENISH_LIST.length} 单</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                {["补货单号","点位名称","点位地址","补货批次","补货商品件数","补货履约批次","状态","操作"].map(h=>(
                  <th key={h} className="px-4 py-3 text-[11px] font-semibold text-[#64748B] uppercase tracking-wide whitespace-nowrap text-left">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DL_REPLENISH_LIST.map((r,i)=>(
                <tr key={r.no} className={`border-b border-[#F1F5F9] hover:bg-[#F8FAFC] ${i%2===1?"bg-[#FAFBFC]":""}`}>
                  <td className="px-4 py-3.5"><span className="font-mono text-xs font-medium text-[#7C3AED]">{r.no}</span></td>
                  <td className="px-4 py-3.5 font-medium text-[#0F172A]">{r.site}</td>
                  <td className="px-4 py-3.5 text-xs text-[#64748B] max-w-[180px] truncate" title={r.addr}>{r.addr}</td>
                  <td className="px-4 py-3.5"><span className="font-mono text-xs bg-[#F5F3FF] text-[#7C3AED] border border-[#DDD6FE] px-1.5 py-0.5 rounded-full">{r.batch}</span></td>
                  <td className="px-4 py-3.5 font-medium text-[#334155]">{r.qty} 件</td>
                  <td className="px-4 py-3.5"><span className="font-mono text-xs text-[#94A3B8]">{r.ffBatch}</span></td>
                  <td className="px-4 py-3.5"><Badge label={r.status} color={statusColors2(r.status)} dot/></td>
                  <td className="px-4 py-3.5"><Btn variant="ghost" size="sm" onClick={() => setSkuModal(r)}>配送商品详情</Btn></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// PAGE 4 – PICKING LIST 分拣单列表
// ══════════════════════════════════════════════════════════════════════════════
type PkRow = {
  id:string; outboundNo:string; replenishNo:string; siteName:string; siteAddr:string;
  ffBatch:string; siteCode:string; orderType:string; demandQty:number; actualQty:number;
  picker:string; createdAt:string; completedAt:string; status:string;
};
const PK_ROWS: PkRow[] = [
  {id:"PK-20250910-001",outboundNo:"OB-20250910-001",replenishNo:"REP-20250910-003",siteName:"南山科技园A3栋",siteAddr:"南山区科技园南区A3栋1F大堂",ffBatch:"BC-20250910-003",siteCode:"SITE-SZ-001",orderType:"补货出库",demandQty:360,actualQty:360,picker:"分拣-小张",createdAt:"2025-09-10 06:30",completedAt:"2025-09-10 08:00",status:"待配送"},
  {id:"PK-20250910-002",outboundNo:"OB-20250910-002",replenishNo:"REP-20250910-004",siteName:"虹桥天地B1餐饮区",siteAddr:"闵行区申长路688号虹桥天地B1层",ffBatch:"BC-20250910-004",siteCode:"SITE-SH-002",orderType:"补货出库",demandQty:240,actualQty:180,picker:"分拣-小李",createdAt:"2025-09-10 07:30",completedAt:"—",status:"分拣中"},
  {id:"PK-20250910-003",outboundNo:"OB-20250910-003",replenishNo:"REP-20250910-005",siteName:"天河城2F中庭",siteAddr:"天河区天河路208号天河城2F中庭",ffBatch:"BC-20250910-005",siteCode:"SITE-GZ-003",orderType:"补货出库",demandQty:180,actualQty:0,picker:"—",createdAt:"2025-09-10 08:30",completedAt:"—",status:"待分拣"},
  {id:"PK-20250909-008",outboundNo:"OB-20250909-011",replenishNo:"REP-20250909-008",siteName:"天府软件园D2栋",siteAddr:"高新区天府大道中段1388号D2栋",ffBatch:"BC-20250909-008",siteCode:"SITE-CD-005",orderType:"补货出库",demandQty:480,actualQty:480,picker:"分拣-小王",createdAt:"2025-09-09 05:30",completedAt:"2025-09-09 07:00",status:"待配送"},
];

export const PickingList = ({ onDetail }: { onDetail: () => void }) => {
  const [selPk, setSelPk] = useState<string[]>([]);
  const [batchPrintOpen, setBatchPrintOpen] = useState(false);
  const allChecked = selPk.length === PK_ROWS.length;
  const toggleAll = () => setSelPk(allChecked ? [] : PK_ROWS.map(r => r.id));
  const toggleOne = (id: string) => setSelPk(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  return (
  <div>
    <PH title="分拣单列表" crumbs={["首页","履约后台","单据管理","分拣单列表"]}
      actions={
        <div className="flex items-center gap-2">
          <Btn variant="secondary" icon="download" size="sm">导出</Btn>
          <Btn variant="secondary" size="sm" disabled={selPk.length === 0} onClick={() => setBatchPrintOpen(true)}>
            <Ic d={P.clipboard} size={13}/>批量打印{selPk.length > 0 ? `（${selPk.length}）` : ""}
          </Btn>
        </div>
      } />

    <div className="flex items-start gap-3 px-4 py-3 mb-4 rounded-xl border border-[#BFDBFE] bg-[#EFF6FF] text-sm text-[#1E40AF]">
      <Ic d={P.info} size={15} className="flex-shrink-0 mt-0.5"/>
      <span><strong>业务说明：</strong>排车分配配送师傅和分拣流程可以并行，也可以互为先后，无绝对先后顺序。两者均就绪后方可开始配送。</span>
    </div>

    <FB>
      <FL label="单号"><Inp placeholder="分拣单号模糊搜索" icon="search" className="w-44" /></FL>
      <FL label="分拣人员">
        <Sel className="w-36" options={[{label:"全部人员",value:""},{label:"分拣-小张",value:"xz"},{label:"分拣-小李",value:"xl"},{label:"分拣-小王",value:"xw"}]} />
      </FL>
      <FL label="状态">
        <Sel className="w-32" options={[{label:"全部状态",value:""},{label:"待分拣",value:"待分拣"},{label:"分拣中",value:"分拣中"},{label:"待配送",value:"待配送"}]} />
      </FL>
      <FL label="创建时间">
        <div className="flex items-center gap-1">
          <input type="date" className="h-9 border border-[#E2E8F0] rounded-md text-sm px-3 text-[#334155] focus:outline-none focus:border-[#2563EB]"/>
          <span className="text-[#94A3B8] text-xs">至</span>
          <input type="date" className="h-9 border border-[#E2E8F0] rounded-md text-sm px-3 text-[#334155] focus:outline-none focus:border-[#2563EB]"/>
        </div>
      </FL>
      <FL label="分拣完成时间">
        <div className="flex items-center gap-1">
          <input type="date" className="h-9 border border-[#E2E8F0] rounded-md text-sm px-3 text-[#334155] focus:outline-none focus:border-[#2563EB]"/>
          <span className="text-[#94A3B8] text-xs">至</span>
          <input type="date" className="h-9 border border-[#E2E8F0] rounded-md text-sm px-3 text-[#334155] focus:outline-none focus:border-[#2563EB]"/>
        </div>
      </FL>
      <div className="flex items-end gap-2 ml-auto">
        <Btn variant="secondary">重置</Btn>
        <Btn variant="primary" icon="search">搜索</Btn>
      </div>
    </FB>

    <Card noPad>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse" style={{minWidth:"1400px"}}>
          <thead>
            <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
              <th className="w-10 px-4 py-3">
                <input type="checkbox" checked={allChecked} onChange={toggleAll} className="w-4 h-4 accent-[#2563EB] cursor-pointer"/>
              </th>
              {[
                {label:"分拣单号",w:"150px"},{label:"关联出库单号",w:"150px"},{label:"关联补货单号",w:"150px"},
                {label:"点位名称",w:"150px"},{label:"点位地址",w:"180px"},{label:"履约批次",w:"130px"},
                {label:"点位编码",w:"120px"},{label:"订单类型",w:"90px"},{label:"需求件数",w:"80px",a:"right"},
                {label:"实际分拣件数",w:"100px",a:"right"},{label:"分拣人员",w:"100px"},
                {label:"分拣单创建时间",w:"140px"},{label:"分拣完成时间",w:"130px"},{label:"状态",w:"100px"},{label:"操作",w:"130px"},
              ].map(h=>(
                <th key={h.label} style={{minWidth:h.w}}
                  className={`px-4 py-3 text-[11px] font-semibold text-[#64748B] uppercase tracking-wide whitespace-nowrap text-${(h as any).a||"left"}`}>
                  {h.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PK_ROWS.map((r,i)=>{
              const complete = r.actualQty === r.demandQty && r.actualQty > 0;
              return (
                <tr key={r.id} className={`border-b border-[#F1F5F9] hover:bg-[#F8FAFC] transition-colors ${selPk.includes(r.id)?"bg-[#EFF6FF]":i%2===1?"bg-[#FAFBFC]":""}`}>
                  <td className="px-4 py-3.5 text-center">
                    <input type="checkbox" checked={selPk.includes(r.id)} onChange={() => toggleOne(r.id)} className="w-4 h-4 accent-[#2563EB] cursor-pointer"/>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span className="font-mono text-xs font-medium text-[#2563EB] hover:underline cursor-pointer" onClick={onDetail}>{r.id}</span>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap"><span className="font-mono text-xs text-[#0891B2]">{r.outboundNo}</span></td>
                  <td className="px-4 py-3.5 whitespace-nowrap"><span className="font-mono text-xs text-[#7C3AED]">{r.replenishNo}</span></td>
                  <td className="px-4 py-3.5 whitespace-nowrap font-medium text-[#0F172A]">{r.siteName}</td>
                  <td className="px-4 py-3.5 text-xs text-[#64748B] max-w-[176px] truncate" title={r.siteAddr}>{r.siteAddr}</td>
                  <td className="px-4 py-3.5 whitespace-nowrap"><span className="font-mono text-xs bg-[#F5F3FF] text-[#7C3AED] border border-[#DDD6FE] px-1.5 py-0.5 rounded-full">{r.ffBatch}</span></td>
                  <td className="px-4 py-3.5 whitespace-nowrap"><span className="font-mono text-xs text-[#94A3B8]">{r.siteCode}</span></td>
                  <td className="px-4 py-3.5 whitespace-nowrap"><Badge label={r.orderType} color="blue"/></td>
                  <td className="px-4 py-3.5 text-right font-medium text-[#334155]">{r.demandQty}</td>
                  <td className="px-4 py-3.5 text-right">
                    <span className={`font-medium ${complete?"text-[#16A34A]":r.actualQty>0?"text-[#D97706]":"text-[#94A3B8]"}`}>{r.actualQty}</span>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap text-sm text-[#64748B]">{r.picker}</td>
                  <td className="px-4 py-3.5 whitespace-nowrap text-xs text-[#64748B]">{r.createdAt}</td>
                  <td className="px-4 py-3.5 whitespace-nowrap text-xs text-[#94A3B8]">{r.completedAt}</td>
                  <td className="px-4 py-3.5 whitespace-nowrap"><Badge label={r.status} color={statusColors2(r.status)} dot/></td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <Btn variant="ghost" size="sm" onClick={onDetail}>详情</Btn>
                      <Btn variant="ghost" size="sm" className="!text-[#334155] hover:!bg-[#F1F5F9]">
                        <Ic d={P.clipboard} size={12}/>打印面单
                      </Btn>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Pager total={22} />
    </Card>

    {/* 批量打印确认弹窗 */}
    {batchPrintOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setBatchPrintOpen(false)}>
        <div className="bg-white rounded-xl shadow-2xl w-[480px] max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2E8F0]">
            <h2 className="text-[15px] font-semibold text-[#0F172A]">批量打印分拣面单</h2>
            <button onClick={() => setBatchPrintOpen(false)} className="w-7 h-7 flex items-center justify-center rounded-md text-[#94A3B8] hover:text-[#475569] hover:bg-[#F1F5F9]">
              <Ic d={P.x} size={16}/>
            </button>
          </div>
          <div className="px-5 py-4 space-y-3">
            <div className="flex items-start gap-2.5 px-3 py-2.5 rounded-lg bg-[#EFF6FF] border border-[#BFDBFE] text-xs text-[#1E40AF]">
              <Ic d={P.info} size={13} className="mt-0.5 flex-shrink-0"/>
              <span>将向默认打印机提交 {selPk.length} 张分拣面单，仅已分拣完成的单据建议打印。</span>
            </div>
            <div className="border border-[#E2E8F0] rounded-lg overflow-hidden">
              <div className="px-3 py-2 bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-semibold text-[#64748B] flex justify-between">
                <span>分拣单号</span><span>点位名称</span>
              </div>
              {PK_ROWS.filter(r => selPk.includes(r.id)).map(r => (
                <div key={r.id} className="flex justify-between items-center px-3 py-2 border-b border-[#F1F5F9] last:border-0 text-sm">
                  <span className="font-mono text-xs text-[#2563EB]">{r.id}</span>
                  <span className="text-[#334155]">{r.siteName}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-[#E2E8F0] bg-[#F8FAFC] rounded-b-xl">
            <Btn variant="secondary" onClick={() => setBatchPrintOpen(false)}>取消</Btn>
            <Btn variant="primary" onClick={() => { setBatchPrintOpen(false); setSelPk([]); }}>
              <Ic d={P.clipboard} size={13}/>确认打印 {selPk.length} 张
            </Btn>
          </div>
        </div>
      </div>
    )}
  </div>
  );
};

// ── PickingDetail ────────────────────────────────────────────────────────────
const PK_DETAIL_SKUS = [
  {skuId:"SKU001",name:"矿泉水 550ml",img:"💧",barcode:"6901234560011",price:2.5,stock:3200,onSale:true,demandQty:120,actualQty:120},
  {skuId:"SKU002",name:"绿茶饮料 500ml",img:"🍵",barcode:"6901234560022",price:4.0,stock:2800,onSale:true,demandQty:96,actualQty:96},
  {skuId:"SKU003",name:"薯片原味 75g",img:"🥔",barcode:"6901234560033",price:6.5,stock:1900,onSale:true,demandQty:72,actualQty:72},
  {skuId:"SKU004",name:"即食燕麦 420g",img:"🌾",barcode:"6901234560044",price:18.0,stock:640,onSale:false,demandQty:48,actualQty:0},
  {skuId:"SKU005",name:"元气森林苏打水 480ml",img:"🫧",barcode:"6901234560055",price:5.0,stock:420,onSale:true,demandQty:24,actualQty:0},
];

export const PickingDetail = ({ onBack }: { onBack: () => void }) => (
  <div>
    <div className="mb-5">
      <div className="flex items-center gap-1 text-xs text-[#94A3B8] mb-1.5">
        {["首页","履约后台","单据管理","分拣单列表","分拣单详情"].map((b,i,arr)=>(
          <span key={i} className="flex items-center gap-1">
            {i>0&&<Ic d={P.chevR} size={11}/>}
            <span className={i===arr.length-1?"text-[#64748B]":"hover:text-[#2563EB] cursor-pointer"}>{b}</span>
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="flex items-center gap-1.5 text-[#64748B] hover:text-[#334155] text-sm">
            <Ic d={P.chevL} size={16}/>返回
          </button>
          <div className="h-5 w-px bg-[#E2E8F0]"/>
          <h1 className="text-xl font-bold text-[#0F172A]">分拣单详情</h1>
          <Badge label="分拣中" color="yellow" dot/>
        </div>
        <Btn variant="dark" icon="clipboard">打印面单</Btn>
      </div>
    </div>

    <Card className="mb-4">
      <div className="flex items-center gap-2 pb-4 mb-5 border-b border-[#F1F5F9]">
        <div className="w-1 h-4 rounded-full bg-[#2563EB]"/>
        <h2 className="text-sm font-semibold text-[#0F172A]">基本信息</h2>
      </div>
      <InfoGrid cols={3} items={[
        {label:"分拣单编号",value:<span className="font-mono text-xs font-bold text-[#2563EB]">PK-20250910-002</span>},
        {label:"关联出库单号",value:<span className="font-mono text-xs text-[#0891B2]">OB-20250910-002</span>},
        {label:"关联补货单号",value:<span className="font-mono text-xs text-[#7C3AED]">REP-20250910-004</span>},
        {label:"点位名称",value:"虹桥天地B1餐饮区"},
        {label:"点位地址",value:"闵行区申长路688号虹桥天地B1层"},
        {label:"履约批次",value:<span className="font-mono text-xs bg-[#F5F3FF] text-[#7C3AED] border border-[#DDD6FE] px-1.5 py-0.5 rounded-full">BC-20250910-004</span>},
        {label:"点位编码",value:<span className="font-mono text-xs text-[#94A3B8]">SITE-SH-002</span>},
        {label:"订单类型",value:<Badge label="补货出库" color="blue"/>},
        {label:"需求件数",value:"240 件"},
        {label:"实际分拣件数",value:<span className="text-[#D97706] font-semibold">180 件</span>},
        {label:"下单人",value:"运营-小陈"},
        {label:"下单时间",value:"2025-09-10 08:00"},
        {label:"分拣人",value:"分拣-小李"},
        {label:"分拣完成时间",value:"进行中"},
      ]} />
    </Card>

    <Card noPad>
      <div className="px-5 py-4 border-b border-[#E2E8F0] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-1 h-4 rounded-full bg-[#D97706]"/>
          <h2 className="text-sm font-semibold text-[#0F172A]">补货商品明细</h2>
          <span className="text-xs text-[#94A3B8]">共 {PK_DETAIL_SKUS.length} 种商品</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#64748B]">
          <span className="text-[#D97706] font-semibold">{PK_DETAIL_SKUS.filter(r=>r.actualQty<r.demandQty).length}</span> 种未完成
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse" style={{minWidth:"900px"}}>
          <thead>
            <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
              {["主图","商品名称","商品69码","售价","预存量","出单时在售","补货需求数量","仓库分拣数量"].map(h=>(
                <th key={h} className="px-4 py-3 text-[11px] font-semibold text-[#64748B] uppercase tracking-wide whitespace-nowrap text-left">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PK_DETAIL_SKUS.map((r,i)=>{
              const done = r.actualQty >= r.demandQty;
              const inProgress = r.actualQty > 0 && r.actualQty < r.demandQty;
              return (
                <tr key={r.skuId}
                  className={`border-b border-[#F1F5F9] hover:bg-[#F8FAFC] transition-colors
                    ${!done && r.demandQty > 0 ? "bg-[#FFFBEB]" : i%2===1?"bg-[#FAFBFC]":""}`}>
                  <td className="px-4 py-3.5">
                    <div className="w-10 h-10 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-xl">{r.img}</div>
                  </td>
                  <td className="px-4 py-3.5 font-medium text-[#0F172A]">{r.name}</td>
                  <td className="px-4 py-3.5"><span className="font-mono text-xs text-[#94A3B8]">{r.barcode}</span></td>
                  <td className="px-4 py-3.5 font-medium text-[#334155]">¥{r.price.toFixed(1)}</td>
                  <td className="px-4 py-3.5 font-medium text-[#334155]">{r.stock.toLocaleString()}</td>
                  <td className="px-4 py-3.5">
                    {r.onSale
                      ? <span className="text-xs text-[#16A34A] flex items-center gap-1"><Ic d={P.check} size={12}/>在售</span>
                      : <span className="text-xs text-[#94A3B8]">已下架</span>}
                  </td>
                  <td className="px-4 py-3.5 font-medium text-[#334155]">{r.demandQty}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <span className={`font-semibold ${done?"text-[#16A34A]":inProgress?"text-[#D97706]":"text-[#94A3B8]"}`}>{r.actualQty}</span>
                      {!done && r.demandQty > 0 && (
                        <span className="text-xs text-[#D97706]">还差 {r.demandQty - r.actualQty}</span>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  </div>
);

// ══════════════════════════════════════════════════════════════════════════════
// PAGE 5 – STAFF MANAGEMENT 配送人员维护
// ══════════════════════════════════════════════════════════════════════════════

type StaffStatus = "在工" | "休假" | "离职";
type StaffRow = {
  id: string; name: string; phone: string; plate: string; vehicleType: string; load: string;
  wh: string; status: StaffStatus; joinDate: string; remark: string;
};

const STAFF_ROWS: StaffRow[] = [
  { id:"DR-001", name:"王大志", phone:"13800138001", plate:"粤B 88888", vehicleType:"厢式货车4.2m", load:"1500kg/35m³", wh:"华南中心仓（深圳）", status:"在工", joinDate:"2023-03-01", remark:"南山/福田主力配送" },
  { id:"DR-002", name:"张建国", phone:"13900139002", plate:"粤B 77777", vehicleType:"厢式货车4.2m", load:"1500kg/35m³", wh:"华南中心仓（深圳）", status:"在工", joinDate:"2022-08-15", remark:"福田/罗湖区域" },
  { id:"DR-003", name:"陈师傅", phone:"13700137003", plate:"粤B 55555", vehicleType:"厢式货车4.2m", load:"1500kg/35m³", wh:"华南中心仓（深圳）", status:"在工", joinDate:"2021-01-10", remark:"" },
  { id:"DR-004", name:"刘广远", phone:"13600136004", plate:"沪A 66666", vehicleType:"厢式货车4.2m", load:"1500kg/35m³", wh:"华东中心仓（上海）", status:"在工", joinDate:"2023-06-01", remark:"上海徐汇/静安" },
  { id:"DR-005", name:"周师傅", phone:"13500135005", plate:"粤B 44444", vehicleType:"面包车", load:"800kg/8m³", wh:"华南中心仓（深圳）", status:"休假", joinDate:"2022-12-01", remark:"年假" },
  { id:"DR-006", name:"吴配送", phone:"13400134006", plate:"粤A 33333", vehicleType:"面包车", load:"800kg/8m³", wh:"华南中心仓（深圳）", status:"离职", joinDate:"2024-01-15", remark:"2025-08-31 离职" },
];

const STAFF_STATUS_COLOR: Record<StaffStatus, BC> = {
  "在工": "green", "休假": "yellow", "离职": "gray",
};

const WH_OPTS = [
  { label:"全部仓库", value:"" },
  { label:"华南中心仓（深圳）", value:"sz" },
  { label:"华东中心仓（上海）", value:"sh" },
  { label:"华北中心仓（北京）", value:"bj" },
  { label:"西南中心仓（成都）", value:"cd" },
];

export const StaffList = ({ onCreate, onEdit }: { onCreate: () => void; onEdit: () => void }) => {
  const [statusModal, setStatusModal] = useState<StaffRow | null>(null);
  const [newStatus, setNewStatus] = useState<StaffStatus>("在工");
  const [rows, setRows] = useState<StaffRow[]>(STAFF_ROWS);

  const openStatus = (r: StaffRow) => { setStatusModal(r); setNewStatus(r.status); };
  const applyStatus = () => {
    if (!statusModal) return;
    setRows(rs => rs.map(r => r.id === statusModal.id ? { ...r, status: newStatus } : r));
    setStatusModal(null);
  };

  return (
    <div>
      <PH title="配送人员维护" crumbs={["首页","履约后台","排车管理","配送人员维护"]}
        actions={<>
          <Btn variant="secondary" icon="download" size="sm">导出</Btn>
          <Btn variant="primary" icon="plus" onClick={onCreate}>新增人员</Btn>
        </>} />

      {/* KPI */}
      <div className="grid grid-cols-4 gap-3 mb-4">
        <Stat label="在工人员" value={rows.filter(r=>r.status==="在工").length} color="#16A34A" icon="users" />
        <Stat label="休假人员" value={rows.filter(r=>r.status==="休假").length} sub="暂不可派单" color="#D97706" icon="ban" />
        <Stat label="离职人员" value={rows.filter(r=>r.status==="离职").length} color="#94A3B8" icon="ban" />
        <Stat label="绑定仓库数" value={[...new Set(rows.map(r=>r.wh))].length} sub="多仓配送覆盖" color="#2563EB" icon="layers" />
      </div>

      {/* Filter */}
      <FB>
        <FL label="姓名"><Inp placeholder="模糊搜索姓名" icon="search" className="w-36" /></FL>
        <FL label="手机号"><Inp placeholder="模糊搜索手机号" icon="phone" className="w-40" /></FL>
        <FL label="绑定车牌"><Inp placeholder="模糊搜索车牌" className="w-36" /></FL>
        <FL label="绑定仓库"><Sel className="w-44" options={WH_OPTS} /></FL>
        <FL label="状态">
          <Sel className="w-28" options={[
            {label:"全部",value:""},{label:"在工",value:"在工"},
            {label:"休假",value:"休假"},{label:"离职",value:"离职"},
          ]} />
        </FL>
        <FL label="入职日期">
          <div className="flex items-center gap-1">
            <input type="date" className="h-9 border border-[#E2E8F0] rounded-md text-sm px-3 text-[#334155] focus:outline-none focus:border-[#2563EB]" />
            <span className="text-[#94A3B8] text-xs">至</span>
            <input type="date" className="h-9 border border-[#E2E8F0] rounded-md text-sm px-3 text-[#334155] focus:outline-none focus:border-[#2563EB]" />
          </div>
        </FL>
        <div className="flex items-end gap-2 ml-auto">
          <Btn variant="secondary">重置</Btn>
          <Btn variant="primary" icon="search">搜索</Btn>
        </div>
      </FB>

      {/* Table */}
      <Card noPad>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse" style={{minWidth:"1100px"}}>
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                {[
                  {label:"人员编码",w:"100px"},{label:"姓名",w:"100px"},{label:"手机号",w:"120px"},
                  {label:"绑定车辆车牌",w:"120px"},{label:"车辆型号",w:"130px"},{label:"载重",w:"110px"},
                  {label:"绑定仓库",w:"170px"},{label:"状态",w:"80px"},{label:"入职日期",w:"100px"},
                  {label:"备注",w:"140px"},{label:"操作",w:"150px"},
                ].map(h => (
                  <th key={h.label} style={{minWidth:h.w}}
                    className="px-4 py-3 text-[11px] font-semibold text-[#64748B] uppercase tracking-wide whitespace-nowrap text-left">
                    {h.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.id}
                  className={`border-b border-[#F1F5F9] hover:bg-[#F8FAFC] transition-colors
                    ${r.status==="离职"?"opacity-60":""} ${i%2===1?"bg-[#FAFBFC]":""}`}>
                  <td className="px-4 py-3.5">
                    <span className="font-mono text-xs font-medium text-[#64748B]">{r.id}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0
                        ${r.status==="在工"?"bg-[#EFF6FF] text-[#2563EB]":r.status==="休假"?"bg-[#FFFBEB] text-[#D97706]":"bg-[#F8FAFC] text-[#94A3B8]"}`}>
                        {r.name[0]}
                      </div>
                      <span className="font-medium text-[#0F172A]">{r.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="font-mono text-xs text-[#64748B]">{r.phone}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="font-mono text-xs bg-[#F8FAFC] border border-[#E2E8F0] px-2 py-0.5 rounded text-[#334155]">{r.plate}</span>
                  </td>
                  <td className="px-4 py-3.5 text-xs text-[#64748B]">{r.vehicleType}</td>
                  <td className="px-4 py-3.5 text-xs text-[#64748B]">{r.load}</td>
                  <td className="px-4 py-3.5 text-xs text-[#64748B]">{r.wh}</td>
                  <td className="px-4 py-3.5">
                    <Badge label={r.status} color={STAFF_STATUS_COLOR[r.status]} dot />
                  </td>
                  <td className="px-4 py-3.5 text-xs text-[#64748B]">{r.joinDate}</td>
                  <td className="px-4 py-3.5 text-xs text-[#94A3B8] max-w-[136px] truncate" title={r.remark}>
                    {r.remark || "—"}
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1">
                      <Btn variant="ghost" size="sm" icon="edit" onClick={onEdit}>编辑</Btn>
                      <Btn variant="ghost" size="sm"
                        className="!text-[#2563EB] hover:!bg-[#EFF6FF]"
                        onClick={() => openStatus(r)}>状态更新</Btn>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pager total={rows.length} />
      </Card>

      {/* Status update modal */}
      <Modal open={!!statusModal} onClose={() => setStatusModal(null)} title="更新人员状态"
        footer={<>
          <Btn variant="secondary" onClick={() => setStatusModal(null)}>取消</Btn>
          <Btn variant="primary" onClick={applyStatus}>确认更新</Btn>
        </>}>
        {statusModal && (
          <div className="space-y-4">
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-4 py-3 text-xs text-[#64748B] space-y-2">
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">人员编码</span>
                <span className="font-mono font-semibold">{statusModal.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">姓名</span>
                <span className="font-medium text-[#0F172A]">{statusModal.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">绑定车牌</span>
                <span className="font-mono">{statusModal.plate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#94A3B8]">当前状态</span>
                <Badge label={statusModal.status} color={STAFF_STATUS_COLOR[statusModal.status]} dot />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#64748B] mb-2">
                <span className="text-[#DC2626] mr-0.5">*</span>设置为新状态
              </label>
              <div className="flex gap-3">
                {(["在工","休假","离职"] as StaffStatus[]).map(s => (
                  <label key={s}
                    className={`flex items-center gap-2 px-4 py-2.5 border-2 rounded-xl cursor-pointer flex-1 text-sm transition-all
                      ${newStatus===s
                        ? s==="在工" ? "border-[#16A34A] bg-[#F0FDF4] text-[#16A34A] font-semibold"
                        : s==="休假" ? "border-[#D97706] bg-[#FFFBEB] text-[#D97706] font-semibold"
                        :              "border-[#64748B] bg-[#F8FAFC] text-[#64748B] font-semibold"
                        : "border-[#E2E8F0] text-[#334155] hover:border-[#CBD5E1]"}`}>
                    <input type="radio" checked={newStatus===s} onChange={() => setNewStatus(s)} className="accent-[#16A34A]"/>
                    {s}
                  </label>
                ))}
              </div>
              {newStatus === "离职" && (
                <div className="mt-3 flex items-start gap-2 p-3 rounded-lg border border-[#FECACA] bg-[#FEF2F2] text-xs text-[#991B1B]">
                  <Ic d={P.alert} size={13} className="text-[#DC2626] mt-0.5 flex-shrink-0"/>
                  设为离职后，该人员将从可派单列表中移除，已分配的未完成配送任务需手动重新分配。
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

// ── StaffForm (新增 / 编辑) ──────────────────────────────────────────────────
const VEHICLE_OPTS_SEARCH = [
  { value:"粤B 88888", label:"粤B 88888 · 厢式4.2m · 1500kg", type:"厢式货车4.2m", load:"1500kg/35m³" },
  { value:"粤B 77777", label:"粤B 77777 · 厢式4.2m · 1500kg", type:"厢式货车4.2m", load:"1500kg/35m³" },
  { value:"粤B 44444", label:"粤B 44444 · 面包车 · 800kg",    type:"面包车",       load:"800kg/8m³"   },
  { value:"粤A 11111", label:"粤A 11111 · 厢式6.8m · 3000kg", type:"厢式货车6.8m", load:"3000kg/55m³" },
  { value:"沪A 66666", label:"沪A 66666 · 厢式4.2m · 1500kg", type:"厢式货车4.2m", load:"1500kg/35m³" },
];

const SF = ({ label, required, children, hint, error }: {
  label: string; required?: boolean; children: ReactNode; hint?: string; error?: string;
}) => (
  <div>
    <label className="block text-xs font-medium text-[#64748B] mb-1.5">
      {required && <span className="text-[#DC2626] mr-0.5">*</span>}{label}
    </label>
    {children}
    {hint && !error && <p className="text-xs text-[#94A3B8] mt-1">{hint}</p>}
    {error && <p className="text-xs text-[#DC2626] mt-1 flex items-center gap-1"><Ic d={P.alert} size={11}/>{error}</p>}
  </div>
);

const SH = ({ color, title, subtitle }: { color: string; title: string; subtitle?: string }) => (
  <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-[#F1F5F9]">
    <div className="w-1 h-4 rounded-full" style={{background:color}}/>
    <div>
      <h2 className="text-sm font-semibold text-[#0F172A]">{title}</h2>
      {subtitle && <p className="text-xs text-[#94A3B8] mt-0.5">{subtitle}</p>}
    </div>
  </div>
);

type UploadFile = { name: string; size: string } | null;

const UploadZone = ({ label, required, hint, value, onChange }: {
  label: string; required?: boolean; hint?: string;
  value: UploadFile; onChange: (f: UploadFile) => void;
}) => (
  <SF label={label} required={required} hint={hint}>
    {value ? (
      <div className="flex items-center gap-3 px-3 py-2.5 border border-[#BBF7D0] bg-[#F0FDF4] rounded-lg">
        <Ic d={P.clipboard} size={15} className="text-[#16A34A] flex-shrink-0"/>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-[#0F172A] truncate">{value.name}</div>
          <div className="text-xs text-[#94A3B8]">{value.size}</div>
        </div>
        <button onClick={() => onChange(null)} className="text-[#94A3B8] hover:text-[#DC2626] transition-colors">
          <Ic d={P.x} size={15}/>
        </button>
      </div>
    ) : (
      <button
        onClick={() => onChange({ name: "示例文件.jpg", size: "1.2 MB" })}
        className="w-full border-2 border-dashed border-[#E2E8F0] rounded-lg py-4 flex flex-col items-center gap-1.5 text-[#94A3B8] hover:border-[#2563EB] hover:text-[#2563EB] transition-all">
        <Ic d={P.download} size={18}/>
        <span className="text-xs">点击上传或拖拽文件到此处</span>
        <span className="text-[10px] text-[#CBD5E1]">支持 JPG / PNG / PDF，单文件不超过 10MB</span>
      </button>
    )}
  </SF>
);

export const StaffForm = ({ onBack, isEdit = false }: { onBack: () => void; isEdit?: boolean }) => {
  const [name, setName] = useState(isEdit ? "王大志" : "");
  const [phone, setPhone] = useState(isEdit ? "13800138001" : "");
  const [idCard, setIdCard] = useState(isEdit ? "44030119900101****" : "");
  const [healthCert, setHealthCert] = useState<UploadFile>(isEdit ? {name:"健康证.jpg",size:"0.8 MB"} : null);
  const [idPhoto, setIdPhoto] = useState<UploadFile>(isEdit ? {name:"身份证正面.jpg",size:"1.1 MB"} : null);
  const [plate, setPlate] = useState(isEdit ? "粤B 88888" : "");
  const [wh, setWh] = useState(isEdit ? "华南中心仓（深圳）" : "");
  const [status, setStatus] = useState<StaffStatus>(isEdit ? "在工" : "在工");
  const [joinDate, setJoinDate] = useState(isEdit ? "2023-03-01" : "");
  const [cooperation, setCooperation] = useState("");
  const [billingNote, setBillingNote] = useState("");
  const [remark, setRemark] = useState(isEdit ? "南山/福田主力配送" : "");
  const [errors, setErrors] = useState<Record<string,string>>({});
  const [cancelConfirm, setCancelConfirm] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const selectedVehicle = VEHICLE_OPTS_SEARCH.find(v => v.value === plate);
  const isDirty = name || phone || plate || wh;

  const validate = () => {
    const e: Record<string,string> = {};
    if (!name.trim()) e.name = "请填写姓名";
    else if (name.length > 20) e.name = "姓名不超过20字符";
    if (!phone.trim()) e.phone = "请填写手机号";
    else if (!/^1[3-9]\d{9}$/.test(phone)) e.phone = "请输入正确的11位手机号";
    if (!idCard.trim()) e.idCard = "请填写身份证号";
    if (!idPhoto) e.idPhoto = "请上传身份证照片";
    if (!plate) e.plate = "请选择绑定车辆";
    if (!wh) e.wh = "请选择绑定仓库";
    if (!joinDate) e.joinDate = "请选择入职日期";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="mb-5">
        <div className="flex items-center gap-1 text-xs text-[#94A3B8] mb-1.5">
          {["首页","履约后台","排车管理","配送人员维护", isEdit?"编辑人员":"新增人员"].map((b,i,arr)=>(
            <span key={i} className="flex items-center gap-1">
              {i>0&&<Ic d={P.chevR} size={11}/>}
              <span className={i===arr.length-1?"text-[#64748B]":"hover:text-[#2563EB] cursor-pointer"}>{b}</span>
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => isDirty ? setCancelConfirm(true) : onBack()}
            className="flex items-center gap-1.5 text-[#64748B] hover:text-[#334155] text-sm transition-colors">
            <Ic d={P.chevL} size={16}/>返回
          </button>
          <div className="h-5 w-px bg-[#E2E8F0]"/>
          <h1 className="text-xl font-bold text-[#0F172A]">{isEdit ? "编辑配送人员" : "新增配送人员"}</h1>
        </div>
      </div>

      {/* ── 基本信息 ── */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-sm p-5 mb-4">
        <SH color="#2563EB" title="基本信息" />
        <div className="grid grid-cols-3 gap-x-6 gap-y-5">
          <SF label="姓名" required error={errors.name}>
            <div>
              <input value={name} onChange={e=>{setName(e.target.value.slice(0,20)); setErrors(er=>({...er,name:""}));}}
                placeholder="最长20字符"
                className={`w-full h-9 border rounded-md text-sm px-3 text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 transition-all
                  ${errors.name?"border-[#DC2626] focus:border-[#DC2626] focus:ring-[#FEE2E2]":"border-[#E2E8F0] focus:border-[#2563EB] focus:ring-[#DBEAFE]"}`}/>
              <div className="text-right text-xs text-[#94A3B8] mt-0.5">{name.length}/20</div>
            </div>
          </SF>
          <SF label="手机号" required error={errors.phone}>
            <input value={phone} onChange={e=>{setPhone(e.target.value); setErrors(er=>({...er,phone:""}));}}
              placeholder="11位手机号"
              className={`w-full h-9 border rounded-md text-sm px-3 text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 transition-all
                ${errors.phone?"border-[#DC2626] focus:border-[#DC2626] focus:ring-[#FEE2E2]":"border-[#E2E8F0] focus:border-[#2563EB] focus:ring-[#DBEAFE]"}`}/>
            {errors.phone && <p className="text-xs text-[#DC2626] mt-1 flex items-center gap-1"><Ic d={P.alert} size={11}/>{errors.phone}</p>}
          </SF>
          <SF label="身份证号" required error={errors.idCard}>
            <input value={idCard} onChange={e=>{setIdCard(e.target.value); setErrors(er=>({...er,idCard:""}));}}
              placeholder="18位身份证号"
              className={`w-full h-9 border rounded-md text-sm px-3 font-mono text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 transition-all
                ${errors.idCard?"border-[#DC2626] focus:border-[#DC2626] focus:ring-[#FEE2E2]":"border-[#E2E8F0] focus:border-[#2563EB] focus:ring-[#DBEAFE]"}`}/>
            {errors.idCard && <p className="text-xs text-[#DC2626] mt-1 flex items-center gap-1"><Ic d={P.alert} size={11}/>{errors.idCard}</p>}
          </SF>
          <SF label="入职日期" required error={errors.joinDate}>
            <input type="date" value={joinDate} onChange={e=>{setJoinDate(e.target.value); setErrors(er=>({...er,joinDate:""}));}}
              className={`w-full h-9 border rounded-md text-sm px-3 text-[#334155] focus:outline-none focus:ring-2 transition-all
                ${errors.joinDate?"border-[#DC2626] focus:border-[#DC2626] focus:ring-[#FEE2E2]":"border-[#E2E8F0] focus:border-[#2563EB] focus:ring-[#DBEAFE]"}`}/>
            {errors.joinDate && <p className="text-xs text-[#DC2626] mt-1 flex items-center gap-1"><Ic d={P.alert} size={11}/>{errors.joinDate}</p>}
          </SF>
          <SF label="状态" required>
            <div className="flex gap-2">
              {(["在工","休假","离职"] as StaffStatus[]).map(s=>(
                <label key={s}
                  className={`flex items-center gap-1.5 px-3 py-2 border-2 rounded-lg cursor-pointer text-sm flex-1 transition-all
                    ${status===s
                      ? s==="在工" ? "border-[#16A34A] bg-[#F0FDF4] text-[#16A34A] font-semibold"
                      : s==="休假" ? "border-[#D97706] bg-[#FFFBEB] text-[#D97706] font-semibold"
                      :              "border-[#64748B] bg-[#F8FAFC] text-[#64748B] font-semibold"
                      : "border-[#E2E8F0] text-[#334155] hover:border-[#CBD5E1]"}`}>
                  <input type="radio" checked={status===s} onChange={()=>setStatus(s)} className="w-3 h-3 accent-[#16A34A]"/>
                  {s}
                </label>
              ))}
            </div>
          </SF>
        </div>
      </div>

      {/* ── 证件上传 ── */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-sm p-5 mb-4">
        <SH color="#7C3AED" title="证件材料" subtitle="身份证照片为必填，健康证为选填" />
        <div className="grid grid-cols-2 gap-6">
          <UploadZone label="身份证照片" required value={idPhoto} onChange={f=>{setIdPhoto(f); setErrors(er=>({...er,idPhoto:""}));}} />
          {errors.idPhoto && <p className="text-xs text-[#DC2626] -mt-3 flex items-center gap-1"><Ic d={P.alert} size={11}/>{errors.idPhoto}</p>}
          <UploadZone label="健康证照片" hint="选填，建议上传有效期内健康证" value={healthCert} onChange={setHealthCert} />
        </div>
      </div>

      {/* ── 车辆与仓库绑定 ── */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-sm p-5 mb-4">
        <SH color="#16A34A" title="车辆与仓库绑定" subtitle="绑定后用于排车分配和配送任务执行" />
        <div className="grid grid-cols-3 gap-x-6 gap-y-5">
          <SF label="绑定车辆车牌" required error={errors.plate}>
            <div className={`relative`}>
              <select value={plate} onChange={e=>{setPlate(e.target.value); setErrors(er=>({...er,plate:""}));}}
                className={`w-full h-9 border rounded-md text-sm bg-white px-3 pr-8 appearance-none focus:outline-none focus:ring-2 cursor-pointer transition-all
                  ${errors.plate?"border-[#DC2626] focus:border-[#DC2626] focus:ring-[#FEE2E2]":"border-[#E2E8F0] focus:border-[#2563EB] focus:ring-[#DBEAFE]"} text-[#334155]`}>
                <option value="">请选择可用车辆</option>
                {VEHICLE_OPTS_SEARCH.map(v=><option key={v.value} value={v.value}>{v.label}</option>)}
              </select>
              <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none"><Ic d={P.chevD} size={14}/></span>
            </div>
            {errors.plate && <p className="text-xs text-[#DC2626] mt-1 flex items-center gap-1"><Ic d={P.alert} size={11}/>{errors.plate}</p>}
          </SF>
          <SF label="车辆型号" hint="根据绑定车牌自动带出，只读">
            <input value={selectedVehicle?.type || ""} disabled
              placeholder="选择车牌后自动填充"
              className="w-full h-9 border border-[#E2E8F0] rounded-md text-sm px-3 bg-[#F8FAFC] text-[#94A3B8] cursor-not-allowed"/>
          </SF>
          <SF label="载重" hint="根据绑定车牌自动带出，只读">
            <input value={selectedVehicle?.load || ""} disabled
              placeholder="选择车牌后自动填充"
              className="w-full h-9 border border-[#E2E8F0] rounded-md text-sm px-3 bg-[#F8FAFC] text-[#94A3B8] cursor-not-allowed"/>
          </SF>
          <SF label="绑定仓库" required error={errors.wh}>
            <div className="relative">
              <select value={wh} onChange={e=>{setWh(e.target.value); setErrors(er=>({...er,wh:""}));}}
                className={`w-full h-9 border rounded-md text-sm bg-white px-3 pr-8 appearance-none focus:outline-none focus:ring-2 cursor-pointer transition-all
                  ${errors.wh?"border-[#DC2626] focus:border-[#DC2626] focus:ring-[#FEE2E2]":"border-[#E2E8F0] focus:border-[#2563EB] focus:ring-[#DBEAFE]"} text-[#334155]`}>
                <option value="">请选择仓库</option>
                {WH_OPTS.filter(o=>o.value).map(o=><option key={o.value} value={o.label}>{o.label}</option>)}
              </select>
              <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none"><Ic d={P.chevD} size={14}/></span>
            </div>
            {errors.wh && <p className="text-xs text-[#DC2626] mt-1 flex items-center gap-1"><Ic d={P.alert} size={11}/>{errors.wh}</p>}
          </SF>
        </div>
      </div>

      {/* ── 合作与计费（待确认）── */}
      <div className="bg-white border-2 border-dashed border-[#FDE68A] rounded-xl p-5 mb-4">
        <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-[#FDE68A]">
          <div className="w-1 h-4 rounded-full bg-[#D97706]"/>
          <div>
            <h2 className="text-sm font-semibold text-[#92400E]">合作与计费方式</h2>
            <p className="text-xs text-[#D97706] mt-0.5 flex items-center gap-1">
              <Ic d={P.alert} size={11}/>待业务确认，以下字段枚举和规则请与业务方核对后再定稿
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-5">
          <SF label="合作方式" hint="待确认：固定费用（按月）/ 件数计费 / 其他">
            <select value={cooperation} onChange={e=>setCooperation(e.target.value)}
              className="w-full h-9 border border-[#FDE68A] rounded-md text-sm bg-[#FFFBEB] px-3 pr-8 appearance-none focus:outline-none text-[#334155] cursor-pointer">
              <option value="">请选择（待确认）</option>
              <option value="月薪">固定费用（按月）</option>
              <option value="件数">件数计费</option>
              <option value="其他">其他</option>
            </select>
          </SF>
          <SF label="计费备注" hint="待确认：如月薪金额、单件单价等">
            <input value={billingNote} onChange={e=>setBillingNote(e.target.value)}
              placeholder="待业务确认后补充"
              className="w-full h-9 border border-[#FDE68A] rounded-md text-sm bg-[#FFFBEB] px-3 text-[#334155] placeholder-[#D97706] focus:outline-none"/>
          </SF>
        </div>
      </div>

      {/* ── 备注 ── */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-sm p-5 mb-4">
        <SH color="#94A3B8" title="备注" subtitle="选填，最长200字符" />
        <textarea value={remark} onChange={e=>setRemark(e.target.value.slice(0,200))}
          placeholder="如：主要负责南山/福田区域配送，有夜班需求"
          rows={3}
          className="w-full border border-[#E2E8F0] rounded-lg text-sm px-3 py-2.5 text-[#334155] placeholder-[#94A3B8] resize-none focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#DBEAFE]"/>
        <div className="text-right text-xs text-[#94A3B8] mt-1">{remark.length}/200</div>
      </div>

      {/* Fixed bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-[#E2E8F0] bg-white shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
        <div className="flex items-center justify-between px-6 py-3 max-w-screen-2xl mx-auto">
          <p className="text-xs text-[#64748B] flex items-center gap-1.5">
            <Ic d={P.info} size={13} className="text-[#2563EB]"/>
            带 <span className="text-[#DC2626]">*</span> 为必填项。合作与计费字段待业务确认后再行配置。
          </p>
          <div className="flex gap-3">
            <Btn variant="secondary" onClick={() => isDirty ? setCancelConfirm(true) : onBack()}>取消</Btn>
            <Btn variant="primary" onClick={() => { if (validate()) setSaveSuccess(true); }}>保存</Btn>
          </div>
        </div>
      </div>

      {/* Cancel confirm */}
      {cancelConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={()=>setCancelConfirm(false)}/>
          <div className="relative bg-white rounded-xl shadow-xl border border-[#E2E8F0] w-[440px]">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2E8F0]">
              <h2 className="text-base font-semibold text-[#0F172A]">确认离开？</h2>
              <button onClick={()=>setCancelConfirm(false)} className="text-[#94A3B8] hover:text-[#334155]"><Ic d={P.x} size={18}/></button>
            </div>
            <div className="px-5 py-4">
              <div className="flex items-start gap-3 rounded-lg border border-[#FDE68A] bg-[#FFFBEB] p-3">
                <Ic d={P.alert} size={15} className="text-[#D97706] mt-0.5 flex-shrink-0"/>
                <p className="text-sm text-[#92400E] leading-6">当前填写的人员信息尚未保存，离开后将丢失，确认取消吗？</p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-[#E2E8F0] bg-[#F8FAFC] rounded-b-xl">
              <Btn variant="secondary" onClick={()=>setCancelConfirm(false)}>继续填写</Btn>
              <Btn variant="danger" onClick={()=>{ setCancelConfirm(false); onBack(); }}>确认离开</Btn>
            </div>
          </div>
        </div>
      )}

      {/* Save success */}
      {saveSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"/>
          <div className="relative bg-white rounded-xl shadow-xl border border-[#E2E8F0] w-[480px]">
            <div className="px-6 py-8 text-center">
              <div className="w-16 h-16 rounded-full bg-[#EFF6FF] border-2 border-[#BFDBFE] flex items-center justify-center mx-auto mb-4">
                <Ic d={P.check} size={30} className="text-[#2563EB]"/>
              </div>
              <h2 className="text-lg font-bold text-[#0F172A] mb-1">{isEdit?"配送人员信息已更新":"配送人员创建成功"}</h2>
              <p className="text-sm text-[#64748B] mb-5">该人员现已可用于排车分配和配送任务执行。</p>
              <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg divide-y divide-[#F1F5F9] mb-6 text-left text-sm">
                <div className="flex justify-between px-4 py-3">
                  <span className="text-[#94A3B8]">姓名</span>
                  <span className="font-medium text-[#0F172A]">{name}</span>
                </div>
                <div className="flex justify-between px-4 py-3">
                  <span className="text-[#94A3B8]">手机号</span>
                  <span className="font-mono">{phone}</span>
                </div>
                <div className="flex justify-between px-4 py-3">
                  <span className="text-[#94A3B8]">绑定车牌</span>
                  <span className="font-mono">{plate}</span>
                </div>
                <div className="flex justify-between px-4 py-3">
                  <span className="text-[#94A3B8]">绑定仓库</span>
                  <span>{wh}</span>
                </div>
                <div className="flex justify-between px-4 py-3">
                  <span className="text-[#94A3B8]">状态</span>
                  <Badge label={status} color={STAFF_STATUS_COLOR[status]} dot/>
                </div>
              </div>
              <div className="flex gap-3 justify-center">
                <Btn variant="secondary" onClick={()=>{ setSaveSuccess(false); onBack(); }}>返回列表</Btn>
                <Btn variant="primary" onClick={()=>setSaveSuccess(false)}>继续编辑</Btn>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// PAGE 6 – VEHICLE MANAGEMENT 车辆维护
// ══════════════════════════════════════════════════════════════════════════════

const VH_ROWS = [
  { id: "V001", plate: "粤B·A1234", model: "福田祥菱M1", load: 800,  status: "可用",   remark: "" },
  { id: "V002", plate: "粤B·B5678", model: "长安神骐T20", load: 1000, status: "可用",   remark: "" },
  { id: "V003", plate: "粤B·C9012", model: "五菱荣光",   load: 600,  status: "维修中", remark: "刹车系统故障维修" },
  { id: "V004", plate: "粤A·D3456", model: "江淮骏铃V6", load: 1500, status: "可用",   remark: "" },
  { id: "V005", plate: "粤A·E7890", model: "东风小霸王", load: 500,  status: "已报废", remark: "车龄超限已注销" },
  { id: "V006", plate: "粤C·F2345", model: "福田祥菱M2", load: 1000, status: "可用",   remark: "" },
];
const VH_STATUS_COLOR: Record<string, "green" | "yellow" | "red" | "gray"> = {
  "可用": "green", "维修中": "yellow", "已报废": "red",
};

export const VehicleList = ({ onCreate, onEdit }: { onCreate: () => void; onEdit: () => void }) => {
  const [plate, setPlate] = useState("");
  const [model, setModel] = useState("");
  const [statusF, setStatusF] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [statusModal, setStatusModal] = useState<null | typeof VH_ROWS[0]>(null);
  const [newStatus, setNewStatus] = useState("");

  const rows = VH_ROWS.filter(r =>
    (!plate || r.plate.includes(plate)) &&
    (!model || r.model.includes(model)) &&
    (!statusF || r.status === statusF)
  );

  return (
    <div>
      <PH title="车辆管理" crumbs={["首页", "履约管理", "排车管理", "车辆管理"]}
        actions={
          <>
            <Btn variant="secondary" icon="download" size="sm">导出</Btn>
            <Btn variant="primary" icon="plus" onClick={onCreate}>新增车辆</Btn>
          </>
        }
      />

      {/* Search */}
      <Card className="mb-4">
        <div className="flex flex-wrap items-end gap-3">
          <FL label="车牌号">
            <Inp placeholder="请输入车牌号" value={plate} onChange={v => setPlate(v)} className="w-36" />
          </FL>
          <FL label="车辆型号">
            <Inp placeholder="请输入型号" value={model} onChange={v => setModel(v)} className="w-36" />
          </FL>
          <FL label="状态">
            <Sel value={statusF} onChange={v => setStatusF(v)} className="w-28"
              options={[{ label: "全部状态", value: "" }, { label: "可用", value: "可用" }, { label: "维修中", value: "维修中" }, { label: "已报废", value: "已报废" }]} />
          </FL>
          <FL label="录入日期">
            <div className="flex items-center gap-1">
              <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)}
                className="border border-[#E2E8F0] rounded-md px-2 py-[6px] text-sm text-[#0F172A] focus:outline-none focus:border-[#2563EB] w-32" />
              <span className="text-[#94A3B8] text-xs">至</span>
              <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)}
                className="border border-[#E2E8F0] rounded-md px-2 py-[6px] text-sm text-[#0F172A] focus:outline-none focus:border-[#2563EB] w-32" />
            </div>
          </FL>
          <div className="flex gap-2 pb-0.5">
            <Btn variant="primary" icon="search" size="sm">查询</Btn>
            <Btn variant="secondary" size="sm" onClick={() => { setPlate(""); setModel(""); setStatusF(""); setDateFrom(""); setDateTo(""); }}>重置</Btn>
          </div>
        </div>
      </Card>

      {/* Table */}
      <Card noPad>
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
              {["车牌号", "车辆型号", "载重 (kg)", "状态", "备注", "操作"].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[#64748B] whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id} className="border-b border-[#F1F5F9] hover:bg-[#F8FAFC]">
                <td className="px-4 py-3 font-mono font-semibold text-[#0F172A]">{r.plate}</td>
                <td className="px-4 py-3 text-[#0F172A]">{r.model}</td>
                <td className="px-4 py-3 text-[#64748B]">{r.load.toLocaleString()}</td>
                <td className="px-4 py-3"><Badge dot label={r.status} color={VH_STATUS_COLOR[r.status] ?? "gray"} /></td>
                <td className="px-4 py-3 text-[#64748B] max-w-[200px] truncate">{r.remark || "—"}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <Btn variant="ghost" size="sm" icon="edit" onClick={onEdit}>编辑</Btn>
                    <Btn variant="ghost" size="sm" onClick={() => { setStatusModal(r); setNewStatus(r.status); }}>状态更新</Btn>
                  </div>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-12 text-center text-[#94A3B8] text-sm">暂无数据</td></tr>
            )}
          </tbody>
        </table>
        <Pager total={rows.length} />
      </Card>

      {/* Status Update Modal */}
      {statusModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setStatusModal(null)} />
          <div className="relative bg-white rounded-xl shadow-xl border border-[#E2E8F0] w-[400px]">
            <div className="px-6 py-4 border-b border-[#F1F5F9] flex items-center justify-between">
              <span className="font-semibold text-[#0F172A]">更新车辆状态</span>
              <button onClick={() => setStatusModal(null)} className="text-[#94A3B8] hover:text-[#475569]">✕</button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div className="flex items-center gap-3 bg-[#F8FAFC] rounded-lg px-4 py-3">
                <span className="text-sm text-[#64748B]">车牌号</span>
                <span className="font-mono font-semibold text-[#0F172A] ml-auto">{statusModal.plate}</span>
              </div>
              <FL label="新状态">
                <Sel value={newStatus} onChange={v => setNewStatus(v)} className="w-full"
                  options={[{ label: "可用", value: "可用" }, { label: "维修中", value: "维修中" }, { label: "已报废", value: "已报废" }]} />
              </FL>
            </div>
            <div className="px-6 py-4 border-t border-[#F1F5F9] flex justify-end gap-3">
              <Btn variant="secondary" onClick={() => setStatusModal(null)}>取消</Btn>
              <Btn variant="primary" onClick={() => setStatusModal(null)}>确认更新</Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ── VehicleForm ────────────────────────────────────────────────────────────────
export const VehicleForm = ({ onBack, isEdit = false }: { onBack: () => void; isEdit?: boolean }) => {
  const [plate, setPlate] = useState("");
  const [model, setModel] = useState("");
  const [load, setLoad] = useState("");
  const [status, setStatus] = useState("可用");
  const [remark, setRemark] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [cancelConfirm, setCancelConfirm] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!plate.trim()) e.plate = "车牌号不能为空";
    else if (plate.trim().length > 10) e.plate = "车牌号最长10个字符";
    if (!model.trim()) e.model = "车辆型号不能为空";
    else if (model.trim().length > 50) e.model = "车辆型号最长50个字符";
    if (!load.trim()) e.load = "载重不能为空";
    else if (!/^\d+$/.test(load.trim()) || parseInt(load) <= 0) e.load = "载重须为正整数";
    if (!status) e.status = "请选择状态";
    if (remark.length > 200) e.remark = "备注最长200字";
    return e;
  };

  const handleSave = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSaveSuccess(true);
  };

  const VF = ({ label, required, error, children }: { label: string; required?: boolean; error?: string; children: ReactNode }) => (
    <div className="space-y-1">
      <label className="text-xs font-semibold text-[#64748B]">
        {label}{required && <span className="text-[#EF4444] ml-0.5">*</span>}
      </label>
      {children}
      {error && <p className="text-xs text-[#EF4444] mt-0.5">{error}</p>}
    </div>
  );

  return (
    <div>
      <PH title={isEdit ? "编辑车辆" : "新增车辆"} crumbs={["首页", "履约管理", "排车管理", "车辆管理", isEdit ? "编辑车辆" : "新增车辆"]}
        actions={
          <>
            <Btn variant="secondary" onClick={() => setCancelConfirm(true)}>取消</Btn>
            <Btn variant="primary" onClick={handleSave}>保存</Btn>
          </>
        }
      />
      <Card className="max-w-[640px]">
        <SectionTitle title="车辆基本信息" />
        <div className="grid grid-cols-2 gap-x-6 gap-y-5 mt-4">
          <VF label="车牌号" required error={errors.plate}>
            <Inp value={plate} onChange={v => { setPlate(v); setErrors(p => ({ ...p, plate: "" })); }}
              placeholder="请输入车牌号（最长10字符）"
              className={errors.plate ? "border-[#EF4444]!" : ""} />
          </VF>
          <VF label="车辆型号" required error={errors.model}>
            <Inp value={model} onChange={v => { setModel(v); setErrors(p => ({ ...p, model: "" })); }}
              placeholder="请输入车辆型号（最长50字符）"
              className={errors.model ? "border-[#EF4444]!" : ""} />
          </VF>
          <VF label="载重 (kg)" required error={errors.load}>
            <Inp value={load} onChange={v => { setLoad(v.replace(/[^0-9]/g, "")); setErrors(p => ({ ...p, load: "" })); }}
              placeholder="请输入正整数"
              className={errors.load ? "border-[#EF4444]!" : ""} />
          </VF>
          <VF label="状态" required error={errors.status}>
            <Sel value={status} onChange={v => { setStatus(v); setErrors(p => ({ ...p, status: "" })); }} className="w-full"
              options={[{ label: "可用", value: "可用" }, { label: "维修中", value: "维修中" }, { label: "已报废", value: "已报废" }]} />
          </VF>
          <div className="col-span-2">
            <VF label="备注" error={errors.remark}>
              <textarea
                value={remark} maxLength={200}
                onChange={e => { setRemark(e.target.value); setErrors(p => ({ ...p, remark: "" })); }}
                placeholder="选填，最长200字"
                rows={4}
                className="w-full border border-[#E2E8F0] rounded-md px-3 py-2 text-sm text-[#0F172A] placeholder-[#CBD5E1] focus:outline-none focus:border-[#2563EB] resize-none"
              />
              <p className="text-xs text-[#94A3B8] text-right -mt-1">{remark.length}/200</p>
            </VF>
          </div>
        </div>
      </Card>

      {/* Cancel Confirm */}
      {cancelConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setCancelConfirm(false)} />
          <div className="relative bg-white rounded-xl shadow-xl border border-[#E2E8F0] w-[360px] px-6 py-8 text-center">
            <div className="w-14 h-14 rounded-full bg-[#FEF9C3] border-2 border-[#FDE047] flex items-center justify-center mx-auto mb-4 text-2xl">⚠️</div>
            <h3 className="text-base font-bold text-[#0F172A] mb-2">确认离开？</h3>
            <p className="text-sm text-[#64748B] mb-6">当前填写内容将不会保存，确认取消操作？</p>
            <div className="flex gap-3 justify-center">
              <Btn variant="secondary" onClick={() => setCancelConfirm(false)}>继续编辑</Btn>
              <Btn variant="primary" onClick={() => { setCancelConfirm(false); onBack(); }}>确认取消</Btn>
            </div>
          </div>
        </div>
      )}

      {/* Save Success */}
      {saveSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div className="relative bg-white rounded-xl shadow-xl border border-[#E2E8F0] w-[420px]">
            <div className="px-6 py-8 text-center">
              <div className="w-16 h-16 rounded-full bg-[#F0FDF4] border-2 border-[#86EFAC] flex items-center justify-center mx-auto mb-4">
                <Ic d={P.check} size={30} className="text-[#16A34A]" />
              </div>
              <h2 className="text-lg font-bold text-[#0F172A] mb-1">{isEdit ? "车辆信息已更新" : "车辆创建成功"}</h2>
              <p className="text-sm text-[#64748B] mb-5">该车辆现已可用于排车配送任务。</p>
              <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg divide-y divide-[#F1F5F9] mb-6 text-left text-sm">
                <div className="flex justify-between px-4 py-3">
                  <span className="text-[#94A3B8]">车牌号</span>
                  <span className="font-mono font-semibold text-[#0F172A]">{plate}</span>
                </div>
                <div className="flex justify-between px-4 py-3">
                  <span className="text-[#94A3B8]">车辆型号</span>
                  <span className="text-[#0F172A]">{model}</span>
                </div>
                <div className="flex justify-between px-4 py-3">
                  <span className="text-[#94A3B8]">载重</span>
                  <span className="text-[#0F172A]">{load} kg</span>
                </div>
                <div className="flex justify-between px-4 py-3">
                  <span className="text-[#94A3B8]">状态</span>
                  <Badge label={status} color={VH_STATUS_COLOR[status] ?? "gray"} dot />
                </div>
              </div>
              <div className="flex gap-3 justify-center">
                <Btn variant="secondary" onClick={() => { setSaveSuccess(false); onBack(); }}>返回列表</Btn>
                <Btn variant="primary" onClick={() => setSaveSuccess(false)}>继续编辑</Btn>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// PAGE 7 – DISPATCH LIST 补货单排车列表
// ══════════════════════════════════════════════════════════════════════════════
// dispatch v2
export const DispatchList = ({ onWorkbench }: { onWorkbench: () => void }) => {
  const [tab, setTab] = useState<"pending" | "dispatched">("pending");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const pending = DISPATCH_ORDERS.filter(o => o.status === "待排车");
  const dispatched = DISPATCH_ORDERS.filter(o => o.status === "已排车");

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard?.writeText(text).catch(() => {});
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const dateInput = (
    <div className="flex items-center gap-1">
      <input type="date" className="h-9 border border-[#E2E8F0] rounded-md text-sm px-3 text-[#334155] focus:outline-none focus:border-[#2563EB] w-32" />
      <span className="text-[#94A3B8] text-xs">至</span>
      <input type="date" className="h-9 border border-[#E2E8F0] rounded-md text-sm px-3 text-[#334155] focus:outline-none focus:border-[#2563EB] w-32" />
    </div>
  );

  return (
    <div>
      <PH title="排车订单列表" crumbs={["首页", "履约管理", "排车管理", "排车订单列表"]}
        actions={
          <>
            <Btn variant="secondary" icon="download" size="sm">导出</Btn>
          </>
        }
      />

      <FB>
        <FL label="补货单号"><Inp placeholder="补货单号" icon="search" className="w-36" /></FL>
        <FL label="仓库">
          <Sel className="w-28" options={[{label:"全部",value:""},{label:"浦东仓",value:"浦东仓"},{label:"闵行仓",value:"闵行仓"},{label:"宝山仓",value:"宝山仓"}]} />
        </FL>
        <FL label="补货批次"><Inp placeholder="补货批次" icon="search" className="w-36" /></FL>
        <FL label="出单日期">{dateInput}</FL>
        <FL label="推送履约时间">{dateInput}</FL>
        <div className="flex items-end gap-2 ml-auto">
          <Btn variant="secondary">重置</Btn>
          <Btn variant="primary" icon="search">搜索</Btn>
        </div>
      </FB>

      <Card noPad>
        {/* Tab bar */}
        <div className="flex border-b border-[#E2E8F0]">
          {([["pending", "待排车", pending.length], ["dispatched", "已排车", dispatched.length]] as const).map(([k, l, n]) => (
            <button key={k} onClick={() => setTab(k)}
              className={`flex items-center gap-1.5 px-5 py-3 text-sm font-medium border-b-2 transition-all
                ${tab === k ? "border-[#2563EB] text-[#2563EB]" : "border-transparent text-[#64748B] hover:text-[#334155]"}`}>
              {l}
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-semibold
                ${tab === k ? "bg-[#DBEAFE] text-[#2563EB]" : "bg-[#F1F5F9] text-[#64748B]"}`}>{n}</span>
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {tab === "pending" ? (
            <table className="w-full text-sm border-collapse" style={{minWidth:"1400px"}}>
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                  {["补货单号","仓库","点位名称","点位编码","点位地址","点位详细地址","补货批次","商品总数","出单日期","推送履约时间","期望送达时间","状态","操作"].map(h => (
                    <th key={h} className="px-3 py-3 text-left text-[11px] font-semibold text-[#64748B] uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pending.map((r, i) => (
                  <tr key={r.id} className={`border-b border-[#F1F5F9] hover:bg-[#F8FAFC] transition-colors ${i%2===1?"bg-[#FAFBFC]":""}`}>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <span className="font-mono text-xs font-medium text-[#2563EB] hover:underline cursor-pointer">{r.id}</span>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-sm text-[#334155]">{r.warehouse}</td>
                    <td className="px-3 py-3 whitespace-nowrap font-medium text-[#0F172A] max-w-[120px] truncate">{r.siteName}</td>
                    <td className="px-3 py-3 whitespace-nowrap"><span className="font-mono text-xs text-[#64748B]">{r.siteCode}</span></td>
                    <td className="px-3 py-3 whitespace-nowrap w-24">
                      <span className="text-xs text-[#64748B] truncate block w-24" title={`${r.province}${r.city}${r.district}`}>{r.province}{r.city !== r.province ? r.city : ""}{r.district}</span>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap max-w-[140px]">
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-[#64748B] truncate max-w-[120px]" title={r.detailAddr}>{r.detailAddr}</span>
                        <div className="relative flex-shrink-0">
                          <button onClick={() => handleCopy(r.id, r.detailAddr)}
                            className="p-1 rounded hover:bg-[#F1F5F9] text-[#94A3B8] hover:text-[#2563EB] transition-colors">
                            <Ic d={P.clipboard} size={11} />
                          </button>
                          {copiedId === r.id && (
                            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-[#1E293B] text-white text-[10px] px-2 py-0.5 rounded whitespace-nowrap">已复制</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <span className="font-mono text-xs bg-[#F5F3FF] text-[#7C3AED] border border-[#DDD6FE] px-2 py-0.5 rounded-full">{r.batch}</span>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-sm font-medium text-[#334155]">{r.goodsTotal} 件</td>
                    <td className="px-3 py-3 whitespace-nowrap text-xs text-[#64748B]">{r.orderDate}</td>
                    <td className="px-3 py-3 whitespace-nowrap text-xs text-[#64748B]">{r.pushTime}</td>
                    <td className="px-3 py-3 whitespace-nowrap text-xs text-[#64748B]">{r.expectDelivery}</td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <Badge dot label={r.status} color="blue" />
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <button onClick={onWorkbench} className="px-2 py-1 text-[11px] text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded border border-[#2563EB] transition-all">分配</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-sm border-collapse" style={{minWidth:"1600px"}}>
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                  {["补货单号","点位名称","点位编码","商品总数","班次号","配送单号","仓库","配送人员","车辆车牌号","出单日期","推送履约时间","分配时间","状态","操作"].map(h => (
                    <th key={h} className="px-3 py-3 text-left text-[11px] font-semibold text-[#64748B] uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dispatched.map((r, i) => (
                  <tr key={r.id} className={`border-b border-[#F1F5F9] hover:bg-[#F8FAFC] transition-colors ${i%2===1?"bg-[#FAFBFC]":""}`}>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <span className="font-mono text-xs text-[#334155]">{r.id}</span>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap font-medium text-[#0F172A] max-w-[120px] truncate">{r.siteName}</td>
                    <td className="px-3 py-3 whitespace-nowrap"><span className="font-mono text-xs text-[#64748B]">{r.siteCode}</span></td>
                    <td className="px-3 py-3 whitespace-nowrap text-sm font-medium text-[#334155]">{r.goodsTotal} 件</td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <span className="font-mono text-xs bg-[#F5F3FF] text-[#7C3AED] border border-[#DDD6FE] px-2 py-0.5 rounded-full">{r.batch}</span>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <span className="font-mono text-xs font-medium text-[#2563EB]">{r.deliveryNo ?? "—"}</span>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-sm text-[#334155]">{r.deliveryWarehouse ?? "—"}</td>
                    <td className="px-3 py-3 whitespace-nowrap text-sm text-[#64748B]">{r.driver ?? "—"}</td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <span className="font-mono text-xs bg-[#F8FAFC] border border-[#E2E8F0] px-2 py-0.5 rounded text-[#334155] tracking-widest">{r.plate ?? "—"}</span>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-xs text-[#64748B]">{r.orderDate}</td>
                    <td className="px-3 py-3 whitespace-nowrap text-xs text-[#64748B]">{r.pushTime}</td>
                    <td className="px-3 py-3 whitespace-nowrap text-xs text-[#64748B]">{r.assignTime ?? "—"}</td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <Badge dot label={r.status} color="green" />
                        {r.urgency === "加急" && <span className="text-[10px] bg-[#FFF7ED] text-[#EA580C] border border-[#FED7AA] px-1.5 py-0.5 rounded-full font-medium">加急</span>}
                      </div>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <button onClick={onWorkbench} className="px-2 py-1 text-[11px] text-[#2563EB] hover:bg-[#EFF6FF] rounded border border-transparent hover:border-[#BFDBFE] transition-all">详情</button>
                        <button onClick={onWorkbench} className="px-2 py-1 text-[11px] text-[#EA580C] hover:bg-[#FFF7ED] rounded border border-transparent hover:border-[#FED7AA] transition-all">重新分配</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <Pager total={tab === "pending" ? pending.length : dispatched.length} />
      </Card>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// MAP COMPONENT (SVG simulation)
// ══════════════════════════════════════════════════════════════════════════════
const ptColor = (status: string, urgency: string) => {
  if (status === "已完成") return "#16A34A";
  if (status === "配送中") return "#0891B2";
  if (status === "已排车") return "#7C3AED";
  if (urgency === "加急") return "#DC2626";
  return "#2563EB";
};
const ptLabel = (status: string) => {
  if (status === "已完成") return "已完成";
  if (status === "配送中") return "配送中";
  if (status === "已排车") return "已排车";
  return "待排车";
};

const MapView = ({ selectMode, selectedIds, onTogglePoint, driverStops }: {
  selectMode: boolean;
  selectedIds: Set<string>;
  onTogglePoint: (id: string) => void;
  driverStops?: TripStop[];
}) => (
  <div className="relative w-full h-full bg-[#EEF2F7] overflow-hidden">
    <svg viewBox="0 0 580 340" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Background — light city map */}
      <rect width="580" height="340" fill="#EEF2F7" />

      {/* Ocean/Bay area */}
      <path d="M0 270 Q80 260 120 280 Q180 300 240 295 Q300 290 320 310 Q350 330 380 340 L0 340Z" fill="#C7DCF0" opacity="0.7" />
      <path d="M420 290 Q460 280 500 295 Q540 310 580 300 L580 340 L420 340Z" fill="#C7DCF0" opacity="0.7" />

      {/* Parks/green areas */}
      <rect x="200" y="140" width="22" height="16" rx="3" fill="#BBF7D0" opacity="0.8" />
      <rect x="340" y="120" width="18" height="14" rx="3" fill="#BBF7D0" opacity="0.8" />
      <rect x="90" y="200" width="16" height="12" rx="2" fill="#BBF7D0" opacity="0.8" />

      {/* Major roads – horizontal */}
      <line x1="0" y1="100" x2="580" y2="100" stroke="#FFFFFF" strokeWidth="6" />
      <line x1="0" y1="175" x2="580" y2="175" stroke="#FFFFFF" strokeWidth="6" />
      <line x1="0" y1="255" x2="580" y2="255" stroke="#FFFFFF" strokeWidth="5" />
      {/* Major roads – vertical */}
      <line x1="100" y1="0" x2="100" y2="340" stroke="#FFFFFF" strokeWidth="6" />
      <line x1="220" y1="0" x2="220" y2="340" stroke="#FFFFFF" strokeWidth="6" />
      <line x1="350" y1="0" x2="350" y2="340" stroke="#FFFFFF" strokeWidth="5" />
      <line x1="470" y1="0" x2="470" y2="340" stroke="#FFFFFF" strokeWidth="5" />

      {/* Minor roads – horizontal */}
      {[60, 138, 210, 235, 285].map(y => (
        <line key={y} x1="0" y1={y} x2="580" y2={y} stroke="#FFFFFF" strokeWidth="2.5" opacity="0.7" />
      ))}
      {/* Minor roads – vertical */}
      {[55, 165, 290, 410, 530].map(x => (
        <line key={x} x1={x} y1="0" x2={x} y2="340" stroke="#FFFFFF" strokeWidth="2.5" opacity="0.7" />
      ))}
      {/* Diagonal accent road */}
      <line x1="100" y1="100" x2="220" y2="175" stroke="#FFFFFF" strokeWidth="3.5" />
      <line x1="350" y1="100" x2="470" y2="175" stroke="#FFFFFF" strokeWidth="3.5" />

      {/* Road labels */}
      <text x="185" y="97" fill="#94A3B8" fontSize="8" fontFamily="sans-serif">深南大道</text>
      <text x="185" y="172" fill="#94A3B8" fontSize="8" fontFamily="sans-serif">北环大道</text>
      <text x="97" y="155" fill="#94A3B8" fontSize="7" fontFamily="sans-serif" transform="rotate(-90 97 155)">宝安大道</text>
      <text x="217" y="145" fill="#94A3B8" fontSize="7" fontFamily="sans-serif" transform="rotate(-90 217 145)">龙华大道</text>

      {/* City district labels */}
      {[
        { x: 148, y: 258, label: "南山" },
        { x: 290, y: 258, label: "福田" },
        { x: 440, y: 258, label: "罗湖" },
        { x: 170, y: 145, label: "龙华" },
        { x: 65, y: 145, label: "宝安" },
        { x: 170, y: 62, label: "光明" },
      ].map(d => (
        <text key={d.label} x={d.x} y={d.y} textAnchor="middle" fill="#CBD5E1" fontSize="11" fontWeight="700" fontFamily="sans-serif">{d.label}</text>
      ))}

      {/* Selection circle when in select mode */}
      {selectMode && (
        <>
          <circle cx="300" cy="190" r="72" fill="#F59E0B22" stroke="#F59E0B" strokeWidth="2" strokeDasharray="6 4" />
          <text x="300" y="130" textAnchor="middle" fill="#D97706" fontSize="9" fontFamily="sans-serif">已圈选区域</text>
        </>
      )}

      {/* Delivery points */}
      {MAP_PTS.map(pt => {
        const color = ptColor(pt.status, pt.urgency);
        const isSelected = selectedIds.has(pt.id);
        const inSelectCircle = selectMode && Math.sqrt(Math.pow(pt.x - 300, 2) + Math.pow(pt.y - 190, 2)) < 72;
        return (
          <g key={pt.id} onClick={() => onTogglePoint(pt.id)} style={{ cursor: "pointer" }} opacity={driverStops && driverStops.length > 0 ? 0.2 : 1}>
            {(isSelected || inSelectCircle) && (
              <circle cx={pt.x} cy={pt.y} r="11" fill={color} opacity="0.2" />
            )}
            <circle cx={pt.x} cy={pt.y} r="6"
              fill={color}
              stroke={isSelected || inSelectCircle ? "#FFFFFF" : "#FFFFFF"}
              strokeWidth={isSelected || inSelectCircle ? "2.5" : "1.5"}
              opacity="0.95"
            />
            {pt.urgency === "加急" && !isSelected && (
              <circle cx={pt.x + 4} cy={pt.y - 4} r="3" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="0.5" />
            )}
          </g>
        );
      })}

      {/* 选中师傅的点位标注 */}
      {driverStops && driverStops.length > 0 && (
        <>
          <polyline points={driverStops.map(s => `${s.x},${s.y}`).join(" ")} fill="none" stroke="#2563EB" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.5" />
          {driverStops.map((s, i) => (
            <g key={s.name}>
              <circle cx={s.x} cy={s.y} r="11" fill={TRIP_STOP_COLOR[s.status]} opacity="0.2" />
              <circle cx={s.x} cy={s.y} r="6.5" fill={TRIP_STOP_COLOR[s.status]} stroke="#fff" strokeWidth="2" />
              <text x={s.x} y={s.y + 2.5} textAnchor="middle" fontSize="8" fontWeight="700" fill="#fff">{i + 1}</text>
              <text x={s.x} y={s.y - 12} textAnchor="middle" fontSize="8" fill="#334155" fontFamily="sans-serif">{s.name}</text>
            </g>
          ))}
        </>
      )}

      {/* Scale bar */}
      <line x1="490" y1="325" x2="560" y2="325" stroke="#94A3B8" strokeWidth="1.5" />
      <line x1="490" y1="322" x2="490" y2="328" stroke="#94A3B8" strokeWidth="1.5" />
      <line x1="560" y1="322" x2="560" y2="328" stroke="#94A3B8" strokeWidth="1.5" />
      <text x="525" y="320" textAnchor="middle" fill="#94A3B8" fontSize="8" fontFamily="sans-serif">10 km</text>
    </svg>
  </div>
);

// ══════════════════════════════════════════════════════════════════════════════
// PAGE 8 – DISPATCH WORKBENCH 排车工作台
// ══════════════════════════════════════════════════════════════════════════════
export const DispatchWorkbench = ({ onBack }: { onBack: () => void }) => {
  const [orderTab, setOrderTab] = useState<"pending" | "dispatched">("pending");
  const [selectedOrders, setSelectedOrders] = useState<Set<string>>(new Set());
  const [selectedMapPts, setSelectedMapPts] = useState<Set<string>>(new Set());
  const [selectMode, setSelectMode] = useState(false);
  const [showTripAssign, setShowTripAssign] = useState(false);
  const [activeTrip, setActiveTrip] = useState<string | null>(null);
  const [whFilter, setWhFilter] = useState("");
  const [orderNoFilter, setOrderNoFilter] = useState("");
  const [addrFilter, setAddrFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("未分车");

  const pending = DISPATCH_ORDERS.filter(o => o.status === "待排车");
  const dispatched = DISPATCH_ORDERS.filter(o => o.status === "已排车");

  const toggleOrder = (id: string) => {
    setSelectedOrders(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };
  const toggleMapPt = (id: string) => {
    setSelectedMapPts(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };

  const totalSelectedQty = DISPATCH_ORDERS.filter(o => selectedOrders.has(o.id)).reduce((s, o) => s + o.qty, 0);
  const totalAllPendingQty = pending.reduce((s, o) => s + o.qty, 0);

  const currentList = orderTab === "pending" ? pending : dispatched;
  // map-selected orders bubble to top
  const sortedList = orderTab === "pending"
    ? [...currentList].sort((a, b) => (selectedMapPts.has(b.id) ? 1 : 0) - (selectedMapPts.has(a.id) ? 1 : 0))
    : currentList;

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      {/* Top bar */}
      <div className="flex flex-wrap items-center gap-2 px-4 py-2.5 bg-white border-b border-[#E2E8F0] flex-shrink-0">
        <button onClick={onBack} className="flex items-center gap-1.5 text-[#64748B] hover:text-[#0F172A] text-sm transition-colors flex-shrink-0">
          <Ic d={P.chevL} size={14} />返回
        </button>
        <div className="h-5 w-px bg-[#E2E8F0]" />
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="w-6 h-6 rounded bg-[#2563EB] flex items-center justify-center">
            <Ic d={P.map} size={13} className="text-white" />
          </div>
          <span className="text-[#0F172A] font-semibold text-sm">排车工作台</span>
          <span className="text-[#64748B] text-xs">2026-09-16 / 华东大区（上海）</span>
        </div>
        <div className="h-4 w-px bg-[#E2E8F0]" />
        {/* Inline filters */}
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-md text-xs text-[#334155] flex-shrink-0">
          <span className="text-[#94A3B8]">仓库名称</span>
          <span className="font-medium">浦东仓 / 闵行仓</span>
        </div>
        <Inp value={orderNoFilter} onChange={setOrderNoFilter} placeholder="订货单号" className="w-32" />
        <Inp value={addrFilter} onChange={setAddrFilter} placeholder="订货地址" className="w-32" />
        <Sel value={typeFilter} onChange={setTypeFilter} className="w-28"
          options={[{label:"订单类型",value:""},{label:"补货单",value:"补货单"}]} />
        <Sel value={statusFilter} onChange={setStatusFilter} className="w-28"
          options={[{label:"分车状态",value:""},{label:"全部",value:"全部"},{label:"未分车",value:"未分车"}]} />
        <Btn variant="primary" size="sm" icon="search">查询</Btn>
        <Btn variant="secondary" size="sm" icon="refresh" onClick={() => { setWhFilter(""); setOrderNoFilter(""); setAddrFilter(""); setTypeFilter(""); setStatusFilter("未分车"); }}>刷新</Btn>
      </div>

      {/* Main body: map left, right panel */}
      <div className="flex flex-1 overflow-hidden">

        {/* ─── LEFT: Map ─────────────────────────────────────────── */}
        <div className="flex-1 relative overflow-hidden flex flex-col">
          {/* Map toolbar */}
          <div className="flex items-center gap-2 px-3 py-2 bg-white border-b border-[#E2E8F0] flex-shrink-0">
            <button onClick={() => setSelectMode(s => !s)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-all border
                ${selectMode ? "bg-[#EFF6FF] border-[#2563EB] text-[#2563EB]" : "bg-[#F8FAFC] border-[#E2E8F0] text-[#475569] hover:border-[#CBD5E1]"}`}>
              <Ic d={P.crosshair} size={12} />
              {selectMode ? "退出圈选" : "圈选模式"}
            </button>
            <button className="flex items-center gap-1 px-3 py-1.5 rounded text-xs bg-[#F8FAFC] border border-[#E2E8F0] text-[#475569] hover:border-[#CBD5E1] transition-all">
              <Ic d={P.refresh} size={12} />清除选择
            </button>
            <div className="h-4 w-px bg-[#E2E8F0]" />
            <span className="text-xs text-[#94A3B8]">点击点位选择 | 圈选模式下拖拽框选区域</span>
            <div className="ml-auto flex items-center gap-1.5">
              <button className="w-7 h-7 bg-[#F8FAFC] border border-[#E2E8F0] rounded text-[#475569] hover:border-[#CBD5E1] flex items-center justify-center"><Ic d={P.zoomin} size={12} /></button>
              <button className="w-7 h-7 bg-[#F8FAFC] border border-[#E2E8F0] rounded text-[#475569] hover:border-[#CBD5E1] flex items-center justify-center"><Ic d={P.zoomout} size={12} /></button>
            </div>
          </div>

          {/* Map */}
          <div className="flex-1 relative">
            <MapView selectMode={selectMode} selectedIds={selectedMapPts} onTogglePoint={toggleMapPt} driverStops={activeTrip ? TRIP_STOPS[activeTrip] : undefined} />
            {/* Stats overlay */}
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm border border-[#E2E8F0] rounded-lg shadow-md overflow-hidden">
              {/* Row 1: 班次 + 补货单 */}
              <div className="flex items-stretch border-b border-[#F1F5F9]">
                {[
                  { label: "班次", value: "BN-20260916", color: "#0F172A", sub: "当前班次" },
                  { label: "补货单", value: `${pending.length + dispatched.length}单/${pending.reduce((s,o)=>s+o.goodsTotal,0)+dispatched.reduce((s,o)=>s+o.goodsTotal,0)}件`, color: "#2563EB", sub: "合计" },
                ].map((s, i) => (
                  <div key={s.label} className={`flex flex-col px-3.5 py-2 ${i > 0 ? "border-l border-[#F1F5F9]" : ""}`}>
                    <span className="text-[9px] text-[#94A3B8] whitespace-nowrap">{s.label}</span>
                    <span className="text-sm font-bold leading-tight tabular-nums mt-0.5" style={{ color: s.color }}>{s.value}</span>
                  </div>
                ))}
              </div>
              {/* Row 2: 待排 / 已排 / 冷藏 / 空余师傅 / 已分配师傅 */}
              <div className="flex items-stretch">
                {[
                  { label: "待排订单",   value: `${pending.length}单/${pending.reduce((s,o)=>s+o.goodsTotal,0)}件`,     color: "#F97316" },
                  { label: "已排订单",   value: `${dispatched.length}单/${dispatched.reduce((s,o)=>s+o.goodsTotal,0)}件`, color: "#16A34A" },
                  { label: "包含冷藏",   value: "36件",  color: "#0EA5E9" },
                  { label: "空余师傅",   value: "2人",   color: "#10B981" },
                  { label: "已分配师傅", value: "4人",   color: "#8B5CF6" },
                ].map((s, i) => (
                  <div key={s.label} className={`flex flex-col items-center px-3 py-2 ${i > 0 ? "border-l border-[#F1F5F9]" : ""}`}>
                    <span className="text-xs font-bold leading-tight tabular-nums" style={{ color: s.color }}>{s.value}</span>
                    <span className="text-[9px] text-[#94A3B8] whitespace-nowrap mt-0.5">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
            {selectMode && (
              <div className="absolute top-3 right-3 bg-white border border-[#E2E8F0] shadow-md rounded-lg px-3 py-2 text-xs text-[#475569]">
                圈内 <strong className="text-[#D97706]">5</strong> 个配送点
                <button className="ml-2 text-[#2563EB] hover:text-[#1D4ED8]" onClick={() => setSelectMode(false)}>加入订单池</button>
              </div>
            )}
            {/* 选中师傅的图例卡片 */}
            {activeTrip && !selectMode && (() => {
              const trip = DISPATCH_TRIPS.find(t => t.id === activeTrip);
              const stops = TRIP_STOPS[activeTrip] ?? [];
              if (!trip) return null;
              return (
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm border border-[#E2E8F0] rounded-lg shadow-md px-3 py-2.5">
                  <div className="flex items-center justify-between gap-4 mb-1">
                    <span className="text-xs font-semibold text-[#0F172A]">{trip.driver} · {trip.plate}</span>
                    <button onClick={() => setActiveTrip(null)} className="text-[#94A3B8] hover:text-[#334155] text-xs leading-none">✕</button>
                  </div>
                  <div className="text-[10px] text-[#64748B] mb-1.5">{trip.area} · 今日配送点位 {stops.length} 个</div>
                  <div className="flex items-center gap-2.5 text-[10px] text-[#64748B]">
                    {(["已配送", "配送中", "待配送"] as const).map(s => (
                      <span key={s} className="flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{ background: TRIP_STOP_COLOR[s] }} />{s}</span>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>

        </div>

        {/* ─── RIGHT: Driver tiles + Order pool ─────────────────── */}
        <div className="w-64 flex-shrink-0 flex flex-col bg-white border-l border-[#E2E8F0]">

          {/* Driver tiles */}
          <div className="px-3 pt-3 pb-2 border-b border-[#E2E8F0] flex-shrink-0">
            <div className="text-[10px] font-semibold text-[#64748B] uppercase mb-2">车辆（师傅）列表 <span className="normal-case font-normal text-[#94A3B8]">（点击看其配送点位）</span></div>
            <div className="grid grid-cols-2 gap-1.5">
              {DISPATCH_TRIPS.map(trip => {
                const active = activeTrip === trip.id;
                return (
                  <div key={trip.id} onClick={() => setActiveTrip(active ? null : trip.id)}
                    className={`rounded-lg p-2 border transition-all cursor-pointer ${active ? "border-[#2563EB] bg-[#EFF6FF] ring-1 ring-[#2563EB]" : "bg-[#F8FAFC] border-[#E2E8F0] hover:border-[#2563EB] hover:bg-[#EFF6FF]"}`}>
                    <div className="text-[11px] font-semibold text-[#0F172A] truncate mb-1">{trip.driver}</div>
                    <div className="text-[10px] text-[#64748B]">
                      <span className="text-[#2563EB] font-bold">{trip.scheduledOrders}</span>单 · <span className="text-[#7C3AED] font-bold">{trip.scheduledQty}</span>件
                    </div>
                    {active && <div className="text-[9px] text-[#2563EB] mt-0.5">已在地图标注点位</div>}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order pool tabs */}
          <div className="flex border-b border-[#E2E8F0] flex-shrink-0">
            {([["pending", "待分配", pending.length], ["dispatched", "已分配", dispatched.length]] as const).map(([k, l, n]) => (
              <button key={k} onClick={() => setOrderTab(k)}
                className={`flex-1 flex items-center justify-center gap-1 py-2 text-xs font-medium border-b-2 transition-all
                  ${orderTab === k ? "border-[#2563EB] text-[#2563EB]" : "border-transparent text-[#64748B] hover:text-[#475569]"}`}>
                {l} <span className={`px-1.5 py-0.5 rounded-full text-[9px] ${orderTab === k ? "bg-[#EFF6FF] text-[#2563EB]" : "bg-[#F1F5F9] text-[#64748B]"}`}>{n}</span>
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="px-3 py-2 border-b border-[#E2E8F0] flex-shrink-0">
            <div className="relative">
              <Ic d={P.search} size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
              <input placeholder="搜索点位/订单号" className="w-full h-7 bg-[#F8FAFC] border border-[#E2E8F0] rounded text-xs text-[#0F172A] placeholder-[#94A3B8] pl-7 pr-3 focus:outline-none focus:border-[#2563EB]" />
            </div>
          </div>

          {/* Order list */}
          <div className="flex-1 overflow-y-auto py-1.5">
            {sortedList.map(order => {
              const isSelected = selectedOrders.has(order.id);
              const isMapHighlighted = selectedMapPts.has(order.id);
              return (
                <div key={order.id}
                  onClick={() => orderTab === "pending" && toggleOrder(order.id)}
                  className={`mx-2 mb-1 rounded p-2 border transition-all ${orderTab === "pending" ? "cursor-pointer" : "cursor-default"}
                    ${isSelected ? "bg-[#EFF6FF] border-[#2563EB]" : isMapHighlighted ? "bg-[#F0FDF4] border-[#86EFAC]" : "bg-[#F8FAFC] border-[#E2E8F0] hover:border-[#CBD5E1]"}`}>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    {orderTab === "pending" && (
                      <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center flex-shrink-0 ${isSelected ? "bg-[#2563EB] border-[#2563EB]" : "border-[#CBD5E1]"}`}>
                        {isSelected && <Ic d={P.check} size={9} className="text-white" />}
                      </div>
                    )}
                    <div className="text-[11px] font-semibold text-[#0F172A] truncate flex-1">{order.siteName}</div>
                    <span className="text-[10px] font-semibold text-[#7C3AED] bg-[#F5F3FF] border border-[#DDD6FE] px-1.5 py-0.5 rounded-full flex-shrink-0">
                      {`第${(order.batch.slice(-1).charCodeAt(0) - 64)}批次`}
                    </span>
                  </div>
                  <div className="pl-5 text-[10px] text-[#64748B] truncate mb-1">
                    {order.province}{order.city !== order.province ? order.city : ""}{order.district} {order.detailAddr}
                  </div>
                  <div className="flex items-center gap-1.5 pl-5">
                    <span className="text-sm font-bold text-[#0F172A] leading-none">{order.goodsTotal}<span className="text-[10px] font-normal text-[#64748B] ml-0.5">件</span></span>
                    {orderTab === "dispatched" && order.driver && (
                      <span className="ml-auto flex items-center gap-1 text-[10px] text-[#64748B] min-w-0">
                        <Ic d={P.truck} size={10} className="text-[#8B5CF6] flex-shrink-0" />
                        <span className="flex-shrink-0">已分配</span>
                        <span className="font-semibold text-[#0F172A] flex-shrink-0">{order.driver}</span>
                        {order.plate && <span className="font-mono text-[9px] bg-white border border-[#E2E8F0] rounded px-1 py-px text-[#64748B] tracking-wider flex-shrink-0">{order.plate}</span>}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action footer */}
          {orderTab === "pending" && selectedOrders.size > 0 && (
            <div className="border-t border-[#E2E8F0] px-3 py-2 flex-shrink-0">
              <div className="flex justify-between text-xs text-[#64748B] mb-1.5">
                <span>已选 <strong className="text-[#2563EB]">{selectedOrders.size}</strong> 单</span>
                <span>合计 <strong className="text-[#2563EB]">{totalSelectedQty}</strong> 件</span>
              </div>
              <button onClick={() => setShowTripAssign(true)}
                className="w-full h-8 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-medium rounded flex items-center justify-center gap-1.5 transition-colors">
                <Ic d={P.truck} size={12} />分配师傅
              </button>
              <button onClick={() => setSelectedOrders(new Set())} className="w-full h-6 text-[#94A3B8] hover:text-[#64748B] text-xs transition-colors mt-1">清除选择</button>
            </div>
          )}
        </div>
      </div>

      {/* ── BOTTOM FIXED BAR ── */}
      <div className="sticky bottom-0 flex items-center justify-between px-5 py-3 bg-white border-t border-[#E2E8F0] shadow-md flex-shrink-0">
        <div className="text-sm text-[#64748B]">
          已选 <strong className="text-[#2563EB] text-base">{selectedOrders.size}</strong> 单
          {selectedOrders.size > 0 && <> / 合计 <strong className="text-[#2563EB]">{totalSelectedQty}</strong> 件</>}
        </div>
        <div className="flex gap-2">
          <Btn variant="secondary" onClick={() => setSelectedOrders(new Set())} disabled={selectedOrders.size === 0}>取消排车</Btn>
          <Btn variant="primary" onClick={() => setShowTripAssign(true)} disabled={selectedOrders.size === 0}>提交排车计划</Btn>
        </div>
      </div>

      {/* ── MODAL: Assign to trip ── */}
      {showTripAssign && (() => {
        const ON_DUTY_DRIVERS = [
          { id: "d1", name: "王师傅", phone: "138****0001", plate: "沪A·88888", assignedOrders: 2, assignedQty: 216 },
          { id: "d2", name: "张师傅", phone: "139****0002", plate: "沪B·77777", assignedOrders: 0, assignedQty: 0 },
          { id: "d3", name: "李师傅", phone: "137****0003", plate: "沪C·66666", assignedOrders: 1, assignedQty: 144 },
          { id: "d4", name: "陈师傅", phone: "136****0004", plate: "沪D·55555", assignedOrders: 0, assignedQty: 0 },
        ];
        const freeDrivers = ON_DUTY_DRIVERS.filter(d => d.assignedOrders === 0).length;
        const assignedDrivers = ON_DUTY_DRIVERS.filter(d => d.assignedOrders > 0).length;
        const pendingOrders = pending.length;
        const pendingQty = pending.reduce((s, o) => s + o.goodsTotal, 0);
        const dispatchedOrders = dispatched.length;
        const dispatchedQty = dispatched.reduce((s, o) => s + o.goodsTotal, 0);
        return (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl w-[560px] max-h-[85vh] flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2E8F0] flex-shrink-0">
                <div>
                  <h2 className="text-base font-bold text-[#0F172A]">分配师傅</h2>
                  <p className="text-xs text-[#94A3B8] mt-0.5">已选 {selectedOrders.size} 单 · 合计 {totalSelectedQty} 件</p>
                </div>
                <button onClick={() => setShowTripAssign(false)} className="text-[#94A3B8] hover:text-[#334155]"><Ic d={P.x} size={16} /></button>
              </div>

              {/* Stats */}
              <div className="px-5 py-3 border-b border-[#F1F5F9] flex-shrink-0">
                {/* Row 1: 班次日期 + 师傅统计 */}
                <div className="flex items-center gap-4 mb-2">
                  <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
                    <span className="text-[#94A3B8]">班次日期</span>
                    <span className="font-semibold text-[#0F172A]">2026-09-16</span>
                  </div>
                  <div className="h-3 w-px bg-[#E2E8F0]" />
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-[#94A3B8]">空余师傅</span>
                    <span className="font-bold text-[#16A34A] text-sm">{freeDrivers}</span>
                    <span className="text-[#94A3B8]">已分配师傅</span>
                    <span className="font-bold text-[#2563EB] text-sm">{assignedDrivers}</span>
                  </div>
                </div>
                {/* Row 2: 订单统计 */}
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#94A3B8]">待排订单</span>
                    <span className="font-semibold text-[#F97316]">{pendingOrders} 单</span>
                    <span className="text-[#94A3B8]">/</span>
                    <span className="font-semibold text-[#F97316]">{pendingQty} 件</span>
                  </div>
                  <div className="h-3 w-px bg-[#E2E8F0]" />
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#94A3B8]">已排订单</span>
                    <span className="font-semibold text-[#16A34A]">{dispatchedOrders} 单</span>
                    <span className="text-[#94A3B8]">/</span>
                    <span className="font-semibold text-[#16A34A]">{dispatchedQty} 件</span>
                  </div>
                </div>
              </div>

              {/* Driver list */}
              <div className="flex-1 overflow-y-auto p-5 space-y-2">
                <div className="text-xs font-semibold text-[#64748B] uppercase mb-2">在班配送师傅</div>
                {ON_DUTY_DRIVERS.map(d => (
                  <div key={d.id} className="flex items-center gap-3 p-3 border border-[#E2E8F0] rounded-lg hover:border-[#2563EB] hover:bg-[#F8FAFC] cursor-pointer transition-all group">
                    <div className="w-9 h-9 rounded-full bg-[#EFF6FF] flex items-center justify-center text-[#2563EB] text-sm font-bold flex-shrink-0">
                      {d.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm font-semibold text-[#0F172A]">{d.name}</span>
                        <span className="text-xs text-[#94A3B8]">{d.phone}</span>
                        <span className="font-mono text-[10px] bg-[#F8FAFC] border border-[#E2E8F0] px-1.5 py-0.5 rounded text-[#64748B]">{d.plate}</span>
                      </div>
                      <div className="text-xs text-[#94A3B8]">
                        已分配：
                        <span className={`font-semibold ${d.assignedOrders > 0 ? "text-[#2563EB]" : "text-[#94A3B8]"}`}>{d.assignedOrders} 单</span>
                        <span className="mx-1">/</span>
                        <span className={`font-semibold ${d.assignedQty > 0 ? "text-[#2563EB]" : "text-[#94A3B8]"}`}>{d.assignedQty} 件</span>
                      </div>
                    </div>
                    <Btn variant="primary" size="sm" onClick={() => setShowTripAssign(false)}>分配</Btn>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 px-5 py-4 border-t border-[#E2E8F0] flex-shrink-0">
                <Btn variant="secondary" onClick={() => setShowTripAssign(false)}>取消</Btn>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// PAGE 8b – ENGINEER LIST 工程人员维护
// ══════════════════════════════════════════════════════════════════════════════
export const EngineerList = ({ onCreate, onEdit }: { onCreate: () => void; onEdit: () => void }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [wh, setWh] = useState("");
  const [statusF, setStatusF] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [statusModal, setStatusModal] = useState<typeof ENGINEER_ROWS[0] | null>(null);
  const [newStatus, setNewStatus] = useState<EngStatus>("在工");

  const rows = ENGINEER_ROWS.filter(r =>
    (!name || r.name.includes(name)) &&
    (!phone || r.phone.includes(phone)) &&
    (!wh || r.wh === wh) &&
    (!statusF || r.status === statusF)
  );

  return (
    <div>
      <PH title="工程人员维护" crumbs={["首页", "履约管理", "工单管理", "工程人员维护"]}
        actions={
          <>
            <Btn variant="secondary" icon="download" size="sm">导出</Btn>
            <Btn variant="primary" icon="plus" onClick={onCreate}>新增人员</Btn>
          </>
        }
      />
      <Card className="mb-4">
        <div className="flex flex-wrap items-end gap-3">
          <FL label="姓名"><Inp placeholder="请输入姓名" value={name} onChange={v => setName(v)} className="w-32" /></FL>
          <FL label="手机号"><Inp placeholder="请输入手机号" value={phone} onChange={v => setPhone(v)} className="w-36" /></FL>
          <FL label="绑定仓库">
            <Sel value={wh} onChange={v => setWh(v)} className="w-40"
              options={WH_OPTS} />
          </FL>
          <FL label="状态">
            <Sel value={statusF} onChange={v => setStatusF(v)} className="w-24"
              options={[{ label: "全部", value: "" }, { label: "在工", value: "在工" }, { label: "休假", value: "休假" }, { label: "离职", value: "离职" }]} />
          </FL>
          <FL label="入职日期">
            <div className="flex items-center gap-1">
              <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)}
                className="border border-[#E2E8F0] rounded-md px-2 py-[6px] text-sm text-[#0F172A] focus:outline-none focus:border-[#2563EB] w-32" />
              <span className="text-[#94A3B8] text-xs">至</span>
              <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)}
                className="border border-[#E2E8F0] rounded-md px-2 py-[6px] text-sm text-[#0F172A] focus:outline-none focus:border-[#2563EB] w-32" />
            </div>
          </FL>
          <div className="flex gap-2 pb-0.5">
            <Btn variant="primary" icon="search" size="sm">查询</Btn>
            <Btn variant="secondary" size="sm" onClick={() => { setName(""); setPhone(""); setWh(""); setStatusF(""); setDateFrom(""); setDateTo(""); }}>重置</Btn>
          </div>
        </div>
      </Card>

      <Card noPad>
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
              {["人员编码", "姓名", "手机号", "绑定仓库", "状态", "入职日期", "备注", "操作"].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[#64748B] whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id} className="border-b border-[#F1F5F9] hover:bg-[#F8FAFC]">
                <td className="px-4 py-3 font-mono text-xs text-[#64748B]">{r.id}</td>
                <td className="px-4 py-3 font-medium text-[#0F172A]">{r.name}</td>
                <td className="px-4 py-3 font-mono text-xs text-[#64748B]">{r.phone}</td>
                <td className="px-4 py-3 text-[#64748B] text-xs">{r.wh}</td>
                <td className="px-4 py-3"><Badge dot label={r.status} color={ENG_STATUS_COLOR[r.status]} /></td>
                <td className="px-4 py-3 text-xs text-[#64748B]">{r.joinDate}</td>
                <td className="px-4 py-3 text-xs text-[#64748B] max-w-[140px] truncate">{r.remark || "—"}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <Btn variant="ghost" size="sm" icon="edit" onClick={onEdit}>编辑</Btn>
                    <Btn variant="ghost" size="sm" onClick={() => { setStatusModal(r); setNewStatus(r.status); }}>状态更新</Btn>
                  </div>
                </td>
              </tr>
            ))}
            {rows.length === 0 && <tr><td colSpan={8} className="px-4 py-12 text-center text-[#94A3B8] text-sm">暂无数据</td></tr>}
          </tbody>
        </table>
        <Pager total={rows.length} />
      </Card>

      {statusModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setStatusModal(null)} />
          <div className="relative bg-white rounded-xl shadow-xl border border-[#E2E8F0] w-[400px]">
            <div className="px-6 py-4 border-b border-[#F1F5F9] flex items-center justify-between">
              <span className="font-semibold text-[#0F172A]">更新人员状态</span>
              <button onClick={() => setStatusModal(null)} className="text-[#94A3B8] hover:text-[#475569]">✕</button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div className="flex items-center gap-3 bg-[#F8FAFC] rounded-lg px-4 py-3">
                <span className="text-sm text-[#64748B]">人员</span>
                <span className="font-semibold text-[#0F172A] ml-auto">{statusModal.name}</span>
              </div>
              <FL label="新状态">
                <Sel value={newStatus} onChange={v => setNewStatus(v as EngStatus)} className="w-full"
                  options={[{ label: "在工", value: "在工" }, { label: "休假", value: "休假" }, { label: "离职", value: "离职" }]} />
              </FL>
            </div>
            <div className="px-6 py-4 border-t border-[#F1F5F9] flex justify-end gap-3">
              <Btn variant="secondary" onClick={() => setStatusModal(null)}>取消</Btn>
              <Btn variant="primary" onClick={() => setStatusModal(null)}>确认更新</Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ── EngineerForm ───────────────────────────────────────────────────────────────
export const EngineerForm = ({ onBack, isEdit = false }: { onBack: () => void; isEdit?: boolean }) => {
  const [engName, setEngName] = useState("");
  const [phone, setPhone] = useState("");
  const [idNo, setIdNo] = useState("");
  const [wh, setWh] = useState("");
  const [status, setStatus] = useState<EngStatus>("在工");
  const [joinDate, setJoinDate] = useState("");
  const [billing, setBilling] = useState("");
  const [billingNote, setBillingNote] = useState("");
  const [remark, setRemark] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [cancelConfirm, setCancelConfirm] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [idPhotoName, setIdPhotoName] = useState("");

  const validate = () => {
    const e: Record<string, string> = {};
    if (!engName.trim()) e.name = "姓名不能为空";
    else if (engName.trim().length > 20) e.name = "姓名最长20字符";
    if (!phone.trim()) e.phone = "手机号不能为空";
    else if (!/^1\d{10}$/.test(phone.trim())) e.phone = "请输入11位有效手机号";
    if (!idNo.trim()) e.idNo = "身份证号不能为空";
    if (!idPhotoName) e.idPhoto = "请上传身份证照片";
    if (!wh) e.wh = "请选择绑定仓库";
    if (!joinDate) e.joinDate = "请选择入职日期";
    if (remark.length > 200) e.remark = "备注最长200字";
    return e;
  };

  const EF = ({ label, required, error, pending, children }: { label: string; required?: boolean; error?: string; pending?: boolean; children: ReactNode }) => (
    <div className="space-y-1">
      <label className="text-xs font-semibold text-[#64748B] flex items-center gap-1.5">
        {label}
        {required && <span className="text-[#EF4444]">*</span>}
        {pending && <span className="text-[10px] px-1.5 py-0.5 bg-[#FEF9C3] text-[#92400E] border border-[#FDE68A] rounded font-medium">待业务确认</span>}
      </label>
      {children}
      {error && <p className="text-xs text-[#EF4444]">{error}</p>}
    </div>
  );

  return (
    <div>
      <PH title={isEdit ? "编辑工程人员" : "新增工程人员"} crumbs={["首页", "履约管理", "工单管理", "工程人员维护", isEdit ? "编辑" : "新增"]}
        actions={
          <>
            <Btn variant="secondary" onClick={() => setCancelConfirm(true)}>取消</Btn>
            <Btn variant="primary" onClick={() => { const e = validate(); if (Object.keys(e).length) { setErrors(e); return; } setSaveSuccess(true); }}>保存</Btn>
          </>
        }
      />

      <div className="max-w-[760px] space-y-5">
        {/* Section 1: Basic Info */}
        <Card>
          <SectionTitle title="基本信息" />
          <div className="grid grid-cols-2 gap-x-6 gap-y-5">
            <EF label="姓名" required error={errors.name}>
              <Inp value={engName} onChange={v => { setEngName(v); setErrors(p => ({ ...p, name: "" })); }} placeholder="请输入姓名（最长20字符）" />
            </EF>
            <EF label="手机号" required error={errors.phone}>
              <Inp value={phone} onChange={v => { setPhone(v); setErrors(p => ({ ...p, phone: "" })); }} placeholder="请输入11位手机号" />
            </EF>
            <EF label="身份证号" required error={errors.idNo}>
              <Inp value={idNo} onChange={v => { setIdNo(v); setErrors(p => ({ ...p, idNo: "" })); }} placeholder="请输入身份证号码" />
            </EF>
            <EF label="绑定仓库" required error={errors.wh}>
              <Sel value={wh} onChange={v => { setWh(v); setErrors(p => ({ ...p, wh: "" })); }} className="w-full"
                options={WH_OPTS} />
            </EF>
            <EF label="状态" required>
              <Sel value={status} onChange={v => setStatus(v as EngStatus)} className="w-full"
                options={[{ label: "在工", value: "在工" }, { label: "休假", value: "休假" }, { label: "离职", value: "离职" }]} />
            </EF>
            <EF label="入职日期" required error={errors.joinDate}>
              <input type="date" value={joinDate} onChange={e => { setJoinDate(e.target.value); setErrors(p => ({ ...p, joinDate: "" })); }}
                className="border border-[#E2E8F0] rounded-md px-3 py-[7px] text-sm text-[#0F172A] focus:outline-none focus:border-[#2563EB] w-full" />
            </EF>
          </div>
        </Card>

        {/* Section 2: ID Photo */}
        <Card>
          <SectionTitle title="证件照片" />
          <EF label="身份证照片" required error={errors.idPhoto}>
            <div className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors
              ${errors.idPhoto ? "border-[#EF4444] bg-[#FFF5F5]" : "border-[#E2E8F0] hover:border-[#2563EB] hover:bg-[#F8FAFC]"}`}
              onClick={() => { setIdPhotoName("身份证照片.jpg"); setErrors(p => ({ ...p, idPhoto: "" })); }}>
              {idPhotoName ? (
                <div className="flex items-center justify-center gap-2 text-sm text-[#16A34A]">
                  <Ic d={P.check} size={16} className="text-[#16A34A]" />
                  <span>{idPhotoName}</span>
                </div>
              ) : (
                <>
                  <div className="w-10 h-10 rounded-full bg-[#EFF6FF] flex items-center justify-center mx-auto mb-2">
                    <Ic d={P.upload} size={18} className="text-[#2563EB]" />
                  </div>
                  <p className="text-sm text-[#64748B]">点击上传身份证照片</p>
                  <p className="text-xs text-[#94A3B8] mt-1">支持 JPG / PNG，单文件不超过 10MB</p>
                </>
              )}
            </div>
          </EF>
        </Card>

        {/* Section 3: Billing – pending confirmation */}
        <div className="border-2 border-dashed border-[#FDE68A] rounded-xl p-5 bg-[#FFFBEB]">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm font-semibold text-[#92400E]">合作与计费信息</span>
            <span className="text-xs px-2 py-0.5 bg-[#FEF9C3] text-[#92400E] border border-[#FDE68A] rounded font-medium">⚠ 待业务确认</span>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-5">
            <EF label="合作方式" pending>
              <Sel value={billing} onChange={v => setBilling(v)} className="w-full"
                options={[{ label: "请选择", value: "" }, { label: "固定费用（按月）", value: "fixed" }, { label: "件数", value: "piece" }]} />
            </EF>
            <div className="col-span-2">
              <EF label="计费备注" pending>
                <textarea value={billingNote} onChange={e => setBillingNote(e.target.value)} rows={2} placeholder="计费规则补充说明（待业务确认后填写）"
                  className="w-full border border-[#E2E8F0] rounded-md px-3 py-2 text-sm text-[#0F172A] placeholder-[#CBD5E1] focus:outline-none focus:border-[#2563EB] resize-none" />
              </EF>
            </div>
          </div>
        </div>

        {/* Section 4: Remark */}
        <Card>
          <SectionTitle title="其他信息" />
          <EF label="备注" error={errors.remark}>
            <textarea value={remark} maxLength={200} onChange={e => { setRemark(e.target.value); setErrors(p => ({ ...p, remark: "" })); }} rows={3}
              placeholder="选填，最长200字"
              className="w-full border border-[#E2E8F0] rounded-md px-3 py-2 text-sm text-[#0F172A] placeholder-[#CBD5E1] focus:outline-none focus:border-[#2563EB] resize-none" />
            <p className="text-xs text-[#94A3B8] text-right -mt-1">{remark.length}/200</p>
          </EF>
        </Card>
      </div>

      {/* Cancel Confirm */}
      {cancelConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setCancelConfirm(false)} />
          <div className="relative bg-white rounded-xl shadow-xl border border-[#E2E8F0] w-[360px] px-6 py-8 text-center">
            <div className="w-14 h-14 rounded-full bg-[#FEF9C3] border-2 border-[#FDE047] flex items-center justify-center mx-auto mb-4 text-2xl">⚠️</div>
            <h3 className="text-base font-bold text-[#0F172A] mb-2">确认离开？</h3>
            <p className="text-sm text-[#64748B] mb-6">当前填写内容将不会保存，确认取消操作？</p>
            <div className="flex gap-3 justify-center">
              <Btn variant="secondary" onClick={() => setCancelConfirm(false)}>继续编辑</Btn>
              <Btn variant="primary" onClick={() => { setCancelConfirm(false); onBack(); }}>确认取消</Btn>
            </div>
          </div>
        </div>
      )}

      {/* Save Success */}
      {saveSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div className="relative bg-white rounded-xl shadow-xl border border-[#E2E8F0] w-[420px]">
            <div className="px-6 py-8 text-center">
              <div className="w-16 h-16 rounded-full bg-[#F0FDF4] border-2 border-[#86EFAC] flex items-center justify-center mx-auto mb-4">
                <Ic d={P.check} size={30} className="text-[#16A34A]" />
              </div>
              <h2 className="text-lg font-bold text-[#0F172A] mb-1">{isEdit ? "人员信息已更新" : "工程人员创建成功"}</h2>
              <p className="text-sm text-[#64748B] mb-5">该人员现已可在装机工单中分配使用。</p>
              <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg divide-y divide-[#F1F5F9] mb-6 text-left text-sm">
                <div className="flex justify-between px-4 py-3"><span className="text-[#94A3B8]">姓名</span><span className="font-semibold text-[#0F172A]">{engName}</span></div>
                <div className="flex justify-between px-4 py-3"><span className="text-[#94A3B8]">手机号</span><span className="font-mono">{phone}</span></div>
                <div className="flex justify-between px-4 py-3"><span className="text-[#94A3B8]">状态</span><Badge dot label={status} color={ENG_STATUS_COLOR[status]} /></div>
              </div>
              <div className="flex gap-3 justify-center">
                <Btn variant="secondary" onClick={() => { setSaveSuccess(false); onBack(); }}>返回列表</Btn>
                <Btn variant="primary" onClick={() => setSaveSuccess(false)}>继续编辑</Btn>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// WORK ORDER SHARED DATA
// ══════════════════════════════════════════════════════════════════════════════

// 工单详情通用点位数据（分配页和详情页共用）
const WO_SITE_INFO = {
  woNo: "WO-20260916-001",
  siteName: "南山区科技园北区北楼",
  region: "广东省 · 深圳市 · 南山区",
  addr: "广东省深圳市南山区科技园北区北楼1楼大堂右侧",
  latlng: "114.0579, 22.5431",
  customer: "蜂巢智能科技（深圳）有限公司",
  scene1: "写字楼",
  scene2: "互联网企业园区",
  installPos: "1楼大堂右侧",
  customLook: "是",
  report: "是",
  elevator: "是",
  shed: "否",
  customPhotos: ["定制外观·正面", "定制外观·侧面", "定制外观·LOGO"],
  photos: ["图1", "图2", "图3"],
  hasSmartComp: "否",
  hasTradComp: "否",
  hasConvenience: "有（全家便利店，距离约80米）",
  siteRemark: "楼道较窄，搬运需注意；物业要求施工时间08:00-18:00",
  contactName: "李主任",
  contactPhone: "138-0000-0001",
  contactRole: "行政主管",
  demandModel: "智柜 Pro X8",
  demandTime: "2026-09-17 14:00",
  otherRemark: "客户要求设备正面朝向大堂入口，安装完成后需现场验收签字。",
};

// 师傅未完成工单数
const ENG_PENDING: Record<string, number> = {
  "EG001": 3, "EG002": 1, "EG003": 0, "EG005": 2,
};

// 只读字段行
const ROField = ({ label, value, span = false }: { label: string; value: ReactNode; span?: boolean }) => (
  <div className={span ? "col-span-2" : ""}>
    <div className="text-xs text-[#94A3B8] mb-0.5">{label}</div>
    <div className="text-sm text-[#0F172A] font-medium leading-relaxed">{value || <span className="text-[#CBD5E1]">—</span>}</div>
  </div>
);

// 分区标题
const SecH = ({ n, label }: { n: string; label: string }) => (
  <div className="flex items-center gap-3 mb-4 pb-2 border-b border-[#F1F5F9]">
    <div className="w-6 h-6 rounded-md bg-[#2563EB] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{n}</div>
    <span className="text-sm font-semibold text-[#0F172A]">{label}</span>
  </div>
);

// 工单状态颜色（用于详情状态流）
const WO_STATUS_STEP_COLOR: Record<string, { dot: string; line: string; text: string }> = {
  done:    { dot: "bg-[#16A34A] border-[#16A34A]", line: "bg-[#16A34A]", text: "text-[#16A34A]" },
  active:  { dot: "bg-[#2563EB] border-[#2563EB]", line: "bg-[#2563EB]", text: "text-[#2563EB]" },
  pending: { dot: "bg-white border-[#E2E8F0]",      line: "bg-[#E2E8F0]", text: "text-[#94A3B8]" },
  cancel:  { dot: "bg-[#DC2626] border-[#DC2626]",  line: "bg-[#E2E8F0]", text: "text-[#DC2626]" },
};

// ══════════════════════════════════════════════════════════════════════════════
// PAGE 9 – WORK ORDER LIST 装机工单列表
// ══════════════════════════════════════════════════════════════════════════════
export const WorkOrderList = ({ onDetail, onAssign }: { onDetail: () => void; onAssign: () => void }) => {
  const [woNo, setWoNo] = useState("");
  const [site, setSite] = useState("");
  const [cabinet, setCabinet] = useState("");
  const [statusF, setStatusF] = useState("");
  const [engineer, setEngineer] = useState("");
  const [createFrom, setCreateFrom] = useState("");
  const [createTo, setCreateTo] = useState("");
  const [demandFrom, setDemandFrom] = useState("");
  const [demandTo, setDemandTo] = useState("");
  const [finishFrom, setFinishFrom] = useState("");
  const [finishTo, setFinishTo] = useState("");
  const [cancelModal, setCancelModal] = useState<string | null>(null);

  const dateInput = "border border-[#E2E8F0] rounded-md px-2 py-[6px] text-sm text-[#0F172A] focus:outline-none focus:border-[#2563EB] bg-white";

  const rows = WO_ROWS.filter(r =>
    (!woNo || r.id.includes(woNo)) &&
    (!site || r.site.includes(site) || r.addr.includes(site)) &&
    (!cabinet || r.cabinetModel === cabinet) &&
    (!statusF || r.status === statusF) &&
    (!engineer || r.engineer.includes(engineer))
  );

  const pendingN = WO_ROWS.filter(r => r.status === "待分配").length;

  const statusColor: Record<string, BC> = {
    "待分配": "orange", "待处理": "blue", "处理中": "cyan", "已完成": "green", "已取消": "gray",
  };

  return (
    <div>
      <PH
        title="装机工单列表"
        crumbs={["履约后台", "工程管理", "装机工单列表"]}
        actions={<Btn variant="secondary" icon="download" size="sm">导出</Btn>}
      />

      {/* 筛选区 */}
      <Card className="mb-4">
        <div className="flex flex-wrap items-end gap-x-4 gap-y-3">
          <FL label="工单号">
            <Inp placeholder="请输入工单号" value={woNo} onChange={v => setWoNo(v)} className="w-38" />
          </FL>
          <FL label="点位名称">
            <Inp placeholder="请输入点位名称/地址" value={site} onChange={v => setSite(v)} className="w-44" />
          </FL>
          <FL label="机柜型号">
            <Sel value={cabinet} onChange={v => setCabinet(v)} className="w-38"
              options={[{ label: "请选择机柜型号", value: "" }, ...CABINET_MODELS.map(m => ({ label: m, value: m }))]} />
          </FL>
          <FL label="状态">
            <Sel value={statusF} onChange={v => setStatusF(v)} className="w-32"
              options={[
                { label: "请选择状态", value: "" },
                { label: "待分配", value: "待分配" },
                { label: "待处理", value: "待处理" },
                { label: "处理中", value: "处理中" },
                { label: "已完成", value: "已完成" },
                { label: "已取消", value: "已取消" },
              ]} />
          </FL>
          <FL label="工程人员">
            <Sel value={engineer} onChange={v => setEngineer(v)} className="w-36"
              options={[
                { label: "请选择工程人员", value: "" },
                ...ENGINEER_ROWS.filter(e => e.type === "装机").map(e => ({ label: e.name, value: e.name })),
              ]} />
          </FL>
        </div>
        <div className="flex flex-wrap items-end gap-x-4 gap-y-3 mt-3 pt-3 border-t border-[#F1F5F9]">
          <FL label="创建日期">
            <div className="flex items-center gap-1">
              <input type="date" value={createFrom} onChange={e => setCreateFrom(e.target.value)} className={`${dateInput} w-32`} />
              <span className="text-[#CBD5E1] text-sm">~</span>
              <input type="date" value={createTo} onChange={e => setCreateTo(e.target.value)} className={`${dateInput} w-32`} />
            </div>
          </FL>
          <FL label="需求装机时间">
            <div className="flex items-center gap-1">
              <input type="date" value={demandFrom} onChange={e => setDemandFrom(e.target.value)} className={`${dateInput} w-32`} />
              <span className="text-[#CBD5E1] text-sm">~</span>
              <input type="date" value={demandTo} onChange={e => setDemandTo(e.target.value)} className={`${dateInput} w-32`} />
            </div>
          </FL>
          <FL label="装机完成时间">
            <div className="flex items-center gap-1">
              <input type="date" value={finishFrom} onChange={e => setFinishFrom(e.target.value)} className={`${dateInput} w-32`} />
              <span className="text-[#CBD5E1] text-sm">~</span>
              <input type="date" value={finishTo} onChange={e => setFinishTo(e.target.value)} className={`${dateInput} w-32`} />
            </div>
          </FL>
          <div className="flex gap-2 items-end pb-0.5">
            <Btn variant="primary" icon="search" size="sm">搜索</Btn>
            <Btn variant="secondary" size="sm" onClick={() => {
              setWoNo(""); setSite(""); setCabinet(""); setStatusF(""); setEngineer("");
              setCreateFrom(""); setCreateTo(""); setDemandFrom(""); setDemandTo(""); setFinishFrom(""); setFinishTo("");
            }}>重置</Btn>
          </div>
        </div>
      </Card>

      {/* 待分配提示 */}
      {pendingN > 0 && (
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm mb-4 bg-[#FFFBEB] border-[#FDE68A] text-[#92400E]">
          <Ic d={P.alert} size={14} className="flex-shrink-0 text-[#D97706]" />
          <span className="flex-1">当前有 <strong>{pendingN}</strong> 张工单处于「待分配」状态，请及时分配工程师傅。</span>
        </div>
      )}

      {/* 表格 */}
      <Card noPad>
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#F1F5F9]">
          <span className="text-sm font-semibold text-[#0F172A]">工单列表</span>
          <span className="text-xs text-[#94A3B8]">共 {rows.length} 条</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse min-w-[1100px]">
            <thead>
              <tr className="bg-[#F8FAFC]">
                {["装机单号", "站点编码", "站点名称", "详细地址", "经纬度导航", "需求装机时间", "机型", "资产编码", "状态", "操作"].map(h => (
                  <th key={h} className="px-3 py-3 text-left text-xs font-semibold text-[#64748B] border-b border-[#E2E8F0] whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, idx) => (
                <tr key={r.id} className={`border-b border-[#F1F5F9] transition-colors hover:bg-[#F8FAFC] ${r.status === "待分配" ? "bg-[#FFFBEB]/60" : idx % 2 === 1 ? "bg-[#FAFAFA]" : ""}`}>
                  {/* 装机单号 */}
                  <td className="px-3 py-3 whitespace-nowrap">
                    <button onClick={onDetail} className="font-mono text-xs text-[#2563EB] hover:underline hover:text-[#1D4ED8] transition-colors">{r.id}</button>
                  </td>
                  {/* 站点编码（高亮） */}
                  <td className="px-3 py-3 whitespace-nowrap">
                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-[#EFF6FF] text-[#2563EB] font-mono text-xs font-semibold">{r.siteCode}</span>
                  </td>
                  {/* 站点名称 */}
                  <td className="px-3 py-3 text-sm font-medium text-[#0F172A] whitespace-nowrap">{r.site}</td>
                  {/* 详细地址 */}
                  <td className="px-3 py-3 text-xs text-[#64748B] max-w-[180px]">
                    <div className="truncate" title={r.addr}>{r.addr}</div>
                  </td>
                  {/* 经纬度导航 */}
                  <td className="px-3 py-3 whitespace-nowrap">
                    <a
                      href={`https://uri.amap.com/marker?position=${r.lng},${r.lat}&name=${encodeURIComponent(r.site)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-[#2563EB] hover:underline"
                    >
                      <Ic d={P.pin} size={12} />
                      {r.lat},{r.lng}
                    </a>
                  </td>
                  {/* 需求装机时间 */}
                  <td className="px-3 py-3 text-xs text-[#D97706] font-mono whitespace-nowrap font-semibold">{r.demandDate}</td>
                  {/* 机型 */}
                  <td className="px-3 py-3 text-xs text-[#334155] whitespace-nowrap">{r.cabinetModel}</td>
                  {/* 资产编码 */}
                  <td className="px-3 py-3 font-mono text-xs text-[#64748B] whitespace-nowrap">{r.cabinetCode || <span className="text-[#CBD5E1]">—</span>}</td>
                  {/* 状态 */}
                  <td className="px-3 py-3 whitespace-nowrap">
                    <Badge dot label={r.status} color={statusColor[r.status] ?? "gray"} />
                  </td>
                  {/* 操作 */}
                  <td className="px-3 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      {r.status === "待分配" && (
                        <button
                          onClick={onAssign}
                          className="px-2 py-1 text-[11px] text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded border border-[#2563EB] transition-all"
                        >分配</button>
                      )}
                      <button
                        onClick={onDetail}
                        className="px-2 py-1 text-[11px] text-[#2563EB] hover:bg-[#EFF6FF] rounded border border-transparent hover:border-[#BFDBFE] transition-all"
                      >查看详情</button>
                      {["待分配", "待处理", "处理中"].includes(r.status) && (
                        <button
                          onClick={() => setCancelModal(r.id)}
                          className="px-2 py-1 text-[11px] text-[#DC2626] hover:bg-[#FEF2F2] rounded border border-transparent hover:border-[#FECACA] transition-all"
                        >取消工单</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr><td colSpan={10} className="px-4 py-16 text-center text-[#94A3B8] text-sm">暂无符合条件的工单数据</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <Pager total={rows.length} />
      </Card>

      {/* 取消工单确认弹窗 */}
      {cancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setCancelModal(null)} />
          <div className="relative bg-white rounded-xl shadow-2xl border border-[#E2E8F0] w-[420px] overflow-hidden">
            <div className="px-6 pt-6 pb-5">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#FEF2F2] flex items-center justify-center flex-shrink-0">
                  <Ic d={P.ban} size={20} className="text-[#DC2626]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0F172A] mb-1">确认取消工单？</h3>
                  <p className="text-sm text-[#64748B]">工单号：<span className="font-mono text-[#0F172A] font-semibold">{cancelModal}</span></p>
                  <p className="text-sm text-[#DC2626] mt-2">⚠️ 取消后工单状态不可恢复，请确认已与相关人员沟通。</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 px-6 py-4 bg-[#F8FAFC] border-t border-[#E2E8F0]">
              <Btn variant="secondary" onClick={() => setCancelModal(null)}>返回</Btn>
              <Btn variant="danger" onClick={() => setCancelModal(null)}>确认取消</Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// PAGE 10 – WORK ORDER DETAIL 装机工单详情
// ══════════════════════════════════════════════════════════════════════════════
export const WorkOrderDetail = ({ onBack }: { onBack: () => void }) => {
  const wo = WO_ROWS[0];
  const si = WO_SITE_INFO;
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // 是/否文本展示
  const YN = ({ v }: { v: string }) => (
    <span className={`font-medium ${v === "是" ? "text-[#16A34A]" : "text-[#64748B]"}`}>{v}</span>
  );

  // 状态流转节点（处理中 为当前节点）
  const STATUS_STEPS = [
    { label: "待分配",   time: "2026-09-16 08:00", state: "done"   as const },
    { label: "已分配/待处理", time: "2026-09-16 08:45", state: "done"   as const },
    { label: "处理中",   time: "2026-09-16 09:30", state: "active" as const },
    { label: "已完成",   time: "",                  state: "pending" as const },
  ];

  const C = WO_STATUS_STEP_COLOR;

  // 操作时间轴
  const TIMELINE = [
    { time: "2026-09-16 08:00", actor: "系统自动",   role: "系统",    node: "工单创建",     desc: "由运营工单系统自动生成装机工单，关联点位：南山区科技园北区北楼，预计装机：2026-09-17 14:00。",      done: true },
    { time: "2026-09-16 08:45", actor: "调度员-陈芳", role: "调度员",  node: "工单分配",     desc: "将工单分配给装机师傅李国强，备注：需配合客户行政确认进场时间，物业管理员联系：李主任。",               done: true },
    { time: "2026-09-16 09:30", actor: "李国强（师傅App）", role: "装机师傅", node: "师傅接单", desc: "李国强通过师傅 App 确认接单，预计 13:30 到达安装现场。",                                      done: true },
    { time: "—",               actor: "—",          role: "装机师傅", node: "完成验收",     desc: "等待师傅完成安装并上传验收照片，客户签字确认。",                                                      done: false },
  ];

  const nodeColor: Record<string, string> = {
    done: "bg-[#16A34A]", active: "bg-[#2563EB]", pending: "bg-[#E2E8F0]",
  };

  return (
    <div>
      <PH
        title="装机工单详情"
        crumbs={["履约后台", "工程管理", "装机工单列表", "工单详情"]}
        actions={
          <div className="flex items-center gap-2">
            <Btn variant="secondary" icon="chevL" onClick={onBack}>返回列表</Btn>
            <Btn variant="secondary">重新分配</Btn>
          </div>
        }
      />

      {/* ① 状态流转示意区 */}
      <Card className="mb-4" noPad>
        <div className="px-5 py-3 bg-[#F8FAFC] border-b border-[#E2E8F0] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge dot label="处理中" color="cyan" />
            <span className="text-xs text-[#64748B]">工单号：<span className="font-mono font-semibold text-[#0F172A]">{wo.id}</span></span>
            <span className="text-xs text-[#94A3B8]">|</span>
            <span className="text-xs text-[#64748B]">创建：<span className="text-[#334155]">{wo.created}</span></span>
            <span className="text-xs text-[#94A3B8]">|</span>
            <span className="text-xs text-[#64748B]">需求装机：<span className="font-semibold text-[#D97706]">{wo.demandDate}</span></span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#64748B]">
            <span>已取消</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] inline-block" />
            <span className="text-[#DC2626]">（异常分支，不影响主流程）</span>
          </div>
        </div>
        {/* 主流程步骤条 */}
        <div className="px-6 py-5">
          <div className="flex items-center">
            {STATUS_STEPS.map((step, i) => {
              const sc = C[step.state];
              return (
                <div key={i} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center gap-1.5 min-w-[80px]">
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-white flex-shrink-0 ${sc.dot}`}>
                      {step.state === "done" ? <Ic d={P.check} size={13} /> :
                       step.state === "active" ? <span className="w-2 h-2 rounded-full bg-white" /> :
                       <span className="w-2 h-2 rounded-full bg-[#CBD5E1]" />}
                    </div>
                    <span className={`text-xs font-semibold whitespace-nowrap ${sc.text}`}>{step.label}</span>
                    <span className="text-[10px] text-[#94A3B8] whitespace-nowrap">{step.time || "待完成"}</span>
                  </div>
                  {i < STATUS_STEPS.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-2 ${step.state === "done" ? "bg-[#16A34A]" : step.state === "active" ? "bg-gradient-to-r from-[#2563EB] to-[#E2E8F0]" : "bg-[#E2E8F0]"}`} />
                  )}
                </div>
              );
            })}
            {/* 已取消支线 */}
            <div className="ml-6 flex items-center gap-2">
              <div className="w-px h-6 bg-[#E2E8F0]" />
              <div className="flex flex-col items-center gap-1">
                <div className="w-6 h-6 rounded-full border-2 border-dashed border-[#DC2626] flex items-center justify-center">
                  <Ic d={P.x} size={10} className="text-[#DC2626]" />
                </div>
                <span className="text-[10px] text-[#DC2626] whitespace-nowrap">已取消</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* 内容区：左栏（操作时间轴）+ 右栏（基本信息+设备+师傅） */}
      <div className="flex gap-4">


        {/* 右：详情卡片 */}
        <div className="flex-1 space-y-4">
          {/* ② 点位基本信息 */}
          <Card>
            <SecH n="2" label="点位基本信息" />
            <div className="grid grid-cols-3 gap-x-6 gap-y-4">
              <ROField label="工单号" value={<span className="font-mono text-xs text-[#2563EB]">{si.woNo}</span>} />
              <ROField label="点位名称" value={si.siteName} />
              <ROField label="点位地区" value={si.region} />
              <ROField label="详细地址" value={si.addr} span />
              <ROField label="经纬度" value={
                <span className="flex items-center gap-1.5">
                  <span className="text-xs font-mono">{si.latlng}</span>
                  <button className="text-xs text-[#2563EB] underline hover:text-[#1D4ED8]">查看地图</button>
                </span>
              } />
              <ROField label="归属客户" value={si.customer} />
              <ROField label="一级场景" value={si.scene1} />
              <ROField label="二级场景" value={si.scene2} />
              <ROField label="设备安装位置" value={si.installPos} />
              <ROField label="是否定制外观" value={<YN v={si.customLook} />} />
              <ROField label="是否需提前报备" value={<YN v={si.report} />} />
              <ROField label="是否有电梯" value={<YN v={si.elevator} />} />
              <ROField label="是否需户外棚" value={<YN v={si.shed} />} />
              {si.report === "是" && (
                <div className="col-span-3">
                  <div className="text-xs text-[#94A3B8] mb-1">定制外观照片 <span className="text-[#CBD5E1]">· 提前报备已选“是”，点击可预览预留照片</span></div>
                  <div className="flex gap-2">
                    {si.customPhotos.map((p, i) => (
                      <div key={i} onClick={() => setPhotoPreview(p)}
                        className="w-16 h-16 rounded-lg bg-[#F1F5F9] border border-[#E2E8F0] flex flex-col items-center justify-center gap-1 text-[10px] text-[#94A3B8] cursor-pointer hover:border-[#2563EB] hover:bg-[#EFF6FF] transition-colors">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1.5" y="2.5" width="13" height="11" rx="1.5" stroke="#94A3B8" /><circle cx="5.5" cy="6" r="1.2" fill="#CBD5E1" /><path d="M2.5 11.5l3.5-3 2.5 2 2.5-2.5 2.5 3" stroke="#CBD5E1" strokeWidth="1.2" fill="none" /></svg>
                        {p}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="col-span-3">
                <div className="text-xs text-[#94A3B8] mb-1">场地照片</div>
                <div className="flex gap-2">
                  {si.photos.map((p2, i) => (
                    <div key={i} className="w-16 h-16 rounded-lg bg-[#F1F5F9] border border-[#E2E8F0] flex items-center justify-center text-xs text-[#94A3B8] cursor-pointer hover:border-[#2563EB] transition-colors">{p2}</div>
                  ))}
                </div>
              </div>
              <ROField label="是否有竞对智能售货机" value={si.hasSmartComp} />
              <ROField label="是否有竞对传统售货机" value={si.hasTradComp} />
              <ROField label="百米内是否有便利店" value={si.hasConvenience} />
              <ROField label="点位信息备注" value={si.siteRemark} span />
              <ROField label="联系人姓名" value={si.contactName} />
              <ROField label="联系电话" value={si.contactPhone} />
              <ROField label="联系人身份" value={si.contactRole} />
              <ROField label="需求设备型号" value={si.demandModel} />
              <ROField label="预计安装时间" value={<span className="font-semibold text-[#D97706]">{si.demandTime}</span>} />
              <ROField label="备注（其他要求）" value={si.otherRemark} span />
            </div>
          </Card>

          {/* ③ 装机设备 */}
          <Card>
            <SecH n="3" label="装机设备" />
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                  {["机柜型号", "机柜资产条码", "数量", "备注"].map(h => (
                    <th key={h} className="px-4 py-2.5 text-left text-xs font-semibold text-[#64748B]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#F1F5F9]">
                  <td className="px-4 py-3 text-sm text-[#334155]">智柜 Pro X8</td>
                  <td className="px-4 py-3 font-mono text-xs text-[#334155]">CB-2026-0088</td>
                  <td className="px-4 py-3 text-sm text-[#334155]">1 台</td>
                  <td className="px-4 py-3 text-xs text-[#64748B]">安装于大堂右侧；需接220V独立回路</td>
                </tr>
              </tbody>
            </table>
          </Card>

          {/* ④ 分配师傅 */}
          <Card>
            <SecH n="4" label="分配师傅" />
            <div className="flex items-center gap-4 p-4 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
              <div className="w-12 h-12 rounded-full bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center text-base font-bold flex-shrink-0">李</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-[#0F172A]">李国强</span>
                  <Badge label="装机" color="blue" />
                  <Badge dot label="在工" color="green" />
                </div>
                <div className="flex items-center gap-4 text-xs text-[#64748B]">
                  <span className="flex items-center gap-1"><Ic d={P.phone} size={11} />{si.contactPhone.replace("138-0000-0001", "138-1234-5678")}</span>
                  <span className="flex items-center gap-1"><Ic d={P.pin} size={11} />深圳南山 / 福田</span>
                  <span className="flex items-center gap-1"><Ic d={P.clipboard} size={11} />当前未完成工单：3 张</span>
                </div>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-[#94A3B8] mb-1">装机师傅</div>
                <div className="text-sm text-[#0F172A] font-medium">李国强</div>
              </div>
              <div>
                <div className="text-xs text-[#94A3B8] mb-1">备注</div>
                <div className="text-sm text-[#64748B]">需配合客户行政确认进场时间，物业要求需穿工装。</div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* 定制外观照片预览弹窗 */}
      {photoPreview && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center" onClick={() => setPhotoPreview(null)}>
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold text-[#0F172A]">定制外观照片预览</span>
              <button onClick={() => setPhotoPreview(null)} className="text-[#94A3B8] hover:text-[#334155]"><Ic d={P.x} size={16} /></button>
            </div>
            <div className="h-64 rounded-lg bg-[#F1F5F9] border border-dashed border-[#CBD5E1] flex flex-col items-center justify-center gap-3 text-[#94A3B8]">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect x="5" y="9" width="38" height="30" rx="4" stroke="#CBD5E1" strokeWidth="2" /><circle cx="16" cy="19" r="3.5" fill="#E2E8F0" /><path d="M9 33l10-9 7 6 8-8 6 8" stroke="#CBD5E1" strokeWidth="2.5" fill="none" /></svg>
              <span className="text-sm font-medium text-[#64748B]">{photoPreview}</span>
              <span className="text-xs">照片预留位 · 上线后展示定制外观实拍</span>
            </div>
            <div className="flex justify-end mt-4">
              <Btn variant="secondary" onClick={() => setPhotoPreview(null)}>关闭</Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// PAGE 11 – WORK ORDER ASSIGN 工单分配（抽屉式整页）
// ══════════════════════════════════════════════════════════════════════════════
export const WorkOrderAssign = ({ onBack }: { onBack: () => void }) => {
  const wo = WO_ROWS[0];
  const si = WO_SITE_INFO;

  type DeviceRow = { model: string; code: string; qty: string; note: string };
  const [devices, setDevices] = useState<DeviceRow[]>([{ model: "", code: "", qty: "1", note: "" }]);
  const [selectedEng, setSelectedEng] = useState("");
  const [assignNote, setAssignNote] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const availableEngs = ENGINEER_ROWS.filter(e => e.status === "在工" && e.type === "装机");

  const AF = ({ label, required, error, children }: { label: string; required?: boolean; error?: string; children: ReactNode }) => (
    <div className="space-y-1">
      <label className="text-xs font-semibold text-[#64748B]">{label}{required && <span className="text-[#EF4444] ml-0.5">*</span>}</label>
      {children}
      {error && <p className="text-xs text-[#EF4444]">{error}</p>}
    </div>
  );

  const TA = "w-full border border-[#E2E8F0] rounded-md px-3 py-2 text-sm text-[#0F172A] placeholder-[#CBD5E1] focus:outline-none focus:border-[#2563EB] resize-none";

  const validate = () => {
    const e: Record<string, string> = {};
    devices.forEach((d, i) => {
      if (!d.model) e[`model_${i}`] = "请选择";
      if (!d.code.trim()) e[`code_${i}`] = "请输入";
      if (!d.qty || parseInt(d.qty) < 1) e[`qty_${i}`] = "须为正整数";
    });
    if (!selectedEng) e.engineer = "请选择装机师傅";
    return e;
  };

  const updateDevice = (i: number, field: keyof DeviceRow, val: string) => {
    setDevices(prev => prev.map((d, idx) => idx === i ? { ...d, [field]: val } : d));
    setErrors(p => { const n = { ...p }; delete n[`${field}_${i}`]; return n; });
  };

  if (submitted) {
    const eng = ENGINEER_ROWS.find(e => e.id === selectedEng);
    return (
      <div className="max-w-[600px] mx-auto py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-[#F0FDF4] border-2 border-[#86EFAC] flex items-center justify-center mx-auto mb-5">
          <Ic d={P.check} size={36} className="text-[#16A34A]" />
        </div>
        <h2 className="text-xl font-bold text-[#0F172A] mb-2">分配成功</h2>
        <p className="text-sm text-[#64748B] mb-6">工单已成功分配，工程师傅将收到任务通知并确认接单。</p>
        <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl divide-y divide-[#F1F5F9] mb-8 text-left text-sm">
          <div className="flex justify-between px-5 py-3"><span className="text-[#94A3B8]">工单号</span><span className="font-mono font-semibold text-[#0F172A]">{wo.id}</span></div>
          <div className="flex justify-between px-5 py-3"><span className="text-[#94A3B8]">机柜型号</span><span className="text-[#0F172A]">{devices[0].model}</span></div>
          <div className="flex justify-between px-5 py-3"><span className="text-[#94A3B8]">机柜资产条码</span><span className="font-mono text-[#0F172A]">{devices[0].code}</span></div>
          <div className="flex justify-between px-5 py-3"><span className="text-[#94A3B8]">装机师傅</span><span className="text-[#0F172A]">{eng?.name}</span></div>
          <div className="flex justify-between px-5 py-3"><span className="text-[#94A3B8]">工单状态</span><Badge dot label="待处理" color="blue" /></div>
        </div>
        <Btn variant="primary" onClick={onBack}>返回工单列表</Btn>
      </div>
    );
  }

  return (
    <div className="flex gap-0 -mx-6 -mt-5" style={{ minHeight: "calc(100vh - 112px)" }}>
      {/* 左侧：点位信息（只读侧栏，抽屉风格） */}
      <div className="w-[480px] flex-shrink-0 bg-[#F8FAFC] border-r border-[#E2E8F0] overflow-y-auto" style={{ maxHeight: "calc(100vh - 112px)" }}>
        <div className="px-5 py-4 border-b border-[#E2E8F0] bg-white">
          <SecH n="A" label="点位基本信息" />
          <p className="text-xs text-[#94A3B8] -mt-2">以下信息只读，来源于点位台账</p>
        </div>
        <div className="px-5 py-4 space-y-4">
          {[
            { label: "工单号", value: <span className="font-mono text-xs text-[#2563EB] font-semibold">{si.woNo}</span> },
            { label: "点位名称", value: si.siteName },
            { label: "点位地区", value: si.region },
            { label: "详细地址", value: si.addr },
            { label: "经纬度", value: <span className="flex items-center gap-1.5"><span className="font-mono text-xs">{si.latlng}</span><button className="text-xs text-[#2563EB] underline">查看地图</button></span> },
            { label: "归属客户", value: si.customer },
            { label: "一级场景", value: si.scene1 },
            { label: "二级场景", value: si.scene2 },
            { label: "设备安装位置", value: si.installPos },
          ].map((it, i) => (
            <div key={i}>
              <div className="text-[10px] text-[#94A3B8] font-semibold uppercase mb-0.5">{it.label}</div>
              <div className="text-sm text-[#0F172A]">{it.value}</div>
            </div>
          ))}
          <div>
            <div className="text-[10px] text-[#94A3B8] font-semibold uppercase mb-1">场地照片</div>
            <div className="flex gap-1.5">
              {si.photos.map((ph, i) => (
                <div key={i} className="w-16 h-16 rounded-lg bg-[#E2E8F0] border border-[#CBD5E1] flex items-center justify-center text-xs text-[#64748B] cursor-pointer hover:border-[#2563EB]">{ph}</div>
              ))}
            </div>
          </div>
          {[
            { label: "是否有竞对智能售货机", value: si.hasSmartComp },
            { label: "是否有竞对传统售货机", value: si.hasTradComp },
            { label: "百米内是否有便利店", value: si.hasConvenience },
            { label: "点位信息备注", value: si.siteRemark },
            { label: "联系人姓名", value: si.contactName },
            { label: "联系电话", value: si.contactPhone },
            { label: "联系人身份", value: si.contactRole },
            { label: "需求设备型号", value: <span className="font-semibold text-[#0F172A]">{si.demandModel}</span> },
            { label: "预计安装时间", value: <span className="font-semibold text-[#D97706]">{si.demandTime}</span> },
            { label: "备注（其他要求）", value: si.otherRemark },
          ].map((it, i) => (
            <div key={i}>
              <div className="text-[10px] text-[#94A3B8] font-semibold uppercase mb-0.5">{it.label}</div>
              <div className="text-sm text-[#334155] leading-relaxed">{it.value || <span className="text-[#CBD5E1]">—</span>}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 右侧：可编辑表单 */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 标题栏 */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-[#E2E8F0] flex-shrink-0">
          <div>
            <h1 className="text-lg font-bold text-[#0F172A]">工单分配</h1>
            <p className="text-xs text-[#94A3B8]">履约后台 / 工程管理 / 装机工单列表 / 工单分配</p>
          </div>
          <div className="flex items-center gap-2">
            <Btn variant="secondary" onClick={onBack}>取消</Btn>
            <Btn variant="primary" onClick={() => {
              const e = validate();
              if (Object.keys(e).length) { setErrors(e); return; }
              setSubmitted(true);
            }}>提交分配</Btn>
          </div>
        </div>

        {/* 表单内容 */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">

          {/* B. 装机设备选择 */}
          <Card>
            <SecH n="B" label="装机设备选择" />
            {/* 表头 */}
            <div className="grid gap-2 mb-2 text-xs font-semibold text-[#64748B]" style={{ gridTemplateColumns: "1fr 1fr 80px 1fr 40px" }}>
              <span>机柜型号 <span className="text-[#EF4444]">*</span></span>
              <span>机柜资产条码 <span className="text-[#EF4444]">*</span></span>
              <span>数量 <span className="text-[#EF4444]">*</span></span>
              <span>备注</span>
              <span />
            </div>
            {/* 设备行 */}
            {devices.map((d, i) => (
              <div key={i} className="grid gap-2 mb-2 items-start" style={{ gridTemplateColumns: "1fr 1fr 80px 1fr 40px" }}>
                <div>
                  <Sel value={d.model} onChange={v => updateDevice(i, "model", v)} className="w-full"
                    options={[{ label: "请选择机柜型号", value: "" }, ...CABINET_MODELS.map(m => ({ label: m, value: m }))]} />
                  {errors[`model_${i}`] && <p className="text-xs text-[#EF4444] mt-0.5">{errors[`model_${i}`]}</p>}
                </div>
                <div>
                  <div className="relative">
                    <Inp value={d.code} onChange={v => updateDevice(i, "code", v)} placeholder="输入或扫码录入" className="pr-8" />
                    <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#94A3B8]">
                      <Ic d={P.crosshair} size={14} />
                    </span>
                  </div>
                  {errors[`code_${i}`] && <p className="text-xs text-[#EF4444] mt-0.5">{errors[`code_${i}`]}</p>}
                </div>
                <div>
                  <Inp value={d.qty} onChange={v => updateDevice(i, "qty", v.replace(/[^0-9]/g, ""))} placeholder="1" />
                  {errors[`qty_${i}`] && <p className="text-xs text-[#EF4444] mt-0.5">{errors[`qty_${i}`]}</p>}
                </div>
                <Inp value={d.note} onChange={v => updateDevice(i, "note", v)} placeholder="补充说明（选填）" />
                <button
                  onClick={() => devices.length > 1 && setDevices(prev => prev.filter((_, idx) => idx !== i))}
                  className={`h-9 flex items-center justify-center rounded-md border border-[#E2E8F0] transition-colors ${devices.length > 1 ? "text-[#DC2626] hover:bg-[#FEF2F2]" : "text-[#CBD5E1] cursor-not-allowed"}`}
                ><Ic d={P.trash} size={14} /></button>
              </div>
            ))}
            {/* 继续追加设备 */}
            <button
              onClick={() => setDevices(prev => [...prev, { model: "", code: "", qty: "1", note: "" }])}
              className="w-full mt-2 py-2 border-2 border-dashed border-[#CBD5E1] rounded-lg text-sm text-[#94A3B8] hover:border-[#2563EB] hover:text-[#2563EB] transition-colors flex items-center justify-center gap-1.5"
            >
              <Ic d={P.plus} size={14} />继续追加设备
            </button>
          </Card>

          {/* C. 分配师傅 */}
          <Card>
            <SecH n="C" label="分配师傅" />
            <div className="grid grid-cols-2 gap-5">
              <AF label="选择装机师傅" required error={errors.engineer}>
                <Sel
                  value={selectedEng}
                  onChange={v => { setSelectedEng(v); setErrors(p => { const n = { ...p }; delete n.engineer; return n; }); }}
                  className="w-full"
                  options={[
                    { label: "请选择装机师傅", value: "" },
                    ...availableEngs.map(e => ({
                      label: `${e.name}（未完成 ${ENG_PENDING[e.id] ?? 0} 单）`,
                      value: e.id,
                    })),
                  ]}
                />
                {/* 选中师傅后展示卡片 */}
                {selectedEng && (() => {
                  const eng = ENGINEER_ROWS.find(e => e.id === selectedEng);
                  if (!eng) return null;
                  const pending = ENG_PENDING[eng.id] ?? 0;
                  return (
                    <div className="mt-2 flex items-center gap-3 p-3 rounded-lg bg-[#EFF6FF] border border-[#BFDBFE]">
                      <div className="w-9 h-9 rounded-full bg-[#2563EB] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">{eng.name[0]}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-[#0F172A] text-sm">{eng.name}</span>
                          <Badge label="装机" color="blue" />
                          <Badge dot label="在工" color="green" />
                        </div>
                        <div className="text-xs text-[#64748B] mt-0.5">{eng.phone} · {eng.wh}</div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className={`text-lg font-bold leading-none ${pending > 2 ? "text-[#D97706]" : "text-[#0F172A]"}`}>{pending}</div>
                        <div className="text-[10px] text-[#94A3B8]">未完成工单</div>
                      </div>
                    </div>
                  );
                })()}
              </AF>
              <AF label="备注">
                <textarea value={assignNote} onChange={e => setAssignNote(e.target.value)} rows={4}
                  placeholder="填写安装特殊要求、注意事项，师傅可在 App 查看"
                  className={TA} />
              </AF>
            </div>
          </Card>

          {/* D. 提交说明 */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
            <p className="text-xs text-[#94A3B8]">提交后系统将对必填项进行校验，工单状态将变更为「已分配/待处理」，师傅将收到接单通知。</p>
            <div className="flex items-center gap-2 ml-6 flex-shrink-0">
              <Btn variant="secondary" onClick={onBack}>取消</Btn>
              <Btn variant="primary" onClick={() => {
                const e = validate();
                if (Object.keys(e).length) { setErrors(e); return; }
                setSubmitted(true);
              }}>提交分配</Btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// DISPATCH SCHEDULE LIST (已排班次列表)
// ══════════════════════════════════════════════════════════════════════════════

const SCHEDULE_DATA = [
  { batchNo: "BC-20260915-001", deliveryNo: "DEL-20260915-001", warehouse: "浦东仓", driver: "王师傅 / 138****0001", plate: "沪A·88888", assignTime: "2026-09-15 09:00", orders: "BH-20260915-007; BH-20260915-008", sites: "浦东嘉里城购物中心1F; 上海科技馆旁写字楼", siteCodes: "SITE-SH-007; SITE-SH-008", goodsTotal: 216, coldTotal: 48, orderDate: "2026-09-15", pushTime: "2026-09-15 08:00", status: "待分拣" },
  { batchNo: "BC-20260915-002", deliveryNo: "DEL-20260915-002", warehouse: "闵行仓", driver: "张师傅 / 139****0002", plate: "沪B·77777", assignTime: "2026-09-15 09:30", orders: "BH-20260915-009; BH-20260915-010", sites: "莘庄地铁上盖商业中心; 上海交大闵行校区食堂区", siteCodes: "SITE-SH-009; SITE-SH-010", goodsTotal: 360, coldTotal: 80, orderDate: "2026-09-15", pushTime: "2026-09-15 09:00", status: "待分拣" },
  { batchNo: "BC-20260914-005", deliveryNo: "DEL-20260914-005", warehouse: "浦东仓", driver: "李师傅 / 137****0003", plate: "沪C·66666", assignTime: "2026-09-14 08:45", orders: "BH-20260914-022; BH-20260914-023; BH-20260914-024", sites: "陆家嘴金融中心大堂; 张江高科园区D座; 金桥国际商业广场B2", siteCodes: "SITE-SH-001; SITE-SH-002; SITE-SH-006", goodsTotal: 312, coldTotal: 0, orderDate: "2026-09-14", pushTime: "2026-09-14 08:00", status: "待分拣" },
];

const WH_OPTIONS_SCH = [
  { label: "全部仓库", value: "" },
  { label: "浦东仓", value: "浦东仓" },
  { label: "闵行仓", value: "闵行仓" },
];

const BATCH_OPTIONS = [
  { label: "全部批次", value: "" },
  { label: "一批", value: "一批" },
  { label: "二批", value: "二批" },
  { label: "三批", value: "三批" },
  { label: "四批", value: "四批" },
  { label: "五批", value: "五批" },
];

const CopyCell = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  const display = text.length > 30 ? text.slice(0, 28) + "…" : text;
  return (
    <div className="flex items-center gap-1 max-w-[200px]">
      <span className="text-xs text-[#334155] truncate" title={text}>{display}</span>
      <div className="relative flex-shrink-0">
        <button onClick={handleCopy} className="p-1 rounded hover:bg-[#F1F5F9] text-[#94A3B8] hover:text-[#2563EB] transition-colors">
          <Ic d={P.clipboard} size={11} />
        </button>
        {copied && <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-[#1E293B] text-white text-[10px] px-2 py-0.5 rounded whitespace-nowrap z-10">已复制</span>}
      </div>
    </div>
  );
};

export const DispatchScheduleList = ({ onWorkbench }: { onWorkbench: () => void }) => {
  const [showNewPlan, setShowNewPlan] = useState(false);
  const [planWh, setPlanWh] = useState("");
  const [planDate, setPlanDate] = useState("");
  const [planRemark, setPlanRemark] = useState("");
  const dateInput = <input type="date" className="border border-[#E2E8F0] rounded-md px-2 py-1.5 text-sm text-[#334155] bg-white focus:outline-none focus:ring-1 focus:ring-[#2563EB]" />;

  return (
    <div className="space-y-4">
      <PH
        crumbs={["履约后台", "排车管理", "已排班次列表"]}
        title="已排班次列表"
        actions={
          <div className="flex gap-2">
            <Btn variant="secondary" icon="download" size="sm">导出</Btn>
            <Btn variant="primary" size="sm" onClick={() => setShowNewPlan(true)}>+ 新增排车计划</Btn>
          </div>
        }
      />

      {/* Filters */}
      <Card>
        <FB>
          <FL label="补货单号"><Inp placeholder="补货单号模糊搜索" icon="search" className="w-44" /></FL>
          <FL label="仓库"><Sel className="w-36" options={WH_OPTIONS_SCH} /></FL>
          <FL label="补货批次"><Sel className="w-36" options={BATCH_OPTIONS} /></FL>
          <FL label="班次"><Inp placeholder="班次号 BC-xxx" icon="search" className="w-40" /></FL>
          <FL label="出单日期">{dateInput}</FL>
          <FL label="—">{dateInput}</FL>
          <FL label="推送履约时间">{dateInput}</FL>
          <FL label="—">{dateInput}</FL>
          <FL label="排车分配时间">{dateInput}</FL>
          <FL label="—">{dateInput}</FL>
          <div className="flex items-end gap-2 ml-auto">
            <Btn variant="secondary">重置</Btn>
            <Btn variant="primary" icon="search">搜索</Btn>
          </div>
        </FB>
      </Card>

      {/* Table */}
      <Card noPad>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse" style={{ minWidth: "1800px" }}>
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                {["班次编号","配送单号","配送仓库","配送人员","车辆车牌号","分配时间","补货单号","点位名称","点位编码","商品总数","出单日期","推送履约时间","状态","操作"].map(h => (
                  <th key={h} className="px-3 py-3 text-left text-[11px] font-semibold text-[#64748B] uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SCHEDULE_DATA.map((r, i) => (
                <tr key={r.deliveryNo} className={`border-b border-[#F1F5F9] hover:bg-[#F8FAFC] transition-colors ${i % 2 === 1 ? "bg-[#FAFBFC]" : ""}`}>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <span className="font-mono text-xs font-medium text-[#7C3AED]">{r.batchNo}</span>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <span className="font-mono text-xs font-medium text-[#2563EB] hover:underline cursor-pointer">{r.deliveryNo}</span>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-[#334155]">{r.warehouse}</td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-[#334155]">{r.driver}</td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <span className="font-mono text-xs bg-[#F8FAFC] border border-[#E2E8F0] px-2 py-0.5 rounded text-[#334155] tracking-widest">{r.plate}</span>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-xs text-[#64748B]">{r.assignTime}</td>
                  <td className="px-3 py-3"><CopyCell text={r.orders} /></td>
                  <td className="px-3 py-3"><CopyCell text={r.sites} /></td>
                  <td className="px-3 py-3"><CopyCell text={r.siteCodes} /></td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <span className="text-sm font-medium text-[#334155]">{r.goodsTotal} 件</span>
                    {r.coldTotal > 0 && <span className="ml-1 text-[10px] bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE] px-1.5 py-0.5 rounded-full">冷藏 {r.coldTotal}</span>}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-xs text-[#64748B]">{r.orderDate}</td>
                  <td className="px-3 py-3 whitespace-nowrap text-xs text-[#64748B]">{r.pushTime}</td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <Badge dot label={r.status} color="purple" />
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <button onClick={onWorkbench} className="px-2 py-1 text-[11px] text-[#2563EB] hover:bg-[#EFF6FF] rounded border border-transparent hover:border-[#BFDBFE] transition-all">详情</button>
                      <button onClick={onWorkbench} className="px-2 py-1 text-[11px] text-[#EA580C] hover:bg-[#FFF7ED] rounded border border-transparent hover:border-[#FED7AA] transition-all">重新分配</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pager total={SCHEDULE_DATA.length} />
      </Card>

      {/* 新增排车计划弹窗 */}
      {showNewPlan && (
        <Modal open={showNewPlan} title="新增排车计划" onClose={() => setShowNewPlan(false)} footer={
          <div className="flex gap-2 justify-end">
            <Btn variant="secondary" onClick={() => setShowNewPlan(false)}>返回</Btn>
            <Btn variant="primary" onClick={() => { setShowNewPlan(false); onWorkbench(); }}>去排车</Btn>
          </div>
        }>
          <div className="space-y-4 py-2">
            <div className="space-y-1">
              <label className="text-xs font-medium text-[#334155]">仓库名称 <span className="text-[#DC2626]">*</span></label>
              <Sel className="w-full" options={WH_OPTIONS_SCH.filter(o => o.value)} value={planWh} onChange={setPlanWh} />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-[#334155]">发车日期 <span className="text-[#DC2626]">*</span></label>
              <input type="date" value={planDate} onChange={e => setPlanDate(e.target.value)}
                className="w-full border border-[#E2E8F0] rounded-md px-3 py-2 text-sm text-[#334155] bg-white focus:outline-none focus:ring-1 focus:ring-[#2563EB]" />
              <p className="text-[11px] text-[#94A3B8] leading-snug">12点前操作：默认当日；12点后操作：默认次日</p>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-[#334155]">排车备注</label>
              <textarea value={planRemark} onChange={e => setPlanRemark(e.target.value)} maxLength={200} rows={3}
                placeholder="选填，200字以内"
                className="w-full border border-[#E2E8F0] rounded-md px-3 py-2 text-sm text-[#334155] bg-white focus:outline-none focus:ring-1 focus:ring-[#2563EB] resize-none" />
              <div className="text-right text-[11px] text-[#94A3B8]">{planRemark.length}/200</div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
