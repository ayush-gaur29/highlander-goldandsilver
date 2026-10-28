import React from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Coins, 
  Layers, 
  ShoppingBag, 
  CreditCard,
  Users,
  MessageSquareQuote, 
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
      group: 'STOREFRONT MANAGEMENT',
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
          label: 'Inquiries & Buyb...',
          icon: MessageSquareQuote,
          badge: inquiriesCount > 0 ? `${inquiriesCount} new` : null,
          badgeColor: 'bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]'
        }
      ]
    },
    {
      group: 'ADMINISTRATION',
      items: [
        {
          to: '/customers',
          label: 'Users',
          icon: Users,
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
      group: 'SYSTEM',
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
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Aside - Light Ice-Blue to Pearl Gradient */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col bg-gradient-to-b from-[#ECF7FF] via-[#EEF7FD] to-[#F2F9FD] text-slate-800 border-r border-[#D9EAF7] transition-all duration-300 ease-in-out shadow-sm ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${
          isCollapsed ? 'lg:w-20' : 'lg:w-64 w-72'
        }`}
      >
        {/* Brand Header */}
        <div className="pt-6 pb-5 px-4 flex flex-col items-center justify-center border-b border-[#DCEBF7]/80 bg-white/40 relative">
          <Link to="/" className="flex flex-col items-center text-center group">
            {/* Amber/Gold Bordered Box with Mountain Crest */}
            <div className="w-12 h-12 rounded-2xl bg-[#FFF9ED] p-2 border border-[#FBE3B5] shadow-xs flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <img
                src="/assets/brand/highlander_crest_favicon.png"
                alt="Highlander Gold & Silver"
                className="w-full h-full object-contain filter drop-shadow-xs"
                onError={(e) => {
                  e.currentTarget.src = "https://highlander-goldandsilver.vercel.app/assets/brand/highlander_crest_favicon.png";
                }}
              />
            </div>

            {!isCollapsed && (
              <div className="flex flex-col items-center mt-2.5">
                <span className="font-serif font-bold text-sm tracking-[0.2em] text-[#0F1E32] leading-tight">
                  HIGHLANDER
                </span>
                <span className="font-serif text-[#C9A23A] font-semibold text-[10px] tracking-[0.22em] uppercase mt-0.5">
                  GOLD & SILVER
                </span>

                <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/90 border border-slate-200/90 text-[9px] font-bold text-slate-600 tracking-wider shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E5A93C] shrink-0" />
                  <span>ADMIN CONSOLE • BIGFORK</span>
                </div>
              </div>
            )}
          </Link>

          {/* Mobile close button */}
          <button
            onClick={() => setIsMobileOpen(false)}
            className="absolute top-4 right-3 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-white/60 lg:hidden cursor-pointer"
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
                <div className="px-3 mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 font-sans">
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
                          ? 'bg-[#FFFDF7] text-slate-900 font-semibold shadow-xs border border-[#F5B52E]/70'
                          : 'text-slate-600 hover:bg-white/70 hover:text-slate-900 border border-transparent'
                      }`
                    }
                  >
                    <Icon
                      className={`w-4 h-4 sm:w-5 sm:h-5 shrink-0 transition-colors ${
                        isCurrentActive ? 'text-[#D4AF37]' : 'text-slate-400 group-hover:text-slate-600'
                      }`}
                    />

                    {!isCollapsed && (
                      <span className="flex-1 truncate tracking-tight">{item.label}</span>
                    )}

                    {!isCollapsed && isCurrentActive && (
                      <span className="w-2 h-2 rounded-full bg-[#F5B52E] shrink-0 ml-auto shadow-xs" />
                    )}

                    {!isCollapsed && !isCurrentActive && item.badge && (
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          item.badgeColor || 'bg-white text-slate-700 border border-slate-200 shadow-xs'
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
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium text-slate-600 hover:bg-white/70 hover:text-slate-900 transition-colors border border-transparent"
            >
              <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-slate-400" />
              {!isCollapsed && <span className="flex-1 truncate tracking-tight">View Public Storefront</span>}
            </a>
          </div>
        </div>

        {/* Admin User Footer */}
        <div className="p-3.5 border-t border-[#DCEBF7]/80 bg-white/40 flex items-center justify-between">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-[#FFF9ED] border border-[#FBE3B5] flex items-center justify-center text-[#C9A23A] font-bold text-xs shrink-0 font-serif shadow-xs">
              AM
            </div>
            {!isCollapsed && (
              <div className="flex flex-col truncate">
                <span className="text-xs font-bold text-slate-800 truncate font-serif">
                  {adminUser?.name || 'Alexander MacLeod'}
                </span>
                <span className="text-[10px] text-slate-400 truncate font-sans">
                  {adminUser?.role || 'Senior Numismatist & Vault Director'}
                </span>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex p-1.5 text-slate-400 hover:text-slate-700 hover:bg-white/60 rounded-lg transition-colors cursor-pointer"
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
