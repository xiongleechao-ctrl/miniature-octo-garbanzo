
import React from 'react';
import { MoreVertical, Calendar, Store } from 'lucide-react';
import { PromoterType } from '../types';

const PromoterList: React.FC = () => {
  const promoters = [
    { id: 'P001', name: '李伟', type: PromoterType.LONG, store: '市中心旗舰店', joinDate: '2023-01-15', status: '在职' },
    { id: 'P002', name: '张敏', type: PromoterType.SHORT, store: '城西生活广场店', joinDate: '2023-05-20', status: '在职' },
    { id: 'P003', name: '王俊', type: PromoterType.TEMP, store: '东部新区店', joinDate: '2023-11-01', status: '在职' },
    { id: 'P004', name: '陈露', type: PromoterType.LONG, store: '北港支店', joinDate: '2022-08-12', status: '请假中' },
    { id: 'P005', name: '赵凯', type: PromoterType.SHORT, store: '市中心旗舰店', joinDate: '2023-10-15', status: '在职' },
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/80 text-slate-500 uppercase text-[10px] font-bold tracking-widest border-b border-slate-100">
              <th className="px-8 py-5">促销员信息</th>
              <th className="px-8 py-5">类型</th>
              <th className="px-8 py-5">所属门店</th>
              <th className="px-8 py-5">入职日期</th>
              <th className="px-8 py-5">状态</th>
              <th className="px-8 py-5 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {promoters.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50 transition-colors group">
                <td className="px-8 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center font-bold text-indigo-600">
                      {p.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{p.name}</p>
                      <p className="text-[11px] text-slate-400 font-medium">工号: {p.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-4">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    p.type === PromoterType.LONG ? 'bg-indigo-100 text-indigo-600' : 
                    p.type === PromoterType.SHORT ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {p.type}
                  </span>
                </td>
                <td className="px-8 py-4">
                  <div className="flex items-center text-sm text-slate-600">
                    <Store className="w-3.5 h-3.5 mr-2 text-slate-400" />
                    {p.store}
                  </div>
                </td>
                <td className="px-8 py-4">
                  <div className="flex items-center text-sm text-slate-600">
                    <Calendar className="w-3.5 h-3.5 mr-2 text-slate-400" />
                    {p.joinDate}
                  </div>
                </td>
                <td className="px-8 py-4">
                  <span className={`inline-flex items-center text-[10px] font-bold ${
                    p.status === '在职' ? 'text-emerald-500' : 'text-slate-400'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full mr-2 ${
                      p.status === '在职' ? 'bg-emerald-500' : 'bg-slate-300'
                    }`}></span>
                    {p.status}
                  </span>
                </td>
                <td className="px-8 py-4 text-right">
                  <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-white rounded-lg transition-all">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-6 border-t border-slate-50 flex justify-between items-center bg-slate-50/30">
        <p className="text-xs text-slate-500 font-medium">当前显示 5 条，总计 1,284 条促销员记录</p>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg text-slate-500 hover:bg-white transition-all">上一页</button>
          <button className="px-3 py-1.5 text-xs bg-indigo-600 text-white rounded-lg font-bold shadow-md">下一页</button>
        </div>
      </div>
    </div>
  );
};

export default PromoterList;
