import Looks3Icon from "@mui/icons-material/Looks3";
import Looks4Icon from "@mui/icons-material/Looks4";
import Looks5Icon from "@mui/icons-material/Looks5";
import Looks6Icon from "@mui/icons-material/Looks6";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Fragment } from "react";

import { TestResult } from "./DiceRoller";
import { GenericGrid } from "../../Shared/Grids";


interface DiceRollerResultProps {
	result: TestResult | undefined;
	shade: string;
	isDoubleObstacle: boolean;
	isOpenEnded: boolean;
	obstacle: number;
	rerollFailure: (dice: number[]) => void;
	rerollSixes: (dice: number[], spendingFate: boolean) => void;
}

export function DiceRollerResult({ result, shade, isDoubleObstacle, isOpenEnded, obstacle, rerollFailure, rerollSixes }: DiceRollerResultProps): JSX.Element {
	const getResultText = (testResult: TestResult) => {
		const actualObstacle = (isDoubleObstacle) ? obstacle * 2 : obstacle;
		return (testResult.successes > actualObstacle)
			? `Success with a margin of ${testResult.successes - actualObstacle}.`
			: (testResult.successes < actualObstacle)
				? `Failure with a margin of ${actualObstacle - testResult.successes}.`
				: "Tie.";
	};

	return (
		<Fragment>
			{result
				? <Fragment>
					<Divider sx={{ margin: "10px 0 0 " }}>Result</Divider>

					<GenericGrid columns={3}>
						<Grid item xs={3} sm={1}>
							<Typography variant="h6">Result</Typography>
							<Typography>{getResultText(result)}</Typography>
						</Grid>

						<Grid item xs={3} sm={1}>
							{<Fragment>
								<Typography variant="h6">Dice</Typography>

								<Typography>
									{result.dice.map((v, i) => {
										if (v === 1) return <LooksOneIcon key={i} color="error" sx={{ margin: "0 0 -6px" }} />;
										else if (v === 2) return <LooksTwoIcon key={i} color={(shade === "White") ? "success" : "error"} sx={{ margin: "0 0 -6px" }} />;
										else if (v === 3) return <Looks3Icon key={i} color={(shade === "Gray") ? "success" : "error"} sx={{ margin: "0 0 -6px" }} />;
										else if (v === 4) return <Looks4Icon key={i} color={"success"} sx={{ margin: "0 0 -6px" }} />;
										else if (v === 5) return <Looks5Icon key={i} color={"success"} sx={{ margin: "0 0 -6px" }} />;
										else return <Looks6Icon key={i} color={"success"} sx={{ margin: "0 0 -6px" }} />;
									})}
								</Typography>
							</Fragment>}

							{!isOpenEnded && result.dice.includes(6) && !result.usedFate
								? <Button variant="outlined" size="medium" onClick={() => rerollSixes(result.dice, true)} sx={{ margin: "24px 0 0" }}>Reroll sixes using Fate</Button>
								: null}

							{isOpenEnded && result.failures > 0 && !result.usedFate
								? <Button variant="outlined" size="medium" onClick={() => rerollFailure(result.dice)} sx={{ margin: "6px 0 0" }}>Reroll a single failure using Fate</Button>
								: null}
						</Grid>

						<Grid item xs={3} sm={1}>
							<Typography variant="h6">Test</Typography>
							<Typography>{result.test}</Typography>
						</Grid>
					</GenericGrid>
				</Fragment>
				: null}
		</Fragment>
	);
}
