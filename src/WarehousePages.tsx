// v4 – WarehouseInvAdjust inline table per-row editing (no sku var)
import { useState, ReactNode } from "react";

// ─── Icon ──────────────────────────────────────────────────────────────────
const Ic = ({ d, size = 16, className = "" }: { d: string; size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d={d} />
  </svg>
);
const P = {
  search:   "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0",
  plus:     "M12 5v14M5 12h14",
  download: "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4 M7 10l5 5 5-5 M12 15V3",
  edit:     "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7 M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",
  chevD:    "M6 9l6 6 6-6",
  chevR:    "M9 18l6-6-6-6",
  chevL:    "M15 18l-6-6 6-6",
  x:        "M18 6L6 18M6 6l12 12",
  check:    "M20 6L9 17l-5-5",
  alert:    "M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z M12 9v4 M12 17h.01",
  info:     "M12 22a10 10 0 100-20 10 10 0 000 20z M12 8v4 M12 16h.01",
  mapPin:   "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z M12 10a2 2 0 100-4 2 2 0 000 4",
  layers:   "M12 2L2 7l10 5 10-5-10-5z M2 17l10 5 10-5 M2 12l10 5 10-5",
  shield:   "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  phone:    "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 01.4 2.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z",
  user:     "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8",
  crosshair:"M12 22a10 10 0 100-20 10 10 0 000 20z M12 2v4m0 12v4M2 12h4m12 0h4",
};

// ─── Primitives ─────────────────────────────────────────────────────────────
type BC = "blue"|"green"|"yellow"|"red"|"gray"|"purple"|"cyan"|"orange";
const BADGE_COLORS: Record<BC,string> = {
  blue:  "bg-[#EFF6FF] text-[#2563EB] border-[#BFDBFE]",
  green: "bg-[#F0FDF4] text-[#16A34A] border-[#BBF7D0]",
  yellow:"bg-[#FFFBEB] text-[#D97706] border-[#FDE68A]",
  red:   "bg-[#FEF2F2] text-[#DC2626] border-[#FECACA]",
  gray:  "bg-[#F8FAFC] text-[#64748B] border-[#E2E8F0]",
  purple:"bg-[#F5F3FF] text-[#7C3AED] border-[#DDD6FE]",
  cyan:  "bg-[#ECFEFF] text-[#0891B2] border-[#A5F3FC]",
  orange:"bg-[#FFF7ED] text-[#EA580C] border-[#FED7AA]",
};
const Badge = ({ label, color, dot }: { label: string; color: BC; dot?: boolean }) => (
  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${BADGE_COLORS[color]}`}>
    {dot && <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />}
    {label}
  </span>
);

const Btn = ({ children, variant = "primary", size = "md", icon, onClick, disabled = false, className = "" }: {
  children?: ReactNode; variant?: "primary"|"secondary"|"ghost"|"danger";
  size?: "sm"|"md"; icon?: string; onClick?: () => void; disabled?: boolean; className?: string;
}) => {
  const sz = { sm: "px-3 py-1.5 text-xs rounded-md", md: "px-4 py-2 text-sm rounded-md" };
  const v = {
    primary:   "bg-[#16A34A] text-white border border-[#16A34A] hover:bg-[#15803D] shadow-sm",
    secondary: "bg-white text-[#334155] border border-[#E2E8F0] hover:bg-[#F8FAFC] hover:border-[#CBD5E1]",
    ghost:     "bg-transparent text-[#64748B] border border-transparent hover:bg-[#F1F5F9] hover:text-[#334155]",
    danger:    "bg-[#DC2626] text-white border border-[#DC2626] hover:bg-[#B91C1C]",
  };
  return (
    <button onClick={onClick} disabled={disabled}
      className={`inline-flex items-center gap-1.5 font-medium transition-all duration-150 cursor-pointer select-none
        ${sz[size]} ${v[variant]} ${disabled ? "opacity-40 pointer-events-none" : ""} ${className}`}>
      {icon && <Ic d={P[icon as keyof typeof P]} size={14} />}
      {children}
    </button>
  );
};

const Inp = ({ placeholder, value, onChange, icon, type = "text", className = "", disabled = false, error = "" }: {
  placeholder?: string; value?: string; onChange?: (v: string) => void;
  icon?: string; type?: string; className?: string; disabled?: boolean; error?: string;
}) => (
  <div className={className}>
    <div className="relative">
      {icon && <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none"><Ic d={P[icon as keyof typeof P]} size={14} /></span>}
      <input type={type} value={value} onChange={e => onChange?.(e.target.value)} placeholder={placeholder} disabled={disabled}
        className={`w-full h-9 border rounded-md text-sm placeholder-[#94A3B8] bg-white focus:outline-none focus:ring-2 transition-all
          ${icon ? "pl-8 pr-3" : "px-3"}
          ${error ? "border-[#DC2626] focus:border-[#DC2626] focus:ring-[#FEE2E2]" : "border-[#E2E8F0] focus:border-[#16A34A] focus:ring-[#DCFCE7]"}
          ${disabled ? "bg-[#F8FAFC] text-[#94A3B8] cursor-not-allowed" : "text-[#0F172A]"}`} />
    </div>
    {error && <p className="text-xs text-[#DC2626] mt-1 flex items-center gap-1"><Ic d={P.alert} size={11} />{error}</p>}
  </div>
);

const Sel = ({ options, value, onChange, className = "", disabled = false }: {
  options: { label: string; value: string }[]; value?: string; onChange?: (v: string) => void;
  className?: string; disabled?: boolean;
}) => (
  <div className={`relative ${className}`}>
    <select value={value} onChange={e => onChange?.(e.target.value)} disabled={disabled}
      className={`w-full h-9 border border-[#E2E8F0] rounded-md text-sm bg-white px-3 pr-8 appearance-none
        focus:outline-none focus:border-[#16A34A] focus:ring-2 focus:ring-[#DCFCE7] cursor-pointer
        ${disabled ? "bg-[#F8FAFC] text-[#94A3B8] cursor-not-allowed" : "text-[#334155]"}`}>
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
    <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none"><Ic d={P.chevD} size={14} /></span>
  </div>
);

const Card = ({ children, className = "", noPad = false }: { children: ReactNode; className?: string; noPad?: boolean }) => (
  <div className={`bg-white border border-[#E2E8F0] rounded-xl shadow-sm ${noPad ? "" : "p-5"} ${className}`}>{children}</div>
);

const FR = ({ label, required, hint, children, error }: {
  label: string; required?: boolean; hint?: string; children: ReactNode; error?: string;
}) => (
  <div>
    <label className="block text-xs font-medium text-[#64748B] mb-1.5">
      {required && <span className="text-[#DC2626] mr-0.5">*</span>}{label}
    </label>
    {children}
    {hint && !error && <p className="text-xs text-[#94A3B8] mt-1 leading-relaxed">{hint}</p>}
    {error && <p className="text-xs text-[#DC2626] mt-1 flex items-center gap-1"><Ic d={P.alert} size={11} />{error}</p>}
  </div>
);

const SectionHeader = ({ color, title, subtitle }: { color: string; title: string; subtitle?: string }) => (
  <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-[#F1F5F9]">
    <div className="w-1 h-4 rounded-full" style={{ background: color }} />
    <div>
      <h2 className="text-sm font-semibold text-[#0F172A]">{title}</h2>
      {subtitle && <p className="text-xs text-[#94A3B8] mt-0.5">{subtitle}</p>}
    </div>
  </div>
);

// ─── Region data (sample provinces / cities / districts) ─────────────────────
const REGION_DATA: Record<string, Record<string, string[]>> = {
  "广东省": {
    "广州市": ["天河区","越秀区","荔湾区","海珠区","番禺区","白云区","黄埔区","南沙区"],
    "深圳市": ["南山区","福田区","罗湖区","宝安区","龙华区","龙岗区","坪山区","光明区"],
    "佛山市": ["禅城区","南海区","顺德区","三水区","高明区"],
    "东莞市": ["南城区","东城区","万江区","莞城区"],
  },
  "上海市": {
    "上海市": ["浦东新区","黄浦区","静安区","徐汇区","长宁区","普陀区","虹口区","杨浦区","青浦区","松江区","嘉定区","闵行区","宝山区","金山区","奉贤区","崇明区"],
  },
  "北京市": {
    "北京市": ["东城区","西城区","朝阳区","丰台区","石景山区","海淀区","顺义区","通州区","大兴区","昌平区","房山区","门头沟区","平谷区","密云区","怀柔区","延庆区"],
  },
  "四川省": {
    "成都市": ["锦江区","青羊区","金牛区","武侯区","成华区","龙泉驿区","青白江区","新都区","温江区","双流区","郫都区","高新区"],
    "绵阳市": ["涪城区","游仙区","安州区","江油市","三台县"],
    "德阳市": ["旌阳区","罗江区","广汉市","什邡市","绵竹市"],
  },
  "浙江省": {
    "杭州市": ["西湖区","上城区","拱墅区","滨江区","萧山区","余杭区","临平区","钱塘区","富阳区","临安区"],
    "宁波市": ["海曙区","江北区","北仑区","镇海区","鄞州区","奉化区"],
    "温州市": ["鹿城区","龙湾区","瓯海区","洞头区"],
  },
};
const PROVINCES = Object.keys(REGION_DATA);

// ─── Sample warehouse data ───────────────────────────────────────────────────
type WhRow = {
  id: string; code: string; name: string;
  province: string; city: string; district: string;
  address: string; area: number; manager: string; phone: string;
  status: "启用"|"禁用"; creator: string; createdAt: string;
  locationCount: number;
};

const WH_DATA: WhRow[] = [
  { id:"1", code:"WH20250901001", name:"华南中心仓（深圳）", province:"广东省", city:"深圳市", district:"南山区",
    address:"广东省深圳市南山区科技园南区A3栋一层", area:8500, manager:"张仓管", phone:"13800138001",
    status:"启用", creator:"超级管理员", createdAt:"2025-09-01 09:00", locationCount:42 },
  { id:"2", code:"WH20250901002", name:"华东中心仓（上海）", province:"上海市", city:"上海市", district:"青浦区",
    address:"上海市青浦区华新镇华徐公路1999号", area:12000, manager:"李仓管", phone:"13900139002",
    status:"启用", creator:"超级管理员", createdAt:"2025-09-01 10:30", locationCount:38 },
  { id:"3", code:"WH20250902003", name:"华北中心仓（北京）", province:"北京市", city:"北京市", district:"顺义区",
    address:"北京市顺义区后沙峪镇裕民路16号", area:9800, manager:"王仓管", phone:"13700137003",
    status:"启用", creator:"超级管理员", createdAt:"2025-09-02 08:00", locationCount:27 },
  { id:"4", code:"WH20250902004", name:"西南中心仓（成都）", province:"四川省", city:"成都市", district:"高新区",
    address:"四川省成都市高新区天府大道中段500号", area:7200, manager:"刘仓管", phone:"13600136004",
    status:"启用", creator:"超级管理员", createdAt:"2025-09-02 14:00", locationCount:19 },
  { id:"5", code:"WH20250905005", name:"华东备用仓（杭州）", province:"浙江省", city:"杭州市", district:"余杭区",
    address:"浙江省杭州市余杭区仓前街道文一西路2999号", area:4500, manager:"陈仓管", phone:"13500135005",
    status:"禁用", creator:"超级管理员", createdAt:"2025-09-05 11:00", locationCount:0 },
];

// ══════════════════════════════════════════════════════════════════════════════
// WAREHOUSE LIST
// ══════════════════════════════════════════════════════════════════════════════
const WH_LOCATIONS: Record<string, { code: string; name: string; address: string; level: string; status: string }[]> = {
  "1": [
    { code:"LOC-SZ-001", name:"龙华万达广场A区", address:"深圳市龙华区龙华大道2008号万达广场A区一楼", level:"A级", status:"启用" },
    { code:"LOC-SZ-002", name:"福田中心城B座", address:"深圳市福田区中心路3号中心城购物广场B座负一楼", level:"A级", status:"启用" },
    { code:"LOC-SZ-003", name:"南山科技园C栋", address:"深圳市南山区高新南七道R2-B科技园C栋首层", level:"B级", status:"暂停" },
    { code:"LOC-SZ-004", name:"宝安西乡汇悦城", address:"深圳市宝安区宝源路1号汇悦城一楼入口处", level:"B级", status:"启用" },
    { code:"LOC-SZ-005", name:"罗湖万象城F区", address:"深圳市罗湖区宝安南路2068号万象城F区地下一层", level:"S级", status:"启用" },
  ],
  "2": [
    { code:"LOC-SH-001", name:"陆家嘴金融广场", address:"上海市浦东新区世纪大道100号金融广场B1层", level:"S级", status:"启用" },
    { code:"LOC-SH-002", name:"静安寺商圈B2", address:"上海市静安区南京西路1515号嘉里中心B2层", level:"A级", status:"启用" },
    { code:"LOC-SH-003", name:"虹桥枢纽T2航站楼", address:"上海市闵行区申长路777号虹桥T2航站楼二楼候机区", level:"S级", status:"启用" },
  ],
  "3": [
    { code:"LOC-BJ-001", name:"中关村科技园区", address:"北京市海淀区中关村大街27号中关村广场购物中心一层", level:"A级", status:"启用" },
    { code:"LOC-BJ-002", name:"国贸CBD东区", address:"北京市朝阳区建国门外大街1号国贸商城东区B1层", level:"S级", status:"暂停" },
  ],
  "4": [
    { code:"LOC-CD-001", name:"天府新区创新中心", address:"成都市天府新区天府大道南段888号创新中心一楼大堂", level:"B级", status:"启用" },
    { code:"LOC-CD-002", name:"锦里古街入口广场", address:"成都市武侯区武侯祠大街231号锦里古街东入口广场", level:"C级", status:"启用" },
  ],
  "5": [],
};

export const WarehouseList = ({ onCreate, onEdit }: { onCreate: () => void; onEdit: () => void }) => {
  const [rows, setRows] = useState<WhRow[]>(WH_DATA);
  const [confirm, setConfirm] = useState<{ row: WhRow; action: "启用"|"禁用" } | null>(null);
  const [locModal, setLocModal] = useState<WhRow | null>(null);

  const toggle = (row: WhRow) => setConfirm({ row, action: row.status === "启用" ? "禁用" : "启用" });
  const doToggle = () => {
    if (!confirm) return;
    setRows(r => r.map(w => w.id === confirm.row.id ? { ...w, status: confirm.action } : w));
    setConfirm(null);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-5">
        <div className="flex items-center gap-1 text-xs text-[#94A3B8] mb-1.5">
          {["首页","履约后台","仓库管理"].map((b,i,arr)=>(
            <span key={i} className="flex items-center gap-1">
              {i>0&&<Ic d={P.chevR} size={11}/>}
              <span className={i===arr.length-1?"text-[#64748B]":"hover:text-[#16A34A] cursor-pointer"}>{b}</span>
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-[#0F172A]">仓库管理</h1>
            <p className="text-xs text-[#94A3B8] mt-0.5">点位绑定仓库后，补货订单从该仓库发货，请确保仓库信息准确。</p>
          </div>
          <div className="flex items-center gap-2">
            <Btn variant="secondary" icon="download" size="sm">导出</Btn>
            <Btn variant="primary" icon="plus" onClick={onCreate}>新增仓库</Btn>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {[
          { label:"仓库总数", value: rows.length, color:"#16A34A" },
          { label:"启用中",   value: rows.filter(r=>r.status==="启用").length, color:"#16A34A" },
          { label:"已禁用",   value: rows.filter(r=>r.status==="禁用").length, color:"#DC2626" },
        ].map(s=>(
          <Card key={s.label} className="flex items-center gap-4 py-3">
            <div>
              <div className="text-xs text-[#94A3B8]">{s.label}</div>
              <div className="text-2xl font-bold mt-0.5" style={{color:s.color}}>{s.value}</div>
            </div>
          </Card>
        ))}
      </div>

      {/* Filter */}
      <Card className="mb-4">
        <div className="flex flex-wrap gap-3 items-end">
          <div className="flex flex-col gap-1 min-w-[180px]">
            <label className="text-xs font-medium text-[#64748B]">仓库名称/编码</label>
            <Inp placeholder="模糊搜索名称或编码" icon="search" className="w-44" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-[#64748B]">所在省份</label>
            <Sel className="w-32" options={[{label:"全部省份",value:""},...PROVINCES.map(p=>({label:p,value:p}))]} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-[#64748B]">所在城市</label>
            <Sel className="w-28" options={[{label:"全部城市",value:""}]} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-[#64748B]">所在区县</label>
            <Sel className="w-28" options={[{label:"全部区县",value:""}]} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-[#64748B]">状态</label>
            <Sel className="w-28" options={[{label:"全部状态",value:""},{label:"启用",value:"on"},{label:"禁用",value:"off"}]} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-[#64748B]">创建时间</label>
            <div className="flex items-center gap-1">
              <input type="date" className="h-9 border border-[#E2E8F0] rounded-md text-sm px-3 text-[#334155] focus:outline-none focus:border-[#16A34A]" />
              <span className="text-[#94A3B8] text-xs">至</span>
              <input type="date" className="h-9 border border-[#E2E8F0] rounded-md text-sm px-3 text-[#334155] focus:outline-none focus:border-[#16A34A]" />
            </div>
          </div>
          <div className="flex items-end gap-2">
            <Btn variant="primary" icon="search">搜索</Btn>
            <Btn variant="secondary">重置</Btn>
          </div>
        </div>
      </Card>

      {/* Table */}
      <Card noPad>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse" style={{minWidth:"1100px"}}>
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                {[
                  {label:"仓库编码",   w:"130px", align:"left"},
                  {label:"仓库名称",   w:"180px", align:"left"},
                  {label:"所在地区",   w:"140px", align:"left"},
                  {label:"详细地址",   w:"220px", align:"left"},
                  {label:"仓库面积",   w:"88px",  align:"right"},
                  {label:"联系人",     w:"80px",  align:"left"},
                  {label:"联系电话",   w:"110px", align:"left"},
                  {label:"状态",       w:"72px",  align:"left"},
                  {label:"关联点位",   w:"90px",  align:"left"},
                  {label:"创建人",     w:"80px",  align:"left"},
                  {label:"创建时间",   w:"130px", align:"left"},
                  {label:"操作",       w:"120px", align:"left"},
                ].map(h=>(
                  <th key={h.label} style={{minWidth:h.w}}
                    className={`px-4 py-3 text-[11px] font-semibold text-[#64748B] uppercase tracking-wide whitespace-nowrap text-${h.align}`}>
                    {h.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r,i)=>(
                <tr key={r.id}
                  className={`border-b border-[#F1F5F9] transition-colors
                    ${r.status==="禁用" ? "bg-[#FAFAFA] text-[#94A3B8]" : i%2===1 ? "bg-[#FAFBFC] hover:bg-[#F8FAFC]" : "hover:bg-[#F8FAFC]"}`}>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span className="font-mono text-xs font-medium text-[#334155]">{r.code}</span>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span className={`font-medium ${r.status==="禁用"?"text-[#94A3B8]":"text-[#0F172A]"}`}>{r.name}</span>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span className="text-sm text-[#64748B]">{r.province} / {r.city} / {r.district}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-sm text-[#64748B] block max-w-[216px] truncate" title={r.address}>{r.address}</span>
                  </td>
                  <td className="px-4 py-3.5 text-right whitespace-nowrap">
                    <span className="text-sm font-medium text-[#334155]">{r.area.toLocaleString()} ㎡</span>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span className="text-sm text-[#334155]">{r.manager}</span>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span className="text-sm text-[#334155] font-mono">{r.phone}</span>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <Badge label={r.status} color={r.status==="启用"?"green":"red"} dot />
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    {r.locationCount > 0
                      ? <button onClick={() => setLocModal(r)}
                          className="inline-flex items-center gap-1 text-sm text-[#2563EB] hover:underline font-medium">
                          {r.locationCount} 个点位
                        </button>
                      : <span className="text-sm text-[#CBD5E1]">—</span>
                    }
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span className="text-sm text-[#64748B]">{r.creator}</span>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span className="text-xs text-[#94A3B8]">{r.createdAt}</span>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <Btn variant="ghost" size="sm" icon="edit" onClick={onEdit}>编辑</Btn>
                      <Btn
                        variant="ghost" size="sm"
                        className={r.status==="启用"
                          ? "!text-[#DC2626] hover:!bg-[#FEF2F2]"
                          : "!text-[#16A34A] hover:!bg-[#F0FDF4]"}
                        onClick={()=>toggle(r)}>
                        {r.status==="启用" ? "禁用" : "启用"}
                      </Btn>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-[#E2E8F0]">
          <span className="text-xs text-[#64748B]">共 <strong className="text-[#334155]">{rows.length}</strong> 条记录</span>
          <div className="flex items-center gap-1">
            <button className="px-2.5 py-1.5 text-xs border border-[#E2E8F0] rounded text-[#64748B] hover:bg-[#F8FAFC]">上一页</button>
            <button className="w-8 h-7 text-xs border rounded bg-[#16A34A] text-white border-[#16A34A]">1</button>
            <button className="px-2.5 py-1.5 text-xs border border-[#E2E8F0] rounded text-[#64748B] hover:bg-[#F8FAFC]">下一页</button>
          </div>
        </div>
      </Card>

      {/* Location list modal */}
      {locModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setLocModal(null)}>
          <div className="bg-white rounded-xl shadow-2xl w-[780px] max-h-[80vh] flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2E8F0] flex-shrink-0">
              <div>
                <h2 className="text-sm font-semibold text-[#0F172A]">关联点位列表</h2>
                <p className="text-xs text-[#94A3B8] mt-0.5">{locModal.name} · 共 {locModal.locationCount} 个点位</p>
              </div>
              <button onClick={() => setLocModal(null)} className="w-7 h-7 flex items-center justify-center rounded-md text-[#94A3B8] hover:text-[#475569] hover:bg-[#F1F5F9] transition-colors">
                <Ic d={P.x} size={16} />
              </button>
            </div>
            <div className="overflow-y-auto flex-1">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                    {["点位编码","点位名称","详细位置","点位等级","点位状态"].map(h => (
                      <th key={h} className="px-4 py-3 text-[11px] font-semibold text-[#64748B] uppercase tracking-wide text-left whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(WH_LOCATIONS[locModal.id] ?? []).map((loc, i) => (
                    <tr key={loc.code} className={`border-b border-[#F1F5F9] ${i % 2 === 1 ? "bg-[#FAFBFC]" : "bg-white"} hover:bg-[#F8FAFC]`}>
                      <td className="px-4 py-3 font-mono text-xs text-[#64748B] whitespace-nowrap">{loc.code}</td>
                      <td className="px-4 py-3 font-medium text-[#0F172A] whitespace-nowrap">{loc.name}</td>
                      <td className="px-4 py-3 text-xs text-[#64748B] max-w-[200px]">
                        <span className="block truncate" title={loc.address}>{loc.address}</span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          loc.level === "S级" ? "bg-[#FEF3C7] text-[#D97706]" :
                          loc.level === "A级" ? "bg-[#EFF6FF] text-[#2563EB]" :
                          loc.level === "B级" ? "bg-[#F0FDF4] text-[#16A34A]" :
                          "bg-[#F1F5F9] text-[#64748B]"}`}>{loc.level}</span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <Badge label={loc.status} color={loc.status === "启用" ? "green" : "orange"} dot />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-5 py-3 border-t border-[#E2E8F0] flex justify-end flex-shrink-0">
              <Btn variant="ghost" onClick={() => setLocModal(null)}>关闭</Btn>
            </div>
          </div>
        </div>
      )}

      {/* Confirm modal */}
      {confirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={()=>setConfirm(null)} />
          <div className="relative bg-white rounded-xl shadow-xl border border-[#E2E8F0] w-[480px]">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2E8F0]">
              <h2 className="text-base font-semibold text-[#0F172A]">
                确认{confirm.action}仓库
              </h2>
              <button onClick={()=>setConfirm(null)} className="text-[#94A3B8] hover:text-[#334155]">
                <Ic d={P.x} size={18} />
              </button>
            </div>
            <div className="px-5 py-4 space-y-3">
              <div className={`flex items-start gap-3 rounded-lg border p-3.5
                ${confirm.action==="禁用"
                  ? "border-[#FECACA] bg-[#FEF2F2]"
                  : "border-[#BBF7D0] bg-[#F0FDF4]"}`}>
                <Ic d={confirm.action==="禁用" ? P.alert : P.info} size={17}
                  className={`flex-shrink-0 mt-0.5 ${confirm.action==="禁用" ? "text-[#DC2626]" : "text-[#16A34A]"}`} />
                <div className={`text-sm leading-6 ${confirm.action==="禁用" ? "text-[#991B1B]" : "text-[#14532D]"}`}>
                  {confirm.action==="禁用"
                    ? <>确认<strong>禁用</strong>仓库「{confirm.row.name}」？<br/>
                        <span className="text-xs mt-0.5 block">禁用后该仓库将不可用于采购、入库、补货等业务，已关联点位需重新绑定其他仓库。</span></>
                    : <>确认<strong>启用</strong>仓库「{confirm.row.name}」？<br/>
                        <span className="text-xs mt-0.5 block">启用后该仓库可正常参与采购、入库及补货发货流程。</span></>
                  }
                </div>
              </div>
              <div className="bg-[#F8FAFC] rounded-lg px-4 py-3 text-xs text-[#64748B] grid grid-cols-2 gap-y-2">
                <div><span className="text-[#94A3B8]">仓库编码：</span><span className="font-mono">{confirm.row.code}</span></div>
                <div><span className="text-[#94A3B8]">所在地区：</span>{confirm.row.province} {confirm.row.district}</div>
                <div><span className="text-[#94A3B8]">联系人：</span>{confirm.row.manager}</div>
                <div><span className="text-[#94A3B8]">当前状态：</span><Badge label={confirm.row.status} color={confirm.row.status==="启用"?"green":"red"} /></div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-[#E2E8F0] bg-[#F8FAFC] rounded-b-xl">
              <Btn variant="secondary" onClick={()=>setConfirm(null)}>取消</Btn>
              <Btn
                variant={confirm.action==="禁用" ? "danger" : "primary"}
                onClick={doToggle}>
                确认{confirm.action}
              </Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// WAREHOUSE FORM (新增 / 编辑)
// ══════════════════════════════════════════════════════════════════════════════
export const WarehouseForm = ({ onBack, isEdit = false }: { onBack: () => void; isEdit?: boolean }) => {
  const whCode = "WH" + new Date().toISOString().slice(0,10).replace(/-/g,"") + "006";

  // Form values
  const [name, setName] = useState(isEdit ? "华南中心仓（深圳）" : "");
  const [province, setProvince] = useState(isEdit ? "广东省" : "");
  const [city, setCity] = useState(isEdit ? "深圳市" : "");
  const [district, setDistrict] = useState(isEdit ? "南山区" : "");
  const [address, setAddress] = useState(isEdit ? "广东省深圳市南山区科技园南区A3栋一层" : "");
  const [lat, setLat] = useState(isEdit ? "22.5431" : "");
  const [lng, setLng] = useState(isEdit ? "113.9395" : "");
  const [area, setArea] = useState(isEdit ? "8500" : "");
  const [manager, setManager] = useState(isEdit ? "张仓管" : "");
  const [phone, setPhone] = useState(isEdit ? "13800138001" : "");
  const [status, setStatus] = useState(isEdit ? "启用" : "启用");
  const [remark, setRemark] = useState("");
  const [errors, setErrors] = useState<Record<string,string>>({});
  const [cancelConfirm, setCancelConfirm] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  // Map interaction state
  const [mapPinX, setMapPinX] = useState(isEdit ? 55 : 50);
  const [mapPinY, setMapPinY] = useState(isEdit ? 45 : 50);
  const [mapDragging, setMapDragging] = useState(false);

  const cities = province ? Object.keys(REGION_DATA[province] || {}) : [];
  const districts = city && province ? (REGION_DATA[province]?.[city] || []) : [];

  const isDirty = name || province || address || manager || phone;

  const validate = () => {
    const e: Record<string,string> = {};
    if (!name.trim()) e.name = "请填写仓库名称";
    else if (name.length > 50) e.name = "仓库名称不超过50字符";
    if (!province) e.province = "请选择省份";
    if (!city) e.city = "请选择城市";
    if (!district) e.district = "请选择区县";
    if (!address.trim()) e.address = "请填写详细地址";
    if (!lat || !lng) e.latlng = "请在地图上选取仓库位置";
    if (!manager.trim()) e.manager = "请填写仓库管理人";
    else if (manager.length > 20) e.manager = "管理人姓名不超过20字符";
    if (!phone.trim()) e.phone = "请填写联系电话";
    else if (!/^1[3-9]\d{9}$/.test(phone)) e.phone = "请输入正确的11位手机号";
    if (area && (!/^\d+$/.test(area) || parseInt(area) <= 0)) e.area = "仓库面积请输入正整数";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => { if (validate()) setSaveSuccess(true); };

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
    setMapPinX(x); setMapPinY(y);
    const baseLat = 22 + (province === "北京市" ? 17 : province === "上海市" ? 9 : province === "浙江省" ? 8 : province === "四川省" ? 8 : 0);
    const baseLng = 113 + (province === "北京市" ? 3 : province === "上海市" ? 8 : province === "浙江省" ? 7 : province === "四川省" ? -9 : 0);
    setLat((baseLat + (50-y)*0.002).toFixed(6));
    setLng((baseLng + (x-50)*0.003).toFixed(6));
    setErrors(er => ({...er, latlng:""}));
  };

  // Decorative map elements
  const MAP_DOTS = [
    {x:20,y:30,s:3},{x:35,y:55,s:4},{x:60,y:25,s:3},{x:75,y:60,s:3},{x:45,y:70,s:5},
    {x:80,y:35,s:3},{x:15,y:65,s:4},{x:65,y:75,s:3},{x:90,y:55,s:3},{x:30,y:80,s:4},
  ];
  const MAP_LINES = [
    "M10,40 Q30,20 50,35 T90,30","M5,60 Q25,50 45,65 T85,55","M20,75 Q40,60 60,70 T95,65",
  ];

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="mb-5">
        <div className="flex items-center gap-1 text-xs text-[#94A3B8] mb-1.5">
          {["首页","履约后台","仓库管理", isEdit?"编辑仓库":"新增仓库"].map((b,i,arr)=>(
            <span key={i} className="flex items-center gap-1">
              {i>0&&<Ic d={P.chevR} size={11}/>}
              <span className={i===arr.length-1?"text-[#64748B]":"hover:text-[#16A34A] cursor-pointer"}>{b}</span>
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button onClick={()=>isDirty ? setCancelConfirm(true) : onBack()}
            className="flex items-center gap-1.5 text-[#64748B] hover:text-[#334155] text-sm transition-colors">
            <Ic d={P.chevL} size={16}/>返回
          </button>
          <div className="h-5 w-px bg-[#E2E8F0]"/>
          <h1 className="text-xl font-bold text-[#0F172A]">{isEdit ? "编辑仓库" : "新增仓库"}</h1>
        </div>
      </div>

      {/* ── 仓库编码 (system-generated) ── */}
      <Card className="mb-4">
        <SectionHeader color="#16A34A" title="仓库编码" subtitle="系统自动生成，不可修改" />
        <div className="flex items-center gap-4 px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg">
          <span className="text-xs text-[#94A3B8]">仓库编码</span>
          <span className="font-mono text-sm font-bold text-[#334155] select-all">{whCode}</span>
          <span className="ml-auto text-xs text-[#94A3B8] flex items-center gap-1">
            <Ic d={P.shield} size={12}/>只读 · 规则：WH + 年月日 + 流水号
          </span>
        </div>
      </Card>

      {/* ── 基本信息 ── */}
      <Card className="mb-4">
        <SectionHeader color="#16A34A" title="基本信息" />
        <div className="grid grid-cols-3 gap-x-6 gap-y-5">
          <FR label="仓库名称" required error={errors.name}>
            <Inp
              value={name} onChange={v=>{setName(v.slice(0,50)); setErrors(e=>({...e,name:""}));}}
              placeholder="请输入仓库名称，最长50字符"
              error={errors.name}
            />
            <div className="text-right text-xs text-[#94A3B8] mt-0.5">{name.length}/50</div>
          </FR>

          {/* 省 / 市 / 区 */}
          <FR label="所在省份" required error={errors.province}>
            <Sel
              value={province}
              onChange={v=>{setProvince(v); setCity(""); setDistrict(""); setErrors(e=>({...e,province:"",city:"",district:""}));}}
              options={[{label:"请选择省份",value:""},...PROVINCES.map(p=>({label:p,value:p}))]}
            />
            {errors.province && <p className="text-xs text-[#DC2626] mt-1 flex items-center gap-1"><Ic d={P.alert} size={11}/>{errors.province}</p>}
          </FR>
          <FR label="所在城市" required error={errors.city}>
            <Sel
              value={city}
              onChange={v=>{setCity(v); setDistrict(""); setErrors(e=>({...e,city:"",district:""}));}}
              options={[{label:"请选择城市",value:""},...cities.map(c=>({label:c,value:c}))]}
              disabled={!province}
            />
            {errors.city && <p className="text-xs text-[#DC2626] mt-1 flex items-center gap-1"><Ic d={P.alert} size={11}/>{errors.city}</p>}
          </FR>
          <FR label="所在区县" required error={errors.district}>
            <Sel
              value={district}
              onChange={v=>{setDistrict(v); setErrors(e=>({...e,district:""}));}}
              options={[{label:"请选择区县",value:""},...districts.map(d=>({label:d,value:d}))]}
              disabled={!city}
            />
            {errors.district && <p className="text-xs text-[#DC2626] mt-1 flex items-center gap-1"><Ic d={P.alert} size={11}/>{errors.district}</p>}
          </FR>

          <FR label="仓库面积" hint="选填，单位 ㎡，请输入正整数" error={errors.area}>
            <div className="flex items-center gap-2">
              <Inp
                value={area} onChange={v=>{setArea(v); setErrors(e=>({...e,area:""}));}}
                type="number" placeholder="如：8500"
                error={errors.area}
                className="flex-1"
              />
              <span className="text-sm text-[#64748B] flex-shrink-0">㎡</span>
            </div>
          </FR>
        </div>
      </Card>

      {/* ── 地址与定位 ── */}
      <Card className="mb-4">
        <SectionHeader color="#16A34A" title="地址与定位" subtitle="精确地址与地图标记用于仓库定位和配送路线规划" />

        <div className="grid grid-cols-2 gap-6">
          {/* Left: address fields */}
          <div className="space-y-5">
            <FR label="详细地址" required error={errors.address}>
              <Inp
                value={address}
                onChange={v=>{setAddress(v); setErrors(e=>({...e,address:""}));}}
                placeholder="省 / 市 / 区 + 街道门牌号"
                error={errors.address}
              />
            </FR>
            <div className="grid grid-cols-2 gap-4">
              <FR label="纬度" error={errors.latlng ? " " : ""}>
                <Inp
                  value={lat} onChange={v=>{setLat(v); setErrors(e=>({...e,latlng:""}));}}
                  placeholder="如：22.543100"
                  type="number"
                />
              </FR>
              <FR label="经度" error={errors.latlng}>
                <Inp
                  value={lng} onChange={v=>{setLng(v); setErrors(e=>({...e,latlng:""}));}}
                  placeholder="如：113.939500"
                  type="number"
                />
              </FR>
            </div>
            {lat && lng && (
              <div className="flex items-center gap-2 px-3 py-2 bg-[#F0FDF4] border border-[#BBF7D0] rounded-lg text-xs text-[#16A34A]">
                <Ic d={P.mapPin} size={13} className="flex-shrink-0"/>
                <span>已选坐标：{parseFloat(lat).toFixed(4)}°N，{parseFloat(lng).toFixed(4)}°E</span>
              </div>
            )}
            <div className="flex items-start gap-2 p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-xs text-[#64748B]">
              <Ic d={P.info} size={13} className="text-[#16A34A] flex-shrink-0 mt-0.5"/>
              点击右侧地图任意位置选取仓库坐标，也可直接输入已知经纬度。
            </div>
          </div>

          {/* Right: interactive map */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-[#64748B]">
              <span className="text-[#DC2626] mr-0.5">*</span>地图选点
              <span className="ml-1 text-[#94A3B8] font-normal">（点击地图选取仓库位置）</span>
            </label>
            <div
              className={`relative flex-1 min-h-[220px] rounded-xl overflow-hidden cursor-crosshair border-2 transition-colors
                ${errors.latlng ? "border-[#DC2626]" : mapDragging ? "border-[#16A34A]" : "border-[#E2E8F0] hover:border-[#16A34A]"}`}
              style={{background:"linear-gradient(135deg,#e8f4f0 0%,#d1e8e0 40%,#c5dfd8 60%,#b8d4cc 100%)"}}
              onClick={handleMapClick}
              onMouseEnter={()=>setMapDragging(true)}
              onMouseLeave={()=>setMapDragging(false)}>

              {/* Decorative SVG map overlay */}
              <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Grid lines */}
                {[20,40,60,80].map(v=>(
                  <g key={v}>
                    <line x1={v} y1="0" x2={v} y2="100" stroke="#2563EB" strokeWidth="0.3"/>
                    <line x1="0" y1={v} x2="100" y2={v} stroke="#2563EB" strokeWidth="0.3"/>
                  </g>
                ))}
                {/* Roads */}
                {MAP_LINES.map((d,i)=>(
                  <path key={i} d={d} fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.6"/>
                ))}
                {/* Location dots */}
                {MAP_DOTS.map((dot,i)=>(
                  <circle key={i} cx={dot.x} cy={dot.y} r={dot.s*0.4} fill="#16A34A" opacity="0.5"/>
                ))}
              </svg>

              {/* Map labels */}
              <div className="absolute top-2 left-2 text-[10px] font-bold text-[#2563EB] opacity-40 select-none">
                {province||"选择省份后显示区域"}
              </div>

              {/* Scale bar */}
              <div className="absolute bottom-2 right-2 flex items-center gap-1 opacity-50 select-none">
                <div className="w-8 h-px bg-[#334155]"/>
                <span className="text-[9px] text-[#334155]">5km</span>
              </div>

              {/* Crosshair cursor guide */}
              {mapDragging && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-[10px] text-[#16A34A] bg-white/80 px-2 py-1 rounded font-medium shadow">
                    点击选取位置
                  </div>
                </div>
              )}

              {/* Pin */}
              {(lat || isEdit) && (
                <div className="absolute pointer-events-none" style={{left:`${mapPinX}%`,top:`${mapPinY}%`,transform:"translate(-50%,-100%)"}}>
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-[#16A34A] border-3 border-white shadow-lg flex items-center justify-center">
                      <Ic d={P.layers} size={14} className="text-white"/>
                    </div>
                    <div className="w-0.5 h-3 bg-[#16A34A]"/>
                    <div className="w-2 h-1 bg-[#16A34A] rounded-full opacity-50"/>
                  </div>
                </div>
              )}

              {/* No-selection placeholder */}
              {!lat && !isEdit && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 pointer-events-none">
                  <Ic d={P.crosshair} size={28} className="text-[#16A34A] opacity-40"/>
                  <span className="text-xs text-[#64748B] bg-white/70 px-2 py-1 rounded">点击任意位置选取仓库坐标</span>
                </div>
              )}
            </div>
            {errors.latlng && (
              <p className="text-xs text-[#DC2626] flex items-center gap-1"><Ic d={P.alert} size={11}/>{errors.latlng}</p>
            )}
          </div>
        </div>
      </Card>

      {/* ── 联系方式与状态 ── */}
      <Card className="mb-4">
        <SectionHeader color="#16A34A" title="联系方式与状态" />
        <div className="grid grid-cols-3 gap-x-6 gap-y-5">
          <FR label="仓库管理人" required error={errors.manager}>
            <Inp
              value={manager} onChange={v=>{setManager(v.slice(0,20)); setErrors(e=>({...e,manager:""}));}}
              placeholder="请输入管理人姓名"
              icon="user"
              error={errors.manager}
            />
          </FR>
          <FR label="联系电话" required error={errors.phone}>
            <Inp
              value={phone} onChange={v=>{setPhone(v); setErrors(e=>({...e,phone:""}));}}
              placeholder="11位手机号"
              icon="phone"
              type="tel"
              error={errors.phone}
            />
          </FR>
          <FR label="状态" required>
            <div className="flex gap-3">
              {(["启用","禁用"] as const).map(s=>(
                <label key={s}
                  className={`flex items-center gap-2 px-4 py-2.5 border-2 rounded-xl cursor-pointer transition-all flex-1 text-sm
                    ${status===s
                      ? s==="启用" ? "border-[#16A34A] bg-[#F0FDF4] text-[#16A34A] font-semibold"
                                   : "border-[#DC2626] bg-[#FEF2F2] text-[#DC2626] font-semibold"
                      : "border-[#E2E8F0] text-[#334155] hover:border-[#CBD5E1]"}`}>
                  <input type="radio" name="whStatus" checked={status===s} onChange={()=>setStatus(s)} className="accent-[#16A34A]"/>
                  {s}
                </label>
              ))}
            </div>
            {status==="禁用" && (
              <p className="text-xs text-[#D97706] mt-1.5 flex items-center gap-1">
                <Ic d={P.alert} size={11}/>禁用后该仓库不可用于采购、入库、补货等业务
              </p>
            )}
          </FR>
        </div>
      </Card>

      {/* ── 备注 ── */}
      <Card className="mb-4">
        <SectionHeader color="#94A3B8" title="备注" subtitle="选填，最长200字符" />
        <textarea
          value={remark} onChange={e=>setRemark(e.target.value.slice(0,200))}
          placeholder="如：该仓库为深圳华南区主仓，承接华南地区全部智能柜补货发货"
          rows={3}
          className="w-full border border-[#E2E8F0] rounded-lg text-sm px-3 py-2.5 text-[#334155] placeholder-[#94A3B8] resize-none focus:outline-none focus:border-[#16A34A] focus:ring-2 focus:ring-[#DCFCE7]"
        />
        <div className="text-right text-xs text-[#94A3B8] mt-1">{remark.length}/200</div>
      </Card>

      {/* ── Fixed bottom action bar ── */}
      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-[#E2E8F0] bg-white shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
        <div className="flex items-center justify-between px-6 py-3 max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-2 text-xs text-[#64748B]">
            <Ic d={P.info} size={14} className="text-[#16A34A] flex-shrink-0"/>
            <span>带 <span className="text-[#DC2626]">*</span> 为必填项，保存后仓库可绑定至采购、入库及补货发货流程。</span>
          </div>
          <div className="flex items-center gap-3">
            <Btn variant="secondary" onClick={()=>isDirty ? setCancelConfirm(true) : onBack()}>取消</Btn>
            <Btn variant="primary" onClick={handleSave}>保存</Btn>
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
                <Ic d={P.alert} size={16} className="text-[#D97706] mt-0.5 flex-shrink-0"/>
                <p className="text-sm text-[#92400E] leading-6">
                  当前页面已填写的仓库信息尚未保存，离开后内容将丢失，确认取消吗？
                </p>
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
              <div className="w-16 h-16 rounded-full bg-[#F0FDF4] border-2 border-[#BBF7D0] flex items-center justify-center mx-auto mb-4">
                <Ic d={P.check} size={30} className="text-[#16A34A]"/>
              </div>
              <h2 className="text-lg font-bold text-[#0F172A] mb-1">
                {isEdit ? "仓库信息已更新" : "仓库创建成功"}
              </h2>
              <p className="text-sm text-[#64748B] mb-5">该仓库现已可用于采购、入库及补货发货流程。</p>
              <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg divide-y divide-[#F1F5F9] mb-6 text-left">
                <div className="flex justify-between px-4 py-3 text-sm">
                  <span className="text-[#94A3B8]">仓库编码</span>
                  <span className="font-mono font-semibold text-[#334155]">{whCode}</span>
                </div>
                <div className="flex justify-between px-4 py-3 text-sm">
                  <span className="text-[#94A3B8]">仓库名称</span>
                  <span className="font-medium text-[#0F172A]">{name}</span>
                </div>
                <div className="flex justify-between px-4 py-3 text-sm">
                  <span className="text-[#94A3B8]">所在地区</span>
                  <span className="text-[#334155]">{province} / {city} / {district}</span>
                </div>
                <div className="flex justify-between px-4 py-3 text-sm">
                  <span className="text-[#94A3B8]">状态</span>
                  <Badge label={status} color={status==="启用"?"green":"red"} dot />
                </div>
              </div>
              <div className="flex gap-3 justify-center">
                <Btn variant="secondary" onClick={()=>{ setSaveSuccess(false); onBack(); }}>返回仓库列表</Btn>
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
// WAREHOUSE INVENTORY LIST
// ══════════════════════════════════════════════════════════════════════════════
type WhInvRow = {
  id: string;
  whName: string;
  region: string;
  linkedSites: number;
  totalSkus: number;
  stockedSkus: number;
  totalStock: number;
  availStock: number;
  frozenStock: number;
  lossQty: number;
  dailyOut: number;
  turnoverDays: number;
  lastOutAt: string;
};

const WH_INV_DATA: WhInvRow[] = [
  { id:"1", whName:"华南中心仓（深圳）", region:"广东省 / 深圳市 / 南山区",
    linkedSites:128, totalSkus:312, stockedSkus:289,
    totalStock:48320, availStock:44100, frozenStock:3120, lossQty:1100,
    dailyOut:860, turnoverDays:56, lastOutAt:"2025-09-14 18:22" },
  { id:"2", whName:"华东中心仓（上海）", region:"上海市 / 上海市 / 青浦区",
    linkedSites:96, totalSkus:278, stockedSkus:251,
    totalStock:36800, availStock:34200, frozenStock:1800, lossQty:800,
    dailyOut:640, turnoverDays:62, lastOutAt:"2025-09-14 17:05" },
  { id:"3", whName:"华北中心仓（北京）", region:"北京市 / 北京市 / 顺义区",
    linkedSites:74, totalSkus:240, stockedSkus:210,
    totalStock:29500, availStock:27800, frozenStock:1200, lossQty:500,
    dailyOut:480, turnoverDays:71, lastOutAt:"2025-09-14 16:40" },
  { id:"4", whName:"西南中心仓（成都）", region:"四川省 / 成都市 / 高新区",
    linkedSites:52, totalSkus:198, stockedSkus:172,
    totalStock:18200, availStock:16900, frozenStock:900, lossQty:400,
    dailyOut:310, turnoverDays:89, lastOutAt:"2025-09-14 15:30" },
  { id:"5", whName:"华东备用仓（杭州）", region:"浙江省 / 杭州市 / 余杭区",
    linkedSites:18, totalSkus:88, stockedSkus:62,
    totalStock:6400, availStock:5900, frozenStock:320, lossQty:180,
    dailyOut:95, turnoverDays:74, lastOutAt:"2025-09-13 12:00" },
];

const NUM_CITIES = ["深圳市","广州市","中山市","上海市","北京市","成都市","杭州市","佛山市","宁波市"];

export const WarehouseInvList = ({ onDetail, onAdjust }: { onDetail: () => void; onAdjust: () => void }) => {
  const rows = WH_INV_DATA;
  const [invLocModal, setInvLocModal] = useState<typeof WH_INV_DATA[0] | null>(null);

  return (
    <div>
      {/* Header */}
      <div className="mb-5">
        <div className="flex items-center gap-1 text-xs text-[#94A3B8] mb-1.5">
          {["首页","履约后台","仓库库存"].map((b,i,arr)=>(
            <span key={i} className="flex items-center gap-1">
              {i>0&&<Ic d={P.chevR} size={11}/>}
              <span className={i===arr.length-1?"text-[#64748B]":"hover:text-[#16A34A] cursor-pointer"}>{b}</span>
            </span>
          ))}
        </div>
        <h1 className="text-xl font-bold text-[#0F172A]">仓库库存</h1>
        <p className="text-xs text-[#94A3B8] mt-0.5">仓库级库存经营视图，展示各仓库整体库存状况与周转健康度。</p>
      </div>

      {/* Filter */}
      <Card className="mb-4">
        <div className="flex flex-wrap gap-3 items-end">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-[#64748B]">仓库名称</label>
            <Inp placeholder="模糊搜索仓库名称" icon="search" className="w-48" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-[#64748B]">城市</label>
            <Sel className="w-32" options={[{label:"全部城市",value:""},...NUM_CITIES.map(c=>({label:c,value:c}))]} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-[#64748B]">关联点位名称/编码</label>
            <Inp placeholder="模糊搜索点位名称或编码" icon="search" className="w-48" />
          </div>
          <div className="flex items-end gap-2 ml-auto">
            <Btn variant="secondary">重置</Btn>
            <Btn variant="primary" icon="search">搜索</Btn>
          </div>
        </div>
      </Card>

      {/* KPI row */}
      <div className="grid grid-cols-4 gap-3 mb-4">
        {[
          { label:"在管仓库", value: rows.length, unit:"个", color:"#16A34A" },
          { label:"总库存量", value: rows.reduce((s,r)=>s+r.totalStock,0).toLocaleString(), unit:"件", color:"#2563EB" },
          { label:"平均周转天数", value: Math.round(rows.reduce((s,r)=>s+r.turnoverDays,0)/rows.length), unit:"天", color:"#D97706" },
          { label:"今日总出库", value: rows.reduce((s,r)=>s+r.dailyOut,0).toLocaleString(), unit:"件", color:"#7C3AED" },
        ].map(s=>(
          <Card key={s.label} className="py-3">
            <div className="text-xs text-[#94A3B8] mb-1">{s.label}</div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold" style={{color:s.color}}>{s.value}</span>
              <span className="text-xs text-[#94A3B8]">{s.unit}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Table */}
      <Card noPad>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse" style={{minWidth:"1400px"}}>
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                {[
                  {label:"仓库名称",      w:"160px"},
                  {label:"所在地区",      w:"180px"},
                  {label:"关联点位列表",  w:"100px", align:"left"},
                  {label:"总商品种类",    w:"88px",  align:"right"},
                  {label:"有库存种类",    w:"88px",  align:"right"},
                  {label:"总库存",        w:"88px",  align:"right"},
                  {label:"可用库存",      w:"88px",  align:"right"},
                  {label:"冻结库存",      w:"88px",  align:"right"},
                  {label:"报损件数",      w:"80px",  align:"right"},
                  {label:"日均出库 ★",   w:"110px", align:"right"},
                  {label:"周转天数 ★",   w:"110px", align:"right"},
                  {label:"最近出库时间",  w:"140px"},
                  {label:"操作",          w:"160px"},
                ].map(h=>(
                  <th key={h.label} style={{minWidth:h.w}}
                    className={`px-4 py-3 text-[11px] font-semibold text-[#64748B] uppercase tracking-wide whitespace-nowrap text-${(h as any).align||"left"}`}>
                    {h.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r,i)=>{
                const turnoverColor = r.turnoverDays <= 60 ? "#16A34A" : r.turnoverDays <= 90 ? "#D97706" : "#DC2626";
                return (
                  <tr key={r.id}
                    className={`border-b border-[#F1F5F9] transition-colors ${i%2===1?"bg-[#FAFBFC] hover:bg-[#F8FAFC]":"hover:bg-[#F8FAFC]"}`}>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="font-medium text-[#0F172A]">{r.whName}</span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="text-xs text-[#64748B]">{r.region}</span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <button onClick={() => setInvLocModal(r)}
                        className="inline-flex items-center gap-1 text-sm text-[#2563EB] hover:underline font-medium">
                        {r.linkedSites} 个点位
                      </button>
                    </td>
                    <td className="px-4 py-4 text-right whitespace-nowrap">
                      <span className="font-medium text-[#334155]">{r.totalSkus}</span>
                    </td>
                    <td className="px-4 py-4 text-right whitespace-nowrap">
                      <span className="font-medium text-[#334155]">{r.stockedSkus}</span>
                      <span className="text-xs text-[#94A3B8] ml-1">/ {r.totalSkus}</span>
                    </td>
                    <td className="px-4 py-4 text-right whitespace-nowrap">
                      <span className="font-medium text-[#334155]">{r.totalStock.toLocaleString()}</span>
                    </td>
                    <td className="px-4 py-4 text-right whitespace-nowrap">
                      <span className="font-semibold text-[#16A34A]">{r.availStock.toLocaleString()}</span>
                    </td>
                    <td className="px-4 py-4 text-right whitespace-nowrap">
                      <span className={`font-medium ${r.frozenStock>0?"text-[#D97706]":"text-[#94A3B8]"}`}>{r.frozenStock.toLocaleString()}</span>
                    </td>
                    <td className="px-4 py-4 text-right whitespace-nowrap">
                      <span className={`font-medium ${r.lossQty>0?"text-[#DC2626]":"text-[#94A3B8]"}`}>{r.lossQty.toLocaleString()}</span>
                    </td>
                    {/* 日均出库 — star metric */}
                    <td className="px-4 py-4 text-right whitespace-nowrap">
                      <div className="inline-flex flex-col items-end">
                        <span className="text-lg font-bold text-[#2563EB] leading-none">{r.dailyOut.toLocaleString()}</span>
                        <span className="text-[10px] text-[#94A3B8] leading-none mt-0.5">件/日</span>
                      </div>
                    </td>
                    {/* 周转天数 — star metric */}
                    <td className="px-4 py-4 text-right whitespace-nowrap">
                      <div className="inline-flex flex-col items-end">
                        <span className="text-lg font-bold leading-none" style={{color:turnoverColor}}>{r.turnoverDays}</span>
                        <span className="text-[10px] leading-none mt-0.5" style={{color:turnoverColor}}>天</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="text-xs text-[#94A3B8]">{r.lastOutAt}</span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <Btn variant="ghost" size="sm" onClick={onDetail}>商品明细</Btn>
                        <Btn variant="ghost" size="sm"
                          className="!text-[#2563EB] hover:!bg-[#EFF6FF]"
                          onClick={onAdjust}>
                          调整库存
                        </Btn>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-[#E2E8F0]">
          <div className="flex items-center gap-4 text-xs text-[#94A3B8]">
            <span>共 <strong className="text-[#334155]">{rows.length}</strong> 个仓库</span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#16A34A] inline-block"/>周转≤60天（健康）
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#D97706] inline-block"/>61-90天（关注）
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#DC2626] inline-block"/>&gt;90天（预警）
            </span>
            <span className="italic text-[#CBD5E1]">★ 周转天数公式待客户确认</span>
          </div>
          <div className="flex items-center gap-1">
            <button className="px-2.5 py-1.5 text-xs border border-[#E2E8F0] rounded text-[#64748B] hover:bg-[#F8FAFC]">上一页</button>
            <button className="w-8 h-7 text-xs border rounded bg-[#16A34A] text-white border-[#16A34A]">1</button>
            <button className="px-2.5 py-1.5 text-xs border border-[#E2E8F0] rounded text-[#64748B] hover:bg-[#F8FAFC]">下一页</button>
          </div>
        </div>
      </Card>

      {/* Inv location modal */}
      {invLocModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setInvLocModal(null)}>
          <div className="bg-white rounded-xl shadow-2xl w-[780px] max-h-[80vh] flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2E8F0] flex-shrink-0">
              <div>
                <h2 className="text-sm font-semibold text-[#0F172A]">关联点位列表</h2>
                <p className="text-xs text-[#94A3B8] mt-0.5">{invLocModal.whName} · 共 {invLocModal.linkedSites} 个点位</p>
              </div>
              <button onClick={() => setInvLocModal(null)} className="w-7 h-7 flex items-center justify-center rounded-md text-[#94A3B8] hover:text-[#475569] hover:bg-[#F1F5F9] transition-colors">
                <Ic d={P.x} size={16} />
              </button>
            </div>
            <div className="overflow-y-auto flex-1">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                    {["点位编码","点位名称","详细位置","点位等级","点位状态"].map(h => (
                      <th key={h} className="px-4 py-3 text-[11px] font-semibold text-[#64748B] uppercase tracking-wide text-left whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(WH_LOCATIONS[invLocModal.id] ?? []).map((loc, i) => (
                    <tr key={loc.code} className={`border-b border-[#F1F5F9] ${i % 2 === 1 ? "bg-[#FAFBFC]" : "bg-white"} hover:bg-[#F8FAFC]`}>
                      <td className="px-4 py-3 font-mono text-xs text-[#64748B] whitespace-nowrap">{loc.code}</td>
                      <td className="px-4 py-3 font-medium text-[#0F172A] whitespace-nowrap">{loc.name}</td>
                      <td className="px-4 py-3 text-xs text-[#64748B] max-w-[200px]">
                        <span className="block truncate" title={loc.address}>{loc.address}</span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          loc.level === "S级" ? "bg-[#FEF3C7] text-[#D97706]" :
                          loc.level === "A级" ? "bg-[#EFF6FF] text-[#2563EB]" :
                          loc.level === "B级" ? "bg-[#F0FDF4] text-[#16A34A]" :
                          "bg-[#F1F5F9] text-[#64748B]"}`}>{loc.level}</span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <Badge label={loc.status} color={loc.status === "启用" ? "green" : "orange"} dot />
                      </td>
                    </tr>
                  ))}
                  {(WH_LOCATIONS[invLocModal.id] ?? []).length === 0 && (
                    <tr><td colSpan={5} className="px-4 py-8 text-center text-sm text-[#94A3B8]">暂无关联点位</td></tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="px-5 py-3 border-t border-[#E2E8F0] flex justify-end flex-shrink-0">
              <Btn variant="ghost" onClick={() => setInvLocModal(null)}>关闭</Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// WAREHOUSE INV DETAIL (商品库存明细)
// ══════════════════════════════════════════════════════════════════════════════
type InvDetailRow = {
  skuId: string; skuCode: string; skuName: string; barcode: string; spec: string;
  totalStock: number; availStock: number; frozenStock: number; lossQty: number;
  dailyOut: number; lastInAt: string; lastOutAt: string;
};

const INV_DETAIL_ROWS: InvDetailRow[] = [
  { skuId:"SKU001", skuCode:"SC-2024-001", skuName:"矿泉水 550ml", barcode:"6901234560011", spec:"24瓶/箱",
    totalStock:3200, availStock:3000, frozenStock:120, lossQty:80, dailyOut:156, lastInAt:"2025-09-10", lastOutAt:"2025-09-14" },
  { skuId:"SKU002", skuCode:"SC-2024-002", skuName:"绿茶饮料 500ml", barcode:"6901234560022", spec:"24瓶/箱",
    totalStock:2800, availStock:2600, frozenStock:140, lossQty:60, dailyOut:112, lastInAt:"2025-09-09", lastOutAt:"2025-09-14" },
  { skuId:"SKU003", skuCode:"SC-2024-003", skuName:"薯片 原味 75g", barcode:"6901234560033", spec:"20袋/箱",
    totalStock:1900, availStock:1800, frozenStock:80, lossQty:20, dailyOut:88, lastInAt:"2025-09-08", lastOutAt:"2025-09-13" },
  { skuId:"SKU004", skuCode:"SC-2024-004", skuName:"即食燕麦 420g", barcode:"6901234560044", spec:"12盒/箱",
    totalStock:640, availStock:580, frozenStock:40, lossQty:20, dailyOut:22, lastInAt:"2025-09-06", lastOutAt:"2025-09-12" },
  { skuId:"SKU005", skuCode:"SC-2024-005", skuName:"黑芝麻糊 320g", barcode:"6901234560055", spec:"12袋/箱",
    totalStock:420, availStock:400, frozenStock:10, lossQty:10, dailyOut:15, lastInAt:"2025-09-05", lastOutAt:"2025-09-11" },
];

export const WarehouseInvDetail = ({ onBack }: { onBack: () => void }) => {
  const whName = "华南中心仓（深圳）";
  const rows = INV_DETAIL_ROWS;

  return (
    <div>
      {/* Header */}
      <div className="mb-5">
        <div className="flex items-center gap-1 text-xs text-[#94A3B8] mb-1.5">
          {["首页","履约后台","仓库库存","商品库存明细"].map((b,i,arr)=>(
            <span key={i} className="flex items-center gap-1">
              {i>0&&<Ic d={P.chevR} size={11}/>}
              <span className={i===arr.length-1?"text-[#64748B]":"hover:text-[#16A34A] cursor-pointer"}>{b}</span>
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3 mb-1">
          <button onClick={onBack}
            className="flex items-center gap-1.5 text-[#64748B] hover:text-[#334155] text-sm transition-colors">
            <Ic d={P.chevL} size={16}/>返回
          </button>
          <div className="h-5 w-px bg-[#E2E8F0]"/>
          <h1 className="text-xl font-bold text-[#0F172A]">商品库存明细</h1>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <Badge label={whName} color="green" />
          <span className="text-xs text-[#94A3B8]">只读视图 · 共 {rows.length} 个商品</span>
        </div>
      </div>

      {/* Warehouse snapshot */}
      <div className="grid grid-cols-5 gap-3 mb-4">
        {[
          { label:"总商品种类", value: rows.length,  unit:"种", color:"#334155" },
          { label:"总库存",     value: rows.reduce((s,r)=>s+r.totalStock,0).toLocaleString(), unit:"件", color:"#2563EB" },
          { label:"可用库存",   value: rows.reduce((s,r)=>s+r.availStock,0).toLocaleString(), unit:"件", color:"#16A34A" },
          { label:"冻结库存",   value: rows.reduce((s,r)=>s+r.frozenStock,0).toLocaleString(), unit:"件", color:"#D97706" },
          { label:"报损件数",   value: rows.reduce((s,r)=>s+r.lossQty,0).toLocaleString(), unit:"件", color:"#DC2626" },
        ].map(s=>(
          <Card key={s.label} className="py-3">
            <div className="text-xs text-[#94A3B8] mb-1">{s.label}</div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold" style={{color:s.color}}>{s.value}</span>
              <span className="text-xs text-[#94A3B8]">{s.unit}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Detail table */}
      <Card noPad>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse" style={{minWidth:"1100px"}}>
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                {[
                  {label:"商品ID",      w:"90px"},
                  {label:"商品编码",    w:"120px"},
                  {label:"商品名称",    w:"160px"},
                  {label:"条形码",      w:"130px"},
                  {label:"箱规",        w:"90px"},
                  {label:"总库存",      w:"80px",  a:"right"},
                  {label:"可用库存",    w:"80px",  a:"right"},
                  {label:"冻结库存",    w:"80px",  a:"right"},
                  {label:"报损件数",    w:"80px",  a:"right"},
                  {label:"日均出库",    w:"80px",  a:"right"},
                  {label:"最近入库",    w:"100px"},
                  {label:"最近出库",    w:"100px"},
                ].map(h=>(
                  <th key={h.label} style={{minWidth:h.w}}
                    className={`px-4 py-3 text-[11px] font-semibold text-[#64748B] uppercase tracking-wide whitespace-nowrap text-${(h as any).a||"left"}`}>
                    {h.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r,i)=>(
                <tr key={r.skuId}
                  className={`border-b border-[#F1F5F9] transition-colors ${i%2===1?"bg-[#FAFBFC] hover:bg-[#F8FAFC]":"hover:bg-[#F8FAFC]"}`}>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span className="font-mono text-xs font-medium text-[#64748B]">{r.skuId}</span>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span className="font-mono text-xs text-[#64748B]">{r.skuCode}</span>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span className="font-medium text-[#0F172A]">{r.skuName}</span>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span className="font-mono text-xs text-[#94A3B8]">{r.barcode}</span>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span className="text-xs text-[#64748B]">{r.spec}</span>
                  </td>
                  <td className="px-4 py-3.5 text-right whitespace-nowrap font-medium text-[#334155]">{r.totalStock.toLocaleString()}</td>
                  <td className="px-4 py-3.5 text-right whitespace-nowrap font-semibold text-[#16A34A]">{r.availStock.toLocaleString()}</td>
                  <td className="px-4 py-3.5 text-right whitespace-nowrap">
                    <span className={`font-medium ${r.frozenStock>0?"text-[#D97706]":"text-[#94A3B8]"}`}>{r.frozenStock.toLocaleString()}</span>
                  </td>
                  <td className="px-4 py-3.5 text-right whitespace-nowrap">
                    <span className={`font-medium ${r.lossQty>0?"text-[#DC2626]":"text-[#94A3B8]"}`}>{r.lossQty.toLocaleString()}</span>
                  </td>
                  <td className="px-4 py-3.5 text-right whitespace-nowrap font-medium text-[#2563EB]">{r.dailyOut}</td>
                  <td className="px-4 py-3.5 whitespace-nowrap text-xs text-[#94A3B8]">{r.lastInAt}</td>
                  <td className="px-4 py-3.5 whitespace-nowrap text-xs text-[#94A3B8]">{r.lastOutAt}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-[#F8FAFC] border-t-2 border-[#E2E8F0]">
                <td colSpan={5} className="px-4 py-3 text-xs font-semibold text-[#64748B]">合计</td>
                <td className="px-4 py-3 text-right text-sm font-bold text-[#334155]">{rows.reduce((s,r)=>s+r.totalStock,0).toLocaleString()}</td>
                <td className="px-4 py-3 text-right text-sm font-bold text-[#16A34A]">{rows.reduce((s,r)=>s+r.availStock,0).toLocaleString()}</td>
                <td className="px-4 py-3 text-right text-sm font-bold text-[#D97706]">{rows.reduce((s,r)=>s+r.frozenStock,0).toLocaleString()}</td>
                <td className="px-4 py-3 text-right text-sm font-bold text-[#DC2626]">{rows.reduce((s,r)=>s+r.lossQty,0).toLocaleString()}</td>
                <td className="px-4 py-3 text-right text-sm font-bold text-[#2563EB]">{rows.reduce((s,r)=>s+r.dailyOut,0).toLocaleString()}</td>
                <td colSpan={2}/>
              </tr>
            </tfoot>
          </table>
        </div>
      </Card>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// WAREHOUSE INV ADJUST (手动调整库存 — 商品列表内联编辑)
// ══════════════════════════════════════════════════════════════════════════════
type AdjType = "增加" | "减少" | "";
type AdjReason = "盘点差异" | "报损" | "其他" | "";

type AdjRow = {
  skuId: string; skuCode: string; skuName: string; spec: string; currentStock: number;
  adjType: AdjType; adjQty: string; adjReason: AdjReason; customReason: string; remark: string;
};

const INIT_ADJ_ROWS: AdjRow[] = INV_DETAIL_ROWS.map(r => ({
  skuId: r.skuId, skuCode: r.skuCode, skuName: r.skuName, spec: r.spec, currentStock: r.totalStock,
  adjType: "", adjQty: "", adjReason: "", customReason: "", remark: "",
}));

export const WarehouseInvAdjust = ({ onBack }: { onBack: () => void }) => {
  const whName = "华南中心仓（深圳）";
  const [rows, setRows] = useState<AdjRow[]>(INIT_ADJ_ROWS);
  const [errors, setErrors] = useState<Record<string, Record<string,string>>>({});
  const [cancelConfirm, setCancelConfirm] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const isDirty = rows.some(r => r.adjType || r.adjQty || r.adjReason);

  const updRow = (skuId: string, patch: Partial<AdjRow>) =>
    setRows(rs => rs.map(r => r.skuId === skuId ? { ...r, ...patch } : r));

  const clearErr = (skuId: string, field: string) =>
    setErrors(es => ({ ...es, [skuId]: { ...(es[skuId] || {}), [field]: "" } }));

  const dirtyRows = rows.filter(r => r.adjType || r.adjQty || r.adjReason);

  const validate = () => {
    const e: Record<string, Record<string,string>> = {};
    let ok = true;
    rows.forEach(r => {
      const hasAny = r.adjType || r.adjQty || r.adjReason;
      if (!hasAny) return;
      const re: Record<string,string> = {};
      if (!r.adjType) { re.adjType = "请选择类型"; ok = false; }
      if (!r.adjQty.trim()) { re.adjQty = "请填写数量"; ok = false; }
      else if (!/^\d+$/.test(r.adjQty) || parseInt(r.adjQty) <= 0) { re.adjQty = "正整数"; ok = false; }
      else if (r.adjType === "减少" && parseInt(r.adjQty) > r.currentStock) { re.adjQty = "超出库存"; ok = false; }
      if (!r.adjReason) { re.adjReason = "请选择原因"; ok = false; }
      if (r.adjReason === "其他" && !r.customReason.trim()) { re.customReason = "请填写说明"; ok = false; }
      if (Object.keys(re).length) e[r.skuId] = re;
    });
    if (dirtyRows.length === 0) { e["__global"] = { msg: "请至少填写一行调整信息" }; ok = false; }
    setErrors(e);
    return ok;
  };

  const handleSubmit = () => { if (validate()) setSubmitSuccess(true); };

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="mb-5">
        <div className="flex items-center gap-1 text-xs text-[#94A3B8] mb-1.5">
          {["首页","履约后台","仓库库存","手动调整库存"].map((b,i,arr)=>(
            <span key={i} className="flex items-center gap-1">
              {i>0&&<Ic d={P.chevR} size={11}/>}
              <span className={i===arr.length-1?"text-[#64748B]":"hover:text-[#16A34A] cursor-pointer"}>{b}</span>
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={()=>isDirty ? setCancelConfirm(true) : onBack()}
              className="flex items-center gap-1.5 text-[#64748B] hover:text-[#334155] text-sm transition-colors">
              <Ic d={P.chevL} size={16}/>返回
            </button>
            <div className="h-5 w-px bg-[#E2E8F0]"/>
            <div>
              <h1 className="text-xl font-bold text-[#0F172A]">手动调整库存</h1>
              <p className="text-xs text-[#94A3B8] mt-0.5">仓库：{whName} · 共 {rows.length} 个商品</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#64748B] bg-[#FFFBEB] border border-[#FDE68A] px-3 py-2 rounded-lg">
            <Ic d={P.alert} size={13} className="text-[#D97706] flex-shrink-0"/>
            已填写 <strong className="text-[#D97706]">{dirtyRows.length}</strong> 行 · 提交后不可撤销
          </div>
        </div>
      </div>

      {/* 警示 banner */}
      <div className="flex items-start gap-3 px-4 py-3 mb-4 rounded-xl border border-[#FDE68A] bg-[#FFFBEB]">
        <Ic d={P.shield} size={15} className="text-[#D97706] flex-shrink-0 mt-0.5"/>
        <div className="text-sm text-[#92400E] leading-6">
          <strong>手动调整将产生库存变更记录，操作不可撤销。</strong>
          仅填写需要调整的商品行，未填写行不会被处理。提交后变更实时同步至库存台账，可在库存流水中追溯。
        </div>
      </div>

      {/* Table */}
      <Card noPad className="mb-4">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse" style={{minWidth:"1100px"}}>
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                {[
                  {label:"#",           w:"40px"},
                  {label:"商品ID",      w:"88px"},
                  {label:"商品编码",    w:"120px"},
                  {label:"商品名称",    w:"150px"},
                  {label:"箱规",        w:"88px"},
                  {label:"当前库存",    w:"90px",  a:"right"},
                  {label:"调整类型 *",  w:"130px"},
                  {label:"调整数量 *",  w:"130px"},
                  {label:"调整后库存",  w:"100px",  a:"right"},
                  {label:"调整原因 *",  w:"140px"},
                  {label:"备注",        w:"160px"},
                ].map(h=>(
                  <th key={h.label} style={{minWidth:h.w}}
                    className={`px-3 py-3 text-[11px] font-semibold text-[#64748B] uppercase tracking-wide whitespace-nowrap text-${(h as any).a||"left"}`}>
                    {h.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => {
                const qty = parseInt(r.adjQty) || 0;
                const overStock = r.adjType === "减少" && qty > r.currentStock;
                const afterStock = r.adjType === "增加"
                  ? r.currentStock + qty
                  : r.adjType === "减少"
                  ? r.currentStock - qty
                  : null;
                const rowErr = errors[r.skuId] || {};
                const isDirtyRow = r.adjType || r.adjQty || r.adjReason;

                return (
                  <tr key={r.skuId}
                    className={`border-b border-[#F1F5F9] transition-colors align-top
                      ${isDirtyRow ? "bg-[#FAFFFE]" : i%2===1 ? "bg-[#FAFBFC]" : ""}`}>
                    <td className="px-3 py-3 text-xs text-[#94A3B8] pt-4">{i+1}</td>
                    {/* 只读字段 */}
                    <td className="px-3 py-3">
                      <span className="font-mono text-xs text-[#64748B]">{r.skuId}</span>
                    </td>
                    <td className="px-3 py-3">
                      <span className="font-mono text-xs text-[#94A3B8]">{r.skuCode}</span>
                    </td>
                    <td className="px-3 py-3">
                      <span className="font-medium text-[#0F172A]">{r.skuName}</span>
                    </td>
                    <td className="px-3 py-3">
                      <span className="text-xs text-[#94A3B8]">{r.spec}</span>
                    </td>
                    <td className="px-3 py-3 text-right">
                      <span className="font-bold text-[#334155]">{r.currentStock.toLocaleString()}</span>
                    </td>

                    {/* 调整类型 */}
                    <td className="px-3 py-3">
                      <div className="flex gap-1.5">
                        {(["增加","减少"] as const).map(t => (
                          <label key={t}
                            className={`flex items-center gap-1 px-2.5 py-1.5 border rounded-lg cursor-pointer text-xs transition-all
                              ${r.adjType===t
                                ? t==="增加" ? "border-[#16A34A] bg-[#F0FDF4] text-[#16A34A] font-semibold"
                                             : "border-[#DC2626] bg-[#FEF2F2] text-[#DC2626] font-semibold"
                                : "border-[#E2E8F0] text-[#64748B] hover:border-[#CBD5E1]"}`}>
                            <input type="radio" checked={r.adjType===t}
                              onChange={()=>{updRow(r.skuId,{adjType:t}); clearErr(r.skuId,"adjType");}}
                              className="w-3 h-3 accent-[#16A34A]"/>
                            {t}
                          </label>
                        ))}
                      </div>
                      {rowErr.adjType && <p className="text-[10px] text-[#DC2626] mt-1">{rowErr.adjType}</p>}
                    </td>

                    {/* 调整数量 */}
                    <td className="px-3 py-3">
                      <div className={`flex items-center h-8 border rounded-lg px-2 bg-white transition-all
                        ${rowErr.adjQty ? "border-[#DC2626]" : "border-[#E2E8F0] focus-within:border-[#2563EB]"}`}>
                        {r.adjType && (
                          <span className={`text-sm font-bold mr-1 ${r.adjType==="增加"?"text-[#16A34A]":"text-[#DC2626]"}`}>
                            {r.adjType==="增加"?"+":"−"}
                          </span>
                        )}
                        <input type="number" min="1" value={r.adjQty}
                          onChange={e=>{updRow(r.skuId,{adjQty:e.target.value}); clearErr(r.skuId,"adjQty");}}
                          placeholder="件数"
                          className="w-full bg-transparent text-sm font-semibold text-[#0F172A] focus:outline-none placeholder-[#CBD5E1]"
                        />
                      </div>
                      {rowErr.adjQty && <p className="text-[10px] text-[#DC2626] mt-1">{rowErr.adjQty}</p>}
                      {overStock && !rowErr.adjQty && <p className="text-[10px] text-[#DC2626] mt-1">超出库存上限</p>}
                    </td>

                    {/* 调整后库存预览 */}
                    <td className="px-3 py-3 text-right">
                      {afterStock !== null && !overStock && qty > 0 ? (
                        <div className={`text-sm font-bold ${r.adjType==="增加"?"text-[#16A34A]":"text-[#D97706]"}`}>
                          {afterStock.toLocaleString()}
                          <div className="text-[10px] font-normal text-[#94A3B8]">件</div>
                        </div>
                      ) : overStock ? (
                        <span className="text-xs text-[#DC2626]">超出</span>
                      ) : (
                        <span className="text-xs text-[#CBD5E1]">—</span>
                      )}
                    </td>

                    {/* 调整原因 */}
                    <td className="px-3 py-3">
                      <select value={r.adjReason}
                        onChange={e=>{updRow(r.skuId,{adjReason:e.target.value as AdjReason, customReason:""}); clearErr(r.skuId,"adjReason");}}
                        className={`w-full h-8 border rounded-lg text-xs px-2 bg-white appearance-none focus:outline-none focus:border-[#2563EB] cursor-pointer
                          ${rowErr.adjReason ? "border-[#DC2626]" : "border-[#E2E8F0]"} text-[#334155]`}>
                        <option value="">选择原因</option>
                        <option value="盘点差异">盘点差异</option>
                        <option value="报损">报损</option>
                        <option value="其他">其他</option>
                      </select>
                      {r.adjReason === "其他" && (
                        <input value={r.customReason}
                          onChange={e=>{updRow(r.skuId,{customReason:e.target.value.slice(0,50)}); clearErr(r.skuId,"customReason");}}
                          placeholder="请说明（必填）"
                          className={`mt-1.5 w-full h-7 border rounded-lg text-xs px-2 bg-white focus:outline-none focus:border-[#2563EB]
                            ${rowErr.customReason ? "border-[#DC2626]" : "border-[#E2E8F0]"}`}
                        />
                      )}
                      {rowErr.adjReason && <p className="text-[10px] text-[#DC2626] mt-1">{rowErr.adjReason}</p>}
                      {rowErr.customReason && <p className="text-[10px] text-[#DC2626] mt-1">{rowErr.customReason}</p>}
                    </td>

                    {/* 备注 */}
                    <td className="px-3 py-3">
                      <input value={r.remark}
                        onChange={e=>updRow(r.skuId,{remark:e.target.value.slice(0,100)})}
                        placeholder="选填备注"
                        className="w-full h-8 border border-[#E2E8F0] rounded-lg text-xs px-2 bg-white focus:outline-none focus:border-[#64748B] text-[#334155] placeholder-[#CBD5E1]"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {errors["__global"] && (
        <p className="text-sm text-[#DC2626] mb-4 flex items-center gap-1.5">
          <Ic d={P.alert} size={14}/>{errors["__global"].msg}
        </p>
      )}

      {/* Fixed bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-[#E2E8F0] bg-white shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
        <div className="flex items-center justify-between px-6 py-3 max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-2 text-xs text-[#64748B]">
            <Ic d={P.shield} size={14} className="text-[#2563EB] flex-shrink-0"/>
            <span>提交后将生成不可逆的库存变更记录。仅已填写行会被处理，未填写行自动跳过。</span>
          </div>
          <div className="flex items-center gap-3">
            <Btn variant="secondary" onClick={()=>isDirty ? setCancelConfirm(true) : onBack()}>取消</Btn>
            <Btn variant="primary" onClick={handleSubmit}>
              提交调整{dirtyRows.length > 0 ? `（${dirtyRows.length} 行）` : ""}
            </Btn>
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
                <Ic d={P.alert} size={16} className="text-[#D97706] mt-0.5 flex-shrink-0"/>
                <p className="text-sm text-[#92400E] leading-6">当前已填写 <strong>{dirtyRows.length}</strong> 行调整信息尚未提交，离开后将丢失，确认取消吗？</p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-[#E2E8F0] bg-[#F8FAFC] rounded-b-xl">
              <Btn variant="secondary" onClick={()=>setCancelConfirm(false)}>继续填写</Btn>
              <Btn variant="danger" onClick={()=>{ setCancelConfirm(false); onBack(); }}>确认离开</Btn>
            </div>
          </div>
        </div>
      )}

      {/* Submit success */}
      {submitSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"/>
          <div className="relative bg-white rounded-xl shadow-xl border border-[#E2E8F0] w-[560px]">
            <div className="px-6 pt-8 pb-6 text-center">
              <div className="w-16 h-16 rounded-full bg-[#EFF6FF] border-2 border-[#BFDBFE] flex items-center justify-center mx-auto mb-4">
                <Ic d={P.check} size={30} className="text-[#2563EB]"/>
              </div>
              <h2 className="text-lg font-bold text-[#0F172A] mb-1">库存调整已提交</h2>
              <p className="text-sm text-[#64748B] mb-5">共处理 <strong>{dirtyRows.length}</strong> 个商品，变更记录已写入库存台账。</p>
              <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg overflow-hidden mb-6 text-left text-xs max-h-52 overflow-y-auto">
                <div className="grid grid-cols-4 gap-0 bg-[#F1F5F9] px-3 py-2 font-semibold text-[#64748B] sticky top-0">
                  <span>商品</span><span className="text-center">类型</span><span className="text-center">数量</span><span className="text-center">原因</span>
                </div>
                {dirtyRows.map(r=>{
                  const q = parseInt(r.adjQty)||0;
                  return (
                    <div key={r.skuId} className="grid grid-cols-4 gap-0 px-3 py-2.5 border-t border-[#F1F5F9]">
                      <span className="font-medium text-[#0F172A] truncate">{r.skuName}</span>
                      <span className={`text-center font-semibold ${r.adjType==="增加"?"text-[#16A34A]":"text-[#DC2626]"}`}>{r.adjType}</span>
                      <span className="text-center text-[#334155]">{q} 件</span>
                      <span className="text-center text-[#64748B]">{r.adjReason==="其他"?`其他` : r.adjReason}</span>
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-3 justify-center">
                <Btn variant="secondary" onClick={()=>{ setSubmitSuccess(false); onBack(); }}>返回库存列表</Btn>
                <Btn variant="primary" onClick={()=>setSubmitSuccess(false)}>继续调整</Btn>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
