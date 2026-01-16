
export enum PromoterType {
  TEMP = '临时促销',
  SHORT = '短期促销',
  LONG = '长期促销'
}

export enum RequestType {
  ENTRY = '入职申请',
  EXIT = '离职申请',
  TRANSFER = '调店申请',
  MODIFY = '修改促销时间'
}

export enum RequestStatus {
  PENDING_T1 = '待部门审核 (T1)',
  PENDING_T2 = '待店长审核 (T2)',
  APPROVED = '审核通过',
  REJECTED = '已驳回'
}

export interface Promoter {
  id: string;
  name: string;
  idCard: string;
  type: PromoterType;
  storeId: string;
  storeName: string;
  startDate: string;
  endDate: string;
  status: '在职' | '离职' | '待处理';
}

export interface FeeDetails {
  deposit: number;
  trainingFee: number;
  badgeFee: number;
  managementFee?: number;
  refundAmount?: number;
}

export interface AuditLog {
  id: string;
  user: string;
  action: string;
  timestamp: string;
  comment?: string;
}

export interface RequestForm {
  id: string;
  type: RequestType;
  promoterId?: string;
  promoterData: Partial<Promoter>;
  fees: FeeDetails;
  status: RequestStatus;
  createdAt: string;
  submittedBy: string;
  auditLogs: AuditLog[];
  targetStoreId?: string;
  newEndDate?: string;
}

export interface Store {
  id: string;
  name: string;
}
