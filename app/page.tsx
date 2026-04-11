"use client";

import { Box, Container, Grid, Paper, SimpleGrid, Space, Stack, Text, Title } from "@mantine/core";

import { JourneySoFar } from "./(routes)/home/JourneySoFar";
import { MyCurrentProjects } from "./(routes)/home/MyCurrentProjects";
import { MyOldProjects } from "./(routes)/home/MyOldProjects";
import { Skills } from "./(routes)/home/Skills";

import type { CSSProperties, ReactNode } from "react";


function Section({ title, children }: { title: string; children: ReactNode; }): React.JSX.Element {
  const sectionStyle: CSSProperties = {
    background: "linear-gradient(180deg, rgba(30,58,95,0.92), rgba(15,23,42,0.96))",
    borderColor: "rgba(156,163,175,0.24)"
  };

  return (
    <Stack gap="sm">
      <Title order={2} tt="lowercase" px="xs">{title}</Title>

      <Paper
        withBorder
        radius={0}
        p={{ base: "md", md: "lg" }}
        style={sectionStyle}
      >
        {children}
      </Paper>
    </Stack>
  );
}

export default function Home(): React.JSX.Element {
  const heroStyle: CSSProperties = {
    background: "radial-gradient(circle at 15% 15%, rgba(125,211,252,0.28), transparent 45%), linear-gradient(135deg, rgba(30,58,95,0.94), rgba(15,23,42,0.96))",
    border: "1px solid rgba(148,163,184,0.24)"
  };

  return (
    <Container size="xl" py={{ base: "lg", md: "xl" }}>
      <Stack gap="xl">
        <Paper
          radius={0}
          p={{ base: "lg", md: "xl" }}
          style={heroStyle}
        >
          <Stack gap="xs">
            <Text size="sm" tt="uppercase" fw={700} c="blue.1" style={{ letterSpacing: "0.08em" }}>
              personal playground
            </Text>

            <Title order={1} tt="lowercase" style={{ lineHeight: 1.05 }}>yigit levent.com</Title>
            <Text c="gray.3" maw={660}>my unnecessarily complicated website, now with a cleaner reading flow and better section rhythm.</Text>
          </Stack>
        </Paper>

        <Section title="me">
          <Grid>
            <Grid.Col span={{ base: 12, lg: 8 }}>
              <JourneySoFar />
            </Grid.Col>

            <Grid.Col span={{ base: 12, lg: 4 }}>
              <Skills />
            </Grid.Col>
          </Grid>
        </Section>

        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg" verticalSpacing="lg">
          <Box>
            <Section title="my current projects">
              <MyCurrentProjects />
            </Section>
          </Box>

          <Box>
            <Section title="my old projects">
              <MyOldProjects />
            </Section>
          </Box>
        </SimpleGrid>

        <Space h={120} />
      </Stack>
    </Container>
  );
}
