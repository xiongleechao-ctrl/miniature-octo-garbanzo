
import { PromoterType, Store } from './types';

export const STORES: Store[] = [
  { id: 'S001', name: '市中心旗舰店' },
  { id: 'S002', name: '城西生活广场店' },
  { id: 'S003', name: '东部新区店' },
  { id: 'S004', name: '北港支店' }
];

export const FEE_CONFIG = {
  [PromoterType.TEMP]: {
    deposit: 200,
    trainingFee: 50,
    badgeFee: 20,
    managementBaseRate: 10
  },
  [PromoterType.SHORT]: {
    deposit: 500,
    trainingFee: 100,
    badgeFee: 20,
    managementBaseRate: 15
  },
  [PromoterType.LONG]: {
    deposit: 1000,
    trainingFee: 200,
    badgeFee: 50,
    managementBaseRate: 20
  }
};
