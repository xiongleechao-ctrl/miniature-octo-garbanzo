
import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Eye, 
  MessageSquare, 
  Clock, 
  ChevronRight,
  Filter,
  User
} from 'lucide-react';
import { RequestType, RequestStatus } from '../types';

const ApprovalCenter: React.FC = () => {
  const [filter, setFilter] = useState('全部');
  
  const approvals = [
    { 
      id: 'REQ-1001', 
      type: RequestType.ENTRY, 
      applicant: '李伟', 
      date: '2023-11-20', 
      status: RequestStatus.PENDING_T1,
      priority: '高',
      store: '市中心旗舰店'
    },
    { 
      id: 'REQ-1002', 
      type: RequestType.EXIT, 
      applicant: '王俊', 
      date: '2023-11-19', 
      status: RequestStatus.PENDING_T2,
      priority: '普通',
      store: '城西生活广场店'
    },
    { 
      id: 'REQ-1003', 
      type: RequestType.TRANSFER, 
      applicant: '张敏', 
      date: '2023-11-19', 
      status: RequestStatus.PENDING_T1,
      priority: '普通',
      store: '北港支店'
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-sm font-medium text-slate-500">筛选单据:</span>
          {['全部', '待部门审核', '待店长审核', '加急'].map(f => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all ${
                filter === f ? 'bg-indigo-600 text-white shadow-md' : 'bg-white border border-slate-200 text-slate-500 hover:border-slate-300'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {approvals.map((req) => (
          <div key={req.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  req.type === RequestType.ENTRY ? 'bg-emerald-50 text-emerald-600' :
                  req.type === RequestType.EXIT ? 'bg-rose-50 text-rose-600' :
                  req.type === RequestType.TRANSFER ? 'bg-amber-50 text-amber-600' : 'bg-sky-50 text-sky-600'
                }`}>
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-bold text-slate-800">{req.applicant}</h4>
                    <span className="text-[10px] bg-slate-100 text-slate-500 font-bold px-1.5 py-0.5 rounded">单号: {req.id}</span>
                  </div>
                  <div className="flex items-center text-xs text-slate-500 space-x-2 mt-0.5">
                    <span className="font-medium text-indigo-600">{req.type}</span>
                    <span>•</span>
                    <span>{req.store}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-8">
                <div className="text-right">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">当前状态</p>
                  <div className="flex items-center mt-1">
                    <Clock className={`w-3.5 h-3.5 mr-1.5 ${req.status.includes('T1') ? 'text-amber-500' : 'text-indigo-500'}`} />
                    <span className={`text-xs font-bold ${req.status.includes('T1') ? 'text-amber-600' : 'text-indigo-600'}`}>
                      {req.status}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" title="查看详情">
                    <Eye className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all" title="驳回申请">
                    <XCircle className="w-5 h-5" />
                  </button>
                  <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-bold text-xs hover:bg-emerald-600 shadow-lg shadow-emerald-500/20 transition-all flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>通过审核</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 二级审核流程进度展示 */}
            <div className="mt-6 pt-6 border-t border-slate-100 flex items-center">
              <div className="flex items-center flex-1 max-w-lg">
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 mt-1">提交申请</span>
                </div>
                <div className={`flex-1 h-0.5 mx-2 ${req.status === RequestStatus.PENDING_T1 ? 'bg-slate-200' : 'bg-emerald-500'}`}></div>
                <div className="flex flex-col items-center">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white ${
                    req.status === RequestStatus.PENDING_T1 ? 'bg-amber-400 animate-pulse shadow-lg shadow-amber-400/30' : 'bg-emerald-500'
                  }`}>
                    {req.status === RequestStatus.PENDING_T1 ? <Clock className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-4 h-4" />}
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 mt-1">部门负责人 (T1)</span>
                </div>
                <div className={`flex-1 h-0.5 mx-2 ${req.status === RequestStatus.PENDING_T2 ? 'bg-amber-400 animate-pulse' : req.status === RequestStatus.PENDING_T1 ? 'bg-slate-200' : 'bg-emerald-500'}`}></div>
                <div className="flex flex-col items-center">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white ${
                    req.status === RequestStatus.PENDING_T2 ? 'bg-amber-400 animate-pulse shadow-lg shadow-amber-400/30' : 'bg-slate-200'
                  }`}>
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 mt-1">店长审核 (T2)</span>
                </div>
              </div>
              
              <div className="ml-auto flex items-center text-xs text-slate-400">
                <MessageSquare className="w-4 h-4 mr-1.5" />
                <span>3 条备注</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApprovalCenter;
