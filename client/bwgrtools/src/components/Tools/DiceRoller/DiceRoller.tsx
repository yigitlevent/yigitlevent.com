import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import { Clamp } from "@utility/Clamp";
import { RandomNumber } from "@utility/RandomNumber";
import { Fragment, useEffect, useState } from "react";

import { DiceRollerProbabilities } from "./DiceRollerProbabilities";
import { DiceRollerResult } from "./DiceRollerResult";
import { CalculateDiceProbability } from "../../../utils/CalculateDiceProbability";
import { AbilityButton } from "../../Shared/AbilityButton";


interface Tests {
	[key: number]: { routineMaxObstacle: number; };
}

const Tests: Tests = {
	2: { routineMaxObstacle: 1 },
	3: { routineMaxObstacle: 2 },
	4: { routineMaxObstacle: 2 },
	5: { routineMaxObstacle: 3 },
	6: { routineMaxObstacle: 4 },
	7: { routineMaxObstacle: 4 },
	8: { routineMaxObstacle: 5 },
	9: { routineMaxObstacle: 6 },
	10: { routineMaxObstacle: 7 },
	11: { routineMaxObstacle: 8 },
	12: { routineMaxObstacle: 9 },
	13: { routineMaxObstacle: 10 },
	14: { routineMaxObstacle: 11 },
	15: { routineMaxObstacle: 12 },
	16: { routineMaxObstacle: 13 },
	17: { routineMaxObstacle: 14 },
	18: { routineMaxObstacle: 15 },
	19: { routineMaxObstacle: 16 },
	20: { routineMaxObstacle: 17 }
};

export interface TestResult {
	dice: number[];
	successes: number;
	failures: number;
	test: string;
	usedFate: boolean;
}


export function DiceRoller(): JSX.Element {
	const [shade, setShade] = useState<BwgrShades>("B");
	const [dicePool, setDicePool] = useState(1);
	const [obstacle, setObstacle] = useState(1);
	const [isOpenEnded, setIsOpenEnded] = useState(false);
	const [isDoubleObstacle, setIsDoubleObstacle] = useState(false);
	const [result, setResult] = useState<TestResult | undefined>(undefined);
	const [probabilities, setProbabilities] = useState<number[]>([]);

	const testType
		= (dicePool === 1 && obstacle === 1)
			? "Routine or Difficult"
			: (obstacle > dicePool) ? "Challenging"
				: (obstacle <= Tests[dicePool].routineMaxObstacle)
					? "Routine"
					: "Difficult";

	const calculateResult = (dice: number[], usedFate: boolean) => {
		let successes = 0;
		let failures = 0;

		dice.forEach((v) => {
			if ((shade === "B" && v > 3) || (shade === "G" && v > 2) || (shade === "W" && v > 1)) successes += 1;
			else failures += 1;
		});

		setResult({ dice, successes, failures, test: testType, usedFate });
	};

	const rerollFailure = (dice: number[]) => {
		const tempDice = [...dice];
		const index = tempDice.findIndex(v => (shade === "B" && v < 4) || (shade === "G" && v < 3) || (shade === "W" && v < 2));
		tempDice[index] = RandomNumber(1, 6);
		calculateResult(tempDice.sort((a, b) => b - a), true);
	};

	const rerollSixes = (dice: number[], spendingFate: boolean) => {
		const rerolled: number[][] = [];
		if (isOpenEnded || spendingFate) {
			rerolled.push(dice.filter(v => v === 6).map(() => RandomNumber(1, 6)));
			while (rerolled[rerolled.length - 1].filter(v => v === 6).length > 0) {
				rerolled.push(rerolled[rerolled.length - 1].filter(v => v === 6).map(() => RandomNumber(1, 6)));
			}
		}
		calculateResult([...dice, ...rerolled.flat()].sort((a, b) => b - a), spendingFate);
	};

	const resolveDiceRoll = () => {
		rerollSixes([...Array(dicePool)].map(() => RandomNumber(1, 6)), false);
	};

	useEffect(() => {
		const shadeLetter = shade[0] as BwgrShades;
		setProbabilities(CalculateDiceProbability(dicePool, isOpenEnded, shadeLetter));
	}, [dicePool, isOpenEnded, shade]);

	return (
		<Fragment>
			<Typography variant="h3">Dice Roller</Typography>

			<Grid
				container
				columns={10}
				justifyContent="start"
				alignItems="start"
				rowGap={2}
				sx={{ margin: "16px 0 0 0" }}
			>
				<Grid item xs={10} sm={10} md={3}>
					<Typography sx={{ display: "inline-block", margin: "0 8px 0 0" }}>Dice Pool</Typography>

					<AbilityButton
						onClick={() => setShade(v => v === "W" ? "B" : v === "B" ? "G" : "W")}
					>
						{shade}
					</AbilityButton>

					<AbilityButton
						onClick={() => setDicePool(v => v === 20 ? v = 1 : Clamp(v + 1, 1, 20))}
						onContextMenu={() => setDicePool(v => Clamp(v - 1, 1, 20))}
					>
						{dicePool}
					</AbilityButton>

					<Typography sx={{ display: "inline-block", margin: "0 8px 0 0" }}>vs. Ob</Typography>

					<AbilityButton
						onClick={() => setObstacle(v => v === 20 ? v = 1 : Clamp(v + 1, 1, 20))}
						onContextMenu={() => setObstacle(v => Clamp(v - 1, 1, 20))}
					>
						{obstacle}
					</AbilityButton>
				</Grid>

				<Grid item xs={10} sm={10} md={2}>
					<FormControlLabel
						control={
							<Switch
								checked={isOpenEnded}
								onChange={(_, v) => setIsOpenEnded(v)}
								size="small"
							/>
						}
						label="Is Open Ended"
					/>
				</Grid>

				<Grid item xs={10} sm={10} md={3}>
					<FormControlLabel
						control={
							<Switch
								checked={isDoubleObstacle}
								onChange={(_, v) => setIsDoubleObstacle(v)}
								size="small"
							/>
						}
						label="Is Double Obstacle"
					/>
				</Grid>

				<Grid item xs={10} sm={4} md={2}>
					<Button variant="outlined" size="medium" onClick={resolveDiceRoll}>Roll Dice</Button>
				</Grid>
			</Grid>

			<DiceRollerProbabilities probabilities={probabilities} isDoubleObstacle={isDoubleObstacle} obstacle={obstacle} />
			<DiceRollerResult result={result} shade={shade} isDoubleObstacle={isDoubleObstacle} isOpenEnded={isOpenEnded} obstacle={obstacle} rerollFailure={rerollFailure} rerollSixes={rerollSixes} />
		</Fragment >
	);
}
