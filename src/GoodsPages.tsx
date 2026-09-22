import { useState, ReactNode } from "react";
import React from "react";

// ─── Icon ───────────────────────────────────────────────────────────────────
const Icon = ({ d, size = 16, className = "" }: { d: string; size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d={d} />
  </svg>
);
const I = {
  search: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0",
  plus: "M12 5v14M5 12h14",
  download: "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4 M7 10l5 5 5-5 M12 15V3",
  upload: "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4 M17 8l-5-5-5 5 M12 3v12",
  edit: "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7 M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",
  trash: "M3 6h18 M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6 M10 6V4h4v2",
  chevD: "M6 9l6 6 6-6",
  chevL: "M15 18l-6-6 6-6",
  x: "M18 6L6 18M6 6l12 12",
  check: "M20 6L9 17l-5-5",
  alert: "M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z M12 9v4 M12 17h.01",
  info: "M12 22a10 10 0 100-20 10 10 0 000 20z M12 8v4 M12 16h.01",
  copy: "M20 9h-9a2 2 0 00-2 2v9a2 2 0 002 2h9a2 2 0 002-2v-9a2 2 0 00-2-2z M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1",
  layers: "M12 2L2 7l10 5 10-5-10-5z M2 17l10 5 10-5 M2 12l10 5 10-5",
  barChart: "M18 20V10M12 20V4M6 20v-6",
  package: "M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z M7 7h.01",
  filter: "M22 3H2l8 9.46V19l4 2v-8.54L22 3",
  settings: "M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z",
  clock: "M12 22a10 10 0 100-20 10 10 0 000 20z M12 6v6l4 2",
  refresh: "M23 4v6h-6 M1 20v-6h6 M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15",
  thermometer: "M14 14.76V3.5a2.5 2.5 0 00-5 0v11.26a4.5 4.5 0 105 0z",
  zap: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  wifi: "M5 12.55a11 11 0 0114.08 0 M1.42 9a16 16 0 0121.16 0 M8.53 16.11a6 6 0 016.95 0 M12 20h.01",
  order: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2 M9 5a2 2 0 002 2h2a2 2 0 002-2 M9 5a2 2 0 012-2h2a2 2 0 012 2",
  tag: "M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z M7 7h.01",
  truck: "M1 3h15v13H1z M16 8h4l3 3v5h-7V8z M5.5 21a2.5 2.5 0 100-5 2.5 2.5 0 000 5z M18.5 21a2.5 2.5 0 100-5 2.5 2.5 0 000 5z",
  location: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z M12 10a2 2 0 100-4 2 2 0 000 4",
};

// ─── Design System ───────────────────────────────────────────────────────────
type BtnVariant = "primary" | "secondary" | "danger" | "ghost";
const btnCls: Record<BtnVariant, string> = {
  primary: "bg-[#2563EB] text-white hover:bg-[#1D4ED8]",
  secondary: "bg-white border border-[#E2E8F0] text-[#334155] hover:bg-[#F8FAFC]",
  danger: "bg-[#DC2626] text-white hover:bg-[#B91C1C]",
  ghost: "text-[#2563EB] hover:bg-[#EFF6FF]",
};
function Btn({ v = "secondary", children, onClick, disabled, className = "", icon }: { v?: BtnVariant; children: ReactNode; onClick?: (e: React.MouseEvent) => void; disabled?: boolean; className?: string; icon?: string }) {
  return (
    <button onClick={onClick} disabled={disabled} className={`inline-flex items-center gap-1.5 px-3 h-9 rounded-lg text-sm font-medium transition-colors ${btnCls[v]} ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} ${className}`}>
      {icon && <Icon d={icon} size={14} />}{children}
    </button>
  );
}
function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`bg-white border border-[#E2E8F0] rounded-xl shadow-sm ${className}`}>{children}</div>;
}
function FilterBar({ children }: { children: ReactNode }) {
  return <Card className="p-4 mb-4">{children}</Card>;
}
function FField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-[#64748B] font-medium">{label}</label>
      {children}
    </div>
  );
}
// 统计指标名：hover 时展示口径说明 tooltip
function StatLabel({ label, tip, className = "" }: { label: string; tip: string; className?: string }) {
  return (
    <span className={`relative inline-flex items-center gap-1 group cursor-help ${className}`}>
      {label}
      <Icon d={I.info} size={11} className="text-[#CBD5E1] group-hover:text-[#64748B] transition-colors" />
      <span className="absolute left-0 bottom-full mb-1.5 hidden group-hover:block whitespace-nowrap px-2.5 py-1.5 rounded-md bg-[#0F172A]/90 text-white text-[11px] font-normal shadow-lg z-20 pointer-events-none">
        {tip}
      </span>
    </span>
  );
}
function Inp({ value, onChange, placeholder, className = "" }: { value: string; onChange: (v: string) => void; placeholder?: string; className?: string }) {
  return <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={`h-9 border border-[#E2E8F0] rounded-md text-sm px-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] ${className}`} />;
}
function Sel({ value, onChange, children, className = "" }: { value: string; onChange: (v: string) => void; children: ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <select value={value} onChange={e => onChange(e.target.value)} className="h-9 border border-[#E2E8F0] rounded-md text-sm px-3 pr-8 appearance-none bg-white w-full focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] cursor-pointer">
        {children}
      </select>
      <Icon d={I.chevD} size={14} className="absolute right-2 top-2.5 text-[#94A3B8] pointer-events-none" />
    </div>
  );
}
function StatCard({ label, value, sub, accent = "#2563EB", icon }: { label: string; value: string; sub?: string; accent?: string; icon?: string }) {
  return (
    <Card className="flex items-stretch overflow-hidden">
      <div className="w-1 shrink-0" style={{ background: accent }} />
      <div className="p-4 flex-1">
        <div className="text-xs text-[#64748B] mb-1">{label}</div>
        <div className="text-2xl font-bold text-[#0F172A]">{value}</div>
        {sub && <div className="text-xs text-[#94A3B8] mt-0.5">{sub}</div>}
      </div>
      {icon && <div className="flex items-center pr-4"><Icon d={icon} size={28} className="text-[#E2E8F0]" /></div>}
    </Card>
  );
}
function THead({ cols }: { cols: string[] }) {
  return (
    <thead>
      <tr className="bg-[#F8FAFC]">
        {cols.map((c, i) => <th key={i} className="text-left text-xs font-semibold text-[#64748B] px-3 py-2.5 whitespace-nowrap border-b border-[#F1F5F9]">{c}</th>)}
      </tr>
    </thead>
  );
}
function TR({ children, onClick }: { children: ReactNode; onClick?: () => void }) {
  return <tr onClick={onClick} className={`border-b border-[#F1F5F9] ${onClick ? "cursor-pointer hover:bg-[#F8FAFC]" : "hover:bg-[#FAFAFA]"}`}>{children}</tr>;
}
function TD({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <td className={`px-3 py-2.5 text-sm text-[#334155] whitespace-nowrap ${className}`}>{children}</td>;
}
function StickyOp({ children }: { children: ReactNode }) {
  return <TD className="sticky right-0 bg-white shadow-[-4px_0_8px_rgba(0,0,0,0.04)]">{children}</TD>;
}
function Pagination({ page, total, onChange }: { page: number; total: number; onChange: (p: number) => void }) {
  const totalPages = Math.ceil(total / 10);
  return (
    <div className="flex items-center gap-2 px-4 py-3 text-sm text-[#64748B]">
      <span>共 {total} 条</span>
      <div className="flex items-center gap-1 ml-auto">
        <Btn v="secondary" onClick={() => onChange(Math.max(1, page - 1))} disabled={page === 1}><Icon d={I.chevL} size={14} /></Btn>
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map(p => (
          <button key={p} onClick={() => onChange(p)} className={`w-8 h-8 rounded-md text-sm ${p === page ? "bg-[#2563EB] text-white" : "hover:bg-[#F1F5F9] text-[#334155]"}`}>{p}</button>
        ))}
        <Btn v="secondary" onClick={() => onChange(Math.min(totalPages, page + 1))} disabled={page >= totalPages}><Icon d="M9 18l6-6-6-6" size={14} /></Btn>
      </div>
    </div>
  );
}
function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button onClick={() => onChange(!on)} className={`relative rounded-full transition-colors flex-shrink-0 ${on ? "bg-[#2563EB]" : "bg-[#CBD5E1]"}`} style={{ width: 40, height: 22 }}>
      <span className={`absolute top-0.5 bg-white rounded-full shadow transition-transform ${on ? "translate-x-5" : "translate-x-0.5"}`} style={{ width: 18, height: 18 }} />
    </button>
  );
}
const levelColors: Record<string, string> = {
  "S+": "bg-[#FFF1F2] text-[#E11D48]",
  "S": "bg-[#FFF7ED] text-[#C2410C]",
  "A": "bg-[#EFF6FF] text-[#2563EB]",
  "B": "bg-[#F5F3FF] text-[#7C3AED]",
  "C": "bg-[#F5F7FA] text-[#64748B]",
  "D": "bg-[#F3F4F6] text-[#94A3B8]",
  "N": "bg-[#F3F4F6] text-[#94A3B8]",
};
function LevelBadge({ level }: { level: string }) {
  return <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${levelColors[level] ?? levelColors["N"]}`}>{level}</span>;
}
function StatusPill({ label, color }: { label: string; color: "green" | "blue" | "orange" | "red" | "gray" }) {
  const cls = { green: "bg-[#DCFCE7] text-[#15803D]", blue: "bg-[#DBEAFE] text-[#1D4ED8]", orange: "bg-[#FEF3C7] text-[#B45309]", red: "bg-[#FEE2E2] text-[#DC2626]", gray: "bg-[#F3F4F6] text-[#6B7280]" };
  return <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${cls[color]}`}>{label}</span>;
}
function Modal({ open, onClose, title, children, footer, width = "max-w-lg" }: { open: boolean; onClose: () => void; title: string; children: ReactNode; footer?: ReactNode; width?: string }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className={`relative bg-white rounded-2xl shadow-xl w-full ${width} mx-4 flex flex-col max-h-[90vh]`}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2E8F0]">
          <span className="font-semibold text-[#0F172A]">{title}</span>
          <button onClick={onClose} className="text-[#94A3B8] hover:text-[#334155]"><Icon d={I.x} size={18} /></button>
        </div>
        <div className="p-6 overflow-y-auto flex-1">{children}</div>
        {footer && <div className="px-6 py-4 border-t border-[#E2E8F0] flex justify-end gap-2">{footer}</div>}
      </div>
    </div>
  );
}
function PageHeader({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h1 className="text-xl font-bold text-[#0F172A]">{title}</h1>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
}
function TabBar({ tabs, active, onChange, action }: { tabs: string[]; active: string; onChange: (t: string) => void; action?: ReactNode }) {
  return (
    <div className="flex items-center gap-2 border-b border-[#E2E8F0] mb-4">
      <div className="flex gap-0 overflow-x-auto flex-1 min-w-0">
        {tabs.map(t => (
          <button key={t} onClick={() => onChange(t)} className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${active === t ? "border-[#2563EB] text-[#2563EB]" : "border-transparent text-[#64748B] hover:text-[#334155]"}`}>{t}</button>
        ))}
      </div>
      {action}
    </div>
  );
}
function InfoGrid({ rows }: { rows: [string, ReactNode][] }) {
  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-3">
      {rows.map(([label, val]) => (
        <div key={label} className="flex gap-2">
          <span className="text-xs text-[#94A3B8] w-28 shrink-0 pt-0.5">{label}</span>
          <span className="text-sm text-[#334155]">{val}</span>
        </div>
      ))}
    </div>
  );
}
function SectionLabel({ children }: { children: ReactNode }) {
  return <div className="text-sm font-semibold text-[#0F172A] mb-3">{children}</div>;
}

// 与运营后台点位详情保持一致的字段/徽章组件
function Field({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div>
      <div className="text-xs text-[#94A3B8] mb-1">{label}</div>
      <div className="text-sm text-[#334155]">{value}</div>
    </div>
  );
}
function YNBadge({ yes }: { yes: boolean }) {
  return <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${yes ? "bg-[#F0FDF4] text-[#16A34A]" : "bg-[#F3F4F6] text-[#6B7280]"}`}>{yes ? "是" : "否"}</span>;
}
function AuditBadge({ s }: { s: string }) {
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${s === "审核通过" ? "bg-[#F0FDF4] text-[#16A34A]" : s === "待审核" ? "bg-[#FFFBEB] text-[#D97706]" : "bg-[#FEF2F2] text-[#DC2626]"}`}>{s}</span>;
}

// 智能柜详情 · 与点位详情对齐的写死数据
const CAB_WO_ROWS = [
  { model: "XC-PRO-6L", code: "DEV-20240101", installPos: "A座大厅入口左侧，正对电梯口", planTime: "2024-01-05 09:00", customLook: "是", report: "是", elevator: "是", shed: "否", actualTime: "2024-01-05 14:00", engineer: "王工", auditStatus: "审核通过", submitter: "李明", auditor: "张总", createTime: "2024-01-04 16:00", auditTime: "2024-01-06 10:00", remark: "需提前联系物业申请施工证" },
  { model: "XC-PRO-6L", code: "DEV-20240101", installPos: "—", planTime: "2024-03-15 09:00", customLook: "否", report: "否", elevator: "是", shed: "否", actualTime: "2024-03-16 11:00", engineer: "赵工", auditStatus: "审核通过", submitter: "陈静", auditor: "张总", createTime: "2024-03-14 14:30", auditTime: "2024-03-17 09:00", remark: "维修更换电路板" },
  { model: "XC-PRO-6L", code: "DEV-20240101", installPos: "—", planTime: "2024-09-01 09:00", customLook: "否", report: "是", elevator: "是", shed: "否", actualTime: "—", engineer: "刘工", auditStatus: "待审核", submitter: "王芳", auditor: "—", createTime: "2024-08-31 16:00", auditTime: "—", remark: "" },
];
const CAB_SALES_RANK = [
  { rank: 1, name: "农夫山泉 550ml", qty: 312, amount: "¥624.00" },
  { rank: 2, name: "东方树叶 500ml", qty: 287, amount: "¥861.00" },
  { rank: 3, name: "乐事薯片 75g", qty: 254, amount: "¥635.00" },
  { rank: 4, name: "元气森林苏打水", qty: 231, amount: "¥693.00" },
  { rank: 5, name: "百岁山矿泉水", qty: 198, amount: "¥396.00" },
  { rank: 6, name: "良品铺子坚果", qty: 176, amount: "¥880.00" },
  { rank: 7, name: "统一冰红茶 500ml", qty: 162, amount: "¥324.00" },
  { rank: 8, name: "卫龙辣条 28g", qty: 148, amount: "¥222.00" },
  { rank: 9, name: "三只松鼠混合坚果", qty: 134, amount: "¥938.00" },
  { rank: 10, name: "可口可乐 330ml", qty: 121, amount: "¥363.00" },
];
const CAB_RESTOCK_ROWS = [
  { id: "RO-2025-0301-001", batch: "第1批", creator: "张运营", executor: "李补货", time: "2025-03-01 10:00", qty: 48, done: "2025-03-01 14:30", status: "已完成" },
  { id: "RO-2025-0210-003", batch: "第1批", creator: "王主管", executor: "陈补货", time: "2025-02-10 09:30", qty: 36, done: "2025-02-10 13:00", status: "已完成" },
  { id: "RO-2025-0118-002", batch: "第2批", creator: "张运营", executor: "—", time: "2025-01-18 08:00", qty: 24, done: "—", status: "待履约" },
];
const CAB_RESTOCK_DAYS = [
  { day: "周一", enabled: true, time: "09:00", threshold: "20" },
  { day: "周二", enabled: true, time: "09:00", threshold: "20" },
  { day: "周三", enabled: true, time: "09:00", threshold: "20" },
  { day: "周四", enabled: true, time: "09:00", threshold: "20" },
  { day: "周五", enabled: true, time: "09:00", threshold: "20" },
  { day: "周六", enabled: false, time: "09:00", threshold: "20" },
  { day: "周日", enabled: false, time: "09:00", threshold: "20" },
];

// ─── Mock Data ───────────────────────────────────────────────────────────────
const CABINETS = [
  { id: "SZ001", name: "深圳科技园A座大厅", customer: "腾讯科技", asset: "DEV-20240101", level: "S+", stock: 480, skuCount: 32, skuTypes: 28, shortage: 0 },
  { id: "SZ002", name: "南山区商务中心B栋", customer: "华为技术", asset: "DEV-20240102", level: "S", stock: 312, skuCount: 24, skuTypes: 20, shortage: 3 },
  { id: "GZ001", name: "广州天河CBD写字楼", customer: "广汽集团", asset: "DEV-20240103", level: "A", stock: 276, skuCount: 20, skuTypes: 18, shortage: 0 },
  { id: "SH001", name: "上海陆家嘴金融中心", customer: "平安银行", asset: "DEV-20240104", level: "S+", stock: 520, skuCount: 35, skuTypes: 30, shortage: 5 },
  { id: "BJ001", name: "北京中关村软件园", customer: "百度公司", asset: "DEV-20240105", level: "A", stock: 198, skuCount: 16, skuTypes: 14, shortage: 2 },
  { id: "CD001", name: "成都高新区天府大道", customer: "阿里巴巴", asset: "DEV-20240106", level: "B", stock: 144, skuCount: 12, skuTypes: 10, shortage: 0 },
  { id: "WH001", name: "武汉光谷创意天地", customer: "小米科技", asset: "DEV-20240107", level: "C", stock: 96, skuCount: 8, skuTypes: 7, shortage: 1 },
  { id: "XA001", name: "西安高新区软件新城", customer: "陕西移动", asset: "DEV-20240108", level: "B", stock: 168, skuCount: 14, skuTypes: 12, shortage: 0 },
];
const SKU_LIST = [
  { id: "S001", name: "农夫山泉550ml", spec: "550ml×24", cat1: "饮料", cat2: "水", price: 2.5, expiry: 365, avgSale: 18.2, stockRate: "92%", goodsRate: "88%", layer: 1, sugStock: 48, realStock: 36, onSaleStock: 36, warehouseStock: 240, onSaleDays: 45 },
  { id: "S002", name: "可口可乐330ml", spec: "330ml×24", cat1: "饮料", cat2: "碳酸", price: 3.5, expiry: 270, avgSale: 12.4, stockRate: "85%", goodsRate: "80%", layer: 2, sugStock: 36, realStock: 24, onSaleStock: 24, warehouseStock: 180, onSaleDays: 38 },
  { id: "S003", name: "旺旺雪饼68g", spec: "68g×30", cat1: "零食", cat2: "膨化", price: 4.0, expiry: 180, avgSale: 8.6, stockRate: "78%", goodsRate: "72%", layer: 3, sugStock: 30, realStock: 20, onSaleStock: 18, warehouseStock: 150, onSaleDays: 22 },
  { id: "S004", name: "元气森林气泡水", spec: "480ml×15", cat1: "饮料", cat2: "气泡水", price: 5.0, expiry: 365, avgSale: 15.8, stockRate: "95%", goodsRate: "90%", layer: 1, sugStock: 45, realStock: 40, onSaleStock: 38, warehouseStock: 320, onSaleDays: 60 },
  { id: "S005", name: "卫龙辣条40g", spec: "40g×20", cat1: "零食", cat2: "辣条", price: 3.0, expiry: 120, avgSale: 10.2, stockRate: "82%", goodsRate: "76%", layer: 4, sugStock: 24, realStock: 18, onSaleStock: 16, warehouseStock: 200, onSaleDays: 30 },
  { id: "S006", name: "伊利纯牛奶250ml", spec: "250ml×24", cat1: "饮料", cat2: "乳制品", price: 3.8, expiry: 30, avgSale: 9.4, stockRate: "88%", goodsRate: "84%", layer: 2, sugStock: 36, realStock: 28, onSaleStock: 26, warehouseStock: 120, onSaleDays: 20 },
  { id: "S007", name: "三只松鼠坚果35g", spec: "35g×20", cat1: "零食", cat2: "坚果", price: 6.5, expiry: 90, avgSale: 6.2, stockRate: "70%", goodsRate: "65%", layer: 5, sugStock: 18, realStock: 12, onSaleStock: 10, warehouseStock: 80, onSaleDays: 18 },
  { id: "S008", name: "红牛250ml", spec: "250ml×24", cat1: "饮料", cat2: "功能饮料", price: 6.0, expiry: 730, avgSale: 7.8, stockRate: "75%", goodsRate: "70%", layer: 3, sugStock: 24, realStock: 16, onSaleStock: 14, warehouseStock: 160, onSaleDays: 35 },
];
const RESTOCK_ORDERS = [
  { id: "RO20240901001", cabinetName: "深圳科技园A座", cabinetId: "SZ001", asset: "DEV-20240101", warehouse: "深圳中央仓", label: "常规", isAuto: "否", batch: "第一批次", skuTypes: 12, total: 144, lastDate: "2024-09-01", createDate: "2024-08-31", status: "履约完成", sorter: "李明", sortDone: "2024-09-01 08:00", delivery: "张伟", deliveryDone: "2024-09-01 11:30" },
  { id: "RO20240901002", cabinetName: "南山商务中心", cabinetId: "SZ002", asset: "DEV-20240102", warehouse: "深圳中央仓", label: "紧急", isAuto: "是", batch: "第二批次", skuTypes: 8, total: 96, lastDate: "2024-09-01", createDate: "2024-09-01", status: "配送中", sorter: "王芳", sortDone: "2024-09-01 09:00", delivery: "赵磊", deliveryDone: "" },
  { id: "RO20240902001", cabinetName: "广州天河CBD", cabinetId: "GZ001", asset: "DEV-20240103", warehouse: "华南区域仓", label: "常规", isAuto: "否", batch: "第一批次", skuTypes: 10, total: 120, lastDate: "2024-09-02", createDate: "2024-09-01", status: "分拣中", sorter: "陈静", sortDone: "", delivery: "", deliveryDone: "" },
  { id: "RO20240902002", cabinetName: "上海陆家嘴", cabinetId: "SH001", asset: "DEV-20240104", warehouse: "华东配送仓", label: "常规", isAuto: "是", batch: "第一批次", skuTypes: 15, total: 180, lastDate: "2024-09-02", createDate: "2024-09-02", status: "待分拣", sorter: "", sortDone: "", delivery: "", deliveryDone: "" },
  { id: "RO20240903001", cabinetName: "北京中关村", cabinetId: "BJ001", asset: "DEV-20240105", warehouse: "华北仓", label: "常规", isAuto: "否", batch: "第二批次", skuTypes: 6, total: 72, lastDate: "2024-09-03", createDate: "2024-09-02", status: "已取消", sorter: "", sortDone: "", delivery: "", deliveryDone: "" },
  { id: "RO20240903002", cabinetName: "成都高新区", cabinetId: "CD001", asset: "DEV-20240106", warehouse: "西南仓", label: "常规", isAuto: "是", batch: "第三批次", skuTypes: 7, total: 84, lastDate: "2024-09-03", createDate: "2024-09-03", status: "待配送", sorter: "刘洋", sortDone: "2024-09-03 10:00", delivery: "", deliveryDone: "" },
  { id: "RO20240904001", cabinetName: "武汉光谷", cabinetId: "WH001", asset: "DEV-20240107", warehouse: "华中仓", label: "紧急", isAuto: "否", batch: "第一批次", skuTypes: 5, total: 60, lastDate: "2024-09-04", createDate: "2024-09-03", status: "履约失败", sorter: "孙丽", sortDone: "2024-09-03 14:00", delivery: "周鑫", deliveryDone: "" },
  { id: "RO20240904002", cabinetName: "西安高新区", cabinetId: "XA001", asset: "DEV-20240108", warehouse: "西北仓", label: "常规", isAuto: "是", batch: "第二批次", skuTypes: 9, total: 108, lastDate: "2024-09-04", createDate: "2024-09-04", status: "分车中", sorter: "马超", sortDone: "", delivery: "", deliveryDone: "" },
];
const statusColor = (s: string): "green" | "blue" | "orange" | "red" | "gray" => {
  if (["履约完成"].includes(s)) return "green";
  if (["分车中", "分拣中", "配送中"].includes(s)) return "blue";
  if (["待分车", "待分拣", "待配送"].includes(s)) return "orange";
  return "gray";
};
const colorSwatches = ["#BFDBFE", "#BBF7D0", "#FDE68A", "#FECACA", "#DDD6FE", "#BAE6FD", "#FED7AA", "#A7F3D0"];

// ═══════════════════════════════════════════════════════════════════════════════
// 1. SmartCabinetList
// ═══════════════════════════════════════════════════════════════════════════════
function SmartCabinetList({ onDetail, onInventory, onRestock }: { onDetail: () => void; onInventory: () => void; onRestock: () => void }) {
  const [name, setName] = useState("");
  const [customer, setCustomer] = useState("");
  const [asset, setAsset] = useState("");
  const [level, setLevel] = useState("全部");
  const [warehouse, setWarehouse] = useState("全部");
  const [province, setProvince] = useState("全部");
  const [city, setCity] = useState("全部");
  const [district, setDistrict] = useState("全部");
  const [page, setPage] = useState(1);

  const resetFilters = () => {
    setName(""); setCustomer(""); setAsset(""); setLevel("全部"); setWarehouse("全部");
    setProvince("全部"); setCity("全部"); setDistrict("全部");
  };

  return (
    <div className="p-6 bg-[#F5F7FA] min-h-screen">
      <PageHeader title="智能柜商品库">
        <Btn v="secondary" icon={I.download}>导出智能柜列表</Btn>
        <Btn v="secondary" icon={I.download}>导出SKU列表</Btn>
      </PageHeader>
      <FilterBar>
        <div className="flex flex-wrap gap-x-3 gap-y-3 items-start">
          <FField label="点位名称/编码"><Inp value={name} onChange={setName} placeholder="请输入点位名称/编码" className="w-40" /></FField>
          <FField label="点位客户"><Inp value={customer} onChange={setCustomer} placeholder="客户名称/编码" className="w-44" /></FField>
          <FField label="资产编码"><Inp value={asset} onChange={setAsset} placeholder="请输入资产编码" className="w-36" /></FField>
          <FField label="点位等级">
            <Sel value={level} onChange={setLevel} className="w-32">
              {["全部", "S+", "S", "A", "B", "C", "D", "N"].map(v => <option key={v}>{v}</option>)}
            </Sel>
          </FField>
          <FField label="关联供货仓库">
            <Sel value={warehouse} onChange={setWarehouse} className="w-40">
              {["全部", "深圳中央仓", "华南区域仓", "华东配送仓"].map(v => <option key={v}>{v}</option>)}
            </Sel>
          </FField>
          <FField label="地区">
            <div className="flex gap-2">
              <Sel value={province} onChange={setProvince} className="w-28">
                {["全部", "广东省", "上海市", "北京市", "四川省"].map(v => <option key={v}>{v}</option>)}
              </Sel>
              <Sel value={city} onChange={setCity} className="w-28">
                {["全部", "深圳市", "广州市", "上海市", "北京市"].map(v => <option key={v}>{v}</option>)}
              </Sel>
              <Sel value={district} onChange={setDistrict} className="w-28">
                {["全部", "南山区", "天河区", "浦东新区", "海淀区"].map(v => <option key={v}>{v}</option>)}
              </Sel>
            </div>
          </FField>
          <div className="flex gap-2 self-end">
            <Btn v="secondary" onClick={resetFilters}>重置</Btn>
            <Btn v="primary" icon={I.search}>搜索</Btn>
          </div>
        </div>
      </FilterBar>
      <div className="grid grid-cols-4 gap-4 mb-4">
        <StatCard label="智能柜数量" value="128" sub="台" accent="#2563EB" icon={I.layers} />
        <StatCard label="在售SKU种类数" value="847" sub="种" accent="#7C3AED" icon={I.package} />
        <StatCard label="在售预存量" value="24,316" sub="件" accent="#059669" icon={I.barChart} />
        <StatCard label="预存缺货数" value="23" sub="件" accent="#DC2626" icon={I.alert} />
      </div>
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <THead cols={["点位编码", "点位名称", "归属客户名称", "绑定设备资产编码", "当前等级", "总在售预存量", "总在售SKU种类数", "总在售SKU数", "预存缺货数", "操作"]} />
            <tbody>
              {CABINETS.map(r => (
                <TR key={r.id} onClick={onDetail}>
                  <TD><span className="text-[#2563EB] font-mono text-xs">{r.id}</span></TD>
                  <TD>{r.name}</TD>
                  <TD>{r.customer}</TD>
                  <TD><span className="font-mono text-xs text-[#64748B]">{r.asset}</span></TD>
                  <TD><LevelBadge level={r.level} /></TD>
                  <TD>{r.stock}</TD>
                  <TD>{r.skuTypes}</TD>
                  <TD>{r.skuCount}</TD>
                  <TD><span className={r.shortage > 0 ? "text-[#DC2626] font-semibold" : ""}>{r.shortage}</span></TD>
                  <StickyOp>
                    <div className="flex gap-1">
                      <Btn v="ghost" onClick={e => { e.stopPropagation(); onDetail(); }} className="text-xs px-2 h-7">详情信息</Btn>
                      <Btn v="ghost" onClick={e => { e.stopPropagation(); onInventory(); }} className="text-xs px-2 h-7">商品库存管理</Btn>
                      <Btn v="ghost" onClick={e => { e.stopPropagation(); onRestock(); }} className="text-xs px-2 h-7">发起补货单</Btn>
                    </div>
                  </StickyOp>
                </TR>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination page={page} total={80} onChange={setPage} />
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 2. SmartCabinetDetail
// ═══════════════════════════════════════════════════════════════════════════════
function SmartCabinetDetail({ onBack, onInventory, onEditLocation }: { onBack: () => void; onInventory: () => void; onEditLocation?: () => void }) {
  const tabs = ["点位信息", "联系人信息", "设备信息", "设备云信息", "运营配置", "工单记录", "经营数据", "补货记录", "商务/合同信息"];
  const [tab, setTab] = useState("点位信息");
  const [photoModal, setPhotoModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(0);
  const [woDetail, setWoDetail] = useState<number | null>(null);


  return (
    <div className="p-6 bg-[#F5F7FA] min-h-screen">
      <PageHeader title="智能柜详情">
        <Btn v="secondary" onClick={onBack} icon={I.chevL}>返回</Btn>
        <Btn v="primary" onClick={onInventory} icon={I.layers}>商品库存管理</Btn>
      </PageHeader>
      <div className="grid grid-cols-4 gap-4 mb-4">
        <StatCard label="昨日总销售额" value="¥3,241" sub="+12% 较前日" accent="#2563EB" />
        <StatCard label="本月总销售额" value="¥48,200" sub="目标达成率 78%" accent="#059669" />
        <StatCard label="昨日总订单数" value="156" sub="单" accent="#7C3AED" />
        <StatCard label="本月总订单数" value="2,840" sub="单" accent="#D97706" />
      </div>
      <Card className="p-4">
        <TabBar tabs={tabs} active={tab} onChange={setTab} action={
          onEditLocation && (
            <Btn v="primary" icon={I.edit} onClick={onEditLocation}>编辑点位信息</Btn>
          )
        } />
        {tab === "点位信息" && (
          <div className="space-y-5">
            <div className="grid grid-cols-3 gap-x-8 gap-y-5">
              <Field label="归属客户" value={<span className="text-[#2563EB] font-medium">腾讯科技</span>} />
              <Field label="关联供货仓库" value="深圳中央仓" />
              <Field label="点位名称" value="科技园A座大厅" />
              <Field label="点位地区" value="广东省 · 深圳市 · 南山区" />
              <Field label="详细地址" value="广东省深圳市南山区科技园A座1楼大厅" />
              <Field label="覆盖人数" value="约 2,000 人" />
              <Field label="一级场景" value="商务办公" />
              <Field label="二级场景" value="写字楼" />
              <Field label="设备安装位置" value="电梯口旁" />
              <Field label="竞对智能售货机" value={<YNBadge yes={false} />} />
              <Field label="竞对传统售货机" value={<YNBadge yes={false} />} />
              <Field label="百米内便利店" value={<YNBadge yes={true} />} />
              <div className="col-span-3">
                <Field label="点位信息备注" value={<span className="text-[#64748B]">大厅人流量大，早晚高峰明显，建议保持满货。</span>} />
              </div>
            </div>
            <div className="border-t border-[#F1F5F9] pt-5">
              <div className="text-xs text-[#94A3B8] mb-2">经纬度 <span className="text-[#CBD5E1]">— 位置示意，只读</span></div>
              <div className="relative h-40 rounded-lg border border-[#E2E8F0] overflow-hidden bg-[#E8EEF0]">
                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 800 160">
                  <rect width="800" height="160" fill="#E8EEF0" />
                  <rect x="60" y="14" width="150" height="56" rx="4" fill="#DCE9DC" />
                  <rect x="590" y="80" width="170" height="66" rx="4" fill="#DCE9DC" />
                  <rect x="350" y="100" width="120" height="46" rx="4" fill="#E3E8E4" />
                  <path d="M0 40 H800 M0 95 H800 M120 0 V160 M330 0 V160 M560 0 V160 M720 0 V160" stroke="#FFFFFF" strokeWidth="9" fill="none" />
                  <path d="M0 128 Q 200 108 420 132 T 800 118" stroke="#C7DCE8" strokeWidth="14" fill="none" opacity="0.8" />
                </svg>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
                  <Icon d={I.location} size={30} className="text-[#2563EB] drop-shadow-md" />
                </div>
                <div className="absolute bottom-2 left-2 flex items-center gap-1.5 bg-white/90 rounded-md px-2.5 py-1 shadow-sm">
                  <Icon d={I.location} size={12} className="text-[#2563EB]" />
                  <span className="font-mono text-xs text-[#64748B]">113.940800, 22.543100</span>
                </div>
                <span className="absolute top-2 right-2 text-[10px] text-[#94A3B8] bg-white/85 rounded px-1.5 py-0.5">地图示意 · 只读</span>
              </div>
            </div>
            <div className="border-t border-[#F1F5F9] pt-5">
              <div className="text-xs text-[#94A3B8] mb-2">场地照片 <span className="text-[#CBD5E1]">— 点击放大</span></div>
              <div className="flex gap-2">
                {["#DBEAFE", "#EDE9FE", "#DCFCE7"].map((bg, i) => (
                  <button key={i} onClick={() => { setSelectedPhoto(i); setPhotoModal(true); }}
                    className="w-20 h-20 rounded-lg flex items-center justify-center hover:ring-2 hover:ring-[#2563EB]/40 transition-all flex-shrink-0" style={{ background: bg }}>
                    <svg viewBox="0 0 40 40" className="w-8 h-8 opacity-40"><rect x="4" y="10" width="32" height="22" rx="3" fill="#2563EB" /><circle cx="14" cy="18" r="3" fill="white" /><path d="M4 28l9-7 7 6 5-4 11 9" fill="none" stroke="white" strokeWidth="2" strokeLinejoin="round" /></svg>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        {tab === "联系人信息" && (
          <div className="grid grid-cols-3 gap-x-8 gap-y-5">
            <Field label="联系人姓名" value="张建国" />
            <Field label="联系电话" value="138 0013 8000" />
            <Field label="联系人性别" value="男" />
            <Field label="联系人微信号" value="zhangjg_sz" />
            <Field label="联系人邮箱" value="zhang@techinc.com" />
            <Field label="联系人身份" value="场地负责人" />
          </div>
        )}
        {tab === "设备信息" && (
          <div className="grid grid-cols-3 gap-x-8 gap-y-5">
            <Field label="设备资产编码" value={<span className="font-mono text-xs bg-[#F1F5F9] px-2 py-0.5 rounded text-[#64748B]">DEV-20240101</span>} />
            <Field label="设备型号" value="XC-PRO-6L" />
            <Field label="功能属性" value="冷藏+常温" />
            <Field label="尺寸" value="W500 × D600 × H1800 mm" />
            <Field label="层板配置" value="6 层，每层 8 格" />
            <Field label="额定电压" value="220V / 50Hz" />
            <Field label="额定电流" value="2.5A" />
            <Field label="额定功率" value="550W" />
            <Field label="额定功耗" value="≤ 3.5 kWh/24h" />
            <Field label="刷脸屏" value={<YNBadge yes={true} />} />
            <Field label="摄像头" value={<YNBadge yes={true} />} />
          </div>
        )}
        {tab === "设备云信息" && (
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "在线状态", value: <span className="inline-flex items-center justify-center w-full px-3 py-1.5 rounded-full text-xs font-semibold bg-[#DCFCE7] text-[#16A34A]">在线</span>, icon: I.wifi, ts: "2024-09-04 14:32:05" },
              { label: "实时温度", value: <span className="text-2xl font-bold text-[#0F172A]">4.2°C</span>, icon: I.thermometer, ts: "2024-09-04 14:31:58" },
              { label: "实时功率", value: <span className="text-2xl font-bold text-[#0F172A]">312W</span>, icon: I.zap, ts: "2024-09-04 14:32:01" },
            ].map(c => (
              <Card key={c.label} className="p-5 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#64748B]">{c.label}</span>
                  <Icon d={c.icon} size={20} className="text-[#94A3B8]" />
                </div>
                {c.value}
                <div className="text-xs text-[#94A3B8]">云端更新于 {c.ts}</div>
              </Card>
            ))}
          </div>
        )}
        {tab === "运营配置" && (
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-semibold text-[#0F172A]">补货设置</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#F1F5F9] text-[#94A3B8]">只读</span>
            </div>
            <p className="text-xs text-[#94A3B8] mb-3">该点位允许自动补货的时间范围及补货阈值</p>
            <div className="border border-[#E2E8F0] rounded-lg overflow-hidden">
              <div className="grid bg-[#F8FAFC] border-b border-[#E2E8F0] text-xs font-medium text-[#6B7280]"
                style={{ gridTemplateColumns: "120px 1fr 200px" }}>
                <div className="px-4 py-2.5">适用日</div>
                <div className="px-4 py-2.5">允许补货时间</div>
                <div className="px-4 py-2.5">自动补货阈值（件）</div>
              </div>
              {CAB_RESTOCK_DAYS.filter(d => d.enabled).map(d => (
                <div key={d.day} className="grid items-center border-b border-[#F1F5F9] last:border-0 bg-white"
                  style={{ gridTemplateColumns: "120px 1fr 200px" }}>
                  <div className="px-4 py-3 flex items-center gap-2">
                    <Icon d={I.check} size={14} className="text-[#2563EB]" />
                    <span className="text-sm font-medium text-[#0F172A]">{d.day}</span>
                  </div>
                  <div className="px-4 py-3 text-sm text-[#334155] flex items-center gap-1.5">
                    <Icon d={I.clock} size={14} className="text-[#94A3B8]" />
                    {d.time}
                  </div>
                  <div className="px-4 py-3 text-sm text-[#334155]">{d.threshold} <span className="text-xs text-[#94A3B8]">件</span></div>
                </div>
              ))}
            </div>
            <p className="text-xs text-[#CBD5E1] mt-2">未勾选的日期（{CAB_RESTOCK_DAYS.filter(d => !d.enabled).map(d => d.day).join("、")}）不自动出单</p>
          </div>
        )}
        {tab === "经营数据" && (
          <div>
            <div className="text-sm font-semibold text-[#0F172A] mb-3">KPI 指标卡</div>
            <div className="grid grid-cols-2 gap-4 mb-7">
              {[
                { label: "销售额汇总", yesterday: "¥3,241", month: "¥48,200", sub: "不含未支付和失败订单" },
                { label: "订单数汇总", yesterday: "156 笔", month: "2,840 笔", sub: "不含未支付和失败订单" },
              ].map(k => (
                <div key={k.label} className="rounded-xl border border-[#E2E8F0] p-5">
                  <div className="text-xs text-[#94A3B8] mb-3">{k.label}</div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-[10px] text-[#94A3B8] mb-1">昨日总计</div>
                      <div className="text-xl font-bold text-[#0F172A]">{k.yesterday}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[#94A3B8] mb-1">本月总计</div>
                      <div className="text-xl font-bold text-[#2563EB]">{k.month}</div>
                    </div>
                  </div>
                  <div className="text-[10px] text-[#94A3B8] mt-3 pt-3 border-t border-[#F1F5F9]">{k.sub}</div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-[#0F172A]">商品销量排行榜</span>
              <span className="text-xs text-[#94A3B8]">默认展示 TOP 10</span>
            </div>
            <table className="w-full text-sm mb-2">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                  {["排名", "商品名称", "销量", "销售额"].map(h => (
                    <th key={h} className="py-2.5 px-3 text-left text-xs font-medium text-[#64748B]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CAB_SALES_RANK.map(r => (
                  <tr key={r.rank} className="border-b border-[#F1F5F9] hover:bg-[#F8FAFC]">
                    <td className="py-2.5 px-3">
                      <span className={`inline-flex w-6 h-6 items-center justify-center rounded-full text-xs font-bold
                        ${r.rank === 1 ? "bg-[#FEF9C3] text-[#CA8A04]" : r.rank === 2 ? "bg-[#F1F5F9] text-[#475569]" : r.rank === 3 ? "bg-[#FFF7ED] text-[#C2410C]" : "text-[#94A3B8]"}`}>
                        {r.rank}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-[#334155]">{r.name}</td>
                    <td className="py-2.5 px-3 font-medium text-[#0F172A]">{r.qty}</td>
                    <td className="py-2.5 px-3 font-semibold text-[#2563EB]">{r.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {tab === "工单记录" && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm font-medium text-[#0F172A]">装机工单列表</span>
              <span className="text-xs text-[#94A3B8] bg-[#F1F5F9] px-2 py-0.5 rounded-full">一期仅展示装机工单</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm whitespace-nowrap">
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                    {["设备型号","资产条码","预计安装时间","实际安装时间","安装工程人员","审核状态","提交人","审核人","创建时间","审核完成时间","备注","操作"].map(h => (
                      <th key={h} className="py-2.5 px-3 text-left text-xs font-medium text-[#64748B]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {CAB_WO_ROWS.map((w, i) => (
                    <tr key={i} className="border-b border-[#F1F5F9] hover:bg-[#F8FAFC]">
                      <td className="py-3 px-3 text-[#334155]">{w.model}</td>
                      <td className="py-3 px-3 font-mono text-xs text-[#64748B]">{w.code}</td>
                      <td className="py-3 px-3 text-[#334155]">{w.planTime.slice(0, 10)}</td>
                      <td className="py-3 px-3 text-[#334155]">{w.actualTime === "—" ? "—" : w.actualTime.slice(0, 10)}</td>
                      <td className="py-3 px-3 text-[#334155]">{w.engineer}</td>
                      <td className="py-3 px-3"><AuditBadge s={w.auditStatus} /></td>
                      <td className="py-3 px-3 text-[#334155]">{w.submitter}</td>
                      <td className="py-3 px-3 text-[#334155]">{w.auditor}</td>
                      <td className="py-3 px-3 text-xs text-[#64748B]">{w.createTime}</td>
                      <td className="py-3 px-3 text-xs text-[#64748B]">{w.auditTime}</td>
                      <td className="py-3 px-3 text-xs text-[#64748B]">{w.remark || "—"}</td>
                      <td className="py-3 px-3">
                        <button onClick={() => setWoDetail(i)} className="text-xs text-[#2563EB] hover:underline">详情</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {tab === "补货记录" && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-[#0F172A]">补货记录</span>
              <span className="text-xs text-[#94A3B8]">默认展示最近 3 个月</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm whitespace-nowrap">
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                    {["补货单号","补货批次","创建人员","履约人员","补货时间","补货件数","履约完成时间","状态"].map(h => (
                      <th key={h} className="py-2.5 px-3 text-left text-xs font-medium text-[#64748B]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {CAB_RESTOCK_ROWS.map(r => (
                    <tr key={r.id} className="border-b border-[#F1F5F9] hover:bg-[#F8FAFC]">
                      <td className="py-3 px-3 font-mono text-xs text-[#2563EB]">{r.id}</td>
                      <td className="py-3 px-3 text-[#334155]">{r.batch}</td>
                      <td className="py-3 px-3 text-[#334155]">{r.creator}</td>
                      <td className="py-3 px-3 text-[#334155]">{r.executor}</td>
                      <td className="py-3 px-3 text-xs text-[#64748B]">{r.time}</td>
                      <td className="py-3 px-3 font-medium text-[#0F172A]">{r.qty} 件</td>
                      <td className="py-3 px-3 text-xs text-[#64748B]">{r.done}</td>
                      <td className="py-3 px-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${r.status === "已完成" ? "bg-[#F0FDF4] text-[#16A34A]" : "bg-[#FFFBEB] text-[#D97706]"}`}>{r.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {tab === "商务/合同信息" && (
          <div className="grid grid-cols-3 gap-x-8 gap-y-5">
            <div className="col-span-3">
              <Field label="合同附件" value={
                <div className="flex items-center gap-3 mt-1">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC]">
                    <Icon d={I.layers} size={14} className="text-[#2563EB]" />
                    <span className="text-sm text-[#334155]">腾讯·科技园A座_合同_2024.pdf</span>
                  </div>
                  <button className="flex items-center gap-1 text-xs text-[#2563EB] hover:underline">
                    <Icon d={I.download} size={12} />下载
                  </button>
                </div>
              } />
            </div>
            <Field label="合同有效期" value="2024-01-01 ~ 2026-12-31" />
            <Field label="保证金金额" value="¥5,000.00" />
          </div>
        )}
      </Card>
      <Modal open={photoModal} onClose={() => setPhotoModal(false)} title="场地照片" footer={<Btn v="secondary" onClick={() => setPhotoModal(false)}>关闭</Btn>}>
        <div className="h-64 rounded-xl flex items-center justify-center text-[#64748B] text-sm font-medium" style={{ background: ["#DBEAFE", "#DCFCE7", "#FEF3C7"][selectedPhoto] }}>
          {["大厅正面", "柜体内部", "周边环境"][selectedPhoto]}
        </div>
      </Modal>
      {woDetail !== null && (() => { const w = CAB_WO_ROWS[woDetail]; return (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center" onClick={() => setWoDetail(null)}>
          <div className="bg-white rounded-2xl p-6 max-w-3xl w-full mx-4 shadow-2xl max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-[#0F172A]">装机工单详情</span>
                <span className="font-mono text-xs font-semibold text-[#2563EB]">{w.code}</span>
                <AuditBadge s={w.auditStatus} />
              </div>
              <button onClick={() => setWoDetail(null)} className="w-7 h-7 rounded-full bg-[#F1F5F9] flex items-center justify-center hover:bg-[#E2E8F0]">
                <Icon d={I.x} size={14} className="text-[#64748B]" />
              </button>
            </div>
            <div className="text-xs text-[#94A3B8] mb-4">创建于 {w.createTime}</div>
            <div className="grid grid-cols-3 gap-x-8 gap-y-4">
              {[
                { l: "设备型号", v: <span>{w.model}</span> },
                { l: "设备安装位置", v: <span>{w.installPos}</span> },
                { l: "需求安装时间", v: <span>{w.planTime}</span> },
                { l: "是否定制外观", v: <YNBadge yes={w.customLook === "是"} /> },
                { l: "是否需提前报备", v: <YNBadge yes={w.report === "是"} /> },
                { l: "是否有电梯", v: <YNBadge yes={w.elevator === "是"} /> },
                { l: "是否需户外棚", v: <YNBadge yes={w.shed === "是"} /> },
                { l: "设备资产条码", v: <span>{w.code}</span> },
                { l: "实际安装时间", v: <span>{w.actualTime}</span> },
                { l: "安装工程人员", v: <span>{w.engineer}</span> },
                { l: "工单提交人", v: <span>{w.submitter}</span> },
                { l: "工单审核人", v: <span>{w.auditor}</span> },
                { l: "工单创建时间", v: <span>{w.createTime}</span> },
                { l: "工单审核完成时间", v: <span>{w.auditTime}</span> },
              ].map(f => (
                <div key={f.l}>
                  <div className="text-xs text-[#94A3B8] mb-1">{f.l}</div>
                  <div className="text-sm text-[#334155]">{f.v}</div>
                </div>
              ))}
            </div>
            {w.customLook === "是" && (
              <div className="mt-4">
                <div className="text-xs text-[#94A3B8] mb-2">点位外观照片</div>
                <div className="flex gap-2">
                  {["正面", "侧面"].map(t => (
                    <div key={t} className="w-14 h-14 rounded-lg bg-[#F5F7FA] border border-[#E2E8F0] flex items-center justify-center">
                      <span className="text-[10px] text-[#94A3B8]">{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {w.remark && (
              <div className="mt-4 pt-3 border-t border-[#F1F5F9]">
                <span className="text-xs text-[#94A3B8]">备注（其他要求）：</span>
                <span className="text-xs text-[#64748B]">{w.remark}</span>
              </div>
            )}
          </div>
        </div>
      ); })()}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 3. InventoryManagement
// ═══════════════════════════════════════════════════════════════════════════════
type SkuRow = {
  id: string; name: string; spec: string; cat1: string; cat2: string; price: number; expiry: number;
  avgSale: number; stockRate: string; goodsRate: string; layer: number; sugStock: number;
  realStock: number; onSaleStock: number; warehouseStock: number; onSaleDays: number; checked: boolean;
};

function InventoryManagement({ onBack, onListProduct, onRestock }: { onBack: () => void; onListProduct: () => void; onRestock: () => void }) {
  const [skus, setSkus] = useState<SkuRow[]>(SKU_LIST.map(s => ({ ...s, checked: false })));
  const [selLayer, setSelLayer] = useState<number | null>(null);
  const [skuSearch, setSkuSearch] = useState("");
  const [cat1, setCat1] = useState("全部");
  const [hasChanges, setHasChanges] = useState(false);
  const [delistModal, setDelistModal] = useState<SkuRow | null>(null);
  const [batchDelistModal, setBatchDelistModal] = useState(false);
  const [copyModal, setCopyModal] = useState(false);
  const [delistReason, setDelistReason] = useState("");
  const [copyTarget, setCopyTarget] = useState("");

  const layers = Array.from({ length: 6 }, (_, i) => {
    const ls = skus.filter(s => s.layer === i + 1);
    return { layer: i + 1, total: ls.reduce((a, s) => a + s.realStock, 0), target: ls.reduce((a, s) => a + s.sugStock, 0), drink: ls.filter(s => s.cat1 === "饮料").reduce((a, s) => a + s.realStock, 0), drinkT: ls.filter(s => s.cat1 === "饮料").reduce((a, s) => a + s.sugStock, 0), snack: ls.filter(s => s.cat1 === "零食").reduce((a, s) => a + s.realStock, 0), snackT: ls.filter(s => s.cat1 === "零食").reduce((a, s) => a + s.sugStock, 0) };
  });

  const filtered = skus.filter(s => (!selLayer || s.layer === selLayer) && (cat1 === "全部" || s.cat1 === cat1) && (!skuSearch || s.name.includes(skuSearch)));
  const checkedCount = skus.filter(s => s.checked).length;
  const allChecked = filtered.length > 0 && filtered.every(s => s.checked);

  const updateSku = (id: string, key: "layer" | "realStock", val: number) => {
    setSkus(prev => prev.map(s => s.id === id ? { ...s, [key]: val } : s));
    setHasChanges(true);
  };
  const toggleCheck = (id: string, val: boolean) => setSkus(prev => prev.map(s => s.id === id ? { ...s, checked: val } : s));
  const toggleAll = (val: boolean) => setSkus(prev => prev.map(s => filtered.find(f => f.id === s.id) ? { ...s, checked: val } : s));

  return (
    <div className="p-6 bg-[#F5F7FA] min-h-screen pb-24">
      <PageHeader title="商品库存管理">
        <Btn v="secondary" onClick={onBack} icon={I.chevL}>返回</Btn>
      </PageHeader>

      {/* ── 统计区：3 卡片满宽 ────────────────────────────────── */}
      <div className="grid gap-3 mb-4" style={{ gridTemplateColumns: "2fr 1fr 1fr" }}>
        {/* 库存概况 */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] px-5 py-4">
          <div className="text-xs font-medium text-[#94A3B8] mb-3">库存概况</div>
          <div className="grid grid-cols-4 gap-4 mb-4">
            {[
              { label: "总预存", sub: "预存数", value: <span className="text-2xl font-bold text-[#2563EB]">480</span>, unit: "件" },
              { label: "实际预存", sub: "实际预存数", value: <span className="text-2xl font-bold text-[#16A34A]">432</span>, unit: "件" },
              { label: "饮料", sub: "饮料类目预存数 / 在售库存", value: <span className="text-2xl font-bold text-[#0891B2]">216<span className="text-sm text-[#94A3B8] font-medium"> / 198</span></span>, unit: "件" },
              { label: "零食", sub: "零食品类预存数 / 在售库存", value: <span className="text-2xl font-bold text-[#7C3AED]">148<span className="text-sm text-[#94A3B8] font-medium"> / 132</span></span>, unit: "件" },
            ].map(s => (
              <div key={s.label}>
                <div className="text-xs text-[#94A3B8] mb-1.5"><StatLabel label={s.label} tip={s.sub} /></div>
                <div className="flex items-baseline gap-1">
                  {s.value}
                  <span className="text-xs text-[#94A3B8]">{s.unit}</span>
                </div>
              </div>
            ))}
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-[#64748B]">预存完成率</span>
              <span className="text-xs font-semibold text-[#16A34A]">90%</span>
            </div>
            <div className="h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-[#16A34A]" style={{ width: "90%" }} />
            </div>
          </div>
        </div>

        {/* 货值 */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] px-5 py-4">
          <div className="text-xs font-medium text-[#94A3B8] mb-4">货值</div>
          <div className="space-y-4">
            <div>
              <div className="text-xs text-[#64748B] mb-1"><StatLabel label="货值" tip="当前预存商品总货值（元）" /></div>
              <div className="text-2xl font-bold text-[#D97706]">¥8,640</div>
            </div>
            <div>
              <div className="text-xs text-[#64748B] mb-1"><StatLabel label="件单价" tip="当前预存商品平均单价（元）" /></div>
              <div className="text-xl font-bold text-[#0F172A]">¥20.00</div>
            </div>
          </div>
        </div>

        {/* 动销健康 */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] px-5 py-4">
          <div className="text-xs font-medium text-[#94A3B8] mb-4">动销健康</div>
          <div className="space-y-4">
            <div>
              <div className="text-xs text-[#64748B] mb-1"><StatLabel label="上新率" tip="上新商品数 / 总商品数 × 100%" /></div>
              <div className="text-2xl font-bold text-[#2563EB]">12%</div>
            </div>
            <div>
              <div className="text-xs text-[#64748B] mb-1"><StatLabel label="无动销占比" tip="无动销商品数 / 总商品数 × 100%" /></div>
              <div className="text-xl font-bold text-[#DC2626]">8%</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 筛选 + 操作 ───────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] px-4 py-3 mb-3">
        {/* 筛选行 */}
        <div className="flex flex-wrap gap-x-5 gap-y-2 items-end mb-3">
          <div>
            <div className="text-xs text-[#64748B] mb-1">商品名称/编码</div>
            <Inp value={skuSearch} onChange={setSkuSearch} placeholder="模糊搜索" className="w-40" />
          </div>
          <div>
            <div className="text-xs text-[#64748B] mb-1">一级类目</div>
            <Sel value={cat1} onChange={setCat1} className="w-28"><option>全部</option><option>饮料</option><option>零食</option></Sel>
          </div>
          <div>
            <div className="text-xs text-[#64748B] mb-1">二级类目</div>
            <Sel value="全部" onChange={() => {}} className="w-28"><option>全部</option><option>碳酸</option><option>水</option><option>膨化食品</option><option>坚果</option></Sel>
          </div>
          <div>
            <div className="text-xs text-[#64748B] mb-1">标签</div>
            <Sel value="全部" onChange={() => {}} className="w-24"><option>全部</option><option>新品</option><option>爆款</option><option>促销</option></Sel>
          </div>
          <div>
            <div className="text-xs text-[#64748B] mb-1">商品状态</div>
            <Sel value="上架" onChange={() => {}} className="w-24"><option>上架</option><option>下架</option></Sel>
          </div>
          {selLayer && (
            <span className="inline-flex items-center gap-1 px-2.5 h-9 bg-[#DBEAFE] text-[#1D4ED8] rounded-lg text-xs font-medium self-end">
              第{selLayer}层
              <button onClick={() => setSelLayer(null)} className="ml-1 opacity-60 hover:opacity-100"><Icon d={I.x} size={11} /></button>
            </span>
          )}
          <div className="flex items-end gap-2 ml-auto">
            <Btn v="primary" icon={I.search} onClick={() => {}}>查询</Btn>
            <Btn v="secondary" onClick={() => {}}>重置</Btn>
          </div>
        </div>
        {/* 操作行 */}
        <div className="flex items-center gap-2 pt-2.5 border-t border-[#F1F5F9]">
          <Btn v="primary" onClick={onListProduct} icon={I.plus}>上架商品</Btn>
          <Btn v="secondary" onClick={() => setBatchDelistModal(true)} disabled={checkedCount === 0}>批量下架</Btn>
          <Btn v="secondary" onClick={onRestock} icon={I.truck}>发起补货单</Btn>
          <Btn v="secondary" onClick={() => setCopyModal(true)} icon={I.copy}>复制商品库</Btn>
          <Btn v="secondary" icon={I.download}>导出</Btn>
        </div>
      </div>

      {/* ── 主体：各层侧栏 + 表格 ─────────────────────────────── */}
      <div className="flex gap-3 items-start">
        {/* 各层情况 */}
        <div className="w-[220px] shrink-0">
          <div className="text-xs font-medium text-[#64748B] mb-2 px-1">各层情况</div>
          <div className="space-y-2">
            {layers.map(l => {
              const pct = l.target > 0 ? Math.round((l.total / l.target) * 100) : 0;
              const isActive = selLayer === l.layer;
              const barColor = pct >= 80 ? "#16A34A" : pct >= 50 ? "#D97706" : "#DC2626";
              return (
                <div key={l.layer} onClick={() => setSelLayer(isActive ? null : l.layer)}
                  className={`rounded-xl border cursor-pointer transition-all px-4 py-3
                    ${isActive ? "border-[#2563EB] bg-[#EFF6FF]" : "border-[#E2E8F0] bg-white hover:border-[#BFDBFE]"}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm font-bold ${isActive ? "text-[#2563EB]" : "text-[#0F172A]"}`}>第 {l.layer} 层</span>
                    <span className="text-sm font-bold tabular-nums" style={{ color: barColor }}>{pct}%</span>
                  </div>
                  <div className="h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden mb-3">
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, background: barColor }} />
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#94A3B8]">该层总数</span>
                      <span className="text-xs font-semibold tabular-nums text-[#334155]">{l.total}/{l.target}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#94A3B8]">饮料</span>
                      <span className="text-xs font-semibold tabular-nums text-[#0891B2]">{l.drink}/{l.drinkT}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#94A3B8]">零食</span>
                      <span className="text-xs font-semibold tabular-nums text-[#7C3AED]">{l.snack}/{l.snackT}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 表格区 */}
        <div className="flex-1 min-w-0">
          <div className="text-xs font-medium text-[#64748B] mb-2 px-1">商品列表</div>
          <Card className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1400px]">
                <thead>
                  <tr className="bg-[#F8FAFC]">
                    <th className="px-3 py-2.5 border-b border-[#F1F5F9]">
                      <input type="checkbox" checked={allChecked} onChange={e => toggleAll(e.target.checked)} className="rounded" />
                    </th>
                    {["SKU名称", "规格", "一级类目", "二级类目", "定价", "保质期", "日均售卖", "预存设备数", "设备动销率", "商品动销率", "摆放层数", "建议预存量", "实际预存量", "在售库存", "仓库可用库存", "在售天数", "修改日期", "修改人", "操作"].map(c => (
                      <th key={c} className="text-left text-xs font-semibold text-[#64748B] px-3 py-2.5 whitespace-nowrap border-b border-[#F1F5F9]">{c}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((s, idx) => (
                    <TR key={s.id}>
                      <td className="px-3 py-2.5"><input type="checkbox" checked={s.checked} onChange={e => toggleCheck(s.id, e.target.checked)} className="rounded" /></td>
                      <TD>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-md shrink-0" style={{ background: colorSwatches[idx % colorSwatches.length] }} />
                          <span className="text-sm font-medium text-[#0F172A]">{s.name}</span>
                        </div>
                      </TD>
                      <TD>{s.spec}</TD><TD>{s.cat1}</TD><TD>{s.cat2}</TD>
                      <TD>¥{s.price}</TD><TD>{s.expiry}天</TD><TD>{s.avgSale}</TD>
                      <TD>32</TD><TD>{s.stockRate}</TD><TD>{s.goodsRate}</TD>
                      <TD><input type="number" value={s.layer} onChange={e => updateSku(s.id, "layer", Number(e.target.value))} className="w-14 h-7 border border-[#E2E8F0] rounded text-sm px-2 text-center focus:outline-none" /></TD>
                      <TD>{s.sugStock}</TD>
                      <TD><input type="number" value={s.realStock} onChange={e => updateSku(s.id, "realStock", Number(e.target.value))} className="w-16 h-7 border border-[#E2E8F0] rounded text-sm px-2 text-center focus:border-[#2563EB] focus:outline-none" /></TD>
                      <TD>{s.onSaleStock}</TD><TD>{s.warehouseStock}</TD><TD>{s.onSaleDays}天</TD>
                      <TD>2024-09-01</TD><TD>李明</TD>
                      <StickyOp>
                        <div className="flex gap-1">
                          <Btn v="ghost" onClick={() => setDelistModal(s)} className="text-xs px-2 h-7 text-[#DC2626]">下架</Btn>
                        </div>
                      </StickyOp>
                    </TR>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
      {hasChanges && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E2E8F0] shadow-lg px-6 py-3 flex items-center justify-end gap-3 z-40">
          <span className="text-sm text-[#64748B]">有未保存的更改</span>
          <Btn v="secondary" onClick={() => setHasChanges(false)}>取消</Btn>
          <Btn v="primary" onClick={() => setHasChanges(false)}>保存提交</Btn>
        </div>
      )}
      <Modal open={!!delistModal} onClose={() => { setDelistModal(null); setDelistReason(""); }} title="下架商品" footer={<><Btn v="secondary" onClick={() => { setDelistModal(null); setDelistReason(""); }}>取消</Btn><Btn v="danger" onClick={() => { setDelistModal(null); setDelistReason(""); }}>确认下架</Btn></>}>
        <div className="space-y-3">
          <div><div className="text-xs text-[#64748B] mb-1">SKU名称</div><div className="h-9 border border-[#E2E8F0] rounded-md text-sm px-3 flex items-center bg-[#F8FAFC] text-[#64748B]">{delistModal?.name}</div></div>
          <div><div className="text-xs text-[#64748B] mb-1">下架原因 <span className="text-[10px] text-[#94A3B8]">（选填）</span></div><textarea value={delistReason} onChange={e => setDelistReason(e.target.value.slice(0, 200))} className="w-full h-24 border border-[#E2E8F0] rounded-md text-sm px-3 py-2 resize-none focus:outline-none" placeholder="请输入下架原因..." /><div className="text-right text-xs text-[#94A3B8]">{delistReason.length}/200</div></div>
        </div>
      </Modal>
      <Modal open={batchDelistModal} onClose={() => { setBatchDelistModal(false); setDelistReason(""); }} title="批量下架" footer={<><Btn v="secondary" onClick={() => { setBatchDelistModal(false); setDelistReason(""); }}>取消</Btn><Btn v="danger" onClick={() => { setBatchDelistModal(false); setDelistReason(""); }}>确认下架</Btn></>}>
        <div className="space-y-3">
          <div><div className="text-xs text-[#64748B] mb-1">确认下架商品数</div><div className="h-9 border border-[#E2E8F0] rounded-md text-sm px-3 flex items-center bg-[#F8FAFC] text-[#64748B]">{checkedCount} 个商品</div></div>
          <div><div className="text-xs text-[#64748B] mb-1">下架原因 <span className="text-[10px] text-[#94A3B8]">（选填）</span></div><textarea value={delistReason} onChange={e => setDelistReason(e.target.value.slice(0, 200))} className="w-full h-24 border border-[#E2E8F0] rounded-md text-sm px-3 py-2 resize-none focus:outline-none" placeholder="请输入下架原因..." /><div className="text-right text-xs text-[#94A3B8]">{delistReason.length}/200</div></div>
        </div>
      </Modal>
      <Modal open={copyModal} onClose={() => setCopyModal(false)} title="复制商品库" footer={<><Btn v="secondary" onClick={() => setCopyModal(false)}>取消</Btn><Btn v="primary" onClick={() => setCopyModal(false)}>确定</Btn></>}>
        <div className="space-y-3">
          <div><div className="text-xs text-[#64748B] mb-1">当前点位</div><div className="h-9 border border-[#E2E8F0] rounded-md text-sm px-3 flex items-center bg-[#F8FAFC] text-[#64748B]">深圳科技园A座大厅 (SZ001)</div></div>
          <div><div className="text-xs text-[#64748B] mb-1">目标点位</div><Inp value={copyTarget} onChange={setCopyTarget} placeholder="搜索并选择目标点位..." className="w-full" /></div>
          <div className="flex items-start gap-2 p-3 bg-[#FFF7ED] rounded-lg border border-[#FED7AA]"><Icon d={I.alert} size={16} className="text-[#D97706] shrink-0 mt-0.5" /><span className="text-xs text-[#92400E]">复制将覆盖目标点位的现有商品库配置，请谨慎操作。</span></div>
        </div>
      </Modal>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 4. ListProductsPage
// ═══════════════════════════════════════════════════════════════════════════════
type ListSku = { id: string; name: string; spec: string; cat1: string; cat2: string; price: number; expiry: number; avgSale: number; warehouseStock: number; onSaleDays: number; tag: string; coldStorage: boolean; checked: boolean; everListed: boolean };

const INITIAL_LIST_SKUS: ListSku[] = SKU_LIST.map((s, i) => ({
  id: s.id, name: s.name, spec: s.spec, cat1: s.cat1, cat2: s.cat2, price: s.price, expiry: s.expiry,
  avgSale: s.avgSale, warehouseStock: s.warehouseStock, onSaleDays: s.onSaleDays,
  tag: ["新品", "爆款", ""][i % 3], coldStorage: s.cat2 === "乳制品" || s.cat2 === "气泡水", checked: i < 3,
  everListed: i % 3 !== 2,
}));

const EXTRA_LIST_SKUS: ListSku[] = [
  { id: "S009", name: "百岁山矿泉水570ml", spec: "570ml×24", cat1: "饮料", cat2: "水", price: 3.0, expiry: 365, avgSale: 14.2, warehouseStock: 200, onSaleDays: 0, tag: "新品", coldStorage: false, checked: true, everListed: true },
  { id: "S010", name: "雪碧330ml", spec: "330ml×24", cat1: "饮料", cat2: "碳酸", price: 3.5, expiry: 270, avgSale: 11.6, warehouseStock: 180, onSaleDays: 0, tag: "爆款", coldStorage: false, checked: true, everListed: false },
  { id: "S011", name: "奥利奥夹心饼干90g", spec: "90g×24", cat1: "零食", cat2: "饼干", price: 5.0, expiry: 270, avgSale: 7.4, warehouseStock: 160, onSaleDays: 0, tag: "", coldStorage: false, checked: true, everListed: true },
];

function ListProductsPage({ onBack, onInventory, onRestock }: { onBack: () => void; onInventory: () => void; onRestock: () => void }) {
  const [skus, setSkus] = useState<ListSku[]>(INITIAL_LIST_SKUS);
  const [search, setSearch] = useState("");
  const [filterCat1, setFilterCat1] = useState("全部");
  const [filterCat2, setFilterCat2] = useState("全部");
  const [filterTag, setFilterTag] = useState("全部");
  const [confirmModal, setConfirmModal] = useState(false);
  const [copyModal, setCopyModal] = useState(false);
  const [copyTarget, setCopyTarget] = useState("");

  const cat1Options = ["全部", ...Array.from(new Set(skus.map(s => s.cat1)))];
  const cat2Options = ["全部", ...Array.from(new Set(skus.filter(s => filterCat1 === "全部" || s.cat1 === filterCat1).map(s => s.cat2)))];
  const tagOptions = ["全部", "新品", "爆款"];

  const filtered = skus.filter(s =>
    (!search || s.name.includes(search) || s.id.includes(search)) &&
    (filterCat1 === "全部" || s.cat1 === filterCat1) &&
    (filterCat2 === "全部" || s.cat2 === filterCat2) &&
    (filterTag === "全部" || s.tag === filterTag)
  );
  const checkedCount = skus.filter(s => s.checked).length;
  const allChecked = filtered.length > 0 && filtered.every(s => s.checked);

  const handleBatchImport = () => {
    setSkus(prev => {
      const existing = new Set(prev.map(s => s.id));
      const toAdd = EXTRA_LIST_SKUS.filter(s => !existing.has(s.id));
      return [...prev, ...toAdd];
    });
  };
  const toggleCheck = (id: string, val: boolean) => setSkus(prev => prev.map(s => s.id === id ? { ...s, checked: val } : s));
  const toggleAll = (val: boolean) => setSkus(prev => prev.map(s => filtered.find(f => f.id === s.id) ? { ...s, checked: val } : s));

  // suppress unused warning
  void onRestock;

  return (
    <div className="p-6 bg-[#F5F7FA] min-h-screen pb-24">
      <PageHeader title="上架商品">
        <Btn v="secondary" onClick={onBack} icon={I.chevL}>返回</Btn>
        <Btn v="secondary" onClick={handleBatchImport} icon={I.upload}>批量导入</Btn>
      </PageHeader>
      <Card className="mb-4 p-4">
        <div className="flex flex-wrap gap-3 items-center">
          <label className="flex items-center gap-1.5 text-sm text-[#64748B]">SKU名称/编码<Inp value={search} onChange={setSearch} placeholder="请输入" className="w-40" /></label>
          <label className="flex items-center gap-1.5 text-sm text-[#64748B]">一级类目
            <Sel value={filterCat1} onChange={v => { setFilterCat1(v); setFilterCat2("全部"); }} className="w-28">
              {cat1Options.map(o => <option key={o}>{o}</option>)}
            </Sel>
          </label>
          <label className="flex items-center gap-1.5 text-sm text-[#64748B]">二级类目
            <Sel value={filterCat2} onChange={setFilterCat2} className="w-28">
              {cat2Options.map(o => <option key={o}>{o}</option>)}
            </Sel>
          </label>
          <label className="flex items-center gap-1.5 text-sm text-[#64748B]">标签
            <Sel value={filterTag} onChange={setFilterTag} className="w-24">
              {tagOptions.map(o => <option key={o}>{o}</option>)}
            </Sel>
          </label>
          <Btn v="primary" icon={I.search}>搜索</Btn>
          <Btn v="secondary" onClick={() => { setSearch(""); setFilterCat1("全部"); setFilterCat2("全部"); setFilterTag("全部"); }}>重置</Btn>
        </div>
      </Card>
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px]">
            <thead>
              <tr className="bg-[#F8FAFC]">
                <th className="px-3 py-2.5 border-b border-[#F1F5F9]"><input type="checkbox" checked={allChecked} onChange={e => toggleAll(e.target.checked)} className="rounded" /></th>
                {["SKU名称", "规格", "一级类目", "二级类目", "商品标签", "定价(元)", "保质期(天)", "是否冷藏", "售价", "仓库可用库存", "在售设备数", "在售天数"].map(c => (
                  <th key={c} className="text-left text-xs font-semibold text-[#64748B] px-3 py-2.5 whitespace-nowrap border-b border-[#F1F5F9]">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, idx) => (
                <TR key={s.id}>
                  <td className="px-3 py-2.5"><input type="checkbox" checked={s.checked} onChange={e => toggleCheck(s.id, e.target.checked)} className="rounded" /></td>
                  <TD>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-md shrink-0" style={{ background: colorSwatches[idx % colorSwatches.length] }} />
                      <div className="flex flex-col gap-0.5">
                        <span className="font-medium text-[#0F172A]">{s.name}</span>
                        {s.everListed && <span className="inline-flex items-center gap-0.5 text-[10px] font-medium text-[#7C3AED] bg-[#EDE9FE] px-1.5 py-px rounded-full w-fit">曾上架</span>}
                      </div>
                    </div>
                  </TD>
                  <TD>{s.spec}</TD><TD>{s.cat1}</TD><TD>{s.cat2}</TD>
                  <TD>{s.tag ? <span className="px-1.5 py-0.5 bg-[#DBEAFE] text-[#1D4ED8] rounded text-xs">{s.tag}</span> : "—"}</TD>
                  <TD>¥{s.price}</TD><TD>{s.expiry}</TD>
                  <TD><StatusPill label={s.coldStorage ? "是" : "否"} color={s.coldStorage ? "blue" : "gray"} /></TD>
                  <TD>¥{s.price}</TD><TD>{s.warehouseStock}</TD><TD>32</TD><TD>{s.onSaleDays}天</TD>
                </TR>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E2E8F0] shadow-lg px-6 py-3 flex items-center gap-4 z-40">
        <span className="text-sm text-[#64748B]">已勾选 <span className="font-bold text-[#0F172A]">{checkedCount}</span> 个商品</span>
        <div className="ml-auto flex gap-2">
          <Btn v="secondary" onClick={() => setConfirmModal(true)} disabled={checkedCount === 0}>批量上架</Btn>
          <Btn v="primary" onClick={() => setConfirmModal(true)} disabled={checkedCount === 0}>确认上架并前往补货</Btn>
        </div>
      </div>
      <Modal open={confirmModal} onClose={() => setConfirmModal(false)} title="确认上架商品" width="max-w-xl" footer={<><Btn v="secondary" onClick={() => setConfirmModal(false)}>取消</Btn><Btn v="primary" onClick={() => { setConfirmModal(false); onInventory(); }}>确认上架</Btn></>}>
        <div className="space-y-1">
          <div className="text-sm text-[#64748B] mb-3">以下 {checkedCount} 个商品将被上架：</div>
          {skus.filter(s => s.checked).map(s => (
            <div key={s.id} className="flex items-center justify-between py-2 border-b border-[#F1F5F9]">
              <span className="text-sm text-[#0F172A]">{s.name}</span>
              <div className="flex gap-4 text-xs text-[#64748B]"><span>{s.spec}</span><span>¥{s.price}</span></div>
            </div>
          ))}
        </div>
      </Modal>
      <Modal open={copyModal} onClose={() => setCopyModal(false)} title="复制商品库" footer={<><Btn v="secondary" onClick={() => setCopyModal(false)}>取消</Btn><Btn v="primary" onClick={() => setCopyModal(false)}>确定</Btn></>}>
        <div className="space-y-3">
          <div><div className="text-xs text-[#64748B] mb-1">当前点位</div><div className="h-9 border border-[#E2E8F0] rounded-md text-sm px-3 flex items-center bg-[#F8FAFC] text-[#64748B]">深圳科技园A座大厅 (SZ001)</div></div>
          <div><div className="text-xs text-[#64748B] mb-1">目标点位</div><Inp value={copyTarget} onChange={setCopyTarget} placeholder="搜索并选择目标点位..." className="w-full" /></div>
          <div className="flex items-start gap-2 p-3 bg-[#FFF7ED] rounded-lg border border-[#FED7AA]"><Icon d={I.alert} size={16} className="text-[#D97706] shrink-0 mt-0.5" /><span className="text-xs text-[#92400E]">复制将覆盖目标点位的现有商品库配置，请谨慎操作。</span></div>
        </div>
      </Modal>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 5. CreateRestockPage
// ═══════════════════════════════════════════════════════════════════════════════
type RestockSku = {
  id: string; name: string; spec: string; cat1: string; cat2: string; price: number; expiry: number;
  todayStocked: number; warehouseAvail: number; warehouseLocked: number; realStock: number;
  onSaleStock: number; inTransit: number; avgSale: number; baseQty: number;
};

function CreateRestockPage({ onBack, readonly = false }: { onBack: () => void; readonly?: boolean }) {
  const [date, setDate] = useState("2024-09-04");
  const [batch, setBatch] = useState("第一批次");
  const [multiplier, setMultiplier] = useState(1);
  const [remark, setRemark] = useState("");
  const [rows, setRows] = useState<RestockSku[]>(SKU_LIST.map(s => ({
    id: s.id, name: s.name, spec: s.spec, cat1: s.cat1, cat2: s.cat2, price: s.price, expiry: s.expiry,
    todayStocked: 0, warehouseAvail: s.warehouseStock, warehouseLocked: Math.floor(s.warehouseStock * 0.1),
    realStock: s.realStock, onSaleStock: s.onSaleStock, inTransit: Math.floor(s.sugStock * 0.2),
    avgSale: s.avgSale, baseQty: Math.max(0, s.sugStock - s.realStock),
  })));

  const updateQty = (id: string, qty: number) => setRows(prev => prev.map(r => r.id === id ? { ...r, baseQty: Math.max(0, Math.round(qty / multiplier)) } : r));
  const removeRow = (id: string) => setRows(prev => prev.filter(r => r.id !== id));

  const skuCount = rows.filter(r => r.baseQty > 0).length;
  const totalQty = rows.reduce((a, r) => a + r.baseQty * multiplier, 0);
  const afterTotal = rows.reduce((a, r) => a + r.realStock + r.baseQty * multiplier, 0);

  return (
    <div className="p-6 bg-[#F5F7FA] min-h-screen">
      <PageHeader title={readonly ? "补货单详情" : "发起补货单"}>
        <Btn v="secondary" onClick={onBack} icon={I.chevL}>返回</Btn>
        {readonly && <StatusPill label="履约完成" color="green" />}
      </PageHeader>
      <Card className="p-4 mb-4">
        <div className="flex gap-6 items-end">
          <div><div className="text-xs text-[#64748B] mb-1">补货日期</div><input type="date" value={date} onChange={e => setDate(e.target.value)} disabled={readonly} className="h-9 border border-[#E2E8F0] rounded-md text-sm px-3 bg-white focus:outline-none disabled:bg-[#F8FAFC]" /></div>
          <div><div className="text-xs text-[#64748B] mb-1">补货批次</div><Sel value={batch} onChange={setBatch} className="w-36">{["第一批次", "第二批次", "第三批次", "第四批次", "第五批次"].map(v => <option key={v}>{v}</option>)}</Sel></div>
          <div className="text-xs text-[#94A3B8] pb-2">同一零售柜同一天同一批次不可重复创建</div>
        </div>
      </Card>
      <Card className="mb-4">
        <div className="flex items-center justify-between p-4 border-b border-[#E2E8F0]">
          <span className="font-semibold text-sm text-[#0F172A]">商品库列表</span>
          {!readonly && (
            <div className="flex gap-1">
              {([["默认", 1], ["×2", 2], ["×3", 3]] as [string, number][]).map(([label, m]) => (
                <button key={label} onClick={() => setMultiplier(m)} className={`px-3 h-7 rounded text-xs font-medium transition-colors ${multiplier === m ? "bg-[#2563EB] text-white" : "bg-white border border-[#E2E8F0] text-[#334155] hover:bg-[#F8FAFC]"}`}>{label}</button>
              ))}
            </div>
          )}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1300px]">
            <THead cols={["SKU名称", "规格", "一级类目", "二级类目", "定价(元)", "保质期", "今日已补", "仓库可用", "仓库锁定", "实际预存", "在售库存", "在途库存", "日均销售", "补货数量", "操作"]} />
            <tbody>
              {rows.map((r, idx) => {
                const displayQty = r.baseQty * multiplier;
                return (
                  <TR key={r.id}>
                    <TD>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-md shrink-0" style={{ background: colorSwatches[idx % colorSwatches.length] }} />
                        <span className="font-medium text-[#0F172A] text-sm">{r.name}</span>
                      </div>
                    </TD>
                    <TD>{r.spec}</TD><TD>{r.cat1}</TD><TD>{r.cat2}</TD>
                    <TD>¥{r.price}</TD><TD>{r.expiry}天</TD>
                    <TD>{r.todayStocked}</TD><TD>{r.warehouseAvail}</TD><TD>{r.warehouseLocked}</TD>
                    <TD>{r.realStock}</TD><TD>{r.onSaleStock}</TD><TD>{r.inTransit}</TD><TD>{r.avgSale}</TD>
                    <TD>
                      <input type="number" value={displayQty} onChange={e => updateQty(r.id, Number(e.target.value))} disabled={readonly} className={`w-16 h-7 border border-[#E2E8F0] rounded text-sm px-2 text-center focus:outline-none focus:border-[#2563EB] disabled:bg-[#F8FAFC] ${displayQty > 0 ? "text-[#2563EB] font-bold" : ""}`} />
                    </TD>
                    <StickyOp>
                      {!readonly && <Btn v="ghost" onClick={() => removeRow(r.id)} className="text-xs px-2 h-7 text-[#DC2626]"><Icon d={I.trash} size={13} /></Btn>}
                    </StickyOp>
                  </TR>
                );
              })}
            </tbody>
          </table>
        </div>
        {!readonly && <div className="p-3 text-xs text-[#94A3B8] border-t border-[#F1F5F9]"><Icon d={I.info} size={12} className="inline mr-1" />补货数量为空的SKU不参与生成补货单</div>}
      </Card>
      <Card className="p-4 mb-4">
        <div className="flex gap-8">
          <div><span className="text-xs text-[#64748B]">本次补货商品SKU个数</span><div className="text-xl font-bold text-[#0F172A] mt-1">{skuCount} <span className="text-sm font-normal text-[#64748B]">种</span></div></div>
          <div><span className="text-xs text-[#64748B]">本次补货商品总件数</span><div className="text-xl font-bold text-[#0F172A] mt-1">{totalQty} <span className="text-sm font-normal text-[#64748B]">件</span></div></div>
          <div><span className="text-xs text-[#64748B]">补货后商品总件数（估）</span><div className="text-xl font-bold text-[#0F172A] mt-1">{afterTotal} <span className="text-sm font-normal text-[#64748B]">件</span></div></div>
        </div>
      </Card>
      {!readonly && (
        <Card className="p-4">
          <div className="text-xs text-[#64748B] mb-1">备注</div>
          <textarea value={remark} onChange={e => setRemark(e.target.value.slice(0, 200))} maxLength={200} className="w-full h-20 border border-[#E2E8F0] rounded-md text-sm px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20" placeholder="请输入备注..." />
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs text-[#94A3B8]">{remark.length}/200</span>
            <Btn v="primary" className="px-8" onClick={onBack}>提交补货单</Btn>
          </div>
        </Card>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 6. RestockOrderList
// ═══════════════════════════════════════════════════════════════════════════════
function RestockOrderList({ onCreate, onDetail, onModify }: { onCreate: () => void; onDetail: () => void; onModify: () => void }) {
  const [orderNo, setOrderNo] = useState("");
  const [siteName, setSiteName] = useState("");
  const [siteId, setSiteId] = useState("");
  const [assetCode, setAssetCode] = useState("");
  const [creator, setCreator] = useState("");
  const [relWarehouse, setRelWarehouse] = useState("");
  const [batchF, setBatchF] = useState("全部");
  const [statusF, setStatusF] = useState("全部");
  const [isAutoF, setIsAutoF] = useState("全部");
  const [createFrom, setCreateFrom] = useState("");
  const [createTo, setCreateTo] = useState("");
  const [pushFrom, setPushFrom] = useState("");
  const [pushTo, setPushTo] = useState("");
  const [doneFrom, setDoneFrom] = useState("");
  const [doneTo, setDoneTo] = useState("");
  const [page, setPage] = useState(1);
  const [orders, setOrders] = useState(RESTOCK_ORDERS);
  const [returnModal, setReturnModal] = useState<string | null>(null);
  const [returnReason, setReturnReason] = useState("");
  const [pushModal, setPushModal] = useState<string | null>(null);

  // 退单：分车中及之后的履约中状态可退，退回至“待分车”
  const canReturn = (s: string) => ["分车中", "分拣中", "配送中"].includes(s);
  const confirmReturn = () => {
    if (!returnModal) return;
    setOrders(prev => prev.map(o => o.id === returnModal ? { ...o, status: "待分车", sorter: "", sortDone: "", delivery: "", deliveryDone: "" } : o));
    setReturnModal(null); setReturnReason("");
  };

  const resetFilters = () => {
    setOrderNo(""); setSiteName(""); setSiteId(""); setAssetCode(""); setCreator(""); setRelWarehouse("");
    setBatchF("全部"); setStatusF("全部"); setIsAutoF("全部");
    setCreateFrom(""); setCreateTo(""); setPushFrom(""); setPushTo(""); setDoneFrom(""); setDoneTo("");
  };

  // suppress unused warnings for date range state
  void pushFrom; void pushTo; void doneFrom; void doneTo;

  return (
    <div className="p-6 bg-[#F5F7FA] min-h-screen">
      <PageHeader title="补货单列表">
        <Btn v="primary" onClick={onCreate} icon={I.plus}>新建补货单</Btn>
      </PageHeader>
      <FilterBar>
        <div className="flex flex-wrap gap-x-3 gap-y-3 items-start">
          <FField label="补货单号"><Inp value={orderNo} onChange={setOrderNo} placeholder="请输入补货单号" className="w-36" /></FField>
          <FField label="点位名称"><Inp value={siteName} onChange={setSiteName} placeholder="请输入点位名称" className="w-36" /></FField>
          <FField label="点位编码"><Inp value={siteId} onChange={setSiteId} placeholder="请输入点位编码" className="w-32" /></FField>
          <FField label="设备资产编码"><Inp value={assetCode} onChange={setAssetCode} placeholder="请输入设备资产编码" className="w-36" /></FField>
          <FField label="补货创建人"><Inp value={creator} onChange={setCreator} placeholder="请输入补货创建人" className="w-32" /></FField>
          <FField label="关联仓库"><Inp value={relWarehouse} onChange={setRelWarehouse} placeholder="请输入关联仓库" className="w-32" /></FField>
          <FField label="补货批次">
            <Sel value={batchF} onChange={setBatchF} className="w-28">{["全部", "第一批次", "第二批次", "第三批次"].map(v => <option key={v}>{v}</option>)}</Sel>
          </FField>
          <FField label="状态">
            <Sel value={statusF} onChange={setStatusF} className="w-28">{["全部", "待分车", "待分拣", "待配送", "分车中", "分拣中", "配送中", "履约完成", "履约失败", "已取消"].map(v => <option key={v}>{v}</option>)}</Sel>
          </FField>
          <FField label="系统自动补单">
            <Sel value={isAutoF} onChange={setIsAutoF} className="w-28">{["全部", "是", "否"].map(v => <option key={v}>{v}</option>)}</Sel>
          </FField>
          <FField label="创建时间">
            <div className="flex items-center gap-1"><input type="date" value={createFrom} onChange={e => setCreateFrom(e.target.value)} className="h-9 border border-[#E2E8F0] rounded-md text-sm px-2 bg-white" /><span className="text-[#94A3B8]">—</span><input type="date" value={createTo} onChange={e => setCreateTo(e.target.value)} className="h-9 border border-[#E2E8F0] rounded-md text-sm px-2 bg-white" /></div>
          </FField>
          <FField label="推送履约时间">
            <div className="flex items-center gap-1"><input type="date" onChange={e => setPushFrom(e.target.value)} className="h-9 border border-[#E2E8F0] rounded-md text-sm px-2 bg-white" /><span className="text-[#94A3B8]">—</span><input type="date" onChange={e => setPushTo(e.target.value)} className="h-9 border border-[#E2E8F0] rounded-md text-sm px-2 bg-white" /></div>
          </FField>
          <FField label="履约完成时间">
            <div className="flex items-center gap-1"><input type="date" onChange={e => setDoneFrom(e.target.value)} className="h-9 border border-[#E2E8F0] rounded-md text-sm px-2 bg-white" /><span className="text-[#94A3B8]">—</span><input type="date" onChange={e => setDoneTo(e.target.value)} className="h-9 border border-[#E2E8F0] rounded-md text-sm px-2 bg-white" /></div>
          </FField>
          <div className="flex gap-2 self-end">
            <Btn v="primary" icon={I.search}>查询</Btn>
            <Btn v="secondary" onClick={resetFilters}>重置</Btn>
          </div>
        </div>
      </FilterBar>
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1600px]">
            <THead cols={["补货单号", "点位名称", "点位编码", "设备资产编码", "关联仓库", "标签", "系统自动补单", "补货批次", "商品品种", "补货总数", "最近补货时间", "创建时间", "状态", "分拣人", "分拣完成时间", "配送人", "履约完成时间", "操作"]} />
            <tbody>
              {orders.map(r => (
                <TR key={r.id}>
                  <TD><span className="text-[#2563EB] font-mono text-xs">{r.id}</span></TD>
                  <TD>{r.cabinetName}</TD>
                  <TD><span className="font-mono text-xs text-[#64748B]">{r.cabinetId}</span></TD>
                  <TD><span className="font-mono text-xs text-[#64748B]">{r.asset}</span></TD>
                  <TD>{r.warehouse}</TD>
                  <TD>{r.label ? <span className="px-1.5 py-0.5 bg-[#FEF3C7] text-[#B45309] rounded text-xs">{r.label}</span> : "—"}</TD>
                  <TD><StatusPill label={r.isAuto} color={r.isAuto === "是" ? "blue" : "gray"} /></TD>
                  <TD>{r.batch}</TD>
                  <TD>{r.skuTypes}</TD><TD>{r.total}</TD>
                  <TD>{r.lastDate}</TD><TD>{r.createDate}</TD>
                  <TD><StatusPill label={r.status} color={statusColor(r.status)} /></TD>
                  <TD>{r.sorter || "—"}</TD><TD>{r.sortDone || "—"}</TD>
                  <TD>{r.delivery || "—"}</TD><TD>{r.deliveryDone || "—"}</TD>
                  <StickyOp>
                    <div className="flex gap-1">
                      <Btn v="ghost" onClick={onDetail} className="text-xs px-2 h-7">详情</Btn>
                      <Btn v="ghost" onClick={onModify} className="text-xs px-2 h-7">修改</Btn>
                      {r.status.startsWith("待") && <Btn v="ghost" onClick={() => setPushModal(r.id)} className="text-xs px-2 h-7 text-[#2563EB]">推送履约</Btn>}
                      {canReturn(r.status) && <Btn v="ghost" onClick={() => { setReturnModal(r.id); setReturnReason(""); }} className="text-xs px-2 h-7 text-[#DC2626]">退单</Btn>}
                    </div>
                  </StickyOp>
                </TR>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination page={page} total={80} onChange={setPage} />
      </Card>
      <Modal open={!!returnModal} onClose={() => { setReturnModal(null); setReturnReason(""); }} title="退单" footer={<><Btn v="secondary" onClick={() => { setReturnModal(null); setReturnReason(""); }}>取消</Btn><Btn v="danger" onClick={confirmReturn}>确认退单</Btn></>}>
        <div className="space-y-3">
          <div><div className="text-xs text-[#64748B] mb-1">补货单号</div><div className="h-9 border border-[#E2E8F0] rounded-md text-sm px-3 flex items-center bg-[#F8FAFC] text-[#64748B] font-mono">{returnModal}</div></div>
          <div><div className="text-xs text-[#64748B] mb-1">退单原因 <span className="text-[10px] text-[#94A3B8]">（选填）</span></div><textarea value={returnReason} onChange={e => setReturnReason(e.target.value.slice(0, 200))} maxLength={200} className="w-full h-24 border border-[#E2E8F0] rounded-md text-sm px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20" placeholder="请输入退单原因..." /><div className="text-right text-xs text-[#94A3B8]">{returnReason.length}/200</div></div>
        </div>
      </Modal>
      <Modal open={!!pushModal} onClose={() => setPushModal(null)} title="推送履约" footer={<><Btn v="secondary" onClick={() => setPushModal(null)}>取消</Btn><Btn v="primary" onClick={() => setPushModal(null)}>确认推送</Btn></>}>
        <div className="space-y-3">
          <div><div className="text-xs text-[#64748B] mb-1">补货单号</div><div className="h-9 border border-[#E2E8F0] rounded-md text-sm px-3 flex items-center bg-[#F8FAFC] text-[#64748B] font-mono">{pushModal}</div></div>
          <div className="flex items-start gap-2 px-4 py-3 rounded-lg bg-[#EFF6FF]">
            <Icon d={I.info} size={14} className="text-[#2563EB] flex-shrink-0 mt-0.5" />
            <span className="text-xs text-[#2563EB]">推送后补货单将进入履约流程（分车 → 分拣 → 配送），推送后不可再修改商品与数量。</span>
          </div>
        </div>
      </Modal>
    </div>
  );
}

// ─── Exports ─────────────────────────────────────────────────────────────────
export { SmartCabinetList, SmartCabinetDetail, InventoryManagement, ListProductsPage, CreateRestockPage, RestockOrderList };
