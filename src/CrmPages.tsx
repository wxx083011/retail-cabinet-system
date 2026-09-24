import { useState, ReactNode } from "react"

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
  user: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8",
  users:
    "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M9 11a4 4 0 100-8 4 4 0 000 8 M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75",
  bar: "M18 20V10M12 20V4M6 20v-6",
  clip: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2 M9 5a2 2 0 002 2h2a2 2 0 002-2 M9 5a2 2 0 012-2h2a2 2 0 012 2",
  bell: "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 01-3.46 0",
  phone:
    "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 01.4 2.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z",
  mail: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6",
  alert:
    "M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z M12 9v4 M12 17h.01",
  info: "M12 22a10 10 0 100-20 10 10 0 000 20z M12 8v4 M12 16h.01",
  eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 12a3 3 0 100-6 3 3 0 000 6",
  edit: "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7 M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",
  send: "M22 2L11 13 M22 2l-7 20-4-9-9-4 20-7z",
  filter: "M22 3H2l8 9.46V19l4 2v-8.54L22 3",
  refresh:
    "M23 4v6h-6 M1 20v-6h6 M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15",
  cal: "M19 4H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z M16 2v4M8 2v4M3 10h18",
  arrow: "M5 12h14M12 5l7 7-7 7",
  checkC: "M22 11.08V12a10 10 0 11-5.93-9.14 M22 4L12 14.01l-3-3",
  xC: "M12 22a10 10 0 100-20 10 10 0 000 20z M15 9l-6 6M9 9l6 6",
  list: "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01",
  settings:
    "M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z",
  pkg: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
  building: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10",
  starFill:
    "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  tag: "M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z M7 7h.01",
  trending: "M23 6l-9.5 9.5-5-5L1 18 M17 6h6v6",
  logOut: "M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4 M16 17l5-5-5-5 M21 12H9",
  upload: "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4 M17 8l-5-5-5 5 M12 3v12",
  switch: "M20 7H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z",
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
// MOBILE PRIMITIVES
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

const Tag = ({
  label,
  color,
  dot,
}: {
  label: string
  color: BC
  dot?: boolean
}) => (
  <span
    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold ${BADGE[color]}`}
  >
    {dot && <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />}
    {label}
  </span>
)

const statusColor = (s: string): BC => {
  const map: Record<string, BC> = {
    待审批: "blue",
    已上线: "green",
    已暂停: "yellow",
    审批驳回: "red",
    下线: "gray",
    审批中: "blue",
    已通过: "green",
    已驳回: "red",
    已撤回: "gray",
    已签约: "green",
    跟进中: "blue",
    暂停跟进: "yellow",
    战略: "purple",
    金牌: "yellow",
    银牌: "blue",
    普通: "gray",
    高: "red",
    普通优先: "gray",
  }
  return map[s] ?? "gray"
}

// Form field
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
      <span className="text-sm text-[#94A3B8] ml-1 flex-shrink-0">
        {suffix}
      </span>
    )}
  </div>
)

const MSelect = ({
  placeholder,
  options,
  value,
}: {
  placeholder?: string
  options: string[]
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

// Section header
const MSec = ({ title, action }: { title: string; action?: ReactNode }) => (
  <div className="flex items-center justify-between px-4 pt-5 pb-2">
    <span className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wide">
      {title}
    </span>
    {action}
  </div>
)

// Card
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

// Primary button
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

// Toggle switch
const Toggle = ({ on, onChange }: { on: boolean; onChange: () => void }) => (
  <button
    onClick={onChange}
    className={`w-12 h-7 rounded-full transition-all duration-200 relative flex-shrink-0 ${
      on ? "bg-[#2563EB]" : "bg-[#E2E8F0]"
    }`}
  >
    <span
      className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm transition-all duration-200 ${
        on ? "left-6" : "left-1"
      }`}
    />
  </button>
)

// Empty state
const MEmpty = ({
  icon,
  title,
  desc,
  action,
}: {
  icon: string
  title: string
  desc?: string
  action?: ReactNode
}) => (
  <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
    <div className="w-16 h-16 rounded-3xl bg-[#F8FAFC] flex items-center justify-center mb-4">
      <Ic d={P[icon]} size={28} className="text-[#CBD5E1]" />
    </div>
    <div className="text-base font-semibold text-[#334155] mb-1">{title}</div>
    {desc && (
      <p className="text-sm text-[#94A3B8] leading-relaxed mb-5">{desc}</p>
    )}
    {action}
  </div>
)

// Info grid row
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

// ══════════════════════════════════════════════════════════════════════════════
// DATA
// ══════════════════════════════════════════════════════════════════════════════
const LOCATIONS = [
  {
    id: "L001",
    name: "蜂巢·科技园北楼1F",
    customer: "蜂巢智能科技",
    addr: "南山区科技园北区",
    type: "写字楼",
    devices: 2,
    status: "已上线",
    created: "2025-08-01",
    sales: "李明",
  },
  {
    id: "L002",
    name: "天利中央广场B3-12",
    customer: "格林购物科技",
    addr: "南山区天利中央广场",
    type: "商业综合体",
    devices: 1,
    status: "待审批",
    created: "2025-09-08",
    sales: "王芳",
  },
  {
    id: "L003",
    name: "皇庭广场1F-A5",
    customer: "新零售运营",
    addr: "福田区华强北皇庭",
    type: "商业综合体",
    devices: 2,
    status: "已上线",
    created: "2025-07-15",
    sales: "李明",
  },
  {
    id: "L004",
    name: "万象城B2-C08",
    customer: "都市生活科技",
    addr: "罗湖区万象城",
    type: "购物中心",
    devices: 3,
    status: "已暂停",
    created: "2025-06-20",
    sales: "张磊",
  },
  {
    id: "L005",
    name: "光明新城购物中心3F",
    customer: "壹品生活",
    addr: "光明区光明新城",
    type: "购物中心",
    devices: 1,
    status: "审批驳回",
    created: "2025-09-10",
    sales: "李明",
  },
]

const CUSTOMERS = [
  {
    id: "C001",
    name: "蜂巢智能科技（深圳）",
    short: "蜂巢智能",
    type: "企业",
    level: "战略",
    contact: "张总",
    title: "采购总监",
    phone: "138-8888-0001",
    email: "zhang@fengchao.com",
    locations: 12,
    signed: "2023-01-15",
    area: "深圳",
    status: "已签约",
  },
  {
    id: "C002",
    name: "格林购物科技有限公司",
    short: "格林购物",
    type: "企业",
    level: "金牌",
    contact: "陈主任",
    title: "运营主管",
    phone: "139-7777-0002",
    email: "chen@green.com",
    locations: 8,
    signed: "2023-06-01",
    area: "深圳/广州",
    status: "已签约",
  },
  {
    id: "C003",
    name: "都市生活科技集团",
    short: "都市生活",
    type: "集团",
    level: "金牌",
    contact: "李经理",
    title: "战略合作",
    phone: "136-6666-0003",
    email: "li@dushi.com",
    locations: 5,
    signed: "2024-03-10",
    area: "深圳",
    status: "跟进中",
  },
  {
    id: "C004",
    name: "壹品生活连锁运营",
    short: "壹品生活",
    type: "连锁",
    level: "银牌",
    contact: "王总",
    title: "总经理",
    phone: "135-5555-0004",
    email: "wang@yipin.com",
    locations: 3,
    signed: "2024-08-20",
    area: "深圳/东莞",
    status: "已签约",
  },
  {
    id: "C005",
    name: "新零售运营管理公司",
    short: "新零售运营",
    type: "企业",
    level: "普通",
    contact: "刘经理",
    title: "运营负责人",
    phone: "133-4444-0005",
    email: "liu@xlsyw.com",
    locations: 2,
    signed: "—",
    area: "广州",
    status: "跟进中",
  },
]

const APPROVALS = [
  {
    id: "A001",
    type: "新增点位",
    title: "申请新增点位：天利中央广场B3-12",
    applicant: "李明",
    time: "09-10 09:30",
    status: "审批中",
    priority: "高",
    customer: "格林购物科技",
    location: "天利中央广场",
    devices: 1,
    note: "客户要求10月前完成装机",
    reviewer: "张主管",
  },
  {
    id: "A002",
    type: "安装申请",
    title: "安装申请：蜂巢科技园北楼追加设备",
    applicant: "王芳",
    time: "09-08 14:20",
    status: "已通过",
    priority: "普通优先",
    customer: "蜂巢智能科技",
    location: "科技园北楼1F",
    devices: 1,
    note: "追加第3台，位置已确认",
    reviewer: "刘总监",
    approvedTime: "09-08 17:05",
    approvalNote: "客户资质良好，位置合理，批准通过",
  },
  {
    id: "A003",
    type: "新增点位",
    title: "申请新增点位：光明新城购物中心3F",
    applicant: "李明",
    time: "09-05 11:00",
    status: "已驳回",
    priority: "高",
    customer: "壹品生活",
    location: "光明新城购物中心3F",
    devices: 1,
    note: "节假日流量大，适合选址",
    reviewer: "张主管",
    rejectedTime: "09-06 09:30",
    rejectReason:
      "该楼层已有竞品覆盖，且客流数据不达标（日均800人次，要求≥2000人次）。建议调整至1F或B1层重新评估。",
  },
  {
    id: "A004",
    type: "合同变更",
    title: "合同变更申请：都市生活科技续约调价",
    applicant: "李明",
    time: "09-03 10:00",
    status: "已通过",
    priority: "普通优先",
    customer: "都市生活科技",
    location: "万象城等5处",
    devices: 3,
    note: "续约3年，单价下调5%",
    reviewer: "刘总监",
    approvedTime: "09-03 15:30",
    approvalNote: "续约条款合理，价格在授权范围内，批准",
  },
  {
    id: "A005",
    type: "安装申请",
    title: "安装申请：皇庭广场1F-A5新机部署",
    applicant: "张磊",
    time: "09-01 09:00",
    status: "审批中",
    priority: "普通优先",
    customer: "新零售运营",
    location: "皇庭广场1F-A5",
    devices: 2,
    note: "",
    reviewer: "张主管",
  },
]

const ORDER_STATS = {
  week: { total: "¥311,400", orders: 48, customers: 3, restocks: 124 },
  month: { total: "¥1,248,600", orders: 186, customers: 8, restocks: 498 },
  quarter: { total: "¥3,847,200", orders: 542, customers: 18, restocks: 1420 },
}
const CHART_DATA = [
  { label: "9/4", v: 45200, day: "周三" },
  { label: "9/5", v: 38500, day: "周四" },
  { label: "9/6", v: 52800, day: "周五" },
  { label: "9/7", v: 21000, day: "周六" },
  { label: "9/8", v: 18900, day: "周日" },
  { label: "9/9", v: 61300, day: "周一" },
  { label: "9/10", v: 49100, day: "周二" },
]
const SKU_RANK = [
  { name: "可口可乐 330ml", qty: "12,450件", pct: 100, amt: "¥27,390" },
  { name: "农夫山泉 550ml", qty: "9,820件", pct: 79, amt: "¥7,856" },
  { name: "乐事薯片 75g", qty: "7,340件", pct: 59, amt: "¥24,822" },
  { name: "元气森林气泡水", qty: "6,280件", pct: 50, amt: "¥15,070" },
  { name: "自热米饭红烧牛肉", qty: "4,510件", pct: 36, amt: "¥42,610" },
]

// ══════════════════════════════════════════════════════════════════════════════
// PHONE SHELL
// ══════════════════════════════════════════════════════════════════════════════
const StatusBar = ({ dark = false }: { dark?: boolean }) => (
  <div
    className={`flex justify-between items-center px-6 py-2 text-xs font-semibold flex-shrink-0 ${
      dark ? "text-white" : "text-[#0F172A]"
    }`}
  >
    <span>9:41</span>
    <div className="flex items-center gap-1.5">
      <svg width="14" height="10" viewBox="0 0 14 10" fill="currentColor">
        <rect x="0" y="4" width="2.5" height="6" rx="0.5" opacity="0.4" />
        <rect x="3.5" y="2.5" width="2.5" height="7.5" rx="0.5" opacity="0.6" />
        <rect x="7" y="0.5" width="2.5" height="9.5" rx="0.5" />
        <rect x="10.5" y="0" width="2.5" height="10" rx="0.5" />
      </svg>
      <svg width="15" height="10" viewBox="0 0 15 10" fill="currentColor">
        <path
          d="M7.5 2.5a5.5 5.5 0 015.2 3.7l1.7-1.3A8 8 0 007.5 0a8 8 0 00-6.9 4.9l1.7 1.3A5.5 5.5 0 017.5 2.5z"
          opacity="0.4"
        />
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
)

const NavBar = ({
  title,
  onBack,
  rightEl,
  dark = false,
}: {
  title: string
  onBack?: () => void
  rightEl?: ReactNode
  dark?: boolean
}) => (
  <div
    className={`flex items-center h-11 px-4 flex-shrink-0 ${
      dark ? "text-white" : "text-[#0F172A] bg-white border-b border-[#F1F5F9]"
    }`}
  >
    {onBack && (
      <button
        onClick={onBack}
        className="w-9 h-9 -ml-1 flex items-center justify-center"
      >
        <Ic d={P.chevL} size={20} />
      </button>
    )}
    <span
      className={`flex-1 text-[17px] font-semibold text-center ${
        onBack ? "mr-9" : ""
      } ${!onBack && !rightEl ? "text-left" : ""}`}
    >
      {title}
    </span>
    {rightEl}
  </div>
)

