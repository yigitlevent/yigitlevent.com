import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

import type { Metadata } from "next";

import "./globals.css";


// eslint-disable-next-line @typescript-eslint/naming-convention, react-refresh/only-export-components
export const metadata: Metadata = {
  title: "yigitlevent.com",
  description: "my unnecessarily complicated website"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>): React.JSX.Element {
  return (
    <html
      lang="en"
      className="h-full"
    >
      <body className="min-h-full">
        <MantineProvider defaultColorScheme="dark">
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}

