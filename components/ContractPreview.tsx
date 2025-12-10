import React from 'react';
import { ContractData, ContractType } from '../types';
import { Seal } from './Seal';

interface Props {
  data: ContractData;
}

export const ContractPreview: React.FC<Props> = ({ data }) => {
  const totalAmount = data.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);

  return (
    <div id="contract-preview" className="w-[210mm] min-h-[297mm] mx-auto bg-white p-[20mm] shadow-2xl print:shadow-none print:w-full print:h-auto print:p-0 print:m-0 text-black font-serif text-[12pt] leading-relaxed relative box-border">
      
      {/* Header */}
      <div className="text-center mb-10 pt-4">
        <h1 className="text-3xl font-bold tracking-widest border-b-2 border-black pb-3 inline-block mb-4 font-serif">
          {data.type === ContractType.PROCUREMENT ? '采 购 合 同' : '货 运 代 理 合 同'}
        </h1>
        <div className="flex justify-between mt-2 text-sm px-2">
          <span><strong>合同编号：</strong> {data.contractNumber}</span>
          <span><strong>签订日期：</strong> {data.date}</span>
        </div>
      </div>

      {/* Parties */}
      <div className="mb-6 space-y-4 text-sm px-2">
        <div className="flex">
          <div className="w-24 font-bold shrink-0">甲方：</div>
          <div className="flex-1">
            <p className="font-bold text-base">{data.partyA.name}</p>
            <p>地址：{data.partyA.address}</p>
            <p>授权代表：{data.partyA.representative}</p>
          </div>
        </div>
        
        <div className="flex">
          <div className="w-24 font-bold shrink-0">乙方：</div>
          <div className="flex-1">
             <p className="font-bold text-base">{data.partyB.name}</p>
            <p>地址：{data.partyB.address}</p>
            <p>授权代表：{data.partyB.representative}</p>
          </div>
        </div>
      </div>

      {/* Preamble */}
      <div className="mb-6 text-justify indent-8 px-2">
        <p>
          甲乙双方本着平等互利、协商一致的原则，根据《中华人民共和国民法典》及相关法律法规，就{data.type === ContractType.PROCUREMENT ? '甲方采购乙方货物' : '甲方委托乙方代理货物运输'}事宜，经友好协商，达成如下协议，以资共同遵守。
        </p>
      </div>

      {/* Article 1: Items */}
      <div className="mb-6 px-2">
        <h3 className="font-bold mb-2 text-sm">第一条：{data.type === ContractType.PROCUREMENT ? '采购标的' : '货物详情'}</h3>
        <table className="w-full border-collapse border border-black text-sm">
          <thead>
            <tr className="bg-gray-50 print:bg-gray-100">
              <th className="border border-black p-2 text-center w-[30%]">品名/规格</th>
              <th className="border border-black p-2 text-center w-[15%]">数量</th>
              <th className="border border-black p-2 text-center w-[15%]">单位</th>
              <th className="border border-black p-2 text-right w-[20%]">单价 (元)</th>
              <th className="border border-black p-2 text-right w-[20%]">金额 (元)</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item) => (
              <tr key={item.id}>
                <td className="border border-black p-2 text-center">{item.description}</td>
                <td className="border border-black p-2 text-center">{item.quantity}</td>
                <td className="border border-black p-2 text-center">{item.unit}</td>
                <td className="border border-black p-2 text-right">{item.unitPrice.toFixed(2)}</td>
                <td className="border border-black p-2 text-right">{(item.quantity * item.unitPrice).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={4} className="border border-black p-2 text-right font-bold">合计金额 (人民币)：</td>
              <td className="border border-black p-2 text-right font-bold">¥{totalAmount.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Terms Articles */}
      <div className="space-y-4 mb-10 px-2">
        <div>
          <h3 className="font-bold text-sm">第二条：付款方式</h3>
          <p className="text-justify indent-8 leading-relaxed">{data.clauses.payment}</p>
        </div>
        <div>
          <h3 className="font-bold text-sm">第三条：交付与运输</h3>
          <p className="text-justify indent-8 leading-relaxed">{data.clauses.delivery}</p>
        </div>
         <div>
          <h3 className="font-bold text-sm">第四条：验收标准</h3>
          <p className="text-justify indent-8 leading-relaxed">{data.clauses.inspection}</p>
        </div>
        <div>
          <h3 className="font-bold text-sm">第五条：争议解决</h3>
          <p className="text-justify indent-8 leading-relaxed">{data.clauses.dispute}</p>
        </div>
      </div>

      {/* Signatures & Seals */}
      <div className="mt-12 break-inside-avoid px-2">
        <div className="grid grid-cols-2 gap-16">
          {/* Party A */}
          <div className="relative">
            <div className="mb-8">
              <p className="font-bold text-lg mb-1">甲方（盖章）：</p>
              <p className="text-sm font-serif">{data.partyA.name}</p>
            </div>
            
            {/* Signature Line */}
            <div className="flex items-end mb-4">
              <span className="shrink-0 mr-2 text-sm">授权代表签字：</span>
              <div className="border-b border-black flex-1 h-6"></div>
            </div>
             <div className="flex items-end">
              <span className="shrink-0 mr-2 text-sm">日期：</span>
              <div className="border-b border-black flex-1 h-6"></div>
            </div>

            {/* Electronic Seal Overlay - Rotated Left */}
            <div className="absolute top-[-20px] left-[60px] opacity-80 mix-blend-multiply transform rotate-[-25deg] pointer-events-none print:opacity-100 print:mix-blend-normal">
                <Seal companyName={data.partyA.name} />
            </div>
          </div>

          {/* Party B */}
          <div className="relative">
             <div className="mb-8">
              <p className="font-bold text-lg mb-1">乙方（盖章）：</p>
              <p className="text-sm font-serif">{data.partyB.name}</p>
            </div>
            
            {/* Signature Line */}
            <div className="flex items-end mb-4">
              <span className="shrink-0 mr-2 text-sm">授权代表签字：</span>
              <div className="border-b border-black flex-1 h-6"></div>
            </div>
             <div className="flex items-end">
              <span className="shrink-0 mr-2 text-sm">日期：</span>
              <div className="border-b border-black flex-1 h-6"></div>
            </div>

            {/* Electronic Seal Overlay - Rotated Right for difference */}
            <div className="absolute top-[-20px] left-[60px] opacity-80 mix-blend-multiply transform rotate-[15deg] pointer-events-none print:opacity-100 print:mix-blend-normal">
                <Seal companyName={data.partyB.name} />
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-16 text-center text-xs text-gray-400 print:hidden">
        <p>（打印时此背景为白色，页边距将自动适配 A4 纸张）</p>
      </div>

    </div>
  );
};