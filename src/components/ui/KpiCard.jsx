import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const KpiCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendPositive = true,
  isCurrency = false,
  badgeText,
  onClick,
  className = ''
}) => {
  return (
    <div
      onClick={onClick}
      className={`relative bg-white rounded-xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-200 ${
        onClick ? 'cursor-pointer hover:border-gold/50' : ''
      } ${className}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{title}</p>
          <h3 className="mt-2 text-2xl font-bold text-slate-900 font-sans tracking-tight">
            {isCurrency && typeof value === 'number'
              ? `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
              : value}
          </h3>
        </div>
        {Icon && (
          <div className="w-11 h-11 rounded-xl bg-aubergine-surface flex items-center justify-center text-aubergine shrink-0 border border-aubergine-border">
            <Icon className="w-5 h-5 text-aubergine" />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-slate-100">
        <div className="flex items-center gap-1.5">
          {trend && (
            <span
              className={`inline-flex items-center font-semibold gap-0.5 ${
                trendPositive ? 'text-emerald-600' : 'text-rose-600'
              }`}
            >
              {trendPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
              {trend}
            </span>
          )}
          {subtitle && <span className="text-slate-500">{subtitle}</span>}
        </div>

        {badgeText && (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-gold-surface text-gold-dark border border-gold-border">
            {badgeText}
          </span>
        )}
      </div>
    </div>
  );
};

