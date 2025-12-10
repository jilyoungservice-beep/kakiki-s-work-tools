import React from 'react';
import { ContractData, ContractType, Party, ContractItem } from '../types';
import { GeminiAssistant } from './GeminiAssistant';
import { Trash2, PlusCircle, Printer, FileText, Truck } from 'lucide-react';

interface Props {
  data: ContractData;
  onChange: (data: ContractData) => void;
  onPrint: () => void;
}

export const ContractForm: React.FC<Props> = ({ data, onChange, onPrint }) => {
  const updateParty = (party: 'partyA' | 'partyB', field: keyof Party, value: string) => {
    onChange({
      ...data,
      [party]: { ...data[party], [field]: value },
    });
  };

  const updateClause = (key: keyof typeof data.clauses, value: string) => {
    onChange({
      ...data,
      clauses: { ...data.clauses, [key]: value },
    });
  };

  const addItem = () => {
    const newItem: ContractItem = {
      id: Math.random().toString(36).substr(2, 9),
      description: '',
      quantity: 1,
      unit: '件',
      unitPrice: 0,
    };
    onChange({ ...data, items: [...data.items, newItem] });
  };

  const removeItem = (id: string) => {
    onChange({ ...data, items: data.items.filter((i) => i.id !== id) });
  };

  const updateItem = (id: string, field: keyof ContractItem, value: string | number) => {
    onChange({
      ...data,
      items: data.items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    });
  };

  const totalAmount = data.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-xl">
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">智能合同生成器</h1>
          <p className="text-gray-500 text-sm">快速生成带电子印章的专业合同</p>
        </div>
        <button
          onClick={onPrint}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium shadow transition-colors"
        >
          <Printer className="w-5 h-5" />
          预览与打印
        </button>
      </div>

      {/* Contract Type Selection */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <button
          onClick={() => onChange({ ...data, type: ContractType.PROCUREMENT })}
          className={`flex items-center justify-center gap-2 p-4 rounded-lg border-2 transition-all ${
            data.type === ContractType.PROCUREMENT
              ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
              : 'border-gray-200 hover:border-gray-300 text-gray-600'
          }`}
        >
          <FileText className="w-5 h-5" />
          <span className="font-semibold">采购合同 (Procurement)</span>
        </button>
        <button
          onClick={() => onChange({ ...data, type: ContractType.FREIGHT })}
          className={`flex items-center justify-center gap-2 p-4 rounded-lg border-2 transition-all ${
            data.type === ContractType.FREIGHT
              ? 'border-blue-500 bg-blue-50 text-blue-700'
              : 'border-gray-200 hover:border-gray-300 text-gray-600'
          }`}
        >
          <Truck className="w-5 h-5" />
          <span className="font-semibold">货运代理合同 (Freight)</span>
        </button>
      </div>

      <div className="space-y-8">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">合同编号</label>
            <input
              type="text"
              value={data.contractNumber}
              onChange={(e) => onChange({ ...data, contractNumber: e.target.value })}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">签订日期</label>
            <input
              type="date"
              value={data.date}
              onChange={(e) => onChange({ ...data, date: e.target.value })}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
        </div>

        {/* Parties */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-4 border-b pb-2">
              {data.type === ContractType.PROCUREMENT ? '甲方 (采购方 / Buyer)' : '甲方 (托运人 / Shipper)'}
            </h3>
            <div className="space-y-3">
              <input
                placeholder="公司名称"
                value={data.partyA.name}
                onChange={(e) => updateParty('partyA', 'name', e.target.value)}
                className="w-full px-3 py-2 border rounded text-sm"
              />
              <input
                placeholder="地址"
                value={data.partyA.address}
                onChange={(e) => updateParty('partyA', 'address', e.target.value)}
                className="w-full px-3 py-2 border rounded text-sm"
              />
              <input
                placeholder="法定代表人/授权代表"
                value={data.partyA.representative}
                onChange={(e) => updateParty('partyA', 'representative', e.target.value)}
                className="w-full px-3 py-2 border rounded text-sm"
              />
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-4 border-b pb-2">
              {data.type === ContractType.PROCUREMENT ? '乙方 (供货方 / Seller)' : '乙方 (承运方 / Forwarder)'}
            </h3>
            <div className="space-y-3">
              <input
                placeholder="公司名称"
                value={data.partyB.name}
                onChange={(e) => updateParty('partyB', 'name', e.target.value)}
                className="w-full px-3 py-2 border rounded text-sm"
              />
              <input
                placeholder="地址"
                value={data.partyB.address}
                onChange={(e) => updateParty('partyB', 'address', e.target.value)}
                className="w-full px-3 py-2 border rounded text-sm"
              />
              <input
                placeholder="法定代表人/授权代表"
                value={data.partyB.representative}
                onChange={(e) => updateParty('partyB', 'representative', e.target.value)}
                className="w-full px-3 py-2 border rounded text-sm"
              />
            </div>
          </div>
        </div>

        {/* Items */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-gray-800">
              {data.type === ContractType.PROCUREMENT ? '采购产品清单' : '货物详情'}
            </h3>
            <button onClick={addItem} className="text-sm text-indigo-600 font-medium flex items-center gap-1 hover:text-indigo-800">
              <PlusCircle className="w-4 h-4" /> 添加项目
            </button>
          </div>
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-600 font-medium">
                <tr>
                  <th className="px-4 py-2 w-1/2">品名/规格</th>
                  <th className="px-4 py-2">数量</th>
                  <th className="px-4 py-2">单位</th>
                  <th className="px-4 py-2">单价 (元)</th>
                  <th className="px-4 py-2 text-right">小计</th>
                  <th className="px-4 py-2 w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {data.items.map((item) => (
                  <tr key={item.id} className="bg-white">
                    <td className="p-2">
                      <input
                        value={item.description}
                        onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                        className="w-full px-2 py-1 border rounded"
                        placeholder="输入项目名称"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                        className="w-full px-2 py-1 border rounded"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        value={item.unit}
                        onChange={(e) => updateItem(item.id, 'unit', e.target.value)}
                        className="w-full px-2 py-1 border rounded"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        value={item.unitPrice}
                        onChange={(e) => updateItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                        className="w-full px-2 py-1 border rounded"
                      />
                    </td>
                    <td className="p-2 text-right font-medium">
                      ¥{(item.quantity * item.unitPrice).toFixed(2)}
                    </td>
                    <td className="p-2 text-center">
                      <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50 font-semibold">
                <tr>
                  <td colSpan={4} className="px-4 py-2 text-right">总计金额:</td>
                  <td className="px-4 py-2 text-right text-lg text-indigo-700">¥{totalAmount.toFixed(2)}</td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Clauses with Gemini AI */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-4 border-b pb-2">合同条款 (AI 辅助)</h3>
          
          <div className="grid gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">付款条款</label>
              <GeminiAssistant 
                contractType={data.type === ContractType.PROCUREMENT ? "采购合同" : "物流运输合同"}
                label="付款方式" 
                onAccept={(text) => updateClause('payment', text)} 
              />
              <textarea
                value={data.clauses.payment}
                onChange={(e) => updateClause('payment', e.target.value)}
                className="w-full px-3 py-2 border rounded-md h-24 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">交付/运输条款</label>
              <GeminiAssistant 
                contractType={data.type === ContractType.PROCUREMENT ? "采购合同" : "物流运输合同"}
                label="交付" 
                onAccept={(text) => updateClause('delivery', text)} 
              />
              <textarea
                value={data.clauses.delivery}
                onChange={(e) => updateClause('delivery', e.target.value)}
                className="w-full px-3 py-2 border rounded-md h-24 text-sm"
              />
            </div>
             
             <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">争议解决</label>
              <textarea
                value={data.clauses.dispute}
                onChange={(e) => updateClause('dispute', e.target.value)}
                className="w-full px-3 py-2 border rounded-md h-20 text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};