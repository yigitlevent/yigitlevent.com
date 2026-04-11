import { Anchor, Card, Group, SimpleGrid, Stack, Text, Title } from "@mantine/core";

import type { JSX } from "react";


export function MyOldProjects(): JSX.Element {
  const projects = [
    {
      name: "TERSH Boilerplate",
      href: "https://github.com/yigitlevent/tersh-boilerplate",
      body: "A boilerplate for desktop development via Electron, React, SCSS, and TypeScript. Configuration and codebase are minimal and were focused on speed of iteration."
    },
    {
      name: "Easy Dictionary",
      href: "https://github.com/yigitlevent/easy-dictionary",
      body: "A small app to track a conlang dictionary. I may revisit this in the future and bring it into this website."
    },
    {
      name: "Autarkis",
      href: "https://github.com/yigitlevent/autarkis",
      body: "A tabletop utility for VtR 5e with character generation and Supabase integration.",
      extraName: "Autarkis Bot",
      extraHref: "https://github.com/yigitlevent/autarkis-bot"
    },
    {
      name: "Eshaton",
      href: "https://github.com/yigitlevent/eshaton",
      body: "Another tabletop utility, this time for Degenesis. It used a backend stack with Express and PostgreSQL."
    }
  ];

  return (
    <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
      {projects.map(project => (
        <Card key={project.name} withBorder radius="md" p="lg" bg="dark.6">
          <Stack gap="sm">
            <Title order={3}>
              <Anchor href={project.href} target="_blank" rel="noreferrer" underline="never">
                {project.name}
              </Anchor>
            </Title>

            <Text>
              {project.body}

              {project.extraHref ? (
                <Group component="span" gap={4}>
                  <Text component="span">Also:</Text>

                  <Anchor component="a" href={project.extraHref} target="_blank" rel="noreferrer">
                    {project.extraName}
                  </Anchor>
                </Group>
              ) : null}
            </Text>
          </Stack>
        </Card>
      ))}
    </SimpleGrid>
  );
}
