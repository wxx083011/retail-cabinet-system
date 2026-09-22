import { useState, ReactNode } from "react";
// v3 – ExceptionOrderList + ExceptionOrderHandle

// ─── Icon primitive ────────────────────────────────────────────────────────
const Ic = ({ d, size = 16, className = "" }: { d: string; size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d={d} />
  </svg>
);
const P = {
  search:    "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0",
  plus:      "M12 5v14M5 12h14",
  download:  "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4 M7 10l5 5 5-5 M12 15V3",
  upload:    "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4 M17 8l-5-5-5 5 M12 3v12",
  edit:      "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7 M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",
  trash:     "M3 6h18 M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6 M10 6V4h4v2",
  chevD:     "M6 9l6 6 6-6",
  chevR:     "M9 18l6-6-6-6",
  chevL:     "M15 18l-6-6 6-6",
  x:         "M18 6L6 18M6 6l12 12",
  check:     "M20 6L9 17l-5-5",
  alertTri:  "M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z M12 9v4 M12 17h.01",
  info:      "M12 22a10 10 0 100-20 10 10 0 000 20z M12 8v4 M12 16h.01",
  copy:      "M20 9h-9a2 2 0 00-2 2v9a2 2 0 002 2h9a2 2 0 002-2v-9a2 2 0 00-2-2z M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1",
  tag:       "M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z M7 7h.01",
  bar:       "M18 20V10M12 20V4M6 20v-6",
  pkg:       "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
  layers:    "M12 2L2 7l10 5 10-5-10-5z M2 17l10 5 10-5 M2 12l10 5 10-5",
  truck:     "M1 3h15v13H1z M16 8h4l3 3v5h-7V8z M5.5 21a2.5 2.5 0 100-5 2.5 2.5 0 000 5z M18.5 21a2.5 2.5 0 100-5 2.5 2.5 0 000 5z",
  archive:   "M21 8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z M12 22V12 M3.27 6.96L12 12.01l8.73-5.05",
  price:     "M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6",
  supplier:  "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10",
  inbox:     "M22 12h-6l-2 3h-4l-2-3H2 M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z",
  print:     "M6 9V2h12v7 M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2 M6 14h12v8H6z",
  shield:    "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  phone:     "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 01.4 2.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z",
  mail:      "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6",
  cal:       "M19 4H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z M16 2v4M8 2v4M3 10h18",
  cog:       "M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 19a1.65 1.65 0 00-1.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z",
  link:      "M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71 M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71",
  wifiOff:   "M1 1l22 22 M16.72 11.06A10.94 10.94 0 0119 12.55 M5 12.55a10.94 10.94 0 015.17-2.39 M10.71 5.05A16 16 0 0122.56 9 M1.42 9a15.91 15.91 0 014.7-2.88 M8.53 16.11a6 6 0 016.95 0 M12 20h.01",
  refresh:   "M23 4v6h-6 M1 20v-6h6 M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15",
  warning2:  "M12 9v4 M12 17h.01 M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z",
  eye:       "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 12a3 3 0 100-6 3 3 0 000 6",
  percent:   "M19 5L5 19 M6.5 6a.5.5 0 100-1 .5.5 0 000 1z M17.5 19a.5.5 0 100-1 .5.5 0 000 1z",
  sliders:   "M4 21v-7 M4 10V3 M12 21v-9 M12 8V3 M20 21v-5 M20 12V3 M1 14h6 M9 8h6 M17 16h6",
  arrowUp:   "M12 19V5M5 12l7-7 7 7",
  arrowDown: "M12 5v14M19 12l-7 7-7-7",
  fileText:  "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
};

// ══════════════════════════════════════════════════════════════════════════════
// DESIGN TOKENS / PRIMITIVES
// ══════════════════════════════════════════════════════════════════════════════

const BADGE_STYLES: Record<string, string> = {
  blue:   "bg-[#EFF6FF] text-[#2563EB] border-[#BFDBFE]",
  green:  "bg-[#F0FDF4] text-[#16A34A] border-[#BBF7D0]",
  yellow: "bg-[#FFFBEB] text-[#D97706] border-[#FDE68A]",
  red:    "bg-[#FEF2F2] text-[#DC2626] border-[#FECACA]",
  gray:   "bg-[#F8FAFC] text-[#64748B] border-[#E2E8F0]",
  purple: "bg-[#F5F3FF] text-[#7C3AED] border-[#DDD6FE]",
  cyan:   "bg-[#ECFEFF] text-[#0891B2] border-[#A5F3FC]",
  orange: "bg-[#FFF7ED] text-[#EA580C] border-[#FED7AA]",
};

type BC = "blue"|"green"|"yellow"|"red"|"gray"|"purple"|"cyan"|"orange";
type BV = "primary"|"secondary"|"ghost"|"danger";
type SZ = "sm"|"md"|"lg";

const Badge = ({ label, color, dot }: { label: string; color: BC; dot?: boolean }) => (
  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${BADGE_STYLES[color]}`}>
    {dot && <span className={`w-1.5 h-1.5 rounded-full bg-current opacity-70`} />}
    {label}
  </span>
);

const Btn = ({ children, variant="primary", size="md", icon, onClick, disabled=false, className="", full=false }: {
  children?: ReactNode; variant?: BV; size?: SZ; icon?: string;
  onClick?: () => void; disabled?: boolean; className?: string; full?: boolean;
}) => {
  const base = "inline-flex items-center gap-1.5 font-medium transition-all duration-150 cursor-pointer select-none border rounded-md";
  const sz:Record<SZ,string> = { sm:"px-3 py-1.5 text-xs", md:"px-4 py-2 text-sm", lg:"px-5 py-2.5 text-sm rounded-lg" };
  const v:Record<BV,string> = {
    primary: "bg-[#2563EB] text-white border-[#2563EB] hover:bg-[#1D4ED8] hover:border-[#1D4ED8] shadow-sm",
    secondary:"bg-white text-[#334155] border-[#E2E8F0] hover:bg-[#F8FAFC] hover:border-[#CBD5E1]",
    ghost:   "bg-transparent text-[#64748B] border-transparent hover:bg-[#F1F5F9] hover:text-[#334155]",
    danger:  "bg-[#DC2626] text-white border-[#DC2626] hover:bg-[#B91C1C]",
  };
  return (
    <button onClick={onClick} disabled={disabled}
      className={`${base} ${sz[size]} ${v[variant]} ${disabled?"opacity-40 pointer-events-none":""} ${full?"w-full justify-center":""} ${className}`}>
      {icon && <Ic d={P[icon as keyof typeof P]} size={14} />}
      {children}
    </button>
  );
};

const Inp = ({ placeholder, value, onChange, icon, type="text", className="", disabled=false, error="" }: {
  placeholder?: string; value?: string; onChange?: (v:string)=>void;
  icon?: string; type?: string; className?: string; disabled?: boolean; error?: string;
}) => (
  <div className={className}>
    <div className="relative">
      {icon && <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none"><Ic d={P[icon as keyof typeof P]} size={14} /></span>}
      <input type={type} value={value} onChange={e=>onChange?.(e.target.value)} placeholder={placeholder} disabled={disabled}
        className={`w-full h-9 border rounded-md text-sm placeholder-[#94A3B8] bg-white focus:outline-none focus:ring-2 transition-all
          ${icon?"pl-8 pr-3":"px-3"}
          ${error?"border-[#DC2626] focus:border-[#DC2626] focus:ring-[#FEE2E2]":"border-[#E2E8F0] focus:border-[#2563EB] focus:ring-[#DBEAFE]"}
          ${disabled?"bg-[#F8FAFC] text-[#94A3B8] cursor-not-allowed":"text-[#0F172A]"}`}
      />
    </div>
    {error && <p className="text-xs text-[#DC2626] mt-1 flex items-center gap-1"><Ic d={P.alertTri} size={11} />{error}</p>}
  </div>
);

const Sel = ({ options, className="", disabled=false, value, onChange }: {
  options:{label:string;value:string}[]; className?: string; disabled?: boolean;
  value?: string; onChange?: (v:string)=>void;
}) => (
  <div className={`relative ${className}`}>
    <select value={value} onChange={e=>onChange?.(e.target.value)} disabled={disabled}
      className={`w-full h-9 border border-[#E2E8F0] rounded-md text-sm text-[#334155] bg-white px-3 pr-8 appearance-none
        focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#DBEAFE] cursor-pointer
        ${disabled?"bg-[#F8FAFC] text-[#94A3B8] cursor-not-allowed":""}`}>
      {options.map(o=><option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
    <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none"><Ic d={P.chevD} size={14} /></span>
  </div>
);

const TA = ({ placeholder, rows=3, className="" }: { placeholder?: string; rows?: number; className?: string }) => (
  <textarea placeholder={placeholder} rows={rows}
    className={`w-full border border-[#E2E8F0] rounded-md text-sm px-3 py-2 text-[#334155] placeholder-[#94A3B8] resize-none
      focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#DBEAFE] ${className}`} />
);

const Card = ({ children, className="", noPad=false }: { children:ReactNode; className?: string; noPad?: boolean }) => (
  <div className={`bg-white border border-[#E2E8F0] rounded-lg shadow-sm ${noPad?"":"p-5"} ${className}`}>{children}</div>
);

// Section card with icon header
const SC = ({ title, subtitle, icon, iconColor="#2563EB", children, action }: {
  title:string; subtitle?:string; icon?:string; iconColor?:string; children:ReactNode; action?:ReactNode;
}) => (
  <Card className="mb-4">
    <div className="flex items-start justify-between pb-4 mb-5 border-b border-[#F1F5F9]">
      <div className="flex items-center gap-3">
        {icon && (
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{background:iconColor+"18",color:iconColor}}>
            <Ic d={P[icon as keyof typeof P]} size={15} />
          </div>
        )}
        <div>
          <h3 className="text-sm font-semibold text-[#0F172A]">{title}</h3>
          {subtitle && <p className="text-xs text-[#94A3B8] mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {action}
    </div>
    {children}
  </Card>
);

// Stat card
const Stat = ({ label, value, sub, color="#2563EB", icon, trend }: {
  label:string; value:string|number; sub?:string; color?:string; icon?:string; trend?: "up"|"down"|"none";
}) => (
  <Card className="flex items-start gap-3">
    {icon && (
      <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{background:color+"18",color}}>
        <Ic d={P[icon as keyof typeof P]} size={17} />
      </div>
    )}
    <div>
      <div className="text-xs text-[#64748B] mb-0.5">{label}</div>
      <div className="text-2xl font-bold text-[#0F172A] leading-tight">{value}</div>
      {sub && (
        <div className={`text-xs mt-0.5 flex items-center gap-0.5 ${trend==="up"?"text-[#16A34A]":trend==="down"?"text-[#DC2626]":"text-[#94A3B8]"}`}>
          {trend==="up" && <Ic d={P.arrowUp} size={10} />}
          {trend==="down" && <Ic d={P.arrowDown} size={10} />}
          {sub}
        </div>
      )}
    </div>
  </Card>
);

// Filter bar + field
const FB = ({ children }: { children:ReactNode }) => (
  <Card className="mb-4"><div className="flex flex-wrap gap-3 items-end">{children}</div></Card>
);
const FL = ({ label, children, width }: { label:string; children:ReactNode; width?:string }) => (
  <div className="flex flex-col gap-1" style={{minWidth:width||"130px"}}>
    <label className="text-xs font-medium text-[#64748B]">{label}</label>
    {children}
  </div>
);

// Page header
const PH = ({ title, crumbs, actions }: { title:string; crumbs?:string[]; actions?:ReactNode }) => (
  <div className="mb-5">
    {crumbs && (
      <div className="flex items-center gap-1 text-xs text-[#94A3B8] mb-1.5">
        {crumbs.map((b,i)=>(
          <span key={i} className="flex items-center gap-1">
            {i>0&&<Ic d={P.chevR} size={11} />}
            <span className={i===crumbs.length-1?"text-[#64748B]":"hover:text-[#2563EB] cursor-pointer"}>{b}</span>
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

// Info grid
const IG = ({ items, cols=3 }: { items:{label:string;value:ReactNode}[]; cols?:number }) => (
  <div className="grid gap-x-8 gap-y-4" style={{gridTemplateColumns:`repeat(${cols},1fr)`}}>
    {items.map((it,i)=>(
      <div key={i}>
        <div className="text-xs text-[#94A3B8] mb-0.5">{it.label}</div>
        <div className="text-sm text-[#0F172A] font-medium">{it.value||<span className="text-[#CBD5E1]">—</span>}</div>
      </div>
    ))}
  </div>
);

// Tabs
const Tabs = ({ tabs, active, onChange }: { tabs:{key:string;label:string;badge?:number}[]; active:string; onChange:(k:string)=>void }) => (
  <div className="flex border-b border-[#E2E8F0] mb-5">
    {tabs.map(t=>(
      <button key={t.key} onClick={()=>onChange(t.key)}
        className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 transition-all
          ${active===t.key?"border-[#2563EB] text-[#2563EB]":"border-transparent text-[#64748B] hover:text-[#334155]"}`}>
        {t.label}
        {t.badge!=null && (
          <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-semibold
            ${active===t.key?"bg-[#DBEAFE] text-[#2563EB]":"bg-[#F1F5F9] text-[#64748B]"}`}>{t.badge}</span>
        )}
      </button>
    ))}
  </div>
);

// Divider
const Div = ({ label }: { label?:string }) => (
  <div className="flex items-center gap-3 my-5">
    <div className="flex-1 h-px bg-[#F1F5F9]" />
    {label && <><span className="text-xs text-[#94A3B8] whitespace-nowrap bg-white px-1">{label}</span><div className="flex-1 h-px bg-[#F1F5F9]" /></>}
  </div>
);

// Form row (label + field)
const FR = ({ label, required, hint, children, col=1 }: {
  label:string; required?:boolean; hint?:string; children:ReactNode; col?:number;
}) => (
  <div className={col>1?`col-span-${col}`:""}>
    <label className="block text-xs font-medium text-[#64748B] mb-1.5">
      {required && <span className="text-[#DC2626] mr-0.5">*</span>}{label}
    </label>
    {children}
    {hint && <p className="text-xs text-[#94A3B8] mt-1 leading-relaxed">{hint}</p>}
  </div>
);

// Grid form
const FG = ({ cols=3, children }: { cols?:number; children:ReactNode }) => (
  <div className={`grid gap-x-6 gap-y-5`} style={{gridTemplateColumns:`repeat(${cols},minmax(0,1fr))`}}>{children}</div>
);

// Alert banner
const AB = ({ type, msg, action }: { type:"info"|"warning"|"error"|"success"; msg:string; action?:ReactNode }) => {
  const s = {
    info:    "bg-[#EFF6FF] border-[#BFDBFE] text-[#1D4ED8]",
    warning: "bg-[#FFFBEB] border-[#FDE68A] text-[#92400E]",
    error:   "bg-[#FEF2F2] border-[#FECACA] text-[#991B1B]",
    success: "bg-[#F0FDF4] border-[#BBF7D0] text-[#14532D]",
  };
  return (
    <div className={`flex items-start gap-2 p-3 rounded-lg border text-sm mb-4 ${s[type]}`}>
      <Ic d={type==="warning"||type==="error"?P.alertTri:P.info} size={15} className="flex-shrink-0 mt-0.5" />
      <span className="flex-1">{msg}</span>
      {action}
    </div>
  );
};

// Steps
const Steps = ({ steps, current }: { steps:string[]; current:number }) => (
  <div className="flex items-center w-full mb-8">
    {steps.map((s,i)=>(
      <div key={i} className="flex items-center flex-1 last:flex-none">
        <div className="flex items-center gap-2">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold border-2 flex-shrink-0
            ${i<current?"bg-[#2563EB] border-[#2563EB] text-white":i===current?"bg-white border-[#2563EB] text-[#2563EB]":"bg-white border-[#E2E8F0] text-[#94A3B8]"}`}>
            {i<current?<Ic d={P.check} size={12} />:i+1}
          </div>
          <span className={`text-xs font-medium whitespace-nowrap ${i<=current?"text-[#334155]":"text-[#94A3B8]"}`}>{s}</span>
        </div>
        {i<steps.length-1&&<div className={`flex-1 h-px mx-3 ${i<current?"bg-[#2563EB]":"bg-[#E2E8F0]"}`}/>}
      </div>
    ))}
  </div>
);

// Tag input
const TagInput = ({ tags }: { tags:string[] }) => (
  <div className="min-h-9 border border-[#E2E8F0] rounded-md px-2 py-1.5 flex flex-wrap gap-1 focus-within:border-[#2563EB] focus-within:ring-2 focus-within:ring-[#DBEAFE]">
    {tags.map((t,i)=>(
      <span key={i} className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#EFF6FF] text-[#2563EB] text-xs rounded border border-[#BFDBFE]">
        {t}<button className="hover:text-[#DC2626]"><Ic d={P.x} size={10} /></button>
      </span>
    ))}
    <input placeholder="输入后按 Enter 添加" className="flex-1 min-w-[100px] text-sm text-[#334155] placeholder-[#94A3B8] outline-none bg-transparent" />
  </div>
);

// Image upload zone
const ImgZone = ({ label, size="md" }: { label?:string; size?:"sm"|"md"|"lg" }) => {
  const d = {sm:"w-20 h-20",md:"w-28 h-28",lg:"w-36 h-36"};
  return (
    <div className={`${d[size]} border-2 border-dashed border-[#E2E8F0] rounded-lg flex flex-col items-center justify-center
      text-[#94A3B8] gap-1.5 hover:border-[#2563EB] hover:text-[#2563EB] cursor-pointer transition-colors`}>
      <Ic d={P.upload} size={18} />
      {label && <span className="text-xs text-center leading-tight px-1">{label}</span>}
    </div>
  );
};

// Pagination
const Pager = ({ total, page=1, pageSize=10 }: { total:number; page?:number; pageSize?:number }) => {
  const tp = Math.ceil(total/pageSize);
  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-[#E2E8F0]">
      <span className="text-xs text-[#64748B]">共 <strong className="text-[#334155]">{total}</strong> 条记录</span>
      <div className="flex items-center gap-1">
        <button className="px-2.5 py-1.5 text-xs border border-[#E2E8F0] rounded hover:bg-[#F8FAFC] text-[#64748B]">上一页</button>
        {Array.from({length:Math.min(tp,5)},(_,i)=>i+1).map(p=>(
          <button key={p} className={`w-8 h-7 text-xs border rounded transition-colors ${p===page?"bg-[#2563EB] text-white border-[#2563EB]":"border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFC]"}`}>{p}</button>
        ))}
        {tp>5&&<span className="text-[#94A3B8] text-xs">…</span>}
        <button className="px-2.5 py-1.5 text-xs border border-[#E2E8F0] rounded hover:bg-[#F8FAFC] text-[#64748B]">下一页</button>
        <span className="text-xs text-[#64748B] ml-2">跳至</span>
        <input className="w-12 h-7 border border-[#E2E8F0] rounded text-xs text-center text-[#334155] focus:outline-none focus:border-[#2563EB]" defaultValue={page} />
        <span className="text-xs text-[#64748B]">页</span>
      </div>
    </div>
  );
};

// Empty state
const Empty = ({ icon, title, desc, action }: { icon:string; title:string; desc?:string; action?:ReactNode }) => (
  <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
    <div className="w-16 h-16 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center mb-4">
      <Ic d={P[icon as keyof typeof P]} size={28} className="text-[#CBD5E1]" />
    </div>
    <div className="text-sm font-medium text-[#334155] mb-1">{title}</div>
    {desc && <p className="text-xs text-[#94A3B8] mb-4 max-w-xs">{desc}</p>}
    {action}
  </div>
);

// Error state
const ErrorState = ({ onRetry }: { onRetry?:()=>void }) => (
  <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
    <div className="w-16 h-16 rounded-2xl bg-[#FEF2F2] border border-[#FECACA] flex items-center justify-center mb-4">
      <Ic d={P.wifiOff} size={24} className="text-[#DC2626]" />
    </div>
    <div className="text-sm font-medium text-[#334155] mb-1">数据加载失败</div>
    <p className="text-xs text-[#94A3B8] mb-4">网络连接异常，请检查网络后重试</p>
    {onRetry && <Btn variant="secondary" icon="refresh" onClick={onRetry} size="sm">重新加载</Btn>}
  </div>
);

// Table
const Tbl = ({ cols, rows, selected, onSelect, selectable=false, empty, error, onRetry }: {
  cols:{key:string;label:string;render?:(r:any)=>ReactNode;w?:string}[];
  rows:any[]; selected?: Set<string>; onSelect?:(id:string)=>void;
  selectable?: boolean; empty?:ReactNode; error?:boolean; onRetry?:()=>void;
}) => (
  <div className="overflow-x-auto">
    <table className="w-full text-sm border-collapse">
      <thead>
        <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
          {selectable && (
            <th className="w-10 px-4 py-3">
              <input type="checkbox" className="w-3.5 h-3.5 accent-[#2563EB] cursor-pointer" />
            </th>
          )}
          {cols.map(c=>(
            <th key={c.key} className={`px-4 py-3 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wide whitespace-nowrap ${c.w||""}`}>
              {c.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {error ? (
          <tr><td colSpan={cols.length+(selectable?1:0)}><ErrorState onRetry={onRetry} /></td></tr>
        ) : rows.length===0 ? (
          <tr><td colSpan={cols.length+(selectable?1:0)}>
            {empty ?? <Empty icon="archive" title="暂无数据" desc="当前筛选条件下没有匹配的记录" />}
          </td></tr>
        ) : rows.map((row,i)=>(
          <tr key={row.id??i} className={`border-b border-[#F1F5F9] hover:bg-[#F8FAFC] transition-colors ${selected?.has(row.id)?"bg-[#EFF6FF]":""}`}>
            {selectable && (
              <td className="px-4 py-3">
                <input type="checkbox" checked={selected?.has(row.id)} onChange={()=>onSelect?.(row.id)} className="w-3.5 h-3.5 accent-[#2563EB] cursor-pointer" />
              </td>
            )}
            {cols.map(c=>(
              <td key={c.key} className="px-4 py-3 text-[#334155] whitespace-nowrap">{c.render?c.render(row):row[c.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Batch bar
const Batch = ({ count, children }: { count:number; children:ReactNode }) =>
  count>0 ? (
    <div className="flex items-center gap-3 px-4 py-2.5 bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg mb-3">
      <span className="text-sm text-[#2563EB] font-medium">已选 {count} 项</span>
      <div className="h-4 w-px bg-[#BFDBFE]" />
      {children}
    </div>
  ) : null;

// ══════════════════════════════════════════════════════════════════════════════
// DATA
// ══════════════════════════════════════════════════════════════════════════════
const PRODS = [
  {
    id: "PRD-10081",
    name: "可口可乐 330ml 摩登罐",
    img: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=150&auto=format&fit=crop&q=80",
    barcode: "6901028001015",
    brand: "可口可乐",
    cat: "饮料",
    categoryCascade: "软饮料 / 碳酸饮料",
    tags: [
      { label: "畅销", color: "orange" as BC },
      { label: "爆款", color: "purple" as BC },
    ],
    spec: "330ml/罐",
    price: 4.50,
    shelfLife: "180天",
    status: "启用",
    pointTurnover: 88.5,
    productTurnover: 93.2,
    inStockQty: 1280,
    preStoreQty: 3500,
    whStockQty: 12400,
    avgDailySales15d: 345,
    availDays: 36,
    publishTime: "2024-01-15 10:00",
    hasAlgoLaunch: true,
  },
  {
    id: "PRD-10082",
    name: "农夫山泉饮用天然水 550ml",
    img: "https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=150&auto=format&fit=crop&q=80",
    barcode: "6901028005023",
    brand: "农夫山泉",
    cat: "饮料",
    categoryCascade: "饮用水 / 矿泉水",
    tags: [
      { label: "高毛利", color: "green" as BC },
      { label: "推荐", color: "cyan" as BC },
    ],
    spec: "550ml/瓶",
    price: 2.50,
    shelfLife: "730天",
    status: "启用",
    pointTurnover: 91.2,
    productTurnover: 96.8,
    inStockQty: 2450,
    preStoreQty: 5200,
    whStockQty: 28000,
    avgDailySales15d: 520,
    availDays: 54,
    publishTime: "2024-01-18 14:30",
    hasAlgoLaunch: true,
  },
  {
    id: "PRD-10083",
    name: "乐事原味薯片 75g",
    img: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=150&auto=format&fit=crop&q=80",
    barcode: "6920202888883",
    brand: "乐事",
    cat: "零食",
    categoryCascade: "休闲食品 / 膨化零食",
    tags: [{ label: "畅销", color: "orange" as BC }],
    spec: "75g/包",
    price: 6.90,
    shelfLife: "270天",
    status: "启用",
    pointTurnover: 76.4,
    productTurnover: 82.1,
    inStockQty: 860,
    preStoreQty: 1800,
    whStockQty: 6500,
    avgDailySales15d: 198,
    availDays: 33,
    publishTime: "2024-02-01 09:15",
    hasAlgoLaunch: false,
  },
  {
    id: "PRD-10084",
    name: "自嗨锅红烧牛肉自热米饭 405g",
    img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=150&auto=format&fit=crop&q=80",
    barcode: "6932260808861",
    brand: "自嗨锅",
    cat: "速食",
    categoryCascade: "方便速食 / 自热食品",
    tags: [
      { label: "高毛利", color: "green" as BC },
      { label: "爆款", color: "purple" as BC },
    ],
    spec: "405g/盒",
    price: 19.90,
    shelfLife: "365天",
    status: "启用",
    pointTurnover: 68.2,
    productTurnover: 74.5,
    inStockQty: 420,
    preStoreQty: 950,
    whStockQty: 3200,
    avgDailySales15d: 86,
    availDays: 37,
    publishTime: "2024-02-20 11:00",
    hasAlgoLaunch: false,
  },
  {
    id: "PRD-10085",
    name: "元气森林白桃苏打气泡水 480ml",
    img: "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=150&auto=format&fit=crop&q=80",
    barcode: "6970399060016",
    brand: "元气森林",
    cat: "饮料",
    categoryCascade: "软饮料 / 气泡水",
    tags: [
      { label: "新品", color: "blue" as BC },
      { label: "推荐", color: "cyan" as BC },
    ],
    spec: "480ml/瓶",
    price: 5.50,
    shelfLife: "270天",
    status: "启用",
    pointTurnover: 82.0,
    productTurnover: 89.4,
    inStockQty: 1120,
    preStoreQty: 2400,
    whStockQty: 9800,
    avgDailySales15d: 260,
    availDays: 38,
    publishTime: "2024-03-05 16:20",
    hasAlgoLaunch: true,
  },
  {
    id: "PRD-10086",
    name: "光明莫斯利安原味酸奶 200g",
    img: "https://images.unsplash.com/photo-1571212515416-fef01fc43637?w=150&auto=format&fit=crop&q=80",
    barcode: "6911988023773",
    brand: "光明",
    cat: "乳品",
    categoryCascade: "乳制品 / 低温酸奶",
    tags: [{ label: "促销", color: "red" as BC }],
    spec: "200g/杯",
    price: 5.90,
    shelfLife: "21天",
    status: "禁用",
    pointTurnover: 45.1,
    productTurnover: 52.3,
    inStockQty: 0,
    preStoreQty: 0,
    whStockQty: 1200,
    avgDailySales15d: 42,
    availDays: 29,
    publishTime: "2024-03-12 08:45",
    hasAlgoLaunch: false,
  },
  {
    id: "PRD-10087",
    name: "三只松鼠每日坚果 25g",
    img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=150&auto=format&fit=crop&q=80",
    barcode: "6956288810023",
    brand: "三只松鼠",
    cat: "零食",
    categoryCascade: "休闲食品 / 坚果炒货",
    tags: [
      { label: "畅销", color: "orange" as BC },
      { label: "高毛利", color: "green" as BC },
    ],
    spec: "25g/袋",
    price: 8.50,
    shelfLife: "180天",
    status: "启用",
    pointTurnover: 79.8,
    productTurnover: 85.6,
    inStockQty: 940,
    preStoreQty: 2100,
    whStockQty: 7400,
    avgDailySales15d: 215,
    availDays: 34,
    publishTime: "2024-04-02 15:10",
    hasAlgoLaunch: true,
  },
  {
    id: "PRD-10088",
    name: "统一冰红茶 500ml",
    img: "https://images.unsplash.com/photo-1556881286-fc6915169721?w=150&auto=format&fit=crop&q=80",
    barcode: "6907992500050",
    brand: "统一",
    cat: "饮料",
    categoryCascade: "软饮料 / 茶饮料",
    tags: [{ label: "爆款", color: "purple" as BC }],
    spec: "500ml/瓶",
    price: 3.50,
    shelfLife: "365天",
    status: "启用",
    pointTurnover: 84.6,
    productTurnover: 90.1,
    inStockQty: 1650,
    preStoreQty: 3800,
    whStockQty: 15200,
    avgDailySales15d: 380,
    availDays: 40,
    publishTime: "2024-04-10 13:00",
    hasAlgoLaunch: true,
  },
];

// 库存分布情况弹窗展示数据（写死）
const STOCK_DIST = [
  { wh: "深圳中心仓", total: 4200, avail: 3800, frozen: 400 },
  { wh: "广州南沙仓", total: 3100, avail: 2600, frozen: 500 },
  { wh: "北京顺义仓", total: 2400, avail: 2400, frozen: 0 },
  { wh: "上海浦东仓", total: 1800, avail: 1500, frozen: 300 },
  { wh: "成都天府仓", total: 900, avail: 700, frozen: 200 },
];

const SUPPLIERS = [
  {
    id: "SUP-10021",
    name: "可口可乐（中国）饮料有限公司",
    short: "可口可乐",
    type: "品牌方",
    contact: "陈明",
    phone: "13802888001",
    bankAccount: "6222 0210 0122 8888 910",
    bankName: "招商银行深圳高新支行",
    status: "启用",
    settlementMethod: "月结",
    contractFile: "可口可乐2024年框架协议.pdf",
    cat: "饮料",
    contract: "2024-01-01 至 2025-12-31",
    terms: "月结45天",
    level: "战略供应商",
    limit: "¥500,000",
    balance: "-¥32,400",
    balanceRaw: -32400,
  },
  {
    id: "SUP-10022",
    name: "农夫山泉股份有限公司",
    short: "农夫山泉",
    type: "品牌方",
    contact: "李总监",
    phone: "13905718002",
    bankAccount: "6214 8301 9283 7711 002",
    bankName: "中国建设银行杭州西湖支行",
    status: "启用",
    settlementMethod: "月结",
    contractFile: "农夫山泉年度采购合作合同.pdf",
    cat: "饮料",
    contract: "2024-03-01 至 2026-02-28",
    terms: "月结30天",
    level: "核心供应商",
    limit: "¥300,000",
    balance: "-¥18,600",
    balanceRaw: -18600,
  },
  {
    id: "SUP-10023",
    name: "百事食品（中国）有限公司",
    short: "百事食品",
    type: "代理商",
    contact: "王主任",
    phone: "13701005888",
    bankAccount: "6228 4801 0293 8812 301",
    bankName: "中国工商银行北京国贸支行",
    status: "启用",
    settlementMethod: "季结",
    contractFile: "百事零食战略合作协议.pdf",
    cat: "零食",
    contract: "2023-06-01 至 2024-05-31",
    terms: "月结60天",
    level: "核心供应商",
    limit: "¥200,000",
    balance: "¥0",
    balanceRaw: 0,
  },
  {
    id: "SUP-10024",
    name: "重庆自嗨锅食品有限公司",
    short: "自嗨锅",
    type: "品牌方",
    contact: "张强",
    phone: "13602378888",
    bankAccount: "6217 0023 9012 3381 902",
    bankName: "交通银行重庆江北支行",
    status: "启用",
    settlementMethod: "按单结",
    contractFile: "自嗨锅速食供货合同.pdf",
    cat: "速食",
    contract: "2024-07-01 至 2025-06-30",
    terms: "预付30%+月结",
    level: "战略供应商",
    limit: "¥150,000",
    balance: "-¥8,900",
    balanceRaw: -8900,
  },
  {
    id: "SUP-10025",
    name: "元气森林（北京）食品科技有限公司",
    short: "元气森林",
    type: "品牌方",
    contact: "刘静",
    phone: "13501006666",
    bankAccount: "6222 0210 9012 7731 889",
    bankName: "浦发银行北京朝阳支行",
    status: "启用",
    settlementMethod: "充值",
    contractFile: "元气森林铺市预付供货合同.pdf",
    cat: "饮料",
    contract: "2024-09-01 至 2025-08-31",
    terms: "月结30天",
    level: "成长供应商",
    limit: "¥100,000",
    balance: "-¥5,200",
    balanceRaw: -5200,
  },
  {
    id: "SUP-10026",
    name: "光明乳业股份有限公司",
    short: "光明乳业",
    type: "品牌方",
    contact: "孙主管",
    phone: "13302108888",
    bankAccount: "6225 8801 9023 4412 008",
    bankName: "中国银行上海静安支行",
    status: "停用",
    settlementMethod: "月结",
    contractFile: "光明乳品冷链供货协议.pdf",
    cat: "乳品",
    contract: "2023-01-01 至 2023-12-31",
    terms: "月结30天",
    level: "普通供应商",
    limit: "¥50,000",
    balance: "¥0",
    balanceRaw: 0,
  },
  {
    id: "SUP-10027",
    name: "三只松鼠股份有限公司",
    short: "三只松鼠",
    type: "品牌方",
    contact: "赵磊",
    phone: "13105539000",
    bankAccount: "6212 2601 0982 7731 901",
    bankName: "徽商银行芜湖高新支行",
    status: "启用",
    settlementMethod: "季结",
    contractFile: "三只松鼠坚果采购合同.pdf",
    cat: "零食",
    contract: "2024-04-01 至 2026-03-31",
    terms: "季结",
    level: "核心供应商",
    limit: "¥180,000",
    balance: "-¥12,000",
    balanceRaw: -12000,
  },
];

const PT_LIST = [
  {id:"PT001",name:"华南区写字楼标准价格表",type:"区域价",scope:"华南区",target:"全部点位",priority:1,skus:36,status:"启用",updated:"2025-08-01",desc:"华南区写字楼场景，基于全国零售价统一下浮 5% 执行"},
  {id:"PT002",name:"金牌客户专属价格表",type:"客户专属价",scope:"全部区域",target:"金牌客户",priority:2,skus:36,status:"启用",updated:"2025-07-15",desc:"金牌等级客户，整体低于标准零售价 8%，折扣后含税"},
  {id:"PT003",name:"商业综合体高流量价格表",type:"场景价",scope:"商业综合体",target:"商业综合体点位",priority:3,skus:28,status:"启用",updated:"2025-06-01",desc:"高流量商业场景，饮料上浮 3%，速食保持标准价"},
  {id:"PT004",name:"元气森林铺市促销价",type:"促销价",scope:"全部区域",target:"指定商品",priority:5,skus:5,status:"停用",updated:"2025-05-10",desc:"新品铺市阶段前 3 个月按成本价 +10% 执行"},
];

const PO_LIST = [
  {id:"PO-20250910-001",supplier:"可口可乐（中国）饮料有限公司",wh:"华南中心仓（深圳）",skus:6,qty:1440,amt:3168,status:"待审核",creator:"采购员-王芳",created:"2025-09-10 09:30"},
  {id:"PO-20250909-005",supplier:"农夫山泉股份有限公司",wh:"华南中心仓（深圳）",skus:3,qty:2400,amt:1920,status:"已审核",creator:"采购员-李明",created:"2025-09-09 14:00"},
  {id:"PO-20250908-012",supplier:"百事食品（中国）有限公司",wh:"华东中心仓（上海）",skus:4,qty:800,amt:2800,status:"入库完成",creator:"采购员-张磊",created:"2025-09-08 10:00"},
  {id:"PO-20250907-008",supplier:"重庆自嗨锅食品有限公司",wh:"华南中心仓（深圳）",skus:2,qty:360,amt:3420,status:"部分入库",creator:"采购员-王芳",created:"2025-09-07 08:30"},
  {id:"PO-20250905-003",supplier:"元气森林（北京）食品科技有限公司",wh:"华北中心仓（北京）",skus:2,qty:600,amt:1440,status:"审核驳回",creator:"采购员-刘静",created:"2025-09-05 11:00"},
];

const PO_STATUS: Record<string,BC> = {
  "待审核":"blue","已审核":"cyan","入库中":"orange","部分入库":"yellow","入库完成":"green","已取消":"gray","审核驳回":"red",
};

const PO_LINES = [
  {id:1,sku:"SKU-DRINK-001",name:"可口可乐 330ml",barcode:"6901028001015",unit:"罐",box:24,price:2.20,qty:240,recv:240,pend:0,amt:528,status:"入库完成",note:""},
  {id:2,sku:"SKU-DRINK-005",name:"农夫山泉矿泉水 550ml",barcode:"6901028005023",unit:"瓶",box:24,price:0.80,qty:480,recv:480,pend:0,amt:384,status:"入库完成",note:""},
  {id:3,sku:"SKU-SNACK-012",name:"乐事薯片原味 75g",barcode:"6920202888883",unit:"袋",box:20,price:3.50,qty:200,recv:180,pend:20,amt:700,status:"部分入库",note:"供应商少发 1 箱，补货中"},
  {id:4,sku:"SKU-DRINK-022",name:"统一冰红茶 500ml",barcode:"6907992500050",unit:"瓶",box:24,price:1.50,qty:240,recv:0,pend:240,amt:360,status:"待入库",note:""},
  {id:5,sku:"SKU-DRINK-033",name:"元气森林苏打气泡水",barcode:"6970399060016",unit:"瓶",box:15,price:2.40,qty:300,recv:300,pend:0,amt:720,status:"入库完成",note:""},
  {id:6,sku:"SKU-DAIRY-008",name:"光明莫斯利安酸奶 200g",barcode:"6911988023773",unit:"杯",box:12,price:2.80,qty:180,recv:180,pend:0,amt:504,status:"入库完成",note:""},
];

// ══════════════════════════════════════════════════════════════════════════════
// PAGE 0 – PRODUCT ALGORITHM LAUNCH FORM (操作商品上新 / 更新商品上新页)
// ══════════════════════════════════════════════════════════════════════════════
export interface PackagingGroup {
  id: string;
  title: string;
  views: {
    front: string; // 正面图
    back: string; // 背面图
    left: string; // 左侧图
    right: string; // 右侧图
    top: string; // 顶面图
    bottom: string; // 底面图
  };
}

export const ProductAlgoLaunchForm = ({
  product = PRODS[0],
  onBack,
}: {
  product?: (typeof PRODS)[0];
  onBack: () => void;
}) => {
  // Packaging groups state
  const [packagings, setPackagings] = useState<PackagingGroup[]>([
    {
      id: "pkg-1",
      title: "包装 1：330ml 罐装 (标准默认包装)",
      views: {
        front: product.img,
        back: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&auto=format&fit=crop&q=80",
        left: "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=400&auto=format&fit=crop&q=80",
        right: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&auto=format&fit=crop&q=80",
        top: "https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=400&auto=format&fit=crop&q=80",
        bottom: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&auto=format&fit=crop&q=80",
      },
    },
  ]);

  const [previewModal, setPreviewModal] = useState<{ url: string; title: string } | null>(null);
  const [toastMsg, setToastMsg] = useState("");
  const [showCancelModal, setShowCancelModal] = useState(false);

  // 6 Views Definitions
  const VIEW_DEFINITIONS = [
    { key: "front" as const, label: "正面图", tag: "正面 0°平视", desc: "品牌LOGO与正面标识对齐" },
    { key: "back" as const, label: "背面图", tag: "背面 180°平视", desc: "清晰展示69条码与营养成分" },
    { key: "left" as const, label: "左侧图", tag: "左侧 90°侧视", desc: "侧面配料表与生产许可" },
    { key: "right" as const, label: "右侧图", tag: "右侧 270°侧视", desc: "侧面净含量与产地标注" },
    { key: "top" as const, label: "顶面图", tag: "顶面 90°俯视", desc: "垂直90度俯视，瓶盖/拉环" },
    { key: "bottom" as const, label: "底面图", tag: "底面 90°仰视", desc: "垂直90度仰视，生产喷码" },
  ];

  // Add Packaging Group (新增多包装)
  const handleAddPackaging = () => {
    const nextIdx = packagings.length + 1;
    const newPkg: PackagingGroup = {
      id: `pkg-${Date.now()}`,
      title: `包装 ${nextIdx}：塑封连包 / 组合套装 (多包装形态)`,
      views: {
        front: "",
        back: "",
        left: "",
        right: "",
        top: "",
        bottom: "",
      },
    };
    setPackagings([...packagings, newPkg]);
    showToast(`已追加 [包装 ${nextIdx}] 的完整算法六视图卡片区！`);
  };

  // Remove Packaging Group
  const handleRemovePackaging = (pkgId: string) => {
    if (packagings.length <= 1) return;
    setPackagings(packagings.filter((p) => p.id !== pkgId));
    showToast("已删除该包装形态模块");
  };

  // Update Image View
  const handleUpdateImage = (pkgId: string, viewKey: keyof PackagingGroup["views"], url: string) => {
    setPackagings((prev) =>
      prev.map((p) =>
        p.id === pkgId
          ? {
              ...p,
              views: {
                ...p.views,
                [viewKey]: url,
              },
            }
          : p
      )
    );
  };

  // Clear Image
  const handleClearImage = (pkgId: string, viewKey: keyof PackagingGroup["views"]) => {
    handleUpdateImage(pkgId, viewKey, "");
  };

  // Submit Handler
  const handleSubmit = () => {
    showToast(`商品 [${product.name}] 算法六视图与多包装信息提交成功！已生成 AI 辨识模型！`);
    setTimeout(() => {
      onBack();
    }, 1200);
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3000);
  };

  return (
    <div className="space-y-4 max-w-6xl mx-auto pb-12">
      {/* Toast */}
      {toastMsg && (
        <div className="fixed top-5 right-5 z-50 bg-[#0F172A] text-white px-4 py-3 rounded-lg shadow-xl text-sm flex items-center gap-2 border border-[#334155] animate-bounce">
          <Ic d={P.check} size={16} className="text-[#16A34A]" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowCancelModal(true)}
            className="p-1.5 text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] rounded-lg transition-colors"
          >
            <Ic d={P.chevL} size={20} />
          </button>
          <div>
            <h1 className="text-lg font-bold text-[#0F172A]">
              {product.hasAlgoLaunch ? "更新商品上新" : "操作商品上新"}
            </h1>
            <p className="text-xs text-[#64748B]">提交智柜视觉识别算法六视图图片，支持一品多包装视觉特征训练</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Btn variant="secondary" onClick={() => setShowCancelModal(true)}>
            取消
          </Btn>
          <Btn variant="primary" icon="check" onClick={handleSubmit}>
            提交算法上新
          </Btn>
        </div>
      </div>

      {/* Read-only Basic Information Bar */}
      <div className="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-sm">
        <div className="text-xs font-bold text-[#334155] mb-3 pb-2 border-b border-[#F1F5F9] flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Ic d={P.info} size={16} className="text-[#2563EB]" />
            商品基础信息 (只读不可编辑)
          </span>
          <span className="text-[11px] text-[#94A3B8] font-normal">基于商品档案主数据生成</span>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-5 text-xs">
          <img
            src={product.img}
            alt={product.name}
            className="w-16 h-16 rounded-lg object-cover border border-[#CBD5E1] flex-shrink-0"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
            <div className="p-2.5 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
              <span className="text-[#64748B] block text-[11px]">商品ID</span>
              <span className="font-mono font-bold text-[#2563EB]">{product.id}</span>
            </div>
            <div className="p-2.5 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
              <span className="text-[#64748B] block text-[11px]">商品名称</span>
              <span className="font-bold text-[#0F172A] truncate block">{product.name}</span>
            </div>
            <div className="p-2.5 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
              <span className="text-[#64748B] block text-[11px]">商品条码 (69码)</span>
              <span className="font-mono text-[#334155]">{product.barcode}</span>
            </div>
            <div className="p-2.5 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
              <span className="text-[#64748B] block text-[11px]">品牌</span>
              <span className="font-semibold text-[#334155]">{product.brand}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Shooting Guide Banner (拍摄示意提示) */}
      <div className="p-4 bg-[#EFF6FF] border border-[#BFDBFE] rounded-xl text-xs text-[#1E40AF] space-y-1.5">
        <div className="flex items-center gap-2 font-bold text-sm text-[#2563EB]">
          <Ic d={P.eye} size={18} />
          <span>算法上新六视图拍摄示意与技术规范提示</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1 text-[#334155]">
          <div className="p-2 bg-white/80 rounded border border-[#DBEAFE]">
            <strong className="text-[#2563EB]">1. 纯白暗光背景：</strong> 请使用无缝纯白底幕，无强影与镜头炫光。
          </div>
          <div className="p-2 bg-white/80 rounded border border-[#DBEAFE]">
            <strong className="text-[#2563EB]">2. 正交拍摄方向：</strong> 严格按 0°、90°、180°、270°、俯视及仰视对齐。
          </div>
          <div className="p-2 bg-white/80 rounded border border-[#DBEAFE]">
            <strong className="text-[#2563EB]">3. 条码与标签高清：</strong> 确保 69 码与净含量说明文字无反光撕裂。
          </div>
        </div>
      </div>

      {/* Core Upload Section: 算法上新六视图 (大图卡片式上传区) + 一品多包装 */}
      <div className="space-y-6">
        <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-[#E2E8F0]">
          <div>
            <h2 className="text-base font-bold text-[#0F172A]">算法上新六视图上传模块</h2>
            <p className="text-xs text-[#64748B]">按 6 个正交视角上传商品照片，点击下方按钮可追加多包装形态</p>
          </div>
          <Btn variant="primary" icon="plus" onClick={handleAddPackaging}>
            新增多包装
          </Btn>
        </div>

        {/* Packaging Group Containers */}
        {packagings.map((pkg, pIdx) => (
          <div
            key={pkg.id}
            className="bg-white rounded-xl border border-[#CBD5E1] shadow-sm overflow-hidden transition-all hover:border-[#2563EB]"
          >
            {/* Group Header */}
            <div className="px-5 py-3 bg-[#F8FAFC] border-b border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2 flex-1">
                <span className="w-6 h-6 rounded-full bg-[#2563EB] text-white flex items-center justify-center font-bold text-xs">
                  {pIdx + 1}
                </span>
                <input
                  type="text"
                  value={pkg.title}
                  onChange={(e) => {
                    const val = e.target.value;
                    setPackagings((prev) =>
                      prev.map((item) => (item.id === pkg.id ? { ...item, title: val } : item))
                    );
                  }}
                  className="font-bold text-sm text-[#0F172A] border border-transparent hover:border-[#CBD5E1] focus:border-[#2563EB] focus:bg-white px-2 py-1 rounded-md outline-none max-w-md"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-[#64748B]">
                  已传图片：
                  <strong className="text-[#2563EB]">
                    {Object.values(pkg.views).filter((v) => v !== "").length} / 6
                  </strong>
                </span>
                {packagings.length > 1 && (
                  <button
                    onClick={() => handleRemovePackaging(pkg.id)}
                    className="text-xs text-[#DC2626] hover:bg-[#FEF2F2] px-2.5 py-1 rounded border border-[#FECACA] font-medium"
                  >
                    删除该包装形态
                  </button>
                )}
              </div>
            </div>

            {/* 6 Views Cards Grid (大图卡片式上传区) */}
            <div className="p-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {VIEW_DEFINITIONS.map((def) => {
                const imgVal = pkg.views[def.key];
                const hasImg = Boolean(imgVal);

                return (
                  <div
                    key={def.key}
                    className={`rounded-xl border-2 p-3 flex flex-col justify-between transition-all ${
                      hasImg
                        ? "border-[#BBF7D0] bg-[#F0FDF4]/30"
                        : "border-dashed border-[#CBD5E1] bg-[#F8FAFC] hover:border-[#2563EB]"
                    }`}
                  >
                    {/* View Header & Direction Tag */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-xs text-[#0F172A]">{def.label}</span>
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          hasImg
                            ? "bg-[#DCFCE7] text-[#16A34A] border border-[#BBF7D0]"
                            : "bg-[#E2E8F0] text-[#64748B]"
                        }`}
                      >
                        {def.tag}
                      </span>
                    </div>

                    {/* Image Placeholder or Big Card Upload Zone */}
                    <div className="w-full h-44 rounded-lg bg-white border border-[#E2E8F0] overflow-hidden relative flex items-center justify-center group mb-2">
                      {hasImg ? (
                        <>
                          <img src={imgVal} alt={def.label} className="w-full h-full object-contain p-1" />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-1.5 text-white transition-opacity">
                            <button
                              onClick={() => setPreviewModal({ url: imgVal, title: `${pkg.title} - ${def.label}` })}
                              className="px-2.5 py-1 bg-white/20 hover:bg-white/30 rounded text-xs backdrop-blur-sm"
                            >
                              放大预览
                            </button>
                            <button
                              onClick={() => handleClearImage(pkg.id, def.key)}
                              className="px-2.5 py-1 bg-[#DC2626]/80 hover:bg-[#DC2626] rounded text-xs"
                            >
                              删除图片
                            </button>
                          </div>
                        </>
                      ) : (
                        <button
                          onClick={() =>
                            handleUpdateImage(
                              pkg.id,
                              def.key,
                              "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&auto=format&fit=crop&q=80"
                            )
                          }
                          className="w-full h-full flex flex-col items-center justify-center text-[#94A3B8] hover:text-[#2563EB] p-2 text-center"
                        >
                          <Ic d={P.upload} size={24} className="mb-1" />
                          <span className="text-xs font-semibold">上传{def.label}</span>
                          <span className="text-[10px] text-[#94A3B8] mt-0.5 leading-tight">{def.desc}</span>
                        </button>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="pt-1 flex items-center justify-between text-[11px]">
                      <span className={hasImg ? "text-[#16A34A] font-medium" : "text-[#94A3B8]"}>
                        {hasImg ? "✓ 已上报" : "待上传照片"}
                      </span>
                      <button
                        onClick={() =>
                          handleUpdateImage(
                            pkg.id,
                            def.key,
                            "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&auto=format&fit=crop&q=80"
                          )
                        }
                        className="text-[#2563EB] hover:underline font-medium"
                      >
                        {hasImg ? "更换图片" : "点击上传"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Actions Bar */}
      <div className="p-4 bg-white rounded-xl border border-[#E2E8F0] shadow-md flex items-center justify-between sticky bottom-4 z-20">
        <div className="flex items-center gap-2 text-xs text-[#64748B]">
          <Ic d={P.info} size={16} className="text-[#2563EB]" />
          <span>点击【新增多包装】可追加组合装/礼盒装等多维六视图数据。</span>
        </div>
        <div className="flex items-center gap-3">
          <Btn variant="secondary" onClick={() => setShowCancelModal(true)}>
            取消
          </Btn>
          <Btn variant="primary" icon="check" onClick={handleSubmit}>
            提交算法上新
          </Btn>
        </div>
      </div>

      {/* Image Preview Modal */}
      {previewModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full relative shadow-2xl animate-in zoom-in-95 duration-150">
            <button
              onClick={() => setPreviewModal(null)}
              className="absolute top-4 right-4 text-[#94A3B8] hover:text-[#334155] p-1.5 rounded-full hover:bg-[#F1F5F9]"
            >
              <Ic d={P.x} size={20} />
            </button>
            <h3 className="text-base font-bold text-[#0F172A] mb-3">{previewModal.title}</h3>
            <div className="w-full h-80 bg-[#F8FAFC] rounded-xl overflow-hidden border border-[#E2E8F0] flex items-center justify-center p-2">
              <img src={previewModal.url} alt="预览" className="max-w-full max-h-full object-contain" />
            </div>
            <div className="mt-4 flex justify-end">
              <Btn variant="secondary" size="sm" onClick={() => setPreviewModal(null)}>
                关闭预览
              </Btn>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-[#E2E8F0]">
            <div className="flex items-center gap-3 mb-3 text-[#DC2626]">
              <div className="w-9 h-9 rounded-full bg-[#FEF2F2] flex items-center justify-center flex-shrink-0">
                <Ic d={P.alertTri} size={20} />
              </div>
              <h3 className="text-base font-bold text-[#0F172A]">确认放弃上新提交？</h3>
            </div>
            <p className="text-xs text-[#64748B] mb-5 leading-relaxed">
              取消后本次录入的算法六视图与多包装照片数据将不予保存，确定退出吗？
            </p>
            <div className="flex justify-end gap-2">
              <Btn variant="secondary" size="sm" onClick={() => setShowCancelModal(false)}>
                继续编辑
              </Btn>
              <Btn
                variant="danger"
                size="sm"
                onClick={() => {
                  setShowCancelModal(false);
                  onBack();
                }}
              >
                确定放弃
              </Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// PAGE 1 – PRODUCT ARCHIVE LIST (商品档案列表页)
// ══════════════════════════════════════════════════════════════════════════════
export const ProductArchiveList = ({ onEdit }: { onEdit: (id?: string) => void }) => {
  const [productList, setProductList] = useState(PRODS);
  const [sel, setSel] = useState<Set<string>>(new Set());

  // Search filter states
  const [searchName, setSearchName] = useState("");
  const [searchBarcode, setSearchBarcode] = useState("");
  const [searchCategory, setSearchCategory] = useState("全部");
  const [searchCascade, setSearchCascade] = useState("全部");
  const [searchBrand, setSearchBrand] = useState("");
  const [searchTag, setSearchTag] = useState("全部");
  const [searchStatus, setSearchStatus] = useState("全部");

  // Active filters applied to table
  const [filters, setFilters] = useState({
    name: "",
    barcode: "",
    category: "全部",
    cascade: "全部",
    brand: "",
    tag: "全部",
    status: "全部",
  });

  // Modal / Action states
  const [previewImg, setPreviewImg] = useState<{ url: string; title: string; barcode: string; spec: string } | null>(null);
  const [detailProduct, setDetailProduct] = useState<(typeof PRODS)[0] | null>(null);
  const [stockDistProduct, setStockDistProduct] = useState<(typeof PRODS)[0] | null>(null);
  const [confirmStatusItem, setConfirmStatusItem] = useState<(typeof PRODS)[0] | null>(null);
  const [algoLaunchItem, setAlgoLaunchItem] = useState<(typeof PRODS)[0] | null>(null);
  const [algoLaunchPageProduct, setAlgoLaunchPageProduct] = useState<(typeof PRODS)[0] | null>(null);
  const [batchImportOpen, setBatchImportOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  // Options
  const CATEGORY_OPTIONS = ["全部", "饮料", "零食", "速食", "乳品", "烘焙", "水果", "冲调"];
  const CASCADE_OPTIONS = [
    "全部",
    "软饮料 / 碳酸饮料",
    "软饮料 / 气泡水",
    "软饮料 / 茶饮料",
    "饮用水 / 矿泉水",
    "休闲食品 / 膨化零食",
    "休闲食品 / 坚果炒货",
    "方便速食 / 自热食品",
    "乳制品 / 低温酸奶",
  ];
  const TAG_OPTIONS = ["全部", "畅销", "爆款", "新品", "高毛利", "促销", "推荐"];

  // Toggle selection
  const toggle = (id: string) =>
    setSel((s) => {
      const n = new Set(s);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });

  const toggleAll = () => {
    if (sel.size === filteredProducts.length) {
      setSel(new Set());
    } else {
      setSel(new Set(filteredProducts.map((p) => p.id)));
    }
  };

  // Search & Reset handlers
  const handleSearch = () => {
    setFilters({
      name: searchName.trim(),
      barcode: searchBarcode.trim(),
      category: searchCategory,
      cascade: searchCascade,
      brand: searchBrand.trim(),
      tag: searchTag,
      status: searchStatus,
    });
  };

  const handleReset = () => {
    setSearchName("");
    setSearchBarcode("");
    setSearchCategory("全部");
    setSearchCascade("全部");
    setSearchBrand("");
    setSearchTag("全部");
    setSearchStatus("全部");
    setFilters({
      name: "",
      barcode: "",
      category: "全部",
      cascade: "全部",
      brand: "",
      tag: "全部",
      status: "全部",
    });
  };

  // Filtered rows
  const filteredProducts = productList.filter((item) => {
    if (filters.name && !item.name.toLowerCase().includes(filters.name.toLowerCase())) return false;
    if (filters.barcode && !item.barcode.includes(filters.barcode)) return false;
    if (filters.category !== "全部" && item.cat !== filters.category) return false;
    if (filters.cascade !== "全部" && item.categoryCascade !== filters.cascade) return false;
    if (filters.brand && !item.brand.toLowerCase().includes(filters.brand.toLowerCase())) return false;
    if (filters.tag !== "全部" && !item.tags.some((t) => t.label === filters.tag)) return false;
    if (filters.status !== "全部" && item.status !== filters.status) return false;
    return true;
  });

  // If Algorithm Launch Page is active, render ProductAlgoLaunchForm
  if (algoLaunchPageProduct) {
    return (
      <ProductAlgoLaunchForm
        product={algoLaunchPageProduct}
        onBack={() => setAlgoLaunchPageProduct(null)}
      />
    );
  }

  // Action handlers
  const handleToggleStatus = (target: (typeof PRODS)[0]) => {
    const nextStatus = target.status === "启用" ? "禁用" : "启用";
    setProductList((prev) =>
      prev.map((p) => (p.id === target.id ? { ...p, status: nextStatus as "启用" | "禁用" } : p))
    );
    setConfirmStatusItem(null);
    showToast(`商品 [${target.name}] 已成功${nextStatus}！`);
  };

  const handleAlgoSubmit = (target: (typeof PRODS)[0]) => {
    setProductList((prev) => prev.map((p) => (p.id === target.id ? { ...p, hasAlgoLaunch: true } : p)));
    setAlgoLaunchItem(null);
    showToast(`商品 [${target.name}] 智柜算法上新配置已更新上线！`);
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3000);
  };

  return (
    <div className="space-y-4">
      {/* Toast notification */}
      {toastMsg && (
        <div className="fixed top-5 right-5 z-50 bg-[#0F172A] text-white px-4 py-3 rounded-lg shadow-xl text-sm flex items-center gap-2 border border-[#334155] animate-bounce">
          <Ic d={P.check} size={16} className="text-[#16A34A]" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-[#0F172A] tracking-tight">商品档案</h1>
          <p className="text-xs text-[#64748B] mt-0.5">智能零售终端商品全生命周期主数据及自动补货算法关联管理</p>
        </div>
        <div className="flex items-center gap-2">
          <Btn variant="primary" icon="plus" onClick={() => onEdit()}>
            新增商品档案
          </Btn>
          <Btn variant="secondary" icon="upload" onClick={() => setBatchImportOpen(true)}>
            批量新增商品档案
          </Btn>
          <Btn variant="secondary" icon="download" onClick={() => showToast("已启动全量商品档案 EXCEL 导出导出程序...")}>
            导出
          </Btn>
        </div>
      </div>

      {/* High-density Filter Search Area */}
      <div className="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-sm">
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#F1F5F9]">
          <div className="flex items-center gap-2">
            <Ic d={P.search} size={16} className="text-[#2563EB]" />
            <span className="text-xs font-bold text-[#334155] uppercase tracking-wider">高密度筛选条件</span>
          </div>
          <span className="text-xs text-[#94A3B8]">共检索到 {filteredProducts.length} 条符合条件的档案</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3 items-end">
          {/* 1. 商品名称 */}
          <div>
            <label className="block text-[11px] font-semibold text-[#64748B] mb-1">商品名称</label>
            <input
              type="text"
              placeholder="模糊搜索商品名称"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="w-full text-xs px-2.5 py-1.5 border border-[#CBD5E1] rounded-md focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB]"
            />
          </div>

          {/* 2. 商品条码 */}
          <div>
            <label className="block text-[11px] font-semibold text-[#64748B] mb-1">商品条码</label>
            <input
              type="text"
              placeholder="模糊搜索商品条码"
              value={searchBarcode}
              onChange={(e) => setSearchBarcode(e.target.value)}
              className="w-full text-xs px-2.5 py-1.5 border border-[#CBD5E1] rounded-md focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB]"
            />
          </div>

          {/* 3. 分类 */}
          <div>
            <label className="block text-[11px] font-semibold text-[#64748B] mb-1">分类</label>
            <select
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value)}
              className="w-full text-xs px-2.5 py-1.5 border border-[#CBD5E1] rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB]"
            >
              {CATEGORY_OPTIONS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* 4. 一级/二级类目 */}
          <div>
            <label className="block text-[11px] font-semibold text-[#64748B] mb-1">一级/二级类目</label>
            <select
              value={searchCascade}
              onChange={(e) => setSearchCascade(e.target.value)}
              className="w-full text-xs px-2.5 py-1.5 border border-[#CBD5E1] rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB]"
            >
              {CASCADE_OPTIONS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* 5. 品牌 */}
          <div>
            <label className="block text-[11px] font-semibold text-[#64748B] mb-1">品牌</label>
            <input
              type="text"
              placeholder="模糊搜索品牌"
              value={searchBrand}
              onChange={(e) => setSearchBrand(e.target.value)}
              className="w-full text-xs px-2.5 py-1.5 border border-[#CBD5E1] rounded-md focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB]"
            />
          </div>

          {/* 6. 商品标签 */}
          <div>
            <label className="block text-[11px] font-semibold text-[#64748B] mb-1">商品标签</label>
            <select
              value={searchTag}
              onChange={(e) => setSearchTag(e.target.value)}
              className="w-full text-xs px-2.5 py-1.5 border border-[#CBD5E1] rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB]"
            >
              {TAG_OPTIONS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* 7. 商品状态 & 右侧固定操作按钮 */}
          <div className="flex items-center gap-2 col-span-1 md:col-span-2 lg:col-span-1 xl:col-span-1">
            <div className="flex-1">
              <label className="block text-[11px] font-semibold text-[#64748B] mb-1">商品状态</label>
              <select
                value={searchStatus}
                onChange={(e) => setSearchStatus(e.target.value)}
                className="w-full text-xs px-2 py-1.5 border border-[#CBD5E1] rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB]"
              >
                <option value="全部">全部</option>
                <option value="启用">启用</option>
                <option value="禁用">禁用</option>
              </select>
            </div>
            <div className="flex items-end gap-1.5 pt-4">
              <Btn variant="primary" size="sm" icon="search" onClick={handleSearch}>
                搜索
              </Btn>
              <Btn variant="secondary" size="sm" onClick={handleReset}>
                重置
              </Btn>
            </div>
          </div>
        </div>
      </div>

      {/* Batch toolbar if selected */}
      <Batch count={sel.size}>
        <Btn variant="ghost" size="sm" onClick={() => showToast(`已批量启用 ${sel.size} 项商品`)}>
          批量启用
        </Btn>
        <Btn variant="ghost" size="sm" onClick={() => showToast(`已批量停用 ${sel.size} 项商品`)}>
          批量停用
        </Btn>
        <Btn variant="ghost" size="sm" icon="download" onClick={() => showToast(`已导出选中的 ${sel.size} 项商品`)}>
          批量导出
        </Btn>
      </Batch>

      {/* High Density ERP Master Data Table */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse min-w-[2100px]">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-semibold">
                <th className="p-3 w-10 text-center">
                  <input
                    type="checkbox"
                    checked={sel.size > 0 && sel.size === filteredProducts.length}
                    onChange={toggleAll}
                    className="accent-[#2563EB] cursor-pointer"
                  />
                </th>
                <th className="p-3 w-28 whitespace-nowrap">商品ID</th>
                <th className="p-3 min-w-[180px] whitespace-nowrap">商品名称</th>
                <th className="p-3 w-16 text-center whitespace-nowrap">主图</th>
                <th className="p-3 w-36 whitespace-nowrap">商品条码</th>
                <th className="p-3 w-24 whitespace-nowrap">品牌</th>
                <th className="p-3 w-20 whitespace-nowrap">分类</th>
                <th className="p-3 w-40 whitespace-nowrap">一级/二级类目</th>
                <th className="p-3 min-w-[140px] whitespace-nowrap">商品标签</th>
                <th className="p-3 w-24 whitespace-nowrap">规格</th>
                <th className="p-3 w-24 whitespace-nowrap">商品售价</th>
                <th className="p-3 w-20 whitespace-nowrap">保质期</th>
                <th className="p-3 w-24 whitespace-nowrap">上架状态</th>
                <th className="p-3 w-24 text-right whitespace-nowrap">点位动销</th>
                <th className="p-3 w-24 text-right whitespace-nowrap">商品动销</th>
                <th className="p-3 w-24 text-right whitespace-nowrap">在售件数</th>
                <th className="p-3 w-24 text-right whitespace-nowrap">总预存量</th>
                <th className="p-3 w-28 text-right whitespace-nowrap">总仓库库存量</th>
                <th className="p-3 w-28 text-right whitespace-nowrap">15日日均销量</th>
                <th className="p-3 w-28 text-right whitespace-nowrap">库存可用天数</th>
                <th className="p-3 w-36 whitespace-nowrap">发布时间</th>
                <th className="p-3 w-80 sticky right-0 bg-[#F8FAFC] z-10 border-l border-[#E2E8F0] text-center whitespace-nowrap shadow-[-4px_0_8px_rgba(0,0,0,0.03)]">
                  操作项
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9] text-[#334155]">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={22} className="py-12 text-center text-[#94A3B8]">
                    <Empty
                      icon="archive"
                      title="未找到匹配的商品档案"
                      desc="请尝试清空或重新调整搜条件后重试"
                      action={
                        <Btn variant="secondary" size="sm" onClick={handleReset}>
                          重置搜索条件
                        </Btn>
                      }
                    />
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => {
                  const isChecked = sel.has(p.id);
                  return (
                    <tr
                      key={p.id}
                      className={`hover:bg-[#F8FAFC] transition-colors ${isChecked ? "bg-[#EFF6FF]" : ""}`}
                    >
                      <td className="p-3 text-center">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggle(p.id)}
                          className="accent-[#2563EB] cursor-pointer"
                        />
                      </td>

                      {/* 商品ID */}
                      <td className="p-3 font-mono font-medium text-[#64748B]">{p.id}</td>

                      {/* 商品名称 */}
                      <td className="p-3">
                        <button
                          onClick={() => setDetailProduct(p)}
                          className="font-semibold text-[#0F172A] hover:text-[#2563EB] text-left hover:underline"
                        >
                          {p.name}
                        </button>
                      </td>

                      {/* 主图 */}
                      <td className="p-3 text-center">
                        <div
                          onClick={() =>
                            setPreviewImg({
                              url: p.img,
                              title: p.name,
                              barcode: p.barcode,
                              spec: p.spec,
                            })
                          }
                          className="relative w-9 h-9 mx-auto rounded border border-[#E2E8F0] overflow-hidden cursor-pointer group hover:border-[#2563EB] transition-colors"
                        >
                          <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white">
                            <Ic d={P.search} size={12} />
                          </div>
                        </div>
                      </td>

                      {/* 商品条码 */}
                      <td className="p-3 font-mono text-[#475569]">{p.barcode}</td>

                      {/* 品牌 */}
                      <td className="p-3 font-medium">{p.brand}</td>

                      {/* 分类 */}
                      <td className="p-3">{p.cat}</td>

                      {/* 一级/二级类目 */}
                      <td className="p-3 text-[#64748B] text-[11px]">{p.categoryCascade}</td>

                      {/* 商品标签 */}
                      <td className="p-3">
                        <div className="flex flex-wrap gap-1">
                          {p.tags.map((t, idx) => (
                            <Badge key={idx} label={t.label} color={t.color} />
                          ))}
                        </div>
                      </td>

                      {/* 规格 */}
                      <td className="p-3 text-[#64748B]">{p.spec}</td>

                      {/* 商品售价 */}
                      <td className="p-3 font-bold text-[#0F172A]">¥{p.price.toFixed(2)}</td>

                      {/* 保质期 */}
                      <td className="p-3 text-[#64748B]">{p.shelfLife}</td>

                      {/* 上架状态 */}
                      <td className="p-3">
                        {p.status === "启用" ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-[#F0FDF4] text-[#16A34A] border border-[#BBF7D0]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
                            启用
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]" />
                            禁用
                          </span>
                        )}
                      </td>

                      {/* 点位动销 */}
                      <td className="p-3 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <span className="font-semibold text-xs text-[#0284C7] min-w-[42px] text-right">
                            {p.pointTurnover.toFixed(1)}%
                          </span>
                          <div className="w-14 h-1.5 bg-[#E0F2FE] rounded-full overflow-hidden flex-shrink-0">
                            <div
                              className="h-full bg-[#0284C7] rounded-full transition-all"
                              style={{ width: `${p.pointTurnover}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* 商品动销 */}
                      <td className="p-3 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <span className="font-semibold text-xs text-[#16A34A] min-w-[42px] text-right">
                            {p.productTurnover.toFixed(1)}%
                          </span>
                          <div className="w-14 h-1.5 bg-[#DCFCE7] rounded-full overflow-hidden flex-shrink-0">
                            <div
                              className="h-full bg-[#16A34A] rounded-full transition-all"
                              style={{ width: `${p.productTurnover}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* 在售件数 */}
                      <td className="p-3 text-right font-semibold text-[#0F172A]">{p.inStockQty.toLocaleString()}</td>

                      {/* 总预存量 */}
                      <td className="p-3 text-right font-semibold text-[#475569]">{p.preStoreQty.toLocaleString()}</td>

                      {/* 总仓库库存量 */}
                      <td className="p-3 text-right font-bold text-[#0F172A]">{p.whStockQty.toLocaleString()}</td>

                      {/* 15日日均销量 */}
                      <td className="p-3 text-right font-bold text-[#D97706]">{p.avgDailySales15d}</td>

                      {/* 库存可用天数 */}
                      <td className="p-3 text-right font-semibold text-[#0F172A]">{p.availDays} 天</td>

                      {/* 发布时间 */}
                      <td className="p-3 text-[#64748B] text-[11px] whitespace-nowrap">{p.publishTime}</td>

                      {/* 操作项 (固定右侧) */}
                      <td className="p-3 sticky right-0 bg-white z-10 border-l border-[#E2E8F0] shadow-[-4px_0_8px_rgba(0,0,0,0.03)]">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => setDetailProduct(p)}
                            className="text-[#2563EB] hover:text-[#1D4ED8] hover:underline font-medium text-xs"
                          >
                            详情
                          </button>
                          <span className="text-[#CBD5E1]">|</span>
                          <button
                            onClick={() => setStockDistProduct(p)}
                            className="text-[#0891B2] hover:text-[#0e7490] hover:underline font-medium text-xs"
                          >
                            库存分布
                          </button>
                          <span className="text-[#CBD5E1]">|</span>
                          <button
                            onClick={() => onEdit(p.id)}
                            className="text-[#2563EB] hover:text-[#1D4ED8] hover:underline font-medium text-xs"
                          >
                            编辑
                          </button>
                          <span className="text-[#CBD5E1]">|</span>
                          <button
                            onClick={() => setConfirmStatusItem(p)}
                            className={`font-medium text-xs hover:underline ${
                              p.status === "启用" ? "text-[#DC2626] hover:text-[#B91C1C]" : "text-[#16A34A] hover:text-[#15803D]"
                            }`}
                          >
                            {p.status === "启用" ? "停用" : "启用"}
                          </button>
                          <span className="text-[#CBD5E1]">|</span>
                          {p.hasAlgoLaunch ? (
                            <button
                              onClick={() => setAlgoLaunchPageProduct(p)}
                              className="text-[#0891B2] hover:text-[#0e7490] hover:underline font-medium text-xs"
                            >
                              更新算法上新
                            </button>
                          ) : (
                            <button
                              onClick={() => setAlgoLaunchPageProduct(p)}
                              className="text-[#7C3AED] hover:text-[#6d28d9] hover:underline font-medium text-xs"
                            >
                              操作算法上新
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        <Pager total={filteredProducts.length} page={1} pageSize={10} />
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* MODAL 0: 库存分布情况 Modal */}
      {/* ───────────────────────────────────────────────────────────── */}
      {stockDistProduct && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" onClick={() => setStockDistProduct(null)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-[#0F172A]">库存分布情况</h3>
                <p className="text-xs text-[#64748B] mt-1">
                  {stockDistProduct.name} | 条码: {stockDistProduct.barcode} | 规格: {stockDistProduct.spec}
                </p>
              </div>
              <button
                onClick={() => setStockDistProduct(null)}
                className="text-[#94A3B8] hover:text-[#334155] p-1.5 rounded-full hover:bg-[#F1F5F9]"
              >
                <Ic d={P.x} size={20} />
              </button>
            </div>
            <div className="border border-[#E2E8F0] rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-left text-[11px] font-semibold text-[#64748B]">
                    <th className="px-4 py-2.5 whitespace-nowrap">仓库名称</th>
                    <th className="px-4 py-2.5 whitespace-nowrap text-right">商品总库存</th>
                    <th className="px-4 py-2.5 whitespace-nowrap text-right">商品可用库存</th>
                    <th className="px-4 py-2.5 whitespace-nowrap text-right">商品冻结库存</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F5F9] text-[#334155]">
                  {STOCK_DIST.map(s => (
                    <tr key={s.wh} className="hover:bg-[#F8FAFC] transition-colors">
                      <td className="px-4 py-2.5 font-medium text-[#0F172A] whitespace-nowrap">{s.wh}</td>
                      <td className="px-4 py-2.5 text-right font-semibold">{s.total.toLocaleString()}</td>
                      <td className="px-4 py-2.5 text-right text-[#16A34A] font-semibold">{s.avail.toLocaleString()}</td>
                      <td className="px-4 py-2.5 text-right text-[#D97706] font-semibold">{s.frozen.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-[#F8FAFC] border-t border-[#E2E8F0] font-semibold text-[#0F172A]">
                    <td className="px-4 py-2.5">合计</td>
                    <td className="px-4 py-2.5 text-right">12,400</td>
                    <td className="px-4 py-2.5 text-right text-[#16A34A]">11,000</td>
                    <td className="px-4 py-2.5 text-right text-[#D97706]">1,400</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="mt-4 flex justify-end">
              <Btn variant="secondary" size="sm" onClick={() => setStockDistProduct(null)}>关闭</Btn>
            </div>
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* MODAL 1: 主图放大预览 Modal */}
      {/* ───────────────────────────────────────────────────────────── */}
      {previewImg && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full relative shadow-2xl animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setPreviewImg(null)}
              className="absolute top-4 right-4 text-[#94A3B8] hover:text-[#334155] p-1.5 rounded-full hover:bg-[#F1F5F9]"
            >
              <Ic d={P.x} size={20} />
            </button>
            <h3 className="text-base font-bold text-[#0F172A] mb-1">{previewImg.title}</h3>
            <p className="text-xs text-[#64748B] mb-4">
              条码: {previewImg.barcode} | 规格: {previewImg.spec}
            </p>
            <div className="w-full h-80 bg-[#F8FAFC] rounded-xl overflow-hidden border border-[#E2E8F0] flex items-center justify-center">
              <img src={previewImg.url} alt={previewImg.title} className="max-w-full max-h-full object-contain" />
            </div>
            <div className="mt-4 flex justify-end">
              <Btn variant="secondary" size="sm" onClick={() => setPreviewImg(null)}>
                关闭预览
              </Btn>
            </div>
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* MODAL 2: 查看商品档案详情 Modal / Drawer */}
      {/* ───────────────────────────────────────────────────────────── */}
      {detailProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 flex justify-end">
          <div className="bg-white w-full max-w-2xl h-full shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
            <div className="px-6 py-4 border-b border-[#E2E8F0] flex items-center justify-between bg-[#F8FAFC]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#2563EB] bg-[#DBEAFE] px-2 py-0.5 rounded">
                    {detailProduct.id}
                  </span>
                  <h2 className="text-base font-bold text-[#0F172A]">{detailProduct.name}</h2>
                </div>
                <p className="text-xs text-[#64748B] mt-0.5">商品档案全维度主数据与运营分析</p>
              </div>
              <button
                onClick={() => setDetailProduct(null)}
                className="text-[#94A3B8] hover:text-[#334155] p-1.5 rounded-full hover:bg-[#E2E8F0]"
              >
                <Ic d={P.x} size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
              {/* Header card */}
              <div className="flex gap-4 p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
                <img
                  src={detailProduct.img}
                  alt={detailProduct.name}
                  className="w-20 h-20 rounded-lg object-cover border border-[#CBD5E1]"
                />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#0F172A]">{detailProduct.name}</span>
                    <Badge
                      label={detailProduct.status}
                      color={detailProduct.status === "启用" ? "green" : "red"}
                      dot
                    />
                  </div>
                  <div className="text-[#64748B]">条码: {detailProduct.barcode}</div>
                  <div className="text-[#64748B]">
                    品牌: {detailProduct.brand} | 规格: {detailProduct.spec}
                  </div>
                  <div className="flex gap-1 pt-1">
                    {detailProduct.tags.map((t, i) => (
                      <Badge key={i} label={t.label} color={t.color} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Core metrics */}
              <div className="grid grid-cols-4 gap-3">
                <div className="p-3 bg-[#EFF6FF] rounded-lg border border-[#BFDBFE] text-center">
                  <div className="text-[#2563EB] font-bold text-base">¥{detailProduct.price.toFixed(2)}</div>
                  <div className="text-[#64748B] text-[11px] mt-0.5">终端统一售价</div>
                </div>
                <div className="p-3 bg-[#F0FDF4] rounded-lg border border-[#BBF7D0] text-center">
                  <div className="text-[#16A34A] font-bold text-base">{detailProduct.pointTurnover.toFixed(1)}%</div>
                  <div className="text-[#64748B] text-[11px] mt-0.5">点位动销率</div>
                </div>
                <div className="p-3 bg-[#F5F3FF] rounded-lg border border-[#DDD6FE] text-center">
                  <div className="text-[#7C3AED] font-bold text-base">{detailProduct.productTurnover.toFixed(1)}%</div>
                  <div className="text-[#64748B] text-[11px] mt-0.5">商品动销率</div>
                </div>
                <div className="p-3 bg-[#FFF7ED] rounded-lg border border-[#FED7AA] text-center">
                  <div className="text-[#EA580C] font-bold text-base">{detailProduct.avgDailySales15d}</div>
                  <div className="text-[#64748B] text-[11px] mt-0.5">15日日均销量</div>
                </div>
              </div>

              {/* Detailed field grid */}
              <div className="border border-[#E2E8F0] rounded-xl overflow-hidden">
                <div className="px-4 py-2.5 bg-[#F8FAFC] border-b border-[#E2E8F0] font-bold text-[#334155]">
                  主数据属性定义
                </div>
                <div className="grid grid-cols-2 divide-x divide-y divide-[#F1F5F9] text-[#334155]">
                  <div className="p-3">
                    <span className="text-[#64748B]">一级/二级类目：</span>
                    <span className="font-medium">{detailProduct.categoryCascade}</span>
                  </div>
                  <div className="p-3">
                    <span className="text-[#64748B]">所属主分类：</span>
                    <span className="font-medium">{detailProduct.cat}</span>
                  </div>
                  <div className="p-3">
                    <span className="text-[#64748B]">保质期期限：</span>
                    <span className="font-medium">{detailProduct.shelfLife}</span>
                  </div>
                  <div className="p-3">
                    <span className="text-[#64748B]">发布上线时间：</span>
                    <span className="font-medium">{detailProduct.publishTime}</span>
                  </div>
                  <div className="p-3">
                    <span className="text-[#64748B]">算法自动上新：</span>
                    <span
                      className={`font-semibold ${
                        detailProduct.hasAlgoLaunch ? "text-[#16A34A]" : "text-[#D97706]"
                      }`}
                    >
                      {detailProduct.hasAlgoLaunch ? "已配置自动上新" : "未操作算法上新"}
                    </span>
                  </div>
                  <div className="p-3">
                    <span className="text-[#64748B]">首选供应商：</span>
                    <span className="font-medium">可口可乐（中国）授权供应链</span>
                  </div>
                </div>
              </div>

              {/* Inventory levels */}
              <div className="border border-[#E2E8F0] rounded-xl overflow-hidden">
                <div className="px-4 py-2.5 bg-[#F8FAFC] border-b border-[#E2E8F0] font-bold text-[#334155]">
                  全网三级库存数据
                </div>
                <div className="p-4 grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 bg-[#F8FAFC] rounded-lg">
                    <div className="text-base font-bold text-[#0F172A]">
                      {detailProduct.inStockQty.toLocaleString()}
                    </div>
                    <div className="text-[#64748B] text-[11px]">全柜在售总件数</div>
                  </div>
                  <div className="p-3 bg-[#F8FAFC] rounded-lg">
                    <div className="text-base font-bold text-[#475569]">
                      {detailProduct.preStoreQty.toLocaleString()}
                    </div>
                    <div className="text-[#64748B] text-[11px]">补货车总预存量</div>
                  </div>
                  <div className="p-3 bg-[#F8FAFC] rounded-lg">
                    <div className="text-base font-bold text-[#2563EB]">
                      {detailProduct.whStockQty.toLocaleString()}
                    </div>
                    <div className="text-[#64748B] text-[11px]">中心仓仓库库存</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-[#E2E8F0] bg-[#F8FAFC] flex items-center justify-between">
              <Btn
                variant="secondary"
                size="sm"
                onClick={() => {
                  setDetailProduct(null);
                  onEdit(detailProduct.id);
                }}
              >
                修改编辑档案
              </Btn>
              <Btn variant="primary" size="sm" onClick={() => setDetailProduct(null)}>
                关闭
              </Btn>
            </div>
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* MODAL 3: 启用 / 停用 状态切换二次确认弹窗 */}
      {/* ───────────────────────────────────────────────────────────── */}
      {confirmStatusItem && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-[#E2E8F0] animate-in zoom-in-95 duration-150">
            <div className="flex items-start gap-3 mb-4">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  confirmStatusItem.status === "启用" ? "bg-[#FEF2F2] text-[#DC2626]" : "bg-[#F0FDF4] text-[#16A34A]"
                }`}
              >
                <Ic d={P.alertTri} size={20} />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#0F172A]">
                  确认要{confirmStatusItem.status === "启用" ? "停用" : "启用"}该商品档案吗？
                </h3>
                <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
                  您正在对商品{" "}
                  <strong className="text-[#0F172A]">[{confirmStatusItem.name}]</strong> (条码:{" "}
                  {confirmStatusItem.barcode}) 执行
                  <strong className={confirmStatusItem.status === "启用" ? "text-[#DC2626]" : "text-[#16A34A]"}>
                    【{confirmStatusItem.status === "启用" ? "停用" : "启用"}】
                  </strong>
                  操作。
                  {confirmStatusItem.status === "启用" &&
                    " 停用后，补货算法将停止对该商品下发自动推荐上新与线路补货计划！"}
                </p>
              </div>
            </div>

            <div className="p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] text-xs text-[#64748B] mb-5 space-y-1">
              <div>• 商品ID: {confirmStatusItem.id}</div>
              <div>• 规格售价: {confirmStatusItem.spec} / ¥{confirmStatusItem.price.toFixed(2)}</div>
              <div>• 当前在售件数: {confirmStatusItem.inStockQty} 件</div>
            </div>

            <div className="flex justify-end gap-2">
              <Btn variant="secondary" size="sm" onClick={() => setConfirmStatusItem(null)}>
                取消
              </Btn>
              <Btn
                variant={confirmStatusItem.status === "启用" ? "danger" : "primary"}
                size="sm"
                onClick={() => handleToggleStatus(confirmStatusItem)}
              >
                确认{confirmStatusItem.status === "启用" ? "停用" : "启用"}
              </Btn>
            </div>
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* MODAL 4: 算法自动上新配置 Modal (操作算法上新 / 更新算法上新) */}
      {/* ───────────────────────────────────────────────────────────── */}
      {algoLaunchItem && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl border border-[#E2E8F0] animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0] mb-4">
              <div>
                <h3 className="text-base font-bold text-[#0F172A]">
                  {algoLaunchItem.hasAlgoLaunch ? "更新算法自动上新配置" : "操作算法自动上新"}
                </h3>
                <p className="text-xs text-[#64748B] mt-0.5">
                  设定智柜智能选品与 AI 自动推荐上新补货算法参数
                </p>
              </div>
              <button
                onClick={() => setAlgoLaunchItem(null)}
                className="text-[#94A3B8] hover:text-[#334155] p-1 rounded hover:bg-[#F1F5F9]"
              >
                <Ic d={P.x} size={18} />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Product Info Banner */}
              <div className="flex items-center gap-3 p-3 bg-[#F5F3FF] rounded-lg border border-[#DDD6FE]">
                <img
                  src={algoLaunchItem.img}
                  alt={algoLaunchItem.name}
                  className="w-12 h-12 rounded object-cover border border-[#C4B5FD]"
                />
                <div>
                  <div className="font-bold text-[#0F172A]">{algoLaunchItem.name}</div>
                  <div className="text-[#64748B] text-[11px]">
                    条码: {algoLaunchItem.barcode} | 15日日均销量: {algoLaunchItem.avgDailySales15d}
                  </div>
                </div>
              </div>

              {/* Form 1: 生效机型 */}
              <div>
                <label className="block font-semibold text-[#334155] mb-1.5">生效智能柜机型选择</label>
                <div className="flex flex-wrap gap-2">
                  {["智柜 Pro X8", "智柜 Mini S2", "双门重力柜 G6", "低温冷藏柜 C4"].map((model, idx) => (
                    <label
                      key={idx}
                      className="flex items-center gap-1.5 px-3 py-1.5 border border-[#CBD5E1] rounded-md bg-white cursor-pointer hover:border-[#2563EB]"
                    >
                      <input type="checkbox" defaultChecked={idx < 2} className="accent-[#2563EB]" />
                      <span>{model}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Form 2: 触发动销阈值 */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#334155] mb-1">自动推荐触达点位动销率 &gt;</label>
                  <select className="w-full p-2 border border-[#CBD5E1] rounded-md bg-white">
                    <option>&gt; 70% 动销点位</option>
                    <option>&gt; 80% 高频点位</option>
                    <option>&gt; 50% 全量点位</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-[#334155] mb-1">单柜默认补货预留件数</label>
                  <input
                    type="number"
                    defaultValue={6}
                    className="w-full p-2 border border-[#CBD5E1] rounded-md"
                  />
                </div>
              </div>

              {/* Form 3: AI 铺货优先级 */}
              <div>
                <label className="block font-semibold text-[#334155] mb-1">算法自动铺货优先级</label>
                <div className="grid grid-cols-3 gap-2">
                  <button className="py-2 border-2 border-[#2563EB] bg-[#EFF6FF] text-[#2563EB] font-bold rounded-lg text-center">
                    高 (优先上架)
                  </button>
                  <button className="py-2 border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#64748B] font-medium rounded-lg text-center">
                    中 (常规补充)
                  </button>
                  <button className="py-2 border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#64748B] font-medium rounded-lg text-center">
                    低 (末位替代)
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6 pt-3 border-t border-[#E2E8F0]">
              <Btn variant="secondary" size="sm" onClick={() => setAlgoLaunchItem(null)}>
                取消
              </Btn>
              <Btn variant="primary" size="sm" onClick={() => handleAlgoSubmit(algoLaunchItem)}>
                {algoLaunchItem.hasAlgoLaunch ? "保存更新算法上新" : "确认算法自动上新"}
              </Btn>
            </div>
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* MODAL 5: 批量新增商品档案 Modal */}
      {/* ───────────────────────────────────────────────────────────── */}
      {batchImportOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-[#E2E8F0]">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0] mb-4">
              <h3 className="text-base font-bold text-[#0F172A]">批量新增商品档案</h3>
              <button
                onClick={() => setBatchImportOpen(false)}
                className="text-[#94A3B8] hover:text-[#334155] p-1 rounded"
              >
                <Ic d={P.x} size={18} />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3 bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg text-[#2563EB] flex items-center justify-between">
                <span>下载标准 EXCEL 模板</span>
                <button
                  className="font-bold underline hover:text-[#1D4ED8]"
                  onClick={() => showToast("已开始下载标准商品档案模板.xlsx")}
                >
                  下载模板
                </button>
              </div>

              <div className="border-2 border-dashed border-[#CBD5E1] rounded-xl p-8 text-center bg-[#F8FAFC] hover:border-[#2563EB] hover:bg-[#EFF6FF]/20 transition-all cursor-pointer">
                <Ic d={P.upload} size={32} className="mx-auto text-[#94A3B8] mb-2" />
                <div className="font-semibold text-[#334155]">拖拽 EXCEL/CSV 文件至此处</div>
                <div className="text-[#94A3B8] text-[11px] mt-1">支持 .xlsx, .xls, .csv 格式 (单次上限 2000 条)</div>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Btn variant="secondary" size="sm" onClick={() => setBatchImportOpen(false)}>
                取消
              </Btn>
              <Btn
                variant="primary"
                size="sm"
                onClick={() => {
                  setBatchImportOpen(false);
                  showToast("成功导入 15 项新商品档案！");
                }}
              >
                开始解析导入
              </Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// PAGE 2 – PRODUCT ARCHIVE FORM (新增/编辑商品档案页)
// ══════════════════════════════════════════════════════════════════════════════
export const ProductArchiveForm = ({ onBack, isEdit = false }: { onBack: () => void; isEdit?: boolean }) => {
  // Field States - Group 1: 基本信息
  const [productId] = useState(isEdit ? "PRD-10081" : "PRD-10089");
  const [name, setName] = useState(isEdit ? "可口可乐 330ml 摩登罐" : "");
  const [barcode, setBarcode] = useState(isEdit ? "6901028001015" : "");
  const [brand, setBrand] = useState(isEdit ? "可口可乐" : "");
  const [imgUrl, setImgUrl] = useState(
    isEdit ? "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=150&auto=format&fit=crop&q=80" : ""
  );
  const [price, setPrice] = useState(isEdit ? "4.50" : "");
  const [category, setCategory] = useState(isEdit ? "饮料" : "饮料");
  const [primaryCat, setPrimaryCategory] = useState(isEdit ? "软饮料" : "软饮料");
  const [secondaryCat, setSecondaryCategory] = useState(isEdit ? "碳酸饮料" : "碳酸饮料");
  const [selectedTags, setSelectedTags] = useState<string[]>(isEdit ? ["畅销", "爆款"] : ["畅销"]);
  const [spec, setSpec] = useState(isEdit ? "330ml/罐" : "");
  const [unitType, setUnitType] = useState(isEdit ? "瓶" : "瓶");
  const [customUnit, setCustomUnit] = useState("");
  const [boxSize, setBoxSize] = useState(isEdit ? "24" : "");
  const [netWeight, setNetWeight] = useState(isEdit ? "330" : "");
  const [shelfLifeNum, setShelfLifeNumber] = useState(isEdit ? "180" : "");
  const [storageCondition, setStorageCondition] = useState(isEdit ? "常温" : "常温");

  // Field States - Group 2: 采购信息
  const [costPrice, setCostPrice] = useState(isEdit ? "2.20" : "");
  const [boxCostPrice, setBoxCostPrice] = useState(isEdit ? "52.80" : "");
  const [selectedSuppliers, setSelectedSuppliers] = useState<string[]>(
    isEdit ? ["S001", "S002"] : ["S001"]
  );
  const [rebateAmount, setRebateAmount] = useState(isEdit ? "0.15" : "0.00");
  const [fixedFee, setFixedFee] = useState(isEdit ? "500.00" : "0.00");

  // Field States - Group 3: 商品运营信息
  const [recommendStar, setRecommendStar] = useState(isEdit ? "5星 - 重点推荐" : "4星 - 优先上架");
  const [targetQty, setTargetQty] = useState(isEdit ? "1200" : "500");
  const [targetPoints, setTargetPoints] = useState(isEdit ? "150" : "50");
  const [remark, setRemark] = useState(isEdit ? "华南区核心写字楼点位优先上架款" : "");

  // Validation & Modal States
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  // Categories & Options Data
  const MAIN_CATEGORIES = ["饮料", "零食", "速食", "乳品", "烘焙", "水果", "冲调"];
  const PRIMARY_CAT_MAP: Record<string, string[]> = {
    饮料: ["软饮料", "饮用水", "功能饮料", "果汁饮料"],
    零食: ["休闲食品", "坚果炒货", "肉干肉脯", "糖果巧克力"],
    速食: ["方便速食", "自热食品", "罐头食品"],
    乳品: ["乳制品", "低温酸奶", "常温奶"],
  };
  const SECONDARY_CAT_MAP: Record<string, string[]> = {
    软饮料: ["碳酸饮料", "气泡水", "茶饮料", "凉茶饮料"],
    饮用水: ["矿泉水", "纯净水", "天然水"],
    休闲食品: ["膨化零食", "饼干糕点", "海味零食"],
    方便速食: ["自热米饭", "方便面", "螺蛳粉"],
    乳制品: ["低温酸奶", "鲜牛奶", "风味发酵乳"],
  };

  const ALL_TAGS = ["畅销", "爆款", "新品", "高毛利", "促销", "推荐", "季节限定"];

  // Compute Risk Level from Shelf Life
  const calculateRiskLevel = () => {
    if (!shelfLifeNum || isNaN(Number(shelfLifeNum))) return { label: "未知风险", color: "gray" as BC };
    const days = Number(shelfLifeNum);

    if (days <= 30) {
      return { label: "高风险 (短效期/易变质品)", color: "red" as BC };
    } else if (days <= 180) {
      return { label: "中风险 (常规常温/半长效品)", color: "yellow" as BC };
    } else {
      return { label: "低风险 (长效期/高稳定性品)", color: "green" as BC };
    }
  };

  const riskInfo = calculateRiskLevel();

  // Multi-supplier selection toggle
  const toggleSupplier = (suppId: string) => {
    setSelectedSuppliers((prev) =>
      prev.includes(suppId) ? prev.filter((id) => id !== suppId) : [...prev, suppId]
    );
  };

  // Tag selection toggle
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  };

  // Validate form fields
  const validateForm = () => {
    const errs: Record<string, string> = {};

    if (!name.trim()) errs.name = "商品名称为必填项";
    if (!barcode.trim()) errs.barcode = "商品条码为必填项";
    if (!brand.trim()) errs.brand = "品牌为必填项";
    if (!imgUrl) errs.img = "请上传商品主图";
    if (!price || isNaN(Number(price))) errs.price = "请输入有效的销售价格";
    if (!spec.trim()) errs.spec = "规格为必填项";
    if (unitType === "其他" && !customUnit.trim()) errs.unit = "请输入自定义计量单位";
    if (!boxSize || isNaN(Number(boxSize))) errs.boxSize = "最小箱规需为有效数字";
    if (!netWeight || isNaN(Number(netWeight))) errs.netWeight = "净重需为有效数字";
    if (!shelfLifeNum || isNaN(Number(shelfLifeNum))) errs.shelfLife = "保质期需为有效正整数";
    if (!costPrice || isNaN(Number(costPrice))) errs.costPrice = "请输入有效的成本价";
    if (selectedSuppliers.length === 0) errs.suppliers = "请至少选择 1 家供应商";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Submit handler
  const handleSubmit = () => {
    if (validateForm()) {
      setToastMsg(`商品档案 [${name}] 保存成功！`);
      setTimeout(() => {
        onBack();
      }, 1200);
    } else {
      setToastMsg("表单存在必填项未填写或格式不正确，请检查！");
      setTimeout(() => setToastMsg(""), 3000);
    }
  };

  return (
    <div className="space-y-4 max-w-6xl mx-auto pb-12">
      {/* Toast */}
      {toastMsg && (
        <div className="fixed top-5 right-5 z-50 bg-[#0F172A] text-white px-4 py-3 rounded-lg shadow-xl text-sm flex items-center gap-2 border border-[#334155] animate-bounce">
          <Ic d={P.info} size={16} className="text-[#38BDF8]" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowCancelModal(true)}
            className="p-1.5 text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] rounded-lg transition-colors"
          >
            <Ic d={P.chevL} size={20} />
          </button>
          <div>
            <h1 className="text-lg font-bold text-[#0F172A]">
              {isEdit ? `编辑商品档案 · ${productId}` : "新增商品档案"}
            </h1>
            <p className="text-xs text-[#64748B]">完善商品主数据属性、采购成本及智柜运营预设参数</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Btn variant="secondary" onClick={() => setShowCancelModal(true)}>
            取消
          </Btn>
          <Btn variant="primary" icon="check" onClick={handleSubmit}>
            提交档案
          </Btn>
        </div>
      </div>

      {/* Form Error Banner */}
      {Object.keys(errors).length > 0 && (
        <div className="p-3 bg-[#FEF2F2] border border-[#FECACA] rounded-xl text-xs text-[#DC2626] flex items-center gap-2">
          <Ic d={P.alertTri} size={16} />
          <span>
            表单共有 {Object.keys(errors).length} 处校验未通过，请检查标记为红色的字段后重新提交。
          </span>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* GROUP 1: 基本信息 */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 bg-[#F8FAFC] border-b border-[#E2E8F0] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#2563EB]" />
            <h2 className="text-sm font-bold text-[#0F172A]">基本信息</h2>
          </div>
          <span className="text-xs text-[#64748B]">商品基础主数据唯一身份与物理规格属性</span>
        </div>

        <div className="p-5 space-y-4 text-xs">
          {/* Row 1: 商品ID (Readonly), 商品名称, 商品条码, 品牌 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block font-semibold text-[#475569] mb-1">
                商品ID <span className="text-[#94A3B8] font-normal">(系统自动生成)</span>
              </label>
              <input
                type="text"
                value={productId}
                readOnly
                className="w-full px-3 py-2 bg-[#F1F5F9] border border-[#CBD5E1] rounded-lg text-[#64748B] font-mono cursor-not-allowed select-none font-bold"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-semibold text-[#334155] mb-1">
                商品名称 <span className="text-[#DC2626]">*</span>
              </label>
              <input
                type="text"
                maxLength={100}
                placeholder="例如：可口可乐 330ml 摩登罐 (最长100字)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB] ${
                  errors.name ? "border-[#DC2626] bg-[#FEF2F2]" : "border-[#CBD5E1]"
                }`}
              />
              {errors.name && <p className="text-[11px] text-[#DC2626] mt-0.5">{errors.name}</p>}
            </div>

            <div>
              <label className="block font-semibold text-[#334155] mb-1">
                商品条码 (69码) <span className="text-[#DC2626]">*</span>
              </label>
              <input
                type="text"
                maxLength={30}
                placeholder="支持69码/EAN13扫描输入"
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                className={`w-full px-3 py-2 border font-mono rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB] ${
                  errors.barcode ? "border-[#DC2626] bg-[#FEF2F2]" : "border-[#CBD5E1]"
                }`}
              />
              {errors.barcode && <p className="text-[11px] text-[#DC2626] mt-0.5">{errors.barcode}</p>}
            </div>
          </div>

          {/* Row 2: 品牌, 商品主图上传, 售价 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
            <div>
              <label className="block font-semibold text-[#334155] mb-1">
                品牌 <span className="text-[#DC2626]">*</span>
              </label>
              <input
                type="text"
                maxLength={50}
                placeholder="例如：可口可乐 / 农夫山泉"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB] ${
                  errors.brand ? "border-[#DC2626] bg-[#FEF2F2]" : "border-[#CBD5E1]"
                }`}
              />
              {errors.brand && <p className="text-[11px] text-[#DC2626] mt-0.5">{errors.brand}</p>}
            </div>

            <div>
              <label className="block font-semibold text-[#334155] mb-1">
                售价 (元) <span className="text-[#DC2626]">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-[#94A3B8] font-bold">¥</span>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className={`w-full pl-7 pr-3 py-2 border font-bold text-[#0F172A] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB] ${
                    errors.price ? "border-[#DC2626] bg-[#FEF2F2]" : "border-[#CBD5E1]"
                  }`}
                />
              </div>
              {errors.price && <p className="text-[11px] text-[#DC2626] mt-0.5">{errors.price}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block font-semibold text-[#334155] mb-1">
                商品主图 <span className="text-[#DC2626]">*</span>
              </label>
              <div className="flex items-center gap-3">
                {imgUrl ? (
                  <div className="relative w-16 h-16 rounded-lg border border-[#CBD5E1] overflow-hidden flex-shrink-0 group">
                    <img src={imgUrl} alt="主图" className="w-full h-full object-cover" />
                    <button
                      onClick={() => setImgUrl("")}
                      className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Ic d={P.x} size={16} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() =>
                      setImgUrl("https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=150&auto=format&fit=crop&q=80")
                    }
                    className={`w-16 h-16 border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-[#94A3B8] hover:border-[#2563EB] hover:text-[#2563EB] transition-colors ${
                      errors.img ? "border-[#DC2626] bg-[#FEF2F2]" : "border-[#CBD5E1]"
                    }`}
                  >
                    <Ic d={P.upload} size={18} />
                    <span className="text-[10px] mt-0.5">选择上传</span>
                  </button>
                )}
                <div className="text-[11px] text-[#64748B] space-y-0.5">
                  <div>• 支持 JPG/PNG/WEBP 格式，建议 800×800 像素白底图</div>
                  <div>• 点击“选择上传”模拟本地文件选取并预览</div>
                  {errors.img && <div className="text-[#DC2626] font-medium">{errors.img}</div>}
                </div>
              </div>
            </div>
          </div>

          {/* Row 3: 分类, 类目 (级联: 一级/二级) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-[#F1F5F9]">
            <div>
              <label className="block font-semibold text-[#334155] mb-1">
                分类 <span className="text-[#DC2626]">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  const pCats = PRIMARY_CAT_MAP[e.target.value] || ["通用类目"];
                  setPrimaryCategory(pCats[0]);
                  setSecondaryCategory(SECONDARY_CAT_MAP[pCats[0]]?.[0] || "");
                }}
                className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
              >
                {MAIN_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-[#334155] mb-1">
                一级类目 <span className="text-[#DC2626]">*</span>
              </label>
              <select
                value={primaryCat}
                onChange={(e) => {
                  setPrimaryCategory(e.target.value);
                  const sCats = SECONDARY_CAT_MAP[e.target.value] || [];
                  setSecondaryCategory(sCats[0] || "");
                }}
                className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
              >
                {(PRIMARY_CAT_MAP[category] || ["通用类目"]).map((pc) => (
                  <option key={pc} value={pc}>
                    {pc}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-[#334155] mb-1">
                二级类目 <span className="text-[#94A3B8] font-normal">(非必须)</span>
              </label>
              <select
                value={secondaryCat}
                onChange={(e) => setSecondaryCategory(e.target.value)}
                className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
              >
                <option value="">(不选二级子类目)</option>
                {(SECONDARY_CAT_MAP[primaryCat] || []).map((sc) => (
                  <option key={sc} value={sc}>
                    {sc}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 4: 商品标签 (手选) */}
          <div>
            <label className="block font-semibold text-[#334155] mb-1">
              商品标签 <span className="text-[#94A3B8] font-normal">(非必填 · 人工手选)</span>
            </label>
            <div className="flex flex-wrap gap-2 items-center">
              {ALL_TAGS.map((t) => {
                const isSelected = selectedTags.includes(t);
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => toggleTag(t)}
                    className={`px-3 py-1 rounded-full border text-xs transition-all ${
                      isSelected
                        ? "bg-[#2563EB] text-white border-[#2563EB] shadow-sm font-semibold"
                        : "bg-[#F8FAFC] text-[#64748B] border-[#CBD5E1] hover:bg-[#F1F5F9]"
                    }`}
                  >
                    {isSelected && "✓ "}
                    {t}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Row 5: 规格, 计量单位, 最小箱规, 净重 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2 border-t border-[#F1F5F9]">
            <div>
              <label className="block font-semibold text-[#334155] mb-1">
                规格 <span className="text-[#DC2626]">*</span>
              </label>
              <input
                type="text"
                maxLength={50}
                placeholder="如：500ml / 75g"
                value={spec}
                onChange={(e) => setSpec(e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB] ${
                  errors.spec ? "border-[#DC2626] bg-[#FEF2F2]" : "border-[#CBD5E1]"
                }`}
              />
              {errors.spec && <p className="text-[11px] text-[#DC2626] mt-0.5">{errors.spec}</p>}
            </div>

            <div>
              <label className="block font-semibold text-[#334155] mb-1">
                计量单位 <span className="text-[#DC2626]">*</span>
              </label>
              <div className="flex gap-2">
                <select
                  value={unitType}
                  onChange={(e) => setUnitType(e.target.value)}
                  className="w-full px-2.5 py-2 border border-[#CBD5E1] rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
                >
                  {["个", "瓶", "袋", "盒", "箱", "其他"].map((u) => (
                    <option key={u} value={u}>
                      {u}
                    </option>
                  ))}
                </select>
                {unitType === "其他" && (
                  <input
                    type="text"
                    placeholder="输入单位"
                    value={customUnit}
                    onChange={(e) => setCustomUnit(e.target.value)}
                    className="w-24 px-2 py-2 border border-[#CBD5E1] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
                  />
                )}
              </div>
            </div>

            <div>
              <label className="block font-semibold text-[#334155] mb-1">
                最小箱规 (件) <span className="text-[#DC2626]">*</span>
              </label>
              <input
                type="number"
                placeholder="如：24"
                value={boxSize}
                onChange={(e) => setBoxSize(e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB] ${
                  errors.boxSize ? "border-[#DC2626] bg-[#FEF2F2]" : "border-[#CBD5E1]"
                }`}
              />
              {errors.boxSize && <p className="text-[11px] text-[#DC2626] mt-0.5">{errors.boxSize}</p>}
            </div>

            <div>
              <label className="block font-semibold text-[#334155] mb-1">
                净重 (克/g) <span className="text-[#DC2626]">*</span>
              </label>
              <input
                type="number"
                placeholder="如：330"
                value={netWeight}
                onChange={(e) => setNetWeight(e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB] ${
                  errors.netWeight ? "border-[#DC2626] bg-[#FEF2F2]" : "border-[#CBD5E1]"
                }`}
              />
              {errors.netWeight && <p className="text-[11px] text-[#DC2626] mt-0.5">{errors.netWeight}</p>}
            </div>
          </div>

          {/* Row 6: 保质期, 风险等级 (只读映射), 储存条件 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-[#F1F5F9]">
            <div>
              <label className="block font-semibold text-[#334155] mb-1">
                保质期 <span className="text-[#DC2626]">*</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="正整数（天）"
                  value={shelfLifeNum}
                  onChange={(e) => setShelfLifeNumber(e.target.value)}
                  className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB] ${
                    errors.shelfLife ? "border-[#DC2626] bg-[#FEF2F2]" : "border-[#CBD5E1]"
                  }`}
                />
                <span className="w-20 px-2 py-2 border border-[#CBD5E1] rounded-lg bg-[#F1F5F9] text-[#64748B] text-center select-none">天</span>
              </div>
              {errors.shelfLife && <p className="text-[11px] text-[#DC2626] mt-0.5">{errors.shelfLife}</p>}
            </div>

            <div>
              <label className="block font-semibold text-[#334155] mb-1">
                风险等级 <span className="text-[#94A3B8] font-normal">(根据保质期范围映射)</span>
              </label>
              <div className="px-3 py-2 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg flex items-center justify-between">
                <Badge label={riskInfo.label} color={riskInfo.color} dot />
                <span className="text-[11px] text-[#94A3B8]">自动映射判定</span>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-[#334155] mb-1">储存条件</label>
              <select
                value={storageCondition}
                onChange={(e) => setStorageCondition(e.target.value)}
                className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
              >
                <option value="常温">常温</option>
                <option value="冷藏">冷藏 (2~8°C)</option>
                <option value="冷冻">冷冻 (≤-18°C)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* GROUP 2: 采购信息 */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 bg-[#F8FAFC] border-b border-[#E2E8F0] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#16A34A]" />
            <h2 className="text-sm font-bold text-[#0F172A]">采购信息</h2>
          </div>
          <span className="text-xs text-[#64748B]">供应商采购合作条约与成本核算参数</span>
        </div>

        <div className="p-5 space-y-4 text-xs">
          {/* Row 1: 成本价, 单箱成本价, 供应商多选 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block font-semibold text-[#334155] mb-1">
                单件成本价 (元) <span className="text-[#DC2626]">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-[#94A3B8] font-bold">¥</span>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={costPrice}
                  onChange={(e) => setCostPrice(e.target.value)}
                  className={`w-full pl-7 pr-3 py-2 border font-bold text-[#0F172A] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB] ${
                    errors.costPrice ? "border-[#DC2626] bg-[#FEF2F2]" : "border-[#CBD5E1]"
                  }`}
                />
              </div>
              {errors.costPrice && <p className="text-[11px] text-[#DC2626] mt-0.5">{errors.costPrice}</p>}
            </div>

            <div>
              <label className="block font-semibold text-[#334155] mb-1">
                单箱成本价 (元) <span className="text-[#94A3B8] font-normal">(选填)</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-[#94A3B8] font-bold">¥</span>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={boxCostPrice}
                  onChange={(e) => setBoxCostPrice(e.target.value)}
                  className="w-full pl-7 pr-3 py-2 border border-[#CBD5E1] font-bold text-[#0F172A] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block font-semibold text-[#334155] mb-1">
                供应商 <span className="text-[#DC2626]">*</span>{" "}
                <span className="text-[#94A3B8] font-normal">(支持可多选)</span>
              </label>
              <div className="flex flex-wrap gap-2 p-2 border border-[#CBD5E1] rounded-lg bg-[#F8FAFC] min-h-[42px] items-center">
                {SUPPLIERS.map((s) => {
                  const isChecked = selectedSuppliers.includes(s.id);
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => toggleSupplier(s.id)}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-all flex items-center gap-1.5 ${
                        isChecked
                          ? "bg-[#F0FDF4] text-[#16A34A] border-[#BBF7D0] shadow-sm"
                          : "bg-white text-[#64748B] border-[#CBD5E1] hover:bg-[#F1F5F9]"
                      }`}
                    >
                      <input type="checkbox" checked={isChecked} readOnly className="accent-[#16A34A] w-3 h-3" />
                      <span>{s.short}</span>
                      <span className="text-[10px] opacity-70">({s.type})</span>
                    </button>
                  );
                })}
              </div>
              {errors.suppliers && <p className="text-[11px] text-[#DC2626] mt-0.5">{errors.suppliers}</p>}
            </div>
          </div>

          {/* Row 2: 单件商品返点金额, 固定费用 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-[#F1F5F9]">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-semibold text-[#334155]">单件商品返点金额 (元)</label>
                <span className="text-[10px] text-[#D97706] bg-[#FFFBEB] px-1.5 py-0.5 rounded border border-[#FDE68A]">
                  弱提示：需沟通是否必须，若无可填 0
                </span>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-2 text-[#94A3B8]">¥</span>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={rebateAmount}
                  onChange={(e) => setRebateAmount(e.target.value)}
                  className="w-full pl-7 pr-3 py-2 border border-[#CBD5E1] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-[#334155] mb-1">固定费用 (元)</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-[#94A3B8]">¥</span>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={fixedFee}
                  onChange={(e) => setFixedFee(e.target.value)}
                  className="w-full pl-7 pr-3 py-2 border border-[#CBD5E1] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* GROUP 3: 商品运营信息 */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 bg-[#F8FAFC] border-b border-[#E2E8F0] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#7C3AED]" />
            <h2 className="text-sm font-bold text-[#0F172A]">商品运营信息</h2>
          </div>
          <span className="text-xs text-[#64748B]">智能柜选品推荐等级与铺货目标预设</span>
        </div>

        <div className="p-5 space-y-4 text-xs">
          {/* Row 1: 商品部推荐指数, 目标数量, 目标上架点位数 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-[#334155] mb-1">商品部推荐指数</label>
              <select
                value={recommendStar}
                onChange={(e) => setRecommendStar(e.target.value)}
                className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-[#2563EB] font-medium text-[#7C3AED]"
              >
                <option value="5星 - 重点推荐">5星 - 重点推荐 (全网优先排期)</option>
                <option value="4星 - 优先上架">4星 - 优先上架 (高频写字楼补货)</option>
                <option value="3星 - 常规动销">3星 - 常规动销 (按需补货)</option>
                <option value="2星 - 试销拓展">2星 - 试销拓展 (新区域测款)</option>
                <option value="1星 - 观望">1星 - 观望 (暂不主动推荐)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-[#334155] mb-1">目标数量 (件)</label>
              <input
                type="number"
                placeholder="例如：1000"
                value={targetQty}
                onChange={(e) => setTargetQty(e.target.value)}
                className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#334155] mb-1">目标上架点位数</label>
              <input
                type="number"
                placeholder="例如：100"
                value={targetPoints}
                onChange={(e) => setTargetPoints(e.target.value)}
                className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
              />
            </div>
          </div>

          {/* Row 2: 备注 */}
          <div className="pt-2 border-t border-[#F1F5F9]">
            <div className="flex items-center justify-between mb-1">
              <label className="font-semibold text-[#334155]">备注</label>
              <span className="text-[11px] text-[#94A3B8]">{remark.length} / 200字</span>
            </div>
            <textarea
              maxLength={200}
              rows={3}
              placeholder="请输入商品运营注意事项、配送特殊说明等 (最长200字)"
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              className="w-full p-3 border border-[#CBD5E1] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB] text-xs resize-none"
            />
          </div>
        </div>
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="p-4 bg-white rounded-xl border border-[#E2E8F0] shadow-md flex items-center justify-between sticky bottom-4 z-20">
        <div className="flex items-center gap-2 text-xs text-[#64748B]">
          <Ic d={P.info} size={16} className="text-[#2563EB]" />
          <span>带有 <span className="text-[#DC2626] font-bold">*</span> 标识的为必填字段，提交前请确认信息准确无误。</span>
        </div>
        <div className="flex items-center gap-3">
          <Btn variant="secondary" onClick={() => setShowCancelModal(true)}>
            取消
          </Btn>
          <Btn variant="primary" icon="check" onClick={handleSubmit}>
            提交档案
          </Btn>
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-[#E2E8F0] animate-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 mb-3 text-[#DC2626]">
              <div className="w-9 h-9 rounded-full bg-[#FEF2F2] flex items-center justify-center flex-shrink-0">
                <Ic d={P.alertTri} size={20} />
              </div>
              <h3 className="text-base font-bold text-[#0F172A]">确认要取消操作吗？</h3>
            </div>
            <p className="text-xs text-[#64748B] mb-5 leading-relaxed">
              取消后本次填写的商品基础信息、采购参数及运营配置将不会被保存。确定要退出新增操作吗？
            </p>
            <div className="flex justify-end gap-2">
              <Btn variant="secondary" size="sm" onClick={() => setShowCancelModal(false)}>
                继续编辑
              </Btn>
              <Btn
                variant="danger"
                size="sm"
                onClick={() => {
                  setShowCancelModal(false);
                  onBack();
                }}
              >
                确定取消
              </Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// PAGE 3 – PRICE TEMPLATE LIST
// ══════════════════════════════════════════════════════════════════════════════
export const PriceTemplateList = ({ onEdit }: { onEdit:(id?:string)=>void }) => (
  <div>
    <PH title="价格模板" crumbs={["首页","ERP管理","价格模板"]}
      actions={<Btn variant="primary" icon="plus" onClick={()=>onEdit()}>新建价格模板</Btn>}
    />
    <AB type="info" msg="价格模板按优先级从高到低依次匹配。商品最终执行价 = 第一条命中模板的价格；若未命中任何模板则使用商品档案默认零售价。" />

    {/* Priority flow diagram */}
    <Card className="mb-4 !p-4">
      <div className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-3">价格匹配链路（优先级从高到低）</div>
      <div className="flex items-center gap-1 overflow-x-auto pb-1">
        {["P1 · 客户专属价","P2 · 区域价","P3 · 场景价","P4 · 促销价","P5 · 档案默认零售价"].map((s,i,arr)=>(
          <div key={i} className="flex items-center flex-shrink-0">
            <div className={`px-3 py-2 rounded text-xs font-medium border whitespace-nowrap
              ${i===0?"bg-[#FEF3C7] text-[#D97706] border-[#FDE68A]":
                i===1?"bg-[#EFF6FF] text-[#2563EB] border-[#BFDBFE]":
                i===4?"bg-[#F8FAFC] text-[#94A3B8] border-[#E2E8F0]":
                "bg-[#F8FAFC] text-[#64748B] border-[#E2E8F0]"}`}>
              {s}
            </div>
            {i<arr.length-1&&<Ic d={P.chevR} size={14} className="text-[#CBD5E1] mx-1" />}
          </div>
        ))}
        <span className="ml-2 text-xs text-[#94A3B8] flex-shrink-0">命中即停止</span>
      </div>
    </Card>

    <div className="space-y-3">
      {PT_LIST.map((t,i)=>(
        <Card key={t.id} className="hover:shadow-md transition-shadow">
          <div className="flex items-start gap-4">
            {/* Priority badge */}
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0
              ${i===0?"bg-[#FEF3C7] text-[#D97706]":i===1?"bg-[#EFF6FF] text-[#2563EB]":i===2?"bg-[#F5F3FF] text-[#7C3AED]":"bg-[#F8FAFC] text-[#94A3B8]"}`}>
              P{t.priority}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-base font-semibold text-[#0F172A]">{t.name}</span>
                <Badge label={t.status} dot color={t.status==="启用"?"green":"gray"} />
                <Badge label={t.type} color="blue" />
              </div>
              <div className="flex flex-wrap gap-5 text-sm text-[#64748B] mb-1.5">
                <span>适用区域：<strong className="text-[#334155]">{t.scope}</strong></span>
                <span>适用对象：<strong className="text-[#334155]">{t.target}</strong></span>
                <span>覆盖 SKU：<strong className="text-[#334155]">{t.skus} 种</strong></span>
                <span>更新时间：<strong className="text-[#334155]">{t.updated}</strong></span>
              </div>
              <p className="text-xs text-[#94A3B8]">{t.desc}</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <Btn variant="ghost" size="sm">查看明细</Btn>
              <Btn variant="ghost" size="sm" icon="edit" onClick={()=>onEdit(t.id)}>编辑</Btn>
              <Btn variant="ghost" size="sm" icon="copy">复制</Btn>
              {t.status==="启用"
                ? <Btn variant="ghost" size="sm" className="!text-[#D97706]">停用</Btn>
                : <Btn variant="ghost" size="sm" className="!text-[#16A34A]">启用</Btn>}
            </div>
          </div>
        </Card>
      ))}
      <button onClick={()=>onEdit()} className="w-full p-4 border-2 border-dashed border-[#E2E8F0] rounded-lg text-sm text-[#94A3B8] hover:border-[#2563EB] hover:text-[#2563EB] flex items-center justify-center gap-2 transition-all">
        <Ic d={P.plus} size={14} />新建价格模板
      </button>
    </div>
  </div>
);

// ══════════════════════════════════════════════════════════════════════════════
// PAGE 4 – PRICE TEMPLATE FORM
// ══════════════════════════════════════════════════════════════════════════════
export const PriceTemplateForm = ({ onBack, isEdit=false }: { onBack:()=>void; isEdit?:boolean }) => {
  const [priceType, setPriceType] = useState("fixed");
  const lines = [
    {id:1,sku:"SKU-DRINK-001",name:"可口可乐 330ml",cat:"饮料",base:4.50,type:"fixed",val:4.28,margin:"-5%"},
    {id:2,sku:"SKU-DRINK-005",name:"农夫山泉矿泉水 550ml",cat:"饮料",base:2.50,type:"discount",val:2.38,margin:"-5%"},
    {id:3,sku:"SKU-SNACK-012",name:"乐事薯片原味 75g",cat:"零食",base:6.90,type:"fixed",val:6.50,margin:"-5.8%"},
    {id:4,sku:"SKU-DRINK-033",name:"元气森林苏打气泡水",cat:"饮料",base:5.00,type:"market",val:5.00,margin:"0%"},
    {id:5,sku:"SKU-MEAL-003",name:"自热米饭红烧牛肉",cat:"速食",base:19.90,type:"fixed",val:18.90,margin:"-5%"},
  ];

  return (
    <div>
      <PH title={isEdit?"编辑价格模板":"新建价格模板"}
        crumbs={["首页","ERP管理","价格模板",isEdit?"编辑":"新建"]}
        actions={<Btn variant="secondary" icon="chevL" onClick={onBack}>返回列表</Btn>}
      />

      <div className="grid grid-cols-3 gap-4">
        {/* Left: Config panel */}
        <div className="space-y-4">
          <SC title="模板基础配置" icon="sliders" iconColor="#2563EB">
            <div className="space-y-4">
              <FR label="模板名称" required><Inp placeholder="如：华南区写字楼标准价格表" /></FR>
              <FR label="价格类型" required>
                <Sel options={[{label:"区域价",value:"region"},{label:"客户专属价",value:"customer"},{label:"场景价",value:"scene"},{label:"促销价",value:"promo"}]} />
              </FR>
              <FR label="优先级" required hint="数值越小优先级越高，建议填写 1~10">
                <Inp placeholder="1" type="number" />
              </FR>
              <FR label="全局价格策略" hint="对未单独配置的 SKU 统一处理">
                <Sel options={[
                  {label:"沿用档案零售价（不调整）",value:"keep"},
                  {label:"统一下浮 5%",value:"d5"},
                  {label:"统一下浮 8%",value:"d8"},
                  {label:"统一上浮 3%",value:"u3"},
                  {label:"逐一手动配置",value:"manual"},
                ]} onChange={v=>setPriceType(v)} />
              </FR>
              <FR label="启用状态">
                <Sel options={[{label:"启用",value:"active"},{label:"停用（草稿）",value:"off"}]} />
              </FR>
              <FR label="有效期" hint="不填则永久有效">
                <div className="flex flex-col gap-2">
                  <input type="date" className="h-9 w-full border border-[#E2E8F0] rounded-md text-sm px-3 text-[#334155] focus:outline-none focus:border-[#2563EB]" />
                  <input type="date" className="h-9 w-full border border-[#E2E8F0] rounded-md text-sm px-3 text-[#334155] focus:outline-none focus:border-[#2563EB]" />
                </div>
              </FR>
            </div>
          </SC>

          <SC title="适用范围" icon="tag" iconColor="#7C3AED">
            <div className="space-y-4">
              <FR label="适用区域" required>
                <Sel options={[{label:"全部区域",value:"all"},{label:"华南区",value:"s"},{label:"华东区",value:"e"},{label:"华北区",value:"n"}]} />
              </FR>
              <FR label="场景类型">
                <Sel options={[{label:"全部场景",value:"all"},{label:"写字楼",value:"office"},{label:"商业综合体",value:"mall"},{label:"园区食堂",value:"canteen"}]} />
              </FR>
              <FR label="指定客户">
                <Sel options={[{label:"不限制（全部）",value:"all"},{label:"蜂巢智能科技",value:"c001"},{label:"格林购物科技",value:"c003"}]} />
              </FR>
              <FR label="客户等级">
                <Sel options={[{label:"不限制",value:"all"},{label:"金牌客户",value:"gold"},{label:"银牌客户",value:"silver"}]} />
              </FR>
              <FR label="说明" hint="此字段会显示在价格模板列表页">
                <TA placeholder="适用场景和注意事项" rows={3} />
              </FR>
            </div>
          </SC>
        </div>

        {/* Right: Price lines */}
        <div className="col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-[#0F172A]">商品价格明细</h3>
                <p className="text-xs text-[#94A3B8] mt-0.5">未单独配置的 SKU 将按全局策略处理</p>
              </div>
              <div className="flex gap-2">
                <Btn variant="ghost" size="sm" icon="upload">批量导入价格</Btn>
                <Btn variant="secondary" size="sm" icon="plus">添加商品</Btn>
              </div>
            </div>

            {priceType!=="manual" && (
              <AB type="info" msg={`当前全局策略：统一下浮 5%，以下明细为预览值，可对单个 SKU 单独覆盖。`} />
            )}

            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                    {["商品名称","SKU","分类","档案价","价格类型","执行价格","涨跌幅",""].map(h=>(
                      <th key={h} className="px-3 py-3 text-left text-xs font-semibold text-[#64748B] uppercase whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {lines.map(row=>(
                    <tr key={row.id} className="border-b border-[#F1F5F9] hover:bg-[#F8FAFC] group">
                      <td className="px-3 py-3 font-medium text-[#0F172A]">{row.name}</td>
                      <td className="px-3 py-3"><span className="font-mono text-xs text-[#64748B]">{row.sku}</span></td>
                      <td className="px-3 py-3 text-[#64748B] text-xs">{row.cat}</td>
                      <td className="px-3 py-3 text-[#64748B]">¥{row.base.toFixed(2)}</td>
                      <td className="px-3 py-3">
                        <Sel className="w-24" options={[{label:"固定价",value:"fixed"},{label:"折扣价",value:"discount"},{label:"沿用档案",value:"market"}]} value={row.type} />
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-1">
                          <span className="text-[#64748B] text-xs">¥</span>
                          <input type="number" defaultValue={row.val}
                            className="w-20 h-8 border border-[#E2E8F0] rounded text-sm px-2 text-[#0F172A] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#DBEAFE]" />
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <span className={`text-xs font-medium ${row.margin.startsWith("-")?"text-[#DC2626]":row.margin==="0%"?"text-[#94A3B8]":"text-[#16A34A]"}`}>
                          {row.margin}
                        </span>
                      </td>
                      <td className="px-3 py-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="text-[#DC2626] hover:text-[#B91C1C]"><Ic d={P.trash} size={14} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Summary footer */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#E2E8F0]">
              <div className="text-sm text-[#64748B]">共配置 <strong className="text-[#0F172A]">{lines.length}</strong> 种商品价格</div>
              <div className="flex items-center gap-4 text-xs text-[#64748B]">
                <span>平均涨跌幅 <strong className="text-[#DC2626]">-5.2%</strong></span>
                <span>最大下浮 <strong className="text-[#DC2626]">-5.8%</strong></span>
              </div>
            </div>
          </Card>

          <div className="flex gap-3 mt-4">
            <Btn variant="primary">保存价格模板</Btn>
            <Btn variant="secondary">保存草稿</Btn>
            <Btn variant="ghost" onClick={onBack}>取消</Btn>
          </div>
        </div>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// PAGE 5 – SUPPLIER LIST (第一页：供应商列表页)
// ══════════════════════════════════════════════════════════════════════════════
export const SupplierList = ({ onEdit }: { onEdit: (id?: string) => void }) => {
  const [supplierList, setSupplierList] = useState(SUPPLIERS);
  const [sel, setSel] = useState<Set<string>>(new Set());

  // Search Filter States
  const [searchName, setSearchName] = useState("");
  const [searchStatus, setSearchStatus] = useState("全部");
  const [searchSettlement, setSearchSettlement] = useState("全部");

  // Applied Filters State
  const [filters, setFilters] = useState({
    name: "",
    status: "全部",
    settlement: "全部",
  });

  // Confirm Status Toggle State
  const [confirmItem, setConfirmItem] = useState<(typeof SUPPLIERS)[0] | null>(null);
  const [toastMsg, setToastMsg] = useState("");

  const toggle = (id: string) =>
    setSel((s) => {
      const n = new Set(s);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });

  const toggleAll = () => {
    if (sel.size === filteredSuppliers.length) {
      setSel(new Set());
    } else {
      setSel(new Set(filteredSuppliers.map((s) => s.id)));
    }
  };

  const handleSearch = () => {
    setFilters({
      name: searchName.trim(),
      status: searchStatus,
      settlement: searchSettlement,
    });
  };

  const handleReset = () => {
    setSearchName("");
    setSearchStatus("全部");
    setSearchSettlement("全部");
    setFilters({
      name: "",
      status: "全部",
      settlement: "全部",
    });
  };

  const filteredSuppliers = supplierList.filter((item) => {
    if (filters.name) {
      const q = filters.name.toLowerCase();
      if (!item.name.toLowerCase().includes(q) && !item.short.toLowerCase().includes(q)) {
        return false;
      }
    }
    if (filters.status !== "全部" && item.status !== filters.status) return false;
    if (filters.settlement !== "全部" && item.settlementMethod !== filters.settlement) return false;
    return true;
  });

  // Toggle Supplier Status with Confirmation
  const handleToggleStatus = (target: (typeof SUPPLIERS)[0]) => {
    const nextStatus = target.status === "启用" ? "停用" : "启用";
    setSupplierList((prev) =>
      prev.map((s) => (s.id === target.id ? { ...s, status: nextStatus as "启用" | "停用" } : s))
    );
    setConfirmItem(null);
    showToast(`供应商 [${target.name}] 已成功${nextStatus}！`);
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3000);
  };

  return (
    <div className="space-y-4">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-5 right-5 z-50 bg-[#0F172A] text-white px-4 py-3 rounded-lg shadow-xl text-sm flex items-center gap-2 border border-[#334155] animate-bounce">
          <Ic d={P.check} size={16} className="text-[#16A34A]" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-[#0F172A] tracking-tight">供应商管理</h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            用于管理所有供应商信息，支持搜索筛选、新增、修改、导出等操作
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Btn variant="primary" icon="plus" onClick={() => onEdit()}>
            新增供应商
          </Btn>
          <Btn
            variant="secondary"
            icon="download"
            onClick={() => showToast("已导出全量供应商档案 EXCEL 文件")}
          >
            导出
          </Btn>
        </div>
      </div>

      {/* High Density Multi-column Search Area */}
      <div className="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-sm">
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#F1F5F9]">
          <div className="flex items-center gap-2">
            <Ic d={P.search} size={16} className="text-[#2563EB]" />
            <span className="text-xs font-bold text-[#334155] uppercase tracking-wider">
              高密度筛选条件
            </span>
          </div>
          <span className="text-xs text-[#94A3B8]">共检索到 {filteredSuppliers.length} 家供应商</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
          {/* 1. 供应商名称 */}
          <div>
            <label className="block text-[11px] font-semibold text-[#64748B] mb-1">供应商名称</label>
            <input
              type="text"
              placeholder="模糊搜索供应商名称 / 简称"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="w-full text-xs px-2.5 py-1.5 border border-[#CBD5E1] rounded-md focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB]"
            />
          </div>

          {/* 2. 合作状态 */}
          <div>
            <label className="block text-[11px] font-semibold text-[#64748B] mb-1">合作状态</label>
            <select
              value={searchStatus}
              onChange={(e) => setSearchStatus(e.target.value)}
              className="w-full text-xs px-2.5 py-1.5 border border-[#CBD5E1] rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB]"
            >
              <option value="全部">全部状态</option>
              <option value="启用">启用</option>
              <option value="停用">停用</option>
            </select>
          </div>

          {/* 3. 结算方式 */}
          <div>
            <label className="block text-[11px] font-semibold text-[#64748B] mb-1">结算方式</label>
            <select
              value={searchSettlement}
              onChange={(e) => setSearchSettlement(e.target.value)}
              className="w-full text-xs px-2.5 py-1.5 border border-[#CBD5E1] rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB]"
            >
              <option value="全部">全部结算方式</option>
              <option value="月结">月结</option>
              <option value="季结">季结</option>
              <option value="按单结">按单结</option>
              <option value="充值">充值</option>
            </select>
          </div>

          {/* 右侧固定按钮 */}
          <div className="flex items-end justify-end gap-2 pt-2 md:pt-0">
            <Btn variant="primary" size="sm" icon="search" onClick={handleSearch}>
              搜索
            </Btn>
            <Btn variant="secondary" size="sm" onClick={handleReset}>
              重置
            </Btn>
          </div>
        </div>
      </div>

      {/* Batch toolbar */}
      <Batch count={sel.size}>
        <Btn variant="ghost" size="sm" onClick={() => showToast(`已批量启用 ${sel.size} 家供应商`)}>
          批量启用
        </Btn>
        <Btn variant="ghost" size="sm" onClick={() => showToast(`已批量停用 ${sel.size} 家供应商`)}>
          批量停用
        </Btn>
        <Btn variant="ghost" size="sm" icon="download" onClick={() => showToast(`已导出选中的 ${sel.size} 家供应商数据`)}>
          批量导出
        </Btn>
      </Batch>

      {/* ERP High Density Supplier Table */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse min-w-[1400px]">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-semibold">
                <th className="p-3 w-10 text-center">
                  <input
                    type="checkbox"
                    checked={sel.size > 0 && sel.size === filteredSuppliers.length}
                    onChange={toggleAll}
                    className="accent-[#2563EB] cursor-pointer"
                  />
                </th>
                <th className="p-3 w-28 whitespace-nowrap">供应商编码</th>
                <th className="p-3 min-w-[200px] whitespace-nowrap">供应商名称</th>
                <th className="p-3 w-24 whitespace-nowrap">联系人</th>
                <th className="p-3 w-32 whitespace-nowrap">联系电话</th>
                <th className="p-3 w-48 whitespace-nowrap">对公账户</th>
                <th className="p-3 min-w-[180px] whitespace-nowrap">开户行</th>
                <th className="p-3 w-24 whitespace-nowrap">合作状态</th>
                <th className="p-3 w-24 whitespace-nowrap">结算方式</th>
                <th className="p-3 min-w-[200px] whitespace-nowrap">供应合同</th>
                <th className="p-3 w-28 sticky right-0 bg-[#F8FAFC] z-10 border-l border-[#E2E8F0] text-center whitespace-nowrap shadow-[-4px_0_8px_rgba(0,0,0,0.03)]">
                  操作项
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9] text-[#334155]">
              {filteredSuppliers.length === 0 ? (
                <tr>
                  <td colSpan={11} className="py-12 text-center text-[#94A3B8]">
                    <Empty
                      icon="supplier"
                      title="暂无匹配的供应商记录"
                      desc="请尝试清空或重新调整搜条件后重试"
                      action={
                        <Btn variant="secondary" size="sm" onClick={handleReset}>
                          重置搜索条件
                        </Btn>
                      }
                    />
                  </td>
                </tr>
              ) : (
                filteredSuppliers.map((s) => {
                  const isChecked = sel.has(s.id);
                  return (
                    <tr
                      key={s.id}
                      className={`hover:bg-[#F8FAFC] transition-colors ${isChecked ? "bg-[#EFF6FF]" : ""}`}
                    >
                      <td className="p-3 text-center">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggle(s.id)}
                          className="accent-[#2563EB] cursor-pointer"
                        />
                      </td>

                      {/* 供应商编码 */}
                      <td className="p-3 font-mono font-medium text-[#64748B]">{s.id}</td>

                      {/* 供应商名称 */}
                      <td className="p-3">
                        <button
                          onClick={() => onEdit(s.id)}
                          className="font-semibold text-[#0F172A] hover:text-[#2563EB] hover:underline text-left block"
                        >
                          {s.name}
                        </button>
                      </td>

                      {/* 联系人 */}
                      <td className="p-3 font-medium text-[#334155]">{s.contact}</td>

                      {/* 联系电话 */}
                      <td className="p-3 font-mono text-[#475569]">{s.phone}</td>

                      {/* 对公账户 */}
                      <td className="p-3 font-mono text-[#334155]">{s.bankAccount}</td>

                      {/* 开户行 */}
                      <td className="p-3 text-[#64748B]">{s.bankName}</td>

                      {/* 合作状态 (颜色标签: 启用-绿色, 停用-红色) */}
                      <td className="p-3">
                        {s.status === "启用" ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-[#F0FDF4] text-[#16A34A] border border-[#BBF7D0]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
                            启用
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]" />
                            停用
                          </span>
                        )}
                      </td>

                      {/* 结算方式 */}
                      <td className="p-3">
                        <span className="inline-block px-2 py-0.5 rounded bg-[#F1F5F9] text-[#475569] border border-[#E2E8F0] font-medium">
                          {s.settlementMethod}
                        </span>
                      </td>

                      {/* 供应合同 (链接/附件样式, 点击可下载) */}
                      <td className="p-3">
                        <button
                          onClick={() => showToast(`已开始下载供应合同 [${s.contractFile}]...`)}
                          className="inline-flex items-center gap-1.5 text-[#2563EB] hover:text-[#1D4ED8] hover:underline font-medium bg-[#EFF6FF] px-2.5 py-1 rounded border border-[#BFDBFE] transition-colors"
                        >
                          <Ic d={P.fileText} size={13} />
                          <span className="truncate max-w-[160px]">{s.contractFile}</span>
                          <Ic d={P.download} size={12} className="opacity-70" />
                        </button>
                      </td>

                      {/* 操作项 (固定右侧) */}
                      <td className="p-3 sticky right-0 bg-white z-10 border-l border-[#E2E8F0] shadow-[-4px_0_8px_rgba(0,0,0,0.03)]">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => onEdit(s.id)}
                            className="text-[#2563EB] hover:text-[#1D4ED8] hover:underline font-medium text-xs"
                          >
                            修改
                          </button>
                          <span className="text-[#CBD5E1]">|</span>
                          <button
                            onClick={() => setConfirmItem(s)}
                            className={`font-medium text-xs hover:underline ${
                              s.status === "启用" ? "text-[#DC2626] hover:text-[#B91C1C]" : "text-[#16A34A] hover:text-[#15803D]"
                            }`}
                          >
                            {s.status === "启用" ? "停用" : "启用"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        <Pager total={filteredSuppliers.length} page={1} pageSize={10} />
      </div>

      {/* 启用/停用 二次确认弹窗 */}
      {confirmItem && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-[#E2E8F0] animate-in zoom-in-95 duration-150">
            <div className="flex items-start gap-3 mb-4">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  confirmItem.status === "启用" ? "bg-[#FEF2F2] text-[#DC2626]" : "bg-[#F0FDF4] text-[#16A34A]"
                }`}
              >
                <Ic d={P.alertTri} size={20} />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#0F172A]">
                  确认要{confirmItem.status === "启用" ? "停用" : "启用"}该供应商吗？
                </h3>
                <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
                  您正在对供应商 <strong className="text-[#0F172A]">[{confirmItem.name}]</strong> (编码:{" "}
                  {confirmItem.id}) 执行
                  <strong className={confirmItem.status === "启用" ? "text-[#DC2626]" : "text-[#16A34A]"}>
                    【{confirmItem.status === "启用" ? "停用" : "启用"}】
                  </strong>
                  操作。
                  {confirmItem.status === "启用" &&
                    " 停用后，系统将暂停该供应商关联商品的自动采购与建单推送！"}
                </p>
              </div>
            </div>

            <div className="p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] text-xs text-[#64748B] mb-5 space-y-1">
              <div>• 联系人: {confirmItem.contact} ({confirmItem.phone})</div>
              <div>• 结算方式: {confirmItem.settlementMethod}</div>
              <div>• 对公账户: {confirmItem.bankAccount}</div>
            </div>

            <div className="flex justify-end gap-2">
              <Btn variant="secondary" size="sm" onClick={() => setConfirmItem(null)}>
                取消
              </Btn>
              <Btn
                variant={confirmItem.status === "启用" ? "danger" : "primary"}
                size="sm"
                onClick={() => handleToggleStatus(confirmItem)}
              >
                确认{confirmItem.status === "启用" ? "停用" : "启用"}
              </Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// PAGE 6 – SUPPLIER FORM (新增 / 修改供应商信息页)
// ══════════════════════════════════════════════════════════════════════════════
export const SupplierForm = ({ onBack, isEdit = false }: { onBack: () => void; isEdit?: boolean }) => {
  // Form Field States
  const [name, setName] = useState(isEdit ? "可口可乐（中国）饮料有限公司" : "");
  const [contact, setContact] = useState(isEdit ? "陈明" : "");
  const [phone, setPhone] = useState(isEdit ? "13802888001" : "");
  const [bankAccount, setBankAccount] = useState(isEdit ? "6222 0210 0122 8888 910" : "");
  const [bankName, setBankName] = useState(isEdit ? "招商银行深圳高新支行" : "");
  const [contractFile, setContractFile] = useState(
    isEdit ? "可口可乐2024年框架协议.pdf" : "2024年度框架采购协议扫描件.pdf"
  );
  const [status, setStatus] = useState<"启用" | "停用">(isEdit ? "启用" : "启用"); // 新增默认值：启用
  const [settlementMethod, setSettlementMethod] = useState<"月结" | "季结" | "按单结" | "充值">(
    isEdit ? "月结" : "月结"
  );
  const [remark, setRemark] = useState(
    isEdit ? "华南中心仓饮料一级授权供应商，含增值税 13% 账期核算" : ""
  );

  // Errors & Modals
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  // Phone validation helper (11-digit mobile or standard landline)
  const validatePhone = (val: string) => {
    const clean = val.trim();
    if (!clean) return "联系电话为必填项";
    const isMobile = /^1[3-9]\d{9}$/.test(clean);
    const isTel = /^\d{3,4}-?\d{7,8}$/.test(clean);
    if (!isMobile && !isTel) {
      return "请输入正确的 11 位手机号码或标准座机号 (例如: 13800138000 或 021-88888888)";
    }
    return "";
  };

  // Form Validation
  const validateForm = () => {
    const errs: Record<string, string> = {};

    if (!name.trim()) errs.name = "供应商名称为必填项";
    else if (name.trim().length > 50) errs.name = "供应商名称最长 50 字符";

    if (!contact.trim()) errs.contact = "联系人为必填项";
    else if (contact.trim().length > 20) errs.contact = "联系人最长 20 字符";

    const phoneErr = validatePhone(phone);
    if (phoneErr) errs.phone = phoneErr;

    if (!bankAccount.trim()) errs.bankAccount = "对公账户为必填项";
    else if (bankAccount.trim().length > 30) errs.bankAccount = "对公账户最长 30 字符";

    if (!bankName.trim()) errs.bankName = "开户行为必填项";
    else if (bankName.trim().length > 50) errs.bankName = "开户行最长 50 字符";

    if (remark.trim().length > 200) errs.remark = "备注最长 200 字符";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Submit Handler
  const handleSubmit = () => {
    if (validateForm()) {
      showToast(`供应商 [${name}] 信息已成功保存！默认合作状态为：【${status}】`);
      setTimeout(() => {
        onBack();
      }, 1200);
    } else {
      showToast("表单校验未通过，请检查标记错误的字段！");
      setTimeout(() => setToastMsg(""), 3000);
    }
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3000);
  };

  return (
    <div className="space-y-4 max-w-5xl mx-auto pb-12">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-5 right-5 z-50 bg-[#0F172A] text-white px-4 py-3 rounded-lg shadow-xl text-sm flex items-center gap-2 border border-[#334155] animate-bounce">
          <Ic d={P.check} size={16} className="text-[#16A34A]" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowCancelModal(true)}
            className="p-1.5 text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] rounded-lg transition-colors"
          >
            <Ic d={P.chevL} size={20} />
          </button>
          <div>
            <h1 className="text-lg font-bold text-[#0F172A]">
              {isEdit ? "修改供应商信息" : "新增供应商"}
            </h1>
            <p className="text-xs text-[#64748B]">维护供应商主体资质、财务结算账号及供应框架合同档案</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Btn variant="secondary" onClick={() => setShowCancelModal(true)}>
            取消
          </Btn>
          <Btn variant="primary" icon="check" onClick={handleSubmit}>
            提交
          </Btn>
        </div>
      </div>

      {/* Error Banner if validation fails */}
      {Object.keys(errors).length > 0 && (
        <div className="p-3 bg-[#FEF2F2] border border-[#FECACA] rounded-xl text-xs text-[#DC2626] flex items-center gap-2">
          <Ic d={P.alertTri} size={16} />
          <span>表单存在 {Object.keys(errors).length} 处未填或格式错误的字段，请修改后再提交。</span>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* CARD 1: 基本信息与主体资质 */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 bg-[#F8FAFC] border-b border-[#E2E8F0] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#2563EB]" />
            <h2 className="text-sm font-bold text-[#0F172A]">基本信息与主体资质</h2>
          </div>
          <span className="text-xs text-[#64748B]">供应商工商全称与日常业务对接人信息</span>
        </div>

        <div className="p-5 space-y-4 text-xs">
          {/* Row 1: 供应商名称 */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-semibold text-[#334155]">
                供应商名称 <span className="text-[#DC2626]">*</span>
              </label>
              <span className="text-[11px] text-[#94A3B8]">{name.length} / 50字</span>
            </div>
            <input
              type="text"
              maxLength={50}
              placeholder="请输入工商营业执照全称 (最长 50 字符)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB] ${
                errors.name ? "border-[#DC2626] bg-[#FEF2F2]" : "border-[#CBD5E1]"
              }`}
            />
            {errors.name && <p className="text-[11px] text-[#DC2626] mt-0.5">{errors.name}</p>}
          </div>

          {/* Row 2: 联系人, 联系电话 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-[#F1F5F9]">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-semibold text-[#334155]">
                  联系人 <span className="text-[#DC2626]">*</span>
                </label>
                <span className="text-[11px] text-[#94A3B8]">{contact.length} / 20字</span>
              </div>
              <input
                type="text"
                maxLength={20}
                placeholder="请输入主要业务对接人姓名 (最长 20 字符)"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB] ${
                  errors.contact ? "border-[#DC2626] bg-[#FEF2F2]" : "border-[#CBD5E1]"
                }`}
              />
              {errors.contact && <p className="text-[11px] text-[#DC2626] mt-0.5">{errors.contact}</p>}
            </div>

            <div>
              <label className="block font-semibold text-[#334155] mb-1">
                联系电话 <span className="text-[#DC2626]">*</span>{" "}
                <span className="text-[#94A3B8] font-normal">(手机号格式校验)</span>
              </label>
              <input
                type="text"
                placeholder="例如：13802888001 或 021-88888888"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`w-full px-3 py-2 border font-mono rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB] ${
                  errors.phone ? "border-[#DC2626] bg-[#FEF2F2]" : "border-[#CBD5E1]"
                }`}
              />
              {errors.phone && <p className="text-[11px] text-[#DC2626] mt-0.5 font-medium">{errors.phone}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* CARD 2: 对公财务与结算方式 */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 bg-[#F8FAFC] border-b border-[#E2E8F0] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#16A34A]" />
            <h2 className="text-sm font-bold text-[#0F172A]">对公财务与结算方式</h2>
          </div>
          <span className="text-xs text-[#64748B]">采购开票付款银行对公账号与合作账期约定</span>
        </div>

        <div className="p-5 space-y-4 text-xs">
          {/* Row 1: 对公账户, 开户行 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-semibold text-[#334155]">
                  对公账户 <span className="text-[#DC2626]">*</span>
                </label>
                <span className="text-[11px] text-[#94A3B8]">{bankAccount.length} / 30字</span>
              </div>
              <input
                type="text"
                maxLength={30}
                placeholder="请输入企业银行对公账号 (最长 30 字符)"
                value={bankAccount}
                onChange={(e) => setBankAccount(e.target.value)}
                className={`w-full px-3 py-2 border font-mono rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB] ${
                  errors.bankAccount ? "border-[#DC2626] bg-[#FEF2F2]" : "border-[#CBD5E1]"
                }`}
              />
              {errors.bankAccount && <p className="text-[11px] text-[#DC2626] mt-0.5">{errors.bankAccount}</p>}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-semibold text-[#334155]">
                  开户行 <span className="text-[#DC2626]">*</span>
                </label>
                <span className="text-[11px] text-[#94A3B8]">{bankName.length} / 50字</span>
              </div>
              <input
                type="text"
                maxLength={50}
                placeholder="例如：招商银行深圳高新支行 (最长 50 字符)"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB] ${
                  errors.bankName ? "border-[#DC2626] bg-[#FEF2F2]" : "border-[#CBD5E1]"
                }`}
              />
              {errors.bankName && <p className="text-[11px] text-[#DC2626] mt-0.5">{errors.bankName}</p>}
            </div>
          </div>

          {/* Row 2: 合作状态, 结算方式 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-[#F1F5F9]">
            <div>
              <label className="block font-semibold text-[#334155] mb-1">
                合作状态 <span className="text-[#DC2626]">*</span>{" "}
                <span className="text-[#94A3B8] font-normal">(新增默认值：启用)</span>
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as "启用" | "停用")}
                className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-[#2563EB] font-medium"
              >
                <option value="启用">启用 (正常合作并可推送订单)</option>
                <option value="停用">停用 (暂停合作与自动采购流程)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-[#334155] mb-1">
                结算方式 <span className="text-[#DC2626]">*</span>
              </label>
              <select
                value={settlementMethod}
                onChange={(e) =>
                  setSettlementMethod(e.target.value as "月结" | "季结" | "按单结" | "充值")
                }
                className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-[#2563EB] font-medium"
              >
                <option value="月结">月结 (按月汇总结算)</option>
                <option value="季结">季结 (按季度汇总结算)</option>
                <option value="按单结">按单结 (单笔采购完成即结)</option>
                <option value="充值">充值 (预付款充值抵扣)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* CARD 3: 供应合同与运营说明 */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 bg-[#F8FAFC] border-b border-[#E2E8F0] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#7C3AED]" />
            <h2 className="text-sm font-bold text-[#0F172A]">供应合同与运营说明</h2>
          </div>
          <span className="text-xs text-[#64748B]">上传合规采购框架合同与补充约定</span>
        </div>

        <div className="p-5 space-y-4 text-xs">
          {/* Prominent Contract Upload Zone */}
          <div>
            <label className="block font-semibold text-[#334155] mb-1.5">
              供应合同{" "}
              <span className="text-[#94A3B8] font-normal">(选填 · 上传后需清晰展示合同文件名与文件状态)</span>
            </label>

            <div
              className={`p-6 border-2 border-dashed rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 transition-all ${
                contractFile
                  ? "border-[#BBF7D0] bg-[#F0FDF4]/50"
                  : errors.contractFile
                  ? "border-[#DC2626] bg-[#FEF2F2]"
                  : "border-[#CBD5E1] bg-[#F8FAFC] hover:border-[#2563EB]"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center flex-shrink-0">
                  <Ic d={P.fileText} size={24} />
                </div>
                <div>
                  {contractFile ? (
                    <>
                      <div className="font-bold text-sm text-[#0F172A] flex items-center gap-2">
                        <span>{contractFile}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#DCFCE7] text-[#16A34A] border border-[#BBF7D0]">
                          ✓ 已上传
                        </span>
                      </div>
                      <p className="text-xs text-[#64748B] mt-0.5">
                        格式: PDF/PNG/JPG | 文件大小: 4.8 MB | 已完成合规备案校验
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="font-bold text-sm text-[#334155]">请选择上传框架供应合同</div>
                      <p className="text-xs text-[#94A3B8] mt-0.5">
                        支持上传扫描件 .pdf, .jpg, .png (单文件需小于 30MB)
                      </p>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                {contractFile && (
                  <button
                    type="button"
                    onClick={() => showToast(`已开始下载查看：${contractFile}`)}
                    className="px-3 py-1.5 bg-white border border-[#CBD5E1] hover:bg-[#F1F5F9] text-[#334155] rounded-lg font-medium text-xs flex items-center gap-1 shadow-sm"
                  >
                    <Ic d={P.download} size={14} />
                    查看文件名
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setContractFile("新签订_2024-2025采购补充协议.pdf");
                    showToast("供应合同文件已成功替换并更新！");
                  }}
                  className="px-3 py-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg font-semibold text-xs flex items-center gap-1 shadow-sm"
                >
                  <Ic d={P.upload} size={14} />
                  {contractFile ? "替换/重新上传" : "上传合同文件"}
                </button>
              </div>
            </div>
            {errors.contractFile && <p className="text-[11px] text-[#DC2626] mt-1">{errors.contractFile}</p>}
          </div>

          {/* Row 2: 备注 (非必填，最长200字) */}
          <div className="pt-2 border-t border-[#F1F5F9]">
            <div className="flex items-center justify-between mb-1">
              <label className="font-semibold text-[#334155]">
                备注 <span className="text-[11px] text-[#94A3B8] font-normal">(选填)</span>
              </label>
              <span className="text-[11px] text-[#94A3B8]">{remark.length} / 200字</span>
            </div>
            <textarea
              maxLength={200}
              rows={3}
              placeholder="请输入供应商合规说明、交货注意事项及补充条款 (最长 200 字符)"
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB] text-xs resize-none ${
                errors.remark ? "border-[#DC2626] bg-[#FEF2F2]" : "border-[#CBD5E1]"
              }`}
            />
            {errors.remark && <p className="text-[11px] text-[#DC2626] mt-0.5">{errors.remark}</p>}
          </div>
        </div>
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="p-4 bg-white rounded-xl border border-[#E2E8F0] shadow-md flex items-center justify-between sticky bottom-4 z-20">
        <div className="flex items-center gap-2 text-xs text-[#64748B]">
          <Ic d={P.info} size={16} className="text-[#2563EB]" />
          <span>表单全字段均包含校验，请确保输入信息真实无误。</span>
        </div>
        <div className="flex items-center gap-3">
          <Btn variant="secondary" onClick={() => setShowCancelModal(true)}>
            取消
          </Btn>
          <Btn variant="primary" icon="check" onClick={handleSubmit}>
            提交
          </Btn>
        </div>
      </div>

      {/* Cancel Secondary Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-[#E2E8F0] animate-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 mb-3 text-[#DC2626]">
              <div className="w-9 h-9 rounded-full bg-[#FEF2F2] flex items-center justify-center flex-shrink-0">
                <Ic d={P.alertTri} size={20} />
              </div>
              <h3 className="text-base font-bold text-[#0F172A]">确认要取消编辑吗？</h3>
            </div>
            <p className="text-xs text-[#64748B] mb-5 leading-relaxed">
              取消后本次填写的供应商基本信息、对公账号与合同附件将不予保存，确定要退出编辑吗？
            </p>
            <div className="flex justify-end gap-2">
              <Btn variant="secondary" size="sm" onClick={() => setShowCancelModal(false)}>
                继续编辑
              </Btn>
              <Btn
                variant="danger"
                size="sm"
                onClick={() => {
                  setShowCancelModal(false);
                  onBack();
                }}
              >
                确定取消
              </Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// PAGE 7 – PURCHASE ORDER LIST
// ══════════════════════════════════════════════════════════════════════════════
export const PurchaseOrderList = ({ onCreate, onDetail }: { onCreate:()=>void; onDetail:()=>void }) => {
  const [status, setStatus] = useState("all");
  const STATUS_TABS = [{key:"all",label:"全部",n:28},{key:"待审核",label:"待审核",n:3},{key:"已审核",label:"已审核",n:5},{key:"入库中",label:"入库中",n:4},{key:"入库完成",label:"入库完成",n:14},{key:"审核驳回",label:"审核驳回",n:2}];

  return (
    <div>
      <PH title="采购入库单" crumbs={["首页","ERP管理","采购入库单"]}
        actions={
          <>
            <Btn variant="secondary" icon="download" size="sm">导出</Btn>
            <Btn variant="primary" icon="plus" onClick={onCreate}>新建入库单</Btn>
          </>
        }
      />
      <div className="grid grid-cols-5 gap-3 mb-4">
        <Stat label="本月入库单" value="28" color="#2563EB" icon="inbox" />
        <Stat label="待审核" value="3" sub="需尽快处理" trend="none" color="#D97706" icon="alertTri" />
        <Stat label="审核驳回" value="2" sub="请查看驳回原因" color="#DC2626" icon="x" />
        <Stat label="本月入库完成" value="19" color="#16A34A" icon="check" />
        <Stat label="本月采购金额" value="¥138,420" sub="+8.2% 较上月" trend="up" color="#7C3AED" icon="bar" />
      </div>

      {/* Status quick tabs */}
      <Card noPad className="mb-4">
        <div className="flex overflow-x-auto border-b border-[#E2E8F0]">
          {STATUS_TABS.map(t=>(
            <button key={t.key} onClick={()=>setStatus(t.key)}
              className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap flex-shrink-0
                ${status===t.key?"border-[#2563EB] text-[#2563EB]":"border-transparent text-[#64748B] hover:text-[#334155]"}`}>
              {t.label}
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-semibold
                ${status===t.key?"bg-[#DBEAFE] text-[#2563EB]":"bg-[#F1F5F9] text-[#64748B]"}`}>{t.n}</span>
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 items-end p-4">
          <FL label="入库单号"><Inp placeholder="PO-YYYYMMDD-XXX" icon="search" className="w-44" /></FL>
          <FL label="供应商"><Sel options={[{label:"全部供应商",value:""},...SUPPLIERS.map(s=>({label:s.short,value:s.id}))]} className="w-36" /></FL>
          <FL label="收货仓库">
            <Sel options={[{label:"全部仓库",value:""},{label:"华南中心仓（深圳）",value:"sz"},{label:"华东中心仓（上海）",value:"sh"},{label:"华北中心仓（北京）",value:"bj"}]} className="w-44" />
          </FL>
          <FL label="创建时间">
            <div className="flex items-center gap-1">
              <input type="date" className="h-9 border border-[#E2E8F0] rounded-md text-sm px-3 text-[#334155] focus:outline-none focus:border-[#2563EB]" />
              <span className="text-[#94A3B8] text-xs">至</span>
              <input type="date" className="h-9 border border-[#E2E8F0] rounded-md text-sm px-3 text-[#334155] focus:outline-none focus:border-[#2563EB]" />
            </div>
          </FL>
          <div className="flex items-end gap-2">
            <Btn variant="primary" icon="search">查询</Btn>
            <Btn variant="secondary">重置</Btn>
          </div>
        </div>
      </Card>

      {/* Exception state: rejected orders */}
      {(status==="all"||status==="审核驳回") && (
        <AB type="error" msg="有 2 张入库单审核被驳回，请查看驳回原因并修改后重新提交。驳回原因：采购金额超出合同授权额度。"
          action={<Btn variant="secondary" size="sm" className="flex-shrink-0 !text-[#991B1B] !border-[#FECACA] ml-2">查看驳回单据</Btn>}
        />
      )}

      <Card noPad>
        <Tbl
          empty={<Empty icon="inbox" title="暂无采购入库单" desc="当前筛选条件下没有记录" action={<Btn variant="primary" icon="plus" onClick={onCreate}>新建入库单</Btn>} />}
          cols={[
            {key:"id",label:"入库单号",render:r=><button onClick={onDetail} className="font-mono text-xs text-[#2563EB] hover:underline">{r.id}</button>},
            {key:"supplier",label:"供应商",render:r=><span className="font-medium text-[#0F172A]">{r.supplier}</span>},
            {key:"wh",label:"收货仓库",render:r=><span className="text-[#64748B] text-xs">{r.wh}</span>},
            {key:"skus",label:"SKU数",render:r=><span>{r.skus} 种</span>},
            {key:"qty",label:"总件数",render:r=><span className="font-medium">{r.qty.toLocaleString()} 件</span>},
            {key:"amt",label:"采购金额",render:r=><span className="font-semibold text-[#0F172A]">¥{r.amt.toLocaleString()}</span>},
            {key:"status",label:"状态",render:r=><Badge dot label={r.status} color={PO_STATUS[r.status]??"gray"} />},
            {key:"creator",label:"创建人"},
            {key:"created",label:"创建时间",render:r=><span className="text-xs text-[#64748B]">{r.created}</span>},
            {key:"actions",label:"操作",render:r=>(
              <div className="flex gap-1">
                <Btn variant="ghost" size="sm" onClick={onDetail}>查看</Btn>
                {r.status==="待审核"&&<Btn variant="ghost" size="sm">审核</Btn>}
                {r.status==="审核驳回"&&<Btn variant="ghost" size="sm" className="!text-[#DC2626]">修改重提</Btn>}
                {r.status==="待审核"&&<Btn variant="ghost" size="sm" className="!text-[#DC2626]">取消</Btn>}
              </div>
            )},
          ]}
          rows={PO_LIST}
        />
        <Pager total={28} page={1} pageSize={10} />
      </Card>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// PAGE 8 – NEW PURCHASE ORDER
// ══════════════════════════════════════════════════════════════════════════════
export const PurchaseOrderNew = ({ onBack }: { onBack:()=>void }) => {
  const [step, setStep] = useState(0);
  const totalAmt = PO_LINES.reduce((s,l)=>s+l.amt,0);
  const totalQty = PO_LINES.reduce((s,l)=>s+l.qty,0);

  return (
    <div>
      <PH title="新建采购入库单" crumbs={["首页","ERP管理","采购入库单","新建"]}
        actions={<Btn variant="secondary" icon="chevL" onClick={onBack}>返回列表</Btn>}
      />
      <Card className="mb-4">
        <Steps steps={["供应商与仓库","商品明细","费用确认","提交审核"]} current={step} />

        {/* ── Step 0 ── */}
        {step===0 && (
          <div className="max-w-2xl space-y-5">
            <FG cols={2}>
              <FR label="供应商" required hint="选择后将自动带入合同价格">
                <Sel options={[{label:"请选择供应商",value:""},...SUPPLIERS.map(s=>({label:s.name,value:s.id}))]} />
              </FR>
              <FR label="收货仓库" required>
                <Sel options={[{label:"请选择仓库",value:""},{label:"华南中心仓（深圳）",value:"sz"},{label:"华东中心仓（上海）",value:"sh"},{label:"华北中心仓（北京）",value:"bj"}]} />
              </FR>
              <FR label="预计到货日期" required>
                <input type="date" className="h-9 w-full border border-[#E2E8F0] rounded-md text-sm px-3 text-[#334155] focus:outline-none focus:border-[#2563EB]" />
              </FR>
              <FR label="采购类型">
                <Sel options={[{label:"常规补货采购",value:"n"},{label:"紧急采购",value:"u"},{label:"新品首采",value:"new"},{label:"促销囤货",value:"p"}]} />
              </FR>
              <FR label="关联合同" col={2}>
                <Sel options={[{label:"HT-2024-001（有效至 2025-12-31）",value:"c1"},{label:"不关联合同",value:""}]} />
              </FR>
              <FR label="采购备注" col={2}><TA placeholder="填写采购原因或特殊说明" rows={3} /></FR>
            </FG>
          </div>
        )}

        {/* ── Step 1 ── */}
        {step===1 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Badge label="可口可乐（中国）饮料有限公司" color="blue" />
                <Badge label="华南中心仓（深圳）" color="gray" />
              </div>
              <Btn variant="secondary" size="sm" icon="plus">添加商品</Btn>
            </div>
            <AB type="info" msg="商品单价已根据供应商合同价自动带入（HT-2024-001）。如需调整请联系采购主管后修改。" />
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                    {["商品名称","SKU","单位","箱规","合同单价","采购件数","箱数","小计",""].map(h=>(
                      <th key={h} className="px-3 py-3 text-left text-xs font-semibold text-[#64748B] uppercase whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PO_LINES.map(row=>(
                    <tr key={row.id} className="border-b border-[#F1F5F9] hover:bg-[#F8FAFC] group">
                      <td className="px-3 py-3 font-medium text-[#0F172A]">{row.name}</td>
                      <td className="px-3 py-3"><span className="font-mono text-xs text-[#64748B]">{row.sku}</span></td>
                      <td className="px-3 py-3 text-[#64748B]">{row.unit}</td>
                      <td className="px-3 py-3 text-[#64748B] text-xs">{row.box} {row.unit}/箱</td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-1"><span className="text-[#64748B] text-xs">¥</span>
                          <input type="number" defaultValue={row.price} className="w-16 h-8 border border-[#E2E8F0] rounded text-sm px-2 focus:outline-none focus:border-[#2563EB]" />
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <input type="number" defaultValue={row.qty} className="w-20 h-8 border border-[#E2E8F0] rounded text-sm px-2 focus:outline-none focus:border-[#2563EB]" />
                      </td>
                      <td className="px-3 py-3 text-[#64748B] text-xs">{Math.ceil(row.qty/row.box)} 箱</td>
                      <td className="px-3 py-3 font-semibold text-[#0F172A]">¥{row.amt.toFixed(2)}</td>
                      <td className="px-3 py-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="text-[#DC2626]"><Ic d={P.trash} size={14} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-[#F8FAFC] border-t-2 border-[#CBD5E1]">
                    <td colSpan={5} className="px-3 py-3 text-right text-sm font-semibold text-[#334155]">合计</td>
                    <td className="px-3 py-3 font-bold text-[#0F172A]">{totalQty} 件</td>
                    <td className="px-3 py-3 text-[#64748B] text-xs">{PO_LINES.reduce((s,l)=>s+Math.ceil(l.qty/l.box),0)} 箱</td>
                    <td className="px-3 py-3 font-bold text-[#2563EB]">¥{totalAmt.toFixed(2)}</td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}

        {/* ── Step 2 ── */}
        {step===2 && (
          <div className="max-w-xl space-y-4">
            <AB type="info" msg="以下费用将计入本次采购入库单，请确认后进入下一步提交审核。" />
            {[
              {label:"商品金额（含税）",value:`¥${totalAmt.toFixed(2)}`,emphasis:true},
              {label:"其中：税额（13%）",value:`¥${(totalAmt*0.13/1.13).toFixed(2)}`},
              {label:"不含税金额",value:`¥${(totalAmt/1.13).toFixed(2)}`},
              {label:"运费",value:"¥0（供应商承担）"},
              {label:"其他费用",value:"¥0"},
            ].map((r,i)=>(
              <div key={i} className={`flex justify-between py-2 ${i===0?"border-b border-[#E2E8F0] pb-3 mb-1":""}`}>
                <span className={`text-sm ${r.emphasis?"font-semibold text-[#0F172A]":"text-[#64748B]"}`}>{r.label}</span>
                <span className={`text-sm ${r.emphasis?"font-bold text-[#2563EB]":"text-[#334155]"}`}>{r.value}</span>
              </div>
            ))}
            <FR label="付款备注"><TA placeholder="如：本次预付 30%，余款月结" rows={2} /></FR>
          </div>
        )}

        {/* ── Step 3 ── */}
        {step===3 && (
          <div className="max-w-2xl">
            <AB type="success" msg="入库单已填写完毕，提交后将进入审核流程（采购主管审核），审核通过后仓库可开始收货。" />
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <div className="text-xs font-semibold text-[#64748B] uppercase mb-3">单据概况</div>
                <IG cols={1} items={[
                  {label:"供应商",value:"可口可乐（中国）饮料有限公司"},
                  {label:"收货仓库",value:"华南中心仓（深圳）"},
                  {label:"采购类型",value:<Badge label="常规补货采购" color="blue" />},
                  {label:"预计到货",value:"2025-09-15"},
                  {label:"商品种数",value:`${PO_LINES.length} 种`},
                  {label:"总件数",value:`${totalQty} 件`},
                ]} />
              </Card>
              <Card>
                <div className="text-xs font-semibold text-[#64748B] uppercase mb-3">金额汇总</div>
                <div className="space-y-2">
                  {[
                    {l:"含税采购金额",v:`¥${totalAmt.toFixed(2)}`,em:true},
                    {l:"税额（13%）",v:`¥${(totalAmt*0.13/1.13).toFixed(2)}`},
                    {l:"不含税金额",v:`¥${(totalAmt/1.13).toFixed(2)}`},
                    {l:"预计付款日",v:"2025-10-15（月结30天）"},
                  ].map((r,i)=>(
                    <div key={i} className={`flex justify-between py-1.5 ${i===0?"border-b border-[#E2E8F0] pb-2 mb-1":""}`}>
                      <span className="text-sm text-[#64748B]">{r.l}</span>
                      <span className={`text-sm ${r.em?"font-bold text-[#2563EB]":"font-medium text-[#334155]"}`}>{r.v}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        <div className="flex gap-3 mt-6 pt-5 border-t border-[#E2E8F0]">
          {step>0 && <Btn variant="secondary" onClick={()=>setStep(s=>s-1)} icon="chevL">上一步</Btn>}
          {step<3
            ? <Btn variant="primary" onClick={()=>setStep(s=>s+1)}>下一步 <Ic d={P.chevR} size={14} /></Btn>
            : <Btn variant="primary">提交审核</Btn>}
          <Btn variant="ghost" onClick={onBack}>取消</Btn>
        </div>
      </Card>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// PAGE 9 – PURCHASE ORDER DETAIL
// ══════════════════════════════════════════════════════════════════════════════
export const PurchaseOrderDetail = ({ onBack }: { onBack:()=>void }) => {
  const [tab, setTab] = useState("lines");
  const totalAmt = PO_LINES.reduce((s,l)=>s+l.amt,0);
  const totalQty = PO_LINES.reduce((s,l)=>s+l.qty,0);
  const totalRecv = PO_LINES.reduce((s,l)=>s+l.recv,0);
  const totalPend = PO_LINES.reduce((s,l)=>s+l.pend,0);
  const hasMismatch = PO_LINES.some(l=>l.note);
  const pct = Math.round(totalRecv/totalQty*100);
  const STATUS_FLOW = ["待审核","已审核","入库中","部分入库","入库完成"];
  const cur = 1; // 已审核

  return (
    <div>
      <PH title="PO-20250910-001" crumbs={["首页","ERP管理","采购入库单","单据详情"]}
        actions={
          <>
            <Btn variant="secondary" icon="chevL" onClick={onBack}>返回</Btn>
            <Btn variant="secondary" icon="print">打印单据</Btn>
            <Btn variant="secondary" icon="download">导出 PDF</Btn>
            <Btn variant="primary">开始收货入库</Btn>
          </>
        }
      />

      {/* Status ribbon */}
      <Card className="mb-4" noPad>
        <div className="px-5 py-4 border-b border-[#E2E8F0] bg-[#F8FAFC] rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Badge dot label="已审核" color="cyan" />
              <span className="text-sm text-[#64748B]">单号：<span className="font-mono font-medium text-[#0F172A]">PO-20250910-001</span></span>
              <span className="text-sm text-[#64748B]">创建人：<strong className="text-[#0F172A]">采购员-王芳</strong></span>
              <span className="text-sm text-[#64748B]">创建时间：<strong className="text-[#0F172A]">2025-09-10 09:30</strong></span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-[#64748B]">预计到货：<strong className="text-[#0F172A]">2025-09-15</strong></span>
              <span className="text-[#64748B]">收货仓库：<strong className="text-[#0F172A]">华南中心仓（深圳）</strong></span>
            </div>
          </div>
        </div>
        <div className="px-5 py-4">
          <div className="flex items-center">
            {STATUS_FLOW.map((s,i)=>(
              <div key={i} className="flex items-center flex-1 last:flex-none">
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold border-2 flex-shrink-0
                    ${i<cur?"bg-[#2563EB] border-[#2563EB] text-white":i===cur?"bg-white border-[#2563EB] text-[#2563EB]":"bg-white border-[#E2E8F0] text-[#94A3B8]"}`}>
                    {i<cur?<Ic d={P.check} size={12} />:i+1}
                  </div>
                  <span className={`text-xs whitespace-nowrap ${i<=cur?"text-[#334155] font-medium":"text-[#94A3B8]"}`}>{s}</span>
                </div>
                {i<STATUS_FLOW.length-1&&<div className={`flex-1 h-px mx-3 ${i<cur?"bg-[#2563EB]":"bg-[#E2E8F0]"}`}/>}
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Anomaly banner */}
      {hasMismatch && (
        <AB type="warning" msg="入库明细存在数量差异：乐事薯片原味少收 20 件（1 箱），供应商已确认补货中。请在收货完成后更新入库记录。"
          action={<Btn variant="secondary" size="sm" className="flex-shrink-0 !text-[#92400E] !border-[#FDE68A] ml-2">记录差异</Btn>}
        />
      )}

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-4">
        <Stat label="商品种数" value={`${PO_LINES.length} 种`} color="#2563EB" icon="pkg" />
        <Stat label="入库进度" value={`${pct}%`} sub={`已收 ${totalRecv} / 待收 ${totalPend} 件`} trend={pct===100?"up":"none"} color={pct===100?"#16A34A":"#D97706"} icon="inbox" />
        <Stat label="含税采购金额" value={`¥${totalAmt.toLocaleString()}`} color="#7C3AED" icon="price" />
        <Stat label="差异件数" value="20 件" sub="1 种 SKU 待补货" color="#D97706" icon="alertTri" />
      </div>

      <div className="grid grid-cols-4 gap-4">
        {/* Left sidebar */}
        <div className="space-y-4">
          <Card>
            <div className="text-xs font-semibold text-[#64748B] uppercase mb-3">供应商</div>
            <IG cols={1} items={[
              {label:"名称",value:<span className="text-[#2563EB] cursor-pointer hover:underline">可口可乐（中国）饮料有限公司</span>},
              {label:"联系人",value:"陈经理 · 021-6888-0001"},
              {label:"关联合同",value:<span className="font-mono text-xs">HT-2024-001</span>},
              {label:"账期",value:"月结 45 天"},
              {label:"预计付款日",value:"2025-10-15"},
              {label:"本单金额",value:<span className="font-bold text-[#2563EB]">¥{totalAmt.toFixed(2)}</span>},
            ]} />
          </Card>

          <Card>
            <div className="text-xs font-semibold text-[#64748B] uppercase mb-3">收货信息</div>
            <IG cols={1} items={[
              {label:"收货仓库",value:"华南中心仓（深圳）"},
              {label:"仓库分区",value:"常温区 + 冷藏区"},
              {label:"收货负责人",value:"仓管-张三"},
            ]} />
          </Card>

          <Card>
            <div className="text-xs font-semibold text-[#64748B] uppercase mb-3">审核流程</div>
            <div className="space-y-3">
              {[
                {role:"采购员",name:"王芳",action:"创建单据",time:"09-10 09:30",done:true},
                {role:"采购主管",name:"赵明",action:"审核通过",time:"09-10 11:00",done:true},
                {role:"仓管员",name:"张三",action:"待开始收货",time:"—",done:false},
                {role:"仓库主管",name:"陈亮",action:"待终审确认",time:"—",done:false},
              ].map((a,i)=>(
                <div key={i} className="flex items-start gap-2">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5
                    ${a.done?"bg-[#16A34A] text-white":"bg-[#F1F5F9] text-[#94A3B8] border border-[#E2E8F0]"}`}>
                    {a.done?<Ic d={P.check} size={10} />:i+1}
                  </div>
                  <div>
                    <div className="text-xs font-medium text-[#0F172A]">{a.role}：{a.name}</div>
                    <div className="text-xs text-[#64748B]">{a.action}</div>
                    <div className="text-[10px] text-[#94A3B8]">{a.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Main content */}
        <Card className="col-span-3" noPad>
          <div className="px-5 pt-5">
            <Tabs
              active={tab} onChange={setTab}
              tabs={[{key:"lines",label:"商品明细",badge:PO_LINES.length},{key:"log",label:"操作日志"},{key:"attach",label:"附件"}]}
            />
          </div>

          {tab==="lines" && (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                      {["商品名称","SKU / 条码","单位","合同价","采购量","已收量","待收量","小计","状态","备注"].map(h=>(
                        <th key={h} className="px-3 py-3 text-left text-xs font-semibold text-[#64748B] uppercase whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {PO_LINES.map(row=>(
                      <tr key={row.id} className={`border-b border-[#F1F5F9] hover:bg-[#F8FAFC] transition-colors
                        ${row.status==="待入库"?"bg-[#FFFBEB]":row.note?"bg-[#FFFBEB]":""}`}>
                        <td className="px-3 py-3 font-medium text-[#0F172A] whitespace-nowrap">{row.name}</td>
                        <td className="px-3 py-3">
                          <div className="font-mono text-xs text-[#64748B]">{row.sku}</div>
                          <div className="font-mono text-[10px] text-[#CBD5E1]">{row.barcode}</div>
                        </td>
                        <td className="px-3 py-3 text-[#64748B]">{row.unit}</td>
                        <td className="px-3 py-3">¥{row.price.toFixed(2)}</td>
                        <td className="px-3 py-3 font-medium">{row.qty}</td>
                        <td className="px-3 py-3">
                          <span className={row.recv===row.qty?"text-[#16A34A] font-medium":row.recv>0?"text-[#D97706] font-medium":"text-[#94A3B8]"}>
                            {row.recv}
                          </span>
                        </td>
                        <td className="px-3 py-3">
                          <span className={row.pend>0?"text-[#DC2626] font-medium":"text-[#94A3B8]"}>{row.pend}</span>
                        </td>
                        <td className="px-3 py-3 font-semibold">¥{row.amt.toFixed(2)}</td>
                        <td className="px-3 py-3">
                          <Badge dot label={row.status}
                            color={row.status==="入库完成"?"green":row.status==="部分入库"?"yellow":row.status==="待入库"?"orange":"gray"} />
                        </td>
                        <td className="px-3 py-3 max-w-[120px]">
                          {row.note
                            ? <span className="text-xs text-[#D97706] flex items-start gap-1"><Ic d={P.alertTri} size={11} className="flex-shrink-0 mt-0.5" />{row.note}</span>
                            : <span className="text-[#CBD5E1] text-xs">—</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-[#F8FAFC] border-t-2 border-[#CBD5E1]">
                      <td colSpan={4} className="px-3 py-3 text-right text-sm font-semibold text-[#334155]">合计</td>
                      <td className="px-3 py-3 font-bold text-[#0F172A]">{totalQty}</td>
                      <td className="px-3 py-3 font-bold text-[#16A34A]">{totalRecv}</td>
                      <td className="px-3 py-3 font-bold text-[#DC2626]">{totalPend}</td>
                      <td className="px-3 py-3 font-bold text-[#2563EB]">¥{totalAmt.toFixed(2)}</td>
                      <td colSpan={2}></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              {/* Progress summary */}
              <div className="px-5 py-4 border-t border-[#E2E8F0] bg-[#F8FAFC] rounded-b-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-[#64748B]">整体入库进度</span>
                  <span className={`text-xs font-semibold ${pct===100?"text-[#16A34A]":pct>=50?"text-[#D97706]":"text-[#DC2626]"}`}>{pct}%</span>
                </div>
                <div className="w-full h-2 bg-[#E2E8F0] rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{width:`${pct}%`,background:pct===100?"#16A34A":"#D97706"}} />
                </div>
              </div>
            </>
          )}

          {tab==="log" && (
            <div className="px-5 pb-5 space-y-0">
              {[
                {time:"2025-09-10 09:30",user:"采购员-王芳",action:"创建单据",detail:"新建采购入库单，共 6 种商品，总金额 ¥3,196",type:"create"},
                {time:"2025-09-10 11:00",user:"采购主管-赵明",action:"审核通过",detail:"合同 HT-2024-001 有效，金额 ¥3,196 在授权额度内，审核通过",type:"approve"},
                {time:"2025-09-10 14:30",user:"仓管-张三",action:"开始收货",detail:"扫描开始收货，可口可乐 330ml 240 件（10 箱）/ 农夫山泉 550ml 480 件（20 箱）入库",type:"receive"},
                {time:"2025-09-10 15:20",user:"仓管-张三",action:"发现差异",detail:"乐事薯片原味 75g 实收 180 件（9 箱），短少 20 件（1 箱）。已联系供应商，确认补货中",type:"warn"},
                {time:"2025-09-10 16:00",user:"仓管-张三",action:"继续入库",detail:"元气森林苏打气泡水 300 件 / 光明莫斯利安酸奶 180 件 已完成入库",type:"receive"},
              ].map((log,i)=>(
                <div key={i} className="flex gap-3 relative">
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full flex-shrink-0 mt-4 z-10
                      ${log.type==="approve"?"bg-[#16A34A]":log.type==="warn"?"bg-[#D97706]":log.type==="create"?"bg-[#94A3B8]":"bg-[#2563EB]"}`} />
                    {i<4&&<div className="w-px flex-1 bg-[#E2E8F0] mt-1" />}
                  </div>
                  <div className="flex-1 pb-5">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-semibold text-[#0F172A]">{log.action}</span>
                      <span className="text-xs text-[#94A3B8]">· {log.user}</span>
                    </div>
                    <p className="text-xs text-[#64748B] leading-relaxed">{log.detail}</p>
                    <p className="text-[10px] text-[#94A3B8] mt-1">{log.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab==="attach" && (
            <div className="px-5 pb-5">
              <div className="space-y-2 mb-4">
                {[
                  {name:"送货单-PO-20250910-001.pdf",size:"1.2MB",time:"2025-09-10 14:30",uploader:"仓管-张三"},
                  {name:"供应商合格证-可口可乐.pdf",size:"0.8MB",time:"2025-09-10 14:35",uploader:"仓管-张三"},
                ].map((f,i)=>(
                  <div key={i} className="flex items-center gap-3 p-3 border border-[#E2E8F0] rounded-lg hover:bg-[#F8FAFC]">
                    <div className="w-8 h-8 rounded bg-[#FEF2F2] flex items-center justify-center text-[#DC2626] flex-shrink-0">
                      <Ic d={P.fileText} size={16} />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-[#0F172A]">{f.name}</div>
                      <div className="text-xs text-[#94A3B8]">{f.size} · {f.time} · {f.uploader}</div>
                    </div>
                    <Btn variant="ghost" size="sm" icon="download">下载</Btn>
                  </div>
                ))}
              </div>
              <div className="border-2 border-dashed border-[#E2E8F0] rounded-lg p-8 flex flex-col items-center gap-2 text-[#94A3B8] hover:border-[#2563EB] hover:text-[#2563EB] cursor-pointer transition-all">
                <Ic d={P.upload} size={22} />
                <span className="text-sm">上传随货附件</span>
                <span className="text-xs">支持 PDF / JPG / PNG，单文件 ≤ 20MB</span>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// PAGE 10 – 采购单管理 LIST
// ══════════════════════════════════════════════════════════════════════════════

// Sample data
const WAREHOUSES = [
  { id: "sz", name: "华南中心仓（深圳）", province: "广东省", city: "深圳市", district: "南山区" },
  { id: "sh", name: "华东中心仓（上海）", province: "上海市", city: "上海市", district: "青浦区" },
  { id: "bj", name: "华北中心仓（北京）", province: "北京市", city: "北京市", district: "顺义区" },
  { id: "cd", name: "西南中心仓（成都）", province: "四川省", city: "成都市", district: "高新区" },
];

type InboundStatus = "未入库" | "部分入库" | "已完成";
type POStatus = "草稿" | "待审核" | "已审核" | "执行中" | "已完成" | "已取消";

const INBOUND_STATUS_MAP: Record<InboundStatus, BC> = {
  "未入库": "gray",
  "部分入库": "yellow",
  "已完成": "green",
};
const PO_MGT_STATUS_MAP: Record<POStatus, BC> = {
  "草稿": "gray",
  "待审核": "yellow",
  "已审核": "blue",
  "执行中": "cyan",
  "已完成": "green",
  "已取消": "red",
};

type POMRow = {
  id: string; name: string; inboundNo: string | null;
  warehouseId: string; supplier: string;
  totalBoxes: number; totalQty: number; actualQty: number;
  expectedDate: string; operator: string;
  inboundStatus: InboundStatus; actualInboundTime: string | null;
  poStatus: POStatus; creator: string; createdAt: string;
};

const POM_ROWS: POMRow[] = [
  { id:"POM-20250910-001", name:"九月华南常规补货-可口可乐", inboundNo:"PIB-20250912-001", warehouseId:"sz", supplier:"可口可乐（中国）饮料有限公司",
    totalBoxes:120, totalQty:2400, actualQty:2400, expectedDate:"2025-09-12", operator:"王芳",
    inboundStatus:"已完成", actualInboundTime:"2025-09-12 14:30", poStatus:"已完成", creator:"李采购", createdAt:"2025-09-10 09:15" },
  { id:"POM-20250910-002", name:"九月华南常规补货-统一", inboundNo:"PIB-20250913-002", warehouseId:"sz", supplier:"统一企业（中国）投资有限公司",
    totalBoxes:80, totalQty:1600, actualQty:900, expectedDate:"2025-09-13", operator:"王芳",
    inboundStatus:"部分入库", actualInboundTime:null, poStatus:"执行中", creator:"李采购", createdAt:"2025-09-10 10:00" },
  { id:"POM-20250909-003", name:"华北紧急补货-农夫山泉", inboundNo:null, warehouseId:"bj", supplier:"农夫山泉股份有限公司",
    totalBoxes:60, totalQty:1200, actualQty:0, expectedDate:"2025-09-16", operator:"张明",
    inboundStatus:"未入库", actualInboundTime:null, poStatus:"已审核", creator:"张明", createdAt:"2025-09-09 14:22" },
  { id:"POM-20250908-004", name:"华东新品首采-元气森林", inboundNo:null, warehouseId:"sh", supplier:"元气森林（北京）食品科技集团有限公司",
    totalBoxes:50, totalQty:1000, actualQty:0, expectedDate:"2025-09-18", operator:"陈晓",
    inboundStatus:"未入库", actualInboundTime:null, poStatus:"待审核", creator:"陈晓", createdAt:"2025-09-08 16:40" },
  { id:"POM-20250907-005", name:"西南促销囤货-好丽友", inboundNo:"PIB-20250911-003", warehouseId:"cd", supplier:"好丽友食品有限公司",
    totalBoxes:200, totalQty:3600, actualQty:3600, expectedDate:"2025-09-11", operator:"刘洋",
    inboundStatus:"已完成", actualInboundTime:"2025-09-11 10:00", poStatus:"已完成", creator:"刘洋", createdAt:"2025-09-07 08:30" },
  { id:"POM-20250906-006", name:"华东补货-乐事薯片", inboundNo:null, warehouseId:"sh", supplier:"百事食品（中国）有限公司",
    totalBoxes:90, totalQty:2160, actualQty:0, expectedDate:"2025-09-20", operator:"陈晓",
    inboundStatus:"未入库", actualInboundTime:null, poStatus:"草稿", creator:"陈晓", createdAt:"2025-09-06 11:10" },
  { id:"POM-20250905-007", name:"华南九月常规补货-光明乳业", inboundNo:null, warehouseId:"sz", supplier:"光明乳业股份有限公司",
    totalBoxes:40, totalQty:960, actualQty:0, expectedDate:"2025-09-19", operator:"王芳",
    inboundStatus:"未入库", actualInboundTime:null, poStatus:"已取消", creator:"王芳", createdAt:"2025-09-05 09:45" },
  { id:"POM-20250904-008", name:"华北常规补货-康师傅", inboundNo:"PIB-20250909-004", warehouseId:"bj", supplier:"康师傅控股有限公司",
    totalBoxes:100, totalQty:2400, actualQty:1800, expectedDate:"2025-09-09", operator:"张明",
    inboundStatus:"部分入库", actualInboundTime:null, poStatus:"执行中", creator:"张明", createdAt:"2025-09-04 13:20" },
];

export const PurchaseMgmtList = ({ onCreate, onInboundNo }: { onCreate:()=>void; onInboundNo?:()=>void }) => {
  const [deleteTarget, setDeleteTarget] = useState<POMRow|null>(null);
  const [createInboundTarget, setCreateInboundTarget] = useState<POMRow|null>(null);
  const [createInboundSuccess, setCreateInboundSuccess] = useState<string|null>(null);

  const canEdit = (r: POMRow) => r.inboundStatus === "未入库" && r.poStatus !== "已完成" && r.poStatus !== "已取消";
  const canDelete = (r: POMRow) => r.inboundStatus === "未入库" && r.poStatus !== "已完成" && r.poStatus !== "已取消";
  const canCreateInbound = (r: POMRow) => r.inboundStatus !== "已完成" && r.poStatus === "已审核" || r.poStatus === "执行中";

  const whMap = Object.fromEntries(WAREHOUSES.map(w => [w.id, w]));

  return (
    <div>
      <PH
        title="采购单管理"
        crumbs={["首页", "ERP管理", "采购单管理"]}
        actions={
          <>
            <Btn variant="secondary" icon="download" size="sm">导出采购单</Btn>
            <Btn variant="secondary" icon="download" size="sm">导出商品明细</Btn>
            <Btn variant="primary" icon="plus" onClick={onCreate}>新增采购单</Btn>
          </>
        }
      />

      {/* Filter area */}
      <Card className="mb-4" noPad>
        <div className="flex flex-wrap gap-3 items-end p-4">
          <FL label="采购单编号" width="160px">
            <Inp placeholder="模糊搜索编号" icon="search" className="w-40" />
          </FL>
          <FL label="采购名称" width="160px">
            <Inp placeholder="模糊搜索名称" icon="search" className="w-40" />
          </FL>
          <FL label="采购仓库" width="176px">
            <Sel className="w-44" options={[
              { label:"全部仓库", value:"" },
              ...WAREHOUSES.map(w=>({ label:w.name, value:w.id }))
            ]} />
          </FL>
          <FL label="采购供应商" width="176px">
            <Sel className="w-44" options={[
              { label:"全部供应商", value:"" },
              { label:"可口可乐（中国）饮料有限公司", value:"s1" },
              { label:"统一企业（中国）投资有限公司", value:"s2" },
              { label:"农夫山泉股份有限公司", value:"s3" },
              { label:"元气森林食品科技集团有限公司", value:"s4" },
            ]} />
          </FL>
          <FL label="预计到货日期" width="220px">
            <div className="flex items-center gap-1">
              <input type="date" className="h-9 border border-[#E2E8F0] rounded-md text-sm px-3 text-[#334155] focus:outline-none focus:border-[#2563EB]" />
              <span className="text-[#94A3B8] text-xs flex-shrink-0">至</span>
              <input type="date" className="h-9 border border-[#E2E8F0] rounded-md text-sm px-3 text-[#334155] focus:outline-none focus:border-[#2563EB]" />
            </div>
          </FL>
          <FL label="创建日期" width="220px">
            <div className="flex items-center gap-1">
              <input type="date" className="h-9 border border-[#E2E8F0] rounded-md text-sm px-3 text-[#334155] focus:outline-none focus:border-[#2563EB]" />
              <span className="text-[#94A3B8] text-xs flex-shrink-0">至</span>
              <input type="date" className="h-9 border border-[#E2E8F0] rounded-md text-sm px-3 text-[#334155] focus:outline-none focus:border-[#2563EB]" />
            </div>
          </FL>
          <div className="flex items-end gap-2">
            <Btn variant="primary" icon="search">搜索</Btn>
            <Btn variant="secondary">重置</Btn>
          </div>
        </div>
      </Card>

      {/* Success banner */}
      {createInboundSuccess && (
        <div className="flex items-center gap-3 px-4 py-3 bg-[#F0FDF4] border border-[#BBF7D0] rounded-lg mb-3 text-sm">
          <Ic d={P.check} size={16} className="text-[#16A34A] flex-shrink-0" />
          <span className="text-[#14532D]">采购入库单 <span className="font-mono font-semibold text-[#16A34A]">{createInboundSuccess}</span> 已成功创建，可在采购入库单列表中查看。</span>
          <button onClick={()=>setCreateInboundSuccess(null)} className="ml-auto text-[#94A3B8] hover:text-[#334155]"><Ic d={P.x} size={14} /></button>
        </div>
      )}

      <Card noPad>
        {/* Lock-status legend */}
        <div className="flex items-center gap-4 px-4 py-2.5 border-b border-[#F1F5F9] bg-[#FAFBFC]">
          <span className="text-xs text-[#94A3B8]">操作权限说明：</span>
          <span className="flex items-center gap-1.5 text-xs text-[#64748B]">
            <span className="w-4 h-4 rounded bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center"><Ic d={P.edit} size={9} className="text-[#2563EB]" /></span>
            未入库可修改/取消
          </span>
          <span className="flex items-center gap-1.5 text-xs text-[#64748B]">
            <span className="w-4 h-4 rounded bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center"><Ic d={P.shield} size={9} className="text-[#94A3B8]" /></span>
            已入库操作锁定
          </span>
          <span className="flex items-center gap-1.5 text-xs text-[#64748B]">
            <span className="w-4 h-4 rounded bg-[#F0FDF4] border border-[#BBF7D0] flex items-center justify-center"><Ic d={P.inbox} size={9} className="text-[#16A34A]" /></span>
            已审核可创建入库单
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse" style={{minWidth:"1600px"}}>
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                {[
                  { label:"采购单编号", w:"140px" },
                  { label:"采购名称", w:"180px" },
                  { label:"关联采购入库单号", w:"148px" },
                  { label:"采购仓库", w:"160px" },
                  { label:"仓所在省市区", w:"130px" },
                  { label:"采购供应商", w:"160px" },
                  { label:"总箱数", w:"72px" },
                  { label:"总商品件数", w:"88px" },
                  { label:"实际入库件数", w:"96px" },
                  { label:"预计到货日期", w:"108px" },
                  { label:"操作人", w:"80px" },
                  { label:"入库状态", w:"88px" },
                  { label:"实际入库时间", w:"130px" },
                  { label:"采购单状态", w:"88px" },
                  { label:"创建人", w:"72px" },
                  { label:"创建日期", w:"140px" },
                  { label:"操作", w:"220px" },
                ].map(h => (
                  <th key={h.label} style={{minWidth:h.w}} className="px-3 py-3 text-left text-[11px] font-semibold text-[#64748B] uppercase tracking-wide whitespace-nowrap">
                    {h.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {POM_ROWS.map((r, i) => {
                const wh = whMap[r.warehouseId];
                const locked = !canEdit(r);
                return (
                  <tr key={r.id}
                    className={`border-b border-[#F1F5F9] transition-colors ${locked ? "bg-[#FAFBFC]" : "hover:bg-[#F8FAFC]"}`}>
                    {/* 采购单编号 */}
                    <td className="px-3 py-3 whitespace-nowrap">
                      <span className="font-mono text-xs font-medium text-[#0F172A]">{r.id}</span>
                    </td>
                    {/* 采购名称 */}
                    <td className="px-3 py-3">
                      <span className="text-[#334155] font-medium text-xs leading-relaxed line-clamp-2 max-w-[176px] block">{r.name}</span>
                    </td>
                    {/* 关联采购入库单号 */}
                    <td className="px-3 py-3 whitespace-nowrap">
                      {r.inboundNo
                        ? <button onClick={onInboundNo} className="font-mono text-xs text-[#2563EB] hover:underline hover:text-[#1D4ED8] flex items-center gap-0.5">
                            {r.inboundNo}
                            <Ic d={P.link} size={10} />
                          </button>
                        : <span className="text-[#CBD5E1] text-xs">—</span>}
                    </td>
                    {/* 采购仓库 */}
                    <td className="px-3 py-3 whitespace-nowrap">
                      <span className="text-xs text-[#334155]">{wh?.name ?? "—"}</span>
                    </td>
                    {/* 省市区 */}
                    <td className="px-3 py-3 whitespace-nowrap">
                      <span className="text-xs text-[#64748B]">{wh ? `${wh.province} ${wh.district}` : "—"}</span>
                    </td>
                    {/* 供应商 */}
                    <td className="px-3 py-3">
                      <span className="text-xs text-[#334155] max-w-[156px] block truncate" title={r.supplier}>{r.supplier}</span>
                    </td>
                    {/* 总箱数 */}
                    <td className="px-3 py-3 text-right whitespace-nowrap">
                      <span className="text-sm font-medium text-[#0F172A]">{r.totalBoxes.toLocaleString()}</span>
                    </td>
                    {/* 总商品件数 */}
                    <td className="px-3 py-3 text-right whitespace-nowrap">
                      <span className="text-sm font-medium text-[#0F172A]">{r.totalQty.toLocaleString()}</span>
                    </td>
                    {/* 实际入库件数 */}
                    <td className="px-3 py-3 text-right whitespace-nowrap">
                      {r.actualQty > 0
                        ? <div>
                            <span className={`text-sm font-semibold ${r.actualQty >= r.totalQty ? "text-[#16A34A]" : "text-[#D97706]"}`}>{r.actualQty.toLocaleString()}</span>
                            {r.actualQty < r.totalQty && (
                              <div className="w-full bg-[#FDE68A] rounded-full h-1 mt-0.5" style={{width:"56px"}}>
                                <div className="bg-[#D97706] h-1 rounded-full" style={{width:`${Math.round(r.actualQty/r.totalQty*100)}%`}} />
                              </div>
                            )}
                          </div>
                        : <span className="text-[#CBD5E1] text-sm">0</span>}
                    </td>
                    {/* 预计到货 */}
                    <td className="px-3 py-3 whitespace-nowrap">
                      <span className="text-xs text-[#64748B]">{r.expectedDate}</span>
                    </td>
                    {/* 操作人 */}
                    <td className="px-3 py-3 whitespace-nowrap">
                      <span className="text-xs text-[#334155]">{r.operator}</span>
                    </td>
                    {/* 入库状态 */}
                    <td className="px-3 py-3 whitespace-nowrap">
                      <Badge label={r.inboundStatus} color={INBOUND_STATUS_MAP[r.inboundStatus]} dot />
                    </td>
                    {/* 实际入库时间 */}
                    <td className="px-3 py-3 whitespace-nowrap">
                      {r.actualInboundTime
                        ? <span className="text-xs text-[#64748B]">{r.actualInboundTime}</span>
                        : <span className="text-[#CBD5E1] text-xs">—</span>}
                    </td>
                    {/* 采购单状态 */}
                    <td className="px-3 py-3 whitespace-nowrap">
                      <Badge label={r.poStatus} color={PO_MGT_STATUS_MAP[r.poStatus]} dot />
                    </td>
                    {/* 创建人 */}
                    <td className="px-3 py-3 whitespace-nowrap">
                      <span className="text-xs text-[#334155]">{r.creator}</span>
                    </td>
                    {/* 创建日期 */}
                    <td className="px-3 py-3 whitespace-nowrap">
                      <span className="text-xs text-[#64748B]">{r.createdAt}</span>
                    </td>
                    {/* 操作 */}
                    <td className="px-3 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        {canEdit(r)
                          ? <Btn variant="ghost" size="sm" icon="edit">修改</Btn>
                          : <span className="inline-flex items-center gap-1 px-2 py-1 text-xs text-[#CBD5E1] cursor-not-allowed select-none">
                              <Ic d={P.shield} size={11} className="text-[#CBD5E1]" />修改
                            </span>
                        }
                        {canDelete(r)
                          ? <Btn variant="ghost" size="sm" className="!text-[#DC2626] hover:!bg-[#FEF2F2]" onClick={()=>setDeleteTarget(r)}>
                              <Ic d={P.x} size={12} />取消
                            </Btn>
                          : <span className="inline-flex items-center gap-1 px-2 py-1 text-xs text-[#CBD5E1] cursor-not-allowed select-none">
                              <Ic d={P.shield} size={11} className="text-[#CBD5E1]" />取消
                            </span>
                        }
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-[#E2E8F0]">
          <span className="text-xs text-[#64748B]">共 <strong className="text-[#334155]">28</strong> 条记录</span>
          <div className="flex items-center gap-1">
            <button className="px-2.5 py-1.5 text-xs border border-[#E2E8F0] rounded text-[#64748B] hover:bg-[#F8FAFC]">上一页</button>
            {[1,2,3].map(p=>(
              <button key={p} className={`w-8 h-7 text-xs border rounded ${p===1?"bg-[#2563EB] text-white border-[#2563EB]":"border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFC]"}`}>{p}</button>
            ))}
            <button className="px-2.5 py-1.5 text-xs border border-[#E2E8F0] rounded text-[#64748B] hover:bg-[#F8FAFC]">下一页</button>
          </div>
        </div>
      </Card>

      {/* Delete confirm modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={()=>setDeleteTarget(null)} />
          <div className="relative bg-white rounded-xl shadow-xl border border-[#E2E8F0] w-[440px]">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2E8F0]">
              <h2 className="text-base font-semibold text-[#0F172A]">确认取消采购单</h2>
              <button onClick={()=>setDeleteTarget(null)} className="text-[#94A3B8] hover:text-[#334155]"><Ic d={P.x} size={18} /></button>
            </div>
            <div className="px-5 py-4">
              <div className="flex items-start gap-3 rounded-lg border border-[#FECACA] bg-[#FEF2F2] p-3 mb-3">
                <Ic d={P.alertTri} size={17} className="text-[#DC2626] mt-0.5 flex-shrink-0" />
                <div className="text-sm text-[#991B1B] leading-6">
                  <p>确认取消采购单 <strong className="font-mono">{deleteTarget.id}</strong> 吗？</p>
                  <p className="text-xs text-[#B91C1C] mt-1">取消后采购单不可恢复，该操作仅在未发生入库操作时可执行。</p>
                </div>
              </div>
              <div className="text-xs text-[#64748B] bg-[#F8FAFC] rounded-lg p-3 space-y-1">
                <div><span className="text-[#94A3B8]">采购名称：</span>{deleteTarget.name}</div>
                <div><span className="text-[#94A3B8]">采购供应商：</span>{deleteTarget.supplier}</div>
                <div><span className="text-[#94A3B8]">入库状态：</span><Badge label={deleteTarget.inboundStatus} color={INBOUND_STATUS_MAP[deleteTarget.inboundStatus]} /></div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-[#E2E8F0] bg-[#F8FAFC] rounded-b-xl">
              <Btn variant="secondary" onClick={()=>setDeleteTarget(null)}>取消</Btn>
              <Btn variant="danger" onClick={()=>setDeleteTarget(null)}>确认取消</Btn>
            </div>
          </div>
        </div>
      )}

      {/* Create inbound confirm modal */}
      {createInboundTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={()=>setCreateInboundTarget(null)} />
          <div className="relative bg-white rounded-xl shadow-xl border border-[#E2E8F0] w-[520px]">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2E8F0]">
              <h2 className="text-base font-semibold text-[#0F172A]">创建采购入库单</h2>
              <button onClick={()=>setCreateInboundTarget(null)} className="text-[#94A3B8] hover:text-[#334155]"><Ic d={P.x} size={18} /></button>
            </div>
            <div className="px-5 py-4">
              <div className="flex items-start gap-3 rounded-lg border border-[#BFDBFE] bg-[#EFF6FF] p-3 mb-4">
                <Ic d={P.info} size={17} className="text-[#2563EB] mt-0.5 flex-shrink-0" />
                <p className="text-sm text-[#1D4ED8] leading-6">
                  确认后系统将自动生成关联采购入库单，入库单与本采购单双向关联，仓库人员可在采购入库单列表中进行收货操作。
                </p>
              </div>
              <div className="bg-[#F8FAFC] rounded-lg p-4 grid grid-cols-2 gap-3 text-xs">
                <div><span className="text-[#94A3B8]">采购单编号：</span><span className="font-mono font-medium text-[#0F172A]">{createInboundTarget.id}</span></div>
                <div><span className="text-[#94A3B8]">采购名称：</span><span className="text-[#334155] font-medium">{createInboundTarget.name.slice(0,18)}...</span></div>
                <div><span className="text-[#94A3B8]">收货仓库：</span><span className="text-[#334155]">{whMap[createInboundTarget.warehouseId]?.name}</span></div>
                <div><span className="text-[#94A3B8]">采购供应商：</span><span className="text-[#334155] truncate block">{createInboundTarget.supplier.slice(0,14)}...</span></div>
                <div><span className="text-[#94A3B8]">总箱数：</span><span className="font-semibold text-[#0F172A]">{createInboundTarget.totalBoxes} 箱</span></div>
                <div><span className="text-[#94A3B8]">总商品件数：</span><span className="font-semibold text-[#0F172A]">{createInboundTarget.totalQty} 件</span></div>
                <div><span className="text-[#94A3B8]">预计到货日期：</span><span className="text-[#334155]">{createInboundTarget.expectedDate}</span></div>
                <div><span className="text-[#94A3B8]">采购单状态：</span><Badge label={createInboundTarget.poStatus} color={PO_MGT_STATUS_MAP[createInboundTarget.poStatus]} /></div>
              </div>
              <div className="mt-3 text-xs text-[#94A3B8] flex items-center gap-1">
                <Ic d={P.alertTri} size={11} />
                生成后采购单状态将更新为「执行中」，可随时在采购入库单列表中追踪进度。
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-[#E2E8F0] bg-[#F8FAFC] rounded-b-xl">
              <Btn variant="secondary" onClick={()=>setCreateInboundTarget(null)}>取消</Btn>
              <Btn variant="primary" icon="inbox" onClick={()=>{
                const newNo = `PIB-${new Date().toISOString().slice(0,10).replace(/-/g,"")}-${Math.floor(Math.random()*900+100)}`;
                setCreateInboundTarget(null);
                setCreateInboundSuccess(newNo);
              }}>确认创建入库单</Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// PAGE 11 – 新增采购单
// ══════════════════════════════════════════════════════════════════════════════

// Candidate SKU pool for search-add
type SkuItem = { id:string; name:string; barcode:string; boxSpec:number; unit:string; costPrice:number };
const SKU_POOL: SkuItem[] = [
  { id:"SKU-DRINK-001", name:"可口可乐 330ml", barcode:"6920202888883", boxSpec:24, unit:"罐", costPrice:1.85 },
  { id:"SKU-DRINK-002", name:"可口可乐 500ml", barcode:"6920202888890", boxSpec:24, unit:"瓶", costPrice:2.40 },
  { id:"SKU-DRINK-003", name:"雪碧 330ml", barcode:"6920202888916", boxSpec:24, unit:"罐", costPrice:1.85 },
  { id:"SKU-DRINK-004", name:"芬达橙味 330ml", barcode:"6920202888923", boxSpec:24, unit:"罐", costPrice:1.85 },
  { id:"SKU-DRINK-005", name:"农夫山泉矿泉水 550ml", barcode:"6921168509256", boxSpec:24, unit:"瓶", costPrice:0.72 },
  { id:"SKU-DRINK-006", name:"农夫山泉矿泉水 380ml", barcode:"6921168509270", boxSpec:24, unit:"瓶", costPrice:0.55 },
  { id:"SKU-DRINK-007", name:"统一冰红茶 500ml", barcode:"6925303721512", boxSpec:15, unit:"瓶", costPrice:1.45 },
  { id:"SKU-DRINK-008", name:"统一鲜橙多 500ml", barcode:"6925303721529", boxSpec:15, unit:"瓶", costPrice:1.55 },
  { id:"SKU-DRINK-009", name:"元气森林苏打水 480ml", barcode:"6970640400016", boxSpec:15, unit:"瓶", costPrice:2.20 },
  { id:"SKU-SNACK-001", name:"乐事薯片原味 75g", barcode:"6920202888947", boxSpec:20, unit:"袋", costPrice:3.20 },
  { id:"SKU-SNACK-002", name:"乐事薯片番茄味 75g", barcode:"6920202888954", boxSpec:20, unit:"袋", costPrice:3.20 },
  { id:"SKU-SNACK-003", name:"好丽友派巧克力 6枚", barcode:"6920202888961", boxSpec:12, unit:"盒", costPrice:5.50 },
  { id:"SKU-DAIRY-001", name:"光明莫斯利安酸奶 200g", barcode:"6920202888978", boxSpec:12, unit:"杯", costPrice:2.60 },
  { id:"SKU-DAIRY-002", name:"蒙牛纯牛奶 250ml", barcode:"6920202888985", boxSpec:24, unit:"盒", costPrice:1.80 },
  { id:"SKU-MEAL-001", name:"自热米饭红烧牛肉 405g", barcode:"6920202888992", boxSpec:6, unit:"盒", costPrice:8.80 },
];

type LineItem = SkuItem & { boxes:number; qty:number; totalPrice:number };

export const PurchaseMgmtNew = ({ onBack }: { onBack:()=>void }) => {
  // Form state
  const poNo = "POM-" + new Date().toISOString().slice(0,10).replace(/-/g,"") + "-" + String(Math.floor(Math.random()*900)+100).padStart(3,"0");
  const [name, setName] = useState("");
  const [warehouseId, setWarehouseId] = useState("");
  const [supplierId, setSupplierId] = useState("");
  const [supplierSearch, setSupplierSearch] = useState("");
  const [supplierDropOpen, setSupplierDropOpen] = useState(false);
  const [expectedDate, setExpectedDate] = useState("");
  const [remark, setRemark] = useState("");

  // Lines
  const [lines, setLines] = useState<LineItem[]>([]);

  // Search-add panel
  const [searchOpen, setSearchOpen] = useState(false);
  const [skuSearch, setSkuSearch] = useState("");
  const filteredSku = skuSearch.trim()
    ? SKU_POOL.filter(s => s.name.includes(skuSearch) || s.barcode.includes(skuSearch) || s.id.includes(skuSearch))
    : SKU_POOL.slice(0,8);

  // Batch import panel
  const [importOpen, setImportOpen] = useState(false);

  // Modals
  const [backConfirm, setBackConfirm] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string,string>>({});

  // Derived
  const isDirty = name || warehouseId || supplierId || expectedDate || lines.length > 0;
  const totalBoxes = lines.reduce((s,l) => s + l.boxes, 0);
  const totalQty = lines.reduce((s,l) => s + l.qty, 0);
  const totalAmt = lines.reduce((s,l) => s + l.totalPrice, 0);

  // Supplier options
  const SUPPLIER_OPTIONS = [
    { id:"SUP-001", name:"可口可乐（中国）饮料有限公司", short:"可口可乐" },
    { id:"SUP-002", name:"统一企业（中国）投资有限公司", short:"统一企业" },
    { id:"SUP-003", name:"农夫山泉股份有限公司", short:"农夫山泉" },
    { id:"SUP-004", name:"元气森林（北京）食品科技集团有限公司", short:"元气森林" },
    { id:"SUP-005", name:"百事食品（中国）有限公司", short:"百事食品" },
    { id:"SUP-006", name:"好丽友食品有限公司", short:"好丽友" },
    { id:"SUP-007", name:"光明乳业股份有限公司", short:"光明乳业" },
    { id:"SUP-008", name:"蒙牛乳业（集团）股份有限公司", short:"蒙牛乳业" },
  ];
  const filteredSuppliers = supplierSearch
    ? SUPPLIER_OPTIONS.filter(s => s.name.includes(supplierSearch) || s.short.includes(supplierSearch))
    : SUPPLIER_OPTIONS;
  const selectedSupplier = SUPPLIER_OPTIONS.find(s => s.id === supplierId);

  const addLine = (sku: SkuItem) => {
    if (lines.find(l => l.id === sku.id)) return;
    setLines(prev => [...prev, { ...sku, boxes:1, qty:sku.boxSpec, totalPrice:+(sku.costPrice * sku.boxSpec).toFixed(2) }]);
    setSearchOpen(false);
    setSkuSearch("");
  };

  const updateLine = (id:string, field:"boxes"|"qty"|"costPrice", raw:string) => {
    const val = parseFloat(raw) || 0;
    setLines(prev => prev.map(l => {
      if (l.id !== id) return l;
      const next = { ...l, [field]: val };
      if (field === "boxes") { next.qty = val * l.boxSpec; }
      if (field === "qty") { next.boxes = Math.ceil(val / l.boxSpec); }
      next.totalPrice = +(next.costPrice * next.qty).toFixed(2);
      return next;
    }));
  };

  const removeLine = (id:string) => setLines(prev => prev.filter(l => l.id !== id));

  const validate = () => {
    const e: Record<string,string> = {};
    if (!name.trim()) e.name = "请填写采购名称";
    if (!warehouseId) e.warehouse = "请选择采购仓库";
    if (!supplierId) e.supplier = "请选择采购供应商";
    if (!expectedDate) e.expectedDate = "请选择预计到货日期";
    else if (expectedDate < new Date().toISOString().slice(0,10)) e.expectedDate = "预计到货日期不能早于今天";
    if (lines.length === 0) e.lines = "请至少添加一条商品明细";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) setSubmitSuccess(true);
  };

  const handleBack = () => {
    if (isDirty) setBackConfirm(true);
    else onBack();
  };

  const newInboundNo = "PIB-" + new Date().toISOString().slice(0,10).replace(/-/g,"") + "-" + String(Math.floor(Math.random()*900)+100).padStart(3,"0");

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="mb-5">
        <div className="flex items-center gap-1 text-xs text-[#94A3B8] mb-1.5">
          {["首页","ERP管理","采购单管理","新增采购单"].map((b,i,arr)=>(
            <span key={i} className="flex items-center gap-1">
              {i>0&&<Ic d={P.chevR} size={11}/>}
              <span className={i===arr.length-1?"text-[#64748B]":"hover:text-[#2563EB] cursor-pointer"}>{b}</span>
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={handleBack} className="flex items-center gap-1.5 text-[#64748B] hover:text-[#334155] text-sm transition-colors">
              <Ic d={P.chevL} size={16}/> 返回
            </button>
            <div className="h-5 w-px bg-[#E2E8F0]"/>
            <h1 className="text-xl font-bold text-[#0F172A]">新增采购单</h1>
          </div>
        </div>
      </div>

      {/* Business flow hint */}
      <div className="flex items-start gap-3 px-4 py-3 bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg mb-5 text-xs text-[#1D4ED8]">
        <Ic d={P.info} size={15} className="flex-shrink-0 mt-0.5"/>
        <div className="leading-5">
          <span className="font-semibold">采购单说明：</span>采购单是内部采购对账单据，包含商品进价与采购数量。
          提交后系统自动生成对应的<span className="font-semibold">采购入库单</span>并推送履约系统；
          仓库完成实物收货后，对应采购单自动标记为<span className="font-semibold">已完成</span>。
        </div>
      </div>

      {/* ── Section 1: Basic Info ── */}
      <Card className="mb-4">
        <div className="flex items-center gap-2 pb-4 mb-5 border-b border-[#F1F5F9]">
          <div className="w-1 h-4 bg-[#7C3AED] rounded-full"/>
          <h2 className="text-sm font-semibold text-[#0F172A]">基本信息</h2>
        </div>

        {/* System-generated PO number */}
        <div className="flex items-center gap-3 mb-5 px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg">
          <span className="text-xs text-[#94A3B8] flex-shrink-0">采购单编号（系统生成）</span>
          <span className="font-mono text-sm font-semibold text-[#334155] select-all">{poNo}</span>
          <span className="ml-auto text-xs text-[#94A3B8] flex items-center gap-1">
            <Ic d={P.shield} size={12}/>只读
          </span>
        </div>

        <FG cols={3}>
          {/* 采购名称 */}
          <FR label="采购名称" required col={3}>
            <Inp
              placeholder="请填写采购名称，例：九月华南常规补货-可口可乐"
              value={name}
              onChange={v => { setName(v); setErrors(e=>({...e, name:""})); }}
              error={errors.name}
            />
          </FR>

          {/* 采购仓库 */}
          <FR label="采购仓库" required>
            <div>
              <Sel
                value={warehouseId}
                onChange={v => { setWarehouseId(v); setErrors(e=>({...e, warehouse:""})); }}
                options={[{label:"请选择采购仓库",value:""},...WAREHOUSES.map(w=>({label:w.name,value:w.id}))]}
              />
              {errors.warehouse && <p className="text-xs text-[#DC2626] mt-1 flex items-center gap-1"><Ic d={P.alertTri} size={11}/>{errors.warehouse}</p>}
            </div>
          </FR>

          {/* 采购供应商 */}
          <FR label="采购供应商" required>
            <div className="relative">
              <div
                className={`h-9 border rounded-md flex items-center px-3 gap-2 cursor-pointer bg-white transition-all
                  ${errors.supplier?"border-[#DC2626]":"border-[#E2E8F0] hover:border-[#2563EB]"}
                  ${supplierDropOpen?"border-[#2563EB] ring-2 ring-[#DBEAFE]":""}`}
                onClick={()=>setSupplierDropOpen(o=>!o)}
              >
                <Ic d={P.search} size={13} className="text-[#94A3B8] flex-shrink-0"/>
                {selectedSupplier
                  ? <span className="text-sm text-[#0F172A] flex-1 truncate">{selectedSupplier.name}</span>
                  : <input
                      value={supplierSearch} onChange={e=>{ setSupplierSearch(e.target.value); setSupplierDropOpen(true); }}
                      placeholder="搜索供应商名称"
                      className="flex-1 text-sm text-[#334155] placeholder-[#94A3B8] outline-none bg-transparent"
                      onClick={e=>e.stopPropagation()}
                    />
                }
                {selectedSupplier
                  ? <button className="text-[#94A3B8] hover:text-[#DC2626] flex-shrink-0"
                      onClick={e=>{ e.stopPropagation(); setSupplierId(""); setSupplierSearch(""); }}>
                      <Ic d={P.x} size={13}/>
                    </button>
                  : <Ic d={P.chevD} size={13} className="text-[#94A3B8] flex-shrink-0"/>
                }
              </div>
              {supplierDropOpen && !selectedSupplier && (
                <div className="absolute z-30 top-full left-0 right-0 mt-1 bg-white border border-[#E2E8F0] rounded-lg shadow-lg max-h-52 overflow-y-auto">
                  {filteredSuppliers.length === 0
                    ? <div className="px-4 py-3 text-sm text-[#94A3B8]">未找到匹配供应商</div>
                    : filteredSuppliers.map(s=>(
                        <div key={s.id}
                          className="px-4 py-2.5 hover:bg-[#F8FAFC] cursor-pointer border-b border-[#F1F5F9] last:border-0"
                          onClick={()=>{ setSupplierId(s.id); setSupplierDropOpen(false); setErrors(e=>({...e,supplier:""})); }}>
                          <div className="text-sm text-[#0F172A] font-medium">{s.name}</div>
                          <div className="text-xs text-[#94A3B8] mt-0.5">{s.id}</div>
                        </div>
                      ))
                  }
                </div>
              )}
              {errors.supplier && <p className="text-xs text-[#DC2626] mt-1 flex items-center gap-1"><Ic d={P.alertTri} size={11}/>{errors.supplier}</p>}
            </div>
          </FR>

          {/* 预计到货日期 */}
          <FR label="预计到货日期" required>
            <div>
              <input
                type="date"
                value={expectedDate}
                min={new Date().toISOString().slice(0,10)}
                onChange={e=>{ setExpectedDate(e.target.value); setErrors(er=>({...er,expectedDate:""})); }}
                className={`w-full h-9 border rounded-md text-sm px-3 text-[#334155] focus:outline-none focus:ring-2 transition-all
                  ${errors.expectedDate?"border-[#DC2626] focus:border-[#DC2626] focus:ring-[#FEE2E2]":"border-[#E2E8F0] focus:border-[#2563EB] focus:ring-[#DBEAFE]"}`}
              />
              {errors.expectedDate && <p className="text-xs text-[#DC2626] mt-1 flex items-center gap-1"><Ic d={P.alertTri} size={11}/>{errors.expectedDate}</p>}
            </div>
          </FR>

          {/* 备注 */}
          <FR label="备注" col={3} hint={`${remark.length}/200 字符`}>
            <textarea
              value={remark}
              onChange={e=>setRemark(e.target.value.slice(0,200))}
              placeholder="选填，如：本次采购为九月常规补货，供应商已确认到货时间"
              rows={3}
              className="w-full border border-[#E2E8F0] rounded-md text-sm px-3 py-2 text-[#334155] placeholder-[#94A3B8] resize-none focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#DBEAFE]"
            />
          </FR>
        </FG>
      </Card>

      {/* ── Section 2: Lines ── */}
      <Card noPad>
        {/* Section header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-2">
            <div className="w-1 h-4 bg-[#7C3AED] rounded-full"/>
            <h2 className="text-sm font-semibold text-[#0F172A]">采购商品明细</h2>
            {lines.length > 0 && (
              <span className="px-2 py-0.5 bg-[#EFF6FF] text-[#2563EB] text-xs font-semibold rounded-full border border-[#BFDBFE]">
                {lines.length} 种商品
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Btn variant="secondary" size="sm" icon="search" onClick={()=>{ setSearchOpen(o=>!o); setImportOpen(false); }}>
              搜索添加
            </Btn>
            <Btn variant="secondary" size="sm" icon="upload" onClick={()=>{ setImportOpen(o=>!o); setSearchOpen(false); }}>
              批量导入
            </Btn>
          </div>
        </div>

        {/* Search-add panel */}
        {searchOpen && (
          <div className="border-b border-[#E2E8F0] bg-[#F8FAFC]">
            <div className="px-5 py-4">
              <div className="flex items-center gap-3 mb-3">
                <Ic d={P.search} size={14} className="text-[#7C3AED]"/>
                <span className="text-sm font-medium text-[#334155]">搜索商品添加到明细</span>
                <button onClick={()=>setSearchOpen(false)} className="ml-auto text-[#94A3B8] hover:text-[#334155]"><Ic d={P.x} size={16}/></button>
              </div>
              <Inp
                placeholder="输入商品名称 / 69码 / 商品ID 模糊搜索"
                value={skuSearch}
                onChange={setSkuSearch}
                icon="search"
                className="mb-3"
              />
              <div className="border border-[#E2E8F0] rounded-lg overflow-hidden bg-white">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                      {["商品ID","商品名称","69码","箱规","进价","操作"].map(h=>(
                        <th key={h} className="px-3 py-2.5 text-left text-xs font-semibold text-[#64748B] uppercase whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSku.map(s=>{
                      const added = !!lines.find(l=>l.id===s.id);
                      return (
                        <tr key={s.id} className={`border-b border-[#F1F5F9] last:border-0 ${added?"bg-[#F0FDF4]":"hover:bg-[#F8FAFC]"}`}>
                          <td className="px-3 py-2 font-mono text-xs text-[#64748B]">{s.id}</td>
                          <td className="px-3 py-2 font-medium text-[#0F172A]">{s.name}</td>
                          <td className="px-3 py-2 font-mono text-xs text-[#64748B]">{s.barcode}</td>
                          <td className="px-3 py-2 text-[#64748B] text-xs">{s.boxSpec} {s.unit}/箱</td>
                          <td className="px-3 py-2 font-medium text-[#334155]">¥{s.costPrice.toFixed(2)}</td>
                          <td className="px-3 py-2">
                            {added
                              ? <span className="flex items-center gap-1 text-xs text-[#16A34A]"><Ic d={P.check} size={12}/>已添加</span>
                              : <Btn variant="ghost" size="sm" className="!text-[#7C3AED] hover:!bg-[#F5F3FF]" onClick={()=>addLine(s)}>
                                  <Ic d={P.plus} size={12}/>添加
                                </Btn>
                            }
                          </td>
                        </tr>
                      );
                    })}
                    {filteredSku.length===0 && (
                      <tr><td colSpan={6} className="px-3 py-6 text-center text-sm text-[#94A3B8]">未找到匹配商品</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Batch import panel */}
        {importOpen && (
          <div className="border-b border-[#E2E8F0] bg-[#FFFBEB]">
            <div className="px-5 py-4">
              <div className="flex items-center gap-3 mb-3">
                <Ic d={P.upload} size={14} className="text-[#D97706]"/>
                <span className="text-sm font-medium text-[#334155]">批量导入商品明细</span>
                <button onClick={()=>setImportOpen(false)} className="ml-auto text-[#94A3B8] hover:text-[#334155]"><Ic d={P.x} size={16}/></button>
              </div>
              <div className="border-2 border-dashed border-[#FDE68A] rounded-lg p-8 flex flex-col items-center gap-3 bg-white cursor-pointer hover:border-[#D97706] transition-colors">
                <div className="w-12 h-12 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] flex items-center justify-center">
                  <Ic d={P.upload} size={22} className="text-[#D97706]"/>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-[#334155] mb-0.5">点击上传或拖拽文件至此处</div>
                  <div className="text-xs text-[#94A3B8]">支持 .xlsx / .xls 格式，单文件 ≤ 5MB</div>
                </div>
                <Btn variant="secondary" size="sm">选择文件</Btn>
              </div>
              <div className="flex items-center gap-2 mt-3 text-xs text-[#D97706]">
                <Ic d={P.alertTri} size={12}/>
                <span>导入商品模板待提供，请联系产品团队获取最新模板。</span>
                <button className="ml-auto text-[#2563EB] hover:underline flex items-center gap-0.5">
                  <Ic d={P.download} size={11}/>下载模板
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Error for empty lines */}
        {errors.lines && (
          <div className="mx-5 mt-4">
            <div className="flex items-center gap-2 px-3 py-2.5 bg-[#FEF2F2] border border-[#FECACA] rounded-lg text-sm text-[#DC2626]">
              <Ic d={P.alertTri} size={14} className="flex-shrink-0"/>
              {errors.lines}
            </div>
          </div>
        )}

        {/* Lines table */}
        {lines.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                    {[
                      { label:"#", align:"left", w:"36px" },
                      { label:"商品ID", align:"left", w:"140px" },
                      { label:"商品名称", align:"left", w:"180px" },
                      { label:"69码", align:"left", w:"128px" },
                      { label:"箱规", align:"right", w:"90px" },
                      { label:"进价（元）", align:"right", w:"110px" },
                      { label:"箱数", align:"right", w:"110px" },
                      { label:"采购量（件）", align:"right", w:"120px" },
                      { label:"总价（元）", align:"right", w:"110px" },
                      { label:"操作", align:"center", w:"60px" },
                    ].map(h=>(
                      <th key={h.label} style={{minWidth:h.w}}
                        className={`px-4 py-3 text-xs font-semibold text-[#64748B] uppercase tracking-wide whitespace-nowrap text-${h.align}`}>
                        {h.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {lines.map((l,i)=>(
                    <tr key={l.id} className="border-b border-[#F1F5F9] hover:bg-[#FAFAFF] transition-colors group">
                      <td className="px-4 py-3 text-xs text-[#94A3B8] font-medium">{i+1}</td>
                      <td className="px-4 py-3">
                        <span className="font-mono text-xs text-[#64748B]">{l.id}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-medium text-[#0F172A]">{l.name}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-mono text-xs text-[#64748B]">{l.barcode}</span>
                      </td>
                      {/* 箱规 */}
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <span className="text-[#64748B] text-xs">{l.boxSpec} {l.unit}/箱</span>
                      </td>
                      {/* 进价 可编辑 */}
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <span className="text-[#94A3B8] text-xs">¥</span>
                          <input
                            type="number" min="0" step="0.01"
                            defaultValue={l.costPrice.toFixed(2)}
                            onBlur={e=>updateLine(l.id,"costPrice",e.target.value)}
                            className="w-20 h-8 border border-[#E2E8F0] rounded text-sm text-right px-2 text-[#0F172A] font-medium focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#DBEAFE] bg-white"
                          />
                        </div>
                      </td>
                      {/* 箱数 */}
                      <td className="px-4 py-3 text-right">
                        <input
                          type="number" min="1"
                          value={l.boxes}
                          onChange={e=>updateLine(l.id,"boxes",e.target.value)}
                          className="w-20 h-8 border border-[#E2E8F0] rounded text-sm text-right px-2 text-[#0F172A] font-medium focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#DBEAFE] bg-white"
                        />
                      </td>
                      {/* 采购量 */}
                      <td className="px-4 py-3 text-right">
                        <input
                          type="number" min="1"
                          value={l.qty}
                          onChange={e=>updateLine(l.id,"qty",e.target.value)}
                          className="w-24 h-8 border border-[#E2E8F0] rounded text-sm text-right px-2 text-[#0F172A] font-medium focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#DBEAFE] bg-white"
                        />
                      </td>
                      {/* 总价 */}
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <span className="text-sm font-bold text-[#0F172A]">¥{l.totalPrice.toFixed(2)}</span>
                      </td>
                      {/* 删除 */}
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={()=>removeLine(l.id)}
                          className="w-7 h-7 rounded flex items-center justify-center text-[#94A3B8] hover:text-[#DC2626] hover:bg-[#FEF2F2] transition-colors opacity-0 group-hover:opacity-100">
                          <Ic d={P.trash} size={14}/>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                {/* Footer totals */}
                <tfoot>
                  <tr className="bg-[#F8FAFC] border-t-2 border-[#CBD5E1]">
                    <td colSpan={5} className="px-4 py-3 text-right text-xs font-semibold text-[#64748B] uppercase tracking-wide">合计</td>
                    <td className="px-4 py-3 text-right text-xs text-[#64748B]">—</td>
                    <td className="px-4 py-3 text-right font-bold text-[#0F172A]">{totalBoxes} 箱</td>
                    <td className="px-4 py-3 text-right font-bold text-[#0F172A]">{totalQty} 件</td>
                    <td className="px-4 py-3 text-right font-bold text-[#2563EB] text-base">¥{totalAmt.toFixed(2)}</td>
                    <td/>
                  </tr>
                </tfoot>
              </table>
            </div>
            {/* Summary strip */}
            <div className="flex items-center gap-6 px-5 py-3 border-t border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#64748B]">
              <span>{lines.length} 种商品</span>
              <span>总箱数：<strong className="text-[#334155]">{totalBoxes} 箱</strong></span>
              <span>总件数：<strong className="text-[#334155]">{totalQty} 件</strong></span>
              <span className="ml-auto text-sm">采购总金额：<strong className="text-[#2563EB] text-base font-bold">¥{totalAmt.toFixed(2)}</strong></span>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center mb-4">
              <Ic d={P.layers} size={28} className="text-[#CBD5E1]"/>
            </div>
            <div className="text-sm font-medium text-[#334155] mb-1">暂无商品明细</div>
            <div className="text-xs text-[#94A3B8] mb-5">请通过上方「搜索添加」或「批量导入」添加采购商品</div>
            <div className="flex gap-2">
              <Btn variant="secondary" size="sm" icon="search" onClick={()=>{setSearchOpen(true);setImportOpen(false);}}>搜索添加商品</Btn>
              <Btn variant="secondary" size="sm" icon="upload" onClick={()=>{setImportOpen(true);setSearchOpen(false);}}>批量导入</Btn>
            </div>
          </div>
        )}
      </Card>

      {/* ── Bottom Fixed Action Bar ── */}
      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-[#E2E8F0] bg-white shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
        <div className="flex items-center justify-between px-6 py-3 max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-2 text-xs text-[#64748B]">
            <Ic d={P.info} size={14} className="text-[#7C3AED] flex-shrink-0"/>
            <span>提交后将自动生成采购入库单并推送至履约系统，采购单状态将变更为「执行中」。</span>
          </div>
          <div className="flex items-center gap-3">
            {lines.length > 0 && (
              <div className="text-sm text-[#64748B] mr-2">
                共 <strong className="text-[#0F172A]">{lines.length}</strong> 种 ·
                总金额 <strong className="text-[#2563EB]">¥{totalAmt.toFixed(2)}</strong>
              </div>
            )}
            <Btn variant="secondary" onClick={handleBack}>返回</Btn>
            <Btn variant="primary" icon="check" onClick={handleSubmit}>提交采购单</Btn>
          </div>
        </div>
      </div>

      {/* Back confirm modal */}
      {backConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={()=>setBackConfirm(false)}/>
          <div className="relative bg-white rounded-xl shadow-xl border border-[#E2E8F0] w-[440px]">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2E8F0]">
              <h2 className="text-base font-semibold text-[#0F172A]">确认离开此页面？</h2>
              <button onClick={()=>setBackConfirm(false)} className="text-[#94A3B8] hover:text-[#334155]"><Ic d={P.x} size={18}/></button>
            </div>
            <div className="px-5 py-4">
              <div className="flex items-start gap-3 rounded-lg border border-[#FDE68A] bg-[#FFFBEB] p-3">
                <Ic d={P.alertTri} size={17} className="text-[#D97706] mt-0.5 flex-shrink-0"/>
                <p className="text-sm text-[#92400E] leading-6">当前页面已填写内容（{lines.length > 0 ? `${lines.length} 条商品明细` : "基本信息"}）尚未提交，离开后内容将不会保存。</p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-[#E2E8F0] bg-[#F8FAFC] rounded-b-xl">
              <Btn variant="secondary" onClick={()=>setBackConfirm(false)}>继续填写</Btn>
              <Btn variant="danger" onClick={()=>{ setBackConfirm(false); onBack(); }}>确认离开</Btn>
            </div>
          </div>
        </div>
      )}

      {/* Submit success modal */}
      {submitSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"/>
          <div className="relative bg-white rounded-xl shadow-xl border border-[#E2E8F0] w-[520px]">
            <div className="px-6 py-8 text-center">
              <div className="w-16 h-16 rounded-full bg-[#F0FDF4] border-2 border-[#BBF7D0] flex items-center justify-center mx-auto mb-4">
                <Ic d={P.check} size={30} className="text-[#16A34A]"/>
              </div>
              <h2 className="text-lg font-bold text-[#0F172A] mb-1">采购单提交成功</h2>
              <p className="text-sm text-[#64748B] mb-5">系统已自动生成关联采购入库单，仓库人员可在采购入库单列表中进行收货操作。</p>
              <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-4 text-left space-y-2.5 mb-6 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#94A3B8]">采购单编号</span>
                  <span className="font-mono font-semibold text-[#334155]">{poNo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#94A3B8]">采购名称</span>
                  <span className="text-[#334155] font-medium">{name}</span>
                </div>
                <div className="border-t border-[#E2E8F0] pt-2.5 flex justify-between">
                  <span className="text-[#94A3B8]">关联采购入库单</span>
                  <span className="font-mono text-[#2563EB] font-semibold">{newInboundNo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#94A3B8]">商品种数 / 总件数</span>
                  <span className="text-[#334155]">{lines.length} 种 / {totalQty} 件</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#94A3B8]">采购总金额</span>
                  <span className="font-bold text-[#2563EB]">¥{totalAmt.toFixed(2)}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg mb-5 text-xs text-[#1D4ED8] text-left">
                <Ic d={P.truck} size={13} className="flex-shrink-0"/>
                采购入库单 <span className="font-mono font-semibold">{newInboundNo}</span> 已推送至履约系统，等待仓库收货。收货完成后采购单自动标记为「已完成」。
              </div>
              <div className="flex gap-3 justify-center">
                <Btn variant="secondary" onClick={()=>{ setSubmitSuccess(false); onBack(); }}>返回采购单列表</Btn>
                <Btn variant="primary" onClick={()=>{ setSubmitSuccess(false); onBack(); }}>查看采购入库单</Btn>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// PAGE 12 – 采购入库单列表 & 详情
// ══════════════════════════════════════════════════════════════════════════════

type IbStatus = "待入库" | "部分入库" | "已入库";
const IB_STATUS_COLOR: Record<IbStatus, BC> = {
  "待入库":  "gray",
  "部分入库":"yellow",
  "已入库":  "green",
};

type IbRow = {
  id: string; poOrderNo: string; pmNo: string; supplier: string;
  warehouse: string; purchaseQty: number; actualQty: number;
  status: IbStatus; creator: string; createdAt: string;
};

type IbLine = {
  skuId: string; name: string; barcode: string; spec: string;
  purchaseQty: number; actualQty: number;
};

const IB_ROWS: IbRow[] = [
  { id:"PIB-20250912-001", poOrderNo:"ORD-2025-0912-88", pmNo:"POM-20250910-001", supplier:"可口可乐（中国）饮料有限公司",
    warehouse:"华南中心仓（深圳）", purchaseQty:2400, actualQty:2400, status:"已入库", creator:"王芳", createdAt:"2025-09-12 09:00" },
  { id:"PIB-20250913-002", poOrderNo:"ORD-2025-0913-21", pmNo:"POM-20250910-002", supplier:"统一企业（中国）投资有限公司",
    warehouse:"华南中心仓（深圳）", purchaseQty:1600, actualQty:900, status:"部分入库", creator:"王芳", createdAt:"2025-09-13 10:30" },
  { id:"PIB-20250911-003", poOrderNo:"ORD-2025-0911-55", pmNo:"POM-20250907-005", supplier:"好丽友食品有限公司",
    warehouse:"西南中心仓（成都）", purchaseQty:3600, actualQty:3600, status:"已入库", creator:"刘洋", createdAt:"2025-09-11 08:20" },
  { id:"PIB-20250909-004", poOrderNo:"ORD-2025-0909-34", pmNo:"POM-20250904-008", supplier:"康师傅控股有限公司",
    warehouse:"华北中心仓（北京）", purchaseQty:2400, actualQty:1800, status:"部分入库", creator:"张明", createdAt:"2025-09-09 14:00" },
  { id:"PIB-20250916-005", poOrderNo:"ORD-2025-0916-09", pmNo:"POM-20250909-003", supplier:"农夫山泉股份有限公司",
    warehouse:"华北中心仓（北京）", purchaseQty:1200, actualQty:0, status:"待入库", creator:"张明", createdAt:"2025-09-16 08:00" },
  { id:"PIB-20250914-006", poOrderNo:"ORD-2025-0914-77", pmNo:"POM-20250908-004", supplier:"元气森林（北京）食品科技集团有限公司",
    warehouse:"华东中心仓（上海）", purchaseQty:1000, actualQty:0, status:"待入库", creator:"陈晓", createdAt:"2025-09-14 11:15" },
];

const IB_DETAIL_LINES: IbLine[] = [
  { skuId:"SKU-DRINK-001", name:"可口可乐 330ml",  barcode:"6920202888883", spec:"24罐/箱", purchaseQty:1200, actualQty:1200 },
  { skuId:"SKU-DRINK-002", name:"可口可乐 500ml",  barcode:"6920202888890", spec:"24瓶/箱", purchaseQty:720,  actualQty:720  },
  { skuId:"SKU-DRINK-003", name:"雪碧 330ml",      barcode:"6920202888916", spec:"24罐/箱", purchaseQty:480,  actualQty:480  },
];

export const InboundOrderList = ({ onDetail }: { onDetail:()=>void }) => {
  return (
    <div>
      <PH
        title="采购入库单"
        crumbs={["首页","ERP管理","采购入库单"]}
        actions={
          <>
            <Btn variant="secondary" icon="download" size="sm">导出列表</Btn>
            <Btn variant="secondary" icon="download" size="sm">导出明细</Btn>
          </>
        }
      />

      {/* Filter */}
      <Card className="mb-4" noPad>
        <div className="flex flex-wrap gap-3 items-end p-4">
          <FL label="采购入库单号" width="160px">
            <Inp placeholder="输入单号模糊搜索" icon="search" className="w-40" />
          </FL>
          <FL label="关联采购订单号" width="160px">
            <Inp placeholder="输入订单号搜索" icon="search" className="w-40" />
          </FL>
          <FL label="采购单号" width="160px">
            <Inp placeholder="输入采购单号" icon="search" className="w-40" />
          </FL>
          <FL label="采购供应商" width="176px">
            <Sel className="w-44" options={[
              { label:"全部供应商", value:"" },
              { label:"可口可乐（中国）饮料有限公司", value:"s1" },
              { label:"统一企业（中国）投资有限公司", value:"s2" },
              { label:"农夫山泉股份有限公司", value:"s3" },
              { label:"元气森林食品科技集团有限公司", value:"s4" },
              { label:"好丽友食品有限公司", value:"s5" },
              { label:"康师傅控股有限公司", value:"s6" },
            ]} />
          </FL>
          <FL label="收货仓库" width="176px">
            <Sel className="w-44" options={[
              { label:"全部仓库", value:"" },
              ...WAREHOUSES.map(w=>({ label:w.name, value:w.id })),
            ]} />
          </FL>
          <FL label="入库状态" width="120px">
            <Sel className="w-32" options={[
              { label:"全部状态", value:"" },
              { label:"待入库",   value:"pending" },
              { label:"部分入库", value:"partial" },
              { label:"已入库",   value:"done" },
            ]} />
          </FL>
          <FL label="创建时间" width="220px">
            <div className="flex items-center gap-1">
              <input type="date" className="h-9 border border-[#E2E8F0] rounded-md text-sm px-3 text-[#334155] focus:outline-none focus:border-[#2563EB]" />
              <span className="text-[#94A3B8] text-xs flex-shrink-0">至</span>
              <input type="date" className="h-9 border border-[#E2E8F0] rounded-md text-sm px-3 text-[#334155] focus:outline-none focus:border-[#2563EB]" />
            </div>
          </FL>
          <div className="flex items-end gap-2">
            <Btn variant="primary" icon="search">搜索</Btn>
            <Btn variant="secondary">重置</Btn>
          </div>
        </div>
      </Card>

      {/* Table */}
      <Card noPad>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse" style={{minWidth:"1200px"}}>
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                {[
                  { label:"采购入库单号",   align:"left",  w:"148px" },
                  { label:"关联采购订单号", align:"left",  w:"140px" },
                  { label:"采购单号",       align:"left",  w:"140px" },
                  { label:"采购供应商",     align:"left",  w:"200px" },
                  { label:"收货仓库",       align:"left",  w:"160px" },
                  { label:"采购商品件数",   align:"right", w:"100px" },
                  { label:"实际入库件数",   align:"right", w:"100px" },
                  { label:"入库状态",       align:"left",  w:"88px"  },
                  { label:"创建人",         align:"left",  w:"72px"  },
                  { label:"创建时间",       align:"left",  w:"140px" },
                  { label:"操作",           align:"left",  w:"60px"  },
                ].map(h=>(
                  <th key={h.label} style={{minWidth:h.w}}
                    className={`px-4 py-3 text-[11px] font-semibold text-[#64748B] uppercase tracking-wide whitespace-nowrap text-${h.align}`}>
                    {h.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {IB_ROWS.map((r,i)=>(
                <tr key={r.id} className={`border-b border-[#F1F5F9] hover:bg-[#F8FAFC] transition-colors ${i%2===1?"bg-[#FAFBFC]":""}`}>
                  {/* 入库单号 */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <button onClick={onDetail} className="font-mono text-xs font-semibold text-[#2563EB] hover:underline hover:text-[#1D4ED8]">
                      {r.id}
                    </button>
                  </td>
                  {/* 关联采购订单号 */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <button className="font-mono text-xs text-[#2563EB] hover:underline hover:text-[#1D4ED8] flex items-center gap-0.5">
                      {r.poOrderNo}<Ic d={P.link} size={10}/>
                    </button>
                  </td>
                  {/* 采购单号 */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="font-mono text-xs text-[#64748B]">{r.pmNo}</span>
                  </td>
                  {/* 供应商 */}
                  <td className="px-4 py-3">
                    <span className="text-sm text-[#334155] block truncate max-w-[196px]" title={r.supplier}>{r.supplier}</span>
                  </td>
                  {/* 仓库 */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-sm text-[#334155]">{r.warehouse}</span>
                  </td>
                  {/* 采购商品件数 */}
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <span className="text-sm font-medium text-[#0F172A]">{r.purchaseQty.toLocaleString()}</span>
                  </td>
                  {/* 实际入库件数 */}
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    {r.actualQty === 0
                      ? <span className="text-sm text-[#CBD5E1]">0</span>
                      : <span className={`text-sm font-semibold ${r.actualQty >= r.purchaseQty ? "text-[#16A34A]" : "text-[#D97706]"}`}>
                          {r.actualQty.toLocaleString()}
                        </span>
                    }
                  </td>
                  {/* 状态 */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <Badge label={r.status} color={IB_STATUS_COLOR[r.status]} dot />
                  </td>
                  {/* 创建人 */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-sm text-[#334155]">{r.creator}</span>
                  </td>
                  {/* 创建时间 */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-xs text-[#64748B]">{r.createdAt}</span>
                  </td>
                  {/* 操作 */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <Btn variant="ghost" size="sm" onClick={onDetail}>详情</Btn>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pager total={28} page={1} pageSize={10} />
      </Card>
    </div>
  );
};

// ── Detail page ──────────────────────────────────────────────────────────────
export const InboundOrderDetail = ({ onBack, onPOLink }: { onBack:()=>void; onPOLink?:()=>void }) => {
  const row = IB_ROWS[0];
  const hasDiff = IB_DETAIL_LINES.some(l => l.actualQty !== l.purchaseQty);
  const totalPurchase = IB_DETAIL_LINES.reduce((s,l)=>s+l.purchaseQty,0);
  const totalActual   = IB_DETAIL_LINES.reduce((s,l)=>s+l.actualQty,0);

  return (
    <div>
      <PH
        title="采购入库单详情"
        crumbs={["首页","ERP管理","采购入库单","单据详情"]}
        actions={
          <>
            <Btn variant="secondary" icon="chevL" onClick={onBack}>返回列表</Btn>
            <Btn variant="secondary" icon="print">打印</Btn>
            <Btn variant="secondary" icon="download">导出 PDF</Btn>
          </>
        }
      />

      {/* Diff banner */}
      {hasDiff && (
        <div className="flex items-start gap-3 px-4 py-3 bg-[#FFFBEB] border border-[#FDE68A] rounded-lg mb-4 text-sm text-[#92400E]">
          <Ic d={P.alertTri} size={15} className="text-[#D97706] flex-shrink-0 mt-0.5"/>
          <div className="flex-1 leading-5">
            <span className="font-semibold">存在数量差异：</span>
            本次入库实收数量与采购单预期数量不一致。如需与供应商对账，可根据差异数据生成
            <span className="font-semibold">差异单</span>，用于后续追溯处理。
          </div>
          <button className="flex-shrink-0 flex items-center gap-1 px-3 py-1.5 border border-[#FDE68A] rounded-md text-xs font-medium text-[#92400E] hover:bg-[#FEF9C3] transition-colors ml-2">
            <Ic d={P.fileText} size={12}/>生成差异单
          </button>
        </div>
      )}

      {/* Basic info card */}
      <Card className="mb-4">
        <div className="flex items-center gap-2 pb-4 mb-5 border-b border-[#F1F5F9]">
          <div className="w-1 h-4 bg-[#7C3AED] rounded-full"/>
          <h2 className="text-sm font-semibold text-[#0F172A]">基本信息</h2>
          <span className="ml-auto">
            <Badge label={row.status} color={IB_STATUS_COLOR[row.status]} dot />
          </span>
        </div>
        <div className="grid grid-cols-3 gap-x-10 gap-y-5">
          {/* Row 1 */}
          <div>
            <div className="text-xs text-[#94A3B8] mb-1">采购入库单号</div>
            <div className="font-mono text-sm font-semibold text-[#0F172A] select-all">{row.id}</div>
          </div>
          <div>
            <div className="text-xs text-[#94A3B8] mb-1">关联采购订单号</div>
            <button onClick={onPOLink} className="font-mono text-sm font-semibold text-[#2563EB] hover:underline flex items-center gap-1">
              {row.poOrderNo}<Ic d={P.link} size={12}/>
            </button>
          </div>
          {/* Row 2 */}
          <div>
            <div className="text-xs text-[#94A3B8] mb-1">采购供应商</div>
            <div className="text-sm font-medium text-[#0F172A]">{row.supplier}</div>
          </div>
          <div>
            <div className="text-xs text-[#94A3B8] mb-1">收货仓库</div>
            <div className="text-sm font-medium text-[#0F172A]">{row.warehouse}</div>
          </div>
          <div>
            <div className="text-xs text-[#94A3B8] mb-1">入库状态</div>
            <Badge label={row.status} color={IB_STATUS_COLOR[row.status]} dot />
          </div>
          {/* Row 3 */}
          <div>
            <div className="text-xs text-[#94A3B8] mb-1">采购商品件数</div>
            <div className="text-sm font-semibold text-[#0F172A]">{row.purchaseQty.toLocaleString()} 件</div>
          </div>
          <div>
            <div className="text-xs text-[#94A3B8] mb-1">实际入库件数</div>
            <div className={`text-sm font-semibold ${row.actualQty >= row.purchaseQty ? "text-[#16A34A]" : "text-[#D97706]"}`}>
              {row.actualQty.toLocaleString()} 件
              {row.actualQty < row.purchaseQty && (
                <span className="ml-2 text-xs font-normal text-[#94A3B8]">
                  差 {(row.purchaseQty - row.actualQty).toLocaleString()} 件
                </span>
              )}
            </div>
          </div>
          <div>
            <div className="text-xs text-[#94A3B8] mb-1">入库进度</div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-[#F1F5F9] rounded-full overflow-hidden max-w-[100px]">
                <div
                  className={`h-2 rounded-full ${row.actualQty >= row.purchaseQty ? "bg-[#16A34A]" : "bg-[#D97706]"}`}
                  style={{width:`${Math.min(100, Math.round(row.actualQty/row.purchaseQty*100))}%`}}
                />
              </div>
              <span className="text-xs text-[#64748B]">
                {Math.round(row.actualQty/row.purchaseQty*100)}%
              </span>
            </div>
          </div>
          {/* Row 4 */}
          <div>
            <div className="text-xs text-[#94A3B8] mb-1">创建人</div>
            <div className="text-sm text-[#334155]">{row.creator}</div>
          </div>
          <div>
            <div className="text-xs text-[#94A3B8] mb-1">创建时间</div>
            <div className="text-sm text-[#334155]">{row.createdAt}</div>
          </div>
        </div>
      </Card>

      {/* Lines table */}
      <Card noPad>
        <div className="flex items-center gap-2 px-5 py-4 border-b border-[#E2E8F0]">
          <div className="w-1 h-4 bg-[#7C3AED] rounded-full"/>
          <h2 className="text-sm font-semibold text-[#0F172A]">商品明细</h2>
          <span className="px-2 py-0.5 bg-[#EFF6FF] text-[#2563EB] text-xs font-semibold rounded-full border border-[#BFDBFE] ml-1">
            {IB_DETAIL_LINES.length} 种商品
          </span>
          {hasDiff && (
            <span className="ml-2 flex items-center gap-1 text-xs text-[#D97706]">
              <Ic d={P.alertTri} size={12}/>存在数量差异
            </span>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                {[
                  { label:"#",        align:"left",  w:"36px"  },
                  { label:"商品ID",   align:"left",  w:"140px" },
                  { label:"商品名称", align:"left",  w:"200px" },
                  { label:"69码",     align:"left",  w:"130px" },
                  { label:"规格",     align:"left",  w:"100px" },
                  { label:"采购数量", align:"right", w:"100px" },
                  { label:"实际入库数量", align:"right", w:"120px" },
                  { label:"差异",     align:"right", w:"100px" },
                ].map(h=>(
                  <th key={h.label} style={{minWidth:h.w}}
                    className={`px-4 py-3 text-[11px] font-semibold text-[#64748B] uppercase tracking-wide whitespace-nowrap text-${h.align}`}>
                    {h.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {IB_DETAIL_LINES.map((l,i)=>{
                const diff = l.actualQty - l.purchaseQty;
                const hasDiffRow = diff !== 0;
                return (
                  <tr key={l.skuId} className={`border-b border-[#F1F5F9] ${hasDiffRow?"bg-[#FFFBEB]":"hover:bg-[#F8FAFC]"} transition-colors`}>
                    <td className="px-4 py-3.5 text-xs text-[#94A3B8] font-medium">{i+1}</td>
                    <td className="px-4 py-3.5">
                      <span className="font-mono text-xs text-[#64748B]">{l.skuId}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="font-medium text-[#0F172A]">{l.name}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="font-mono text-xs text-[#64748B]">{l.barcode}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-xs text-[#64748B]">{l.spec}</span>
                    </td>
                    {/* 采购数量 */}
                    <td className="px-4 py-3.5 text-right whitespace-nowrap">
                      <span className="text-sm font-medium text-[#334155]">{l.purchaseQty.toLocaleString()}</span>
                    </td>
                    {/* 实际入库 */}
                    <td className="px-4 py-3.5 text-right whitespace-nowrap">
                      <span className={`text-sm font-semibold ${hasDiffRow ? "text-[#D97706]" : "text-[#16A34A]"}`}>
                        {l.actualQty.toLocaleString()}
                      </span>
                    </td>
                    {/* 差异 */}
                    <td className="px-4 py-3.5 text-right whitespace-nowrap">
                      {hasDiffRow
                        ? <span className="inline-flex items-center gap-0.5 text-sm font-semibold text-[#D97706]">
                            <Ic d={P.arrowDown} size={12}/>{Math.abs(diff).toLocaleString()}
                          </span>
                        : <span className="text-xs text-[#16A34A] flex items-center justify-end gap-0.5">
                            <Ic d={P.check} size={12}/>一致
                          </span>
                      }
                    </td>
                  </tr>
                );
              })}
            </tbody>
            {/* Footer */}
            <tfoot>
              <tr className="bg-[#F8FAFC] border-t-2 border-[#CBD5E1]">
                <td colSpan={5} className="px-4 py-3 text-right text-xs font-semibold text-[#64748B] uppercase tracking-wide">合计</td>
                <td className="px-4 py-3 text-right font-bold text-[#0F172A]">{totalPurchase.toLocaleString()}</td>
                <td className="px-4 py-3 text-right font-bold text-[#0F172A]">{totalActual.toLocaleString()}</td>
                <td className="px-4 py-3 text-right">
                  {totalActual < totalPurchase
                    ? <span className="text-sm font-semibold text-[#D97706]">−{(totalPurchase-totalActual).toLocaleString()}</span>
                    : <span className="text-xs text-[#16A34A] flex items-center justify-end gap-0.5"><Ic d={P.check} size={12}/>一致</span>
                  }
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Info strip */}
        <div className="px-5 py-3 border-t border-[#E2E8F0] bg-[#F8FAFC] rounded-b-lg flex items-center gap-2 text-xs text-[#94A3B8]">
          <Ic d={P.info} size={13} className="flex-shrink-0"/>
          <span>本页为只读详情，不支持在线修改。如实收数量与预期不一致，可通过上方「生成差异单」发起与供应商的对账流程。</span>
        </div>
      </Card>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// PAGE 13 – 采购入库异常单管理
// ══════════════════════════════════════════════════════════════════════════════

type ExcStatus = "待处理" | "处理中" | "已处理" | "已关闭";
const EXC_STATUS_COLOR: Record<ExcStatus, BC> = {
  "待处理": "red",
  "处理中": "yellow",
  "已处理": "green",
  "已关闭": "gray",
};

type DiffReason = "供应商少发" | "供应商多发" | "运输破损" | "质量问题拒收" | "规格不符" | "其他";
const DIFF_REASONS: DiffReason[] = ["供应商少发","供应商多发","运输破损","质量问题拒收","规格不符","其他"];
const DIFF_REASON_COLOR: Record<DiffReason, BC> = {
  "供应商少发":"orange","供应商多发":"purple","运输破损":"red",
  "质量问题拒收":"red","规格不符":"yellow","其他":"gray",
};

type ExcRow = {
  id: string; pmNo: string; ibNo: string; supplier: string; warehouse: string;
  purchaseQty: number; actualQty: number; diffQty: number;
  diffReason: DiffReason; status: ExcStatus; creator: string; createdAt: string;
};

const EXC_ROWS: ExcRow[] = [
  { id:"EXC-20250913-001", pmNo:"POM-20250910-002", ibNo:"PIB-20250913-002",
    supplier:"统一企业（中国）投资有限公司", warehouse:"华南中心仓（深圳）",
    purchaseQty:1600, actualQty:900, diffQty:700,
    diffReason:"供应商少发", status:"待处理", creator:"王芳", createdAt:"2025-09-13 15:20" },
  { id:"EXC-20250909-002", pmNo:"POM-20250904-008", ibNo:"PIB-20250909-004",
    supplier:"康师傅控股有限公司", warehouse:"华北中心仓（北京）",
    purchaseQty:2400, actualQty:1800, diffQty:600,
    diffReason:"运输破损", status:"处理中", creator:"张明", createdAt:"2025-09-09 16:45" },
  { id:"EXC-20250908-003", pmNo:"POM-20250905-007", ibNo:"PIB-20250908-006",
    supplier:"光明乳业股份有限公司", warehouse:"华南中心仓（深圳）",
    purchaseQty:960, actualQty:920, diffQty:40,
    diffReason:"质量问题拒收", status:"已处理", creator:"王芳", createdAt:"2025-09-08 09:10" },
  { id:"EXC-20250907-004", pmNo:"POM-20250903-006", ibNo:"PIB-20250907-005",
    supplier:"百事食品（中国）有限公司", warehouse:"华东中心仓（上海）",
    purchaseQty:2160, actualQty:2220, diffQty:60,
    diffReason:"供应商多发", status:"已关闭", creator:"陈晓", createdAt:"2025-09-07 11:00" },
  { id:"EXC-20250906-005", pmNo:"POM-20250902-005", ibNo:"PIB-20250906-004",
    supplier:"好丽友食品有限公司", warehouse:"西南中心仓（成都）",
    purchaseQty:1200, actualQty:1150, diffQty:50,
    diffReason:"规格不符", status:"待处理", creator:"刘洋", createdAt:"2025-09-06 14:30" },
  { id:"EXC-20250905-006", pmNo:"POM-20250901-004", ibNo:"PIB-20250905-003",
    supplier:"元气森林（北京）食品科技集团有限公司", warehouse:"华东中心仓（上海）",
    purchaseQty:800, actualQty:760, diffQty:40,
    diffReason:"其他", status:"处理中", creator:"陈晓", createdAt:"2025-09-05 10:20" },
];

type ExcLine = {
  skuId:string; name:string; barcode:string; spec:string;
  purchaseQty:number; actualQty:number; diffQty:number;
  diffReason:DiffReason; remark:string; hasAttach:boolean;
};

const EXC_LINES: ExcLine[] = [
  { skuId:"SKU-DRINK-007", name:"统一冰红茶 500ml", barcode:"6925303721512", spec:"15瓶/箱",
    purchaseQty:600, actualQty:300, diffQty:300, diffReason:"供应商少发", remark:"", hasAttach:false },
  { skuId:"SKU-DRINK-008", name:"统一鲜橙多 500ml", barcode:"6925303721529", spec:"15瓶/箱",
    purchaseQty:600, actualQty:450, diffQty:150, diffReason:"供应商少发", remark:"供应商确认下批补发", hasAttach:true },
  { skuId:"SKU-DRINK-003", name:"统一绿茶 500ml", barcode:"6925303721543", spec:"15瓶/箱",
    purchaseQty:400, actualQty:150, diffQty:250, diffReason:"运输破损", remark:"箱体受损，拒收", hasAttach:true },
];

// ── LIST PAGE ─────────────────────────────────────────────────────────────────
export const ExceptionOrderList = ({
  onHandle, onDetail,
}: { onHandle:()=>void; onDetail:()=>void }) => {
  const [statusFilter, setStatusFilter] = useState("");

  const statusCounts: Record<string, number> = {
    "": EXC_ROWS.length,
    "待处理": EXC_ROWS.filter(r=>r.status==="待处理").length,
    "处理中": EXC_ROWS.filter(r=>r.status==="处理中").length,
    "已处理": EXC_ROWS.filter(r=>r.status==="已处理").length,
    "已关闭": EXC_ROWS.filter(r=>r.status==="已关闭").length,
  };

  const urgent = EXC_ROWS.filter(r=>r.status==="待处理").length;

  return (
    <div>
      <PH
        title="采购入库异常单"
        crumbs={["首页","ERP管理","采购入库异常单"]}
        actions={
          <>
            <Btn variant="secondary" icon="download" size="sm">导出列表</Btn>
            <Btn variant="secondary" icon="download" size="sm">导出差异商品明细</Btn>
          </>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-5 gap-3 mb-4">
        <Stat label="异常单总数" value={EXC_ROWS.length} color="#7C3AED" icon="fileText" />
        <Stat label="待处理" value={statusCounts["待处理"]} sub="需尽快跟进" color="#DC2626" icon="alertTri" />
        <Stat label="处理中" value={statusCounts["处理中"]} color="#D97706" icon="refresh" />
        <Stat label="已处理" value={statusCounts["已处理"]} color="#16A34A" icon="check" />
        <Stat label="已关闭" value={statusCounts["已关闭"]} color="#64748B" icon="shield" />
      </div>

      {/* Urgent banner */}
      {urgent > 0 && (
        <div className="flex items-center gap-3 px-4 py-3 bg-[#FEF2F2] border border-[#FECACA] rounded-lg mb-4 text-sm text-[#991B1B]">
          <Ic d={P.alertTri} size={16} className="text-[#DC2626] flex-shrink-0"/>
          <span>当前有 <strong>{urgent}</strong> 张异常单处于<strong>待处理</strong>状态，请相关人员尽快跟进与供应商沟通确认。</span>
        </div>
      )}

      {/* Filter */}
      <Card className="mb-4" noPad>
        {/* Quick status tabs */}
        <div className="flex border-b border-[#E2E8F0] overflow-x-auto">
          {[
            { v:"", label:"全部" },
            { v:"待处理", label:"待处理" },
            { v:"处理中", label:"处理中" },
            { v:"已处理", label:"已处理" },
            { v:"已关闭", label:"已关闭" },
          ].map(t=>(
            <button key={t.v} onClick={()=>setStatusFilter(t.v)}
              className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap flex-shrink-0
                ${statusFilter===t.v?"border-[#2563EB] text-[#2563EB]":"border-transparent text-[#64748B] hover:text-[#334155]"}`}>
              {t.label}
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold
                ${statusFilter===t.v?"bg-[#DBEAFE] text-[#2563EB]":"bg-[#F1F5F9] text-[#64748B]"}`}>
                {statusCounts[t.v]}
              </span>
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 items-end p-4">
          <FL label="差异单号" width="148px">
            <Inp placeholder="EXC-YYYYMMDD-XXX" icon="search" className="w-36" />
          </FL>
          <FL label="关联采购单号" width="148px">
            <Inp placeholder="POM-YYYYMMDD-XXX" icon="search" className="w-36" />
          </FL>
          <FL label="关联采购入库单号" width="152px">
            <Inp placeholder="PIB-YYYYMMDD-XXX" icon="search" className="w-38" />
          </FL>
          <FL label="采购供应商" width="176px">
            <Sel className="w-44" options={[
              {label:"全部供应商",value:""},
              {label:"统一企业（中国）投资有限公司",value:"s2"},
              {label:"康师傅控股有限公司",value:"s6"},
              {label:"光明乳业股份有限公司",value:"s7"},
              {label:"百事食品（中国）有限公司",value:"s5"},
              {label:"好丽友食品有限公司",value:"s6a"},
              {label:"元气森林食品科技集团有限公司",value:"s4"},
            ]} />
          </FL>
          <FL label="收货仓库" width="176px">
            <Sel className="w-44" options={[
              {label:"全部仓库",value:""},
              ...WAREHOUSES.map(w=>({label:w.name,value:w.id})),
            ]} />
          </FL>
          <FL label="差异单状态" width="120px">
            <Sel className="w-32" options={[
              {label:"全部状态",value:""},
              {label:"待处理",value:"pending"},
              {label:"处理中",value:"processing"},
              {label:"已处理",value:"done"},
              {label:"已关闭",value:"closed"},
            ]} />
          </FL>
          <FL label="创建时间" width="220px">
            <div className="flex items-center gap-1">
              <input type="date" className="h-9 border border-[#E2E8F0] rounded-md text-sm px-3 text-[#334155] focus:outline-none focus:border-[#2563EB]"/>
              <span className="text-[#94A3B8] text-xs flex-shrink-0">至</span>
              <input type="date" className="h-9 border border-[#E2E8F0] rounded-md text-sm px-3 text-[#334155] focus:outline-none focus:border-[#2563EB]"/>
            </div>
          </FL>
          <div className="flex items-end gap-2">
            <Btn variant="primary" icon="search">搜索</Btn>
            <Btn variant="secondary">重置</Btn>
          </div>
        </div>
      </Card>

      {/* Table */}
      <Card noPad>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse" style={{minWidth:"1500px"}}>
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                {[
                  {label:"差异单号",      align:"left",  w:"148px"},
                  {label:"关联采购单号",  align:"left",  w:"140px"},
                  {label:"关联入库单号",  align:"left",  w:"140px"},
                  {label:"采购供应商",    align:"left",  w:"200px"},
                  {label:"收货仓库",      align:"left",  w:"160px"},
                  {label:"采购商品件数",  align:"right", w:"100px"},
                  {label:"实际入库件数",  align:"right", w:"100px"},
                  {label:"差异件数",      align:"right", w:"88px"},
                  {label:"差异原因",      align:"left",  w:"108px"},
                  {label:"差异单状态",      align:"left",  w:"88px"},
                  {label:"创建人",        align:"left",  w:"72px"},
                  {label:"创建时间",      align:"left",  w:"140px"},
                  {label:"操作",          align:"left",  w:"100px"},
                ].map(h=>(
                  <th key={h.label} style={{minWidth:h.w}}
                    className={`px-4 py-3 text-[11px] font-semibold text-[#64748B] uppercase tracking-wide whitespace-nowrap text-${h.align}`}>
                    {h.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {EXC_ROWS.filter(r => !statusFilter || r.status === statusFilter).map((r,i)=>(
                <tr key={r.id}
                  className={`border-b border-[#F1F5F9] transition-colors
                    ${r.status==="待处理" ? "bg-[#FFF8F8] hover:bg-[#FEF2F2]" : i%2===1 ? "bg-[#FAFBFC] hover:bg-[#F8FAFC]" : "hover:bg-[#F8FAFC]"}`}>
                  {/* 差异单号 */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <button onClick={onDetail} className="font-mono text-xs font-semibold text-[#2563EB] hover:underline">{r.id}</button>
                  </td>
                  {/* 关联采购单号 */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <button className="font-mono text-xs text-[#2563EB] hover:underline flex items-center gap-0.5">
                      {r.pmNo}<Ic d={P.link} size={10}/>
                    </button>
                  </td>
                  {/* 关联入库单号 */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <button className="font-mono text-xs text-[#2563EB] hover:underline flex items-center gap-0.5">
                      {r.ibNo}<Ic d={P.link} size={10}/>
                    </button>
                  </td>
                  {/* 供应商 */}
                  <td className="px-4 py-3">
                    <span className="text-sm text-[#334155] block truncate max-w-[196px]" title={r.supplier}>{r.supplier}</span>
                  </td>
                  {/* 仓库 */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-sm text-[#334155]">{r.warehouse}</span>
                  </td>
                  {/* 采购商品件数 */}
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <span className="text-sm font-medium text-[#334155]">{r.purchaseQty.toLocaleString()}</span>
                  </td>
                  {/* 实际入库件数 */}
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <span className="text-sm font-medium text-[#334155]">{r.actualQty.toLocaleString()}</span>
                  </td>
                  {/* 差异件数 — red highlight */}
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <span className="inline-flex items-center justify-end gap-0.5 text-sm font-bold text-[#DC2626]">
                      <Ic d={P.alertTri} size={12}/>
                      {r.diffQty > 0 ? "+" : ""}{(r.actualQty - r.purchaseQty < 0 ? "-" : "+")}{Math.abs(r.diffQty).toLocaleString()}
                    </span>
                  </td>
                  {/* 差异原因 */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <Badge label={r.diffReason} color={DIFF_REASON_COLOR[r.diffReason]} />
                  </td>
                  {/* 差异单状态 */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <Badge label={r.status} color={EXC_STATUS_COLOR[r.status]} dot />
                  </td>
                  {/* 创建人 */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-sm text-[#334155]">{r.creator}</span>
                  </td>
                  {/* 创建时间 */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-xs text-[#64748B]">{r.createdAt}</span>
                  </td>
                  {/* 操作 */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <Btn variant="ghost" size="sm" onClick={onDetail}>详情</Btn>
                      {(r.status==="待处理"||r.status==="处理中") && (
                        <Btn variant="ghost" size="sm"
                          className="!text-[#D97706] hover:!bg-[#FFFBEB] !border !border-[#FDE68A]"
                          onClick={onHandle}>
                          处理
                        </Btn>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pager total={EXC_ROWS.length} page={1} pageSize={10} />
      </Card>
    </div>
  );
};

// ── HANDLE / DETAIL PAGE ──────────────────────────────────────────────────────
export const ExceptionOrderHandle = ({
  onBack, onPO, onInbound,
}: { onBack:()=>void; onPO?:()=>void; onInbound?:()=>void }) => {
  const row = EXC_ROWS[0];
  const readOnly = false; // set true for detail-only view

  // Processing form state
  const [diffReason, setDiffReason] = useState<DiffReason|"">("");
  const [diffReasonOther, setDiffReasonOther] = useState("");
  const [handleMethod, setHandleMethod] = useState<"补货"|"不补货"|"部分补货"|"">("");
  const [restockQty, setRestockQty] = useState("");
  const [remark, setRemark] = useState("");
  const [attachFiles, setAttachFiles] = useState<string[]>(["沟通记录截图_20250913.jpg"]);
  const [errors, setErrors] = useState<Record<string,string>>({});
  const [cancelConfirm, setCancelConfirm] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [successInfo, setSuccessInfo] = useState<{method:string; newNo?:string}>({method:""});

  const needRestockQty = handleMethod==="补货" || handleMethod==="部分补货";
  const totalDiff = EXC_LINES.reduce((s,l)=>s+l.diffQty, 0);

  const validate = () => {
    const e: Record<string,string> = {};
    if (!diffReason) e.diffReason = "请选择差异原因";
    if (diffReason==="其他" && !diffReasonOther.trim()) e.diffReasonOther = "选择【其他】时备注不能为空";
    if (!handleMethod) e.handleMethod = "请选择处理方式";
    if (needRestockQty) {
      const n = parseInt(restockQty);
      if (!restockQty || isNaN(n) || n <= 0) e.restockQty = "请输入正整数补货数量";
      else if (n > totalDiff) e.restockQty = `补货数量不能超过差异数量 ${totalDiff} 件`;
    }
    setErrors(e);
    return Object.keys(e).length===0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const newNo = needRestockQty
      ? "PIB-" + new Date().toISOString().slice(0,10).replace(/-/g,"") + "-" + String(Math.floor(Math.random()*900)+100).padStart(3,"0")
      : undefined;
    setSuccessInfo({ method: handleMethod, newNo });
    setSubmitSuccess(true);
  };

  const MOCK_ATTACH_NAMES = ["破损照片_箱体.jpg","破损照片_商品.jpg","验收记录单.pdf"];

  return (
    <div className="pb-6">
      {/* Header */}
      <div className="mb-5">
        <div className="flex items-center gap-1 text-xs text-[#94A3B8] mb-1.5">
          {["首页","ERP管理","采购入库异常单","异常处理"].map((b,i,arr)=>(
            <span key={i} className="flex items-center gap-1">
              {i>0&&<Ic d={P.chevR} size={11}/>}
              <span className={i===arr.length-1?"text-[#64748B]":"hover:text-[#2563EB] cursor-pointer"}>{b}</span>
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="flex items-center gap-1.5 text-[#64748B] hover:text-[#334155] text-sm transition-colors">
              <Ic d={P.chevL} size={16}/>返回
            </button>
            <div className="h-5 w-px bg-[#E2E8F0]"/>
            <h1 className="text-xl font-bold text-[#0F172A]">异常处理</h1>
            <Badge label={row.status} color={EXC_STATUS_COLOR[row.status]} dot />
          </div>
          <div className="flex items-center gap-2">
            <Btn variant="secondary" icon="print" size="sm">打印</Btn>
            <Btn variant="secondary" icon="download" size="sm">导出 PDF</Btn>
          </div>
        </div>
      </div>

      {/* ── Section 1: Basic Info ── */}
      <Card className="mb-4">
        <div className="flex items-center gap-2 pb-4 mb-5 border-b border-[#F1F5F9]">
          <div className="w-1 h-4 bg-[#DC2626] rounded-full"/>
          <h2 className="text-sm font-semibold text-[#0F172A]">基本信息</h2>
          <span className="ml-1 text-xs text-[#94A3B8] font-mono">{row.id}</span>
        </div>

        <div className="grid grid-cols-3 gap-x-10 gap-y-5">
          <div>
            <div className="text-xs text-[#94A3B8] mb-1">差异单号</div>
            <div className="font-mono text-sm font-semibold text-[#0F172A] select-all">{row.id}</div>
          </div>
          <div>
            <div className="text-xs text-[#94A3B8] mb-1">关联采购单号</div>
            <button onClick={onPO} className="font-mono text-sm text-[#2563EB] hover:underline flex items-center gap-1">
              {row.pmNo}<Ic d={P.link} size={12}/>
            </button>
          </div>
          <div>
            <div className="text-xs text-[#94A3B8] mb-1">关联采购入库单号</div>
            <button onClick={onInbound} className="font-mono text-sm text-[#2563EB] hover:underline flex items-center gap-1">
              {row.ibNo}<Ic d={P.link} size={12}/>
            </button>
          </div>
          <div>
            <div className="text-xs text-[#94A3B8] mb-1">采购供应商</div>
            <div className="text-sm font-medium text-[#0F172A]">{row.supplier}</div>
          </div>
          <div>
            <div className="text-xs text-[#94A3B8] mb-1">收货仓库</div>
            <div className="text-sm font-medium text-[#0F172A]">{row.warehouse}</div>
          </div>
          <div>
            <div className="text-xs text-[#94A3B8] mb-1">创建人 / 创建时间</div>
            <div className="text-sm text-[#334155]">{row.creator} · {row.createdAt}</div>
          </div>
          <div>
            <div className="text-xs text-[#94A3B8] mb-1">采购商品件数</div>
            <div className="text-sm font-semibold text-[#0F172A]">{row.purchaseQty.toLocaleString()} 件</div>
          </div>
          <div>
            <div className="text-xs text-[#94A3B8] mb-1">实际入库件数</div>
            <div className="text-sm font-semibold text-[#D97706]">{row.actualQty.toLocaleString()} 件</div>
          </div>
          <div>
            <div className="text-xs text-[#94A3B8] mb-1">差异件数</div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-bold text-[#DC2626]">{row.diffQty.toLocaleString()}</span>
              <span className="text-xs text-[#DC2626] font-medium">件</span>
              <span className="px-2 py-0.5 bg-[#FEF2F2] border border-[#FECACA] rounded text-xs text-[#DC2626] font-medium ml-1">
                {Math.round((row.purchaseQty-row.actualQty)/row.purchaseQty*100)}% 缺失
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* ── Section 2: Diff Lines ── */}
      <Card noPad className="mb-4">
        <div className="flex items-center gap-2 px-5 py-4 border-b border-[#E2E8F0]">
          <div className="w-1 h-4 bg-[#DC2626] rounded-full"/>
          <h2 className="text-sm font-semibold text-[#0F172A]">差异商品明细</h2>
          <span className="px-2 py-0.5 bg-[#FEF2F2] text-[#DC2626] text-xs font-semibold rounded-full border border-[#FECACA] ml-1">
            {EXC_LINES.length} 种商品存在差异
          </span>
          <span className="ml-auto text-xs text-[#64748B]">
            合计差异 <strong className="text-[#DC2626]">{totalDiff}</strong> 件
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                {[
                  {label:"#",          align:"left",  w:"36px"},
                  {label:"商品ID",     align:"left",  w:"140px"},
                  {label:"商品名称",   align:"left",  w:"160px"},
                  {label:"69码",       align:"left",  w:"128px"},
                  {label:"规格",       align:"left",  w:"90px"},
                  {label:"采购数量",   align:"right", w:"88px"},
                  {label:"实际入库",   align:"right", w:"88px"},
                  {label:"差异数量",   align:"right", w:"88px"},
                  {label:"差异原因",   align:"left",  w:"108px"},
                  {label:"差异备注",   align:"left",  w:"160px"},
                  {label:"附件",       align:"left",  w:"80px"},
                ].map(h=>(
                  <th key={h.label} style={{minWidth:h.w}}
                    className={`px-4 py-3 text-[11px] font-semibold text-[#64748B] uppercase tracking-wide whitespace-nowrap text-${h.align}`}>
                    {h.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {EXC_LINES.map((l,i)=>(
                <tr key={l.skuId} className="border-b border-[#F1F5F9] hover:bg-[#FFF8F8] transition-colors">
                  <td className="px-4 py-3.5 text-xs text-[#94A3B8] font-medium">{i+1}</td>
                  <td className="px-4 py-3.5"><span className="font-mono text-xs text-[#64748B]">{l.skuId}</span></td>
                  <td className="px-4 py-3.5"><span className="font-medium text-[#0F172A]">{l.name}</span></td>
                  <td className="px-4 py-3.5"><span className="font-mono text-xs text-[#64748B]">{l.barcode}</span></td>
                  <td className="px-4 py-3.5"><span className="text-xs text-[#64748B]">{l.spec}</span></td>
                  <td className="px-4 py-3.5 text-right whitespace-nowrap">
                    <span className="text-sm font-medium text-[#334155]">{l.purchaseQty}</span>
                  </td>
                  <td className="px-4 py-3.5 text-right whitespace-nowrap">
                    <span className="text-sm font-medium text-[#D97706]">{l.actualQty}</span>
                  </td>
                  <td className="px-4 py-3.5 text-right whitespace-nowrap">
                    <span className="text-sm font-bold text-[#DC2626]">-{l.diffQty}</span>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <Badge label={l.diffReason} color={DIFF_REASON_COLOR[l.diffReason]} />
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-xs text-[#64748B]">{l.remark || <span className="text-[#CBD5E1]">—</span>}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    {l.hasAttach
                      ? <button className="flex items-center gap-1 text-xs text-[#2563EB] hover:underline">
                          <Ic d={P.fileText} size={12}/>查看
                        </button>
                      : <span className="text-[#CBD5E1] text-xs">—</span>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-[#FEF2F2] border-t-2 border-[#FECACA]">
                <td colSpan={5} className="px-4 py-3 text-right text-xs font-semibold text-[#64748B] uppercase tracking-wide">合计</td>
                <td className="px-4 py-3 text-right font-bold text-[#334155]">{EXC_LINES.reduce((s,l)=>s+l.purchaseQty,0)}</td>
                <td className="px-4 py-3 text-right font-bold text-[#D97706]">{EXC_LINES.reduce((s,l)=>s+l.actualQty,0)}</td>
                <td className="px-4 py-3 text-right font-bold text-[#DC2626]">-{totalDiff}</td>
                <td colSpan={3}/>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Attach preview */}
        <div className="px-5 py-4 border-t border-[#E2E8F0] bg-[#FAFBFC]">
          <div className="text-xs font-semibold text-[#64748B] uppercase mb-2.5">入库现场附件</div>
          <div className="flex gap-2 flex-wrap">
            {MOCK_ATTACH_NAMES.map((f,i)=>(
              <div key={i} className="flex items-center gap-2 px-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-xs text-[#334155] hover:border-[#2563EB] cursor-pointer transition-colors">
                <Ic d={f.endsWith(".pdf")?P.fileText:P.archive} size={13} className="text-[#7C3AED]"/>
                <span>{f}</span>
                <Btn variant="ghost" size="sm" className="!p-0 !h-auto !text-[#94A3B8] hover:!text-[#2563EB]">
                  <Ic d={P.download} size={12}/>
                </Btn>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* ── Section 3: Processing Form ── */}
      <Card className="mb-4">
        <div className="flex items-center gap-2 pb-4 mb-5 border-b border-[#F1F5F9]">
          <div className="w-1 h-4 bg-[#7C3AED] rounded-full"/>
          <h2 className="text-sm font-semibold text-[#0F172A]">异常处理</h2>
          <span className="ml-2 text-xs text-[#94A3B8]">请根据与供应商沟通结果填写处理决定</span>
        </div>

        <div className="max-w-2xl space-y-6">
          {/* 确定差异原因 */}
          <div>
            <label className="block text-xs font-medium text-[#64748B] mb-2">
              <span className="text-[#DC2626] mr-0.5">*</span>确定差异原因
            </label>
            <div className="grid grid-cols-3 gap-2 mb-2">
              {DIFF_REASONS.map(r=>(
                <label key={r}
                  className={`flex items-center gap-2 px-3 py-2.5 border rounded-lg cursor-pointer transition-all text-sm
                    ${diffReason===r
                      ? "border-[#7C3AED] bg-[#F5F3FF] text-[#7C3AED] font-medium"
                      : "border-[#E2E8F0] text-[#334155] hover:border-[#7C3AED] hover:bg-[#FAFAFF]"}`}>
                  <input type="radio" name="diffReason" value={r} checked={diffReason===r}
                    onChange={()=>{ setDiffReason(r); setErrors(e=>({...e,diffReason:"",diffReasonOther:""})); }}
                    className="accent-[#7C3AED]"/>
                  {r}
                </label>
              ))}
            </div>
            {errors.diffReason && (
              <p className="text-xs text-[#DC2626] flex items-center gap-1 mt-1"><Ic d={P.alertTri} size={11}/>{errors.diffReason}</p>
            )}
            {diffReason==="其他" && (
              <div className="mt-2">
                <textarea
                  value={diffReasonOther}
                  onChange={e=>{ setDiffReasonOther(e.target.value); setErrors(er=>({...er,diffReasonOther:""})); }}
                  placeholder="请说明具体差异原因（选择【其他】时必填）"
                  rows={2}
                  className={`w-full border rounded-md text-sm px-3 py-2 text-[#334155] placeholder-[#94A3B8] resize-none
                    focus:outline-none focus:ring-2 transition-all
                    ${errors.diffReasonOther?"border-[#DC2626] focus:border-[#DC2626] focus:ring-[#FEE2E2]":"border-[#E2E8F0] focus:border-[#7C3AED] focus:ring-[#EDE9FE]"}`}
                />
                {errors.diffReasonOther && (
                  <p className="text-xs text-[#DC2626] flex items-center gap-1 mt-1"><Ic d={P.alertTri} size={11}/>{errors.diffReasonOther}</p>
                )}
              </div>
            )}
          </div>

          {/* 处理方式 */}
          <div>
            <label className="block text-xs font-medium text-[#64748B] mb-2">
              <span className="text-[#DC2626] mr-0.5">*</span>处理方式
            </label>
            <div className="flex gap-3">
              {(["补货","部分补货","不补货"] as const).map(m=>(
                <label key={m}
                  className={`flex items-center gap-2.5 px-4 py-3 border-2 rounded-xl cursor-pointer transition-all flex-1
                    ${handleMethod===m
                      ? m==="不补货"
                        ? "border-[#DC2626] bg-[#FEF2F2] text-[#DC2626]"
                        : "border-[#2563EB] bg-[#EFF6FF] text-[#2563EB]"
                      : "border-[#E2E8F0] text-[#334155] hover:border-[#CBD5E1]"}`}>
                  <input type="radio" name="handleMethod" value={m} checked={handleMethod===m}
                    onChange={()=>{ setHandleMethod(m); setErrors(e=>({...e,handleMethod:"",restockQty:""})); setRestockQty(""); }}
                    className="accent-[#2563EB]"/>
                  <div>
                    <div className="text-sm font-semibold">{m}</div>
                    <div className="text-xs mt-0.5 opacity-70">
                      {m==="补货" && "供应商全量补发差异数量"}
                      {m==="部分补货" && "供应商部分补发，指定数量"}
                      {m==="不补货" && "放弃补货，结束当前采购"}
                    </div>
                  </div>
                </label>
              ))}
            </div>
            {errors.handleMethod && (
              <p className="text-xs text-[#DC2626] flex items-center gap-1 mt-1.5"><Ic d={P.alertTri} size={11}/>{errors.handleMethod}</p>
            )}
          </div>

          {/* 补货数量 — conditional */}
          {needRestockQty && (
            <div>
              <label className="block text-xs font-medium text-[#64748B] mb-1.5">
                <span className="text-[#DC2626] mr-0.5">*</span>补货数量
                <span className="ml-2 text-[#94A3B8] font-normal">（最多 {totalDiff} 件，即总差异数量）</span>
              </label>
              <div className="flex items-center gap-3">
                <div className="flex-1 max-w-[200px]">
                  <input
                    type="number" min="1" max={totalDiff}
                    value={restockQty}
                    onChange={e=>{ setRestockQty(e.target.value); setErrors(er=>({...er,restockQty:""})); }}
                    placeholder={`1 ~ ${totalDiff}`}
                    className={`w-full h-9 border rounded-md text-sm px-3 text-right font-semibold text-[#0F172A]
                      focus:outline-none focus:ring-2 transition-all
                      ${errors.restockQty?"border-[#DC2626] focus:border-[#DC2626] focus:ring-[#FEE2E2]":"border-[#E2E8F0] focus:border-[#2563EB] focus:ring-[#DBEAFE]"}`}
                  />
                  {errors.restockQty && (
                    <p className="text-xs text-[#DC2626] flex items-center gap-1 mt-1"><Ic d={P.alertTri} size={11}/>{errors.restockQty}</p>
                  )}
                </div>
                <span className="text-sm text-[#64748B]">件</span>
                {handleMethod==="补货" && (
                  <button
                    onClick={()=>{ setRestockQty(String(totalDiff)); setErrors(er=>({...er,restockQty:""})); }}
                    className="text-xs text-[#2563EB] hover:underline">
                    填入全部差异数量（{totalDiff} 件）
                  </button>
                )}
              </div>
              <div className="mt-2 flex items-start gap-2 p-2.5 bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg text-xs text-[#1D4ED8]">
                <Ic d={P.info} size={13} className="flex-shrink-0 mt-0.5"/>
                <span>提交后系统将自动创建采购入库单并推送至履约系统；仓库完成收货后，对应采购单自动标记为已完成。</span>
              </div>
            </div>
          )}

          {/* 不补货提示 */}
          {handleMethod==="不补货" && (
            <div className="flex items-start gap-2 p-3 bg-[#FEF2F2] border border-[#FECACA] rounded-lg text-xs text-[#991B1B]">
              <Ic d={P.alertTri} size={13} className="flex-shrink-0 mt-0.5"/>
              <span>选择不补货后，系统将自动结束本次采购，差异件数记录在案，后续可用于供应商对账扣款。</span>
            </div>
          )}

          {/* 备注 */}
          <div>
            <label className="block text-xs font-medium text-[#64748B] mb-1.5">
              处理备注
              <span className="ml-1 text-[#94A3B8] font-normal">（选填，最多 200 字）</span>
            </label>
            <textarea
              value={remark}
              onChange={e=>setRemark(e.target.value.slice(0,200))}
              placeholder="如：已与供应商王经理电话确认，下周一前安排补发，快递单号待跟进"
              rows={3}
              className="w-full border border-[#E2E8F0] rounded-md text-sm px-3 py-2 text-[#334155] placeholder-[#94A3B8] resize-none focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#DBEAFE]"
            />
            <div className="text-right text-xs text-[#94A3B8] mt-0.5">{remark.length}/200</div>
          </div>

          {/* 附件上传 */}
          <div>
            <label className="block text-xs font-medium text-[#64748B] mb-1.5">
              处理附件
              <span className="ml-1 text-[#94A3B8] font-normal">（沟通截图、确认函等，选填）</span>
            </label>
            {attachFiles.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {attachFiles.map((f,i)=>(
                  <div key={i} className="flex items-center gap-2 px-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-xs text-[#334155]">
                    <Ic d={P.fileText} size={12} className="text-[#7C3AED]"/>
                    <span>{f}</span>
                    <button onClick={()=>setAttachFiles(a=>a.filter((_,j)=>j!==i))} className="text-[#94A3B8] hover:text-[#DC2626] ml-1">
                      <Ic d={P.x} size={11}/>
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="border-2 border-dashed border-[#E2E8F0] rounded-lg p-5 flex items-center gap-4 hover:border-[#7C3AED] cursor-pointer transition-colors group"
              onClick={()=>setAttachFiles(a=>[...a,"新附件_"+(a.length+1)+".jpg"])}>
              <div className="w-10 h-10 rounded-lg bg-[#F5F3FF] border border-[#DDD6FE] flex items-center justify-center flex-shrink-0 group-hover:bg-[#EDE9FE]">
                <Ic d={P.upload} size={18} className="text-[#7C3AED]"/>
              </div>
              <div>
                <div className="text-sm font-medium text-[#334155]">点击上传附件</div>
                <div className="text-xs text-[#94A3B8] mt-0.5">支持 JPG / PNG / PDF，单文件 ≤ 20MB</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action bar */}
        <div className="flex items-center gap-3 mt-8 pt-5 border-t border-[#E2E8F0]">
          <Btn variant="primary" onClick={handleSubmit}>提交处理结果</Btn>
          <Btn variant="secondary" onClick={()=>setCancelConfirm(true)}>取消</Btn>
        </div>
      </Card>

      {/* Cancel confirm modal */}
      {cancelConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={()=>setCancelConfirm(false)}/>
          <div className="relative bg-white rounded-xl shadow-xl border border-[#E2E8F0] w-[440px]">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2E8F0]">
              <h2 className="text-base font-semibold text-[#0F172A]">确认取消处理？</h2>
              <button onClick={()=>setCancelConfirm(false)} className="text-[#94A3B8] hover:text-[#334155]"><Ic d={P.x} size={18}/></button>
            </div>
            <div className="px-5 py-4">
              <div className="flex items-start gap-3 rounded-lg border border-[#FDE68A] bg-[#FFFBEB] p-3">
                <Ic d={P.alertTri} size={16} className="text-[#D97706] mt-0.5 flex-shrink-0"/>
                <p className="text-sm text-[#92400E] leading-6">
                  当前填写的处理信息尚未提交，取消后内容将不会保存，异常单状态维持不变。确认离开吗？
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-[#E2E8F0] bg-[#F8FAFC] rounded-b-xl">
              <Btn variant="secondary" onClick={()=>setCancelConfirm(false)}>继续处理</Btn>
              <Btn variant="danger" onClick={()=>{ setCancelConfirm(false); onBack(); }}>确认取消</Btn>
            </div>
          </div>
        </div>
      )}

      {/* Submit success modal */}
      {submitSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"/>
          <div className="relative bg-white rounded-xl shadow-xl border border-[#E2E8F0] w-[520px]">
            <div className="px-6 py-8">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-full bg-[#F0FDF4] border-2 border-[#BBF7D0] flex items-center justify-center flex-shrink-0">
                  <Ic d={P.check} size={28} className="text-[#16A34A]"/>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#0F172A]">处理结果已提交</h2>
                  <p className="text-sm text-[#64748B] mt-0.5">异常单状态已变更为「已处理」</p>
                </div>
              </div>

              <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg divide-y divide-[#F1F5F9] mb-4">
                <div className="flex justify-between px-4 py-3 text-sm">
                  <span className="text-[#94A3B8]">差异单号</span>
                  <span className="font-mono font-semibold text-[#334155]">{row.id}</span>
                </div>
                <div className="flex justify-between px-4 py-3 text-sm">
                  <span className="text-[#94A3B8]">差异原因</span>
                  <Badge label={diffReason || "—"} color={diffReason ? DIFF_REASON_COLOR[diffReason as DiffReason] : "gray"} />
                </div>
                <div className="flex justify-between px-4 py-3 text-sm">
                  <span className="text-[#94A3B8]">处理方式</span>
                  <span className="font-semibold text-[#0F172A]">{successInfo.method}</span>
                </div>
                {successInfo.newNo && (
                  <div className="flex justify-between px-4 py-3 text-sm">
                    <span className="text-[#94A3B8]">关联采购入库单</span>
                    <span className="font-mono text-[#2563EB] font-semibold">{successInfo.newNo}</span>
                  </div>
                )}
              </div>

              {successInfo.method==="不补货" ? (
                <div className="flex items-start gap-2 p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-xs text-[#64748B] mb-5">
                  <Ic d={P.info} size={13} className="flex-shrink-0 mt-0.5"/>
                  本次采购已结束，差异件数已记录在案，可用于后续与供应商对账扣款。
                </div>
              ) : (
                <div className="flex items-start gap-2 p-3 bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg text-xs text-[#1D4ED8] mb-5">
                  <Ic d={P.truck} size={13} className="flex-shrink-0 mt-0.5"/>
                  补货采购入库单 <span className="font-mono font-semibold mx-1">{successInfo.newNo}</span> 已推送至履约系统，等待仓库收货确认。
                </div>
              )}

              <div className="flex gap-3 justify-end">
                <Btn variant="secondary" onClick={()=>{ setSubmitSuccess(false); onBack(); }}>返回异常单列表</Btn>
                {successInfo.newNo && (
                  <Btn variant="primary" onClick={()=>{ setSubmitSuccess(false); onInbound?.(); }}>查看补货入库单</Btn>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Re-export helpers used by App.tsx routing
// (App.tsx references these by name)
