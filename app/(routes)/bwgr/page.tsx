"use client";

import { Container, Title, Text, Button, Grid, Card, Group, Badge } from "@mantine/core";
import Link from "next/link";

import { useRulesetContext } from "./hooks/RulesetContext";
import { useUserContext } from "./hooks/UserContext";

import type { JSX } from "react";


const TOOLS = [
  {
    name: "Dice Roller",
    slug: "dice-roller",
    description: "Calculate dice probabilities for Burning Wheel",
    category: "Utility"
  },
  {
    name: "Character Burner",
    slug: "character-burner",
    description: "Create and develop Burning Wheel characters",
    category: "Character Building"
  },
  {
    name: "Fight Planner",
    slug: "fight-planner",
    description: "Plan and resolve firefights",
    category: "Combat"
  },
  {
    name: "Range & Cover Planner",
    slug: "rac-planner",
    description: "Plan range & cover actions",
    category: "Combat"
  },
  {
    name: "Duel of Wits Planner",
    slug: "duel-of-wits-planner",
    description: "Plan duel of wits exchanges",
    category: "Combat"
  },
  {
    name: "Magic Wheel",
    slug: "magic-wheel",
    description: "Generate spells for Sorcery and Wizard magic systems",
    category: "Magic"
  },
  {
    name: "Practice Planner",
    slug: "practice-planner",
    description: "Plan character practice and progression",
    category: "Character Building"
  },
  {
    name: "Lifepath Explorer",
    slug: "lifepath-explorer",
    description: "Browse and search lifepaths",
    category: "Reference"
  },
  {
    name: "Skill Explorer",
    slug: "skill-explorer",
    description: "Browse and search skills",
    category: "Reference"
  },
  {
    name: "Trait Explorer",
    slug: "trait-explorer",
    description: "Browse and search traits",
    category: "Reference"
  }
];

const CATEGORIES = [...new Set(TOOLS.map(t => t.category))];

export default function BwgrPage(): JSX.Element {
  const { user, triedAuth } = useUserContext();
  const { fetchState } = useRulesetContext();

  if (!triedAuth) {
    return (
      <Container py="xl">
        <Title order={1}>Loading...</Title>
      </Container>
    );
  }

  return (
    <Container size="lg" py="xl">
      <Group justify="space-between" mb="xl">
        <div>
          <Title order={1}>Burning Wheel Tools</Title>

          <Text c="dimmed" mt="xs">
            {user ? `Welcome, ${user.email}` : "Sign in to access all features"}
          </Text>
        </div>

        {user && (
          <Button component={Link} href="/bwgr/settings" variant="light">
            Settings
          </Button>
        )}
      </Group>

      <Text mb="lg" c="dimmed">
        Data loading:
        {" "}
        {fetchState}
      </Text>

      {CATEGORIES.map(category => (
        <div key={category} style={{ marginBottom: "2rem" }}>
          <Group mb="md">
            <Title order={2}>{category}</Title>
            <Badge variant="light">{TOOLS.filter(t => t.category === category).length}</Badge>
          </Group>

          <Grid>
            {TOOLS.filter(t => t.category === category).map(tool => (
              <Grid.Col key={tool.slug} span={{ base: 12, sm: 6, md: 4 }}>
                <Card component={Link} href={`/bwgr/${tool.slug}`} shadow="sm" padding="lg" radius="md" withBorder className="h-full hover:shadow-md transition-shadow">
                  <Card.Section withBorder inheritPadding py="md">
                    <Title order={3}>{tool.name}</Title>
                  </Card.Section>

                  <Text size="sm" c="dimmed" mt="md">
                    {tool.description}
                  </Text>

                  <Button fullWidth mt="md" radius="md" component="div">
                    Open
                  </Button>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        </div>
      ))}
    </Container>
  );
}
