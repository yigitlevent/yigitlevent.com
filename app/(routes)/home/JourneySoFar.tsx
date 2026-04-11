import { Blockquote, Stack, Text, Title } from "@mantine/core";

import type { JSX } from "react";


export function JourneySoFar(): JSX.Element {
  return (
    <Stack gap="sm">
      <Title order={3} tt="lowercase">journey so far</Title>

      <Text>
        It all started with a kid who wanted to show his huge maps to his friends. He tried to download maps.google.com by right clicking and saving it. It did not work.
      </Text>

      <Text>
        Luckily, there were some libraries and very barebone tutorials. After some work, I was able to create an HTML file with embedded JavaScript, and a tileset of my huge PNG file.
      </Text>

      <Text>
        I do not know why, but after that point I wanted to put everything into neatly created HTML files and share it that way. This led to learning the difference between a domain and a host, then to jQuery, and from there I was fully immersed into JavaScript.
      </Text>

      <Text>
        In my early 10s I started game development with C++. I was not a big fan of game engines back then. Learning C++ made me understand programming deeply while I was studying physics full time.
      </Text>

      <Text>
        After university, I decided to go back to JavaScript. But after years of C++, having no type safety was rough. Then I discovered TypeScript and React.
      </Text>

      <Text>
        Since 2021, I have been learning F# and Python. Functional programming gave me a very different and useful perspective.
      </Text>
    </Stack>
  );
}
