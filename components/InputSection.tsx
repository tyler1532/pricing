
import React from 'react';
import { SimulationInputs, BusinessCategory, OverseasPricingTier, DomesticPricingTier, AlphaServiceTier } from '../types';

interface InputSectionProps {
  inputs: SimulationInputs;
  setInputs: React.Dispatch<React.SetStateAction<SimulationInputs>>;
}

const DEFAULT_OVERSEAS_TIERS_WIFI: OverseasPricingTier[] = [
  { min: 1, max: 10, complexFee: 15, householdFee: 2.0 },
  { min: 11, max: 20, complexFee: 17, householdFee: 1.7 },
  { min: 21, max: 50, complexFee: 20, householdFee: 1.2 },
  { min: 51, max: 100, complexFee: 25, householdFee: 0.9 },
  { min: 101, max: 200, complexFee: 30, householdFee: 0.5 },
];

const DEFAULT_OVERSEAS_TIERS_ALPHA_LIGHT: OverseasPricingTier[] = [
  { min: 1, max: 10, complexFee: 20, householdFee: 2.5 },
  { min: 11, max: 20, complexFee: 25, householdFee: 2.0 },
  { min: 21, max: 50, complexFee: 30, householdFee: 1.5 },
  { min: 51, max: 100, complexFee: 35, householdFee: 1.2 },
  { min: 101, max: 200, complexFee: 40, householdFee: 0.9 },
];

const DEFAULT_OVERSEAS_TIERS_ALPHA_PREMIUM: OverseasPricingTier[] = [
  { min: 1, max: 10, complexFee: 20, householdFee: 4.5 }, // complexFee 고정(20), householdFee (2.5 + 2.0)
  { min: 11, max: 20, complexFee: 25, householdFee: 4.0 }, // complexFee 고정(25), householdFee (2.0 + 2.0)
  { min: 21, max: 50, complexFee: 30, householdFee: 3.5 }, // complexFee 고정(30), householdFee (1.5 + 2.0)
  { min: 51, max: 100, complexFee: 35, householdFee: 3.2 }, // complexFee 고정(35), householdFee (1.2 + 2.0)
  { min: 101, max: 200, complexFee: 40, householdFee: 2.9 }, // complexFee 고정(40), householdFee (0.9 + 2.0)
];

const DEFAULT_DOMESTIC_TIERS: DomesticPricingTier[] = [
  { min: 1, max: 10, complexFee: 50000, householdFee: 3900 },
  { min: 11, max: 20, complexFee: 70000, householdFee: 2900 },
  { min: 21, max: 50, complexFee: 100000, householdFee: 1900 },
  { min: 51, max: 100, complexFee: 150000, householdFee: 1400 },
  { min: 101, max: 200, complexFee: 200000, householdFee: 900 },
];

const ALPHA_PREMIUM_DOMESTIC_TIERS: DomesticPricingTier[] = [
  { min: 1, max: 10, complexFee: 50000, householdFee: 6900 },   // complexFee 고정(50,000), householdFee (3900 + 3000)
  { min: 11, max: 20, complexFee: 70000, householdFee: 5900 },  // complexFee 고정(70,000), householdFee (2900 + 3000)
  { min: 21, max: 50, complexFee: 100000, householdFee: 4900 }, // complexFee 고정(100,000), householdFee (1900 + 3000)
  { min: 51, max: 100, complexFee: 150000, householdFee: 4400 }, // complexFee 고정(150,000), householdFee (1400 + 3000)
  { min: 101, max: 200, complexFee: 200000, householdFee: 3900 }, // complexFee 고정(200,000), householdFee (900 + 3000)
];

