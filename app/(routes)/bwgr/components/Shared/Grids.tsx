"use client";

import { Grid } from "@mantine/core";

import type { GridProps } from "@mantine/core";
import type { JSX } from "react";


interface GenericGridProps extends Omit<GridProps, "children"> {
  children: React.ReactNode;
  columns?: number;
}

export function GenericGrid({ children, columns = 3, ...props }: GenericGridProps): JSX.Element {
  return (
    <Grid columns={columns} {...props}>
      {children}
    </Grid>
  );
}
