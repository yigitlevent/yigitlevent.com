"use client";

import { CharacterBurner } from "./CharacterBurner";
import { BurningCharacterProvider } from "../../hooks/BurningCharacterProvider";

import type { JSX } from "react";


// eslint-disable-next-line @typescript-eslint/naming-convention
export const dynamic = "force-dynamic";

export default function CharacterBurnerPage(): JSX.Element {
  return (
    <BurningCharacterProvider>
      <CharacterBurner />
    </BurningCharacterProvider>
  );
}
