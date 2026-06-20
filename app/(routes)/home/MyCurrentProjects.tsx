import { Anchor, Card, SimpleGrid, Stack, Text, Title } from "@mantine/core";

import type { JSX } from "react";


export function MyCurrentProjects(): JSX.Element {
  const appUrl = (process.env.NEXT_PUBLIC_APP_URL ?? "https://yigitlevent.com").replace(/\/$/, "");

  const projects = [
    {
      name: "yigitlevent.com",
      href: appUrl,
      body: "This is my sysadmin, devops, backend, and frontend project. I wanted to overcomplicate things to learn more about server administration, Linux, and deployment flows."
    },
    {
      name: "BWGR Tools",
      href: `${appUrl}/bwgr`,
      body: "A new iteration of one of my oldest projects: utilities for Burning Wheel Gold. The plan is to integrate this with the API for a better user experience."
    }
    /* {
      name: "Megagame",
      href: `${appUrl}/megagame`,
      body: "A project for a megagame management tool. I haven't started development on this yet, but the plan is to have a platform for megagame organizers to manage their games and for players to view game information and schedules."
    } */
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

            <Text>{project.body}</Text>
          </Stack>
        </Card>
      ))}
    </SimpleGrid>
  );
}
