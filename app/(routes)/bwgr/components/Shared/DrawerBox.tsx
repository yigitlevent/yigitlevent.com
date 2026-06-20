"use client";

import { Drawer } from "@mantine/core";

import type { JSX } from "react";


interface DrawerBoxProps {
  children: React.ReactNode;
  title: string;
  expanded: boolean;
  onClose: () => void;
}

export function DrawerBox({ children, title, expanded, onClose }: DrawerBoxProps): JSX.Element {
  return (
    <Drawer
      opened={expanded}
      onClose={onClose}
      position="right"
      title={title}
      padding="md"
      size="sm"
    >
      {children}
    </Drawer>
  );
}
