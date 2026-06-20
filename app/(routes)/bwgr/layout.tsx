"use client";

import { BwgrProviders } from "./hooks/BwgrProviders";


export default function BwgrLayout({ children }: { children: React.ReactNode; }): React.JSX.Element {
  return (
    <BwgrProviders>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {children}
      </div>
    </BwgrProviders>
  );
}
