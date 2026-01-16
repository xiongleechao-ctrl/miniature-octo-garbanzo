
import React, { useState } from 'react';
import { 
  Users, 
  FilePlus, 
  CheckSquare, 
  LayoutDashboard, 
  Bell,
  Search
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import PromoterList from './components/PromoterList';
import RequestCenter from './components/RequestCenter';
import ApprovalCenter from './components/ApprovalCenter';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'promoters' | 'requests' | 'approvals'>('dashboard');

  const navigation = [
    { name: '控制面板', icon: LayoutDashboard, id: 'dashboard' },
    { name: '促销员名册', icon: Users, id: 'promoters' },
    { name: '申请中心', icon: FilePlus, id: 'requests' },
    { name: '审核中心', icon: CheckSquare, id: 'approvals', badge: 4 },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* 侧边栏 */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col flex-shrink-0">
        <div className="p-6 flex items-center space-x-3 border-b border-slate-800">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
            <Users className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">促销管理系统</span>
        </div>
        
        <nav className="flex-1 px-4 space-y-1 mt-4">
          {navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                activeTab === item.id 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
              {item.badge && (
                <span className="ml-auto bg-rose-500 text-white text-[10px] px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 mt-auto">
          <div className="bg-slate-800 rounded-xl p-4 flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center overflow-hidden">
              <img src="https://picsum.photos/100/100" alt="头像" />
            </div>
            <div>
              <p className="text-sm font-medium">管理员</p>
              <p className="text-xs text-slate-500">门店运营经理</p>
            </div>
          </div>
        </div>
      </aside>

      {/* 主体内容 */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* 顶部栏 */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-10">
          <h2 className="text-lg font-semibold text-slate-800">
            {navigation.find(n => n.id === activeTab)?.name}
          </h2>
          <div className="flex items-center space-x-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="搜索申请单据..." 
                className="bg-slate-100 border-none rounded-full py-1.5 pl-10 pr-4 text-sm w-64 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        {/* 动态内容区 */}
        <div className="flex-1 overflow-y-auto p-8">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'promoters' && <PromoterList />}
          {activeTab === 'requests' && <RequestCenter />}
          {activeTab === 'approvals' && <ApprovalCenter />}
        </div>
      </main>
    </div>
  );
};

export default App;
