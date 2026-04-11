import { Paper, Stack, Text, Title } from "@mantine/core";

import type { JSX } from "react";


function SkillCard({ skill }: { skill: { name: string; things: string[]; }; }): JSX.Element {
  return (
    <Paper withBorder p="sm" radius="md" bg="dark.6">
      <Text fw={700}>{skill.name}</Text>

      <Stack gap={2} mt={4}>
        {skill.things.map(item => (
          <Text key={`${skill.name}-${item}`} size="sm" c="dimmed">{item}</Text>
        ))}
      </Stack>
    </Paper>
  );
}

export function Skills(): JSX.Element {
  const skillsList = [
    { name: "js/ts", things: ["frontend, desktop apps, backend", "react, redux, zustand, immer, electron, axios, and more"] },
    { name: "f#", things: ["simulations, data analysis", "fsharp.data, fsharp.stats, plotly.net, ml.net, and more"] },
    { name: "python", things: ["data analysis", "plotly, scipy, pandas, apache spark, and more"] },
    { name: "c++", things: ["game development", "usually with custom game engines"] },
    { name: "sql", things: ["postgresql"] },
    { name: "nosql", things: ["mongodb"] }
  ];

  return (
    <Stack gap="sm">
      <Title order={3} tt="lowercase">skills</Title>

      {skillsList.map(skill => (
        <SkillCard key={skill.name} skill={skill} />
      ))}
    </Stack>
  );
}
