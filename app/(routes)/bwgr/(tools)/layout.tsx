"use client";

import { Button, Container, Stack } from "@mantine/core";
import Link from "next/link";

import type { JSX, ReactNode } from "react";


export default function ToolsLayout({ children }: { children: ReactNode; }): JSX.Element {
  return (
    <Container size="lg" py="xl">
      <Button
        component={Link}
        href="/bwgr"
        variant="subtle"
        size="sm"
        mb="xl"
      >
        ← Back
      </Button>

      <Stack gap="lg">
        {children}
      </Stack>
    </Container>
  );
}
