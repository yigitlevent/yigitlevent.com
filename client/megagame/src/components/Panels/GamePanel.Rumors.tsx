import { Paper, Title, ThemeIcon, List, Text } from "@mantine/core";
import { Quote } from "lucide-react";
import { useEffect } from "react";

import { useMegagameStore } from "../../hooks/useMegagameStore";
import { Localisation } from "../../utils/Localization";


export function Rumors({ lang }: { lang: "en" | "tr"; }): React.JSX.Element {
	const { rumors, fetchRumors } = useMegagameStore();

	useEffect(() => {
		const i = setInterval(() => fetchRumors(), 10000);
		return () => clearInterval(i);
	}, [fetchRumors]);

	return (
		<Paper shadow="md" radius="xs" p="xl" bd="1px solid rgba(0,0,0,0.1)" mt="md">
			<Title order={3} mb="sm">
				{Localisation.rumors[lang]}
			</Title>

			{rumors.length > 0
				? <List
					spacing="md"
					center
					icon={
						<ThemeIcon color="blue" size={20} radius="xl">
							<Quote color="white" size={14} />
						</ThemeIcon>
					}
				>
					{rumors.map(rumor =>
						<List.Item key={rumor.id}>{rumor.text[lang]}</List.Item>
					)}
				</List>
				: <Text>{Localisation.noRumors[lang]}</Text>}
		</Paper>
	);
}