const CATEGORY_PRESETS: Record<BusinessCategory, Partial<SimulationInputs>> = {
  '[국내원오빌/PMS_직접영업]도어락': {
    unitSalesPrice: 130000,
    retailPrice: 130000,
    profitMarginPercent: 100,
    productCost: 70000,
    installCost: 12000,
    csCostPerHousehold: 2700,
    devCostPerDevice: 0,
    annualOpCostPerDevice: 2544,
    numAlphaDevices: 0,
    exchangeRate: 1470,
    domesticPricingTiers: DEFAULT_DOMESTIC_TIERS
  },
  '[국내원오빌/PMS_수주전문점]도어락': {
    unitSalesPrice: 100000, 
    retailPrice: 130000,    
    profitMarginPercent: 70,
    productCost: 70000,
    installCost: 12000,
    csCostPerHousehold: 2700,
    devCostPerDevice: 0,
    annualOpCostPerDevice: 2544,
    numAlphaDevices: 0,
    exchangeRate: 1470,
    domesticPricingTiers: DEFAULT_DOMESTIC_TIERS
  },
  '[국내 원오빌/PMS_수주전문점]알파': {
    numHouseholds: 10,
    numAlphaDevices: 1,
    unitSalesPrice: 550000, 
    retailPrice: 800000,    
    profitMarginPercent: 70, 
    productCost: 460000,
    installCost: 100000,
    csCostPerHousehold: 2700,
    devCostPerDevice: 0,
    annualOpCostPerDevice: 4404,
    exchangeRate: 1470,
    domesticPricingTiers: DEFAULT_DOMESTIC_TIERS
  },
  '[해외원오빌/PMS]도어락': {
    numHouseholds: 10,
    unitSalesPrice: 100,      
    retailPrice: 100,
    profitMarginPercent: 100,
    complexMonthlyFee: 15,    
    householdMonthlyFee: 2,   
    productCost: 70000,
    installCost: 0,
    csCostPerHousehold: 0,
    devCostPerDevice: 0,
    annualOpCostPerDevice: 2544,
    numAlphaDevices: 0,
    exchangeRate: 1470,
    overseasPricingTiers: DEFAULT_OVERSEAS_TIERS_WIFI
  },
  '[해외원오빌/PMS]알파': {
    numHouseholds: 10,
    numAlphaDevices: 1,
    unitSalesPrice: 400,      
    retailPrice: 400,
    profitMarginPercent: 100,
    complexMonthlyFee: 20,    
    householdMonthlyFee: 2.5,  
    productCost: 460000,
    installCost: 0,
    csCostPerHousehold: 0,
    devCostPerDevice: 0,
    annualOpCostPerDevice: 4404,
    exchangeRate: 1470,
    overseasPricingTiers: DEFAULT_OVERSEAS_TIERS_ALPHA_LIGHT
  }
};

const isSpecialistCategory = (cat: BusinessCategory) => 
  cat === '[국내원오빌/PMS_수주전문점]도어락' || 
  cat === '[국내 원오빌/PMS_수주전문점]알파';

const isAlphaCategory = (cat: BusinessCategory) =>
  cat === '[국내 원오빌/PMS_수주전문점]알파' ||
  cat === '[해외원오빌/PMS]알파';

const isOverseasCategory = (cat: BusinessCategory) =>
  cat === '[해외원오빌/PMS]도어락' ||
  cat === '[해외원오빌/PMS]알파';

const isDomesticCategory = (cat: BusinessCategory) =>
  cat === '[국내원오빌/PMS_직접영업]도어락' || 
  cat === '[국내원오빌/PMS_수주전문점]도어락' ||
  cat === '[국내 원오빌/PMS_수주전문점]알파';

