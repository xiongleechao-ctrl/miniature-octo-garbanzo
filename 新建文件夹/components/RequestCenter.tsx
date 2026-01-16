
import React, { useState, useEffect } from 'react';
import { 
  UserPlus, 
  UserMinus, 
  RefreshCcw, 
  Clock, 
  Info,
  DollarSign,
  Search
} from 'lucide-react';
import { PromoterType, RequestType } from '../types';
import { STORES, FEE_CONFIG } from '../constants';

const RequestCenter: React.FC = () => {
  const [activeType, setActiveType] = useState<RequestType>(RequestType.ENTRY);
  const [formData, setFormData] = useState({
    type: PromoterType.TEMP,
  });

  const [fees, setFees] = useState({
    deposit: 0,
    trainingFee: 0,
    badgeFee: 0,
  });

  useEffect(() => {
    if (activeType === RequestType.ENTRY) {
      const config = FEE_CONFIG[formData.type];
      setFees({
        deposit: config.deposit,
        trainingFee: config.trainingFee,
        badgeFee: config.badgeFee,
      });
    }
  }, [formData.type, activeType]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`申请单已提交（${activeType}）！正在进入二级审核流程。`);
  };

  const types = [
    { id: RequestType.ENTRY, label: '入职申请', icon: UserPlus, color: 'indigo' },
    { id: RequestType.EXIT, label: '离职申请', icon: UserMinus, color: 'rose' },
    { id: RequestType.TRANSFER, label: '调店申请', icon: RefreshCcw, color: 'amber' },
    { id: RequestType.MODIFY, label: '修改时间', icon: Clock, color: 'sky' }
  ];

  return (
    <div className="max-w-4xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {types.map((type) => (
          <button
            key={type.id}
            onClick={() => setActiveType(type.id)}
            className={`p-4 rounded-2xl border-2 flex flex-col items-center justify-center transition-all ${
              activeType === type.id 
                ? `border-${type.color}-500 bg-${type.color}-50 text-${type.color}-700 shadow-inner` 
                : 'border-slate-100 bg-white text-slate-400 hover:border-slate-200'
            }`}
          >
            <type.icon className={`w-6 h-6 mb-2 ${activeType === type.id ? `text-${type.color}-500` : ''}`} />
            <span className="text-sm font-bold">{type.label}</span>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        <div className="p-8 border-b border-slate-100 bg-slate-50/50">
          <h3 className="text-xl font-bold text-slate-800">新建 {activeType}</h3>
          <p className="text-sm text-slate-500 mt-1">请填写以下信息以启动二级审核流程。</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeType === RequestType.ENTRY ? (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">姓名</label>
                  <input type="text" placeholder="请输入姓名" className="w-full px-4 py-2 rounded-xl border-slate-200 focus:ring-indigo-500" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">身份证号</label>
                  <input type="text" placeholder="18位身份证号" className="w-full px-4 py-2 rounded-xl border-slate-200" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">促销员类型</label>
                  <select 
                    value={formData.type} 
                    onChange={(e) => setFormData({...formData, type: e.target.value as PromoterType})}
                    className="w-full px-4 py-2 rounded-xl border-slate-200"
                  >
                    <option value={PromoterType.TEMP}>临促 (临时促销)</option>
                    <option value={PromoterType.SHORT}>短促 (短期促销)</option>
                    <option value={PromoterType.LONG}>长促 (长期促销)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">分配门店</label>
                  <select className="w-full px-4 py-2 rounded-xl border-slate-200">
                    {STORES.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">促销开始时间</label>
                  <input type="date" className="w-full px-4 py-2 rounded-xl border-slate-200" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">促销结束时间</label>
                  <input type="date" className="w-full px-4 py-2 rounded-xl border-slate-200" required />
                </div>
              </>
            ) : (
              <div className="md:col-span-2 space-y-6">
                 <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">选择促销员</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type="text" placeholder="输入姓名或工号搜索..." className="w-full pl-10 pr-4 py-2 rounded-xl border-slate-200" />
                  </div>
                </div>

                {activeType === RequestType.EXIT && (
                  <div className="bg-rose-50 p-6 rounded-2xl border border-rose-100 flex items-start space-x-4">
                    <div className="p-2 bg-rose-100 rounded-lg">
                      <DollarSign className="w-5 h-5 text-rose-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-rose-800">退费明细汇总</h4>
                      <p className="text-sm text-rose-600 mt-1">审核通过后，将按流程退还以下费用：</p>
                      <ul className="mt-3 space-y-1 text-sm font-medium text-rose-700">
                        <li>• 培训费退还: ¥100</li>
                        <li>• 工牌费退还: ¥20</li>
                        <li className="pt-2 font-bold text-rose-900 border-t border-rose-200">合计退费: ¥120</li>
                      </ul>
                    </div>
                  </div>
                )}

                {activeType === RequestType.TRANSFER && (
                  <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">当前门店</label>
                        <input type="text" disabled value="市中心旗舰店" className="w-full px-4 py-2 rounded-xl bg-slate-100 border-slate-200 text-slate-500" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">目标门店</label>
                        <select className="w-full px-4 py-2 rounded-xl border-slate-200">
                          {STORES.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                        </select>
                      </div>
                  </div>
                )}

                {activeType === RequestType.MODIFY && (
                   <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">原结束日期</label>
                        <input type="text" disabled value="2023-12-31" className="w-full px-4 py-2 rounded-xl bg-slate-100 border-slate-200 text-slate-500" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">新结束日期</label>
                        <input type="date" className="w-full px-4 py-2 rounded-xl border-slate-200 shadow-sm" />
                      </div>
                   </div>
                )}
              </div>
            )}
          </div>

          {activeType === RequestType.ENTRY && (
            <div className="mt-10 pt-8 border-t border-slate-100">
              <div className="flex items-center space-x-2 mb-6">
                <DollarSign className="w-5 h-5 text-indigo-500" />
                <h4 className="font-bold text-slate-800 uppercase tracking-wider text-sm">费用明细 (入职缴纳)</h4>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">押金</p>
                  <p className="text-lg font-bold text-slate-800">¥{fees.deposit}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">培训费</p>
                  <p className="text-lg font-bold text-slate-800">¥{fees.trainingFee}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">工牌费</p>
                  <p className="text-lg font-bold text-slate-800">¥{fees.badgeFee}</p>
                </div>
                <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
                  <p className="text-[10px] text-indigo-500 font-bold uppercase mb-1">首期合计缴纳</p>
                  <p className="text-lg font-bold text-indigo-700">¥{fees.deposit + fees.trainingFee + fees.badgeFee}</p>
                </div>
              </div>
              <div className="mt-4 p-4 bg-amber-50 rounded-xl flex items-center space-x-3 text-amber-700 border border-amber-100">
                <Info className="w-5 h-5 flex-shrink-0" />
                <p className="text-xs leading-relaxed">
                  <strong>管理费说明：</strong> 供应商管理费将根据上月实际促销天数，在次月自动从系统扣除。
                </p>
              </div>
            </div>
          )}

          <div className="mt-12 flex justify-end space-x-4">
            <button type="button" className="px-6 py-3 rounded-xl text-slate-600 font-semibold hover:bg-slate-100 transition-colors">
              取消
            </button>
            <button type="submit" className="bg-slate-900 text-white px-10 py-3 rounded-xl font-bold hover:bg-slate-800 shadow-lg shadow-slate-900/20 transition-all active:scale-95">
              提交申请单
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestCenter;
