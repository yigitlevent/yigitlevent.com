"use client";


import { RulesetProvider } from "./RulesetContext";
import { UserProvider } from "./UserContext";

import type { JSX, ReactNode } from "react";


interface BwgrProvidersProps {
  children: ReactNode;
}

export function BwgrProviders({ children }: BwgrProvidersProps): JSX.Element {
  return (
    <UserProvider>
      <RulesetProvider>
        {children}
      </RulesetProvider>
    </UserProvider>
  );
}
