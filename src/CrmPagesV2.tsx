import { useState, ReactNode } from "react"

// ══════════════════════════════════════════════════════════════════════════════
// 销售 CRM 小程序 · 2期原型
// 模块：集采客户管理 / 渠道商管理 / 设备管理（装机·撤机·移机·维修）/ 审批中心（与一期一致）
// 结构约定：共用 UI 原子集中在「共用区」，页面组件由 CrmAppV2 状态机分发
// ══════════════════════════════════════════════════════════════════════════════

// ─── Icon paths ────────────────────────────────────────────────────────────
const P: Record<string, string> = {
  chevL: "M15 18l-6-6 6-6",
  chevR: "M9 18l6-6-6-6",
  chevD: "M6 9l6 6 6-6",
  x: "M18 6L6 18M6 6l12 12",
  check: "M20 6L9 17l-5-5",
  plus: "M12 5v14M5 12h14",
  search: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0",
  pin: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z M12 10a2 2 0 100-4 2 2 0 000 4",
  users:
    "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M9 11a4 4 0 100-8 4 4 0 000 8 M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75",
  bell: "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 01-3.46 0",
  phone:
    "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 01.4 2.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z",
  alert:
    "M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z M12 9v4 M12 17h.01",
  info: "M12 22a10 10 0 100-20 10 10 0 000 20z M12 8v4 M12 16h.01",
  eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 12a3 3 0 100-6 3 3 0 000 6",
  edit: "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7 M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",
  send: "M22 2L11 13 M22 2l-7 20-4-9-9-4 20-7z",
  cal: "M19 4H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z M16 2v4M8 2v4M3 10h18",
  arrow: "M5 12h14M12 5l7 7-7 7",
  checkC: "M22 11.08V12a10 10 0 11-5.93-9.14 M22 4L12 14.01l-3-3",
  xC: "M12 22a10 10 0 100-20 10 10 0 000 20z M15 9l-6 6M9 9l6 6",
  list: "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01",
  settings:
    "M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z",
  pkg: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
  building: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10",
  tag: "M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z M7 7h.01",
  upload: "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4 M17 8l-5-5-5 5 M12 3v12",
  switch: "M20 7H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z",
  scan: "M3 7V5a2 2 0 012-2h2 M17 3h2a2 2 0 012 2v2 M21 17v2a2 2 0 01-2 2h-2 M7 21H5a2 2 0 01-2-2v-2 M7 12h10",
  clock: "M12 22a10 10 0 100-20 10 10 0 000 20z M12 6v6l4 2",
  camera:
    "M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z M16 13a4 4 0 11-8 0 4 4 0 018 0z",
  card: "M2 5h20v14H2z M2 10h20",
  doc: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
}

const Ic = ({
  d,
  size = 16,
  className = "",
}: {
  d: string
  size?: number
  className?: string
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d={d} />
  </svg>
)

// ══════════════════════════════════════════════════════════════════════════════
// 共用区 · UI 原子
// ══════════════════════════════════════════════════════════════════════════════
type BC = "blue" | "green" | "yellow" | "red" | "gray" | "purple" | "orange"

const BADGE: Record<BC, string> = {
  blue: "bg-[#EFF6FF] text-[#2563EB]",
  green: "bg-[#F0FDF4] text-[#16A34A]",
  yellow: "bg-[#FFFBEB] text-[#D97706]",
  red: "bg-[#FEF2F2] text-[#DC2626]",
  gray: "bg-[#F8FAFC] text-[#64748B]",
  purple: "bg-[#F5F3FF] text-[#7C3AED]",
  orange: "bg-[#FFF7ED] text-[#EA580C]",
}

const Tag = ({ label, color, dot }: { label: string; color: BC; dot?: boolean }) => (
  <span
    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold ${BADGE[color]}`}
  >
    {dot && <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />}
    {label}
  </span>
)

// 客户/渠道商状态与工单履约流转状态统一取色
const statusColor = (s: string): BC => {
  const map: Record<string, BC> = {
    草稿: "gray",
    待审批: "blue",
    已通过: "green",
    已驳回: "red",
    已停用: "gray",
    待处理: "yellow",
    处理中: "blue",
    已完成: "green",
    已取消: "gray",
    待执行: "yellow",
    执行中: "blue",
  }
  return map[s] ?? "gray"
}

const MF = ({
  label,
  children,
  required,
}: {
  label: string
  children: ReactNode
  required?: boolean
}) => (
  <div className="py-3 border-b border-[#F1F5F9] last:border-0">
    <label className="text-xs text-[#94A3B8] mb-1.5 block">
      {required && <span className="text-[#DC2626] mr-0.5">*</span>}
      {label}
    </label>
    {children}
  </div>
)

const MInput = ({
  placeholder,
  value,
  type = "text",
  disabled = false,
  suffix,
}: {
  placeholder?: string
  value?: string
  type?: string
  disabled?: boolean
  suffix?: string
}) => (
  <div className="flex items-center">
    <input
      type={type}
      placeholder={placeholder}
      defaultValue={value}
      disabled={disabled}
      className={`flex-1 text-[15px] text-[#0F172A] placeholder-[#CBD5E1] outline-none bg-transparent ${
        disabled ? "text-[#94A3B8]" : ""
      }`}
    />
    {suffix && (
      <span className="text-sm text-[#94A3B8] ml-1 flex-shrink-0">{suffix}</span>
    )}
  </div>
)

const MArea = ({
  placeholder,
  value,
  rows = 2,
}: {
  placeholder?: string
  value?: string
  rows?: number
}) => (
  <textarea
    placeholder={placeholder}
    defaultValue={value}
    rows={rows}
    className="w-full text-[15px] text-[#0F172A] placeholder-[#CBD5E1] outline-none bg-transparent resize-none leading-relaxed"
  />
)

const MSelect = ({
  placeholder,
  options,
  value,
}: {
  placeholder?: string
  options?: string[]
  value?: string
}) => (
  <div className="flex items-center justify-between">
    <span
      className={`text-[15px] ${value ? "text-[#0F172A]" : "text-[#CBD5E1]"}`}
    >
      {value || placeholder}
    </span>
    <Ic d={P.chevR} size={14} className="text-[#CBD5E1]" />
  </div>
)

const MRadio = ({
  options,
  value,
  onChange,
}: {
  options: string[]
  value?: string
  onChange?: (v: string) => void
}) => (
  <div className="flex flex-wrap gap-2">
    {options.map((o) => (
      <button
        key={o}
        onClick={() => onChange?.(o)}
        className={`px-3.5 h-8 rounded-full text-[13px] font-medium border transition-all ${
          value === o
            ? "bg-[#EFF6FF] border-[#2563EB] text-[#2563EB]"
            : "bg-white border-[#E2E8F0] text-[#64748B]"
        }`}
      >
        {o}
      </button>
    ))}
  </div>
)

const MHint = ({ children }: { children: ReactNode }) => (
  <div className="text-[11px] text-[#94A3B8] leading-relaxed mt-1.5">
    {children}
  </div>
)

const MErr = ({ children }: { children: ReactNode }) => (
  <div className="flex items-start gap-1 text-[11px] text-[#DC2626] mt-1.5 leading-relaxed">
    <Ic d={P.alert} size={12} className="mt-0.5 flex-shrink-0" />
    <span>{children}</span>
  </div>
)

const MC = ({
  children,
  className = "",
  noPad = false,
}: {
  children: ReactNode
  className?: string
  noPad?: boolean
}) => (
  <div
    className={`bg-white rounded-2xl mx-4 mb-3 ${
      noPad ? "" : "px-4"
    } overflow-hidden shadow-[0_1px_4px_0_rgba(15,23,42,0.06)] ${className}`}
  >
    {children}
  </div>
)

const MBtn = ({
  children,
  variant = "primary",
  onClick,
  icon,
  disabled = false,
}: {
  children: ReactNode
  variant?: "primary" | "secondary" | "danger" | "ghost"
  onClick?: () => void
  icon?: string
  disabled?: boolean
}) => {
  const v = {
    primary: "bg-[#2563EB] text-white active:bg-[#1D4ED8]",
    secondary: "bg-[#EFF6FF] text-[#2563EB] active:bg-[#DBEAFE]",
    danger: "bg-[#DC2626] text-white active:bg-[#B91C1C]",
    ghost: "bg-[#F8FAFC] text-[#64748B] active:bg-[#F1F5F9]",
  }
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex-1 h-12 rounded-2xl text-[15px] font-semibold flex items-center justify-center gap-2 transition-all ${v[variant]} ${
        disabled ? "opacity-40" : ""
      }`}
    >
      {icon && <Ic d={P[icon]} size={16} />}
      {children}
    </button>
  )
}

const MKV = ({
  label,
  value,
  highlight = false,
}: {
  label: string
  value: ReactNode
  highlight?: boolean
}) => (
  <div className="flex items-start justify-between py-3 border-b border-[#F1F5F9] last:border-0">
    <span className="text-sm text-[#94A3B8] flex-shrink-0 mr-4">{label}</span>
    <span
      className={`text-sm text-right font-medium ${
        highlight ? "text-[#2563EB]" : "text-[#0F172A]"
      }`}
    >
      {value}
    </span>
  </div>
)

const KVMini = ({
  k,
  v,
  vClass = "",
}: {
  k: string
  v: ReactNode
  vClass?: string
}) => (
  <div className="flex items-center justify-between text-xs py-0.5">
    <span className="text-[#94A3B8]">{k}</span>
    <span className={`text-[#334155] font-medium ${vClass}`}>{v}</span>
  </div>
)

const ActionBtn = ({
  children,
  onClick,
  danger,
  disabled,
}: {
  children: ReactNode
  onClick?: () => void
  danger?: boolean
  disabled?: boolean
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`text-xs font-semibold ${
      disabled ? "text-[#CBD5E1]" : danger ? "text-[#DC2626]" : "text-[#2563EB]"
    }`}
  >
    {children}
  </button>
)

const Banner = ({
  tone = "info",
  children,
}: {
  tone?: "info" | "warn" | "danger"
  children: ReactNode
}) => {
  const t = {
    info: "bg-[#EFF6FF] text-[#2563EB]",
    warn: "bg-[#FFFBEB] text-[#D97706]",
    danger: "bg-[#FEF2F2] text-[#DC2626]",
  }[tone]
  return (
    <div
      className={`mx-4 mt-3 px-3.5 py-2.5 rounded-xl text-xs leading-relaxed flex items-start gap-2 ${t}`}
    >
      <Ic
        d={tone === "danger" ? P.alert : tone === "warn" ? P.clock : P.info}
        size={14}
        className="flex-shrink-0 mt-0.5"
      />
      <div>{children}</div>
    </div>
  )
}

const SearchBar = ({ placeholder = "搜索" }: { placeholder?: string }) => (
  <div className="h-10 rounded-xl bg-white flex items-center px-3 gap-2 shadow-[0_1px_4px_0_rgba(15,23,42,0.06)]">
    <Ic d={P.search} size={14} className="text-[#94A3B8]" />
    <input
      placeholder={placeholder}
      className="flex-1 text-sm outline-none bg-transparent placeholder-[#CBD5E1]"
    />
  </div>
)