const InputSection: React.FC<InputSectionProps> = ({ inputs, setInputs }) => {
  const isSpecialistModel = isSpecialistCategory(inputs.businessCategory);
  const isAlphaModel = isAlphaCategory(inputs.businessCategory);
  const isOverseasModel = isOverseasCategory(inputs.businessCategory);
  const isDomesticModel = isDomesticCategory(inputs.businessCategory);

  const getDynamicFeesDomestic = (count: number, tiers: DomesticPricingTier[]) => {
    const tier = tiers.find(t => count >= t.min && count <= t.max);
    if (tier) return { complex: tier.complexFee, household: tier.householdFee };
    const lastTier = tiers[tiers.length - 1];
    return { complex: lastTier.complexFee, household: lastTier.householdFee };
  };

  const getDynamicFeesOverseas = (count: number, tiers: OverseasPricingTier[]) => {
    const tier = tiers.find(t => count >= t.min && count <= t.max);
    if (tier) return { complex: tier.complexFee, household: tier.householdFee };
    const lastTier = tiers[tiers.length - 1];
    return { complex: lastTier.complexFee, household: lastTier.householdFee };
  };

  const updateOverseasTiers = (index: number, field: keyof OverseasPricingTier, value: number) => {
    const newTiers = [...inputs.overseasPricingTiers];
    newTiers[index] = { ...newTiers[index], [field]: value };
    
    const fees = getDynamicFeesOverseas(inputs.numHouseholds, newTiers);
    setInputs(prev => ({ 
      ...prev, 
      overseasPricingTiers: newTiers,
      complexMonthlyFee: fees.complex,
      householdMonthlyFee: fees.household
    }));
  };

  const updateDomesticTiers = (index: number, field: keyof DomesticPricingTier, value: number) => {
    const newTiers = [...inputs.domesticPricingTiers];
    newTiers[index] = { ...newTiers[index], [field]: value };
    
    const fees = getDynamicFeesDomestic(inputs.numHouseholds, newTiers);
    setInputs(prev => ({ 
      ...prev, 
      domesticPricingTiers: newTiers,
      complexMonthlyFee: fees.complex,
      householdMonthlyFee: fees.household
    }));
  };

  const handleChange = (field: keyof SimulationInputs, value: any) => {
    if (field === 'businessCategory') {
      const category = value as BusinessCategory;
      const preset = { ...CATEGORY_PRESETS[category] };
      preset.alphaServiceTier = 'Light';

      if (isDomesticCategory(category)) {
        const tiers = preset.domesticPricingTiers || DEFAULT_DOMESTIC_TIERS;
        const fees = getDynamicFeesDomestic(inputs.numHouseholds, tiers);
        preset.complexMonthlyFee = fees.complex;
        preset.householdMonthlyFee = fees.household;
      } else if (isOverseasCategory(category)) {
        const tiers = preset.overseasPricingTiers || (category === '[해외원오빌/PMS]알파' ? DEFAULT_OVERSEAS_TIERS_ALPHA_LIGHT : DEFAULT_OVERSEAS_TIERS_WIFI);
        const fees = getDynamicFeesOverseas(inputs.numHouseholds, tiers);
        preset.complexMonthlyFee = fees.complex;
        preset.householdMonthlyFee = fees.household;
      }
      setInputs(prev => ({ ...prev, ...preset, businessCategory: category }));
      return;
    }

    if (field === 'alphaServiceTier') {
        const tier = value as AlphaServiceTier;
        setInputs(prev => {
            let nextTiersDomestic = prev.domesticPricingTiers;
            let nextTiersOverseas = prev.overseasPricingTiers;

            if (isDomesticModel) {
                nextTiersDomestic = tier === 'Premium' ? ALPHA_PREMIUM_DOMESTIC_TIERS : DEFAULT_DOMESTIC_TIERS;
            } else if (isOverseasModel) {
                nextTiersOverseas = tier === 'Premium' ? DEFAULT_OVERSEAS_TIERS_ALPHA_PREMIUM : DEFAULT_OVERSEAS_TIERS_ALPHA_LIGHT;
            }

            const fees = isDomesticModel 
                ? getDynamicFeesDomestic(prev.numHouseholds, nextTiersDomestic)
                : getDynamicFeesOverseas(prev.numHouseholds, nextTiersOverseas);

            return {
                ...prev,
                alphaServiceTier: tier,
                domesticPricingTiers: nextTiersDomestic,
                overseasPricingTiers: nextTiersOverseas,
                complexMonthlyFee: fees.complex,
                householdMonthlyFee: fees.household
            };
        });
        return;
    }

    if (field === 'numHouseholds' || field === 'numAlphaDevices') {
      const count = typeof value === 'string' ? (parseInt(value.replace(/[^0-9]/g, '')) || 0) : value;
      setInputs(prev => {
        const nextState = { ...prev, [field]: count };
        if (isDomesticCategory(prev.businessCategory)) {
          const fees = getDynamicFeesDomestic(count, prev.domesticPricingTiers);
          nextState.complexMonthlyFee = fees.complex;
          nextState.householdMonthlyFee = fees.household;
        } else if (isOverseasCategory(prev.businessCategory)) {
          const fees = getDynamicFeesOverseas(count, prev.overseasPricingTiers);
          nextState.complexMonthlyFee = fees.complex;
          nextState.householdMonthlyFee = fees.household;
        }
        return nextState;
      });
      return;
    }

    let finalValue = value;
    if (typeof value === 'string') {
      finalValue = parseFloat(value.replace(/[^0-9.]/g, '')) || 0;
    }
    setInputs(prev => ({ ...prev, [field]: finalValue }));
  };

  const categories: BusinessCategory[] = [
    '[국내원오빌/PMS_직접영업]도어락',
    '[국내원오빌/PMS_수주전문점]도어락',
    '[국내 원오빌/PMS_수주전문점]알파',
    '[해외원오빌/PMS]도어락',
    '[해외원오빌/PMS]알파'
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-full overflow-y-auto">
      <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <span className="p-2 bg-blue-50 rounded-lg text-blue-600">📊</span>
        시뮬레이션 조건 설정
      </h2>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="block text-xs font-black text-slate-400 uppercase tracking-widest">Business Category</label>
          <div className="grid grid-cols-1 gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleChange('businessCategory', cat)}
                className={`text-left px-4 py-3 rounded-xl border text-xs font-bold transition-all ${
                  inputs.businessCategory === cat
                    ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-200'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-blue-300 hover:bg-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {isAlphaModel && (
          <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest">Alpha Service Tier</label>
            <div className="flex p-1 bg-slate-100 rounded-xl">
              {(['Light', 'Premium'] as AlphaServiceTier[]).map((tier) => (
                <button
                  key={tier}
                  onClick={() => handleChange('alphaServiceTier', tier)}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-black transition-all ${
                    inputs.alphaServiceTier === tier
                      ? (tier === 'Premium' 
                          ? 'bg-indigo-600 text-white shadow-sm' 
                          : 'bg-emerald-600 text-white shadow-sm')
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {tier}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-slate-400 font-bold px-1">
              {inputs.alphaServiceTier === 'Premium' 
                ? '✨ 프리미엄 등급은 단지기본료를 유지하며 세대기본료만 증액됩니다. (+3,000원 / +2$)' 
                : '🍃 라이트 등급은 핵심 기능을 제공하는 표준 구독 모델입니다.'}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <span>🏢 총 세대수</span>
              </label>
              <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg px-2 py-1 shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
                <input
                  type="text"
                  value={inputs.numHouseholds}
                  onChange={(e) => handleChange('numHouseholds', e.target.value)}
                  className="w-12 text-right font-black text-blue-600 border-none p-0 focus:ring-0 text-sm"
                />
                <span className="text-[10px] font-bold text-slate-400">세대</span>
              </div>
            </div>
            <div className="space-y-2">
              <input
                type="range" min="1" max="200" step="1" value={inputs.numHouseholds}
                onChange={(e) => handleChange('numHouseholds', parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[10px] font-bold text-slate-400 px-1">
                <span>1세대</span>
                <span>200세대</span>
              </div>
            </div>
          </div>

          {isAlphaModel && (
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-bold text-amber-800 flex items-center gap-2">
                  <span>🛰️ 알파 기기 수량</span>
                </label>
                <div className="flex items-center gap-1.5 bg-white border border-amber-200 rounded-lg px-2 py-1 shadow-sm focus-within:ring-2 focus-within:ring-amber-500">
                  <input
                    type="text"
                    value={inputs.numAlphaDevices}
                    onChange={(e) => handleChange('numAlphaDevices', e.target.value)}
                    className="w-10 text-right font-black text-amber-600 border-none p-0 focus:ring-0 text-sm"
                  />
                  <span className="text-[10px] font-bold text-amber-400">대</span>
                </div>
              </div>
              <div className="space-y-2">
                <input
                  type="range" min="1" max="50" step="1" value={inputs.numAlphaDevices}
                  onChange={(e) => handleChange('numAlphaDevices', parseInt(e.target.value))}
                  className="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                />
                <div className="flex justify-between text-[10px] font-bold text-amber-400 px-1">
                  <span>1대</span>
                  <span>50대</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {isDomesticModel && (
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-xs font-black text-blue-500 mb-2 uppercase tracking-widest flex items-center gap-2">
              🏠 국내 구간별 구독 요금표 (원)
            </h3>
            <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
              <table className="w-full text-[10px] text-center border-collapse">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200">
                    <th className="py-2 px-1 font-bold text-slate-500">구간(세대)</th>
                    <th className="py-2 px-1 font-bold text-slate-500">단지기본료(원)</th>
                    <th className="py-2 px-1 font-bold text-slate-500">세대기본료(원)</th>
                  </tr>
                </thead>
                <tbody>
                  {inputs.domesticPricingTiers.map((tier, idx) => {
                    const isActive = inputs.numHouseholds >= tier.min && inputs.numHouseholds <= tier.max;
                    return (
                      <tr key={idx} className={`border-b border-slate-100 transition-colors ${isActive ? (inputs.alphaServiceTier === 'Premium' ? 'bg-indigo-100/50' : 'bg-blue-100/50') : ''}`}>
                        <td className="py-2 font-medium text-slate-600">{tier.min}~{tier.max}</td>
                        <td className="py-1 px-1">
                          <input 
                            type="number" value={tier.complexFee}
                            onChange={(e) => updateDomesticTiers(idx, 'complexFee', parseInt(e.target.value) || 0)}
                            className="w-full text-center bg-transparent border-none font-bold text-slate-800 focus:ring-0"
                          />
                        </td>
                        <td className="py-1 px-1">
                          <input 
                            type="number" value={tier.householdFee}
                            onChange={(e) => updateDomesticTiers(idx, 'householdFee', parseInt(e.target.value) || 0)}
                            className="w-full text-center bg-transparent border-none font-bold text-slate-800 focus:ring-0"
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {isOverseasModel && (
          <div className="space-y-6 pt-4 border-t border-slate-100 animate-in fade-in duration-300">
            <div>
              <h3 className="text-xs font-black text-blue-500 mb-4 uppercase tracking-widest flex items-center gap-2">
                🌍 해외 거래 환율 설정
              </h3>
              <InputItem 
                label="기준 환율 (1$ 당)" 
                value={inputs.exchangeRate} unit="원" onChange={(v) => handleChange('exchangeRate', v)} 
              />
            </div>

            <div>
              <h3 className="text-xs font-black text-indigo-500 mb-3 uppercase tracking-widest flex items-center gap-2">
                🏷️ 해외 구간별 구독 요금표 ($)
              </h3>
              <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
                <table className="w-full text-[10px] text-center border-collapse">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-200">
                      <th className="py-2 px-1 font-bold text-slate-500">구간(세대)</th>
                      <th className="py-2 px-1 font-bold text-slate-500">단지기본료($)</th>
                      <th className="py-2 px-1 font-bold text-slate-500">세대기본료($)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inputs.overseasPricingTiers.map((tier, idx) => {
                      const isActive = inputs.numHouseholds >= tier.min && inputs.numHouseholds <= tier.max;
                      return (
                        <tr key={idx} className={`border-b border-slate-100 transition-colors ${isActive ? (inputs.alphaServiceTier === 'Premium' ? 'bg-indigo-100/50' : 'bg-blue-100/50') : ''}`}>
                          <td className="py-2 font-medium text-slate-600">{tier.min}~{tier.max}</td>
                          <td className="py-1 px-1">
                            <input 
                              type="number" step="0.1" value={tier.complexFee}
                              onChange={(e) => updateOverseasTiers(idx, 'complexFee', parseFloat(e.target.value) || 0)}
                              className="w-full text-center bg-transparent border-none font-bold text-slate-800 focus:ring-0"
                            />
                          </td>
                          <td className="py-1 px-1">
                            <input 
                              type="number" step="0.1" value={tier.householdFee}
                              onChange={(e) => updateOverseasTiers(idx, 'householdFee', parseFloat(e.target.value) || 0)}
                              className="w-full text-center bg-transparent border-none font-bold text-slate-800 focus:ring-0"
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-slate-100">
          <h3 className="text-xs font-black text-slate-400 mb-4 uppercase tracking-widest">Pricing Strategy</h3>
          <div className="space-y-4">
            <InputItem 
              label={isOverseasModel ? "대리상공급가 ($)" : (isSpecialistModel ? "당사 공급가 (대당)" : "도어락 판가 (대당)")} 
              value={inputs.unitSalesPrice} 
              unit={isOverseasModel ? "$" : "원"} 
              onChange={(v) => handleChange('unitSalesPrice', v)} 
            />
            {isSpecialistModel && (
              <div className="grid grid-cols-2 gap-4">
                <InputItem 
                  label="수주전문점 소비자판가" 
                  value={inputs.retailPrice} unit="원" onChange={(v) => handleChange('retailPrice', v)} 
                />
                <InputItem 
                  label="당사 손익 (%)" 
                  value={inputs.profitMarginPercent} unit="%" onChange={(v) => handleChange('profitMarginPercent', v)} 
                />
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <InputItem 
                label={isOverseasModel ? "단지 기본료 ($, 월)" : "단지 기본료 (월)"} 
                value={inputs.complexMonthlyFee} 
                unit={isOverseasModel ? "$" : "원"} 
                onChange={(v) => handleChange('complexMonthlyFee', v)} 
              />
              <InputItem 
                label={isOverseasModel ? "세대당 기본요금 ($, 월)" : "세대 기본료 (월)"} 
                value={inputs.householdMonthlyFee} 
                unit={isOverseasModel ? "$" : "원"} 
                onChange={(v) => handleChange('householdMonthlyFee', v)} 
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100">
          <h3 className="text-xs font-black text-slate-400 mb-4 uppercase tracking-widest">Cost & Operation</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <InputItem label="제품원가" value={inputs.productCost} unit="원" onChange={(v) => handleChange('productCost', v)} />
              <InputItem label="설치비" value={inputs.installCost} unit="원" onChange={(v) => handleChange('installCost', v)} />
            </div>
            <InputItem label="CS 비용 (세대당/년)" value={inputs.csCostPerHousehold} unit="원" onChange={(v) => handleChange('csCostPerHousehold', v)} />
            <div className="grid grid-cols-2 gap-4">
              <InputItem label="대당 개발비" value={inputs.devCostPerDevice} unit="원" onChange={(v) => handleChange('devCostPerDevice', v)} />
              <InputItem label="대당 연간 운영비" value={inputs.annualOpCostPerDevice} unit="원" onChange={(v) => handleChange('annualOpCostPerDevice', v)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InputItem = ({ label, value, unit, onChange }: any) => (
  <div>
    <label className="block text-[10px] font-bold text-slate-500 mb-1 ml-1 uppercase">{label}</label>
    <div className="relative">
      <input
        type="text" value={value.toLocaleString(undefined, { maximumFractionDigits: 2 })} onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border rounded-xl bg-slate-50 border-slate-200 text-slate-800 text-right font-bold text-sm focus:ring-2 focus:ring-blue-500"
      />
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[10px] font-bold">{unit}</span>
    </div>
  </div>
);

export default InputSection;
