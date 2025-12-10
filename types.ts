export enum ContractType {
  PROCUREMENT = 'PROCUREMENT',
  FREIGHT = 'FREIGHT',
}

export interface Party {
  name: string;
  address: string;
  representative: string;
  phone: string;
}

export interface ContractItem {
  id: string;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
}

export interface ContractData {
  type: ContractType;
  contractNumber: string;
  date: string;
  partyA: Party;
  partyB: Party;
  items: ContractItem[];
  clauses: {
    payment: string;
    delivery: string;
    inspection: string;
    dispute: string;
    custom: string;
  };
}

export const INITIAL_DATA: ContractData = {
  type: ContractType.PROCUREMENT,
  contractNumber: `CTR-${new Date().getFullYear()}-001`,
  date: new Date().toISOString().split('T')[0],
  partyA: {
    name: '未来科技股份有限公司',
    address: '北京市海淀区科技园路88号',
    representative: '张三',
    phone: '010-12345678',
  },
  partyB: {
    name: '环球供应链有限公司',
    address: '深圳市南山区高新南道99号',
    representative: '李四',
    phone: '0755-87654321',
  },
  items: [
    { id: '1', description: '高性能处理器 A1', quantity: 1000, unit: '个', unitPrice: 250.50 },
    { id: '2', description: '装配模组 B2', quantity: 500, unit: '套', unitPrice: 1500.00 },
  ],
  clauses: {
    payment: '合同签订后3个工作日内，甲方向乙方支付合同总额的30%作为预付款；剩余70%款项应在发货前付清。付款方式为银行转账。',
    delivery: '乙方应在收到预付款后45天内将货物运送至甲方指定仓库。运输费用及保险费由乙方承担。',
    inspection: '甲方有权在收到货物后3日内进行验收。如发现货物规格、数量或质量与合同不符，甲方有权要求退换货或索赔。',
    dispute: '本合同履行过程中发生的一切争议，双方应通过友好协商解决。如协商不成，任何一方均可向甲方所在地人民法院提起诉讼。',
    custom: '',
  },
};