import React, { createContext, useContext, useState } from "react";
import { formatINR, formatUSD } from "../utils/formatters";

const CurrencyContext = createContext();

export function CurrencyProvider({ children }) {
  const [preferredCurrency, setPreferredCurrency] = useState("INR");
  const [exchangeRate, setExchangeRate] = useState(0.012); // 1 INR = 0.012 USD

  const convertInrToUsd = (inr) => {
    return Math.round(inr * exchangeRate);
  };

  const convertUsdToInr = (usd) => {
    return Math.round(usd / exchangeRate);
  };

  const formatPrice = (inrAmount, showBoth = true) => {
    const usd = convertInrToUsd(inrAmount);
    if (!showBoth) {
      return preferredCurrency === "INR" ? formatINR(inrAmount) : formatUSD(usd);
    }
    return {
      inr: formatINR(inrAmount),
      usd: `≈$${usd}`,
      rawInr: inrAmount,
      rawUsd: usd
    };
  };

  return (
    <CurrencyContext.Provider
      value={{
        preferredCurrency,
        setPreferredCurrency,
        exchangeRate,
        setExchangeRate,
        convertInrToUsd,
        convertUsdToInr,
        formatPrice
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}

