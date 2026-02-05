
import React, { useState, useMemo } from 'react';
import { SimulationInputs } from './types';
import { calculateProjections, getSummaryStats } from './utils/calculations';
import InputSection from './components/InputSection';
import ProfitChart from './components/ProfitChart';
import SummaryCards from './components/SummaryCards';
import YearlyBreakdown from './components/YearlyBreakdown';
import AIInsight from './components/AIInsight';

const App: React.FC = () => {
  const [inputs, setInputs] = useState<SimulationInputs>({
    businessCategory: '[국내원오빌/PMS_수주전문점]도어락',
    alphaServiceTier: 'Light',
    numHouseholds: 10,
    numAlphaDevices: 0,
    unitSalesPrice: 100000, 
    retailPrice: 130000,    
    profitMarginPercent: 70,
    salesPrice: 1000000,    
    complexMonthlyFee: 50000,
    householdMonthlyFee: 3900,
    annualOpCostPerDevice: 2544,
    devCostPerDevice: 0,
    productCost: 70000,
    installCost: 12000,
    csCostPerHousehold: 2700,
    exchangeRate: 1470,
    overseasPricingTiers: [
      { min: 1, max: 10, complexFee: 15, householdFee: 2.0 },
      { min: 11, max: 20, complexFee: 17, householdFee: 1.7 },
      { min: 21, max: 50, complexFee: 20, householdFee: 1.2 },
      { min: 51, max: 100, complexFee: 25, householdFee: 0.9 },
      { min: 101, max: 200, complexFee: 30, householdFee: 0.5 },
    ],
    domesticPricingTiers: [
      { min: 1, max: 10, complexFee: 50000, householdFee: 3900 },
      { min: 11, max: 20, complexFee: 70000, householdFee: 2900 },
      { min: 21, max: 50, complexFee: 100000, householdFee: 1900 },
      { min: 51, max: 100, complexFee: 150000, householdFee: 1400 },
      { min: 101, max: 200, complexFee: 200000, householdFee: 900 },
    ]
  });

  const projections = useMemo(() => calculateProjections(inputs), [inputs]);
  const stats = useMemo(() => getSummaryStats(inputs, projections), [inputs, projections]);

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 justify-center sm:justify-start">
                <div className="w-10 h-10 bg-blue-700 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                </div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">국내 및 해외 구독료 기반 가격정책</h1>
            </div>
            <p className="text-slate-500 font-medium">원오빌(One-O-Bill) 5개년 공헌이익 정밀 시뮬레이터</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm inline-flex items-center gap-2 self-center sm:self-auto">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600"></span>
            </span>
            <span className="text-xs font-bold text-slate-600 uppercase tracking-tighter">Global Pricing Strategy v3.0</span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 sticky top-8">
            <InputSection inputs={inputs} setInputs={setInputs} />
          </div>

          <div className="lg:col-span-8 flex flex-col gap-6">
            <SummaryCards stats={stats} category={inputs.businessCategory} />
            <YearlyBreakdown data={stats.yearlyBreakdown} category={inputs.businessCategory} />
            <ProfitChart data={projections} />
            <AIInsight inputs={inputs} stats={stats} />
          </div>
        </div>

        <footer className="mt-16 pt-8 border-t border-slate-200 text-center">
          <p className="text-slate-400 text-sm font-medium">
            © 2025 One-O-Bill Global Strategy Group. 본 시뮬레이션 데이터는 의사결정 참고용입니다.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
