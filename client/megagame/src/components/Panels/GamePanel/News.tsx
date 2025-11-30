import { Paper, Title, ThemeIcon, List, Text, Textarea, Button, Divider } from "@mantine/core";
import { Quote } from "lucide-react";
import { Fragment, useState } from "react";

import { useMegagameStore } from "../../../hooks/useMegagameStore";
import { Localisation } from "../../../utils/Localization";


function NewsList(): React.JSX.Element {
	const { lang, megagame, getFactionNameById } = useMegagameStore();

	return (
		<Fragment>
			{megagame && megagame.news.length > 0 ? (
				<List
					spacing="md"
					center
					icon={(
						<ThemeIcon variant="light" color="yellow" size="md" radius="sm">
							<Quote size={14} />
						</ThemeIcon>
					)}
				>
					{megagame.news.map(news => (
						<List.Item key={news.id}>
							<span style={{ fontWeight: "bold" }}>
								{getFactionNameById(news.factionId)}
								:
								{" "}
							</span>

							<span>{news.text}</span>
						</List.Item>
					)
					)}
				</List>
			) : <Text>{Localisation.noNewsItems[lang]}</Text>}
		</Fragment>
	);
}

function AddNewsForm(): React.JSX.Element {
	const { lang, megagame, userType, userTypeId, createNewsItem } = useMegagameStore();
	const [newsText, setNewsText] = useState<string>("");

	return (
		<Fragment>
			{megagame && (userType === "Bene Gesserit" || userType === "Bene Tleliaxu" || userType === "Spacing Guild") ? (
				<Fragment>
					<Divider my="md" />

					<Textarea
						placeholder={Localisation.enterNewsText[lang]}
						autosize
						minRows={1}
						maxRows={4}
						style={{ marginTop: 15 }}
						value={newsText}
						onChange={event => {
							if (event.currentTarget.value.length < 1000) setNewsText(event.currentTarget.value);
						}}
					/>

					<Button
						variant="subtle"
						color="yellow"
						fullWidth
						style={{ marginTop: 5 }}
						onClick={() => { createNewsItem({ megagameId: megagame.id, factionId: userTypeId, text: newsText }); }}
					>
						{Localisation.addNewsItem[lang]}
					</Button>
				</Fragment>
			) : null}
		</Fragment>
	);
}

export function News(): React.JSX.Element {
	const { lang } = useMegagameStore();

	return (
		<Paper shadow="md" radius="xs" p="xl" bd="1px solid rgba(0,0,0,0.1)" mt="md">
			<Title order={2} mb="md">
				{Localisation.newsItems[lang]}
			</Title>

			<NewsList />
			<AddNewsForm />
		</Paper>
	);
}
