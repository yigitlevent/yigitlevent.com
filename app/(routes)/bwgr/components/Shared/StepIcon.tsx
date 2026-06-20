"use client";

import { Check, X, Circle } from "lucide-react";

import type { JSX } from "react";


interface StepIconProps {
  active?: boolean;
  completed?: boolean;
  className?: string;
}

export function StepIcon({ active, completed, className }: StepIconProps): JSX.Element {
  return (
    <div className={className}>
      {completed ? (
        <Check size={18} className="text-green-500" />
      ) : active ? (
        <Circle size={8} className="text-yellow-500" />
      ) : (
        <X size={18} className="text-red-500" />
      )}
    </div>
  );
}