const TabBar = ({
  active,
  onChange,
}: {
  active: string
  onChange: (t: string) => void
}) => {
  const tabs = [
    { key: "location", label: "点位", icon: P.pin },
    { key: "customer", label: "客户", icon: P.users },
    { key: "approval", label: "审批", icon: P.clip },
    { key: "stats", label: "统计", icon: P.bar },
    { key: "mine", label: "我的", icon: P.user },
  ]
  return (
    <div className="flex border-t border-[#F1F5F9] bg-white h-[49px] flex-shrink-0">
      {tabs.map((t) => (
        <button
          key={t.key}
          onClick={() => onChange(t.key)}
          className={`flex-1 flex flex-col items-center justify-center gap-0.5 transition-colors ${
            active === t.key ? "text-[#2563EB]" : "text-[#94A3B8]"
          }`}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={active === t.key ? "2.25" : "1.75"}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d={t.icon} />
          </svg>
          <span
            className={`text-[10px] font-medium ${
              active === t.key ? "text-[#2563EB]" : "text-[#94A3B8]"
            }`}
          >
            {t.label}
          </span>
        </button>
      ))}
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// SCREEN 1 – LOGIN
// ══════════════════════════════════════════════════════════════════════════════
const LoginScreen = ({ onLogin }: { onLogin: () => void }) => (
  <div className="h-full flex flex-col">
    {/* Hero */}
    <div className="bg-[#2563EB] px-6 pt-10 pb-12 flex-shrink-0">
      <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="white"
          stroke="none"
        >
          <rect x="2" y="3" width="20" height="14" rx="3" />
          <path
            d="M8 21h8M12 17v4"
            stroke="white"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>
      <div className="text-sm text-blue-200">零售柜综合运营平台 · 销售端</div>
    </div>

    {/* Form */}
    <div className="flex-1 bg-[#F0F2F5]">
      <MC className="mt-5">
        <MF label="手机号" required>
          <MInput placeholder="请输入手机号" type="tel" />
        </MF>
        <MF label="密码" required>
          <MInput placeholder="请输入密码" type="password" />
        </MF>
      </MC>

      <div className="px-4 mb-3">
        <button
          onClick={onLogin}
          className="w-full h-12 bg-[#2563EB] text-white rounded-2xl text-[15px] font-semibold active:bg-[#1D4ED8] transition-colors"
        >
          登录
        </button>
      </div>

    </div>

    <div className="text-center pb-5 text-xs text-[#CBD5E1] flex-shrink-0">
      v1.0.0 · 零售柜综合运营平台
    </div>
  </div>
)

// ══════════════════════════════════════════════════════════════════════════════
// SCREEN 2 – LOCATION LIST (redesigned)
// ══════════════════════════════════════════════════════════════════════════════
const LOC_DATA = [
  {
    id: "PW001",
    code: "PW-20230801",
    name: "蜂巢·科技园北楼1F-A区",
    customer: "蜂巢智能科技（深圳）有限公司",
    region: "广东省·深圳市·南山区",
    addr: "科技园北路12号蜂巢大厦1楼A区",
    level: "S",
    scene: "写字楼",
    status: "启用",
    deviceStatus: "在线",
    offlineAt: "",
    offlineDays: "",
    auditStatus: "审核通过",
    created: "2023-08-01",
  },
  {
    id: "PW002",
    code: "PW-20230920",
    name: "天利中央广场B3-12",
    customer: "格林购物科技有限公司",
    region: "广东省·深圳市·南山区",
    addr: "天利中央广场B区3层12号",
    level: "A",
    scene: "运动",
    status: "启用",
    deviceStatus: "在线",
    offlineAt: "",
    offlineDays: "",
    auditStatus: "审核通过",
    created: "2023-09-20",
  },
  {
    id: "PW003",
    code: "PW-20240115",
    name: "皇庭广场1F-A5展位",
    customer: "都市生活科技集团",
    region: "广东省·深圳市·福田区",
    addr: "华强北街道皇庭广场1楼A5号",
    level: "S+",
    scene: "写字楼",
    status: "启用",
    deviceStatus: "离线",
    offlineAt: "09-20 11:05",
    offlineDays: "已离线 2 天",
    auditStatus: "待审核",
    created: "2024-01-15",
  },
  {
    id: "PW004",
    code: "PW-20240310",
    name: "万象城B2-C08休闲区",
    customer: "壹品生活连锁运营管理有限公司",
    region: "广东省·深圳市·罗湖区",
    addr: "蔡屋围一路万象城B2层C08号",
    level: "B",
    scene: "医院",
    status: "禁用",
    deviceStatus: "离线",
    offlineAt: "09-12 18:40",
    offlineDays: "已离线 10 天",
    auditStatus: "审核驳回",
    created: "2024-03-10",
  },
  {
    id: "PW005",
    code: "PW-20240620",
    name: "光明新城购物中心3F茶水间",
    customer: "新零售运营管理公司",
    region: "广东省·深圳市·光明区",
    addr: "光明大街光明新城购物中心3楼",
    level: "C",
    scene: "工厂",
    status: "启用",
    deviceStatus: "在线",
    offlineAt: "",
    offlineDays: "",
    auditStatus: "审核通过",
    created: "2024-06-20",
  },
  {
    id: "PW006",
    code: "PW-20250301",
    name: "南山智慧园区D栋2F",
    customer: "蜂巢智能科技（深圳）有限公司",
    region: "广东省·深圳市·南山区",
    addr: "科苑路南山智慧园区D栋2楼",
    level: "A",
    scene: "学校",
    status: "启用",
    deviceStatus: "未绑定",
    offlineAt: "",
    offlineDays: "",
    auditStatus: "待审核",
    created: "2025-03-01",
  },
]

const locStatusTag = (s: string) =>
  s === "启用" ? (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#F0FDF4] text-[#16A34A]">
      <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
      {s}
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#F3F4F6] text-[#6B7280]">
      <span className="w-1.5 h-1.5 rounded-full bg-[#6B7280]" />
      {s}
    </span>
  )

// 设备状态枚举：在线 / 离线 / 未绑定（新增枚举只需扩展此配置）
const DEVICE_STATUS_META: Record<
  string,
  { bg: string; text: string; dot: string; hollow?: boolean }
> = {
  在线: { bg: "bg-[#ECFDF5]", text: "text-[#059669]", dot: "bg-[#059669]" },
  离线: { bg: "bg-[#FEF2F2]", text: "text-[#DC2626]", dot: "bg-[#DC2626]" },
  未绑定: { bg: "bg-[#F1F5F9]", text: "text-[#94A3B8]", dot: "border-[#94A3B8]", hollow: true },
}

const deviceStatusTag = (s: string) => {
  const m = DEVICE_STATUS_META[s] ?? DEVICE_STATUS_META["未绑定"]!
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${m.bg} ${m.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${m.hollow ? "bg-transparent border" : m.dot}`} />
      {s}
    </span>
  )
}

const LEVEL_BADGE: Record<string, string> = {
  "S+": "bg-[#FFF1F2] text-[#E11D48]",
  S: "bg-[#FFF7ED] text-[#C2410C]",
  A: "bg-[#EFF6FF] text-[#2563EB]",
  B: "bg-[#F5F3FF] text-[#7C3AED]",
  C: "bg-[#F5F7FA] text-[#64748B]",
  D: "bg-[#F5F7FA] text-[#94A3B8]",
  N: "bg-[#F1F5F9] text-[#475569]",
}

const LocationList = ({
  onDetail,
  onNew,
  tab,
  onTabChange,
}: {
  onDetail: () => void
  onNew: () => void
  tab: string
  onTabChange: (t: string) => void
}) => {
  const [statusFilter, setStatusFilter] = useState("全部")
  const [deviceFilter, setDeviceFilter] = useState("全部")
  const [expanded, setExpanded] = useState(false)
  const STATUS_OPTS = ["全部", "启用", "禁用"]
  const DEVICE_OPTS = ["全部", "在线", "离线", "未绑定"]

  const filtered = LOC_DATA.filter(
    (l) =>
      (statusFilter === "全部" || l.status === statusFilter) &&
      (deviceFilter === "全部" || l.deviceStatus === deviceFilter),
  )

  return (
    <div className="h-full flex flex-col">
      <div className="bg-white flex-shrink-0 shadow-[0_1px_0_0_#F1F5F9]">
        <NavBar title="点位管理" rightEl={
          <button onClick={onNew} className="w-9 h-9 flex items-center justify-center text-[#2563EB]">
            <Ic d={P.plus} size={22} />
          </button>
        } />

        {/* Search row */}
        <div className="px-4 pb-3 flex gap-2">
          <div className="flex-1 flex items-center bg-[#F5F7FA] rounded-[10px] px-3 h-10 gap-2">
            <Ic
              d={P.search}
              size={15}
              className="text-[#94A3B8] flex-shrink-0"
            />
            <input
              placeholder="点位名称 / 编码"
              className="flex-1 text-[14px] bg-transparent outline-none placeholder-[#CBD5E1] text-[#0F172A]"
            />
          </div>
          <button
            onClick={() => setExpanded((v) => !v)}
            className={`w-10 h-10 rounded-[10px] flex items-center justify-center flex-shrink-0 transition-colors
              ${
                expanded
                  ? "bg-[#EFF6FF] text-[#2563EB]"
                  : "bg-[#F5F7FA] text-[#64748B]"
              }`}
          >
            <Ic d={P.filter} size={16} />
          </button>
        </div>

        {/* Status quick filter */}
        <div
          className="flex gap-2 px-4 pb-3 overflow-x-auto"
          style={{ scrollbarWidth: "none" }}
        >
          {STATUS_OPTS.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`flex-shrink-0 h-7 px-3 rounded-full text-xs font-medium transition-all
                ${
                  statusFilter === s
                    ? "bg-[#2563EB] text-white"
                    : "bg-[#F5F7FA] text-[#64748B]"
                }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Expanded filter panel */}
        {expanded && (
          <div className="px-4 pb-4 border-t border-[#F1F5F9] pt-3 space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-xs text-[#94A3B8] w-16 flex-shrink-0 pt-1.5">
                关联客户
              </span>
              <div className="flex-1 h-8 bg-[#F5F7FA] rounded-[8px] flex items-center justify-between px-3">
                <span className="text-xs text-[#CBD5E1]">请选择客户</span>
                <Ic d={P.chevD} size={12} className="text-[#CBD5E1]" />
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-xs text-[#94A3B8] w-16 flex-shrink-0 pt-1.5">
                地区
              </span>
              <div className="flex-1 flex gap-1.5">
                {["省", "市", "区"].map((p) => (
                  <div
                    key={p}
                    className="flex-1 h-8 bg-[#F5F7FA] rounded-[8px] flex items-center justify-between px-2"
                  >
                    <span className="text-xs text-[#CBD5E1]">选{p}</span>
                    <Ic d={P.chevD} size={11} className="text-[#CBD5E1]" />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-xs text-[#94A3B8] w-16 flex-shrink-0 pt-1.5">
                点位等级
              </span>
              <div className="flex gap-1.5 flex-wrap">
                {["S+", "S", "A", "B", "C", "D", "N"].map((l) => (
                  <button
                    key={l}
                    className={`h-7 px-3 rounded-full text-xs font-semibold ${LEVEL_BADGE[l]}`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-xs text-[#94A3B8] w-16 flex-shrink-0 pt-1.5">
                场景
              </span>
              <div className="flex gap-1.5 flex-wrap">
                {["运动", "写字楼", "工厂", "学校", "医院", "其他"].map((s) => (
                  <button
                    key={s}
                    className="h-7 px-3 rounded-full text-xs bg-[#F5F7FA] text-[#64748B]"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-xs text-[#94A3B8] w-16 flex-shrink-0 pt-1.5">
                设备状态
              </span>
              <div className="flex gap-1.5 flex-wrap">
                {DEVICE_OPTS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setDeviceFilter(s)}
                    className={`h-7 px-3 rounded-full text-xs font-medium transition-all
                      ${
                        deviceFilter === s
                          ? "bg-[#2563EB] text-white"
                          : "bg-[#F5F7FA] text-[#64748B]"
                      }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-xs text-[#94A3B8] w-16 flex-shrink-0 pt-1.5">
                审核状态
              </span>
              <div className="flex gap-1.5 flex-wrap">
                {["全部", "待审核", "审核通过", "审核驳回"].map((s) => (
                  <button key={s} className="h-7 px-3 rounded-full text-xs bg-[#F5F7FA] text-[#64748B]">{s}</button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-[#94A3B8] w-16 flex-shrink-0">
                创建时间
              </span>
              <div className="flex-1 flex items-center gap-2">
                <div className="flex-1 h-8 bg-[#F5F7FA] rounded-[8px] flex items-center px-3 text-xs text-[#CBD5E1]">开始日期</div>
                <span className="text-[#CBD5E1] text-xs">—</span>
                <div className="flex-1 h-8 bg-[#F5F7FA] rounded-[8px] flex items-center px-3 text-xs text-[#CBD5E1]">结束日期</div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto bg-[#F5F7FA] pt-3 pb-24">
        <div className="px-4 mb-2 text-xs text-[#94A3B8]">
          共 {filtered.length} 条记录
        </div>
        {filtered.map((loc) => (
          <div
            key={loc.id}
            onClick={onDetail}
            className="bg-white mx-4 mb-3 rounded-[12px] px-4 py-4 shadow-[0_1px_4px_0_rgba(15,23,42,0.06)] active:bg-[#F8FAFC] cursor-pointer"
          >
            {/* Row 1 */}
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <div className="flex-1 min-w-0">
                <div className="text-[15px] font-semibold text-[#0F172A] leading-tight line-clamp-1 mb-0.5">
                  {loc.name}
                </div>
                <div className="text-xs text-[#94A3B8]">{loc.code}</div>
              </div>
              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <div className="flex items-center gap-1.5">
                  {deviceStatusTag(loc.deviceStatus)}
                  {locStatusTag(loc.status)}
                </div>
                {loc.deviceStatus === "离线" && (
                  <span className="text-[10px] text-[#94A3B8]">
                    离线于 {loc.offlineAt} · {loc.offlineDays}
                  </span>
                )}
                {loc.deviceStatus === "未绑定" && (
                  <span className="text-[10px] text-[#94A3B8]">尚未绑定设备</span>
                )}
              </div>
            </div>
            {/* Row 2: customer */}
            <div className="flex items-center gap-1.5 text-xs text-[#64748B] mb-2">
              <Ic d={P.users} size={11} className="flex-shrink-0" />
              <span className="line-clamp-1">{loc.customer}</span>
            </div>
            {/* Row 3: region + addr */}
            <div className="flex items-start gap-1.5 text-xs text-[#94A3B8] mb-2.5">
              <Ic d={P.pin} size={11} className="flex-shrink-0 mt-0.5" />
              <span className="line-clamp-1">
                {loc.region} · {loc.addr}
              </span>
            </div>
            {/* Row 4: meta */}
            <div className="flex items-center justify-between text-xs text-[#94A3B8]">
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${LEVEL_BADGE[loc.level] ?? "bg-[#F5F7FA] text-[#94A3B8]"}`}
                >
                  {loc.level}级
                </span>
                <span className="bg-[#F5F7FA] px-2 py-0.5 rounded-full text-[11px]">
                  {loc.scene}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium
                  ${loc.auditStatus === "审核通过" ? "bg-[#F0FDF4] text-[#16A34A]"
                    : loc.auditStatus === "审核驳回" ? "bg-[#FEF2F2] text-[#DC2626]"
                    : "bg-[#FFFBEB] text-[#D97706]"}`}>
                  {loc.auditStatus}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Ic d={P.cal} size={11} />
                {loc.created}
                <Ic d={P.chevR} size={13} className="text-[#CBD5E1] ml-1" />
              </div>
            </div>
            {loc.auditStatus === "审核驳回" && (
              <div className="mt-2.5 pt-2.5 border-t border-[#FEE2E2] flex items-center justify-between">
                <span className="text-xs text-[#DC2626]">审核已驳回，请修改后重新发起</span>
                <button
                  onClick={e => { e.stopPropagation(); onNew(); }}
                  className="flex items-center gap-1 px-3 h-7 bg-[#DC2626] text-white text-xs font-medium rounded-full active:bg-[#B91C1C] transition-colors">
                  <Ic d={P.arrow} size={11} />重新发起
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={onNew}
        className="fixed bottom-[88px] right-6 w-14 h-14 bg-[#2563EB] rounded-full shadow-[0_4px_16px_0_rgba(37,99,235,0.4)] flex items-center justify-center z-10 active:scale-95 transition-transform"
      >
        <Ic d={P.plus} size={22} className="text-white" />
      </button>

      <TabBar active={tab} onChange={onTabChange} />
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// SCREEN 3 – LOCATION DETAIL (redesigned)
// ══════════════════════════════════════════════════════════════════════════════

// 4 audit-state configs shown in sequence for demo
type AuditState = "待审核" | "审核中" | "审核通过" | "审核驳回"
const AUDIT_CONFIGS: Record<AuditState, {
  bg: string
  border: string
  textColor: string
  iconPath: string
  iconColor: string
  desc: string
}> = {
  待审核: {
    bg: "bg-[#FFF7ED]",
    border: "border-[#FBBF24]",
    textColor: "text-[#D97706]",
    iconPath: "M12 22a10 10 0 100-20 10 10 0 000 20z M12 6v6l4 2",
    iconColor: "text-[#D97706]",
    desc: "等待审批人处理",
  },
  审核中: {
    bg: "bg-[#EFF6FF]",
    border: "border-[#93C5FD]",
    textColor: "text-[#2563EB]",
    iconPath:
      "M23 4v6h-6 M1 20v-6h6 M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15",
    iconColor: "text-[#2563EB]",
    desc: "已进入审批流程，正在处理",
  },
  审核通过: {
    bg: "bg-[#F0FDF4]",
    border: "border-[#86EFAC]",
    textColor: "text-[#16A34A]",
    iconPath: "M22 11.08V12a10 10 0 11-5.93-9.14 M22 4L12 14.01l-3-3",
    iconColor: "text-[#16A34A]",
    desc: "审批已通过，可进入后续业务流程",
  },
  审核驳回: {
    bg: "bg-[#FEF2F2]",
    border: "border-[#FCA5A5]",
    textColor: "text-[#DC2626]",
    iconPath:
      "M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z M12 9v4 M12 17h.01",
    iconColor: "text-[#DC2626]",
    desc: "审批未通过，需要修改后重新提交",
  },
}

const AuditCard = ({ state }: { state: AuditState }) => {
  const cfg = AUDIT_CONFIGS[state]
  const isDone = state === "审核通过" || state === "审核驳回"
  const STEPS = [
    { label: "提交申请", time: "2025-09-10 09:30", done: true },
    {
      label: "进入审核",
      time: state === "待审核" ? "待处理" : "2025-09-10 10:15",
      done: state !== "待审核",
    },
    {
      label: state === "审核驳回" ? "审核驳回" : "审核通过",
      time: isDone ? "2025-09-11 14:20" : "待完成",
      done: isDone,
    },
  ]
  return (
    <div
      className={`mx-4 mb-3 rounded-[12px] border ${cfg.bg} ${cfg.border} overflow-hidden`}
    >
      {/* Status header */}
      <div className="flex items-start gap-3 p-4">
        <div
          className={`w-9 h-9 rounded-full ${cfg.bg} flex items-center justify-center flex-shrink-0 border ${cfg.border}`}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cfg.iconColor}
          >
            <path d={cfg.iconPath} />
          </svg>
        </div>
        <div className="flex-1">
          <div className={`text-sm font-bold mb-0.5 ${cfg.textColor}`}>
            {state}
          </div>
          <div className="text-xs text-[#64748B]">{cfg.desc}</div>
        </div>
        <span
          className={`text-[11px] font-semibold px-2 py-1 rounded-full border ${cfg.bg} ${cfg.border} ${cfg.textColor}`}
        >
          {state}
        </span>
      </div>

      {/* Rejection reason */}
      {state === "审核驳回" && (
        <div className="mx-4 mb-3 bg-white rounded-[8px] border border-[#FCA5A5] px-3 py-2.5">
          <div className="text-xs font-semibold text-[#DC2626] mb-1">
            驳回意见
          </div>
          <p className="text-xs text-[#DC2626] leading-relaxed">
            点位现场照片不清晰，无法确认安装空间尺寸。请重新拍摄含比例参照物的照片后重新提交。
          </p>
        </div>
      )}

      {/* Meta grid */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 px-4 pb-3 text-xs text-[#64748B]">
        <span>发起时间：2025-09-10 09:30</span>
        <span>审核人：张主管</span>
        {isDone && <span>完成时间：2025-09-11 14:20</span>}
        {state === "审核中" && <span>当前处理人：张主管</span>}
        {isDone && (
          <span>
            审批意见：
            {state === "审核通过"
              ? "信息完整，位置合规，批准"
              : "照片不符合要求"}
          </span>
        )}
      </div>

      {/* Timeline */}
      <div className="border-t border-[#E5E7EB] mx-4 mb-4 pt-3 flex items-start gap-0">
        {STEPS.map((step, i) => (
          <div key={i} className="flex-1 flex flex-col items-center relative">
            {/* connector line */}
            {i < STEPS.length - 1 && (
              <div
                className={`absolute top-2.5 left-1/2 w-full h-px ${
                  step.done && STEPS[i + 1].done
                    ? "bg-[#16A34A]"
                    : "bg-[#E2E8F0]"
                }`}
              />
            )}
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center z-10 text-[10px] font-bold flex-shrink-0
              ${
                step.done
                  ? i === STEPS.length - 1 && state === "审核驳回"
                    ? "bg-[#DC2626] text-white"
                    : "bg-[#16A34A] text-white"
                  : "bg-[#E2E8F0] text-[#94A3B8]"
              }`}
            >
              {step.done
                ? i === STEPS.length - 1 && state === "审核驳回"
                  ? "✕"
                  : "✓"
                : i + 1}
            </div>
            <span className="text-[10px] text-[#64748B] mt-1 text-center leading-tight">
              {step.label}
            </span>
            <span className="text-[9px] text-[#94A3B8] mt-0.5 text-center">
              {step.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// 点位基本信息详情（点位详情“基本信息”tab 与审批详情“具体详情”共用）
const LocationBasicDetail = ({ loc }: { loc: (typeof LOC_DATA)[number] }) => (
  <>
    <MC className="mt-3">
      <MKV label="归属客户" value={loc.customer} highlight />
      <MKV label="点位名称" value={loc.name} />
      <MKV label="点位地区" value={loc.region} />
      <MKV label="详细地址" value={loc.addr} />
      <MKV label="经纬度" value="113.944°E, 22.538°N" />
      <MKV label="覆盖人数" value="约 3,200 人" />
      <MKV label="一级场景" value={loc.scene} />
      <MKV label="二级场景" value="商务茶水间" />
      <MKV label="设备安装位置" value="茶水间" />
      <MKV label="是否有竞对智能售货机" value="无" />
      <MKV label="是否有竞对传统售货机" value="有" />
      <MKV label="百米内是否有便利店" value="无" />
      <MKV label="点位信息备注" value="入口左侧，靠近电梯口，客流高峰为早9点和午11-13点" />
    </MC>
    <MSec title="场地照片" />
    <MC noPad>
      <div className="px-4 pt-3 pb-3">
        <div className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {["#CBD5E1", "#94A3B8", "#64748B", "#475569", "#334155"].map((bg, i) => (
            <div key={i} style={{ background: bg }}
              className="w-24 h-24 rounded-[8px] flex-shrink-0 flex items-center justify-center cursor-pointer">
              <Ic d={P.eye} size={18} className="text-white opacity-60" />
            </div>
          ))}
        </div>
      </div>
    </MC>
  </>
)

// 补货记录（补货列表 tab 与补货单详情共用）
const RESTOCK_RECORDS = [
  { no: "R0-2025-0301-001", batch: "第1批", creator: "张运营", fulfiller: "李补货", time: "2025-03-01 10:00", count: "48", doneAt: "2025-03-01 14:30", status: "已完成",
    goods: [
      { name: "农夫山泉 550ml", spec: "550ml", layer: "第1层", count: "18" },
      { name: "东方树叶 500ml", spec: "500ml", layer: "第2层", count: "12" },
      { name: "乐事薯片 75g", spec: "75g", layer: "第3层", count: "18" },
    ] },
  { no: "R0-2025-0210-003", batch: "第1批", creator: "王主管", fulfiller: "陈补货", time: "2025-02-10 09:30", count: "36", doneAt: "2025-02-10 13:00", status: "已完成",
    goods: [
      { name: "可口可乐 330ml", spec: "330ml", layer: "第1层", count: "14" },
      { name: "元气森林气泡水", spec: "480ml", layer: "第2层", count: "10" },
      { name: "旺仔牛奶 245ml", spec: "245ml", layer: "第4层", count: "12" },
    ] },
  { no: "R0-2025-0118-002", batch: "第2批", creator: "张运营", fulfiller: "—", time: "2025-01-18 08:00", count: "24", doneAt: "—", status: "待履约",
    goods: [
      { name: "自热米饭红烧牛肉", spec: "标准装", layer: "第5层", count: "10" },
      { name: "方便面 合味道", spec: "77g", layer: "第6层", count: "14" },
    ] },
]

const LocationDetail = ({
  onBack,
  onApproval,
  onResubmit,
  embedded = false,
}: {
  onBack?: () => void
  onApproval?: () => void
  onResubmit?: () => void
  /** 嵌入模式：无导航栏、自然高度，用于审批详情“具体详情”内展示完整点位详情 */
  embedded?: boolean
}) => {
  const loc = LOC_DATA[0]
  const [auditIdx, setAuditIdx] = useState(2)
  const AUDIT_STATES: AuditState[] = ["待审核", "审核中", "审核通过", "审核驳回"]
  const auditState = AUDIT_STATES[auditIdx]

  type TabKey = "基本信息" | "运营数据" | "运营配置" | "设备信息" | "联系人信息" | "关联工单" | "商务合同" | "补货列表" | "审核状态"
  const TABS: TabKey[] = ["基本信息", "运营数据", "运营配置", "设备信息", "联系人信息", "关联工单", "补货列表",  "商务合同","审核状态"]
  const [activeTab, setActiveTab] = useState<TabKey>("基本信息")
  // 补货单详情（覆盖层）
  const [restockNo, setRestockNo] = useState<string | null>(null)

  const SKU_RANK = [
    { rank: 1, name: "可口可乐 330ml", sales: "1,240件", amt: "¥2,728" },
    { rank: 2, name: "农夫山泉 550ml", sales: "982件", amt: "¥785" },
    { rank: 3, name: "乐事薯片 75g", sales: "734件", amt: "¥2,482" },
    { rank: 4, name: "元气森林气泡水", sales: "628件", amt: "¥1,507" },
    { rank: 5, name: "自热米饭红烧牛肉", sales: "451件", amt: "¥4,261" },
    { rank: 6, name: "旺仔牛奶 245ml", sales: "398件", amt: "¥596" },
    { rank: 7, name: "方便面 合味道", sales: "312件", amt: "¥936" },
    { rank: 8, name: "脉动维生素饮料", sales: "290件", amt: "¥638" },
    { rank: 9, name: "奥利奥饼干 97g", sales: "245件", amt: "¥783" },
    { rank: 10, name: "卫龙辣条 大面筋", sales: "198件", amt: "¥495" },
  ]

  return (
    <div className={embedded
      ? "relative bg-[#F5F7FA] rounded-[12px] overflow-hidden border border-[#E2E8F0]"
      : "relative h-full flex flex-col bg-[#F5F7FA]"}>
      {/* NavBar */}
      {!embedded && (
        <div className="bg-white flex-shrink-0 shadow-[0_1px_0_0_#F1F5F9]">
          <NavBar title="点位详情" onBack={onBack} />
        </div>
      )}

      {/* Horizontal tab bar */}
      <div className="bg-white flex-shrink-0 border-b border-[#F1F5F9]">
        <div className="flex overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-shrink-0 px-4 py-3 text-[13px] font-medium border-b-2 transition-colors whitespace-nowrap
                ${activeTab === tab
                  ? "border-[#2563EB] text-[#2563EB]"
                  : "border-transparent text-[#64748B] hover:text-[#334155]"}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className={embedded ? "pb-4" : "flex-1 overflow-y-auto pb-6"}>

        {/* ── 基本信息 ── */}
        {activeTab === "基本信息" && <LocationBasicDetail loc={loc} />}

      

        {/* ── 联系人信息 ── */}
        {activeTab === "联系人信息" && (
          <MC className="mt-3">
            <MKV label="联系人姓名" value="张主任" />
            <MKV label="联系电话" value={<span className="text-[#2563EB]">138-8888-0001</span>} />
            <MKV label="联系人性别" value="男" />
            <MKV label="联系人微信号" value="zhangzr_fc" />
            <MKV label="联系人邮箱" value="zhang@fengchao.com" />
            <MKV label="联系人身份" value="行政主管" />
          </MC>
        )}

        {/* ── 设备信息（含云信息）── */}
        {activeTab === "设备信息" && (
          <>
            <MC className="mt-3">
              <MKV label="设备资产编码" value={<span className="font-mono">DEV-2025-0042</span>} />
              <MKV label="尺寸" value="1200 × 800 × 2000 mm" />
              <MKV label="功能属性" value="冷藏 / 常温双温区" />
              <MKV label="设备型号" value="智柜 Pro X8" />
              <MKV label="层板配置" value="5 层可调层板" />
              <MKV label="额定电压" value="220 V" />
              <MKV label="额定电流" value="3.5 A" />
              <MKV label="额定功率" value="350 W" />
              <MKV label="额定功耗" value="2.8 kWh/24h" />
              <MKV label="是否有刷脸屏" value="是" />
              <MKV label="是否有摄像头" value="是" />
            </MC>
            <MSec title="设备云信息" />
            <MC>
              <MKV label="在线状态" value={deviceStatusTag(loc.deviceStatus)} />
              <MKV label="实时温度" value={<span className="font-semibold text-[#0F172A]">5.2 ℃</span>} />
              <MKV label="实时功率" value={<span className="font-semibold text-[#0F172A]">148 W</span>} />
            </MC>
            <div className="px-4 mt-2 text-[10px] text-[#CBD5E1] leading-relaxed">
              * 云端每 5 分钟上报刷新 · 最近更新 09-23 10:32
            </div>
          </>
        )}

        {/* ── 运营配置 ── */}
        {activeTab === "运营配置" && (
          <MC className="mt-3">
            <MKV label="补货设置" value={
              <div className="flex gap-1 flex-wrap justify-end">
                {["周一", "周三", "周五"].map(d => (
                  <span key={d} className="text-xs bg-[#EFF6FF] text-[#2563EB] px-2 py-0.5 rounded-full font-medium">{d}</span>
                ))}
              </div>
            } />
          </MC>
        )}

        {/* ── 关联工单 ── */}
        {activeTab === "关联工单" && (
          <>
            <MC className="mt-3">
              <MKV label="是否同步安装申请" value="是" />
              <MKV label="设备型号" value="智柜 Pro X8" />
              <MKV label="设备安装位置" value="大堂东侧靠窗" />
              <MKV label="需求安装时间" value="2025-09-15" />
              <MKV label="是否定制外观" value="是" />
              <MKV label="点位外观照片" value={
                <div className="flex gap-1.5 justify-end">
                  {["正面", "侧面"].map(t => (
                    <div key={t} className="w-14 h-14 rounded-[8px] bg-[#F5F7FA] border border-[#E2E8F0] flex items-center justify-center">
                      <span className="text-[10px] text-[#94A3B8]">{t}</span>
                    </div>
                  ))}
                </div>
              } />
              <MKV label="是否需提前报备" value="是" />
              <MKV label="是否有电梯" value="是" />
              <MKV label="是否需户外棚" value="否" />
              <MKV label="设备资产条码" value="DEV-2025-0042" />
              <MKV label="实际安装时间" value="2025-09-15" />
              <MKV label="安装工程人员" value="王工" />
              <MKV label="工单审核状态" value={<Tag label="审核通过" color="green" />} />
              <MKV label="工单审核人" value="张主管" />
              <MKV label="工单创建时间" value="2025-09-10 09:30" />
              <MKV label="工单审核完成时间" value="2025-09-11 14:20" />
              <MKV label="备注（其他要求）" value="需提前联系物业申请施工证" />
            </MC>
          </>
        )}

        {/* ── 运营数据（含SKU）── */}
        {activeTab === "运营数据" && (
          <>
            <MC noPad className="mt-3">
              <div className="grid grid-cols-2 divide-x divide-y divide-[#F1F5F9]">
                {[
                  { label: "昨日销售额", value: "¥ 2,840", sub: "含税" },
                  { label: "本月销售额", value: "¥ 48,200", sub: "含税" },
                  { label: "昨日订单数", value: "142", sub: "有效订单" },
                  { label: "本月订单数", value: "2,418", sub: "有效订单" },
                ].map(k => (
                  <div key={k.label} className="px-4 py-3.5">
                    <div className="text-xs text-[#94A3B8] mb-1">{k.label}</div>
                    <div className="text-base font-bold text-[#0F172A]">{k.value}</div>
                    <div className="text-[10px] text-[#CBD5E1] mt-0.5">{k.sub}</div>
                  </div>
                ))}
              </div>
              <div className="px-4 pt-1 pb-1 border-t border-[#F1F5F9]">
                <div className="text-[10px] text-[#CBD5E1]">* 不含未支付订单及失败订单</div>
              </div>
            </MC>
            <MSec title="SKU 销量排行 TOP10" />
            <MC noPad>
              {SKU_RANK.map((s, i) => (
                <div key={s.rank} className="flex items-center px-4 py-3 border-b border-[#F1F5F9] last:border-0">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0 mr-3
                    ${i === 0 ? "bg-[#FEF9C3] text-[#CA8A04]"
                      : i === 1 ? "bg-[#F1F5F9] text-[#475569]"
                      : i === 2 ? "bg-[#FEF3C7] text-[#B45309]"
                      : "bg-[#F5F7FA] text-[#94A3B8]"}`}>
                    {s.rank}
                  </div>
                  <span className="flex-1 text-sm text-[#0F172A] truncate">{s.name}</span>
                  <div className="text-right flex-shrink-0 ml-2">
                    <div className="text-xs font-semibold text-[#0F172A]">{s.sales}</div>
                    <div className="text-[11px] text-[#94A3B8]">{s.amt}</div>
                  </div>
                </div>
              ))}
            </MC>
          </>
        )}

        {/* ── 审核状态 ── */}
        {activeTab === "审核状态" && (
          <>
            <div className="px-4 pt-3 pb-1 flex items-center justify-between">
              <span className="text-xs font-semibold text-[#64748B]">当前审核状态</span>
              <button onClick={() => setAuditIdx(i => (i + 1) % 4)}
                className="text-xs text-[#2563EB] bg-[#EFF6FF] px-2 py-1 rounded-full">
                切换状态演示
              </button>
            </div>
            <AuditCard state={auditState} />
          </>
        )}
        {/* ── 商务合同 ── */}
        {activeTab === "商务合同" && (
          <MC className="mt-3">
            <MKV label="合同附件" value={
              <button className="flex items-center gap-1 text-[#2563EB] text-sm font-medium">
                <Ic d={P.clip} size={13} />
                合同协议书_蜂巢北楼.pdf
              </button>
            } />
          </MC>
        )}
        {/* ── 补货列表 ── */}
        {activeTab === "补货列表" && (
          <>
            {RESTOCK_RECORDS.map(r => (
              <div key={r.no} onClick={() => setRestockNo(r.no)}
                className="cursor-pointer active:opacity-70 transition-opacity">
                <MC noPad className="mt-3">
                  <div className="px-4 py-3 flex items-center justify-between border-b border-[#F1F5F9]">
                    <span className="font-mono text-[13px] font-semibold text-[#2563EB]">{r.no}</span>
                    <span className="flex items-center gap-1">
                      <Tag label={r.status} color={r.status === "已完成" ? "green" : "yellow"} />
                      <Ic d={P.chevR} size={14} className="text-[#CBD5E1]" />
                    </span>
                  </div>
                  <div className="px-4 py-3 grid grid-cols-2 gap-x-4 gap-y-2.5">
                    {[
                      { l: "补货批次", v: r.batch },
                      { l: "补货件数", v: `${r.count} 件`, bold: true },
                      { l: "创建人员", v: r.creator },
                      { l: "履约人员", v: r.fulfiller },
                      { l: "补货时间", v: r.time },
                      { l: "履约完成时间", v: r.doneAt },
                    ].map(f => (
                      <div key={f.l}>
                        <div className="text-[11px] text-[#94A3B8] mb-0.5">{f.l}</div>
                        <div className={`text-sm ${f.bold ? "font-bold text-[#0F172A]" : "text-[#0F172A]"}`}>{f.v}</div>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2.5 border-t border-[#F1F5F9] flex justify-end">
                    <span onClick={e => { e.stopPropagation(); setRestockNo(r.no) }}
                      className="inline-flex items-center gap-0.5 text-xs font-semibold text-[#2563EB] bg-[#EFF6FF] border border-[#2563EB]/25 rounded-full px-3.5 py-1.5 active:bg-[#DBEAFE] transition-colors">
                      查看详情<Ic d={P.chevR} size={12} />
                    </span>
                  </div>
                </MC>
              </div>
            ))}
            <p className="px-4 py-3 text-[11px] text-[#94A3B8] text-center">共 {RESTOCK_RECORDS.length} 条补货记录，点击卡片查看详情</p>
          </>
        )}
      </div>

      {/* 重新发起 bottom bar — shown when audit is rejected */}
      {!embedded && activeTab === "审核状态" && auditState === "审核驳回" && (
        <div className="bg-white border-t border-[#F1F5F9] px-4 py-3 flex gap-3 flex-shrink-0">
          <div className="flex-1 flex flex-col justify-center">
            <span className="text-xs text-[#DC2626]">审核已驳回</span>
            <span className="text-[10px] text-[#94A3B8]">请修改信息后重新提交</span>
          </div>
          <button onClick={onResubmit}
            className="flex items-center gap-1.5 px-5 h-10 bg-[#DC2626] text-white text-sm font-semibold rounded-[10px] active:bg-[#B91C1C] transition-colors flex-shrink-0">
            <Ic d={P.arrow} size={14} />重新发起
          </button>
        </div>
      )}

      {/* ── 补货单详情（覆盖层）── */}
      {restockNo && (() => {
        const r = RESTOCK_RECORDS.find(x => x.no === restockNo)
        if (!r) return null
        return (
          <div className="absolute inset-0 z-30 bg-[#F5F7FA] flex flex-col">
            <div className="bg-white flex-shrink-0 shadow-[0_1px_0_0_#F1F5F9]">
              <NavBar title="补货单详情" onBack={() => setRestockNo(null)} />
            </div>
            <div className="flex-1 overflow-y-auto pb-6">
              <MC className="mt-3">
                <MKV label="补货单号" value={<span className="font-mono text-[13px] font-semibold text-[#2563EB]">{r.no}</span>} />
                <MKV label="状态" value={<Tag label={r.status} color={r.status === "已完成" ? "green" : "yellow"} />} />
                <MKV label="补货批次" value={r.batch} />
                <MKV label="补货件数" value={<span className="font-bold">{r.count} 件</span>} />
                <MKV label="创建人员" value={r.creator} />
                <MKV label="履约人员" value={r.fulfiller} />
                <MKV label="补货时间" value={r.time} />
                <MKV label="履约完成时间" value={r.doneAt} />
              </MC>
              <MSec title="商品明细" />
              <MC noPad>
                <div className="grid bg-[#F8FAFC] border-b border-[#F1F5F9] text-[11px] text-[#64748B]"
                  style={{ gridTemplateColumns: "1fr 72px 56px 64px" }}>
                  <div className="px-3 py-2">商品名称</div>
                  <div className="px-2 py-2">规格</div>
                  <div className="px-2 py-2">摆放层</div>
                  <div className="px-3 py-2 text-right">补货数量</div>
                </div>
                {r.goods.map(g => (
                  <div key={g.name} className="grid items-center border-b border-[#F1F5F9] last:border-0 text-sm text-[#0F172A]"
                    style={{ gridTemplateColumns: "1fr 72px 56px 64px" }}>
                    <div className="px-3 py-3">{g.name}</div>
                    <div className="px-2 py-3 text-[13px] text-[#64748B]">{g.spec}</div>
                    <div className="px-2 py-3 text-[13px] text-[#64748B]">{g.layer}</div>
                    <div className="px-3 py-3 text-right font-semibold">{g.count} 件</div>
                  </div>
                ))}
              </MC>
            </div>
          </div>
        )
      })()}
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// SCREEN 4 – NEW LOCATION (redesigned, all sections expanded)
// ══════════════════════════════════════════════════════════════════════════════
const NewLocation = ({
  onBack,
  onSuccess,
}: {
  onBack: () => void
  onSuccess: () => void
}) => {
  const [syncInstall, setSyncInstall] = useState(false)
  const [restock, setRestock] = useState<string[]>(["周一", "周三", "周五"])
  const WEEKDAYS = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]

  const toggleDay = (d: string) =>
    setRestock((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d],
    )

  const RadioGroup = ({
    value,
    options,
    onChange,
  }: {
    value: string
    options: string[]
    onChange: (v: string) => void
  }) => (
    <div className="flex gap-3">
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className={`flex items-center gap-1.5 text-[14px] ${
            value === o ? "text-[#2563EB]" : "text-[#0F172A]"
          }`}
        >
          <div
            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
              value === o ? "border-[#2563EB]" : "border-[#CBD5E1]"
            }`}
          >
            {value === o && (
              <div className="w-2 h-2 rounded-full bg-[#2563EB]" />
            )}
          </div>
          {o}
        </button>
      ))}
    </div>
  )

  const [rivalSmart, setRivalSmart] = useState("无")
  const [rivalTrad, setRivalTrad] = useState("无")
  const [nearStore, setNearStore] = useState("无")
  const [syncVal, setSyncVal] = useState("否")
  // 关联装机工单（选“是”后展开）
  const [customLook, setCustomLook] = useState("否") // 是否定制外观，默认否
  const [needReport, setNeedReport] = useState("") // 是否需提前报备，无默认
  const [hasElevator, setHasElevator] = useState("") // 是否有电梯，无默认
  const [needShed, setNeedShed] = useState("否") // 是否需户外棚，默认否

  return (
    <div className="h-full flex flex-col bg-[#F5F7FA]">
      <div className="bg-white flex-shrink-0 shadow-[0_1px_0_0_#F1F5F9]">
        <NavBar title="新增点位" onBack={onBack} />
      </div>

      <div className="flex-1 overflow-y-auto pb-28">
        {/* ── 1. 基本信息 ── */}
        <div className="px-4 pt-5 pb-1">
          <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wide">
            基本信息
          </span>
        </div>
        <MC>
          <MF label="归属客户" required>
            <div className="flex items-center justify-between">
              <input
                placeholder="搜索并选择客户"
                className="flex-1 text-[15px] placeholder-[#CBD5E1] text-[#0F172A] outline-none bg-transparent"
              />
              <Ic d={P.search} size={14} className="text-[#CBD5E1]" />
            </div>
          </MF>
          <MF label="点位名称" required>
            <MInput placeholder="最长50字符，如：天利广场B3-12" />
          </MF>
          <MF label="点位地区" required>
            <div className="flex items-center justify-between">
              <span className="text-[15px] text-[#CBD5E1]">省 / 市 / 区</span>
              <Ic d={P.chevR} size={14} className="text-[#CBD5E1]" />
            </div>
          </MF>
          <MF label="详细地址" required>
            <MInput placeholder="街道、楼栋、门牌号等，最长200字符" />
          </MF>
          <MF label="经纬度" required>
            <div className="flex items-center justify-between">
              <span className="text-[15px] text-[#CBD5E1]">
                点击地图选取坐标
              </span>
              <div className="flex items-center gap-1 text-[#2563EB] text-xs font-medium">
                <Ic d={P.pin} size={13} />
                地图选点
              </div>
            </div>
          </MF>
          <MF label="覆盖人数">
            <MInput placeholder="正整数，如：3000" type="number" suffix="人" />
          </MF>
          <MF label="一级场景" required>
            <MSelect
              placeholder="请选择"
              options={["运动", "写字楼", "工厂", "学校", "医院", "其他"]}
            />
          </MF>
          <MF label="二级场景" required>
            <MSelect placeholder="与一级场景联动，请先选择" options={["商务茶水间", "员工餐厅", "大堂休息区", "健身房", "图书馆", "便利店旁", "走廊过道", "其他"]} />
          </MF>
          <MF label="场地照片" required>
            <div className="mt-1.5 flex flex-wrap gap-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-[72px] h-[72px] rounded-[8px] bg-[#F5F7FA] border border-dashed border-[#CBD5E1] flex flex-col items-center justify-center gap-1"
                >
                  <Ic d={P.plus} size={18} className="text-[#CBD5E1]" />
                </div>
              ))}
              <div className="w-[72px] h-[72px] rounded-[8px] bg-[#F5F7FA] border border-dashed border-[#CBD5E1] flex flex-col items-center justify-center gap-0.5">
                <Ic d={P.plus} size={18} className="text-[#CBD5E1]" />
                <span className="text-[10px] text-[#94A3B8]">最多5张</span>
              </div>
            </div>
            <div className="text-[11px] text-[#94A3B8] mt-1">
              支持 jpg/png，单张最大 5MB
            </div>
          </MF>
          <MF label="是否有竞对智能售货机" required>
            <RadioGroup
              value={rivalSmart}
              options={["有", "无"]}
              onChange={setRivalSmart}
            />
          </MF>
          <MF label="是否有竞对传统售货机" required>
            <RadioGroup
              value={rivalTrad}
              options={["有", "无"]}
              onChange={setRivalTrad}
            />
          </MF>
          <MF label="百米内是否有便利店" required>
            <RadioGroup
              value={nearStore}
              options={["有", "无"]}
              onChange={setNearStore}
            />
          </MF>
          <MF label="点位信息备注">
            <textarea
              placeholder="其他说明，最长500字符"
              rows={3}
              className="w-full text-[15px] text-[#0F172A] placeholder-[#CBD5E1] outline-none resize-none bg-transparent"
            />
          </MF>
        </MC>

        {/* ── 2. 合同信息 ── */}
        <MSec title="合同信息" />
        <MC>
          <MF label="合同附件">
            <div className="flex items-center justify-between">
              <span className="text-[15px] text-[#CBD5E1]">上传合同文件</span>
              <div className="flex items-center gap-1 text-[#2563EB] text-xs font-medium">
                <Ic d={P.upload} size={13} />
                上传
              </div>
            </div>
            <div className="text-[11px] text-[#94A3B8] mt-1">
              支持 PDF / Word / 图片，单文件最大 10MB
            </div>
          </MF>
        </MC>

        {/* ── 3. 联系人信息 ── */}
        <MSec title="联系人信息" />
        <MC>
          <MF label="联系人姓名" required>
            <MInput placeholder="最长20字符" />
          </MF>
          <MF label="联系电话" required>
            <MInput placeholder="11位手机号" type="tel" />
          </MF>
          <MF label="联系人性别">
            <MSelect placeholder="请选择" options={["男", "女"]} />
          </MF>
          <MF label="联系人微信号">
            <MInput placeholder="最长30字符" />
          </MF>
          <MF label="联系人邮箱">
            <MInput placeholder="邮箱格式" type="email" />
          </MF>
          <MF label="联系人身份">
            <MInput placeholder="如：行政主管，最长20字符" />
          </MF>
        </MC>

        {/* ── 4. 运营配置（补货规则）── */}
        <MSec title="运营配置" />
        <MC>
          <MF label="补货设置" required>
            <div className="flex flex-wrap gap-2 mt-1">
              {WEEKDAYS.map((d) => (
                <button
                  key={d}
                  onClick={() => toggleDay(d)}
                  className={`h-8 w-12 rounded-[8px] text-xs font-semibold transition-all
                    ${
                      restock.includes(d)
                        ? "bg-[#2563EB] text-white"
                        : "bg-[#F5F7FA] text-[#64748B]"
                    }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </MF>
        </MC>

        {/* ── 5. 关联装机工单 ── */}
        <MSec title="关联装机工单" />
        <MC>
          <MF label="是否同步安装申请" required>
            <RadioGroup
              value={syncVal}
              options={["是", "否"]}
              onChange={(v) => {
                setSyncVal(v)
                setSyncInstall(v === "是")
              }}
            />
          </MF>
          {syncInstall && (
            <>
              <MF label="设备型号" required>
                <MSelect
                  placeholder="从设备型号字典选择"
                  options={["智柜 Pro X8", "智柜 Max X12", "智柜 Lite X4"]}
                />
              </MF>
              <MF label="设备安装位置">
                <MInput placeholder="如有指定安装位置请填写，如：大堂东侧靠窗" />
              </MF>
              <MF label="需求安装时间" required>
                <div className="flex items-center justify-between">
                  <span className="text-[15px] text-[#CBD5E1]">
                    不能早于今天，请选择日期
                  </span>
                  <Ic d={P.cal} size={14} className="text-[#CBD5E1]" />
                </div>
              </MF>
              <MF label="是否定制外观" required>
                <RadioGroup
                  value={customLook}
                  options={["是", "否"]}
                  onChange={setCustomLook}
                />
              </MF>
              {customLook === "是" && (
                <MF label="点位外观照片" required>
                  <div className="flex gap-2 mt-1">
                    <div className="w-20 h-20 rounded-[8px] border border-dashed border-[#CBD5E1] bg-[#F8FAFC] flex flex-col items-center justify-center gap-1 text-[#94A3B8]">
                      <Ic d={P.plus} size={18} />
                      <span className="text-[10px]">上传</span>
                    </div>
                  </div>
                  <div className="text-[11px] text-[#94A3B8] mt-1">
                    用于定制外观参考，支持 JPG / PNG，最多 6 张
                  </div>
                </MF>
              )}
              <MF label="是否需提前报备" required>
                <RadioGroup
                  value={needReport}
                  options={["是", "否"]}
                  onChange={setNeedReport}
                />
              </MF>
              <MF label="是否有电梯" required>
                <RadioGroup
                  value={hasElevator}
                  options={["是", "否"]}
                  onChange={setHasElevator}
                />
              </MF>
              <MF label="是否需户外棚" required>
                <RadioGroup
                  value={needShed}
                  options={["是", "否"]}
                  onChange={setNeedShed}
                />
              </MF>
              <MF label="备注（其他要求）">
                <MInput placeholder="最长200字符" />
              </MF>
            </>
          )}
        </MC>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-[#F1F5F9] px-4 py-3 flex gap-3 flex-shrink-0 shadow-[0_-1px_8px_0_rgba(15,23,42,0.06)]">
        <MBtn variant="ghost" onClick={onBack}>
          暂存
        </MBtn>
        <MBtn variant="primary" onClick={onSuccess}>
          提交审批
        </MBtn>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// SUCCESS FEEDBACK
// ══════════════════════════════════════════════════════════════════════════════
const SuccessScreen = ({
  title,
  desc,
  onDone,
  onView,
}: {
  title: string
  desc: string
  onDone: () => void
  onView?: () => void
}) => (
  <div className="h-full flex flex-col items-center justify-center bg-white px-8">
    <div className="w-20 h-20 bg-[#F0FDF4] rounded-full flex items-center justify-center mb-5">
      <Ic d={P.checkC} size={40} className="text-[#16A34A]" />
    </div>
    <div className="text-xl font-bold text-[#0F172A] mb-2">{title}</div>
    <p className="text-sm text-[#94A3B8] text-center leading-relaxed mb-8">
      {desc}
    </p>
    <div className="flex flex-col gap-3 w-full">
      {onView && (
        <MBtn variant="secondary" onClick={onView}>
          查看审批进度
        </MBtn>
      )}
      <MBtn variant="ghost" onClick={onDone}>
        返回列表
      </MBtn>
    </div>
  </div>
)

// ══════════════════════════════════════════════════════════════════════════════
// SCREEN 5 – CUSTOMER LIST (redesigned)
// ══════════════════════════════════════════════════════════════════════════════
const CRM_CUSTOMERS = [
  { id: "C001", code: "KH-20230115", name: "蜂巢智能科技（深圳）有限公司", belong: "自营", type: "企业", contact: "张伟", phone: "138-8888-0001", level: "战略", status: "正常", auditStatus: "审核通过", created: "2023-01-15" },
  { id: "C002", code: "KH-20230601", name: "格林购物科技有限公司", belong: "渠道商", type: "企业", contact: "陈主任", phone: "139-7777-0002", level: "金牌", status: "正常", auditStatus: "审核通过", created: "2023-06-01" },
  { id: "C003", code: "KH-20240310", name: "都市生活科技集团", belong: "加盟商", type: "企业", contact: "李经理", phone: "136-6666-0003", level: "金牌", status: "正常", auditStatus: "待审核", created: "2024-03-10" },
  { id: "C004", code: "KH-20240820", name: "壹品生活连锁运营管理有限公司", belong: "渠道商", type: "企业", contact: "王总", phone: "135-5555-0004", level: "银牌", status: "正常", auditStatus: "待审核", created: "2024-08-20" },
  { id: "C005", code: "KH-20250102", name: "新零售运营管理公司", belong: "自营", type: "政府", contact: "刘经理", phone: "133-4444-0005", level: "普通", status: "禁用", auditStatus: "审核驳回", created: "2025-01-02" },
  { id: "C006", code: "KH-20250605", name: "华兴商业地产集团", belong: "渠道商", type: "事业单位", contact: "赵峰", phone: "137-3333-0006", level: "银牌", status: "正常", auditStatus: "审核通过", created: "2025-06-05" },
  { id: "C007", code: "KH-20250901", name: "朝阳科技园物业管理有限公司", belong: "加盟商", type: "企业", contact: "孙莉", phone: "132-2222-0007", level: "普通", status: "禁用", auditStatus: "审核驳回", created: "2025-09-01" },
]

const crmStatusColor = (s: string): BC =>
  (({ 正常: "green", 禁用: "gray" })[s] ?? "gray") as BC

const auditStatusStyle = (s: string) =>
  s === "审核通过" ? "bg-[#F0FDF4] text-[#16A34A]"
  : s === "审核驳回" ? "bg-[#FEF2F2] text-[#DC2626]"
  : "bg-[#FFFBEB] text-[#D97706]"

const CustomerList = ({
  onDetail,
  onNew,
  tab,
  onTabChange,
}: {
  onDetail: () => void
  onNew: () => void
  tab: string
  onTabChange: (t: string) => void
}) => {
  const [statusFilter, setStatusFilter] = useState("全部")
  const [expanded, setExpanded] = useState(false)
  const STATUS_OPTS = ["全部", "正常", "禁用"]

  const filtered = CRM_CUSTOMERS.filter(
    (c) => statusFilter === "全部" || c.status === statusFilter,
  )

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-white flex-shrink-0 shadow-[0_1px_0_0_#F1F5F9]">
        <NavBar title="客户管理" rightEl={
          <button onClick={onNew} className="w-9 h-9 flex items-center justify-center text-[#2563EB]">
            <Ic d={P.plus} size={22} />
          </button>
        } />

        {/* Search row */}
        <div className="px-4 pb-3 flex gap-2">
          <div className="flex-1 flex items-center bg-[#F5F7FA] rounded-[10px] px-3 h-10 gap-2">
            <Ic
              d={P.search}
              size={15}
              className="text-[#94A3B8] flex-shrink-0"
            />
            <input
              placeholder="客户名称 / 编码"
              className="flex-1 text-[14px] bg-transparent outline-none placeholder-[#CBD5E1] text-[#0F172A]"
            />
          </div>
          <button
            onClick={() => setExpanded((v) => !v)}
            className={`w-10 h-10 rounded-[10px] flex items-center justify-center flex-shrink-0 transition-colors
              ${
                expanded
                  ? "bg-[#EFF6FF] text-[#2563EB]"
                  : "bg-[#F5F7FA] text-[#64748B]"
              }`}
          >
            <Ic d={P.filter} size={16} />
          </button>
        </div>

        {/* Status quick filter */}
        <div
          className="flex gap-2 px-4 pb-3 overflow-x-auto"
          style={{ scrollbarWidth: "none" }}
        >
          {STATUS_OPTS.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`flex-shrink-0 h-7 px-3 rounded-full text-xs font-medium transition-all
                ${
                  statusFilter === s
                    ? "bg-[#2563EB] text-white"
                    : "bg-[#F5F7FA] text-[#64748B]"
                }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Expanded filters */}
        {expanded && (
          <div className="px-4 pb-4 border-t border-[#F1F5F9] pt-3 space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-xs text-[#94A3B8] w-14 flex-shrink-0">归属对象</span>
              <div className="flex gap-1.5 flex-wrap">
                {["全部", "自营", "渠道商", "加盟商"].map(o => (
                  <button key={o} className="h-7 px-3 rounded-full text-xs bg-[#F5F7FA] text-[#64748B]">{o}</button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-[#94A3B8] w-14 flex-shrink-0">客户类型</span>
              <div className="flex gap-1.5 flex-wrap">
                {["企业", "政府", "事业单位", "其他"].map(o => (
                  <button key={o} className="h-7 px-3 rounded-full text-xs bg-[#F5F7FA] text-[#64748B]">{o}</button>
                ))}
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-xs text-[#94A3B8] w-14 flex-shrink-0 pt-1.5">审核状态</span>
              <div className="flex gap-1.5 flex-wrap">
                {["全部", "待审核", "审核通过", "审核驳回"].map(s => (
                  <button key={s} className="h-7 px-3 rounded-full text-xs bg-[#F5F7FA] text-[#64748B]">{s}</button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-[#94A3B8] w-14 flex-shrink-0">创建时间</span>
              <div className="flex-1 flex items-center gap-2">
                <div className="flex-1 h-8 bg-[#F5F7FA] rounded-[8px] flex items-center px-3 text-xs text-[#CBD5E1]">开始日期</div>
                <span className="text-[#CBD5E1] text-xs">—</span>
                <div className="flex-1 h-8 bg-[#F5F7FA] rounded-[8px] flex items-center px-3 text-xs text-[#CBD5E1]">结束日期</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto bg-[#F5F7FA] pt-3 pb-24">
        <div className="px-4 mb-2 text-xs text-[#94A3B8]">
          共 {filtered.length} 条记录
        </div>
        {filtered.map((c) => (
          <div
            key={c.id}
            onClick={onDetail}
            className="bg-white mx-4 mb-3 rounded-[12px] px-4 py-4 shadow-[0_1px_4px_0_rgba(15,23,42,0.06)] active:bg-[#F8FAFC] cursor-pointer"
          >
            {/* Row 1: 客户名称 + 客户状态 */}
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <div className="flex-1 min-w-0">
                <div className="text-[15px] font-semibold text-[#0F172A] leading-tight line-clamp-1 mb-0.5">{c.name}</div>
                <div className="text-xs text-[#94A3B8]">{c.code}</div>
              </div>
              <Tag label={c.status} dot color={crmStatusColor(c.status)} />
            </div>
            {/* Row 2: 归属对象 */}
            <div className="flex items-center gap-1.5 text-xs text-[#64748B] mb-2">
              <Ic d={P.users} size={11} className="flex-shrink-0" />
              <span>{c.belong} · {c.type}</span>
            </div>
            {/* Row 3: 联系人 + 联系电话 */}
            <div className="flex items-center gap-3 text-xs text-[#94A3B8] mb-2.5">
              <span className="flex items-center gap-1"><Ic d={P.user} size={11} />{c.contact}</span>
              <span className="flex items-center gap-1"><Ic d={P.phone} size={11} />{c.phone}</span>
            </div>
            {/* Row 4: 审核状态 + 创建时间 */}
            <div className="flex items-center justify-between text-xs text-[#94A3B8]">
              <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${auditStatusStyle(c.auditStatus)}`}>
                {c.auditStatus}
              </span>
              <div className="flex items-center gap-1">
                <Ic d={P.cal} size={11} />
                {c.created}
                <Ic d={P.chevR} size={13} className="text-[#CBD5E1] ml-1" />
              </div>
            </div>
            {c.auditStatus === "审核驳回" && (
              <div className="mt-2.5 pt-2.5 border-t border-[#FEE2E2] flex items-center justify-between">
                <span className="text-xs text-[#DC2626]">审核已驳回，请修改后重新发起</span>
                <button
                  onClick={e => { e.stopPropagation(); onNew(); }}
                  className="flex items-center gap-1 px-3 h-7 bg-[#DC2626] text-white text-xs font-medium rounded-full active:bg-[#B91C1C] transition-colors">
                  <Ic d={P.arrow} size={11} />重新发起
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* FAB */}
      <button
        onClick={onNew}
        className="fixed bottom-[88px] right-6 w-14 h-14 bg-[#2563EB] rounded-full shadow-[0_4px_16px_0_rgba(37,99,235,0.4)] flex items-center justify-center z-10 active:scale-95 transition-transform"
      >
        <Ic d={P.plus} size={22} className="text-white" />
      </button>

      <TabBar active={tab} onChange={onTabChange} />
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// SCREEN 6 – CUSTOMER DETAIL (redesigned)
// ══════════════════════════════════════════════════════════════════════════════
const CRM_LOCATIONS = [
  {
    id: "L001",
    code: "PW-2023001",
    name: "蜂巢科技园北楼1F-A区",
    addr: "深圳市南山区科技园北路",
    level: "A",
    status: "正常",
  },
  {
    id: "L002",
    code: "PW-2023002",
    name: "蜂巢科技园南楼B1-C区",
    addr: "深圳市南山区科技南路",
    level: "B",
    status: "正常",
  },
  {
    id: "L003",
    code: "PW-2024011",
    name: "蜂巢研发中心5楼茶水间",
    addr: "深圳市南山区高新中路",
    level: "A",
    status: "待审核",
  },
  {
    id: "L004",
    code: "PW-2024022",
    name: "蜂巢园区配套楼1楼大厅",
    addr: "深圳市南山区科技中路",
    level: "C",
    status: "禁用",
  },
]

const CustomerDetail = ({ onBack, onResubmit }: { onBack: () => void; onResubmit?: () => void }) => {
  type CDTab = "基本信息" | "商户/合同信息" | "联系人信息" | "客户小程序登录账号" | "关联点位" | "审核状态"
  const TABS: CDTab[] = ["基本信息", "商户/合同信息", "联系人信息", "客户小程序登录账号", "关联点位", "审核状态"]
  const [activeTab, setActiveTab] = useState<CDTab>("基本信息")

  const [auditIdx, setAuditIdx] = useState(2)
  const AUDIT_STATES = ["审核中", "审核通过", "审核驳回"] as const
  const auditStatus = AUDIT_STATES[auditIdx % 3]

  const auditStyleMap: Record<string, { bg: string; border: string; icon: string; iconColor: string; textColor: string }> = {
    审核中:  { bg: "bg-[#EFF6FF]", border: "border-[#BFDBFE]", icon: P.info,   iconColor: "text-[#2563EB]", textColor: "text-[#2563EB]" },
    审核通过: { bg: "bg-[#F0FDF4]", border: "border-[#BBF7D0]", icon: P.checkC, iconColor: "text-[#16A34A]", textColor: "text-[#16A34A]" },
    审核驳回: { bg: "bg-[#FEF2F2]", border: "border-[#FECACA]", icon: P.alert,  iconColor: "text-[#DC2626]", textColor: "text-[#DC2626]" },
  }
  const ast = auditStyleMap[auditStatus]

  return (
    <div className="h-full flex flex-col bg-[#F5F7FA]">
      <div className="bg-white flex-shrink-0 shadow-[0_1px_0_0_#F1F5F9]">
        <NavBar title="客户详情" onBack={onBack} />
        {/* Tab bar */}
        <div className="flex overflow-x-auto border-t border-[#F1F5F9]" style={{ scrollbarWidth: "none" }}>
          {TABS.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`flex-shrink-0 px-4 py-3 text-[13px] font-medium border-b-2 transition-colors whitespace-nowrap
                ${activeTab === tab ? "border-[#2563EB] text-[#2563EB]" : "border-transparent text-[#64748B] hover:text-[#334155]"}`}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-6">

        {/* ── 基本信息 ── */}
        {activeTab === "基本信息" && (
          <>
            <MC className="mt-3">
              <MKV label="客户名称" value="蜂巢智能科技（深圳）有限公司" />
              <MKV label="客户编码" value="KH-20230115" />
              <MKV label="客户类型" value="企业" />
              <MKV label="所属行业" value="科技互联网" />
              <MKV label="客户规模" value="500人以上" />
              <MKV label="归属对象" value="自营" />
              <MKV label="客户地区" value="广东省 · 深圳市 · 南山区" />
              <MKV label="详细位置" value="科技园北路12号蜂巢大厦" />
              <MKV label="经纬度" value="113.944°E, 22.538°N" />
              <MKV label="覆盖人数" value="约 12,000 人" />
            </MC>
            <MSec title="场地照片" />
            <MC noPad>
              <div className="px-4 pt-3 pb-3">
                <div className="flex gap-2">
                  {["#E2E8F0", "#CBD5E1", "#94A3B8"].map((bg, i) => (
                    <div key={i} style={{ background: bg }}
                      className="w-20 h-20 rounded-[8px] flex-shrink-0 flex items-center justify-center">
                      <Ic d={P.eye} size={16} className="text-white opacity-70" />
                    </div>
                  ))}
                  <div className="w-20 h-20 rounded-[8px] bg-[#F5F7FA] border border-dashed border-[#CBD5E1] flex items-center justify-center flex-shrink-0">
                    <span className="text-xs text-[#94A3B8]">+5</span>
                  </div>
                </div>
              </div>
            </MC>
          </>
        )}

        {/* ── 商户/合同信息 ── */}
        {activeTab === "商户/合同信息" && (
          <>
            <MC noPad className="mt-3">
              <div className="px-4">
                <MKV label="合同附件" value={
                  <button className="flex items-center gap-1 text-[#2563EB] text-sm">
                    <Ic d={P.clip} size={13} />合同文件.pdf
                  </button>
                } />
                <MKV label="合同有效期" value="2023-01-15 ~ 2026-01-14" />
                <MKV label="保证金金额" value="¥ 50,000.00" highlight />
              </div>
            </MC>
          </>
        )}

        {/* ── 联系人信息 ── */}
        {activeTab === "联系人信息" && (
          <MC className="mt-3">
            <MKV label="联系人姓名" value="张伟" />
            <MKV label="联系电话" value={<span className="text-[#2563EB]">138-8888-0001</span>} />
            <MKV label="联系人性别" value="男" />
            <MKV label="微信号" value="zhangwei_fc" />
            <MKV label="邮箱" value="zhang@fengchao.com" />
            <MKV label="联系人身份" value="采购总监" />
            <MKV label="设备联系人" value="王建国" />
            <MKV label="设备联系电话" value="138-8888-0088" />
            <MKV label="销售负责人电话" value="139-0000-0001" />
          </MC>
        )}

        {/* ── 客户小程序登录账号 ── */}
        {activeTab === "客户小程序登录账号" && (
          <MC className="mt-3">
            <MKV label="登录账号" value="138-8888-0001" />
            <MKV label="登录密码" value="••••••" />
          </MC>
        )}

        {/* ── 关联点位 ── */}
        {activeTab === "关联点位" && (
          <div className="mt-3">
            <div className="px-4 mb-2 text-xs text-[#94A3B8]">共 {CRM_LOCATIONS.length} 个</div>
            {CRM_LOCATIONS.map(l => (
              <div key={l.id} className="bg-white mx-4 mb-2 rounded-[12px] px-4 py-3 shadow-[0_1px_4px_0_rgba(15,23,42,0.05)]">
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <span className="text-[14px] font-semibold text-[#0F172A] leading-tight flex-1">{l.name}</span>
                  <Tag label={l.status} dot color={crmStatusColor(l.status)} />
                </div>
                <div className="flex items-center gap-3 text-xs text-[#94A3B8] mb-1">
                  <span className="text-[#64748B]">{l.code}</span>
                  <span>·</span>
                  <span>等级 {l.level}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-[#94A3B8]">
                  <Ic d={P.pin} size={11} />{l.addr}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── 审核状态 ── */}
        {activeTab === "审核状态" && (
          <>
            <div className="px-4 pt-3 pb-1 flex items-center justify-between">
              <span className="text-xs font-semibold text-[#64748B]">当前审核状态</span>
              <button onClick={() => setAuditIdx(i => i + 1)}
                className="text-xs text-[#2563EB] bg-[#EFF6FF] px-2 py-1 rounded-full">
                切换状态演示
              </button>
            </div>
            <div className={`mx-4 mt-1 mb-3 rounded-[12px] p-4 border ${ast.bg} ${ast.border} flex gap-3`}>
              <div className={`w-9 h-9 rounded-full ${ast.bg} flex items-center justify-center flex-shrink-0`}>
                <Ic d={ast.icon} size={18} className={ast.iconColor} />
              </div>
              <div className="flex-1 min-w-0">
                <div className={`text-sm font-bold mb-1 ${ast.textColor}`}>{auditStatus}</div>
                {auditStatus === "审核驳回" && (
                  <div className="text-xs text-[#DC2626] bg-white rounded-lg px-3 py-2 mb-2 leading-relaxed border border-[#FECACA]">
                    驳回原因：该客户营业执照与提交资料不一致，请重新上传有效证件后再发起审核。
                  </div>
                )}
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-[#64748B]">
                  <span>审核人：张主管</span>
                  <span>发起时间：2025-09-10</span>
                  {auditStatus !== "审核中" && <span>完成时间：2025-09-11</span>}
                </div>
              </div>
            </div>
          </>
        )}

      </div>

      {/* 重新发起 bottom bar */}
      {activeTab === "审核状态" && auditStatus === "审核驳回" && (
        <div className="bg-white border-t border-[#F1F5F9] px-4 py-3 flex gap-3 flex-shrink-0">
          <div className="flex-1 flex flex-col justify-center">
            <span className="text-xs text-[#DC2626]">审核已驳回</span>
            <span className="text-[10px] text-[#94A3B8]">请修改信息后重新提交</span>
          </div>
          <button onClick={onResubmit}
            className="flex items-center gap-1.5 px-5 h-10 bg-[#DC2626] text-white text-sm font-semibold rounded-[10px] active:bg-[#B91C1C] transition-colors flex-shrink-0">
            <Ic d={P.arrow} size={14} />重新发起
          </button>
        </div>
      )}
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// SCREEN 7 – NEW CUSTOMER (redesigned)
// ══════════════════════════════════════════════════════════════════════════════
const SectionHeader = ({
  title,
  collapsed,
  onToggle,
  required = false,
}: {
  title: string
  collapsed: boolean
  onToggle: () => void
  required?: boolean
}) => (
  <button
    onClick={onToggle}
    className="w-full flex items-center justify-between px-4 pt-5 pb-2"
  >
    <div className="flex items-center gap-1.5">
      <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wide">
        {title}
      </span>
      {required && (
        <span className="text-[10px] text-[#DC2626] font-medium">必填</span>
      )}
    </div>
    <Ic
      d={collapsed ? P.chevR : P.chevD}
      size={14}
      className="text-[#CBD5E1]"
    />
  </button>
)

const NewCustomer = ({
  onBack,
  onSuccess,
}: {
  onBack: () => void
  onSuccess: () => void
}) => {
  const [phone, setPhone] = useState("")

  return (
    <div className="h-full flex flex-col bg-[#F5F7FA]">
      <div className="bg-white flex-shrink-0 shadow-[0_1px_0_0_#F1F5F9]">
        <NavBar title="新增客户" onBack={onBack} />
      </div>
      <div className="flex-1 overflow-y-auto pb-28">
        {/* ─ 1. 基本信息 ─ */}
        <div className="px-4 pt-5 pb-1">
          <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wide">基本信息</span>
        </div>
        <MC>
          <MF label="客户名称" required>
            <MInput placeholder="营业执照注册名称" />
          </MF>
          <MF label="客户类型" required>
            <MSelect placeholder="请选择" options={["企业", "政府", "事业单位", "其他"]} />
          </MF>
          <MF label="所属行业">
            <MSelect placeholder="请选择行业" options={["科技互联网", "零售商超", "房地产物业", "教育", "医疗", "其他"]} />
          </MF>
          <MF label="客户规模">
            <MSelect placeholder="请选择规模" options={["50人以下", "50~200人", "200~500人", "500人以上"]} />
          </MF>
          <MF label="归属对象" required>
            <MSelect placeholder="请选择" options={["自营", "渠道商", "加盟商"]} />
          </MF>
          <MF label="客户地区" required>
            <div className="flex items-center justify-between">
              <span className="text-[15px] text-[#CBD5E1]">省 / 市 / 区</span>
              <Ic d={P.chevR} size={14} className="text-[#CBD5E1]" />
            </div>
          </MF>
          <MF label="详细位置">
            <MInput placeholder="街道、楼栋、门牌号等" />
          </MF>
          <MF label="经纬度">
            <div className="flex items-center justify-between">
              <span className="text-[15px] text-[#CBD5E1]">点击地图选取坐标</span>
              <div className="flex items-center gap-1 text-[#2563EB] text-xs">
                <Ic d={P.pin} size={13} />地图选点
              </div>
            </div>
          </MF>
          <MF label="场地照片">
            <div className="mt-1 flex flex-wrap gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-20 h-20 rounded-[8px] bg-[#F5F7FA] border border-dashed border-[#CBD5E1] flex items-center justify-center">
                  <Ic d={P.plus} size={18} className="text-[#CBD5E1]" />
                </div>
              ))}
              <div className="w-20 h-20 rounded-[8px] bg-[#F5F7FA] border border-dashed border-[#CBD5E1] flex flex-col items-center justify-center gap-1">
                <Ic d={P.plus} size={18} className="text-[#CBD5E1]" />
                <span className="text-[10px] text-[#94A3B8]">最多9张</span>
              </div>
            </div>
          </MF>
        </MC>

        {/* ─ 2. 商务/合同信息 ─ */}
        <div className="px-4 pt-5 pb-1">
          <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wide">商务 / 合同信息</span>
        </div>
        <MC>
          <MF label="合同附件">
            <div className="flex items-center justify-between">
              <span className="text-[15px] text-[#CBD5E1]">上传合同文件</span>
              <div className="flex items-center gap-1 text-[#2563EB] text-xs">
                <Ic d={P.upload} size={13} />上传
              </div>
            </div>
          </MF>
          <MF label="合同有效期">
            <div className="flex items-center justify-between">
              <span className="text-[15px] text-[#CBD5E1]">选择有效期范围</span>
              <Ic d={P.cal} size={14} className="text-[#CBD5E1]" />
            </div>
          </MF>
          <MF label="保证金金额">
            <MInput placeholder="0.00" type="number" suffix="元" />
          </MF>
        </MC>

        {/* ─ 3. 联系人信息 ─ */}
        <div className="px-4 pt-5 pb-1">
          <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wide">联系人信息</span>
        </div>
        <MC>
          <MF label="联系人姓名" required>
            <MInput placeholder="主要对接人" />
          </MF>
          <MF label="联系电话" required>
            <MInput placeholder="11位手机号" type="tel" value={phone} />
          </MF>
          <MF label="联系人性别">
            <MSelect placeholder="请选择" options={["男", "女"]} />
          </MF>
          <MF label="微信号">
            <MInput placeholder="选填" />
          </MF>
          <MF label="联系人邮箱">
            <MInput placeholder="选填" type="email" />
          </MF>
          <MF label="联系人身份" required>
            <MInput placeholder="如：采购总监、运营主管" />
          </MF>
          <MF label="设备联系人" required>
            <MInput placeholder="现场设备对接人" />
          </MF>
          <MF label="设备联系电话" required>
            <MInput placeholder="11位手机号" type="tel" />
          </MF>
        </MC>

        {/* ─ 4. 登录账号 ─ */}
        <div className="px-4 pt-5 pb-1">
          <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wide">客户小程序登录账号</span>
        </div>
        <MC>
          <div className="py-2 px-0">
            <div className="bg-[#FFF7ED] rounded-[8px] px-3 py-2 flex items-start gap-2 mb-1">
              <Ic d={P.info} size={13} className="text-[#D97706] flex-shrink-0 mt-0.5" />
              <span className="text-xs text-[#92400E]">
                登录账号默认回填联系电话，密码默认为手机号后 6 位，均可修改。
              </span>
            </div>
          </div>
          <MF label="登录账号" required>
            <MInput placeholder="默认为联系电话" value={phone || undefined} />
          </MF>
          <MF label="登录密码" required>
            <MInput placeholder="默认为手机号后6位" type="password" />
          </MF>
        </MC>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-[#F1F5F9] px-4 py-3 flex gap-3 flex-shrink-0 shadow-[0_-1px_8px_0_rgba(15,23,42,0.06)]">
        <MBtn variant="ghost" onClick={onBack}>
          保存草稿
        </MBtn>
        <MBtn variant="primary" onClick={onSuccess}>
          提交审批
        </MBtn>
      </div>
    </div>
  )
}


// ══════════════════════════════════════════════════════════════════════════════
// SCREEN 8 – APPROVAL CENTER (redesigned)
// ══════════════════════════════════════════════════════════════════════════════
const NEW_APPROVALS = [
  { id: "AP-20250910-001", type: "点位新增", applicant: "李明", time: "2025-09-10 09:30", status: "待审核", customer: "格林购物科技有限公司", location: "天利中央广场B3-12", note: "客户要求10月前完成装机", reviewer: "张主管", rejectReason: "", approvedTime: "", approvalNote: "", rejectedTime: "" },
  { id: "AP-20250908-002", type: "设备安装", applicant: "王芳", time: "2025-09-08 14:20", status: "审核通过", customer: "蜂巢智能科技（深圳）有限公司", location: "科技园北楼1F", note: "追加第3台，位置已确认", reviewer: "刘总监", approvedTime: "2025-09-08 17:05", approvalNote: "客户资质良好，位置合理，批准通过", rejectReason: "", rejectedTime: "" },
  { id: "AP-20250905-003", type: "点位新增", applicant: "李明", time: "2025-09-05 11:00", status: "审核驳回", customer: "壹品生活连锁运营管理有限公司", location: "光明新城购物中心3F", note: "节假日流量大，适合选址", reviewer: "张主管", rejectedTime: "2025-09-06 09:30", rejectReason: "该楼层已有竞品覆盖，且客流数据不达标（日均800人次，要求≥2000人次）。建议调整至1F或B1层重新评估。", approvedTime: "", approvalNote: "" },
  { id: "AP-20250903-004", type: "客户新增", applicant: "张磊", time: "2025-09-03 10:00", status: "审核通过", customer: "新零售运营管理公司", location: "—", note: "续约3年，单价下调5%", reviewer: "刘总监", approvedTime: "2025-09-03 15:30", approvalNote: "续约条款合理，价格在授权范围内，批准", rejectReason: "", rejectedTime: "" },
  { id: "AP-20250901-005", type: "设备安装", applicant: "李明", time: "2025-09-01 09:00", status: "待审核", customer: "都市生活科技集团", location: "皇庭广场1F-A5", note: "新机2台部署", reviewer: "张主管", rejectReason: "", approvedTime: "", approvalNote: "", rejectedTime: "" },
  { id: "AP-20250828-006", type: "客户新增", applicant: "王芳", time: "2025-08-28 16:00", status: "审核驳回", customer: "华兴商业地产集团", location: "—", note: "新客户开拓", reviewer: "张主管", rejectedTime: "2025-08-29 10:00", rejectReason: "营业执照与提交资料不一致，请重新上传有效证件。", approvedTime: "", approvalNote: "" },
];

type ApprovalStatusNew = "待审核" | "审核通过" | "审核驳回";

const apprStatusStyle: Record<ApprovalStatusNew, { bg: string; text: string; dot: string }> = {
  "待审核":  { bg: "bg-[#FFF7ED]", text: "text-[#D97706]", dot: "bg-[#D97706]" },
  "审核通过": { bg: "bg-[#F0FDF4]", text: "text-[#16A34A]", dot: "bg-[#16A34A]" },
  "审核驳回": { bg: "bg-[#FEF2F2]", text: "text-[#DC2626]", dot: "bg-[#DC2626]" },
};

const ApprStatusTag = ({ status }: { status: string }) => {
  const s = apprStatusStyle[status as ApprovalStatusNew] ?? { bg: "bg-[#F5F7FA]", text: "text-[#64748B]", dot: "bg-[#94A3B8]" };
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold ${s.bg} ${s.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />{status}
    </span>
  );
};

const TYPE_COLOR_MAP: Record<string, string> = {
  "点位新增": "bg-[#EFF6FF] text-[#2563EB]",
  "客户新增": "bg-[#F5F3FF] text-[#7C3AED]",
  "设备安装": "bg-[#FFF7ED] text-[#C2410C]",
};

const ApprovalCenter = ({
  onDetail, tab, onTabChange, approvalFilter, setApprovalFilter,
}: {
  onDetail: (id: string) => void; tab: string; onTabChange: (t: string) => void;
  approvalFilter: string; setApprovalFilter: (f: string) => void;
}) => {
  const [showFilter, setShowFilter] = useState(false);
  const [typeFilter, setTypeFilter] = useState("全部");
  const [statusFilter2, setStatusFilter2] = useState("全部");
  const [applicantSearch, setApplicantSearch] = useState("");

  const submitted = NEW_APPROVALS.filter(a => a.applicant === "李明");
  const pending   = NEW_APPROVALS.filter(a => a.status === "待审核" && a.reviewer === "张主管");
  const reviewed  = NEW_APPROVALS.filter(a => a.status !== "待审核");

  const ATABS = [
    { key: "submitted", label: "我提交的",  items: submitted },
    { key: "pending",   label: "待我审核",  items: pending, badge: pending.length },
    { key: "reviewed",  label: "我已审核",  items: reviewed },
  ];

  const baseItems = ATABS.find(t => t.key === approvalFilter)?.items ?? [];
  const activeItems = baseItems.filter(a =>
    (typeFilter === "全部" || a.type === typeFilter) &&
    (statusFilter2 === "全部" || a.status === statusFilter2) &&
    (applicantSearch === "" || a.applicant.includes(applicantSearch))
  );

  return (
    <div className="h-full flex flex-col">
      <div className="bg-white flex-shrink-0 shadow-[0_1px_0_0_#F1F5F9]">
        <NavBar title="审批中心" rightEl={
          <button className="w-9 h-9 flex items-center justify-center relative">
            <Ic d={P.bell} size={18} className="text-[#64748B]" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#DC2626] rounded-full border-2 border-white" />
          </button>
        } />

        {/* 3-tab bar */}
        <div className="flex border-b border-[#F1F5F9]">
          {ATABS.map(t => (
            <button key={t.key} onClick={() => setApprovalFilter(t.key)}
              className={`flex-1 py-3 flex items-center justify-center gap-1.5 text-sm font-medium border-b-2 transition-all
                ${approvalFilter === t.key ? "border-[#2563EB] text-[#2563EB]" : "border-transparent text-[#94A3B8]"}`}>
              {t.label}
              {t.badge ? (
                <span className={`min-w-[20px] h-5 px-1 rounded-full text-[10px] font-bold flex items-center justify-center
                  ${approvalFilter === t.key ? "bg-[#2563EB] text-white" : "bg-[#FFF7ED] text-[#D97706]"}`}>
                  {t.badge}
                </span>
              ) : null}
            </button>
          ))}
        </div>

        {/* Filter toggle row */}
        <div className="px-4 py-2.5 flex items-center justify-between">
          <span className="text-xs text-[#94A3B8]">共 {activeItems.length} 条</span>
          <button onClick={() => setShowFilter(v => !v)}
            className={`flex items-center gap-1.5 text-xs font-medium px-3 h-7 rounded-full transition-colors
              ${showFilter ? "bg-[#EFF6FF] text-[#2563EB]" : "bg-[#F5F7FA] text-[#64748B]"}`}>
            <Ic d={P.filter} size={13} />筛选
          </button>
        </div>

        {/* Filter panel */}
        {showFilter && (
          <div className="px-4 pb-3 border-t border-[#F1F5F9] pt-3 space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-xs text-[#94A3B8] w-14 flex-shrink-0">申请人</span>
              <div className="flex-1 h-8 bg-[#F5F7FA] rounded-[8px] flex items-center px-3 gap-2">
                <Ic d={P.search} size={13} className="text-[#CBD5E1] flex-shrink-0" />
                <input
                  className="flex-1 bg-transparent text-xs text-[#0F172A] outline-none placeholder:text-[#CBD5E1]"
                  placeholder="输入申请人姓名"
                  value={applicantSearch}
                  onChange={e => setApplicantSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-[#94A3B8] w-14 flex-shrink-0">申请类型</span>
              <div className="flex gap-1.5 flex-wrap">
                {["全部","点位新增","客户新增","设备安装"].map(o => (
                  <button key={o} onClick={() => setTypeFilter(o)}
                    className={`h-7 px-3 rounded-full text-xs font-medium transition-colors
                      ${typeFilter === o ? "bg-[#2563EB] text-white" : "bg-[#F5F7FA] text-[#64748B]"}`}>{o}</button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-[#94A3B8] w-14 flex-shrink-0">申请时间</span>
              <div className="flex-1 flex items-center gap-2">
                <div className="flex-1 h-8 bg-[#F5F7FA] rounded-[8px] flex items-center px-3 text-xs text-[#CBD5E1]">开始日期</div>
                <span className="text-[#CBD5E1] text-xs">—</span>
                <div className="flex-1 h-8 bg-[#F5F7FA] rounded-[8px] flex items-center px-3 text-xs text-[#CBD5E1]">结束日期</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-[#94A3B8] w-14 flex-shrink-0">状态</span>
              <div className="flex gap-1.5 flex-wrap">
                {["全部","待审核","审核通过","审核驳回"].map(o => (
                  <button key={o} onClick={() => setStatusFilter2(o)}
                    className={`h-7 px-3 rounded-full text-xs font-medium transition-colors
                      ${statusFilter2 === o ? "bg-[#2563EB] text-white" : "bg-[#F5F7FA] text-[#64748B]"}`}>{o}</button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto bg-[#F5F7FA] pt-3 pb-24">
        {activeItems.length === 0 ? (
          <MEmpty icon="clip" title="暂无审批记录"
            desc={approvalFilter === "pending" ? "目前没有待您处理的审批" : "没有符合条件的审批记录"} />
        ) : activeItems.map(a => (
          <div key={a.id} onClick={() => onDetail(a.id)}
            className="bg-white mx-4 mb-3 rounded-[12px] px-4 py-4 shadow-[0_1px_4px_0_rgba(15,23,42,0.06)] active:bg-[#F8FAFC] cursor-pointer">
            {/* Row 1: type badge + status */}
            <div className="flex items-center justify-between mb-2">
              <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${TYPE_COLOR_MAP[a.type] ?? "bg-[#F5F7FA] text-[#64748B]"}`}>
                {a.type}
              </span>
              <ApprStatusTag status={a.status} />
            </div>
            {/* Row 2: 申请单号 */}
            <div className="text-xs text-[#94A3B8] font-mono mb-2">{a.id}</div>
            {/* Rows: key fields */}
            <div className="space-y-1.5 mb-2.5">
              <div className="flex items-center text-xs gap-2">
                <span className="text-[#CBD5E1] w-14 flex-shrink-0">申请人</span>
                <span className="text-[#334155] font-medium">{a.applicant}</span>
              </div>
              <div className="flex items-center text-xs gap-2">
                <span className="text-[#CBD5E1] w-14 flex-shrink-0">申请时间</span>
                <span className="text-[#334155]">{a.time}</span>
              </div>
              {a.reviewer && (
                <div className="flex items-center text-xs gap-2">
                  <span className="text-[#CBD5E1] w-14 flex-shrink-0">审核人</span>
                  <span className="text-[#334155]">{a.reviewer}</span>
                </div>
              )}
              {(a.status === "审核通过" && a.approvedTime) && (
                <div className="flex items-center text-xs gap-2">
                  <span className="text-[#CBD5E1] w-14 flex-shrink-0">审核时间</span>
                  <span className="text-[#334155]">{a.approvedTime}</span>
                </div>
              )}
              {(a.status === "审核驳回" && a.rejectedTime) && (
                <div className="flex items-center text-xs gap-2">
                  <span className="text-[#CBD5E1] w-14 flex-shrink-0">审核时间</span>
                  <span className="text-[#334155]">{a.rejectedTime}</span>
                </div>
              )}
            </div>
            {/* Rejection reason */}
            {a.status === "审核驳回" && a.rejectReason && (
              <div className="px-3 py-2 bg-[#FEF2F2] rounded-[8px] text-xs text-[#DC2626] line-clamp-2 border border-[#FECACA] mb-2">
                驳回原因：{a.rejectReason.substring(0, 60)}…
              </div>
            )}
            {/* Pending hint */}
            {a.status === "待审核" && (
              <div className="flex items-center gap-1.5 text-xs text-[#D97706] mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
                待处理 · 点击进入审批操作页
              </div>
            )}
            {/* Completed/rejected navigation hint */}
            {(a.status === "审核通过" || a.status === "审核驳回") && (
              <div className="flex items-center justify-end gap-1 text-xs text-[#94A3B8] mt-1">
                查看详情 <Ic d={P.chevR} size={12} className="text-[#CBD5E1]" />
              </div>
            )}
          </div>
        ))}
      </div>

      <TabBar active={tab} onChange={onTabChange} />
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// SCREEN 9 – APPROVAL ACTION / DETAIL (redesigned)
// ══════════════════════════════════════════════════════════════════════════════
const ApprovalDetail = ({
  onBack, approvalId, mode, onResubmit,
}: {
  onBack: () => void; approvalId: string; mode: "pending" | "approved" | "rejected";
  onResubmit?: () => void;
}) => {
  const eff = (() => {
    const found = NEW_APPROVALS.find(x => x.id === approvalId);
    if (found) return found;
    if (mode === "approved") return NEW_APPROVALS.find(x => x.status === "审核通过") ?? NEW_APPROVALS[1];
    if (mode === "rejected") return NEW_APPROVALS.find(x => x.status === "审核驳回") ?? NEW_APPROVALS[2];
    return NEW_APPROVALS.find(x => x.status === "待审核") ?? NEW_APPROVALS[0];
  })();

  const isPending = mode === "pending" && eff.status === "待审核";
  const [opinion, setOpinion] = useState("");
  const [showConfirm, setShowConfirm] = useState<"approve" | "reject" | null>(null);
  const [detailOpen, setDetailOpen] = useState(false); // 具体详情默认收起

  // 具体详情：按申请类型展示提交的业务表单内容
  const detailFields: { label: string; value: ReactNode }[] = (() => {
    if (eff.type === "点位新增") return [
      { label: "归属客户", value: eff.customer },
      { label: "点位名称", value: eff.location },
      { label: "点位地区", value: "广东省·深圳市·南山区" },
      { label: "详细地址", value: "科技园北路12号蜂巢大厦1楼A区" },
      { label: "经纬度", value: "113.944°E, 22.538°N" },
      { label: "覆盖人数", value: "约 3,200 人" },
      { label: "一级场景", value: "写字楼" },
      { label: "二级场景", value: "商务茶水间" },
      { label: "场地照片", value: (
        <div className="flex gap-1.5 justify-end">
          {["入口", "立面", "位置1"].map(t => (
            <div key={t} className="w-12 h-12 rounded-[8px] bg-[#F5F7FA] border border-[#E2E8F0] flex items-center justify-center">
              <span className="text-[10px] text-[#94A3B8]">{t}</span>
            </div>
          ))}
        </div>
      ) },
      { label: "竞对智能售货机", value: "无" },
      { label: "竞对传统售货机", value: "有" },
      { label: "百米内便利店", value: "无" },
      { label: "同步安装申请", value: <span className="text-[#2563EB]">是</span> },
    ];
    if (eff.type === "设备安装") return [
      { label: "归属客户", value: eff.customer },
      { label: "安装点位", value: eff.location },
      { label: "设备型号", value: "智柜 Pro X8" },
      { label: "设备数量", value: "2 台" },
      { label: "设备安装位置", value: "大堂东侧靠窗" },
      { label: "需求安装时间", value: "2025-09-15" },
      { label: "是否定制外观", value: "是" },
      { label: "是否需提前报备", value: "是" },
      { label: "是否有电梯", value: "是" },
      { label: "是否需户外棚", value: "否" },
      { label: "其他要求备注", value: "需提前联系物业申请施工证" },
    ];
    if (eff.type === "客户新增") return [
      { label: "客户名称", value: eff.customer },
      { label: "客户类型", value: "企业" },
      { label: "归属渠道", value: "自营" },
      { label: "客户等级", value: "金牌" },
      { label: "所在地区", value: "广东省·深圳市·福田区" },
      { label: "详细地址", value: "福华三路 88 号 12 楼" },
      { label: "联系人", value: "刘经理" },
      { label: "联系电话", value: <span className="text-[#2563EB]">133-4444-0005</span> },
      { label: "联系人身份", value: "采购总监" },
      { label: "营业执照", value: (
        <button className="flex items-center gap-1 text-[#2563EB] text-sm font-medium">
          <Ic d={P.clip} size={13} />
          营业执照_扫描件.pdf
        </button>
      ) },
    ];
    return [];
  })();

  return (
    <div className="h-full flex flex-col bg-[#F5F7FA] relative">
      {/* NavBar */}
      <div className={`flex-shrink-0 ${isPending ? "bg-[#FFF7ED]" : "bg-white"} shadow-[0_1px_0_0_#F1F5F9]`}>
        <NavBar title={isPending ? "审批操作" : "审批详情"} onBack={onBack} />
      </div>

      <div className="flex-1 overflow-y-auto pb-28">

        {/* Pending banner */}
        {isPending && (
          <div className="bg-[#FFF7ED] border-b border-[#FDE68A] px-4 py-3 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#FBBF24] flex items-center justify-center flex-shrink-0">
              <Ic d={P.clock} size={16} className="text-white" />
            </div>
            <div>
              <div className="text-sm font-bold text-[#D97706]">待处理 — 需要您审批</div>
              <div className="text-xs text-[#92400E]">请查阅申请详情后填写审批意见并处理</div>
            </div>
          </div>
        )}

        {/* Basic info card */}
        <div className="mx-4 mt-3 mb-3 bg-white rounded-[12px] px-4 py-4 shadow-[0_1px_4px_0_rgba(15,23,42,0.06)]">
          <div className="space-y-2.5">
            {[
              { label: "申请单号", value: <span className="font-mono text-xs">{eff.id}</span> },
              { label: "申请类型", value: eff.type },
              { label: "申请人",   value: eff.applicant },
              { label: "申请时间", value: eff.time },
              { label: "关联客户", value: eff.customer },
              ...(eff.location !== "—" ? [{ label: "点位/位置", value: eff.location }] : []),
              ...(eff.note ? [{ label: "申请说明", value: eff.note }] : []),
              ...(eff.reviewer ? [{ label: "审核人", value: eff.reviewer }] : []),
              ...((eff.status === "审核通过" && eff.approvedTime) ? [{ label: "审核时间", value: eff.approvedTime }] : []),
              ...((eff.status === "审核驳回" && eff.rejectedTime) ? [{ label: "审核时间", value: eff.rejectedTime }] : []),
            ].map(row => (
              <div key={row.label} className="flex items-start justify-between text-sm gap-4">
                <span className="text-[#94A3B8] flex-shrink-0 w-16">{row.label}</span>
                <span className="text-[#0F172A] font-medium text-right flex-1">{row.value}</span>
              </div>
            ))}
            <div className="flex items-center justify-between text-sm pt-0.5 border-t border-[#F1F5F9] mt-0.5">
              <span className="text-[#94A3B8] w-16 flex-shrink-0">当前状态</span>
              <ApprStatusTag status={eff.status} />
            </div>
          </div>
        </div>

        {/* 具体详情（独立 card，默认收起） */}
        {detailFields.length > 0 && (
          <div className="mx-4 mb-3 bg-white rounded-[12px] px-4 py-4 shadow-[0_1px_4px_0_rgba(15,23,42,0.06)]">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-[#0F172A] flex items-center gap-2">
                <span className="w-1 h-4 bg-[#2563EB] rounded-full inline-block" />
                具体详情
              </span>
              <button
                onClick={() => setDetailOpen(v => !v)}
                className="flex items-center gap-1 text-xs text-[#2563EB] font-medium"
              >
                {detailOpen ? "收起" : "展开"}
                <Ic d={P.chevD} size={12} className={`transition-transform ${detailOpen ? "rotate-180" : ""}`} />
              </button>
            </div>
            {detailOpen && eff.type !== "点位新增" && (
              <div className="mt-3 pt-3 border-t border-[#F1F5F9] space-y-2.5">
                {detailFields.map(row => (
                  <div key={row.label} className="flex items-start justify-between text-sm gap-4">
                    <span className="text-[#94A3B8] flex-shrink-0 w-28">{row.label}</span>
                    <span className="text-[#0F172A] font-medium text-right flex-1">{row.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 点位新增：展开后嵌入完整点位详情（含全部 tab）作为示例 */}
        {detailOpen && eff.type === "点位新增" && (
          <div className="mx-4 mb-3">
            <LocationDetail embedded />
          </div>
        )}

        {/* Approved result card */}
        {eff.status === "审核通过" && (
          <div className="mx-4 mb-3 bg-[#F0FDF4] border border-[#86EFAC] rounded-[12px] px-4 py-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-full bg-[#16A34A] flex items-center justify-center flex-shrink-0">
                <Ic d={P.checkC} size={15} className="text-white" />
              </div>
              <span className="text-sm font-bold text-[#16A34A] flex-1">审核通过</span>
              <span className="text-xs text-[#94A3B8]">{eff.approvedTime}</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-3">
                <span className="text-[#86EFAC] flex-shrink-0 w-16 text-xs pt-0.5">审核人</span>
                <span className="text-[#166534] font-medium">{eff.reviewer}</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#86EFAC] flex-shrink-0 w-16 text-xs pt-0.5">审批意见</span>
                <span className="text-[#166534] leading-relaxed flex-1">{eff.approvalNote}</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#86EFAC] flex-shrink-0 w-16 text-xs pt-0.5">后续流程</span>
                <span className="text-[#166534] leading-relaxed flex-1">审批已通过，相关业务流程将自动推进，请关注后续进展。</span>
              </div>
            </div>
          </div>
        )}

        {/* Rejected result card */}
        {eff.status === "审核驳回" && (
          <div className="mx-4 mb-3 bg-[#FEF2F2] border border-[#FCA5A5] rounded-[12px] px-4 py-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-full bg-[#DC2626] flex items-center justify-center flex-shrink-0">
                <Ic d={P.xC} size={15} className="text-white" />
              </div>
              <span className="text-sm font-bold text-[#DC2626] flex-1">审核驳回</span>
              <span className="text-xs text-[#94A3B8]">{eff.rejectedTime}</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-3">
                <span className="text-[#FCA5A5] flex-shrink-0 w-16 text-xs pt-0.5">审核人</span>
                <span className="text-[#991B1B] font-medium">{eff.reviewer}</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#FCA5A5] flex-shrink-0 w-16 text-xs pt-0.5">驳回原因</span>
                <span className="text-[#991B1B] leading-relaxed flex-1">{eff.rejectReason}</span>
              </div>
              <div className="mt-2 px-3 py-2 bg-white rounded-[8px] border border-[#FECACA] text-xs text-[#DC2626]">
                请修改相关信息后重新提交申请。
              </div>
            </div>
          </div>
        )}

        {/* Approval opinion textarea (pending only) */}
        {isPending && (
          <div className="mx-4 mb-3 bg-white rounded-[12px] px-4 py-4 shadow-[0_1px_4px_0_rgba(15,23,42,0.06)]">
            <div className="text-sm font-semibold text-[#0F172A] mb-3 flex items-center gap-2">
              <span className="w-1 h-4 bg-[#2563EB] rounded-full inline-block" />
              审批意见
              <span className="text-xs text-[#DC2626] font-normal ml-1">驳回时必填，最长 500 字符</span>
            </div>
            <textarea
              value={opinion}
              onChange={e => setOpinion(e.target.value.slice(0, 500))}
              placeholder="请输入审批意见…"
              rows={4}
              className="w-full text-[14px] text-[#0F172A] placeholder-[#CBD5E1] outline-none resize-none border border-[#E2E8F0] rounded-[10px] p-3 focus:border-[#2563EB] focus:ring-2 focus:ring-[#DBEAFE] transition-all"
            />
            <div className="text-right text-xs text-[#CBD5E1] mt-1">{opinion.length} / 500</div>
          </div>
        )}

        {/* Approval result buttons (pending only) */}
        {isPending && (
          <div className="mx-4 mb-3">
            <div className="text-xs text-[#94A3B8] mb-2 px-1">审批结果</div>
            <div className="flex gap-3">
              <button onClick={() => setShowConfirm("reject")}
                className="flex-1 h-12 rounded-[10px] border-2 border-[#DC2626] text-[#DC2626] text-[15px] font-semibold flex items-center justify-center gap-2 active:bg-[#FEF2F2] transition-colors">
                <Ic d={P.xC} size={16} />审核驳回
              </button>
              <button onClick={() => setShowConfirm("approve")}
                className="flex-1 h-12 rounded-[10px] bg-[#2563EB] text-white text-[15px] font-semibold flex items-center justify-center gap-2 active:bg-[#1D4ED8] shadow-[0_2px_8px_0_rgba(37,99,235,0.35)] transition-colors">
                <Ic d={P.checkC} size={16} />审核通过
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom bar for non-pending */}
      {!isPending && (
        <div className="bg-white border-t border-[#F1F5F9] px-4 py-3 flex gap-3 flex-shrink-0">
          <MBtn variant="ghost" onClick={onBack}>返回</MBtn>
          {eff.status === "审核驳回" && (
            <MBtn variant="primary" onClick={onResubmit}>修改重提</MBtn>
          )}
        </div>
      )}

      {/* Confirm bottom sheet */}
      {showConfirm && (
        <div className="absolute inset-0 bg-black/40 flex items-end z-50" onClick={() => setShowConfirm(null)}>
          <div className="bg-white w-full rounded-t-[20px] px-6 pt-5 pb-10" onClick={e => e.stopPropagation()}>
            <div className="w-10 h-1 bg-[#E2E8F0] rounded-full mx-auto mb-5" />
            <div className={`text-[17px] font-bold mb-2 ${showConfirm === "approve" ? "text-[#16A34A]" : "text-[#DC2626]"}`}>
              {showConfirm === "approve" ? "确认审核通过？" : "确认审核驳回？"}
            </div>
            <p className="text-sm text-[#64748B] mb-5 leading-relaxed">
              {showConfirm === "approve"
                ? "审批通过后申请人将收到通知，相关流程将进入下一环节。"
                : "驳回后申请人需重新修改并提交，请确保已填写驳回原因。"}
            </p>
            {showConfirm === "reject" && !opinion && (
              <div className="mb-4 p-3 bg-[#FEF2F2] rounded-[8px] text-xs text-[#DC2626] border border-[#FECACA]">
                ⚠ 驳回前请先填写审批意见
              </div>
            )}
            <div className="flex gap-3">
              <MBtn variant="ghost" onClick={() => setShowConfirm(null)}>取消</MBtn>
              <MBtn
                variant={showConfirm === "approve" ? "primary" : "danger"}
                disabled={showConfirm === "reject" && !opinion}
                onClick={() => { setShowConfirm(null); onBack(); }}>
                确认{showConfirm === "approve" ? "通过" : "驳回"}
              </MBtn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


// ══════════════════════════════════════════════════════════════════════════════
// SCREEN 10 – ORDER STATS
// ══════════════════════════════════════════════════════════════════════════════
const OrderStats = ({
  tab,
  onTabChange,
}: {
  tab: string
  onTabChange: (t: string) => void
}) => {
  const [period, setPeriod] = useState<"week" | "month" | "quarter">("week")
  const stats = ORDER_STATS[period]
  const maxV = Math.max(...CHART_DATA.map((d) => d.v))

  return (
    <div className="h-full flex flex-col">
      <div className="bg-white flex-shrink-0">
        <NavBar
          title="订单统计"
          rightEl={
            <button className="w-9 h-9 flex items-center justify-center">
              <Ic d={P.filter} size={16} className="text-[#64748B]" />
            </button>
          }
        />
        {/* Period filter */}
        <div className="flex items-center px-4 pb-3 gap-1">
          {([
            ["week", "本周"],
            ["month", "本月"],
            ["quarter", "本季度"],
          ] as const).map(([k, l]) => (
            <button
              key={k}
              onClick={() => setPeriod(k)}
              className={`flex-1 h-9 rounded-xl text-sm font-medium transition-all
                ${
                  period === k
                    ? "bg-[#2563EB] text-white shadow-sm"
                    : "bg-[#F0F2F5] text-[#64748B]"
                }`}
            >
              {l}
            </button>
          ))}
        </div>
        <div className="px-4 pb-3 text-xs text-[#94A3B8] flex justify-between">
          <span>
            {period === "week"
              ? "2025/09/04 — 2025/09/10"
              : period === "month"
                ? "2025/09/01 — 2025/09/30"
                : "2025/07/01 — 2025/09/30"}
          </span>
          <span className="text-[#2563EB] flex items-center gap-1">
            <Ic d={P.cal} size={11} />
            自定义
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-[#F0F2F5] pb-20">
        {/* KPI cards */}
        <div className="grid grid-cols-2 gap-3 px-4 pt-3 pb-1">
          {[
            {
              label: "销售金额",
              value: stats.total,
              icon: P.trending,
              color: "#2563EB",
              bg: "#EFF6FF",
              sub: "+12.3% vs 上期",
            },
            {
              label: "订单数量",
              value: `${stats.orders}单`,
              icon: P.clip,
              color: "#16A34A",
              bg: "#F0FDF4",
              sub: `日均${Math.round(stats.orders / (period === "week" ? 7 : period === "month" ? 30 : 90))}单`,
            },
            {
              label: "新增客户",
              value: `${stats.customers}家`,
              icon: P.users,
              color: "#7C3AED",
              bg: "#F5F3FF",
              sub: "本期新签",
            },
            {
              label: "补货次数",
              value: `${stats.restocks}次`,
              icon: P.refresh,
              color: "#D97706",
              bg: "#FFFBEB",
              sub: `日均${Math.round(stats.restocks / (period === "week" ? 7 : period === "month" ? 30 : 90))}次`,
            },
          ].map((k) => (
            <div
              key={k.label}
              className="bg-white rounded-2xl p-4 shadow-[0_1px_4px_0_rgba(15,23,42,0.06)]"
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: k.bg }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={k.color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={k.icon} />
                  </svg>
                </div>
                <span className="text-xs text-[#94A3B8]">{k.label}</span>
              </div>
              <div className="text-xl font-bold text-[#0F172A] mb-0.5">
                {k.value}
              </div>
              <div className="text-[10px] text-[#94A3B8]">{k.sub}</div>
            </div>
          ))}
        </div>

        {/* Trend chart */}
        <div className="mx-4 mb-3 bg-white rounded-2xl p-4 shadow-[0_1px_4px_0_rgba(15,23,42,0.06)]">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-semibold text-[#0F172A]">
              近7日销售趋势
            </div>
            <div className="text-xs text-[#94A3B8] bg-[#F8FAFC] px-2 py-1 rounded-lg">
              单位：元
            </div>
          </div>
          {/* Y-axis labels */}
          <div className="flex gap-1.5">
            <div className="flex flex-col justify-between text-[9px] text-[#CBD5E1] text-right pr-1 pb-5 w-10 flex-shrink-0">
              {["6.5w", "5.0w", "3.5w", "2.0w", "0"].map((l) => (
                <span key={l}>{l}</span>
              ))}
            </div>
            <div className="flex-1">
              {/* Grid lines + bars */}
              <div className="relative h-28">
                {[0, 25, 50, 75, 100].map((p) => (
                  <div
                    key={p}
                    className="absolute left-0 right-0 border-t border-[#F1F5F9]"
                    style={{ top: `${p}%` }}
                  />
                ))}
                <div className="flex items-end gap-1.5 h-full pt-1">
                  {CHART_DATA.map((d) => {
                    const h = Math.max((d.v / maxV) * 100, 4)
                    const isMax = d.v === maxV
                    return (
                      <div
                        key={d.label}
                        className="flex-1 flex flex-col items-center justify-end gap-0.5 h-full"
                      >
                        {isMax && (
                          <span className="text-[9px] text-[#2563EB] font-semibold">
                            最高
                          </span>
                        )}
                        <div
                          className="w-full rounded-t-lg transition-all relative"
                          style={{
                            height: `${h}%`,
                            background: isMax ? "#2563EB" : "#BFDBFE",
                          }}
                        ></div>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="flex gap-1.5 mt-1.5">
                {CHART_DATA.map((d) => (
                  <div
                    key={d.label}
                    className="flex-1 text-center text-[9px] text-[#94A3B8]"
                  >
                    {d.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SKU Ranking */}
        <div className="mx-4 mb-3 bg-white rounded-2xl p-4 shadow-[0_1px_4px_0_rgba(15,23,42,0.06)]">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-semibold text-[#0F172A]">
              商品销量排行 TOP 5
            </div>
            <span className="text-xs text-[#2563EB]">按件数</span>
          </div>
          <div className="space-y-3.5">
            {SKU_RANK.map((sku, i) => (
              <div key={sku.name}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0
                      ${
                        i === 0
                          ? "bg-[#FEF3C7] text-[#D97706]"
                          : i === 1
                            ? "bg-[#F1F5F9] text-[#64748B]"
                            : i === 2
                              ? "bg-[#FFF7ED] text-[#EA580C]"
                              : "bg-[#F8FAFC] text-[#94A3B8]"
                      }`}
                    >
                      {i + 1}
                    </div>
                    <span className="text-sm text-[#0F172A]">{sku.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-semibold text-[#0F172A]">
                      {sku.qty}
                    </div>
                    <div className="text-[10px] text-[#94A3B8]">{sku.amt}</div>
                  </div>
                </div>
                <div className="h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${sku.pct}%`,
                      background: i === 0 ? "#2563EB" : "#BFDBFE",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Personal quota */}
        <div className="mx-4 mb-3 bg-white rounded-2xl p-4 shadow-[0_1px_4px_0_rgba(15,23,42,0.06)]">
          <div className="text-sm font-semibold text-[#0F172A] mb-3">
            我的本月目标完成度
          </div>
          <div className="flex items-end justify-between mb-2">
            <div>
              <div className="text-2xl font-bold text-[#2563EB]">78.2%</div>
              <div className="text-xs text-[#94A3B8]">
                ¥936,000 / ¥1,200,000
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-[#0F172A]">
                ¥264,000
              </div>
              <div className="text-xs text-[#94A3B8]">距目标还差</div>
            </div>
          </div>
          <div className="h-2.5 bg-[#F1F5F9] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#2563EB] rounded-full"
              style={{ width: "78.2%" }}
            />
          </div>
        </div>
      </div>

      <TabBar active={tab} onChange={onTabChange} />
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// MY PAGE
// ══════════════════════════════════════════════════════════════════════════════
const MinePage = ({
  tab,
  onTabChange,
}: {
  tab: string
  onTabChange: (t: string) => void
}) => (
  <div className="h-full flex flex-col">
    <div className="bg-white flex-shrink-0">
      <NavBar title="我的" />
    </div>
    <div className="flex-1 overflow-y-auto bg-[#F0F2F5] pb-20">
      {/* Profile */}
      <div className="bg-white mx-4 mt-3 rounded-2xl p-4 flex items-center gap-4 shadow-[0_1px_4px_0_rgba(15,23,42,0.06)]">
        <div className="w-14 h-14 rounded-full bg-[#EFF6FF] flex items-center justify-center flex-shrink-0">
          <span className="text-2xl font-bold text-[#2563EB]">李</span>
        </div>
        <div>
          <div className="text-lg font-bold text-[#0F172A]">李明</div>
          <div className="text-sm text-[#94A3B8]">华南区 · 高级销售经理</div>
          <div className="flex items-center gap-1 mt-1 text-xs text-[#94A3B8]">
            <Ic d={P.phone} size={11} />
            138-8888-2024
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 px-4 mt-3">
        {[
          { label: "负责客户", monthAdd: 3, total: 12 },
          { label: "管理点位", monthAdd: 5, total: 34 },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl px-4 py-4 shadow-[0_1px_4px_0_rgba(15,23,42,0.06)]">
            <div className="text-xs text-[#94A3B8] mb-2">{s.label}</div>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-[22px] font-bold text-[#0F172A] leading-none">{s.total}</div>
                <div className="text-[10px] text-[#94A3B8] mt-1">总计</div>
              </div>
              <div className="text-right">
                <div className="text-[18px] font-bold text-[#2563EB] leading-none">+{s.monthAdd}</div>
                <div className="text-[10px] text-[#94A3B8] mt-1">当月新增</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <MSec title="功能设置" />
      <MC className="!px-0">
        {[
          { icon: "info", label: "关于应用", sub: "v1.0.0" },
        ].map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-4 py-4 border-b border-[#F1F5F9] last:border-0"
          >
            <div className="w-8 h-8 rounded-xl bg-[#EFF6FF] flex items-center justify-center flex-shrink-0">
              <Ic d={P[item.icon]} size={16} className="text-[#2563EB]" />
            </div>
            <span className="flex-1 text-[15px] text-[#0F172A]">
              {item.label}
            </span>
            {item.sub && (
              <span className="text-sm text-[#94A3B8]">{item.sub}</span>
            )}
            <Ic d={P.chevR} size={14} className="text-[#CBD5E1]" />
          </div>
        ))}
      </MC>

      <div className="px-4 mt-2">
        <button className="w-full h-12 bg-white rounded-2xl text-[15px] font-semibold text-[#DC2626] flex items-center justify-center gap-2 shadow-[0_1px_4px_0_rgba(15,23,42,0.06)]">
          <Ic d={P.logOut} size={16} />
          退出登录
        </button>
      </div>
    </div>
    <TabBar active={tab} onChange={onTabChange} />
  </div>
)

// ══════════════════════════════════════════════════════════════════════════════
// CRM APP (orchestrator)
// ══════════════════════════════════════════════════════════════════════════════
type CrmPage = "login" | "location-list" | "location-detail" | "location-new" | "location-success" | "customer-list" | "customer-detail" | "customer-new" | "customer-success" | "approval-center" | "approval-detail-pending" | "approval-detail-approved" | "approval-detail-rejected" | "order-stats" | "mine"

interface PageConfig {
  label: string
  page: CrmPage
  section: string
}

const PAGE_NAV: PageConfig[] = [
  { section: "认证", label: "登录页", page: "login" },
  { section: "点位", label: "点位列表", page: "location-list" },
  { section: "点位", label: "点位详情", page: "location-detail" },
  { section: "点位", label: "新增点位（带安装）", page: "location-new" },
  { section: "点位", label: "提交成功反馈", page: "location-success" },
  { section: "客户", label: "客户列表", page: "customer-list" },
  { section: "客户", label: "客户详情", page: "customer-detail" },
  { section: "客户", label: "新增客户", page: "customer-new" },
  { section: "审批", label: "审批中心", page: "approval-center" },
  {
    section: "审批",
    label: "审批操作（待审）",
    page: "approval-detail-pending",
  },
  {
    section: "审批",
    label: "审批结果（已通过）",
    page: "approval-detail-approved",
  },
  {
    section: "审批",
    label: "驳回状态（已驳回）",
    page: "approval-detail-rejected",
  },
  { section: "统计", label: "订单统计", page: "order-stats" },
  { section: "我的", label: "我的", page: "mine" },
]

export const CrmApp = () => {
  const [page, setPage] = useState<CrmPage>("login")
  const [tab, setTab] = useState("location")
  const [approvalFilter, setApprovalFilter] = useState("submitted")
  const [selectedApprovalId, setSelectedApprovalId] = useState(NEW_APPROVALS[0].id)

  const tabToPage: Record<string, CrmPage> = {
    location: "location-list",
    customer: "customer-list",
    approval: "approval-center",
    stats: "order-stats",
    mine: "mine",
  }

  const navigate = (p: CrmPage) => setPage(p)
  const handleTabChange = (t: string) => {
    setTab(t)
    setPage(tabToPage[t] ?? "location-list")
  }

  const handleApprovalDetail = (id: string) => {
    setSelectedApprovalId(id)
    const a = NEW_APPROVALS.find((x) => x.id === id)
    if (a?.status === "审核通过") navigate("approval-detail-approved")
    else if (a?.status === "审核驳回") navigate("approval-detail-rejected")
    else navigate("approval-detail-pending")
  }

  const showTabBar = ![
    "login",
    "location-detail",
    "location-new",
    "location-success",
    "customer-detail",
    "customer-new",
    "customer-success",
    "approval-detail-pending",
    "approval-detail-approved",
    "approval-detail-rejected",
  ].includes(page)

  const renderPage = () => {
    switch (page) {
      case "login":
        return (
          <LoginScreen
            onLogin={() => {
              setTab("location")
              navigate("location-list")
            }}
          />
        )
      case "location-list":
        return (
          <LocationList
            tab={tab}
            onTabChange={handleTabChange}
            onDetail={() => navigate("location-detail")}
            onNew={() => navigate("location-new")}
          />
        )
      case "location-detail":
        return (
          <LocationDetail
            onBack={() => navigate("location-list")}
            onApproval={() => navigate("approval-center")}
            onResubmit={() => navigate("location-new")}
          />
        )
      case "location-new":
        return (
          <NewLocation
            onBack={() => navigate("location-list")}
            onSuccess={() => navigate("location-success")}
          />
        )
      case "location-success":
        return (
          <SuccessScreen
            title="提交成功"
            desc="审批申请已提交，张主管将在1个工作日内处理。您可在「审批中心」查看进度。"
            onDone={() => navigate("location-list")}
            onView={() => {
              setTab("approval")
              setApprovalFilter("submitted")
              navigate("approval-center")
            }}
          />
        )
      case "customer-list":
        return (
          <CustomerList
            tab={tab}
            onTabChange={handleTabChange}
            onDetail={() => navigate("customer-detail")}
            onNew={() => navigate("customer-new")}
          />
        )
      case "customer-detail":
        return <CustomerDetail onBack={() => navigate("customer-list")} onResubmit={() => navigate("customer-new")} />
      case "customer-new":
        return (
          <NewCustomer
            onBack={() => navigate("customer-list")}
            onSuccess={() => navigate("customer-success")}
          />
        )
      case "customer-success":
        return (
          <SuccessScreen
            title="客户已保存"
            desc="客户信息录入成功，您可立即为该客户新增点位或发起合作申请。"
            onDone={() => navigate("customer-list")}
            onView={() => navigate("location-new")}
          />
        )
      case "approval-center":
        return (
          <ApprovalCenter
            tab={tab}
            onTabChange={handleTabChange}
            onDetail={handleApprovalDetail}
            approvalFilter={approvalFilter}
            setApprovalFilter={setApprovalFilter}
          />
        )
      case "approval-detail-pending":
        return (
          <ApprovalDetail
            onBack={() => navigate("approval-center")}
            approvalId={selectedApprovalId}
            mode="pending"
          />
        )
      case "approval-detail-approved":
        return (
          <ApprovalDetail
            onBack={() => navigate("approval-center")}
            approvalId={selectedApprovalId}
            mode="approved"
          />
        )
      case "approval-detail-rejected": {
        const rejItem = NEW_APPROVALS.find(x => x.id === selectedApprovalId)
        const resubmitPage = rejItem?.type === "客户新增" ? "customer-new" : "location-new"
        return (
          <ApprovalDetail
            onBack={() => navigate("approval-center")}
            approvalId={selectedApprovalId}
            mode="rejected"
            onResubmit={() => navigate(resubmitPage)}
          />
        )
      }
      case "order-stats":
        return <OrderStats tab={tab} onTabChange={handleTabChange} />
      case "mine":
        return <MinePage tab={tab} onTabChange={handleTabChange} />
      default:
        return null
    }
  }

  const sections = [...new Set(PAGE_NAV.map((p) => p.section))]

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
          <div
            className="bg-white relative overflow-hidden"
            style={{ height: "720px" }}
          >
            {/* Status bar */}
            <StatusBar dark={page === "login" ? false : false} />
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
                {PAGE_NAV.filter((p) => p.section === sec).map((p) => (
                  <button
                    key={p.page}
                    onClick={() => setPage(p.page)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all
                      ${
                        page === p.page
                          ? "bg-[#EFF6FF] text-[#2563EB] font-semibold"
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
            点击右侧导航可直接预览任意页面，或在手机内正常操作流转。
          </div>
        </div>
      </div>
    </div>
  )
}
