
import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { MonthlyData } from '../types';
import { formatCurrency } from '../utils/calculations';

interface ProfitChartProps {
  data: MonthlyData[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-sm p-4 border border-slate-200 shadow-xl rounded-xl">
        <p className="text-slate-500 text-xs font-bold mb-1">{label}개월 차</p>
        <p className="text-blue-600 font-bold text-lg">
          {formatCurrency(payload[0].value)}
        </p>
        <div className="mt-2 pt-2 border-t border-slate-100 flex flex-col gap-1">
          <p className="text-xs text-slate-400">
            누적 매출: {formatCurrency(payload[0].payload.cumulativeRevenue)}
          </p>
          <p className="text-xs text-slate-400">
            투자 비용: {formatCurrency(payload[0].payload.cumulativeCost)}
          </p>
        </div>
      </div>
    );
  }
  return null;
};

const ProfitChart: React.FC<ProfitChartProps> = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-[450px]">
      <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center justify-between">
        <span className="flex items-center gap-2">
           <span className="p-2 bg-indigo-50 rounded-lg text-indigo-600">📈</span>
           5개년 누적 공헌이익 추이
        </span>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-slate-500">누적 이익</span>
          </div>
          <div className="flex items-center gap-1.5">
             <div className="w-3 h-0.5 bg-red-400"></div>
             <span className="text-slate-500">BEP 라인</span>
          </div>
        </div>
      </h2>
      <div className="w-full h-[340px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorMargin" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              interval={11}
              tickFormatter={(val) => `${val}개월`}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              tickFormatter={(val) => (val / 1000000).toFixed(0) + 'M'}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={0} stroke="#f87171" strokeDasharray="3 3" />
            <Area 
              type="monotone" 
              dataKey="contributionMargin" 
              stroke="#3b82f6" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorMargin)" 
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProfitChart;
