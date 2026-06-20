"use client";

import { Button, Stack } from "@mantine/core";
import { ChevronUp, ChevronDown } from "lucide-react";

import type { ButtonProps } from "@mantine/core";
import type { JSX } from "react";


interface AbilityButtonProps extends ButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onRight?: (e: React.MouseEvent) => void;
}

export function AbilityButton({ onClick, onRight, children, ...props }: AbilityButtonProps & { children: React.ReactNode; }): JSX.Element {
  const handleContext = (e: React.MouseEvent): void => {
    e.preventDefault();
    if (onRight) onRight(e);
  };

  return (
    <Button
      {...props}
      size="xs"
      variant="outline"
      w={30}
      h={30}
      p={0}
      onClick={onClick}
      onContextMenu={handleContext}
    >
      {children}
    </Button>
  );
}

export function AbilityButtonWithArrows({ onClick, onRight, children, ...props }: AbilityButtonProps & { children: React.ReactNode; }): JSX.Element {
  const handleContext = (e: React.MouseEvent): void => {
    e.preventDefault();
    if (onRight) onRight(e);
  };

  return (
    <Stack gap={0}>
      <Button
        size="xs"
        variant="subtle"
        w={30}
        h={24}
        p={0}
        onClick={onClick}
      >
        <ChevronUp size={16} />
      </Button>

      <AbilityButton onClick={onClick} onRight={handleContext} {...props}>
        {children}
      </AbilityButton>

      <Button
        size="xs"
        variant="subtle"
        w={30}
        h={24}
        p={0}
        onClick={onRight}
      >
        <ChevronDown size={16} />
      </Button>
    </Stack>
  );
}
