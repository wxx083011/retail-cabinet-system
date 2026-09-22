import { useState, ReactNode } from "react";

// ─── Local Design Tokens ───────────────────────────────────────────────────────
const C = {
  primary: "#2563EB",
  bg: "#F5F7FA",
  border: "#E2E8F0",
  text: "#0F172A",
  muted: "#64748B",
  subtle: "#94A3B8",
  cardBg: "#FFFFFF",
};

// ─── Icon ─────────────────────────────────────────────────────────────────────
const Icon = ({ d, size = 16, className = "" }: { d: string; size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d={d} />
  </svg>
);

const IC = {
  plus: "M12 5v14M5 12h14",
  search: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0",
  reset: "M23 4v6h-6 M1 20v-6h6 M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15",
  chevDown: "M6 9l6 6 6-6",
  edit: "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7 M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",
  stop: "M18 6L6 18M6 6l12 12",
  play: "M5 3l14 9-14 9V3z",
  info: "M12 22a10 10 0 100-20 10 10 0 000 20z M12 8v4 M12 16h.01",
  alert: "M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z M12 9v4 M12 17h.01",
  check: "M20 6L9 17l-5-5",
  download: "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4 M7 10l5 5 5-5 M12 15V3",
  upload: "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4 M17 8l-5-5-5 5 M12 3v12",
  x: "M18 6L6 18M6 6l12 12",
  clock: "M12 22a10 10 0 100-20 10 10 0 000 20z M12 6v6l4 2",
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  rules: "M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z M12 12l8-4.5 M12 12v9 M12 12L4 7.5",
  file: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
};

// ─── Primitives ───────────────────────────────────────────────────────────────
const Btn = ({
  children, variant = "primary", size = "md", icon, onClick, disabled = false, className = "",
}: {
  children?: ReactNode; variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md"; icon?: keyof typeof IC; onClick?: () => void; disabled?: boolean; className?: string;
}) => {
  const base = "inline-flex items-center gap-1.5 font-medium transition-all cursor-pointer select-none border";
  const sz = { sm: "px-3 py-1.5 text-xs rounded-md", md: "px-4 py-2 text-sm rounded-md" };
  const vr = {
    primary: "bg-[#2563EB] text-white border-[#2563EB] hover:bg-[#1D4ED8] shadow-sm",
    secondary: "bg-white text-[#334155] border-[#E2E8F0] hover:bg-[#F8FAFC] hover:border-[#CBD5E1]",
    ghost: "bg-transparent text-[#64748B] border-transparent hover:bg-[#F1F5F9] hover:text-[#334155]",
    danger: "bg-[#DC2626] text-white border-[#DC2626] hover:bg-[#B91C1C]",
  };
  return (
    <button onClick={onClick} disabled={disabled} className={`${base} ${sz[size]} ${vr[variant]} ${disabled ? "opacity-40 cursor-not-allowed" : ""} ${className}`}>
      {icon && <Icon d={IC[icon]} size={13} />}
      {children}
    </button>
  );
};

const Inp = ({ placeholder, value, onChange, className = "", type = "text" }: {
  placeholder?: string; value?: string; onChange?: (v: string) => void; className?: string; type?: string;
}) => (
  <input
    type={type}
    value={value}
    onChange={e => onChange?.(e.target.value)}
    placeholder={placeholder}
    className={`h-9 border border-[#E2E8F0] rounded-md text-sm text-[#0F172A] placeholder-[#94A3B8] bg-white px-3 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#DBEAFE] transition-all ${className}`}
  />
);

const Sel = ({ options, value, onChange, className = "" }: {
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
      <Icon d={IC.chevDown} size={13} />
    </span>
  </div>
);

const Card = ({ children, className = "", noPad = false }: { children: ReactNode; className?: string; noPad?: boolean }) => (
  <div className={`bg-white border border-[#E2E8F0] rounded-xl shadow-sm ${noPad ? "" : "p-5"} ${className}`}>
    {children}
  </div>
);

const Modal = ({ title, onClose, children, width = "max-w-xl" }: {
  title: string; onClose: () => void; children: ReactNode; width?: string;
}) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
    <div className={`bg-white rounded-xl shadow-2xl w-full ${width} max-h-[90vh] flex flex-col`}>
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2E8F0]">
        <span className="text-base font-semibold text-[#0F172A]">{title}</span>
        <button onClick={onClose} className="text-[#94A3B8] hover:text-[#334155] transition-colors">
          <Icon d={IC.x} size={18} />
        </button>
      </div>
      <div className="overflow-y-auto flex-1 px-6 py-5">{children}</div>
    </div>
  </div>
);

const ConfirmModal = ({ msg, onConfirm, onCancel }: { msg: string; onConfirm: () => void; onCancel: () => void }) => (
  <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm">
    <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6">
      <div className="flex items-start gap-3 mb-5">
        <div className="w-9 h-9 rounded-full bg-[#FFFBEB] flex items-center justify-center flex-shrink-0">
          <Icon d={IC.alert} size={18} className="text-[#D97706]" />
        </div>
        <div>
          <div className="text-sm font-semibold text-[#0F172A] mb-1">操作确认</div>
          <div className="text-sm text-[#64748B] leading-relaxed">{msg}</div>
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Btn variant="secondary" onClick={onCancel}>取消</Btn>
        <Btn variant="primary" onClick={onConfirm}>确认覆盖</Btn>
      </div>
    </div>
  </div>
);

