"use client";

import { Dispatch, SetStateAction } from "react";

interface CristalBlockProps {
  cristalCost: number;
  setCristalCost: Dispatch<SetStateAction<number>>;
  armCost: number;
  setArmCost: Dispatch<SetStateAction<number>>;
  wipCost: number;
  setWipCost: Dispatch<SetStateAction<number>>;
  armAdenCost: number;
  armICCost: number;
  cristalPerArm: number;
  wipAdenCost: number;
  wipICCost: number;
  cristalPerWip: number;
  cristalLabel: "Dx" | "Cx" | "Bx" | "Ax";
}

const borderColors = {
  Dx: "blue",
  Cx: "green",
  Bx: "red",
  Ax: "grey",
};

export default function CristalBlock({
  cristalCost,
  setCristalCost,
  armCost,
  setArmCost,
  wipCost,
  setWipCost,
  armAdenCost,
  armICCost,
  cristalPerArm,
  wipAdenCost,
  wipICCost,
  cristalPerWip,
  cristalLabel,
}: CristalBlockProps) {
  return (
    <div
      className="flex w-580 flex-col border-2 border-solid"
      style={{ borderColor: borderColors[cristalLabel] }}
    >
      <span>
        {cristalLabel} Cost:
        <input
          onChange={e => setCristalCost(Number(e.target.value))}
          type="number"
          value={cristalCost}
        />
      </span>
      <span>
        {cristalLabel} Cost from Arm:
        <input
          onChange={e => setArmCost(Number(e.target.value))}
          type="number"
          value={armCost}
        />
        : {(armCost / cristalPerArm).toFixed(2)} | IC Profit:
        {((armCost - armAdenCost) / armICCost).toFixed(2)}
      </span>
      <span>
        {cristalLabel} Cost from Wip:
        <input
          onChange={e => setWipCost(Number(e.target.value))}
          type="number"
          value={wipCost}
        />
        : {(wipCost / cristalPerWip).toFixed(2)} | IC Profit:
        {((wipCost - wipAdenCost) / wipICCost).toFixed(2)}
      </span>
    </div>
  );
}
