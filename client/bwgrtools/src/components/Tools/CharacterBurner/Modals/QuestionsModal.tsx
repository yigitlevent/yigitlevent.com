import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { useCharacterBurnerMiscStore } from "../../../../hooks/featureStores/CharacterBurnerStores/useCharacterBurnerMisc";
import { GenericGrid } from "../../../Shared/Grids";


export function QuestionsModal({ isOpen, close }: { isOpen: boolean; close: () => void; }): React.JSX.Element {
	const { questions, switchQuestion, hasQuestionTrue } = useCharacterBurnerMiscStore();

	return (
		<Modal open={isOpen} onClose={() => { close(); }}>
			<Paper sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", maxWidth: "800px", width: "100%", padding: "0 24px 24px", border: "none", overflow: "auto" }}>
				<GenericGrid columns={1} spacing={[2, 2]} center>
					{questions
						.map((v, i) => {
							return (
								<Grid key={i} size={{ xs: 1 }}>
									<Checkbox checked={hasQuestionTrue(v.id)} onChange={() => { switchQuestion(v.id); }} sx={{ margin: "0 0 3px", padding: 0, display: "inline-block", height: "24px" }} />

									<Typography sx={{ display: "inline", margin: "6px 0 0 8px" }}>
										{v.question}
									</Typography>
								</Grid>
							);
						})}
				</GenericGrid>
			</Paper>
		</Modal>
	);
}
