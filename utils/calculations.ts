
import { SimulationInputs, MonthlyData, SummaryStats, YearlyResult, BusinessCategory } from '../types';

const isSpecialistCategory = (cat: BusinessCategory) => 
  cat === '[국내원오빌/PMS_수주전문점]도어락' || 
  cat === '[국내 원오빌/PMS_수주전문점]알파';

const isAlphaCategory = (cat: BusinessCategory) =>
  cat === '[국내 원오빌/PMS_수주전문점]알파' ||
  cat === '[해외원오빌/PMS]알파';

const isOverseasCategory = (cat: BusinessCategory) =>
  cat === '[해외원오빌/PMS]도어락' ||
  cat === '[해외원오빌/PMS]알파';

export const calculateProjections = (inputs: SimulationInputs): MonthlyData[] => {
  const { 
    numHouseholds, 
    numAlphaDevices,
    unitSalesPrice,
    complexMonthlyFee, 
    householdMonthlyFee, 
    annualOpCostPerDevice,
    devCostPerDevice,
    productCost,
    installCost,
    csCostPerHousehold,
    businessCategory,
    profitMarginPercent,
    exchangeRate
  } = inputs;
  
  const isSpecialist = isSpecialistCategory(businessCategory);
  const isAlpha = isAlphaCategory(businessCategory);
  const isOverseas = isOverseasCategory(businessCategory);

  // 해외의 경우 매출 관련 지표($)를 원화로 변환하여 계산
  const effectiveUnitSalesPrice = isOverseas ? unitSalesPrice * exchangeRate : unitSalesPrice;
  const effectiveComplexMonthlyFee = isOverseas ? complexMonthlyFee * exchangeRate : complexMonthlyFee;
  const effectiveHouseholdMonthlyFee = isOverseas ? householdMonthlyFee * exchangeRate : householdMonthlyFee;
  
  const deviceCount = isAlpha ? numAlphaDevices : numHouseholds;
  
  const totalProductInstallCost = deviceCount * (productCost + installCost);
  const totalDevCost = deviceCount * devCostPerDevice;
  const annualCsCostTotal = csCostPerHousehold * numHouseholds;
  
  let totalOneTimeSales = effectiveUnitSalesPrice * deviceCount;
  let monthlySubscription = effectiveComplexMonthlyFee + (numHouseholds * effectiveHouseholdMonthlyFee);
  
  if (isSpecialist) {
    monthlySubscription = monthlySubscription * (profitMarginPercent / 100);
  }

  const monthlyOpCost = (annualOpCostPerDevice / 12) * deviceCount;
  
  const projections: MonthlyData[] = [];
  let cumulativeValue = 0;

  for (let m = 0; m <= 60; m++) {
    let monthlyMargin = 0;

    if (m > 0) {
      monthlyMargin += monthlySubscription;
      monthlyMargin -= monthlyOpCost;

      if (m === 1) {
        monthlyMargin += totalOneTimeSales;
        if (isSpecialist) {
          monthlyMargin -= (productCost * deviceCount);
        } else {
          monthlyMargin -= totalProductInstallCost;
        }
      }

      if (m <= 12) {
        monthlyMargin -= (annualCsCostTotal / 12);
      }

      if (m <= 36) {
        monthlyMargin -= (totalDevCost / 36);
      }
    }
    
    cumulativeValue += monthlyMargin;
    
    projections.push({
      month: m,
      revenue: m === 0 ? 0 : monthlySubscription,
      operatingCost: m === 0 ? 0 : monthlyOpCost,
      csCost: (m > 0 && m <= 12) ? (annualCsCostTotal / 12) : 0,
      cumulativeRevenue: 0,
      cumulativeCost: 0,
      contributionMargin: cumulativeValue
    });
  }
  
  return projections;
};

