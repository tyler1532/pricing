
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { SimulationInputs, SummaryStats } from '../types';
import { formatCurrency } from '../utils/calculations';

interface AIInsightProps {
  inputs: SimulationInputs;
  stats: SummaryStats;
}

const AIInsight: React.FC<AIInsightProps> = ({ inputs, stats }) => {
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generateInsight = async () => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const formatBEPText = (m: number | null) => {
        if (m === null) return "측정 불가";
        return `${m}개월`;
      };

      const prompt = `
        원오빌(One-O-Bill) 구독형 도어락 비즈니스 모델 상세 분석 요청입니다.

        입력값:
        - 사업 유형: ${inputs.businessCategory}
        - 세대수: ${inputs.numHouseholds}
        - 제품 판가(대당): ${formatCurrency(inputs.unitSalesPrice)}
        - 단지 기본료: ${formatCurrency(inputs.complexMonthlyFee)}
        - 세대당 월 기본료: ${formatCurrency(inputs.householdMonthlyFee)}
        - 제품 원가: ${formatCurrency(inputs.productCost)}
        - 설치 원가: ${formatCurrency(inputs.installCost)}
        - 대당 개발비: ${formatCurrency(inputs.devCostPerDevice)}
        - 대당 연간 운영비: ${formatCurrency(inputs.annualOpCostPerDevice)}
        - 세대당 연간 CS 비용: ${formatCurrency(inputs.csCostPerHousehold)}
        
        시뮬레이션 결과:
        - 5년 누적 판매총액: ${formatCurrency(stats.fiveYearTotalSales)}
        - 세대당 월 서비스 이용료(평균): ${formatCurrency(stats.monthlyServiceFeePerHousehold)}
        - BEP(손익분기점): ${formatBEPText(stats.breakEvenMonth)}
        - 5년 누적 공헌이익: ${formatCurrency(stats.fiveYearProfit)}
        - ROI: ${stats.roi.toFixed(2)}%

        위 지표들을 분석하여 해당 사업 유형(${inputs.businessCategory})의 특성을 고려했을 때 '제품 판매 마진'과 '구독료 수익'의 균형이 적절한지 분석하고, 수익 극대화를 위한 가격 정책 전략을 3~4문장으로 제안해줘. 특히 국내와 해외의 시장 환경 차이를 반영해줘.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
      });

      setInsight(response.text || "분석 결과를 가져올 수 없습니다.");
    } catch (error) {
      console.error(error);
      setInsight("AI 분석 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl shadow-xl border border-slate-700 mt-8 overflow-hidden relative">
      <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
        <svg width="100" height="100" viewBox="0 0 24 24" fill="white">
            <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
        </svg>
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-blue-500 p-2 rounded-lg">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white">Gemini AI 비즈니스 인사이트</h3>
        </div>

        {!insight && !loading && (
          <button
            onClick={generateInsight}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-blue-500/20 active:scale-95"
          >
            AI 수익성 분석 리포트 생성
          </button>
        )}

        {loading && (
          <div className="flex items-center gap-3 text-slate-300">
            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
            <span>사업 유형별 전략 분석 중...</span>
          </div>
        )}

        {insight && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <p className="text-slate-300 leading-relaxed text-lg italic font-medium">
              &quot;{insight}&quot;
            </p>
            <button 
                onClick={() => setInsight(null)} 
                className="mt-6 text-xs text-slate-500 hover:text-slate-400 transition-colors uppercase tracking-widest font-bold"
            >
                다른 조건으로 재분석
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIInsight;
