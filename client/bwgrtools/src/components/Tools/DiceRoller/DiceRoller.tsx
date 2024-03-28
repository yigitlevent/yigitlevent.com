import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Clamp } from "@utility/Clamp";
import { RandomNumber } from "@utility/RandomNumber";
import { Fragment, useEffect, useState } from "react";

import { DiceRollerProbabilities } from "./DiceRollerProbabilities";
import { DiceRollerResult } from "./DiceRollerResult";
import { CalculateDiceProbability } from "../../../utils/CalculateDiceProbability";
import { GenericGrid } from "../../Shared/Grids";


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
	18: { routineMaxObstacle: 15 }
};

export interface TestResult {
	dice: number[];
	successes: number;
	failures: number;
	test: string;
	usedFate: boolean;
}


export function DiceRoller(): JSX.Element {
	const [shade, setShade] = useState("Black");
	const [dicePool, setDicePool] = useState(1);
	const [obstacle, setObstacle] = useState(1);
	const [isOpenEnded, setIsOpenEnded] = useState(false);
	const [isDoubleObstacle, setIsDoubleObstacle] = useState(false);
	const [result, setResult] = useState<TestResult | undefined>(undefined);
	const [probabilities, setProbabilities] = useState<number[]>([]);

	const calculateResult = (dice: number[], usedFate: boolean) => {
		let successes = 0;
		let failures = 0;

		dice.forEach((v) => {
			if ((shade === "Black" && v > 3) || (shade === "Gray" && v > 2) || (shade === "White" && v > 1)) successes += 1;
			else failures += 1;
		});

		const test = (dicePool === 1 && obstacle === 1)
			? "Routine or Difficult"
			: (obstacle > dicePool) ? "Challenging"
				: (Tests[dicePool].routineMaxObstacle <= obstacle)
					? "Routine"
					: "Difficult";

		setResult({ dice, successes, failures, test, usedFate });
	};

	const rerollFailure = (dice: number[]) => {
		const tempDice = [...dice];
		const index = tempDice.findIndex(v => (shade === "Black" && v < 4) || (shade === "Gray" && v < 3) || (shade === "White" && v < 2));
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

			<GenericGrid columns={6} center>
				<Grid item xs={6} sm={2} md={1}>
					<FormControl fullWidth variant="standard">
						<InputLabel>Shade</InputLabel>

						<Select value={shade} onChange={e => setShade(e.target.value)}>
							<MenuItem value={"Black"}>Black</MenuItem>
							<MenuItem value={"Gray"}>Gray</MenuItem>
							<MenuItem value={"White"}>White</MenuItem>
						</Select>
					</FormControl>
				</Grid>

				<Grid item xs={6} sm={2} md={1}>
					<TextField
						label="Dice Pool"
						inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
						value={dicePool}
						onChange={e => setDicePool(Clamp(parseInt(e.target.value), 1, 20))}
						fullWidth
						variant="standard"
					/>
				</Grid>

				<Grid item xs={6} sm={2} md={1}>
					<TextField
						label="Obstacle"
						inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
						value={obstacle}
						onChange={e => setObstacle(Clamp(parseInt(e.target.value), 1, 20))}
						fullWidth
						variant="standard"
					/>
				</Grid>

				<Grid item>
					<FormControlLabel
						label="Is Open Ended?"
						labelPlacement="start"
						control={<Checkbox checked={isOpenEnded} onChange={(_, c) => setIsOpenEnded(c)} />}
					/>
				</Grid>

				<Grid item>
					<FormControlLabel
						label="Is Double Obstacle?"
						labelPlacement="start"
						control={<Checkbox checked={isDoubleObstacle} onChange={(_, c) => setIsDoubleObstacle(c)} />}
					/>
				</Grid>

				<Grid item>
					<Button variant="outlined" size="medium" onClick={resolveDiceRoll}>Roll Dice</Button>
				</Grid>
			</GenericGrid>

			<DiceRollerProbabilities probabilities={probabilities} isDoubleObstacle={isDoubleObstacle} obstacle={obstacle} />
			<DiceRollerResult result={result} shade={shade} isDoubleObstacle={isDoubleObstacle} isOpenEnded={isOpenEnded} obstacle={obstacle} rerollFailure={rerollFailure} rerollSixes={rerollSixes} />
		</Fragment>
	);
}