const Badge = ({ label, color }: { label: string; color: "blue" | "green" | "yellow" | "red" | "gray" | "orange" | "purple" }) => {
  const m = {
    blue: "bg-[#EFF6FF] text-[#2563EB] border-[#BFDBFE]",
    green: "bg-[#F0FDF4] text-[#16A34A] border-[#BBF7D0]",
    yellow: "bg-[#FFFBEB] text-[#D97706] border-[#FDE68A]",
    red: "bg-[#FEF2F2] text-[#DC2626] border-[#FECACA]",
    gray: "bg-[#F8FAFC] text-[#64748B] border-[#E2E8F0]",
    orange: "bg-[#FFF7ED] text-[#EA580C] border-[#FED7AA]",
    purple: "bg-[#F5F3FF] text-[#7C3AED] border-[#DDD6FE]",
  };
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${m[color]}`}>{label}</span>;
};

const InfoBar = ({ children, type = "info" }: { children: ReactNode; type?: "info" | "warn" }) => (
  <div className={`flex items-start gap-2.5 px-4 py-3 rounded-lg border text-sm mb-4 ${
    type === "warn"
      ? "bg-[#FFFBEB] border-[#FDE68A] text-[#92400E]"
      : "bg-[#EFF6FF] border-[#BFDBFE] text-[#1E40AF]"
  }`}>
    <Icon d={type === "warn" ? IC.alert : IC.info} size={15} className="flex-shrink-0 mt-0.5" />
    <div className="leading-relaxed">{children}</div>
  </div>
);

const FormRow = ({ label, required, children, hint }: { label: string; required?: boolean; children: ReactNode; hint?: string }) => (
  <div className="flex items-start gap-4">
    <label className="w-32 text-sm text-[#334155] pt-2 text-right flex-shrink-0">
      {required && <span className="text-[#DC2626] mr-0.5">*</span>}
      {label}
    </label>
    <div className="flex-1">
      {children}
      {hint && <div className="text-xs text-[#94A3B8] mt-1">{hint}</div>}
    </div>
  </div>
);

const CheckboxGroup = ({ options, selected, onChange }: {
  options: string[]; selected: string[]; onChange: (v: string[]) => void;
}) => (
  <div className="flex flex-wrap gap-2">
    {options.map(o => {
      const active = selected.includes(o);
      return (
        <button
          key={o}
          type="button"
          onClick={() => onChange(active ? selected.filter(x => x !== o) : [...selected, o])}
          className={`px-3 py-1.5 text-xs rounded-md border font-medium transition-all ${
            active ? "bg-[#2563EB] text-white border-[#2563EB]" : "bg-white text-[#64748B] border-[#E2E8F0] hover:border-[#2563EB] hover:text-[#2563EB]"
          }`}
        >{o}</button>
      );
    })}
  </div>
);

// ─── Search Bar ───────────────────────────────────────────────────────────────
const SearchBar = ({ fields, onSearch, onReset }: {
  fields: ReactNode;
  onSearch: () => void;
  onReset: () => void;
}) => (
  <Card className="mb-4" noPad>
    <div className="px-4 py-3 border-b border-[#F1F5F9] flex items-center gap-2">
      <Icon d={IC.search} size={14} className="text-[#94A3B8]" />
      <span className="text-sm font-medium text-[#334155]">筛选条件</span>
    </div>
    <div className="px-4 py-3">
      {fields}
      <div className="flex justify-end gap-2 mt-3">
        <Btn variant="secondary" size="sm" icon="reset" onClick={onReset}>重置</Btn>
        <Btn variant="primary" size="sm" icon="search" onClick={onSearch}>搜索</Btn>
      </div>
    </div>
  </Card>
);

// ─── Table skeleton ───────────────────────────────────────────────────────────
const Tbl = ({ cols, rows }: {
  cols: { label: string; key: string; width?: string; render?: (row: any) => ReactNode }[];
  rows: any[];
}) => (
  <div className="overflow-x-auto">
    <table className="w-full border-collapse text-sm">
      <thead>
        <tr className="bg-[#F8FAFC]">
          {cols.map(c => (
            <th key={c.key} className={`px-4 py-3 text-left text-xs font-semibold text-[#64748B] border-b border-[#E2E8F0] whitespace-nowrap ${c.width ?? ""}`}>
              {c.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className="border-b border-[#F1F5F9] hover:bg-[#F8FAFC] transition-colors">
            {cols.map(c => (
              <td key={c.key} className="px-4 py-3 text-[#334155] align-middle">
                {c.render ? c.render(row) : row[c.key]}
              </td>
            ))}
          </tr>
        ))}
        {rows.length === 0 && (
          <tr>
            <td colSpan={cols.length} className="py-10 text-center text-sm text-[#94A3B8]">暂无数据</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

// ─── DATA ─────────────────────────────────────────────────────────────────────
type AutoRule = {
  id: string;
  code: string;
  scopeType: "仓库" | "点位零售柜";
  targets: string[];
  weeks: string[];
  orderTime: string;
  pushTime: string;
  threshold: number;
  enabled: boolean;
};

const INIT_AUTO_RULES: AutoRule[] = [
  { id: "1", code: "AR-2026-001", scopeType: "仓库", targets: ["深圳中心仓"], weeks: ["周一", "周三", "周五"], orderTime: "07:00", pushTime: "08:30", threshold: 20, enabled: true },
  { id: "2", code: "AR-2026-002", scopeType: "仓库", targets: ["广州南沙仓"], weeks: ["周二", "周四"], orderTime: "08:00", pushTime: "09:30", threshold: 15, enabled: true },
  { id: "3", code: "AR-2026-003", scopeType: "点位零售柜", targets: ["深圳科技园 A 区-001", "深圳科技园 B 区-002", "深圳科技园 C 区-003"], weeks: ["周一", "周二", "周三", "周四", "周五"], orderTime: "06:30", pushTime: "08:00", threshold: 10, enabled: true },
  { id: "4", code: "AR-2026-004", scopeType: "点位零售柜", targets: ["广州天河城-001"], weeks: ["周六", "周日"], orderTime: "09:00", pushTime: "10:30", threshold: 25, enabled: false },
  { id: "5", code: "AR-2026-005", scopeType: "仓库", targets: ["北京顺义仓"], weeks: ["周一", "周三", "周五", "周日"], orderTime: "07:30", pushTime: "09:00", threshold: 30, enabled: false },
];

type PauseRule = {
  id: string;
  code: string;
  scopeType: "仓库" | "点位零售柜";
  targets: string[];
  pauseStart: string;
  pauseEnd: string;
  status: "待执行" | "执行中" | "已执行完成";
};

const INIT_PAUSE_RULES: PauseRule[] = [
  { id: "1", code: "PR-2026-001", scopeType: "仓库", targets: ["深圳中心仓"], pauseStart: "2026-10-01", pauseEnd: "2026-10-07", status: "待执行" },
  { id: "2", code: "PR-2026-002", scopeType: "点位零售柜", targets: ["广州天河城-001", "广州正佳广场-002"], pauseStart: "2026-09-10", pauseEnd: "2026-09-20", status: "执行中" },
  { id: "3", code: "PR-2026-003", scopeType: "仓库", targets: ["北京顺义仓"], pauseStart: "2026-08-01", pauseEnd: "2026-08-10", status: "已执行完成" },
];

// ─── Warehouse Rule Form ───────────────────────────────────────────────────────
const WEEKS = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
const WAREHOUSES = ["深圳中心仓", "广州南沙仓", "北京顺义仓", "上海浦东仓", "成都天府仓"];
const LOCATIONS = ["深圳科技园 A 区-001", "深圳科技园 B 区-002", "广州天河城-001", "广州正佳广场-002", "北京国贸-001"];

const WR_DAYS = ["周一","周二","周三","周四","周五","周六","周日"] as const;

type WRDay = { enabled: boolean; orderTime: string; pushTime: string; threshold: string };
type WarehouseRuleRow = { id: string; warehouse: string; days: WRDay[] };

const makeWRDays = (): WRDay[] =>
  WR_DAYS.map(() => ({ enabled: false, orderTime: "09:00", pushTime: "10:00", threshold: "" }));

const WarehouseRuleForm = ({ onClose, onSubmit }: { onClose: () => void; onSubmit: () => void }) => {
  const [rows, setRows] = useState<WarehouseRuleRow[]>([
    { id: "1", warehouse: "", days: makeWRDays() },
  ]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirm, setConfirm] = useState(false);

  const updateWarehouse = (id: string, val: string) =>
    setRows(rs => rs.map(r => r.id === id ? { ...r, warehouse: val } : r));

  const patchDay = (id: string, di: number, patch: Partial<WRDay>) =>
    setRows(rs => rs.map(r => r.id === id
      ? { ...r, days: r.days.map((d, i) => i === di ? { ...d, ...patch } : d) }
      : r));

  const applyUnified = (id: string, patch: Partial<Omit<WRDay, "enabled">>) =>
    setRows(rs => rs.map(r => r.id === id
      ? { ...r, days: r.days.map(d => ({ ...d, ...patch })) }
      : r));

  const addRow = () =>
    setRows(rs => [...rs, { id: Date.now().toString(), warehouse: "", days: makeWRDays() }]);

  const removeRow = (id: string) =>
    setRows(rs => rs.filter(r => r.id !== id));

  const validate = () => {
    const e: Record<string, string> = {};
    rows.forEach((r, i) => {
      if (!r.warehouse) e[`${i}-warehouse`] = "请选择仓库";
      if (!r.days.some(d => d.enabled)) e[`${i}-days`] = "请至少选择一天";
    });
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setConfirm(true);
  };

  const timeCls = "h-7 border border-[#D1D5DB] rounded px-2 text-xs text-[#0F172A] bg-white focus:outline-none focus:border-[#2563EB] w-[88px]";
  const numCls  = "h-7 border border-[#D1D5DB] rounded px-2 text-xs text-[#0F172A] bg-white focus:outline-none focus:border-[#2563EB] w-16 text-center";

  return (
    <>
      <InfoBar>
        <div className="space-y-1">
          <div><strong>触发逻辑：</strong>当总缺货量 ≥ 阈值，且仓库可用库存 ≥ 阈值时，触发自动补货单生成，并冻结对应库存。</div>
          <div className="text-xs text-[#3B82F6] mt-1 opacity-80">〔预测补货·预测天数·预测系数〕— 一期暂不开放</div>
        </div>
      </InfoBar>

      <div className="space-y-5">
        {rows.map((row, idx) => (
          <div key={row.id} className="border border-[#E2E8F0] rounded-xl bg-white overflow-hidden">
            {/* Card header */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#F8FAFC] border-b border-[#E2E8F0]">
              <span className="text-xs font-semibold text-[#64748B]">规则 #{idx + 1}</span>
              {rows.length > 1 && (
                <button onClick={() => removeRow(row.id)} className="text-xs text-[#DC2626] hover:underline">删除</button>
              )}
            </div>

            <div className="px-5 py-4 space-y-4">
              {/* Warehouse selector */}
              <div className="flex items-center gap-3">
                <label className="text-sm text-[#374151] whitespace-nowrap">
                  <span className="text-[#DC2626] mr-0.5">*</span>仓库名称
                </label>
                <Sel
                  value={row.warehouse}
                  onChange={v => updateWarehouse(row.id, v)}
                  className="w-72"
                  options={[{ label: "请选择仓库", value: "" }, ...WAREHOUSES.map(w => ({ label: w, value: w }))]}
                />
              </div>
              {errors[`${idx}-warehouse`] && <p className="text-xs text-[#DC2626] -mt-2">{errors[`${idx}-warehouse`]}</p>}

              {/* Day table */}
              <div className="border border-[#E2E8F0] rounded-lg overflow-hidden text-sm">
                {/* Table header */}
                <div className="grid bg-[#F8FAFC] border-b border-[#E2E8F0] text-xs font-medium text-[#6B7280]"
                  style={{ gridTemplateColumns: "80px 80px 1fr 1fr 1fr" }}>
                  <div className="px-3 py-2.5">周规则</div>
                  <div className="px-3 py-2.5">统一配置</div>
                  <div className="px-3 py-2.5">出单时间</div>
                  <div className="px-3 py-2.5">推送履约时间</div>
                  <div className="px-3 py-2.5">缺货自动补货阈值</div>
                </div>

                {/* Unified config row */}
                <div className="grid items-center border-b border-[#E2E8F0] bg-[#FFFBEB]"
                  style={{ gridTemplateColumns: "80px 80px 1fr 1fr 1fr" }}>
                  <div className="px-3 py-2 text-xs font-semibold text-[#92400E]" />
                  <div className="px-3 py-2 text-xs font-semibold text-[#92400E]">统一配置</div>
                  <div className="px-3 py-2">
                    <input type="time" onChange={e => applyUnified(row.id, { orderTime: e.target.value })}
                      className={timeCls} />
                  </div>
                  <div className="px-3 py-2">
                    <input type="time" onChange={e => applyUnified(row.id, { pushTime: e.target.value })}
                      className={timeCls} />
                  </div>
                  <div className="px-3 py-2 flex items-center gap-1">
                    <input type="number" min={1} placeholder="—"
                      onChange={e => applyUnified(row.id, { threshold: e.target.value })}
                      className={numCls} />
                  </div>
                </div>

                {/* Per-day rows */}
                {WR_DAYS.map((day, di) => {
                  const d = row.days[di];
                  return (
                    <div key={day}
                      className={`grid items-center border-b border-[#F1F5F9] last:border-0 transition-colors ${d.enabled ? "bg-white" : "bg-[#F9FAFB]"}`}
                      style={{ gridTemplateColumns: "80px 80px 1fr 1fr 1fr" }}>
                      <div className="px-3 py-2.5 flex items-center gap-2 col-span-2">
                        <input type="checkbox" checked={d.enabled}
                          onChange={e => patchDay(row.id, di, { enabled: e.target.checked })}
                          className="w-3.5 h-3.5 accent-[#2563EB] cursor-pointer" />
                        <span className={`text-sm font-medium ${d.enabled ? "text-[#0F172A]" : "text-[#9CA3AF]"}`}>{day}</span>
                      </div>
                      <div className={`px-3 py-2.5 transition-opacity ${d.enabled ? "" : "opacity-30 pointer-events-none"}`}>
                        <input type="time" value={d.orderTime}
                          onChange={e => patchDay(row.id, di, { orderTime: e.target.value })}
                          className={timeCls} />
                      </div>
                      <div className={`px-3 py-2.5 transition-opacity ${d.enabled ? "" : "opacity-30 pointer-events-none"}`}>
                        <input type="time" value={d.pushTime}
                          onChange={e => patchDay(row.id, di, { pushTime: e.target.value })}
                          className={timeCls} />
                      </div>
                      <div className={`px-3 py-2.5 flex items-center gap-1 transition-opacity ${d.enabled ? "" : "opacity-30 pointer-events-none"}`}>
                        <input type="number" min={1} value={d.threshold}
                          onChange={e => patchDay(row.id, di, { threshold: e.target.value })}
                          className={numCls} />
                      </div>
                    </div>
                  );
                })}
              </div>
              {errors[`${idx}-days`] && <p className="text-xs text-[#DC2626]">{errors[`${idx}-days`]}</p>}
            </div>
          </div>
        ))}

        <button
          onClick={addRow}
          className="w-full py-2.5 border border-dashed border-[#BFDBFE] rounded-xl text-sm text-[#2563EB] hover:bg-[#EFF6FF] transition-colors flex items-center justify-center gap-1.5"
        >
          <Icon d={IC.plus} size={14} />
          继续追加规则
        </button>
      </div>

      <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-[#E2E8F0]">
        <Btn variant="secondary" onClick={onClose}>取消</Btn>
        <Btn variant="primary" onClick={handleSubmit}>提交</Btn>
      </div>

      {confirm && (
        <ConfirmModal
          msg="该仓库目前已有启用的规则，是否直接覆盖原规则？"
          onConfirm={() => { setConfirm(false); onSubmit(); }}
          onCancel={() => setConfirm(false)}
        />
      )}
    </>
  );
};

// ─── Location Rule Form ────────────────────────────────────────────────────────
type LocationRuleRow = { id: string; location: string; days: WRDay[] };

const LocationRuleForm = ({ onClose, onSubmit }: { onClose: () => void; onSubmit: () => void }) => {
  const [rows, setRows] = useState<LocationRuleRow[]>([
    { id: "1", location: "", days: makeWRDays() },
  ]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirm, setConfirm] = useState(false);
  const [importStep, setImportStep] = useState(false);

  const updateLocation = (id: string, val: string) =>
    setRows(rs => rs.map(r => r.id === id ? { ...r, location: val } : r));

  const patchDay = (id: string, di: number, patch: Partial<WRDay>) =>
    setRows(rs => rs.map(r => r.id === id
      ? { ...r, days: r.days.map((d, i) => i === di ? { ...d, ...patch } : d) }
      : r));

  const applyUnified = (id: string, patch: Partial<Omit<WRDay, "enabled">>) =>
    setRows(rs => rs.map(r => r.id === id
      ? { ...r, days: r.days.map(d => ({ ...d, ...patch })) }
      : r));

  const addRow = () =>
    setRows(rs => [...rs, { id: Date.now().toString(), location: "", days: makeWRDays() }]);

  const removeRow = (id: string) =>
    setRows(rs => rs.filter(r => r.id !== id));

  const validate = () => {
    const e: Record<string, string> = {};
    rows.forEach((r, i) => {
      if (!r.location) e[`${i}-location`] = "请选择点位";
      if (!r.days.some(d => d.enabled)) e[`${i}-days`] = "请至少选择一天";
    });
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const timeCls = "h-7 border border-[#D1D5DB] rounded px-2 text-xs text-[#0F172A] bg-white focus:outline-none focus:border-[#2563EB] w-[88px]";
  const numCls  = "h-7 border border-[#D1D5DB] rounded px-2 text-xs text-[#0F172A] bg-white focus:outline-none focus:border-[#2563EB] w-16 text-center";

  return (
    <>
      <div className="flex items-center gap-2 mb-4 px-3 py-2 rounded-lg bg-[#EFF6FF] border border-[#BFDBFE]">
        <Icon d={IC.star} size={14} className="text-[#2563EB]" />
        <span className="text-xs text-[#1E40AF] font-medium">点位维度规则优先级高于仓库维度规则，同时命中时以点位规则为准。</span>
      </div>


      <div className="space-y-5">
        {rows.map((row, idx) => (
          <div key={row.id} className="border border-[#E2E8F0] rounded-xl bg-white overflow-hidden">
            {/* Card header */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#F8FAFC] border-b border-[#E2E8F0]">
              <span className="text-xs font-semibold text-[#64748B]">规则 #{idx + 1}</span>
              {rows.length > 1 && (
                <button onClick={() => removeRow(row.id)} className="text-xs text-[#DC2626] hover:underline">删除</button>
              )}
            </div>

            <div className="px-5 py-4 space-y-4">
              {/* Location selector */}
              <div className="flex items-center gap-3">
                <label className="text-sm text-[#374151] whitespace-nowrap">
                  <span className="text-[#DC2626] mr-0.5">*</span>点位名称
                </label>
                <Sel
                  value={row.location}
                  onChange={v => updateLocation(row.id, v)}
                  className="w-72"
                  options={[{ label: "请选择点位", value: "" }, ...LOCATIONS.map(l => ({ label: l, value: l }))]}
                />
              </div>
              {errors[`${idx}-location`] && <p className="text-xs text-[#DC2626] -mt-2">{errors[`${idx}-location`]}</p>}

              {/* Day table */}
              <div className="border border-[#E2E8F0] rounded-lg overflow-hidden text-sm">
                <div className="grid bg-[#F8FAFC] border-b border-[#E2E8F0] text-xs font-medium text-[#6B7280]"
                  style={{ gridTemplateColumns: "80px 80px 1fr 1fr 1fr" }}>
                  <div className="px-3 py-2.5">周规则</div>
                  <div className="px-3 py-2.5">统一配置</div>
                  <div className="px-3 py-2.5">出单时间</div>
                  <div className="px-3 py-2.5">推送履约时间</div>
                  <div className="px-3 py-2.5">缺货自动补货阈值</div>
                </div>

                {/* Unified config row */}
                <div className="grid items-center border-b border-[#E2E8F0] bg-[#FFFBEB]"
                  style={{ gridTemplateColumns: "80px 80px 1fr 1fr 1fr" }}>
                  <div className="px-3 py-2" />
                  <div className="px-3 py-2 text-xs font-semibold text-[#92400E]">统一配置</div>
                  <div className="px-3 py-2">
                    <input type="time" onChange={e => applyUnified(row.id, { orderTime: e.target.value })} className={timeCls} />
                  </div>
                  <div className="px-3 py-2">
                    <input type="time" onChange={e => applyUnified(row.id, { pushTime: e.target.value })} className={timeCls} />
                  </div>
                  <div className="px-3 py-2">
                    <input type="number" min={1} placeholder="—" onChange={e => applyUnified(row.id, { threshold: e.target.value })} className={numCls} />
                  </div>
                </div>

                {/* Per-day rows */}
                {WR_DAYS.map((day, di) => {
                  const d = row.days[di];
                  return (
                    <div key={day}
                      className={`grid items-center border-b border-[#F1F5F9] last:border-0 transition-colors ${d.enabled ? "bg-white" : "bg-[#F9FAFB]"}`}
                      style={{ gridTemplateColumns: "80px 80px 1fr 1fr 1fr" }}>
                      <div className="px-3 py-2.5 flex items-center gap-2 col-span-2">
                        <input type="checkbox" checked={d.enabled}
                          onChange={e => patchDay(row.id, di, { enabled: e.target.checked })}
                          className="w-3.5 h-3.5 accent-[#2563EB] cursor-pointer" />
                        <span className={`text-sm font-medium ${d.enabled ? "text-[#0F172A]" : "text-[#9CA3AF]"}`}>{day}</span>
                      </div>
                      <div className={`px-3 py-2.5 transition-opacity ${d.enabled ? "" : "opacity-30 pointer-events-none"}`}>
                        <input type="time" value={d.orderTime} onChange={e => patchDay(row.id, di, { orderTime: e.target.value })} className={timeCls} />
                      </div>
                      <div className={`px-3 py-2.5 transition-opacity ${d.enabled ? "" : "opacity-30 pointer-events-none"}`}>
                        <input type="time" value={d.pushTime} onChange={e => patchDay(row.id, di, { pushTime: e.target.value })} className={timeCls} />
                      </div>
                      <div className={`px-3 py-2.5 transition-opacity ${d.enabled ? "" : "opacity-30 pointer-events-none"}`}>
                        <input type="number" min={1} value={d.threshold} onChange={e => patchDay(row.id, di, { threshold: e.target.value })} className={numCls} />
                      </div>
                    </div>
                  );
                })}
              </div>
              {errors[`${idx}-days`] && <p className="text-xs text-[#DC2626]">{errors[`${idx}-days`]}</p>}
            </div>
          </div>
        ))}

        <button
          onClick={addRow}
          className="w-full py-2.5 border border-dashed border-[#BFDBFE] rounded-xl text-sm text-[#2563EB] hover:bg-[#EFF6FF] transition-colors flex items-center justify-center gap-1.5"
        >
          <Icon d={IC.plus} size={14} />
          继续追加规则
        </button>
      </div>

      <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-[#E2E8F0]">
        <Btn variant="secondary" onClick={onClose}>取消</Btn>
        <Btn variant="primary" onClick={() => { if (validate()) setConfirm(true); }}>提交</Btn>
      </div>

      {confirm && (
        <ConfirmModal
          msg="点位目前已有启用的规则，是否直接覆盖原规则？"
          onConfirm={() => { setConfirm(false); onSubmit(); }}
          onCancel={() => setConfirm(false)}
        />
      )}
    </>
  );
};

// ─── Config Auto Restock Modal ─────────────────────────────────────────────────
const ConfigAutoModal = ({ onClose }: { onClose: () => void }) => {
  const [subTab, setSubTab] = useState<"warehouse" | "location">("warehouse");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <Modal title="配置自动补货规则" onClose={onClose} width="max-w-2xl">
        <div className="flex flex-col items-center py-8 gap-3">
          <div className="w-14 h-14 rounded-full bg-[#F0FDF4] flex items-center justify-center">
            <Icon d={IC.check} size={24} className="text-[#16A34A]" />
          </div>
          <div className="text-base font-semibold text-[#0F172A]">规则配置成功</div>
          <div className="text-sm text-[#64748B]">规则已保存并即将生效，可在列表中查看详情。</div>
          <Btn variant="primary" onClick={onClose} className="mt-2">返回列表</Btn>
        </div>
      </Modal>
    );
  }

  return (
    <Modal title="配置自动补货规则" onClose={onClose} width="max-w-2xl">
      <div className="flex border-b border-[#E2E8F0] mb-5 -mx-6 px-6">
        {([["warehouse", "仓库维度自动补货规则"], ["location", "点位维度自动补货规则"]] as const).map(([k, label]) => (
          <button
            key={k}
            onClick={() => setSubTab(k)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-all ${subTab === k ? "border-[#2563EB] text-[#2563EB]" : "border-transparent text-[#64748B] hover:text-[#334155]"}`}
          >{label}</button>
        ))}
      </div>
      {subTab === "warehouse"
        ? <WarehouseRuleForm onClose={onClose} onSubmit={() => setSubmitted(true)} />
        : <LocationRuleForm onClose={onClose} onSubmit={() => setSubmitted(true)} />
      }
    </Modal>
  );
};

// ─── Pause Config Modal ────────────────────────────────────────────────────────
const ConfigPauseModal = ({ onClose }: { onClose: () => void }) => {
  const [dim, setDim] = useState<"warehouse" | "location">("warehouse");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  // multi-select warehouse
  const [whSearch, setWhSearch] = useState("");
  const [selWh, setSelWh] = useState<string[]>([]);
  // multi-select location
  const [locSearch, setLocSearch] = useState("");
  const [selLoc, setSelLoc] = useState<string[]>([]);
  const [uploadFile, setUploadFile] = useState<string | null>(null);
  const [reason, setReason] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [conflict, setConflict] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const today = new Date().toISOString().slice(0, 10);

  const toggleWh = (w: string) => setSelWh(s => s.includes(w) ? s.filter(x => x !== w) : [...s, w]);
  const toggleLoc = (l: string) => setSelLoc(s => s.includes(l) ? s.filter(x => x !== l) : [...s, l]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!startDate) e.startDate = "请选择暂停起始日期";
    else if (startDate < today) e.startDate = "起始日期不能早于今天";
    if (!endDate) e.endDate = "请选择暂停结束日期";
    else if (startDate && endDate < startDate) e.endDate = "结束日期不能早于起始日期";
    if (dim === "warehouse" && selWh.length === 0) e.targets = "请至少选择一个暂停仓库";
    if (dim === "location" && selLoc.length === 0) e.targets = "请至少选择一个暂停点位";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setConflict(true);
  };

  const filteredWh = WAREHOUSES.filter(w => w.includes(whSearch));
  const filteredLoc = LOCATIONS.filter(l => l.includes(locSearch));

  if (submitted) {
    return (
      <Modal title="配置暂停自动补货规则" onClose={onClose}>
        <div className="flex flex-col items-center py-8 gap-3">
          <div className="w-14 h-14 rounded-full bg-[#F0FDF4] flex items-center justify-center">
            <Icon d={IC.check} size={24} className="text-[#16A34A]" />
          </div>
          <div className="text-base font-semibold text-[#0F172A]">暂停规则配置成功</div>
          <div className="text-sm text-[#64748B]">暂停规则已保存，将在指定时间范围内生效。</div>
          <Btn variant="primary" onClick={onClose} className="mt-2">返回列表</Btn>
        </div>
      </Modal>
    );
  }

  const inputCls = "h-9 border border-[#E2E8F0] rounded-lg px-3 text-sm text-[#334155] placeholder-[#94A3B8] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#DBEAFE] bg-white";
  const errTxt = (k: string) => errors[k] ? <p className="text-xs text-[#DC2626] mt-1">{errors[k]}</p> : null;

  return (
    <>
      <Modal title="配置暂停自动补货规则" onClose={onClose} width="max-w-lg">
        <InfoBar type="warn">
          暂停规则生效期间，自动补货规则将被覆盖，不会产生新补货单。请谨慎配置时间范围。
        </InfoBar>

        <div className="space-y-5">
          {/* 1. 暂停维度 */}
          <div className="flex border-b border-[#E2E8F0] mb-1 -mx-6 px-6">
            {([["warehouse", "按仓库"], ["location", "按点位"]] as const).map(([v, l]) => (
              <button key={v} type="button"
                onClick={() => { setDim(v); setErrors({}); }}
                className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-all ${dim === v ? "border-[#2563EB] text-[#2563EB]" : "border-transparent text-[#64748B] hover:text-[#334155]"}`}>
                {l}
              </button>
            ))}
          </div>

          {/* 2. 暂停起始日期 */}
          <FormRow label="暂停起始日期" required hint="不能早于今天">
            <input type="date" value={startDate} min={today}
              onChange={e => setStartDate(e.target.value)}
              className={`${inputCls} w-44`} />
            {errTxt("startDate")}
          </FormRow>

          {/* 3. 暂停结束日期 */}
          <FormRow label="暂停结束日期" required hint="不能早于起始日期">
            <input type="date" value={endDate} min={startDate || today}
              onChange={e => setEndDate(e.target.value)}
              className={`${inputCls} w-44`} />
            {errTxt("endDate")}
          </FormRow>

          {/* 4a. 暂停仓库（按仓库时） */}
          {dim === "warehouse" && (
            <FormRow label="暂停仓库" required>
              <div className="border border-[#E2E8F0] rounded-lg overflow-hidden w-full">
                <div className="p-2 border-b border-[#F1F5F9]">
                  <input value={whSearch} onChange={e => setWhSearch(e.target.value)}
                    placeholder="搜索仓库名称…"
                    className="w-full h-7 text-sm px-2.5 border border-[#E2E8F0] rounded-md focus:outline-none focus:border-[#2563EB]" />
                </div>
                <div className="max-h-36 overflow-y-auto">
                  {filteredWh.map(w => (
                    <label key={w} className={`flex items-center gap-2.5 px-3 py-2 cursor-pointer hover:bg-[#F8FAFC] transition-colors ${selWh.includes(w) ? "bg-[#EFF6FF]" : ""}`}>
                      <input type="checkbox" checked={selWh.includes(w)} onChange={() => toggleWh(w)} className="accent-[#2563EB]" />
                      <span className="text-sm text-[#334155]">{w}</span>
                    </label>
                  ))}
                  {filteredWh.length === 0 && <div className="px-3 py-3 text-xs text-[#94A3B8] text-center">无匹配仓库</div>}
                </div>
              </div>
              {selWh.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {selWh.map(w => (
                    <span key={w} className="inline-flex items-center gap-1 text-xs bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE] rounded-full px-2.5 py-0.5">
                      {w}
                      <button onClick={() => toggleWh(w)} className="hover:text-[#1D4ED8]">
                        <Icon d={IC.x} size={10} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
              {errTxt("targets")}
            </FormRow>
          )}

          {/* 4b. 暂停点位（按点位时） */}
          {dim === "location" && (
            <FormRow label="暂停点位" required>
              <div className="border border-[#E2E8F0] rounded-lg overflow-hidden w-full">
                <div className="p-2 border-b border-[#F1F5F9]">
                  <input value={locSearch} onChange={e => setLocSearch(e.target.value)}
                    placeholder="搜索点位名称…"
                    className="w-full h-7 text-sm px-2.5 border border-[#E2E8F0] rounded-md focus:outline-none focus:border-[#2563EB]" />
                </div>
                <div className="max-h-36 overflow-y-auto">
                  {filteredLoc.map(l => (
                    <label key={l} className={`flex items-center gap-2.5 px-3 py-2 cursor-pointer hover:bg-[#F8FAFC] transition-colors ${selLoc.includes(l) ? "bg-[#EFF6FF]" : ""}`}>
                      <input type="checkbox" checked={selLoc.includes(l)} onChange={() => toggleLoc(l)} className="accent-[#2563EB]" />
                      <span className="text-sm text-[#334155]">{l}</span>
                    </label>
                  ))}
                  {filteredLoc.length === 0 && <div className="px-3 py-3 text-xs text-[#94A3B8] text-center">无匹配点位</div>}
                </div>
              </div>
              {selLoc.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {selLoc.map(l => (
                    <span key={l} className="inline-flex items-center gap-1 text-xs bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE] rounded-full px-2.5 py-0.5">
                      {l}
                      <button onClick={() => toggleLoc(l)} className="hover:text-[#1D4ED8]">
                        <Icon d={IC.x} size={10} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
              {errTxt("targets")}
            </FormRow>
          )}

          {/* 5. 批量上传 */}
          <FormRow label="批量上传" hint={`上传${dim === "warehouse" ? "仓库" : "点位"}编码列表文件`}>
            {uploadFile ? (
              <div className="flex items-center gap-2 px-3 py-2 border border-[#E2E8F0] rounded-lg bg-[#F8FAFC] w-full">
                <Icon d={IC.file} size={14} className="text-[#2563EB] flex-shrink-0" />
                <span className="text-sm text-[#334155] flex-1 truncate">{uploadFile}</span>
                <button onClick={() => setUploadFile(null)} className="text-[#94A3B8] hover:text-[#EF4444] transition-colors">
                  <Icon d={IC.x} size={13} />
                </button>
              </div>
            ) : (
              <label className="flex items-center gap-2 h-9 px-4 border-2 border-dashed border-[#CBD5E1] rounded-lg cursor-pointer hover:border-[#2563EB] hover:bg-[#EFF6FF] transition-all group w-full">
                <Icon d={IC.upload} size={14} className="text-[#94A3B8] group-hover:text-[#2563EB]" />
                <span className="text-sm text-[#94A3B8] group-hover:text-[#2563EB]">点击上传文件（Excel / CSV）</span>
                <input type="file" accept=".xlsx,.xls,.csv" className="hidden"
                  onChange={e => { if (e.target.files?.[0]) setUploadFile(e.target.files[0].name); }} />
              </label>
            )}
          </FormRow>

          {/* 6. 暂停原因 */}
          <FormRow label="暂停原因">
            <textarea
              value={reason} onChange={e => setReason(e.target.value)}
              maxLength={200} rows={3}
              placeholder="选填，最长 200 字"
              className="w-full border border-[#E2E8F0] rounded-lg text-sm px-3 py-2 text-[#334155] placeholder-[#94A3B8] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#DBEAFE] resize-none"
            />
            <div className="text-right text-xs text-[#94A3B8] mt-0.5">{reason.length}/200</div>
          </FormRow>
        </div>

        <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-[#E2E8F0]">
          <Btn variant="secondary" onClick={onClose}>取消</Btn>
          <Btn variant="primary" onClick={handleSubmit}>提交</Btn>
        </div>
      </Modal>

      {conflict && (
        <ConfirmModal
          msg={`${dim === "warehouse" ? "仓库" : "点位"}目前已有执行中的规则，请运营人员手动调整后再提交，暂不做自动并集逻辑。`}
          onConfirm={() => { setConflict(false); setSubmitted(true); }}
          onCancel={() => setConflict(false)}
        />
      )}
    </>
  );
};

// ─── Tab 1: Auto Restock Rules ────────────────────────────────────────────────
const AutoRulesTab = () => {
  const [rules, setRules] = useState<AutoRule[]>(INIT_AUTO_RULES);
  const [showConfig, setShowConfig] = useState(false);

  // search state
  const [fWarehouse, setFWarehouse] = useState("");
  const [fLocation, setFLocation] = useState("");
  const [fDevice, setFDevice] = useState("");
  const [fScopeType, setFScopeType] = useState("");
  const [fStatus, setFStatus] = useState("");

  const handleToggle = (id: string) => {
    setRules(rs => rs.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r));
  };

  const cols = [
    { key: "code", label: "规则编码", width: "w-36", render: (r: AutoRule) => <span className="font-mono text-xs text-[#334155]">{r.code}</span> },
    {
      key: "scopeType", label: "作用类型", width: "w-28",
      render: (r: AutoRule) => <Badge label={r.scopeType} color={r.scopeType === "仓库" ? "blue" : "purple"} />,
    },
    {
      key: "targets", label: "作用对象",
      render: (r: AutoRule) => r.targets.length > 1
        ? (
          <div className="group relative inline-block">
            <span className="text-[#334155] cursor-help border-b border-dashed border-[#94A3B8]">{r.targets[0]} <span className="text-[#94A3B8] text-xs">+{r.targets.length - 1}</span></span>
            <div className="absolute z-10 hidden group-hover:block bg-white border border-[#E2E8F0] rounded-lg shadow-lg px-3 py-2 min-w-max top-full left-0 mt-1">
              {r.targets.map((t, i) => <div key={i} className="text-xs text-[#334155] py-0.5">{t}</div>)}
            </div>
          </div>
        )
        : <span className="text-[#334155]">{r.targets[0]}</span>,
    },
    {
      key: "weeks", label: "适用周",
      render: (r: AutoRule) => <span className="text-sm text-[#334155]">{r.weeks.join("、")}</span>,
    },
    { key: "orderTime", label: "出单时间", width: "w-24", render: (r: AutoRule) => <span className="font-mono text-sm text-[#334155]">{r.orderTime}</span> },
    { key: "pushTime", label: "推送履约时间", width: "w-28", render: (r: AutoRule) => <span className="font-mono text-sm text-[#334155]">{r.pushTime}</span> },
    {
      key: "threshold", label: "最低缺货件数阈值", width: "w-36",
      render: (r: AutoRule) => <span className="text-sm text-[#334155]">{r.threshold} 件</span>,
    },
    {
      key: "enabled", label: "状态", width: "w-24",
      render: (r: AutoRule) => <Badge label={r.enabled ? "已启用" : "已停用"} color={r.enabled ? "green" : "gray"} />,
    },
    {
      key: "ops", label: "操作", width: "w-32",
      render: (r: AutoRule) => (
        <div className="flex items-center gap-2 flex-nowrap">
          <button className="text-xs text-[#2563EB] hover:underline whitespace-nowrap">修改</button>
          <button
            onClick={() => handleToggle(r.id)}
            className={`text-xs hover:underline whitespace-nowrap ${r.enabled ? "text-[#DC2626]" : "text-[#16A34A]"}`}
          >
            {r.enabled ? "停用" : "启用"}
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-base font-semibold text-[#0F172A]">自动补货规则</div>
          <div className="text-xs text-[#64748B] mt-0.5">管理所有仓库/点位的自动补货触发规则</div>
        </div>
        <Btn variant="primary" icon="plus" onClick={() => setShowConfig(true)}>配置自动补货规则</Btn>
      </div>

      <InfoBar>
        <div className="grid grid-cols-1 gap-0.5">
          <div><strong className="font-semibold">规则优先级：</strong>点位维度自动补货规则 &gt; 仓库维度自动补货规则</div>
          <div><strong className="font-semibold">运行优先级：</strong>按时间、点位等级优先级跑自动补货单逻辑</div>
        </div>
      </InfoBar>

      <SearchBar
        onSearch={() => {}}
        onReset={() => { setFWarehouse(""); setFLocation(""); setFDevice(""); setFScopeType(""); setFStatus(""); }}
        fields={
          <div className="grid grid-cols-4 gap-3">
            <div>
              <div className="text-xs text-[#64748B] mb-1">仓库名称</div>
              <Sel value={fWarehouse} onChange={setFWarehouse} className="w-full"
                options={[{ label: "全部仓库", value: "" }, ...WAREHOUSES.map(w => ({ label: w, value: w }))]} />
            </div>
            <div>
              <div className="text-xs text-[#64748B] mb-1">点位名称</div>
              <Inp value={fLocation} onChange={setFLocation} placeholder="模糊搜索点位" className="w-full" />
            </div>
            <div>
              <div className="text-xs text-[#64748B] mb-1">设备资产编码</div>
              <Inp value={fDevice} onChange={setFDevice} placeholder="模糊搜索设备编码" className="w-full" />
            </div>
            <div>
              <div className="text-xs text-[#64748B] mb-1">作用类型</div>
              <Sel value={fScopeType} onChange={setFScopeType} className="w-full"
                options={[{ label: "全部", value: "" }, { label: "仓库", value: "仓库" }, { label: "点位零售柜", value: "点位零售柜" }]} />
            </div>
            <div>
              <div className="text-xs text-[#64748B] mb-1">创建时间</div>
              <div className="flex items-center gap-1">
                <Inp type="date" className="flex-1" />
                <span className="text-[#94A3B8] text-xs">~</span>
                <Inp type="date" className="flex-1" />
              </div>
            </div>
            <div>
              <div className="text-xs text-[#64748B] mb-1">修改时间</div>
              <div className="flex items-center gap-1">
                <Inp type="date" className="flex-1" />
                <span className="text-[#94A3B8] text-xs">~</span>
                <Inp type="date" className="flex-1" />
              </div>
            </div>
            <div>
              <div className="text-xs text-[#64748B] mb-1">状态</div>
              <Sel value={fStatus} onChange={setFStatus} className="w-full"
                options={[{ label: "全部", value: "" }, { label: "已启用", value: "enabled" }, { label: "已停用", value: "disabled" }]} />
            </div>
          </div>
        }
      />

      <Card noPad>
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#F1F5F9]">
          <span className="text-sm font-medium text-[#334155]">规则列表</span>
          <span className="text-xs text-[#94A3B8]">共 {rules.length} 条规则</span>
        </div>
        <Tbl cols={cols} rows={rules} />
        <div className="flex items-center justify-between px-4 py-3 border-t border-[#F1F5F9]">
          <span className="text-xs text-[#94A3B8]">共 {rules.length} 条</span>
          <div className="flex items-center gap-1">
            {[1, 2, 3].map(p => (
              <button key={p} className={`w-7 h-7 text-xs rounded ${p === 1 ? "bg-[#2563EB] text-white" : "text-[#64748B] hover:bg-[#F1F5F9]"}`}>{p}</button>
            ))}
          </div>
        </div>
      </Card>

      {showConfig && <ConfigAutoModal onClose={() => setShowConfig(false)} />}
    </div>
  );
};

// ─── Tab 2: Pause Rules ────────────────────────────────────────────────────────
const PauseRulesTab = () => {
  const [rules] = useState<PauseRule[]>(INIT_PAUSE_RULES);
  const [showConfig, setShowConfig] = useState(false);

  const [fWarehouse, setFWarehouse] = useState("");
  const [fLocation, setFLocation] = useState("");
  const [fDevice, setFDevice] = useState("");
  const [fScopeType, setFScopeType] = useState("");

  const statusColor = (s: string): "blue" | "orange" | "green" => {
    if (s === "待执行") return "blue";
    if (s === "执行中") return "orange";
    return "green";
  };

  const cols = [
    { key: "code", label: "规则编码", width: "w-36", render: (r: PauseRule) => <span className="font-mono text-xs">{r.code}</span> },
    {
      key: "scopeType", label: "作用类型", width: "w-28",
      render: (r: PauseRule) => <Badge label={r.scopeType} color={r.scopeType === "仓库" ? "blue" : "purple"} />,
    },
    {
      key: "targets", label: "作用对象",
      render: (r: PauseRule) => r.targets.length > 1
        ? (
          <div className="group relative inline-block">
            <span className="text-[#334155] cursor-help border-b border-dashed border-[#94A3B8]">{r.targets[0]} <span className="text-[#94A3B8] text-xs">+{r.targets.length - 1}</span></span>
            <div className="absolute z-10 hidden group-hover:block bg-white border border-[#E2E8F0] rounded-lg shadow-lg px-3 py-2 min-w-max top-full left-0 mt-1">
              {r.targets.map((t, i) => <div key={i} className="text-xs text-[#334155] py-0.5">{t}</div>)}
            </div>
          </div>
        )
        : <span className="text-[#334155]">{r.targets[0]}</span>,
    },
    { key: "pauseStart", label: "暂停起始日期", width: "w-32", render: (r: PauseRule) => <span className="text-sm text-[#334155]">{r.pauseStart}</span> },
    { key: "pauseEnd", label: "暂停结束日期", width: "w-32", render: (r: PauseRule) => <span className="text-sm text-[#334155]">{r.pauseEnd}</span> },
    {
      key: "status", label: "状态", width: "w-28",
      render: (r: PauseRule) => <Badge label={r.status} color={statusColor(r.status)} />,
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-base font-semibold text-[#0F172A]">自动补货暂停规则</div>
          <div className="text-xs text-[#64748B] mt-0.5">配置特定时段或点位的自动补货暂停策略</div>
        </div>
        <Btn variant="primary" icon="plus" onClick={() => setShowConfig(true)}>配置暂停自动补货规则</Btn>
      </div>

      <InfoBar type="warn">
        暂停规则生效期间，自动补货规则将被覆盖，不会产生新补货单。同一仓库/点位仅允许一条执行中的暂停规则。
      </InfoBar>

      <SearchBar
        onSearch={() => {}}
        onReset={() => { setFWarehouse(""); setFLocation(""); setFDevice(""); setFScopeType(""); }}
        fields={
          <div className="grid grid-cols-4 gap-3">
            <div>
              <div className="text-xs text-[#64748B] mb-1">仓库名称</div>
              <Sel value={fWarehouse} onChange={setFWarehouse} className="w-full"
                options={[{ label: "全部仓库", value: "" }, ...WAREHOUSES.map(w => ({ label: w, value: w }))]} />
            </div>
            <div>
              <div className="text-xs text-[#64748B] mb-1">点位名称</div>
              <Inp value={fLocation} onChange={setFLocation} placeholder="模糊搜索点位" className="w-full" />
            </div>
            <div>
              <div className="text-xs text-[#64748B] mb-1">设备资产编码</div>
              <Inp value={fDevice} onChange={setFDevice} placeholder="模糊搜索设备编码" className="w-full" />
            </div>
            <div>
              <div className="text-xs text-[#64748B] mb-1">作用类型</div>
              <Sel value={fScopeType} onChange={setFScopeType} className="w-full"
                options={[{ label: "全部", value: "" }, { label: "仓库", value: "仓库" }, { label: "点位零售柜", value: "点位零售柜" }]} />
            </div>
            <div>
              <div className="text-xs text-[#64748B] mb-1">创建时间</div>
              <div className="flex items-center gap-1">
                <Inp type="date" className="flex-1" />
                <span className="text-[#94A3B8] text-xs">~</span>
                <Inp type="date" className="flex-1" />
              </div>
            </div>
          </div>
        }
      />

      <Card noPad>
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#F1F5F9]">
          <span className="text-sm font-medium text-[#334155]">暂停规则列表</span>
          <span className="text-xs text-[#94A3B8]">共 {rules.length} 条规则</span>
        </div>
        <Tbl cols={cols} rows={rules} />
        <div className="flex items-center justify-between px-4 py-3 border-t border-[#F1F5F9]">
          <span className="text-xs text-[#94A3B8]">共 {rules.length} 条</span>
          <div className="flex items-center gap-1">
            {[1].map(p => (
              <button key={p} className="w-7 h-7 text-xs rounded bg-[#2563EB] text-white">{p}</button>
            ))}
          </div>
        </div>
      </Card>

      {showConfig && <ConfigPauseModal onClose={() => setShowConfig(false)} />}
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
export const RuleConfigPage = () => {
  const [tab, setTab] = useState<"auto" | "pause">("auto");

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* Page Header */}
      <div className="bg-white border-b border-[#E2E8F0] px-6 py-4">
        <div className="flex items-center gap-2 text-xs text-[#94A3B8] mb-1">
          <span>首页</span>
          <Icon d="M9 18l6-6-6-6" size={12} />
          <span>规则配置</span>
          <Icon d="M9 18l6-6-6-6" size={12} />
          <span className="text-[#334155]">自动补货规则配置</span>
        </div>
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-[#0F172A]">规则配置</h1>
        </div>
      </div>

      {/* Top Tabs */}
      <div className="bg-white border-b border-[#E2E8F0] px-6">
        <div className="flex">
          {([["auto", "配置自动补货规则"], ["pause", "配置自动补货暂停规则"]] as const).map(([k, label]) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              className={`px-5 py-3 text-sm font-medium border-b-2 transition-all ${
                tab === k
                  ? "border-[#2563EB] text-[#2563EB]"
                  : "border-transparent text-[#64748B] hover:text-[#334155] hover:border-[#CBD5E1]"
              }`}
            >{label}</button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-5">
        {tab === "auto" ? <AutoRulesTab /> : <PauseRulesTab />}
      </div>
    </div>
  );
};

export default RuleConfigPage;