const FilterChip = ({ label }: { label: string }) => (
  <button className="flex-shrink-0 flex items-center gap-1 h-8 px-3 rounded-full text-xs font-medium bg-white text-[#64748B] border border-[#E2E8F0]">
    {label}
    <Ic d={P.chevD} size={12} />
  </button>
)

const Photos = ({ count }: { count: number }) => (
  <div className="flex gap-2 py-2">
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="w-14 h-14 rounded-lg bg-gradient-to-br from-[#94A3B8] to-[#475569] flex items-center justify-center"
      >
        <Ic d={P.camera} size={16} className="text-white/80" />
      </div>
    ))}
  </div>
)

const UploadTile = ({
  n,
  max,
  hint,
}: {
  n: number
  max: number
  hint?: string
}) => (
  <div>
    <div className="flex gap-2">
      {Array.from({ length: n }).map((_, i) => (
        <div
          key={i}
          className="relative w-16 h-16 rounded-xl bg-gradient-to-br from-[#94A3B8] to-[#475569] flex items-center justify-center"
        >
          <Ic d={P.camera} size={16} className="text-white/80" />
          <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-black/40 text-white flex items-center justify-center">
            <Ic d={P.x} size={8} />
          </span>
        </div>
      ))}
      {n < max && (
        <button className="w-16 h-16 rounded-xl border-2 border-dashed border-[#CBD5E1] bg-white flex flex-col items-center justify-center gap-0.5 text-[#94A3B8]">
          <Ic d={P.camera} size={16} />
          <span className="text-[9px]">拍照上传</span>
        </button>
      )}
    </div>
    <div className="text-[10px] text-[#94A3B8] mt-1.5">
      {hint ?? `最多 ${max} 张 · 单张 ≤ 5MB · 仅支持拍照`}
    </div>
  </div>
)

const ScanBtn = () => (
  <button className="w-10 h-10 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center flex-shrink-0">
    <Ic d={P.scan} size={16} />
  </button>
)

type FlowStep = {
  node: string
  handler: string
  time: string
  desc?: string
  photos?: number
}

