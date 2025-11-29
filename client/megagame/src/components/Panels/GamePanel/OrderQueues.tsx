import { Paper, Title, List, Button, Accordion, Text, ActionIcon } from "@mantine/core";
import { CircleSlash } from "lucide-react";
import { Fragment, useEffect } from "react";

import { useMegagameStore } from "../../../hooks/useMegagameStore";
import { useUserStore } from "../../../hooks/useUserStore";
import { Localisation } from "../../../utils/Localization";


function OrderQueueTitle({ orderType, orderQueueIndexes }: { orderType: MegagameOrderType; orderQueueIndexes: Record<OrderTypeId, number>; }): React.JSX.Element {
	const { lang, userType } = useMegagameStore();

	return (
		<Accordion.Control>
			{orderType.name}

			{orderQueueIndexes[orderType.id] !== -1 && userType !== "Guest"
				? <Text style={{ float: "right" }}>{Localisation.yourPositionInQueue[lang]}: {orderQueueIndexes[orderType.id] + 1}</Text>
				: null}
		</Accordion.Control>
	);
}

function OrderQueuePanelList({ orderType }: { orderType: MegagameOrderType; }): React.JSX.Element {
	const { lang, queues, userType, deleteOrderQueueItem, getFactionNameById } = useMegagameStore();
	const { hasAccess } = useUserStore();

	return (
		<Fragment>
			{queues && orderType.id in queues && queues[orderType.id].length > 0
				? <List type="ordered">
					{queues[orderType.id].map(order => (
						<List.Item key={order.id}>
							{getFactionNameById(order.factionId)}

							{userType === getFactionNameById(order.factionId) || hasAccess("Megagame Moderator" as UserAccess)
								? <ActionIcon
									ml="sm"
									variant="subtle"
									color="red"
									style={{ margin: "-1px 0 0 5px", display: "block", float: "right" }}
									onClick={() => { deleteOrderQueueItem(order.id); }}
								>
									<CircleSlash color="red" size={20} />
								</ActionIcon>
								: null}
						</List.Item>
					)
					)}
				</List>
				: <Text>{Localisation.noQueueItemsFound[lang]}</Text>}
		</Fragment>
	);
}

function OrderQueuePanelQueueButton({ orderType, orderQueueIndexes }: { orderType: MegagameOrderType; orderQueueIndexes: Record<OrderTypeId, number>; }): React.JSX.Element {
	const { lang, megagame, userType, userTypeId, createOrderQueueItem } = useMegagameStore();

	return (
		<Fragment>
			{userType !== "Guest"
				&& !(userType === "Bene Gesserit" || userType === "Bene Tleliaxu" || userType === "Spacing Guild")
				&& orderQueueIndexes[orderType.id] === -1
				? <Button
					variant="subtle"
					color="yellow"
					fullWidth
					style={{ marginTop: 15 }}
					onClick={() => {
						if (!userTypeId || !megagame) return;
						createOrderQueueItem({
							megagameId: megagame.id,
							factionId: userTypeId,
							orderTypeId: orderType.id
						});
					}}
				>
					{Localisation.enterQueue[lang]}
				</Button>
				: null}
		</Fragment>
	);
}

function OrderQueue({ orderType }: { orderType: MegagameOrderType; }): React.JSX.Element {
	const { queues, userType, userTypeId } = useMegagameStore();

	const orderQueueIndexes
		= queues && userType !== "Guest"
			? Object.keys(queues).reduce<Record<OrderTypeId, number>>((acc, orderTypeId) => {
				const index = queues[orderTypeId].findIndex(order => order.factionId === userTypeId);
				acc[orderTypeId as OrderTypeId] = index;
				return acc;
			}, {})
			: {};

	return (
		<Accordion.Item key={orderType.id} value={orderType.id}>
			<OrderQueueTitle orderType={orderType} orderQueueIndexes={orderQueueIndexes} />

			<Accordion.Panel>
				<OrderQueuePanelList orderType={orderType} />
				<OrderQueuePanelQueueButton orderType={orderType} orderQueueIndexes={orderQueueIndexes} />
			</Accordion.Panel>
		</Accordion.Item>
	);
}

export function OrderQueues(): React.JSX.Element {
	const { lang, fetchQueuesState, megagame, fetchQueues } = useMegagameStore();

	useEffect(() => {
		if (fetchQueuesState === "waiting") fetchQueues(true);
	}, [fetchQueues, fetchQueuesState]);

	useEffect(() => {
		const i = setInterval(() => { fetchQueues(false); }, 10000);
		return () => { clearInterval(i); };
	}, [fetchQueues]);

	return (
		<Paper shadow="md" radius="xs" p="xl" bd="1px solid rgba(0,0,0,0.1)" mt="md">
			<Title order={2} mb="md">{Localisation.queues[lang]}</Title>

			{<Accordion variant="separated" radius="xs" chevronIconSize={20}>
				{megagame?.orderTypes.map(orderType => <OrderQueue key={orderType.id} orderType={orderType} />)}
			</Accordion>}
		</Paper>
	);
}
