
import React from 'react';
import { SummaryStats, BusinessCategory } from '../types';
import { formatCurrency, formatUSD } from '../utils/calculations';

interface SummaryCardsProps {
  stats: SummaryStats;
  category: BusinessCategory;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ stats, category }) => {
  const formatBEP = (months: number | null) => {
    if (months === null) return 'N/A';
    if (months === 0) return '즉시';
    return `${months}개월`;
  };

  const isSpecialistModel = category === '[국내원오빌/PMS_수주전문점]도어락' || category === '[국내 원오빌/PMS_수주전문점]알파';
  const isOverseasModel = category === '[해외원오빌/PMS]도어락' || category === '[해외원오빌/PMS]알파';

  // 데이터 추출
  const year1Data = stats.yearlyBreakdown[0];
  const year1Profit = year1Data?.annualContributionMargin ?? 0;
  const lastYearData = stats.yearlyBreakdown[stats.yearlyBreakdown.length - 1];
  const specialistCumulativeProfit = lastYearData?.specialist?.cumulativeMargin ?? 0;
  const totalCumulativeProfit = stats.fiveYearProfit + specialistCumulativeProfit;

  const cards = [
    {
      id: 'fee',
      label: '세대당 월 이용료 (배분)',
      value: isSpecialistModel 
        ? formatCurrency(stats.monthlyServiceFeeZigbang)
        : formatCurrency(stats.monthlyServiceFeePerHousehold),
      usd: isOverseasModel ? formatUSD(isSpecialistModel ? stats.monthlyServiceFeeZigbang : stats.monthlyServiceFeePerHousehold, stats.exchangeRate) : null,
      desc: isSpecialistModel 
        ? '당사(직방) 배분 수익' 
        : '(단지기본료+세대료) ÷ 세대수',
      color: 'bg-emerald-50 text-emerald-600',
      icon: '💳',
      extra: isSpecialistModel ? (
        <div className="mt-3 pt-3 border-t border-slate-100 space-y-1">
          <div className="flex justify-between items-center text-[10px] font-bold">
            <span className="text-slate-400 uppercase">전문점 몫(서비스이용료상승시에도 변동되지않음)</span>
            <span className="text-amber-600">{formatCurrency(stats.monthlyServiceFeeSpecialist)}</span>
          </div>
          <div className="flex justify-between items-center text-[10px] font-black">
            <span className="text-slate-500 uppercase">합계</span>
            <span className="text-slate-900">{formatCurrency(stats.monthlyServiceFeePerHousehold)}</span>
          </div>
        </div>
      ) : null
    },
    {
      id: 'year1Profit',
      label: '1년차 공헌이익',
      value: formatCurrency(year1Profit),
      usd: isOverseasModel ? formatUSD(year1Profit, stats.exchangeRate) : null,
      desc: '첫 해 예상 순이익 (비용 차감 후)',
      color: 'bg-indigo-50 text-indigo-600',
      icon: '💰'
    },
    {
      id: 'profit',
      label: '5년 누적 공헌이익',
      value: formatCurrency(stats.fiveYearProfit),
      usd: isOverseasModel ? formatUSD(stats.fiveYearProfit, stats.exchangeRate) : null,
      desc: isSpecialistModel ? '당사(직방) 관점 이익' : '당사(직방) 관점 총 예상 이익',
      color: 'bg-blue-50 text-blue-600',
      icon: '💎',
      extra: isSpecialistModel ? (
        <div className="mt-3 pt-3 border-t border-slate-100 space-y-1">
          <div className="flex justify-between items-center text-[10px] font-bold">
            <span className="text-slate-400 uppercase">전문점 누적</span>
            <span className="text-amber-600">{formatCurrency(specialistCumulativeProfit)}</span>
          </div>
          <div className="flex justify-between items-center text-[10px] font-black">
            <span className="text-slate-500 uppercase">합계 (직방+전문점)</span>
            <span className="text-slate-900">{formatCurrency(totalCumulativeProfit)}</span>
          </div>
        </div>
      ) : null
    },
    {
      id: 'bep',
      label: '손익분기점 (BEP)',
      value: formatBEP(stats.breakEvenMonth),
      desc: '당사 투자 회수 시점',
      color: 'bg-amber-50 text-amber-600',
      icon: '⚡'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card) => (
        <div key={card.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className={`p-2 rounded-lg ${card.color} text-lg font-bold`}>{card.icon}</span>
              <span className={`text-[10px] font-black uppercase tracking-wider opacity-60 text-right`}>{card.label}</span>
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-black text-slate-800 tracking-tight">{card.value}</h3>
              {card.usd && (
                <p className="text-blue-500 font-bold text-sm tracking-tight">{card.usd}</p>
              )}
              <p className="text-[10px] text-slate-400 font-bold uppercase truncate leading-tight">{card.desc}</p>
            </div>
          </div>
          {card.extra && card.extra}
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
