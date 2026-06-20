"use client";

import { Stack, Title, Text } from "@mantine/core";
import { Fragment, useState } from "react";


import { GeneralSkillModal } from "./Modals/GeneralSkillModal";
import { GeneralTraitModal } from "./Modals/GeneralTraitModal";
import { LifepathSelectionModal } from "./Modals/LifepathSelectionModal";
import { ResourceSelectionModal } from "./Modals/ResourceSelectionModal";
import { Attributes } from "./Sections/Attributes";
import { Basics } from "./Sections/Basics";
import { Beliefs } from "./Sections/Beliefs";
import { Instincts } from "./Sections/Instincts";
import { Resources } from "./Sections/Resources";
import { Skills } from "./Sections/Skills";
import { Stats } from "./Sections/Stats";
import { Tolerances } from "./Sections/Tolerances";
import { Traits } from "./Sections/Traits";
import { useBurningCharacter } from "../../hooks/BurningCharacterProvider";

import type { JSX } from "react";


type BwgrCharacterBurnerModals = "lifepath" | "skill" | "trait" | "resource" | null;

export function CharacterBurner(): JSX.Element {
  const { state } = useBurningCharacter();
  const [currentModal, setCurrentModal] = useState<BwgrCharacterBurnerModals>(null);

  const openModal = (modal: BwgrCharacterBurnerModals): void => {
    setCurrentModal(modal);
  };

  const closeModal = (): void => {
    setCurrentModal(null);
  };

  const hasSkills = state.skills.length > 0;
  const hasTraits = state.traits.length > 0;
  const hasLifepaths = state.lifepaths.lifepaths.length > 0;

  return (
    <Fragment>
      <Stack gap="lg">
        <div>
          <Title order={1} mb="xs">Character Burner</Title>
          <Text c="dimmed">Build your Burning Wheel character through lifepaths and advancement</Text>
        </div>

        <Basics openModal={openModal} />
        <Stats />
        {hasSkills && <Skills openModal={openModal} />}
        {hasTraits && <Traits openModal={openModal} />}
        <Attributes />

        {hasLifepaths && (
          <Fragment>
            <Resources openModal={openModal} />
            <Tolerances />
            <Beliefs />
            <Instincts />
          </Fragment>
        )}
      </Stack>

      {/* Modals */}
      <LifepathSelectionModal isOpen={currentModal === "lifepath"} close={closeModal} />
      <GeneralSkillModal isOpen={currentModal === "skill"} close={closeModal} />
      <GeneralTraitModal isOpen={currentModal === "trait"} close={closeModal} />
      <ResourceSelectionModal isOpen={currentModal === "resource"} close={closeModal} />
    </Fragment>
  );
}
