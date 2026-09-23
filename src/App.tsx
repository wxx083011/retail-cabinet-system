import { useState, ReactNode } from "react";
import {
  ProductArchiveList, ProductArchiveForm,
  PriceTemplateList, PriceTemplateForm,
  SupplierList, SupplierForm,
  PurchaseOrderList, PurchaseOrderNew, PurchaseOrderDetail,
  PurchaseMgmtList, PurchaseMgmtNew,
  InboundOrderList, InboundOrderDetail,
  ExceptionOrderList, ExceptionOrderHandle,
} from "./ErpPages";
import {
  InboundList, InboundDetail, OutboundList, OutboundDetail,
  DeliveryList, DeliveryDetail, PickingList, PickingDetail,
  StaffList, StaffForm, VehicleList, VehicleForm, DispatchList, DispatchWorkbench, DispatchScheduleList,
  EngineerList, EngineerForm,
  WorkOrderList, WorkOrderDetail, WorkOrderAssign,
} from "./FulfillmentPages";
import { WarehouseList, WarehouseForm, WarehouseInvList, WarehouseInvDetail, WarehouseInvAdjust } from "./WarehousePages";
import { CrmApp } from "./CrmPages";
import {
  SmartCabinetList, SmartCabinetDetail, InventoryManagement,
  ListProductsPage, CreateRestockPage, RestockOrderList,
} from "./GoodsPages";
import { FulfillmentMiniApp } from "./FulfillmentMiniPages";
import { MiniProgramsApp, ClientMiniApp, ConsumerMiniApp } from "./MiniPrograms";
import { RuleConfigPage } from "./RuleConfigPage";
import { LocationDetailTabs } from "./LocationDetailCore";

