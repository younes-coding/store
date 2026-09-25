import React, { createContext, useContext } from 'react';

export type CurrencyCode = 'DZD';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  symbolAr: string;
  name: string;
  nameAr: string;
  rateFromBaseDZD: number;
  decimals: number;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  DZD: {
    code: 'DZD',
    symbol: 'DA',
    symbolAr: 'د.ج',
    name: 'Algerian Dinar',
    nameAr: 'دينار جزائري',
    rateFromBaseDZD: 1,
    decimals: 0
  }
};

interface CurrencyContextType {
  currentCurrency: CurrencyCode;
  currencyConfig: CurrencyConfig;
  setCurrency: (code: CurrencyCode) => void;
  formatPrice: (amountInDZD: number) => string;
  convertPrice: (amountInDZD: number) => number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const currentCurrency: CurrencyCode = 'DZD';
  const currencyConfig = CURRENCIES.DZD;

  const setCurrency = (_code: CurrencyCode) => {
    // Only DZD is used
  };

  const convertPrice = (amountInDZD: number): number => {
    if (!amountInDZD || isNaN(amountInDZD)) return 0;
    return Math.round(amountInDZD);
  };

  const formatPrice = (amountInDZD: number): string => {
    const val = convertPrice(amountInDZD);
    return `${val} د.ج`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currentCurrency,
        currencyConfig,
        setCurrency,
        formatPrice,
        convertPrice
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
