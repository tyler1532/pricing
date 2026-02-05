
import React from 'react';
import { YearlyResult } from '../types';
import { formatCurrency } from '../utils/calculations';

interface YearlyBreakdownProps {
  data: YearlyResult[];
  category: string;
}

const YearlyBreakdown: React.FC<YearlyBreakdownProps> = ({ data, category }) => {
  const isSpecialistModel = category === '[국내원오빌/PMS_수주전문점]도어락' || category === '[국내 원오빌/PMS_수주전문점]알파';

  const TableHeader = () => (
    <thead>
      <tr className="border-b border-slate-100">
        <th className="py-2.5 px-1 text-[9px] font-black text-slate-400 uppercase tracking-tighter w-1/4">구분</th>
        {[1, 2, 3, 4, 5].map(y => (
          <th key={y} className="py-2.5 px-0.5 text-center text-[9px] font-black text-slate-400 uppercase tracking-tighter">{y}년차</th>
        ))}
      </tr>
    </thead>
  );

  return (
    <div className="space-y-4">
      {/* 1. 직방(당사) 상세 내역 */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span className="p-1.5 bg-blue-50 rounded-lg text-blue-600">🏠</span>
          직방(당사) 공헌이익 상세 내역
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[500px]">
            <TableHeader />
            <tbody className="text-[11px]">
              <tr className="border-b border-slate-50">
                <td className="py-2.5 px-1 font-bold text-slate-600">판매총액 (공급가)</td>
                {data.map(y => <td key={y.year} className="py-2.5 px-0.5 text-center font-semibold text-blue-600">{formatCurrency(y.zigbang?.totalSales ?? y.totalSales)}</td>)}
              </tr>
              <tr className="border-b border-slate-50">
                <td className="py-2.5 px-1 font-bold text-slate-600">연간이용료수익 (당사배분)</td>
                {data.map(y => <td key={y.year} className="py-2.5 px-0.5 text-center font-semibold text-emerald-600">{formatCurrency(y.zigbang?.annualSubscription ?? y.annualSubscription)}</td>)}
              </tr>
              <tr className="border-b border-slate-50">
                <td className="py-2.5 px-1 font-bold text-slate-600">연간운영비</td>
                {data.map(y => <td key={y.year} className="py-2.5 px-0.5 text-center text-rose-400">{formatCurrency(y.zigbang?.annualOpCost ?? y.annualOpCost)}</td>)}
              </tr>
              <tr className="border-b border-slate-50">
                <td className="py-2.5 px-1 font-bold text-slate-600">개발비 (3년배분)</td>
                {data.map(y => <td key={y.year} className="py-2.5 px-0.5 text-center text-rose-400">{formatCurrency(y.zigbang?.developmentCost ?? y.developmentCost)}</td>)}
              </tr>
              <tr className="border-b border-slate-50">
                <td className="py-2.5 px-1 font-bold text-slate-600">CS (1년무상/비용)</td>
                {data.map(y => <td key={y.year} className="py-2.5 px-0.5 text-center text-rose-400">{formatCurrency(y.zigbang?.csCost ?? y.csCost)}</td>)}
              </tr>
              <tr className="border-b border-slate-50">
                <td className="py-2.5 px-1 font-bold text-slate-600">제품원가</td>
                {data.map(y => <td key={y.year} className="py-2.5 px-0.5 text-center font-semibold text-rose-500">{formatCurrency(y.zigbang?.productCost ?? y.productInstallCost)}</td>)}
              </tr>
              <tr className="border-b border-slate-50 bg-blue-50/30">
                <td className="py-2.5 px-1 font-black text-blue-700">년차별 공헌이익</td>
                {data.map(y => <td key={y.year} className="py-2.5 px-0.5 text-center font-bold text-blue-800">{formatCurrency(y.annualContributionMargin)}</td>)}
              </tr>
              <tr className="bg-slate-900 text-white font-black">
                <td className="py-3 px-2 rounded-l-xl text-xs">직방 누적 공헌이익</td>
                {data.map(y => <td key={y.year} className={`py-3 px-0.5 text-center text-xs ${y.year === 5 ? 'rounded-r-xl' : ''}`}>{formatCurrency(y.cumulativeContributionMargin)}</td>)}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. 수주전문점 상세 내역 (수주전문점 모델일 때만 표시) */}
      {isSpecialistModel && (
        <div className="bg-slate-50 p-4 rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span className="p-1.5 bg-amber-50 rounded-lg text-amber-600">🤝</span>
            수주전문점 공헌이익 상세 내역
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <TableHeader />
              <tbody className="text-[11px]">
                <tr className="border-b border-slate-200">
                  <td className="py-2.5 px-1 font-bold text-slate-600">판매총액 (소비자판가)</td>
                  {data.map(y => <td key={y.year} className="py-2.5 px-0.5 text-center font-semibold text-blue-600">{y.specialist ? formatCurrency(y.specialist.totalSales) : '-'}</td>)}
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="py-2.5 px-1 font-bold text-slate-600">연간이용료 (전문점 몫)</td>
                  {data.map(y => <td key={y.year} className="py-2.5 px-0.5 text-center font-semibold text-emerald-600">{y.specialist ? formatCurrency(y.specialist.annualSubscription) : '-'}</td>)}
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="py-2.5 px-1 font-bold text-slate-600">사입가 (당사 공급가)</td>
                  {data.map(y => <td key={y.year} className="py-2.5 px-0.5 text-center font-semibold text-rose-500">{y.specialist?.purchaseCost ? formatCurrency(y.specialist.purchaseCost) : '-'}</td>)}
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="py-2.5 px-1 font-bold text-slate-600">설치비</td>
                  {data.map(y => <td key={y.year} className="py-2.5 px-0.5 text-center font-semibold text-rose-400">{y.specialist?.installCost ? formatCurrency(y.specialist.installCost) : '-'}</td>)}
                </tr>
                <tr className="border-b border-slate-200 bg-amber-50/50">
                  <td className="py-2.5 px-1 font-black text-amber-700">전문점 년차별 마진</td>
                  {data.map(y => <td key={y.year} className="py-2.5 px-0.5 text-center font-bold text-amber-800">{y.specialist ? formatCurrency(y.specialist.margin) : '-'}</td>)}
                </tr>
                <tr className="bg-slate-900 text-white font-black">
                  <td className="py-3 px-2 rounded-l-xl text-xs">전문점 누적 마진</td>
                  {data.map(y => <td key={y.year} className={`py-3 px-0.5 text-center text-xs ${y.year === 5 ? 'rounded-r-xl' : ''}`}>{y.specialist ? formatCurrency(y.specialist.cumulativeMargin) : '-'}</td>)}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default YearlyBreakdown;
