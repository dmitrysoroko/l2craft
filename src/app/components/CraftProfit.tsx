"use client";

import { Dispatch, SetStateAction } from "react";

const toPercent = (value: number) => {
  return `${(value * 100).toFixed(2)}%`;
};

interface CraftProfitProps {
  borderColor: string;
  label: "D" | "C" | "B" | "A";
  soulshotsCraftCost: number;
  soulshotsSellCost: number;
  setSoulshotsSellCost: Dispatch<SetStateAction<number>>;
  soulshotsCraftProfit: number;
  blessedSpiritshotCraftCost: number;
  blessedSpiritshotSellCost: number;
  setBlessedSpiritshotSellCost: Dispatch<SetStateAction<number>>;
  blessedSpiritshotCraftProfit: number;
  calculateBlessedSpiritshotICProfit: () => number;
  calculateSoulshotsICProfit: () => number;
}

export default function CraftProfit({
  borderColor,
  label,
  soulshotsCraftCost,
  setSoulshotsSellCost,
  soulshotsSellCost,
  soulshotsCraftProfit,
  blessedSpiritshotCraftCost,
  blessedSpiritshotSellCost,
  setBlessedSpiritshotSellCost,
  blessedSpiritshotCraftProfit,
  calculateBlessedSpiritshotICProfit,
  calculateSoulshotsICProfit,
}: CraftProfitProps) {
  return (
    <div
      className="flex w-580 flex-col border-2 border-solid"
      style={{ borderColor: borderColor }}
    >
      <span>
        SS{label} craft: {soulshotsCraftCost.toFixed(2)} | SS{label} sell:
        <input
          onChange={e => setSoulshotsSellCost(Number(e.target.value))}
          type="number"
          value={soulshotsSellCost}
        />{" "}
        Profit: {toPercent(soulshotsCraftProfit)}
      </span>
      <span>
        BSS{label} craft: {blessedSpiritshotCraftCost.toFixed(2)} | BSS{label}{" "}
        sell:
        <input
          onChange={e => setBlessedSpiritshotSellCost(Number(e.target.value))}
          type="number"
          value={blessedSpiritshotSellCost}
        />{" "}
        Profit: {toPercent(blessedSpiritshotCraftProfit)}
      </span>
      <span>
        SS{label} craft Ivory coin Profit:{" "}
        {calculateSoulshotsICProfit().toFixed(2)}
      </span>
      <span>
        BSS{label} craft Ivory coin Profit:{" "}
        {calculateBlessedSpiritshotICProfit().toFixed(2)}
      </span>
    </div>
  );
}
