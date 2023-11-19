"use client";

import { PropsWithChildren } from "react";

interface CraftProfitProps extends PropsWithChildren {
  borderColor: string;
}

export default function GradeBlock({
  borderColor,
  children,
}: CraftProfitProps) {
  return (
    <div
      className="flex w-580 flex-col border-2 border-solid"
      style={{ borderColor: borderColor }}
    >
      {children}
    </div>
  );
}
