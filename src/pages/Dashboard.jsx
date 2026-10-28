import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Coins, 
  DollarSign, 
  ShoppingBag, 
  Users, 
  Layers,
  CreditCard,
  Tag,
  AlertTriangle,
  ArrowRight, 
  TrendingUp, 
  Plus, 
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { dashboardService } from '../services/dashboardService';
import { useSpotPrices } from '../context/SpotPriceContext';
import { KpiCard } from '../components/ui/KpiCard';
import { StatusBadge } from '../components/ui/StatusBadge';
import { SupabaseStatusBanner } from '../components/ui/SupabaseStatusBanner';

const METAL_COLORS = {
  Gold: '#D4AF37',
  Silver: '#94A3B8',
  Platinum: '#0E3566',
  Other: '#64748B'
};

export const Dashboard = () => {
  const navigate = useNavigate();
  const { spots, refreshPrices, lastUpdated } = useSpotPrices();

  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const data = await dashboardService.getDashboardSummary();
      setSummary(data);
    } catch (err) {
      console.error('Error fetching dashboard summary:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Top Banner: Supabase Connection Indicator & Quick Setup */}
      <SupabaseStatusBanner />

      {/* Live Precious Metals Spot Reference Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gold-surface border border-gold-border flex items-center justify-center text-gold-dark shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-900 font-serif">
                Live Precious Metals Spot Benchmark
              </h2>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Benchmark pricing for physical numismatics & bullion • Last tick:{' '}
              {lastUpdated.toLocaleTimeString()}
            </p>
          </div>
        </div>

        {/* Spot Pills */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Gold */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-50/70 border border-amber-200/80">
            <div className="w-2 h-2 rounded-full bg-amber-500" />
            <span className="text-xs font-bold text-slate-700">Gold</span>
            <span className="text-sm font-mono font-bold text-slate-900">
              ${spots.gold.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
            <span className="text-[11px] font-semibold text-emerald-600 font-mono">
              {spots.gold.changePct}
            </span>
          </div>

          {/* Silver */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200">
            <div className="w-2 h-2 rounded-full bg-slate-400" />
            <span className="text-xs font-bold text-slate-700">Silver</span>
            <span className="text-sm font-mono font-bold text-slate-900">
              ${spots.silver.price.toFixed(2)}
            </span>
            <span className="text-[11px] font-semibold text-emerald-600 font-mono">
              {spots.silver.changePct}
            </span>
          </div>

          {/* Platinum */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200">
            <div className="w-2 h-2 rounded-full bg-indigo-400" />
            <span className="text-xs font-bold text-slate-700">Platinum</span>
            <span className="text-sm font-mono font-bold text-slate-900">
              ${spots.platinum.price.toFixed(2)}
            </span>
            <span className="text-[11px] font-semibold text-rose-500 font-mono">
              {spots.platinum.changePct}
            </span>
          </div>

          <button
            onClick={refreshPrices}
            className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:text-aubergine hover:bg-slate-50 transition-colors"
            title="Refresh spot benchmark"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 8 Primary KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Total Catalog Items */}
        <KpiCard
          title="Total Catalog Items"
          value={isLoading ? '...' : summary?.totalItems || 0}
          subtitle="Physical lots in vault"
          icon={Coins}
          badgeText="Inventory"
          onClick={() => navigate('/products')}
        />

        {/* 2. Active Items */}
        <KpiCard
          title="Active Items"
          value={isLoading ? '...' : summary?.activeItems || 0}
          subtitle="Live on storefront"
          icon={CheckCircle2}
          badgeText="Available"
          onClick={() => navigate('/products')}
        />

        {/* 3. Total Categories */}
        <KpiCard
          title="Total Categories"
          value={isLoading ? '...' : summary?.totalCategories || 0}
          subtitle="Gold, Silver & Numismatics"
          icon={Layers}
          badgeText="Collections"
          onClick={() => navigate('/categories')}
        />

        {/* 4. Total Customers */}
        <KpiCard
          title="Total Customers"
          value={isLoading ? '...' : summary?.totalCustomers || 0}
          subtitle="Storefront collectors & VIPs"
          icon={Users}
          badgeText="Buyers"
          onClick={() => navigate('/customers')}
        />

        {/* 5. Total Orders */}
        <KpiCard
          title="Total Orders"
          value={isLoading ? '...' : summary?.totalOrders || 0}
          subtitle="Recorded acquisitions"
          icon={ShoppingBag}
          badgeText="Settlements"
          onClick={() => navigate('/orders')}
        />

        {/* 6. Total Revenue */}
        <KpiCard
          title="Total Revenue"
          value={isLoading ? '...' : summary?.totalRevenue || 0}
          isCurrency={true}
          subtitle="Incl. 15% Buyer's Premium"
          icon={DollarSign}
          trend="+15% BP"
          trendPositive={true}
          onClick={() => navigate('/orders')}
        />

        {/* 7. Pending Payments */}
        <KpiCard
          title="Pending Payments"
          value={isLoading ? '...' : summary?.pendingPayments || 0}
          subtitle="Awaiting wire / gateway"
          icon={CreditCard}
          badgeText={summary?.pendingPayments > 0 ? `${summary.pendingPayments} Pending` : 'All Settled'}
          onClick={() => navigate('/payments')}
        />

        {/* 8. Low Stock Items */}
        <KpiCard
          title="Low Stock Items"
          value={isLoading ? '...' : summary?.lowStockItems || 0}
          subtitle="Unavailable or 1 remaining"
          icon={AlertTriangle}
          badgeText={summary?.lowStockItems > 0 ? 'Review' : 'Stocked'}
          onClick={() => navigate('/products')}
        />
      </div>

      {/* Stock Alert Warning if any items low/unavailable */}
      {summary?.lowStockItems > 0 && (
        <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200/90 flex items-center justify-between gap-3 text-amber-900">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <p className="text-xs font-bold font-serif">Vault Stock Notice</p>
              <p className="text-xs text-amber-800">
                {summary.lowStockItems} lot item(s) are low stock or unavailable in the storefront catalog.
              </p>
            </div>
          </div>
          <Link
            to="/products"
            className="text-xs font-semibold underline text-amber-900 hover:text-amber-950 shrink-0"
          >
            Review Catalog →
          </Link>
        </div>
      )}

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Category Valuation Bar Chart */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 font-serif">
                Catalog Valuation by Category
              </h3>
              <p className="text-xs text-slate-500">
                Total inventory dollar value distributed across rare coin & bullion categories
              </p>
            </div>
            <Link
              to="/categories"
              className="text-xs font-semibold text-aubergine hover:text-gold flex items-center gap-1"
            >
              View Categories <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="h-64 sm:h-72 w-full">
            {isLoading ? (
              <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">
                Loading analytics...
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={summary?.categoryBreakdown || []} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 11, fill: '#64748B' }} 
                    interval={0}
                    tickLine={false}
                  />
                  <YAxis 
                    tick={{ fontSize: 11, fill: '#64748B' }}
                    tickFormatter={(val) => `$${val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}`}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    formatter={(val) => [`$${Number(val).toLocaleString()}`, 'Catalog Value']}
                    contentStyle={{
                      backgroundColor: '#001530',
                      borderRadius: '8px',
                      color: '#FFFFFF',
                      fontSize: '12px',
                      border: 'none',
                    }}
                  />
                  <Bar dataKey="value" fill="#01214A" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Metal Breakdown Donut */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 font-serif">
              Precious Metal Holdings
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Lot distribution by metal composition
            </p>

            <div className="h-44 w-full flex items-center justify-center">
              {isLoading ? (
                <div className="text-xs text-slate-400">Loading metals...</div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={summary?.metalBreakdown || []}
                      innerRadius={45}
                      outerRadius={70}
                      paddingAngle={4}
                      dataKey="count"
                    >
                      {(summary?.metalBreakdown || []).map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={METAL_COLORS[entry.name] || '#64748B'}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(val, name, props) => [`${val} Items`, props.payload.name]}
                      contentStyle={{
                        backgroundColor: '#001530',
                        borderRadius: '8px',
                        color: '#FFFFFF',
                        fontSize: '12px',
                        border: 'none',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
            {(summary?.metalBreakdown || []).map((m) => (
              <div key={m.name} className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: METAL_COLORS[m.name] || '#64748B' }}
                />
                <span className="text-slate-600 font-medium">{m.name}:</span>
                <span className="font-bold text-slate-800 font-mono">{m.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Grid: Recent Orders & Fast Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Orders & Settlements */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 font-serif">
                Recent Orders & Wire Settlements
              </h3>
              <p className="text-xs text-slate-500">
                Latest acquisitions processed through PayPal & Bigfork Bank Wire
              </p>
            </div>
            <Link
              to="/orders"
              className="text-xs font-semibold text-aubergine hover:text-gold flex items-center gap-1"
            >
              All Orders <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50/80 text-[11px] text-slate-500 uppercase font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3">Order #</th>
                  <th className="px-4 py-3">Collector</th>
                  <th className="px-4 py-3">Settlement (incl. 15% BP)</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(summary?.recentOrders || []).map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-4 py-3 font-mono font-semibold text-slate-900">
                      {ord.order_number}
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-800">
                      {ord.customer_name}
                    </td>
                    <td className="px-4 py-3 font-mono font-bold text-aubergine">
                      ${Number(ord.total_settlement).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={ord.payment_status} />
                    </td>
                    <td className="px-4 py-3 text-right text-slate-400">
                      {new Date(ord.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Administrative Shortcuts */}
        <div className="lg:col-span-4 bg-gradient-to-br from-aubergine to-aubergine-dark rounded-2xl p-5 text-white shadow-elevated flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="w-5 h-5 text-gold" />
              <h3 className="text-sm font-bold font-serif tracking-wide text-white">
                Storefront Control Center
              </h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Direct access to numismatic cataloging, client settlements, and storefront parameters for Highlander Gold & Silver.
            </p>

            <div className="space-y-2">
              <Link
                to="/products"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-aubergine-light/70 hover:bg-aubergine-light text-xs font-semibold text-white transition-colors border border-aubergine-muted"
              >
                <span className="flex items-center gap-2">
                  <Plus className="w-4 h-4 text-gold" />
                  Catalog New Lot Item
                </span>
                <ArrowRight className="w-3.5 h-3.5 opacity-60" />
              </Link>

              <Link
                to="/orders"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-aubergine-light/70 hover:bg-aubergine-light text-xs font-semibold text-white transition-colors border border-aubergine-muted"
              >
                <span className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-gold" />
                  Record Bank Wire Settlement
                </span>
                <ArrowRight className="w-3.5 h-3.5 opacity-60" />
              </Link>

              <Link
                to="/customers"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-aubergine-light/70 hover:bg-aubergine-light text-xs font-semibold text-white transition-colors border border-aubergine-muted"
              >
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gold" />
                  Add Customer / User
                </span>
                <ArrowRight className="w-3.5 h-3.5 opacity-60" />
              </Link>

              <Link
                to="/payments"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-aubergine-light/70 hover:bg-aubergine-light text-xs font-semibold text-white transition-colors border border-aubergine-muted"
              >
                <span className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-gold" />
                  Review Payments & Wire Ledger
                </span>
                <ArrowRight className="w-3.5 h-3.5 opacity-60" />
              </Link>
            </div>
          </div>

          <div className="pt-4 border-t border-aubergine-light text-[11px] text-slate-400 flex items-center justify-between">
            <span>Highlander Storefront & Vault</span>
            <span className="text-gold font-mono">Bigfork, MT</span>
          </div>
        </div>
      </div>
    </div>
  );
};
