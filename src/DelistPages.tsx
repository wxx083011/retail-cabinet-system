// 下架单列表 / 下架单详情（需求 7.2.5）
// 归属：运营后台 > 智能柜管理；沿用 GoodsPages 的蓝主色设计系统
import { useState, ReactNode, MouseEvent } from "react";

// ─── Icon ───────────────────────────────────────────────────────────────────
const Icon = ({ d, size = 16, className = "" }: { d: string; size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d={d} />
  </svg>
);
const I = {
  search: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0",
  download: "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4 M7 10l5 5 5-5 M12 15V3",
  chevL: "M15 18l-6-6 6-6",
  chevD: "M6 9l6 6 6-6",
  info: "M12 22a10 10 0 100-20 10 10 0 000 20z M12 8v4 M12 16h.01",
};

// ─── Design System ───────────────────────────────────────────────────────────
type BtnVariant = "primary" | "secondary" | "danger" | "ghost";
const btnCls: Record<BtnVariant, string> = {
  primary: "bg-[#2563EB] text-white hover:bg-[#1D4ED8]",
  secondary: "bg-white border border-[#E2E8F0] text-[#334155] hover:bg-[#F8FAFC]",
  danger: "bg-[#DC2626] text-white hover:bg-[#B91C1C]",
  ghost: "text-[#2563EB] hover:bg-[#EFF6FF]",
};
function Btn({ v = "secondary", children, onClick, disabled, className = "", icon }: { v?: BtnVariant; children: ReactNode; onClick?: (e: MouseEvent) => void; disabled?: boolean; className?: string; icon?: string }) {
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
type PillColor = "green" | "blue" | "orange" | "red" | "gray";
function StatusPill({ label, color }: { label: string; color: PillColor }) {
  const cls = { green: "bg-[#DCFCE7] text-[#15803D]", blue: "bg-[#DBEAFE] text-[#1D4ED8]", orange: "bg-[#FEF3C7] text-[#B45309]", red: "bg-[#FEE2E2] text-[#DC2626]", gray: "bg-[#F3F4F6] text-[#6B7280]" };
  return <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${cls[color]}`}>{label}</span>;
}
function PageHeader({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h1 className="text-xl font-bold text-[#0F172A]">{title}</h1>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
}
function SectionLabel({ children }: { children: ReactNode }) {
  return <div className="text-sm font-semibold text-[#0F172A] mb-3">{children}</div>;
}
function Field({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div>
      <div className="text-xs text-[#94A3B8] mb-1">{label}</div>
      <div className="text-sm text-[#334155]">{value}</div>
    </div>
  );
}

// ─── Mock Data ───────────────────────────────────────────────────────────────
// 本期无下架执行状态（二期开发），列表与筛选均不展示「下架状态」字段
const DELIST_REASONS = ["临期", "破损", "质量问题", "滞销", "其他"];
const DELIST_SOURCES = ["手动创建"];

type DelistRow = { sku: string; name: string; spec: string; slot: string; shouldQty: number; prodDate: string; reason: string };
type DelistOrderItem = {
  id: string; deviceSn: string; pointName: string; status: string; reason: string; source: string;
  relatedRestockNo: string; creator: string; createdAt: string; completedAt: string;
  inbound: { no: string; warehouse: string; status: string; time: string; qty: number };
  items: DelistRow[];
};

const DELIST_LIST: DelistOrderItem[] = [
  {
    id: "XJ20240903001", deviceSn: "DEV-20240101", pointName: "深圳科技园A座大厅", status: "已完成", reason: "临期", source: "手动创建",
    relatedRestockNo: "RO20240903001", creator: "陈静", createdAt: "2024-09-03 09:12", completedAt: "2024-09-03 11:20",
    inbound: { no: "IB-20240903-003", warehouse: "深圳中央仓", status: "待入库", time: "—", qty: 92 },
    items: [
      { sku: "SKU-S0006", name: "伊利纯牛奶250ml", spec: "250ml×24", slot: "A-03-02", shouldQty: 24, prodDate: "2024-06-12", reason: "临期" },
      { sku: "SKU-S0003", name: "旺旺雪饼68g", spec: "68g×30", slot: "B-01-04", shouldQty: 36, prodDate: "2024-05-28", reason: "临期" },
      { sku: "SKU-S0007", name: "三只松鼠坚果35g", spec: "35g×20", slot: "C-02-01", shouldQty: 32, prodDate: "2024-07-02", reason: "临期" },
    ],
  },
  {
    id: "XJ20240902002", deviceSn: "DEV-20240102", pointName: "南山区商务中心B栋", status: "执行中", reason: "破损", source: "手动创建",
    relatedRestockNo: "RO20240902002", creator: "王芳", createdAt: "2024-09-02 14:05", completedAt: "—",
    inbound: { no: "—", warehouse: "—", status: "—", time: "—", qty: 0 },
    items: [
      { sku: "SKU-S0002", name: "可口可乐330ml", spec: "330ml×24", slot: "A-01-03", shouldQty: 12, prodDate: "2024-08-10", reason: "破损" },
      { sku: "SKU-S0005", name: "卫龙辣条40g", spec: "40g×20", slot: "D-02-02", shouldQty: 8, prodDate: "2024-08-18", reason: "破损" },
    ],
  },
  {
    id: "XJ20240901003", deviceSn: "DEV-20240103", pointName: "广州天河CBD写字楼", status: "待执行", reason: "滞销", source: "手动创建",
    relatedRestockNo: "RO20240901003", creator: "陈静", createdAt: "2024-09-01 10:40", completedAt: "—",
    inbound: { no: "—", warehouse: "—", status: "—", time: "—", qty: 0 },
    items: [
      { sku: "SKU-S0007", name: "三只松鼠坚果35g", spec: "35g×20", slot: "C-01-05", shouldQty: 20, prodDate: "2024-07-15", reason: "滞销" },
    ],
  },
  {
    id: "XJ20240831004", deviceSn: "DEV-20240104", pointName: "上海陆家嘴金融中心", status: "已完成", reason: "质量问题", source: "手动创建",
    relatedRestockNo: "RO20240831004", creator: "李明", createdAt: "2024-08-31 16:22", completedAt: "2024-09-01 09:05",
    inbound: { no: "IB-20240831-011", warehouse: "华东配送仓", status: "已完成", time: "2024-09-01 08:30", qty: 48 },
    items: [
      { sku: "SKU-S0006", name: "伊利纯牛奶250ml", spec: "250ml×24", slot: "A-02-01", shouldQty: 24, prodDate: "2024-06-20", reason: "质量问题" },
      { sku: "SKU-S0004", name: "元气森林气泡水", spec: "480ml×15", slot: "A-04-02", shouldQty: 24, prodDate: "2024-06-25", reason: "质量问题" },
    ],
  },
  {
    id: "XJ20240830005", deviceSn: "DEV-20240105", pointName: "北京中关村软件园", status: "已取消", reason: "其他", source: "手动创建",
    relatedRestockNo: "RO20240830005", creator: "赵磊", createdAt: "2024-08-30 11:15", completedAt: "—",
    inbound: { no: "—", warehouse: "—", status: "—", time: "—", qty: 0 },
    items: [
      { sku: "SKU-S0001", name: "农夫山泉550ml", spec: "550ml×24", slot: "A-01-01", shouldQty: 18, prodDate: "2024-08-01", reason: "其他" },
    ],
  },
  {
    id: "XJ20240829006", deviceSn: "DEV-20240106", pointName: "成都高新区天府大道", status: "已完成", reason: "临期", source: "手动创建",
    relatedRestockNo: "RO20240829006", creator: "刘洋", createdAt: "2024-08-29 09:30", completedAt: "2024-08-29 15:40",
    inbound: { no: "IB-20240829-007", warehouse: "西南仓", status: "已完成", time: "2024-08-29 14:10", qty: 36 },
    items: [
      { sku: "SKU-S0006", name: "伊利纯牛奶250ml", spec: "250ml×24", slot: "B-03-02", shouldQty: 36, prodDate: "2024-05-30", reason: "临期" },
    ],
  },
];

const inboundColor = (s: string): PillColor => {
  if (s === "已完成") return "green";
  if (s === "入库中") return "blue";
  if (s === "待入库") return "orange";
  if (s === "异常") return "red";
  return "gray";
};
// 下架状态色彩（本期仅详情展示，列表不展示）
const execColor = (s: string): PillColor => {
  if (s === "已完成") return "green";
  if (s === "执行中") return "blue";
  if (s === "待执行") return "orange";
  return "gray";
};

// ═══════════════════════════════════════════════════════════════════════════════
// 1. DelistOrderList
// ═══════════════════════════════════════════════════════════════════════════════
function DelistOrderList({ onDetail, onRestock, onInbound }: { onDetail: (no: string) => void; onRestock: () => void; onInbound: () => void }) {
  const [delistNo, setDelistNo] = useState("");
  const [deviceOrPoint, setDeviceOrPoint] = useState("");
  const [reasonF, setReasonF] = useState("全部");
  const [sourceF, setSourceF] = useState("全部");
  const [restockNo, setRestockNo] = useState("");
  const [createFrom, setCreateFrom] = useState("");
  const [createTo, setCreateTo] = useState("");
  const [page, setPage] = useState(1);

  const resetFilters = () => {
    setDelistNo(""); setDeviceOrPoint(""); setReasonF("全部"); setSourceF("全部");
    setRestockNo(""); setCreateFrom(""); setCreateTo("");
  };

  const linkCls = "text-[#2563EB] font-mono text-xs hover:underline";

  return (
    <div className="p-6 bg-[#F5F7FA] min-h-screen">
      <PageHeader title="下架单列表">
        <Btn v="secondary" icon={I.download}>导出</Btn>
      </PageHeader>
      <FilterBar>
        <div className="flex flex-wrap gap-x-3 gap-y-3 items-start">
          <FField label="下架单号"><Inp value={delistNo} onChange={setDelistNo} placeholder="请输入下架单号" className="w-36" /></FField>
          <FField label="设备SN/点位"><Inp value={deviceOrPoint} onChange={setDeviceOrPoint} placeholder="请输入设备SN或点位" className="w-44" /></FField>
          <FField label="下架原因">
            <Sel value={reasonF} onChange={setReasonF} className="w-28">{["全部", ...DELIST_REASONS].map(v => <option key={v}>{v}</option>)}</Sel>
          </FField>
          <FField label="创建来源">
            <Sel value={sourceF} onChange={setSourceF} className="w-28">{["全部", ...DELIST_SOURCES].map(v => <option key={v}>{v}</option>)}</Sel>
          </FField>
          <FField label="关联补货单号"><Inp value={restockNo} onChange={setRestockNo} placeholder="请输入补货单号" className="w-36" /></FField>
          <FField label="创建时间">
            <div className="flex items-center gap-1">
              <input type="date" value={createFrom} onChange={e => setCreateFrom(e.target.value)} className="h-9 border border-[#E2E8F0] rounded-md text-sm px-2 bg-white" />
              <span className="text-[#94A3B8]">—</span>
              <input type="date" value={createTo} onChange={e => setCreateTo(e.target.value)} className="h-9 border border-[#E2E8F0] rounded-md text-sm px-2 bg-white" />
            </div>
          </FField>
          <div className="flex gap-2 self-end">
            <Btn v="primary" icon={I.search}>查询</Btn>
            <Btn v="secondary" onClick={resetFilters}>重置</Btn>
          </div>
        </div>
      </FilterBar>
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1560px]">
            <THead cols={["下架单号", "设备SN/点位名称", "下架SKU数/件数", "下架原因", "创建来源", "关联补货单号", "关联入库单号", "执行人", "创建时间", "完成时间", "操作"]} />
            <tbody>
              {DELIST_LIST.map(r => {
                const skuCount = r.items.length;
                const totalQty = r.items.reduce((a, i) => a + i.shouldQty, 0);
                return (
                  <TR key={r.id} onClick={() => onDetail(r.id)}>
                    <TD><span className="text-[#2563EB] font-mono text-xs">{r.id}</span></TD>
                    <TD>
                      <div className="font-medium text-[#0F172A]">{r.pointName}</div>
                      <div className="font-mono text-xs text-[#94A3B8]">{r.deviceSn}</div>
                    </TD>
                    <TD>{skuCount} 种 / {totalQty} 件</TD>
                    <TD>{r.reason}</TD>
                    <TD>{r.source}</TD>
                    <TD>
                      <button onClick={e => { e.stopPropagation(); onRestock(); }} className={linkCls}>{r.relatedRestockNo}</button>
                    </TD>
                    <TD>
                      {r.inbound.no === "—"
                        ? <span className="text-[#CBD5E1]">—</span>
                        : <button onClick={e => { e.stopPropagation(); onInbound(); }} className={linkCls}>{r.inbound.no}</button>}
                    </TD>
                    <TD>{r.creator}</TD>
                    <TD>{r.createdAt}</TD>
                    <TD>{r.completedAt}</TD>
                    <TD>
                      <Btn v="ghost" onClick={e => { e.stopPropagation(); onDetail(r.id); }} className="text-xs px-2 h-7">详情</Btn>
                    </TD>
                  </TR>
                );
              })}
            </tbody>
          </table>
        </div>
        <Pagination page={page} total={DELIST_LIST.length} onChange={setPage} />
      </Card>
      <div className="mt-2 flex items-start gap-1 text-xs text-[#94A3B8]">
        <Icon d={I.info} size={12} className="mt-0.5 shrink-0" />
        <span>点击行或「详情」进入下架单详情；下架执行状态仅详情展示，列表不展示。</span>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 2. DelistOrderDetail
// ═══════════════════════════════════════════════════════════════════════════════
function DelistOrderDetail({ orderNo, onBack }: { orderNo: string; onBack: () => void }) {
  const order = DELIST_LIST.find(o => o.id === orderNo) ?? DELIST_LIST[0];
  const skuCount = order.items.length;
  const totalQty = order.items.reduce((a, i) => a + i.shouldQty, 0);
  const summary = [
    { label: "下架SKU数", value: `${skuCount}`, unit: "种" },
    { label: "应下架总件数", value: `${totalQty}`, unit: "件" },
  ];

  return (
    <div className="p-6 bg-[#F5F7FA] min-h-screen">
      <PageHeader title="下架单详情">
        <Btn v="secondary" onClick={onBack} icon={I.chevL}>返回</Btn>
      </PageHeader>
      <Card className="mb-4 p-4 space-y-5">
        <div>
          <SectionLabel>基础信息</SectionLabel>
          <div className="grid grid-cols-5 gap-x-4 gap-y-4">
            <Field label="下架单号" value={<span className="font-mono text-xs">{order.id}</span>} />
            <Field label="设备SN" value={<span className="font-mono text-xs">{order.deviceSn}</span>} />
            <Field label="点位名称" value={order.pointName} />
            <Field label="下架状态" value={<StatusPill label={order.status} color={execColor(order.status)} />} />
            <Field label="下架原因" value={order.reason} />
            <Field label="创建来源" value={order.source} />
            <Field label="关联补货单号" value={<span className="font-mono text-xs">{order.relatedRestockNo}</span>} />
            <Field label="创建人" value={order.creator} />
            <Field label="创建时间" value={order.createdAt} />
            <Field label="完成时间" value={order.completedAt} />
          </div>
        </div>
        <div className="border-t border-[#F1F5F9] pt-4">
          <SectionLabel>下架汇总</SectionLabel>
          <div className="grid grid-cols-5 gap-3">
            {summary.map(s => (
              <div key={s.label} className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2.5">
                <div className="text-xs text-[#94A3B8] mb-1">{s.label}</div>
                <div className="text-lg font-bold text-[#0F172A]">{s.value}<span className="text-xs font-normal text-[#94A3B8] ml-1">{s.unit}</span></div>
              </div>
            ))}
          </div>
        </div>
      </Card>
      <Card className="mb-4">
        <div className="flex items-center justify-between p-4 border-b border-[#E2E8F0]">
          <span className="font-semibold text-sm text-[#0F172A]">下架明细</span>
          <Btn v="secondary" icon={I.download}>导出下架明细</Btn>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <THead cols={["SKU编码", "商品名称", "规格", "货道号", "应下架数量", "生产日期", "下架原因"]} />
            <tbody>
              {order.items.map(i => (
                <TR key={i.sku}>
                  <TD><span className="font-mono text-xs text-[#64748B]">{i.sku}</span></TD>
                  <TD><span className="font-medium text-[#0F172A]">{i.name}</span></TD>
                  <TD>{i.spec}</TD>
                  <TD>{i.slot}</TD>
                  <TD>{i.shouldQty}</TD>
                  <TD>{i.prodDate}</TD>
                  <TD>{i.reason}</TD>
                </TR>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 flex items-start gap-1 text-xs text-[#94A3B8] border-t border-[#F1F5F9]">
          <Icon d={I.info} size={12} className="mt-0.5 shrink-0" />
          <span>实下架数量、差异数量、批次号、临期天数为二期字段；临期标黄/过期标红规则本期不做。</span>
        </div>
      </Card>
      <Card className="p-4">
        <SectionLabel>入库信息</SectionLabel>
        <div className="grid grid-cols-5 gap-x-4 gap-y-4">
          <Field label="关联入库单号" value={order.inbound.no === "—" ? <span className="text-[#CBD5E1]">—</span> : <span className="font-mono text-xs">{order.inbound.no}</span>} />
          <Field label="入库仓库" value={order.inbound.warehouse} />
          <Field label="入库状态" value={order.inbound.status === "—" ? <span className="text-[#CBD5E1]">—</span> : <StatusPill label={order.inbound.status} color={inboundColor(order.inbound.status)} />} />
          <Field label="入库时间" value={order.inbound.time} />
          <Field label="入库件数" value={order.inbound.qty > 0 ? `${order.inbound.qty} 件` : <span className="text-[#CBD5E1]">—</span>} />
        </div>
      </Card>
    </div>
  );
}

// ─── Exports ─────────────────────────────────────────────────────────────────
export { DelistOrderList, DelistOrderDetail };