export const getSummaryStats = (inputs: SimulationInputs, projections: MonthlyData[]): SummaryStats => {
  const { 
    numHouseholds, 
    numAlphaDevices,
    unitSalesPrice, 
    retailPrice,
    profitMarginPercent,
    complexMonthlyFee, 
    householdMonthlyFee, 
    annualOpCostPerDevice, 
    csCostPerHousehold, 
    productCost, 
    installCost, 
    devCostPerDevice,
    businessCategory,
    exchangeRate
  } = inputs;
  
  const isSpecialist = isSpecialistCategory(businessCategory);
  const isAlpha = isAlphaCategory(businessCategory);
  const isOverseas = isOverseasCategory(businessCategory);
  const deviceCount = isAlpha ? numAlphaDevices : numHouseholds;

  // 해외의 경우 매출 관련 지표($)를 원화로 변환
  const effectiveUnitSalesPrice = isOverseas ? unitSalesPrice * exchangeRate : unitSalesPrice;
  const effectiveComplexMonthlyFee = isOverseas ? complexMonthlyFee * exchangeRate : complexMonthlyFee;
  const effectiveHouseholdMonthlyFee = isOverseas ? householdMonthlyFee * exchangeRate : householdMonthlyFee;

  const totalMonthlyFee = effectiveComplexMonthlyFee + (numHouseholds * effectiveHouseholdMonthlyFee);
  const monthlySubscriptionZigbang = totalMonthlyFee * (profitMarginPercent / 100);
  const monthlySubscriptionSpecialist = totalMonthlyFee * (1 - profitMarginPercent / 100);
  
  const monthlyOpCost = (annualOpCostPerDevice / 12) * deviceCount;
  const totalDevCost = deviceCount * devCostPerDevice;
  const annualCsTotal = csCostPerHousehold * numHouseholds;

  const yearlyBreakdown: YearlyResult[] = [];
  let specialistCumulativeMargin = 0;

  for (let y = 1; y <= 5; y++) {
    const endIdx = y * 12;
    
    const annualOpCost = monthlyOpCost * 12;
    const developmentCost = (y <= 3) ? (totalDevCost / 3) : 0;
    const csCost = (y === 1) ? annualCsTotal : 0;

    const zigbangSales = (y === 1) ? (effectiveUnitSalesPrice * deviceCount) : 0;
    const zigbangSub = (isSpecialist ? monthlySubscriptionZigbang : totalMonthlyFee) * 12;
    const zigbangProductCost = (y === 1) ? (productCost * deviceCount) : 0;
    
    const specialistSales = (y === 1) ? (retailPrice * deviceCount) : 0;
    const specialistSub = monthlySubscriptionSpecialist * 12;
    const specialistPurchaseCost = (y === 1) ? (effectiveUnitSalesPrice * deviceCount) : 0;
    const specialistInstallCost = (y === 1) ? (installCost * deviceCount) : 0;

    const zigbangMargin = zigbangSales + zigbangSub - zigbangProductCost - csCost - developmentCost - annualOpCost;

    const sMargin = specialistSales + specialistSub - specialistPurchaseCost - specialistInstallCost;
    specialistCumulativeMargin += sMargin;

    yearlyBreakdown.push({
      year: y,
      totalSales: zigbangSales,
      annualSubscription: zigbangSub,
      annualOpCost,
      developmentCost,
      csCost,
      productInstallCost: (y === 1) ? (isSpecialist ? zigbangProductCost : (productCost + installCost) * deviceCount) : 0,
      annualContributionMargin: zigbangMargin,
      cumulativeContributionMargin: projections[endIdx].contributionMargin,
      zigbang: {
        totalSales: zigbangSales,
        annualSubscription: zigbangSub,
        annualOpCost: annualOpCost,
        developmentCost: developmentCost,
        csCost: csCost,
        productCost: zigbangProductCost,
        margin: zigbangMargin
      },
      specialist: {
        totalSales: specialistSales,
        annualSubscription: specialistSub,
        purchaseCost: specialistPurchaseCost,
        installCost: specialistInstallCost,
        margin: sMargin,
        cumulativeMargin: specialistCumulativeMargin
      }
    });
  }

  let breakEvenMonth = null;
  for (const data of projections) {
    if (data.contributionMargin >= 0) {
      breakEvenMonth = data.month;
      break;
    }
  }

  return {
    initialInvestment: (productCost + installCost) * deviceCount + totalDevCost + annualCsTotal,
    fiveYearTotalSales: effectiveUnitSalesPrice * deviceCount,
    annualRevenue: (isSpecialist ? monthlySubscriptionZigbang : totalMonthlyFee) * 12,
    annualOpCost: monthlyOpCost * 12,
    annualCsCost: annualCsTotal,
    monthlyRevenue: (isSpecialist ? monthlySubscriptionZigbang : totalMonthlyFee),
    monthlyOpCost: monthlyOpCost,
    breakEvenMonth,
    fiveYearProfit: projections[60].contributionMargin,
    roi: 0,
    monthlyServiceFeePerHousehold: totalMonthlyFee / numHouseholds,
    monthlyServiceFeeZigbang: monthlySubscriptionZigbang / numHouseholds,
    monthlyServiceFeeSpecialist: monthlySubscriptionSpecialist / numHouseholds,
    yearlyBreakdown,
    exchangeRate
  };
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
    maximumFractionDigits: 0
  }).format(value);
};

export const formatUSD = (krwValue: number, exchangeRate: number): string => {
  if (!exchangeRate || exchangeRate <= 0) return '$ -';
  const usdValue = krwValue / exchangeRate;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2
  }).format(usdValue);
};
