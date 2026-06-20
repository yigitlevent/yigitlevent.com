"use client";

import { useState, useCallback } from "react";


export type DrawerNames = "Tools" | "Datasets" | "Checklist" | "My Things";

export function useDrawerState(initialDrawer?: DrawerNames): {
  drawer: DrawerNames | undefined;
  toggleDrawer: (drawerName?: DrawerNames) => void;
} {
  const [drawer, setDrawer] = useState<DrawerNames | undefined>(initialDrawer);

  const toggleDrawer = useCallback((drawerName?: DrawerNames) => {
    setDrawer(current => (current === drawerName ? undefined : drawerName));
  }, []);

  return { drawer, toggleDrawer };
}
