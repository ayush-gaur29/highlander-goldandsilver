import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Current admin session
  const [adminUser, setAdminUser] = useState({
    name: 'Alexander MacLeod',
    role: 'Senior Numismatist & Vault Director',
    email: 'Stratford1955@icloud.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    location: 'Bigfork Storefront & Vault, MT',
    badge: 'Super Admin'
  });

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New Bank Wire Settlement Request',
      detail: 'Lot #1 (1876 George T. Morgan $100) — Col. Harrison Bradley',
      time: '12m ago',
      read: false
    },
    {
      id: 2,
      title: 'Low Stock Alert',
      detail: 'Scottsdale 10 oz Silver Stacker is currently marked Unavailable',
      time: '1h ago',
      read: false
    },
    {
      id: 3,
      title: 'New Collector Acquisition Inquiry',
      detail: 'David K. Campbell inquired regarding estate buyback appraisal',
      time: '3h ago',
      read: true
    }
  ]);

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const logout = () => {
    // In admin mock, reset or prompt
    alert('Admin session ended. You can sign back in anytime.');
  };

  return (
    <AuthContext.Provider value={{ adminUser, setAdminUser, notifications, markAllNotificationsRead, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

