import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Coins, 
  Layers, 
  ShoppingBag, 
  CreditCard,
  Tag,
  Users,
  MessageSquareQuote, 
  ShieldCheck,
  Settings,
  ChevronLeft, 
  ChevronRight,
  ExternalLink,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Sidebar = ({ 
  isCollapsed, 
  setIsCollapsed, 
  isMobileOpen, 
  setIsMobileOpen,
  inquiriesCount = 1
}) => {
  const location = useLocation();
  const { adminUser } = useAuth();

  const navGroups = [
    {
      group: 'Storefront Management',
      items: [
        {
          to: '/',
          label: 'Dashboard Overview',
          icon: LayoutDashboard,
          badge: null
        },
        {
          to: '/inventory',
          alternateTo: '/products',
          label: 'Product Catalog',
          icon: Coins,
          badge: '10'
        },
        {
          to: '/categories',
          label: 'Categories & Metals',
          icon: Layers,
          badge: null
        },
        {
          to: '/orders',
          label: 'Orders & Settlements',
          icon: ShoppingBag,
          badge: null
        },
        {
          to: '/inquiries',
          label: 'Inquiries & Buyback',
          icon: MessageSquareQuote,
          badge: inquiriesCount > 0 ? `${inquiriesCount} new` : null,
          badgeColor: 'bg-[#C9A23A] text-[#071A35]'
        }
      ]
    },
    {
      group: 'Administration',
      items: [
        {
          to: '/customers',
          label: 'Users',
          icon: Users,
          badge: null
        },
        {
          to: '/admin-users',
          label: 'Admin Users',
          icon: ShieldCheck,
          badge: 'Staff'
        },
        {
          to: '/coupons',
          label: 'Coupons',
          icon: Tag,
          badge: null
        },
        {
          to: '/payments',
          label: 'Payments',
          icon: CreditCard,
          badge: null
        }
      ]
    },
    {
      group: 'System',
      items: [
        {
          to: '/settings',
          label: 'Settings',
          icon: Settings,
          badge: null
        }
      ]
    }
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#040F20]/80 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Aside */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col bg-[#071A35] text-slate-200 border-r border-[#C9A23A]/20 transition-all duration-300 ease-in-out shadow-2xl ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${
          isCollapsed ? 'lg:w-20' : 'lg:w-64 w-72'
        }`}
      >
        {/* Brand Header with generous top margin & proper logo alignment */}
        <div className="pt-6 pb-5 px-4 flex items-center justify-between border-b border-[#C9A23A]/15 bg-[#071A35]">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#C9A23A]/25 via-[#0B2348] to-[#C9A23A]/10 p-1.5 border border-[#C9A23A]/40 shadow-sm shrink-0 flex items-center justify-center">
              <img
                src="https://highlander-goldandsilver.vercel.app/assets/brand/highlander_crest_favicon.png"
                alt="Highlander Gold & Silver Crest"
                className="w-full h-full object-contain filter drop-shadow-sm"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>

            {!isCollapsed && (
              <div className="flex flex-col min-w-0 justify-center">
                <div className="flex items-center gap-1.5">
                  <span className="font-serif font-bold text-sm tracking-wider text-white">
                    HIGHLANDER
                  </span>
                  <span className="text-[#C9A23A] font-serif font-semibold text-[10px] px-1.5 py-0.5 rounded bg-[#C9A23A]/15 border border-[#C9A23A]/30 leading-none">
                    G&S
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono mt-1 truncate">
                  Admin Console • Bigfork
                </span>
              </div>
            )}
          </div>

          {/* Mobile close button */}
          <button
            onClick={() => setIsMobileOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#0B2348] lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Grouped Navigation list */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5 scrollbar-thin">
          {navGroups.map((group, groupIdx) => (
            <div key={group.group || groupIdx} className="space-y-1">
              {!isCollapsed && (
                <div className="px-3 mb-1.5 text-[10px] font-bold uppercase tracking-wider text-[#C9A23A]/85 font-serif">
                  {group.group}
                </div>
              )}

              {group.items.map((item) => {
                const Icon = item.icon;
                const isCurrentActive = location.pathname === item.to || 
                  (item.alternateTo && location.pathname === item.alternateTo);

                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setIsMobileOpen(false)}
                    title={isCollapsed ? item.label : undefined}
                    className={() =>
                      `flex items-center gap-3 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all group relative ${
                        isCurrentActive
                          ? 'bg-[#0B2348] text-white font-semibold shadow-sm border border-[#C9A23A]/40'
                          : 'text-slate-300 hover:bg-[#0B2348]/60 hover:text-white border border-transparent'
                      }`
                    }
                  >
                    <Icon
                      className={`w-4 h-4 sm:w-5 sm:h-5 shrink-0 transition-colors ${
                        isCurrentActive ? 'text-[#C9A23A]' : 'text-slate-400 group-hover:text-[#DEBC5E]'
                      }`}
                    />

                    {!isCollapsed && (
                      <span className="flex-1 truncate tracking-tight">{item.label}</span>
                    )}

                    {!isCollapsed && item.badge && (
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          item.badgeColor || 'bg-[#071A35] text-[#C9A23A] border border-[#C9A23A]/30'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          ))}

          {/* View Public Storefront Link under System */}
          <div className="space-y-1 pt-1">
            <a
              href="https://highlander-goldandsilver.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              title="View Public Storefront"
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium text-slate-300 hover:bg-[#0B2348]/60 hover:text-[#C9A23A] transition-colors border border-transparent"
            >
              <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-[#C9A23A]" />
              {!isCollapsed && <span className="flex-1 truncate tracking-tight">View Public Storefront</span>}
            </a>
          </div>
        </div>

        {/* Admin User Footer / Desktop Collapse Toggle with Glassmorphism Accent */}
        <div className="p-3 border-t border-[#C9A23A]/20 bg-[#071A35]/95 flex items-center justify-between">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-[#C9A23A]/20 border border-[#C9A23A]/40 flex items-center justify-center text-[#C9A23A] font-bold text-xs shrink-0 font-serif">
              AM
            </div>
            {!isCollapsed && (
              <div className="flex flex-col truncate">
                <span className="text-xs font-semibold text-white truncate">{adminUser?.name || 'Alexander MacLeod'}</span>
                <span className="text-[10px] text-slate-400 truncate">{adminUser?.role || 'Vault Director'}</span>
              </div>
            )}
          </div>

          {/* Desktop sidebar collapse toggle */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex p-1.5 text-slate-400 hover:text-white hover:bg-[#0B2348] rounded-lg transition-colors"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-label="Toggle sidebar width"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
      </aside>
    </>
  );
};
