
import React from 'react';
import { TrendingUp, Users, FileText, XCircle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: '周一', entries: 4, exits: 2 },
  { name: '周二', entries: 7, exits: 1 },
  { name: '周三', entries: 5, exits: 3 },
  { name: '周四', entries: 9, exits: 4 },
  { name: '周五', entries: 12, exits: 2 },
  { name: '周六', entries: 15, exits: 5 },
  { name: '周日', entries: 8, exits: 3 },
];

const StatCard = ({ title, value, change, icon: Icon, color }: any) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <span className={`text-xs font-medium px-2 py-1 rounded-full ${change >= 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
        {change >= 0 ? '+' : ''}{change}%
      </span>
    </div>
    <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
    <p className="text-2xl font-bold text-slate-800 mt-1">{value}</p>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="促销员总数" value="1,284" change={12.5} icon={Users} color="bg-indigo-500" />
        <StatCard title="待审核单据" value="24" change={-5} icon={FileText} color="bg-amber-500" />
        <StatCard title="本月入职" value="156" change={8.2} icon={TrendingUp} color="bg-emerald-500" />
        <StatCard title="已驳回申请" value="3" change={-20} icon={XCircle} color="bg-rose-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-800 text-lg">人员动态趋势</h3>
            <select className="text-sm border-slate-200 rounded-lg">
              <option>最近 7 天</option>
              <option>最近 30 天</option>
            </select>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorEntries" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Area type="monotone" name="入职" dataKey="entries" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorEntries)" />
                <Area type="monotone" name="离职" dataKey="exits" stroke="#f43f5e" strokeWidth={3} fillOpacity={0.1} fill="#f43f5e" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6 text-lg">最近动态</h3>
          <div className="space-y-6">
            {[
              { user: '李伟', action: '入职申请', time: '2分钟前', status: '待审核 T1', color: 'bg-amber-100 text-amber-600' },
              { user: '张敏', action: '申请调店', time: '15分钟前', status: '审核通过', color: 'bg-emerald-100 text-emerald-600' },
              { user: '王俊', action: '修改时间', time: '1小时前', status: '待审核 T2', color: 'bg-indigo-100 text-indigo-600' },
              { user: '陈露', action: '离职申请', time: '3小时前', status: '已驳回', color: 'bg-rose-100 text-rose-600' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-500">
                    {item.user[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{item.user}</p>
                    <p className="text-xs text-slate-500">{item.action}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${item.color}`}>
                    {item.status}
                  </span>
                  <p className="text-[10px] text-slate-400 mt-1">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