// ─── Icons (inline SVG) ────────────────────────────────────────────────────
const Icon = ({ d, size = 16, className = "" }: { d: string; size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d={d} />
  </svg>
);

const Icons = {
  image: "M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z M8.5 11a1.5 1.5 0 100-3 1.5 1.5 0 000 3z M21 15l-5-5L5 20",
  dashboard: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10",
  customers: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M9 11a4 4 0 100-8 4 4 0 000 8 M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75",
  location: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z M12 10a2 2 0 100-4 2 2 0 000 4",
  device: "M12 2a10 10 0 100 20A10 10 0 0012 2z M8 12h8 M12 8v8",
  product: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
  order: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2 M9 5a2 2 0 002 2h2a2 2 0 002-2 M9 5a2 2 0 012-2h2a2 2 0 012 2 M12 12h.01 M8 12h.01 M16 12h.01 M8 16h.01 M12 16h.01",
  rules: "M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z M12 12l8-4.5 M12 12v9 M12 12L4 7.5",
  search: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0",
  filter: "M22 3H2l8 9.46V19l4 2v-8.54L22 3",
  plus: "M12 5v14M5 12h14",
  download: "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4 M7 10l5 5 5-5 M12 15V3",
  upload: "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4 M17 8l-5-5-5 5 M12 3v12",
  edit: "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7 M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",
  trash: "M3 6h18 M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6 M10 6V4h4v2",
  eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 12a3 3 0 100-6 3 3 0 000 6",
  eyeOff: "M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24 M1 1l22 22",
  chevronDown: "M6 9l6 6 6-6",
  chevronRight: "M9 18l6-6-6-6",
  chevronLeft: "M15 18l-6-6 6-6",
  x: "M18 6L6 18M6 6l12 12",
  check: "M20 6L9 17l-5-5",
  alert: "M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z M12 9v4 M12 17h.01",
  info: "M12 22a10 10 0 100-20 10 10 0 000 20z M12 8v4 M12 16h.01",
  refresh: "M23 4v6h-6 M1 20v-6h6 M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15",
  settings: "M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z",
  bell: "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 01-3.46 0",
  user: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8",
  grid: "M3 3h7v7H3z M14 3h7v7h-7z M14 14h7v7h-7z M3 14h7v7H3z",
  list: "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01",
  copy: "M20 9h-9a2 2 0 00-2 2v9a2 2 0 002 2h9a2 2 0 002-2v-9a2 2 0 00-2-2z M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1",
  send: "M22 2L11 13 M22 2l-7 20-4-9-9-4 20-7z",
  zap: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  lock: "M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2z M7 11V7a5 5 0 0110 0v4",
  unlock: "M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2z M7 11V7a5 5 0 019.9-1",
  thermometer: "M14 14.76V3.5a2.5 2.5 0 00-5 0v11.26a4.5 4.5 0 105 0z",
  sun: "M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42 M12 17a5 5 0 100-10 5 5 0 000 10z",
  cpu: "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18",
  wifi: "M5 12.55a11 11 0 0114.08 0 M1.42 9a16 16 0 0121.16 0 M8.53 16.11a6 6 0 016.95 0 M12 20h.01",
  package: "M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z M7 7h.01",
  arrowRight: "M5 12h14M12 5l7 7-7 7",
  moreH: "M12 12h.01M19 12h.01M5 12h.01",
  calender: "M19 4H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z M16 2v4M8 2v4M3 10h18",
  tag: "M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z M7 7h.01",
  barChart: "M18 20V10M12 20V4M6 20v-6",
  inbox: "M22 12h-6l-2 3h-4l-2-3H2 M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z",
  truck: "M1 3h15v13H1z M16 8h4l3 3v5h-7V8z M5.5 21a2.5 2.5 0 100-5 2.5 2.5 0 000 5z M18.5 21a2.5 2.5 0 100-5 2.5 2.5 0 000 5z",
  layers: "M12 2L2 7l10 5 10-5-10-5z M2 17l10 5 10-5 M2 12l10 5 10-5",
  clock: "M12 22a10 10 0 100-20 10 10 0 000 20z M12 6v6l4 2",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  file: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
};

// ─── Types ─────────────────────────────────────────────────────────────────
type Page =
  | "dashboard"
  | "customer-list" | "customer-detail" | "customer-edit"
  | "goods-cabinet-list" | "goods-cabinet-detail" | "goods-inventory" | "goods-list-product" | "goods-restock-create" | "goods-restock-list"
  | "location-list" | "location-detail" | "location-edit"
  | "device-list" | "device-detail"
  | "product-list" | "product-add" | "product-preset" | "product-restock"
  | "order-list" | "order-modify"
  | "retail-order-list" | "retail-order-detail" | "retail-refund-list" | "retail-refund-detail" | "retail-algo-list"
  | "rule-auto" | "rule-pause" | "rule-template"
  | "erp-product-list" | "erp-product-form"
  | "erp-price-list" | "erp-price-form"
  | "erp-supplier-list" | "erp-supplier-form"
  | "erp-po-list" | "erp-po-new" | "erp-po-detail"
  | "erp-pm-list" | "erp-pm-new"
  | "erp-exc-list" | "erp-exc-handle"
  | "ff-wh-list" | "ff-wh-form"
  | "ff-wh-inv-list" | "ff-wh-inv-detail" | "ff-wh-inv-adjust"
  | "ff-inbound" | "ff-inbound-detail"
  | "ff-outbound" | "ff-outbound-detail"
  | "ff-delivery" | "ff-delivery-detail"
  | "ff-picking" | "ff-picking-detail"
  | "ff-staff" | "ff-staff-form" | "ff-vehicle" | "ff-vehicle-form"
  | "ff-dispatch-list" | "ff-dispatch-workbench" | "ff-dispatch-schedule"
  | "ff-engineer" | "ff-engineer-form"
  | "ff-workorder-list" | "ff-workorder-detail" | "ff-workorder-assign"
  | "crm-app"
  | "ff-mini-app"
  | "mini-programs";

// ─── Shared UI Primitives ──────────────────────────────────────────────────
const Badge = ({ label, color }: { label: string; color: "blue" | "green" | "yellow" | "red" | "gray" | "purple" | "cyan" | "orange" }) => {
  const map = {
    blue: "bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]",
    green: "bg-[#F0FDF4] text-[#16A34A] border border-[#BBF7D0]",
    yellow: "bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A]",
    red: "bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA]",
    gray: "bg-[#F8FAFC] text-[#64748B] border border-[#E2E8F0]",
    purple: "bg-[#F5F3FF] text-[#7C3AED] border border-[#DDD6FE]",
    cyan: "bg-[#ECFEFF] text-[#0891B2] border border-[#A5F3FC]",
    orange: "bg-[#FFF7ED] text-[#EA580C] border border-[#FED7AA]",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${map[color]}`}>
      {label}
    </span>
  );
};

const StatusDot = ({ color }: { color: string }) => (
  <span className={`inline-block w-1.5 h-1.5 rounded-full ${color} mr-1.5`} />
);

function orderStatusBadge(status: string) {
  const map: Record<string, { label: string; color: "blue" | "green" | "yellow" | "red" | "gray" | "purple" | "cyan" | "orange" }> = {
    "待分车": { label: "待分车", color: "gray" },
    "分车中": { label: "分车中", color: "blue" },
    "待分拣": { label: "待分拣", color: "yellow" },
    "分拣中": { label: "分拣中", color: "orange" },
    "待配送": { label: "待配送", color: "purple" },
    "配送中": { label: "配送中", color: "cyan" },
    "履约完成": { label: "履约完成", color: "green" },
    "履约失败": { label: "履约失败", color: "red" },
    "已取消": { label: "已取消", color: "gray" },
    "售后中": { label: "售后中", color: "orange" },
    "已退款": { label: "已退款", color: "purple" },
  };
  const s = map[status] ?? { label: status, color: "gray" as const };
  return <Badge label={s.label} color={s.color} />;
}

const Btn = ({
  children, variant = "primary", size = "md", icon, onClick, disabled = false, className = ""
}: {
  children?: ReactNode; variant?: "primary" | "secondary" | "ghost" | "danger" | "link";
  size?: "sm" | "md" | "lg"; icon?: string; onClick?: () => void; disabled?: boolean; className?: string;
}) => {
  const base = "inline-flex items-center gap-1.5 font-medium transition-all duration-150 cursor-pointer select-none border";
  const sizes = { sm: "px-3 py-1.5 text-xs rounded-md", md: "px-4 py-2 text-sm rounded-md", lg: "px-5 py-2.5 text-sm rounded-lg" };
  const variants = {
    primary: "bg-[#2563EB] text-white border-[#2563EB] hover:bg-[#1D4ED8] hover:border-[#1D4ED8] shadow-sm",
    secondary: "bg-white text-[#334155] border-[#E2E8F0] hover:bg-[#F8FAFC] hover:border-[#CBD5E1]",
    ghost: "bg-transparent text-[#64748B] border-transparent hover:bg-[#F1F5F9] hover:text-[#334155]",
    danger: "bg-[#DC2626] text-white border-[#DC2626] hover:bg-[#B91C1C] hover:border-[#B91C1C]",
    link: "bg-transparent text-[#2563EB] border-transparent hover:underline p-0 h-auto",
  };
  const disabledCls = disabled ? "opacity-40 cursor-not-allowed pointer-events-none" : "";
  return (
    <button onClick={onClick} disabled={disabled} className={`${base} ${sizes[size]} ${variants[variant]} ${disabledCls} ${className}`}>
      {icon && <Icon d={Icons[icon as keyof typeof Icons]} size={14} />}
      {children}
    </button>
  );
};

const Input = ({ placeholder, value, defaultValue, onChange, icon, type = "text", className = "", disabled = false }: {
  placeholder?: string; value?: string; defaultValue?: string; onChange?: (v: string) => void; icon?: string; type?: string; className?: string; disabled?: boolean;
}) => (
  <div className={`relative ${className}`}>
    {icon && <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#94A3B8]"><Icon d={Icons[icon as keyof typeof Icons]} size={14} /></span>}
    <input
      type={type}
      value={value}
      defaultValue={defaultValue}
      onChange={e => onChange?.(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className={`w-full h-9 border border-[#E2E8F0] rounded-md text-sm text-[#0F172A] placeholder-[#94A3B8] bg-white focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#DBEAFE] transition-all ${icon ? "pl-8 pr-3" : "px-3"} ${disabled ? "bg-[#F8FAFC] text-[#94A3B8] cursor-not-allowed" : ""}`}
    />
  </div>
);

const Select = ({ options, value, onChange, className = "" }: {
  options: { label: string; value: string }[]; value?: string; onChange?: (v: string) => void; className?: string;
}) => (
  <div className={`relative ${className}`}>
    <select
      value={value}
      onChange={e => onChange?.(e.target.value)}
      className="w-full h-9 border border-[#E2E8F0] rounded-md text-sm text-[#334155] bg-white px-3 pr-8 appearance-none focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#DBEAFE] transition-all cursor-pointer"
    >
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
    <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none">
      <Icon d={Icons.chevronDown} size={14} />
    </span>
  </div>
);

const Card = ({ children, className = "", noPad = false }: { children: ReactNode; className?: string; noPad?: boolean }) => (
  <div className={`bg-white border border-[#E2E8F0] rounded-lg shadow-sm ${noPad ? "" : "p-5"} ${className}`}>
    {children}
  </div>
);

const SectionTitle = ({ title, action }: { title: string; action?: ReactNode }) => (
  <div className="flex items-center justify-between mb-4">
    <h3 className="text-sm font-semibold text-[#0F172A]">{title}</h3>
    {action}
  </div>
);

// ─── Table ─────────────────────────────────────────────────────────────────
const Table = ({ cols, rows, selected, onSelect, onSelectAll, selectable = false, emptyText = "暂无数据" }: {
  cols: { key: string; label: string; width?: string; render?: (row: any) => ReactNode }[];
  rows: any[];
  selected?: Set<string>;
  onSelect?: (id: string) => void;
  onSelectAll?: () => void;
  selectable?: boolean;
  emptyText?: string;
}) => (
  <div className="overflow-x-auto">
    <table className="w-full text-sm border-collapse">
      <thead>
        <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
          {selectable && (
            <th className="w-10 px-4 py-3 text-left">
              <input type="checkbox" className="w-3.5 h-3.5 accent-[#2563EB] cursor-pointer" onChange={onSelectAll} />
            </th>
          )}
          {cols.map(c => (
            <th key={c.key} className={`px-4 py-3 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wide whitespace-nowrap ${c.width || ""}`}>
              {c.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.length === 0 ? (
          <tr>
            <td colSpan={cols.length + (selectable ? 1 : 0)} className="text-center py-16 text-[#94A3B8] text-sm">
              <div className="flex flex-col items-center gap-2">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>
                <span>{emptyText}</span>
              </div>
            </td>
          </tr>
        ) : rows.map((row, i) => (
          <tr key={row.id ?? i} className={`border-b border-[#F1F5F9] hover:bg-[#F8FAFC] transition-colors ${selected?.has(row.id) ? "bg-[#EFF6FF]" : ""}`}>
            {selectable && (
              <td className="px-4 py-3">
                <input type="checkbox" checked={selected?.has(row.id)} onChange={() => onSelect?.(row.id)} className="w-3.5 h-3.5 accent-[#2563EB] cursor-pointer" />
              </td>
            )}
            {cols.map(c => (
              <td key={c.key} className="px-4 py-3 text-[#334155] whitespace-nowrap">
                {c.render ? c.render(row) : row[c.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// ─── Pagination ─────────────────────────────────────────────────────────────
const Pagination = ({ total, page, pageSize }: { total: number; page: number; pageSize: number }) => {
  const totalPages = Math.ceil(total / pageSize);
  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-[#E2E8F0] bg-white">
      <span className="text-xs text-[#64748B]">共 <strong className="text-[#334155]">{total}</strong> 条记录</span>
      <div className="flex items-center gap-1">
        <button className="px-2.5 py-1.5 text-xs border border-[#E2E8F0] rounded text-[#64748B] hover:bg-[#F8FAFC] hover:border-[#CBD5E1]">上一页</button>
        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(p => (
          <button key={p} className={`w-8 h-7 text-xs border rounded transition-all ${p === page ? "bg-[#2563EB] text-white border-[#2563EB]" : "border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFC]"}`}>{p}</button>
        ))}
        {totalPages > 5 && <span className="text-[#94A3B8] text-xs px-1">...</span>}
        <button className="px-2.5 py-1.5 text-xs border border-[#E2E8F0] rounded text-[#64748B] hover:bg-[#F8FAFC] hover:border-[#CBD5E1]">下一页</button>
        <span className="ml-2 text-xs text-[#64748B]">跳至</span>
        <input className="w-12 h-7 border border-[#E2E8F0] rounded text-xs text-center text-[#334155] bg-white focus:outline-none focus:border-[#2563EB]" defaultValue={page} />
        <span className="text-xs text-[#64748B]">页</span>
      </div>
    </div>
  );
};

// ─── Filter Bar ──────────────────────────────────────────────────────────────
const FilterBar = ({ children }: { children: ReactNode }) => (
  <Card className="mb-4">
    <div className="flex flex-wrap gap-3 items-end">{children}</div>
  </Card>
);

const FilterField = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="flex flex-col gap-1 min-w-[140px]">
    <label className="text-xs text-[#64748B] font-medium">{label}</label>
    {children}
  </div>
);

// ─── Page Header ─────────────────────────────────────────────────────────────
const PageHeader = ({ title, breadcrumbs, actions }: {
  title: string;
  breadcrumbs?: string[];
  actions?: ReactNode;
}) => (
  <div className="mb-5">
    {breadcrumbs && (
      <div className="flex items-center gap-1 text-xs text-[#94A3B8] mb-1">
        {breadcrumbs.map((b, i) => (
          <span key={i} className="flex items-center gap-1">
            {i > 0 && <Icon d={Icons.chevronRight} size={12} />}
            <span className={i === breadcrumbs.length - 1 ? "text-[#64748B]" : "hover:text-[#2563EB] cursor-pointer"}>{b}</span>
          </span>
        ))}
      </div>
    )}
    <div className="flex items-center justify-between">
      <h1 className="text-xl font-bold text-[#0F172A]">{title}</h1>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  </div>
);

// ─── Batch Action Bar ─────────────────────────────────────────────────────────
const BatchBar = ({ count, actions }: { count: number; actions: ReactNode }) => (
  count > 0 ? (
    <div className="flex items-center gap-3 px-4 py-2.5 bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg mb-3">
      <span className="text-sm text-[#2563EB] font-medium">已选 {count} 项</span>
      <div className="h-4 w-px bg-[#BFDBFE]" />
      {actions}
    </div>
  ) : null
);

// ─── Modal ──────────────────────────────────────────────────────────────────
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
          <button onClick={onClose} className="text-[#94A3B8] hover:text-[#334155] transition-colors"><Icon d={Icons.x} size={18} /></button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4">{children}</div>
        {footer && <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-[#E2E8F0] bg-[#F8FAFC] rounded-b-xl">{footer}</div>}
      </div>
    </div>
  );
};

// ─── Drawer ──────────────────────────────────────────────────────────────────
const Drawer = ({ open, onClose, title, children, footer }: {
  open: boolean; onClose: () => void; title: string; children: ReactNode; footer?: ReactNode;
}) => (
  <>
    {open && <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm" onClick={onClose} />}
    <div className={`fixed top-0 right-0 h-full z-50 bg-white border-l border-[#E2E8F0] shadow-xl flex flex-col transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`} style={{ width: 640 }}>
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2E8F0]">
        <h2 className="text-base font-semibold text-[#0F172A]">{title}</h2>
        <button onClick={onClose} className="text-[#94A3B8] hover:text-[#334155]"><Icon d={Icons.x} size={18} /></button>
      </div>
      <div className="flex-1 overflow-y-auto px-6 py-4">{children}</div>
      {footer && <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-[#E2E8F0] bg-[#F8FAFC]">{footer}</div>}
    </div>
  </>
);

// ─── Info Grid ──────────────────────────────────────────────────────────────
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

// ─── Tabs ───────────────────────────────────────────────────────────────────
const Tabs = ({ tabs, active, onChange }: { tabs: { key: string; label: string }[]; active: string; onChange: (k: string) => void }) => (
  <div className="flex border-b border-[#E2E8F0] mb-5">
    {tabs.map(t => (
      <button
        key={t.key}
        onClick={() => onChange(t.key)}
        className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-all ${active === t.key ? "border-[#2563EB] text-[#2563EB]" : "border-transparent text-[#64748B] hover:text-[#334155]"}`}
      >
        {t.label}
      </button>
    ))}
  </div>
);

// ─── Toggle ─────────────────────────────────────────────────────────────────
const Toggle = ({ checked, onChange, label }: { checked: boolean; onChange: () => void; label?: string }) => (
  <label className="flex items-center gap-2 cursor-pointer">
    <div onClick={onChange} className={`relative w-9 h-5 rounded-full transition-colors ${checked ? "bg-[#2563EB]" : "bg-[#CBD5E1]"}`}>
      <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${checked ? "translate-x-4" : ""}`} />
    </div>
    {label && <span className="text-sm text-[#334155]">{label}</span>}
  </label>
);

// ─── Stats Card ─────────────────────────────────────────────────────────────
const StatCard = ({ label, value, sub, color = "#2563EB", icon }: {
  label: string; value: string | number; sub?: string; color?: string; icon?: string;
}) => (
  <Card className="flex items-start gap-4">
    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: color + "18", color }}>
      {icon && <Icon d={Icons[icon as keyof typeof Icons]} size={18} />}
    </div>
    <div>
      <div className="text-xs text-[#64748B] mb-0.5">{label}</div>
      <div className="text-2xl font-bold text-[#0F172A] leading-tight">{value}</div>
      {sub && <div className="text-xs text-[#94A3B8] mt-0.5">{sub}</div>}
    </div>
  </Card>
);

// ─── Step Bar ────────────────────────────────────────────────────────────────
const StepBar = ({ steps, current }: { steps: string[]; current: number }) => (
  <div className="flex items-center w-full mb-8">
    {steps.map((s, i) => (
      <div key={i} className="flex items-center flex-1 last:flex-none">
        <div className="flex items-center gap-2">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold border-2 flex-shrink-0 ${
            i < current ? "bg-[#2563EB] border-[#2563EB] text-white" :
            i === current ? "bg-white border-[#2563EB] text-[#2563EB]" :
            "bg-white border-[#E2E8F0] text-[#94A3B8]"
          }`}>
            {i < current ? <Icon d={Icons.check} size={12} /> : i + 1}
          </div>
          <span className={`text-xs font-medium whitespace-nowrap ${i <= current ? "text-[#334155]" : "text-[#94A3B8]"}`}>{s}</span>
        </div>
        {i < steps.length - 1 && <div className={`flex-1 h-px mx-3 ${i < current ? "bg-[#2563EB]" : "bg-[#E2E8F0]"}`} />}
      </div>
    ))}
  </div>
);

// ─── Form Row ────────────────────────────────────────────────────────────────
const FormRow = ({ label, required, children, hint }: { label: string; required?: boolean; children: ReactNode; hint?: string }) => (
  <div className="flex gap-4 mb-5">
    <label className="w-28 text-sm text-[#64748B] pt-2 text-right flex-shrink-0">
      {required && <span className="text-[#DC2626] mr-0.5">*</span>}
      {label}
    </label>
    <div className="flex-1">
      {children}
      {hint && <p className="text-xs text-[#94A3B8] mt-1">{hint}</p>}
    </div>
  </div>
);

// ─── Alert ───────────────────────────────────────────────────────────────────
const AlertBanner = ({ type, msg }: { type: "info" | "warning" | "error" | "success"; msg: string }) => {
  const styles = {
    info: "bg-[#EFF6FF] border-[#BFDBFE] text-[#1D4ED8]",
    warning: "bg-[#FFFBEB] border-[#FDE68A] text-[#92400E]",
    error: "bg-[#FEF2F2] border-[#FECACA] text-[#991B1B]",
    success: "bg-[#F0FDF4] border-[#BBF7D0] text-[#14532D]",
  };
  return (
    <div className={`flex items-start gap-2 p-3 rounded-lg border text-sm mb-4 ${styles[type]}`}>
      <Icon d={Icons.info} size={15} className="flex-shrink-0 mt-0.5" />
      <span>{msg}</span>
    </div>
  );
};

// ─── Sample Data ─────────────────────────────────────────────────────────────
const CUSTOMERS = [
  { id: "C001", name: "蜂巢智能科技（深圳）有限公司", type: "企业", contact: "王明", phone: "138-8888-0001", region: "华南", devices: 24, status: "正常", level: "金牌", created: "2023-04-15" },
  { id: "C002", name: "桔仔自动贩卖（上海）有限公司", type: "企业", contact: "李晓", phone: "139-7777-0002", region: "华东", devices: 18, status: "正常", level: "银牌", created: "2023-06-22" },
  { id: "C003", name: "格林购物科技（北京）有限公司", type: "企业", contact: "张磊", phone: "186-6666-0003", region: "华北", devices: 31, status: "欠费", level: "金牌", created: "2022-11-08" },
  { id: "C004", name: "云聚零售（成都）有限公司", type: "企业", contact: "刘莹", phone: "155-5555-0004", region: "西南", devices: 9, status: "正常", level: "普通", created: "2024-01-30" },
  { id: "C005", name: "万象智贩（杭州）有限公司", type: "企业", contact: "陈伟", phone: "187-4444-0005", region: "华东", devices: 15, status: "停用", level: "银牌", created: "2023-09-12" },
  { id: "C006", name: "盒里科技（广州）有限公司", type: "企业", contact: "赵阳", phone: "135-3333-0006", region: "华南", devices: 7, status: "正常", level: "普通", created: "2024-03-05" },
];

const LOCATIONS = [
  { id: "PW-20230801", name: "深圳南山科技园 A3 栋大堂",    customer: "蜂巢智能科技",   warehouse: "深圳中心仓", region: "广东省·深圳市·南山区", address: "深圳市南山区科技园南区A3栋1F",   level: "S",  scene: "写字楼",   status: "启用", auditStatus: "审核通过", deviceStatus: "在线", lastOfflineAt: "" },
  { id: "PW-20230915", name: "上海虹桥天地购物中心 B1",     customer: "桔仔自动贩卖",   warehouse: "上海中心仓", region: "上海市·长宁区",         address: "上海市长宁区红松东路1号B1",    level: "A",  scene: "商业综合体", status: "启用", auditStatus: "审核通过", deviceStatus: "在线", lastOfflineAt: "" },
  { id: "PW-20231120", name: "北京国贸中心 3 期",           customer: "格林购物科技",   warehouse: "北京中心仓", region: "北京市·朝阳区",          address: "北京市朝阳区建国门外大街1号",  level: "S+", scene: "写字楼",   status: "启用", auditStatus: "待审核",  deviceStatus: "离线", lastOfflineAt: "2025-09-21 08:15" },
  { id: "PW-20240210", name: "成都天府软件园 D 区食堂",     customer: "云聚零售",       warehouse: "成都中心仓", region: "四川省·成都市·高新区",   address: "成都市高新区天府大道100号",    level: "B",  scene: "园区食堂", status: "启用", auditStatus: "审核通过", deviceStatus: "在线", lastOfflineAt: "" },
  { id: "PW-20240518", name: "杭州阿里巴巴西溪园区 5 号楼", customer: "万象智贩",       warehouse: "杭州中心仓", region: "浙江省·杭州市·余杭区",   address: "杭州市余杭区文一西路969号5号楼", level: "A", scene: "写字楼",   status: "禁用", auditStatus: "审核驳回", deviceStatus: "离线", lastOfflineAt: "2025-09-12 18:40" },
  { id: "PW-20240901", name: "广州天河城购物中心 2F",       customer: "盒里科技",       warehouse: "广州中心仓", region: "广东省·广州市·天河区",   address: "广州市天河区天河路208号2F",   level: "C",  scene: "商业综合体", status: "启用", auditStatus: "待审核",  deviceStatus: "未绑定", lastOfflineAt: "" },
  { id: "PW-20250103", name: "深圳福田中心区汇德广场",      customer: "蜂巢智能科技",   warehouse: "深圳中心仓", region: "广东省·深圳市·福田区",   address: "深圳市福田区益田路6号汇德广场",  level: "N", scene: "商业综合体", status: "启用", auditStatus: "审核通过", deviceStatus: "未绑定", lastOfflineAt: "" },
];

const DEVICES = [
  { id: "D001", sn: "RC-2024-SZ-001", model: "智柜 Pro X8", location: "深圳南山科技园 A3 栋", customer: "蜂巢智能科技", status: "在线", health: "正常", lastSync: "2025-09-10 14:32", firmware: "v2.3.1", temp: "4.2°C", power: "220V/AC" },
  { id: "D002", sn: "RC-2024-SH-002", model: "智柜 Pro X8", location: "上海虹桥天地 B1", customer: "桔仔自动贩卖", status: "在线", health: "正常", lastSync: "2025-09-10 14:30", firmware: "v2.3.0", temp: "3.8°C", power: "220V/AC" },
  { id: "D003", sn: "RC-2024-BJ-003", model: "智柜 Lite S4", location: "北京国贸中心 3 期", customer: "格林购物科技", status: "离线", health: "告警", lastSync: "2025-09-09 08:12", firmware: "v2.2.5", temp: "—", power: "—" },
  { id: "D004", sn: "RC-2024-CD-004", model: "智柜 Pro X8", location: "成都天府软件园", customer: "云聚零售", status: "在线", health: "正常", lastSync: "2025-09-10 14:28", firmware: "v2.3.1", temp: "5.1°C", power: "220V/AC" },
  { id: "D005", sn: "RC-2024-HZ-005", model: "智柜 Max X12", location: "杭州阿里巴巴西溪园区", customer: "万象智贩", status: "在线", health: "正常", lastSync: "2025-09-10 14:25", firmware: "v2.3.1", temp: "4.0°C", power: "220V/AC" },
  { id: "D006", sn: "RC-2024-GZ-006", model: "智柜 Lite S4", location: "广州天河城购物中心", customer: "盒里科技", status: "维护", health: "维护中", lastSync: "2025-09-10 09:00", firmware: "v2.2.9", temp: "—", power: "220V/AC" },
];

const PRODUCTS = [
  { id: "P001", sku: "SKU-DRINK-001", name: "可口可乐 330ml", category: "饮料", price: 4.5, cost: 2.2, stock: 240, preset: 30, turnover: 87, status: "上架", locations: 18 },
  { id: "P002", sku: "SKU-SNACK-012", name: "乐事薯片原味 75g", category: "零食", price: 6.9, cost: 3.5, stock: 180, preset: 24, turnover: 72, status: "上架", locations: 15 },
  { id: "P003", sku: "SKU-DRINK-005", name: "农夫山泉矿泉水 550ml", category: "饮料", price: 2.5, cost: 0.8, stock: 600, preset: 60, turnover: 95, status: "上架", locations: 24 },
  { id: "P004", sku: "SKU-MEAL-003", name: "自热米饭 红烧牛肉 405g", category: "速食", price: 19.9, cost: 9.5, stock: 60, preset: 12, turnover: 43, status: "上架", locations: 8 },
  { id: "P005", sku: "SKU-DRINK-022", name: "统一冰红茶 500ml", category: "饮料", price: 3.5, cost: 1.5, stock: 30, preset: 24, turnover: 91, status: "库存告警", locations: 12 },
  { id: "P006", sku: "SKU-SNACK-031", name: "好丽友蒙奇奇派 6枚", category: "零食", price: 12.9, cost: 6.2, stock: 0, preset: 18, turnover: 0, status: "下架", locations: 0 },
  { id: "P007", sku: "SKU-DAIRY-008", name: "光明莫斯利安酸奶 200g", category: "乳品", price: 5.9, cost: 2.8, stock: 90, preset: 20, turnover: 58, status: "上架", locations: 6 },
  { id: "P008", sku: "SKU-DRINK-033", name: "元气森林苏打水气泡水 480ml", category: "饮料", price: 5.0, cost: 2.4, stock: 160, preset: 30, turnover: 79, status: "上架", locations: 11 },
];

const ORDERS = [
  { id: "RO-20250910-0001", type: "常规补货", customer: "蜂巢智能科技", location: "南山科技园 A3", device: "RC-2024-SZ-001", skuCount: 8, total: 1240, status: "配送中", driver: "李师傅", created: "2025-09-10 08:00", updated: "2025-09-10 13:45" },
  { id: "RO-20250910-0002", type: "紧急补货", customer: "格林购物科技", location: "北京国贸中心", device: "RC-2024-BJ-003", skuCount: 5, total: 680, status: "待分车", driver: "—", created: "2025-09-10 09:30", updated: "2025-09-10 09:30" },
  { id: "RO-20250909-0015", type: "常规补货", customer: "桔仔自动贩卖", location: "虹桥天地 B1", device: "RC-2024-SH-002", skuCount: 12, total: 2180, status: "履约完成", driver: "张司机", created: "2025-09-09 07:00", updated: "2025-09-09 15:20" },
  { id: "RO-20250909-0016", type: "常规补货", customer: "云聚零售", location: "天府软件园", device: "RC-2024-CD-004", skuCount: 6, total: 890, status: "履约失败", driver: "王配送", created: "2025-09-09 10:00", updated: "2025-09-09 16:30" },
  { id: "RO-20250908-0022", type: "常规补货", customer: "万象智贩", location: "阿里西溪 5 号楼", device: "RC-2024-HZ-005", skuCount: 10, total: 1560, status: "已取消", driver: "—", created: "2025-09-08 11:00", updated: "2025-09-08 14:00" },
  { id: "RO-20250910-0003", type: "尝新补货", customer: "盒里科技", location: "广州天河城", device: "RC-2024-GZ-006", skuCount: 4, total: 420, status: "分拣中", driver: "陈分拣", created: "2025-09-10 10:15", updated: "2025-09-10 12:00" },
];

// ─── Per-system nav groups ────────────────────────────────────────────────────
type NavGroup = { label: string; items: { key: string; label: string; icon: string }[] };

const OPS_NAV: NavGroup[] = [
  { label: "核心业务", items: [
    { key: "customer-list", label: "客户管理", icon: "customers" },
    { key: "location-list", label: "点位管理", icon: "location" },
    { key: "device-list", label: "设备台账", icon: "device" },
  ]},
  { label: "商品与库存", items: [
    { key: "goods-cabinet-list", label: "智能柜商品库", icon: "layers" },
    { key: "goods-restock-list", label: "补货单列表", icon: "order" },
  ]},
  { label: "规则配置", items: [
    { key: "rule-auto", label: "自动补货规则配置", icon: "rules" },
    // { key: "rule-template", label: "预存量模板", icon: "layers" }, // 暂时隐藏，页面与路由保留
  ]},
  { label: "销售订单管理", items: [
    { key: "retail-order-list",  label: "零售订单列表",   icon: "order"   },
    { key: "retail-refund-list", label: "订单退款处理",   icon: "refresh" },
    // { key: "retail-algo-list",   label: "算法异常单处理", icon: "alert"   }, // 暂时隐藏，页面与路由保留
  ]},
];

const ERP_NAV: NavGroup[] = [
  { label: "商品档案", items: [
    { key: "erp-product-list", label: "商品档案", icon: "package" },
    // { key: "erp-price-list", label: "价格模板", icon: "tag" }, // 暂时隐藏，页面与路由保留
  ]},
  { label: "供应商", items: [
    { key: "erp-supplier-list", label: "供应商管理", icon: "customers" },
  ]},
  { label: "采购", items: [
    { key: "erp-pm-list", label: "采购单", icon: "order" },
    { key: "erp-po-list", label: "采购入库单", icon: "inbox" },
    { key: "erp-exc-list", label: "入库异常单", icon: "alert" },
  ]},
];

const FF_NAV: NavGroup[] = [
  { label: "仓库管理", items: [
    { key: "ff-wh-list",     label: "仓库管理", icon: "layers" },
    { key: "ff-wh-inv-list", label: "仓库库存", icon: "inbox"  },
  ]},
  { label: "单据管理", items: [
    { key: "ff-inbound", label: "入库单", icon: "download" },
    { key: "ff-outbound", label: "出库单", icon: "upload" },
    { key: "ff-delivery", label: "配送单", icon: "truck" },
    { key: "ff-picking", label: "分拣单", icon: "layers" },
  ]},
  { label: "排车管理", items: [
    { key: "ff-staff", label: "配送人员", icon: "customers" },
    { key: "ff-vehicle", label: "车辆管理", icon: "settings" },
    { key: "ff-dispatch-list", label: "补货订单列表", icon: "inbox" },
    { key: "ff-dispatch-schedule", label: "车辆排班", icon: "truck" },
  ]},
  { label: "工单管理", items: [
    { key: "ff-engineer",      label: "工程人员", icon: "customers" },
    { key: "ff-workorder-list", label: "装机工单", icon: "order" },
  ]},
];

// ─── System definitions ───────────────────────────────────────────────────────
type SystemKey = "ops" | "erp" | "fulfillment" | "crm" | "ff-mini" | "client-mini" | "consumer-mini";

const SYSTEM_DEFS: { key: SystemKey; label: string; sub: string; icon: string; color: string; nav?: NavGroup[] }[] = [
  { key: "crm",         label: "销售 CRM",   sub: "销售CRM",    icon: "send",      color: "#F97316" },
  { key: "ops",         label: "运营后台",   sub: "运营后台",   icon: "grid",      color: "#2563EB", nav: OPS_NAV },
  { key: "erp",         label: "ERP 后台",   sub: "ERP后台",    icon: "package",   color: "#7C3AED", nav: ERP_NAV },
  { key: "fulfillment", label: "履约后台",   sub: "履约后台",   icon: "truck",     color: "#16A34A", nav: FF_NAV },
  { key: "ff-mini",      label: "履约小程序",  sub: "履约小程序", icon: "zap",       color: "#0891B2" },
  { key: "client-mini",  label: "客户小程序",  sub: "客户小程序", icon: "customers", color: "#0D9488" },
  { key: "consumer-mini",label: "消费者小程序",sub: "消费者端",   icon: "send",      color: "#7C3AED" },
];

// ─── System Icon Bar (left, always visible) ───────────────────────────────────
const SystemBar = ({ active, onChange }: { active: SystemKey; onChange: (k: SystemKey) => void }) => (
  <aside className="w-[72px] bg-[#1E293B] flex flex-col h-full flex-shrink-0 border-r border-white/10">
    {/* Logo */}
    <div className="flex flex-col items-center py-4 border-b border-white/10">
      <div className="w-10 h-10 rounded-xl bg-[#2563EB] flex items-center justify-center">
        <Icon d={Icons.grid} size={18} className="text-white" />
      </div>
    </div>
    {/* Sales CRM is pinned above the operations systems */}
    <nav className="flex flex-col items-center gap-1 pt-3 px-2">
      {SYSTEM_DEFS.filter(s => ["crm", "ops", "erp", "fulfillment"].includes(s.key)).map(s => {
        const isActive = active === s.key;
        return (
          <button key={s.key} onClick={() => onChange(s.key)}
            title={s.label}
            className={`relative w-12 h-12 rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all group
              ${isActive ? "bg-white/10" : "hover:bg-white/6"}`}>
            {isActive && (
              <div className="absolute left-0 top-2 bottom-2 w-0.5 rounded-r-full" style={{ background: s.color }} />
            )}
            <Icon d={Icons[s.icon as keyof typeof Icons]} size={18}
              className={isActive ? "text-white" : "text-[#94A3B8] group-hover:text-white"} />
            <span className={`text-[9px] font-semibold leading-none text-center px-0.5 ${isActive ? "text-white" : "text-[#94A3B8] group-hover:text-white"}`}>
              {s.sub}
            </span>
          </button>
        );
      })}
    </nav>
    {/* Divider */}
    <div className="mx-3 my-3 border-t border-white/15" />
    {/* Mini-program systems */}
    <nav className="flex flex-col items-center gap-1 px-2">
      {SYSTEM_DEFS.filter(s => ["ff-mini","client-mini","consumer-mini"].includes(s.key)).map(s => {
        const isActive = active === s.key;
        return (
          <button key={s.key} onClick={() => onChange(s.key)}
            title={s.label}
            className={`relative w-12 h-12 rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all group
              ${isActive ? "bg-white/10" : "hover:bg-white/6"}`}>
            {isActive && (
              <div className="absolute left-0 top-2 bottom-2 w-0.5 rounded-r-full" style={{ background: s.color }} />
            )}
            <Icon d={Icons[s.icon as keyof typeof Icons]} size={18}
              className={isActive ? "text-white" : "text-[#94A3B8] group-hover:text-white"} />
            <span className={`text-[9px] font-semibold leading-none text-center px-0.5 ${isActive ? "text-white" : "text-[#94A3B8] group-hover:text-white"}`}>
              {s.sub}
            </span>
          </button>
        );
      })}
    </nav>
    {/* Bottom user */}
    <div className="mt-auto pb-4 flex justify-center">
      <div className="w-9 h-9 rounded-full bg-[#2563EB] flex items-center justify-center text-white text-xs font-bold">管</div>
    </div>
  </aside>
);

// ─── Sub-nav (for admin systems) ──────────────────────────────────────────────
const SubNav = ({ page, setPage, groups, color, systemLabel }: {
  page: Page; setPage: (p: Page) => void; groups: NavGroup[]; color: string; systemLabel: string;
}) => (
  <aside className="w-[210px] bg-[#1E293B] flex flex-col h-full flex-shrink-0 border-r border-white/10">
    <div className="px-4 py-4 border-b border-white/10">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full" style={{ background: color }} />
        <div className="text-white text-sm font-bold">{systemLabel}</div>
      </div>
      <div className="text-[#94A3B8] text-[10px] mt-0.5">零售柜综合运营平台 V1.0</div>
    </div>
    <nav className="flex-1 overflow-y-auto py-3 px-2">
      {groups.map(group => (
        <div key={group.label} className="mb-4">
          <div className="text-[10px] font-semibold text-[#64748B] uppercase tracking-widest px-2 mb-1.5">{group.label}</div>
          {group.items.map(item => {
            const allKeys = groups.flatMap(g => g.items.map(i => i.key));
            const isActive = page === item.key || (item.key.endsWith("-list") && page.startsWith(item.key.replace("-list", "")) && !allKeys.includes(page));
            return (
              <button key={item.key} onClick={() => setPage(item.key as Page)}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-all mb-0.5 ${
                  isActive ? "text-white font-semibold" : "text-[#94A3B8] hover:bg-white/8 hover:text-white"
                }`}
                style={isActive ? { background: color } : undefined}>
                <Icon d={Icons[item.icon as keyof typeof Icons]} size={15} />
                {item.label}
              </button>
            );
          })}
        </div>
      ))}
    </nav>
  </aside>
);

// ─── Top Bar ─────────────────────────────────────────────────────────────────
const TOP_MENU: { label: string; key: SystemKey }[] = [
  { label: "运营后台", key: "ops" },
  { label: "ERP后台",  key: "erp" },
  { label: "履约后台", key: "fulfillment" },
];

const TopBar = ({ system, onSystemChange }: { system: SystemKey; onSystemChange: (k: SystemKey) => void }) => (
  <header className="h-14 bg-white border-b border-[#E2E8F0] flex items-center justify-between px-5 flex-shrink-0">
    <div className="flex items-center gap-1">
      {TOP_MENU.map((item) => {
        const isActive = system === item.key;
        return (
          <button
            key={item.key}
            onClick={() => onSystemChange(item.key)}
            className={`px-4 h-8 rounded-md text-sm font-medium transition-colors ${
              isActive
                ? "bg-[#2563EB] text-white"
                : "text-[#64748B] hover:text-[#334155] hover:bg-[#F1F5F9]"
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </div>
    <div className="flex items-center gap-3">
      <button className="relative w-8 h-8 flex items-center justify-center text-[#64748B] hover:text-[#334155] hover:bg-[#F1F5F9] rounded-md">
        <Icon d={Icons.bell} size={18} />
        <span className="absolute top-1 right-1 w-2 h-2 bg-[#DC2626] rounded-full border-2 border-white" />
      </button>
      <button className="w-8 h-8 flex items-center justify-center text-[#64748B] hover:text-[#334155] hover:bg-[#F1F5F9] rounded-md">
        <Icon d={Icons.settings} size={18} />
      </button>
      <div className="h-5 w-px bg-[#E2E8F0]" />
      <div className="flex items-center gap-2 cursor-pointer">
        <div className="w-7 h-7 rounded-full bg-[#2563EB] flex items-center justify-center text-white text-xs font-semibold">管</div>
        <span className="text-sm text-[#334155]">超级管理员</span>
        <Icon d={Icons.chevronDown} size={14} className="text-[#94A3B8]" />
      </div>
    </div>
  </header>
);

// ═══════════════════════════════════════════════════════════════════════════
// PAGES
// ═══════════════════════════════════════════════════════════════════════════

// ─── Customer Data ────────────────────────────────────────────────────────────
const PC_CUSTOMERS = [
  { id: "KH-20230115", name: "蜂巢智能科技（深圳）有限公司", belong: "自营", type: "企业", locations: 8, contact: "张伟", phone: "138-8888-0001", status: "正常", created: "2023-01-15" },
  { id: "KH-20230312", name: "桔仔自动贩卖（上海）有限公司", belong: "渠道商", type: "企业", locations: 5, contact: "李晓", phone: "139-7777-0002", status: "正常", created: "2023-03-12" },
  { id: "KH-20230528", name: "格林购物科技（北京）有限公司", belong: "加盟商", type: "企业", locations: 12, contact: "张磊", phone: "186-6666-0003", status: "禁用", created: "2023-05-28" },
  { id: "KH-20231101", name: "云聚零售（成都）有限公司", belong: "渠道商", type: "政府", locations: 3, contact: "刘莹", phone: "155-5555-0004", status: "正常", created: "2023-11-01" },
  { id: "KH-20240215", name: "万象智贩（杭州）有限公司", belong: "自营", type: "事业单位", locations: 6, contact: "陈伟", phone: "187-4444-0005", status: "禁用", created: "2024-02-15" },
  { id: "KH-20240403", name: "盒里科技（广州）有限公司", belong: "加盟商", type: "其他", locations: 2, contact: "赵阳", phone: "135-3333-0006", status: "正常", created: "2024-04-03" },
];

// ─── Customer List ───────────────────────────────────────────────────────────
const CustomerList = ({ onDetail, onEdit }: { onDetail: () => void; onEdit: () => void }) => {
  const [rowAction, setRowAction] = useState<{ id: string; action: "enable" | "disable" } | null>(null);
  const [exportConfirm, setExportConfirm] = useState(false);

  return (
    <div>
      <PageHeader
        title="客户管理"
        breadcrumbs={["首页", "核心业务", "客户管理"]}
      />
      <FilterBar>
        <FilterField label="客户名称/编码"><Input placeholder="输入名称或编码搜索" icon="search" className="w-52" /></FilterField>
        <FilterField label="归属对象">
          <Select options={[{label:"全部归属",value:""},{label:"自营",value:"own"},{label:"渠道商",value:"channel"},{label:"加盟商",value:"franchise"}]} className="w-32" />
        </FilterField>
        <FilterField label="客户类型">
          <Select options={[{label:"全部类型",value:""},{label:"企业",value:"enterprise"},{label:"政府",value:"gov"},{label:"事业单位",value:"institution"},{label:"其他",value:"other"}]} className="w-32" />
        </FilterField>
        <FilterField label="客户状态">
          <Select options={[{label:"全部状态",value:""},{label:"启用",value:"enabled"},{label:"禁用",value:"disabled"}]} className="w-28" />
        </FilterField>
        <FilterField label="审核状态">
          <Select options={[{label:"全部",value:""},{label:"待审核",value:"pending"},{label:"审核通过",value:"passed"},{label:"审核驳回",value:"rejected"}]} className="w-32" />
        </FilterField>
        <FilterField label="创建时间">
          <div className="flex items-center gap-1">
            <Input type="date" className="w-36" />
            <span className="text-[#94A3B8] text-xs">至</span>
            <Input type="date" className="w-36" />
          </div>
        </FilterField>
        <div className="flex items-end gap-2">
          <Btn variant="primary" icon="search">查询</Btn>
          <Btn variant="secondary">重置</Btn>
        </div>
      </FilterBar>

      <div className="flex items-center gap-2 mb-3">
        <Btn variant="secondary" icon="download" onClick={() => setExportConfirm(true)}>导出Excel</Btn>
      </div>

      <Card noPad>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#F1F5F9] bg-[#F8FAFC]">
              {["客户编码","客户名称","归属对象","关联点位数","联系人","联系电话","客户状态","审核状态","创建时间","操作"].map(h => (
                <th key={h} className="py-3 px-3 text-left font-medium text-[#64748B] whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PC_CUSTOMERS.map(r => (
              <tr key={r.id} className="border-b border-[#F1F5F9] hover:bg-[#F8FAFC] transition-colors">
                <td className="py-3 px-3 font-mono text-xs text-[#64748B] whitespace-nowrap">{r.id}</td>
                <td className="py-3 px-3">
                  <button onClick={onDetail} className="text-[#2563EB] hover:underline font-medium text-left">{r.name}</button>
                </td>
                <td className="py-3 px-3 text-[#334155]">{r.belong}</td>
                <td className="py-3 px-3">
                  <span className="inline-flex items-center gap-1 font-medium text-[#0F172A]">
                    <Icon d={Icons.location} size={13} className="text-[#2563EB]" />{r.locations} 个
                  </span>
                </td>
                <td className="py-3 px-3 text-[#334155]">{r.contact}</td>
                <td className="py-3 px-3 text-[#334155]">{r.phone}</td>
                <td className="py-3 px-3">
                  {r.status === "正常"
                    ? <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-[#F0FDF4] text-[#16A34A]"><span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />启用</span>
                    : <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-[#F3F4F6] text-[#6B7280]"><span className="w-1.5 h-1.5 rounded-full bg-[#6B7280]" />禁用</span>
                  }
                </td>
                <td className="py-3 px-3">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-[#FFFBEB] text-[#D97706]">待审核</span>
                </td>
                <td className="py-3 px-3 text-[#64748B] text-xs whitespace-nowrap">{r.created}</td>
                <td className="py-3 px-3">
                  <div className="flex items-center gap-1 whitespace-nowrap">
                    <button onClick={onEdit} className="text-xs px-2 py-1 rounded text-[#2563EB] hover:bg-[#EFF6FF] transition-colors">编辑</button>
                    <button
                      onClick={() => setRowAction({ id: r.id, action: r.status === "正常" ? "disable" : "enable" })}
                      className={`text-xs px-2 py-1 rounded transition-colors ${r.status === "正常" ? "text-[#DC2626] hover:bg-[#FEF2F2]" : "text-[#16A34A] hover:bg-[#F0FDF4]"}`}
                    >{r.status === "正常" ? "禁用" : "启用"}</button>
                    <button onClick={onDetail} className="text-xs px-2 py-1 rounded text-[#64748B] hover:bg-[#F1F5F9] transition-colors">详情</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination total={PC_CUSTOMERS.length} page={1} pageSize={10} />
      </Card>

      {/* 单行操作确认 */}
      <Modal
        open={rowAction !== null}
        onClose={() => setRowAction(null)}
        title={rowAction?.action === "enable" ? "确认启用客户" : "确认禁用客户"}
        width={440}
        footer={<><Btn variant="secondary" onClick={() => setRowAction(null)}>取消</Btn><Btn variant={rowAction?.action === "disable" ? "danger" : "primary"} onClick={() => setRowAction(null)}>确认{rowAction?.action === "enable" ? "启用" : "禁用"}</Btn></>}
      >
        <div className={`flex items-start gap-3 rounded-lg border p-3 ${rowAction?.action === "disable" ? "border-[#FDE68A] bg-[#FFFBEB]" : "border-[#BFDBFE] bg-[#EFF6FF]"}`}>
          <Icon d={rowAction?.action === "disable" ? Icons.alert : Icons.info} size={17} className={rowAction?.action === "disable" ? "text-[#D97706] mt-0.5" : "text-[#2563EB] mt-0.5"} />
          <p className="text-sm leading-6 text-[#334155]">
            确认{rowAction?.action === "enable" ? "启用" : "禁用"}该客户吗？
            {rowAction?.action === "disable" && " 禁用后该客户将无法通过小程序登录，关联点位运营不受影响。"}
          </p>
        </div>
      </Modal>

      {/* 导出确认 */}
      <Modal
        open={exportConfirm}
        onClose={() => setExportConfirm(false)}
        title="导出客户数据"
        width={400}
        footer={<><Btn variant="secondary" onClick={() => setExportConfirm(false)}>取消</Btn><Btn variant="primary" onClick={() => setExportConfirm(false)}>确认导出</Btn></>}
      >
        <div className="flex items-start gap-3 rounded-lg border border-[#BFDBFE] bg-[#EFF6FF] p-3">
          <Icon d={Icons.info} size={17} className="text-[#2563EB] mt-0.5" />
          <p className="text-sm leading-6 text-[#334155]">将按当前筛选条件导出客户列表，共 <strong>{PC_CUSTOMERS.length}</strong> 条记录，导出为 Excel 文件。</p>
        </div>
      </Modal>
    </div>
  );
};

// ─── Customer Detail ──────────────────────────────────────────────────────────
type CdAuditStatus = "待审核" | "审核中" | "审核通过" | "审核驳回";
const CD_AUDIT_CFG: Record<CdAuditStatus, { bg: string; border: string; dot: string; text: string; label: string; trackBg: string }> = {
  "待审核":  { bg: "bg-[#FFFBEB]", border: "border-[#FDE68A]", dot: "bg-[#D97706]", text: "text-[#D97706]", label: "待审核",  trackBg: "bg-[#FDE68A]" },
  "审核中":  { bg: "bg-[#EFF6FF]", border: "border-[#BFDBFE]", dot: "bg-[#2563EB]", text: "text-[#2563EB]", label: "审核中",  trackBg: "bg-[#BFDBFE]" },
  "审核通过": { bg: "bg-[#F0FDF4]", border: "border-[#BBF7D0]", dot: "bg-[#16A34A]", text: "text-[#16A34A]", label: "审核通过", trackBg: "bg-[#BBF7D0]" },
  "审核驳回": { bg: "bg-[#FEF2F2]", border: "border-[#FECACA]", dot: "bg-[#DC2626]", text: "text-[#DC2626]", label: "审核驳回", trackBg: "bg-[#FECACA]" },
};

const DETAIL_LOCS_DATA = [
  { code: "PW-20230801", name: "蜂巢·科技园北楼1F-A区", addr: "深圳市南山区科技园南区A3栋1F", level: "S", status: "启用" },
  { code: "PW-20230915", name: "蜂巢·科技园南楼B2-C区", addr: "深圳市南山区科技园南区A3栋B2", level: "A", status: "启用" },
  { code: "PW-20231120", name: "蜂巢·前海中心1F大堂",   addr: "深圳市南山区前海合作区前海大道",  level: "B", status: "禁用" },
  { code: "PW-20240210", name: "蜂巢·留仙洞总部基地",   addr: "深圳市南山区留仙洞战略性新兴产业基地", level: "A", status: "启用" },
];

const LEVEL_COLOR: Record<string, string> = {
  "S+": "bg-[#FFF1F2] text-[#E11D48]", S: "bg-[#FFF7ED] text-[#C2410C]",
  A: "bg-[#EFF6FF] text-[#2563EB]", B: "bg-[#F5F3FF] text-[#7C3AED]",
  C: "bg-[#F5F7FA] text-[#64748B]",
};

const CustomerDetail = ({ onBack, onEdit }: { onBack: () => void; onEdit: () => void }) => {
  const [auditStatus, setAuditStatus] = useState<CdAuditStatus>("审核通过");
  const cfg = CD_AUDIT_CFG[auditStatus];
  const [photoOpen, setPhotoOpen] = useState(false);
  const [tab, setTab] = useState("basic");
  const [visiblePwds, setVisiblePwds] = useState<Set<number>>(new Set());
  const togglePwd = (i: number) => setVisiblePwds(s => { const n = new Set(s); n.has(i) ? n.delete(i) : n.add(i); return n; });

  const auditSteps = [
    { label: "提交申请", time: "2023-01-15 10:30", done: true },
    { label: "审核中",   time: "2023-01-15 11:00", done: auditStatus !== "待审核" },
    { label: auditStatus === "审核驳回" ? "审核驳回" : "审核通过", time: auditStatus === "待审核" || auditStatus === "审核中" ? "待完成" : "2023-01-16 14:20", done: auditStatus === "审核通过" || auditStatus === "审核驳回" },
  ];

  const TABS = [
    { key: "basic",    label: "基本信息" },
    { key: "contract", label: "合同信息" },
    { key: "contacts", label: "联系人信息" },
    { key: "accounts", label: "小程序账号" },
    { key: "locations",label: "关联点位" },
  ];

  return (
    <div>
      <PageHeader
        title="蜂巢智能科技（深圳）有限公司"
        breadcrumbs={["首页", "客户管理", "客户详情"]}
        actions={
          <>
            <Btn variant="secondary" icon="chevronLeft" onClick={onBack}>返回列表</Btn>
            <Btn variant="secondary" icon="edit" onClick={onEdit}>编辑</Btn>
          </>
        }
      />

      {/* 审批状态条 — 紧凑横条 */}
      <div className={`rounded-lg border ${cfg.border} ${cfg.bg} px-4 py-3 mb-4 flex items-center gap-4 flex-wrap`}>
        {/* 状态标签 */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-xs text-[#64748B]">审批状态</span>
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${cfg.border} ${cfg.text}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />{cfg.label}
          </span>
          <span className="text-xs text-[#94A3B8]">AP-20230115-001</span>
        </div>
        {/* 进度步骤 — 内联小尺寸 */}
        <div className="flex items-center gap-1 flex-1 min-w-0">
          {auditSteps.map((step, i) => (
            <div key={i} className="flex items-center gap-1">
              <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${step.done ? cfg.dot + " text-white" : "bg-[#E2E8F0] text-[#94A3B8]"}`}>
                {step.done ? <Icon d={Icons.check} size={9} className="text-white" /> : i + 1}
              </div>
              <span className={`text-xs whitespace-nowrap ${step.done ? cfg.text : "text-[#94A3B8]"}`}>{step.label}</span>
              <span className="text-[10px] text-[#94A3B8] whitespace-nowrap hidden lg:inline">{step.time}</span>
              {i < auditSteps.length - 1 && <div className={`w-6 h-px mx-1 flex-shrink-0 ${step.done ? cfg.trackBg : "bg-[#E2E8F0]"}`} />}
            </div>
          ))}
        </div>
        {/* 关键信息 */}
        <div className="flex items-center gap-6 flex-shrink-0 text-xs">
          <div><span className="text-[#94A3B8]">审核人 </span><span className={`font-medium ${cfg.text}`}>张主管</span></div>
          <div><span className="text-[#94A3B8]">发起时间 </span><span className="text-[#334155]">2023-01-15 10:30</span></div>
          {(auditStatus === "审核通过" || auditStatus === "审核驳回") &&
            <div><span className="text-[#94A3B8]">完成时间 </span><span className="text-[#334155]">2023-01-16 14:20</span></div>}
          {auditStatus === "审核驳回" &&
            <div className="flex items-center gap-1 text-[#DC2626]"><Icon d={Icons.alert} size={11} />合同信息不完整，请补充保证金凭证。</div>}
        </div>
        {/* 演示切换器 */}
        <div className="flex items-center gap-1 ml-auto flex-shrink-0 border-l border-[#E2E8F0] pl-4">
          <span className="text-[10px] text-[#94A3B8] mr-1">演示切换</span>
          {(["待审核","审核中","审核通过","审核驳回"] as CdAuditStatus[]).map(s => (
            <button key={s} onClick={() => setAuditStatus(s)}
              className={`text-[10px] px-2 py-0.5 rounded-full border transition-all ${auditStatus === s ? CD_AUDIT_CFG[s].text + " " + CD_AUDIT_CFG[s].border + " " + CD_AUDIT_CFG[s].bg + " font-semibold" : "border-[#E2E8F0] text-[#94A3B8] hover:border-[#CBD5E1]"}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Tab 卡片 */}
      <Card noPad>
        {/* Tab 头 */}
        <div className="flex items-center gap-0 border-b border-[#E2E8F0] px-5 pt-1">
          {TABS.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-all whitespace-nowrap ${tab === t.key ? "border-[#2563EB] text-[#2563EB]" : "border-transparent text-[#64748B] hover:text-[#334155]"}`}>
              {t.label}
            </button>
          ))}
        </div>

        <div className="p-5">

          {/* 基本信息 */}
          {tab === "basic" && (
            <div className="space-y-5">
              <div className="grid grid-cols-3 gap-x-8 gap-y-5">
                {[
                  { label: "客户编码",   value: <span className="font-mono text-xs bg-[#F1F5F9] px-2 py-0.5 rounded text-[#64748B]">KH-20230115</span> },
                  { label: "客户名称",   value: <span className="font-semibold text-[#0F172A]">蜂巢智能科技（深圳）有限公司</span> },
                  { label: "归属对象",   value: "自营" },
                  { label: "客户类型",   value: <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#EFF6FF] text-[#2563EB]">企业</span> },
                  { label: "所属行业",   value: "智能零售" },
                  { label: "客户规模",   value: "500人以上" },
                  { label: "所在地区",   value: "广东省 · 深圳市 · 南山区" },
                  { label: "详细位置",   value: "深圳市南山区科技园南区 A3 栋 801 室" },
                  { label: "经纬度",     value: <span className="font-mono text-xs text-[#64748B]">114.0579°E, 22.5431°N</span> },
                  { label: "客户等级",   value: <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-[#FFF7ED] text-[#C2410C]">S 级</span> },
                  { label: "客户状态",   value: <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-[#F0FDF4] text-[#16A34A]"><span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />启用</span> },
                  { label: "审核状态",   value: <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-[#FFFBEB] text-[#D97706]">待审核</span> },
                  { label: "创建时间",   value: "2023-01-15 10:30" },
                ].map(item => (
                  <div key={String(item.label)}>
                    <div className="text-xs text-[#94A3B8] mb-1">{item.label}</div>
                    <div className="text-sm text-[#334155]">{item.value}</div>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#F1F5F9] pt-5">
                <div className="text-xs text-[#94A3B8] mb-2">场地照片 <span className="text-[#CBD5E1]">— 点击放大</span></div>
                <div className="flex gap-2">
                  {["bg-[#DBEAFE]","bg-[#EDE9FE]","bg-[#DCFCE7]"].map((bg, i) => (
                    <button key={i} onClick={() => setPhotoOpen(true)}
                      className={`w-20 h-20 rounded-lg ${bg} flex items-center justify-center hover:ring-2 hover:ring-[#2563EB]/40 transition-all flex-shrink-0`}>
                      <svg viewBox="0 0 40 40" className="w-8 h-8 opacity-40"><rect x="4" y="10" width="32" height="22" rx="3" fill="#2563EB"/><circle cx="14" cy="18" r="3" fill="white"/><path d="M4 28l9-7 7 6 5-4 11 9" fill="none" stroke="white" strokeWidth="2" strokeLinejoin="round"/></svg>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 合同信息 */}
          {tab === "contract" && (
            <div className="space-y-5">
              <div className="grid grid-cols-3 gap-x-8 gap-y-5">
                {[
                  { label: "合同编号",  value: <span className="font-mono text-xs bg-[#F1F5F9] px-2 py-0.5 rounded text-[#64748B]">HT-20230115-001</span> },
                  { label: "合同有效期",value: "2023-02-01 至 2025-01-31" },
                  { label: "保证金金额",value: <span className="font-semibold text-[#0F172A]">¥ 50,000.00</span> },
                ].map(item => (
                  <div key={String(item.label)}>
                    <div className="text-xs text-[#94A3B8] mb-1">{item.label}</div>
                    <div className="text-sm text-[#334155]">{item.value}</div>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#F1F5F9] pt-5">
                <div className="text-xs text-[#94A3B8] mb-2">合同附件</div>
                <div className="space-y-2 max-w-md">
                  {[{name:"蜂巢智能科技运营合同.pdf",size:"2.4 MB"},{name:"保证金缴纳凭证.pdf",size:"0.8 MB"}].map(f => (
                    <div key={f.name} className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
                      <div className="w-7 h-7 rounded-lg bg-[#EFF6FF] flex items-center justify-center flex-shrink-0">
                        <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 text-[#2563EB]" fill="currentColor"><path d="M9.5 1H4a1 1 0 00-1 1v12a1 1 0 001 1h8a1 1 0 001-1V5.5L9.5 1z"/></svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-[#334155] truncate">{f.name}</div>
                        <div className="text-xs text-[#94A3B8]">{f.size}</div>
                      </div>
                      <button className="text-xs text-[#2563EB] hover:underline flex items-center gap-1 flex-shrink-0"><Icon d={Icons.download} size={11} />下载</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 联系人信息 */}
          {tab === "contacts" && (
            <div className="space-y-3">
              {[
                { role: "主要联系人", name: "张伟",     gender: "男", phone: "138-8888-0001", wechat: "zhangwei_tech",  email: "zhangwei@beehive.tech",   identity: "运营总监" },
                { role: "设备联系人", name: "刘鹏",     gender: "男", phone: "177-1234-5678", wechat: "liupeng_dev",    email: "liupeng@beehive.tech",    identity: "技术工程师" },
                { role: "销售负责人", name: "王芳（内部）", gender: "女", phone: "186-5678-9012", wechat: "wangfang_sales", email: "wangfang@retailcloud.com", identity: "客户经理" },
              ].map((c, i) => (
                <div key={i} className="rounded-xl border border-[#E2E8F0] overflow-hidden">
                  <div className={`px-4 py-2 text-xs font-semibold ${i === 0 ? "bg-[#EFF6FF] text-[#2563EB]" : i === 1 ? "bg-[#F5F3FF] text-[#7C3AED]" : "bg-[#F0FDF4] text-[#16A34A]"}`}>{c.role}</div>
                  <div className="px-4 py-3 grid grid-cols-3 gap-x-8 gap-y-3">
                    {[
                      { label: "姓名",   value: <span className="font-semibold text-[#0F172A]">{c.name}</span> },
                      { label: "性别",   value: c.gender },
                      { label: "身份",   value: c.identity },
                      { label: "联系电话",value: <span className="font-medium text-[#0F172A]">{c.phone}</span> },
                      { label: "微信号", value: c.wechat },
                      { label: "邮箱",   value: <span className="text-[#2563EB]">{c.email}</span> },
                    ].map(f => (
                      <div key={f.label}>
                        <div className="text-xs text-[#94A3B8] mb-0.5">{f.label}</div>
                        <div className="text-sm text-[#334155]">{f.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 小程序账号 */}
          {tab === "accounts" && (
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                  {["登录账号（手机号）","登录密码","姓名","角色","状态","创建时间"].map(h => (
                    <th key={h} className="py-2.5 px-3 text-left text-xs font-medium text-[#64748B]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { phone: "138-8888-0001", pwd: "Fc@123456", name: "张伟", role: "管理员", status: "启用", created: "2023-01-16" },
                  { phone: "155-0000-9988", pwd: "Zr@888001", name: "周红", role: "财务",   status: "启用", created: "2023-01-16" },
                  { phone: "177-1234-5678", pwd: "Lp@000178", name: "刘鹏", role: "运营",   status: "禁用", created: "2023-06-01" },
                ].map((a, i) => (
                  <tr key={i} className="border-b border-[#F1F5F9] hover:bg-[#F8FAFC]">
                    <td className="py-2.5 px-3 font-mono text-sm font-medium text-[#0F172A]">{a.phone}</td>
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[#94A3B8] tracking-widest text-sm">
                          {visiblePwds.has(i) ? a.pwd : "••••••••"}
                        </span>
                        <button onClick={() => togglePwd(i)}
                          className="text-[#94A3B8] hover:text-[#2563EB] transition-colors flex-shrink-0">
                          <Icon d={visiblePwds.has(i) ? Icons.eyeOff : Icons.eye} size={14} />
                        </button>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-[#334155]">{a.name}</td>
                    <td className="py-2.5 px-3 text-[#334155]">{a.role}</td>
                    <td className="py-2.5 px-3">
                      {a.status === "启用"
                        ? <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-[#F0FDF4] text-[#16A34A]"><span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />启用</span>
                        : <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-[#F3F4F6] text-[#6B7280]"><span className="w-1.5 h-1.5 rounded-full bg-[#6B7280]" />禁用</span>}
                    </td>
                    <td className="py-2.5 px-3 text-xs text-[#94A3B8]">{a.created}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* 关联点位 */}
          {tab === "locations" && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm font-medium text-[#0F172A]">该客户名下全部点位资产</span>
                <span className="px-2 py-0.5 rounded-full bg-[#F1F5F9] text-xs text-[#64748B] font-medium">共 {DETAIL_LOCS_DATA.length} 个</span>
              </div>
              <div className="rounded-lg border border-[#E2E8F0] overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                      {["点位编码","点位名称","详细位置","点位等级","点位状态","操作"].map(h => (
                        <th key={h} className="py-2.5 px-4 text-left text-xs font-medium text-[#64748B]">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {DETAIL_LOCS_DATA.map((r, i) => (
                      <tr key={r.code} className={`hover:bg-[#F8FAFC] transition-colors ${i < DETAIL_LOCS_DATA.length - 1 ? "border-b border-[#F1F5F9]" : ""}`}>
                        <td className="py-3 px-4 font-mono text-xs text-[#64748B]">{r.code}</td>
                        <td className="py-3 px-4 font-medium text-[#0F172A]">{r.name}</td>
                        <td className="py-3 px-4 text-[#64748B] text-xs max-w-[200px] truncate">{r.addr}</td>
                        <td className="py-3 px-4"><span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${LEVEL_COLOR[r.level] ?? "bg-[#F1F5F9] text-[#64748B]"}`}>{r.level}</span></td>
                        <td className="py-3 px-4">
                          {r.status === "启用"
                            ? <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-[#F0FDF4] text-[#16A34A]"><span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />启用</span>
                            : <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-[#F3F4F6] text-[#6B7280]"><span className="w-1.5 h-1.5 rounded-full bg-[#6B7280]" />禁用</span>}
                        </td>
                        <td className="py-3 px-4">
                          <button className="text-xs px-2.5 py-1 rounded-md border border-[#E2E8F0] text-[#2563EB] hover:bg-[#EFF6FF] hover:border-[#BFDBFE] transition-colors">查看详情</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </Card>

      {/* 场地照片浮层 */}
      {photoOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center" onClick={() => setPhotoOpen(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full mx-4 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold text-[#0F172A]">场地照片预览</span>
              <button onClick={() => setPhotoOpen(false)} className="w-7 h-7 rounded-full bg-[#F1F5F9] flex items-center justify-center hover:bg-[#E2E8F0]">
                <Icon d={Icons.x} size={14} className="text-[#64748B]" />
              </button>
            </div>
            <div className="w-full aspect-video rounded-xl bg-[#EFF6FF] flex items-center justify-center">
              <svg viewBox="0 0 80 60" className="w-24 opacity-30"><rect x="2" y="6" width="76" height="48" rx="4" fill="#2563EB"/><circle cx="22" cy="22" r="8" fill="white"/><path d="M2 42l18-14 14 12 10-8 24 16" fill="none" stroke="white" strokeWidth="3" strokeLinejoin="round"/></svg>
            </div>
            <p className="text-xs text-[#94A3B8] mt-3 text-center">蜂巢·科技园北楼1F-A区场地照片</p>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Customer Edit ────────────────────────────────────────────────────────────
const CustomerEdit = ({ onBack }: { onBack: () => void }) => {
  const [accounts, setAccounts] = useState([
    { phone: "138-8888-0001", pwd: "Fc@123456" },
    { phone: "155-0000-9988", pwd: "Zr@888001" },
  ]);
  const [showAddAccount, setShowAddAccount] = useState(false);
  const [newAcc, setNewAcc] = useState({ phone: "", pwd: "" });
  const [showNewPwd, setShowNewPwd] = useState(false);
  const [visiblePwds, setVisiblePwds] = useState<Set<number>>(new Set());
  const togglePwd = (i: number) => setVisiblePwds(s => { const n = new Set(s); n.has(i) ? n.delete(i) : n.add(i); return n; });

  const Req = () => <span className="text-[#DC2626]">*</span>;
  const Lbl = ({ children, required }: { children: React.ReactNode; required?: boolean }) => (
    <label className="block text-sm font-medium text-[#374151] mb-1.5">{children}{required && <> <Req /></>}</label>
  );

  return (
    <div>
      <PageHeader
        title="编辑客户"
        breadcrumbs={["首页", "客户管理", "编辑客户"]}
        actions={<><Btn variant="secondary" onClick={onBack}>取消</Btn><Btn variant="primary">保存</Btn></>}
      />
      <div className="space-y-4 max-w-4xl">

        {/* 一、基本信息 */}
        <Card>
          <SectionTitle title="基本信息" />
          <div className="grid grid-cols-2 gap-x-8 gap-y-5">
            <div className="col-span-2">
              <Lbl required>客户名称</Lbl>
              <Input placeholder="请输入客户全称" defaultValue="蜂巢智能科技（深圳）有限公司" className="w-full" />
            </div>
            <div>
              <Lbl required>客户类型</Lbl>
              <Select options={[{label:"企业",value:"enterprise"},{label:"政府",value:"gov"},{label:"事业单位",value:"institution"},{label:"其他",value:"other"}]} value="enterprise" />
            </div>
            <div>
              <Lbl required>客户等级</Lbl>
              <Select options={["S+","S","A","B","C","D","N"].map(v=>({label:v,value:v}))} value="N" />
            </div>
            <div>
              <Lbl required>所属行业</Lbl>
              <Select options={[{label:"智能零售",value:"retail"},{label:"科技互联网",value:"tech"},{label:"房地产物业",value:"property"},{label:"教育",value:"edu"},{label:"医疗",value:"medical"},{label:"其他",value:"other"}]} value="retail" />
            </div>
            <div>
              <Lbl required>客户规模</Lbl>
              <Select options={[{label:"50人以下",value:"s"},{label:"50~200人",value:"m"},{label:"200~500人",value:"l"},{label:"500人以上",value:"xl"}]} value="xl" />
            </div>
            <div>
              <Lbl required>归属对象</Lbl>
              <Select options={[{label:"自营",value:"own"},{label:"渠道商",value:"channel"},{label:"加盟商",value:"franchise"}]} value="own" />
            </div>
            <div className="col-span-2">
              <Lbl required>客户地区</Lbl>
              <div className="flex items-center gap-2">
                <Select options={[{label:"广东省",value:"gd"},{label:"上海市",value:"sh"},{label:"北京市",value:"bj"},{label:"四川省",value:"sc"}]} value="gd" className="w-36" />
                <Select options={[{label:"深圳市",value:"sz"},{label:"广州市",value:"gz"},{label:"佛山市",value:"fs"}]} value="sz" className="w-36" />
                <Select options={[{label:"南山区",value:"ns"},{label:"福田区",value:"ft"},{label:"龙岗区",value:"lg"},{label:"宝安区",value:"ba"}]} value="ns" className="w-36" />
              </div>
            </div>
            <div className="col-span-2">
              <Lbl required>详细位置</Lbl>
              <Input placeholder="请输入详细地址" defaultValue="深圳市南山区科技园南区 A3 栋 801 室" className="w-full" />
            </div>
            <div className="col-span-2">
              <Lbl required>经纬度</Lbl>
              <div className="flex items-center gap-3 px-4 py-3 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC]">
                <Icon d={Icons.location} size={15} className="text-[#2563EB] flex-shrink-0" />
                <span className="font-mono text-sm text-[#334155] flex-1">114.0579°E, 22.5431°N</span>
                <Btn variant="secondary" size="sm">地图重新选点</Btn>
              </div>
            </div>
            <div className="col-span-2">
              <Lbl required>场地照片</Lbl>
              <div className="flex gap-3 flex-wrap">
                {["bg-[#DBEAFE]","bg-[#EDE9FE]","bg-[#DCFCE7]"].map((bg, i) => (
                  <div key={i} className={`w-20 h-20 rounded-lg ${bg} flex items-center justify-center relative group cursor-pointer`}>
                    <svg viewBox="0 0 40 40" className="w-8 h-8 opacity-40"><rect x="4" y="10" width="32" height="22" rx="3" fill="#2563EB"/><circle cx="14" cy="18" r="3" fill="white"/><path d="M4 28l9-7 7 6 5-4 11 9" fill="none" stroke="white" strokeWidth="2" strokeLinejoin="round"/></svg>
                    <div className="absolute inset-0 bg-black/30 rounded-lg opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <Icon d={Icons.trash} size={14} className="text-white" />
                    </div>
                  </div>
                ))}
                <label className="w-20 h-20 rounded-lg border-2 border-dashed border-[#CBD5E1] flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-[#2563EB] hover:bg-[#EFF6FF] transition-colors">
                  <Icon d={Icons.plus} size={18} className="text-[#94A3B8]" />
                  <span className="text-[10px] text-[#94A3B8]">上传照片</span>
                </label>
              </div>
            </div>
          </div>
        </Card>

        {/* 二、合同信息 */}
        <Card>
          <SectionTitle title="合同信息" />
          <div className="grid grid-cols-2 gap-x-8 gap-y-5">
            <div className="col-span-2">
              <Lbl required>合同附件</Lbl>
              <div className="flex items-center gap-3">
                <div className="flex-1 px-3 py-2.5 rounded-lg border border-[#E2E8F0] text-sm text-[#64748B] bg-[#F8FAFC] flex items-center gap-2">
                  <Icon d={Icons.layers} size={13} className="text-[#94A3B8]" />
                  <span className="flex-1 truncate">蜂巢智能科技运营合同.pdf</span>
                  <span className="text-xs text-[#94A3B8]">2.4 MB</span>
                </div>
                <Btn variant="secondary" size="sm">重新上传</Btn>
              </div>
            </div>
            <div>
              <Lbl required>合同有效期（开始）</Lbl>
              <Input type="date" defaultValue="2023-02-01" />
            </div>
            <div>
              <Lbl required>合同有效期（结束）</Lbl>
              <Input type="date" defaultValue="2025-01-31" />
            </div>
            <div>
              <Lbl>保证金金额</Lbl>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#64748B]">¥</span>
                <Input placeholder="0.00" defaultValue="50000" className="pl-7" />
              </div>
            </div>
          </div>
        </Card>

        {/* 三、联系人信息 */}
        <Card>
          <SectionTitle title="联系人信息" />
          <div className="grid grid-cols-2 gap-x-8 gap-y-5">
            <div>
              <Lbl required>联系人姓名</Lbl>
              <Input placeholder="请输入" defaultValue="张伟" />
            </div>
            <div>
              <Lbl required>联系电话</Lbl>
              <Input placeholder="请输入手机号" defaultValue="138-8888-0001" />
            </div>
            <div>
              <Lbl required>联系人性别</Lbl>
              <Select options={[{label:"男",value:"m"},{label:"女",value:"f"}]} value="m" />
            </div>
            <div>
              <Lbl required>联系人身份</Lbl>
              <Input placeholder="如：采购总监" defaultValue="运营总监" />
            </div>
            <div>
              <Lbl>联系人微信号</Lbl>
              <Input placeholder="选填" defaultValue="zhangwei_tech" />
            </div>
            <div>
              <Lbl>联系人邮箱</Lbl>
              <Input placeholder="选填" defaultValue="zhangwei@beehive.tech" />
            </div>
            <div className="col-span-2 border-t border-[#F1F5F9] pt-4">
              <p className="text-xs text-[#94A3B8] mb-4">设备联系人</p>
            </div>
            <div>
              <Lbl required>设备联系人姓名</Lbl>
              <Input placeholder="请输入" defaultValue="刘鹏" />
            </div>
            <div>
              <Lbl required>设备联系人电话</Lbl>
              <Input placeholder="请输入手机号" defaultValue="177-1234-5678" />
            </div>
            <div className="col-span-2 border-t border-[#F1F5F9] pt-4">
              <p className="text-xs text-[#94A3B8] mb-4">销售负责人</p>
            </div>
            <div>
              <Lbl required>销售负责人姓名</Lbl>
              <Input placeholder="请输入" defaultValue="王芳" />
            </div>
            <div>
              <Lbl required>销售负责人电话</Lbl>
              <Input placeholder="请输入手机号" defaultValue="186-5678-9012" />
            </div>
          </div>
        </Card>

        {/* 四、客户小程序登录账号 */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <SectionTitle title="客户小程序登录账号" />
            <Btn variant="secondary" size="sm" icon="plus" onClick={() => { setShowAddAccount(true); setNewAcc({ phone: "", pwd: "" }); }}>新增</Btn>
          </div>

          {/* existing accounts */}
          {accounts.length > 0 && (
            <table className="w-full text-sm mb-3">
              <thead>
                <tr className="border-b border-[#F1F5F9] bg-[#F8FAFC]">
                  {["登录账号","登录密码","操作"].map(h => (
                    <th key={h} className="py-2 px-3 text-left text-xs font-medium text-[#64748B]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {accounts.map((a, i) => (
                  <tr key={i} className="border-b border-[#F1F5F9] hover:bg-[#F8FAFC]">
                    <td className="py-2.5 px-3 font-mono text-sm text-[#0F172A]">{a.phone}</td>
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[#94A3B8] tracking-widest text-sm">
                          {visiblePwds.has(i) ? a.pwd : "••••••••"}
                        </span>
                        <button onClick={() => togglePwd(i)} className="text-[#94A3B8] hover:text-[#2563EB] transition-colors">
                          <Icon d={visiblePwds.has(i) ? Icons.eyeOff : Icons.eye} size={14} />
                        </button>
                      </div>
                    </td>
                    <td className="py-2.5 px-3">
                      <button className="text-xs text-[#DC2626] hover:underline" onClick={() => setAccounts(accs => accs.filter((_, j) => j !== i))}>删除</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* add new account inline form */}
          {showAddAccount && (
            <div className="p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] space-y-4">
              <p className="text-sm font-medium text-[#374151]">新增登录账号</p>
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                <div>
                  <label className="block text-xs text-[#64748B] mb-1">登录账号 <span className="text-[#DC2626]">*</span></label>
                  <Input placeholder="输入手机号作为账号" value={newAcc.phone} onChange={(v: string) => setNewAcc(a => ({...a, phone: v}))} />
                </div>
                <div>
                  <label className="block text-xs text-[#64748B] mb-1">登录密码 <span className="text-[#DC2626]">*</span></label>
                  <div className="relative">
                    <Input placeholder="请设置密码" type={showNewPwd ? "text" : "password"} value={newAcc.pwd} onChange={(v: string) => setNewAcc(a => ({...a, pwd: v}))} className="pr-9" />
                    <button type="button" onClick={() => setShowNewPwd(v => !v)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#2563EB] transition-colors">
                      <Icon d={showNewPwd ? Icons.eyeOff : Icons.eye} size={15} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 justify-end">
                <Btn variant="secondary" size="sm" onClick={() => setShowAddAccount(false)}>取消</Btn>
                <Btn variant="primary" size="sm" onClick={() => {
                  if (newAcc.phone && newAcc.pwd) {
                    setAccounts(a => [...a, newAcc]);
                    setNewAcc({ phone: "", pwd: "" });
                    setShowAddAccount(false);
                  }
                }}>确认添加</Btn>
              </div>
            </div>
          )}
        </Card>

        <div className="flex items-center justify-end gap-3 py-2">
          <Btn variant="secondary" onClick={onBack}>取消</Btn>
          <Btn variant="primary">保存修改</Btn>
        </div>
      </div>
    </div>
  );
};

// ─── Location List ────────────────────────────────────────────────────────────
const LEVEL_COLOR_LOC: Record<string, string> = {
  "S+": "bg-[#FFF1F2] text-[#E11D48]", S: "bg-[#FFF7ED] text-[#C2410C]",
  A: "bg-[#EFF6FF] text-[#2563EB]", B: "bg-[#F5F3FF] text-[#7C3AED]",
  C: "bg-[#F5F7FA] text-[#64748B]", D: "bg-[#F5F7FA] text-[#94A3B8]",
  N: "bg-[#F1F5F9] text-[#475569]",
};
const LOC_AUDIT_STYLE: Record<string, string> = {
  "审核通过": "bg-[#F0FDF4] text-[#16A34A]",
  "审核驳回": "bg-[#FEF2F2] text-[#DC2626]",
  "待审核":   "bg-[#FFFBEB] text-[#D97706]",
};

// ─── Location Edit ────────────────────────────────────────────────────────────
const LE_CUSTOMERS = ["蜂巢智能科技（深圳）有限公司","桔仔自动贩卖科技","格林购物科技有限公司","云聚零售科技","万象智贩","盒里科技"];
const LE_WAREHOUSES = ["深圳中心仓","广州中心仓","上海中心仓","北京中心仓","成都西南仓","武汉华中仓"];
const LE_PROVINCES = [["广东省","gd"],["上海市","sh"],["北京市","bj"],["四川省","sc"],["浙江省","zj"]];
const LE_CITIES: Record<string,string[][]> = {
  gd:[["深圳市","sz"],["广州市","gz"],["佛山市","fs"]],
  sh:[["上海市","sh"]],
  bj:[["北京市","bj"]],
  sc:[["成都市","cd"],["绵阳市","my"]],
  zj:[["杭州市","hz"],["宁波市","nb"]],
};
const LE_DISTRICTS: Record<string,string[][]> = {
  sz:[["南山区","ns"],["福田区","ft"],["龙华区","lh"],["宝安区","ba"],["罗湖区","lh2"]],
  gz:[["天河区","th"],["越秀区","yx"],["海珠区","hz"]],
  sh:[["浦东新区","pd"],["静安区","ja"],["黄浦区","hp"]],
  bj:[["朝阳区","cy"],["海淀区","hd"],["东城区","dc"]],
  cd:[["高新区","gx"],["武侯区","wh"],["锦江区","jj"]],
  hz:[["余杭区","yh"],["西湖区","xh"]],
  fs:[["禅城区","cc"],["南海区","nh"]],
};
const LE_SCENES1 = ["运动","写字楼","工厂","学校","医院","其他"];
const LE_INSTALL = ["前台","茶水间","休息区","办公区","大堂","其他"];

const RadioGroup = ({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) => (
  <div className="flex gap-3">
    {options.map(opt => (
      <button key={opt} type="button" onClick={() => onChange(opt)}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
          value === opt
            ? "border-[#2563EB] bg-[#EFF6FF] text-[#2563EB]"
            : "border-[#E2E8F0] bg-white text-[#6B7280] hover:border-[#93C5FD]"}`}>
        <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${value === opt ? "border-[#2563EB]" : "border-[#D1D5DB]"}`}>
          {value === opt && <span className="w-2 h-2 rounded-full bg-[#2563EB]" />}
        </span>
        {opt}
      </button>
    ))}
  </div>
);

const SearchableSelect = ({ placeholder, options, value, onChange, highlight }: {
  placeholder: string; options: string[]; value: string; onChange: (v: string) => void; highlight?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const filtered = options.filter(o => o.includes(q));
  return (
    <div className="relative">
      <div onClick={() => setOpen(o => !o)}
        className={`flex items-center h-9 border rounded-lg px-3 cursor-pointer transition-colors ${
          highlight ? "border-[#2563EB] bg-[#EFF6FF]" : "border-[#E2E8F0] bg-white"} ${open ? "border-[#2563EB]" : "hover:border-[#CBD5E1]"}`}>
        <span className={`flex-1 text-sm truncate ${value ? "text-[#0F172A]" : "text-[#9CA3AF]"}`}>{value || placeholder}</span>
        <Icon d={Icons.chevronDown} size={14} className="text-[#94A3B8] flex-shrink-0" />
      </div>
      {open && (
        <div className="absolute z-20 top-10 left-0 right-0 bg-white border border-[#E2E8F0] rounded-xl shadow-lg overflow-hidden">
          <div className="p-2 border-b border-[#F1F5F9]">
            <input autoFocus value={q} onChange={e => setQ(e.target.value)} placeholder="输入关键词搜索…"
              className="w-full h-8 border border-[#E2E8F0] rounded-md px-2.5 text-sm focus:outline-none focus:border-[#2563EB]" />
          </div>
          <div className="max-h-44 overflow-y-auto">
            {filtered.length === 0
              ? <div className="px-3 py-3 text-xs text-[#9CA3AF] text-center">无匹配结果</div>
              : filtered.map(o => (
                <div key={o} onClick={() => { onChange(o); setQ(""); setOpen(false); }}
                  className={`px-3 py-2 text-sm cursor-pointer hover:bg-[#F8FAFC] ${value === o ? "text-[#2563EB] font-medium" : "text-[#374151]"}`}>
                  {o}
                </div>
              ))
            }
          </div>
        </div>
      )}
    </div>
  );
};

const LocationEdit = ({ onBack }: { onBack: () => void }) => {
  const [customer, setCustomer] = useState("蜂巢智能科技（深圳）有限公司");
  const [warehouse, setWarehouse] = useState("深圳中心仓");
  const [locName, setLocName] = useState("深圳南山科技园 A3 栋大堂");
  const [grade, setGrade] = useState("A");
  const [province, setProvince] = useState("gd");
  const [city, setCity] = useState("sz");
  const [district, setDistrict] = useState("ns");
  const [address, setAddress] = useState("深圳市南山区科技园南区 A3 栋一楼大堂入口处");
  const [lng, setLng] = useState("114.052628");
  const [lat, setLat] = useState("22.540155");
  const [coverage, setCoverage] = useState("800");
  const [scene1, setScene1] = useState("写字楼");
  const [scene2, setScene2] = useState("");
  const [installPos, setInstallPos] = useState("大堂");
  const [photos, setPhotos] = useState<string[]>(["blue","purple","green"]);
  const [compSmart, setCompSmart] = useState("无");
  const [compTrad, setCompTrad] = useState("无");
  const [nearShop, setNearShop] = useState("无");
  const [remark, setRemark] = useState("");
  const [contractFile, setContractFile] = useState<string | null>(null);
  const [contactName, setContactName] = useState("张建国");
  const [contactPhone, setContactPhone] = useState("13800138000");
  const [contactGender, setContactGender] = useState("男");
  const [contactWx, setContactWx] = useState("zhangjg_sz");
  const [contactEmail, setContactEmail] = useState("zhang@techinc.com");
  const [contactRole, setContactRole] = useState("行政经理");
  const [autoRestock, setAutoRestock] = useState(true);
  const [unifiedCfg, setUnifiedCfg] = useState(false);
  const [unifiedOrder, setUnifiedOrder] = useState("");
  const [unifiedPush, setUnifiedPush] = useState("");
  const [unifiedThreshold, setUnifiedThreshold] = useState("");
  const [restockDays, setRestockDays] = useState<Record<string, { enabled: boolean; orderTime: string; pushTime: string; threshold: string }>>({
    周一:{enabled:true,orderTime:"09:00",pushTime:"10:00",threshold:"20"}, 周二:{enabled:true,orderTime:"09:00",pushTime:"10:00",threshold:"20"}, 周三:{enabled:false,orderTime:"09:00",pushTime:"10:00",threshold:""},
    周四:{enabled:false,orderTime:"09:00",pushTime:"10:00",threshold:""}, 周五:{enabled:false,orderTime:"09:00",pushTime:"10:00",threshold:""}, 周六:{enabled:false,orderTime:"09:00",pushTime:"10:00",threshold:""}, 周日:{enabled:false,orderTime:"09:00",pushTime:"10:00",threshold:""},
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const Lbl = ({ children, required, hint }: { children: React.ReactNode; required?: boolean; hint?: string }) => (
    <div className="mb-1.5">
      <label className="text-sm font-medium text-[#374151]">
        {required && <span className="text-[#DC2626] mr-0.5">*</span>}
        {children}
      </label>
      {hint && <p className="text-xs text-[#9CA3AF] mt-0.5">{hint}</p>}
    </div>
  );

  const fieldCls = "h-9 w-full border border-[#E2E8F0] rounded-lg px-3 text-sm text-[#0F172A] placeholder:text-[#9CA3AF] bg-white focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/20 transition-colors";
  const errCls = "text-xs text-[#DC2626] mt-1";

  const handleSubmit = () => {
    const e: Record<string, string> = {};
    if (!customer) e.customer = "请选择归属客户";
    if (!warehouse) e.warehouse = "请选择关联供货仓库";
    if (!locName.trim()) e.locName = "请输入点位名称";
    if (!province || !city || !district) e.region = "请完成省市区选择";
    if (!address.trim()) e.address = "请输入详细地址";
    if (!lng || !lat) e.latlng = "请填写经纬度";
    if (photos.length === 0) e.photos = "请上传至少一张场地照片";
    if (!contactName.trim()) e.contactName = "请输入联系人姓名";
    if (!contactPhone.trim()) e.contactPhone = "请输入联系电话";
    else if (!/^1\d{10}$/.test(contactPhone.replace(/[-\s]/g,""))) e.contactPhone = "请输入有效的11位手机号";
    if (autoRestock && Object.values(restockDays).some(d => d.enabled && !d.threshold)) e.threshold = "已启用的天阈值不能为空";
    setErrors(e);
  };

  const DAYS = ["周一","周二","周三","周四","周五","周六","周日"];

  return (
    <div>
      <PageHeader
        title="编辑点位"
        breadcrumbs={["首页", "点位管理", "编辑点位"]}
        actions={<><Btn variant="secondary" onClick={onBack}>取消</Btn><Btn variant="primary" onClick={handleSubmit}>提交</Btn></>}
      />
      <div className="space-y-4 max-w-4xl pb-12">

        {/* ── 基本信息 ── */}
        <Card>
          <SectionTitle title="基本信息" />
          <div className="grid grid-cols-2 gap-x-8 gap-y-5">

            {/* 1. 归属客户 */}
            <div>
              <Lbl required>归属客户</Lbl>
              <SearchableSelect placeholder="请选择/搜索归属客户" options={LE_CUSTOMERS} value={customer} onChange={setCustomer} />
              {errors.customer && <p className={errCls}>{errors.customer}</p>}
            </div>

            {/* 2. 关联供货仓库 */}
            <div>
              <Lbl required hint="重要字段：影响补货发货仓库">关联供货仓库</Lbl>
              <SearchableSelect placeholder="请选择/搜索关联供货仓库" options={LE_WAREHOUSES} value={warehouse} onChange={setWarehouse} highlight />
              {errors.warehouse && <p className={errCls}>{errors.warehouse}</p>}
            </div>

            {/* 3. 点位名称 */}
            <div className="col-span-2">
              <div className="flex items-center justify-between mb-1.5">
                <Lbl required>点位名称</Lbl>
                <span className="text-xs text-[#9CA3AF]">{locName.length}/50</span>
              </div>
              <input maxLength={50} value={locName} onChange={e => setLocName(e.target.value)}
                placeholder="请输入点位名称" className={fieldCls} />
              {errors.locName && <p className={errCls}>{errors.locName}</p>}
            </div>

            {/* 4. 点位等级 */}
            <div>
              <Lbl hint="新增点位默认等级为 N">点位等级</Lbl>
              <select value={grade} onChange={e => setGrade(e.target.value)} className={fieldCls}>
                {["S+","S","A","B","C","D","N"].map(v => <option key={v} value={v}>{v} 级</option>)}
              </select>
            </div>

            {/* 5. 点位地区 */}
            <div>
              <Lbl required>点位地区</Lbl>
              <div className="flex gap-2">
                <select value={province} onChange={e => { setProvince(e.target.value); setCity(""); setDistrict(""); }} className={`${fieldCls} flex-1`}>
                  <option value="">请选择省</option>
                  {LE_PROVINCES.map(([l,v]) => <option key={v} value={v}>{l}</option>)}
                </select>
                <select value={city} onChange={e => { setCity(e.target.value); setDistrict(""); }} disabled={!province} className={`${fieldCls} flex-1 disabled:opacity-40 disabled:cursor-not-allowed`}>
                  <option value="">请选择市</option>
                  {(LE_CITIES[province] || []).map(([l,v]) => <option key={v} value={v}>{l}</option>)}
                </select>
                <select value={district} onChange={e => setDistrict(e.target.value)} disabled={!city} className={`${fieldCls} flex-1 disabled:opacity-40 disabled:cursor-not-allowed`}>
                  <option value="">请选择区</option>
                  {(LE_DISTRICTS[city] || []).map(([l,v]) => <option key={v} value={v}>{l}</option>)}
                </select>
              </div>
              {errors.region && <p className={errCls}>{errors.region}</p>}
            </div>

            {/* 6. 详细地址 */}
            <div className="col-span-2">
              <div className="flex items-center justify-between mb-1.5">
                <Lbl required>详细地址</Lbl>
                <span className="text-xs text-[#9CA3AF]">{address.length}/200</span>
              </div>
              <input maxLength={200} value={address} onChange={e => setAddress(e.target.value)}
                placeholder="请输入详细地址" className={fieldCls} />
              {errors.address && <p className={errCls}>{errors.address}</p>}
            </div>

            {/* 7. 经纬度 · 地图选点 */}
            <div className="col-span-2">
              <Lbl required hint="点击地图上的位置选择坐标，自动回填经纬度并反填地址">经纬度</Lbl>
              <div className="relative h-44 rounded-lg border border-[#E2E8F0] overflow-hidden bg-[#E8EEF0] cursor-crosshair group"
                onClick={() => { setLng("114.052628"); setLat("22.540155"); setAddress("深圳市南山区科技园南区深南大道 9668 号 A3 栋 1F"); }}>
                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 800 176">
                  <rect width="800" height="176" fill="#E8EEF0" />
                  <rect x="60" y="14" width="150" height="56" rx="4" fill="#DCE9DC" />
                  <rect x="590" y="88" width="170" height="66" rx="4" fill="#DCE9DC" />
                  <rect x="350" y="110" width="120" height="46" rx="4" fill="#E3E8E4" />
                  <path d="M0 44 H800 M0 105 H800 M120 0 V176 M330 0 V176 M560 0 V176 M720 0 V176" stroke="#FFFFFF" strokeWidth="9" fill="none" />
                  <path d="M0 140 Q 200 120 420 145 T 800 130" stroke="#C7DCE8" strokeWidth="14" fill="none" opacity="0.8" />
                </svg>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full pointer-events-none">
                  <Icon d={Icons.location} size={30} className="text-[#2563EB] drop-shadow-md" />
                </div>
                <div className="absolute bottom-2 left-2 flex items-center gap-1.5 bg-white/90 rounded-md px-2.5 py-1 shadow-sm pointer-events-none">
                  <Icon d={Icons.location} size={12} className="text-[#2563EB]" />
                  <span className="font-mono text-xs text-[#64748B]">{lng || "—"}, {lat || "—"}</span>
                </div>
                <div className="absolute top-2 right-2 flex items-center gap-1 text-xs text-[#2563EB] bg-white/95 rounded-md px-2.5 py-1 shadow-sm group-hover:ring-2 ring-[#2563EB]/30 transition-all pointer-events-none">
                  <Icon d={Icons.location} size={12} />点击地图选择位置
                </div>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-2 flex-1 border border-[#E2E8F0] rounded-lg px-3 h-9 bg-white focus-within:border-[#2563EB] transition-colors">
                  <span className="text-xs text-[#94A3B8] whitespace-nowrap">经度</span>
                  <input value={lng} onChange={e => setLng(e.target.value)} placeholder="如：114.0579"
                    className="flex-1 text-sm font-mono text-[#334155] focus:outline-none bg-transparent" />
                </div>
                <div className="flex items-center gap-2 flex-1 border border-[#E2E8F0] rounded-lg px-3 h-9 bg-white focus-within:border-[#2563EB] transition-colors">
                  <span className="text-xs text-[#94A3B8] whitespace-nowrap">纬度</span>
                  <input value={lat} onChange={e => setLat(e.target.value)} placeholder="如：22.5431"
                    className="flex-1 text-sm font-mono text-[#334155] focus:outline-none bg-transparent" />
                </div>
              </div>
              {errors.latlng && <p className={errCls}>{errors.latlng}</p>}
            </div>

            {/* 8. 覆盖人数 */}
            <div>
              <Lbl hint="周边覆盖人数，供点位分层参考">覆盖人数</Lbl>
              <div className="flex items-center gap-2">
                <input type="number" min={1} value={coverage} onChange={e => setCoverage(e.target.value)}
                  placeholder="请输入覆盖人数" className={`${fieldCls} w-40`} />
                <span className="text-sm text-[#64748B]">人</span>
              </div>
            </div>

            {/* 9. 一级场景 */}
            <div>
              <Lbl hint="一期按枚举固定选择，不支持自定义">一级场景</Lbl>
              <select value={scene1} onChange={e => setScene1(e.target.value)} className={fieldCls}>
                <option value="">请选择一级场景</option>
                {LE_SCENES1.map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>

            {/* 10. 二级场景 */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <Lbl hint={`${scene1 || "一级场景"}下的细分说明`}>二级场景</Lbl>
                <span className="text-xs text-[#9CA3AF]">{scene2.length}/50</span>
              </div>
              <input maxLength={50} value={scene2} onChange={e => setScene2(e.target.value)}
                placeholder="如：A栋1层健身房旁" className={fieldCls} />
            </div>

            {/* 11. 设备安装位置 */}
            <div>
              <Lbl>设备安装位置</Lbl>
              <select value={installPos} onChange={e => setInstallPos(e.target.value)} className={fieldCls}>
                <option value="">请选择设备安装位置</option>
                {LE_INSTALL.map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>

            {/* 12. 场地照片 */}
            <div className="col-span-2">
              <Lbl required>场地照片</Lbl>
              <div className="flex gap-3 flex-wrap items-start">
                {photos.map((c, i) => {
                  const bg = c === "blue" ? "bg-[#DBEAFE]" : c === "purple" ? "bg-[#EDE9FE]" : "bg-[#DCFCE7]";
                  return (
                    <div key={i} className={`w-20 h-20 rounded-lg ${bg} relative group cursor-pointer flex items-center justify-center`}>
                      <svg viewBox="0 0 40 40" className="w-8 h-8 opacity-40"><rect x="4" y="10" width="32" height="22" rx="3" fill="#2563EB"/><circle cx="14" cy="18" r="3" fill="white"/><path d="M4 28l9-7 7 6 5-4 11 9" fill="none" stroke="white" strokeWidth="2" strokeLinejoin="round"/></svg>
                      <button onClick={() => setPhotos(p => p.filter((_,j) => j !== i))}
                        className="absolute top-1 right-1 w-5 h-5 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Icon d={Icons.x} size={10} className="text-white" />
                      </button>
                    </div>
                  );
                })}
                {photos.length < 5 && (
                  <label className="w-20 h-20 rounded-lg border-2 border-dashed border-[#CBD5E1] flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-[#2563EB] hover:bg-[#EFF6FF] transition-colors">
                    <Icon d={Icons.plus} size={18} className="text-[#94A3B8]" />
                    <span className="text-[10px] text-[#94A3B8]">上传照片</span>
                    <input type="file" accept=".jpg,.jpeg,.png" multiple className="hidden" />
                  </label>
                )}
                <div className="text-xs text-[#9CA3AF] self-end pb-1 leading-5">
                  支持多图上传，最多 5 张<br />格式：jpg / png，单张最大 5MB
                </div>
              </div>
              {errors.photos && <p className={errCls}>{errors.photos}</p>}
            </div>

            {/* 13–15. 竞对 / 便利店 单选 */}
            <div>
              <Lbl required>是否有竞对智能售货机</Lbl>
              <RadioGroup options={["有","无"]} value={compSmart} onChange={setCompSmart} />
            </div>
            <div>
              <Lbl required>是否有竞对传统售货机</Lbl>
              <RadioGroup options={["有","无"]} value={compTrad} onChange={setCompTrad} />
            </div>
            <div>
              <Lbl required>百米内是否有便利店</Lbl>
              <RadioGroup options={["有","无"]} value={nearShop} onChange={setNearShop} />
            </div>

            {/* 16. 点位信息备注 */}
            <div className="col-span-2">
              <div className="flex items-center justify-between mb-1.5">
                <Lbl>点位信息备注</Lbl>
                <span className="text-xs text-[#9CA3AF]">{remark.length}/500</span>
              </div>
              <textarea rows={4} maxLength={500} value={remark} onChange={e => setRemark(e.target.value)}
                placeholder="请输入点位备注信息，方便运营后续追溯"
                className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2.5 text-sm text-[#334155] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/20 resize-none transition-colors" />
            </div>
          </div>
        </Card>

        {/* ── 合同信息 ── */}
        <Card>
          <SectionTitle title="合同信息" />
          <div>
            <Lbl>合同附件</Lbl>
            {contractFile ? (
              <div className="flex items-center gap-3 px-4 py-3 border border-[#E2E8F0] rounded-lg bg-[#F8FAFC]">
                <Icon d={Icons.file} size={16} className="text-[#2563EB]" />
                <span className="text-sm text-[#334155] flex-1">{contractFile}</span>
                <button onClick={() => setContractFile(null)} className="text-[#94A3B8] hover:text-[#EF4444] transition-colors">
                  <Icon d={Icons.x} size={14} />
                </button>
              </div>
            ) : (
              <label className="flex items-center gap-3 h-11 px-4 border-2 border-dashed border-[#CBD5E1] rounded-lg cursor-pointer hover:border-[#2563EB] hover:bg-[#EFF6FF] transition-all group">
                <Icon d={Icons.upload} size={15} className="text-[#94A3B8] group-hover:text-[#2563EB]" />
                <span className="text-sm text-[#9CA3AF] group-hover:text-[#2563EB]">+ 上传附件</span>
                <input type="file" accept=".pdf,.doc,.docx,.jpg,.png" className="hidden"
                  onChange={e => { if (e.target.files?.[0]) setContractFile(e.target.files[0].name); }} />
              </label>
            )}
            <p className="text-xs text-[#9CA3AF] mt-1.5">支持格式：PDF / Word / 图片，单个文件最大 10MB</p>
          </div>
        </Card>

        {/* ── 联系人信息 ── */}
        <Card>
          <SectionTitle title="联系人信息" />
          <div className="grid grid-cols-2 gap-x-8 gap-y-5">
            <div>
              <div className="flex items-center justify-between mb-1.5"><Lbl required>联系人姓名</Lbl><span className="text-xs text-[#9CA3AF]">{contactName.length}/20</span></div>
              <input maxLength={20} value={contactName} onChange={e => setContactName(e.target.value)}
                placeholder="请输入联系人姓名" className={fieldCls} />
              {errors.contactName && <p className={errCls}>{errors.contactName}</p>}
            </div>
            <div>
              <Lbl required>联系电话</Lbl>
              <input value={contactPhone} onChange={e => setContactPhone(e.target.value)}
                placeholder="请输入11位手机号码" className={`${fieldCls} ${errors.contactPhone ? "border-[#EF4444]" : ""}`} />
              {errors.contactPhone
                ? <p className={errCls}>{errors.contactPhone}</p>
                : <p className="text-xs text-[#9CA3AF] mt-1">需符合11位手机号格式</p>}
            </div>
            <div>
              <Lbl>联系人性别</Lbl>
              <select value={contactGender} onChange={e => setContactGender(e.target.value)} className={fieldCls}>
                <option value="">请选择性别</option>
                <option value="男">男</option>
                <option value="女">女</option>
              </select>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5"><Lbl>联系人微信号</Lbl><span className="text-xs text-[#9CA3AF]">{contactWx.length}/30</span></div>
              <input maxLength={30} value={contactWx} onChange={e => setContactWx(e.target.value)}
                placeholder="请输入联系人微信号" className={fieldCls} />
            </div>
            <div>
              <Lbl>联系人邮箱</Lbl>
              <input value={contactEmail} onChange={e => setContactEmail(e.target.value)}
                placeholder="请输入邮箱地址" className={fieldCls} />
              <p className="text-xs text-[#9CA3AF] mt-1">需符合邮箱格式</p>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5"><Lbl>联系人身份</Lbl><span className="text-xs text-[#9CA3AF]">{contactRole.length}/20</span></div>
              <input maxLength={20} value={contactRole} onChange={e => setContactRole(e.target.value)}
                placeholder="如：行政经理、前台、行政主管" className={fieldCls} />
            </div>
          </div>
        </Card>

        {/* ── 运营配置 ── */}
        <Card>
          <SectionTitle title="运营配置" />
          <div className="space-y-5">
            <div>
              <div className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-3">补货规则</div>

              {/* 自动补货开关 */}
              <div className="flex items-center justify-between py-3 mb-4 border-b border-[#F1F5F9]">
                <div>
                  <div className="text-sm font-medium text-[#0F172A]">自动补货单</div>
                  <div className="text-xs text-[#94A3B8] mt-0.5">开启后系统按规则自动出单</div>
                </div>
                <Toggle checked={autoRestock} onChange={() => setAutoRestock(v => !v)} />
              </div>

              <div className={`space-y-4 transition-opacity ${autoRestock ? "" : "opacity-40 pointer-events-none"}`}>
                {/* 补货设置：统一配置 + 周规则（与详情页同构，可编辑） */}
                <div>
                  <Lbl required={autoRestock} hint="勾选统一配置后按统一时间出单；否则按周规则勾选的天出单">补货设置</Lbl>
                  <div className="border border-[#E2E8F0] rounded-lg overflow-hidden">
                    <div className="grid bg-[#F8FAFC] border-b border-[#E2E8F0] text-xs font-medium text-[#6B7280]"
                      style={{ gridTemplateColumns: "110px 110px 1fr 1fr 180px" }}>
                      {["周规则","统一配置","出单时间","推送履约时间","缺货自动补货阈值"].map(h => (
                        <div key={h} className="px-4 py-2.5 whitespace-nowrap">{h}</div>
                      ))}
                    </div>
                    {/* 统一配置行 */}
                    <div className={`grid items-center border-b border-[#F1F5F9] ${unifiedCfg ? "bg-[#FFFBEA]" : "bg-white"}`}
                      style={{ gridTemplateColumns: "110px 110px 1fr 1fr 180px" }}>
                      <div className="px-4 py-2.5 flex items-center">
                        <input type="checkbox" checked={unifiedCfg}
                          onChange={e => setUnifiedCfg(e.target.checked)}
                          className="w-3.5 h-3.5 accent-[#B45309] cursor-pointer" />
                      </div>
                      <div className={`px-2 py-2.5 text-sm font-bold ${unifiedCfg ? "text-[#B45309]" : "text-[#64748B]"}`}>统一配置</div>
                      <div className={`px-4 py-2 transition-opacity ${unifiedCfg ? "" : "opacity-25 pointer-events-none"}`}>
                        <input type="time" value={unifiedOrder} onChange={e => setUnifiedOrder(e.target.value)}
                          className="h-7 border border-[#D1D5DB] rounded px-2 text-xs text-[#0F172A] bg-white focus:outline-none focus:border-[#2563EB] w-[100px]" />
                      </div>
                      <div className={`px-4 py-2 transition-opacity ${unifiedCfg ? "" : "opacity-25 pointer-events-none"}`}>
                        <input type="time" value={unifiedPush} onChange={e => setUnifiedPush(e.target.value)}
                          className="h-7 border border-[#D1D5DB] rounded px-2 text-xs text-[#0F172A] bg-white focus:outline-none focus:border-[#2563EB] w-[100px]" />
                      </div>
                      <div className={`px-4 py-2 transition-opacity ${unifiedCfg ? "" : "opacity-25 pointer-events-none"}`}>
                        <div className="flex items-center gap-1">
                          <input type="number" min={1} value={unifiedThreshold} onChange={e => setUnifiedThreshold(e.target.value)} placeholder="件数"
                            className="h-7 border border-[#D1D5DB] rounded px-2 text-xs text-[#0F172A] bg-white focus:outline-none focus:border-[#2563EB] w-16" />
                          <span className="text-xs text-[#94A3B8]">件</span>
                        </div>
                      </div>
                    </div>
                    {/* 周一～周日行 */}
                    {DAYS.map(day => {
                      const d = restockDays[day];
                      const dis = unifiedCfg || !d.enabled;
                      return (
                        <div key={day} className={`grid items-center border-b border-[#F1F5F9] last:border-0 ${unifiedCfg ? "bg-white opacity-45 pointer-events-none" : d.enabled ? "bg-white" : "bg-[#F9FAFB]"}`}
                          style={{ gridTemplateColumns: "110px 110px 1fr 1fr 180px" }}>
                          <div className="px-4 py-2.5 flex items-center gap-2">
                            <input type="checkbox" checked={d.enabled}
                              onChange={e => setRestockDays(prev => ({ ...prev, [day]: { ...prev[day], enabled: e.target.checked } }))}
                              className="w-3.5 h-3.5 accent-[#2563EB] cursor-pointer" />
                            <span className={`text-sm font-medium ${d.enabled ? "text-[#0F172A]" : "text-[#9CA3AF]"}`}>{day}</span>
                          </div>
                          <div />
                          <div className={`px-4 py-2 transition-opacity ${dis ? "opacity-25 pointer-events-none" : ""}`}>
                            <input type="time" value={d.orderTime}
                              onChange={e => setRestockDays(prev => ({ ...prev, [day]: { ...prev[day], orderTime: e.target.value } }))}
                              className="h-7 border border-[#D1D5DB] rounded px-2 text-xs text-[#0F172A] bg-white focus:outline-none focus:border-[#2563EB] w-[100px]" />
                          </div>
                          <div className={`px-4 py-2 transition-opacity ${dis ? "opacity-25 pointer-events-none" : ""}`}>
                            <input type="time" value={d.pushTime}
                              onChange={e => setRestockDays(prev => ({ ...prev, [day]: { ...prev[day], pushTime: e.target.value } }))}
                              className="h-7 border border-[#D1D5DB] rounded px-2 text-xs text-[#0F172A] bg-white focus:outline-none focus:border-[#2563EB] w-[100px]" />
                          </div>
                          <div className={`px-4 py-2 transition-opacity ${dis ? "opacity-25 pointer-events-none" : ""}`}>
                            <div className="flex items-center gap-1">
                              <input type="number" min={1} value={d.threshold}
                                onChange={e => setRestockDays(prev => ({ ...prev, [day]: { ...prev[day], threshold: e.target.value } }))}
                                placeholder="件数"
                                className="h-7 border border-[#D1D5DB] rounded px-2 text-xs text-[#0F172A] bg-white focus:outline-none focus:border-[#2563EB] w-16" />
                              <span className="text-xs text-[#94A3B8]">件</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {errors.threshold && <p className={errCls}>{errors.threshold}</p>}
                </div>
              </div>
            </div>
          </div>
        </Card>

      </div>
    </div>
  );
};

// 设备状态标签：在线/离线/未绑定（离线时附带最后一次离线时间与已离线时长）
const LOC_DEVICE_STATUS_STYLE: Record<string, { bg: string; text: string; dot: string; hollow?: boolean }> = {
  "在线":  { bg: "bg-[#ECFDF5]", text: "text-[#059669]", dot: "bg-[#059669]" },
  "离线":  { bg: "bg-[#FEF2F2]", text: "text-[#DC2626]", dot: "bg-[#DC2626]" },
  "未绑定": { bg: "bg-[#F1F5F9]", text: "text-[#94A3B8]", dot: "", hollow: true },
};

// 演示基准时间：用于计算已离线时长
const LOC_OFFLINE_NOW = new Date("2025-09-23T10:32:00");
const locOfflineDuration = (from: string) => {
  const diff = LOC_OFFLINE_NOW.getTime() - new Date(from.replace(" ", "T")).getTime();
  if (diff <= 0) return "";
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  return d > 0 ? `${d}天${h}小时` : h > 0 ? `${h}小时${m}分` : `${m}分钟`;
};

const LocDeviceTag = ({ status, lastOfflineAt }: { status: string; lastOfflineAt?: string }) => {
  const s = LOC_DEVICE_STATUS_STYLE[status] ?? LOC_DEVICE_STATUS_STYLE["未绑定"]!;
  return (
    <div className="flex flex-col items-start gap-1">
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${s.bg} ${s.text}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${s.hollow ? "border border-[#94A3B8] bg-transparent" : s.dot}`} />
        {status}
      </span>
      {status === "离线" && lastOfflineAt && (
        <>
          <span className="text-[11px] text-[#DC2626] leading-tight whitespace-nowrap">离线于 {lastOfflineAt}</span>
          <span className="text-[11px] text-[#DC2626] leading-tight whitespace-nowrap">已离线 {locOfflineDuration(lastOfflineAt)}</span>
        </>
      )}
    </div>
  );
};

const LocationList = ({ onDetail, onEdit }: { onDetail: () => void; onEdit: () => void }) => (
  <div>
    <PageHeader title="点位管理" breadcrumbs={["首页", "核心业务", "点位管理"]} />
    <FilterBar>
      <FilterField label="点位名称/编码">
        <Input placeholder="名称或编码模糊搜索" icon="search" className="w-52" />
      </FilterField>
      <FilterField label="关联客户">
        <Select options={[{label:"全部客户",value:""},{label:"蜂巢智能科技",value:"c001"},{label:"桔仔自动贩卖",value:"c002"},{label:"格林购物科技",value:"c003"},{label:"云聚零售",value:"c004"},{label:"万象智贩",value:"c005"},{label:"盒里科技",value:"c006"}]} className="w-44" />
      </FilterField>
      <FilterField label="关联仓库">
        <Select options={[{label:"全部仓库",value:""},{label:"深圳中心仓",value:"w001"},{label:"上海中心仓",value:"w002"},{label:"北京中心仓",value:"w003"},{label:"成都中心仓",value:"w004"},{label:"杭州中心仓",value:"w005"},{label:"广州中心仓",value:"w006"}]} className="w-36" />
      </FilterField>
      <FilterField label="地区">
        <div className="flex items-center gap-1">
          <Select options={[{label:"全部省份",value:""},{label:"广东省",value:"gd"},{label:"上海市",value:"sh"},{label:"北京市",value:"bj"},{label:"四川省",value:"sc"},{label:"浙江省",value:"zj"}]} className="w-28" />
          <Select options={[{label:"全部城市",value:""},{label:"深圳市",value:"sz"},{label:"广州市",value:"gz"}]} className="w-24" />
          <Select options={[{label:"全部区",value:""},{label:"南山区",value:"ns"},{label:"福田区",value:"ft"}]} className="w-24" />
        </div>
      </FilterField>
      <FilterField label="点位等级">
        <Select options={[{label:"全部等级",value:""},{label:"S+",value:"sp"},{label:"S",value:"s"},{label:"A",value:"a"},{label:"B",value:"b"},{label:"C",value:"c"},{label:"D",value:"d"},{label:"N",value:"n"}]} className="w-28" />
      </FilterField>
      <FilterField label="场景">
        <Select options={[{label:"全部场景",value:""},{label:"写字楼",value:"office"},{label:"商业综合体",value:"mall"},{label:"园区食堂",value:"canteen"},{label:"交通枢纽",value:"hub"},{label:"医院",value:"hospital"},{label:"学校",value:"school"}]} className="w-32" />
      </FilterField>
      <FilterField label="设备状态">
        <Select options={[{label:"全部",value:""},{label:"在线",value:"online"},{label:"离线",value:"offline"},{label:"未绑定",value:"unbound"}]} className="w-24" />
      </FilterField>
      <FilterField label="状态">
        <Select options={[{label:"全部",value:""},{label:"启用",value:"enabled"},{label:"禁用",value:"disabled"}]} className="w-24" />
      </FilterField>
      <FilterField label="审核状态">
        <Select options={[{label:"全部",value:""},{label:"待审核",value:"pending"},{label:"审核通过",value:"passed"},{label:"审核驳回",value:"rejected"}]} className="w-28" />
      </FilterField>
      <FilterField label="创建时间">
        <div className="flex items-center gap-1">
          <Input type="date" className="w-32" />
          <span className="text-[#94A3B8] text-xs">~</span>
          <Input type="date" className="w-32" />
        </div>
      </FilterField>
      <div className="flex items-end gap-2">
        <Btn variant="primary" icon="search">查询</Btn>
        <Btn variant="secondary">重置</Btn>
        <Btn variant="secondary" icon="download">导出</Btn>
      </div>
    </FilterBar>
    <Card noPad>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[#F1F5F9] bg-[#F8FAFC]">
            {["点位编码","点位名称","关联客户","关联仓库","地区","详细位置","点位等级","设备状态","点位状态","审核状态","操作"].map(h => (
              <th key={h} className="py-3 px-3 text-left font-medium text-[#64748B] whitespace-nowrap text-xs">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {LOCATIONS.map(r => (
            <tr key={r.id} className="border-b border-[#F1F5F9] hover:bg-[#F8FAFC] transition-colors">
              <td className="py-3 px-3 font-mono text-xs text-[#64748B] whitespace-nowrap">{r.id}</td>
              <td className="py-3 px-3">
                <button onClick={onDetail} className="text-[#2563EB] hover:underline font-medium text-left max-w-[160px] block truncate">{r.name}</button>
              </td>
              <td className="py-3 px-3 text-[#334155] whitespace-nowrap">{r.customer}</td>
              <td className="py-3 px-3 text-[#334155] whitespace-nowrap">{r.warehouse}</td>
              <td className="py-3 px-3 text-xs text-[#64748B] whitespace-nowrap">{r.region}</td>
              <td className="py-3 px-3 text-xs text-[#64748B] max-w-[180px]"><span className="block truncate">{r.address}</span></td>
              <td className="py-3 px-3">
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${LEVEL_COLOR_LOC[r.level] ?? "bg-[#F1F5F9] text-[#64748B]"}`}>{r.level}</span>
              </td>
              <td className="py-3 px-3 whitespace-nowrap">
                <LocDeviceTag status={r.deviceStatus} lastOfflineAt={r.lastOfflineAt} />
              </td>
              <td className="py-3 px-3">
                {r.status === "启用"
                  ? <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-[#F0FDF4] text-[#16A34A]"><span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />启用</span>
                  : <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-[#F3F4F6] text-[#6B7280]"><span className="w-1.5 h-1.5 rounded-full bg-[#6B7280]" />禁用</span>}
              </td>
              <td className="py-3 px-3">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${LOC_AUDIT_STYLE[r.auditStatus] ?? "bg-[#FFFBEB] text-[#D97706]"}`}>{r.auditStatus}</span>
              </td>
              <td className="py-3 px-3">
                <div className="flex gap-1 whitespace-nowrap">
                  <Btn variant="ghost" size="sm" onClick={onDetail}>查看</Btn>
                  <Btn variant="ghost" size="sm" onClick={onEdit}>编辑</Btn>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination total={LOCATIONS.length} page={1} pageSize={10} />
    </Card>
  </div>
);

// ─── Pause Restock Modal ──────────────────────────────────────────────────────
const PAUSE_WAREHOUSES = ["深圳中心仓", "广州中心仓", "上海中心仓", "北京中心仓", "成都西南仓", "武汉华中仓"];
const PAUSE_LOCATIONS  = ["龙华万达广场A区", "福田中心城B座", "南山科技园C栋", "宝安西乡汇悦城", "罗湖万象城F区", "光明新区购物中心"];

const PauseRestockModal = ({ onClose }: { onClose: () => void }) => {
  const today = new Date().toISOString().slice(0, 10);
  const [dim, setDim] = useState<"warehouse" | "location">("warehouse");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedWH, setSelectedWH] = useState<string[]>([]);
  const [selectedLoc, setSelectedLoc] = useState<string[]>([]);
  const [whSearch, setWhSearch] = useState("");
  const [locSearch, setLocSearch] = useState("");
  const [reason, setReason] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [conflictModal, setConflictModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const selected = dim === "warehouse" ? selectedWH : selectedLoc;
  const setSelected = dim === "warehouse" ? setSelectedWH : setSelectedLoc;
  const options = (dim === "warehouse" ? PAUSE_WAREHOUSES : PAUSE_LOCATIONS)
    .filter(o => o.includes(dim === "warehouse" ? whSearch : locSearch));

  const toggleOpt = (v: string) =>
    setSelected(prev => prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!startDate) e.startDate = "请选择暂停起始日期";
    else if (startDate < today) e.startDate = "起始日期不能早于今天";
    if (!endDate) e.endDate = "请选择暂停结束日期";
    else if (endDate < startDate) e.endDate = "结束日期不能早于起始日期";
    if (selected.length === 0) e.objects = `请至少选择一个${dim === "warehouse" ? "仓库" : "点位"}`;
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    // simulate conflict check: if first selection matches a mock "active" rule
    const hasConflict = selected[0] === (dim === "warehouse" ? "深圳中心仓" : "龙华万达广场A区");
    if (hasConflict) { setConflictModal(true); return; }
    setSubmitted(true);
  };

  const inputCls = "h-9 border border-[#D1D5DB] rounded-lg px-3 text-sm text-[#0F172A] bg-white focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/20 transition-colors w-full";

  if (submitted) return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl w-[480px] p-8 flex flex-col items-center gap-4 text-center" onClick={e => e.stopPropagation()}>
        <div className="w-14 h-14 rounded-full bg-[#F0FDF4] flex items-center justify-center">
          <Icon d={Icons.check} size={28} className="text-[#16A34A]" />
        </div>
        <div>
          <p className="text-base font-semibold text-[#0F172A]">暂停规则已生效</p>
          <p className="text-sm text-[#64748B] mt-1">{startDate} 至 {endDate} 期间，{selected.join("、")} 的自动补货已暂停</p>
        </div>
        <Btn variant="primary" onClick={onClose}>关闭</Btn>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl flex flex-col" style={{ width: 720, maxHeight: "90vh" }} onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2E8F0] flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-1 h-5 rounded-full bg-[#D97706]" />
            <h2 className="text-[15px] font-semibold text-[#0F172A]">配置暂停自动补货规则</h2>
          </div>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-md text-[#94A3B8] hover:text-[#475569] hover:bg-[#F1F5F9] transition-colors">
            <Icon d={Icons.x} size={16} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-5">

          {/* Explanation */}
          <div className="flex items-start gap-3 px-4 py-3 rounded-lg bg-[#FFFBEB] border border-[#FDE68A]">
            <Icon d={Icons.alert} size={15} className="text-[#D97706] mt-0.5 flex-shrink-0" />
            <div className="space-y-0.5">
              <p className="text-xs font-medium text-[#92400E]">关于暂停自动补货</p>
              <p className="text-xs text-[#B45309] leading-relaxed">在指定时间段内，所选仓库或点位将停止触发自动补货单生成。规则到期后自动恢复，不影响手动补货操作。</p>
            </div>
          </div>

          {/* Section: 基础配置 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-1 h-4 rounded-full bg-[#2563EB]" />
              <span className="text-sm font-semibold text-[#1E293B]">基础配置</span>
            </div>

            {/* Dimension */}
            <div>
              <label className="block text-xs font-medium text-[#374151] mb-2"><span className="text-[#EF4444] mr-0.5">*</span>暂停维度</label>
              <div className="flex gap-3">
                {([["warehouse","按仓库"],["location","按点位"]] as const).map(([v, label]) => (
                  <button key={v} onClick={() => { setDim(v); setErrors({}); }}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                      dim === v
                        ? "border-[#2563EB] bg-[#EFF6FF] text-[#2563EB]"
                        : "border-[#E2E8F0] bg-white text-[#6B7280] hover:border-[#93C5FD]"}`}>
                    <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${dim === v ? "border-[#2563EB]" : "border-[#D1D5DB]"}`}>
                      {dim === v && <span className="w-2 h-2 rounded-full bg-[#2563EB]" />}
                    </span>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Date range */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#374151] mb-1.5"><span className="text-[#EF4444] mr-0.5">*</span>暂停起始日期</label>
                <input type="date" min={today} value={startDate}
                  onChange={e => { setStartDate(e.target.value); setErrors(prev => ({ ...prev, startDate: "" })); }}
                  className={`${inputCls} ${errors.startDate ? "border-[#EF4444]" : ""}`} />
                {errors.startDate && <p className="text-xs text-[#EF4444] mt-1">{errors.startDate}</p>}
              </div>
              <div>
                <label className="block text-xs font-medium text-[#374151] mb-1.5"><span className="text-[#EF4444] mr-0.5">*</span>暂停结束日期</label>
                <input type="date" min={startDate || today} value={endDate}
                  onChange={e => { setEndDate(e.target.value); setErrors(prev => ({ ...prev, endDate: "" })); }}
                  className={`${inputCls} ${errors.endDate ? "border-[#EF4444]" : ""}`} />
                {errors.endDate && <p className="text-xs text-[#EF4444] mt-1">{errors.endDate}</p>}
              </div>
            </div>
          </div>

          {/* Section: 对象选择 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-1 h-4 rounded-full bg-[#2563EB]" />
              <span className="text-sm font-semibold text-[#1E293B]">对象选择</span>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#374151] mb-1.5">
                <span className="text-[#EF4444] mr-0.5">*</span>
                {dim === "warehouse" ? "暂停仓库" : "暂停点位"}
              </label>
              {/* Search input */}
              <div className="relative mb-2">
                <Icon d={Icons.search} size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
                <input
                  placeholder={`搜索${dim === "warehouse" ? "仓库" : "点位"}名称`}
                  value={dim === "warehouse" ? whSearch : locSearch}
                  onChange={e => dim === "warehouse" ? setWhSearch(e.target.value) : setLocSearch(e.target.value)}
                  className="h-9 w-full border border-[#D1D5DB] rounded-lg pl-8 pr-3 text-sm bg-white focus:outline-none focus:border-[#2563EB] transition-colors" />
              </div>
              {/* Options */}
              <div className="border border-[#E2E8F0] rounded-lg overflow-hidden max-h-[180px] overflow-y-auto">
                {options.length === 0
                  ? <p className="text-xs text-[#9CA3AF] text-center py-4">无匹配结果</p>
                  : options.map(opt => (
                    <label key={opt} className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-[#F8FAFC] transition-colors border-b border-[#F1F5F9] last:border-0 ${selected.includes(opt) ? "bg-[#EFF6FF]" : ""}`}>
                      <input type="checkbox" checked={selected.includes(opt)} onChange={() => toggleOpt(opt)}
                        className="w-4 h-4 accent-[#2563EB] cursor-pointer" />
                      <span className={`text-sm ${selected.includes(opt) ? "text-[#2563EB] font-medium" : "text-[#374151]"}`}>{opt}</span>
                    </label>
                  ))
                }
              </div>
              {selected.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {selected.map(s => (
                    <span key={s} className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]">
                      {s}
                      <button onClick={() => toggleOpt(s)} className="hover:text-[#EF4444] transition-colors">×</button>
                    </span>
                  ))}
                </div>
              )}
              {errors.objects && <p className="text-xs text-[#EF4444] mt-1">{errors.objects}</p>}
            </div>

            {/* Batch upload */}
            <div>
              <label className="block text-xs font-medium text-[#374151] mb-1.5">
                批量导入
                <span className="text-[#9CA3AF] font-normal ml-1">（可选，上传{dim === "warehouse" ? "仓库" : "点位"}编码列表）</span>
              </label>
              <label className="flex items-center gap-3 h-10 px-4 border border-dashed border-[#CBD5E1] rounded-lg cursor-pointer hover:border-[#2563EB] hover:bg-[#EFF6FF] transition-all group">
                <Icon d={Icons.upload} size={15} className="text-[#94A3B8] group-hover:text-[#2563EB] transition-colors" />
                <span className="text-sm text-[#9CA3AF] group-hover:text-[#2563EB] transition-colors">点击上传 .xlsx / .csv 文件</span>
                <input type="file" accept=".xlsx,.csv" className="hidden" />
              </label>
            </div>
          </div>

          {/* Section: 原因 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-1 h-4 rounded-full bg-[#2563EB]" />
              <span className="text-sm font-semibold text-[#1E293B]">原因记录</span>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#374151] mb-1.5">
                暂停原因
                <span className="text-[#9CA3AF] font-normal ml-1">（选填，最多 200 字）</span>
              </label>
              <textarea value={reason} maxLength={200}
                onChange={e => setReason(e.target.value)}
                placeholder="请填写本次暂停自动补货的原因，便于后续追溯…"
                className="w-full h-20 border border-[#D1D5DB] rounded-lg px-3 py-2.5 text-sm text-[#0F172A] bg-white resize-none focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/20 transition-colors placeholder:text-[#9CA3AF]" />
              <p className="text-xs text-[#9CA3AF] text-right mt-0.5">{reason.length}/200</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#E2E8F0] flex-shrink-0 bg-white">
          <span className="text-xs text-[#94A3B8]">
            {selected.length > 0 ? `已选 ${selected.length} 个${dim === "warehouse" ? "仓库" : "点位"}` : "未选择对象"}
            {startDate && endDate ? `，${startDate} 至 ${endDate}` : ""}
          </span>
          <div className="flex items-center gap-3">
            <Btn variant="ghost" onClick={onClose}>取消</Btn>
            <Btn variant="primary" onClick={handleSubmit}>提交规则</Btn>
          </div>
        </div>
      </div>

      {/* Conflict dialog */}
      {conflictModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/30" onClick={() => setConflictModal(false)}>
          <div className="bg-white rounded-xl shadow-2xl w-[420px] p-6 space-y-4" onClick={e => e.stopPropagation()}>
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-[#FEF3C7] flex items-center justify-center flex-shrink-0">
                <Icon d={Icons.alert} size={18} className="text-[#D97706]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#0F172A]">存在冲突规则，无法提交</p>
                <p className="text-sm text-[#64748B] mt-1 leading-relaxed">
                  所选{dim === "warehouse" ? "仓库" : "点位"}中已有执行中的暂停规则，暂不支持自动合并。请调整所选对象或修改已有规则后重试。
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-1">
              <Btn variant="ghost" onClick={() => setConflictModal(false)}>我知道了</Btn>
              <Btn variant="secondary" onClick={() => setConflictModal(false)}>重新选择</Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Restock Rule Modal ───────────────────────────────────────────────────────
const RR_WAREHOUSES = ["深圳中心仓", "广州中心仓", "上海中心仓", "北京中心仓"];
const RR_LOCATIONS  = ["龙华万达广场A区", "福田中心城B座", "南山科技园C栋", "宝安西乡汇悦城"];
const RR_DAYS       = ["周一","周二","周三","周四","周五","周六","周日"];

type RRDayRow = { enabled: boolean; orderTime: string; pushTime: string; threshold: string };
type RRRule   = { id: number; selections: string[]; days: RRDayRow[] };

const makeRRDays = (): RRDayRow[] =>
  RR_DAYS.map(() => ({ enabled: true, orderTime: "09:00", pushTime: "10:00", threshold: "20" }));

const makeRule = (id: number): RRRule => ({ id, selections: [], days: makeRRDays() });

const RestockRuleModal = ({ onClose }: { onClose: () => void }) => {
  type RRTab = "仓库维度自动补货规则" | "点位维度自动补货规则";
  const [rrTab, setRrTab] = useState<RRTab>("仓库维度自动补货规则");
  const [rules, setRules] = useState<RRRule[]>([makeRule(1)]);

  const isWarehouse = rrTab === "仓库维度自动补货规则";
  const options = isWarehouse ? RR_WAREHOUSES : RR_LOCATIONS;
  const selLabel = isWarehouse ? "仓库名称" : "点位名称";
  const selPlaceholder = isWarehouse ? "请选择仓库（可多选）" : "请选择点位（可多选）";

  const toggleSel = (id: number, v: string) =>
    setRules(rs => rs.map(r => r.id === id
      ? { ...r, selections: r.selections.includes(v) ? r.selections.filter(x => x !== v) : [...r.selections, v] }
      : r));

  const patchDay = (ruleId: number, di: number, patch: Partial<RRDayRow>) =>
    setRules(rs => rs.map(r => r.id === ruleId
      ? { ...r, days: r.days.map((d, i) => i === di ? { ...d, ...patch } : d) }
      : r));

  const applyUnified = (ruleId: number, patch: Partial<Omit<RRDayRow, "enabled">>) =>
    setRules(rs => rs.map(r => r.id === ruleId
      ? { ...r, days: r.days.map(d => ({ ...d, ...patch })) }
      : r));

  const addRule = () => {
    const nextId = Math.max(...rules.map(r => r.id)) + 1;
    setRules(rs => [...rs, makeRule(nextId)]);
  };

  const removeRule = (id: number) => setRules(rs => rs.filter(r => r.id !== id));

  const inputCls = "h-[30px] border border-[#D1D5DB] rounded-md bg-white text-sm text-[#0F172A] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/20 transition-colors";

  const RuleCard = ({ rule, ri }: { rule: RRRule; ri: number }) => (
    <div className="border border-[#E2E8F0] rounded-xl overflow-hidden bg-white">
      {/* Card header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded flex items-center justify-center bg-[#2563EB] text-white text-[10px] font-bold">{ri + 1}</span>
          <span className="text-sm font-medium text-[#1E293B]">规则 #{ri + 1}</span>
        </div>
        {rules.length > 1 && (
          <button onClick={() => removeRule(rule.id)}
            className="flex items-center gap-1 text-xs text-[#94A3B8] hover:text-[#EF4444] transition-colors px-2 py-0.5 rounded hover:bg-[#FEF2F2]">
            <Icon d={Icons.trash} size={12} />
            删除规则
          </button>
        )}
      </div>

      <div className="p-4 space-y-4">
        {/* Object selector */}
        <div className="flex items-start gap-3 pb-4 border-b border-[#F1F5F9]">
          <div className="w-[90px] flex-shrink-0 pt-1.5">
            <span className="text-xs text-[#EF4444] mr-0.5">*</span>
            <span className="text-xs font-medium text-[#374151]">{selLabel}</span>
          </div>
          <div className="flex-1">
            <div className="flex items-start gap-3">
              <div className="flex-1 flex flex-wrap gap-1.5 min-h-[32px] items-center">
                {options.map(opt => {
                  const active = rule.selections.includes(opt);
                  return (
                    <button key={opt} onClick={() => toggleSel(rule.id, opt)}
                      className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded border transition-all ${
                        active
                          ? "bg-[#EFF6FF] text-[#2563EB] border-[#93C5FD] font-medium"
                          : "bg-white text-[#6B7280] border-[#E2E8F0] hover:border-[#93C5FD] hover:text-[#2563EB]"}`}>
                      {active && <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] flex-shrink-0" />}
                      {opt}
                    </button>
                  );
                })}
                {rule.selections.length === 0 && (
                  <span className="text-xs text-[#9CA3AF] italic">{selPlaceholder}</span>
                )}
              </div>
              {/* 批量上传：与暂停规则弹窗同款 */}
              <label className="flex items-center gap-1.5 h-8 px-3 flex-shrink-0 border border-dashed border-[#CBD5E1] rounded-lg cursor-pointer hover:border-[#2563EB] hover:bg-[#EFF6FF] transition-all group">
                <Icon d={Icons.upload} size={14} className="text-[#94A3B8] group-hover:text-[#2563EB] transition-colors" />
                <span className="text-xs text-[#9CA3AF] group-hover:text-[#2563EB] transition-colors">批量上传</span>
                <span className="text-[10px] text-[#9CA3AF] group-hover:text-[#2563EB]">.xlsx / .csv</span>
                <input type="file" accept=".xlsx,.csv" className="hidden" />
              </label>
            </div>
            {rule.selections.length === 0 && (
              <p className="text-xs text-[#EF4444] mt-1">请至少选择一个{selLabel}</p>
            )}
          </div>
        </div>

        {/* Day schedule table */}
        <div>
          <div className="text-xs font-medium text-[#374151] mb-2">周规则配置</div>
          <div className="border border-[#E2E8F0] rounded-lg overflow-hidden">
            {/* Column headers */}
            <div className="grid bg-[#F8FAFC] border-b border-[#E2E8F0]" style={{ gridTemplateColumns: "88px 1fr 1fr 160px" }}>
              <div className="px-3 py-2.5 text-xs font-medium text-[#6B7280]">适用日期</div>
              <div className="px-3 py-2.5 text-xs font-medium text-[#6B7280]">出单时间</div>
              <div className="px-3 py-2.5 text-xs font-medium text-[#6B7280]">推送履约时间</div>
              <div className="px-3 py-2.5 text-xs font-medium text-[#6B7280]">缺货补货阈值（件）</div>
            </div>

            {/* Unified batch-set row */}
            <div className="grid items-center border-b border-[#E2E8F0] bg-[#FFFBEB]" style={{ gridTemplateColumns: "88px 1fr 1fr 160px" }}>
              <div className="px-3 py-2.5 flex items-center gap-1.5">
                <span className="inline-block w-1 h-3.5 rounded-sm bg-[#F59E0B]" />
                <span className="text-xs font-semibold text-[#92400E]">统一配置</span>
              </div>
              <div className="px-3 py-2">
                <input type="time" onChange={e => applyUnified(rule.id, { orderTime: e.target.value })}
                  className={`${inputCls} w-[120px] px-2`} />
              </div>
              <div className="px-3 py-2">
                <input type="time" onChange={e => applyUnified(rule.id, { pushTime: e.target.value })}
                  className={`${inputCls} w-[120px] px-2`} />
              </div>
              <div className="px-3 py-2">
                <div className="flex items-center gap-1.5">
                  <input type="number" min={1} placeholder="—"
                    onChange={e => applyUnified(rule.id, { threshold: e.target.value })}
                    className={`${inputCls} w-16 px-2 text-center`} />
                  <span className="text-xs text-[#9CA3AF]">件</span>
                  <span className="text-[10px] text-[#92400E] bg-[#FEF3C7] px-1.5 py-0.5 rounded ml-1">批量填入</span>
                </div>
              </div>
            </div>

            {/* Per-day rows */}
            {RR_DAYS.map((day, di) => {
              const d = rule.days[di];
              const isWE = di >= 5;
              return (
                <div key={day}
                  className={`grid items-center border-b border-[#F1F5F9] last:border-0 transition-colors ${d.enabled ? (isWE ? "bg-[#FFF7ED]" : "bg-white") : "bg-[#F9FAFB]"}`}
                  style={{ gridTemplateColumns: "88px 1fr 1fr 160px" }}>
                  <div className="px-3 py-2.5 flex items-center gap-2">
                    <input type="checkbox" checked={d.enabled}
                      onChange={e => patchDay(rule.id, di, { enabled: e.target.checked })}
                      className="w-3.5 h-3.5 accent-[#2563EB] cursor-pointer rounded" />
                    <span className={`text-sm font-medium ${d.enabled ? (isWE ? "text-[#EA580C]" : "text-[#1E293B]") : "text-[#D1D5DB]"}`}>{day}</span>
                    {isWE && d.enabled && <span className="text-[9px] px-1 py-px rounded bg-[#FFEDD5] text-[#C2410C] font-medium">休</span>}
                  </div>
                  <div className={`px-3 py-2 transition-opacity ${d.enabled ? "" : "opacity-25 pointer-events-none"}`}>
                    <input type="time" value={d.orderTime}
                      onChange={e => patchDay(rule.id, di, { orderTime: e.target.value })}
                      className={`${inputCls} w-[120px] px-2`} />
                  </div>
                  <div className={`px-3 py-2 transition-opacity ${d.enabled ? "" : "opacity-25 pointer-events-none"}`}>
                    <input type="time" value={d.pushTime}
                      onChange={e => patchDay(rule.id, di, { pushTime: e.target.value })}
                      className={`${inputCls} w-[120px] px-2`} />
                  </div>
                  <div className={`px-3 py-2 flex items-center gap-1.5 transition-opacity ${d.enabled ? "" : "opacity-25 pointer-events-none"}`}>
                    <input type="number" min={1} value={d.threshold}
                      onChange={e => patchDay(rule.id, di, { threshold: e.target.value })}
                      className={`${inputCls} w-16 px-2 text-center`} />
                    <span className="text-xs text-[#9CA3AF]">件</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl flex flex-col" style={{ width: 900, maxHeight: "90vh" }} onClick={e => e.stopPropagation()}>

        {/* Modal header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2E8F0] flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-1 h-5 rounded-full bg-[#2563EB]" />
            <h2 className="text-[15px] font-semibold text-[#0F172A]">配置自动补货规则</h2>
          </div>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-md text-[#94A3B8] hover:text-[#475569] hover:bg-[#F1F5F9] transition-colors">
            <Icon d={Icons.x} size={16} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex px-6 border-b border-[#E2E8F0] flex-shrink-0 bg-white">
          {(["仓库维度自动补货规则","点位维度自动补货规则"] as RRTab[]).map((t, ti) => (
            <button key={t} onClick={() => { setRrTab(t); setRules([makeRule(1)]); }}
              className={`relative flex items-center gap-2 text-sm px-4 py-3 border-b-2 mr-1 transition-colors ${rrTab === t
                ? "border-[#2563EB] text-[#2563EB] font-medium"
                : "border-transparent text-[#6B7280] hover:text-[#374151] hover:border-[#CBD5E1]"}`}>
              <span className={`w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center flex-shrink-0 ${rrTab === t ? "bg-[#2563EB] text-white" : "bg-[#E5E7EB] text-[#6B7280]"}`}>{ti + 1}</span>
              {t}
            </button>
          ))}
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-4 bg-[#F8FAFC]">

          {/* Trigger logic notice */}
          <div className="flex items-start gap-3 px-4 py-3 rounded-lg bg-[#EFF6FF] border border-[#BFDBFE]">
            <Icon d={Icons.info} size={15} className="text-[#3B82F6] mt-0.5 flex-shrink-0" />
            <div className="space-y-0.5">
              <p className="text-xs font-medium text-[#1E40AF]">触发逻辑</p>
              <p className="text-xs text-[#1D4ED8] leading-relaxed">当总缺货量 ≥ 阈值，且仓库可用库存 ≥ 阈值时，触发自动补货单生成并冻结对应库存。预测补货相关能力一期暂不开放。</p>
            </div>
          </div>

          {/* Rule cards */}
          {rules.map((rule, ri) => <RuleCard key={rule.id} rule={rule} ri={ri} />)}

          {/* Add rule */}
          <button onClick={addRule}
            className="w-full py-3 border-2 border-dashed border-[#CBD5E1] rounded-xl text-sm text-[#64748B] hover:border-[#2563EB] hover:text-[#2563EB] hover:bg-[#EFF6FF] transition-all flex items-center justify-center gap-1.5 bg-white">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            继续追加规则
          </button>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#E2E8F0] flex-shrink-0 bg-white">
          <span className="text-xs text-[#94A3B8]">已配置 {rules.length} 条{isWarehouse ? "仓库" : "点位"}维度规则</span>
          <div className="flex items-center gap-3">
            <Btn variant="ghost" onClick={onClose}>取消</Btn>
            <Btn variant="primary" onClick={onClose}>提交规则</Btn>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Location Detail ──────────────────────────────────────────────────────────
// Tab 卡片内容与智能柜详情共用，见 LocationDetailCore.tsx
const LocationDetail = ({ onBack, onEdit }: { onBack: () => void; onEdit: () => void }) => (
  <div>
    <PageHeader
      title="深圳南山科技园 A3 栋大堂"
      breadcrumbs={["首页", "点位管理", "点位详情"]}
      actions={
        <>
          <Btn variant="secondary" icon="chevronLeft" onClick={onBack}>返回列表</Btn>
          <Btn variant="secondary" icon="edit" onClick={onEdit}>编辑点位</Btn>
        </>
      }
    />
    <LocationDetailTabs />
  </div>
);

// ─── Device List ──────────────────────────────────────────────────────────────
// ─── Device data ─────────────────────────────────────────────────────────────
const DEVICE_ROWS = [
  { id: "D001", code: "RC-2024-SZ-001", imei: "860123456789001", model: "智柜 Pro X8",  location: "蜂巢·科技园北楼1F-A区", customer: "蜂巢智能科技",   online: "在线", offlineAt: "—", deploy: "投放", installed: "2024-03-01" },
  { id: "D002", code: "RC-2024-SH-002", imei: "860123456789002", model: "智柜 Pro X8",  location: "上海虹桥天地 B1",       customer: "桔仔自动贩卖",   online: "在线", offlineAt: "—", deploy: "投放", installed: "2024-04-12" },
  { id: "D003", code: "RC-2024-BJ-003", imei: "860123456789003", model: "智柜 Lite S4", location: "—",                      customer: "格林购物科技",   online: "离线", offlineAt: "2025-09-20 18:42", deploy: "在库", installed: "—" },
  { id: "D004", code: "RC-2024-CD-004", imei: "860123456789004", model: "智柜 Pro X8",  location: "成都天府软件园 D区食堂", customer: "云聚零售",       online: "在线", offlineAt: "2025-08-15 09:12", deploy: "投放", installed: "2024-06-20" },
  { id: "D005", code: "RC-2024-HZ-005", imei: "860123456789005", model: "智柜 Max X12", location: "阿里西溪园区 5号楼",    customer: "万象智贩",       online: "在线", offlineAt: "—", deploy: "投放", installed: "2024-07-08" },
  { id: "D006", code: "RC-2024-GZ-006", imei: "860123456789006", model: "智柜 Lite S4", location: "—",                      customer: "盒里科技",       online: "离线", offlineAt: "2025-09-21 07:30", deploy: "在库", installed: "—" },
];

const DeviceList = ({ onDetail, onRemote }: { onDetail: () => void; onRemote: () => void }) => {
  const [remoteDevice, setRemoteDevice] = useState<string | null>(null);

  const handleRemote = (code: string) => {
    setRemoteDevice(code);
    onRemote();
  };

  return (
    <div>
      <PageHeader
        title="设备台账"
        breadcrumbs={["首页", "核心业务", "设备台账"]}
        actions={<Btn variant="secondary" icon="download">导出</Btn>}
      />

      {/* 筛选区 */}
      <FilterBar>
        <FilterField label="资产编码/名称"><Input placeholder="模糊搜索资产编码或名称" icon="search" className="w-52" /></FilterField>
        <FilterField label="设备型号">
          <Select options={[{label:"全部型号",value:""},{label:"智柜 Pro X8",value:"x8"},{label:"智柜 Lite S4",value:"s4"},{label:"智柜 Max X12",value:"x12"}]} className="w-36" />
        </FilterField>
        <FilterField label="关联客户">
          <Select options={[{label:"全部客户",value:""},...PC_CUSTOMERS.map(c=>({label:c.name.slice(0,10),value:c.id}))]} className="w-40" />
        </FilterField>
        <FilterField label="关联点位">
          <Select options={[{label:"全部点位",value:""},{label:"蜂巢·科技园北楼1F",value:"p1"},{label:"上海虹桥天地 B1",value:"p2"},{label:"成都天府软件园",value:"p3"},{label:"阿里西溪园区5号楼",value:"p4"}]} className="w-44" />
        </FilterField>
        <FilterField label="在线状态">
          <Select options={[{label:"全部",value:""},{label:"在线",value:"online"},{label:"离线",value:"offline"}]} className="w-28" />
        </FilterField>
        <FilterField label="投放状态">
          <Select options={[{label:"全部",value:""},{label:"在库",value:"stock"},{label:"投放",value:"deployed"}]} className="w-28" />
        </FilterField>
        <FilterField label="安装日期">
          <div className="flex items-center gap-1">
            <Input type="date" className="w-36" />
            <span className="text-[#94A3B8] text-xs">～</span>
            <Input type="date" className="w-36" />
          </div>
        </FilterField>
        <div className="flex items-end gap-2">
          <Btn variant="primary" icon="search">查询</Btn>
          <Btn variant="secondary">重置</Btn>
        </div>
      </FilterBar>

      {/* 结果统计 */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-[#64748B]">共 <strong className="text-[#0F172A]">{DEVICE_ROWS.length}</strong> 条设备记录</span>
      </div>

      {/* 表格 */}
      <Card noPad>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[900px]">
            <thead>
              <tr className="border-b border-[#F1F5F9] bg-[#F8FAFC]">
                {["资产编码","IEMI","设备型号","关联点位名称","关联客户名称","在线状态","最近离线时间","投放状态","安装日期","操作"].map(h => (
                  <th key={h} className={`py-3 px-3 text-left text-xs font-medium text-[#64748B] whitespace-nowrap ${h === "操作" ? "sticky right-0 bg-[#F8FAFC] shadow-[-4px_0_8px_rgba(0,0,0,0.04)]" : ""}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DEVICE_ROWS.map(r => (
                <tr key={r.id} className="border-b border-[#F1F5F9] hover:bg-[#F8FAFC] transition-colors">
                  <td className="py-3 px-3">
                    <div>
                      <button onClick={onDetail} className="font-mono text-xs font-semibold text-[#2563EB] hover:underline">{r.code}</button>
                      <div className="text-[10px] text-[#94A3B8] mt-0.5">{r.model}</div>
                    </div>
                  </td>
                  <td className="py-3 px-3 font-mono text-xs text-[#64748B]">{r.imei}</td>
                  <td className="py-3 px-3 text-[#334155]">{r.model}</td>
                  <td className="py-3 px-3">
                    {r.location === "—"
                      ? <span className="text-[#94A3B8]">—</span>
                      : <span className="text-[#334155]">{r.location}</span>}
                  </td>
                  <td className="py-3 px-3 text-[#334155]">{r.customer}</td>
                  <td className="py-3 px-3">
                    {r.online === "在线"
                      ? <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-[#F0FDF4] text-[#16A34A]"><span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] animate-pulse" />在线</span>
                      : <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-[#F3F4F6] text-[#6B7280]"><span className="w-1.5 h-1.5 rounded-full bg-[#6B7280]" />离线</span>}
                  </td>
                  <td className="py-3 px-3 text-xs text-[#64748B] whitespace-nowrap">
                    {r.offlineAt === "—" ? <span className="text-[#94A3B8]">—</span> : r.offlineAt}
                  </td>
                  <td className="py-3 px-3">
                    {r.deploy === "投放"
                      ? <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#EFF6FF] text-[#2563EB]">投放</span>
                      : <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#FFF7ED] text-[#C2410C]">在库</span>}
                  </td>
                  <td className="py-3 px-3 text-xs text-[#64748B] whitespace-nowrap">{r.installed}</td>
                  <td className="py-3 px-3 sticky right-0 bg-white shadow-[-4px_0_8px_rgba(0,0,0,0.04)]">
                    <div className="flex items-center gap-1 whitespace-nowrap">
                      <button onClick={onDetail} className="text-xs px-2 py-1 rounded text-[#2563EB] hover:bg-[#EFF6FF] transition-colors">设备详情</button>
                      <button onClick={() => handleRemote(r.code)} className="text-xs px-2 py-1 rounded text-[#64748B] border border-[#E2E8F0] hover:bg-[#F1F5F9] transition-colors">远程控制</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination total={DEVICE_ROWS.length} page={1} pageSize={10} />
      </Card>
    </div>
  );
};

// ─── Remote Control Panel ─────────────────────────────────────────────────────
type RemoteFeedback = { msg: string; type: "success" | "warn" | "info" } | null;
const RemoteModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [cooling, setCooling] = useState(true);
  const [tempVal, setTempVal] = useState(6);
  const [lightOn, setLightOn] = useState(true);
  const [voiceOn, setVoiceOn] = useState(true);
  const [volume, setVolume] = useState(60);
  const [locked, setLocked] = useState(false);
  const [feedback, setFeedback] = useState<RemoteFeedback>(null);
  const [pending, setPending] = useState<string | null>(null);

  const exec = (key: string, msg: string, type: "success" | "warn" | "info" = "success", ms = 1000) => {
    setPending(key);
    setFeedback(null);
    setTimeout(() => {
      setPending(null);
      setFeedback({ msg, type });
    }, ms);
  };

  const CmdBtn = ({ id, label, desc, danger = false, onClick }: { id: string; label: string; desc: string; danger?: boolean; onClick: () => void }) => (
    <button
      disabled={pending !== null}
      onClick={onClick}
      className={`flex flex-col gap-1 p-3 rounded-xl border text-left transition-all disabled:opacity-50
        ${pending === id ? "border-[#2563EB] bg-[#EFF6FF]" : danger
          ? "border-[#FECACA] bg-[#FEF2F2] hover:border-[#FCA5A5]"
          : "border-[#E2E8F0] bg-white hover:border-[#BFDBFE] hover:bg-[#F8FAFF]"}`}
    >
      <span className={`text-sm font-semibold ${danger ? "text-[#DC2626]" : pending === id ? "text-[#2563EB]" : "text-[#0F172A]"}`}>
        {pending === id ? "执行中…" : label}
      </span>
      <span className="text-xs text-[#94A3B8] leading-snug">{desc}</span>
    </button>
  );

  return (
    <Modal open={open} onClose={onClose} title="远程指令面板" width={760}
      footer={<Btn variant="secondary" onClick={onClose}>关闭</Btn>}>

      {/* 设备信息头 */}
      <div className="flex items-center justify-between rounded-xl bg-[#0F172A] px-5 py-3.5 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
            <Icon d={Icons.device} size={17} className="text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-sm font-bold text-white">RC-2024-SZ-001</span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold bg-[#16A34A]/20 text-[#4ADE80]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80]" />在线
              </span>
            </div>
            <p className="text-xs text-white/50 mt-0.5">智柜 Pro X8 · 蜂巢·科技园北楼1F-A区</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-white/40">实时温度</div>
          <div className="font-mono text-lg font-bold text-[#4ADE80]">4.2°C</div>
        </div>
      </div>

      {/* 操作反馈条 */}
      {feedback && (
        <div className={`flex items-center gap-2 px-4 py-2.5 rounded-lg mb-4 text-sm
          ${feedback.type === "success" ? "bg-[#F0FDF4] text-[#16A34A] border border-[#BBF7D0]"
          : feedback.type === "warn" ? "bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A]"
          : "bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]"}`}>
          <Icon d={feedback.type === "success" ? Icons.check : Icons.alert} size={15} />
          <span>{feedback.msg}</span>
          <button onClick={() => setFeedback(null)} className="ml-auto opacity-50 hover:opacity-100"><Icon d={Icons.x} size={12} /></button>
        </div>
      )}

      <div className="grid grid-cols-3 gap-4">

        {/* 组一：设备控制 */}
        <div className="col-span-3">
          <div className="text-xs font-semibold text-[#94A3B8] uppercase tracking-widest mb-2">设备控制</div>
          <div className="grid grid-cols-3 gap-2">
            <CmdBtn id="restart" label="重启" desc="远程重启设备，离线片刻后恢复在线" danger
              onClick={() => exec("restart", "重启指令已下发，设备将在片刻后离线并重新上线。", "warn", 1200)} />
            <CmdBtn id="lock" label={locked ? "当前：已锁机" : "锁机"} desc="暂停设备，灯光关闭，无法购买" danger={!locked}
              onClick={() => { setLocked(true); exec("lock", "锁机指令已下发，设备灯光关闭，购物功能暂停。", "warn"); }} />
            <CmdBtn id="unlock" label={!locked ? "当前：已解锁" : "解锁"} desc="解除锁定，恢复设备可用状态"
              onClick={() => { setLocked(false); exec("unlock", "解锁指令已下发，设备已恢复正常可用状态。", "success"); }} />
          </div>
        </div>

        {/* 组二：温控 */}
        <div className="col-span-3 border-t border-[#F1F5F9] pt-4">
          <div className="text-xs font-semibold text-[#94A3B8] uppercase tracking-widest mb-3">温度控制</div>
          <div className="grid grid-cols-2 gap-4">
            {/* 温度开关 */}
            <div className="rounded-xl border border-[#E2E8F0] bg-white p-4">
              <div className="flex items-center justify-between mb-1">
                <div>
                  <div className="text-sm font-semibold text-[#0F172A]">制冷开关</div>
                  <div className="text-xs text-[#94A3B8] mt-0.5">远程开启 / 关闭制冷系统</div>
                </div>
                <Toggle checked={cooling} onChange={() => {
                  setCooling(v => !v);
                  exec("cooling", cooling ? "制冷已关闭。" : "制冷已开启。", "success", 800);
                }} />
              </div>
              {!cooling && <div className="mt-2 text-xs text-[#D97706] bg-[#FFFBEB] border border-[#FDE68A] rounded-lg px-2.5 py-1.5">制冷系统已关闭，请注意柜内温度。</div>}
            </div>
            {/* 温度调节 */}
            <div className="rounded-xl border border-[#E2E8F0] bg-white p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-sm font-semibold text-[#0F172A]">温度调节</div>
                  <div className="text-xs text-[#94A3B8] mt-0.5">目标温度：<span className="font-mono font-bold text-[#2563EB]">{tempVal}℃</span></div>
                </div>
              </div>
              <div className={`space-y-2 ${!cooling ? "opacity-40 pointer-events-none" : ""}`}>
                <input type="range" min={2} max={20} value={tempVal} onChange={e => setTempVal(Number(e.target.value))}
                  className="w-full accent-[#2563EB]" />
                <div className="flex justify-between text-[10px] text-[#94A3B8]"><span>2℃</span><span>20℃</span></div>
                <button disabled={pending !== null} onClick={() => exec("temp", `温度已调整至 ${tempVal}℃，设备将在下次上报时确认。`, "success")}
                  className="w-full py-1.5 rounded-lg bg-[#2563EB] text-white text-xs font-medium hover:bg-[#1D4ED8] disabled:opacity-50 transition-colors">
                  下发温度设定
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 组三：灯光 & 语音 */}
        <div className="col-span-3 border-t border-[#F1F5F9] pt-4">
          <div className="text-xs font-semibold text-[#94A3B8] uppercase tracking-widest mb-3">灯光 & 语音</div>
          <div className="grid grid-cols-2 gap-4">
            {/* 灯光开关 */}
            <div className="rounded-xl border border-[#E2E8F0] bg-white p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-[#0F172A]">灯光开关</div>
                  <div className="text-xs text-[#94A3B8] mt-0.5">远程开启 / 关闭设备灯光</div>
                </div>
                <Toggle checked={lightOn} onChange={() => {
                  setLightOn(v => !v);
                  exec("light", lightOn ? "灯光已关闭。" : "灯光已开启。", "success", 700);
                }} />
              </div>
            </div>
            {/* 语音开关 + 音量 */}
            <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-[#0F172A]">语音开关</div>
                  <div className="text-xs text-[#94A3B8] mt-0.5">控制语音播放开关</div>
                </div>
                <Toggle checked={voiceOn} onChange={() => {
                  setVoiceOn(v => !v);
                  exec("voice", voiceOn ? "语音已关闭。" : "语音已开启。", "success", 700);
                }} />
              </div>
              <div className={`border-t border-[#F1F5F9] pt-3 ${!voiceOn ? "opacity-40 pointer-events-none" : ""}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-[#64748B]">语音音量调节</span>
                  <span className="font-mono text-xs font-bold text-[#2563EB]">{volume}%</span>
                </div>
                <input type="range" min={0} max={100} step={10} value={volume}
                  onChange={e => setVolume(Number(e.target.value))}
                  className="w-full accent-[#2563EB]" />
                <button disabled={pending !== null} onClick={() => exec("vol", `音量已设定为 ${volume}%。`, "success", 600)}
                  className="mt-2 w-full py-1.5 rounded-lg border border-[#E2E8F0] text-xs text-[#64748B] hover:bg-[#F8FAFC] disabled:opacity-50 transition-colors">
                  下发音量
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

// ─── Device Detail ────────────────────────────────────────────────────────────
const DeviceDetail = ({ onBack, onRemote, onWorkOrderDetail }: { onBack: () => void; onRemote: () => void; onWorkOrderDetail?: () => void }) => {
  const [tab, setTab] = useState("hardware");

  const WO_STATUS: Record<string, { bg: string; text: string }> = {
    "待处理": { bg: "bg-[#FFF7ED]", text: "text-[#D97706]" },
    "处理中": { bg: "bg-[#EFF6FF]", text: "text-[#2563EB]" },
    "已完成": { bg: "bg-[#F0FDF4]", text: "text-[#16A34A]" },
    "已取消": { bg: "bg-[#F3F4F6]", text: "text-[#6B7280]" },
  };
  const WoTag = ({ s }: { s: string }) => (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${WO_STATUS[s]?.bg} ${WO_STATUS[s]?.text}`}>{s}</span>
  );

  const TABS = [
    { key: "hardware",  label: "硬件信息" },
    { key: "relation",  label: "关联信息" },
    { key: "cloud",     label: "云端信息" },
    { key: "workorder", label: "工单记录" },
  ];

  return (
    <div>
      <PageHeader
        title="RC-2024-SZ-001"
        breadcrumbs={["首页", "设备台账", "设备详情"]}
        actions={
          <>
            <Btn variant="secondary" icon="chevronLeft" onClick={onBack}>返回列表</Btn>
            <Btn variant="secondary" icon="send" onClick={onRemote}>远程控制</Btn>
          </>
        }
      />

      {/* 顶部摘要 */}
      <Card className="mb-4">
        <div className="flex items-center gap-6">
          <div className="w-14 h-14 rounded-xl bg-[#F1F5F9] flex items-center justify-center flex-shrink-0">
            <Icon d={Icons.device} size={24} className="text-[#64748B]" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <span className="font-mono text-lg font-bold text-[#0F172A]">RC-2024-SZ-001</span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#F0FDF4] text-[#16A34A]"><span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />在线</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#EFF6FF] text-[#2563EB]">投放</span>
            </div>
            <div className="text-sm text-[#64748B]">智柜 Pro X8 · 蜂巢·科技园北楼1F-A区</div>
          </div>
          <div className="grid grid-cols-2 gap-x-10 gap-y-1 text-sm flex-shrink-0">
            <div><span className="text-[#94A3B8] text-xs">资产编码</span><div className="font-mono font-medium text-[#0F172A]">RC-2024-SZ-001</div></div>
            <div><span className="text-[#94A3B8] text-xs">设备型号</span><div className="font-medium text-[#0F172A]">智柜 Pro X8</div></div>
            <div><span className="text-[#94A3B8] text-xs">在线状态</span><div className="font-medium text-[#16A34A]">在线</div></div>
            <div><span className="text-[#94A3B8] text-xs">投放状态</span><div className="font-medium text-[#2563EB]">已投放</div></div>
          </div>
        </div>
      </Card>

      {/* Tab 卡片 */}
      <Card noPad>
        <div className="flex items-center gap-0 border-b border-[#E2E8F0] px-5 pt-1">
          {TABS.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-all whitespace-nowrap ${tab === t.key ? "border-[#2563EB] text-[#2563EB]" : "border-transparent text-[#64748B] hover:text-[#334155]"}`}>
              {t.label}
            </button>
          ))}
        </div>

        <div className="p-5">

          {/* Tab1 硬件信息 */}
          {tab === "hardware" && (
            <div className="space-y-5">
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "设备资产编码", value: <span className="font-mono text-xs bg-[#F1F5F9] px-2 py-0.5 rounded">RC-2024-SZ-001</span> },
                  { label: "设备型号",   value: "智柜 Pro X8" },
                  { label: "尺寸",       value: "600 × 780 × 1820 mm" },
                  { label: "功能属性",   value: <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#EFF6FF] text-[#2563EB]">冷藏</span> },
                  { label: "层板配置",   value: "6层 × 4格，共24格" },
                  { label: "额定电压",   value: <span className="font-mono">220 V</span> },
                  { label: "额定电流",   value: <span className="font-mono">6 A</span> },
                  { label: "额定功率",   value: <span className="font-mono">800 W</span> },
                  { label: "额定功耗",   value: <span className="font-mono">2.4 kWh/24h</span> },
                  { label: "是否有刷脸屏", value: <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-[#F0FDF4] text-[#16A34A]"><Icon d={Icons.check} size={10} />有</span> },
                  { label: "是否有摄像头", value: <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-[#EFF6FF] text-[#2563EB]">有两个</span> },
                ].map(item => (
                  <div key={String(item.label)} className="bg-[#F8FAFC] rounded-lg px-4 py-3 border border-[#F1F5F9]">
                    <div className="text-[10px] font-medium text-[#94A3B8] uppercase tracking-wide mb-1">{item.label}</div>
                    <div className="text-sm font-medium text-[#0F172A]">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab2 关联信息 */}
          {tab === "relation" && (
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-x-12 gap-y-5">
                {[
                  { label: "关联点位", value: <button className="text-[#2563EB] hover:underline font-medium">蜂巢·科技园北楼1F-A区</button> },
                  { label: "安装日期", value: "2024-03-01" },
                  { label: "设备型号", value: "智柜 Pro X8" },
                ].map(item => (
                  <div key={String(item.label)}>
                    <div className="text-xs text-[#94A3B8] mb-1">{item.label}</div>
                    <div className="text-sm text-[#334155]">{item.value}</div>
                  </div>
                ))}
              </div>
              {/* 设备二维码 */}
              <div className="border-t border-[#F1F5F9] pt-5">
                <div className="text-xs text-[#94A3B8] mb-3">设备二维码 — 系统自动生成，包含设备资产编码及基础信息</div>
                <div className="flex items-start gap-5">
                  <div className="w-28 h-28 rounded-xl border-2 border-[#E2E8F0] bg-white p-2 flex-shrink-0">
                    {/* 模拟二维码 SVG */}
                    <svg viewBox="0 0 60 60" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                      {/* 三个定位符 */}
                      <rect x="2" y="2" width="18" height="18" rx="2" fill="none" stroke="#0F172A" strokeWidth="2.5"/>
                      <rect x="6" y="6" width="10" height="10" rx="1" fill="#0F172A"/>
                      <rect x="40" y="2" width="18" height="18" rx="2" fill="none" stroke="#0F172A" strokeWidth="2.5"/>
                      <rect x="44" y="6" width="10" height="10" rx="1" fill="#0F172A"/>
                      <rect x="2" y="40" width="18" height="18" rx="2" fill="none" stroke="#0F172A" strokeWidth="2.5"/>
                      <rect x="6" y="44" width="10" height="10" rx="1" fill="#0F172A"/>
                      {/* 数据模块 */}
                      {[24,26,28,30,32,34,36].map((x, i) => [24,26,28,32,34,36,38,42,44,46,50,52,54].map((y, j) =>
                        (i * 13 + j) % 3 !== 0 ? <rect key={`${x}-${y}`} x={x} y={y} width="2" height="2" fill="#0F172A" /> : null
                      ))}
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-[#0F172A]">RC-2024-SZ-001</div>
                    <div className="text-xs text-[#64748B]">智柜 Pro X8 · 蜂巢·科技园北楼1F-A区</div>
                    <div className="text-xs text-[#94A3B8] font-mono">IMEI: 860123456789001</div>
                    <button className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E2E8F0] text-xs font-medium text-[#334155] hover:bg-[#F1F5F9] transition-colors">
                      <Icon d={Icons.download} size={12} />下载 PNG
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab3 云端信息 */}
          {tab === "cloud" && (
            <div className="space-y-4">
              {/* 监控指标卡 */}
              <div className="grid grid-cols-3 gap-4">
                {/* 在线状态 */}
                <div className="rounded-xl border border-[#BBF7D0] bg-[#F0FDF4] p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-[#16A34A] uppercase tracking-wide">在线状态</span>
                    <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
                  </div>
                  <div className="text-2xl font-bold text-[#16A34A]">在线</div>
                  <div className="text-xs text-[#64748B] mt-1">已连续在线 12 天</div>
                  <div className="text-[10px] text-[#94A3B8] mt-3">最近心跳：2025-09-15 14:32:06</div>
                </div>
                {/* 实时温度 */}
                <div className="rounded-xl border border-[#BFDBFE] bg-[#EFF6FF] p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-[#2563EB] uppercase tracking-wide">实时温度</span>
                    <Icon d={Icons.thermometer} size={14} className="text-[#2563EB]" />
                  </div>
                  <div className="text-2xl font-bold text-[#2563EB] font-mono">4.2°C</div>
                  <div className="text-xs text-[#64748B] mt-1">目标区间 2 ~ 8°C</div>
                  <div className="text-[10px] text-[#94A3B8] mt-3">云端上报 · 每 30 秒刷新</div>
                </div>
                {/* 实时功率 */}
                <div className="rounded-xl border border-[#E9D5FF] bg-[#F5F3FF] p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-[#7C3AED] uppercase tracking-wide">实时功率</span>
                    <Icon d={Icons.zap} size={14} className="text-[#7C3AED]" />
                  </div>
                  <div className="text-2xl font-bold text-[#7C3AED] font-mono">312 W</div>
                  <div className="text-xs text-[#64748B] mt-1">额定功率 800 W</div>
                  <div className="text-[10px] text-[#94A3B8] mt-3">云端上报 · 每 30 秒刷新</div>
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#64748B]">
                <Icon d={Icons.info} size={13} className="text-[#94A3B8]" />
                以上数据来自设备云端上报，最后同步时间：<strong className="text-[#334155]">2025-09-15 14:30:00</strong>
              </div>
            </div>
          )}

          {/* Tab4 工单记录 */}
          {tab === "workorder" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-[#0F172A]">设备生命周期服务记录</span>
                  <span className="text-xs text-[#94A3B8] bg-[#F1F5F9] px-2 py-0.5 rounded-full">一期仅展示装机工单</span>
                </div>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                    {["工单号","工单类型","工单状态","处理人","处理时间","操作"].map(h => (
                      <th key={h} className="py-2.5 px-3 text-left text-xs font-medium text-[#64748B]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: "WO-2024-0301-001", type: "装机工单", status: "已完成", handler: "刘工",   time: "2024-03-01 14:30" },
                    { id: "WO-2024-0928-015", type: "装机工单", status: "待处理", handler: "—",      time: "—" },
                    { id: "WO-2025-0120-003", type: "装机工单", status: "处理中", handler: "张工",   time: "—" },
                    { id: "WO-2023-1210-088", type: "装机工单", status: "已取消", handler: "系统",   time: "2023-12-10 09:00" },
                  ].map((w, i) => (
                    <tr key={w.id} className={`border-b border-[#F1F5F9] hover:bg-[#F8FAFC] ${i === 3 ? "border-b-0" : ""}`}>
                      <td className="py-3 px-3">
                        <button className="font-mono text-xs text-[#2563EB] hover:underline">{w.id}</button>
                      </td>
                      <td className="py-3 px-3 text-[#334155]">{w.type}</td>
                      <td className="py-3 px-3"><WoTag s={w.status} /></td>
                      <td className="py-3 px-3 text-[#334155]">{w.handler}</td>
                      <td className="py-3 px-3 text-xs text-[#64748B]">{w.time}</td>
                      <td className="py-3 px-3">
                        <button onClick={onWorkOrderDetail} className="text-xs px-2 py-1 rounded border border-[#E2E8F0] text-[#64748B] hover:bg-[#F1F5F9] transition-colors">查看详情</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </Card>
    </div>
  );
};

// ─── Product List ─────────────────────────────────────────────────────────────
const PRODUCT_CAT1 = ["饮料", "零食", "速食", "乳品", "个护", "文具"];
const PRODUCT_CAT2: Record<string, string[]> = {
  "饮料": ["碳酸饮料", "果汁", "茶饮料", "功能饮料", "水/矿泉水"],
  "零食": ["膨化食品", "坚果", "糖果", "饼干", "肉类零食"],
  "速食": ["方便面", "自热食品", "冲泡粥", "即食汤"],
  "乳品": ["牛奶", "酸奶", "奶酪"],
  "个护": ["洗护", "口腔", "纸巾"],
  "文具": ["笔类", "本册", "胶带"],
};
const PRODUCT_TAGS = ["新品", "热销", "低库存", "促销", "限时特惠", "应季推荐"];

const ProductList = ({ onAdd, onCopy, onBatchOff, onPreset, onRestock, onDetail }: {
  onAdd: () => void; onCopy: () => void; onBatchOff: () => void; onPreset: () => void; onRestock: () => void; onDetail: () => void;
}) => {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const toggle = (id: string) => setSelected(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const [cat1, setCat1] = useState("");
  const [productStatus, setProductStatus] = useState("on");

  return (
    <div>
      <PageHeader
        title="智能柜商品库"
        breadcrumbs={["首页", "商品与库存", "商品库"]}
        actions={
          <>
            <Btn variant="secondary" icon="copy" onClick={onCopy}>复制商品库</Btn>
            <Btn variant="secondary" icon="download">导出</Btn>
            <Btn variant="primary" icon="plus" onClick={onAdd}>上架商品</Btn>
          </>
        }
      />
      <div className="grid grid-cols-4 gap-4 mb-4">
        <StatCard label="在库SKU" value="86" sub="已上架 72 个" color="#2563EB" icon="package" />
        <StatCard label="低库存告警" value="8" sub="需及时补货" color="#D97706" icon="alert" />
        <StatCard label="本月动销率" value="76%" sub="较上月 +3.2%" color="#16A34A" icon="barChart" />
        <StatCard label="今日销售额" value="¥8,460" sub="1,682 笔" color="#7C3AED" icon="zap" />
      </div>
      <FilterBar>
        <FilterField label="商品名称/编码">
          <Input placeholder="名称或编码模糊搜索" icon="search" className="w-52" />
        </FilterField>
        <FilterField label="一级类目">
          <Select
            className="w-32"
            options={[{label:"全部",value:""},...PRODUCT_CAT1.map(c=>({label:c,value:c}))]}
            value={cat1}
            onChange={v => setCat1(v)}
          />
        </FilterField>
        <FilterField label="二级类目">
          <Select
            className="w-32"
            options={cat1 && PRODUCT_CAT2[cat1]
              ? [{label:"全部",value:""},...(PRODUCT_CAT2[cat1] ?? []).map(c=>({label:c,value:c}))]
              : [{label:"请先选一级类目",value:""}]}
          />
        </FilterField>
        <FilterField label="标签">
          <Select
            className="w-28"
            options={[{label:"全部",value:""},...PRODUCT_TAGS.map(t=>({label:t,value:t}))]}
          />
        </FilterField>
        <FilterField label="商品状态">
          <Select
            className="w-24"
            value={productStatus}
            onChange={v => setProductStatus(v)}
            options={[{label:"上架",value:"on"},{label:"下架",value:"off"}]}
          />
        </FilterField>
        <div className="flex items-end gap-2">
          <Btn variant="primary" icon="search">查询</Btn>
          <Btn variant="secondary" onClick={() => { setCat1(""); setProductStatus("on"); }}>重置</Btn>
        </div>
      </FilterBar>
      <BatchBar count={selected.size} actions={
        <>
          <Btn variant="ghost" size="sm" onClick={onBatchOff}>批量下架</Btn>
          <Btn variant="ghost" size="sm" onClick={onPreset}>批量设置预存量</Btn>
          <Btn variant="ghost" size="sm" onClick={onRestock} icon="truck">发起补货单</Btn>
        </>
      } />
      <Card noPad>
        <Table
          selectable selected={selected} onSelect={toggle}
          cols={[
            {key:"sku",label:"SKU编号",render:r=><span className="font-mono text-xs text-[#64748B]">{r.sku}</span>},
            {key:"name",label:"商品名称",render:r=><button onClick={onDetail} className="text-[#2563EB] hover:underline font-medium text-left max-w-[160px] block">{r.name}</button>},
            {key:"category",label:"分类"},
            {key:"price",label:"零售价",render:r=><span className="font-semibold text-[#0F172A]">¥{r.price.toFixed(2)}</span>},
            {key:"cost",label:"成本价",render:r=><span className="text-[#64748B]">¥{r.cost.toFixed(2)}</span>},
            {key:"stock",label:"当前库存",render:r=>(
              <span className={`font-medium ${r.stock === 0 ? "text-[#DC2626]" : r.stock < 50 ? "text-[#D97706]" : "text-[#0F172A]"}`}>
                {r.stock}
              </span>
            )},
            {key:"preset",label:"预存量"},
            {key:"turnover",label:"动销率",render:r=>(
              <div className="flex items-center gap-2">
                <div className="w-16 h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{
                    width:`${r.turnover}%`,
                    background: r.turnover >= 80 ? "#16A34A" : r.turnover >= 50 ? "#D97706" : "#DC2626"
                  }} />
                </div>
                <span className="text-xs font-medium">{r.turnover}%</span>
              </div>
            )},
            {key:"locations",label:"上架点位",render:r=><span className="text-[#64748B]">{r.locations} 个</span>},
            {key:"status",label:"状态",render:r=><Badge label={r.status} color={r.status==="上架"?"green":r.status==="库存告警"?"yellow":"gray"} />},
            {key:"actions",label:"操作",render:r=>(
              <div className="flex gap-1">
                <Btn variant="ghost" size="sm" onClick={onDetail}>详情</Btn>
                <Btn variant="ghost" size="sm">编辑</Btn>
                {r.status==="上架"?<Btn variant="ghost" size="sm" className="!text-[#DC2626]">下架</Btn>:<Btn variant="ghost" size="sm" className="!text-[#16A34A]">上架</Btn>}
              </div>
            )},
          ]}
          rows={PRODUCTS}
        />
        <Pagination total={86} page={1} pageSize={10} />
      </Card>
    </div>
  );
};

// ─── Product Add ──────────────────────────────────────────────────────────────
const ProductAdd = ({ onBack }: { onBack: () => void }) => {
  const [step, setStep] = useState(0);
  return (
    <div>
      <PageHeader
        title="上架商品"
        breadcrumbs={["首页", "商品库", "上架商品"]}
        actions={<Btn variant="secondary" icon="chevronLeft" onClick={onBack}>返回列表</Btn>}
      />
      <Card>
        <StepBar steps={["商品基本信息", "定价与库存", "关联设备点位", "确认上架"]} current={step} />
        {step === 0 && (
          <div className="max-w-xl">
            <FormRow label="商品名称" required><Input placeholder="请输入商品名称" /></FormRow>
            <FormRow label="SKU编号" required hint="输入已有SKU或系统自动生成"><Input placeholder="SKU-XXXX-000" /></FormRow>
            <FormRow label="商品分类" required>
              <Select options={[{label:"请选择分类",value:""},{label:"饮料",value:"drink"},{label:"零食",value:"snack"},{label:"速食",value:"meal"},{label:"乳品",value:"dairy"}]} />
            </FormRow>
            <FormRow label="商品品牌"><Input placeholder="请输入品牌名称" /></FormRow>
            <FormRow label="规格描述" hint="如：330ml / 75g / 200g"><Input placeholder="请填写规格" /></FormRow>
            <FormRow label="商品图片" required>
              <div className="w-28 h-28 border-2 border-dashed border-[#E2E8F0] rounded-lg flex flex-col items-center justify-center text-[#94A3B8] gap-1.5 hover:border-[#2563EB] hover:text-[#2563EB] cursor-pointer transition-colors">
                <Icon d={Icons.upload} size={20} />
                <span className="text-xs">上传图片</span>
              </div>
            </FormRow>
            <FormRow label="商品描述"><textarea placeholder="填写商品简介" rows={3} className="w-full border border-[#E2E8F0] rounded-md text-sm px-3 py-2 text-[#334155] placeholder-[#94A3B8] resize-none focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#DBEAFE]" /></FormRow>
          </div>
        )}
        {step === 1 && (
          <div className="max-w-xl">
            <FormRow label="零售价" required hint="建议设置合理利润空间">
              <div className="flex items-center gap-2"><span className="text-[#64748B] text-sm">¥</span><Input placeholder="0.00" /></div>
            </FormRow>
            <FormRow label="成本价"><div className="flex items-center gap-2"><span className="text-[#64748B] text-sm">¥</span><Input placeholder="0.00" /></div></FormRow>
            <FormRow label="预存量" required hint="每台设备建议存放数量"><Input placeholder="如：24" /></FormRow>
            <FormRow label="最低库存告警值" hint="低于此值时触发补货提醒"><Input placeholder="如：6" /></FormRow>
            <FormRow label="保质期" hint="天，影响补货策略判断"><Input placeholder="如：180" /></FormRow>
          </div>
        )}
        {step === 2 && (
          <div>
            <AlertBanner type="info" msg="选择需要上架此商品的设备点位。未选择的点位将不会补货此商品。" />
            <Table cols={[
              {key:"id",label:"点位编号"},
              {key:"name",label:"点位名称"},
              {key:"customer",label:"所属客户"},
              {key:"type",label:"场景类型"},
              {key:"devices",label:"设备数"},
              {key:"check",label:"选择",render:()=><input type="checkbox" className="w-4 h-4 accent-[#2563EB]" />},
            ]} rows={LOCATIONS} selectable={false} />
          </div>
        )}
        {step === 3 && (
          <div className="max-w-xl">
            <AlertBanner type="success" msg="信息已填写完毕，请确认以下内容后点击「确认上架」" />
            <InfoGrid items={[
              {label:"商品名称", value:"可口可乐 330ml"},
              {label:"SKU", value:<span className="font-mono text-xs">SKU-DRINK-099</span>},
              {label:"分类", value:"饮料"},
              {label:"零售价", value:<span className="text-[#0F172A] font-semibold">¥4.50</span>},
              {label:"成本价", value:"¥2.20"},
              {label:"预存量", value:"30 件/台"},
              {label:"关联点位", value:"5 个"},
            ]} />
          </div>
        )}
        <div className="flex gap-3 mt-6 pt-5 border-t border-[#E2E8F0]">
          {step > 0 && <Btn variant="secondary" onClick={() => setStep(s => s - 1)} icon="chevronLeft">上一步</Btn>}
          {step < 3
            ? <Btn variant="primary" onClick={() => setStep(s => s + 1)}>下一步 <Icon d={Icons.chevronRight} size={14} /></Btn>
            : <Btn variant="primary">确认上架</Btn>
          }
          <Btn variant="ghost" onClick={onBack}>取消</Btn>
        </div>
      </Card>
    </div>
  );
};

// ─── Copy Library Modal ───────────────────────────────────────────────────────
const CopyLibraryModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => (
  <Modal open={open} onClose={onClose} title="复制商品库" width={500}
    footer={<><Btn variant="secondary" onClick={onClose}>取消</Btn><Btn variant="primary">确认复制</Btn></>}
  >
    <AlertBanner type="info" msg="复制后将在目标客户下创建全新商品库副本，价格和预存量可独立修改，不影响原库。" />
    <FormRow label="来源商品库" required><Input value="华南区通用商品库 V2（蜂巢智能科技）" disabled /></FormRow>
    <FormRow label="复制至客户" required>
      <Select options={[{label:"请选择客户",value:""},...CUSTOMERS.map(c=>({label:c.name.slice(0,12),value:c.id}))]} />
    </FormRow>
    <FormRow label="新商品库名称" required hint="建议命名规范：区域+客户简称+版本号">
      <Input placeholder="如：华南区-盒里科技-V1" />
    </FormRow>
    <FormRow label="价格策略">
      <Select options={[{label:"保持原价不变",value:"keep"},{label:"统一下调 5%",value:"down5"},{label:"手动逐一调整",value:"manual"}]} />
    </FormRow>
    <FormRow label="复制范围">
      <div className="flex flex-col gap-2">
        {["复制所有商品（含下架）", "仅复制上架商品", "仅复制指定分类"].map((o, i) => (
          <label key={i} className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="range" defaultChecked={i === 1} className="accent-[#2563EB]" />
            <span className="text-sm text-[#334155]">{o}</span>
          </label>
        ))}
      </div>
    </FormRow>
  </Modal>
);

// ─── Batch Offline Modal ──────────────────────────────────────────────────────
const BatchOfflineModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => (
  <Modal open={open} onClose={onClose} title="批量下架确认" width={480}
    footer={<><Btn variant="secondary" onClick={onClose}>取消</Btn><Btn variant="danger">确认下架</Btn></>}
  >
    <AlertBanner type="warning" msg="下架后商品将从所有关联设备中移除，不再参与补货计划，历史销售数据保留。" />
    <div className="border border-[#E2E8F0] rounded-lg divide-y divide-[#F1F5F9] mb-4">
      {PRODUCTS.slice(0, 3).map(p => (
        <div key={p.id} className="flex items-center justify-between px-4 py-3">
          <div>
            <div className="text-sm font-medium text-[#0F172A]">{p.name}</div>
            <div className="text-xs text-[#94A3B8] font-mono">{p.sku}</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-[#64748B]">关联 {p.locations} 个点位</div>
            <div className="text-xs text-[#94A3B8]">库存 {p.stock} 件</div>
          </div>
        </div>
      ))}
    </div>
    <div className="text-sm text-[#64748B]">共 <strong className="text-[#0F172A]">3</strong> 件商品将被下架，影响 <strong className="text-[#0F172A]">38</strong> 个点位。</div>
  </Modal>
);

// ─── Preset Page ──────────────────────────────────────────────────────────────
const PresetPage = ({ onBack }: { onBack: () => void }) => (
  <div>
    <PageHeader
      title="批量设置预存量"
      breadcrumbs={["首页", "商品库", "批量设置预存量"]}
      actions={<Btn variant="secondary" icon="chevronLeft" onClick={onBack}>返回</Btn>}
    />
    <AlertBanner type="info" msg="以下商品的预存量将统一更新到所选设备点位的补货计划中。修改后下次补货单生成时生效。" />
    <Card>
      <SectionTitle title="选择适用点位" />
      <div className="flex flex-wrap gap-2 mb-5">
        {LOCATIONS.map(l => (
          <label key={l.id} className="flex items-center gap-1.5 px-3 py-1.5 border border-[#E2E8F0] rounded-md cursor-pointer hover:border-[#2563EB] has-[:checked]:border-[#2563EB] has-[:checked]:bg-[#EFF6FF] text-sm transition-all">
            <input type="checkbox" defaultChecked className="accent-[#2563EB]" />
            {l.name.slice(0, 10)}...
          </label>
        ))}
      </div>
      <div className="border-t border-[#E2E8F0] pt-5">
        <SectionTitle title="设置商品预存量" />
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#64748B] uppercase">商品名称</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#64748B] uppercase">SKU</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#64748B] uppercase">当前预存量</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#64748B] uppercase">新预存量</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#64748B] uppercase">告警阈值</th>
            </tr>
          </thead>
          <tbody>
            {PRODUCTS.slice(0, 6).map((p, i) => (
              <tr key={p.id} className="border-b border-[#F1F5F9] hover:bg-[#F8FAFC]">
                <td className="px-4 py-3 text-[#0F172A] font-medium">{p.name}</td>
                <td className="px-4 py-3 font-mono text-xs text-[#64748B]">{p.sku}</td>
                <td className="px-4 py-3 text-[#64748B]">{p.preset}</td>
                <td className="px-4 py-3">
                  <input type="number" defaultValue={p.preset} className="w-20 h-8 border border-[#E2E8F0] rounded text-sm text-center focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#DBEAFE]" />
                </td>
                <td className="px-4 py-3">
                  <input type="number" defaultValue={Math.round(p.preset * 0.25)} className="w-20 h-8 border border-[#E2E8F0] rounded text-sm text-center focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#DBEAFE]" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex gap-3 mt-5 pt-5 border-t border-[#E2E8F0]">
        <Btn variant="primary">保存设置</Btn>
        <Btn variant="secondary" onClick={onBack}>取消</Btn>
      </div>
    </Card>
  </div>
);

// ─── Restock Page ─────────────────────────────────────────────────────────────
const RestockPage = ({ onBack }: { onBack: () => void }) => {
  const [step, setStep] = useState(0);
  return (
    <div>
      <PageHeader
        title="发起补货单"
        breadcrumbs={["首页", "商品库", "发起补货单"]}
        actions={<Btn variant="secondary" icon="chevronLeft" onClick={onBack}>返回</Btn>}
      />
      <Card>
        <StepBar steps={["选择设备点位", "确认商品与数量", "选择仓库与路线", "提交补货单"]} current={step} />
        {step === 0 && (
          <div>
            <AlertBanner type="info" msg="请选择本次需要补货的设备点位，系统将根据预存量与当前库存自动推荐补货数量。" />
            <Table cols={[
              {key:"id",label:"点位编号"},
              {key:"name",label:"点位名称"},
              {key:"customer",label:"所属客户"},
              {key:"devices",label:"设备数"},
              {key:"status",label:"状态",render:r=><Badge label={r.status} color={r.status==="运营中"?"green":"gray"} />},
              {key:"pick",label:"选择",render:()=><input type="checkbox" defaultChecked className="w-4 h-4 accent-[#2563EB]" />},
            ]} rows={LOCATIONS.slice(0,4)} />
          </div>
        )}
        {step === 1 && (
          <div>
            <AlertBanner type="info" msg="以下数量由系统根据「预存量 - 当前库存」自动计算，可手动调整。" />
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                  {["商品名称","SKU","预存量","当前库存","建议补货量","实际补货量","备注"].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[#64748B] uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PRODUCTS.slice(0,6).map(p => {
                  const suggest = Math.max(0, p.preset - Math.round(p.stock / 8));
                  return (
                    <tr key={p.id} className="border-b border-[#F1F5F9] hover:bg-[#F8FAFC]">
                      <td className="px-4 py-3 font-medium text-[#0F172A]">{p.name}</td>
                      <td className="px-4 py-3 font-mono text-xs text-[#64748B]">{p.sku}</td>
                      <td className="px-4 py-3 text-[#64748B]">{p.preset}</td>
                      <td className="px-4 py-3"><span className={p.stock < 30 ? "text-[#DC2626] font-medium" : ""}>{Math.round(p.stock/8)}</span></td>
                      <td className="px-4 py-3"><span className="text-[#2563EB] font-medium">{suggest}</span></td>
                      <td className="px-4 py-3"><input type="number" defaultValue={suggest} className="w-16 h-7 border border-[#E2E8F0] rounded text-sm text-center focus:outline-none focus:border-[#2563EB]" /></td>
                      <td className="px-4 py-3"><Input placeholder="备注" className="w-28" /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        {step === 2 && (
          <div className="max-w-xl space-y-1">
            <FormRow label="出货仓库" required>
              <Select options={[{label:"华南中心仓（深圳）",value:"sz"},{label:"华东中心仓（上海）",value:"sh"},{label:"华北中心仓（北京）",value:"bj"}]} />
            </FormRow>
            <FormRow label="配送路线" required>
              <Select options={[{label:"华南-深圳-南山路线 03",value:"r03"},{label:"华南-深圳-宝安路线 07",value:"r07"}]} />
            </FormRow>
            <FormRow label="配送司机">
              <Select options={[{label:"自动分配",value:"auto"},{label:"李师傅（粤B-12345）",value:"d1"},{label:"张司机（粤A-88765）",value:"d2"}]} />
            </FormRow>
            <FormRow label="期望配送时间">
              <Input type="datetime-local" placeholder="" />
            </FormRow>
            <FormRow label="补货备注"><textarea rows={3} placeholder="填写特殊说明" className="w-full border border-[#E2E8F0] rounded-md text-sm px-3 py-2 resize-none focus:outline-none focus:border-[#2563EB]" /></FormRow>
          </div>
        )}
        {step === 3 && (
          <div className="max-w-xl">
            <AlertBanner type="success" msg="补货单信息已填写完毕，提交后将进入调度流程，状态变为「待分车」" />
            <InfoGrid items={[
              {label:"涉及点位", value:"4 个"},
              {label:"总SKU数", value:"6 种"},
              {label:"总补货量", value:"108 件"},
              {label:"出货仓库", value:"华南中心仓（深圳）"},
              {label:"配送路线", value:"华南-深圳-南山路线 03"},
              {label:"期望配送", value:"2025-09-11 10:00"},
            ]} />
          </div>
        )}
        <div className="flex gap-3 mt-6 pt-5 border-t border-[#E2E8F0]">
          {step > 0 && <Btn variant="secondary" onClick={() => setStep(s => s - 1)} icon="chevronLeft">上一步</Btn>}
          {step < 3
            ? <Btn variant="primary" onClick={() => setStep(s => s + 1)}>下一步</Btn>
            : <Btn variant="primary" icon="send">提交补货单</Btn>
          }
          <Btn variant="ghost" onClick={onBack}>取消</Btn>
        </div>
      </Card>
    </div>
  );
};

// ─── Order List ───────────────────────────────────────────────────────────────
const OrderList = ({ onModify, onReturn }: { onModify: () => void; onReturn: () => void }) => {
  const ORDER_STATUSES = ["待分车","分车中","待分拣","分拣中","待配送","配送中","履约完成","履约失败","已取消"];
  const [activeStatus, setActiveStatus] = useState("");

  return (
    <div>
      <PageHeader
        title="补货单列表"
        breadcrumbs={["首页", "履约管理", "补货单"]}
        actions={<Btn variant="secondary" icon="download">导出</Btn>}
      />
      <div className="grid grid-cols-5 gap-3 mb-4">
        {[
          {label:"今日补货单", value:12, color:"#2563EB"},
          {label:"配送中", value:4, color:"#0891B2"},
          {label:"待处理", value:3, color:"#D97706"},
          {label:"今日完成", value:5, color:"#16A34A"},
          {label:"履约失败", value:1, color:"#DC2626"},
        ].map(s => <StatCard key={s.label} label={s.label} value={s.value} color={s.color} icon="order" />)}
      </div>

      <Card className="mb-4">
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setActiveStatus("")}
            className={`px-3 py-1.5 rounded-md text-sm font-medium border transition-all ${activeStatus === "" ? "bg-[#2563EB] text-white border-[#2563EB]" : "border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFC]"}`}>
            全部状态
          </button>
          {ORDER_STATUSES.map(s => (
            <button key={s} onClick={() => setActiveStatus(s)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium border transition-all ${activeStatus === s ? "bg-[#2563EB] text-white border-[#2563EB]" : "border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFC]"}`}>
              {s}
            </button>
          ))}
        </div>
      </Card>

      <FilterBar>
        <FilterField label="补货单号/编码"><Input placeholder="输入补货单号模糊搜索" icon="search" className="w-52" /></FilterField>
        <FilterField label="关联客户"><Select options={[{label:"全部客户",value:""},...CUSTOMERS.slice(0,4).map(c=>({label:c.name.slice(0,8),value:c.id}))]} className="w-36" /></FilterField>
        <FilterField label="补货类型"><Select options={[{label:"全部类型",value:""},{label:"常规补货",value:"normal"},{label:"紧急补货",value:"urgent"},{label:"尝新补货",value:"new"}]} className="w-28" /></FilterField>
        <FilterField label="创建时间">
          <div className="flex items-center gap-1">
            <input type="date" className="h-9 border border-[#E2E8F0] rounded-md text-sm px-3 text-[#334155] focus:outline-none focus:border-[#2563EB]" />
            <span className="text-[#94A3B8] text-xs">~</span>
            <input type="date" className="h-9 border border-[#E2E8F0] rounded-md text-sm px-3 text-[#334155] focus:outline-none focus:border-[#2563EB]" />
          </div>
        </FilterField>
        <div className="flex items-end gap-2">
          <Btn variant="primary" icon="search">查询</Btn>
          <Btn variant="secondary">重置</Btn>
        </div>
      </FilterBar>

      <Card noPad>
        <Table
          cols={[
            {key:"id",label:"补货单号",render:r=><span className="font-mono text-xs text-[#334155]">{r.id}</span>},
            {key:"type",label:"类型",render:r=><Badge label={r.type} color={r.type==="紧急补货"?"red":r.type==="尝新补货"?"purple":"gray"} />},
            {key:"customer",label:"所属客户"},
            {key:"location",label:"配送点位"},
            {key:"device",label:"设备SN",render:r=><span className="font-mono text-xs text-[#64748B]">{r.device}</span>},
            {key:"skuCount",label:"SKU数",render:r=><span className="font-medium">{r.skuCount} 种</span>},
            {key:"total",label:"货值",render:r=><span className="font-semibold text-[#0F172A]">¥{r.total.toLocaleString()}</span>},
            {key:"status",label:"状态",render:r=>orderStatusBadge(r.status)},
            {key:"driver",label:"配送员"},
            {key:"created",label:"创建时间",render:r=><span className="text-xs text-[#64748B]">{r.created}</span>},
            {key:"actions",label:"操作",render:r=>(
              <div className="flex gap-1">
                <Btn variant="ghost" size="sm">查看</Btn>
                {(r.status==="待分车"||r.status==="分车中"||r.status==="待分拣") && <Btn variant="ghost" size="sm" onClick={onModify}>修改</Btn>}
                {(r.status==="待分车"||r.status==="分车中") && <Btn variant="ghost" size="sm" onClick={onReturn} className="!text-[#DC2626]">退单</Btn>}
              </div>
            )},
          ]}
          rows={ORDERS}
        />
        <Pagination total={42} page={1} pageSize={10} />
      </Card>
    </div>
  );
};

// ─── Order Modify ─────────────────────────────────────────────────────────────
const OrderModify = ({ onBack }: { onBack: () => void }) => (
  <div>
    <PageHeader
      title="修改补货单"
      breadcrumbs={["首页", "补货单", "修改补货单"]}
      actions={<Btn variant="secondary" icon="chevronLeft" onClick={onBack}>返回</Btn>}
    />
    <div className="grid grid-cols-3 gap-4">
      <Card className="col-span-1">
        <SectionTitle title="补货单信息" />
        <InfoGrid cols={1} items={[
          {label:"补货单号", value:<span className="font-mono text-xs">RO-20250910-0002</span>},
          {label:"补货类型", value:<Badge label="紧急补货" color="red" />},
          {label:"当前状态", value:orderStatusBadge("待分车")},
          {label:"所属客户", value:"格林购物科技"},
          {label:"配送点位", value:"北京国贸中心 3 期"},
          {label:"目标设备", value:<span className="font-mono text-xs">RC-2024-BJ-003</span>},
          {label:"创建时间", value:"2025-09-10 09:30"},
        ]} />
      </Card>
      <Card className="col-span-2">
        <SectionTitle title="商品明细（可修改数量）" />
        <AlertBanner type="warning" msg="补货单处于「待分车」状态，仍可修改商品数量，分车开始后将锁定。" />
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
              {["商品名称","SKU","单价","原数量","修改后数量","小计"].map(h=>(
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[#64748B] uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PRODUCTS.slice(0,5).map(p=>(
              <tr key={p.id} className="border-b border-[#F1F5F9] hover:bg-[#F8FAFC]">
                <td className="px-4 py-3 font-medium text-[#0F172A]">{p.name}</td>
                <td className="px-4 py-3 font-mono text-xs text-[#64748B]">{p.sku}</td>
                <td className="px-4 py-3">¥{p.price.toFixed(2)}</td>
                <td className="px-4 py-3 text-[#64748B]">{p.preset}</td>
                <td className="px-4 py-3">
                  <input type="number" defaultValue={p.preset} className="w-16 h-7 border border-[#E2E8F0] rounded text-sm text-center focus:outline-none focus:border-[#2563EB]" />
                </td>
                <td className="px-4 py-3 font-semibold">¥{(p.price * p.preset).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#E2E8F0]">
          <div className="text-sm text-[#64748B]">共 5 种商品</div>
          <div className="text-base font-bold text-[#0F172A]">合计：¥680.00</div>
        </div>
        <div className="flex gap-3 mt-5 pt-4 border-t border-[#E2E8F0]">
          <Btn variant="primary">保存修改</Btn>
          <Btn variant="secondary" onClick={onBack}>取消</Btn>
        </div>
      </Card>
    </div>
  </div>
);

// ══════════════════════════════════════════════════════════════════════════════
// 销售订单管理
// ══════════════════════════════════════════════════════════════════════════════

// ── Data ──────────────────────────────────────────────────────────────────────
const RETAIL_CUSTOMERS = ["蜂巢智能科技","格林购物科技","桔仔自动贩卖","云聚零售","万象智贩","盒里科技"];

type RetailOrder = {
  id: string; site: string; siteCode: string; deviceCode: string; customer: string;
  goodsName: string; goodsQty: number; amount: number; payMethod: "微信" | "支付宝";
  status: "待支付" | "已支付" | "已完成" | "已取消" | "已退款" | "标记异常";
  orderTime: string; payTime: string; uuid: string; phone: string; payNo: string; paidAmount: number;
};
const RETAIL_ORDERS: RetailOrder[] = [
  { id:"SO-20260916-0001", site:"静安寺商圈A座大堂", siteCode:"SITE-SH-011", deviceCode:"RC-2026-SH-011", customer:"蜂巢智能科技", goodsName:"可口可乐 330ml 等 3 件", goodsQty:3, amount:14.5, payMethod:"微信", status:"已完成", orderTime:"09-16 09:12", payTime:"09-16 09:12", uuid:"u_8f2a3c9d", phone:"138****3301", payNo:"wx20260916091234", paidAmount:14.5 },
  { id:"SO-20260916-0002", site:"虹桥天地B1餐饮区", siteCode:"SITE-SH-002", deviceCode:"RC-2026-SH-002", customer:"格林购物科技", goodsName:"农夫山泉 550ml", goodsQty:1, amount:3.0, payMethod:"支付宝", status:"已支付", orderTime:"09-16 09:30", payTime:"09-16 09:31", uuid:"u_4b1e7f0a", phone:"139****8821", payNo:"ali20260916093112", paidAmount:3.0 },
  { id:"SO-20260916-0003", site:"陆家嘴金融中心1号楼", siteCode:"SITE-SH-003", deviceCode:"RC-2026-SH-003", customer:"桔仔自动贩卖", goodsName:"乐事薯片 75g 等 2 件", goodsQty:2, amount:12.0, payMethod:"微信", status:"已退款", orderTime:"09-15 17:04", payTime:"09-15 17:05", uuid:"u_9c3d2a1b", phone:"137****6614", payNo:"wx20260915170512", paidAmount:0 },
  { id:"SO-20260916-0004", site:"徐汇滨江C栋办公区", siteCode:"SITE-SH-007", deviceCode:"RC-2026-SH-007", customer:"云聚零售", goodsName:"元气森林苏打水 480ml", goodsQty:1, amount:6.0, payMethod:"支付宝", status:"标记异常", orderTime:"09-15 14:22", payTime:"09-15 14:23", uuid:"u_2e8f5c6d", phone:"136****4427", payNo:"ali20260915142301", paidAmount:6.0 },
  { id:"SO-20260916-0005", site:"静安寺商圈A座大堂", siteCode:"SITE-SH-011", deviceCode:"RC-2026-SH-011", customer:"万象智贩", goodsName:"旺旺雪饼 180g", goodsQty:1, amount:7.5, payMethod:"微信", status:"待支付", orderTime:"09-16 10:01", payTime:"—", uuid:"u_6a1c4e2f", phone:"135****9912", payNo:"—", paidAmount:0 },
  { id:"SO-20260916-0006", site:"虹桥天地B1餐饮区", siteCode:"SITE-SH-002", deviceCode:"RC-2026-SH-002", customer:"盒里科技", goodsName:"康师傅冰红茶 500ml 等 4 件", goodsQty:4, amount:18.0, payMethod:"微信", status:"已完成", orderTime:"09-16 08:45", payTime:"09-16 08:46", uuid:"u_3f7b9e0c", phone:"187****2203", payNo:"wx20260916084601", paidAmount:18.0 },
];

const RETAIL_SKUS = [
  { name:"可口可乐 330ml", barcode:"6901234560011", spec:"330ml 罐装", category:"饮料", type:"碳酸饮料", qty:2, price:4.5 },
  { name:"乐事薯片原味", barcode:"6901234560033", spec:"75g 袋装",  category:"零食", type:"薯片",    qty:1, price:6.5 },
];

const SO_STATUS_COLOR: Record<RetailOrder["status"], "blue"|"green"|"cyan"|"gray"|"red"|"orange"> = {
  "待支付":"blue","已支付":"cyan","已完成":"green","已取消":"gray","已退款":"orange","标记异常":"red",
};

type RefundOrder = {
  refundNo: string; orderId: string; site: string; customer: string;
  refundAmount: number; reason: string;
  status: "待处理" | "退款成功" | "退款失败";
  applyTime: string; orderAmount: number; payMethod: "微信"|"支付宝"; payTime: string;
};
const REFUND_ORDERS: RefundOrder[] = [
  { refundNo:"RF-20260916-001", orderId:"SO-20260916-0003", site:"陆家嘴金融中心1号楼", customer:"桔仔自动贩卖", refundAmount:12.0, reason:"商品质量问题", status:"待处理", applyTime:"09-16 10:05", orderAmount:12.0, payMethod:"微信", payTime:"09-15 17:05" },
  { refundNo:"RF-20260915-002", orderId:"SO-20260915-0088", site:"虹桥天地B1餐饮区", customer:"格林购物科技", refundAmount:6.0, reason:"商品已过期", status:"退款成功", applyTime:"09-15 18:30", orderAmount:6.0, payMethod:"支付宝", payTime:"09-15 15:11" },
  { refundNo:"RF-20260914-003", orderId:"SO-20260914-0041", site:"静安寺商圈A座大堂", customer:"蜂巢智能科技", refundAmount:7.5, reason:"未取到商品", status:"退款失败", applyTime:"09-14 11:20", orderAmount:7.5, payMethod:"微信", payTime:"09-14 11:01" },
  { refundNo:"RF-20260916-004", orderId:"SO-20260916-0004", site:"徐汇滨江C栋办公区", customer:"云聚零售", refundAmount:6.0, reason:"重复扣款", status:"待处理", applyTime:"09-16 09:45", orderAmount:6.0, payMethod:"支付宝", payTime:"09-15 14:23" },
];

const RF_STATUS_COLOR: Record<RefundOrder["status"], "orange"|"green"|"red"|"blue"|"gray"|"purple"|"cyan"|"yellow"> = {
  "待处理":"orange","退款成功":"green","退款失败":"red",
};

// ── 零售订单列表 ─────────────────────────────────────────────────────────────
const RetailOrderList = ({ onDetail }: { onDetail: (id: string) => void }) => {
  const [search, setSearch] = useState("");
  const [siteSearch, setSiteSearch] = useState("");
  const [deviceSearch, setDeviceSearch] = useState("");
  const [customer, setCustomer] = useState("");
  const [status, setStatus] = useState("");
  const [payMethod, setPayMethod] = useState("");
  const [orderFrom, setOrderFrom] = useState("");
  const [orderTo, setOrderTo] = useState("");
  const [payFrom, setPayFrom] = useState("");
  const [payTo, setPayTo] = useState("");
  const [markOpen, setMarkOpen] = useState(false);
  const [markTarget, setMarkTarget] = useState("");
  const [anomalyType, setAnomalyType] = useState("");
  const [anomalyReason, setAnomalyReason] = useState("");

  const rows = RETAIL_ORDERS.filter(o =>
    (!search || o.id.includes(search)) &&
    (!siteSearch || o.site.includes(siteSearch) || o.siteCode.includes(siteSearch)) &&
    (!deviceSearch || o.deviceCode.includes(deviceSearch)) &&
    (!customer || o.customer === customer) &&
    (!status || o.status === status) &&
    (!payMethod || o.payMethod === payMethod)
  );

  const ANOMALY_TYPES = ["支付异常","商品异常","设备异常","用户投诉","其他"];

  return (
    <div>
      <PageHeader title="零售订单列表"
        breadcrumbs={["首页","销售订单管理","零售订单列表"]}
        actions={<div className="flex items-center gap-2"><Btn variant="secondary" icon="download" size="sm">导出</Btn><Btn variant="secondary" icon="download" size="sm">导出订单商品明细</Btn></div>} />

      <FilterBar>
        <FilterField label="订单号"><Input placeholder="订单号模糊搜索" icon="search" className="w-44" value={search} onChange={v => setSearch(v)} /></FilterField>
        <FilterField label="点位名称/编码"><Input placeholder="点位名称或编码" icon="search" className="w-44" value={siteSearch} onChange={v => setSiteSearch(v)} /></FilterField>
        <FilterField label="设备资产编码"><Input placeholder="资产编码" icon="search" className="w-40" value={deviceSearch} onChange={v => setDeviceSearch(v)} /></FilterField>
        <FilterField label="关联客户">
          <Select className="w-36" value={customer} onChange={v => setCustomer(v)}
            options={[{label:"全部客户",value:""},...RETAIL_CUSTOMERS.map(c=>({label:c,value:c}))]} />
        </FilterField>
        <FilterField label="订单状态">
          <Select className="w-36" value={status} onChange={v => setStatus(v)}
            options={[{label:"全部状态",value:""},
              ...["待支付","已支付","已完成","已取消","已退款","标记异常"].map(s=>({label:s,value:s}))]} />
        </FilterField>
        <FilterField label="支付方式">
          <Select className="w-32" value={payMethod} onChange={v => setPayMethod(v)}
            options={[{label:"全部",value:""},{label:"微信",value:"微信"},{label:"支付宝",value:"支付宝"}]} />
        </FilterField>
        <FilterField label="下单时间">
          <div className="flex items-center gap-1">
            <input type="date" value={orderFrom} onChange={e => setOrderFrom(e.target.value)} className="h-9 border border-[#E2E8F0] rounded-md text-sm px-3 text-[#334155] focus:outline-none focus:border-[#2563EB]"/>
            <span className="text-[#94A3B8] text-xs">至</span>
            <input type="date" value={orderTo} onChange={e => setOrderTo(e.target.value)} className="h-9 border border-[#E2E8F0] rounded-md text-sm px-3 text-[#334155] focus:outline-none focus:border-[#2563EB]"/>
          </div>
        </FilterField>
        <FilterField label="支付时间">
          <div className="flex items-center gap-1">
            <input type="date" value={payFrom} onChange={e => setPayFrom(e.target.value)} className="h-9 border border-[#E2E8F0] rounded-md text-sm px-3 text-[#334155] focus:outline-none focus:border-[#2563EB]"/>
            <span className="text-[#94A3B8] text-xs">至</span>
            <input type="date" value={payTo} onChange={e => setPayTo(e.target.value)} className="h-9 border border-[#E2E8F0] rounded-md text-sm px-3 text-[#334155] focus:outline-none focus:border-[#2563EB]"/>
          </div>
        </FilterField>
        <div className="flex items-end gap-2 ml-auto">
          <Btn variant="secondary" onClick={() => { setSearch(""); setSiteSearch(""); setDeviceSearch(""); setCustomer(""); setStatus(""); setPayMethod(""); setOrderFrom(""); setOrderTo(""); setPayFrom(""); setPayTo(""); }}>重置</Btn>
          <Btn variant="primary" icon="search">搜索</Btn>
        </div>
      </FilterBar>

      <Card noPad>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse" style={{minWidth:"1300px"}}>
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                {["订单号","点位名称","点位编码","设备资产编码","关联客户","商品名称","数量","订单金额","支付方式","订单状态","下单时间","支付时间","操作"].map(h=>(
                  <th key={h} className="px-4 py-3 text-[11px] font-semibold text-[#64748B] whitespace-nowrap text-left">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((o,i)=>(
                <tr key={o.id} className={`border-b border-[#F1F5F9] hover:bg-[#F8FAFC] transition-colors ${i%2===1?"bg-[#FAFBFC]":""}`}>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span className="font-mono text-xs font-medium text-[#2563EB] hover:underline cursor-pointer" onClick={()=>onDetail(o.id)}>{o.id}</span>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap font-medium text-[#0F172A] max-w-[140px] truncate" title={o.site}>{o.site}</td>
                  <td className="px-4 py-3.5 whitespace-nowrap"><span className="font-mono text-xs text-[#94A3B8]">{o.siteCode}</span></td>
                  <td className="px-4 py-3.5 whitespace-nowrap"><span className="font-mono text-xs text-[#64748B]">{o.deviceCode}</span></td>
                  <td className="px-4 py-3.5 whitespace-nowrap text-sm text-[#334155]">{o.customer}</td>
                  <td className="px-4 py-3.5 text-sm text-[#334155] max-w-[160px] truncate" title={o.goodsName}>{o.goodsName}</td>
                  <td className="px-4 py-3.5 text-center font-medium text-[#334155]">{o.goodsQty}</td>
                  <td className="px-4 py-3.5 whitespace-nowrap font-bold text-[#0F172A]">¥{o.amount.toFixed(2)}</td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${o.payMethod==="微信"?"bg-[#F0FDF4] text-[#16A34A]":"bg-[#EFF6FF] text-[#1D4ED8]"}`}>{o.payMethod}</span>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap"><Badge label={o.status} color={SO_STATUS_COLOR[o.status]}/></td>
                  <td className="px-4 py-3.5 whitespace-nowrap text-xs text-[#64748B]">{o.orderTime}</td>
                  <td className="px-4 py-3.5 whitespace-nowrap text-xs text-[#94A3B8]">{o.payTime}</td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <Btn variant="ghost" size="sm" onClick={()=>onDetail(o.id)}>订单详情</Btn>
                      {o.status !== "标记异常" && o.status !== "已取消" && (
                        <Btn variant="ghost" size="sm" className="!text-[#EF4444] hover:!bg-[#FEF2F2]"
                          onClick={()=>{ setMarkTarget(o.id); setMarkOpen(true); }}>标记异常</Btn>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {rows.length===0 && <tr><td colSpan={13} className="px-4 py-12 text-center text-[#94A3B8] text-sm">暂无数据</td></tr>}
            </tbody>
          </table>
        </div>
        <Pagination total={rows.length} page={1} pageSize={10} />
      </Card>

      {/* 标记异常弹窗 */}
      <Modal open={markOpen} onClose={()=>setMarkOpen(false)} title="标记异常" width={520}
        footer={<>
          <Btn variant="secondary" onClick={()=>setMarkOpen(false)}>取消</Btn>
          <Btn variant="danger" onClick={()=>setMarkOpen(false)} disabled={!anomalyType||!anomalyReason}>提交</Btn>
        </>}>
        <div className="space-y-4">
          <div className="px-3 py-2 bg-[#FEF2F2] rounded-lg text-xs text-[#DC2626]">订单 <span className="font-mono font-semibold">{markTarget}</span> 将被标记为异常，状态变更不可撤销。</div>
          <FormRow label="异常类型" required>
            <div className="flex flex-wrap gap-2 pt-1">
              {ANOMALY_TYPES.map(t=>(
                <button key={t} onClick={()=>setAnomalyType(t)}
                  className={`px-3 py-1.5 rounded-lg text-sm border-2 font-medium transition-all
                    ${anomalyType===t?"border-[#EF4444] bg-[#FEF2F2] text-[#DC2626]":"border-[#E2E8F0] text-[#64748B] hover:border-[#FDA4AF]"}`}>
                  {t}
                </button>
              ))}
            </div>
          </FormRow>
          <FormRow label="异常原因" required>
            <textarea value={anomalyReason} onChange={e=>setAnomalyReason(e.target.value.slice(0,500))} rows={4}
              placeholder="请详细描述异常情况，最长 500 字"
              className="w-full border border-[#E2E8F0] rounded-md text-sm px-3 py-2 resize-none focus:outline-none focus:border-[#EF4444]"/>
            <div className="text-right text-xs text-[#94A3B8] mt-1">{anomalyReason.length}/500</div>
          </FormRow>
          <FormRow label="异常凭证" hint="选填，支持图片/视频">
            <div className="grid grid-cols-4 gap-2 pt-1">
              {[0,1,2,3].map(i=>(
                <div key={i} className="aspect-square rounded-xl border-2 border-dashed border-[#E2E8F0] bg-[#F8FAFC] flex items-center justify-center cursor-pointer hover:border-[#2563EB] transition-colors">
                  <Icon d={Icons.plus} size={20} className="text-[#CBD5E1]"/>
                </div>
              ))}
            </div>
          </FormRow>
        </div>
      </Modal>
    </div>
  );
};

// ── 零售订单详情 ─────────────────────────────────────────────────────────────
const RetailOrderDetail = ({ orderId, onBack }: { orderId: string; onBack: () => void }) => {
  const order = RETAIL_ORDERS.find(o => o.id === orderId) ?? RETAIL_ORDERS[0];
  const [markOpen, setMarkOpen] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [anomalyType, setAnomalyType] = useState("");
  const [anomalyReason, setAnomalyReason] = useState("");
  const ANOMALY_TYPES = ["支付异常","商品异常","设备异常","用户投诉","其他"];

  return (
    <div>
      <PageHeader title="订单详情"
        breadcrumbs={["首页","销售订单管理","零售订单列表","订单详情"]}
        actions={<>
          <Btn variant="secondary" onClick={onBack}>返回列表</Btn>
          {order.status !== "标记异常" && order.status !== "已取消" && (
            <Btn variant="danger" onClick={()=>setMarkOpen(true)}>标记异常</Btn>
          )}
        </>} />

      <div className="grid grid-cols-3 gap-4">
        {/* Left col */}
        <div className="col-span-1 space-y-4">
          {/* 购物视频 */}
          <Card>
            <SectionTitle title="购物视频" />
            <div className={`relative rounded-xl overflow-hidden bg-[#0F172A] flex items-center justify-center cursor-pointer group transition-all`}
              style={{height:200}} onClick={()=>setVideoPlaying(true)}>
              {videoPlaying ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                  <div className="w-12 h-12 rounded-full border-2 border-[#94A3B8] flex items-center justify-center animate-pulse">
                    <Icon d={Icons.zap} size={22} className="text-[#94A3B8]"/>
                  </div>
                  <span className="text-xs text-[#64748B]">视频播放中（演示占位）</span>
                </div>
              ) : (
                <>
                  <div className="w-16 h-16 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-all">
                    <div className="w-0 h-0 ml-1.5" style={{borderTop:"10px solid transparent",borderBottom:"10px solid transparent",borderLeft:"18px solid white"}}/>
                  </div>
                  <div className="absolute bottom-3 left-3 text-xs text-white/60">点击播放购物视频</div>
                </>
              )}
            </div>
          </Card>

          {/* 点位信息 */}
          <Card>
            <SectionTitle title="点位信息" />
            <InfoGrid cols={1} items={[
              {label:"点位名称", value:order.site},
              {label:"点位编码", value:<span className="font-mono text-xs">{order.siteCode}</span>},
              {label:"设备资产编码", value:<span className="font-mono text-xs">{order.deviceCode}</span>},
              {label:"关联客户", value:order.customer},
            ]} />
          </Card>
        </div>

        {/* Right col */}
        <div className="col-span-2 space-y-4">
          {/* 订单信息 */}
          <Card>
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#F1F5F9]">
              <SectionTitle title="订单信息" />
              <Badge label={order.status} color={SO_STATUS_COLOR[order.status]}/>
            </div>
            <InfoGrid cols={2} items={[
              {label:"订单号", value:<span className="font-mono text-xs font-bold text-[#2563EB]">{order.id}</span>},
              {label:"用户 UUID", value:<span className="font-mono text-xs text-[#94A3B8]">{order.uuid}</span>},
              {label:"手机号", value:order.phone},
              {label:"支付方式", value:<span className={`text-xs px-2 py-0.5 rounded-full font-medium ${order.payMethod==="微信"?"bg-[#F0FDF4] text-[#16A34A]":"bg-[#EFF6FF] text-[#1D4ED8]"}`}>{order.payMethod}</span>},
              {label:"支付流水号", value:<span className="font-mono text-xs text-[#64748B]">{order.payNo}</span>},
              {label:"订单总金额", value:<span className="font-bold text-[#0F172A] text-base">¥{order.amount.toFixed(2)}</span>},
              {label:"实付金额", value:<span className="font-bold text-[#2563EB] text-base">¥{order.paidAmount.toFixed(2)}</span>},
              {label:"下单时间", value:order.orderTime},
              {label:"支付时间", value:order.payTime},
              {label:"完成时间", value:order.status==="已完成"?order.payTime:"—"},
            ]} />
          </Card>

          {/* 商品信息 */}
          <Card noPad>
            <div className="px-5 py-4 border-b border-[#E2E8F0] flex items-center gap-2">
              <div className="w-1 h-4 rounded-full bg-[#2563EB]"/>
              <h2 className="text-sm font-semibold text-[#0F172A]">商品信息</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                    {["商品名称","商品69码","规格","分类","类别","数量","单价","金额小计"].map(h=>(
                      <th key={h} className="px-4 py-3 text-[11px] font-semibold text-[#64748B] whitespace-nowrap text-left">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {RETAIL_SKUS.map((s,i)=>(
                    <tr key={i} className="border-b border-[#F1F5F9] hover:bg-[#F8FAFC]">
                      <td className="px-4 py-3.5 font-medium text-[#0F172A]">{s.name}</td>
                      <td className="px-4 py-3.5"><span className="font-mono text-xs text-[#94A3B8]">{s.barcode}</span></td>
                      <td className="px-4 py-3.5 text-sm text-[#64748B]">{s.spec}</td>
                      <td className="px-4 py-3.5 text-sm text-[#64748B]">{s.category}</td>
                      <td className="px-4 py-3.5 text-sm text-[#64748B]">{s.type}</td>
                      <td className="px-4 py-3.5 text-center font-medium">{s.qty}</td>
                      <td className="px-4 py-3.5 font-medium">¥{s.price.toFixed(2)}</td>
                      <td className="px-4 py-3.5 font-bold text-[#0F172A]">¥{(s.price*s.qty).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>

      {/* 标记异常弹窗 */}
      <Modal open={markOpen} onClose={()=>setMarkOpen(false)} title="标记异常" width={520}
        footer={<>
          <Btn variant="secondary" onClick={()=>setMarkOpen(false)}>取消</Btn>
          <Btn variant="danger" onClick={()=>setMarkOpen(false)} disabled={!anomalyType||!anomalyReason}>提交</Btn>
        </>}>
        <div className="space-y-4">
          <div className="px-3 py-2 bg-[#FEF2F2] rounded-lg text-xs text-[#DC2626]">订单 <span className="font-mono font-semibold">{order.id}</span> 将被标记为异常，状态变更不可撤销。</div>
          <FormRow label="异常类型" required>
            <div className="flex flex-wrap gap-2 pt-1">
              {ANOMALY_TYPES.map(t=>(
                <button key={t} onClick={()=>setAnomalyType(t)}
                  className={`px-3 py-1.5 rounded-lg text-sm border-2 font-medium transition-all
                    ${anomalyType===t?"border-[#EF4444] bg-[#FEF2F2] text-[#DC2626]":"border-[#E2E8F0] text-[#64748B] hover:border-[#FDA4AF]"}`}>
                  {t}
                </button>
              ))}
            </div>
          </FormRow>
          <FormRow label="异常原因" required>
            <textarea value={anomalyReason} onChange={e=>setAnomalyReason(e.target.value.slice(0,500))} rows={4}
              placeholder="请详细描述异常情况，最长 500 字"
              className="w-full border border-[#E2E8F0] rounded-md text-sm px-3 py-2 resize-none focus:outline-none focus:border-[#EF4444]"/>
            <div className="text-right text-xs text-[#94A3B8] mt-1">{anomalyReason.length}/500</div>
          </FormRow>
          <FormRow label="异常凭证" hint="选填，支持图片/视频">
            <div className="grid grid-cols-4 gap-2 pt-1">
              {[0,1,2,3].map(i=>(
                <div key={i} className="aspect-square rounded-xl border-2 border-dashed border-[#E2E8F0] bg-[#F8FAFC] flex items-center justify-center cursor-pointer hover:border-[#2563EB] transition-colors">
                  <Icon d={Icons.plus} size={20} className="text-[#CBD5E1]"/>
                </div>
              ))}
            </div>
          </FormRow>
        </div>
      </Modal>
    </div>
  );
};

// ── 订单退款处理列表 ──────────────────────────────────────────────────────────
const RetailRefundList = ({ onDetail, onProcess }: { onDetail: (no: string) => void; onProcess: (no: string) => void }) => {
  const [search, setSearch] = useState("");
  const [refundSearch, setRefundSearch] = useState("");
  const [uuid, setUuid] = useState("");
  const [siteSearch, setSiteSearch] = useState("");
  const [customer, setCustomer] = useState("");
  const [status, setStatus] = useState("");
  const [applyFrom, setApplyFrom] = useState("");
  const [applyTo, setApplyTo] = useState("");

  const rows = REFUND_ORDERS.filter(r =>
    (!search || r.orderId.includes(search)) &&
    (!refundSearch || r.refundNo.includes(refundSearch)) &&
    (!siteSearch || r.site.includes(siteSearch)) &&
    (!customer || r.customer === customer) &&
    (!status || r.status === status)
  );

  return (
    <div>
      <PageHeader title="订单退款处理"
        breadcrumbs={["首页","销售订单管理","订单退款处理"]}
        actions={<Btn variant="secondary" icon="download" size="sm">导出</Btn>} />

      <FilterBar>
        <FilterField label="订单号"><Input placeholder="订单号模糊搜索" icon="search" className="w-40" value={search} onChange={v=>setSearch(v)}/></FilterField>
        <FilterField label="退款单号"><Input placeholder="退款单号搜索" icon="search" className="w-40" value={refundSearch} onChange={v=>setRefundSearch(v)}/></FilterField>
        <FilterField label="用户 UUID"><Input placeholder="用户唯一标识" icon="search" className="w-40" value={uuid} onChange={v=>setUuid(v)}/></FilterField>
        <FilterField label="点位名称/编码"><Input placeholder="点位名称或编码" icon="search" className="w-44" value={siteSearch} onChange={v=>setSiteSearch(v)}/></FilterField>
        <FilterField label="关联客户">
          <Select className="w-36" value={customer} onChange={v=>setCustomer(v)}
            options={[{label:"全部客户",value:""},...RETAIL_CUSTOMERS.map(c=>({label:c,value:c}))]} />
        </FilterField>
        <FilterField label="退款状态">
          <Select className="w-32" value={status} onChange={v=>setStatus(v)}
            options={[{label:"全部状态",value:""},{label:"待处理",value:"待处理"},{label:"退款成功",value:"退款成功"},{label:"退款失败",value:"退款失败"}]} />
        </FilterField>
        <FilterField label="申请时间">
          <div className="flex items-center gap-1">
            <input type="date" value={applyFrom} onChange={e=>setApplyFrom(e.target.value)} className="h-9 border border-[#E2E8F0] rounded-md text-sm px-3 text-[#334155] focus:outline-none focus:border-[#2563EB]"/>
            <span className="text-[#94A3B8] text-xs">至</span>
            <input type="date" value={applyTo} onChange={e=>setApplyTo(e.target.value)} className="h-9 border border-[#E2E8F0] rounded-md text-sm px-3 text-[#334155] focus:outline-none focus:border-[#2563EB]"/>
          </div>
        </FilterField>
        <div className="flex items-end gap-2 ml-auto">
          <Btn variant="secondary" onClick={()=>{ setSearch(""); setRefundSearch(""); setUuid(""); setSiteSearch(""); setCustomer(""); setStatus(""); setApplyFrom(""); setApplyTo(""); }}>重置</Btn>
          <Btn variant="primary" icon="search">搜索</Btn>
        </div>
      </FilterBar>

      <Card noPad>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse" style={{minWidth:"1100px"}}>
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                {["退款单号","订单号","点位名称","关联客户","退款金额","退款原因","退款状态","申请时间","操作"].map(h=>(
                  <th key={h} className="px-4 py-3 text-[11px] font-semibold text-[#64748B] whitespace-nowrap text-left">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r,i)=>(
                <tr key={r.refundNo} className={`border-b border-[#F1F5F9] hover:bg-[#F8FAFC] transition-colors ${i%2===1?"bg-[#FAFBFC]":""}`}>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span className="font-mono text-xs font-medium text-[#2563EB] hover:underline cursor-pointer" onClick={()=>onDetail(r.refundNo)}>{r.refundNo}</span>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span className="font-mono text-xs text-[#7C3AED] hover:underline cursor-pointer">{r.orderId}</span>
                  </td>
                  <td className="px-4 py-3.5 font-medium text-[#0F172A] max-w-[140px] truncate" title={r.site}>{r.site}</td>
                  <td className="px-4 py-3.5 text-sm text-[#334155]">{r.customer}</td>
                  <td className="px-4 py-3.5 font-bold text-[#0F172A]">¥{r.refundAmount.toFixed(2)}</td>
                  <td className="px-4 py-3.5 text-sm text-[#64748B] max-w-[120px] truncate" title={r.reason}>{r.reason}</td>
                  <td className="px-4 py-3.5 whitespace-nowrap"><Badge label={r.status} color={RF_STATUS_COLOR[r.status]}/></td>
                  <td className="px-4 py-3.5 whitespace-nowrap text-xs text-[#64748B]">{r.applyTime}</td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      {r.status === "待处理" && (
                        <Btn variant="primary" size="sm" onClick={()=>onProcess(r.refundNo)}>订单处理</Btn>
                      )}
                      <Btn variant="ghost" size="sm" onClick={()=>onDetail(r.refundNo)}>详情</Btn>
                    </div>
                  </td>
                </tr>
              ))}
              {rows.length===0 && <tr><td colSpan={9} className="px-4 py-12 text-center text-[#94A3B8] text-sm">暂无数据</td></tr>}
            </tbody>
          </table>
        </div>
        <Pagination total={rows.length} page={1} pageSize={10} />
      </Card>
    </div>
  );
};

// ── 退款处理页 ───────────────────────────────────────────────────────────────
const RetailRefundDetail = ({ refundNo, onBack }: { refundNo: string; onBack: () => void }) => {
  const refund = REFUND_ORDERS.find(r => r.refundNo === refundNo) ?? REFUND_ORDERS[0];
  const [result, setResult] = useState("");
  const [opinion, setOpinion] = useState("");
  const isPending = refund.status === "待处理";
  // 退款方式：部分金额退款 / 商品退款 / 整单退款
  const [refundType, setRefundType] = useState(refund.refundAmount === refund.orderAmount ? "整单退款" : "部分金额退款");
  const [checkedSkus, setCheckedSkus] = useState<number[]>([]);
  const [manualAmount, setManualAmount] = useState("");
  const selectedTotal = RETAIL_SKUS.filter((_, i) => checkedSkus.includes(i)).reduce((a, s) => a + s.price * s.qty, 0);
  const amountValue = refundType === "整单退款" ? refund.orderAmount.toFixed(2)
    : refundType === "商品退款" ? selectedTotal.toFixed(2)
    : manualAmount;

  return (
    <div>
      <PageHeader title={isPending ? "退款处理" : "退款详情"}
        breadcrumbs={["首页","销售订单管理","订单退款处理", isPending?"退款处理":"退款详情"]}
        actions={<Btn variant="secondary" onClick={onBack}>返回列表</Btn>} />

      <div className="space-y-4">
          {/* 退款信息 */}
          <Card>
            <SectionTitle title="退款信息" />

            {/* 订单视频展示：两个识别预览占位，默认不播放 */}
            <div className="mb-4">
              <div className="text-xs text-[#94A3B8] mb-1.5">订单视频展示</div>
              <div className="grid grid-cols-2 gap-3">
                {["开门视频", "取货视频"].map((t, i) => (
                  <div key={t} className="relative rounded-lg bg-[#0F172A] h-44 flex items-center justify-center overflow-hidden">
                    {/* 手绘取景框占位 */}
                    <svg viewBox="0 0 200 100" className="absolute inset-0 w-full h-full opacity-25" preserveAspectRatio="xMidYMid slice">
                      <rect x="70" y="18" width="60" height="64" rx="4" fill="none" stroke="#94A3B8" strokeWidth="2"/>
                      <line x1="70" y1="38" x2="130" y2="38" stroke="#94A3B8" strokeWidth="1.5"/>
                      <line x1="70" y1="58" x2="130" y2="58" stroke="#94A3B8" strokeWidth="1.5"/>
                      <rect x="76" y="22" width="10" height="14" fill="#38BDF8" opacity="0.6"/>
                      <rect x="90" y="22" width="10" height="14" fill="#38BDF8" opacity="0.4"/>
                      <rect x="76" y="42" width="10" height="14" fill="#38BDF8" opacity="0.5"/>
                      <rect x="104" y="62" width="10" height="14" fill="#38BDF8" opacity="0.4"/>
                    </svg>
                    <div className="w-11 h-11 rounded-full bg-white/90 shadow-lg flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 ml-0.5" fill="#0F172A"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                    <span className="absolute top-2 left-2 text-[10px] text-white/80 bg-black/50 px-2 py-1 rounded">{t}</span>
                    <span className="absolute bottom-2 left-2 text-[10px] text-white/80 bg-black/50 px-2 py-1 rounded">订单识别预览 · 默认不播放视频</span>
                    <span className="absolute top-2 right-2 text-[10px] text-white/80 bg-black/50 px-2 py-1 rounded font-mono">CAM-{refund.orderId.slice(-4)}{i === 0 ? "-A" : "-B"}</span>
                  </div>
                ))}
              </div>
            </div>

            <InfoGrid cols={2} items={[
              {label:"退款单号", value:<span className="font-mono text-xs font-bold text-[#2563EB]">{refund.refundNo}</span>},
              {label:"订单号",   value:<span className="font-mono text-xs text-[#7C3AED]">{refund.orderId}</span>},
              {label:"退款原因", value:refund.reason},
              {label:"申请时间", value:refund.applyTime},
              {label:"订单金额", value:<span className="font-bold text-[#0F172A]">¥{refund.orderAmount.toFixed(2)}</span>},
              {label:"支付方式", value:<span className={`text-xs px-2 py-0.5 rounded-full font-medium ${refund.payMethod==="微信"?"bg-[#F0FDF4] text-[#16A34A]":"bg-[#EFF6FF] text-[#1D4ED8]"}`}>{refund.payMethod}</span>},
              {label:"支付时间", value:refund.payTime},
            ]} />
          </Card>

          {/* 退款商品列表 */}
          <Card noPad>
            <div className="px-5 py-4 border-b border-[#E2E8F0] flex items-center gap-2">
              <div className="w-1 h-4 rounded-full bg-[#EF4444]"/>
              <h2 className="text-sm font-semibold text-[#0F172A]">退款商品列表</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                    {["商品名称","商品69码","规格","分类","类别","数量","单价","金额小计","申请退款金额"].map(h=>(
                      <th key={h} className="px-4 py-3 text-[11px] font-semibold text-[#64748B] whitespace-nowrap text-left">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {RETAIL_SKUS.map((s,i)=>(
                    <tr key={i} className="border-b border-[#F1F5F9] hover:bg-[#F8FAFC]">
                      <td className="px-4 py-3.5 font-medium text-[#0F172A]">{s.name}</td>
                      <td className="px-4 py-3.5"><span className="font-mono text-xs text-[#94A3B8]">{s.barcode}</span></td>
                      <td className="px-4 py-3.5 text-sm text-[#64748B]">{s.spec}</td>
                      <td className="px-4 py-3.5 text-sm text-[#64748B]">{s.category}</td>
                      <td className="px-4 py-3.5 text-sm text-[#64748B]">{s.type}</td>
                      <td className="px-4 py-3.5 text-center font-medium">{s.qty}</td>
                      <td className="px-4 py-3.5 font-medium">¥{s.price.toFixed(2)}</td>
                      <td className="px-4 py-3.5 font-bold text-[#0F172A]">¥{(s.price*s.qty).toFixed(2)}</td>
                      <td className="px-4 py-3.5 font-bold text-[#EF4444]">¥{(s.price*s.qty).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* 处理：位于商品明细下方 */}
          <Card>
            <SectionTitle title="处理" />
            {!isPending ? (
              <div className="space-y-3">
                <div className="px-3 py-2.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
                  <div className="text-xs text-[#94A3B8] mb-1">处理结果</div>
                  <Badge label={refund.status} color={RF_STATUS_COLOR[refund.status]} />
                </div>
                <AlertBanner type="info" msg="该退款申请已处理完毕，无法再次修改。" />
              </div>
            ) : (
              <div className="space-y-4">
                {/* 处理结果 */}
                <FormRow label="处理结果" required hint="下拉选择">
                  <Select value={result} onChange={v=>setResult(v)} className="w-full"
                    options={[{label:"请选择处理结果",value:""},{label:"同意退款",value:"同意退款"},{label:"拒绝退款",value:"拒绝退款"}]} />
                </FormRow>
                {result === "拒绝退款" && (
                  <AlertBanner type="warning" msg="拒绝退款后，用户将收到通知，请在处理意见中说明原因。" />
                )}
                {result === "同意退款" && (
                  <AlertBanner type="success" msg={`确认同意后将原路退款 ¥${refund.refundAmount.toFixed(2)} 至用户账户。`} />
                )}

                {/* 退款方式 */}
                <FormRow label="退款方式" required hint="部分金额退款 / 商品退款 / 整单退款">
                  <RadioGroup options={["部分金额退款", "商品退款", "整单退款"]} value={refundType} onChange={setRefundType} />
                </FormRow>

                {/* 选择退款商品：仅商品退款时展示，支持多选 */}
                {refundType === "商品退款" && (
                  <FormRow label="选择退款商品" required hint="可多选">
                    <div className="border border-[#E2E8F0] rounded-lg overflow-hidden">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                            <th className="px-3 py-2 w-8"></th>
                            {["商品名称","数量","金额小计"].map(h=>(
                              <th key={h} className="px-3 py-2 text-[11px] font-semibold text-[#64748B] whitespace-nowrap text-left">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {RETAIL_SKUS.map((s,i)=>(
                            <tr key={i} className={`border-b border-[#F1F5F9] last:border-0 cursor-pointer ${checkedSkus.includes(i)?"bg-[#EFF6FF]":"hover:bg-[#F8FAFC]"}`} onClick={()=>setCheckedSkus(p=>p.includes(i)?p.filter(j=>j!==i):[...p,i])}>
                              <td className="px-3 py-2"><input type="checkbox" checked={checkedSkus.includes(i)} readOnly className="rounded accent-[#2563EB] pointer-events-none" /></td>
                              <td className="px-3 py-2 font-medium text-[#0F172A]">{s.name}</td>
                              <td className="px-3 py-2 text-center">{s.qty}</td>
                              <td className="px-3 py-2 font-bold text-[#0F172A]">¥{(s.price*s.qty).toFixed(2)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </FormRow>
                )}

                {/* 退款金额 */}
                <FormRow label="退款金额" required>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#EF4444]">¥</span>
                    <input
                      value={amountValue}
                      onChange={e => setManualAmount(e.target.value.replace(/[^\d.]/g, "").slice(0, 10))}
                      disabled={refundType !== "部分金额退款"}
                      placeholder={refundType === "部分金额退款" ? "请输入退款金额" : ""}
                      className={`flex-1 h-9 border border-[#E2E8F0] rounded-md text-sm px-3 font-medium ${refundType !== "部分金额退款" ? "bg-[#F8FAFC] text-[#64748B] cursor-not-allowed" : "bg-white text-[#0F172A] focus:outline-none focus:border-[#2563EB]"}`} />
                  </div>
                  <div className="text-[11px] text-[#94A3B8] mt-1">
                    {refundType === "整单退款" ? "全额退款，自动回填本订单交易金额，不可修改" : refundType === "商品退款" ? "根据勾选商品自动回填交易金额，不可修改" : "部分金额退款需手动填写"}
                  </div>
                </FormRow>

                <FormRow label="处理意见" hint="多行文本，最长 200 字">
                  <textarea value={opinion} onChange={e=>setOpinion(e.target.value.slice(0,200))} rows={5}
                    placeholder="请填写处理意见（最长 200 字）"
                    className="w-full border border-[#E2E8F0] rounded-md text-sm px-3 py-2 resize-none focus:outline-none focus:border-[#2563EB]"/>
                  <div className="text-right text-xs text-[#94A3B8] mt-1">{opinion.length}/200</div>
                </FormRow>
                <div className="flex justify-end gap-2 pt-1">
                  <Btn variant="secondary" onClick={onBack}>取消</Btn>
                  <Btn variant={result==="同意退款"?"primary":result==="拒绝退款"?"danger":"secondary"} disabled={!result} onClick={onBack}>
                    提交处理结果
                  </Btn>
                </div>
              </div>
            )}
          </Card>
      </div>
    </div>
  );
};

// ── 算法异常单处理（二期，占位）────────────────────────────────────────────────
const RetailAlgoList = () => (
  <div>
    <PageHeader title="算法异常单处理" breadcrumbs={["首页","销售订单管理","算法异常单处理"]} />
    <div className="flex flex-col items-center justify-center py-32 gap-4 text-center">
      <div className="w-20 h-20 rounded-2xl bg-[#F1F5F9] flex items-center justify-center">
        <Icon d={Icons.alert} size={36} className="text-[#94A3B8]" />
      </div>
      <div className="text-lg font-semibold text-[#334155]">本期暂未开放</div>
      <div className="text-sm text-[#94A3B8] max-w-xs leading-relaxed">算法异常单处理功能计划在二期版本中开发上线，敬请期待。</div>
      <div className="mt-2 px-4 py-2 rounded-full bg-[#F1F5F9] text-xs text-[#64748B] font-medium">预计 二期开发</div>
    </div>
  </div>
);

// ─── Return Order Modal ───────────────────────────────────────────────────────
const ReturnModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => (
  <Modal open={open} onClose={onClose} title="退单申请" width={480}
    footer={<><Btn variant="secondary" onClick={onClose}>取消</Btn><Btn variant="danger">确认退单</Btn></>}
  >
    <AlertBanner type="warning" msg="退单后补货流程终止，已占用的库存将释放，此操作不可撤销。" />
    <InfoGrid cols={2} items={[
      {label:"补货单号", value:<span className="font-mono text-xs">RO-20250910-0002</span>},
      {label:"当前状态", value:orderStatusBadge("待分车")},
      {label:"所属客户", value:"格林购物科技"},
      {label:"货值", value:"¥680"},
    ]} />
    <div className="mt-4">
      <FormRow label="退单原因" required>
        <Select options={[{label:"请选择原因",value:""},{label:"客户主动取消",value:"cancel"},{label:"商品缺货",value:"stock"},{label:"路线冲突",value:"route"},{label:"设备故障",value:"device"},{label:"其他",value:"other"}]} />
      </FormRow>
      <FormRow label="补充说明">
        <textarea rows={3} placeholder="请填写补充说明（选填）" className="w-full border border-[#E2E8F0] rounded-md text-sm px-3 py-2 resize-none focus:outline-none focus:border-[#2563EB]" />
      </FormRow>
    </div>
  </Modal>
);

// ─── Rule Auto ────────────────────────────────────────────────────────────────
const RuleAuto = () => {
  const [rules, setRules] = useState([
    { id: "R001", name: "华南区日常自动补货规则", scope: "全部点位", trigger: "库存低于预存量 30%", minStock: 5, freq: "每日 07:00", priority: 1, enabled: true },
    { id: "R002", name: "北京紧急补货触发规则", scope: "北京客户", trigger: "库存低于预存量 15%", minStock: 3, freq: "实时触发", priority: 2, enabled: true },
    { id: "R003", name: "周末补货加量规则", scope: "商业综合体", trigger: "周五 18:00 定时", minStock: 8, freq: "每周五", priority: 3, enabled: false },
  ]);
  return (
    <div>
      <PageHeader
        title="自动补货规则"
        breadcrumbs={["首页", "规则配置", "自动补货规则"]}
        actions={<Btn variant="primary" icon="plus">新建规则</Btn>}
      />
      <AlertBanner type="info" msg="规则按优先级顺序依次匹配，高优先级规则优先生效。同一设备在同一时间最多触发一条规则。" />
      <div className="space-y-3">
        {rules.map((r, i) => (
          <Card key={r.id} className="hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#EFF6FF] flex items-center justify-center text-[#2563EB] font-bold text-sm flex-shrink-0">
                  {r.priority}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-base font-semibold text-[#0F172A]">{r.name}</span>
                    <Badge label={r.enabled ? "已启用" : "已停用"} color={r.enabled ? "green" : "gray"} />
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-[#64748B]">
                    <span>适用范围：<strong className="text-[#334155]">{r.scope}</strong></span>
                    <span>触发条件：<strong className="text-[#334155]">{r.trigger}</strong></span>
                    <span>最低缺货件数阈值：<strong className="text-[#334155]">{r.minStock} 件</strong></span>
                    <span>执行频率：<strong className="text-[#334155]">{r.freq}</strong></span>
                    <span>优先级：<strong className="text-[#2563EB]">P{r.priority}</strong></span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <Toggle checked={r.enabled} onChange={() => setRules(rs => rs.map(x => x.id === r.id ? { ...x, enabled: !x.enabled } : x))} />
                <Btn variant="ghost" size="sm" icon="edit">编辑</Btn>
                <Btn variant="ghost" size="sm" className="!text-[#DC2626]" icon="trash">删除</Btn>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <Card className="border-dashed border-[#BFDBFE] bg-[#F8FAFC] mt-3 cursor-pointer hover:bg-[#EFF6FF] transition-colors">
        <div className="flex items-center justify-center gap-2 py-2 text-[#64748B] hover:text-[#2563EB]">
          <Icon d={Icons.plus} size={16} />
          <span className="text-sm">新建规则</span>
        </div>
      </Card>
    </div>
  );
};

// ─── Rule Pause ───────────────────────────────────────────────────────────────
const RulePause = () => {
  const [rules, setRules] = useState([
    { id: "P001", name: "元旦春节停运规则", scope: "全部点位", start: "2026-01-01", end: "2026-02-05", reason: "春节假期停止配送", enabled: true },
    { id: "P002", name: "深圳台风暂停规则", scope: "深圳点位", start: "触发型", end: "手动解除", reason: "台风预警期间暂停", enabled: false },
    { id: "P003", name: "系统维护窗口暂停", scope: "全部点位", start: "每周日 02:00", end: "每周日 04:00", reason: "系统例行维护", enabled: true },
  ]);
  return (
    <div>
      <PageHeader
        title="暂停规则"
        breadcrumbs={["首页", "规则配置", "暂停规则"]}
        actions={<Btn variant="primary" icon="plus">新建暂停规则</Btn>}
      />
      <AlertBanner type="warning" msg="暂停规则生效期间，自动补货规则将被覆盖，不会产生新补货单。请谨慎配置时间范围。" />
      <div className="space-y-3">
        {rules.map(r => (
          <Card key={r.id} className="hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#FFFBEB] flex items-center justify-center text-[#D97706] flex-shrink-0">
                  <Icon d={Icons.clock} size={16} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-base font-semibold text-[#0F172A]">{r.name}</span>
                    <Badge label={r.enabled ? "已启用" : "已停用"} color={r.enabled ? "yellow" : "gray"} />
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-[#64748B]">
                    <span>适用范围：<strong className="text-[#334155]">{r.scope}</strong></span>
                    <span>开始：<strong className="text-[#334155]">{r.start}</strong></span>
                    <span>结束：<strong className="text-[#334155]">{r.end}</strong></span>
                    <span>原因：<strong className="text-[#334155]">{r.reason}</strong></span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Toggle checked={r.enabled} onChange={() => setRules(rs => rs.map(x => x.id === r.id ? { ...x, enabled: !x.enabled } : x))} />
                <Btn variant="ghost" size="sm">编辑</Btn>
                <Btn variant="ghost" size="sm" className="!text-[#DC2626]">删除</Btn>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// ─── Rule Template ────────────────────────────────────────────────────────────
const RuleTemplate = () => (
  <div>
    <PageHeader
      title="预存量模板"
      breadcrumbs={["首页", "规则配置", "预存量模板"]}
      actions={<Btn variant="primary" icon="plus">新建模板</Btn>}
    />
    <AlertBanner type="info" msg="模板可批量应用到多个设备点位，设备的预存量将按模板统一更新。适合同类场景的快速配置。" />
    <div className="grid grid-cols-3 gap-4">
      {[
        { id: "T001", name: "写字楼标准配置", scene: "写字楼", skus: 18, devices: 24, lastUpdate: "2025-08-15", desc: "适用于日均人流 500~2000 人的写字楼场景，以饮料和零食为主。" },
        { id: "T002", name: "商业综合体旗舰配置", scene: "商业综合体", skus: 36, devices: 8, lastUpdate: "2025-09-01", desc: "商业综合体高流量场景，覆盖饮料、零食、速食、乳品全品类。" },
        { id: "T003", name: "园区食堂精简配置", scene: "园区食堂", skus: 12, devices: 12, lastUpdate: "2025-07-20", desc: "园区食堂午餐高峰补货策略，以速食和乳品为主，饮料次之。" },
      ].map(t => (
        <Card key={t.id} className="hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="text-base font-semibold text-[#0F172A] mb-1">{t.name}</div>
              <Badge label={t.scene} color="blue" />
            </div>
            <div className="flex gap-1">
              <Btn variant="ghost" size="sm" icon="edit">编辑</Btn>
              <Btn variant="ghost" size="sm" icon="copy">复制</Btn>
            </div>
          </div>
          <p className="text-xs text-[#64748B] mb-4 leading-relaxed">{t.desc}</p>
          <div className="border-t border-[#F1F5F9] pt-3 flex items-center gap-4 text-xs text-[#64748B]">
            <span>SKU 数：<strong className="text-[#0F172A]">{t.skus}</strong></span>
            <span>适用设备：<strong className="text-[#0F172A]">{t.devices} 台</strong></span>
          </div>
          <div className="mt-3">
            <Btn variant="secondary" size="sm" className="w-full justify-center">应用到设备</Btn>
          </div>
          <div className="mt-2 text-xs text-[#94A3B8] text-right">最后更新：{t.lastUpdate}</div>
        </Card>
      ))}
      <div className="border-2 border-dashed border-[#E2E8F0] rounded-lg flex flex-col items-center justify-center p-8 gap-2 text-[#94A3B8] hover:border-[#2563EB] hover:text-[#2563EB] cursor-pointer transition-all">
        <Icon d={Icons.plus} size={24} />
        <span className="text-sm">新建模板</span>
      </div>
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════
// ROOT APP
// ═══════════════════════════════════════════════════════════════════════════
export default function App() {
  const [system, setSystem] = useState<SystemKey>("ops");
  const [opsPage, setOpsPage] = useState<Page>("customer-list");
  const [erpPage, setErpPage] = useState<Page>("erp-product-list");
  const [ffPage, setFfPage] = useState<Page>("ff-inbound");

  const [remoteOpen, setRemoteOpen] = useState(false);
  const [copyOpen, setCopyOpen] = useState(false);
  const [batchOffOpen, setBatchOffOpen] = useState(false);
  const [returnOpen, setReturnOpen] = useState(false);
  const [selectedRetailOrder, setSelectedRetailOrder] = useState("SO-20260916-0001");
  const [selectedRefundNo, setSelectedRefundNo] = useState("RF-20260916-001");

  const isAdmin = system === "ops" || system === "erp" || system === "fulfillment";
  const sysDef = SYSTEM_DEFS.find(s => s.key === system)!;

  const activePage = system === "erp" ? erpPage : system === "fulfillment" ? ffPage : opsPage;
  const setActivePage = (p: Page) => {
    if (system === "erp") setErpPage(p);
    else if (system === "fulfillment") setFfPage(p);
    else setOpsPage(p);
  };

  const renderAdminPage = (page: Page) => {
    switch (page) {
      case "customer-list": return <CustomerList onDetail={() => setActivePage("customer-detail")} onEdit={() => setActivePage("customer-edit")} />;
      case "customer-detail": return <CustomerDetail onBack={() => setActivePage("customer-list")} onEdit={() => setActivePage("customer-edit")} />;
      case "customer-edit": return <CustomerEdit onBack={() => setActivePage("customer-list")} />;
      case "location-list": return <LocationList onDetail={() => setActivePage("location-detail")} onEdit={() => setActivePage("location-edit")} />;
      case "location-detail": return <LocationDetail onBack={() => setActivePage("location-list")} onEdit={() => setActivePage("location-edit")} />;
      case "location-edit": return <LocationEdit onBack={() => setActivePage("location-list")} />;
      case "device-list": return <DeviceList onDetail={() => setActivePage("device-detail")} onRemote={() => setRemoteOpen(true)} />;
      case "device-detail": return <DeviceDetail onBack={() => setActivePage("device-list")} onRemote={() => setRemoteOpen(true)} onWorkOrderDetail={() => setActivePage("ff-workorder-detail")} />;
      case "product-list": return <ProductList
        onAdd={() => setActivePage("product-add")}
        onCopy={() => setCopyOpen(true)}
        onBatchOff={() => setBatchOffOpen(true)}
        onPreset={() => setActivePage("product-preset")}
        onRestock={() => setActivePage("product-restock")}
        onDetail={() => {}}
      />;
      case "product-add": return <ProductAdd onBack={() => setActivePage("product-list")} />;
      case "product-preset": return <PresetPage onBack={() => setActivePage("product-list")} />;
      case "product-restock": return <RestockPage onBack={() => setActivePage("product-list")} />;
      case "order-list": return <OrderList onModify={() => setActivePage("order-modify")} onReturn={() => setReturnOpen(true)} />;
      case "goods-cabinet-list": return <SmartCabinetList onDetail={() => setActivePage("goods-cabinet-detail")} onInventory={() => setActivePage("goods-inventory")} onRestock={() => setActivePage("goods-restock-create")} />;
      case "goods-cabinet-detail": return <SmartCabinetDetail onBack={() => setActivePage("goods-cabinet-list")} onInventory={() => setActivePage("goods-inventory")} onEditLocation={() => setActivePage("location-edit")} />;
      case "goods-inventory": return <InventoryManagement onBack={() => setActivePage("goods-cabinet-list")} onListProduct={() => setActivePage("goods-list-product")} onRestock={() => setActivePage("goods-restock-create")} />;
      case "goods-list-product": return <ListProductsPage onBack={() => setActivePage("goods-inventory")} onInventory={() => setActivePage("goods-inventory")} onRestock={() => setActivePage("goods-restock-create")} />;
      case "goods-restock-create": return <CreateRestockPage onBack={() => setActivePage("goods-inventory")} />;
      case "goods-restock-list": return <RestockOrderList onCreate={() => setActivePage("goods-restock-create")} onDetail={() => setActivePage("goods-restock-create")} onModify={() => setActivePage("goods-restock-create")} />;
      case "order-modify": return <OrderModify onBack={() => setActivePage("order-list")} />;
      case "retail-order-list": return <RetailOrderList onDetail={id => { setSelectedRetailOrder(id); setActivePage("retail-order-detail"); }} />;
      case "retail-order-detail": return <RetailOrderDetail orderId={selectedRetailOrder} onBack={() => setActivePage("retail-order-list")} />;
      case "retail-refund-list": return <RetailRefundList onDetail={no => { setSelectedRefundNo(no); setActivePage("retail-refund-detail"); }} onProcess={no => { setSelectedRefundNo(no); setActivePage("retail-refund-detail"); }} />;
      case "retail-refund-detail": return <RetailRefundDetail refundNo={selectedRefundNo} onBack={() => setActivePage("retail-refund-list")} />;
      case "retail-algo-list": return <RetailAlgoList />;
      case "rule-auto": return <RuleConfigPage />;
      case "rule-pause": return <RuleConfigPage />;
      case "rule-template": return <RuleTemplate />;
      case "erp-product-list": return <ProductArchiveList onEdit={() => setActivePage("erp-product-form")} />;
      case "erp-product-form": return <ProductArchiveForm onBack={() => setActivePage("erp-product-list")} isEdit />;
      case "erp-price-list": return <PriceTemplateList onEdit={() => setActivePage("erp-price-form")} />;
      case "erp-price-form": return <PriceTemplateForm onBack={() => setActivePage("erp-price-list")} isEdit />;
      case "erp-supplier-list": return <SupplierList onEdit={() => setActivePage("erp-supplier-form")} />;
      case "erp-supplier-form": return <SupplierForm onBack={() => setActivePage("erp-supplier-list")} isEdit />;
      case "erp-pm-list": return <PurchaseMgmtList onCreate={() => setActivePage("erp-pm-new")} onInboundNo={() => setActivePage("erp-po-detail")} />;
      case "erp-pm-new": return <PurchaseMgmtNew onBack={() => setActivePage("erp-pm-list")} />;
      case "erp-po-list": return <InboundOrderList onDetail={() => setActivePage("erp-po-detail")} />;
      case "erp-exc-list": return <ExceptionOrderList onHandle={() => setActivePage("erp-exc-handle")} onDetail={() => setActivePage("erp-exc-handle")} />;
      case "erp-exc-handle": return <ExceptionOrderHandle onBack={() => setActivePage("erp-exc-list")} onPO={() => setActivePage("erp-pm-list")} onInbound={() => setActivePage("erp-po-list")} />;
      case "erp-po-detail": return <InboundOrderDetail onBack={() => setActivePage("erp-po-list")} onPOLink={() => setActivePage("erp-pm-list")} />;
      case "ff-wh-list": return <WarehouseList onCreate={() => setActivePage("ff-wh-form")} onEdit={() => setActivePage("ff-wh-form")} />;
      case "ff-wh-form": return <WarehouseForm onBack={() => setActivePage("ff-wh-list")} />;
      case "ff-wh-inv-list": return <WarehouseInvList onDetail={() => setActivePage("ff-wh-inv-detail")} onAdjust={() => setActivePage("ff-wh-inv-adjust")} />;
      case "ff-wh-inv-detail": return <WarehouseInvDetail onBack={() => setActivePage("ff-wh-inv-list")} />;
      case "ff-wh-inv-adjust": return <WarehouseInvAdjust onBack={() => setActivePage("ff-wh-inv-list")} />;
      case "ff-inbound": return <InboundList onDetail={() => setActivePage("ff-inbound-detail")} />;
      case "ff-inbound-detail": return <InboundDetail onBack={() => setActivePage("ff-inbound")} />;
      case "ff-outbound": return <OutboundList onDetail={() => setActivePage("ff-outbound-detail")} />;
      case "ff-outbound-detail": return <OutboundDetail onBack={() => setActivePage("ff-outbound")} />;
      case "ff-delivery": return <DeliveryList onDetail={() => setActivePage("ff-delivery-detail")} />;
      case "ff-delivery-detail": return <DeliveryDetail onBack={() => setActivePage("ff-delivery")} />;
      case "ff-picking": return <PickingList onDetail={() => setActivePage("ff-picking-detail")} />;
      case "ff-picking-detail": return <PickingDetail onBack={() => setActivePage("ff-picking")} />;
      case "ff-staff": return <StaffList onCreate={() => setActivePage("ff-staff-form")} onEdit={() => setActivePage("ff-staff-form")} />;
      case "ff-staff-form": return <StaffForm onBack={() => setActivePage("ff-staff")} />;
      case "ff-vehicle": return <VehicleList onCreate={() => setActivePage("ff-vehicle-form")} onEdit={() => setActivePage("ff-vehicle-form")} />;
      case "ff-vehicle-form": return <VehicleForm onBack={() => setActivePage("ff-vehicle")} />;
      case "ff-dispatch-list": return <DispatchList onWorkbench={() => setActivePage("ff-dispatch-workbench")} />;
      case "ff-dispatch-workbench": return <DispatchWorkbench onBack={() => setActivePage("ff-dispatch-list")} />;
      case "ff-dispatch-schedule": return <DispatchScheduleList onWorkbench={() => setActivePage("ff-dispatch-workbench")} />;
      case "ff-engineer": return <EngineerList onCreate={() => setActivePage("ff-engineer-form")} onEdit={() => setActivePage("ff-engineer-form")} />;
      case "ff-engineer-form": return <EngineerForm onBack={() => setActivePage("ff-engineer")} />;
      case "ff-workorder-list": return <WorkOrderList onDetail={() => setActivePage("ff-workorder-detail")} onAssign={() => setActivePage("ff-workorder-assign")} />;
      case "ff-workorder-detail": return <WorkOrderDetail onBack={() => setActivePage("ff-workorder-list")} />;
      case "ff-workorder-assign": return <WorkOrderAssign onBack={() => setActivePage("ff-workorder-list")} />;
      default: return <div className="flex items-center justify-center h-40 text-[#94A3B8]">页面开发中</div>;
    }
  };

  const renderMiniSystem = () => {
    if (system === "crm") return (
      <div className="flex-1 overflow-auto p-8 bg-[#F5F7FA]">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-3 h-3 rounded-full" style={{ background: "#F97316" }} />
            <h2 className="text-xl font-bold text-[#0F172A]">销售 CRM 小程序</h2>
          </div>
          <p className="text-sm text-[#94A3B8] ml-6">销售人员移动端 · 点位拓展 · 客户管理 · 审批 · 统计</p>
        </div>
        <CrmApp />
      </div>
    );
    if (system === "ff-mini") return (
      <div className="flex-1 overflow-auto p-8 bg-[#F5F7FA]">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-3 h-3 rounded-full" style={{ background: "#0891B2" }} />
            <h2 className="text-xl font-bold text-[#0F172A]">履约执行小程序</h2>
          </div>
          <p className="text-sm text-[#94A3B8] ml-6">仓储 · 分拣 · 配送 · 装机 · 任务执行端</p>
        </div>
        <FulfillmentMiniApp />
      </div>
    );
    if (system === "client-mini") return (
      <div className="flex-1 overflow-auto p-8 bg-[#F5F7FA]">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-3 h-3 rounded-full" style={{ background: "#0D9488" }} />
            <h2 className="text-xl font-bold text-[#0F172A]">客户小程序</h2>
          </div>
          <p className="text-sm text-[#94A3B8] ml-6">点位管理方 · 履约进度透明 · 商品在售状态</p>
        </div>
        <ClientMiniApp />
      </div>
    );
    if (system === "consumer-mini") return (
      <div className="flex-1 overflow-auto p-8 bg-[#F5F7FA]">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-3 h-3 rounded-full" style={{ background: "#7C3AED" }} />
            <h2 className="text-xl font-bold text-[#0F172A]">消费者小程序</h2>
          </div>
          <p className="text-sm text-[#94A3B8] ml-6">扫码开柜 · 即取即付 · 订单退款</p>
        </div>
        <ConsumerMiniApp />
      </div>
    );
    return null;
  };

  return (
    <div className="flex h-full bg-[#F5F7FA]">
      {/* System icon bar — always visible */}
      <SystemBar active={system} onChange={(k) => {
        setSystem(k);
        if (k === "ops") setOpsPage("customer-list");
        if (k === "erp") setErpPage("erp-product-list");
        if (k === "fulfillment") setFfPage("ff-wh-list");
      }} />

      {/* Admin systems: sub-nav + topbar + content */}
      {isAdmin && (
        <>
          <SubNav
            page={activePage}
            setPage={setActivePage}
            groups={sysDef.nav!}
            color={sysDef.color}
            systemLabel={sysDef.label}
          />
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            <TopBar system={system} onSystemChange={(k) => {
              setSystem(k);
              if (k === "ops") setOpsPage("customer-list");
              if (k === "erp") setErpPage("erp-product-list");
              if (k === "fulfillment") setFfPage("ff-wh-list");
            }} />
            <main className={`flex-1 ${activePage === "ff-dispatch-workbench" ? "overflow-hidden p-0" : "overflow-y-auto p-6"}`}>
              {renderAdminPage(activePage)}
            </main>
          </div>
        </>
      )}

      {/* Mini-program systems: full-width content, no sub-nav */}
      {!isAdmin && (
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {renderMiniSystem()}
        </div>
      )}

      {/* Modals */}
      <RemoteModal open={remoteOpen} onClose={() => setRemoteOpen(false)} />
      <CopyLibraryModal open={copyOpen} onClose={() => setCopyOpen(false)} />
      <BatchOfflineModal open={batchOffOpen} onClose={() => setBatchOffOpen(false)} />
      <ReturnModal open={returnOpen} onClose={() => setReturnOpen(false)} />
    </div>
  );
}
