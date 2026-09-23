import { useState, ReactNode } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// 共享组件：点位详情 / 智能柜详情 的 Tab 卡片（基本信息…审核状态）
// 从 App.tsx 抽取，运营后台两端直接复用
// ══════════════════════════════════════════════════════════════════════════════

const Icon = ({ d, size = 16, className = "" }: { d: string; size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d={d} />
  </svg>
);

const Icons = {
  location: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z M12 10a2 2 0 100-4 2 2 0 000 4",
  layers: "M12 2L2 7l10 5 10-5-10-5z M2 17l10 5 10-5 M2 12l10 5 10-5",
  download: "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4 M7 10l5 5 5-5 M12 15V3",
  wifi: "M5 12.55a11 11 0 0114.08 0 M1.42 9a16 16 0 0121.16 0 M8.53 16.11a6 6 0 016.95 0 M12 20h.01",
  thermometer: "M14 14.76V3.5a2.5 2.5 0 00-5 0v11.26a4.5 4.5 0 105 0z",
  zap: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  clock: "M12 22a10 10 0 100-20 10 10 0 000 20z M12 6v6l4 2",
  check: "M20 6L9 17l-5-5",
  x: "M18 6L6 18M6 6l12 12",
};

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

// ─── Location Detail ──────────────────────────────────────────────────────────
type LocTab = "基本信息" | "运营数据" | "运营配置" | "设备信息" | "设备云" | "联系人信息" | "关联工单" | "商务合同" | "补货记录" | "审核状态";
const LOC_TABS: LocTab[] = ["基本信息", "运营数据", "运营配置", "设备信息", "设备云", "联系人信息", "关联工单", "商务合同", "补货记录", "审核状态"];

export const LocationDetailTabs = ({ extraAction }: { extraAction?: ReactNode }) => {
  const [tab, setTab] = useState<LocTab>("基本信息");
  const [photoOpen, setPhotoOpen] = useState(false);
  const [woDetail, setWoDetail] = useState<number | null>(null);
  const [restockDetail, setRestockDetail] = useState<number | null>(null);
  // 补货规则周维度（只读展示）
  const WEEK_RULE_DAYS = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];

  const YN = ({ yes }: { yes: boolean }) => (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${yes ? "bg-[#F0FDF4] text-[#16A34A]" : "bg-[#F3F4F6] text-[#6B7280]"}`}>{yes ? "是" : "否"}</span>
  );
  const Field = ({ label, value }: { label: string; value: React.ReactNode }) => (
    <div>
      <div className="text-xs text-[#94A3B8] mb-1">{label}</div>
      <div className="text-sm text-[#334155]">{value}</div>
    </div>
  );

  const RESTOCK_ROWS = [
    { id: "RO-2025-0301-001", batch: "第1批", creator: "张运营", executor: "李补货", time: "2025-03-01 10:00", qty: 48, done: "2025-03-01 14:30", status: "已完成", lines: [
      { name: "农夫山泉 550ml", spec: "550ml", layer: "第1层", qty: 18 },
      { name: "东方树叶 500ml", spec: "500ml", layer: "第2层", qty: 12 },
      { name: "乐事薯片 75g", spec: "75g", layer: "第3层", qty: 18 },
    ] },
    { id: "RO-2025-0210-003", batch: "第1批", creator: "王主管", executor: "陈补货", time: "2025-02-10 09:30", qty: 36, done: "2025-02-10 13:00", status: "已完成", lines: [
      { name: "元气森林苏打水", spec: "480ml", layer: "第1层", qty: 16 },
      { name: "百岁山矿泉水", spec: "570ml", layer: "第2层", qty: 20 },
    ] },
    { id: "RO-2025-0118-002", batch: "第2批", creator: "张运营", executor: "—",      time: "2025-01-18 08:00", qty: 24, done: "—",               status: "待履约", lines: [
      { name: "统一冰红茶 500ml", spec: "500ml", layer: "第2层", qty: 24 },
    ] },
  ];
  const WO_ROWS = [
    { model: "智柜 Pro X8", code: "RC-2024-SZ-001", installPos: "大堂入口左侧，正对电梯口", planTime: "2024-03-01 09:00", customLook: "是", report: "是", elevator: "是", shed: "否", actualTime: "2024-03-01 14:00", engineer: "刘工", auditStatus: "审核通过", submitter: "张主管", auditor: "王审核", createTime: "2024-02-28 16:00", auditTime: "2024-03-02 10:00", remark: "需提前联系物业申请施工证" },
    { model: "智柜 Pro X8", code: "RC-2024-SZ-002", installPos: "员工休息区入口右侧", planTime: "2024-09-28 10:00", customLook: "否", report: "否", elevator: "是", shed: "否", actualTime: "—",               engineer: "—",   auditStatus: "待审核",   submitter: "李运营", auditor: "—",    createTime: "2024-09-26 14:30", auditTime: "—",               remark: "" },
    { model: "智柜 Lite S4", code: "RC-2024-SZ-003", installPos: "—", planTime: "2024-09-01 09:00", customLook: "否", report: "是", elevator: "是", shed: "否", actualTime: "—",               engineer: "刘工", auditStatus: "待审核",   submitter: "王芳",   auditor: "—",    createTime: "2024-08-31 16:00", auditTime: "—",               remark: "" },
  ];
  const SALES_RANK = [
    { rank:1, name:"农夫山泉 550ml",    qty:312, amount:"¥624.00" },
    { rank:2, name:"东方树叶 500ml",    qty:287, amount:"¥861.00" },
    { rank:3, name:"乐事薯片 75g",      qty:254, amount:"¥635.00" },
    { rank:4, name:"元气森林苏打水",    qty:231, amount:"¥693.00" },
    { rank:5, name:"百岁山矿泉水",      qty:198, amount:"¥396.00" },
    { rank:6, name:"良品铺子坚果",      qty:176, amount:"¥880.00" },
    { rank:7, name:"统一冰红茶 500ml",  qty:162, amount:"¥324.00" },
    { rank:8, name:"卫龙辣条 28g",      qty:148, amount:"¥222.00" },
    { rank:9, name:"三只松鼠混合坚果",  qty:134, amount:"¥938.00" },
    { rank:10,name:"可口可乐 330ml",    qty:121, amount:"¥363.00" },
  ];

  return (
    <div>
      {photoOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center" onClick={() => setPhotoOpen(false)}>
          <div className="bg-[#1E293B] rounded-2xl p-2 max-w-2xl w-full mx-4">
            <div className="grid grid-cols-3 gap-2">
              {["bg-[#334155]","bg-[#475569]","bg-[#374151]"].map((c,i) => (
                <div key={i} className={`${c} rounded-xl aspect-[4/3] flex items-center justify-center text-white/30 text-xs`}>场地照片 {i+1}</div>
              ))}
            </div>
            <p className="text-center text-xs text-white/40 mt-3 mb-1">点击任意位置关闭</p>
          </div>
        </div>
      )}

      {/* Tab card — same structure as CustomerDetail */}
      <Card noPad>
        <div className="flex items-center gap-0 border-b border-[#E2E8F0] px-5 pt-1 overflow-x-auto">
          {LOC_TABS.map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`flex-shrink-0 px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-all whitespace-nowrap
                ${tab === t ? "border-[#2563EB] text-[#2563EB]" : "border-transparent text-[#64748B] hover:text-[#334155]"}`}>
              {t}
            </button>
          ))}
          {extraAction && <div className="ml-auto flex items-center pr-2 flex-shrink-0">{extraAction}</div>}
        </div>

        <div className="p-5">

          {/* ── 基本信息 ─── grid-cols-3 field style ── */}
          {tab === "基本信息" && (
            <div className="space-y-5">
              <div className="grid grid-cols-3 gap-x-8 gap-y-5">
                <Field label="归属客户"     value={<span className="text-[#2563EB] font-medium">蜂巢智能科技</span>} />
                <Field label="关联供货仓库" value="深圳中心仓" />
                <Field label="点位名称"     value="深圳南山科技园 A3 栋大堂" />
                <Field label="点位地区"     value="广东省 · 深圳市 · 南山区" />
                <Field label="详细地址"     value="深圳市南山区科技园南区 A3 栋 1F" />
                <Field label="覆盖人数"     value="约 1,200 人" />
                <Field label="一级场景"     value="写字楼" />
                <Field label="二级场景"     value="园区大堂" />
                <Field label="设备安装位置" value="大堂入口左侧，正对电梯口" />
                <Field label="竞对智能售货机" value={<YN yes={true} />} />
                <Field label="竞对传统售货机" value={<YN yes={false} />} />
                <Field label="百米内便利店"   value={<YN yes={true} />} />
                <div className="col-span-3">
                  <Field label="点位信息备注" value={<span className="text-[#64748B]">大堂空间宽敞，人流量大，建议增补 1 台设备。</span>} />
                </div>
              </div>
              <div className="border-t border-[#F1F5F9] pt-5">
                <div className="text-xs text-[#94A3B8] mb-2">经纬度 <span className="text-[#CBD5E1]">— 位置示意，只读</span></div>
                <div className="relative h-40 rounded-lg border border-[#E2E8F0] overflow-hidden bg-[#E8EEF0]">
                  {/* 假地图底图 */}
                  <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 800 160">
                    <rect width="800" height="160" fill="#E8EEF0" />
                    <rect x="60" y="14" width="150" height="56" rx="4" fill="#DCE9DC" />
                    <rect x="590" y="80" width="170" height="66" rx="4" fill="#DCE9DC" />
                    <rect x="350" y="100" width="120" height="46" rx="4" fill="#E3E8E4" />
                    <path d="M0 40 H800 M0 95 H800 M120 0 V160 M330 0 V160 M560 0 V160 M720 0 V160" stroke="#FFFFFF" strokeWidth="9" fill="none" />
                    <path d="M0 128 Q 200 108 420 132 T 800 118" stroke="#C7DCE8" strokeWidth="14" fill="none" opacity="0.8" />
                  </svg>
                  {/* 定位标 */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
                    <Icon d={Icons.location} size={30} className="text-[#2563EB] drop-shadow-md" />
                  </div>
                  {/* 坐标浮层 */}
                  <div className="absolute bottom-2 left-2 flex items-center gap-1.5 bg-white/90 rounded-md px-2.5 py-1 shadow-sm">
                    <Icon d={Icons.location} size={12} className="text-[#2563EB]" />
                    <span className="font-mono text-xs text-[#64748B]">114.052628, 22.540155</span>
                  </div>
                  <span className="absolute top-2 right-2 text-[10px] text-[#94A3B8] bg-white/85 rounded px-1.5 py-0.5">地图示意 · 只读</span>
                </div>
              </div>
              <div className="border-t border-[#F1F5F9] pt-5">
                <div className="text-xs text-[#94A3B8] mb-2">场地照片 <span className="text-[#CBD5E1]">— 点击放大</span></div>
                <div className="flex gap-2">
                  {[["bg-[#DBEAFE]","bg-[#EDE9FE]","bg-[#DCFCE7]"]].flat().map((bg, i) => (
                    <button key={i} onClick={() => setPhotoOpen(true)}
                      className={`w-20 h-20 rounded-lg ${bg} flex items-center justify-center hover:ring-2 hover:ring-[#2563EB]/40 transition-all flex-shrink-0`}>
                      <svg viewBox="0 0 40 40" className="w-8 h-8 opacity-40"><rect x="4" y="10" width="32" height="22" rx="3" fill="#2563EB"/><circle cx="14" cy="18" r="3" fill="white"/><path d="M4 28l9-7 7 6 5-4 11 9" fill="none" stroke="white" strokeWidth="2" strokeLinejoin="round"/></svg>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── 商务合同 ── */}
          {tab === "商务合同" && (
            <div className="grid grid-cols-3 gap-x-8 gap-y-5">
              <div className="col-span-3">
                <Field label="合同附件" value={
                  <div className="flex items-center gap-3 mt-1">
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC]">
                      <Icon d={Icons.layers} size={14} className="text-[#2563EB]" />
                      <span className="text-sm text-[#334155]">蜂巢·南山A3_合同_2024.pdf</span>
                    </div>
                    <button className="flex items-center gap-1 text-xs text-[#2563EB] hover:underline">
                      <Icon d={Icons.download} size={12} />下载
                    </button>
                  </div>
                } />
              </div>
              <Field label="合同有效期" value="2024-01-01 ~ 2026-12-31" />
              <Field label="保证金金额" value="¥5,000.00" />
            </div>
          )}

          {/* ── 审核状态 ── */}
          {tab === "审核状态" && (() => {
            const AUDIT_LOGS = [
              { seq: 1, submitter: "张运营", submitTime: "2024-02-28 15:00", content: "点位新增审核",  auditor: "王审核", auditTime: "2024-03-02 10:00", result: "审核通过", note: "资料齐全，位置与客流匹配，通过。" },
              { seq: 2, submitter: "张运营", submitTime: "2024-02-20 09:30", content: "点位新增审核",  auditor: "王审核", auditTime: "2024-02-21 14:00", result: "审核驳回", note: "缺少场地照片，请补充后重新提交。" },
              { seq: 3, submitter: "李运营", submitTime: "2024-01-15 10:00", content: "点位信息变更审核", auditor: "刘总监", auditTime: "2024-01-16 11:20", result: "审核通过", note: "同意变更补货时间。" },
            ];
            return (
              <div>
                <SectionTitle title="当前审核状态" />
                <div className="flex items-center gap-3 mt-3 mb-7">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F0FDF4] text-[#16A34A]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />审核通过
                  </span>
                  <span className="text-xs text-[#94A3B8]">最近一次审核：2024-03-02 10:00 · 王审核</span>
                </div>
                <SectionTitle title="审核记录" />
                <table className="w-full text-sm mt-3">
                  <thead>
                    <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                      {["序号","提交人","提交时间","审核内容","审核人","审核时间","审核结果","审核意见"].map(h => (
                        <th key={h} className="py-2.5 px-3 text-left text-xs font-medium text-[#64748B] whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {AUDIT_LOGS.map(r => (
                      <tr key={r.seq} className="border-b border-[#F1F5F9] hover:bg-[#F8FAFC]">
                        <td className="py-3 px-3 text-[#64748B]">{r.seq}</td>
                        <td className="py-3 px-3 text-[#334155]">{r.submitter}</td>
                        <td className="py-3 px-3 text-xs text-[#64748B] whitespace-nowrap">{r.submitTime}</td>
                        <td className="py-3 px-3 text-[#334155] whitespace-nowrap">{r.content}</td>
                        <td className="py-3 px-3 text-[#334155]">{r.auditor}</td>
                        <td className="py-3 px-3 text-xs text-[#64748B] whitespace-nowrap">{r.auditTime}</td>
                        <td className="py-3 px-3">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap
                            ${r.result === "审核通过" ? "bg-[#F0FDF4] text-[#16A34A]" : "bg-[#FEF2F2] text-[#DC2626]"}`}>
                            {r.result}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-xs text-[#64748B] max-w-[220px]"><span className="block">{r.note}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          })()}

          {/* ── 联系人信息 ── */}
          {tab === "联系人信息" && (
            <div className="grid grid-cols-3 gap-x-8 gap-y-5">
              <Field label="联系人姓名" value="李云飞" />
              <Field label="联系电话"   value="138 0000 8888" />
              <Field label="联系人性别" value="男" />
              <Field label="联系人微信号" value="liyunfei_sz" />
              <Field label="联系人邮箱" value="liyunfei@beehive.com" />
              <Field label="联系人身份" value="现场负责人" />
            </div>
          )}

          {/* ── 设备信息 ── */}
          {tab === "设备信息" && (
            <div className="grid grid-cols-3 gap-x-8 gap-y-5">
              <Field label="设备资产编码" value={<span className="font-mono text-xs bg-[#F1F5F9] px-2 py-0.5 rounded text-[#64748B]">RC-2024-SZ-001</span>} />
              <Field label="设备型号"     value="智柜 Pro X8" />
              <Field label="功能属性"     value="冷藏+常温" />
              <Field label="尺寸"         value="W600 × D680 × H1850 mm" />
              <Field label="层板配置"     value="6 层，每层 8 格" />
              <Field label="额定电压"     value="220V / 50Hz" />
              <Field label="额定电流"     value="4.5A" />
              <Field label="额定功率"     value="990W" />
              <Field label="额定功耗"     value="≤ 3.2 kWh/24h" />
              <Field label="刷脸屏"       value={<YN yes={true} />} />
              <Field label="摄像头"       value={<YN yes={true} />} />
            </div>
          )}

          {/* ── 设备云 ── */}
          {tab === "设备云" && (
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "在线状态", value: <span className="inline-flex items-center justify-center w-full px-3 py-1.5 rounded-full text-xs font-semibold bg-[#DCFCE7] text-[#16A34A]">在线</span>, icon: Icons.wifi, ts: "2024-09-04 14:32:05" },
                { label: "实时温度", value: <span className="text-2xl font-bold text-[#0F172A]">4.2°C</span>, icon: Icons.thermometer, ts: "2024-09-04 14:31:58" },
                { label: "实时功率", value: <span className="text-2xl font-bold text-[#0F172A]">312W</span>, icon: Icons.zap, ts: "2024-09-04 14:32:01" },
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
          {/* ── 运营配置（只读展示）── */}
          {tab === "运营配置" && (() => {
            const COLS = { gridTemplateColumns: "110px 110px 1fr 1fr 180px" };
            const TimePill = ({ v, dim }: { v: string; dim?: boolean }) => (
              <span className={`inline-flex items-center gap-1.5 h-9 px-3 rounded-md border border-[#E2E8F0] bg-white text-sm ${dim ? "text-[#CBD5E1]" : "text-[#334155]"}`}>
                {v}
                <Icon d={Icons.clock} size={13} className="text-[#94A3B8]" />
              </span>
            );
            return (
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-[#0F172A]">补货规则</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#F1F5F9] text-[#94A3B8]">只读</span>
                </div>
                <p className="text-xs text-[#94A3B8] mb-3">该点位的周规则、出单时间、推送履约时间与缺货自动补货阈值</p>
                <div className="border border-[#E2E8F0] rounded-lg overflow-hidden">
                  {/* 表头 */}
                  <div className="grid bg-[#F8FAFC] border-b border-[#E2E8F0] text-xs font-medium text-[#6B7280]" style={COLS}>
                    {["周规则", "统一配置", "出单时间", "推送履约时间", "缺货自动补货阈值"].map(h => (
                      <div key={h} className="px-4 py-3 whitespace-nowrap">{h}</div>
                    ))}
                  </div>
                  {/* 统一配置行（未勾选，置灰） */}
                  <div className="grid items-center border-b border-[#F1F5F9] bg-white opacity-45" style={COLS}>
                    <div className="px-4 py-3 flex items-center">
                      <span className="w-3.5 h-3.5 rounded-[3px] border border-[#D1D5DB] bg-white inline-block flex-shrink-0" />
                    </div>
                    <div className="px-4 py-3.5 text-sm font-bold text-[#64748B]">统一配置</div>
                    <div className="px-4 py-3"><TimePill v="--:--" dim /></div>
                    <div className="px-4 py-3"><TimePill v="--:--" dim /></div>
                    <div className="px-4 py-3">
                      <span className="inline-flex items-center justify-center h-9 px-4 rounded-md border border-[#E2E8F0] bg-white text-sm text-[#94A3B8]">—</span>
                    </div>
                  </div>
                  {/* 周一～周日行（勾选的天高亮展示，未勾选置灰） */}
                  {WEEK_RULE_DAYS.map(day => {
                    const on = day === "周一" || day === "周二";
                    return (
                      <div key={day} className={`grid items-center border-b border-[#F1F5F9] last:border-0 ${on ? "bg-white" : "bg-[#F9FAFB] opacity-45"}`} style={COLS}>
                        <div className="px-4 py-3 flex items-center gap-2.5">
                          {on
                            ? <span className="w-3.5 h-3.5 rounded-[3px] bg-[#2563EB] inline-flex items-center justify-center flex-shrink-0"><Icon d={Icons.check} size={10} className="text-white" /></span>
                            : <span className="w-3.5 h-3.5 rounded-[3px] border border-[#D1D5DB] bg-white inline-block flex-shrink-0" />}
                          <span className={`text-sm font-medium ${on ? "text-[#0F172A]" : "text-[#64748B]"}`}>{day}</span>
                        </div>
                        <div />
                        <div className="px-4 py-3"><TimePill v="09:00" dim={!on} /></div>
                        <div className="px-4 py-3"><TimePill v="10:00" dim={!on} /></div>
                        <div className="px-4 py-3">
                          {on
                            ? <span className="inline-flex items-center h-9 px-6 rounded-md border border-[#E2E8F0] bg-white text-sm text-[#334155]">20 <span className="text-xs text-[#94A3B8] ml-0.5">件</span></span>
                            : <span className="inline-flex items-center h-9 px-6 rounded-md border border-[#E2E8F0] bg-white" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <p className="text-xs text-[#CBD5E1] mt-2">未启用统一配置，仅勾选的周一、周二自动出单；未勾选的天不自动出单</p>
              </div>
            );
          })()}

          {/* ── 关联工单 ── */}
          {tab === "关联工单" && (
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
                    {WO_ROWS.map((w, i) => (
                      <tr key={i} className="border-b border-[#F1F5F9] hover:bg-[#F8FAFC]">
                        <td className="py-3 px-3 text-[#334155]">{w.model}</td>
                        <td className="py-3 px-3 font-mono text-xs text-[#64748B]">{w.code}</td>
                        <td className="py-3 px-3 text-[#334155]">{w.planTime.slice(0, 10)}</td>
                        <td className="py-3 px-3 text-[#334155]">{w.actualTime === "—" ? "—" : w.actualTime.slice(0, 10)}</td>
                        <td className="py-3 px-3 text-[#334155]">{w.engineer}</td>
                        <td className="py-3 px-3">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium
                            ${w.auditStatus === "审核通过" ? "bg-[#F0FDF4] text-[#16A34A]" : w.auditStatus === "待审核" ? "bg-[#FFFBEB] text-[#D97706]" : "bg-[#FEF2F2] text-[#DC2626]"}`}>
                            {w.auditStatus}
                          </span>
                        </td>
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

              {/* 工单详情弹窗 */}
              {woDetail !== null && (() => { const w = WO_ROWS[woDetail]; return (
                <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center" onClick={() => setWoDetail(null)}>
                  <div className="bg-white rounded-2xl p-6 max-w-3xl w-full mx-4 shadow-2xl max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-[#0F172A]">装机工单详情</span>
                        <span className="font-mono text-xs font-semibold text-[#2563EB]">{w.code}</span>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium
                          ${w.auditStatus === "审核通过" ? "bg-[#F0FDF4] text-[#16A34A]" : w.auditStatus === "待审核" ? "bg-[#FFFBEB] text-[#D97706]" : "bg-[#FEF2F2] text-[#DC2626]"}`}>
                          {w.auditStatus}
                        </span>
                      </div>
                      <button onClick={() => setWoDetail(null)} className="w-7 h-7 rounded-full bg-[#F1F5F9] flex items-center justify-center hover:bg-[#E2E8F0]">
                        <Icon d={Icons.x} size={14} className="text-[#64748B]" />
                      </button>
                    </div>
                    <div className="text-xs text-[#94A3B8] mb-4">创建于 {w.createTime}</div>
                    <div className="grid grid-cols-3 gap-x-8 gap-y-4">
                      {[
                        { l: "设备型号",           v: <span>{w.model}</span> },
                        { l: "设备安装位置",       v: <span>{w.installPos}</span> },
                        { l: "需求安装时间",       v: <span>{w.planTime}</span> },
                        { l: "是否定制外观",       v: <YN yes={w.customLook === "是"} /> },
                        { l: "是否需提前报备",     v: <YN yes={w.report === "是"} /> },
                        { l: "是否有电梯",         v: <YN yes={w.elevator === "是"} /> },
                        { l: "是否需户外棚",       v: <YN yes={w.shed === "是"} /> },
                        { l: "设备资产条码",       v: <span>{w.code}</span> },
                        { l: "实际安装时间",       v: <span>{w.actualTime}</span> },
                        { l: "安装工程人员",       v: <span>{w.engineer}</span> },
                        { l: "工单提交人",         v: <span>{w.submitter}</span> },
                        { l: "工单审核人",         v: <span>{w.auditor}</span> },
                        { l: "工单创建时间",       v: <span>{w.createTime}</span> },
                        { l: "工单审核完成时间",   v: <span>{w.auditTime}</span> },
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
          )}

          {/* ── 运营数据 ── */}
          {tab === "运营数据" && (
            <div>
              <SectionTitle title="KPI 指标卡" />
              <div className="grid grid-cols-2 gap-4 mt-3 mb-7">
                {[
                  { label:"销售额汇总", yesterday:"¥1,280", month:"¥6,840", sub:"不含未支付和失败订单" },
                  { label:"订单数汇总", yesterday:"64 笔",  month:"342 笔", sub:"不含未支付和失败订单" },
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
              <SectionTitle title="商品销量排行榜" action={<span className="text-xs text-[#94A3B8]">默认展示 TOP 10</span>} />
              <table className="w-full text-sm mt-3 mb-7">
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                    {["排名","商品名称","销量","销售额"].map(h => (
                      <th key={h} className="py-2.5 px-3 text-left text-xs font-medium text-[#64748B]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {SALES_RANK.map(r => (
                    <tr key={r.rank} className="border-b border-[#F1F5F9] hover:bg-[#F8FAFC]">
                      <td className="py-2.5 px-3">
                        <span className={`inline-flex w-6 h-6 items-center justify-center rounded-full text-xs font-bold
                          ${r.rank===1?"bg-[#FEF9C3] text-[#CA8A04]":r.rank===2?"bg-[#F1F5F9] text-[#475569]":r.rank===3?"bg-[#FFF7ED] text-[#C2410C]":"text-[#94A3B8]"}`}>
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

          {/* ── 补货记录 ── */}
          {tab === "补货记录" && (
            <div>
              <SectionTitle title="补货记录" action={<span className="text-xs text-[#94A3B8]">默认展示最近 3 个月</span>} />
              <table className="w-full text-sm mt-3">
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                    {["补货单号","补货批次","创建人员","履约人员","补货时间","补货件数","履约完成时间","状态","操作"].map(h => (
                      <th key={h} className="py-2.5 px-3 text-left text-xs font-medium text-[#64748B] whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {RESTOCK_ROWS.map((r, i) => (
                    <tr key={r.id} className="border-b border-[#F1F5F9] hover:bg-[#F8FAFC]">
                      <td className="py-3 px-3 font-mono text-xs text-[#2563EB]">{r.id}</td>
                      <td className="py-3 px-3 text-[#334155]">{r.batch}</td>
                      <td className="py-3 px-3 text-[#334155]">{r.creator}</td>
                      <td className="py-3 px-3 text-[#334155]">{r.executor}</td>
                      <td className="py-3 px-3 text-xs text-[#64748B] whitespace-nowrap">{r.time}</td>
                      <td className="py-3 px-3 font-medium text-[#0F172A]">{r.qty} 件</td>
                      <td className="py-3 px-3 text-xs text-[#64748B] whitespace-nowrap">{r.done}</td>
                      <td className="py-3 px-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium
                          ${r.status==="已完成"?"bg-[#F0FDF4] text-[#16A34A]":"bg-[#FFFBEB] text-[#D97706]"}`}>
                          {r.status}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <button onClick={() => setRestockDetail(i)} className="text-xs text-[#2563EB] hover:underline">详情</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* 补货单详情弹窗 */}
              {restockDetail !== null && (() => { const r = RESTOCK_ROWS[restockDetail]; return (
                <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center" onClick={() => setRestockDetail(null)}>
                  <div className="bg-white rounded-2xl p-6 max-w-3xl w-full mx-4 shadow-2xl max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-[#0F172A]">补货单详情</span>
                        <span className="font-mono text-xs font-semibold text-[#2563EB]">{r.id}</span>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium
                          ${r.status==="已完成"?"bg-[#F0FDF4] text-[#16A34A]":"bg-[#FFFBEB] text-[#D97706]"}`}>
                          {r.status}
                        </span>
                      </div>
                      <button onClick={() => setRestockDetail(null)} className="w-7 h-7 rounded-full bg-[#F1F5F9] flex items-center justify-center hover:bg-[#E2E8F0]">
                        <Icon d={Icons.x} size={14} className="text-[#64748B]" />
                      </button>
                    </div>
                    <div className="grid grid-cols-3 gap-x-8 gap-y-4">
                      {[
                        { l: "补货单号",       v: <span className="font-mono text-xs">{r.id}</span> },
                        { l: "补货批次",       v: <span>{r.batch}</span> },
                        { l: "补货件数",       v: <span className="font-medium text-[#0F172A]">{r.qty} 件</span> },
                        { l: "创建人员",       v: <span>{r.creator}</span> },
                        { l: "履约人员",       v: <span>{r.executor}</span> },
                        { l: "补货时间",       v: <span>{r.time}</span> },
                        { l: "履约完成时间", v: <span>{r.done}</span> },
                      ].map(f => (
                        <div key={f.l}>
                          <div className="text-xs text-[#94A3B8] mb-1">{f.l}</div>
                          <div className="text-sm text-[#334155]">{f.v}</div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-5">
                      <div className="text-xs font-semibold text-[#64748B] mb-2">商品明细</div>
                      <table className="w-full text-sm border border-[#F1F5F9] rounded-lg overflow-hidden">
                        <thead>
                          <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                            {["商品名称","规格","摆放层","补货数量"].map(h => (
                              <th key={h} className="py-2 px-3 text-left text-xs font-medium text-[#64748B] whitespace-nowrap">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {r.lines.map((ln, j) => (
                            <tr key={j} className="border-b border-[#F1F5F9] last:border-0">
                              <td className="py-2 px-3 text-[#334155]">{ln.name}</td>
                              <td className="py-2 px-3 text-[#64748B]">{ln.spec}</td>
                              <td className="py-2 px-3 text-[#64748B]">{ln.layer}</td>
                              <td className="py-2 px-3 font-medium text-[#0F172A]">{ln.qty} 件</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ); })()}
            </div>
          )}

        </div>
      </Card>
    </div>
  );
};