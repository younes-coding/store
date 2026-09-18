import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { apiRequest } from '../api/client';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';

interface LiveOrdersContextType {
  orders: any[];
  pendingOrdersCount: number;
  lastUpdated: Date;
  refreshOrders: () => Promise<void>;
  isLiveSyncing: boolean;
}

const LiveOrdersContext = createContext<LiveOrdersContextType | undefined>(undefined);

// Synthesize pleasant luxury notification chime using Web Audio API
export const playOrderNotificationSound = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    // First chime tone
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(659.25, ctx.currentTime); // E5
    osc1.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12); // A5
    gain1.gain.setValueAtTime(0.18, ctx.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start();
    osc1.stop(ctx.currentTime + 0.35);

    // Second bell tone
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(1046.50, ctx.currentTime + 0.1); // C6
    gain2.gain.setValueAtTime(0.15, ctx.currentTime + 0.1);
    gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(ctx.currentTime + 0.1);
    osc2.stop(ctx.currentTime + 0.5);
  } catch {
    // Graceful fallback if audio context blocked before interaction
  }
};

export const LiveOrdersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const [orders, setOrders] = useState<any[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isLiveSyncing] = useState<boolean>(true);

  const previousOrderIdsRef = useRef<Set<string>>(new Set());
  const isFirstLoadRef = useRef<boolean>(true);

  const fetchOrdersSilently = useCallback(async () => {
    if (!isAuthenticated) return;

    try {
      const res = await apiRequest('/orders');
      if (res.success && Array.isArray(res.data)) {
        const currentOrders: any[] = res.data;
        const currentIds = new Set(currentOrders.map(o => String(o._id || o.orderId)));

        // Detect newly placed orders
        if (!isFirstLoadRef.current) {
          const newOrders = currentOrders.filter(
            o => !previousOrderIdsRef.current.has(String(o._id || o.orderId))
          );

          if (newOrders.length > 0) {
            playOrderNotificationSound();
            const latest = newOrders[0];
            showToast(
              '🔔 طلب جديد وارد للمتجر!',
              `طلب رقم #${latest.orderId} من العميل (${latest.customer?.fullName || 'زبون جديد'}) بمبلغ ${Number(latest.totalAmount || 0).toLocaleString('ar-DZ')} د.ج`,
              'order',
              0 // Stays until user clicks (X)
            );
          }
        }

        previousOrderIdsRef.current = currentIds;
        isFirstLoadRef.current = false;
        setOrders(currentOrders);
        setLastUpdated(new Date());
      }
    } catch (err) {
      console.error('Silent live orders sync error:', err);
    }
  }, [isAuthenticated, showToast]);

  // Initial fetch and 4-second live background polling
  useEffect(() => {
    if (!isAuthenticated) {
      setOrders([]);
      isFirstLoadRef.current = true;
      previousOrderIdsRef.current.clear();
      return;
    }

    fetchOrdersSilently();

    const intervalId = setInterval(() => {
      fetchOrdersSilently();
    }, 4000);

    return () => clearInterval(intervalId);
  }, [isAuthenticated, fetchOrdersSilently]);

  const pendingOrdersCount = orders.filter(
    o => o.status === 'Pending' || o.status === 'Processing'
  ).length;

  return (
    <LiveOrdersContext.Provider
      value={{
        orders,
        pendingOrdersCount,
        lastUpdated,
        refreshOrders: fetchOrdersSilently,
        isLiveSyncing
      }}
    >
      {children}
    </LiveOrdersContext.Provider>
  );
};

export const useLiveOrders = () => {
  const context = useContext(LiveOrdersContext);
  if (!context) {
    throw new Error('useLiveOrders must be used within LiveOrdersProvider');
  }
  return context;
};