const Timeline = ({ steps }: { steps: FlowStep[] }) => (
  <div className="px-1">
    {steps.map((s, i) => (
      <div key={i} className="flex gap-3">
        <div className="flex flex-col items-center">
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              i === 0 ? "bg-[#2563EB] ring-4 ring-[#EFF6FF]" : "bg-[#CBD5E1]"
            }`}
          />
          {i < steps.length - 1 && (
            <span className="w-px flex-1 bg-[#E2E8F0] my-1" />
          )}
        </div>
        <div className="flex-1 pb-4">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-semibold text-[#0F172A]">
              {s.node}
            </span>
            <span className="text-[11px] text-[#94A3B8]">{s.time}</span>
          </div>
          <div className="text-xs text-[#64748B] mt-0.5">处理人：{s.handler}</div>
          {s.desc && (
            <div className="text-xs text-[#94A3B8] mt-0.5 leading-relaxed">
              {s.desc}
            </div>
          )}
          {s.photos && <Photos count={s.photos} />}
        </div>
      </div>
    ))}
  </div>
)

// ══════════════════════════════════════════════════════════════════════════════
// 共用区 · 页面外壳
// ══════════════════════════════════════════════════════════════════════════════
const StatusBar = () => (
  <div className="h-7 px-6 flex items-center justify-between text-[11px] font-semibold text-[#0F172A]">
    <span>9:41</span>
    <div className="flex items-center gap-1.5">
      <svg width="16" height="10" viewBox="0 0 16 10" fill="currentColor">
        <rect x="0" y="6" width="3" height="4" rx="0.5" />
        <rect x="4.5" y="4" width="3" height="6" rx="0.5" />
        <rect x="9" y="2" width="3" height="8" rx="0.5" />
        <rect x="13.5" y="0" width="3" height="10" rx="0.5" />
      </svg>
      <div className="w-6 h-3 border border-[#0F172A] rounded-[3px] relative">
        <span className="absolute inset-[1.5px] right-1 bg-[#0F172A] rounded-[1px]" />
      </div>
    </div>
  </div>
)

const PageHeader = ({
  title,
  onBack,
  right,
}: {
  title: string
  onBack: () => void
  right?: ReactNode
}) => (
  <div className="h-12 flex items-center px-3 flex-shrink-0 bg-white border-b border-[#F1F5F9]">
    <button
      onClick={onBack}
      className="w-9 h-9 flex items-center justify-center text-[#0F172A]"
    >
      <Ic d={P.chevL} size={18} />
    </button>
    <span className="flex-1 text-center text-[15px] font-semibold text-[#0F172A]">
      {title}
    </span>
    <div className="w-9 flex justify-end items-center">{right}</div>
  </div>
)

const FormShell = ({
  title,
  onBack,
  children,
  actions,
}: {
  title: string
  onBack: () => void
  children: ReactNode
  actions: ReactNode
}) => (
  <div className="flex flex-col h-full bg-[#F5F7FA]">
    <PageHeader
      title={title}
      onBack={onBack}
      right={
        <button onClick={onBack} className="text-xs text-[#64748B]">
          取消
        </button>
      }
    />
    <div className="flex-1 overflow-auto pt-1 pb-2">{children}</div>
    <div className="flex gap-3 px-4 py-3 bg-white border-t border-[#F1F5F9] flex-shrink-0">
      {actions}
    </div>
  </div>
)

const ListShell = ({
  title,
  onBack,
  onNew,
  searchPlaceholder,
  filters,
  children,
}: {
  title: string
  onBack: () => void
  onNew?: () => void
  searchPlaceholder?: string
  filters: string[]
  children: ReactNode
}) => (
  <div className="flex flex-col h-full bg-[#F5F7FA]">
    <PageHeader
      title={title}
      onBack={onBack}
      right={
        onNew && (
          <button
            onClick={onNew}
            className="flex items-center gap-1 text-xs font-semibold text-[#2563EB]"
          >
            <Ic d={P.plus} size={14} />
            新增申请
          </button>
        )
      }
    />
    <div className="px-4 pt-3 flex-shrink-0">
      <SearchBar placeholder={searchPlaceholder} />
      <div className="flex gap-2 mt-2.5 overflow-x-auto pb-1">
        {filters.map((f) => (
          <FilterChip key={f} label={f} />
        ))}
      </div>
    </div>
    <div className="flex-1 overflow-auto pt-1 pb-4">{children}</div>
  </div>
)

const DetailShell = ({
  title,
  onBack,
  children,
  actions,
}: {
  title: string
  onBack: () => void
  children: ReactNode
  actions?: ReactNode
}) => (
  <div className="flex flex-col h-full bg-[#F5F7FA]">
    <PageHeader title={title} onBack={onBack} />
    <div className="flex-1 overflow-auto pt-1 pb-4">{children}</div>
    {actions && (
      <div className="flex gap-3 px-4 py-3 bg-white border-t border-[#F1F5F9] flex-shrink-0">
        {actions}
      </div>
    )}
  </div>
)

const InfoCard = ({
  title,
  action,
  children,
}: {
  title: string
  action?: ReactNode
  children: ReactNode
}) => (
  <MC>
    <div className="flex items-center justify-between pt-4">
      <span className="text-sm font-bold text-[#0F172A]">{title}</span>
      {action}
    </div>
    <div>{children}</div>
  </MC>
)

// ══════════════════════════════════════════════════════════════════════════════
// 页面类型与导航数据源（新 section 条目必须追加到对应分组末尾）
// ══════════════════════════════════════════════════════════════════════════════
type Crm2Page =
  | "workbench"
  | "jc-form"
  | "jc-list"
  | "jc-detail"
  | "qd-form"
  | "qd-list"
  | "qd-detail"
  | "device-hub"
  | "zj-form"
  | "zj-list"
  | "zj-detail"
  | "cc-form"
  | "cc-list"
  | "cc-detail"
  | "yj-form"
  | "yj-list"
  | "yj-detail"
  | "wx-form"
  | "wx-list"
  | "wx-detail"

// ══════════════════════════════════════════════════════════════════════════════
// 数据源（mock，仅用于原型展示）
// ══════════════════════════════════════════════════════════════════════════════
const JF_CUSTOMERS = [
  {
    no: "CJ20261028 0031",
    name: "浙江绿源食品有限公司",
    addr: "浙江省杭州市西湖区文三路 199 号",
    contact: "陈志远",
    phone: "138****8888",
    owner: "销售 · 王建国",
    settle: "现结",
    status: "已通过",
    total: "¥36,420.00",
    created: "2026-10-28 14:22",
    approved: "2026-10-29 10:05",
  },
  {
    no: "CJ20261029 0032",
    name: "杭州启航文创工作室",
    addr: "浙江省杭州市余杭区梦想小镇 12 幢",
    contact: "刘敏",
    phone: "139****2266",
    owner: "渠道商 · 星选贸易",
    settle: "货到付款",
    status: "待审批",
    total: "—",
    created: "2026-10-29 16:40",
    approved: "—",
  },
  {
    no: "CJ20261027 0028",
    name: "宁波蓝湾餐饮管理有限公司",
    addr: "浙江省宁波市鄞州区泰安中路 88 号",
    contact: "周凯",
    phone: "137****9911",
    owner: "销售 · 王建国",
    settle: "现结",
    status: "已驳回",
    total: "—",
    created: "2026-10-27 09:15",
    approved: "2026-10-27 18:02",
    reject: "结算账户开户名与客户名称不一致，请核对后重新提交。",
  },
  {
    no: "CJ20261030 0035",
    name: "绍兴云仓百货",
    addr: "浙江省绍兴市越城区解放大道 560 号",
    contact: "赵小满",
    phone: "136****4477",
    owner: "销售 · 李承泽",
    settle: "现结",
    status: "草稿",
    total: "—",
    created: "2026-10-30 08:12",
    approved: "—",
  },
  {
    no: "CJ20261015 0019",
    name: "金华丰收超市连锁",
    addr: "浙江省金华市婺城区宾虹路 300 号",
    contact: "孙立",
    phone: "135****3300",
    owner: "渠道商 · 星选贸易",
    settle: "货到付款",
    status: "已停用",
    total: "¥128,900.00",
    created: "2026-10-15 11:30",
    approved: "2026-10-16 09:44",
  },
]

const QD_PARTNERS = [
  {
    no: "QD20261020 0007",
    name: "星选贸易有限公司",
    addr: "浙江省杭州市拱墅区祥园路 33 号",
    contact: "郑海涛",
    phone: "138****5522",
    settle: "月结",
    jcCount: 3,
    wdCount: 6,
    status: "已通过",
    created: "2026-10-20 10:18",
    approved: "2026-10-21 09:30",
  },
  {
    no: "QD20261029 0009",
    name: "越城商贸有限公司",
    addr: "浙江省绍兴市越城区胜利东路 21 号",
    contact: "吴雪",
    phone: "139****7788",
    settle: "季结",
    jcCount: 0,
    wdCount: 0,
    status: "待审批",
    total: "—",
    created: "2026-10-29 15:26",
    approved: "—",
  },
  {
    no: "QD20261018 0005",
    name: "甬江供应链管理有限公司",
    addr: "浙江省宁波市江北区北岸财富中心 6 幢",
    contact: "何俊",
    phone: "137****6600",
    settle: "月结",
    jcCount: 1,
    wdCount: 2,
    status: "已驳回",
    created: "2026-10-18 13:40",
    approved: "2026-10-18 17:25",
    reject: "合同附件影像模糊，无法辨识公章，请重新上传。",
  },
]

const ZJ_ORDERS = [
  {
    no: "ZJ20261028 0042",
    loc: "蜂巢·科技园北楼 1F（杭州·西湖区）",
    model: "SC-48 双温柜",
    sn: "待装机绑定",
    date: "2026-11-02",
    created: "2026-10-28 11:20",
    approval: "待审批",
    ff: "—",
    handler: "—",
    handlerTime: "—",
  },
  {
    no: "ZJ20261026 0039",
    loc: "绿洲·滨江天街 3F（杭州·滨江区）",
    model: "SC-24 常温柜",
    sn: "SN2026A0038",
    date: "2026-10-30",
    created: "2026-10-26 09:44",
    approval: "已通过",
    ff: "处理中",
    handler: "张卫东（履约）",
    handlerTime: "2026-10-29 17:31",
  },
  {
    no: "ZJ20261024 0036",
    loc: "云谷·未来社区中心（宁波·鄞州区）",
    model: "SC-48 双温柜",
    sn: "SN2026A0021",
    date: "2026-10-28",
    created: "2026-10-24 14:02",
    approval: "已通过",
    ff: "已完成",
    handler: "李国强",
    handlerTime: "2026-10-28 16:45",
  },
  {
    no: "ZJ20261022 0033",
    loc: "江畔·银泰城 B1（绍兴·越城区）",
    model: "SC-24 常温柜",
    sn: "待装机绑定",
    date: "2026-10-27",
    created: "2026-10-22 10:05",
    approval: "已驳回",
    ff: "—",
    handler: "—",
    handlerTime: "—",
    reject: "点位资质材料不全，请补充物业盖章证明后重新提交。",
  },
]

const CC_ORDERS = [
  {
    no: "CC20261027 0011",
    sn: "SN2026A0022",
    loc: "恒通·创意产业园 2F（杭州·余杭区）",
    install: "2026-08-14",
    date: "2026-11-05",
    created: "2026-10-27 13:48",
    taskNo: "XJ20261027 0064",
    taskItems: "24 个 SKU · 118 件",
    taskStatus: "执行中",
    ff: "待处理",
    handler: "—",
    handlerTime: "—",
  },
  {
    no: "CC20261025 0009",
    sn: "SN2026A0017",
    loc: "望山·写字楼大堂（杭州·西湖区）",
    install: "2026-06-20",
    date: "2026-11-01",
    created: "2026-10-25 10:12",
    taskNo: "XJ20261025 0058",
    taskItems: "18 个 SKU · 92 件",
    taskStatus: "已完成",
    ff: "处理中",
    handler: "周明（履约）",
    handlerTime: "2026-10-29 10:12",
  },
  {
    no: "CC20261018 0006",
    sn: "SN2025B0074",
    loc: "老街·社区广场（绍兴·柯桥区）",
    install: "2025-12-02",
    date: "2026-10-22",
    created: "2026-10-18 16:30",
    taskNo: "XJ20261018 0041",
    taskItems: "21 个 SKU · 87 件",
    taskStatus: "已完成",
    ff: "已完成",
    handler: "周明（履约）",
    handlerTime: "2026-10-22 18:07",
  },
]

const YJ_ORDERS = [
  {
    no: "YJ20261029 0007",
    sn: "SN2026A0038",
    fromName: "绿洲·滨江天街 3F",
    toName: "星光·文创园区 1F",
    install: "2026-08-14",
    date: "2026-11-08",
    created: "2026-10-29 09:30",
    taskNo: "QP20261029 0113",
    taskStatus: "待执行",
    ff: "待处理",
    handler: "—",
    handlerTime: "—",
  },
  {
    no: "YJ20261027 0005",
    sn: "SN2026A0026",
    fromName: "云谷·未来社区中心",
    toName: "云谷·邻里中心 2F",
    install: "2026-07-08",
    date: "2026-11-03",
    created: "2026-10-27 11:05",
    taskNo: "QP20261027 0108",
    taskStatus: "执行中",
    ff: "处理中",
    handler: "张卫东（履约）",
    handlerTime: "2026-10-30 08:40",
  },
  {
    no: "YJ20261020 0002",
    sn: "SN2025B0091",
    fromName: "江畔·银泰城 B1",
    toName: "江畔·银泰城 3F",
    install: "2025-11-15",
    date: "2026-10-24",
    created: "2026-10-20 14:22",
    taskNo: "QP20261020 0096",
    taskStatus: "已完成",
    ff: "已完成",
    handler: "张卫东（履约）",
    handlerTime: "2026-10-24 17:12",
  },
]

const WX_ORDERS = [
  {
    no: "WX20261029 0021",
    sn: "SN2026A0041",
    loc: "云谷·未来社区中心（宁波·鄞州区）",
    fault: "无法开门",
    created: "2026-10-29 08:15",
    ff: "处理中",
    handler: "李国强（维修工程师）",
    handlerTime: "2026-10-29 09:02",
  },
  {
    no: "WX20261030 0022",
    sn: "SN2026A0038",
    loc: "绿洲·滨江天街 3F（杭州·滨江区）",
    fault: "支付异常",
    created: "2026-10-30 07:48",
    ff: "待处理",
    handler: "—",
    handlerTime: "—",
  },
  {
    no: "WX20261026 0018",
    sn: "SN2026A0022",
    loc: "恒通·创意产业园 2F（杭州·余杭区）",
    fault: "制冷异常",
    created: "2026-10-26 15:20",
    ff: "已完成",
    handler: "李国强（维修工程师）",
    handlerTime: "2026-10-27 15:40",
  },
]

// ══════════════════════════════════════════════════════════════════════════════
// 工作台
// ══════════════════════════════════════════════════════════════════════════════
const WbCard = ({
  icon,
  bg,
  fg,
  title,
  desc,
  badge,
  onClick,
}: {
  icon: string
  bg: string
  fg: string
  title: string
  desc: string
  badge?: string
  onClick?: () => void
}) => (
  <button
    onClick={onClick}
    className="bg-white rounded-2xl p-4 text-left shadow-[0_1px_4px_0_rgba(15,23,42,0.06)]"
  >
    <div
      className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
      style={{ background: bg, color: fg }}
    >
      <Ic d={P[icon]} size={18} />
    </div>
    <div className="text-sm font-bold text-[#0F172A]">{title}</div>
    <div className="text-[11px] text-[#94A3B8] mt-0.5 leading-relaxed">{desc}</div>
    {badge && (
      <div
        className="inline-flex mt-2 px-2 py-0.5 rounded-full text-[10px] font-semibold"
        style={{ background: bg, color: fg }}
      >
        {badge}
      </div>
    )}
  </button>
)

const Workbench = ({ onNav }: { onNav: (p: Crm2Page) => void }) => (
  <div className="h-full flex flex-col bg-[#F5F7FA] overflow-auto">
    <div className="bg-gradient-to-b from-[#FFF7ED] to-[#F5F7FA] px-5 pt-8 pb-5">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[11px] text-[#EA580C] font-semibold">
            10 月 30 日 · 周五
          </div>
          <h1 className="text-[22px] font-bold text-[#0F172A] mt-1">
            早上好，王建国
          </h1>
          <div className="text-xs text-[#94A3B8] mt-1">
            销售 CRM 小程序 · 2 期
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center text-[#64748B]">
            <Ic d={P.bell} size={16} />
          </button>
          <div className="w-9 h-9 rounded-full bg-[#F97316] text-white flex items-center justify-center text-xs font-bold">
            建
          </div>
        </div>
      </div>
    </div>
    <div className="px-4 pb-6">
      <div className="grid grid-cols-2 gap-3">
        <WbCard
          icon="users"
          bg="#FFF7ED"
          fg="#EA580C"
          title="集采客户管理"
          desc="入驻申请 · 客户档案 · 经营数据"
          badge="2 条待审批"
          onClick={() => onNav("jc-list")}
        />
        <WbCard
          icon="building"
          bg="#EFF6FF"
          fg="#2563EB"
          title="渠道商管理"
          desc="渠道入驻 · 关联客户"
          badge="1 条待审批"
          onClick={() => onNav("qd-list")}
        />
        <WbCard
          icon="pkg"
          bg="#F0FDF4"
          fg="#16A34A"
          title="设备管理"
          desc="装机 / 撤机 / 移机 / 维修"
          badge="4 个工单进行中"
          onClick={() => onNav("device-hub")}
        />
        <WbCard
          icon="checkC"
          bg="#F5F3FF"
          fg="#7C3AED"
          title="审批中心"
          desc="功能与一期一致，聚合新增集采客户 / 新增渠道商审批"
          badge="3 条待办"
        />
      </div>
      <div className="mt-4">
        <Banner>
          集采客户本期结算类型仅开放「现结 / 货到付款」；渠道商支持月结与季结。
        </Banner>
      </div>
      <div className="flex items-center justify-between px-1 mt-4 mb-1">
        <span className="text-sm font-bold text-[#0F172A]">进行中的工单</span>
        <button className="text-xs text-[#2563EB] font-semibold">全部工单</button>
      </div>
      <MC className="!mx-0">
        <button
          onClick={() => onNav("zj-detail")}
          className="w-full flex items-center justify-between px-4 py-3.5 border-b border-[#F1F5F9]"
        >
          <div className="text-left">
            <div className="text-[13px] font-semibold text-[#0F172A]">
              ZJ20261026 0039
            </div>
            <div className="text-[11px] text-[#94A3B8] mt-0.5">
              装机 · 绿洲·滨江天街 3F
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Tag label="处理中" color="blue" />
            <Ic d={P.chevR} size={14} className="text-[#CBD5E1]" />
          </div>
        </button>
        <button
          onClick={() => onNav("wx-detail")}
          className="w-full flex items-center justify-between px-4 py-3.5 border-b border-[#F1F5F9]"
        >
          <div className="text-left">
            <div className="text-[13px] font-semibold text-[#0F172A]">
              WX20261029 0021
            </div>
            <div className="text-[11px] text-[#94A3B8] mt-0.5">
              维修 · 云谷·未来社区中心 · 无法开门
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Tag label="处理中" color="blue" />
            <Ic d={P.chevR} size={14} className="text-[#CBD5E1]" />
          </div>
        </button>
        <button
          onClick={() => onNav("cc-detail")}
          className="w-full flex items-center justify-between px-4 py-3.5"
        >
          <div className="text-left">
            <div className="text-[13px] font-semibold text-[#0F172A]">
              CC20261027 0011
            </div>
            <div className="text-[11px] text-[#94A3B8] mt-0.5">
              撤机 · 恒通·创意产业园 2F
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Tag label="待处理" color="yellow" />
            <Ic d={P.chevR} size={14} className="text-[#CBD5E1]" />
          </div>
        </button>
      </MC>
    </div>
  </div>
)

// ══════════════════════════════════════════════════════════════════════════════
// 设备管理入口
// ══════════════════════════════════════════════════════════════════════════════
const DeviceHub = ({
  onBack,
  onNav,
}: {
  onBack: () => void
  onNav: (p: Crm2Page) => void
}) => {
  const cards: {
    page: Crm2Page
    icon: string
    title: string
    desc: string
    counts: string
  }[] = [
    {
      page: "zj-list",
      icon: "pkg",
      title: "装机申请",
      desc: "提交机柜安装申请，生成装机工单流转审批与履约派单",
      counts: "待处理 1 · 处理中 1",
    },
    {
      page: "cc-list",
      icon: "xC",
      title: "撤机申请",
      desc: "提交后自动生成下架任务并拦截补货，下架完成为撤机前置",
      counts: "待处理 1 · 处理中 1",
    },
    {
      page: "yj-list",
      icon: "arrow",
      title: "移机申请",
      desc: "提交后自动生成全盘单挂靠工单，完成后自动更新点位地址",
      counts: "待处理 1 · 处理中 1",
    },
    {
      page: "wx-list",
      icon: "settings",
      title: "维修申请",
      desc: "2 小时内响应，24 小时上门，处理中可补充故障信息",
      counts: "待处理 1 · 处理中 1",
    },
  ]
  return (
    <div className="flex flex-col h-full bg-[#F5F7FA]">
      <PageHeader title="设备管理" onBack={onBack} />
      <div className="flex-1 overflow-auto p-4">
        {cards.map((c) => (
          <button
            key={c.title}
            onClick={() => onNav(c.page)}
            className="w-full bg-white rounded-2xl p-4 mb-3 flex items-start gap-3 shadow-[0_1px_4px_0_rgba(15,23,42,0.06)] text-left"
          >
            <div className="w-11 h-11 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center flex-shrink-0">
              <Ic d={P[c.icon]} size={20} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-[15px] font-bold text-[#0F172A]">
                  {c.title}
                </span>
                <span className="text-[10px] text-[#94A3B8]">{c.counts}</span>
              </div>
              <div className="text-xs text-[#94A3B8] mt-1 leading-relaxed">
                {c.desc}
              </div>
            </div>
            <Ic d={P.chevR} size={14} className="text-[#CBD5E1] mt-1" />
          </button>
        ))}
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// 4.1.1 集采客户管理
// ══════════════════════════════════════════════════════════════════════════════
const JcForm = ({
  onBack,
  onSuccess,
}: {
  onBack: () => void
  onSuccess: () => void
}) => {
  const [signed, setSigned] = useState("否")
  const [ownerType, setOwnerType] = useState("销售")
  return (
    <FormShell
      title="提交集采客户申请"
      onBack={onBack}
      actions={
        <>
          <MBtn variant="secondary">保存草稿</MBtn>
          <MBtn onClick={onSuccess}>提交审批</MBtn>
        </>
      }
    >
      <Banner>
        本期结算类型仅支持「现结 / 货到付款」，预付款与月结暂不开放。
      </Banner>
      <MC>
        <MF label="客户名称" required>
          <MInput placeholder="1-50 字符" value="宁波蓝湾餐饮管理有限公司" />
          <MErr>客户已存在，是否继续添加？（同一归属对象下客户名称不可重复）</MErr>
        </MF>
        <MF label="客户地址" required>
          <MSelect placeholder="请选择省 / 市 / 区" value="浙江省 宁波市 鄞州区" />
          <div className="mt-1">
            <MInput placeholder="街道、楼牌号等详细地址" value="首南街道泰安中路 88 号" />
          </div>
          <MHint>用于配送路由与默认出货仓库匹配（按城市匹配默认仓库）</MHint>
        </MF>
        <MF label="联系人" required>
          <MInput placeholder="请输入姓名" value="周凯" />
        </MF>
        <MF label="联系电话" required>
          <MInput placeholder="11 位手机号" value="13799110888" />
          <MErr>该手机号已被客户 CJ20261015 0019 绑定，同一手机号不可重复绑定</MErr>
        </MF>
      </MC>
      <MC>
        <MF label="结算账户 · 开户名" required>
          <MInput value="宁波蓝湾餐饮管理有限公司" />
        </MF>
        <MF label="结算账户 · 开户行" required>
          <MInput value="中国银行宁波鄞州支行" />
        </MF>
        <MF label="结算账户 · 银行账号" required>
          <MInput value="6217001300023045678" />
          <MHint>仅数字，15-25 位；用于开票与退款打款</MHint>
        </MF>
      </MC>
      <MC>
        <MF label="是否签订合同" required>
          <MRadio options={["是", "否"]} value={signed} onChange={setSigned} />
        </MF>
        {signed === "是" ? (
          <>
            <MF label="合同有效期" required>
              <MSelect value="2026-11-01 ~ 2027-10-31" />
              <MHint>结束日期不得早于开始日期</MHint>
            </MF>
            <MF label="合同附件" required>
              <UploadTile n={2} max={5} hint="最多 5 个文件，单个 ≤ 10MB，支持图片 / PDF" />
            </MF>
          </>
        ) : (
          <MHint>选择「是」后需填写合同有效期并上传合同附件</MHint>
        )}
      </MC>
      <MC>
        <MF label="归属对象" required>
          <MRadio options={["销售", "渠道商"]} value={ownerType} onChange={setOwnerType} />
        </MF>
        <MF
          label={ownerType === "销售" ? "归属销售（下拉搜索）" : "归属渠道商（下拉搜索）"}
          required
        >
          <MSelect
            value={ownerType === "销售" ? "王建国（本人）" : "星选贸易有限公司"}
          />
        </MF>
        <MHint>
          归属对象决定客户数据与业绩归属，提交后不可自行修改；如需调整由集采运营系统在【客户信息维护】中操作。
        </MHint>
        <MF label="保证金金额">
          <MInput value="20000" suffix="元" />
          <MHint>≥0，保留 2 位小数，上限 99999999.99</MHint>
        </MF>
        <MF label="结算类型" required>
          <MRadio options={["现结", "货到付款"]} value="现结" />
        </MF>
        <MF label="备注">
          <MArea placeholder="≤200 字" />
        </MF>
      </MC>
      <div className="px-4 text-[10px] text-[#94A3B8] leading-relaxed">
        提交后生成审批单（类型=新增集采客户）流转至审批中心，由对应主管审批；审批通过前客户状态为「待审批」。
      </div>
    </FormShell>
  )
}

const JcList = ({
  onBack,
  onNew,
  onDetail,
}: {
  onBack: () => void
  onNew: () => void
  onDetail: () => void
}) => (
  <ListShell
    title="集采客户列表"
    onBack={onBack}
    onNew={onNew}
    searchPlaceholder="搜索客户名称 / 客户编号"
    filters={["客户状态", "归属对象", "结算类型", "申请日期"]}
  >
    {JF_CUSTOMERS.map((c) => (
      <MC key={c.no}>
        <button onClick={onDetail} className="w-full text-left">
          <div className="pt-4 flex items-start justify-between">
            <div>
              <div className="text-[15px] font-bold text-[#0F172A]">{c.name}</div>
              <div className="text-[11px] text-[#94A3B8] mt-0.5">{c.no}</div>
            </div>
            <Tag label={c.status} color={statusColor(c.status)} />
          </div>
          <div className="mt-2.5 space-y-1">
            <div className="text-xs text-[#64748B] flex items-start gap-1.5">
              <Ic d={P.pin} size={12} className="mt-0.5 flex-shrink-0" />
              <span className="flex-1">{c.addr}</span>
            </div>
            <div className="text-xs text-[#64748B] flex items-center gap-3">
              <span>{c.contact}</span>
              <span>{c.phone}</span>
              <span className="px-1.5 py-0.5 rounded bg-[#F8FAFC] text-[#64748B] text-[10px] font-medium">
                {c.settle}
              </span>
            </div>
            <div className="text-xs text-[#64748B]">{c.owner}</div>
          </div>
        </button>
        {c.status === "已驳回" && c.reject && (
          <div className="mt-2.5 rounded-xl bg-[#FEF2F2] px-3 py-2.5">
            <div className="text-[11px] text-[#DC2626] leading-relaxed">
              驳回原因：{c.reject}
            </div>
            <div className="flex gap-4 mt-1.5">
              <ActionBtn danger>修改并重新提交</ActionBtn>
            </div>
          </div>
        )}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#F1F5F9]">
          <div className="text-xs text-[#94A3B8]">
            历史订单总额{" "}
            <span className="font-semibold text-[#0F172A]">{c.total}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-[#94A3B8]">
              创建 {c.created} · 审批 {c.approved}
            </span>
            {(c.status === "草稿" || c.status === "已驳回") && (
              <ActionBtn onClick={onDetail}>编辑</ActionBtn>
            )}
          </div>
        </div>
      </MC>
    ))}
  </ListShell>
)

const JcDetail = ({ onBack }: { onBack: () => void }) => (
  <DetailShell
    title="集采客户详情"
    onBack={onBack}
    actions={
      <>
        <MBtn variant="secondary" icon="edit">
          编辑（草稿/已驳回）
        </MBtn>
        <MBtn variant="ghost" icon="arrow">
          查看订单
        </MBtn>
      </>
    }
  >
    <Banner tone="danger">
      审批状态：已驳回。驳回原因：结算账户开户名与客户名称不一致，请核对后重新提交。
    </Banner>
    <InfoCard title="基础信息">
      <div className="pt-1">
        <MKV label="客户编号" value="CJ20261027 0028" />
        <MKV label="客户名称" value="宁波蓝湾餐饮管理有限公司" />
        <MKV label="客户地址" value="浙江省宁波市鄞州区泰安中路 88 号" />
        <MKV label="联系人" value="周凯" />
        <MKV
          label="联系电话"
          value={
            <span className="inline-flex items-center gap-1.5">
              137****9911
              <Ic d={P.phone} size={13} className="text-[#2563EB]" />
            </span>
          }
        />
        <MKV label="状态" value={<Tag label="已驳回" color="red" />} />
      </div>
    </InfoCard>
    <InfoCard title="经营数据" action={<ActionBtn>查看订单</ActionBtn>}>
      <div className="pt-1">
        <MKV label="历史订单总额" value="—" />
        <MKV label="累计订单数" value="—" />
        <MKV label="最近下单时间" value="—" />
      </div>
    </InfoCard>
    <InfoCard title="商务合同">
      <div className="pt-1">
        <MKV label="结算类型" value="现结" />
        <MKV label="结算账户信息" value="宁波蓝湾餐饮管理有限公司 · 中国银行宁波鄞州支行 · 6217****5678" />
        <MKV label="是否签订合同" value="是" />
        <MKV label="合同有效期" value="2026-11-01 ~ 2027-10-31" />
        <MKV
          label="合同附件"
          value={
            <span className="inline-flex items-center gap-1 text-[#2563EB]">
              <Ic d={P.doc} size={13} />
              合作协议.pdf
            </span>
          }
          highlight
        />
        <MKV label="保证金金额" value="¥20,000.00" />
        <MKV label="备注" value="—" />
      </div>
    </InfoCard>
    <InfoCard title="审批信息" action={<ActionBtn>查看审批记录</ActionBtn>}>
      <div className="pt-1">
        <MKV label="审批状态" value={<Tag label="已驳回" color="red" />} />
        <MKV label="审批人" value="陈主管" />
        <MKV label="审批时间" value="2026-10-27 18:02" />
        <MKV
          label="驳回原因"
          value={<span className="text-[#DC2626]">结算账户开户名与客户名称不一致</span>}
        />
      </div>
    </InfoCard>
  </DetailShell>
)

// ══════════════════════════════════════════════════════════════════════════════
// 4.1.2 渠道商管理
// ══════════════════════════════════════════════════════════════════════════════
const QdForm = ({ onBack, onSuccess }: { onBack: () => void; onSuccess: () => void }) => (
  <FormShell
    title="提交新增渠道商申请"
    onBack={onBack}
    actions={
      <>
        <MBtn variant="secondary">保存草稿</MBtn>
        <MBtn onClick={onSuccess}>提交审批</MBtn>
      </>
    }
  >
    <Banner>渠道商结算类型支持「月结 / 季结」两种。</Banner>
    <MC>
      <MF label="渠道商名称" required>
        <MInput placeholder="1-50 字符，全局查重" value="星选贸易有限公司" />
      </MF>
      <MF label="渠道商地址" required>
        <MSelect placeholder="请选择省 / 市 / 区" value="浙江省 杭州市 拱墅区" />
        <div className="mt-1">
          <MInput placeholder="街道、楼牌号等详细地址" value="祥园路 33 号智慧信息产业园 4 幢" />
        </div>
      </MF>
      <MF label="联系人" required>
        <MInput value="郑海涛" />
      </MF>
      <MF label="联系电话" required>
        <MInput placeholder="11 位手机号格式校验" value="13855662200" />
      </MF>
    </MC>
    <MC>
      <MF label="结算账户 · 开户名" required>
        <MInput value="星选贸易有限公司" />
      </MF>
      <MF label="结算账户 · 开户行" required>
        <MInput value="招商银行杭州拱墅支行" />
      </MF>
      <MF label="结算账户 · 银行账号" required>
        <MInput value="6225882110034567" />
        <MHint>仅数字，15-25 位</MHint>
      </MF>
    </MC>
    <MC>
      <MF label="合同有效期" required>
        <MSelect value="2026-11-01 ~ 2028-10-31" />
        <MHint>结束日期不得早于开始日期</MHint>
      </MF>
      <MF label="合同附件" required>
        <UploadTile n={3} max={5} hint="最多 5 个，单个 ≤ 10MB，支持图片 / PDF" />
      </MF>
      <MF label="保证金金额">
        <MInput value="50000" suffix="元" />
        <MHint>≥0，保留 2 位小数</MHint>
      </MF>
      <MF label="结算类型" required>
        <MRadio options={["月结", "季结"]} value="月结" />
      </MF>
      <MF label="备注">
        <MArea placeholder="≤200 字" />
      </MF>
    </MC>
    <div className="px-4 text-[10px] text-[#94A3B8] leading-relaxed">
      提交后生成审批单（类型=新增渠道商）流转至审批中心。
    </div>
  </FormShell>
)

const QdList = ({
  onBack,
  onNew,
  onDetail,
}: {
  onBack: () => void
  onNew: () => void
  onDetail: () => void
}) => (
  <ListShell
    title="渠道商列表"
    onBack={onBack}
    onNew={onNew}
    searchPlaceholder="搜索渠道商名称 / 编号"
    filters={["状态", "结算类型", "申请日期"]}
  >
    {QD_PARTNERS.map((c) => (
      <MC key={c.no}>
        <button onClick={onDetail} className="w-full text-left">
          <div className="pt-4 flex items-start justify-between">
            <div>
              <div className="text-[15px] font-bold text-[#0F172A]">{c.name}</div>
              <div className="text-[11px] text-[#94A3B8] mt-0.5">{c.no}</div>
            </div>
            <Tag label={c.status} color={statusColor(c.status)} />
          </div>
          <div className="mt-2.5 space-y-1">
            <div className="text-xs text-[#64748B] flex items-start gap-1.5">
              <Ic d={P.pin} size={12} className="mt-0.5 flex-shrink-0" />
              <span className="flex-1">{c.addr}</span>
            </div>
            <div className="text-xs text-[#64748B] flex items-center gap-3">
              <span>{c.contact}</span>
              <span>{c.phone}</span>
              <span className="px-1.5 py-0.5 rounded bg-[#F8FAFC] text-[#64748B] text-[10px] font-medium">
                {c.settle}
              </span>
            </div>
            <div className="text-xs text-[#64748B] flex items-center gap-3">
              <span>
                关联客户：
                <span className="text-[#2563EB] font-semibold">集采 {c.jcCount}</span>
                <span className="mx-1 text-[#CBD5E1]">·</span>
                <span className="text-[#2563EB] font-semibold">点位 {c.wdCount}</span>
              </span>
              <ActionBtn>查看明细</ActionBtn>
            </div>
          </div>
        </button>
        {c.status === "已驳回" && c.reject && (
          <div className="mt-2.5 rounded-xl bg-[#FEF2F2] px-3 py-2.5">
            <div className="text-[11px] text-[#DC2626] leading-relaxed">
              驳回原因：{c.reject}
            </div>
            <div className="flex gap-4 mt-1.5">
              <ActionBtn danger>修改并重新提交</ActionBtn>
            </div>
          </div>
        )}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#F1F5F9]">
          <span className="text-[10px] text-[#94A3B8]">
            创建 {c.created} · 审批 {c.approved}
          </span>
          <div className="flex items-center gap-3">
            {(c.status === "草稿" || c.status === "已驳回") && (
              <ActionBtn onClick={onDetail}>编辑 / 重新提交</ActionBtn>
            )}
            <ActionBtn onClick={onDetail}>详情</ActionBtn>
          </div>
        </div>
      </MC>
    ))}
  </ListShell>
)

const QdDetail = ({ onBack }: { onBack: () => void }) => (
  <DetailShell
    title="渠道商详情"
    onBack={onBack}
    actions={
      <>
        <MBtn variant="secondary" icon="edit">
          编辑（草稿/已驳回）
        </MBtn>
      </>
    }
  >
    <InfoCard title="基础信息">
      <div className="pt-1">
        <MKV label="渠道商编号" value="QD20261020 0007" />
        <MKV label="客户名称" value="星选贸易有限公司" />
        <MKV label="客户地址" value="浙江省杭州市拱墅区祥园路 33 号智慧信息产业园 4 幢" />
        <MKV label="联系人 / 联系电话" value="郑海涛 · 138****5522" />
        <MKV label="状态" value={<Tag label="已通过" color="green" />} />
      </div>
    </InfoCard>
    <InfoCard title="关联客户">
      <div className="pt-2 pb-3 border-b border-[#F1F5F9]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-[#0F172A]">
            集采客户 · 3 户
          </span>
          <ActionBtn>查看全部</ActionBtn>
        </div>
        {["浙江绿源食品有限公司", "杭州启航文创工作室", "宁波蓝湾餐饮管理有限公司"].map(
          (n) => (
            <div
              key={n}
              className="flex items-center justify-between py-2 border-t border-[#F8FAFC]"
            >
              <span className="text-xs text-[#334155]">{n}</span>
              <Ic d={P.chevR} size={12} className="text-[#CBD5E1]" />
            </div>
          )
        )}
      </div>
      <div className="pt-3 pb-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-[#0F172A]">
            点位客户 · 6 户
          </span>
          <ActionBtn>查看全部</ActionBtn>
        </div>
        {["蜂巢·科技园北楼 1F", "绿洲·滨江天街 3F", "云谷·未来社区中心"].map((n) => (
          <div
            key={n}
            className="flex items-center justify-between py-2 border-t border-[#F8FAFC]"
          >
            <span className="text-xs text-[#334155]">{n}</span>
            <Ic d={P.chevR} size={12} className="text-[#CBD5E1]" />
          </div>
        ))}
        <div className="text-[10px] text-[#94A3B8] mt-1">等 6 户，点击可跳转对应明细</div>
      </div>
    </InfoCard>
    <InfoCard title="经营数据">
      <div className="pt-2 pb-3 border-b border-[#F1F5F9]">
        <div className="text-xs font-semibold text-[#0F172A] mb-1">集采客户</div>
        <KVMini k="历史订单总额" v="¥89,200.00" />
        <KVMini k="累计订单数" v="36 单" />
        <KVMini k="最近下单时间" v="2026-10-26 15:12" />
      </div>
      <div className="pt-3 pb-3">
        <div className="text-xs font-semibold text-[#0F172A] mb-1">点位客户</div>
        <KVMini k="历史订单总额" v="¥210,460.00" />
        <KVMini k="累计订单数" v="428 单" />
        <KVMini k="最近下单时间" v="2026-10-30 07:45" />
      </div>
    </InfoCard>
    <InfoCard title="商务合同">
      <div className="pt-1">
        <MKV label="结算类型" value="月结" />
        <MKV label="结算账户信息" value="星选贸易有限公司 · 招商银行杭州拱墅支行 · 6225****4567" />
        <MKV label="合同有效期" value="2026-11-01 ~ 2028-10-31" />
        <MKV
          label="合同附件"
          value={
            <span className="inline-flex items-center gap-1 text-[#2563EB]">
              <Ic d={P.doc} size={13} />
              渠道合作协议.pdf
            </span>
          }
          highlight
        />
        <MKV label="保证金金额" value="¥50,000.00" />
        <MKV label="备注" value="—" />
      </div>
    </InfoCard>
    <InfoCard title="审批信息" action={<ActionBtn>查看审批记录</ActionBtn>}>
      <div className="pt-1">
        <MKV label="审批状态" value={<Tag label="已通过" color="green" />} />
        <MKV label="审批人" value="陈主管" />
        <MKV label="审批时间" value="2026-10-21 09:30" />
        <MKV label="驳回原因" value="—" />
      </div>
    </InfoCard>
  </DetailShell>
)

// ══════════════════════════════════════════════════════════════════════════════
// 4.1.3 设备管理 · 装机申请（ZJ）
// ══════════════════════════════════════════════════════════════════════════════
const ZjForm = ({
  onBack,
  onSuccess,
}: {
  onBack: () => void
  onSuccess: () => void
}) => {
  const [custom, setCustom] = useState("否")
  return (
    <FormShell
      title="提交装机申请"
      onBack={onBack}
      actions={
        <>
          <MBtn variant="secondary">保存草稿</MBtn>
          <MBtn onClick={onSuccess}>提交</MBtn>
        </>
      }
    >
      <Banner>
        在「新增点位」流程中已同步提交装机申请的，此处不可重复申请；命中未完成装机工单时将提示单号并禁止提交。
      </Banner>
      <MC>
        <MF label="点位（搜索 / 地图选点）" required>
          <div className="flex gap-2 items-center">
            <div className="flex-1">
              <MSelect placeholder="仅可选择已创建且状态正常的点位" value="蜂巢·科技园北楼 1F" />
            </div>
            <ScanBtn />
          </div>
          <MErr>该点位存在未完成的装机工单（ZJ20261028 0042），不可重复申请</MErr>
        </MF>
        <MF label="机柜型号" required>
          <MSelect placeholder="取自设备型号字典" value="SC-48 双温柜" />
        </MF>
        <MF label="需求安装时间" required>
          <MSelect placeholder="不得早于当天" value="2026-11-02" />
        </MF>
      </MC>
      <MC>
        <MF label="是否定制外观">
          <MRadio options={["是", "否"]} value={custom} onChange={setCustom} />
        </MF>
        {custom === "是" && (
          <MF label="定制外观照片" required>
            <UploadTile n={1} max={5} />
          </MF>
        )}
        <MF label="是否需提前报备">
          <MRadio options={["是", "否"]} />
        </MF>
        <MF label="是否有电梯">
          <MRadio options={["是", "否"]} />
        </MF>
        <MF label="是否需户外棚">
          <MRadio options={["是", "否"]} value="否" />
        </MF>
        <MF label="备注（其他要求）">
          <MArea placeholder="最长 200 字符" value="物业要求工作日 9:00 后进场。" />
        </MF>
      </MC>
      <div className="px-4 text-[10px] text-[#94A3B8] leading-relaxed">
        提交后生成装机工单并推送审批待办，审批通过后流转履约后台派单执行。
      </div>
    </FormShell>
  )
}

const ZjList = ({
  onBack,
  onNew,
  onDetail,
}: {
  onBack: () => void
  onNew: () => void
  onDetail: () => void
}) => (
  <ListShell
    title="装机工单列表"
    onBack={onBack}
    onNew={onNew}
    searchPlaceholder="搜索工单号 / 设备SN / 点位"
    filters={["工单状态", "机柜型号", "需求安装时间", "创建时间"]}
  >
    {ZJ_ORDERS.map((o) => (
      <MC key={o.no}>
        <button onClick={onDetail} className="w-full text-left">
          <div className="pt-4 flex items-start justify-between">
            <div>
              <div className="text-[15px] font-bold text-[#0F172A]">{o.no}</div>
              <div className="text-xs text-[#64748B] mt-1 flex items-center gap-1">
                <Ic d={P.pin} size={12} />
                {o.loc}
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              {o.approval !== "—" && (
                <Tag label={o.approval} color={statusColor(o.approval)} />
              )}
              {o.ff !== "—" && <Tag label={o.ff} color={statusColor(o.ff)} />}
            </div>
          </div>
          <div className="mt-2.5 space-y-0.5">
            <KVMini k="机柜型号" v={o.model} />
            <KVMini
              k="设备 SN"
              v={o.sn}
              vClass={o.sn === "待装机绑定" ? "text-[#94A3B8]" : ""}
            />
            <KVMini k="需求安装时间" v={o.date} />
            <KVMini k="当前处理人" v={o.handler} />
          </div>
        </button>
        <div className="flex items-center justify-between mt-2.5 pt-2.5 border-t border-[#F1F5F9]">
          <span className="text-[10px] text-[#94A3B8]">
            创建 {o.created} · 处理 {o.handlerTime}
          </span>
          <div className="flex gap-3">
            {o.ff === "待处理" && <ActionBtn danger>取消工单</ActionBtn>}
            {o.ff === "处理中" && <ActionBtn>催办</ActionBtn>}
            <ActionBtn onClick={onDetail}>详情</ActionBtn>
          </div>
        </div>
      </MC>
    ))}
  </ListShell>
)

const ZjDetail = ({ onBack }: { onBack: () => void }) => (
  <DetailShell
    title="装机工单详情"
    onBack={onBack}
    actions={
      <>
        <MBtn variant="ghost" icon="x">
          取消工单
        </MBtn>
        <MBtn variant="secondary" icon="send">
          催办（仅一次）
        </MBtn>
      </>
    }
  >
    <InfoCard title="工单信息">
      <div className="pt-1">
        <MKV label="工单号" value="ZJ20261026 0039" />
        <MKV label="工单类型" value="装机" />
        <MKV
          label="工单状态"
          value={
            <span className="inline-flex gap-1.5">
              <Tag label="审批已通过" color="green" />
              <Tag label="处理中" color="blue" />
            </span>
          }
        />
        <MKV label="创建人" value="王建国" />
        <MKV label="创建时间" value="2026-10-26 09:44" />
      </div>
    </InfoCard>
    <InfoCard title="点位与设备">
      <div className="pt-1">
        <MKV label="点位名称" value="绿洲·滨江天街 3F（杭州·滨江区）" />
        <MKV label="设备 SN" value="SN2026A0038" />
        <MKV label="机柜型号" value="SC-24 常温柜" />
        <MKV label="需求安装时间" value="2026-10-30" />
      </div>
    </InfoCard>
    <InfoCard title="申请内容">
      <div className="pt-1">
        <MKV label="备注" value="物业要求工作日 9:00 后进场，需提前 1 天报备。" />
      </div>
    </InfoCard>
    <InfoCard title="履约流转（时间线倒序）">
      <div className="pt-3">
        <Timeline
          steps={[
            {
              node: "现场安装",
              handler: "张卫东 / 李国强",
              time: "2026-10-29 17:31",
              desc: "已进场安装，机柜定位与通电完成，货道自检通过",
              photos: 2,
            },
            {
              node: "预约上门",
              handler: "张卫东",
              time: "2026-10-26 15:40",
              desc: "已与点位物业预约 10-30 上午进场",
            },
            {
              node: "派单",
              handler: "周明（履约调度）",
              time: "2026-10-26 10:12",
              desc: "工单派发至杭州履约一组",
            },
            {
              node: "审批通过",
              handler: "陈主管",
              time: "2026-10-26 09:58",
              desc: "同意装机",
            },
          ]}
        />
      </div>
    </InfoCard>
  </DetailShell>
)

// ══════════════════════════════════════════════════════════════════════════════
// 4.1.3 设备管理 · 撤机申请（CC）
// ══════════════════════════════════════════════════════════════════════════════
const CcForm = ({
  onBack,
  onSuccess,
}: {
  onBack: () => void
  onSuccess: () => void
}) => (
  <FormShell
    title="提交撤机申请"
    onBack={onBack}
    actions={
      <>
        <MBtn variant="secondary">保存草稿</MBtn>
        <MBtn onClick={onSuccess}>提交</MBtn>
      </>
    }
  >
    <Banner tone="warn">
      提交后系统自动为该设备生成下架任务并挂靠本工单，同时进行补货单下单拦截；撤机前必须完成柜内商品下架入库。
    </Banner>
    <MC>
      <MF label="设备SN（下拉 / 扫码）" required>
        <div className="flex gap-2 items-center">
          <div className="flex-1">
            <MSelect placeholder="仅可选择运营中且无未完成撤机工单的设备" value="SN2026A0022" />
          </div>
          <ScanBtn />
        </div>
      </MF>
      <MF label="所属点位（自动带出）" required>
        <MInput value="恒通·创意产业园 2F" disabled />
      </MF>
      <MF label="装机时间（自动带出）" required>
        <MInput value="2026-08-14" disabled />
      </MF>
      <MF label="撤机原因" required>
        <MSelect value="经营调整" />
        <MHint>点位终止合作 / 设备更换 / 经营调整 / 设备损坏 / 其他；选「其他」时说明必填</MHint>
      </MF>
      <MF label="需求撤机时间" required>
        <MSelect placeholder="不得早于当天" value="2026-11-05" />
      </MF>
      <MF label="备注">
        <MArea placeholder="≤200 字" />
      </MF>
    </MC>
    <div className="px-4 text-[10px] text-[#94A3B8] leading-relaxed">
      无需审批，提交后直接流转履约后台，状态=待处理。
    </div>
  </FormShell>
)

const CcList = ({
  onBack,
  onNew,
  onDetail,
}: {
  onBack: () => void
  onNew: () => void
  onDetail: () => void
}) => (
  <ListShell
    title="撤机工单列表"
    onBack={onBack}
    onNew={onNew}
    searchPlaceholder="搜索工单号 / 设备SN / 点位"
    filters={["工单状态", "撤机原因", "需求撤机时间", "创建时间"]}
  >
    {CC_ORDERS.map((o) => (
      <MC key={o.no}>
        <button onClick={onDetail} className="w-full text-left">
          <div className="pt-4 flex items-start justify-between">
            <div>
              <div className="text-[15px] font-bold text-[#0F172A]">{o.no}</div>
              <div className="text-xs text-[#64748B] mt-1 flex items-center gap-1">
                <Ic d={P.pin} size={12} />
                {o.loc}
              </div>
            </div>
            <Tag label={o.ff} color={statusColor(o.ff)} />
          </div>
          <div className="mt-2.5 space-y-0.5">
            <KVMini k="设备 SN" v={o.sn} />
            <KVMini k="装机时间" v={o.install} />
            <KVMini k="预计撤机时间" v={o.date} />
            <KVMini
              k="下架任务状态"
              v={
                <span className="inline-flex items-center gap-1.5">
                  {o.taskNo}
                  <Tag label={o.taskStatus} color={statusColor(o.taskStatus)} />
                </span>
              }
            />
            <KVMini k="当前处理人" v={o.handler} />
          </div>
        </button>
        <div className="flex items-center justify-between mt-2.5 pt-2.5 border-t border-[#F1F5F9]">
          <span className="text-[10px] text-[#94A3B8]">
            创建 {o.created} · 处理 {o.handlerTime}
          </span>
          <div className="flex gap-3">
            {o.ff === "待处理" && (
              <>
                <ActionBtn onClick={onDetail}>编辑</ActionBtn>
                <ActionBtn danger>取消工单</ActionBtn>
              </>
            )}
            {o.ff === "处理中" && <ActionBtn>催办</ActionBtn>}
            <ActionBtn onClick={onDetail}>查看下架任务</ActionBtn>
          </div>
        </div>
      </MC>
    ))}
  </ListShell>
)

const CcDetail = ({ onBack }: { onBack: () => void }) => (
  <DetailShell
    title="撤机工单详情"
    onBack={onBack}
    actions={
      <>
        <MBtn variant="ghost" icon="x">
          取消工单
        </MBtn>
        <MBtn variant="secondary" icon="list">
          查看下架任务
        </MBtn>
      </>
    }
  >
    <Banner tone="warn">
      撤机完成前必须完成柜内商品下架入库；工单取消后将同步取消关联下架任务。
    </Banner>
    <InfoCard title="工单信息">
      <div className="pt-1">
        <MKV label="工单号" value="CC20261027 0011" />
        <MKV label="工单类型" value="撤机" />
        <MKV label="工单状态" value={<Tag label="待处理" color="yellow" />} />
        <MKV label="创建人" value="王建国" />
        <MKV label="创建时间" value="2026-10-27 13:48" />
        <MKV label="审批" value={<span className="text-[#94A3B8]">无需审批，创建后直接待处理</span>} />
      </div>
    </InfoCard>
    <InfoCard title="设备与点位">
      <div className="pt-1">
        <MKV label="设备 SN" value="SN2026A0022" />
        <MKV label="所属点位" value="恒通·创意产业园 2F（杭州·余杭区）" />
        <MKV label="机柜型号" value="SC-48 双温柜" />
        <MKV label="装机时间" value="2026-08-14" />
      </div>
    </InfoCard>
    <InfoCard title="申请内容">
      <div className="pt-1">
        <MKV label="撤机原因" value="经营调整" />
        <MKV label="需求撤机时间" value="2026-11-05" />
        <MKV label="备注" value="—" />
      </div>
    </InfoCard>
    <InfoCard
      title="关联任务"
      action={<ActionBtn>查看下架任务</ActionBtn>}
    >
      <div className="pt-1">
        <MKV label="下架任务单号" value="XJ20261027 0064" highlight />
        <MKV label="商品明细" value="24 个 SKU · 118 件" />
        <MKV label="执行状态" value={<Tag label="执行中" color="blue" />} />
        <MHint>下架完成为撤机前置条件；撤机期间该设备补货下单已拦截。</MHint>
      </div>
    </InfoCard>
    <InfoCard title="履约流转（时间线倒序）">
      <div className="pt-3">
        <Timeline
          steps={[
            {
              node: "下架执行中",
              handler: "仓储 · 王芳",
              time: "2026-10-28 09:20",
              desc: "已拣出 76 件，剩余 42 件待拣",
            },
            {
              node: "派单",
              handler: "周明（履约调度）",
              time: "2026-10-27 14:02",
              desc: "下架任务派发至余杭仓，撤机工单同步流转",
            },
          ]}
        />
      </div>
    </InfoCard>
  </DetailShell>
)

// ══════════════════════════════════════════════════════════════════════════════
// 4.1.3 设备管理 · 移机申请（YJ）
// ══════════════════════════════════════════════════════════════════════════════
const YjForm = ({
  onBack,
  onSuccess,
}: {
  onBack: () => void
  onSuccess: () => void
}) => (
  <FormShell
    title="提交移机申请"
    onBack={onBack}
    actions={
      <>
        <MBtn variant="secondary">保存草稿</MBtn>
        <MBtn onClick={onSuccess}>提交</MBtn>
      </>
    }
  >
    <Banner>
      提交后自动生成全盘单挂靠移机工单，移机完成后系统自动更新点位地址；无需审批，直接流转履约后台。
    </Banner>
    <MC>
      <MF label="设备SN（下拉 / 扫码）" required>
        <div className="flex gap-2 items-center">
          <div className="flex-1">
            <MSelect placeholder="仅可选择运营中且无未完成移机工单的设备" value="SN2026A0038" />
          </div>
          <ScanBtn />
        </div>
      </MF>
      <MF label="原名称" required>
        <MInput value="绿洲·滨江天街 3F" />
      </MF>
      <MF label="原地址（自动带出）" required>
        <MInput value="杭州市滨江区江南大道 228 号" disabled />
      </MF>
      <MF label="原位置装机时间（自动带出）" required>
        <MInput value="2026-08-14" disabled />
      </MF>
    </MC>
    <MC>
      <MF label="目标名称" required>
        <MInput placeholder="请输入目标点位名称" value="星光·文创园区 1F" />
      </MF>
      <MF label="目标地址" required>
        <MSelect placeholder="下拉 + 输入搜索，不可与原地址相同" value="杭州市滨江区建业路 501 号" />
      </MF>
      <MF label="需求移机时间" required>
        <MSelect placeholder="不得早于当天" value="2026-11-08" />
      </MF>
      <MF label="备注">
        <MArea placeholder="≤200 字" />
      </MF>
    </MC>
  </FormShell>
)

const YjList = ({
  onBack,
  onNew,
  onDetail,
}: {
  onBack: () => void
  onNew: () => void
  onDetail: () => void
}) => (
  <ListShell
    title="移机工单列表"
    onBack={onBack}
    onNew={onNew}
    searchPlaceholder="搜索工单号 / 设备SN / 原名称 / 目标名称"
    filters={["工单状态", "需求移机时间", "创建时间"]}
  >
    {YJ_ORDERS.map((o) => (
      <MC key={o.no}>
        <button onClick={onDetail} className="w-full text-left">
          <div className="pt-4 flex items-start justify-between">
            <div>
              <div className="text-[15px] font-bold text-[#0F172A]">{o.no}</div>
              <div className="text-xs text-[#64748B] mt-1 flex items-center gap-1.5">
                {o.fromName}
                <Ic d={P.arrow} size={11} />
                <span className="text-[#2563EB] font-medium">{o.toName}</span>
              </div>
            </div>
            <Tag label={o.ff} color={statusColor(o.ff)} />
          </div>
          <div className="mt-2.5 space-y-0.5">
            <KVMini k="设备 SN" v={o.sn} />
            <KVMini k="原点位装机时间" v={o.install} />
            <KVMini k="需求移机时间" v={o.date} />
            <KVMini
              k="全盘任务状态"
              v={
                <span className="inline-flex items-center gap-1.5">
                  {o.taskNo}
                  <Tag label={o.taskStatus} color={statusColor(o.taskStatus)} />
                </span>
              }
            />
            <KVMini k="当前处理人" v={o.handler} />
          </div>
        </button>
        <div className="flex items-center justify-between mt-2.5 pt-2.5 border-t border-[#F1F5F9]">
          <span className="text-[10px] text-[#94A3B8]">
            创建 {o.created} · 处理 {o.handlerTime}
          </span>
          <div className="flex gap-3">
            {o.ff === "待处理" && <ActionBtn danger>取消工单</ActionBtn>}
            {o.ff === "处理中" && <ActionBtn>催办</ActionBtn>}
            <ActionBtn onClick={onDetail}>详情</ActionBtn>
          </div>
        </div>
      </MC>
    ))}
  </ListShell>
)

const YjDetail = ({ onBack }: { onBack: () => void }) => (
  <DetailShell
    title="移机工单详情"
    onBack={onBack}
    actions={
      <>
        <MBtn variant="ghost" icon="x" disabled>
          取消工单（仅待处理）
        </MBtn>
        <MBtn variant="secondary" icon="list">
          查看全盘任务
        </MBtn>
        <MBtn variant="primary" icon="send">
          催办
        </MBtn>
      </>
    }
  >
    <Banner>
      移机完成前须完成原点位全盘作业；移机完成后系统自动更新点位地址。
    </Banner>
    <InfoCard title="工单信息">
      <div className="pt-1">
        <MKV label="工单号" value="YJ20261027 0005" />
        <MKV label="工单类型" value="移机" />
        <MKV label="工单状态" value={<Tag label="处理中" color="blue" />} />
        <MKV label="创建人" value="王建国" />
        <MKV label="创建时间" value="2026-10-27 11:05" />
        <MKV label="审批" value={<span className="text-[#94A3B8]">无需审批</span>} />
      </div>
    </InfoCard>
    <InfoCard title="设备与点位">
      <div className="pt-1">
        <MKV label="设备 SN" value="SN2026A0026" />
        <MKV label="原名称" value="云谷·未来社区中心" />
        <MKV label="原地址" value="宁波市鄞州区首南街道 288 号" />
        <MKV label="目标名称" value="云谷·邻里中心 2F" />
        <MKV label="目标地址" value="宁波市鄞州区泰安西路 66 号" />
        <MKV label="原装机时间" value="2026-07-08" />
      </div>
    </InfoCard>
    <InfoCard title="申请内容">
      <div className="pt-1">
        <MKV label="需求移机时间" value="2026-11-03" />
        <MKV label="备注" value="—" />
      </div>
    </InfoCard>
    <InfoCard
      title="关联任务（全盘单）"
      action={<ActionBtn>查看全盘任务</ActionBtn>}
    >
      <div className="pt-1">
        <MKV label="全盘任务单号" value="QP20261027 0108" highlight />
        <MKV label="商品明细" value="32 个 SKU · 146 件" />
        <MKV label="执行状态" value={<Tag label="执行中" color="blue" />} />
        <MHint>原点位全盘完成为移机前置条件。</MHint>
      </div>
    </InfoCard>
    <InfoCard title="履约流转（时间线倒序）">
      <div className="pt-3">
        <Timeline
          steps={[
            {
              node: "原点位撤出",
              handler: "张卫东",
              time: "2026-10-30 08:40",
              desc: "设备断电下架完成，已装车运往目标点位",
              photos: 2,
            },
            {
              node: "全盘作业（执行中）",
              handler: "仓储 · 王芳",
              time: "2026-10-29 14:20",
              desc: "已盘点 98 件，差异 0",
            },
            {
              node: "派单",
              handler: "周明（履约调度）",
              time: "2026-10-27 13:10",
              desc: "工单派发至宁波履约组，全盘单同步生成",
            },
          ]}
        />
        <div className="flex items-center gap-2 px-1 pb-2">
          <Tag label="待节点：目标点位安装" color="gray" />
          <span className="text-[10px] text-[#94A3B8]">完成后工单自动完结并更新点位地址</span>
        </div>
      </div>
    </InfoCard>
  </DetailShell>
)

// ══════════════════════════════════════════════════════════════════════════════
// 4.1.3 设备管理 · 维修申请（WX）
// ══════════════════════════════════════════════════════════════════════════════
const WxForm = ({
  onBack,
  onSuccess,
}: {
  onBack: () => void
  onSuccess: () => void
}) => (
  <FormShell
    title="提交维修申请"
    onBack={onBack}
    actions={
      <>
        <MBtn variant="secondary">保存草稿</MBtn>
        <MBtn onClick={onSuccess}>提交</MBtn>
      </>
    }
  >
    <Banner>
      服务承诺：2 小时内响应，24 小时上门处理；无需审批，直接流转履约后台。
    </Banner>
    <MC>
      <MF label="设备SN（下拉 / 扫码）" required>
        <div className="flex gap-2 items-center">
          <div className="flex-1">
            <MSelect placeholder="仅可选择运营中设备" value="SN2026A0041" />
          </div>
          <ScanBtn />
        </div>
      </MF>
      <MF label="点位（自动带出）" required>
        <MInput value="云谷·未来社区中心（宁波·鄞州区）" disabled />
      </MF>
      <MF label="故障类型" required>
        <MSelect placeholder="无法开门 / 制冷异常 / 支付异常 / 屏幕故障 / 货道卡货 / 其他" value="无法开门" />
      </MF>
      <MF label="故障描述" required>
        <MArea
          placeholder="≤200 字"
          value="扫码支付成功后柜门未弹开，客户无法取货，已现场安抚并引导退款。"
        />
      </MF>
    </MC>
    <MC>
      <MF label="现场照片" required>
        <UploadTile n={2} max={3} />
      </MF>
      <MF label="备注">
        <MArea placeholder="≤200 字" />
      </MF>
    </MC>
  </FormShell>
)

const WxList = ({
  onBack,
  onNew,
  onDetail,
}: {
  onBack: () => void
  onNew: () => void
  onDetail: () => void
}) => (
  <ListShell
    title="维修工单列表"
    onBack={onBack}
    onNew={onNew}
    searchPlaceholder="搜索工单号 / 设备SN / 点位"
    filters={["工单状态", "故障类型", "创建时间"]}
  >
    {WX_ORDERS.map((o) => (
      <MC key={o.no}>
        <button onClick={onDetail} className="w-full text-left">
          <div className="pt-4 flex items-start justify-between">
            <div>
              <div className="text-[15px] font-bold text-[#0F172A]">{o.no}</div>
              <div className="text-xs text-[#64748B] mt-1 flex items-center gap-1">
                <Ic d={P.settings} size={12} />
                {o.loc}
              </div>
            </div>
            <Tag label={o.ff} color={statusColor(o.ff)} />
          </div>
          <div className="mt-2.5 space-y-0.5">
            <KVMini k="设备 SN" v={o.sn} />
            <KVMini k="故障类型" v={o.fault} />
            <KVMini k="当前处理人" v={o.handler} />
          </div>
        </button>
        <div className="flex items-center justify-between mt-2.5 pt-2.5 border-t border-[#F1F5F9]">
          <span className="text-[10px] text-[#94A3B8]">
            创建 {o.created} · 处理 {o.handlerTime}
          </span>
          <div className="flex gap-3">
            {o.ff === "待处理" && (
              <>
                <ActionBtn onClick={onDetail}>编辑</ActionBtn>
                <ActionBtn danger>取消工单</ActionBtn>
              </>
            )}
            {o.ff === "处理中" && <ActionBtn>催办</ActionBtn>}
            <ActionBtn onClick={onDetail}>详情</ActionBtn>
          </div>
        </div>
      </MC>
    ))}
  </ListShell>
)

const WxDetail = ({ onBack }: { onBack: () => void }) => (
  <DetailShell
    title="维修工单详情"
    onBack={onBack}
    actions={
      <>
        <MBtn variant="secondary" icon="upload">
          补充故障信息
        </MBtn>
        <MBtn variant="ghost" icon="x" disabled>
          取消工单
        </MBtn>
        <MBtn variant="primary" icon="send">
          催办
        </MBtn>
      </>
    }
  >
    <Banner>
      服务承诺：2 小时内响应，24 小时上门处理；处理中允许补充照片与描述。
    </Banner>
    <InfoCard title="工单信息">
      <div className="pt-1">
        <MKV label="工单号" value="WX20261029 0021" />
        <MKV label="工单类型" value="维修" />
        <MKV label="工单状态" value={<Tag label="处理中" color="blue" />} />
        <MKV label="创建人" value="王建国" />
        <MKV label="创建时间" value="2026-10-29 08:15" />
        <MKV label="审批" value={<span className="text-[#94A3B8]">无需审批</span>} />
      </div>
    </InfoCard>
    <InfoCard title="设备与点位">
      <div className="pt-1">
        <MKV label="设备 SN" value="SN2026A0041" />
        <MKV label="点位" value="云谷·未来社区中心（宁波·鄞州区）" />
        <MKV label="机柜型号" value="SC-48 双温柜" />
        <MKV label="装机时间" value="2026-09-02" />
      </div>
    </InfoCard>
    <InfoCard
      title="故障信息"
      action={<ActionBtn>补充故障信息</ActionBtn>}
    >
      <div className="pt-1">
        <MKV label="故障类型" value="无法开门" />
        <MKV
          label="故障描述"
          value="扫码支付成功后柜门未弹开，客户无法取货，已现场安抚并引导退款。"
        />
        <div className="py-3">
          <div className="text-xs text-[#94A3B8] mb-1">现场照片（点击可预览放大）</div>
          <Photos count={2} />
          <div className="text-xs text-[#94A3B8] mt-2">补充照片</div>
          <div className="text-[11px] text-[#CBD5E1]">暂无补充，处理中可补拍上传</div>
        </div>
      </div>
    </InfoCard>
    <InfoCard title="维修结果">
      <div className="pt-1">
        <MKV label="维修方式" value={<span className="text-[#94A3B8]">维修完成后回写（方式待定）</span>} />
        <MKV label="更换配件" value="—" />
        <MKV label="维修完成时间" value="—" />
        <MKV label="维修人" value="李国强（已接单）" />
      </div>
    </InfoCard>
    <InfoCard title="履约流转（时间线倒序）">
      <div className="pt-3">
        <Timeline
          steps={[
            {
              node: "到场",
              handler: "李国强（维修工程师）",
              time: "2026-10-29 09:02",
              desc: "已到达现场，初步判断为电磁锁故障",
              photos: 1,
            },
            {
              node: "响应",
              handler: "客服中心",
              time: "2026-10-29 08:50",
              desc: "已响应并派单至维修工程师",
            },
          ]}
        />
        <div className="flex items-center gap-2 px-1 pb-2">
          <Tag label="待节点：修复" color="gray" />
        </div>
      </div>
    </InfoCard>
  </DetailShell>
)

// ══════════════════════════════════════════════════════════════════════════════
// 页面导航数据源（按 section 首次出现顺序分组渲染）
// ══════════════════════════════════════════════════════════════════════════════
const CRM2_NAV: { section: string; label: string; page: Crm2Page }[] = [
  { section: "工作台", label: "工作台", page: "workbench" },
  { section: "集采客户", label: "提交申请", page: "jc-form" },
  { section: "集采客户", label: "客户列表", page: "jc-list" },
  { section: "集采客户", label: "客户详情", page: "jc-detail" },
  { section: "渠道商", label: "提交申请", page: "qd-form" },
  { section: "渠道商", label: "渠道商列表", page: "qd-list" },
  { section: "渠道商", label: "渠道商详情", page: "qd-detail" },
  { section: "设备管理", label: "设备管理入口", page: "device-hub" },
  { section: "设备管理", label: "装机 · 提交", page: "zj-form" },
  { section: "设备管理", label: "装机 · 列表", page: "zj-list" },
  { section: "设备管理", label: "装机 · 详情", page: "zj-detail" },
  { section: "设备管理", label: "撤机 · 提交", page: "cc-form" },
  { section: "设备管理", label: "撤机 · 列表", page: "cc-list" },
  { section: "设备管理", label: "撤机 · 详情", page: "cc-detail" },
  { section: "设备管理", label: "移机 · 提交", page: "yj-form" },
  { section: "设备管理", label: "移机 · 列表", page: "yj-list" },
  { section: "设备管理", label: "移机 · 详情", page: "yj-detail" },
  { section: "设备管理", label: "维修 · 提交", page: "wx-form" },
  { section: "设备管理", label: "维修 · 列表", page: "wx-list" },
  { section: "设备管理", label: "维修 · 详情", page: "wx-detail" },
]

export const CrmAppV2 = () => {
  const [page, setPage] = useState<Crm2Page>("workbench")

  const renderPage = () => {
    switch (page) {
      case "workbench":
        return <Workbench onNav={setPage} />
      case "device-hub":
        return <DeviceHub onBack={() => setPage("workbench")} onNav={setPage} />
      case "jc-form":
        return <JcForm onBack={() => setPage("jc-list")} onSuccess={() => setPage("jc-list")} />
      case "jc-list":
        return (
          <JcList
            onBack={() => setPage("workbench")}
            onNew={() => setPage("jc-form")}
            onDetail={() => setPage("jc-detail")}
          />
        )
      case "jc-detail":
        return <JcDetail onBack={() => setPage("jc-list")} />
      case "qd-form":
        return <QdForm onBack={() => setPage("qd-list")} onSuccess={() => setPage("qd-list")} />
      case "qd-list":
        return (
          <QdList
            onBack={() => setPage("workbench")}
            onNew={() => setPage("qd-form")}
            onDetail={() => setPage("qd-detail")}
          />
        )
      case "qd-detail":
        return <QdDetail onBack={() => setPage("qd-list")} />
      case "zj-form":
        return <ZjForm onBack={() => setPage("zj-list")} onSuccess={() => setPage("zj-list")} />
      case "zj-list":
        return (
          <ZjList
            onBack={() => setPage("device-hub")}
            onNew={() => setPage("zj-form")}
            onDetail={() => setPage("zj-detail")}
          />
        )
      case "zj-detail":
        return <ZjDetail onBack={() => setPage("zj-list")} />
      case "cc-form":
        return <CcForm onBack={() => setPage("cc-list")} onSuccess={() => setPage("cc-list")} />
      case "cc-list":
        return (
          <CcList
            onBack={() => setPage("device-hub")}
            onNew={() => setPage("cc-form")}
            onDetail={() => setPage("cc-detail")}
          />
        )
      case "cc-detail":
        return <CcDetail onBack={() => setPage("cc-list")} />
      case "yj-form":
        return <YjForm onBack={() => setPage("yj-list")} onSuccess={() => setPage("yj-list")} />
      case "yj-list":
        return (
          <YjList
            onBack={() => setPage("device-hub")}
            onNew={() => setPage("yj-form")}
            onDetail={() => setPage("yj-detail")}
          />
        )
      case "yj-detail":
        return <YjDetail onBack={() => setPage("yj-list")} />
      case "wx-form":
        return <WxForm onBack={() => setPage("wx-list")} onSuccess={() => setPage("wx-list")} />
      case "wx-list":
        return (
          <WxList
            onBack={() => setPage("device-hub")}
            onNew={() => setPage("wx-form")}
            onDetail={() => setPage("wx-detail")}
          />
        )
      case "wx-detail":
        return <WxDetail onBack={() => setPage("wx-list")} />
      default:
        return null
    }
  }

  const sections = [...new Set(CRM2_NAV.map((p) => p.section))]

  return (
    <div className="flex gap-6 items-start">
      {/* Phone frame */}
      <div className="flex-shrink-0">
        {/* Outer metal frame */}
        <div className="w-[393px] rounded-[52px] bg-[#1C1C1E] p-[10px] shadow-2xl">
          {/* Dynamic island + status area */}
          <div className="bg-black h-10 rounded-t-[44px] flex items-center justify-center">
            <div className="w-24 h-7 bg-black rounded-full border border-[#2A2A2E]" />
          </div>
          {/* Screen */}
          <div className="bg-white relative overflow-hidden" style={{ height: "720px" }}>
            <StatusBar />
            {/* Page content */}
            <div className="absolute inset-0 top-[28px] flex flex-col overflow-hidden">
              {renderPage()}
            </div>
          </div>
          {/* Home indicator */}
          <div className="bg-black h-8 rounded-b-[44px] flex items-center justify-center">
            <div className="w-28 h-1 bg-white/20 rounded-full" />
          </div>
        </div>
        {/* Frame buttons */}
        <div className="relative">
          <div className="absolute -left-3 top-24 w-1 h-8 bg-[#2A2A2E] rounded-l-full" />
          <div className="absolute -left-3 top-36 w-1 h-12 bg-[#2A2A2E] rounded-l-full" />
          <div className="absolute -left-3 top-52 w-1 h-12 bg-[#2A2A2E] rounded-l-full" />
          <div className="absolute -right-3 top-32 w-1 h-16 bg-[#2A2A2E] rounded-r-full" />
        </div>
      </div>

      {/* Page navigator */}
      <div className="w-44 flex-shrink-0 pt-2 sticky top-0">
        <div className="text-[10px] font-semibold text-[#94A3B8] uppercase tracking-wider mb-3">
          页面导航
        </div>
        <div className="space-y-4">
          {sections.map((sec) => (
            <div key={sec}>
              <div className="text-[10px] font-semibold text-[#CBD5E1] uppercase tracking-wider mb-1.5">
                {sec}
              </div>
              <div className="space-y-0.5">
                {CRM2_NAV.filter((p) => p.section === sec).map((p) => (
                  <button
                    key={p.page}
                    onClick={() => setPage(p.page)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all
                      ${
                        page === p.page
                          ? "bg-[#FFF7ED] text-[#EA580C] font-semibold"
                          : "text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#334155]"
                      }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="mt-5 p-3 bg-[#F8FAFC] rounded-xl">
          <div className="text-[10px] text-[#94A3B8] leading-relaxed">
            点击右侧导航可直接预览任意页面，或在手机内正常操作流转。审批中心功能与一期一致，未重复绘制。
          </div>
        </div>
      </div>
    </div>
  )
}
