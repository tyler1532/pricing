
export type BusinessCategory = 
  | '[국내원오빌/PMS_직접영업]도어락'
  | '[국내원오빌/PMS_수주전문점]도어락'
  | '[국내 원오빌/PMS_수주전문점]알파'
  | '[해외원오빌/PMS]도어락'
  | '[해외원오빌/PMS]알파';

export type AlphaServiceTier = 'Light' | 'Premium';

export interface OverseasPricingTier {
  min: number;
  max: number;
  complexFee: number;
  householdFee: number;
}

export interface DomesticPricingTier {
  min: number;
  max: number;
  complexFee: number;
  householdFee: number;
}

export interface SimulationInputs {
  businessCategory: BusinessCategory;
  alphaServiceTier: AlphaServiceTier; // 알파 서비스 등급 추가
  numHouseholds: number;
  numAlphaDevices: number;        // 알파 기기 수량
  unitSalesPrice: number;         // 당사 공급가 (또는 직접영업 판가)
  retailPrice: number;            // 수주전문점 소비자판가
  profitMarginPercent: number;    // 당사 손익비율 (구독료 배분율)
  salesPrice: number;
  complexMonthlyFee: number;
  householdMonthlyFee: number;
  annualOpCostPerDevice: number;
  devCostPerDevice: number;
  productCost: number;
  installCost: number;
  csCostPerHousehold: number;
  exchangeRate: number;           // 기준 환율 (신규)
  overseasPricingTiers: OverseasPricingTier[]; // 해외 가격 정책 티어
  domesticPricingTiers: DomesticPricingTier[]; // 국내 가격 정책 티어
}

export interface MonthlyData {
  month: number;
  revenue: number;
  operatingCost: number;
  csCost: number;
  cumulativeRevenue: number;
  cumulativeCost: number;
  contributionMargin: number;
}

export interface YearlyResult {
  year: number;
  totalSales: number;
  annualSubscription: number;
  annualOpCost: number;
  developmentCost: number;
  csCost: number;
  productInstallCost: number;
  annualContributionMargin: number;
  cumulativeContributionMargin: number;
  zigbang?: {
    totalSales: number;
    annualSubscription: number;
    annualOpCost: number;
    developmentCost: number;
    csCost: number;
    productCost: number;
    margin: number;
  };
  specialist?: {
    totalSales: number;
    annualSubscription: number;
    purchaseCost: number;
    installCost: number;
    margin: number;
    cumulativeMargin: number;
  };
}

export interface SummaryStats {
  initialInvestment: number;
  fiveYearTotalSales: number;
  annualRevenue: number;
  annualOpCost: number;
  annualCsCost: number;
  monthlyRevenue: number;
  monthlyOpCost: number;
  breakEvenMonth: number | null;
  fiveYearProfit: number;
  roi: number;
  monthlyServiceFeePerHousehold: number;
  monthlyServiceFeeZigbang: number;
  monthlyServiceFeeSpecialist: number;
  yearlyBreakdown: YearlyResult[];
  exchangeRate: number; // 환율 정보 포함
}
