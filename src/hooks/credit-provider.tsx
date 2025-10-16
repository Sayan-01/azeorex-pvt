"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface CreditContextType {
  credits: number;
  decrementCredits: (amount: number) => Promise<void>;
}

const CreditContext = createContext<CreditContextType | undefined>(undefined);

export const CreditProvider = ({ children }: { children: ReactNode }) => {
  const [credits, setCredits] = useState<number>(0);

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const res = await fetch("/api/user/credits");
        const data = await res.json();
        setCredits(data.credits);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCredits();
  }, []);

  const decrementCredits = async (amount: number) => {
    const prev = credits;
    setCredits(prev - amount);
    try {
      const res = await fetch("/api/user/credits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });
      
      const data = await res.json();
      console.log("second: ", data.credits);
      
      if (res.ok) setCredits(data.credits);
      else setCredits(prev); 
    } catch (err) {
      console.error(err);
      setCredits(prev);
    }
  };

  return <CreditContext.Provider value={{ credits, decrementCredits }}>{children}</CreditContext.Provider>;
};

export const useCredits = () => {
  const context = useContext(CreditContext);
  if (!context) throw new Error("useCredits must be used inside CreditProvider");
  return context;
};
