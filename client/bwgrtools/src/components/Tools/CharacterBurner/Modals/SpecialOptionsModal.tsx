import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";

import { BrutalLife } from "./SpecialOptionsModal/BrutalLife";
import { HuntingGround } from "./SpecialOptionsModal/HuntingGround";
import { SpecialLifepaths } from "./SpecialOptionsModal/SpecialLifepaths";
import { SpecialSkills } from "./SpecialOptionsModal/SpecialSkills";
import { GenericGrid } from "../../../Shared/Grids";


export function SpecialOptionsModal({ isOpen, close }: { isOpen: boolean; close: () => void; }): JSX.Element {
	return (
		<Modal open={isOpen} onClose={() => close()}>
			<Paper sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", maxWidth: "800px", width: "100%", padding: "0 24px 24px", border: "none", overflow: "auto" }}>
				<GenericGrid columns={3} spacing={[2, 1]} center>
					<BrutalLife />
					<HuntingGround />
					<SpecialLifepaths />
					<SpecialSkills />
				</GenericGrid>
			</Paper>
		</Modal>
	);
}
